# 09 — The Battle Game

**The game is the course.** There are no abstract exercises. Every task she is
given is a battle: monsters walk a path toward Camp Half-Blood, and the only way
to stop them is to write Python.

This document is the contract. `assets/js/battle/` implements it; every lesson
is designed against it.

## Why tower defense

Because the mechanics *are* the concepts, not a costume over them:

- the map grid **is** a list of lists
- a wave of monsters **is** a list of dictionaries
- picking which monster to shoot **is** `if`/`elif`/`else`
- building a wall of towers **is** a `for` loop
- a reusable tower behaviour **is** a function
- her own tower type **is** a class

She is never asked to "pretend" this matters. If her loop is wrong, monsters
reach the camp and she watches it happen.

## The three control models — she graduates through them

| Lessons | Model | What she writes |
| --- | --- | --- |
| 1–13 | **Build script** | A script that runs once before the wave. `place_tower("archer", 2, 3)` |
| 14–18 | **Strategy function** | `def choose_target(enemies):` — the game calls it every time a tower needs a target |
| 19–20 | **Custom tower class** | `class LightningTower:` — the game instantiates it and calls its methods |

Each model is a strict superset of the last: a lesson-19 battle still uses build
scripts and strategy functions. Nothing she learned stops being useful.

This progression is why the course can start at `print()` and still end
somewhere real. Verified working against Skulpt: injected builtins, calling her
`def` synchronously from JS with list/dict arguments, instantiating her class and
calling its methods, and the exec limit still catching a runaway strategy
function.

## Python API — the words the gods gave her

Injected as **Skulpt builtins**, so there is no `import` to explain in lesson 1.
Every one of these is a real Python function call, which is exactly the skill
lesson 1 teaches.

### Build phase (available from lesson 1)

```python
place_tower(kind, x, y)   # kind: "archer" | "cannon" | "ice" | "lightning"
                          # x, y: grid column and row, both starting at 0
sell_tower(x, y)          # removes it and refunds in full
get_gold()      -> int    # gold left to spend
tower_cost(kind)-> int    # what a tower costs
get_wave()      -> list   # [{"kind": "harpy", "hp": 30, ...}, ...] this wave
get_map()       -> list   # list of rows, each a list of "path"/"grass"/"rock"
camp_hp()       -> int    # lives remaining
```

**`get_map()` is row-first: `grid[y][x]`.** `len(grid)` is the number of rows,
`len(grid[0])` the number of columns. This is the opposite order from
`place_tower(kind, x, y)`, which is a genuine trap — lesson 12 must teach it
explicitly rather than hope she notices. Verified against a deliberately
non-square map.

The build phase is a script that runs once *before* the battle, so `sell_tower`
is "change your mind while planning", not a mid-battle trade. A full refund is
correct: she is editing her plan, not taking a loss.

`tower_cost` with an unknown name raises `ValueError: unknown tower: catapult`,
which is a usable teaching moment rather than a silent zero.

### Strategy phase (lesson 14+) — the game calls HER

```python
def choose_target(enemies):   # enemies: list of dicts, in tower range
    return enemies[0]         # return the one to shoot, or None to hold fire
```

Each enemy dict: `{"kind", "hp", "max_hp", "distance", "speed", "x", "y",
"armour", "flying"}`. `distance` is how far it still has to walk — the single
most useful number in the game, and the basis of the "target the leader"
strategy.

### Class phase (lesson 19+)

```python
class MyTower:
    cost = 60
    range = 3.0
    def fire(self, enemies):
        return enemies[0]      # same contract as choose_target
```

Registered with `register_tower("mine", MyTower)`, then placed like any other.

## Simulation model

**Deterministic, headless, then replayed.** The battle is simulated to
completion *before* anything is drawn:

1. Her code runs once (normal async Skulpt run). `place_tower` calls are recorded.
2. Any `choose_target` / tower class is read out of the finished module.
3. The battle runs headless in a fixed-timestep loop (10 ticks per second),
   calling her Python synchronously at decision points.
4. Every tick is recorded as a snapshot; the outcome is known immediately.
5. The renderer animates the recorded snapshots, interpolating between them.

This buys a great deal:

- **The checker never has to animate.** Verdicts are instant.
- **`verify-python.mjs` can assert a lesson's solution actually wins its battle**,
  headless in Node — the strongest guarantee in the project.
- Replay, pause, fast-forward and scrubbing are free.
- No Python runs inside the render loop, so the frame rate cannot be hurt by her
  code, and an infinite loop in her strategy function is caught by the exec limit
  before a single frame is drawn.

**Randomness is seeded** (mulberry32, seed per level) so a battle plays the same
way every time. She can reason about it; we can verify it.

### Rules

- Enemies walk the path at their speed toward the camp gate.
- A tower fires every `1 / rate` seconds at a target within `range` (Euclidean,
  in grid cells).
- With no `choose_target`, towers default to targeting the enemy furthest along
  the path — a sensible default she later learns to beat.
- An enemy reaching the gate costs 1 camp HP and disappears.
- **Win**: all waves cleared with camp HP above zero. **Lose**: camp HP hits zero.
- Losing costs nothing. She can rerun forever. See `spec/02-game-design.md`.

## Concept → mechanic map, all twenty

This is the spine of the course. Each lesson's mechanic is chosen because it
*needs* that concept, not because it tolerates it.

