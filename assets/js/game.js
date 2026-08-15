/* game.js — XP, levels, cabins, items, achievements, the HUD.
 * See spec/02-game-design.md. No punishment mechanics: nothing is ever lost.
 */
window.LC = window.LC || {};
(function (LC) {
  "use strict";

  var LEVELS = [
    { xp: 0,    title: { he: "טירונית",           en: "Recruit" } },
    { xp: 200,  title: { he: "חניכת מחנה",        en: "Camper" } },
    { xp: 600,  title: { he: "נושאת חרב",         en: "Blade-Bearer" } },
    { xp: 1200, title: { he: "יוצאת למסע",        en: "Quester" } },
    { xp: 2000, title: { he: "גיבורה",            en: "Hero" } },
    { xp: 3000, title: { he: "אלופת אולימפוס",    en: "Champion of Olympus" } },
    { xp: 4200, title: { he: "אולימפית",          en: "Olympian" } }
  ];

  var CABINS = {
    athena:     { icon: "🦉", accent: "#9aa88f", name: { he: "אתנה",    en: "Athena" },     trait: { he: "תכנון, אסטרטגיה, לראות את הצעד הבא",  en: "planning, strategy, seeing the next move" } },
    poseidon:   { icon: "🔱", accent: "#3d8fc4", name: { he: "פוסידון", en: "Poseidon" },   trait: { he: "אינסטינקט, מים, סערות",              en: "instinct, water, storms" } },
    hermes:     { icon: "⚕️", accent: "#a9b6c4", name: { he: "הרמס",    en: "Hermes" },     trait: { he: "מהירות, תחבולות, קיצורי דרך",        en: "speed, tricks, shortcuts" } },
    apollo:     { icon: "☀️", accent: "#e6b422", name: { he: "אפולו",   en: "Apollo" },     trait: { he: "אור, מוזיקה, נבואה",                 en: "light, music, prophecy" } },
    hephaestus: { icon: "⚒️", accent: "#d2762c", name: { he: "הפייסטוס", en: "Hephaestus" }, trait: { he: "לבנות, לתקן, מכונות",               en: "building, fixing, machines" } },
    ares:       { icon: "⚔️", accent: "#c1483f", name: { he: "ארס",     en: "Ares" },       trait: { he: "כוח, אומץ, להסתער קדימה",            en: "force, courage, charging in" } },
    demeter:    { icon: "🌾", accent: "#6aa84f", name: { he: "דמטר",    en: "Demeter" },    trait: { he: "צמיחה, סבלנות",                      en: "growth, patience" } },
    aphrodite:  { icon: "🕊️", accent: "#d98ca6", name: { he: "אפרודיטה", en: "Aphrodite" }, trait: { he: "קסם, יופי, אנשים",                   en: "charm, beauty, people" } }
  };

  var ACHIEVEMENTS = {
    firstWord:   { icon: "✨", name: { he: "המילה הראשונה",   en: "First Word" },      desc: { he: "הרצת את התוכנית הראשונה שלך",      en: "You ran your first program" } },
    debugger:    { icon: "🔧", name: { he: "מנפה באגים",      en: "Debugger" },        desc: { he: "תיקנת שגיאה והרצת שוב בהצלחה",     en: "You fixed an error and got it running" } },
    persistent:  { icon: "🪨", name: { he: "עקשנית",          en: "Persistent" },      desc: { he: "פתרת תרגיל אחרי חמישה ניסיונות",   en: "You solved an exercise after five tries" } },
    noHints:     { icon: "🎯", name: { he: "בלי רמזים",       en: "No Hints Needed" }, desc: { he: "סיימת שיעור שלם בלי רמז אחד",      en: "You finished a whole lesson with no hints" } },
    firstLesson: { icon: "📿", name: { he: "חניכה",           en: "Initiated" },       desc: { he: "סיימת את השיעור הראשון",           en: "You finished your first lesson" } }
  };

  function levelFor(xp) {
    var idx = 0;
    for (var i = 0; i < LEVELS.length; i++) if (xp >= LEVELS[i].xp) idx = i;
    var next = LEVELS[idx + 1] || null;
    return {
      n: idx + 1,
      title: LEVELS[idx].title,
      floor: LEVELS[idx].xp,
      next: next ? next.xp : null,
      progress: next ? (xp - LEVELS[idx].xp) / (next.xp - LEVELS[idx].xp) : 1
    };
  }

  function lessonState(id) {
    var s = LC.store.get();
    if (!s.lessons[id]) {
      s.lessons[id] = { done: false, exercisesDone: [], hintsUsed: 0, runs: 0, fails: {} };
    }
    var st = s.lessons[id];
    if (!Array.isArray(st.exercisesDone)) st.exercisesDone = [];
    if (typeof st.fails !== "object" || st.fails === null) st.fails = {};
    return st;
  }

  /* ---- toasts ---------------------------------------------------------- */

  var toastTimer = null;

  /* Numbers paired with a Latin unit reverse inside an RTL page: "+20 XP"
   * renders as "XP 20+". See spec/03-i18n-and-rtl.md. */
  function ltr(text) {
    return '<bdi dir="ltr">' + LC.esc(text) + "</bdi>";
  }

  function toast(html, kind) {
    var el = document.getElementById("lc-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "lc-toast";
      el.setAttribute("role", "status");
      el.setAttribute("aria-live", "polite");
      document.body.appendChild(el);
    }
    el.className = "toast show" + (kind ? " toast-" + kind : "");
    el.innerHTML = html;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.className = "toast"; }, 3200);
  }

  /* ---- rewards --------------------------------------------------------- */

  function award(xp, drachmas) {
    var before = levelFor(LC.store.get().xp).n;
    var after = before;
    LC.store.update(function (s) {
      s.xp += xp || 0;
      s.drachmas += drachmas || 0;
      after = levelFor(s.xp).n;
    });
    LC.Game.renderHud();
    if (after > before) {
      var lvl = levelFor(LC.store.get().xp);
      toast("⚡ " + ltr(LC.s("level") + " " + lvl.n) + " · " + LC.esc(LC.t(lvl.title)), "level");
    }
    return after > before;
  }

  function unlock(key) {
    var got = false;
    LC.store.update(function (s) {
      if (s.achievements.indexOf(key) === -1) { s.achievements.push(key); got = true; }
    });
    if (got && ACHIEVEMENTS[key]) {
      var a = ACHIEVEMENTS[key];
      toast(a.icon + " " + LC.t(a.name) + " — " + LC.t(a.desc), "achievement");
    }
    return got;
  }

  function grantItem(item) {
    if (!item) return false;
    var got = false;
    LC.store.update(function (s) {
      if (s.items.indexOf(item.id) === -1) { s.items.push(item.id); got = true; }
    });
    return got;
  }

  /* ---- ambrosia / hints ------------------------------------------------ */

  /* She is never hard-blocked from a hint. The cost makes it a decision, not
   * a gate. See spec/02-game-design.md. */
  function spendAmbrosia() {
    var result = "paid";
    LC.store.update(function (s) {
      if (s.ambrosia > 0) { s.ambrosia -= 1; result = "paid"; }
      else if (s.drachmas >= 15) { s.drachmas -= 15; result = "bought"; }
      else { result = "free"; }
    });
    LC.Game.renderHud();
    return result;
  }

  /* ---- HUD ------------------------------------------------------------- */

  function renderHud() {
    var host = document.querySelector("[data-hud]");
    if (!host) return;
    var s = LC.store.get();
    var lvl = levelFor(s.xp);
    var cabin = CABINS[s.cabin] || null;
    var pct = Math.round(Math.max(0, Math.min(1, lvl.progress)) * 100);

    host.innerHTML =
      '<div class="hud-identity">' +
        '<span class="hud-cabin" title="' + LC.esc(cabin ? LC.t(cabin.name) : "") + '">' + (cabin ? cabin.icon : "🏛️") + "</span>" +
        '<span class="hud-name">' + LC.esc(s.name || LC.t({ he: "חצי־אלה", en: "Demigod" })) + "</span>" +
      "</div>" +
      '<div class="hud-xp">' +
        '<div class="hud-xp-label"><span>' + LC.esc(LC.t(lvl.title)) +
          '</span><span dir="ltr">' + s.xp + " XP</span></div>" +
        '<div class="xpbar"><div class="xpbar-fill" style="width:' + pct + '%"></div></div>' +
      "</div>" +
      '<div class="hud-res">' +
        '<span class="res" dir="ltr" title="' + LC.esc(LC.s("drachmas")) + '">🪙 ' + s.drachmas + "</span>" +
        '<span class="res" dir="ltr" title="' + LC.esc(LC.s("ambrosia")) + '">🍯 ' + s.ambrosia + "</span>" +
      "</div>";

    if (cabin) document.documentElement.style.setProperty("--cabin", cabin.accent);
  }

  /* ---- name / cabin helpers used inside lesson prose -------------------- */

  function hero() {
    var s = LC.store.get();
    return s.name || LC.t({ he: "חצי־אלה", en: "Demigod" });
  }

  function cabinInfo() {
    return CABINS[LC.store.get().cabin] || null;
  }

  LC.Game = {
    ltr: ltr,
    LEVELS: LEVELS,
    CABINS: CABINS,
    ACHIEVEMENTS: ACHIEVEMENTS,
    levelFor: levelFor,
    lessonState: lessonState,
    award: award,
    unlock: unlock,
    grantItem: grantItem,
    spendAmbrosia: spendAmbrosia,
    renderHud: renderHud,
    toast: toast,

    isLessonDone: function (id) {
      var s = LC.store.get();
      return !!(s.lessons[id] && s.lessons[id].done);
    },

    /** A lesson is unlocked if it is the first, or the previous one is done. */
    isUnlocked: function (id) {
      var list = LC.CURRICULUM;
      for (var i = 0; i < list.length; i++) {
        if (list[i].id === id) {
          if (i === 0) return true;
          return LC.Game.isLessonDone(list[i - 1].id);
        }
      }
      return false;
    },

    markExerciseDone: function (lessonId, exerciseId) {
      var already = false;
      LC.store.update(function (s) {
        var st = lessonState(lessonId);
        if (st.exercisesDone.indexOf(exerciseId) === -1) st.exercisesDone.push(exerciseId);
        else already = true;
        s.lessons[lessonId] = st;
      });
      return already;
    },

    isExerciseDone: function (lessonId, exerciseId) {
      return lessonState(lessonId).exercisesDone.indexOf(exerciseId) !== -1;
    },

    noteFailure: function (lessonId, exerciseId) {
      var count = 0;
      LC.store.update(function (s) {
        var st = lessonState(lessonId);
        st.fails[exerciseId] = (st.fails[exerciseId] || 0) + 1;
        count = st.fails[exerciseId];
        s.lessons[lessonId] = st;
      });
      return count;
    },

    noteHint: function (lessonId) {
      LC.store.update(function (s) {
        var st = lessonState(lessonId);
        st.hintsUsed += 1;
        s.lessons[lessonId] = st;
      });
    },

    completeLesson: function (lessonId, item, bonusXp) {
      var first = false;
      LC.store.update(function (s) {
        var st = lessonState(lessonId);
        if (!st.done) { st.done = true; first = true; s.ambrosia += 1; }
        s.lessons[lessonId] = st;
      });
      if (first) {
        award(bonusXp || 30, 10);
        grantItem(item);
        unlock("firstLesson");
        if (lessonState(lessonId).hintsUsed === 0) unlock("noHints");
      }
      return first;
    },

    hero: hero,
    cabin: cabinInfo
  };

  LC.hero = hero;
  LC.cabin = cabinInfo;
})(window.LC);
