# Lesson 02 — The Camp Necklace · שרשרת המחנה

> **Act I — Camp Half-Blood** · Stop 2 of 20
> Follows the reference structure in `spec/lessons/lesson-01.md`.
> Schema: `spec/04-lesson-template.md` · Battle contract: `spec/09-battle-game.md`.

| | |
| --- | --- |
| **id** | `02` |
| **slug** | `the-camp-necklace` |
| **minutes** | 25–30 |
| **concepts** | variables, assignment, reassignment, `str` / `int` / `float`, `type()` |
| **new vocabulary** | `=`, `type` |
| **requires** | lesson 1 — `print()`, strings, quotes, comments, `place_tower()`, reading an error |
| **API available** | `place_tower`, `get_gold`, `tower_cost`, `camp_hp` (build script only) |
| **towers** | 🏹 archer only |
| **item** | 🪢 רצועת העור / The Leather Cord |
| **XP** | 20 + 20 + 25 + 30 (four battles) + 50 (great battle) + 30 (bonus) = **175** |
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

13. **prose + code (runnable)** — the block that carries the lesson into the
    battles. A name works **anywhere a value worked**, including inside the game
    commands from lesson 1.
    ```python
    kind = "archer"
    row = 3
    place_tower(kind, 2, row)
    place_tower(kind, 5, row)
    ```
    Caption (he): *"אותה פקודה מאתמול, רק ששני מהערכים קיבלו שם. שימי לב מה קורה
    אם תשני את `row` ל-5: שני המגדלים זזים ביחד, כי שניהם שואלים את אותו שם."*
    (en): *"The same command as yesterday, with two of the values given names.
    Notice what happens if you change `row` to 5: both towers move together,
    because both of them ask the same name."*
    This is also where the numbers stop being decoration: `get_gold()` hands back
    an `int` she can name, and `type()` proves it.
    ```python
    gold = get_gold()
    print(gold)
    print(type(gold))
    ```

14. **prose** — The honest limitation, and the hook for tomorrow: right now each
    `print` shows one value on a line of its own, so her battle report looks like
    a shopping list. Tomorrow she learns to weave names into a sentence — and to
    let the program ask *her* a question before the wave starts. (Do not
    demonstrate f-strings here. They belong to lesson 3.)

## Try It (ungraded)

Free-play editor. Nothing is checked, nothing is scored. The game words are
available here too, against the practice field, so a `place_tower` line runs
without error even though nothing is defended.

```python
hero = "Percy"
cabin = "Poseidon"
beads = 1

print(hero)
print(cabin)
print(beads)

gold = get_gold()
print(gold)
print(type(gold))
```

Intro (he): *"המגרש שלך. שני את הערכים למה שבא לך, תוסיפי משתנה משלך, ונסי גם
`print(type(cabin))` כדי לראות מה Python חושב שיש שם. שום דבר פה לא נבדק."*
(en): *"Your playground. Change the values, add a variable of your own, and try
`print(type(cabin))` to see what Python thinks it is holding. Nothing here is
graded."*

## The battles

Lesson 2 is played entirely as battle levels (`spec/09-battle-game.md`). There are
no abstract exercises: every task below is a real defense of Camp Half-Blood that
her build script commands. All five levels use `allowed: ["archer"]`: lesson 4
hands her a cannon for the Minotaur, and *choosing* between tower kinds inside one
battle waits for `if` in lesson 6.

**What forces variables here.** A build script can always be written with the
numbers typed in by hand, so each level does two things: the map is built so the
same value is needed in three, four or six places, and the level's `check.also`
carries a `source` rule naming the variables the plan must use. A level she can
beat by typing `place_tower("archer", 2, 3)` four times is not teaching lesson 2,
and the checker says so in words rather than failing silently.

Every level below was played against the real simulation
(`assets/js/battle/sim.js`) before it was written down: the stated solution wins
with the camp untouched, an empty program loses, and the near-misses listed under
each level were run too.

### b1 — שם למשבצת / A Name for a Square · 20 XP, 5 🪙

**Why this mechanic**: `place_tower` takes a name in exactly the place it took a
value yesterday. The starter hands her two finished variables and no tower — the
only way to get a tower on the field is to put those names inside the brackets.

