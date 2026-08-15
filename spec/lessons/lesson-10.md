# Lesson 10 — The Hunters' Inventory · מלאי הציידות

> **Act III — Sea of Monsters · ים המפלצות** · Stop 10 of 20
> Structure follows `spec/lessons/lesson-01.md`. Schema: `spec/04-lesson-template.md`.

| | |
| --- | --- |
| **id** | `10` |
| **slug** | `the-hunters-inventory` |
| **minutes** | 30–35 |
| **concepts** | `.append()`, `.remove()`, `.sort()`, slicing `[a:b]`, `sorted()`, `min()`, `max()`, `sum()` |
| **new vocabulary** | `.append`, `.remove`, `.sort`, `[a:b]`, `sorted`, `min`, `max`, `sum` |
| **requires** | L9 lists, indexing, `len()`, `for` over a list, `in` · L4 `round()` and `/` · L7 accumulators |
| **item** | 🏹 אשפת הציידות / The Hunters' Quiver |
| **XP** | 20 + 25 + 25 + 30 (training battles) + 55 (great battle) = **155** · optional battle +25 |
| **drachmas** | 5 + 7 + 7 + 8 + 14 = **41** 🪙 · optional battle +8 |
| **battle API** | `place_tower`, `tower_cost`, `get_wave`, `get_gold`, `camp_hp` — build script only |
| **towers** | `archer`, `cannon`, `ice` — the cannon cannot hit anything flying |

## Teaching goal

Lesson 9 gave her a list she could read. Lesson 10 gives her a list she can
**change and summarise**: add to it, take from it, order it, take a piece out of
it, and ask it for its smallest, largest and total.

The one new idea underneath all of it: **some tools change the list, and some
tools hand you a new one.** `.sort()` changes; `sorted()` hands back. This
distinction is the source of the single most common list bug in beginner Python
(`my_list = my_list.sort()` → `None`) and it gets a `compare` block of its own.

Secondary goal: slicing `[a:b]` reuses lesson 9's off-by-one idea in a new shape
— *from a, up to but not including b* — and reinforces it instead of teaching
something unrelated.

**In the battles this becomes triage.** The prices come out of `tower_cost()`
into a list she then asks `min`/`max`/`sum` about; the build plan is a list she
edits with `.remove()` and `.append()` because the road moved; the scouts' slate
is two columns of hit points, and `sum` of the wrong one buys artillery that
cannot reach the harpies. Every summary she computes turns straight into a number
of towers, so a wrong summary is a lost battle rather than a wrong printout.

## Story beat

The ship anchors off a nameless island. A fire burns on the beach, and around it
sit the Hunters of Artemis: silver bows, no patience, and a quartermaster named
Zoë who has been counting arrows for two thousand years. Supplies for the rest
of the voyage are available — after the storeroom is in order.

The Prophecy panel (5 lines, no code):

> הספינה עוגנת ליד אי שאין לו שם.
> על החוף בוערת מדורה, וסביבה יושבות הציידות של ארטמיס.
> "אתן רוצות אספקה?" שואלת זואי. "קודם תסדרי לנו את המחסן."
> "כל חץ, כל חבל, כל בקבוק נקטר — צריך לדעת מה יש, מה חסר, ומה הכי כבד."
> גרובר לוחש לך: "היא בודקת אותך. אני חושב שאני אשמור על הספינה."

Cast: Zoë Nightshade (dry, exacting, quietly approving), Grover (avoiding work),
Chiron in one callout. Annabeth asks the `.sort()` / `sorted()` question.

## Chiron Teaches — block by block

1. **prose** — מגילה טובה היא לא אבן. מחסן משתנה כל יום: מגיעים חצים, נגמר
   הנקטר, מישהו מסדר את המדף מחדש. פייתון יודע לעשות את כל זה, ולכל פעולה יש שם
   שמתחיל בנקודה — כי היא שייכת לרשימה עצמה.

2. **code (runnable)** — `.append()`, the first change.
   ```python
   quiver = ["arrow", "arrow"]
   quiver.append("silver arrow")
   print(quiver)
   print(len(quiver))
   ```
   Output:
   ```
   ['arrow', 'arrow', 'silver arrow']
   3
   ```
   Caption: `append מוסיף בסוף. הרשימה עצמה השתנתה — לא צריך להשים אותה חזרה
   לתוך המשתנה.`

3. **prose** — הצורה `quiver.append("x")` נקראת קריאה למתודה. קראי אותה מימין
   לשמאל של המשמעות: **על הרשימה `quiver`, בצעי את הפעולה `append`, עם הערך
   `"x"`**. הנקודה אומרת "הפעולה הזאת שייכת לדבר הזה".

4. **code (runnable)** — `.remove()`.
   ```python
   supplies = ["nectar", "poison", "rope"]
   supplies.remove("poison")
   print(supplies)
   ```
   Output: `['nectar', 'rope']`
   Caption: `remove מוחק לפי הערך, לא לפי המיקום. ואם הערך מופיע פעמיים — הוא
   מוחק רק את הראשון.`

