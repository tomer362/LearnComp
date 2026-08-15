# Lesson 05 — The Oracle's Riddle · חידת האורקל

> **Act II — The Lightning Thief · גנב הברק** · Stop 5 of 20
> Structure follows `spec/lessons/lesson-01.md`. Schema: `spec/04-lesson-template.md`.
> **The game is the course**: the graded work here is five battle levels, not
> exercises. Level schema and the Python API: `spec/09-battle-game.md`.
> Control model: **build script** (`place_tower`, `get_gold`, `tower_cost`,
> `get_wave`, `get_map`, `camp_hp`). No `choose_target`, no classes.

| | |
| --- | --- |
| **id** | `05` |
| **slug** | `the-oracles-riddle` |
| **minutes** | 25–30 |
| **concepts** | `True`/`False`, the `bool` type, `== != < > <= >=`, `and` / `or` / `not` |
| **new vocabulary** | `True`, `False`, `bool`, `==`, `!=`, `<=`, `>=`, `and`, `or`, `not` |
| **requires** | L1 `print`/strings/`#` · L2 variables, `type()` · L3 `input()`, `int()`, f-strings · L4 arithmetic, `%` |
| **item** | 🔮 עדשת האורקל / The Oracle's Lens |
| **XP** | 20 + 25 + 25 + 30 (training battles) + 50 (great battle) + 30 (bonus) = **180** |
| **drachmas** | 5 + 6 + 7 + 8 + 14 = **40** 🪙 |
| **towers** | 🏹 archer (50) · 💣 cannon (90) — the cannon arrives here |
| **monsters** | 🐐 satyr · 🦅 harpy · 🐺 hellhound · 👹 cyclops (armour 5) |

## Teaching goal

By the end she can take any question about her data and make Python answer it
with a value she can store, print, and combine.

The one idea: **`True` and `False` are values, exactly like `7` and `"Zeus"`.**
Not magic, not a special mode — a third kind of thing that variables can hold.

This lesson has **no `if` statement in it**, and that is deliberate. She learns
to *produce* an answer before she learns to *act* on one. Lesson 6 is the whole
reason lesson 5 exists, and lesson 5 is what makes lesson 6 painless. If she
tries to write `if` here, the hint text welcomes the instinct and tells her it
arrives tomorrow.

**In the battles, she is the `if`.** Her program asks the battlefield a question
— `get_gold() >= tower_cost("cannon")` — prints the answer, and *she* reads it
and decides what to build. That is not a workaround for the missing `if`; it is
the honest order of operations. A condition is written before it is wired up,
and lesson 6 wires up the exact expressions she writes today. Level b4's line
`not (get_gold() >= tower_cost("archer"))` becomes lesson 7's loop condition
word for word.

## Story beat

Act II opens. The master bolt of Zeus — the weapon that made thunder itself —
has been stolen from Olympus, and the sky has been the wrong colour since dawn.
Zeus blames Poseidon. Poseidon blames Zeus. Chiron takes her up the creaking
stairs to the attic of the Big House, where the Oracle of Delphi sits among old
trophies and dust.

The Oracle will help. But she does not tell stories, and she does not explain.
She answers questions, and every answer she gives is one of exactly two words.

Cast: Chiron (brings her up the stairs), the Oracle (delivers the act's
prophecy), Annabeth in a callout — she has been asking the Oracle questions for
years and knows the trick is asking a question with only two possible answers.

**Prophecy panel** (rendered as `prophecy.lines`, no code):

> הבוקר הזה התחיל עם רעם בלי ענן אחד בשמיים.
> הברק הראשי של זאוס — הנשק שהרעם עצמו נולד ממנו — נגנב מאולימפוס.
> כירון מוביל אותך במדרגות החורקות אל עליית הגג של הבית הגדול.
> שם יושבת האורקל, ולה יש כלל אחד: היא לא מספרת סיפורים.
> "שאלי אותי שאלה," היא לוחשת, "ואני אענה במילה אחת בלבד."
> "True. או False. הברק חייב לחזור לפני היפוך הקיץ — אז שאלי נכון."

English mirror for the `en` side of each line, same six lines, same rhythm.

## Chiron Teaches — block by block

1. **prose** — עד עכשיו התוכניות שלך *אמרו* דברים. תוכנית שרק אומרת דברים לא
   יכולה להחליט כלום. כדי להחליט, קודם צריך לדעת. כירון: "כל החלטה בעולם
   מתחילה בשאלה שיש לה בדיוק שתי תשובות." (Concrete-before-abstract: no
   definition yet, only the promise.)

2. **code · runnable** — the first comparison. This is what she runs in the first
   60 seconds.
   ```python
   print(3 > 2)
   print(3 < 2)
   ```
   Output:
   ```
   True
   False
   ```
   Caption (he): "פייתון ענה לך. שימי לב שהוא לא הדפיס טקסט שכתבת — הוא הדפיס
   תשובה שהוא חישב."

