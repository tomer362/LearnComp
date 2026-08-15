# Lesson 09 — The Quest Party · חבורת המסע

> **Act III — Sea of Monsters · ים המפלצות** · Stop 9 of 20
> Structure follows `spec/lessons/lesson-01.md`. Schema: `spec/04-lesson-template.md`.

| | |
| --- | --- |
| **id** | `09` |
| **slug** | `the-quest-party` |
| **minutes** | 30–35 |
| **concepts** | lists, indexing, zero-based counting, `len()`, iterating a list, `in` |
| **new vocabulary** | `[]`, `len`, `in` (membership) |
| **requires** | L1 `print` · L2 variables · L3 f-strings · L4 arithmetic · L5 booleans and comparisons · L6 `if`/`elif`/`else` · L7 `while` and accumulators · L8 `for`, `range()` |
| **item** | 📜 מגילת החבורה / The Party Roster |
| **XP** | 20 + 20 + 25 + 30 (training) + 50 (quest) + 30 (bonus) = **175** |
| **drachmas** | 5 + 5 + 8 + 8 + 12 = **38** 🪙 |

## Teaching goal

By the end she can put many values in **one** variable, reach any one of them by
its index, ask how many there are, walk over all of them with `for`, and ask
whether something is in there at all.

The real goal is the counting. **A list starts at 0.** Every off-by-one bug she
will write for the rest of her life comes from this one fact, and this is the
lesson where she meets it, breaks it on purpose, and learns to read
`IndexError: list index out of range` without her stomach dropping.

Act III's whole theme is *holding many things at once*. Lesson 9 is the first
time a single name in her code stands for more than one thing.

## Story beat

Act II ended with Medusa's garden behind her. Now camp itself is in trouble: the
tree on the hill is dying and the magical border is thinning. The Oracle sends a
quest across the Sea of Monsters for the Golden Fleece. Chiron's first question
is not "what will you fight" — it is "who is going with you".

He unrolls a blank scroll. One scroll, many names. That is a list.

The Prophecy panel (5 lines, no code):

> העץ על הגבעה גוסס, והמגן שמסביב למחנה נסדק.
> האורקל פוקחת עיניים ואומרת: "מעבר לים המפלצות מחכה גיזה של זהב."
> "לא תצאי לבד. אף גיבורה לא יצאה לבד וחזרה."
> כירון פורש על השולחן מגילה ריקה.
> "כתבי עליה את החבורה. שם אחד, ואחריו עוד אחד, ועוד אחד — כולם על מגילה אחת."

Cast: Chiron, the Oracle. Annabeth appears in the zero-based callout (she is the
one who explains it properly). Grover appears in the `IndexError` recovery.

## Chiron Teaches — block by block

1. **prose** — עד עכשיו כל משתנה החזיק ערך אחד. שם אחד, דבר אחד. אבל חבורה של
   מסע היא לא דבר אחד. אם נותנים לכל אחת משתנה משלה, מה קורה כשמצטרפת עוד אחת?
   וכשרוצים לספור אותן? כירון לא מנהל את המחנה על פתקים נפרדים. הוא מנהל אותו על
   מגילה אחת.

2. **compare** — the motivation, before the syntax.
   - bad — label: *שלושה משתנים נפרדים. עכשיו נסי לספור אותם בלולאה.*
     ```python
     member1 = "Annabeth"
     member2 = "Grover"
     member3 = "Tyson"
     ```
   - good — label: *מגילה אחת, שלושה שמות.*
     ```python
     party = ["Annabeth", "Grover", "Tyson"]
     ```

3. **code (runnable)** — the first list, run within the first minute.
   ```python
   party = ["Annabeth", "Grover", "Tyson"]
   print(party)
   ```
   Output: `['Annabeth', 'Grover', 'Tyson']`
   Caption: `הדפסנו את כל המגילה בבת אחת. פייתון מראה לך אותה בכתב שלה — סוגריים
   מרובעים, פסיקים, וגרשיים סביב כל string.`

