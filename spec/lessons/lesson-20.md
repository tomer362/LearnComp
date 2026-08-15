# Lesson 20 — CAPSTONE: Battle for Olympus · הקרב על אולימפוס

> **Act V — The Last Olympian** · Stop 20 of 20 · **BOSS: Kronos**
> Structure follows `spec/lessons/lesson-01.md`, with the Training section
> replaced by a staged build. Schema: `spec/04-lesson-template.md`.

| | |
| --- | --- |
| **id** | `20` |
| **slug** | `battle-for-olympus` |
| **minutes** | 60–90 — **explicitly designed to be done across two or three sittings** |
| **concepts** | nothing new — integration of variables, `if`, `while`, `for`, lists, dicts, functions, `random`, string methods, `try`/`except`, `class` |
| **new vocabulary** | — (the only unfamiliar line is `random.seed`, taught in-lesson) |
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

She builds a text battle game in six milestones. Each milestone is graded on its
own, and **each one leaves her with a program that runs**. Milestone 1 is a
twenty-line program that prints two health bars. Milestone 6 is a game with a
boss, choices, a weapon table, input validation and a victory scroll. There is no
point in the middle where she has a broken half-thing on the screen.

The last section of the lesson is not a lesson. It is a handover: what Skulpt
gave her, what it did not, and exactly how to install the real thing.

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

3. **code (runnable)** — the smallest possible version of today's game, so that
   "start small" is a thing she has seen and not advice she has read.
   ```python
   hero_hp = 20
   kronos_hp = 14
   print("Percy", hero_hp, "vs Kronos", kronos_hp)
   ```
   Output: `Percy 20 vs Kronos 14`
   Caption: זו כבר תוכנית. היא רצה, היא נכונה, והיא לא עושה כמעט כלום — וזה
   בדיוק מה שגרסה ראשונה אמורה להיות.

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
     # 15 lines -> run -> works -> keep
     # +8 lines -> run -> works -> keep
     # +10 lines -> run -> breaks -> only 10 lines are suspects
     ```
     label: פרוסות — כשזה נשבר, החשוד הוא מה שהוספת עכשיו
   Prose under it: לכל אבן דרך בשיעור הזה יש בדיקה משלה מסיבה אחת: לכפות עלייך
   להריץ לפני שאת ממשיכה. זו לא בירוקרטיה, זו הרשת.

5. **callout · tip** — הכלי של היום הוא לא פקודה, הוא ארבעת הצעדים משיעור 18:
   מה הסוג · איזו שורה · מה ההשערה · איך אני בודקת. תוציאי אותם עכשיו ותשאירי
   אותם פתוחים ליד המסך. בשיעור הזה את תשתמשי בהם כמה פעמים, וזה סימן שהכל
   בסדר.

6. **prose** — The map. Six milestones, and where each piece came from, so she
   can see the whole course inside one program:
   ```
   1  הזירה        class + __init__ + self + method      (19) + .center (17)
   2  המכה         random.randint + method שמשנה מצב      (15, 19)
   3  הדו-קרב      while + and + if/else + מונה           (5, 6, 7)
   4  הארסנל       dict + .get + רשימות + פונקציות        (9, 10, 11, 13, 14)
   5  קרונוס       input + try/except + elif + %          (3, 4, 6, 18)
   6  מגילת הניצחון  f-string formatting + .title + if/elif (11, 14, 17)
   ```

7. **code (runnable)** — `random.seed`, the one unfamiliar line, taught in
   thirty seconds because milestones 2–5 need it.
   ```python
   import random

   random.seed(7)
   print(random.randint(1, 6), random.randint(1, 6), random.randint(1, 6))

   random.seed(7)
   print(random.randint(1, 6), random.randint(1, 6), random.randint(1, 6))
   ```
   Output:
   ```
   1 5 3
   1 5 3
   ```
   Caption: `random.seed(7)` קובע את נקודת ההתחלה של הגרלה. אותו מספר התחלה —
   אותה סדרה, בכל הרצה. זה נשמע כמו לבטל את האקראיות, וזה בעצם כלי עבודה: ככה
   בודקים תוכנית שמגרילה. גם מתכנתות אמיתיות עושות את זה כדי שבדיקה תיתן אותה
   תשובה פעמיים. **המורות של היום הן הגורלות, והן קושרות את החוט מראש.**

8. **callout · warn** — הלולאה הראשית של המשחק חייבת דרך לצאת. אם `while
   hero.is_alive() and kronos.is_alive()` רצה בלי שאף אחד מפסיד HP — היא לא
   תיעצר לבד. המנוע פה יעצור אותה אחרי חמש שניות ויגיד לך את זה בעברית, אבל
   על פייתון אמיתי במחשב שלך אין מי שיעצור. תבדקי אחרי כל אבן דרך שהמספרים
   באמת יורדים.

9. **callout · myth** — קרונוס בלע את ילדיו כי נבואה אמרה שאחד מהם יפיל אותו.
   הוא בלע כל אחד מהם ברגע שנולד, בזה אחר זה, בשיטתיות — ובכל זאת אחד חמק,
   גדל, וחזר. אין דרך לבלוע נבואה. אפשר רק להיות זה שקורא אותה נכון.

## Try It (ungraded)

Free-play editor, pre-filled with the version-zero arena. Nothing checked.

```python
hero_hp = 20
kronos_hp = 14

