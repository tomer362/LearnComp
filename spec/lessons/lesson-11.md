# Lesson 11 — Registry of the Gods · מרשם האלים

> **Act III — Sea of Monsters · ים המפלצות** · Stop 11 of 20
> Structure follows `spec/lessons/lesson-01.md`. Schema: `spec/04-lesson-template.md`.

| | |
| --- | --- |
| **id** | `11` |
| **slug** | `registry-of-the-gods` |
| **minutes** | 30–35 |
| **concepts** | dictionaries, keys and values, lookup by key, adding and updating, `.get()`, `in` on a dict, `.keys()` / `.values()` / `.items()`, `len()` on a dict |
| **new vocabulary** | `{}`, `key: value`, `.get`, `.keys`, `.values`, `.items` |
| **requires** | L9 lists, `len()`, `for`, `in` · L10 `sorted()`, `sum()` · L6 `if`/`else` · L3 f-strings · L7 accumulators |
| **item** | 🗝️ מפתח הרמס / Hermes' Key |
| **XP** | 20 + 25 + 30 + 30 (training battles) + 55 (great battle) = **160** |
| **drachmas** | 5 + 7 + 8 + 8 + 14 = **42** 🪙 |
| **battle API** | `place_tower`, `tower_cost`, `get_wave`, `get_gold`, `camp_hp` — build script only |
| **towers** | `archer`, `cannon`, `ice` — the cannon cannot hit anything flying |

## Teaching goal

A list answers *"what is at position 3?"*. A dict answers *"what is Poseidon's
domain?"*. By the end she can build a `dict`, look a value up by name, add and
change entries, ask safely with `.get()` when she is not sure the key exists,
and walk over every pair with `.items()`.

The emotional beat is the **`KeyError`**. In lesson 9 an error meant she
miscounted. Here an error means she asked for a name that is not on the list —
usually a typo or a capital letter. Meeting `KeyError` in a calm moment, and
then meeting `.get()` as the tool that makes the question survivable, is the
core of the lesson.

Lesson 10's battles ran on two parallel columns of hit points that stayed
aligned only because nothing got reordered. This lesson opens by breaking exactly
that, then fixing it.

**And this is the lesson where `get_wave()` finally opens.** Since lesson 9 she
has been carrying a list whose entries she could count but not read. Every entry
is a dict — `{"kind", "hp", "speed", "armour", "flying"}` — and from here on the
wave tells her what is coming, not merely how much of it. Three of her own dicts
answer back: a counter table (kind → tower kind), a count table built with
`.get(k, 0) + 1`, and a catalogue of prices from `tower_cost()`. Each one decides
a `place_tower` call, so a `KeyError` is not a red message in a console — it is a
camp with no towers on it.

## Story beat

The ship reaches the gate of the Sea of Monsters. A man in a winged cap is
leaning on the rocks with a ledger under his arm — Hermes, god of roads,
messengers and record-keeping. He will open the gate for anyone who can read his
book. The book has no page numbers and no rows. It has names, and beside each
name, what that god rules.

The Prophecy panel (5 lines, no code):

> בשער של ים המפלצות עומדת דמות עם כובע מכונף.
> "אני הרמס," הוא אומר. "כל אל בעולם רשום אצלי בפנקס."
> "אם תדעי לקרוא בפנקס, השער ייפתח לך."
> הוא מושיט לך ספר עבה. אין בו מספרים ואין בו שורות ממוספרות.
> יש בו רק שמות — ולצד כל שם, מה שהוא שולט עליו.

Cast: Hermes (fast-talking, amused, keeps excellent records), Annabeth (asks the
`.get()` question), Grover (causes the `KeyError` by spelling "Zeus" with a
small z and getting rained on).

## Chiron Teaches — block by block

1. **prose** — בשיעור הקודם היו לך שתי רשימות מיושרות: פריטים ומשקלים, כל אחד
   ב־index שלו. זה עובד — עד שמישהי מסדרת רשימה אחת ולא את השנייה, ואז המשקל של
   החבל שייך פתאום לנקטר. פייתון יודע לשמור זוגות בלי להסתמך על מיקום.

2. **compare** — the motivation, before the syntax.
   - bad — label: *שתי רשימות מקבילות. ה־1 הזה הוא הבטחה שאף אחד לא שומר.*
     ```python
     names = ["Zeus", "Poseidon", "Hades"]
     domains = ["sky", "sea", "underworld"]
     print(domains[1])
     ```
   - good — label: *פנקס אחד. השם עצמו הוא הכתובת.*
     ```python
     domains = {"Zeus": "sky", "Poseidon": "sea", "Hades": "underworld"}
     print(domains["Poseidon"])
     ```
   Caption: `בגרסה השנייה אין index בכלל. אין מה ליישר ואין מה לשבור.`

3. **code (runnable)** — the first dict, run in the first minute.
   ```python
   domains = {"Zeus": "sky", "Poseidon": "sea", "Hades": "underworld"}
   print(domains["Poseidon"])
   print(domains["Hades"])
   ```
   Output:
   ```
   sea
   underworld
   ```
   Caption: `סוגריים מסולסלים { } פותחים מילון. בפנים: מפתח, נקודתיים, ערך —
   ופסיק בין זוג לזוג.`

4. **prose** — Name it now: **מילון (dict)** שומר זוגות של **מפתח** (key)
   ו**ערך** (value). המפתח הוא מה שאת מחפשת לפיו, הערך הוא מה שאת מקבלת.
   ברשימה שאלת "מה יש במקום 2". במילון את שואלת "מה יש תחת השם הזה".
   המפתחות במילון ייחודיים: אין שני `"Zeus"` נפרדים.