**brief (he)**: *"שלושה סאטירים בשביל, ומשבצת דשא אחת שמעניינת אותנו: עמודה 2,
שורה 3.\n\nשתי השורות הראשונות כבר כתובות: `kind` מחזיק את סוג המגדל, ו-`row`
מחזיק את מספר השורה. הוסיפי שורה שלישית שמציבה מגדל — אבל במקום להקליד את
הערכים, שימי בסוגריים את **השמות**."*

**brief (en)**: *"Three satyrs on the road, and one patch of grass that matters:
column 2, row 3.\n\nThe first two lines are already written: `kind` holds the kind
of tower, `row` holds the row number. Add a third line that places a tower — but
instead of typing the values, put the **names** inside the brackets."*

**level**
```js
map: { cols: 8, rows: 6, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4]] },
gold: 60, campHp: 3, seed: 1, allowed: ["archer"],
waves: [ { delay: 0, enemies: [ { kind: "satyr", count: 3, gap: 1.6 } ] } ],
```

**starter**
```python
kind = "archer"
row = 3
```

**solution**
```python
kind = "archer"
row = 3
place_tower(kind, 2, row)
```

**check**
```js
check: {
  kind: "battle",
  also: { kind: "source", mustInclude: ["kind", "row"],
    message: { he: "המגדל צריך לקבל את השמות `kind` ו-`row`, לא את הערכים מוקלדים ביד",
               en: "The tower has to receive the names `kind` and `row`, not the values typed by hand" } }
}
```

**Verified**: one archer at `(2, 3)` clears all three satyrs at 3/3 camp HP.
`row = 0` places the tower three cells from the road and it never fires — which
is the failure the engine explains for her. `row = 5` also wins; both sides of the
road are legal and that is worth her discovering.

**hints**
1. *nudge* (he): *"שתי השורות הראשונות כבר יצרו שני שמות. מה `kind` מחזיק כרגע, ומה `row` מחזיק?"*
   (en): *"The first two lines already made two names. What is inside `kind` right now, and what is inside `row`?"*
2. *tool* (he): *"`place_tower` מקבל שלושה דברים: סוג, עמודה, שורה. במקום הראשון והשלישי אפשר לשים שם של משתנה בלי גרשיים, בדיוק כמו ב-`print(hero)`."*
   (en): *"`place_tower` takes three things: kind, column, row. In the first and third slot you can put a variable name without quotes, exactly like in `print(hero)`."*
3. *walkthrough* (he): *"השורה השלישית היא `place_tower(kind, 2, row)`. `kind` בלי גרשיים — Python מחפש את השם ומוצא בפנים את `\"archer\"`. העמודה 2 נשארת מספר מוקלד, כי לא נתנו לה שם. `row` מביא את 3."*
   (en): *"The third line is `place_tower(kind, 2, row)`. `kind` with no quotes — Python looks the name up and finds `\"archer\"` inside. The column 2 stays a typed number, because we never named it. `row` brings the 3."* → solution unlocks.

### b2 — אותה שורה, ארבע פעמים / The Same Row, Four Times · 20 XP, 5 🪙

**Why this mechanic**: four towers, one row, one kind. Written with values, the
plan repeats `"archer"` and `3` four times each; written with names, the row is
decided in one place. The level is tuned so that three towers lose, so she cannot
stop at two lines and hope.

**brief (he)**: *"הפעם מגיעים גם כלבי גיהינום, והם עבים. ארבעה סאטירים מהירים
קודם, ואחריהם ארבעה כלבים עם שריון.\n\nיש לך 220 זהב וקשת עולה 50 — כלומר בדיוק
ארבעה מגדלים. פזרי אותם לאורך הדרך, כולם על אותה שורה, ותני לשורה שם."*

**brief (en)**: *"This time hellhounds are coming too, and they are thick-skinned.
Four fast satyrs first, then four armoured dogs.\n\nYou have 220 gold and an
archer costs 50 — which is exactly four towers. Spread them along the road, all on
the same row, and give that row a name."*

