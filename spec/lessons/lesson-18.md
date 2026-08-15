# Lesson 18 — Surviving the Furies · לשרוד את הפוריות

> **Act V — The Last Olympian** · Stop 18 of 20
> Structure follows `spec/lessons/lesson-01.md`. Schema: `spec/04-lesson-template.md`.

| | |
| --- | --- |
| **id** | `18` |
| **slug** | `surviving-the-furies` |
| **minutes** | 30–35 |
| **concepts** | reading an error, **a repeatable debugging method**, error types, `try` / `except`, validating input |
| **new vocabulary** | `try`, `except`, `ValueError`, `ZeroDivisionError`, `NameError`, `TypeError`, `IndexError`, `KeyError`, `AttributeError` |
| **requires** | L1 reading an error · L3 `input`/`int` · L6 `if` · L7 `while`/`break` · L8 `for`/`continue` · L9–11 lists and dicts · L13–14 functions and `return` · L17 `.strip()` |
| **item** | 🔎 עדשת הפוריות / The Furies' Lens |
| **XP** | 25 + 25 + 30 + 35 (battles) + 55 (great battle) + 30 (bonus) = **200** |

## Teaching goal

This is the most valuable lesson in the course, and the one whose value survives
longest after the game is uninstalled. `try`/`except` is the smaller half of it.

The larger half is a **method she can run on any error, forever**: read the type,
find the line, form one specific hypothesis, test it. Four steps, in order, out
loud. Beginners do not fail at debugging because they lack knowledge — they fail
because they stare at the whole program at once and start changing things at
random. The method replaces panic with a procedure.

By the end she can:
1. Read a traceback and say what broke, where, and what kind of thing it was.
2. State a hypothesis in one sentence and test it with a single `print()`.
3. Know that the line in the error is **where Python gave up**, not always where
   she went wrong.
4. Use `try`/`except` for the errors she *expects* — data she did not write,
   mostly — and know that using it to silence errors she does not expect is
   worse than the error.

The battles are what make this stick rather than sound sensible. In this engine
her strategy function is called by the simulation dozens of times a second, and
**when it raises, the battle stops and she loses** with the camp still at full
health. She will watch a defense that was winning die of one unhandled
`KeyError` twenty-eight seconds in. Nothing a paragraph could say about
robustness lands as hard as that.

## Story beat

The scroll from lesson 17 has to reach Olympus. Olympus is on the six hundredth
floor of the Empire State Building, and the sky over Manhattan is not empty. Three
winged sisters intercept them halfway up — Alecto, Megaera, Tisiphone, the
Furies, who have spent three thousand years punishing people for being imprecise.

They will let a demigod pass on one condition. Something in her code is broken,
and she has to say exactly what. Not "it doesn't work". Not "something's wrong
with the list". Exactly.

And they are not patient about it. Below her the road to the camp is open, and
every one of these battles is fought with a defense that stops the moment her
function does.

Cast: Chiron (teaches the method), Alecto (the antagonist who is technically on
her side), Grover in a `tip` callout guessing wildly and being wrong.

## Chiron Teaches — block by block

1. **prose** — Reframe first, before any syntax. שגיאה היא לא כישלון ולא נזיפה.
   היא **עדה**. היא ראתה בדיוק מה קרה, היא זוכרת את השורה, והיא אומרת לך את זה
   בלי לשקר. הבעיה היחידה שלה: היא מדברת אנגלית תמציתית. בשיעור הזה את לומדת
   לקרוא אותה.

2. **error block** — the anatomy. Deliberately broken:
   ```python
   hero_name = "Annabeth"
   print("Welcome, " + hero_nome)
   ```
   Real error: `NameError: name 'hero_nome' is not defined on line 2`
   Explanation: שלושה חלקים, ולכל אחד יש תפקיד.
   **`NameError`** — הסוג. זה אומר לך לאיזו משפחה הבעיה שייכת.
   **`name 'hero_nome' is not defined`** — התיאור. פייתון פגש שם שהוא לא מכיר.
   **`on line 2`** — המקום שבו הוא נעצר.
   שלושתם ביחד: "בשורה 2 ביקשת ממני משהו בשם `hero_nome`, ואני לא מכיר דבר
   כזה." ההודעה הזאת לא מאשימה אותך. היא מדווחת.

3. **callout · tip · THE FOUR STEPS** — the centre of the lesson. Render this
   block visually larger than a normal callout; it is the thing she should be
   able to recite in a year.
   > **ארבעת הצעדים · Chiron's Four Steps**
   > **1. מה הסוג?** קראי את המילה הראשונה בשגיאה. `NameError`? `TypeError`?
   > כל סוג הוא משפחה של בעיות, ולכל משפחה יש חשודים קבועים.
   > **2. איזו שורה?** לכי לשורה שכתובה בשגיאה ותקראי אותה לאט. לא את התוכנית.
   > את השורה.
   > **3. מה ההשערה שלי?** משפט אחד, מדויק, שאפשר לבדוק.
   > "אני חושבת ש-`total` הוא string ולא int." זו השערה.
   > "משהו עם המספרים" זו לא השערה — אי אפשר לבדוק אותה.
   > **4. איך אני בודקת?** הדפיסי. `print(total)`, `print(type(total))`,
   > `print(len(words))`. שינוי אחד בכל פעם.
   > אם ההשערה הייתה לא נכונה — **חזרי לצעד 3 עם השערה חדשה.** זה לא כישלון,
   > זה בדיוק איך זה עובד.

