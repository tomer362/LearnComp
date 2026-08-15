# Lesson 16 — BOSS: The Maze Within · המבוך שבתוך המבוך

> **Act IV — The Titan's Curse · קללת הטיטאן** · Stop 16 of 20 — **boss lesson**
> Structure follows `spec/lessons/lesson-01.md` (the reference lesson) and the
> schema in `spec/04-lesson-template.md`. The `quest` slot carries a `boss`
> object; see `spec/02-game-design.md` for boss mechanics.

| | |
| --- | --- |
| **id** | `16` |
| **slug** | `the-maze-within` |
| **minutes** | 35 (the longest lesson in Act IV — say so on the page) |
| **concepts** | רקורסיה, מקרה בסיס (base case), ירידה רקורסיבית לתוך מבנה מקונן |
| **new vocabulary** | recursion / רקורסיה, base case / מקרה בסיס, stack / מחסנית (mentioned once, by metaphor) |
| **requires** | L13 `def` · L14 `return` + scope · L12 מבנים מקוננים · L9–11 lists ו-dicts · L7 `while` · L6 `if` |
| **item** | 🧵 חוט אריאדנה / Ariadne's String |
| **boss** | 🌀 **המבוך / The Labyrinth** — HP 6, אחד לכל אגף שנפתר |
| **XP** | 20 + 25 + 25 + 30 (training) + 60 (boss) + 30 (bonus) = **190** |
| **drachmas** | 5 + 6 + 6 + 8 + 15 = **40** 🪙 |

## Teaching goal

By the end she can write a function that calls itself, and — the part that
actually matters — she can answer two questions about any recursive function she
reads: **מתי זה נעצר?** ו-**מה נהיה קטן יותר בכל קריאה?**

Recursion is the first idea in the course that cannot be understood by reading
the code top to bottom. It has to be *traced*. So the lesson is built around two
mental models and nothing else:

1. **Base case first.** Always write the stop before the step. Every example in
   this lesson is written in that order, without exception, including the ones
   she is given as starters.
2. **The thread.** Going deeper pays out thread; coming back winds it up. The
   call that started last finishes first. That is the whole of the call stack,
   and Ariadne's string is a genuinely good metaphor for it rather than a
   decoration bolted on afterwards.

Honesty requirement: recursion is **not** a better loop. For a flat list, `for`
wins and this lesson says so out loud in a `compare` block. Recursion earns its
place when the data has things inside things — which is exactly the Labyrinth,
and exactly the boss.

## Story beat

Act IV closes underground. The door shuts, the camp is gone, and the corridor
ahead ends in a room that has a door in it, which opens onto a corridor.
Annabeth's map — the one from lesson 14 — is correct and useless: it describes a
shape that keeps containing itself.

Chiron is not here. Nobody is here. But there is a ball of red thread in her
pocket, and Ariadne's trick was never about being brave.

The Prophecy panel (6 lines, no code):

> הדלת נסגרת מאחורייך, והמחנה נעלם.
> מסדרון. בסופו חדר. בתוך החדר דלת, ומאחוריה מסדרון.
> "המבוך לא בנוי מחדרים," לוחשת אנבת'. "הוא בנוי מעצמו."
> כירון לא כאן. אף אחד לא כאן.
> בכיס שלך יש פקעת חוט אדום.
> את יודעת בדיוק מה עושים איתה.

Cast: Annabeth (in the dark with her, says the line that names the concept),
Grover (holds the end of the thread at the entrance and does not let go — he is
the base case, and the lesson may say that outright, as a joke that is also true).

## Chiron Teaches — block by block

1. **prose** — עד היום, כשרצית לחזור על משהו, השתמשת בלולאה. לולאה טובה כשאת
   יודעת על מה את עוברת: רשימה, טווח, תנאי. אבל מה עושים כשכל חדר במבוך מכיל
   חדרים, וגם הם מכילים חדרים, ואף אחד לא אמר לך כמה עמוק זה הולך? **פונקציה
   יכולה לקרוא לעצמה.** זה נשמע כמו טריק, וזה בעצם הדבר הכי מעשי בשיעור הזה.

2. **code (runnable)** — הרקורסיה הראשונה. שימי לב לסדר שבו כתובות השורות:
   ```python
   def descend(step):
       if step == 0:
           print("You reach the floor of the Labyrinth.")
           return
       print(f"Step {step}...")
       descend(step - 1)

   descend(5)
   ```
   Output:
   ```
   Step 5...
   Step 4...
   Step 3...
   Step 2...
   Step 1...
   You reach the floor of the Labyrinth.
   ```
   Caption: `descend` קוראת ל-`descend`. אין פה לולאה בכלל.

