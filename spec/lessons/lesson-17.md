# Lesson 17 — Decoding the Prophecy · פענוח הנבואה

> **Act V — The Last Olympian** · Stop 17 of 20
> Structure follows `spec/lessons/lesson-01.md`. Schema: `spec/04-lesson-template.md`.

| | |
| --- | --- |
| **id** | `17` |
| **slug** | `decoding-the-prophecy` |
| **minutes** | 30–35 |
| **concepts** | strings as sequences, indexing, slicing, string methods, `.split()`, `.join()`, f-string formatting |
| **new vocabulary** | `.strip`, `.upper`, `.lower`, `.replace`, `.split`, `.join`, `.center`, `f"{x:.1f}"` |
| **requires** | L1 strings · L3 f-strings · L6 `if` · L8 `for` · L9–10 lists, indexing, slicing, `len` · L11 dicts · L13–14 functions and `return` |
| **item** | 📜 מגילת האורקל / The Oracle's Scroll |
| **XP** | 25 + 25 + 30 + 35 (battles) + 55 (great battle) + 30 (bonus) = **200** |

## Teaching goal

By the end she can take a messy piece of text and *do something to it*: clean it,
cut it, split it into pieces, put the pieces back together, and print the result
in a shape a human wants to read.

The technical goal is string methods. The real goal is a change of mental model:
**a string is not an atom, it is a sequence** — the same kind of thing as a list,
which she already knows how to walk through with a `for` loop. Once she sees
that, everything in this lesson is a variation on something she can already do.

The second thing she must leave with, because it will bite her for years:
**string methods return a new string. They never change the original.**

The battles make both of these mechanical rather than academic. In the first
level the only tower she is allowed to build has its name hidden inside a padded
string — no decode, no tower, no defense. In the last one, nine lines of
prophecy spell out that name down their first letters, and a missing `.strip()`
turns the answer into whitespace and builds nothing at all.

## Story beat

Act IV ended in the Labyrinth. Act V opens above ground, and the news is worse.
The Oracle has sent a prophecy about the war for Olympus, but it arrived by
Iris-message through a storm: the lines came out padded with whitespace, some in
capitals, some in fragments, and the pieces are out of order. Annabeth has the
scroll spread on the ping-pong table in the Big House and cannot make it say
anything.

Chiron does not offer to translate it. He points out that a prophecy is text,
text is something she now knows how to take apart — and that the Oracle does not
send poetry. She sends **instructions**: the name of a tower the camp has never
been permitted to raise, the order in which the monsters have to die, and a
build plan written in a shorthand nobody has bothered to expand.

The Prophecy panel (3–6 lines, no code):

> הנבואה הגיעה. היא הגיעה שבורה.
> אנבת' פורשת את המגילה על השולחן ומסתכלת בך.
> "הרוח קרעה אותה. יש פה רווחים, אותיות גדולות, שורות הפוכות."
> כירון לא מציע לתרגם. הוא אומר: "נבואה היא טקסט."
> "וטקסט — כבר יש לך כלים לפרק אותו."

Cast: Annabeth (drives the scene, asks the good question), Chiron. Grover appears
in a `tip` callout, having eaten the corner of the scroll.

## Chiron Teaches — block by block

1. **prose** — Open by connecting to what she already owns. A list holds many
   things and she can reach item number 3 with `[2]`. A string holds many
   *characters*. It works the same way. Nothing new is being invented here; the
   tool she has is being pointed at a different target.

2. **code (runnable)** — indexing a string, before any rule is named.
   ```python
   word = "prophecy"
   print(word[0], word[3], word[-1], len(word))
   ```
   Output: `p p y 8`
   Caption: `word[0]` הוא התו הראשון. `word[-1]` הוא האחרון. בדיוק כמו ברשימה.

3. **prose** — Name the rule now, in one sentence: **a string is a sequence of
   characters, and everything she learned about reaching into a list works on
   it.** Counting starts at 0. Negative numbers count from the end.

4. **code (runnable)** — slicing. She met `[a:b]` on lists in lesson 10; this is
   the same notation.
   ```python
   line = "A HERO SHALL RISE"
   print(line[0:6])
   print(line[7:])
   print(line[-4:])
   ```
   Output:
   ```
   A HERO
   SHALL RISE
   RISE
   ```
   Caption: הפרוסה לוקחת מהמקום הראשון עד לפני האחרון. משאירים צד ריק — הולכים עד הקצה.

