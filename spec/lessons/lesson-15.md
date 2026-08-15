# Lesson 15 — The Dice of Fate · קוביות הגורל

> **Act IV — The Titan's Curse · קללת הטיטאן** · Stop 15 of 20
> Structure follows `spec/lessons/lesson-01.md` (the reference lesson) and the
> schema in `spec/04-lesson-template.md`.

| | |
| --- | --- |
| **id** | `15` |
| **slug** | `the-dice-of-fate` |
| **minutes** | 30–35 |
| **concepts** | `import`, `random.randint`, `random.choice`, `random.seed`, `math.sqrt` / `floor` / `ceil` / `pi`, building a playable game |
| **new vocabulary** | `import`, מודול / module, ספרייה / library, `random`, `math`, `seed` |
| **requires** | L14 `return` + ברירות מחדל · L13 `def` · L7 `while` + `break` · L9–10 lists · L4 `round()` ו-`**` · L3 f-strings |
| **item** | 🎲 קוביות הגורל / The Dice of Fate |
| **control model** | build script + **strategy function** (from L14) |
| **towers unlocked** | 🏹 archer, 💣 cannon |
| **XP** | 20 + 30 + 30 (training battles) + 60 (great battle) + 25 (optional side battle) + 30 (bonus) = **195** |
| **drachmas** | 5 + 8 + 8 + 15 + 6 = **42** 🪙 |

## Teaching goal

By the end she can `import` a module, call a function that lives inside it with
the dot syntax, and — the part that matters — she has **a game on her screen that
she wants to run again**.

This is the payoff lesson of Act IV. Lesson 13 was structural and lesson 14 was
the graduation; this one is where the new powers get sharp. `math.sqrt` is not
homework here — it is the difference between a cannon shell that kills one
monster and the same shell killing three, and there is a level where measuring is
the **only** strategy out of twelve tested that wins.

`random` gets its own, clearly optional, side battle. The rule the whole course
follows: a graded outcome may never depend on a dice roll. In that battle the
dice pick which of three good plans she builds, and all three hold.

Second goal, quieter but real: `import` is her first encounter with **code
somebody else wrote**. Frame it honestly — she is not going to implement a square
root or a random number generator, and neither does anyone else.

## Story beat

The map is drawn but the road is not safe. Chiron takes a small leather bag out
of his sleeve and shakes it onto the table: two yellowed bone dice. He explains
that every program she has written so far does exactly the same thing every time
it runs — which is a virtue, and also the reason none of them are fun.

Then the Moirai are mentioned, and the room gets a degree colder: three sisters
who spin, measure and cut the thread of every life, and who tell nobody in
advance.

The Prophecy panel (6 lines, no code):

> כירון מוציא שק עור קטן מהשרוול ומנער אותו על השולחן.
> שתי קוביות עצם מצהיבות מתגלגלות ונעצרות.
> "עד עכשיו ידעת בדיוק מה התוכנית שלך תעשה, לפני שהרצת אותה."
> "זה יתרון. זה גם משעמם."
> "המוירות, שלוש האחיות שטוות את חוטי החיים, לא מגלות מראש."
> "היום את מלמדת את הקוד שלך לגלגל קובייה."

Cast: Chiron (the dice), Grover (bets a drachma on the Sphinx, immediately
regrets it), Annabeth (does the arithmetic on the odds and is annoyed that luck
exists).

## Chiron Teaches — block by block

1. **prose** — הריצי את אותה תוכנית פעמיים ותקבלי בדיוק אותו פלט. זה מה שרצינו
   עד עכשיו: מכונה שאפשר לסמוך עליה. אבל משחק שבו את יודעת מראש מה יקרה הוא לא
   משחק. היום נוסיף לתוכנית דבר אחד שאין לה: הפתעה.

2. **code (runnable)** — ההרצה הראשונה, בתוך 60 שניות:
   ```python
   import random

   print(random.randint(1, 6))
   ```
   Output: `4` *(or 1, or 6…)*
   Caption: **לחצי הרצה שוב. ועוד פעם.** זו הפעם הראשונה בקורס שאותו קוד בדיוק
   נותן תשובה אחרת.
   *(The UI should make re-running obvious here — this block is the hook of the
   lesson and it only works if she presses Run three or four times.)*

3. **prose** — מה קרה כאן. `random` הוא **מודול** (module) — חבילה של קוד שכבר
   נכתב, בודק, ומחכה לך. `import random` אומר לפייתון "תביאי לי את ארגז הכלים
   הזה". אחרי זה כותבים `random.randint(1, 6)`: קודם שם המודול, אחר כך נקודה,
   ואז שם הפונקציה שגרה בתוכו. הנקודה אומרת **"שייך ל־"** — בדיוק כמו ב-
   `campers.append("Percy")` שכבר מכירה. `randint` היא פונקציה כמו אלה שכתבת
   אתמול: שולחים לה שני ארגומנטים, והיא **מחזירה** ערך.

4. **code (runnable)** — לא רק מספרים:
   ```python
   import random

   monsters = ["a hellhound", "a harpy", "a very large bee"]
   print(f"You meet {random.choice(monsters)}.")
   ```
   Caption: `random.choice` מקבלת רשימה ומחזירה איבר אחד ממנה, באקראי. הריצי כמה
   פעמים.

