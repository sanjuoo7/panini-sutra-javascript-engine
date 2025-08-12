# Sutra 1.2.63: तिष्यपुनर्वस्वोर्नक्षत्रद्वंद्वे बहुवचनस्य

## Overview

**Sanskrit Text**: तिष्यपुनर्वस्वोर्नक्षत्रद्वंद्वे बहुवचनस्य  
**Transliteration**: tiṣyapunarvasvor nakṣatra-dvandve bahuvacanasya  
**Translation**: In a dvandva (coordinative) compound consisting of Tiṣya and Punarvasū in the nakṣatra sense, the plural (interpretation) is replaced by (or must be) the dual.

## Purpose

Niyama / enforcement sutra: Removes plural number freedom for the Tiṣya+Punarvasū compound—mandating dual interpretation (and replacing surface plural if provided). Overrides earlier optionality granted by class/pronoun or astral rules when this specific dvandva is present.

## Implementation

### Function Signature
```javascript
export function sutra_1_2_63(compoundOrString, context = {}) → ResultObject
```

### Key Features
- Accepts either: structured compound object `{ members:[{lemma, number?}, ...] }` or a simple string (split on + / whitespace).
- Detects presence of BOTH Tiṣya and Punarvasū (order-insensitive; multi-script).
- Enforces dual: sets `applied:true`; if plural detected (context or member), flags `replaced:true` & `originalNumber:'plural'`.
- Non-destructive to member lemmas—returns enforcement metadata only.

### Dependencies
- **Sanskrit Utils**: `number-determination.js` (`applySutra1_2_63`, star group detection, compound parsing helper).

## Usage Examples
```javascript
import { sutra_1_2_63 } from './index.js';

// Replace plural interpretation
const c1 = { type:'dvandva', members:[{ lemma:'tiṣya', number:'plural' }, { lemma:'punarvasu', number:'plural' }] };
const r1 = sutra_1_2_63(c1, { domain:'nakshatra' });
// r1.applied === true; r1.replaced === true; r1.originalNumber === 'plural'

// String input, plural via context
const r2 = sutra_1_2_63('punarvasu+tiṣya', { domain:'nakshatra', number:'plural' });
// applied true, replaced true

// Already dual (no replacement)
const c2 = { members:[{ lemma:'punarvasu', number:'dual' }, { lemma:'tiṣya', number:'dual' }] };
const r3 = sutra_1_2_63(c2, { domain:'nakshatra' });
```

## Test Coverage
**Test File**: `index.test.js`  
**Test Cases**: 7 (plural replacement, already dual, string order variations, domain failure, missing star, invalid input)

## Technical Details
### Algorithm
1. Normalize / parse compound.
2. Confirm nakṣatra domain.
3. Check membership sets for both target stars.
4. If plural present (context or member numbers), mark replacement; else mark enforcement only.

### Edge Cases
- Order-insensitive detection.
- Graceful handling of null / malformed compound.
- Works with mixed input representation styles.

## Integration
- Overrides optional singular / plural semantics from 1.2.58–1.2.62 when specific dvandva pattern appears.

## References
- Traditional dvandva enforcement discussions: dual required when exactly two specified members.
- Strategy Pattern J (Astral Semantic Number Overrides) – enforcement subcase.

---
*Generated from template: SUTRA_README_TEMPLATE.md*
