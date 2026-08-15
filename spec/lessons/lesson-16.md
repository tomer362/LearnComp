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
    קריאה נוספת. זה עדיין מקרה בסיס, והוא מוסתר בתוך ה-`for`. אם את לא בטוחה
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

## The battle levels

**Control model: build script + strategy function.** Recursion shows up in both
halves, on purpose, because that is the honest picture: a recursive function is
not a targeting trick, it is a way of writing a repetition whose length you did
not know when you started.

### The new tower: ⚡ lightning

Unlocked here, and chosen to fit the lesson. 120 gold, range 3.0, 18 damage,
0.8 shots a second — and **the bolt chains to up to three enemies in range at
once**. Against a lone monster it is worse than an archer costing less than half
as much. Against a crowd it is the best thing in the game.

That is why every lightning level below sends monsters in tight packs, and it is
why the tower belongs in the recursion lesson: a chain is a thing that hops to
the next one, and then the next one, and then stops. She already knows the shape.

### Two facts about recursion in this engine, both verified

1. **A runaway recursion in her build script raises a real Python error before
   the battle starts:** `RecursionError: Maximum call stack size exceeded`, with
   a line number. Not a hang, not a frozen tab.
2. **A runaway recursion inside `choose_target` ends the battle as a loss**, and
   the engine reports the same message with the explanation attached. The camp
   survives the tick it happened on and then the fight simply stops.

L1 and L4 are built on exactly those two facts. She should meet each of them on
purpose, in a level designed for it, rather than at midnight in the boss.

### The maps

**`ROAD`** — a straight lane along row 4 (18 or 21 columns). L1 and L2.

**`BEND`** (18 × 10) — the lesson-14 map, reused so the terrain is familiar while
the code gets strange. L3 and L4.

**`LABYRINTH`** (15 × 9) — the boss. Three corridors folded back on each other,
41 cells long, and the shape is the point: it contains itself.

```js
LABYRINTH = [[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,1],
             [12,2],[12,3],
             [12,4],[11,4],[10,4],[9,4],[8,4],[7,4],[6,4],[5,4],[4,4],[3,4],[2,4],
             [2,5],[2,6],
             [2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[11,7],[12,7],[13,7],[14,7]]
```

---

### L1 — Down the Corridor · 20 XP, 5 🪙

**Why this mechanic:** a `for` loop would build this wall in two lines, and the
level forbids it. That is not cruelty, it is the cheapest possible place to meet
a base case: five towers, one function, and a `if left == 0: return` that she can
delete on purpose to watch the whole thing fall over.

**brief:** חמישה מגדלים לאורך הדרך, במרווחים של שלוש עמודות, מ-`x = 2`.

הפעם **בלי לולאה**. כתבי פונקציה `corridor(x, y, left)` שמציבה מגדל אחד וקוראת
לעצמה בשביל השאר — עם `x` גדול יותר בשלוש, ועם `left` קטן יותר באחת.

וכמו תמיד: **קודם כותבים את העצירה.** מה `corridor` צריכה לעשות כש-`left` הוא 0?

```js
map: { cols: 18, rows: 8, path: [[0,4],[1,4], … ,[17,4]] },
gold: 250, campHp: 3, seed: 61, allowed: ["archer"],
waves: [
  { delay: 0,  enemies: [{ kind: "satyr",     count: 10, gap: 0.45 }] },
  { delay: 6,  enemies: [{ kind: "harpy",     count:  8, gap: 0.5  }] },
  { delay: 13, enemies: [{ kind: "hellhound", count:  5, gap: 0.8  }] },
],
```

**starter:**
```python
def corridor(x, y, left):
    # 1. base case first: what happens when there are none left to build?
    # 2. then: build one here, and call yourself for the rest
    place_tower("archer", x, y)

corridor(2, 3, 5)
```

**solution:**
```python
def corridor(x, y, left):
    if left == 0:
        return
    place_tower("archer", x, y)
    corridor(x + 3, y, left - 1)

corridor(2, 3, 5)
```