3. **prose** — שני החלקים, ותמיד בסדר הזה:
   - **מקרה בסיס (base case)** — התנאי שבו הפונקציה **לא** קוראת לעצמה, אלא
     נעצרת. כאן: `if step == 0`.
   - **הצעד הרקורסיבי** — קריאה לעצמה על בעיה **קטנה יותר**. כאן: `step - 1`.
   אם חסר מקרה בסיס, זה לא ייעצר. אם הקריאה לא מקטינה את הבעיה, זה גם לא ייעצר.
   שני חלקים, שניהם חובה.
   *(Say "smaller problem", not "smaller number" — the boss shrinks a data
   structure, not a counter, and she should not be surprised by that later.)*

4. **callout · warn** — כותרת: *"קודם כותבים את העצירה"*.
   סדר הכתיבה: קודם `if` של מקרה הבסיס, אחר כך הקריאה העצמית. תמיד. גם כשזה
   מרגיש הפוך. פונקציה רקורסיבית בלי עצירה היא לא "כמעט עובדת" — היא רצה עד
   שהמנוע עוצר אותה.

5. **compare** — עם עצירה ובלעדיה.
   - **bad** — `label`: בלי מקרה בסיס
     ```python
     def forever(step):
         print(step)
         forever(step - 1)
     ```
     יורדת ל-0, ואז ל-1-, ואז ל-2-… אין שום שורה שאומרת לה להפסיק.
   - **good** — `label`: עם מקרה בסיס
     ```python
     def forever(step):
         if step == 0:
             return
         print(step)
         forever(step - 1)
     ```
     שלוש שורות נוספו, וזו כל ההבדל בין תוכנית לבין קריסה.

6. **error** — רקורסיה אינסופית. **הבלוק שהיא תזכור.**
   ```python
   def forever(step):
       print(step)
       forever(step - 1)

   forever(3)
   ```
   Error (CPython): `RecursionError: maximum recursion depth exceeded`
   Explain: כל קריאה לפונקציה תופסת מקום בזיכרון, בערימה שנקראת **stack**. כשאת
   קוראת לפונקציה מתוך עצמה בלי סוף, הערימה מתמלאת ופייתון עוצרת אותך. השגיאה
   הזאת אומרת דבר אחד: **שכחת מקרה בסיס, או שהבעיה לא נהיית קטנה יותר.** זו
   השגיאה הכי צפויה בשיעור הזה, ואם היא מופיעה — יש בדיוק שני מקומות לבדוק.
   ⚠️ **Skulpt may not report this the same way.** See Implementation notes —
   the exact text in this block must be replaced with whatever the engine really
   produces, plus one Hebrew line noting that real Python says `RecursionError`.

7. **code (runnable)** — רקורסיה שמחזירה ערך. עכשיו החוט נמשך גם בחזרה:
   ```python
   def total_steps(n):
       if n == 0:
           return 0
       return n + total_steps(n - 1)

   print(total_steps(4))
   print(total_steps(10))
   ```
   Output:
   ```
   10
   55
   ```
   Caption: `total_steps(4)` הוא 4 ועוד `total_steps(3)`. וכדי לדעת כמה זה,
   צריך קודם לרדת.

8. **prose** — המעקב ביד. זה הבלוק שהופך רקורסיה ממשהו מסתורי למשהו שאפשר לבדוק
   עם עיפרון. הצגה שלב אחרי שלב, בדיוק בפורמט הזה:
   ```
   total_steps(3)  →  3 + total_steps(2)
   total_steps(2)  →  2 + total_steps(1)
   total_steps(1)  →  1 + total_steps(0)
   total_steps(0)  →  0            ← מקרה הבסיס. מכאן חוזרים.
   total_steps(1)  →  1 + 0  = 1
   total_steps(2)  →  2 + 1  = 3
   total_steps(3)  →  3 + 3  = 6
   ```
   שימי לב לכיוון: **קודם יורדים עד הסוף, ורק אז מתחילים לחשב.** הקריאה שהתחילה
   אחרונה מסיימת ראשונה. אף חישוב לא קורה בדרך למטה — רק בדרך חזרה.

9. **callout · myth** — כותרת: *"חוט אריאדנה"*.
   אריאדנה נתנה לתסאוס פקעת חוט לפני שנכנס למבוך. הוא לא השתמש בה כדי למצוא את
   המינוטאור — הוא השתמש בה כדי **לחזור**. כל קריאה רקורסיבית משחררת עוד חוט; כל
   `return` מגלגל לולאה אחת בחזרה. גרובר עומד בפתח ומחזיק את הקצה. גרובר הוא
   מקרה הבסיס.