5. **code (runnable)** — adding and updating are the same move.
   ```python
   domains = {"Zeus": "sky", "Poseidon": "sea"}
   domains["Athena"] = "wisdom"
   domains["Poseidon"] = "the sea and earthquakes"
   print(domains)
   print(len(domains))
   ```
   Output:
   ```
   {'Zeus': 'sky', 'Poseidon': 'the sea and earthquakes', 'Athena': 'wisdom'}
   3
   ```
   Caption: `אותה שורה בדיוק. אם המפתח קיים — הערך מתעדכן. אם לא — נוצר זוג חדש.
   len על מילון סופר כמה מפתחות יש בו.`

6. **error block** — the heart of the lesson.
   ```python
   domains = {"Zeus": "sky", "Poseidon": "sea"}
   print(domains["Hera"])
   ```
   Real error (verified against the engine, in the form the page renders):
   ```
   KeyError: Hera (line 2)
   ```
   Explanation: `KeyError` אומר דבר אחד: **המפתח הזה לא קיים בפנקס.** שימי לב
   כמה זה שונה מ־`IndexError` משיעור 9 — שם ספרת לא נכון, כאן ביקשת שם שלא
   רשום. שלוש הסיבות הנפוצות, לפי הסדר:
   - שגיאת כתיב — `"Posiedon"`
   - אות גדולה מול קטנה — `"zeus"` הוא **לא** `"Zeus"` בעיני פייתון
   - המפתח באמת לא שם, וזה מידע — לא תקלה
   גרובר גילה את השנייה בדרך הקשה. שאלת את `"zeus"`, קיבלת שגיאה, ואז גשם.
   In CPython the same line prints `KeyError: 'Hera'` with quotes; Skulpt drops
   them. Show the engine's text — it is what she sees — and say so in one line.

7. **code (runnable)** — `.get()`, the safe question.
   ```python
   domains = {"Zeus": "sky", "Poseidon": "sea"}
   print(domains.get("Hera"))
   print(domains.get("Hera", "not in the registry"))
   print(domains.get("Zeus", "not in the registry"))
   ```
   Output:
   ```
   None
   not in the registry
   sky
   ```
   Caption: `get שואל בלי לשבור. בלי ארגומנט שני הוא מחזיר None; עם ארגומנט שני
   הוא מחזיר אותו כשהמפתח חסר.`

8. **callout · tip** — title: *מתי סוגריים ומתי get* / *Brackets or `.get()`?*
   - `domains["Zeus"]` — כשאת **בטוחה** שהמפתח שם. אם טעית, את רוצה שהתוכנית
     תעצור ותצעק, כי טעות שקטה גרועה משגיאה רועשת.
   - `domains.get("Zeus", "unknown")` — כשהמפתח **אולי** שם, ויש לך תשובה
     סבירה למקרה שלא.
   שתי הדרכים נכונות. הבחירה ביניהן היא החלטה, לא טעם.

9. **code (runnable)** — `in` on a dict looks at keys.
   ```python
   domains = {"Zeus": "sky", "Poseidon": "sea"}
   print("Zeus" in domains)
   print("sky" in domains)
   if "Hera" not in domains:
       print("Hera is missing from the ledger")
   ```
   Output:
   ```
   True
   False
   Hera is missing from the ledger
   ```

10. **callout · warn** — title: *`in` בודק מפתחות, לא ערכים* / *`in` checks keys*
    `"sky" in domains` יצא `False` למרות ש־`"sky"` נמצא בפנקס — כי הוא **ערך**,
    לא מפתח. אם באמת צריך לחפש בערכים, יש `in domains.values()`. זו טעות שקטה
    ומסוכנת: היא לא זורקת שגיאה, היא רק עונה לא נכון על שאלה אחרת.

11. **code (runnable)** — walking the whole ledger.
    ```python
    domains = {"Zeus": "sky", "Poseidon": "sea", "Athena": "wisdom"}
    for name in domains.keys():
        print(name)
    for domain in domains.values():
        print(domain)
    for name, domain in domains.items():
        print(f"{name} rules {domain}")
    ```
    Output:
    ```
    Zeus
    Poseidon
    Athena
    sky
    sea
    wisdom
    Zeus rules sky
    Poseidon rules sea
    Athena rules wisdom
    ```
    Caption: `items נותן שני דברים בכל סיבוב, ולכן כותבים שני שמות אחרי for,
    מופרדים בפסיק. השם הראשון מקבל את המפתח, השני את הערך.`

12. **error block** — the `.items()` that was forgotten.
    ```python
    domains = {"Zeus": "sky", "Poseidon": "sea"}
    for name, domain in domains:
        print(name)
    ```
    Real error (verified against the engine):
    ```
    ValueError: too many values to unpack (expected 2) (line 2)
    ```
    Explanation: לולאה על מילון ישר נותנת **מפתחות בלבד** — כלומר את המחרוזת
    `"Zeus"`. ביקשת לפרק אותה לשניים, ופייתון ניסה, ונתקע. שתי דרכים נכונות:
    `for name in domains:` לשם בלבד, או `for name, domain in domains.items():`
    לשניהם. השגיאה הזאת מופיעה לכל מי שכותבת מילונים, גם אחרי עשר שנים.

13. **code (runnable)** — values do not have to be text; a dict can count.
    ```python
    offerings = {"Zeus": 3, "Poseidon": 5}
    offerings["Poseidon"] = offerings["Poseidon"] + 1
    offerings["Hermes"] = offerings.get("Hermes", 0) + 1
    print(offerings)
    print(sum(offerings.values()))
    ```
    Output:
    ```
    {'Zeus': 3, 'Poseidon': 6, 'Hermes': 1}
    10
    ```
    Caption: `השורה עם get היא תבנית שתחזור אלייך כל החיים: "קחי את מה שיש, ואם
    אין — קחי 0, ואז הוסיפי אחד." ככה סופרים דברים שעוד לא ראית.`

