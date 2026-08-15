/* env.js — the single switch every hosted-only feature branches on.
 *
 * On file:// there is no server, so LC.env.hosted is false and nothing that
 * needs one may run: no manifest link, no service worker, no clean URLs.
 * See spec/10-deployment.md.
 */
window.LC = window.LC || {};
(function (LC) {
  "use strict";

  var hosted = /^https?:$/.test(window.location.protocol);

  function onLessonPage() {
    return !!(document.body && document.body.classList.contains("lesson-page"));
  }

  LC.env = { hosted: hosted };

  /* Synthesize navigation instead of hand-building hrefs in hub.js/lesson.js.
   * Hosted returns clean, extensionless, root-relative routes to match
   * vercel.json's cleanUrls with no redirect hop; file:// keeps today's
   * relative .html paths, since a bare "/" cannot resolve on disk. */
  LC.href = {
    home: function () {
      if (hosted) return "/";
      return onLessonPage() ? "../index.html" : "index.html";
    },
    lesson: function (id) {
      if (hosted) return "/lessons/lesson-" + id;
      return onLessonPage() ? "lesson-" + id + ".html" : "lessons/lesson-" + id + ".html";
    }
  };
})(window.LC);
