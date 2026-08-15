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
| **XP** | 20 + 25 + 25 + 30 (training) + 50 (quest) + 30 (bonus) = **180** · optional side quest +25 |
| **drachmas** | 5 + 7 + 7 + 8 + 12 = **39** 🪙 · optional side quest +8 |

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
   ValueError: list.remove(x): x not in list on line 2
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

12. **compare** — the same answer, two ways. This sets up the side quest.
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
    השנייה מלמדת אותך מה קורה מתחת. במשימת הצד היום תכתבי את השנייה.`

13. **callout · myth** — title: *זואי סופרת חצים* / *Zoë counts arrows*
    הציידות של ארטמיס נודדות אלפיים שנה עם מה שהן נושאות על הגב. אין להן מחסן
    ואין להן עגלות. זואי יודעת בעל־פה כמה חצים יש לכל אחת, מה הכי כבד, ומה
    אפשר להשאיר מאחור. `min`, `max` ו־`sum` הם בדיוק זה, בשלוש מילים.

## Try It (ungraded)

```python
quiver = ["arrow", "arrow", "silver arrow"]
quiver.append("bowstring")
print(quiver)
print(sorted(quiver))
print(quiver[0:2])
```

Intro: *"המחסן שלך. הוסיפי דברים, מחקי דברים, נסי פרוסות עם מספרים שונים. נסי
גם `quiver.remove("thunderbolt")` — כאן זה בטוח, וכדאי שתראי את `ValueError`
פעם אחת בשקט."*

## Training exercises

### e1 — Restock the quiver · 20 XP, 5 🪙

**brief** — `לזואי נגמרו החצים המיוחדים. הוסיפי לאשפה חץ כסף ואז מיתר, בסדר הזה,
והדפיסי את האשפה ואת מספר הפריטים בה.`

**starter**
```python
quiver = ["arrow", "arrow", "arrow"]
# add "silver arrow", then "bowstring"
# then print the quiver, then the count
```

**solution**
```python
quiver = ["arrow", "arrow", "arrow"]
quiver.append("silver arrow")
quiver.append("bowstring")
print(quiver)
print(f"{len(quiver)} items in the quiver")
```

Expected output:
```
['arrow', 'arrow', 'arrow', 'silver arrow', 'bowstring']
5 items in the quiver
```

**check**
```js
{ kind: "output", mode: "normalized",
  expect: "['arrow', 'arrow', 'arrow', 'silver arrow', 'bowstring']\n5 items in the quiver" }
```

**hints**
1. `איזו פעולה מוסיפה פריט לסוף רשימה? ואיפה בדיוק היא מוסיפה אותו?`
2. `` `quiver.append("silver arrow")` מוסיף פריט אחד. פריט שני דורש קריאה שנייה. ``
3. `שתי שורות append, אחת מתחת לשנייה, בסדר שביקשו. אחריהן print(quiver),
   ואז f-string עם len(quiver). שימי לב: אין השמה — לא כותבים
   quiver = quiver.append(...).`

### e2 — Drop the dead weight · 25 XP, 7 🪙

**brief** — `יש רעל במחסן. הוציאי אותו, סדרי את מה שנשאר לפי סדר אלף־בית, הדפיסי
את המדף המסודר ואת הפריט הראשון עליו.`

**starter**
```python
supplies = ["nectar", "poison", "ambrosia", "rope"]
# remove the poison, sort what is left, then print
```

**solution**
```python
supplies = ["nectar", "poison", "ambrosia", "rope"]
supplies.remove("poison")
supplies.sort()
print(supplies)
print(f"First on the shelf: {supplies[0]}")
```

Expected output:
```
['ambrosia', 'nectar', 'rope']
First on the shelf: ambrosia
```

**check**
```js
{ kind: "output", mode: "normalized",
  expect: "['ambrosia', 'nectar', 'rope']\nFirst on the shelf: ambrosia" }
