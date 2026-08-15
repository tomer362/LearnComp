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
| **XP** | 25 + 25 + 30 + 35 (training) + 55 (quest) + 30 (bonus) = **200** |

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
4. Use `try`/`except` for the errors she *expects* — bad input, mostly — and know
   that using it to silence errors she does not expect is worse than the error.

## Story beat

The scroll from lesson 17 has to reach Olympus. Olympus is on the six hundredth
floor of the Empire State Building, and the sky over Manhattan is not empty. Three
winged sisters intercept them halfway up — Alecto, Megaera, Tisiphone, the
Furies, who have spent three thousand years punishing people for being imprecise.

They will let a demigod pass on one condition. Something in her code is broken,
and she has to say exactly what. Not "it doesn't work". Not "something's wrong
with the list". Exactly.

The Prophecy panel (3–6 lines, no code):

> שלוש כנפיים חוסמות את השמיים מעל מנהטן.
> אלקטו נוחתת על מסילת הברזל ומטה את הראש. "טעית," היא אומרת.
> "אני יודעת שטעיתי," את עונה. "אני לא יודעת איפה."
> "אז נלמד אותך," אומר כירון בשקט מאחורייך. "לפוריות אין סבלנות לניחושים —"
> "— אבל יש להן כבוד עצום לתשובה מדויקת."

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
   שקרו. יש סוג אחד של שגיאה שאי אפשר לתקן מראש: שגיאה שמגיעה מבחוץ. אם
   המשתמשת מקלידה `שבע` במקום `7`, הקוד שלך מושלם והתוכנית עדיין קורסת. בשביל
   זה יש `try`.

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

13. **code (runnable)** — the pattern she will reuse forever: a validation loop.
    Everything in it is already hers (`while True`, `break`, `int()`), only the
    `try` is new.
    ```python
    answers = ["seven", "", "12"]
    index = 0
    while True:
        raw = answers[index]
        index = index + 1
        try:
            toll = int(raw.strip())
            break
        except ValueError:
            print("The Fury hisses. Numbers only.")
    print("Toll paid:", toll)
    ```
    Output:
    ```
    The Fury hisses. Numbers only.
    The Fury hisses. Numbers only.
    Toll paid: 12
    ```
    Caption: `break` יוצא מהלולאה **רק** אם `int()` הצליח. אם הוא נכשל, ה-`break`
    לא מגיע לרוץ בכלל, והלולאה שואלת שוב. במשימה הבאה זה יהיה `input()` אמיתי.

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

## Training exercises

### e1 — Name the Fury · 25 XP, 6 🪙

Two lines. One error. Read it, fix it, move on. Deliberately near-free — the
point is to run the four steps once while the stakes are zero.

Starter (given broken):
```python
hero_name = "Annabeth"
print("Welcome, " + hero_nome)
```

Required output:
```
Welcome, Annabeth
```

Solution:
```python
hero_name = "Annabeth"
print("Welcome, " + hero_name)
```

- **check**: `{ kind: "output", mode: "normalized", expect: "Welcome, Annabeth" }`
- hints:
  1. הריצי. מה המילה הראשונה בשגיאה, ואיזו שורה היא מציינת?
  2. `NameError` אומר שפייתון פגש שם שהוא לא מכיר. השווי את השם בשורה 2 לשם
     בשורה 1, אות אות.
  3. בשורה 1 המשתנה נקרא `hero_name`. בשורה 2 כתוב `hero_nome`, עם `o`.
     פייתון לא מנחש מה התכוונת — בשבילו אלה שני שמות שונים לגמרי.

### e2 — The Fury's arithmetic · 25 XP, 6 🪙

Alecto wants the toll. The number came in as text, the way numbers always do when
they come from outside.

Starter (given broken):
```python
drachmas = "12"
toll = 3
print("You owe: " + (drachmas + toll))
```

Required output:
```
You owe: 15
```

Solution:
```python
drachmas = "12"
toll = 3
print("You owe: " + str(int(drachmas) + toll))
```

