# ⚡ קוד של חצי־אל · Demigod Code

**ללמוד פייתון במחנה חצי־דם** — משחק הגנת־מגדלים דו־ממדי שבו כותבים פייתון כדי לעצור מפלצות.
*A 2D tower-defense game where you write Python to stop the monsters. Hebrew and English, Percy Jackson style.*

---

## 🇮🇱 איך מתחילים

**צריך רק דבר אחד: ללחוץ פעמיים על `index.html`.**

זהו. אין מה להתקין, אין מה להוריד, ואין צורך באינטרנט. הקורס עובד גם במטוס.

1. הורידי את התיקייה הזאת למחשב (או קבלי אותה על דיסק־און־קי).
2. פתחי את התיקייה.
3. לחצי פעמיים על הקובץ **`index.html`**.
4. הדפדפן ייפתח, יישאלו אותך כמה שאלות, ותגלי מי ההורה האולימפי שלך.

### שאלות שעולות

**הדפדפן מזהיר אותי לפני שהוא פותח את הקובץ.**
זה בסדר — הדפדפן פשוט בודק שאת יודעת שזה קובץ מהמחשב שלך ולא מהאינטרנט. אשרי ותמשיכי.

**איפה נשמרת ההתקדמות שלי?**
בדפדפן שלך בלבד, על המחשב הזה. אין שרת, אין חשבון, ואף אחד לא רואה מה כתבת.

**אני רוצה להמשיך במחשב אחר.**
במפת המסע יש כפתור **גיבוי התקדמות**. לחצי עליו, העתיקי את הטקסט שמופיע, ובמחשב השני
הדביקי אותו ולחצי **טעינת גיבוי**.

**מחקתי בטעות הכול.**
זה קורה. אפשר להתחיל מחדש, וכל מה שלמדת נשאר אצלך גם אם המשחק לא זוכר.

**הקוד באנגלית, למה?**
כי פייתון נכתבה באנגלית, והמילים שלה זהות בכל העולם. ההסברים כאן בעברית — הקוד נשאר
כמו שהוא באמת. יש כפתור בראש הדף שמחליף את כל ההסברים לאנגלית ובחזרה.

---

## 🇬🇧 Getting started

**One step: double-click `index.html`.**

Nothing to install, nothing to download, no internet needed. It works on a plane.

Progress is saved in your browser on that computer only. There is no server and
no account. Use **Export progress** on the quest map to move to another machine.

A button at the top of every page switches all explanations between Hebrew and
English. Code, output and error messages always stay in English — that is real
Python.

---

## Play it online

The same course also runs as a normal website — nothing about the offline
story above changes, this is just a second way to reach it. Deployed on
Vercel Hobby, it adds a few things a folder on a USB stick cannot:

- **Install it.** "Add to Home Screen" turns it into an app icon, and after
  the first visit it keeps working with no internet.
- **Shareable links.** A "copy progress link" button on the quest map turns
  your save into a URL — open it on another device to pick up where you left
  off, no copy-pasting a text blob required (the paste-a-backup box still
  works too).
- **Deep links.** A link can land you on one specific battle, not just the
  top of a lesson.

Everything else — the lessons, the battles, the save format, both
languages — is the exact same code as the offline copy. See
`spec/10-deployment.md` for how the two delivery lanes coexist.

---

## The game

Monsters walk a path toward Camp Half-Blood. The only way to stop them is to
write Python.

```python
place_tower("archer", 2, 3)     # lesson 1 — a function call with arguments
```

She graduates through three ways of commanding the battle:

| Lessons | She writes | The game |
| --- | --- | --- |
| 1–13 | a build script | runs it once before the wave |
| 14–18 | `def choose_target(enemies):` | **calls her code** every time a tower picks a target |
| 19–20 | `class LightningTower:` | instantiates her class and calls its methods |

The mechanics are the concepts, not a costume over them: the map grid *is* a list
of lists, a wave *is* a list of dictionaries, building a wall *is* a `for` loop,
and her own tower type *is* a class. If her loop is wrong, monsters reach the
camp and she watches it happen.

## The course

Twenty lessons, five acts, from `print()` to designing her own tower classes
against Kronos.

