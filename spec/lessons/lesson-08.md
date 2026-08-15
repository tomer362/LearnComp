# Lesson 08 — BOSS: Medusa's Garden · גן המדוזה

> **Act II — The Lightning Thief · גנב הברק** · Stop 8 of 20 · **Act finale**
> Structure follows `spec/lessons/lesson-01.md`. Schema: `spec/04-lesson-template.md`.
> The Quest section is replaced by a **Boss** — see `spec/02-game-design.md`.
> **The game is the course**: the graded work is four battle levels, one optional
> side battle, and a boss battle against Medusa herself. Level schema and API:
> `spec/09-battle-game.md`. Control model: **build script** (`place_tower`,
> `get_gold`, `tower_cost`, `get_wave`, `get_map`, `camp_hp`).

| | |
| --- | --- |
| **id** | `08` |
| **slug** | `medusas-garden` |
| **minutes** | 30–35 |
| **concepts** | `for`, `in`, `range()`, `continue`, choosing between `for` and `while`, loop patterns |
| **new vocabulary** | `for`, `in`, `range`, `continue` |
| **requires** | L1–L4 · L5 booleans · L6 `if`/`elif`/`else` + indentation · **L7 loops, accumulators, `break`** |
| **item** | 🪞 ראי הברונזה / The Bronze Mirror |
| **XP** | 20 + 25 + 30 + 30 (training battles) + 60 (boss battle) + 30 (bonus) = **195** · optional side battle +25 = **220** |
| **drachmas** | 5 + 6 + 8 + 9 + 16 = **44** 🪙 · side battle +8 |
| **boss** | 🐍 מדוזה / Medusa — 380 HP, armour 6, speed 0.9, on the field |
| **towers** | 🏹 archer (50) · 💣 cannon (90) · ❄️ ice (70) · ⚡ lightning (120, side battle only) |

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
battle requires `for`, `range(start, stop, step)`, `if` and `continue` — and the
optional side battle adds `%` and an `elif` chain on top. Six lessons, one wall.

**Why a wall is the right mechanic.** A `for` loop over `range` produces a row of
towers whose shape on the board *is* the range that built it: change the start and
the wall slides, change the step and it thins out, add a `continue` and it leaves
a gap exactly where the road crosses. Nothing else in the course lets her see a
loop this directly. And the boss makes it necessary rather than pretty: Medusa has
380 HP behind armour 6, so no single tower can bring her down — what kills her is
the number of towers she walks past, which is the one thing a loop is for.

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
   Note under the compare (he): הגרסה עם `while` **לא שגויה**. היא עושה
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

## Training battles

Four battles, one optional side battle, and the boss. All on the **build-script**
model, and all of them about the same picture:

> **A wall is a `for` loop.** `for x in range(6): place_tower("archer", x, 3)` is
> six towers from two lines, and the row of towers on the screen has exactly the
> shape of the range that built it. This is the first lesson where she can *see*
> her loop — the wall is the loop, drawn.

Every level here is `check.kind: "battle"` with an `also` `source` rule requiring
`for` and `range(`, because a wall is the one thing in this course that a
determined learner would happily type out by hand.

### b1 — החומה הראשונה / The First Wall · 20 XP, 5 🪙

**Why this mechanic**: `range(n)` and nothing else. The loop variable is the
column, so `range(6)` and the wall on the board are the same object seen twice.
The starter builds `range(2)` — two towers, a wall with a hole either side of it —
and she watches it fail before she changes a single number.

```js
map: { cols: 12, rows: 7, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4]] },
gold: 300, campHp: 3, seed: 41, allowed: ["archer"],
waves: [
  { delay: 0,  enemies: [ { kind: "satyr", count: 14, gap: 0.28 } ] },
  { delay: 8,  enemies: [ { kind: "hellhound", count: 7, gap: 0.8 } ] },
  { delay: 18, enemies: [ { kind: "harpy", count: 10, gap: 0.5 } ] },
],
```

**brief (he)**: הגן מתחיל, והפסלים עומדים בשורות. שלושים ואחת מפלצות בשלושה גלים,
300 זהב, וקשתות בלבד — בדיוק שש.

הלולאה כבר כתובה, והיא בונה שתיים. שני את המספר בתוך `range` כך שתקבלי חומה של
שש קשתות בשורה 3, מהמשבצת 0 ועד 5. חמש לא יספיקו; בדקי אם את לא מאמינה.

**starter**
```python
for x in range(2):
    place_tower("archer", x, 3)
```