4. **error block** — the worked demonstration, and the reason step 2 has a
   warning attached to it. **This block is where the method is taught, not
   stated.**
   ```python
   campers = ["Percy", "Annabeth", "Grover"]
   tribute = "10"
   total = tribute * len(campers)
   print("Total drachmas: " + total)
   print("Per camper: " + str(total / len(campers)))
   ```
   Real output before the crash: `Total drachmas: 101010`
   Real error: `TypeError: unsupported operand type(s) for /: 'str' and 'int' on line 5`
   Explanation, walked as the four steps:
   **צעד 1 — הסוג:** `TypeError`. זו משפחה אחת: שני דברים מסוגים שונים נפגשו
   ופייתון לא יודע מה לעשות איתם.
   **צעד 2 — השורה:** 5. אבל תסתכלי על הפלט שהתקבל לפני הקריסה:
   `Total drachmas: 101010`. זה כבר לא נכון! עשר דרכמות כפול שלושה חניכים זה
   לא 101010.
   **צעד 3 — ההשערה:** "`tribute` הוא string, אז `*` שכפל את הטקסט במקום להכפיל
   מספרים."
   **צעד 4 — הבדיקה:** `print(type(tribute))` מדפיס `<class 'str'>`. ההשערה
   נכונה. התיקון הוא `tribute = 10` — או `int(tribute)` — **בשורה 2**.
   השורה שנשברה הייתה 5. הבאג היה בשורה 2. זה קורה כל הזמן.

5. **prose** — Say the rule from block 4 plainly, because it is the single
   sentence that separates someone who can debug from someone who cannot:
   **המספר בשגיאה הוא המקום שבו פייתון ויתר, לא בהכרח המקום שבו טעית.** ערך
   שגוי יכול לנסוע בשקט דרך חמש שורות ולהתפוצץ בשישית. לכן צעד 4 הוא הדפסה:
   את עוקבת אחורה עד השורה שבה הערך עוד היה בסדר.

6. **prose** — The suspect list. Give it as short lines, one per type, in her
   own words:
   ```
   NameError        שם שפייתון לא מכיר — שגיאת כתיב, או משתנה שעוד לא נוצר
   TypeError        סוגים שלא מסתדרים — כמעט תמיד str מול int
   ValueError       הסוג נכון, הערך לא — int("abc")
   IndexError       ביקשת מקום שלא קיים ברשימה
   KeyError         ביקשת מפתח שלא קיים במילון
   AttributeError   ביקשת method שלא קיים — לרוב שגיאת כתיב אחרי הנקודה
   ZeroDivisionError  חילקת באפס
   SyntaxError      פייתון לא הצליח בכלל לקרוא את מה שכתבת
   ```
   ואז המשפט שסוגר: אחרי חודש את מזהה את הסוג ויודעת איפה להסתכל עוד לפני
   שקראת את שאר ההודעה. זו כל המיומנות.

7. **callout · warn — honesty about error text.** This must be in the lesson.
   > **ההודעות לא זהות בכל מקום**
   > הקורס הזה מריץ פייתון בתוך הדפדפן, במנוע שנקרא **Skulpt**. הוא מריץ פייתון
   > אמיתי, אבל הוא לא הפייתון שתתקיני על המחשב (`CPython`). לפעמים אותה שגיאה
   > בדיוק מנוסחת אחרת:
   >
   > | הקוד | פה (Skulpt) | על המחשב (CPython 3) |
   > | --- | --- | --- |
   > | `1/0` | `integer division or modulo by zero` | `division by zero` |
   > | `d["b"]` על מפתח חסר | `KeyError: b` | `KeyError: 'b'` |
   > | הזחה חסרה | `SyntaxError: bad input` | `IndentationError: expected an indented block` |
   >
   > **הסוג כמעט תמיד זהה. הניסוח לפעמים לא.** אל תשנני את המשפט — תשנני את
   > הסוג ואת השאלה "מה קרה פה". זה מה שעובר בין כל הגרסאות, וזה גם מה שיעבוד
   > לך בעוד עשר שנים כשההודעות ייראו אחרת לגמרי.

8. **code (runnable)** — `print()` as a torch. Not a new feature: a new use for
   the first thing she ever learned.
   ```python
   words = "the sky is falling".split()
   print(words)          # what is actually in here?
   print(len(words))     # how many?
   print(type(words))    # what kind of thing is it?
   ```
   Output:
   ```
   ['the', 'sky', 'is', 'falling']
   4
   <class 'list'>
   ```
   Caption: ‎`print`‎ הוא הפנס. שלוש השאלות שהוא עונה עליהן הן כמעט כל הניפוי:
   מה יש שם, כמה יש, ומאיזה סוג.

9. **prose** — The turn in the lesson. עד עכשיו למדת לתקן שגיאות **אחרי**
   שקרו. יש סוג אחד של שגיאה שאי אפשר לתקן מראש: שגיאה שמגיעה **מנתונים שלא
   את כתבת**. הקוד שלך מושלם, המילון שלך מדויק, ואז נכנס לטווח סוג מפלצת
   שהאורקל לא הזכירה — והתוכנית קורסת באמצע הקרב. בשביל זה יש `try`.

