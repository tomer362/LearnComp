# 10 — Deployment: the hosted lane

Read this when touching `vercel.json`, `sw.js`, `manifest.webmanifest`,
`assets/js/env.js`, `assets/js/early.js`, `assets/js/boot.js`, or anything else
that only exists because the site is also hosted.

## The one rule

**The `file://` lane is not legacy — it is co-equal.** Everything in
`01-architecture.md` stays true. Hosting is a second, additive delivery lane
built from the *same* files, not a replacement for the first one. Nothing may
be written so that it only works when there is a server. If you find yourself
about to add a `fetch()` that the course *needs* to run, stop — that breaks
the folder-handoff story, and it needs a product decision, not a code change.

## How the two lanes tell themselves apart

`assets/js/env.js` sets `LC.env.hosted = /^https?:$/.test(location.protocol)`.
Every hosted-only feature — the manifest link, the service worker, the
"copy progress link" button — is gated on this one flag, checked at runtime,
never assumed from a build step (there is no build step). `LC.href.home()` /
`LC.href.lesson(id)` synthesize navigation from the same flag: clean,
extensionless, root-relative routes when hosted (`/lessons/lesson-02`, to
match `vercel.json`'s `cleanUrls` with no redirect hop), today's relative
`.html` paths on `file://` (a bare `/` cannot resolve on disk).

`assets/js/early.js` is the one exception to "everything loads in body" — it
runs from `<head>`, before any other script, and has zero dependencies on
purpose. It sets `<html lang/dir>` from `?lang=` or the save file before first
paint, so a hosted page (real network latency between script tags) never
flashes the wrong direction while the rest of the chain loads.

## `vercel.json`

Zero-config static hosting: no `package.json`, no `framework`, no `builds` —
Vercel Hobby serves the repo root as-is. The things it's doing:

- `cleanUrls: true`, `trailingSlash: false` — `/lessons/lesson-02`, not
  `/lessons/lesson-02.html`.
- A broad `/(.*)` header rule carries the security headers and a
  `Content-Security-Policy`. Read the CSP before loosening it:
  - `script-src 'self' 'unsafe-eval'` — the `'unsafe-eval'` is Skulpt. It
    compiles Python to JS with `new Function`/`eval`; that is the entire
    mechanism the course runs on. It **cannot** be removed. Nothing else in
    the CSP needs it — script-src has no `'unsafe-inline'` because nothing
    in the codebase uses an inline `<script>` or an `onclick=` attribute
    (see `assets/js/boot.js`, which exists specifically so no page needs
    one).
  - `style-src 'self'` — no `'unsafe-inline'` either. `game.js` used to build
    an inline `style="width:…"` attribute; it now sets `.style.width`
    through CSSOM instead, which CSP does not restrict. If you're tempted to
    add a `style="…"` attribute anywhere, don't — build the node and set
    `.style` in JS.
  - No cache-busting via content hashing, because there is no build step.
    HTML and app JS get `max-age=0, must-revalidate`; only the vendored,
    version-pinned Skulpt under `/assets/js/vendor/` gets a long
    `immutable` cache.
- `/sw.js` gets its own `must-revalidate` + `Service-Worker-Allowed: /`.

`.vercelignore` excludes `spec/`, `tools/`, `.claude/`, `CLAUDE.md`,
`README.md` — the design contract and dev tooling are not part of the
product and should not be publicly served.

## Service worker (`sw.js`) and the manifest

Registered from `boot.js`, **only when `LC.env.hosted`** — on `file://` a
service-worker registration or a `<link rel="manifest">` is itself a
(harmless but pointless) network attempt, and `tools/smoke-test.mjs` asserts
the `file://` lane makes none at all. The manifest link is injected as a DOM
node at runtime for the same reason, rather than sitting statically in the
HTML `<head>`.

**`CACHE_VERSION` in `sw.js` is load-bearing.** There is no build step and so
no content hashing — it is the *only* thing standing between a code change
and a client stuck on stale JS forever. **Bump it on every deploy that
changes a precached file.** The precache list in `sw.js` is a flat array of
root-relative URLs; when you build a new lesson, add its clean-URL page and
its `content/lesson-NN.js` to that list (see the existing lesson-01 and
lesson-02 entries).

The worker never forces a reload. On an update it tells `boot.js`, which
shows the existing `LC.Game.toast()` with a "there is a new version, refresh"
line — refreshing is her choice.

## URL state

- `?lang=he|en` — read by `early.js` before paint, and by `i18n.js`'s
  `init()`, which treats it as a **one-time initializer**: it wins on that
  load and is written into the save, so the save stays the single source of
  truth for every load after (see `03-i18n-and-rtl.md` — the toggle must stay
  an in-place re-render, never a navigation).
- `#ex-<id>` — an anchor to one battle card, handled in `lesson.js`'s
  `scrollToHash()`. Only acts on an incoming hash; a plain page load never
  auto-scrolls. If the target is locked (progressive reveal — see
  `04-lesson-template.md`) or missing, it lands on the current battle instead
  of doing nothing.
- `?progress=<base64url>` — a whole save file, UTF-8-safe base64url encoded
  (`LC.store.encodeProgress` / `decodeProgress`; plain `btoa` throws on
  Hebrew text). Handled once in `boot.js`, behind a native `confirm()` —
  **never overwrite her save silently.** The query param is stripped from the
  URL immediately after being read, so a reload doesn't ask again. The "copy
  progress link" button that produces these is hidden on `file://` (nothing
  there is meaningfully shareable) but the *reading* side works on both
  lanes, since it costs nothing to keep it simple.

## Dev tooling

- `tools/make-icons.mjs` — renders `assets/img/*.png` (PWA icons, the OG
  share image) with the real Chromium. Dev-only, never loaded by a page. Run
  it again if the brand mark or palette changes.
- `tools/serve.mjs` — a static server that mimics Vercel's `cleanUrls` /
  `trailingSlash` locally, so `node tools/smoke-test.mjs` can drive an
  `http://localhost` lane the same way it drives `file://`.

## What must stay identical between lanes

Everything in `01-architecture.md`'s verified Skulpt matrix, every battle
level's simulation outcome, the save format, the bilingual strings, the RTL
rules. The hosted lane changes *delivery*, never *content* — a lesson that
passes `verify-python.mjs` and `smoke-test.mjs`'s `file://` pass is done; the
hosted pass in `smoke-test.mjs` exists to catch delivery regressions
(service worker, manifest, clean URLs), not to re-litigate lesson content.
