# Lesson 07 — Past the Sirens · מעבר לסירנות

> **Act II — The Lightning Thief · גנב הברק** · Stop 7 of 20
> Structure follows `spec/lessons/lesson-01.md`. Schema: `spec/04-lesson-template.md`.
> **The game is the course**: the graded work is five battle levels.
> Level schema and API: `spec/09-battle-game.md`. Control model: **build script**
> (`place_tower`, `get_gold`, `tower_cost`, `get_wave`, `get_map`, `camp_hp`).

| | |
| --- | --- |
| **id** | `07` |
| **slug** | `past-the-sirens` |
| **minutes** | 30–35 |
| **concepts** | `while`, loop conditions, counters, accumulators, `break`, infinite loops |
| **new vocabulary** | `while`, `break`, לולאה / loop, צובר / accumulator |
| **requires** | L1–L4 · L5 booleans (the loop condition) · **L6 indentation and `if`** (the loop body is a block; `break` lives inside an `if`) |
| **item** | 🕯️ שעוות הסירנות / The Sirens' Wax |
| **XP** | 20 + 25 + 30 + 30 (training battles) + 55 (great battle) + 30 (bonus) = **190** |
| **drachmas** | 5 + 6 + 8 + 9 + 15 = **43** 🪙 |
| **towers** | 🏹 archer (50) · 💣 cannon (90) |
| **mechanic** | `get_gold()` falls as she builds — the loop condition is the treasury |

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

**Why the battles are about money.** `get_gold()` is not a constant — it drops by
the tower's price every time `place_tower` runs, inside her own script, before the
wave starts. So the loop she writes today has a condition that the loop body
actually changes, which is the whole idea of `while` and is usually taught with a
counter that means nothing. Here the counter is her purse, and the loop stops
because she is broke. She also never has to be told how many towers she can
afford: the loop works it out, which is the first time in the course that the
program knows something she does not.

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
> "לולאה בלי השאלה הזאת לא נעצרת לעולם."

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
   בסדר, המחשב בסדר, והקוד שלך לא הרס כלום** — המנוע עצר אחרי חמש שניות
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

15. **prose + code · runnable** — the bridge into the battles: a loop that
    spends. This is the shape of every level in this lesson, on the training
    field where nothing can be lost.
    ```python
    towers = 0
    while get_gold() >= tower_cost("archer"):
        place_tower("archer", towers, 3)
        towers = towers + 1
    print(f"{towers} towers, {get_gold()} gold left")
    ```
    Output on the training field (500 gold): `10 towers, 0 gold left`.
    Explain (he): שלושת החלקים נמצאים כאן, אבל שימי לב מי משנה את הערך:
    **`place_tower` עצמו**. כל בנייה מורידה 50 מהקופה, ולכן `get_gold()` בשאלה
    של ה־`while` הוא לא מספר קבוע — הוא מצב שהלולאה משנה בעצמה. `towers` הוא
    צובר שסופר כמה נבנו, וגם משמש כמיקום. אף אחד לא אמר לך שיוצאים עשרה מגדלים.

16. **callout · warn** — title: לולאה שלא מוציאה כסף לא נגמרת.
    text: אם תמחקי את שורת ה־`place_tower` מהלולאה למעלה — או תשכחי אותה
    בהתחלה — הזהב לא יירד לעולם, השאלה תישאר `True` לנצח, ותקבלי את הודעת חמש
    השניות. זו לא תקלה; זו בדיוק אותה לולאה אינסופית מהבלוק למעלה, בתחפושת של
    בנייה.

17. **callout · myth** — title: הסירנות ואודיסאוס.
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

## Training battles

Four battles and a great battle, all on the **build-script** model, and all of
them built on one fact about the API:

> **`get_gold()` goes down every time she places a tower.** It is not a constant
> she reads once — it is the state of her treasury, right now, in the middle of
> her own script. So `while get_gold() >= tower_cost("archer"):` is a condition
> that genuinely changes underneath the loop, and the loop genuinely stops.

