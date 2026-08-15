# Lesson 14 — The Map Maker · יוצרת המפות

> **Act IV — The Titan's Curse · קללת הטיטאן** · Stop 14 of 20
> Structure follows `spec/lessons/lesson-01.md` (the reference lesson) and the
> schema in `spec/04-lesson-template.md`.

| | |
| --- | --- |
| **id** | `14` |
| **slug** | `the-map-maker` |
| **minutes** | 30–35 |
| **concepts** | `return`, `None`, several parameters, default values, local scope |
| **new vocabulary** | `return`, `None`, ערך ברירת מחדל / default, scope / תחום חיים |
| **requires** | L13 `def` + פרמטר יחיד · L11–12 dicts ומבנים מקוננים · L9 lists · L6 `if` · L3 f-strings |
| **item** | 🗺️ מפת המבוך / The Labyrinth Map |
| **XP** | 20 + 20 + 25 + 30 (training) + 55 (quest) + 30 (bonus) = **180** |
| **drachmas** | 5 + 5 + 7 + 8 + 14 = **39** 🪙 |

## Teaching goal

By the end she can write a function that **returns** a value, store that value in
a variable, use it in arithmetic, pass it to another function, and collect
returns in a loop. She can also read a function and answer the question that
separates beginners from non-beginners: *"what does this hand back?"*

**The central confusion this lesson exists to kill:** a function that `print`s
looks like it works, and then returns `None` and breaks everything downstream.
This is the single most common wall a beginner hits with functions. It gets a
dedicated `compare` block, a dedicated `error` block, and a dedicated debugging
exercise (e2). Do not let it be a footnote.

Scope is taught **through** `return`, not as a separate topic: a variable born
inside a function dies when the function ends — and `return` is how you get
something out before it does. That framing makes scope feel like a consequence
instead of a new rule to memorise.

## Story beat

Annabeth spreads a blank sheet of vellum on the table in the Big House and puts a
stone on each corner. She can draw the Labyrinth — she is a child of Athena, this
is what she does — but she needs numbers, and the numbers are inside the maze.

The learner sends a scout. The scout runs to the mouth of the Labyrinth, yells
something about "eleven, maybe twelve", and vanishes into the dark. Annabeth
stares at the blank sheet. Chiron raises an eyebrow.

The Prophecy panel (5 lines, no code):

> אנבת' פורשת קלף ריק על השולחן ומניחה אבן בכל פינה.
> "אני יכולה לצייר את המבוך," היא אומרת, "אם מישהו יביא לי מספרים."
> את שולחת סייר. הוא צועק משהו מרחוק, ונבלע בחושך.
> כירון מרים גבה. "צעקה היא לא מפה."
> "סייר טוב חוזר. ובידיים שלו יש משהו."

Cast: Annabeth (needs values, not noise — she is the reason `return` matters),
Chiron (the eyebrow), Grover (volunteers to be the scout, is talked out of it).

## Chiron Teaches — block by block

1. **prose** — שני סוגים של סיירים. אחד עולה על גבעה וצועק מה הוא רואה: את שומעת
   אותו, ואז הקול נעלם ולא נשאר כלום. השני חוזר אליך ומניח בידך פתק. שתי
   הפונקציות שנכתוב היום נראות כמעט אותו דבר — וההבדל ביניהן הוא כל השיעור.

2. **code (runnable)** — הסייר הצועק. פונקציה כמו אלה שכתבת אתמול:
   ```python
   def scout_distance(steps):
       print(steps * 3)

   scout_distance(4)
   ```
   Output: `12`
   Caption: עבד. ראית 12 על המסך. עכשיו נסי להשתמש ב-12 הזה למשהו.

