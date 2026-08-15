# Lesson 03 — Speaking with Chiron · שיחה עם כירון

> **Act I — Camp Half-Blood** · Stop 3 of 20
> Follows the reference structure in `spec/lessons/lesson-01.md`.
> Schema: `spec/04-lesson-template.md`.

| | |
| --- | --- |
| **id** | `03` |
| **slug** | `speaking-with-chiron` |
| **minutes** | 28–35 |
| **concepts** | `input()`, `int()` / `float()` / `str()`, f-strings |
| **new vocabulary** | `input`, `int`, `float`, `str`, `f"…"` |
| **requires** | lessons 1–2 — `print()`, strings, comments, variables, `str`/`int`/`float`, `type()` |
| **item** | 🌈 קשת איריס / Iris's Rainbow |
| **XP** | 20 + 25 + 25 + 30 (training) + 55 (quest) + 30 (bonus) = **185** |
| **drachmas** | 5 + 6 + 6 + 8 + 14 = **39** 🪙 |

## Teaching goal

By the end her program can hold a two-way conversation: it asks, she answers, it
answers back using what she said. She knows that `input()` always hands back a
**string**, that turning that string into a number is a separate deliberate act,
and that an f-string is how a value gets woven into a sentence.

The emotional goal: *"it talked back."* This is the lesson where the program
stops being a scroll she wrote and starts being a thing she is having a
conversation with. It is the single biggest jump in Act I.

**The hardest idea is that `"12"` and `12` are different things** — lesson 2
planted it with `type()`, and lesson 3 is where it starts to cost her something.
`input()` is the reason the distinction is not academic: everything the user
types arrives as text, forever, in every language, and converting it is her job.

## Story beat

She finds Grover in the corner of the yard with a spray bottle, a golden drachma
and a rainbow, swearing quietly at the rainbow. Iris-messages are how demigods
call home, and his is not connecting. Chiron watches, unimpressed, and turns it
into a lesson: a program that only speaks is a speech. A program that asks is a
conversation. Then he mentions, far too casually, that the thing under the old
bridge asks questions too — and that it is very particular about numbers.

The Prophecy panel (5 lines, no code):

> את מוצאת את גרובר בפינת החצר, עם בקבוק מים ומטבע, מקלל חרש על קשת שלא עונה.
> "המים בסדר. המטבע בסדר. והיא בכל זאת לא עונה לי."
> כירון מרים גבה. "תוכנית שרק מדברת היא נאום. תוכנית ששואלת היא שיחה."
> "עד היום התוכניות שלך דיברו. היום הן ילמדו להקשיב."
> ואז, כאילו בדרך אגב: "אגב, הדבר שמתחת לגשר הישן גם שואל שאלות. כדאי שתתאמני."

Cast: Grover (the failing Iris-message, comic relief), Chiron (the lesson),
Annabeth in a `warn` callout with the `int(input(...))` inside-out reading. The
closing line plants the lesson 4 boss.

## Chiron Teaches — block by block

1. **prose** — Everything she has written so far runs from top to bottom without
   stopping and without caring who is watching. Today one command changes that:
   it stops the program in the middle, waits for a human, and continues with
   whatever the human typed.

2. **code (runnable)** — the first conversation, and it must run inside the first
   60 seconds of the page.
   ```python
   name = input("Who goes there? ")
   print(name)
   ```
   The prompt `Who goes there? ` appears in the in-page Iris-message panel; she
   types and presses enter; the program resumes and prints it back.
   Caption (he): *"התוכנית עצרה וחיכתה לך. זה מה ש-`input()` עושה."*

3. **prose** — Anatomy, after she has run it. `input("…")` does three things in
   order: it shows the text in the parentheses (the **prompt**), it waits, and it
   hands back what was typed. That handed-back value is like any other value —
   it needs a name to be kept, which is what the `=` on the left is doing. Name
   it well: `name`, `answer`, `days` — not `x`.

4. **callout · tip** — The prompt is a courtesy to a human, not a rule of Python.
   `input()` with empty parentheses works and waits with no question at all,
   which is a confusing experience for whoever is sitting there. End prompts with
   a space — `"Who goes there? "` — so the typed answer does not collide with the
   question mark.
   Title (he): *"תמיד לשאול שאלה"*.

