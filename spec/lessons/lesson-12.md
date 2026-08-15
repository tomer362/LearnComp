# Lesson 12 — BOSS: The Hydra · ההידרה

> **Act III — Sea of Monsters · ים המפלצות** · Stop 12 of 20 · **ACT III BOSS**
> Structure follows `spec/lessons/lesson-01.md`. Schema: `spec/04-lesson-template.md`.
> Boss rules: `spec/02-game-design.md` § Boss fights.

| | |
| --- | --- |
| **id** | `12` |
| **slug** | `the-hydra` |
| **minutes** | 35 (the longest lesson in Act III — it closes the act) |
| **concepts** | nested lists, dicts whose values are lists, dicts of dicts, iterating nested structures, counting, searching |
| **new vocabulary** | `x[a][b]`, `d[k][k2]`, nesting |
| **requires** | L9 lists, indexing, `len()`, `for`, `in` · L10 `.append`/`sorted`/`min`/`max`/`sum` · L11 dicts, `.get`, `.items()` · L6 `if`/`elif`/`else` · L3 `input()` and f-strings |
| **item** | 🐑 גיזת הזהב / The Golden Fleece |
| **XP** | 20 + 25 + 30 + 30 (training) + 60 (boss) + 30 (bonus) = **195** · optional side quest +30 |
| **drachmas** | 5 + 7 + 8 + 8 + 15 = **43** 🪙 · optional side quest +8 |
| **boss** | `{ name: { he: "ההידרה", en: "The Hydra" }, icon: "🐉", hp: 5 }` — 5 heads, one per test case |

## Teaching goal

Everything in Act III has been *flat*: a list of names, a dict of names to
domains. Lesson 12 says the quiet part out loud — **a value inside a list or a
dict can itself be a list or a dict**, and nothing new is needed to read it.
`heads[0][1]` is two lookups written next to each other, left to right.

The boss then makes her build the thing the whole act was pointing at: a program
that holds a structure, summarises it, takes input, searches inside it, and
reports. It uses lists, dicts, nesting, loops, conditions, `in`, `.get`, `len`,
`min`/`sum` and f-strings — every tool from lessons 9, 10 and 11 in one file,
with nothing from lesson 13 needed.

Thematic payload: **you do not beat the Hydra by cutting.** Cut a head and two
grow back — the boss's own arithmetic proves it, and one of the test cases makes
the Hydra come out *stronger*. You beat it by knowing exactly what is in front
of you. That is what a data structure is for.

## Story beat

The gate of the Sea of Monsters is behind them. The water ahead boils. What comes
up is not one monster with one health bar — it is a monster made of records, each
head with its own hit points and its own weakness, and it grows while you fight
it. Chiron's advice, shouted over the noise, is to stop swinging and start
reading.

The Prophecy panel (5 lines, no code):

> המים לפני השער רותחים.
> מתוכם עולה ההידרה — לא ראש אחד, ולא שניים.
> כירון צועק אלייך מעל הרעש: "אל תנופפי בחרב!"
> "כל ראש שתכרתי — שניים יצמחו במקומו."
> "את לא מנצחת אותה בכוח. את מנצחת אותה בזה שאת יודעת בדיוק מה עומד מולך."

Cast: Chiron (from the deck, shouting), Annabeth (does the arithmetic out loud
and reaches the same conclusion), Grover (counting heads, losing count).

## Chiron Teaches — block by block

1. **prose** — עד עכשיו כל תא ברשימה החזיק דבר פשוט: מחרוזת, מספר. אבל לפייתון
   לא אכפת מה יושב בתא. אפשר לשים שם רשימה שלמה. אפשר לשים שם מילון שלם. שום
   כלל חדש לא נוסף היום — רק ההבנה שהכללים שאת מכירה מתקננים זה בתוך זה.

2. **code (runnable)** — a list of lists.
   ```python
   heads = [["fire", 30], ["ice", 20], ["poison", 25]]
   print(heads[0])
   print(heads[0][0])
   print(heads[0][1])
   ```
   Output:
   ```
   ['fire', 30]
   fire
   30
   ```
   Caption: `heads[0] הוא רשימה. ולרשימה יש index משלה — ולכן heads[0][0].`

3. **callout · tip** — title: *לקרוא משמאל לימין* / *Read it left to right*
   `heads[0][1]` הוא לא סימן אחד מוזר. הוא שתי שליפות אחת אחרי השנייה:
   1. `heads[0]` → הרשימה `["fire", 30]`
   2. ואז `[1]` על התוצאה הזאת → `30`
   הטריק לכל חיים: **קראי מהשמאל ימינה, שלב אחד בכל פעם, ותשאלי בכל שלב "מה יש
   לי עכשיו ביד?"**. אם את לא בטוחה — הדפיסי את השלב האמצעי בשורה נפרדת. זה
   מותר, זה זול, וזה מה שמתכנתות עושות באמת.

