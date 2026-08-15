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
| **XP** | 20 + 25 + 30 + 30 (training battles) + 55 (great battle) = **160** |
| **drachmas** | 5 + 6 + 8 + 8 + 14 = **41** 🪙 |
| **battle API** | `place_tower`, `get_wave`, `get_gold`, `camp_hp` — build script only |
| **towers** | `archer` only, in every level of this lesson |

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

**The battles are where this becomes real.** Until now the brief told her how
many monsters were coming. From this lesson on, `get_wave()` hands her the
roster as a list and the brief stops saying. She counts it, she checks it, and
the number she gets out of it decides how many towers she can build — the gold
in every level is exactly the count the list gives, so a defense built on a
guess either leaks or runs out of money mid-build.

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
   IndexError: list index out of range (line 2)
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

16. **code (runnable)** — the list she did not write herself. This is the block
    the whole lesson has been walking towards.
    ```python
    wave = get_wave()
    print(wave)
    print(len(wave))
    ```
    Output on the practice field:
    ```
    [{'kind': 'satyr', 'hp': 20, 'speed': 2.6, 'armour': 0, 'flying': False}, {'kind': 'satyr', 'hp': 20, 'speed': 2.6, 'armour': 0, 'flying': False}, {'kind': 'satyr', 'hp': 20, 'speed': 2.6, 'armour': 0, 'flying': False}]
    3
    ```
    Caption: `get_wave מחזיר רשימה — אחד לכל מפלצת שבדרך. הוא לא מדפיס אותה ולא
    מסביר אותה, הוא רק מוסר לך אותה. מה שאת עושה איתה זה כבר את.`

17. **callout · tip** — title: *מה מותר לשאול את הגל היום* / *What you may ask the
    wave today*
    כל תא ברשימה הזאת הוא **מילון** — מבנה שתפגשי בשיעור 11. עד אז שתי השאלות
    שאת כן יכולה לשאול הן בדיוק אלה שלמדת היום, והן מספיקות לארבעה קרבות:
    - `len(wave)` — כמה מפלצות מגיעות. זה מה שקובע כמה מגדלים לבנות.
    - `wave[0]`, `wave[1]` — מפלצת אחת מתוך הרשימה, לפי מקום בתור.
    ההסבר על מה יש **בתוך** כל תא מחכה לשיעור 11. שום דבר כאן לא שבור — בינתיים
    עוד לא הגיע התור של הכלי שפותח את התאים.

18. **code (runnable)** — `not in` as a seatbelt on a build.
    ```python
    crossings = [2, 4]
    for x in range(6):
        if x not in crossings:
            print(f"tower at column {x}")
    ```
    Output:
    ```
    tower at column 0
    tower at column 1
    tower at column 3
    tower at column 5
    ```
    Caption: `זו התבנית של הקרב השלישי היום: לרוץ על כל העמודות, ולדלג על אלה
    שהדרך חוצה. בלי הבדיקה הזאת המגדל נבנה על הכביש, והקרב נגמר לפני שהתחיל.`

## Try It (ungraded)

Free-play editor. Nothing is checked.

The game words work here too, against a practice field, so `get_wave()` answers
even though no battle is running.

```python
party = ["Annabeth", "Grover", "Tyson"]
print(party)
print(party[0])
print(len(party))
print(len(get_wave()))
```

Intro: *"המגילה שלך. הוסיפי שמות, שני את הסדר, נסי index אחר. נסי גם index
גדול מדי — כאן זה בטוח לגמרי, ואת רוצה לראות את `IndexError` פעם אחת בשקט.
ואם בא לך, שאלי את `get_wave()` מה מגיע על מגרש האימונים."*

## The battles

Four training battles and one great battle. There is no written exercise in this
lesson — every task is a real defense, simulated to completion, and she watches
it happen. The schema for the level objects below is `spec/09-battle-game.md`.

All five levels were run headless against the vendored engine: **each stated
solution wins its own battle, and an empty program loses every one of them.**

