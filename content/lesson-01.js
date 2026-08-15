/* content/lesson-01.js — "The First Word" / "המילה הראשונה"
 * Design: spec/lessons/lesson-01.md   Schemas: spec/04-lesson-template.md,
 * spec/09-battle-game.md
 *
 * The game IS the course: every task here is a real battle. Lesson 1 teaches
 * that calling a function with arguments makes something happen — print() says
 * a thing, place_tower() puts a tower on the field. Same skill, and the second
 * one saves the camp.
 */

/* A straight road along row 4. Reused by the early levels so she learns one
 * map before the maps start changing. */
var ROAD = [];
for (var i = 0; i < 12; i++) ROAD.push([i, 4]);

LC.registerLesson({
  id: "01",
  act: 1,
  slug: "the-first-word",
  minutes: 25,
  concepts: ["print", "strings", "calling a function", "comments", "reading an error"],

  title: {
    he: "המילה הראשונה",
    en: "The First Word"
  },
  subtitle: {
    he: "מילה אחת, ומגדל מופיע",
    en: "One word, and a tower appears"
  },

  item: {
    id: "camp-bead",
    icon: "📿",
    name: { he: "חרוז המחנה", en: "Camp Bead" },
    desc: {
      he: "החרוז הראשון בשרשרת שלך. כל שיעור מוסיף עוד אחד — בסוף המסע יהיו לך עשרים.",
      en: "The first bead on your necklace. Every lesson adds another — twenty by the end of the quest."
    }
  },

  /* ---- 1. Chiron Teaches ------------------------------------------------ */
  teach: [
    { type: "prose", text: {
      he: "תוכנית היא רשימת הוראות. המחשב קורא אותן מלמעלה למטה, אחת אחרי השנייה, ועושה **בדיוק** מה שכתוב — לא מנחש ולא משלים חסר. זה נשמע כמו חיסרון, אבל זה מה שהופך אותו לבן ברית: אם כתבת נכון, הוא יעשה נכון בכל פעם.",
      en: "A program is a list of instructions. The computer reads them top to bottom, one after another, and does **exactly** what they say — it does not guess and it does not fill in gaps. That sounds like a weakness. It is what makes it an ally: write it correctly and it works the same way every time." } },

    { type: "prose", text: {
      he: "המילה הראשונה שלך היא `print`. לחצי על **הרצה**.",
      en: "Your first word is `print`. Press **Run**." } },

    { type: "code",
      code: 'print("Hello, Olympus")',
      caption: { he: "המילה שגורמת למכונה לדבר.", en: "The word that makes the machine speak." } },

    { type: "prose", text: {
      he: "עכשיו, אחרי שראית את זה עובד, אפשר לתת שמות לחלקים:\n\n• `print` — **שם הפקודה**. מה לעשות.\n• הסוגריים `( )` — מה שבתוכם הוא מה שהפקודה מקבלת.\n• הגרשיים `\" \"` — מסמנים שמה שביניהם הוא **טקסט**.\n\nלטקסט בתוך גרשיים קוראים בפייתון **string** (מחרוזת). המילה הזאת תלווה אותך לאורך כל הקורס.",
      en: "Now that you have seen it work, we can name the parts:\n\n• `print` — **the command's name**. What to do.\n• the brackets `( )` — what is inside them is what the command receives.\n• the quotes `\" \"` — they mark what is between them as **text**.\n\nText inside quotes is called a **string** in Python. That word will follow you through the whole course." } },

    { type: "callout", tone: "myth",
      title: { he: "למה הכול באנגלית?", en: "Why is it all in English?" },
      text: {
        he: "פייתון נכתבה באנגלית, ולכן המילים שלה זהות בכל העולם — בישראל, ביפן וביוון. ההסברים כאן בעברית, אבל `print` יישאר `print` תמיד. תחשבי על זה כמו על שפת האלים: לא מתרגמים אותה, לומדים אותה.",
        en: "Python was written in English, so its words are the same everywhere in the world — in Israel, in Japan, in Greece. The explanations here are in Hebrew, but `print` will always be `print`. Think of it as the language of the gods: you do not translate it, you learn it." } },

    { type: "prose", text: {
      he: "ועכשיו החלק שבגללו את כאן.\n\n`print` היא **פקודה שמקבלת משהו בסוגריים**. יש עוד פקודה שעובדת בדיוק אותו דבר, רק שהיא לא מדפיסה טקסט — היא **מציבה מגדל על שדה הקרב**:",
      en: "And now the part you are here for.\n\n`print` is **a command that receives something in brackets**. There is another command that works exactly the same way, except it does not print text — it **places a tower on the battlefield**:" } },

    { type: "code",
      runnable: false,
      code: 'place_tower("archer", 2, 3)',
      caption: {
        he: "אותו מבנה בדיוק: שם הפקודה, סוגריים, ומה שהיא מקבלת.",
        en: "Exactly the same shape: the command's name, brackets, and what it receives." } },

    { type: "prose", text: {
      he: "שלושה דברים בסוגריים, מופרדים בפסיקים:\n\n• `\"archer\"` — **איזה מגדל**. string, בגרשיים.\n• `2` — **עמודה** (x). המספרים למעלה בלוח.\n• `3` — **שורה** (y). המספרים בצד.\n\nהמספרים מתחילים מ-**0**, לא מ-1. זה ייראה מוזר עכשיו ויהיה הגיוני בשיעור 9.",
      en: "Three things inside the brackets, separated by commas:\n\n• `\"archer\"` — **which tower**. A string, in quotes.\n• `2` — **the column** (x). The numbers along the top of the board.\n• `3` — **the row** (y). The numbers down the side.\n\nThe numbers start at **0**, not 1. That will look strange now and make sense in lesson 9." } },

    { type: "callout", tone: "warn",
      title: { he: "אי אפשר לבנות על השביל", en: "You cannot build on the path" },
      text: {
        he: "השביל החום הוא המקום שבו המפלצות הולכות. מגדל חייב לעמוד על הדשא **ליד** השביל — קרוב מספיק כדי לירות, אבל לא עליו.",
        en: "The brown path is where the monsters walk. A tower must stand on the grass **beside** the path — close enough to shoot, but not on it." } },

    { type: "prose", text: {
      he: "עכשיו בואי **נשבור** משהו בכוונה, כדי שתדעי איך נראית שגיאה לפני שתפגשי אחת לבד באמצע קרב.",
      en: "Now let us **break** something on purpose, so you know what an error looks like before you meet one alone in the middle of a battle." } },

    { type: "error",
      code: 'print("Hello)',
      error: "SyntaxError: bad input (line 1)",
      explain: {
        he: "פתחנו גרשיים ולא סגרנו אותם. פייתון קרא עד סוף השורה, חיפש את הגרש השני, לא מצא — ועצר.\n\n`bad input` זה פייתון שאומר \"לא הבנתי את השורה הזאת\". לא מנומס במיוחד, אבל יש שם דבר אחד חשוב: **מספר השורה**. וזה כמעט תמיד המקום הנכון להתחיל בו.\n\nזאת לא קטסטרופה, זו הודעה. גיבורה שאף פעם לא רואה שגיאה היא גיבורה שאף פעם לא כתבה משהו מעניין.",
        en: "We opened a quote and never closed it. Python read to the end of the line, looked for the second quote, did not find it — and stopped.\n\n`bad input` is Python saying \"I could not understand that line\". Not the most helpful phrasing, but it carries the one thing that matters: **the line number**. That is almost always the right place to start.\n\nThis is not a disaster, it is a message. A hero who never sees an error is a hero who never wrote anything interesting." } },

    { type: "compare",
      bad: {
        code: "print(Hello)",
        label: { he: "בלי גרשיים", en: "Without quotes" },
        result: "NameError: name 'Hello' is not defined"
      },
      good: {
        code: 'print("Hello")',
        label: { he: "עם גרשיים", en: "With quotes" },
        result: "Hello"
      } },

    { type: "prose", text: {
      he: "בלי הגרשיים פייתון חושב ש-`Hello` הוא **שם של משהו** שהוא אמור להכיר. הוא מחפש, לא מוצא, ומודיע. עם גרשיים זה טקסט, וטקסט הוא רק טקסט. אותו כלל חל על `\"archer\"`.",
      en: "Without the quotes, Python thinks `Hello` is the **name of something** it should know. It looks, does not find it, and says so. With quotes it is text, and text is only ever text. The same rule applies to `\"archer\"`." } },

    { type: "prose", text: {
      he: "דבר אחרון: **הערות**. הסימן `#` אומר לפייתון להתעלם משאר השורה. זו המחברת הפרטית שלך בתוך הקוד.",
      en: "One last thing: **comments**. The `#` symbol tells Python to ignore the rest of the line. It is your private notebook inside the code." } },

    { type: "code",
      code: '# my plan: two towers near the gate\nprint("Defenses ready")  # notes can sit after code too',
      caption: { he: "ההערות לא מופיעות בפלט. הן רק בשבילך.", en: "Comments never appear in the output. They are only for you." } }
  ],

  /* ---- 2. Training ground (ungraded) ---------------------------------- */
  tryIt: {
    intro: {
      he: "מגרש האימונים. אין כאן מפלצות ואף אחד לא נותן ציון — נסי דברים, שברי אותם, ראי מה קורה.",
      en: "The training ground. No monsters, nobody scoring you — try things, break them, see what happens."
    },
    starter: 'print("I am a demigod")\nprint("and I just arrived at camp")\n'
  },

  /* ---- 3. The battles -------------------------------------------------- */
  training: [
    {
      id: "b1",
      xp: 20, drachmas: 5,
      title: { he: "המגדל הראשון", en: "The First Tower" },
      brief: {
        he: "שלוש הרפיות מתקרבות בשביל. יש לך מגדל אחד ומשבצת אחת ריקה.\n\nהציבי קשת במשבצת `x=2`, `y=3` — בדיוק מעל השביל.\n\nהשורה כבר כתובה בשבילך. לחצי **לקרב!** וצפי.",
        en: "Three harpies are coming down the path. You have one tower and one empty square.\n\nPlace an archer at `x=2`, `y=3` — right above the path.\n\nThe line is already written for you. Press **Fight!** and watch."
      },
      map: { cols: 8, rows: 6, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4]] },
      gold: 60, campHp: 3, seed: 1, allowed: ["archer"],
      waves: [ { delay: 0, enemies: [ { kind: "satyr", count: 3, gap: 1.6 } ] } ],
      starter: 'place_tower("archer", 2, 3)\n',
      solution: 'place_tower("archer", 2, 3)',
      hints: [
        { he: "השורה כבר נכונה. לחצי על **לקרב!** — הכפתור הכתום.", en: "The line is already correct. Press **Fight!** — the orange button." },
        { he: "אם שינית משהו בטעות, לחצי **איפוס** כדי להחזיר את השורה המקורית.", en: "If you changed something by accident, press **Reset** to bring the original line back." },
        { he: "השורה צריכה להיות בדיוק: `place_tower(\"archer\", 2, 3)`", en: "The line should be exactly: `place_tower(\"archer\", 2, 3)`" }
      ],
      check: { kind: "battle" }
    },

    {
      id: "b2",
      xp: 25, drachmas: 6,
      title: { he: "מגדל אחד לא מספיק", en: "One Tower Is Not Enough" },
      brief: {
        he: "עכשיו מגיעות שש. מגדל אחד לא יעצור אותן — הן יעברו לפני שהוא יספיק לירות.\n\nהוסיפי **עוד שני מגדלים**, כל אחד בשורה חדשה. כל השורות רצות לפי הסדר שכתבת.\n\nמשבצות דשא טובות: `(2, 3)`, `(5, 3)`, `(7, 5)`. כל מגדל חייב משבצת משלו.",
        en: "Now six are coming. One tower will not stop them — they will walk past before it can fire enough.\n\nAdd **two more towers**, each on its own line. Lines run in the order you write them.\n\nGood grass squares: `(2, 3)`, `(5, 3)`, `(7, 5)`. Each tower needs its own square."
      },
      map: { cols: 10, rows: 6, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4]] },
      gold: 160, campHp: 3, seed: 2, allowed: ["archer"],
      waves: [ { delay: 0, enemies: [ { kind: "satyr", count: 6, gap: 1.0 } ] } ],
      starter: 'place_tower("archer", 2, 3)\n',
      solution: 'place_tower("archer", 2, 3)\nplace_tower("archer", 5, 3)\nplace_tower("archer", 7, 5)',
      hints: [
        { he: "כמה מגדלים יש לך עכשיו, וכמה שורות `place_tower` זה אומר?", en: "How many towers do you have now, and how many `place_tower` lines is that?" },
        { he: "כל מגדל הוא שורה נפרדת, אחת מתחת לשנייה. שני את המספרים כדי לפזר אותם לאורך השביל.", en: "Each tower is its own line, one under the other. Change the numbers so they spread along the path." },
        { he: "שלוש שורות:\n`place_tower(\"archer\", 2, 3)`\n`place_tower(\"archer\", 5, 3)`\n`place_tower(\"archer\", 7, 5)`", en: "Three lines:\n`place_tower(\"archer\", 2, 3)`\n`place_tower(\"archer\", 5, 3)`\n`place_tower(\"archer\", 7, 5)`" }
      ],
      check: { kind: "battle" }
    },

    {
      id: "b3",
      xp: 30, drachmas: 8,
      title: { he: "לתקן את החרב השבורה", en: "Fix the Broken Sword" },
      brief: {
        he: "מישהו כתב את ההגנה בשבילך, אבל הקוד שבור — הוא בכלל לא רץ.\n\nהריצי, **קראי את השגיאה**, ותקני אותה. ואז תקני את השורה הבאה.\n\nזה התרגיל הכי חשוב בשיעור: לתקן קוד זו חצי מהעבודה של כל מתכנתת בעולם.",
        en: "Someone wrote the defense for you, but the code is broken — it does not run at all.\n\nRun it, **read the error**, and fix it. Then fix the next line.\n\nThis is the most important task in the lesson: fixing code is half of what every programmer in the world does."
      },
      map: { cols: 10, rows: 6, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4]] },
      gold: 160, campHp: 3, seed: 3, allowed: ["archer"],
      waves: [ { delay: 0, enemies: [ { kind: "satyr", count: 5, gap: 1.1 } ] } ],
      brokenStarter: true, /* deliberately broken — fixing it IS the task */
      starter: 'place_tower("archer, 2, 3)\nplace_tower(archer", 5, 3)\nplace_tower("archer", 7, 5)\n',
      solution: 'place_tower("archer", 2, 3)\nplace_tower("archer", 5, 3)\nplace_tower("archer", 7, 5)',
      hints: [
        { he: "הריצי קודם. באיזו שורה פייתון אומר שהוא התבלבל?", en: "Run it first. Which line does Python say confused it?" },
        { he: "ספרי את הגרשיים בשורה הראשונה. לכל `\"` צריך בן זוג, ו-`\"archer\"` צריך גרש בהתחלה **ובסוף** המילה.", en: "Count the quotes on the first line. Every `\"` needs a partner, and `\"archer\"` needs one before **and** after the word." },
        { he: "בשורה 1 הגרש הסוגר של `archer` חסר. בשורה 2 הגרש הפותח חסר. השורה השלישית תקינה.", en: "On line 1 the closing quote after `archer` is missing. On line 2 the opening one is. The third line is already fine." }
      ],
      check: { kind: "battle" }
    },

    {
      id: "b4",
      xp: 30, drachmas: 8,
      title: { he: "תוכנית קרב כתובה", en: "A Written Battle Plan" },
      brief: {
        he: "כירון רוצה לראות את התוכנית שלך, לא רק את התוצאה.\n\nבני הגנה שמחזיקה, **וכתבי לפחות הערה אחת** (שורה שמתחילה ב-`#`) שמסבירה למה בחרת את המקומות האלה.\n\nשימי לב: ההערה לא משנה כלום בקרב. המחשב מתעלם ממנה לגמרי. היא בשבילך ובשביל מי שיקרא את הקוד שלך מחר.",
        en: "Chiron wants to see your plan, not only your result.\n\nBuild a defense that holds, **and write at least one comment** (a line starting with `#`) explaining why you chose those spots.\n\nNotice: the comment changes nothing in the battle. The computer ignores it completely. It is for you, and for whoever reads your code tomorrow."
      },
      map: { cols: 10, rows: 7, path: [[0,3],[1,3],[2,3],[3,3],[4,3],[4,4],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5]] },
      gold: 200, campHp: 3, seed: 4, allowed: ["archer"],
      waves: [ { delay: 0, enemies: [ { kind: "satyr", count: 4, gap: 1.0 }, { kind: "harpy", count: 3, gap: 1.2 } ] } ],
      starter: '# my plan:\nplace_tower("archer", 2, 2)\n',
      solution: '# cover the straight run, then the corner\nplace_tower("archer", 2, 2)\nplace_tower("archer", 3, 4)\nplace_tower("archer", 6, 4)\nplace_tower("archer", 8, 6)',
      hints: [
        { he: "השביל הפעם מתעקל. איפה המפלצות מבזבזות הכי הרבה זמן?", en: "The path bends this time. Where do the monsters spend the most time?" },
        { he: "מגדל ליד הפינה מכסה שני חלקים של השביל בבת אחת. הוסיפי עוד מגדלים, וודאי שיש `#` באחת השורות.", en: "A tower near the bend covers two stretches of path at once. Add more towers, and make sure one line starts with `#`." },
        { he: "נסי ארבעה מגדלים: `(2, 2)`, `(3, 4)`, `(6, 4)`, `(8, 6)` — ושורת `#` למעלה שמסבירה למה.", en: "Try four towers: `(2, 2)`, `(3, 4)`, `(6, 4)`, `(8, 6)` — with a `#` line above explaining why." }
      ],
      check: {
        kind: "battle",
        also: {
          kind: "source", raw: true, mustInclude: ["#"],
          message: { he: "ההגנה החזיקה, אבל אין הערה. הוסיפי שורה שמתחילה ב-`#`.",
                     en: "The defense held, but there is no comment. Add a line starting with `#`." }
        }
      }
    }
  ],

  /* ---- 4. The great battle -------------------------------------------- */
  quest: {
    id: "q1",
    xp: 55, drachmas: 14,
    boss: null,
    title: { he: "ההגנה על השער", en: "The Defense of the Gate" },
    brief: {
      he: "הלילה הראשון שלך במחנה, ומשהו גדול יותר מגיע: הרפיות מלמעלה וכלבי גיהינום מלמטה, בשביל שמתפתל פעמיים.\n\nיש לך 300 זהב. קשת עולה 50, אז יש לך מקום לשישה — אבל **איפה** חשוב יותר מ**כמה**.\n\nלמחנה יש שלושה חיים בלבד. אף מפלצת לא יכולה לעבור.",
      en: "Your first night at camp, and something bigger is coming: harpies from above and hellhounds below, on a path that bends twice.\n\nYou have 300 gold. An archer costs 50, so there is room for six — but **where** matters more than **how many**.\n\nThe camp has three lives. Not one monster can get through."
    },
    map: {
      cols: 12, rows: 8,
      path: [[0,1],[1,1],[2,1],[3,1],[3,2],[3,3],[3,4],[4,4],[5,4],[6,4],[7,4],[7,5],[7,6],[8,6],[9,6],[10,6],[11,6]],
      rock: [[9,2],[10,3]]
    },
    gold: 300, campHp: 3, seed: 7, allowed: ["archer"],
    waves: [
      { delay: 0,  enemies: [ { kind: "satyr", count: 4, gap: 0.9 } ] },
      { delay: 8,  enemies: [ { kind: "harpy", count: 4, gap: 1.0 } ] },
      { delay: 18, enemies: [ { kind: "hellhound", count: 3, gap: 1.6 } ] }
    ],
    starter: '# The Defense of the Gate\n# archers cost 50 each, and you have 300\nplace_tower("archer", 2, 2)\n',
    solution: '# cover both bends and the final run\nplace_tower("archer", 2, 2)\nplace_tower("archer", 4, 3)\nplace_tower("archer", 2, 0)\nplace_tower("archer", 5, 3)\nplace_tower("archer", 6, 5)\nplace_tower("archer", 8, 5)',
    hints: [
      { he: "השביל מתעקל בשתי נקודות. מפלצת בפנייה נמצאת ליד אותו מגדל הרבה יותר זמן.", en: "The path bends in two places. A monster at a bend stays near the same tower for much longer." },
      { he: "בני קבוצות של מגדלים סביב הפניות ב-`(3,4)` וב-`(7,4)`, במקום לפזר אותם אחד־אחד לאורך כל השביל.", en: "Build clusters around the bends at `(3,4)` and `(7,4)`, rather than spreading them one by one along the whole path." },
      { he: "שישה מגדלים שעובדים: `(2,2)`, `(4,3)`, `(2,0)`, `(5,3)`, `(6,5)`, `(8,5)`. הריצי, וצפי איפה כמעט עברו.", en: "Six towers that work: `(2,2)`, `(4,3)`, `(2,0)`, `(5,3)`, `(6,5)`, `(8,5)`. Run it and watch where they nearly got through." }
    ],
    check: { kind: "battle" }
  },

  /* ---- 5. Recap -------------------------------------------------------- */
  recap: {
    bullets: [
      { he: "פקודה נראית ככה: **שם**, סוגריים, ומה שהיא מקבלת בפנים.", en: "A command looks like this: **a name**, brackets, and what it receives inside." },
      { he: "`print()` מדפיס טקסט. `place_tower()` מציב מגדל. אותו מבנה בדיוק.", en: "`print()` prints text. `place_tower()` places a tower. Exactly the same shape." },
      { he: "טקסט בתוך גרשיים נקרא **string**. בלי גרשיים פייתון חושב שזה שם של משהו.", en: "Text inside quotes is called a **string**. Without quotes Python thinks it is the name of something." },
      { he: "השורות רצות לפי הסדר שכתבת, מלמעלה למטה.", en: "Lines run in the order you wrote them, top to bottom." },
      { he: "`#` פותח הערה שהמחשב מתעלם ממנה — היא בשבילך.", en: "`#` starts a comment the computer ignores — it is for you." },
      { he: "שגיאה היא הודעה, לא כישלון. היא אומרת לך באיזו שורה להסתכל.", en: "An error is a message, not a failure. It tells you which line to look at." }
    ],
    next: {
      he: "בנית שישה מגדלים והקלדת `\"archer\"` שש פעמים. מחר תגלי איך לתת שם לדבר פעם אחת ולהשתמש בו שוב ושוב — ואיך המחשב **זוכר** דברים.",
      en: "You built six towers and typed `\"archer\"` six times. Tomorrow you will find out how to name a thing once and use it again and again — and how a computer **remembers**."
    }
  }
});
