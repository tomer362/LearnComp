# Lesson 19 — The Forge of Hephaestus · נפחיית הפייסטוס

> **Act V — The Last Olympian** · Stop 19 of 20
> Structure follows `spec/lessons/lesson-01.md`. Schema: `spec/04-lesson-template.md`.

| | |
| --- | --- |
| **id** | `19` |
| **slug** | `the-forge-of-hephaestus` |
| **minutes** | 30–35 |
| **concepts** | `class`, `__init__`, `self`, attributes, methods, many objects from one class, (side quest) inheritance |
| **new vocabulary** | `class`, `self`, `__init__`, attribute, method, object, (side quest) `super()` |
| **requires** | L2 variables · L6 `if` · L7 `while` · L8 `for` · L9 lists · L11 dicts · L13–14 `def`, parameters, `return`, scope · L17 string methods · L18 reading errors |
| **item** | 🛡️ מגן הפייסטוס / Hephaestus' Shield |
| **XP** | 25 + 30 + 30 + 35 (training) + 55 (quest) + 30 (bonus) = **205** · optional side quest +25 |

## Teaching goal

By the end she can write a `class`, give it an `__init__`, store attributes on
`self`, write methods that read and change those attributes, and make many
independent objects from one class.

**`self` is the whole lesson.** Everything else — `class`, `__init__`, the dot —
is notation she will absorb in ten minutes. `self` is the one idea that reliably
stops people, and it stops them for a reason: it looks like a magic word and it
is not one. It is an ordinary parameter that Python fills in for you, and until
she sees that, every method she writes will be a guess.

The lesson therefore does three things in order:
1. Shows her the pain a class solves, using dicts she already writes.
2. Introduces the class as a **mold**, and objects as the things cast from it.
3. Teaches `self` with compare blocks and a demonstration that `m.roar()` and
   `Monster.roar(m)` are the same call.

Inheritance is real and appears — as the **optional side quest**, never as core.
A learner who skips it loses nothing in lesson 20.

## Story beat

Olympus, level nine hundred and something. Behind an iron door the whole mountain
hums: Hephaestus' forge, where the automatons are made. Not one automaton at a
time — a **mold**, and then as many as the war needs.

Hephaestus is not interested in her prophecy. He has a defence line to build and
not enough hands. He hands her a mold and a ladle of bronze and tells her that a
demigod who can only make one of a thing has not learned to make anything.

The Prophecy panel (3–6 lines, no code):

> הדלת נפתחת והחום יוצא החוצה כמו יד.
> הפייסטוס לא מרים את המבט מהסדן. "את זאת עם הנבואה."
> "אני צריך שלוש מאות אוטומטונים עד הבוקר, וקיבלתי אותך."
> הוא דוחף לעברך תבנית יציקה. "לא בונים שלוש מאות דברים."
> "בונים דבר אחד שיודע לצאת שלוש מאות פעם. שבי."

Cast: Hephaestus (blunt, practical, respects work), Chiron in callouts,
Annabeth in the side quest.

## Chiron Teaches — block by block

1. **prose** — Start where she already is. כבר שלושה שיעורים את מתארת מפלצת
   ככה: מילון עם שם ו-HP, ופונקציות שמקבלות את המילון ועושות עליו דברים. זה
   עובד. עכשיו נראה איפה זה מתחיל להישבר — לא כי כתבת רע, אלא כי המבנה נגמר.

2. **code (runnable)** — the pain, demonstrated, not asserted.
   ```python
   talos = {"name": "Talos", "hp": 40}

   def status(monster):
       return monster["name"] + ": " + str(monster["hp"]) + " HP"

   print(status(talos))
   talos["hpp"] = 35
   print(status(talos))
   print(talos)
   ```
   Output:
   ```
   Talos: 40 HP
   Talos: 40 HP
   {'name': 'Talos', 'hp': 40, 'hpp': 35}
   ```
   Caption: התכוונת לעדכן את ה-HP. כתבת `hpp`. פייתון לא התלונן — הוא הוסיף
   מפתח חדש למילון, והמפלצת נשארה עם 40. אין שגיאה. יש תשובה שגויה.