**check:**
```js
{ kind: "battle",
  also: { kind: "source",
    mustInclude: ["def corridor", "corridor("], mustExclude: ["for ", "while "],
    message: { he: "המסדרון הזה נבנה ברקורסיה בלבד — בלי for ובלי while",
               en: "This corridor is built by recursion only — no for, no while" } } }
```

**hints:**
1. הריצי כמו שזה. נבנה מגדל אחד, והפונקציה נגמרה. מה חסר בשורה האחרונה של הגוף
   כדי שהיא תמשיך?
2. שני חלקים, ותמיד בסדר הזה: `if left == 0:` ומתחתיו `return` — זו העצירה.
   ואחרי ה-`if`, הצבה אחת, ואז קריאה ל-`corridor` עם `x + 3` ועם `left - 1`.
3. גוף הפונקציה, שורה אחרי שורה: `if left == 0:` / `return` /
   `place_tower("archer", x, y)` / `corridor(x + 3, y, left - 1)`. חמישה מגדלים
   ייצאו בעמודות 2, 5, 8, 11 ו-14. עכשיו נסי דבר אחד בכוונה: מחקי את שתי שורות
   העצירה והריצי. תקבלי `RecursionError: Maximum call stack size exceeded` עם
   מספר שורה — זה המנוע עוצר אותך בבטחה, וזו הודעה, לא אסון. אחר כך החזירי אותן.

---

### L2 — Count the Thread · 30 XP, 8 🪙

**Why this mechanic:** two recursions with two different jobs. `total_hp` walks a
list and **returns a number**; `build_line` walks a list and **does something**
and returns nothing. Same shape, opposite purpose — and the base cases are
different too: one ends at the end of the list, the other ends when a counter
runs out.

The budget is capped at exactly the right answer, so the arithmetic has to be
right and the recursion has to actually reach the end of the list.

**brief:** אותו כלל של אתמול — קשת אחת לכל 160 נקודות חיים, מעוגל כלפי מעלה —
אבל היום בלי אף לולאה בכל התוכנית.

שתי פונקציות רקורסיביות:
- `total_hp(wave, i)` — **מחזירה** את סכום החיים של כל המפלצות מהמקום `i` והלאה.
- `build_line(spots, i, left)` — מציבה `left` מגדלים, החל מהמשבצת `i` ברשימה.

שימי לב שהעצירות שלהן שונות: אחת נעצרת כשנגמרה הרשימה, והשנייה כשנגמרו המגדלים.

```js
map: { cols: 21, rows: 8, path: [[0,4],[1,4], … ,[20,4]] },
gold: 400, campHp: 3, seed: 66, allowed: ["archer"],
waves: [
  { delay: 0,  enemies: [{ kind: "satyr",     count: 14, gap: 0.5 }] },
  { delay: 6,  enemies: [{ kind: "harpy",     count:  8, gap: 0.6 }] },
  { delay: 14, enemies: [{ kind: "hellhound", count:  4, gap: 0.8 }] },
],
check: { kind: "battle", maxGoldSpent: 250, also: … },
```

*(14 × 20 + 8 × 30 + 4 × 70 = **800** HP → exactly 5 archers. Four leak one; six
cost 300 and break the cap.)*

**starter:**
```python
import math

SPOTS = [[2,3],[5,5],[8,3],[11,5],[14,3],[17,5]]

def total_hp(wave, i):
    # base case: what is the total from the end of the list onwards?
    return 0

def build_line(spots, i, left):
    # base case: what do you build when there are none left?
    return

needed = math.ceil(total_hp(get_wave(), 0) / 160)
build_line(SPOTS, 0, needed)
```

**solution:**
```python
import math

SPOTS = [[2,3],[5,5],[8,3],[11,5],[14,3],[17,5]]

def total_hp(wave, i):
    if i == len(wave):
        return 0
    return wave[i]["hp"] + total_hp(wave, i + 1)

def build_line(spots, i, left):
    if left == 0:
        return
    place_tower("archer", spots[i][0], spots[i][1])
    build_line(spots, i + 1, left - 1)

needed = math.ceil(total_hp(get_wave(), 0) / 160)
build_line(SPOTS, 0, needed)
```