print("Percy", hero_hp, "vs Kronos", kronos_hp)
print("#" * hero_hp)
print("#" * kronos_hp)
```

Intro: *"זו גרסה 0 של המשחק שלך. הריצי אותה. שני מספרים, שני שמות, נסי `"="`
במקום `"#"`. אחרי שתרגישי שהיא שלך — נעבור לאבן הדרך הראשונה, ושם מתחילים
לבנות ברצינות."*

---

# The Build — six milestones

Each milestone is a graded exercise with its own XP, drachmas and three hints,
exactly like a training exercise. Each drains one point from Kronos' health bar.
**Each one starts from the code she finished the previous milestone with** — the
editor for milestone N is pre-filled with the reference solution of milestone
N−1, so a learner who steps away for a week can rejoin without being punished for
it.

Constant across all six: the hero is `Percy` with 20 HP, Kronos has 14 HP, and
the seed is 7.

---

## M1 — The Arena · הזירה · 60 XP, 15 🪙

**What she builds:** the `Fighter` mold and a screen that shows two health bars.

Brief: write a `Fighter` class with `name`, `hp`, `max_hp` and `damage`. Give it
`is_alive()` and `status()`, where `status()` draws a bar made of `#` for the HP
it still has and `.` for the HP it has lost. Cast two fighters and print the
arena.

Starter:
```python
# class Fighter:
#   __init__(self, name, hp, damage)   -> also store max_hp = hp
#   is_alive(self)                     -> True while hp is above 0
#   status(self)                       -> "<name> [####....] <hp>/<max_hp>"
#
# then:
#   hero   = Fighter("Percy", 20, 8)
#   kronos = Fighter("Kronos", 14, 3)
#   print a banner: BATTLE FOR OLYMPUS, centred in 44, padded with "*"
#   print both statuses
```

Solution:
```python
class Fighter:
    def __init__(self, name, hp, damage):
        self.name = name
        self.hp = hp
        self.max_hp = hp
        self.damage = damage

    def is_alive(self):
        return self.hp > 0

    def status(self):
        bar = "#" * self.hp + "." * (self.max_hp - self.hp)
        return f"{self.name} [{bar}] {self.hp}/{self.max_hp}"


hero = Fighter("Percy", 20, 8)
kronos = Fighter("Kronos", 14, 3)

print(" BATTLE FOR OLYMPUS ".center(44, "*"))
print(hero.status())
print(kronos.status())
```

Required output:
```
************ BATTLE FOR OLYMPUS ************
Percy [####################] 20/20
Kronos [##############] 14/14
```

- **check**: `{ kind: "output", mode: "normalized", expect: "************ BATTLE FOR OLYMPUS ************\nPercy [####################] 20/20\nKronos [##############] 14/14" }`
  plus `{ kind: "source", mustInclude: ["class Fighter", "self.max_hp"], message: { he: "הזירה נבנית מ-class, ו-max_hp נשמר כדי שהפס יידע כמה חסר", en: "The arena is built from a class, and max_hp is stored so the bar knows what is missing" } }`
- `max_hp` looks redundant at full health and is the reason the bar can shrink
  later. Say that in the brief — she should understand why it exists before
  milestone 2 makes it matter.
- hints:
  1. את התבנית הזאת כבר יצקת בשיעור 19. מה **חדש** פה לעומת `Fighter` של
     הדו-קרב, ולמה צריך את זה כדי לצייר פס?
  2. `max_hp` נשמר ב-`__init__` מאותו ערך כמו `hp`. את הפס בונים מכפל מחרוזות:
     `"#" * self.hp`, ואת החלק החסר מ-`"." * (self.max_hp - self.hp)`.
     את הבאנר עושים עם `.center(44, "*")` משיעור 17.
  3. ב-`__init__`: `self.hp = hp` ומיד אחריו `self.max_hp = hp` — שניהם מקבלים
     את אותו מספר, אבל `hp` ישתנה ו-`max_hp` לא. ב-`status`:
     `bar = "#" * self.hp + "." * (self.max_hp - self.hp)` ואז
     `return f"{self.name} [{bar}] {self.hp}/{self.max_hp}"`. הבאנר הוא
     `print(" BATTLE FOR OLYMPUS ".center(44, "*"))` — עם רווחים בתוך הגרשיים.

---

## M2 — The Blow · המכה · 70 XP, 18 🪙

**What she builds:** an `attack` method with a dice roll, and the moment the bar
first moves.