3. **prose** — Name the two problems out loud, because she should be able to say
   why classes exist and not only how to type them:
   **(א)** המילון מקבל כל מפתח שתכתבי. אין לו מושג אילו שדות אמורים להיות
   למפלצת.
   **(ב)** הנתונים (המילון) והפעולות (הפונקציות) גרים בשני מקומות שונים, וכל
   פונקציה חייבת לקבל את המילון כארגומנט ולקוות שקיבלה את הסוג הנכון.
   `class` פותר את שניהם: הוא קושר את הנתונים ואת הפעולות לחבילה אחת, ומגדיר
   מראש מה יש בפנים.

4. **prose** — The metaphor, and use it consistently for the rest of the lesson.
   **`class` היא תבנית יציקה.** התבנית עצמה היא לא מגן — אי אפשר להילחם איתה.
   היא הצורה. כל פעם שיוצקים ממנה מקבלים **מגן חדש ונפרד**, עם המספר הסידורי
   שלו ועם הפגמים שלו. המגן הוא **object** (אובייקט). התבנית נכתבת פעם אחת.
   היציקות — כמה שצריך.
   (Deliberately *not* "blueprint": lesson 13 already spent that word on
   functions. A mold is also the better image, because what comes out of it is
   physically separate.)

5. **code (runnable)** — the smallest possible class, so the syntax lands before
   the ideas pile up.
   ```python
   class Shield:
       pass

   first = Shield()
   second = Shield()
   print(first)
   print(type(first))
   ```
   Output:
   ```
   <__main__.Shield object>
   <class '__main__.Shield'>
   ```
   Caption: `class` בשורה, שם באות גדולה, נקודתיים, והזחה — בדיוק כמו `def`.
   `Shield()` עם סוגריים **יוצק** מגן חדש. `first` ו-`second` הם שני מגנים
   שונים, גם אם עדיין אין להם כלום.

6. **code (runnable)** — `__init__` and attributes.
   ```python
   class Monster:
       def __init__(self, name, hp):
           self.name = name
           self.hp = hp

   fury = Monster("Alecto", 12)
   empousa = Monster("Empousa", 20)
   print(fury.name, fury.hp)
   print(empousa.name, empousa.hp)
   ```
   Output:
   ```
   Alecto 12
   Empousa 20
   ```
   Caption: `__init__` היא הפונקציה שרצה **אוטומטית** ברגע היציקה. מה שכתוב בה
   קובע מה יש לכל מפלצת. `fury.name` נקרא **attribute** — משתנה ששייך לאובייקט
   מסוים.

7. **callout · tip** — שני הקווים התחתונים בכל צד של `__init__` נראים מוזר, וזה
   מכוון: הם סימן של פייתון ל"שם ששמור למערכת". את לא קוראת ל-`__init__` בעצמך
   אף פעם. את כותבת `Monster("Alecto", 12)`, ופייתון קורא לה בשבילך. יש עוד
   שמות כאלה בפייתון; זה הראשון שאת פוגשת.

8. **compare** — **`self`, part one.** The missing-parameter version.
   - bad:
     ```python
     class Monster:
         def roar():
             return "RAAA"

     m = Monster()
     print(m.roar())
     ```
     label: `TypeError: roar() takes 0 positional arguments but 1 was given`
   - good:
     ```python
     class Monster:
         def roar(self):
             return "RAAA"

     m = Monster()
     print(m.roar())
     ```
     label: `RAAA`
   Prose under it: תקראי את השגיאה שוב. `roar()` מצפה לאפס ארגומנטים, **וקיבלה
   אחד**. מי שלח אותו? את כתבת `m.roar()` בלי כלום בסוגריים.
   התשובה היא הלב של השיעור: כשכותבים `m.roar()`, פייתון מתרגם את זה ל
   `Monster.roar(m)` — הוא **מכניס את האובייקט עצמו כארגומנט הראשון**. תמיד.
   בשקט. לכן לכל method חייב להיות פרמטר ראשון שיקבל אותו.