5. **compare** — הטעות שכל אחד עושה פעם אחת. גבולות.
   - **bad** — `label`: `range(1, 6)` — חמישה מספרים
     ```python
     for n in range(1, 6):
         print(n)
     ```
     מדפיס 1, 2, 3, 4, 5. השישייה **לא** נכללת.
   - **good** — `label`: `random.randint(1, 6)` — שישה מספרים
     ```python
     print(random.randint(1, 6))
     ```
     יכול להחזיר גם 6. `randint` כוללת את שני הקצוות.
   Caption for the pair: שתי פונקציות, שני כללים הפוכים, ואי אפשר להסיק אחת
   מהשנייה. `range` עוצרת לפני; `randint` כוללת. קובייה עם חמש פאות היא באג
   מעצבן שקשה למצוא.

6. **error** — ה-`import` השכוח:
   ```python
   print(random.randint(1, 6))
   ```
   Error: `NameError: name 'random' is not defined`
   Explain: פייתון לא מכירה את `random` עד שביקשת אותו. זו אותה שגיאה בדיוק כמו
   שם משתנה שלא הוגדר — בשביל פייתון, `random` הוא עוד שם שאין לו ערך. שורת
   `import` אחת בראש הקובץ פותרת את זה לכל התוכנית.

7. **callout · tip** — כותרת: *"`import` בראש הקובץ, פעם אחת"*.
   שורות ה-`import` יושבות בשורות הראשונות של התוכנית, לפני הכול. שני מודולים =
   שתי שורות. אין צורך לייבא שוב לפני כל שימוש.

8. **code (runnable)** — המודול השני, `math`:
   ```python
   import math

   print(math.sqrt(144))
   print(math.floor(4.9))
   print(math.ceil(4.1))
   print(round(math.pi, 4))
   ```
   Output:
   ```
   12.0
   4
   5
   3.1416
   ```
   Caption: `sqrt` שורש ריבועי, `floor` מעגל למטה, `ceil` מעגל למעלה,
   `math.pi` הוא לא פונקציה אלא **ערך** — π, בלי סוגריים. `ceil` היא הפונקציה של
   "כמה סירות צריך בשביל 13 חניכים אם בכל סירה נכנסים 4".

9. **callout · warn** — כותרת: *"`round` לעומת `floor` ו-`ceil`"*.
   `round(4.5)` מעגל לשלם הקרוב, `math.floor` תמיד למטה, `math.ceil` תמיד למעלה.
   כשמחשבים "כמה נחוץ" — כמעט תמיד `ceil`. חצי סירה לא עוזרת לאף אחד.

10. **code (runnable)** — לפייס את הגורל: `seed`.
    ```python
    import random

    random.seed(7)
    print(random.randint(1, 20))
    print(random.randint(1, 20))

    random.seed(7)
    print(random.randint(1, 20))
    print(random.randint(1, 20))
    ```
    Caption: שתי השורות האחרונות זהות לשתי הראשונות. `random.seed(7)` קובע את
    נקודת ההתחלה של חוט המזל — ומאותה נקודה, אותה סדרת "אקראיים" בדיוק חוזרת.
    *(Do **not** print concrete expected values in this block: Skulpt's generator
    is not CPython's, so the numbers differ. The caption promises "the same twice",
    which is true everywhere. See Implementation notes.)*

11. **callout · myth** — כותרת: *"שלוש אחיות וחוט אחד"*.
    קלותו טווה את החוט, לכסיס מודדת אותו, אטרופוס גוזרת. אפילו זאוס לא התווכח
    איתן. `random.seed` הוא הדבר הכי קרוב שיש למתכנתת לתפוס את החוט ולומר
    "מכאן, בבקשה, שוב" — וזה שימושי מאוד כשמחפשים באג במשחק.

12. **code (runnable)** — הצצה לאיך `random` נראה בתוך קוד אמיתי. כל שורה כאן
    היא משהו שהיא כבר יודעת, חוץ משורה אחת:
    ```python
    import random

    def roll():
        return random.randint(1, 6)

    def strike(name, target_hp, bonus=2):
        damage = roll() + bonus
        print(f"{name} hits for {damage}!")
        return target_hp - damage

    sphinx_hp = 25
    sphinx_hp = strike("Hero", sphinx_hp)
    print(f"Sphinx: {sphinx_hp} HP")
    ```
    Caption: פונקציה שקוראת לפונקציה, ערך ברירת מחדל, ערך שחוזר ונשמר במשתנה —
    כל זה מאתמול. הדבר היחיד החדש הוא שורה אחת של `random`.

13. **prose + code (runnable: false)** — **ועכשיו על שדה הקרב.** שתי השורות
    שיעשו את כל ההבדל היום הן אלה:
    ```python
    import math

    def choose_target(enemies):
        best = enemies[0]
        for e in enemies:
            gap = math.sqrt((e["x"] - best["x"]) ** 2 + (e["y"] - best["y"]) ** 2)
            print(gap)
        return best
    ```
    Caption: לכל מפלצת ברשימה יש `x` ו-`y` — המיקום שלה על הלוח. `math.sqrt`
    על ההפרשים בריבוע הוא המרחק האמיתי ביניהן, ומרחק אמיתי הוא מה שמאפשר
    לשאול "מי עומדת צפוף עם מי".