3. **error** — הרגע שבו זה נשבר. **הבלוק החשוב בשיעור.**
   ```python
   def scout_distance(steps):
       print(steps * 3)

   total = scout_distance(4) + 10
   print(total)
   ```
   Error: `TypeError: unsupported operand type(s) for +: 'NoneType' and 'int'`
   Explain: המספר 12 הודפס למסך — אבל הוא לא **חזר** אליך. `print` שולח טקסט
   למסך, לא לתוכנית. מה שהפונקציה החזירה בפועל נקרא `None`, כלומר "כלום", ואי
   אפשר לחבר כלום ועשר. הפלט על המסך הוא בשבילך; **ערך שחוזר** הוא בשביל
   התוכנית. *(Note in the block that the `12` still prints before the error —
   she must see that "it printed" and "it worked" are different claims.)*

4. **code (runnable)** — הפתרון, בשורה אחת שונה:
   ```python
   def scout_distance(steps):
       return steps * 3

   total = scout_distance(4) + 10
   print(total)
   print(scout_distance(10))
   ```
   Output:
   ```
   22
   30
   ```
   Caption: `return` מוסר את הערך בחזרה למי שקרא לפונקציה.

5. **prose** — הכלל, במשפט אחד: **הקריאה לפונקציה הופכת להיות הערך שהוחזר.**
   פייתון מריצה את `scout_distance(4)`, מקבלת 12, ומחליפה את כל הקריאה ב-12 —
   ואז ממשיכה לחשב `12 + 10`. לכן אפשר לשים קריאה לפונקציה בכל מקום שבו אפשר
   לשים מספר: בתוך חישוב, בתוך `if`, בתוך f-string, בתוך רשימה.

6. **compare** — `print` מול `return`. שתי הפונקציות מקבלות אותם ארגומנטים.
   - **bad** — `label`: מדפיסה, ומחזירה `None`
     ```python
     def add_damage(a, b):
         print(a + b)

     total = add_damage(3, 4)
     print(total)
     ```
     Output:
     ```
     7
     None
     ```
     ה-7 הראשון הוא מה שהפונקציה הדפיסה. ה-`None` הוא מה שהיא באמת נתנה לך.
   - **good** — `label`: מחזירה ערך שאפשר להמשיך איתו
     ```python
     def add_damage(a, b):
         return a + b

     total = add_damage(3, 4)
     print(total)
     print(total + 10)
     ```
     Output:
     ```
     7
     17
     ```
     Caption for the pair: אותו מספר על המסך, שתי תוכניות שונות לגמרי. אם את
     צריכה לראות — `print`. אם את צריכה להמשיך — `return`.

7. **callout · warn** — כותרת: *"`None` הוא לא אפס"*.
   כל פונקציה שאין בה `return` מחזירה `None`. `None` הוא לא 0, לא `""` ולא
   `False` — הוא "אין פה כלום". כשאת רואה `None` בפלט, השאלה הראשונה היא: איפה
   שכחתי `return`? *(This callout is the debugging reflex the lesson is trying to
   install. Word it as a diagnostic, not as a definition.)*

8. **code (runnable)** — `return` עוצר את הפונקציה מיד:
   ```python
   def check_gate(password):
       if password == "olympus":
           return "The gate opens."
       return "The gate stays shut."

   print(check_gate("olympus"))
   print(check_gate("hydra"))
   ```
   Output:
   ```
   The gate opens.
   The gate stays shut.
   ```
   Caption: ברגע שפייתון מגיעה ל-`return`, הפונקציה נגמרת. שורות שאחריו לא ירוצו.
   לכן לא צריך `else` כאן — אם התנאי התקיים, כבר יצאנו.

9. **prose + code (runnable)** — יותר מפרמטר אחד. הסדר קובע:
   ```python
   def power(attack, bonus):
       return attack + bonus * 2

   print(power(3, 10))
   print(power(10, 3))
   ```
   Output:
   ```
   23
   16
   ```
   Caption: אותם שני מספרים, סדר הפוך, תוצאה אחרת. הארגומנט הראשון נכנס לפרמטר
   הראשון. פייתון לא מנחשת מה התכוונת.

