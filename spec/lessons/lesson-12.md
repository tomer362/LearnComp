# Lesson 12 — BOSS: The Hydra · ההידרה

> **Act III — Sea of Monsters · ים המפלצות** · Stop 12 of 20 · **ACT III BOSS**
> Structure follows `spec/lessons/lesson-01.md`. Schema: `spec/04-lesson-template.md`.
> Boss rules: `spec/02-game-design.md` § Boss fights.

| | |
| --- | --- |
| **id** | `12` |
| **slug** | `the-hydra` |
| **minutes** | 35 (the longest lesson in Act III — it closes the act) |
| **concepts** | nested lists, `get_map()` as a list of lists, `grid[y][x]`, iterating nested structures, building nested data, counting, searching |
| **new vocabulary** | `x[a][b]`, `grid[y][x]`, nesting |
| **requires** | L9 lists, indexing, `len()`, `for`, `in` · L10 `.append`/`sorted`/slicing · L11 dicts, `.get`, `.items()` · L6 `if`/`elif`/`else` · L5 `and` · L3 f-strings |
| **item** | 🐑 גיזת הזהב / The Golden Fleece |
| **XP** | 20 + 25 + 30 + 30 (training battles) + 60 (boss) = **165** · optional battle +30 |
| **drachmas** | 5 + 7 + 8 + 8 + 15 = **43** 🪙 · optional battle +8 |
| **boss** | `{ name: { he: "ההידרה", en: "The Hydra" }, icon: "🐲", hp: 5 }` — five heads, one per wave survived |
| **battle API** | `place_tower`, `get_map`, `get_wave`, `tower_cost`, `get_gold`, `camp_hp` — build script only |
| **towers** | `archer`, `cannon`, `ice` in training; **archer and ice only** in the boss |

## Teaching goal

Everything in Act III has been *flat*: a list of names, a dict of names to
domains. Lesson 12 says the quiet part out loud — **a value inside a list or a
dict can itself be a list or a dict**, and nothing new is needed to read it.
`heads[0][1]` is two lookups written next to each other, left to right.

**And the board she has been fighting on turns out to be one of them.**
`get_map()` returns a list of rows, each row a list of `"grass"` / `"path"` /
`"rock"`. Until this lesson the brief told her which squares were legal; from b2
on it stops, and she finds them herself — `grid[y][x] == "grass" and
grid[y + 1][x] == "path"` is the definition of a good tower spot, written in
Python, and it works on a map she has never seen. That is the payoff of the whole
act: not "here is a nested list", but "here is the world, read it".

The boss then makes her build the thing the act was pointing at: scan a
seventeen-by-ten board, collect every legal square into a list of `[x, y]` pairs
she assembles herself, read a nested roster of the brood, and spend a budget that
is exactly right. Lists, nesting, loops, conditions, `.append`, `len` and
f-strings — every tool from lessons 9, 10 and 11 in one program, with nothing
from lesson 13 needed.

Thematic payload: **you do not beat the Hydra by cutting.** Cut a head and two
grow back — and the battle proves it, because the third wave is two more hydras
coming out of the water behind the first. You beat it by knowing exactly what is
in front of you and exactly where you may stand. That is what a data structure is
for.

## Story beat

The gate of the Sea of Monsters is behind them. The water ahead boils. What comes
up is not one monster with one health bar — it is a monster made of records, each
head with its own hit points and its own weakness, and it grows while you fight
it. Chiron's advice, shouted over the noise, is to stop swinging and start
reading.

The Prophecy panel (5 lines, no code):

> המים לפני השער רותחים.
> מתוכם עולה ההידרה — לא ראש אחד, ולא שניים.
> כירון צועק אלייך מעל הרעש: "אל תנופפי בחרב!"
> "כל ראש שתכרתי — שניים יצמחו במקומו."
> "את לא מנצחת אותה בכוח. את מנצחת אותה בזה שאת יודעת בדיוק מה עומד מולך."

Cast: Chiron (from the deck, shouting), Annabeth (does the arithmetic out loud
and reaches the same conclusion), Grover (counting heads, losing count).

## Chiron Teaches — block by block

1. **prose** — עד עכשיו כל תא ברשימה החזיק ערך יחיד: מחרוזת, מספר. אבל לפייתון
   לא אכפת מה יושב בתא. אפשר לשים שם רשימה שלמה. אפשר לשים שם מילון שלם. שום
   כלל חדש לא נוסף היום — רק ההבנה שהכללים שאת מכירה מתקננים זה בתוך זה.

2. **code (runnable)** — a list of lists.
   ```python
   heads = [["fire", 30], ["ice", 20], ["poison", 25]]
   print(heads[0])
   print(heads[0][0])
   print(heads[0][1])
   ```
   Output:
   ```
   ['fire', 30]
   fire
   30
   ```
   Caption: `heads[0] הוא רשימה. ולרשימה יש index משלה — ולכן heads[0][0].`

3. **callout · tip** — title: *לקרוא משמאל לימין* / *Read it left to right*
   `heads[0][1]` הוא לא סימן אחד מוזר. הוא שתי שליפות אחת אחרי השנייה:
   1. `heads[0]` → הרשימה `["fire", 30]`
   2. ואז `[1]` על התוצאה הזאת → `30`
   הטריק לכל חיים: **קראי מהשמאל ימינה, שלב אחד בכל פעם, ותשאלי בכל שלב "מה יש
   לי עכשיו ביד?"**. אם את לא בטוחה — הדפיסי את השלב האמצעי בשורה נפרדת. זה
   מותר, זה זול, וזה מה שמתכנתות עושות באמת.

4. **code (runnable)** — `len` at two levels.
   ```python
   heads = [["fire", 30], ["ice", 20], ["poison", 25]]
   print(len(heads))
   print(len(heads[0]))
   ```
   Output:
   ```
   3
   2
   ```
   Caption: `שלושה ראשים. לכל ראש שני פרטים. שתי שאלות שונות לחלוטין.`

5. **error block** — the nested `IndexError`.
   ```python
   heads = [["fire", 30], ["ice", 20]]
   print(heads[1][2])
   ```
   Real error (verified in Skulpt):
   ```
   IndexError: list index out of range (line 2)
   ```
   Explanation: השורה הזאת מבלבלת כי היא נראית כמו השגיאה משיעור 9, אבל הפעם יש
   **שני** מספרים שיכולים להיות אשמים. `heads[1]` קיים לגמרי — הוא
   `["ice", 20]`. מה שלא קיים זה `[2]` **בתוכו**, כי יש לו רק שני תאים: 0 ו־1.
   השיטה: פרקי את השורה. הדפיסי `heads[1]` לבד. אם זה עבד — האשם הוא המספר
   השני. אם זה נפל — האשם הוא הראשון. שתי הרצות, ונגמר הניחוש.