10. **code (runnable)** — המבנה האמיתי: חדרים בתוך חדרים. dict מקונן, בדיוק כמו
    בשיעור 12:
    ```python
    entrance = {"name": "Entrance", "torches": 1, "rooms": [
        {"name": "Hall", "torches": 2, "rooms": []},
        {"name": "Cell", "torches": 3, "rooms": [
            {"name": "Pit", "torches": 4, "rooms": []},
        ]},
    ]}

    def sweep(room):
        total = room["torches"]
        for sub in room["rooms"]:
            total = total + sweep(sub)
        return total

    print(sweep(entrance))
    ```
    Output: `10`
    Caption: הלולאה עוברת על החדרים שבקומה הזאת. הרקורסיה יורדת לתוך כל אחד מהם.
    לולאה **ורקורסיה** יחד — כל אחת עושה חצי מהעבודה.

11. **callout · tip** — כותרת: *"לפעמים מקרה הבסיס כותב את עצמו"*.
    ב-`sweep` אין שורת `if` של עצירה — ובכל זאת היא נעצרת. למה? כי חדר בלי
    תת-חדרים הוא רשימה ריקה, ולולאה על רשימה ריקה לא מבצעת אף סיבוב, ולכן אין
    קריאה נוספת. זה עדיין מקרה בסיס, הוא פשוט מוסתר בתוך ה-`for`. אם את לא בטוחה
    — כתבי אותו במפורש. זה אף פעם לא מזיק.

12. **compare** — מתי רקורסיה, ומתי לא. **הבלוק הכן.**
    - **bad** — `label`: רקורסיה על רשימה שטוחה — עבודה מיותרת
      ```python
      def count_all(items, index):
          if index == len(items):
              return 0
          return items[index] + count_all(items, index + 1)
      ```
    - **good** — `label`: לולאה על רשימה שטוחה — קצר וברור
      ```python
      total = 0
      for item in items:
          total = total + item
      ```
    Caption for the pair: על רשימה רגילה, `for` מנצח. רקורסיה משתלמת כשיש דברים
    **בתוך** דברים ואת לא יודעת כמה עמוק — בדיוק כמו המבוך. כלי, לא קסם.

## Try It (ungraded)

```python
def echo(word, times):
    if times == 0:
        print("...")
        return
    print(word)
    echo(word, times - 1)

echo("Ariadne", 4)
```

Intro: *"שני את המספר. שני את המילה. ואז — בזהירות, זה בסדר גמור — מחקי את שתי
השורות של מקרה הבסיס והריצי, כדי לראות איך נראית רקורסיה בלי עצירה. המנוע יעצור
את זה תוך חמש שניות ולא ישבור כלום. זה המגרש שלך."*

*(Deliberately inviting her to break it here, in the sandbox, means the
`RecursionError` in the boss is an old acquaintance rather than a catastrophe.)*

## Training exercises

### e1 — Down the Stairs · 20 XP, 5 🪙

**brief:** כתבי פונקציה רקורסיבית `stairs(n)` שמדפיסה ספירה לאחור מ-`n` עד 1,
ואז את השורה `The floor.` — בלי שום לולאה. קראי לה עם 5.

**starter:**
```python
def stairs(n):
    # קודם מקרה הבסיס: מה קורה כשאין יותר מדרגות?

    # ואז: הדפיסי את המדרגה, ורדי אחת למטה

stairs(5)
```

**solution:**
```python
def stairs(n):
    if n == 0:
        print("The floor.")
        return
    print(n)
    stairs(n - 1)

stairs(5)
```

**check:**
```js
{ kind: "source",
  mustInclude: ["def stairs"], mustExclude: ["while", "for"],
  message: { he: "המדרגות האלה יורדות רק ברקורסיה — בלי while ובלי for",
             en: "These stairs go down by recursion only — no while, no for" },
  also: { kind: "output", mode: "normalized",
          expect: "5\n4\n3\n2\n1\nThe floor." } }
```

**hints:**
1. שתי שאלות לפני שכותבים משהו: מתי הפונקציה **לא** צריכה לקרוא לעצמה? ומה
   נהיה קטן יותר בכל קריאה?
2. מקרה הבסיס הוא `if n == 0:` — בפנים מדפיסים `The floor.` ואז `return` כדי
   לצאת. אחריו, מחוץ ל-`if`, מדפיסים את `n` וקוראים ל-`stairs` עם `n - 1`.
3. סדר השורות בגוף הפונקציה: `if n == 0:` / `print("The floor.")` / `return` /
   `print(n)` / `stairs(n - 1)`. אם ה-`print(n)` שלך יושב לפני ה-`if`, יודפס גם
   0. אם שכחת את ה-`return` במקרה הבסיס, הפונקציה תמשיך למספרים שליליים.