The through-line: `get_wave()` hands her a **list**. In battle 1 she counts it,
in battle 2 the count decides how many towers she builds, in battle 3 she checks
membership before building, in battle 4 she walks a list of her own by index.

### b1 — מפקד הגל · The Muster · 20 XP, 5 🪙

**Why this mechanic** — `get_wave()` returns a **list**, and `len()` is the only
way to ask how long a list is. Nothing else in Python answers "how many".

**level**
```js
{
  map: { cols: 12, rows: 7, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4]] },
  gold: 200, campHp: 3, seed: 9, allowed: ["archer"],
  waves: [
    { delay: 0, enemies: [{ kind: "satyr", count: 4, gap: 1.2 }] },
    { delay: 9, enemies: [{ kind: "harpy", count: 4, gap: 1.1 }] },
  ],
}
```

**brief** — `כירון מוסר לך את דוח הסיור. הפקודה get_wave() מחזירה רשימה — תא אחד
לכל מפלצת שבדרך.

שמרי את הרשימה במשתנה, קחי את הכמות מ־len והדפיסי אותה, ואז בני שלושה מגדלי קשת
בשורה 3: בעמודות 3, 6 ו־9. הזהב מספיק לשלושה.`

**starter**
```python
wave = get_wave()
print(len(wave))
place_tower("archer", 3, 3)
```

**solution**
```python
wave = get_wave()
coming = len(wave)
print(f"{coming} monsters are coming")
place_tower("archer", 3, 3)
place_tower("archer", 6, 3)
place_tower("archer", 9, 3)
```

**check**
```js
{ kind: "battle",
  also: { kind: "source", mustInclude: ["get_wave(", "len("],
          message: { he: "המספר צריך לבוא מהרשימה — get_wave ואחריו len, לא ספירה בעיניים",
                     en: "The count must come from the list — get_wave then len, not counted by eye" } } }
```

**hints**
1. `הרצת את הקוד וראית מספר. מאיפה המספר הזה הגיע — ממך, או מהמשחק?`
2. `` `get_wave()` מחזיר רשימה, ו־`len(...)` על רשימה נותן כמה תאים יש בה. מגדל
   אחד לא יעצור שמונה. ``
3. `` שלוש שורות `place_tower("archer", x, 3)` עם x שווה 3, ואז 6, ואז 9. שימי לב
   שהמספר מ־len נשמר במשתנה לפני ה־print — כשהוא יושב בתוך f-string בלבד, בדיקת
   הקוד לא רואה אותו. ``

### b2 — מגדל לכל שם ברשימה · A Tower for Every Name · 25 XP, 6 🪙

**Why this mechanic** — the number of towers is `len(wave)`, so the build has to
be `for i in range(len(wave))`. The gold is exactly six archers: one fewer and
the pack gets through, one more and the build fails for lack of gold.

**level**
```js
{
  map: { cols: 12, rows: 7, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4]] },
  gold: 300, campHp: 3, seed: 10, allowed: ["archer"],
  waves: [ { delay: 0, enemies: [{ kind: "hellhound", count: 6, gap: 1.2 }] } ],
}
```

**brief** — `להקה של כלבי גיהינום. אל תספרי אותם בעיניים — קחי את המספר מהרשימה.

בני מגדל אחד לכל מפלצת ברשימה, כולם בשורה 3, בעמודות 0, 2, 4 וכן הלאה — כלומר
בעמודה i * 2 בסיבוב מספר i. הזהב מספיק בדיוק למספר הזה, לא למגדל אחד יותר.`

**starter**
```python
wave = get_wave()
print(len(wave))
place_tower("archer", 0, 3)
```

**solution**
```python
wave = get_wave()
for i in range(len(wave)):
    place_tower("archer", i * 2, 3)
```

**check**
```js
{ kind: "battle",
  also: { kind: "source", mustInclude: ["for", "range(len(", "get_wave("],
          message: { he: "מספר המגדלים חייב לבוא מהרשימה — לולאה על range(len(wave))",
                     en: "The number of towers must come from the list — a loop over range(len(wave))" } } }
```