**solution**
```python
for x in range(6):
    place_tower("archer", x, 3)
```
Verified: six archers at x = 0…5, 300 of 300 gold spent, 3/3, thirty-one kills.
`range(5)` is overrun.

**check**
```js
check: {
  kind: "battle",
  also: { kind: "source", mustInclude: ["for", "range("],
          message: { he: "החומה הזאת נבנית בלולאת for עם range — לא בשש שורות place_tower",
                     en: "This wall is built with a for loop and range — not six place_tower lines" } }
}
```

**hints**
1. (he) "הריצי כמו שזה. כמה מגדלים נבנו, ואיזה מספר בקוד קובע את זה? ואיזו
   משבצת קיבל המגדל הראשון — 0 או 1?"
2. (he) "`range(6)` נותן שישה מספרים, והם מתחילים ב־0: 0, 1, 2, 3, 4, 5. המשתנה
   `x` מקבל אותם אחד־אחד, והוא זה שנכנס לתוך `place_tower` בתור העמודה."
3. (he) "שני את `range(2)` ל־`range(6)`. הלולאה תרוץ שישה סיבובים, ובכל סיבוב
   `x` יהיה מספר אחר — 0 עד 5 — ותקבלי חומה רצופה. שימי לב שלא כתבת אף מספר
   של משבצת בעצמך: הלולאה כתבה אותם."

### b2 — איפה הכביש מתחיל / Where the Road Starts · 25 XP, 6 🪙

**Why this mechanic**: `range(start, stop)`, with a **cost for getting the start
wrong**. The road on this map begins at column 5, and a tower more than about 2.6
squares from the path never fires at anything. `range(9)` builds nine towers,
three of which stand in an empty field for the whole battle — 150 gold that does
nothing, and the camp falls. The engine says it plainly: *"המגדל במשבצת (0, 3)
רחוק מדי מהשביל ולא ירה אף פעם."*

```js
map: { cols: 14, rows: 7, path: [[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[12,4],[13,4]] },
gold: 450, campHp: 3, seed: 42, allowed: ["archer"],
waves: [
  { delay: 0,  enemies: [ { kind: "satyr", count: 16, gap: 0.25 } ] },
  { delay: 8,  enemies: [ { kind: "hellhound", count: 9, gap: 0.7 } ] },
  { delay: 18, enemies: [ { kind: "harpy", count: 12, gap: 0.45 } ] },
],
```

**brief (he)**: הכביש הזה לא מתחיל בקצה הלוח — הוא מתחיל בעמודה 5. משמאל לזה יש
רק שדה ריק, ומגדל שעומד שם לא רואה כלום ולא יורה לעולם.

יש 450 זהב, בדיוק תשע קשתות, והלולאה בסטארטר בונה מ־0. הריצי אותה, קראי מה
המנוע אומר על המגדלים הראשונים, ותקני את ה־`range` כך שהחומה תתחיל במקום הנכון.

**starter**
```python
for x in range(9):
    place_tower("archer", x, 3)
```
Verified: nine towers, 450 gold spent, three of them never fire, and the camp is
overrun.

**solution**
```python
for x in range(5, 14):
    place_tower("archer", x, 3)
```
Verified: nine archers at x = 5…13, 450 of 450 spent, 3/3, thirty-seven kills.

**check**
```js
check: {
  kind: "battle",
  also: { kind: "source", mustInclude: ["for", "range("],
          message: { he: "אותה לולאה, טווח אחר — range עם התחלה וסוף",
                     en: "Same loop, different range — range with a start and a stop" } }
}
```

**hints**
1. (he) "הריצי והסתכלי על הלוח בזמן הקרב. יש מגדלים שלא יורים אף פעם — איפה הם
   עומדים, ולמה?"
2. (he) "ל־`range` אפשר לתת שני מספרים: מאיפה להתחיל, ולפני מה לעצור.
   `range(5, 14)` נותן 5 עד 13 — הסוף אף פעם לא נכלל."
3. (he) "הכביש הוא משבצות 5 עד 13, וזה תשע משבצות — בדיוק כמו שיש לך זהב לתשעה
   מגדלים. `range(5, 14)`: מתחיל ב־5, עוצר לפני 14. הטעות הנפוצה היא לכתוב
   `range(5, 13)` ולקבל שמונה מגדלים; ספרי אותם על הלוח אחרי ההרצה."

### b3 — שתי חומות, שתי לולאות / Two Walls, Two Loops · 30 XP, 8 🪙