9. **code (runnable)** — the proof, because she should not have to take it on
   faith.
   ```python
   class Monster:
       def __init__(self, name):
           self.name = name
       def roar(self):
           return self.name.upper() + "!"

   fury = Monster("alecto")
   print(fury.roar())
   print(Monster.roar(fury))
   ```
   Output:
   ```
   ALECTO!
   ALECTO!
   ```
   Caption: אותה קריאה בדיוק, כתובה בשתי דרכים. `fury.roar()` היא קיצור נוח
   ל-`Monster.roar(fury)`. אין פה קסם — יש פה ארגומנט שנשלח בשבילך.

10. **compare** — **`self`, part two.** The forgotten dot, which is the mistake
    she will actually make.
    - bad:
      ```python
      class Monster:
          def __init__(self, name):
              self.name = name
          def roar(self):
              return name.upper() + "!"
      ```
      label: `NameError: name 'name' is not defined`
    - good:
      ```python
      class Monster:
          def __init__(self, name):
              self.name = name
          def roar(self):
              return self.name.upper() + "!"
      ```
      label: `ALECTO!`
    Prose under it: זו שגיאת ה-scope משיעור 14, בתחפושת. `name` היה פרמטר של
    `__init__` והוא נעלם כשהיא נגמרה. מה שנשאר הוא `self.name` — ששמור **על
    האובייקט**, לא בתוך הפונקציה. הכלל: **בתוך class, כל מה ששייך לאובייקט
    מתחיל ב-`self.`** — גם בקריאה וגם בכתיבה.

11. **prose** — Kill the last piece of mystery. `self` הוא **לא מילה שמורה**
    בפייתון. הוא סתם שם של פרמטר, ואפשר לקרוא לו `banana` והכל יעבוד. אף אחד
    בעולם לא עושה את זה. כל מי שיקרא את הקוד שלך מצפה ל-`self`, וכתיבת
    משהו אחר תעלה לך יותר ממה שהיא שווה. זה מנהג, לא חוק — וזה מנהג שכדאי
    לשמור.

12. **code (runnable)** — methods that **change** the object. This is where a
    class stops being a fancy dict.
    ```python
    class Monster:
        def __init__(self, name, hp):
            self.name = name
            self.hp = hp

        def status(self):
            return f"{self.name} | {self.hp} HP"

        def take_damage(self, amount):
            self.hp = self.hp - amount
            if self.hp < 0:
                self.hp = 0

    fury = Monster("Alecto", 12)
    fury.take_damage(5)
    print(fury.status())
    fury.take_damage(100)
    print(fury.status())
    ```
    Output:
    ```
    Alecto | 7 HP
    Alecto | 0 HP
    ```
    Caption: `take_damage` לא מחזירה כלום. היא **משנה** את המפלצת. הכלל ש-`self.hp`
    לא יורד מתחת לאפס גר בתוך התבנית — כל מפלצת שתיצקי מקבלת אותו במתנה, ואת
    לא צריכה לזכור אותו שוב.

13. **code (runnable)** — many objects, one class, one loop. The payoff.
    ```python
    class Monster:
        def __init__(self, name, hp):
            self.name = name
            self.hp = hp
        def status(self):
            return f"{self.name} | {self.hp} HP"

    army = [Monster("Alecto", 12), Monster("Empousa", 20), Monster("Telkhine", 7)]
    for monster in army:
        print(monster.status())
    ```
    Output:
    ```
    Alecto | 12 HP
    Empousa | 20 HP
    Telkhine | 7 HP
    ```
    Caption: רשימה של אובייקטים היא עדיין רשימה. כל מה שאת יודעת מ-`for` עובד
    עליה בלי שינוי — וזה כל הרעיון של התבנית: כתבת אחת, יצקת שלוש מאות.

14. **callout · myth** — הפייסטוס נולד עם רגל עקומה והושלך מהאולימפוס. הוא בנה
    לעצמו רגליים ממתכת, וכיסאות שהולכים לבד, ושפחות מזהב שיודעות לדבר. הוא האל
    היחיד באולימפוס שהמיומנות שלו נבנתה ולא ניתנה. אם יש קבינה שמתאימה למי
    שלומדת לתכנת, זו שלו.

## Try It (ungraded)

Free-play editor. Nothing checked, nothing scored.