10. **callout · tip** — כותרת: *"שמות הפרמטרים הם שמות פנימיים"*.
    `attack` ו-`bonus` הם השמות שהפונקציה נותנת לערכים אצלה בפנים. בחוץ אפשר
    לשלוח משתנים בשמות אחרים לגמרי, או מספרים בלי שם בכלל. הפונקציה לא יודעת
    מאיפה הערכים הגיעו — ובגלל זה אפשר להשתמש בה מכל מקום.

11. **code (runnable)** — ערך ברירת מחדל:
    ```python
    def damage(attack, bonus=0):
        return attack + bonus

    print(damage(12))
    print(damage(12, 8))
    ```
    Output:
    ```
    12
    20
    ```
    Caption: `bonus=0` אומר "אם לא שלחו לי `bonus`, תשתמשי ב-0". פרמטר עם ברירת
    מחדל הוא פרמטר **אופציונלי** — הקריאה הראשונה חוקית לגמרי.

12. **callout · warn** — כותרת: *"ברירות מחדל תמיד בסוף"*.
    `def damage(bonus=0, attack):` הוא `SyntaxError`. פייתון ממלאת ארגומנטים לפי
    סדר, ולכן כל הפרמטרים החובה חייבים לבוא לפני האופציונליים. אם קיבלת שגיאת
    תחביר בשורת `def` — בדקי את הסדר. *(Kept as a callout rather than a runnable
    error block: a `SyntaxError` in the definition aborts the whole cell, so
    there is nothing to see. Exact Skulpt wording flagged below.)*

13. **error** — scope. השגיאה שמסבירה למה `return` בכלל קיים:
    ```python
    def scout():
        secret = "the way out"

    scout()
    print(secret)
    ```
    Error: `NameError: name 'secret' is not defined`
    Explain: `secret` נולד בתוך הפונקציה, וכשהפונקציה נגמרה הוא נעלם איתה.
    משתנה שנוצר בתוך פונקציה חי רק שם — קוראים לזה **scope**, תחום החיים שלו.
    זה לא באג בפייתון, זה בכוונה: אחרת כל פונקציה הייתה יכולה לדרוך על משתנים של
    כל פונקציה אחרת. הדרך היחידה להוציא משהו החוצה היא להחזיר אותו.

14. **code (runnable)** — התיקון, ובו כל הרעיון של השיעור:
    ```python
    def scout():
        secret = "the way out"
        return secret

    way = scout()
    print(way)
    ```
    Output: `the way out`
    Caption: הסייר חזר, ובידיים שלו משהו. `way` הוא הפתק.

15. **callout · myth** — כותרת: *"למה אנבת' ולא אתנה"*.
    בני אתנה לא מקבלים תשובות מהאלה — הם בונים אותן. מפה היא בדיוק זה: מישהו
    נכנס לחושך, חוזר עם מספרים, ומישהי הופכת מספרים לתמונה. `return` הוא הרגע
    שבו המספרים עוברים מיד ליד.

## Try It (ungraded)

```python
def travel_time(distance, speed=5):
    return distance / speed

print(travel_time(100))
print(travel_time(100, 20))
print(travel_time(100, 2) + travel_time(50))
```

Intro: *"שחקי עם זה. שני את המספרים, שני את ברירת המחדל, נסי לקרוא לפונקציה בתוך
`print` ובתוך חישוב. ואם בא לך לראות משהו מוזר — החליפי את ה-`return` ב-`print`
והריצי שוב. שום דבר פה לא נבדק."*

*(That last suggestion is deliberate: reproducing the `None` bug on purpose, in a
place where nothing is at stake, is how it stops being frightening.)*

## Training exercises

### e1 — Return the Sum · 20 XP, 5 🪙

**brief:** כתבי פונקציה `total_drachmas` שמקבלת שני מספרים ו**מחזירה** את הסכום
שלהם. הדפיסי את התוצאה של `total_drachmas(12, 30)`.

**starter:**
```python
def total_drachmas(a, b):
    # החזירי כאן את הסכום

print(total_drachmas(12, 30))
```

**solution:**
```python
def total_drachmas(a, b):
    return a + b

print(total_drachmas(12, 30))
```

