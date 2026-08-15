/* battle/pyapi.js — the bridge between her Python and the battle simulation.
 *
 * Injects the game API as Skulpt BUILTINS (not a module), so lesson 1 needs no
 * `import` to explain — place_tower(...) is just a function call, which is
 * exactly the skill lesson 1 teaches. See spec/09-battle-game.md.
 *
 * Runs in Node and in the browser: it only needs a global Sk.
 */
(function (root) {
  "use strict";
  root.LC = root.LC || {};

  function getSim() { return root.LC.Sim; }

  var INSTALLED = [];

  function toPy(v) { return Sk.ffi.remapToPy(v); }
  function toJs(v) { return Sk.ffi.remapToJs(v); }

  function fn(f) { return new Sk.builtin.func(f); }
  var NONE = function () { return Sk.builtin.none.none$; };

  /**
   * Install the API for one level. Returns a context object that collects
   * everything her build script did.
   *
   * MUST be called before LC.Engine.run / importMainWithBody, and the returned
   * context read afterwards.
   */
  function install(level) {
    var Sim = getSim();
    var ctx = {
      placements: [],
      registered: {},   // name -> Python class
      log: []
    };

    var api = {};

    api.place_tower = fn(function (kind, x, y) {
      Sk.builtin.pyCheckArgsLen("place_tower", arguments.length, 3, 3);
      ctx.placements.push({
        kind: String(toJs(kind)),
        x: Math.round(Number(toJs(x))),
        y: Math.round(Number(toJs(y)))
      });
      return NONE();
    });

    api.sell_tower = fn(function (x, y) {
      var jx = Math.round(Number(toJs(x))), jy = Math.round(Number(toJs(y)));
      for (var i = ctx.placements.length - 1; i >= 0; i--) {
        if (ctx.placements[i].x === jx && ctx.placements[i].y === jy) {
          ctx.placements.splice(i, 1);
          break;
        }
      }
      return NONE();
    });

    api.tower_cost = fn(function (kind) {
      var spec = Sim.TOWERS[String(toJs(kind))];
      if (!spec) throw new Sk.builtin.ValueError("unknown tower: " + toJs(kind));
      return toPy(spec.cost);
    });

    /* Gold remaining, accounting for what she has already placed this run. */
    api.get_gold = fn(function () {
      var spent = 0;
      for (var i = 0; i < ctx.placements.length; i++) {
        var s = Sim.TOWERS[ctx.placements[i].kind];
        if (s) spent += s.cost;
      }
      return toPy(level.gold - spent);
    });

    api.camp_hp = fn(function () {
      return toPy(level.campHp === undefined ? 10 : level.campHp);
    });

    /* The wave as a list of dicts — the core data structure of lessons 9-12. */
    api.get_wave = fn(function () {
      var out = [];
      (level.waves || []).forEach(function (wave) {
        (wave.enemies || []).forEach(function (group) {
          var base = Sim.ENEMIES[group.kind];
          if (!base) return;
          for (var n = 0; n < (group.count || 1); n++) {
            out.push({
              kind: group.kind,
              hp: group.hp || base.hp,
              speed: group.speed || base.speed,
              armour: base.armour,
              flying: base.flying
            });
          }
        });
      });
      return toPy(out);
    });

    /* The map as a list of rows of strings — literally a list of lists,
     * which is what lesson 12 is about. */
    api.get_map = fn(function () {
      var grid = [];
      for (var r = 0; r < level.map.rows; r++) {
        var row = [];
        for (var c = 0; c < level.map.cols; c++) row.push("grass");
        grid.push(row);
      }
      (level.map.path || []).forEach(function (p) {
        if (grid[p[1]] && grid[p[1]][p[0]] !== undefined) grid[p[1]][p[0]] = "path";
      });
      (level.map.rock || []).forEach(function (p) {
        if (grid[p[1]] && grid[p[1]][p[0]] !== undefined) grid[p[1]][p[0]] = "rock";
      });
      return toPy(grid);
    });

    api.register_tower = fn(function (name, cls) {
      ctx.registered[String(toJs(name))] = cls;
      return NONE();
    });

    /* Install, remembering what we shadowed so uninstall() is exact. */
    INSTALLED = [];
    for (var key in api) {
      if (!Object.prototype.hasOwnProperty.call(api, key)) continue;
      INSTALLED.push({ key: key, prev: Sk.builtins[key], had: key in Sk.builtins });
      Sk.builtins[key] = api[key];
    }

    ctx.uninstall = function () {
      for (var i = 0; i < INSTALLED.length; i++) {
        var rec = INSTALLED[i];
        if (rec.had) Sk.builtins[rec.key] = rec.prev;
        else delete Sk.builtins[rec.key];
      }
      INSTALLED = [];
    };

    return ctx;
  }

  /**
   * Build the sim hooks from her finished module: a `choose_target` function
   * and/or a registered tower class.
   *
   * Calls are SYNCHRONOUS (Sk.misceval.callsimArray). Her code must not suspend
   * here — no input() inside a strategy function, which no lesson asks for.
   */
  function hooksFrom(module, ctx) {
    if (!module || !module.$d) return {};
    var chooseTarget = module.$d["choose_target"];
    var hooks = {};

    /* Each tower gets its own callable: a registered custom class instance if
     * one matches, otherwise the module-level choose_target. */
    var instances = {};

    function callableFor(tower) {
      if (tower.kind && ctx && ctx.registered[tower.kind]) {
        if (!instances[tower.kind]) {
          instances[tower.kind] = Sk.misceval.callsimArray(ctx.registered[tower.kind], []);
        }
        return Sk.abstr.gattr(instances[tower.kind], new Sk.builtin.str("fire"));
      }
      return chooseTarget || null;
    }

    if (chooseTarget || (ctx && Object.keys(ctx.registered).length)) {
      hooks.chooseTarget = function (towerView, enemyViews) {
        var callable = callableFor(towerView);
        if (!callable) return undefined; // fall back to the default targeting
        var result = Sk.misceval.callsimArray(callable, [Sk.ffi.remapToPy(enemyViews)]);
        var js = Sk.ffi.remapToJs(result);
        if (js === null || js === undefined) return null;      // hold fire
        if (typeof js === "object" && js.id !== undefined) return js.id;
        if (typeof js === "string") return js;                  // an id
        if (typeof js === "number") {                           // an index
          var picked = enemyViews[js];
          return picked ? picked.id : null;
        }
        return null;
      };
    }
    return hooks;
  }

  /* A harmless level used by the teaching examples and the training ground, so
   * place_tower() is ALWAYS defined. Without this she gets a bare NameError the
   * moment she tries a game command outside a battle, which teaches her that
   * the words only sometimes exist. */
  var SANDBOX_LEVEL = {
    map: { cols: 10, rows: 7, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4]] },
    gold: 500, campHp: 10, seed: 1,
    waves: [{ delay: 0, enemies: [{ kind: "satyr", count: 3, gap: 1 }] }]
  };

  root.LC.PyApi = {
    install: install,
    hooksFrom: hooksFrom,
    SANDBOX_LEVEL: SANDBOX_LEVEL,
    installSandbox: function () { return install(SANDBOX_LEVEL); }
  };
})(typeof self !== "undefined" ? self : globalThis);