4. **code (runnable)** — `len` at two levels.
   ```python
   heads = [["fire", 30], ["ice", 20], ["poison", 25]]
   print(len(heads))
   print(len(heads[0]))
   ```
   Output:
   ```
   3
   2
   ```
   Caption: `שלושה ראשים. לכל ראש שני פרטים. שתי שאלות שונות לחלוטין.`

5. **error block** — the nested `IndexError`.
   ```python
   heads = [["fire", 30], ["ice", 20]]
   print(heads[1][2])
   ```
   Real error (verified in Skulpt):
   ```
   IndexError: list index out of range on line 2
   ```
   Explanation: השורה הזאת מבלבלת כי היא נראית כמו השגיאה משיעור 9, אבל הפעם יש
   **שני** מספרים שיכולים להיות אשמים. `heads[1]` קיים לגמרי — הוא
   `["ice", 20]`. מה שלא קיים זה `[2]` **בתוכו**, כי יש לו רק שני תאים: 0 ו־1.
   השיטה: פרקי את השורה. הדפיסי `heads[1]` לבד. אם זה עבד — האשם הוא המספר
   השני. אם זה נפל — האשם הוא הראשון. שתי הרצות, ונגמר הניחוש.

6. **code (runnable)** — looping a nested list.
   ```python
   heads = [["fire", 30], ["ice", 20], ["poison", 25]]
   for head in heads:
       print(f"{head[0]} head with {head[1]} hp")
   ```
   Output:
   ```
   fire head with 30 hp
   ice head with 20 hp
   poison head with 25 hp
   ```
   Caption: `בכל סיבוב, head הוא רשימה קטנה. ולכן בתוך הלולאה כותבים head[0]
   ו־head[1] — בלי index חיצוני בכלל.`

7. **code (runnable)** — a dict whose values are lists.
   ```python
   crew = {"Annabeth": ["knife", "cap"], "Grover": ["reed pipes"]}
   print(crew["Annabeth"][0])
   print(len(crew["Annabeth"]))
   for thing in crew["Grover"]:
       print(thing)
   ```
   Output:
   ```
   knife
   2
   reed pipes
   ```
   Caption: `אותו רעיון בדיוק, רק שהשלב הראשון הוא מפתח ולא מספר.`

8. **code (runnable)** — a dict of dicts. This is the boss's shape.
   ```python
   hydra = {
       "fire": {"hp": 30, "weakness": "water"},
       "ice": {"hp": 20, "weakness": "torch"},
   }
   print(hydra["fire"]["weakness"])
   print(hydra["fire"])
   ```
   Output:
   ```
   water
   {'hp': 30, 'weakness': 'water'}
   ```
   Caption: `hydra["fire"] הוא מילון שלם. השאלה השנייה, ["weakness"], נשאלת
   עליו. שוב: משמאל לימין, שלב אחד בכל פעם.`

9. **compare** — the same data, two shapes. This is a design decision, not a
   right/wrong.
   - good (a) — label: *רשימה של רשימות — כשהסדר חשוב ואת סופרת:*
     ```python
     heads = [["fire", 30], ["ice", 20]]
     print(heads[0][1])
     ```
   - good (b) — label: *מילון של מילונים — כשאת מחפשת לפי שם:*
     ```python
     heads = {"fire": {"hp": 30}, "ice": {"hp": 20}}
     print(heads["fire"]["hp"])
     ```
   Caption: `שאלי את עצמך: "איך אני אחפש בזה מחר?" לפי מקום — רשימה. לפי שם —
   מילון. ל־hp אין שם ברשימה, רק מיקום 1, וזה בדיוק ההבדל.`

10. **code (runnable)** — the counting pattern over a nested structure.
    ```python
    hydra = {
        "fire": {"hp": 30, "weakness": "water"},
        "ice": {"hp": 20, "weakness": "torch"},
        "poison": {"hp": 25, "weakness": "antidote"},
    }
    strong = 0
    for name, head in hydra.items():
        if head["hp"] > 20:
            strong = strong + 1
    print(f"heads above 20 hp: {strong}")
    ```
    Output: `heads above 20 hp: 2`
    Caption: `accumulator משיעור 7, items משיעור 11, וקינון משיעור 12. אף כלי
    חדש — רק הרכבה.`

11. **code (runnable)** — the searching pattern: best so far.
    ```python
    hydra = {
        "fire": {"hp": 30, "weakness": "water"},
        "ice": {"hp": 20, "weakness": "torch"},
        "poison": {"hp": 25, "weakness": "antidote"},
    }
    weakest = ""
    lowest = 1000
    for name, head in hydra.items():
        if head["hp"] < lowest:
            lowest = head["hp"]
            weakest = name
    print(f"Weakest: {weakest} ({lowest})")
    ```
    Output: `Weakest: ice (20)`
    Caption: `שני משתנים שזוכרים יחד — השם והמספר — ומתעדכנים יחד. זו אותה
    תבנית מהצד האופציונלי של שיעור 10, עכשיו על מבנה מקונן.`