### e2 — The Echo of the Corridor · 25 XP, 6 🪙

**brief:** כתבי פונקציה רקורסיבית `echo(word, times)` שמדפיסה את `word` בדיוק
`times` פעמים, בלי לולאה. קראי לה עם `"Ariadne"` ו-4.

**starter:**
```python
def echo(word, times):
    # מקרה הבסיס קודם

    # ואז שורה אחת של הדפסה, וקריאה עם מספר קטן יותר

echo("Ariadne", 4)
```

**solution:**
```python
def echo(word, times):
    if times == 0:
        return
    print(word)
    echo(word, times - 1)

echo("Ariadne", 4)
```

**check:**
```js
{ kind: "source",
  mustInclude: ["def echo"], mustExclude: ["while", "for"],
  message: { he: "ההד חוזר ברקורסיה בלבד — בלי while ובלי for",
             en: "The echo repeats by recursion only — no while, no for" },
  also: { kind: "output", mode: "normalized",
          expect: "Ariadne\nAriadne\nAriadne\nAriadne" } }
```
*Two parameters, only one of which shrinks — this is the exercise where she sees
that `word` rides along unchanged while `times` does the work.*

**hints:**
1. אחד משני הפרמטרים משתנה בכל קריאה, והשני נוסע איתך בלי לזוז. מי מהם?
2. מקרה הבסיס הוא `if times == 0: return` — בלי להדפיס כלום. הקריאה הרקורסיבית
   מעבירה את **אותה מילה** ואת `times - 1`.
3. גוף הפונקציה: `if times == 0:` ואז `return`. אחריו `print(word)`, ואז
   `echo(word, times - 1)`. שימי לב שהמילה עוברת כמו שהיא — אם תשני גם אותה,
   ההד יישמע אחרת בכל שורה.

### e3 — Sum of the Steps · 25 XP, 6 🪙

**brief:** כתבי פונקציה רקורסיבית `total_steps(n)` ש**מחזירה** את סכום כל
המספרים מ-1 עד `n` — בלי לולאה, בלי `sum`. הדפיסי את התוצאה עבור 10.

**starter:**
```python
def total_steps(n):
    # מה מחזירים כשאין יותר מדרגות?

    # ומה מחזירים בכל שאר המקרים?

print(total_steps(10))
```

**solution:**
```python
def total_steps(n):
    if n == 0:
        return 0
    return n + total_steps(n - 1)

print(total_steps(10))
```

**check:**
```js
{ kind: "source",
  mustInclude: ["def total_steps", "return"], mustExclude: ["while", "for", "sum("],
  message: { he: "כאן צריך רקורסיה שמחזירה ערך — בלי לולאה ובלי sum",
             en: "This needs a recursion that returns a value — no loop, no sum" },
  also: { kind: "output", mode: "normalized", expect: "55" } }
```

**hints:**
1. עד עכשיו הרקורסיות שלך הדפיסו. הפעם אסור להדפיס בתוך הפונקציה — מה היא צריכה
   למסור החוצה במקום? ומה הערך הנכון להחזיר במקרה הבסיס?
2. `total_steps(4)` הוא 4 ועוד התוצאה של `total_steps(3)`. במקרה הבסיס, כשאין
   מדרגות בכלל, הסכום הוא 0.
3. שתי שורות אחרי ה-`if`: `if n == 0:` מחזיר `return 0`, ואחריו
   `return n + total_steps(n - 1)`. אם קיבלת `None` — יש מסלול בפונקציה שאין בו
   `return`, וזה בדיוק מה שלמדת בשיעור 14. עקבי ביד לפי הטבלה מכירון: 55 הוא
   הסכום של 1 עד 10.

### e4 — Fix the Broken Thread · 30 XP, 8 🪙

**The debugging exercise, and the one that makes the boss survivable.** The
starter crashes on purpose.

**brief:** הקוד שלפנייך אמור לספור לפידים בירידה: שני לפידים בכל קומה, `depth`
קומות. במקום זה הוא קורס. תקני אותו כך שיחזיר את המספר הנכון עבור 7 קומות
(התשובה היא 14) — ואל תשני את הקריאה בשורה האחרונה.

**starter:**
```python
def torches(depth):
    return 2 + torches(depth - 1)

print(torches(7))
```

**solution:**
```python
def torches(depth):
    if depth == 0:
        return 0
    return 2 + torches(depth - 1)

print(torches(7))
```