That is why the battle mechanic for `while` is *spending*. She does not know how
many towers 250 gold buys — the loop finds out. And the third part of every loop,
the line that moves the value, is here a `place_tower` call: **the thing that
makes progress and the thing that does the work are the same line.** A loop with
no `place_tower` inside it never spends, never ends, and hits the five-second
limit — which this lesson wants her to see.

Each level is `check.kind: "battle"` with an `also` `source` rule requiring the
loop, so a hand-typed row of towers does not pass.

### b1 — כל עוד יש זהב / While There Is Gold · 20 XP, 5 🪙

**Why this mechanic**: the loop condition is a real question about the world
(`get_gold() >= tower_cost("archer")`), and the loop body is what changes the
answer. She never counts the towers — she cannot, because she does not know the
price by heart. Five towers get built and she wrote one.

The starter is the lesson's second gift: the loop is there, the counter move is
missing, so every tower lands on the same square. The engine says so —
*"כבר יש מגדל במשבצת הזאת. כל מגדל צריך משבצת משלו."* — and that is a much
kinder first loop bug than an infinite one.

```js
map: { cols: 12, rows: 7, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4]] },
gold: 250, campHp: 3, seed: 31, allowed: ["archer"],
waves: [
  { delay: 0,  enemies: [ { kind: "satyr", count: 10, gap: 0.35 } ] },
  { delay: 7,  enemies: [ { kind: "hellhound", count: 5, gap: 1.0 } ] },
  { delay: 16, enemies: [ { kind: "harpy", count: 8, gap: 0.6 } ] },
],
```

**brief (he)**: המצר צר והכביש ישר. שלושה גלים, 250 זהב, וקשתות בלבד.

הלולאה כבר כתובה: **כל עוד יש מספיק זהב לקשת — בני קשת.** אבל כל המגדלים נבנים
בדיוק באותה משבצת, כי `x` לא זז אף פעם. הוסיפי בתוך הבלוק שורה שמזיזה את `x`
שתי משבצות ימינה, והריצי.

ארבעה מגדלים לא יספיקו כאן. אל תספרי — תני ללולאה לספור.

**starter**
```python
x = 1

while get_gold() >= tower_cost("archer"):
    place_tower("archer", x, 3)
```
Verified behaviour: it terminates (gold drops with every placement) and loses —
one tower is built and four `occupied` build errors are reported.

**solution**
```python
x = 1

while get_gold() >= tower_cost("archer"):
    place_tower("archer", x, 3)
    x = x + 2
```
Verified: five archers at x = 1, 3, 5, 7, 9, 250 of 250 gold spent, 3/3,
twenty-three kills. Four archers placed by hand leak two.

**check**
```js
check: {
  kind: "battle",
  also: { kind: "source", mustInclude: ["while", "get_gold"],
          message: { he: "המשימה הזאת דורשת לולאת while שבודקת את הזהב — לא חמש שורות place_tower",
                     en: "This one needs a while loop that asks about the gold — not five place_tower lines" } }
}
```

**hints**
1. (he) "הריצי כמו שזה. כמה מגדלים את רואה על הלוח, וכמה פעמים הלולאה רצה? מה
   המנוע אומר על המשבצת?"
2. (he) "בכל לולאה שלושה חלקים: ערך התחלתי (`x = 1`), שאלה (`while ...`), ושורה
   **בתוך הבלוק** שמזיזה את הערך. החלק השלישי חסר."
3. (he) "הוסיפי `x = x + 2` בתוך הבלוק, מיושר עם ה־`place_tower`. קוראים את זה
   מימין לשמאל: קחי את `x`, הוסיפי 2, שימי בחזרה ב־`x`. עכשיו כל סיבוב בונה
   שתי משבצות ימינה, והזהב יורד ב־50 בכל סיבוב — עד ש־`get_gold()` קטן מ־50
   והשאלה נהיית `False`. חמישה מגדלים, ולא כתבת אף מספר."

### b2 — מהשער אחורה / Back from the Gate · 25 XP, 6 🪙

