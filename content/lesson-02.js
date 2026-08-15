/* content/lesson-02.js — "The Camp Necklace" / "שרשרת המחנה"
 * Design: spec/lessons/lesson-02.md   Schemas: spec/04-lesson-template.md,
 * spec/09-battle-game.md
 *
 * Lesson 1 made the machine speak. This lesson gives it a memory: a name that
 * holds a value, works anywhere the value worked, and can hold a new value
 * later — never two at once. Every battle is built so the same value is
 * needed several times, so writing it by hand is more work than naming it.
 */

LC.registerLesson({
  id: "02",
  act: 1,
  slug: "the-camp-necklace",
  minutes: 27,
  concepts: ["variables", "assignment", "reassignment", "str", "int", "float", "type()"],

  title: {
    he: "שרשרת המחנה",
    en: "The Camp Necklace"
  },
  subtitle: {
    he: "שם אחד, וכל הקרב זוכר אותו",
    en: "One name, and the whole battle remembers it"
  },

  item: {
    id: "leather-cord",
    icon: "🪢",
    name: { he: "רצועת העור", en: "The Leather Cord" },
    desc: {
      he: "הרצועה שמחזיקה את כל החרוזים. משתנה עושה בדיוק את זה: מחזיק ערך, ונותן לו שם שאפשר לחזור אליו.",
      en: "The cord that holds every bead. A variable does the same thing: it holds a value and gives it a name you can come back to."
    }
  },

  /* ---- 1. Prophecy ---------------------------------------------------- */
  prophecy: {
    lines: [
      { he: "הבוקר הראשון שלך במחנה. הרצועה על הצוואר שלך כמעט ריקה — חרוז אחד.",
        en: "Your first morning at camp. The cord around your neck is almost empty — one bead." },
      { he: "כירון פורש על השולחן מגילה ארוכה: כל מי שעבר פה, שורה אחרי שורה.",
        en: "Chiron unrolls a long scroll on the table: everyone who ever passed through, name after name." },
      { he: "\"אלפי שמות,\" הוא אומר, \"ואף אחד מהם לא הלך לאיבוד.\"",
        en: "\"Thousands of names,\" he says, \"and not one of them was ever lost.\"" },
      { he: "\"כי לכל דבר במחנה יש שם, והשם מחזיק את מה שיש בפנים.\"",
        en: "\"Because everything at camp has a name, and the name holds what is inside it.\"" },
      { he: "\"אתמול לימדתי אותך לדבר. היום את לומדת לזכור.\"",
        en: "\"Yesterday I taught you to speak. Today you learn to remember.\"" }
    ]
  },

  /* ---- 2. Chiron Teaches ---------------------------------------------- */
  teach: [
    { type: "prose", text: {
      he: "אתמול כל `print` אמר את שלו ומיד שכח אותו. זה בסדר למשפט אחד, וחסר תוחלת למחנה של מאתיים חניכים. תוכנית שלא זוכרת כלום לא יכולה לעשות כלום מעניין. אז: שמות.",
      en: "Yesterday every `print` said its piece and forgot it instantly. That is fine for one sentence and hopeless for a camp of two hundred campers. A program that cannot hold on to anything cannot do anything interesting. So: names." } },

    { type: "code",
      code: 'hero = "Annabeth"\nprint(hero)',
      caption: {
        he: "שורה אחת יוצרת את השם, שורה שנייה משתמשת בו. מעכשיו `hero` מחזיק את הערך הזה.",
        en: "One line creates the name, the next line uses it. From now on `hero` holds this value." } },

    { type: "prose", text: {
      he: "מימין ל-`=` יש **ערך**. משמאל יש **שם** (משתנה). וה-`=` הזה בכלל לא ה-`=` מהחשבון — הוא חץ שמפנה שמאלה: **תכניסי את הערך לתוך השם**. תקראי את השורה בקול כ\"`hero` מקבל את Annabeth\", ולא כ\"`hero` שווה Annabeth\". משפט אחד זה מונע רוב הבלבול של השיעור.",
      en: "To the right of `=` is a **value**. To the left is a **name** (a variable). That `=` is not the `=` from math at all — it is an arrow pointing left: **put the value into the name.** Read the line out loud as \"`hero` receives Annabeth\", never as \"`hero` equals Annabeth\". That one sentence prevents most of this lesson's confusion." } },

    { type: "compare",
      bad: {
        code: 'print("hero")',
        label: { he: "בגרשיים — זה טקסט", en: "In quotes — it is text" },
        result: "hero"
      },
      good: {
        code: 'hero = "Annabeth"\nprint(hero)',
        label: { he: "בלי גרשיים — זה שם", en: "No quotes — it is a name" },
        result: "Annabeth"
      } },

    { type: "code",
      code: 'camper = "Silena"\nbeads = 4\npower = 7.5\nprint(camper)\nprint(beads)\nprint(power)',
      caption: {
        he: "שלושה שמות, שלושה סוגים של ערך. שימי לב מה יש גרשיים ומה אין.",
        en: "Three names, three kinds of value. Notice what has quotes and what does not." } },

    { type: "prose", text: {
      he: "עכשיו, אחרי שראית אותם, שם לשלושת הטיפוסים:\n\n• **string** (`str`, מחרוזת) — טקסט בגרשיים.\n• **integer** (`int`, מספר שלם) — מספר שלם, בלי גרשיים ובלי נקודה.\n• **float** (`float`, מספר עשרוני) — מספר עם נקודה.\n\nוהכלל שתופס את כולם: **גרשיים מנצחים**. `\"4\"` בגרשיים הוא string שנראה כמו מספר. פייתון לא תתייחס אליו כמספר.",
      en: "Now that you have seen them, name the three types:\n\n• **string** (`str`) — text in quotes.\n• **integer** (`int`) — a whole number, no quotes, no dot.\n• **float** — a number with a dot.\n\nAnd the rule that catches everyone: **quotes win.** `\"4\"` in quotes is a string that happens to look like a number. Python will not treat it as one." } },

    { type: "code",
      code: 'print(type("Silena"))\nprint(type(4))\nprint(type(7.5))\nprint(type("4"))',
      caption: {
        he: "השורה האחרונה היא הפאנץ' — `\"4\"` נראה כמו מספר, ופייתון רואה טקסט.",
        en: "The last line is the punchline — `\"4\"` looks like a number, and Python sees text." } },

    { type: "callout", tone: "tip",
      title: { he: "איך קוראים למשתנה", en: "How to name a variable" },
      text: {
        he: "אותיות באנגלית, ספרות ו-`_`. בלי רווחים: `cabin_name`, לא `cabin name`. אי אפשר להתחיל בספרה: `beads2` עובד, `2beads` לא. אותיות גדולות משנות הכול — `Hero` ו-`hero` הם שני שמות שונים. והשם צריך לספר מה יש בפנים: גרובר קרא לכל המשתנים שלו `a`, `b` ו-`c`, ועכשיו הוא לא מצליח לקרוא את ההערות שלו מהקיץ שעבר.",
        en: "English letters, digits and `_`. No spaces: `cabin_name`, not `cabin name`. Cannot start with a digit: `beads2` works, `2beads` does not. Capital letters matter — `Hero` and `hero` are two different names. And the name should say what is inside: Grover named all his variables `a`, `b` and `c`, and now he cannot read his own notes from last summer." } },

    { type: "error",
      code: 'cabin = "Poseidon"\nprint(cabbin)',
      error: "NameError: name 'cabbin' is not defined (line 2)",
      explain: {
        he: "פייתון חיפשה שם בשם `cabbin` ולא מצאה. היא לא מנחשת ולא מתקנת — אם כתבת `cabin` למעלה ו-`cabbin` למטה, אלה שני שמות שונים לגמרי. `NameError` כמעט תמיד אומרת אחד משלושה דברים: שגיאת כתיב, אות גדולה במקום קטנה, או שהשורה שיוצרת את המשתנה עוד לא רצה.",
        en: "Python looked for a name called `cabbin` and did not find one. It does not guess and it does not fix typos — if you wrote `cabin` above and `cabbin` below, those are two completely different names. A `NameError` almost always means one of three things: a typo, a capital letter where you meant lowercase, or the line that creates the variable has not run yet." } },

    { type: "code",
      code: 'monsters_left = 3\nprint(monsters_left)\nmonsters_left = 2\nprint(monsters_left)',
      caption: {
        he: "אותו שם, שני ערכים — אבל אף פעם לא בו זמנית. השם מחזיק ערך אחד, והחדש דוחף את הישן החוצה.",
        en: "The same name, two values — but never at the same time. The name holds one value, and the new one pushes the old one out." } },

    { type: "callout", tone: "warn",
      title: { he: "קודם ליצור, אחר כך להשתמש", en: "Create first, use after" },
      text: {
        he: "שם חייב להתקיים לפני שמשתמשים בו. `beads = 4` ואז `print(beads)` — עובד. `print(beads)` ואז `beads = 4` — `NameError`, כי ברגע שה-`print` רץ, השם עוד לא היה קיים.",
        en: "A name has to exist before it is used. `beads = 4` then `print(beads)` — works. `print(beads)` then `beads = 4` — `NameError`, because at the moment the `print` ran, the name did not exist yet." } },

    { type: "callout", tone: "myth",
      title: { he: "השם האמיתי", en: "The true name" },
      text: {
        he: "בסיפורים העתיקים, מי שיודע את השם האמיתי של דבר שולט בו — בגלל זה גיבורים מתמקחים על שמות, ובגלל זה אלים מסתירים את שלהם. בתכנות הרעיון נשאר שלם: ברגע שנתת שם לערך, את יכולה להגיע אליו, לשנות אותו, ולשלוח אותו לכל מקום.",
        en: "In the old stories, whoever knows a thing's true name has power over it — that is why heroes bargain for names, and why gods hide theirs. Programming kept the idea intact: once you have named a value, you can reach it, change it, and send it anywhere." } },

    { type: "prose", text: {
      he: "שם עובד בכל מקום שבו ערך עבד — גם בתוך פקודות המשחק מאתמול.",
      en: "A name works anywhere a value worked — including inside yesterday's game commands." } },

    { type: "code",
      code: 'kind = "archer"\nrow = 3\nplace_tower(kind, 2, row)\nplace_tower(kind, 5, row)',
      caption: {
        he: "אותה פקודה מאתמול, רק ששני מהערכים קיבלו שם. שימי לב מה קורה אם תשני את `row` ל-5: שני המגדלים זזים ביחד, כי שניהם שואלים את אותו שם.",
        en: "The same command as yesterday, with two of the values given names. Notice what happens if you change `row` to 5: both towers move together, because both of them ask the same name." } },

    { type: "prose", text: {
      he: "וזה גם המקום שבו מספרים מפסיקים להיות קישוט: `get_gold()` מחזירה `int` שאפשר לתת לו שם, ו-`type()` מוכיחה את זה.",
      en: "And this is also where numbers stop being decoration: `get_gold()` hands back an `int` you can name, and `type()` proves it." } },

    { type: "code",
      code: "gold = get_gold()\nprint(gold)\nprint(type(gold))" },

    { type: "prose", text: {
      he: "עדיין יש כאן מגבלה כנה: כל `print` מציג ערך אחד בשורה משלו, אז דוח הקרב שלך נראה כמו רשימת קניות. מחר תלמדי לארוג שמות בתוך משפט אחד — ולתת לתוכנית לשאול **אותך** שאלה לפני שהגל מתחיל.",
      en: "There is still an honest limitation here: each `print` shows one value on a line of its own, so your battle report looks like a shopping list. Tomorrow you will learn to weave names into a single sentence — and let the program ask **you** a question before the wave starts." } }
  ],

  /* ---- 3. Training ground (ungraded) ----------------------------------- */
  tryIt: {
    intro: {
      he: "המגרש שלך. שני את הערכים למה שבא לך, תוסיפי משתנה משלך, ונסי גם `print(type(cabin))` כדי לראות מה פייתון חושבת שיש שם. שום דבר פה לא נבדק.",
      en: "Your playground. Change the values, add a variable of your own, and try `print(type(cabin))` to see what Python thinks it is holding. Nothing here is graded."
    },
    starter: 'hero = "Percy"\ncabin = "Poseidon"\nbeads = 1\n\nprint(hero)\nprint(cabin)\nprint(beads)\n\ngold = get_gold()\nprint(gold)\nprint(type(gold))\n'
  },

  /* ---- 4. The battles ---------------------------------------------------- */
  training: [
    {
      id: "b1",
      xp: 20, drachmas: 5,
      title: { he: "שם למשבצת", en: "A Name for a Square" },
      brief: {
        he: "שלושה סאטירים בשביל, ומשבצת דשא אחת שמעניינת אותנו: עמודה 2, שורה 3.\n\nשתי השורות הראשונות כבר כתובות: `kind` מחזיק את סוג המגדל, ו-`row` מחזיק את מספר השורה. הוסיפי שורה שלישית שמציבה מגדל — אבל במקום להקליד את הערכים, שימי בסוגריים את **השמות**.",
        en: "Three satyrs on the road, and one patch of grass that matters: column 2, row 3.\n\nThe first two lines are already written: `kind` holds the kind of tower, `row` holds the row number. Add a third line that places a tower — but instead of typing the values, put the **names** inside the brackets."
      },
      map: { cols: 8, rows: 6, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4]] },
      gold: 60, campHp: 3, seed: 1, allowed: ["archer"],
      waves: [ { delay: 0, enemies: [ { kind: "satyr", count: 3, gap: 1.6 } ] } ],
      starter: 'kind = "archer"\nrow = 3\n',
      solution: 'kind = "archer"\nrow = 3\nplace_tower(kind, 2, row)',
      hints: [
        { he: "שתי השורות הראשונות כבר יצרו שני שמות. מה `kind` מחזיק כרגע, ומה `row` מחזיק?",
          en: "The first two lines already made two names. What is inside `kind` right now, and what is inside `row`?" },
        { he: "`place_tower` מקבל שלושה דברים: סוג, עמודה, שורה. במקום הראשון והשלישי אפשר לשים שם של משתנה בלי גרשיים, בדיוק כמו ב-`print(hero)`.",
          en: "`place_tower` takes three things: kind, column, row. In the first and third slot you can put a variable name without quotes, exactly like in `print(hero)`." },
        { he: "השורה השלישית היא `place_tower(kind, 2, row)`. `kind` בלי גרשיים — פייתון מחפשת את השם ומוצאת בפנים את `\"archer\"`. העמודה 2 נשארת מספר מוקלד, כי לא נתנו לה שם. `row` מביא את 3.",
          en: "The third line is `place_tower(kind, 2, row)`. `kind` with no quotes — Python looks the name up and finds `\"archer\"` inside. The column 2 stays a typed number, because we never named it. `row` brings the 3." }
      ],
      check: {
        kind: "battle",
        also: { kind: "source", mustInclude: ["kind", "row"],
          message: { he: "המגדל צריך לקבל את השמות `kind` ו-`row`, לא את הערכים מוקלדים ביד",
                     en: "The tower has to receive the names `kind` and `row`, not the values typed by hand" } }
      }
    },

    {
      id: "b2",
      xp: 20, drachmas: 5,
      title: { he: "אותה שורה, ארבע פעמים", en: "The Same Row, Four Times" },
      brief: {
        he: "הפעם מגיעים גם כלבי גיהינום, והם עבים. ארבעה סאטירים מהירים קודם, ואחריהם ארבעה כלבים עם שריון.\n\nיש לך 220 זהב וקשת עולה 50 — כלומר בדיוק ארבעה מגדלים. פזרי אותם לאורך הדרך, כולם על אותה שורה, ותני לשורה שם.",
        en: "This time hellhounds are coming too, and they are thick-skinned. Four fast satyrs first, then four armoured dogs.\n\nYou have 220 gold and an archer costs 50 — which is exactly four towers. Spread them along the road, all on the same row, and give that row a name."
      },
      map: { cols: 12, rows: 7, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4]] },
      gold: 220, campHp: 3, seed: 2, allowed: ["archer"],
      waves: [
        { delay: 0, enemies: [ { kind: "satyr", count: 4, gap: 0.8 } ] },
        { delay: 9, enemies: [ { kind: "hellhound", count: 4, gap: 1.3 } ] }
      ],
      starter: 'kind = "archer"\nrow = 3\nplace_tower(kind, 1, row)\n',
      solution: 'kind = "archer"\nrow = 3\nplace_tower(kind, 1, row)\nplace_tower(kind, 4, row)\nplace_tower(kind, 7, row)\nplace_tower(kind, 10, row)',
      hints: [
        { he: "220 חלקי 50 — כמה מגדלים זה? וכמה שורות `place_tower` יש לך כרגע?",
          en: "220 divided by 50 — how many towers is that? And how many `place_tower` lines do you have right now?" },
        { he: "העתיקי את השורה שכבר קיימת עוד שלוש פעמים ושני **רק את העמודה** בכל אחת. `kind` ו-`row` נשארים אותם שמות בכל ארבע השורות.",
          en: "Copy the line you already have three more times and change **only the column** in each. `kind` and `row` stay the same names on all four lines." },
        { he: "ארבע שורות, אותו סוג, אותה שורה, עמודות שונות: `1`, `4`, `7`, `10`. אם אחר כך תרצי להעביר את כל הקיר לשורה 5, תשני את `row = 3` ל-`row = 5` — שורה אחת, וכל ארבעת המגדלים זזים.",
          en: "Four lines, same kind, same row, different columns: `1`, `4`, `7`, `10`. If you later want the whole wall on row 5, change `row = 3` to `row = 5` — one line, and all four towers move." }
      ],
      check: {
        kind: "battle",
        also: { kind: "source", mustInclude: ["kind", "row"],
          message: { he: "כל מגדל צריך לקבל את `kind` ואת `row` — שם אחד לסוג, שם אחד לשורה",
                     en: "Every tower must receive `kind` and `row` — one name for the kind, one for the row" } }
      }
    },

    {
      id: "b3",
      xp: 25, drachmas: 8,
      title: { he: "פנקס הרב־טוראי", en: "The Quartermaster's Ledger" },
      brief: {
        he: "לפני כל קרב הרב־טוראי רושם שלוש שורות בפנקס, ואז מאשר שהוא לא התבלבל בין טקסט למספר.\n\nצרי שלושה משתנים: `kind` עם סוג המגדל, `gold` עם מה ש-`get_gold()` מחזירה, ו-`tower_range` עם הטווח של הקשת — `2.6`. הדפיסי את שלושת הערכים, ואז את שלושת הטיפוסים שלהם, בסדר הזה. שש שורות פלט.\n\nהרב־טוראי סופר את התיבה **לפני** שקונים משהו. ואחרי הפנקס — בני הגנה שמחזיקה.",
        en: "Before every battle the quartermaster writes three lines in his ledger, then certifies that he has not confused text with a number.\n\nMake three variables: `kind` with the tower kind, `gold` with whatever `get_gold()` hands back, and `tower_range` with the archer's range — `2.6`. Print the three values, then their three types, in that order. Six lines of output.\n\nThe quartermaster counts the chest **before** anything is bought. And after the ledger — build a defense that holds."
      },
      map: { cols: 10, rows: 7, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4]] },
      gold: 200, campHp: 3, seed: 5, allowed: ["archer"],
      waves: [
        { delay: 0, enemies: [ { kind: "satyr", count: 6, gap: 0.6 } ] },
        { delay: 10, enemies: [ { kind: "harpy", count: 6, gap: 0.7 } ] }
      ],
      starter: 'kind = "archer"\ngold = get_gold()\ntower_range = 2.6\n\n# print the six ledger lines here\n\nplace_tower(kind, 2, 3)\n',
      solution: "kind = \"archer\"\ngold = get_gold()\ntower_range = 2.6\n\nprint(kind)\nprint(gold)\nprint(tower_range)\nprint(type(kind))\nprint(type(gold))\nprint(type(tower_range))\n\nplace_tower(kind, 2, 3)\nplace_tower(kind, 5, 3)\nplace_tower(kind, 8, 3)",
      hints: [
        { he: "שלוש שורות ראשונות בפלט הן הערכים עצמם, ושלוש האחרונות הן שאלה אחרת לגמרי: **מה זה** כל אחד מהם.",
          en: "The first three output lines are the values themselves. The last three ask a completely different question: **what** each one is." },
        { he: "`print(gold)` מדפיס את הערך, `print(type(gold))` מדפיס את הטיפוס. שימי לב מה יש גרשיים ומה אין — `2.6` הוא מספר עם נקודה, לא טקסט.",
          en: "`print(gold)` prints the value, `print(type(gold))` prints the type. Watch which things have quotes and which do not — `2.6` is a number with a dot, not text." },
        { he: "שש שורות `print` לפי הסדר: `kind`, `gold`, `tower_range`, ואז `type(kind)`, `type(gold)`, `type(tower_range)`. אם `gold` יוצא 50 במקום 200 — קראת את התיבה אחרי שכבר קנית. העבירי את `gold = get_gold()` למעלה, לפני שורות ה-`place_tower`. ואחרי הפנקס צריך שלושה מגדלים כדי להחזיק את הגל.",
          en: "Six `print` lines in order: `kind`, `gold`, `tower_range`, then `type(kind)`, `type(gold)`, `type(tower_range)`. If `gold` comes out as 50 instead of 200, you read the chest after you had already spent. Move `gold = get_gold()` above the `place_tower` lines. And after the ledger you need three towers to hold the wave." }
      ],
      check: {
        kind: "battle",
        also: { kind: "output", mode: "normalized",
                expect: "archer\n200\n2.6\n<class 'str'>\n<class 'int'>\n<class 'float'>" }
      }
    },

    {
      id: "b4",
      xp: 30, drachmas: 8,
      title: { he: "התוכנית משתנה", en: "The Plan Changes" },
      brief: {
        he: "הדרך הפעם יורדת: היא רצה למעלה עד עמודה 5, פונה למטה, וממשיכה לאורך שורה 5 עד השער.\n\nיש לך 220 זהב — ארבעה מגדלים. שניים לא יספיקו, ושניהם צריכים להיות ליד החלק העליון; שני האחרים ליד החלק התחתון.\n\nהשתמשי ב-`row` פעמיים: תני לו את השורה העליונה, בני שני מגדלים, ואז **תני לאותו שם ערך חדש** ובני את שני האחרים.",
        en: "The road drops this time: it runs along the top to column 5, turns down, and continues along row 5 to the gate.\n\nYou have 220 gold — four towers. Two will not hold, and both of those belong beside the top stretch; the other two beside the bottom one.\n\nUse `row` twice: give it the top row, build two towers, then **give the same name a new value** and build the other two."
      },
      map: {
        cols: 14, rows: 7,
        path: [[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[5,2],[5,3],[5,4],[5,5],
               [6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[12,5],[13,5]]
      },
      gold: 220, campHp: 3, seed: 6, allowed: ["archer"],
      waves: [
        { delay: 0, enemies: [ { kind: "satyr", count: 6, gap: 0.7 } ] },
        { delay: 10, enemies: [ { kind: "hellhound", count: 4, gap: 1.3 } ] }
      ],
      starter: 'kind = "archer"\nrow = 2\nplace_tower(kind, 2, row)\nplace_tower(kind, 4, row)\n',
      solution: 'kind = "archer"\nrow = 2\nplace_tower(kind, 2, row)\nplace_tower(kind, 4, row)\nrow = 4\nplace_tower(kind, 7, row)\nplace_tower(kind, 10, row)',
      hints: [
        { he: "המגדלים בשורה 2 רואים רק את החלק העליון של הדרך. מי שומר על החלק שאחרי הפנייה?",
          en: "Towers on row 2 only see the top stretch of the road. Who is watching the part after the bend?" },
        { he: "אפשר לכתוב `row = 4` באמצע התוכנית. מהשורה הזאת והלאה, כל `place_tower` שמקבל `row` יקבל את הערך החדש — מה שכבר רץ למעלה נשאר כמו שהיה.",
          en: "You can write `row = 4` in the middle of the plan. From that line onwards every `place_tower` that receives `row` gets the new value — what already ran above stays as it was." },
        { he: "שני מגדלים ראשונים בעמודות 2 ו-4 עם `row = 2`. אחריהם שורה אחת: `row = 4`. ואז עוד שני מגדלים, בעמודות 7 ו-10, שמקבלים בדיוק את אותו `row` — רק שעכשיו יש בו 4.",
          en: "The first two towers at columns 2 and 4 with `row = 2`. Then one line: `row = 4`. Then two more towers at columns 7 and 10, receiving that same `row` — which now holds 4." }
      ],
      check: {
        kind: "battle",
        also: { kind: "source", mustInclude: ["kind", "row"],
          message: { he: "התוכנית צריכה להשתמש ב-`kind` וב-`row` — ושם אחד יכול להחזיק ערך חדש באמצע",
                     en: "The plan must use `kind` and `row` — and one name is allowed to hold a new value part-way down" } }
      }
    }
  ],

  /* ---- 5. The great battle ---------------------------------------------- */
  quest: {
    id: "q1",
    xp: 50, drachmas: 12,
    boss: null,
    title: { he: "שרשרת המגדלים", en: "The Necklace of Towers" },
    brief: {
      he: "הלילה הראשון שבו כירון לא עומד לידך.\n\nשלושה גלים: סאטירים מהירים, אחריהם הרפיות, ובסוף תשעה כלבי גיהינום — והדרך מתפתלת פעמיים. 320 זהב, קשת ב-50: שישה מגדלים, ועודף של 20.\n\nתני שם לסוג המגדל ושם לשורה שאת בונה עליה, ושני את השורה כשהדרך משנה כיוון. חמישה מגדלים לא מחזיקים — נסי, וצפי איפה זה נשבר.",
      en: "The first night Chiron is not standing beside you.\n\nThree waves: fast satyrs, then harpies, then nine hellhounds — and the road bends twice. 320 gold, an archer at 50: six towers and twenty drachmas of change.\n\nGive the tower kind a name and the row you are building on a name, and change the row when the road changes direction. Five towers do not hold — try it, and watch where it breaks."
    },
    map: {
      cols: 14, rows: 8,
      path: [[0,2],[1,2],[2,2],[3,2],[4,2],[4,3],[4,4],[4,5],[5,5],[6,5],[7,5],[8,5],
             [9,5],[9,4],[9,3],[9,2],[10,2],[11,2],[12,2],[13,2]]
    },
    gold: 320, campHp: 3, seed: 7, allowed: ["archer"],
    waves: [
      { delay: 0,  enemies: [ { kind: "satyr", count: 9, gap: 0.45 } ] },
      { delay: 12, enemies: [ { kind: "harpy", count: 9, gap: 0.55 } ] },
      { delay: 26, enemies: [ { kind: "hellhound", count: 9, gap: 0.9 } ] }
    ],
    starter: '# The Necklace of Towers\nkind = "archer"\nrow = 1\nplace_tower(kind, 2, row)\nplace_tower(kind, 3, row)\n',
    solution: '# The Necklace of Towers\nkind = "archer"\nrow = 1\nplace_tower(kind, 2, row)\nplace_tower(kind, 3, row)\nrow = 4\nplace_tower(kind, 5, row)\nplace_tower(kind, 6, row)\nplace_tower(kind, 7, row)\nplace_tower(kind, 8, row)',
    hints: [
      { he: "320 חלקי 50 — כמה מגדלים, וכמה עודף? ואיפה על המפה המפלצות הולכות הכי הרבה זמן?",
        en: "320 divided by 50 — how many towers, and how much change? And where on the map do the monsters spend the most time?" },
      { he: "בני בשני חלקים: קודם `row` של החלק העליון ושני מגדלים, אחר כך `row` חדש ליד החלק התחתון ועוד ארבעה. הכלבים בגל האחרון הם החלק הקשה — הם עבים ואיטיים, וצריך מספיק חצים באותו קטע דרך.",
        en: "Build in two halves: first a `row` for the top stretch and two towers, then a new `row` beside the bottom stretch and four more. The hounds in the last wave are the hard part — they are slow and thick, and they need enough arrows on the same stretch of road." },
      { he: "`kind = \"archer\"` פעם אחת. `row = 1` ושני מגדלים בעמודות 2 ו-3, שמכסים את הכניסה. אחר כך `row = 4`, וארבעה מגדלים בעמודות 5, 6, 7 ו-8 — כולם צופים על הקטע התחתון, שם הכלבים הולכים הכי לאט. זה 300 מתוך 320.",
        en: "`kind = \"archer\"` once. `row = 1` and two towers at columns 2 and 3, covering the entrance. Then `row = 4`, and four towers at columns 5, 6, 7 and 8 — all watching the bottom stretch, where the hounds walk slowest. That is 300 of your 320." }
    ],
    check: {
      kind: "battle",
      also: { kind: "source", mustInclude: ["kind", "row"],
        message: { he: "השתמשי בשם אחד לסוג המגדל ובשם אחד לשורה, ושני את השורה כשהדרך משנה כיוון",
                   en: "Use one name for the tower kind and one for the row, and change the row when the road changes direction" } }
    }
  },

  /* ---- 6. Recap ----------------------------------------------------------- */
  recap: {
    bullets: [
      { he: "משתנה הוא שם שמחזיק ערך: `beads = 4`", en: "A variable is a name that holds a value: `beads = 4`" },
      { he: "`=` זה לא \"שווה\" — זה חץ שמאלה: תכניסי את הערך לתוך השם", en: "`=` is not \"equals\" — it is an arrow pointing left: put the value into the name" },
      { he: "`print(hero)` בלי גרשיים מדפיס את הערך, `print(\"hero\")` עם גרשיים מדפיס טקסט", en: "`print(hero)` with no quotes prints the value, `print(\"hero\")` with quotes prints text" },
      { he: "שם עובד בכל מקום שבו ערך עבד — גם בתוך `place_tower(kind, 2, row)`", en: "A name works anywhere a value worked — including inside `place_tower(kind, 2, row)`" },
      { he: "שלושה טיפוסים בסיסיים: `str` (טקסט), `int` (מספר שלם), `float` (מספר עם נקודה)", en: "Three basic types: `str` (text), `int` (a whole number), `float` (a number with a dot)" },
      { he: "`type(x)` מגלה מה יש באמת בפנים — ו-`\"4\"` בגרשיים הוא `str`, לא מספר", en: "`type(x)` reveals what is really inside — and `\"4\"` in quotes is a `str`, not a number" },
      { he: "השמה חוזרת מחליפה את הערך הישן; מה שכבר הודפס נשאר מודפס, ומה שכבר נבנה נשאר בנוי", en: "Reassignment replaces the old value; what already printed stays printed, and what already got built stays built" },
      { he: "`NameError` אומר: שגיאת כתיב, אות גדולה, או שהשורה שיוצרת את המשתנה עוד לא רצה", en: "`NameError` means: a typo, a capital letter, or the line that creates the variable has not run yet" }
    ],
    next: {
      he: "עכשיו התוכנית שלך זוכרת. מחר היא תשאל אותך שאלה — ותחכה לתשובה.",
      en: "Your program remembers now. Tomorrow it asks you a question — and waits for the answer."
    }
  }
});
