# TODO

Living task list. `spec/08-quality-checklist.md` is the full definition of done;
the per-lesson boxes below are the short form of it.

## Status

| | |
| --- | --- |
| Engine, hub, i18n, checker, game layer | ✅ done |
| Lesson 1 | ✅ built, verified, playable |
| Lessons 2–20 | 📋 designed in `spec/lessons/`, not yet built |
| Verification tooling | ✅ `tools/verify-python.mjs`, `tools/smoke-test.mjs` |

## Done

- [x] Vendor Skulpt 1.2.0 (MIT) and verify it runs from `file://` offline
- [x] `spec/` design contract (`00`–`08`) and all 20 deep lesson specs
- [x] `store.js` — persistence with in-memory fallback
- [x] `i18n.js` — Hebrew/English live switching, RTL/LTR, `<bdi>` code isolation
- [x] `engine.js` — Skulpt wrapper, async `input()`, exec limit, error explainer
- [x] `editor.js` — gutter, auto-indent, Tab, smart-quote normalisation on paste
- [x] `checker.js` — `output` / `variable` / `source` / `cases` validators
- [x] `game.js` — XP, levels, cabins, drachmas, ambrosia, items, achievements
- [x] `lesson.js` — the six beats, hint ladder, boss health bar
- [x] `hub.js` + `index.html` — claiming flow, quest map, export/import
- [x] `theme.css` — one stylesheet, both directions, logical properties
- [x] Lesson 1 — content, shell, 4 training exercises + quest, all verified
- [x] `tools/verify-python.mjs` — asserts every solution passes its own check
- [x] `tools/smoke-test.mjs` — 39 checks over `file://` with the network blocked
- [x] `CLAUDE.md`, `.claude/rules/lesson-authoring.md`, `README.md`

## Lessons to build

Each lesson: write `content/lesson-NN.js` from `spec/lessons/lesson-NN.md`, copy
the shell to `lessons/lesson-NN.html`, flip `built: true` in
`assets/js/curriculum.js`, then run both tools.

Per-lesson boxes: **C** content written he+en · **V** `verify-python.mjs` passes ·
**S** `smoke-test.mjs` passes · **R** checked in both RTL and LTR · **P** no
horizontal scroll at 390px

### Act I — Camp Half-Blood

- [ ] **02** The Camp Necklace — variables, `str`/`int`/`float`, `type()` · C V S R P
- [ ] **03** Speaking with Chiron — `input()`, conversion, f-strings · C V S R P
- [ ] **04** The Minotaur's Toll — arithmetic · **BOSS** · C V S R P

### Act II — The Lightning Thief

- [ ] **05** The Oracle's Riddle — booleans, comparisons, `and`/`or`/`not` · C V S R P
- [ ] **06** The Crossroads — `if`/`elif`/`else`, **indentation** · C V S R P
- [ ] **07** Past the Sirens — `while`, accumulators, `break` · C V S R P
- [ ] **08** Medusa's Garden — `for`, `range()`, `continue` · **BOSS** · C V S R P

### Act III — Sea of Monsters

- [ ] **09** The Quest Party — lists, indexing, `len()`, `in` · C V S R P
- [ ] **10** The Hunters' Inventory — list methods, slicing, `sorted` · C V S R P
- [ ] **11** Registry of the Gods — dicts, `.get()`, `.items()` · C V S R P
- [ ] **12** The Hydra — nested data, counting, searching · **BOSS** · C V S R P

### Act IV — The Titan's Curse

- [ ] **13** Daedalus' Blueprints — `def`, parameters · C V S R P
- [ ] **14** The Map Maker — `return`, defaults, scope · C V S R P
- [ ] **15** The Dice of Fate — `import`, `random`, `math`, mini-game · C V S R P
- [ ] **16** The Maze Within — recursion, base case · **BOSS** · C V S R P

### Act V — The Last Olympian

- [ ] **17** Decoding the Prophecy — string methods, slicing · C V S R P
- [ ] **18** Surviving the Furies — tracebacks, `try`/`except`, debugging · C V S R P
- [ ] **19** The Forge of Hephaestus — `class`, `__init__`, `self` · C V S R P
- [ ] **20** Battle for Olympus — **CAPSTONE**, staged build + "real Python next" · C V S R P

## Known gaps and follow-ups

- [ ] **Mirror each new item into `LC.ITEMS`** in `assets/js/curriculum.js` when
      you build a lesson. The hub does not load content files (that would mean
      pulling in all 20), so it reads item names and icons from that table.
      An unmirrored item falls back to a 🎒 and its raw id.
- [ ] **No syntax highlighting** in the editor — deliberate for v1
      (`spec/05-visual-design.md`). Revisit only with a vendorable editor.
- [ ] **Skip-ahead affordance** described in `spec/02-game-design.md` is not
      built. Lessons unlock strictly in order today.
- [ ] **Achievements** `persistent`, `debugger`, `noHints` are wired but only
      lesson 1 can currently trigger them.
- [ ] Consider a `verify-all` npm-less script that runs both tools in sequence.
- [ ] The boss health bar animates per passing case; with a single-case check it
      is a one-segment bar. Bosses should always declare 4–6 cases.