**Why this mechanic**: the same loop, counting **down**. `x = x - 2` and a
condition that looks at the position instead of the purse — so she meets the
second shape of the same three parts, and learns that the loop variable can be
whatever the job needs. Building from the gate backwards is also how a real
defense gets planned: the last line of towers is the one that must never be thin.

```js
map: { cols: 12, rows: 7, path: [[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2],[11,2]] },
gold: 250, campHp: 3, seed: 32, allowed: ["archer"],
waves: [   // the same three waves as b1
  { delay: 0,  enemies: [ { kind: "satyr", count: 10, gap: 0.35 } ] },
  { delay: 7,  enemies: [ { kind: "hellhound", count: 5, gap: 1.0 } ] },
  { delay: 16, enemies: [ { kind: "harpy", count: 8, gap: 0.6 } ] },
],
```

**brief (he)**: אותם שלושה גלים, כביש חדש, ואותם 250 זהב — אבל הפעם בונים
מהשער אחורה. התחילי ב־`x = 10`, שזו המשבצת הכי קרובה לשער, וחזרי אחורה שתי
משבצות בכל סיבוב, **כל עוד `x` גדול מ־0**. המגדלים יושבים בשורה 3.

**starter**
```python
x = 10

# while there is still road behind you
```

**solution**
```python
x = 10

while x > 0:
    place_tower("archer", x, 3)
    x = x - 2
```
Verified: five archers at x = 10, 8, 6, 4, 2, 250 of 250 spent, 3/3,
twenty-three kills. Three towers at the gate end are overrun.

**check**
```js
check: {
  kind: "battle",
  also: { kind: "source", mustInclude: ["while"],
          message: { he: "פה צריך לולאה — היא זו שיודעת כמה מגדלים נכנסים",
                     en: "This one needs a loop — it is what works out how many towers fit" } }
}
```

**hints**
1. (he) "המספר יורד הפעם. איזה סימן השוואה מתאים ל'כל עוד נשאר כביש'? ומה קורה
   אם תשאלי `while x != 0` ותורידי 3 בכל פעם?"
2. (he) "`while x > 0:` ובתוך הבלוק `x = x - 2`. שימי לב ש־`>` סולח לקפיצה מעל
   המספר ו־`!=` לא — 10, 8, 6, 4, 2, ואז 0 עוצר את הלולאה."
3. (he) "`x` מתחיל ב־10. הלולאה בונה ב־10, 8, 6, 4, 2 — חמישה מגדלים, בדיוק 250
   זהב. אחרי הסיבוב החמישי `x` הוא 0, השאלה `0 > 0` נותנת `False`, והלולאה
   נעצרת לבד. אם תשני ל־`x = x - 3` תקבלי פחות מגדלים ותראי מפלצות עוברות — נסי."

### b3 — קודם התותחים / Cannons First, Then the Rest · 30 XP, 8 🪙

**Why this mechanic**: **two loops, one purse.** The first spends down to a
reserve, the second spends what is left. The second loop's condition depends on
what the first loop did, which is impossible to write with hand-counted towers
and trivial with a loop. The ridge has room for six towers only (`maxTowers: 6`),
so buying well matters: against armour 5 a cannon is worth nearly two archers per
slot, and the harpies at the end mean the cannons cannot be the whole answer.

```js
map: { cols: 12, rows: 7, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4]] },   // the straight road from b1
gold: 400, campHp: 3, seed: 33, allowed: ["archer", "cannon"],
waves: [
  { delay: 0,  enemies: [ { kind: "hellhound", count: 6, gap: 1.0 } ] },
  { delay: 12, enemies: [ { kind: "cyclops", count: 4, gap: 3.0 } ] },
  { delay: 30, enemies: [ { kind: "harpy", count: 8, gap: 0.6 } ] },
],
check: { kind: "battle", maxTowers: 6, also: [ … see below … ] },
```

**brief (he)**: כירון רוצה גם דוח: בסוף התוכנית, שורה אחת שאומרת כמה תותחים
וכמה קשתות נבנו, בצורה `2 cannons, 4 archers`. את המספרים אל תכתבי ביד — ספרי
אותם עם **צובר**: משתנה שמתחיל ב־0 לפני הלולאה וגדל בכל סיבוב.