- **check**: `{ kind: "output", mode: "normalized", expect: "You owe: 15" }`
- This is `TypeError` in its natural habitat, and it requires two conversions in
  opposite directions in one line — `int()` going in, `str()` coming out. That is
  the actual difficulty and hint 3 walks it.
- An f-string solution (`print(f"You owe: {int(drachmas) + toll}")`) is equally
  correct and passes the same check. Hint 3 mentions it.
- hints:
  1. `TypeError` מדבר על שני סוגים. איזה שני סוגים נפגשים בשורה 3? הדפיסי
     `type(drachmas)` ו-`type(toll)` ותראי.
  2. `drachmas` הוא string, למרות שכתוב בו מספר. חיבור של string ומספר לא מוגדר
     בפייתון. את צריכה להפוך אותו למספר לפני החיבור.
  3. שני שינויים באותה שורה: `int(drachmas) + toll` נותן `15` כמספר, ואז
     `"You owe: " + str(...)` כי אי אפשר לחבר טקסט למספר גם בכיוון הזה.
     בקיצור: `print("You owe: " + str(int(drachmas) + toll))`. אותו דבר עם
     f-string: `print(f"You owe: {int(drachmas) + toll}")`.

### e3 — The gate of the Underworld · 30 XP, 8 🪙

Charon checks the tokens at the gate. Some are real, some are somebody's excuse.
Real tokens pass with their number; anything else is turned back — and the queue
keeps moving either way.

Starter:
```python
answers = ["12", "seven", "3", "-", "40"]
# print one line per token:
#   "12 -> 12"        if it is a number
#   "seven -> REJECTED"  if it is not
# the loop must never crash
```

Required output:
```
12 -> 12
seven -> REJECTED
3 -> 3
- -> REJECTED
40 -> 40
```

Solution:
```python
answers = ["12", "seven", "3", "-", "40"]
for answer in answers:
    try:
        number = int(answer)
        print(answer + " -> " + str(number))
    except ValueError:
        print(answer + " -> REJECTED")
```

- **check**: `{ kind: "output", mode: "normalized", expect: "12 -> 12\nseven -> REJECTED\n3 -> 3\n- -> REJECTED\n40 -> 40" }`
  plus `{ kind: "source", mustInclude: ["try", "except"], message: { he: "המשימה הזו דורשת try/except — לא בדיקה מראש", en: "This one needs try/except, not a pre-check" } }`
- The `source` check exists because `.isdigit()` would also work and would teach
  the wrong lesson today. Say so in the brief: there is more than one way, and
  today we practise this one.
- The important structural point, which hint 3 makes: the `print` of a successful
  token belongs **inside** the `try`, after the conversion. Putting it after the
  whole `try`/`except` prints a line for rejected tokens too.
- hints:
  1. מה קורה כרגע כשהלולאה מגיעה ל-`"seven"`? איזה סוג שגיאה, ומה זה עושה לשאר
     הרשימה?
  2. `int("seven")` זורק `ValueError`. עטפי את ההמרה ב-`try`, ותני ל-`except
     ValueError` להדפיס את שורת ה-REJECTED.
  3. בתוך הלולאה: `try:` ואז `number = int(answer)` ואז ההדפסה המוצלחת —
     שתיהן בפנים. אחר כך `except ValueError:` ובתוכו ההדפסה של REJECTED. אם
     ההמרה נכשלת, פייתון קופץ ישר ל-`except` ולא מריץ את ההדפסה הראשונה בכלל.

### e4 — The toll booth · 35 XP, 9 🪙

Now the number comes from a person, in real time, and people type whatever they
like. The booth does not open until it gets a number, and it does not crash and
it does not give up.

Starter:
```python
# keep asking until the answer converts to a number,
# then print the toll
# prompt text: "How many drachmas? "
```

Solution:
```python
while True:
    answer = input("How many drachmas? ")
    try:
        amount = int(answer)
        break
    except ValueError:
        print("The Fury hisses. Numbers only.")
print("Toll paid: " + str(amount))
```

