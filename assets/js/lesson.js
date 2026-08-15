/* lesson.js — renders a lesson page from its content object.
 * The six beats are fixed; see spec/04-lesson-template.md.
 */
window.LC = window.LC || {};
(function (LC) {
  "use strict";

  LC.LESSONS = LC.LESSONS || {};
  LC.registerLesson = function (obj) { LC.LESSONS[obj.id] = obj; };

  var current = null;   // the mounted lesson object
  var widgets = [];     // re-rendered on language change

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  }

  function prefersReducedMotion() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  function scrollToCard(node) {
    if (!node) return;
    node.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  }

  /* ---- output panel ---------------------------------------------------- */

  function makeOutput() {
    var panel = el("div", "output");
    panel.setAttribute("dir", "ltr");
    var pre = el("pre", "output-body");
    var note = el("div", "output-note");
    panel.appendChild(pre);
    panel.appendChild(note);

    return {
      el: panel,
      clear: function () { pre.textContent = ""; note.innerHTML = ""; panel.className = "output"; },
      write: function (text) { pre.textContent += text; },
      set: function (text) { pre.textContent = text; },
      empty: function () {
        pre.textContent = "";
        /* This placeholder is Hebrew prose sitting inside an LTR panel, so it
         * needs its own direction or the brackets flip. */
        var ph = el("span", "muted", LC.esc(LC.s("noOutput")));
        ph.setAttribute("dir", "auto");
        pre.appendChild(ph);
      },
      /* Real English error first, Hebrew explanation beside it — never
       * instead of it. See spec/00-overview.md rule 5. */
      showError: function (error, explanation) {
        panel.className = "output has-error";
        var block = el("div", "err");
        block.appendChild(el("div", "err-title", LC.esc(LC.s("errorTitle"))));
        var real = el("pre", "err-real");
        real.setAttribute("dir", "ltr");
        real.textContent = error.text;
        block.appendChild(real);
        if (explanation) {
          var why = el("div", "err-why");
          why.appendChild(el("div", "err-why-title", LC.esc(LC.s("whatHappened"))));
          why.appendChild(el("div", "err-why-body", LC.rich(explanation)));
          block.appendChild(why);
        }
        note.innerHTML = "";
        note.appendChild(block);
      },
      note: note
    };
  }

  /* Inline input() prompt, styled as an Iris-message. Never window.prompt. */
  function askInput(output, promptText) {
    return new Promise(function (resolve) {
      var box = el("form", "input-ask");
      box.setAttribute("dir", "ltr");
      var label = el("label", "input-ask-label");
      label.textContent = promptText || LC.s("inputPrompt");
      var field = document.createElement("input");
      field.type = "text";
      field.className = "input-ask-field";
      field.setAttribute("dir", "ltr");
      field.setAttribute("autocomplete", "off");
      var send = el("button", "btn btn-small", LC.esc(LC.s("send")));
      send.type = "submit";
      box.appendChild(label);
      box.appendChild(field);
      box.appendChild(send);
      output.note.appendChild(box);
      field.focus();

      box.addEventListener("submit", function (e) {
        e.preventDefault();
        var value = field.value;
        box.parentNode.removeChild(box);
        output.write(value + "\n");
        resolve(value);
      });
    });
  }

  /* ---- a runnable code widget (used by teach blocks and Try It) --------- */

  function runnerWidget(opts) {
    var host = el("div", "runner");
    var output = makeOutput();
    var editor = null;
    var busy = false;

    if (opts.editable) {
      editor = LC.Editor.create(host, { value: opts.code, onRun: doRun, label: opts.label });
    } else {
      var pre = el("pre", "code-block");
      pre.setAttribute("dir", "ltr");
      pre.textContent = opts.code;
      host.appendChild(pre);
    }

    var bar = el("div", "runner-bar");
    var runBtn = el("button", "btn btn-run", LC.esc(LC.s("run")));
    runBtn.type = "button";
    bar.appendChild(runBtn);
    if (opts.editable) {
      var resetBtn = el("button", "btn btn-ghost", LC.esc(LC.s("reset")));
      resetBtn.type = "button";
      resetBtn.addEventListener("click", function () { editor.reset(); output.clear(); });
      bar.appendChild(resetBtn);
    }
    host.appendChild(bar);
    host.appendChild(output.el);

    function doRun() {
      if (busy) return Promise.resolve();
      busy = true;
      runBtn.disabled = true;
      runBtn.textContent = LC.s("running");
      output.clear();
      var source = editor ? editor.get() : opts.code;

      LC.store.update(function (s) {
        var st = LC.Game.lessonState(current ? current.id : "00");
        st.runs += 1;
        if (current) s.lessons[current.id] = st;
      });

      /* The game words exist here too, against a practice field, so a command
       * she just learned never dies with a NameError. */
      var sandbox = LC.PyApi ? LC.PyApi.installSandbox() : null;

      return LC.Engine.run(source, {
        onStdout: function (t) { output.write(t); },
        onInput: function (p) { return askInput(output, p); }
      }).then(function (result) {
        if (sandbox) {
          sandbox.placements.forEach(function (p) {
            var spec = LC.Sim.TOWERS[p.kind];
            output.write((spec ? spec.icon : "🗼") + "  " + p.kind + " → (" + p.x + ", " + p.y + ")\n");
          });
          sandbox.uninstall();
        }
        busy = false;
        runBtn.disabled = false;
        runBtn.textContent = LC.s("run");
        if (result.ok) {
          if (!result.output) output.empty();
          LC.Game.unlock("firstWord");
          if (host.getAttribute("data-had-error") === "1") {
            LC.Game.unlock("debugger");
            host.setAttribute("data-had-error", "0");
          }
          /* A rough heuristic on purpose: this is flavor, not a graded check.
           * An assignment anywhere plus a print() call anywhere is "she named
           * something and printed it". See spec/lessons/lesson-02.md. */
          if (/^\s*[A-Za-z_]\w*\s*=(?!=)/m.test(source) && /\bprint\s*\(/.test(source)) {
            LC.Game.unlock("namer");
          }
        } else {
          output.showError(result.error, result.explanation);
          host.setAttribute("data-had-error", "1");
          if (editor) editor.markError(result.error.line);
        }
        if (opts.onResult) opts.onResult(result);
        return result;
      });
    }

    runBtn.addEventListener("click", doRun);

    return { el: host, run: doRun, editor: editor, output: output };
  }

  /* ---- teach blocks ---------------------------------------------------- */

  function renderTeachBlock(block) {
    if (block.type === "prose") {
      return el("p", "prose", LC.rich(block.text));
    }

    if (block.type === "code") {
      var wrap = el("div", "teach-code");
      if (block.caption) wrap.appendChild(el("div", "caption", LC.rich(block.caption)));
      if (block.runnable === false) {
        var pre = el("pre", "code-block");
        pre.setAttribute("dir", "ltr");
        pre.textContent = block.code;
        wrap.appendChild(pre);
      } else {
        wrap.appendChild(runnerWidget({ code: block.code, editable: false }).el);
      }
      return wrap;
    }

    if (block.type === "callout") {
      var tone = block.tone || "tip";
      var icon = tone === "warn" ? "⚠️" : tone === "myth" ? "🏛️" : "💡";
      var c = el("div", "callout callout-" + tone);
      c.appendChild(el("div", "callout-title", icon + " " + LC.esc(LC.t(block.title))));
      c.appendChild(el("div", "callout-body", LC.rich(block.text)));
      return c;
    }

    if (block.type === "compare") {
      var cmp = el("div", "compare");
      [["bad", block.bad, "✗"], ["good", block.good, "✓"]].forEach(function (pair) {
        var side = el("div", "compare-side compare-" + pair[0]);
        side.appendChild(el("div", "compare-label", pair[2] + " " + LC.esc(LC.t(pair[1].label))));
        var p = el("pre", "code-block");
        p.setAttribute("dir", "ltr");
        p.textContent = pair[1].code;
        side.appendChild(p);
        if (pair[1].result) {
          var r = el("pre", "compare-result");
          r.setAttribute("dir", "ltr");
          r.textContent = pair[1].result;
          side.appendChild(r);
        }
        cmp.appendChild(side);
      });
      return cmp;
    }

    if (block.type === "error") {
      var e = el("div", "teach-error");
      e.appendChild(el("div", "teach-error-title", "⚠️ " + LC.esc(LC.t({ he: "מה קורה אם נשבור את זה?", en: "What if we break it?" }))));
      var code = el("pre", "code-block");
      code.setAttribute("dir", "ltr");
      code.textContent = block.code;
      e.appendChild(code);
      var msg = el("pre", "err-real");
      msg.setAttribute("dir", "ltr");
      msg.textContent = block.error;
      e.appendChild(msg);
      e.appendChild(el("div", "prose", LC.rich(block.explain)));
      return e;
    }

    return el("div", "", "");
  }

  /* ---- exercises ------------------------------------------------------- */

  /* ---- the battle panel attached to a level ---------------------------- */

  function battlePanel(card, level) {
    var host = el("div", "battle-host");
    card.appendChild(host);
    var view = LC.BattleView.create(host, level);

    var hud = el("div", "battle-hud");
    hud.setAttribute("dir", "ltr");
    var hudWave = el("span", "bhud", "");
    var hudHp = el("span", "bhud", "");
    var hudGold = el("span", "bhud", "");
    hud.appendChild(hudHp); hud.appendChild(hudGold); hud.appendChild(hudWave);
    host.insertBefore(hud, host.firstChild);

    var controls = el("div", "battle-controls");
    var playBtn = el("button", "btn btn-small btn-ghost", "⏸");
    playBtn.type = "button";
    playBtn.setAttribute("aria-label", "play/pause");
    var againBtn = el("button", "btn btn-small btn-ghost", "↻");
    againBtn.type = "button";
    againBtn.setAttribute("aria-label", "replay");
    var speedBtn = el("button", "btn btn-small btn-ghost", "1×");
    speedBtn.type = "button";
    controls.appendChild(playBtn);
    controls.appendChild(againBtn);
    controls.appendChild(speedBtn);
    host.appendChild(controls);

    playBtn.addEventListener("click", function () {
      if (view.isPlaying()) { view.pause(); playBtn.textContent = "▶"; }
      else { view.play(); playBtn.textContent = "⏸"; }
    });
    againBtn.addEventListener("click", function () {
      view.restart(); playBtn.textContent = "⏸";
    });
    speedBtn.addEventListener("click", function () {
      var next = view.getSpeed() === 1 ? 2 : view.getSpeed() === 2 ? 4 : 1;
      view.setSpeed(next);
      speedBtn.textContent = next + "×";
    });

    /* Boss bar. The old version counted `check.cases`, which battle bosses do
     * not have — it always drew a single segment. Track the boss monster's own
     * HP from the simulation instead. */
    var bossBar = null, bossFill = null, bossSeen = 0;
    if (level.boss) {
      var boss = el("div", "boss");
      boss.appendChild(el("div", "boss-name", (level.boss.icon || "👹") + " " + LC.esc(LC.t(level.boss.name))));
      bossBar = el("div", "boss-track boss-track-hp");
      bossFill = el("div", "boss-fill");
      bossBar.appendChild(bossFill);
      boss.appendChild(bossBar);
      host.appendChild(boss);
    }

    var startHp = level.campHp === undefined ? 10 : level.campHp;
    view.onUpdate(function (snap) {
      hudHp.textContent = "🏛️ " + snap.campHp + "/" + startHp;
      hudGold.textContent = "🪙 " + snap.gold;
      hudWave.textContent = "👾 " + snap.enemies.length;

      if (bossFill) {
        /* The boss is the toughest thing on the field. Once it has appeared,
         * keep the bar at its last value rather than snapping back to full. */
        var toughest = null;
        for (var i = 0; i < snap.enemies.length; i++) {
          var e = snap.enemies[i];
          if (!toughest || e.maxHp > toughest.maxHp) toughest = e;
        }
        if (toughest && toughest.maxHp >= (level.boss.hp || 0)) {
          bossSeen = Math.max(0, toughest.hp / toughest.maxHp);
          bossFill.style.width = (bossSeen * 100) + "%";
        } else if (bossSeen > 0) {
          bossSeen = 0;
          bossFill.style.width = "0%";
        }
      }
    });
    hudHp.textContent = "🏛️ " + startHp + "/" + startHp;
    hudGold.textContent = "🪙 " + level.gold;
    hudWave.textContent = "👾 0";

    window.addEventListener("resize", function () { view.relayout(); });
    return { view: view, playBtn: playBtn };
  }

  /* A future battle, not yet reached. No editor, no canvas, no simulation —
   * she cannot skip ahead to it, but she is never told nothing is coming.
   * See spec/02-game-design.md: a skip-ahead affordance may never appear
   * mid-lesson. This is the opposite of that: a locked stop she cannot open
   * early, not an escape hatch past one she has not earned yet. */
  function renderLockedCard(ex, index, isQuest) {
    var card = el("section", "exercise exercise-locked" + (isQuest ? " exercise-quest" : ""));
    card.setAttribute("aria-disabled", "true");
    card.setAttribute("tabindex", "-1");
    var head = el("header", "exercise-head");
    head.appendChild(el("span", "exercise-num", "🔒"));
    head.appendChild(el("h3", "exercise-title", LC.esc(LC.t(ex.title))));
    card.appendChild(head);
    card.appendChild(el("p", "prose locked-note", LC.esc(LC.s("lockedNote"))));
    return card;
  }

  function renderExercise(ex, index, isQuest, opts) {
    opts = opts || {};
    var lessonId = current.id;
    var isBattle = ex.check && ex.check.kind === "battle";
    var card = el("section", "exercise" + (isQuest ? " exercise-quest" : "") + (isBattle ? " exercise-battle" : ""));
    var solved = LC.Game.isExerciseDone(lessonId, ex.id);
    if (solved) card.classList.add("is-solved");

    var head = el("header", "exercise-head");
    var num = isQuest ? "★" : String(index + 1);
    head.appendChild(el("span", "exercise-num", num));
    head.appendChild(el("h3", "exercise-title", LC.esc(LC.t(ex.title))));
    /* Numbers + Latin units in RTL prose reverse without isolation:
     * "+25 XP · 8" renders as "8 · XP 25+". See spec/03-i18n-and-rtl.md. */
    var reward = el("span", "exercise-reward", "+" + ex.xp + " XP · " + ex.drachmas + " 🪙");
    reward.setAttribute("dir", "ltr");
    head.appendChild(reward);
    card.appendChild(head);
    card.appendChild(el("div", "prose exercise-brief", LC.rich(ex.brief)));

    /* the battlefield sits between the brief and the editor, so she can read
     * the coordinates while she writes the code that uses them */
    var battle = isBattle ? battlePanel(card, ex) : null;

    /* A non-battle boss (multiple test cases) still drains a segmented bar.
     * Battle bosses use the HP bar drawn inside battlePanel instead. */
    var bossBar = null;
    if (isQuest && ex.boss && !isBattle) {
      var boss = el("div", "boss");
      boss.appendChild(el("div", "boss-name", ex.boss.icon + " " + LC.esc(LC.t(ex.boss.name))));
      var track = el("div", "boss-track");
      var total = ((ex.check || {}).cases || []).length || 1;
      for (var b = 0; b < total; b++) {
        track.appendChild(el("span", "boss-seg"));
      }
      boss.appendChild(track);
      card.appendChild(boss);
      bossBar = track;
    }

    var output = makeOutput();
    var editor = LC.Editor.create(card, {
      value: ex.starter || "",
      onRun: doCheck,
      label: LC.t(ex.title)
    });
    /* Exposed so a "next battle" button on another card can focus THIS
     * card's editor once it has been revealed. */
    card.lcFocusEditor = function () { editor.focus(); };

    var bar = el("div", "runner-bar");
    var checkBtn = el("button", "btn btn-run", LC.esc(isBattle ? LC.s("fight") : LC.s("check")));
    checkBtn.type = "button";
    var resetBtn = el("button", "btn btn-ghost", LC.esc(LC.s("reset")));
    resetBtn.type = "button";
    var hintBtn = el("button", "btn btn-hint", "💡 " + LC.esc(LC.s("hint")));
    hintBtn.type = "button";
    bar.appendChild(checkBtn);
    bar.appendChild(resetBtn);
    bar.appendChild(hintBtn);
    card.appendChild(bar);
    card.appendChild(output.el);

    /* The outcome must never be conveyed only by colour or by the animation:
     * announce it. See spec/08-quality-checklist.md and spec/09-battle-game.md. */
    var verdict = el("div", "verdict");
    verdict.setAttribute("role", "status");
    verdict.setAttribute("aria-live", "polite");
    card.appendChild(verdict);
    var hintBox = el("div", "hints");
    card.appendChild(hintBox);

    resetBtn.addEventListener("click", function () {
      editor.reset(); output.clear(); verdict.innerHTML = ""; verdict.className = "verdict";
    });

    /* hint ladder: nudge -> tool -> walkthrough -> solution */
    var hintsShown = 0;
    var solutionArmed = false;
    hintBtn.addEventListener("click", function () {
      var hints = ex.hints || [];
      if (hintsShown < hints.length) {
        var cost = LC.Game.spendAmbrosia();
        LC.Game.noteHint(lessonId);
        var h = el("div", "hint");
        h.appendChild(el("span", "hint-num", String(hintsShown + 1)));
        h.appendChild(el("span", "hint-body", LC.rich(hints[hintsShown])));
        hintBox.appendChild(h);
        hintsShown++;
        if (cost === "free") {
          LC.Game.toast(LC.t({ he: "נגמרה האמברוסיה — הרמז בכל זאת שלך.",
                               en: "Out of ambrosia — the hint is yours anyway." }));
        }
        if (hintsShown >= hints.length) {
          hintBtn.textContent = "📜 " + LC.s("showSolution");
        }
        return;
      }
      /* solution requires a second, deliberate click */
      if (!solutionArmed) {
        solutionArmed = true;
        hintBtn.textContent = LC.s("confirmSolution");
        return;
      }
      hintBtn.disabled = true;
      var sol = el("div", "solution");
      sol.appendChild(el("div", "solution-title", "📜 " + LC.esc(LC.s("solutionLabel"))));
      var pre = el("pre", "code-block");
      pre.setAttribute("dir", "ltr");
      pre.textContent = ex.solution || "";
      sol.appendChild(pre);
      hintBox.appendChild(sol);
    });

    function paintBoss(passedCount) {
      if (!bossBar) return;
      var segs = bossBar.querySelectorAll(".boss-seg");
      for (var i = 0; i < segs.length; i++) {
        segs[i].className = "boss-seg" + (i < passedCount ? " gone" : "");
      }
    }

    function doCheck() {
      checkBtn.disabled = true;
      checkBtn.textContent = LC.s("running");
      output.clear();
      verdict.innerHTML = "";
      verdict.className = "verdict";
      var source = editor.get();

      return LC.Checker.check(ex, source).then(function (res) {
        checkBtn.disabled = false;
        checkBtn.textContent = isBattle ? LC.s("fight") : LC.s("check");

        /* Play the battle back, win or lose — watching where they got through
         * IS the debugging. */
        if (battle && res.sim) {
          battle.view.show(res.sim, {
            label: res.pass ? "The camp holds" : "Monsters reached the camp"
          });
          battle.playBtn.textContent = "⏸";
        }

        /* show what her program actually printed */
        if (res.runs && res.runs.length) {
          var last = res.runs[res.runs.length - 1];
          var shown = last.actual !== undefined ? last.actual : last.output;
          if (shown) output.set(shown); else output.empty();
        }
        if (res.error) {
          output.showError(res.error, res.explanation);
          editor.markError(res.error.line);
        }
        if (res.total) paintBoss(res.passedCount || 0);

        if (res.pass) {
          verdict.className = "verdict is-pass";
          verdict.innerHTML = "<strong>✓ " + LC.esc(isBattle ? LC.s("campHolds") : LC.s("correct")) + "</strong>";
          var already = LC.Game.markExerciseDone(lessonId, ex.id);
          if (!already) {
            LC.Game.award(ex.xp, ex.drachmas);
            LC.Game.toast(LC.Game.ltr("+" + ex.xp + " XP"));
            var fails = LC.Game.lessonState(lessonId).fails[ex.id] || 0;
            if (fails >= 5) LC.Game.unlock("persistent");
            var typeCalls = (source.match(/\btype\s*\(/g) || []).length;
            if (isBattle && typeCalls >= 3) LC.Game.unlock("typeDetective");
          }
          card.classList.add("is-solved");
          maybeCompleteLesson();

          /* Reveal the next locked battle, if there is one, and hand her a
           * focused way to reach it — the reveal itself already happened,
           * this button is purely a convenience jump. See
           * spec/02-game-design.md: no skip-ahead affordance mid-lesson. */
          if (opts.onWin) {
            var revealed = opts.onWin();
            if (revealed) {
              var nextBtn = el("button", "btn next-battle-btn",
                "⚔ " + LC.esc(LC.s("nextBattle")) + " →");
              nextBtn.type = "button";
              nextBtn.addEventListener("click", function () {
                scrollToCard(revealed.el);
                if (revealed.el.lcFocusEditor) revealed.el.lcFocusEditor();
              });
              verdict.appendChild(nextBtn);
              nextBtn.focus();
            }
          }
        } else {
          verdict.className = "verdict is-fail";
          var why = res.reason ? LC.rich(res.reason) : LC.esc(LC.s("tryAgain"));
          verdict.innerHTML = "<strong>" + LC.esc(isBattle ? LC.s("campFell") : LC.s("notYet")) + "</strong> " + why;
          LC.Game.noteFailure(lessonId, ex.id);
        }
        return res;
      });
    }

    checkBtn.addEventListener("click", doCheck);
    return card;
  }

  /* ---- completion ------------------------------------------------------ */

  /* Optional side quests are rendered and rewarded, but never block completing
   * the lesson. See spec/07-curriculum.md. */
  function allExercises() {
    var list = (current.training || []).filter(function (ex) { return !ex.optional; });
    if (current.quest) list.push(current.quest);
    return list;
  }

  function maybeCompleteLesson() {
    var all = allExercises();
    for (var i = 0; i < all.length; i++) {
      if (!LC.Game.isExerciseDone(current.id, all[i].id)) return;
    }
    var first = LC.Game.completeLesson(current.id, current.item, 30);
    var panel = document.getElementById("lesson-complete");
    if (panel) {
      panel.classList.add("show");
      /* Only jump on the FIRST completion — replaying an already-finished
       * lesson should not yank her down the page every time. */
      if (first) {
        scrollToCard(panel);
        var cta = panel.parentNode && panel.parentNode.querySelector(".next-box .btn-run");
        if (cta) {
          cta.focus();
        } else {
          panel.setAttribute("tabindex", "-1");
          panel.focus();
        }
      }
    }
    if (first && current.item) {
      LC.Game.toast(current.item.icon + " " + LC.t({ he: "קיבלת", en: "You earned" }) + " " + LC.t(current.item.name), "item");
    }
  }

  /* ---- page ------------------------------------------------------------ */

  function section(titleKey, extraClass) {
    var s = el("section", "beat " + (extraClass || ""));
    s.appendChild(el("h2", "beat-title", LC.esc(LC.s(titleKey))));
    return s;
  }

  /* Chrome, not a beat: a row of stops under the title, not one of the six
   * fixed sections. Only solved and current stops are live links — a locked
   * one is inert, so this never becomes the skip-ahead affordance
   * spec/02-game-design.md rules out. */
  function renderRail(orderedAll, firstOpenIdx) {
    if (orderedAll.length < 2) return null;
    var rail = el("nav", "ex-rail");
    rail.setAttribute("aria-label", LC.s("secTraining"));
    orderedAll.forEach(function (ex, i) {
      var solved = LC.Game.isExerciseDone(current.id, ex.id);
      var isQuestItem = !!(current.quest && ex.id === current.quest.id);
      var state = solved ? "solved" : (i === firstOpenIdx ? "current" : "locked");
      var dot = el(state === "locked" ? "span" : "a", "rail-dot rail-" + state,
        isQuestItem ? "★" : String(i + 1));
      var labelKey = state === "solved" ? "solvedAlready" : (state === "current" ? "startHere" : "locked");
      dot.setAttribute("aria-label", LC.t(ex.title) + " — " + LC.s(labelKey));
      if (state !== "locked") {
        dot.setAttribute("href", "#ex-" + ex.id);
        dot.addEventListener("click", function (e) {
          e.preventDefault();
          scrollToCard(document.getElementById("ex-" + ex.id));
        });
      }
      rail.appendChild(dot);
    });
    return rail;
  }

  function render() {
    var root = document.getElementById("app");
    root.innerHTML = "";
    var meta = LC.lessonMeta(current.id);
    var next = LC.nextLesson(current.id);

    /* header + HUD */
    var header = el("header", "topbar");
    var back = el("a", "btn btn-ghost btn-back");
    back.setAttribute("href", LC.href.home());
    back.textContent = "◂ " + LC.s("backToMap");
    header.appendChild(back);
    var hud = el("div", "hud");
    hud.setAttribute("data-hud", "");
    header.appendChild(hud);
    var langBtn = el("button", "btn btn-ghost btn-lang", LC.esc(LC.s("langToggle")));
    langBtn.type = "button";
    langBtn.addEventListener("click", function () { LC.i18n.toggle(); });
    header.appendChild(langBtn);
    root.appendChild(header);

    /* title */
    var title = el("div", "lesson-title");
    title.appendChild(el("div", "lesson-eyebrow",
      LC.esc(LC.t({ he: "שיעור", en: "Lesson" }) + " " + parseInt(current.id, 10) + " · " +
             LC.t(LC.ACTS[(meta ? meta.act : 1) - 1].title))));
    title.appendChild(el("h1", "", LC.esc(LC.t(current.title))));
    if (current.subtitle) title.appendChild(el("p", "lesson-sub", LC.esc(LC.t(current.subtitle))));
    root.appendChild(title);

    /* Reveal order: training battles in written order, then the quest. A
     * battle is open if it is solved, or it is the first unsolved one —
     * everything after that renders as a locked strip. A queue, not a skip:
     * nothing can be reached out of order. See spec/02-game-design.md. */
    var orderedAll = (current.training || []).slice();
    if (current.quest) orderedAll.push(current.quest);
    var firstOpenIdx = orderedAll.length;
    for (var oi = 0; oi < orderedAll.length; oi++) {
      if (!LC.Game.isExerciseDone(current.id, orderedAll[oi].id)) { firstOpenIdx = oi; break; }
    }
    var slots = [];

    function revealNext(globalIndex) {
      var nextIdx = globalIndex + 1;
      if (nextIdx >= orderedAll.length) return null;
      var slot = slots[nextIdx];
      if (!slot || slot.open) return slot || null;
      var card = renderExercise(slot.ex, slot.indexInGroup, slot.isQuest,
        { onWin: function () { return revealNext(nextIdx); } });
      card.id = "ex-" + slot.ex.id;
      slot.container.replaceChild(card, slot.el);
      slot.el = card;
      slot.open = true;
      return slot;
    }

    var rail = renderRail(orderedAll, firstOpenIdx);
    if (rail) root.appendChild(rail);

    /* 1 — prophecy */
    var proph = section("secProphecy", "beat-prophecy");
    var scroll = el("div", "scroll");
    (current.prophecy.lines || []).forEach(function (line) {
      scroll.appendChild(el("p", "scroll-line", LC.rich(line)));
    });
    proph.appendChild(scroll);
    root.appendChild(proph);

    /* 2 — teach */
    var teach = section("secTeach", "beat-teach");
    (current.teach || []).forEach(function (block) {
      teach.appendChild(renderTeachBlock(block));
    });
    root.appendChild(teach);

    /* 3 — try it */
    if (current.tryIt) {
      var tryIt = section("secTryIt", "beat-try");
      if (current.tryIt.intro) tryIt.appendChild(el("p", "prose", LC.rich(current.tryIt.intro)));
      tryIt.appendChild(runnerWidget({
        code: current.tryIt.starter || "",
        editable: true,
        label: LC.s("secTryIt")
      }).el);
      root.appendChild(tryIt);
    }

    /* 4 — training */
    var training = section("secTraining", "beat-training");
    (current.training || []).forEach(function (ex, i) {
      var solved = LC.Game.isExerciseDone(current.id, ex.id);
      var open = solved || i === firstOpenIdx;
      var node = open
        ? renderExercise(ex, i, false, { onWin: function () { return revealNext(i); } })
        : renderLockedCard(ex, i, false);
      node.id = "ex-" + ex.id;
      training.appendChild(node);
      slots.push({ ex: ex, isQuest: false, indexInGroup: i, container: training, el: node, open: open });
    });
    root.appendChild(training);

    /* 5 — quest / boss */
    if (current.quest) {
      var qIdx = (current.training || []).length;
      var solvedQ = LC.Game.isExerciseDone(current.id, current.quest.id);
      var openQ = solvedQ || qIdx === firstOpenIdx;
      var quest = section(current.quest.boss ? "secBoss" : "secQuest", "beat-quest");
      var qnode = openQ
        ? renderExercise(current.quest, 0, true, { onWin: function () { return revealNext(qIdx); } })
        : renderLockedCard(current.quest, 0, true);
      qnode.id = "ex-" + current.quest.id;
      quest.appendChild(qnode);
      root.appendChild(quest);
      slots.push({ ex: current.quest, isQuest: true, indexInGroup: 0, container: quest, el: qnode, open: openQ });
    }

    /* 6 — recap */
    var recap = section("secRecap", "beat-recap");
    var done = el("div", "complete", "");
    done.id = "lesson-complete";
    if (LC.Game.isLessonDone(current.id)) done.classList.add("show");
    if (current.item) {
      var item = el("div", "item-card");
      item.appendChild(el("div", "item-icon", current.item.icon));
      var itemText = el("div", "item-text");
      itemText.appendChild(el("div", "item-label", LC.esc(LC.s("itemEarned"))));
      itemText.appendChild(el("div", "item-name", LC.esc(LC.t(current.item.name))));
      itemText.appendChild(el("div", "item-desc", LC.rich(current.item.desc)));
      item.appendChild(itemText);
      done.appendChild(item);
    }
    recap.appendChild(done);

    var list = el("ul", "recap-list");
    (current.recap.bullets || []).forEach(function (b) {
      list.appendChild(el("li", "", LC.rich(b)));
    });
    recap.appendChild(list);

    if (current.recap.next) {
      var nextBox = el("div", "next-box");
      nextBox.appendChild(el("div", "next-label", LC.esc(LC.s("whatsNext"))));
      nextBox.appendChild(el("div", "prose", LC.rich(current.recap.next)));
      if (next) {
        var link = el("a", "btn btn-run");
        link.setAttribute("href", next.built ? LC.href.lesson(next.id) : LC.href.home());
        link.textContent = (next.built ? LC.s("nextLesson") : LC.s("backToMap")) + " ▸";
        nextBox.appendChild(link);
      }
      recap.appendChild(nextBox);
    }
    root.appendChild(recap);

    LC.Game.renderHud();
    LC.i18n.apply(root);
  }

  /* A deep link to one battle (#ex-b3): land there if it is open. If it is
   * locked or missing, land on the current battle instead of the top of the
   * page — she followed a link expecting to reach the exercises. Never acts
   * on a plain page load with no hash. */
  function scrollToHash() {
    var hash = window.location.hash;
    if (!hash || hash.indexOf("#ex-") !== 0) return;
    var target = document.getElementById(hash.slice(1));
    if (target && !target.classList.contains("exercise-locked")) {
      scrollToCard(target);
      return;
    }
    var open = document.querySelector(".exercise:not(.exercise-locked):not(.is-solved)");
    if (!open) {
      var all = document.querySelectorAll(".exercise");
      open = all[all.length - 1];
    }
    scrollToCard(open);
  }

  LC.Lesson = {
    mount: function (id) {
      current = LC.LESSONS[id];
      if (!current) {
        document.getElementById("app").textContent = "Lesson " + id + " not found.";
        return;
      }
      render();
      scrollToHash();
      /* Re-render on language change: content strings live in the objects, not
       * in data-i18n attributes, so a full re-render is the honest approach.
       * Editor contents are intentionally NOT preserved — see notes in
       * spec/03-i18n-and-rtl.md; we keep scroll position instead. */
      LC.i18n.onChange(function () {
        var y = window.scrollY;
        render();
        window.scrollTo(0, y);
      });
    }
  };
})(window.LC);