4. **prose** — Name the rule now, after she has seen it: **רשימה (list)** היא
   אוסף מסודר של ערכים. סוגריים מרובעים `[ ]` פותחים וסוגרים אותה, פסיק מפריד
   בין ערך לערך. הסדר נשמר — הסדר שכתבת הוא הסדר שיישאר.

5. **code (runnable)** — indexing, one value at a time.
   ```python
   party = ["Annabeth", "Grover", "Tyson"]
   print(party[0])
   print(party[1])
   print(party[2])
   ```
   Output:
   ```
   Annabeth
   Grover
   Tyson
   ```
   Caption: `המספר בסוגריים המרובעים נקרא index. שימי לב מאיפה הוא מתחיל.`

6. **callout · tip** — title: *למה מתחילים מאפס?* / *Why does it start at zero?*
   אנבת' עוצרת אותך לפני שתתעצבני: "ה־index הוא לא *איזו במספר*. הוא *כמה רחוק
   מההתחלה*." אנבת' בהתחלה — מרחק 0. גרובר — צעד אחד מההתחלה, 1. טייסון — 2.
   ברגע שאת קוראת את זה ככה, זה מפסיק להיות שרירותי.
   הכלל שנובע מזה: **ה־index האחרון הוא תמיד `len(party) - 1`.**

7. **error block** — the heart of the lesson.
   ```python
   party = ["Annabeth", "Grover", "Tyson"]
   print(party[3])
   ```
   Real error (verified in Skulpt):
   ```
   IndexError: list index out of range on line 2
   ```
   Explanation: יש שלוש חברות בחבורה, אבל ה־indexes שלהן הם 0, 1, 2. אין 3.
   פייתון לא מנחש ולא מחזיר "כלום" — הוא עוצר ואומר לך בדיוק מה קרה: ביקשת
   מקום שלא קיים ברשימה. גרובר עשה את זה בפעם הראשונה שלו גם. השורה הזאת היא לא
   נזיפה, היא כתובת: *שורה 2, ה־index גדול מדי*.
   Then the fix, side by side: `print(party[2])`.

8. **code (runnable)** — `len()` and the last-index rule together.
   ```python
   party = ["Annabeth", "Grover", "Tyson"]
   print(len(party))
   print(party[len(party) - 1])
   ```
   Output:
   ```
   3
   Tyson
   ```
   Caption: `len מחזיר כמה ערכים יש. האחרון תמיד יושב ב־len פחות אחד.`

9. **callout · tip** — title: *קיצור דרך לסוף* / *A shortcut to the end*
   `party[-1]` הוא האחרון, `party[-2]` הוא לפני האחרון. מספר שלילי סופר לאחור
   מהסוף. זה נוח, אבל אל תוותרי על ההבנה של `len(party) - 1` — היא זו שתציל אותך
   בלולאות.

10. **code (runnable)** — iterating the list itself. She knows `for` from L8.
    ```python
    party = ["Annabeth", "Grover", "Tyson"]
    for member in party:
        print(f"{member} is ready")
    ```
    Output:
    ```
    Annabeth is ready
    Grover is ready
    Tyson is ready
    ```
    Caption: `בשיעור 8 רצנו על range. עכשיו את יכולה לרוץ ישר על הרשימה עצמה.`

11. **compare** — the two ways to loop, and when each one earns its place.
    - good (a) — label: *כשאת צריכה רק את הערך:*
      ```python
      for member in party:
          print(member)
      ```
    - good (b) — label: *כשאת צריכה גם את המיקום:*
      ```python
      for i in range(len(party)):
          print(f"{i + 1}. {party[i]}")
      ```
      Output:
      ```
      1. Annabeth
      2. Grover
      3. Tyson
      ```
    Caption on (b): `שימי לב ל־i + 1. פייתון סופר מ־0, בני אדם סופרים מ־1.
    השורה הזאת היא בדיוק המקום שבו מתרגמים בין השניים.`
    (This is deliberately a `compare` of two *good* options, not good-vs-bad —
    the point is choosing, not fixing.)