6. **code (runnable)** — looping a nested list.
   ```python
   heads = [["fire", 30], ["ice", 20], ["poison", 25]]
   for head in heads:
       print(f"{head[0]} head with {head[1]} hp")
   ```
   Output:
   ```
   fire head with 30 hp
   ice head with 20 hp
   poison head with 25 hp
   ```
   Caption: `בכל סיבוב, head הוא רשימה קטנה. ולכן בתוך הלולאה כותבים head[0]
   ו־head[1] — בלי index חיצוני בכלל.`

7. **code (runnable)** — a dict whose values are lists.
   ```python
   crew = {"Annabeth": ["knife", "cap"], "Grover": ["reed pipes"]}
   print(crew["Annabeth"][0])
   print(len(crew["Annabeth"]))
   for thing in crew["Grover"]:
       print(thing)
   ```
   Output:
   ```
   knife
   2
   reed pipes
   ```
   Caption: `אותו רעיון בדיוק, רק שהשלב הראשון הוא מפתח ולא מספר.`

8. **code (runnable)** — a dict of dicts. This is the boss's shape.
   ```python
   hydra = {
       "fire": {"hp": 30, "weakness": "water"},
       "ice": {"hp": 20, "weakness": "torch"},
   }
   print(hydra["fire"]["weakness"])
   print(hydra["fire"])
   ```
   Output:
   ```
   water
   {'hp': 30, 'weakness': 'water'}
   ```
   Caption: `hydra["fire"] הוא מילון שלם. השאלה השנייה, ["weakness"], נשאלת
   עליו. שוב: משמאל לימין, שלב אחד בכל פעם.`

9. **compare** — the same data, two shapes. This is a design decision, not a
   right/wrong.
   - good (a) — label: *רשימה של רשימות — כשהסדר חשוב ואת סופרת:*
     ```python
     heads = [["fire", 30], ["ice", 20]]
     print(heads[0][1])
     ```
   - good (b) — label: *מילון של מילונים — כשאת מחפשת לפי שם:*
     ```python
     heads = {"fire": {"hp": 30}, "ice": {"hp": 20}}
     print(heads["fire"]["hp"])
     ```
   Caption: `שאלי את עצמך: "איך אני אחפש בזה מחר?" לפי מקום — רשימה. לפי שם —
   מילון. ל־hp אין שם ברשימה, רק מיקום 1, וזה בדיוק ההבדל.`

10. **code (runnable)** — the counting pattern over a nested structure.
    ```python
    hydra = {
        "fire": {"hp": 30, "weakness": "water"},
        "ice": {"hp": 20, "weakness": "torch"},
        "poison": {"hp": 25, "weakness": "antidote"},
    }
    strong = 0
    for name, head in hydra.items():
        if head["hp"] > 20:
            strong = strong + 1
    print(f"heads above 20 hp: {strong}")
    ```
    Output: `heads above 20 hp: 2`
    Caption: `accumulator משיעור 7, items משיעור 11, וקינון משיעור 12. אף כלי
    חדש — רק הרכבה.`

11. **code (runnable)** — the searching pattern: best so far.
    ```python
    hydra = {
        "fire": {"hp": 30, "weakness": "water"},
        "ice": {"hp": 20, "weakness": "torch"},
        "poison": {"hp": 25, "weakness": "antidote"},
    }
    weakest = ""
    lowest = 1000
    for name, head in hydra.items():
        if head["hp"] < lowest:
            lowest = head["hp"]
            weakest = name
    print(f"Weakest: {weakest} ({lowest})")
    ```
    Output: `Weakest: ice (20)`
    Caption: `שני משתנים שזוכרים יחד — השם והמספר — ומתעדכנים יחד. זו אותה
    תבנית מהצד האופציונלי של שיעור 10, עכשיו על מבנה מקונן.`

12. **callout · warn** — title: *הבאג הכי שקט בקינון* / *The quietest nesting bug*
    `head["hp"]` ו־`head["HP"]` הם שני מפתחות שונים לגמרי. הראשון עובד, השני
    נותן `KeyError: HP`. וכשמערבבים מבנים — `hydra["fire"][0]` על מילון ייתן
    `KeyError: 0`, כי למילון אין מקומות. הכלל: **תשאלי בכל שלב מה יש לך ביד.**
    רשימה עונה למספרים. מילון עונה לשמות.

13. **callout · myth** — title: *למה כריתה לא עוזרת* / *Why cutting does not help*
    הרקולס נלחם בהידרה, וכל ראש שכרת הצמיח שניים. בסוף הוא ניצח רק כשהפסיק
    לכרות והתחיל לחשוב. אנבת' עושה את החשבון בקול: ראש שנופל מוריד את ה־hp שלו,
    ושני ראשים חדשים מוסיפים 10 כל אחד. אם תכרתי ראש עם 15 hp — המפלצת תצא
    מהעסקה **חזקה יותר**. בקרב הבוס תראי את זה בעיניים: מההידרה הראשונה יוצאות
    שתיים, ואי אפשר לעצור אותן בכוח — רק בזה שאת יודעת בדיוק איפה מותר לעמוד.

16. **code (runnable)** — the board itself. This is the block the whole act has
    been walking towards: the map is a list of lists, and now she can read it.
    ```python
    grid = get_map()
    print(len(grid))
    print(len(grid[0]))
    print(grid[3])
    ```
    Output on the practice field:
    ```
    7
    10
    ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass']
    ```
    Caption: `get_map מחזיר רשימה של שורות, וכל שורה היא רשימה של מחרוזות:
    "grass", "path" או "rock". len על החיצונית זה כמה שורות; len על שורה אחת זה
    כמה עמודות.`

17. **callout · warn** — title: *קודם שורה, אחר כך עמודה* / *Row first, column
    second*
    זה המקום היחיד בקורס שבו הסדר מתהפך, ולכן הוא מקבל מסגרת משלו:
    - `place_tower("archer", x, y)` — **עמודה ואז שורה**, כי ככה מדברים על מקום
      על לוח: קודם לאן ללכת, ואז כמה למטה.
    - `grid[y][x]` — **שורה ואז עמודה**, כי `get_map` מחזיר רשימה של **שורות**.
      `grid[3]` הוא השורה הרביעית, ורק אחר כך `[5]` בוחר בה את העמודה השישית.
    שתי הצורות נכונות, ושתיהן יישארו. הכלל שמציל: **קראי משמאל לימין ותשאלי מה
    יש לך ביד.** `grid[3]` — רשימה של שורה שלמה. `grid[3][5]` — מחרוזת אחת.
    ואם התהפך לך: `grid[11][3]` על לוח בן שבע שורות ייתן
    `IndexError: list index out of range`, וזה סימן די ברור שהמספרים הוחלפו.