14. **callout · tip** — title: *גרשיים בתוך f-string* / *Quotes inside an f-string*
    כדי להדפיס ערך מתוך מילון בתוך f-string, הגרשיים הפנימיים חייבים להיות
    שונים מהחיצוניים:
    ```python
    offerings = {"Zeus": 3}
    print(f"Zeus has {offerings['Zeus']}")
    ```
    Output: `Zeus has 3`
    אם זה מרגיש צפוף — קחי את הערך למשתנה בשורה נפרדת קודם. שתי הדרכים נכונות,
    והשנייה קלה יותר לקריאה כשהקינון מעמיק.

15. **callout · myth** — title: *הפנקס של הרמס* / *The ledger of Hermes*
    הרמס הוא אל השליחים, הדרכים והסוחרים — ומי שמנהל דרכים חייב לנהל רישום.
    האולימפיים לא זוכרים בעל־פה מי חייב למי מה. הם פותחים את הפנקס, מסתכלים תחת
    השם, וסוגרים. שלושת אלפי שנה של ביורוקרטיה אלוהית, וזה בדיוק `dict`.

16. **code (runnable)** — the entries open. Since lesson 9 she has been carrying
    a list whose tiles she could count but not read. Every tile is a dict.
    ```python
    wave = get_wave()
    first = wave[0]
    print(first["kind"])
    print(first["hp"])
    print(first["armour"])
    print(first["flying"])
    ```
    Output on the practice field:
    ```
    satyr
    20
    0
    False
    ```
    Caption: `זה אותו get_wave משיעור 9. מה שהשתנה זה שעכשיו יש לך את המפתח:
    "kind", "hp", "armour", "flying". חמישה שדות, אותם שמות בכל מפלצת.`

17. **code (runnable)** — a dict whose values are the *answers*, not the facts.
    ```python
    counters = {"harpy": "archer", "hellhound": "cannon"}
    print(counters["harpy"])
    print(counters["hellhound"])
    ```
    Output:
    ```
    archer
    cannon
    ```
    Caption: `ולכן אפשר לכתוב place_tower(counters["harpy"], 3, 3) — הערך במילון
    הוא בדיוק המחרוזת שהפקודה מצפה לה. הטבלה מחליטה, לא את, ומחר אפשר לשנות שורה
    אחת בטבלה במקום לחפש שש קריאות בקוד.`

18. **error block** — the counter table that is missing a row. This is the exact
    error battle b3 opens with.
    ```python
    counters = {"harpy": "archer"}
    print(counters["satyr"])
    ```
    Real error (verified against the engine):
    ```
    KeyError: satyr (line 2)
    ```
    Explanation: הטבלה שלך יודעת מה עושים נגד הרפיה, ולא יודעת מה עושים נגד סאטיר.
    זה לא באג בקוד — זה **חור בטבלה**, והשאלה היחידה היא מה את רוצה שיקרה בחור
    הזה. שתי תשובות סבירות:
    - `counters[kind]` — כשאת בטוחה שכל סוג רשום. אם לא, שהתוכנית תעצור ותצעק.
    - `counters.get(kind, "archer")` — כשמותר שיהיו חורים, ויש לך ברירת מחדל
      הגיונית. קשת היא ברירת מחדל טובה: היא זולה, והיא פוגעת בכל דבר.
    בקרב, `KeyError` פירושו שאף מגדל לא נבנה — הקוד נעצר לפני שהגיע ל־place_tower
    הראשון. את רואה מחנה בלי הגנה, לא מגדל אחד חסר.

## Try It (ungraded)

The game words work here too, against a practice field, so `get_wave()` answers
and its entries can be opened.

```python
domains = {"Zeus": "sky", "Poseidon": "sea", "Hades": "underworld"}
print(domains["Zeus"])
domains["Artemis"] = "the hunt"
print(len(domains))
for name, domain in domains.items():
    print(f"{name} rules {domain}")
print(get_wave()[0]["kind"])
```

Intro: *"הפנקס שלך. הוסיפי אלים, שני ערכים, נסי `.get` עם מפתח שלא קיים. ונסי גם
`domains["zeus"]` עם ז' קטנה — כאן זה בטוח לגמרי, וכדאי שתראי את `KeyError` פעם
אחת בשקט לפני שתיפגשי בו באמצע משימה."*

## The battles

Four training battles and one great battle. Level schema:
`spec/09-battle-game.md`.

All five levels were run headless against the vendored engine: **each stated
solution wins its own battle, and an empty program loses every one of them.**

The through-line is the **table**. A list answered "how many" (lesson 9) and
"how much" (lesson 10). A dict answers "and what do I do about it": the counter
table turns a monster's kind into a tower's kind, the count table turns the wave
into numbers per kind, and the bestiary turns a name into armour. Each of the
three is a dict, and each of them decides a `place_tower` call.

### b1 — טבלת הנגד · The Counter Table · 20 XP, 5 🪙

**Why this mechanic** — a dict literal and a lookup by key, where the value **is
the argument**: `place_tower(counters["harpy"], 3, 3)`. Harpies fly and cannons
cannot reach them, so the table is not decoration — it is the difference between
a defense and four monsters walking over it.

**level**
```js
{
  map: { cols: 12, rows: 7, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4]] },
  gold: 280, campHp: 3, seed: 30, allowed: ["archer", "cannon"],
  waves: [
    { delay: 0, enemies: [{ kind: "harpy", count: 5, gap: 0.9 }] },
    { delay: 9, enemies: [{ kind: "hellhound", count: 4, gap: 1.2 }] },
  ],
}
```

