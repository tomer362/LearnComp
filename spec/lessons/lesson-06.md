# Lesson 06 — The Crossroads · פרשת הדרכים

> **Act II — The Lightning Thief · גנב הברק** · Stop 6 of 20
> Structure follows `spec/lessons/lesson-01.md`. Schema: `spec/04-lesson-template.md`.
> **The game is the course**: the graded work is five battle levels.
> Level schema and API: `spec/09-battle-game.md`. Control model: **build script**
> (`place_tower`, `get_gold`, `tower_cost`, `get_wave`, `get_map`, `camp_hp`).

| | |
| --- | --- |
| **id** | `06` |
| **slug** | `the-crossroads` |
| **minutes** | 30–35 |
| **concepts** | `if` / `elif` / `else`, the colon, **indentation (הזחה)**, blocks, nesting |
| **new vocabulary** | `if`, `elif`, `else`, `:`, block, הזחה / indentation |
| **requires** | L1–L4 · **L5 booleans and comparisons** (every condition here is a lesson-5 expression) |
| **item** | 👟 נעלי הכנף / The Winged Shoes |
| **XP** | 20 + 25 + 30 + 30 (training battles) + 55 (great battle) + 30 (bonus) = **190** |
| **drachmas** | 5 + 6 + 8 + 8 + 15 = **42** 🪙 |
| **towers** | 🏹 archer (50) · 💣 cannon (90) · ❄️ ice (70) |
| **mechanic** | **the cannon cannot hit anything flying** — that is what makes the branch matter |

## Teaching goal

By the end she can write a program that takes a different path depending on its
data — and, more importantly, **she can read indentation and fix an indentation
error without help.**

This is the longest lesson in Act II on purpose. `if` itself takes eight minutes
to teach. Indentation takes the rest, and it is the concept that decides whether
lessons 7–20 are pleasant or miserable. Every Python program she writes for the
rest of her life is shaped by whitespace. She gets a whole lesson to make peace
with it, with three separate error blocks and a debugging exercise, because the
alternative is that she meets it alone at 11pm inside a `while` loop.

**One new idea, stated honestly**: `if` and indentation are one idea here, not
two — the colon opens a block and the indentation *is* the block. Teaching them
apart would be the mistake.

**What makes the decision real.** `spec/09-battle-game.md`: the cannon is
artillery and **cannot hit anything that flies**; archer, ice and lightning can
hit both. Harpies fly. On top of that, damage per hit is `max(1, damage - armour)`,
so a cyclops with armour 5 takes 5 from an arrow and 23 from a shell. Air and
armour pull in opposite directions, which is why every battle in this lesson has
a right branch and a wrong one, and why the wrong one loses monsters-through-the-gate
rather than style points. The engine even names the mistake: *"המגדל במשבצת
(x, y) הוא תותח, והוא לא מסוגל לפגוע במפלצות מעופפות."*

## Story beat

They leave camp before dawn: her, Grover, and Annabeth, with nine days until the
solstice and a stolen master bolt somewhere west. Two hours out, the road ends
and splits into three. A weathered wooden post stands in the fork with the
caduceus of Hermes carved into it, and three sentences underneath.

Grover looks at her. Annabeth looks at her. Nobody moves, because the group has
exactly one program running and it has no way to choose.

Cast: Grover (wants the safe road and a snack), Annabeth (points out the sign is
a decision tree), Hermes in the myth callout.

**Prophecy panel**:

> יצאתם מהמחנה לפני עלות השחר, ותשעה ימים על השעון.
> אחרי שעתיים הדרך נגמרת בלי אזהרה — ומתפצלת לשלוש.
> על עמוד עץ ישן חרוט סמל של הרמס, ומתחתיו שלוש שורות:
> "הדרך הימנית מהירה. הדרך השמאלית בטוחה. הדרך האמצעית — תלוי."
> גרובר מסתכל עלייך: "תלוי במה?"
> אנאבת' מחייכת: "בדיוק. עכשיו את צריכה תוכנית שיודעת להחליט."

## Chiron Teaches — block by block

1. **prose** — כל תוכנית שכתבת עד היום רצה מלמעלה למטה, כל שורה, תמיד. זה מה
   שהפך אותה לצפויה — וזה גם מה שהופך אותה למוגבלת. תוכנית שרצה תמיד אותו דבר
   יכולה לעשות רק דבר אחד. אתמול למדת לקבל תשובה `True` או `False`. היום שורות
   שלמות ירוצו רק כשהתשובה `True`.

2. **code · runnable** — the first `if`. First 60 seconds.
   ```python
   days_left = 9
   if days_left < 10:
       print("Hurry.")
   print("The road forks here.")
   ```
   Output:
   ```
   Hurry.
   The road forks here.
   ```
   Caption (he): "שתי שורות הודפסו. עוד רגע נגלה שרק אחת מהן הייתה בסכנה."

3. **code · runnable** — the same program, one number changed. Run it before
   naming anything.
   ```python
   days_left = 20
   if days_left < 10:
       print("Hurry.")
   print("The road forks here.")
   ```
   Output:
   ```
   The road forks here.
   ```
   Caption (he): "שינית מספר אחד ושורה שלמה נעלמה מהפלט. השורה המוזחת רצה רק
   כשהתשובה `True`. השורה הצמודה לשוליים רצה תמיד."

4. **prose** — Anatomy, named now that she has seen both outcomes. ל־`if` יש
   ארבעה חלקים, וכולם חובה:
   - המילה `if`
   - **שאלה** שמחזירה `True` או `False` — בדיוק מה שלמדת אתמול
   - **נקודתיים** `:` בסוף השורה
   - ואז **בלוק**: שורה אחת או יותר שדחופות פנימה

