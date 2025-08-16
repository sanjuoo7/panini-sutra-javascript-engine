# Sutra 1.3.37: कर्तृस्थे चाशरीरे कर्मणि

## Overview

**Sanskrit Text**: `कर्तृस्थे चाशरीरे कर्मणि`  
**Transliteration**: kartṛsthe cāśarīre karmaṇi  
**Translation**: After the verb नी, when it governs an incorporeal object located in the agent, the Ātmanepada is used.

## Purpose

Prescribes Ātmanepada for the root नी (nī) when the object is incorporeal (aśarīra) and resides in the agent (kartṛ-stha), refining ātmanepada designation by semantic object type and locus.

## Implementation

### Function Signature
```javascript
function sutra1337(word, context = {}) { /* ... */ }
```

### Key Features
- Detects नी/nay root forms in both scripts
- Interprets object-type and locus flags from context
- Confidence scoring and detailed diagnostics

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`

## Usage Examples

```javascript
import { sutra1337 } from './index.js';

sutra1337('नयते', { objectType: 'aśarīra', kartrstha: true }); // applies: true
sutra1337('nayate', { objectType: 'incorporeal', kartrstha: true }); // applies: true
sutra1337('नयति', { objectType: 'body', kartrstha: true }); // applies: false
```

## Test Coverage

- 4 tests covering positive, negative, and script cases

## Technical Details

- O(n) string checks; constant space
- Handles common नी/nay morphological surface forms

## Integration

- Related: 1.3.36 (नी in enumerated contexts)

## References

- Kāśikā and traditional glosses for 1.3.37

---

*Generated from template: SUTRA_README_TEMPLATE.md*