5. **callout · tip** — `line[::-1]` הופך מחרוזת. זה טריק, לא כלל: המספר השלישי
   בפרוסה הוא הקפיצה, ומינוס אחת אומרת "אחורה". `print("olympus"[::-1])`
   מדפיס `supmylo`. שווה לזכור, שווה לא להתאהב בזה.

6. **error block** — the surprise that defines strings.
   ```python
   word = "prophecy"
   word[0] = "P"
   ```
   Real error: `TypeError: 'str' does not support item assignment on line 2`
   Explanation: אפשר לקרוא תו מתוך string, אבל אי אפשר להחליף אותו במקום.
   מחרוזת בפייתון היא **קפואה**. אם את רוצה גרסה אחרת — את בונה מחרוזת חדשה:
   `word = "P" + word[1:]`. זה נשמע מעצבן, ואחר כך זה מציל אותך: אף פונקציה לא
   יכולה לשנות לך מחרוזת מתחת לידיים.

7. **code (runnable)** — the method family, all at once, because they follow one
   pattern.
   ```python
   title = "the last olympian"
   print(title.upper())
   print(title.title())
   print(title.replace("last", "first"))
   print(title.startswith("the"), title.count("l"), title.find("last"))
   ```
   Output:
   ```
   THE LAST OLYMPIAN
   The Last Olympian
   the first olympian
   True 2 4
   ```
   Caption: הנקודה אחרי המחרוזת אומרת "תעשי לה את זה". זה נקרא **method** —
   פונקציה ששייכת לדבר עצמו.

8. **compare** — **the most important block in the lesson.** The bug that
   everyone writes once.
   - bad:
     ```python
     name = "  percy  "
     name.strip()
     print("[" + name + "]")
     ```
     label: `[  percy  ]` — הרווחים עדיין שם
   - good:
     ```python
     name = "  percy  "
     name = name.strip()
     print("[" + name + "]")
     ```
     label: `[percy]` — שמרנו את התוצאה
   Prose under it: `.strip()` לא מנקה את `name`. הוא **מחזיר** מחרוזת נקייה
   חדשה, ואם לא שמרת אותה — היא נזרקת. זה נכון לכל method של מחרוזת:
   `.upper()`, `.replace()`, `.lower()`, כולם. `return` בלי השמה זה כמו לשלוף
   חרב ולהשאיר אותה על הרצפה.

9. **code (runnable)** — `.split()`: from one string to a list. This is the
   bridge between this lesson and everything she already knows about lists.
   ```python
   raw = "sea,sky,underworld"
   parts = raw.split(",")
   print(parts)
   print(len(parts))

   sentence = "the sky is falling"
   print(sentence.split())
   ```
   Output:
   ```
   ['sea', 'sky', 'underworld']
   3
   ['the', 'sky', 'is', 'falling']
   ```
   Caption: `.split(",")` חותך בכל פסיק. `.split()` בלי כלום חותך בכל רווח —
   וזאת הדרך לקבל את המילים של משפט.

10. **code (runnable)** — `.join()`: the way back.
    ```python
    parts = ["sea", "sky", "underworld"]
    print(" and ".join(parts))
    print("-".join(parts))
    print("".join(parts))
    ```
    Output:
    ```
    sea and sky and underworld
    sea-sky-underworld
    seaskyunderworld
    ```

11. **callout · warn** — `.join` נכתב הפוך ממה שמצפים. **המחרוזת שכותבים לפניה
    היא הדבק, והרשימה נכנסת בסוגריים.** `" ".join(words)` ולא
    `words.join(" ")`. השני יזרוק
    `AttributeError: 'list' object has no attribute 'join'`. כולם נופלים בזה
    בפעם הראשונה. עכשיו נפלת פעם אחת בשקט.

12. **code (runnable)** — f-string formatting: making output look like a scroll.
    ```python
    hp = 37.4567
    print(f"Percy has {hp:.1f} HP")
    print(f"{hp:.0f}")
    print(" OLYMPUS ".center(20, "="))
    print("=" * 20)
    ```
    Output:
    ```
    Percy has 37.5 HP
    37
    ===== OLYMPUS ======
    ====================
    ```
    Caption: הנקודתיים בתוך ה-f-string פותחות הוראות עיצוב. `.1f` אומר "מספר
    עשרוני, ספרה אחת אחרי הנקודה". `.center(20, "=")` ממרכז לרוחב 20 וממלא
    בסימן שביקשת.

