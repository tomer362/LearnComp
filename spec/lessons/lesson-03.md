# Lesson 03 — Speaking with Chiron · שיחה עם כירון

> **Act I — Camp Half-Blood** · Stop 3 of 20
> Follows the reference structure in `spec/lessons/lesson-01.md`.
> Schema: `spec/04-lesson-template.md` · Battle contract: `spec/09-battle-game.md`.

| | |
| --- | --- |
| **id** | `03` |
| **slug** | `speaking-with-chiron` |
| **minutes** | 28–35 |
| **concepts** | `input()`, `int()` / `float()` / `str()`, f-strings |
| **new vocabulary** | `input`, `int`, `float`, `str`, `f"…"` |
| **requires** | lessons 1–2 — `print()`, strings, comments, variables, `str`/`int`/`float`, `type()`, `place_tower()` |
| **API available** | `place_tower`, `get_gold`, `tower_cost`, `camp_hp` (build script only) |
| **towers** | 🏹 archer only |
| **item** | 🌈 קשת איריס / Iris's Rainbow |
| **XP** | 20 + 25 + 25 + 30 (four battles) + 55 (great battle) + 30 (bonus) = **185** |
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

14. **code (runnable)** — everything together, the shape of every battle below.
    ```python
    name = input("Name? ")
    summers = int(input("Summers at camp? "))
    print(f"{name} has survived {summers} summers.")
    ```
    With `Annabeth` and `5`: `Annabeth has survived 5 summers.`

15. **prose + code (runnable)** — and now the version that matters on the field.
    A converted answer is a number like any other, so it can **be a coordinate**:
    ```python
    kind = "archer"
    row = int(input("Which row does the road run beside? "))
    place_tower(kind, 2, row)
    place_tower(kind, 5, row)
    ```
    Prose beside it (he): *"הצופים חוזרים עם מספר, והמספר הזה הוא המקום שבו את
    בונה. בלי ההמרה זה טקסט, ואת רוצה מספר — כי שורה היא מספר."*
    (en): *"The scouts come back with a number, and that number is where you
    build. Without the conversion it is text, and you want a number — because a
    row is a number."*
    And the other direction, the report she files afterwards, with values the
    game hands back:
    ```python
    print(f"Gold left: {get_gold()}")
    print(f"Lives: {camp_hp()}")
    ```
    Point out the ordering trap here, once, quietly: `get_gold()` answers for the
    moment it is called, so a report written above the `place_tower` lines reports
    the chest before anything was bought.

16. **callout · warn** — Annabeth's aside on `int(input("…"))`: read it from the
    inside out. The inner `input(...)` runs first and produces text; that text is
    handed straight to `int(...)`, which produces a number; the number goes into
    the name. Two steps written on one line. If the typed answer is not a number,
    the `ValueError` comes from `int`, not from `input` — `input` was perfectly
    happy. Writing it as two lines (`raw = input(...)` then `days = int(raw)`) is
    equally correct and easier to debug; both are used in this lesson on purpose —
    b2 wraps it on one line and b4 splits it in two, deliberately.
    Title (he): *"לקרוא מבפנים החוצה"*.

17. **callout · myth** — Iris was the messenger of the gods, and her road was the
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

