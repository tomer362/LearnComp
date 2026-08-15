# Lesson 02 — The Camp Necklace · שרשרת המחנה

> **Act I — Camp Half-Blood** · Stop 2 of 20
> Follows the reference structure in `spec/lessons/lesson-01.md`.
> Schema: `spec/04-lesson-template.md`.

| | |
| --- | --- |
| **id** | `02` |
| **slug** | `the-camp-necklace` |
| **minutes** | 25–30 |
| **concepts** | variables, assignment, reassignment, `str` / `int` / `float`, `type()` |
| **new vocabulary** | `=`, `type` |
| **requires** | lesson 1 — `print()`, strings, quotes, comments, reading an error |
| **item** | 🪢 רצועת העור / The Leather Cord |
| **XP** | 20 + 20 + 25 + 30 (training) + 50 (quest) + 30 (bonus) = **175** |
| **drachmas** | 5 + 5 + 8 + 8 + 12 = **38** 🪙 |

## Teaching goal

By the end she can give a value a name, use that name anywhere afterwards,
change what the name holds, and tell the three basic types apart — including the
one that fools everyone: a number wrapped in quotes.

The emotional goal: *"the program remembers things now."* Lesson 1 made the
machine speak. Lesson 2 gives it a memory, and a memory is what turns a list of
`print` lines into something that could be called a program.

**The single hardest idea here is that `=` is not "equals".** It is an arrow
pointing left: *put this value into this name*. Everything confusing about
reassignment comes from reading `=` as maths. Teach the arrow early and repeat
it.

## Story beat

Morning after the claiming. She wakes in her cabin with an empty leather cord
around her neck — the camp necklace, one bead per summer, and hers has exactly
one bead on it from last night. At breakfast Chiron unrolls the camp registry:
every camper who has ever passed through, name after name after name, and beside
each name the things the camp keeps track of — cabin, summers survived, how far
they can throw a spear.

He makes the point that will carry the whole lesson: the camp does not remember
people, it remembers **names with things attached to them**. Python works the
same way.

The Prophecy panel (5 lines, no code):

> הבוקר הראשון שלך במחנה. הרצועה על הצוואר שלך כמעט ריקה — חרוז אחד.
> כירון פורש על השולחן מגילה ארוכה: כל מי שעבר פה, שורה אחרי שורה.
> "אלפי שמות," הוא אומר, "ואף אחד מהם לא הלך לאיבוד."
> "כי לכל דבר במחנה יש שם, והשם מחזיק את מה שיש בפנים."
> "אתמול לימדתי אותך לדבר. היום את לומדת לזכור."

Cast: Chiron (registry, the arrow metaphor). Grover appears in a `tip` callout,
having named all his variables `a`, `b` and `c` and now unable to read his own
notes. Annabeth appears in the `myth` callout with the true-name idea.

## Chiron Teaches — block by block

1. **prose** — Yesterday every `print` said its piece and the program forgot it
   instantly. That is fine for one sentence and hopeless for a camp of two
   hundred campers. A program that cannot hold on to anything cannot do anything
   interesting. So: names.

2. **code (runnable)** — her first variable, and it must be running inside the
   first 60 seconds of the page.
   ```python
   hero = "Annabeth"
   print(hero)
   ```
   Output: `Annabeth`
   Caption (he): *"שורה אחת יוצרת את השם, שורה שנייה משתמשת בו. מעכשיו `hero`
   מחזיק את הערך הזה."*

3. **prose** — Anatomy, named only *after* she ran it. On the left of `=` is the
   **name** (משתנה / variable). On the right is the **value** (ערך). The `=` is
   not the `=` from maths — it is an arrow pointing left: **put the value into
   the name.** Read the line out loud as "hero מקבל את Annabeth", never as
   "hero שווה Annabeth". This one sentence prevents most of lesson 2's confusion.

4. **compare** — the compare block of the lesson. Quotes decide whether Python
   sees a name or sees text.
   - **bad**: `print("hero")` → prints `hero`. The quotes made it text, so
     Python printed the text.
   - **good**: `print(hero)` → prints `Annabeth`. No quotes, so Python treats it
     as a name, looks the name up, and prints what is inside.
   Label (he) for bad: *"בגרשיים — זה טקסט"*; for good: *"בלי גרשיים — זה שם"*.