12. **code (runnable)** — membership with `in`.
    ```python
    party = ["Annabeth", "Grover", "Tyson"]
    if "Grover" in party:
        print("Grover is with us")
    if "Luke" not in party:
        print("Luke is not on this quest")
    ```
    Output:
    ```
    Grover is with us
    Luke is not on this quest
    ```
    Caption: `in שואל שאלת כן/לא ומחזיר True או False — בדיוק כמו ההשוואות
    משיעור 5, ולכן הוא מתאים בתוך if.`

13. **callout · warn** — title: *אותה מילה, שני תפקידים* / *One word, two jobs*
    ראית את `in` פעמיים היום:
    - `for member in party:` — כאן `in` הוא חלק מהמבנה של הלולאה. הוא אומר
      "רוצי על".
    - `if "Grover" in party:` — כאן `in` הוא שאלה. הוא מחזיר `True` או `False`.
    זה מבלבל בהתחלה, וזה בסדר. הסימן המבחין: אם יש `for` בתחילת השורה — זו
    לולאה. אם יש `if` — זו שאלה.

14. **code (runnable)** — a list is not carved in stone, and it holds numbers too.
    ```python
    damage = [12, 30, 7]
    damage[1] = 50
    print(damage)
    ```
    Output: `[12, 50, 7]`
    Caption: `אפשר להחליף ערך לפי ה־index שלו. הרשימה משתנה במקום.`

15. **callout · myth** — title: *המגילות של המחנה* / *The camp's scrolls*
    לכירון יש מגילה לכל דבר: מי בכל בקתה, מי יצא למסע ולא חזר, מי חייב תורנות
    מטבח. שלושת אלפי שנה של ניהול מחנה, והכול על רשימות מסודרות. הוא לא זוכר
    בעל־פה. הוא רושם, וסופר מ־0 — כי ככה בנויות המגילות של האלים.

## Try It (ungraded)

Free-play editor. Nothing is checked.

```python
party = ["Annabeth", "Grover", "Tyson"]
print(party)
print(party[0])
print(len(party))
```

Intro: *"המגילה שלך. הוסיפי שמות, שני את הסדר, נסי index אחר. נסי גם index
גדול מדי — כאן זה בטוח לגמרי, ואת רוצה לראות את `IndexError` פעם אחת בשקט."*

## Training exercises

### e1 — Roll call · 20 XP, 5 🪙

**brief** — `החבורה כתובה על המגילה. הדפיסי את השם הראשון, ואז את השם האחרון —
כל אחד בשורה משלו. השתמשי ב־index.`

**starter**
```python
party = ["Annabeth", "Grover", "Tyson", "Clarisse"]
# print the first name, then the last name
```

**solution**
```python
party = ["Annabeth", "Grover", "Tyson", "Clarisse"]
print(party[0])
print(party[3])
```

Expected output:
```
Annabeth
Clarisse
```

**check**
```js
{ kind: "output", mode: "normalized", expect: "Annabeth\nClarisse" }
```

**hints**
1. `כמה שמות יש במגילה? ואיזה מספר יושב מתחת לשם הראשון?`
2. `ה־index הראשון הוא 0. אם יש 4 שמות, האחרון יושב ב־3 — כלומר len פחות אחד.`
3. `שתי שורות print. באחת party[0], בשנייה party[3]. אם רשמת party[4] — קיבלת
   IndexError, וזה בדיוק הגבול שדיברנו עליו.`

### e2 — Counting the party · 20 XP, 5 🪙

**brief** — `כירון רוצה דיווח קצר: כמה גיבורות בחבורה, ומי שלישית בתור. הדפיסי
בדיוק שתי שורות. את המספר קחי מ־len — אל תכתבי אותו ביד.`

**starter**
```python
party = ["Annabeth", "Grover", "Tyson", "Clarisse"]
# line 1: The quest party has ? heroes
# line 2: Third in line: ?
```

