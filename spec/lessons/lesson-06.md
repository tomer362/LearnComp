# Lesson 06 — The Crossroads · פרשת הדרכים

> **Act II — The Lightning Thief · גנב הברק** · Stop 6 of 20
> Structure follows `spec/lessons/lesson-01.md`. Schema: `spec/04-lesson-template.md`.

| | |
| --- | --- |
| **id** | `06` |
| **slug** | `the-crossroads` |
| **minutes** | 30–35 |
| **concepts** | `if` / `elif` / `else`, the colon, **indentation (הזחה)**, blocks, nesting |
| **new vocabulary** | `if`, `elif`, `else`, `:`, block, הזחה / indentation |
| **requires** | L1–L4 · **L5 booleans and comparisons** (every condition here is a lesson-5 expression) |
| **item** | 👟 נעלי הכנף / The Winged Shoes |
| **XP** | 20 + 25 + 30 + 30 (training) + 55 (quest) + 30 (bonus) = **190** |
| **drachmas** | 5 + 6 + 8 + 8 + 15 = **42** 🪙 |

## Teaching goal

By the end she can write a program that takes a different path depending on its
data — and, more importantly, **she can read indentation and fix an indentation
error without help.**

This is the longest lesson in Act II on purpose. `if` itself takes eight minutes
to teach. Indentation takes the rest, and it is the concept that decides whether
lessons 7–20 are pleasant or miserable. Every Python program she writes for the
rest of her life is shaped by whitespace. She gets a whole lesson to make peace
with it, with three separate error blocks and a debugging exercise, because the
alternative is that she meets it alone at 11pm inside a `while` loop.

**One new idea, stated honestly**: `if` and indentation are one idea here, not
two — the colon opens a block and the indentation *is* the block. Teaching them
apart would be the mistake.

## Story beat

They leave camp before dawn: her, Grover, and Annabeth, with nine days until the
solstice and a stolen master bolt somewhere west. Two hours out, the road ends
and splits into three. A weathered wooden post stands in the fork with the
caduceus of Hermes carved into it, and three sentences underneath.

Grover looks at her. Annabeth looks at her. Nobody moves, because the group has
exactly one program running and it has no way to choose.

Cast: Grover (wants the safe road and a snack), Annabeth (points out the sign is
a decision tree), Hermes in the myth callout.

**Prophecy panel**:

> יצאתם מהמחנה לפני עלות השחר, ותשעה ימים על השעון.
> אחרי שעתיים הדרך נגמרת בלי אזהרה — ומתפצלת לשלוש.
> על עמוד עץ ישן חרוט סמל של הרמס, ומתחתיו שלוש שורות:
> "הדרך הימנית מהירה. הדרך השמאלית בטוחה. הדרך האמצעית — תלוי."
> גרובר מסתכל עלייך: "תלוי במה?"
> אנאבת' מחייכת: "בדיוק. עכשיו את צריכה תוכנית שיודעת להחליט."

## Chiron Teaches — block by block

1. **prose** — כל תוכנית שכתבת עד היום רצה מלמעלה למטה, כל שורה, תמיד. זה מה
   שהפך אותה לצפויה — וזה גם מה שהופך אותה למוגבלת. תוכנית שרצה תמיד אותו דבר
   יכולה לעשות רק דבר אחד. אתמול למדת לקבל תשובה `True` או `False`. היום שורות
   שלמות ירוצו רק כשהתשובה `True`.

2. **code · runnable** — the first `if`. First 60 seconds.
   ```python
   days_left = 9
   if days_left < 10:
       print("Hurry.")
   print("The road forks here.")
   ```
   Output:
   ```
   Hurry.
   The road forks here.
   ```
   Caption (he): "שתי שורות הודפסו. עוד רגע נגלה שרק אחת מהן הייתה בסכנה."