5. **error block** — removing something that is not there.
   ```python
   supplies = ["nectar", "rope", "ambrosia"]
   supplies.remove("poison")
   ```
   Real error (verified in Skulpt):
   ```
   ValueError: list.remove(x): x not in list (line 2)
   ```
   Explanation: ביקשת למחוק משהו שלא נמצא במחסן. `ValueError` אומר: הפעולה
   נכונה, הערך שנתת לה לא. שימי לב שזה **לא** `IndexError` — שם טעית במיקום,
   כאן טעית בערך. פייתון מבדיל בין השניים, וגם את יכולה.
   The fix, shown right after: לשאול לפני שמוחקים.
   ```python
   supplies = ["nectar", "rope", "ambrosia"]
   if "poison" in supplies:
       supplies.remove("poison")
   print(supplies)
   ```
   Output: `['nectar', 'rope', 'ambrosia']` — no crash. `in` from lesson 9 is
   the seatbelt.

6. **compare** — **the most important block in this lesson.**
   - bad — label: *`.sort()` לא מחזיר רשימה. הוא מחזיר `None`.*
     ```python
     hunters = ["Zoe", "Bianca", "Phoebe"]
     hunters = hunters.sort()
     print(hunters)
     ```
     Output: `None` — and the next line she writes, `print(hunters[0])`, gives
     `TypeError: 'NoneType' does not support indexing`.
   - good — label: *`.sort()` מסדר את הרשימה במקום. בלי השמה.*
     ```python
     hunters = ["Zoe", "Bianca", "Phoebe"]
     hunters.sort()
     print(hunters)
     ```
     Output: `['Bianca', 'Phoebe', 'Zoe']`

7. **callout · warn** — title: *לשנות או להחזיר* / *Change it, or hand it back*
   אנבת' מסכמת את זה בשורה אחת: "`.sort()` מסדר את המדף. `sorted()` מצלם אותו
   מסודר ומשאיר את המדף כמו שהוא."
   ```python
   hunters = ["Zoe", "Bianca", "Phoebe"]
   ordered = sorted(hunters)
   print(ordered)
   print(hunters)
   ```
   Output:
   ```
   ['Bianca', 'Phoebe', 'Zoe']
   ['Zoe', 'Bianca', 'Phoebe']
   ```
   הכלל: משהו שמתחיל בנקודה — בדרך כלל משנה את הרשימה. משהו שעוטף אותה
   בסוגריים — בדרך כלל מחזיר ערך חדש.

8. **code (runnable)** — sorting numbers, and sorting backwards.
   ```python
   weights = [8, 2, 5, 1]
   print(sorted(weights))
   print(sorted(weights, reverse=True))
   ```
   Output:
   ```
   [1, 2, 5, 8]
   [8, 5, 2, 1]
   ```
   Caption: `אותיות מסתדרות לפי סדר האלף־בית האנגלי, מספרים לפי הגודל.
   reverse=True הופך את הכיוון.`

9. **code (runnable)** — slicing.
   ```python
   watch = ["Zoe", "Thalia", "Bianca", "Phoebe"]
   print(watch[0:2])
   print(watch[2:4])
   print(watch[1:])
   print(watch[:2])
   ```
   Output:
   ```
   ['Zoe', 'Thalia']
   ['Bianca', 'Phoebe']
   ['Thalia', 'Bianca', 'Phoebe']
   ['Zoe', 'Thalia']
   ```
   Caption: `פרוסה (slice) היא חתיכה מהרשימה, והתוצאה שלה היא רשימה חדשה.`

10. **callout · tip** — title: *עד, ולא כולל* / *Up to, not including*
    `watch[0:2]` נותן את 0 ואת 1 — **לא** את 2. זה בדיוק אותו רעיון של ה־0
    משיעור 9, בלבוש אחר: המספר השני הוא "איפה לעצור", לא "מה הפריט האחרון".
    הבונוס: `len(watch[a:b])` תמיד יוצא `b - a`. הבונוס השני:
    ```python
    watch = ["Zoe", "Thalia", "Bianca"]
    print(watch[1:99])
    print(watch[5:9])
    ```
    Output:
    ```
    ['Thalia', 'Bianca']
    []
    ```
    פרוסה שחורגת מהגבול **לא** זורקת `IndexError`. היא מחזירה את מה שיש, או
    רשימה ריקה. אינדקס בודד קפדן; פרוסה סלחנית.

11. **code (runnable)** — `min`, `max`, `sum`, and an average.
    ```python
    weights = [8, 2, 5, 1]
    print(min(weights))
    print(max(weights))
    print(sum(weights))
    print(round(sum(weights) / len(weights), 2))
    ```
    Output:
    ```
    1
    8
    16
    4.0
    ```
    Caption: `שלושת הכלים האלה עובדים רק על מספרים. round משיעור 4 חוזר לעבודה
    כדי שהממוצע לא ייראה כמו 4.000000001.`

