# Lesson 04 — BOSS: The Minotaur's Toll · מס המינוטאור

> **Act I — Camp Half-Blood** · Stop 4 of 20 · **Act I boss**
> Follows the reference structure in `spec/lessons/lesson-01.md`.
> Schema: `spec/04-lesson-template.md` · Boss rules: `spec/02-game-design.md`.

| | |
| --- | --- |
| **id** | `04` |
| **slug** | `the-minotaurs-toll` |
| **minutes** | 30–35 |
| **concepts** | `+` `-` `*` `/` `//` `%` `**`, operator precedence, `round()` |
| **new vocabulary** | `//`, `%`, `**`, `round` |
| **requires** | lessons 1–3 — `print()`, strings, comments, variables, `str`/`int`/`float`, `type()`, `input()`, `int()`/`float()`, f-strings |
| **item** | 🐂 קרן המינוטאור / The Minotaur's Horn |
| **XP** | 20 + 20 + 25 + 30 + 35 (training) + 60 (boss) + 30 (bonus) = **220** |
| **drachmas** | 5 + 5 + 6 + 8 + 9 + 15 = **48** 🪙 |
| **boss** | 🐂 The Minotaur · **120 HP** · 6 test cases × 20 damage |

Running Act I total after this lesson: **750 XP** — she crosses level 3
(*נושאת חרב / Blade-Bearer*, 600 XP) by defeating the Minotaur, which is the
right moment for a title to change.

## Teaching goal

By the end she can do arithmetic with variables and typed-in numbers, she knows
which operator runs first and how to override it with parentheses, she knows the
difference between `/` and `//`, she knows what `%` is for, and she can present a
messy decimal to a human with `round()`.

The emotional goal: **she beats something.** Three lessons of quiet learning now
cash out in a fight with a health bar, and every test case that passes is 20 HP
off the Minotaur. This is the payoff that makes her open Act II.

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
wrong and he throws you in the river; get it right and he steps aside, furious
and impressed.

Chiron does not come. He says one line from the porch of the Big House and lets
her walk down alone, which is how a boss fight should feel.

The Prophecy panel (5 lines, no code):