3. **code · runnable** — the same program, one number changed. Run it before
   naming anything.
   ```python
   days_left = 20
   if days_left < 10:
       print("Hurry.")
   print("The road forks here.")
   ```
   Output:
   ```
   The road forks here.
   ```
   Caption (he): "שינית מספר אחד ושורה שלמה נעלמה מהפלט. השורה המוזחת רצה רק
   כשהתשובה `True`. השורה הצמודה לשוליים רצה תמיד."

4. **prose** — Anatomy, named now that she has seen both outcomes. ל־`if` יש
   ארבעה חלקים, וכולם חובה:
   - המילה `if`
   - **שאלה** שמחזירה `True` או `False` — בדיוק מה שלמדת אתמול
   - **נקודתיים** `:` בסוף השורה
   - ואז **בלוק**: שורה אחת או יותר שדחופות פנימה

5. **prose — the indentation section.** This gets its own heading in the rendered
   page (`## הזחה — הרווחים הם התחביר`).

   בשפות רבות אחרות סוגריים מסולסלים `{ }` מסמנים איפה הבלוק מתחיל ונגמר,
   והרווחים הם רק יופי. **בפייתון אין סוגריים כאלה.** הרווחים בתחילת השורה הם
   הדבר היחיד שאומר לפייתון "השורה הזו שייכת ל־`if`".

   כלומר: ההזחה (indentation) היא לא עיצוב. **היא התחביר.** שינוי ברווחים משנה
   את מה שהתוכנית עושה, בדיוק כמו שינוי במילה.

   הכלל המעשי: **ארבעה רווחים.** מקש Tab בעורך של הקורס מכניס ארבעה רווחים
   בדיוק, אז אפשר להשתמש בו בלי לספור. כל השורות באותו בלוק חייבות להיות
   מיושרות זו לזו.

6. **code · runnable** — a block with two lines, proving the block is a group,
   not one line.
   ```python
   monsters = 3
   if monsters > 0:
       print("Something is on the road.")
       print("Grover hides behind Annabeth.")
   print("The sign is still there.")
   ```
   Output: three lines. Change `monsters` to `0` and the first two vanish
   together. Caption: "שתי השורות המוזחות הן חבילה אחת. או ששתיהן רצות, או
   ששתיהן לא."

7. **error #1 — the missing indent.** This is the error she will meet most.
   ```python
   if 3 > 2:
   print("The Oracle was right")
   ```
   What the engine shows (verified):
   ```
   SyntaxError: bad input on line 2
   ```
   What real CPython 3 shows for the same code:
   ```
   IndentationError: expected an indented block after 'if' statement on line 1
   ```
   explain (he): אחרי נקודתיים פייתון **מחכה** לפחות לשורה אחת דחופה פנימה. הוא
   הגיע לשורה 2, מצא אותה צמודה לשוליים, ולא ידע למי היא שייכת. השם האמיתי של
   השגיאה הזו בפייתון הוא `IndentationError` — שגיאת הזחה — והיא אומרת מילולית
   "ציפיתי לבלוק מוזח". המנוע שלנו מקצר את השם, אבל **מספר השורה תמיד נכון**,
   וזו השורה שצריך לדחוף פנימה. התיקון: Tab אחד בתחילת שורה 2.

   *(See Implementation notes: the block carries both strings, and `engine.js`
   must add the Hebrew indentation explainer for this case.)*

8. **error #2 — the indent that belongs to nothing.**
   ```python
   print("We reached the crossroads")
       print("Grover sat down")
   ```
   Engine: `SyntaxError: bad input on line 2`
   CPython 3: `IndentationError: unexpected indent`
   explain (he): הפעם הבעיה הפוכה. שום דבר לא פתח בלוק — אין `if` ואין נקודתיים
   — ולכן אין למי שהרווחים בשורה 2 יהיו שייכים. פייתון לא מנחש. **בלוק נפתח רק
   אחרי שורה שנגמרת בנקודתיים.** התיקון: להצמיד את שורה 2 לשוליים.

