# Lesson 19 — The Forge of Hephaestus · נפחיית הפייסטוס

> **Act V — The Last Olympian** · Stop 19 of 20
> Structure follows `spec/lessons/lesson-01.md`. Schema: `spec/04-lesson-template.md`.

| | |
| --- | --- |
| **id** | `19` |
| **slug** | `the-forge-of-hephaestus` |
| **minutes** | 30–35 |
| **concepts** | `class`, `__init__`, `self`, attributes, methods, many objects from one class, `register_tower`, (side quest) inheritance |
| **new vocabulary** | `class`, `self`, `__init__`, attribute, method, object, `register_tower`, (side quest) `super()` |
| **requires** | L2 variables · L6 `if` · L7 `while` · L8 `for` · L9 lists · L11 dicts · L13–14 `def`, parameters, `return`, scope · L17 string methods · L18 reading errors |
| **item** | 🛡️ מגן הפייסטוס / Hephaestus' Shield |
| **XP** | 25 + 30 + 30 + 35 (battles) + 55 (great battle) + 30 (bonus) = **205** · optional side quest +25 |

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

And the payoff is the largest in the course: **the game runs her class.** She
writes `class SkyWatch:` with a `fire` method, hands it to `register_tower`, and
from that moment every archer on the field asks her object what to shoot, dozens
of times a second, for the whole battle. Not a simulation of a class — the real
engine instantiating her code and calling her method.

## Story beat

Olympus, level nine hundred and something. Behind an iron door the whole mountain
hums: Hephaestus' forge, where the automatons are made. Not one automaton at a
time — a **mold**, and then as many as the war needs.

Hephaestus is not interested in her prophecy. He has a defence line to build and
not enough hands. He hands her a mold and a ladle of bronze and tells her that a
demigod who can only make one of a thing has not learned to make anything.

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

14. **code (runnable)** — the moment the class stops being a private exercise
    and becomes part of the game. This block is the bridge to every battle in
    the lesson and must not be skipped.
    ```python
    class SkyWatch:
        def fire(self, enemies):
            for enemy in enemies:
                if enemy["flying"]:
                    return enemy
            return enemies[0]

    register_tower("archer", SkyWatch)
    print("archers now think for themselves")
    ```
    Output: `archers now think for themselves`
    Caption: `register_tower` מקבל **שם של סוג מגדל** ואת התבנית עצמה — בלי
    סוגריים אחרי השם של ה-class, כי את מוסרת את התבנית ולא יציקה. מכאן והלאה,
    בכל פעם שקשת צריך מטרה, המנוע קורא ל-`fire` של האובייקט שיצק מהתבנית שלך.
    `fire` מקבלת בדיוק את מה ש-`choose_target` קיבלה בשיעור 14, ומחזירה בדיוק
    את אותם דברים.

15. **callout · warn — שלושה כללים של המנוע**, וכולם ייפגשו איתך בקרב הראשון:
    > **1.** השם חייב להיות סוג מגדל שקיים: `"archer"`, `"cannon"`, `"ice"`,
    > `"lightning"`. את לא ממציאה מגדל חדש — את מחליפה למגדל קיים את הראש.
    > `register_tower("storm", …)` ואחריו `place_tower("storm", …)` ייתן
    > `unknownTower` ולא ייבנה כלום.
    > **2.** המנוע יוצק בלי ארגומנטים: `TheClass()`. אם כתבת
    > `def __init__(self, power):`, תקבלי באמצע הקרב
    > `TypeError: __init__() missing 1 required argument: power`. כל מה שהתבנית
    > צריכה — היא מכינה לעצמה.
    > **3.** יציקה אחת לכל סוג מגדל, והיא חיה כל הקרב. כל הקשתים במפה חולקים
    > אובייקט אחד; אם תרשמי את אותה תבנית גם ל-`"cannon"`, יהיו שתי יציקות
    > נפרדות עם שני מצבים נפרדים. מה שתשמרי על `self` יהיה שם גם בירייה הבאה.

16. **callout · myth** — הפייסטוס נולד עם רגל עקומה והושלך מהאולימפוס. הוא בנה
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

## Battle levels

This is the lesson where the game hands the engine over to her. Until now the
game called **one** function of hers, `choose_target`, and used the same answer
for every tower on the field. From here on she can define a tower type:

```python
class SkyWatch:
    def fire(self, enemies):
        return enemies[0]

register_tower("archer", SkyWatch)
```

