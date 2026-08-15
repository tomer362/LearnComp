# Lesson 01 — The First Word · המילה הראשונה

> **Act I — Camp Half-Blood** · Stop 1 of 20
> **This file is the reference spec, and `content/lesson-01.js` is the reference
> implementation.** Lessons 2–20 follow this structure. Schemas:
> `spec/04-lesson-template.md` (lesson) and `spec/09-battle-game.md` (levels).
> When this file and `content/lesson-01.js` disagree, the content file is right —
> it is the one that is verified.

| | |
| --- | --- |
| **id** | `01` |
| **slug** | `the-first-word` |
| **minutes** | 20–25 |
| **concepts** | `print()`, strings, **calling a function with arguments**, comments, reading an error |
| **new vocabulary** | `print`, `place_tower`, `"…"`, `#` |
| **requires** | nothing — this is her first ever program |
| **control model** | build script |
| **API introduced** | `place_tower(kind, x, y)` |
| **item** | 📿 חרוז המחנה / Camp Bead |
| **XP** | 20 + 25 + 30 + 30 (battles) + 55 (great battle) + 30 (bonus) = **190** |
| **drachmas** | 5 + 6 + 8 + 8 + 14 = **41** 🪙 |

## Teaching goal

By the end she can **make something happen by calling a function with
arguments** — and she has done it twice, with `print()` and with
`place_tower()`, so she can see they are the same shape.

She also knows a string is text in quotes, that `#` writes a note to herself,
and — most importantly — **she has seen an error, understood it, and fixed it.**

The real goal of lesson 1 is emotional, not technical: *"I typed something and
the machine obeyed, and when I broke it, that was fine."*

## The teaching move this lesson is built on

`print("Hello")` and `place_tower("archer", 2, 3)` have **identical shape**: a
name, brackets, and things inside separated by commas. Teaching `print` first and
then revealing that the game's command is the same shape is what makes a tower
defense reachable from zero knowledge. Do not present them as two separate
topics — the second one is the first one, applied.

## Story beat

She arrives at Camp Half-Blood, out of breath, having just outrun something with
too many teeth. Chiron meets her at the Big House and tells her that more are
coming, and that she will stop them — not with a sword, but with words.

Cast: Chiron.

## Chiron Teaches — block by block

1. **prose** — a program is a list of instructions, run top to bottom, doing
   exactly what it says. That predictability is what makes it an ally.
2. **code (runnable)** — `print("Hello, Olympus")`. She runs code within the
   first 60 seconds.
3. **prose** — anatomy, named only *after* she has run it: the command name, the
   brackets, the quotes. Text in quotes is a **string**.
4. **callout · myth** — why Python's words are English everywhere in the world,
   framed as the language of the gods rather than an obstacle.
5. **prose** — the reveal: there is another command with exactly the same shape,
   and it puts a tower on the battlefield.
6. **code (not runnable)** — `place_tower("archer", 2, 3)`, shown as a
   specimen. It is `runnable: false` because there is no battlefield attached to
   a teaching block.
7. **prose** — the three arguments: which tower (a string), the column `x`, the
   row `y`. Coordinates start at **0**, flagged as strange-now/sensible-in-
   lesson-9.
8. **callout · warn** — you cannot build on the path. A tower must stand on
   grass beside it.
9. **error block** — `print("Hello)` → `SyntaxError: bad input (line 1)`.
   Explains that `bad input` is unhelpful phrasing carrying one vital thing: the
   line number. **The declared error string must be exactly what the engine
   renders**; `verify-python.mjs` asserts this.
10. **compare** — `print(Hello)` (NameError) vs `print("Hello")`, then prose
    extending the rule to `"archer"`.
11. **prose + code** — comments with `#`, framed as her own notebook.

## Training Ground (ungraded)

A free editor with two `print` lines. The game words work here too, against a
practice field, so `place_tower` never dies with a `NameError` — placements are
echoed back as `🏹  archer → (2, 3)`.

## The Battles