14. **callout · warn** — כותרת: *"פגז מתפוצץ, חץ לא"*.
    לתותח יש רדיוס פיצוץ של 1.1 משבצות: כל מי שנמצא בתוכו סופג את המכה
    המלאה. לכוון לראש השיירה זה מגדל אחד ומפלצת אחת. לכוון לאמצע זה אותו
    מגדל ושלוש מפלצות. המשחק לבד תמיד מכוון לראש — ובדיוק בגלל זה יש היום
    שלב שאי אפשר לעבור בלי למדוד.
    *(This callout is the bridge from `math.sqrt` as arithmetic to `math.sqrt` as
    a weapon. Without it, level L2 reads as an arbitrary puzzle.)*

15. **callout · warn** — כותרת: *"אף בדיקה בקורס לא משווה מספר אקראי"*.
    קרב שהתוצאה שלו תלויה בגלגול הוא קרב שיכול להכשיל אותך בלי סיבה שאת רואה.
    לכן יש בשיעור הזה בדיוק **קרב צד אחד** עם `random`, הוא מסומן כרשות, וכל
    גלגול אפשרי בו מנצח. הקוביות בוחרות **איזו** תוכנית טובה תיבנה, לא אם
    תנצחי.

## Try It (ungraded)

```python
import random

def roll_two():
    first = random.randint(1, 6)
    second = random.randint(1, 6)
    print(f"{first} + {second}")
    return first + second

total = roll_two()
print(f"Total: {total}")

if total == 12:
    print("The Fates are in a good mood.")
```

Intro: *"גלגלי כמה פעמים. שני את הקובייה לקובייה עם 20 פאות, הוסיפי קובייה
שלישית, שני את התנאי בסוף. כלום פה לא נבדק — תגלגלי עד שתשיגי 12."*

## The battle levels

**Control model: build script + strategy function.** Both, now. Lesson 14 gave
her `choose_target`; lesson 15 gives her the arithmetic to put inside it, and the
arithmetic to size a defense before the first monster appears.

`math` and `random` do different jobs here and the levels keep them apart on
purpose:

- **`math` is how she stops guessing.** `math.ceil` turns "roughly enough towers"
  into a number the budget agrees with. `math.sqrt` turns "those two look close
  together" into a distance she can compare. Both are graded.
- **`random` is a side battle, and it is optional.** A level whose outcome
  depends on a dice roll would be a level that can fail her for reasons she
  cannot see, so the one `random` battle is built so that **every possible draw
  wins** — verified against nine seeds and against all three outcomes forced by
  hand. Nothing random is ever compared in a `check`.

### The one new mechanic that pays for `math.sqrt`

**A cannon explodes.** Splash radius 1.1 cells: everything within 1.1 of whatever
it hits takes the full shell. Aim at the front of a column of hellhounds and one
monster is hit. Aim at the **middle** and three are. The default targeting always
aims at the front, because the front is furthest along the path — so on a level
full of packed monsters the game's own rule is the worst rule on the board, and
the only way to find the middle of a pack in code is to measure distances.

That is `math.sqrt((ax - bx) ** 2 + (ay - by) ** 2)`, applied to `x` and `y` from
the enemy dict, and it is the single strongest strategy result in Act IV: on L2
it is the **only** strategy out of twelve tested that wins.

---

### L1 — Count the Wave · 20 XP, 5 🪙

**Why this mechanic:** `math.ceil` versus a budget. The level's gold cap is set
to exactly the right number of archers, so guessing high fails on cost and
guessing low fails on leaks. `math.floor` loses. Rounding is not a formatting
detail here; it is the difference between holding and not.

**brief:** לפני שבונים — סופרים. `get_wave()` מחזירה רשימה של כל המפלצות בגל
הזה, כל אחת מילון עם `hp` משלה.

הכלל של כירון: **קשת אחת לכל 160 נקודות חיים של הגל, ומעגלים כלפי מעלה.** חצי
קשת לא עוצרת חצי מפלצת.

חשבי את סך החיים, חשבי כמה קשתות צריך, והציבי בדיוק כמה שיצא — לפי הסדר ברשימה
`SPOTS`. השלב מוגבל ל-250 זהב, אז מגדל מיותר יפסיל אותך בדיוק כמו מגדל חסר.

```js
map: { cols: 20, rows: 8, path: [[0,4],[1,4], … ,[19,4]] },
gold: 500, campHp: 3, seed: 12, allowed: ["archer"],
waves: [
  { delay: 0,  enemies: [{ kind: "satyr",     count: 10, gap: 0.5 }] },
  { delay: 6,  enemies: [{ kind: "harpy",     count:  8, gap: 0.6 }] },
  { delay: 14, enemies: [{ kind: "hellhound", count:  5, gap: 0.9 }] },
],
check: { kind: "battle", maxGoldSpent: 250, also: … },
```

*(10 × 20 + 8 × 30 + 5 × 70 = **790** HP. 790 ÷ 160 = 4.94, so `ceil` is 5 and
`floor` is 4. Five archers hold at 3/3. Four leak two. Six cost 300 and break the
budget. There is exactly one right answer and the maths finds it.)*

**starter:**
```python
import math

SPOTS = [[2,3],[5,5],[8,3],[11,5],[14,3],[17,5]]

total = 0
# 1. add up the hp of every monster in get_wave()

needed = 1
# 2. one archer per 160 hp, rounded up

for i in range(needed):
    place_tower("archer", SPOTS[i][0], SPOTS[i][1])
```

**solution:**
```python
import math

SPOTS = [[2,3],[5,5],[8,3],[11,5],[14,3],[17,5]]

total = 0
for monster in get_wave():
    total = total + monster["hp"]

needed = math.ceil(total / 160)

for i in range(needed):
    place_tower("archer", SPOTS[i][0], SPOTS[i][1])
```