על הרכס יש מקום לשישה מגדלים בלבד — לא שבעה. ארבעה קיקלופים
מגיעים בגל השני, ולכל אחד מהם שריון 5: חץ מוריד לו 5 נקודות, פגז מוריד 23.
ובגל השלישי מגיעות הרפיות, ופגז לא פוגע במשהו שעף.

יש 400 זהב. כתבי **שתי לולאות**:

1. כל עוד נשארו לפחות 250 זהב — בני תותח, וזוזי ארבע משבצות ימינה. (זה משאיר
   רזרבה בכוונה. תותח עולה 90, אז הלולאה תבנה שניים ותעצור.)
2. כל עוד אפשר לקנות קשת — בני קשת בשורה 5, וזוזי שלוש משבצות ימינה.

שתים־עשרה קשתות היו מנצחות את הגל הזה, אבל אין מקום לשתים־עשרה.

**starter**
```python
cannons = 0
x = 3

while get_gold() >= 250:
    place_tower("cannon", x, 3)
    cannons = cannons + 1
    x = x + 4
```

**solution**
```python
cannons = 0
x = 3

while get_gold() >= 250:
    place_tower("cannon", x, 3)
    cannons = cannons + 1
    x = x + 4

archers = 0
y = 1
while get_gold() >= tower_cost("archer"):
    place_tower("archer", y, 5)
    archers = archers + 1
    y = y + 3

print(f"{cannons} cannons, {archers} archers")
```
Verified: cannons at (3,3) and (7,3), archers at (1,5), (4,5), (7,5), (10,5) —
six towers, 380 of 400 gold spent, 3/3, sixteen kills, and the log reads
`2 cannons, 4 archers`. Two cannons alone are
overrun by the harpies. Eight hand-placed archers hold the wave and still fail
the level, on `maxTowers`. Six archers leak one.

**check**
```js
check: {
  kind: "battle",
  maxTowers: 6,
  also: [
    { kind: "source", mustInclude: ["while", "get_gold"],
      message: { he: "שתי לולאות while שמסתכלות על הזהב — הראשונה על התותחים, השנייה על מה שנשאר",
                 en: "Two while loops that watch the gold — the first for cannons, the second for what is left" } },
    { kind: "output", mode: "contains", expect: "2 cannons, 4 archers",
      message: { he: "חסר הדוח בסוף: שורה אחת עם מספר התותחים ומספר הקשתות, שנספרו בצוברים",
                 en: "The report at the end is missing: one line with the cannon and archer counts, both counted with accumulators" } },
  ],
}
```

**hints**
1. (he) "הריצי את הלולאה שכבר כתובה. כמה תותחים נבנו, וכמה זהב נשאר אחריה?
   ומה השאלה הנכונה ללולאה השנייה — אותה שאלה, או שאלה אחרת?"
2. (he) "הלולאה השנייה נראית כמו זו של b1: `while get_gold() >= tower_cost(\"archer\"):`
   עם משתנה מיקום משלה. שני משתנים נפרדים, `x` ו־`y`, כי שתי הלולאות בונות בשתי
   שורות שונות — ושני צוברים נפרדים, `cannons` ו־`archers`, כי הדוח מבדיל
   ביניהם."
3. (he) "אחרי הלולאה הראשונה נשארו 220 זהב — 400 פחות שני תותחים. הלולאה השנייה
   מתחילה ב־`y = 1`, בונה ב־1, 4, 7, 10, ונעצרת כשנשארים 20. ביחד: שישה מגדלים
   בדיוק, וזה כל מה שהרכס נותן. הדוח בסוף נכתב עם f-string משיעור 3:
   `print(f\"{cannons} cannons, {archers} archers\")`, צמוד לשוליים, אחרי שתי
   הלולאות. אם תעלי את הרזרבה מ־250 ל־150 תקבלי שלושה
   תותחים ופחות קשתות — נסי, וראי מי עובר."

