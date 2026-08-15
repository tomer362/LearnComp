# Lesson 05 — The Oracle's Riddle · חידת האורקל

> **Act II — The Lightning Thief · גנב הברק** · Stop 5 of 20
> Structure follows `spec/lessons/lesson-01.md`. Schema: `spec/04-lesson-template.md`.

| | |
| --- | --- |
| **id** | `05` |
| **slug** | `the-oracles-riddle` |
| **minutes** | 25–30 |
| **concepts** | `True`/`False`, the `bool` type, `== != < > <= >=`, `and` / `or` / `not` |
| **new vocabulary** | `True`, `False`, `bool`, `==`, `!=`, `<=`, `>=`, `and`, `or`, `not` |
| **requires** | L1 `print`/strings/`#` · L2 variables, `type()` · L3 `input()`, `int()`, f-strings · L4 arithmetic, `%` |
| **item** | 🔮 עדשת האורקל / The Oracle's Lens |
| **XP** | 20 + 25 + 25 + 30 (training) + 50 (quest) + 30 (bonus) = **180** |
| **drachmas** | 5 + 6 + 7 + 8 + 14 = **40** 🪙 |

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

## Training exercises

### e1 — Two answers for the Oracle · 20 XP, 5 🪙

**brief (he)**: האורקל שואלת אותך שתי שאלות. שורה 1: האם 7 גדול מ־3? שורה 2:
האם 4 שווה ל־5? הדפיסי את שתי התשובות — אבל אל תכתבי את המילים `True` ו־`False`
בעצמך. תני לפייתון לענות.

**starter**
```python
# the Oracle is waiting
print()
print()
```

**solution**
```python
print(7 > 3)
print(4 == 5)
```

**check**
```js
check: {
  kind: "source",
  mustInclude: [">", "=="],
  mustExclude: ["True", "False"],
  message: { he: "האורקל צריכה שתשאלי שאלה, לא שתכתבי את התשובה בעצמך. השתמשי ב־> וב־==",
             en: "The Oracle needs a question, not the answer typed by hand. Use > and ==" }
}
```
Plus a second check on the same exercise:
```js
{ kind: "output", mode: "normalized", expect: "True\nFalse" }
```

**hints**
1. (he) "אם תכתבי `print(7)` תקבלי 7. מה צריך להיות בין 7 לבין 3 כדי שפייתון
   יענה `True` במקום להדפיס מספר?"
2. (he) "הסימנים הם `>` לשאלת 'גדול מ' ו־`==` לשאלת 'שווה ל'. שני סימני שווה,
   לא אחד."
3. (he) "שורה ראשונה: `print(7 > 3)` — פייתון פותר את `7 > 3`, מקבל `True`,
   ומדפיס אותו. שורה שנייה בנויה אותו דבר, עם `==` במקום `>`."

### e2 — The bunk count · 25 XP, 6 🪙

**brief (he)**: בקתת הרמס גדושה. יש בה 11 חניכים ו־8 מיטות. שמרי את שני
המספרים במשתנים בשמות `campers` ו־`beds`, והדפיסי שלוש שורות: (1) האם יש יותר
חניכים ממיטות? (2) האם המספרים שווים? (3) כמה חניכים נשארים בלי מיטה — מספר,
לא תשובת אמת.

**starter**
```python
campers = 11
beds = 8

# three lines here
```

**solution**
```python
campers = 11
beds = 8
print(campers > beds)
print(campers == beds)
print(campers - beds)
```
Verified output: `True` / `False` / `3`.

**check**
```js
{ kind: "output", mode: "normalized", expect: "True\nFalse\n3" }
```

**hints**
1. (he) "שתי השורות הראשונות הן שאלות. השורה השלישית היא חשבון רגיל משיעור 4.
   שימי לב מתי את מצפה ל־`True`/`False` ומתי למספר."
2. (he) "שורה 1 משתמשת ב־`>`, שורה 2 ב־`==`, שורה 3 ב־`-`."
3. (he) "`print(campers > beds)` שואל אם 11 גדול מ־8 ומדפיס `True`.
   `print(campers == beds)` שואל אם הם שווים ומדפיס `False`. `print(campers -
   beds)` מחשב 11 פחות 8 ומדפיס 3 — שלושה חניכים ישנים על הרצפה."

### e3 — Permission to leave · 25 XP, 7 🪙