- **check**:
  ```js
  { kind: "cases", cases: [
      { stdin: ["three", "3"], expect: "The Fury hisses. Numbers only.\nToll paid: 3" },
      { stdin: ["10"],         expect: "Toll paid: 10" } ] }
  ```
- Verified: Skulpt passes the prompt string to `inputfun` and does **not** write
  it to stdout, so the prompt text never appears in the compared output. The UI
  renders it as an Iris-message.
- The whole difficulty is the placement of `break`: inside the `try`, after the
  conversion. Anywhere else and the loop either never ends or ends too early.
  This is the hardest structural idea in the lesson.
- hints:
  1. איזו לולאה רצה "עד שמשהו מצליח", כשאת לא יודעת מראש כמה פעמים? ואיפה
     בקוד את יודעת שהמרה **הצליחה**?
  2. `while True` עם `break`, כמו בשיעור 7. את ה-`int()` עוטפים ב-`try`, ואת
     ההודעה למשתמשת שמים ב-`except ValueError`.
  3. סדר הפעולות: `while True:` → `answer = input(...)` → `try:` → בפנים
     `amount = int(answer)` ואז `break`. ה-`break` חייב להיות **בתוך** ה-`try`
     ואחרי ההמרה — ככה הוא רץ רק אם ההמרה עברה. ב-`except ValueError` מדפיסים
     הודעה ולא עושים כלום נוסף, והלולאה מסתובבת ושואלת שוב. ההדפסה האחרונה
     יושבת אחרי הלולאה, בלי הזחה.

## Quest — "The Interrogation" · 55 XP, 14 🪙

Alecto lands on the rail and reads over her shoulder. The party's treasury report
has three separate bugs in it, of three different types. She fixes all three —
and then Alecto asks the question that turns a fix into engineering: *"and what
happens when the party is empty?"*

Brief:
1. Fix the three bugs so the report prints correctly.
2. Then armour the division: if the party were empty, the report must print
   `SHARE: none` instead of crashing. It will not happen today. Armour it anyway.

Starter (given broken — the comments are part of the starter):
```python
heroes = ["Percy", "Annabeth", "Grover"]
loot = 90

print("HEROES: " + str(len(heroes)))
print("LOOT: " + loot)
share = loot / len(heros)
print("SHARE: " + str(share))
print("LAST HERO: " + heroes[3])
```

Required output:
```
HEROES: 3
LOOT: 90
SHARE: 30.0
LAST HERO: Grover
```

Solution:
```python
heroes = ["Percy", "Annabeth", "Grover"]
loot = 90

print("HEROES: " + str(len(heroes)))
print("LOOT: " + str(loot))

try:
    share = loot / len(heroes)
    print("SHARE: " + str(share))
except ZeroDivisionError:
    print("SHARE: none")

print("LAST HERO: " + heroes[2])
```

- **check**: `{ kind: "output", mode: "normalized", expect: "HEROES: 3\nLOOT: 90\nSHARE: 30.0\nLAST HERO: Grover" }`
  plus `{ kind: "source", mustInclude: ["try", "except", "ZeroDivisionError"], message: { he: "אלקטו דורשת שהחלוקה תהיה מוגנת — גם אם החבורה ריקה", en: "Alecto requires the division to be armoured against an empty party" } }`
- **The three bugs, and the order Python reveals them** — this matters, because
  she meets them one at a time and each fix uncovers the next:
  1. Line 5 · `TypeError: cannot concatenate 'str' and 'int' objects` — `loot` is
     an `int`, needs `str(loot)`.
  2. Line 6 · `NameError: name 'heros' is not defined` — a typo for `heroes`.
  3. Line 8 · `IndexError: list index out of range` — three heroes live at
     0, 1, 2. `heroes[3]` is the fourth. `heroes[-1]` also passes.
- `SHARE: 30.0` and not `30` — `/` always produces a `float` in Python 3, which
  she met in lesson 4. If she "fixes" it to `30` the check will fail and the
  reason is worth reading.
- The armouring never fires with three heroes in the list, and that is the point:
  she is writing code for a case that has not happened yet. Say that in the
  brief. It is the first genuinely professional habit in the course.
