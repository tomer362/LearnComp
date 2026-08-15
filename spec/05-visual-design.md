# 05 — Visual design

## Feel

Greek myth by way of an adventure game: sun-bleached marble, deep Aegean water,
celestial bronze, ink on old paper. Warm, not grim. It should look like something
made *for* her, not a corporate learning platform — but it must never get in the
way of reading code.

Two zones with different rules:

- **Story and teaching zones** may be decorative — textures, gradients, serif
  display type, iconography.
- **Code, editor and output zones are quiet.** High contrast, monospace, calm
  background, no decoration. This is where she works.

## Tokens

Defined once in `:root` in `theme.css`. Nothing hard-codes a hex value.

```css
--sea-deep:    #0b2545;   /* page background, deepest */
--sea:         #13315c;   /* panels */
--sea-light:   #1d4e89;   /* raised panels, hover */
--marble:      #f4f1ea;   /* primary text on dark, paper panels */
--marble-dim:  #cfc9bd;   /* secondary text */
--bronze:      #c98b3a;   /* primary accent, borders, XP */
--bronze-lit:  #e8b563;   /* highlight, glow */
--gold:        #ffd166;   /* drachmas, rewards, level-up */
--laurel:      #4c9a72;   /* success */
--blood:       #c1483f;   /* error, boss health */
--ink:         #22303f;   /* code panel background */
--cabin:       var(--bronze);  /* overridden per cabin at runtime */
```

Cabin accent is applied by setting `--cabin` on `<html>` from the save file, so
her godly parent tints buttons, borders and the XP bar without any new CSS.

Dark by default (it is a night-at-camp feel and it is easier on the eyes for long
sessions). No light-mode toggle in v1 — it is one more thing to maintain and
nobody asked for it.

## Type

```css
--font-ui:      "Assistant", "Rubik", "Heebo", "Segoe UI", "Arial Hebrew",
                "David", system-ui, sans-serif;
--font-display: "Assistant", "Rubik", Georgia, serif;   /* headings only */
--font-code:    ui-monospace, "SF Mono", "Cascadia Mono", Consolas,
                "Liberation Mono", monospace;
```

No webfonts — there is no network. Body text 17px (Hebrew reads larger),
line-height 1.7 in Hebrew, 1.6 in English. Headings scale 1.25.

See `03-i18n-and-rtl.md`: no `uppercase`, no `italic`, no `letter-spacing` on
Hebrew.

## Components

- **Chiron card** — teaching prose. Dark panel, left/inline-start bronze border,
  small centaur mark.
- **Code block** — `--ink` background, bronze top rule, monospace, `dir=ltr`,
  Run button in the corner, output slides in beneath.
- **Editor** — textarea over a line-number gutter, `--ink` background, Run and
  Reset buttons, always `dir=ltr`. No syntax highlighting in v1: doing it well
  needs a real editor library, and doing it badly is worse than none.
- **Output panel** — black-ish, monospace, `dir=ltr`. Errors in `--blood` with
  the real English text, and the friendly Hebrew explanation in a separate
  block beneath.
- **Exercise card** — brief, editor, Check button, hint button showing ambrosia
  cost, state ring (neutral / correct / not-yet).
- **Boss panel** — monster art, health bar in `--blood`, one segment per test
  case, segments drain as cases pass.
- **HUD** — sticky header: back-to-map, lesson title, XP bar, drachmas, ambrosia,
  language toggle.
- **Toast** — bottom-inline-start, for XP, items, achievements. Auto-dismiss,
  never blocking, never more than one at a time.

## Art

**No binary image files.** All art is inline SVG or emoji, so the repo stays
diffable and nothing can fail to load. Emoji carry the gods, items and monsters
(🔱 ⚡ 🦉 ⚔️ 📿 🍯 🪙 🐂 🐍). SVG is used for the quest-map path, the XP bar, the
laurel frames and the health bar.

## Motion

Restrained and quick. XP bar fills over 400ms; toasts slide 200ms; level-up gets
one 800ms glow; boss health drains over 500ms per segment. Nothing loops
forever, nothing blocks input, nothing takes longer than a second.

**Honour `prefers-reduced-motion: reduce`** — drop to instant state changes.
Never animate anything while she is typing in the editor.

## Responsive

Single column throughout — no sidebar to collapse. Breakpoint at 720px: HUD
condenses to icons, quest map switches from a winding path to a vertical list,
editor and output stack instead of sitting side by side.

Must not scroll horizontally at 390px in either direction. Tap targets ≥ 44px.
The Run button stays reachable without scrolling past the editor on a phone.
