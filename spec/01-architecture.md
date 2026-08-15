# 01 — Architecture

## The constraint that decides everything

The course is opened by **double-clicking a file**. The browser origin is
`file://`, which disables three things a normal web app relies on:

| Blocked on `file://` | Consequence for this project |
| --- | --- |
| `fetch()` / `XMLHttpRequest` on local files | Lesson content is **`.js` files that call a register function**. Never `.json`. |
| ES modules (`<script type="module">`) | **Classic `<script>` tags only.** No `import`/`export` anywhere in `assets/js/`. |
| Any network request | Everything is vendored. No CDN, no webfonts, no analytics, no telemetry. |

`localStorage` **does** work on `file://` (verified in Chromium), but Safari is
unreliable, so all persistence goes through `LC.store` which falls back to an
in-memory object without throwing.

Everything lives on one global namespace, `window.LC`. No bundler, no build step,
no `npm install` to run the product. The `tools/` folder is developer-only and is
never loaded by a page.

## File layout

```
index.html              Quest map / hub
lessons/lesson-NN.html  Thin shell (~30 lines) — loads shared JS + its content file
content/lesson-NN.js    All text (he+en), examples, exercises for lesson NN
assets/css/theme.css    Single stylesheet, RTL+LTR via logical properties
assets/js/vendor/       skulpt.min.js, skulpt-stdlib.js (MIT, committed)
assets/js/store.js      localStorage wrapper with in-memory fallback
assets/js/i18n.js       language state, dir flipping, string resolution
assets/js/engine.js     Skulpt wrapper: run, stdout, async input(), limits, errors
assets/js/editor.js     Code editor (textarea + gutter), always LTR
assets/js/checker.js    Exercise validation + hint ladder
assets/js/game.js       XP, level, drachmas, ambrosia, cabin, items, progress
assets/js/lesson.js     Renders a lesson page from its content object
assets/js/hub.js        Renders the quest map on index.html
tools/                  Dev-only: verify-python.mjs, smoke-test.mjs
```

**Script load order matters** (no module graph to sort it out). Every page loads:

```
vendor/skulpt.min.js → vendor/skulpt-stdlib.js → store.js → i18n.js → engine.js
→ editor.js → checker.js → game.js → (lesson.js | hub.js) → content/lesson-NN.js
```

The content file calls `LC.registerLesson({...})`, then the page calls
`LC.Lesson.render()` on `DOMContentLoaded`.

## Adding a lesson

Two files, no other edits:

1. `content/lesson-NN.js` — the content object (schema: `04-lesson-template.md`).
2. `lessons/lesson-NN.html` — copy the previous shell, change two numbers.

`assets/js/curriculum.js` holds the ordered list of lessons for the quest map;
add the entry there so the stop appears. That is the only shared file a new
lesson touches.

## `engine.js` — the Python runtime

```js
LC.Engine.run(code, {
  onStdout(text),      // called per write
  onInput(promptText), // return a Promise<string> — powers input()
  execLimitMs,         // default 5000
  captureVars: ["x"],  // optional: read these back after the run
}) // → Promise<{ ok, output, error, vars }>
```

Implementation notes that are easy to get wrong:

- **Configure per run, not once.** `Sk.configure({output, read, __future__: Sk.python3, execLimit, inputfun, inputfunTakesPrompt: true})` is called on every run so a stale callback from a previous lesson section cannot leak.
- **`read`** resolves stdlib from `Sk.builtinFiles.files[x]`, throwing
  `"File not found: '" + x + "'"` when missing. This is how `import math` works
  with no network.
- **`input()` is asynchronous.** `inputfun` returns a Promise; Skulpt suspends the
  program and resumes when it resolves. The UI renders an in-page prompt (styled
  as an Iris-message) — never `window.prompt`, which is ugly and blocked in some
  contexts.
- **`execLimit`** is wall-clock milliseconds. On overrun Skulpt throws
  `TimeLimitError`, which the engine converts to a friendly in-theme message
  instead of a crash. **Verified working** — this is what stops `while True:`
  from freezing her tab.
- **Errors** are normalised to `{type, message, line}` by parsing the Skulpt error
  object (`err.tp$name`, `err.args`, `err.traceback[0].lineno`). The UI shows the
  real English error **and** a Hebrew explanation. Never suppress the real one.

### Verified Skulpt capability matrix

Run `node tools/verify-python.mjs` to reproduce. Confirmed working from `file://`
with all network blocked and zero console errors:

`print` · f-strings (including format specs like `f"{x:.2f}"`) · `int/float/str/type`
· `if/elif/else` · `while` · `for` + `range` · `break`/`continue` · lists +
slicing + `.sort()`/`sorted`/`min`/`max`/`sum` · dicts + `.get()` + `.items()` ·
functions with defaults and `*args` · `return` · recursion · classes +
inheritance · `try/except` · string methods (`.split`, `.join`, `.upper`,
`.strip`, `.replace`, `.find`) · comprehensions · tuples · sets · `enumerate` ·
`zip` · `round(x)` and `round(x, n)` · `// % **` · `import math` ·
`import random` · `import re` · `import time`

**Not available — never use in a lesson:**

- `import json` → `NotImplementedError`
- `open()` / any file I/O
- any third-party package (`requests`, `numpy`, …)

**Load-bearing engine contract:**

- **`input()` does NOT echo its prompt to stdout.** Skulpt passes the prompt to
  `inputfun` and writes nothing; the UI renders it in the in-page panel. CPython
  *does* write the prompt to stdout, so a `cases` check's `expect` must contain
  only what the program `print`s — never the prompt text. Every exercise from
  lesson 3 onward depends on this.
- The lesson UI echoes her typed answer into the visible output panel for
  readability, but that echo is UI-only and never reaches the checker.

**Known fidelity gaps to be honest about:**

- `1/0` → `integer division or modulo by zero`; CPython 3 says `division by zero`.
- `KeyError: zz`; CPython quotes the key (`KeyError: 'zz'`).
- `round(2.5)` → `2`, matching CPython 3's banker's rounding. Still, no exercise
  should depend on a `.5` tie.
- Lesson 18 teaches that error wording varies between Python implementations.
- Skulpt is not CPython. Lesson 20 ends by pointing her at installing real Python.

## `checker.js` — exercise validation

Four `check.kind` values, declared per exercise in the content file:

| kind | what it does |
| --- | --- |
| `output` | compares stdout — `mode: "exact" \| "contains" \| "normalized" \| "regex"` |
| `variable` | after the run, reads named variables back and compares |
| `source` | inspects her source for required/forbidden constructs |
| `cases` | runs the code once per case with queued `stdin`, compares each output |

`normalized` collapses whitespace and trims — use it by default, because a
missing trailing space must never fail a 14-year-old.

`source` exists for "you must use a `for` loop here" and must **always** carry a
custom `message`, otherwise the failure is unexplainable.

The checker returns `{pass, reason, hintIndex}`. It never mutates game state;
`game.js` decides rewards.

## `game.js` — state and persistence

Single save object under `localStorage["learncomp.save.v1"]`:

```js
{ v: 1, name, cabin, lang, xp, drachmas, ambrosia,
  lessons: { "01": { done, exercisesDone: [], hintsUsed, bestAt } },
  items: ["riptide"], achievements: [] }
```

Rules: **never** delete a key on load (forward-compatible), always merge over a
default object, and bump `v` with a migration function if the shape changes.
Export/Import writes the same JSON to a textarea so progress survives a browser
wipe or a move to another computer — there is no server to sync with.