5. **code (runnable)** — the twist that decides the rest of the lesson.
   ```python
   age = input("How old are you? ")
   print(age)
   print(type(age))
   ```
   With `12` typed:
   ```
   12
   <class 'str'>
   ```
   Caption (he): *"הקלדת מספר, ו-Python קיבל טקסט. `input()` תמיד מחזיר `str` —
   תמיד, בלי יוצא מן הכלל."* The `type()` from lesson 2 is exactly the tool that
   makes this visible, which is why lesson 2 came first.

6. **prose** — So there is a second step: **conversion**. `int(x)` makes a whole
   number out of it, `float(x)` makes a decimal number, `str(x)` goes back the
   other way. These are not commands that change the variable — they *produce a
   new value*, which is why the result usually needs a name of its own.

7. **code (runnable)** —
   ```python
   raw = input("How many drachmas? ")
   coins = int(raw)
   print(type(raw))
   print(type(coins))
   ```
   With `15` typed:
   ```
   <class 'str'>
   <class 'int'>
   ```
   Caption (he): *"אותו `15` על המסך, שני דברים שונים לגמרי בפנים."*

8. **error block** — the required error. Conversion of something that is not a
   number.
   ```python
   print(int("three"))
   ```
   Real error: `ValueError: invalid literal for int() with base 10: 'three'`
   Explanation (he): *"`int()` יודע להמיר טקסט שנראה כמו מספר שלם. `"three"` היא
   מילה, ולכן אין לו מה לעשות איתה והוא עוצר. `ValueError` תמיד אומר: הטיפוס
   נכון, הערך לא. שימי לב שהשגיאה מצטטת לך בדיוק מה קיבלה — `'three'` — וזה
   הדבר הראשון להסתכל עליו."*
   Add the sibling case in the same explanation: `int("12.5")` fails with the
   **same** message (`'12.5'`), because a dot is not part of a whole number.

9. **compare** — the fix for that sibling case.
   - **bad**: `print(int("12.5"))` → `ValueError: invalid literal for int() with base 10: '12.5'`
   - **good**: `print(float("12.5"))` → `12.5`
   Labels (he): *"מספר שלם לא סובל נקודה"* / *"`float` כן"*.

10. **prose** — Now the other half of the lesson. She can ask, and she can
    convert — but her output is still one value per line, like the registry
    scroll from yesterday. Time to put values inside a sentence.

11. **code (runnable)** — the f-string.
    ```python
    hero = "Annabeth"
    cabin = "Athena"
    print(f"{hero} of cabin {cabin}")
    ```
    Output: `Annabeth of cabin Athena`
    Caption (he): *"האות `f` לפני הגרשיים אומרת ל-Python: בתוך המחרוזת הזאת,
    מה שנמצא בתוך `{ }` הוא שם של משתנה — תחליף אותו בערך."*

12. **compare** — the sneakiest bug in the lesson, because **nothing goes wrong**.
    - **bad**: `print("{hero} of cabin {cabin}")` → prints `{hero} of cabin {cabin}`
    - **good**: `print(f"{hero} of cabin {cabin}")` → prints `Annabeth of cabin Athena`
    Labels (he): *"בלי `f` — הסוגריים נשארים על המסך"* / *"עם `f` — הערך נכנס
    פנימה"*. Say out loud that the bad version raises **no error whatsoever**;
    the only symptom is output that looks wrong. Errors are the loud bugs. This
    is a quiet one, and quiet ones are learned by recognising the symptom.

13. **callout · tip** — Anything can go inside the braces: a `str`, an `int`, a
    `float`, even `type(x)`. Python turns the value into text for her, so
    `str()` is rarely needed *inside* an f-string. `str()` earns its place when
    she is building a value rather than printing one.
    Title (he): *"מה מותר להכניס בין הסוגריים"*.

14. **code (runnable)** — everything together, the shape of every exercise below.
    ```python
    name = input("Name? ")
    summers = int(input("Summers at camp? "))
    print(f"{name} has survived {summers} summers.")
    ```
    With `Annabeth` and `5`: `Annabeth has survived 5 summers.`

