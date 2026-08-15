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
| **XP** | 20 + 25 + 25 + 30 (training) + 55 (quest) + 30 (bonus) = **185** |
| **drachmas** | 5 + 6 + 6 + 8 + 14 = **39** 🪙 |

## Teaching goal

By the end she can `import` a module, call a function that lives inside it with
the dot syntax, and — the part that matters — she has **a game on her screen that
she wants to run again**.

This is the payoff lesson of Act IV. Lessons 13 and 14 were structural and quiet;
this one is loud. Everything she has learned since lesson 1 (variables, `if`,
`while`, `break`, lists, f-strings, `def`, `return`, defaults) assembles into
about thirty lines of code that produce a different fight every time she presses
Run. Nothing before this point in the course has surprised her. This does.

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
   שם משתנה שלא הוגדר — בשביל פייתון, `random` הוא פשוט שם שאין לו ערך. שורת
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

12. **code (runnable)** — הצצה למה שנבנה בסוף השיעור, סיבוב אחד של קרב. כל שורה
    כאן היא משהו שהיא כבר יודעת, חוץ מ-`random`:
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
    כל זה מאתמול. הדבר היחיד החדש הוא שורה אחת של `random`. במשימה נוסיף לולאה
    ונקבל משחק.

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

## Training exercises

### e1 — Roll the Bones · 20 XP, 5 🪙

**brief:** ייבאי את `random` והדפיסי גלגול אחד של קובייה רגילה — מספר שלם בין 1
ל-6, כולל שניהם.

**starter:**
```python
# שורת import כאן

# והגלגול כאן
```

**solution:**
```python
import random

print(random.randint(1, 6))
```

**check:**
```js
{ kind: "source", mustInclude: ["import random", "randint"],
  message: { he: "כאן צריך import random ואת הפונקציה randint",
             en: "This one needs import random and the randint function" } }
{ kind: "output", mode: "regex", expect: "^[1-6]\\s*$" }
```
*The regex accepts only 1–6, so `randint(0, 6)` or `randint(1, 5)` will pass
sometimes and fail sometimes — which is a real property of random code and worth
a line in the success message: "הרצה אחת לא מוכיחה כלום. הריצי חמש."*

**hints:**
1. פייתון לא יודעת מה זה `random` עד שביקשת. מה חסר בשורה הראשונה?
2. `random.randint(a, b)` מחזירה מספר שלם בין `a` ל-`b`, כולל שניהם. היא
   **מחזירה** — אז צריך משהו שיציג את הערך.
3. שתי שורות: `import random` למעלה, ואז `print(random.randint(1, 6))`. אם כתבת
   `randint(1, 6)` בלי `random.` לפני — פייתון לא תמצא אותה.

### e2 — Pinning the Thread · 25 XP, 6 🪙

**brief:** הוכיחי ש-`random.seed` עובד. קבעי seed, שמרי גלגול אחד במשתנה `first`.
קבעי **את אותו seed שוב**, ושמרי גלגול נוסף במשתנה `second`. הדפיסי
`Same thread: True` אם השניים זהים — בלי לכתוב `True` בעצמך.

**starter:**
```python
import random

random.seed(11)
first = random.randint(1, 20)

# קבעי שוב את אותו seed ושמרי גלגול שני

print(f"Same thread: {first == second}")
```

**solution:**
```python
import random

random.seed(11)
first = random.randint(1, 20)

random.seed(11)
second = random.randint(1, 20)

print(f"Same thread: {first == second}")
```

**check:**
```js
{ kind: "source", mustInclude: ["random.seed"],
  message: { he: "המשימה הזאת דורשת random.seed",
             en: "This one needs random.seed" } }
{ kind: "output", mode: "normalized", expect: "Same thread: True" }
```
*This is the one seed exercise in the course whose expected output is safe: it
compares two runs **inside Skulpt** instead of hard-coding a generated number.
Never bake a specific seeded value into a check — see Implementation notes.*

**hints:**
1. אם היו מגלגלים פעמיים ברצף, האם `first == second` היה יוצא `True`? מה צריך
   לקרות באמצע כדי שכן?
2. `random.seed(11)` מחזיר את החוט לאותה נקודת התחלה. צריך לקרוא לו שוב לפני
   הגלגול השני, עם אותו מספר בדיוק.
3. שתי שורות במקום ההערה: `random.seed(11)` ואז `second = random.randint(1, 20)`.
   שימי לב שהשוואה `first == second` מחזירה `True` או `False` בעצמה — לכן לא
   כותבים את המילה `True` בשום מקום.

