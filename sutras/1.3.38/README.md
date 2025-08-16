# Sutra 1.3.38: वृत्तिसर्गतायनेषु क्रमः

## Overview

**Sanskrit Text**: `वृत्तिसर्गतायनेषु क्रमः`  
**Transliteration**: vṛttisargatāyaneṣu kramaḥ  
**Translation**: After the verb क्रम्, when used in the senses of continuity, energy/production, or development/progression, the Ātmanepada is used.

## Purpose

Designates Ātmanepada for the root क्रम् in specific semantic domains: वृत्ति (continuity), सर्ग (creation/energy), आयन (development/progression).

## Implementation

### Function Signature
```javascript
function sutra1338(word, context = {}) { /* ... */ }
```

### Key Features
- Root detection for क्रम् family (including prefixed forms)
- Semantic context analysis via context.meaning/semanticContext
- Multi-script support

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`

## Usage Examples

```javascript
import { sutra1338 } from './index.js';

sutra1338('क्रमते', { semanticContext: 'continuity' }); // applies: true
sutra1338('vikramate', { semanticContext: 'sarga energy' }); // applies: true
sutra1338('क्रमते', { semanticContext: 'attack' }); // applies: false
```

## Test Coverage

- 4 tests covering the three semantic fields and a negative case

## Technical Details

- O(n) string checks; constant space
- Inclusive matching for common glosses of the three domains

## Integration

- Related: 1.3.39–1.3.41 refine prefixes for क्रम् in sub-senses

## References

- Traditional gloss for 1.3.38

---

*Generated from template: SUTRA_README_TEMPLATE.md*