**Why this mechanic**: the road turns, so **one wall cannot cover it**. Two loops,
two different ranges, two different rows — the same four lines written twice with
different numbers, which is the shape that becomes a function in lesson 13. She
also has to read the map to pick each range: the first leg is columns 0–5 on row
2, the second is columns 6–13 on row 6.

```js
map: { cols: 14, rows: 8,
       path: [[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],
              [5,3],[5,4],[5,5],[5,6],
              [6,6],[7,6],[8,6],[9,6],[10,6],[11,6],[12,6],[13,6]] },
gold: 650, campHp: 3, seed: 43, allowed: ["archer"],
waves: [
  { delay: 0,  enemies: [ { kind: "satyr", count: 18, gap: 0.24 } ] },
  { delay: 9,  enemies: [ { kind: "hellhound", count: 10, gap: 0.7 } ] },
  { delay: 22, enemies: [ { kind: "harpy", count: 14, gap: 0.42 } ] },
],
```

**brief (he)**: הכביש יורד באמצע הגן ומחליף כיוון. הקטע הראשון רץ בשורה 2, מעמודה
0 עד 5. הקטע השני רץ בשורה 6, מעמודה 6 עד 13.

בני **שתי חומות**: אחת בשורה 1 מעל הקטע הראשון, ואחת בשורה 5 מעל הקטע השני,
שמתחילה בעמודה 7. יש 650 זהב — בדיוק שש קשתות בחומה הראשונה ושבע בשנייה.

חומה אחת לא מספיקה כאן, ולא משנה איזו מהשתיים.

**starter**
```python
for x in range(0, 6):
    place_tower("archer", x, 1)
```

**solution**
```python
for x in range(0, 6):
    place_tower("archer", x, 1)

for x in range(7, 14):
    place_tower("archer", x, 5)
```
Verified: thirteen archers, 650 of 650 spent, 3/3, forty-two kills. The first wall
alone is overrun; the second wall alone leaks two.

**check**
```js
check: {
  kind: "battle",
  also: { kind: "source", mustInclude: ["for", "range("],
          message: { he: "שני קטעי כביש, שתי לולאות for — כל אחת עם הטווח והשורה שלה",
                     en: "Two stretches of road, two for loops — each with its own range and row" } }
}
```

**hints**
1. (he) "הריצי עם החומה אחת בלבד וצפי איפה הן עוברות. איזה חלק של הכביש אף
   מגדל לא רואה?"
2. (he) "לולאה שנייה נכתבת מתחת לראשונה, צמודה לשוליים, עם `range` משלה ועם
   מספר שורה אחר בתוך `place_tower`. אפשר להשתמש שוב באותו שם משתנה `x` — הוא
   מתחיל מחדש בכל לולאה."
3. (he) "הלולאה הראשונה: `for x in range(0, 6):` ובתוכה
   `place_tower(\"archer\", x, 1)`. הלולאה השנייה: `for x in range(7, 14):`
   ובתוכה `place_tower(\"archer\", x, 5)`. שימי לב ששתי הלולאות זהות חוץ משני
   מספרים ושורה אחת — תזכרי את התחושה הזאת, בשיעור 13 נהפוך אותה לפונקציה אחת."

### b4 — המראה הסדוקה / The Cracked Mirror · 30 XP, 9 🪙 — **`continue`**

**Why this mechanic**: the wall row and the path **cross**. Column 4 of row 3 is
road, and a tower cannot stand on the road — the build fails, and a failed build
fails the level even when the rest of the defense would have held. So she needs a
loop that runs over every column *and skips one*, which is `continue` and nothing
else. The failure is loud and exact: *"אי אפשר לבנות על השביל עצמו."*

```js
map: { cols: 12, rows: 7,
       path: [[0,5],[1,5],[2,5],[3,5],[4,5],
              [4,4],[4,3],[4,2],[4,1],
              [5,1],[6,1],[7,1],[8,1],[9,1],[10,1],[11,1]] },
gold: 450, campHp: 3, seed: 44, allowed: ["archer"],
waves: [
  { delay: 0,  enemies: [ { kind: "satyr", count: 16, gap: 0.26 } ] },
  { delay: 8,  enemies: [ { kind: "hellhound", count: 9, gap: 0.7 } ] },
  { delay: 20, enemies: [ { kind: "harpy", count: 12, gap: 0.45 } ] },
],
```

**brief (he)**: שורה 3 היא הרכס שבין שני קטעי הכביש: מי שעומד שם רואה גם את
הכביש התחתון וגם את העליון. חומה אחת, כיסוי כפול.