`register_tower(kind, TheClass)` binds a class to a tower kind. The engine then
**builds one object from that class** — `TheClass()`, no arguments — and calls
`fire(enemies)` on it every time a tower of that kind needs a target. `fire`
receives exactly what `choose_target` received and may return the same four
things: an enemy dict, an enemy's `id`, an index, or `None` to hold fire.

Three consequences she should be told plainly, because all three are visible in
the levels:

1. **The name must be a real tower kind** — `"archer"`, `"cannon"`, `"ice"` or
   `"lightning"`. She is not inventing a new tower; she is replacing the mind of
   an existing one.
2. **`__init__` is called with nothing but `self`.** Anything it needs, it makes
   itself.
3. **The object lives for the whole battle.** Whatever she stores on `self` is
   still there on the next shot, and on the last shot of the last wave. That is
   the thing a plain function could never do.

Five battles plus one optional side quest. Every one was played through the real
engine: the solution wins with a perfect defense, an empty program loses, and
`return 0`, `return enemies[0]` and `return None` all lose.

---

### b1 — Cast the Mold · יציקה ראשונה · 25 XP, 6 🪙

**Why this mechanic:** the class is written for her, complete. The only thing
missing is the line that connects it to a tower — and without that line the
towers fall back to the engine's default targeting and the harpies get through.
She learns what `register_tower` *does* by watching the same five towers lose and
then win, with nothing changed but one line.

Hephaestus has a mold on the bench. He is not going to pour it for her.

```js
map: { cols: 18, rows: 9, path: [[0,4],[1,4], … ,[17,4]] },
gold: 330, campHp: 5, seed: 81,
allowed: ["archer", "cannon"],
waves: [ { delay: 0, enemies: [ { kind: "hellhound", count: 4, gap: 0.5 },
                                { kind: "harpy", count: 6, gap: 0.7 } ] } ],
```

Starter:
```python
class SkyWatch:
    def fire(self, enemies):
        for enemy in enemies:
            if enemy["flying"]:
                return enemy
        return enemies[0]

# the mold is finished. connect it to the archers,
# then build the line below.

place_tower("cannon", 4, 3)
place_tower("archer", 6, 5)
place_tower("archer", 8, 3)
place_tower("cannon", 11, 3)
place_tower("archer", 13, 5)
```

Solution: the same file with one line added above the towers —
```python
register_tower("archer", SkyWatch)
```

```js
check: { kind: "battle",
  also: { kind: "source", mustInclude: ["register_tower(", "class SkyWatch"],
          message: { he: "התבנית צריכה להירשם לסוג מגדל, אחרת אף אחד לא משתמש בה",
                     en: "The mold has to be registered to a tower kind, or nothing uses it" } } }
```

Verified: solution wins 5/5, 10 kills. The class written but never registered:
loses, 2 leaked. Registered on `"cannon"` instead: loses, 2 leaked — the cannons
cannot see a flying enemy at all, so her doctrine reaches nobody. Empty program:
loses, 6. `return 0` / `return enemies[0]`: lose, 3. `return None`: loses, 6.

Hints:
1. הריצי כמו שזה עכשיו. הקוד רץ בלי שגיאה — אז למה ההרפיות עוברות? מי בכלל
   קורא ל-`fire`?
2. `register_tower` מקבל שני דברים: שם של **סוג מגדל** ואת התבנית עצמה. איזה
   מהמגדלים שלך הוא היחיד שיכול לפגוע במשהו שעף?
3. `register_tower("archer", SkyWatch)` — שימי לב שאין סוגריים אחרי `SkyWatch`.
   את מוסרת למנוע את **התבנית**, לא יציקה מוכנה; הוא זה שיוצק ממנה. שורה אחת,
   לפני שורות הבנייה, וכל הקשתים במפה מתחילים לחשוב לפי התבנית שלך. נסי גם
   `register_tower("cannon", SkyWatch)` וראי למה זה לא עוזר: תותח לא רואה
   הרפיות ברשימה שלו בכלל.

---

### b2 — Write the Mold · לכתוב את התבנית · 30 XP, 8 🪙

**Why this mechanic:** she writes the class body from an empty screen, and the
two mistakes everyone makes both **end the battle with a readable error**:

| what she writes | what the battle says |
| --- | --- |
| `priority = [...]` inside `__init__`, no `self.` | `AttributeError: 'Doctrine' object has no attribute 'priority'` |
| `def fire(enemies):` without `self` | `TypeError: fire() takes 1 positional argument but 2 were given` |