**level**
```js
map: { cols: 12, rows: 7, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4]] },
gold: 220, campHp: 3, seed: 2, allowed: ["archer"],
waves: [
  { delay: 0, enemies: [ { kind: "satyr", count: 4, gap: 0.8 } ] },
  { delay: 9, enemies: [ { kind: "hellhound", count: 4, gap: 1.3 } ] },
],
```

**starter**
```python
kind = "archer"
row = 3
place_tower(kind, 1, row)
```

**solution**
```python
kind = "archer"
row = 3
place_tower(kind, 1, row)
place_tower(kind, 4, row)
place_tower(kind, 7, row)
place_tower(kind, 10, row)
```

**check**
```js
check: {
  kind: "battle",
  also: { kind: "source", mustInclude: ["kind", "row"],
    message: { he: "כל מגדל צריך לקבל את `kind` ואת `row` — שם אחד לסוג, שם אחד לשורה",
               en: "Every tower must receive `kind` and `row` — one name for the kind, one for the row" } }
}
```

**Verified**: four archers at columns 1, 4, 7 and 10 hold at 3/3. Three archers
leak two monsters. Four on row 5 (the other side of the road) also wins. A fifth
`place_tower` costs her nothing at all: there are only 20 drachmas left, the
engine refuses the build and tells her the tower costs 50.

**hints**
1. *nudge* (he): *"220 חלקי 50 — כמה מגדלים זה? וכמה שורות `place_tower` יש לך כרגע?"*
   (en): *"220 divided by 50 — how many towers is that? And how many `place_tower` lines do you have right now?"*
2. *tool* (he): *"העתיקי את השורה שכבר קיימת עוד שלוש פעמים ושני **רק את העמודה** בכל אחת. `kind` ו-`row` נשארים אותם שמות בכל ארבע השורות."*
   (en): *"Copy the line you already have three more times and change **only the column** in each. `kind` and `row` stay the same names on all four lines."*
3. *walkthrough* (he): *"ארבע שורות, אותו סוג, אותה שורה, עמודות שונות: `1`, `4`, `7`, `10`. אם אחר כך תרצי להעביר את כל הקיר לשורה 5, תשני את `row = 3` ל-`row = 5` — שורה אחת, וכל ארבעת המגדלים זזים."*
   (en): *"Four lines, same kind, same row, different columns: `1`, `4`, `7`, `10`. If you later want the whole wall on row 5, change `row = 3` to `row = 5` — one line, and all four towers move."* → solution unlocks.

### b3 — פנקס הרב־טוראי / The Quartermaster's Ledger · 25 XP, 8 🪙

**Why this mechanic**: this is the only level in the course where `type()` is the
whole task, and the battle supplies the three types honestly — the tower kind is a
`str`, the gold in the chest is an `int`, and the archer's range is a `float`. It
also teaches the thing reassignment is really about: `gold = get_gold()` copies the
number **at that moment**. Read the chest after building and the ledger is wrong.

**brief (he)**: *"לפני כל קרב הרב־טוראי רושם שלוש שורות בפנקס, ואז מאשר שהוא לא
התבלבל בין טקסט למספר.\n\nצרי שלושה משתנים: `kind` עם סוג המגדל, `gold` עם מה
ש-`get_gold()` מחזיר, ו-`tower_range` עם הטווח של הקשת — `2.6`. הדפיסי את שלושת
הערכים, ואז את שלושת הטיפוסים שלהם, בסדר הזה. שש שורות פלט.\n\nהרב־טוראי סופר
את התיבה **לפני** שקונים משהו. ואחרי הפנקס — בני הגנה שמחזיקה."*

**brief (en)**: *"Before every battle the quartermaster writes three lines in his
ledger, then certifies that he has not confused text with a number.\n\nMake three
variables: `kind` with the tower kind, `gold` with whatever `get_gold()` hands
back, and `tower_range` with the archer's range — `2.6`. Print the three values,
then their three types, in that order. Six lines of output.\n\nThe quartermaster
counts the chest **before** anything is bought. And after the ledger — build a
defense that holds."*

**level**
```js
map: { cols: 10, rows: 7, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4]] },
gold: 200, campHp: 3, seed: 5, allowed: ["archer"],
waves: [
  { delay: 0, enemies: [ { kind: "satyr", count: 6, gap: 0.6 } ] },
  { delay: 10, enemies: [ { kind: "harpy", count: 6, gap: 0.7 } ] },
],
```