**brief (he)**: לפי חוקי המחנה, מותר לצאת למסע רק אם את **גם** בת 13 לפחות
**וגם** יש לך נשק. כירון שוקל להקל: אולי יספיק אחד מהשניים. עם `age = 14`
ו־`has_weapon = False`, הדפיסי שתי שורות: התשובה לפי החוק המחמיר, ואז התשובה
לפי החוק המקל.

**starter**
```python
age = 14
has_weapon = False

# strict rule
print()
# loose rule
print()
```

**solution**
```python
age = 14
has_weapon = False
print(age >= 13 and has_weapon)
print(age >= 13 or has_weapon)
```
Verified output: `False` / `True`.

**check**
```js
{ kind: "output", mode: "normalized", expect: "False\nTrue" }
```
plus
```js
{ kind: "source", mustInclude: [" and ", " or "],
  message: { he: "החוק המחמיר דורש and, והמקל דורש or. שתי השורות חייבות להשתמש בהם",
             en: "The strict rule needs and, the loose rule needs or" } }
```
*(Note the surrounding spaces in the `mustInclude` strings — see Implementation
notes. A bare `"or"` would also match inside `for`.)*

**hints**
1. (he) "החוק המחמיר דורש ששני התנאים יתקיימו. יש לה 14 — זה בסדר. יש לה נשק?
   אז מה התשובה הכוללת?"
2. (he) "`and` דורש ששני הצדדים יהיו `True`. `or` מסתפק בצד אחד. הצד השמאלי בשתי
   השורות הוא אותו דבר: `age >= 13`."
3. (he) "`age >= 13` נותן `True`, ו־`has_weapon` הוא `False`. `True and False`
   הוא `False` — היא לא יוצאת. `True or False` הוא `True` — לפי החוק המקל היא
   יוצאת. שורה ראשונה: `print(age >= 13 and has_weapon)`."

### e4 — The Oracle answers a stranger · 30 XP, 8 🪙

**brief (he)**: האורקל מקבלת מבקר חדש. קלטי ממנו מספר ימים עד היפוך הקיץ
(זכרי ש־`input()` מחזיר string), והדפיסי שתי שורות: (1) האם נשארו פחות מ־10
ימים? (2) האם מספר הימים זוגי?

**starter**
```python
days = input("How many days until the solstice? ")

print()
print()
```
*(The starter deliberately leaves out `int()`. If she compares straight away she
gets the `TypeError` from teach block 8 — an error she has already met in a calm
moment.)*

**solution**
```python
days = int(input("How many days until the solstice? "))
print(days < 10)
print(days % 2 == 0)
```

**check**
```js
{ kind: "cases", cases: [
    { stdin: ["9"],  expect: "True\nFalse" },
    { stdin: ["12"], expect: "False\nTrue" },
    { stdin: ["10"], expect: "False\nTrue" },
    { stdin: ["1"],  expect: "True\nFalse" } ] }
```
All four verified against the runtime. The `input()` prompt text is rendered in
the Iris-message panel and never reaches stdout, so it does not appear in
`expect` — the convention established in lesson 3.

**hints**
1. (he) "הריצי את הקוד כמו שהוא והקלידי 9. איזו שגיאה קיבלת? מה היא אומרת על
   הטיפוסים של שני הצדדים?"
2. (he) "`input()` תמיד מחזיר string. עטפי אותו ב־`int()` כמו בשיעור 3. לשאלת
   הזוגיות את צריכה את `%` משיעור 4 — שארית החלוקה ב־2."
3. (he) "קודם `days = int(input(...))` כדי שיהיה לך מספר. אחר כך `print(days <
   10)`. לשורה השנייה: מספר זוגי הוא מספר ששארית החלוקה שלו ב־2 היא 0, כלומר
   `days % 2 == 0` — שימי לב שיש פה גם `%` וגם `==`."

## Quest — "חידת האורקל / The Oracle's Riddle" · 50 XP, 14 🪙

**brief (he)**: האורקל מוכנה לאשר תיאוריה אחת על גנב הברק — אבל רק אם תגישי לה
אותה כרשימת שאלות. שמרי את חמש העובדות האלה במשתנים:

```
suspect = "Luke"
seen_near_the_bolt = True
has_alibi = False
days_left = 9
hero_age = 14
```

ואז הדפיסי בדיוק חמש שורות, לפי הסדר, כשכל שורה מחושבת ולא מוקלדת ביד:

1. האם החשוד הוא Luke?
2. האם הוא נראה ליד הברק **וגם** אין לו אליבי?
3. האם נשארו יותר מ־10 ימים?
4. האם הגיבורה בת 13 לפחות **וגם** נשארו יותר מ־3 ימים?
5. האם התיק סגור? תיק נסגר אם יש אליבי **או** אם נשארו יותר מ־30 יום.

**solution**
```python
suspect = "Luke"
seen_near_the_bolt = True
has_alibi = False
days_left = 9
hero_age = 14

