# Lesson 07 — Past the Sirens · מעבר לסירנות

> **Act II — The Lightning Thief · גנב הברק** · Stop 7 of 20
> Structure follows `spec/lessons/lesson-01.md`. Schema: `spec/04-lesson-template.md`.

| | |
| --- | --- |
| **id** | `07` |
| **slug** | `past-the-sirens` |
| **minutes** | 30–35 |
| **concepts** | `while`, loop conditions, counters, accumulators, `break`, infinite loops |
| **new vocabulary** | `while`, `break`, לולאה / loop, צובר / accumulator |
| **requires** | L1–L4 · L5 booleans (the loop condition) · **L6 indentation and `if`** (the loop body is a block; `break` lives inside an `if`) |
| **item** | 🕯️ שעוות הסירנות / The Sirens' Wax |
| **XP** | 20 + 25 + 30 + 30 (training) + 55 (quest) + 30 (bonus) = **190** |
| **drachmas** | 5 + 6 + 8 + 9 + 15 = **43** 🪙 |

## Teaching goal

By the end she can write a loop that repeats until a condition changes, and she
can build a value up across the repetitions.

The one idea: **repetition with a condition.** A `while` loop is an `if` that
asks again every time it finishes the block. She already owns the condition
(lesson 5) and the block (lesson 6), so the only new thing is *going back up*.

**The second, non-negotiable goal is emotional**: she must hit an infinite loop
in this lesson, on purpose, in a safe moment, and learn that nothing broke. A
learner who has never seen the 5-second message will one day hit it alone and
conclude she destroyed her computer. Here, Chiron does it to her first, with a
warning and a joke.

## Story beat

The chosen road ends at the sea. A borrowed fishing boat, three passengers, and
between them and the western coast lies a narrow strait between two cliffs —
the place where the Sirens sing. The wax goes in their ears. Then there is
nothing to do but row: the same stroke, again, and again, and again, and the
only question that matters is *until when*.

Cast: Annabeth (asks the question that becomes the loop condition), Grover
(rows, complains, counts out loud), the Sirens (heard, never seen).

**Prophecy panel**:

> הדרך שבחרת מסתיימת במים.
> אנאבת' מצביעה על המצר הצר בין שני הצוקים: "שם שרות הסירנות."
> "אי אפשר לעבור בחתירה אחת," אומר גרובר, "צריך לחתור. שוב. ושוב. ושוב."
> "עד מתי?" את שואלת.
> אנאבת' מחייכת: "זו בדיוק השאלה הנכונה."
> "לולאה בלי השאלה הזאת פשוט לא נעצרת."

## Chiron Teaches — block by block

1. **prose** — נניח שצריך להדפיס "Row." שלושים פעם. אפשר להעתיק שורה שלושים
   פעם. עכשיו נניח שהמספר הוא לא שלושים אלא "עד שנעבור את הסלעים", ואף אחד לא
   יודע כמה זה. אי אפשר להעתיק שורה מספר לא ידוע של פעמים. כירון: "גיבורה לא
   סופרת משוטים. היא יודעת מתי להפסיק."

2. **code · runnable** — the first loop. First 60 seconds.
   ```python
   strokes = 0
   while strokes < 3:
       print("Row.")
       strokes = strokes + 1
   print("Past the rocks.")
   ```
   Output (verified):
   ```
   Row.
   Row.
   Row.
   Past the rocks.
   ```
   Caption (he): "שלוש שורות `Row.` מתוך שורת `print` אחת. כתבת אותה פעם אחת
   והיא רצה שלוש פעמים."

3. **prose** — Anatomy. `while` נראה בדיוק כמו `if` — מילה, שאלה, נקודתיים,
   בלוק מוזח. ההזחה עובדת בדיוק כמו אתמול. **ההבדל היחיד**: `if` בודק פעם אחת
   ומתקדם. `while` בודק, מריץ את הבלוק, ואז **חוזר למעלה ובודק שוב** — וכך עד
   שהתשובה `False`. אז ורק אז הוא ממשיך לשורה הבאה.