| Act | Lessons | Learns |
| --- | --- | --- |
| Act | Lessons | Learns | In the game |
| --- | --- | --- | --- |
| I — Camp Half-Blood | 1–4 | print, variables, input, arithmetic | placing towers, the gold economy |
| II — The Lightning Thief | 5–8 | booleans, if/elif/else, while, for | countering monster types, walls built by loop |
| III — Sea of Monsters | 9–12 | lists, dicts, nested data | reading the wave roster and the map grid |
| IV — The Titan's Curse | 13–16 | functions, return, random/math, recursion | **the game starts calling her code** |
| V — The Last Olympian | 17–20 | strings, errors, classes, capstone | designing her own tower types |

Each act ends in a boss battle — the Minotaur, Medusa, the Hydra, the Labyrinth,
and finally Kronos. Each lesson grants an item. Lesson 20 ends by pointing her at
installing real Python, because the point was never the game.

**Status:** lessons 1–2 are complete and playable. Lessons 3–20 have full
design specs in `spec/lessons/` and are tracked in `spec/TODO.md`.

---

## For maintainers

### How it works

Python runs in the browser via **Skulpt** (MIT), vendored into
`assets/js/vendor/`. There is no build step and no `npm install`, and the
`file://` copy makes no network access at runtime at all. The same files also
deploy to Vercel Hobby as a second, additive lane — see "Play it online"
above and `spec/10-deployment.md`.

The `file://` constraint drives most of the architecture: no `fetch`, no ES
modules, no CDN. Lesson content is `.js` files that call a global register
function rather than `.json` that would need fetching. Details in
`spec/01-architecture.md`.

```
index.html              Quest map hub
404.html                Themed error page (hosted lane only)
lessons/lesson-NN.html  Thin ~30-line shell
content/lesson-NN.js    All text (he+en), examples and exercises for that lesson
assets/css/theme.css    One stylesheet, both directions, logical properties only
assets/js/              env · early · boot · store · i18n · curriculum · engine ·
                        editor · checker · game · lesson · hub
assets/js/vendor/       Skulpt 1.2.0 (MIT)
assets/img/             PWA icons + share image, generated by tools/make-icons.mjs
spec/                   The design contract — read before changing behaviour
tools/                  Dev-only verification (never loaded by a page)
vercel.json, sw.js,     Hosted-lane config — see spec/10-deployment.md
manifest.webmanifest
```

### Adding a lesson

1. Write `content/lesson-NN.js` following `spec/04-lesson-template.md` and the
   deep design in `spec/lessons/lesson-NN.md`.
2. Copy the previous shell to `lessons/lesson-NN.html`, change the two numbers.
3. Flip `built: true` for that lesson in `assets/js/curriculum.js`.

### Verifying

```bash
node tools/verify-python.mjs             # simulate every level headlessly
node tools/try-level.mjs lvl.json sol.py # play one level while you are designing it
node tools/smoke-test.mjs                # full file:// browser test, network blocked
node tools/smoke-test.mjs --shots        # ...plus screenshots into .screenshots/
```

`verify-python.mjs` runs the real vendored Skulpt in Node, loads the same battle
engine the browser uses, and **simulates every level**. It asserts that each
stated solution actually *wins* its battle, and — just as important — that no
level can be won by writing nothing. Those are the two failures that would
otherwise strand a learner or let her click straight through.

`smoke-test.mjs` drives the real pages in Chromium in two passes. The `file://`
pass blocks all network requests and asserts zero network attempts and zero
console errors alongside the behavioural checks — this is the one that proves
the folder-handoff story still works. A second, hosted pass (via
`tools/serve.mjs`, a tiny dev server that mimics `vercel.json`'s clean URLs)
checks the delivery differences only: the manifest, the service worker,
offline-after-first-visit, `?lang=`/`?progress=` links, and zero *third-party*
requests. See `spec/10-deployment.md`.

Playwright and Chromium are expected to be installed globally; the shipped
course needs neither.

### Licence

Course content: see the repository. Skulpt is MIT —
`assets/js/vendor/SKULPT-LICENSE.txt`.
