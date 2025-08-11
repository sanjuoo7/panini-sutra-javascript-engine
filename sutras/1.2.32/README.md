# Sutra 1.2.32: तस्यादित उदात्तमर्धह्रस्वम्

## Overview
**Sanskrit Text**: तस्यादित उदात्तमर्धह्रस्वम्  
**Transliteration**: tasyādita udāttam ardha-hrasvam  
**Translation**: Of the svarita, the first (portion) is udātta to the extent of half a short unit.

## Purpose
Specifies the internal prosodic segmentation of a svarita vowel (defined previously by 1.2.31) into an initial udātta rise spanning half a short time-unit, followed by the falling portion (implicit anudātta). This supports downstream prosody-aware logic and chanting simulation.

## Implementation
### Function Signature
```javascript
function sutra1232(vowel, context = {}) => decompositionObject
```
### Key Features
- Validates that input is svarita (uses accent-analysis utilities)
- Computes absolute temporal segmentation using fixed 0.5 unit udātta onset
- Supports hrasva, dīrgha, and inherently long vowels
- Unicode normalization tolerant (precomposed & combining forms)

### Dependencies
- **Accent Utilities**: analyzeVowelAccent, ACCENT_TYPES
- **Prosody Utility**: decomposeSvarita (accent-prosody-analysis)

## Usage Examples
```javascript
import { sutra1232 } from './index.js';

console.log(sutra1232('â'));
// { applies: true, segments: [ { role:'udātta-initial', units:0.5 }, { role:'anudātta-fall', units:0.5 } ], ... }
```

## Test Coverage
See `index.test.js` for positive, negative, edge, and integration tests.

## Technical Details
### Algorithm
1. Accent classification → verify svarita
2. Determine base vowel duration units (1 or 2)
3. Fixed initial segment: 0.5 unit udātta
4. Remainder assigned anudātta-fall

### Edge Cases
- Non-svarita input → applies false
- Plain vowel in strict mode → not applied
- Combining diacritic forms normalized

## Integration
- Used by future chanting or pitch-contour modeling modules
- Forms basis for potential pitch synthesis

## References
- Panini 1.2.31–1.2.33 for accent trilogy context
- Traditional prosody commentaries for svarita internal contour

---
*Generated from template*