**starter**
```python
kind = "archer"
gold = get_gold()
tower_range = 2.6

# print the six ledger lines here

place_tower(kind, 2, 3)
```

**solution**
```python
kind = "archer"
gold = get_gold()
tower_range = 2.6

print(kind)
print(gold)
print(tower_range)
print(type(kind))
print(type(gold))
print(type(tower_range))

place_tower(kind, 2, 3)
place_tower(kind, 5, 3)
place_tower(kind, 8, 3)
```

**check**
```js
check: {
  kind: "battle",
  also: { kind: "output", mode: "normalized",
          expect: "archer\n200\n2.6\n<class 'str'>\n<class 'int'>\n<class 'float'>" }
}
```

**Verified** against Skulpt: `get_gold()` really does come back as an `int`, and
`2.6` prints as `2.6`. Three archers at columns 2, 5 and 8 hold at 3/3; two leak.
Calling `get_gold()` after the towers are placed prints `50` and fails the ledger —
which is the lesson, not a trap: a name holds the value it was given, and the chest
had already been emptied.

**hints**
1. *nudge* (he): *"שלוש שורות ראשונות בפלט הן הערכים עצמם, ושלוש האחרונות הן שאלה אחרת לגמרי: **מה זה** כל אחד מהם."*
   (en): *"The first three output lines are the values themselves. The last three ask a completely different question: **what** each one is."*
2. *tool* (he): *"`print(gold)` מדפיס את הערך, `print(type(gold))` מדפיס את הטיפוס. שימי לב מה יש גרשיים ומה אין — `2.6` הוא מספר עם נקודה, לא טקסט."*
   (en): *"`print(gold)` prints the value, `print(type(gold))` prints the type. Watch which things have quotes and which do not — `2.6` is a number with a dot, not text."*
3. *walkthrough* (he): *"שש שורות `print` לפי הסדר: `kind`, `gold`, `tower_range`, ואז `type(kind)`, `type(gold)`, `type(tower_range)`. אם `gold` יוצא 50 במקום 200 — קראת את התיבה אחרי שכבר קנית. העבירי את `gold = get_gold()` למעלה, לפני שורות ה-`place_tower`. ואחרי הפנקס צריך שלושה מגדלים כדי להחזיק את הגל."*
   (en): *"Six `print` lines in order: `kind`, `gold`, `tower_range`, then `type(kind)`, `type(gold)`, `type(tower_range)`. If `gold` comes out as 50 instead of 200, you read the chest after you had already spent. Move `gold = get_gold()` above the `place_tower` lines. And after the ledger you need three towers to hold the wave."* → solution unlocks.

### b4 — התוכנית משתנה / The Plan Changes · 30 XP, 8 🪙

**Why this mechanic**: the road turns, so the wall has to move — and a name that
holds one value at a time is exactly the tool for that. She writes `row = 2`, uses
it twice, writes `row = 6`, and uses it twice more. The same name, two values,
never at the same moment.

**brief (he)**: *"הדרך הפעם יורדת: היא רצה למעלה עד עמודה 5, פונה למטה, וממשיכה
לאורך שורה 5 עד השער.\n\nיש לך 220 זהב — ארבעה מגדלים. שניים לא יספיקו, ושניהם
צריכים להיות ליד החלק העליון; שני האחרים ליד החלק התחתון.\n\nהשתמשי ב-`row`
פעמיים: תני לו את השורה העליונה, בני שני מגדלים, ואז **תני לאותו שם ערך חדש** ובני
את שני האחרים."*

**brief (en)**: *"The road drops this time: it runs along the top to column 5, turns
down, and continues along row 5 to the gate.\n\nYou have 220 gold — four towers. Two
will not hold, and both of those belong beside the top stretch; the other two beside
the bottom one.\n\nUse `row` twice: give it the top row, build two towers, then
**give the same name a new value** and build the other two."*