3. **prose** — Name the rule now, after she has seen it. `True` ו־`False` הם
   **ערכים**, בדיוק כמו `7` או `"Zeus"`. הטיפוס שלהם נקרא `bool` (ערך אמת).
   שתי נקודות שחייבות להיאמר במפורש: אות ראשונה **גדולה**, ובלי גרשיים.
   `"True"` עם גרשיים זה string — טקסט שנראה כמו תשובה אבל אינו תשובה.

4. **code · runnable** — a bool in a variable, plus `type()` from lesson 2.
   ```python
   answer = 10 > 3
   print(answer)
   print(type(answer))
   ```
   Output:
   ```
   True
   <class 'bool'>
   ```
   Caption: "אפשר לשמור תשובה במשתנה בדיוק כמו מספר. `bool` הוא הטיפוס השלישי
   שאת מכירה, אחרי `int` ו־`str`."

5. **compare** — the single most important slide in the lesson: `=` vs `==`.
   - **bad** `drachmas = 10`
     label (he): "`=` **נותן** ערך. זו פקודה: 'שים 10 בתוך drachmas'. זו לא שאלה
     ואין לה תשובה."
   - **good** `drachmas == 10`
     label (he): "`==` **שואל**. זו שאלה: 'האם drachmas שווה ל־10?' והתשובה היא
     `True` או `False`."

   Neither snippet is broken — the `bad` slot is used here for "the one people
   reach for by mistake". Add one line under the compare: שני סימני שווה, כי סימן
   אחד כבר תפוס.

6. **code · runnable** — all six operators at once, on camp data.
   ```python
   campers = 12
   beds = 10
   print(campers == beds)
   print(campers != beds)
   print(campers > beds)
   print(campers < beds)
   print(campers >= 12)
   print(beds <= 9)
   ```
   Output:
   ```
   False
   True
   True
   False
   True
   False
   ```
   Caption: "`!=` זה 'לא שווה'. `>=` זה 'גדול או שווה'. סדר הסימנים קבוע — תמיד
   `>=`, לעולם לא `=>`."

7. **prose + code · runnable** — comparisons work on strings too, and they are
   case-sensitive.
   ```python
   print("Zeus" == "Zeus")
   print("zeus" == "Zeus")
   print("Ares" < "Zeus")
   ```
   Output: `True`, `False`, `True`.
   Explain the third line: על מחרוזות, `<` שואל "מי בא קודם לפי סדר האלף־בית
   האנגלי". `Ares` לפני `Zeus`, ולכן `True`. השורה השנייה היא הסיבה שבגללה
   `"yes"` ו־`"Yes"` הם שני דברים שונים לגמרי בעיני פייתון — זה יחסוך לה שעה
   בשיעור 6.

8. **error** — the type mistake she is statistically most likely to hit, tied
   straight back to `input()` from lesson 3.
   ```python
   print("12" > 3)
   ```
   Real error (verified in Skulpt, identical to CPython 3):
   ```
   TypeError: '>' not supported between instances of 'str' and 'int'
   ```
   Explain (he): פייתון מסרב להשוות טקסט למספר, ובצדק — הוא לא יודע אם התכוונת
   למספר שתים־עשרה או לשתי תווים. הודעת השגיאה אומרת בדיוק את זה: `str` מצד
   אחד, `int` מצד שני. **זה חשוב במיוחד בגלל `input()`** — הוא תמיד מחזיר
   string, גם כשהקלדת מספר. לכן `int(input(...))`, כמו שלמדת בשיעור 3.

9. **prose + code · runnable** — `and`, `or`, `not`. Three words, one job each.
   ```python
   has_sword = True
   has_shield = False
   print(has_sword and has_shield)
   print(has_sword or has_shield)
   print(not has_shield)
   ```
   Output: `False`, `True`, `True`.

10. **callout · tip** — title: "or" באנגלית זה לא "או" בעברית.
    text: `and` דורש ששני הצדדים יהיו `True`. `or` מסתפק בצד אחד — **ואם שניהם
    `True`, התשובה עדיין `True`.** בעברית מדוברת "או" נשמע כמו "אחד מהם ולא
    השניים". בפייתון זה לא כך. `not` הופך תשובה: `not True` הוא `False`.

11. **code · runnable** — comparisons and connectors combined, which is where
    real code lives.
    ```python
    age = 14
    trained = True
    print(age >= 13 and trained)
    print(age > 20 or trained)
    print(not (age > 20))
    ```
    Output: `True`, `True`, `True`.
    Caption: "כל צד של `and` הוא שאלה שלמה בפני עצמה. פייתון פותר קודם את
    השאלות, ואז מחבר את התשובות."

12. **compare** — parentheses. `not` binds tighter than `and`, which binds
    tighter than `or`, and remembering that is not a good use of her memory.
    - **bad** `print(not campers == 12 and beds > 5)`
      label: "עובד, אבל צריך לזכור מי נדבק למי. בעוד שבוע לא תזכרי מה התכוונת."
    - **good** `print((not campers == 12) and (beds > 5))`
      label: "סוגריים אומרים בדיוק מה התכוונת, לך ולמי שיקרא את הקוד. סוגריים
      מיותרים לא עולים כלום."

