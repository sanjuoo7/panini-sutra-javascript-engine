# Sutra 1.1.70: तपरस्तत्कालस्य

## Overview

**Sanskrit Text**: `तपरस्तत्कालस्य`
**Transliteration**: `taparas tatkālasya`
**Translation**: "The letter which has त् (t) after or before it, besides referring to its own form, refers to those homogeneous letters which have the same prosodial length or time."

## Purpose

This sutra is a `savarṇagrāhakasūtram` (a rule about homogeneous letters) that acts as an exception and a clarification to Sutra 1.1.69 (`aṇudit savarṇasya cāpratyayaḥ`). It specifies the behavior of a vowel that is immediately followed by the letter `त्` (t). This is known as `tapara-karaṇa`.

The rule states that a vowel made `tapara` (followed by `t`) refers only to its `savarṇa` (homogeneous) variations that have the **same length** (`kāla`).

-   Sutra 1.1.69 says `a` can refer to both short `a` and long `ā`.
-   This sutra (1.1.70) says that if we see `at` in a rule, it refers *only* to the short `a`.
-   Similarly, `āt` refers *only* to the long `ā`.

This allows Pāṇini to be precise about vowel length when needed.

## Implementation

### Function Signature
```javascript
/**
 * Applies the 'tapara' rule to a phoneme.
 *
 * @param {string} taparaPhoneme - The phoneme with the 't' marker (e.g., 'at', 'āt').
 * @returns {string[]} An array containing only the phoneme of the specified length.
 */
export function applyTapara(taparaPhoneme)
```

### Key Features
- Restricts a vowel to representing only itself, effectively filtering the `savarṇa` list from 1.1.69.
- Correctly identifies the vowel and its length from a `tapara` term (e.g., `at`, `īt`).

### Dependencies
- **sanskrit-utils/constants.js**: Uses `SanskritVowels` to identify vowels and their lengths.

## Usage Examples

### Basic Usage
```javascript
import { applyTapara } from './index.js';
import { getSavarna } from '../1.1.69/index.js';

// Without tapara-karaṇa, 'a' represents both 'a' and 'ā'
const savarnaOfA = getSavarna('a'); // ['a', 'ā']

// With tapara-karaṇa, 'at' represents only 'a'
const meaningOfAt = applyTapara('at'); // ['a']

// With tapara-karaṇa, 'āt' represents only 'ā'
const meaningOfAat = applyTapara('āt'); // ['ā']
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 8 tests covering:
- Correct restriction for short vowels (`at`, `it`).
- Correct restriction for long vowels (`āt`, `īt`).
- Handling of diphthongs (`et`, `ait`).
- Cases where the rule does not apply (not ending in `t`, not a vowel).
- Edge cases for invalid input.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.70

# Run with coverage
npm test sutras/1.1.70 -- --coverage
```

## Technical Details

### Algorithm
1.  The function checks if the input string ends with `t`.
2.  If it does, it extracts the vowel part that precedes the `t`.
3.  It determines the length of the extracted vowel (short or long).
4.  It returns an array containing only the extracted vowel, effectively restricting its meaning to its own form and length.
5.  If the input doesn't fit the `tapara` pattern, it's returned as is.

### Performance
- **Time Complexity**: O(1), as it involves simple string operations and lookups.
- **Space Complexity**: O(1).

## Integration

### Related Sutras
- **1.1.69 (`aṇudit savarṇasya cāpratyayaḥ`)**: This sutra provides a direct exception to the `savarṇa` rule of 1.1.69. A grammar engine would first get the `savarṇa` list from 1.1.69 and then, if the term is `tapara`, use this sutra's logic to filter that list.

### Used By
- Any part of the grammar engine that interprets rules containing `tapara` terms.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.70

---

*Generated from template: SUTRA_README_TEMPLATE.md*
