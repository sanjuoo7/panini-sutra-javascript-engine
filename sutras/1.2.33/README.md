# Sutra 1.2.33: एकश्रुति दूरात् सम्बुद्धौ

## Overview
**Sanskrit Text**: एकश्रुति दूरात् सम्बुद्धौ  
**Transliteration**: ekaśruti dūrāt sambuddhau  
**Translation**: In a vocative uttered from a distance, the tone is monotone (ekashruti).

## Purpose
Defines a contextual prosodic override flattening normal accent distinctions for distant address in the vocative, producing a monotone delivery (ekashruti).

## Implementation
### Function Signature
```javascript
function sutra1233(text, context = {}, options = {}) => resultObject
```
### Key Features
- Distance + vocative condition evaluation
- Optional accent flattening (strip diacritics)
- Works with existing accent classification pipeline
- Multi-script tolerant (IAST / Devanagari)

### Dependencies
- **Prosody Utility**: applyEkashruti
- **Accent Utilities**: (indirectly) accent mark stripping

## Usage Examples
```javascript
import { sutra1233 } from './index.js';

sutra1233('á', { case: 'vocative', distanceCategory: 'far' });
// => { applies: true, transformed: 'a', ekashruti: true, ... }
```

## Test Coverage
See `index.test.js` – positive, negative, edge, integration readiness.

## Technical Details
### Algorithm
1. Check vocative (context.case === 'vocative')
2. Determine distance: distanceCategory==='far' or distanceMeters >= threshold (default 10)
3. If true → applies; optionally strip accent markers

### Edge Cases
- Unaccented input returns unchanged
- flatten:false preserves original marks while still signaling ekashruti

## Integration
- Future sutra 1.2.34 will introduce exceptions; design allows flags to be added without breaking API

## References
- Traditional phonetic treatment of distant vocative monotony
- Panini accent system sutras 1.2.29–1.2.33

---
*Generated from template*