| # | Python | Battle mechanic |
| --- | --- | --- |
| 1 | `print()`, strings, comments | Calling a function with arguments **is** placing a tower: `place_tower("archer", 2, 3)`. `print()` is the battle log. |
| 2 | variables, types | Name your positions and reuse them; gold is an `int`, tower range a `float`, tower kind a `str` |
| 3 | `input()`, f-strings | Pre-battle briefing from Chiron; a battle report she formats herself |
| 4 | arithmetic — **BOSS Minotaur** | The gold economy: `//` for how many towers you can afford, `%` for change, damage-per-second maths |
| 5 | booleans, comparisons | Threat assessment — mark which monsters are dangerous before deciding anything |
| 6 | `if`/`elif`/`else` | Pick the tower type that counters each monster type |
| 7 | `while` | Spend gold until it runs out; keep reinforcing while the wave holds |
| 8 | `for`, `range` — **BOSS Medusa** | Build a wall: `for i in range(5): place_tower("archer", i, 3)` |
| 9 | lists | The wave roster — read it, count it, check membership before building |
| 10 | list methods, slicing, `sorted` | Triage: sort the wave by distance, take the top slice, sum the incoming HP |
| 11 | dicts | The tower catalogue and monster bestiary — look up costs, weaknesses, armour |
| 12 | nested data — **BOSS Hydra** | The map itself is a list of lists; read it to find legal build spots. The Hydra splits, so the wave is a nested structure |
| 13 | functions | `def build_wall(row):` — one definition, called for three rows |
| 14 | `return`, scope | **The graduation**: she writes `choose_target` and the game starts calling her code every tick |
| 15 | `random`, `math` | `math.sqrt` for real range calculations; `random` for crits and a playable dice-duel side battle |
| 16 | recursion — **BOSS Labyrinth** | Chain lightning that jumps recursively to the next enemy, with a base case that stops it |
| 17 | strings | Decode the Great Prophecy to unlock a hidden tower; parse monster names for weaknesses |
| 18 | `try`/`except` | The battle raises when she targets a monster that just died; a losing defense she must debug with a method |
| 19 | classes | Define her own tower type; the game instantiates it and calls `fire()` |
| 20 | **CAPSTONE** | Defend Olympus against Kronos: her own tower classes, her own strategy, her own economy, across many waves |

Side quests reuse the same engine: FizzBuzz becomes an alternating tower pattern,
bubble sort becomes visibly reordering a firing queue.

## Level schema

Levels live in the lesson content file and replace the old `training` and `quest`
arrays. Everything learner-visible is still a `{he, en}` pair.

```js
levels: [
  {
    id: "L1",
    title: { he, en },
    brief: { he, en },
    optional: false,             // true = side quest, never blocks completion
    xp: 20, drachmas: 5,

    map: {
      cols: 12, rows: 8,
      path: [[0,4],[1,4],[2,4], … [11,4]],   // spawn → gate, in order
      rock: [[3,2]],                          // decorative / unbuildable
    },
    gold: 100,
    campHp: 10,
    allowed: ["archer"],          // tower kinds she may place in this level
    seed: 1,

    waves: [
      { delay: 0, enemies: [ { kind: "harpy", count: 3, gap: 1.2 } ] },
    ],

    starter: "place_tower(\"archer\", 2, 3)\n",
    solution: "…",
    hints: [ {he,en}, {he,en}, {he,en} ],    // still exactly three

    check: {
      kind: "battle",
      campHpAtLeast: 10,          // optional, default 1 (just survive)
      maxGoldSpent: 150,          // optional
      also: { kind: "source", mustInclude: ["for"], message: {he,en} },
    },
  },
]
```

`check.kind: "battle"` passes when the simulated battle is won and every declared
constraint holds. The `also` field reuses the existing `source` checker, which is
how a level says "yes, but you must do it with a loop".

### Three things every level must survive

`verify-python.mjs` enforces the first two automatically; the third is on you.

1. **The declared solution wins.**
2. **An empty program loses.** A level that can be beaten by writing nothing
   teaches nothing and she will click straight past it.
3. **A degenerate answer loses.** This one is easy to miss and it was a real
   near-miss here: on a level with a tanky leader and fragile followers, three
   thoughtful strategies (default, weakest-first, closest-to-camp) all lost while
   `return 0` won — by accident. If a guess passes, the level rewards guessing.
   When designing a lesson-14-or-later level, run the obvious degenerate
   strategies against it (`return 0`, `return enemies[0]`, `return None`) and
   confirm they fail.

## Rendering

Canvas 2D, one `<canvas>` per level, sized to its container and redrawn on
resize. Nothing is fetched.

- **No image files.** Terrain is drawn with paths and gradients; monsters and
  towers are emoji glyphs drawn with `fillText`, sized to the cell. This keeps
  the repo diffable and means no asset can fail to load.
- 60fps `requestAnimationFrame`, interpolating between the 10Hz simulation
  snapshots so movement is smooth without the simulation being frame-dependent.
- Controls: play/pause, restart, and speed (1× / 2× / 4×). She will want to
  watch a leak again — that is debugging. `view.seek()` exists for a scrubber if
  one is ever added; nothing renders it today.
- HUD above the canvas: wave counter, camp HP hearts, gold, and the outcome
  banner.
- `prefers-reduced-motion: reduce` jumps straight to the outcome and draws the
  final state rather than animating.
- The canvas is decorative for screen readers; the outcome is also written as
  text (`role="status"`), so the result is never colour- or animation-only.

## RTL

The canvas is **never mirrored**. A game board is a diagram, not prose: monsters
walk left-to-right in both languages, and grid coordinates read the same way in
Hebrew as in English. Mirroring it would make `place_tower("archer", 2, 3)`
disagree with what she sees, which is the same failure mode as flipping code.
The panels *around* the canvas follow the page direction as usual.
