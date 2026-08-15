# Lesson 20 — CAPSTONE: Battle for Olympus · הקרב על אולימפוס

> **Act V — The Last Olympian** · Stop 20 of 20 · **BOSS: Kronos**
> Structure follows `spec/lessons/lesson-01.md`, with the battle levels replaced
> by a staged build of six. Schema: `spec/04-lesson-template.md`,
> `spec/09-battle-game.md`.

| | |
| --- | --- |
| **id** | `20` |
| **slug** | `battle-for-olympus` |
| **minutes** | 60–90 — **explicitly designed to be done across two or three sittings** |
| **concepts** | nothing new — integration of variables, `if`, `while`, `for`, lists, dicts, functions, `random`, string methods, `try`/`except`, `class`, `register_tower` |
| **new vocabulary** | — (the only unfamiliar lines are `random.seed` and `random.shuffle`, both taught in-lesson) |
| **requires** | lessons 1–19, all of them |
| **item** | 🏛️ כס באולימפוס / A Throne on Olympus |
| **boss** | ⏳ **Kronos** — hp 6, one point drained per completed milestone |
| **XP** | 60 + 70 + 90 + 90 + 110 + 110 (milestones) + 110 (completion) = **640** |
| **🪙** | 15 + 18 + 22 + 22 + 28 + 28 + 28 = **161** |

## Teaching goal

There is no new syntax in lesson 20, and that is the point. Everything she needs
she already has; what she has never done is **hold it all at once**.

The goal is a finished, playable program that she wrote — not typed from a
listing — and one habit that outlives the game:

> **Never write more code than you can run.**
> Build a slice, run it, keep it. Then the next slice.

She builds one defense in six milestones, and fights with it six times. Each
milestone is graded on its own, and **each one leaves her with something that
runs and holds a battle**. Milestone 1 is five towers built from a list with a
loop. Milestone 6 is eighteen towers bought against a budget, commanded by two
tower classes she wrote, holding ninety-seven monsters and a Titan across eight
waves. There is no point in the middle where she has a broken half-thing on the
screen.

The escalation is measured, not asserted: **every milestone's answer loses the
next milestone's battle.** Her M3 doctrine leaks two monsters on M4; her M5
defense leaks one on M6. That is the sentence the whole lesson is built to earn —
*what you wrote is not wrong, the war got bigger* — and it is the difference
between a capstone and a long exercise.

The last section of the lesson is not a lesson. It is a handover: what Skulpt
gave her, what it did not, **which of the words she has been typing were never
Python at all**, and exactly how to install the real thing.

## Story beat

Kronos is on the mountain. Not a metaphor and not a maze — the Titan himself,
reassembled, walking up Fifth Avenue with an army behind him, and the gods are
fighting a typhon somewhere over the Atlantic and are not coming.

The throne room is empty except for twelve empty chairs and her. Chiron cannot
climb the stairs. Annabeth is holding the elevator lobby with a broken arm.
Nobody hands her a plan.

She has a prophecy she decoded herself, a method for fixing what breaks, and a
mold she cast in the forge. That is the whole inventory. It turns out to be
enough.

The Prophecy panel (3–6 lines, no code):

> אולימפוס ריק. שנים־עשר כיסאות, ואף אל.
> מהמדרגות עולה קול של שעון שהולך אחורה.
> כירון לא יכול לעלות. אנבת' מחזיקה את הלובי. אין מי שיגיד לך מה לעשות.
> יש לך נבואה שפענחת, שיטה לתקן מה שנשבר, ותבנית שיצקת.
> "זה מספיק," את אומרת בקול רם, ומגלה שזה נכון.

Cast: Kronos (never speaks in the first person — he speaks through the log of the
battle she writes), Annabeth and Chiron in the closing scene, the twelve empty
thrones.

## Chiron Teaches — block by block

Short by design. She does not need instruction today; she needs a method for
building and permission to start small.

1. **prose** — אין היום תחביר חדש. אין ולו פקודה אחת שלא ראית. מה שיש היום זה
   הדבר שאף שיעור לא יכול ללמד בנפרד: להחזיק את הכל ביחד, בתוכנית אחת, שרצה.

2. **prose** — The rule of the day, stated once and repeated by every milestone:
   **אל תכתבי יותר קוד ממה שאת יכולה להריץ.** מתכנתת מנוסה לא כותבת מאה שורות
   ואז מריצה. היא כותבת חמש, מריצה, רואה שהן עובדות, ואז כותבת חמש נוספות על
   בסיס יציב. אם משהו נשבר — היא יודעת בדיוק מה השתנה מאז הפעם הקודמת שזה עבד.
   זה נשמע איטי. זה הדבר המהיר ביותר שיש.

3. **code (runnable)** — the smallest possible version of today's defense, so
   that "start small" is a thing she has seen and not advice she has read.
   ```python
   LINE = [[3, 0], [5, 3]]
   for spot in LINE:
       place_tower("archer", spot[0], spot[1])
   print("towers planned:", len(LINE))
   ```
   Output: `towers planned: 2`
   Caption: זו כבר הגנה. היא רצה, היא נכונה, והיא כמעט לא עושה כלום — וזה בדיוק
   מה שגרסה ראשונה אמורה להיות. אבן דרך 1 מוסיפה לה שתי שורות.

4. **compare** — the two ways to write today's lesson.
   - bad:
     ```python
     # write all 60 lines
     # run for the first time
     # 4 errors, and no idea which change caused which
     ```
     label: מפץ גדול — כשזה נשבר, החשודים הם כל מה שכתבת
   - good:
     ```python
     # a line of towers -> fight -> it holds -> keep
     # + an economy      -> fight -> it holds -> keep
     # + a doctrine      -> fight -> it leaks -> only the doctrine is a suspect
     ```
     label: פרוסות — כשזה נשבר, החשוד הוא מה שהוספת עכשיו
   Prose under it: לכל אבן דרך בשיעור הזה יש קרב משלה מסיבה אחת: לכפות עלייך
   להריץ לפני שאת ממשיכה. זו לא בירוקרטיה, זו הרשת. ועוד דבר — כל אבן דרך
   מפסידה בקרב של זו שאחריה. זה לא כי כתבת רע. זה כי המשימה גדלה.

5. **callout · tip** — הכלי של היום הוא לא פקודה, הוא ארבעת הצעדים משיעור 18:
   מה הסוג · איזו שורה · מה ההשערה · איך אני בודקת. תוציאי אותם עכשיו ותשאירי
   אותם פתוחים ליד המסך. בשיעור הזה את תשתמשי בהם כמה פעמים, וזה סימן שהכל
   בסדר.

6. **prose** — The map. Six milestones, and where each piece came from, so she
   can see the whole course inside one defense:
   ```
   1  קו ההגנה      רשימה + for + משתנים                    (2, 8, 9)
   2  הארנק         dict + get_gold + while + and           (5, 7, 11)
   3  התורה         def + return + try/except + dict        (13, 14, 18)
   4  הנפחייה       class + __init__ + self + ירושה          (19)
   5  הלילה הארוך    random + seed + shuffle                 (15)
   6  קרונוס        הכל, ובבת אחת                            (1–19)
   ```

