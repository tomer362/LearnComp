# Lesson 08 — BOSS: Medusa's Garden · גן המדוזה

> **Act II — The Lightning Thief · גנב הברק** · Stop 8 of 20 · **Act finale**
> Structure follows `spec/lessons/lesson-01.md`. Schema: `spec/04-lesson-template.md`.
> The Quest section is replaced by a **Boss** — see `spec/02-game-design.md`.

| | |
| --- | --- |
| **id** | `08` |
| **slug** | `medusas-garden` |
| **minutes** | 30–35 |
| **concepts** | `for`, `in`, `range()`, `continue`, choosing between `for` and `while`, loop patterns |
| **new vocabulary** | `for`, `in`, `range`, `continue` |
| **requires** | L1–L4 · L5 booleans · L6 `if`/`elif`/`else` + indentation · **L7 loops, accumulators, `break`** |
| **item** | 🪞 ראי הברונזה / The Bronze Mirror |
| **XP** | 20 + 25 + 30 + 30 (training) + 60 (boss) + 30 (bonus) = **195** · optional side quest +25 = **220** |
| **drachmas** | 5 + 6 + 8 + 9 + 16 = **44** 🪙 · side quest +8 |
| **boss** | 🐍 מדוזה / Medusa — 6 HP, one per passing test case |

## Teaching goal

By the end she can pick the right loop for the job and write it without a manual
counter.

The one idea: **a loop that counts for you.** She already has repetition
(lesson 7). `for` adds nothing conceptually new about repeating — it removes the
three manual parts and hands her the counter as a variable. Framing it as
*removal* rather than as a second, unrelated loop is what stops the classic
"which one do I use?" paralysis.

The two things that must be over-taught, because they surprise everybody:
1. **`range(4)` gives 0, 1, 2, 3** — it starts at 0 and stops *before* the number.
2. `continue` skips the rest of *this round only*; `break` leaves the loop.

As the act finale, this lesson also has to make Act II feel finished: the boss
requires `for`, `range`, `if`/`elif`/`else`, `continue`, an accumulator and `%`.
Six lessons, one program.

## Story beat

Past the strait, on the coast road, a faded sign: **AUNT EM'S GARDEN GNOME
EMPORIUM — FREE ADMISSION**. Behind it, rows and rows of stone statues, standing
in neat lines under a grey sky. Grover says the place smells old. Annabeth
notices that every statue is posed like someone who was running.

Annabeth hands her a disc of polished bronze — a shield back, mirror-bright —
and says the only rule twice: do not look at her directly. Look at the
reflection. Count the rows through the mirror, one at a time, and do not skip
the counting, because the number of rows is how you know when you are out.

Cast: Annabeth (the shield, the rule), Grover (wants to leave, is right), Medusa
(present, never described in detail — she is a movement between statues and a
sound of scales). Age-appropriate: statues, no gore, and nobody is harmed on
screen.

**Prophecy panel**:

> אחרי המצר, על דרך החוף, שלט דהוי: "גן גמדי הגן של הדודה אֶם — כניסה חופשית."
> גרובר אומר שהוא מריח משהו ישן מאוד. אנאבת' אומרת שכל הפסלים בפוזה של מישהו שרץ.
> הם עומדים בשורות. שורה אחרי שורה אחרי שורה.
> "אל תסתכלי עליה ישירות," לוחשת אנאבת', ומושיטה לך דיסקית ברונזה מלוטשת.
> "תסתכלי רק בהשתקפות. ותספרי את השורות — זה איך שתדעי מתי יצאת."
> משהו זז בין הפסלים, ואת מתחילה לספור.

## Chiron Teaches — block by block

1. **prose** — `while` מצוינת כשאת לא יודעת כמה סיבובים יהיו: "עד שנעבור את
   המצר", "כל עוד נשאר כוח". אבל אתמול כתבת גם לולאה שרצה **בדיוק עשר פעמים**,
   ובשביל זה היית צריכה שלושה חלקים: משתנה, תנאי, ושורה שמעלה את המונה. שלושה
   מקומות לטעות בהם. כירון: "כשאת יודעת כמה פעמים, יש לפייתון לולאה שסופרת
   במקומך."

2. **code · runnable** — the first `for`. First 60 seconds.
   ```python
   for statue in range(4):
       print(f"Statue {statue}")
   ```
   Output (verified):
   ```
   Statue 0
   Statue 1
   Statue 2
   Statue 3
   ```
   Caption (he): "שתי שורות. אין משתנה שאת מאתחלת, אין תנאי, ואין שורה שמעלה
   מונה — ובכל זאת רצו ארבעה סיבובים. **ויש פה שתי הפתעות.**"