**check:**
```js
{ kind: "battle",
  maxGoldSpent: 250,
  also: { kind: "source", mustInclude: ["import math", "math.ceil", "get_wave"],
    message: { he: "המשימה דורשת לספור את הגל עם get_wave ולעגל כלפי מעלה עם math.ceil",
               en: "This one needs get_wave to count the wave and math.ceil to round up" } } }
```

**hints:**
1. הדפיסי את `total` אחרי הלולאה, לפני שאת בונה משהו. מה המספר, וכמה פעמים
   160 נכנס בו?
2. הצבירה בלולאה היא התבנית משיעור 7, רק שהערך מגיע ממילון: `monster["hp"]`.
   לעיגול כלפי מעלה יש פונקציה במודול `math` — לא `round`, ולא `floor`.
3. `for monster in get_wave():` ובתוכו `total = total + monster["hp"]`. אחר כך
   `needed = math.ceil(total / 160)`. הסכום הוא 790, החלוקה נותנת 4.9375,
   ו-`math.ceil` מחזיר 5. אם קיבלת 4 — עיגלת למטה, ושתי מפלצות עוברות. אם בנית
   שש — הוצאת 300 זהב מתוך תקציב של 250, והשלב נפסל על החריגה.

---

### L2 — The Pack · 30 XP, 8 🪙

**Why this mechanic:** `math.sqrt` on the enemy's `x` and `y`, and the only level
in Act IV where **nothing else works**. Twelve strategies were tested against
this map. Eleven lose. The one that wins measures.

**brief:** שלושה תותחים, ופגז תותח מתפוצץ: כל מי שנמצא במרחק 1.1 משבצות מנקודת
הפגיעה סופג את המכה המלאה.

המשחק מכוון לבד לראש השיירה. בראש השיירה יש בדיוק מפלצת אחת. באמצע יש שלוש.

כתבי `choose_target` שבוחרת את המפלצת עם **הכי הרבה שכנים** קרובים אליה. לכל
מפלצת ברשימה יש `x` ו-`y` — המיקום שלה על הלוח — והמרחק בין שתי נקודות הוא
משפט פיתגורס, בדיוק כמו אתמול, רק שהפעם הוא בתוך פונקציית האסטרטגיה.

```js
map: { cols: 16, rows: 8, path: [[0,4],[1,4], … ,[15,4]] },
gold: 300, campHp: 3, seed: 6, allowed: ["cannon"],
waves: [
  { delay: 0, enemies: [{ kind: "hellhound", count: 6, gap: 0.5 }] },
  { delay: 6, enemies: [{ kind: "satyr",     count: 6, gap: 0.5 }] },
],
```

**starter:**
```python
import math

place_tower("cannon", 3, 3)
place_tower("cannon", 6, 5)
place_tower("cannon", 9, 3)

def pack_size(enemies, target):
    # how many monsters are within 1.1 cells of target?
    return 0

def choose_target(enemies):
    return enemies[0]
```

**solution:**
```python
import math

place_tower("cannon", 3, 3)
place_tower("cannon", 6, 5)
place_tower("cannon", 9, 3)

def pack_size(enemies, target):
    count = 0
    for e in enemies:
        gap = math.sqrt((e["x"] - target["x"]) ** 2 + (e["y"] - target["y"]) ** 2)
        if gap <= 1.1:
            count = count + 1
    return count

def choose_target(enemies):
    best = enemies[0]
    for e in enemies:
        if pack_size(enemies, e) > pack_size(enemies, best):
            best = e
    return best
```

**check:**
```js
{ kind: "battle",
  also: { kind: "source", mustInclude: ["math.sqrt", "def pack_size"],
    message: { he: "כאן צריך למדוד מרחקים באמת — math.sqrt בתוך pack_size",
               en: "This one needs real distances — math.sqrt inside pack_size" } } }
```

**hints:**
1. הריצי כמו שזה, והסתכלי על הפיצוץ. כמה מפלצות הוא תופס בכל פעם? ואיפה על
   השיירה היה כדאי לפוצץ אותו במקום?
2. `pack_size` סופרת: היא עוברת על כל הרשימה ובודקת לכל מפלצת אם המרחק שלה
   מהמטרה קטן או שווה ל-1.1. המרחק הוא `math.sqrt` של הפרש ה-`x` בריבוע ועוד
   הפרש ה-`y` בריבוע. שימי לב שהמטרה עצמה נספרת — המרחק שלה מעצמה הוא 0, וזה
   בסדר גמור.
3. בגוף של `pack_size`: `count = 0`, ואז `for e in enemies:` ובתוכו
   `gap = math.sqrt((e["x"] - target["x"]) ** 2 + (e["y"] - target["y"]) ** 2)`
   ו-`if gap <= 1.1: count = count + 1`, ואחרי הלולאה `return count`.
   ב-`choose_target` זו התבנית של "השומרת על הטוב ביותר", רק שההשוואה היא
   `pack_size(enemies, e) > pack_size(enemies, best)`. אם קיבלת אפס בכל מקום —
   שכחת את ה-`return` בסוף `pack_size`, וכל ההשוואות משוות `None` ל-`None`.

---

### L3 — Within Reach · 30 XP, 8 🪙

