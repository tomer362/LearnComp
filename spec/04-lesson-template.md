# 04 — Lesson template and content schema

**This file is the schema.** A lesson that does not match it will not render.
Every string visible to the learner is a `{he, en}` pair — no bare strings.

## The six beats

Every lesson page renders these sections in this order. Do not add, remove or
reorder them; consistency is what lets her stop reading the furniture and start
reading the content.

| # | Section | he | Purpose |
| --- | --- | --- | --- |
| 1 | **Prophecy** | הנבואה | Story hook. Why this lesson exists, in-world. 3–6 lines. No code. |
| 2 | **Chiron Teaches** | כירון מלמד | The concept. Prose + runnable examples + callouts. |
| 3 | **Try It** | נסי בעצמך | One free-play editor, pre-filled, no grading. Safe experimentation. |
| 4 | **Training** | אימונים | 3–5 graded exercises, easiest first. |
| 5 | **Quest** | המשימה | One larger graded task combining the lesson. Boss fight in lessons 4/8/12/16/20. |
| 6 | **Reward & Recap** | שכר וסיכום | XP, item, bullet recap, teaser for the next lesson. |

## Content object

`content/lesson-NN.js` contains exactly one call:

```js
LC.registerLesson({
  id: "01",
  act: 1,
  slug: "the-first-word",
  title:    { he: "המילה הראשונה",  en: "The First Word" },
  subtitle: { he: "…",              en: "…" },
  minutes: 25,
  concepts: ["print", "strings", "comments"],

  item: {
    id: "camp-bead",
    icon: "📿",
    name: { he: "חרוז המחנה",  en: "Camp Bead" },
    desc: { he: "…",           en: "…" },
  },

  prophecy: {
    lines: [ { he: "…", en: "…" }, … ],   // 3–6 lines
  },

  teach: [ …blocks… ],                    // see "Teach blocks"

  tryIt: {
    intro:   { he: "…", en: "…" },
    starter: "print(\"…\")\n",
  },

  training: [ …exercises… ],              // 3–5

  quest: { …exercise…, boss: null },      // or boss: { name, icon, hp }

  recap: {
    bullets: [ { he: "…", en: "…" }, … ], // 3–5, one per concept
    next:    { he: "…", en: "…" },        // teaser for lesson NN+1
  },
});
```

### Teach blocks

```js
{ type: "prose", text: { he, en } }

{ type: "code",                        // a worked example
  code: "print(\"Hello\")",            // English only — never translated
  caption: { he, en },
  runnable: true,                      // renders a Run button (default true)
  output: "Hello" }                    // expected output, shown after she runs

{ type: "callout",
  tone: "tip" | "warn" | "myth",       // myth = Greek-mythology aside
  title: { he, en },
  text:  { he, en } }

{ type: "compare",                     // the single best teaching device here
  bad:  { code: "…", label: { he, en } },
  good: { code: "…", label: { he, en } } }

{ type: "error",                       // deliberately broken code + its real error
  code: "print(\"Hello)",
  error: "SyntaxError: bad input on line 1",
  explain: { he, en } }
```

The `error` block is required in lesson 1 and encouraged everywhere: seeing a
real error in a safe, expected context is how an error stops being frightening.

### Exercise object

```js
{
  id: "e1",
  title: { he, en },
  brief: { he, en },                   // what to do — imperative, concrete
  starter: "# your code here\n",       // pre-filled editor content
  solution: "print(\"Hello\")",        // revealed only at the last hint rung
  xp: 20,
  drachmas: 5,
  hints: [                             // exactly 3, escalating
    { he, en },                        // 1: a nudge — a question, not an answer
    { he, en },                        // 2: concrete — names the construct
    { he, en },                        // 3: walks through it; solution unlocks
  ],
  check: { … },                        // one of the four kinds below
}
```

### Check kinds

```js
// stdout comparison — the default. Use "normalized" unless you have a reason.
{ kind: "output", mode: "normalized", expect: "Hello, Olympus" }
{ kind: "output", mode: "contains",   expect: "Percy" }
{ kind: "output", mode: "regex",      expect: "^\\d+ drachmas$" }
{ kind: "output", mode: "exact",      expect: "a\nb" }

// variable inspection after the run
{ kind: "variable", vars: { hero: "Percy", age: 12 } }

// source inspection — MUST carry a message explaining the requirement
{ kind: "source",
  mustInclude: ["for"], mustExclude: ["while"],
  message: { he: "המשימה הזו דורשת לולאת for", en: "This one needs a for loop" } }

// By default `source` inspects a SKELETON with comments and string literals
// stripped, so a word inside a comment or a printed string cannot satisfy a
// requirement. Set `raw: true` when the requirement IS a comment or a literal
// — otherwise the check can never pass. (Lesson 1 e4 needs this.)
{ kind: "source", raw: true, mustInclude: ["#"], message: { … } }

// multiple runs with queued stdin
{ kind: "cases", cases: [
    { stdin: ["Percy"], expect: "Hello, Percy!" },
    { stdin: ["Annabeth"], expect: "Hello, Annabeth!" } ] }
```

`normalized` trims and collapses runs of whitespace. **Prefer it.** A missing
trailing space must never fail a beginner.

## Authoring rules that the schema cannot enforce

- **Only use Python that Skulpt actually runs.** Check the matrix in
  `01-architecture.md`; verify with `node tools/verify-python.mjs`. No `json`,
  no `open()`.
- **Only use concepts already taught.** A lesson may use anything from lessons
  1..NN-1 and nothing from NN+1. Check `07-curriculum.md`.
- **Every exercise must be solvable with only what she knows.** This is the most
  common way a lesson goes wrong.
- **`solution` must actually pass its own `check`.** `node tools/verify-python.mjs`
  asserts this for every exercise — a solution that fails its checker is a build
  failure. It also runs every teach `code` block, confirms every `error` block
  really errors, and confirms every exercise has exactly three hints.
- **Exercises produce something worth reading.** "Print the numbers 1 to 10" is
  a drill; "print the countdown as the Minotaur charges" is the same drill and
  she will do it.
- **Difficulty ramps within the lesson**: exercise 1 should be nearly free,
  the last training exercise should require real thought, the quest should feel
  like an accomplishment.

## Lesson shell (`lessons/lesson-NN.html`)

Thin and identical apart from two numbers. Script order is load-bearing — see
`01-architecture.md`.

```html
<!doctype html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>שיעור 1 · המילה הראשונה</title>
  <link rel="stylesheet" href="../assets/css/theme.css">
</head>
<body class="lesson-page">
  <div id="app"></div>
  <script src="../assets/js/vendor/skulpt.min.js"></script>
  <script src="../assets/js/vendor/skulpt-stdlib.js"></script>
  <script src="../assets/js/store.js"></script>
  <script src="../assets/js/i18n.js"></script>
  <script src="../assets/js/curriculum.js"></script>
  <script src="../assets/js/engine.js"></script>
  <script src="../assets/js/editor.js"></script>
  <script src="../assets/js/checker.js"></script>
  <script src="../assets/js/game.js"></script>
  <script src="../assets/js/lesson.js"></script>
  <script src="../content/lesson-01.js"></script>
  <script>LC.Lesson.mount("01");</script>
</body>
</html>
```