Both were measured against the engine. The second one is the compare block from
the teaching section, arriving as a consequence instead of a warning: *she* wrote
one argument, *the engine* sent two, and the second is the object.

```js
same map, gold, allowed and waves as b1; seed: 82
```

Starter:
```python
class Doctrine:
    # __init__ takes nothing but self.
    # it stores one attribute: priority, a list of kinds in the order
    # they should die: harpy, satyr, hellhound, cyclops.

    # fire(self, enemies) walks that list and returns the first enemy
    # whose kind matches. if nothing matches, return enemies[0].
    pass

register_tower("archer", Doctrine)

place_tower("cannon", 4, 3)
place_tower("archer", 6, 5)
place_tower("archer", 8, 3)
place_tower("cannon", 11, 3)
place_tower("archer", 13, 5)
```

Solution:
```python
class Doctrine:
    def __init__(self):
        self.priority = ["harpy", "satyr", "hellhound", "cyclops"]

    def fire(self, enemies):
        for kind in self.priority:
            for enemy in enemies:
                if enemy["kind"] == kind:
                    return enemy
        return enemies[0]

register_tower("archer", Doctrine)
… the five towers …
```

```js
check: { kind: "battle",
  also: { kind: "source", mustInclude: ["def __init__(self)", "self.priority", "def fire(self, enemies)"],
          message: { he: "הערכים נשמרים על האובייקט עם self., ו-fire מקבלת self ראשונה",
                     en: "Values are stored on the object with self., and fire takes self first" } } }
```

Verified: solution wins 5/5, 10 kills. Both named mistakes end the battle at 2.5s
with the errors in the table. Degenerates and empty program lose exactly as in b1.

**Note on the `mustInclude` strings.** `def __init__(self)` and
`def fire(self, enemies)` are matched without the trailing colon on purpose, so a
learner who writes an extra space before the `:` is not punished for it. They are
syntax, so no `raw`.

Hints:
1. `fire` צריכה לקרוא את סדר העדיפויות. איפה הסדר הזה גר, ואיך method אחת
   מגיעה למשהו ששמרה method אחרת?
2. `def __init__(self):` בלי פרמטרים נוספים — המנוע יוצק את התבנית בלי לתת לה
   כלום. בפנים שורה אחת: `self.priority = [...]`. `fire` היא שתי לולאות מקוננות,
   בדיוק כמו ב-`choose_target` משיעור 17, רק ש-`PRIORITY` הפך ל-`self.priority`.
3. `self.priority = ["harpy", "satyr", "hellhound", "cyclops"]` ב-`__init__`.
   ב-`fire`: `for kind in self.priority:` ובתוכה `for enemy in enemies:`, ואם
   `enemy["kind"] == kind` אז `return enemy`. בסוף, אחרי שתי הלולאות,
   `return enemies[0]`. שתי הטעויות שכולם עושים: לכתוב `priority = [...]` בלי
   `self.` — ואז המשתנה נעלם ברגע ש-`__init__` נגמרת — ולכתוב
   `def fire(enemies):` בלי `self`, ואז פייתון מתלונן שקיבל ארגומנט אחד יותר
   ממה שביקשת. הוא צודק: הארגומנט הנוסף הוא האובייקט עצמו.

---

### b3 — Two Molds · שתי תבניות · 30 XP, 8 🪙

**Why this mechanic:** two tower kinds that want **opposite** doctrines, and the
first thing in the course that a single `choose_target` cannot express. The
archers are the only anti-air on the field, so their rule is "sky first". The
cannons are blind to the sky and pay full price against armour, so their rule is
"whatever is softest". One function has to pick one of those; two classes do not.

A cyclops leads the assault with a long head start — slow, heavily armoured, and
impossible to overtake before the gate — so the engine's default of "shoot
whatever is furthest along" feeds every tower on the map into 5 points of armour
while the wave behind it walks in.

```js
map: { cols: 18, rows: 9, path: [[0,4],[1,4], … ,[17,4]] },
gold: 420, campHp: 5, seed: 87,
allowed: ["archer", "cannon"],
waves: [
  { delay: 0,  enemies: [ { kind: "cyclops",   count: 2, gap: 2.0 } ] },
  { delay: 11, enemies: [ { kind: "harpy",     count: 6, gap: 0.6 } ] },
  { delay: 11, enemies: [ { kind: "satyr",     count: 6, gap: 0.6 } ] },
  { delay: 13, enemies: [ { kind: "hellhound", count: 5, gap: 0.5 } ] },
  { delay: 21, enemies: [ { kind: "harpy",     count: 6, gap: 0.6 } ] },
],
```