> הגשר הישן יוצא מהמחנה אל הכביש. מתחתיו נשמעת נשימה כבדה.
> "מס," נוהם המינוטאור. "מי שעובר — משלם."
> אנבת' לוחשת: "הוא לא בא לאכול אותנו. הוא בא לספור."
> "וכשהחשבון שלו לא מסתדר, הוא זורק אותך לנהר."
> כירון, מהמרפסת, בלי לזוז: "היום את לא צריכה חרב. את צריכה מספרים."

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
    print(0.1 + 0.2)
    ```
    → `0.30000000000000004`
    Explanation (he): *"זו לא שגיאה ולא באג אצלך. מחשבים שומרים שברים עשרוניים
    בבסיס 2, ובבסיס 2 יש שברים שאי אפשר לכתוב בדיוק — בדיוק כמו שאי אפשר לכתוב
    שליש בדיוק בעשרוני. התוצאה קרובה מאוד ולא מדויקת לגמרי. לכן כשמראים מספר
    עשרוני לבן אדם, עוטפים אותו ב-`round()`."*
    Title (he): *"למה 0.1 + 0.2 לא יוצא 0.3"*. This block earns its `myth` tone:
    it is the moment the machine stops looking like magic and starts looking like
    a machine with rules, which is a good thing for her to feel before Act II.

16. **prose** — The bridge. Everything she needs for the Minotaur is now on this
    page: read an answer, convert it, calculate with it, round it, and print it
    inside a sentence. Nothing new is coming. It is a fight, not a lecture.

## Try It (ungraded)

Free-play editor. Nothing is checked, nothing is scored.

```python
print(7 + 3)
print(7 * 3)
print(7 / 3)
print(7 // 3)
print(7 % 3)
print(7 ** 3)
```

Expected output for reference:
```
10
21
2.3333333333333335
2
1
343
```

Intro (he): *"שני את שני המספרים והריצי שוב. תנסי מספרים שמתחלקים בדיוק, ותנסי
מספרים שלא. שימי לב מה קורה ל-`//` ול-`%` כשהמספר הראשון קטן מהשני. שום דבר פה
לא נבדק."*
(en): *"Change both numbers and run again. Try numbers that divide evenly and
numbers that do not. Watch what `//` and `%` do when the first number is smaller
than the second. Nothing here is graded."*

(That last suggestion is deliberate: `3 // 7` is `0` and `3 % 7` is `3`, which
looks wrong until she thinks about it for ten seconds, and thinking about it for
ten seconds is the entire point of a Try It panel.)

## Training exercises

### e1 — ספירת החיצים / Counting arrows · 20 XP, 5 🪙

**brief (he)**: *"בצריף אפולו יש 3 אשפות, ובכל אחת 8 חיצים. הדפיסי כמה חיצים יש
בסך הכול. שורת פלט אחת, מספר בלבד."*
**brief (en)**: *"The Apollo cabin has 3 quivers with 8 arrows in each. Print how
many arrows there are in total. One line of output, the number alone."*

**starter**
```python
# 3 quivers, 8 arrows in each
print()
```

**solution**
```python
print(3 * 8)
```

**check**
```js
check: { kind: "output", mode: "normalized", expect: "24" }
```

Nearly free by design — a success in the first minute, exactly as in lesson 1.
`print(24)` also passes, and that is fine here; e4 is where hard-coding gets
blocked.

**hints**
1. *nudge* (he): *"3 אשפות, 8 בכל אחת. איזו פעולת חשבון עונה על 'בכל אחת'?"*
   (en): *"3 quivers, 8 in each. Which operation answers 'in each'?"*
2. *tool* (he): *"סימן הכפל ב-Python הוא `*`. אפשר לכתוב את החישוב ישירות בתוך
   `print`."*
   (en): *"The multiply sign in Python is `*`. You can write the calculation
   straight inside `print`."*
3. *walkthrough* (he): *"`print(3 * 8)` — Python מחשב קודם את מה שבתוך הסוגריים
   ואז מדפיס את התוצאה."* → solution unlocks.

### e2 — הנזק של Riptide / Riptide's damage · 20 XP, 5 🪙

**brief (he)**: *"בקרב האימונים פגעת 7 פעמים, וכל פגיעה שווה 12 נזק. שמרי את שני
המספרים במשתנים `hits` ו-`damage_per_hit`, חשבי את הסך הכול, והדפיסי שורה אחת
בדיוק: `Total damage: 84`."*
**brief (en)**: *"In the training bout you landed 7 hits, each worth 12 damage.
Keep the two numbers in variables `hits` and `damage_per_hit`, work out the
total, and print exactly one line: `Total damage: 84`."*

**starter**
```python
hits = 7
damage_per_hit = 12
# work out the total, then print the line
```

**solution**
```python
hits = 7
damage_per_hit = 12
total = hits * damage_per_hit
print(f"Total damage: {total}")
```

**check**
```js
check: { kind: "output", mode: "normalized", expect: "Total damage: 84" }
```

The point is arithmetic **on variables** rather than on literals, plus the result
of a calculation getting a name of its own — the shape of every serious program
she will write from here. `print(f"Total damage: {hits * damage_per_hit}")` also
passes; both are correct and worth mentioning in the success message.

**hints**
1. *nudge* (he): *"אפשר להכפיל שני משתנים בדיוק כמו שמכפילים שני מספרים. איפה
   כדאי לשמור את התוצאה?"*
   (en): *"You can multiply two variables exactly like two numbers. Where should
   the result live?"*
2. *tool* (he): *"`total = hits * damage_per_hit` יוצר משתנה שלישי עם התוצאה.
   אחר כך f-string כדי לשתול אותו במשפט."*
   (en): *"`total = hits * damage_per_hit` makes a third variable holding the
   result. Then an f-string to plant it in the sentence."*
3. *walkthrough* (he): *"שורה שלישית: `total = hits * damage_per_hit`. שורה
   רביעית: `print(f"Total damage: {total}")` — עם `f` לפני הגרשיים, והמשתנה בתוך
   הסוגריים המסולסלים."* → solution unlocks.

### e3 — חלוקת השלל / Splitting the loot · 25 XP, 6 🪙

**brief (he)**: *"חזרתן מסיור עם 47 דרכמות ואתן 5 חניכות. מחלקים שווה בשווה,
ומטבע לא נחתך לחצי. שמרי את המספרים במשתנים `drachmas` ו-`campers` והדפיסי שתי
שורות:"*
```
Each camper gets 9
Left over: 2
```
**brief (en)**: *"You come back from a patrol with 47 drachmas and there are 5 of
you. Split it evenly, and a coin does not get cut in half. Keep the numbers in
`drachmas` and `campers` and print two lines."*

**starter**
```python
drachmas = 47
campers = 5
# whole coins each, and whatever is left on the table
```

**solution**
```python
drachmas = 47
campers = 5
print(f"Each camper gets {drachmas // campers}")
print(f"Left over: {drachmas % campers}")
```

**check**
```js
check: { kind: "output", mode: "normalized",
         expect: "Each camper gets 9\nLeft over: 2" }
```

The trap is real and worth letting her fall into: `47 / 5` gives `9.4`, which
prints as `Each camper gets 9.4` and fails the check with an answer she can see
is wrong on sight — nobody can hand somebody 0.4 of a coin. Getting this failure
once is what makes `//` stick.

**hints**
1. *nudge* (he): *"אם תשתמשי ב-`/` תקבלי `9.4`. אפשר לתת למישהו 0.4 מטבע?"*
   (en): *"With `/` you get `9.4`. Can you hand somebody 0.4 of a coin?"*
2. *tool* (he): *"`//` נותן את מספר המטבעות השלמים לכל אחת. `%` נותן כמה נשארו
   שלא התחלקו."*
   (en): *"`//` gives the whole coins each. `%` gives how many were left
   unsplit."*
3. *walkthrough* (he): *"שתי שורות `print` עם f-strings. אפשר לחשב ישר בתוך
   הסוגריים המסולסלים: `f"Each camper gets {drachmas // campers}"` ואחריה
   `f"Left over: {drachmas % campers}"`."* → solution unlocks.

### e4 — סדר האלים / The order of the gods · 30 XP, 8 🪙

**brief (he)**: *"ארבעה צריפים, וכל צריף מביא 2 מגנים ו-3 חניתות. סך הכול צריך
לצאת 20 פריטים — והשורה שלפנייך מדפיסה 14. תקני אותה בעזרת סוגריים בלבד. אסור
לשנות את המספרים ואסור לכתוב את התוצאה ביד."*
**brief (en)**: *"Four cabins, each bringing 2 shields and 3 spears. The total
should be 20 items — and the line in front of you prints 14. Fix it using
parentheses only. Do not change the numbers and do not write the answer by
hand."*

**starter**
```python
# 4 cabins. each brings 2 shields and 3 spears.
# this should print 20. it prints 14.
print(2 + 3 * 4)
```

**solution**
```python
print((2 + 3) * 4)
```

**check**
```js
check: [
  { kind: "output", mode: "normalized", expect: "20" },
  { kind: "source", mustInclude: ["2", "3", "4"], mustExclude: ["20"],
    message: { he: "התיקון הוא בסוגריים, לא במספרים — המספרים 2, 3 ו-4 חייבים להישאר, ואסור לכתוב 20 בעצמך",
               en: "The fix is in the parentheses, not the numbers — 2, 3 and 4 must stay, and you may not write 20 yourself" } }
]
```

The `source` check is what turns this from a triviality into the lesson's
thinking exercise: she cannot escape by printing `20`. Its `message` is written
as an explanation of the rule rather than a report of failure, per
`01-architecture.md`.

**hints**
1. *nudge* (he): *"Python לא קורא את השורה משמאל לימין לפי הסדר. איזו פעולה הוא
   מבצע ראשונה כאן, ואיזו את רוצה שתהיה ראשונה?"*
   (en): *"Python does not read the line left to right in order. Which operation
   runs first here, and which one do you want to run first?"*
2. *tool* (he): *"`*` תמיד רץ לפני `+`. סוגריים עוקפים את זה: מה שבתוכם מחושב
   ראשון."*
   (en): *"`*` always runs before `+`. Parentheses override that: whatever is
   inside them is worked out first."*
3. *walkthrough* (he): *"את רוצה שהחיבור `2 + 3` יקרה קודם, ורק אחר כך הכפל
   ב-4. עטפי את החיבור בסוגריים משלו והשאירי את הכפל בחוץ: `(2 + 3) * 4`."*
   → solution unlocks.

### e5 — המפלצות מכפילות את עצמן / The monsters double · 35 XP, 9 🪙

**brief (he)**: *"בגבול המחנה נראתה מפלצת אחת ביום 0, ומאז המספר מכפיל את עצמו
כל יום. שאלי כמה ימים עברו, וחשבי כמה מפלצות יש עכשיו. שורת פלט אחת:
`After 3 days: 8 monsters`."*
**brief (en)**: *"One monster was spotted at the camp border on day 0, and the
number has doubled every day since. Ask how many days have passed and work out
how many there are now. One line of output: `After 3 days: 8 monsters`."*

**starter**
```python
days = input("How many days? ")
# careful: what type is `days` right now?
```

**solution**
```python
days = int(input("How many days? "))
monsters = 2 ** days
print(f"After {days} days: {monsters} monsters")
```

**check**
```js
check: { kind: "cases", cases: [
  { stdin: ["3"],  expect: "After 3 days: 8 monsters" },
  { stdin: ["0"],  expect: "After 0 days: 1 monsters" },
  { stdin: ["10"], expect: "After 10 days: 1024 monsters" }
] }
```

This is the dress rehearsal for the boss: `input` → `int()` → arithmetic →
f-string, the exact chain, at one fifth the size. The starter deliberately hands
her the *unconverted* version, so the moment she writes `2 ** days` she gets
`TypeError: unsupported operand type(s) for ** or pow(): 'int' and 'str'` — a
cousin of the error from teach block 12, met while the explanation is still on
screen. Hint 1 sends her to read it rather than to fix it.

The `["0"]` case is there because `2 ** 0` is `1`, which surprises people, and
because it produces `1 monsters`. The grammar is wrong and the brief should say
so with a shrug: *"כן, `1 monsters`. המינוטאור לא בודק דקדוק."*

**hints**
1. *nudge* (he): *"הריצי כמו שהוא והקלידי 3. מה השגיאה אומרת, ולאיזה משתנה היא
   מתכוונת?"*
   (en): *"Run it as it is and type 3. What does the error say, and which
   variable does it mean?"*
2. *tool* (he): *"`input()` מחזיר `str`, ואי אפשר להעלות טקסט בחזקה. עטפי
   ב-`int()`, ואז `2 ** days` הוא חזקה."*
   (en): *"`input()` returns a `str`, and you cannot raise text to a power. Wrap
   it in `int()`, and then `2 ** days` is a power."*
3. *walkthrough* (he): *"שורה 1: `days = int(input("How many days? "))`. שורה 2:
   `monsters = 2 ** days` — יום 0 נותן `2 ** 0` שהוא 1, יום 3 נותן 8. שורה 3:
   `print(f"After {days} days: {monsters} monsters")`."* → solution unlocks.

## BOSS — 🐂 מס המינוטאור / The Minotaur's Toll · 60 XP, 15 🪙

```js
quest: {
  id: "boss-minotaur",
  boss: { name: { he: "המינוטאור", en: "The Minotaur" }, icon: "🐂", hp: 120 },
  xp: 60, drachmas: 15,
  …
}
```

**120 HP · 6 test cases · 20 damage per passing case.** Partial progress is kept
and shown between attempts (`02-game-design.md`): if four cases pass, the bar
stays at 40 HP when she comes back. **Losing is not possible.** The failure text
is the Minotaur snorting, never a red X.

### The brief (Annabeth relays the rules, in-world)

**he**: *"אנבת' מדברת מהר, כי הוא כבר הרים את הראש:*
> *'הוא גובה מס. כל גיבור משלם דרכמה אחת על כל גיבור בקבוצה — ככה שככל שאנחנו
> יותר, זה יותר גרוע.'*
> *'המס יוצא מהארנק המשותף.'*
> *'מה שנשאר מתחלק שווה בשווה בינינו, מטבעות שלמים בלבד.'*
> *'מה שלא מתחלק — הוא לוקח.'*
> *'ובסוף הוא רוצה לדעת כמה כל אחד מאיתנו נשא בממוצע לפני המס, מעוגל לשתי ספרות.'*

*התוכנית שלך שואלת שתי שאלות לפי הסדר — כמה גיבורים, וכמה דרכמות יש בארנק —
ומדפיסה חמש שורות בדיוק בפורמט הזה."*

**en**: *"The Minotaur charges a toll. Every hero pays one drachma for every hero
in the group — so the bigger the group, the worse it gets. The toll comes out of
the shared purse. What is left is split evenly between the heroes, whole coins
only. Whatever will not split, he keeps. And at the end he wants to know how much
each of you was carrying on average before the toll, rounded to two digits. Your
program asks two questions in order — how many heroes, and how many drachmas are
in the purse — and prints exactly five lines."*

**Required output format**, shown with the numbers from case 1:
```
Toll: 16
Left: 24
Each hero keeps: 6
The Minotaur keeps: 0
Average carried: 10.0
```

The five rules, restated as five lines she can tick off (put this in the brief as
a list — a boss brief may be long, but it must never be vague):

| # | The Minotaur says | Which is |
| --- | --- | --- |
| 1 | one drachma per hero, from every hero | `heroes ** 2` |
| 2 | pay it out of the purse | `purse - toll` |
| 3 | split what is left, whole coins | `left // heroes` |
| 4 | what will not split, he keeps | `left % heroes` |
| 5 | the average carried before the toll, 2 digits | `round(purse / heroes, 2)` |

Rule 1 is the one worth thinking about, and the brief should state it in words
only — "each hero pays one drachma for every hero in the group" — and let her
work out that this is `heroes * heroes`, which is `heroes ** 2`. That is the
single genuine piece of reasoning in the boss and it should not be given away
above hint 2.

**solution**
```python
# The Minotaur's Toll
heroes = int(input("How many heroes? "))
purse = int(input("How many drachmas in the purse? "))

toll = heroes ** 2
left = purse - toll
share = left // heroes
kept = left % heroes
average = round(purse / heroes, 2)

print(f"Toll: {toll}")
print(f"Left: {left}")
print(f"Each hero keeps: {share}")
print(f"The Minotaur keeps: {kept}")
print(f"Average carried: {average}")
```

### The six test cases

Each case is one exchange with the Minotaur and each carries an in-theme label
that is shown on the health bar as it drains.

| # | he label | stdin | expected output |
| --- | --- | --- | --- |
| 1 | ארבעה גיבורים, ארנק מלא | `["4", "40"]` | `Toll: 16` / `Left: 24` / `Each hero keeps: 6` / `The Minotaur keeps: 0` / `Average carried: 10.0` |
| 2 | שלושה, וחשבון שלא מתחלק | `["3", "20"]` | `Toll: 9` / `Left: 11` / `Each hero keeps: 3` / `The Minotaur keeps: 2` / `Average carried: 6.67` |
| 3 | חמישה, בקושי עוברים | `["5", "30"]` | `Toll: 25` / `Left: 5` / `Each hero keeps: 1` / `The Minotaur keeps: 0` / `Average carried: 6.0` |
| 4 | שבעה נוסעים, מאה דרכמות | `["7", "100"]` | `Toll: 49` / `Left: 51` / `Each hero keeps: 7` / `The Minotaur keeps: 2` / `Average carried: 14.29` |
| 5 | לבד על הגשר | `["1", "9"]` | `Toll: 1` / `Left: 8` / `Each hero keeps: 8` / `The Minotaur keeps: 0` / `Average carried: 9.0` |
| 6 | המס בדיוק כגודל הארנק | `["6", "36"]` | `Toll: 36` / `Left: 0` / `Each hero keeps: 0` / `The Minotaur keeps: 0` / `Average carried: 6.0` |

**check**
```js
check: { kind: "cases", cases: [
  { stdin: ["4", "40"],
    expect: "Toll: 16\nLeft: 24\nEach hero keeps: 6\nThe Minotaur keeps: 0\nAverage carried: 10.0" },
  { stdin: ["3", "20"],
    expect: "Toll: 9\nLeft: 11\nEach hero keeps: 3\nThe Minotaur keeps: 2\nAverage carried: 6.67" },
  { stdin: ["5", "30"],
    expect: "Toll: 25\nLeft: 5\nEach hero keeps: 1\nThe Minotaur keeps: 0\nAverage carried: 6.0" },
  { stdin: ["7", "100"],
    expect: "Toll: 49\nLeft: 51\nEach hero keeps: 7\nThe Minotaur keeps: 2\nAverage carried: 14.29" },
  { stdin: ["1", "9"],
    expect: "Toll: 1\nLeft: 8\nEach hero keeps: 8\nThe Minotaur keeps: 0\nAverage carried: 9.0" },
  { stdin: ["6", "36"],
    expect: "Toll: 36\nLeft: 0\nEach hero keeps: 0\nThe Minotaur keeps: 0\nAverage carried: 6.0" }
] }
```

**Why these six, and in this order.** They are ordered so that the fight gets
harder as the bar drains, and each one exists to catch a specific wrong solution:

1. **`4, 40`** — everything divides evenly and nothing is left over. A solution
   that used `/` instead of `//` still fails here (`6.0` instead of `6`), so the
   first hit is not free, but every other quantity is round and readable.
2. **`3, 20`** — the first case with a remainder (`kept` is 2) and the first
   average that does not come out clean: `round(20 / 3, 2)` is `6.67`. This case
   fails for anyone who forgot the second argument to `round()`, which would give
   `7`.
3. **`5, 30`** — the toll (25) eats most of the purse. Catches sign and order
   mistakes in `purse - toll`; writing `toll - purse` gives `-5` here.
4. **`7, 100`** — awkward numbers throughout, `round(100 / 7, 2)` is `14.29`.
   Catches anyone rounding to the wrong number of digits or rounding the wrong
   value (`round(left / heroes, 2)` gives `7.29`, not `14.29`).
5. **`1, 9`** — a single hero. `heroes ** 2` is `1`, and any solution that
   hard-coded a multiplier or assumed a crowd falls apart. Also the case where
   `heroes ** 2` and `heroes * 2` finally disagree in an obvious way — for
   `heroes = 2` they are both 4, which is why no case uses 2.
6. **`6, 36`** — the toll is exactly the purse. `left` is `0`, so `share` and
   `kept` are both `0`. Zeros are where beginner arithmetic quietly breaks, and
   it is a satisfying last blow: the group pays everything and walks across with
   empty pockets.

**Failure feedback** must name the case, in-theme, and show both numbers —
*"המינוטאור עוצר אותך על שלושה גיבורים ו-20 דרכמות. הוא ציפה ל-`Average carried:
6.67` וקיבל `Average carried: 6.6666666666666665`."* Showing the expected line
beside her line is the whole feedback loop; showing only "wrong" is useless.

**hints** (three, as everywhere; the third unlocks the full solution)
1. *nudge* (he): *"המינוטאור אמר חמישה משפטים ויש חמש שורות פלט — אחת לכל משפט.
   כמה מהן את כבר יודעת לחשב בלי לחשוב? תתחילי מהן, ותתקדמי לפי הסדר: כל שורה
   משתמשת במשהו שחושב בשורה שלפניה."*
   (en): *"He said five things and there are five output lines — one each. How
   many can you already work out without thinking? Start there and go in order:
   each line uses something the line above it worked out."*
2. *tool* (he): *"הכלים, לפי סדר השורות: `**` למס (כל גיבור משלם דרכמה לכל
   גיבור — כלומר `heroes` כפול `heroes`), `-` למה שנשאר, `//` לחלוקה בשלמים,
   `%` למה שהמינוטאור לוקח, ו-`round(a / b, 2)` לממוצע. ואל תשכחי ששתי התשובות
   מ-`input()` הן `str` עד שתמירי אותן."*
   (en): *"The tools, in output order: `**` for the toll (each hero pays a
   drachma per hero — `heroes` times `heroes`), `-` for what is left, `//` for
   the even split, `%` for what he keeps, and `round(a / b, 2)` for the average.
   And remember both answers from `input()` are `str` until you convert them."*
