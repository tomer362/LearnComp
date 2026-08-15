# Lesson 04 — BOSS: The Minotaur's Toll · מס המינוטאור

> **Act I — Camp Half-Blood** · Stop 4 of 20 · **Act I boss**
> Follows the reference structure in `spec/lessons/lesson-01.md`.
> Schema: `spec/04-lesson-template.md` · Boss rules: `spec/02-game-design.md`
> · Battle contract: `spec/09-battle-game.md`.

| | |
| --- | --- |
| **id** | `04` |
| **slug** | `the-minotaurs-toll` |
| **minutes** | 30–35 |
| **concepts** | `+` `-` `*` `/` `//` `%` `**`, operator precedence, `round()` |
| **new vocabulary** | `//`, `%`, `**`, `round` |
| **requires** | lessons 1–3 — `print()`, strings, comments, variables, `str`/`int`/`float`, `type()`, `input()`, `int()`/`float()`, f-strings, `place_tower()` |
| **API available** | `place_tower`, `get_gold`, `tower_cost`, `camp_hp` (build script only) |
| **towers** | 🏹 archer (50, 10 dmg) · 💣 cannon (90, 28 dmg, splash) |
| **item** | 🐂 קרן המינוטאור / The Minotaur's Horn |
| **XP** | 25 + 30 + 35 + 40 (four battles) + 60 (boss) + 30 (bonus) = **220** |
| **drachmas** | 7 + 8 + 9 + 9 + 15 = **48** 🪙 |
| **boss** | 🐂 The Minotaur · **420 HP · armour 8** · a real battle, last of three waves |

The training XP is spread over **four** battles rather than the five exercises of
the earlier draft; the lesson total is unchanged, which keeps the Act I sum and the
level-table budget in `spec/02-game-design.md` intact.

Running Act I total after this lesson: **750 XP** — she crosses level 3
(*נושאת חרב / Blade-Bearer*, 600 XP) by defeating the Minotaur, which is the
right moment for a title to change.

## Teaching goal

By the end she can do arithmetic with variables and typed-in numbers, she knows
which operator runs first and how to override it with parentheses, she knows the
difference between `/` and `//`, she knows what `%` is for, and she can present a
messy decimal to a human with `round()`.

The emotional goal: **she beats something.** Three lessons of quiet learning now
cash out in a fight with a health bar — a real one, 420 HP of armoured bull
walking up a bridge she has to hold. Every correct number in her ledger is a
cannon she can afford, and every cannon is 20 damage a shot instead of an arrow's
2. This is the payoff that makes her open Act II.

**The hardest idea is that `/` and `//` are different questions**, not two
spellings of the same one. `47 / 5` asks "how much is each share, exactly";
`47 // 5` asks "how many whole coins each" and `47 % 5` asks "how many are left
over". Teach them as three different questions about the same pile of drachmas
and the confusion never forms.

## Story beat

The camp needs supplies from the road, and the road starts at the old bridge.
Something has been living under it since the spring and it charges for passage.
Annabeth explains, walking fast: the Minotaur is not primarily interested in
eating anybody. He is interested in the toll being correct. Get the arithmetic
wrong and he walks straight over the bridge and into the camp; get it right and
your cannons are paid for before he arrives.

Chiron does not come. He says one line from the porch of the Big House and lets
her walk down alone, which is how a boss fight should feel.

Cast: Annabeth (briefs her on the rules — she is the one who states the toll
formula, which makes the boss brief in-world rather than a homework sheet),
Chiron (one line, from a distance), the Minotaur (grunts numbers), Grover in a
`warn` callout, having tried to pay the toll with a string.

## Chiron Teaches — block by block

1. **prose** — She has variables and she has answers typed in by a human. Today
   she gets the third thing a program needs: doing something *to* those numbers.
   Python's arithmetic looks like the arithmetic she already knows, with three
   additions and one trap.

2. **code (runnable)** — the four familiar ones, running inside the first 60
   seconds.
   ```python
   print(12 + 7)
   print(12 - 7)
   print(12 * 7)
   print(12 / 7)
   ```
   Output:
   ```
   19
   5
   84
   1.7142857142857142
   ```
   Caption (he): *"שלוש שורות בדיוק כמו בשיעורי חשבון. השורה הרביעית — נדבר
   עליה."*

3. **code (runnable)** — the trap, isolated so it cannot be missed.
   ```python
   print(10 / 2)
   print(type(10 / 2))
   ```
   Output:
   ```
   5.0
   <class 'float'>
   ```
   Prose beside it: `/` **always** produces a `float`, even when the division
   comes out even. `10 / 2` is `5.0`, never `5`. That trailing `.0` will show up
   in her output and she needs to expect it rather than think she broke
   something.

4. **prose** — Two operators she has not met. Frame them as two different
   questions about the same pile of drachmas: *how many whole coins does each
   camper get* (`//`), and *how many coins are left over in the middle of the
   table* (`%`). Together they say everything about splitting a pile up.

5. **code (runnable)** —
   ```python
   drachmas = 47
   campers = 5
   print(drachmas // campers)
   print(drachmas % campers)
   ```
   Output:
   ```
   9
   2
   ```
   Caption (he): *"תשעה לכל אחד, ושניים נשארו על השולחן. `//` נותן את החלק השלם,
   `%` נותן את השארית."*

6. **callout · tip** — `%` (its English name is **modulo**) answers "what is left
   over", and that turns out to be one of the most useful questions in
   programming: leftovers are how you ask whether something divides evenly, which
   is how you will later find every second camper, every third day, every even
   number. She will use it constantly from Act II onwards.
   Title (he): *"השארית שווה יותר ממה שהיא נראית"*.

7. **code (runnable)** — powers.
   ```python
   print(2 ** 3)
   print(2 ** 10)
   print(3 ** 2)
   ```
   Output:
   ```
   8
   1024
   9
   ```
   Prose beside it: `**` is "to the power of". `2 ** 3` is 2×2×2. It grows
   frighteningly fast — `2 ** 10` is already past a thousand — which is exactly
   why monsters that double every day are a problem.

