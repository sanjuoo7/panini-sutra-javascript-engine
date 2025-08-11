# 1.2.36

Sanskrit: छन्दसि वा एकश्रुतिः — Optional monotone (ekashruti) in metrical (chandas) recitation.

## Translation
Within metrical recitation (chandas) a monotone delivery is optional.

## Function Purpose
Supplies optional monotone mode alongside base accent for any word when `chandas` context is active.

## Dependencies
- accent-prosody-analysis.aggregateProsodyOptions

## Behavior Summary
- Marks chandas context as optional monotone source.
- Returns options list; primaryDecision becomes `options`.

## Examples
| Input | Context | Modes |
|-------|---------|-------|
| agnim | {chandas:true} | accented, monotone |

## Return Shape
Same schema as 1.2.34.

## Tests
index.test.js ensures option creation and applied sutra tagging.