Brief: add `attack(self, other)` to `Fighter`. It rolls `random.randint(1,
self.damage)`, takes that off `other.hp` (never below 0) and returns the log
line. Import `random` and call `random.seed(7)` at the top so the Fates keep the
thread fixed. Then have the hero strike once and print Kronos' status.

Starter: her M1 solution, plus
```python
# at the very top:      import random   /   random.seed(7)
# inside Fighter:       attack(self, other)
#                         roll = random.randint(1, self.damage)
#                         other.hp goes down by roll, never below 0
#                         return "<name> strikes <other name> for <roll>"
# at the bottom:        print(hero.attack(kronos))
#                       print(kronos.status())
```

Solution (the parts that are new):
```python
import random

random.seed(7)

# ... class Fighter as in M1, with one more method ...

    def attack(self, other):
        roll = random.randint(1, self.damage)
        other.hp = other.hp - roll
        if other.hp < 0:
            other.hp = 0
        return f"{self.name} strikes {other.name} for {roll}"


hero = Fighter("Percy", 20, 8)
kronos = Fighter("Kronos", 14, 3)

print(hero.attack(kronos))
print(kronos.status())
```

Required output:
```
Percy strikes Kronos for 1
Kronos [#############.] 13/14
```

- **check**: `{ kind: "output", mode: "normalized", expect: "Percy strikes Kronos for 1\nKronos [#############.] 13/14" }`
  plus `{ kind: "source", mustInclude: ["random.seed(7)", "random.randint", "def attack"], message: { he: "המכה מוגרלת עם random.randint, והזרע 7 הוא מה שמאפשר לבדוק אותה", en: "The blow is rolled with random.randint, and seed 7 is what makes it checkable" } }`
- **A roll of 1 is not a coincidence** — with seed 7, the first `randint(1, 8)`
  in this Skulpt build is `1`. Warn her in the brief that the first blow is a
  weak one so she does not think her code is broken. This is also the first time
  in the course that a check depends on the runtime's random sequence; see the
  implementation notes.
- Note in the brief that `other.hp` is Kronos' HP — `self` swings, `other`
  bleeds. That mistake costs an hour if she makes it in milestone 3.
- hints:
  1. `attack` מקבלת שני אובייקטים: התוקף והמותקף. את ה-HP של מי היא מורידה,
     ואת ה-`damage` של מי היא קוראת?
  2. `random.randint(1, self.damage)` נותן הגרלה בין 1 לנזק המקסימלי. אחריה
     מורידים מ-`other.hp`, בודקים רצפה על אפס, ומחזירים f-string. את
     `import random` ו-`random.seed(7)` שמים בראש הקובץ, לפני ה-class.
  3. ה-method: `roll = random.randint(1, self.damage)`, אחר כך
     `other.hp = other.hp - roll`, אחר כך `if other.hp < 0:` ובתוכו
     `other.hp = 0`, ובסוף
     `return f"{self.name} strikes {other.name} for {roll}"`. הפעולה
     **משנה** את היריב ו**מחזירה** שורת טקסט — היא עושה את שני הדברים, וזה
     בסדר גמור.

---

## M3 — The Duel · הדו-קרב · 90 XP, 22 🪙

**What she builds:** the first thing that feels like a game — a full automatic
battle, turn by turn, with a winner.

Brief: replace the single blow with a loop. While both are alive: print the turn
header, the hero attacks, and **if Kronos is still standing** he attacks back.
Then print both bars and announce the winner.

Solution (new parts):
```python
print(" BATTLE FOR OLYMPUS ".center(44, "*"))

turn = 1
while hero.is_alive() and kronos.is_alive():
    print(f"-- turn {turn} --")
    print(hero.attack(kronos))
    if kronos.is_alive():
        print(kronos.attack(hero))
    turn = turn + 1

print(hero.status())
print(kronos.status())
if hero.is_alive():
    print("WINNER: " + hero.name)
else:
    print("WINNER: " + kronos.name)
```

Required output:
```
************ BATTLE FOR OLYMPUS ************
-- turn 1 --
Percy strikes Kronos for 1
Kronos strikes Percy for 3
-- turn 2 --
Percy strikes Kronos for 4
Kronos strikes Percy for 3
-- turn 3 --
Percy strikes Kronos for 8
Kronos strikes Percy for 2
-- turn 4 --
Percy strikes Kronos for 5
Percy [############........] 12/20
Kronos [..............] 0/14
WINNER: Percy
```

- **check**: `{ kind: "output", mode: "normalized", expect: <the 14 lines above> }`
  plus `{ kind: "source", raw: true, mustInclude: ["while ", "is_alive()", "WINNER"], message: { he: "הקרב חייב לרוץ בלולאה שנעצרת לבד — לא ארבעה תורות כתובים ביד", en: "The duel must run in a loop that stops by itself — not four hand-written turns" } }`
- **The guard is the whole exercise.** Turn 4 ends with Kronos at exactly 0, and
  a dead Titan must not swing. Without `if kronos.is_alive():` the output grows
  an extra line and the check fails — which is a far better teacher than a
  paragraph about it would be.