```python
class Camper:
    def __init__(self, name, cabin):
        self.name = name
        self.cabin = cabin

    def introduce(self):
        return f"{self.name}, cabin {self.cabin}"


me = Camper("Percy", "Poseidon")
print(me.introduce())

# now change the values, add an attribute of your own,
# and write a second method that uses it
```

Intro: *"התבנית שלך. שני את השם והקבינה, הוסיפי attribute חדש ב-`__init__`
(משהו כמו `self.years = 3`), וכתבי method שני שמשתמש בו. שום דבר פה לא נבדק."*

## Training exercises

### e1 — Cast two shields · 25 XP, 6 🪙

The mold is already on the bench. Her job is to pour.

Starter (the class is given, complete):
```python
class Shield:
    def __init__(self, owner, metal):
        self.owner = owner
        self.metal = metal

    def describe(self):
        return self.owner + "'s shield, forged from " + self.metal


# cast two shields and print both descriptions:
#   Percy, from celestial bronze
#   Clarisse, from iron
```

Required output:
```
Percy's shield, forged from celestial bronze
Clarisse's shield, forged from iron
```

Solution:
```python
class Shield:
    def __init__(self, owner, metal):
        self.owner = owner
        self.metal = metal

    def describe(self):
        return self.owner + "'s shield, forged from " + self.metal


percy_shield = Shield("Percy", "celestial bronze")
clarisse_shield = Shield("Clarisse", "iron")
print(percy_shield.describe())
print(clarisse_shield.describe())
```

- **check**: `{ kind: "output", mode: "normalized", expect: "Percy's shield, forged from celestial bronze\nClarisse's shield, forged from iron" }`
- Nearly free on purpose. She writes no class body at all — she only casts and
  calls, so the very first thing she does with a class is see two independent
  objects side by side.
- hints:
  1. שני הערכים ש-`__init__` מבקש הם `owner` ו-`metal`. איך יוצקים מגן חדש
     ומעבירים לו אותם?
  2. `Shield("Percy", "celestial bronze")` יוצר מגן. שמרי אותו במשתנה, ואז
     קראי ל-method עם נקודה: `.describe()`. שימי לב שהוא **מחזיר** מחרוזת —
     צריך `print` מסביב.
  3. שתי שורות יצירה, שתי שורות הדפסה:
     `percy_shield = Shield("Percy", "celestial bronze")` ואז
     `print(percy_shield.describe())`, ואותו דבר ל-`Shield("Clarisse", "iron")`.

### e2 — Write the mold · 30 XP, 8 🪙

The forge has a status board and no automatons to put on it. The method is
written; the `__init__` is missing.

Starter:
```python
class Automaton:
    # write __init__ here.
    # every automaton needs a name and hp.

    def status(self):
        return f"{self.name} | {self.hp} HP"


bronze = Automaton("Talos", 40)
copper = Automaton("Festus", 25)
print(bronze.status())
print(copper.status())
```

Required output:
```
Talos | 40 HP
Festus | 25 HP
```

Solution:
```python
class Automaton:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp

    def status(self):
        return f"{self.name} | {self.hp} HP"


bronze = Automaton("Talos", 40)
copper = Automaton("Festus", 25)
print(bronze.status())
print(copper.status())
```

- **check**: `{ kind: "output", mode: "normalized", expect: "Talos | 40 HP\nFestus | 25 HP" }`
  plus `{ kind: "source", mustInclude: ["__init__", "self.name", "self.hp"], message: { he: "הערכים צריכים להישמר על האובייקט עם self.", en: "The values must be stored on the object with self." } }`
- `status()` tells her exactly which attribute names to create — reading the
  existing method to learn the contract is a real skill and this exercise is
  where it is practised.
- The most common wrong answer is `name = name` instead of `self.name = name`,
  which produces `AttributeError: 'Automaton' object has no attribute 'name'`.
  Hint 3 names it.