5. **code (runnable)** — three variables, three kinds of value.
   ```python
   camper = "Silena"
   beads = 4
   power = 7.5
   print(camper)
   print(beads)
   print(power)
   ```
   Output:
   ```
   Silena
   4
   7.5
   ```
   Caption (he): *"שלושה שמות, שלושה סוגים של ערך. שימי לב מה יש גרשיים ומה אין."*

6. **prose** — Now name the three types, after she has seen them:
   - **string** (`str`, מחרוזת) — text in quotes.
   - **integer** (`int`, מספר שלם) — a whole number, no quotes, no dot.
   - **float** (`float`, מספר עשרוני) — a number with a dot.
   And the rule that catches everybody: **quotes win.** `"4"` with quotes is a
   string that happens to look like a number. Python will not treat it as one.

7. **code (runnable)** — `type()` is how you ask Python what something actually
   is. Frame it as Chiron holding up four objects and asking her to identify each.
   ```python
   print(type("Silena"))
   print(type(4))
   print(type(7.5))
   print(type("4"))
   ```
   Output:
   ```
   <class 'str'>
   <class 'int'>
   <class 'float'>
   <class 'str'>
   ```
   Caption (he): *"השורה האחרונה היא הפאנץ' — `"4"` נראה כמו מספר, ו-Python רואה
   טקסט."* `type()` will be her lie detector for the rest of the course.

8. **callout · tip** — Naming rules, as camp rules:
   - English letters, digits and `_`. No spaces: `cabin_name`, not `cabin name`.
   - Cannot start with a digit: `beads2` works, `2beads` does not.
   - Capital letters matter. `Hero` and `hero` are two different names.
   - The name should say what is inside. Grover named everything `a`, `b`, `c`,
     and now he cannot read his own notes from last summer.
   Title (he): *"איך קוראים למשתנה"*.

9. **error block** — the required error of the lesson. A typo in a name.
   ```python
   cabin = "Poseidon"
   print(cabbin)
   ```
   Real error: `NameError: name 'cabbin' is not defined`
   Explanation (he): *"Python חיפש שם בשם `cabbin` ולא מצא. הוא לא מנחש ולא מתקן
   — אם כתבת `cabin` למעלה ו-`cabbin` למטה, אלה שני שמות שונים לגמרי. שגיאת
   `NameError` כמעט תמיד אומרת אחד משלושה דברים: שגיאת כתיב, אות גדולה במקום
   קטנה, או שהשורה שיוצרת את המשתנה עוד לא רצה."*
   This trio — typo / capital / order — is the whole diagnostic and she should
   leave the lesson able to recite it.

10. **code (runnable)** — reassignment, and why order matters.
    ```python
    monsters_left = 3
    print(monsters_left)
    monsters_left = 2
    print(monsters_left)
    ```
    Output:
    ```
    3
    2
    ```
    Caption (he): *"אותו שם, שני ערכים — אבל אף פעם לא בו זמנית. השם מחזיק ערך
    אחד, והחדש דוחף את הישן החוצה."* The first `print` already ran, so it printed
    the old value. Lines run top to bottom — that rule from lesson 1 is what
    makes this predictable.

11. **callout · warn** — A name has to exist before it is used. This runs fine:
    `beads = 4` then `print(beads)`. This does not: `print(beads)` then
    `beads = 4` — `NameError`, because at the moment the `print` ran, the name
    did not exist yet.
    Title (he): *"קודם ליצור, אחר כך להשתמש"*.

12. **callout · myth** — Annabeth's aside: in the old stories, knowing the true
    name of a thing gives you power over it — that is why heroes bargain for
    names and why gods hide theirs. Programming kept the idea intact. Once you
    have named a value, you can reach it, change it, and send it anywhere.
    Title (he): *"השם האמיתי"*.

13. **prose** — The honest limitation, and the hook for tomorrow: right now each
    `print` shows one value on a line of its own, so her output looks like a
    shopping list. Tomorrow she learns to weave names into a sentence — and to
    let the program ask *her* a question. (Do not demonstrate f-strings here.
    They belong to lesson 3.)

## Try It (ungraded)

Free-play editor. Nothing is checked, nothing is scored.

```python
hero = "Percy"
cabin = "Poseidon"
beads = 1

print(hero)
print(cabin)
print(beads)
```