### e3 — Choice of Weapons · 25 XP, 6 🪙

**brief:** בחדר הנשק יש שלושה פריטים: `sword`, `spear`, `shield`. בחרי אחד
באקראי והדפיסי `You draw the sword.` (או spear, או shield).

**starter:**
```python
import random

weapons = ["sword", "spear", "shield"]

# בחרי אחד באקראי והדפיסי משפט
```

**solution:**
```python
import random

weapons = ["sword", "spear", "shield"]

choice = random.choice(weapons)
print(f"You draw the {choice}.")
```

**check:**
```js
{ kind: "source", mustInclude: ["random.choice"],
  message: { he: "כאן צריך את random.choice על הרשימה",
             en: "This one needs random.choice on the list" } }
{ kind: "output", mode: "regex", expect: "^You draw the (sword|spear|shield)\\.\\s*$" }
```

**hints:**
1. יש לך רשימה. איזו פונקציה במודול `random` מקבלת רשימה ומחזירה איבר אחד?
2. `random.choice(weapons)` **מחזירה** את הפריט עצמו, כמחרוזת. איפה מכניסים
   מחרוזת לתוך משפט?
3. שמרי את התוצאה: `choice = random.choice(weapons)`, ואז
   `print(f"You draw the {choice}.")`. שימי לב לנקודה בסוף המשפט — הבדיקה
   מחפשת אותה. אפשר גם לכתוב את הכול בשורה אחת בתוך ה-f-string.

### e4 — The Distance to Olympus · 30 XP, 8 🪙

**brief:** אנבת' צריכה חישוב, לא הימור. מהמחנה למבוך יש 7 סטדיונים מזרחה ו-11
צפונה. חשבי את המרחק הישיר עם משפט פיתגורס בעזרת `math.sqrt`, והדפיסי אותו
מעוגל לשתי ספרות. אחר כך חשבי כמה ימי מסע צריך אם הולכים 4 סטדיונים ליום —
ומכיוון שאי אפשר לצאת לחצי יום, עגלי **למעלה**.

הפלט המדויק:
```
Distance: 13.04 stadia
Days of travel: 4
```

**starter:**
```python
import math

dx = 7
dy = 11

# 1. distance עם math.sqrt ו-**

# 2. שורת הפלט הראשונה, עם round

# 3. days עם math.ceil, ושורת הפלט השנייה
```

**solution:**
```python
import math

dx = 7
dy = 11

distance = math.sqrt(dx ** 2 + dy ** 2)
print(f"Distance: {round(distance, 2)} stadia")

days = math.ceil(distance / 4)
print(f"Days of travel: {days}")
```

**check:**
```js
{ kind: "source", mustInclude: ["import math", "math.sqrt", "math.ceil"],
  message: { he: "המשימה דורשת math.sqrt ו-math.ceil",
             en: "This one needs math.sqrt and math.ceil" } }
{ kind: "output", mode: "normalized",
  expect: "Distance: 13.04 stadia\nDays of travel: 4" }
```
*√(49+121) = √170 = 13.038…, so `round(…, 2)` is `13.04` and `ceil(13.038/4)` is
`ceil(3.259…)` = 4. Note that `math.ceil` must be applied to the **unrounded**
distance; using the rounded value happens to give the same answer here, which is
deliberate — a wrong-but-passing path she cannot be punished for.*

**hints:**
1. משפט פיתגורס: הצלע הארוכה בריבוע היא סכום שתי האחרות בריבוע. איזה אופרטור
   משיעור 4 מעלה בחזקה, ואיזו פונקציה במודול `math` מוציאה שורש?
2. `math.sqrt(dx ** 2 + dy ** 2)` נותן את המרחק. לעיגול בתצוגה יש את `round`
   משיעור 4, ולעיגול כלפי מעלה יש את `math.ceil`.
3. שלוש שורות חישוב: `distance = math.sqrt(dx ** 2 + dy ** 2)`, אחר כך
   `print(f"Distance: {round(distance, 2)} stadia")`, ואז
   `days = math.ceil(distance / 4)` ו-`print(f"Days of travel: {days}")`. אם
   קיבלת `13.038404810405297` — שכחת את `round`. אם קיבלת `3` ימים — עיגלת למטה
   במקום למעלה.

## Quest — "The Dice of Fate" · 55 XP, 14 🪙