4. **callout · tip** — title: שלושת החלקים של כל לולאה.
   text: בכל לולאה שתכתבי בחיים שלך יש שלושה דברים, ואם אחד מהם חסר משהו יישבר:
   1. **ערך התחלתי** — `strokes = 0`, לפני הלולאה.
   2. **שאלה** — `while strokes < 3:`, שמסתכלת על אותו משתנה.
   3. **שורה בתוך הבלוק שמזיזה את הערך** — `strokes = strokes + 1`.
   כשמשהו לא עובד, עברי על שלושתם לפי הסדר. זה מוצא כמעט כל באג של לולאה.

5. **callout · warn** — title: `strokes = strokes + 1` הוא לא משוואה.
   text: בשיעורי מתמטיקה `x = x + 1` הוא שטות — אין מספר ששווה לעצמו ועוד אחת.
   בפייתון זו לא משוואה, זו **פקודה**, וקוראים אותה מימין לשמאל: "קחי את הערך
   שיש עכשיו ב־`strokes`, הוסיפי לו 1, ושימי את התוצאה בחזרה ב־`strokes`."
   הצד הימני מחושב קודם. תמיד.

6. **code · runnable** — a countdown, using an f-string from lesson 3.
   ```python
   distance = 5
   while distance > 0:
       print(f"Distance: {distance}")
       distance = distance - 1
   print("The strait.")
   ```
   Output (verified): `Distance: 5` … `Distance: 1`, then `The strait.`
   Caption (he): "אותם שלושה חלקים, רק שהפעם הערך יורד במקום לעלות. `>` במקום
   `<`, ו־`- 1` במקום `+ 1`."

7. **error — the infinite loop.** The centre of the lesson. Introduce it with a
   line of prose first: *"עכשיו כירון ישבור את זה בכוונה. שום דבר לא ייהרס,
   ולכן כדאי שזה יקרה כאן ולא בשתיים בלילה."*
   ```python
   strokes = 0
   while strokes < 3:
       print("Row.")
   ```
   What happens (verified): the program prints `Row.` thousands of times and
   then the engine stops it. The underlying error is
   ```
   TimeLimitError: Program exceeded run time limit. on line 3
   ```
   and the engine renders it as:
   > ⏳ **הקוד רץ יותר מ־5 שניות, אז עצרתי אותו.**
   > כנראה יש לולאה שלא נגמרת. משהו בתוך הבלוק של ה־`while` חייב לשנות את
   > המשתנה שהתנאי בודק. שום דבר לא נשבר — לחצי הרצה שוב אחרי שתתקני.

   explain (he): `strokes` נשאר 0 לנצח, כי אף שורה בבלוק לא נוגעת בו. השאלה
   `0 < 3` תמיד `True`, אז פייתון חוזר למעלה שוב ושוב לתמיד. **הלשונית שלך
   בסדר, המחשב בסדר, והקוד שלך לא הרס כלום** — המנוע פשוט הפסיק אחרי חמש שניות
   ואמר לך בדיוק מה קרה. החלק החסר הוא החלק השלישי מהרשימה למעלה.

8. **compare** — the missing line, isolated.
   - **bad**
     ```python
     strokes = 0
     while strokes < 3:
         print("Row.")
     ```
     label (he): "רץ לנצח. המשתנה שהתנאי בודק לא משתנה לעולם."
   - **good**
     ```python
     strokes = 0
     while strokes < 3:
         print("Row.")
         strokes = strokes + 1
     ```
     label (he): "שורה אחת נוספת — וזו השורה שמסיימת את הלולאה."