8. **callout · warn** — Grover's mistake: `5 ^ 2` does **not** raise an error and
   does **not** give 25. It gives 7. `^` is a different operator entirely (it
   works on the numbers' binary form) and Python will happily let her use it and
   get a wrong answer with a straight face. Powers are `**`, always.
   Title (he): *"`^` הוא לא חזקה"*.

9. **prose** — Precedence, named only now that she has all the operators. Python
   does not read left to right like a sentence. It runs `**` first, then
   `*` `/` `//` `%`, then `+` `-`. Operators on the same level go left to right.
   Parentheses beat everything, and they cost nothing.

10. **compare** — the precedence bug, in the shape she will actually hit it.
    - **bad**: `print(2 + 3 * 4)` → `14`
    - **good**: `print((2 + 3) * 4)` → `20`
    Labels (he): *"בלי סוגריים — הכפל רץ ראשון"* / *"עם סוגריים — החיבור רץ
    ראשון"*. Add one line of advice she can actually use: when a line has more
    than two operators, put the parentheses in even where they are not required.
    Nobody has ever been harmed by a clear line.

11. **error block** — the required error. Division by nobody.
    ```python
    campers = 0
    print(120 / campers)
    ```
    Real error (Skulpt): `ZeroDivisionError: integer division or modulo by zero`
    Explanation (he): *"לחלק 120 דרכמות בין אפס חניכים זו לא שאלה שיש לה תשובה,
    ולכן Python עוצר במקום להמציא משהו. `ZeroDivisionError` כמעט תמיד מגיע
    ממשתנה שהגיע ריק או אפס — לא מהמספר שכתבת בעצמך. תסתכלי על המשתנה שנמצא
    אחרי סימן החילוק, לא על זה שלפניו."*
    **Be honest in the callout**: CPython words this `division by zero` and
    Skulpt words it `integer division or modulo by zero`. The wording differs
    between Pythons; the name `ZeroDivisionError` does not, and the name is what
    she should learn to read first. (This gap is already documented in
    `01-architecture.md`; do not hide it.)

12. **error block (second)** — the one that decides the boss fight. Text plus
    number.
    ```python
    coins = input("How many drachmas? ")
    print(coins + 10)
    ```
    With `5` typed, real error (CPython):
    `TypeError: can only concatenate str (not "int") to str`
    (Skulpt: `TypeError: cannot concatenate 'str' and 'int' objects`.)
    Explanation (he): *"`input()` החזיר טקסט, כמו תמיד. `+` בין טקסט למספר לא
    אומר כלום — Python לא יודע אם רצית `15` או `510`, אז הוא עוצר. הפתרון הוא
    לא לשנות את ה-`+`, אלא להמיר קודם: `coins = int(input("How many drachmas? "))`."*
    This is lesson 3's conversion habit, now with teeth. Every failure in
    tonight's boss fight will trace back to this line.

13. **callout · warn** — and the version of the same mistake that produces **no
    error at all**: `"5" * 2` gives `55`, because `*` on a string repeats the
    string. So `coins * 2` on an unconverted answer silently doubles the *text*
    and her toll comes out looking insane. Convert first, always. (`"ha" * 3` →
    `hahaha` is worth showing in the same callout because it is genuinely fun and
    makes the rule stick.)
    Title (he): *"הבאג ששותק"*.

14. **prose + code (runnable)** — `round()`, for showing a number to a human.
    ```python
    print(round(3.7))
    print(round(41.5 / 3, 2))
    ```
    Output:
    ```
    4
    13.83
    ```
    `round(x)` gives the nearest whole number. `round(x, 2)` keeps two digits
    after the dot. The second argument is how many digits to keep.

15. **callout · myth** — the strangest true thing in Act I:
    ```python
    print(round(620 / 7, 2))
    ```
    → `88.56999999999999`
    (**Measured in this engine.** CPython's showpiece for this is
    `print(0.1 + 0.2)` → `0.30000000000000004`, but Skulpt prints `0.3` for that
    one, so the lesson must use an example the engine really produces. See the
    implementation notes: `round(41.5 / 3, 2)` is a clean `13.83`, and
    `round(620 / 7, 2)` is not clean — the difference is which two-digit values
    happen to be exactly representable in binary.)
    Explanation (he): *"זו לא שגיאה ולא באג אצלך. מחשבים שומרים שברים עשרוניים
    בבסיס 2, ובבסיס 2 יש שברים שאי אפשר לכתוב בדיוק — בדיוק כמו שאי אפשר לכתוב
    שליש בדיוק בעשרוני. התוצאה קרובה מאוד ולא מדויקת לגמרי. לכן כשמראים מספר
    עשרוני לבן אדם, עוטפים אותו ב-`round()`."*
    Title (he): *"למה מספר עשרוני לא תמיד יוצא עגול"*. This block earns its `myth` tone:
    it is the moment the machine stops looking like magic and starts looking like
    a machine with rules, which is a good thing for her to feel before Act II.

16. **prose + code (runnable)** — arithmetic on the battlefield, which is where
    every level below lives. The chest and the price list are things she can ask
    the game for, and `//` turns them into a build:
    ```python
    gold = get_gold()
    cost = tower_cost("archer")
    archers = gold // cost
    left = gold % cost
    print(f"Archers: {archers}")
    print(f"Left over: {left}")
    ```
    Prose beside it (he): *"`//` היא השאלה 'כמה מגדלים אני יכולה לקנות', ו-`%` היא
    'כמה נשאר בכיס'. אם תבני מגדל אחד יותר ממה ש-`//` אמר, המשחק יסרב —
    ויגיד לך כמה הוא עולה וכמה היה לך."*
    (en): *"`//` is the question 'how many towers can I buy', and `%` is 'what
    stays in my pocket'. Build one more than `//` said and the game refuses, and
    tells you what it costs and what you had."*

17. **prose** — And the subtraction that decides the boss. Damage per hit is
    `damage - armour`, and never less than 1. The Minotaur wears armour 8:
    an archer's 10 becomes **2**, a cannon's 28 becomes **20**. Ten times the
    difference, from one subtraction she can do in her head. Nothing new is coming
    after this. It is a fight, not a lecture.

## Try It (ungraded)

Free-play editor. Nothing is checked, nothing is scored.

```python
print(7 + 3)
print(7 * 3)
print(7 / 3)
print(7 // 3)
print(7 % 3)
print(7 ** 3)

gold = get_gold()
print(gold // tower_cost("archer"))
print(gold // tower_cost("cannon"))
```

Expected output for reference (the practice field holds 500 gold):
```
10
21
2.3333333333333335
2
1
343
10
5
```

Intro (he): *"שני את שני המספרים והריצי שוב. תנסי מספרים שמתחלקים בדיוק, ותנסי
מספרים שלא. שימי לב מה קורה ל-`//` ול-`%` כשהמספר הראשון קטן מהשני. ושתי השורות
האחרונות אומרות לך משהו שימושי: באותו זהב אפשר לקנות עשרה קשתים או חמישה תותחים.
שום דבר פה לא נבדק."*
(en): *"Change both numbers and run again. Try numbers that divide evenly and
numbers that do not. Watch what `//` and `%` do when the first number is smaller
than the second. And the last two lines tell you something useful: the same gold
buys ten archers or five cannons. Nothing here is graded."*

(That last suggestion is deliberate: `3 // 7` is `0` and `3 % 7` is `3`, which
looks wrong until she thinks about it for ten seconds, and thinking about it for
ten seconds is the entire point of a Try It panel.)

## The battles

Lesson 4 is played as battle levels (`spec/09-battle-game.md`), and the mechanic is
the **gold economy**. Every level asks a question that arithmetic answers and the
battlefield enforces:

- `//` — how many towers this chest actually pays for. Place one more than that
  and the engine refuses the build and names the price.
- `%` — what is left on the table, which the Minotaur takes as his toll.
- `*` — where the towers go, when the Oracle gives her a spacing instead of
  coordinates.
- `**` — how many monsters a horde that doubles every night has become.
- `-` and `round()` — the damage a shot actually does through armour, and the
  toll ledger the Minotaur wants to two digits.

**Two towers are in play now.** 🏹 archer: 50 gold, 10 damage. 💣 cannon: 90 gold,
28 damage, splash. She is never asked to *choose* between them inside one battle —
that needs `if`, which is lesson 6 — so b1–b2 are archer-only levels and b3–b4 are
cannon-only levels. The boss is the exception, and there the choice is made by
arithmetic rather than by a condition: the Minotaur has **armour 8**, damage per
hit is `max(1, damage - armour)`, and `10 - 8 = 2` against `28 - 8 = 20` is a
ten-line calculation that decides the whole fight.

**What forces arithmetic here.** Three different levers, because a single trick
gets stale:

1. **The engine enforces the budget.** A `place_tower` she cannot pay for is
   rejected with "not enough gold for that tower — it costs 90 and you had 30", so
   `gold // cost` is the difference between a plan and a build error.
2. **The output rule catches `/` where `//` was meant.** `300 / 90` prints
   `3.333333333333333` and fails; `300 // 90` prints `3`.
3. **Digit bans**, as in lesson 3: b2 gives her two numbers and forbids every
   other digit, so the third tower's column has to be *calculated*; b4 forbids the
   digit `8` so the size of the horde has to come from `2 ** nights`.

**A note about f-strings and `source` rules.** A `source` rule reads a skeleton of
her code with string literals stripped out, so `print(f"Cannons: {gold // cost}")`
contains no visible `//` and the rule would reject a correct answer. That is why
every brief in this lesson asks for the numbers to be **worked out into named
variables and then printed** — which is how the Minotaur wants his ledger anyway,
and is better code. Say it in the brief; never let her discover it from a failure.

Every level below was played against the real simulation before it was written
down: the stated solution wins with the camp untouched, an empty program loses, and
the near-misses under each level were run too.

### b1 — לספור את הקשתים / Counting the Archers · 25 XP, 7 🪙

**Why this mechanic**: the chest holds 220 and a tower costs 50, so "how many"
and "how much is left" are two different questions with two different operators —
and the answer to the first one is exactly how many `place_tower` lines the level
needs. A fifth line is refused by the engine, out loud.

**brief (he)**: *"שתי השורות הראשונות כבר שואלות את המשחק כמה זהב יש ומה מחיר
הקשת. אל תקלידי את המספרים בעצמך.\n\nחשבי שני דברים ותני לכל אחד שם: כמה קשתים
הזהב קונה, וכמה נשאר אחרי שקנית את כולם. הדפיסי אותם בדיוק כך:"*

```
Archers: 4
Left over: 20
```

*"ואז בני את כל הקשתים לאורך הדרך, על שורה 3."*

**brief (en)**: *"The first two lines already ask the game how much gold there is
and what an archer costs. Do not type the numbers yourself.\n\nWork out two things
and give each a name: how many archers the gold buys, and how much is left once you
have bought them all. Print them exactly as above, then build every one of those
archers along the road, on row 3."*

**level**
```js
map: { cols: 12, rows: 7, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4]] },
gold: 220, campHp: 3, seed: 1, allowed: ["archer"],
waves: [
  { delay: 0, enemies: [ { kind: "satyr", count: 4, gap: 0.8 } ] },
  { delay: 9, enemies: [ { kind: "hellhound", count: 4, gap: 1.3 } ] },
],
```

**starter**
```python
kind = "archer"
gold = get_gold()
cost = tower_cost(kind)

# how many archers, and how much is left over?

place_tower(kind, 1, 3)
```

**solution**
```python
kind = "archer"
gold = get_gold()
cost = tower_cost(kind)

archers = gold // cost
left = gold % cost
print(f"Archers: {archers}")
print(f"Left over: {left}")

place_tower(kind, 1, 3)
place_tower(kind, 4, 3)
place_tower(kind, 7, 3)
place_tower(kind, 10, 3)
```

**check**
```js
check: {
  kind: "battle",
  also: [
    { kind: "output", mode: "normalized", expect: "Archers: 4\nLeft over: 20" },
    { kind: "source", mustInclude: ["//", "%", "get_gold(", "tower_cost("],
      message: { he: "חשבי את שני המספרים במשתנים משלהם עם `//` ו-`%`, מהערכים שהמשחק מחזיר — ואז הדפיסי אותם",
                 en: "Work both numbers out into their own variables with `//` and `%`, from the values the game returns — then print them" } },
  ],
}
```

**Verified**: four archers at columns 1, 4, 7 and 10 hold at 3/3; three leak two.
`gold / cost` prints `4.4` and fails the output rule — the first place in the
course where `/` and `//` visibly disagree. A fifth `place_tower` is refused: 20
drachmas left, an archer costs 50.