15. **callout · warn** — Annabeth's aside on `int(input("…"))`: read it from the
    inside out. The inner `input(...)` runs first and produces text; that text is
    handed straight to `int(...)`, which produces a number; the number goes into
    the name. Two steps written on one line. If the typed answer is not a number,
    the `ValueError` comes from `int`, not from `input` — `input` was perfectly
    happy. Writing it as two lines (`raw = input(...)` then `days = int(raw)`) is
    equally correct and easier to debug; both are used in this lesson on purpose.
    Title (he): *"לקרוא מבפנים החוצה"*.

16. **callout · myth** — Iris was the messenger of the gods, and her road was the
    rainbow. A drachma into the mist and you can speak to anyone, anywhere. A
    program with `input()` in it has its own rainbow: it can reach out of the
    screen and get an answer back.
    Title (he): *"הקשת של איריס"*.

## Try It (ungraded)

Free-play editor. Nothing is checked, nothing is scored.

```python
name = input("What should I call you? ")
colour = input("Favourite colour? ")
print(f"{name}, the {colour} one.")
print(f"That answer was a {type(colour)}.")
```

Intro (he): *"שאלי אותה מה שבא לך. הוסיפי שאלה שלישית, נסי לשים משתנה פעמיים
באותה שורה, ותסתכלי מה `type()` אומר על תשובה שהקלדת בה מספר. שום דבר פה לא
נבדק."*
(en): *"Ask it whatever you like. Add a third question, try putting the same
variable twice in one line, and see what `type()` says about an answer where you
typed a number. Nothing here is graded."*

## Training exercises

### e1 — מי שם? / Who goes there? · 20 XP, 5 🪙

**brief (he)**: *"השומר בשער שואל מי אתם. קלטי שם, והדפיסי בדיוק את השורה
`Welcome to Camp Half-Blood, <השם>.` — עם נקודה בסוף."*
**brief (en)**: *"The guard at the gate wants a name. Read one, then print
exactly `Welcome to Camp Half-Blood, <the name>.` — with the full stop."*

**starter**
```python
name = input("Who goes there? ")
# print the welcome line here
```

**solution**
```python
name = input("Who goes there? ")
print(f"Welcome to Camp Half-Blood, {name}.")
```

**check**
```js
check: { kind: "cases", cases: [
  { stdin: ["Annabeth"], expect: "Welcome to Camp Half-Blood, Annabeth." },
  { stdin: ["Grover"],   expect: "Welcome to Camp Half-Blood, Grover." }
] }
```

Two cases, so a hard-coded `print("Welcome to Camp Half-Blood, Annabeth.")`
cannot pass. That is the whole point of `cases` and it is worth saying to her in
the failure message: *"התוכנית צריכה לעבוד לכל שם, לא רק לאחד."*

**hints**
1. *nudge* (he): *"השם כבר נמצא בתוך `name`. השאלה היחידה היא איך לשתול אותו
   בתוך המשפט במקום להדפיס אותו לבד."*
   (en): *"The name is already inside `name`. The only question is how to plant
   it inside the sentence instead of printing it on its own."*
2. *tool* (he): *"f-string. האות `f` לפני הגרשיים, ושם המשתנה בתוך `{ }` במקום
   שבו הוא צריך להופיע."*
   (en): *"An f-string. An `f` before the quotes, and the variable name inside
   `{ }` where it belongs in the sentence."*
3. *walkthrough* (he): *"קחי את המשפט המלא, שימי אותו בגרשיים, שימי `f` לפני
   הגרשיים הפותחות, והחליפי את מקום השם ב-`{name}`. שימי לב שהנקודה נשארת אחרי
   הסוגר המסולסל, בתוך המחרוזת."* → solution unlocks.

### e2 — שורת המרשם / The registry line · 25 XP, 6 🪙

**brief (he)**: *"שתי שאלות, בסדר הזה: קודם שם, אחר כך צריף. שורת פלט אחת:
`<שם> of cabin <צריף>`."*
**brief (en)**: *"Two questions, in this order: name first, then cabin. One line
of output: `<name> of cabin <cabin>`."*

**starter**
```python
# two questions, one line of output
```

**solution**
```python
name = input("Name? ")
cabin = input("Cabin? ")
print(f"{name} of cabin {cabin}")
```

**check**
```js
check: { kind: "cases", cases: [
  { stdin: ["Silena", "Aphrodite"],     expect: "Silena of cabin Aphrodite" },
  { stdin: ["Beckendorf", "Hephaestus"], expect: "Beckendorf of cabin Hephaestus" }
] }
```