9. **callout · warn** — title: שלוש שאלות לפני שאת מריצה `while`.
   text:
   1. מה הערך של המשתנה **לפני** הלולאה?
   2. איזו שורה **בתוך** הבלוק משנה אותו?
   3. האם השינוי הזה יגרום לתנאי להיות `False` בסופו של דבר?
   אם אין לך תשובה לאחת מהשלוש, אל תריצי עדיין. (וגם אם הרצת — חמש שניות ונחזור
   לפה.)

10. **prose + code · runnable** — the accumulator (צובר). משתנה שגדל בכל סיבוב
    ושומר סיכום.
    ```python
    strokes = 0
    total_metres = 0
    while strokes < 6:
        total_metres = total_metres + 4
        strokes = strokes + 1
    print(f"{strokes} strokes, {total_metres} metres")
    ```
    Output (verified): `6 strokes, 24 metres`
    Explain (he): יש פה שני משתנים ולכל אחד תפקיד אחר. `strokes` הוא **מונה** —
    הוא קיים כדי לדעת מתי לעצור. `total_metres` הוא **צובר** — הוא קיים כדי
    לזכור את הסכום. שניהם מאותחלים ל־0 לפני הלולאה, כי אי אפשר להוסיף למשהו
    שעוד לא קיים. הצובר הוא התבנית שתחזור בכל שיעור מכאן ועד סוף הקורס.

11. **error — the counter that misses.** Deeper than it looks, and it saves her
    an hour some day.
    ```python
    strokes = 0
    while strokes != 5:
        print("Row.")
        strokes = strokes + 2
    ```
    Result (verified): `TimeLimitError` again.
    explain (he): הפעם יש שורה שמזיזה את המשתנה — ובכל זאת הלולאה לא נגמרת.
    `strokes` עובר 0, 2, 4, 6, 8… **והוא אף פעם לא שווה ל־5 בדיוק.** התנאי
    `!= 5` נשאר `True` לנצח. הכלל שנולד מפה: **כשסופרים, עדיף `<` על פני `!=`.**
    `while strokes < 5` היה נעצר על 6 בלי בעיה, כי `<` סולח לקפיצה מעל המספר.

12. **prose + code · runnable** — `break`. לצאת מהלולאה מיד, גם כשהתנאי עדיין
    `True`.
    ```python
    strokes = 0
    while strokes < 100:
        strokes = strokes + 1
        print(f"Stroke {strokes}")
        if strokes == 3:
            print("The song stops. We are past.")
            break
    print("Grover takes the oars.")
    ```
    Output (verified):
    ```
    Stroke 1
    Stroke 2
    Stroke 3
    The song stops. We are past.
    Grover takes the oars.
    ```
    Explain (he): התנאי אמר 100, אבל `break` קטע את הלולאה בסיבוב השלישי.
    שימי לב איפה `break` יושב: **בתוך `if`, בתוך הלולאה** — שמונה רווחים. `break`
    בלי `if` היה עוצר את הלולאה בסיבוב הראשון, וזו לולאה שרצה פעם אחת בדיוק.

13. **prose + code · runnable** — `while True:`, with a warning attached.
    ```python
    wax = 3
    while True:
        wax = wax - 1
        print(f"Wax left: {wax}")
        if wax == 0:
            break
    ```
    Output (verified): `Wax left: 2`, `Wax left: 1`, `Wax left: 0`.
    Explain (he): `True` הוא תנאי שתמיד נכון, אז הלולאה הזו לא נעצרת מעצמה
    לעולם — **ה־`break` הוא הדבר היחיד שמוציא ממנה.** זו תבנית אמיתית שמתכנתות
    משתמשות בה כשהיציאה נמצאת באמצע הבלוק ולא בהתחלה שלו.

14. **callout · warn** — title: `while True` בלי `break` שאפשר להצביע עליו.
    text: לפני שאת מריצה `while True:`, מצאי בעיניים את השורה שכתוב בה `break`
    ושאלי: האם היא באמת יכולה לרוץ? אם היא בתוך `if` שלעולם לא יהיה `True`,
    קיבלת לולאה אינסופית עם תחפושת. חמש שניות ונדע.