**hints**
1. *nudge* (he): *"אם היו לך 220 דרכמות ומגדל עולה 50 — כמה מגדלים היית קונה, וכמה כסף היה נשאר בכיס? אלה שתי שאלות שונות."*
   (en): *"With 220 drachmas and a tower at 50 — how many would you buy, and how much would stay in your pocket? Those are two different questions."*
2. *tool* (he): *"`//` נותן כמה פעמים המחיר נכנס בזהב, בלי שברים. `%` נותן את מה שנשאר. שמרי כל אחד במשתנה משלו — `archers = gold // cost` — ורק אחר כך הדפיסי."*
   (en): *"`//` gives how many times the price fits into the gold, with no fractions. `%` gives what is left. Keep each in its own variable — `archers = gold // cost` — and print afterwards."*
3. *walkthrough* (he): *"שתי שורות חישוב: `archers = gold // cost` ו-`left = gold % cost`. שתי שורות הדפסה עם f-strings. ואז ארבע שורות `place_tower` — בדיוק המספר שיצא לך — בעמודות 1, 4, 7 ו-10 על שורה 3. אם תשתמשי ב-`/` יודפס `4.4`, וזה ההבדל בין 'כמה מגדלים' לבין 'כמה חלקי'."*
   (en): *"Two calculation lines: `archers = gold // cost` and `left = gold % cost`. Two print lines with f-strings. Then four `place_tower` lines — exactly the number you worked out — at columns 1, 4, 7 and 10 on row 3. With `/` it prints `4.4`, and that is the difference between 'how many towers' and 'how much each'."* → solution unlocks.

### b2 — שני המספרים של האורקל / The Oracle's Two Numbers · 30 XP, 8 🪙