7. **code (runnable)** — `random.seed`, the one unfamiliar line, taught in
   thirty seconds because milestones 5 and 6 need it.
   ```python
   import random

   random.seed(20)
   print(random.randint(1, 6), random.randint(1, 6), random.randint(1, 6))

   random.seed(20)
   print(random.randint(1, 6), random.randint(1, 6), random.randint(1, 6))
   ```
   Output:
   ```
   4 6 6
   4 6 6
   ```
   Caption: `random.seed(7)` קובע את נקודת ההתחלה של הגרלה. אותו מספר התחלה —
   אותה סדרה, בכל הרצה. זה נשמע כמו לבטל את האקראיות, וזה בעצם כלי עבודה: ככה
   בודקים תוכנית שמגרילה. גם מתכנתות אמיתיות עושות את זה כדי שבדיקה תיתן אותה
   תשובה פעמיים. **המורות של היום הן הגורלות, והן קושרות את החוט מראש.**

8. **callout · warn** — לולאת ההוצאה שלך חייבת דרך לצאת. אם
   `while get_gold() >= tower_cost("archer"):` רצה בלי שהמונה עולה ובלי שמשבצת
   נגמרת — היא לא תיעצר לבד. המנוע פה יעצור אותה אחרי חמש שניות ויגיד לך את זה
   בעברית, אבל על פייתון אמיתי במחשב שלך אין מי שיעצור. אחרי כל אבן דרך תוודאי
   שהמספר באמת זז — הדפיסי `get_gold()` בסוף הבנייה, בדיוק כמו בפתרונות.

9. **callout · myth** — קרונוס בלע את ילדיו כי נבואה אמרה שאחד מהם יפיל אותו.
   הוא בלע כל אחד מהם ברגע שנולד, בזה אחר זה, בשיטתיות — ובכל זאת אחד חמק,
   גדל, וחזר. אין דרך לבלוע נבואה. אפשר רק להיות זה שקורא אותה נכון.

## Try It (ungraded)

Free-play editor, pre-filled with the version-zero arena. Nothing checked.

```python
KIND = "archer"
LINE = [[3, 0], [5, 3], [8, 4]]

for spot in LINE:
    place_tower(KIND, spot[0], spot[1])
    print("planned", KIND, "at", spot[0], spot[1])

print("gold left:", get_gold())
```

Intro: *"זו גרסה 0 של ההגנה שלך, על מגרש אימונים בלי מפלצות. הריצי אותה. שני
את `KIND` ל-`"cannon"`, הוסיפי משבצת ל-`LINE`, וראי מה קורה ל-`get_gold()`.
אחרי שתרגישי שהיא שלך — נעבור לאבן הדרך הראשונה, ושם מתחילים לבנות ברצינות."*

---

# The Build — six milestones

Each milestone is a graded battle with its own XP, drachmas and three hints, and
each one drains a point from Kronos' health bar. **Each one leaves her with a
defense that runs**, and each one starts from the code she finished the previous
milestone with: the editor for milestone N is pre-filled with the reference
solution of N−1, so a learner who steps away for a week can rejoin without being
punished for it.

Two battlefields, and only two, so that by milestone 6 she knows the ground:

- **The Lower Stair** (`14 × 8`) — M1 and M2.
  `path: [[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[6,2],[6,3],[6,4],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[12,5],[13,5]]`
- **The Stair** (`20 × 12`) — M3 through M6. The same road, continued twice as
  far, up to the throne-room doors.
  `path: [[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[6,2],[6,3],[6,4],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[12,5],[13,5],[13,6],[13,7],[13,8],[13,9],[14,9],[15,9],[16,9],[17,9],[18,9],[19,9]]`

Every milestone was played through the real engine. For each: the stated solution
wins with a perfect defense, an empty program loses, the *previous* milestone's
answer loses, and from M3 on the degenerate strategies (`return 0`,
`return enemies[0]`, `return None`) all lose. Measured numbers are recorded under
each milestone.

---

## M1 — The Line · קו ההגנה · 60 XP, 15 🪙

**What she builds:** the first defense of the capstone, out of a list and a loop.

**Why this mechanic:** four archers on four spots is four near-identical lines,
and the level is sized so a hand-built pair loses. The list and the `for` are not
style advice here; they are how the wall gets long enough in the time she has.

```js
map: The Lower Stair, gold: 300, campHp: 4, seed: 101,
allowed: ["archer", "cannon"],
waves: [
  { delay: 0, enemies: [ { kind: "satyr",     count: 8, gap: 0.7 } ] },
  { delay: 8, enemies: [ { kind: "hellhound", count: 5, gap: 0.6 } ] },
],
```

Starter:
```python
# the four archer spots, and the one cannon spot, are chosen for you.
# build them with a loop, not with four copies of the same line.

LINE = [[3, 0], [5, 3], [8, 4], [11, 4]]
KIND = "archer"

# your loop here

place_tower("cannon", 7, 6)
```

Solution:
```python
LINE = [[3, 0], [5, 3], [8, 4], [11, 4]]
KIND = "archer"

for spot in LINE:
    place_tower(KIND, spot[0], spot[1])

place_tower("cannon", 7, 6)
```

```js
check: { kind: "battle",
  also: { kind: "source", mustInclude: ["for ", "LINE"],
          message: { he: "קו של ארבעה מגדלים נבנה בלולאה על הרשימה, לא בארבע שורות זהות",
                     en: "A line of four towers is built with a loop over the list, not four copies of a line" } } }
```

Verified: solution wins 4/4 with 13 kills and 290 of the 300 gold spent. Two
towers written by hand: loses 4–0. Empty program: loses 4–0.

Hints:
1. `LINE` היא רשימה של רשימות. מה מקבל המשתנה בלולאה בכל סיבוב, ומה יש בתוכו?
2. `for spot in LINE:` נותן לך בכל סיבוב זוג מספרים. `place_tower` רוצה שלושה
   דברים: סוג, x, y — ושניים מהם נמצאים בתוך `spot`.
3. `for spot in LINE:` ובתוכו `place_tower(KIND, spot[0], spot[1])`. `spot[0]`
   הוא העמודה ו-`spot[1]` היא השורה. שימי לב ש-`KIND` הוא משתנה, לא מחרוזת
   כתובה — ככה שינוי אחד בשורה אחת משנה את כל הקו. שורת התותח נשארת מחוץ ללולאה
   כי היא היחידה מסוגה.

---

## M2 — The Purse · הארנק · 70 XP, 18 🪙

**What she builds:** an economy. A dict from tower kind to its spots, and a
spending loop that stops when the gold does.