**check:**
```js
{ kind: "source",
  mustInclude: ["def torches", "if"], mustExclude: ["while", "for"],
  message: { he: "התיקון הוא מקרה בסיס בתוך הפונקציה, לא לולאה",
             en: "The fix is a base case inside the function, not a loop" },
  also: { kind: "output", mode: "normalized", expect: "14" } }
```

**hints:**
1. קראי את השגיאה. היא לא אומרת "טעית בחישוב" — היא אומרת שהפונקציה לא הפסיקה.
   איזו שורה הייתה אמורה להפסיק אותה, ואיפה היא?
2. חסר מקרה בסיס. השאלה היחידה היא מה להחזיר כשמגיעים לקומה 0 — כמה לפידים יש
   בקומה שלא קיימת?
3. הוסיפי בראש הפונקציה, לפני שורת ה-`return` הקיימת: `if depth == 0:` ומתחתיה
   `return 0`. עכשיו 7 קומות מחזירות 14, כי כל קומה מוסיפה 2 והתחתונה מוסיפה 0.
   אם קיבלת 16 — מקרה הבסיס שלך מחזיר 2 במקום 0.

## BOSS — 🌀 המבוך / The Labyrinth · 60 XP, 15 🪙

**boss object:** `{ name: { he: "המבוך", en: "The Labyrinth" }, icon: "🌀", hp: 6 }`
Six test cases, one HP each. Each passing case is one wing of the maze mapped;
the health bar is the map filling in. Partial progress is kept between attempts,
per `spec/02-game-design.md` — losing is not possible, only unfinished.

**Framing:** אנבת' מחזיקה את הקצה של החוט. את הולכת פנימה. כל אגף שתמפי הוא
לפיד שנדלק על המפה שלה.

**brief:** המבוך נתון כ-dict מקונן: לכל חדר יש `name`, `torches`, ו-`rooms` —
רשימה של חדרים נוספים (שיכולה להיות ריקה). כתבי **שתי** פונקציות רקורסיביות:

- `count_torches(room)` — מחזירה את סך כל הלפידים בחדר הזה **ובכל מה שנמצא
  בתוכו**, עד הסוף.
- `deepest_level(room)` — מחזירה כמה קומות עמוק המבוך הזה. חדר בלי תת-חדרים הוא
  קומה אחת. חדר שיש בו חדר שיש בו חדר — שלוש.

מתחת לפונקציות יש מתקן בדיקה של כירון. **אל תשני אותו.** כשאת מריצה בעצמך הוא
יבקש ממך אות בין `A` ל-`F` (באות גדולה) ויבדוק את האגף הזה.

**starter:**
```python
LABYRINTHS = {
    "A": {"name": "Empty Cell", "torches": 2, "rooms": []},

    "B": {"name": "Two Doors", "torches": 1, "rooms": [
            {"name": "Hall",    "torches": 3, "rooms": []},
            {"name": "Kitchen", "torches": 4, "rooms": []},
         ]},

    "C": {"name": "Stair 1", "torches": 1, "rooms": [
            {"name": "Stair 2", "torches": 1, "rooms": [
                {"name": "Stair 3", "torches": 1, "rooms": [
                    {"name": "Stair 4", "torches": 1, "rooms": [
                        {"name": "Stair 5", "torches": 1, "rooms": []},
                    ]},
                ]},
            ]},
         ]},

    "D": {"name": "Wide Hall", "torches": 0, "rooms": [
            {"name": "North", "torches": 1, "rooms": []},
            {"name": "East",  "torches": 2, "rooms": []},
            {"name": "South", "torches": 3, "rooms": []},
            {"name": "West",  "torches": 4, "rooms": []},
         ]},

    "E": {"name": "Entrance", "torches": 2, "rooms": [
            {"name": "Dark Wing", "torches": 0, "rooms": [
                {"name": "Torch Room", "torches": 5, "rooms": []},
                {"name": "Black Hall", "torches": 0, "rooms": [
                    {"name": "Bottom", "torches": 1, "rooms": []},
                ]},
            ]},
            {"name": "Bright Wing", "torches": 3, "rooms": []},
         ]},

    "F": {"name": "Daedalus Gate", "torches": 3, "rooms": [
            {"name": "Workshop", "torches": 4, "rooms": [
                {"name": "Forge", "torches": 2, "rooms": []},
                {"name": "Model Room", "torches": 1, "rooms": [
                    {"name": "Wing Case", "torches": 6, "rooms": []},
                ]},
            ]},
            {"name": "Arena", "torches": 0, "rooms": [
                {"name": "Sand Pit", "torches": 2, "rooms": [
                    {"name": "Under Pit", "torches": 1, "rooms": [
                        {"name": "The Heart", "torches": 9, "rooms": []},
                    ]},
                ]},
            ]},
            {"name": "Storeroom", "torches": 5, "rooms": []},
         ]},
}


def count_torches(room):
    # התחילי מהלפידים של החדר עצמו,
    # ואז הוסיפי את מה שמחזיר כל תת-חדר
    return 0


def deepest_level(room):
    # חדר בלי תת-חדרים הוא קומה אחת.
    # אחרת: אחת ועוד העומק של התת-חדר העמוק ביותר
    return 1


# ===== מתקן הבדיקה של כירון — אל תשני כלום מכאן ומטה =====
maze = LABYRINTHS[input()]
print(count_torches(maze))
print(deepest_level(maze))
```