**hints**
1. `אם מחר יגיעו שבעה במקום שישה, כמה שורות בקוד שלך יצטרכו להשתנות?`
2. `` `for i in range(len(wave)):` רץ בדיוק פעם אחת לכל מפלצת. בתוך הלולאה,
   `i` הוא מספר הסיבוב — 0, 1, 2… ``
3. `` שתי שורות: `for i in range(len(wave)):` ובתוכה, מוזחת,
   `place_tower("archer", i * 2, 3)`. הכפל ב־2 מפזר את המגדלים לאורך השביל
   במקום לערום אותם זה על זה — ושתי מגדלים על אותה משבצת הם שגיאת בנייה. ``

### b3 — איפה שהדרך חוצה את הרכס · Where the Road Crosses the Ridge · 30 XP, 8 🪙

**Why this mechanic** — `x not in crossings` asked **before** building. The road
crosses the ridge in four places; a tower on the road is a build error and the
battle is lost before a single monster moves. This is `in` doing the one job `in`
is for: a yes/no question about a list.

**level**
```js
{
  map: {
    cols: 12, rows: 7,
    path: [[0,4],[1,4],[2,4],[2,3],[2,2],[3,2],[4,2],[4,3],[4,4],[5,4],[6,4],
           [6,3],[6,2],[7,2],[8,2],[8,3],[8,4],[9,4],[10,4],[11,4]],
    rock: [[0,0],[11,0]],
  },
  gold: 400, campHp: 3, seed: 11, allowed: ["archer"],
  waves: [
    { delay: 0,  enemies: [{ kind: "satyr", count: 8, gap: 0.7 }] },
    { delay: 9,  enemies: [{ kind: "hellhound", count: 6, gap: 1.0 }] },
    { delay: 20, enemies: [{ kind: "harpy", count: 8, gap: 0.7 }] },
    { delay: 30, enemies: [{ kind: "hellhound", count: 5, gap: 1.0 }] },
  ],
}
```

**brief** — `הרכס הוא שורה 3, וממנו רואים את כל הדרך. אבל הדרך עולה ויורדת דרך
הרכס בארבע נקודות: עמודות 2, 4, 6 ו־8. מגדל שייבנה שם עומד על הכביש, וזאת שגיאת
בנייה — הקרב נגמר לפני שהתחיל.

רוצי על כל שתים־עשרה העמודות, ובני בכל אחת שהיא **לא** אחת מארבע הנקודות האלה.
הזהב מספיק בדיוק לשמונה המגדלים שנשארים.`

**starter**
```python
crossings = [2, 4, 6, 8]
for x in range(12):
    place_tower("archer", x, 3)
```

**solution**
```python
crossings = [2, 4, 6, 8]
for x in range(12):
    if x not in crossings:
        place_tower("archer", x, 3)
```

**check**
```js
{ kind: "battle",
  also: { kind: "source", mustInclude: ["not in", "for"],
          message: { he: "צריך לדלג על נקודות החצייה עם not in — ולא למחוק אותן מהלולאה ביד",
                     en: "Skip the crossings with not in — not by deleting them from the loop by hand" } } }
```

**hints**
1. `הריצי את הקוד כמו שהוא. מה המשחק אומר לך, ולפני איזו מפלצת הוא אומר את זה?`
2. `` `x not in crossings` מחזיר `True` כשהעמודה נקייה. `if` משיעור 6 הוא מה
   שמכניס את הבדיקה הזאת לפני הבנייה. ``
3. `` שלוש שורות בתוך הלולאה במקום אחת: `for x in range(12):`, ואז
   `if x not in crossings:` מוזח פנימה, ואז ה־`place_tower` מוזח עוד פנימה.
   שמונה מגדלים ייבנו, ארבע העמודות יידלגו — וזה בדיוק מה שהזהב מכסה. ``