**Why this mechanic:** the same `math.sqrt`, moved into the **build** phase. A
tower more than about 2.6 cells from the path never fires once — it stands there
looking exactly like a tower that works. Eight candidate squares are offered;
three of them are traps; the budget covers five. She cannot eyeball it, and she
cannot afford to build them all.

**brief:** יש לך שמונה משבצות מסומנות ו-250 זהב — כלומר חמישה מגדלים בדיוק.

קשת מגיעה עד 2.6 משבצות. מגדל שרחוק יותר מזה מהשביל לא יורה אפילו פעם אחת, והוא
נראה בדיוק כמו מגדל שכן.

הרשימה `ROAD` מסמנת נקודות לאורך הדרך. כתבי פונקציה `in_reach(spot)` שמחזירה
`True` אם המשבצת נמצאת במרחק 2.4 או פחות מאחת מהן, ובני רק על אלה שעברו.

```js
map: { cols: 20, rows: 8, path: [[0,4],[1,4], … ,[19,4]] },
gold: 250, campHp: 3, seed: 26, allowed: ["archer"],
waves: [
  { delay: 0,  enemies: [{ kind: "satyr",     count: 9, gap: 0.45 }] },
  { delay: 6,  enemies: [{ kind: "harpy",     count: 7, gap: 0.5  }] },
  { delay: 14, enemies: [{ kind: "hellhound", count: 4, gap: 0.8  }] },
],
```

**starter:**
```python
import math

CANDIDATES = [[2,3],[2,0],[6,5],[9,0],[9,3],[13,5],[16,7],[16,3]]
ROAD = [[0,4],[4,4],[8,4],[12,4],[16,4],[19,4]]

def in_reach(spot):
    # True if this square is 2.4 or closer to any point on ROAD
    return True

for spot in CANDIDATES:
    if in_reach(spot):
        place_tower("archer", spot[0], spot[1])
```

**solution:**
```python
import math

CANDIDATES = [[2,3],[2,0],[6,5],[9,0],[9,3],[13,5],[16,7],[16,3]]
ROAD = [[0,4],[4,4],[8,4],[12,4],[16,4],[19,4]]

def in_reach(spot):
    for point in ROAD:
        gap = math.sqrt((spot[0] - point[0]) ** 2 + (spot[1] - point[1]) ** 2)
        if gap <= 2.4:
            return True
    return False

for spot in CANDIDATES:
    if in_reach(spot):
        place_tower("archer", spot[0], spot[1])
```

*(The five that pass are `[2,3]`, `[6,5]`, `[9,3]`, `[13,5]` and `[16,3]`. The
three that fail sit four and three cells off the road.)*

**check:**
```js
{ kind: "battle",
  also: { kind: "source", mustInclude: ["math.sqrt", "def in_reach", "return False"],
    message: { he: "המשימה דורשת פונקציה in_reach שמודדת מרחק עם math.sqrt ומחזירה True או False",
               en: "This needs an in_reach function that measures with math.sqrt and returns True or False" } } }
```

**hints:**
1. הריצי כמו שזה — `in_reach` מחזירה `True` לכולם. מה קורה כשהיא מנסה לבנות
   מגדל שישי, וכמה זהב יש לך בדיוק?
2. `in_reach` צריכה לעבור על כל הנקודות ב-`ROAD` ולחפש **אחת** קרובה מספיק. אם
   מצאה — אפשר להחזיר `True` מיד; אם הלולאה נגמרה ולא מצאה כלום, התשובה היא
   `False`.
3. גוף הפונקציה: `for point in ROAD:` ובתוכו `gap = math.sqrt(...)` ו-
   `if gap <= 2.4: return True`. **אחרי** הלולאה, בשוליים של הפונקציה,
   `return False`. אם ה-`return False` יושב בתוך הלולאה, הפונקציה תיפסל על
   הנקודה הראשונה ותחזיר `False` לכולם. שלוש המשבצות שנפסלות הן `[2,0]`,
   `[9,0]` ו-`[16,7]` — הן רחוקות שלוש עד ארבע משבצות מהכביש.

---

### SIDE BATTLE — The Dice of Fate · 25 XP, 6 🪙 · **optional**

`optional: true`. Never blocks the lesson, never blocks the act.

**Why this mechanic:** `random`, in the only shape that is honest in a graded
game: the dice choose **which** of three good plans she builds, and all three
hold. She gets the surprise without the injustice. She also gets `random.seed`,
which is the tool that turns "it broke once and I cannot reproduce it" into a
solvable problem — and which is, quietly, how every battle in this course is
deterministic in the first place.

**brief:** גרובר מהמר על איזו עמדה עדיפה. את לא מתווכחת — את מגלגלת.

שלוש עמדות הליבה קבועות. את העמדה הרביעית תבחר `random.choice` מתוך `EXTRA`.
קבעי `random.seed` בהתחלה כדי שהקרב ייצא אותו דבר בכל הרצה, ואז שני את המספר
בזרע וראי מה קורה.

שלוש העמדות ב-`EXTRA` טובות. אין כאן גלגול רע — יש כאן גלגול.

```js
optional: true,
map: { cols: 18, rows: 8, path: [[0,4],[1,4], … ,[17,4]] },
gold: 200, campHp: 3, seed: 33, allowed: ["archer"],
waves: [
  { delay: 0,  enemies: [{ kind: "satyr",     count: 8, gap: 0.5 }] },
  { delay: 6,  enemies: [{ kind: "harpy",     count: 6, gap: 0.6 }] },
  { delay: 13, enemies: [{ kind: "hellhound", count: 3, gap: 0.9 }] },
],
```