9. **error #3 — the ragged block.** The most confusing of the three, and the one
   where the engine's message is exact.
   ```python
   if 3 > 2:
       print("The road is clear")
     print("We keep walking")
   ```
   Engine (verified, identical wording to CPython):
   ```
   SyntaxError: unindent does not match any outer indentation level
   ```
   explain (he): שורה 2 מוזחת בארבעה רווחים ושורה 3 בשניים. פייתון מחפש למה
   שני הרווחים האלה מתאימים — לא לבלוק של ה־`if` ולא לשוליים החיצוניים — ומודיע
   שאין רמה כזו. **בתוך בלוק, כל השורות חייבות אותה כמות רווחים בדיוק.** התיקון:
   להחליט אם שורה 3 שייכת ל־`if` (ארבעה רווחים) או לא (אפס), ולסדר בהתאם.

10. **compare** — the same three lines, two meanings.
    - **bad**
      ```python
      if monsters > 0:
          print("Draw your sword.")
          print("Run.")
      ```
      label (he): "שתי השורות בבלוק. שתיהן רצות רק אם יש מפלצות."
    - **good**
      ```python
      if monsters > 0:
          print("Draw your sword.")
      print("Run.")
      ```
      label (he): "אותן שלוש שורות, רווחים אחרים, משמעות אחרת: `Run.` מודפס תמיד.
      אף אחת מהן לא שגויה — הן שתי תוכניות שונות."

    This is the block that turns "indentation is a rule I must obey" into
    "indentation is a tool I use". Put it right after the three errors, while the
    fear is fresh.

11. **callout · warn** — title: הנקודתיים.
    text: השגיאה הכי שקטה בשיעור הזה היא נקודתיים חסרות. `if x > 3` בלי `:`
    ייתן `SyntaxError: bad input`, והשורה שיצוינה היא שורת ה־`if` עצמה. כשאת
    רואה `SyntaxError` על שורה שמתחילה ב־`if`, בדקי קודם את הסוף שלה, לא את
    ההתחלה.

12. **prose + code · runnable** — `else`. שני מסלולים, ותמיד רץ בדיוק אחד.
    ```python
    supplies = 2
    if supplies >= 3:
        print("Take the long safe road.")
    else:
        print("Take the fast road. We cannot wait.")
    ```
    Output: `Take the fast road. We cannot wait.`
    Two rules to state explicitly: ל־`else` **אין שאלה** — הוא לוקח את כל מה
    שנשאר; ו־`else` נכתב צמוד לשוליים, מיושר בדיוק מתחת ל־`if` שלו.

13. **prose + code · runnable** — `elif`. יותר משני מסלולים.
    ```python
    monsters = 4
    if monsters == 0:
        print("The road is clear.")
    elif monsters < 3:
        print("We can fight through.")
    elif monsters < 10:
        print("We go around.")
    else:
        print("We run.")
    ```
    Output: `We go around.`
    Caption (he): "`elif` זה קיצור של else if. פייתון בודק מלמעלה למטה, עוצר
    **בתשובה ה־`True` הראשונה**, ומדלג על כל השאר — גם אם הן נכונות גם כן."

14. **callout · tip** — title: הסדר בשרשרת קובע.
    text: `monsters = 1` הוא גם קטן מ־3 וגם קטן מ־10. הוא ידפיס `We can fight
    through.` כי זו השאלה הראשונה שענתה `True`. אם היית מחליפה את סדר שתי
    השורות, הענף `monsters < 3` לא היה רץ **אף פעם** — כל מספר קטן מ־3 היה נתפס
    קודם על ידי `< 10`. הכלל: **השאלה הצרה ביותר קודם.** זה לא ייתן שגיאה, וזה
    בדיוק מה שהופך את הבאג הזה למעצבן.

15. **compare** — a chain versus separate `if`s. The distinction most beginners
    never get told.
    - **bad** (label: "שתי שאלות נפרדות — שתיהן נבדקות, ושתי השורות מודפסות")
      ```python
      gold = 5
      if gold < 10:
          print("Low on drachmas.")
      if gold < 100:
          print("Not rich.")
      ```
      Output: both lines.
    - **good** (label: "שרשרת אחת — נבדקת עד התשובה הראשונה, ומודפסת שורה אחת")
      ```python
      gold = 5
      if gold < 10:
          print("Low on drachmas.")
      elif gold < 100:
          print("Not rich.")
      ```
      Output: one line.

    Neither is wrong; they answer different questions. Say that out loud in the
    labels — a `compare` block where `bad` is not actually bad teaches judgement,
    and she is old enough for judgement.

