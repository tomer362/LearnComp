# Lesson 14 — The Map Maker · יוצרת המפות

> **Act IV — The Titan's Curse · קללת הטיטאן** · Stop 14 of 20
> Structure follows `spec/lessons/lesson-01.md` (the reference lesson) and the
> schema in `spec/04-lesson-template.md`.

| | |
| --- | --- |
| **id** | `14` |
| **slug** | `the-map-maker` |
| **minutes** | 30–35 |
| **concepts** | `return`, `None`, several parameters, default values, local scope |
| **new vocabulary** | `return`, `None`, ערך ברירת מחדל / default, scope / תחום חיים |
| **requires** | L13 `def` + פרמטר יחיד · L11–12 dicts ומבנים מקוננים · L9 lists · L6 `if` · L3 f-strings |
| **item** | 🗺️ מפת המבוך / The Labyrinth Map |
| **control model** | ⭐ **THE GRADUATION** — build script → **strategy function**. From this lesson on, the game calls her code. |
| **towers unlocked** | 🏹 archer, 💣 cannon |
| **XP** | 20 + 25 + 30 + 30 (training battles) + 60 (great battle) + 30 (bonus) = **195** |
| **drachmas** | 5 + 6 + 8 + 8 + 15 = **42** 🪙 |

## Teaching goal

By the end she can write a function that **returns** a value, store that value in
a variable, use it in arithmetic, pass it to another function, and collect
returns in a loop. She can also read a function and answer the question that
separates beginners from non-beginners: *"what does this hand back?"*

### This is the graduation, and it has to feel like one

For thirteen lessons her program has been a **script**: it ran from top to
bottom, it finished, and then the game did whatever the game was going to do. She
placed towers; the towers decided for themselves who to shoot.

Today that inverts. She writes `def choose_target(enemies):` — and never calls
it. **The battle calls it.** Once per tower, every time a tower is ready to fire,
about ten times a second, for the whole length of the fight. Her function is
inside the engine's loop now.

This is not a syntax change. It is the difference between *using* a machine and
*being part of one*, and it is the single largest step in the course. Three
things follow from it, and all three are load-bearing:

1. **`return` stops being a nicety and becomes the interface.** A `choose_target`
   that prints instead of returning hands the game `None`, and `None` means
   "hold fire". Every tower she owns stands still and watches. The `None` bug is
   no longer a wrong line of output; it is a lost battle.
2. **Her code can now crash the game.** A strategy function that raises ends the
   battle immediately as a defeat. Nothing she has written before could do that.
3. **She now has to beat a competent opponent.** Left alone, the towers target
   the enemy furthest along the path — a sensible rule. "Better than nothing" is
   no longer the bar. "Better than the default" is.

Every teaching decision in this lesson exists to make that inversion survivable:
the scouts, the `None` callout, the scope error, and the fact that the first
battle of the day asks for exactly one line.

**The central confusion this lesson exists to kill:** a function that `print`s
looks like it works, and then returns `None` and breaks everything downstream.
This is the single most common wall a beginner hits with functions. It gets a
dedicated `compare` block, a dedicated `error` block, and a dedicated debugging
battle of its own (L2). Do not let it be a footnote.

Scope is taught **through** `return`, not as a separate topic: a variable born
inside a function dies when the function ends — and `return` is how you get
something out before it does. That framing makes scope feel like a consequence
instead of a new rule to memorise.

## Story beat

Annabeth spreads a blank sheet of vellum on the table in the Big House and puts a
stone on each corner. She can draw the Labyrinth — she is a child of Athena, this
is what she does — but she needs numbers, and the numbers are inside the maze.

The learner sends a scout. The scout runs to the mouth of the Labyrinth, yells
something about "eleven, maybe twelve", and vanishes into the dark. Annabeth
stares at the blank sheet. Chiron raises an eyebrow. A scout who shouts is not a
scout. A scout who **comes back, holding something** — that is a scout.

Then, in the second half of the lesson, the same idea walks out onto the field.
Chiron takes her to the wall and tells her the archers have been aiming
themselves since she got here, and that this stops today. He does not hand her a
bow. He hands her the question the archers ask, and tells her to answer it.

The Prophecy panel (6 lines, no code):

> אנבת' פורשת קלף ריק על השולחן ומניחה אבן בכל פינה.
> "אני יכולה לצייר את המבוך," היא אומרת, "אם מישהו יביא לי מספרים."
> את שולחת סייר. הוא צועק משהו מרחוק, ונבלע בחושך.
> כירון מרים גבה. "צעקה היא לא מפה. סייר טוב חוזר, ובידיים שלו יש משהו."
> ואז הוא מוביל אותך אל החומה. "עד היום הקשתים כיוונו לבד. די בזה."
> "מהיום הם ישאלו אותך במי לירות. בכל פעם מחדש. תעני להם."