Teaches the thing that surprises everyone the first time: **answers are consumed
in the order the `input()` calls run.** The first `input()` gets the first
answer. Swap the two `input` lines and both cases fail with the words reversed —
worth mentioning in the failure text.

**hints**
1. *nudge* (he): *"שתי שאלות אומרות שתי שורות `input`, וכל אחת צריכה שם משלה.
   מה יקרה אם שתיהן ישמרו לאותו שם?"*
   (en): *"Two questions means two `input` lines, and each needs its own name.
   What would happen if both stored into the same name?"*
2. *tool* (he): *"`name = input("Name? ")` בשורה אחת, `cabin = input("Cabin? ")`
   בשורה שנייה, ואז `print` אחד עם f-string שמכיל את שניהם."*
   (en): *"`name = input("Name? ")` on one line, `cabin = input("Cabin? ")` on
   the next, then one `print` with an f-string holding both."*
3. *walkthrough* (he): *"שלוש שורות בסך הכול. הראשונה קולטת את השם ושומרת
   ב-`name`. השנייה קולטת את הצריף ושומרת ב-`cabin`. השלישית:
   `print(f"{name} of cabin {cabin}")` — שני משתנים באותה מחרוזת, עם המילים
   `of cabin` ביניהם."* → solution unlocks.

### e3 — אותו מראה, טיפוס אחר / Same look, different type · 25 XP, 6 🪙

**brief (he)**: *"שאלי כמה דרכמות יש לה. שמרי את התשובה כמו שהיא ב-`raw`, וגם
גרסה מומרת למספר שלם ב-`coins`. הדפיסי ארבע שורות: `Text: <הערך>`,
`Number: <הערך>`, ואז הטיפוס של `raw` והטיפוס של `coins`."*
**brief (en)**: *"Ask how many drachmas she has. Keep the answer as it arrived in
`raw`, and a version converted to a whole number in `coins`. Print four lines:
`Text: <value>`, `Number: <value>`, then the type of `raw` and the type of
`coins`."*

**starter**
```python
raw = input("How many drachmas? ")
# convert it, then print the four lines
```

**solution**
```python
raw = input("How many drachmas? ")
coins = int(raw)
print(f"Text: {raw}")
print(f"Number: {coins}")
print(type(raw))
print(type(coins))
```

**check**
```js
check: { kind: "cases", cases: [
  { stdin: ["15"], expect: "Text: 15\nNumber: 15\n<class 'str'>\n<class 'int'>" },
  { stdin: ["7"],  expect: "Text: 7\nNumber: 7\n<class 'str'>\n<class 'int'>" }
] }
```

This is the intellectual centre of the lesson. The first two output lines are
**identical on screen**, and the last two prove they are not the same thing at
all. Nothing else in Act I makes the point this cleanly, and lesson 4 will
punish her for forgetting it.

**hints**
1. *nudge* (he): *"שתי השורות הראשונות בפלט נראות אותו דבר. אז למה בכלל צריך שני
   משתנים?"*
   (en): *"The first two output lines look identical. So why two variables at
   all?"*
2. *tool* (he): *"`int(raw)` לא משנה את `raw` — הוא מייצר ערך חדש, ולכן צריך
   לשמור אותו בשם חדש: `coins = int(raw)`. אחר כך `type()` על כל אחד מהם."*
   (en): *"`int(raw)` does not change `raw` — it produces a new value, so it
   needs a new name: `coins = int(raw)`. Then `type()` on each of them."*
3. *walkthrough* (he): *"אחרי שורת ה-`input` הוסיפי `coins = int(raw)`. אחר כך
   ארבע שורות `print`: שתיים עם f-string — `f"Text: {raw}"` ו-`f"Number: {coins}"`
   — ואז `print(type(raw))` ו-`print(type(coins))` בלי f-string, בדיוק כמו
   בשיעור הקודם."* → solution unlocks.

### e4 — כרטיס החניכה / The camper card · 30 XP, 8 🪙

**brief (he)**: *"שלוש שאלות: שם, כמה קיצים במחנה (מספר שלם), וגובה במטרים (מספר
עם נקודה). המרשם דורש שהמספרים יהיו באמת מספרים, ולכן השורה האחרונה מאשרת את
הטיפוסים. ארבע שורות פלט:"*

```
Camper: <name>
Summers: <summers>
Height: <height>
Types: <type of summers> <type of height>
```