16. **prose + code · runnable** — nesting. בלוק יכול להכיל `if` נוסף, ואז יש
    שתי רמות של הזחה: ארבעה רווחים ושמונה.
    ```python
    at_crossroads = True
    has_map = False
    if at_crossroads:
        print("Three roads.")
        if has_map:
            print("Annabeth reads the map.")
        else:
            print("We choose by instinct.")
    ```
    Output:
    ```
    Three roads.
    We choose by instinct.
    ```
    Caption (he): "ה־`else` הפנימי מוזח בארבעה רווחים, כי הוא שייך ל־`if`
    הפנימי. הרווחים הם מה שקושר כל `else` ל־`if` הנכון שלו — אין שום דבר אחר
    שעושה את זה."

17. **callout · myth** — title: הרמס, אל הדרכים.
    text: הרמס הוא שליח האלים, ובין השאר גם אל הדרכים, הנוסעים והצמתים. ביוון
    העתיקה הציבו בכל צומת עמוד אבן שנקרא *herm* לכבודו, כדי שמי שעומד שם ולא
    יודע לאן ללכת יזכור שמישהו כבר עבר פה. תוכנית עם `if` היא בדיוק זה: עמוד
    בצומת עם הוראות למי שיגיע.

## Try It (ungraded)

Intro (he): *"התור שלך לעמוד בצומת. שני את `road` ואת `danger` והריצי. יש
צירוף אחד שמדפיס שתי שורות — תמצאי אותו. שום דבר פה לא נבדק."*

```python
road = "middle"
danger = 7

if road == "left":
    print("Safe, slow, and Grover approves.")
elif road == "right":
    print("Fast. Loud. Something heard us.")
else:
    print("The middle road. Nobody knows what is on it.")

if danger > 5:
    print("Draw your sword.")
```

Output as shipped (verified):
```
The middle road. Nobody knows what is on it.
Draw your sword.
```
The second `if` is separate from the chain on purpose — she can discover that a
program can hold more than one decision.

## Training exercises

### e1 — The first fork · 20 XP, 5 🪙

**brief (he)**: נשארו `12` קילומטרים לעיירה הבאה, ואור היום נגמר. אם המרחק גדול
מ־10, הדפיסי `We camp here tonight.` — ואם לא, אל תדפיסי כלום. שורת ה־`print`
חייבת להיות בתוך בלוק.

**starter**
```python
distance = 12

# only sometimes
```

**solution**
```python
distance = 12
if distance > 10:
    print("We camp here tonight.")
```
Verified output: `We camp here tonight.`

**check**
```js
{ kind: "output", mode: "normalized", expect: "We camp here tonight." }
```
plus
```js
{ kind: "source", mustInclude: ["if "],
  message: { he: "השורה צריכה לרוץ רק לפעמים — זה מה ש־if עושה",
             en: "The line must run only sometimes — that is what if is for" } }
```

**hints**
1. (he) "בלי `if` השורה תודפס תמיד, גם אם `distance` יהיה 2. איזו מילה הופכת
   שורה ל'לפעמים'?"
2. (he) "`if` + שאלה + נקודתיים בסוף השורה, ואז השורה הבאה נדחפת פנימה עם Tab."
3. (he) "`if distance > 10:` — שימי לב לנקודתיים. בשורה הבאה לחצי Tab פעם אחת
   ואז כתבי את ה־`print`. אחרי שזה עובד, שני את `distance` ל־2 והריצי שוב כדי
   לראות שהשורה נעלמה."

### e2 — Grover's stomach · 25 XP, 6 🪙

**brief (he)**: לגרובר נשארו `0` חטיפים. אם יש לו יותר מ־0, הדפיסי `Grover eats
a can.` אחרת הדפיסי `Grover chews his shoe.` בדיוק שורה אחת תודפס — לא שתיים
ולא אפס.