Starter: the six towers, already written, and two empty class headers.

```python
class SkyWatch:
    # archers: anything flying, first. otherwise whatever leads.
    pass

class Breaker:
    # cannons: the LEAST armoured enemy in range.
    pass

register_tower("archer", SkyWatch)
register_tower("cannon", Breaker)

place_tower("archer", 3, 3)
place_tower("cannon", 5, 5)
place_tower("archer", 7, 3)
place_tower("cannon", 10, 5)
place_tower("archer", 12, 3)
place_tower("cannon", 15, 5)
```

Solution:
```python
class SkyWatch:
    def fire(self, enemies):
        for enemy in enemies:
            if enemy["flying"]:
                return enemy
        return enemies[0]

class Breaker:
    def fire(self, enemies):
        best = enemies[0]
        for enemy in enemies:
            if enemy["armour"] < best["armour"]:
                best = enemy
        return best

register_tower("archer", SkyWatch)
register_tower("cannon", Breaker)
… the six towers …
```

```js
check: { kind: "battle",
  also: { kind: "source", mustInclude: ["class SkyWatch", "class Breaker",
                                        "register_tower(\"archer\"", "register_tower(\"cannon\""],
          message: { he: "לכל סוג מגדל תבנית משלו — קשת שמירת שמיים, תותח שובר שריון",
                     en: "One mold per tower kind — the archer watches the sky, the cannon breaks armour" } } }
```

Verified — the numbers that make the argument:

| what she writes | outcome |
| --- | --- |
| two classes, one per kind | **wins**, 5/5 HP, 25 kills |
| the same six towers, no classes | loses, 3 leaked |
| one global `choose_target`, armour-first | loses, 3 leaked |
| one global `choose_target`, weakest-first | loses, 4 leaked |
| `return 0` / `return enemies[0]` | lose, 1 leaked |
| `return None` | loses, 5 leaked |
| empty program | loses, 5 leaked |

**An honest note for whoever builds this.** A single `choose_target` that says
"sky first, otherwise softest" also wins this battle, because a cannon never sees
a flying enemy in its list and therefore falls through to the second clause on
its own. The `also` check is what makes the level a *classes* level; the battle
is what makes it hard. Do not claim in the brief that two classes are the only
possible answer — claim what is true and better: **each tower kind now carries
its own instructions, and you no longer have to write one rule that has to be
right for everybody.**

Hints:
1. שני סוגי מגדלים, שתי עבודות שונות לגמרי. כתבי במילים מה כל אחד מהם אמור
   לירות בו לפני שאת כותבת שורת קוד — ואז שאלי את עצמך אם פונקציה אחת יכולה
   להגיד את שניהם.
2. `SkyWatch.fire` היא הלולאה מ-b1: מחפשת `enemy["flying"]`, ואם אין —
   `enemies[0]`. `Breaker.fire` היא תבנית "מצא את המינימום" משיעור 10, על
   `enemy["armour"]`.
3. כל class מקבל method אחת בשם `fire(self, enemies)`. ב-`Breaker`: מתחילים
   מ-`best = enemies[0]`, עוברים על כולם, ואם `enemy["armour"] < best["armour"]`
   מחליפים. אחר כך שתי שורות רישום — `register_tower("archer", SkyWatch)`
   ו-`register_tower("cannon", Breaker)`. למה הקיקלופ הכבד לא צריך להיות
   המטרה הראשונה של אף אחד? כי הוא לוקח 32 חיצים ולא הולך לשום מקום מהר, ובזמן
   הזה כל השאר נכנסים בשער.

---

### b4 — The Tower That Counts · המגדל שסופר · 35 XP, 9 🪙

**Why this mechanic:** state that survives between shots, and a method that calls
another method on `self`. Both are things a `choose_target` function could not do
at all: it starts from nothing every time it is called and has nowhere to keep a
number.

The doctrine: follow the priority order, **but every fifth shot is an
overcharge** and goes into the toughest thing in range. Counting to five requires
remembering, and remembering requires an object.

The second new idea is small and important: `fire` does not compute the ranking
itself, it asks `self.rank(enemy)`. One object, two methods, one of them calling
the other through `self`.

```js
same map, gold, allowed and waves as b3; seed: 88
```

Starter: the six towers plus a class skeleton naming the three methods.