15. **callout · myth** — title: הסירנות ואודיסאוס.
    text: באודיסיאה, אודיסאוס רצה לשמוע את שירת הסירנות ולהישאר בחיים. הוא אטם
    את אוזני המלחים בשעווה כדי שיוכלו לחתור, וביקש שיקשרו אותו עצמו לתורן כדי
    שיוכל לשמוע בלי לקפוץ למים. זו אחת התוכניות הראשונות בהיסטוריה שכתובה כמו
    לולאה: תחתרו, אל תקשיבו, אל תשחררו אותי — עד שנעבור.

## Try It (ungraded)

Intro (he): *"התור שלך על המשוטים. שני את `oars` והריצי — כמה משוטים צריך כדי
לעבור בשלוש חתירות? ואז, כשאת מוכנה, **שני את `oars` ל־0 והריצי בכוונה.**
תקבלי הודעה אחרי חמש שניות. זה בדיוק מה שאמור לקרות, ושום דבר לא נשבר."*

```python
oars = 2
strokes = 0
metres = 0

while metres < 20:
    strokes = strokes + 1
    metres = metres + oars * 3
    print(f"stroke {strokes}: {metres} m")

print("Past the strait.")
```

Output as shipped (verified):
```
stroke 1: 6 m
stroke 2: 12 m
stroke 3: 18 m
stroke 4: 24 m
Past the strait.
```

Making her trigger the time limit **on purpose, in the ungraded sandbox** is the
single most valuable thirty seconds in Act II. Award the *Loop Survivor*
achievement the first time the engine stops a run — with a friendly toast, never
a warning tone.

## Training exercises

### e1 — Ten strokes · 20 XP, 5 🪙

**brief (he)**: הדפיסי `Row.` בדיוק עשר פעמים — עם לולאה, לא עם עשר שורות
`print`. גרובר סופר בקול והוא לא יסכים ל־11.

**starter**
```python
strokes = 0

# the loop goes here
```

**solution**
```python
strokes = 0
while strokes < 10:
    print("Row.")
    strokes = strokes + 1
```
Verified: exactly ten lines of `Row.`

**check**
```js
{ kind: "output", mode: "normalized",
  expect: "Row.\nRow.\nRow.\nRow.\nRow.\nRow.\nRow.\nRow.\nRow.\nRow." }
```
plus
```js
{ kind: "source", mustInclude: ["while"],
  message: { he: "המשימה הזו דורשת לולאת while — לא עשר שורות print",
             en: "This one needs a while loop, not ten print lines" } }
```

**hints**
1. (he) "יש לך משתנה שמתחיל ב־0. איזו שאלה תשאלי עליו כדי שהלולאה תרוץ בדיוק
   עשר פעמים — ואיזו שורה בתוך הבלוק תדאג שהיא תיעצר?"
2. (he) "`while strokes < 10:` ואז בלוק מוזח עם שתי שורות: ה־`print`, ושורה
   שמעלה את `strokes` באחד."
3. (he) "`strokes` מתחיל ב־0. `while strokes < 10:` נכון לערכים 0 עד 9 — עשרה
   סיבובים. בתוך הבלוק: `print(\"Row.\")` ואז `strokes = strokes + 1`. אם תשכחי
   את השורה השנייה תקבלי את ההודעה של חמש השניות — ועכשיו את כבר יודעת למה."

### e2 — Countdown to the rocks · 25 XP, 6 🪙

**brief (he)**: אנאבת' סופרת בקול את המרחק לסלעים. הדפיסי חמש שורות בצורה
`Distance: 5`, `Distance: 4`, וכן הלאה עד `Distance: 1` — ואז, אחרי הלולאה,
שורה אחת: `The strait.`

**starter**
```python
distance = 5

# count down, then one line after the loop
```