18. **code (runnable)** — scanning one row and asking a question about each cell.
    ```python
    grid = get_map()
    row = grid[3]
    for x in range(len(row)):
        if row[x] == "grass":
            print(f"column {x} is free")
    ```
    Caption: `שימי לב לשוויון: "grass" הוא string, ולכן משווים אותו עם == בדיוק
    כמו בשיעור 5. משבצת "rock" תיפול בבדיקה הזאת — וזה בדיוק מה שאת רוצה, כי על
    סלע אין מה לבנות.`

19. **code (runnable)** — collecting results into a list of lists she builds
    herself. `.append` from lesson 10 meets nesting.
    ```python
    spots = []
    spots.append([1, 2])
    spots.append([3, 4])
    print(spots)
    print(spots[1])
    print(spots[1][0])
    ```
    Output:
    ```
    [[1, 2], [3, 4]]
    [3, 4]
    3
    ```
    Caption: `זו התבנית של קרב הבוס: לסרוק את הלוח, ולאסוף כל משבצת חוקית כזוג
    [x, y] לתוך רשימה אחת. אחר כך spots[i][0] הוא ה־x ו־spots[i][1] הוא ה־y —
    שתי שליפות, משמאל לימין.`

## Try It (ungraded)

The game words work here too, against a practice field, so `get_map()` answers
with a real board.

```python
hydra = {
    "fire": {"hp": 30, "weakness": "water"},
    "ice": {"hp": 20, "weakness": "torch"},
}
print(hydra["fire"])
print(hydra["fire"]["hp"])
for name, head in hydra.items():
    print(f"{name}: {head['hp']} hp")

grid = get_map()
print(len(grid))
print(grid[4])
print(grid[4][0])
```

Intro: *"המפלצת שלך, והלוח שלך. הוסיפי ראשים, שני hp, נסי `hydra["fire"][0]`
ותראי מה קורה. הדפיסי שורה שלמה מהלוח ואז תא בודד מתוכה. פרקי שורה מקוננת לשתי
שורות ותראי מה יש לך ביד באמצע — זה הכלי הכי שימושי בשיעור הזה."*

## The battles

Four training battles, the boss, and an optional one. Level schema:
`spec/09-battle-game.md`.

All six levels were run headless against the vendored engine: **each stated
solution wins its own battle, and an empty program loses every one of them.**

The through-line, and the payoff of the whole act: **`get_map()` returns a list
of lists — literally the board.** Until now the brief told her which squares were
legal. From b2 on it stops telling her. She scans the grid, decides for herself
where a tower may stand, and the gold in every level is exactly the number of
legal squares — so a scan that misses one leaks, and a scan that counts a rock or
a road square runs out of money mid-build.

**Row first.** Every level here depends on `grid[y][x]` while `place_tower` takes
`(x, y)`. Teach block 17 says it out loud; b1 exists to make her feel it.

### b1 — לקרוא את המפה · Reading the Map · 20 XP, 5 🪙

**Why this mechanic** — `grid[y][x]`: two lookups, left to right, on a structure
she did not build. Nothing is asked of her except reading the board correctly,
which is the one skill everything after this depends on.

**level**
```js
{
  map: {
    cols: 12, rows: 7,
    path: [[0,4],[1,4],[2,4],[3,4],[4,4],[4,3],[4,2],[5,2],[6,2],[7,2],[7,3],
           [7,4],[8,4],[9,4],[10,4],[11,4]],
    rock: [[2,2],[9,6]],
  },
  gold: 150, campHp: 3, seed: 40, allowed: ["archer"],
  waves: [
    { delay: 0, enemies: [{ kind: "satyr", count: 5, gap: 0.8 }] },
    { delay: 8, enemies: [{ kind: "hellhound", count: 3, gap: 1.2 }] },
  ],
}
```

**brief** — ``הפקודה get_map() נותנת לך את הלוח עצמו: רשימה של שורות, וכל שורה
רשימה של מחרוזות.

1. הדפיסי כמה שורות יש בלוח וכמה עמודות יש בשורה הראשונה, בצורה `rows: N`
   ו־`columns: N`.
2. שלפי את `grid[4][0]` — כלומר שורה 4, עמודה 0 — למשתנה, והדפיסי
   `grid[4][0] is X`.
3. אותו דבר עבור `grid[3][5]`: `grid[3][5] is X`.
4. עכשיו בני שלוש קשתות בשורה 3, בעמודות 3, 5 ו־9.

שימי לב להיפוך: `grid[y][x]` אבל `place_tower("archer", x, y)`.``

**starter**
```python
grid = get_map()
print(len(grid))
print(len(grid[0]))
print(grid[3][5])
```

**solution**
```python
grid = get_map()
rows = len(grid)
columns = len(grid[0])
gate_square = grid[4][0]
ridge_square = grid[3][5]
print(f"rows: {rows}")
print(f"columns: {columns}")
print(f"grid[4][0] is {gate_square}")
print(f"grid[3][5] is {ridge_square}")
place_tower("archer", 3, 3)
place_tower("archer", 5, 3)
place_tower("archer", 9, 3)
```

**check**
```js
{ kind: "battle",
  also: [
    { kind: "source", mustInclude: ["get_map(", "grid["],
      message: { he: "הקרב הזה דורש לקרוא את הלוח עם get_map ולגשת אליו עם grid[y][x]",
                 en: "This one needs the board read with get_map and addressed as grid[y][x]" } },
    { kind: "output", mode: "contains", expect: "grid[4][0] is path" },
    { kind: "output", mode: "contains", expect: "grid[3][5] is grass" }
  ] }
```

**hints**
1. `` `grid[4][0]` הדפיס `path` ו־`grid[3][5]` הדפיס `grass`. איזה מהמספרים הוא
   השורה ואיזה העמודה? ``
2. `` `grid[4]` הוא רשימה שלמה — שורה 4. ה־`[0]` שאחריו בוחר עמודה בתוך השורה
   הזאת. ב־`place_tower` הסדר הפוך: עמודה קודם. ``
