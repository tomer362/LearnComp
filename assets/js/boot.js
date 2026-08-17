/* boot.js — the one script every page needs to mount itself.
 *
 * Replaces the inline <script>…</script> that used to sit at the bottom of
 * index.html / lessons/lesson-NN.html, so every page loads from a file and
 * script-src never needs 'unsafe-inline'. Which page this is comes from
 * data-lesson on <body> — copy the shell, set the two numbers, done.
 * See spec/10-deployment.md.
 */
window.LC = window.LC || {};
(function (LC) {
  "use strict";

  LC.i18n.init();

  function mountCurrentPage() {
    var lessonId = document.body.getAttribute("data-lesson");
    if (lessonId) LC.Lesson.mount(lessonId);
    else LC.Hub.mount();
  }
  mountCurrentPage();

  /* Break reminders run on every page — she reads the map for a while too.
   * Nothing here pauses or mutes anything. See assets/js/rest.js. */
  if (LC.Rest) LC.Rest.start();

  /* A shared "?progress=" link. Never overwrite her save silently — ask
   * first, exactly like the paste-a-backup flow in hub.js already does. */
  (function importProgressFromUrl() {
    var params;
    try { params = new URLSearchParams(window.location.search); }
    catch (e) { return; }
    var payload = params.get("progress");
    if (!payload) return;

    var url = new URL(window.location.href);
    url.searchParams.delete("progress");
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);

    var text = LC.store.decodeProgress(payload);
    if (!text) { LC.Game.toast(LC.t(LC.i18n.strings.invalidProgressLink)); return; }
    if (!window.confirm(LC.t(LC.i18n.strings.confirmProgressLoad))) return;

    if (LC.store.importText(text)) {
      /* setLang fires the language listener, which re-mounts the page —
       * the same trick hub.js already uses after a pasted-backup import. */
      LC.i18n.setLang(LC.store.get().lang || "he", { persist: false });
      LC.Game.toast(LC.t({ he: "ההתקדמות נטענה.", en: "Progress loaded." }));
    } else {
      LC.Game.toast(LC.t(LC.i18n.strings.invalidProgressLink));
    }
  })();

  /* Manifest and service worker only exist for the hosted lane — on file://
   * a manifest link is a broken request and smoke-test.mjs asserts zero
   * network attempts. See spec/01-architecture.md rule 1. */
  if (LC.env.hosted) {
    var link = document.createElement("link");
    link.rel = "manifest";
    link.href = "/manifest.webmanifest";
    document.head.appendChild(link);

    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(function (reg) {
          /* Only warn on an UPDATE (a controller already exists), never on the
           * very first install — that one is silent by design. Refreshing is
           * her choice; the worker never forces it. */
          reg.addEventListener("updatefound", function () {
            var installing = reg.installing;
            if (!installing) return;
            installing.addEventListener("statechange", function () {
              if (installing.state === "installed" && navigator.serviceWorker.controller) {
                LC.Game.toast(LC.t({ he: "יש גרסה חדשה — רעננו את הדף.",
                                     en: "A new version is ready — refresh the page." }));
              }
            });
          });
        }).catch(function () { /* offline install is a bonus, not a requirement */ });
      });
    }
  }
})(window.LC);
