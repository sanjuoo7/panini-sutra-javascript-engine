# Sutra 1.3.92: वृद्भ्यः स्यसनोः

## Overview

**Sanskrit Text**: `वृद्भ्यः स्यसनोः`  
**Transliteration**: vṛdabhyaḥ sayasanoḥ  
**Translation**: After vṛt-class verbs, Parasmaipada is optionally used when affixes sy (future/conditional) or san (desiderative) follow.

## Implementation

```javascript
function sutra1392(word, context = {}) { /* ... */ }
```

- Checks vṛt-class membership (minimal set)
- Checks affix ∈ {sy/स्य, san/सन्, future/conditional/desiderative}
- Optional designation

## Tests

Three tests covering sy, san, and a negative root.

## Examples

- `वर्त्स्यति` with affix=sy → applies optionally
- desiderative of वृत्त with affix=सन् → applies optionally

---

*Generated from template: SUTRA_README_TEMPLATE.md*