- hints:
  1. תסתכלי על `status`. באילו שמות היא משתמשת? זה בדיוק מה ש-`__init__` צריכה
     ליצור.
  2. `def __init__(self, name, hp):` — שלושה פרמטרים, כי `self` תמיד ראשון.
     בתוכה שתי שורות שמירה.
  3. `self.name = name` שומר את הערך שהתקבל **על האובייקט**. אם תכתבי
     `name = name` בלי `self.`, יצרת משתנה מקומי שנעלם ברגע ש-`__init__`
     נגמרת, ואז `status` תיפול על
     `AttributeError: 'Automaton' object has no attribute 'name'`.

### e3 — Damage on the anvil · 30 XP, 8 🪙

An automaton that cannot be dented is a statue. Give it a method that changes it.

Starter:
```python
class Automaton:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp

    def status(self):
        return f"{self.name} | {self.hp} HP"

    # add take_damage(amount) here.
    # it lowers hp, and hp never goes below 0.


talos = Automaton("Talos", 40)
talos.take_damage(15)
print(talos.status())
talos.take_damage(100)
print(talos.status())
```

Required output:
```
Talos | 25 HP
Talos | 0 HP
```

Solution:
```python
class Automaton:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp

    def status(self):
        return f"{self.name} | {self.hp} HP"

    def take_damage(self, amount):
        self.hp = self.hp - amount
        if self.hp < 0:
            self.hp = 0


talos = Automaton("Talos", 40)
talos.take_damage(15)
print(talos.status())
talos.take_damage(100)
print(talos.status())
```

- **check**: `{ kind: "output", mode: "normalized", expect: "Talos | 25 HP\nTalos | 0 HP" }`
- The second call is 100 damage against 40 HP specifically to force the floor
  check. Without the `if`, the output is `-60` and the check fails with a very
  readable difference.
- The idea to underline in the brief: this method returns nothing. It **changes
  the object**. Some methods answer a question, some methods do a thing.
- hints:
  1. ה-method צריך שני דברים כדי לעבוד: את האובייקט שנפגע, ואת גודל הפגיעה.
     כמה פרמטרים זה, וכמה מהם את כותבת בעצמך?
  2. `def take_damage(self, amount):` בתוך ה-class, באותה הזחה כמו `status`.
     בפנים: להוריד מ-`self.hp` את `amount`, ואז לבדוק שלא ירדנו מתחת לאפס.
  3. שתי שורות ותנאי: `self.hp = self.hp - amount`, ואז
     `if self.hp < 0:` ובתוכו `self.hp = 0`. שימי לב שאין `return` בכלל —
     ה-method הזה משנה את האוטומטון במקום להחזיר משהו. אחרי הקריאה, `status()`
     כבר יראה את המספר החדש.

### e4 — The muster roll · 35 XP, 9 🪙

Camp is calling everyone to the defence line. Every camper shouts the same
formula, and there are a lot of campers.

Starter:
```python
# write a class called Camper:
#   __init__ takes name and cabin
#   shout() returns:  I AM <NAME> OF CABIN <CABIN>   (all capitals)
#
# then build a list with these three, in this order,
# and print each one's shout:
#   Percy / Poseidon, Annabeth / Athena, Leo / Hephaestus
```

Required output:
```
I AM PERCY OF CABIN POSEIDON
I AM ANNABETH OF CABIN ATHENA
I AM LEO OF CABIN HEPHAESTUS
```

Solution:
```python
class Camper:
    def __init__(self, name, cabin):
        self.name = name
        self.cabin = cabin

    def shout(self):
        return "I AM " + self.name.upper() + " OF CABIN " + self.cabin.upper()


campers = [Camper("Percy", "Poseidon"), Camper("Annabeth", "Athena"), Camper("Leo", "Hephaestus")]
for camper in campers:
    print(camper.shout())
```

- **check**: `{ kind: "output", mode: "normalized", expect: "I AM PERCY OF CABIN POSEIDON\nI AM ANNABETH OF CABIN ATHENA\nI AM LEO OF CABIN HEPHAESTUS" }`
  plus `{ kind: "source", mustInclude: ["class Camper", ".upper()", "for "], message: { he: "צריך class, את ‎.upper()‎ משיעור 17, ולולאה — לא שלוש הדפסות ידניות", en: "Needs a class, .upper() from lesson 17, and a loop — not three hand-written prints" } }`