Cast: Annabeth (needs values, not noise — she is the reason `return` matters),
Chiron (the eyebrow, and then the wall), Grover (volunteers to be the scout, is
talked out of it, and later asks the question everyone is thinking: "אבל מי קורא
לפונקציה הזאת?").

**Staging note.** The `choose_target` half must not arrive as an afterthought in
the last two minutes. Teach blocks 1–15 are the scout; blocks 16–19 are the wall.
The transition between them is the beat of the lesson and should be given its own
prose block and its own callout, not a sentence.

## Chiron Teaches — block by block

1. **prose** — שני סוגים של סיירים. אחד עולה על גבעה וצועק מה הוא רואה: את שומעת
   אותו, ואז הקול נעלם ולא נשאר כלום. השני חוזר אליך ומניח בידך פתק. שתי
   הפונקציות שנכתוב היום נראות כמעט אותו דבר — וההבדל ביניהן הוא כל השיעור.

2. **code (runnable)** — הסייר הצועק. פונקציה כמו אלה שכתבת אתמול:
   ```python
   def scout_distance(steps):
       print(steps * 3)

   scout_distance(4)
   ```
   Output: `12`
   Caption: עבד. ראית 12 על המסך. עכשיו נסי להשתמש ב-12 הזה למשהו.

3. **error** — הרגע שבו זה נשבר. **הבלוק החשוב בשיעור.**
   ```python
   def scout_distance(steps):
       print(steps * 3)

   total = scout_distance(4) + 10
   print(total)
   ```
   Error: `TypeError: unsupported operand type(s) for +: 'NoneType' and 'int'`
   Explain: המספר 12 הודפס למסך — אבל הוא לא **חזר** אליך. `print` שולח טקסט
   למסך, לא לתוכנית. מה שהפונקציה החזירה בפועל נקרא `None`, כלומר "כלום", ואי
   אפשר לחבר כלום ועשר. הפלט על המסך הוא בשבילך; **ערך שחוזר** הוא בשביל
   התוכנית. *(Note in the block that the `12` still prints before the error —
   she must see that "it printed" and "it worked" are different claims.)*

4. **code (runnable)** — הפתרון, בשורה אחת שונה:
   ```python
   def scout_distance(steps):
       return steps * 3

   total = scout_distance(4) + 10
   print(total)
   print(scout_distance(10))
   ```
   Output:
   ```
   22
   30
   ```
   Caption: `return` מוסר את הערך בחזרה למי שקרא לפונקציה.

5. **prose** — הכלל, במשפט אחד: **הקריאה לפונקציה הופכת להיות הערך שהוחזר.**
   פייתון מריצה את `scout_distance(4)`, מקבלת 12, ומחליפה את כל הקריאה ב-12 —
   ואז ממשיכה לחשב `12 + 10`. לכן אפשר לשים קריאה לפונקציה בכל מקום שבו אפשר
   לשים מספר: בתוך חישוב, בתוך `if`, בתוך f-string, בתוך רשימה.

6. **compare** — `print` מול `return`. שתי הפונקציות מקבלות אותם ארגומנטים.
   - **bad** — `label`: מדפיסה, ומחזירה `None`
     ```python
     def add_damage(a, b):
         print(a + b)

     total = add_damage(3, 4)
     print(total)
     ```
     Output:
     ```
     7
     None
     ```
     ה-7 הראשון הוא מה שהפונקציה הדפיסה. ה-`None` הוא מה שהיא באמת נתנה לך.
   - **good** — `label`: מחזירה ערך שאפשר להמשיך איתו
     ```python
     def add_damage(a, b):
         return a + b

     total = add_damage(3, 4)
     print(total)
     print(total + 10)
     ```
     Output:
     ```
     7
     17
     ```
     Caption for the pair: אותו מספר על המסך, שתי תוכניות שונות לגמרי. אם את
     צריכה לראות — `print`. אם את צריכה להמשיך — `return`.

7. **callout · warn** — כותרת: *"`None` הוא לא אפס"*.
   כל פונקציה שאין בה `return` מחזירה `None`. `None` הוא לא 0, לא `""` ולא
   `False` — הוא "אין פה כלום". כשאת רואה `None` בפלט, השאלה הראשונה היא: איפה
   שכחתי `return`? *(This callout is the debugging reflex the lesson is trying to
   install. Word it as a diagnostic, not as a definition.)*

8. **code (runnable)** — `return` עוצר את הפונקציה מיד:
   ```python
   def check_gate(password):
       if password == "olympus":
           return "The gate opens."
       return "The gate stays shut."

   print(check_gate("olympus"))
   print(check_gate("hydra"))
   ```
   Output:
   ```
   The gate opens.
   The gate stays shut.
   ```
   Caption: ברגע שפייתון מגיעה ל-`return`, הפונקציה נגמרת. שורות שאחריו לא ירוצו.
   לכן לא צריך `else` כאן — אם התנאי התקיים, כבר יצאנו.

9. **prose + code (runnable)** — יותר מפרמטר אחד. הסדר קובע:
   ```python
   def power(attack, bonus):
       return attack + bonus * 2

   print(power(3, 10))
   print(power(10, 3))
   ```
   Output:
   ```
   23
   16
   ```
   Caption: אותם שני מספרים, סדר הפוך, תוצאה אחרת. הארגומנט הראשון נכנס לפרמטר
   הראשון. פייתון לא מנחשת מה התכוונת.

10. **callout · tip** — כותרת: *"שמות הפרמטרים הם שמות פנימיים"*.
    `attack` ו-`bonus` הם השמות שהפונקציה נותנת לערכים אצלה בפנים. בחוץ אפשר
    לשלוח משתנים בשמות אחרים לגמרי, או מספרים בלי שם בכלל. הפונקציה לא יודעת
    מאיפה הערכים הגיעו — ובגלל זה אפשר להשתמש בה מכל מקום.

11. **code (runnable)** — ערך ברירת מחדל:
    ```python
    def damage(attack, bonus=0):
        return attack + bonus

    print(damage(12))
    print(damage(12, 8))
    ```
    Output:
    ```
    12
    20
    ```
    Caption: `bonus=0` אומר "אם לא שלחו לי `bonus`, תשתמשי ב-0". פרמטר עם ברירת
    מחדל הוא פרמטר **אופציונלי** — הקריאה הראשונה חוקית לגמרי.

12. **callout · warn** — כותרת: *"ברירות מחדל תמיד בסוף"*.
    `def damage(bonus=0, attack):` הוא `SyntaxError`. פייתון ממלאת ארגומנטים לפי
    סדר, ולכן כל הפרמטרים החובה חייבים לבוא לפני האופציונליים. אם קיבלת שגיאת
    תחביר בשורת `def` — בדקי את הסדר. *(Kept as a callout rather than a runnable
    error block: a `SyntaxError` in the definition aborts the whole cell, so
    there is nothing to see. Exact Skulpt wording flagged below.)*

13. **error** — scope. השגיאה שמסבירה למה `return` בכלל קיים:
    ```python
    def scout():
        secret = "the way out"

    scout()
    print(secret)
    ```
    Error: `NameError: name 'secret' is not defined`
    Explain: `secret` נולד בתוך הפונקציה, וכשהפונקציה נגמרה הוא נעלם איתה.
    משתנה שנוצר בתוך פונקציה חי רק שם — קוראים לזה **scope**, תחום החיים שלו.
    זה לא באג בפייתון, זה בכוונה: אחרת כל פונקציה הייתה יכולה לדרוך על משתנים של
    כל פונקציה אחרת. הדרך היחידה להוציא משהו החוצה היא להחזיר אותו.

14. **code (runnable)** — התיקון, ובו כל הרעיון של השיעור:
    ```python
    def scout():
        secret = "the way out"
        return secret

    way = scout()
    print(way)
    ```
    Output: `the way out`
    Caption: הסייר חזר, ובידיים שלו משהו. `way` הוא הפתק.

15. **callout · myth** — כותרת: *"למה אנבת' ולא אתנה"*.
    בני אתנה לא מקבלים תשובות מהאלה — הם בונים אותן. מפה היא בדיוק זה: מישהו
    נכנס לחושך, חוזר עם מספרים, ומישהי הופכת מספרים לתמונה. `return` הוא הרגע
    שבו המספרים עוברים מיד ליד.

---

*(Everything above is the scout. Everything below is the wall. This line is the
graduation, and the page should mark it — a divider, a change of background, an
"Act IV, part two" heading. She should be able to point at the moment the course
changed shape.)*

16. **prose** — **הרגע שבו המשחק מתחיל לקרוא לך.** עד עכשיו כל תוכנית שכתבת
    רצה מלמעלה למטה, נגמרה, ואז המשחק עשה מה שהוא עושה. הצבת מגדלים,
    והמגדלים בחרו לבד במי לירות.

    היום זה מתהפך. את כותבת פונקציה אחת — ולא קוראת לה אף פעם. **המשחק
    קורא לה.** כל פעם שמגדל מוכן לירות ורואה משהו בטווח, הוא עוצר, שואל
    אותך, ועושה מה שאמרת. עשר פעמים בשנייה, לכל אורך הקרב.

    הקוד שלך כבר לא רץ לפני המשחק. הוא רץ **בתוך** המשחק.
    *(Do not soften this into "and now a new feature". Name it: she is writing a
    callback, and the whole rest of the course is built on it.)*

17. **code (runnable: false)** — החוזה, בארבע שורות:
    ```python
    def choose_target(enemies):
        return enemies[0]
    ```
    Caption: `enemies` היא רשימה של מילונים — כל המפלצות שהמגדל הזה רואה
    ברגע זה. מה שהפונקציה **מחזירה** הוא המטרה. זה כל החוזה.

    על העמוד מופיעה ליד הבלוק טבלת מילון אחת, אמיתית, מתוך קרב:
    ```python
    {"kind": "hellhound", "hp": 54, "max_hp": 70, "distance": 12.4,
     "speed": 1.4, "armour": 2, "flying": False, "x": 8.6, "y": 7.0}
    ```
    ומשפט אחד: `distance` הוא כמה עוד נשאר לה ללכת עד לשער — לא כמה הוא
    כבר הלך.

18. **callout · warn** — כותרת: *"`None` פירושו לא לירות"*.
    פונקציה בלי `return` מחזירה `None`, והמשחק קורא את `None` כ"החזיקו אש".
    כל המגדלים שלך יעמדו, יעקבו אחרי המפלצות, ולא יעשו כלום. זה לא קרס,
    וזה לא באג של המשחק — זה בדיוק מה שביקשת. השאלה הראשונה כשההגנה
    שותקת: איפה שכחתי `return`?

19. **callout · warn** — כותרת: *"פונקציה שנופלת — מפילה את הקרב"*.
    אם `choose_target` זורקת שגיאה — `IndexError` על רשימה קצרה מהצפוי,
    `KeyError` על מפתח שלא קיים — הקרב נעצר באותו רגע ונחשב כהפסד. לא
    מגדל אחד מפספס תור — הכול. המנוע יראה לך את השגיאה האמיתית, עם
    מספר השורה. זו לא הענשה, זו הודעה — והיא תופיע לך שוב בשיעור 18,
    כשנלמד לתפוס אותה במקום להיבהל ממנה.

## Try It (ungraded)

```python
def travel_time(distance, speed=5):
    return distance / speed

print(travel_time(100))
print(travel_time(100, 20))
print(travel_time(100, 2) + travel_time(50))
```

Intro: *"שחקי עם זה. שני את המספרים, שני את ברירת המחדל, נסי לקרוא לפונקציה בתוך
`print` ובתוך חישוב. ואם בא לך לראות משהו מוזר — החליפי את ה-`return` ב-`print`
והריצי שוב. שום דבר פה לא נבדק."*

*(That last suggestion is deliberate: reproducing the `None` bug on purpose, in a
place where nothing is at stake, is how it stops being frightening.)*

## The battle levels

**Control model: strategy function.** This is the lesson where it changes. From
here to lesson 18 her build script still runs first — but then the battle starts
calling `choose_target(enemies)`, once per tower, every time that tower is ready
to fire and has something in range. Ten times a second, her code decides.

What the game hands her, per enemy, is a `dict`:

```python
{"kind": "hellhound", "hp": 54, "max_hp": 70, "distance": 12.4,
 "speed": 1.4, "armour": 2, "flying": False, "x": 8.6, "y": 7.0}
```

What it accepts back — all four of these are verified working against
`assets/js/battle/pyapi.js`:

| She returns | The game does |
| --- | --- |
| the enemy `dict` itself | shoots it |
| `enemy["id"]` | shoots it |
| an index, e.g. `0` | shoots `enemies[0]` |
| `None` | **holds fire** — the tower does not shoot at all this round |

And the fifth case, which is the one worth teaching: **a `choose_target` that
raises ends the battle on the spot, as a loss.** Not "that tower skips a turn" —
the whole defense stops. `sim.js` catches the exception, `play.js` reports it, and
the real Python error is shown to her underneath. She should meet this on purpose
in L1 rather than by accident in the great battle.

### The default she is beating

With no `choose_target`, every tower shoots **the enemy furthest along the path**
— the leader. That is a good rule, and it is the reason the levels below are hard
to design and worth playing: her code has to be *better* than a reasonable
default, not better than nothing. The flaw in the default is that it never
commits. The moment something overtakes the thing it was shooting, it switches,
and the tanky monster it had been chipping away at walks free.

Every level below was verified three ways: her solution wins, an empty program
loses, **and the default targeting loses**. On top of that, every level was run
against a bank of eleven degenerate or plausible-but-wrong strategies
(`return 0`, `return None`, "shoot the weakest", "shoot the nearest to camp", and
so on) to make sure she cannot pass by guessing. Results are in the
Implementation notes.

### The maps

**`ROAD`** — one straight lane along row 4, 16 or 20 columns wide. Used by L1 and
L2 so that nothing about the terrain is new on the day the control model changes.

**`BEND`** (18 × 10) — down, across, up, out. Used by L3 and L4.

```js
BEND = [[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],
        [5,3],[5,4],[5,5],[5,6],[5,7],
        [6,7],[7,7],[8,7],[9,7],[10,7],[11,7],
        [11,6],[11,5],[11,4],[11,3],
        [12,3],[13,3],[14,3],[15,3],[16,3],[17,3]]
```

**`GAUNTLET`** (22 × 12) — four turns, used by the great battle.

---

### L1 — The Game Calls You · 20 XP, 5 🪙

**Why this mechanic:** the handshake. She writes a function she never calls, and
it runs anyway — hundreds of times. Nothing else in the course has done that, and
until she has seen it happen the rest of Act IV is guesswork.

The rule itself is one line: **`return enemies[0]`** — shoot whoever has been on
the field longest and stay on it. That beats the default here, and it is not a
coincidence. A cyclops walks in first; six satyrs pour past it. The game's
targeting follows whoever is furthest along, so it keeps switching to satyrs and
the cyclops strolls to the gate with two thirds of its health. `enemies[0]` is
the enemy that arrived first, and staying on it kills it.

**brief:** ארבעת המגדלים כבר בנויים — לא נוגעים בהם. מה שחסר הוא **החלטה**.

עד היום המשחק בחר לבד במי לירות: תמיד במי שהכי קרוב לשער. הריצי כך והסתכלי —
הקיקלופ עובר. המגדלים מחליפים מטרה בכל פעם שסאטיר עוקף אותו, והוא לא מת אף פעם.

עכשיו את מחליטה. כתבי פונקציה בשם `choose_target` שמקבלת `enemies` — רשימת
המפלצות שהמגדל רואה כרגע — ו**מחזירה** את זו שצריך לירות בה. הרשימה מסודרת לפי
מי הגיע לשדה קודם, אז `enemies[0]` היא הוותיקה מכולן.

את לא קוראת לפונקציה הזאת. המשחק קורא לה.

```js
map: { cols: 16, rows: 8, path: [[0,4],[1,4], … ,[15,4]] },
gold: 220, campHp: 3, seed: 3, allowed: ["archer"],
waves: [
  { delay: 0, enemies: [
      { kind: "cyclops", count: 1, gap: 1   },
      { kind: "satyr",   count: 6, gap: 1.1 } ] },
],
```

**starter:**
```python
place_tower("archer", 2, 3)
place_tower("archer", 4, 5)
place_tower("archer", 6, 3)
place_tower("archer", 8, 5)

def choose_target(enemies):
    return None
```

*(The stub returns `None`, which is legal and means "hold fire". Running the
starter shows four towers tracking monsters and never shooting, and the engine
says exactly that: "your towers saw monsters but never fired". That is a better
first lesson about `None` than any paragraph.)*

**solution:**
```python
place_tower("archer", 2, 3)
place_tower("archer", 4, 5)
place_tower("archer", 6, 3)
place_tower("archer", 8, 5)

def choose_target(enemies):
    return enemies[0]
```

**check:**
```js
{ kind: "battle",
  also: { kind: "source", mustInclude: ["def choose_target", "return"],
    message: { he: "השלב הזה דורש פונקציה בשם choose_target שמחזירה מפלצת",
               en: "This level needs a function called choose_target that returns a monster" } } }
```

**hints:**
1. הריצי כמו שזה. המגדלים רואים מפלצות ולא יורים — מה בדיוק הפונקציה מוסרת
   למשחק כרגע, ומה זה אומר לו?
2. `None` פירושו "לא יורים בסיבוב הזה". במקומו צריך להחזיר מפלצת מתוך הרשימה
   `enemies`. הרשימה מסודרת לפי סדר ההגעה לשדה.
3. שני את שורת הגוף ל-`return enemies[0]`. זה אומר "תמיד תירו בוותיקה ביותר
   שאתם רואים" — ומכיוון שהקיקלופ נכנס ראשון, המגדלים נשארים עליו עד שהוא נופל
   במקום לרדוף אחרי כל סאטיר שעוקף אותו.

---

### L2 — The Silent Towers · 25 XP, 6 🪙

**Why this mechanic:** the `None` trap, in the one place where it has teeth. In a
`print`-based exercise a missing `return` shows up as the word `None` in the
output. Here it shows up as **an entire defense standing still while the camp
burns**. Same bug, and now she will remember it.

**brief:** אותו רעיון, שדה ארוך יותר, וקוד שמישהו כבר כתב בשבילך — הוא רץ בלי
שגיאה, ובכל זאת אף מגדל לא יורה.

תקני את `choose_target` כך שההגנה תעבוד. שימי לב מה הפונקציה עושה עם המפלצת
שהיא בחרה: היא מדפיסה אותה. מה היא **מוסרת** למשחק?

```js
map: { cols: 20, rows: 8, path: [[0,4],[1,4], … ,[19,4]] },
gold: 220, campHp: 3, seed: 3, allowed: ["archer"],
waves: [
  { delay: 0, enemies: [
      { kind: "cyclops", count: 1, gap: 1   },
      { kind: "satyr",   count: 8, gap: 1.1 } ] },
],
```

**starter:** (runs, prints a great deal, loses)
```python
place_tower("archer", 2, 3)
place_tower("archer", 4, 5)
place_tower("archer", 6, 3)
place_tower("archer", 8, 5)

def choose_target(enemies):
    print(enemies[0])
```

**solution:**
```python
place_tower("archer", 2, 3)
place_tower("archer", 4, 5)
place_tower("archer", 6, 3)
place_tower("archer", 8, 5)

def choose_target(enemies):
    return enemies[0]
```

**check:**
```js
{ kind: "battle",
  also: { kind: "source", mustInclude: ["return enemies"],
    message: { he: "פונקציית אסטרטגיה צריכה להחזיר מפלצת, לא רק להדפיס אותה",
               en: "A strategy function has to return a monster, not only print it" } } }
```

**hints:**
1. יומן הקרב מלא בשורות, אז הפונקציה כן רצה, וכן בוחרת. אז למה המגדלים שותקים?
   מה קורה לערך שהיא בחרה אחרי שהוא הודפס?
2. `print` שולח למסך. הפונקציה עצמה לא מחזירה כלום — כלומר `None` — והמשחק קורא
   את זה כ"אל תירו". זה בדיוק אותו באג מהסייר הצועק, רק שהפעם רואים אותו על
   שדה הקרב.
3. מילה אחת: החליפי את `print(enemies[0])` ב-`return enemies[0]`. שורת ההדפסה
   נעלמת מהיומן, וזה בסדר — הפלט היה בשבילך, הערך שחוזר הוא בשביל המשחק.

---

### L3 — Nothing Stops the Harpies · 30 XP, 8 🪙

**Why this mechanic:** `if` inside a strategy, and `return` from the middle of a
loop. **A cannon cannot hit anything flying** (`spec/09-battle-game.md`), so the
three cannons on this map are blind to harpies by design. The two archers are the
entire air defense — and if they spend their time helping the cannons finish
hellhounds, the harpies fly over the camp wall. Her function has to say
"anything airborne, first, always", and the way to say it is a `return` that
leaves the function the moment it finds one.

**brief:** שלושה תותחים ושתי קשתות. התותחים חזקים — 28 נזק לכל פגז — אבל תותח
הוא ארטילריה: **הוא לא יכול לפגוע במשהו שעף**. ההרפיות שייכות לקשתות בלבד, ויש
רק שתיים כאלה.

בברירת המחדל הקשתות יורות במי שהכי קרוב לשער, וזה כמעט תמיד כלב גיהינום
שהתותחים כבר מטפלים בו. ההרפיות עוברות.

כתבי `choose_target` שבודקת קודם אם יש משהו מעופף ברשימה, ואם כן — מחזירה אותו
מיד. אם אין, שתחזיר את `enemies[0]`.

לכל מפלצת ברשימה יש מפתח `"flying"` שהערך שלו `True` או `False`.

```js
map: { cols: 18, rows: 10, path: BEND },
gold: 380, campHp: 3, seed: 17, allowed: ["archer", "cannon"],
waves: [
  { delay: 0,   enemies: [{ kind: "hellhound", count: 7, gap: 0.7 }] },
  { delay: 1.5, enemies: [{ kind: "harpy",     count: 6, gap: 0.7 }] },
  { delay: 9,   enemies: [{ kind: "cyclops",   count: 2, gap: 2.0 }] },
],
```

**starter:**
```python
place_tower("cannon", 4, 4)
place_tower("cannon", 6, 6)
place_tower("cannon", 9, 8)
place_tower("archer", 2, 3)
place_tower("archer", 9, 5)

def choose_target(enemies):
    return enemies[0]
```

**solution:**
```python
place_tower("cannon", 4, 4)
place_tower("cannon", 6, 6)
place_tower("cannon", 9, 8)
place_tower("archer", 2, 3)
place_tower("archer", 9, 5)

def choose_target(enemies):
    for e in enemies:
        if e["flying"]:
            return e
    return enemies[0]
```

**check:**
```js
{ kind: "battle",
  also: { kind: "source", mustInclude: ["flying"],
    message: { he: "כאן צריך לבדוק את המפתח flying בתוך choose_target",
               en: "This one needs the flying key checked inside choose_target" } } }
```

**hints:**
1. הריצי וצפי בתותחים כשהרפיה עוברת לידם. הם לא יורים בה. מי כן יכול, וכמה כאלה
   יש לך?
2. עברי על `enemies` בלולאה. ברגע שמצאת אחת ש-`e["flying"]` שלה `True` — אין סיבה
   להמשיך לחפש. `return` באמצע לולאה מסיים את הפונקציה כולה, לא רק את הסיבוב.
3. גוף הפונקציה: `for e in enemies:` ובתוכו `if e["flying"]:` ובתוכו `return e`.
   **אחרי** הלולאה, בשוליים של הפונקציה, `return enemies[0]` — זה מה שקורה כשאין
   אף מעופפת ברשימה. שימי לב שיש כאן שתי שורות `return` באותה פונקציה, וזה תקין
   לגמרי: הראשונה שמגיעים אליה היא זו שקובעת.

---

### L4 — The Measure of a Monster · 30 XP, 8 🪙

**Why this mechanic:** a function that returns a **number**, called from inside
another function. `threat` never touches the battle; it answers a question, and
`choose_target` uses the answer. That is composition, and it is also scope —
`enemy` lives inside `threat` and nowhere else.

The number matters: `hp * (armour + 1)`. Damage per hit is `max(1, damage -
armour)`, so armour is not decoration — a cyclops with 160 HP and armour 5 takes
five damage from an arrow that does ten, and is worth roughly six times its
health bar. Sorting by raw `hp` gets the same answer on this map; sorting by
`threat` will still get the right answer in lesson 20, when a monster with 80 HP
and armour 8 walks in.

**brief:** חמש קשתות, ארבעה כלבי גיהינום ושני קיקלופים. בברירת המחדל המגדלים
רודפים אחרי מי שקרוב לשער, מפזרים נזק על כולם, ולא מפילים אף אחד בזמן.

חשבי כמה כל מפלצת באמת שווה. שריון מוריד מכל מכה בנפרד, אז מפלצת עם שריון סופגת
הרבה יותר חצים מכפי שנראה בפס החיים שלה.

כתבי שתי פונקציות:
- `threat(enemy)` — **מחזירה מספר**: `hp` כפול `armour + 1`.
- `choose_target(enemies)` — עוברת על הרשימה ומחזירה את זו עם ה-`threat` הגבוה
  ביותר.

```js
map: { cols: 18, rows: 10, path: BEND },
gold: 260, campHp: 3, seed: 14, allowed: ["archer"],
waves: [
  { delay: 0,   enemies: [{ kind: "hellhound", count: 4, gap: 1.0 }] },
  { delay: 2.6, enemies: [{ kind: "cyclops",   count: 2, gap: 1.4 }] },
],
```

**starter:**
```python
place_tower("archer", 4, 4)
place_tower("archer", 6, 5)
place_tower("archer", 9, 6)
place_tower("archer", 12, 5)
place_tower("archer", 14, 4)

def threat(enemy):
    return 0

def choose_target(enemies):
    return enemies[0]
```

**solution:**
```python
place_tower("archer", 4, 4)
place_tower("archer", 6, 5)
place_tower("archer", 9, 6)
place_tower("archer", 12, 5)
place_tower("archer", 14, 4)

def threat(enemy):
    return enemy["hp"] * (enemy["armour"] + 1)

def choose_target(enemies):
    best = enemies[0]
    for e in enemies:
        if threat(e) > threat(best):
            best = e
    return best
```

**check:**
```js
{ kind: "battle",
  also: { kind: "source", mustInclude: ["def threat", "threat("],
    message: { he: "המשימה דורשת פונקציה בשם threat שמחזירה מספר, ושימוש בה בתוך choose_target",
               en: "This needs a function called threat that returns a number, used inside choose_target" } } }
```

**hints:**
1. `threat` מחזירה כרגע 0 לכל מפלצת, ולכן ההשוואה לא מבדילה בין כלום לכלום. מה
   המספר שאמור לצאת ממנה עבור קיקלופ עם 160 חיים ושריון 5?
2. `threat` היא שורה אחת: מחזירה `enemy["hp"]` כפול `(enemy["armour"] + 1)`.
   ב-`choose_target` השתמשי בתבנית "השומרת על הטוב ביותר": משתנה `best` שמתחיל
   מהאיבר הראשון, לולאה, והחלפה כשמוצאים גדול יותר.
3. `def threat(enemy):` עם `return enemy["hp"] * (enemy["armour"] + 1)`. ואז
   ב-`choose_target`: `best = enemies[0]`, `for e in enemies:`,
   `if threat(e) > threat(best):`, `best = e`, ובסוף — **אחרי** הלולאה —
   `return best`. אם ה-`return` יושב בתוך הלולאה, הפונקציה תיגמר אחרי המפלצת
   הראשונה. ואם תכתבי `print` במקום `return` בתוך `threat`, ההשוואה תנסה להשוות
   `None` ל-`None`, הפונקציה תזרוק שגיאה, והקרב ייגמר מיד — נסי גם את זה פעם
   אחת, זה שווה את זה.

---

## The great battle — "The Gauntlet" · 60 XP, 15 🪙

**Why this mechanic:** everything, and no towers given. She writes the build
script (functions and loops, from yesterday) *and* the strategy (from today), and
the wave is built so that each half alone is not enough: skip the cannons and the
seven cyclopes walk through; skip the flyer rule and eight harpies do; skip the
threat rule and the cyclopes arrive together and outlast her.

Verified: **no strategy from the degenerate bank wins this level.** Not the
default, not `return 0`, not "shoot the weakest", not "shoot the nearest to
camp". This one has to be reasoned.

**brief:** ארבע פניות, ארבעה גלים, 510 זהב.

תותח עולה 90, פוגע ב-28 ומתעלם ממה שעף. קשת עולה 50, פוגעת ב-10, ופוגעת בכול.
הרשימות `CANNONS` ו-`ARCHERS` כבר מסמנות משבצות טובות — בני מהן, בפונקציה
ובלולאה, כמו אתמול.

ואז כתבי `choose_target` שעושה שני דברים בסדר הזה:
1. אם יש משהו מעופף — לירות בו. הוא בטווח של הקשתות בלבד, ולא לאורך זמן.
2. אחרת — לירות במסוכנת ביותר, לפי `hp` כפול `armour + 1`.

```js
map: { cols: 22, rows: 12,
       path: [[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],
              [6,4],[6,5],[6,6],[6,7],[6,8],[6,9],
              [7,9],[8,9],[9,9],[10,9],[11,9],[12,9],[13,9],
              [13,8],[13,7],[13,6],[13,5],[13,4],[13,3],[13,2],
              [14,2],[15,2],[16,2],[17,2],[18,2],
              [18,3],[18,4],[18,5],[18,6],[18,7],
              [19,7],[20,7],[21,7]] },
gold: 510, campHp: 4, seed: 41, allowed: ["archer", "cannon"],
waves: [
  { delay: 0,  enemies: [{ kind: "satyr",     count: 14, gap: 0.35 }] },
  { delay: 5,  enemies: [{ kind: "harpy",     count: 12, gap: 0.45 }] },
  { delay: 12, enemies: [{ kind: "hellhound", count: 10, gap: 0.5  }] },
  { delay: 22, enemies: [{ kind: "cyclops",   count:  7, gap: 0.9  },
                         { kind: "harpy",     count:  8, gap: 0.5  }] },
],
```

**starter:**
```python
CANNONS = [[4, 5], [8, 8], [11, 7]]
ARCHERS = [[2, 2], [7, 4], [12, 5], [16, 1]]

# 1. cannon_nest(spot) and archer_post(spot), then a loop for each list

# 2. threat(enemy) -> a number

# 3. choose_target(enemies) -> flyers first, then the biggest threat
```

**solution:**
```python
CANNONS = [[4, 5], [8, 8], [11, 7]]
ARCHERS = [[2, 2], [7, 4], [12, 5], [16, 1]]

def cannon_nest(spot):
    place_tower("cannon", spot[0], spot[1])

def archer_post(spot):
    place_tower("archer", spot[0], spot[1])

for spot in CANNONS:
    cannon_nest(spot)

for spot in ARCHERS:
    archer_post(spot)

def threat(enemy):
    return enemy["hp"] * (enemy["armour"] + 1)

def choose_target(enemies):
    for e in enemies:
        if e["flying"]:
            return e
    best = enemies[0]
    for e in enemies:
        if threat(e) > threat(best):
            best = e
    return best
```

**check:**
```js
{ kind: "battle",
  also: { kind: "source",
    mustInclude: ["def choose_target", "flying", "def threat", "for"],
    message: { he: "הקרב הגדול דורש בנייה בלולאה, בדיקת flying, ופונקציית threat",
               en: "The great battle needs a build loop, a flying check, and a threat function" } } }
```

**hints:**
1. חלקי את המשימה לשניים ובדקי כל חצי בנפרד. קודם בני בלי אסטרטגיה בכלל והריצי:
   כמה מפלצות עוברות, ובאיזה גל? זה אומר לך אם הבעיה היא הבנייה או ההחלטה.
2. הבנייה היא בדיוק התבנית מאתמול: פונקציה עם פרמטר אחד שמקבלת משבצת ומציבה
   מגדל, ולולאה לכל רשימה. שימי לב ש-`spot` הוא רשימה של שני מספרים, ולכן
   העמודה היא `spot[0]` והשורה `spot[1]`.
3. ב-`choose_target` הסדר הוא כל העניין: הלולאה שמחפשת מעופפת יושבת **לפני**
   חיפוש האיום הגדול, כי `return` מסיים את הפונקציה ברגע שמצא. אחריה `best =
   enemies[0]` ולולאה שנייה שמשווה `threat(e) > threat(best)`, ובסוף
   `return best`. אם הפכת את הסדר, הקיקלופים ימותו יפה וההרפיות יעברו לך מעל
   הראש — הריצי פעם אחת הפוך רק כדי לראות את זה.

## Reward & Recap

**Item**: 🗺️ **מפת המבוך / The Labyrinth Map** — "לא שלמה, ולא מדויקת. אבל היא
ביד, וזה יותר ממה שהיה לכל אחד אחר." (Bead #14.)

**Rank-up**: this is the lesson that changes her title on the hub from *Camper*
to **Strategos / אסטרטגית**. `game.js` should mark it — the control-model change
deserves a visible, permanent acknowledgement, not a toast that fades.

**Achievements possible here**:
- *The Scout Returns* — הפונקציה הראשונה שהחזירה ערך
- *Strategos* — **הקרב הראשון שנוצח בעזרת `choose_target`** (L1). ההישג הגדול של
  השיעור, ושל המערכה
- *None Shall Pass* — ניצחה את L2 (ניצחון על `None`)
- *Composer* — פונקציה שקוראת לפונקציה אחרת (L4 והקרב הגדול)
- *Grounded* — ראתה אסטרטגיה קורסת באמצע קרב וניצחה בהרצה הבאה
- *No Hints Needed*, *Persistent*

**Recap bullets**:
- `return` מוסר ערך בחזרה למי שקרא לפונקציה; הקריאה **הופכת** לערך הזה
- `print` מראה לך; `return` נותן לתוכנית. זה לא אותו דבר
- פונקציה בלי `return` מחזירה `None` — וזה הסימן הראשון שמשהו חסר
- `return` מסיים את הפונקציה מיד, גם באמצע `if`
- אפשר כמה פרמטרים, והסדר קובע; פרמטר עם ערך ברירת מחדל הוא אופציונלי ובא בסוף
- משתנה שנולד בתוך פונקציה מת איתה — `return` הוא הדרך היחידה להוציא אותו
- **`choose_target` היא פונקציה שאת לא קוראת לה — המשחק קורא לה**, כל פעם שמגדל
  מוכן לירות
- מה שהיא מחזירה הוא המטרה. `None` פירושו "לא לירות" — וזה בדרך כלל `return` חסר
- אסטרטגיה שזורקת שגיאה מסיימת את הקרב בהפסד

**Next teaser**: *"המגדלים שלך שואלים אותך במי לירות, ואת עונה. מחר תלמדי לענות
עם מספרים אמיתיים — מרחקים, שורשים, וקצת מזל."*

## Common mistakes to anticipate

| She does | She sees | Hint / explainer must cover |
| --- | --- | --- |
| `print` במקום `return` | `None` בפלט או `TypeError` עם `NoneType` | הבלוק המרכזי של השיעור; לשאול "איפה חסר `return`?" |
| `return` בלי לשמור את הערך | אין פלט בכלל | קריאה לבד לא מדפיסה — צריך `print(f(x))` או משתנה |
| `return` מוקדם מדי | חצי מהפונקציה לא רץ | `return` מסיים מיד; שורות אחריו מתות |
| מחזירה שני דברים בשתי שורות `return` | רק הראשון חוזר | אותו הסבר; החזרת כמה ערכים אינה בשיעור הזה |
| `def f(bonus=0, attack):` | `SyntaxError` | ברירות מחדל אחרונות |
| מחליפה סדר ארגומנטים | תוצאה שגויה בלי שגיאה | הכי מסוכן — אין שגיאה. לבדוק ידנית מול הפלט הצפוי |
| משתמשת במשתנה מקומי בחוץ | `NameError: name 'x' is not defined` | scope: נולד בפנים, מת בפנים |
| מגדירה משתנה בחוץ ומצפה שהפונקציה תעדכן אותו | הערך בחוץ לא משתנה | לא להיכנס ל-`global` — לומר "תחזירי את הערך ותשמרי אותו" |
| **קוראת ל-`choose_target` בעצמה** בסוף הקוד | `NameError` על `enemies`, או שגיאה מוזרה | המשחק קורא לה. אסור וגם אין צורך לקרוא לה לבד |
| כותבת `def choose_target(enemies, tower)` | הקריאה מהמשחק נכשלת עם `TypeError` על מספר ארגומנטים | החוזה הוא פרמטר אחד בדיוק |
| מאייתת `choose_targets` או `chooseTarget` | הקרב רץ עם ברירת המחדל, בלי שום שגיאה | **הכי מסוכן** — אין שגיאה, רק תוצאה גרועה. המנוע צריך להתריע כשקיימת פונקציה בשם דומה |
| `return` בתוך הלולאה כשמחפשים מקסימום | בוחרת תמיד את הראשונה | `return best` יושב **אחרי** הלולאה |
| `enemies[1]` כשיש מפלצת אחת בטווח | `IndexError`, והקרב נגמר מיד | `enemies` משתנה באורכו בכל קריאה |
| מחזירה `True` או מחרוזת שאינה `id` | המגדלים מחזיקים אש | רק dict, `id`, אינדקס או `None` מתקבלים |

## Implementation notes

- **Every level was simulated headless** against `assets/js/battle/sim.js` and
  `assets/js/battle/pyapi.js` before it was written down. Each was run against her
  solution, an empty program, and a bank of **eleven** degenerate or
  plausible-but-wrong strategies: no strategy at all (the engine default),
  `return 0`, `return enemies[0]`, `return enemies[-1]`, `return None`, lowest HP,
  highest HP, nearest to camp, furthest from camp, fastest, least armour, most
  armour.

  | Level | Solution | Empty | Default targeting | Other strategies that also win |
  | --- | --- | --- | --- | --- |
  | L1 | wins 3/3, 12s | loses | **loses**, 1 leak | `return 0` and "most armour" — both name the same cyclops, so they are the same answer, not a guess that got lucky |
  | L2 | wins 3/3, 12s | loses | **loses** | same three |
  | L3 | wins 3/3, 26s | loses | **loses**, 3 leak | "fastest" and "least armour" — both pick harpies first, which is the insight |
  | L4 | wins 3/3, 31s | loses | **loses** | "highest HP" and "most armour" — again the same cyclops |
  | great | wins 4/4, 54s | loses | **loses** | **none. Every single degenerate strategy loses this battle.** |

  The rule this table enforces: a level is only finished when a strategy that
  reasons wins and a strategy that guesses does not. Where something other than
  the stated solution wins, it is because it selects **the same monster** for a
  defensible reason — never because a constant happened to work.
- **L1 and L2 lean on one specific engine fact**: the list handed to
  `choose_target` is in spawn order, so `enemies[0]` is the monster that has been
  on the field longest. The default targets whoever is furthest along the path
  instead, which is a different monster the moment anything overtakes anything.
  Both levels are built on exactly that gap. If the sim ever changes the ordering
  of `inRange`, **these two levels stop teaching and must be re-tuned.** Leave
  this note in place.
- **Skulpt**: `return`, כמה פרמטרים, ערכי ברירת מחדל, `None` — כולם ב-matrix
  המאומת. Calling her `def` synchronously from JS with a list of dicts is
  verified, as is a strategy that raises being caught and reported.
- **Verify three error strings** with `node tools/verify-python.mjs` before
  shipping, and paste whatever Skulpt prints into the blocks:
  1. teach 3 — `TypeError: unsupported operand type(s) for +: 'NoneType' and 'int'`
  2. teach 13 — `NameError: name 'secret' is not defined` (stable, low risk)
  3. teach 12 — the `SyntaxError` for a non-default parameter after a default one.
     Skulpt's parser message is likely a generic `SyntaxError: bad input on line N`
     rather than CPython's `non-default argument follows default argument`. If it
     is generic, the callout must say so in one Hebrew line instead of quoting a
     message she will never see.
- **Verify that `print(None)` renders exactly `None`** in Skulpt — the entire
  compare block in teach 6 depends on that string appearing in the output panel.
- **L1's starter returns `None` on purpose** and L2's starter `print`s on
  purpose. Neither crashes; both lose in a way the engine already explains
  ("your towers saw monsters but never fired"). Confirm that message reaches the
  page — it is doing more teaching than the hints are.
- **The `also: { kind: "source" }` rule is what makes each level's concept
  compulsory**, since `choose_target` is optional as far as the engine is
  concerned. L3 requires `flying`; L4 requires `def threat`; the great battle
  requires all of it. `also` now also accepts an **array** of rules, so a level
  can demand a construct and a printed line at once — not needed here, but it is
  how lesson 15's reports are checked.
- **Groups listed inside a single `waves` entry spawn sequentially** — the clock
  accumulates across them. L1 and L2 rely on exactly that: the single cyclops is
  listed first in its entry and enters at t=0, and the satyrs follow from t=1.
  Splitting them into two entries with the same `delay` would put them on the
  field together and break both levels.
- **`print()` inside `choose_target` reaches the live page log but is not in the
  captured output.** L2's broken starter prints on every call, so the log is what
  tells her the function is running — but no check may assert on that text, and
  none does. It also means a debug `print` in a strategy function is a
  performance question, not a correctness one.
- **`sorted()` is deliberately unused** in every strategy function. Skulpt raises
  `'<' not supported between instances of 'dict' and 'dict'` on a list of dicts,
  and `key=` would need a `lambda`, which the course excludes. Every "pick the
  best one" here is the keep-the-best loop. Do not let a future draft slip a
  `sorted` into a `choose_target`.
- **`source` rules here match identifiers, never spacing-sensitive expressions.**
  `mustInclude: ["def threat"]` is safe; `mustInclude: ["threat(e) > threat(best)"]`
  would fail her for writing the comparison the other way round, and nothing in
  this lesson does that. `checker.js` should still normalise runs of whitespace
  before matching so `def  threat` does not fail her.
- All output checks are `normalized`. No `input()` in this lesson.
- **Every starter in this lesson runs without a syntax error before she writes
  anything.** Stub bodies carry a placeholder statement (`print(n)`, `return 0`)
  rather than a bare comment, because a comment-only body raises
  `IndentationError` the moment she presses Run — an error that teaches nothing
  and reads as "you broke it before you started".
- **Combined checks** use the `source` + `also: { output }` pattern
  (`.claude/rules/lesson-authoring.md`); both halves must pass, and the `source`
  check is the outer one so its `message` is what she reads on failure. All
  `source` requirements in this lesson are keywords or identifiers, never
  comments or string literals, so no check needs `raw: true`.