12. **compare** — the same answer, two ways. This sets up the optional battle.
    - good (a) — label: *הכלי של האלים:*
      ```python
      print(max(weights))
      ```
    - good (b) — label: *מה שהכלי עושה בפנים:*
      ```python
      biggest = weights[0]
      for w in weights:
          if w > biggest:
              biggest = w
      print(biggest)
      ```
    Caption: `שתי השורות האלה נותנות את אותה תשובה. הראשונה מהירה לכתיבה,
    השנייה מלמדת אותך מה קורה מתחת. בקרב הצדדי היום תכתבי את השנייה, ותגלי
    שהיא זו שקובעת איפה עומד התותח.`

13. **callout · myth** — title: *זואי סופרת חצים* / *Zoë counts arrows*
    הציידות של ארטמיס נודדות אלפיים שנה עם מה שהן נושאות על הגב. אין להן מחסן
    ואין להן עגלות. זואי יודעת בעל־פה כמה חצים יש לכל אחת, מה הכי כבד, ומה
    אפשר להשאיר מאחור. `min`, `max` ו־`sum` הם בדיוק זה, בשלוש מילים.

14. **code (runnable)** — the price list, built by the game rather than typed.
    ```python
    prices = [tower_cost("archer"), tower_cost("ice"), tower_cost("cannon")]
    print(prices)
    print(min(prices))
    print(max(prices))
    print(sum(prices))
    ```
    Output:
    ```
    [50, 70, 90]
    50
    90
    210
    ```
    Caption: `שלוש קריאות ל־tower_cost, ותוצאה אחת: רשימת מספרים. מהרגע הזה
    min, max ו־sum עובדים עליה בדיוק כמו על משקלים של חצים.`

15. **code (runnable)** — a slice of the roster. `get_wave()` is a list, so it
    slices like any other list.
    ```python
    wave = get_wave()
    print(len(wave))
    first_two = wave[0:2]
    print(len(first_two))
    print(len(wave[2:]))
    ```
    Output on the practice field:
    ```
    3
    2
    1
    ```
    Caption: `הפרוסה עובדת גם על רשימה שלא את כתבת. שימי לב שהדפסנו את **האורך**
    של הפרוסה ולא את התוכן שלה — מה יש בתוך כל תא זה כבר שיעור 11.`

16. **callout · warn** — title: *הכלי הזול הוא לא תמיד הזול* / *The cheap tower
    is not always the cheap one*
    קשת עולה 50 ותותח 90, אבל זה לא כל הסיפור:
    - **קשת** — הכי משתלמת מול נחילים בלי שריון, וכמעט חסרת ערך מול שריון כבד.
    - **תותח** — יציב מול שריון, ו**לא מסוגל לפגוע במעופפות**. הרפיה עוברת מעל
      תותח כאילו הוא לא שם.
    - **קרח** — כמעט לא עושה נזק. הוא קונה זמן לאחרים, וזה תפקיד ולא חיסרון.
    לכן הטריאז' של היום הוא בשתי עמודות נפרדות: מה הולך על הקרקע, ומה מגיע
    מהאוויר. `sum` על העמודה הלא נכונה נותן תשובה מדויקת לשאלה הלא נכונה.

## Try It (ungraded)

The game words work here too, against a practice field.

```python
quiver = ["arrow", "arrow", "silver arrow"]
quiver.append("bowstring")
print(quiver)
print(sorted(quiver))
print(quiver[0:2])
print(sorted([tower_cost("archer"), tower_cost("cannon"), tower_cost("ice")]))
```

Intro: *"המחסן שלך. הוסיפי דברים, מחקי דברים, נסי פרוסות עם מספרים שונים. נסי
גם `quiver.remove("thunderbolt")` — כאן זה בטוח, וכדאי שתראי את `ValueError`
פעם אחת בשקט. ואם מתחשק לך, בקשי מ־`tower_cost` את המחירים ותסדרי אותם."*

## The battles

Four training battles, one great battle, and an optional one. Every task is a
real defense; nothing here is a printed report for its own sake. Level schema:
`spec/09-battle-game.md`.

All six levels were run headless against the vendored engine: **each stated
solution wins its own battle, and an empty program loses every one of them.**

The through-line is **triage**. Lesson 9 asked "how many". Lesson 10 asks "how
much, in what order, and which part of it can I afford" — and the answer changes
the build, so a wrong read loses the battle rather than printing a wrong number.

### b1 — המחירון · The Price List · 20 XP, 5 🪙

**Why this mechanic** — `min`, `max` and `sum` over a list she did not type: the
three prices come back from `tower_cost()`. The gold is exactly `sum(prices)`,
so the total is not decoration — it is the budget.

**level**
```js
{
  map: { cols: 12, rows: 7, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4]] },
  gold: 210, campHp: 3, seed: 20, allowed: ["archer", "ice", "cannon"],
  waves: [
    { delay: 0, enemies: [{ kind: "satyr", count: 4, gap: 0.9 }] },
    { delay: 8, enemies: [{ kind: "hellhound", count: 2, gap: 1.2 }] },
  ],
}
```

