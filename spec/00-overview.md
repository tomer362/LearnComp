# 00 — Overview: motive, learner, pedagogy

## Why this exists

A 14-year-old girl wants to learn to program. Every obstacle between her and her
first working line of Python is a chance to quit: installing Python, a terminal,
a PATH variable, a code editor, an account, a paywall, a tutorial written for
adults in a language she reads slowly.

This project removes all of them. She gets a folder. She double-clicks one file.
She is in the story, and thirty seconds later she has run real code.

The Percy Jackson framing is not decoration. It is the retention strategy. A
14-year-old will push through a confusing paragraph about variables if it is
standing between her and finding out what happens at Camp Half-Blood. Abstract
drills lose to story every time at this age.

## Who she is — design for this person, not a generic "beginner"

- **14 years old.** Capable of real abstraction, but not motivated by "this will
  be useful for your career". Motivated by *making something happen*.
- **Zero prior programming.** Assume she has never seen a variable, a function
  call, a bracket, or an error message. She does not know what "run" means.
- **Hebrew-native, English second.** She reads Hebrew fluently and English with
  effort. Explanations must be Hebrew. Code must be English, because Python is
  English — hiding that would be a lie that hurts her later.
- **Not a "computer person" yet.** She may not know what a file path is. Never
  ask her to open a terminal, edit a config, or install anything.
- **Has a phone and a laptop.** Pages must be usable at 390px wide.

## Pedagogy — the seven rules

1. **Story before syntax.** Every lesson opens with a scene, not a definition.
   The concept arrives because the story needs it.
2. **She runs code in the first 60 seconds** of every lesson. Reading about code
   is not learning to code.
3. **One new idea per lesson.** If a lesson needs two, it is two lessons.
   Everything else in that lesson must be something she already knows.
4. **Concrete before abstract.** Show three working examples, *then* name the
   rule. Never open with a definition.
5. **Errors are content, not failure.** She will see errors constantly. Lesson 1
   deliberately shows her a broken program and fixes it, so that an error feels
   like a puzzle and not like being told off. Error text stays real English
   Python, with a friendly Hebrew explanation beside it — never instead of it.
6. **Never hand her the answer.** Hints escalate: a nudge, then a stronger nudge,
   then a worked solution she must choose to reveal. The reveal costs an
   in-game resource so it feels like a decision, not a shortcut.
7. **Every success is visible.** XP, an item, a filled-in stop on the quest map.
   She should be able to see how far she has come without reading anything.

## Tone

Warm, playful, a little dramatic — the narrator is a storyteller at camp, not a
textbook. Second person. Short sentences.

Never: condescending ("easy!", "obviously", "just"), gendered assumptions about
what she likes, fake urgency, or streak-guilt mechanics. If she comes back after
three weeks the game should be glad to see her, not tell her she lost a streak.

**Difficulty is real.** Do not make exercises trivially easy to protect her.
A 14-year-old knows when she is being patronised. The exercises should be
genuinely solvable but require thought, and the hint ladder is what makes that
safe.

## What "done" means for this project

She can, unaided, write a Python program with variables, conditions, loops,
lists, dictionaries, functions and a class — and she wants to keep going.
Lesson 20 ends by pointing her at real CPython, because the point was never the
game.