3. *walkthrough* (he): *"שתי שורות קליטה, שתיהן עטופות ב-`int()` — אחת ל-`heroes`
   ואחת ל-`purse`. אחר כך חמישה חישובים, כל אחד למשתנה משלו: `toll = heroes ** 2`,
   `left = purse - toll`, `share = left // heroes`, `kept = left % heroes`,
   ו-`average = round(purse / heroes, 2)` — שימי לב שהממוצע מחושב מהארנק המקורי,
   לפני המס. בסוף חמש שורות `print` עם f-strings, בדיוק בנוסח שבמשימה."*
   → solution unlocks.

### Victory

On the sixth case passing: the bar empties, the Minotaur is thrown off the
bridge by his own arithmetic, and a horn snaps off in her hand. Short cutscene,
then Act II unlocks on the quest map (`02-game-design.md`).

Victory line (he): *"המינוטאור בוהה במספרים על הגשר, נוהם פעם אחת, וזז הצידה.
בידך נשארה קרן."*
(en): *"The Minotaur stares at the numbers on the bridge, grunts once, and steps
aside. You are holding a horn."*

## Reward & Recap

**Item**: 🐂 **קרן המינוטאור / The Minotaur's Horn** —
(he) *"נשברה ביד שלך על הגשר. הוכחה שחשבון נכון מזיז מפלצות."*
(en) *"Snapped off in your hand on the bridge. Proof that correct arithmetic
moves monsters."*