**check:**
```js
{ kind: "source", mustInclude: ["return"],
  message: { he: "כאן הפונקציה צריכה להחזיר ערך, לא להדפיס אותו",
             en: "This function must return a value, not print it" } }
{ kind: "output", mode: "normalized", expect: "42" }
```
*Note: `print` inside the function would also put `42` on the screen — the
`source` check is the only thing that distinguishes them, and its message is
written to teach, not to scold.*

**hints:**
1. ה-`print` כבר כתוב בשורה האחרונה. מה הפונקציה צריכה למסור לו?
2. מילה אחת, שורה אחת מוזחת: `return` ואחריו הביטוי לחישוב.
3. `return a + b` בתוך הפונקציה. אם תכתבי `print(a + b)` תראי 42 על המסך אבל
   הפונקציה תחזיר `None` — והבדיקה תזהה את זה.

### e2 — The Silent Scout · 20 XP, 5 🪙

**The debugging exercise for the core confusion.** The starter runs without an
error and prints something wrong — the worst kind of bug, met here on purpose.

**brief:** הקוד רץ בלי שגיאה ובכל זאת הפלט שבור: כתוב `The exit is None steps
away`. תקני את הפונקציה כך שהשורה תהיה נכונה. הפלט הסופי צריך להיות **שורה אחת
בלבד**.

**starter:**
```python
def find_exit(steps):
    print(steps * 2)

distance = find_exit(6)
print(f"The exit is {distance} steps away")
```

**solution:**
```python
def find_exit(steps):
    return steps * 2

distance = find_exit(6)
print(f"The exit is {distance} steps away")
```

**check:**
```js
{ kind: "output", mode: "normalized", expect: "The exit is 12 steps away" }
```
*A single `output` check is enough here: the broken version prints an extra `12`
line **and** the word `None`, so it fails on both counts. The "one line only"
sentence in the brief tells her the stray `12` must go, which is exactly what
replacing `print` with `return` does.*

**hints:**
1. מאיפה הגיעה המילה `None` לתוך המשפט? מה בדיוק `distance` מכיל אחרי השורה
   הרביעית?
2. הפונקציה מדפיסה את התוצאה ולא מוסרת אותה. משתנה שמקבל תוצאה של פונקציה בלי
   `return` מקבל `None`.
3. שני את `print(steps * 2)` ל-`return steps * 2`. שימי לב מה קורה לשורת ה-12
   שהופיעה קודם: היא נעלמת, כי כבר לא מדפיסים בתוך הפונקציה — וזה נכון, נשארה
   שורה אחת.

### e3 — Two Weapons · 25 XP, 7 🪙

**brief:** כתבי פונקציה `attack_power` עם פרמטר `base` ופרמטר `bonus` שברירת
המחדל שלו היא 0, שמחזירה את הסכום. הדפיסי שתי שורות: קריאה עם ארגומנט אחד
(`50`), וקריאה עם שניים (`50` ו-`15`).

**starter:**
```python
def attack_power(base, bonus):
    return base + bonus

print(attack_power(50))
print(attack_power(50, 15))
```
*(The starter is deliberately one character away from correct and crashes with a
`TypeError` on the first call. She must discover that a default value is what
makes a one-argument call legal.)*

**solution:**
```python
def attack_power(base, bonus=0):
    return base + bonus

print(attack_power(50))
print(attack_power(50, 15))
```

**check:**
```js
{ kind: "source", mustInclude: ["def attack_power"],
  message: { he: "השאירי את שם הפונקציה attack_power ואל תמחקי את שתי הקריאות",
             en: "Keep the function named attack_power and keep both calls" } }
{ kind: "output", mode: "normalized", expect: "50\n65" }
```
*The one-argument call is what forces a default to exist; no fragile source match
on `bonus=0` (she might write `bonus = 0`), and no way to fake it.*