**solution:**
```python
def count_torches(room):
    total = room["torches"]
    for sub in room["rooms"]:
        total = total + count_torches(sub)
    return total


def deepest_level(room):
    best = 1
    for sub in room["rooms"]:
        level = 1 + deepest_level(sub)
        if level > best:
            best = level
    return best
```
*(The `LABYRINTHS` literal and the test rig are unchanged from the starter; the
revealed solution shows only the two function bodies, which is all she is asked
to write.)*

**check:**
```js
{ kind: "cases",
  mode: "normalized",
  cases: [
    { stdin: ["A"], expect: "2\n1",  label: { he: "התא הריק",        en: "The Empty Cell" } },
    { stdin: ["B"], expect: "8\n2",  label: { he: "שתי הדלתות",      en: "Two Doors" } },
    { stdin: ["C"], expect: "5\n5",  label: { he: "גרם המדרגות",     en: "The Long Stair" } },
    { stdin: ["D"], expect: "10\n2", label: { he: "האולם הרחב",      en: "The Wide Hall" } },
    { stdin: ["E"], expect: "11\n4", label: { he: "האגף האפל",       en: "The Dark Wing" } },
    { stdin: ["F"], expect: "33\n5", label: { he: "שער דדלוס",       en: "Daedalus' Gate" } },
  ] }
```

**The six cases, and what each one is for** — this is the design, not decoration:

| # | Wing | Shape | Torches | Depth | Kills the bug where… |
| --- | --- | --- | --- | --- | --- |
| A | Empty Cell | חדר בודד, `rooms` ריקה | 2 | 1 | הפונקציה לא מטפלת ברשימה ריקה, או מחזירה 0 במקום הלפידים של החדר עצמו |
| B | Two Doors | קומה אחת, שני ילדים | 8 | 2 | סוכמים רק את הילד הראשון, או שוכחים את חדר הכניסה |
| C | The Long Stair | שרשרת בעומק 5, ילד יחיד בכל קומה | 5 | 5 | העומק נספר כ-2 כי לא צוללים רקורסיבית |
| D | The Wide Hall | קומה אחת, ארבעה ילדים, כניסה עם 0 לפידים | 10 | 2 | העומק נספר לפי **מספר** החדרים ולא לפי הקינון |
| E | The Dark Wing | לא סימטרי: ענף עמוק וענף רדוד, כמה חדרים עם 0 לפידים | 11 | 4 | לוקחים את העומק של הענף **האחרון** במקום המקסימלי |
| F | Daedalus' Gate | הכול ביחד: שלושה ענפים, עומק 5, 33 לפידים | 33 | 5 | כל האמור לעיל, ביחד |

*Order matters: A and B are winnable almost immediately (the health bar moves in
the first minute), C and D isolate the depth logic, and E is the one that
actually requires `max`-style thinking. F is the victory lap.*

**hints:**
1. שתי הפונקציות נראות דומות אבל שואלות שאלות שונות. עבור `count_torches`:
   מה את יודעת בוודאות על חדר **בלי** תת-חדרים? ועבור `deepest_level`: אם לחדר
   יש שלושה ילדים בעומקים שונים — איזה מהם קובע?
2. שתיהן מתחילות מערך התחלתי ומשפרות אותו בלולאה על `room["rooms"]`.
   ב-`count_torches` הערך ההתחלתי הוא `room["torches"]`, ובכל סיבוב **מוסיפים**
   את מה שמחזירה קריאה רקורסיבית על תת-החדר. ב-`deepest_level` הערך ההתחלתי הוא
   1, ובכל סיבוב **משווים** מול `1 + deepest_level(sub)` ושומרים את הגדול.
   מקרה הבסיס בשתיהן מוסתר: על רשימה ריקה הלולאה לא רצה בכלל.