**starter:**
```python
import random

random.seed(15)

CORE = [[3,3],[7,5],[10,3]]
EXTRA = [[13,3],[14,5],[15,3]]

for spot in CORE:
    place_tower("archer", spot[0], spot[1])

# let the dice pick the fourth position, then build it
```

**solution:**
```python
import random

random.seed(15)

CORE = [[3,3],[7,5],[10,3]]
EXTRA = [[13,3],[14,5],[15,3]]

for spot in CORE:
    place_tower("archer", spot[0], spot[1])

lucky = random.choice(EXTRA)
place_tower("archer", lucky[0], lucky[1])
```

**check:**
```js
{ kind: "battle",
  also: { kind: "source", mustInclude: ["import random", "random.choice", "random.seed"],
    message: { he: "משימת הצד הזאת דורשת random.seed ו-random.choice",
               en: "This side battle needs random.seed and random.choice" } } }
```

*Never compare a generated number in a `check`.* Skulpt's generator is not
CPython's, so a hard-coded "seed 15 gives 2" would be wrong in the browser. What
the check asserts is that the battle was won and that `random` was actually used;
what makes that safe is that every draw wins.

**hints:**
1. שלוש עמדות בנויות והרביעית חסרה. איזו פונקציה במודול `random` מקבלת רשימה
   ומחזירה איבר אחד ממנה?
2. `random.choice(EXTRA)` **מחזירה** משבצת — רשימה של שני מספרים. שמרי אותה
   במשתנה, ואז השתמשי ב-`[0]` וב-`[1]` שלה כמו בכל רשימה אחרת.
3. שתי שורות: `lucky = random.choice(EXTRA)` ואז
   `place_tower("archer", lucky[0], lucky[1])`. עכשיו החלק המעניין: שני את
   המספר בתוך `random.seed(...)` והריצי שוב. אותו זרע נותן תמיד את אותו גלגול,
   וזרע אחר נותן גלגול אחר — וזה בדיוק למה `seed` קיים. בלעדיו לא היית יכולה
   לשחזר באג שקרה לך פעם אחת.

---

## The great battle — "The Sphinx at the Crossroads" · 60 XP, 15 🪙

**Why this mechanic:** the two halves of the lesson in one function, and a wave
that needs both. Harpies fly, so the three cannons cannot touch them and the four
archers are the whole air defense. The ground waves arrive in tight columns, so
the cannons are worth triple if she aims them at the middle of a pack and worth
one third if she lets the game aim at the front.

Verified: **no strategy from the degenerate bank wins this battle** — not the
default, not `return 0`, not "shoot the weakest", not "shoot the nearest to
camp". Eighty-two monsters, four waves, and one function standing between them
and the camp.

**brief:** ספינקס יושבת על ההצטלבות ושולחת ארבעה גלים.

הבנייה כבר כתובה: שלושה תותחים ועוד ארבע קשתות, 470 מתוך 480 זהב. מה שחסר הוא
`choose_target` — ויש לה שתי עבודות, בסדר הזה:

1. **מעופפת קודם.** תותח לא יכול לפגוע בהרפיה. הקשתות הן ההגנה האווירית היחידה.
2. **אחרת — לב העדר.** מי שיש סביבה הכי הרבה שכנים במרחק 1.1, כדי שהפגז יתפוס
   שלוש ולא אחת.

```js
map: { cols: 22, rows: 11,
       path: [[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],
              [7,3],[7,4],[7,5],[7,6],[7,7],[7,8],
              [8,8],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],
              [14,7],[14,6],[14,5],[14,4],[14,3],
              [15,3],[16,3],[17,3],[18,3],[19,3],[20,3],[21,3]] },
gold: 480, campHp: 4, seed: 51, allowed: ["archer", "cannon"],
waves: [
  { delay: 0,  enemies: [{ kind: "satyr",     count: 18, gap: 0.4 }] },
  { delay: 6,  enemies: [{ kind: "harpy",     count: 14, gap: 0.5 }] },
  { delay: 14, enemies: [{ kind: "hellhound", count: 12, gap: 0.5 }] },
  { delay: 24, enemies: [{ kind: "cyclops",   count:  7, gap: 0.7 },
                         { kind: "harpy",     count:  8, gap: 0.5 }] },
],
```

**starter:**
```python
import math

CANNONS = [[5,4],[9,7],[12,6]]
ARCHERS = [[2,1],[8,4],[15,4],[18,2]]

for spot in CANNONS:
    place_tower("cannon", spot[0], spot[1])
for spot in ARCHERS:
    place_tower("archer", spot[0], spot[1])

# 1. pack_size(enemies, target) -> how many neighbours within 1.1

# 2. choose_target(enemies) -> flyers first, then the heart of the pack
```

**solution:**
```python
import math

CANNONS = [[5,4],[9,7],[12,6]]
ARCHERS = [[2,1],[8,4],[15,4],[18,2]]

for spot in CANNONS:
    place_tower("cannon", spot[0], spot[1])
for spot in ARCHERS:
    place_tower("archer", spot[0], spot[1])

def pack_size(enemies, target):
    count = 0
    for e in enemies:
        gap = math.sqrt((e["x"] - target["x"]) ** 2 + (e["y"] - target["y"]) ** 2)
        if gap <= 1.1:
            count = count + 1
    return count

def choose_target(enemies):
    for e in enemies:
        if e["flying"]:
            return e
    best = enemies[0]
    for e in enemies:
        if pack_size(enemies, e) > pack_size(enemies, best):
            best = e
    return best
```

