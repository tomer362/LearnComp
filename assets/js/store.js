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

  /* UTF-8 safe base64url, for a shareable ?progress= link — plain btoa()
   * throws on Hebrew text, and a URL cannot carry raw "+/=" safely. */
  function utf8ToBase64Url(str) {
    var bytes = new TextEncoder().encode(str);
    var binary = "";
    for (var i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return window.btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  function base64UrlToUtf8(b64url) {
    var b64 = String(b64url).replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    var binary = window.atob(b64);
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

  LC.store = {
    get: load,
    save: save,
    /** A shareable link payload: the whole save, base64url-encoded. */
    encodeProgress: function () {
      try { return utf8ToBase64Url(JSON.stringify(load())); }
      catch (e) { return ""; }
    },
    /** @returns {string|null} the decoded JSON text, or null if unreadable */
    decodeProgress: function (payload) {
      try { return base64UrlToUtf8(payload); }
      catch (e) { return null; }
    },
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