**brief** — `זואי לא נותנת לך מחירון כתוב. הפקודה tower_cost() נותנת מחיר אחד
בכל פעם — אספי את השלושה לרשימה אחת.

הדפיסי את הזול ביותר, את היקר ביותר ואת הסכום של השלושה. תשווי את הסכום לזהב
שיש לך: הוא בדיוק אותו מספר, כלומר יש לך אחד מכל סוג ולא יותר.

בני קשת ב־(3, 3), קרח ב־(6, 3) ותותח ב־(8, 3).`

**starter**
```python
prices = [tower_cost("archer"), tower_cost("ice"), tower_cost("cannon")]
print(prices)
```

**solution**
```python
prices = [tower_cost("archer"), tower_cost("ice"), tower_cost("cannon")]
print(prices)
cheapest = min(prices)
dearest = max(prices)
whole_set = sum(prices)
print(cheapest)
print(dearest)
print(whole_set)
place_tower("archer", 3, 3)
place_tower("ice", 6, 3)
place_tower("cannon", 8, 3)
```

**check**
```js
{ kind: "battle",
  also: { kind: "source", mustInclude: ["tower_cost(", "min(", "max(", "sum("],
          message: { he: "המחירים צריכים לבוא מ־tower_cost, והדוח מ־min, max ו־sum",
                     en: "The prices must come from tower_cost, and the report from min, max and sum" } } }
```

**hints**
1. `כמה זהב יש לך, ומה יוצא מ־sum(prices)? זה אותו מספר. מה זה אומר לך על כמה
   מגדלים אפשר לבנות?`
2. `` `min(prices)` נותן את הזול, `max(prices)` את היקר ו־`sum(prices)` את הסכום —
   שלושתם עוטפים את הרשימה בסוגריים. ``
3. `` שלוש שורות דוח ואז שלוש שורות בנייה: `place_tower("archer", 3, 3)`,
   `place_tower("ice", 6, 3)`, `place_tower("cannon", 8, 3)`. הקרח כמעט לא עושה
   נזק — הוא מאט את הכלבים כדי שהתותח יספיק. ``

### b2 — התוכנית שמשתנה · The Plan That Changes · 25 XP, 7 🪙

**Why this mechanic** — `.remove()`, `.append()` and `.sort()`: a build plan is
not carved in stone. Column 4 turned out to be road, and a tower there is a build
error that loses the battle, so the removal is the level.

**level**
```js
{
  map: {
    cols: 12, rows: 7,
    path: [[0,4],[1,4],[2,4],[3,4],[4,4],[4,3],[4,2],[5,2],[6,2],[6,3],[6,4],
           [7,4],[8,4],[9,4],[10,4],[11,4]],
    rock: [[9,1]],
  },
  gold: 200, campHp: 3, seed: 21, allowed: ["archer"],
  waves: [
    { delay: 0, enemies: [{ kind: "satyr", count: 5, gap: 0.8 }] },
    { delay: 8, enemies: [{ kind: "hellhound", count: 4, gap: 1.1 }] },
  ],
}
```

**brief** — `התוכנית שקיבלת בבוקר היא plan = [7, 2, 9, 4], כולן בשורה 3.

שני דברים השתנו מאז:
• הדרך עולה מהמעבר דרך עמודה 4 — המשבצת הזאת היא כביש. הוציאי אותה.
• הסיירת מצאה משבצת חדשה בעמודה 11. הוסיפי אותה.

סדרי את התוכנית, הדפיסי אותה, ואז בני את כולה בלולאה. הזהב מספיק בדיוק לארבעה.`

**starter**
```python
plan = [7, 2, 9, 4]
print(plan)
```

**solution**
```python
plan = [7, 2, 9, 4]
plan.remove(4)
plan.append(11)
plan.sort()
print(plan)
for x in plan:
    place_tower("archer", x, 3)
```

**check**
```js
{ kind: "battle",
  also: { kind: "source", mustInclude: [".remove(", ".append(", ".sort()", "for"],
          message: { he: "התוכנית צריכה להשתנות בקוד — remove, append ו־sort — ולא להיכתב מחדש ביד",
                     en: "The plan must be edited in code — remove, append and sort — not retyped by hand" } } }
```

**hints**
1. `הריצי את התוכנית המקורית כמו שהיא. מה המשחק אומר, ועל איזו עמודה?`
2. `` `.remove(4)` מוחק **לפי ערך** — ולכן כותבים 4, לא 3. `.append(11)` מוסיף
   בסוף, ו־`.sort()` מסדר במקום. אף אחת מהן לא מוחזרת לתוך המשתנה. ``
3. `` ארבע שורות לפני הלולאה: הרשימה, `plan.remove(4)`, `plan.append(11)`,
   `plan.sort()`. שימי לב: `plan = plan.sort()` יהפוך את plan ל־None, והלולאה
   שאחריה תיפול. אחר כך `for x in plan:` עם `place_tower("archer", x, 3)`. ``

### b3 — שלושה מקומות בלבד · Three Places Only · 25 XP, 7 🪙

**Why this mechanic** — `.sort()` followed by `spots[0:3]`. Five candidate
columns, gold for three. On this map the road doubles back on itself in the west,
so a tower there covers three stretches at once; the three western columns hold
and the three eastern ones leak. Sorting is what turns "the west" into "the first
three".