13. **callout · myth** — האורקל בדלפי ישבה על סדק באדמה ודיברה במשפטים
    דו-משמעיים בכוונה. מלך שאל אם לצאת למלחמה וקיבל תשובה שאפשר לקרוא בשתי
    דרכים הפוכות. הוא בחר את הקריאה שנוחה לו והפסיד את הממלכה. נבואה שצריך
    לפענח היא לא באג. זה התכנון.

## Try It (ungraded)

Free-play editor. Nothing checked, nothing scored.

```python
line = "  the sea does not forget  "

print(line.strip())
print(line.upper())
print(line.strip().split())
print(line.strip()[0:3])
```

Intro: *"המגילה שלך עכשיו. שני את הטקסט, נסי methods אחרים, שרשרי אותם אחד אחרי
השני עם נקודות. שום דבר פה לא נבדק — תשברי אותו כמה שבא לך."*

## Battle levels

Five battles. The control model is the one she graduated to in lesson 14 — a
build script plus a `choose_target` the game calls every time a tower needs a
target — and every level here is decided by **text she has to take apart before
it means anything**.

Every level was run through the real engine (`node tools/try-level.mjs`). For
each one: the stated solution wins with a perfect defense, an empty program
loses, and where the level is about targeting, the degenerate answers
(`return 0`, `return enemies[0]`, `return None`) all lose. The measured numbers
are recorded under each level.

---

### b1 — The Sealed Word · המילה החתומה · 25 XP, 6 🪙

**Why this mechanic:** the level allows **one tower kind and she is not told its
name in a form she can type**. The name exists only inside a padded, capitalised,
X-wrapped string. Without `.strip()`, a slice and `.lower()` she places nothing
at all, and nothing is what stops the harpies.

Hermes delivers a sealed line from the Oracle. Inside it is the name of a tower
the camp has never been allowed to build.

```js
map: { cols: 12, rows: 7,
       path: [[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3]] },
gold: 240, campHp: 4, seed: 31,
allowed: ["lightning"],
waves: [ { delay: 0, enemies: [ { kind: "satyr", count: 6, gap: 0.9 },
                                { kind: "harpy", count: 4, gap: 1.1 } ] } ],
```

Starter:
```python
SEALED = "   XXXLIGHTNINGXXX   "

# the tower's name is inside SEALED.
# clean the edges, cut off the three X on each side, make it lower case,
# then build two of them at (4, 2) and (8, 4).
```

Solution:
```python
SEALED = "   XXXLIGHTNINGXXX   "
tower = SEALED.strip()[3:-3].lower()

place_tower(tower, 4, 2)
place_tower(tower, 8, 4)
```

```js
check: { kind: "battle",
  also: { kind: "source", raw: true,
          mustExclude: ["\"lightning\"", "'lightning'"],
          message: { he: "את שם המגדל צריך לחלץ מהמגילה, לא להקליד אותו",
                     en: "The tower's name has to come out of the scroll, not off your keyboard" } } }
```

Verified: solution wins 4/4 HP, ten kills. Empty program loses 4–0.
`place_tower("archer", …)` is rejected as `notAllowed` and the level says so.
`place_tower("LIGHTNING", …)` is rejected as `unknownTower` — the `.lower()` is
load-bearing and the engine explains why. One lightning tower instead of two
leaks exactly one monster, which is the closest possible miss.

Hints:
1. הריצי עם `print(SEALED)` בשורה הראשונה. מה יש בין הגרש הפותח לבין ה-`L`, ומה
   יש אחרי המילה?
2. שלושה דברים לפי הסדר: להוריד רווחים מהקצוות, לחתוך שלושה תווים מכל צד,
   ולהפוך לאותיות קטנות. לכל אחד מהם יש method או פרוסה שכבר ראית היום.
3. `SEALED.strip()` מוריד את הרווחים. על התוצאה אפשר לחתוך מיד:
   `SEALED.strip()[3:-3]` לוקח מהתו הרביעי ועד שלושה לפני הסוף. ואז `.lower()`
   בסוף, כי `"LIGHTNING"` הוא לא שם של מגדל בשביל המנוע — `"lightning"` כן.
   שמרי הכל במשתנה אחד והעבירי אותו ל-`place_tower` פעמיים.

---

### b2 — The Build Order · סדר הבנייה · 25 XP, 6 🪙

**Why this mechanic:** the order of construction arrives as **one string with
four names in it**, and the spots arrive as a separate list. She cannot place a
tower until she has cut the string into a list and walked the two lists together
with an index. This is `.split()` handing its output straight to a `for` loop.

Annabeth chalked the build order on the wall of the Big House. She did not
number it. She wrote it as a line.

