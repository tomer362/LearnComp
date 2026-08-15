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
| **XP** | 20 + 20 + 25 + 25 (training) + 50 (quest) + 30 (bonus) = **170** |
| **drachmas** | 5 + 5 + 7 + 7 + 13 = **37** 🪙 |

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
a block of code that prints something*, and that is enough for one evening.

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

## Training exercises

### e1 — The First Blueprint · 20 XP, 5 🪙

**brief:** הגדירי פונקציה בשם `battle_cry` בלי פרמטרים, שמדפיסה שורה אחת:
`FOR CAMP HALF-BLOOD!` — ואז קראי לה פעם אחת.

**starter:**
```python
# הגדירי כאן את הפונקציה

# וקראי לה כאן
```

**solution:**
```python
def battle_cry():
    print("FOR CAMP HALF-BLOOD!")

battle_cry()
```

**check** (two objects, both must pass — same pattern as lesson 1 e1):
```js
{ kind: "source", mustInclude: ["def"],
  message: { he: "המשימה הזאת דורשת פונקציה — שורה שמתחילה ב-def",
             en: "This one needs a function — a line starting with def" },
  also: { kind: "output", mode: "normalized", expect: "FOR CAMP HALF-BLOOD!" } }
```
*Deliberately almost free — a success in the first minute of training. The
`source` check is what stops her from writing a bare `print` and moving on.*

**hints:**
1. הפונקציה קיימת בקוד שלך? ואם כן — מי קורא לה? נסי להריץ ולראות מה יוצא.
2. שתי חתיכות: שורה שמתחילה ב-`def battle_cry():` ואחריה שורה מוזחת עם ה-`print`,
   ואז — בשוליים, בלי הזחה — שורה שכתוב בה `battle_cry()`.
3. `def battle_cry():` בשורה הראשונה. מתחת, מוזח בארבעה רווחים,
   `print("FOR CAMP HALF-BLOOD!")`. שורה ריקה. ואז, צמוד לשוליים, `battle_cry()`
   — הסוגריים הם מה שמריץ.

### e2 — Name the Hero · 20 XP, 5 🪙

**brief:** כתבי פונקציה `greet` שמקבלת פרמטר אחד בשם `name` ומדפיסה
`Welcome to camp, <name>.` — וקראי לה שלוש פעמים: Annabeth, Grover, Clarisse.

**starter:**
```python
def greet(name):
    # מה היא מדפיסה?

greet("Annabeth")
```

**solution:**
```python
def greet(name):
    print(f"Welcome to camp, {name}.")

greet("Annabeth")
greet("Grover")
greet("Clarisse")
```

**check:**
```js
{ kind: "output", mode: "normalized",
  expect: "Welcome to camp, Annabeth.\nWelcome to camp, Grover.\nWelcome to camp, Clarisse." }
```

**hints:**
1. בתוך הפונקציה, `name` הוא משתנה רגיל לכל דבר. איך הכנסת ערך של משתנה לתוך
   טקסט בשיעור 3?
2. השתמשי ב-f-string: `print(f"Welcome to camp, {name}.")`. ואז — עוד שתי קריאות
   מתחת לקיימת.
3. גוף הפונקציה הוא שורה אחת מוזחת עם ה-f-string. מתחת לפונקציה, בשוליים, שלוש
   שורות: `greet("Annabeth")`, `greet("Grover")`, `greet("Clarisse")`. שימי לב
   לנקודה בסוף המשפט — הבדיקה משווה גם אותה.

### e3 — One Change, Everywhere · 25 XP, 7 🪙

**This is the exercise the whole lesson exists for.** She is handed the ugly
duplicated code from teach block 2 and asked to do exactly what hurt: change the
border — but only after turning it into a function.

**brief:** הקוד שלפנייך מדפיס שלוש כרטיסיות, והוא משוכפל שלוש פעמים. הפכי אותו
לפונקציה אחת בשם `card` עם פרמטר `name`, ואז שני את המסגרת מ-`===` ל-`***`
במקום אחד בלבד.

**starter:**
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

**solution:**
```python
def card(name):
    print("*** CAMPER CARD ***")
    print(f"Name: {name}")
    print("*******************")

card("Annabeth")
card("Grover")
card("Clarisse")
```