3. `` שלוש שורות בנייה: `place_tower("archer", 3, 3)`, אותו דבר עם 5, ואותו דבר
   עם 9 — כולן בשורה 3. אם קיבלת שגיאת בנייה על הכביש, בדקי מה `grid[3][4]`
   מחזיר, ותראי למה. ``

### b2 — לסרוק שורה · Scanning a Row · 25 XP, 7 🪙

**Why this mechanic** — in lesson 9 the brief handed her `crossings = [2, 4, 6, 8]`.
Here nobody hands her anything: she loops over one row of the grid and asks each
cell what it is. The map has both road crossings **and** boulders in that row, and
the gold covers exactly the grass — so `== "grass"` is required, and "skip the
road" is not enough.

**level**
```js
{
  map: {
    cols: 12, rows: 7,
    path: [[0,4],[1,4],[2,4],[2,3],[2,2],[3,2],[4,2],[4,3],[4,4],[5,4],[6,4],
           [7,4],[7,3],[7,2],[8,2],[9,2],[9,3],[9,4],[10,4],[11,4]],
    rock: [[0,3],[11,3]],
  },
  gold: 300, campHp: 3, seed: 41, allowed: ["archer"],
  waves: [
    { delay: 0,  enemies: [{ kind: "satyr", count: 10, gap: 0.5 }] },
    { delay: 9,  enemies: [{ kind: "hellhound", count: 8, gap: 0.8 }] },
    { delay: 22, enemies: [{ kind: "harpy", count: 8, gap: 0.6 }] },
  ],
}
```

Row 3 of this map reads
`["rock", "grass", "path", "grass", "path", "grass", "grass", "path", "grass", "path", "grass", "rock"]`
— six grass cells at columns 1, 3, 5, 6, 8, 10, which is exactly 300 gold of
archers.

**brief** — `שורה 3 היא הרכס, והדרך חוצה אותה כמה פעמים. יש עליה גם שני סלעים.

אף אחד לא אומר לך הפעם איפה מה. קחי את השורה מהלוח, רוצי על כל העמודות שלה,
ובני קשת בכל משבצת שהיא **"grass"** — לא כביש ולא סלע. ספרי כמה מהן היו, והדפיסי
בסוף `free squares: N`.

הזהב מספיק בדיוק למשבצות הפנויות. אם תבני על סלע, הוא ייגמר לפני הסוף.`

**starter**
```python
grid = get_map()
row = grid[3]
print(row)
```

**solution**
```python
grid = get_map()
row = grid[3]
print(row)
free = 0
for x in range(len(row)):
    if row[x] == "grass":
        place_tower("archer", x, 3)
        free = free + 1
print(f"free squares: {free}")
```

**check**
```js
{ kind: "battle",
  also: [
    { kind: "source", mustInclude: ["get_map(", "range(len(", "if"],
      message: { he: "המשבצות צריכות לצאת מסריקה של השורה בלוח, לא מרשימה שכתבת ביד",
                 en: "The squares must come from scanning the row in the grid, not from a list typed by hand" } },
    { kind: "output", mode: "contains", expect: "free squares: 6" }
  ] }
```

**hints**
1. ``הדפיסי את `row` והסתכלי עליה. כמה ערכים יש בה, וכמה מהם `"grass"`?``
2. `` `for x in range(len(row)):` נותן לך כל עמודה בתורה, ו־`row[x]` הוא מה שיש
   שם. ההשוואה היא `row[x] == "grass"` — עם שני סימני שווה. ``
3. `` `free = 0` לפני הלולאה. אחר כך `for x in range(len(row)):`, בתוכה
   `if row[x] == "grass":`, ובתוכה `place_tower("archer", x, 3)` ו־
   `free = free + 1`. ה־print של `free squares` יושב אחרי הלולאה, בלי הזחה.
   שימי לב שה־`x` של הלולאה הוא בדיוק ה־`x` של `place_tower` — כי שניהם עמודה.
   אם תבדקי רק `!= "path"`, תבני גם על שני הסלעים והזהב ייגמר. ``

### b3 — לסרוק את כל הלוח · Scanning the Whole Board · 30 XP, 8 🪙

**Why this mechanic** — a loop inside a loop over a list of lists, plus a
question that reaches into the *next row down*: `grid[y][x] == "grass" and
grid[y + 1][x] == "path"`. That single condition is the definition of a good
tower spot, written in code, and it finds all eight of them on a map she has
never seen.

**level**
```js
{
  map: {
    cols: 12, rows: 7,
    path: [[0,5],[1,5],[2,5],[3,5],[3,4],[3,3],[4,3],[5,3],[6,3],[6,4],[6,5],
           [7,5],[8,5],[9,5],[10,5],[11,5]],
    rock: [[0,4],[1,4],[10,4],[11,4]],
  },
  gold: 400, campHp: 3, seed: 42, allowed: ["archer"],
  waves: [
    { delay: 0,  enemies: [{ kind: "satyr", count: 10, gap: 0.5 }] },
    { delay: 9,  enemies: [{ kind: "hellhound", count: 8, gap: 0.7 }] },
    { delay: 20, enemies: [{ kind: "harpy", count: 10, gap: 0.5 }] },
    { delay: 32, enemies: [{ kind: "hellhound", count: 6, gap: 0.7 }] },
  ],
}
```

The scan finds exactly eight squares — `(3,2) (4,2) (5,2) (6,2) (2,4) (7,4)
(8,4) (9,4)` — and eight archers is exactly 400 gold. The four boulders sit in
row 4 beside the road on purpose: they are grass-shaped traps for a scan that
forgets to check the cell it is standing on.

**brief** — ``הפעם לא נתונה לך שורה. סרקי את הלוח כולו.

הכלל של כירון למקום טוב: **משבצת דשא שיושבת ישירות מעל משבצת דרך.** משם רואים את
המפלצות עוברות מתחת.

רוצי על כל שורה `y`, ובתוכה על כל עמודה `x`, ובני קשת כשמתקיימים שני התנאים
יחד: `grid[y][x]` הוא `"grass"` **וגם** `grid[y + 1][x]` הוא `"path"`.

ספרי כמה משבצות כאלה מצאת והדפיסי בסוף `build spots: N`.

שימי לב לגבול: אם `y` יגיע לשורה האחרונה, `y + 1` יחרוג מהלוח. לכן הלולאה
החיצונית רצה עד `len(grid) - 1`.

הזהב מספיק בדיוק למספר המשבצות שהסריקה תמצא.``

