## Sutra 1.2.45: अर्थवदधातुरप्रत्ययः प्रातिपदिकम्

## Overview
**Sanskrit Text**: `अर्थवदधातुरप्रत्ययः प्रातिपदिकम्`  
**Transliteration**: arthavad adhātur apratyayaḥ prātipadikam  
**Translation**: “A meaningful (form), not a root and not an affix, is a prātipadika.”

## Purpose
Introduces the foundational definition of a base prātipadika—filtering out roots and pure affixes while retaining semantically meaningful nominal bases leveraged by later prātipadika extension (1.2.46).

## Implementation

### Function Signature
```javascript
import { applySutra1_2_45 } from './index.js';
const result = applySutra1_2_45(form, context = {});
```

### Key Features
- Root exclusion via lexical list.
- Affix exclusion via combined affix inventory.
- Lightweight semantic heuristic (`length > 1` or explicit context flag).

### Dependencies
- **Sanskrit Utils**: `pratipadika-classification.isPratipadikaBase`

## Usage Examples
```javascript
applySutra1_2_45('deva'); // { applies:true, isPratipadikaBase:true }
applySutra1_2_45('a');    // likely false (too short / non-meaningful)
```

## Test Coverage
**Test File**: `index.test.js`  
**Test Cases**: 2 tests (valid nominal base, invalid input)

## Notes
Extended sources (kṛt, taddhita, compounds) handled by 1.2.46.