### b4 — רשימת המקומות · The List of Places · 30 XP, 8 🪙

**Why this mechanic** — two lists at once: `wave` decides **how many**, `spots`
decides **where**, and `spots[i]` inside `for i in range(len(wave))` is the line
that joins them. Annabeth ranked the spots best first, so taking a prefix of the
list is taking the best ones.

**level**
```js
{
  map: { cols: 12, rows: 7, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4]] },
  gold: 300, campHp: 3, seed: 12, allowed: ["archer"],
  waves: [
    { delay: 0, enemies: [{ kind: "hellhound", count: 4, gap: 0.9 }] },
    { delay: 7, enemies: [{ kind: "cyclops", count: 2, gap: 2.5 }] },
  ],
}
```

**brief** — `אנבת' סימנה תשע משבצות טובות בשורה 3 וסידרה אותן מהטובה ביותר
ולמטה:

spots = [5, 3, 7, 1, 9, 0, 11, 2, 10]

בני מגדל אחד לכל מפלצת בגל — לא יותר. את המספר קחי מהרשימה של הגל, ואת המקום
מהרשימה של אנבת', לפי אותו i. הזהב מספיק בדיוק לכמות הזאת.`

**starter**
```python
spots = [5, 3, 7, 1, 9, 0, 11, 2, 10]
wave = get_wave()
print(len(wave))
place_tower("archer", spots[0], 3)
```

**solution**
```python
spots = [5, 3, 7, 1, 9, 0, 11, 2, 10]
wave = get_wave()
for i in range(len(wave)):
    place_tower("archer", spots[i], 3)
```

**check**
```js
{ kind: "battle",
  also: { kind: "source", mustInclude: ["spots[", "range(len(", "get_wave("],
          message: { he: "המקום צריך לצאת מ־spots לפי ה־index, והכמות מ־len של הגל",
                     en: "The place must come out of spots by index, and the count from len of the wave" } } }
```

**hints**
1. `יש לך תשעה מקומות ופחות מפלצות מזה. איזו משתי הרשימות קובעת כמה פעמים הלולאה
   רצה?`
2. `` `for i in range(len(wave)):` נותן את מספר הסיבובים, ו־`spots[i]` נותן את
   העמודה של הסיבוב הזה. אותו `i` משמש לשתי המטרות. ``
3. `` `place_tower("archer", spots[i], 3)` בתוך `for i in range(len(wave)):`.
   אם תכתבי `range(len(spots))` — תבני תשעה מגדלים, הזהב ייגמר באמצע, וזאת
   שגיאת בנייה. אם תבני חמישה — קיקלופ אחד יגיע לשער. ``

## The great battle — ההגנה על הכף · The Defense of the Cape · 55 XP, 14 🪙

**Why this mechanic** — all three list moves in one program: count the wave,
guard the build with `not in`, and walk a list of places with `for`. It is also
the first level where the count is a **decision** and not only a number: the
standing order is that a wave of more than forty gets the shore line as well, and
a wave that size cannot be held by the ridge alone. She has to look before she
answers.

**level**
```js
{
  map: {
    cols: 16, rows: 9,
    path: [[0,4],[1,4],[2,4],[3,4],[4,4],[4,5],[4,6],[5,6],[6,6],[7,6],[7,5],
           [7,4],[7,3],[7,2],[8,2],[9,2],[10,2],[10,3],[10,4],[11,4],[12,4],
           [13,4],[14,4],[15,4]],
    rock: [[13,1],[14,6]],
  },
  gold: 650, campHp: 3, seed: 13, allowed: ["archer"],
  waves: [
    { delay: 0,  enemies: [{ kind: "satyr", count: 12, gap: 0.4 }] },
    { delay: 6,  enemies: [{ kind: "harpy", count: 12, gap: 0.4 }] },
    { delay: 14, enemies: [{ kind: "hellhound", count: 12, gap: 0.5 }] },
    { delay: 24, enemies: [{ kind: "hellhound", count: 10, gap: 0.5 },
                           { kind: "cyclops", count: 6, gap: 1.0 }] },
  ],
}
```