10. **code (runnable)** — the smallest `try`/`except`.
    ```python
    try:
        number = int("abc")
        print(number)
    except ValueError:
        print("That was not a number.")
    ```
    Output: `That was not a number.`
    Caption: `try` אומר "נסי להריץ את זה". `except ValueError` אומר "ואם נופל
    `ValueError` דווקא — תעשי את זה במקום לקרוס".

11. **compare** — the two versions of the same gate.
    - bad:
      ```python
      answer = "seven"
      toll = int(answer)
      print("Toll paid:", toll)
      ```
      label: `ValueError` — התוכנית מתה, המשתמשת לא מבינה למה
    - good:
      ```python
      answer = "seven"
      try:
          toll = int(answer)
          print("Toll paid:", toll)
      except ValueError:
          print("Numbers only, please.")
      ```
      label: התוכנית שורדת ואומרת משהו מועיל
    Prose under it: ההבדל הוא לא בין קוד נכון לקוד שגוי. הוא בין תוכנית שנשברת
    מול המשתמשת לבין תוכנית שציפתה לזה.

12. **callout · warn** — the discipline that keeps `try` honest.
    > **אל תתפסי הכל**
    > אפשר לכתוב `except:` בלי סוג, והוא יבלע **כל** שגיאה — כולל שגיאת כתיב
    > שלך, כולל `NameError` על משתנה שלא קיים. אז התוכנית תמשיך לרוץ ותיתן
    > תשובות שגויות בשקט, וזה גרוע בהרבה מקריסה. קריסה לפחות מספרת לך.
    > **תפסי את הסוג שאת מצפה לו, ורק אותו.** `except ValueError` — כן.
    > `except` לבד — לא.

13. **code (runnable)** — the exact shape every battle in this lesson uses: a
    risky lookup pulled out into its own tiny function, with a fallback value.
    ```python
    DANGER = {"satyr": 4, "harpy": 3, "hellhound": 2}
    wave = [{"kind": "satyr"}, {"kind": "cyclops"}, {"kind": "harpy"}]

    def danger_of(enemy):
        try:
            return DANGER[enemy["kind"]]
        except KeyError:
            return 0

    for enemy in wave:
        print(enemy["kind"], danger_of(enemy))
    ```
    Output:
    ```
    satyr 4
    cyclops 0
    harpy 3
    ```
    Caption: השורה המסוכנת יושבת לבד בתוך פונקציה קטנה, ו-`except KeyError`
    מחזיר ערך שיש לו משמעות — "סוג שלא הכרתי, לא בעדיפות". שימי לב שהפונקציה
    **תמיד מחזירה מספר**, ולכן מי שקורא לה לא צריך לדעת שמשהו כמעט נשבר. זו
    התבנית שתחזור בכל אחד מהקרבות היום.

14. **callout · myth** — הפוריות נולדו לפני האולימפיים והן לא עובדות אצל אף אחד.
    התפקיד שלהן הוא לרדוף אחרי מי שעשה עוול עד שהוא **מודה במה בדיוק** עשה.
    לא "הצטערתי" — *מה בדיוק*. במקרה, זו גם ההגדרה של דיבוג.

## Try It (ungraded)

Free-play editor, pre-loaded broken. Nothing checked, nothing scored.

```python
# Four broken lines. Run, read the error, fix one, run again.
# Fix them one at a time — that is the whole method.

heroes = ["Percy", "Annabeth"]
print("Party size: " + len(heroes))
print(heroes[2])
print(heroes[0].uper())
print(100 / (len(heroes) - 2))
```

Intro: *"ארבעה באגים, ארבעה סוגים שונים. פייתון יראה לך רק את הראשון — תתקני
אותו, תריצי שוב, והבא יופיע. תעברי על ארבעת הצעדים בקול בכל אחד. שום דבר פה לא
נבדק."*

(The four, in the order she will meet them: `TypeError` — `str + int`;
`IndexError` — index 2 in a list of 2; `AttributeError` — `uper`;
`ZeroDivisionError` — `2 - 2`.)

## Battle levels

Five battles, and the thing that makes this lesson different from every other
lesson in the course:

> **If her code raises, the battle ends and she loses.**

That is not a rule invented for the lesson — it is how the engine already works.
`choose_target` is called by the simulation many times a second; when it throws,
the simulation stops, the towers stop firing, and the outcome is a loss with the
camp still at full health and the real Python traceback printed underneath. So
`try`/`except` is not a tidy-code exercise here. It is the difference between a
defense that survives a monster it did not expect and one that dies of surprise.

Four of the five levels hand her **code that is already broken**. Her job is the
four steps: read the type, find the line, form one hypothesis, test it.

Every level was played through the real engine. For each: the stated solution
wins with a perfect defense, the broken starter loses with the named error, an
empty program loses, and the degenerate answers (`return 0`, `return enemies[0]`,
`return None`) all lose.

---

### b1 — The Empty List · הרשימה הריקה · 25 XP, 6 🪙

