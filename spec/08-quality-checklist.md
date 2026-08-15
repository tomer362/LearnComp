# 08 — Definition of done and quality checklist

A lesson is **not done** until every box below is ticked. Copy this list into the
lesson's entry in `TODO.md` and tick as you go.

## Content

- [ ] Follows the six beats in `04-lesson-template.md`, in order
- [ ] Every learner-visible string is a `{he, en}` pair — no bare strings
- [ ] Hebrew is feminine second person; none of the banned words
      (`simply`, `just`, `easy`, `obviously`) appear in either language
- [ ] Only concepts from lessons 1..N-1 are used (`07-curriculum.md`)
- [ ] Prophecy is 3–6 lines and contains no code
- [ ] At least one `error` block: real broken code, real error, real explanation
- [ ] Recap has one bullet per concept, plus a teaser for lesson N+1
- [ ] Item, XP and drachma values match the budget in `02-game-design.md`

## Exercises

- [ ] 3–5 training exercises, ramping from nearly-free to genuinely hard
- [ ] One quest (or a boss with multiple test cases in lessons 4/8/12/16/20)
- [ ] Every exercise has exactly 3 escalating hints (nudge → tool → walkthrough)
- [ ] **Every `solution` passes its own `check`** — asserted by the smoke test
- [ ] Every exercise is solvable using only what she has been taught
- [ ] `output` checks use `mode: "normalized"` unless there is a stated reason
- [ ] Every `source` check carries a `message` explaining the requirement

## Python correctness

- [ ] Every construct used is in the verified matrix (`01-architecture.md`)
- [ ] No `json`, no `open()`, no third-party imports
- [ ] `node tools/verify-python.mjs content/lesson-NN.js` passes — every code
      sample and every solution actually runs in Skulpt and produces the
      documented output

## Bilingual and RTL

- [ ] Toggling language mid-lesson swaps all text with no reload and no scroll jump
- [ ] Editor, output and error text stay `dir=ltr` in Hebrew mode
- [ ] Inline code inside Hebrew prose uses `<bdi>` — parentheses not flipped
- [ ] No physical CSS properties (`left`, `margin-right`, `text-align: right`)
- [ ] Directional icons flip correctly between `rtl` and `ltr`

## Behaviour

- [ ] Runs from `file://` by double-click, offline, with **zero** console errors
- [ ] Zero network requests (smoke test blocks the network and asserts none)
- [ ] `while True:` is caught by the exec limit and shows the friendly message
- [ ] `input()` prompts in-page and resumes correctly
- [ ] Progress persists across reload; Export/Import round-trips
- [ ] Partial progress is saved — she can close the tab mid-lesson and return

## Presentation

- [ ] No horizontal scroll at 390px in either language
- [ ] Tap targets ≥ 44px; Run reachable without scrolling past the editor on a phone
- [ ] `prefers-reduced-motion: reduce` disables animation
- [ ] Keyboard: Tab reaches every control, focus is visible, Ctrl/Cmd+Enter runs
- [ ] Colour is never the only signal for correct/incorrect (icon + text too)
- [ ] Text contrast ≥ 4.5:1 against its background

## The last check

Open `index.html` by double-clicking it, in a browser with no devtools open, and
do the lesson start to finish as she would. If anything makes you impatient, it
will make her quit.
