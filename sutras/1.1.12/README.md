# Sutra 1.1.12: अदसो मात्

## Overview

**Sanskrit Text**: `अदसो मात्`
**Transliteration**: adaso māt
**Translation**: The same letters after the म् of the pronoun अदस् are pragṛhya.

## Purpose

This `saṃjñā` (definition) sutra extends the concept of `pragṛhya` (words that do not undergo Sandhi) to specific forms of the pronoun `adas` (अदस्). Specifically, it declares that the vowels `ī`, `ū`, and `e` in forms of `adas` that end after the `m` sound (e.g., `amī`, `amū`, `ame`) are `pragṛhya`. This is another crucial rule for correctly applying Sandhi in Sanskrit, as these forms will resist phonetic combination.

## Implementation

### Function Signature
```javascript
function isPragrhyaAdasForm(word) {
    // Implementation details
}
```

### Key Features
- **`Adas` Form Identification**: The `isPragrhyaAdasForm` function accurately identifies if a given word is one of the specified `pragṛhya` forms of `adas` (e.g., `amī`, `amū`, `ame`, and their Devanagari equivalents).
- **Integrated `Pragṛhya` Check**: The `isPragrhya` function (exported from this module) combines the rules from Sutra 1.1.11 and 1.1.12, providing a comprehensive check for `pragṛhya` status up to this point.
- **Sandhi Prevention**: The `preventsSandhi` function leverages the combined `pragṛhya` logic to determine if Sandhi should be applied.

### Dependencies
- **Sanskrit Utils**:
  - `detectScript` from `sanskrit-utils/index.js`
  - `isPragrhya`, `isPragrhyaAdasForm`, `analyzePragrhya`, `preventsSandhi` from `sanskrit-utils/pragrhya-analysis.js` (for shared `pragṛhya` logic)
  - `isPragrhya` from `../1.1.11/index.js` (for base `pragṛhya` checks from previous sutra)

### Usage Examples

### Basic Usage
```javascript
import { isPragrhyaAdasForm, isPragrhya, preventsSandhi } from './index.js';

// Example 1: Check for adas pragṛhya forms
console.log(isPragrhyaAdasForm('amī')); // true
console.log(isPragrhyaAdasForm('अमू')); // true
console.log(isPragrhyaAdasForm('rāmaḥ')); // false

// Example 2: Combined pragṛhya check (including 1.1.11 rules)
console.log(isPragrhya('amī')); // true
console.log(isPragrhya('rāmī', { number: 'dual' })); // true (from 1.1.11)
console.log(isPragrhya('rāma')); // false

// Example 3: Preventing Sandhi with adas forms
console.log(preventsSandhi('amī', 'iti')); // true (Sandhi prevented)
console.log(preventsSandhi('अमू', 'एव')); // true (Sandhi prevented)
console.log(preventsSandhi('rāmaḥ', 'iti')); // false
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **Positive Cases**: Verifies correct identification of `adas` `pragṛhya` forms in both IAST and Devanagari.
- **Negative Cases**: Ensures that non-`adas` words or `adas` forms not matching the specified endings are not incorrectly identified.
- **Integration**: Tests confirm that the `isPragrhya` and `preventsSandhi` functions correctly combine the rules from Sutra 1.1.11 and 1.1.12.
- **Edge Cases**: Handles `null`, `undefined`, and empty string inputs gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.12

# Run with coverage
npm test sutras/1.1.12 -- --coverage
```

## Technical Details

### Algorithm
1.  The `isPragrhyaAdasForm` function uses a predefined list of `adas` `pragṛhya` forms (e.g., `amī`, `amū`, `ame`) and checks if the input word matches any of them. This check is performed using the shared `isPragrhyaAdasFormShared` utility from `sanskrit-utils/pragrhya-analysis.js`.
2.  The `isPragrhya` function in this module acts as an aggregator, calling the shared `isPragrhyaShared` utility and passing a list of sutras (`1.1.11`, `1.1.12`) to ensure that all relevant `pragṛhya` rules up to this point are considered.
3.  The `preventsSandhi` function similarly uses the shared `preventsSandhiShared` utility, which internally relies on the aggregated `isPragrhya` check.

### Performance
- **Time Complexity**: O(1) - Operations involve string comparisons against a small, fixed list, resulting in constant time complexity.
- **Space Complexity**: O(1) - Memory usage is minimal and constant.

### Edge Cases
- **Non-`adas` words**: The functions correctly distinguish `adas` forms from other words that might coincidentally end in `ī`, `ū`, or `e`.
- **Invalid Inputs**: Functions handle `null`, `undefined`, or empty string inputs by returning `false`.

## Integration

### Related Sutras
- **Sutra 1.1.11 (ईदूदेद्द्विवचनं प्रगृह्यम्)**: This sutra builds upon the definition of `pragṛhya` established by 1.1.11, adding another specific set of words to the `pragṛhya` category.
- This sutra, along with other `pragṛhya` rules, is critical for the accurate application of Sandhi rules in the Panini engine.

### Used By
- Any module performing Sandhi operations will need to consult the `isPragrhya` or `preventsSandhi` functions to ensure that `adas` `pragṛhya` forms are not incorrectly subjected to Sandhi.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.12
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and integrates with the `sanskrit-utils/pragrhya-analysis.js` module for centralized `pragṛhya` logic.
- **Test References**: Test cases are designed to validate the specific `adas` forms and their interaction with the broader `pragṛhya` definition.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
