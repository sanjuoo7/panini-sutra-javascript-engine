# Sutra 1.3.91: द्युद्भ्यो लुङि

## Overview

**Sanskrit Text**: `द्युद्भ्यो लुङि`  
**Transliteration**: dayudabhyo luṅi  
**Translation**: After verbs like dyut (to shine), Parasmaipada is optionally used when लुङ् (Aorist) follows.

## Implementation

```javascript
function sutra1391(word, context = {}) { /* ... */ }
```

- Checks root membership (dyut-class; minimal here) and lakāra = luṅ
- Optional designation

## Tests

Three tests: dyut + luṅ positive; other lakāra negative; other root negative.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