**level**
```js
{
  map: {
    cols: 14, rows: 9,
    path: [[0,6],[1,6],[2,6],[3,6],[4,6],[4,5],[4,4],[3,4],[2,4],[1,4],[1,3],
           [1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2],[11,2],
           [12,2],[13,2]],
    rock: [[12,6]],
  },
  gold: 150, campHp: 3, seed: 22, allowed: ["archer"],
  waves: [
    { delay: 0,  enemies: [{ kind: "satyr", count: 5, gap: 0.8 }] },
    { delay: 10, enemies: [{ kind: "hellhound", count: 3, gap: 1.1 }] },
  ],
}
```

**brief** — `המפרץ הזה מכופל: הדרך עולה מזרחה, חוזרת מערבה, ועולה שוב. בצד
המערבי מגדל אחד משקיף על שלושה קטעים של דרך בבת אחת.

יש לך חמש משבצות מסומנות, spots = [9, 2, 11, 5, 7] בשורה 3, וזהב לשלושה מגדלים
בלבד. סדרי את הרשימה, קחי את שלוש הראשונות אחרי הסידור, ובני אותן.`

**starter**
```python
spots = [9, 2, 11, 5, 7]
print(spots)
```

**solution**
```python
spots = [9, 2, 11, 5, 7]
spots.sort()
print(spots)
western = spots[0:3]
print(western)
for x in western:
    place_tower("archer", x, 3)
```

**check**
```js
{ kind: "battle",
  also: { kind: "source", mustInclude: [".sort()", "spots[0:3]"],
          message: { he: "שלוש המשבצות צריכות לצאת מפרוסה של הרשימה המסודרת, לא להיכתב ביד",
                     en: "The three places must come out of a slice of the sorted list, not be typed by hand" } } }
```

**hints**
1. `במפה הזאת, מה עושה מגדל בעמודה 2 שמגדל בעמודה 11 לא עושה? תסתכלי כמה פעמים
   הדרך עוברת לידו.`
2. `` אחרי `spots.sort()` הרשימה היא `[2, 5, 7, 9, 11]` — כלומר ממערב למזרח.
   פרוסה `spots[0:3]` לוקחת מ־0 **עד** 3 בלי 3, שלוש הראשונות. ``
3. `` `spots.sort()` בלי השמה, ואז `western = spots[0:3]`, ואז
   `for x in western:` עם `place_tower("archer", x, 3)`. אם תבני את שלוש
   האחרונות — `spots[2:5]` — שתי מפלצות יעברו, וזה בדיוק ההבדל שהמפה הזאת
   מודדת. ``

### b4 — תקציב לפי הנזק · A Budget Measured in Damage · 30 XP, 8 🪙

**Why this mechanic** — `sum()` twice, on two different lists, because the answer
is two different numbers. The slate has a ground column and an air column, and a
cannon cannot touch anything airborne. Summing the wrong column produces a build
that watches four harpies fly over it.

**level**
```js
{
  map: { cols: 12, rows: 7, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4]] },
  gold: 370, campHp: 3, seed: 23, allowed: ["archer", "cannon"],
  waves: [
    { delay: 0,  enemies: [{ kind: "satyr", count: 3, gap: 0.7 }] },
    { delay: 5,  enemies: [{ kind: "hellhound", count: 2, gap: 1.0 }] },
    { delay: 12, enemies: [{ kind: "cyclops", count: 1, gap: 2 }] },
    { delay: 18, enemies: [{ kind: "harpy", count: 4, gap: 0.8 }] },
  ],
}
```

**brief** — ``זואי ספרה את הגל מהתורן וכתבה שתי עמודות על הלוח:

ground_hp = [20, 20, 20, 70, 70, 160]
air_hp = [30, 30, 30, 30]

הכלל של הציידות: **תותח אחד לכל 120 נקודות חיים על הקרקע, וקשת אחת לכל 60
נקודות חיים באוויר.** חלקי בעזרת `//` משיעור 4.

התותחים עומדים על הרכס — ridge = [2, 5, 8] בשורה 3. הקשתות על החוף —
shore = [3, 7] בשורה 5. בני בדיוק כמה שהחשבון אומר; הזהב מספיק בדיוק לזה.

זכרי מה תותח לא יודע לעשות.``

**starter**
```python
ground_hp = [20, 20, 20, 70, 70, 160]
air_hp = [30, 30, 30, 30]
print(sum(ground_hp))
print(sum(air_hp))
```

**solution**
```python
ground_hp = [20, 20, 20, 70, 70, 160]
air_hp = [30, 30, 30, 30]
wave = get_wave()
print(len(wave))

cannons = sum(ground_hp) // 120
archers = sum(air_hp) // 60
print(cannons)
print(archers)

ridge = [2, 5, 8]
for i in range(cannons):
    place_tower("cannon", ridge[i], 3)

shore = [3, 7]
for i in range(archers):
    place_tower("archer", shore[i], 5)
```