5. **prose — the indentation section.** This gets its own heading in the rendered
   page (`## הזחה — הרווחים הם התחביר`).

   בשפות רבות אחרות סוגריים מסולסלים `{ }` מסמנים איפה הבלוק מתחיל ונגמר,
   והרווחים הם רק יופי. **בפייתון אין סוגריים כאלה.** הרווחים בתחילת השורה הם
   הדבר היחיד שאומר לפייתון "השורה הזו שייכת ל־`if`".

   כלומר: ההזחה (indentation) היא לא עיצוב. **היא התחביר.** שינוי ברווחים משנה
   את מה שהתוכנית עושה, בדיוק כמו שינוי במילה.

   הכלל המעשי: **ארבעה רווחים.** מקש Tab בעורך של הקורס מכניס ארבעה רווחים
   בדיוק, אז אפשר להשתמש בו בלי לספור. כל השורות באותו בלוק חייבות להיות
   מיושרות זו לזו.

6. **code · runnable** — a block with two lines, proving the block is a group,
   not one line.
   ```python
   monsters = 3
   if monsters > 0:
       print("Something is on the road.")
       print("Grover hides behind Annabeth.")
   print("The sign is still there.")
   ```
   Output: three lines. Change `monsters` to `0` and the first two vanish
   together. Caption: "שתי השורות המוזחות הן חבילה אחת. או ששתיהן רצות, או
   ששתיהן לא."

7. **error #1 — the missing indent.** This is the error she will meet most.
   ```python
   if 3 > 2:
   print("The Oracle was right")
   ```
   What the engine shows (verified, exact):
   ```
   SyntaxError: bad input (line 2)
   ```
   plus the Hebrew explainer `SYNTAX_HELP.missingIndent` from `engine.js`, which
   fires because the previous line ends in `:`.
   What real CPython 3 shows for the same code:
   ```
   IndentationError: expected an indented block after 'if' statement on line 1
   ```
   explain (he): אחרי נקודתיים פייתון **מחכה** לפחות לשורה אחת דחופה פנימה. הוא
   הגיע לשורה 2, מצא אותה צמודה לשוליים, ולא ידע למי היא שייכת. השם האמיתי של
   השגיאה הזו בפייתון הוא `IndentationError` — שגיאת הזחה — והיא אומרת מילולית
   "ציפיתי לבלוק מוזח". המנוע שלנו מקצר את השם, אבל **מספר השורה תמיד נכון**,
   וזו השורה שצריך לדחוף פנימה. התיקון: Tab אחד בתחילת שורה 2.

   *(See Implementation notes: the block carries both strings, and `engine.js`
   must add the Hebrew indentation explainer for this case.)*

8. **error #2 — the indent that belongs to nothing.**
   ```python
   print("We reached the crossroads")
       print("Grover sat down")
   ```
   Engine (verified, exact): `SyntaxError: bad input (line 2)`, with
   `SYNTAX_HELP.unexpectedIndent` attached — *"השורה הזאת מוזחת פנימה, אבל השורה
   שלפניה לא פותחת בלוק."*
   CPython 3: `IndentationError: unexpected indent`
   explain (he): הפעם הבעיה הפוכה. שום דבר לא פתח בלוק — אין `if` ואין נקודתיים
   — ולכן אין למי שהרווחים בשורה 2 יהיו שייכים. פייתון לא מנחש. **בלוק נפתח רק
   אחרי שורה שנגמרת בנקודתיים.** התיקון: להצמיד את שורה 2 לשוליים.

9. **error #3 — the ragged block.** The most confusing of the three, and the one
   where the engine's message is exact.
   ```python
   if 3 > 2:
       print("The road is clear")
     print("We keep walking")
   ```
   Engine (verified, exact — and this one Skulpt words like CPython):
   ```
   SyntaxError: unindent does not match any outer indentation level (line 3)
   ```
   with `SYNTAX_HELP.raggedIndent` attached.
   explain (he): שורה 2 מוזחת בארבעה רווחים ושורה 3 בשניים. פייתון מחפש למה
   שני הרווחים האלה מתאימים — לא לבלוק של ה־`if` ולא לשוליים החיצוניים — ומודיע
   שאין רמה כזו. **בתוך בלוק, כל השורות חייבות אותה כמות רווחים בדיוק.** התיקון:
   להחליט אם שורה 3 שייכת ל־`if` (ארבעה רווחים) או לא (אפס), ולסדר בהתאם.

10. **compare** — the same three lines, two meanings.
    - **bad**
      ```python
      if monsters > 0:
          print("Draw your sword.")
          print("Run.")
      ```
      label (he): "שתי השורות בבלוק. שתיהן רצות רק אם יש מפלצות."
    - **good**
      ```python
      if monsters > 0:
          print("Draw your sword.")
      print("Run.")
      ```
      label (he): "אותן שלוש שורות, רווחים אחרים, משמעות אחרת: `Run.` מודפס תמיד.
      אף אחת מהן לא שגויה — הן שתי תוכניות שונות."

    This is the block that turns "indentation is a rule I must obey" into
    "indentation is a tool I use". Put it right after the three errors, while the
    fear is fresh.

11. **callout · warn** — title: הנקודתיים.
    text: השגיאה הכי שקטה בשיעור הזה היא נקודתיים חסרות. `if x > 3` בלי `:`
    ייתן `SyntaxError: bad input (line N)`, והשורה שיצוינה היא שורת ה־`if`
    עצמה. כשאת רואה `SyntaxError` על שורה שמתחילה ב־`if`, בדקי קודם את הסוף
    שלה, לא את ההתחלה. (המנוע מזהה את המקרה הזה ומוסיף הסבר בעברית — אבל ההודעה
    האנגלית האמיתית תמיד מוצגת לצידו.)

12. **prose + code · runnable** — `else`. שני מסלולים, ותמיד רץ בדיוק אחד.
    ```python
    supplies = 2
    if supplies >= 3:
        print("Take the long safe road.")
    else:
        print("Take the fast road. We cannot wait.")
    ```
    Output: `Take the fast road. We cannot wait.`
    Two rules to state explicitly: ל־`else` **אין שאלה** — הוא לוקח את כל מה
    שנשאר; ו־`else` נכתב צמוד לשוליים, מיושר בדיוק מתחת ל־`if` שלו.