3. `count_torches`: `total = room["torches"]`, ואז
   `for sub in room["rooms"]:` ובתוכה `total = total + count_torches(sub)`,
   ובסוף `return total`.
   `deepest_level`: `best = 1`, ואז `for sub in room["rooms"]:` ובתוכה
   `level = 1 + deepest_level(sub)` ו-`if level > best: best = level`,
   ובסוף `return best`. שימי לב לשני דברים ש**כמעט כולם** נתקלים בהם: `return`
   חייב לשבת **אחרי** הלולאה ולא בתוכה (אחרת חוזרים אחרי החדר הראשון), וב-
   `deepest_level` מוסיפים 1 לתוצאה של הילד — לא לתוצאה הסופית.

**Victory cutscene**: החוט האדום נמתח מאחורייך עד הפתח, ואנבת' מושכת. המפה
מלאה. מעל הדלת האחרונה חרוט שם, בכתב יד שאת כבר מזהה: *Daedalus*.

## Optional side quest — "Fibonacci and the Golden Ratio" · 25 XP, 6 🪙

Marked clearly as optional, never blocking (`spec/07-curriculum.md`).

**brief:** סדרת פיבונאצ'י: כל מספר הוא סכום שני קודמיו, ומתחילים ב-0 ו-1.
כתבי `fib(n)` רקורסיבית והדפיסי את 12 האיברים הראשונים. אחר כך חלקי כל איבר
בקודם לו והסתכלי לאן זה מתכנס.

**solution:**
```python
def fib(n):
    if n == 0:
        return 0
    if n == 1:
        return 1
    return fib(n - 1) + fib(n - 2)

for i in range(12):
    print(fib(i))

print(round(fib(15) / fib(14), 5))
```
Output: `0 1 1 2 3 5 8 13 21 34 55 89`, each on its own line, then `1.61803`.

**check:**
```js
{ kind: "source", mustInclude: ["def fib"],
  message: { he: "כאן צריך פונקציה רקורסיבית בשם fib",
             en: "This one needs a recursive function named fib" },
  also: { kind: "output", mode: "contains", expect: "1.61803" } }
```

**Two base cases**, not one — the first time she meets that, and worth a sentence:
`fib` צריכה עצירה גם ל-0 וגם ל-1, כי היא קופצת שני צעדים אחורה.

**myth callout**: היחס 1.618 נקרא **יחס הזהב**, והוא חוזר בפרתנון, בקונכיות
ובחמניות. היוונים לא ידעו לכתוב `def`, אבל את היחס הם מצאו.

*Performance note*: `fib(15)` is ~2,000 calls in this naive form — fine in
Skulpt. Do not let her go past ~22 without a warning; `fib(30)` is 2.7 million
calls and will hit the 5-second `execLimit`. That is a **teachable moment, not a
bug** — say so in a callout: "רקורסיה תמימה יכולה להיות יקרה מאוד."

## Reward & Recap

**Item**: 🧵 **חוט אריאדנה / Ariadne's String** — "פקעת חוט אדום. לא עוזרת למצוא
כלום. עוזרת לחזור — וזה החלק שאנשים שוכחים." (Bead #16. Act IV complete.)

**Achievements possible here**:
- *Base Case First* — עברה את e1 בלי רמזים
- *Stack Overflow* — ראתה רקורסיה אינסופית קורסת (בשיעור או ב-Try It). הישג על
  שבירה מכוונת, במכוון
- *Cartographer* — הפילה את כל שישה אגפי המבוך
- *Golden* — סיימה את משימת הצד של פיבונאצ'י
- *Completionist (Act IV)* — כל התרגילים בשיעורים 13–16

**Recap bullets**:
- פונקציה רקורסיבית היא פונקציה שקוראת לעצמה
- תמיד שני חלקים: **מקרה בסיס** שעוצר, וקריאה על בעיה **קטנה יותר**
- כותבים את מקרה הבסיס ראשון. תמיד
- בלי מקרה בסיס מקבלים `RecursionError` — זו הודעה, לא אסון
- קודם יורדים עד הסוף, ורק בדרך חזרה מצטברות התשובות
- על רשימה שטוחה עדיפה לולאה; רקורסיה היא לדברים שיש בתוכם דברים

**Next teaser (Act V opens)**: *"יצאת מהמבוך. על השער כתובה נבואה בת שבע שורות,
ואף אחד לא מצליח לקרוא אותה — כי היא כתובה כמחרוזת אחת ארוכה."*

## Common mistakes to anticipate