**Achievements possible here**
- *קוטלת המינוטאור / Minotaur Slayer* — all six cases passed. Act I complete.
- *בלי שריטה / Without a Scratch* — all six cases passed on the first submitted
  run. (Accuracy, not speed — never award for time.)
- *סדר הפעולות / Order of Operations* — solved e4 without buying a hint.
- *עקשנית / Persistent* (global) — the one that matters most on a boss: solved
  after five failed runs, and it should fire loudly here.
- *משלימה / Completionist* — every exercise in Act I, lessons 1–4.

**Recap bullets**
- `+ - * /` עובדים כמו בחשבון, ו-`/` תמיד מחזיר `float` — גם `10 / 2` הוא `5.0`
- `//` נותן כמה שלמים נכנסים, `%` נותן את השארית
- `**` הוא חזקה — `2 ** 10` הוא 1024, ו-`^` הוא משהו אחר לגמרי
- Python מחשב `**` קודם, אחר כך `* / // %`, ובסוף `+ -`; סוגריים גוברים על הכול
- `round(x, 2)` מעגל לשתי ספרות אחרי הנקודה — ככה מראים מספר לבן אדם
- מספרים עשרוניים במחשב הם קירוב: `0.1 + 0.2` יוצא `0.30000000000000004`
- מה שחוזר מ-`input()` הוא טקסט; בלי `int()` החשבון ייפול על `TypeError` — או
  גרוע יותר, יעבוד ויחזיר שטות

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
| `print(0.1 + 0.2)` | `0.30000000000000004` | floats are approximations; `round()` before showing a human |
| swaps the two boss questions | every case fails with heroes and purse exchanged | answers are consumed in the order the `input()` calls run |
| `average = round(left / heroes, 2)` in the boss | case 4 gives `7.29` instead of `14.29` | the average is of the **original purse**, before the toll |