**Why this mechanic**: the Oracle gives her a spacing and a row, and forbids every
other number. Three towers have to stand at columns 3, 6 and 9, and only the first
one can be typed — the other two must be `gap * 2` and `gap * 3`. There is no way
to place them by hand, because there are no other digits to type them with.

**brief (he)**: *"האורקל לא נותנת קואורדינטות. היא נותנת שני מספרים ותו לא:
**3** ו-**2**.\n\nהזהב מספיק לשלושה קשתים בדיוק, והם צריכים לעמוד במרווחים שווים
לאורך הדרך — הראשון במרווח אחד מהקצה, השני בשניים, השלישי בשלושה.\n\n**חוק
האורקל:** בכל הקוד שלך מותר להופיע רק הספרות `3` ו-`2`. כל מספר אחר שאת צריכה —
תחשבי אותו."*

**brief (en)**: *"The Oracle does not give coordinates. She gives two numbers and
nothing else: **3** and **2**.\n\nThe gold pays for exactly three archers, and they
must stand at even intervals along the road — the first one interval in, the second
two, the third three.\n\n**The Oracle's rule:** only the digits `3` and `2` may
appear anywhere in your code. Any other number you need, you work out."*

**level**
```js
map: { cols: 12, rows: 5, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4]] },
gold: 150, campHp: 3, seed: 2, allowed: ["archer"],
waves: [
  { delay: 0,  enemies: [ { kind: "satyr", count: 8, gap: 0.5 } ] },
  { delay: 11, enemies: [ { kind: "harpy", count: 8, gap: 0.6 } ] },
],
```

**starter**
```python
kind = "archer"
gap = 3
row = 3

place_tower(kind, gap, row)
```

**solution**
```python
kind = "archer"
gap = 3
row = 3

place_tower(kind, gap, row)
place_tower(kind, gap * 2, row)
place_tower(kind, gap * 3, row)
```

**check**
```js
check: {
  kind: "battle",
  also: { kind: "source", mustInclude: ["*"],
          mustExclude: ["0", "1", "4", "5", "6", "7", "8", "9"],
    message: { he: "רק הספרות `3` ו-`2` מותרות בקוד. את העמודות של המגדל השני והשלישי צריך לחשב מ-`gap`",
               en: "Only the digits `3` and `2` may appear in your code. The columns of the second and third tower have to be worked out from `gap`" } },
}
```

**Verified**: three archers at columns 3, 6 and 9 on row 3 hold all sixteen
monsters at 3/3; two leak three. `gap + gap` instead of `gap * 2` is a legal and
equally correct answer, and it passes — the rule asks for one multiplication, not
for a particular sentence. Row 2 works as well, since it is two cells from the
road and still inside an archer's 2.6 range.

**hints**
1. *nudge* (he): *"את יכולה להקליד רק `3` ו-`2`. איזה מספר את צריכה בשביל המגדל השני, ואיך אפשר להגיע אליו משני המספרים שיש לך?"*
   (en): *"You may only type `3` and `2`. What number do you need for the second tower, and how could you get to it from the two you have?"*
2. *tool* (he): *"אפשר לכתוב חשבון ישר בתוך הסוגריים: `place_tower(kind, gap * 2, row)`. Python מחשב קודם את `gap * 2` ואז מציב את המגדל בעמודה שיצאה."*
   (en): *"You can write arithmetic straight inside the brackets: `place_tower(kind, gap * 2, row)`. Python works out `gap * 2` first and then places the tower at the column that came out."*
3. *walkthrough* (he): *"`gap` מחזיק 3, אז המגדל הראשון עומד בעמודה 3. השני צריך להיות פי שניים רחוק — `gap * 2`, כלומר 6. השלישי פי שלושה — `gap * 3`, כלומר 9. שלוש שורות `place_tower`, כולן עם `row` בסוף, ובלי אף ספרה חוץ מ-3 ו-2."*
   (en): *"`gap` holds 3, so the first tower stands at column 3. The second has to be twice as far — `gap * 2`, which is 6. The third three times — `gap * 3`, which is 9. Three `place_tower` lines, all with `row` at the end, and not a digit other than 3 and 2 anywhere."* → solution unlocks.

### b3 — התותחים של הרב־טוראי / The Quartermaster's Cannons · 35 XP, 9 🪙

**Why this mechanic**: the same two operators as b1, on a price that does not
divide evenly. 300 gold at 90 a cannon is three cannons and 30 left over, and the
level's output rule is what separates `//` from `/`: `300 / 90` is
`3.333333333333333` on the screen and nobody can build a third of a cannon.
It is also her first meeting with armour: a cyclops has 5 of it, so an archer's
10 becomes 5 while a cannon's 28 becomes 23.

**brief (he)**: *"קיקלופים בדרך, והם עבים מכל מה שראית. הרב־טוראי פותח את המחסן
ויש בו תותחים בלבד — 90 דרכמות לתותח, 28 נזק, ופגיעה שמתפשטת לצדדים.\n\n300
זהב.\n\nחשבי כמה תותחים אפשר לקנות וכמה נשאר, הדפיסי את שתי השורות, ובני את
התותחים. שימי לב: התותחים חייבים לעמוד קרוב זה לזה — לתותח יש טווח קצר יותר
מלקשת, 2.2 משבצות בלבד."*

```
Cannons: 3
Left over: 30
```

**brief (en)**: *"Cyclopes on the road, thicker than anything you have seen. The
quartermaster opens the store and there are only cannons in it — 90 drachmas each,
28 damage, and a hit that splashes sideways.\n\n300 gold.\n\nWork out how many
cannons that buys and how much is left, print the two lines, and build them.
Note: cannons want to stand close together — a cannon reaches 2.2 squares, less
than an archer."*

**level**
```js
map: { cols: 14, rows: 7, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[12,4],[13,4]] },
gold: 300, campHp: 3, seed: 3, allowed: ["cannon"],
waves: [
  { delay: 0,  enemies: [ { kind: "hellhound", count: 4, gap: 1.2 } ] },
  { delay: 12, enemies: [ { kind: "cyclops", count: 2, gap: 3.0 } ] },
],
```

**starter**
```python
kind = "cannon"
gold = get_gold()
cost = tower_cost(kind)

# how many cannons, and what does the quartermaster keep?

place_tower(kind, 4, 3)
```

**solution**
```python
kind = "cannon"
gold = get_gold()
cost = tower_cost(kind)

cannons = gold // cost
left = gold % cost
print(f"Cannons: {cannons}")
print(f"Left over: {left}")

place_tower(kind, 4, 3)
place_tower(kind, 5, 3)
place_tower(kind, 6, 3)
```