12. **callout · warn** — title: *הבאג הכי שקט בקינון* / *The quietest nesting bug*
    `head["hp"]` ו־`head["HP"]` הם שני מפתחות שונים לגמרי. הראשון עובד, השני
    נותן `KeyError: HP`. וכשמערבבים מבנים — `hydra["fire"][0]` על מילון ייתן
    `KeyError: 0`, כי למילון אין מקומות. הכלל: **תשאלי בכל שלב מה יש לך ביד.**
    רשימה עונה למספרים. מילון עונה לשמות.

13. **callout · myth** — title: *למה כריתה לא עוזרת* / *Why cutting does not help*
    הרקולס נלחם בהידרה, וכל ראש שכרת הצמיח שניים. בסוף הוא ניצח רק כשהפסיק
    לכרות והתחיל לחשוב. אנבת' עושה את החשבון בקול: ראש שנופל מוריד את ה־hp שלו,
    ושני ראשים חדשים מוסיפים 10 כל אחד. אם תכרתי ראש עם 15 hp — המפלצת תצא
    מהעסקה **חזקה יותר**. במשימת הבוס תראי את המספר הזה בעיניים.

## Try It (ungraded)

```python
hydra = {
    "fire": {"hp": 30, "weakness": "water"},
    "ice": {"hp": 20, "weakness": "torch"},
}
print(hydra["fire"])
print(hydra["fire"]["hp"])
for name, head in hydra.items():
    print(f"{name}: {head['hp']} hp")
```

Intro: *"המפלצת שלך. הוסיפי ראשים, שני hp, נסי `hydra["fire"][0]` ותראי מה
קורה. פרקי שורה מקוננת לשתי שורות ותראי מה יש לך ביד באמצע — זה הכלי הכי שימושי
בשיעור הזה."*

## Training exercises

### e1 — Reading the watch rota · 20 XP, 5 🪙

**brief** — `לוח המשמרות בנוי כרשימה של רשימות: בכל שורה שם ושעה. הדפיסי את השם
הראשון, את השעה של השורה השנייה, ואת השורה השלישית כמשפט שלם.`

**starter**
```python
watch = [["Annabeth", "midnight"], ["Grover", "dawn"], ["Tyson", "noon"]]
# line 1: the name in the first row
# line 2: the hour in the second row
# line 3: NAME takes the HOUR watch     (from the third row)
```

**solution**
```python
watch = [["Annabeth", "midnight"], ["Grover", "dawn"], ["Tyson", "noon"]]
print(watch[0][0])
print(watch[1][1])
print(f"{watch[2][0]} takes the {watch[2][1]} watch")
```

Expected output:
```
Annabeth
dawn
Tyson takes the noon watch
```

**check**
```js
{ kind: "output", mode: "normalized",
  expect: "Annabeth\ndawn\nTyson takes the noon watch" }
```

**hints**
1. `כמה שורות יש בלוח, וכמה תאים יש בכל שורה? שתי שאלות שונות, שני מספרים
   שונים.`
2. `` `watch[1]` נותן לך שורה שלמה. כדי להיכנס לתוכה, הוסיפי סוגריים נוספים:
   `watch[1][1]`. ``
3. `` השם הראשון: שורה 0, תא 0 → watch[0][0]. השעה בשורה השנייה: שורה 1, תא 1 →
   watch[1][1]. המשפט האחרון: שני חלקים מהשורה 2, בתוך f-string. אם התבלבלת בין
   שני המספרים — הדפיסי קודם את watch[2] לבד ותראי מה יש שם. ``

### e2 — Count the heads · 25 XP, 7 🪙

**brief** — `ההידרה נספרת בפעם הראשונה. הדפיסי שורה לכל ראש עם ה־hp שלו, ואז
כמה ראשים יש וכמה hp בסך הכול. חובה לולאה — הרשימה תגדל בהמשך.`

**starter**
```python
heads = [["fire", 30], ["ice", 20], ["poison", 25], ["acid", 15]]
# NAME: HP        for every head
# Heads: ?
# Total hp: ?
```

**solution**
```python
heads = [["fire", 30], ["ice", 20], ["poison", 25], ["acid", 15]]
total = 0
for head in heads:
    print(f"{head[0]}: {head[1]}")
    total = total + head[1]
print(f"Heads: {len(heads)}")
print(f"Total hp: {total}")
```

Expected output:
```
fire: 30
ice: 20
poison: 25
acid: 15
Heads: 4
Total hp: 90
```

**check**
```js
{ kind: "output", mode: "normalized",
  expect: "fire: 30\nice: 20\npoison: 25\nacid: 15\nHeads: 4\nTotal hp: 90" }
```
plus
```js
{ kind: "source", mustInclude: ["for"],
  message: { he: "המשימה הזאת דורשת לולאת for — ההידרה מצמיחה ראשים, והקוד צריך לשרוד את זה",
             en: "This one needs a for loop — the Hydra grows heads and the code must survive it" } }
```