**level**
```js
map: {
  cols: 14, rows: 7,
  path: [[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[5,2],[5,3],[5,4],[5,5],
         [6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[12,5],[13,5]],
},
gold: 220, campHp: 3, seed: 6, allowed: ["archer"],
waves: [
  { delay: 0, enemies: [ { kind: "satyr", count: 6, gap: 0.7 } ] },
  { delay: 10, enemies: [ { kind: "hellhound", count: 4, gap: 1.3 } ] },
],
```

**starter**
```python
kind = "archer"
row = 2
place_tower(kind, 2, row)
place_tower(kind, 4, row)
```

**solution**
```python
kind = "archer"
row = 2
place_tower(kind, 2, row)
place_tower(kind, 4, row)
row = 4
place_tower(kind, 7, row)
place_tower(kind, 10, row)
```

**check**
```js
check: {
  kind: "battle",
  also: { kind: "source", mustInclude: ["kind", "row"],
    message: { he: "התוכנית צריכה להשתמש ב-`kind` וב-`row` — ושם אחד יכול להחזיק ערך חדש באמצע",
               en: "The plan must use `kind` and `row` — and one name is allowed to hold a new value part-way down" } }
}
```

**Verified**: the starter's two towers leak three monsters and lose. Two on row 2
plus two on row 4 hold at 3/3, and so does `row = 6` for the bottom pair — the
road has grass on both sides. Three towers of any arrangement leak.

**hints**
1. *nudge* (he): *"המגדלים בשורה 2 רואים רק את החלק העליון של הדרך. מי שומר על החלק שאחרי הפנייה?"*
   (en): *"Towers on row 2 only see the top stretch of the road. Who is watching the part after the bend?"*
2. *tool* (he): *"אפשר לכתוב `row = 4` באמצע התוכנית. מהשורה הזאת והלאה, כל `place_tower` שמקבל `row` יקבל את הערך החדש — מה שכבר רץ למעלה נשאר כמו שהיה."*
   (en): *"You can write `row = 4` in the middle of the plan. From that line onwards every `place_tower` that receives `row` gets the new value — what already ran above stays as it was."*
3. *walkthrough* (he): *"שני מגדלים ראשונים בעמודות 2 ו-4 עם `row = 2`. אחריהם שורה אחת: `row = 4`. ואז עוד שני מגדלים, בעמודות 7 ו-10, שמקבלים בדיוק את אותו `row` — רק שעכשיו יש בו 4."*
   (en): *"The first two towers at columns 2 and 4 with `row = 2`. Then one line: `row = 4`. Then two more towers at columns 7 and 10, receiving that same `row` — which now holds 4."* → solution unlocks.

## The great battle — "שרשרת המגדלים / The Necklace of Towers" · 50 XP, 12 🪙

**Why this mechanic**: the biggest map so far, three waves, and exactly six towers
of budget. The road runs along the top, drops, comes back up — so the wall is
written in two halves, with one `row` reassigned between them. Six `place_tower`
lines with the values typed by hand is a wall of noise; with two names it reads
like a plan, which is the whole argument for variables.

**brief (he)**: *"הלילה הראשון שבו כירון לא עומד לידך.\n\nשלושה גלים: סאטירים
מהירים, אחריהם הרפיות, ובסוף תשעה כלבי גיהינום — והדרך מתפתלת פעמיים.
320 זהב, קשת ב-50: שישה מגדלים, ועודף של 20.\n\nתני שם לסוג המגדל ושם לשורה שאת
בונה עליה, ושני את השורה כשהדרך משנה כיוון. חמישה מגדלים לא מחזיקים — נסי, וצפי
איפה זה נשבר."*

**brief (en)**: *"The first night Chiron is not standing beside you.\n\nThree waves:
fast satyrs, then harpies, then nine hellhounds — and the road bends twice. 320 gold,
an archer at 50: six towers and twenty drachmas of change.\n\nGive the tower kind a name and the row you
are building on a name, and change the row when the road changes direction. Five
towers do not hold — try it, and watch where it breaks."*

**level**
```js
map: {
  cols: 14, rows: 8,
  path: [[0,2],[1,2],[2,2],[3,2],[4,2],[4,3],[4,4],[4,5],[5,5],[6,5],[7,5],[8,5],
         [9,5],[9,4],[9,3],[9,2],[10,2],[11,2],[12,2],[13,2]],
},
gold: 320, campHp: 3, seed: 7, allowed: ["archer"],
waves: [
  { delay: 0,  enemies: [ { kind: "satyr", count: 9, gap: 0.45 } ] },
  { delay: 12, enemies: [ { kind: "harpy", count: 9, gap: 0.55 } ] },
  { delay: 26, enemies: [ { kind: "hellhound", count: 9, gap: 0.9 } ] },
],
```

