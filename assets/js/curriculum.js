/* curriculum.js — the ordered list of lessons, for the quest map.
 *
 * `built: true` means content/lesson-NN.js exists and the stop is playable.
 * Adding a lesson: write the content file + shell, then flip `built` here.
 * See spec/07-curriculum.md for what each lesson teaches.
 */
window.LC = window.LC || {};
(function (LC) {
  "use strict";

  LC.ACTS = [
    { n: 1, title: { he: "מחנה חצי־דם",  en: "Camp Half-Blood" },   scene: { he: "ההגעה",        en: "Arrival" } },
    { n: 2, title: { he: "גנב הברק",      en: "The Lightning Thief" }, scene: { he: "הדרך לאולימפוס", en: "The road to Olympus" } },
    { n: 3, title: { he: "ים המפלצות",    en: "Sea of Monsters" },   scene: { he: "המסע בים",     en: "The voyage" } },
    { n: 4, title: { he: "קללת הטיטאן",   en: "The Titan's Curse" }, scene: { he: "המבוך",        en: "The Labyrinth" } },
    { n: 5, title: { he: "האולימפי האחרון", en: "The Last Olympian" }, scene: { he: "הקרב האחרון", en: "The last battle" } }
  ];

  LC.CURRICULUM = [
    { id: "01", act: 1, built: true,  boss: false, icon: "📿", title: { he: "המילה הראשונה",    en: "The First Word" },        teaches: { he: "print, טקסט, הערות",        en: "print, strings, comments" } },
    { id: "02", act: 1, built: false, boss: false, icon: "🧿", title: { he: "שרשרת המחנה",      en: "The Camp Necklace" },     teaches: { he: "משתנים וסוגים",             en: "variables and types" } },
    { id: "03", act: 1, built: false, boss: false, icon: "🗣️", title: { he: "שיחה עם כירון",    en: "Speaking with Chiron" },  teaches: { he: "input ו-f-strings",         en: "input and f-strings" } },
    { id: "04", act: 1, built: false, boss: true,  icon: "🐂", title: { he: "מס המינוטאור",     en: "The Minotaur's Toll" },   teaches: { he: "פעולות חשבון",              en: "arithmetic" } },

    { id: "05", act: 2, built: false, boss: false, icon: "🔮", title: { he: "חידת האורקל",      en: "The Oracle's Riddle" },   teaches: { he: "אמת ושקר, השוואות",         en: "booleans and comparisons" } },
    { id: "06", act: 2, built: false, boss: false, icon: "🛤️", title: { he: "פרשת הדרכים",      en: "The Crossroads" },        teaches: { he: "if / elif / else",          en: "if / elif / else" } },
    { id: "07", act: 2, built: false, boss: false, icon: "🌊", title: { he: "מעבר לסירנות",     en: "Past the Sirens" },       teaches: { he: "לולאות while",              en: "while loops" } },
    { id: "08", act: 2, built: false, boss: true,  icon: "🐍", title: { he: "גן המדוזה",        en: "Medusa's Garden" },       teaches: { he: "לולאות for ו-range",        en: "for loops and range" } },

    { id: "09", act: 3, built: false, boss: false, icon: "⚓", title: { he: "חבורת המסע",       en: "The Quest Party" },       teaches: { he: "רשימות",                    en: "lists" } },
    { id: "10", act: 3, built: false, boss: false, icon: "🏹", title: { he: "מלאי הציידות",     en: "The Hunters' Inventory" },teaches: { he: "פעולות על רשימות",          en: "list methods and slicing" } },
    { id: "11", act: 3, built: false, boss: false, icon: "📜", title: { he: "מרשם האלים",       en: "Registry of the Gods" },  teaches: { he: "מילונים",                   en: "dictionaries" } },
    { id: "12", act: 3, built: false, boss: true,  icon: "🐲", title: { he: "ההידרה",           en: "The Hydra" },             teaches: { he: "מבנים מקוננים",             en: "nested data" } },

    { id: "13", act: 4, built: false, boss: false, icon: "📐", title: { he: "שרטוטי דדלוס",     en: "Daedalus' Blueprints" },  teaches: { he: "פונקציות",                  en: "functions" } },
    { id: "14", act: 4, built: false, boss: false, icon: "🗺️", title: { he: "יוצרת המפות",      en: "The Map Maker" },         teaches: { he: "return ופרמטרים",           en: "return and parameters" } },
    { id: "15", act: 4, built: false, boss: false, icon: "🎲", title: { he: "קוביות הגורל",     en: "The Dice of Fate" },      teaches: { he: "random ו-math",             en: "random and math" } },
    { id: "16", act: 4, built: false, boss: true,  icon: "🌀", title: { he: "המבוך שבתוך המבוך", en: "The Maze Within" },      teaches: { he: "רקורסיה",                   en: "recursion" } },

    { id: "17", act: 5, built: false, boss: false, icon: "🔤", title: { he: "פענוח הנבואה",     en: "Decoding the Prophecy" }, teaches: { he: "פעולות על טקסט",            en: "string methods" } },
    { id: "18", act: 5, built: false, boss: false, icon: "🦇", title: { he: "לשרוד את הפוריות", en: "Surviving the Furies" },  teaches: { he: "שגיאות ו-try/except",       en: "errors and try/except" } },
    { id: "19", act: 5, built: false, boss: false, icon: "⚒️", title: { he: "נפחיית הפייסטוס",  en: "The Forge of Hephaestus" },teaches:{ he: "מחלקות ואובייקטים",         en: "classes and objects" } },
    { id: "20", act: 5, built: false, boss: true,  icon: "⚡", title: { he: "הקרב על אולימפוס", en: "Battle for Olympus" },    teaches: { he: "פרויקט מסכם",               en: "the capstone project" } }
  ];

  /* Items are declared in each lesson's content file, but the hub does not load
   * those (it would mean pulling in all 20). Mirror the item here when a lesson
   * is built so the inventory can show a real name and icon.
   * Keyed by the item id used in the content file. */
  LC.ITEMS = {
    "camp-bead": { icon: "📿", name: { he: "חרוז המחנה", en: "Camp Bead" } }
  };

  LC.itemMeta = function (id) {
    return LC.ITEMS[id] || { icon: "🎒", name: { he: id, en: id } };
  };

  LC.lessonMeta = function (id) {
    for (var i = 0; i < LC.CURRICULUM.length; i++) {
      if (LC.CURRICULUM[i].id === id) return LC.CURRICULUM[i];
    }
    return null;
  };

  LC.nextLesson = function (id) {
    for (var i = 0; i < LC.CURRICULUM.length; i++) {
      if (LC.CURRICULUM[i].id === id) return LC.CURRICULUM[i + 1] || null;
    }
    return null;
  };
})(window.LC);