**brief** — `שתי גלים: קודם הרפיות באוויר, אחר כך כלבי גיהינום על הקרקע.

בני טבלת נגד — מילון שבו המפתח הוא סוג המפלצת והערך הוא סוג המגדל שעונה עליה:
הרפיה → "archer", כלב גיהינום → "cannon".

שלפי מהטבלה את שתי התשובות והדפיסי אותן: `harpies need X` ו־`hellhounds need X`.

ואז בני ארבעה מגדלים בשורה 3, בעמודות 3, 5, 7 ו־9 — **בלי לכתוב את שם המגדל
בעצמך**. שלפי אותו מהטבלה: שניים לפי המפתח של ההרפיה, שניים לפי המפתח של הכלב.
הזהב מספיק בדיוק לשתי קשתות ולשני תותחים.`

**starter**
```python
counters = {"harpy": "archer"}
print(counters["harpy"])
place_tower(counters["harpy"], 3, 3)
```

**solution**
```python
counters = {"harpy": "archer", "hellhound": "cannon"}
for_harpy = counters["harpy"]
for_hellhound = counters["hellhound"]
print(f"harpies need {for_harpy}")
print(f"hellhounds need {for_hellhound}")
place_tower(counters["harpy"], 3, 3)
place_tower(counters["harpy"], 5, 3)
place_tower(counters["hellhound"], 7, 3)
place_tower(counters["hellhound"], 9, 3)
```

**check**
```js
{ kind: "battle",
  also: [
    { kind: "source", mustInclude: ["counters[", "place_tower(counters["],
      message: { he: "סוג המגדל צריך לצאת מהטבלה — place_tower(counters[...]) ולא מחרוזת שכתבת ביד",
                 en: "The tower kind must come out of the table — place_tower(counters[...]), not a string you typed" } },
    { kind: "output", mode: "contains", expect: "harpies need archer" }
  ] }
```

**hints**
1. `מה קורה לתותח כשהרפיה עוברת מעליו? ומה זה אומר על שני המגדלים הראשונים?`
2. `` מילון נכתב `{"מפתח": "ערך", "מפתח": "ערך"}`. `counters["harpy"]` מחזיר את
   המחרוזת `"archer"`, וזה בדיוק מה ש־`place_tower` רוצה בארגומנט הראשון. ``
3. `` שורה אחת למילון עם שני זוגות, ואז ארבע שורות בנייה:
   `place_tower(counters["harpy"], 3, 3)`, אותו דבר ב־5, ואז
   `place_tower(counters["hellhound"], 7, 3)` ו־9. שימי לב לגרשיים — המפתח הוא
   string, בדיוק כמו בשיעור 1. ``

### b2 — לספור את הגל · Counting the Wave · 25 XP, 7 🪙

**Why this mechanic** — `counts[kind] = counts.get(kind, 0) + 1`, the counting
pattern, running over `get_wave()`. The first time she meets a kind it is not in
the dict yet, so `[ ]` raises and `.get(kind, 0)` does not. The counts then
divide into tower numbers, and the gold covers exactly that.

**level**
```js
{
  map: { cols: 12, rows: 7, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4]] },
  gold: 370, campHp: 3, seed: 31, allowed: ["archer", "cannon"],
  waves: [
    { delay: 0, enemies: [{ kind: "satyr", count: 8, gap: 0.6 }] },
    { delay: 8, enemies: [{ kind: "hellhound", count: 6, gap: 1.0 }] },
  ],
}
```

**brief** — `אף אחד לא אומר לך הפעם כמה מכל סוג מגיעים. עברי על הגל ובני מילון
ספירה: מפתח = סוג, ערך = כמה כאלה.

הכלל של המחנה: **תותח אחד לכל שני כלבי גיהינום, קשת אחת לכל ארבעה סאטירים.**

הדפיסי את התוצאה בשתי שורות, `cannons: N` ו־`archers: N`.

התותחים בעמודות [2, 5, 8] בשורה 3, הקשתות בעמודות [0, 10] באותה שורה. בני בדיוק
כמה שהספירה אומרת — הזהב מספיק בדיוק לזה.`

**starter**
```python
wave = get_wave()
counts = {}
for m in wave:
    counts[m["kind"]] = counts.get(m["kind"], 0) + 1
print(counts)
```

**solution**
```python
wave = get_wave()
counts = {}
for m in wave:
    counts[m["kind"]] = counts.get(m["kind"], 0) + 1
print(counts)

cannons = counts["hellhound"] // 2
archers = counts["satyr"] // 4
print(f"hellhounds: {cannons * 2}")
print(f"cannons: {cannons}")
print(f"archers: {archers}")

ridge = [2, 5, 8]
for i in range(cannons):
    place_tower("cannon", ridge[i], 3)

watch = [0, 10]
for i in range(archers):
    place_tower("archer", watch[i], 3)
```

**check**
```js
{ kind: "battle",
  also: [
    { kind: "source", mustInclude: [".get(", "get_wave(", "counts["],
      message: { he: "הספירה חייבת לצאת מהגל עם התבנית get(מפתח, 0) + 1 — לא מספרים שכתבת ביד",
                 en: "The counts must come from the wave with the get(key, 0) + 1 pattern — not numbers typed by hand" } },
    { kind: "output", mode: "contains", expect: "cannons: 3" },
    { kind: "output", mode: "contains", expect: "archers: 2" }
  ] }
```

**hints**
1. `בסיבוב הראשון של הלולאה, האם המפתח "satyr" כבר קיים במילון? מה יקרה אם
   תבקשי אותו עם סוגריים מרובעים?`