**starter**
```python
# The Necklace of Towers
kind = "archer"
row = 1
place_tower(kind, 2, row)
place_tower(kind, 3, row)
```

**solution**
```python
# The Necklace of Towers
kind = "archer"
row = 1
place_tower(kind, 2, row)
place_tower(kind, 3, row)
row = 4
place_tower(kind, 5, row)
place_tower(kind, 6, row)
place_tower(kind, 7, row)
place_tower(kind, 8, row)
```

**check**
```js
check: {
  kind: "battle",
  also: { kind: "source", mustInclude: ["kind", "row"],
    message: { he: "השתמשי בשם אחד לסוג המגדל ובשם אחד לשורה, ושני את השורה כשהדרך משנה כיוון",
               en: "Use one name for the tower kind and one for the row, and change the row when the road changes direction" } }
}
```

**Verified**: the six towers above finish all 27 monsters at 3/3. Five towers leak
two. Three on the top and three by the bottom stretch also wins, and so does a
version that saves one tower for the return stretch at `(11, 1)` — several plans
work, which is what makes it feel like a plan. A seventh `place_tower` is refused
for lack of gold, with the engine naming the price.

**hints**
1. *nudge* (he): *"320 חלקי 50 — כמה מגדלים, וכמה עודף? ואיפה על המפה המפלצות הולכות הכי הרבה זמן?"*
   (en): *"320 divided by 50 — how many towers, and how much change? And where on the map do the monsters spend the most time?"*
2. *tool* (he): *"בני בשני חלקים: קודם `row` של החלק העליון ושני מגדלים, אחר כך `row` חדש ליד החלק התחתון ועוד ארבעה. הכלבים בגל האחרון הם החלק הקשה — הם עבים ואיטיים, וצריך מספיק חצים באותו קטע דרך."*
   (en): *"Build in two halves: first a `row` for the top stretch and two towers, then a new `row` beside the bottom stretch and four more. The hounds in the last wave are the hard part — they are slow and thick, and they need enough arrows on the same stretch of road."*
3. *walkthrough* (he): *"`kind = \"archer\"` פעם אחת. `row = 1` ושני מגדלים בעמודות 2 ו-3, שמכסים את הכניסה. אחר כך `row = 4`, וארבעה מגדלים בעמודות 5, 6, 7 ו-8 — כולם צופים על הקטע התחתון, שם הכלבים הולכים הכי לאט. זה 300 מתוך 320."*
   (en): *"`kind = \"archer\"` once. `row = 1` and two towers at columns 2 and 3, covering the entrance. Then `row = 4`, and four towers at columns 5, 6, 7 and 8 — all watching the bottom stretch, where the hounds walk slowest. That is 300 of your 320."* → solution unlocks.

## Reward & Recap

**Item**: 🪢 **רצועת העור / The Leather Cord** —
(he) *"הרצועה שמחזיקה את כל החרוזים. משתנה עושה בדיוק את זה: מחזיק ערך, ונותן לו
שם שאפשר לחזור אליו."*
(en) *"The cord that holds every bead. A variable does the same thing: it holds a
value and gives it a name you can come back to."*

**Achievements possible here**
- *קוראת בשמות / Namer of Things* — created and printed a variable for the first
  time.
- *בלשית טיפוסים / Type Detective* — ran a battle with three or more `type()`
  calls (b3).
- *עקשנית / Persistent* (global) — won a battle after five failed runs.
- *בלי רמזים / No Hints Needed* (global) — finished the lesson without buying a
  hint.

