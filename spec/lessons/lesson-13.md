# Lesson 13 — Daedalus' Blueprints · שרטוטי דדלוס

> **Act IV — The Titan's Curse · קללת הטיטאן** · Stop 13 of 20
> Structure follows `spec/lessons/lesson-01.md` (the reference lesson) and the
> schema in `spec/04-lesson-template.md`.

| | |
| --- | --- |
| **id** | `13` |
| **slug** | `daedalus-blueprints` |
| **minutes** | 25–30 |
| **concepts** | `def`, calling a function, one parameter, why functions exist |
| **new vocabulary** | `def`, פונקציה / function, פרמטר / parameter, ארגומנט / argument, קריאה לפונקציה / call |
| **requires** | L1 `print` · L2 variables · L3 f-strings · L6 `if` + הזחה · L8 `for` · L9 lists |
| **item** | 📐 שרטוט הכנפיים / The Wing Blueprint |
| **control model** | **build script** — her code runs once, before the wave (`spec/09-battle-game.md`) |
| **towers unlocked** | 🏹 archer, 💣 cannon |
| **XP** | 20 + 25 + 30 + 30 (training battles) + 55 (great battle) + 30 (bonus) = **190** |
| **drachmas** | 5 + 6 + 8 + 8 + 14 = **41** 🪙 |

## Teaching goal

By the end she can write `def name(parameter):`, call it, pass one argument, and
call it from inside a `for` loop.

But the technical goal is the small half. **The real goal is that she wants
functions.** A 14-year-old will not care about `def` because an adult says it is
good practice. She will care the moment she has copied the same four lines three
times and Chiron asks her to change the border character. That moment has to
happen *inside the lesson*, before the word `def` is ever spoken.

So the lesson order is: pain → relief → name the thing.

Explicitly **not** in this lesson: `return` (L14), more than one parameter (L14),
default values (L14), scope (L14). One new idea. A function here is *a name for
a block of code that does something*, and that is enough for one evening.

Lesson 13 is the last lesson of the **build script** model. Everything she writes
still runs once, before the wave starts, and the game's own targeting decides who
gets shot. Tomorrow that changes, and the whole of Act IV bends around it — so
today should feel like the top of the stairs, not a plateau.

## Story beat

Act IV opens. The camp has changed: everyone is preparing for a quest into the
Labyrinth, and nobody has a map. Annabeth is copying passage descriptions by hand
onto three separate scrolls and losing her patience.

Chiron takes her (and the learner) to a locked room in the Big House where a
cedar chest holds sheets of vellum covered in Daedalus' handwriting. Daedalus
built a maze nobody escapes — and he built it from drawings he made **once** and
used **hundreds of times**.

The Prophecy panel (6 lines, no code):

> שלושה ימים את מעתיקה את אותן שורות, שוב ושוב.
> כירון מביט במסך שלך ולא אומר מילה.
> אחר כך הוא פותח תיבת ארז ישנה ומוציא ממנה גיליון קלף.
> "דדלוס בנה מבוך שאיש לא יצא ממנו. הוא לא בנה אותו פעמיים."
> "הוא צייר שרטוט אחד, ואז השתמש בו שוב ושוב ושוב."
> "היום את לומדת לצייר שרטוט."

Cast: Chiron (teaches), Annabeth (copying scrolls, the one who feels the pain
first), Grover (offers to hold the scrolls, drops them).

## Chiron Teaches — block by block

1. **prose** — הפתיחה. עד עכשיו כתבת תוכניות שנקראות מלמעלה למטה, שורה אחרי
   שורה. זה עבד. עכשיו יש בעיה חדשה: יש קוד שאת רוצה להריץ **יותר מפעם אחת**,
   במקומות שונים בתוכנית. לולאה פותרת חלק מזה — אבל רק כשהחזרות צמודות זו לזו.
   *(Frames the gap precisely: she already has `for`. Functions are not "repeat";
   they are "repeat, from anywhere, whenever I say the name".)*

2. **code (runnable)** — **הכאב.** זה הבלוק החשוב ביותר בשיעור. הרצה ראשונה
   בתוך 60 שניות, והיא מסתכלת על קוד מכוער שהיא עצמה כתבה בשיעורים קודמים.
   ```python
   print("=== CAMPER CARD ===")
   print("Name: Annabeth")
   print("===================")

   print("=== CAMPER CARD ===")
   print("Name: Grover")
   print("===================")

   print("=== CAMPER CARD ===")
   print("Name: Clarisse")
   print("===================")
   ```
   Output:
   ```
   === CAMPER CARD ===
   Name: Annabeth
   ===================
   === CAMPER CARD ===
   Name: Grover
   ===================
   === CAMPER CARD ===
   Name: Clarisse
   ===================
   ```
   Caption: תשע שורות קוד. שלוש כרטיסיות. שתי שורות מתוך כל שלוש הן העתקה.