**check**
```js
check: {
  kind: "battle",
  also: [
    { kind: "output", mode: "normalized", expect: "Cannons: 3\nLeft over: 30" },
    { kind: "source", mustInclude: ["//", "%"],
      message: { he: "חשבי כמה תותחים וכמה עודף עם `//` ו-`%`, כל אחד במשתנה משלו — `/` ייתן שליש תותח",
                 en: "Work out the count and the change with `//` and `%`, each in its own variable — `/` would give you a third of a cannon" } },
  ],
}
```

**Verified**: three cannons side by side at columns 4, 5 and 6 hold at 3/3; two
cannons lose the camp entirely; a fourth is refused for 30 drachmas. Three cannons
spread far apart (2, 7, 11) leak one — which is the level teaching cannon range
without a paragraph about it.

**hints**
1. *nudge* (he): *"300 חלקי 90 זה 3.33. כמה תותחים זה בפועל, ומה קורה ל-0.33 שנשאר?"*
   (en): *"300 divided by 90 is 3.33. How many cannons is that in practice, and what happens to the 0.33 that is left?"*
2. *tool* (he): *"`gold // cost` נותן שלושה — כמה תותחים שלמים נכנסים. `gold % cost` נותן 30 — מה שלא הספיק לתותח נוסף. שמרי כל אחד במשתנה, ואז הדפיסי."*
   (en): *"`gold // cost` gives three — how many whole cannons fit. `gold % cost` gives 30 — what was not enough for another one. Keep each in a variable, then print."*
3. *walkthrough* (he): *"`cannons = gold // cost` ואחריו `left = gold % cost`, ואז שתי שורות `print` עם f-strings. אחר כך שלושה תותחים. הטווח שלהם קצר, אז בני אותם צמודים — למשל בעמודות 4, 5 ו-6 על שורה 3 — כדי שכולם יירו על אותו קיקלופ בו זמנית."*
   (en): *"`cannons = gold // cost`, then `left = gold % cost`, then two `print` lines with f-strings. Then three cannons. Their range is short, so build them close — columns 4, 5 and 6 on row 3 — so that all three fire on the same cyclops at once."* → solution unlocks.

### b4 — העדר מכפיל את עצמו / The Horde Doubles · 40 XP, 9 🪙

**Why this mechanic**: `**`, met where it matters — one hellhound was spotted, the
number has doubled every night since, and the scouts only remember how many nights.
The level bans the digit `8`, so the size of tonight's horde can only come out of
`2 ** nights`. It is also the exact chain the boss needs, at a quarter of the size:
`input` → `int()` → arithmetic → f-string → build.

**brief (he)**: *"לפני שבוע ראו כלב גיהינום אחד בגבול. מאז המספר מכפיל את עצמו
כל לילה.\n\nהשורה הראשונה כבר שואלת כמה לילות עברו — אבל היא מחזירה טקסט,
ואי אפשר להעלות טקסט בחזקה. תקני את זה.\n\nחשבי כמה מפלצות יש הלילה, כמה תותחים
הזהב קונה וכמה נשאר, הדפיסי ארבע שורות, ובני.\n\n**חוק הלילה:** אסור לכתוב את
הספרה `8` בקוד."*

```
Nights: 3
Monsters: 8
Cannons: 3
Left over: 30
```

**brief (en)**: *"A week ago one hellhound was seen at the border. The number has
doubled every night since.\n\nThe first line already asks how many nights have
passed — but it hands back text, and text cannot be raised to a power. Fix that.
\n\nWork out how many monsters are coming tonight, how many cannons the gold buys
and what is left, print the four lines, and build.\n\n**Tonight's rule:** the digit
`8` may not appear in your code."*

**level**
```js
map: { cols: 14, rows: 7, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[12,4],[13,4]] },
gold: 300, campHp: 3, seed: 4, allowed: ["cannon"],
waves: [ { delay: 0, enemies: [ { kind: "hellhound", count: 8, gap: 1.6 } ] } ],
```

**starter**
```python
kind = "cannon"
nights = input("How many nights since the scouts counted one? ")
# careful: what type is nights right now?
```

**solution**
```python
kind = "cannon"
nights = int(input("How many nights since the scouts counted one? "))
monsters = 2 ** nights

gold = get_gold()
cost = tower_cost(kind)
cannons = gold // cost
left = gold % cost

print(f"Nights: {nights}")
print(f"Monsters: {monsters}")
print(f"Cannons: {cannons}")
print(f"Left over: {left}")

place_tower(kind, 4, 3)
place_tower(kind, 5, 3)
place_tower(kind, 6, 3)
```

**check**
```js
check: {
  kind: "battle",
  stdin: ["3"],
  also: [
    { kind: "output", mode: "normalized",
      expect: "Nights: 3\nMonsters: 8\nCannons: 3\nLeft over: 30" },
    { kind: "source", mustInclude: ["**", "//", "%", "int("], mustExclude: ["8"],
      message: { he: "גודל העדר מגיע מ-`2 ** nights`, לא מהקלדה. את התשובה של `input()` צריך להמיר ב-`int()`, ואסור לכתוב `8`",
                 en: "The size of the horde comes from `2 ** nights`, not from typing. The answer from `input()` must be converted with `int()`, and `8` may not be written" } },
  ],
}
```

**Verified**: three cannons hold all eight hounds at 3/3; two lose. Three cannons
spread out (3, 7, 11) also win here, because the hounds arrive 1.6 seconds apart
rather than in a clump — a deliberate contrast with b3. Writing `monsters = 8` is
rejected with the rule's message. The starter as given raises
`TypeError: unsupported operand type(s) for ** or pow(): 'int' and 'str'` the
moment she writes `2 ** nights`, which is the error the teach section just showed
her, arriving while it is still on screen.

**hints**
1. *nudge* (he): *"הריצי כמו שהוא והקלידי 3. איזו שגיאה קפצה, ועל איזה משתנה היא מדברת?"*
   (en): *"Run it as it is and type 3. What error came up, and which variable is it talking about?"*
2. *tool* (he): *"`input()` מחזיר `str`, ואי אפשר להעלות טקסט בחזקה. עטפי ב-`int()`. אחר כך `2 ** nights` הוא מספר המפלצות: לילה אחד נותן 2, שלושה לילות נותנים 8."*
   (en): *"`input()` returns a `str`, and text cannot be raised to a power. Wrap it in `int()`. Then `2 ** nights` is the number of monsters: one night gives 2, three nights give 8."*
3. *walkthrough* (he): *"שורה 2: `nights = int(input(\"...\"))`. שורה 3: `monsters = 2 ** nights`. אחר כך `gold`, `cost`, `cannons = gold // cost` ו-`left = gold % cost`. ארבע שורות `print` עם f-strings לפי הסדר, ובסוף שלושה תותחים צמודים על שורה 3."*
   (en): *"Line 2: `nights = int(input(\"...\"))`. Line 3: `monsters = 2 ** nights`. Then `gold`, `cost`, `cannons = gold // cost` and `left = gold % cost`. Four `print` lines with f-strings in order, and finally three cannons side by side on row 3."* → solution unlocks.