- hints:
  1. מתי הקרב נגמר? נסחי את התנאי במילים לפני שאת כותבת אותו, ואז תרגמי.
     ואחרי שהגיבור תוקף — למה אסור להניח שהיריב עדיין עומד?
  2. `while hero.is_alive() and kronos.is_alive():` היא הלולאה. בפנים: כותרת
     תור, התקפה של הגיבור, ואז `if kronos.is_alive():` לפני ההתקפה שלו. מונה
     `turn` שעולה ב-1 בסוף כל סיבוב.
  3. `turn = 1` לפני הלולאה. בתוכה, בסדר הזה: `print(f"-- turn {turn} --")`,
     `print(hero.attack(kronos))`, ואז ‎`if kronos.is_alive():`‎ ובתוכו
     `print(kronos.attack(hero))`, ובסוף `turn = turn + 1`. אחרי הלולאה: שני
     הפסים, ואז `if hero.is_alive():` שמחליט מי המנצח. בלי הבדיקה באמצע,
     קרונוס יכה מהרצפה ותקבלי שורה מיותרת.

---

## M4 — The Arsenal · הארסנל · 90 XP, 22 🪙

**What she builds:** the data layer. A weapons table, a monster roster, and a
`duel()` function she can call three times instead of writing three loops.

Brief:
1. `WEAPONS` — a dict from weapon name to damage.
2. `weapon_damage(name)` — a function returning the damage for a name, tolerant
   of stray spaces and capitals, and returning `3` for a weapon nobody has heard
   of. `.get()` with a default, from lesson 11.
3. `MONSTERS` — a list of `[name, hp, damage]` rows.
4. `duel(fighter, monster)` — the M3 loop, moved into a function, returning how
   many turns it took. It prints nothing.
5. A gauntlet loop: build a `Fighter` from each row, duel it, report.

Solution (new parts):
```python
WEAPONS = {"riptide": 8, "bow": 5, "hammer": 11}
MONSTERS = [["Fury", 9, 3], ["Empousa", 12, 4], ["Telkhine", 7, 2]]


def weapon_damage(name):
    return WEAPONS.get(name.strip().lower(), 3)


def duel(fighter, monster):
    turns = 0
    while fighter.is_alive() and monster.is_alive():
        fighter.attack(monster)
        if monster.is_alive():
            monster.attack(fighter)
        turns = turns + 1
    return turns


hero = Fighter("Percy", 40, weapon_damage("  Riptide "))
print("WEAPON DAMAGE: " + str(hero.damage))
print(" THE GAUNTLET ".center(40, "="))

for row in MONSTERS:
    monster = Fighter(row[0], row[1], row[2])
    turns = duel(hero, monster)
    if hero.is_alive():
        print(f"{monster.name} down in {turns} turns")
    else:
        print(f"{hero.name} falls to {monster.name}")
        break

print(hero.status())
```

Required output:
```
WEAPON DAMAGE: 8
============= THE GAUNTLET =============
Fury down in 3 turns
Empousa down in 4 turns
Telkhine down in 2 turns
Percy [#########################...............] 25/40
```

- **check**: `{ kind: "output", mode: "normalized", expect: "WEAPON DAMAGE: 8\n============= THE GAUNTLET =============\nFury down in 3 turns\nEmpousa down in 4 turns\nTelkhine down in 2 turns\nPercy [#########################...............] 25/40" }`
  plus `{ kind: "source", mustInclude: ["WEAPONS", ".get(", "def duel", "def weapon_damage"], message: { he: "הנשקים באים ממילון עם ‎.get‎, והקרב עובר לפונקציה — כדי שאפשר יהיה לקרוא לו שלוש פעמים", en: "Weapons come from a dict with .get, and the duel moves into a function so it can be called three times" } }`
- `weapon_damage("  Riptide ")` is passed deliberately messy — this is lesson
  17's `.strip().lower()` earning its keep in a place she did not expect it. It
  must return `8`, not the default.
- The hero keeps his damage between fights and **does not heal**, which is why
  the last line matters. The three fights are a sequence, not three separate
  programs.
- hints:
  1. שלושת הקרבות זהים חוץ מהיריב. מה עושים בפייתון כשכותבים את אותו דבר שלוש
     פעמים? ואיפה `.get` עדיף על `WEAPONS[name]`?
  2. `duel(fighter, monster)` היא לולאת M3 בדיוק, בתוך `def`, עם מונה שמוחזר
     ב-`return` ובלי הדפסות. `weapon_damage` היא שורה אחת:
     `WEAPONS.get(name.strip().lower(), 3)` — הארגומנט השני של `.get` הוא ערך
     ברירת המחדל.
  3. `duel` מקבלת שני אובייקטים, מסובבת את הלולאה בדיוק כמו ב-M3 (כולל
     ‎`if monster.is_alive():`‎), סופרת ב-`turns` ומחזירה אותו. בגאונטלט:
     `for row in MONSTERS:` ובתוכו `monster = Fighter(row[0], row[1], row[2])`,
     `turns = duel(hero, monster)`, ואז `if hero.is_alive():` להדפסת התוצאה.
     ה-`break` בענף השני עוצר את הגאונטלט אם הגיבור נופל.