```

**hints**
1. `שתי פעולות פה משנות את הרשימה עצמה. מה יקרה אם תשימי את התוצאה שלהן חזרה
   לתוך המשתנה?`
2. `` `.remove("poison")` מוחק לפי ערך, `.sort()` מסדר במקום. שתיהן לא מחזירות
   רשימה. ``
3. `` שורה 1: supplies.remove("poison"). שורה 2: supplies.sort() — בלי
   `supplies =` לפניה, אחרת תקבלי None. אחר כך print(supplies), ו־f-string עם
   supplies[0]. ``

### e3 — Three watches · 25 XP, 7 🪙

**brief** — `שש דמויות על הסיפון, ויש שלוש משמרות. המשמרת הראשונה היא שלושת
הראשונים, האחרונה היא שני האחרונים, והאמצעית היא השניים שבאמצע. חתכי את הרשימה
בפרוסות והדפיסי שלוש שורות.`

**starter**
```python
watch = ["Zoe", "Thalia", "Bianca", "Phoebe", "Annabeth", "Grover"]
# First watch:  the first three
# Last watch:   the last two
# Middle watch: the two in the middle
```

**solution**
```python
watch = ["Zoe", "Thalia", "Bianca", "Phoebe", "Annabeth", "Grover"]
first_watch = watch[0:3]
last_watch = watch[4:6]
middle_watch = watch[2:4]
print(f"First watch: {first_watch}")
print(f"Last watch: {last_watch}")
print(f"Middle watch: {middle_watch}")
```

Expected output:
```
First watch: ['Zoe', 'Thalia', 'Bianca']
Last watch: ['Annabeth', 'Grover']
Middle watch: ['Bianca', 'Phoebe']
```

**check**
```js
{ kind: "output", mode: "normalized",
  expect: "First watch: ['Zoe', 'Thalia', 'Bianca']\nLast watch: ['Annabeth', 'Grover']\nMiddle watch: ['Bianca', 'Phoebe']" }
```
plus
```js
{ kind: "source", mustInclude: ["watch["],
  message: { he: "המשימה הזאת דורשת פרוסות מתוך watch — לא רשימות שנכתבו ביד",
             en: "This one needs slices taken from watch — not lists typed out by hand" } }
```

**hints**
1. `אם המשמרת הראשונה היא indexes 0, 1, 2 — איזה מספר שני צריך לכתוב בפרוסה כדי
   שהיא תיעצר אחרי 2?`
2. `` פרוסה נכתבת `watch[a:b]` ולוקחת מ־a **עד** b, בלי b עצמו. שלוש הפרוסות
   שלך מתחילות ב־0, ב־4 וב־2. ``
3. `` המשמרת הראשונה: watch[0:3]. האחרונה: יש שישה פריטים, אז האחרונים הם 4 ו־5,
   כלומר watch[4:6]. האמצעית: watch[2:4]. שמרי כל פרוסה במשתנה ואז הדפיסי אותו
   בתוך f-string. ``

### e4 — Quartermaster's report · 30 XP, 8 🪙

**brief** — `זואי רוצה דוח על משקלי הציוד: הכי קל, הכי כבד, סך הכול, וממוצע
מעוגל לספרה אחת אחרי הנקודה. ארבע שורות, בסדר הזה.`

**starter**
```python
strength = [12, 40, 25, 8, 33]
# Weakest:
# Strongest:
# Total:
# Average:   (rounded to one decimal place)
```

**solution**
```python
strength = [12, 40, 25, 8, 33]
print(f"Weakest: {min(strength)}")
print(f"Strongest: {max(strength)}")
print(f"Total: {sum(strength)}")
print(f"Average: {round(sum(strength) / len(strength), 1)}")
```

Expected output:
```
Weakest: 8
Strongest: 40
Total: 118
Average: 23.6
```

**check**
```js
{ kind: "output", mode: "normalized",
  expect: "Weakest: 8\nStrongest: 40\nTotal: 118\nAverage: 23.6" }
```
plus
```js
{ kind: "source", mustInclude: ["min(", "max(", "sum("],
  message: { he: "הדוח חייב להיות מחושב מהרשימה — min, max ו־sum, לא מספרים שכתבת ביד",
             en: "The report must be computed from the list — min, max and sum, not numbers typed by hand" } }