13. **prose + code · runnable** — `elif`. יותר משני מסלולים.
    ```python
    monsters = 4
    if monsters == 0:
        print("The road is clear.")
    elif monsters < 3:
        print("We can fight through.")
    elif monsters < 10:
        print("We go around.")
    else:
        print("We run.")
    ```
    Output: `We go around.`
    Caption (he): "`elif` זה קיצור של else if. פייתון בודק מלמעלה למטה, עוצר
    **בתשובה ה־`True` הראשונה**, ומדלג על כל השאר — גם אם הן נכונות גם כן."

14. **callout · tip** — title: הסדר בשרשרת קובע.
    text: `monsters = 1` הוא גם קטן מ־3 וגם קטן מ־10. הוא ידפיס `We can fight
    through.` כי זו השאלה הראשונה שענתה `True`. אם היית מחליפה את סדר שתי
    השורות, הענף `monsters < 3` לא היה רץ **אף פעם** — כל מספר קטן מ־3 היה נתפס
    קודם על ידי `< 10`. הכלל: **השאלה הצרה ביותר קודם.** זה לא ייתן שגיאה, וזה
    בדיוק מה שהופך את הבאג הזה למעצבן.

15. **compare** — a chain versus separate `if`s. The distinction most beginners
    never get told.
    - **bad** (label: "שתי שאלות נפרדות — שתיהן נבדקות, ושתי השורות מודפסות")
      ```python
      gold = 5
      if gold < 10:
          print("Low on drachmas.")
      if gold < 100:
          print("Not rich.")
      ```
      Output: both lines.
    - **good** (label: "שרשרת אחת — נבדקת עד התשובה הראשונה, ומודפסת שורה אחת")
      ```python
      gold = 5
      if gold < 10:
          print("Low on drachmas.")
      elif gold < 100:
          print("Not rich.")
      ```
      Output: one line.

    Neither is wrong; they answer different questions. Say that out loud in the
    labels — a `compare` block where `bad` is not actually bad teaches judgement,
    and she is old enough for judgement.

16. **prose + code · runnable** — nesting. בלוק יכול להכיל `if` נוסף, ואז יש
    שתי רמות של הזחה: ארבעה רווחים ושמונה.
    ```python
    at_crossroads = True
    has_map = False
    if at_crossroads:
        print("Three roads.")
        if has_map:
            print("Annabeth reads the map.")
        else:
            print("We choose by instinct.")
    ```
    Output:
    ```
    Three roads.
    We choose by instinct.
    ```
    Caption (he): "ה־`else` הפנימי מוזח בארבעה רווחים, כי הוא שייך ל־`if`
    הפנימי. הרווחים הם מה שקושר כל `else` ל־`if` הנכון שלו — אין שום דבר אחר
    שעושה את זה."

17. **callout · myth** — title: הרמס, אל הדרכים.
    text: הרמס הוא שליח האלים, ובין השאר גם אל הדרכים, הנוסעים והצמתים. ביוון
    העתיקה הציבו בכל צומת עמוד אבן שנקרא *herm* לכבודו, כדי שמי שעומד שם ולא
    יודע לאן ללכת יזכור שמישהו כבר עבר פה. תוכנית עם `if` היא בדיוק זה: עמוד
    בצומת עם הוראות למי שיגיע.

18. **prose + code · runnable** — the bridge into the battles, and the rule the
    whole lesson turns on. Run it on the training field:
    ```python
    wave = "harpy"
    if wave == "harpy":
        place_tower("archer", 2, 3)
    else:
        place_tower("cannon", 2, 3)
    print("ready")
    ```
    Output: `ready` — and a different tower on the board depending on one word.
    Explain (he): עד עכשיו ה־`if` בחר איזו שורה **להדפיס**. עכשיו הוא בוחר איזה
    **מגדל לבנות**, ולזה יש תוצאה שאפשר לראות: הרפיה עפה, ותותח יורה פגזים.
    פגז לא פוגע במשהו שנמצא באוויר — אף פעם. קשת, קרח וברק פוגעים גם בקרקע וגם
    באוויר; תותח פוגע בקרקע בלבד, ובתמורה הוא חזק פי הרבה נגד שריון.

19. **callout · warn** — title: תותח נגד משהו שעף זה מגדל שמסתכל.
    text: אם תבני תותח מול גל של הרפיות, הוא לא ייכשל ולא יזרוק שגיאה — הוא
    יעמוד שם בלי לירות אף פעם. המנוע יגיד לך את זה בסוף הקרב במילים האלה: *"המגדל במשבצת
    (2, 3) הוא תותח, והוא לא מסוגל לפגוע במפלצות מעופפות."* לכן השאלה "מי
    מגיע?" היא לא סגנון. היא ההבדל בין הגנה לבין קישוט.

## Try It (ungraded)

Intro (he): *"התור שלך לעמוד בצומת. שני את `road` ואת `danger` והריצי. יש
צירוף אחד שמדפיס שתי שורות — תמצאי אותו. שום דבר פה לא נבדק."*

```python
road = "middle"
danger = 7

if road == "left":
    print("Safe, slow, and Grover approves.")
elif road == "right":
    print("Fast. Loud. Something heard us.")
else:
    print("The middle road. Nobody knows what is on it.")

if danger > 5:
    print("Draw your sword.")
```

Output as shipped (verified):
```
The middle road. Nobody knows what is on it.
Draw your sword.
```
The second `if` is separate from the chain on purpose — she can discover that a
program can hold more than one decision.

## Training battles

Four battles and a great battle, all on the **build-script** model. Every one of
them is decided by a real matchup, not by flavour text:

> **💣 The cannon cannot hit anything that flies.** Archer, ice and lightning can
> hit both ground and air. Harpies fly. That single rule is why lesson 6 needs
> `if`/`elif`/`else`: choosing the wrong tower is not "less good", it is a tower
> that stands there and watches monsters go past.

And the second lever, from `spec/09-battle-game.md`: damage per hit is
`max(1, damage - armour)`. A cyclops has armour 5, so an archer's arrow lands for
5 instead of 10 while a cannon shell lands for 23. Air and armour together are
enough to make a three-way chain a real decision — verified by simulating every
branch of every level.