**solution**
```python
distance = 5
while distance > 0:
    print(f"Distance: {distance}")
    distance = distance - 1
print("The strait.")
```

**check**
```js
{ kind: "output", mode: "normalized",
  expect: "Distance: 5\nDistance: 4\nDistance: 3\nDistance: 2\nDistance: 1\nThe strait." }
```

**hints**
1. (he) "הפעם המספר יורד. איזה סימן השוואה מתאים ל'כל עוד נשאר מרחק'? ושימי לב
   איפה השורה האחרונה צריכה לשבת — בתוך הבלוק או צמודה לשוליים?"
2. (he) "`while distance > 0:` ובתוך הבלוק `distance = distance - 1`. את המספר
   עצמו הכניסי לתוך f-string כמו בשיעור 3: `f\"Distance: {distance}\"`."
3. (he) "הלולאה רצה כל עוד `distance` גדול מ־0, כלומר על 5,4,3,2,1 — ונעצרת כשהוא
   מגיע ל־0. `print(\"The strait.\")` נכתב **צמוד לשוליים**, בלי הזחה, כי הוא
   שייך לתוכנית ולא ללולאה. אם תזיחי אותו בטעות תקבלי אותו חמש פעמים."

### e3 — Rowing on empty · 30 XP, 8 🪙 — **accumulator + reasoning**

**brief (he)**: לצוות יש 25 יחידות כוח. כל חתירה עולה 2 יחידות, ואי אפשר לחתור
בלי לפחות 2. חתרו כל עוד אפשר, וספרי כמה חתירות יצאו וכמה כוח נשאר. הדפיסי שורה
אחת בלבד, בסוף, בצורה:

```
12 strokes, 1 strength left
```

חשבי לפני שאת מריצה: כמה חתירות זה יוצא ולמה נשארת יחידה אחת.

**starter**
```python
strength = 25
strokes = 0

# row while there is strength for another stroke
```

**solution**
```python
strength = 25
strokes = 0
while strength >= 2:
    strength = strength - 2
    strokes = strokes + 1
print(f"{strokes} strokes, {strength} strength left")
```
Verified output: `12 strokes, 1 strength left`

**check**
```js
{ kind: "output", mode: "normalized", expect: "12 strokes, 1 strength left" }
```
plus
```js
{ kind: "source", mustInclude: ["while"],
  message: { he: "פה צריך לולאה — התשובה נבנית סיבוב אחרי סיבוב",
             en: "This one needs a loop — the answer is built round by round" } }
```

**hints**
1. (he) "יש פה שני משתנים ושני תפקידים: אחד יורד ואחד עולה. איזה מהם התנאי של
   הלולאה מסתכל עליו? ולמה `>= 2` ולא `> 0`?"
2. (he) "`while strength >= 2:` — כי חתירה דורשת שתי יחידות שלמות. בתוך הבלוק:
   שורה שמורידה 2 מ־`strength`, ושורה שמעלה את `strokes` באחד. ה־`print` אחרי
   הלולאה, צמוד לשוליים."
3. (he) "25 פחות 2, שתים־עשרה פעמים, זה 1 — ועם יחידה אחת כבר אי אפשר לחתור,
   אז התנאי `1 >= 2` נותן `False` והלולאה נעצרת. לכן 12 חתירות ויחידה אחת
   נשארת. את שתי המספרים הדפיסי בשורה אחת עם f-string:
   `f\"{strokes} strokes, {strength} strength left\"`."

### e4 — The wax runs out · 30 XP, 9 🪙 — **`break`**

**brief (he)**: השעווה באוזניים מספיקה לשמונה חתירות בדיוק. כתבי לולאה **בלי
מספר בתנאי** — כלומר `while True:` — שמדפיסה `Stroke 1` עד `Stroke 8`, ובחתירה
השמינית מדפיסה `The wax is gone.` ויוצאת עם `break`.

**starter**
```python
strokes = 0

while True:
    # count, print, and get out at 8
```