### b4 — עד שהשעווה נגמרת / Until the Wax Runs Out · 30 XP, 9 🪙

**Why this mechanic**: `while True:` with the exit **inside an `if`, inside the
loop** — eight spaces of indentation carrying real meaning. The starter hands her
a `break` that is not inside an `if`, so the loop runs exactly once, one tower
gets built, and the camp falls. Seeing "a `break` that always fires is a loop that
never loops" is worth more than any explanation of it.

```js
map: { cols: 12, rows: 7, path: [[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2],[11,2]] },   // the row-2 road from b2
gold: 250, campHp: 3, seed: 34, allowed: ["archer"],
waves: [   // the same three waves as b1
  { delay: 0,  enemies: [ { kind: "satyr", count: 10, gap: 0.35 } ] },
  { delay: 7,  enemies: [ { kind: "hellhound", count: 5, gap: 1.0 } ] },
  { delay: 16, enemies: [ { kind: "harpy", count: 8, gap: 0.6 } ] },
],
```

**brief (he)**: השעווה באוזניים מספיקה בדיוק לכמה שהיא מספיקה, ואף אחד לא סופר.
כתבי לולאה **בלי מספר בתנאי** — `while True:` — שבונה קשת, זזה שתי משבצות,
ויוצאת ב־`break` ברגע שאי אפשר לקנות עוד קשת.

השורה שתבדוק את זה היא בדיוק זו שהדפסת בשיעור 5: `get_gold() < tower_cost("archer")`.
היום היא לא מודפסת — היא מחליטה.

**starter**
```python
x = 1

while True:
    place_tower("archer", x, 3)
    x = x + 2
    # what gets you out of here?
    break
```
Verified: runs, builds one tower, camp overrun. The `break` fires on the first
lap because nothing guards it.

**solution**
```python
x = 1

while True:
    place_tower("archer", x, 3)
    x = x + 2
    if get_gold() < tower_cost("archer"):
        break
```
Verified: five archers at 1, 3, 5, 7, 9 — the same wall as b1, reached from the
other direction — 250 of 250 spent, 3/3, twenty-three kills.

**check**
```js
check: {
  kind: "battle",
  also: { kind: "source", mustInclude: ["while True", "break"],
          message: { he: "המשימה הזאת דורשת while True ויציאה עם break",
                     en: "This one needs while True and a break to get out" } }
}
```

**hints**
1. (he) "הריצי כמו שזה. כמה מגדלים נבנו? `while True` אמור לרוץ לנצח — למה הוא
   רץ פעם אחת?"
2. (he) "`break` שלא יושב בתוך `if` רץ תמיד, ולכן הלולאה מסתיימת בסיבוב הראשון.
   הוא צריך שאלה מעליו: `if get_gold() < tower_cost(\"archer\"):`, וה־`break`
   מוזח בתוכה — שמונה רווחים: ארבעה בגלל הלולאה, ארבעה בגלל ה־`if`."
3. (he) "סדר השורות בבלוק: קודם `place_tower`, אחר כך `x = x + 2`, ורק אז ה־`if`
   עם ה־`break` בתוכו. ככה הבדיקה מתבצעת אחרי שהזהב כבר ירד. אם תבדקי לפני
   הבנייה תקבלי מגדל אחד פחות. ואם תמחקי את ה־`break` לגמרי — תקבלי את הודעת
   חמש השניות, וזה בסדר גמור, זה רק אומר שהלולאה לא נגמרת."

## The great battle — "מעבר לסירנות / Past the Sirens" · 55 XP, 15 🪙

```js
map: { cols: 13, rows: 8, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],
                                 [7,4],[8,4],[9,4],[10,4],[11,4],[12,4]] },
gold: 520, campHp: 3, seed: 37, allowed: ["archer", "cannon"],
waves: [
  { delay: 0,  enemies: [ { kind: "satyr", count: 22, gap: 0.22 } ] },
  { delay: 8,  enemies: [ { kind: "hellhound", count: 12, gap: 0.6 } ] },
  { delay: 20, enemies: [ { kind: "harpy", count: 20, gap: 0.3 } ] },
  { delay: 32, enemies: [ { kind: "cyclops", count: 4, gap: 2.6 } ] },
],
```