| She does | She sees | Hint / explainer must cover |
| --- | --- | --- |
| שוכחת מקרה בסיס | `RecursionError` / הודעת המנוע על מגבלת זמן | e4 בדיוק בשביל זה |
| קוראת לעצמה עם אותו ארגומנט | אותה שגיאה | הבעיה חייבת להיות קטנה יותר, לא רק שונה |
| שמה `return` בתוך הלולאה | סופרת רק את הילד הראשון | מקרה B ומקרה D בבוס תופסים את זה |
| שוכחת `return` בענף אחד | `None`, או `TypeError` על חיבור עם `NoneType` | הקישור לשיעור 14 מפורש |
| `deepest_level` מחזירה מספר ילדים | מקרה C נכשל (2 במקום 5) | עומק הוא קינון, לא כמות |
| לוקחת את העומק של הילד האחרון | מקרה E נכשל | צריך את המקסימלי, לא את האחרון |
| מוסיפה 1 לתוצאה הסופית ולא לילד | מקרה C או E נכשל | `1 + deepest_level(sub)` בתוך הלולאה |
| מוסיפה `print` בתוך הפונקציה הרקורסיבית | פלט מלוכלך, כל המקרים נכשלים | להסביר שהמתקן משווה פלט מדויק; לנפות באגים אפשר עם `print` ואז למחוק |
| משנה את מתקן הבדיקה | מקרים נכשלים בלי סיבה נראית לעין | הערה ברורה בקוד + כפתור "החזרי את המתקן" בעורך |

## Implementation notes

- **⚠️ Infinite recursion must be verified in Skulpt before this lesson ships.**
  This is the single highest-risk item in Act IV. CPython raises
  `RecursionError: maximum recursion depth exceeded`; Skulpt runs on the JS stack
  and may instead:
  (a) throw a JS `RangeError: Maximum call stack size exceeded` that the engine
  does not recognise as a Python error, (b) hit `execLimit` and surface as
  `TimeLimitError`, or (c) freeze the tab if the stack blows before the exec
  limit is polled. Required work:
  1. Run `def f(n): print(n); f(n-1)` through `tools/verify-python.mjs` and record
     the actual behaviour and message.
  2. `engine.js` must normalise **whatever it is** into a friendly in-theme error
     ("החוט נגמר — נראה שהפונקציה קוראת לעצמה בלי עצירה") while still showing the
     real message underneath, per the "never suppress the real error" rule.
  3. Paste the real message into teach block 6 and into e4's expected failure
     state. Do not ship the CPython text if Skulpt prints something else.
  4. If the tab can actually freeze (case c), add a recursion-depth guard in the
     engine before this lesson goes live. She must never lose work to a hang.
- **Recursion depth used by this lesson is tiny** — maximum 5 levels in the boss,
  10 in e3, ~15 in the optional Fibonacci. No legitimate solution comes near any
  stack limit.
- **`mustExclude: ["while", "for"]` must match whole words**, not substrings.
  A variable named `forest`, `before` or `format` contains `for`, and failing her
  for that would be indefensible. `checker.js` should tokenise the (already
  comment- and string-stripped) skeleton and compare tokens, or use word
  boundaries. Add a regression test for `torches_before = 0`.
- **The boss uses `kind: "cases"` with queued stdin.** Confirm that `engine.js`
  resolves `inputfun` from the queue without rendering the in-page prompt during
  grading; the prompt should appear only when *she* presses Run. The rig calls
  bare `input()` with no prompt string, so nothing extra can leak into stdout —
  verify that Skulpt writes nothing to output for a bare `input()`, and if it
  does, switch the six cases to `mode: "contains"` and re-record the expectations.
- **The rig is fixed code below a marker line.** `editor.js` should render the
  marker comment distinctly and offer a "restore the rig" action; a learner who
  deletes `print(count_torches(maze))` will fail all six cases with no idea why.
  This is the first exercise in the course with untouchable code, so the
  affordance has to be obvious.
- **Health bar wiring**: `checker.js` returns per-case results; `game.js` maps
  passing cases → boss HP drained, and persists partial progress so a learner who
  gets A–D today keeps 4 HP of damage tomorrow (`spec/02-game-design.md`).
  The case `label` fields exist for the "האגף האפל נפתח" toast on each hit.
- **Verify the nested-dict literal parses in Skulpt** exactly as written — 60
  lines of nested `{}`/`[]` with trailing commas is the largest literal in the
  course. Trailing commas inside dict and list literals are valid Python 3 and
  are on the verified list, but this specific block should still be run through
  `tools/verify-python.mjs`.
- **No `type()` checks anywhere.** An earlier draft distinguished nested lists
  with `type(thing) == list`; the dict-with-`rooms`-key shape removes the need
  entirely, which keeps the boss inside verified territory and inside what she
  already knows from lesson 12.
- All expected values were computed and re-verified against the literal exactly
  as it appears in the starter: A 2/1, B 8/2, C 5/5, D 10/2, E 11/4, F 33/5.