**check:**
```js
{ kind: "battle",
  maxGoldSpent: 250,
  also: { kind: "source",
    mustInclude: ["def total_hp", "def build_line"],
    mustExclude: ["for ", "while "],
    message: { he: "שתי הפונקציות חייבות להיות רקורסיביות — בלי for ובלי while",
               en: "Both functions have to be recursive — no for, no while" } } }
```

**hints:**
1. הדפיסי את `needed` לפני שאת בונה. כרגע `total_hp` מחזירה 0 תמיד, אז מה יוצא,
   וכמה מגדלים זה בונה?
2. `total_hp` היא בדיוק התבנית של סכום ברקורסיה: מקרה בסיס שמחזיר 0 כשנגמרה
   הרשימה, ואחרת — האיבר הנוכחי **ועוד** התוצאה של הקריאה על השאר. הפריט הנוכחי
   הוא `wave[i]["hp"]`.
3. `total_hp`: `if i == len(wave): return 0`, ואחריו
   `return wave[i]["hp"] + total_hp(wave, i + 1)`.
   `build_line`: `if left == 0: return`, ואחריו
   `place_tower("archer", spots[i][0], spots[i][1])` ו-
   `build_line(spots, i + 1, left - 1)`.
   הסכום הוא 800, ולכן `needed` הוא 5. אם יצאו לך שישה מגדלים — הוצאת 300 מתוך
   תקציב של 250 והשלב נפסל. אם קיבלת `None` במקום מספר, יש מסלול ב-`total_hp`
   בלי `return` — זה השיעור מאתמול, והוא חוזר.

---

### L3 — Chain Lightning · 30 XP, 8 🪙

**Why this mechanic:** recursion that **returns a choice**, not a number and not
an action. `strongest(enemies, i)` asks the rest of the list who the toughest is,
gets an answer back, and compares itself to it. The base case is the last index —
a list of one has an obvious answer, and everything else is that answer plus one
comparison.

The default targeting loses here, and so does every guess in the bank.

**brief:** שלושה מגדלי ברק. ברק קופץ: כל פגיעה מכה עד שלוש מפלצות בטווח בבת אחת.
מולך שישה כלבי גיהינום וארבעה קיקלופים שמגיעים צפוף.

בברירת המחדל המגדלים יורים במי שהכי קרוב לשער, מתחלפים כל הזמן, ולא מפילים את
הקיקלופים בזמן.

כתבי `strongest(enemies, i)` — פונקציה **רקורסיבית** שמחזירה את המפלצת עם הכי
הרבה `hp` מהמקום `i` והלאה — ותני ל-`choose_target` להחזיר את מה שהיא מצאה.
בלי לולאות.

השאלה שפותחת את הפתרון: אם `i` הוא כבר האיבר האחרון ברשימה, מי החזק ביותר
מהמקום הזה והלאה?

```js
map: { cols: 18, rows: 10, path: BEND },
gold: 360, campHp: 3, seed: 63, allowed: ["lightning"],
waves: [
  { delay: 0,   enemies: [{ kind: "hellhound", count: 6, gap: 1.0 }] },
  { delay: 2.6, enemies: [{ kind: "cyclops",   count: 4, gap: 0.9 }] },
],
```

**starter:**
```python
place_tower("lightning", 4, 4)
place_tower("lightning", 8, 5)
place_tower("lightning", 12, 5)

def strongest(enemies, i):
    # base case first: what if i is the last index?
    return enemies[i]

def choose_target(enemies):
    return strongest(enemies, 0)
```

**solution:**
```python
place_tower("lightning", 4, 4)
place_tower("lightning", 8, 5)
place_tower("lightning", 12, 5)

def strongest(enemies, i):
    if i == len(enemies) - 1:
        return enemies[i]
    rest = strongest(enemies, i + 1)
    if enemies[i]["hp"] > rest["hp"]:
        return enemies[i]
    return rest

def choose_target(enemies):
    return strongest(enemies, 0)
```