3. **prose** — **הכאב, בשמו.** עכשיו כירון מבקש שינוי אחד: הכוכביות משעממות,
   הוא רוצה `*** CAMPER CARD ***`. כמה שורות את צריכה לשנות? שש. ואם תשכחי אחת,
   כרטיסייה אחת תיראה שונה מהשאר ולא תביני למה. **קוד משוכפל הוא המקום שבו באגים
   נולדים.** לא בגלל שהוא ארוך — בגלל שהוא צריך להשתנות בשישה מקומות בבת אחת.
   *(Do not soften this. The pain is the motivation. She should feel mildly
   annoyed here — that annoyance is what makes the next block land.)*

4. **code (runnable)** — **ההקלה.** אותו פלט בדיוק, בקוד אחר:
   ```python
   def card(name):
       print("=== CAMPER CARD ===")
       print(f"Name: {name}")
       print("===================")

   card("Annabeth")
   card("Grover")
   card("Clarisse")
   ```
   Output: identical to block 2 — say so out loud in the caption.
   Caption: אותו פלט בדיוק. עכשיו הכוכביות מופיעות במקום אחד. שינוי אחד משנה את
   כל הכרטיסיות.

5. **prose** — **עכשיו נותנים לזה שם.** אחרי שהיא ראתה את זה עובד:
   - `def` — הפקודה שאומרת "אני מגדירה שרטוט חדש".
   - `card` — השם שנתת לו. את בוחרת אותו.
   - `(name)` — ה**פרמטר**: החלק בשרטוט שמשתנה בכל פעם.
   - `:` — סוף שורת ההגדרה. כמו ב-`if` וב-`for`.
   - הגוף **מוזח** — כל השורות המוזחות שייכות לפונקציה.
   - `card("Annabeth")` — **קריאה** לפונקציה. השם עם סוגריים. מה שבתוך הסוגריים
     נקרא **ארגומנט**.
   הכלל במשפט אחד: **פונקציה היא שם שנתת לחתיכת קוד, כדי שתוכלי להריץ אותה מתי
   שאת רוצה.**

6. **code (runnable)** — הגדרה היא לא הרצה. זה הבלוק שמונע את אי-ההבנה מספר אחת.
   ```python
   def warn():
       print("Something moved in the trees.")

   print("Nothing has happened yet.")
   warn()
   warn()
   ```
   Output:
   ```
   Nothing has happened yet.
   Something moved in the trees.
   Something moved in the trees.
   ```
   Caption: שימי לב לסדר. שורת ה-`def` לא הדפיסה כלום. היא רק **בנתה** את
   הפונקציה. רק `warn()` מריץ אותה — ואפשר להריץ אותה כמה פעמים שרוצים.

7. **callout · tip** — כותרת: *"פונקציה בלי סוגריים לא רצה"*.
   `warn` לבד בשורה לא עושה כלום. `warn()` מריץ. הסוגריים הם הכפתור.

8. **compare** — הפרמטר הוא כל ההבדל.
   - **bad** — `label`: פונקציה שיודעת לומר שם אחד בלבד
     ```python
     def greet():
         print("Welcome to camp, Annabeth.")

     greet()
     greet()
     ```
     שתי הקריאות מדפיסות בדיוק את אותו דבר. חסכת שורות, לא קיבלת גמישות.
   - **good** — `label`: `name` הופך את השרטוט לשימושי
     ```python
     def greet(name):
         print(f"Welcome to camp, {name}.")

     greet("Annabeth")
     greet("Grover")
     ```
     הפרמטר הוא החור בשרטוט שאת ממלאת בכל בנייה מחדש.

9. **error** — סדר הקריאה. שגיאה אמיתית, בהקשר בטוח:
   ```python
   sound_horn()

   def sound_horn():
       print("The conch shell sounds.")
   ```
   Error: `NameError: name 'sound_horn' is not defined`
   Explain: פייתון קוראת מלמעלה למטה. כשהיא הגיעה לשורה 1, ההגדרה עוד לא קרתה,
   ולכן השם `sound_horn` עדיין לא קיים בשבילה. **מגדירים למעלה, קוראים למטה.**
   זו אותה שגיאה שראית כשכתבת שם של משתנה לפני שנתת לו ערך — פייתון מתייחסת
   לשמות של פונקציות בדיוק כמו לשמות של משתנים.

10. **error** — מספר הארגומנטים. (Wording flagged for verification — see
    Implementation notes.)
    ```python
    def greet(name):
        print(f"Welcome, {name}.")

    greet()
    ```
    Error: `TypeError: greet() takes exactly 1 argument (0 given)`
    Explain: הגדרת שרטוט עם חור אחד, ולא נתת שום דבר למלא בו. אם בסוגריים של
    ה-`def` יש פרמטר אחד — בסוגריים של הקריאה צריך להיות ארגומנט אחד. פייתון לא
    ממציאה ערך במקומך, וטוב שכך.