**starter**
```python
grid = get_map()
for y in range(len(grid) - 1):
    print(grid[y])
```

**solution**
```python
grid = get_map()
found = 0
for y in range(len(grid) - 1):
    row = grid[y]
    for x in range(len(row)):
        if row[x] == "grass" and grid[y + 1][x] == "path":
            place_tower("archer", x, y)
            found = found + 1
print(f"build spots: {found}")
```

**check**
```js
{ kind: "battle",
  also: [
    { kind: "source", mustInclude: ["get_map(", "grid[y + 1][x]", "for"],
      message: { he: "צריך לסרוק את הלוח ולשאול גם על המשבצת שמתחת — grid[y + 1][x]",
                 en: "The board must be scanned, and the cell below asked about too — grid[y + 1][x]" } },
    { kind: "output", mode: "contains", expect: "build spots: 8" }
  ] }
```

**hints**
1. `מה ההבדל בין "המשבצת הזאת היא דשא" לבין "המשבצת הזאת שווה משהו"? מה עוד צריך
   להיות נכון כדי שמגדל שם יירה?`
2. `` שתי לולאות מקוננות: החיצונית על `range(len(grid) - 1)` נותנת `y`, הפנימית
   על `range(len(row))` נותנת `x`. התנאי מחבר שתי שאלות עם `and` משיעור 5. ``
3. `` `found = 0` → `for y in range(len(grid) - 1):` → `row = grid[y]` →
   `for x in range(len(row)):` → `if row[x] == "grass" and grid[y + 1][x] == "path":`
   → `place_tower("archer", x, y)` ו־`found = found + 1`. ה־print של
   `build spots` אחרי שתי הלולאות, בלי הזחה. שימי לב שה־`y` של הבנייה הוא השורה
   של הדשא, לא של הדרך. אם תרוצי עד `len(grid)` במקום `len(grid) - 1`, השורה
   האחרונה תבקש את `grid[7]` על לוח בן שבע שורות — `IndexError`. ``

### b4 — תוכנית בתוך תוכנית · A Plan Inside a Plan · 30 XP, 8 🪙

**Why this mechanic** — the build plan itself becomes nested data: a list whose
every entry is `[kind, x, y]`. She reads it with `entry[0]`, `entry[1]`,
`entry[2]`, and checks each entry against the grid before trusting it. One entry
in the plan is wrong — the scout marked a square the road has since taken — and
without the check it is a build error and a lost battle.

**level**
```js
{
  map: {
    cols: 13, rows: 8,
    path: [[0,5],[1,5],[2,5],[3,5],[4,5],[4,4],[4,3],[5,3],[6,3],[7,3],[8,3],
           [8,4],[8,5],[9,5],[10,5],[11,5],[12,5]],
    rock: [[6,6],[1,2]],
  },
  gold: 350, campHp: 3, seed: 43, allowed: ["archer", "cannon", "ice"],
  waves: [
    { delay: 0,  enemies: [{ kind: "satyr", count: 6, gap: 0.7 }] },
    { delay: 8,  enemies: [{ kind: "hellhound", count: 6, gap: 1.0 }] },
    { delay: 20, enemies: [{ kind: "cyclops", count: 2, gap: 1.5 }] },
  ],
}
```

**brief** — ``אנבת' שלחה תוכנית שלמה, ובתוכה שש שורות. כל שורה היא רשימה קטנה:
סוג המגדל, עמודה, שורה.

plan = [["cannon", 6, 4], ["archer", 2, 4], ["ice", 10, 4],
        ["archer", 5, 2], ["cannon", 11, 4], ["archer", 4, 3]]

אחת מהשש כבר לא תקפה — הדרך זזה מאז שהיא סימנה אותה. אל תחפשי אותה בעיניים:
לפני כל בנייה, שאלי את הלוח אם המשבצת הזאת עדיין `"grass"`. אם כן — בני. אם לא —
הדפיסי בדיוק את השורה הזאת:

KIND at X,Y would stand on the road

הזהב מספיק בדיוק לחמש השורות התקפות.``

**starter**
```python
plan = [["cannon", 6, 4], ["archer", 2, 4], ["ice", 10, 4], ["archer", 5, 2], ["cannon", 11, 4], ["archer", 4, 3]]
print(plan[0])
print(plan[0][0])
print(len(plan))
```

**solution**
```python
grid = get_map()
plan = [["cannon", 6, 4], ["archer", 2, 4], ["ice", 10, 4], ["archer", 5, 2], ["cannon", 11, 4], ["archer", 4, 3]]
for entry in plan:
    kind = entry[0]
    x = entry[1]
    y = entry[2]
    if grid[y][x] == "grass":
        place_tower(kind, x, y)
    else:
        print(f"{kind} at {x},{y} would stand on the road")
```

**check**
```js
{ kind: "battle",
  also: [
    { kind: "source", mustInclude: ["get_map(", "entry[0]", "grid[y][x]"],
      message: { he: "כל שורה בתוכנית נקראת עם entry[0], entry[1], entry[2], ונבדקת מול הלוח לפני הבנייה",
                 en: "Each plan row is read with entry[0], entry[1], entry[2] and checked against the grid before building" } },
    { kind: "output", mode: "contains", expect: "archer at 4,3 would stand on the road" }
  ] }
```

**hints**
1. `בכל סיבוב של הלולאה, מה בדיוק יושב במשתנה — מחרוזת, מספר, או רשימה של
   שלושה?`
2. `` `for entry in plan:` נותן בכל סיבוב רשימה קטנה. `entry[0]` הוא הסוג,
   `entry[1]` העמודה, `entry[2]` השורה. הבדיקה היא `grid[entry[2]][entry[1]]` —
   שורה קודם. ``
3. `` שמרי את שלושת החלקים במשתנים בשם `kind`, `x` ו־`y` בשורות נפרדות — ואז
   התנאי נקרא `grid[y][x] == "grass"`, וזה קריא הרבה יותר. `if` בונה, `else`
   מדפיס. חמישה מגדלים ייבנו, אחד יידלג, והזהב יסתדר בדיוק. ``

## BOSS — ההידרה · The Hydra · 60 XP, 15 🪙

> `boss: { name: { he: "ההידרה", en: "The Hydra" }, icon: "🐲", hp: 5 }`
> חמישה גלים, ולכל גל שנעצר יורד ראש מהמד. אי אפשר להפסיד באמת — קרב שנכשל לא
> עולה כלום, ואפשר לרוץ עליו שוב ושוב.