**Why this mechanic:** the gold no longer covers the plan. `get_gold()` and
`tower_cost(kind)` are the two numbers she needs, and a `while` is the only shape
that says "keep buying until you cannot". Hard-coding the count works until the
next milestone changes the budget — and the next milestone changes the budget.

```js
map: The Lower Stair, gold: 480, campHp: 4, seed: 102,
allowed: ["archer", "cannon", "ice"],
waves: [
  { delay: 0,  enemies: [ { kind: "satyr",     count: 9, gap: 0.6 } ] },
  { delay: 1,  enemies: [ { kind: "harpy",     count: 7, gap: 0.7 } ] },
  { delay: 14, enemies: [ { kind: "hellhound", count: 8, gap: 0.5 } ] },
],
```

Solution:
```python
CATALOGUE = {"archer": [[3, 0], [5, 3], [8, 4], [11, 4]],
             "cannon": [[7, 6], [10, 6]],
             "ice": [[4, 3]]}

for kind in ["cannon", "archer", "ice"]:
    for spot in CATALOGUE[kind]:
        if get_gold() >= tower_cost(kind):
            place_tower(kind, spot[0], spot[1])

spare = [[2, 3], [9, 3], [12, 6]]
index = 0
while get_gold() >= tower_cost("archer") and index < len(spare):
    place_tower("archer", spare[index][0], spare[index][1])
    index = index + 1

print("gold left:", get_gold())
```

```js
check: { kind: "battle",
  also: [
    { kind: "source", mustInclude: ["CATALOGUE", "get_gold()", "tower_cost(", "while "],
      message: { he: "התוכנית באה ממילון, וההוצאה נעצרת לפי get_gold ו-tower_cost — לא לפי מספר קבוע",
                 en: "The plan comes from a dict, and the spending stops on get_gold and tower_cost, not on a fixed count" } },
    { kind: "output", mode: "contains", expect: "gold left:" },
  ] }
```

The `also` array is the schema's two-requirement form (`spec/09-battle-game.md`):
the battle has to be won, the source has to show the economy, **and** the program
has to report what it had left. The printed line is not decoration — it is how
she can see that the `while` stopped for the right reason, and it is the first
time in the course a check reads both her code and her output.

Verified: solution wins 4/4 with 24 kills, 450 of 480 gold spent, seven towers on
the field. **M1's answer loses 2** — the harpies are new and five towers are not
enough. Empty program: loses 4–0.

Two things the brief has to say out loud, because both are new shapes rather than
new syntax:
- The order of `["cannon", "archer", "ice"]` is a **priority of spending**. The
  expensive, important towers are bought first, while there is still gold.
- The `while` has two conditions joined by `and`: enough gold, and a spare spot
  left. Either one running out ends the shopping. That is lesson 5 and lesson 7
  meeting for the first time in something that matters.

Hints:
1. כמה זהב יש, וכמה עולה כל מה שברשימות שלך? הדפיסי `get_gold()` אחרי כל קבוצה
   ותראי מתי הוא נגמר.
2. `CATALOGUE` הוא מילון: מפתח הוא סוג מגדל, הערך הוא רשימת המשבצות שלו. לפני כל
   בנייה בודקים `if get_gold() >= tower_cost(kind):`. לרזרבה משתמשים ב-`while`
   כי את לא יודעת מראש לכמה יספיק.
3. שתי לולאות מקוננות לקטלוג: החיצונית על סדר הקנייה `["cannon", "archer", "ice"]`,
   הפנימית על `CATALOGUE[kind]`. לרזרבה: מונה `index = 0`, ואז
   `while get_gold() >= tower_cost("archer") and index < len(spare):` — שני
   תנאים, כי גם הזהב וגם המשבצות יכולים להיגמר, ומי שנגמר ראשון עוצר. אל תשכחי
   `index = index + 1` בסוף הגוף, אחרת הלולאה לא תיעצר לעולם והמנוע יעצור אותה
   בשבילך אחרי חמש שניות.

---

## M3 — The Doctrine · התורה · 90 XP, 22 🪙

**What she builds:** the first strategy of the capstone — functions, a dict, and
two `try`/`except` guards, exactly the shape lesson 18 ended on.

**Why this mechanic:** the road doubles in length and a wall of cyclopes walks
out ahead of everything else. Left to itself the engine shoots whatever is
furthest along, which means every tower on the map pours its damage into 5 points
of armour while eleven satyrs and eleven harpies stroll past behind them. The
build alone is not enough any more, and this is the milestone where she feels it.

```js
map: The Stair, gold: 600, campHp: 4, seed: 103,
allowed: ["archer", "cannon", "ice"],
waves: [
  { delay: 0,  enemies: [ { kind: "cyclops",   count: 3,  gap: 2.0 } ] },
  { delay: 12, enemies: [ { kind: "satyr",     count: 11, gap: 0.5 } ] },
  { delay: 12, enemies: [ { kind: "harpy",     count: 11, gap: 0.6 } ] },
  { delay: 14, enemies: [ { kind: "hellhound", count: 11, gap: 0.4 } ] },
  { delay: 30, enemies: [ { kind: "harpy",     count: 11, gap: 0.6 } ] },
  { delay: 31, enemies: [ { kind: "satyr",     count: 11, gap: 0.5 } ] },
],
```

The build grows to fit the longer road; the catalogue and the spending loop are
hers from M2 with new spots:

```python
CATALOGUE = {"cannon": [[5, 3], [8, 4], [11, 6], [15, 8]],
             "archer": [[3, 0], [4, 2], [9, 3], [12, 7], [17, 8]],
             "ice": [[7, 3], [14, 10]]}
SPARE = [[3, 3], [10, 4], [8, 6], [12, 4], [18, 8], [14, 4]]
```

The new part:
```python
THREAT = {"harpy": 4, "satyr": 3, "hellhound": 2}


def threat_of(enemy):
    try:
        return THREAT[enemy["kind"]]
    except KeyError:
        return 0


def effort(enemy):
    try:
        return enemy["hp"] / enemy["armour"]
    except ZeroDivisionError:
        return 0


def choose_target(enemies):
    best = enemies[0]
    for enemy in enemies:
        if threat_of(enemy) > threat_of(best):
            best = enemy
        elif threat_of(enemy) == threat_of(best) and effort(enemy) < effort(best):
            best = enemy
    return best
```

```js
check: { kind: "battle",
  also: { kind: "source",
          mustInclude: ["def choose_target", "except KeyError", "except ZeroDivisionError"],
          mustExclude: ["except:"],
          message: { he: "תורת הירי היא פונקציה, והחישובים המסוכנים מוגנים כל אחד ב-except המדויק שלו",
                     en: "The doctrine is a function, and each risky calculation is guarded by its own exact except" } } }
```

Verified — and this is the milestone where the numbers make the argument:

| what she writes | outcome |
| --- | --- |
| the solution | **wins**, 4/4 HP, 58 kills, 560 gold spent |
| the M2 answer (build only) | loses, 4 leaked — the camp falls |
| `return 0` / `return enemies[0]` | lose, 4 leaked |
| `return None` | loses, 4 leaked |
| empty program | loses, 4 leaked |

Note that `THREAT` deliberately has **no cyclops entry**. `threat_of` returns 0
for it, which is what puts the armoured leader last in the queue — the fix and
the tactic are the same line, and it is the lesson-18 habit paying rent.

Hints:
1. הריצי עם הבנייה בלבד וצפי בקרב עד הסוף. במי יורים המגדלים בשלושים השניות
   הראשונות, ומי בדיוק עובר להם מאחורי הגב?
2. שתי פונקציות עוזרות ופונקציה אחת ראשית. `threat_of` מחזירה דירוג מהמילון,
   `effort` מחזירה `hp / armour`, ושתיהן חייבות לשרוד מפלצת שאין במילון ומפלצת
   בלי שריון. `choose_target` בוחרת את הדירוג הגבוה, ובתיקו את זו שדורשת פחות עבודה.
3. `threat_of` היא `try: return THREAT[enemy["kind"]]` עם
   `except KeyError: return 0`. `effort` היא `try: return enemy["hp"] / enemy["armour"]`
   עם `except ZeroDivisionError: return 0`. הקיקלופ לא נמצא ב-`THREAT` **בכוונה**
   — הוא מקבל 0 והוא האחרון בתור, וזה בדיוק מה שאת רוצה: הוא איטי, כבד, ולא
   הוא זה שיגיע לשער ראשון. ב-`choose_target`: `if` על דירוג גבוה יותר, ו-`elif`
   על דירוג שווה עם `effort` נמוך יותר.

---

## M4 — The Forge · הנפחייה · 90 XP, 22 🪙

**What she builds:** her own tower types. The doctrine from M3 becomes a class,
and a second class inherits from it and changes one list.

**Why this mechanic:** this is the milestone that proves the class was worth
learning, and it is the only place in the course where the proof is a
measurement. The wave is larger and now includes a second hellhound stream, and
**the one global doctrine she wrote in M3 loses this battle**. The archers and the
cannons want different things — the archers are the only anti-air, the cannons
are blind to the sky and pay full price for armour — and one function cannot say
both.

```js
map: The Stair, gold: 800, campHp: 4, seed: 104,
allowed: ["archer", "cannon", "ice"],
waves: [
  { delay: 0,  enemies: [ { kind: "cyclops",   count: 4,  gap: 2.0 } ] },
  { delay: 12, enemies: [ { kind: "satyr",     count: 15, gap: 0.5 } ] },
  { delay: 12, enemies: [ { kind: "harpy",     count: 15, gap: 0.6 } ] },
  { delay: 14, enemies: [ { kind: "hellhound", count: 15, gap: 0.4 } ] },
  { delay: 30, enemies: [ { kind: "harpy",     count: 15, gap: 0.6 } ] },
  { delay: 31, enemies: [ { kind: "satyr",     count: 15, gap: 0.5 } ] },
  { delay: 33, enemies: [ { kind: "hellhound", count: 15, gap: 0.4 } ] },
],
```

The build is M3's with the spare gold going to **cannons** rather than archers —
worth saying in the brief, because with this much armour on the road it is the
first economic decision that has a right answer.

The new part:
```python
class Watchtower:
    def __init__(self):
        self.priority = ["harpy", "satyr", "hellhound", "cyclops"]
        self.shots = 0

    def rank(self, enemy):
        position = 0
        for kind in self.priority:
            if enemy["kind"] == kind:
                return position
            position = position + 1
        return position

    def fire(self, enemies):
        self.shots = self.shots + 1
        best = enemies[0]
        for enemy in enemies:
            if self.rank(enemy) < self.rank(best):
                best = enemy
        return best


class Siege(Watchtower):
    def __init__(self):
        super().__init__()
        self.priority = ["satyr", "hellhound", "cyclops", "harpy"]


register_tower("archer", Watchtower)
register_tower("cannon", Siege)
register_tower("ice", Siege)
```

```js
check: { kind: "battle",
  also: { kind: "source",
          mustInclude: ["class Watchtower", "class Siege(Watchtower)", "super().__init__()",
                        "self.rank(", "register_tower("],
          message: { he: "שתי תבניות — אחת שומרת שמיים ואחת שוברת שריון — והשנייה יורשת מהראשונה",
                     en: "Two molds — one watches the sky, one breaks armour — and the second inherits from the first" } } }
```

Verified:

| what she writes | outcome |
| --- | --- |
| the two classes | **wins**, 4/4 HP, 94 kills, 750 gold spent, 11 towers |
| **the M3 answer — one global doctrine** | **loses, 2 leaked** |
| the build alone | loses, 4 leaked |
| `return 0` / `return enemies[0]` | lose, 4 leaked |
| `return None` / empty program | lose, 4 leaked |

That second row is the whole milestone. Put it in the brief as a promise: *the
code that won yesterday is not enough today, and the reason is not that you wrote
it badly.*

**Note:** `Siege` is registered to both `"cannon"` and `"ice"`, which produces
**two separate objects** from one class — the ice tower's `self.shots` and the
cannons' `self.shots` count independently. The brief should point at that, since
it is the "one mold, many castings" sentence turning into something on screen.

Hints:
1. הריצי את התשובה של M3 על הגל הזה. היא מפסידה. עכשיו השאלה: מה הקשתים צריכים
   לירות בו, מה התותחים צריכים לירות בו, והאם פונקציה אחת יכולה להגיד את שניהם?
2. `Watchtower` היא `choose_target` של M3 שהפכה ל-class: הסדר עובר ל-`self.priority`
   ב-`__init__`, ההשוואה עוברת ל-method בשם `rank`. `Siege` יורשת ממנה ומחליפה
   רק את הסדר — קודם רך, אחר כך משוריין, ובסוף מה שעף (שהיא ממילא לא רואה).
3. `class Siege(Watchtower):` עם `__init__` שמתחיל ב-`super().__init__()` ואז
   שורה אחת שדורסת את `self.priority`. את `rank` ואת `fire` **לא כותבים שוב** —
   הן ירדו בירושה. שלוש שורות רישום בסוף:
   `register_tower("archer", Watchtower)`, `register_tower("cannon", Siege)`
   ו-`register_tower("ice", Siege)`. שימי לב שהתותחים והקרח מקבלים שתי יציקות
   נפרדות מאותה תבנית, וכל אחת סופרת את הירי שלה בנפרד.

---

## M5 — The Long Night · הלילה הארוך · 110 XP, 28 🪙

**What she builds:** the full defense, and the one line of Python in this lesson
she has not written before: `random.seed`.

**Why this mechanic:** nine waves, two cyclops assaults, and more spare spots than
gold. She shuffles the reserve list before spending on it, which means the
leftovers land somewhere different every time the seed changes — and identically
every time it does not. That is the whole point of `random.seed`, and she meets
it here so that the graduation section can tell her the truth about it four pages
later.

