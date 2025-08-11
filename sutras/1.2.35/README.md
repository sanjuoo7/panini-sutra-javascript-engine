# 1.2.35

Sanskrit: (vaṣaṭ raised option) — Adds an optional raised/udātta emphasis for the exclamation vaṣaṭ.

## Translation
For the sacrificial exclamation vaṣaṭ an optionally raised voice (udātta) form is available.

## Function Purpose
Augments prosody options for the lexeme `vaṣaṭ`, adding a raised variant while retaining base accent or monotone options from neighboring rules if present.

## Dependencies
- accent-prosody-analysis.aggregateProsodyOptions

## Behavior Summary
- Detects vaṣaṭ forms (IAST & Devanagari variants).
- Adds `raised` mode option with source tag `1.2.35`.
- Does not affect unrelated words.

## Examples
| Input | Result Modes |
|-------|--------------|
| vaṣaṭ | accented, raised (maybe monotone depending on context) |
| agnim | accented only (unless other contexts)

## Return Shape
Same as 1.2.34.

## Tests
index.test.js validates presence/absence of raised option.
