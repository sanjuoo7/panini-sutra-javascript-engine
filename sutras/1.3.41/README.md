# Sutra 1.3.41: वेः पादविहरणे

## Overview

**Sanskrit Text**: `वेः पादविहरणे`  
**Transliteration**: veḥ pādaviharaṇe  
**Translation**: After the verb क्रम्, when preceded by वि and used in the sense of placing of footsteps (walking/striding), the Ātmanepada is used.

## Purpose

Specifies Ātmanepada for the root क्रम् with वि prefix in the walking/footstep-placement sense.

## Implementation

### Function Signature
```javascript
function sutra1341(word, context = {}) { /* ... */ }
```

### Key Features
- क्रम् detection
- vi- prefix detection
- Semantic analysis for pādaviharaṇa

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`

## Usage Examples

```javascript
import { sutra1341 } from './index.js';

sutra1341('विक्रमते', { semanticContext: 'walking placing footsteps' }); // applies: true
sutra1341('क्रमते', { semanticContext: 'walking' }); // applies: false (missing vi-)
```

## Test Coverage

- 3 tests (positive with vi + pādaviharaṇa; negatives)

## Technical Details

- O(n) string checks; constant space

## Integration

- Related: 1.3.38–1.3.40

## References

- Traditional gloss for 1.3.41

---

*Generated from template: SUTRA_README_TEMPLATE.md*
