# Lesson 01 — The First Word · המילה הראשונה

> **Act I — Camp Half-Blood** · Stop 1 of 20
> **This file is the reference implementation of a lesson spec.** Lessons 2–20
> follow this exact structure. See `spec/04-lesson-template.md` for the schema.

| | |
| --- | --- |
| **id** | `01` |
| **slug** | `the-first-word` |
| **minutes** | 20–25 |
| **concepts** | `print()`, strings, quotes, comments, reading an error |
| **new vocabulary** | `print`, `"…"`, `#` |
| **requires** | nothing — this is her first ever program |
| **item** | 📿 חרוז המחנה / Camp Bead |
| **XP** | 20 + 20 + 25 + 30 (training) + 45 (quest) + 30 (bonus) = **170** |

## Teaching goal

By the end she can make the computer say anything she wants, she knows a string
is text in quotes, she knows `#` writes a note to herself — and, most
importantly, **she has seen an error, understood it, and fixed it.**

The real goal of lesson 1 is emotional, not technical: *"I typed something and
the machine obeyed, and when I broke it, that was fine."*

## Story beat

She arrives at Camp Half-Blood, out of breath, having just outrun something with
too many teeth. Chiron meets her at the Big House. He explains that demigods
command the world with words — and that the first word every hero learns is the
one that makes something appear out of nothing.

The Prophecy panel (3–6 lines, no code):

> הגעת אל המחנה. השערים נסגרים מאחורייך.
> כירון מביט בך ואומר: "לכל גיבורה יש מילה ראשונה."
> "המילה הזאת לא מזיזה הרים ולא מפצלת ימים."
> "היא עושה משהו מסוכן הרבה יותר — היא גורמת למכונה להקשיב לך."
> "בואי נלמד אותה."

Cast: Chiron. Grover appears in a callout, nervous about the quotes.

## Chiron Teaches — block by block

1. **prose** — Every program is instructions. The computer does exactly what you
   say, in order, top to bottom. It is not clever and it is not trying to guess.
   That is what makes it trustworthy.

2. **code (runnable)** — the first program. This must be the very first thing she
   runs, within 60 seconds of opening the page.
   ```python
   print("Hello, Olympus")
   ```
   Output: `Hello, Olympus`
   Caption: `print` is the word that makes the machine speak.

3. **prose** — Anatomy, named only *after* she has run it: the command `print`,
   the parentheses that hold what it should say, the quotes that mark **text**.
   Text in quotes is called a **string** (מחרוזת).

4. **code (runnable)** — several lines run in order, proving top-to-bottom.
   ```python
   print("Camp Half-Blood")
   print("Long Island, New York")
   print("Home.")
   ```

5. **callout · myth** — Why English? Python was written in English, so its words
   are English everywhere in the world. Her explanations are Hebrew; the
   language of the gods is not translated. (This reframes an obstacle as flavour
   — it matters, and it belongs in lesson 1.)

6. **error block** — the heart of the lesson. Deliberately broken:
   ```python
   print("Hello)
   ```
   Real error: `SyntaxError: EOL while scanning string literal on line 1`
   Explanation: a quote that opens must close. Python read to the end of the line
   still looking for the second `"`, and gave up. **This is not a disaster** —
   it is the computer telling you exactly where it got confused. Errors are
   normal; a hero who never sees an error never writes anything interesting.

7. **compare** — quotes matter.
   - bad: `print(Hello)` → `NameError: name 'Hello' is not defined` — without
     quotes Python thinks `Hello` is a *thing's name*, and it does not know it.
   - good: `print("Hello")` → with quotes it is text, and text is just text.

8. **prose + code** — comments. `#` means "the rest of this line is for humans".
   ```python
   # this line is a note to myself
   print("Chiron is watching")  # notes can sit after code too
   ```
   Frame it as her own notebook, not as bureaucracy.

9. **callout · tip** — Both `"…"` and `'…'` work. Pick one and be consistent.
   The course uses `"…"`.

## Try It (ungraded)

Free-play editor. Nothing is checked, nothing is scored.

```python
print("My name is ")
print("and I just arrived at camp")
```

Intro: *"התור שלך. שני את הטקסט לכל דבר שאת רוצה, ולחצי הרצה. שום דבר פה לא
נבדק — זה המגרש שלך."*

## Training exercises

