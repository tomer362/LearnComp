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
| **XP** | 25 + 25 + 30 + 35 (training) + 55 (quest) + 30 (bonus) = **200** |

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

## Story beat

Act IV ended in the Labyrinth. Act V opens above ground, and the news is worse.
The Oracle has sent a prophecy about the war for Olympus, but it arrived by
Iris-message through a storm: the lines came out padded with whitespace, some in
capitals, some in fragments, and the pieces are out of order. Annabeth has the
scroll spread on the ping-pong table in the Big House and cannot make it say
anything.

Chiron does not offer to translate it. He points out that a prophecy is text, and
text is something she now knows how to take apart.

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

## Training exercises

### e1 — The Oracle shouts · 25 XP, 6 🪙

The line arrived padded with whitespace and in lower case. The camp reads
prophecies aloud, in capitals, between two seal marks.

Starter:
```python
line = "   a hero shall rise from the sea   "
# print the line cleaned, in capitals, between [ and ]
```

Required output:
```
[A HERO SHALL RISE FROM THE SEA]
```

Solution:
```python
line = "   a hero shall rise from the sea   "
print("[" + line.strip().upper() + "]")
```

- **check**: `{ kind: "output", mode: "normalized", expect: "[A HERO SHALL RISE FROM THE SEA]" }`
- The brackets are not decoration — they are what makes `.strip()` testable.
  Without them, whitespace normalisation would let an unstripped line pass.
- hints:
  1. הריצי את הקוד עם הסוגריים המרובעים מסביב, בלי לנקות כלום. מה את רואה בין
     ה-`[` לבין ה-`a`?
  2. את צריכה שניים: אחד שמוריד רווחים מהקצוות ואחד שהופך לאותיות גדולות.
     שניהם methods של מחרוזת, שניהם עם נקודה.
  3. `line.strip()` מחזיר מחרוזת בלי הרווחים. אפשר להדביק עליו עוד נקודה מיד:
     `line.strip().upper()`. השרשור עובד כי כל method מחזיר מחרוזת חדשה שאפשר
     להמשיך לעבוד עליה.

### e2 — Past the guards · 25 XP, 6 🪙

Hermes wraps sensitive messages in dummy characters so a curious god skimming the
Iris channel sees nothing. Three `X` at the start, three at the end.

Starter:
```python
scroll = "XXXTHE FURIES ARE COMINGXXX"
# print only the real message
```

Required output:
```
THE FURIES ARE COMING
```

Solution:
```python
scroll = "XXXTHE FURIES ARE COMINGXXX"
print(scroll[3:-3])
```

- **check**: `{ kind: "output", mode: "normalized", expect: "THE FURIES ARE COMING" }`
  plus `{ kind: "source", raw: true, mustExclude: ["\"THE FURIES"], message: { he: "צריך לחתוך את המחרוזת, לא להדפיס אותה מחדש ביד", en: "Slice the string — do not retype the message" } }`
- Teaches positive and negative indices in one slice. `.replace("X", "")` also
  produces the right answer and is a legitimate different idea — accept it, and
  say so in hint 3.
- hints:
  1. כמה תווים יש בשמירה בכל צד? ומאיזה מקום מתחילה ההודעה האמיתית?
  2. את צריכה פרוסה: `scroll[a:b]`. ההתחלה היא מספר חיובי. הסוף אפשר לספור
     מהסוף אחורה עם מינוס.
  3. שלושה `X` בהתחלה, אז ההודעה מתחילה במקום 3. שלושה בסוף, אז היא נגמרת
     שלושה לפני הקצה: `scroll[3:-3]`. דרך שנייה שגם עובדת:
     `scroll.replace("X", "")` — פחות מדויקת אם יש `X` בתוך ההודעה, אבל פה היא
     כשרה.

### e3 — Counting the words of fate · 30 XP, 8 🪙

The Oracle charges by the word — literally, in drachmas — and Annabeth wants to
know which word in the line is carrying the most weight.

Starter:
```python
line = "the sea shall claim what the sky has stolen"
# print how many words, then print the longest word
```

Required output:
```
9
stolen
```

Solution:
```python
line = "the sea shall claim what the sky has stolen"
words = line.split()
print(len(words))

longest = words[0]
for word in words:
    if len(word) > len(longest):
        longest = word
print(longest)
```

- **check**: `{ kind: "output", mode: "normalized", expect: "9\nstolen" }`
  plus `{ kind: "source", mustInclude: [".split"], message: { he: "המשימה הזו דורשת ‎.split()‎ — לא ספירה ידנית", en: "This one needs .split() — not counting by hand" } }`