number = input("Say a number: ")
print(f"As text: {number}")
print(f"As a number: {int(number)}")
```

Intro (he): *"שאלי אותה מה שבא לך. הוסיפי שאלה שלישית, נסי לשים משתנה פעמיים
באותה שורה, ותסתכלי מה `type()` אומר על תשובה שהקלדת בה מספר. ונסי גם להקליד
מילה בשאלה האחרונה ולראות איך נראית השגיאה — כאן זה בטוח. שום דבר פה לא נבדק."*
(en): *"Ask it whatever you like. Add a third question, try putting the same
variable twice in one line, and see what `type()` says about an answer where you
typed a number. Try typing a word into the last question too and see what the
error looks like — it is safe here. Nothing is graded."*

## The battles

Lesson 3 is played as battle levels (`spec/09-battle-game.md`). The mechanic is
the **pre-battle briefing**: before the wave starts, Chiron tells her something —
who has the watch, which row the road runs beside, tonight's watchword — and her
build script has to read that answer, convert it when it is a number, and use it.
Afterwards she files a **battle report** with the numbers the game itself hands
back. Both halves are lesson 3: `input()` in, f-string out.

Towers are still `allowed: ["archer"]`. Nothing about tower choice is new here;
what is new is where the numbers in her plan come from.

**What forces `input()` here — and why it is not a decoration.** A briefing answer
she can also type by hand is not a briefing. So the levels that read a *number*
are built on a map where the road runs along the **bottom row**, which leaves
exactly two rows within an archer's 2.6-cell range, and the level forbids those
two digits anywhere in her source:

```js
also: { kind: "source", mustInclude: ["input(", "int("], mustExclude: ["2", "3"] }
```

Rows 0 and 1 are more than 2.6 cells from the road and never fire, so there is no
fourth option to guess. The only way to get a tower onto a row that can shoot is
to take the number from the briefing. The `message` explains this in plain words —
the ban is a rule of the level, not a riddle.

Every level below was played against the real simulation before it was written
down: the stated solution wins with the camp untouched, an empty program loses, and
the near-misses under each level were run too.

### b1 — סיסמת המשמר / The Watchword · 20 XP, 5 🪙

**Why this mechanic**: the three towers are already written and they already win.
The only thing missing is the line that reads a name and says it back — so the
level is passed by `input()` plus an f-string and nothing else. Hard-coding the
answer is caught by the `source` rule; leaving out the `f` prints
`{name} has the watch.` on the screen, which is the quiet bug of the lesson
happening where she can see it.

**brief (he)**: *"ההגנה כבר בנויה — שלושה קשתים על שורה 3, וזה מספיק.\n\nמה שחסר
הוא מי מפקד. השורה הראשונה כבר שואלת. הוסיפי שורה שמדפיסה בדיוק:
`<השם> has the watch.` — עם הנקודה בסוף, ועם השם שהוקלד ולא עם שם שכתבת בעצמך."*

**brief (en)**: *"The defense is already built — three archers on row 3, and that is
enough.\n\nWhat is missing is who is commanding. The first line already asks. Add a
line that prints exactly `<the name> has the watch.` — with the full stop, and with
the name that was typed rather than one you wrote yourself."*

**level**
```js
map: { cols: 10, rows: 6, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4]] },
gold: 150, campHp: 3, seed: 1, allowed: ["archer"],
waves: [
  { delay: 0,  enemies: [ { kind: "satyr", count: 6, gap: 0.55 } ] },
  { delay: 10, enemies: [ { kind: "harpy", count: 6, gap: 0.7 } ] },
],
```

**starter**
```python
kind = "archer"
name = input("Who has the watch tonight? ")

place_tower(kind, 2, 3)
place_tower(kind, 5, 3)
place_tower(kind, 8, 3)
```

**solution**
```python
kind = "archer"
name = input("Who has the watch tonight? ")
print(f"{name} has the watch.")

