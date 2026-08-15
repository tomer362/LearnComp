# 06 — Authoring guide: writing the lessons

Read `00-overview.md` (pedagogy) and `04-lesson-template.md` (schema) first.
This file is about the *writing*.

## Voice

The narrator is Chiron: a 3,000-year-old trainer of heroes who has taught
hundreds of demigods and is genuinely pleased to be teaching this one. Warm,
dry, occasionally amused. He is never surprised that something is hard.

- Second person, **feminine Hebrew** (`את`, `נסי`, `כתבת`).
- Short sentences. A paragraph is 2–4 of them.
- Present tense for instructions, past for story.
- Humour is welcome; sarcasm at her expense never is.

**Banned words**: "simply", "just", "easy", "obviously", "of course", "everyone
knows". Each one tells her that if she is struggling, something is wrong with
her.

Compare:

> ✗ פשוט תכתבי `print` וזהו, זה קל.
> ✓ נתחיל מהפקודה `print`. היא עושה דבר אחד, ועושה אותו טוב.

## Structure of an explanation

1. **Show** a tiny working example.
2. **Run it** — she sees output before she sees a rule.
3. **Name** the rule, in one sentence.
4. **Break it** on purpose, show the real error, explain it.
5. **Fix it** together.

Step 4 is the one people skip. Do not skip it. Errors she has seen in a calm
moment are errors she can handle alone at 11pm.

## Exercise design

- **Ramp**: exercise 1 is nearly free (change one word), the last is real work.
- **In-world**: every exercise is a thing a demigod would do. Same skill, better
  reason.
- **Output worth reading**: she should want to see what her program prints.
- **One skill at a time.** If an exercise needs two new things, split it.
- **Only what she knows.** Nothing from a later lesson. Check `07-curriculum.md`.
- **Verify it runs** in Skulpt before shipping: `node tools/verify-python.mjs`.
- The `solution` must pass its own `check` — the smoke test enforces this.

### Writing the three hints

The ladder is the safety net that lets exercises be genuinely hard.

| Rung | Job | Example |
| --- | --- | --- |
| 1 | Ask a question that redirects attention. Never names the answer. | "מה קורה אם תריצי את הקוד עכשיו? מה חסר בפלט?" |
| 2 | Name the tool, not the usage. | "את צריכה את `input()` — הוא מחזיר את מה שהמשתמשת הקלידה." |
| 3 | Walk through the reasoning fully; the solution unlocks after this. | "קודם נקלוט את השם, נשמור אותו במשתנה, ואז נדפיס אותו בתוך f-string." |

A hint that gives the answer at rung 1 wastes the mechanic. A hint that is still
cryptic at rung 3 is cruel.

## Hebrew terminology glossary

Give the Hebrew once with the English beside it, then **use the English term** —
that is what she will meet in every error message, tutorial and job.

| English | Hebrew | Notes |
| --- | --- | --- |
| code | קוד | |
| to run / execute | להריץ | |
| output | פלט | |
| input | קלט | |
| variable | משתנה | |
| value | ערך | |
| string | מחרוזת | keep `string` after first use |
| integer | מספר שלם | keep `int` |
| float | מספר עשרוני | keep `float` |
| boolean | ערך אמת | keep `bool`, `True`/`False` always English |
| list | רשימה | |
| dictionary | מילון | keep `dict` |
| key / value | מפתח / ערך | |
| function | פונקציה | |
| parameter / argument | פרמטר / ארגומנט | |
| to return | להחזיר | |
| loop | לולאה | |
| condition | תנאי | |
| indentation | הזחה | critical term — teach it explicitly in lesson 6 |
| error | שגיאה | |
| bug / to debug | באג / לנפות באגים | |
| comment | הערה | |
| class / object | מחלקה / אובייקט | |
| library / module | ספרייה / מודול | |

**Always English, never translated**: every Python keyword, every built-in name,
every error message, every identifier in example code.

## Naming things in example code

Identifiers are English and readable: `hero`, `damage`, `cabin_name`,
`monsters_left`. Never Hebrew transliteration, never single letters except `i`
in a loop after lesson 8 has explained it.

Use the mythology: `zeus`, `riptide`, `drachmas`, `campers`. It costs nothing and
makes reading her own code more fun.

## Story continuity

- Lessons run in order and the story is continuous. Lesson N may refer to what
  happened in N-1.
- Recurring cast: **Chiron** (teacher), **Grover** (nervous friend, comic
  relief), **Annabeth** (competent peer who asks good questions), the **Oracle**
  (delivers each act's prophecy).
- Her name and cabin from the save file appear in the text — use `LC.hero()` and
  `LC.cabin()` rather than hard-coding "Percy".
- **Keep it book-canon-flavoured, not book-canon-bound.** Invent freely; do not
  contradict the obvious (Poseidon is the sea, Camp Half-Blood is on Long
  Island).
- Age-appropriate throughout: peril and monsters yes, gore and death no.