**check:**
```js
{ kind: "source", mustInclude: ["def"],
  message: { he: "המשימה הזאת דורשת פונקציה אחת במקום שלוש חזרות",
             en: "This one needs one function instead of three copies" },
  also: { kind: "output", mode: "normalized",
    expect: "*** CAMPER CARD ***\nName: Annabeth\n*******************\n*** CAMPER CARD ***\nName: Grover\n*******************\n*** CAMPER CARD ***\nName: Clarisse\n*******************" } }
```
*Nineteen asterisks in the bottom border (the same width as the original 19
equals signs). State the exact border strings in the brief so width is never the
thing that fails her. `normalized` protects her from trailing spaces.*

**hints:**
1. שלוש הכרטיסיות זהות חוץ מדבר אחד. מה הדבר הזה? הוא הפרמטר שלך.
2. הזיזי את שלוש שורות ה-`print` הראשונות לתוך `def card(name):`, החליפי את
   `"Name: Annabeth"` ב-f-string עם `{name}`, ומחקי את שני העותקים האחרים לגמרי.
3. אחרי שיש פונקציה אחת, שינוי המסגרת נעשה פעמיים בסך הכול — בשורה העליונה
   ובתחתונה של הפונקציה. שורת הכותרת היא `"*** CAMPER CARD ***"` והתחתונה היא
   19 כוכביות. מתחת לפונקציה: שלוש קריאות, `card("Annabeth")` וכן הלאה. שימי לב
   שהקריאות **לא** מוזחות.

### e4 — The Roll Call · 25 XP, 7 🪙

**brief:** יש לך רשימת שומרים. כתבי פונקציה `report` עם פרמטר `name` שמדפיסה
`<name> reports to the Big House.` — והפעילי אותה על כל שם ברשימה בעזרת לולאת
`for`. אל תכתבי את הקריאה שלוש פעמים.

**starter:**
```python
guards = ["Argus", "Chiron", "Clarisse"]

# הפונקציה שלך כאן

# והלולאה כאן
```

**solution:**
```python
guards = ["Argus", "Chiron", "Clarisse"]

def report(name):
    print(f"{name} reports to the Big House.")

for guard in guards:
    report(guard)
```

**check:**
```js
{ kind: "source", mustInclude: ["def", "for"],
  message: { he: "כאן צריך גם פונקציה (def) וגם לולאת for",
             en: "This one needs both a function (def) and a for loop" },
  also: { kind: "output", mode: "normalized",
    expect: "Argus reports to the Big House.\nChiron reports to the Big House.\nClarisse reports to the Big House." } }
```

**hints:**
1. הלולאה עוברת על הרשימה ומוציאה שם אחד בכל סיבוב. מה את רוצה לעשות עם השם הזה
   בכל סיבוב?
2. בתוך הלולאה תהיה שורה אחת בלבד: קריאה לפונקציה, כשמשתנה הלולאה הוא הארגומנט.
3. `for guard in guards:` ואז, מוזח, `report(guard)`. שימי לב: `guard` הוא השם
   שהלולאה נותנת לאיבר הנוכחי, והוא נכנס לפונקציה ומקבל שם חדש בפנים — `name`.
   שני שמות לאותו ערך, וזה תקין לגמרי.

## Quest — "The Workshop of Daedalus" · 50 XP, 13 🪙

**brief:** דדלוס השאיר רשימת חלקים לכנפיים. בני מערכת שרטוטים: פונקציה
`blueprint` עם פרמטר `part` שמדפיסה כרטיס בן ארבע שורות לכל חלק, והריצי אותה על
כל החלקים ברשימה בעזרת לולאה. בסוף הדפיסי שורת סיום אחת.

הפלט המדויק לכל חלק:
```
=== DAEDALUS WORKSHOP ===
Part: bronze wing
Status: ready to build
---
```
ואחרי כל החלקים, שורה אחת: `All parts ready.`

**starter:**
```python
parts = ["bronze wing", "gear ring", "wax seal"]

# 1. הגדירי כאן את blueprint(part)

# 2. הפעילי אותה על כל חלק ברשימה

# 3. הדפיסי את שורת הסיום
```

**solution:**
```python
parts = ["bronze wing", "gear ring", "wax seal"]

def blueprint(part):
    print("=== DAEDALUS WORKSHOP ===")
    print(f"Part: {part}")
    print("Status: ready to build")
    print("---")

for item in parts:
    blueprint(item)

print("All parts ready.")
```