**solution**
```python
strokes = 0
while True:
    strokes = strokes + 1
    print(f"Stroke {strokes}")
    if strokes == 8:
        print("The wax is gone.")
        break
```
Verified output: `Stroke 1` … `Stroke 8`, then `The wax is gone.`

**check**
```js
{ kind: "output", mode: "normalized",
  expect: "Stroke 1\nStroke 2\nStroke 3\nStroke 4\nStroke 5\nStroke 6\nStroke 7\nStroke 8\nThe wax is gone." }
```
plus
```js
{ kind: "source", mustInclude: ["while True", "break"],
  message: { he: "המשימה הזו דורשת while True ויציאה עם break",
             en: "This one needs while True and a break to get out" } }
```

**hints**
1. (he) "`while True:` לעולם לא נעצר מעצמו. אז מה חייב להיות בתוך הבלוק כדי
   שהתוכנית הזו תסתיים בכלל? ומתי בדיוק הוא צריך לרוץ?"
2. (he) "`break` יוצא מהלולאה מיד. הוא צריך לשבת בתוך `if` שבודק אם `strokes`
   הגיע ל־8 — כלומר מוזח שמונה רווחים: ארבעה בגלל הלולאה, ארבעה בגלל ה־`if`."
3. (he) "סדר השורות בבלוק חשוב: קודם `strokes = strokes + 1`, אחר כך
   `print(f\"Stroke {strokes}\")`, ורק אז `if strokes == 8:` עם שתי שורות בתוכו
   — ההודעה ו־`break`. אם תעלי את המונה אחרי ה־`print` תקבלי `Stroke 0` בהתחלה."

## Quest — "מעבר לסירנות / Past the Sirens" · 55 XP, 15 🪙

**brief (he)**: המצר באורך 40 מטר. כל חותרת מזיזה את הסירה 3 מטרים בכל חתירה.
כתבי את התוכנית של המעבר:

1. קלטי כמה חותרות יש: `rowers = int(input("How many rowers? "))`
2. חתרו כל עוד לא עברתם 40 מטר. בכל חתירה: העלי את מונה החתירות, הוסיפי למרחק
   `rowers * 3`, והדפיסי `Stroke 1: 12 m` (המספרים לפי המצב).
3. **הסירנות**: אם הגעתם לחתירה 15 ועדיין לא עברתם, הדפיסי
   `The song wins. Turn back.` וצאו מהלולאה עם `break`.
4. אחרי הלולאה: אם המרחק הוא 40 מטר או יותר, הדפיסי
   `Past the Sirens in 4 strokes.` (המספר לפי מספר החתירות בפועל). אם לא עברתם,
   אל תדפיסי כלום נוסף.

**solution**
```python
rowers = int(input("How many rowers? "))
metres = 0
strokes = 0

while metres < 40:
    strokes = strokes + 1
    metres = metres + rowers * 3
    print(f"Stroke {strokes}: {metres} m")
    if strokes == 15:
        print("The song wins. Turn back.")
        break

if metres >= 40:
    print(f"Past the Sirens in {strokes} strokes.")
```

**check** (all four verified against the runtime)
```js
{ kind: "cases", cases: [
  { stdin: ["4"], expect:
    "Stroke 1: 12 m\nStroke 2: 24 m\nStroke 3: 36 m\nStroke 4: 48 m\nPast the Sirens in 4 strokes." },
  { stdin: ["7"], expect:
    "Stroke 1: 21 m\nStroke 2: 42 m\nPast the Sirens in 2 strokes." },
  { stdin: ["2"], expect:
    "Stroke 1: 6 m\nStroke 2: 12 m\nStroke 3: 18 m\nStroke 4: 24 m\nStroke 5: 30 m\nStroke 6: 36 m\nStroke 7: 42 m\nPast the Sirens in 7 strokes." },
  { stdin: ["0"], expect:
    "Stroke 1: 0 m\nStroke 2: 0 m\nStroke 3: 0 m\nStroke 4: 0 m\nStroke 5: 0 m\nStroke 6: 0 m\nStroke 7: 0 m\nStroke 8: 0 m\nStroke 9: 0 m\nStroke 10: 0 m\nStroke 11: 0 m\nStroke 12: 0 m\nStroke 13: 0 m\nStroke 14: 0 m\nStroke 15: 0 m\nThe song wins. Turn back." } ] }
```