Intro (he): *"המגרש שלך. שני את הערכים למה שבא לך, תוסיפי משתנה משלך, ונסי גם
`print(type(cabin))` כדי לראות מה Python חושב שיש שם. שום דבר פה לא נבדק."*
(en): *"Your playground. Change the values, add a variable of your own, and try
`print(type(cabin))` to see what Python thinks it is holding. Nothing here is
graded."*

## Training exercises

### e1 — השם על הרצועה / A name on the cord · 20 XP, 5 🪙

**brief (he)**: *"הרצועה שלך עוד בלי שם. שימי את השם שלך בין הגרשיים בשורה
הראשונה, והריצי."*
**brief (en)**: *"Your cord has no name on it yet. Put your name between the
quotes on line 1 and run."*

**starter**
```python
hero = ""
print(hero)
```

**solution** (reference; she uses her own name)
```python
hero = "Annabeth"
print(hero)
```

**check** — open-ended content, so it follows lesson 1's e1 pattern: a `source`
check plus a loose `output` check, both must pass.
```js
check: [
  { kind: "source", mustInclude: ["hero"],
    message: { he: "המשתנה חייב להישאר בשם hero, וצריך להדפיס אותו",
               en: "Keep the variable called hero, and print it" } },
  { kind: "output", mode: "regex", expect: "\\S" }
]
```
The regex is what stops an empty pair of quotes from passing — `hero = ""`
prints a blank line and fails, which is exactly the feedback she needs.

**hints**
1. *nudge* (he): *"הריצי את הקוד כמו שהוא. מה הודפס? מה יש עכשיו בתוך `hero`?"*
   (en): *"Run it as it is. What got printed? What is inside `hero` right now?"*
2. *tool* (he): *"ערך של string נכנס בין שני הגרשיים. שורה 2 כבר מדפיסה את מה
   שיש שם — היא לא צריכה שינוי."*
   (en): *"A string value goes between the two quote marks. Line 2 already
   prints whatever is there — leave it alone."*
3. *walkthrough* (he): *"שורה 1 יוצרת שם בשם `hero` ומכניסה לתוכו טקסט. כרגע
   הטקסט ריק, ולכן הפלט ריק. כתבי את השם שלך בין הגרשיים: `hero = "Annabeth"` —
   עם השם שלך במקום. שורה 2 נשארת בדיוק כמו שהיא."* → solution unlocks.

### e2 — שלושה חרוזים / Three beads · 20 XP, 5 🪙

**brief (he)**: *"צרי שלושה משתנים: `camper` עם הטקסט `Silena`, `beads` עם המספר
השלם `4`, ו-`power` עם המספר `7.5`. אחר כך הדפיסי כל אחד בשורה משלו, באותו סדר."*
**brief (en)**: *"Create three variables: `camper` holding the text `Silena`,
`beads` holding the whole number `4`, and `power` holding `7.5`. Then print each
one on its own line, in that order."*

**starter**
```python
# three beads, three kinds of value
```

**solution**
```python
camper = "Silena"
beads = 4
power = 7.5
print(camper)
print(beads)
print(power)
```

**check**
```js
check: { kind: "output", mode: "normalized", expect: "Silena\n4\n7.5" }
```

Teaches: quotes on the string, no quotes on the numbers, and that printing a
variable prints its value.

**hints**
1. *nudge* (he): *"כמה שורות פלט צריכות לצאת? וכמה משתנים צריך בשביל זה?"*
   (en): *"How many lines of output should appear? How many variables does that
   need?"*
2. *tool* (he): *"כל משתנה נוצר בשורה משלו בצורה `name = value`. טקסט מקבל
   גרשיים, מספרים לא. ההדפסה היא `print(name)` — בלי גרשיים."*
   (en): *"Each variable gets its own line, `name = value`. Text takes quotes,
   numbers do not. Printing is `print(name)` — no quotes."*
3. *walkthrough* (he): *"שלוש שורות יצירה ואז שלוש שורות הדפסה. השתיים
   הראשונות: `camper = "Silena"` ואחריה `beads = 4`. המשיכי באותו דפוס עם
   `power`, ואז שלוש שורות `print` לפי הסדר."* → solution unlocks.

### e3 — ראש הצריף מתחלף / The counsellor changes · 25 XP, 8 🪙