**check:**
```js
{ kind: "battle",
  also: { kind: "source",
    mustInclude: ["math.sqrt", "flying", "def choose_target"],
    message: { he: "הקרב הגדול דורש בדיקת flying ומדידת מרחק עם math.sqrt",
               en: "The great battle needs a flying check and a real distance with math.sqrt" } } }
```

**hints:**
1. בני קודם רק את החלק של המעופפות והריצי. אחר כך רק את החלק של העדר. איזה
   מהשניים לבדו מחזיק יותר גלים? זה אומר לך במה הבעיה הגדולה יותר.
2. שני חלקים בפונקציה אחת, והסדר קובע: הלולאה שמחפשת `e["flying"]` יושבת ראשונה
   ומחזירה מיד, כי `return` מסיים את הפונקציה. רק מי שהגיע מעבר לה מגיע לחישוב
   העדר.
3. `pack_size` היא בדיוק אותה פונקציה מ-L2 — אפשר להעתיק אותה כמו שהיא, וזה
   בדיוק מה שפונקציות נועדו בשבילו. ב-`choose_target`: קודם
   `for e in enemies:` עם `if e["flying"]: return e`. אחר כך `best = enemies[0]`,
   לולאה שנייה עם `if pack_size(enemies, e) > pack_size(enemies, best):`, ובסוף
   `return best`. אם הגל האחרון הוא זה שמפיל אותך — שם מגיעים שבעה קיקלופים
   ושמונה הרפיות יחד, וזה בדיוק המקום שבו שני החלקים צריכים לעבוד באותו זמן.

## Reward & Recap

**Item**: 🎲 **קוביות הגורל / The Dice of Fate** — "שתי קוביות עצם. אף אחת מהן
לא מבטיחה לך כלום, ובדיוק בגלל זה שווה לגלגל." (Bead #15.)

**Achievements possible here**:
- *First Import* — ייבאה מודול בפעם הראשונה
- *Artillery Officer* — ניצחה את L2, כלומר מצאה את לב העדר עם `math.sqrt`
- *Surveyor* — ניצחה את L3 בלי לבנות אף מגדל שלא ירה
- *Play It Again* — שינתה את הזרע בקרב הצד והריצה חמש פעמים אחרי שכבר ניצחה.
  **זה ההישג הכי חשוב בשיעור** — הוא מודד סקרנות, לא ביצועים
- *No Hints Needed*, *Persistent*

**Recap bullets**:
- `import` מביא מודול — קוד שמישהו אחר כבר כתב ובדק
- הנקודה אומרת "שייך ל־": `random.randint`, `math.sqrt`
- `random.randint(1, 6)` כוללת את שני הקצוות; `range(1, 6)` עוצרת לפני 6
- `random.choice` בוחרת איבר מרשימה
- `random.seed` מקבע את סדרת האקראיים — שימושי כשמחפשים באג
- `math.ceil` מעגל תמיד למעלה, `math.floor` תמיד למטה
- `math.sqrt` בין שני זוגות `x`,`y` הוא מרחק אמיתי — וזה מה שמוצא את לב העדר
- פגז תותח מתפוצץ ברדיוס 1.1: לכוון לאמצע שווה פי שלושה מלכוון לראש
- מגדל רחוק מדי מהשביל נראה בדיוק כמו מגדל שעובד, ולא יורה אפילו פעם אחת
- אף בדיקה בקורס לא משווה מספר אקראי — הרצה אחת לא מוכיחה כלום

**Next teaser**: *"את מוכנה. מחר נכנסים למבוך — ומגלים שיש בו חדרים שבתוכם יש
חדרים שבתוכם יש חדרים. ושהברק קופץ."*

## Common mistakes to anticipate

| She does | She sees | Hint / explainer must cover |
| --- | --- | --- |
| שוכחת `import` | `NameError: name 'random' is not defined` | בלוק השגיאה בשיעור; שורה אחת בראש הקובץ |
| `randint(1, 6)` בלי `random.` | `NameError: name 'randint' is not defined` | הנקודה היא חלק מהשם |
| `import Random` | `ImportError` / `File not found` | שמות מודולים באותיות קטנות |
| `random.randint(1, 6)` ומצפה ל-0 | לא רואה 0 לעולם | `randint` כוללת קצוות, ומתחילה איפה שאמרת |
| `random.choice("sword")` על מחרוזת | מקבלת אות בודדת | `choice` עובדת על רשימה; מחרוזת היא רצף תווים |
| שוכחת `return` בסוף `pack_size` | כל ההשוואות משוות `None` ל-`None`, האסטרטגיה זורקת שגיאה והקרב נגמר מיד | הקישור לשיעור 14 מפורש |
| מודדת מרחק בין `x` של אחת ל-`y` של השנייה | תוצאה מספרית סבירה, אסטרטגיה שגויה, בלי שום שגיאה | לכתוב את הנוסחה לאט: הפרש ה-x בריבוע ועוד הפרש ה-y בריבוע |
| שמה `return False` בתוך הלולאה ב-`in_reach` | כל המשבצות נפסלות, אין מגדלים בכלל | ה-`False` הוא מה שקורה כשהלולאה **נגמרה** |
| בונה את כל שמונה המשבצות ב-L3 | `tooPoor` על השישי, והקרב נפסל | תקציב הוא חלק מהחידה |
| מכוונת תותח להרפיה | התותח לא יורה בה בכלל, והמנוע אומר את זה | ארטילריה לא פוגעת במשהו שעף |
| `math.sqrt` על מספר שלילי | `ValueError: math domain error` | לא בתרגילים, אבל יופיע אם תשחק |
| מריצה פעם אחת ומסיקה שהקוד תקין | תרגיל שעובר ואז נכשל | "הרצה אחת לא מוכיחה כלום" — להגיד את זה במפורש |
| `while True:` בלי `break` | `TimeLimitError` אחרי 5 שניות | המנוע עוצר בבטחה; זו לא קריסה |