**hints:**
1. קראי את השגיאה. איזו קריאה נכשלה — הראשונה או השנייה? מה חסר לה?
2. פרמטר יכול לקבל ערך ברירת מחדל בשורת ה-`def`, וכך הוא הופך לאופציונלי.
3. שני את שורת ההגדרה ל-`def attack_power(base, bonus=0):`. עכשיו
   `attack_power(50)` חוקי ומחזיר 50, ו-`attack_power(50, 15)` מחזיר 65. אל תשני
   את הקריאות עצמן.

### e4 — The Toll of the Road · 30 XP, 8 🪙

**brief:** בכל צומת בדרך למבוך גובים מכס לפי מרחק. כתבי פונקציה `toll` עם
פרמטר `distance` ופרמטר `rate` שברירת המחדל שלו 2, שמחזירה `distance * rate`.
עברי בלולאה על הרשימה `distances`, צברי את הסכום הכולל, והדפיסי שתי שורות:
```
Normal toll: <סכום> drachmas
Storm toll: <מכס על 10 בתעריף 5> drachmas
```

**starter:**
```python
distances = [3, 7, 10, 4]

# 1. הפונקציה toll

# 2. לולאה שמצברת את הסכום

# 3. שתי שורות פלט
```

**solution:**
```python
distances = [3, 7, 10, 4]

def toll(distance, rate=2):
    return distance * rate

total_toll = 0
for leg in distances:
    total_toll = total_toll + toll(leg)

print(f"Normal toll: {total_toll} drachmas")
print(f"Storm toll: {toll(10, 5)} drachmas")
```

**check:**
```js
{ kind: "source", mustInclude: ["def", "for", "return"],
  message: { he: "כאן צריך פונקציה שמחזירה ערך, ולולאה שמשתמשת בו",
             en: "This needs a function that returns, and a loop that uses it" } }
{ kind: "output", mode: "normalized",
  expect: "Normal toll: 48 drachmas\nStorm toll: 50 drachmas" }
```
*(3+7+10+4 = 24, ×2 = 48. The storm line is 10×5 = 50 — the same function called
with the default overridden, so both halves of the lesson appear in one output.)*

**hints:**
1. הצבירה בלולאה היא בדיוק התבנית משיעור 7. מה משתנה עכשיו — מאיפה מגיע המספר
   שאת מוסיפה בכל סיבוב?
2. אתחלי `total_toll = 0` **לפני** הלולאה, ובכל סיבוב הוסיפי לו את מה שהפונקציה
   מחזירה עבור המרחק הנוכחי.
3. הלולאה היא `for leg in distances:` ובתוכה
   `total_toll = total_toll + toll(leg)`.
   שימי לב שקראת ל-`toll` עם ארגומנט אחד — ברירת המחדל 2 עושה את העבודה. בשורה
   האחרונה קראי לאותה פונקציה עם `toll(10, 5)` כדי לדרוס את ברירת המחדל.

## Quest — "The Map of the Labyrinth" · 55 XP, 14 🪙

Three small functions, each returning something, composed into a report. This is
the first time in the course she writes a function that calls another function —
say so in the brief, because it is a milestone.

**brief:** אנבת' מוכנה לצייר. יש לך רשימה של חדרים, כל חדר הוא dict עם `letter`,
`number` ו-`monsters`. בני שלוש פונקציות:
- `room_name(letter, number)` — מחזירה מחרוזת בצורה `A-1`
- `is_dangerous(monsters, limit=2)` — מחזירה `True` אם מספר המפלצות גדול או שווה
  ל-`limit`
- `describe(room)` — מקבלת dict של חדר ומחזירה שורת תיאור. אם החדר מסוכן:
  `A-1: DANGER (3 monsters)`. אם לא: `A-1: clear`

אחר כך הדפיסי שורת תיאור לכל חדר, ובסוף בדיקה מחמירה על החדר האחרון עם `limit`
של 1.

**Expected output:**
```
A-1: clear
B-4: DANGER (3 monsters)
C-9: DANGER (2 monsters)
D-2: clear
Strict check on room D:
True
```

