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

## Battle levels

- [ ] 3–5 training battles, ramping from nearly-free to genuinely hard
- [ ] One great battle (a boss in lessons 4/8/12/16/20)
- [ ] Every level has exactly 3 escalating hints (nudge → tool → walkthrough)
- [ ] **Every `solution` WINS its battle** — asserted by `verify-python.mjs`
- [ ] **No level can be won by writing nothing** — also asserted
- [ ] Each level's mechanic *forces* the lesson's concept; where the map alone
      cannot, a `check.also` `source` rule requires the construct
- [ ] Every level is beatable using only what she has been taught, and only the
      API available at that lesson (`spec/09-battle-game.md`)
- [ ] No tower in a stated solution sits on the path or out of range of it
- [ ] The level's outcome does not depend on luck (randomness is seeded)
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
- [ ] Every level draws its battlefield, and the replay controls work
- [ ] A losing attempt is *explained* — the diagnosis names the real mistake
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