Solution:
```python
class Sentry:
    def __init__(self):
        self.shots = 0
        self.priority = ["harpy", "satyr", "hellhound", "cyclops"]

    def rank(self, enemy):
        position = 0
        for kind in self.priority:
            if enemy["kind"] == kind:
                return position
            position = position + 1
        return position

    def fire(self, enemies):
        self.shots = self.shots + 1
        if self.shots % 5 == 0:
            toughest = enemies[0]
            for enemy in enemies:
                if enemy["hp"] > toughest["hp"]:
                    toughest = enemy
            return toughest
        best = enemies[0]
        for enemy in enemies:
            if self.rank(enemy) < self.rank(best):
                best = enemy
        return best

register_tower("archer", Sentry)
register_tower("cannon", Sentry)

… the six towers …
```

```js
check: { kind: "battle",
  also: { kind: "source", mustInclude: ["self.shots", "def rank(self", "self.rank("],
          message: { he: "המגדל צריך לזכור כמה ירה, ו-fire צריכה לקרוא ל-self.rank",
                     en: "The tower has to remember how many shots it fired, and fire has to call self.rank" } } }
```

Verified: solution wins 5/5 with 25 kills. Degenerates and the empty program lose
exactly as in b3.

**The detail worth a callout in the brief, because it is genuinely surprising and
genuinely true:** `register_tower("archer", Sentry)` and
`register_tower("cannon", Sentry)` on the *same class* produce **two separate
objects**. The archers' `self.shots` and the cannons' `self.shots` count
independently and neither can see the other. One mold, two castings — the sentence
from the teaching section, now a thing on the screen. (Within one kind the object
is shared: all six archers on the map would be one `Sentry`. Say that too; it is
the honest shape of this engine and she can reason about it.)

Hints:
1. `self.shots` צריך להתחיל איפשהו ולעלות באחד בכל ירייה. איפה מאתחלים אותו
   כדי שהוא ישרוד בין ירייה לירייה, ואיפה מעלים אותו?
2. `__init__` מאתחל שני דברים: `self.shots = 0` ו-`self.priority`. `rank` היא
   method רגילה שמקבלת `self` ומפלצת ומחזירה מספר — מקום ברשימת העדיפויות.
   `fire` מעלה את המונה בשורה הראשונה שלה, ואז מחליטה.
3. השורה הראשונה של `fire` היא `self.shots = self.shots + 1` — קוראים מהאובייקט
   ומיד כותבים אליו. אחריה `if self.shots % 5 == 0:` פותח את ההסתעפות של
   ה"טעינת יתר": מוצאים את בעל ה-`hp` הגבוה ביותר ומחזירים אותו. אחרת עוברים על
   `enemies` ומשווים `self.rank(enemy) < self.rank(best)` — שימי לב שקוראים
   ל-method של האובייקט מתוך method אחרת של אותו אובייקט, וזה נעשה עם `self.`
   בדיוק כמו attribute.

---

## The Great Battle — "קו האוטומטונים" / "The Automaton Line" · 55 XP, 14 🪙

**Why this mechanic:** everything, from an empty screen. She writes both molds
herself, gives each one an `__init__` and a helper method, registers three tower
kinds between them, and holds seven waves. Nobody hands her a class header this
time.

Hephaestus wants the line finished before dawn. He gives her the spots and the
gold and goes back to the anvil.

```js
map: { cols: 16, rows: 10,
       path: [[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[6,3],[6,4],[6,5],[6,6],
              [6,7],[7,7],[8,7],[9,7],[10,7],[11,7],[12,7],[12,6],[12,5],[12,4],
              [12,3],[13,3],[14,3],[15,3]] },
gold: 540, campHp: 6, seed: 91,
allowed: ["archer", "cannon", "lightning"],
waves: [
  { delay: 0,  enemies: [ { kind: "satyr",     count: 9, gap: 0.6 } ] },
  { delay: 1,  enemies: [ { kind: "harpy",     count: 9, gap: 0.7 } ] },
  { delay: 14, enemies: [ { kind: "hellhound", count: 9, gap: 0.5 } ] },
  { delay: 14, enemies: [ { kind: "harpy",     count: 9, gap: 0.7 } ] },
  { delay: 28, enemies: [ { kind: "cyclops",   count: 3, gap: 2.0 } ] },
  { delay: 29, enemies: [ { kind: "harpy",     count: 9, gap: 0.6 } ] },
  { delay: 30, enemies: [ { kind: "satyr",     count: 9, gap: 0.5 } ] },
],
```

Starter: the seven towers, already placed, and a comment block that is the whole
specification and no code at all.