## Implementation notes

- **Every level was simulated headless** against `assets/js/battle/sim.js`, and
  the strategy levels were run against the same eleven-strategy degenerate bank as
  lesson 14.

  | Level | Solution | Empty | Default targeting | Other strategies that also win |
  | --- | --- | --- | --- | --- |
  | L1 | wins 3/3, 5 archers, 250 gold, 29s | loses | n/a (build only) | — `floor` leaks 2, six towers break the 250 cap, four towers leak 2 |
  | L2 | wins 3/3, 3 cannons, 11s | loses | **loses** | **none — this is the only strategy of twelve that wins** |
  | L3 | wins 3/3, 5 archers, 28s | loses | n/a (build only) | — all eight candidates → `tooPoor`; the first five in list order → 2 leak |
  | side | wins on seeds 1, 2, 3, 5, 7, 11, 15, 42, 99 **and** on all three outcomes forced by hand | loses | n/a | core three towers alone → 1 leaks |
  | great | wins 4/4, 7 towers, 57s | loses | **loses** | **none** |
- **`math.sqrt`, `math.ceil`, `math.floor` and `random.choice` were all confirmed
  to work inside a `choose_target` that the engine calls synchronously from JS.**
  This was the single largest risk in the lesson and it is settled: `import math`
  at module level, used inside the strategy function, behaves normally.
- **`sorted()` on a list of dicts raises** in Skulpt
  (`'<' not supported between instances of 'dict' and 'dict'`) and `key=` needs a
  `lambda`, which the course excludes. Every "pick the best one" here is written
  as the keep-the-best loop instead. Do not let a future draft slip a `sorted`
  into a strategy function.
- **Skulpt**: `import random`, `import math` — שניהם ב-matrix המאומת
  (`01-architecture.md`). `read` resolves them from `Sk.builtinFiles`, so
  `skulpt-stdlib.js` **must** be loaded on the lesson shell — this is the first
  lesson that breaks without it. Add a smoke test that lesson 15's page fails
  loudly (not silently) if the stdlib file is missing.
- **`random.seed` determinism is per-implementation.** Skulpt's generator is not
  CPython's Mersenne Twister sequence, so `random.seed(7); random.randint(1, 20)`
  will very likely produce a **different number** in the browser than on any
  developer's machine. Rules for this course:
  1. **Never** hard-code a seeded random value in a `check.expect`.
  2. Teach block 10 shows the code without printing expected values.
  3. The side battle asserts only that the battle was won and that `random` was
     used — and every possible draw wins, so no outcome depends on the generator.
  If a future lesson genuinely needs fixed random output, generate the expected
  string **by running it in Skulpt** via `tools/verify-python.mjs` and record in
  a comment that it is Skulpt-specific.
- **Verify before shipping** with `node tools/verify-python.mjs`:
  `random.randint`, `random.choice`, `random.seed`, `math.sqrt`, `math.floor`,
  `math.ceil`, `math.pi`, and that `round(13.038404810405297, 2)` renders exactly
  `13.04` (float formatting is the classic Skulpt/CPython divergence).
  **`random.shuffle` is deliberately not used anywhere in this lesson** — it is
  not on the verified list; if verification shows it works, it may be added to
  the Try It block only, never to a check.
- **No level in this lesson checks printed output.** Everything graded is the
  simulated battle plus a `source` rule, which removes the whole class of
  "trailing newline failed me" problems that the earlier draft had to defend
  against.
- **The side battle is the only place `random` touches a graded outcome, and it
  cannot change one.** All three squares in `EXTRA` were forced by hand and all
  three win; nine seeds were run and all nine win. If that level is ever retuned,
  re-run all three forced outcomes, not one seed.
- **`random.shuffle` is deliberately unused** — it is not on the verified list.
  It may go in the Try It block if verification ever clears it, never in a level.
- **Execution limit**: `pack_size` is O(n) and `choose_target` calls it O(n)
  times, so a tick with twenty monsters in one cannon's range is 400 distance
  calculations. Measured across the great battle (82 monsters, four waves) this
  stays comfortably inside the 5-second `execLimit`, but it is the most expensive
  strategy function in the course before lesson 20. If a future level pushes wave
  sizes much past this, measure before shipping.
- No `input()` in any graded exercise here; the optional interactive extension is
  the only place it appears, and it is explicitly ungraded.
- **Combined checks** use the `source` + `also: { output }` pattern
  (`.claude/rules/lesson-authoring.md`); both halves must pass, and the `source`
  check is the outer one so its `message` is what she reads on failure. All
  `source` requirements in this lesson are keywords or identifiers, never
  comments or string literals, so no check needs `raw: true`.
