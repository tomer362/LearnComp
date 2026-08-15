/* store.js — persistence with a safe fallback.
 * localStorage works on file:// in Chrome and Firefox but can throw in Safari
 * or in private windows. Nothing here may ever throw: losing progress is bad,
 * crashing the lesson is worse. See spec/01-architecture.md.
 */
window.LC = window.LC || {};
(function (LC) {
  "use strict";

  var KEY = "learncomp.save.v1";
  var memory = null; // used when localStorage is unavailable

  var hasLocalStorage = (function () {
    try {
      window.localStorage.setItem("__lc_probe__", "1");
      window.localStorage.removeItem("__lc_probe__");
      return true;
    } catch (e) {
      return false;
    }
  })();

  function defaults() {
    return {
      v: 1,
      name: "",
      cabin: "",
      lang: "he",
      claimed: false,
      xp: 0,
      drachmas: 0,
      ambrosia: 3,
      lessons: {}, // "01": { done, exercisesDone: [], hintsUsed, runs }
      items: [],
      achievements: []
    };
  }

  /* Merge over defaults so a save written by an older version never loses keys
   * and never arrives missing one. Never delete unknown keys — forward compat. */
  function normalize(raw) {
    var d = defaults();
    if (!raw || typeof raw !== "object") return d;
    for (var k in raw) {
      if (Object.prototype.hasOwnProperty.call(raw, k)) d[k] = raw[k];
    }
    if (typeof d.lessons !== "object" || d.lessons === null) d.lessons = {};
    if (!Array.isArray(d.items)) d.items = [];
    if (!Array.isArray(d.achievements)) d.achievements = [];
    return d;
  }

  var state = null;

  function load() {
    if (state) return state;
    var raw = null;
    try {
      raw = hasLocalStorage ? window.localStorage.getItem(KEY) : memory;
      raw = raw ? JSON.parse(raw) : null;
    } catch (e) {
      raw = null;
    }
    state = normalize(raw);
    return state;
  }

  function save() {
    if (!state) return;
    var text;
    try {
      text = JSON.stringify(state);
    } catch (e) {
      return;
    }
    try {
      if (hasLocalStorage) window.localStorage.setItem(KEY, text);
      else memory = text;
    } catch (e) {
      memory = text; // quota or privacy mode — keep it for this session at least
    }
  }

  LC.store = {
    get: load,
    save: save,
    /** Mutate state through a function, then persist. */
    update: function (fn) {
      var s = load();
      fn(s);
      save();
      return s;
    },
    reset: function () {
      state = defaults();
      save();
      return state;
    },
    exportText: function () {
      return JSON.stringify(load(), null, 2);
    },
    /** @returns {boolean} true if the text was a usable save */
    importText: function (text) {
      var parsed;
      try {
        parsed = JSON.parse(text);
      } catch (e) {
        return false;
      }
      if (!parsed || typeof parsed !== "object") return false;
      state = normalize(parsed);
      save();
      return true;
    },
    /** Exposed so the UI can warn her that progress will not survive. */
    isPersistent: function () {
      return hasLocalStorage;
    }
  };
})(window.LC);