```js
map: { cols: 14, rows: 8,
       path: [[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[6,3],[6,4],[6,5],[6,6],
              [7,6],[8,6],[9,6],[10,6],[11,6],[12,6],[13,6]] },
gold: 280, campHp: 4, seed: 32,
allowed: ["archer", "cannon"],
waves: [
  { delay: 0, enemies: [ { kind: "satyr", count: 6, gap: 0.8 } ] },
  { delay: 9, enemies: [ { kind: "hellhound", count: 5, gap: 0.6 } ] },
],
```

Starter:
```python
ORDER = "archer-cannon-cannon-archer"
SPOTS = [[3, 1], [5, 3], [8, 5], [11, 5]]

# cut ORDER into a list of tower names,
# then build each one on the matching spot from SPOTS.
```

Solution:
```python
ORDER = "archer-cannon-cannon-archer"
SPOTS = [[3, 1], [5, 3], [8, 5], [11, 5]]

kinds = ORDER.split("-")
for i in range(len(kinds)):
    place_tower(kinds[i], SPOTS[i][0], SPOTS[i][1])
```

```js
check: { kind: "battle",
  also: { kind: "source", mustInclude: [".split", "for "],
          message: { he: "סדר הבנייה חייב לצאת מהמחרוזת עם ‎.split()‎ ולולאה — לא ארבע שורות ידניות",
                     en: "The build order must come out of the string with .split() and a loop, not four hand-written lines" } } }
```

Verified: solution wins 4/4, eleven kills, 280 gold spent exactly. Empty program
loses 4–0. Building only the first two towers loses 4–0. The kinds and the spots
are paired by position, so `kinds[i]` and `SPOTS[i]` must move together — the
same index into two lists, which is the pattern lesson 9 introduced.

Hints:
1. `ORDER.split("-")` מחזיר משהו. הדפיסי אותו. כמה איברים יש בו, וכמה משבצות יש
   ב-`SPOTS`?
2. שתי רשימות באותו אורך, ואת צריכה איבר מכל אחת בכל סיבוב. הכלי לזה הוא
   `for i in range(len(...))` — `i` הוא אותו מספר בשתי הרשימות.
3. `kinds = ORDER.split("-")` נותן `['archer', 'cannon', 'cannon', 'archer']`.
   בלולאה `for i in range(len(kinds)):` הערך `kinds[i]` הוא שם המגדל ו-`SPOTS[i]`
   הוא זוג המספרים — אז ה-x הוא `SPOTS[i][0]` וה-y הוא `SPOTS[i][1]`. שלושתם
   נכנסים ל-`place_tower` באותה שורה.

---

### b3 — The Order of the Kill · סדר ההריגה · 30 XP, 8 🪙

**Why this mechanic:** the wave is harpies over hellhounds, and **a cannon cannot
shoot anything flying**. Left alone, the archers spend their shots on whatever is
furthest along the road — which is usually a hellhound the cannons were already
handling — and the harpies fly over the camp. The Oracle's line names the right
order; she has to cut it into a list and let `choose_target` walk it.

The elegant part is that she writes **one** rule and it lands differently on each
tower: a cannon never sees a harpy in its `enemies` list at all, so it falls
straight through to the second name in the order. She does not have to code that.

```js
map: { cols: 18, rows: 9, path: [[0,4],[1,4], … ,[17,4]] },   // straight road
gold: 330, campHp: 5, seed: 51,
allowed: ["archer", "cannon"],
waves: [ { delay: 0, enemies: [ { kind: "hellhound", count: 4, gap: 0.5 },
                                { kind: "harpy", count: 6, gap: 0.7 } ] } ],
```

Starter (the towers are already written; the rule is not):
```python
place_tower("cannon", 4, 3)
place_tower("archer", 6, 5)
place_tower("archer", 8, 3)
place_tower("cannon", 11, 3)
place_tower("archer", 13, 5)

ORDER = "harpy>hellhound"

# cut ORDER into a list of kinds,
# then write choose_target so every tower shoots the first kind it can find,
# in that order.
```

Solution:
```python
place_tower("cannon", 4, 3)
place_tower("archer", 6, 5)
place_tower("archer", 8, 3)
place_tower("cannon", 11, 3)
place_tower("archer", 13, 5)

ORDER = "harpy>hellhound"
PRIORITY = ORDER.split(">")

def choose_target(enemies):
    for kind in PRIORITY:
        for enemy in enemies:
            if enemy["kind"] == kind:
                return enemy
    return enemies[0]
```