**Why this mechanic** — everything nested, at once. The **map** is a list of
lists she scans to build a list of lists of her own (`spots.append([x, y])`),
which she then reads back with `spots[i][0]` and `spots[i][1]`. The **brood** is
nested too — `[["hydra", 3], ["hellhound", 14], ...]` — because the Hydra splits:
one comes out of the water, and two more grow behind it. She counts the brood
with `entry[1]`, checks the total against `len(get_wave())`, and `brood[0][0]`
decides whether the ford needs ice.

There is no version of this battle that can be won by typing coordinates. The
scan finds thirteen legal squares on an eighteen-column map, and thirteen is
exactly what it takes: **twelve archers plus both ice towers still lose.**

**level**
```js
{
  map: {
    cols: 18, rows: 10,
    path: [[0,5],[1,5],[2,5],[3,5],[4,5],[4,4],[4,3],[5,3],[6,3],[7,3],[7,4],
           [7,5],[8,5],[9,5],[10,5],[10,6],[10,7],[11,7],[12,7],[13,7],[13,6],
           [13,5],[14,5],[15,5],[16,5],[17,5]],
    rock: [[0,4],[1,4],[2,4],[16,4],[17,4],[8,8]],
  },
  gold: 790, campHp: 5, seed: 44, allowed: ["archer", "ice"],
  waves: [
    { delay: 0,  enemies: [{ kind: "hydra", count: 1, gap: 1 }] },
    { delay: 9,  enemies: [{ kind: "hellhound", count: 6, gap: 0.7 }] },
    { delay: 18, enemies: [{ kind: "hydra", count: 2, gap: 2.5 }] },
    { delay: 30, enemies: [{ kind: "harpy", count: 12, gap: 0.45 }] },
    { delay: 40, enemies: [{ kind: "hellhound", count: 8, gap: 0.5 },
                           { kind: "cyclops", count: 6, gap: 0.9 }] },
  ],
}
```

The scan finds `(4,2) (5,2) (6,2) (7,2) (3,4) (8,4) (9,4) (10,4) (13,4) (14,4)
(15,4) (11,6) (12,6)` — thirteen squares. Thirteen archers is 650, the two ice
towers are 140, and the level's gold is 790: exactly that build and not one
tower more. **No cannons here** — twelve harpies come over the ridge in the
fourth wave, and artillery cannot touch them.

**brief** — ``המים רותחים. מתוכם עולה ההידרה — ומאחוריה עוד שתיים, כי ראש שנכרת
מצמיח שניים.

הסיירת מסרה את ההרכב בצורה מקוננת, שורה לכל סוג:

brood = [["hydra", 3], ["hellhound", 14], ["harpy", 12], ["cyclops", 6]]

**חלק א׳ — הדיווח.** עברי על brood, הדפיסי שורה לכל סוג בצורה `NAME x N`, וחברי
את כל הכמויות. הדפיסי שתי שורות סיכום:

monsters in the brood: N
monsters in the wave: N

השנייה מגיעה מ־`len(get_wave())`, ושני המספרים חייבים לצאת זהים.

**חלק ב׳ — הסריקה.** סרקי את הלוח כמו בקרב הקודם ואספי כל משבצת חוקית לתוך
רשימה בשם spots, כל אחת כזוג [x, y]. הדפיסי `build spots: N`.

**חלק ג׳ — הבנייה.** בני קשת בכל משבצת ברשימה, לפי spots[i][0] ו־spots[i][1].
ואם השורה הראשונה ב־brood היא של ההידרה, הוסיפי שני מגדלי קרח ב־(11, 8)
וב־(12, 8) — הם לא עושים כמעט נזק, הם קונים לקשתות את הזמן שהן צריכות.

הזהב מספיק בדיוק לזה. מגדל אחד פחות, וההידרה השלישית מגיעה לשער.``

**starter**
```python
brood = [["hydra", 3], ["hellhound", 14], ["harpy", 12], ["cyclops", 6]]
grid = get_map()
print(brood[0])
print(brood[0][1])
print(len(grid))
```

**solution**
```python
grid = get_map()
brood = [["hydra", 3], ["hellhound", 14], ["harpy", 12], ["cyclops", 6]]

counted = 0
for entry in brood:
    print(f"{entry[0]} x {entry[1]}")
    counted = counted + entry[1]
print(f"monsters in the brood: {counted}")
print(f"monsters in the wave: {len(get_wave())}")

spots = []
for y in range(len(grid) - 1):
    row = grid[y]
    for x in range(len(row)):
        if row[x] == "grass" and grid[y + 1][x] == "path":
            spots.append([x, y])
print(f"build spots: {len(spots)}")

for i in range(len(spots)):
    place_tower("archer", spots[i][0], spots[i][1])

if brood[0][0] == "hydra":
    place_tower("ice", 11, 8)
    place_tower("ice", 12, 8)
```

**check**
```js
{ kind: "battle",
  also: [
    { kind: "source", mustInclude: ["get_map(", "spots.append(", "spots[i][0]", "brood[0][0]"],
      message: { he: "הבוס דורש את המבנים המקוננים עצמם: סריקה שאוספת [x, y] לרשימה, וקריאה של brood לפי שני מספרים",
                 en: "The boss needs the nested structures themselves: a scan collecting [x, y] into a list, and brood read by two indexes" } },
    { kind: "output", mode: "contains", expect: "monsters in the brood: 35" },
    { kind: "output", mode: "contains", expect: "monsters in the wave: 35" },
    { kind: "output", mode: "contains", expect: "build spots: 13" }
  ] }
```

### Fight staging

- The bar shows **five heads**, one per wave. A wave that is cleared without a
  leak takes a head down, with a short cut animation and two smaller heads
  sprouting behind it — cosmetic only, and disabled under
  `prefers-reduced-motion: reduce`.
- The heads come down **during the replay**, because the whole battle is
  simulated before the first frame is drawn: the outcome is already known and the
  bar is reading a recording.
- **Losing costs nothing.** There is no failure state beyond "the camp fell, run
  it again", no timer, and the level's seed means the same build always plays out
  the same way — so a change she makes is a change she can actually attribute.
- Failure text is diagnostic and never scolding. The engine already distinguishes
  the cases that matter: a tower that never saw a monster, a cannon that watched
  flyers pass, gold that ran out mid-build, a tower on the road. The boss adds
  one line of its own: *"הסריקה מצאה 12 משבצות. יש 13. איזו שורה בלוח לא נבדקה?"*

**hints**
1. `` שלושה חלקים, ורק אחד מהם חדש. איזה מהם את כבר כתבת בקרב הקודם, כמעט מילה
   במילה? ``