```python
# class SkyWatch:
#     __init__(self)          -> self.priority, kinds in the order they should die
#     rank(self, enemy)       -> where that enemy's kind sits in the order
#     fire(self, enemies)     -> the enemy with the lowest rank
#
# class Breaker:
#     __init__(self)          -> self.shots = 0
#     fire(self, enemies)     -> counts the shot, then takes the LEAST armoured
#
# register SkyWatch on "archer" and on "lightning",
# and Breaker on "cannon".

place_tower("cannon", 4, 4)
place_tower("archer", 2, 1)
place_tower("archer", 5, 1)
place_tower("cannon", 8, 5)
place_tower("archer", 7, 4)
place_tower("lightning", 10, 6)
place_tower("cannon", 14, 5)
```

Solution:
```python
class SkyWatch:
    def __init__(self):
        self.priority = ["harpy", "satyr", "hellhound", "cyclops"]

    def rank(self, enemy):
        position = 0
        for kind in self.priority:
            if enemy["kind"] == kind:
                return position
            position = position + 1
        return position

    def fire(self, enemies):
        best = enemies[0]
        for enemy in enemies:
            if self.rank(enemy) < self.rank(best):
                best = enemy
        return best

class Breaker:
    def __init__(self):
        self.shots = 0

    def fire(self, enemies):
        self.shots = self.shots + 1
        best = enemies[0]
        for enemy in enemies:
            if enemy["armour"] < best["armour"]:
                best = enemy
        return best

register_tower("archer", SkyWatch)
register_tower("lightning", SkyWatch)
register_tower("cannon", Breaker)

… the seven towers …
```

```js
check: { kind: "battle",
  also: { kind: "source", mustInclude: ["class SkyWatch", "class Breaker",
                                        "def rank(self", "self.rank(",
                                        "register_tower(\"lightning\""],
          message: { he: "שתי תבניות משלך, method עוזרת שנקראת עם self., ושלושה סוגי מגדל רשומים",
                     en: "Two molds of your own, a helper method called through self., and three tower kinds registered" } } }
```

Verified: solution wins 6/6 HP with **57 kills** over seven waves and 51 seconds.
The seven towers with no classes at all: loses, 3 leaked. `return 0` and
`return enemies[0]`: lose, 1 leaked. `return None` and the empty program: lose, 6.

Note that `SkyWatch` is registered to two kinds, so the archers and the lightning
tower each get their own object from the same mold — which is exactly the
sentence Hephaestus opened the lesson with.

Hints:
1. שתי תבניות, וההבדל ביניהן הוא לא הקוד — הוא **מה כל אחת חושבת שחשוב**. נסחי
   את שתי המשפטים האלה בעברית לפני שאת כותבת, ואז תרגמי אותם.
2. `SkyWatch` היא בדיוק מה שכתבת ב-b4, בלי המונה: `__init__` שומרת
   `self.priority`, `rank` מחזירה מיקום ברשימה, `fire` מוצאת את המינימום לפי
   `self.rank`. `Breaker` קצרה יותר: `__init__` עם `self.shots = 0`, ו-`fire`
   שמעלה את המונה ולוקחת את בעל השריון הנמוך ביותר.
3. שלוש שורות רישום, ושתיים מהן מפנות לאותה תבנית:
   `register_tower("archer", SkyWatch)`, `register_tower("lightning", SkyWatch)`
   ו-`register_tower("cannon", Breaker)`. המנוע יוצק אובייקט נפרד לכל סוג, אז
   לקשתים ולמגדל הברק יש שני `SkyWatch` שונים — אותה תבנית, שתי יציקות. ב-`rank`
   שימי לב שהמונה `position` עולה בכל סיבוב ומוחזר גם אם לא נמצאה התאמה, ככה
   שסוג שלא ברשימה מקבל את המספר הגבוה ביותר ויורה בו אחרון.

---

## Optional side quest — "דרקון הארד" / "The Bronze Dragon" · +25 XP, 8 🪙

Marked clearly as optional. It never blocks lesson 20, and nothing in the
capstone requires it.

Annabeth found Festus in the woods, and Hephaestus wants an ice tower on the line
that thinks like him: the same mold, the same helper, one attribute changed.
Rewriting the whole class to change one list would be a waste of a mold.

**Why this mechanic:** `class Frostbite(SkyWatch)` inherits `rank` and `fire`
without a line of code, and `super().__init__()` runs the parent's setup before
she overwrites the one thing she wanted different. An ice tower does almost no
damage — its whole job is *which* enemy it slows — so the inherited `fire` is
exactly right and only the priority needs to change.