```js
check: { kind: "battle",
  also: { kind: "source", mustInclude: [".split", "def choose_target"],
          message: { he: "סדר הקדימויות חייב לצאת מהמחרוזת עם ‎.split()‎, ולהיכנס ל-choose_target",
                     en: "The priority order must come out of the string with .split() and into choose_target" } } }
```

Verified, and this is the sharpest level in the lesson:

| what she writes | outcome |
| --- | --- |
| the solution | **wins**, 5/5 HP, 10 kills |
| the same towers, no `choose_target` | loses, 2 leaked |
| the order reversed (`"hellhound>harpy"`) | loses, 3 leaked |
| `return 0` | loses, 3 leaked |
| `return enemies[0]` | loses, 3 leaked |
| `return None` | loses, 6 leaked — the towers never fire |
| empty program | loses, 6 leaked |

Hints:
1. הריצי בלי `choose_target` וצפי. מה עובר את השורה — מה שהולך על הקרקע, או מה
   שעף? ואיזה מגדל אצלך בכלל יכול לפגוע במשהו שעף?
2. `ORDER.split(">")` נותן רשימה של שמות לפי סדר חשיבות. בתוך `choose_target` את
   צריכה לעבור על הסדר הזה, ולכל שם לחפש מפלצת מהסוג הזה ברשימת `enemies`.
3. שתי לולאות, אחת בתוך השנייה: החיצונית עוברת על `PRIORITY`, הפנימית על
   `enemies`. ברגע ש-`enemy["kind"]` שווה ל-`kind`, `return enemy` ויוצאים
   משתיהן. אם עברת על כל הסדר ולא מצאת כלום — `return enemies[0]`, כדי שהמגדל
   לא יישאר בלי מטרה. שימי לב שאותו כלל בדיוק עובד גם לתותח: הוא לא רואה הרפיות
   ברשימה שלו, אז הוא נופל לשם השני מעצמו.

---

### b4 — The Bestiary Line · שורת הבסטיאריום · 35 XP, 9 🪙

**Why this mechanic:** the Oracle sends the whole bestiary as **one line of
`name=number` pairs**. To use it she has to split it twice — once on the commas
to get the pairs, once on the `=` to get the two halves — and `int()` the second
half, because everything that comes out of a string is a string. This is the
step from "text" to "data she can compute with", and it is the most reusable
thing in the lesson.

A cyclops walks out front and stays out front: it is slow, it spawned first, and
nothing behind it can overtake it before the gate. Towers that shoot whatever
leads will pour everything into 5 armour while the swarm behind strolls past.

```js
map: { cols: 18, rows: 10,
       path: [[0,1],[1,1],[2,1],[3,1],[4,1],[4,2],[4,3],[4,4],[4,5],[5,5],[6,5],
              [7,5],[8,5],[9,5],[10,5],[10,6],[10,7],[10,8],[11,8],[12,8],[13,8],
              [14,8],[15,8],[16,8],[17,8]] },
gold: 370, campHp: 5, seed: 34,
allowed: ["archer", "cannon"],
waves: [
  { delay: 0, enemies: [ { kind: "cyclops",   count: 2, gap: 2.0 } ] },
  { delay: 4, enemies: [ { kind: "hellhound", count: 6, gap: 0.4 } ] },
  { delay: 6, enemies: [ { kind: "satyr",     count: 7, gap: 0.7 },
                         { kind: "harpy",     count: 4, gap: 0.8 } ] },
],
```

Starter:
```python
place_tower("cannon", 2, 3)
place_tower("archer", 6, 4)
place_tower("cannon", 8, 6)
place_tower("cannon", 12, 7)
place_tower("archer", 15, 7)

SCROLL = "satyr=1,harpy=2,hellhound=3,cyclops=4"

# turn SCROLL into a dict: {"satyr": 1, "harpy": 2, ...}
# the LOWER the number, the sooner it should die.
# then write choose_target that returns the enemy with the lowest number.
```

Solution:
```python
place_tower("cannon", 2, 3)
place_tower("archer", 6, 4)
place_tower("cannon", 8, 6)
place_tower("cannon", 12, 7)
place_tower("archer", 15, 7)

SCROLL = "satyr=1,harpy=2,hellhound=3,cyclops=4"

RANK = {}
for part in SCROLL.split(","):
    pieces = part.split("=")
    RANK[pieces[0]] = int(pieces[1])

def choose_target(enemies):
    best = enemies[0]
    for enemy in enemies:
        if RANK[enemy["kind"]] < RANK[best["kind"]]:
            best = enemy
    return best
```