---

## M5 — BOSS: Kronos · קרונוס · 110 XP, 28 🪙

**What she builds:** a game with a player in it. Choices, real input, input that
survives a person typing nonsense, and a boss with an ability of his own.

Brief:
1. `ask_choice()` — asks `1 attack  2 nectar  3 look > ` in a loop until it gets
   1, 2 or 3. Non-numbers print `Kronos does not understand that.` and ask again;
   out-of-range numbers print `Choose 1, 2 or 3.` and ask again. Returns the
   number.
2. `heal(self, amount)` on `Fighter` — raises `hp`, capped at `max_hp`, returns
   `"<name> recovers <amount>"`.
3. The turn: choice 1 attacks, choice 2 drinks nectar (heals 6, two flasks
   only), choice 3 looks at Kronos' bar and costs the turn.
4. Kronos' ability: **every third turn he rewinds time and heals 4 instead of
   attacking.** `turn % 3 == 0` — lesson 4's modulo, finally being used for
   something.

Fighters for this milestone: `Percy` 20 HP / 8 damage, `Kronos` 14 HP / 3 damage,
seed 7, two nectars.

Solution:
```python
import random

random.seed(7)


class Fighter:
    def __init__(self, name, hp, damage):
        self.name = name
        self.hp = hp
        self.max_hp = hp
        self.damage = damage

    def is_alive(self):
        return self.hp > 0

    def status(self):
        bar = "#" * self.hp + "." * (self.max_hp - self.hp)
        return f"{self.name} [{bar}] {self.hp}/{self.max_hp}"

    def attack(self, other):
        roll = random.randint(1, self.damage)
        other.hp = other.hp - roll
        if other.hp < 0:
            other.hp = 0
        return f"{self.name} strikes {other.name} for {roll}"

    def heal(self, amount):
        self.hp = self.hp + amount
        if self.hp > self.max_hp:
            self.hp = self.max_hp
        return f"{self.name} recovers {amount}"


def ask_choice():
    while True:
        raw = input("1 attack  2 nectar  3 look > ")
        try:
            choice = int(raw.strip())
        except ValueError:
            print("Kronos does not understand that.")
            continue
        if choice in [1, 2, 3]:
            return choice
        print("Choose 1, 2 or 3.")


hero = Fighter("Percy", 20, 8)
kronos = Fighter("Kronos", 14, 3)
nectar = 2
turn = 1

print(" BATTLE FOR OLYMPUS ".center(44, "*"))
while hero.is_alive() and kronos.is_alive():
    print(f"-- turn {turn} --")
    choice = ask_choice()
    if choice == 1:
        print(hero.attack(kronos))
    elif choice == 2:
        if nectar > 0:
            nectar = nectar - 1
            print(hero.heal(6))
        else:
            print("No nectar left.")
    else:
        print(kronos.status())

    if kronos.is_alive():
        if turn % 3 == 0:
            print(kronos.heal(4) + " -- time rewinds")
        else:
            print(kronos.attack(hero))
    turn = turn + 1

if hero.is_alive():
    print("WINNER: " + hero.name)
else:
    print("WINNER: " + kronos.name)
```

- **check**:
  ```js
  { kind: "cases", cases: [
    { stdin: ["x", "1", "1", "1", "1"],
      expect: "************ BATTLE FOR OLYMPUS ************\n" +
              "-- turn 1 --\nKronos does not understand that.\n" +
              "Percy strikes Kronos for 1\nKronos strikes Percy for 3\n" +
              "-- turn 2 --\nPercy strikes Kronos for 4\nKronos strikes Percy for 3\n" +
              "-- turn 3 --\nPercy strikes Kronos for 8\nKronos recovers 4 -- time rewinds\n" +
              "-- turn 4 --\nPercy strikes Kronos for 5\nWINNER: Percy" },
    { stdin: ["9", "1", "1", "1", "1"],
      expect: "************ BATTLE FOR OLYMPUS ************\n" +
              "-- turn 1 --\nChoose 1, 2 or 3.\n" +
              "Percy strikes Kronos for 1\nKronos strikes Percy for 3\n" +
              "-- turn 2 --\nPercy strikes Kronos for 4\nKronos strikes Percy for 3\n" +
              "-- turn 3 --\nPercy strikes Kronos for 8\nKronos recovers 4 -- time rewinds\n" +
              "-- turn 4 --\nPercy strikes Kronos for 5\nWINNER: Percy" } ] }
  ```
  plus `{ kind: "source", mustInclude: ["input(", "try", "except ValueError", "def ask_choice", "% 3"], message: { he: "קרונוס דורש בחירה של שחקנית, קלט שלא מפיל את המשחק, ויכולת אחת משלו", en: "Kronos needs a player choice, input that cannot crash the game, and one ability of his own" } }`