2. `` `counts[m["kind"]] = counts.get(m["kind"], 0) + 1` היא כל הספירה בשורה
   אחת: קחי מה שיש, ואם אין — קחי 0, והוסיפי אחד. אחר כך `counts["hellhound"]`
   ו־`counts["satyr"]` הם מספרים רגילים. ``
3. `` שישה כלבים חלקי 2 זה שלושה תותחים; שמונה סאטירים חלקי 4 זה שתי קשתות.
   שתי לולאות בנייה נפרדות, `for i in range(cannons)` ו־`for i in range(archers)`,
   כל אחת עם רשימת המשבצות שלה. שלושה תותחים ושתי קשתות הם 370 בדיוק. ``

### b3 — המפתח שאינו שם · The Key That Is Not There · 30 XP, 8 🪙

**Why this mechanic** — a real `KeyError`, inside a battle, on purpose. The
starter is the scouts' plan written with `[ ]`, and it crashes on `"satyr"`
before a single tower is placed — so she watches the camp fall with no defense at
all. `.get(kind, "archer")` is the one-word repair, and the default it returns is
a real decision: the archer is cheap and hits everything.

**level**
```js
{
  map: {
    cols: 14, rows: 8,
    path: [[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[5,4],[5,3],[6,3],[7,3],[8,3],
           [8,4],[8,5],[9,5],[10,5],[11,5],[12,5],[13,5]],
    rock: [[2,1]],
  },
  gold: 330, campHp: 3, seed: 32, allowed: ["archer", "cannon"],
  waves: [
    { delay: 0,  enemies: [{ kind: "satyr", count: 6, gap: 0.7 }] },
    { delay: 8,  enemies: [{ kind: "harpy", count: 7, gap: 0.8 }] },
    { delay: 17, enemies: [{ kind: "hellhound", count: 6, gap: 0.9 }] },
    { delay: 27, enemies: [{ kind: "hellhound", count: 4, gap: 0.9 },
                           { kind: "cyclops", count: 2, gap: 1.5 }] },
  ],
}
```

**brief** — `הסיירת דיווחה חמישה גלים לפי הסדר, ולכל אחד מהם משבצת שמורה:

scouted = ["harpy", "hellhound", "satyr", "harpy", "cyclops"]
spots = [2, 4, 6, 9, 11]      # כולן בשורה 4

הקוד כבר כתוב, והוא נופל. הריצי אותו, קראי את השגיאה, ותקני אותה — בלי להוסיף
שורות לטבלה. הטבלה נכונה; **הדרך שבה שואלים אותה** היא מה שצריך להשתנות.

הוסיפי גם שורת הדפסה לכל סיבוב, בצורה `NAME -> TOWER`, כדי לראות מה הטבלה ענתה
על כל אחד מהחמישה.

הזהב מספיק בדיוק לבנייה שיוצאת מהטבלה המתוקנת.`

**starter** (deliberately broken — fixing it is the task; `brokenStarter: true`)
```python
counters = {"harpy": "archer", "hellhound": "cannon", "cyclops": "cannon"}
scouted = ["harpy", "hellhound", "satyr", "harpy", "cyclops"]
spots = [2, 4, 6, 9, 11]
for i in range(len(scouted)):
    kind = counters[scouted[i]]
    place_tower(kind, spots[i], 4)
```
Running it produces `KeyError: satyr (line 5)` and **no towers at all** — the
script stops on the third turn of the loop, before any `place_tower` for it runs,
and the two towers already placed are not enough to matter. She sees an empty
field, which is exactly what a crash costs in this game.

**solution**
```python
counters = {"harpy": "archer", "hellhound": "cannon", "cyclops": "cannon"}
scouted = ["harpy", "hellhound", "satyr", "harpy", "cyclops"]
spots = [2, 4, 6, 9, 11]
for i in range(len(scouted)):
    kind = counters.get(scouted[i], "archer")
    print(f"{scouted[i]} -> {kind}")
    place_tower(kind, spots[i], 4)
```

**check**
```js
{ kind: "battle",
  also: [
    { kind: "source", mustInclude: [".get(", "counters"],
      message: { he: "התיקון הוא .get עם ברירת מחדל — לא להוסיף שורה לטבלה ולא לכתוב את הסוגים ביד",
                 en: "The repair is .get with a default — not a new row in the table, and not typing the kinds by hand" } },
    { kind: "output", mode: "contains", expect: "satyr -> archer" }
  ] }
```

**hints**
1. `הריצי. השגיאה נותנת לך מפתח ומספר שורה. חפשי את המפתח הזה בטבלה — הוא שם?`
2. `` `counters.get(scouted[i], "archer")` מחזיר את הערך אם המפתח קיים, ואת
   `"archer"` אם לא — בלי לעצור את התוכנית. ``
3. `` שינוי של שלוש מילים בשורה אחת: `counters[scouted[i]]` הופך ל־
   `counters.get(scouted[i], "archer")`, ועוד שורת print עם `{scouted[i]} -> {kind}`.
   התוצאה: קשת, תותח, קשת (ברירת המחדל לסאטיר), קשת, תותח — שלוש קשתות ושני
   תותחים, 330 בדיוק. אפשר היה גם להוסיף `"satyr": "archer"` לטבלה, וזה פתרון
   נכון לגמרי בפייתון — אבל השלב הזה דורש `.get`, כי בקרב הבא הסיירת תדווח על
   סוג שעוד לא ראית, ואז ברירת המחדל היא מה שמחזיק. ``

### b4 — המרשם · The Bestiary · 30 XP, 8 🪙

**Why this mechanic** — she builds the dict herself, out of the wave, instead of
being handed one: `bestiary[kind] = armour`. Then `.items()` reads it back as a
report, and the two counts it produces — armoured and airborne — decide the two
halves of the build. It is lesson 11's whole toolkit in one program, and no
number in it was typed by a human.