**brief (he)**: *"קלריס לקחה פיקוד. אל תשני את השורות הקיימות — הוסיפי מתחתן
שורות שמכניסות ל-`head_counselor` את `Clarisse` ול-`cabin_number` את `5`, ואז
מדפיסות את שניהם שוב. המרשם צריך להראות מי היה ומי עכשיו."*
**brief (en)**: *"Clarisse has taken over. Do not change the existing lines —
add lines underneath that put `Clarisse` into `head_counselor` and `5` into
`cabin_number`, then print both again. The registry has to show who it was and
who it is now."*

**starter**
```python
head_counselor = "Annabeth"
cabin_number = 6
print(head_counselor)
print(cabin_number)
# add your lines below
```

**solution**
```python
head_counselor = "Annabeth"
cabin_number = 6
print(head_counselor)
print(cabin_number)
head_counselor = "Clarisse"
cabin_number = 5
print(head_counselor)
print(cabin_number)
```

**check**
```js
check: { kind: "output", mode: "normalized",
         expect: "Annabeth\n6\nClarisse\n5" }
```
The check enforces the "don't edit the top" instruction for free: the old values
must still appear first, which can only happen if the first two `print` calls run
before the reassignment.

Teaches: a name holds one value at a time, reassignment replaces it, and a
`print` that already ran cannot be retroactively changed.

**hints**
1. *nudge* (he): *"מה קורה למשתנה אם כותבים לו `=` פעם שנייה, בשורה מאוחרת יותר?
   ומה קורה ל-`print` שכבר רץ לפני זה?"*
   (en): *"What happens to a variable if you write `=` to it a second time,
   further down? And what happens to a `print` that already ran?"*
2. *tool* (he): *"אפשר להשים ערך חדש לשם קיים בדיוק כמו שיצרת אותו:
   `head_counselor = "Clarisse"`. אחרי זה כל `print` חדש יראה את הערך החדש."*
   (en): *"You assign a new value to an existing name exactly the way you
   created it: `head_counselor = "Clarisse"`. Every `print` after that shows the
   new value."*
3. *walkthrough* (he): *"את צריכה ארבע שורות חדשות מתחת לקיימות: שתיים שמשנות
   את הערכים ושתיים שמדפיסות. הראשונה היא `head_counselor = "Clarisse"`, אחריה
   `cabin_number = 5`, ואז `print(head_counselor)` ו-`print(cabin_number)`."*
   → solution unlocks.

### e4 — מה אני מחזיקה? / What am I holding? · 30 XP, 8 🪙

**brief (he)**: *"כירון מרים ארבעה דברים אחד אחרי השני ושואל מה כל אחד מהם.
הדפיסי את הטיפוס של כל אחד, לפי הסדר: הטקסט `Percy`, המספר `12`, המספר `1.75`,
והטקסט `"12"` — כן, זה עם הגרשיים. ארבע שורות פלט."*
**brief (en)**: *"Chiron holds up four things and asks what each one is. Print
the type of each, in order: the text `Percy`, the number `12`, the number
`1.75`, and the text `"12"` — yes, that one has quotes. Four lines of output."*

**starter**
```python
# four things. what is each one, really?
```

**solution**
```python
print(type("Percy"))
print(type(12))
print(type(1.75))
print(type("12"))
```
(An equally valid solution stores each in a variable first and prints
`type(name)`. Both pass.)

**check**
```js
check: { kind: "output", mode: "normalized",
         expect: "<class 'str'>\n<class 'int'>\n<class 'float'>\n<class 'str'>" }
```

**hints**
1. *nudge* (he): *"שלושה מהארבעה הם בדיוק מה שהם נראים. אחד מהם משקר — איזה?"*
   (en): *"Three of the four are exactly what they look like. One of them is
   lying — which?"*
2. *tool* (he): *"`type(x)` מחזיר את הטיפוס של `x`, ו-`print` מראה אותו. אפשר
   לשים אחד בתוך השני: `print(type(12))`."*
   (en): *"`type(x)` gives the type of `x`, and `print` shows it. You can nest
   them: `print(type(12))`."*
3. *walkthrough* (he): *"ארבע שורות, כל אחת בצורה `print(type(...))`. הראשונה:
   `print(type("Percy"))`. השנייה עם `12` בלי גרשיים. השלישית עם `1.75`.
   הרביעית עם `"12"` — עם גרשיים, וזאת בדיוק הנקודה: היא תדפיס `<class 'str'>`."*
   → solution unlocks.

## Quest — "מגילת המרשם / The Registry Scroll" · 50 XP, 12 🪙