- Both cases were executed and the expected strings above are the real output,
  character for character. Case 1 exercises the `except ValueError` path, case 2
  the out-of-range path; both then land on the same four attacking turns, so the
  two expectations differ by exactly one line. That is deliberate — the diff a
  learner sees when one case fails is tiny and readable.
- The prompt text is **not** part of the compared output: Skulpt hands the prompt
  to `inputfun` and the UI renders it as an Iris-message rather than writing it
  to stdout. Verified.
- **`continue` versus `return`** is the subtle bit, and it is what hint 3 walks:
  after a `ValueError` the function has to go round again (`continue`), and after
  a valid number it has to leave the loop *and* the function (`return choice`).
  Neither one can be swapped for the other.
- hints:
  1. שלוש בעיות נפרדות מסתתרות ב-`ask_choice`: קלט שהוא לא מספר, מספר מחוץ
     לתחום, ומספר תקין. איזו מהן היא היחידה שיוצאת מהפונקציה?
  2. `ask_choice` היא `while True` עם `input` בפנים, `try`/`except ValueError`
     סביב ה-`int()`, ו-`return choice` כשהמספר בתחום. את היכולת של קרונוס
     בונים עם `turn % 3 == 0` — משיעור 4.
  3. ב-`ask_choice`: אחרי `except ValueError:` מדפיסים הודעה ו-`continue`,
     שמחזיר לתחילת הלולאה. אחריה `if choice in [1, 2, 3]: return choice` —
     ה-`return` יוצא מהלולאה **ומהפונקציה** ביחד. אם המספר לא בתחום, מדפיסים
     `Choose 1, 2 or 3.` והלולאה מסתובבת בעצמה. בתור של קרונוס:
     `if kronos.is_alive():` ובתוכו `if turn % 3 == 0:` לריפוי, `else:`
     להתקפה. ה-`% 3` בודק אם מספר התור מתחלק בשלוש בלי שארית.

---

## M6 — The Victory Scroll · מגילת הניצחון · 110 XP, 28 🪙

**What she builds:** the ending screen. Formatted, readable, and the first thing
in the course whose only job is to look right.

Brief: given the battle log as a dict, print a scroll: a banner, the hero's name
in Title Case, the numbers, the share of total damage she dealt as a percentage
with one decimal, and a title awarded by a function based on how long the fight
took.

Titles: 5 turns or fewer → `LIGHTNING`; 10 or fewer → `OLYMPIAN`; more →
`SURVIVOR`.

Starter:
```python
log = {"hero": "percy jackson", "turns": 7, "damage_dealt": 41, "damage_taken": 23}

# def title_for(turns) -> LIGHTNING / OLYMPIAN / SURVIVOR
# print the scroll:
#   banner: BATTLE FOR OLYMPUS, centred in 44, padded with "*"
#   HERO:     the name in Title Case
#   TURNS:    / DEALT: / TAKEN:
#   CONTROL:  dealt as a percentage of dealt+taken, one digit after the point
#   TITLE:    from title_for
#   a closing line of 44 stars
```

Solution:
```python
log = {"hero": "percy jackson", "turns": 7, "damage_dealt": 41, "damage_taken": 23}


def title_for(turns):
    if turns <= 5:
        return "LIGHTNING"
    elif turns <= 10:
        return "OLYMPIAN"
    else:
        return "SURVIVOR"


total = log["damage_dealt"] + log["damage_taken"]
control = log["damage_dealt"] / total * 100

print(" BATTLE FOR OLYMPUS ".center(44, "*"))
print("HERO: " + log["hero"].title())
print(f"TURNS: {log['turns']}")
print(f"DEALT: {log['damage_dealt']}")
print(f"TAKEN: {log['damage_taken']}")
print(f"CONTROL: {control:.1f}%")
print("TITLE: " + title_for(log["turns"]))
print("*" * 44)
```

Required output:
```
************ BATTLE FOR OLYMPUS ************
HERO: Percy Jackson
TURNS: 7
DEALT: 41
TAKEN: 23
CONTROL: 64.1%
TITLE: OLYMPIAN
********************************************
```

- **check**: `{ kind: "output", mode: "normalized", expect: <the 8 lines above> }`
  plus `{ kind: "source", raw: true, mustInclude: ["def title_for", ".title()", ":.1f", "elif"], message: { he: "התואר בא מפונקציה עם elif, והאחוז מעוצב עם ‎:.1f‎", en: "The title comes from a function with elif, and the percentage is formatted with :.1f" } }`
- 41 / 64 · 100 = 64.0625, which `:.1f` rounds to `64.1`. If she writes
  `round(control, 1)` she gets `64.1` too and the check passes — both are
  correct, and hint 3 says so.