11. **callout · warn** — כותרת: *"ההזחה קובעת איפה הפונקציה נגמרת"*.
    ```python
    def card(name):
        print("=== CAMPER CARD ===")
    print(f"Name: {name}")
    ```
    השורה השנייה יצאה החוצה מהפונקציה — היא כבר לא חלק ממנה, והיא תרוץ מיד
    ותתלונן על `name`. **השורה הראשונה שחוזרת לשוליים היא כבר מחוץ לפונקציה.**
    בדיוק כמו ב-`if` וב-`for` שכבר מכירה.

12. **code (runnable)** — פונקציה בתוך לולאה. כאן שני הכלים נפגשים, ופה היא
    מרגישה כוח:
    ```python
    campers = ["Annabeth", "Grover", "Clarisse", "Percy"]

    def roll_call(name):
        print(f"{name} is present.")

    for camper in campers:
        roll_call(camper)
    ```
    Output:
    ```
    Annabeth is present.
    Grover is present.
    Clarisse is present.
    Percy is present.
    ```
    Caption: הלולאה מחליטה **כמה פעמים**. הפונקציה מחליטה **מה קורה בכל פעם**.
    שתי החלטות נפרדות, וזה בדיוק העניין.

13. **callout · myth** — כותרת: *"למה דווקא דדלוס"*.
    דדלוס היה הממציא הגדול של המיתולוגיה: המבוך של כרתים, הכנפיים של איקרוס,
    צעצועים שזזו לבד. הוא לא בנה כל כנף מאפס — הוא צייר שרטוט אחד והשתמש בו שוב.
    זו בדיוק הסיבה שהמילה `def` קיימת. *(Keep it two or three sentences; the myth
    aside is seasoning, not a history lesson.)*

14. **prose + code (runnable: false)** — **ועכשיו על שדה הקרב.** כל מה שראית
    עד כאן היה עם `print`, כי ככה קל לראות מה קורה. אבל שרטוט לא חייב להדפיס
    משהו. הוא יכול לבנות משהו:
    ```python
    def build_wall(row):
        place_tower("archer", 2, row)
        place_tower("archer", 5, row)
        place_tower("archer", 8, row)

    build_wall(1)
    build_wall(4)
    build_wall(7)
    ```
    Caption: תשעה מגדלים בחמש שורות קוד. שורת ה-`def` לא בנתה כלום — היא רק
    הסבירה מה זו חומה. שלוש הקריאות הן שבנו.

15. **callout · warn** — כותרת: *"שריון אוכל נזק"*.
    לפני שבונים חומה מול משהו כבד: נזק לכל מכה הוא **הנזק פחות השריון**, ולא
    פחות מ-1. קשת מכה 10, ולקיקלופ עם שריון 5 היא מורידה 5 — חצי. תותח מכה 28
    ומוריד לו 23. זה מה שהופך את השאלה "איזה מגדל" לשאלה אמיתית ולא לטעם אישי.
    *(This is the single fact that makes level L3 solvable rather than arbitrary.
    It belongs in the teaching, not only in the brief.)*

## Try It (ungraded)

Free-play editor. Nothing checked, nothing scored.

```python
def war_cry(name):
    print(f"{name} raises her sword!")
    print("The camp answers.")

war_cry("Annabeth")
war_cry("Clarisse")
```

Intro: *"המגרש שלך. שני את מה שהפונקציה מדפיסה, קראי לה עם שמות אחרים, קראי לה
עשר פעמים. כלום פה לא נבדק — תשברי אותה בכוונה אם בא לך, זה החלק הכיפי."*

## The battle levels

**Control model: build script** (`spec/09-battle-game.md`). Everything she writes
runs once, before the wave. `choose_target` does not exist yet — that is tomorrow.

Every level below has been simulated headless against `assets/js/battle/sim.js`.
The recorded outcomes are in the Implementation notes; they are facts, not
estimates.

Two maps carry the whole lesson so she learns terrain once and then thinks about
code:

**`ROAD` — the practice road** (12 × 7). One straight lane along row 4.

**`SNAKE` — the switchback** (11 × 8). Three straight legs, along rows 0, 3 and
6, joined at the ends. The rows *between* the legs — 1, 4 and 7 — are the good
build rows, because a tower standing there covers **two** legs at once. That is
the whole reason `build_wall(row)` takes a row and not a column.

```js
SNAKE = [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],
         [10,1],[10,2],
         [10,3],[9,3],[8,3],[7,3],[6,3],[5,3],[4,3],[3,3],[2,3],[1,3],[0,3],
         [0,4],[0,5],
         [0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6]]
```

---

### L1 — The First Blueprint · 20 XP, 5 🪙