**A game she can actually play.** Roughly thirty lines, every one of them made of
something she already owns. It ends differently about half the time, and pressing
Run again is the reward.

**brief:** על סף המבוך יושבת ספינקס וחוסמת את הדרך. בני קרב תורות:
- `roll()` — מחזירה מספר בין 1 ל-6.
- `strike(name, target_hp, bonus=2)` — מגלגלת, מחשבת נזק (`הגלגול + bonus`),
  ואם הגלגול הוא 6 — הנזק **מוכפל** ומודפסת שורת `CRITICAL HIT!`. מדפיסה את
  שורת המכה ומחזירה את ה-HP החדש של המותקף.
- לולאת `while` שרצה כל עוד לשני הצדדים יש HP חיובי: את מכה ראשונה; אם הספינקס
  נפל — `break` מיד, כדי שלא תחטפי מכה ממפלצת מובסת. אחרת הספינקס מכה חזרה עם
  `bonus` של 3, ומודפסת שורת מצב.
- בסוף: הודעת ניצחון או הודעת נסיגה.

שני הצדדים מתחילים עם 25 HP.

**starter:**
```python
import random

def roll():
    return random.randint(1, 6)

def strike(name, target_hp, bonus=2):
    dice = roll()
    damage = dice + bonus
    # אם dice הוא 6 — הכפילי את הנזק והדפיסי CRITICAL HIT!

    print(f"{name} hits for {damage}!")
    return target_hp - damage

hero_hp = 25
sphinx_hp = 25
round_number = 1

# הלולאה שלך כאן

# ובסוף — מי ניצח?
```

**solution:**
```python
import random

def roll():
    return random.randint(1, 6)

def strike(name, target_hp, bonus=2):
    dice = roll()
    damage = dice + bonus
    if dice == 6:
        damage = damage * 2
        print(f"{name} rolls a 6. CRITICAL HIT!")
    print(f"{name} hits for {damage}!")
    return target_hp - damage

hero_hp = 25
sphinx_hp = 25
round_number = 1

while hero_hp > 0 and sphinx_hp > 0:
    print(f"--- Round {round_number} ---")
    sphinx_hp = strike("Hero", sphinx_hp)
    if sphinx_hp <= 0:
        break
    hero_hp = strike("Sphinx", hero_hp, 3)
    print(f"Hero: {hero_hp} HP | Sphinx: {sphinx_hp} HP")
    round_number = round_number + 1

if sphinx_hp <= 0:
    print("The Sphinx bows its head. The road into the Labyrinth is open.")
else:
    print("You fall back to camp. Ambrosia, and again tomorrow.")
```

**check:**
```js
{ kind: "source", mustInclude: ["import random", "def strike", "while", "return"],
  message: { he: "המשימה דורשת random, את הפונקציה strike, ולולאת while",
             en: "The quest needs random, the strike function, and a while loop" } }
{ kind: "output", mode: "regex",
  expect: "(The Sphinx bows its head|You fall back to camp)" }
```
*The output check is deliberately loose: the fight is different every run, so the
only thing that can be asserted is that it **finished** with one of the two
endings. The `source` check carries the structural requirements. Balance is
tuned so the hero wins roughly half the time (simulated over 4,000 fights:
~50%, average 3–4 rounds) — losing has to be possible or winning means nothing.*

**hints:**
1. הלולאה צריכה להיעצר בשני מקרים שונים. איזה תנאי אחד מכסה את שניהם? ומה
   התפקיד של ה-`break` באמצע הסיבוב?
2. `while hero_hp > 0 and sphinx_hp > 0:` — בפנים: שורת הכותרת של הסיבוב, מכה
   שלך שמעדכנת את `sphinx_hp`, בדיקה `if sphinx_hp <= 0: break`, מכה של הספינקס
   שמעדכנת את `hero_hp`, שורת מצב, וקידום `round_number`. שימי לב שכל מכה היא
   השמה: `sphinx_hp = strike(...)`.
3. הביקורת הכי חשובה: `strike` **מחזירה** את ה-HP החדש, אז חייבים לשמור אותו
   חזרה למשתנה — `sphinx_hp = strike("Hero", sphinx_hp)`. אם תכתבי רק
   `strike("Hero", sphinx_hp)` הנזק יודפס וייעלם, וההודעה "-25 HP" לא תגיע לעולם
   והלולאה לא תיגמר. הספינקס מכה עם ארגומנט שלישי, `strike("Sphinx", hero_hp, 3)`,
   כי היא חזקה ממך. הכפלת הקריטי היא `damage = damage * 2` בתוך
   `if dice == 6:`, לפני שורת ה-`print` של המכה.

