# spec/ — the design contract for Demigod Code

This folder is the **source of truth**. The code implements the spec; when they
disagree, the spec is wrong or the code is wrong — never "both are fine".

Read the one file you need. Do not read all of them.

| File | Read it when you are… |
| --- | --- |
| `00-overview.md` | new to the project; need the motive, the learner, the pedagogy |
| `01-architecture.md` | touching anything in `assets/js/` or adding a page |
| `02-game-design.md` | changing XP, drachmas, cabins, items, bosses, or the save file |
| `03-i18n-and-rtl.md` | writing any user-visible text, or debugging a layout flip |
| `04-lesson-template.md` | **authoring or editing a lesson** — this is the schema |
| `05-visual-design.md` | writing CSS or adding a UI component |
| `06-authoring-guide.md` | writing lesson prose, exercises, or hints |
| `07-curriculum.md` | deciding what a lesson teaches, or reordering lessons |
| `08-quality-checklist.md` | about to call a lesson "done" |
| `09-battle-game.md` | anything about the battles |
| `10-deployment.md` | touching `vercel.json`, `sw.js`, or anything hosted-only |
| `TODO.md` | picking up the next piece of work |
| `lessons/lesson-NN.md` | building lesson NN — the deep, per-lesson design |

## The one-paragraph version

A 14-year-old Hebrew-speaking girl with zero programming experience opens
`index.html` by double-clicking it. She is claimed by a Greek god, gets a quest
map, and learns Python by writing real code that runs in her browser — offline,
with no install, no server, and no account. Twenty lessons take her from
`print()` to a text adventure game she builds herself.

The same files also deploy to Vercel Hobby (`spec/10-deployment.md`) as a
second, additive delivery lane. Nothing about the folder-handoff story above
changes because of that — a hosted visitor and someone who double-clicks
`index.html` off a USB stick get the same course from the same code.

## Non-negotiables

These are repeated in `CLAUDE.md` because breaking any of them silently destroys
the product:

1. Everything must work from `file://` with **zero network access**.
2. No `fetch()`, no `XMLHttpRequest`, no ES modules, no CDN, no webfonts.
3. Hebrew is the default language; **code, output and error messages stay
   English and stay left-to-right**.
4. Every Python construct used in a lesson must be verified to actually run in
   Skulpt (`node tools/verify-python.mjs`) before that lesson ships.
5. The hosted lane may add to the above (a manifest, a service worker, a
   `?progress=` link) but may **never** make the `file://` lane depend on a
   network request to work. See `spec/10-deployment.md` for the dual-mode
   contract and exactly what is allowed to differ between the two.