**level**
```js
{
  map: {
    cols: 14, rows: 8,
    path: [[0,3],[1,3],[2,3],[3,3],[3,4],[3,5],[4,5],[5,5],[6,5],[6,4],[6,3],
           [7,3],[8,3],[9,3],[9,4],[9,5],[10,5],[11,5],[12,5],[13,5]],
    rock: [[12,1]],
  },
  gold: 420, campHp: 3, seed: 33, allowed: ["archer", "cannon"],
  waves: [
    { delay: 0,  enemies: [{ kind: "satyr", count: 6, gap: 0.6 }] },
    { delay: 7,  enemies: [{ kind: "hellhound", count: 6, gap: 0.9 }] },
    { delay: 20, enemies: [{ kind: "cyclops", count: 3, gap: 1.4 }] },
    { delay: 32, enemies: [{ kind: "harpy", count: 6, gap: 0.8 }] },
  ],
}
```

**brief** — ``הרמס נותן לך פנקס ריק ואומר: תמלאי אותו בעצמך.

1. עברי על הגל ובני מרשם: מפתח = סוג המפלצת, ערך = השריון שלה (`m["armour"]`).
2. הדפיסי את המרשם שורה־שורה עם `.items()`.
3. ספרי שני דברים והדפיסי אותם בצורה `armoured: N` ו־`flyers: N`: כמה מפלצות עם
   שריון 2 ומעלה, וכמה מפלצות מעופפות (`m["flying"]`).
4. הכלל: **תותח אחד לכל שלוש משוריינות, קשת אחת לכל שתי מעופפות.** התותחים
   בעמודות [3, 6, 9] בשורה 2, הקשתות בעמודות [1, 5, 8] באותה שורה.

הזהב מספיק בדיוק לתוצאה של החשבון הזה.``

**starter**
```python
wave = get_wave()
bestiary = {}
for m in wave:
    bestiary[m["kind"]] = m["armour"]
for kind, value in bestiary.items():
    print(f"{kind}: armour {value}")
```

**solution**
```python
wave = get_wave()
bestiary = {}
for m in wave:
    bestiary[m["kind"]] = m["armour"]
for kind, value in bestiary.items():
    print(f"{kind}: armour {value}")

armoured = 0
flyers = 0
for m in wave:
    if bestiary[m["kind"]] >= 2:
        armoured = armoured + 1
    if m["flying"]:
        flyers = flyers + 1
print(f"armoured: {armoured}")
print(f"flyers: {flyers}")

ridge = [3, 6, 9]
for i in range(armoured // 3):
    place_tower("cannon", ridge[i], 2)

watch = [1, 5, 8]
for i in range(flyers // 2):
    place_tower("archer", watch[i], 2)
```

**check**
```js
{ kind: "battle",
  also: [
    { kind: "source", mustInclude: [".items()", "bestiary[", "get_wave("],
      message: { he: "המרשם צריך להיבנות מהגל ולהיקרא עם .items() — לא להיכתב ביד",
                 en: "The bestiary must be built from the wave and read back with .items() — not typed by hand" } },
    { kind: "output", mode: "contains", expect: "armoured: 9" },
    { kind: "output", mode: "contains", expect: "flyers: 6" }
  ] }
```

**hints**
1. `שישה כלבים, שלושה קיקלופים ושש הרפיות. איזו מהן השאלה "שריון 2 ומעלה" תופסת,
   ואיזו היא מפספסת לגמרי?`
2. `` בניית המרשם: `bestiary[m["kind"]] = m["armour"]` בתוך לולאה על הגל — כל סוג
   נכתב שוב ושוב עם אותו ערך, וזה בסדר, כי מפתח במילון הוא ייחודי. הקריאה חזרה:
   `for kind, value in bestiary.items():` נותן שם וערך יחד. ``
3. `` תשע משוריינות חלקי 3 זה שלושה תותחים; שש מעופפות חלקי 2 זה שלוש קשתות —
   420 בדיוק. שני accumulators נפרדים לפני הלולאה, שני `if` בתוכה (בלי `elif`,
   כי מפלצת יכולה להיספר רק באחד מהם ממילא), ושתי לולאות בנייה אחריה. ``

## The great battle — פנקס הרמס · The Ledger of Hermes · 55 XP, 14 🪙

**Why this mechanic** — three dicts, three different jobs, in one program: a
**count** table built from the wave with `.get(k, 0) + 1`, a **counter** table
read with `.get(k, default)` because `"satyr"` is deliberately not in it, and a
**catalogue** built from `tower_cost()` so the plan can be priced before it is
built. `.items()` prints the whole ledger, and the values of the counter table
are the arguments to `place_tower`.

**level**
```js
{
  map: {
    cols: 16, rows: 9,
    path: [[0,2],[1,2],[2,2],[3,2],[3,3],[3,4],[4,4],[5,4],[6,4],[6,5],[6,6],
           [7,6],[8,6],[9,6],[9,5],[9,4],[10,4],[11,4],[12,4],[12,3],[12,2],
           [13,2],[14,2],[15,2]],
    rock: [[5,7],[14,6]],
  },
  gold: 530, campHp: 3, seed: 34, allowed: ["archer", "cannon", "ice"],
  waves: [
    { delay: 0,  enemies: [{ kind: "satyr", count: 10, gap: 0.5 }] },
    { delay: 9,  enemies: [{ kind: "hellhound", count: 8, gap: 0.7 }] },
    { delay: 20, enemies: [{ kind: "harpy", count: 10, gap: 0.5 }] },
    { delay: 30, enemies: [{ kind: "hellhound", count: 8, gap: 0.6 },
                           { kind: "cyclops", count: 5, gap: 1.0 }] },
  ],
}
```

