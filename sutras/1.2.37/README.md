# 1.2.37

Sanskrit: न सुब्रह्मण्यायां स्वरितस्य तूदात्तः

## Translation
In the Subrahmaṇyā hymns there is no monotone; vowels that would have been svarita take the udātta instead.

## Purpose
Domain-level override blocking ekashruti and converting svarita vowels to udātta.

## Dependencies
- accent-prosody-analysis.aggregateProsodyOptions
- accent-domain-rules.integrateDomainProsody

## Behavior
- Removes monotone options.
- Adds udātta-replaced form when svarita present.
- Precedes lexical overrides (1.2.38).

## Example
| Input | Context | Modes |
|-------|---------|-------|
| â | {subrahmanya:true} | accented, udatta-replaced |

## Tests
See index.test.js for coverage.