## BOSS — 🐂 מס המינוטאור / The Minotaur's Toll · 60 XP, 15 🪙

```js
quest: {
  id: "boss-minotaur",
  boss: { name: { he: "המינוטאור", en: "The Minotaur" }, icon: "🐂", hp: 420 },
  xp: 60, drachmas: 15,
  …
}
```

**Losing is not possible in the sense that matters**: a lost battle costs her
nothing, the replay is there to be watched again at quarter speed, and the run
button never scolds her (`spec/02-game-design.md`). The Minotaur's health bar is
the real one from the simulation — 420 HP, armour 8 — and it drains as her cannons
land, which is a better boss bar than any number of test cases.

### Why this is the right boss

Three separate pieces of lesson-4 arithmetic decide it, and each one is enforced by
a different part of the engine:

| The Minotaur says | Which is | What enforces it |
| --- | --- | --- |
| one drachma per hero, from every hero | `heroes ** 2` | the budget she is allowed to spend |
| pay it out of the purse | `purse - toll` | `check.maxGoldSpent` |
| how many cannons will that buy | `budget // cost` | the engine refuses a tower she cannot pay for |
| what will not split, he keeps | `budget % cost` | printed in the ledger |
| the average each of you carried, two digits | `round(purse / heroes, 2)` | printed in the ledger |

And a sixth, which is not in the ledger and is the reason the fight is winnable at
all: **`28 - 8 = 20` and `10 - 8 = 2`.** Ten archers cost 500, sit inside the
budget, and lose the camp completely. Six cannons cost 540, and hold. She is given
the damage numbers and the armour numbers in the brief; the subtraction is hers.

### The brief

**he**: *"אנבת' מדברת מהר, כי הוא כבר הרים את הראש:*
> *'הוא גובה מס. כל גיבור משלם דרכמה אחת על כל גיבור בקבוצה — ככה שככל שאנחנו יותר, זה יותר גרוע.'*
> *'המס יוצא מהארנק המשותף, ומה שנשאר זה כל מה שיש לך לבנות איתו.'*
> *'מה שלא מתחלק לתותחים שלמים — הוא לוקח.'*
> *'ובסוף הוא רוצה לדעת כמה כל אחד מאיתנו נשא בממוצע לפני המס, מעוגל לשתי ספרות.'*

*התוכנית שלך שואלת שאלה אחת — כמה גיבורים עוברים איתך — ומדפיסה חמש שורות בדיוק
בפורמט הזה, ואז בונה.*

*ועוד דבר אחד שאנבת' אומרת בשקט: לשור יש שריון 8. חץ עושה 10 נזק. תותח עושה 28.
תעשי את החיסור לפני שאת קונה משהו."*

**en**: *"The Minotaur charges a toll. Every hero pays one drachma for every hero in
the group — so the bigger the group, the worse it gets. The toll comes out of the
shared purse, and what is left is everything you have to build with. Whatever will
not split into whole cannons, he keeps. And at the end he wants to know how much
each of you was carrying on average before the toll, rounded to two digits.\n\nYour
program asks one question — how many heroes cross with you — prints exactly five
lines in this format, and then builds.\n\nOne more thing, quietly, from Annabeth:
the bull has armour 8. An arrow does 10 damage. A cannon does 28. Do the subtraction
before you buy anything."*

**Required output format**, with the numbers from the briefing (`heroes = 6`,
purse 620):
```
Toll: 36
Budget: 584
Cannons: 6
The Minotaur keeps: 44
Average carried: 103.33
```

### The level

```js
map: {
  cols: 16, rows: 8,
  path: [[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],
         [5,3],[5,4],[5,5],
         [6,5],[7,5],[8,5],[9,5],[10,5],
         [10,4],[10,3],[10,2],
         [11,2],[12,2],[13,2],[14,2],[15,2]],
},
gold: 620, campHp: 5, seed: 9, allowed: ["archer", "cannon", "ice"],
waves: [
  { delay: 0,  enemies: [ { kind: "hellhound", count: 10, gap: 0.9 } ] },
  { delay: 18, enemies: [ { kind: "cyclops", count: 6, gap: 1.5 } ] },
  { delay: 38, enemies: [
      { kind: "minotaur", count: 1, gap: 1 },
      { kind: "cyclops", count: 4, gap: 1.2 },
      { kind: "hellhound", count: 10, gap: 0.6 } ] },
],
```

A bridge road: along the top, down the middle, back up to the gate. Three waves,
twenty-seven monsters, and the bull arrives last with an escort so the cannons
cannot all sit on him. All three tower kinds are `allowed` on purpose — the level
does not stop her buying archers, it lets the arithmetic tell her not to.

**starter**
```python
# The Minotaur's Toll
heroes = int(input("How many heroes cross with you? "))
purse = get_gold()
cost = tower_cost("cannon")

# five numbers, then the towers
```

**solution**
```python
# The Minotaur's Toll
heroes = int(input("How many heroes cross with you? "))
purse = get_gold()
cost = tower_cost("cannon")

toll = heroes ** 2
budget = purse - toll
cannons = budget // cost
kept = budget % cost
average = round(purse / heroes, 2)

print(f"Toll: {toll}")
print(f"Budget: {budget}")
print(f"Cannons: {cannons}")
print(f"The Minotaur keeps: {kept}")
print(f"Average carried: {average}")

place_tower("cannon", 2, 1)
place_tower("cannon", 4, 1)
place_tower("cannon", 4, 3)
place_tower("cannon", 6, 4)
place_tower("cannon", 8, 4)
place_tower("cannon", 11, 3)
```