**starter**
```python
snacks = 0

if snacks > 0:
    print("Grover eats a can.")
# what happens otherwise?
```

**solution**
```python
snacks = 0
if snacks > 0:
    print("Grover eats a can.")
else:
    print("Grover chews his shoe.")
```
Verified output: `Grover chews his shoe.`

**check**
```js
{ kind: "output", mode: "normalized", expect: "Grover chews his shoe." }
```
plus
```js
{ kind: "source", mustInclude: ["else:"],
  message: { he: "הפעם צריך גם מסלול שני — else",
             en: "This one needs the second path — else" } }
```
The `source` check is what forces the `else`; without it she could pass with a
single `print`. The `message` explains that, so the failure is never a mystery.

**hints**
1. (he) "אפשר לפתור את זה עם שני `if` נפרדים, וזה יעבוד. אבל מה יקרה אם מחר
   מישהו ישנה את השאלה הראשונה ושכח לשנות את השנייה? יש מילה שאומרת 'כל השאר'."
2. (he) "`else` נכתב אחרי הבלוק של ה־`if`, מיושר בדיוק מתחת למילה `if`, עם
   נקודתיים אחריו — ובלי שאלה."
3. (he) "אחרי שורת ה־`print` המוזחת, כתבי שורה חדשה צמודה לשוליים: `else:`
   ואז שורה מוזחת עם ה־`print` השני. `else` אף פעם לא מקבל שאלה — הוא לוקח את
   כל מה שנשאר."

### e3 — The signpost · 30 XP, 8 🪙

**brief (he)**: כתבי את השלט של הרמס. קלטי שם של דרך ב־`input()` והדפיסי בדיוק
שורה אחת:

| קלט | פלט |
| --- | --- |
| `left` | `Safe road. Three days.` |
| `right` | `Fast road. Two days. Loud.` |
| `middle` | `Nobody has come back from the middle road.` |
| כל דבר אחר | `That is not a road.` |

**starter**
```python
road = input("Which road? ")

# four possible answers, exactly one prints
```

**solution**
```python
road = input("Which road? ")
if road == "left":
    print("Safe road. Three days.")
elif road == "right":
    print("Fast road. Two days. Loud.")
elif road == "middle":
    print("Nobody has come back from the middle road.")
else:
    print("That is not a road.")
```

**check** (all four verified against the runtime)
```js
{ kind: "cases", cases: [
    { stdin: ["left"],   expect: "Safe road. Three days." },
    { stdin: ["right"],  expect: "Fast road. Two days. Loud." },
    { stdin: ["middle"], expect: "Nobody has come back from the middle road." },
    { stdin: ["forest"], expect: "That is not a road." } ] }
```

**hints**
1. (he) "ארבע תוצאות אפשריות, ובכל הרצה מודפסת בדיוק אחת. כמה שאלות את צריכה
   לשאול כדי לכסות ארבע אפשרויות? (רמז: פחות מארבע.)"
2. (he) "`if` לראשונה, `elif` לשתיים שאחריה, `else` לכל השאר. אין צורך לשאול
   'האם זו לא אף אחת מהדרכים' — זה בדיוק מה ש־`else` תופס."
3. (he) "`road` הוא string, אז ההשוואה היא `road == \"left\"` עם גרשיים.
   התחילי ב־`if road == \"left\":`, ואז `elif road == \"right\":`, ואז
   `elif road == \"middle\":`, ואז `else:`. שימי לב ש־`Left` באות גדולה לא יזוהה
   — פייתון מבדיל בין אותיות גדולות לקטנות, כמו שראית בשיעור 5."

### e4 — The torn map · 30 XP, 8 🪙 — **the debugging exercise**

**brief (he)**: אנאבת' העתיקה את הקוד מהמפה הקרועה ויש בו שלוש שגיאות. הריצי
אותו, קראי את השגיאה, תקני שורה אחת, והריצי שוב — עד שהוא רץ. הפלט הנכון הוא
שתי שורות: `We go around.` ואז `Grover is already walking.` השורה האחרונה
צריכה להידפס תמיד, בכל ערך של `monsters`.