**starter:**
```python
rooms = [
    {"letter": "A", "number": 1, "monsters": 0},
    {"letter": "B", "number": 4, "monsters": 3},
    {"letter": "C", "number": 9, "monsters": 2},
    {"letter": "D", "number": 2, "monsters": 1},
]

# 1. room_name(letter, number) — מחזירה "A-1"

# 2. is_dangerous(monsters, limit=2) — מחזירה True או False

# 3. describe(room) — משתמשת בשתי הקודמות ומחזירה שורת תיאור

# 4. לולאה שמדפיסה תיאור לכל חדר

print("Strict check on room D:")
print(is_dangerous(rooms[3]["monsters"], 1))
```

**solution:**
```python
rooms = [
    {"letter": "A", "number": 1, "monsters": 0},
    {"letter": "B", "number": 4, "monsters": 3},
    {"letter": "C", "number": 9, "monsters": 2},
    {"letter": "D", "number": 2, "monsters": 1},
]

def room_name(letter, number):
    return f"{letter}-{number}"

def is_dangerous(monsters, limit=2):
    return monsters >= limit

def describe(room):
    name = room_name(room["letter"], room["number"])
    monsters = room["monsters"]
    if is_dangerous(monsters):
        return f"{name}: DANGER ({monsters} monsters)"
    return f"{name}: clear"

for room in rooms:
    print(describe(room))

print("Strict check on room D:")
print(is_dangerous(rooms[3]["monsters"], 1))
```

**check:**
```js
{ kind: "source", mustInclude: ["def room_name", "def is_dangerous", "def describe", "return"],
  message: { he: "המשימה דורשת שלוש פונקציות בשמות room_name, is_dangerous ו-describe",
             en: "The quest needs three functions named room_name, is_dangerous and describe" } }
{ kind: "output", mode: "normalized",
  expect: "A-1: clear\nB-4: DANGER (3 monsters)\nC-9: DANGER (2 monsters)\nD-2: clear\nStrict check on room D:\nTrue" }
```

**hints:**
1. שלוש פונקציות, וכל אחת מהן מחזירה משהו אחר: מחרוזת, ערך אמת, ושורה שלמה.
   התחילי מהקטנה — מה `room_name("A", 1)` צריכה להחזיר בדיוק?
2. `describe` לא מחשבת כלום בעצמה: היא שולפת מהמילון, קוראת ל-`room_name`
   ול-`is_dangerous`, ומרכיבה מהן שורה. הערך שחוזר מ-`is_dangerous` הוא `True`
   או `False`, כלומר בדיוק מה שאפשר לשים בתוך `if`.
3. `room_name` היא שורה אחת: `return f"{letter}-{number}"`. `is_dangerous` היא
   שורה אחת: `return monsters >= limit`. ב-`describe` שמרי קודם
   `name = room_name(room["letter"], room["number"])` ו-`monsters = room["monsters"]`,
   ואז `if is_dangerous(monsters):` מחזיר את שורת ה-DANGER, ואחריו — בלי `else` —
   `return f"{name}: clear"`. שימי לב שחדר D עם מפלצת אחת נחשב נקי בברירת המחדל,
   ומסוכן בבדיקה המחמירה בסוף. זה לא באג, זה בדיוק מה שברירת מחדל עושה.

*(Design note: the f-strings never nest quotes — `monsters` is pulled into a
local variable first, deliberately, since `f"{room['monsters']}"` is exactly the
kind of quote-inside-quote that Skulpt's f-string parser is least trustworthy on
and that a beginner cannot debug.)*

## Reward & Recap

**Item**: 🗺️ **מפת המבוך / The Labyrinth Map** — "לא שלמה, ולא מדויקת. אבל היא
ביד, וזה יותר ממה שהיה לכל אחד אחר." (Bead #14.)

**Achievements possible here**:
- *The Scout Returns* — הפונקציה הראשונה שהחזירה ערך
- *None Shall Pass* — פתרה את e2 (ניצחון על `None`)
- *Composer* — פונקציה שקוראת לפונקציה אחרת (המשימה)
- *No Hints Needed*, *Persistent*