```js
check: { kind: "battle",
  also: { kind: "source", mustInclude: [".split", "int(", "RANK["],
          message: { he: "הדירוג חייב להיבנות מהמחרוזת: ‎.split()‎ פעמיים ו-int על החצי השני",
                     en: "The ranking must be built from the string: .split() twice, and int() on the second half" } } }
```

Verified: solution wins 5/5 with 19 kills. The same five towers with no
`choose_target` lose 3 monsters. `return 0` and `return enemies[0]` lose 5 — the
camp falls. `return None` loses 5. Empty program loses 5.

**Why `int()` is not decoration:** `part.split("=")[1]` is the string `"1"`, and
`"1" < "10"` compares text, not size. With four ranks it happens to work; the
moment a rank reaches 10 it stops working, silently. She converts once, at the
edge, and never thinks about it again — which is the actual professional habit.

Hints:
1. `SCROLL.split(",")` נותן לך ארבע חתיכות. הדפיסי אחת מהן. מה יש בתוך חתיכה
   אחת, ואיך היו נראים שני החצאים שלה בנפרד?
2. שני `split` בשני מקומות: אחד על הפסיקים, בחוץ, ואחד על ה-`=` בתוך הלולאה. את
   השם שמים כמפתח במילון ואת המספר כערך — אבל המספר יוצא מה-split כ-string.
3. `RANK = {}` לפני הלולאה. בתוכה: `pieces = part.split("=")` נותן שני איברים,
   אז `RANK[pieces[0]] = int(pieces[1])`. אחר כך `choose_target` היא תבנית
   "מצא את המינימום" משיעור 10, רק שמשווים `RANK[enemy["kind"]]` במקום את
   המפלצת עצמה: מתחילים מ-`enemies[0]`, עוברים על כולן, ומחליפים כשמוצאים מספר
   קטן יותר.

---

## The Great Battle — "הנבואה הגדולה" / "The Great Prophecy" · 55 XP, 14 🪙

**Why this mechanic:** every string tool in the lesson at once, and none of them
optional. Nine lines of prophecy whose **first letters spell the name of the
tower she is allowed to build**. A battle plan written as `kind@x,y` items where
one entry is sealed as `X` and has to be `replace`d with the decoded word. An
order line she has to cut at the colon and then at the `>`. If any one of those
steps is wrong she builds nothing, or builds the wrong thing, and Olympus takes
the wave in the face.

The Oracle's full text finally arrives. It is nine lines long, badly padded, and
the ninth line tells her what she is looking at.

```js
map: { cols: 16, rows: 10,
       path: [[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[6,3],[6,4],[6,5],[6,6],
              [6,7],[7,7],[8,7],[9,7],[10,7],[11,7],[12,7],[12,6],[12,5],[12,4],
              [12,3],[13,3],[14,3],[15,3]] },
gold: 540, campHp: 6, seed: 41,
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

Starter:
```python
GREAT_PROPHECY = [
    "  Long shall the last Olympian wait  ",
    "In the year the sky is torn open",
    "  Gods will count their empty thrones",
    "Half of the twelve shall not return  ",
    "  The Titan climbs the mountain stair",
    "Nine names are cut into the stone",
    "  Iron and bronze will not be enough",
    "No hero holds the gate alone  ",
    "  Give the sky back its own weapon  ",
]
BATTLE_PLAN = "cannon@4,4 archer@2,1 archer@5,1 cannon@8,5 archer@7,4 X@10,6 cannon@14,5"
ORDER_LINE = "  the order of the kill: harpy > satyr > hellhound > cyclops  "

# 1) the sealed name: the first letter of every cleaned line, joined, lower case
# 2) build BATTLE_PLAN: each item is kind@x,y — and "X" means the sealed name
# 3) the order: cut ORDER_LINE at the colon, then at the >, and strip each piece
# 4) choose_target: first kind in the order that is standing in front of you
```

Solution:
```python
GREAT_PROPHECY = [ … as above … ]
BATTLE_PLAN = "cannon@4,4 archer@2,1 archer@5,1 cannon@8,5 archer@7,4 X@10,6 cannon@14,5"
ORDER_LINE = "  the order of the kill: harpy > satyr > hellhound > cyclops  "

letters = []
for line in GREAT_PROPHECY:
    letters.append(line.strip()[0])
secret = "".join(letters).lower()
print("the sealed word is", secret)

