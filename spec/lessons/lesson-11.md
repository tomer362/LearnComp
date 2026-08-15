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
| **XP** | 20 + 25 + 25 + 30 (training) + 55 (quest) + 30 (bonus) = **185** |
| **drachmas** | 5 + 7 + 7 + 8 + 14 = **41** 🪙 |

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

Lesson 10's quest ended with two parallel lists (`inventory` and `weights`)
that stayed aligned only because nothing got reordered. This lesson opens by
breaking exactly that, then fixing it.

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
   Real error (verified in Skulpt):
   ```
   KeyError: Hera on line 2
   ```
   Explanation: `KeyError` אומר דבר אחד: **המפתח הזה לא קיים בפנקס.** שימי לב
   כמה זה שונה מ־`IndexError` משיעור 9 — שם ספרת לא נכון, כאן ביקשת שם שלא
   רשום. שלוש הסיבות הנפוצות, לפי הסדר:
   - שגיאת כתיב — `"Posiedon"`
   - אות גדולה מול קטנה — `"zeus"` הוא **לא** `"Zeus"` בעיני פייתון
   - המפתח באמת לא שם, וזה מידע — לא תקלה
   גרובר גילה את השנייה בדרך הקשה. שאלת את `"zeus"`, קיבלת שגיאה, ואז גשם.
   In CPython the same line prints `KeyError: 'Hera'` with quotes; Skulpt drops
   them. Show Skulpt's text — it is what she sees — and say so in one line.

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
    Real error (verified in Skulpt):
    ```
    ValueError: too many values to unpack (expected 2) on line 2
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

## Try It (ungraded)

```python
domains = {"Zeus": "sky", "Poseidon": "sea", "Hades": "underworld"}
print(domains["Zeus"])
domains["Artemis"] = "the hunt"
print(len(domains))
for name, domain in domains.items():
    print(f"{name} rules {domain}")
```

Intro: *"הפנקס שלך. הוסיפי אלים, שני ערכים, נסי `.get` עם מפתח שלא קיים. ונסי גם
`domains["zeus"]` עם ז' קטנה — כאן זה בטוח לגמרי, וכדאי שתראי את `KeyError` פעם
אחת בשקט לפני שתיפגשי בו באמצע משימה."*

## Training exercises

### e1 — Open the ledger · 20 XP, 5 🪙

**brief** — `בפנקס רשום רק זאוס. הוסיפי לו את פוסידון (sea) ואת האדס
(underworld) כך שהמילון ייבנה בשורה אחת, ואז הדפיסי את התחום של זאוס, את התחום
של האדס, ואת מספר האלים בפנקס.`

**starter**
```python
domains = {"Zeus": "sky"}
# add Poseidon -> sea and Hades -> underworld to the dict above
# then print Zeus's domain, Hades's domain, and how many gods are registered
```

**solution**
```python
domains = {"Zeus": "sky", "Poseidon": "sea", "Hades": "underworld"}
print(domains["Zeus"])
print(domains["Hades"])
print(f"Gods in the registry: {len(domains)}")
```

Expected output:
```
sky
underworld
Gods in the registry: 3
```

**check**
```js
{ kind: "output", mode: "normalized",
  expect: "sky\nunderworld\nGods in the registry: 3" }
```
plus
```js
{ kind: "source", mustInclude: ["Poseidon", "len("],
  message: { he: "פוסידון חייב להיות רשום בפנקס, והמספר חייב לבוא מ־len",
             en: "Poseidon must be in the registry, and the count must come from len" } }