3. **callout · warn** — title: `range(4)` נותן 0, 1, 2, 3.
   text: שתי ההפתעות בשורה אחת: פייתון **מתחיל לספור מאפס**, ו־`range(4)`
   **לא כולל** את 4. ארבעה מספרים: 0, 1, 2, 3. זה נראה מוזר עכשיו ויהיה טבעי
   בעוד שבוע — ובינתיים, כשמספר בפלט לא מסתדר לך בדיוק באחד, זו כמעט תמיד
   הסיבה. יש לזה אפילו שם: *off-by-one*, שגיאת ההפרש־אחד.

4. **prose** — Anatomy, now that she has run it.
   - המילה `for`
   - **שם משתנה שאת ממציאה** — `statue`, `row`, מה שתרצי. בכל סיבוב פייתון שם
     בו את הערך הבא
   - המילה `in`
   - `range(...)` — רשימת המספרים לעבור עליהם
   - נקודתיים `:` ובלוק מוזח, בדיוק כמו ב־`if` וב־`while`

5. **code · runnable** — `range(start, stop)`. שליטה בהתחלה.
   ```python
   for row in range(1, 6):
       print(f"Row {row} is clear")
   ```
   Output (verified): `Row 1 is clear` … `Row 5 is clear`.
   Caption (he): "עם שני מספרים: מאיפה להתחיל, ולפני מה לעצור. `range(1, 6)`
   נותן 1 עד 5. הסוף עדיין לא נכלל — הכלל הזה אף פעם לא משתנה."