**The fourth case is the point of the whole lesson.** With zero rowers the boat
never moves and `metres < 40` stays `True` forever — this is a genuinely
infinite loop, and the `break` at stroke 15 is the only reason the program ends
at all. Say so in the completion text: *"עם אפס חותרות התנאי שלך לעולם לא היה
נהיה `False`. ה־`break` הוא מה שהציל את התוכנית — ובדיוק בשביל זה הוא קיים."*

**hints**
1. (he) "שלושה משתנים לפני הלולאה: מה שקלטת, המרחק, ומונה החתירות. מה מהם צריך
   להתחיל ב־0? ואיזה מהם התנאי של ה־`while` בודק?"
2. (he) "`while metres < 40:` ובתוך הבלוק ארבעה דברים לפי הסדר: מונה, מרחק,
   הדפסה, ואז `if strokes == 15:` עם ההודעה ו־`break`. השורה האחרונה של התוכנית
   היא `if metres >= 40:` — צמוד לשוליים, מחוץ ללולאה."
3. (he) "כך זה מתחיל:
   ```python
   rowers = int(input(\"How many rowers? \"))
   metres = 0
   strokes = 0

   while metres < 40:
       strokes = strokes + 1
       metres = metres + rowers * 3
   ```
   אחרי שתי השורות האלה הוסיפי את ה־`print` עם ה־f-string, ואז את ה־`if` של
   הסירנות. בסוף, מחוץ ללולאה לגמרי, ה־`if metres >= 40:` — הוא נחוץ כי אחרי
   `break` המרחק עדיין קטן מ־40, ואז אין הודעת ניצחון. נסי להריץ עם 0 חותרות
   כשסיימת."

## Reward & Recap

**Item**: 🕯️ **שעוות הסירנות / The Sirens' Wax**
desc (he): "גוש שעווה קטן וחם מהמצר. כל עוד הוא באוזנייך את שומעת רק דבר אחד —
את עצמך סופרת."

**Achievements possible here**
- *Loop Survivor* — the engine stopped a run at the 5-second limit, and she ran
  again afterwards. Awarded with a warm toast, never a scolding one.
- *Accumulator* — first program with both a counter and a running total.
- *Escape Artist* — first working `break`.
- *Persistent* — solved an exercise after five failed runs.

**Recap bullets**
- `while` מריץ את הבלוק שוב ושוב **כל עוד** התנאי `True`, ואז ממשיך הלאה
- לכל לולאה שלושה חלקים: ערך התחלתי, תנאי, ושורה בפנים שמזיזה את הערך
- לולאה אינסופית לא שוברת כלום — המנוע עוצר אחרי 5 שניות ואומר לך מה קרה
- **צובר** הוא משתנה שגדל בכל סיבוב: `total = total + x`, ומאותחל לפני הלולאה
- `break` יוצא מהלולאה מיד, גם כשהתנאי עדיין `True`; כשסופרים, `<` בטוח מ־`!=`

**Next teaser (he)**: *"`while` מצוינת כשאת לא יודעת כמה סיבובים יהיו. מחר
תפגשי לולאה שסופרת לבד — ותצטרכי אותה, כי בגן שמעבר לחוף עומדים פסלים בשורות,
וכולם בפוזה של מישהו שרץ."*

## Common mistakes to anticipate