**hints**
1. `בתוך הלולאה, מה בדיוק יושב במשתנה בכל סיבוב — מחרוזת, מספר, או משהו אחר?`
2. `` `for head in heads:` נותן לך בכל סיבוב רשימה קטנה של שניים. השם הוא
   `head[0]` וה־hp הוא `head[1]`. הסכום הוא accumulator משיעור 7. ``
3. `` total = 0 לפני הלולאה. בתוך הלולאה: print עם head[0] ו־head[1], ואז
   total = total + head[1]. אחרי הלולאה, **מחוץ להזחה**: שתי שורות סיכום —
   len(heads) ו־total. אם ה־print האחרונים חוזרים ארבע פעמים, ההזחה שלהם
   שגויה. ``

### e3 — The armoury below deck · 30 XP, 8 🪙

**brief** — `לכל חבר צוות יש תיק עם ציוד. עברי על השמות בסדר שנתון ב־order,
והדפיסי לכל אחד את השם עם מספר הפריטים בסוגריים, ואז שורה עם מקף לכל פריט.
בסוף — כמה פריטים יש על הספינה בסך הכול.`

**starter**
```python
packs = {"Annabeth": ["knife", "cap", "map"], "Grover": ["reed pipes"], "Tyson": ["hammer", "shield"]}
order = ["Annabeth", "Grover", "Tyson"]
# NAME (COUNT)
# - item
# - item
# ...
# Items on board: ?
```

**solution**
```python
packs = {"Annabeth": ["knife", "cap", "map"], "Grover": ["reed pipes"], "Tyson": ["hammer", "shield"]}
order = ["Annabeth", "Grover", "Tyson"]
total = 0
for name in order:
    pack = packs[name]
    print(f"{name} ({len(pack)})")
    for thing in pack:
        print(f"- {thing}")
    total = total + len(pack)
print(f"Items on board: {total}")
```

Expected output:
```
Annabeth (3)
- knife
- cap
- map
Grover (1)
- reed pipes
Tyson (2)
- hammer
- shield
Items on board: 6
```

**check**
```js
{ kind: "output", mode: "normalized",
  expect: "Annabeth (3)\n- knife\n- cap\n- map\nGrover (1)\n- reed pipes\nTyson (2)\n- hammer\n- shield\nItems on board: 6" }
```
plus
```js
{ kind: "source", mustInclude: ["for", "packs["],
  message: { he: "הפריטים צריכים לצאת מתוך packs בלולאה, לא להיכתב ביד",
             en: "The items must come out of packs in a loop, not be typed by hand" } }
```

This is her first **nested loop**: a loop inside a loop, where the inner one runs
a different number of times each round. Expect this to be the hardest training
exercise in Act III, and let the hints carry it.

**hints**
1. `לכל שם יש מספר שונה של פריטים. כמה פעמים תרוץ הלולאה הפנימית עבור גרובר,
   וכמה עבור אנבת'?`
2. `` הלולאה החיצונית רצה על `order` ונותנת שם. `packs[name]` נותן את הרשימה
   שלו. לולאה שנייה, **בתוך** הראשונה, רצה על הרשימה הזאת ומדפיסה מקף לכל
   פריט. ``
3. `` total = 0 לפני הכול. לולאה חיצונית על order: שמרי את `packs[name]` במשתנה
   בשם pack, הדפיסי `{name} ({len(pack)})`, ואז לולאה פנימית
   `for thing in pack:` שמדפיסה `- {thing}` — מוזחת עוד רמה פנימה. אחרי הלולאה
   הפנימית, עדיין בתוך החיצונית: total = total + len(pack). ואחרי הכול, ללא
   הזחה: שורת הסיכום. ``

### e4 — Know the weakness · 30 XP, 8 🪙

**brief** — `לפני הקרב, סקירת מודיעין. עברי על שמות התקיפה לפי הסדר: אם הראש
קיים — הדפיסי אותו עם ה־hp והחולשה שלו; אם לא — הדפיסי שהוא לא קיים. בסוף,
מצאי את הראש עם הכי מעט hp והדפיסי את שמו. התוכנית לא רשאית לקרוס על שם מומצא.`

**starter**
```python
heads = {
    "fire": {"hp": 30, "weakness": "water"},
    "ice": {"hp": 20, "weakness": "torch"},
    "poison": {"hp": 25, "weakness": "antidote"},
}
attack = ["ice", "fire", "shadow"]
# NAME (HP) - weakness: WEAKNESS
# no such head: NAME
# Weakest head: NAME
```

**solution**
```python
heads = {
    "fire": {"hp": 30, "weakness": "water"},
    "ice": {"hp": 20, "weakness": "torch"},
    "poison": {"hp": 25, "weakness": "antidote"},
}
attack = ["ice", "fire", "shadow"]

for name in attack:
    if name in heads:
        head = heads[name]
        print(f"{name} ({head['hp']}) - weakness: {head['weakness']}")
    else:
        print(f"no such head: {name}")

weakest = ""
lowest = 1000
for name, head in heads.items():
    if head["hp"] < lowest:
        lowest = head["hp"]
        weakest = name
print(f"Weakest head: {weakest}")
```