**check:**
```js
{ kind: "source", mustInclude: ["def", "for"],
  message: { he: "המשימה דורשת פונקציה אחת ולולאה אחת",
             en: "The quest needs one function and one loop" },
  also: { kind: "output", mode: "normalized",
    expect: "=== DAEDALUS WORKSHOP ===\nPart: bronze wing\nStatus: ready to build\n---\n=== DAEDALUS WORKSHOP ===\nPart: gear ring\nStatus: ready to build\n---\n=== DAEDALUS WORKSHOP ===\nPart: wax seal\nStatus: ready to build\n---\nAll parts ready." } }
```

**hints:**
1. שלוש עשרה שורות פלט — ורק ארבע מהן שונות זו מזו. איזו פונקציה תדפיס ארבע
   שורות בכל קריאה?
2. גוף הפונקציה הוא ארבע שורות `print`, ורק אחת מהן משתמשת ב-`part`. השורה
   `All parts ready.` **לא** נמצאת בתוך הפונקציה — אחרת היא תודפס שלוש פעמים.
3. סדר הבנייה: קודם `def blueprint(part):` עם ארבע שורות מוזחות. אחר כך, בשוליים,
   `for item in parts:` ובתוכה `blueprint(item)`. ולבסוף, בשוליים ואחרי הלולאה,
   `print("All parts ready.")`. אם שורת הסיום מודפסת שלוש פעמים — היא מוזחת יותר
   מדי.

## Reward & Recap

**Item**: 📐 **שרטוט הכנפיים / The Wing Blueprint** — "גיליון קלף בכתב ידו של
דדלוס. נכתב פעם אחת, נבנה אלף פעמים." (Bead #13 joins the necklace.)

**Achievements possible here**:
- *Blueprint* — הגדירה את הפונקציה הראשונה שלה
- *Nine Lines to Five* — סיימה את e3 (הריפקטור הראשון בקורס)
- *No Hints Needed* — סיימה את השיעור בלי לפתוח רמז
- *Persistent* — פתרה תרגיל אחרי חמש הרצות שנכשלו

**Recap bullets**:
- `def` מגדיר פונקציה — שם לחתיכת קוד
- הגדרה לא מריצה כלום. **הסוגריים בקריאה** הם מה שמריץ
- פרמטר הוא החלק שמשתנה בכל קריאה; מה שאת שולחת בפועל נקרא ארגומנט
- הגוף של הפונקציה מוזח, וההזחה היא מה שקובע איפה היא נגמרת
- קוד משוכפל הוא באג שמחכה לקרות — פונקציה משנה אותו במקום אחד

**Next teaser**: *"הפונקציות שלך יודעות לדבר. מחר נלמד אותן לחזור עם משהו ביד —
ואנבת' צריכה מפה."*

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

השורה האחרונה חשובה: scope נלמד בשיעור 14. אם היא נתקלת בזה כאן, ההסבר הוא
"הפרמטר חי בתוך הפונקציה בלבד, ונדבר על זה מחר" — ולא הרצאה על מרחבי שמות.

## Implementation notes

- **Skulpt**: `def`, פרמטר יחיד, קריאה, קריאה מתוך לולאה — כולם ב-matrix המאומת
  (`01-architecture.md`: "functions with defaults and `*args`"). אין פה שום דבר
  חריג.
- **Verify the exact `TypeError` wording** in teach block 10 with
  `node tools/verify-python.mjs` before shipping. Skulpt's argument-count message
  differs from CPython 3.11 (which says
  `greet() missing 1 required positional argument: 'name'`). The block must show
  **whatever Skulpt actually prints**, because that is what she will see. If the
  wordings diverge badly, keep the Skulpt text in the `error` block and add one
  Hebrew line: "בפייתון האמיתי הניסוח קצת שונה — הכוונה זהה."
- **Two-object checks** (`source` + `output`) follow the lesson-01 e1/e4 pattern.
  `checker.js` must accept an array of check objects and pass only if all pass;
  the failure message shown is the first failing one, so order matters — put the
  `source` check first so "you need a function here" is what she reads.
- **No `input()` anywhere in this lesson.** Nothing blocks on a prompt, so all
  checks are single-run and fast.
- All output checks are `normalized`. The `===`/`***` borders are the only
  place where character-exact width matters; the brief and hint 3 both state the
  widths (19 characters) so the border is never the hidden failure.
- e3's starter is intentionally the *exact* code from teach block 2. Reusing the
  same nine lines is what makes the refactor feel like relief rather than a new
  puzzle.
- `LC.hero()` may be substituted into the prose of the story beat, but **not**
  into example code or expected output — her name is free text and would break
  every `normalized` comparison.
