/* hub.js — the quest map on index.html: claiming, progress, inventory.
 * See spec/02-game-design.md.
 */
window.LC = window.LC || {};
(function (LC) {
  "use strict";

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  }

  /* ---- claiming -------------------------------------------------------- */

  var QUESTIONS = [
    { q: { he: "מול משהו מפחיד — מה את עושה ראשון?", en: "Facing something frightening — what do you do first?" },
      a: [ { t: { he: "בודקת מה החולשה שלו", en: "Look for its weakness" }, c: "athena" },
           { t: { he: "מסתערת",              en: "Charge" },                c: "ares" },
           { t: { he: "מחפשת דרך לעקוף",     en: "Find a way around" },     c: "hermes" },
           { t: { he: "מרגישה מה נכון",      en: "Feel what's right" },     c: "poseidon" } ] },
    { q: { he: "איפה היית מבלה יום שלם?", en: "Where would you spend a whole day?" },
      a: [ { t: { he: "בסדנה, בונה משהו",   en: "In a workshop, building" }, c: "hephaestus" },
           { t: { he: "בספרייה",             en: "In a library" },           c: "athena" },
           { t: { he: "בים",                 en: "At the sea" },             c: "poseidon" },
           { t: { he: "בגינה, עם צמחים",     en: "In a garden" },            c: "demeter" } ] },
    { q: { he: "חברה שלך עצובה. את…", en: "A friend is sad. You…" },
      a: [ { t: { he: "יודעת בדיוק מה להגיד", en: "Know exactly what to say" }, c: "aphrodite" },
           { t: { he: "מנגנת לה משהו",        en: "Play her something" },       c: "apollo" },
           { t: { he: "פותרת לה את הבעיה",    en: "Solve the problem for her" },c: "athena" },
           { t: { he: "מוציאה אותה להרפתקה",  en: "Drag her on an adventure" }, c: "hermes" } ] },
    { q: { he: "מה הכי מרגיז אותך?", en: "What annoys you most?" },
      a: [ { t: { he: "אי־צדק",              en: "Unfairness" },            c: "ares" },
           { t: { he: "בזבוז זמן",           en: "Wasted time" },           c: "hermes" },
           { t: { he: "משהו שבור שאף אחד לא מתקן", en: "Something broken nobody fixes" }, c: "hephaestus" },
           { t: { he: "שקרים",               en: "Lies" },                  c: "apollo" } ] },
    { q: { he: "בחרי מזג אוויר.", en: "Pick a weather." },
      a: [ { t: { he: "סערה בים",            en: "A storm at sea" },        c: "poseidon" },
           { t: { he: "שמש חזקה",            en: "Bright sun" },            c: "apollo" },
           { t: { he: "ערפל",                en: "Fog" },                   c: "hermes" },
           { t: { he: "אחרי הגשם",           en: "Just after rain" },       c: "demeter" } ] }
  ];

  function renderClaiming(root, onDone) {
    var step = -1;
    var tally = {};
    var box = el("div", "claim");
    root.appendChild(box);

    function draw() {
      box.innerHTML = "";
      if (step === -1) {
        box.appendChild(el("h2", "claim-title", LC.esc(LC.s("nameQuestion"))));
        var form = el("form", "claim-name");
        var input = document.createElement("input");
        input.type = "text";
        input.className = "claim-input";
        input.setAttribute("maxlength", "24");
        input.setAttribute("placeholder", LC.s("namePlaceholder"));
        var go = el("button", "btn btn-run", LC.esc(LC.s("beginClaiming")));
        go.type = "submit";
        var skip = el("button", "btn btn-ghost", LC.esc(LC.s("skipName")));
        skip.type = "button";
        form.appendChild(input);
        form.appendChild(go);
        form.appendChild(skip);
        box.appendChild(form);
        input.focus();
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          LC.store.update(function (s) { s.name = input.value.trim(); });
          step = 0; draw();
        });
        skip.addEventListener("click", function () { step = 0; draw(); });
        return;
      }

      if (step < QUESTIONS.length) {
        var q = QUESTIONS[step];
        box.appendChild(el("div", "claim-step", (step + 1) + " / " + QUESTIONS.length));
        box.appendChild(el("h2", "claim-title", LC.esc(LC.t(q.q))));
        var opts = el("div", "claim-options");
        q.a.forEach(function (option) {
          var b = el("button", "claim-option", LC.esc(LC.t(option.t)));
          b.type = "button";
          b.addEventListener("click", function () {
            tally[option.c] = (tally[option.c] || 0) + 1;
            step++; draw();
          });
          opts.appendChild(b);
        });
        box.appendChild(opts);
        return;
      }

      /* pick the winner; ties break toward the earliest answered */
      var best = "hermes", bestN = -1;
      for (var k in tally) {
        if (tally[k] > bestN) { best = k; bestN = tally[k]; }
      }
      LC.store.update(function (s) { s.cabin = best; s.claimed = true; });
      var cabin = LC.Game.CABINS[best];
      box.className = "claim claim-result";
      box.innerHTML = "";
      box.appendChild(el("div", "claim-symbol", cabin.icon));
      box.appendChild(el("div", "claim-label", LC.esc(LC.s("claimedBy"))));
      box.appendChild(el("h2", "claim-god", LC.esc(LC.t(cabin.name))));
      box.appendChild(el("p", "claim-trait", LC.esc(LC.t(cabin.trait))));
      var enter = el("button", "btn btn-run", LC.esc(LC.s("enterCamp")));
      enter.type = "button";
      enter.addEventListener("click", onDone);
      box.appendChild(enter);
      LC.Game.renderHud();
    }

    draw();
  }

  /* ---- map ------------------------------------------------------------- */

  function renderMap(root) {
    var byAct = {};
    LC.CURRICULUM.forEach(function (l) {
      (byAct[l.act] = byAct[l.act] || []).push(l);
    });

    var map = el("div", "map");
    LC.ACTS.forEach(function (act) {
      var lessons = byAct[act.n] || [];
      var actBox = el("section", "act");
      var head = el("header", "act-head");
      head.appendChild(el("span", "act-num", String(act.n)));
      var headText = el("div", "act-head-text");
      headText.appendChild(el("h2", "act-title", LC.esc(LC.t(act.title))));
      headText.appendChild(el("div", "act-scene", LC.esc(LC.t(act.scene))));
      head.appendChild(headText);
      actBox.appendChild(head);

      var stops = el("ol", "stops");
      lessons.forEach(function (l) {
        var done = LC.Game.isLessonDone(l.id);
        var unlocked = LC.Game.isUnlocked(l.id);
        var playable = unlocked && l.built;

        var li = el("li", "stop" +
          (done ? " is-done" : "") +
          (playable ? " is-open" : "") +
          (!l.built ? " is-soon" : "") +
          (!unlocked ? " is-locked" : ""));

        var node = playable ? el("a", "stop-link") : el("div", "stop-link");
        if (playable) node.setAttribute("href", "lessons/lesson-" + l.id + ".html");

        node.appendChild(el("span", "stop-icon", done ? "✓" : (unlocked ? l.icon : "🔒")));
        var text = el("div", "stop-text");
        text.appendChild(el("div", "stop-title",
          LC.esc(parseInt(l.id, 10) + ". " + LC.t(l.title)) + (l.boss ? ' <span class="boss-tag">BOSS</span>' : "")));
        text.appendChild(el("div", "stop-teaches", LC.esc(LC.t(l.teaches))));
        node.appendChild(text);

        var status = el("span", "stop-status");
        if (done) status.textContent = "✓";
        else if (!l.built) status.textContent = LC.s("comingSoon");
        else if (!unlocked) status.textContent = LC.s("locked");
        else status.textContent = LC.s("startHere");
        node.appendChild(status);

        li.appendChild(node);
        stops.appendChild(li);
      });
      actBox.appendChild(stops);
      map.appendChild(actBox);
    });
    root.appendChild(map);
  }

  function renderInventory(root) {
    var s = LC.store.get();
    var box = el("section", "pack");
    box.appendChild(el("h2", "pack-title", LC.esc(LC.s("inventory"))));
    if (!s.items.length) {
      box.appendChild(el("p", "muted", LC.esc(LC.s("emptyPack"))));
    } else {
      var grid = el("div", "pack-grid");
      /* Items are declared by lessons; we only know the ones already earned,
       * so render from the curriculum icons as a stable stand-in. */
      s.items.forEach(function (id) {
        var chip = el("div", "pack-item");
        chip.appendChild(el("span", "pack-icon", "📿"));
        chip.appendChild(el("span", "pack-name", LC.esc(id)));
        grid.appendChild(chip);
      });
      box.appendChild(grid);
    }

    if (s.achievements.length) {
      var ach = el("div", "achievements");
      s.achievements.forEach(function (key) {
        var a = LC.Game.ACHIEVEMENTS[key];
        if (!a) return;
        var chip = el("span", "ach");
        chip.setAttribute("title", LC.t(a.desc));
        chip.textContent = a.icon + " " + LC.t(a.name);
        ach.appendChild(chip);
      });
      box.appendChild(ach);
    }
    root.appendChild(box);
  }

  function renderProgressTools(root) {
    var box = el("section", "savebox");
    box.appendChild(el("h2", "pack-title", LC.esc(LC.s("progress"))));
    if (!LC.store.isPersistent()) {
      box.appendChild(el("p", "warn-line", LC.esc(LC.s("saveWarning"))));
    }
    var area = document.createElement("textarea");
    area.className = "savearea";
    area.setAttribute("dir", "ltr");
    area.setAttribute("spellcheck", "false");
    area.setAttribute("aria-label", LC.s("progress"));

    var bar = el("div", "runner-bar");
    var out = el("button", "btn btn-ghost", LC.esc(LC.s("exportSave")));
    out.type = "button";
    out.addEventListener("click", function () {
      area.value = LC.store.exportText();
      area.focus();
      area.select();
    });
    var inBtn = el("button", "btn btn-ghost", LC.esc(LC.s("importSave")));
    inBtn.type = "button";
    inBtn.addEventListener("click", function () {
      if (LC.store.importText(area.value)) {
        /* setLang fires the language listener, which re-mounts the hub. */
        LC.i18n.setLang(LC.store.get().lang || "he", { persist: false });
      } else {
        LC.Game.toast(LC.t({ he: "הטקסט הזה לא נראה כמו גיבוי תקין.",
                             en: "That text does not look like a valid backup." }));
      }
    });
    var reroll = el("button", "btn btn-ghost", LC.esc(LC.s("rerollClaim")));
    reroll.type = "button";
    reroll.addEventListener("click", function () {
      LC.store.update(function (s) { s.claimed = false; });
      LC.Hub.mount();
    });
    bar.appendChild(out); bar.appendChild(inBtn); bar.appendChild(reroll);
    box.appendChild(bar);
    box.appendChild(area);
    root.appendChild(box);
  }

  /* NOTE: mount() must NOT call LC.i18n.init(). The language listener below
   * re-renders by calling mount(), and init() fires that listener — calling
   * init() here recurses forever. The page bootstrap calls init() once. */
  function mount() {
    var root = document.getElementById("app");
    root.innerHTML = "";

    var header = el("header", "topbar");
    var brand = el("div", "brand");
    brand.appendChild(el("span", "brand-mark", "⚡"));
    brand.appendChild(el("span", "brand-name", LC.esc(LC.s("appName"))));
    header.appendChild(brand);
    var hud = el("div", "hud");
    hud.setAttribute("data-hud", "");
    header.appendChild(hud);
    var langBtn = el("button", "btn btn-ghost btn-lang", LC.esc(LC.s("langToggle")));
    langBtn.type = "button";
    langBtn.addEventListener("click", function () { LC.i18n.toggle(); });
    header.appendChild(langBtn);
    root.appendChild(header);

    if (!LC.store.get().claimed) {
      var hero = el("div", "hero");
      hero.appendChild(el("h1", "", LC.esc(LC.s("appName"))));
      hero.appendChild(el("p", "hero-sub", LC.esc(LC.s("tagline"))));
      root.appendChild(hero);
      renderClaiming(root, mount);
      LC.Game.renderHud();
      LC.i18n.apply(root);
      return;
    }

    var hero2 = el("div", "hero hero-small");
    hero2.appendChild(el("h1", "", LC.esc(LC.s("yourQuest"))));
    root.appendChild(hero2);

    renderMap(root);
    renderInventory(root);
    renderProgressTools(root);
    LC.Game.renderHud();
    LC.i18n.apply(root);
  }

  LC.Hub = { mount: mount };

  LC.i18n.onChange(function () {
    if (document.getElementById("app") && document.body.classList.contains("hub-page")) mount();
  });
})(window.LC);