| She writes | She sees (verified in Skulpt) | Hint / explainer must cover |
| --- | --- | --- |
| no line changes the counter | `TimeLimitError: Program exceeded run time limit.` → the friendly 5-second panel | החלק השלישי חסר: שורה בבלוק שמזיזה את המשתנה של התנאי |
| `strokes + 1` without `strokes =` | same infinite loop | החישוב נעשה ונזרק. צריך `strokes = strokes + 1` כדי לשמור אותו |
| counter line outside the block | same infinite loop | הרווחים קובעים מה בתוך הלולאה. השורה חייבת להיות מוזחת |
| `while strokes != 5:` stepping by 2 | `TimeLimitError` | 0,2,4,6 — אף פעם לא 5 בדיוק. `<` סולח, `!=` לא |
| `while strokes < 10` (no colon) | `SyntaxError: bad input on line N` | נקודתיים בסוף שורת ה־`while` |
| body not indented | `SyntaxError: bad input on line N` (CPython: `IndentationError: expected an indented block`) | אחרי `:` חייב לבוא בלוק מוזח — כמו בשיעור 6 |
| `while strokes = 10:` | `SyntaxError: bad input on line N` | `=` נותן, `==` שואל — ובתנאי משתמשים בשאלה |
| `print(strokes)` before `strokes` exists | `NameError: name 'strokes' is not defined` | הערך ההתחלתי נכתב **לפני** הלולאה |
| `break` outside any loop | `SyntaxError: 'break' outside loop on line N` | `break` חי רק בתוך בלוק של לולאה |
| `break` not inside an `if` | הלולאה רצה סיבוב אחד ונעצרת | `break` צריך להיות מוזח בתוך ה־`if` שקובע מתי לצאת |
| final `print` indented into the loop | הודעת הסיום מודפסת בכל סיבוב | הרווחים קובעים; צמוד לשוליים = אחרי הלולאה |

## Implementation notes

- **The 5-second panel is content, not a crash screen.** `engine.js` converts
  Skulpt's `TimeLimitError: Program exceeded run time limit.` into the in-theme
  message quoted in teach block 7. Requirements for that panel:
  - It must **keep and show the output produced so far** (Skulpt streams it via
    `output`, so thousands of `Row.` lines will already be in the buffer). Cap the
    displayed lines at ~200 with a *"…ועוד הרבה"* marker so the page stays
    responsive at 390px.
  - Wording must be calm and blameless. No red, no exclamation-mark alarm, no
    "your program crashed". The word "עצרתי" (I stopped it) puts the agency on
    the engine, not on her.
  - It must fire the *Loop Survivor* achievement, not a warning.
- **`execLimitMs: 5000` is the right number for this lesson** and must not be
  raised for it. The quest's 4th case (`rowers = 0`) completes in well under a
  second because `break` fires at stroke 15 — it is not near the limit. Verified.
- **The Try It block deliberately invites the learner to trigger the limit.** Do
  not add a guard that refuses to run code with a suspicious loop. Detecting the
  problem statically and blocking it would remove exactly the experience this
  lesson exists to provide.
- `+=` is **not** taught here. It is not in this lesson's vocabulary row in
  `07-curriculum.md`, and `strokes = strokes + 1` is the form that makes teach
  block 5 (reading `=` right to left) land. Introduce `+=` no earlier than
  lesson 10, and when you do, introduce it as shorthand for something she
  already writes fluently.
- e1, e3 and e4 each carry two checks (`output` + `source`) — same `all: [...]`
  wrapper question raised in lessons 5 and 6.
- `mustInclude: ["while True", "break"]` in e4 matches `while True:` since the
  colon follows the matched substring. It does not match `while  True` with two
  spaces; the hint text and starter both use the single-space form, and the
  failure `message` names the requirement, so this is acceptable.
- Every code block, solution and expected output in this file was executed
  through the shipped `assets/js/vendor/skulpt.min.js` with
  `__future__: Sk.python3` and a 5000 ms `execLimit`.