**Why this mechanic:** three towers, one line of code that describes a tower.
The function already exists in the starter and does nothing until she calls it —
which is the one idea that has to land before anything else: **defining is not
running.**

**brief:** כירון כבר צייר לך שרטוט. הפונקציה `guard` יודעת להציב קשת ליד השביל —
היא מקבלת עמודה אחת, ובונה שם. ההגדרה כבר כתובה, וכשאת מריצה עכשיו לא קורה כלום,
כי אף אחד לא קרא לה.

קראי ל-`guard` שלוש פעמים, עם `2`, עם `5` ועם `8`. שלוש שורות, שלושה מגדלים.

```js
map: { cols: 12, rows: 7,
       path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4]] },
gold: 200, campHp: 3, seed: 11, allowed: ["archer"],
waves: [
  { delay: 0, enemies: [{ kind: "satyr", count: 5, gap: 1.0 }] },
  { delay: 9, enemies: [{ kind: "harpy", count: 4, gap: 1.1 }] },
],
```

**starter:**
```python
def guard(x):
    place_tower("archer", x, 3)

# call guard three times, below this line
```

**solution:**
```python
def guard(x):
    place_tower("archer", x, 3)

guard(2)
guard(5)
guard(8)
```

**check:**
```js
{ kind: "battle",
  also: { kind: "source", mustInclude: ["guard("],
    message: { he: "המשימה הזאת דורשת קריאות ל-guard, לא שורות place_tower ידניות",
               en: "This level needs calls to guard, not hand-written place_tower lines" } } }
```

**hints:**
1. הרצת, ולא הופיע אף מגדל. ההגדרה של `guard` נמצאת שם — אז מה חסר כדי שהיא
   באמת תרוץ?
2. קריאה לפונקציה היא השם שלה עם סוגריים ומספר בפנים: `guard(2)`. שימי לב
   שהקריאות יושבות **בשוליים**, בלי הזחה — הן לא חלק מהפונקציה.
3. שלוש שורות מתחת להגדרה, צמודות לשוליים: `guard(2)`, `guard(5)`, `guard(8)`.
   כל אחת מהן מריצה את הגוף של הפונקציה מחדש עם `x` אחר, ולכן מקבלים שלושה
   מגדלים במקומות שונים.

---

### L2 — One Line, Three Rows · 25 XP, 6 🪙

**Why this mechanic:** nine towers. Writing nine `place_tower` lines by hand is
possible and miserable; writing one `def build_wall(row)` and calling it for
three rows is the same defense in five lines. This is the level the lesson is
named after.

**brief:** השביל מתקפל שלוש פעמים, ומגיע גל אמיתי: 57 מפלצות. מגדל שעומד בשורה
**בין** שני מקטעי שביל יורה על שניהם.

בני חומה: פונקציה `build_wall` שמקבלת `row` ומציבה שלוש קשתות באותה שורה, בעמודות
`2`, `5` ו-`8`. אחר כך קראי לה עבור שורות `1`, `4` ו-`7`.

יש לך 460 זהב וקשת עולה 50 — בדיוק תשעה מגדלים ועוד עשרים לעודף.

```js
map: { cols: 11, rows: 8, path: SNAKE },
gold: 460, campHp: 3, seed: 21, allowed: ["archer"],
waves: [
  { delay: 0, enemies: [{ kind: "satyr",     count: 22, gap: 0.3 }] },
  { delay: 4, enemies: [{ kind: "harpy",     count: 22, gap: 0.3 }] },
  { delay: 9, enemies: [{ kind: "hellhound", count: 13, gap: 0.6 }] },
],
```

**starter:**
```python
def build_wall(row):
    place_tower("archer", 2, row)

build_wall(1)
```

**solution:**
```python
def build_wall(row):
    place_tower("archer", 2, row)
    place_tower("archer", 5, row)
    place_tower("archer", 8, row)

build_wall(1)
build_wall(4)
build_wall(7)
```

**check:**
```js
{ kind: "battle",
  also: { kind: "source", mustInclude: ["def build_wall"],
    message: { he: "החומה חייבת להיבנות מפונקציה אחת בשם build_wall",
               en: "The wall has to come from one function called build_wall" } } }
```

**hints:**
1. שורת קריאה אחת בונה כרגע מגדל אחד. כמה מגדלים יש בחומה שלמה, וכמה שורות
   `place_tower` זה אומר **בתוך** הפונקציה?
2. הגוף של `build_wall` הוא שלוש שורות מוזחות, וכולן משתמשות ב-`row` בתור ה-y.
   העמודות קבועות: 2, 5, 8. מתחת לפונקציה צריכות להיות שלוש קריאות.