**check**
```js
{ kind: "battle",
  also: { kind: "source", mustInclude: ["sum(", "for", "//"],
          message: { he: "מספר המגדלים חייב לצאת מ־sum ו־// על הלוח, לא להיכתב ביד",
                     en: "The tower counts must come out of sum and // over the slate, not be typed by hand" } } }
```

**hints**
1. `360 נקודות חיים על הקרקע ו־120 באוויר. אם תבני רק תותחים — מי בדיוק יעצור
   את ההרפיות?`
2. `` `sum(ground_hp) // 120` נותן את מספר התותחים ו־`sum(air_hp) // 60` את מספר
   הקשתות. אחר כך `for i in range(cannons):` עם `ridge[i]` — בדיוק תבנית הבנייה
   משיעור 9. ``
3. `` שלושה תותחים ושתי קשתות. שתי לולאות נפרדות: הראשונה על `range(cannons)`
   שמציבה `"cannon"` ב־`ridge[i]` בשורה 3, השנייה על `range(archers)` שמציבה
   `"archer"` ב־`shore[i]` בשורה 5. אם תבני ארבעה תותחים במקום שלושה — הזהב
   ייגמר, וזאת שגיאת בנייה. ``

## The great battle — קו הרכס של זואי · The Quartermaster's Line · 55 XP, 14 🪙

**Why this mechanic** — every list tool in the lesson, each doing the job it was
built for: `.sort()` on the prices, `.remove()`/`.append()`/`.sort()` on the
plan, `sorted(..., reverse=True)` with a slice to find the three heaviest
monsters in the last assault, and `sum()` on that slice to decide whether the
ford needs artillery. The archers alone lose this one.

**level**
```js
{
  map: {
    cols: 16, rows: 9,
    path: [[0,2],[1,2],[2,2],[3,2],[3,3],[3,4],[4,4],[5,4],[6,4],[6,5],[6,6],
           [7,6],[8,6],[9,6],[9,5],[9,4],[10,4],[11,4],[12,4],[12,3],[12,2],
           [13,2],[14,2],[15,2]],
    rock: [[5,7],[14,6]],
  },
  gold: 430, campHp: 3, seed: 24, allowed: ["archer", "cannon"],
  waves: [
    { delay: 0,  enemies: [{ kind: "satyr", count: 8, gap: 0.6 }] },
    { delay: 8,  enemies: [{ kind: "harpy", count: 8, gap: 0.7 }] },
    { delay: 18, enemies: [{ kind: "hellhound", count: 8, gap: 0.8 }] },
    { delay: 30, enemies: [{ kind: "hellhound", count: 5, gap: 0.8 },
                           { kind: "cyclops", count: 3, gap: 1.5 }] },
  ],
}
```

**brief** — `זואי נותנת לך את המחסן כולו ואת המצר לשמור עליו.

1. אספי את המחירים של קשת ותותח לרשימה, סדרי אותה והדפיסי. הדפיסי גם כמה
   מפלצות בגל.
2. קו הרכס: line = [1, 5, 12, 8, 10] בשורה 3. עמודה 12 היא כביש — הוציאי אותה.
   הסיירת הוסיפה את עמודה 4 — הוסיפי אותה. סדרי, ובני קשתות על כולן.
3. הגל הרביעי הוא הכבד: last_assault = [70, 70, 70, 70, 70, 160, 160, 160].
   קחי את שלוש הכבדות ביותר בעזרת sorted עם reverse ופרוסה. **אם הסכום שלהן
   גדול מ־300** — המעבר צריך תותחים: בני שניים, ב־(7, 7) וב־(9, 7).

הזהב מספיק בדיוק לחמש קשתות ולשני תותחים.`

**starter**
```python
wave = get_wave()
print(len(wave))
line = [1, 5, 12, 8, 10]
print(line)
```

**solution**
```python
wave = get_wave()
prices = [tower_cost("archer"), tower_cost("cannon")]
prices.sort()
print(prices)
print(len(wave))

line = [1, 5, 12, 8, 10]
line.remove(12)
line.append(4)
line.sort()
print(line)
for x in line:
    place_tower("archer", x, 3)

last_assault = [70, 70, 70, 70, 70, 160, 160, 160]
heaviest = sorted(last_assault, reverse=True)[0:3]
print(heaviest)
if sum(heaviest) > 300:
    place_tower("cannon", 7, 7)
    place_tower("cannon", 9, 7)
```

**check**
```js
{ kind: "battle",
  also: { kind: "source", mustInclude: [".remove(", ".append(", "sorted(", "sum(", "[0:3]"],
          message: { he: "הקרב הזה דורש את הכלים עצמם: remove ו־append על התוכנית, ו־sorted עם פרוסה וסכום על הגל הכבד",
                     en: "This battle needs the tools themselves: remove and append on the plan, and sorted with a slice and a sum on the heavy assault" } } }
```

**hints**
1. `שלוש הכבדות בגל האחרון הן קיקלופים. מה קשת עושה למישהו עם שריון 5, ומה תותח
   עושה לו?`