**starter** (broken on purpose — three separate bugs)
```python
monsters = 6
if monsters == 0
print("The road is clear.")
elif monsters < 5:
    print("We fight through.")
else:
    print("We go around.")
  print("Grover is already walking.")
```

Bug 1: line 2 has no `:`.
Bug 2: line 3 is not indented (`IndentationError: expected an indented block`).
Bug 3: line 8 has two spaces where it needs zero
(`SyntaxError: unindent does not match any outer indentation level`).

She will fix them one at a time, in that order, because that is the order the
engine reports them. That sequencing *is* the lesson: **an error message names
one problem at a time, and re-running after each fix is the method.**

**solution**
```python
monsters = 6
if monsters == 0:
    print("The road is clear.")
elif monsters < 5:
    print("We fight through.")
else:
    print("We go around.")
print("Grover is already walking.")
```
Verified output:
```
We go around.
Grover is already walking.
```

**check**
```js
{ kind: "output", mode: "normalized", expect: "We go around.\nGrover is already walking." }
```

**hints**
1. (he) "אל תנסי לתקן הכל בבת אחת. הריצי, קראי את מספר השורה בשגיאה, תקני רק
   אותה, והריצי שוב. מה חסר בסוף שורה 2?"
2. (he) "שלוש הבעיות הן: נקודתיים חסרות בסוף שורת ה־`if`; שורה שאחרי נקודתיים
   שלא הוזחה; ושורה אחרונה עם שני רווחים במקום אפס. השורה האחרונה לא שייכת
   ל־`else` — היא צריכה לרוץ תמיד."
3. (he) "שורה 2 מסתיימת ב־`:`. שורה 3 נדחפת פנימה בארבעה רווחים. שורה 8 נצמדת
   לשוליים לגמרי — היא לא חלק מאף בלוק, ולכן היא מודפסת בכל מקרה. אחרי שזה עובד,
   שני את `monsters` ל־2 והריצי: איזו שורה התחלפה ואיזו נשארה?"

## Quest — "פרשת הדרכים / The Crossroads" · 55 XP, 15 🪙

**brief (he)**: זו ההחלטה האמיתית. התוכנית שלך שואלת שתי שאלות — באיזו דרך
ללכת, וכמה דרכמות יש בכיס — ומדפיסה שורה אחת בלבד.

```
road = input("Which road? ")
drachmas = int(input("How many drachmas? "))
```

החוקים:

- **left** — יש מעבורת, והמעביר גובה 3 דרכמות.
  - 3 דרכמות או יותר → `You pay the ferryman. Left road.`
  - פחות מזה → `The ferryman turns you away.`
- **right** — הדרך מלאה שודדים.
  - 0 דרכמות → `Nothing to steal. The right road is safe today.`
  - יותר מזה → `Hide your money. Right road.`
- **middle** — `The middle road asks no price.` בלי קשר לכסף.
- כל דבר אחר — `That is not a road.`

**solution**
```python
road = input("Which road? ")
drachmas = int(input("How many drachmas? "))

if road == "left":
    if drachmas >= 3:
        print("You pay the ferryman. Left road.")
    else:
        print("The ferryman turns you away.")
elif road == "right":
    if drachmas == 0:
        print("Nothing to steal. The right road is safe today.")
    else:
        print("Hide your money. Right road.")
elif road == "middle":
    print("The middle road asks no price.")
else:
    print("That is not a road.")
```

**check** (all six verified against the runtime)
```js
{ kind: "cases", cases: [
    { stdin: ["left", "5"],   expect: "You pay the ferryman. Left road." },
    { stdin: ["left", "1"],   expect: "The ferryman turns you away." },
    { stdin: ["right", "0"],  expect: "Nothing to steal. The right road is safe today." },
    { stdin: ["right", "12"], expect: "Hide your money. Right road." },
    { stdin: ["middle", "4"], expect: "The middle road asks no price." },
    { stdin: ["up", "4"],     expect: "That is not a road." } ] }
```
Both inputs are read before any decision, so every case queues two values even
when the second is never used. That is intentional and worth a line in the brief:
**קלטי את שני הנתונים בהתחלה, ורק אחר כך תחליטי.**