### e1 — Your name at the gates · 20 XP, 5 🪙
Print her own name. Starter is `print("")` with the cursor between the quotes.
Deliberately almost free — the point is a success in the first minute.
- **check**: `{ kind: "source", mustInclude: ["print("], message: … }` plus
  `{ kind: "output", mode: "regex", expect: "\\S" }` — any non-empty output.
  *Cannot* check for a specific name; she chooses it.
- hints: 1) what goes between the quotes? 2) type between the two `"` marks
  3) `print("Annabeth")` — with her own name instead.

### e2 — Three lines to Chiron · 20 XP, 5 🪙
Print exactly three lines, in order:
```
I am a demigod
I am not afraid
(mostly)
```
- **check**: `{ kind: "output", mode: "normalized", expect: "I am a demigod\nI am not afraid\n(mostly)" }`
- Teaches: one `print` per line; order is preserved.
- hints: 1) how many `print` lines will you need? 2) one `print` per line of
  output 3) three `print` calls, one under the other.

### e3 — Fix the broken sword · 25 XP, 8 🪙
Given broken starter code, make it run:
```python
print("Riptide is a pen)
print(Its also a sword")
```
- **check**: `{ kind: "output", mode: "normalized", expect: "Riptide is a pen\nIts also a sword" }`
- **This is the most important exercise in the lesson.** She debugs before she
  has written anything substantial, so debugging is normal from day one.
- hints: 1) read the error — which line does it name? 2) every `"` needs a
  partner; count them on line 1 3) line 1 is missing a closing quote, line 2 is
  missing an opening one.

### e4 — A note to yourself · 30 XP, 8 🪙
Write a program with at least one comment and at least two `print` calls, where
the comment does **not** appear in the output.
- **check**: `{ kind: "source", mustInclude: ["#"], message: … }` +
  `{ kind: "output", mode: "regex", expect: "(?s)\\S+[\\s\\S]*\\S+" }`
- Teaches by demonstration that comments are invisible to the machine.
- hints: 1) what does `#` do to a line? 2) put a `#` line above your prints
  3) walk through a two-print program with a `#` note on top.

## Quest — "The Claiming" · 45 XP, 12 🪙

Print a five-line arrival announcement to be read aloud at the camp fire:

```
Campers, gather!
A new demigod has arrived.
She outran a monster to reach these gates.
Tonight, we find out who her parent is.
Welcome to Camp Half-Blood.
```

- **check**: `{ kind: "output", mode: "normalized", expect: <the five lines> }`
- Long enough to feel like real work, made only of what she now knows.
- hints: 1) same tool as before, just more of it 2) five lines of output means
  five `print` calls 3) shows the first two lines written out, she completes it.

## Reward & Recap

**Item**: 📿 **חרוז המחנה / Camp Bead** — "החרוז הראשון בשרשרת שלך. כל שיעור
מוסיף עוד אחד." (The bead is the visible spine of the whole course: one per
lesson, twenty by the end.)

**Achievements possible here**: *First Word* (ran any program), *Debugger*
(fixed e3 after seeing an error).

**Recap bullets**:
- `print()` מדפיס טקסט למסך
- טקסט בתוך גרשיים נקרא string
- כל `print` מתחיל שורה חדשה
- `#` כותב הערה שהמחשב מתעלם ממנה
- שגיאה היא הודעה, לא כישלון — היא אומרת לך איפה להסתכל

**Next teaser**: *"מחר תקבלי שרשרת. אבל קודם — איך המחשב זוכר דברים?"*

## Common mistakes to anticipate

| She does | She sees | Hint must cover |
| --- | --- | --- |
| `Print("hi")` | `NameError: name 'Print' is not defined` | Python is case-sensitive; `print` is lowercase |
| `print(Hello)` | `NameError: name 'Hello' is not defined` | text needs quotes |
| `print("hi"` | `SyntaxError` | every `(` needs a `)` |
| `print "hi"` | `SyntaxError` | Python 3 needs the parentheses |
| smart quotes `“hi”` | `SyntaxError` | pasted text can carry curly quotes — the editor should normalise these on paste |

That last row is a **real risk** on a Hebrew keyboard layout and from copy-paste:
`editor.js` should normalise `“ ” ‘ ’` to straight quotes on paste, and the
engine's error explainer should recognise the resulting error.

## Implementation notes

- Nothing here needs `input()`, so lesson 1 never blocks on a prompt.
- All output checks use `normalized` — trailing whitespace must never fail her.
- e1 and e4 cannot check exact output (she chooses the content), so they combine
  a `source` check with a loose `output` check. This is the pattern for every
  open-ended exercise in the course.