**Skulpt fidelity note.** Three rows above are wording-sensitive and must be
checked against the real engine with `node tools/verify-python.mjs` before the
lesson ships: `ZeroDivisionError` (documented gap in `01-architecture.md`), the
`str`/`int` `TypeError`, and `round(2.5)` — if Skulpt's `round` does not
implement Python 3's round-half-to-even, delete that row rather than teach
something false. **No exercise or case in this lesson depends on a `.5` tie**,
precisely so that a Skulpt difference there can never break a check.

## Implementation notes

- **Boss rendering.** The quest object carries `boss: { name, icon, hp: 120 }`
  and the checker reports per-case results so `game.js` can drain the bar by
  `hp / cases.length` per pass. Passing cases are stored, so a returning learner
  sees the bar where she left it. Nothing in this lesson may reduce her XP or
  drachmas on a failed run (`02-game-design.md`: no punishment mechanics).
- **All six cases run in one submit.** Six sequential Skulpt runs, each with two
  queued stdin answers — well inside the 5000 ms `execLimit` per run, but the
  limit applies **per run**, not to the batch, so a slow machine cannot fail the
  boss for being slow.
- **Float formatting is load-bearing here.** `round(40 / 4, 2)` is `10.0` and
  prints as `10.0`, not `10`. `round(100 / 7, 2)` is `14.29`. Verify both in
  Skulpt: JavaScript and CPython agree on these values, but the *printed* form
  of a float is engine-specific and every case in the table depends on it. If
  Skulpt ever prints `10` for `10.0`, the whole case table is regenerated from
  the engine, not hand-edited.
