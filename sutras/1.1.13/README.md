# Sutra 1.1.13: शे

## Overview

**Sanskrit Text**: `शे`
**Transliteration**: śe
**Translation**: The affix शे (the Vedic substitute of the case-affixes) is a pragṛhya.

## Purpose

This `saṃjñā` (definition) sutra further expands the category of `pragṛhya` words (those that do not undergo Sandhi). It specifically declares that any word ending with the Vedic affix `śe` (शे) is `pragṛhya`. This rule is important for accurately processing Vedic Sanskrit texts, where this affix is used.

## Implementation

### Function Signature
```javascript
function isPragrhyaSheAffix(word) {
    // Implementation details
}
```

### Key Features
- **`Śe` Affix Identification**: The `isPragrhyaSheAffix` function accurately identifies if a given word ends with the `śe` affix (in both IAST and Devanagari).
- **Integrated `Pragṛhya` Check**: The `isPragrhya` function (exported from this module) now combines the rules from Sutras 1.1.11, 1.1.12, and 1.1.13, providing an increasingly comprehensive check for `pragṛhya` status.
- **Sandhi Prevention**: The `preventsSandhi` function leverages this expanded `pragṛhya` logic to determine if Sandhi should be applied.

### Dependencies
- **Sanskrit Utils**:
  - `detectScript` from `sanskrit-utils/index.js`
  - `isPragrhya`, `isPragrhyaSheAffix`, `preventsSandhi` from `sanskrit-utils/pragrhya-analysis.js` (for shared `pragṛhya` logic)
  - `isPragrhya` from `../1.1.12/index.js` (for base `pragṛhya` checks from previous sutra)

### Usage Examples

### Basic Usage
```javascript
import { isPragrhyaSheAffix, isPragrhya, preventsSandhi } from './index.js';

// Example 1: Check for words ending in śe
console.log(isPragrhyaSheAffix('devaśe')); // true
console.log(isPragrhyaSheAffix('अग्निशे')); // true
console.log(isPragrhyaSheAffix('rāma')); // false

// Example 2: Combined pragṛhya check (including 1.1.11 and 1.1.12 rules)
console.log(isPragrhya('devaśe')); // true
console.log(isPragrhya('amī')); // true (from 1.1.12)
console.log(isPragrhya('rāmī', { number: 'dual' })); // true (from 1.1.11)
console.log(isPragrhya('rāma')); // false

// Example 3: Preventing Sandhi with śe forms
console.log(preventsSandhi('devaśe', 'iti')); // true (Sandhi prevented)
console.log(preventsSandhi('अग्निशे', 'एव')); // true (Sandhi prevented)
console.log(preventsSandhi('rāmaḥ', 'iti')); // false
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **Positive Cases**: Verifies correct identification of words ending in `śe` in both IAST and Devanagari.
- **Negative Cases**: Ensures that words not ending in `śe` are not incorrectly identified.
- **Integration**: Tests confirm that the `isPragrhya` and `preventsSandhi` functions correctly combine the rules from Sutras 1.1.11, 1.1.12, and 1.1.13.
- **Edge Cases**: Handles `null`, `undefined`, and empty string inputs gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.13

# Run with coverage
npm test sutras/1.1.13 -- --coverage
```

## Technical Details

### Algorithm
1.  The `isPragrhyaSheAffix` function checks if the input word ends with the specific string 'śe' (or 'शे' in Devanagari). This check is performed using the shared `isPragrhyaSheAffixShared` utility from `sanskrit-utils/pragrhya-analysis.js`.
2.  The `isPragrhya` function in this module acts as an aggregator, calling the shared `isPragrhyaShared` utility and passing a list of sutras (`1.1.11`, `1.1.12`, `1.1.13`) to ensure that all relevant `pragṛhya` rules up to this point are considered.
3.  The `preventsSandhi` function similarly uses the shared `preventsSandhiShared` utility, which internally relies on the aggregated `isPragrhya` check.

### Performance
- **Time Complexity**: O(1) - Operations involve string comparisons, which are constant time for typical word lengths.
- **Space Complexity**: O(1) - Memory usage is minimal and constant.

### Edge Cases
- **Partial Matches**: The function specifically looks for the affix at the end of the word to avoid false positives.
- **Invalid Inputs**: Functions handle `null`, `undefined`, or empty string inputs by returning `false`.

## Integration

### Related Sutras
- **Sutra 1.1.11 (ईदूदेद्द्विवचनं प्रगृह्यम्)** and **Sutra 1.1.12 (अदसो मात्)**: This sutra builds upon the `pragṛhya` definitions established by these preceding rules, adding another specific condition.
- This sutra is crucial for the accurate application of Sandhi rules, especially in Vedic contexts.

### Used By
- Any module performing Sandhi operations will need to consult the `isPragrhya` or `preventsSandhi` functions to ensure that words ending in `śe` are not incorrectly subjected to Sandhi.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.13
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and integrates with the `sanskrit-utils/pragrhya-analysis.js` module for centralized `pragṛhya` logic.
- **Test References**: Test cases are designed to validate the specific `śe` affix and its interaction with the broader `pragṛhya` definition.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