- This is the join point of the lesson: `.split()` hands her a list, and from
  there it is the "find the maximum" pattern from lesson 10. Say that out loud in
  the brief — she should notice that she already knew half of this.
- hints:
  1. `.split()` מחזיר לך משהו. מה הסוג שלו? ומה כבר את יודעת לעשות עם דבר
     מהסוג הזה?
  2. אחרי `line.split()` יש לך רשימה של מילים. `len()` על הרשימה נותן את מספר
     המילים. בשביל הארוכה ביותר — זו אותה תבנית "מצא את המקסימום" משיעור 10,
     רק שמשווים `len(word)` במקום את המילה עצמה.
  3. שמרי `words = line.split()` והדפיסי `len(words)`. אחר כך התחילי מ
     `longest = words[0]`, עברי בלולאה על כל מילה, ואם `len(word)` גדול מ
     `len(longest)` — עדכני את `longest`. בסוף הלולאה תדפיסי אותה.

### e4 — The armory board · 35 XP, 9 🪙

Before a battle the Hephaestus cabin nails a board to the armory door: a title
banner, and one line listing everything available, in capitals, separated by
bars.

Starter:
```python
weapons = ["riptide", "bow", "shield"]
# 1) a banner:  the word ARMORY centred in 30 characters, padded with "="
# 2) one line:  the weapon names in CAPITALS, joined by " | "
```

Required output:
```
=========== ARMORY ===========
RIPTIDE | BOW | SHIELD
```

Solution:
```python
weapons = ["riptide", "bow", "shield"]
print(" ARMORY ".center(30, "="))

loud = []
for weapon in weapons:
    loud.append(weapon.upper())
print(" | ".join(loud))
```

- **check**: `{ kind: "output", mode: "normalized", expect: "=========== ARMORY ===========\nRIPTIDE | BOW | SHIELD" }`
- **Design note:** the banner is padded with `=`, not spaces, precisely so that
  `normalized` cannot wash the formatting away. Any exercise in this course that
  tests alignment must pad with a visible character, or it is untestable.
- The gap between `ARMORY` and the `=` marks comes from the spaces inside
  `" ARMORY "`. That is the whole trick, and hint 3 says so.
- hints:
  1. שתי שורות פלט, שתי משימות נפרדות. תתחילי מהשנייה — איך הופכים רשימה
     לשורה אחת עם מפריד?
  2. לשורה השנייה: לולאה שבונה רשימה חדשה של שמות ב-`upper()`, ואז
     `" | ".join(...)`. לשורה הראשונה: ל-string יש method בשם `.center` שמקבל
     רוחב ותו מילוי.
   3. הבאנר הוא `" ARMORY ".center(30, "=")` — שימי לב לרווחים **בתוך**
      הגרשיים, הם אלה שיוצרים את הרווח סביב המילה. לשורה השנייה: רשימה ריקה,
      לולאה שעושה `loud.append(weapon.upper())`, ואז `print(" | ".join(loud))`.

## Quest — "The Prophecy Inside the Prophecy" · 55 XP, 14 🪙

Annabeth has straightened the six lines out. They are still padded, and they
still say nothing useful — until she notices that the Oracle hides one word
where nobody reads: **down the first letters.**

Brief: clean every line, take its first letter, put the letters together into one
word, and print a report card for the scroll.

Starter:
```python
lines = [
    "  Rivers will rise  ",
    "Every torch goes dark",
    "  Six shall stand",
    "Chains break at dawn  ",
    "Under a broken sky",
    "Even gods will kneel",
]

# 1) a banner: THE PROPHECY, centred in 30, padded with "-"
# 2) HIDDEN WORD: the first letter of every cleaned line, in capitals
# 3) WORDS: the total number of words in all six lines
# 4) AVERAGE PER LINE: words divided by lines, one digit after the point
```

Required output:
```
-------- THE PROPHECY --------
HIDDEN WORD: RESCUE
WORDS: 22
AVERAGE PER LINE: 3.7
```

Solution:
```python
lines = [
    "  Rivers will rise  ",
    "Every torch goes dark",
    "  Six shall stand",
    "Chains break at dawn  ",
    "Under a broken sky",
    "Even gods will kneel",
]

letters = []
total_words = 0
for line in lines:
    clean = line.strip()
    letters.append(clean[0])
    total_words = total_words + len(clean.split())

secret = "".join(letters).upper()
average = total_words / len(lines)

print(" THE PROPHECY ".center(30, "-"))
print(f"HIDDEN WORD: {secret}")
print(f"WORDS: {total_words}")
print(f"AVERAGE PER LINE: {average:.1f}")
```