**Why this mechanic:** `IndexError` in its natural habitat. She writes the most
obvious version of "shoot the flyers first" — collect them into a list, return
the first one — and it works for as long as there is a flyer in range. The
instant a tower can see only hellhounds, `flyers` is empty, `flyers[0]` raises,
and the whole defense goes silent. **A list you built yourself can still be
empty**, and that is the lesson.

The starter is given broken and the level is the same stretch of road she fought
on in lesson 17, so nothing about the battlefield is new — only the failure.

```js
map: { cols: 18, rows: 9, path: [[0,4],[1,4], … ,[17,4]] },
gold: 330, campHp: 5, seed: 51,
allowed: ["archer", "cannon"],
waves: [ { delay: 0, enemies: [ { kind: "hellhound", count: 4, gap: 0.5 },
                                { kind: "harpy", count: 6, gap: 0.7 } ] } ],
```

Starter (broken on purpose — `brokenStarter: true`):
```python
place_tower("cannon", 4, 3)
place_tower("archer", 6, 5)
place_tower("archer", 8, 3)
place_tower("cannon", 11, 3)
place_tower("archer", 13, 5)

def choose_target(enemies):
    flyers = []
    for enemy in enemies:
        if enemy["flying"]:
            flyers.append(enemy)
    return flyers[0]
```

What she sees when she presses **Fight!**: the battle stops at 1.4 seconds, the
camp is untouched at 5/5, nothing has been killed, and underneath:
`IndexError: list index out of range`.

Solution:
```python
place_tower("cannon", 4, 3)
place_tower("archer", 6, 5)
place_tower("archer", 8, 3)
place_tower("cannon", 11, 3)
place_tower("archer", 13, 5)

def choose_target(enemies):
    flyers = []
    for enemy in enemies:
        if enemy["flying"]:
            flyers.append(enemy)
    if len(flyers) > 0:
        return flyers[0]
    return enemies[0]
```

```js
check: { kind: "battle" }
```

No `also` here. This level is about reading an error and fixing it, and a source
requirement would put a second thing in front of her at the moment she is
learning the first. A `try` / `except IndexError` around the return is an equally
correct fix and passes — hint 3 says so, and says which one is better and why.

Verified: solution wins 5/5 with 10 kills. Broken starter: strategy error at
1.4s, 0 kills. `return 0` and `return enemies[0]`: lose, 3 leaked. `return None`:
loses, 6 leaked. Empty program: loses, 6 leaked.

Hints:
1. הריצי. איזה **סוג** שגיאה, ובאיזו שורה? ואז השאלה האמיתית: מה היה בתוך
   `flyers` באותו רגע?
2. `flyers` נבנית מחדש בכל קריאה, והיא ריקה בכל פעם שאין משהו מעופף בטווח של
   המגדל הזה. `flyers[0]` על רשימה ריקה זורק `IndexError`. את צריכה לבדוק
   **לפני** שאת ניגשת לאיבר.
3. `if len(flyers) > 0:` ובתוכו `return flyers[0]`. אחרי ה-`if`, בלי הזחה,
   `return enemies[0]` — כלומר "אין מעופפים, ירי במי שבראש". גם
   `try: return flyers[0]` עם `except IndexError:` עובד ועובר את הבדיקה, אבל
   כאן ה-`if` עדיף: המצב הזה **צפוי** וקורה בכל שנייה של הקרב, ו-`try` שמור
   למשהו שלא אמור לקרות.

---

### b2 — The Missing Key · המפתח החסר · 25 XP, 6 🪙

**Why this mechanic:** `KeyError`, and the reason it is the scariest of the
common errors: **it fires on data, not on code**. Her bestiary dict is correct,
her loop is correct, her comparison is correct — and thirteen seconds into the
battle a cyclops walks into range, a kind she never wrote down, and everything
stops. Nothing she can read in her own code tells her that in advance.

```js
map: { cols: 18, rows: 10,
       path: [[0,8],[1,8],[2,8],[3,8],[4,8],[4,7],[4,6],[4,5],[4,4],[5,4],[6,4],
              [7,4],[8,4],[9,4],[10,4],[10,3],[10,2],[10,1],[11,1],[12,1],[13,1],
              [14,1],[15,1],[16,1],[17,1]] },
gold: 370, campHp: 5, seed: 62,
allowed: ["archer", "cannon"],
waves: [
  { delay: 0, enemies: [ { kind: "cyclops",   count: 2, gap: 2.0 } ] },
  { delay: 4, enemies: [ { kind: "hellhound", count: 6, gap: 0.4 } ] },
  { delay: 6, enemies: [ { kind: "satyr",     count: 7, gap: 0.7 },
                         { kind: "harpy",     count: 4, gap: 0.8 } ] },
],
```

Starter (broken on purpose):
```python
place_tower("cannon", 2, 6)
place_tower("archer", 6, 5)
place_tower("cannon", 8, 3)
place_tower("cannon", 12, 2)
place_tower("archer", 15, 2)

DANGER = {"satyr": 4, "harpy": 3, "hellhound": 2}

def choose_target(enemies):
    best = enemies[0]
    for enemy in enemies:
        if DANGER[enemy["kind"]] > DANGER[best["kind"]]:
            best = enemy
    return best
```

