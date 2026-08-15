/* early.js — set <html lang/dir> before first paint.
 *
 * On a hosted page the script chain takes real network time, so without this
 * the browser can paint the hardcoded he/rtl markup before i18n.js corrects
 * it. This file has zero dependencies and must run before every other
 * script — it duplicates store.js's key name and shape on purpose rather
 * than depending on it. See spec/03-i18n-and-rtl.md and spec/10-deployment.md.
 */
(function () {
  "use strict";

  var lang = null;

  try {
    var q = new URLSearchParams(window.location.search).get("lang");
    if (q === "he" || q === "en") lang = q;
  } catch (e) { /* no query string support — keep going */ }

  if (!lang) {
    try {
      var raw = window.localStorage.getItem("learncomp.save.v1");
      var saved = raw ? JSON.parse(raw) : null;
      if (saved && (saved.lang === "he" || saved.lang === "en")) lang = saved.lang;
    } catch (e) { /* localStorage unavailable on this browser — keep the HTML default */ }
  }

  if (lang) {
    var html = document.documentElement;
    html.setAttribute("lang", lang);
    html.setAttribute("dir", lang === "he" ? "rtl" : "ltr");
  }
})();