**The report is not in her source.** b2, b3 and the great battle read the
scouting report with `input()`, and the level supplies the answer through
`check.stdin`. She cannot look at her own code and know which branch will run, so
hard-coding the winning build is a gamble rather than a shortcut — verified: a
program that skips the chain and places the ground defense loses b2 outright.
That is `if`/`elif`/`else` being *needed*, not merely required.

Each level is `check.kind: "battle"` with an `also` `source` rule naming the
construct. The battle punishes the wrong branch; the `source` rule stops her from
deleting the chain once she has seen a report go by.

### b1 — השורה שרצה רק לפעמים / The Line That Runs Only Sometimes · 20 XP, 5 🪙

**Why this mechanic**: her first `if` block is the tower that decides the battle,
and the level begins **broken** — the block is not indented, so nothing runs at
all. She meets `SyntaxError: bad input (line 7)` in the first minute, fixes it
with one Tab, and watches four harpies die that would otherwise have walked in.
Indentation stops being a rule and becomes a thing that saves the camp.

```js
map: { cols: 12, rows: 7,
       path: [[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[5,4],[5,5],
              [6,5],[7,5],[8,5],[9,5],[10,5],[11,5]] },
gold: 230, campHp: 3, seed: 21, allowed: ["archer", "cannon"],
waves: [
  { delay: 0,  enemies: [ { kind: "hellhound", count: 3, gap: 1.3 } ] },
  { delay: 11, enemies: [ { kind: "harpy", count: 4, gap: 0.9 } ] },
],
```

**brief (he)**: שלושה כלבי גיהינום בשביל, ואחריהם ארבע הרפיות **באוויר**. התותח
שלך יטפל בכלבים — אבל תותח יורה פגזים, ופגז לא פוגע במשהו שעף.

השורות הראשונות כבר כתובות. השורה האחרונה, זו שמציבה את הקשת, לא מוזחת — ולכן
התוכנית לא רצה בכלל. הריצי, קראי את השגיאה, ודחפי אותה פנימה עם Tab.

**starter** (deliberately broken — `brokenStarter: true`)
```python
they_fly = True

place_tower("cannon", 3, 4)
place_tower("archer", 2, 2)

if they_fly:
place_tower("archer", 6, 4)
```
What the engine shows, verified: `SyntaxError: bad input (line 7)`, and because
line 6 ends with `:` the explainer attached is `SYNTAX_HELP.missingIndent` —
*"השורה שלפני נגמרת ב־`:`, ולכן השורה הזאת צריכה להיות מוזחת פנימה."*

**solution**
```python
they_fly = True

place_tower("cannon", 3, 4)
place_tower("archer", 2, 2)

if they_fly:
    place_tower("archer", 6, 4)
```
Verified: 3/3, seven kills, 190 of 230 gold spent. Without that one archer the
camp is overrun (3 leaks). Replacing it with a second cannon also loses — the
cannons see the harpies and cannot fire.

**check**
```js
check: {
  kind: "battle",
  also: { kind: "source", mustInclude: ["if"],
          message: { he: "המגדל האחרון צריך לעמוד בתוך בלוק של if — זה מה שהופך אותו לתלוי בתשובה",
                     en: "The last tower belongs inside an if block — that is what makes it depend on the answer" } }
}
```

**hints**
1. (he) "הריצי כמו שזה. פייתון מציין מספר שורה — לכי לשורה הזאת. מה יש בשורה
   שמעליה בסוף?"
2. (he) "שורה שנגמרת ב־`:` פותחת **בלוק**, ובלוק חייב להיות מוזח פנימה. עמדי
   בתחילת השורה ולחצי Tab פעם אחת (ארבעה רווחים)."
3. (he) "אחרי `if they_fly:` השורה הבאה נדחפת פנימה בארבעה רווחים. אחרי שזה רץ,
   נסי בכוונה לשנות את `they_fly` ל־`False` ולהריץ שוב: הקשת לא תיבנה, ההרפיות
   יעברו, והמנוע יגיד לך שהתותחים לא מסוגלים לפגוע במשהו שעף. זה בדיוק מה
   שהבלוק שולט עליו."

### b2 — מי מגיע / Who Is Coming · 25 XP, 6 🪙

**Why this mechanic**: two branches, two completely different defenses, and the
wrong one is not a near miss — it is two cannons watching eight harpies fly over
them. `if`/`else` here is the difference between winning and killing four
monsters out of twelve.

```js
map: { cols: 13, rows: 8,
       path: [[0,6],[1,6],[2,6],[3,6],[3,5],[3,4],[3,3],[4,3],[5,3],
              [6,3],[7,3],[8,3],[8,2],[8,1],[9,1],[10,1],[11,1],[12,1]] },
gold: 200, campHp: 3, seed: 22, allowed: ["archer", "cannon"],
waves: [
  { delay: 0, enemies: [ { kind: "satyr", count: 4, gap: 0.8 } ] },
  { delay: 8, enemies: [ { kind: "harpy", count: 8, gap: 0.6 } ] },
],
```

**brief (he)**: אנאבת' יוצאת לסיור ותחזור רגע לפני הקרב. מה שהיא תראה יגיע
לתוכנית שלך דרך `input()` — ואת לא יודעת מראש מה זה יהיה.

כתבי הגנה שמתאימה את עצמה לדיווח: **אם** הגל מעופף — ארבע קשתות, כי רק הן
מגיעות לאוויר. **אחרת** — שני תותחים, שזה מה שנכון נגד גל קרקעי.

שני הענפים חייבים להיות כתובים נכון. לנחש איזה מהם ירוץ זו לא אסטרטגיה.

**starter**
```python
wave = input("What did the scouts see? ")

if wave == "harpy":
    place_tower("archer", 2, 5)
```

**solution**
```python
wave = input("What did the scouts see? ")

if wave == "harpy":
    place_tower("archer", 2, 5)
    place_tower("archer", 4, 2)
    place_tower("archer", 6, 2)
    place_tower("archer", 10, 2)
else:
    place_tower("cannon", 4, 2)
    place_tower("cannon", 7, 2)
```
Verified with `stdin: ["harpy"]`: 3/3, twelve kills, 200 of 200 spent. The `else`
branch, run against this wave, kills four and loses 3 HP; a cannon plus two
archers also loses; and a program that reads the report and then ignores it,
placing the two cannons unconditionally, loses in exactly the same way.