Real error, exactly as Skulpt renders it: **`KeyError: cyclops`** — no quotes
around the name. CPython would print `KeyError: 'cyclops'`. The lesson's
honesty callout has already warned her about this precise difference, and this
is where she meets it for real.

Solution:
```python
DANGER = {"satyr": 4, "harpy": 3, "hellhound": 2, "cyclops": 1}
```
(the rest unchanged)

```js
check: { kind: "battle" }
```

Verified: solution wins 5/5 with 19 kills. Broken starter: `KeyError: cyclops` at
1.3s. `return 0`, `return enemies[0]` and `return None`: all lose 5, camp
destroyed. Empty program: loses 5.

**The teaching point that outlives the game:** the fix she reaches for first is
"add cyclops to the dict", and that is the right fix *today*. The next lesson
level is what happens when a kind arrives that she could not have added. Say that
in the brief so b4 lands as a promotion rather than a repeat.

Hints:
1. השגיאה היא `KeyError` והמילה שאחריה היא **המפתח שביקשת ולא היה שם**. איזו
   מילה זו? חפשי אותה במילון שלך.
2. `DANGER` מכיל שלושה סוגים. כמה סוגי מפלצות יש בגל הזה? הדפיסי
   `print(enemy["kind"])` בתוך הלולאה והריצי שוב — הלוג של הקרב יראה לך מה עבר
   שם לפני הקריסה.
3. הקיקלופ לא נמצא ב-`DANGER`, ו-`DANGER["cyclops"]` על מפתח שלא קיים זורק
   `KeyError`. הוסיפי `"cyclops": 1` למילון — מספר נמוך, כי הוא איטי וכבד ולא
   הוא זה שיברח לך. שימי לב שפייתון כתב `KeyError: cyclops` בלי גרשיים; על
   המחשב בבית זה ייראה `KeyError: 'cyclops'`. הסוג זהה, הניסוח לא.

---

### b3 — Divided by a Satyr · חלוקה בסאטיר · 30 XP, 8 🪙

**Why this mechanic:** `ZeroDivisionError`, and the first place in the course
where `try`/`except` is the **right** tool rather than a heavier `if`. She wants
a real number for "how much work is this monster" — hit points per point of
armour. It is a good idea. It divides by zero the first time an unarmoured satyr
walks into range.

```js
same map, gold and waves as b2; seed: 63
```

Starter (broken on purpose):
```python
… the same five towers …

def choose_target(enemies):
    best = enemies[0]
    for enemy in enemies:
        if enemy["hp"] / enemy["armour"] < best["hp"] / best["armour"]:
            best = enemy
    return best
```

Real error: **`ZeroDivisionError: integer division or modulo by zero`**. CPython
says `division by zero`. Same type, different sentence — the second row of the
honesty table, met in the wild.

Solution:
```python
… the same five towers …

def effort(enemy):
    try:
        return enemy["hp"] / enemy["armour"]
    except ZeroDivisionError:
        return 0

def choose_target(enemies):
    best = enemies[0]
    for enemy in enemies:
        if effort(enemy) < effort(best):
            best = enemy
    return best
```

```js
check: { kind: "battle",
  also: { kind: "source", mustInclude: ["try", "except ZeroDivisionError"],
          message: { he: "היום מתאמנים על try/except עם הסוג המדויק — לא על בדיקה מראש",
                     en: "Today the drill is try/except with the exact type, not a pre-check" } } }
```

Verified: solution wins 5/5 with 19 kills. Broken starter: strategy error at
8.1s — note that it survives eight seconds before the first unarmoured monster
reaches a tower, which is a small lesson in itself. Degenerates and empty
program: all lose 5.

**About the `also`.** `if enemy["armour"] == 0:` also works and is not wrong.
The brief says so out loud: *"there is more than one way here, and today we are
practising this one."* That honesty is the price of a source requirement, and
the reason `except ZeroDivisionError` is spelled out in `mustInclude` rather than
a bare `except` is the lesson's own rule — catch the type you expect and nothing
else.

**Why returning `0` is the tactically right fallback:** armour zero means every
point of damage lands, so an unarmoured monster is the cheapest thing on the
board to kill. Returning the lowest possible score puts it first in line. She
should be able to say why the fallback value is `0` and not `999`; hint 3 walks
it.

Hints:
1. איזה סוג שגיאה, ובאיזו שורה? ואז: מה בדיוק היה `enemy["armour"]` באותו רגע?
   הסתכלי בטבלת המפלצות — למי יש שריון 0?
2. סאטירים והרפיות עם שריון 0 מפילים את החלוקה. את החישוב המסוכן מוציאים
   לפונקציה משלו, ובתוכה עוטפים ב-`try` עם `except ZeroDivisionError` שמחזיר
   ערך ברירת מחדל.
3. `def effort(enemy):` ובתוכה `try:` עם `return enemy["hp"] / enemy["armour"]`,
   ואז `except ZeroDivisionError:` עם `return 0`. אחר כך `choose_target` קוראת
   ל-`effort(enemy)` במקום לחשב בעצמה. למה `0` ולא מספר גדול? כי הציון הזה הוא
   "כמה עבודה זה", ואת רוצה את הקלים ביותר קודם — ומשהו בלי שריון הוא הכי קל
   שיש. אם תחזירי `999`, הסאטירים יהיו אחרונים בתור והם המהירים ביותר בגל.

