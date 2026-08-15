# 07 — Curriculum: the twenty lessons

## The contract

**A lesson may use anything from lessons 1..N-1 and nothing from N+1.** This
table is the authority for what "already taught" means. If you need something
earlier than it appears here, the curriculum is wrong — fix it here first, then
fix the lessons.

Deep per-lesson design lives in `spec/lessons/lesson-NN.md`.

## Act I — Camp Half-Blood · מחנה חצי־דם
*Arrival. Foundations. She learns that she can make the machine do things.*

| # | Title | Teaches | New vocabulary |
| --- | --- | --- | --- |
| 1 | The First Word · המילה הראשונה | `print()`, strings, quotes, comments, reading an error | `print`, `#` |
| 2 | The Camp Necklace · שרשרת המחנה | variables, assignment, `str`/`int`/`float`, `type()` | `=`, `type` |
| 3 | Speaking with Chiron · שיחה עם כירון | `input()`, `int()`/`float()`/`str()`, f-strings | `input`, `int`, `f"…"` |
| 4 | **BOSS: The Minotaur's Toll** · מס המינוטאור | `+ - * / // % **`, operator precedence, `round()` | `//`, `%`, `**`, `round` |

## Act II — The Lightning Thief · גנב הברק
*Stolen master bolt. She learns to make the program decide and repeat.*

| # | Title | Teaches | New vocabulary |
| --- | --- | --- | --- |
| 5 | The Oracle's Riddle · חידת האורקל | `True`/`False`, `== != < > <= >=`, `and`/`or`/`not` | `bool`, `and`, `or`, `not` |
| 6 | The Crossroads · פרשת הדרכים | `if` / `elif` / `else`, **indentation**, nesting | `if`, `elif`, `else`, `:` |
| 7 | Past the Sirens · מעבר לסירנות | `while`, accumulators, `break`, infinite loops | `while`, `break` |
| 8 | **BOSS: Medusa's Garden** · גן המדוזה | `for`, `range()`, `continue`, loop patterns | `for`, `in`, `range`, `continue` |

## Act III — Sea of Monsters · ים המפלצות
*A quest by sea. She learns to hold many things at once.*

| # | Title | Teaches | New vocabulary |
| --- | --- | --- | --- |
| 9 | The Quest Party · חבורת המסע | lists, indexing, `len()`, iterating, `in` | `[]`, `len`, `in` |
| 10 | The Hunters' Inventory · מלאי הציידות | `.append` `.remove` `.sort`, slicing, `sorted`, `min`/`max`/`sum` | `.append`, `[a:b]`, `sorted` |
| 11 | Registry of the Gods · מרשם האלים | dicts, keys/values, `.get`, `.items()`, adding/updating | `{}`, `.get`, `.items` |
| 12 | **BOSS: The Hydra** · ההידרה | nested lists/dicts, iterating structures, counting, searching | `for … in dict`, nesting |

## Act IV — The Titan's Curse · קללת הטיטאן
*She stops writing scripts and starts building tools.*

| # | Title | Teaches | New vocabulary |
| --- | --- | --- | --- |
| 13 | Daedalus' Blueprints · שרטוטי דדלוס | `def`, calling, parameters, why functions exist | `def` |
| 14 | The Map Maker · יוצרת המפות | `return`, multiple params, defaults, scope | `return` |
| 15 | The Dice of Fate · קוביות הגורל | `import`, `random`, `math`; builds a playable mini-game | `import`, `random`, `math` |
| 16 | **BOSS: The Maze Within** · המבוך שבתוך המבוך | recursion, base case, recursive descent | recursion |

## Act V — The Last Olympian · האולימפי האחרון
*Craft, then mastery.*

| # | Title | Teaches | New vocabulary |
| --- | --- | --- | --- |
| 17 | Decoding the Prophecy · פענוח הנבואה | string methods, slicing, `.split`/`.join`, `.upper`, f-string formatting | `.split`, `.join`, `.strip` |
| 18 | Surviving the Furies · לשרוד את הפוריות | reading tracebacks, `try`/`except`, validating input, debugging method | `try`, `except` |
| 19 | The Forge of Hephaestus · נפחיית הפייסטוס | `class`, `__init__`, `self`, attributes, methods, inheritance | `class`, `self` |
| 20 | **CAPSTONE: Battle for Olympus** · הקרב על אולימפוס | integrates everything into a text battle game she builds | — |

## Optional side quests

Marked clearly, never required, never blocking. Attached to the lesson that
makes them possible:

- L8 — FizzBuzz, retold as Zeus/Poseidon
- L10 — linear search and finding a maximum by hand
- L12 — bubble sort, watching a list sort itself step by step
- L16 — Fibonacci and the golden ratio in Greek architecture
- L19 — a second class that inherits from the first

## Deliberately excluded

- **File I/O and `json`** — Skulpt does not support them (`01-architecture.md`).
- **`while`/`for … else`, generators, decorators, comprehension nesting,
  `lambda`, `*args`/`**kwargs`** — real Python, wrong audience, wrong year.
- **Anything requiring `pip`.**

## Pacing

Each lesson is 20–35 minutes. An act is a week of casual evenings. The whole
course is a school term. **She must be able to stop mid-lesson and come back** —
progress is saved per exercise, not per lesson.