3. גוף הפונקציה: `place_tower("archer", 2, row)`, ומתחתיו אותו דבר עם 5 ועם 8.
   מתחת להגדרה, בשוליים: `build_wall(1)`, `build_wall(4)`, `build_wall(7)`.
   אם בנית רק שתי חומות — שתי מפלצות עוברות. עם חומה אחת עוברות שלוש.

---

### L3 — Change It Once · 30 XP, 8 🪙

**Why this mechanic:** the payoff. The starter is nine hand-written archer lines
that **lose the battle** — cyclopes have armour 5, and an archer that does 10
damage does 5 to them. The fix is one word, `"cannon"`. In the starter that word
appears nine times. In a function it appears twice. She feels the difference
instead of being told about it.

**brief:** הקוד שלפנייך כבר בנוי — תשע שורות, תשע קשתות — והוא **מפסיד**. הריצי
וראי למה: קיקלופים עוטים שריון 5, וקשת שמכה 10 מורידה להם 5 בלבד.

התותח מכה 28. הוא איטי יותר, יקר יותר, והוא התשובה היחידה לשריון.

הפכי את תשע השורות לפונקציה אחת `build_wall(row)` שמציבה **שני תותחים** בשורה,
בעמודות `2` ו-`7` — ואז קראי לה עבור `1`, `4` ו-`7`. שישה תותחים, 540 מתוך 560
זהב.

```js
map: { cols: 11, rows: 8, path: SNAKE },
gold: 560, campHp: 3, seed: 31, allowed: ["archer", "cannon"],
waves: [
  { delay: 0, enemies: [{ kind: "hellhound", count: 6, gap: 0.7 }] },
  { delay: 6, enemies: [{ kind: "cyclops",   count: 7, gap: 0.7 }] },
],
```

**starter:** (deliberately the losing defense, written out longhand)
```python
place_tower("archer", 2, 1)
place_tower("archer", 5, 1)
place_tower("archer", 8, 1)
place_tower("archer", 2, 4)
place_tower("archer", 5, 4)
place_tower("archer", 8, 4)
place_tower("archer", 2, 7)
place_tower("archer", 5, 7)
place_tower("archer", 8, 7)
```

**solution:**
```python
def build_wall(row):
    place_tower("cannon", 2, row)
    place_tower("cannon", 7, row)

build_wall(1)
build_wall(4)
build_wall(7)
```

**check:**
```js
{ kind: "battle",
  also: { kind: "source", mustInclude: ["def build_wall"],
    message: { he: "המסגרת משתנה במקום אחד — כלומר בתוך פונקציה",
               en: "One change in one place means one function" } } }
```

**hints:**
1. הריצי את הקוד כמו שהוא וצפי בקיקלופים. כמה נזק באמת נכנס בכל חץ, ומה כתוב
   בטבלת המגדלים על התותח?
2. קודם הפכי את התשע לפונקציה אחת עם פרמטר `row`, ורק אחר כך שני את סוג המגדל.
   בפונקציה מספיקים שני מגדלים בשורה — תותח יקר, ושישה תותחים הם כל התקציב.
3. `def build_wall(row):` ובתוכו שתי שורות מוזחות:
   `place_tower("cannon", 2, row)` ו-`place_tower("cannon", 7, row)`. מתחת,
   בשוליים: `build_wall(1)`, `build_wall(4)`, `build_wall(7)`. שימי לב שהמילה
   `"cannon"` מופיעה עכשיו **פעמיים בסך הכול**. בקוד המקורי היית צריכה לשנות
   תשע שורות ולא לפספס אף אחת.

---

### L4 — The List of Walls · 30 XP, 8 🪙

**Why this mechanic:** the loop decides **how many times**, the function decides
**what happens each time**. Two separate decisions in two separate places — the
first time in the course that both of her repetition tools appear in the same
program on purpose.

**brief:** אותה חומה, אבל הפעם רשימת השורות נתונה מראש במשתנה `ROWS`. אל תכתבי
שלוש קריאות. כתבי לולאה אחת שעוברת על הרשימה וקוראת ל-`build_wall` עבור כל שורה
בתוכה.

```js
map: { cols: 11, rows: 8, path: SNAKE },
gold: 460, campHp: 3, seed: 45, allowed: ["archer"],
waves: [
  { delay: 0,  enemies: [{ kind: "satyr",     count: 20, gap: 0.3  }] },
  { delay: 5,  enemies: [{ kind: "harpy",     count: 20, gap: 0.35 }] },
  { delay: 11, enemies: [{ kind: "hellhound", count: 12, gap: 0.6  }] },
],
```

**starter:**
```python
ROWS = [1, 4, 7]

def build_wall(row):
    place_tower("archer", 2, row)
    place_tower("archer", 5, row)
    place_tower("archer", 8, row)

# one loop, below this line
```

**solution:**
```python
ROWS = [1, 4, 7]

def build_wall(row):
    place_tower("archer", 2, row)
    place_tower("archer", 5, row)
    place_tower("archer", 8, row)

for row in ROWS:
    build_wall(row)
```