---

### b4 — Two Kinds of Failure · שני סוגים של כישלון · 35 XP, 9 🪙

**Why this mechanic:** two different exceptions in one strategy, each needing its
own `except`, and the moment she is asked to write code for a monster **she has
not been told about**. The bestiary is deliberately left incomplete this time.
She is not allowed to fix it by adding the missing key; she has to make the
function survive a key that is not there.

This is the level where `try`/`except` stops being a repair and becomes a design
decision, and where the lesson's discipline callout earns its place: a bare
`except:` here would also swallow the `KeyError` she caused with a typo.

```js
same map and waves as b2 / b3; gold: 370, campHp: 5, seed: 64
```

Starter (broken on purpose — two bugs, and Python reveals one at a time):
```python
… the same five towers …

DANGER = {"satyr": 4, "harpy": 3, "hellhound": 2}

def danger_of(enemy):
    return DANGER[enemy["kind"]]

def effort(enemy):
    return enemy["hp"] / enemy["armour"]

def choose_target(enemies):
    best = enemies[0]
    for enemy in enemies:
        if danger_of(enemy) > danger_of(best):
            best = enemy
        elif danger_of(enemy) == danger_of(best) and effort(enemy) < effort(best):
            best = enemy
    return best
```

Solution:
```python
DANGER = {"satyr": 4, "harpy": 3, "hellhound": 2}

def danger_of(enemy):
    try:
        return DANGER[enemy["kind"]]
    except KeyError:
        return 0

def effort(enemy):
    try:
        return enemy["hp"] / enemy["armour"]
    except ZeroDivisionError:
        return 0

def choose_target(enemies):
    …unchanged…
```

```js
check: { kind: "battle",
  also: { kind: "source",
          mustInclude: ["except KeyError", "except ZeroDivisionError"],
          mustExclude: ["except:"],
          message: { he: "כל סכנה והחריגה שלה: except KeyError ו-except ZeroDivisionError, בלי except ריק",
                     en: "Each hazard with its own clause: except KeyError and except ZeroDivisionError — no bare except" } } }
```

Verified: solution wins 5/5 with 19 kills. Broken starter: `KeyError: cyclops` at
1.3s. Degenerates and empty program: all lose 5.

`mustExclude: ["except:"]` is the mechanical form of the discipline callout, and
it is worth the strictness: a bare `except` would pass the battle while quietly
hiding the next mistake she makes. The message says exactly that.

Hints:
1. שני חישובים מסוכנים, שני סוגי שגיאה שונים. איזה מהם קורה **מיד** ואיזה מחכה
   עד שמשהו מסוים נכנס לטווח?
2. `danger_of` יכולה ליפול על מפתח שאין במילון, `effort` יכולה ליפול על חלוקה
   באפס. כל אחת מהן מקבלת `try` משלה עם ה-`except` **המדויק** שלה. הפעם אסור
   להוסיף את הקיקלופ למילון — התרגיל הוא לשרוד בלעדיו.
3. ב-`danger_of`: `try: return DANGER[enemy["kind"]]` ואז
   `except KeyError: return 0` — משמעות: "סוג שלא הכרתי, לא בעדיפות". ב-`effort`:
   אותו מבנה עם `except ZeroDivisionError: return 0`. `choose_target` לא משתנה
   בכלל, כי היא כבר קוראת לשתי הפונקציות. ואל תכתבי `except:` לבד — הוא היה
   בולע גם שגיאת כתיב שלך, ואז הקרב היה נגמר בתשובה שגויה בשקט במקום בהודעה.

---

## The Great Battle — "החקירה" / "The Interrogation" · 55 XP, 14 🪙

**Why this mechanic:** the whole method, under load. Alecto reads over her
shoulder while a strategy with **three bugs of three different types** meets a
seven-wave assault. Python shows her exactly one at a time, and the third one
does not appear until twenty-eight seconds into the battle — long after the first
two are fixed and the defense looks like it is working. That delay is the point:
a bug can hide until the data changes, and the only thing that finds it is
running the thing and reading what comes back.

```js
map: { cols: 16, rows: 10,
       path: [[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[6,3],[6,4],[6,5],[6,6],
              [6,7],[7,7],[8,7],[9,7],[10,7],[11,7],[12,7],[12,6],[12,5],[12,4],
              [12,3],[13,3],[14,3],[15,3]] },
gold: 540, campHp: 6, seed: 71,
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

Starter (broken on purpose; the towers are correct and must not be touched):
```python
place_tower("cannon", 4, 4)
place_tower("archer", 2, 1)
place_tower("archer", 5, 1)
place_tower("cannon", 8, 5)
place_tower("archer", 7, 4)
place_tower("lightning", 10, 6)
place_tower("cannon", 14, 5)

DANGER = {"harpy": 4, "satyr": 3, "hellhound": 2}

def choose_target(enemies):
    flyers = []
    for enemy in enemis:
        if enemy["flying"]:
            flyers.append(enemy)
    if len(flyers) > 0:
        return flyers[0]

    best = enemies[0]
    for enemy in enemies:
        if DANGER[enemy["kind"]] > DANGER[best["kind"]]:
            best = enemy
        elif enemy["hp"] / enemy["armour"] < best["hp"] / best["armour"]:
            best = enemy
    return best