**Recap bullets**:
- `return` מוסר ערך בחזרה למי שקרא לפונקציה; הקריאה **הופכת** לערך הזה
- `print` מראה לך; `return` נותן לתוכנית. זה לא אותו דבר
- פונקציה בלי `return` מחזירה `None` — וזה הסימן הראשון שמשהו חסר
- `return` מסיים את הפונקציה מיד, גם באמצע `if`
- אפשר כמה פרמטרים, והסדר קובע; פרמטר עם ערך ברירת מחדל הוא אופציונלי ובא בסוף
- משתנה שנולד בתוך פונקציה מת איתה — `return` הוא הדרך היחידה להוציא אותו

**Next teaser**: *"יש לך מפה. אין לך מזל. מחר כירון נותן לך קוביות — ואת בונה
משחק שאפשר באמת לשחק בו."*

## Common mistakes to anticipate

| She does | She sees | Hint / explainer must cover |
| --- | --- | --- |
| `print` במקום `return` | `None` בפלט או `TypeError` עם `NoneType` | הבלוק המרכזי של השיעור; לשאול "איפה חסר `return`?" |
| `return` בלי לשמור את הערך | אין פלט בכלל | קריאה לבד לא מדפיסה — צריך `print(f(x))` או משתנה |
| `return` מוקדם מדי | חצי מהפונקציה לא רץ | `return` מסיים מיד; שורות אחריו מתות |
| מחזירה שני דברים בשתי שורות `return` | רק הראשון חוזר | אותו הסבר; החזרת כמה ערכים אינה בשיעור הזה |
| `def f(bonus=0, attack):` | `SyntaxError` | ברירות מחדל אחרונות |
| מחליפה סדר ארגומנטים | תוצאה שגויה בלי שגיאה | הכי מסוכן — אין שגיאה. לבדוק ידנית מול הפלט הצפוי |
| משתמשת במשתנה מקומי בחוץ | `NameError: name 'x' is not defined` | scope: נולד בפנים, מת בפנים |
| מגדירה משתנה בחוץ ומצפה שהפונקציה תעדכן אותו | הערך בחוץ לא משתנה | לא להיכנס ל-`global` — לומר "תחזירי את הערך ותשמרי אותו" |

## Implementation notes

- **Skulpt**: `return`, כמה פרמטרים, ערכי ברירת מחדל, `None` — כולם ב-matrix
  המאומת. אין תלות בשום דבר חריג.
- **Verify three error strings** with `node tools/verify-python.mjs` before
  shipping, and paste whatever Skulpt prints into the blocks:
  1. teach 3 — `TypeError: unsupported operand type(s) for +: 'NoneType' and 'int'`
  2. teach 13 — `NameError: name 'secret' is not defined` (stable, low risk)
  3. teach 12 — the `SyntaxError` for a non-default parameter after a default one.
     Skulpt's parser message is likely a generic `SyntaxError: bad input on line N`
     rather than CPython's `non-default argument follows default argument`. If it
     is generic, the callout must say so in one Hebrew line instead of quoting a
     message she will never see.
- **Verify that `print(None)` renders exactly `None`** in Skulpt — the entire
  compare block in teach 6 depends on that string appearing in the output panel.
- **e3's starter crashes on purpose.** `checker.js` must show the runtime error
  clearly and still offer hints; an exercise whose starter fails to run is a
  first for the course, so confirm the failure state renders as "here is what
  happened" and not as "you failed".
- **`sum()` is deliberately unused** in e4 even though she learned it in L10.
  The accumulator pattern makes the returned value visibly flow into a variable,
  which is the point being taught. If she solves it with `sum()` plus a list she
  built from returns, that also passes the check — accept it and say so in the
  success message.
- Quest `source` check matches `def room_name` etc. **with a single space**;
  `checker.js` should normalise runs of whitespace in the source before matching
  so `def  room_name` does not fail her.
- All output checks are `normalized`. No `input()` in this lesson.