**brief (en)**: *"Three questions: name, how many summers at camp (a whole
number), and height in metres (a number with a dot). The registry demands that
the numbers really be numbers, so the last line certifies the types. Four lines
of output."*

**starter**
```python
name = input("Name? ")
# two more questions — and they must not stay strings
```

**solution**
```python
name = input("Name? ")
summers = int(input("Summers at camp? "))
height = float(input("Height in metres? "))
print(f"Camper: {name}")
print(f"Summers: {summers}")
print(f"Height: {height}")
print(f"Types: {type(summers)} {type(height)}")
```

**check**
```js
check: { kind: "cases", cases: [
  { stdin: ["Annabeth", "3", "1.62"],
    expect: "Camper: Annabeth\nSummers: 3\nHeight: 1.62\nTypes: <class 'int'> <class 'float'>" },
  { stdin: ["Grover", "12", "1.5"],
    expect: "Camper: Grover\nSummers: 12\nHeight: 1.5\nTypes: <class 'int'> <class 'float'>" }
] }
```

The fourth line is not decoration — it is the only thing that forces the
conversion. Without it, leaving `summers` as a string would produce identical
output and she would learn nothing. Say that to her in the brief: *"המרשם לא סומך
עלייך על המילה, הוא רוצה לראות טיפוס."*

Also note: **two different values inside one f-string, separated by a space**,
which she has not done before, and `float("1.5")` prints as `1.5` (not `1.50`) —
floats print themselves shortest-first. Mention it in the failure text if the
output differs only in trailing zeros.

**hints**
1. *nudge* (he): *"שלוש תשובות מגיעות מ-`input`, וכולן מגיעות כ-`str`. שתיים מהן
   לא אמורות להישאר ככה. איזו הופכת ל-`int` ואיזו ל-`float`?"*
   (en): *"Three answers arrive from `input`, and all of them arrive as `str`.
   Two of them should not stay that way. Which becomes an `int` and which a
   `float`?"*
2. *tool* (he): *"אפשר לעטוף ישירות: `summers = int(input("Summers at camp? "))`.
   לגובה, שיש בו נקודה, צריך `float(...)` — `int()` יזרוק `ValueError` על
   `1.62`."*
   (en): *"You can wrap directly: `summers = int(input("Summers at camp? "))`.
   Height has a dot, so it needs `float(...)` — `int()` would raise a
   `ValueError` on `1.62`."*
3. *walkthrough* (he): *"שלוש שורות קליטה: `name` נשאר טקסט, `summers` נעטף
   ב-`int()`, `height` נעטף ב-`float()`. אחר כך ארבע שורות `print` עם f-string.
   השורה האחרונה מכניסה שני דברים לאותה מחרוזת:
   `f"Types: {type(summers)} {type(height)}"` — עם רווח אחד ביניהם."*
   → solution unlocks.

## Quest — "הודעת איריס / The Iris-Message" · 55 XP, 14 🪙

**brief (he)**: *"גרובר ויתר. עכשיו תורך. כתבי תוכנית ששולחת הודעת איריס הביתה:
ארבע שאלות בסדר הזה — השם שלך, למי ההודעה, כמה ימים את במחנה (מספר שלם), ומילה
אחת שמתארת איך את מרגישה. אחר כך הדפיסי את ההודעה בדיוק בפורמט הזה, שש שורות:"*

```
=== IRIS MESSAGE ===
To: <recipient>
From: <sender>
Day <days> at Camp Half-Blood.
I feel: <feeling>
Rainbow, carry it.
```

**brief (en)**: *"Grover gave up. Your turn. Write a program that sends an
Iris-message home: four questions in this order — your name, who it goes to, how
many days you have been at camp (a whole number), and one word for how you feel.
Then print the message in exactly this format, six lines."*

Note the trap in the ordering, and say it out loud in the brief: **the questions
are asked sender-first, and the message prints recipient-first.** She has to keep
the two orders apart, which is a real, small, honest piece of thinking.

**solution**
```python
# Iris-message home
sender = input("Your name? ")
recipient = input("Send to? ")
days = int(input("Days at camp? "))
feeling = input("One word for how you feel? ")

print("=== IRIS MESSAGE ===")
print(f"To: {recipient}")
print(f"From: {sender}")
print(f"Day {days} at Camp Half-Blood.")
print(f"I feel: {feeling}")
print("Rainbow, carry it.")
```

