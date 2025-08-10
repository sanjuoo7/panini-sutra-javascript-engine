# Sutra 1.1.10: नाज्झलौ

## Overview

**Sanskrit Text**: `नाज्झलौ`
**Transliteration**: nājjhalau
**Translation**: There is however no homogeneity between vowels and consonants, though their place and effort be equal.

## Purpose

This sutra is a `saṃjñā` (definition) sutra that clarifies the concept of `savarṇa` (homogeneity) introduced in Sutra 1.1.9. It explicitly states that a vowel (`ac`) and a consonant (`hal`) can never be considered homogeneous, even if they share the same place of articulation and effort. This rule is crucial for preventing incorrect Sandhi (phonetic combination) operations.

## Implementation

### Function Signature
```javascript
function checkHomogeneityRestriction(phoneme1, phoneme2) {
    // Implementation details
}
```

### Key Features
- **Vowel-Consonant Distinction**: The primary function `checkHomogeneityRestriction` returns `false` if one phoneme is a vowel and the other is a consonant, indicating they cannot be homogeneous.
- **Type Analysis**: The `analyzePhonemeTypes` function provides a detailed breakdown of each phoneme's type (vowel, consonant, or unknown) and explicitly states if a homogeneity restriction applies.
- **Script Agnostic**: Leverages shared `isVowel` and `isConsonant` utilities, making it implicitly compatible with both IAST and Devanagari scripts.

### Dependencies
- **Sanskrit Utils**:
  - `isVowel` from `sanskrit-utils/index.js`
  - `isConsonant` from `sanskrit-utils/index.js`

### Usage Examples

### Basic Usage
```javascript
import { checkHomogeneityRestriction, isHomogeneityBlocked, analyzePhonemeTypes } from './index.js';

// Example 1: Vowel and Consonant (Homogeneity Blocked)
const result1 = checkHomogeneityRestriction('a', 'k');
console.log(result1); // false (Homogeneity is restricted)

const blocked1 = isHomogeneityBlocked('a', 'k');
console.log(blocked1); // true

// Example 2: Two Vowels (Homogeneity Not Blocked by this Sutra)
const result2 = checkHomogeneityRestriction('a', 'ā');
console.log(result2); // true (This sutra does not restrict, further rules apply)

const blocked2 = isHomogeneityBlocked('a', 'ā');
console.log(blocked2); // false

// Example 3: Analyze Phoneme Types
const analysis = analyzePhonemeTypes('इ', 'च');
console.log(analysis);
// {
//   phoneme1Type: 'vowel',
//   phoneme2Type: 'consonant',
//   restriction: 'vowel_consonant_incompatible',
//   homogeneityBlocked: true
// }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite includes comprehensive coverage for:
- **Positive Cases**: Verifies that homogeneity is correctly blocked for all vowel-consonant pairs (both IAST and Devanagari).
- **Negative Cases**: Confirms that homogeneity is *not* blocked by this sutra for vowel-vowel or consonant-consonant pairs, indicating that further rules would apply.
- **Edge Cases**: Handles `null`, `undefined`, and empty string inputs gracefully.
- **Real-world Scenarios**: Includes tests for phonemes that might share a place of articulation (e.g., `a` and `k`) to explicitly demonstrate the rule's application.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.10

# Run with coverage
npm test sutras/1.1.10 -- --coverage
```

## Technical Details

### Algorithm
The `checkHomogeneityRestriction` function determines if two input phonemes are of different types (one vowel, one consonant) using the `isVowel` and `isConsonant` helper functions from `sanskrit-utils`. If they are of different types, it returns `false`, indicating that they cannot be homogeneous according to this sutra. If they are of the same type (both vowels or both consonants), it returns `true`, meaning this particular sutra does not impose a restriction, and other rules (like 1.1.9) would then determine their homogeneity.

### Performance
- **Time Complexity**: O(1) - The operations involve simple type checks and boolean logic, making the execution time constant.
- **Space Complexity**: O(1) - Memory usage is minimal and constant.

### Edge Cases
- **Invalid Inputs**: The functions are robust against `null`, `undefined`, or empty string inputs, returning `false` for `checkHomogeneityRestriction` and appropriate `unknown` types for `analyzePhonemeTypes`.
- **Unknown Phonemes**: If a phoneme is neither identified as a vowel nor a consonant by the utility functions, it is treated as `unknown`, and homogeneity is blocked.

## Integration

### Related Sutras
- **Sutra 1.1.9 (तुल्यास्यप्रयत्नं सवर्णम्)**: This sutra directly modifies and refines the definition of `savarṇa` (homogeneity) established by 1.1.9, by adding a crucial exclusion for vowel-consonant pairs.

### Used By
- Any component of the Panini engine that needs to determine the `savarṇa` status of two phonemes, especially before applying Sandhi rules, will need to consult this sutra to ensure that vowels and consonants are never treated as homogeneous.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.10
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` for consistency and accuracy.
- **Test References**: Test cases are designed to cover the explicit restriction imposed by this sutra, including scenarios where phonemes might otherwise appear homogeneous based on articulation.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