Expected output:
```
ice (20) - weakness: torch
fire (30) - weakness: water
no such head: shadow
Weakest head: ice
```

**check**
```js
{ kind: "output", mode: "normalized",
  expect: "ice (20) - weakness: torch\nfire (30) - weakness: water\nno such head: shadow\nWeakest head: ice" }
```

**hints**
1. `` "shadow" לא נמצא במילון. מה יקרה לשורות שאחריו אם תשלפי אותו עם סוגריים
   מרובעים? ``
2. `` `if name in heads:` בודק מפתחות ומגן עלייך. לחיפוש החלש ביותר: שני
   משתנים שזוכרים — שם ומספר — שמתעדכנים יחד כשמוצאים ערך קטן יותר. ``
3. `` לולאה ראשונה על attack עם if/else. בתוך ה־if, שמרי את `heads[name]`
   במשתנה head, ואז `head["hp"]` ו־`head["weakness"]`. לולאה שנייה נפרדת על
   `heads.items()`: lowest מתחיל במספר גדול (1000), weakest במחרוזת ריקה, ושניהם
   מתעדכנים יחד בתוך ה־if. ``

## BOSS — The Hydra · ההידרה · 60 XP, 15 🪙

> `boss: { name: { he: "ההידרה", en: "The Hydra" }, icon: "🐉", hp: 5 }`
> חמישה ראשים, מקרה בדיקה לכל ראש. כל מקרה שעובר מוריד ראש אחד מהמד.
> אי אפשר להפסיד. אפשר רק עוד לא לסיים.

**brief** — `ההידרה עולה מהמים. כתבי תוכנית שעושה שני דברים: קודם מדווחת בדיוק
מה עומד מולך, ואז מבצעת מהלך תקיפה אחד לפי שתי שורות קלט.`

**The rules, stated exactly** (this is the spec she reads):

**חלק א׳ — הדיווח.** מדפיסים תמיד, לפני הקלט:
1. השורה `=== THE HYDRA ===`
2. שורה לכל ראש, **בסדר של הרשימה `order`**, בצורה `name: HP hp, weak to WEAKNESS`
3. `Heads: N` — כמה ראשים יש
4. `Total hp: T` — סכום ה־hp של כולם
5. `Weakest: NAME (HP)` — הראש עם הכי מעט hp

**חלק ב׳ — המהלך.** שתי קריאות `input()`: קודם שם הראש, אחריו הנשק.
- אם שם הראש **לא** קיים בהידרה → `There is no NAME head.`
- אחרת, אם הנשק **שווה** לחולשה של הראש → שתי שורות:
  `The NAME head falls!` ואז `Two heads grow back, 10 hp each.`
- אחרת → `The WEAPON does nothing. The NAME head needs WEAKNESS.`

**חלק ג׳ — הסיכום.** תמיד שתי שורות אחרונות:
- `Heads now: N` — 5 אם ראש נפל (אחד מת, שניים צמחו), אחרת 4
- `Total hp now: T` — אם ראש נפל: הסכום פחות ה־hp שלו ועוד 20. אחרת: הסכום כמו שהיה.

**starter**
```python
hydra = {
    "fire": {"hp": 30, "weakness": "water"},
    "ice": {"hp": 20, "weakness": "torch"},
    "poison": {"hp": 25, "weakness": "antidote"},
    "acid": {"hp": 15, "weakness": "shield"},
}
order = ["fire", "ice", "poison", "acid"]

# Part 1 - the report (always printed)
# Part 2 - target = input(), then weapon = input()
# Part 3 - Heads now / Total hp now
```

**solution**
```python
hydra = {
    "fire": {"hp": 30, "weakness": "water"},
    "ice": {"hp": 20, "weakness": "torch"},
    "poison": {"hp": 25, "weakness": "antidote"},
    "acid": {"hp": 15, "weakness": "shield"},
}
order = ["fire", "ice", "poison", "acid"]

print("=== THE HYDRA ===")
total = 0
weakest = ""
lowest = 1000
for name in order:
    head = hydra[name]
    print(f"{name}: {head['hp']} hp, weak to {head['weakness']}")
    total = total + head["hp"]
    if head["hp"] < lowest:
        lowest = head["hp"]
        weakest = name
print(f"Heads: {len(hydra)}")
print(f"Total hp: {total}")
print(f"Weakest: {weakest} ({lowest})")

target = input()
weapon = input()

heads_now = len(hydra)
total_now = total
if target not in hydra:
    print(f"There is no {target} head.")
else:
    if weapon == hydra[target]["weakness"]:
        print(f"The {target} head falls!")
        print("Two heads grow back, 10 hp each.")
        heads_now = heads_now - 1 + 2
        total_now = total_now - hydra[target]["hp"] + 20
    else:
        needed = hydra[target]["weakness"]
        print(f"The {weapon} does nothing. The {target} head needs {needed}.")
print(f"Heads now: {heads_now}")
print(f"Total hp now: {total_now}")
```

### The report block