**check:**
```js
{ kind: "battle",
  also: { kind: "source", mustInclude: ["def build_wall", "for"],
    message: { he: "כאן צריך גם את הפונקציה וגם לולאת for שעוברת על ROWS",
               en: "This one needs both the function and a for loop over ROWS" } } }
```

**hints:**
1. הלולאה מוציאה מ-`ROWS` שורה אחת בכל סיבוב. מה את רוצה לעשות עם השורה הזאת?
2. בתוך הלולאה תהיה שורה אחת בלבד: קריאה ל-`build_wall`, כשמשתנה הלולאה הוא
   הארגומנט.
3. `for row in ROWS:` ומתחתיו, מוזח, `build_wall(row)`. שימי לב: `row` בלולאה
   ו-`row` בפרמטר של הפונקציה הם שני שמות נפרדים שבמקרה נבחר להם אותו שם. אפשר
   לקרוא ללולאה `for y in ROWS:` ו-`build_wall(y)` — זה יעבוד בדיוק אותו דבר.
   אם תוסיפי שורה רביעית ל-`ROWS`, השאר לא משתנה בכלל. זה כל העניין.

---

## The great battle — "The Workshop of Daedalus" · 55 XP, 14 🪙

**Why this mechanic:** two blueprints, not one. A watchtower is described by a
column; a stone wall is described by a row. Two functions, two lists, two loops
— and a wave that punishes bringing only one of them, because five cyclopes walk
in at the end and archers cannot cut through armour 5.

**brief:** בסדנה של דדלוס מצאת שני שרטוטים.

- `watchtower(x)` — עמדת קשת בשורה 4, בעמודה שנתת לה.
- `wall_of_stone(row)` — תותח בעמודה 6, בשורה שנתת לה.

הרשימות `COLUMNS` ו-`ROWS` כבר כתובות. בני את שתי הפונקציות והריצי כל אחת מהן על
הרשימה שלה בלולאה.

הגל האחרון הוא חמישה קיקלופים. חמש עמדות קשת לא יעצרו אותם — צריך גם אבן.
יש לך 780 זהב; ההגנה הבנויה עולה 520, אז יש מקום לנסות דברים.

```js
map: { cols: 20, rows: 11,
       path: [[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],
              [5,3],[5,4],[5,5],[5,6],[5,7],[5,8],
              [6,8],[7,8],[8,8],[9,8],[10,8],[11,8],[12,8],
              [12,7],[12,6],[12,5],[12,4],[12,3],
              [13,3],[14,3],[15,3],[16,3],[17,3],[18,3],[19,3]] },
gold: 780, campHp: 4, seed: 57, allowed: ["archer", "cannon"],
waves: [
  { delay: 0,  enemies: [{ kind: "satyr",     count: 14, gap: 0.4 }] },
  { delay: 6,  enemies: [{ kind: "harpy",     count: 14, gap: 0.4 }] },
  { delay: 14, enemies: [{ kind: "hellhound", count: 10, gap: 0.6 }] },
  { delay: 24, enemies: [{ kind: "cyclops",   count:  5, gap: 1.2 }] },
],
```

**starter:**
```python
COLUMNS = [3, 7, 10, 14, 17]
ROWS = [1, 7, 9]

# 1. watchtower(x) - an archer on row 4, at column x

# 2. wall_of_stone(row) - a cannon in column 6, on row row

# 3. a loop for each list
```

**solution:**
```python
COLUMNS = [3, 7, 10, 14, 17]
ROWS = [1, 7, 9]

def watchtower(x):
    place_tower("archer", x, 4)

def wall_of_stone(row):
    place_tower("cannon", 6, row)

for x in COLUMNS:
    watchtower(x)

for row in ROWS:
    wall_of_stone(row)
```

**check:**
```js
{ kind: "battle",
  also: { kind: "source",
    mustInclude: ["def watchtower", "def wall_of_stone", "for"],
    message: { he: "המשימה דורשת שתי פונקציות — watchtower ו-wall_of_stone — ולולאה לכל אחת",
               en: "The quest needs both functions — watchtower and wall_of_stone — and a loop for each" } } }
```

**hints:**
1. שתי הפונקציות נראות כמעט זהות, וההבדל ביניהן הוא בדיוק מה שהופך אותן לשתיים.
   באחת המספר שמשתנה הוא עמודה, ובשנייה הוא שורה. איזו מהן שמה תותח?
2. `watchtower(x)` היא שורה אחת: `place_tower("archer", x, 4)` — ה-4 קבוע.
   `wall_of_stone(row)` היא `place_tower("cannon", 6, row)` — ה-6 קבוע. אחר כך
   שתי לולאות נפרדות, אחת על `COLUMNS` ואחת על `ROWS`.
