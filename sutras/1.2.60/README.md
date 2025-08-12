# Sutra 1.2.60: फल्गुनीप्रोष्ठपदानां च नक्षत्रे

## Overview

**Sanskrit Text**: फल्गुनीप्रोष्ठपदानां च नक्षत्रे  
**Transliteration**: phalgunīproṣṭhapadānāṃ ca nakṣatre  
**Translation**: (In the semantic domain of) the lunar mansions, the dual forms Phalgunī and Proṣṭhapadā optionally convey a plural (collective) sense.

## Purpose

Saṃjñā / semantic extension sutra: licenses interpreting the lexical dual forms referring to the two components of the Phalgunī and Proṣṭhapadā pairs as semantically plural (covering all constituent stars in that mansion pair) within the nakṣatra domain, without morphologically altering the surface dual form.

## Implementation

### Function Signature
```javascript
export function sutra_1_2_60(term, context = {}) → ResultObject
```

### Key Features
- Domain gating: applies only when `context.domain === 'nakshatra'` or `semanticCategory === 'nakshatra'`.
- Lexical detection: normalized match against star lexical sets (IAST + Devanagari variants) for Phalgunī / Proṣṭhapadā.
- Non‑destructive: returns metadata (`semanticPlural: true`) – does not change form.

### Dependencies
- **Sanskrit Utils**: `number-determination.js` (shared star group detection + normalization)
- **Shared Functions**: `applySutra1_2_60` re-exported wrapper

## Usage Examples

### Basic Usage
```javascript
import { sutra_1_2_60 } from './index.js';

const res1 = sutra_1_2_60('phalgunī', { domain: 'nakshatra' });
// res1.applied === true; res1.semanticPlural === true

const res2 = sutra_1_2_60('प्रोष्ठपदा', { semanticCategory: 'nakshatra' });
// Applied with semantic plural sense
```

### Negative Usage
```javascript
sutra_1_2_60('phalgunī', {});           // Not applied (no nakshatra domain)
{ /* Not applied (not target stars) */ }
sutra_1_2_60('devau', { domain:'nakshatra' });
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 6 tests covering:
- Positive IAST & Devanagari detection
- Domain gating failure
- Non‑target lexical rejection
- Whitespace normalization
- Graceful invalid input handling

## Technical Details

### Algorithm
1. Validate string input.
2. Check nakṣatra domain flag.
3. Normalize term (trim, lowercase) and map to star group set.
4. If group ∈ {PHALGUNI, PROSTHAPADA}, mark `applied`, set `numberOptions:['dual']`, add `semanticPlural:true`.

### Performance
- Time Complexity: O(k) with small constant (iterate limited star sets)
- Space Complexity: O(1)

### Edge Cases
- Mixed casing / surrounding whitespace → normalized.
- Non‑string or empty → returns `applied:false` with explanation.
- Mixed script safe (if future variants added) due to normalization pass.

## Integration

### Related Sutras
- 1.2.58–1.2.59: Earlier optional number semantics foundation.
- 1.2.61–1.2.62: Subsequent optional singular (chandas) rules (different star pairs).
- 1.2.63: Enforced dual overriding plural in Tiṣya+Punarvasū dvandva.

### Used By
- Upstream semantic number interpretation pipelines consuming `semanticPlural` flag.

## References

- Pāṇini Aṣṭādhyāyī 1.2.60 traditional commentaries (semantic plurality of dual astral names)
- Internal utility design pattern: Astral Semantic Number Overrides (Strategy Pattern J)

---
*Generated from template: SUTRA_README_TEMPLATE.md*