Every test case begins with these seven identical lines. Call it **ROLL**:

```
=== THE HYDRA ===
fire: 30 hp, weak to water
ice: 20 hp, weak to torch
poison: 25 hp, weak to antidote
acid: 15 hp, weak to shield
Heads: 4
Total hp: 90
Weakest: acid (15)
```

### The five heads — test cases

Each case is ROLL followed by the lines in the third column. All five outputs
below were produced by running the solution above in Skulpt with the listed
stdin.

| # | Head cut | `stdin` | Tail after ROLL | What it proves |
| --- | --- | --- | --- | --- |
| 1 | 🔥 fire | `["fire", "water"]` | `The fire head falls!` · `Two heads grow back, 10 hp each.` · `Heads now: 5` · `Total hp now: 80` | the happy path: matching weakness, arithmetic on a nested value |
| 2 | 🧊 ice | `["ice", "torch"]` | `The ice head falls!` · `Two heads grow back, 10 hp each.` · `Heads now: 5` · `Total hp now: 90` | a kill that changes nothing — 20 out, 20 back in |
| 3 | 🧪 acid | `["acid", "shield"]` | `The acid head falls!` · `Two heads grow back, 10 hp each.` · `Heads now: 5` · `Total hp now: 95` | **cutting the weakest head makes the Hydra stronger** |
| 4 | ☠️ poison | `["poison", "torch"]` | `The torch does nothing. The poison head needs antidote.` · `Heads now: 4` · `Total hp now: 90` | the wrong weapon: the `else` branch, and the lookup that names the right one |
| 5 | 👻 shadow | `["shadow", "water"]` | `There is no shadow head.` · `Heads now: 4` · `Total hp now: 90` | a key that does not exist must not crash the program |

**check**
```js
{ kind: "cases", cases: [
  { stdin: ["fire", "water"],
    expect: "=== THE HYDRA ===\nfire: 30 hp, weak to water\nice: 20 hp, weak to torch\npoison: 25 hp, weak to antidote\nacid: 15 hp, weak to shield\nHeads: 4\nTotal hp: 90\nWeakest: acid (15)\nThe fire head falls!\nTwo heads grow back, 10 hp each.\nHeads now: 5\nTotal hp now: 80" },
  { stdin: ["ice", "torch"],
    expect: "=== THE HYDRA ===\nfire: 30 hp, weak to water\nice: 20 hp, weak to torch\npoison: 25 hp, weak to antidote\nacid: 15 hp, weak to shield\nHeads: 4\nTotal hp: 90\nWeakest: acid (15)\nThe ice head falls!\nTwo heads grow back, 10 hp each.\nHeads now: 5\nTotal hp now: 90" },
  { stdin: ["acid", "shield"],
    expect: "=== THE HYDRA ===\nfire: 30 hp, weak to water\nice: 20 hp, weak to torch\npoison: 25 hp, weak to antidote\nacid: 15 hp, weak to shield\nHeads: 4\nTotal hp: 90\nWeakest: acid (15)\nThe acid head falls!\nTwo heads grow back, 10 hp each.\nHeads now: 5\nTotal hp now: 95" },
  { stdin: ["poison", "torch"],
    expect: "=== THE HYDRA ===\nfire: 30 hp, weak to water\nice: 20 hp, weak to torch\npoison: 25 hp, weak to antidote\nacid: 15 hp, weak to shield\nHeads: 4\nTotal hp: 90\nWeakest: acid (15)\nThe torch does nothing. The poison head needs antidote.\nHeads now: 4\nTotal hp now: 90" },
  { stdin: ["shadow", "water"],
    expect: "=== THE HYDRA ===\nfire: 30 hp, weak to water\nice: 20 hp, weak to torch\npoison: 25 hp, weak to antidote\nacid: 15 hp, weak to shield\nHeads: 4\nTotal hp: 90\nWeakest: acid (15)\nThere is no shadow head.\nHeads now: 4\nTotal hp now: 90" },
] }
```

All five compare with `normalized` semantics, matching every other check in the
course.

### Fight staging

- The bar shows **five heads**. Each passing case removes one, with a short cut
  animation and two smaller heads sprouting behind it — cosmetic only, and
  disabled under `prefers-reduced-motion: reduce`.
- On the fifth pass the necks are cauterised, the Hydra sinks, and the Act III
  cutscene plays.
- **Partial progress is saved.** Three of five passing is three heads down, kept
  across a reload, shown on the map. There is no failure state and no timer.
- Failure text is diagnostic and never scolding: *"ראש ה־acid עדיין עומד. הריצי
  את הראש הזה לבד: הקלט הוא acid ואז shield. מה שונה בפלט שלך?"*

**hints**
1. `` חלק א׳ נבנה מלולאה אחת. שלוש התשובות שאחריה — Heads, Total hp, Weakest —
   כולן יכולות לצאת מאותה נסיעה. כמה לולאות באמת צריך שם? ``