**check:**
```js
{ kind: "battle",
  also: { kind: "source",
    mustInclude: ["def strongest"],
    mustExclude: ["for ", "while "],
    message: { he: "כאן צריך רקורסיה שמחזירה מפלצת — בלי for ובלי while",
               en: "This needs a recursion that returns a monster — no for, no while" } } }
```

**hints:**
1. כרגע `strongest` מחזירה תמיד את האיבר במקום `i`, בלי להסתכל על השאר. מה היא
   צריכה לשאול את שארית הרשימה לפני שהיא מחליטה?
2. שאלי את הרקורסיה ושמרי את התשובה במשתנה: `rest = strongest(enemies, i + 1)`.
   עכשיו יש לך שני מועמדים בלבד — זה שבמקום `i` והזוכה של כל השאר — וצריך
   להחזיר את החזק מביניהם.
3. גוף הפונקציה: `if i == len(enemies) - 1:` ומתחתיו `return enemies[i]` — זו
   העצירה, כי מרשימה של אחד אין את מי לשאול. אחר כך
   `rest = strongest(enemies, i + 1)`, ואז `if enemies[i]["hp"] > rest["hp"]:`
   עם `return enemies[i]`, ובסוף `return rest`. שימי לב שהחישוב קורה **בדרך
   חזרה** — הקריאה יורדת עד סוף הרשימה, ורק אז ההשוואות מתחילות לעלות בחזרה.

---

### L4 — The Thread That Broke · 30 XP, 8 🪙

**Why this mechanic:** the base case, taught by its absence, in the place where
it costs the most. This is the same function as L3 with two lines removed — and
the failure is not a wrong number, it is the battle stopping in the second tick.
She has to read an error that arrives **mid-battle** and trace it to a missing
stop, which is exactly what the boss will demand.

**brief:** הקוד רץ, המגדלים בנויים, והקרב נגמר אחרי שנייה וחצי בהפסד. הודעת
השגיאה אומרת `Maximum call stack size exceeded`.

ההודעה הזאת לא אומרת "טעית בחישוב". היא אומרת שהפונקציה לא הפסיקה לקרוא לעצמה.
יש בדיוק שני דברים לבדוק — ואת יודעת מה הם.

תקני את `strongest` ואל תשני שום דבר אחר.

```js
map: { cols: 18, rows: 10, path: BEND },
gold: 360, campHp: 3, seed: 64, allowed: ["lightning"],
waves: [
  { delay: 0, enemies: [{ kind: "hellhound", count: 8, gap: 0.7 }] },
  { delay: 2, enemies: [{ kind: "cyclops",   count: 5, gap: 0.9 }] },
],
```

**starter:** (runs, then kills the battle on the second tick)
```python
place_tower("lightning", 4, 4)
place_tower("lightning", 8, 5)
place_tower("lightning", 12, 5)

def strongest(enemies, i):
    rest = strongest(enemies, i + 1)
    if enemies[i]["hp"] > rest["hp"]:
        return enemies[i]
    return rest

def choose_target(enemies):
    return strongest(enemies, 0)
```

**solution:**
```python
place_tower("lightning", 4, 4)
place_tower("lightning", 8, 5)
place_tower("lightning", 12, 5)

def strongest(enemies, i):
    if i == len(enemies) - 1:
        return enemies[i]
    rest = strongest(enemies, i + 1)
    if enemies[i]["hp"] > rest["hp"]:
        return enemies[i]
    return rest

def choose_target(enemies):
    return strongest(enemies, 0)
```

**check:**
```js
{ kind: "battle",
  also: { kind: "source", mustInclude: ["if i =="], mustExclude: ["for ", "while "],
    message: { he: "התיקון הוא מקרה בסיס בתוך הפונקציה, לא לולאה",
               en: "The fix is a base case inside the function, not a loop" } } }
```

**hints:**
1. שתי השאלות של כל רקורסיה: מתי היא **לא** קוראת לעצמה, ומה נהיה קטן יותר בכל
   קריאה. אחת מהשתיים נענית כאן. השנייה לא.
2. `i` אכן גדל בכל קריאה — הבעיה היא שאף אחד לא בודק מתי הוא הגיע לסוף. איזה
   ערך של `i` אומר "זה האיבר האחרון ברשימה"?