```js
map: { cols: 18, rows: 9, path: [[0,4],[1,4], … ,[17,4]] },
gold: 500, campHp: 5, seed: 94,
allowed: ["archer", "cannon", "ice"],
waves: [
  { delay: 0, enemies: [ { kind: "hellhound", count: 5, gap: 0.5 } ] },
  { delay: 0, enemies: [ { kind: "harpy",     count: 6, gap: 0.7 } ] },
  { delay: 3, enemies: [ { kind: "satyr",     count: 4, gap: 0.6 } ] },
],
```

Solution (the new part only; `SkyWatch` is hers from the great battle):
```python
class Frostbite(SkyWatch):
    def __init__(self):
        super().__init__()
        self.priority = ["hellhound", "cyclops", "satyr", "harpy"]

register_tower("archer", SkyWatch)
register_tower("ice", Frostbite)

place_tower("cannon", 4, 3)
place_tower("archer", 3, 5)
place_tower("archer", 6, 5)
place_tower("archer", 8, 3)
place_tower("ice", 10, 5)
place_tower("cannon", 11, 3)
place_tower("archer", 13, 5)
place_tower("archer", 15, 3)
```

```js
check: { kind: "battle",
  also: { kind: "source", mustInclude: ["class Frostbite(SkyWatch)", "super().__init__()"],
          mustExclude: ["def fire", "def rank"],
          message: { he: "התבנית החדשה יורשת מ-SkyWatch וקוראת ל-super() — את fire ואת rank לא כותבים שוב",
                     en: "The new mold inherits from SkyWatch and calls super() — fire and rank are not written again" } } }
```

Verified: solution wins 5/5 with 15 kills. `return 0` and `return enemies[0]`
lose 1. `return None` and the empty program lose 5.

**Honest note, and it must not be papered over.** On this level the eight towers
also win with no classes at all. The side quest is therefore held together by its
`also` check rather than by the battle, which is acceptable for an optional
level whose subject is *how to avoid rewriting code* rather than *how to win a
fight*. The `mustExclude: ["def fire", "def rank"]` is the real teeth here: it
refuses a `Frostbite` that copy-pastes the parent's methods, which is precisely
the mistake inheritance exists to prevent.

Hints:
1. מה מתוך `SkyWatch` את **לא** רוצה לכתוב שוב? ומה הדבר היחיד שצריך להיות שונה
   במגדל קרח?
2. `class Frostbite(SkyWatch):` — השם בסוגריים הוא התבנית שיורשים ממנה. צריך
   `__init__` משלה, אבל היא לא מתחילה מאפס: קודם מריצים את זו של ההורה ואז
   משנים.
3. `super().__init__()` בשורה הראשונה של `__init__` מריץ את ה-`__init__` של
   `SkyWatch` ומכין את `self.priority`. אחריו שורה אחת שדורסת אותו ברשימה
   ההפוכה — קודם כלבי גיהינום, אחר כך קיקלופים, ובסוף מה שמהיר וקל. את `fire`
   ואת `rank` **לא כותבים בכלל**; הן ירדו בירושה ועובדות על `self.priority`
   החדש בלי לדעת שמשהו השתנה. זה כל היופי.

## Reward & Recap

**Item**: 🛡️ **מגן הפייסטוס / Hephaestus' Shield** — "לא הוא יצק אותו. את יצקת.
עליו חרוט הסימן של הקבינה שלך, ובפנים — סימן קטן של התבנית שכתבת."

Bead 19 is added to the necklace. Nineteen down.

**Achievements possible here**: *Forge-Born* (won the great battle), *Inheritor*
(finished the optional side quest), *No Hints Needed* (whole lesson, zero hints).

**Recap bullets**:
- `class` היא תבנית יציקה; כל `ClassName()` יוצק **object** חדש ונפרד
- `__init__` רצה אוטומטית ביצירה, ושומרת את הערכים על האובייקט
- `self` הוא האובייקט הנוכחי — פייתון שולח אותו לבד כארגומנט ראשון של כל method
- בתוך class, כל מה ששייך לאובייקט מתחיל ב-`self.` — בקריאה ובכתיבה
- method יכולה להחזיר תשובה או לשנות את האובייקט; שתיהן לגיטימיות
- `register_tower("archer", MyClass)` מוסר את התבנית למנוע — הוא יוצק אותה פעם
  אחת לכל סוג מגדל וקורא ל-`fire` שלה בכל ירייה
