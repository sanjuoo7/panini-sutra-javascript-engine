# Sutra 1.3.39: उपपराभ्याम्

## Overview

**Sanskrit Text**: `उपपराभ्याम्`  
**Transliteration**: upaparābhyām  
**Translation**: After the verb क्रम्, when preceded by उप or पर and used in the senses specified in 1.3.38, the Ātmanepada is used.

## Purpose

Narrowly prescribes Ātmanepada for क्रम् with prefixes उप or पर (including परि/upa, pari) when the semantic senses are continuity/creation/development.

## Implementation

### Function Signature
```javascript
function sutra1339(word, context = {}) { /* ... */ }
```

### Key Features
- क्रम् detection
- Prefix detection (उप-/upa-, परि-/pari-)
- Semantic validation per 1.3.38

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`

## Usage Examples

```javascript
import { sutra1339 } from './index.js';

sutra1339('उपक्रमते', { semanticContext: 'development' }); // applies: true
sutra1339('परिक्रमते', { semanticContext: 'continuity' }); // applies: true
sutra1339('क्रमते', { semanticContext: 'development' }); // applies: false (missing prefix)
```

## Test Coverage

- 3 tests (upa, pari positive; negative without prefix)

## Technical Details

- O(n) string checks; constant space

## Integration

- Related: 1.3.38 (senses) and 1.3.40–41 (other prefixes/contexts)

## References

- Traditional gloss for 1.3.39

---

*Generated from template: SUTRA_README_TEMPLATE.md*