2. `` חלק א׳: לולאה על `order` (לא על המילון — הסדר של השורות קבוע), ובתוכה
   `hydra[name]` שנותן מילון קטן עם `"hp"` ו־`"weakness"`. חלק ב׳: `input()`
   פעמיים, ואז `if target not in hydra:` בחוץ, ובתוך ה־else השוואה בין הנשק
   ל־`hydra[target]["weakness"]`. חלק ג׳: שני משתנים, `heads_now` ו־`total_now`,
   שמאותחלים למצב ההתחלתי ומשתנים **רק** בענף שבו ראש נפל. ``
3. `` המבנה המלא: כותרת → total = 0, lowest = 1000, weakest = "" → לולאה על
   order שמדפיסה שורת ראש, מוסיפה ל־total ומעדכנת את weakest → שלוש שורות
   הסיכום → שתי שורות input → heads_now = len(hydra) ו־total_now = total →
   if/else בשלושה ענפים → שתי שורות סיום, **מחוץ** לכל ה־if. שימי לב לחשבון של
   הענף המנצח: `heads_now - 1 + 2` ראשים, ו־`total_now - hp + 20` נקודות. אם
   מקרה 3 נכשל אצלך והשאר עוברים — כנראה הפחתת קבוע במקום את ה־hp האמיתי של
   הראש. ``

## Optional side quest — "Watch It Sort Itself" · לראות רשימה מסתדרת · 30 XP, 8 🪙

> **אופציונלי.** לא חוסם את סוף המערכה, לא נדרש לגיזה, ואפשר לחזור אליו מהמפה
> מתי שבא לך. הוא כאן כי זה יפה.

**brief** — `בשיעור 10 קיבלת את sorted() בחינם. עכשיו תראי מה הוא עושה בפנים.
עברי על הרשימה שוב ושוב, ובכל מעבר החליפי כל שני שכנים שיושבים בסדר הפוך.
הדפיסי את הרשימה אחרי כל מעבר — ותראי את המספרים הגדולים נודדים ימינה כמו
בועות. אסור להשתמש ב־sorted או ב־.sort.`

**starter**
```python
strength = [31, 12, 44, 27, 5]
# Start: the list as it is
# Pass 1: after one full sweep of neighbour swaps
# ... one line per pass, len - 1 passes in total
# Sorted: the finished list
```

**solution**
```python
strength = [31, 12, 44, 27, 5]
print(f"Start: {strength}")
for p in range(len(strength) - 1):
    for i in range(len(strength) - 1):
        if strength[i] > strength[i + 1]:
            bigger = strength[i]
            strength[i] = strength[i + 1]
            strength[i + 1] = bigger
    print(f"Pass {p + 1}: {strength}")
print(f"Sorted: {strength}")
```

Expected output (verified in Skulpt):
```
Start: [31, 12, 44, 27, 5]
Pass 1: [12, 31, 27, 5, 44]
Pass 2: [12, 27, 5, 31, 44]
Pass 3: [12, 5, 27, 31, 44]
Pass 4: [5, 12, 27, 31, 44]
```
followed by:
```
Sorted: [5, 12, 27, 31, 44]
```

**check**
```js
{ kind: "output", mode: "normalized",
  expect: "Start: [31, 12, 44, 27, 5]\nPass 1: [12, 31, 27, 5, 44]\nPass 2: [12, 27, 5, 31, 44]\nPass 3: [12, 5, 27, 31, 44]\nPass 4: [5, 12, 27, 31, 44]\nSorted: [5, 12, 27, 31, 44]" }
```
plus
```js
{ kind: "source", mustExclude: ["sorted(", ".sort("],
  message: { he: "כל העניין פה הוא לכתוב את המיון בעצמך — sorted ו־.sort מחוץ למשחק",
             en: "The whole point is writing the sort yourself — no sorted, no .sort" } }
```

**hints**
1. `` להחליף בין שני משתנים דורש מקום זמני. אם תכתבי `a = b` ואז `b = a` — מה
   קרה לערך המקורי של a? ``
2. `` ההחלפה היא שלוש שורות: לשמור את `strength[i]` במשתנה עזר, להעתיק את
   `strength[i + 1]` למקומו, ולשים את משתנה העזר במקום השני. הלולאה הפנימית
   רצה על `range(len(strength) - 1)` — כי `i + 1` צריך להישאר בתוך הרשימה. ``
3. `` לולאה חיצונית: `for p in range(len(strength) - 1)` — ארבעה מעברים לרשימה
   של חמישה. לולאה פנימית: `for i in range(len(strength) - 1)` עם ה־if וההחלפה.
   שורת ה־print של המעבר יושבת **בתוך** הלולאה החיצונית ו**מחוץ** לפנימית, אחרת
   תקבלי שורה לכל השוואה. אם הלולאה הפנימית רצה עד `len(strength)` — תקבלי
   IndexError בדיוק כמו בשיעור 9, כי `i + 1` יחרוג. ``

## Reward & Recap