```

**The three bugs, in the order the engine reveals them.** This ordering was
measured, not guessed, and the brief promises her three:

| # | She sees | At | The bug |
| --- | --- | --- | --- |
| 1 | `NameError: name 'enemis' is not defined` | 0.0s | `enemis` — a typo for `enemies` |
| 2 | `ZeroDivisionError: integer division or modulo by zero` | 0.0s | `enemy["armour"]` is 0 for satyrs and harpies |
| 3 | `KeyError: cyclops` | **28.0s**, after 32 kills | `DANGER` has no cyclops, and none arrives until wave 5 |

Then the second half of the task, which is not a bug fix at all: **armour it.**
Alecto's question is *"and the next thing the Titan sends — what happens then?"*
The finished function must be unable to end the battle by raising, whatever
walks up the path.

Solution:
```python
…the seven towers, unchanged…

DANGER = {"harpy": 4, "satyr": 3, "hellhound": 2}

def danger_of(enemy):
    try:
        return DANGER[enemy["kind"]]
    except KeyError:
        return 0

def effort(enemy):
    try:
        return enemy["hp"] / enemy["armour"]
    except ZeroDivisionError:
        return 0

def choose_target(enemies):
    flyers = []
    for enemy in enemies:
        if enemy["flying"]:
            flyers.append(enemy)
    if len(flyers) > 0:
        return flyers[0]

    best = enemies[0]
    for enemy in enemies:
        if danger_of(enemy) > danger_of(best):
            best = enemy
        elif danger_of(enemy) == danger_of(best) and effort(enemy) < effort(best):
            best = enemy
    return best
```

```js
check: { kind: "battle",
  also: { kind: "source",
          mustInclude: ["except KeyError", "except ZeroDivisionError"],
          mustExclude: ["except:"],
          message: { he: "אלקטו דורשת שהפונקציה תשרוד גם סוג מפלצת שלא ראית — כל סכנה עם ה-except המדויק שלה",
                     en: "Alecto requires the function to survive a monster kind you have never seen — each hazard with its own exact except" } } }