**hints**
1. (he) "יש לך ארבעה מקרים לדרך, אבל שניים מהם מתפצלים שוב לפי הכסף. ציירי את זה
   על נייר כעץ: קודם הדרך, ואז — בתוך שתיים מהענפים — עוד שאלה."
2. (he) "זו שרשרת `if/elif/elif/else` על `road`, ובתוך שניים מהבלוקים שלה יושב
   `if/else` נוסף על `drachmas`. ה־`if` הפנימי מוזח בארבעה רווחים, וה־`print`
   שבתוכו בשמונה."
3. (he) "התחילי כך:
   ```python
   if road == \"left\":
       if drachmas >= 3:
           print(\"You pay the ferryman. Left road.\")
       else:
           print(\"The ferryman turns you away.\")
   elif road == \"right\":
   ```
   שימי לב לשלוש רמות ההזחה: 0 ל־`if` החיצוני, 4 ל־`if` הפנימי, 8 ל־`print`.
   `elif road == \"right\"` חוזר לרמה 0 כי הוא שייך לשרשרת החיצונית. את הענף של
   `right` בני באותה צורה, ואת שני האחרונים בלי קינון בכלל."

**Why this is the quest**: it is the first program she writes that has *state*
(two variables) and *structure* (two levels). When it passes, she has built a
decision tree — and Chiron says so in the completion text, because naming what
she has done is half the reward.

## Reward & Recap

**Item**: 👟 **נעלי הכנף / The Winged Shoes**
desc (he): "נעליים מהמחסן של הרמס. הן לא מהירות במיוחד — הן אף פעם לא
נועלות אותך בדרך אחת."

**Achievements possible here**
- *Forked Path* — first program containing an `else`.
- *Debugger* — passed e4 after at least one failed run.
- *Indent Master* — passed e4 without spending a single hint.
- *Persistent* — solved any exercise here after five failed runs.

**Recap bullets**
- `if` + שאלה + `:` מריץ בלוק שלם רק כשהתשובה `True`
- **ההזחה היא התחביר.** ארבעה רווחים, ואותה כמות לכל השורות באותו בלוק
- `else` תופס את כל מה שנשאר ואף פעם לא מקבל שאלה; `elif` מוסיף שאלה נוספת
- בשרשרת `if/elif/else` רץ **ענף אחד בלבד** — הראשון שענה `True`
- שגיאת הזחה מציינת לך את מספר השורה המדויק. תקני שורה אחת, הריצי שוב

**Next teaser (he)**: *"בחרת דרך, והיא מובילה אל הים. מחר תלמדי לחזור על אותה
פעולה שוב ושוב — כי אי אפשר לחצות מֵצר בחתירה אחת, והסירנות כבר שרות."*

## Common mistakes to anticipate