2. `` `sorted(last_assault, reverse=True)` מחזיר עותק מסודר מהגדול לקטן ומשאיר
   את המקורי בשקט; `[0:3]` לוקח ממנו את שלוש הראשונות, ו־`sum` עליהן נותן את
   המספר שה־`if` בודק. ``
3. `` סדר העבודה: מחירים → `prices.sort()` והדפסה → `len(wave)` → עריכת `line`
   בשלוש שורות (`remove`, `append`, `sort`) → לולאה שבונה קשת בכל עמודה בשורה 3
   → `heaviest = sorted(last_assault, reverse=True)[0:3]` → `if sum(heaviest) > 300:`
   ובתוכו שני התותחים ב־(7, 7) וב־(9, 7). חמש קשתות ושני תותחים הם 430 בדיוק. ``

## Optional battle — בלי הכלים של האלים · Without the Gods' Tools · 25 XP, 8 🪙

> **אופציונלי.** לא חוסם כלום, לא נדרש כדי לסיים את השיעור, ואפשר לחזור אליו
> בכל רגע מהמפה. הוא כאן בשביל הסקרנות.

**Why this mechanic** — the same answer `max()` gives, written by hand: a
variable that remembers the best index so far. She is banned from `max`, `min`,
`sorted` and `.sort`, so the "best so far" loop from the inside of those tools is
the only way through — and this time the winner is not a printed name, it is
where the single cannon goes.

**level** — the same doubled bay as b3, with a heavier assault.
```js
{
  map: {
    cols: 14, rows: 9,
    path: [[0,6],[1,6],[2,6],[3,6],[4,6],[4,5],[4,4],[3,4],[2,4],[1,4],[1,3],
           [1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2],[11,2],
           [12,2],[13,2]],
    rock: [[12,6]],
  },
  gold: 290, campHp: 3, seed: 25, allowed: ["archer", "cannon"],
  waves: [
    { delay: 0,  enemies: [{ kind: "satyr", count: 6, gap: 0.7 }] },
    { delay: 9,  enemies: [{ kind: "hellhound", count: 7, gap: 0.8 }] },
    { delay: 22, enemies: [{ kind: "cyclops", count: 3, gap: 1.3 }] },
  ],
}
```

**brief** — `זואי לוקחת ממך את הכלים: אסור max, אסור min, אסור sorted ואסור
.sort. רק לולאה, השוואה, ומשתנה שזוכר.

לכל משבצת יש מספר שאומר על כמה קטעי דרך היא משקיפה:

spots = [9, 2, 11, 5, 7]
coverage = [2, 5, 1, 4, 3]

מצאי את ה־index של המשבצת עם הכיסוי הגדול ביותר, שימי שם את התותח היחיד שלך,
ובני קשת בכל שאר המשבצות. הכול בשורה 3.`

**starter**
```python
spots = [9, 2, 11, 5, 7]
coverage = [2, 5, 1, 4, 3]
print(spots[0])
print(coverage[0])
```

**solution**
```python
spots = [9, 2, 11, 5, 7]
coverage = [2, 5, 1, 4, 3]

best = 0
for i in range(len(coverage)):
    if coverage[i] > coverage[best]:
        best = i
print(best)
print(spots[best])

place_tower("cannon", spots[best], 3)
for i in range(len(spots)):
    if i != best:
        place_tower("archer", spots[i], 3)
```

**check**
```js
{ kind: "battle",
  also: { kind: "source", mustExclude: ["max(", "min(", "sorted(", ".sort("],
          message: { he: "משימת הצד הזאת אסורה בכלים המוכנים — max, min, sorted ו־.sort מחוץ למשחק",
                     en: "This side battle bans the ready-made tools — no max, min, sorted or .sort" } } }
```

**hints**
1. `את מסתכלת על מספר אחד בכל סיבוב. מה את צריכה לזכור בין סיבוב לסיבוב כדי
   לדעת בסוף מי ניצח?`
2. `` משתנה `best` שמחזיק **index** ולא ערך: מתחיל ב־0, ומתעדכן כש
   `coverage[i] > coverage[best]`. אחרי הלולאה, `spots[best]` היא המשבצת. ``
3. `` שתי לולאות. הראשונה מוצאת את `best`. השנייה בונה: `place_tower("cannon",
   spots[best], 3)` פעם אחת, ואז `for i in range(len(spots)):` עם
   `if i != best:` שמציב קשת בכל השאר. שימי לב שהתנאי הוא `>` ולא `>=` — עם
   `>=` תיקו היה עובר למשבצת המאוחרת יותר. ``

## Reward & Recap