All four use `check: { kind: "battle" }`. Full definitions live in
`content/lesson-01.js`; the design intent is here.

### b1 — The First Tower · 20 XP, 5 🪙
8×6 map, straight path along row 4, three satyrs, camp HP 3, one archer's worth
of gold. **The correct line is already written.** She presses Fight and watches.

*Why this mechanic:* the first success must cost nothing but a button press. The
lesson is "I made something happen", not "I solved a puzzle".

### b2 — One Tower Is Not Enough · 25 XP, 6 🪙
10×6 map, six satyrs. One tower cannot kill them all in time; she must add two
more `place_tower` lines.

*Why this mechanic:* forces **repeated calls in sequence** — that lines run in
the order written, and that one call does one thing.

### b3 — Fix the Broken Sword · 30 XP, 8 🪙
Starter has two broken quote pairs (`"archer, 2, 3)` and `(archer", 5, 3)`). It
does not run at all. Marked `brokenStarter: true` so verification does not treat
a non-running starter as a defect.

*Why this mechanic:* debugging arrives in lesson 1, in a safe place, before she
has written anything substantial. This is the most important battle in the lesson.

### b4 — A Written Battle Plan · 30 XP, 8 🪙
10×7 map with a **bend** in the path, mixed satyrs and harpies. She must win
**and** include a comment.

*Why this mechanic:* the bend rewards thinking about placement rather than
copying coordinates, and `check.also` with `source raw:true mustInclude ["#"]`
forces the comment. `raw: true` is required — the skeleton used by `source`
checks strips comments, so without it the requirement could never pass.

## The Great Battle — "The Defense of the Gate" · 55 XP, 14 🪙

12×8 map, a path with **two bends**, three waves (satyrs → harpies →
hellhounds), 300 gold, camp HP 3, archers only. Six towers clustered at the
bends win it; six spread evenly do not.

*Why this mechanic:* it is the first level with a real decision in it. Nothing
new is introduced — it is everything from b1–b4 at a scale that feels like an
accomplishment.

## Reward & Recap

**Item**: 📿 **חרוז המחנה / Camp Bead** — the first of twenty, one per lesson.
It is the visible spine of the whole course, so it must also be mirrored into
`LC.ITEMS` in `assets/js/curriculum.js` or the hub shows a raw id.

**Achievements reachable here**: *First Word* (ran any program), *Debugger*
(fixed an error and re-ran successfully in b3).

**Recap bullets**: a command is a name + brackets + arguments; `print()` and
`place_tower()` are the same shape; strings need quotes; lines run in order; `#`
is a comment; an error is a message, not a failure.

**Next teaser**: she typed `"archer"` six times — tomorrow, naming a thing once.

## Common mistakes to anticipate

| She does | She sees | Covered by |
| --- | --- | --- |
| `Print("hi")` | `NameError: name 'Print' is not defined` | case sensitivity; hint 2 of b1 |
| `place_tower(archer, 2, 3)` | `NameError: name 'archer' is not defined` | the compare block, extended to `"archer"` |
| `place_tower("archer", 2, 4)` | builds on the path — rejected | the warn callout; the engine names it exactly |
| tower far from the path | battle lost, no shots fired | the engine says "never saw a monster" |
| `print("hi"` | `SyntaxError` | every `(` needs a `)` |
| smart quotes `“hi”` | would be a `SyntaxError` | `editor.js` normalises them on paste |
| a tab character | would run here but `TabError` in real Python | `editor.js` converts tabs to four spaces |

## Implementation notes

- Nothing here needs `input()`, so lesson 1 never blocks on a prompt.
- `campHp` is 3 in every level, not 10. The default objective is a **perfect**
  defense, and a small number keeps the stakes legible in the HUD.
- Seeds are fixed per level (1, 2, 3, 4, 7) so a battle plays identically every
  time and a hint can describe what she will see.
- b1's solution is its own starter. That is deliberate, not an oversight.
- Verified by `node tools/verify-python.mjs`: every solution wins its battle,
  and no level can be won by an empty program.