**check**
```js
check: {
  kind: "battle",
  stdin: ["harpy"],
  also: { kind: "source", mustInclude: ["if", "else"],
          message: { he: "התוכנית צריכה שני מסלולים: if לדיווח המעופף, ו־else לכל השאר",
                     en: "The program needs both paths: if for the flying report, else for everything else" } }
}
```

**hints**
1. (he) "הריצי, והקלידי `harpy` כשהתוכנית שואלת. עכשיו נסי להריץ שוב ולהקליד
   משהו אחר — מה נבנה? ומה יקרה אם תבני שני תותחים נגד גל מעופף?"
2. (he) "`else` נכתב צמוד לשוליים, מיושר בדיוק מתחת ל־`if` שלו, עם נקודתיים
   אחריו — ובלי שאלה. כל מה שמתחתיו מוזח בארבעה רווחים."
3. (he) "בתוך ה־`if` ארבע שורות `place_tower` של `\"archer\"` —
   `(2,5)`, `(4,2)`, `(6,2)`, `(10,2)`. אחריהן, בשורה חדשה בלי הזחה, `else:`
   ואז שני תותחים מוזחים. שימי לב שאת כותבת קוד לענף שלא ירוץ היום; זה תקין
   לגמרי, וזה כל הרעיון."

### b3 — שלושה דיווחים, שרשרת אחת / Three Reports, One Chain · 30 XP, 8 🪙

**Why this mechanic**: three branches where **each wrong one fails for its own
reason**. The harpy branch is all archers and cannot dent armour 5. The cyclops
branch is all cannons and cannot touch anything airborne. The wave is both at
once, so only the third branch — a cannon *and* archers — holds. This is the
level that proves an `elif` chain is a tool and not a formality.

```js
map: { cols: 11, rows: 8, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4]] },
gold: 250, campHp: 3, seed: 26, allowed: ["archer", "cannon", "ice"],
waves: [
  { delay: 0,  enemies: [ { kind: "cyclops", count: 2, gap: 4 } ] },
  { delay: 16, enemies: [ { kind: "harpy", count: 5, gap: 0.7 } ] },
],
```

**brief (he)**: הדיווח מגיע שוב ב־`input()`, ויכול להיות אחד משלושה:
`"harpy"`, `"cyclops"` או `"both"`. כתבי שרשרת של שלושה מסלולים:

- `"harpy"` → שלוש קשתות. מספיק נגד אוויר, חסר לחלוטין נגד שריון.
- `"cyclops"` → שני תותחים וקשת. מצוין נגד שריון 5, עיוור לגמרי לאוויר.
- כל דיווח אחר → תותח **וגם** שלוש קשתות. יקר יותר, ומחזיק בשניהם.

היום מגיע `"both"` — שני קיקלופים על הקרקע, ואחריהם חמש הרפיות באוויר — אבל
התוכנית לא אמורה לדעת את זה מראש. הריצי אותה עם שלושת הדיווחים וראי שלושה
מערכי הגנה שונים נבנים מאותן שורות בדיוק.

**starter**
```python
report = input("What is coming? ")

if report == "harpy":
    place_tower("archer", 3, 3)
    place_tower("archer", 6, 3)
    place_tower("archer", 5, 5)
```

**solution**
```python
report = input("What is coming? ")

if report == "harpy":
    place_tower("archer", 3, 3)
    place_tower("archer", 6, 3)
    place_tower("archer", 5, 5)
elif report == "cyclops":
    place_tower("cannon", 4, 3)
    place_tower("cannon", 7, 3)
    place_tower("archer", 5, 5)
else:
    place_tower("cannon", 5, 3)
    place_tower("archer", 2, 3)
    place_tower("archer", 7, 3)
    place_tower("archer", 5, 5)
```
Verified with `stdin: ["both"]`: 3/3, seven kills, 240 of 250 spent. The
`"harpy"` branch's build leaks 2 (the cyclopes walk through 8 damage per second).
The `"cyclops"` branch's build is overrun outright — it kills three and then the
harpies arrive.

**check**
```js
check: {
  kind: "battle",
  stdin: ["both"],
  also: { kind: "source", mustInclude: ["if", "elif", "else"],
          message: { he: "שלושה דיווחים אפשריים, ולכן שרשרת: if, elif ו־else",
                     en: "Three possible reports, so a chain: if, elif and else" } }
}
```

**hints**
1. (he) "שלוש אפשרויות, ובכל הרצה רץ מסלול אחד בדיוק. כמה שאלות צריך כדי לכסות
   שלוש אפשרויות? (פחות משלוש.)"
2. (he) "`elif` הוא 'ואם לא, אולי ככה'. הוא נכתב צמוד לשוליים, מיושר עם ה־`if`,
   עם שאלה משלו ונקודתיים. `else` בסוף, בלי שאלה, תופס את כל השאר — והפעם
   הוא זה שירוץ."
3. (he) "השלד: `if report == \"harpy\":` ואז שלוש שורות מוזחות. אחריו
   `elif report == \"cyclops\":` ושלוש שורות מוזחות. אחריו `else:` וארבע שורות
   מוזחות — תותח ב־`(5,3)` וקשתות ב־`(2,3)`, `(7,3)` ו־`(5,5)`. שימי לב ששלוש
   המילים `if`, `elif` ו־`else` מתחילות באותו מקום בשורה בדיוק."

### b4 — התוכנית הקרועה / The Torn Battle Plan · 30 XP, 8 🪙 — **the debugging battle**

**Why this mechanic**: three separate bugs, reported **one at a time**, in the
order Python meets them. Fix, run, read, fix again. The third bug is the
interesting one: a line indented by two spaces that should be at the margin. It
is the anti-air archer, and while it sits inside the `else` it never gets built —
so the code runs, the battle is lost, and the reason is invisible until she reads
the indentation.