3. סדר הבנייה: קודם שתי ההגדרות, כל אחת עם שורה מוזחת אחת. אחר כך, בשוליים,
   `for x in COLUMNS:` ובתוכה `watchtower(x)`. ואז `for row in ROWS:` ובתוכה
   `wall_of_stone(row)`. אם השמטת את התותחים לגמרי, ההגנה תחזיק שלושה גלים
   ותיפול על הקיקלופים — נסי את זה בכוונה פעם אחת, כדי לראות מה שריון עושה.

## Reward & Recap

**Item**: 📐 **שרטוט הכנפיים / The Wing Blueprint** — "גיליון קלף בכתב ידו של
דדלוס. נכתב פעם אחת, נבנה אלף פעמים." (Bead #13 joins the necklace.)

**Achievements possible here**:
- *Blueprint* — הגדירה את הפונקציה הראשונה שלה
- *Nine Lines to Five* — ניצחה את L3 (הריפקטור הראשון בקורס)
- *Siege Master* — עברה את L2 בהגנה מושלמת בניסיון הראשון
- *No Hints Needed* — סיימה את השיעור בלי לפתוח רמז
- *Persistent* — ניצחה קרב אחרי חמש הרצות שנכשלו

**Recap bullets**:
- `def` מגדיר פונקציה — שם לחתיכת קוד
- הגדרה לא מריצה כלום. **הסוגריים בקריאה** הם מה שמריץ
- פרמטר הוא החלק שמשתנה בכל קריאה; מה שאת שולחת בפועל נקרא ארגומנט
- הגוף של הפונקציה מוזח, וההזחה היא מה שקובע איפה היא נגמרת
- קוד משוכפל הוא באג שמחכה לקרות — פונקציה משנה אותו במקום אחד
- הלולאה קובעת **כמה פעמים**, הפונקציה קובעת **מה קורה בכל פעם**
- שריון מוריד מהנזק של כל מכה: קשת שמכה 10 מורידה 5 לקיקלופ עם שריון 5

**Next teaser**: *"בנית תשעה מגדלים בחמש שורות. אבל מי שהחליט על מי הם יורים זה
עדיין המשחק, לא את. מחר זה מתהפך."*

## Common mistakes to anticipate

| She does | She sees | Hint / explainer must cover |
| --- | --- | --- |
| מגדירה ולא קוראת | אין פלט בכלל | הגדרה בונה שרטוט; רק קריאה מריצה |
| `battle_cry` בלי סוגריים | אין פלט, אין שגיאה | הסוגריים הם הכפתור |
| קוראת לפני ה-`def` | `NameError: name 'x' is not defined` | פייתון קוראת מלמעלה למטה |
| שוכחת `:` בסוף שורת ה-`def` | `SyntaxError: bad input on line N` | שורת `def` נגמרת בנקודתיים, כמו `if` ו-`for` |
| לא מזיחה את הגוף | `IndentationError: expected an indented block` | הגוף חייב להיות מוזח |
| מזיחה את הקריאה לתוך הפונקציה | אין פלט (או ריצה אינסופית) | הקריאה חיה מחוץ לפונקציה, בשוליים |
| `greet()` כשיש פרמטר | `TypeError: greet() takes exactly 1 argument (0 given)` | מספר הארגומנטים = מספר הפרמטרים |
| `greet("A", "B")` | `TypeError: greet() takes exactly 1 argument (2 given)` | אותו כלל מהכיוון השני |
| מנסה להשתמש ב-`name` מחוץ לפונקציה | `NameError: name 'name' is not defined` | לא לפתור כאן — לומר "זה נושא של שיעור 14" ולהמשיך |
| מגדירה את הפונקציה ולא קוראת לה | הקרב מתחיל בלי אף מגדל, והמנוע אומר "לא בנית אף מגדל" | אותה טעות מספר אחת, עכשיו עם מפלצות |
| מחליפה את הסדר: `place_tower(kind, y, x)` | מגדל בפינה שלא רואה כלום, או `offMap` | ראשון עמודה, שני שורה — כמו בשיעור 1 |
| בונה על השביל עצמו | הודעת `onPath` מהמנוע, הקרב לא מתחיל | מגדל עומד **ליד** השביל |
| בונה מגדל שביעי בלי זהב | `tooPoor`, והקרב נפסל | תקציב הוא חלק מהחידה, לא תקלה |
| שולחת `build_wall(0)` לשורה שהיא שביל | `onPath` | לבדוק את רשימת ה-path במפה |

השורה האחרונה חשובה: scope נלמד בשיעור 14. אם היא נתקלת בזה כאן, ההסבר הוא
"הפרמטר חי בתוך הפונקציה בלבד, ונדבר על זה מחר" — ולא הרצאה על מרחבי שמות.

## Implementation notes