13. **callout · myth** — title: האורקל של דלפי.
    text: במיתולוגיה היוונית האורקל ישבה מעל סדק באדמה במקדש בדלפי ונשמה אדים
    שעלו ממנו. מלכים וגנרלים הגיעו מכל יוון כדי לשאול אותה שאלה אחת — והתשובות
    שלה היו כל כך דו־משמעיות שאפשר היה לפרש כל אחת מהן לשני כיוונים. פייתון הוא
    אורקל טוב יותר בדיוק בגלל זה: התשובה שלו היא `True` או `False`, ואין דרך
    לפרש אותה לא נכון.

14. **callout · warn** — title: אל תבלבלי בין השאלה לתשובה.
    text: `print(days_left)` מדפיס **כמה** ימים נשארו. `print(days_left < 10)`
    מדפיס **האם** נשארו פחות מעשרה. אלה שתי שאלות שונות ושתי תשובות מטיפוסים
    שונים. אנאבת' אומרת שרוב הבאגים שלה בגיל שלוש־עשרה היו בדיוק פה.

15. **prose + code · runnable** — the bridge into the battles. Three of the game
    words she already owns return **numbers**, and a number on its own does not
    decide anything.
    ```python
    print(get_gold())
    print(tower_cost("cannon"))
    print(get_gold() >= tower_cost("cannon"))
    ```
    On the training field this prints `500`, `90`, `True`. Explain (he): שתי
    השורות הראשונות מדפיסות **כמה**. השלישית מדפיסה **האם** — והיא היחידה שאפשר
    להחליט לפיה. `tower_cost` מחזיר את המחיר בלי שתצטרכי לזכור אותו, וזה חשוב:
    מחיר שנכתב מהזיכרון הוא באג שמחכה לשינוי בטבלת המחירים.

16. **callout · tip** — title: היום את ה־`if`.
    text: התוכנית שלך תחשב את התשובה, תדפיס אותה, ואת תסתכלי עליה ותחליטי מה
    לבנות. זה נשמע כמו חצי עבודה — וזה בדיוק הסדר הנכון. קודם כותבים את השאלה,
    מחר מחברים אותה למי שפועל לפיה. השורות שתכתבי היום יעברו מחר, מילה במילה,
    אחרי המילה `if`.

## Try It (ungraded)

Free-play editor, nothing checked. Intro (he): *"התור שלך לשאול את האורקל. שני
את המספרים ואת ה־`True`/`False` למעלה, הריצי, ותראי איך שלוש התשובות למטה זזות.
שום דבר פה לא נבדק."*

```python
bolt_stolen = True
days_left = 9

print(bolt_stolen)
print(days_left < 10)
print(bolt_stolen and days_left < 3)
```

Output as shipped: `True`, `True`, `False`. Suggested experiment in the intro:
"נסי לשנות את `days_left` ל־2 ולראות איזו שורה מתהפכת."

## Training battles

Four battles, each one a real defense that has to hold. **Lesson 5 is the lesson
where *she* is the `if`**: her program computes an answer, prints it, and she
reads it and decides what to build. Tomorrow the program starts making that
decision by itself, and the expression she writes today is exactly the one that
will sit after the word `if`. Say that out loud in the briefs — it turns "why am
I only printing?" into "I am writing the condition first, and wiring it up
tomorrow".

Every level here is `check.kind: "battle"` with an `also` `source` rule. The
battle is what she watches; the `source` rule is what makes the booleans
compulsory. Both were verified by simulation (see Implementation notes).

### b1 — לוח האיומים / The Threat Board · 20 XP, 5 🪙

**Why this mechanic**: `get_gold()` hands her a **number**. A number does not
tell her whether it is enough — a comparison does. This is the smallest possible
version of that idea, next to a battle she can lose.

```js
map: { cols: 10, rows: 7, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4]] },
gold: 120, campHp: 3, seed: 11, allowed: ["archer"],
waves: [ { delay: 0, enemies: [ { kind: "satyr", count: 5, gap: 0.9 } ] } ],
```

**brief (he)**: חמישה סאטירים בשביל, ומגדל אחד על הדשא. מגדל אחד לא עוצר חמישה —
הוסיפי עוד קשת ב־`(6, 3)`.

ואז, לפני הקרב, כירון רוצה שתי תשובות על לוח האיומים: **האם נשאר זהב בקופה?**
ו**האם הקופה ריקה?** אל תכתבי `True` או `False` ביד — תני לפייתון לחשב אותם.

**starter**
```python
place_tower("archer", 3, 3)

print()
print()
```

**solution**
```python
place_tower("archer", 3, 3)
place_tower("archer", 6, 3)

print(get_gold() > 0)
print(get_gold() == 0)
```
Verified: the camp holds at 3/3, all five satyrs die, 100 of 120 gold spent, and
the log reads `True` then `False`. The starter alone (one tower) leaks two.