יש רק בעיה אחת. הכביש עולה מלמטה למעלה דרך **עמודה 4**, והמשבצת `(4, 3)` היא
כביש. אי אפשר לבנות עליה, ומגדל אחד שנופל שם מפיל את כל השלב.

עברי על העמודות 0 עד 9, **דלגי על 4 עם `continue`**, ובני על כל השאר. תשע קשתות,
450 זהב.

**starter**
```python
for x in range(10):
    place_tower("archer", x, 3)
```
Verified: the wave is actually held, and the level still fails — the build error
`onPath` at (4, 3) is reported and the objective refuses it. That combination is
the whole point of the level: correct-looking output, failed build.

**solution**
```python
for x in range(10):
    if x == 4:
        continue
    place_tower("archer", x, 3)
```
Verified: nine archers at x = 0, 1, 2, 3, 5, 6, 7, 8, 9 — 450 of 450 spent, 3/3,
thirty-seven kills. Five towers instead of nine are overrun.

**check**
```js
check: {
  kind: "battle",
  also: { kind: "source", mustInclude: ["continue"],
          message: { he: "המשימה הזאת דורשת continue — לדלג על סיבוב אחד, לא לצאת מהלולאה",
                     en: "This one needs continue — skip one lap, do not leave the loop" } }
}
```

**hints**
1. (he) "הריצי כמו שזה. המפלצות לא עברו — ובכל זאת השלב נכשל. קראי את ההודעה:
   על איזו משבצת המנוע מתלונן, ומה יש שם על הלוח?"
2. (he) "`continue` מדלג על שאר הסיבוב הנוכחי וחוזר מיד למעלה לסיבוב הבא. הוא
   צריך לשבת בתוך `if` ששואל אם `x` הוא בדיוק העמודה הבעייתית. `break` לא
   מתאים כאן — הוא היה עוצר את החומה באמצע."
3. (he) "המבנה: `for x in range(10):`, ובתוכו `if x == 4:` עם `continue` מוזח
   בשמונה רווחים, ואחריו — מוזח בארבעה — ה־`place_tower`. סדר השורות חשוב:
   ה־`place_tower` נמצא **אחרי** ה־`if`, ולכן בסיבוב של 4 הוא לא רץ בכלל.
   תשע קשתות במקום עשר, ובדיוק 450 זהב."

### e5 — **side battle, optional** — זאוס ופוסידון / Zeus and Poseidon · 25 XP, 8 🪙

Marked `optional: true`: rendered, rewarded, and never blocking the boss or the
lesson's completion. (`07-curriculum.md` lists this side quest under L8.)

**Why this mechanic**: FizzBuzz, retold as a wall. `%` from lesson 4 decides
which tower goes in each slot, and the order of the chain is load-bearing in
exactly the way FizzBuzz is famous for: column 0 is divisible by both 3 and 5,
so if the `and` test is not first it never runs. The wall she gets is visibly
patterned, which is the reward.

```js
map: { cols: 14, rows: 7, path: [[0,4],[1,4],…,[13,4]] },
gold: 710, campHp: 3, seed: 46, allowed: ["archer", "cannon", "ice", "lightning"],
waves: [
  { delay: 0,  enemies: [ { kind: "satyr", count: 16, gap: 0.26 } ] },
  { delay: 9,  enemies: [ { kind: "hellhound", count: 10, gap: 0.7 } ] },
  { delay: 22, enemies: [ { kind: "cyclops", count: 3, gap: 2.6 } ] },
  { delay: 40, enemies: [ { kind: "harpy", count: 14, gap: 0.4 } ] },
],
optional: true,
```

**brief (he)**: זאוס ופוסידון עדיין רבים, ואי אפשר לבנות עשר משבצות ברצף בלי
שאחד מהם יתערב. עברי על העמודות 0 עד 9 ובני לפי הכלל:

- מתחלק גם ב־3 **וגם** ב־5 → `lightning` (הברק של זאוס, 120)
- מתחלק ב־3 בלבד → `cannon` (הרעם, 90)
- מתחלק ב־5 בלבד → `ice` (הים של פוסידון, 70)
- אחרת → `archer` (50)

יש 710 זהב, וזה בדיוק המחיר של החומה הזאת. אם נשאר לך זהב — סימן שהשרשרת שלך
מסודרת לא נכון.