**Why this mechanic**: fifty-eight monsters and ten towers. Ten `place_tower`
lines would be a chore; two loops are four lines. And the second loop cannot be
written without the first having finished spending — she has no way to know how
much gold reaches it. This is the first battle in the course that would be
genuinely unpleasant to solve by hand, which is the honest argument for loops.

The `break` earns its place too: the first loop has to stop at the edge of the
board, not when the purse empties, or it walks off the map and the build fails.

**brief (he)**: המצר, ארבעה גלים, ושמונים־וכמה שניות של קרב. יש 520 זהב וכביש
באורך שלוש־עשרה משבצות, עם שורת דשא מעליו (שורה 3) ושורה מתחתיו (שורה 5).

1. לולאה ראשונה: בני קשתות בשורה 3 במשבצות אי־זוגיות — 1, 3, 5… — כל עוד יש
   זהב. **צאי ממנה ב־`break` כשעברת את קצה הלוח**, אחרת תנסי לבנות מחוץ למפה
   והבנייה תיכשל.
2. לולאה שנייה: עם מה שנשאר, בני קשתות בשורה 5 במשבצות זוגיות — 2, 4, 6…
3. בסוף, שורה אחת לכירון: `10 towers hold the strait` — כשהמספר נספר בצובר
   אחד שגדל בשתי הלולאות, ולא נכתב ביד.

שש קשתות בשורה אחת לא מחזיקות את הגל הזה. גם שמונה לא.

**starter**
```python
x = 1

while get_gold() >= tower_cost("archer"):
    place_tower("archer", x, 3)
    x = x + 2
```

**solution**
```python
towers = 0

x = 1
while get_gold() >= tower_cost("archer"):
    place_tower("archer", x, 3)
    towers = towers + 1
    x = x + 2
    if x > 11:
        break

y = 2
while get_gold() >= tower_cost("archer"):
    place_tower("archer", y, 5)
    towers = towers + 1
    y = y + 2

print(f"{towers} towers hold the strait")
```
Verified: six archers on row 3 (x = 1…11) and four on row 5 (y = 2, 4, 6, 8) —
ten towers, 500 of 520 gold spent, 3/3, thirty-five kills, log
`10 towers hold the strait`. Six towers in one row
are overrun; eight are overrun. The `break` is load-bearing: without it the first
loop keeps going to x = 13 and beyond, and an off-map placement fails the level
even if the defense holds.

**check**
```js
check: {
  kind: "battle",
  also: [
    { kind: "source", mustInclude: ["while", "break"],
      message: { he: "הקרב הזה דורש לולאות שמוציאות את כל הזהב, ו־break שעוצר את הראשונה בקצה הלוח",
                 en: "This one needs loops that spend the whole purse, and a break that stops the first one at the edge of the board" } },
    { kind: "output", mode: "contains", expect: "10 towers hold the strait",
      message: { he: "חסר הדוח בסוף — שורה אחת עם מספר המגדלים, כשהמספר נספר בצובר",
                 en: "The closing report is missing — one line with the tower count, counted by an accumulator" } },
  ],
}
```

**hints**
1. (he) "הריצי את הלולאה שבסטארטר וצפי. איפה היא מנסה לבנות בסוף, ומה המנוע
   אומר? ואיזה חלק של הלוח נשאר בלי אף מגדל?"
2. (he) "ללולאה הראשונה יש שני תנאי עצירה: הזהב (בשאלה של ה־`while`) והקצה
   (ב־`if` עם `break` בתוך הבלוק). הלולאה השנייה צריכה משתנה מיקום משלה, `y`,
   שמתחיל ב־2. הצובר `towers` מאותחל **לפני** שתיהן וגדל בשתיהן — הוא סופר
   מגדלים, לא סיבובים של לולאה מסוימת."
