# Sutra 1.3.40: आङ उद्गमने

## Overview

**Sanskrit Text**: `आङ उद्गमने`  
**Transliteration**: āṅ udgamane  
**Translation**: After the verb क्रम्, when preceded by आङ् and used in the sense of the rising of a luminary, the Ātmanepada is used.

## Purpose

Specializes the क्रम् rule for the āṅ- prefix in the astronomical/phenomenological sense (udgamana: sunrise, moonrise, etc.).

## Implementation

### Function Signature
```javascript
function sutra1340(word, context = {}) { /* ... */ }
```

### Key Features
- क्रम् detection
- āṅ prefix detection
- Semantic analysis for udgamana (rising of luminary)

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`

## Usage Examples

```javascript
import { sutra1340 } from './index.js';

sutra1340('आक्रमते', { semanticContext: 'rising of a luminary' }); // applies: true
sutra1340('क्रमते', { semanticContext: 'rising' }); // applies: false (missing āṅ)
```

## Test Coverage

- 3 tests (positive with āṅ + udgamana; negatives)

## Technical Details

- O(n) string checks; constant space

## Integration

- Related: 1.3.38–1.3.41

## References

- Traditional gloss for 1.3.40

---

*Generated from template: SUTRA_README_TEMPLATE.md*
