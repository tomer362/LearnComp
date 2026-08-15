/* content/lesson-01.js — "The First Word" / "המילה הראשונה"
 * Design: spec/lessons/lesson-01.md   Schema: spec/04-lesson-template.md
 * Every learner-visible string is a {he, en} pair. Code is English only.
 */
LC.registerLesson({
  id: "01",
  act: 1,
  slug: "the-first-word",
  minutes: 25,
  concepts: ["print", "strings", "comments", "reading an error"],

  title: {
    he: "המילה הראשונה",
    en: "The First Word"
  },
  subtitle: {
    he: "איך גורמים למחשב להגיד משהו",
    en: "How to make the computer say something"
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

  /* ---- 1. Prophecy ---------------------------------------------------- */
  prophecy: {
    lines: [
      { he: "הגעת אל המחנה. השערים נסגרים מאחורייך, ומה שרדף אחרייך נשאר בחוץ.",
        en: "You reach the camp. The gates close behind you, and whatever was chasing you stays outside." },
      { he: "כירון מחכה ליד הבית הגדול. הוא לא שואל אם את בסדר — הוא כבר יודע.",
        en: "Chiron is waiting by the Big House. He does not ask if you are all right — he already knows." },
      { he: "\"לכל גיבורה יש מילה ראשונה,\" הוא אומר. \"המילה הזאת לא מזיזה הרים ולא מפצלת ימים.\"",
        en: "\"Every hero has a first word,\" he says. \"It does not move mountains or part seas.\"" },
      { he: "\"היא עושה משהו מסוכן הרבה יותר — היא גורמת למכונה להקשיב לך.\"",
        en: "\"It does something far more dangerous — it makes the machine listen to you.\"" },
      { he: "\"בואי נלמד אותה.\"",
        en: "\"Let us learn it.\"" }
    ]
  },

  /* ---- 2. Chiron Teaches ---------------------------------------------- */
  teach: [
    { type: "prose", text: {
      he: "תוכנית היא רשימת הוראות. המחשב קורא אותן מלמעלה למטה, אחת אחרי השנייה, ועושה **בדיוק** מה שכתוב. הוא לא מנחש ולא משלים חסר. זה נשמע כמו חיסרון, אבל זה בדיוק מה שהופך אותו לאמין: אם כתבת נכון, הוא יעשה נכון בכל פעם.",
      en: "A program is a list of instructions. The computer reads them top to bottom, one after another, and does **exactly** what they say. It does not guess and it does not fill in gaps. That sounds like a weakness, but it is what makes it trustworthy: write it correctly and it works the same way every time." } },

    { type: "prose", text: {
      he: "המילה הראשונה שלך היא `print`. לחצי על **הרצה** ותראי מה קורה.",
      en: "Your first word is `print`. Press **Run** and see what happens." } },

    { type: "code",
      code: 'print("Hello, Olympus")',
      caption: { he: "המילה שגורמת למכונה לדבר.", en: "The word that makes the machine speak." } },

    { type: "prose", text: {
      he: "עכשיו, אחרי שראית את זה עובד, אפשר לתת שמות לחלקים:\n\n• `print` — הפקודה. היא אומרת למחשב: תדפיס למסך.\n• הסוגריים `( )` — מחזיקים את מה שרוצים להדפיס.\n• הגרשיים `\" \"` — מסמנים שמה שביניהם הוא **טקסט**.\n\nלטקסט בתוך גרשיים קוראים בפייתון **string** (מחרוזת). זו מילה שתלווה אותך לאורך כל הקורס.",
      en: "Now that you have seen it work, we can name the parts:\n\n• `print` — the command. It tells the computer to write to the screen.\n• the brackets `( )` — they hold whatever you want printed.\n• the quotes `\" \"` — they mark what is between them as **text**.\n\nText inside quotes is called a **string** in Python. That word will follow you through the whole course." } },

    { type: "prose", text: {
      he: "כל `print` מתחיל שורה חדשה. שלוש פקודות, שלוש שורות — ותמיד בסדר שכתבת אותן.",
      en: "Each `print` starts a new line. Three commands, three lines — always in the order you wrote them." } },

    { type: "code",
      code: 'print("Camp Half-Blood")\nprint("Long Island, New York")\nprint("Home.")',
      caption: { he: "מלמעלה למטה, בדיוק לפי הסדר.", en: "Top to bottom, exactly in order." } },

    { type: "callout", tone: "myth",
      title: { he: "למה הכול באנגלית?", en: "Why is it all in English?" },
      text: {
        he: "פייתון נכתבה באנגלית, ולכן המילים שלה זהות בכל העולם — בישראל, ביפן וביוון. ההסברים כאן בעברית, אבל `print` יישאר `print` תמיד. תחשבי על זה כמו על שפת האלים: לא מתרגמים אותה, לומדים אותה.",
        en: "Python was written in English, so its words are the same everywhere in the world — in Israel, in Japan, in Greece. The explanations here are in Hebrew, but `print` will always be `print`. Think of it as the language of the gods: you do not translate it, you learn it." } },

    { type: "prose", text: {
      he: "עכשיו החלק החשוב באמת. בואי **נשבור** את זה בכוונה, כדי שתדעי איך נראית שגיאה לפני שתפגשי אחת לבד.",
      en: "Now the part that really matters. Let us **break** it on purpose, so you know what an error looks like before you meet one alone." } },

    { type: "error",
      code: 'print("Hello)',
      error: "SyntaxError: EOL while scanning string literal on line 1",
      explain: {
        he: "פתחנו גרשיים אבל אף פעם לא סגרנו אותם. פייתון קרא עד סוף השורה, חיפש את הגרש השני, לא מצא — ועצר.\n\nזאת לא קטסטרופה. זו הודעה. פייתון אומר לך בדיוק **באיזו שורה** הוא התבלבל, וזה כמעט תמיד המקום הנכון להתחיל בו. גיבורה שאף פעם לא רואה שגיאה היא גיבורה שאף פעם לא כתבה משהו מעניין.",
        en: "We opened a quote and never closed it. Python read to the end of the line, looked for the second quote, did not find it — and stopped.\n\nThis is not a disaster. It is a message. Python tells you exactly **which line** confused it, and that is almost always the right place to start. A hero who never sees an error is a hero who never wrote anything interesting." } },

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
      he: "בלי הגרשיים, פייתון חושב ש-`Hello` הוא **שם של משהו** — משתנה, פקודה, משהו שהוא אמור להכיר. הוא מחפש, לא מוצא, ומודיע לך. עם גרשיים, זה פשוט טקסט, וטקסט הוא רק טקסט.",
      en: "Without the quotes, Python thinks `Hello` is the **name of something** — a variable, a command, something it should know. It looks, does not find it, and tells you. With quotes, it is text, and text is only ever text." } },

    { type: "prose", text: {
      he: "דבר אחרון: **הערות**. הסימן `#` אומר לפייתון להתעלם משאר השורה. זה המחברת הפרטית שלך בתוך הקוד — מקום לכתוב לעצמך מה עשית ולמה.",
      en: "One more thing: **comments**. The `#` symbol tells Python to ignore the rest of the line. It is your private notebook inside the code — a place to write down what you did and why." } },

    { type: "code",
      code: '# this line is a note to myself\nprint("Chiron is watching")  # notes can sit after code too',
      caption: { he: "ההערות לא מופיעות בפלט. הן רק בשבילך.", en: "Comments never appear in the output. They are only for you." } },

    { type: "callout", tone: "tip",
      title: { he: "גרש בודד או כפול?", en: "Single or double quotes?" },
      text: {
        he: "גם `\"Hello\"` וגם `'Hello'` עובדים בדיוק אותו דבר. בחרי אחד והישארי איתו. הקורס הזה משתמש בגרשיים כפולים.",
        en: "Both `\"Hello\"` and `'Hello'` work exactly the same. Pick one and stay with it. This course uses double quotes." } }
  ],

  /* ---- 3. Try It ------------------------------------------------------ */
  tryIt: {
    intro: {
      he: "התור שלך. שני את הטקסט לכל דבר שבא לך, הוסיפי עוד שורות, שברי את זה בכוונה. **שום דבר כאן לא נבדק** — זה המגרש שלך.",
      en: "Your turn. Change the text to anything you like, add more lines, break it on purpose. **Nothing here is graded** — this is your playground."
    },
    starter: 'print("My name is ")\nprint("and I just arrived at camp")\n'
  },

  /* ---- 4. Training ---------------------------------------------------- */
  training: [
    {
      id: "e1",
      xp: 20, drachmas: 5,
      title: { he: "השם שלך בשער", en: "Your name at the gates" },
      brief: {
        he: "כירון שואל איך קוראים לך. הדפיסי את השם שלך — כל שם, מה שאת רוצה שיקראו לך במחנה.",
        en: "Chiron asks your name. Print it — any name you want to be called at camp."
      },
      starter: 'print("")\n',
      solution: 'print("Annabeth")',
      hints: [
        { he: "מה צריך להיכנס בין שני הגרשיים?", en: "What needs to go between the two quotes?" },
        { he: "הציבי את הסמן בין ה-`\"` וה-`\"` והקלידי שם.", en: "Put the cursor between the `\"` and the `\"` and type a name." },
        { he: "ככה זה נראה עם השם Annabeth: `print(\"Annabeth\")`. שימי את השם שלך במקום.", en: "Here it is with the name Annabeth: `print(\"Annabeth\")`. Put your own name instead." }
      ],
      /* She chooses the text, so we require a print call AND any non-empty output. */
      check: {
        kind: "source",
        mustInclude: ["print("],
        message: { he: "צריך להשתמש ב-`print` כדי להדפיס.", en: "You need to use `print` to print something." },
        also: { kind: "output", mode: "regex", expect: "\\S" }
      }
    },

    {
      id: "e2",
      xp: 20, drachmas: 5,
      title: { he: "שלוש שורות לכירון", en: "Three lines to Chiron" },
      brief: {
        he: "הדפיסי בדיוק שלוש שורות, בסדר הזה:\n\n`I am a demigod`\n`I am not afraid`\n`(mostly)`",
        en: "Print exactly three lines, in this order:\n\n`I am a demigod`\n`I am not afraid`\n`(mostly)`"
      },
      starter: "# three lines, three prints\n",
      solution: 'print("I am a demigod")\nprint("I am not afraid")\nprint("(mostly)")',
      hints: [
        { he: "כמה שורות של פלט את צריכה? וכמה פקודות `print` זה אומר?", en: "How many lines of output do you need? And how many `print` commands is that?" },
        { he: "כל `print` מייצר שורה אחת. שלוש שורות = שלוש פקודות, אחת מתחת לשנייה.", en: "Each `print` makes one line. Three lines = three commands, one under the other." },
        { he: "השורה הראשונה היא `print(\"I am a demigod\")`. כתבי אותה, ואז עוד שתיים באותו מבנה בדיוק.", en: "The first line is `print(\"I am a demigod\")`. Write it, then two more with exactly the same shape." }
      ],
      check: { kind: "output", mode: "normalized", expect: "I am a demigod\nI am not afraid\n(mostly)" }
    },

    {
      id: "e3",
      xp: 25, drachmas: 8,
      title: { he: "לתקן את החרב השבורה", en: "Fix the broken sword" },
      brief: {
        he: "הקוד הזה שבור — הריצי אותו וקראי את השגיאה. שתי השורות צריכות לעבוד ולהדפיס בדיוק את מה שכתוב בהן.\n\nזה התרגיל הכי חשוב בשיעור: לתקן קוד זה חצי מהעבודה של כל מתכנתת בעולם.",
        en: "This code is broken — run it and read the error. Both lines should work and print exactly what they say.\n\nThis is the most important exercise in the lesson: fixing code is half of what every programmer in the world does."
      },
      starter: 'print("Riptide is a pen)\nprint(Its also a sword")\n',
      solution: 'print("Riptide is a pen")\nprint("Its also a sword")',
      hints: [
        { he: "הריצי קודם. באיזו שורה פייתון אומר שהוא התבלבל?", en: "Run it first. Which line does Python say confused it?" },
        { he: "ספרי את הגרשיים בכל שורה. לכל `\"` צריך להיות בן זוג באותה שורה.", en: "Count the quotes on each line. Every `\"` needs a partner on the same line." },
        { he: "בשורה הראשונה חסר גרש **סוגר** לפני הסוגר העגול. בשורה השנייה חסר גרש **פותח** אחרי הסוגר העגול.", en: "The first line is missing a **closing** quote before the bracket. The second is missing an **opening** quote after the bracket." }
      ],
      check: { kind: "output", mode: "normalized", expect: "Riptide is a pen\nIts also a sword" }
    },

    {
      id: "e4",
      xp: 30, drachmas: 8,
      title: { he: "פתק לעצמך", en: "A note to yourself" },
      brief: {
        he: "כתבי תוכנית שיש בה **לפחות הערה אחת** (שורה שמתחילה ב-`#`) ו**לפחות שתי פקודות `print`**.\n\nשימי לב מה קורה: ההערה לא מופיעה בפלט. המחשב מתעלם ממנה לגמרי.",
        en: "Write a program with **at least one comment** (a line starting with `#`) and **at least two `print` commands**.\n\nNotice what happens: the comment does not appear in the output. The computer ignores it completely."
      },
      starter: "# write your note here\n",
      solution: '# my first quest at camp\nprint("Day one at Camp Half-Blood")\nprint("I survived")',
      hints: [
        { he: "מה `#` עושה לשורה שהוא נמצא בה?", en: "What does `#` do to the line it sits on?" },
        { he: "שורה שמתחילה ב-`#` היא הערה. הוסיפי שורה כזאת, ומתחתיה שתי פקודות `print`.", en: "A line starting with `#` is a comment. Add one, and two `print` commands under it." },
        { he: "כך זה נראה: שורה ראשונה `# my note`, ואז `print(\"…\")` פעמיים עם טקסט משלך.", en: "It looks like this: first line `# my note`, then `print(\"…\")` twice with your own text." }
      ],
      check: {
        kind: "source",
        raw: true, /* the requirement IS a comment, so inspect the real source */
        mustInclude: ["#"],
        message: { he: "צריך לפחות הערה אחת שמתחילה ב-`#`, ולפחות שתי פקודות `print`.", en: "You need at least one comment starting with `#`, and at least two `print` commands." },
        also: { kind: "output", mode: "regex", expect: "\\S[\\s\\S]*\\n[\\s\\S]*\\S" }
      }
    }
  ],

  /* ---- 5. Quest ------------------------------------------------------- */
  quest: {
    id: "q1",
    xp: 45, drachmas: 12,
    boss: null,
    title: { he: "ההכרזה", en: "The Announcement" },
    brief: {
      he: "הערב יש מדורה, וכירון ביקש ממך לכתוב את ההכרזה שתוקרא בקול. הדפיסי בדיוק את חמש השורות האלה, בסדר הזה:\n\n`Campers, gather!`\n`A new demigod has arrived.`\n`She outran a monster to reach these gates.`\n`Tonight, we find out who her parent is.`\n`Welcome to Camp Half-Blood.`",
      en: "There is a campfire tonight, and Chiron has asked you to write the announcement that will be read aloud. Print exactly these five lines, in this order:\n\n`Campers, gather!`\n`A new demigod has arrived.`\n`She outran a monster to reach these gates.`\n`Tonight, we find out who her parent is.`\n`Welcome to Camp Half-Blood.`"
    },
    starter: "# five lines, read aloud at the campfire\n",
    solution: 'print("Campers, gather!")\nprint("A new demigod has arrived.")\nprint("She outran a monster to reach these gates.")\nprint("Tonight, we find out who her parent is.")\nprint("Welcome to Camp Half-Blood.")',
    hints: [
      { he: "זה בדיוק אותו כלי מקודם, רק יותר ממנו. כמה שורות ביקשנו?", en: "This is the same tool as before, just more of it. How many lines did we ask for?" },
      { he: "חמש שורות פלט = חמש פקודות `print`, אחת מתחת לשנייה. העתיקי את הטקסט בדיוק, כולל הנקודות וסימן הקריאה.", en: "Five lines of output = five `print` commands, one under the other. Copy the text exactly, including the full stops and the exclamation mark." },
      { he: "השתיים הראשונות:\n`print(\"Campers, gather!\")`\n`print(\"A new demigod has arrived.\")`\nהמשיכי באותה צורה לשלוש הנותרות.", en: "The first two:\n`print(\"Campers, gather!\")`\n`print(\"A new demigod has arrived.\")`\nCarry on the same way for the other three." }
    ],
    check: {
      kind: "output",
      mode: "normalized",
      expect: "Campers, gather!\nA new demigod has arrived.\nShe outran a monster to reach these gates.\nTonight, we find out who her parent is.\nWelcome to Camp Half-Blood."
    }
  },

  /* ---- 6. Recap ------------------------------------------------------- */
  recap: {
    bullets: [
      { he: "`print()` מדפיס טקסט למסך.", en: "`print()` writes text to the screen." },
      { he: "טקסט בתוך גרשיים נקרא **string**. בלי גרשיים פייתון חושב שזה שם של משהו.", en: "Text inside quotes is called a **string**. Without quotes Python thinks it is the name of something." },
      { he: "כל `print` מתחיל שורה חדשה, והשורות רצות לפי הסדר שכתבת.", en: "Each `print` starts a new line, and lines run in the order you wrote them." },
      { he: "`#` פותח הערה — המחשב מתעלם ממנה, היא רק בשבילך.", en: "`#` starts a comment — the computer ignores it, it is only for you." },
      { he: "שגיאה היא הודעה, לא כישלון. היא אומרת לך באיזו שורה להסתכל.", en: "An error is a message, not a failure. It tells you which line to look at." }
    ],
    next: {
      he: "מחר בבוקר יתנו לך שרשרת, ועלייה יוסיפו חרוז בכל קיץ. אבל לפני זה יש שאלה גדולה יותר: איך המחשב **זוכר** דברים? איך שומרים את השם שלך במקום להדפיס אותו ולשכוח?",
      en: "Tomorrow morning you will be given a necklace, and a bead will be added to it every summer. But first there is a bigger question: how does a computer **remember** things? How do you keep your name instead of printing it and forgetting it?"
    }
  }
});