- Inside a double-quoted f-string the dict key needs single quotes:
  `f"TURNS: {log['turns']}"`. This is a real syntax trap and it is worth meeting
  once, here, with a hint attached rather than at midnight in six months.
- hints:
  1. שתי חתיכות: פונקציה שמחזירה תואר לפי מספר תורות, והדפסה מעוצבת. את
     הראשונה כתבת כבר עשר פעמים בגרסאות אחרות — היא רק `if`/`elif`/`else`
     עם `return`.
  2. `.title()` הופך `"percy jackson"` ל-`"Percy Jackson"`. את האחוז מחשבים
     `dealt / (dealt + taken) * 100` ומדפיסים עם `f"{control:.1f}%"`.
     שימי לב לסימן האחוז — הוא טקסט רגיל, אחרי הסוגריים המסולסלים.
  3. `title_for` בנויה `if turns <= 5: return "LIGHTNING"`, `elif turns <= 10:
     return "OLYMPIAN"`, `else: return "SURVIVOR"` — הסדר קובע, כי 3 מקיים גם
     את התנאי השני. בתוך f-string בגרשיים כפולים, מפתח של מילון צריך גרשיים
     בודדים: `f"TURNS: {log['turns']}"`. גם `round(control, 1)` נותן את אותה
     תוצאה ועובר את הבדיקה.

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
מקום ליד השולחן, ואת המשחק שכתבת בחזרה. קיבלת את שניהם."

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
- בנית משחק שלם: `class`, לולאות, תנאים, רשימות, מילון, פונקציות, אקראיות
  ו-`try`/`except`, ביחד, בקובץ אחד
- הדרך לבנות משהו גדול היא פרוסות קטנות שרצות — לא מפץ אחד גדול
- `random.seed` קובע את סדרת ההגרלות, וככה בודקים תוכנית שמגרילה
- `try`/`except` סביב קלט הוא ההבדל בין תוכנית שמישהי אחרת יכולה להריץ לבין
  תוכנית שרק את יכולה
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
`.split()`, `random.randint` — כל אלה קיימים בדיוק ככה בפייתון שרץ על שרתים
בעולם. אף אחד לא הראה לך גרסת ילדים.

### מה Skulpt לא נתן לך

בכנות, כי תגלי את זה בעצמך תוך יום:

| מה שחסר | למה זה משנה |
| --- | --- |
| `open()` — קריאה וכתיבה של קבצים | המשחק שלך לא יכול לשמור שיא לפעם הבאה |
| `import json` | הפורמט שבו כמעט כל תוכנית שומרת נתונים |
| `pip` וכל ספרייה חיצונית | אין `pygame`, אין `requests`, אין `pandas`, אין בוט לדיסקורד |
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
2. **קובץ.** פתחי חלון חדש, הדביקי את המשחק שלך, שמרי בשם `battle.py`. הסיומת
   `.py` היא מה שהופך אותו לתוכנית. לחצי Run.
3. **טרמינל, כשתרצי.** באותה תיקייה: `python battle.py` (במק ובלינוקס לרוב
   `python3 battle.py`). זה אותו דבר בדיוק, רק בלי כפתור.

**הפתעה קטנה שמחכה לך:** המשחק שלך ירוץ שם בלי שינוי — אבל הקרב ייצא אחרת.
`random.seed(7)` נותן סדרת מספרים אחת ב-Skulpt וסדרה אחרת בפייתון של המחשב.
הזרע קובע שהסדרה תהיה **קבועה**, לא שהיא תהיה **זהה בכל מנוע**. זה בדיוק סוג
הדבר שכיף לגלות לבד, וחבל לגלות בפאניקה — אז עכשיו את יודעת.

### מה לבנות מחר

- **הכי קרוב:** תני למשחק שלך לזכור. `open()` + קריאה וכתיבה של קובץ שיאים.
  שלושים שורות, וזה הופך לתוכנית שממשיכה לחיות בין הרצות.
- `turtle` — מגיע עם פייתון, מצייר על המסך, ובלולאה אחת יוצא ממנו משהו יפה.
- `tkinter` — מגיע עם פייתון. חלון, כפתורים, המשחק שלך עם ממשק.
- `pygame` — `pip install pygame`. הקרב על אולימפוס עם גרפיקה ותנועה.
- `requests` — לדבר עם אתרים ולמשוך מהם נתונים אמיתיים.
- **Automate the Boring Stuff with Python** — ספר שלם וחינמי באינטרנט, כתוב
  למי שרוצה שהמחשב יעשה בשבילה דברים משעממים.

### המשפט האחרון

כירון לא נותן נאום. הוא אומר את זה:

> "עשרים שיעורים, ומשחק שאף אחד לא כתב לפנייך.
> מהיום השפה היא שלך, ואת לא צריכה אותי בשבילה.
> המחנה נשאר פתוח. לכי תבני משהו."

## Common mistakes to anticipate