3. (he) "כך זה מתחיל:
   ```python
   x = 1
   while get_gold() >= tower_cost(\"archer\"):
       place_tower(\"archer\", x, 3)
       x = x + 2
       if x > 11:
           break
   ```
   שימי לב לשלוש רמות ההזחה: 0 ללולאה, 4 לגוף שלה, 8 ל־`break`. אחרי הלולאה
   הזאת נשארו 220 זהב, והלולאה השנייה — צמודה לשוליים, עם `y = 2` לפניה —
   מוציאה מהם ארבע קשתות בשורה 5. הוסיפי `towers = towers + 1` בשני הבלוקים,
   ובסוף `print(f\"{towers} towers hold the strait\")`. עשרה מגדלים, ואת כתבת
   עשר שורות."

## Reward & Recap

**Item**: 🕯️ **שעוות הסירנות / The Sirens' Wax**
desc (he): "גוש שעווה קטן וחם מהמצר. כל עוד הוא באוזנייך את שומעת רק דבר אחד —
את עצמך סופרת."

**Achievements possible here**
- *Loop Survivor* — the engine stopped a run at the 5-second limit, and she ran
  again afterwards. Awarded with a warm toast, never a scolding one.
- *Accumulator* — first program with both a counter and a running total.
- *Escape Artist* — first working `break`.
- *Quartermaster* — won a battle with the treasury emptied by a loop rather than
  by hand (b1, b2, b4).
- *Persistent* — won a battle here after five failed runs.

**Recap bullets**
- `while` מריץ את הבלוק שוב ושוב **כל עוד** התנאי `True`, ואז ממשיך הלאה
- לכל לולאה שלושה חלקים: ערך התחלתי, תנאי, ושורה בפנים שמזיזה את הערך
- לולאה אינסופית לא שוברת כלום — המנוע עוצר אחרי 5 שניות ואומר לך מה קרה
- **צובר** הוא משתנה שגדל בכל סיבוב: `total = total + x`, ומאותחל לפני הלולאה
- `break` יוצא מהלולאה מיד, גם כשהתנאי עדיין `True`; כשסופרים, `<` בטוח מ־`!=`
- `get_gold()` יורד בכל `place_tower` — ולכן הוא תנאי לולאה אמיתי, לא מספר קבוע

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
| `while strokes < 10` (no colon) | `SyntaxError: bad input (line N)` | נקודתיים בסוף שורת ה־`while` |
| body not indented | `SyntaxError: bad input (line N)` (CPython: `IndentationError: expected an indented block`) | אחרי `:` חייב לבוא בלוק מוזח — כמו בשיעור 6 |
| `while strokes = 10:` | `SyntaxError: bad input (line N)` | `=` נותן, `==` שואל — ובתנאי משתמשים בשאלה |
| `print(strokes)` before `strokes` exists | `NameError: name 'strokes' is not defined` | הערך ההתחלתי נכתב **לפני** הלולאה |
| `break` outside any loop | `SyntaxError: 'break' outside loop on line N` | `break` חי רק בתוך בלוק של לולאה |
| `break` not inside an `if` | הלולאה רצה סיבוב אחד ונעצרת | `break` צריך להיות מוזח בתוך ה־`if` שקובע מתי לצאת |
| final `print` indented into the loop | הודעת הסיום מודפסת בכל סיבוב | הרווחים קובעים; צמוד לשוליים = אחרי הלולאה |
| no `place_tower` inside a `get_gold()` loop | הודעת חמש השניות | הזהב יורד רק כשבונים; בלי בנייה התנאי לא משתנה לעולם |
| the position variable never moves | "כבר יש מגדל במשבצת הזאת" והשלב נכשל | הלולאה רצה, אבל כל הסיבובים בונים באותו מקום |
| the loop walks off the board | "המשבצת (x, y) נמצאת מחוץ למפה" | לולאה שרצה על הזהב צריכה גם גבול מיקום — `break` או תנאי שני |
| the loop builds onto the path | "אי אפשר לבנות על השביל עצמו" | הרצף של הלולאה חייב להתאים לצורת השביל |
| more towers than the level allows | ההגנה מחזיקה והשלב עדיין נכשל | `maxTowers` ב־b3: הרכס נותן שישה מקומות, לא שמונה |

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
  raised for it. Every level's solution finishes its build script in a few
  milliseconds; the limit exists for the loops that never end, and hitting it is
  a designed experience, not a failure of the level.
