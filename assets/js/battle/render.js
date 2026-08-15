/* battle/render.js — canvas view of a battle.
 *
 * Draws the map, then replays the recorded simulation snapshots, interpolating
 * between them so motion is smooth without the simulation being frame-dependent.
 * No image files: terrain is drawn, monsters and towers are emoji glyphs.
 *
 * The board is NEVER mirrored in Hebrew — it is a diagram, and its coordinates
 * must agree with what she typed. See spec/09-battle-game.md.
 */
(function (root) {
  "use strict";
  root.LC = root.LC || {};

  var PAD = 22;            // room for the coordinate labels
  var TICK = 0.1;          // must match sim.TICK

  /* Canvas can't read CSS custom properties cheaply per-frame, so the
   * palette is duplicated here as named constants — kept in sync by hand
   * with the :root tokens in assets/css/theme.css. See spec/05-visual-design.md. */
  var COLOR = {
    grassA: "#15311f",
    grassB: "#112819",
    path: "#8a6a42",
    rock: "#3f4550",
    grid: "rgba(255,255,255,.07)",
    label: "rgba(244,241,234,.65)",
    rangeRing: "rgba(255,209,102,.18)",   // --gold @18%
    towerPad: "rgba(0,0,0,.35)",
    hpTrack: "rgba(0,0,0,.55)",
    hpGood: "#5fd68a",                    // --greek-fire
    hpMid: "#ffd166",                     // --gold
    hpBad: "#c1483f",                     // --blood
    shotLightning: "rgba(255,209,102,.9)",// --gold
    shotNormal: "rgba(232,181,99,.75)",   // --bronze-lit
    leak: "rgba(193,72,63,.45)"           // --blood
  };

  function reducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function create(container, level) {
    var wrap = document.createElement("div");
    wrap.className = "battle";
    wrap.setAttribute("dir", "ltr");

    var canvas = document.createElement("canvas");
    canvas.className = "battle-canvas";
    canvas.setAttribute("role", "img");
    /* Labelled even before a battle runs — an unlabelled canvas is invisible
     * to a screen reader. The real outcome is announced by the verdict, which
     * is a live region. */
    canvas.setAttribute("aria-label",
      "Battlefield, " + level.map.cols + " by " + level.map.rows + " squares");
    wrap.appendChild(canvas);
    container.appendChild(wrap);

    var ctx = canvas.getContext("2d");
    var sim = null;
    var playing = false;
    var speed = 1;
    var clock = 0;          // simulated seconds
    var raf = null;
    var lastFrame = 0;
    var onUpdate = null;

    var cell = 32, ox = PAD, oy = PAD;

    function layout() {
      var w = Math.max(240, container.clientWidth || 480);
      cell = Math.floor((w - PAD * 2) / level.map.cols);
      cell = Math.max(18, Math.min(cell, 56));
      var cw = cell * level.map.cols + PAD * 2;
      var ch = cell * level.map.rows + PAD * 2;
      var dpr = window.devicePixelRatio || 1;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      canvas.style.width = cw + "px";
      canvas.style.height = ch + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ox = PAD; oy = PAD;
    }

    function cx(gx) { return ox + gx * cell + cell / 2; }
    function cy(gy) { return oy + gy * cell + cell / 2; }

    function drawBoard() {
      var m = level.map;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* grass */
      for (var r = 0; r < m.rows; r++) {
        for (var c = 0; c < m.cols; c++) {
          ctx.fillStyle = (r + c) % 2 === 0 ? COLOR.grassA : COLOR.grassB;
          ctx.fillRect(ox + c * cell, oy + r * cell, cell, cell);
        }
      }

      /* path */
      ctx.fillStyle = COLOR.path;
      (m.path || []).forEach(function (p) {
        ctx.fillRect(ox + p[0] * cell, oy + p[1] * cell, cell, cell);
      });

      /* rocks */
      (m.rock || []).forEach(function (p) {
        ctx.fillStyle = COLOR.rock;
        ctx.fillRect(ox + p[0] * cell, oy + p[1] * cell, cell, cell);
      });

      /* grid lines */
      ctx.strokeStyle = COLOR.grid;
      ctx.lineWidth = 1;
      for (var i = 0; i <= m.cols; i++) {
        ctx.beginPath();
        ctx.moveTo(ox + i * cell + .5, oy);
        ctx.lineTo(ox + i * cell + .5, oy + m.rows * cell);
        ctx.stroke();
      }
      for (var j = 0; j <= m.rows; j++) {
        ctx.beginPath();
        ctx.moveTo(ox, oy + j * cell + .5);
        ctx.lineTo(ox + m.cols * cell, oy + j * cell + .5);
        ctx.stroke();
      }

      /* coordinate labels — she needs these to write place_tower(kind, x, y) */
      ctx.fillStyle = COLOR.label;
      ctx.font = "11px ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (var c2 = 0; c2 < m.cols; c2++) ctx.fillText(String(c2), cx(c2), oy - PAD / 2);
      ctx.textAlign = "center";
      for (var r2 = 0; r2 < m.rows; r2++) ctx.fillText(String(r2), ox - PAD / 2, cy(r2));

      /* spawn + gate markers */
      if (m.path && m.path.length) {
        var s = m.path[0], g = m.path[m.path.length - 1];
        ctx.font = Math.floor(cell * 0.6) + "px serif";
        ctx.fillText("🕳️", cx(s[0]), cy(s[1]));
        ctx.fillText("🏛️", cx(g[0]), cy(g[1]));
      }
    }

    function drawTowers(towers) {
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      (towers || []).forEach(function (t) {
        var spec = root.LC.Sim.TOWERS[t.kind];
        /* range ring, faint */
        ctx.beginPath();
        ctx.arc(cx(t.x), cy(t.y), (t.range || (spec && spec.range) || 2) * cell, 0, Math.PI * 2);
        ctx.strokeStyle = COLOR.rangeRing;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = COLOR.towerPad;
        ctx.fillRect(ox + t.x * cell + 2, oy + t.y * cell + 2, cell - 4, cell - 4);
        ctx.font = Math.floor(cell * 0.62) + "px serif";
        ctx.fillText((spec && spec.icon) || "🗼", cx(t.x), cy(t.y));
      });
    }

    function lerp(a, b, t) { return a + (b - a) * t; }

    function drawEnemies(prev, next, t) {
      if (!next) return;
      var byId = {};
      (prev ? prev.enemies : []).forEach(function (e) { byId[e.id] = e; });

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      next.enemies.forEach(function (e) {
        var p = byId[e.id];
        var x = p ? lerp(p.x, e.x, t) : e.x;
        var y = p ? lerp(p.y, e.y, t) : e.y;
        var px = cx(x), py = cy(y);

        ctx.font = Math.floor(cell * 0.6) + "px serif";
        if (e.slowed) {
          ctx.globalAlpha = 0.75;
        }
        ctx.fillText(e.icon, px, py);
        ctx.globalAlpha = 1;

        /* hp bar */
        var w = cell * 0.7, h = 3;
        var frac = Math.max(0, e.hp / e.maxHp);
        ctx.fillStyle = COLOR.hpTrack;
        ctx.fillRect(px - w / 2, py - cell * 0.42, w, h);
        ctx.fillStyle = frac > 0.5 ? COLOR.hpGood : frac > 0.25 ? COLOR.hpMid : COLOR.hpBad;
        ctx.fillRect(px - w / 2, py - cell * 0.42, w * frac, h);
      });
    }

    function drawEvents(snap) {
      if (!snap) return;
      (snap.events || []).forEach(function (ev) {
        if (ev.type === "shot") {
          ctx.beginPath();
          ctx.moveTo(cx(ev.from[0]), cy(ev.from[1]));
          ctx.lineTo(cx(ev.to[0]), cy(ev.to[1]));
          ctx.strokeStyle = ev.kind === "lightning" ? COLOR.shotLightning : COLOR.shotNormal;
          ctx.lineWidth = ev.kind === "cannon" ? 3 : 1.5;
          ctx.stroke();
        } else if (ev.type === "kill") {
          ctx.font = Math.floor(cell * 0.55) + "px serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("💨", cx(ev.x), cy(ev.y));
        } else if (ev.type === "leak") {
          ctx.fillStyle = COLOR.leak;
          ctx.fillRect(ox + ev.x * cell, oy + ev.y * cell, cell, cell);
        }
      });
    }

    function frameAt(seconds) {
      if (!sim || !sim.snapshots.length) return;
      var idx = Math.floor(seconds / TICK);
      var t = (seconds / TICK) - idx;
      if (idx >= sim.snapshots.length - 1) { idx = sim.snapshots.length - 1; t = 0; }
      var prev = sim.snapshots[Math.max(0, idx - 1)];
      var snap = sim.snapshots[idx];
      drawBoard();
      drawTowers(sim.towers);
      drawEnemies(prev, snap, t);
      drawEvents(snap);
      if (onUpdate) onUpdate(snap, seconds, sim);
    }

    function stop() {
      playing = false;
      if (raf) { cancelAnimationFrame(raf); raf = null; }
    }

    function loop(ts) {
      if (!playing) return;
      var dt = lastFrame ? (ts - lastFrame) / 1000 : 0;
      lastFrame = ts;
      clock += dt * speed;
      var end = sim ? sim.duration + TICK : 0;
      if (clock >= end) {
        clock = end;
        frameAt(clock);
        stop();
        return;
      }
      frameAt(clock);
      raf = requestAnimationFrame(loop);
    }

    var view = {
      el: wrap,
      canvas: canvas,

      /** Static preview of the empty board, so she can read the coordinates. */
      idle: function () {
        stop();
        sim = null;
        layout();
        drawBoard();
      },

      /** Show a finished simulation, animating from the start. */
      show: function (result, opts) {
        stop();
        sim = result;
        layout();
        clock = 0;
        lastFrame = 0;
        canvas.setAttribute("aria-label",
          (opts && opts.label) || "Battle replay");
        if (reducedMotion()) {
          clock = sim.duration;
          frameAt(clock);
          return;
        }
        playing = true;
        raf = requestAnimationFrame(loop);
      },

      play: function () {
        if (!sim || playing) return;
        if (clock >= sim.duration) clock = 0;
        playing = true; lastFrame = 0;
        raf = requestAnimationFrame(loop);
      },
      pause: stop,
      isPlaying: function () { return playing; },
      restart: function () {
        if (!sim) return;
        clock = 0; lastFrame = 0; playing = true;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(loop);
      },
      setSpeed: function (s) { speed = s; },
      getSpeed: function () { return speed; },
      seek: function (seconds) {
        if (!sim) return;
        stop();
        clock = Math.max(0, Math.min(seconds, sim.duration));
        frameAt(clock);
      },
      duration: function () { return sim ? sim.duration : 0; },
      onUpdate: function (fn) { onUpdate = fn; },
      relayout: function () {
        layout();
        if (sim) frameAt(clock); else drawBoard();
      },
      destroy: function () { stop(); }
    };

    layout();
    drawBoard();
    return view;
  }

  root.LC.BattleView = { create: create };
})(typeof self !== "undefined" ? self : globalThis);