```js
map: { cols: 13, rows: 8,
       path: [[0,6],[1,6],[2,6],[3,6],[3,5],[3,4],[3,3],[4,3],[5,3],
              [6,3],[7,3],[8,3],[8,2],[8,1],[9,1],[10,1],[11,1],[12,1]] },   // the same road as b2
gold: 240, campHp: 3, seed: 24, allowed: ["archer", "cannon"],
waves: [
  { delay: 0,  enemies: [ { kind: "satyr", count: 4, gap: 0.8 } ] },
  { delay: 8,  enemies: [ { kind: "hellhound", count: 4, gap: 1.2 } ] },
  { delay: 18, enemies: [ { kind: "harpy", count: 4, gap: 0.8 } ] },
],
```

**brief (he)**: אנאבת' העתיקה את תוכנית ההגנה מהמפה הקרועה ויש בה שלוש שגיאות.
הריצי, קראי, תקני **שורה אחת**, והריצי שוב — עד שהיא רצה.

השורה האחרונה, הקשת ב־`(2, 5)`, שייכת לכל התוכניות: היא זו ששומרת על השמיים,
והרפיות מגיעות בגל השלישי בכל מקרה. שימי לב איפה היא צריכה לשבת.

**starter** (three deliberate bugs — `brokenStarter: true`, whitespace preserved
byte for byte)
```python
report = "hellhound"

if report == "cyclops"
place_tower("cannon", 4, 2)
elif report == "hellhound":
    place_tower("cannon", 5, 2)
    place_tower("archer", 7, 2)
    place_tower("archer", 10, 2)
else:
    place_tower("archer", 5, 2)
  place_tower("archer", 2, 5)
```

The three runs, verified in order:

| Run | What the engine shows | What she fixes |
| --- | --- | --- |
| 1 | `SyntaxError: bad input (line 3)` + `SYNTAX_HELP.missingColon` | the `:` at the end of the `if` line |
| 2 | `SyntaxError: bad input (line 4)` + `SYNTAX_HELP.missingIndent` | pushes line 4 into the block |
| 3 | `SyntaxError: unindent does not match any outer indentation level (line 11)` + `SYNTAX_HELP.raggedIndent` | pulls the last line to the margin |

That sequencing *is* the lesson: **an error message names one problem at a time,
and re-running after each fix is the method.**

**solution**
```python
report = "hellhound"

if report == "cyclops":
    place_tower("cannon", 4, 2)
elif report == "hellhound":
    place_tower("cannon", 5, 2)
    place_tower("archer", 7, 2)
    place_tower("archer", 10, 2)
else:
    place_tower("archer", 5, 2)
place_tower("archer", 2, 5)
```
Verified: 3/3, twelve kills, 240 of 240 spent. With the last line left indented
inside the `else` it is never placed, and the battle is lost with one leak — the
code runs perfectly and still fails, which is exactly the bug this level is for.

**check**
```js
check: {
  kind: "battle",
  also: { kind: "source", mustInclude: ["elif", "else"],
          message: { he: "השרשרת צריכה להישאר שלמה: if, elif ו־else",
                     en: "Keep the chain whole: if, elif and else" } }
}
```

**hints**
1. (he) "אל תתקני הכול בבת אחת. הריצי, קראי את מספר השורה, תקני רק אותה, הריצי
   שוב. מה חסר בסוף שורה 3?"
2. (he) "שלוש הבעיות: נקודתיים חסרות בסוף שורת ה־`if`; שורה שאחרי נקודתיים בלי
   הזחה; ושורה אחרונה עם שני רווחים במקום אפס. שני רווחים לא מתאימים לשום רמה
   פתוחה — לא לבלוק ולא לשוליים."
3. (he) "שורה 3 מסתיימת ב־`:`. שורה 4 נדחפת פנימה בארבעה רווחים. השורה האחרונה
   נצמדת לשוליים לגמרי — היא לא שייכת ל־`else`, היא שייכת לתוכנית, ולכן היא רצה
   תמיד. אם תשאירי אותה מוזחת הקוד ירוץ בלי שגיאה, הקשת לא תיבנה בכלל, וההרפיות
   בגל השלישי יעברו. הריצי ותראי."

## The great battle — "פרשת הדרכים / The Crossroads" · 55 XP, 15 🪙

```js
map: { cols: 14, rows: 8,
       path: [[0,1],[1,1],[2,1],[3,1],[4,1],[4,2],[4,3],[4,4],[3,4],[2,4],
              [2,5],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[9,6],
              [9,5],[9,4],[9,3],[10,3],[11,3],[12,3],[13,3]],
       rock: [[12,0],[13,1]] },
gold: 330, campHp: 3, seed: 27, allowed: ["archer", "cannon", "ice"],
waves: [
  { delay: 0,  enemies: [ { kind: "satyr", count: 7, gap: 0.5 } ] },
  { delay: 10, enemies: [ { kind: "harpy", count: 6, gap: 0.7 } ] },
  { delay: 20, enemies: [ { kind: "cyclops", count: 2, gap: 3.0 },
                          { kind: "hellhound", count: 3, gap: 1.3 } ] },
],
```

**Why this mechanic**: **a decision inside a decision.** The outer chain picks the
road; inside the middle road's branch a second `if`/`else` asks whether there is
enough gold for artillery. Three levels of indentation — 0, 4, 8 — and each one
means something she can point at. It is also the first battle where the answer to
one question changes which question gets asked next, which is what a decision
tree is.

**brief (he)**: הדרך מתפצלת לשלוש, וההחלטה נופלת רגע לפני היציאה — היא מגיעה
לתוכנית ב־`input()`. הדרך שנבחרה היום מתפתלת שלוש פעמים, ומגיעים בה שלושה גלים
— סאטירים, ואז הרפיות באוויר, ואז שני קיקלופים עם כלבי גיהינום. יש 330 זהב.

התוכנית צריכה שתי רמות של החלטה:

1. **איזו דרך** — `if road == "left"` / `elif road == "middle"` / `else`.
2. בתוך הענף של הדרך האמצעית: **האם יש מספיק זהב לתותח?** אם כן — שני תותחים
   נגד הקיקלופים. אם לא — קשתות במקומם.

ובכל מקרה, בענף האמצעי, שלוש קשתות שומרות על השמיים. תותח לא פוגע בהרפיות, אז
הקשתות אינן אופציונליות.