**solution**
```python
party = ["Annabeth", "Grover", "Tyson", "Clarisse"]
print(f"The quest party has {len(party)} heroes")
print(f"Third in line: {party[2]}")
```

Expected output:
```
The quest party has 4 heroes
Third in line: Tyson
```

**check**
```js
{ kind: "output", mode: "normalized",
  expect: "The quest party has 4 heroes\nThird in line: Tyson" }
```
plus
```js
{ kind: "source", mustInclude: ["len("],
  message: { he: "המשימה הזאת דורשת len() — המספר צריך לבוא מהרשימה, לא מהאצבעות",
             en: "This one needs len() — the count must come from the list" } }
```

**hints**
1. `אם מחר תצטרף עוד חברה לחבורה, האם המספר שהדפסת יתעדכן לבד?`
2. `len(party) נותן את הכמות, ו־f-string משיעור 3 מכניס אותה לתוך המשפט.`
3. `שורה ראשונה: f-string עם {len(party)} באמצע. שורה שנייה: השלישי בתור הוא
   index 2, כי סופרים 0, 1, 2.`

### e3 — Who sails with us? · 25 XP, 8 🪙

**brief** — `שלושה שמות מבקשים להצטרף. לכל שם, בדקי אם הוא כבר בחבורה והדפיסי
שורה מתאימה. עברי על השמות בסדר שהם רשומים.`

**starter**
```python
party = ["Annabeth", "Grover", "Tyson"]
checking = ["Tyson", "Clarisse", "Grover"]
# for each name in checking, print:
#   NAME: on the quest        (if the name is in party)
#   NAME: not on the quest    (if it is not)
```

**solution**
```python
party = ["Annabeth", "Grover", "Tyson"]
checking = ["Tyson", "Clarisse", "Grover"]
for name in checking:
    if name in party:
        print(f"{name}: on the quest")
    else:
        print(f"{name}: not on the quest")
```

Expected output:
```
Tyson: on the quest
Clarisse: not on the quest
Grover: on the quest
```

**check**
```js
{ kind: "output", mode: "normalized",
  expect: "Tyson: on the quest\nClarisse: not on the quest\nGrover: on the quest" }
```

**hints**
1. `איזה כלי משיעור 6 בוחר בין שתי שורות פלט שונות? ומה השאלה שאת שואלת עליו?`
2. `` `name in party` מחזיר True או False, ולכן הוא נכנס ישר אחרי `if`. לולאת
   for על `checking` תיתן לך שם אחד בכל סיבוב. ``
3. `לולאה אחת על checking. בתוכה if עם in, ו־else. שימי לב להזחה: ה־if בתוך
   הלולאה, וה־print בתוך ה־if.`

### e4 — The war council · 30 XP, 8 🪙

**brief** — `לכל חברה בחבורה יש דירוג כוח. הדפיסי כל דירוג עם המיקום שלו ברשימה
(מ־0), ואז שורה אחת שאומרת כמה מהן מעל 20. חובה לולאה — חמש שורות print ביד לא
יתקבלו.`

**starter**
```python
strength = [12, 40, 25, 8, 33]
# print "INDEX: VALUE" for every hero,
# then "N heroes are ready" for everyone above 20
```

**solution**
```python
strength = [12, 40, 25, 8, 33]
ready = 0
for i in range(len(strength)):
    print(f"{i}: {strength[i]}")
    if strength[i] > 20:
        ready = ready + 1
print(f"{ready} heroes are ready")
```

Expected output:
```
0: 12
1: 40
2: 25
3: 8
4: 33
3 heroes are ready
```

**check**
```js
{ kind: "output", mode: "normalized",
  expect: "0: 12\n1: 40\n2: 25\n3: 8\n4: 33\n3 heroes are ready" }
```
plus
```js
{ kind: "source", mustInclude: ["for"],
  message: { he: "המשימה הזאת דורשת לולאת for — היא צריכה לעבוד גם על רשימה של 50",
             en: "This one needs a for loop — it must work for a list of 50 too" } }
```