for item in BATTLE_PLAN.split():
    parts = item.split("@")
    kind = parts[0].replace("X", secret)
    xy = parts[1].split(",")
    place_tower(kind, int(xy[0]), int(xy[1]))

PRIORITY = []
for piece in ORDER_LINE.split(":")[1].split(">"):
    PRIORITY.append(piece.strip())

def choose_target(enemies):
    for kind in PRIORITY:
        for enemy in enemies:
            if enemy["kind"] == kind:
                return enemy
    return enemies[0]
```

```js
check: { kind: "battle",
  also: { kind: "source", raw: true,
          mustInclude: [".strip", ".join", ".split", ".replace"],
          mustExclude: ["\"lightning\"", "'lightning'"],
          message: { he: "המילה החתומה נבנית מהשורות ולא נכתבת ביד, והתוכנית והסדר נחתכים מהמחרוזות",
                     en: "The sealed word is built from the lines, not typed, and the plan and the order are cut out of their strings" } } }
```

Verified: solution wins 6/6 HP with **57 kills** over seven waves and 51 seconds
of battle. Build without the order line: loses, 3 leaked. `return 0` and
`return enemies[0]`: lose, 1 leaked. `return None`: loses, 6 leaked. Empty
program: loses, 6 leaked.

**Why the `.strip()` before `[0]` is the whole quest.** Four of the nine lines
start with two spaces. Without cleaning, `line[0]` is a space and the sealed word
comes out as `" i h  n i n g"` — `place_tower` is handed nonsense and not one
tower is built. She will hit that, and it is the best possible demonstration that
cleaning input is not tidiness, it is the difference between a program and a
crash. Hint 1 sends her straight at it.

Hints:
1. הדפיסי את המילה החתומה לפני שאת בונה משהו. אם יצאו בה חורים — תסתכלי על
   השורות עצמן. איך מתחילות שורה 1, שורה 3 ושורה 5?
2. שלושה חלקים נפרדים, וכל אחד עומד בפני עצמו: (א) אות ראשונה מכל שורה נקייה
   לתוך רשימה, ואז `"".join` עליה. (ב) `BATTLE_PLAN.split()` נותן פריטים, וכל
   פריט נחתך ב-`@` ואז ב-`,`. (ג) `ORDER_LINE.split(":")` נותן שני חצאים; החצי
   השני נחתך ב-`>`.
3. לפי הסדר: `letters.append(line.strip()[0])` בלולאה, ואז
   `secret = "".join(letters).lower()`. לבנייה: לכל `item`, `parts = item.split("@")`
   — `parts[0]` הוא הסוג ו-`parts[1]` הוא `"4,4"`. `parts[0].replace("X", secret)`
   מחליף את החותם בשם האמיתי ולא נוגע בשמות האחרים. `xy = parts[1].split(",")`
   ואז `place_tower(kind, int(xy[0]), int(xy[1]))` — בלי `int` המנוע מקבל
   מחרוזות במקום מספרים. לסדר: `ORDER_LINE.split(":")[1]` הוא כל מה שאחרי
   הנקודתיים, ועליו `.split(">")`, ועל כל חתיכה `.strip()` כי יש רווחים סביב
   החיצים.

## Reward & Recap

**Item**: 📜 **מגילת האורקל / The Oracle's Scroll** — "הנבואה שפענחת, מגולגלת
וקשורה בסרט. אף אחד אחר במחנה לא הצליח לקרוא אותה."

Bead 17 is added to the necklace.

**Achievements possible here**: *Wordsmith* (won the great battle with no
hints), *Persistent* (won a battle after five failed runs).

**Recap bullets**:
- string הוא רצף של תווים — אינדקסים ופרוסות עובדים עליו בדיוק כמו על רשימה
- methods של מחרוזת **מחזירים** מחרוזת חדשה ולא משנים את המקורית — צריך לשמור
- `.strip()` מוריד רווחים מהקצוות, `.upper()` ו-`.lower()` משנים גודל אותיות
- `.split()` הופך מחרוזת לרשימה, `" ".join(list)` מחזיר רשימה למחרוזת
- בתוך f-string, `{value:.1f}` שולט בכמה ספרות אחרי הנקודה, ו-`.center(n, "=")`
  ממרכז שורה
- `int("4")` הופך מחרוזת למספר — כל מה שיוצא מ-`.split()` הוא טקסט, תמיד

**Next teaser**: *"פענחת את הנבואה. עכשיו צריך לטוס איתה לאולימפוס — ומשהו בעל
כנפיים מחכה בדרך, ואין לו סבלנות לטעויות."*

## Common mistakes to anticipate

| She does | She sees | Hint must cover |
| --- | --- | --- |
| `name.strip()` without assigning | no error, no change | a method returns a value; save it |
| `word[0] = "P"` | `TypeError: 'str' does not support item assignment` | strings are frozen; build a new one |
| `words.join(" ")` | `AttributeError: 'list' object has no attribute 'join'` | the glue goes first: `" ".join(words)` |
| `"prophecy".uper()` | `AttributeError: 'str' object has no attribute 'uper'` | check the spelling of the method name |
| `line[0]` on an unstripped line | a space instead of a letter | strip before you index |
| `.split(" ")` on a double-spaced line | empty strings in the list | plain `.split()` handles runs of whitespace |
| `f"{hp:.1}"` (missing the `f`) | `ValueError` / wrong output | the format spec for a float is `.1f` |
| passes `"LIGHTNING"` to `place_tower` | the battle reports `unknownTower` and nothing is built | tower names are lower case; `.lower()` is part of the decode |
| `place_tower(kind, xy[0], xy[1])` with no `int()` | the tower lands in a strange square or nowhere | coordinates out of a string are strings until you convert them |
| takes `line[0]` before `.strip()` | the sealed word has holes and no tower appears | strip before you index — the first character of a padded line is a space |
| writes the priority list by hand instead of splitting | the battle is won but the check refuses it | the `also` message names the requirement |

## Implementation notes

- Every construct here is in the verified matrix in `01-architecture.md`. All
  teaching code in this file was executed against the vendored `skulpt.min.js`
  and the outputs above are the real ones, character for character.
- **Every one of the five levels was played through the real engine** with
  `assets/js/battle/{sim,pyapi,play}.js` loaded into a Node VM, exactly the way
  `tools/verify-python.mjs` does it. For each level three things were asserted:
  the stated solution wins with a perfect defense, an empty program loses, and
  (for b3, b4 and the great battle) `return 0`, `return enemies[0]` and
  `return None` all lose. The measured leak counts are written under each level
  and should be re-measured if any number in a level changes.
- **b1's forcing device is `allowed: ["lightning"]`.** It is the only kind she
  may place, and its name reaches her only inside a string. `place_tower("archer",
  …)` comes back as a `notAllowed` build error with a sentence explaining it, and
  `place_tower("LIGHTNING", …)` as `unknownTower` — so both near-misses teach
  rather than confuse.
- **b3 depends on the cannon being blind to flying enemies** (see
  `spec/09-battle-game.md`). That rule is what makes one priority list behave
  differently on two tower kinds without her writing a single `if` about it. If
  that rule is ever changed, b3 has to be re-tuned.
- **b4's cyclops leads on purpose.** It spawns first, moves at 0.8, and nothing
  behind it can overtake it before the gate, so the engine's default "shoot
  whatever is furthest along" pours archer fire into 5 armour. This is the one
  reliable way to make the default targeting wrong, and both b4 and the great
  battle use it.
- **`raw: true` is required on exactly two `source` checks** — b1 and the great
  battle — because both use `mustExclude` against a **string literal**
  (`"lightning"`), and the default skeleton strips literals, so the exclusion
  could never fire. b2's `.split`, b3's `def choose_target` and b4's `int(` are
  syntax and survive stripping, so they must **not** set `raw`, or a word in a
  Hebrew comment would satisfy them.
- `mustExclude: ["\"lightning\"", "'lightning'"]` covers both quote styles. It
  will also trip if she writes the quoted word in a comment; that is acceptable,
  and the `message` explains the requirement.
- **The formatting-check rule still applies to anything printed.** `normalized`
  collapses runs of whitespace, so alignment can only be checked when it is
  padded with a visible character (`.center(30, "=")`). No level here grades
  printed output — the battle is the check — but the teaching blocks keep the
  rule visible because lesson 20's victory scroll needs it.
- `print()` inside `choose_target` reaches the live battle log in the browser
  (the engine's `onStdout` keeps streaming while the simulation runs) but is
  **not** part of the captured output string. No level may ever check text
  produced from inside a strategy function.
- No `input()` in this lesson, so nothing blocks on a prompt.
- The `[::-1]` reverse trick in callout 5 is shown, not required by any check.
  Keep it that way — step slicing is a good thing to recognise and a poor thing
  to be graded on.
- Skulpt prints lists with single quotes (`['sea', 'sky']`), the same as CPython.
  The teach outputs above already reflect that.