```

**hints**
1. `כל זוג בפנקס נראה אותו דבר: שם, נקודתיים, תחום. מה מפריד בין זוג לזוג?`
2. `` בתוך הסוגריים המסולסלים: `"Poseidon": "sea"`, פסיק, `"Hades": "underworld"`.
   השליפה נעשית עם `domains["Zeus"]`. ``
3. `` שורה 1: המילון עם שלושה זוגות, מופרדים בפסיקים. שורה 2: print(domains["Zeus"]).
   שורה 3: print(domains["Hades"]). שורה 4: f-string עם {len(domains)}. ``

### e2 — Offerings at the altar · 25 XP, 7 🪙

**brief** — `הרמס מעדכן את הפנקס. הוסיפי את הרמס עם 4 מנחות, והוסיפי 2 מנחות
למה שכבר יש לפוסידון. אחר כך הדפיסי את המצב של פוסידון, את המצב של הרמס, וכמה
אלים רשומים.`

**starter**
```python
offerings = {"Zeus": 3, "Poseidon": 5, "Athena": 2}
# add Hermes with 4
# add 2 more to whatever Poseidon already has
# then print the three report lines
```

**solution**
```python
offerings = {"Zeus": 3, "Poseidon": 5, "Athena": 2}
offerings["Hermes"] = 4
offerings["Poseidon"] = offerings["Poseidon"] + 2
print(f"Poseidon: {offerings['Poseidon']}")
print(f"Hermes: {offerings['Hermes']}")
print(f"Gods on the list: {len(offerings)}")
```

Expected output:
```
Poseidon: 7
Hermes: 4
Gods on the list: 4
```

**check**
```js
{ kind: "output", mode: "normalized",
  expect: "Poseidon: 7\nHermes: 4\nGods on the list: 4" }
```
plus
```js
{ kind: "source", mustExclude: ["\"Poseidon\": 7", "'Poseidon': 7"],
  message: { he: "המספר 7 צריך להיווצר מחישוב — 5 ועוד 2 — ולא להיכתב לתוך המילון",
             en: "The 7 must be computed — 5 plus 2 — not written into the dict" } }
```

**hints**
1. `להוסיף 2 למשהו שכבר קיים דורש קודם לקרוא אותו. איך את קוראת ערך מהפנקס?`
2. `` `offerings["Poseidon"]` שולף את 5. `offerings["Poseidon"] = ... + 2` כותב
   חזרה. אותה תבנית של accumulator משיעור 7, רק שהמשתנה יושב בתוך מילון. ``
3. `` הוספת הרמס היא שורה אחת: `offerings["Hermes"] = 4` — מפתח שלא קיים נוצר
   מיד. עדכון פוסידון:
   `offerings["Poseidon"] = offerings["Poseidon"] + 2`. שימי לב לגרשיים
   בתוך ה־f-string: חיצוניים כפולים, פנימיים בודדים. ``

### e3 — The safe question · 25 XP, 7 🪙

**brief** — `ארבעה שמות מבקשים לעבור בשער, ורק חלק מהם רשומים. הדפיסי שורה לכל
שם — התחום שלו אם הוא רשום, והודעה מתאימה אם לא. התוכנית חייבת לרוץ עד הסוף בלי
לקרוס.`

**starter**
```python
domains = {"Zeus": "sky", "Poseidon": "sea", "Hades": "underworld"}
asking = ["Poseidon", "Hera", "Hades", "Janus"]
# for each name in asking, print:  NAME -> domain
# a name that is not registered gets:  NAME -> not in the registry
```

**solution**
```python
domains = {"Zeus": "sky", "Poseidon": "sea", "Hades": "underworld"}
asking = ["Poseidon", "Hera", "Hades", "Janus"]
for name in asking:
    domain = domains.get(name, "not in the registry")
    print(f"{name} -> {domain}")
```

Expected output:
```
Poseidon -> sea
Hera -> not in the registry
Hades -> underworld
Janus -> not in the registry
```

**check**
```js
{ kind: "output", mode: "normalized",
  expect: "Poseidon -> sea\nHera -> not in the registry\nHades -> underworld\nJanus -> not in the registry" }
```
plus
```js
{ kind: "source", mustInclude: [".get("],
  message: { he: "המשימה הזאת דורשת .get — הפנקס לא אמור לקרוס על שם שלא רשום",
             en: "This one needs .get — the ledger must not crash on an unregistered name" } }