```

**hints**
1. `ממוצע הוא סכום חלקי כמות. יש לך כלי לסכום, ומשיעור 9 יש לך כלי לכמות.`
2. `` `min`, `max` ו־`sum` עוטפים את הרשימה בסוגריים. את העיגול עושים עם
   `round(number, 1)` משיעור 4. ``
3. `` שלוש השורות הראשונות הן f-string אחד לכל כלי. הרביעית מרכיבה שניים:
   `sum(strength) / len(strength)` נותן את הממוצע, ו־`round(..., 1)` עוטף אותו
   כדי לקבל 23.6 ולא 23.6000001. ``

## Quest — "The Hunters' Inventory" · מלאי הציידות · 50 XP, 12 🪙

**brief** — `זואי רוצה את הדוח המלא, ובסוף — שהרעל יעוף מהמחסן. כתבי תוכנית
שמדפיסה: כותרת, כמה פריטים, כל פריט ממוספר מ־1 עם המשקל שלו בסוגריים, את
הרשימה מסודרת לפי אלף־בית **בלי לשנות את הסדר המקורי**, את המשקל הקל, הכבד,
הסכום והממוצע — ואז מוציאה את הרעל ומדפיסה מה נשאר.`

**starter**
```python
inventory = ["nectar", "rope", "poison", "ambrosia", "torch"]
weights = [2, 8, 1, 2, 5]

# === HUNTERS' INVENTORY ===
# Items: ?
# 1. name (weight)      <- numbered from 1
# Sorted: ...           <- alphabetical, but inventory itself must not change yet
# Lightest / Heaviest / Total weight / Average weight
# then remove the poison and report what is left
```

**solution**
```python
inventory = ["nectar", "rope", "poison", "ambrosia", "torch"]
weights = [2, 8, 1, 2, 5]

print("=== HUNTERS' INVENTORY ===")
print(f"Items: {len(inventory)}")
for i in range(len(inventory)):
    print(f"{i + 1}. {inventory[i]} ({weights[i]})")
ordered = sorted(inventory)
print(f"Sorted: {ordered}")
print(f"Lightest: {min(weights)}")
print(f"Heaviest: {max(weights)}")
print(f"Total weight: {sum(weights)}")
print(f"Average weight: {round(sum(weights) / len(weights), 1)}")
inventory.remove("poison")
print("Poison removed.")
print(f"Items left: {len(inventory)}")
print(f"Kept: {inventory}")
```

Expected output (verified in Skulpt):
```
=== HUNTERS' INVENTORY ===
Items: 5
1. nectar (2)
2. rope (8)
3. poison (1)
4. ambrosia (2)
5. torch (5)
Sorted: ['ambrosia', 'nectar', 'poison', 'rope', 'torch']
Lightest: 1
Heaviest: 8
Total weight: 18
Average weight: 3.6
Poison removed.
Items left: 4
Kept: ['nectar', 'rope', 'ambrosia', 'torch']
```

**check**
```js
{ kind: "output", mode: "normalized",
  expect: "=== HUNTERS' INVENTORY ===\nItems: 5\n1. nectar (2)\n2. rope (8)\n3. poison (1)\n4. ambrosia (2)\n5. torch (5)\nSorted: ['ambrosia', 'nectar', 'poison', 'rope', 'torch']\nLightest: 1\nHeaviest: 8\nTotal weight: 18\nAverage weight: 3.6\nPoison removed.\nItems left: 4\nKept: ['nectar', 'rope', 'ambrosia', 'torch']" }