**starter**
```python
road = input("Which road? ")
gold = get_gold()

if road == "left":
    place_tower("archer", 2, 2)
```

**solution**
```python
road = input("Which road? ")
gold = get_gold()

if road == "left":
    place_tower("archer", 2, 2)
    place_tower("archer", 5, 5)
elif road == "middle":
    place_tower("archer", 3, 2)
    place_tower("archer", 3, 5)
    place_tower("archer", 10, 2)
    if gold >= tower_cost("cannon"):
        place_tower("cannon", 5, 5)
        place_tower("cannon", 8, 4)
    else:
        place_tower("archer", 5, 5)
        place_tower("archer", 8, 4)
else:
    place_tower("ice", 5, 5)
    place_tower("archer", 3, 2)
```
Verified with `stdin: ["middle"]`: 3/3, eighteen kills, 330 of 330 spent — the
budget is exact, which is why the inner `if` matters. Three branches were simulated as losses: the inner
`else` (five archers, 250 gold) leaks 1; the `"left"` branch is overrun; an
all-cannon build is overrun by the harpies.

**check**
```js
check: {
  kind: "battle",
  stdin: ["middle"],
  also: { kind: "source", mustInclude: ["if", "elif", "else"],
          message: { he: "הקרב הזה דורש עץ החלטות: שרשרת על הדרך, ובתוכה שאלה נוספת על הזהב",
                     en: "This one needs a decision tree: a chain on the road, with a second question about gold inside it" } }
}
```

**hints**
1. (he) "ציירי את זה על נייר כעץ: קודם הדרך — שלושה ענפים. ואז, בתוך ענף אחד
   בלבד, עוד שאלה. איזה ענף מכיל שאלה נוספת, ואיזה מגדל בענף הזה **חייב** להיות
   קשת ולא תותח?"
2. (he) "שרשרת `if`/`elif`/`else` על `road`, ובתוך הענף של `\"middle\"` יושב
   `if`/`else` נוסף על `gold`. ה־`if` הפנימי מוזח בארבעה רווחים, וה־`place_tower`
   שבתוכו בשמונה. שלוש הקשתות של הענף האמצעי נכתבות ברמה של ארבעה רווחים, כי הן
   רצות בשני המקרים."
3. (he) "כך זה מתחיל:
   ```python
   elif road == \"middle\":
       place_tower(\"archer\", 3, 2)
       place_tower(\"archer\", 3, 5)
       place_tower(\"archer\", 10, 2)
       if gold >= tower_cost(\"cannon\"):
           place_tower(\"cannon\", 5, 5)
   ```
   שימי לב לשלוש רמות ההזחה: 0 לשרשרת החיצונית, 4 לתוכן שלה, 8 לתוך ה־`if`
   הפנימי. אחרי התותח הראשון בא עוד אחד ב־`(8, 4)`, ואז `else:` ברמה של ארבעה
   רווחים עם שתי קשתות במקומם. 330 זהב זה בדיוק שלוש קשתות ושני תותחים — אם
   נשאר לך זהב בסוף, פספסת מגדל."

**Why this is the great battle**: it is the first program she writes that has
*state* (two variables) and *structure* (two levels of decision). When it passes,
she has built a decision tree — and Chiron says exactly that in the completion
text, because naming what she has done is half the reward.

## Reward & Recap

**Item**: 👟 **נעלי הכנף / The Winged Shoes**
desc (he): "נעליים מהמחסן של הרמס. הן לא מהירות במיוחד — הן אף פעם לא
נועלות אותך בדרך אחת."

**Achievements possible here**
- *Forked Path* — first battle won by a program containing an `else`.
- *Debugger* — cleared b4 after at least one failed run.
- *Indent Master* — cleared b4 without spending a single hint.
- *Ground Control* — lost a battle to a cannon that could not reach the harpies,
  then won it. Awarded warmly: that mistake is the lesson.
- *Persistent* — won any battle here after five failed runs.

**Recap bullets**
- `if` + שאלה + `:` מריץ בלוק שלם רק כשהתשובה `True`
- **ההזחה היא התחביר.** ארבעה רווחים, ואותה כמות לכל השורות באותו בלוק
- `else` תופס את כל מה שנשאר ואף פעם לא מקבל שאלה; `elif` מוסיף שאלה נוספת
- בשרשרת `if/elif/else` רץ **ענף אחד בלבד** — הראשון שענה `True`
- שגיאת הזחה מציינת לך את מספר השורה המדויק. תקני שורה אחת, הריצי שוב
- תותח לא פוגע במשהו שעף — לכן **איזה** מגדל לבנות היא שאלה, ולשאלה יש `if`

**Next teaser (he)**: *"בחרת דרך, והיא מובילה אל הים. מחר תלמדי לחזור על אותה
פעולה שוב ושוב — כי אי אפשר לחצות מֵצר בחתירה אחת, והסירנות כבר שרות."*

## Common mistakes to anticipate

