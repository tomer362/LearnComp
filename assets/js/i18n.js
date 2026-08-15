/* i18n.js — Hebrew/English with live switching.
 * Hebrew is the default. Code, output and errors always stay LTR English.
 * See spec/03-i18n-and-rtl.md.
 */
window.LC = window.LC || {};
(function (LC) {
  "use strict";

  var listeners = [];

  var STRINGS = {
    /* chrome */
    appName:        { he: "קוד של חצי־אל",        en: "Demigod Code" },
    tagline:        { he: "ללמוד פייתון במחנה חצי־דם", en: "Learn Python at Camp Half-Blood" },
    backToMap:      { he: "חזרה למפה",            en: "Back to map" },
    langToggle:     { he: "English",              en: "עברית" },
    level:          { he: "דרגה",                 en: "Level" },
    drachmas:       { he: "דרכמות",               en: "Drachmas" },
    ambrosia:       { he: "אמברוסיה",             en: "Ambrosia" },

    /* lesson sections */
    secProphecy:    { he: "הנבואה",               en: "The Prophecy" },
    secTeach:       { he: "כירון מלמד",           en: "Chiron Teaches" },
    secTryIt:       { he: "מגרש האימונים",        en: "The Training Ground" },
    secTraining:    { he: "הקרבות",               en: "The Battles" },
    secQuest:       { he: "הקרב הגדול",           en: "The Great Battle" },
    secBoss:        { he: "קרב בוס",              en: "Boss Battle" },
    secRecap:       { he: "שכר וסיכום",           en: "Reward & Recap" },

    /* editor + runner */
    run:            { he: "הרצה",                 en: "Run" },
    running:        { he: "רץ…",                  en: "Running…" },
    reset:          { he: "איפוס",                en: "Reset" },
    check:          { he: "בדיקה",                en: "Check" },
    output:         { he: "פלט",                  en: "Output" },
    noOutput:       { he: "(אין פלט)",            en: "(no output)" },
    hint:           { he: "רמז",                  en: "Hint" },
    showSolution:   { he: "הצגת הפתרון",          en: "Show solution" },
    confirmSolution:{ he: "בטוחה? לחצי שוב",      en: "Sure? Click again" },
    solutionLabel:  { he: "פתרון אפשרי",          en: "One possible solution" },
    inputPrompt:    { he: "התוכנית מחכה לתשובה שלך", en: "Your program is waiting for input" },
    send:           { he: "שליחה",                en: "Send" },

    /* battle */
    fight:          { he: "לקרב!",                en: "Fight!" },
    campHolds:      { he: "המחנה עמד!",           en: "The camp holds!" },
    campFell:       { he: "הן עברו.",             en: "They got through." },

    /* results */
    correct:        { he: "נכון!",                en: "Correct!" },
    notYet:         { he: "עדיין לא",             en: "Not yet" },
    tryAgain:       { he: "כמעט. נסי שוב.",       en: "Close. Try again." },
    solvedAlready:  { he: "פתרת את זה",           en: "Solved" },
    errorTitle:     { he: "פייתון עצר עם שגיאה",  en: "Python stopped with an error" },
    whatHappened:   { he: "מה קרה?",              en: "What happened?" },

    /* rewards */
    xpEarned:       { he: "נקודות ניסיון",        en: "XP earned" },
    itemEarned:     { he: "קיבלת פריט",           en: "New item" },
    lessonDone:     { he: "השיעור הושלם",         en: "Lesson complete" },
    nextLesson:     { he: "לשיעור הבא",           en: "Next lesson" },
    whatsNext:      { he: "מה הלאה?",             en: "What's next?" },
    nextBattle:     { he: "לקרב הבא",             en: "Next battle" },
    lockedNote:     { he: "נפתח כשתנצחי בקרב שלפניו", en: "Opens when you win the battle before it" },

    /* hub */
    yourQuest:      { he: "המסע שלך",             en: "Your Quest" },
    startHere:      { he: "מתחילות כאן",          en: "Start here" },
    continueLesson: { he: "המשך",                 en: "Continue" },
    locked:         { he: "נעול",                 en: "Locked" },
    comingSoon:     { he: "בקרוב",                en: "Coming soon" },
    inventory:      { he: "התיק שלך",             en: "Your pack" },
    emptyPack:      { he: "עדיין ריק. סיימי שיעור כדי לקבל פריט.", en: "Empty for now. Finish a lesson to earn an item." },
    progress:       { he: "התקדמות",              en: "Progress" },
    exportSave:     { he: "גיבוי התקדמות",        en: "Export progress" },
    importSave:     { he: "טעינת גיבוי",          en: "Import progress" },
    saveWarning:    { he: "הדפדפן הזה לא שומר התקדמות. גבי אותה ידנית.", en: "This browser will not save progress. Export it manually." },
    copyProgressLink: { he: "העתקת קישור התקדמות", en: "Copy progress link" },
    linkCopied:     { he: "הקישור הועתק.",         en: "Link copied." },
    confirmProgressLoad: { he: "לטעון התקדמות מהקישור הזה? זה יחליף את מה ששמור כרגע במחשב הזה.",
                            en: "Load progress from this link? This will replace what is currently saved on this device." },
    invalidProgressLink: { he: "הקישור הזה לא תקין.", en: "That link is not valid." },

    /* claiming */
    claimTitle:     { he: "מי את?",               en: "Who are you?" },
    nameQuestion:   { he: "איך קוראים לך?",       en: "What is your name?" },
    namePlaceholder:{ he: "השם שלך",              en: "your name" },
    skipName:       { he: "דלגי",                 en: "Skip" },
    beginClaiming:  { he: "בואו נגלה",            en: "Let's find out" },
    claimedBy:      { he: "הוכרזת כבת של",        en: "You have been claimed by" },
    enterCamp:      { he: "כניסה למחנה",          en: "Enter camp" },
    rerollClaim:    { he: "בדיקה מחדש",           en: "Re-roll claiming" },

    /* engine errors, explained */
    timeLimit:      { he: "התוכנית רצה יותר מדי זמן ונעצרה. כנראה יש לולאה שלא נגמרת.",
                      en: "Your program ran too long and was stopped. There is probably a loop that never ends." }
  };

  var lang = "he";

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /** Resolve a {he,en} pair, or pass a plain string through. */
  function t(value) {
    if (value === null || value === undefined) return "";
    if (typeof value === "string") return value;
    if (typeof value === "object") {
      if (value[lang] !== undefined) return value[lang];
      if (value.he !== undefined) return value.he;
      if (value.en !== undefined) return value.en;
    }
    return String(value);
  }

  /** UI string by key. */
  function s(key) {
    return t(STRINGS[key] !== undefined ? STRINGS[key] : key);
  }

  /* Inline code inside prose. MUST be isolated or the bidi algorithm flips
   * brackets in Hebrew sentences. See spec/03-i18n-and-rtl.md. */
  function code(text) {
    return '<bdi dir="ltr" class="c">' + esc(text) + "</bdi>";
  }

  /* Minimal markup for lesson prose: `code` and **bold**. Everything else is
   * escaped — content files are trusted but must not smuggle in layout. */
  function rich(value) {
    var raw = esc(t(value));
    raw = raw.replace(/`([^`]+)`/g, function (_, inner) {
      return '<bdi dir="ltr" class="c">' + inner + "</bdi>";
    });
    raw = raw.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    return raw;
  }

  function apply(root) {
    var scope = root || document;
    var nodes = scope.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = s(nodes[i].getAttribute("data-i18n"));
    }
    var attrNodes = scope.querySelectorAll("[data-i18n-placeholder]");
    for (var j = 0; j < attrNodes.length; j++) {
      attrNodes[j].setAttribute("placeholder", s(attrNodes[j].getAttribute("data-i18n-placeholder")));
    }
  }

  function setLang(next, opts) {
    lang = next === "en" ? "en" : "he";
    var html = document.documentElement;
    html.setAttribute("lang", lang);
    html.setAttribute("dir", lang === "he" ? "rtl" : "ltr");
    if (!opts || opts.persist !== false) {
      LC.store.update(function (st) { st.lang = lang; });
    }
    apply(document);
    for (var i = 0; i < listeners.length; i++) listeners[i](lang);
  }

  LC.i18n = {
    strings: STRINGS,
    get lang() { return lang; },
    t: t,
    s: s,
    code: code,
    rich: rich,
    esc: esc,
    apply: apply,
    setLang: setLang,
    toggle: function () { setLang(lang === "he" ? "en" : "he"); },
    onChange: function (fn) { listeners.push(fn); },
    /** Read the saved language and apply it. Call before first render.
     * A ?lang= in the URL is a one-time initializer: it wins on this load
     * AND is written into the save, so the save stays the single source of
     * truth for every load after. See spec/03-i18n-and-rtl.md. */
    init: function () {
      var fromUrl = null;
      try {
        var q = new URLSearchParams(window.location.search).get("lang");
        if (q === "he" || q === "en") fromUrl = q;
      } catch (e) { /* no query string support — fall through to the save */ }

      if (fromUrl) setLang(fromUrl, { persist: true });
      else setLang(LC.store.get().lang || "he", { persist: false });
    }
  };

  /* Shorthands used everywhere. */
  LC.t = t;
  LC.s = s;
  LC.esc = esc;
  LC.code = code;
  LC.rich = rich;
})(window.LC);