**brief** — `הכף הוא המקום האחרון לפני המחנה, והדרך מתפתלת בו שלוש פעמים.

1. הדפיסי כמה מפלצות בגל.
2. בני על הרכס — שורה 3, עמודות 0 עד 11 — ודלגי על שתי נקודות החצייה: 7 ו־10.
3. הפקודה הקבועה של כירון: **בגל של יותר מארבעים, מחזיקים גם את החוף.** אם זה
   המצב, בני גם בשורה 5, בעמודות 5, 8 ו־11.

הזהב מספיק בדיוק לרכס ולחוף יחד. הרכס לבדו לא יחזיק את הגל הזה.`

**starter**
```python
wave = get_wave()
print(f"{len(wave)} monsters")
crossings = [7, 10]
place_tower("archer", 0, 3)
```

**solution**
```python
wave = get_wave()
print(f"{len(wave)} monsters in this assault")

crossings = [7, 10]
for x in range(12):
    if x not in crossings:
        place_tower("archer", x, 3)

shore = [5, 8, 11]
if len(wave) > 40:
    for x in shore:
        place_tower("archer", x, 5)
```

**check**
```js
{ kind: "battle",
  also: { kind: "source", mustInclude: ["not in", "len(", "for"],
          message: { he: "הקרב הזה דורש את שלושת הכלים: len על הגל, not in לחצייה, ולולאה על הרשימה",
                     en: "This battle needs all three: len on the wave, not in for the crossings, and a loop over the list" } } }
```

**hints**
1. `שני קווי הגנה, ושתי שאלות שונות: "על מה לדלג" ו"האם בכלל לבנות שם". איזו
   מהן נשאלת על עמודה בודדת ואיזו על הגל כולו?`
2. `` הרכס הוא בדיוק הקרב הקודם: `for x in range(12)` עם `if x not in crossings`.
   החוף הוא לולאה ישירה על הרשימה — `for x in shore:` — בתוך `if` אחד שבודק את
   `len(wave)`. ``
3. `` סדר העבודה: `wave = get_wave()` → הדפסה של `len(wave)` → לולאת הרכס עם
   ה־`not in` → `shore = [5, 8, 11]` → `if len(wave) > 40:` ובתוכו
   `for x in shore:` שמציב בשורה 5. שימי לב להזחה: ה־`for` של החוף יושב בתוך
   ה־`if`, וה־`place_tower` בתוך שניהם. ``

## Reward & Recap

**Item**: 📜 **מגילת החבורה / The Party Roster** — `מגילה אחת שמחזיקה את כל
השמות. מרגע שיש לך אותה, את לא צריכה לזכור בעל־פה כלום.` (Also adds bead #9 to
the camp necklace.)

**Achievements possible here**:
- *Off By One* — hit `IndexError`, or walk off the end of `spots`, and then win
  the same battle. Awarded with a warm line, never a scolding one.
- *Roll Call* — win the great battle with no hints.
- *Persistent* — win a battle after five failed runs.

**Recap bullets**:
- רשימה (`list`) מחזיקה הרבה ערכים בשם אחד, בתוך `[ ]` ומופרדים בפסיקים
- ה־index מתחיל ב־**0**, ולכן האחרון הוא `len(list) - 1`
- `len(list)` אומר כמה ערכים יש
- `for x in list` רץ על הערכים; `for i in range(len(list))` נותן גם את המיקום
- `x in list` מחזיר `True` או `False` — שאלה, לא לולאה
- `IndexError: list index out of range` אומר: ביקשת מקום שלא קיים
- `get_wave()` מחזיר **רשימה** של הגל; `len` עליה הוא מספר המגדלים שאת צריכה

