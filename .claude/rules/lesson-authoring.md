---
description: Conventions for writing lesson content files
paths:
  - "content/**"
  - "spec/lessons/**"
---

# Lesson authoring rules

Loaded only when you are actually editing lesson content, so it can afford to be
specific. The deep design for the lesson you are building is in
`spec/lessons/lesson-NN.md` — read that one first.

**The game is the course.** Every task is a battle, not an exercise. The level
schema, the Python API she has available, and which control model each lesson
uses all live in `spec/09-battle-game.md` — read it before writing a level.
`content/lesson-01.js` is the working reference. Voice rules are in
`spec/06-authoring-guide.md`; the surrounding lesson structure is in
`spec/04-lesson-template.md`.

## Before you write a line

1. Read `spec/lessons/lesson-NN.md` — it already contains the story beat, the
   exercises, the hints and the common mistakes. You are implementing a design,
   not inventing one.
2. Check `spec/07-curriculum.md` for what she already knows. **Lesson N may use
   anything from lessons 1..N-1 and nothing from N+1.** This is the single most
   common way a lesson goes wrong.
3. Check the verified Skulpt matrix in `spec/01-architecture.md`. No `json`,
   no `open()`, no third-party imports.

## While writing

- Every learner-visible string is `{ he: "…", en: "…" }`. A bare string is a bug.
- Code strings are English only and are never translated — including comments
  inside example code.
- Hebrew: feminine second person (`את`, `נסי`, `תכתבי`). Modern and spoken.
- Banned in both languages: **simply, just, easy, obviously, of course**.
- Backticks inside prose become isolated LTR code chips automatically — use
  `` `print` `` rather than hand-writing markup.
- `**bold**` works in prose. Nothing else does; everything else is escaped.

## Battle levels

- **A level must force the lesson's concept.** If she can beat it by placing
  towers by hand when the lesson is about loops, the level is broken. Either the
  map makes the concept necessary (twenty spots, one wave format she must read),
  or you add `check.also` with a `source` rule requiring the construct.
- **A level must be unwinnable by writing nothing** — `verify-python.mjs`
  asserts this. The default objective is a *perfect* defense: campHp must not
  drop at all unless the level sets `check.campHpAtLeast` lower.
- **A level must also be unwinnable by a degenerate answer.** From lesson 14 on,
  run `return 0`, `return enemies[0]` and `return None` against it and confirm
  they lose. A real near-miss: on one test level `return 0` won while three
  thoughtful strategies lost. Use `node tools/try-level.mjs` to check.
- Towers cannot stand on the path, and one further than about 2.6 cells from it
  never fires. Check your coordinates against your own path list.
- Only the API available at that lesson: build-script calls through lesson 13,
  `choose_target` from 14, classes from 19.
- Randomness is seeded per level, so a battle plays identically every time —
  never write a level whose outcome depends on luck.

## Exercises

- 3–5 training battles, ramping. The first should be nearly free.
- Exactly **three** hints: a nudge that asks a question, then one that names the
  tool, then one that walks through the reasoning. Never give the answer at
  rung 1; never still be cryptic at rung 3.
- Prefer `check.mode: "normalized"` — a missing trailing space must never fail her.
- A `source` check MUST carry a `message` explaining the requirement, or the
  failure is unexplainable.
- `source` checks inspect a skeleton with comments and string literals stripped.
  If the requirement IS a comment or a literal, set `raw: true` — otherwise the
  check can never pass.
- For open-ended tasks where she picks the text, combine a `source` check with a
  loose `also` output check (see lesson 1 e1 and e4).

## Before you call it done

```bash
node tools/verify-python.mjs content/lesson-NN.js
node tools/smoke-test.mjs
```

`verify-python.mjs` runs every code sample and asserts **every solution passes
its own check**. A solution that fails its checker strands her on an exercise
nobody can complete — treat it as a build failure, not a warning.

Then walk `spec/08-quality-checklist.md`.
