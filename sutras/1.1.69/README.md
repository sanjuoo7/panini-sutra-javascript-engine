# Sutra 1.1.69: अणुदित् सवर्णस्य चाप्रत्ययः

## Overview

**Sanskrit Text**: `अणुदित् सवर्णस्य चाप्रत्ययः`
**Transliteration**: `aṇudit savarṇasya cāpratyayaḥ`
**Translation**: "The letters of the प्रत्याहार (pratyāhāra) अण् (aṇ) i.e. the vowels and semi-vowels, and a term having उ for its indicatory letter (udit), refer to their own form as well as to their homogeneous letters, except when they are used as प्रत्यय-s or affixes."

## Purpose

This sutra is a `savarṇagrāhakasūtram` (a rule that allows a letter to represent its homogeneous variations). It is a fundamental rule for sandhi and morphology that expands the scope of a single phoneme to include its `savarṇa` (homogeneous) counterparts.

The rule states that:
1.  A letter belonging to the `aṇ` pratyāhāra (which includes all simple vowels `a, i, u, ṛ, ḷ` and the semi-vowels `y, v, r, l` and `h`) also represents its homogeneous variations. For vowels, this primarily refers to variations in length (e.g., `a` also represents `ā`).
2.  An `udit` (a term with an indicatory letter `u`, like `ku` for the velar class, `cu` for the palatal class, etc.) represents all the consonants in its class.
3.  **Exception**: This rule does not apply if the `aṇ` letter or `udit` term is a `pratyaya` (affix). In that case, it represents only its own form.

## Implementation

### Function Signature
```javascript
/**
 * Finds all homogeneous (`savarṇa`) phonemes for a given phoneme.
 *
 * @param {string} phoneme - The phoneme to find savarṇa for.
 * @param {Object} [options={}] - Options for the operation.
 * @param {boolean} [options.isPratyaya=false] - If true, the rule does not apply.
 * @param {boolean} [options.isUdit=false] - If true, the phoneme is treated as 'udit'.
 * @returns {string[]} An array of savarṇa phonemes.
 */
export function getSavarna(phoneme, options = {})
```

### Key Features
- Identifies homogeneous vowels based on length (`a` -> `a, ā`).
- Identifies homogeneous consonant classes for `udit` terms (`ku` -> `k, kh, g, gh, ṅ`).
- Handles the `apratyayaḥ` exception, where the rule is turned off for affixes.

### Dependencies
- **sanskrit-utils/constants.js**: Uses `SanskritVowels` and `SanskritConsonants` for phoneme data.

## Usage Examples

### Basic Usage
```javascript
import { getSavarna } from './index.js';

// Get savarṇa for a vowel
console.log(getSavarna('i')); // ['i', 'ī']

// Get savarṇa for an udit consonant class
console.log(getSavarna('cu', { isUdit: true })); // ['c', 'ch', 'j', 'jh', 'ñ']

// The rule does not apply if it's an affix
console.log(getSavarna('a', { isPratyaya: true })); // ['a']
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 8 tests covering:
- Vowel `savarṇa` for `a`, `i`, `u`.
- Correctly not applying `savarṇa` to `e`, `o`.
- `Udit` `savarṇa` for consonant classes (`ku`, `cu`, `tu`).
- The `apratyayaḥ` exception.
- Cases where the rule does not apply.
- Edge cases for invalid input.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.69

# Run with coverage
npm test sutras/1.1.69 -- --coverage
```

## Technical Details

### Algorithm
- The function first checks for the `apratyayaḥ` condition and returns early if it's met.
- It then checks if the input `phoneme` is part of the `aṇ` pratyāhāra or is marked as `udit`.
- If the rule applies, it uses a simple map for vowel pairs (`a` -> `ā`, etc.).
- For `udit` terms, it uses the consonant class data from `SanskritConsonants` to return the full class.
- *Note*: A full implementation would require a more sophisticated phonetic feature comparison based on Sutra 1.1.9 (`tulyāsyaprayatnaṃ savarṇam`). This implementation covers the most common use cases.

### Performance
- **Time Complexity**: O(1) for most operations due to direct lookups in `Set` and `Object`.
- **Space Complexity**: O(1) in most cases, or O(k) for `udit` where k is the size of the consonant class.

## Integration

### Related Sutras
- **1.1.9 (`tulyāsyaprayatnaṃ savarṇam`)**: Provides the definition of `savarṇa` (homogeneous) that this sutra relies on.
- **1.1.70 (`taparas tatkālasya`)**: Provides an exception to this rule, restricting `savarṇa` to phonemes of the same length.

### Used By
- This is a critical rule for almost all sandhi operations, where a rule specified for one vowel (e.g., `a`) must also apply to its long counterpart (`ā`).

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.69

---

*Generated from template: SUTRA_README_TEMPLATE.md*