```js
map: The Stair, gold: 1000, campHp: 4, seed: 105,
allowed: ["archer", "cannon", "ice", "lightning"],
waves: [
  { delay: 0,  enemies: [ { kind: "cyclops",   count: 4,  gap: 2.0 } ] },
  { delay: 12, enemies: [ { kind: "satyr",     count: 18, gap: 0.5 } ] },
  { delay: 12, enemies: [ { kind: "harpy",     count: 18, gap: 0.6 } ] },
  { delay: 14, enemies: [ { kind: "hellhound", count: 18, gap: 0.4 } ] },
  { delay: 30, enemies: [ { kind: "harpy",     count: 18, gap: 0.6 } ] },
  { delay: 31, enemies: [ { kind: "satyr",     count: 18, gap: 0.5 } ] },
  { delay: 33, enemies: [ { kind: "hellhound", count: 18, gap: 0.4 } ] },
  { delay: 50, enemies: [ { kind: "cyclops",   count: 6,  gap: 1.5 } ] },
  { delay: 51, enemies: [ { kind: "harpy",     count: 18, gap: 0.6 } ] },
],
```

Solution (M4's two classes unchanged, plus this build):
```python
import random

random.seed(20)

CATALOGUE = {"cannon": [[5, 3], [8, 4], [11, 6], [15, 8], [3, 3], [12, 7]],
             "archer": [[3, 0], [4, 2], [9, 3], [17, 8]],
             "ice": [[7, 3], [14, 10]]}
SPARE = [[10, 4], [8, 6], [12, 4], [18, 8], [14, 4], [1, 0], [16, 10], [11, 10]]

for kind in ["cannon", "archer", "ice"]:
    for spot in CATALOGUE[kind]:
        if get_gold() >= tower_cost(kind):
            place_tower(kind, spot[0], spot[1])

random.shuffle(SPARE)
index = 0
while get_gold() >= tower_cost("cannon") and index < len(SPARE):
    place_tower("cannon", SPARE[index][0], SPARE[index][1])
    index = index + 1

print("gold left:", get_gold())
```

```js
check: { kind: "battle",
  also: { kind: "source",
          mustInclude: ["import random", "random.seed(", "random.shuffle(",
                        "class Watchtower", "register_tower("],
          message: { he: "הרזרבה מוגרלת עם random אחרי random.seed — כדי שהקרב יהיה אקראי וגם ניתן לשחזור",
                     en: "The reserve is drawn with random after random.seed, so the battle is both random and reproducible" } } }
```

Verified: solution wins 4/4. The same build with no classes: loses, 4 leaked.
`return 0`: loses, 5 leaked. Empty program: loses 4.

**The honest thing to say about `random` here**, and the brief should say it
rather than leave it to be discovered: the shuffle does not make her defense
better. It makes it **different**, reproducibly, and that is a tool — she can
change one number, watch a different arrangement fight the same wave, and compare
them. A battle you cannot repeat is a battle you cannot learn from. `random.seed`
is what buys the repeat.

Hints:
1. יש לך יותר משבצות רזרבה מזהב. מה קורה אם הסדר שבו את קונה אותן משתנה, ואיך
   אפשר לבדוק את זה בלי לשנות את הקוד בכל פעם?
2. `import random` ואז `random.seed(20)` בראש הקובץ, לפני הכל. `random.shuffle`
   מערבב רשימה **במקום** — הוא לא מחזיר רשימה חדשה, אז אין מה לשמור מהתוצאה שלו.
3. `random.shuffle(SPARE)` לפני לולאת ה-`while`, ואז לולאת הקנייה נשארת בדיוק
   כמו ב-M2 — רק שהסדר של `SPARE` כבר לא זה שכתבת. שני זהב לתשומת ליבך:
   `random.shuffle(SPARE)` ולא `SPARE = random.shuffle(SPARE)` (השני יהרוג לך את
   הרשימה ויחזיר `None`), ו-`random.seed(20)` חייב לרוץ **לפני** ההגרלה, אחרת
   כל הרצה תיתן פיזור אחר ולא תוכלי להשוות שתי גרסאות של ההגנה.

---

## M6 — BOSS: Kronos · קרונוס · 110 XP, 28 🪙

**What she builds:** the last defense. Everything she has, against a Titan.

**Why this mechanic:** Kronos has **1400 hit points and 12 armour**, and damage
in this engine is `max(1, damage - armour)`. Her archers — the tower she has
trusted since lesson 1 — do exactly **1** point per shot to him. The instinct
that carried Act I is worthless here, and she has to find that out from the
numbers rather than be told:

| tower | damage to Kronos per shot | dps per 100 gold |
| --- | --- | --- |
| 🏹 archer | 1 | 3.2 |
| ⚡ lightning | 6 | 4.0 |
| ❄️ ice | 1 | 1.4 — but it **slows him**, and time is the resource |
| 💣 cannon | **16** | **10.7** |

Kronos also moves at 0.5 and slows to 0.275 under ice, which triples how long
every cannon on the road can reach him. Ninety-six other monsters come with him.

```js
map: The Stair, gold: 1400, campHp: 3, seed: 106,
allowed: ["archer", "cannon", "ice", "lightning"],
waves: [
  { delay: 0,  enemies: [ { kind: "satyr",     count: 15, gap: 0.5 } ] },
  { delay: 1,  enemies: [ { kind: "harpy",     count: 15, gap: 0.5 } ] },
  { delay: 16, enemies: [ { kind: "hellhound", count: 15, gap: 0.4 } ] },
  { delay: 16, enemies: [ { kind: "harpy",     count: 15, gap: 0.5 } ] },
  { delay: 32, enemies: [ { kind: "cyclops",   count: 6,  gap: 1.5 } ] },
  { delay: 33, enemies: [ { kind: "satyr",     count: 15, gap: 0.5 } ] },
  { delay: 50, enemies: [ { kind: "kronos",    count: 1,  gap: 0 } ] },
  { delay: 52, enemies: [ { kind: "harpy",     count: 15, gap: 0.6 } ] },
],
```

Solution — her classes from M4 with `"kronos"` added to the priority lists, and a
build weighted to cannons:

```python
class Watchtower:
    def __init__(self):
        self.priority = ["harpy", "satyr", "hellhound", "cyclops", "kronos"]
        self.shots = 0
    …rank and fire as in M4…


class Siege(Watchtower):
    def __init__(self):
        super().__init__()
        self.priority = ["kronos", "cyclops", "hellhound", "satyr", "harpy"]


register_tower("archer", Watchtower)
register_tower("cannon", Siege)
register_tower("ice", Siege)

import random

random.seed(20)

CATALOGUE = {"cannon": [[3, 0], [3, 3], [5, 3], [8, 4], [10, 4], [8, 6],
                        [11, 6], [12, 7], [15, 8], [17, 8], [14, 10]],
             "ice": [[7, 3], [12, 4], [16, 10]],
             "archer": [[4, 2], [9, 3], [14, 4], [18, 8]]}
SPARE = [[1, 0], [11, 10], [6, 6], [13, 4]]

for kind in ["cannon", "ice", "archer"]:
    for spot in CATALOGUE[kind]:
        if get_gold() >= tower_cost(kind):
            place_tower(kind, spot[0], spot[1])

random.shuffle(SPARE)
index = 0
while get_gold() >= tower_cost("cannon") and index < len(SPARE):
    place_tower("cannon", SPARE[index][0], SPARE[index][1])
    index = index + 1

print("gold left:", get_gold())
```

```js
check: { kind: "battle",
  also: { kind: "source",
          mustInclude: ["class Watchtower", "class Siege(Watchtower)", "register_tower(",
                        "random.seed(", "get_gold()", "tower_cost("],
          mustExclude: ["except:"],
          message: { he: "הקרב האחרון דורש את הכל: תבניות משלך, כלכלה שנשענת על get_gold, והגרלה עם זרע",
                     en: "The last battle needs all of it: your own molds, an economy driven by get_gold, and a seeded draw" } } }
```

Verified — the numbers, because this one deserves them:

| what she writes | outcome |
| --- | --- |
| the solution | **wins**, 3/3 HP, **97 kills**, 1400 gold spent, 18 towers, 117 seconds of battle |
| the same build with no classes | loses, 1 leaked |
| the M5 answer unchanged | loses, 1 leaked |
| 900 gold of archers along the road | loses, 3 leaked — only 44 kills |
| `return 0` / `return enemies[0]` | lose, 3 leaked, 57 kills |
| `return None` / empty program | lose, 3 leaked |

The "900 gold of archers" row belongs in the brief as Chiron's warning, not as a
spoiler: *the tower that saved you on the first night will do one point of damage
to him. Read the table before you spend.*

Hints:
1. הסתכלי על השריון של קרונוס ועל הנזק של כל מגדל. `max(1, damage - armour)` —
   כמה נזק עושה לו חץ אחד? וכמה פגזים צריך בשביל 1400?
2. תותחים הם התשובה היחידה לשריון 12, וקרח קונה לתותחים זמן: קרונוס איטי ממילא,
   ומואט הוא זוחל. הכיתי את התקציב לרוב תותחים, קצת קרח, ומעט קשתים למה שעף.
   ואת התבניות מ-M4 צריך לעדכן — יש עכשיו סוג מפלצת חמישי בשם `"kronos"`.
3. שלושה שינויים, לא יותר. (א) הוסיפי `"kronos"` לשתי רשימות ה-`priority`:
   ב-`Watchtower` בסוף, כי לקשתים אין מה לעשות איתו, וב-`Siege` **בהתחלה**, כי
   התותחים והקרח הם כל מה שיש. (ב) הפכי את הקטלוג לתותח-כבד — אחד עשר תותחים
   פרושים לאורך כל הדרך, שלושה מגדלי קרח, וארבעה קשתים לשמיים. (ג) הרזרבה נשארת
   תותחים. אל תפזרי את התותחים בערימה אחת: כל תותח נספר לפי כמה זמן קרונוס
   בטווח שלו, ואחד עשר תותחים לאורך הדרך נותנים לו אחד עשר קטעים שבהם הוא נשחק
   במקום אחד ארוך.

---

## Boss resolution

`boss: { name: { he: "קרונוס", en: "Kronos" }, icon: "⏳", hp: 6 }`

One HP per completed milestone, in order. The bar is the progress indicator for
the whole lesson, and partial progress persists — she can close the tab after
milestone 3 and come back to a Titan on 3 HP.

Kronos never reaches 0 from a failed attempt. There is no losing state anywhere
in this course; there is only "not finished yet". When the sixth milestone
passes, the bar empties and the closing cutscene runs.

**Closing cutscene** (short, plays once, skippable):

> השעון נעצר.
> קרונוס מתפורר לחול על רצפת השיש, ואחר כך גם החול נעלם.
> הכיסאות מתמלאים אחד־אחד. שנים־עשר אלים מסתכלים עלייך ומחכים שתדברי.
> זאוס שואל מה את רוצה.
> את מסתכלת על עשרים החרוזים בשרשרת, ועונה: "עוד."

## Reward & Recap

**Item**: 🏛️ **כס באולימפוס / A Throne on Olympus** — "לא ביקשת אלמוות. ביקשת
מקום ליד השולחן, ואת הקוד שכתבת בחזרה. קיבלת את שניהם."

**Bead 20** completes the necklace. The inventory drawer shows all twenty; the
hub should mark the necklace as complete with a small, quiet animation, not a
fanfare.

**Level**: the completion bonus is calibrated to cross **4200 XP → אולימפית /
Olympian**, level 7, the last title in the game. She reaches it here and nowhere
earlier. See the implementation notes.

**Achievements**:
- *World-Builder* — all six milestones
- *Olympian* — level 7
- *The Twentieth Bead* — all twenty items
- *No Hints Needed* — the whole capstone with zero hints (rare; make the toast
  say so)

**Recap bullets**:
- בנית הגנה שלמה: `class` משלך, לולאות, תנאים, רשימות, מילון, פונקציות,
  אקראיות ו-`try`/`except`, ביחד, בקובץ אחד
- הדרך לבנות משהו גדול היא פרוסות קטנות שרצות — לא מפץ אחד גדול
- כל אבן דרך הפסידה בקרב של זו שאחריה, וזה היה בתכנון
- `random.seed` קובע את סדרת ההגרלות, וככה בודקים משהו שמגריל
- `try`/`except` סביב נתונים שלא את כתבת הוא ההבדל בין הגנה ששורדת הפתעה לבין
  הגנה שמתה מהפתעה
- שריון משנה הכל: `max(1, damage - armour)` הפך את הקשת, שהצילה אותך בלילה
  הראשון, לחסרת ערך מול קרונוס
- כשמשהו נשבר, ארבעת הצעדים עובדים — הם עבדו היום, הם יעבדו על כל שפה אחרת
- הקוד שכתבת פה הוא פייתון אמיתי. מה שמשתנה מחר זה איפה הוא רץ

**Next teaser** — there is no lesson 21, and the teaser must not pretend
otherwise:
*"אין שיעור 21. יש פייתון אמיתי, חינם, על המחשב שלך — ובלי שום מגבלה של דפדפן.
גללי למטה; הסעיף האחרון הוא מפה, לא סיום."*

---

# 🎓 Graduating to real Python · לצאת מהמחנה

**This section is required and must not be softened.** It renders after the
recap, always expanded, and it is the last thing she reads in the course. She
finished; she is owed the truth about what she was standing on.

### מה זה היה, בעצם

הקורס הזה מריץ פייתון בתוך הדפדפן, במנוע שנקרא **Skulpt**. Skulpt הוא פייתון
שנכתב מחדש ב-JavaScript כדי שיוכל לרוץ בעמוד אינטרנט, בלי התקנה ובלי חיבור
לרשת.

**הקוד שכתבת הוא פייתון אמיתי.** ה-`class` שיצקת, ה-`try`/`except`, ה-f-strings,
`.split()`, `random.shuffle` — כל אלה קיימים בדיוק ככה בפייתון שרץ על שרתים
בעולם. אף אחד לא הראה לך גרסת ילדים.

### ומה **לא** היה פייתון

דבר אחד כן צריך להפריד, כי הוא זה שיבלבל אותך ביום הראשון על המחשב:

`place_tower`, `get_gold`, `tower_cost`, `get_wave`, `get_map`, `camp_hp`,
`choose_target`, `register_tower` — **אלה לא פקודות של פייתון.** הן המשחק הזה.
מישהו כתב אותן ב-JavaScript והזריק אותן פנימה כדי שתוכלי לקרוא להן כמו לכל
פונקציה אחרת. תפתחי פייתון על המחשב, תכתבי `place_tower("archer", 2, 3)`
ותקבלי `NameError: name 'place_tower' is not defined` — והשגיאה תהיה צודקת.

זה לא מרמה ולא בזבוז. **בדיוק ככה עובדת כל ספרייה בעולם**: `pygame` נותן לך
`pygame.draw.circle`, `requests` נותן לך `requests.get`, ומישהו כתב אותן
מראש כדי שאת תוכלי לקרוא להן. מה שלמדת פה הוא איך קוראים לפונקציה שמישהו אחר
כתב, איך קוראים את התיעוד שלה, ומה לעשות כשהיא מחזירה משהו אחר ממה שציפית.
מחר את מחליפה את הספרייה, וזה כל ההבדל.

מה שכן שלך לגמרי, ועובר איתך בלי שינוי: הלולאות, התנאים, הרשימות, המילונים,
הפונקציות, ה-`class`-ים שכתבת, ו-`try`/`except`. אלה השפה. השאר היה השדה.

### מה Skulpt לא נתן לך

בכנות, כי תגלי את זה בעצמך תוך יום:

| מה שחסר | למה זה משנה |
| --- | --- |
| `open()` — קריאה וכתיבה של קבצים | המשחק שלך לא יכול לשמור שיא לפעם הבאה |
| `import json` | הפורמט שבו כמעט כל תוכנית שומרת נתונים |
| `pip` וכל ספרייה חיצונית | אין `pygame`, אין `requests`, אין `pandas`, אין בוט לדיסקורד |
| `input()` בזמן אמת בתוך אנימציה | הקרבות פה מחושבים עד הסוף לפני שמצוירת פריים אחת |
| מגבלת זמן של 5 שניות להרצה | פה זה מגן על הטאב שלך. בפייתון אמיתי אין דבר כזה |
| ניסוח הודעות שגיאה | ראית את זה בשיעור 18 — הסוג זהה, המילים לפעמים לא |
| מהירות | Skulpt איטי משמעותית. לתרגול זה לא מורגש, לחישוב אמיתי כן |

זו לא ביקורת על Skulpt. זו העסקה: ויתרנו על כל אלה כדי שתוכלי להתחיל לכתוב קוד
בלי להתקין כלום, ובלי שאף אחד מבוגר יצטרך לעזור לך. העסקה הזאת השתלמה למשך
עשרים שיעורים. עכשיו היא נגמרה.

### איך משיגים את האמיתי — שלושה צעדים

1. **התקנה.** הדרך הקצרה ביותר למי שמתחילה: **Thonny** (`thonny.org`) — עורך קוד שנבנה
   ללומדות ומגיע עם פייתון בפנים, התקנה אחת ולא צריך לגעת בשום הגדרה. אם את
   מעדיפה את המקור: `python.org` → Downloads → Python 3. **בוינדוס, סמני
   "Add python.exe to PATH" במסך הראשון של ההתקנה** — זה המשבצת שכולם מפספסים
   ואחר כך שוברים עליה שעה.
3. **טרמינל, כשתרצי.** באותה תיקייה: `python battle.py` (במק ובלינוקס לרוב
   `python3 battle.py`). זה אותו דבר בדיוק, רק בלי כפתור.

2. **קובץ.** פתחי חלון חדש, כתבי משהו קטן משלך, שמרי בשם `battle.py`. הסיומת
   `.py` היא מה שהופך אותו לתוכנית. לחצי Run.

**הפתעה ראשונה:** אם תעתיקי לשם את הפתרון של אבן דרך 6 כמו שהוא, תקבלי מיד
`NameError: name 'place_tower' is not defined`. זה בדיוק מה שכתוב למעלה, וזה
הרגע להעביר את מה שכן שלך: את שתי המחלקות, את המילון, את הלולאות, את
ה-`try`/`except`. הן ירוצו שם בלי שינוי. תני להן משהו אחר לעשות.

**הפתעה שנייה:** `random.seed(20)` נותן סדרת מספרים אחת ב-Skulpt וסדרה אחרת
בפייתון של המחשב. הזרע קובע שהסדרה תהיה **קבועה**, לא שהיא תהיה **זהה בכל
מנוע**. זה בדיוק סוג הדבר שכיף לגלות לבד, וחבל לגלות בפאניקה — אז עכשיו את
יודעת.

### מה לבנות מחר

- **הכי קרוב:** קחי את `Watchtower` ואת `Siege` ותני להן שדה קרב חדש שאת
  כותבת. מפה כרשימה של רשימות, מפלצות כמילונים, לולאה שמזיזה אותן צעד — כל
  אלה כבר אצלך. שלוש מאות שורות ויש לך משחק שאת גם כתבת וגם מריצה.
- `open()` — תני לתוכנית שלך לזכור. קובץ שיאים, שלושים שורות, והיא ממשיכה
  לחיות בין הרצות.
- `turtle` — מגיע עם פייתון, מצייר על המסך, ובלולאה אחת יוצא ממנו משהו יפה.
- `tkinter` — מגיע עם פייתון. חלון, כפתורים, המשחק שלך עם ממשק.
- `pygame` — `pip install pygame`. הקרב על אולימפוס עם גרפיקה ותנועה.
- `requests` — לדבר עם אתרים ולמשוך מהם נתונים אמיתיים.
- **Automate the Boring Stuff with Python** — ספר שלם וחינמי באינטרנט, כתוב
  למי שרוצה שהמחשב יעשה בשבילה דברים משעממים.

### המשפט האחרון

כירון לא נותן נאום. הוא אומר את זה:

> "עשרים שיעורים, ותשעים ושבע מפלצות בקרב האחרון —
> ואת כתבת את המגדל שירה בכולן.
> מהיום השפה היא שלך, ואת לא צריכה אותי בשבילה.
> המחנה נשאר פתוח. לכי תבני משהו."

## Common mistakes to anticipate

| She does | She sees | Hint must cover |
| --- | --- | --- |
| builds four towers with four copied lines | M1 passes the battle, the `also` refuses it | a list and a loop; the message names it |
| hard-codes how many spare towers to buy | M2 wins, M3's budget breaks it silently | `get_gold()` and `tower_cost()` decide, not a number |
| forgets `index = index + 1` in the spending `while` | the 5-second limit fires | a `while` needs something that changes |
| `SPARE = random.shuffle(SPARE)` | `TypeError` on the next line, or an empty build | `shuffle` reorders in place and returns `None` |
| calls `random.seed` after the shuffle | a different arrangement every run | the seed has to be set before anything is drawn |
| writes the class but never calls `register_tower` | the battle runs, loses, and shows no error | a mold nobody registered is never poured |
| `register_tower("archer", Watchtower())` | the engine gets an object, not a mold | hand over the class, no `()` |
| keeps the M3 doctrine into M4 | loses by 2 | one rule cannot be right for archers and cannons at once |
| spends M6's gold on archers | 1 damage per shot, 44 kills, camp falls | `max(1, damage - armour)`; read the table before spending |
| stacks M6's cannons in one cluster | Kronos walks through the rest of the road untouched | every cannon is paid for in seconds-in-range |
| `except:` with no type anywhere in the doctrine | the level's `mustExclude` refuses it | catch the type you expect, and only it |
| pastes all six milestones before fighting once | several failures at once, no information | one slice, one fight — the rule of the lesson |

## Implementation notes

- **Every milestone was played through the real engine** with
  `assets/js/battle/{sim,pyapi,play}.js` loaded into a Node VM, the same path
  `tools/verify-python.mjs` uses. Asserted for each: the solution wins with a
  perfect defense; an empty program loses; the **previous milestone's answer**
  loses; and from M3 on, `return 0`, `return enemies[0]` and `return None` all
  lose. Every leak count in this file is measured. Re-measure if any number
  changes.
- **The "previous milestone loses" property is the spine of the capstone** and it
  is not decoration: M1's answer leaks 2 on M2, M2's leaks 4 on M3, M3's leaks 2
  on M4, M5's leaks 1 on M6. That is what lets each brief say *your last answer
  is not wrong, it is no longer enough* and be telling the truth.
- **M6's difficulty is armour, not volume.** Kronos is 1400 HP behind 12 armour,
  and `max(1, damage - armour)` turns an archer into 1 point per shot. A build of
  900 gold of archers along the whole road was measured: 44 kills, 3 leaked, camp
  destroyed. The winning build is eleven cannons spread the length of the stair,
  three ice towers to hold him at 0.275 cells per second, and four archers for
  the harpies the cannons cannot touch. Do not retune M6 without re-running that
  archer-spam control.
- **The `also` array form** (`spec/09-battle-game.md`) is used in M2: a `source`
  rule and an `output` rule together. Every other milestone uses a single
  `source` object. Any milestone whose solution prints may add an `output`
  rule — but only against text printed by the **build script**, never by a
  strategy function or a tower class, because output produced during the
  simulation streams to the live log and is not part of the captured string.
- **No `source` check in this lesson sets `raw: true`.** Every requirement is
  syntax — `for `, `CATALOGUE`, `get_gold()`, `tower_cost(`, `while `,
  `def choose_target`, `except KeyError`, `except ZeroDivisionError`,
  `class Watchtower`, `class Siege(Watchtower)`, `super().__init__()`,
  `register_tower(`, `import random`, `random.seed(`, `random.shuffle(` — and all
  of it survives comment and literal stripping. Adding `raw` would let a word in
  a Hebrew comment satisfy the check.
- **`random` in this lesson is deliberately not allowed to decide the outcome.**
  `random.shuffle` reorders the *reserve* spots, all of which are legal and
  useful; the towers bought from the catalogue are fixed. M5 and M6 were verified
  with `random.seed(20)`, and both hold. If a future edit gives `random` a real
  say in the defense, the level has to be re-verified across seeds, because a
  level she can lose to luck is a level that teaches her the wrong lesson about
  her own code.
- **The one runtime dependency in the whole course** is that `random.seed(20)`
  produces a Skulpt-specific sequence. If `skulpt.min.js` is ever upgraded,
  re-run M5 and M6. Nothing else in the course is version-sensitive — and this
  fact is handed to her in the graduation section as a lesson rather than swept
  up.
- **Milestone chaining.** The editor for milestone N pre-fills with the reference
  solution of N−1, not with her own code. Rationale: her own variant may be a
  perfectly good defense that the next milestone's spots and budget do not fit,
  and a learner returning after two weeks must not be blocked by a diff. Offer a
  "restore my version" affordance where her own last-passing source is kept.
- **Session length.** 60–90 minutes is two or three evenings. The lesson page
  must show the six milestones as a visible checklist with the boss bar at the
  top, and must restore scroll position to the first unfinished milestone on
  return. This is the one lesson where "she can stop mid-lesson" is not a nicety.
- **Two battlefields only**, and M3–M6 share one map on purpose. By M6 the road
  should be somewhere she recognises, so that the last battle is about her
  decisions and not about reading a new diagram.
- **XP calibration — checked against the real totals, not estimated.** Lessons
  1–19 award **3570** core XP (side quests add up to 105 more and are optional,
  so they cannot be relied on). The capstone awards 530 across the six milestones
  (60 + 70 + 90 + 90 + 110 + 110) and **110** on completion:
  - after milestone 6 she is on **4100** — still level 6, Champion of Olympus;
  - the completion award takes her to **4210**, crossing 4200 → **Olympian**.

  The capstone is worth roughly three ordinary lessons, which matches its 60–90
  minutes and six graded battles. **If XP anywhere in lessons 1–19 changes,
  retune the completion bonus here — not the milestones.** The crossing has to
  land on the final award of the final lesson and nowhere else, and it must
  happen for a learner who skipped every optional side quest. See the note in
  `spec/TODO.md`.
- **No milestone uses `input()`**, so none of them needs `check.stdin`. The
  schema supports it on a battle level (`check: { kind: "battle", stdin: [...] }`)
  and an earlier draft of this capstone leaned on it; the battle itself turned
  out to be a better source of pressure than a prompt, and asking a question
  before a fight that is then simulated to completion reads as a detour.
- **The graduation section is required and must not be softened**, including its
  new second half: `place_tower`, `get_gold`, `choose_target` and
  `register_tower` are **this game**, not Python, and she has to be told before
  she meets `NameError: name 'place_tower' is not defined` alone on her own
  machine. The framing to keep is the true one: that is how every library works,
  and the skill of calling code somebody else wrote is exactly what she has been
  practising for twenty lessons.
- There is no lesson 21 and the hub must not render a locked stop 21. After the
  capstone, the map's final stop shows the throne and the necklace, and the hub's
  primary action becomes "open the graduation section again".