**check**
```js
check: [
  { kind: "cases", cases: [
    { stdin: ["Percy", "Sally", "6", "alive"],
      expect: "=== IRIS MESSAGE ===\nTo: Sally\nFrom: Percy\nDay 6 at Camp Half-Blood.\nI feel: alive\nRainbow, carry it." },
    { stdin: ["Annabeth", "Malcolm", "41", "focused"],
      expect: "=== IRIS MESSAGE ===\nTo: Malcolm\nFrom: Annabeth\nDay 41 at Camp Half-Blood.\nI feel: focused\nRainbow, carry it." },
    { stdin: ["Grover", "Juniper", "2", "hungry"],
      expect: "=== IRIS MESSAGE ===\nTo: Juniper\nFrom: Grover\nDay 2 at Camp Half-Blood.\nI feel: hungry\nRainbow, carry it." }
  ] },
  { kind: "source", mustInclude: ["int("],
    message: { he: "מספר הימים חייב להיות מספר שלם — עטפי את ה-input ב-int()",
               en: "The day count has to be a whole number — wrap the input in int()" } }
]
```

The `source` check exists because the output alone cannot tell whether `days` was
converted: `f"Day {days}"` prints `6` either way. Lesson 4 immediately does
arithmetic on exactly this kind of value, so the habit has to be built here. The
`message` is mandatory for a `source` check and it must explain the requirement,
never merely state that it failed.

Why three cases rather than two: the middle one uses a two-digit day count, which
catches an implementation that stumbles on multi-character input, and the names
are deliberately unequal lengths so nothing lines up by accident.

**hints**
1. *nudge* (he): *"שימי לב לסדר. באיזה סדר את שואלת, ובאיזה סדר ההודעה מודפסת?
   אלה לא אותו סדר, וזה בכוונה."*
   (en): *"Watch the order. What order do you ask in, and what order does the
   message print in? They are not the same, and that is on purpose."*
2. *tool* (he): *"ארבע שורות `input` עם ארבעה שמות שונים, ואחת מהן עטופה
   ב-`int()`. אחר כך שש שורות `print`: שתיים מהן טקסט קבוע בלי `f`, וארבע מהן
   f-strings."*
   (en): *"Four `input` lines with four different names, one of them wrapped in
   `int()`. Then six `print` lines: two are fixed text with no `f`, four are
   f-strings."*
3. *walkthrough* (he): *"קלטי לפי הסדר: `sender`, `recipient`, `days` (עטוף
   ב-`int()`), `feeling`. אחר כך הדפיסי: השורה הראשונה והאחרונה הן טקסט קבוע —
   `print("=== IRIS MESSAGE ===")` ו-`print("Rainbow, carry it.")`, בלי `f`,
   כי אין בהן שום משתנה. באמצע ארבע f-strings, והראשונה מהן היא `recipient`
   דווקא, לא `sender`."* → solution unlocks.

## Reward & Recap

**Item**: 🌈 **קשת איריס / Iris's Rainbow** —
(he) *"מטבע במים והקשת נפתחת. מהיום התוכניות שלך יכולות לשאול ולקבל תשובה."*
(en) *"A coin in the water and the rainbow opens. From today your programs can
ask a question and get an answer back."*

**Achievements possible here**
- *הודעת איריס / Iris-Message* — ran a program that asked her a question for the
  first time.
- *משנת צורה / Shapeshifter* — converted a value from `str` to a number and
  printed both types in one program (e3).
- *הכתובת נכונה / Right Address* — passed the quest with all three cases on the
  first submitted run.
- *עקשנית / Persistent* and *בלי רמזים / No Hints Needed* (global).

**Recap bullets**
- `input("שאלה ")` עוצר את התוכנית, מחכה, ומחזיר את מה שהוקלד
- מה ש-`input()` מחזיר הוא תמיד `str` — גם כשהקלדת מספר
- `int(x)` ו-`float(x)` מייצרים ערך חדש; שמרי אותו בשם משלו
- `int("12.5")` נכשל עם `ValueError` — לנקודה צריך `float`
- `f"…{name}…"` שותל ערך של משתנה בתוך משפט; בלי ה-`f` הסוגריים נשארים על המסך
- אפשר לכתוב `int(input("…"))` — קוראים את זה מבפנים החוצה