6. **code · runnable** — `range(start, stop, step)`. שליטה בקפיצה.
   ```python
   for step in range(10, 0, -2):
       print(step)
   ```
   Output (verified): `10`, `8`, `6`, `4`, `2`.
   Caption (he): "המספר השלישי הוא הקפיצה, והוא יכול להיות שלילי. `range(10, 0,
   -2)` יורד מ־10 ועוצר לפני 0 — לכן 2 הוא האחרון ולא 0."

7. **compare** — the same five lines, two loops. This is the block that answers
   "why did I learn `while` yesterday?"
   - **bad** (label: "עובד מצוין — אבל שלוש שורות ושלושה מקומות לשכוח בהם משהו")
     ```python
     i = 0
     while i < 5:
         print(i)
         i = i + 1
     ```
   - **good** (label: "אותה תוצאה בדיוק, בשתי שורות, בלי מונה ידני")
     ```python
     for i in range(5):
         print(i)
     ```
   Both outputs verified identical: `0 1 2 3 4`, one per line.
   Note under the compare (he): הגרסה עם `while` **לא שגויה**. היא פשוט עושה
   ביד את מה ש־`for` עושה לבד, ולכן יש בה יותר הזדמנויות לבאג.

8. **prose** — the rule for choosing, in two sentences worth memorising:
   > **`for` כשאת יודעת כמה פעמים.** "כל שורה בגן", "12 פעמים", "מ־1 עד 20".
   > **`while` כשאת יודעת מתי לעצור.** "עד שנעבור 40 מטר", "כל עוד נשאר כוח".
   אם את יכולה לענות "כמה פעמים?" לפני שהתוכנית רצה — `for`.

9. **callout · tip** — title: איך קוראים למשתנה של הלולאה.
   text: השם שלך לבחור. `for row in range(12)` נקרא כמו משפט באנגלית ומסביר את
   עצמו, ולכן הוא עדיף על `for x in range(12)`. `i` (קיצור של *index*) מקובל
   כשהמשתנה הוא באמת רק מונה ואין לו שום משמעות אחרת — זו האות הבודדת היחידה
   שמקובל להשתמש בה בקוד, וזה הרגע שבו את מקבלת רישיון עליה.

10. **prose + code · runnable** — accumulating inside a `for`, straight from
    lesson 7's pattern.
    ```python
    total = 0
    for statue in range(1, 13):
        total = total + statue
    print(f"Total: {total}")
    ```
    Output (verified): `Total: 78`
    Explain (he): הצובר עובד בדיוק כמו אתמול — מאותחל **לפני** הלולאה, גדל
    בתוכה, נקרא **אחרי** שהיא נגמרה. מה שהשתנה הוא רק מי מנהל את הספירה. שימי לב
    ש־`total` צמוד לשוליים בשורה האחרונה, כי הוא נדפס פעם אחת ולא בכל סיבוב.

11. **prose + code · runnable** — `continue`. לדלג על שאר הסיבוב הזה ולעבור לבא.
    ```python
    for row in range(1, 9):
        if row == 4:
            print("Row 4 has a broken mirror. Skip it.")
            continue
        print(f"Row {row} checked")
    ```
    Output (verified):
    ```
    Row 1 checked
    Row 2 checked
    Row 3 checked
    Row 4 has a broken mirror. Skip it.
    Row 5 checked
    Row 6 checked
    Row 7 checked
    Row 8 checked
    ```
    Explain (he): בסיבוב של שורה 4 פייתון הגיע ל־`continue`, **קפץ מעל כל מה
    שנשאר בבלוק**, וחזר מיד למעלה לסיבוב הבא. לכן `Row 4 checked` לא הודפס —
    ה־`print` הזה נמצא אחרי ה־`continue`, והוא לא רץ באותו סיבוב.

12. **compare** — `break` מול `continue`, אותה לולאה, מילה אחת שונה.
    - **bad** — label: "`break` — יוצאת מהלולאה כולה. השורות 5 עד 8 לא נבדקו
      בכלל."
      ```python
      for row in range(1, 9):
          if row == 4:
              break
          print(f"Row {row} checked")
      ```
      Output: rows 1, 2, 3. That is it.
    - **good** — label: "`continue` — מדלגת רק על הסיבוב הזה. כל שאר השורות
      נבדקו."
      ```python
      for row in range(1, 9):
          if row == 4:
              continue
          print(f"Row {row} checked")
      ```
      Output: rows 1, 2, 3, 5, 6, 7, 8.

    Neither is "bad" — the labels carry the teaching. One sentence to close it:
    `break` עונה על "סיימנו פה", `continue` עונה על "לא השורה הזאת".

13. **error** — a genuine trap she can walk into with lesson 4's division.
    ```python
    for n in range(10 / 2):
        print(n)
    ```
    Real error (verified in Skulpt, identical to CPython 3):
    ```
    TypeError: 'float' object cannot be interpreted as an integer
    ```
    explain (he): `10 / 2` נותן `5.0` ולא `5` — זכרי משיעור 4: **חילוק רגיל תמיד
    מחזיר `float`**, גם כשהתוצאה עגולה. ל־`range` צריך מספר שלם, כי אי אפשר
    לעשות חצי סיבוב. שני תיקונים אפשריים ושניהם נכונים: `range(10 // 2)` עם
    חילוק שלם, או `range(int(10 / 2))`. הודעת השגיאה אומרת בדיוק את זה: קיבלתי
    `float`, ואני צריך `integer`.

14. **callout · myth** — title: מדוזה והמגן המלוטש.
    text: מדוזה היא אחת משלוש הגורגונות, והיחידה מביניהן שהייתה בת תמותה. פרסאוס
    לא ניצח אותה בכוח — הוא ניצח אותה בזווית. אתנה נתנה לו מגן ברונזה מלוטש,
    והוא התקדם כשגבו אליה והסתכל רק בהשתקפות. **הפתרון לא היה חרב טובה יותר.
    הוא היה דרך אחרת להסתכל על אותה בעיה.** אנאבת' תזכיר לך את זה לפני הקרב.

15. **prose** — the act-closing frame, right before Try It: "בשש השיעורים
    האחרונים למדת להדפיס, לזכור, לשאול, להחליט ולחזור. הקרב הבא דורש את חמשת
    הדברים האלה יחד, בתוכנית אחת."

## Try It (ungraded)

Intro (he): *"התור שלך לספור את הגן דרך המראה. הריצי כמו שזה, ואז שני את `13`
למספר אחר. אחר כך נסי לשנות `range(1, 13)` ל־`range(13)` בלולאה הראשונה בלבד —
מה זז בפלט, וכמה שורות יש עכשיו? שום דבר פה לא נבדק."*

```python
for row in range(1, 13):
    print(f"Row {row}: statues frozen mid-run")

statues = 0
for row in range(1, 13):
    statues = statues + 3
print(f"{statues} statues in the garden")
```

Output as shipped (verified): twelve `Row N: …` lines, then
`36 statues in the garden`.

The suggested experiment is the fastest possible way to feel the difference
between `range(13)` and `range(1, 13)`: the count stays 12, but the numbers
shift, and the first one becomes 0.

## Training exercises

### e1 — Twelve rows · 20 XP, 5 🪙

**brief (he)**: ספרי את שורות הגן בקול. הדפיסי `Row 1` עד `Row 12`, שורה אחת
לכל שורה בגן, עם לולאת `for`. שימי לב שהמספר הראשון הוא 1 ולא 0.

**starter**
```python
# count the rows out loud
```

**solution**
```python
for row in range(1, 13):
    print(f"Row {row}")
```
Verified: `Row 1` … `Row 12`.

**check**
```js
{ kind: "output", mode: "normalized",
  expect: "Row 1\nRow 2\nRow 3\nRow 4\nRow 5\nRow 6\nRow 7\nRow 8\nRow 9\nRow 10\nRow 11\nRow 12" }
```
plus
```js
{ kind: "source", mustInclude: ["for ", "range("],
  message: { he: "המשימה הזו דורשת לולאת for עם range",
             en: "This one needs a for loop with range" } }
```

**hints**
1. (he) "`range(12)` ייתן לך שתים־עשרה מספרים — אבל איזה מספר יהיה הראשון, ואיזה
   האחרון? הריצי ותראי לפני שתתקני."
2. (he) "ל־`range` אפשר לתת שני מספרים: מאיפה להתחיל ולפני מה לעצור. את רוצה
   להתחיל ב־1."
3. (he) "`range(1, 13)` נותן 1 עד 12 — הסוף אף פעם לא נכלל, ולכן כותבים 13 כדי
   לקבל 12. הבלוק הוא שורה אחת: `print(f\"Row {row}\")`, עם המשתנה בתוך
   f-string כמו בשיעור 3."

### e2 — Counting the statues · 25 XP, 6 🪙

**brief (he)**: בכל שורה עומדים 7 פסלים, ויש 12 שורות. חשבי כמה פסלים יש בגן
וְהדפיסי שורה **אחת בלבד** בסוף: `84 statues`.

כירון יודע שאפשר לכפול 12 ב־7 ולסיים. **עשי את זה עם לולאה בכל זאת** — התבנית
הזאת חוזרת בעוד חמש דקות בקרב, ושם אי אפשר לכפול.

**starter**
```python
statues = 0

# one row at a time
```

**solution**
```python
statues = 0
for row in range(12):
    statues = statues + 7
print(f"{statues} statues")
```
Verified output: `84 statues`

**check**
```js
{ kind: "output", mode: "normalized", expect: "84 statues" }
```
plus
```js
{ kind: "source", mustInclude: ["for "],
  message: { he: "התשובה נכונה, אבל פה מתאמנים על הצובר — צריך לולאת for",
             en: "Right answer, but this one is accumulator practice — use a for loop" } }
```
The `message` is doing real work here: without it, "84 is correct but rejected"
is the single most demoralising failure in the course. Being upfront in the
brief *and* in the message is the cost of a source check on a correct answer.

**hints**
1. (he) "הצובר מאותחל לפני הלולאה, גדל בתוכה, ונדפס אחריה. איזו מהשלוש השורות
   האלה צריכה להיות מוזחת?"
2. (he) "`for row in range(12):` ובתוך הבלוק שורה אחת: `statues = statues + 7`.
   ה־`print` נכתב צמוד לשוליים, אחרי הלולאה."
3. (he) "אם ה־`print` יהיה בתוך הבלוק תקבלי שתים־עשרה שורות במקום אחת — נסי את
   זה בכוונה פעם אחת, זה מסביר את ההזחה טוב מכל הסבר. פה `row` לא מופיע בכלל
   בתוך הבלוק, וזה תקין לגמרי: הוא קיים רק כדי לספור שתים־עשרה סיבובים."

### e3 — The broken mirrors · 30 XP, 8 🪙 — **`continue`**

**brief (he)**: את עוברת על שורות 1 עד 10 דרך המראה. בשורות 3 ו־7 המראה סדוקה
ואי אפשר לבדוק אותן — **דלגי עליהן עם `continue`**, בלי להדפיס עליהן כלום. על
כל שאר השורות הדפיסי `Row 4 checked` (עם המספר המתאים).

הפלט הוא שמונה שורות: 1, 2, 4, 5, 6, 8, 9, 10.

**starter**
```python
for row in range(1, 11):
    # skip 3 and 7, check the rest
```

**solution**
```python
for row in range(1, 11):
    if row == 3 or row == 7:
        continue
    print(f"Row {row} checked")
```
Verified output: rows 1, 2, 4, 5, 6, 8, 9, 10 — eight lines.

**check**
```js
{ kind: "output", mode: "normalized",
  expect: "Row 1 checked\nRow 2 checked\nRow 4 checked\nRow 5 checked\nRow 6 checked\nRow 8 checked\nRow 9 checked\nRow 10 checked" }
```
plus
```js
{ kind: "source", mustInclude: ["continue"],
  message: { he: "המשימה הזו דורשת continue — לדלג על סיבוב, לא לצאת מהלולאה",
             en: "This one needs continue — skip a round, do not leave the loop" } }
```

**hints**
1. (he) "שתי שורות צריכות טיפול מיוחד. איך שואלים שאלה אחת שנכונה גם ל־3 וגם
   ל־7? (יש מילה מהשיעור על האורקל שעושה בדיוק את זה.)"
2. (he) "`if row == 3 or row == 7:` ובתוך ה־`if` — `continue`. שימי לב שאסור
   לכתוב `break`: הוא יעצור את הלולאה כולה ולא תראי את שורות 4 עד 10."
3. (he) "מבנה: `for row in range(1, 11):`, ובתוך הבלוק `if row == 3 or row ==
   7:` עם `continue` מוזח בשמונה רווחים. ה־`print` נכתב **אחרי** ה־`if`, מוזח
   בארבעה — ולכן הוא רץ רק בסיבובים שלא דילגו. שימי לב לכתוב `row == 3 or row
   == 7` ולא `row == 3 or 7`; כל צד של `or` הוא שאלה שלמה, כמו בשיעור 5."

### e4 — Backwards in the dark · 30 XP, 9 🪙 — **negative step**

**brief (he)**: את יוצאת מהגן לאחור, בלי להסתובב, וסופרת בקפיצות של 3 מ־20
כלפי מטה: 20, 17, 14, 11, 8, 5, 2 — ואז עוצרת (0 כבר לא נספר). אחרי הלולאה
הדפיסי שורה אחת: `She is behind you.`

**starter**
```python
# count down in threes, then one line
```

**solution**
```python
for step in range(20, 0, -3):
    print(step)
print("She is behind you.")
```
Verified output: `20 17 14 11 8 5 2`, one per line, then `She is behind you.`

**check**
```js
{ kind: "output", mode: "normalized",
  expect: "20\n17\n14\n11\n8\n5\n2\nShe is behind you." }
```
plus
```js
{ kind: "source", mustInclude: ["range(", "for "],
  message: { he: "המשימה הזו דורשת for עם range — כולל הקפיצה",
             en: "This one needs for with range — step included" } }
```

**hints**
1. (he) "ל־`range` יש מקום לשלושה מספרים. את יודעת מה שני הראשונים עושים. מה
   לדעתך יעשה השלישי, ומה יקרה אם הוא יהיה שלילי?"
2. (he) "`range(20, 0, -3)` — התחלה 20, עצירה לפני 0, קפיצה של מינוס 3. ה־`print`
   האחרון מחוץ ללולאה, צמוד לשוליים."
3. (he) "הסוף לא נכלל, ולכן `0` לא יודפס — הרצף נעצר על 2, כי 2 פחות 3 הוא
   מינוס 1 וזה כבר עבר את גבול העצירה. הבלוק הוא `print(step)` בלבד, ושורת
   `print(\"She is behind you.\")` נכתבת בלי הזחה כדי שתופיע פעם אחת."

### e5 — **side quest, optional** — Zeus and Poseidon · 25 XP, 8 🪙

Marked clearly as optional in the UI, worth XP, never blocks lesson completion
or the boss. (`07-curriculum.md` lists this side quest under L8.)

**brief (he)**: זאוס ופוסידון עדיין רבים על הברק, ואי אפשר לספור מ־1 עד 20 בלי
שאחד מהם יתפרץ. עברי על המספרים 1 עד 20 והדפיסי בכל שורה:
- `Zeus-Poseidon` אם המספר מתחלק גם ב־3 וגם ב־5
- `Zeus` אם הוא מתחלק ב־3 בלבד
- `Poseidon` אם הוא מתחלק ב־5 בלבד
- אחרת — את המספר עצמו

**solution**
```python
for n in range(1, 21):
    if n % 3 == 0 and n % 5 == 0:
        print("Zeus-Poseidon")
    elif n % 3 == 0:
        print("Zeus")
    elif n % 5 == 0:
        print("Poseidon")
    else:
        print(n)
```
Verified output (20 lines):
```
1
2
Zeus
4
Poseidon
Zeus
7
8
Zeus
Poseidon
11
Zeus
13
14
Zeus-Poseidon
16
17
Zeus
19
Poseidon
```

**check**
```js
{ kind: "output", mode: "normalized", expect: "<the 20 lines above>" }
```

**hints**
1. (he) "'מתחלק ב־3' זה בעצם 'שארית החלוקה ב־3 היא 0' — הסימן `%` משיעור 4.
   ועכשיו השאלה החשובה: איזו מארבע הבדיקות חייבת להיות **ראשונה**, ולמה?"
2. (he) "שרשרת `if/elif/elif/else`. הבדיקה של 'גם וגם' (`and`) חייבת להיות
   ראשונה, אחרת 15 ייתפס על ידי הבדיקה של 3 והשרשרת תעצור שם."
3. (he) "`if n % 3 == 0 and n % 5 == 0:` ראשונה, אחריה `elif n % 3 == 0:`, אחריה
   `elif n % 5 == 0:`, ולבסוף `else: print(n)`. שימי לב שב־`else` מדפיסים את
   `n` בלי גרשיים — זה מספר, לא טקסט. זה תרגיל מפורסם שנקרא FizzBuzz, ושואלים
   אותו בראיונות עבודה אמיתיים; עכשיו את יודעת לפתור אותו."

## BOSS — Medusa's Garden · 60 XP, 16 🪙

```js
boss: {
  name: { he: "מדוזה", en: "Medusa" },
  icon: "🐍",
  hp: 6           // one point per passing test case
}
```

**Framing text (he)**, shown above the editor: *"אנאבת' מחזיקה את המראה. גרובר
כבר בחוץ. את צריכה לעבור את הגן בבת אחת, ולדעת בכל רגע כמה פסלים ספרת. כל מקרה
בדיקה שיעבור מוריד לה נקודת חיים אחת. אין דרך להפסיד — יש רק עוד לא סיימת."*

### The task

כתבי את תוכנית המעבר בגן:

1. קלטי כמה שורות רואים: `rows = int(input("How many rows can you see? "))`
2. עברי על השורות מ־1 עד `rows` בלולאת `for`. שמרי צובר של מספר הפסלים.
3. בכל שורה שמספרה מתחלק ב־4, המראה סדוקה: הדפיסי
   `Row 4: mirror cracked, eyes down` (עם מספר השורה), **דלגי על שאר הסיבוב עם
   `continue`**, ואל תספרי את הפסלים שלה.
4. בכל שורה אחרת הדפיסי `Row 1: 3 statues` (עם מספר השורה) והוסיפי 3 לצובר.
5. אחרי הלולאה הדפיסי `Total statues: 9` (עם המספר שספרת).
6. ואז שורה אחת אחרונה, לפי הסכום:
   - 0 → `The garden is empty. Medusa is not here.`
   - 30 ומעלה → `Too many. Use the shield.`
   - כל השאר → `Keep walking.`

**starter**
```python
rows = int(input("How many rows can you see? "))
total = 0

# walk the rows

# then the report
```

### Solution

```python
rows = int(input("How many rows can you see? "))
total = 0

for row in range(1, rows + 1):
    if row % 4 == 0:
        print(f"Row {row}: mirror cracked, eyes down")
        continue
    print(f"Row {row}: 3 statues")
    total = total + 3

print(f"Total statues: {total}")

if total == 0:
    print("The garden is empty. Medusa is not here.")
elif total >= 30:
    print("Too many. Use the shield.")
else:
    print("Keep walking.")
```

`range(1, rows + 1)` is the load-bearing detail: `rows` rows starting at 1. With
`rows = 0` it becomes `range(1, 1)`, which is empty, and the loop body never
runs. Verified.

### The six test cases — one HP each

Every expected output below was produced by running the solution above through
the shipped runtime with the given stdin.

```js
check: { kind: "cases", cases: [
  // ── HP 6 → 5 · "הגן ריק" · the empty-loop edge case
  { stdin: ["0"], expect:
    "Total statues: 0\n" +
    "The garden is empty. Medusa is not here." },

  // ── HP 5 → 4 · "שורה אחת" · smallest non-empty walk
  { stdin: ["1"], expect:
    "Row 1: 3 statues\n" +
    "Total statues: 3\n" +
    "Keep walking." },

  // ── HP 4 → 3 · "שלוש שורות" · accumulator, no cracked mirror yet
  { stdin: ["3"], expect:
    "Row 1: 3 statues\nRow 2: 3 statues\nRow 3: 3 statues\n" +
    "Total statues: 9\n" +
    "Keep walking." },

  // ── HP 3 → 2 · "המראה הראשונה" · first continue; 4 rows still total 9
  { stdin: ["4"], expect:
    "Row 1: 3 statues\nRow 2: 3 statues\nRow 3: 3 statues\n" +
    "Row 4: mirror cracked, eyes down\n" +
    "Total statues: 9\n" +
    "Keep walking." },

  // ── HP 2 → 1 · "שתי מראות" · continue fires more than once
  { stdin: ["8"], expect:
    "Row 1: 3 statues\nRow 2: 3 statues\nRow 3: 3 statues\n" +
    "Row 4: mirror cracked, eyes down\n" +
    "Row 5: 3 statues\nRow 6: 3 statues\nRow 7: 3 statues\n" +
    "Row 8: mirror cracked, eyes down\n" +
    "Total statues: 18\n" +
    "Keep walking." },

  // ── HP 1 → 0 · "המגן" · lands exactly on the >= 30 boundary
  { stdin: ["13"], expect:
    "Row 1: 3 statues\nRow 2: 3 statues\nRow 3: 3 statues\n" +
    "Row 4: mirror cracked, eyes down\n" +
    "Row 5: 3 statues\nRow 6: 3 statues\nRow 7: 3 statues\n" +
    "Row 8: mirror cracked, eyes down\n" +
    "Row 9: 3 statues\nRow 10: 3 statues\nRow 11: 3 statues\n" +
    "Row 12: mirror cracked, eyes down\n" +
    "Row 13: 3 statues\n" +
    "Total statues: 30\n" +
    "Too many. Use the shield." } ] }
```

**Why these six, in this order.** Each case is a different way to be wrong, and
the order is deliberate: the bar drains as her program gets more correct, so
partial progress is visible from the first run.

| Case | Drains | Catches |
| --- | --- | --- |
| `0` | HP 6→5 | `range(1, rows)` vs `range(1, rows + 1)` edge; the `total == 0` branch |
| `1` | HP 5→4 | off-by-one at the start — a loop printing `Row 0` or two rows |
| `3` | HP 4→3 | the accumulator; `Keep walking.` as the default branch |
| `4` | HP 3→2 | `continue` — a solution that counts the cracked row still totals 12 here |
| `8` | HP 2→1 | `continue` firing repeatedly; `break` instead of `continue` stops at 4 |
| `13` | HP 1→0 | `>= 30` boundary — `> 30` fails only here, and it is meant to |

Case 4 and case 13 are the two that separate "roughly working" from "correct".
A `break` in place of `continue` passes cases 0, 1 and 3 and fails 4, 8 and 13 —
which is exactly the feedback shape a boss should have: the bar moves, and what
is left tells her where to look.

**hints**
1. (he) "פרקי את זה לשלושה חלקים נפרדים וכתבי אותם אחד אחרי השני: (א) הלולאה
   שעוברת על השורות, (ב) שורת הסיכום, (ג) המשפט האחרון לפי הסכום. תריצי אחרי כל
   חלק. איזה מהם צריך להיות מוזח ואיזה צמוד לשוליים?"
2. (he) "הלולאה היא `for row in range(1, rows + 1):` — ה־`+ 1` נחוץ כי הסוף
   ב־`range` אף פעם לא נכלל. 'מתחלק ב־4' זה `row % 4 == 0`. אחרי ההודעה על
   המראה הסדוקה בא `continue`, ולכן שתי השורות שאחריו לא רצות באותו סיבוב.
   הסיכום בסוף הוא שרשרת `if/elif/else` על `total`."
3. (he) "כך נראה השלד — הפרטים שלך:
   ```python
   rows = int(input(\"How many rows can you see? \"))
   total = 0

   for row in range(1, rows + 1):
       if row % 4 == 0:
           print(f\"Row {row}: mirror cracked, eyes down\")
           continue
       print(f\"Row {row}: 3 statues\")
       total = total + 3
   ```
   שימי לב לשלוש רמות ההזחה: 0 ללולאה, 4 לתוכן שלה, 8 לתוך ה־`if`. אחרי
   הלולאה, צמוד לשוליים, שורת `print` עם הסכום, ואז שרשרת `if/elif/else`. שלוש
   נקודות שמפילות: `range(1, rows + 1)` ולא `range(rows)`; `continue` ולא
   `break`; ו־`>= 30` ולא `> 30` — נסי את הקוד שלך עם 13 שורות ותראי למה."

### Victory

On HP 0 the boss cutscene plays (`02-game-design.md`: defeating a boss unlocks
the next act with a short cutscene). Copy (he):

> מדוזה מסתכלת בברונזה, רואה את עצמה, וקופאת בין הפסלים שלה.
> הגן שקט. גרובר מסרב להיכנס בחזרה.
> על השולחן ליד הקופה מונחת חבילה עטופה, ועליה כתובת משלוח לאולימפוס —
> ורשימה ארוכה של שמות, אחד מתחת לשני.
> אנאבת' קוראת את הרשימה פעמיים ואומרת: "זו לא רשימת לקוחות. זו רשימת מסע."
> **סוף מערכה II.**

## Reward & Recap

**Item**: 🪞 **ראי הברונזה / The Bronze Mirror**
desc (he): "דיסקית ברונזה מלוטשת מגב מגן. מי שמסתכלת דרך ההשתקפות לא מסתכלת
בעיניים — ולפעמים זווית אחרת שווה יותר מחרב חדה יותר."

**Achievements possible here**
- *Gorgon Slayer* — drained all six of Medusa's HP.
- *Completionist* — every exercise in Act II, including the side quest.
- *Off By One* — the `range` boundary was wrong once and then right. Awarded with
  affection, never as a scold.
- *No Hints Needed* — finished the lesson with zero ambrosia spent.
- *Interviewer's Favourite* — finished the FizzBuzz side quest.

**Recap bullets**
- `for x in range(n)` חוזר `n` פעמים וסופר לבד — בלי מונה ידני ובלי תנאי
- `range(4)` נותן 0, 1, 2, 3: מתחיל באפס, **והסוף אף פעם לא נכלל**
- `range(a, b)` ו־`range(a, b, step)` נותנות שליטה בהתחלה, בסוף ובקפיצה — גם שלילית
- `continue` מדלג על שאר הסיבוב הנוכחי; `break` יוצא מהלולאה כולה
- **`for` כשאת יודעת כמה פעמים, `while` כשאת יודעת מתי לעצור**

**Next teaser (he)**: *"מדוזה השאירה חבילה ורשימה — עשרים שמות, אחד מתחת לשני.
עד עכשיו כל משתנה שלך החזיק דבר אחד בדיוק. מחר תלמדי איך פייתון מחזיק רשימה
שלמה בשם אחד. מערכה III מתחילה בים."*

## Common mistakes to anticipate

| She writes | She sees (verified in Skulpt) | Hint / explainer must cover |
| --- | --- | --- |
| `range(12)` when she wanted 1–12 | לא שגיאה — הפלט מתחיל ב־0 ונגמר ב־11 | `range` מתחיל באפס; `range(1, 13)` נותן 1 עד 12 |
| `range(1, 12)` for twelve rows | לא שגיאה — 11 שורות בלבד | הסוף לא נכלל, לכן `13` |
| `for row in range(10 / 2):` | `TypeError: 'float' object cannot be interpreted as an integer` | `/` מחזיר `float`; `//` או `int()` |
| `for row in range(1, 11)` (no colon) | `SyntaxError: bad input on line N` | נקודתיים בסוף שורת ה־`for` |
| body not indented | `SyntaxError: bad input on line N` (CPython: `IndentationError: expected an indented block`) | אחרי `:` בא בלוק מוזח — כמו בשיעורים 6 ו־7 |
| `for row in range(12)` then uses `rows` | `NameError: name 'rows' is not defined` | שם המשתנה בלולאה הוא מה שכתבת ב־`for` |
| `continue` outside a loop | `SyntaxError: 'continue' outside loop on line N` | `continue` ו־`break` חיים רק בתוך לולאה |
| `break` where `continue` was needed | לא שגיאה — הלולאה נעצרת מוקדם והפלט קצר | `break` = סיימנו; `continue` = לא הסיבוב הזה |
| `print` after `continue` in the same block | לא שגיאה — השורה לא רצה באותו סיבוב | `continue` קופץ מעל כל מה שנשאר בבלוק |
| `if row == 3 or 7:` | לא שגיאה — נכון תמיד, ומדלג על הכל | כל צד של `or` הוא שאלה שלמה: `row == 3 or row == 7` |
| `print` accumulator inside the loop | לא שגיאה — שורה בכל סיבוב במקום אחת | הזחה קובעת; הסיכום צמוד לשוליים |
| `range(20, 0, 3)` for a countdown | לא שגיאה — פלט ריק | לספירה למטה צריך צעד שלילי; `range` ריק לא זורק שגיאה |

Note how many rows in this table are **not errors**. By lesson 8 her bugs stop
being crashes and start being wrong answers, and that shift deserves a sentence
in the lesson: *"מכאן והלאה, החלק הקשה הוא לא שהתוכנית נשברת — אלא שהיא רצה
ועושה משהו אחר ממה שהתכוונת. לכן קוראים את הפלט, לא רק את השגיאות."*

## Implementation notes

- **Boss checker semantics.** `hp: 6` with six cases means one HP per case. The
  checker must run **all six cases on every submission** and report
  `{passed: n, total: 6}` so the bar reflects partial progress from the first
  run. It must never stop at the first failure — a boss bar that only ever shows
  0 or 6 is not a boss bar.
- **Persist the best result.** `game.js` stores the highest `passed` count for
  the boss so the bar does not reset when she closes the tab mid-fight
  (`02-game-design.md`: "Partial progress is kept and shown"). Progress is saved
  per exercise, and the boss counts as one.
- **Name the failing case in her language, not in JSON.** On a partial pass,
  show which stdin value failed — *"עם 13 שורות התוכנית שלך הדפיסה `Keep
  walking.` במקום `Too many. Use the shield.`"* — and offer a diff of expected
  versus actual for the first differing line only. Dumping six full outputs at
  390px is unreadable.
- **The side quest e5 needs an `optional: true` flag** on the exercise object —
  a schema addition. It must not count toward lesson completion, the completion
  bonus, or the *No Hints Needed* achievement, but it does award its own XP and
  drachmas and it does count toward *Completionist*.
- e1–e4 each carry two checks (`output` + `source`) — same `all: [...]` wrapper
  question raised in lessons 5, 6 and 7. Act II cannot be authored until that is
  resolved; the boss's `cases` check is a single check and is unaffected.
- **`source` substrings use trailing markers**: `"for "` and `"range("` rather
  than `"for"` and `"range"`, so a variable named `forest` or a comment about
  ranges cannot satisfy the requirement.
- `input()` prompt text is rendered in the Iris-message panel and never reaches
  stdout, so no `expect` string in the boss includes the prompt (verified by
  running all six cases with queued stdin).
- **`enumerate`, `zip` and `for … in <list>` are all supported by Skulpt but are
  deliberately absent here.** `for` over a list arrives in lesson 9 with lists
  themselves. This lesson is `range` only, so that lesson 9 has exactly one new
  idea.
- Every code block, solution, expected output and boss case in this file was
  executed through the shipped `assets/js/vendor/skulpt.min.js` with
  `__future__: Sk.python3`.