**solution**
```python
for x in range(10):
    if x % 3 == 0 and x % 5 == 0:
        place_tower("lightning", x, 3)
    elif x % 3 == 0:
        place_tower("cannon", x, 3)
    elif x % 5 == 0:
        place_tower("ice", x, 3)
    else:
        place_tower("archer", x, 3)
```
Verified: lightning at 0; cannons at 3, 6, 9; ice at 5; archers at 1, 2, 4, 7, 8 —
ten towers, 710 of 710 gold spent, 3/3, forty-three kills.

**check**
```js
check: {
  kind: "battle",
  also: { kind: "source", mustInclude: ["for", "elif", "%"],
          message: { he: "הדפוס הזה נבנה בלולאה עם שרשרת elif ועם % — לא עשר שורות נפרדות",
                     en: "This pattern is built with a loop, an elif chain and % — not ten separate lines" } }
}
```

**hints**
1. (he) "'מתחלק ב־3' זה 'שארית החלוקה ב־3 היא 0' — הסימן `%` משיעור 4. ועכשיו
   השאלה החשובה: איזו מארבע הבדיקות חייבת להיות **ראשונה**, ולמה?"
2. (he) "שרשרת `if`/`elif`/`elif`/`else` בתוך הלולאה. הבדיקה של 'גם וגם'
   (`and`) חייבת להיות ראשונה, אחרת עמודה 0 תיתפס על ידי הבדיקה של 3 והברק לא
   ייבנה לעולם."
3. (he) "`if x % 3 == 0 and x % 5 == 0:` ראשונה, אחריה `elif x % 3 == 0:`,
   אחריה `elif x % 5 == 0:`, ולבסוף `else:`. שימי לב ש־0 מתחלק בכל דבר, ולכן
   העמודה הראשונה מקבלת ברק. זה תרגיל מפורסם שנקרא FizzBuzz, ושואלים אותו
   בראיונות עבודה אמיתיים; עכשיו את יודעת לפתור אותו, ובנית ממנו חומה."

## BOSS — גן המדוזה / Medusa's Garden · 60 XP, 16 🪙

```js
boss: {
  name: { he: "מדוזה", en: "Medusa" },
  icon: "🐍",
  hp: 380            // her real HP in the simulation — see Implementation notes
}
```

```js
map: { cols: 14, rows: 8,
       path: [[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],
              [10,5],[10,4],[10,3],
              [9,3],[8,3],[7,3],[6,3],[5,3],[4,3],[3,3],[2,3],
              [2,2],[2,1],
              [3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,1],[13,1]] },
gold: 600, campHp: 3, seed: 48, allowed: ["archer", "cannon", "ice"],
waves: [
  { delay: 0,  enemies: [ { kind: "satyr", count: 10, gap: 0.4 } ] },
  { delay: 12, enemies: [ { kind: "hellhound", count: 8, gap: 0.9 } ] },
  { delay: 28, enemies: [ { kind: "harpy", count: 10, gap: 0.5 } ] },
  { delay: 45, enemies: [ { kind: "medusa", count: 1, gap: 1 },
                          { kind: "cyclops", count: 2, gap: 3 } ] },
],
```

**Framing text (he)**, above the editor: *"אנאבת' מחזיקה את המראה. גרובר כבר
בחוץ. הגן מסודר בשלוש שורות של פסלים, והשביל עובר ביניהן שלוש פעמים. מדוזה
מגיעה אחרונה, עם 380 נקודות חיים ושריון 6 — חץ מוריד ממנה 4. מה שיפיל אותה זה
לא מגדל חזק אחד, אלא כמות: כל מגדל שהיא עוברת לידו יורה בה עוד קצת. בני חומה."*

**Why this mechanic**: the boss is the first monster in the course that cannot be
killed by any single tower — 380 HP behind armour 6, walking a 34-square road.
What kills her is **the total number of towers she walks past**, which is exactly
what a loop produces and hand-placement does not. And both wall rows are crossed
by the path, so both loops need a `continue`. Everything the lesson taught is
load-bearing: `for`, `range(start, stop, step)`, `if`, `continue`.

**The task (he)**

הגן מסודר כך: השביל נכנס בשורה 6 משמאל לימין, עולה בעמודה 10, חוזר שמאלה בשורה
3, עולה שוב בעמודה 2, ויוצא ימינה בשורה 1.

שתי שורות דשא חוצות את כל זה, וכל אחת מהן שומרת על **שני** קטעי כביש בבת אחת:

- **שורה 5** — מעל הכביש התחתון, וקרובה מספיק גם לשורה 3.
- **שורה 2** — בין הכביש של שורה 3 לזה של שורה 1.