- **check**: `{ kind: "output", mode: "normalized", expect: "-------- THE PROPHECY --------\nHIDDEN WORD: RESCUE\nWORDS: 22\nAVERAGE PER LINE: 3.7" }`
  plus `{ kind: "source", raw: true, mustInclude: [".join", ".strip"], mustExclude: ["RESCUE"], message: { he: "המילה חייבת להיבנות מהשורות, לא להיכתב ביד", en: "The word must be built from the lines, not typed in" } }`
- Why `.strip()` is load-bearing and not busywork: `"  Six shall stand"[0]` is a
  **space**, so the hidden word comes out as `RE CU E` without it. She will
  probably hit that, and it is the best possible proof that cleaning input
  matters. Hint 1 aims her straight at it.
- Every part of the lesson appears here: `.strip`, indexing, `.split`, `len`,
  `.join`, `.upper`, `.center`, and an f-string with `:.1f`.
- hints:
  1. הריצי גרסה שלוקחת `line[0]` בלי לנקות קודם. מה יצא במילה הנסתרת, ולמה
     יש שם חורים?
  2. בכל סיבוב של הלולאה את צריכה שלושה דברים מאותה שורה נקייה: את התו
     הראשון (לרשימה), את מספר המילים (לסכום), וזהו. אחרי הלולאה: `"".join`
     על הרשימה, ו-`total_words / len(lines)` לממוצע.
  3. פתחי `letters = []` ו-`total_words = 0`. בלולאה: `clean = line.strip()`,
     אחר כך `letters.append(clean[0])`, אחר כך
     `total_words = total_words + len(clean.split())`. אחרי הלולאה
     `secret = "".join(letters).upper()`. את הממוצע מדפיסים עם
     `f"AVERAGE PER LINE: {average:.1f}"`.

## Reward & Recap

**Item**: 📜 **מגילת האורקל / The Oracle's Scroll** — "הנבואה שפענחת, מגולגלת
וקשורה בסרט. אף אחד אחר במחנה לא הצליח לקרוא אותה."

Bead 17 is added to the necklace.

**Achievements possible here**: *Wordsmith* (finished the quest with no hints),
*Persistent* (solved any exercise after five failed runs).

**Recap bullets**:
- string הוא רצף של תווים — אינדקסים ופרוסות עובדים עליו בדיוק כמו על רשימה
- methods של מחרוזת **מחזירים** מחרוזת חדשה ולא משנים את המקורית — צריך לשמור
- `.strip()` מוריד רווחים מהקצוות, `.upper()` ו-`.lower()` משנים גודל אותיות
- `.split()` הופך מחרוזת לרשימה, `" ".join(list)` מחזיר רשימה למחרוזת
- בתוך f-string, `{value:.1f}` שולט בכמה ספרות אחרי הנקודה, ו-`.center(n, "=")`
  ממרכז שורה

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

## Implementation notes

- Every construct here is in the verified matrix in `01-architecture.md`. All
  code in this file was executed against the vendored `skulpt.min.js` and the
  outputs above are the real ones, character for character.
- **The formatting-check rule.** `normalized` collapses runs of whitespace, so
  space-based alignment (`f"{name:<10}"`) cannot be checked with it. Two legal
  options: pad with a visible character (`.center(30, "=")`) — used in e4 and the
  quest — or declare `mode: "exact"` with a written reason. Never use `exact`
  merely to be strict.
- **Two checks on one exercise use the `also` field**, the pattern established
  in lesson 1 e1. Every "plus" written in this file is an `also`:
  ```js
  { kind: "output", mode: "normalized", expect: "9\nstolen",
    also: { kind: "source", mustInclude: [".split"],
            message: { he: "…", en: "…" } } }
  ```
- **`raw: true` is required on exactly two `source` checks here** — e2 and the
  quest — because both name string literals (`"THE FURIES`, `RESCUE`) and a
  comment-and-literal-stripped skeleton would never contain them. Without `raw`,
  e2's `mustExclude` could never fire and the quest's could never fire either,
  so both shortcuts would pass silently. e3's `.split` and the quest's `.join` /
  `.strip` are syntax and survive stripping, so `raw: true` does not hurt them.
- `mustExclude: ["RESCUE"]` with `raw: true` will also trip if she writes the
  word in a Hebrew comment. That is acceptable; the `message` explains the
  requirement, and the failure is self-evident.
- No `input()` in this lesson, so nothing blocks on a prompt.
- The `[::-1]` reverse trick in callout 5 is shown, not required by any check.
  Keep it that way — step slicing is a nice thing to recognise and a poor thing
  to be graded on.
- Skulpt prints lists with single quotes (`['sea', 'sky']`), the same as CPython.
  The teach outputs above already reflect that.