2. `` הסריקה זהה ל־b3 עם שינוי אחד: במקום `place_tower` בתוך ה־`if`, כתבי
   `spots.append([x, y])`. הבנייה נעשית אחר כך, בלולאה שנייה, על הרשימה שנאספה:
   `place_tower("archer", spots[i][0], spots[i][1])`. ``
3. `` סדר העבודה: `grid = get_map()` → `brood` → לולאה על `brood` שמדפיסה
   `{entry[0]} x {entry[1]}` ומחברת ל־`counted` → הדפסת `counted` ו־
   `len(get_wave())` → `spots = []` ואז הסריקה המקוננת עם `spots.append([x, y])`
   → הדפסת `len(spots)` → לולאה `for i in range(len(spots)):` שבונה קשת →
   `if brood[0][0] == "hydra":` עם שני מגדלי הקרח ב־(11, 8) וב־(12, 8).
   אם הסריקה מצאה 12 במקום 13, בדקי את הגבול של הלולאה החיצונית: `len(grid) - 1`,
   לא `len(grid) - 2`. ``

## Optional battle — לראות רשימה מסתדרת · Watch It Sort Itself · 30 XP, 8 🪙

> **אופציונלי.** לא חוסם את סוף המערכה, לא נדרש לגיזה, ואפשר לחזור אליו מהמפה
> מתי שבא לך. הוא כאן כי זה יפה.

**Why this mechanic** — `sorted()` came free in lesson 10; here she writes what
it does inside. Two parallel lists have to move together on every swap, which is
the whole reason a swap needs a temporary variable — and the reward is not a
printed list, it is which three columns get the only three towers she can afford.

**level** — the doubled bay from lesson 10, a season later.
```js
{
  map: {
    cols: 14, rows: 9,
    path: [[0,6],[1,6],[2,6],[3,6],[4,6],[4,5],[4,4],[3,4],[2,4],[1,4],[1,3],
           [1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2],[11,2],
           [12,2],[13,2]],
    rock: [[12,6]],
  },
  gold: 150, campHp: 3, seed: 45, allowed: ["archer"],
  waves: [
    { delay: 0,  enemies: [{ kind: "satyr", count: 5, gap: 0.8 }] },
    { delay: 10, enemies: [{ kind: "hellhound", count: 3, gap: 1.1 }] },
  ],
}
```

**brief** — `אסור sorted, אסור .sort, אסור max ואסור min.

spots = [9, 2, 11, 5, 7]
coverage = [1, 5, 1, 4, 3]

סדרי את spots לפי coverage, מהכיסוי הגדול לקטן, בעצמך: עברי על הרשימה שוב ושוב,
ובכל מעבר החליפי כל שני שכנים שיושבים בסדר הפוך — **ותחליפי גם ב־spots, באותו
מקום.** הדפיסי את spots אחרי כל מעבר.

בסוף, קחי את שלוש הראשונות, הדפיסי אותן בצורה `best three: [...]`, ובני עליהן.
יש זהב לשלוש בדיוק.`

**starter**
```python
spots = [9, 2, 11, 5, 7]
coverage = [1, 5, 1, 4, 3]
print(spots)
print(coverage)
```

**solution**
```python
spots = [9, 2, 11, 5, 7]
coverage = [1, 5, 1, 4, 3]
print(f"start: {spots}")

for p in range(len(coverage) - 1):
    for i in range(len(coverage) - 1):
        if coverage[i] < coverage[i + 1]:
            bigger = coverage[i]
            coverage[i] = coverage[i + 1]
            coverage[i + 1] = bigger
            moved = spots[i]
            spots[i] = spots[i + 1]
            spots[i + 1] = moved
    print(f"pass {p + 1}: {spots}")

best_three = spots[0:3]
print(f"best three: {best_three}")
for x in best_three:
    place_tower("archer", x, 3)
```

**check**
```js
{ kind: "battle",
  also: [
    { kind: "source", mustExclude: ["sorted(", ".sort(", "max(", "min("],
      message: { he: "כל העניין פה הוא לכתוב את המיון בעצמך — sorted, .sort, max ו־min מחוץ למשחק",
                 en: "The whole point is writing the sort yourself — no sorted, no .sort, no max, no min" } },
    { kind: "output", mode: "contains", expect: "best three: [2, 5, 7]" }
  ] }
```

**hints**
1. `` אם תכתבי `a = b` ואז `b = a` — מה קרה לערך המקורי של `a`? ומה קורה
   ל־`spots` אם החלפת רק ב־`coverage`? ``
2. `` ההחלפה היא שלוש שורות לכל רשימה: משתנה עזר, העתקה, והחזרה. שתי הרשימות
   חייבות להתחלף **יחד** ובאותם שני מקומות, אחרת המספר של משבצת אחת יישב על
   משבצת אחרת. הלולאה הפנימית רצה על `range(len(coverage) - 1)`, כי `i + 1` צריך
   להישאר בתוך הרשימה. ``
3. `` לולאה חיצונית `for p in range(len(coverage) - 1)` — ארבעה מעברים לרשימה של
   חמישה. בתוכה הלולאה הפנימית עם `if coverage[i] < coverage[i + 1]:` ושש שורות
   ההחלפה. ה־`print` של המעבר יושב בתוך החיצונית ומחוץ לפנימית. בסוף
   `spots[0:3]` ולולאת בנייה בשורה 3. הסימן `<` ולא `>` — כי הפעם מסדרים מהגדול
   לקטן. ``

## Reward & Recap