place_tower(kind, 2, 3)
place_tower(kind, 5, 3)
place_tower(kind, 8, 3)
```

**check**
```js
check: {
  kind: "battle",
  stdin: ["Annabeth"],
  also: [
    { kind: "output", mode: "normalized", expect: "Annabeth has the watch." },
    { kind: "source", raw: true, mustInclude: ["input(", "f\""],
      message: { he: "השם צריך להגיע מ-`input()` ולהיכנס למשפט דרך f-string, לא להיות מוקלד בתוך המחרוזת",
                 en: "The name has to come from `input()` and go into the sentence through an f-string, not be typed inside the string" } },
  ],
}
```

**Verified**: the three starter towers clear all twelve monsters at 3/3, so the
battle is not the obstacle — the missing line is. `print("Annabeth has the watch.")`
wins the battle and fails the source rule. Dropping the `f` prints
`{name} has the watch.` and fails the output rule with the braces visible, which
is exactly the symptom she should learn to recognise. Deleting the towers loses.

**hints**
1. *nudge* (he): *"הריצי כמו שהוא. התוכנית שאלה אותך שאלה — מה קרה לתשובה שהקלדת? איפה היא עכשיו?"*
   (en): *"Run it as it is. The program asked you a question — what happened to the answer you typed? Where is it now?"*
2. *tool* (he): *"התשובה שמורה בתוך `name`. כדי לשתול אותה בתוך משפט צריך f-string: האות `f` לפני הגרשיים, ו-`{name}` במקום שבו השם צריך להופיע."*
   (en): *"The answer is inside `name`. To plant it in a sentence you need an f-string: an `f` before the quotes, and `{name}` where the name belongs."*
3. *walkthrough* (he): *"שורה אחת חדשה, מתחת לשורת ה-`input`: `print(f\"{name} has the watch.\")`. שימי לב לשלושה דברים — ה-`f` צמוד לגרשיים הפותחות, שם המשתנה בתוך `{ }` בלי גרשיים, והנקודה נשארת בתוך המחרוזת אחרי הסוגר המסולסל."*
   (en): *"One new line, under the `input` line: `print(f\"{name} has the watch.\")`. Three things to notice — the `f` touches the opening quote, the variable name sits inside `{ }` with no quotes, and the full stop stays inside the string after the closing brace."* → solution unlocks.

### b2 — השורה שכירון קורא / The Row Chiron Names · 25 XP, 6 🪙

**Why this mechanic**: the answer to the briefing **is a coordinate**. The road runs
along the bottom of the map, so only rows 3 and 2 can reach it, and the level
forbids the digits `2` and `3` in her code. There is no way to place a tower that
fires except by converting the briefing answer into a number and handing it to
`place_tower`.

**brief (he)**: *"כירון שולח צופים לפני כל משמרת, והם חוזרים עם מספר אחד: לאיזו
שורה צמודה הדרך הלילה.\n\nכתבי תוכנית שקולטת את המספר הזה, הופכת אותו למספר שלם,
ובונה ארבעה קשתים על השורה הזאת — בעמודות 1, 6, 7 ו-8.\n\n**חוק הלילה:** אסור
לכתוב בקוד את הספרות `2` או `3`. המספר מגיע מהצופים, לא ממך."*

**brief (en)**: *"Chiron sends scouts ahead of every watch, and they come back with
one number: which row the road runs beside tonight.\n\nWrite a program that reads
that number, turns it into a whole number, and builds four archers on that row — at
columns 1, 6, 7 and 8.\n\n**Tonight's rule:** you may not write the digits `2` or
`3` anywhere in your code. The number comes from the scouts, not from you."*

**level**
```js
map: { cols: 12, rows: 5, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4]] },
gold: 200, campHp: 3, seed: 2, allowed: ["archer"],
waves: [
  { delay: 0, enemies: [ { kind: "satyr", count: 5, gap: 0.7 } ] },
  { delay: 9, enemies: [ { kind: "hellhound", count: 4, gap: 1.3 } ] },
],
```
The map is only 5 rows tall on purpose: with the road on row 4, row 3 is one cell
away, row 2 is two cells away, and rows 1 and 0 are out of an archer's range
entirely. Two candidate rows, both digits banned.

**starter**
```python
kind = "archer"
row = input("Which row does the road run beside? ")
```

**solution**
```python
kind = "archer"
row = int(input("Which row does the road run beside? "))
place_tower(kind, 1, row)
place_tower(kind, 6, row)
place_tower(kind, 7, row)
place_tower(kind, 8, row)
```

**check**
```js
check: {
  kind: "battle",
  stdin: ["3"],
  also: { kind: "source", mustInclude: ["input(", "int("], mustExclude: ["2", "3"],
    message: { he: "השורה חייבת להגיע מהצופים: `int(input(...))`. אסור להקליד `2` או `3` בקוד",
               en: "The row has to come from the scouts: `int(input(...))`. The digits `2` and `3` may not appear in your code" } },
}
```

**Verified**: four archers on row 3 hold at 3/3 (row 2 also wins, and she cannot
type it). Three archers leak one. A hand-written `place_tower(kind, 1, 3)` is
rejected by the rule with a message that says why. Rows 0 and 1 place fine and
never fire — the engine reports "not one tower ever saw a monster".

**hints**
1. *nudge* (he): *"הריצי כמו שהוא. שום מגדל לא נבנה — מה חסר בין שורת השאלה לבין הדרך?"*
   (en): *"Run it as it is. No tower gets built — what is missing between the question and the road?"*
2. *tool* (he): *"מה ש-`input()` מחזיר הוא `str`, גם כשהוא נראה כמו מספר. עטפי אותו: `row = int(input(\"...\"))`, ואז השתמשי ב-`row` בתור השורה בכל `place_tower`."*
   (en): *"What `input()` hands back is a `str`, even when it looks like a number. Wrap it: `row = int(input(\"...\"))`, then use `row` as the row in every `place_tower`."*
3. *walkthrough* (he): *"שורה אחת קולטת וממירה: `row = int(input(\"Which row does the road run beside? \"))`. אחריה ארבע שורות `place_tower`, כולן עם `kind` בהתחלה ו-`row` בסוף, ורק העמודה משתנה: 1, 6, 7, 8. שימי לב שאף אחת מהשורות לא מכילה את הספרה של השורה — היא מגיעה מהתשובה."*
   (en): *"One line reads and converts: `row = int(input(\"Which row does the road run beside? \"))`. Then four `place_tower` lines, all with `kind` first and `row` last, only the column changing: 1, 6, 7, 8. Notice that none of the lines contains the row's digit — it arrives in the answer."* → solution unlocks.

### b3 — דוח המשמרת / The Watch Report · 25 XP, 6 🪙

**Why this mechanic**: the report is made of numbers only the game knows —
`get_gold()` **after** the towers are paid for, `tower_cost()`, `camp_hp()` — woven
into sentences with the commander's name. Five lines, four of them f-strings and
one a plain string, which is the distinction she has to make on purpose.

**brief (he)**: *"אחרי שההגנה עומדת, המשמרת מגישה דוח. בני ארבעה קשתים בעמודות
2, 3, 6 ו-9 על שורה 3, ואז הדפיסי חמש שורות בדיוק:"*

```
=== WATCH REPORT ===
Commander: <the name>
Gold left: <what is left in the chest>
Archer cost: <what one archer costs>
Lives: <how many lives the camp has>
```

*"את שלושת המספרים אל תכתבי בעצמך — שאלי את המשחק: `get_gold()`, `tower_cost()`
ו-`camp_hp()`. ושימי לב מתי את שואלת כמה זהב נשאר."*

**brief (en)**: *"Once the defense is standing, the watch files a report. Build four
archers at columns 2, 3, 6 and 9 on row 3, then print exactly five lines. Do not
write the three numbers yourself — ask the game: `get_gold()`, `tower_cost()` and
`camp_hp()`. And pay attention to **when** you ask how much gold is left."*

**level**
```js
map: { cols: 12, rows: 7, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4]] },
gold: 250, campHp: 3, seed: 3, allowed: ["archer"],
waves: [
  { delay: 0,  enemies: [ { kind: "satyr", count: 6, gap: 0.6 } ] },
  { delay: 11, enemies: [ { kind: "harpy", count: 6, gap: 0.7 } ] },
  { delay: 22, enemies: [ { kind: "hellhound", count: 3, gap: 1.4 } ] },
],
```

**starter**
```python
kind = "archer"
name = input("Who is reporting? ")

place_tower(kind, 2, 3)
place_tower(kind, 3, 3)
place_tower(kind, 6, 3)
place_tower(kind, 9, 3)

# the report goes here, after the towers are up
```

**solution**
```python
kind = "archer"
name = input("Who is reporting? ")

place_tower(kind, 2, 3)
place_tower(kind, 3, 3)
place_tower(kind, 6, 3)
place_tower(kind, 9, 3)

gold_left = get_gold()
cost = tower_cost(kind)
lives = camp_hp()

print("=== WATCH REPORT ===")
print(f"Commander: {name}")
print(f"Gold left: {gold_left}")
print(f"Archer cost: {cost}")
print(f"Lives: {lives}")
```

**check**
```js
check: {
  kind: "battle",
  stdin: ["Annabeth"],
  also: [
    { kind: "output", mode: "normalized",
      expect: "=== WATCH REPORT ===\nCommander: Annabeth\nGold left: 50\nArcher cost: 50\nLives: 3" },
    { kind: "source", mustInclude: ["input(", "get_gold(", "tower_cost(", "camp_hp("],
      message: { he: "שלושת המספרים בדוח צריכים לבוא מהמשחק — `get_gold()`, `tower_cost()` ו-`camp_hp()`",
                 en: "The three numbers in the report must come from the game — `get_gold()`, `tower_cost()` and `camp_hp()`" } },
  ],
}
```

**Verified**: four archers hold all fifteen monsters at 3/3; three leak one.
Filing the report *before* building prints `Gold left: 250` and fails — the gold
had not been spent yet. Both `50`s in the expected output are a coincidence worth
mentioning in the brief: 250 gold minus four archers is 50, and an archer costs 50.
It reads as a mistake and is not one.

**hints**
1. *nudge* (he): *"חמש שורות פלט. אחת מהן היא טקסט קבוע לגמרי ואין בה שום ערך משתנה — איזו?"*
   (en): *"Five lines of output. One of them is fixed text with no value in it at all — which one?"*
2. *tool* (he): *"`get_gold()` מחזיר כמה זהב נשאר **ברגע שקראת לו**, `tower_cost(\"archer\")` מחזיר 50, ו-`camp_hp()` מחזיר את מספר החיים. שמרי כל אחד במשתנה, ואז שתלי אותם ב-f-strings."*
   (en): *"`get_gold()` returns what is left **at the moment you call it**, `tower_cost(\"archer\")` returns 50, and `camp_hp()` returns the number of lives. Keep each in a variable, then plant them in f-strings."*
3. *walkthrough* (he): *"אחרי ארבע שורות ה-`place_tower`, שלוש שורות שמירה: `gold_left = get_gold()`, `cost = tower_cost(kind)`, `lives = camp_hp()`. אחר כך חמש שורות `print`: הראשונה `print(\"=== WATCH REPORT ===\")` בלי `f` כי אין בה משתנה, וארבע אחריה עם `f` ועם `{ }` סביב שם המשתנה. אם `Gold left` יוצא 250, שאלת לפני שקנית."*
   (en): *"After the four `place_tower` lines, three lines that keep the numbers: `gold_left = get_gold()`, `cost = tower_cost(kind)`, `lives = camp_hp()`. Then five `print` lines: the first is `print(\"=== WATCH REPORT ===\")` with no `f` because it holds no variable, and four after it with `f` and `{ }` around the names. If `Gold left` comes out as 250, you asked before you spent."* → solution unlocks.

### b4 — אותה תשובה, שני טיפוסים / Same Answer, Two Types · 30 XP, 8 🪙

**Why this mechanic**: the intellectual centre of the lesson, and now it costs
something. She keeps the scouts' answer twice — once as it arrived and once
converted — prints both (they look identical) and then prints their two types
(they are not). The converted one is what the towers are built on.

**brief (he)**: *"הצופים חוזרים שוב עם מספר שורה. הפעם המשמרת רוצה לראות את התשובה
פעמיים: כמו שהיא הגיעה, ואחרי ההמרה.\n\nשמרי את התשובה הגולמית ב-`raw` ואת הגרסה
המומרת ב-`row`. הדפיסי ארבע שורות:"*

```
Chiron said: <raw>
Which is row <row>
<the type of raw>
<the type of row>
```

*"ואז בני חמישה קשתים על `row`, בעמודות 1, 6, 7, 8 ו-9. **חוק הלילה נשאר:** אסור
לכתוב `2` או `3` בקוד."*

**brief (en)**: *"The scouts come back with a row number again. This time the watch
wants to see the answer twice: as it arrived, and after conversion.\n\nKeep the raw
answer in `raw` and the converted one in `row`. Print four lines, then build five
archers on `row`, at columns 1, 6, 7, 8 and 9. **Tonight's rule stands:** the digits
`2` and `3` may not appear in your code."*

**level**
```js
map: { cols: 12, rows: 5, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4]] },
gold: 250, campHp: 3, seed: 4, allowed: ["archer"],
waves: [
  { delay: 0,  enemies: [ { kind: "satyr", count: 6, gap: 0.6 } ] },
  { delay: 10, enemies: [ { kind: "harpy", count: 6, gap: 0.7 } ] },
  { delay: 20, enemies: [ { kind: "hellhound", count: 5, gap: 1.1 } ] },
],
```

**starter**
```python
kind = "archer"
raw = input("Which row? ")
# raw is text. make a number out of it, then build.
```

**solution**
```python
kind = "archer"
raw = input("Which row? ")
row = int(raw)

print(f"Chiron said: {raw}")
print(f"Which is row {row}")
print(type(raw))
print(type(row))

place_tower(kind, 1, row)
place_tower(kind, 6, row)
place_tower(kind, 7, row)
place_tower(kind, 8, row)
place_tower(kind, 9, row)
```

**check**
```js
check: {
  kind: "battle",
  stdin: ["3"],
  also: [
    { kind: "output", mode: "normalized",
      expect: "Chiron said: 3\nWhich is row 3\n<class 'str'>\n<class 'int'>" },
    { kind: "source", mustInclude: ["input(", "int("], mustExclude: ["2", "3"],
      message: { he: "השורה מגיעה מהצופים: שמרי את הגולמי ב-`raw`, את המומר ב-`row`, ואל תקלידי `2` או `3`",
                 en: "The row comes from the scouts: keep the raw answer in `raw`, the converted one in `row`, and do not type `2` or `3`" } },
  ],
}
```

**Verified**: five archers on row 3 hold seventeen monsters at 3/3; four leak one.
The two middle output lines are identical on screen and the two type lines prove
they are different values — which is the whole point, and the same shape lesson 4
will punish her for forgetting.

**hints**
1. *nudge* (he): *"שתי שורות הפלט הראשונות ייראו בדיוק אותו דבר. אז למה בכלל צריך שני משתנים?"*
   (en): *"The first two output lines will look exactly the same. So why two variables at all?"*
2. *tool* (he): *"`int(raw)` לא משנה את `raw` — הוא מייצר ערך חדש, ולכן הוא צריך שם משלו: `row = int(raw)`. אחר כך `type(raw)` ו-`type(row)` מראים את ההבדל."*
   (en): *"`int(raw)` does not change `raw` — it produces a new value, so it needs a name of its own: `row = int(raw)`. Then `type(raw)` and `type(row)` show the difference."*
3. *walkthrough* (he): *"שורה שנייה: `row = int(raw)`. אחריה שתי שורות f-string — `f\"Chiron said: {raw}\"` ו-`f\"Which is row {row}\"` — ואז שתי שורות בלי f-string: `print(type(raw))` ו-`print(type(row))`. בסוף חמישה `place_tower`, כולם עם `row` (המומר) בתור השורה. `place_tower` היה בולע גם את הטקסט, אבל מספר שורה הוא מספר, וככה גם המשמרת רואה את זה."*
   (en): *"Second line: `row = int(raw)`. Then two f-strings — `f\"Chiron said: {raw}\"` and `f\"Which is row {row}\"` — then two lines with no f-string: `print(type(raw))` and `print(type(row))`. Finally five `place_tower` calls, all using `row`, the converted one. `place_tower` would have swallowed the text too, but a row number is a number, and the watch wants to see that."* → solution unlocks.

## The great battle — "פקודת משמר הלילה / The Night Watch Order" · 55 XP, 14 🪙

**Why this mechanic**: everything at once, on the biggest map so far. Three
briefing questions in one order, a dispatch printed in a **different** order, one
of the answers converted to a number and used as a coordinate, two more numbers
read out of the game, and six towers of budget. The order trap is the honest piece
of thinking: answers are consumed in the order the `input()` calls run, and the
dispatch is not written in that order.

**brief (he)**: *"הלילה האחרון לפני שאת יורדת אל הגשר.\n\nכירון שואל שלוש שאלות,
בסדר הזה: מי מפקד, לאיזו שורה צמודה הדרך, ומה סיסמת הלילה. ואז מגיעים עשרים
ושלושה — סאטירים, הרפיות, וכלבי גיהינום בסוף.\n\n320 זהב, קשת ב-50: שישה מגדלים.
בני אותם על השורה שכירון נקב, בעמודות 1, 3, 6, 8, 11 ו-13, ואז הגישי את הפקודה
בדיוק בפורמט הזה — שימי לב, הסיסמה נכתבת ראשונה והמפקדת אחרונה:"*

```
=== NIGHT WATCH ===
Watchword: <word>
Wall row: <row>
Commander: <name>
Gold left: <get_gold()>
Lives: <camp_hp()>
```

*"**חוק הלילה:** אסור לכתוב בקוד את הספרות `4` או `5`."*

**brief (en)**: *"The last night before you walk down to the bridge.\n\nChiron asks
three questions, in this order: who is commanding, which row the road runs beside,
and tonight's watchword. Then twenty-three of them arrive — satyrs, harpies, and
hellhounds at the end.\n\n320 gold, an archer at 50: six towers. Build them on the
row Chiron named, at columns 1, 3, 6, 8, 11 and 13, then file the order in exactly
this format — note that the watchword is written first and the commander last.
**Tonight's rule:** the digits `4` and `5` may not appear in your code."*

**level**
```js
map: {
  cols: 14, rows: 7,
  path: [[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6],[12,6],[13,6]],
},
gold: 320, campHp: 3, seed: 7, allowed: ["archer"],
waves: [
  { delay: 0,  enemies: [ { kind: "satyr", count: 8, gap: 0.5 } ] },
  { delay: 12, enemies: [ { kind: "harpy", count: 8, gap: 0.6 } ] },
  { delay: 26, enemies: [ { kind: "hellhound", count: 7, gap: 1.0 } ] },
],
```
Seven rows, road on row 6: row 5 is one cell from it, row 4 is two, and rows 3 and
above are out of range. The two live rows are `5` and `4`, and both digits are
banned — so the wall row can only come from the briefing.

**starter**
```python
# The Night Watch Order
kind = "archer"
commander = input("Who has the watch? ")
```

**solution**
```python
# The Night Watch Order
kind = "archer"
commander = input("Who has the watch? ")
wall = int(input("Which row do we hold? "))
word = input("Watchword? ")

place_tower(kind, 1, wall)
place_tower(kind, 3, wall)
place_tower(kind, 6, wall)
place_tower(kind, 8, wall)
place_tower(kind, 11, wall)
place_tower(kind, 13, wall)

print("=== NIGHT WATCH ===")
print(f"Watchword: {word}")
print(f"Wall row: {wall}")
print(f"Commander: {commander}")
print(f"Gold left: {get_gold()}")
print(f"Lives: {camp_hp()}")
```

**check**
```js
check: {
  kind: "battle",
  stdin: ["Annabeth", "5", "Olympus"],
  also: [
    { kind: "output", mode: "normalized",
      expect: "=== NIGHT WATCH ===\nWatchword: Olympus\nWall row: 5\nCommander: Annabeth\nGold left: 20\nLives: 3" },
    { kind: "source", mustInclude: ["input(", "int("], mustExclude: ["4", "5"],
      message: { he: "שלוש שאלות, ושורת הקיר מגיעה מהתשובה השנייה דרך `int()`. אסור להקליד `4` או `5`",
                 en: "Three questions, and the wall row comes from the second answer through `int()`. The digits `4` and `5` may not be typed" } },
  ],
}
```

**Verified**: six archers on row 5 finish all 23 monsters at 3/3 with 20 gold
unspent; five archers leak one. A tighter cluster of six also wins, so the columns
in the brief are a good plan rather than the only plan. Asking the three questions
in the wrong order swaps the watchword and the commander in the dispatch and fails
the output rule with both fields visibly exchanged, which is a readable failure.

**hints**
1. *nudge* (he): *"שימי לב לשני סדרים שונים: הסדר שבו את **שואלת**, והסדר שבו הפקודה **מודפסת**. הם לא אותו דבר, וזה בכוונה."*
   (en): *"Watch two different orders: the order you **ask** in, and the order the dispatch **prints** in. They are not the same, and that is on purpose."*
2. *tool* (he): *"שלוש שורות `input` עם שלושה שמות שונים, ורק האמצעית עטופה ב-`int()` כי רק היא מספר. אחר כך שישה `place_tower` שכולם מקבלים את אותו שם של שורה, ובסוף שש שורות `print` — הראשונה בלי `f`, החמש האחרות איתו."*
   (en): *"Three `input` lines with three different names, and only the middle one wrapped in `int()` because only it is a number. Then six `place_tower` calls all receiving that same row name, and finally six `print` lines — the first without `f`, the other five with it."*
3. *walkthrough* (he): *"קלטי לפי הסדר: `commander`, אחר כך `wall = int(input(...))`, אחר כך `word`. בני שישה מגדלים בעמודות 1, 3, 6, 8, 11, 13, כולם עם `wall` בתור השורה — 300 מתוך 320. ואז הפקודה: `print(\"=== NIGHT WATCH ===\")`, ואחריה `Watchword`, `Wall row`, `Commander`, ורק בסוף שתי השורות שמדברות עם המשחק: `f\"Gold left: {get_gold()}\"` ו-`f\"Lives: {camp_hp()}\"`. את הזהב שואלים אחרי הבנייה, אחרת יופיע 320."*
   (en): *"Read in order: `commander`, then `wall = int(input(...))`, then `word`. Build six towers at columns 1, 3, 6, 8, 11, 13, all with `wall` as the row — 300 of your 320. Then the order: `print(\"=== NIGHT WATCH ===\")`, then `Watchword`, `Wall row`, `Commander`, and only at the end the two lines that talk to the game: `f\"Gold left: {get_gold()}\"` and `f\"Lives: {camp_hp()}\"`. Ask for the gold after building, or it will say 320."* → solution unlocks.

## Reward & Recap

**Item**: 🌈 **קשת איריס / Iris's Rainbow** —
(he) *"מטבע במים והקשת נפתחת. מהיום התוכניות שלך יכולות לשאול ולקבל תשובה."*
(en) *"A coin in the water and the rainbow opens. From today your programs can
ask a question and get an answer back."*

**Achievements possible here**
- *הודעת איריס / Iris-Message* — ran a program that asked her a question for the
  first time.
- *משנת צורה / Shapeshifter* — converted a value from `str` to a number and
  printed both types in one battle (b4).
- *הכתובת נכונה / Right Address* — won the great battle on the first submitted
  run, with the dispatch correct.
- *עקשנית / Persistent* and *בלי רמזים / No Hints Needed* (global).

**Recap bullets**
- `input("שאלה ")` עוצר את התוכנית, מחכה, ומחזיר את מה שהוקלד
- מה ש-`input()` מחזיר הוא תמיד `str` — גם כשהקלדת מספר
- `int(x)` ו-`float(x)` מייצרים ערך חדש; שמרי אותו בשם משלו
- `int("12.5")` נכשל עם `ValueError` — לנקודה צריך `float`
- `f"…{name}…"` שותל ערך של משתנה בתוך משפט; בלי ה-`f` הסוגריים נשארים על המסך
- אפשר לכתוב `int(input("…"))` — קוראים את זה מבפנים החוצה
- מספר מומר הוא מספר לכל דבר: אפשר להעביר אותו ל-`place_tower` בתור שורה
- `get_gold()` עונה על הרגע שבו שאלת אותו — דוח שנכתב לפני הבנייה מדווח על תיבה מלאה

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
| asks the questions in the wrong order in the great battle | the dispatch prints with the watchword and the commander swapped | answers are consumed in the order the `input()` calls run |
| types the row number by hand instead of reading it | the level's rule rejects the digit and explains why | the row comes from the briefing; that is the whole level |
| builds on a row the archers cannot reach | "not one tower ever saw a monster — they are all too far from the road" | more than ~2.6 cells from the path is out of range |
| files the report before the `place_tower` lines | `Gold left: 250` instead of `50` | `get_gold()` answers for the moment it is called |

**Skulpt fidelity note.** The two `ValueError` messages are the ones to rely on;
verify their exact wording with `node tools/verify-python.mjs` before shipping,
since the quoting of the offending value is what the explanation points at. The
f-string `SyntaxError` and the `TypeError` wording differ in Skulpt (it reports
`cannot concatenate 'str' and 'int' objects` for the latter). Show whatever the
engine actually produces — never a fabricated message — and let the Hebrew
explanation carry the teaching.

## Implementation notes

- **A battle check needs queued input, which the engine does not do yet.** Every
  level here is `check.kind: "battle"` **plus a `stdin` array** — the briefing
  answers Chiron gives while the level is being graded, exactly the way `cases`
  already queues answers. Two small changes make it real, and both must land
  before this lesson is built:
  1. `assets/js/checker.js`, battle branch — pass it through:
     `LC.Engine.run(code, { execLimitMs: …, stdin: spec.stdin || [] })`.
  2. `tools/verify-python.mjs` — its `pyRunner` must take the exercise's
     `check.stdin` the same way, or the verifier will run her briefing code with
     no answers and every solution here will look broken.
  Without a queued answer `input()` returns `""` and `int("")` raises
  `ValueError`, so this is not a nicety: it is the difference between a lesson
  that grades and a lesson that always errors.
- **`check.also` may be an array here.** Four of the five levels need an `output`
  rule (the report) *and* a `source` rule (the briefing) at once. `checker.js`
  today accepts a single `also` object; accept an array of them, every entry
  passing, which is the same shape lesson 1's e1 established for plain checks.
  `verify-python.mjs` must honour non-`source` entries too — it currently
  re-checks `also` only when it is a `source` rule.
- **When she presses Run rather than Fight, she answers the questions herself** in
  the in-page Iris panel; `check.stdin` is only used while grading. That is the
  same split `cases` already has, and it is the right one: the briefing is a
  conversation when she is playing and a script when the level is being judged.
- **Arithmetic and operators written *inside* an f-string are invisible to a
  `source` rule**, because the skeleton strips string literals before looking.
  It does not bite in this lesson (no level requires an operator), but lesson 4
  is built on exactly that and the two lessons should agree: numbers are worked
  out into named variables, then printed.
- **The prompt does not go to stdout.** This is the load-bearing decision for
  every `expect` string on this page: the engine renders the prompt text in the
  in-page Iris panel and writes *nothing* to the output stream, so `expect`
  contains only what `print()` produced. CPython echoes the prompt; the browser
  UI does not, and that is the correct choice here because the prompt is already
  visible on screen. Record it in `engine.js` as a comment so nobody "fixes" it
  later and breaks lessons 3, 4, 7, 18 and 20 at once.
- **Output comparison uses the same `normalized` semantics** defined in lesson 2:
  trim each line, collapse runs of spaces within a line, drop leading and trailing
  blank lines, keep line breaks.
- **Running out of queued input**: if her program calls `input()` more times than
  the level supplies answers, the engine must fail with a friendly in-theme
  message (*"התוכנית שאלה יותר שאלות ממה שהיה בתסריט"*) rather than hanging on an
  unresolved promise. She will hit this the first time she adds a fourth question
  to the great battle.
- **The Try It panel calls `input()` twice** — the free-play runner needs the
  same in-page prompt UI as the graded runner, not a simplified one.
- **The digit bans are a level rule, not a puzzle.** b2, b4 and the great battle
  each forbid the two digits that could name a row within firing range, so the
  coordinate can only come from the briefing. The map is sized to make that true:
  the road runs along the last row, and everything further than about 2.6 cells
  from it never fires. If you change a map here, re-derive the banned digits — and
  keep every column number in the brief free of them.
- **Verified level numbers.** b1: three archers clear it, so only the missing
  print line stands between her and a win. b2: four archers on the named row hold,
  three leak one. b3: four archers hold, and 250 − 4×50 leaves exactly 50, which
  is also the archer's price — say so in the brief so the repeated 50 does not
  read as a bug. b4: five hold, four leak one. Great battle: six hold with 20
  unspent, five leak one.
- **Do not use `+` anywhere in this lesson.** Operators are lesson 4. The whole
  reason f-strings arrive before arithmetic is so she never needs `"a" + b` to
  build a sentence — and never meets the `str`/`int` `TypeError` before she has
  the tools to reason about it.
- **RTL**: f-strings inside Hebrew prose are the worst case in the whole course
  for bidi rendering — `f"…{name}…"` contains quotes, braces and Latin text.
  Every inline mention needs `<bdi>`, and the code editor stays `dir="ltr"`.