**check**
```js
check: {
  kind: "battle",
  stdin: ["6"],
  maxGoldSpent: 584,
  also: [
    { kind: "output", mode: "normalized",
      expect: "Toll: 36\nBudget: 584\nCannons: 6\nThe Minotaur keeps: 44\nAverage carried: 103.33" },
    { kind: "source", mustInclude: ["**", "//", "%", "round(", "int("],
      message: { he: "המינוטאור רוצה חמישה מספרים מחושבים: `**` למס, `-` לתקציב, `//` לתותחים, `%` למה שהוא לוקח, ו-`round(x, 2)` לממוצע",
                 en: "The Minotaur wants five worked-out numbers: `**` for the toll, `-` for the budget, `//` for the cannons, `%` for what he keeps, and `round(x, 2)` for the average" } },
  ],
}
```

`maxGoldSpent: 584` is the toll made into a rule of the battle: the purse holds
620, and 36 of it belongs to the Minotaur before a single tower is bought, so 584
is every drachma she is allowed to spend. A plan that ignores the toll and spends
the whole chest is rejected with the level's "too expensive" verdict rather than a
lecture.

### Verified against the simulation

| What she might build | Cost | Outcome |
| --- | --- | --- |
| six cannons, spread along the bridge | 540 | **wins**, 5/5 camp HP — the stated solution |
| six cannons clustered mid-bridge | 540 | wins, 5/5 — placement is hers to choose |
| five cannons | 450 | loses: one leaks |
| ten archers, all well placed | 500 | loses badly: five leak. `10 - 8 = 2` |
| six cannons + an ice tower | 610 | rejected — over the toll-adjusted budget |
| five cannons + one ice | 520 | wins: the slow buys the cannons the time they need |
| nothing at all | 0 | loses |

The last two rows matter. The ice tower is a legitimate second answer for a player
who reads the tower table, and the empty program losing is what makes the level a
level.

### hints

1. *nudge* (he): *"הוא אמר חמישה משפטים ויש חמש שורות פלט — אחת לכל משפט. תתחילי מזה שאת כבר יודעת לחשב, ותמשיכי לפי הסדר: כל שורה משתמשת במשהו שחושב בשורה שמעליה. ולפני שאת קונה — כמה נזק באמת עובר שריון 8?"*
   (en): *"He said five things and there are five output lines — one each. Start with the one you already know how to work out and go in order: each line uses something the line above it worked out. And before you buy anything — how much damage actually gets through armour 8?"*
2. *tool* (he): *"הכלים לפי סדר השורות: `**` למס (כל גיבור משלם דרכמה לכל גיבור — כלומר `heroes` כפול `heroes`), `-` לתקציב, `//` לכמה תותחים התקציב קונה, `%` למה שנשאר אצל השור, ו-`round(a / b, 2)` לממוצע. הממוצע מחושב מהארנק המקורי, לפני המס. ואל תשכחי שהתשובה מ-`input()` היא `str` עד שתמירי אותה."*
   (en): *"The tools in output order: `**` for the toll (each hero pays a drachma per hero — `heroes` times `heroes`), `-` for the budget, `//` for how many cannons the budget buys, `%` for what stays with the bull, and `round(a / b, 2)` for the average. The average is of the original purse, before the toll. And remember the answer from `input()` is a `str` until you convert it."*
3. *walkthrough* (he): *"שורת קליטה אחת עטופה ב-`int()`, ואחריה `purse = get_gold()` ו-`cost = tower_cost(\"cannon\")`. חמישה חישובים, כל אחד למשתנה משלו: `toll = heroes ** 2`, `budget = purse - toll`, `cannons = budget // cost`, `kept = budget % cost`, `average = round(purse / heroes, 2)`. חמש שורות `print` עם f-strings בדיוק בנוסח של המשימה. ואז שישה תותחים — בדיוק המספר שיצא לך — קרוב לדרך: `(2,1)`, `(4,1)`, `(4,3)`, `(6,4)`, `(8,4)`, `(11,3)`. קשתים יעשו 2 נזק לשור ולא יעצרו אותו."*
   (en): *"One input line wrapped in `int()`, then `purse = get_gold()` and `cost = tower_cost(\"cannon\")`. Five calculations, each into its own variable: `toll = heroes ** 2`, `budget = purse - toll`, `cannons = budget // cost`, `kept = budget % cost`, `average = round(purse / heroes, 2)`. Five `print` lines with f-strings, exactly in the wording the task gives. Then six cannons — exactly the number you worked out — close to the road: `(2,1)`, `(4,1)`, `(4,3)`, `(6,4)`, `(8,4)`, `(11,3)`. Archers would do 2 damage to the bull and would not stop him."* → solution unlocks.

### Victory

The bar empties, the Minotaur goes off the bridge, and a horn snaps off in her
hand. Short cutscene, then Act II unlocks on the quest map
(`spec/02-game-design.md`).

Victory line (he): *"המינוטאור בוהה במספרים על הגשר, נוהם פעם אחת, ונופל. בידך
נשארה קרן."*
(en): *"The Minotaur stares at the numbers on the bridge, grunts once, and goes
over the side. You are holding a horn."*

## Reward & Recap

**Item**: 🐂 **קרן המינוטאור / The Minotaur's Horn** —
(he) *"נשברה ביד שלך על הגשר. הוכחה שחשבון נכון מזיז מפלצות."*
(en) *"Snapped off in your hand on the bridge. Proof that correct arithmetic
moves monsters."*

**Achievements possible here**
- *קוטלת המינוטאור / Minotaur Slayer* — the Minotaur went off the bridge. Act I
  complete.
- *בלי שריטה / Without a Scratch* — the boss battle won at full camp HP on the
  first submitted run. (Accuracy, not speed — never award for time.)
- *סדר הפעולות / Order of Operations* — won b2 without buying a hint.
- *עקשנית / Persistent* (global) — the one that matters most on a boss: won after
  five failed runs, and it should fire loudly here.
- *משלימה / Completionist* — every battle in Act I, lessons 1–4.

**Recap bullets**
- `+ - * /` עובדים כמו בחשבון, ו-`/` תמיד מחזיר `float` — גם `10 / 2` הוא `5.0`
- `//` נותן כמה שלמים נכנסים, `%` נותן את השארית
- `**` הוא חזקה — `2 ** 10` הוא 1024, ו-`^` הוא משהו אחר לגמרי
- Python מחשב `**` קודם, אחר כך `* / // %`, ובסוף `+ -`; סוגריים גוברים על הכול
- `round(x, 2)` מעגל לשתי ספרות אחרי הנקודה — ככה מראים מספר לבן אדם
- מספרים עשרוניים במחשב הם קירוב, ולפעמים רואים את זה על המסך
- מה שחוזר מ-`input()` הוא טקסט; בלי `int()` החשבון ייפול על `TypeError` — או
  גרוע יותר, יעבוד ויחזיר שטות
- נזק אמיתי הוא `damage - armour`: מול שריון 8 חץ עושה 2 ותותח עושה 20
- `get_gold() // tower_cost(kind)` הוא כמה מגדלים באמת אפשר לבנות — מגדל אחד יותר
  והמשחק יסרב

**Next teaser** (he): *"עברת את הגשר. מעבר לו הכביש פתוח, ובאולימפוס משהו נגנב.
בשיעור הבא התוכנית שלך תלמד את הדבר הראשון שהיא עוד לא יודעת לעשות: להחליט."*
(en): *"You crossed the bridge. Beyond it the road is open, and something has
been stolen on Olympus. Next lesson your program learns the one thing it still
cannot do: decide."*

## Common mistakes to anticipate