```

**hints**
1. `` אם תכתבי `domains["Hera"]` — מה יקרה לשורות שאחריה? התוכנית תמשיך? ``
2. `` `.get(name, "not in the registry")` מחזיר את הערך אם הוא קיים, ואת הטקסט
   השני אם לא — בלי שגיאה ובלי `if`. ``
3. `` לולאת for על `asking`. בתוכה שורה אחת ששומרת את התוצאה של
   `domains.get(name, "not in the registry")` במשתנה, ואז print עם f-string
   שמדפיס `{name} -> {domain}`. פתרון עם `if name in domains` גם עובד, אבל
   ה־check דורש את `.get` — כי זה הכלי שהשיעור מלמד. ``

### e4 — Reading the whole ledger · 30 XP, 8 🪙

**brief** — `הרמס רוצה סיכום של הפנקס כולו: כמה מנחות יש בסך הכול, לכמה אלים אין
אף מנחה, ומי הכי נדיב אליו — עם המספר שלו בסוגריים. עברי על כל הפנקס בלולאה אחת.`

**starter**
```python
offerings = {"Zeus": 3, "Poseidon": 7, "Athena": 2, "Hermes": 4, "Ares": 0}
# Total offerings: ?
# Gods with nothing: ?
# Most generous: NAME (COUNT)
```

**solution**
```python
offerings = {"Zeus": 3, "Poseidon": 7, "Athena": 2, "Hermes": 4, "Ares": 0}
total = 0
empty = 0
best_name = ""
best_count = -1
for name, count in offerings.items():
    total = total + count
    if count == 0:
        empty = empty + 1
    if count > best_count:
        best_count = count
        best_name = name
print(f"Total offerings: {total}")
print(f"Gods with nothing: {empty}")
print(f"Most generous: {best_name} ({best_count})")
```

Expected output:
```
Total offerings: 16
Gods with nothing: 1
Most generous: Poseidon (7)
```

**check**
```js
{ kind: "output", mode: "normalized",
  expect: "Total offerings: 16\nGods with nothing: 1\nMost generous: Poseidon (7)" }
```
plus
```js
{ kind: "source", mustInclude: [".items()"],
  message: { he: "הסיכום חייב לעבור על הפנקס עם .items() — שם וערך יחד",
             en: "The summary must walk the ledger with .items() — name and value together" } }
```

**hints**
1. `שלוש התשובות מגיעות מאותה נסיעה על הפנקס. כמה לולאות באמת צריך פה?`
2. `` `for name, count in offerings.items():` נותן לך בכל סיבוב שם ומספר. שלושה
   משתנים נפרדים לפני הלולאה יאספו את שלוש התשובות — בדיוק כמו accumulator
   משיעור 7, רק שלושה במקביל. ``
3. `` לפני הלולאה: total = 0, empty = 0, best_name = "", best_count = -1.
   בתוך הלולאה: total מתעדכן תמיד; empty עולה כשהמספר 0; ואם count גדול
   מ־best_count — שני משתני ה־best מתעדכנים יחד. אחרי הלולאה, מחוץ להזחה, שלוש
   שורות print. ``

## Quest — "The Ledger of Hermes" · פנקס הרמס · 55 XP, 14 🪙

**brief** — `ארבע בקשות מגיעות לשער, בסדר שהן רשומות. לכל בקשה: מצאי את התחום של
האל בפנקס (ואם הוא לא רשום — "unknown"), הוסיפי לו מנחה אחת לספירת המנחות (גם
אם עוד לא הייתה לו אף אחת), והדפיסי שורה אחת. בסוף — שלוש שורות סיכום. שום שם
לא רשאי להפיל את התוכנית.`

**starter**
```python
domains = {"Zeus": "sky", "Poseidon": "sea", "Athena": "wisdom", "Hermes": "roads"}
offerings = {"Zeus": 3, "Poseidon": 7, "Athena": 2}
petitions = ["Poseidon", "Athena", "Hermes", "Hera"]