**brief (he)**: *"כירון מכתיב לך רשומה חדשה למגילה, ואת רושמת. צרי משתנה לכל
שדה, ואז הדפיסי את המגילה בדיוק בסדר הזה. השורה הראשונה היא כותרת — טקסט קבוע,
לא משתנה. השורה האחרונה היא אישור: הטיפוס של `power`, כדי שהמרשם יידע שזה מספר
עשרוני ולא טקסט."*

**brief (en)**: *"Chiron dictates a new registry entry and you write it down.
Make a variable for each field, then print the scroll in exactly this order. The
first line is a heading — fixed text, not a variable. The last line is the
certification: the type of `power`, so the registry knows it is a float and not
text."*

Field names she must use: `full_name`, `cabin`, `cabin_number`, `summers`,
`power`.

Required output — exactly seven lines:
```
CAMP HALF-BLOOD REGISTRY
Luke Castellan
Hermes
11
2
6.5
<class 'float'>
```

**solution**
```python
# registry entry, dictated by Chiron
full_name = "Luke Castellan"
cabin = "Hermes"
cabin_number = 11
summers = 2
power = 6.5

print("CAMP HALF-BLOOD REGISTRY")
print(full_name)
print(cabin)
print(cabin_number)
print(summers)
print(power)
print(type(power))
```

**check**
```js
check: { kind: "output", mode: "normalized",
         expect: "CAMP HALF-BLOOD REGISTRY\nLuke Castellan\nHermes\n11\n2\n6.5\n<class 'float'>" }
```

Why this is the right quest: it is the whole lesson in one artefact — a fixed
string from lesson 1, five variables of three different types, and `type()` as a
proof. It is long enough to feel like real work and contains nothing she has not
met in the last twenty minutes. If `power` is written as `6` instead of `6.5` the
last line reports `<class 'int'>` and the check fails, which teaches the
int/float distinction better than any paragraph could.

**hints**
1. *nudge* (he): *"תספרי את שורות הפלט. כמה מהן טקסט קבוע וכמה מהן ערכים של
   משתנים? ומה השורה האחרונה בעצם מבקשת ממך?"*
   (en): *"Count the output lines. How many are fixed text and how many are
   values of variables? And what is that last line actually asking for?"*
2. *tool* (he): *"השורה הראשונה היא string רגיל בתוך `print`, עם גרשיים. חמש
   השורות שאחריה הן שמות משתנים בלי גרשיים. השורה האחרונה היא `type()` על
   המשתנה האחרון."*
   (en): *"The first line is an ordinary string inside `print`, with quotes. The
   five after it are variable names without quotes. The last line is `type()` on
   the last variable."*
3. *walkthrough* (he): *"קודם חמש שורות יצירה, אחת לכל שדה — למשל
   `full_name = "Luke Castellan"`, אחריה `cabin = "Hermes"`, אחריה
   `cabin_number = 11`. שימי לב: `11` ו-`2` בלי גרשיים כי הם מספרים שלמים,
   ו-`power` הוא `6.5` עם נקודה. אחר כך שבע שורות `print`: הראשונה
   `print("CAMP HALF-BLOOD REGISTRY")`, ואז אחת לכל משתנה לפי הסדר, ובסוף
   `print(type(power))`."* → solution unlocks.

## Reward & Recap

**Item**: 🪢 **רצועת העור / The Leather Cord** —
(he) *"הרצועה שמחזיקה את כל החרוזים. משתנה עושה בדיוק את זה: מחזיק ערך, ונותן לו
שם שאפשר לחזור אליו."*
(en) *"The cord that holds every bead. A variable does the same thing: it holds a
value and gives it a name you can come back to."*

**Achievements possible here**
- *קוראת בשמות / Namer of Things* — created and printed a variable for the first
  time.
- *בלשית טיפוסים / Type Detective* — ran a program with four or more `type()`
  calls (e4).
- *עקשנית / Persistent* (global) — solved an exercise after five failed runs.
- *בלי רמזים / No Hints Needed* (global) — finished the lesson without buying a
  hint.