| She does | She sees | Hint / callout must cover |
| --- | --- | --- |
| `+` on an `input()` answer without converting | `TypeError: can only concatenate str (not "int") to str` (Skulpt: `cannot concatenate 'str' and 'int' objects`) | `input()` returns text; `int()` first |
| `**`, `-`, `//` or `%` on an unconverted answer | `TypeError: unsupported operand type(s) for ** or pow(): 'int' and 'str'` — the operator's name changes, the cause does not | same cause, different wording: read the two type names at the end of the line |
| `coins * 2` on an unconverted answer | **no error** — `"5" * 2` prints `55` | the silent one; `*` repeats a string |
| `47 / 5` where whole coins were wanted | `9.4` | `/` is exact and floaty, `//` is whole |
| `10 / 2` expecting `5` | `5.0` | `/` always returns a `float` |
| `2 + 3 * 4` expecting 20 | `14` | precedence: `*` before `+`; use parentheses |
| `5 ^ 2` expecting 25 | `7` — no error | `^` is not a power operator; `**` is |
| `round(20 / 3)` expecting `6.67` | `7` | `round` needs its second argument to keep digits |
| `round(2.5)` expecting `3` | `2` | Python rounds a tie to the nearest **even** number |
| dividing by a variable that holds `0` | `ZeroDivisionError: integer division or modulo by zero` (CPython: `division by zero`) | look at the variable *after* the divide sign |
| `print(round(620 / 7, 2))` | `88.56999999999999` — in this engine | floats are approximations; a two-digit round is not always a two-digit number on screen |
| `average = round(left / heroes, 2)` in the boss | `97.33` instead of `103.33` | the average is of the **original purse**, before the toll |
| writes the arithmetic inside the f-string | the battle is won and the `source` rule still fails | the brief asks for named numbers; a `source` rule cannot see inside a string |
| buys archers for the Minotaur | ten well-placed archers, camp at 0/5 | `10 - 8 = 2`; armour is why the cannon exists |
| spends the whole purse and forgets the toll | "too expensive" — the level's budget rule | the budget is the purse *minus* the toll; the bull is paid first |
| builds one tower more than `//` allowed | "not enough gold for that tower — it costs 90 and you had 30" | `//` is not advice, it is the number of lines she may write |
| spreads three cannons across the whole road in b3 | one leaks | a cannon reaches 2.2 squares; short range wants a cluster |

**Skulpt fidelity note.** Three rows above are wording-sensitive and must be
checked against the real engine with `node tools/verify-python.mjs` before the
lesson ships: `ZeroDivisionError` (documented gap in `01-architecture.md`), the
`str`/`int` `TypeError`, and `round(2.5)` — if Skulpt's `round` does not
implement Python 3's round-half-to-even, delete that row rather than teach
something false. **No exercise or case in this lesson depends on a `.5` tie**,
precisely so that a Skulpt difference there can never break a check.

## Implementation notes

- **Boss rendering.** The quest object carries
  `boss: { name, icon, hp: 420 }`, matching the minotaur's real HP in
  `assets/js/battle/sim.js`. The health bar is no longer drained by passing test
  cases: it is the bull's own HP in the recorded simulation, so it drains as her
  cannons land and stalls visibly when she has bought the wrong tower. Partial
  progress between attempts is therefore *the replay*, not a stored case count —
  which is a better boss anyway. Nothing here may reduce her XP or drachmas on a
  failed run (`02-game-design.md`: no punishment mechanics).
- **Battle checks need queued input and an array `also`.** The boss and b4 are
  `check.kind: "battle"` with a `stdin` array (the briefing answers) and with two
  `also` rules — one `output`, one `source`. Both are small additions to
  `checker.js` and `tools/verify-python.mjs`, spelled out in lesson 3's
  implementation notes. They must land before lessons 3 and 4 are built.
- **A `source` rule cannot see inside a string.** The skeleton it inspects has
  string literals stripped, so `print(f"Cannons: {gold // cost}")` contains no
  `//` as far as the rule is concerned. Every brief in this lesson therefore asks
  for the numbers in named variables before printing. Do not "fix" this by setting
  `raw: true` on rules that also ban digits — with `raw` a digit inside a comment
  or a prompt string would trip the ban and the failure would be unexplainable.
- **Float printing in this engine, measured, not assumed.** Skulpt renders a float
  at 16 significant digits and strips trailing zeros, which is *not* CPython's
  shortest-repr:
  - `round(41.5 / 3, 2)` → `13.83` ✓  `round(100 / 7, 2)` → `14.29` ✓
    `round(740 / 6, 2)` → `123.33` ✓  `round(620 / 6, 2)` → `103.33` ✓
  - `round(620 / 7, 2)` → `88.56999999999999` ✗  `round(0.1 + 0.2, 2)` → `0.3`
  The boss's numbers (purse 620, six heroes) were chosen **because** every printed
  value in its ledger is clean in this engine. If a wave or a price is retuned,
  re-derive the average and check it prints exactly, or the boss becomes
  unpassable for a reason no learner could ever diagnose. Generate the expected
  ledger from the engine; never type it from memory.
- **`round()` with two arguments is present in Skulpt** and behaves as needed —
  verified. Add it to the matrix in `01-architecture.md`. `round(2.5)` → `2`
  (round-half-to-even) also holds, but **no level depends on a `.5` tie**, so a
  future divergence there can never break a check.
- **`0.1 + 0.2` prints `0.3` here**, so the classic float-precision demonstration
  does not work in this engine. Teach block 15 uses `round(620 / 7, 2)` instead,
  which does show the effect. Anyone editing that block must re-measure rather
  than reach for the CPython example.
- **Prompt text is not echoed to stdout** — the same engine decision recorded in
  lesson 3's implementation notes. Every expected report on this page assumes it.
- **Output comparison uses `normalized` semantics** as defined in lesson 2.
- **b4's starter is deliberately broken** (missing `int()`) — the second level in
  the course, after lesson 1's b3, that starts from a program which does not run.
  Keep it that way: the `TypeError` appears while the explanation is still on
  screen. Mark it `brokenStarter: true` in the content file so the verifier does
  not treat a failing starter as a build error.
- **No `if`, no comparisons, no loops.** Every level is arithmetic plus build
  calls. It is tempting to let the Minotaur *reject* a group that cannot afford
  the toll — that needs `if`, which is lesson 6. The budget rule
  (`maxGoldSpent`) does the same job here without a condition, because the
  engine enforces it rather than her code.
- **Tower kinds are handed to her, never chosen by her.** b1–b2 are archer-only,
  b3–b4 are cannon-only, and the boss allows three kinds but decides between them
  by arithmetic. Choosing inside one battle is lesson 6, and this lesson must not
  pre-empt it.
- **Level numbers were tuned against the real simulation** and every one of them
  is load-bearing: b1 four archers hold and three leak two; b2 three archers at
  3/6/9 hold and two leak three; b3 three clustered cannons hold, three spread
  ones leak one, two lose the camp; b4 three cannons hold eight hounds; the boss
  needs six cannons — five leak one and ten archers leak five. Re-run the level
  after any change to a wave, a price or the map.
- **Act transition.** Defeating this boss unlocks Act II on the quest map and
  should award the lesson item, the completion bonus, and the ambrosia for a
  completed lesson in one sequence — with the cutscene between the health bar
  emptying and the reward panel, so the reward lands after the story beat and not
  on top of it.