- The first exercise where she writes a class from an empty screen, and the first
  time a class meets a list and a loop. The `.upper()` requirement deliberately
  reaches back one lesson so the acts do not feel like separate courses.
- hints:
  1. שלושה חלקים נפרדים: התבנית, הרשימה, הלולאה. איזה מהם את יודעת לכתוב כבר
     בלי לחשוב?
  2. ה-class צריך `__init__(self, name, cabin)` ו-`shout(self)` שמחזירה
     מחרוזת. את האותיות הגדולות עושים עם `.upper()` על ה-attributes — לא
     בכתיבה ידנית.
  3. `shout` בונה מחרוזת אחת:
     `"I AM " + self.name.upper() + " OF CABIN " + self.cabin.upper()`.
     אחר כך רשימה: `campers = [Camper("Percy", "Poseidon"), ...]` — שלוש יציקות
     בתוך רשימה אחת. ואז `for camper in campers:` ובתוכו
     `print(camper.shout())`.

## Quest — "The Automaton Duel" · 55 XP, 14 🪙

Hephaestus wants to see the mold work under load. Two automatons, one arena, one
loop, and no help from him.

Brief: write a `Fighter` class with `name`, `hp` and `damage`; give it
`is_alive()` which answers a question and `attack(other)` which damages **a
different object** and returns the log line. Then run the duel until one of them
drops, printing every turn, and announce the winner.

`attack(other)` is the new idea in this quest: a method whose parameter is
another object of the same class. `self` is the attacker; `other` is the target.

Starter:
```python
# class Fighter:
#   __init__(self, name, hp, damage)
#   is_alive(self)        -> True while hp is above 0
#   attack(self, other)   -> lowers other.hp by self.damage (never below 0)
#                            returns "<name> hits <other name> for <damage>"

hero = Fighter("Percy", 50, 9)
foe = Fighter("Talos", 44, 7)

# turn loop: while both are alive
#   print "-- turn N --"
#   the hero attacks; print the line
#   if the foe is still alive, the foe attacks; print the line
# then print "WINNER: <name>"
```

Required output:
```
-- turn 1 --
Percy hits Talos for 9
Talos hits Percy for 7
-- turn 2 --
Percy hits Talos for 9
Talos hits Percy for 7
-- turn 3 --
Percy hits Talos for 9
Talos hits Percy for 7
-- turn 4 --
Percy hits Talos for 9
Talos hits Percy for 7
-- turn 5 --
Percy hits Talos for 9
WINNER: Percy
```

Solution:
```python
class Fighter:
    def __init__(self, name, hp, damage):
        self.name = name
        self.hp = hp
        self.damage = damage

    def is_alive(self):
        return self.hp > 0

    def attack(self, other):
        other.hp = other.hp - self.damage
        if other.hp < 0:
            other.hp = 0
        return self.name + " hits " + other.name + " for " + str(self.damage)


hero = Fighter("Percy", 50, 9)
foe = Fighter("Talos", 44, 7)

turn = 1
while hero.is_alive() and foe.is_alive():
    print("-- turn " + str(turn) + " --")
    print(hero.attack(foe))
    if foe.is_alive():
        print(foe.attack(hero))
    turn = turn + 1

if hero.is_alive():
    print("WINNER: " + hero.name)
else:
    print("WINNER: " + foe.name)
```

- **check**: `{ kind: "output", mode: "normalized", expect: <the 14 lines above> }`
  plus `{ kind: "source", mustInclude: ["class Fighter", "def attack", "while "], message: { he: "המשימה דורשת class עם attack ולולאת while — לא הדפסות קבועות", en: "This needs a class with attack and a while loop — not hard-coded prints" } }`
- **Why the numbers are 50/9 against 44/7:** Talos needs five hits to fall
  (9·5 = 45 ≥ 44) and Percy survives four counter-attacks (7·4 = 28 < 50), so the
  duel ends on turn 5 with the foe dropping *before* he can swing. That last
  detail is what forces the `if foe.is_alive():` guard, and it is the difference
  between the correct output and a dead automaton getting one more hit in.
- No `random` here on purpose: the output has to be exactly checkable, and
  randomness arrives in lesson 20 where the checks are built for it.