3. הוסיפי שתי שורות **בראש** הפונקציה, לפני כל השאר: `if i == len(enemies) - 1:`
   ומתחתיה `return enemies[i]`. עכשיו הרקורסיה יש לה קרקעית. שימי לב שהיא חייבת
   לשבת ראשונה: אם תשימי אותה אחרי שורת ה-`rest`, הקריאה העצמית תקרה לפני
   הבדיקה והכול יישאר בדיוק כמו שהיה.

---

## BOSS — 🌀 המבוך / The Labyrinth · 70 XP, 18 🪙

**boss object:** `{ name: { he: "המבוך", en: "The Labyrinth" }, icon: "🌀", hp: 4 }`

Four waves, one HP each. Each wave she survives is one corridor of the maze
mapped, and the health bar is the map filling in. Partial progress is kept
between attempts (`spec/02-game-design.md`), so a run that dies to the cyclopes
still banks the three corridors before them. **Losing is not possible here, only
unfinished.**

**Why this mechanic:** both recursions at once, on the largest wave in Act IV —
eighty monsters. The build is recursive because one function has to raise two
different kinds of tower from two different lists, and `raise_towers(kind, spots,
i)` does it by walking a list it was handed. The targeting is recursive because
the answer to "who is the biggest threat in this list" is "the biggest of the
first one and whatever the rest of the list says".

Verified: **the engine's own targeting loses this battle**, and so does every
degenerate strategy in the bank.

**Framing:** אנבת' מחזיקה את הקצה של החוט בפתח. את הולכת פנימה. כל גל שתעצרי הוא
מסדרון שנדלק על המפה שלה.

**brief:** המסדרון מתקפל שלוש פעמים וחוזר על עצמו. ארבעה גלים, שמונים מפלצות,
490 זהב.

הבנייה: פונקציה **אחת** בשם `raise_towers(kind, spots, i)` שמקבלת סוג מגדל
ורשימת משבצות, ומציבה את כולן ברקורסיה. קראי לה פעמיים — פעם ל-`LIGHTNING`
ופעם ל-`ARCHERS`.

הקרב: `strongest(enemies, i)` מ-L3, ו-`choose_target` שמחזירה את מה שהיא מצאה.

בלי `for` ובלי `while`. בשום מקום.

```js
map: { cols: 15, rows: 9, path: LABYRINTH },
gold: 490, campHp: 5, seed: 71, allowed: ["archer", "lightning"],
waves: [
  { delay: 0,  enemies: [{ kind: "satyr",     count: 22, gap: 0.3  }] },
  { delay: 5,  enemies: [{ kind: "harpy",     count: 18, gap: 0.35 }] },
  { delay: 12, enemies: [{ kind: "hellhound", count: 18, gap: 0.35 }] },
  { delay: 24, enemies: [{ kind: "cyclops",   count: 12, gap: 0.6  },
                         { kind: "harpy",     count: 10, gap: 0.35 }] },
],
```

**starter:**
```python
LIGHTNING = [[6, 2], [9, 3], [5, 5]]
ARCHERS = [[3, 2], [13, 3]]

def raise_towers(kind, spots, i):
    # base case first: what happens when i has passed the end of the list?
    return

# call it twice, once for each list

def strongest(enemies, i):
    return enemies[i]

def choose_target(enemies):
    return strongest(enemies, 0)
```

**solution:**
```python
LIGHTNING = [[6, 2], [9, 3], [5, 5]]
ARCHERS = [[3, 2], [13, 3]]

def raise_towers(kind, spots, i):
    if i == len(spots):
        return
    place_tower(kind, spots[i][0], spots[i][1])
    raise_towers(kind, spots, i + 1)

raise_towers("lightning", LIGHTNING, 0)
raise_towers("archer", ARCHERS, 0)

def strongest(enemies, i):
    if i == len(enemies) - 1:
        return enemies[i]
    rest = strongest(enemies, i + 1)
    if enemies[i]["hp"] > rest["hp"]:
        return enemies[i]
    return rest

def choose_target(enemies):
    return strongest(enemies, 0)
```