```

Why this quest: the last line is the trap and the teaching. `Kept:` prints the
**original order** minus the poison — proof that `sorted()` never touched
`inventory`. A learner who used `.sort()` instead will get every line right
except the last one, and the failure message points exactly there.

The two parallel lists (`inventory` and `weights`) are also a deliberate setup:
they stay aligned only because nothing was reordered. Lesson 11 opens by showing
why two parallel lists are a fragile way to store paired data.

**hints**
1. `שורת Sorted ושורת Kept מתארות את אותה רשימה בשני רגעים שונים. אם תסדרי את
   inventory עצמה — מה יקרה לשורה האחרונה?`
2. `` `sorted(inventory)` מחזיר רשימה חדשה ומשאיר את המקורית בשקט. `.sort()`
   היה משנה אותה לתמיד. הפריטים והמשקלים מיושרים לפי אותו index, אז לולאה אחת
   על `range(len(inventory))` נותנת לך את שניהם. ``
3. `` סדר העבודה: כותרת → Items עם len → לולאה על range(len(inventory))
   שמדפיסה `{i + 1}. {inventory[i]} ({weights[i]})` → ordered = sorted(inventory)
   והדפסה שלו → ארבע שורות min/max/sum/round → inventory.remove("poison") →
   שלוש שורות סיום. ``

## Optional side quest — "Without the Gods' Tools" · בלי הכלים של האלים · 25 XP, 8 🪙

> **אופציונלי.** לא חוסם כלום, לא נדרש כדי לסיים את השיעור, ואפשר לחזור אליו
> בכל רגע מהמפה. הוא כאן בשביל הסקרנות.

**brief** — `זואי לוקחת ממך את הכלים. בלי max, בלי index מוכן — רק לולאה,
השוואות, ומשתנה שזוכר את הכי טוב עד עכשיו. מצאי את החזקה בחבורה (אם יש תיקו,
הראשונה מנצחת), ואז חפשי שני שמות ברשימה והדפיסי את המיקום שלהם. שם שלא נמצא
מקבל -1.`

**starter**
```python
heroes = ["Zoe", "Thalia", "Bianca", "Phoebe"]
strength = [31, 44, 27, 44]

# Strongest: NAME (VALUE)
# Bianca is at position ?
# Luke is at position ?      <- -1 when the name is not in the list
```

**solution**
```python
heroes = ["Zoe", "Thalia", "Bianca", "Phoebe"]
strength = [31, 44, 27, 44]

best = 0
for i in range(len(strength)):
    if strength[i] > strength[best]:
        best = i
print(f"Strongest: {heroes[best]} ({strength[best]})")

target = "Bianca"
found = -1
for i in range(len(heroes)):
    if heroes[i] == target:
        found = i
        break
print(f"{target} is at position {found}")

target = "Luke"
found = -1
for i in range(len(heroes)):
    if heroes[i] == target:
        found = i
        break
print(f"{target} is at position {found}")
```

Expected output (verified in Skulpt):
```
Strongest: Thalia (44)
Bianca is at position 2
Luke is at position -1
```

**check**
```js
{ kind: "output", mode: "normalized",
  expect: "Strongest: Thalia (44)\nBianca is at position 2\nLuke is at position -1" }
```
plus
```js
{ kind: "source", mustExclude: ["max(", "min(", ".index("],
  message: { he: "משימת הצד הזאת אסורה בכלים המוכנים — max, min ו־.index מחוץ למשחק",
             en: "This side quest bans the ready-made tools — no max, no min, no .index" } }