**Next teaser** (he): *"מתחת לגשר הישן מחכה משהו שסופר. מחר את לומדת חשבון —
ומחר יש קרב."*
(en): *"Something under the old bridge is counting. Tomorrow you learn
arithmetic — and tomorrow there is a fight."*

## Common mistakes to anticipate

| She does | She sees | Hint / callout must cover |
| --- | --- | --- |
| `print("{name} arrived")` — forgot the `f` | `{name} arrived` — **no error** | the quiet bug; recognise the symptom, look for the missing `f` |
| `int(input(...))` and types `abc` | `ValueError: invalid literal for int() with base 10: 'abc'` | the error names the exact value it choked on |
| `int("12.5")` | `ValueError: invalid literal for int() with base 10: '12.5'` | a whole number cannot hold a dot — use `float()` |
| `float("hi")` | `ValueError: could not convert string to float: 'hi'` | a different wording for the same idea |
| `coins = int(raw)` then expects `raw` to be a number too | `type(raw)` still `<class 'str'>` | conversion produces a new value, it does not edit the old one |
| `name = input` — forgot the parentheses | no error; prints something like `<built-in function input>` | without `()` she named the tool instead of using it |
| `Input("Name? ")` | `NameError: name 'Input' is not defined` | Python is case-sensitive |
| `f"Hello {name"` — missing closing brace | `SyntaxError: f-string: expecting '}'` | every `{` inside an f-string needs a `}` |
| `print("Day " + days)` after `days = int(...)` | `TypeError: can only concatenate str (not "int") to str` | `+` between text and a number has no meaning — that is what f-strings are for, and `+` gets its own lesson tomorrow |
| asks the questions in the wrong order in the quest | cases fail with the fields swapped | answers are consumed in the order the `input()` calls run |

**Skulpt fidelity note.** The two `ValueError` messages are the ones to rely on;
verify their exact wording with `node tools/verify-python.mjs` before shipping,
since the quoting of the offending value is what the explanation points at. The
f-string `SyntaxError` and the `TypeError` wording differ in Skulpt (it reports
`cannot concatenate 'str' and 'int' objects` for the latter). Show whatever the
engine actually produces — never a fabricated message — and let the Hebrew
explanation carry the teaching.

## Implementation notes

- **`input()` is asynchronous** (`01-architecture.md`). Every check in this
  lesson is `kind: "cases"` with queued `stdin`; the engine feeds answers in
  order and must resolve the `inputfun` promise per queued item.
- **The prompt does not go to stdout.** This is the load-bearing decision for
  every `expect` string on this page: the engine renders the prompt text in the
  in-page Iris panel and writes *nothing* to the output stream, so `expect`
  contains only what `print()` produced. CPython echoes the prompt; the browser
  UI does not, and that is the correct choice here because the prompt is already
  visible on screen. Record it in `engine.js` as a comment so nobody "fixes" it
  later and breaks lessons 3, 4, 7, 18 and 20 at once.
- **`cases` comparison uses the same `normalized` semantics** defined in
  lesson 2: trim each line, collapse runs of spaces within a line, drop leading
  and trailing blank lines, keep line breaks.
- **Running out of queued input**: if her program calls `input()` more times than
  the case supplies answers, the engine must fail the case with a friendly
  in-theme message (*"התוכנית שאלה יותר שאלות ממה שהיה בתסריט"*) rather than
  hanging on an unresolved promise. She will hit this the first time she adds a
  fifth question to the quest.
- **The Try It panel calls `input()` twice** — the free-play runner needs the
  same in-page prompt UI as the graded runner, not a simplified one.
- **Multi-character and multi-digit answers**: the quest deliberately includes
  `"41"` so a single-character input path fails loudly during development.
- **Do not use `+` anywhere in this lesson.** Operators are lesson 4. The whole
  reason f-strings arrive before arithmetic is so she never needs `"a" + b` to
  build a sentence — and never meets the `str`/`int` `TypeError` before she has
  the tools to reason about it.
- **RTL**: f-strings inside Hebrew prose are the worst case in the whole course
  for bidi rendering — `f"…{name}…"` contains quotes, braces and Latin text.
  Every inline mention needs `<bdi>`, and the code editor stays `dir="ltr"`.