**Recap bullets**
- משתנה הוא שם שמחזיק ערך: `beads = 4`
- `=` זה לא "שווה" — זה חץ שמאלה: תכניס את הערך לתוך השם
- `print(hero)` בלי גרשיים מדפיס את הערך, `print("hero")` עם גרשיים מדפיס טקסט
- שלושה טיפוסים בסיסיים: `str` (טקסט), `int` (מספר שלם), `float` (מספר עם נקודה)
- `type(x)` מגלה מה יש באמת בפנים — ו-`"4"` בגרשיים הוא `str`, לא מספר
- השמה חוזרת מחליפה את הערך הישן; מה שכבר הודפס נשאר מודפס
- `NameError` אומר: שגיאת כתיב, אות גדולה, או שהשורה שיוצרת את המשתנה עוד לא רצה

**Next teaser** (he): *"עכשיו התוכנית שלך זוכרת. מחר היא תשאל אותך שאלה — ותחכה
לתשובה."*
(en): *"Your program remembers now. Tomorrow it asks you a question — and waits
for the answer."*

## Common mistakes to anticipate

| She does | She sees | Hint / callout must cover |
| --- | --- | --- |
| `print("hero")` when she meant the value | `hero` | quotes make it text; a name has no quotes |
| `hero = Annabeth` | `NameError: name 'Annabeth' is not defined` | the value on the right needs quotes to be text |
| `Hero = "x"` then `print(hero)` | `NameError: name 'hero' is not defined` | names are case-sensitive |
| `print(beads)` above the line `beads = 4` | `NameError: name 'beads' is not defined` | create before use; lines run top to bottom |
| `beads = "4"` and then treats it as a number | **no error at all** — `type()` reports `<class 'str'>` | the silent bug of the lesson; `type()` is the detector |
| `2beads = 5` | `SyntaxError: invalid decimal literal` | a name cannot start with a digit |
| `camp name = "x"` | `SyntaxError: invalid syntax` | no spaces in names — use `camp_name` |
| `"Percy" = hero` (arrow reversed) | `SyntaxError: cannot assign to literal here. Maybe you meant '==' instead of '='?` | the name goes on the left, always |
| expects `power = 6` to be a float | last quest line prints `<class 'int'>` | a float needs a dot: `6.0` or `6.5` |

**Skulpt fidelity note.** The `NameError` text above is byte-identical in Skulpt
and CPython — that is why it is the lesson's `error` block. The two `SyntaxError`
rows are *not*: Skulpt reports a generic `SyntaxError: bad input on line N` for
both. The error explainer in `engine.js` should map a `SyntaxError` on a line
containing `=` to the Hebrew hint "בדקי שאין רווח בשם, ושהשם נמצא משמאל ל-`=`".

## Implementation notes

- **No `input()` in this lesson.** Nothing blocks on a prompt; every check is a
  plain run. `input()` arrives in lesson 3.
- **`check` may be an array**, as established by lesson 1's e1: every entry must
  pass. e1 here uses the same `source` + loose `output` pattern, which is the
  standard shape for any exercise whose content she chooses.
- **Define `normalized` precisely, because lessons 3 and 4 depend on it**: trim
  each line, collapse runs of spaces and tabs *within* a line, drop leading and
  trailing blank lines — but **keep the line breaks**. A checker that collapsed
  `\n` into a space would let a single `print("Silena 4 7.5")` pass e2, which
  defeats the exercise.
- **Verify `type()` output in Skulpt before shipping**:
  `node tools/verify-python.mjs` must confirm that `print(type("x"))` produces
  exactly `<class 'str'>`. e4 and the quest both hard-code that string. If Skulpt
  ever renders it differently, both checks change to
  `{ kind: "output", mode: "regex", expect: "str[\\s\\S]*int[\\s\\S]*float[\\s\\S]*str" }`
  rather than the lesson changing.
- **Floats print without dressing up**: `print(7.5)` gives `7.5`, and `print(6.0)`
  gives `6.0` — not `6`. The quest depends on `6.5` staying `6.5`.
- **Editor**: the smart-quote normalisation from lesson 1 matters more here,
  because she now types quotes on the right-hand side of `=` as well as inside
  `print`.
- **`captureVars`**: no exercise in this lesson uses a `variable` check, so no
  `captureVars` is needed. Reading a variable back is tempting here, but every
  value in this lesson is more instructive *printed* — the `variable` kind earns
  its keep later, when a value is awkward to print.
- **RTL**: variable names appear inside Hebrew prose constantly in this lesson.
  Every inline code span must be wrapped in `<bdi>` or the underscores and
  parentheses will jump to the wrong end of the sentence.
