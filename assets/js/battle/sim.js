/* battle/sim.js — the deterministic, headless battle simulation.
 *
 * Runs the whole battle to completion BEFORE anything is drawn, recording a
 * snapshot per tick. The renderer then just replays it. See spec/09-battle-game.md.
 *
 * Nothing in this file touches the DOM, so it runs identically in Node for
 * verification and in the browser for play.
 */
(function (root) {
  "use strict";
  root.LC = root.LC || {};

  var TICK = 0.1;          // seconds of simulated time per tick
  var MAX_TICKS = 3000;    // 5 simulated minutes — a hard stop, never reached in a real level

  /* The simulation currently uses NO randomness at all — every battle is fully
   * deterministic from its inputs, which is stronger than being seeded. This
   * generator is kept, unused, for the day a mechanic needs it (a crit chance,
   * a wandering monster); `level.seed` is declared by levels for the same
   * reason. Do not describe battles as "seeded" while this is unused. */
  function mulberry32(seed) {
    var a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* hitsFlying: the cannon is artillery — it cannot hit anything airborne.
   * That is what makes "which tower counters which monster" a real decision
   * rather than flavour text, and it is the mechanical reason lesson 6 needs
   * if/elif/else. Everything else can hit both. */
  var TOWERS = {
    archer:    { icon: "🏹", cost: 50,  range: 2.6, rate: 1.6, damage: 10, splash: 0,   slow: 0,    chain: 0, hitsFlying: true },
    cannon:    { icon: "💣", cost: 90,  range: 2.2, rate: 0.6, damage: 28, splash: 1.1, slow: 0,    chain: 0, hitsFlying: false },
    ice:       { icon: "❄️", cost: 70,  range: 2.4, rate: 1.0, damage: 4,  splash: 0,   slow: 0.45, chain: 0, hitsFlying: true },
    lightning: { icon: "⚡", cost: 120, range: 3.0, rate: 0.8, damage: 18, splash: 0,   slow: 0,    chain: 3, hitsFlying: true }
  };

  var ENEMIES = {
    harpy:     { icon: "🦅", hp: 30,  speed: 2.0, armour: 0, flying: true,  bounty: 8 },
    hellhound: { icon: "🐺", hp: 70,  speed: 1.4, armour: 2, flying: false, bounty: 12 },
    cyclops:   { icon: "👹", hp: 160, speed: 0.8, armour: 5, flying: false, bounty: 25 },
    satyr:     { icon: "🐐", hp: 20,  speed: 2.6, armour: 0, flying: false, bounty: 5 },
    minotaur:  { icon: "🐂", hp: 420, speed: 0.7, armour: 8, flying: false, bounty: 90 },
    medusa:    { icon: "🐍", hp: 380, speed: 0.9, armour: 6, flying: false, bounty: 90 },
    hydra:     { icon: "🐲", hp: 300, speed: 1.0, armour: 4, flying: false, bounty: 90 },
    kronos:    { icon: "⏳", hp: 1400, speed: 0.5, armour: 12, flying: false, bounty: 300 }
  };

  function dist(ax, ay, bx, by) {
    var dx = ax - bx, dy = ay - by;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /* Position along the path, in grid coordinates, for a given progress in cells. */
  function pointAt(path, travelled) {
    if (travelled <= 0) return { x: path[0][0], y: path[0][1] };
    var i = Math.floor(travelled);
    if (i >= path.length - 1) {
      var last = path[path.length - 1];
      return { x: last[0], y: last[1] };
    }
    var t = travelled - i;
    var a = path[i], b = path[i + 1];
    return { x: a[0] + (b[0] - a[0]) * t, y: a[1] + (b[1] - a[1]) * t };
  }

  /**
   * @param {object} level      the level definition (see spec/09-battle-game.md)
   * @param {Array}  placements [{kind, x, y}] recorded from her build script
   * @param {object} [hooks]    { chooseTarget(towerView, enemyViews) -> id|null }
   *                            Called synchronously. May throw — the error is
   *                            captured and ends the battle as a loss.
   */
  function run(level, placements, hooks) {
    hooks = hooks || {};
    var path = level.map.path;
    var pathLen = path.length - 1;
    var gate = path[path.length - 1];

    /* ---- build phase: validate placements ---------------------------- */
    var towers = [];
    var goldLeft = level.gold;
    var buildErrors = [];
    var onPath = {};
    for (var p = 0; p < path.length; p++) onPath[path[p][0] + "," + path[p][1]] = true;
    /* Rocks are documented as unbuildable and get_map() reports them as such,
     * so the engine has to actually enforce it. */
    var onRock = {};
    var rocks = level.map.rock || [];
    for (var rk = 0; rk < rocks.length; rk++) onRock[rocks[rk][0] + "," + rocks[rk][1]] = true;
    var occupied = {};

    for (var i = 0; i < placements.length; i++) {
      var pl = placements[i];
      var spec = TOWERS[pl.kind];
      var key = pl.x + "," + pl.y;
      if (!spec) { buildErrors.push({ type: "unknownTower", kind: pl.kind }); continue; }
      if (level.allowed && level.allowed.indexOf(pl.kind) === -1) {
        buildErrors.push({ type: "notAllowed", kind: pl.kind }); continue;
      }
      if (pl.x < 0 || pl.y < 0 || pl.x >= level.map.cols || pl.y >= level.map.rows) {
        buildErrors.push({ type: "offMap", x: pl.x, y: pl.y }); continue;
      }
      if (onPath[key]) { buildErrors.push({ type: "onPath", x: pl.x, y: pl.y }); continue; }
      if (onRock[key]) { buildErrors.push({ type: "onRock", x: pl.x, y: pl.y }); continue; }
      if (occupied[key]) { buildErrors.push({ type: "occupied", x: pl.x, y: pl.y }); continue; }
      if (goldLeft < spec.cost) { buildErrors.push({ type: "tooPoor", kind: pl.kind, cost: spec.cost, gold: goldLeft }); continue; }

      goldLeft -= spec.cost;
      occupied[key] = true;
      towers.push({
        id: "t" + towers.length, kind: pl.kind, x: pl.x, y: pl.y,
        cooldown: 0, custom: pl.custom || null,
        range: pl.range || spec.range, damage: pl.damage || spec.damage,
        rate: pl.rate || spec.rate, shots: 0, damageDealt: 0,
        /* How often this tower was ready AND had something in range. Separates
         * "badly placed, never saw anything" from "saw targets but held fire",
         * which are completely different mistakes. */
        targetsSeen: 0, heldFire: 0, flyersMissed: 0
      });
    }
    var goldSpent = level.gold - goldLeft;

    /* ---- schedule the waves ------------------------------------------ */
    var pending = [];
    var uid = 0;
    (level.waves || []).forEach(function (wave, wi) {
      var t = wave.delay || 0;
      (wave.enemies || []).forEach(function (group) {
        for (var n = 0; n < (group.count || 1); n++) {
          var base = ENEMIES[group.kind];
          if (!base) return;
          pending.push({
            at: t,
            wave: wi,
            enemy: {
              id: "e" + (uid++), kind: group.kind, icon: base.icon,
              hp: group.hp || base.hp, maxHp: group.hp || base.hp,
              speed: group.speed || base.speed, armour: base.armour,
              flying: base.flying, bounty: base.bounty,
              travelled: 0, slowUntil: -1, alive: true, leaked: false
            }
          });
          t += group.gap === undefined ? 1 : group.gap;
        }
      });
    });
    pending.sort(function (a, b) { return a.at - b.at; });

    /* ---- battle ------------------------------------------------------ */
    var live = [];
    var snapshots = [];
    var events = [];
    var campHp = level.campHp === undefined ? 10 : level.campHp;
    var time = 0, tick = 0, killed = 0, leaked = 0;
    var strategyError = null;

    function enemyView(e) {
      var pt = pointAt(path, e.travelled);
      return {
        id: e.id, kind: e.kind, hp: Math.round(e.hp), max_hp: e.maxHp,
        distance: Math.round((pathLen - e.travelled) * 100) / 100,
        speed: e.speed, armour: e.armour, flying: e.flying,
        x: Math.round(pt.x * 100) / 100, y: Math.round(pt.y * 100) / 100
      };
    }

    while (tick < MAX_TICKS) {
      /* spawn */
      while (pending.length && pending[0].at <= time) {
        live.push(pending.shift().enemy);
      }

      /* move */
      for (var m = 0; m < live.length; m++) {
        var e = live[m];
        if (!e.alive) continue;
        var speed = e.slowUntil > time ? e.speed * 0.55 : e.speed;
        e.travelled += speed * TICK;
        if (e.travelled >= pathLen) {
          e.alive = false; e.leaked = true; leaked++;
          campHp--;
          events.push({ tick: tick, type: "leak", x: gate[0], y: gate[1], kind: e.kind });
        }
      }

      /* towers fire */
      for (var ti = 0; ti < towers.length; ti++) {
        var tw = towers[ti];
        tw.cooldown -= TICK;
        if (tw.cooldown > 0) continue;

        /* CONTRACT: `inRange` is built by walking `live`, which is in spawn
         * order, so enemies[0] is the one that has been on the field longest —
         * which is NOT the same as the default's furthest-along-the-path.
         * Lessons 14 L1 and L2 teach exactly that difference. Do not reorder
         * this list without re-verifying those levels. */
        var towerSpec = TOWERS[tw.kind] || TOWERS.archer;
        var inRange = [];
        var missedFlyer = false;
        for (var li = 0; li < live.length; li++) {
          var en = live[li];
          if (!en.alive) continue;
          var pt = pointAt(path, en.travelled);
          if (dist(tw.x, tw.y, pt.x, pt.y) > tw.range) continue;
          if (en.flying && towerSpec.hitsFlying === false) { missedFlyer = true; continue; }
          inRange.push(en);
        }
        if (missedFlyer) tw.flyersMissed++;
        if (!inRange.length) continue;
        tw.targetsSeen++;

        /* default: the enemy furthest along the path — the leader */
        var target = null;
        if (hooks.chooseTarget) {
          var views = inRange.map(enemyView);
          var chosenId;
          try {
            chosenId = hooks.chooseTarget(
              { kind: tw.kind, x: tw.x, y: tw.y, range: tw.range, damage: tw.damage, custom: tw.custom },
              views
            );
          } catch (err) {
            strategyError = err;
            break;
          }
          if (chosenId === null) { tw.heldFire++; tw.cooldown = 1 / tw.rate; continue; }
          if (chosenId !== undefined) {
            for (var q = 0; q < inRange.length; q++) if (inRange[q].id === chosenId) target = inRange[q];
            if (!target) { tw.heldFire++; tw.cooldown = 1 / tw.rate; continue; }
          }
        }
        /* No strategy function, or it returned something we could not read:
         * fall back to the default — the enemy furthest along the path. */
        if (!target) {
          for (var d = 0; d < inRange.length; d++) {
            if (!target || inRange[d].travelled > target.travelled) target = inRange[d];
          }
        }

        var spec2 = TOWERS[tw.kind] || TOWERS.archer;
        var hit = [target];
        if (spec2.splash > 0) {
          var tp = pointAt(path, target.travelled);
          for (var s = 0; s < inRange.length; s++) {
            if (inRange[s] === target) continue;
            var sp = pointAt(path, inRange[s].travelled);
            if (dist(tp.x, tp.y, sp.x, sp.y) <= spec2.splash) hit.push(inRange[s]);
          }
        }
        if (spec2.chain > 0) {
          var chained = 1;
          for (var c = 0; c < inRange.length && chained < spec2.chain; c++) {
            if (hit.indexOf(inRange[c]) === -1) { hit.push(inRange[c]); chained++; }
          }
        }

        for (var h = 0; h < hit.length; h++) {
          var victim = hit[h];
          var dmg = Math.max(1, tw.damage - victim.armour);
          victim.hp -= dmg;
          tw.damageDealt += dmg;
          if (spec2.slow > 0) victim.slowUntil = time + 1.5;
          var vp = pointAt(path, victim.travelled);
          events.push({ tick: tick, type: "shot", from: [tw.x, tw.y], to: [vp.x, vp.y], kind: tw.kind });
          if (victim.hp <= 0 && victim.alive) {
            victim.alive = false; killed++;
            goldLeft += victim.bounty;
            events.push({ tick: tick, type: "kill", x: vp.x, y: vp.y, kind: victim.kind });
          }
        }
        tw.shots++;
        tw.cooldown = 1 / tw.rate;
      }

      if (strategyError) break;

      /* snapshot */
      snapshots.push({
        t: time,
        campHp: campHp,
        gold: goldLeft,
        enemies: live.filter(function (x) { return x.alive; }).map(function (x) {
          var pt = pointAt(path, x.travelled);
          return { id: x.id, kind: x.kind, icon: x.icon, x: pt.x, y: pt.y,
                   hp: x.hp, maxHp: x.maxHp, slowed: x.slowUntil > time };
        }),
        events: events.filter(function (ev) { return ev.tick === tick; })
      });

      live = live.filter(function (x) { return x.alive; });

      if (campHp <= 0) break;
      if (!pending.length && !live.length) break;

      time += TICK;
      tick++;
    }

    /* `survived` is the mechanical outcome: the camp still stands. It is NOT
     * the same as passing the level — a level with 10 HP and 4 monsters would
     * otherwise be "won" by writing nothing at all. The level's objective
     * (default: let none through) is applied by checker.js. */
    var survived = !strategyError && campHp > 0 && !pending.length && !live.length;

    return {
      survived: survived,
      perfect: survived && campHp === (level.campHp === undefined ? 10 : level.campHp),
      campHp: campHp,
      campHpStart: level.campHp === undefined ? 10 : level.campHp,
      goldSpent: goldSpent,
      goldLeft: goldLeft,
      killed: killed,
      leaked: leaked,
      towers: towers,
      buildErrors: buildErrors,
      strategyError: strategyError,
      timedOut: tick >= MAX_TICKS,
      snapshots: snapshots,
      duration: time
    };
  }

  root.LC.Sim = {
    run: run,
    TOWERS: TOWERS,
    ENEMIES: ENEMIES,
    TICK: TICK,
    pointAt: pointAt,
    mulberry32: mulberry32
  };
})(typeof self !== "undefined" ? self : globalThis);