**Next teaser**: *"עכשיו יש לך מגילה. אבל מגילה טובה משתנה — מוסיפים, מוחקים,
מסדרים. בשיעור הבא הציידות של ארטמיס יבדקו אם את יודעת לנהל מחסן."*

## Common mistakes to anticipate

| She does | She sees | Hint must cover |
| --- | --- | --- |
| `party[3]` on a 3-item list | `IndexError: list index out of range (line 2)` | last index is `len - 1`, not `len` |
| `party[len(party)]` | `IndexError: list index out of range` | the same bug wearing a disguise |
| `for i in range(len(p)): print(p[i + 1])` | prints most of it, then `IndexError` | `i + 1` is for *display*, never for the index |
| `print(party)` where members were wanted | `['Annabeth', 'Grover', 'Tyson']` | that is Python's own notation for a whole list; loop to print members |
| `party = ["Annabeth" "Grover"]` (missing comma) | `['AnnabethGrover']` — no error at all | a missing comma glues two strings; count the items, not the words |
| `party.len()` | `AttributeError: 'list' object has no attribute 'len' (line 2)` | `len` wraps the list: `len(party)` |
| `if party in "Grover":` (reversed) | `TypeError` or a silent `False` | order matters: *thing* `in` *container* |
| `for member in party` (no colon) | `SyntaxError: bad input (line 2)` | the `:` from lesson 6 is still required |
| builds on a crossing column in b3 | *"You cannot build on the path itself"* and the battle is lost with full camp HP | a build error ends the battle before it starts; guard with `not in` |
| `for i in range(len(spots))` in b4 | *"Not enough gold for that tower"* | the wave decides the count, the spots list only decides the place |
| the same column twice | *"There is already a tower on that square"* | each tower needs its own cell — check what your loop actually produces |
| `len` only inside an f-string | the battle is won but the `also` check fails | a `source` check reads a skeleton with string literals stripped; take the count into a variable first |

## Implementation notes

- Every code sample and every solution in this file was executed against the
  vendored `skulpt.min.js`, and **every level was simulated headless**: each
  solution wins its own battle and an empty program loses all five.
  `IndexError: list index out of range` is Skulpt's real text; the page renders
  it as `Type: message (line N)`, which is the exact form an `error` block must
  declare — `verify-python.mjs` fails the build on drift.
- `f"{party[i]}"` (an index inside an f-string) is verified working in Skulpt.
  So is `f"{party[0:3]}"`, but slicing belongs to lesson 10 — do not use it here.
- Negative indexing (`party[-1]`) is verified but is taught as a *tip only* and
  is never required by a check, so a learner who ignores it loses nothing.
- **`get_wave()` returns a list of dicts, and this lesson never opens a dict.**
  She uses the list's *length* and its *positions* only; `m["kind"]` waits for
  lesson 11, which is where the entries are opened. Teach block 17 says so out
  loud rather than letting her discover a wall.
- **A `source` check reads a skeleton with comments and string literals stripped.**
  `len(` written only inside an f-string is invisible to it — b1's solution
  therefore assigns `coming = len(wave)` first. Any level requiring a construct
  must let that construct appear outside a string.
- Every level's `gold` is exactly the cost of the intended build, so the count is
  enforced in both directions: one tower short leaks, one tower over raises a
  `tooPoor` build error and the level is lost with the camp untouched.
- **Building on the path is a build error, not a miss.** `check.kind: "battle"`
  fails on any build error, which is what makes b3's `not in` load-bearing.
  Rocks, by contrast, are *not* rejected by the simulation — never write a level
  that depends on a rock refusing a tower; use gold.
- The default objective is a **perfect** defense: `campHp` must not drop at all.
  Every level here sets `campHp: 3`, so the hearts are readable at a glance.
- Randomness is seeded per level (`seed: 9` … `13`), so a battle plays out the
  same way every time she runs it.
- No `input()` anywhere in this lesson — nothing blocks on a prompt.
- Nothing here mutates a list while looping over it; that trap belongs to
  lesson 10, where `.remove()` exists.