| She writes | She sees (verified in Skulpt) | CPython 3 says | Hint / explainer must cover |
| --- | --- | --- | --- |
| `if x > 3` (no colon) | `SyntaxError: bad input on line N` | `SyntaxError: expected ':'` | הנקודתיים בסוף השורה — בדקי את סוף השורה, לא את ההתחלה |
| block not indented | `SyntaxError: bad input on line N` | `IndentationError: expected an indented block after 'if' statement on line N-1` | אחרי `:` חייבת לבוא שורה מוזחת; Tab בתחילת השורה |
| indent with nothing above it | `SyntaxError: bad input on line N` | `IndentationError: unexpected indent` | בלוק נפתח רק אחרי שורה שנגמרת בנקודתיים |
| 4 spaces then 2 in one block | `SyntaxError: unindent does not match any outer indentation level` | same wording | כל השורות בבלוק — אותה כמות רווחים בדיוק |
| tab and spaces mixed | `SyntaxError: bad input on line N` | `TabError: inconsistent use of tabs and spaces in indentation` | להשתמש רק ב־Tab של העורך, שמכניס 4 רווחים |
| `else if x > 1:` | `SyntaxError: bad input on line N` | `SyntaxError: invalid syntax` | המילה בפייתון היא `elif`, מילה אחת |
| `else x > 3:` | `SyntaxError: bad input on line N` | `SyntaxError: invalid syntax` | ל־`else` אין שאלה אף פעם |
| `if x = 1:` | `SyntaxError: bad input on line N` | `SyntaxError: invalid syntax. Maybe you meant '==' …` | `=` נותן, `==` שואל — חזרה לשיעור 5 |
| `if road == left:` (no quotes) | `NameError: name 'left' is not defined` | same | בלי גרשיים פייתון מחפש משתנה בשם `left` |
| `if road == "Left":` on input `left` | לא שגיאה — הענף לא רץ | — | אותיות גדולות/קטנות הן שני דברים שונים |
| broad `elif` before narrow one | לא שגיאה — ענף שלא רץ אף פעם | — | השאלה הצרה ביותר קודם; הבאג הזה שקט |

## Implementation notes

- **The `IndentationError` fidelity gap is real and must be handled, not hidden.**
  Verified: Skulpt reports every indent problem except the ragged-block case as
  `SyntaxError: bad input on line N`. The line number is correct. Three
  consequences, all required:
  1. Extend the `error` teach block with an optional `cpython` field so the page
     can show both strings side by side, labelled "מה שהמנוע מראה" / "מה
     שפייתון האמיתי אומר". This is the honest version of rule 5 in
     `00-overview.md` and it costs one field.
  2. `engine.js` must special-case this: when a `SyntaxError: bad input` lands on
     a line whose predecessor ends in `:`, or on a line whose leading whitespace
     differs from its predecessor's, attach the Hebrew explainer *"נראה שזו
     שגיאת הזחה (IndentationError). בדקי את הרווחים בתחילת שורה N."* **The real
     English error is still shown.** Never replaced.
  3. Lesson 18 (`try`/`except`, reading tracebacks) already promises to say that
     error text varies between Python versions — add Skulpt's shortened
     `SyntaxError` to that list there.
- **Editor support is part of teaching indentation.** `editor.js` must, for this
  lesson onward: insert exactly four spaces on Tab; auto-indent the next line
  after a line ending in `:`; keep the current indent on Enter; and delete four
  spaces on Backspace at the start of a line. Without these, the lesson teaches
  the concept and the tool fights it.
- **Show whitespace on demand.** A small "הצג רווחים" toggle in the editor that
  renders leading spaces as faint dots turns every indentation bug in this lesson
  from invisible to obvious. It is the highest-value UI affordance in Act II.
- **e4's starter must be preserved byte-for-byte**, including the two-space
  indent on the last line. If the editor normalises indentation on load, the
  exercise silently loses its third bug. Mark the starter `preserveWhitespace:
  true` or exempt starters from paste-normalisation.
- All `cases` expectations omit `input()` prompt text — prompts go to the
  Iris-message panel, not stdout (verified).
- Every solution and every teach-block output in this file was executed through
  the shipped `skulpt.min.js` with `__future__: Sk.python3`.
- **e1 and e2 each carry two checks** — write them with the `also` field, as in
  lesson 1 and as required by `.claude/rules/lesson-authoring.md`:
  ```js
  check: { kind: "source", mustInclude: ["else:"],
           message: { he: "הפעם צריך גם מסלול שני — else", en: "This one needs the second path — else" },
           also: { kind: "output", mode: "normalized", expect: "Grover chews his shoe." } }
  ```
- **`source` checks read a stripped skeleton** (comments and string literals
  removed). `"if "` and `"else:"` are keywords outside any literal, so both
  survive stripping and neither check needs `raw: true`. Watch this in e4: its
  starter is full of broken code, but `source` is not used there — the check is
  pure `output`, so the stripping rule does not apply.
