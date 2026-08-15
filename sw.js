/* sw.js — offline cache for the hosted lane only.
 *
 * Registered from assets/js/boot.js, and only when LC.env.hosted is true —
 * file:// never sees this file. There is no build step and so no content
 * hashing, which means CACHE_VERSION is the only thing standing between a
 * code change and a permanently stale client. Bump it by hand on every
 * deploy that touches a cached file. See spec/10-deployment.md.
 */
"use strict";

var CACHE_VERSION = "v1";
var CACHE_NAME = "demigod-code-" + CACHE_VERSION;

var PRECACHE = [
  "/",
  "/lessons/lesson-01",
  "/lessons/lesson-02",
  "/404.html",
  "/manifest.webmanifest",
  "/assets/css/theme.css",
  "/assets/js/early.js",
  "/assets/js/env.js",
  "/assets/js/boot.js",
  "/assets/js/store.js",
  "/assets/js/i18n.js",
  "/assets/js/curriculum.js",
  "/assets/js/game.js",
  "/assets/js/hub.js",
  "/assets/js/engine.js",
  "/assets/js/editor.js",
  "/assets/js/checker.js",
  "/assets/js/lesson.js",
  "/assets/js/battle/sim.js",
  "/assets/js/battle/pyapi.js",
  "/assets/js/battle/play.js",
  "/assets/js/battle/render.js",
  "/assets/js/vendor/skulpt.min.js",
  "/assets/js/vendor/skulpt-stdlib.js",
  "/content/lesson-01.js",
  "/content/lesson-02.js",
  "/assets/img/icon-192.png",
  "/assets/img/icon-512.png",
  "/assets/img/icon-maskable-512.png",
  "/assets/img/apple-touch-icon.png",
  "/assets/img/og.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) { return cache.addAll(PRECACHE); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (names) {
        return Promise.all(
          names.filter(function (n) { return n !== CACHE_NAME; })
               .map(function (n) { return caches.delete(n); })
        );
      })
      .then(function () { return self.clients.claim(); })
  );
});

function isAsset(url) {
  return url.pathname.indexOf("/assets/") === 0 ||
         url.pathname.indexOf("/content/") === 0 ||
         url.pathname === "/manifest.webmanifest";
}

function cacheFirst(request) {
  return caches.match(request).then(function (cached) {
    if (cached) return cached;
    return fetch(request).then(function (response) {
      if (response.ok && response.type === "basic") {
        var copy = response.clone();
        caches.open(CACHE_NAME).then(function (cache) { cache.put(request, copy); });
      }
      return response;
    });
  });
}

function networkFirst(request) {
  return fetch(request)
    .then(function (response) {
      if (response.ok && response.type === "basic") {
        var copy = response.clone();
        caches.open(CACHE_NAME).then(function (cache) { cache.put(request, copy); });
      }
      return response;
    })
    .catch(function () {
      return caches.match(request).then(function (cached) {
        return cached || caches.match("/404.html");
      });
    });
}

self.addEventListener("fetch", function (event) {
  var request = event.request;
  if (request.method !== "GET") return;

  var url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }
  if (isAsset(url)) {
    event.respondWith(cacheFirst(request));
  }
});