- **Every level in this lesson was simulated headless** against
  `assets/js/battle/sim.js` before it was written down. Recorded outcomes:

  | Level | Solution | Empty program | The near miss that must lose |
  | --- | --- | --- | --- |
  | L1 | wins, 3/3 HP, 3 towers, 14s | loses | one call only → 3 leak |
  | L2 | wins, 3/3 HP, 9 towers, 38s | loses | two walls → 2 leak · one wall → 3 leak |
  | L3 | wins, 3/3 HP, 6 cannons, 41s | loses | nine archers (the starter) → 3 leak · the same function with archers → 3 leak |
  | L4 | wins, 3/3 HP, 9 towers, 39s | loses | `ROWS = [1, 4]` → 1 leaks |
  | great | wins, 4/4 HP, 8 towers, 55s | loses | archers only, no cannons → 4 leak |

  `tools/verify-python.mjs` re-asserts the first two columns on every build. The
  third column is this lesson's design and should be re-checked by hand if any
  wave is retuned.
- **Skulpt**: `def`, פרמטר יחיד, קריאה, קריאה מתוך לולאה — כולם ב-matrix המאומת
  (`01-architecture.md`: "functions with defaults and `*args`"). אין פה שום דבר
  חריג.
- **L3's starter is deliberately a losing defense**, so the content file must mark
  it (`brokenStarter` is for code that does not *run*; this code runs fine and
  loses). `verify-python.mjs` only asserts that a starter executes, which it does.
  The UI must show the loss as "here is what happened", never as "you failed".
- **Verify the exact `TypeError` wording** in teach block 10 with
  `node tools/verify-python.mjs` before shipping. Skulpt's argument-count message
  differs from CPython 3.11 (which says
  `greet() missing 1 required positional argument: 'name'`). The block must show
  **whatever Skulpt actually prints**, because that is what she will see. If the
  wordings diverge badly, keep the Skulpt text in the `error` block and add one
  Hebrew line: "בפייתון האמיתי הניסוח קצת שונה — הכוונה זהה."
- **Every graded level is `check: { kind: "battle", also: { kind: "source", … } }`.**
  The battle half is the game; the `source` half is the lesson. Both must pass,
  and the `also` rule always carries its own `message`, because a level that fails
  without saying why is worse than no level. `also` also accepts an **array** of
  rules if a level ever needs a construct and a printed line at once.
- **`source` checks here inspect the stripped skeleton** (comments and string
  literals removed), so `mustInclude: ["def"]` cannot be satisfied by a comment
  reading `# def`. None of this lesson's requirements are comments or literals,
  so no check needs `raw: true`.
- **No `input()` anywhere in this lesson.** Nothing blocks on a prompt, so all
  checks are single-run and fast.
- **Every starter in this lesson runs without a syntax error before she writes
  anything.** Stub bodies carry a placeholder statement (`print(n)`, `return 0`)
  rather than a bare comment, because a comment-only body raises
  `IndentationError` the moment she presses Run — an error that teaches nothing
  and reads as "you broke it before you started".
- **The `also: { kind: "source" }` checks are what make the concept compulsory.**
  A level she could beat by hand-writing nine `place_tower` lines would not teach
  `def`, so every graded level here carries one, each with its own `message`.
  `mustInclude: ["def build_wall"]` is matched against the comment- and
  string-stripped skeleton, so a comment reading `# def build_wall` cannot satisfy
  it, and no check needs `raw: true`.
- **Tower coordinates were checked against the path lists.** On `SNAKE`, columns
  2, 5, 8 on rows 1, 4 and 7 are all grass, and every one of them is within an
  archer's 2.6 range of two legs at once. Rows 1 and 4 sit one cell from the leg
  above and two from the leg below; row 7 covers only the last leg, which is why
  it is the wall she is most tempted to skip and the one L2 punishes her for
  skipping.
- **L3's cannons cost 90 and the budget is 560**, so six is the maximum and a
  seventh raises `tooPoor`. The tight budget is deliberate: it is what stops
  "build more of everything" from being an answer.
- **Groups listed inside a single `waves` entry spawn sequentially** — the clock
  accumulates across them, so every wave in this lesson is its own entry with its
  own `delay`. Do not merge them.
- **Rocks are unbuildable** and raise an `onRock` build error. No level here
  defines `map.rock`, so nothing in this lesson is affected — but a future
  decorative rock added to `SNAKE` at columns 2, 5, 7 or 8 on rows 1, 4 or 7
  would silently break `build_wall`.
- **No harpies appear in any level that allows cannons except the great battle**,
  where archers cover the air. Cannons cannot hit flying enemies
  (`spec/09-battle-game.md`), and a cannon watching harpies drift past looks
  identical to a badly placed tower.
- `LC.hero()` may be substituted into the prose of the story beat, but **not**
  into example code or expected output — her name is free text and would break
  every `normalized` comparison.