יש 600 זהב, שזה שתים־עשרה קשתות. בני בכל אחת מהשורות האלה חומה של קשתות
**בקפיצות של שתיים** — 0, 2, 4… — כי חומה צפופה עולה כפול ואין לך כפול.

ושימי לב לשתי המשבצות שאסור לגעת בהן: `(10, 5)` ו־`(2, 2)` הן כביש, כי שם
השביל עולה. דלגי עליהן.

**starter**
```python
for x in range(0, 14, 2):
    place_tower("archer", x, 5)
```

**solution**
```python
for x in range(0, 14, 2):
    if x == 10:
        continue
    place_tower("archer", x, 5)

for x in range(0, 14, 2):
    if x == 2:
        continue
    place_tower("archer", x, 2)
```
Verified, in the shipped simulation: twelve archers — row 5 at x = 0, 2, 4, 6, 8,
12 and row 2 at x = 0, 4, 6, 8, 10, 12 — 600 of 600 gold spent, camp at 3/3, all
thirty-one monsters dead including Medusa, battle length about 68 seconds.

Three ways to be wrong, all simulated:

| Attempt | What happens |
| --- | --- |
| one wall only (row 5) | leaks 1 — Medusa survives the single wall |
| both walls, no `continue` | build fails on `onPath` at (10, 5) and (2, 2); the level is refused even though the wave is held |
| both walls, all cannons | 540 gold buys ten cannons, the last two placements fail on `tooPoor`, and the harpies fly over every one of them — overrun |

**check**
```js
check: {
  kind: "battle",
  also: { kind: "source", mustInclude: ["for", "range(", "continue"],
          message: { he: "גן שלם נבנה בלולאות: for עם range בקפיצות, ו־continue לשתי המשבצות שהן כביש",
                     en: "A whole garden is built with loops: for with a stepped range, and continue for the two squares that are road" } }
}
```

**hints**
1. (he) "פרקי את זה לשניים וכתבי חומה אחת בכל פעם. הריצי אחרי כל אחת. מה קורה
   כשאת בונה רק את התחתונה — כמה רחוק מדוזה מגיעה? ואיזו משבצת בשורה 5 המנוע
   מסרב לקבל?"
2. (he) "ל־`range` יש מקום לשלושה מספרים: התחלה, עצירה, וקפיצה. `range(0, 14, 2)`
   נותן 0, 2, 4, 6, 8, 10, 12 — שבע משבצות, אבל אחת מהן היא כביש. `continue`
   בתוך `if` מדלג עליה בלי לעצור את החומה. שתי הלולאות זהות חוץ ממספר השורה
   ומהמשבצת שמדלגים עליה."
3. (he) "כך נראית הראשונה:
   ```python
   for x in range(0, 14, 2):
       if x == 10:
           continue
       place_tower(\"archer\", x, 5)
   ```
   שלוש רמות הזחה: 0 ללולאה, 4 לגוף שלה, 8 ל־`continue`. השנייה זהה, עם `2`
   במקום `10` ועם שורה `2` במקום `5`. שש קשתות בכל חומה, שתים־עשרה סך הכול,
   600 זהב בדיוק. מדוזה עוברת ליד כל אחת מהן — לכן כמות מנצחת אותה, ולא כוח."

### Victory

On the kill, the boss cutscene plays (`02-game-design.md`: defeating a boss
unlocks the next act with a short cutscene). Copy (he):

> מדוזה מגיעה עד הפסל האחרון ולא רחוק יותר.
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
- **e1–e5 each carry two checks** — write them with the `also` field, as in
  lesson 1 and as required by `.claude/rules/lesson-authoring.md`:
  ```js
  check: { kind: "source", mustInclude: ["continue"],
           message: { he: "המשימה הזו דורשת continue — לדלג על סיבוב, לא לצאת מהלולאה",
                      en: "This one needs continue — skip a round, do not leave the loop" },
           also: { kind: "output", mode: "normalized", expect: "Row 1 checked\n…" } }
  ```
  The boss uses a single `cases` check with no `also`.
- **`source` checks read a stripped skeleton** (comments and string literals
  removed). `for `, `range(` and `continue` all sit outside literals and survive
  stripping, so no check in this lesson needs `raw: true`. This is also why e2's
  `mustInclude: ["for "]` cannot be satisfied by a comment reading
  `# for each row` — the comment is gone before matching, which is exactly the
  behaviour that exercise needs.
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