```

Note that `in` is not forbidden and does not need to be: `in` answers *whether*,
and this task asks *where*. Discovering that gap is part of the exercise.

**hints**
1. `אם את חייבת להסתכל על מספר אחד בכל פעם, מה את צריכה לזכור בין סיבוב לסיבוב
   של הלולאה?`
2. `` החזקה: משתנה `best` שמחזיק **index** של הטובה עד עכשיו, מתחיל ב־0, ומתעדכן
   כשמופיע ערך גדול ממנו. החיפוש: משתנה `found` שמתחיל ב־-1 ומתעדכן רק אם
   נמצאה התאמה — ו־`break` משיעור 7 עוצר ברגע שמצאת. ``
3. `` תיקו נשמר לראשונה כי התנאי הוא `>` ולא `>=` — עם `>=` תלמה הייתה מפסידה
   לפיבי. בחיפוש, `found` נשאר -1 אם הלולאה נגמרה בלי התאמה, וזה בדיוק מה
   שאמור לקרות עם Luke. ``

## Reward & Recap

**Item**: 🏹 **אשפת הציידות / The Hunters' Quiver** — `אשפה שאף פעם לא מתמלאת
עד הסוף ואף פעם לא מתרוקנת לגמרי. זואי נתנה לך אותה בלי לומר מילה, וזה אצלה
מחמאה.` (Also adds bead #10 to the camp necklace.)

**Achievements possible here**:
- *Quartermaster* — complete the quest with the original order intact on the
  first run (used `sorted`, not `.sort`).
- *The Long Way Round* — finish the optional side quest.
- *No Hints Needed* — finish the lesson with zero hints.

**Recap bullets**:
- `.append(x)` מוסיף לסוף, `.remove(x)` מוחק לפי **ערך** ולא לפי מיקום
- `.remove` על ערך שלא קיים נותן `ValueError` — `in` משיעור 9 הוא הבלם
- `.sort()` מסדר את הרשימה **במקום** ומחזיר `None`; `sorted(x)` מחזיר רשימה חדשה
- `x[a:b]` היא פרוסה: מ־a **עד** b בלי b, והיא סלחנית לגבולות
- `min`, `max`, `sum` מסכמים רשימת מספרים; ממוצע הוא `sum / len`

**Next teaser**: *"רשימות טובות בשאלה 'מה נמצא במקום 3'. בשיעור הבא הרמס ישאל
אותך שאלה אחרת לגמרי: 'על מה בדיוק פוסידון שולט?' — ולזה צריך פנקס, לא מגילה."*

## Common mistakes to anticipate

| She does | She sees | Hint must cover |
| --- | --- | --- |
| `hunters = hunters.sort()` | `None`, then `TypeError: 'NoneType' does not support indexing` | `.sort()` changes in place and returns nothing |
| `supplies.remove("poison")` when absent | `ValueError: list.remove(x): x not in list on line 2` | check with `in` first |
| `quiver.append("a", "b")` | `TypeError: append() takes exactly one argument (2 given)` | one item per `append` |
| `quiver.sorted()` | `AttributeError: 'list' object has no attribute 'sorted' on line 2` | `sorted(x)` wraps, `.sort()` attaches |
| `watch[0:3]` expected to include index 3 | silently one item short | slices stop *before* the second number |
| `sum(["a", "b"])` | `TypeError` | `sum`/`min`/`max` are for numbers |
| `.remove` on a duplicated value | only the first copy disappears | `remove` deletes one match, not all |
| sorting `inventory` while `weights` stays put | the report reads right but the pairs are wrong | parallel lists break the moment one is reordered |

## Implementation notes

- Every code sample, solution and side-quest solution here was executed against
  the vendored `skulpt.min.js`. Verified specifically: `.append`, `.remove`,
  `.sort()`, `.sort(reverse=True)`, `sorted()`, `sorted(x, reverse=True)`,
  slicing including open ends (`x[1:]`, `x[:2]`), out-of-range slices returning
  `[]` with no error, `min`/`max`/`sum`, and `round(sum(x)/len(x), 1)`.
- Skulpt's wording for the `.sort()`-returns-`None` trap is
  `TypeError: 'NoneType' does not support indexing`; CPython 3 says
  `'NoneType' object is not subscriptable`. Show Skulpt's text, since that is
  what appears on her screen — the same honesty policy `01-architecture.md`
  applies to the division-by-zero difference.
- `round(sum(weights) / len(weights), 1)` yields exactly `3.6` and
  `round(118/5, 1)` exactly `23.6` in Skulpt; no float-formatting surprise.
- e3's `source` check requires the literal `watch[`, so the three lines have to
  be cut out of the list rather than retyped by hand. It is a loose guard on
  purpose — combined with the exact output check it is sufficient, and it cannot
  fail a legitimate solution.
- The side quest's `mustExclude` list is short and literal on purpose. It never
  blocks lesson completion, never blocks the next stop on the map, and its XP is
  a bonus on top of the lesson budget.
- No `input()` in this lesson.