**brief** — `הרמס פותח את הפנקס ומחכה.

1. ספרי את הגל למילון ספירה, ואז הדפיסי שורה לכל סוג בצורה
   NAME xN -> TOWER — כשה־TOWER בא מטבלת הנגד. שימי לב: סוג אחד בגל לא רשום
   בטבלה בכלל, והדוח חייב לשרוד אותו.
2. בני קטלוג מחירים מ־tower_cost, והדפיסי כמה יעלה כל קו לפני שאת בונה אותו.
3. קו הרכס — ridge = [1, 4, 5, 8, 10, 11, 14] בשורה 3 — מקבל את המגדל שעונה
   על **הרפיות**. המעבר — ford = [7, 9] בשורה 7 — מקבל את המגדל שעונה על **כלבי
   גיהינום**. את שני הסוגים שלפי מהטבלה, לא מהזיכרון.

שבעה על הרכס ושניים במעבר, וזה בדיוק כל הזהב.`

**starter**
```python
wave = get_wave()
counters = {"harpy": "archer", "hellhound": "cannon", "cyclops": "cannon"}
catalogue = {"archer": tower_cost("archer"), "cannon": tower_cost("cannon")}
print(catalogue["archer"])
```

**solution**
```python
wave = get_wave()

counts = {}
for m in wave:
    counts[m["kind"]] = counts.get(m["kind"], 0) + 1

counters = {"harpy": "archer", "hellhound": "cannon", "cyclops": "cannon"}
catalogue = {"archer": tower_cost("archer"), "cannon": tower_cost("cannon"), "ice": tower_cost("ice")}

for kind, n in counts.items():
    answer = counters.get(kind, "archer")
    print(f"{kind} x{n} -> {answer}")

ridge = [1, 4, 5, 8, 10, 11, 14]
ridge_kind = counters["harpy"]
print(catalogue[ridge_kind] * len(ridge))
for x in ridge:
    place_tower(ridge_kind, x, 3)

ford = [7, 9]
ford_kind = counters["hellhound"]
print(catalogue[ford_kind] * len(ford))
for x in ford:
    place_tower(ford_kind, x, 7)

print(get_gold())
```

**check**
```js
{ kind: "battle",
  also: [
    { kind: "source", mustInclude: [".get(", ".items()", "catalogue[", "counters["],
      message: { he: "הקרב הזה דורש את שלושת הפנקסים: ספירה עם .get, דוח עם .items, ומחירים מהקטלוג",
                 en: "This battle needs all three ledgers: counting with .get, the report with .items, and prices from the catalogue" } },
    { kind: "output", mode: "contains", expect: "harpy x10 -> archer" },
    { kind: "output", mode: "contains", expect: "satyr x10 -> archer" }
  ] }
```

**hints**
1. `סוג אחד מהארבעה בגל לא רשום בטבלת הנגד. באיזו שורה בדוח התוכנית תיפול, ומה
   יקרה לכל הבנייה שאחריה?`
2. `` שלוש שורות נושאות את כל הקרב: `counts[m["kind"]] = counts.get(m["kind"], 0) + 1`
   לספירה, `counters.get(kind, "archer")` לדוח, ו־`counters["harpy"]` שנשמר
   במשתנה ומועבר ל־`place_tower` שבע פעמים. ``
3. `` סדר העבודה: ספירה בלולאה → הגדרת `counters` ו־`catalogue` → לולאת
   `.items()` שמדפיסה `{kind} x{n} -> {answer}` → `ridge_kind = counters["harpy"]`
   והדפסת `catalogue[ridge_kind] * len(ridge)` → לולאה שבונה שבעה בשורה 3 →
   אותו הדבר למעבר עם `counters["hellhound"]` בשורה 7. שבע קשתות (350) ושני
   תותחים (180) הם 530 — `get_gold()` בסוף יראה 0. ``

## Reward & Recap