**Item**: 🐑 **גיזת הזהב / The Golden Fleece** — `מה שכל המסע היה בשבילו. היא
מחזירה לחיים דברים גוססים — ויש עץ אחד על גבעה אחת שמחכה לה.` (Also adds bead
#12; the necklace is now three-fifths full.)

**Act III closes here.** The cutscene: the Fleece goes home, the tree on the hill
takes colour back, the camp border seals. Chiron says one line about what comes
next — the same three lines she has now written four times are about to get a
name.

**Achievements possible here**:
- *Hydra Slayer* — win the boss battle: all five waves, not one leak.
- *Cartographer of Monsters* — win the boss on the first run in which the scan
  reports 13 spots, having worked out the `len(grid) - 1` boundary alone.
- *Bubble Watcher* — win the optional battle without the gods' tools.
- *Completionist* — every battle in Act III, lessons 9 through 12.

**Recap bullets**:
- ערך בתוך רשימה או מילון יכול להיות **רשימה או מילון בעצמו** — בלי חוקים חדשים
- `x[0][1]` הוא שתי שליפות משמאל לימין; כשלא ברור — הדפיסי את השלב האמצעי
- `IndexError` על שורה מקוננת יכול להגיע משני מספרים שונים; פרקי אותה לשתי שורות
- לולאה בתוך לולאה עוברת על מבנה מקונן; ההזחה היא מה שקובע מי בתוך מי
- ספירה וחיפוש הן אותן שתי תבניות מלולאות רגילות — accumulator, ו"הכי טוב עד עכשיו"
- רשימה עונה למספרים, מילון עונה לשמות; בחירת המבנה היא החלטה, לא טעם
- `get_map()` מחזיר רשימה של שורות — הלוח עצמו. `grid[y][x]`: **שורה קודם**
- `place_tower(kind, x, y)` הוא עמודה קודם. שתי הצורות נכונות, ושתיהן יישארו

**Next teaser**: *"שמת לב שכתבת את אותה לולאת סיכום ארבע פעמים היום? בשיעור הבא
דדלוס יראה לך איך לכתוב אותה פעם אחת ולתת לה שם — ומשם, כל תוכנית שתכתבי תיראה
אחרת."*

## Common mistakes to anticipate

| She does | She sees | Hint must cover |
| --- | --- | --- |
| `heads[1][2]` on `["ice", 20]` | `IndexError: list index out of range (line 2)` | the *inner* index is the guilty one — split the line to find out |
| `hydra["fire"][0]` on a dict of dicts | `KeyError: 0 (line 2)` | a dict has no positions; ask it by name |
| `head["HP"]` | `KeyError: HP (line 2)` | keys are case-sensitive, at every level |
| `heads[0][0][0]` on a plain string/number | `TypeError: 'int' does not support indexing (line 2)` | one `[ ]` too many — check what you had in hand |
| inner `print` outside the inner loop | one item per person instead of all of them | indentation decides which loop a line belongs to |
| summary `print` inside the loop | the summary repeats every round | de-indent it to the outer level |
| `for name, head in hydra:` | `ValueError: too many values to unpack (expected 2) (line 2)` | `.items()` yields pairs; a bare dict yields keys |
| swapping with `a = b` then `b = a` | both slots end up with the same value | a temporary variable is required (optional battle) |
| inner loop to `range(len(x))` in bubble sort | `IndexError` on the last `i + 1` | stop at `len(x) - 1` |
| `grid[x][y]` instead of `grid[y][x]` | usually `IndexError`, sometimes a silently wrong square | `get_map` returns **rows**; `place_tower` takes **columns** first |
| loop to `range(len(grid))` in b3 | `IndexError` on the very last row's `y + 1` | stop at `len(grid) - 1`, exactly as with `i + 1` in a list |
| `!= "path"` instead of `== "grass"` | towers on boulders, then *"Not enough gold"* | a cell has three possible values, not two |
| builds inside the scan in the boss instead of collecting | it works, and then nothing can be counted or reported | `spots.append([x, y])` first, build second — that is what makes 13 a number she can print |
| `spots[i]` where `spots[i][0]` was meant | `TypeError` from `place_tower`, or a tower in a strange place | `spots[i]` is a pair; the coordinates are one level deeper |

## Implementation notes

- Every code sample and every solution here was executed against the vendored
  `skulpt.min.js`, and **every level was simulated headless**: each solution wins
  its own battle and an empty program loses all six. Verified nested access:
  `x[a][b]`, `d[k][k2]`, `d[k][index]`, `len()` at both levels, `.items()` over a
  dict of dicts, `list.append([x, y])` followed by `spots[i][0]`, and nested
  quotes inside an f-string (`f"{head['hp']}"`).
- **`get_map()` returns exactly `level.map.rows` rows of `level.map.cols`
  strings**, values `"grass"` / `"path"` / `"rock"`, indexed `grid[y][x]`. The
  practice field behind the teach blocks and the Try It editor is 7×10 with the
  road on row 4, so any sample here stays inside those bounds — a starter that
  reads `grid[4][11]` would raise on the training ground even though it is
  correct in its own level. Keep starters inside 7 rows and 10 columns.
- **Every level pairs the battle with an `also` array**: a `source` rule for the
  nested access and an `output` rule (`mode: "contains"`) for a number that only
  a real scan produces — `free squares: 6`, `build spots: 8`, `build spots: 13`,
  `grid[4][0] is path`. This is the strongest forcing device the act has: a
  learner who ignores `get_map()` and types thirteen coordinates wins the fight
  and still fails the level, because she cannot print the count she never
  computed. Each brief states the exact line to print.
- **The simulation does not reject a tower on a `rock` cell** — it only rejects
  the path, an occupied cell, an off-map cell and one it cannot afford. Rocks are
  enforced by *gold*: b2 and b3 give exactly the grass count, so a scan that
  accepts a boulder runs out mid-build and fails with a `tooPoor` build error.
  Never write a level that depends on a rock refusing a tower.
- `hp: 5` on the boss object means five bar segments, one per **wave** — it is
  not a Python value and has nothing to do with the Hydra's 300 hit points in the
  simulation. Keep the two apart in the UI copy.
- The boss's `campHp: 5` is deliberately the largest in the act, and the
  objective is still perfect: `check.campHpAtLeast` defaults to the full value,
  so five hearts means five heads, not five free leaks.
- **The boss allows no cannon.** Twelve harpies arrive in wave four, artillery
  cannot hit anything flying, and a cannon in that budget would be 90 gold spent
  on a spectator. This is also why the level's gold is exactly 13 archers plus 2
  ice: there is one correct build, and the map is what tells her where it goes.
- Dict iteration order is preserved in this Skulpt build, but nothing here relies
  on it: every build order comes from an explicit list (`plan`, `brood`, `spots`,
  and the grid itself). The rule from lesson 11 stands — never let a graded check
  depend on dict ordering, and in the battle model, never let the *outcome*
  depend on it either.
- **A `source` check reads a skeleton with comments and string literals
  stripped**, so a required construct must appear outside a string. The boss's
  `spots.append(`, `spots[i][0]` and `brood[0][0]` all do.
- The optional battle never blocks the Act III cutscene, the Golden Fleece, or
  the unlock of lesson 13. Its XP is a bonus on top of the lesson budget.
- Nothing in this lesson uses `def`, `return`, `import`, `input()`, tuple
  unpacking outside `.items()`, list comprehensions, or `while` — the swap in the
  optional battle is written with an explicit temporary variable for exactly that
  reason.