- hints:
  1. שני האובייקטים הם מאותה תבנית, אבל הם נפרדים לגמרי. בתוך `attack`, מי
     זה `self` ומי זה `other`? ועל HP של מי היא עובדת?
  2. `attack(self, other)` מורידה מ-`other.hp` את `self.damage` — התוקף מוריד
     מהמותקף. `is_alive(self)` מחזירה `self.hp > 0` ישירות, בלי `if`. הלולאה
     היא `while hero.is_alive() and foe.is_alive():`.
  3. בתוך `attack`: `other.hp = other.hp - self.damage`, ואז רצפה על אפס, ואז
     `return` של שורת הלוג עם `str(self.damage)`. בלולאה: מדפיסים את מספר
     התור, מדפיסים את `hero.attack(foe)`, ואז **בודקים שוב** ‎`if foe.is_alive():`‎
     לפני ההתקפה שלו — כי הוא אולי כבר נפל בתור הזה. אחרי הלולאה, `if` אחד
     מחליט מי המנצח.

## Optional side quest — "The Bronze Dragon" · +25 XP, 8 🪙

Marked clearly as optional. Never blocks lesson 20; nothing in the capstone
requires it.

Annabeth found Festus in the woods: a bronze dragon. A dragon is a fighter — same
name, same hp, same attack — **plus** fire. Rewriting the whole class to add one
method would be a waste of a mold.

Brief: write `Dragon` which **inherits** from `Fighter`, adds a `fire` attribute,
and adds a `breathe(other)` method. Everything else comes for free.

Solution:
```python
class Dragon(Fighter):
    def __init__(self, name, hp, damage, fire):
        super().__init__(name, hp, damage)
        self.fire = fire

    def breathe(self, other):
        other.hp = other.hp - self.fire
        return self.name + " breathes fire on " + other.name + " for " + str(self.fire)


festus = Dragon("Festus", 60, 6, 20)
dummy = Fighter("Straw Dummy", 100, 0)
print(festus.attack(dummy))
print(festus.breathe(dummy))
print(dummy.hp)
```

Required output:
```
Festus hits Straw Dummy for 6
Festus breathes fire on Straw Dummy for 20
74
```

- **check**: `{ kind: "output", mode: "normalized", expect: "Festus hits Straw Dummy for 6\nFestus breathes fire on Straw Dummy for 20\n74" }`
  plus `{ kind: "source", mustInclude: ["class Dragon(Fighter)", "super()"], message: { he: "התבנית החדשה צריכה לרשת מ-Fighter ולקרוא ל-super()", en: "The new mold must inherit from Fighter and call super()" } }`
- Teach it in two sentences, not two pages: `class Dragon(Fighter)` אומר
  "אותה תבנית, ועוד". `super().__init__(...)` אומר "תריצי את ה-`__init__` של
  התבנית שממנה ירשתי, ואז אני אמשיך". `festus.attack()` עובד בלי שכתבת אותו.
- hints:
  1. מה מתוך `Fighter` את **לא** רוצה לכתוב שוב? ומה יש לדרקון שאין ללוחם רגיל?
  2. `class Dragon(Fighter):` — השם בסוגריים הוא התבנית שממנה יורשים.
     ב-`__init__` צריך גם את שלושת הערכים של `Fighter` וגם את `fire`.
  3. `super().__init__(name, hp, damage)` בשורה הראשונה של `__init__` דואג
     לשלושת הערכים הישנים; אחריו `self.fire = fire`. `breathe` בנויה כמו
     `attack`, רק עם `self.fire`. את `attack` לא כותבים בכלל — הוא ירש אותו.

## Reward & Recap

**Item**: 🛡️ **מגן הפייסטוס / Hephaestus' Shield** — "לא הוא יצק אותו. את יצקת.
עליו חרוט הסימן של הקבינה שלך, ובפנים — סימן קטן של התבנית שכתבת."

Bead 19 is added to the necklace. Nineteen down.

**Achievements possible here**: *Forge-Born* (finished the quest), *Inheritor*
(finished the optional side quest), *No Hints Needed* (whole lesson, zero hints).