# === LEDGER OF HERMES ===
# NAME | DOMAIN | offerings: N       <- one line per petition, in order
# Gods in the registry: ?            <- how many are in domains
# Gods with offerings: ?             <- how many are in offerings, after the updates
# Total offerings: ?
```

**solution**
```python
domains = {"Zeus": "sky", "Poseidon": "sea", "Athena": "wisdom", "Hermes": "roads"}
offerings = {"Zeus": 3, "Poseidon": 7, "Athena": 2}
petitions = ["Poseidon", "Athena", "Hermes", "Hera"]

print("=== LEDGER OF HERMES ===")
for name in petitions:
    domain = domains.get(name, "unknown")
    count = offerings.get(name, 0) + 1
    offerings[name] = count
    print(f"{name} | {domain} | offerings: {count}")

total = 0
for count in offerings.values():
    total = total + count
print(f"Gods in the registry: {len(domains)}")
print(f"Gods with offerings: {len(offerings)}")
print(f"Total offerings: {total}")
```

Expected output (verified in Skulpt):
```
=== LEDGER OF HERMES ===
Poseidon | sea | offerings: 8
Athena | wisdom | offerings: 3
Hermes | roads | offerings: 1
Hera | unknown | offerings: 1
Gods in the registry: 4
Gods with offerings: 5
Total offerings: 16
```

**check**
```js
{ kind: "output", mode: "normalized",
  expect: "=== LEDGER OF HERMES ===\nPoseidon | sea | offerings: 8\nAthena | wisdom | offerings: 3\nHermes | roads | offerings: 1\nHera | unknown | offerings: 1\nGods in the registry: 4\nGods with offerings: 5\nTotal offerings: 16" }
```
plus
```js
{ kind: "source", mustInclude: [".get("],
  message: { he: "שני מפתחות חסרים בפנקס — הרמס במנחות והרה לגמרי. בלי .get התוכנית תיפול",
             en: "Two keys are missing — Hermes in offerings, Hera entirely. Without .get this crashes" } }