| She does | She sees | Hint must cover |
| --- | --- | --- |
| skips `random.seed(7)` | different numbers, check fails | the seed is what makes the fight checkable |
| forgets `self.max_hp` in M1 | `AttributeError: 'Fighter' object has no attribute 'max_hp'` | store it in `__init__`, from `hp` |
| `self.hp` instead of `other.hp` in `attack` | the attacker damages himself | `self` swings, `other` bleeds |
| no `if kronos.is_alive():` before his swing in M3 | one extra log line, check fails | a fighter at 0 HP does not act |
| `duel()` prints instead of returning | extra output, check fails | the function returns the turn count; the caller prints |
| `WEAPONS[name]` instead of `.get(name, 3)` | `KeyError` on an unknown weapon | `.get` has a default; `[]` does not |
| `continue` and `return` swapped in `ask_choice` | infinite loop, or a bad choice accepted | `continue` retries, `return` leaves |
| `f"{log["turns"]}"` — double quotes inside double quotes | `SyntaxError` | use single quotes for the key inside the f-string |
| pastes all six milestones before running once | several errors at once | one slice, one run — the rule of the lesson |
| `while` with no `break` and no damage | the 5-second limit fires | check that the numbers actually move |

## Implementation notes

- Every solution, every expected output and both `cases` expectations in this
  file were executed against the vendored `assets/js/vendor/skulpt.min.js` and
  are reproduced character for character.
- **The one runtime dependency in the whole course.** Milestones 2–5 pin exact
  numbers produced by Skulpt's `random` with `seed(7)`. CPython's Mersenne
  Twister yields a *different* sequence from the same seed, so these expectations
  are Skulpt-specific by construction.
  - `tools/smoke-test.mjs` must therefore run against the committed vendor file.
  - **If `skulpt.min.js` is ever upgraded, re-run milestones 2–5 and regenerate
    their `expect` strings.** Nothing else in the course is version-sensitive.
  - This is also, deliberately, the fact the graduation section teaches her. The
    course's one piece of hidden runtime coupling is handed to her as a lesson
    instead of being swept up.
- **Milestone chaining.** The editor for milestone N pre-fills with the reference
  solution of N−1, not with her own code. Rationale: her own code may be a valid
  variant that a later milestone's expected output does not match, and a learner
  who returns after two weeks must not be blocked by a diff. Offer a "restore my
  version" affordance where her own last-passing source is kept.
- **XP calibration — checked against the real totals, not estimated.** Lessons
  1–19 award **3570** core XP (side quests add up to 105 more and are optional,
  so they cannot be relied on). The capstone awards 530 across the six milestones
  and **110** on completion:
  - after milestone 6 she is on **4100** — still level 6, Champion of Olympus;
  - the completion award takes her to **4210**, crossing 4200 → **Olympian**.

  The capstone is worth roughly three ordinary lessons, which matches its 60–90
  minutes and six graded deliverables. **If XP anywhere in lessons 1–19 changes,
  retune the completion bonus here — not the milestones.** The crossing has to
  land on the final award of the final lesson and nowhere else, and it must
  happen for a learner who skipped every optional side quest.
- **Session length.** 60–90 minutes is two or three evenings. The lesson page
  must show the six milestones as a visible checklist with the boss bar at the
  top, and must restore scroll position to the first unfinished milestone on
  return. This is the one lesson where "she can stop mid-lesson" is not a nicety.
- **Two checks on one milestone use the `also` field**, the pattern established
  in lesson 1 e1. Every "plus" in this file is an `also`:
  ```js
  { kind: "output", mode: "normalized", expect: "…",
    also: { kind: "source", mustInclude: ["class Fighter", "self.max_hp"],
            message: { he: "…", en: "…" } } }
  ```
- **`raw: true` is required on exactly two of the six `source` checks** — M3 and
  M6:
  - M3 asks for `WINNER`, which exists only inside the string literal
    `"WINNER: "`. On a stripped skeleton the check could never pass.
  - M6 asks for `:.1f`, which lives inside an f-string literal, for the same
    reason.

  M1, M2, M4 and M5 target syntax (`class Fighter`, `self.max_hp`,
  `random.seed(7)`, `def duel`, `.get(`, `except ValueError`, `% 3`) and must
  **not** set `raw`, or a word in a Hebrew comment would satisfy them.
- M5 is the only milestone using `input()`, so it is the only one checked with
  `kind: "cases"`. Its prompt string never appears in stdout — verified against
  Skulpt with `inputfunTakesPrompt: true`.
- The graduation section contains external URLs (`python.org`, `thonny.org`) as
  **text, not links** — the page is offline and a dead-looking link is worse than
  a typed address she can copy. Render them in a copyable code style.
- Nothing in the capstone requires lesson 19's inheritance side quest, per
  `07-curriculum.md`'s rule that side quests never block.
- There is no lesson 21 and the hub must not render a locked stop 21. After the
  capstone, the map's final stop shows the throne and the necklace, and the hub's
  primary action becomes "open the graduation section again".