- **Only one loop shape in this lesson can hang.** A loop whose condition is
  `get_gold() >= …` and whose body places a tower always terminates, because
  every lap costs gold. Take the `place_tower` out and it hangs immediately —
  which is exactly what a learner does when she comments a line out to "test
  something". Say so in the b1 hint text.
- **The Try It block deliberately invites the learner to trigger the limit.** Do
  not add a guard that refuses to run code with a suspicious loop. Detecting the
  problem statically and blocking it would remove exactly the experience this
  lesson exists to provide.
- `+=` is **not** taught here. It is not in this lesson's vocabulary row in
  `07-curriculum.md`, and `strokes = strokes + 1` is the form that makes teach
  block 5 (reading `=` right to left) land. Introduce `+=` no earlier than
  lesson 10, and when you do, introduce it as shorthand for something she
  already writes fluently.
- **Every level here was simulated headlessly** through
  `assets/js/battle/{sim,pyapi,play}.js` in a Node VM, the way
  `tools/verify-python.mjs` loads them. For all five: the stated `solution` wins,
  an empty program loses, the solution satisfies its own `also` `source` rule, and
  every starter runs (none of them hangs, and none of them wins).
- **The near-miss builds were simulated too, and they lose.** b1 by hand with four
  archers: 2 leaks. b1's starter with no counter move: one tower and four
  `occupied` errors. b2 with three towers at the gate: overrun. b3 with cannons
  only: overrun by the harpies; with eight archers: the wave is held and the level
  still fails on `maxTowers`; with six archers: 1 leak. b4's starter (a `break`
  outside any `if`): one tower, overrun. The great battle with six towers in one
  row: overrun; with eight: overrun.
- **`maxTowers` needs a diagnose message.** `LC.Battle.objective` already returns
  `reason: "tooManyTowers"`, but `LC.Battle.diagnose` has no branch for it and
  falls through to the generic *"ההגנה החזיקה, אבל לא עמדת בדרישות השלב"*. b3 is
  the first level in the course to use the cap, so add a line to `diagnose`:
  *"בנית N מגדלים, ולרכס הזה יש מקום ל־M בלבד."* Until that exists, b3's brief
  and hints have to carry the whole explanation — which they do, but it is the
  one place in these four lessons where the engine is quieter than it should be.
- **`also` accepts a list, and b3 and the great battle both use one**: a `source`
  rule for the loop plus an `output` rule for the report. `checker.js` runs them
  in order after the battle has been won, and stops at the first failure, so she
  gets one message at a time. Give every rule its own `message` — an unexplained
  "you won but failed" is the worst feedback in the course.
- **The report rules use `mode: "contains"`**, not `normalized`, so she may print
  whatever else she likes around it. The expected strings are
  `"2 cannons, 4 archers"` and `"10 towers hold the strait"`, both produced by
  f-strings from lesson 3 and both verified against the simulated run.
- **The output rule is what makes the accumulator compulsory.** Without it, the
  battles in this lesson would exercise `while` and never touch the counter
  pattern that teach block 10 spends its time on — and the counter is the half of
  `while` that survives into every later lesson.
- **`mustInclude: ["while True", "break"]`** matches `while True:` because the
  colon follows the matched substring. It does not match `while  True` with two
  spaces. The starter and every hint use the single-space form, and the failure
  `message` names the requirement, so this is acceptable.
- **`source` checks read a stripped skeleton** (comments and string literals
  removed). `while`, `while True`, `break` and `get_gold` all sit outside
  literals, so they survive stripping — no check here needs `raw: true`.
- **No `input()` in a battle level**: the script runs once before the wave with
  nothing queued on stdin.
- Every teach-block code sample and every expected output in this file was
  executed through the shipped `assets/js/vendor/skulpt.min.js` with
  `__future__: Sk.python3` and a 5000 ms `execLimit`.