**Item**: 🗝️ **מפתח הרמס / Hermes' Key** — `מפתח קטן שפותח דלת אחת בדיוק. הרמס
נתן לך אותו כשהבנת שזה כל הרעיון: כל מפתח והדלת שלו.` (Also adds bead #11 to the
camp necklace.)

**Achievements possible here**:
- *Key Holder* — win the great battle with no crash on any run.
- *Debugger* — hit b3's `KeyError`, repair it with `.get`, and win that battle.
- *Registrar* — finish every battle in the lesson with zero hints.

**Recap bullets**:
- מילון (`dict`) שומר זוגות של מפתח וערך בתוך `{ }`, בצורה `"key": value`
- `d["key"]` שולף, `d["key"] = value` מוסיף **או** מעדכן — אותה שורה בדיוק
- `KeyError` אומר שהמפתח לא קיים; אות גדולה ואות קטנה הן מפתחות שונים
- `d.get(key, default)` שואל בלי לקרוס, ו־`d.get(key, 0) + 1` היא תבנית הספירה
- `in` על מילון בודק **מפתחות**; לערכים צריך `d.values()`
- `for k, v in d.items()` נותן שם וערך יחד; לולאה על המילון עצמה נותנת מפתחות בלבד
- כל תא ב־`get_wave()` הוא מילון: `m["kind"]`, `m["hp"]`, `m["armour"]`, `m["flying"]`
- טבלת נגד היא מילון שהערך שלו הוא ארגומנט: `place_tower(counters[kind], x, y)`

**Next teaser**: *"יש לך מגילה ויש לך פנקס. אבל מה קורה כשערך בתוך הפנקס הוא בעצמו
פנקס שלם? בשיעור הבא זה בדיוק מה שיעלה מהמים — ולכל ראש שלו יש רשומה משלו."*

## Common mistakes to anticipate

| She does | She sees | Hint must cover |
| --- | --- | --- |
| `domains["zeus"]` | `KeyError: zeus (line 2)` | keys are case-sensitive; `"zeus"` ≠ `"Zeus"` |
| `domains["sea"]` | `KeyError: sea (line 2)` | that is a value, not a key |
| `domains[0]` | `KeyError: 0 (line 2)` | a dict has no positions — the name *is* the address |
| `d = {"Zeus" = "sky"}` | `SyntaxError: bad input (line 1)` | inside `{}` the separator is `:`, not `=` |
| `for name, domain in domains:` | `ValueError: too many values to unpack (expected 2) (line 2)` | `.items()` is what yields pairs |
| `d["Hermes"] = d["Hermes"] + 1` on a missing key | `KeyError: Hermes` | `d.get("Hermes", 0) + 1` is the counting pattern |
| `domains.get["Zeus"]` | `TypeError: 'builtin_function_or_method' does not support indexing (line 2)` | `.get` is *called* with `( )`, never indexed with `[ ]` |
| `"sky" in domains` expecting `True` | `False`, with no error at all | the quietest bug here — `in` reads keys |
| `d = {}` then `print(d["a"])` | `KeyError: a (line 2)` | an empty dict has no keys yet; `len(d)` is `0` |
| `counters[kind]` on a kind the table lacks | `KeyError: satyr (line 5)` **and an empty battlefield** | a crash costs every tower, not one; `.get(kind, "archer")` |
| `counts[kind] = counts[kind] + 1` on first sight | `KeyError` on the very first monster | the counting pattern is `.get(kind, 0) + 1` |
| `m["Kind"]` | `KeyError: Kind` | the wave's keys are lowercase: `kind`, `hp`, `speed`, `armour`, `flying` |
| a cannon aimed at the harpy line | *"it cannot hit anything airborne"*, and the wave walks through | the counter table exists because of exactly this |

## Implementation notes

- Every code sample and every solution here was executed against the vendored
  `skulpt.min.js`, and **every level was simulated headless**: each solution wins
  its own battle and an empty program loses all five. Verified: dict literals,
  `d[k]` read and write, `len(d)`, `.get(k)` and `.get(k, default)`, `in` on a
  dict, `.keys()`, `.values()`, `.items()`, `sum(d.values())`, nested quotes
  inside an f-string (`f"{d['Zeus']}"`), and reading a `get_wave()` entry with
  `m["kind"]` / `m["armour"]` / `m["flying"]`.
- **Dict ordering was verified**: this build of Skulpt preserves insertion order
  for printing, `.keys()`, `.values()` and `.items()`, matching CPython 3.7+.
  **No level relies on it.** `.items()` is used only for printed reports, which
  nothing grades; every build order comes from an explicit list (`ridge`, `ford`,
  `scouted`, `spots`). **Rule, unchanged: never assert the printed form of a whole
  dict in a `check`** — and, in the battle model, never let the *outcome* depend
  on dict iteration order either.
- **Every level pairs the battle with an `also` array**: a `source` rule for the
  dict operation and an `output` rule (`mode: "contains"`) for something only the
  tables can produce — `harpies need archer`, `cannons: 3`, `satyr -> archer`,
  `harpy x10 -> archer`. Note what b3's rule asserts: the line the *default*
  produced. Adding `"satyr": "archer"` to the table is a perfectly good repair in
  real Python and produces the same line — but b3's `source` rule requires
  `.get(` anyway, because `.get` is the tool this lesson teaches and the next
  scouting report will name a kind nobody listed. Hint 3 says exactly that, so
  the requirement is never a silent trap.
- **The output rules never assert a printed dict.** `print(counts)` appears in
  b2's solution because it is genuinely useful to look at, but nothing grades it;
  every graded line is a single derived value. This is the lesson 11 rule applied
  to the battle model.
- b3 is the only level in the act with `brokenStarter: true`. `verify-python.mjs`
  skips the "starter runs" assertion for it, which is the point: the starter is
  supposed to raise.
- **A `source` check reads a skeleton with string literals stripped**, so a
  requirement that appears only inside an f-string is invisible. The great
  battle's `.get(` therefore appears in the counting line as well as in the
  report line.
- Every level's `gold` is exactly the cost of the intended build, so the counts
  the dicts produce are enforced in both directions: too few leaks, too many
  raises a `tooPoor` build error and loses the level with the camp untouched.
- The page renders an error as `Type: message (line N)` — so a `KeyError` on a
  missing key reads `KeyError: Hera (line 2)`, and that is the exact string an
  `error` teach block must declare. CPython 3 renders `KeyError: 'Hera'` with
  quotes; Skulpt drops them. Show the engine's text — that is what appears on her
  screen — and mention the difference in one sentence, following the honesty
  policy in `01-architecture.md`. `verify-python.mjs` fails the build on drift
  here, so do not paraphrase.
- All output rules use `mode: "contains"` on a single derived line, so a learner
  who prints extra diagnostics of her own is never punished for it.
- **No `source` rule in this act needs `raw: true`.** Every one of them targets
  syntax that survives the skeleton — `.get(`, `.items()`, `counters[`,
  `bestiary[`, `place_tower(counters[` — rather than a string literal. If a
  future level ever needs to require a literal (a monster's name, a printed
  word), that rule must set `raw: true` or it can never pass; and a required
  construct that appears *only* inside an f-string is invisible to the checker,
  which is why b1's solution takes the two table lookups into variables before
  printing them.
- No `input()` in this lesson — `check.stdin` exists on battle levels, but a
  pre-battle build script has nobody to ask. Nothing here uses `del`, dict
  comprehensions, or `.pop()` — all of them are outside the curriculum at this
  point.