- **`round()` with two arguments must be confirmed present in Skulpt** before
  shipping — it is the one built-in in this lesson that is not in the verified
  matrix in `01-architecture.md`. Add it to that matrix once verified. If it is
  missing, the fallback is `round(purse / heroes * 100) / 100`, which uses only
  operators she now has, and the lesson gains a small callout about it — but do
  not ship that fallback without need; `round(x, 2)` is what she will meet
  everywhere else.
- **Prompt text is not echoed to stdout** — the same engine decision recorded in
  lesson 3's implementation notes. Every `expect` on this page assumes it.
- **`cases` comparison uses `normalized` semantics** as defined in lesson 2.
- **Exercise e5's starter is deliberately broken** (missing `int()`), which makes
  it the second exercise in the course after lesson 1's e3 to start from a
  failing program. Keep it that way: the error appears while the explanation is
  still on screen.
- **No `if`, no comparisons, no loops.** The boss is arithmetic only. It is
  tempting to make the Minotaur "reject" a group that cannot afford the toll —
  that needs `if`, which is lesson 6. Case 6 (`6, 36`) is the closest this lesson
  goes to that idea, and it stays pure arithmetic.
- **Act transition.** Defeating this boss unlocks Act II on the quest map and
  should award the lesson item, the completion bonus, and the ambrosia for a
  completed lesson in one sequence — with the cutscene between the health bar
  emptying and the reward panel, so the reward lands after the story beat and not
  on top of it.
