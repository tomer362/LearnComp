# 03 — Bilingual Hebrew/English and RTL

## The model

Two languages, one page, no reload. Hebrew is the default and the primary
authoring language; English is a complete equal translation, not a fallback.

- **UI chrome** (buttons, labels, section titles) → keys in `LC.i18n.strings`,
  applied to elements carrying `data-i18n="key"`.
- **Lesson content** → every string in a content file is a `{he, en}` pair.
  `LC.t(obj)` returns the current language's value.

Switching language:

1. sets `document.documentElement.lang` to `he`/`en`
2. sets `document.documentElement.dir` to `rtl`/`ltr`
3. re-renders text nodes in place — **no reload, no scroll jump**
4. persists to the save file

## YOU MUST keep code left-to-right

This is the rule that breaks the product when violated. Hebrew is RTL; Python is
not. If code is allowed to inherit RTL, `print("Hello")` renders with its
parentheses visually reversed and she will type what she sees and get a
`SyntaxError` she cannot possibly diagnose.

Therefore:

```css
.code, .editor, .output, code, pre, kbd {
  direction: ltr;
  text-align: left;
  unicode-bidi: isolate;
}
```

- The **editor** is always `dir="ltr"`, even in Hebrew mode.
- The **output panel** is always `dir="ltr"`.
- **Error messages** are always `dir="ltr"` (they are English Python text). The
  Hebrew *explanation beside them* is RTL — they are two separate elements.

### Inline code inside Hebrew prose

Wrap it. Always:

```html
<bdi dir="ltr" class="c">print("שלום")</bdi>
```

Without `<bdi>`, an inline `foo()` at the end of a Hebrew sentence has its
parentheses flipped by the bidi algorithm. This is the single most common bug in
this codebase. The authoring helper `LC.code("print()")` emits the correct
markup — use it rather than hand-writing spans.

### Numbers and punctuation

Hebrew text containing a Latin term or a number followed by punctuation can
reorder unexpectedly. When a Hebrew sentence ends with an English word or a
number, isolate it with `<bdi>`. Prefer rewriting the sentence so it does not end
on a Latin token.

**Any number paired with a Latin unit or sign needs `dir="ltr"`.** This bit us
twice in the HUD and the exercise rewards: `+25 XP · 8 🪙` renders as
`8 · XP 25+` inside an RTL container, and `0 XP` renders as `XP 0`. The string is
correct; the container direction reverses the run. Every such chip — XP counts,
drachmas, ambrosia, level numbers, scores — carries `dir="ltr"`. When you add a
new stat readout, set it there too, and check it in Hebrew before shipping.

## Layout: logical properties only

One stylesheet serves both directions. **Never** use `left`, `right`,
`margin-left`, `padding-right`, `border-left`, or `text-align: right`.

| Instead of | Use |
| --- | --- |
| `margin-left` | `margin-inline-start` |
| `padding-right` | `padding-inline-end` |
| `left: 0` | `inset-inline-start: 0` |
| `text-align: left` | `text-align: start` |
| `border-left` | `border-inline-start` |

Flexbox and grid already follow `dir`, so `flex-direction: row` reverses
correctly on its own — do not "fix" it with `row-reverse`.

**Icons and arrows do not auto-flip.** A "next lesson" arrow must point left in
Hebrew and right in English. Use a CSS transform bound to `[dir="rtl"]`, or pick
direction-neutral icons. Progress bars fill from the inline start, which is
correct in both directions for free.

## Typography

No webfonts — there is no network. System stack:

```css
--font-ui: "Assistant", "Rubik", "Heebo", "Segoe UI", "Arial Hebrew",
           "David", system-ui, sans-serif;
--font-code: ui-monospace, "SF Mono", "Cascadia Mono", Consolas,
             "Liberation Mono", monospace;
```

Hebrew has no capital letters and no italics tradition — **never** use
`text-transform: uppercase` or `font-style: italic` for emphasis in Hebrew.
Use weight, colour, or a background instead. `letter-spacing` damages Hebrew
rendering; do not apply it to body text.

Hebrew glyphs sit slightly larger than Latin at the same size; body text is
17–18px rather than 16px, and line-height is 1.7 for Hebrew paragraphs.

## Writing the Hebrew

- Modern, spoken Hebrew. Not academic, not translated-sounding.
- Address her directly in **feminine second person** (`את`, `תכתבי`, `נסי`).
  This is a course for one specific girl; generic masculine would be wrong.
- **Keep Python keywords in English** and explain them:
  `הפקודה <bdi>print</bdi> מדפיסה טקסט למסך`.
- Established Hebrew CS terms are given **once** with the English beside them,
  then the English term is used, because that is what she will meet everywhere
  else. Glossary lives in `06-authoring-guide.md`.
- Do not use nikud.

## Testing both directions

Every lesson must be checked in both languages before it ships:

- toggle mid-lesson — text swaps, scroll position holds, nothing reflows badly
- the editor and output stay LTR in Hebrew mode
- no horizontal scrollbar at 390px in either direction
- inline code inside Hebrew sentences reads correctly (parentheses not flipped)