```

Verified: solution wins 6/6 HP with **57 kills** across seven waves and 51
seconds. Every partial fix was measured and loses. The towers with no
`choose_target` at all lose 3. `return 0` and `return enemies[0]` lose 1.
`return None` and the empty program lose 6.

**A quiet detail worth putting in the brief:** the seven towers are already
correct, and she is told so. Lesson 18 is the one lesson where the temptation is
to change everything at once, and removing the build from the search space is how
the level enforces "one change, one run".

Hints:
1. אל תקראי את כל הפונקציה. לחצי **לקרב!** ותראי מה קורה. פייתון יראה לך באג
   אחד — עברי עליו בארבעת הצעדים, תקני, ותריצי שוב. שלוש פעמים. שימי לב מתי
   בקרב כל אחד קרה; זה חלק מהמידע.
2. הראשון הוא שגיאת כתיב בשם משתנה. השני הוא חלוקה, ויש בגל מפלצות עם שריון 0.
   השלישי לא יופיע בכלל עד שמשהו כבד ייכנס לטווח בשנייה ה-28 — ואז השאלה היא
   איזה מפתח ביקשת ולא היה.
3. באג 1: `enemis` צריך להיות `enemies`. באג 2 ובאג 3: תוציאי את שני החישובים
   המסוכנים לשתי פונקציות, `danger_of` ו-`effort`, ותעטפי כל אחת ב-`try` עם
   ה-`except` המדויק שלה — `except KeyError` ו-`except ZeroDivisionError`,
   שתיהן מחזירות `0`. ככה גם תיקנת את שני הבאגים וגם ענית לאלקטו: מפלצת מסוג
   שלא ראית מעולם תקבל דירוג 0 במקום להפיל לך את הקרב. ואת `except:` לבד אל
   תכתבי — הוא היה מסתיר גם את הבאג הבא שלך.

## Reward & Recap

**Item**: 🔎 **עדשת הפוריות / The Furies' Lens** — "אלקטו הורידה אותה מהצוואר
ונתנה לך. היא מראה איפה נשבר. את ה'למה' את מוצאת לבד — ועכשיו את יודעת איך."

Bead 18 is added to the necklace.

**Achievements possible here**: *Debugger* (fixed an error and re-ran
successfully — most learners already hold this from lesson 1, but the great
battle is where it starts meaning something), *Exterminator* (all three bugs in
the great battle fixed without opening a hint), *Persistent* (won a battle after
five failed runs).

**Recap bullets**:
- שגיאה מספרת שלושה דברים: **סוג**, **תיאור**, **שורה** — קראי את שלושתם
- ארבעת הצעדים: מה הסוג · איזו שורה · מה ההשערה · איך אני בודקת
- השורה בשגיאה היא איפה פייתון ויתר, לא תמיד איפה טעית — עקבי אחורה עם `print`
- `try` / `except ValueError` מטפל בשגיאה שאת **מצפה** לה, בעיקר קלט מבחוץ
- `except` בלי סוג בולע גם באגים שלך — תפסי סוג מסוים בלבד
- הניסוח של הודעות שגיאה משתנה בין גרסאות פייתון; הסוג כמעט תמיד נשאר
- קוד שקורס באמצע קרב עוצר את כל המגדלים — פונקציה שמוגנת היא הגנה שמחזיקה

**Next teaser**: *"עברת את הפוריות. באולימפוס יש מפלס אחד שלא נכנסים אליו סתם —
הנפחייה. הפייסטוס בונה שם דברים שזזים לבד, ואת עומדת ללמוד לבנות אחד."*

## Common mistakes to anticipate

| She does | She sees | Hint must cover |
| --- | --- | --- |
| fixes the line in the error, not the line with the bug | the same error, or a new one | the error line is where Python gave up |
| changes three things then re-runs | a different error, no information gained | one change, one run |
| `except:` with no type | wrong answers, silently | catch the type you expect |
| `break` outside the `try` | the loop ends even on bad input | `break` runs only if the conversion succeeded |
| `print` of the success case after the `except` | success text printed for rejected items too | it belongs inside the `try` |
| `except ValueError` for a `ZeroDivisionError` | still crashes | the type in `except` has to match the type thrown |
| assumes the error text matches a tutorial word for word | confusion | wording varies between Pythons; the type does not |
| indexes a list she filtered herself | `IndexError` the moment the filter matches nothing | a list you built can still be empty |
| adds the missing key instead of handling the missing key | b4 and the great battle refuse it | some data you do not control; handle the absence |
| wraps the whole `choose_target` in one `try` | it wins, but hides the next mistake | wrap the risky line, not the function |
| `except:` with no type in a strategy function | a silently wrong target every tick | the `mustExclude` says so, and so does the message |

## Implementation notes

- Every snippet and every error message in this file was executed against the
  vendored `skulpt.min.js`. The error strings are quoted verbatim from that run,
  including the times at which each one fires inside its battle.
- **All five levels were played through the real engine** with
  `assets/js/battle/{sim,pyapi,play}.js` in a Node VM. Asserted for each: the
  solution wins with a perfect defense; the broken starter loses with the named
  error at the named moment; an empty program loses; and `return 0`,
  `return enemies[0]` and `return None` all lose. Re-measure if any number in a
  level changes.
- **The mechanic this lesson rests on is `sim.strategyError`.** When her Python
  raises inside `choose_target`, `sim.js` captures it, stops the loop, and
  `Battle.objective` returns `pass: false, reason: "strategyError"`. `play.js`
  then hands back the real traceback and a Hebrew line saying the towers stopped
  because her function did. Without that surfacing, four of these five levels
  would show "you lost" with 5/5 health and nothing to read — which is why it
  matters that it was fixed before this lesson was written.
- **Fidelity gaps deliberately surfaced to her** (callout 7) and re-verified
  against the vendored build:
  - `1/0` → Skulpt `ZeroDivisionError: integer division or modulo by zero`;
    CPython 3 `ZeroDivisionError: division by zero`. **b3 shows her this one.**
  - `d["b"]` on a missing key → Skulpt `KeyError: b`; CPython `KeyError: 'b'`.
    **b2 shows her this one**, as `KeyError: cyclops`.
  - `a[1]` past the end → `IndexError: list index out of range` in both. **b1.**
  - a missing indented block → Skulpt `SyntaxError: bad input (line N)`;
    CPython `IndentationError: expected an indented block after 'if' …`.
  - runaway recursion → Skulpt `RecursionError: Maximum call stack size
    exceeded`.
  - an unclosed bracket → Skulpt `SyntaxError: EOF in multi-line statement`, and
    the reported line can be **past the end of the file**. Worth knowing when
    triaging her questions; not worth putting in front of her.
- **`brokenStarter: true` on b1, b2, b3, b4 and the great battle.** That flag
  already exists (lesson 1 b3 uses it) and tells `verify-python.mjs` not to
  assert the starter runs cleanly. Without it, five of this lesson's levels
  would be reported as build failures.
- **No `source` check in this lesson sets `raw: true`.** Every requirement here
  targets syntax — `try`, `except KeyError`, `except ZeroDivisionError` — which
  survives comment and literal stripping. Adding `raw` would let the words
  inside a Hebrew comment satisfy the check.
- `mustExclude: ["except:"]` on b4 and the great battle is deliberate strictness
  and needs its `message` to carry the reason, because a bare `except` **wins the
  battle** and would otherwise look like an arbitrary refusal.
- **`print()` from inside `choose_target` reaches the live battle log** in the
  browser — the engine keeps streaming stdout while the simulation runs — so
  step 4 of the method (print and look) genuinely works mid-battle. It is
  **not** part of the captured output string, so no level may check it. Hint 2
  of b2 relies on the live behaviour and is correct.
- The Try It block ships **broken on purpose** and is ungraded, so nothing about
  it can fail. This is the only place in the course where the free-play editor
  starts in an error state; it is intentional and matches the lesson's subject.
- `engine.js` already normalises errors to `{type, message, line}`. This lesson
  is the reason that shape exists — the UI should display the type visually
  separated from the message so that step 1 of the method is a glance, not a
  parse.