- hints:
  1. אל תקראי את כל התוכנית. הריצי אותה. פייתון יראה לך באג אחד — תעברי עליו
     בארבעת הצעדים, תתקני, ותריצי שוב. שלוש פעמים.
  2. שלושת הסוגים שיופיעו הם `TypeError` (משהו צריך `str()` סביבו),
     `NameError` (שם כתוב לא נכון) ו-`IndexError` (מקום שלא קיים ברשימה —
     כמה איברים יש, ומה המספר של האחרון?). לחלק האחרון: איזו שגיאה תיפול אם
     `len(heroes)` הוא 0?
  3. שורה 5: `loot` הוא מספר, אז `"LOOT: " + str(loot)`. שורה 6: `heros` חסר
     `e`. שורה 8: לשלושה גיבורים יש מקומות 0, 1, 2 — האחרון הוא `heroes[2]`
     (או `heroes[-1]`). לשריון: עטפי את חישוב ה-`share` ואת ההדפסה שלו ב-`try`,
     ותוסיפי `except ZeroDivisionError:` שמדפיס `"SHARE: none"`. היום הוא לא
     ירוץ. ביום שהחבורה תהיה ריקה, הוא יציל את הדוח.

## Reward & Recap

**Item**: 🔎 **עדשת הפוריות / The Furies' Lens** — "אלקטו הורידה אותה מהצוואר
ונתנה לך. היא מראה איפה נשבר. את ה'למה' את מוצאת לבד — ועכשיו את יודעת איך."

Bead 18 is added to the necklace.

**Achievements possible here**: *Debugger* (fixed an error and re-ran
successfully — most learners already hold this from lesson 1, but the quest is
where it starts meaning something), *Exterminator* (all three quest bugs fixed
without opening a hint), *Persistent* (solved an exercise after five failed runs).

**Recap bullets**:
- שגיאה מספרת שלושה דברים: **סוג**, **תיאור**, **שורה** — קראי את שלושתם
- ארבעת הצעדים: מה הסוג · איזו שורה · מה ההשערה · איך אני בודקת
- השורה בשגיאה היא איפה פייתון ויתר, לא תמיד איפה טעית — עקבי אחורה עם `print`
- `try` / `except ValueError` מטפל בשגיאה שאת **מצפה** לה, בעיקר קלט מבחוץ
- `except` בלי סוג בולע גם באגים שלך — תפסי סוג מסוים בלבד
- הניסוח של הודעות שגיאה משתנה בין גרסאות פייתון; הסוג כמעט תמיד נשאר

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

## Implementation notes

- Every snippet and every error message in this file was executed against the
  vendored `skulpt.min.js`. The error strings are quoted verbatim from that run.
- **Fidelity gaps deliberately surfaced to her** (callout 7) and verified here:
  - `1/0` → Skulpt `ZeroDivisionError: integer division or modulo by zero`;
    CPython 3 `ZeroDivisionError: division by zero`.
  - `d["b"]` on a missing key → Skulpt `KeyError: b`; CPython `KeyError: 'b'`.
  - a missing indented block → Skulpt `SyntaxError: bad input on line N`;
    CPython `IndentationError: expected an indented block after 'if' …`.
  - an unclosed bracket → Skulpt `SyntaxError: EOF in multi-line statement` and
    the reported line can be **past the end of the file**. Worth knowing when
    triaging her support questions; not worth putting in front of her.
- `engine.js` already normalises errors to `{type, message, line}`. This lesson
  is the reason that shape exists — the UI should display the type visually
  separated from the message so that step 1 of the method is a glance, not a
  parse.
- The engine's Hebrew explainer should have an entry per error type in the block-6
  list. Never replace the English text — show both, English first, exactly as
  lesson 1 established.
- e4 is the only exercise here that uses `input()`, so it is the only one using
  `kind: "cases"`. Its two cases cover the retry path and the first-try path.
- The Try It block ships **broken on purpose** and is ungraded, so nothing about
  it can fail. This is the only place in the course where the free-play editor
  starts in an error state; it is intentional and matches the lesson's subject.
