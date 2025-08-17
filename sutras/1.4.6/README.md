# Sutra 1.4.6: ङिति ह्रस्वश्च

## Overview

**Sanskrit Text**: `ङिति ह्रस्वश्च`
**Transliteration**: `ṅiti hrasvaśca`
**Translation**: Before a case affix with an indicatory `ṅ` (`ṅit`), feminine words ending in short `i` and `u` are also optionally termed `nadī`.

## Purpose

This sūtra extends the `nadī` saṃjñā, making it optionally applicable to new categories of words under a specific condition. The `anuvṛtti` (continuation of rules) from previous sūtras is crucial here. The full meaning is:

Before a `ṅit` case-affix (one with `ṅ` as a marker), the `nadī` designation is optionally (`vā`) applied to:
1. Feminine nouns ending in short vowels (`hrasva`) `i` and `u`.
2. (by `ca` including the context of 1.4.4) Feminine nouns ending in `ī` and `ū` that are `iyaṅ`/`uvaṅ` sthāna (and are not `strī`).

## Implementation

### Function Signature
```javascript
function applySutra1_4_6(word, context) {
    // Implementation details
}
```

### Key Features
- Applies only when the following case affix is `ṅit`.
- Optionally extends `nadī` saṃjñā to short-vowel feminine nouns (`i`/`u`).
- Optionally extends `nadī` saṃjñā to `iyaṅ`/`uvaṅ` sthāna nouns (which were prohibited by 1.4.4).

### Dependencies
- **Sanskrit Utils**: A utility to check if an affix is `ṅit`.

## Usage Examples

### Basic Usage
```javascript
import { applySutra1_4_6 } from './index.js';

// Example 1: Short 'i' feminine noun before a ṅit affix (e.g., 'ṅe' - dative singular)
const result1 = applySutra1_4_6('mati', { gender: 'feminine', endsIn: 'i', nextAffixIsNit: true });
console.log(result1); // Expected: { applies: true, optional_sanjna: 'nadī' }

// Example 2: iyaṅ-sthāna noun before a ṅit affix
const result2 = applySutra1_4_6('śrī', { gender: 'feminine', isIyanUvanSthana: true, nextAffixIsNit: true });
console.log(result2); // Expected: { applies: true, optional_sanjna: 'nadī' }

// Example 3: Not before a ṅit affix
const result3 = applySutra1_4_6('mati', { gender: 'feminine', endsIn: 'i', nextAffixIsNit: false });
console.log(result3); // Expected: { applies: false }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**:
- **Positive cases**:
    - Short `i`/`u` feminine nouns (`mati`, `dhenu`) before `ṅit` affixes.
    - `iyaṅ`/`uvaṅ` sthāna nouns (`śrī`, `bhrū`) before `ṅit` affixes.
- **Negative cases**:
    - The same nouns before non-`ṅit` affixes.
    - The word `strī`.
    - Nouns that are already mandatorily `nadī` (e.g., `kumārī`).

### Running Tests
```bash
npm test sutras/1.4.6
```

## Technical Details

### Algorithm
1. Check if the `nextAffixIsNit` flag in the context is true.
2. If it is, check if the word is a feminine noun ending in short `i` or `u`.
3. OR, check if the word is a feminine `iyaṅ`/`uvaṅ` sthāna noun (and not `strī`).
4. If any of these conditions are met, the sūtra applies and makes the `nadī` saṃjñā optional.

### Performance
- **Time Complexity**: O(1).
- **Space Complexity**: O(1).

## Integration

### Related Sutras
- This rule builds upon the entire `nadī` saṃjñā context from 1.4.3, 1.4.4, and 1.4.5, adding another layer of optionality.

### Used By
- The `saṃjñā` processing logic.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.6

---

*Generated from template: SUTRA_README_TEMPLATE.md*