- מה ששמור על `self` שורד בין ירייה לירייה — פונקציה רגילה לא יכולה לזכור כלום
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
| writes the class but never calls `register_tower` | the battle runs and loses; no error at all | a mold nobody registered is never poured |
| `register_tower("archer", SkyWatch())` with brackets | the engine gets an object, not a mold | hand over the class itself, no `()` |
| `register_tower("storm", MyTower)` | `unknownTower` build error | the name must be an existing kind: archer, cannon, ice, lightning |
| `def __init__(self, power):` | `TypeError: __init__() missing 1 required argument: power` mid-battle | the engine casts with no arguments; the object makes what it needs |
| copies `fire` into the child class | the side quest's `mustExclude` refuses it | that is the code inheritance exists to save |
| edits `other.hp` thinking it changed `self` | wrong fighter loses HP | `self` and `other` are two separate objects |

## Implementation notes

- Every class, method and error message in this file was executed against the
  vendored `skulpt.min.js`; all outputs and error strings are the real ones.
- **All six levels (five plus the side quest) were played through the real
  engine** with `assets/js/battle/{sim,pyapi,play}.js` in a Node VM. Asserted for
  each: the solution wins with a perfect defense, an empty program loses, and
  `return 0`, `return enemies[0]` and `return None` all lose. The leak counts
  under each level are measured, not estimated.
- **The exact contract of `register_tower`, verified against `pyapi.js` and
  `sim.js`, because three parts of it are routinely got wrong:**
  1. The first argument must be one of the **existing** tower kinds. `sim.js`
     looks the placement up in its own `TOWERS` table, so
     `register_tower("storm", …)` followed by `place_tower("storm", …)` is an
     `unknownTower` build error. She is replacing a tower's targeting, not
     inventing a tower. Any `cost` or `range` she writes as a class attribute is
     **not read by the engine** — do not show it in a lesson as if it were.
  2. The engine instantiates with `Sk.misceval.callsimArray(cls, [])`, i.e.
     `TheClass()` with no arguments. An `__init__` that requires a parameter
     raises `TypeError: __init__() missing 1 required argument: …` in the middle
     of the battle. b2's teaching text and the mistakes table both cover it.
  3. **One instance per tower kind, created lazily and kept for the whole
     battle.** All six archers share one object; registering the same class to
     `"archer"` and to `"cannon"` produces two. Both facts are load-bearing in
     b4 and both are stated to her rather than hidden.
- **Return values from `fire` are the same four as `choose_target`**, all four
  verified: the enemy dict, its `id` string, an integer index, or `None` to hold
  fire. `hooksFrom` normalises them.
- **Skulpt quirk to normalise in the UI:** the real text of the missing-`self`
  error is `fire() takes 1 positional argument but 2 were  given` — with a
  **double space** before `given`. The lesson copy shows one. `engine.js` should
  collapse repeated spaces in error messages before display, so she never has to
  wonder whether the double space means something.
- **Fidelity note, not shown to her:** `print(obj)` gives
  `<__main__.Shield object>` in Skulpt and `<__main__.Shield object at 0x7f…>` in
  CPython. Teaching block 5 is `runnable` with the Skulpt text as its documented
  `output`, which is correct for this runtime. Lesson 20's graduation section is
  where the general point gets made.
- `super()` with no arguments works in Skulpt (verified). The explicit
  `SkyWatch.__init__(self)` form also works; the side quest uses `super()`
  because that is what she will read in real code everywhere.
- **No `source` check in this lesson sets `raw: true`.** Every requirement is
  syntax — `class SkyWatch`, `def __init__(self)`, `self.priority`, `def rank(self`,
  `self.rank(`, `register_tower("archer"`, `class Frostbite(SkyWatch)`,
  `super().__init__()` — and survives comment and literal stripping.
  `register_tower("archer"` includes the opening quote of a literal but not a
  complete literal, so the skeleton still contains it; verified against
  `sourceSkeleton` in `checker.js`.
- **b3 and the side quest each carry an honest caveat in their own section** —
  b3 because a single well-written `choose_target` also wins it, the side quest
  because the towers alone win it. Both are held by their `also` checks. Neither
  brief may claim more than the battle actually proves; the wording in each
  section is the wording to ship.
- No `input()` anywhere in this lesson, so nothing blocks on a prompt.
- The side quest must render behind an "optional" marker and must not count
  toward the lesson-completion condition, per `07-curriculum.md`'s rule that side
  quests never block.
