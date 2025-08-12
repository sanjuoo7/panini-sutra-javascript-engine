# 1.2.39

Sanskrit: स्वरितात् संहितायामनुदात्तानाम्

## Translation
Following a svarita vowel, contiguous anudātta vowels in close junction may be rendered monotone locally.

## Purpose
Local assimilation producing a `local-monotone` option (not global ekashruti) unless blocked by subrahmaṇyā domain.

## Behavior
- Scans for svarita + ≥1 anudātta run.
- Adds local-monotone variant with accent neutralization over run span.
- Does not remove other options.

## Example
| Input | Context | Modes Include |
|-------|---------|---------------|
| âàà | {} | accented, local-monotone |

## Tests
See index.test.js.