**hints**
1. `את צריכה גם את המספר וגם את המיקום שלו. איזו משתי צורות הלולאה נותנת לך את
   שניהם?`
2. `` `for i in range(len(strength))` נותן לך את המיקום, ו־`strength[i]` את הערך
   שיושב שם. הספירה עצמה היא accumulator בדיוק כמו בשיעור 7 — משתנה שמתחיל ב־0
   ועולה. ``
3. `לפני הלולאה: ready = 0. בתוך הלולאה: print של i ושל strength[i], ואז if
   שמעלה את ready ב־1 כשהערך גדול מ־20. אחרי הלולאה, מחוץ להזחה: print אחרון עם
   ready.`

## Quest — "The Boarding Manifest" · רשימת ההפלגה · 50 XP, 12 🪙

**brief** — `הספינה מפליגה עם שחר, ואי אפשר לעלות עליה בלי מניפסט. כתבי תוכנית
שמדפיסה את רשימת ההפלגה המלאה: כותרת, כמה אנשי צוות, כל אחת ואחד ממוספרים מ־1,
כמה פריטי אספקה, כל פריט בשורה עם מקף, ובסוף — בדיקה אחת: אם טייסון על הסיפון,
הקליפה תחזיק.`

**starter**
```python
party = ["Annabeth", "Grover", "Tyson", "Clarisse"]
supplies = ["ambrosia", "nectar", "rope", "drachmas"]

# === BOARDING MANIFEST ===
# Crew: ?
# 1. ...      (numbered from 1, not from 0)
# Supplies: ?
# - ...
# and the last line depends on whether Tyson is aboard
```

**solution**
```python
party = ["Annabeth", "Grover", "Tyson", "Clarisse"]
supplies = ["ambrosia", "nectar", "rope", "drachmas"]

print("=== BOARDING MANIFEST ===")
print(f"Crew: {len(party)}")
for i in range(len(party)):
    print(f"{i + 1}. {party[i]}")
print(f"Supplies: {len(supplies)}")
for item in supplies:
    print(f"- {item}")
if "Tyson" in party:
    print("Tyson is aboard. The ship will hold.")
else:
    print("No cyclops aboard. Watch the hull.")
```

Expected output (verified in Skulpt):
```
=== BOARDING MANIFEST ===
Crew: 4
1. Annabeth
2. Grover
3. Tyson
4. Clarisse
Supplies: 4
- ambrosia
- nectar
- rope
- drachmas
Tyson is aboard. The ship will hold.
```

**check**
```js
{ kind: "output", mode: "normalized",
  expect: "=== BOARDING MANIFEST ===\nCrew: 4\n1. Annabeth\n2. Grover\n3. Tyson\n4. Clarisse\nSupplies: 4\n- ambrosia\n- nectar\n- rope\n- drachmas\nTyson is aboard. The ship will hold." }
```
plus
```js
{ kind: "source", mustInclude: ["for"],
  message: { he: "המניפסט חייב לרוץ בלולאה — מחר יעלו על הספינה שמונה",
             en: "The manifest must be built with a loop — tomorrow there will be eight" } }
```

Why this quest: it puts all four skills in one program and hides the off-by-one
in plain sight. The crew is numbered 1–4 while the indexes are 0–3, so `i + 1`
is the line where the lesson lands. The `if` at the end reuses `in` for the
thing `in` is actually for.

**hints**
1. `שני חלקים כאן הם אותה עבודה על שתי רשימות שונות. מה מפריד ביניהם, חוץ
   מהטקסט?`
2. `` הצוות ממוספר מ־1 אבל ה־indexes מתחילים מ־0, אז את צריכה לולאה עם `i`
   ו־`{i + 1}` בתוך ה־f-string. האספקה לא ממוספרת, אז שם `for item in supplies`
   מספיק. ``