**check:**
```js
{ kind: "battle",
  also: { kind: "source",
    mustInclude: ["def raise_towers", "def strongest"],
    mustExclude: ["for ", "while "],
    message: { he: "המבוך נבנה ונלחם ברקורסיה בלבד — שתי הפונקציות קוראות לעצמן, ואין כאן אף לולאה",
               en: "The Labyrinth is built and fought by recursion only — both functions call themselves, and there is no loop" } } }
```

**The four waves, and what each one is for** — this is the design, not decoration:

| # | Wave | What it tests |
| --- | --- | --- |
| 1 | 22 satyrs, very tight | שהבנייה בכלל קרתה. רקורסיה בלי מקרה בסיס נופלת כאן לפני שהמפלצת הראשונה זזה |
| 2 | 18 harpies | שיש קשתות. מגדלי ברק פוגעים במעופפות, אבל שלושה מהם לבד לא מספיקים |
| 3 | 18 hellhounds, packed | שהברק אכן משורשר — שלוש מכות בפגיעה אחת, וזה מה שמחזיק את הגל |
| 4 | 12 cyclopes + 10 harpies | שהאסטרטגיה בוחרת את המסוכן ולא את הקרוב. כאן ברירת המחדל נופלת |

*Order matters: the health bar moves in the first ten seconds, which is what
keeps her in the fight. Wave 4 is where the lesson's idea is actually tested.*

**hints:**
1. שתי הפונקציות רקורסיביות, ושתיהן נראות אחרת. אחת **עושה** משהו ולא מחזירה
   כלום; השנייה **מחזירה** משהו ולא עושה כלום. באיזו מהן מקרה הבסיס הוא "נגמרה
   הרשימה", ובאיזו הוא "זה האיבר האחרון"?
2. `raise_towers` נעצרת כש-`i` שווה ל-`len(spots)` — כלומר עברנו את הסוף. אחרת
   היא מציבה מגדל אחד וקוראת לעצמה עם `i + 1`. שימי לב ש-`kind` ו-`spots`
   נוסעים איתה בלי להשתנות, ורק `i` גדל — בדיוק כמו `word` ו-`times` בהד.
   `strongest` היא הפונקציה מ-L3 בלי שינוי.
3. `raise_towers`: `if i == len(spots): return`, ואז
   `place_tower(kind, spots[i][0], spots[i][1])` ו-
   `raise_towers(kind, spots, i + 1)`. מתחת לפונקציה, בשוליים, שתי קריאות:
   `raise_towers("lightning", LIGHTNING, 0)` ו-`raise_towers("archer", ARCHERS, 0)`
   — שימי לב שהפונקציה אחת, והיא בונה שני סוגי מגדלים לגמרי, כי הסוג הוא פרמטר.
   `strongest` היא העתקה מדויקת מ-L3. אם הקרב נגמר אחרי שנייה — אחת מהשתיים
   איבדה את מקרה הבסיס שלה, וההודעה תגיד לך באיזו שורה.

**Victory cutscene**: החוט האדום נמתח מאחורייך עד הפתח, ואנבת' מושכת. המפה מלאה.
מעל הדלת האחרונה חרוט שם, בכתב יד שאת כבר מזהה: *Daedalus*.

---

## SIDE BATTLE — "The Golden Wall" · 25 XP, 6 🪙 · **optional**

`optional: true`. Marked clearly, never blocking (`spec/07-curriculum.md`).

**Why this mechanic:** the first recursion in the course with **two** base cases,
and a genuinely pretty reason for it. Fibonacci jumps two steps back, so it needs
a stop for 0 and a stop for 1 — remove either one and the engine says so. The
wall it builds stands at columns 2, 3, 5, 8, 13, which is a spacing that gets
looser as the monsters get further from the spawn, and which happens to be the
proportion the Greeks carved into the Parthenon.

**brief:** בני חומה שהמרווחים בה הם מספרי פיבונאצ'י: כל מספר הוא סכום שני
קודמיו.

- `fib(n)` — רקורסיבית, מחזירה את המספר ה-`n` בסדרה. `fib(0)` הוא 0,
  `fib(1)` הוא 1.