**Optional extension (not required, no XP):** *"רוצה שהמשחק ישאל אותך לפני כל
סיבוב?"* — add `input("Press Enter to roll")` at the top of the loop. Flag in the
UI that this version cannot be auto-checked, and that it is hers to keep.

## Reward & Recap

**Item**: 🎲 **קוביות הגורל / The Dice of Fate** — "שתי קוביות עצם. אף אחת מהן
לא מבטיחה לך כלום, ובדיוק בגלל זה שווה לגלגל." (Bead #15.)

**Achievements possible here**:
- *First Import* — ייבאה מודול בפעם הראשונה
- *Critical Hit* — גלגלה 6 במשימה (המנוע יכול לזהות `CRITICAL HIT!` בפלט)
- *Play It Again* — הריצה את משחק המשימה חמש פעמים אחרי שכבר עברה אותה. **זה
  ההישג הכי חשוב בשיעור** — הוא מודד הנאה, לא ביצועים
- *No Hints Needed*, *Persistent*

**Recap bullets**:
- `import` מביא מודול — קוד שמישהו אחר כבר כתב ובדק
- הנקודה אומרת "שייך ל־": `random.randint`, `math.sqrt`
- `random.randint(1, 6)` כוללת את שני הקצוות; `range(1, 6)` עוצרת לפני 6
- `random.choice` בוחרת איבר מרשימה
- `random.seed` מקבע את סדרת האקראיים — שימושי כשמחפשים באג
- `math.ceil` מעגל תמיד למעלה, `math.floor` תמיד למטה
- משחק הוא לולאה, כמה פונקציות, ומעט מזל

**Next teaser**: *"את מוכנה. מחר נכנסים למבוך — ומגלים שיש בו חדרים שבתוכם יש
חדרים שבתוכם יש חדרים."*

## Common mistakes to anticipate

| She does | She sees | Hint / explainer must cover |
| --- | --- | --- |
| שוכחת `import` | `NameError: name 'random' is not defined` | בלוק השגיאה בשיעור; שורה אחת בראש הקובץ |
| `randint(1, 6)` בלי `random.` | `NameError: name 'randint' is not defined` | הנקודה היא חלק מהשם |
| `import Random` | `ImportError` / `File not found` | שמות מודולים באותיות קטנות |
| `random.randint(1, 6)` ומצפה ל-0 | לא רואה 0 לעולם | `randint` כוללת קצוות, ומתחילה איפה שאמרת |
| `random.choice("sword")` על מחרוזת | מקבלת אות בודדת | `choice` עובדת על רשימה; מחרוזת היא רצף תווים |
| שוכחת לשמור את מה ש-`strike` מחזירה | הקרב לא נגמר לעולם, ואז `TimeLimitError` | הבעיה מלמעלה — `return` בלי השמה הוא ערך שנזרק |
| `math.sqrt` על מספר שלילי | `ValueError: math domain error` | לא בתרגילים, אבל יופיע אם תשחק |
| מריצה פעם אחת ומסיקה שהקוד תקין | תרגיל שעובר ואז נכשל | "הרצה אחת לא מוכיחה כלום" — להגיד את זה במפורש |
| `while True:` בלי `break` | `TimeLimitError` אחרי 5 שניות | המנוע עוצר בבטחה; זו לא קריסה |

## Implementation notes

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
  3. e2 checks reproducibility (`first == second`), which is true in every
     implementation.
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
- **`regex` mode and trailing newlines**: e1 and e3 anchor with `^…\\s*$`.
  `checker.js` should run regex checks against the trimmed output; the `\\s*`
  is belt-and-braces so a stray newline never fails her.
- **The quest is the first exercise in the course whose output is not
  deterministic.** The success panel should say so: "עברת — והפלט שלך לא יהיה
  זהה בפעם הבאה. זה בכוונה."
- **Execution limit**: the fight is bounded (25 HP, minimum 3 damage per hit →
  at most ~9 rounds), so it can never hit the 5-second `execLimit`. The one way
  she can hang it is forgetting the assignment in `sphinx_hp = strike(...)` —
  covered in hint 3 and in the mistakes table, and the engine's friendly
  `TimeLimitError` message catches the rest.
- No `input()` in any graded exercise here; the optional interactive extension is
  the only place it appears, and it is explicitly ungraded.