| She writes | She sees (verified in Skulpt) | CPython 3 says | Hint / explainer must cover |
| --- | --- | --- | --- |
| `if x > 3` (no colon) | `SyntaxError: bad input (line N)` | `SyntaxError: expected ':'` | הנקודתיים בסוף השורה — בדקי את סוף השורה, לא את ההתחלה |
| block not indented | `SyntaxError: bad input (line N)` | `IndentationError: expected an indented block after 'if' statement on line N-1` | אחרי `:` חייבת לבוא שורה מוזחת; Tab בתחילת השורה |
| indent with nothing above it | `SyntaxError: bad input (line N)` | `IndentationError: unexpected indent` | בלוק נפתח רק אחרי שורה שנגמרת בנקודתיים |
| 4 spaces then 2 in one block | `SyntaxError: unindent does not match any outer indentation level (line N)` | same wording | כל השורות בבלוק — אותה כמות רווחים בדיוק |
| tab and spaces mixed | `SyntaxError: bad input (line N)` | `TabError: inconsistent use of tabs and spaces in indentation` | להשתמש רק ב־Tab של העורך, שמכניס 4 רווחים |
| `else if x > 1:` | `SyntaxError: bad input (line N)` | `SyntaxError: invalid syntax` | המילה בפייתון היא `elif`, מילה אחת |
| `else x > 3:` | `SyntaxError: bad input (line N)` | `SyntaxError: invalid syntax` | ל־`else` אין שאלה אף פעם |
| `if x = 1:` | `SyntaxError: bad input (line N)` | `SyntaxError: invalid syntax. Maybe you meant '==' …` | `=` נותן, `==` שואל — חזרה לשיעור 5 |
| `if road == left:` (no quotes) | `NameError: name 'left' is not defined` | same | בלי גרשיים פייתון מחפש משתנה בשם `left` |
| `if road == "Left":` on input `left` | לא שגיאה — הענף לא רץ | — | אותיות גדולות/קטנות הן שני דברים שונים |
| broad `elif` before narrow one | לא שגיאה — ענף שלא רץ אף פעם | — | השאלה הצרה ביותר קודם; הבאג הזה שקט |
| cannons against a flying wave | הקרב נכשל, והמנוע אומר "המגדל במשבצת (x, y) הוא תותח, והוא לא מסוגל לפגוע במפלצות מעופפות" | — | הרפיות עפות; נגדן קשת, קרח או ברק |
| archers against a cyclops | לא שגיאה — הקיקלופ ממשיך ללכת | — | שריון 5 מוריד כל חץ ל־5 נזק; פגז מוריד 23 |
| a `place_tower` line left outside its branch | לא שגיאה — המגדל נבנה תמיד | — | ההזחה קובעת לאיזה ענף השורה שייכת |
| the branch is right, the coordinates are on the path | "אי אפשר לבנות על השביל עצמו" | — | הענף הנכון עם משבצת שגויה נכשל בדיוק כמו ענף שגוי |

## Implementation notes

- **The `IndentationError` fidelity gap is real and must be handled, not hidden.**
  Verified: Skulpt reports every indent problem except the ragged-block case as
  `SyntaxError: bad input on line N`. The line number is correct. Three
  consequences, all required:
  1. Extend the `error` teach block with an optional `cpython` field so the page
     can show both strings side by side, labelled "מה שהמנוע מראה" / "מה
     שפייתון האמיתי אומר". This is the honest version of rule 5 in
     `00-overview.md` and it costs one field.
  2. `engine.js` must special-case this: when a `SyntaxError: bad input` lands on
     a line whose predecessor ends in `:`, or on a line whose leading whitespace
     differs from its predecessor's, attach the Hebrew explainer *"נראה שזו
     שגיאת הזחה (IndentationError). בדקי את הרווחים בתחילת שורה N."* **The real
     English error is still shown.** Never replaced.
  3. Lesson 18 (`try`/`except`, reading tracebacks) already promises to say that
     error text varies between Python versions — add Skulpt's shortened
     `SyntaxError` to that list there.
- **Editor support is part of teaching indentation.** `editor.js` must, for this
  lesson onward: insert exactly four spaces on Tab; auto-indent the next line
  after a line ending in `:`; keep the current indent on Enter; and delete four
  spaces on Backspace at the start of a line. Without these, the lesson teaches
  the concept and the tool fights it.
- **Show whitespace on demand.** A small "הצג רווחים" toggle in the editor that
  renders leading spaces as faint dots turns every indentation bug in this lesson
  from invisible to obvious. It is the highest-value UI affordance in Act II.
- **b1's and b4's starters must be preserved byte-for-byte**, including b4's
  two-space indent on the last line. If the editor normalises indentation on
  load, b4 silently loses its third bug. Both carry `brokenStarter: true`, which
  is also what tells `tools/verify-python.mjs` not to assert that the starter
  runs.
- **Every level here was simulated headlessly** through
  `assets/js/battle/{sim,pyapi,play}.js` in a Node VM, the way
  `tools/verify-python.mjs` loads them. For all five: the stated `solution` wins,
  an empty program loses, the `also` `source` rule passes on the solution, and
  both broken starters fail with exactly the errors quoted above.
- **The wrong branch was simulated too, and it always loses.** b1 without the
  indented archer: overrun. b1 with a second cannon instead of it: overrun. b2's
  `else` branch against a flying wave: overrun, four kills out of twelve. b3's
  `"harpy"` branch: 2 leaks; b3's `"cyclops"` branch: overrun. b4 with the last
  line left inside `else`: 1 leak. The great battle's inner `else`: 1 leak; its
  `"left"` branch and an all-cannon build: overrun. This is what "the level
  forces the concept" has to mean — not a source rule alone.
- **A battle level's second check is the `also` field**, applied by `checker.js`
  only after the battle objective has passed, so a source complaint never lands
  on a run she already lost. `mustInclude` matches bare identifiers as whole
  words, so `["if", "elif", "else"]` is exact: `elif` does not satisfy `else`,
  and a variable named `iffy` does not satisfy `if`.
- **The default objective is a perfect defense** — one leak fails the level. The
  3 camp HP exist so a hopeless run ends fast, not as a budget she may spend.
- **`check.stdin` is what makes the chain necessary.** b2, b3 and the great
  battle read their report with `input()`, and the level answers it: `stdin:
  ["harpy"]`, `["both"]`, `["middle"]`. Three consequences worth stating:
  - The engine passes `check.stdin` into the build script's run (`checker.js`),
    so a battle level with `input()` grades cleanly instead of raising. Verified
    end to end in the headless simulation.
  - The prompt string never reaches stdout — Skulpt hands it to `inputfun` and
    the UI renders it in the Iris-message panel — so a prompt cannot interfere
    with an `also` output rule. This is the same convention as lesson 3.
  - When she presses **Run** rather than **Fight**, the prompt appears and she
    answers it herself. Encourage that in the hints: running the same program
    three times with three different reports is the fastest way to see that one
    chain produces three defenses.
- **`get_wave()` is deliberately unused here.** It returns a list of dicts, and
  lists arrive in lesson 9. Until then, `input()` is how the battlefield tells
  her something she did not write down herself.
- **`optional`, `maxTowers` and `maxGoldSpent` are not used in this lesson.**
  Everything is decided by the wave and the tower matchup.
