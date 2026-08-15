# 02 — Game design: the Percy Jackson layer

## Principle

The game exists to make her come back tomorrow. Every mechanic must answer
"does this make a 14-year-old want one more lesson?" If it only makes the project
look gamified, cut it.

**No punishment mechanics.** No streaks to lose, no lives, no timers, no score
that goes down. She can fail an exercise unlimited times at no cost. The only
resource that is ever spent is spent voluntarily, on hints.

## The frame

She is a newly-discovered demigod arriving at **Camp Half-Blood**. Chiron is the
narrator and teacher. Each of the five acts is a quest that takes her further
from camp; each act ends with a monster that can only be defeated with the
programming she just learned.

Python is framed as **the language of the gods** — the words that make things
happen. This is why code stays English inside a Hebrew course: it is presented as
a language of power she is learning, not as an accident of translation.

## Claiming — the first 90 seconds

On first ever visit, before any lesson:

1. She is asked her **name** (free text, stored locally, used throughout). Never
   invented for her, never required — "Demigod" is the default if she skips.
2. Five quick flavour questions ("the sea, the forge, or the library?").
3. A claiming animation: a glowing symbol appears above her name and she is
   claimed by a god.

**Cabins** (godly parent) — each gives a cosmetic accent colour, a symbol, and a
narrator voice tint. No mechanical advantage; nothing is locked behind a cabin.

| Cabin | Symbol | Accent | Flavour |
| --- | --- | --- | --- |
| Athena | 🦉 | owl-grey / olive | plans, strategy, "you saw it before it happened" |
| Poseidon | 🔱 | sea blue | instinct, water, storms |
| Hermes | ⚕️ | quicksilver | speed, tricks, shortcuts |
| Apollo | ☀️ | gold | light, music, prophecy |
| Hephaestus | ⚒️ | ember orange | building, fixing, machines |
| Ares | ⚔️ | crimson | force, courage, charging in |
| Demeter | 🌾 | green | growth, patience |
| Aphrodite | 🕊️ | rose | charm, beauty, people |

She can re-roll her claiming from the hub at any time. It is flavour; do not make
it feel permanent and stressful.

## Progression

**XP** is awarded for finishing exercises and lessons. Levels are titles, and
titles are the reward — there is no stat behind them.

| Level | XP | Title (he / en) |
| --- | --- | --- |
| 1 | 0 | טירונית / Recruit |
| 2 | 200 | חניכת מחנה / Camper |
| 3 | 600 | נושאת חרב / Blade-Bearer |
| 4 | 1200 | יוצאת למסע / Quester |
| 5 | 2000 | גיבורה / Hero |
| 6 | 3000 | אלופת אולימפוס / Champion of Olympus |
| 7 | 4200 | אולימפית / Olympian |

Budget per lesson: ~15–25 XP per training exercise, 40–60 for the quest,
plus a 30 XP lesson-completion bonus. Twenty lessons should land her just past
level 7 if she completes everything — she must reach Olympian by finishing the
course, not before.

**Golden drachmas** 🪙 — earned alongside XP (roughly 1 per 4 XP). Currency.

**Ambrosia** 🍯 — the hint resource. She starts with 3 and earns 1 per completed
lesson. **Buying a hint costs 1 ambrosia**; if she has none, she can buy ambrosia
with 15 drachmas. She must never be hard-blocked from a hint — if she has neither
resource, the hint unlocks anyway with a gentle line. The cost exists to make
using a hint a *decision*, not to gate learning.

Hint ladder per exercise (defined in `04-lesson-template.md`): nudge → concrete
hint → worked solution. The worked solution always requires a second confirmation
click.

## Items

Each lesson grants one themed item on completion. Items are pure trophies — they
are the visible answer to "what have I actually done?" and they live in an
inventory drawer on the hub.

Examples: a camp necklace bead (L1, one bead added per lesson thereafter),
Riptide the pen-sword, winged shoes, Ariadne's string, a shield forged at the
Hephaestus cabin, the Golden Fleece.

## Boss fights — lessons 4, 8, 12, 16, 20

The last lesson of each act replaces the ordinary quest with a **boss**: one
larger problem whose checker runs several test cases. Each passing case visibly
drains the monster's health bar; the bar is the progress indicator.

| Act | Boss | Beaten with |
| --- | --- | --- |
| I | The Minotaur | arithmetic and variables |
| II | Medusa | loops and conditions |
| III | The Hydra | lists and dictionaries |
| IV | The Labyrinth itself | functions and recursion |
| V | Kronos | everything — the capstone |

Partial progress is kept and shown. Losing is not possible; she has not finished
yet. Defeating a boss unlocks the next act on the map with a short
cutscene.

## Quest map (`index.html`)

Twenty stops on a hand-drawn path: Camp Half-Blood → the open sea → the
Underworld → the Labyrinth → Mount Olympus. Each stop shows locked / available /
completed, its title, and its item once earned.

Stops unlock in order. **One escape hatch:** a "skip ahead" affordance exists in
the hub for a returning learner or an adult testing the course — it is
deliberately understated, and it never appears mid-lesson where it would tempt
her past something she needs.

The hub also shows: her name and cabin, level and XP bar, drachmas, ambrosia,
item drawer, language toggle, and Export/Import progress.

## Achievements

Small, surprising, and never required. Awarded silently with a toast.

Examples: *First Word* (run your first program), *Debugger* (fix an error and
re-run successfully), *Persistent* (solve an exercise after five failed runs —
explicitly rewarding struggle, not speed), *No Hints Needed* (finish a lesson
with zero hints), *Night Owl* / *Early Bird*, *Completionist* (all exercises in
an act).

Never award an achievement for speed alone, and never show her a leaderboard —
there is nobody to compare against and comparison is the fastest way to make a
beginner quit.