```

Why this quest: it forces **both** faces of `.get()` in one program. `Hermes` is
in `domains` but missing from `offerings`, so `.get(name, 0) + 1` is the only
way to count him without a crash. `Hera` is missing from both, so
`.get(name, "unknown")` covers the other side. And the two summary counts differ
(4 vs 5) precisely because `Hera` was added while looping — which shows her, in
one number, that a dict grew under her hands.

**hints**
1. `שני שמות בבקשות לא נמצאים במקום שאת מחפשת אותם. אם תשתמשי בסוגריים
   מרובעים — באיזו שורה בדיוק התוכנית תיעצר?`
2. `` `domains.get(name, "unknown")` פותר את התחום החסר, ו־`offerings.get(name, 0) + 1`
   פותר את הספירה החסרה. אחרי שחישבת את הספירה, שימי אותה חזרה:
   `offerings[name] = count`. ``
3. `` סדר העבודה: כותרת → לולאה על `petitions`, ובתוכה שלוש שורות (תחום עם get,
   ספירה עם get ועוד 1, כתיבה חזרה למילון) ואז ה־print עם התו `|` בין החלקים.
   אחרי הלולאה: משתנה total שמתחיל ב־0 ולולאה על `offerings.values()` שמחברת
   הכול, ואז שלוש שורות סיכום. `sum(offerings.values())` גם עובד ונותן את אותה
   התשובה. ``

## Reward & Recap

**Item**: 🗝️ **מפתח הרמס / Hermes' Key** — `מפתח קטן שפותח דלת אחת בדיוק. הרמס
נתן לך אותו כשהבנת שזה כל הרעיון: כל מפתח והדלת שלו.` (Also adds bead #11 to the
camp necklace.)

**Achievements possible here**:
- *Key Holder* — finish the quest with no crash on any run.
- *Debugger* — hit a `KeyError`, fix it, and pass the same exercise.
- *Registrar* — finish every exercise in the lesson with zero hints.

**Recap bullets**:
- מילון (`dict`) שומר זוגות של מפתח וערך בתוך `{ }`, בצורה `"key": value`
- `d["key"]` שולף, `d["key"] = value` מוסיף **או** מעדכן — אותה שורה בדיוק
- `KeyError` אומר שהמפתח לא קיים; אות גדולה ואות קטנה הן מפתחות שונים
- `d.get(key, default)` שואל בלי לקרוס, ו־`d.get(key, 0) + 1` היא תבנית הספירה
- `in` על מילון בודק **מפתחות**; לערכים צריך `d.values()`
- `for k, v in d.items()` נותן שם וערך יחד; לולאה על המילון עצמה נותנת מפתחות בלבד

**Next teaser**: *"יש לך מגילה ויש לך פנקס. אבל מה קורה כשערך בתוך הפנקס הוא בעצמו
פנקס שלם? בשיעור הבא זה בדיוק מה שיעלה מהמים — ולכל ראש שלו יש רשומה משלו."*

## Common mistakes to anticipate

| She does | She sees | Hint must cover |
| --- | --- | --- |
| `domains["zeus"]` | `KeyError: zeus on line 2` | keys are case-sensitive; `"zeus"` ≠ `"Zeus"` |
| `domains["sea"]` | `KeyError: sea on line 2` | that is a value, not a key |
| `domains[0]` | `KeyError: 0 on line 2` | a dict has no positions — the name *is* the address |
| `d = {"Zeus" = "sky"}` | `SyntaxError: bad input on line 1` | inside `{}` the separator is `:`, not `=` |
| `for name, domain in domains:` | `ValueError: too many values to unpack (expected 2) on line 2` | `.items()` is what yields pairs |
| `d["Hermes"] = d["Hermes"] + 1` on a missing key | `KeyError: Hermes` | `d.get("Hermes", 0) + 1` is the counting pattern |
| `domains.get["Zeus"]` | `TypeError: 'builtin_function_or_method' does not support indexing on line 2` | `.get` is *called* with `( )`, never indexed with `[ ]` |
| `"sky" in domains` expecting `True` | `False`, with no error at all | the quietest bug here — `in` reads keys |
| `d = {}` then `print(d["a"])` | `KeyError: a` | an empty dict has no keys yet; `len(d)` is `0` |

## Implementation notes

- Every code sample and every solution here was executed against the vendored
  `skulpt.min.js`. Verified: dict literals, `d[k]` read and write, `len(d)`,
  `.get(k)` and `.get(k, default)`, `in` on a dict, `.keys()`, `.values()`,
  `.items()`, `sum(d.values())`, and nested quotes inside an f-string
  (`f"{d['Zeus']}"`).
- **Dict ordering was verified**: this build of Skulpt preserves insertion order
  for printing, `.keys()`, `.values()` and `.items()`, matching CPython 3.7+.
  Even so, only e4 depends on iteration order, and there the printed answers
  (a total, a count, and a strict maximum) are order-independent by
  construction. The quest gets its determinism from the explicit `petitions`
  list rather than from dict order. **Rule for future lessons: never assert the
  printed form of a whole dict in a `check`.** Teach blocks may print one, since
  nothing is graded there.
- Skulpt renders `KeyError: Hera on line 2`; CPython 3 renders `KeyError: 'Hera'`.
  The lesson shows Skulpt's text — that is what appears on her screen — and
  mentions the quote difference in one sentence, following the honesty policy in
  `01-architecture.md`.
- All output checks use `mode: "normalized"`. No expected line depends on
  leading whitespace.
- e2's `source` check uses `mustExclude` rather than `mustInclude` so it forbids
  the one shortcut (typing `7` straight into the literal) without prescribing a
  style.
- No `input()` in this lesson. Nothing here uses `del`, dict comprehensions, or
  `.pop()` — all of them are outside the curriculum at this point.
