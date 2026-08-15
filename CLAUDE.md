# Demigod Code · קוד של חצי־אל

An offline, gamified, Hebrew/English Python course for one 14-year-old girl with
zero programming experience. Percy Jackson framing. She double-clicks
`index.html` and learns to code — no install, no terminal, no internet, no
account.

**Who she is** — 14, Hebrew-native, English second, never programmed. She does
not know what a variable, a terminal, or an error message is. Every decision in
this repo is made for her, not for a generic learner. Details:
`spec/00-overview.md`.

## Hard rules — breaking these silently destroys the product

1. **YOU MUST keep everything working from `file://` with zero network.**
   No `fetch`, no `XMLHttpRequest`, no `<script type="module">`, no CDN, no
   webfonts, no analytics. Browsers block all of these on `file://`.
   Lesson data is `.js` files that call `LC.registerLesson(...)` — never `.json`.
2. **YOU MUST keep code left-to-right.** Hebrew is RTL; Python is not. The
   editor, output panel and error text are always `dir="ltr"`. Inline code in
   Hebrew prose goes through `LC.code()` / backticks, which emit `<bdi dir="ltr">`.
   Any number paired with a Latin unit (`0 XP`, `+25 XP · 8 🪙`) also needs
   `dir="ltr"` or it renders reversed.
3. **Only use Python that Skulpt actually runs.** No `json`, no `open()`, no
   file I/O, no third-party packages. The verified matrix is in
   `spec/01-architecture.md`.
4. **Never translate code.** Python keywords, identifiers, and real error
   messages stay English in both languages. Explanations are translated; the
   language of the gods is not.

## Commands

```bash
node tools/verify-python.mjs             # every code sample + every solution, headless Skulpt
node tools/verify-python.mjs content/lesson-02.js
node tools/smoke-test.mjs                # full file:// browser test, network blocked
node tools/smoke-test.mjs --shots        # ...plus screenshots into .screenshots/
```

There is **no build step and no `npm install`** for the product. `tools/` is
dev-only and is never loaded by a page. Playwright and Chromium are already
installed globally in this environment.

Run both tools before committing. `verify-python.mjs` is the fast one — it
catches the failure that matters most: an exercise whose own stated solution
does not pass its own checker.

## Layout

```
index.html            Quest map hub
lessons/lesson-NN.html  Thin ~30-line shell
content/lesson-NN.js    All text (he+en), examples, exercises for that lesson
assets/js/             store, i18n, curriculum, engine, editor, checker, game, lesson, hub
assets/js/vendor/      Skulpt 1.2.0 (MIT, committed on purpose)
spec/                  The design contract — read this before changing behaviour
tools/                 Dev-only verification
```

Script load order in every page is **load-bearing** — there is no module graph
to sort it out. Copy an existing shell rather than writing one.

## Where the design lives

`spec/` is the source of truth; the code implements it. Read the **one** file you
need — do not read them all, and do not `@`-import them here (imports load at
launch and would bury these rules).

| Task | Read |
| --- | --- |
| new to the project | `spec/00-overview.md` |
| touching `assets/js/` | `spec/01-architecture.md` |
| XP, items, cabins, bosses, save format | `spec/02-game-design.md` |
| any user-visible text, or a layout flip | `spec/03-i18n-and-rtl.md` |
| **authoring a lesson** | `spec/04-lesson-template.md` (schema) + `spec/06-authoring-guide.md` (voice) |
| CSS or a new component | `spec/05-visual-design.md` |
| what a lesson may teach | `spec/07-curriculum.md` |
| about to call a lesson done | `spec/08-quality-checklist.md` |
| picking up work | `spec/TODO.md` |
| building lesson NN | `spec/lessons/lesson-NN.md` |

## Adding a lesson

Two new files plus one flag — nothing else:

1. `content/lesson-NN.js` — the content object, following `spec/04-lesson-template.md`
   and the deep design in `spec/lessons/lesson-NN.md`.
2. `lessons/lesson-NN.html` — copy the previous shell, change the two numbers.
3. In `assets/js/curriculum.js`: flip `built: true` for that lesson **and** add
   its item to `LC.ITEMS` — the hub reads item names from there, not from
   content files.

Then run both tools and tick `spec/08-quality-checklist.md`.

## Definition of done for a lesson

- Six beats in order: Prophecy → Chiron Teaches → Try It → Training → Quest → Recap
- Every learner-visible string is a `{he, en}` pair — no bare strings
- 3–5 training exercises ramping from nearly-free to genuinely hard, plus one quest
- Every exercise has **exactly three** escalating hints (nudge → tool → walkthrough)
- **Every `solution` passes its own `check`** (`verify-python.mjs` asserts this)
- Only concepts from lessons 1..N-1 (`spec/07-curriculum.md` is the authority)
- At least one `error` block showing real broken code and its real error
- Both tools pass; zero console errors; no horizontal scroll at 390px

## Writing for her

- Hebrew is **feminine second person** (`את`, `נסי`, `תכתבי`), modern and spoken.
- **Banned in both languages: "simply", "just", "easy", "obviously", "of course".**
  Each one tells her that if she is struggling, something is wrong with her.
- Story before syntax. She runs code within the first 60 seconds of every lesson.
- Errors are taught deliberately, not hidden. Show the real English error and a
  friendly Hebrew explanation **beside** it, never instead of it.
- Never hand her the answer. The third hint walks through the reasoning; the
  solution needs a second, deliberate click.
- No punishment mechanics — no streaks, no lives, no timers, nothing ever lost.
  She can fail an exercise unlimited times at no cost.
- Exercises should produce something worth reading. Same skill, better reason.

## Repository etiquette

- Develop on `claude/percy-jackson-python-course-ephy0i`; push with
  `git push -u origin claude/percy-jackson-python-course-ephy0i`.
- Do not open a pull request unless explicitly asked.
- `assets/js/vendor/` is vendored third-party code (Skulpt, MIT) — do not edit it
  or reformat it; licence is in `assets/js/vendor/SKULPT-LICENSE.txt`.
- `.screenshots/` is generated output and is gitignored.