**Item**: 🐑 **גיזת הזהב / The Golden Fleece** — `מה שכל המסע היה בשבילו. היא
מחזירה לחיים דברים גוססים — ויש עץ אחד על גבעה אחת שמחכה לה.` (Also adds bead
#12; the necklace is now three-fifths full.)

**Act III closes here.** The cutscene: the Fleece goes home, the tree on the hill
takes colour back, the camp border seals. Chiron says one line about what comes
next — the same three lines she has now written four times are about to get a
name.

**Achievements possible here**:
- *Hydra Slayer* — all five test cases passing.
- *Cartographer of Monsters* — pass case 3 on the first attempt, having worked
  out that the weakest head is the wrong one to cut.
- *Bubble Watcher* — finish the optional side quest.
- *Completionist* — every exercise in Act III, lessons 9 through 12.

**Recap bullets**:
- ערך בתוך רשימה או מילון יכול להיות **רשימה או מילון בעצמו** — בלי חוקים חדשים
- `x[0][1]` הוא שתי שליפות משמאל לימין; כשלא ברור — הדפיסי את השלב האמצעי
- `IndexError` על שורה מקוננת יכול להגיע משני מספרים שונים; פרקי אותה לשתי שורות
- לולאה בתוך לולאה עוברת על מבנה מקונן; ההזחה היא מה שקובע מי בתוך מי
- ספירה וחיפוש הן אותן שתי תבניות מלולאות רגילות — accumulator, ו"הכי טוב עד עכשיו"
- רשימה עונה למספרים, מילון עונה לשמות; בחירת המבנה היא החלטה, לא טעם

**Next teaser**: *"שמת לב שכתבת את אותה לולאת סיכום ארבע פעמים היום? בשיעור הבא
דדלוס יראה לך איך לכתוב אותה פעם אחת ולתת לה שם — ומשם, כל תוכנית שתכתבי תיראה
אחרת."*

## Common mistakes to anticipate

| She does | She sees | Hint must cover |
| --- | --- | --- |
| `heads[1][2]` on `["ice", 20]` | `IndexError: list index out of range on line 2` | the *inner* index is the guilty one — split the line to find out |
| `hydra["fire"][0]` on a dict of dicts | `KeyError: 0 on line 2` | a dict has no positions; ask it by name |
| `head["HP"]` | `KeyError: HP on line 2` | keys are case-sensitive, at every level |
| `heads[0][0][0]` on a plain string/number | `TypeError: 'int' does not support indexing on line 2` | one `[ ]` too many — check what you had in hand |
| inner `print` outside the inner loop | one item per person instead of all of them | indentation decides which loop a line belongs to |
| summary `print` inside the loop | the summary repeats every round | de-indent it to the outer level |
| `for name, head in hydra:` | `ValueError: too many values to unpack (expected 2) on line 2` | `.items()` yields pairs; a bare dict yields keys |
| swapping with `a = b` then `b = a` | both slots end up with the same value | a temporary variable is required (side quest) |
| inner loop to `range(len(x))` in bubble sort | `IndexError` on the last `i + 1` | stop at `len(x) - 1` |
| `input("Which head? ")` | boss cases fail on the prompt text | the boss reads bare `input()`; the prompt is drawn by the page |

## Implementation notes

- Every code sample, every solution, all five boss cases and the side quest were
  executed against the vendored `skulpt.min.js` with the listed stdin, and the
  outputs in this file are copied from those runs.
- **The boss uses bare `input()` with no prompt argument, deliberately.** Skulpt
  is configured with `inputfunTakesPrompt: true`, so a prompt string is handed to
  the page's Iris-message UI rather than written to stdout — meaning a prompt
  would render on screen but never appear in the captured output. Bare `input()`
  removes the ambiguity entirely. The brief tells her the two values arrive in
  order, head first and weapon second, and the UI labels the two prompts itself.
- `kind: "cases"` queues `stdin` per run, exactly as described in
  `01-architecture.md`. The five cases run independently; a failure in one does
  not affect the others, and per-case results persist so partial progress
  survives a reload.
- Verified nested access in Skulpt: `x[a][b]`, `d[k][k2]`, `d[k][index]`,
  `len()` at both levels, `.items()` over a dict of dicts, and nested quotes
  inside an f-string (`f"{head['hp']}"`).
- Dict iteration order is preserved in this Skulpt build, but the boss does not
  rely on it: part 1 iterates the explicit `order` list, so the report lines have
  a fixed sequence no matter what. This follows the rule set in lesson 11 —
  never let a graded check depend on dict ordering.
- `hp: 5` on the boss object means five bar segments, one per case — it is not a
  Python value and has nothing to do with the Hydra's in-fiction hit points,
  which live in the `hydra` dict. Keep the two apart in the UI copy.
- The side quest never blocks the Act III cutscene, the Golden Fleece, or the
  unlock of lesson 13. Its XP is a bonus on top of the lesson budget.
- Nothing in this lesson uses `def`, `return`, `import`, tuple unpacking outside
  `.items()`, list comprehensions, or `while` — the swap in the side quest is
  written with an explicit temporary variable for exactly that reason.