3. `סדר העבודה: כותרת → שורת Crew עם len → לולאה על range(len(party)) שמדפיסה
   {i + 1}. {party[i]} → שורת Supplies עם len → לולאה על supplies שמדפיסה
   מקף ורווח לפני כל פריט → if "Tyson" in party עם else. שימי לב שה־if האחרון
   לא מוזח בתוך הלולאה.`

## Reward & Recap

**Item**: 📜 **מגילת החבורה / The Party Roster** — `מגילה אחת שמחזיקה את כל
השמות. מרגע שיש לך אותה, את לא צריכה לזכור בעל־פה כלום.` (Also adds bead #9 to
the camp necklace.)

**Achievements possible here**:
- *Off By One* — hit `IndexError` and then pass the same exercise. Awarded with
  a warm line, never a scolding one.
- *Roll Call* — finish the quest with no hints.
- *Persistent* — solve an exercise after five failed runs.

**Recap bullets**:
- רשימה (`list`) מחזיקה הרבה ערכים בשם אחד, בתוך `[ ]` ומופרדים בפסיקים
- ה־index מתחיל ב־**0**, ולכן האחרון הוא `len(list) - 1`
- `len(list)` אומר כמה ערכים יש
- `for x in list` רץ על הערכים; `for i in range(len(list))` נותן גם את המיקום
- `x in list` מחזיר `True` או `False` — שאלה, לא לולאה
- `IndexError: list index out of range` אומר: ביקשת מקום שלא קיים

**Next teaser**: *"עכשיו יש לך מגילה. אבל מגילה טובה משתנה — מוסיפים, מוחקים,
מסדרים. בשיעור הבא הציידות של ארטמיס יבדקו אם את יודעת לנהל מחסן."*

## Common mistakes to anticipate

| She does | She sees | Hint must cover |
| --- | --- | --- |
| `party[3]` on a 3-item list | `IndexError: list index out of range on line 2` | last index is `len - 1`, not `len` |
| `party[len(party)]` | `IndexError: list index out of range` | the same bug wearing a disguise |
| `for i in range(len(p)): print(p[i + 1])` | prints most of it, then `IndexError` | `i + 1` is for *display*, never for the index |
| `print(party)` where members were wanted | `['Annabeth', 'Grover', 'Tyson']` | that is Python's own notation for a whole list; loop to print members |
| `party = ["Annabeth" "Grover"]` (missing comma) | `['AnnabethGrover']` — no error at all | a missing comma glues two strings; count the items, not the words |
| `party.len()` | `AttributeError: 'list' object has no attribute 'len' on line 2` | `len` wraps the list: `len(party)` |
| `if party in "Grover":` (reversed) | `TypeError` or a silent `False` | order matters: *thing* `in` *container* |
| `for member in party` (no colon) | `SyntaxError: bad input on line 2` | the `:` from lesson 6 is still required |

## Implementation notes

- Every code sample and every solution in this file was executed against the
  vendored `skulpt.min.js` before shipping. `IndexError: list index out of range`
  is Skulpt's real text; Skulpt appends ` on line N`, which the lesson shows
  because that is what she will see on screen.
- `f"{party[i]}"` (an index inside an f-string) is verified working in Skulpt.
  So is `f"{party[0:3]}"`, but slicing belongs to lesson 10 — do not use it here.
- Negative indexing (`party[-1]`) is verified but is taught as a *tip only* and
  is never required by a check, so a learner who ignores it loses nothing.
- All output checks use `mode: "normalized"`. No expected line depends on
  leading whitespace, so whitespace collapsing cannot break a correct solution.
- e2, e4 and the quest pair an `output` check with a `source` check so she cannot
  pass by hard-coding numbers she was asked to compute. Every `source` check
  carries its `message`, per `04-lesson-template.md`.
- No `input()` anywhere in this lesson — nothing blocks on a prompt.
- Nothing here mutates a list while looping over it; that trap belongs to
  lesson 10, where `.remove()` exists.