**check**
```js
check: {
  kind: "battle",
  also: { kind: "source", mustInclude: [">", "=="],
          message: { he: "ההגנה החזיקה, אבל לוח האיומים ריק. שתי השורות צריכות לחשב תשובה — עם > ועם ==",
                     en: "The defense held, but the threat board is empty. The two lines must compute an answer — with > and with ==" } }
}
```

**hints**
1. (he) "הריצי כמו שזה וצפי. כמה עברו? ומה הודפס בין הסוגריים הריקים של ה־`print`?"
2. (he) "שורת `place_tower` נוספת במשבצת `(6, 3)`. ולשתי השורות של `print`:
   הסימן `>` שואל 'גדול מ', והסימן `==` שואל 'שווה ל'. שני סימני שווה, לא אחד."
3. (he) "`place_tower(\"archer\", 6, 3)` מתחת לשורה הראשונה. אחר כך
   `print(get_gold() > 0)` — `get_gold()` מחזיר מספר, והסימן הופך אותו לתשובה.
   השורה השנייה בנויה אותו דבר עם `== 0`. 120 פחות שני מגדלים של 50 זה 20, אז
   הראשונה תיתן `True` והשנייה `False`."

### b2 — מה שהקופה אומרת / What the Treasury Says · 25 XP, 6 🪙

**Why this mechanic**: the comparison is between **two numbers she did not
choose** — `get_gold()` and `tower_cost("cannon")`. That is the difference
between a boolean exercise and a boolean *decision*: she cannot answer it by
looking, she has to ask.

```js
map: { cols: 12, rows: 7,
       path: [[0,1],[1,1],[2,1],[3,1],[4,1],[4,2],[4,3],[4,4],
              [5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4]] },
gold: 240, campHp: 3, seed: 12, allowed: ["archer", "cannon"],
waves: [
  { delay: 0, enemies: [ { kind: "satyr", count: 5, gap: 0.7 } ] },
  { delay: 8, enemies: [ { kind: "cyclops", count: 1, gap: 2 },
                         { kind: "hellhound", count: 2, gap: 1.5 } ] },
],
```

**brief (he)**: קיקלופ אחד, שני כלבי גיהינום וחמישה סאטירים. לקיקלופ יש שריון 5,
וקשת מוציאה ממנו 5 נקודות בלבד בכל חץ. תותח מוציא 23.

השאלה הראשונה שלך היא **האם את יכולה להרשות לעצמך תותח**. הדפיסי את התשובה,
תסתכלי עליה, ואז בני: תותח ב־`(5, 3)` ושלוש קשתות ב־`(2, 2)`, `(3, 3)`
ו־`(9, 3)`. בסוף הדפיסי שורה שנייה: **האם הקופה התרוקנה?**

ארבע קשתות בלי תותח לא מספיקות פה. נסי את זה אחר כך אם את רוצה לראות למה.

**starter**
```python
print(get_gold())
print(tower_cost("cannon"))

place_tower("archer", 2, 2)
```
*(The starter prints two numbers. Turning two numbers into one answer is the
whole exercise.)*

**solution**
```python
print(get_gold() >= tower_cost("cannon"))

place_tower("cannon", 5, 3)
place_tower("archer", 2, 2)
place_tower("archer", 3, 3)
place_tower("archer", 9, 3)

print(get_gold() == 0)
```
Verified: 3/3, eight kills, 240 of 240 spent, log `True` / `True`. Two different
four-archer layouts at 200 gold both leak.

**check**
```js
check: {
  kind: "battle",
  also: { kind: "source", mustInclude: [">=", "==", "tower_cost", "get_gold"],
          message: { he: "את צריכה לשאול את המשחק, לא לזכור מספרים: get_gold() מול tower_cost(\"cannon\") עם >=, ובסוף בדיקה עם ==",
                     en: "Ask the game rather than remembering numbers: get_gold() against tower_cost(\"cannon\") with >=, and a final check with ==" } }
}
```

**hints**
1. (he) "יש לך שני מספרים בפלט. איזה סימן הופך שני מספרים לתשובה אחת של 'מספיק'
   או 'לא מספיק'?"
2. (he) "`>=` זה 'גדול או שווה'. הסדר קבוע: הסימן הגדול קודם. השורה נראית כמו
   `get_gold() >= tower_cost(\"cannon\")` — שתי פונקציות, סימן אחד ביניהן."
3. (he) "שורה ראשונה: `print(get_gold() >= tower_cost(\"cannon\"))`. פייתון פותר
   קודם את שתי הפונקציות (240 ו־90), משווה, ומדפיס `True`. אחרי שראית `True`,
   בני את התותח ואת שלוש הקשתות. השורה האחרונה, `print(get_gold() == 0)`, אומרת
   לך אם נשאר משהו בקופה — וכשהיא `True`, סיימת לבזבז."