- `build_fib(n, left)` — רקורסיבית, מציבה קשת בעמודה `fib(n)` וממשיכה הלאה.

`build_fib(3, 5)` יבנה בעמודות 2, 3, 5, 8 ו-13.

```js
optional: true,
map: { cols: 18, rows: 8, path: [[0,4],[1,4], … ,[17,4]] },
gold: 300, campHp: 3, seed: 67, allowed: ["archer"],
waves: [
  { delay: 0,  enemies: [{ kind: "satyr",     count: 9, gap: 0.45 }] },
  { delay: 6,  enemies: [{ kind: "harpy",     count: 7, gap: 0.5  }] },
  { delay: 13, enemies: [{ kind: "hellhound", count: 4, gap: 0.8  }] },
],
```

**starter:**
```python
def fib(n):
    # two base cases here, not one
    return n

def build_fib(n, left):
    if left == 0:
        return
    place_tower("archer", fib(n), 3)
    build_fib(n + 1, left - 1)

build_fib(3, 5)
```

**solution:**
```python
def fib(n):
    if n == 0:
        return 0
    if n == 1:
        return 1
    return fib(n - 1) + fib(n - 2)

def build_fib(n, left):
    if left == 0:
        return
    place_tower("archer", fib(n), 3)
    build_fib(n + 1, left - 1)

build_fib(3, 5)
```

**check:**
```js
{ kind: "battle",
  also: { kind: "source", mustInclude: ["def fib"],
    mustExclude: ["for ", "while "],
    message: { he: "משימת הצד דורשת fib רקורסיבית שקופצת שני צעדים אחורה",
               en: "This side battle needs a recursive fib that steps two back" } } }
```

**myth callout**: היחס בין שני מספרים עוקבים בסדרה מתקרב ל-1.618 — **יחס הזהב**.
הוא חוזר בפרתנון, בקונכיות ובחמניות. היוונים לא ידעו לכתוב `def`, אבל את היחס
הם מצאו.

**hints:**
1. `fib` קופצת **שני** צעדים אחורה בכל קריאה, לא אחד. כמה נקודות עצירה צריך
   בשביל זה, ולמה אחת לא מספיקה?
2. שתי שורות `if` בראש הפונקציה: אחת ל-`n == 0` שמחזירה 0, ואחת ל-`n == 1`
   שמחזירה 1. אחריהן שורה אחת שמחברת את שתי הקריאות.
3. `if n == 0: return 0`, `if n == 1: return 1`, ואז
   `return fib(n - 1) + fib(n - 2)`. עכשיו נסי למחוק **רק** את הבדיקה של 1
   ולהריץ: תקבלי `RecursionError`, כי `fib(1)` יקרא ל-`fib(0)` ול-`fib(-1)`,
   ומשם זה יורד לנצח. שתי קפיצות אחורה דורשות שתי קרקעיות.

**Performance note**: `build_fib(3, 5)` computes `fib` up to 7 — a few dozen
calls, instant. `fib(30)` in this naive form is 2.7 million calls and will hit
the 5-second `execLimit`. That is a **teachable moment, not a bug**: "רקורסיה
תמימה יכולה להיות יקרה מאוד." Do not let a level ask for more than about `fib(20)`.

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
- **Every starter in this lesson runs without a syntax error before she writes
  anything.** Stub bodies carry a placeholder statement (`print(n)`, `return 0`)
  rather than a bare comment, because a comment-only body raises
  `IndentationError` the moment she presses Run — an error that teaches nothing
  and reads as "you broke it before you started".
- **Recursion depth used by this lesson is tiny** — maximum 5 levels in the boss,
  10 in e3, ~16 in the optional Fibonacci. No legitimate solution comes near any
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
- **Combined checks** use the `source` + `also: { output }` pattern
  (`.claude/rules/lesson-authoring.md`); both halves must pass, and the `source`
  check is the outer one so its `message` is what she reads on failure. All
  `source` requirements in this lesson are keywords or identifiers, never
  comments or string literals, so no check needs `raw: true`.