**Recap bullets**
- משתנה הוא שם שמחזיק ערך: `beads = 4`
- `=` זה לא "שווה" — זה חץ שמאלה: תכניס את הערך לתוך השם
- `print(hero)` בלי גרשיים מדפיס את הערך, `print("hero")` עם גרשיים מדפיס טקסט
- שם עובד בכל מקום שבו ערך עבד — גם בתוך `place_tower(kind, 2, row)`
- שלושה טיפוסים בסיסיים: `str` (טקסט), `int` (מספר שלם), `float` (מספר עם נקודה)
- `type(x)` מגלה מה יש באמת בפנים — ו-`"4"` בגרשיים הוא `str`, לא מספר
- השמה חוזרת מחליפה את הערך הישן; מה שכבר הודפס נשאר מודפס, ומה שכבר נבנה נשאר בנוי
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
| writes `tower_range = 2` in b3 | the last ledger line prints `<class 'int'>` | a float needs a dot: `2.6`, not `2` |
| `place_tower("archer", 2, row)` after being told to use the names | the battle is **won** and the level still fails | the `also` message names the two variables; the level is about the names, not the win |
| builds on a brown square | the engine says "you cannot build on the path itself" | towers stand on the grass beside the road |
| builds on row 0 in b1 | the tower never fires — `targetsSeen` is 0 and the engine says so | further than ~2.6 cells from the road is out of range |
| a fifth `place_tower` in b2 | "not enough gold for that tower — it costs 50 and you had 20" | 220 gold is exactly four archers; the engine refuses, it does not overdraw |
| reads `get_gold()` after building in b3 | the ledger prints `50` instead of `200` | the name copies the value *at that moment* |

**Skulpt fidelity note.** The `NameError` text above is byte-identical in Skulpt
and CPython — that is why it is the lesson's `error` block. The two `SyntaxError`
rows are *not*: Skulpt reports a generic `SyntaxError: bad input on line N` for
both. The error explainer in `engine.js` should map a `SyntaxError` on a line
containing `=` to the Hebrew hint "בדקי שאין רווח בשם, ושהשם נמצא משמאל ל-`=`".

## Implementation notes

- **No `input()` in this lesson.** Nothing blocks on a prompt; every level is a
  plain build script plus a battle. `input()` arrives in lesson 3.
- **Every level is `check.kind: "battle"`.** Four of the five carry a `source`
  rule in `check.also` naming the variables, and b3 carries an `output` rule
  instead. `checker.js` already supports both shapes of `also`; note that
  `verify-python.mjs` currently only re-checks `also` when it is a `source` rule,
  so **b3's output requirement is not covered by the verifier until that is
  extended** (one line in `runBattleCheck`). Do it while building this lesson —
  lessons 3 and 4 depend on it much more heavily.
- **`mustInclude: ["kind"]` matches whole words**, so `tower_kind` does not
  satisfy it and `top_row` does not satisfy `row`. That is deliberate: the brief
  names the two variables, and the failure message repeats them.
- **Define `normalized` precisely, because lessons 3 and 4 depend on it**: trim
  each line, collapse runs of spaces and tabs *within* a line, drop leading and
  trailing blank lines — but **keep the line breaks**. A checker that collapsed
  `\n` into a space would let a single `print("archer 200 2.6")` pass b3, which
  defeats the level.
- **Verify `type()` output in Skulpt before shipping**:
  `node tools/verify-python.mjs` must confirm that `print(type("x"))` produces
  exactly `<class 'str'>`. b3 hard-codes all three strings. Already checked in
  this engine: `type(get_gold())` is `<class 'int'>` and `type(2.6)` is
  `<class 'float'>`. If Skulpt ever renders them differently, b3's check becomes
  `{ kind: "output", mode: "regex", expect: "str[\\s\\S]*int[\\s\\S]*float" }`
  rather than the lesson changing.
- **Floats print without dressing up**: `print(2.6)` gives `2.6`, and `print(6.0)`
  gives `6.0` — not `6`. b3 depends on `2.6` staying `2.6`.
- **Level numbers are load-bearing and were tuned against the simulation.** Gold
  is always an exact multiple of 50 plus small change, so "how many towers can I
  afford" has a clean answer she will need in lesson 4. Do not retune a wave
  without re-running the level: three archers lose b2 by exactly two leaks, and
  five lose the great battle by two.
- **Seeds** are 1, 2, 5, 6, 7 for b1–b4 and the great battle. They are fixed so
  the replay is identical every time; changing a seed changes the battle.
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
