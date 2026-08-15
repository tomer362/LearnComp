# ⚡ קוד של חצי־אל · Demigod Code

**ללמוד פייתון במחנה חצי־דם** — קורס פייתון אינטראקטיבי, בעברית, בסגנון פרסי ג'קסון.
*An interactive Python course in Hebrew and English, Percy Jackson style.*

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

## The course

Twenty lessons, five acts, from `print()` to a text adventure game she builds
herself.

| Act | Lessons | Learns |
| --- | --- | --- |
| I — Camp Half-Blood | 1–4 | print, variables, input, arithmetic |
| II — The Lightning Thief | 5–8 | booleans, if/elif/else, while, for |
| III — Sea of Monsters | 9–12 | lists, list methods, dictionaries, nested data |
| IV — The Titan's Curse | 13–16 | functions, return, random/math, recursion |
| V — The Last Olympian | 17–20 | strings, errors, classes, the capstone |

Each act ends in a boss fight. Each lesson grants an item. Lesson 20 ends by
pointing her at installing real Python, because the point was never the game.

**Status:** lesson 1 is complete and playable. Lessons 2–20 have full design
specs in `spec/lessons/` and are tracked in `spec/TODO.md`.

---

## For maintainers

### How it works

Python runs in the browser via **Skulpt** (MIT), vendored into
`assets/js/vendor/`. There is no server, no build step, no `npm install`, and no
network access at runtime — the whole thing is opened from `file://`.

That constraint drives everything: no `fetch`, no ES modules, no CDN. Lesson
content is `.js` files that call a global register function rather than `.json`
that would need fetching. Details in `spec/01-architecture.md`.

```
index.html              Quest map hub
lessons/lesson-NN.html  Thin ~30-line shell
content/lesson-NN.js    All text (he+en), examples and exercises for that lesson
assets/css/theme.css    One stylesheet, both directions, logical properties only
assets/js/              store · i18n · curriculum · engine · editor · checker · game · lesson · hub
assets/js/vendor/       Skulpt 1.2.0 (MIT)
spec/                   The design contract — read before changing behaviour
tools/                  Dev-only verification (never loaded by a page)
```

### Adding a lesson

1. Write `content/lesson-NN.js` following `spec/04-lesson-template.md` and the
   deep design in `spec/lessons/lesson-NN.md`.
2. Copy the previous shell to `lessons/lesson-NN.html`, change the two numbers.
3. Flip `built: true` for that lesson in `assets/js/curriculum.js`.

### Verifying

```bash
node tools/verify-python.mjs      # every code sample + every solution, headless Skulpt
node tools/smoke-test.mjs         # full file:// browser test with the network blocked
node tools/smoke-test.mjs --shots # ...plus screenshots into .screenshots/
```

`verify-python.mjs` runs the real vendored Skulpt in Node and asserts that
**every exercise's stated solution passes its own checker** — the failure that
would otherwise strand a learner on an impossible exercise.

`smoke-test.mjs` drives the real pages in Chromium over `file://` with all
network requests blocked, and asserts zero network attempts and zero console
errors alongside the behavioural checks.

Playwright and Chromium are expected to be installed globally; the shipped
course needs neither.

### Licence

Course content: see the repository. Skulpt is MIT —
`assets/js/vendor/SKULPT-LICENSE.txt`.