### b3 — שתי שאלות, תשובה אחת / Two Questions, One Answer · 25 XP, 7 🪙

**Why this mechanic**: `and` and `or` with the **same two questions** on both
sides. Only the connector changes, so the two output lines isolate exactly what
`and` and `or` do — the same contrast as the old "permission to leave", now with
numbers the battlefield supplies.

```js
map: { cols: 14, rows: 8,
       path: [[0,5],[1,5],[2,5],[3,5],[3,4],[3,3],[3,2],[4,2],[5,2],[6,2],
              [7,2],[8,2],[8,3],[8,4],[9,4],[10,4],[11,4],[12,4],[13,4]] },
gold: 260, campHp: 3, seed: 13, allowed: ["archer", "cannon"],
waves: [
  { delay: 0,  enemies: [ { kind: "satyr", count: 8, gap: 0.5 } ] },
  { delay: 9,  enemies: [ { kind: "harpy", count: 7, gap: 0.7 } ] },
  { delay: 19, enemies: [ { kind: "hellhound", count: 5, gap: 1.1 } ] },
],
```

**brief (he)**: שלושה גלים, ושתי שאלות לפני שמתחילים. הכלל המחמיר: יוצאים לקרב
רק אם **גם** יש לפחות 400 זהב **וגם** למחנה יש 3 חיים לפחות. הכלל המקל: מספיק
**אחד מהשניים**.

הדפיסי את שתי התשובות — אותן שתי שאלות בדיוק בשתי השורות, רק המילה באמצע
משתנה. ואז בני הגנה שמחזיקה: שלוש קשתות ותותח.

**starter**
```python
place_tower("archer", 2, 4)
place_tower("archer", 4, 3)

print()
print()
```

**solution**
```python
print(get_gold() >= 400 and camp_hp() >= 3)
print(get_gold() >= 400 or camp_hp() >= 3)

place_tower("archer", 2, 4)
place_tower("archer", 4, 3)
place_tower("cannon", 7, 3)
place_tower("archer", 10, 5)
```
Verified: 3/3, twenty kills, 240 of 260 spent, log `False` then `True`. Three
archers (150 gold) leak two.

**check**
```js
check: {
  kind: "battle",
  also: { kind: "source", mustInclude: ["and", "or", "camp_hp"],
          message: { he: "שתי השורות צריכות את אותן שתי שאלות — אחת עם and ואחת עם or, ואחת מהן על camp_hp()",
                     en: "Both lines need the same two questions — one joined with and, one with or, and one of them about camp_hp()" } }
}
```

**hints**
1. (he) "יש לך 260 זהב, לא 400. אז הצד השמאלי של שתי השורות נותן את אותה תשובה.
   למה בכל זאת שתי השורות לא יוצאות זהות?"
2. (he) "`and` דורש ששני הצדדים יהיו `True`. `or` מסתפק באחד. כל צד הוא שאלה
   שלמה בפני עצמה: `get_gold() >= 400` היא שאלה אחת, `camp_hp() >= 3` היא שנייה."
3. (he) "`get_gold() >= 400` נותן `False` (יש 260). `camp_hp() >= 3` נותן `True`
   (יש בדיוק 3). `False and True` הוא `False` — לפי הכלל המחמיר לא יוצאים.
   `False or True` הוא `True` — לפי המקל יוצאים. השורה הראשונה:
   `print(get_gold() >= 400 and camp_hp() >= 3)`, והשנייה זהה עם `or`."

### b4 — מה שאסור שיקרה / What Must Not Happen · 30 XP, 8 🪙

**Why this mechanic**: `not (get_gold() >= tower_cost("archer"))` is the answer
to **"am I finished spending?"** — and it is, word for word, the loop condition
she will write in lesson 7. Here she evaluates it once, by hand, after each
tower. In two lessons the computer will evaluate it for her, over and over,
until it flips. Nothing else in the course sets up a later lesson this exactly.

```js
map: { cols: 14, rows: 8, path: <the same LONG road as b3> },
gold: 250, campHp: 3, seed: 14, allowed: ["archer"],
waves: [
  { delay: 0,  enemies: [ { kind: "satyr", count: 8, gap: 0.5 } ] },
  { delay: 9,  enemies: [ { kind: "harpy", count: 7, gap: 0.7 } ] },
  { delay: 19, enemies: [ { kind: "hellhound", count: 6, gap: 1.0 } ] },
],
```

**brief (he)**: אותה דרך, גל שלישי כבד יותר, ורק קשתות מותרות. יש 250 זהב —
בדיוק חמש קשתות. ארבע לא יספיקו, וכדי לדעת מתי הגעת לחמש יש לך שורה אחת:

```python
print(not (get_gold() >= tower_cost("archer")))
```

השורה הזאת אומרת **"אי אפשר לקנות עוד קשת"**. כל עוד היא `False` — חסר לך מגדל.
כשהיא `True` — סיימת. הוסיפי מגדלים עד שהיא מתהפכת, והדפיסי לפניה שורה נוספת:
האם הקופה **לא** ריקה.