print(suspect == "Luke")
print(seen_near_the_bolt and not has_alibi)
print(days_left > 10)
print(hero_age >= 13 and days_left > 3)
print(has_alibi or days_left > 30)
```
Verified output:
```
True
True
False
True
False
```

**check**
```js
{ kind: "output", mode: "normalized", expect: "True\nTrue\nFalse\nTrue\nFalse" }
```
plus
```js
{ kind: "source", mustInclude: ["==", " and ", " or ", "not "],
  message: { he: "הנבואה הזו דורשת את כל הכלים של השיעור: ==, and, or ו־not",
             en: "This one needs every tool in the lesson: ==, and, or and not" } }
```

**hints**
1. (he) "חמש שורות פלט, חמש שורות `print`. עברי שאלה־שאלה ושאלי את עצמך: איזה
   סימן או איזו מילה מתאימים לשאלה הזו? שורה 2 מכילה את המילה 'וגם' ואת המילה
   'אין'."
2. (he) "שורה 1 היא `==` על מחרוזת. שורות 2 ו־4 הן `and`. שורה 5 היא `or`.
   'אין לו אליבי' זה `not has_alibi` — הפיכה של `False` ל־`True`."
3. (he) "נתחיל: `print(suspect == \"Luke\")` — השוואת מחרוזות, שימי לב לגרשיים
   ולאות גדולה. שורה 2: `seen_near_the_bolt` כבר `True`, ו־`not has_alibi` הופך
   את ה־`False` ל־`True`, אז `True and True` נותן `True`. שורה 3 שואלת אם 9 גדול
   מ־10 — קראי אותה שוב לפני שאת כותבת. את שלוש האחרונות תסיימי לבד."

**Why this is the quest**: it is the first program she writes where the output is
an *argument*. Five lines of `True`/`False` that together say "Luke was near the
bolt, has no alibi, time is short, she is allowed to go, and this case is not
closed." Chiron reads it back to her in the completion text as a sentence.

## Reward & Recap

**Item**: 🔮 **עדשת האורקל / The Oracle's Lens**
desc (he): "עדשת זכוכית עכורה מעליית הגג. כשמסתכלים דרכה על שאלה, היא נראית או
`True` או `False` — ושום דבר באמצע."

**Achievements possible here**
- *Truth Seeker* — ran a program whose output was `True` or `False`.
- *Debugger* — hit the `TypeError` in e4 and then passed it.
- *No Hints Needed* — completed the lesson with zero hints spent.

**Recap bullets**
- `True` ו־`False` הם ערכים כמו כל ערך אחר, והטיפוס שלהם נקרא `bool`
- `=` נותן ערך למשתנה, `==` שואל אם שני דברים שווים — שני דברים שונים לגמרי
- `!= < > <= >=` מחזירים גם הם `True` או `False`, ועובדים גם על מחרוזות
- `and` דורש ששניהם יהיו `True`, `or` מסתפק באחד, `not` הופך את התשובה
- `input()` תמיד מחזיר string — בלי `int()` השוואה למספר תיתן `TypeError`

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
- **`mustExclude` on e1** blocks `True`/`False` as literal text. It also blocks
  them inside a comment, which is acceptable — the failure message names the
  requirement clearly.
- **No `if` anywhere in this lesson**, including in hint text. If her submitted
  source contains `if`, the checker may show a friendly non-failing note: *"את
  מקדימה את כירון בשיעור שלם. `if` מגיע מחר — היום רק מדפיסים את התשובה."*
- **`input()` prompts do not reach stdout** in this engine (Skulpt passes the
  prompt to `inputfun`, which the UI renders as an Iris-message). Confirmed by
  running e4 with queued stdin: output was exactly `"True\nFalse\n"`. No `cases`
  `expect` in this lesson includes prompt text.
- Chained comparison (`3 < 5 < 10`) **does** work in Skulpt, but it is not taught
  here — one new idea per lesson. If she discovers it, the engine will not
  punish her.
- e1 needs two checks on one exercise (`source` + `output`). If `checker.js`
  supports only one `check` object per exercise, add an `all: [...]` wrapper
  kind; otherwise express e1 as `{kind:"source"}` and rely on the hint text for
  the output shape. Decide once — lesson 8's boss needs the same wrapper.