**Recap bullets**:
- `class` היא תבנית יציקה; כל `ClassName()` יוצק **object** חדש ונפרד
- `__init__` רצה אוטומטית ביצירה, ושומרת את הערכים על האובייקט
- `self` הוא האובייקט הנוכחי — פייתון שולח אותו לבד כארגומנט ראשון של כל method
- בתוך class, כל מה ששייך לאובייקט מתחיל ב-`self.` — בקריאה ובכתיבה
- method יכולה להחזיר תשובה או לשנות את האובייקט; שתיהן לגיטימיות
- (רשות) `class Dragon(Fighter)` יורש הכל ומוסיף — ו-`super()` מפעיל את הישן

**Next teaser**: *"יש לך תבנית, יש לך נבואה, ויש לך שיטה לתקן מה שנשבר. קרונוס
עולה על אולימפוס מחר בבוקר. עשרים שיעורים, ומשחק אחד שאת בונה מההתחלה עד הסוף."*

## Common mistakes to anticipate

| She does | She sees | Hint must cover |
| --- | --- | --- |
| `def roar():` — no `self` | `TypeError: roar() takes 0 positional arguments but 1 was given` | Python passes the object as argument one |
| `name` instead of `self.name` inside a method | `NameError: name 'name' is not defined` | attributes always carry `self.` |
| `name = name` inside `__init__` | `AttributeError: 'X' object has no attribute 'name'` | assigning without `self.` creates a local that vanishes |
| `Monster()` with no arguments | `TypeError: __init__() missing 1 required argument: name` | `__init__`'s parameters are what `Monster(...)` needs |
| `m.status` without `()` | prints a function object, not the text | calling a method needs parentheses |
| `class monster:` lowercase | works, but reads wrong | convention: classes are `CapitalCase`, everything else `lower_case` |
| `def __init__(self)` then `self.hp` used before it is set | `AttributeError` | an attribute exists only after it is assigned |
| edits `other.hp` thinking it changed `self` | wrong fighter loses HP | `self` and `other` are two separate objects |

## Implementation notes

- Every class, method and error message in this file was executed against the
  vendored `skulpt.min.js`; all outputs are the real ones.
- **Skulpt quirk to normalise in the UI:** the real Skulpt text for the compare
  block in item 8 is `roar() takes 0 positional arguments but 1 was  given` —
  with a **double space** before `given`. The lesson copy above shows one space.
  `engine.js` should collapse repeated spaces in error messages before display so
  the learner never has to wonder whether the double space means something.
- **Fidelity note, not shown to her:** `print(obj)` gives
  `<__main__.Shield object>` in Skulpt and `<__main__.Shield object at 0x7f…>` in
  CPython. The lesson never checks that output — block 5 is `runnable` with the
  Skulpt text as its documented `output`, which is correct for this runtime.
  Lesson 20's graduation section is where the general point gets made.
- `super()` with no arguments works in Skulpt (verified). The explicit
  `Fighter.__init__(self, ...)` form also works; the side quest uses `super()`
  because that is what she will read in real code everywhere.
- **Two checks on one exercise use the `also` field**, the pattern established
  in lesson 1 e1. Every "plus" in this file (e2, e4, the quest, the side quest)
  is an `also`:
  ```js
  { kind: "output", mode: "normalized", expect: "…",
    also: { kind: "source", mustInclude: ["__init__", "self.name", "self.hp"],
            message: { he: "…", en: "…" } } }
  ```
- **No check in this lesson needs `raw: true`.** Every `source` requirement is
  syntax — `class Camper`, `__init__`, `self.name`, `.upper()`, `def attack`,
  `while `, `class Dragon(Fighter)`, `super()` — and survives stripping.
- No `input()` anywhere in this lesson, so nothing blocks on a prompt and every
  check is a plain `output` comparison.
- The quest's expected output is 14 lines. Store it in the content file as one
  string with `\n` separators, exactly as lesson 1's quest does — `normalized`
  handles the rest.
- The side quest must render behind an "optional" marker in the lesson page and
  must not count toward the lesson-completion condition, per
  `07-curriculum.md`'s rule that side quests never block.