**starter**
```python
place_tower("archer", 2, 4)
place_tower("archer", 4, 3)

print(not (get_gold() >= tower_cost("archer")))
```

**solution**
```python
place_tower("archer", 2, 4)
place_tower("archer", 4, 3)
place_tower("archer", 6, 3)
place_tower("archer", 9, 3)
place_tower("archer", 11, 5)

print(get_gold() != 0)
print(not (get_gold() >= tower_cost("archer")))
```
Verified: 3/3, twenty-one kills, 250 of 250 spent, log `False` then `True`. Four
archers (200 gold) leak one — and with four towers the printed line still reads
`False`, which is the point.

**check**
```js
check: {
  kind: "battle",
  also: { kind: "source", mustInclude: ["!=", "not"],
          message: { he: "הדוח הזה דורש את שתי המילים של היום: != לשאלה 'לא שווה', ו־not כדי להפוך תשובה",
                     en: "This report needs both of today's words: != for 'not equal', and not to flip an answer" } }
}
```

**hints**
1. (he) "הריצי עם שני המגדלים שכבר יש. מה השורה האחרונה מדפיסה, ומה זה אומר לך
   לעשות עכשיו?"
2. (he) "`not` הופך תשובה: `not False` הוא `True`. כל עוד `get_gold() >=
   tower_cost(\"archer\")` נותן `True` (אפשר לקנות עוד), ה־`not` הופך אותו
   ל־`False`. הוסיפי מגדל, הריצי שוב, והסתכלי."
3. (he) "עם 250 זהב יש מקום לחמש קשתות. אחרי החמישית `get_gold()` הוא 0,
   `0 >= 50` הוא `False`, ו־`not False` הוא `True` — סיימת. השורה השנייה,
   `print(get_gold() != 0)`, שואלת אם נשאר משהו: אחרי חמישה מגדלים היא `False`.
   שימי לב שהשתיים אומרות דברים הפוכים והתשובות שלהן הפוכות."

## The great battle — "חידת האורקל / The Oracle's Riddle" · 50 XP, 14 🪙

```js
map: { cols: 14, rows: 8,
       path: [[0,2],[1,2],[2,2],[3,2],[4,2],[4,3],[4,4],[4,5],
              [5,5],[6,5],[7,5],[8,5],[8,4],[8,3],[8,2],
              [9,2],[10,2],[11,2],[12,2],[13,2]],
       rock: [[11,5],[12,6]] },
gold: 400, campHp: 3, seed: 17, allowed: ["archer", "cannon"],
waves: [
  { delay: 0,  enemies: [ { kind: "satyr", count: 10, gap: 0.4 } ] },
  { delay: 10, enemies: [ { kind: "harpy", count: 8, gap: 0.6 } ] },
  { delay: 22, enemies: [ { kind: "hellhound", count: 6, gap: 1.0 } ] },
],
```

**Why this mechanic**: five lines that together *are an argument*, printed before
a battle whose outcome she has to earn. The Oracle will not answer a question
that has not been asked precisely, and the last line is the one that matters —
it says there is no margin. Chiron reads the five answers back to her as one
sentence in the completion text.

**brief (he)**: השביל מתפתל פעמיים, שלושה גלים מגיעים בזה אחר זה, ויש לך 400 זהב.
האורקל מוכנה לאשר את תוכנית ההגנה שלך — אבל רק אם תגישי אותה כחמש שאלות, לפי
הסדר, כשכל תשובה **מחושבת ולא מוקלדת**:

1. האם למחנה יש בדיוק 3 חיים?
2. האם הקופה **לא** ריקה?
3. האם **אי אפשר** להרשות לעצמך 500 זהב של מגדלים?
4. האם אפשר לקנות תותח **וגם** למחנה יש 3 חיים לפחות?
5. האם יש עודף — יותר מ־3 חיים **או** לפחות 500 זהב?

ואז בני הגנה שמחזיקה בשלושת הגלים בלי שאף מפלצת תעבור.

**starter**
```python
# the five answers, then the defense
place_tower("archer", 2, 1)
```

**solution**
```python
print(camp_hp() == 3)
print(get_gold() != 0)
print(not (get_gold() >= 500))
print(get_gold() >= tower_cost("cannon") and camp_hp() >= 3)
print(camp_hp() > 3 or get_gold() >= 500)

place_tower("archer", 2, 1)
place_tower("archer", 3, 3)
place_tower("cannon", 5, 4)
place_tower("archer", 7, 4)
place_tower("cannon", 9, 3)
place_tower("archer", 11, 1)
```
Verified log:
```
True
True
True
True
False
```
and the battle: 3/3, twenty-four kills, 380 of 400 gold spent. Four archers
(200 gold) leak two.

**check**
```js
check: {
  kind: "battle",
  also: { kind: "source", mustInclude: ["==", "!=", ">=", "and", "or", "not"],
          message: { he: "הנבואה הזאת דורשת את כל הכלים של השיעור: ==, !=, >=, and, or ו־not",
                     en: "This one needs every tool in the lesson: ==, !=, >=, and, or and not" } }
}
```

**hints**
1. (he) "חמש שורות פלט, חמש שורות `print`. עברי שאלה־שאלה ושאלי: איזה סימן או
   איזו מילה מתאימים? בשאלה 3 יש 'אי אפשר', בשאלה 4 יש 'וגם', בשאלה 5 יש 'או'."
2. (he) "שורה 1 היא `==`, שורה 2 היא `!=`, שורה 3 היא `not` סביב שאלה שלמה
   בסוגריים, שורה 4 היא `and`, שורה 5 היא `or`. את המספרים אל תכתבי מהזיכרון —
   `get_gold()` ו־`camp_hp()` יודעים אותם."
3. (he) "נתחיל: `print(camp_hp() == 3)` נותן `True`. שורה 3 —
   `print(not (get_gold() >= 500))` — קודם פייתון שואל אם 400 גדול או שווה
   ל־500 (`False`), ואז `not` הופך ל־`True`. שורה 5 היא היחידה שמסתיימת
   ב־`False`, וזה בדיוק מה שהאורקל רצתה שתראי: אין עודף, לא בחיים ולא בזהב.
   להגנה: שישה מגדלים סביב שתי הפניות — `(2,1)`, `(3,3)`, תותח ב־`(5,4)`,
   `(7,4)`, תותח ב־`(9,3)`, `(11,1)`."

## Reward & Recap

**Item**: 🔮 **עדשת האורקל / The Oracle's Lens**
desc (he): "עדשת זכוכית עכורה מעליית הגג. כשמסתכלים דרכה על שאלה, היא נראית או
`True` או `False` — ושום דבר באמצע."

**Achievements possible here**
- *Truth Seeker* — ran a program whose output was `True` or `False`.
- *Quartermaster* — first battle won with every last coin spent (`get_gold()`
  ends at 0), which b2, b4 and the great battle all do.
- *No Hints Needed* — completed the lesson with zero hints spent.

**Recap bullets**
- `True` ו־`False` הם ערכים כמו כל ערך אחר, והטיפוס שלהם נקרא `bool`
- `=` נותן ערך למשתנה, `==` שואל אם שני דברים שווים — שני דברים שונים לגמרי
- `!= < > <= >=` מחזירים גם הם `True` או `False`, ועובדים גם על מחרוזות
- `and` דורש ששניהם יהיו `True`, `or` מסתפק באחד, `not` הופך את התשובה
- `input()` תמיד מחזיר string — בלי `int()` השוואה למספר תיתן `TypeError`
- `get_gold()`, `camp_hp()` ו־`tower_cost()` מחזירים מספרים — השוואה הופכת מספר להחלטה

**Next teaser (he)**: *"עכשיו את יודעת לשאול. מחר תגלי מה עושים עם התשובה —
הדרך מחוץ למחנה מתפצלת לשלוש, וגרובר מחכה שתחליטי."*

## Common mistakes to anticipate

| She writes | She sees (verified in Skulpt) | Hint / explainer must cover |
| --- | --- | --- |
| `print(true)` | `NameError: name 'true' is not defined` | `True` באות גדולה — פייתון מבדיל בין אותיות גדולות לקטנות |
| `print("True")` | מדפיס `True` אבל זה string | גרשיים הופכים את זה לטקסט; `type()` יגלה את ההבדל |
| `print(campers = 12)` | `TypeError: print() got an unexpected keyword argument 'campers'` | `=` נותן ערך, `==` שואל. הודעת השגיאה מוזרה כי פייתון חשב שזה שם של הגדרה |
| `print(days > 3 and < 10)` | `SyntaxError: bad input on line N` | כל צד של `and` חייב להיות שאלה שלמה: `days > 3 and days < 10` |
| `print("12" > 3)` | `TypeError: '>' not supported between instances of 'str' and 'int'` | טקסט ומספר לא מושווים; זו הסיבה ל־`int(input(...))` |
| `print(campers => 12)` | `SyntaxError: bad input on line N` | הסדר הוא `>=` ו־`<=`, הסימן הגדול קודם |
| `print(a AND b)` | `SyntaxError: bad input on line N` | `and` / `or` / `not` באותיות קטנות תמיד |
| `print(not(a and b))` נקרא כמו `print((not a) and b)` | לא שגיאה — תשובה אחרת | `not` נדבק חזק יותר מ־`and`; סוגריים פותרים את זה |
| `print(get_gold)` בלי סוגריים | מדפיס `<built-in function get_gold>` | פונקציה בלי `()` היא הפקודה עצמה, לא התוצאה שלה |
| `place_tower("archer", 4, 4)` על השביל | הקרב נכשל, והמנוע אומר "אי אפשר לבנות על השביל עצמו" | המשבצות של השביל שמורות למפלצות; בונים לידו |
| מגדל רחוק מדי מהשביל | "המגדל במשבצת (x, y) רחוק מדי מהשביל ולא ירה אף פעם" | טווח הקשת הוא 2.6 משבצות; ליד השביל, לא בפינה |
| כותבת `True` ביד במקום להשוות | ההגנה מחזיקה אבל השלב לא עובר, עם הודעת ה־`message` | הקרב זה חצי; לוח האיומים חייב **לחשב** את התשובה |

## Implementation notes

- **Verified against the shipped runtime.** Every code block, every solution and
  every expected output in this file was executed through
  `assets/js/vendor/skulpt.min.js` with `__future__: Sk.python3`. `type(True)`
  prints `<class 'bool'>`, string ordering (`"Ares" < "Zeus"`) works, and the
  `str`/`int` comparison `TypeError` message is character-identical to CPython 3.
- **`source` checks must use padded substrings.** `mustInclude: ["or"]` would be
  satisfied by the word `for`; `mustInclude: ["and"]` by a variable named
  `island`. Every logical-operator source check in this lesson uses `" and "`,
  `" or "` and `"not "` with the spaces included. This convention applies to
  every lesson from here on.
- **Every level here was simulated headlessly** with `assets/js/battle/{sim,pyapi,play}.js`
  loaded into a Node VM exactly the way `tools/verify-python.mjs` does it. For
  each of the five: the stated `solution` **wins**, an empty program **loses**,
  the solution satisfies its own `also` `source` rule, and the starter behaves as
  described. The "verified" lines under each solution are simulation output, not
  estimates.
- **Each level is also unwinnable by the obvious cheaper build**, and that was
  simulated too: one tower in b1 leaks 2, four archers in b2 leak 1 (two
  different layouts), three archers in b3 leak 2, four archers in b4 leak 1, four
  archers in the great battle leak 2.
- **No `if` anywhere in this lesson**, including in hint text. If her submitted
  source contains `if`, the checker may show a friendly non-failing note: *"את
  מקדימה את כירון בשיעור שלם. `if` מגיע מחר — היום רק מדפיסים את התשובה."*
  It must not fail her: a working `if` in a lesson-5 battle is a learner running
  ahead, not a learner breaking a rule.
- **Booleans cannot be forced by the battle alone, and that is stated openly.**
  Without `if`, no boolean she computes can change where a tower lands, so every
  level pairs `check.kind: "battle"` with an `also` `source` rule. The `message`
  on each one names the requirement in her language, because "the camp survived
  and I still failed" is otherwise the worst feedback in the course. The battle
  half is not decoration: each level's defense has to be built correctly and can
  be lost, and the printed answer is what tells her which defense to build.
- **No level here uses `input()`.** A battle level runs her script once, before
  the wave, with no stdin queued — `input()` would return `""` and confuse her.
  `input()` stays in the teaching blocks and the training ground, where lesson 3
  put it.
- **The cannon is introduced here, and its one hard rule is not.** `spec/09-battle-game.md`:
  the cannon cannot hit anything flying. Lesson 5's b2 and the great battle both
  contain harpies, and both solutions carry archers that cover them, so nothing
  breaks — but the rule itself is lesson 6's headline and must not be spoiled
  here. Keep it out of the briefs.
- Chained comparison (`3 < 5 < 10`) **does** work in Skulpt, but it is not taught
  here — one new idea per lesson. If she discovers it, the engine will not
  punish her.
- **A battle level's second check is its `also` field.** `checker.js` runs the
  battle first and applies `also` only once the objective passed, so she never
  sees a source complaint about a defense that already collapsed. `also.kind`
  may be `"source"` or `"output"`; every level in this lesson uses `"source"`,
  which is the half `tools/verify-python.mjs` asserts.
- **`mustInclude` matching is word-aware for bare identifiers** (`checker.js`
  `present()`), so `"and"` does not match `island` and `"not"` does not match
  `cannot`. Anything containing punctuation — `">="`, `"=="`, `"!="` — matches
  literally. That is why this file no longer pads the operator words with
  spaces: `["and", "or", "not"]` is now both correct and readable.
- **The default objective is a perfect defense.** `campHp: 3` never has to drop
  to zero to fail a level — one leak is a loss, because `check.campHpAtLeast`
  defaults to the starting HP. The three hearts exist so a hopeless run ends
  quickly instead of playing out for a minute.
- **`source` checks read a stripped skeleton** — comments and string literals are
  removed before matching (`.claude/rules/lesson-authoring.md`). Two consequences
  here, both intentional:
  - Typing `print("True")` cannot satisfy any level: the literal is stripped
    before matching, so no comparison operator survives and the `also` rule
    fails with its own message.
  - `tower_cost("cannon")` keeps satisfying `mustInclude: ["tower_cost"]` because
    the identifier sits outside the literal.
  No check in this lesson needs `raw: true`.
- **Seeds are fixed per level** (11, 12, 13, 14, 17) and every battle is
  deterministic, so a hint may safely say "run it again and watch where they get
  through" — it will be the same place every time.
