# TODO

Living task list. `spec/08-quality-checklist.md` is the full definition of done;
the per-lesson boxes below are the short form of it.

## Status

| | |
| --- | --- |
| Engine, hub, i18n, checker, game layer | ✅ done |
| **2D battle engine** (sim, Python API, canvas renderer) | ✅ done |
| Lessons 1–2 | ✅ built as five playable battles each, verified |
| Lessons 3–20 | 📋 **designed as battle levels** in `spec/lessons/`, every level verified winnable by simulation, not yet built as `content/` files |
| Verification tooling | ✅ simulates every level headlessly |
| **Vercel Hobby deployment** | ✅ done — `spec/10-deployment.md`, dual-mode: `file://` unchanged, hosted lane adds PWA install, progressive reveal, shareable progress links |

**The game is the course** — see `spec/09-battle-game.md`. Every task is a
battle; there are no written exercises.

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
- [x] Beginner syntax diagnosis — Skulpt reports every indentation mistake as a
      flat `bad input`, so the engine works out what she actually did wrong
- [x] **Battle engine** — `battle/sim.js` (deterministic headless simulation,
      seeded RNG, snapshot recording), `battle/pyapi.js` (the Python API as
      Skulpt builtins, plus calling her `choose_target` and tower classes back
      from JS), `battle/play.js` (orchestration, objective, failure diagnosis),
      `battle/render.js` (canvas replay with playback controls)
- [x] `tools/verify-python.mjs` — **simulates every level**: asserts each
      solution wins and that no level is winnable by writing nothing; also that
      every declared error string matches what the engine really renders
- [x] `tools/smoke-test.mjs` — 68 checks over `file://` with the network blocked,
      including playing battles in a real browser
- [x] `CLAUDE.md`, `.claude/rules/lesson-authoring.md`, `README.md`
- [x] **Rest time** — `rest.js` offers a break after 25 min of *active* time,
      `sound.js` chimes when it ends. The chime mixes with her music instead of
      taking the audio session: no media element, ambient session, context
      suspended between sounds. Contract in `spec/01-architecture.md`, behaviour
      in `spec/02-game-design.md`, asserted in `tools/smoke-test.mjs`

## Lessons to build

Each lesson: write `content/lesson-NN.js` from `spec/lessons/lesson-NN.md`, copy
the shell to `lessons/lesson-NN.html` (**including the four `battle/*.js` script
tags**), flip `built: true` and add the item to `LC.ITEMS` in
`assets/js/curriculum.js`, then run both tools.

Per-lesson boxes: **C** content written he+en · **V** `verify-python.mjs` passes
(every level's solution wins, none winnable by doing nothing) · **S**
`smoke-test.mjs` passes · **R** checked in both RTL and LTR · **P** no horizontal
scroll at 390px

### Act I — Camp Half-Blood

- [x] **02** The Camp Necklace — variables, `str`/`int`/`float`, `type()` · C V S R P
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

- [ ] **Building lesson N is now a transcription job, not a design job.** Each
      `spec/lessons/lesson-NN.md` carries complete level definitions — map,
      path, gold, campHp, waves, starter, solution, hints, exact `check` — all
      verified by simulation. Transcribe into `content/lesson-NN.js`, then run
      `node tools/verify-python.mjs content/lesson-NN.js`; it re-simulates and
      will catch any transcription slip.
- [ ] **Three engine behaviours were tightened after some specs were written**
      (rocks unbuildable, cannons blind to flyers, constraint failures
      explained). The specs were re-verified against the first two, but if a
      level fails when you build it, check these before assuming the spec is
      wrong.

- [ ] **The XP budget lands within ~10 points of the Olympian threshold.** The 20
      lesson specs total roughly 4210 core XP against a 4200 level-7 floor, so she
      reaches Olympian on the final award of the capstone and not before — which
      is the intent, but it means **any XP retuning must be rechecked against
      `spec/02-game-design.md`'s level table**. If a lesson's values change, sum
      the specs again and adjust lesson 20's completion bonus to absorb it.

- [ ] **Mirror each new item into `LC.ITEMS`** in `assets/js/curriculum.js` when
      you build a lesson. The hub does not load content files (that would mean
      pulling in all 20), so it reads item names and icons from that table.
      An unmirrored item falls back to a 🎒 and its raw id.
- [ ] **No syntax highlighting** in the editor — deliberate for v1
      (`spec/05-visual-design.md`). Revisit only with a vendorable editor.
- [ ] **Skip-ahead affordance** described in `spec/02-game-design.md` is not
      built. Lessons unlock strictly in order today.
- [x] **Progressive reveal within a lesson** — battles now unlock one at a
      time as she wins them (a queue, not a skip: locked battles render as an
      inert strip, never a hidden one). See `assets/js/lesson.js` and
      `spec/10-deployment.md`. This is separate from lesson-to-lesson
      unlocking above, which is still strictly in order.
- [x] **Achievements** `persistent`, `debugger`, `noHints` can now trigger
      from either built lesson. Two new ones — `namer` and `typeDetective` —
      were added for lesson 2; wire the pattern forward as more lessons ship.
- [ ] **Only tested in Chromium.** The smoke test uses the one browser installed
      in this environment. Before giving her the folder, open it once in the
      browser she actually uses — especially Safari, where `localStorage` on
      `file://` is the least reliable (`store.js` falls back to memory, so the
      course still runs, but progress would not survive a reload).
- [ ] Consider a `verify-all` npm-less script that runs both tools in sequence.
- [ ] The boss health bar animates per passing case; with a single-case check it
      is a one-segment bar. Bosses should always declare 4–6 cases.