**Item**: 🏹 **אשפת הציידות / The Hunters' Quiver** — `אשפה שאף פעם לא מתמלאת
עד הסוף ואף פעם לא מתרוקנת לגמרי. זואי נתנה לך אותה בלי לומר מילה, וזה אצלה
מחמאה.` (Also adds bead #10 to the camp necklace.)

**Achievements possible here**:
- *Quartermaster* — win the great battle on the first run.
- *The Long Way Round* — win the optional battle without the gods' tools.
- *No Hints Needed* — finish the lesson with zero hints.

**Recap bullets**:
- `.append(x)` מוסיף לסוף, `.remove(x)` מוחק לפי **ערך** ולא לפי מיקום
- `.remove` על ערך שלא קיים נותן `ValueError` — `in` משיעור 9 הוא הבלם
- `.sort()` מסדר את הרשימה **במקום** ומחזיר `None`; `sorted(x)` מחזיר רשימה חדשה
- `x[a:b]` היא פרוסה: מ־a **עד** b בלי b, והיא סלחנית לגבולות
- `min`, `max`, `sum` מסכמים רשימת מספרים; ממוצע הוא `sum / len`
- `tower_cost()` נותן מחיר אחד; רשימה של מחירים היא כבר תקציב שאפשר לחשב עליו
- סיכום של העמודה הלא נכונה הוא תשובה מדויקת לשאלה הלא נכונה — תותח לא יורה למעלה

**Next teaser**: *"רשימות טובות בשאלה 'מה נמצא במקום 3'. בשיעור הבא הרמס ישאל
אותך שאלה אחרת לגמרי: 'על מה בדיוק פוסידון שולט?' — ולזה צריך פנקס, לא מגילה."*

## Common mistakes to anticipate

| She does | She sees | Hint must cover |
| --- | --- | --- |
| `hunters = hunters.sort()` | `None`, then `TypeError: 'NoneType' does not support indexing` | `.sort()` changes in place and returns nothing |
| `supplies.remove("poison")` when absent | `ValueError: list.remove(x): x not in list (line 2)` | check with `in` first |
| `quiver.append("a", "b")` | `TypeError: append() takes exactly one argument (2 given)` | one item per `append` |
| `quiver.sorted()` | `AttributeError: 'list' object has no attribute 'sorted' (line 2)` | `sorted(x)` wraps, `.sort()` attaches |
| `watch[0:3]` expected to include index 3 | silently one item short | slices stop *before* the second number |
| `sum(["a", "b"])` | `TypeError` | `sum`/`min`/`max` are for numbers |
| `.remove` on a duplicated value | only the first copy disappears | `remove` deletes one match, not all |
| sorting `inventory` while `weights` stays put | the report reads right but the pairs are wrong | parallel lists break the moment one is reordered |
| all cannons against a wave with harpies | *"that tower is a cannon, and it cannot hit anything airborne"* | artillery is blind to flyers; the air column needs archers |
| keeps column 4 in b2's plan | *"You cannot build on the path itself"*, battle over at full HP | `.remove(4)` deletes by **value**, and it is the whole task |
| builds `spots[2:5]` in b3 | two monsters leak | the west of this map watches three stretches of road at once |
| one tower more than the gold covers | *"Not enough gold for that tower"* | every level's gold is exactly the intended build |

## Implementation notes

- Every code sample and solution here was executed against the vendored
  `skulpt.min.js`, and **every level was simulated headless**: each solution
  wins its own battle and an empty program loses all six. Verified specifically:
  `.append`, `.remove`, `.sort()`, `sorted()`, `sorted(x, reverse=True)`,
  slicing including open ends (`x[1:]`, `x[:2]`), out-of-range slices returning
  `[]` with no error, `min`/`max`/`sum`, `round(sum(x)/len(x), 1)`, and
  `tower_cost()` inside a list literal.
- Skulpt's wording for the `.sort()`-returns-`None` trap is
  `TypeError: 'NoneType' does not support indexing`; CPython 3 says
  `'NoneType' object is not subscriptable`. Show Skulpt's text, since that is
  what appears on her screen — the same honesty policy `01-architecture.md`
  applies to the division-by-zero difference.
- `round(sum(weights) / len(weights), 1)` yields exactly `3.6` and
  `round(118/5, 1)` exactly `23.6` in Skulpt; no float-formatting surprise.
- b3's `source` check requires the literal `spots[0:3]`, so the three columns
  have to be cut out of the sorted list rather than retyped. It is a loose guard
  on purpose — combined with the battle itself it is sufficient, and it cannot
  fail a legitimate solution.
- The optional battle's `mustExclude` list is short and literal on purpose. It
  never blocks lesson completion, never blocks the next stop on the map, and its
  XP is a bonus on top of the lesson budget.
- **The wave is still a list of dicts and this lesson still does not open one.**
  `get_wave()` is used for `len()` and for slices; the hit points she sums come
  from the scouts' slate, which is a plain list of numbers. Lesson 11 replaces
  the slate with the monsters themselves, and the two parallel columns in b4 are
  the deliberate setup for it — the same fragility lesson 11 opens by breaking.
- **Every level's `gold` is exactly the intended build.** Under-building leaks,
  over-building raises a `tooPoor` build error, and `check.kind: "battle"` fails
  on any build error, so both mistakes are legible failures rather than near
  misses.
- **The cannon cannot hit flying enemies** (`spec/09-battle-game.md`). b4 and the
  great battle are built on that fact; do not re-tune their waves without
  re-checking it, because it is what makes the two-column triage necessary.
- Seeds `20`–`25` are fixed per level, so a battle plays out identically on every
  run and a hint can honestly say "watch where it nearly got through".
- No `input()` in this lesson.
