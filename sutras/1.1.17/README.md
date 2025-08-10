# Sutra 1.1.17: उञः

## Overview

**Sanskrit Text**: `उञः`
**Transliteration**: uñaḥ
**Translation**: The particle ऊञ् before इति, according to Śākalya is a pragṛhya.

## Purpose

This `saṃjñā` (definition) sutra specifies another condition for a word to be considered `pragṛhya`. It states that the particle `ūñ` (ऊञ्), when immediately followed by the word `iti` (इति), is `pragṛhya`. This rule is attributed to the grammarian Śākalya and is important for correctly handling this specific particle in Sanskrit texts, ensuring it does not undergo Sandhi.

## Implementation

### Function Signature
```javascript
function isPragrhyaUnj(word, context) {
    // Implementation details
}
```

### Key Features
- **`Ūñ` Particle Identification**: The `isPragrhyaUnj` function accurately identifies the particle `ūñ` (or `uñ` in IAST, and their Devanagari equivalents `ऊञ्`, `ऊञ`).
- **Contextual Requirement**: It correctly applies the `pragṛhya` status only when `ūñ` is followed by `iti` (इति).
- **Integrated `Pragṛhya` Check**: The `isPragrhya` function (exported from this module) now combines the rules from Sutras 1.1.11 through 1.1.17, providing an increasingly comprehensive check for `pragṛhya` status.

### Dependencies
- **Sanskrit Utils**:
  - `detectScript` from `sanskrit-utils/script-detection.js`
  - `isPragrhya` from `../1.1.16/index.js` (for base `pragṛhya` checks from previous sutra)

### Usage Examples

### Basic Usage
```javascript
import { isPragrhyaUnj, isPragrhya, hasPragrhyaBehavior } from './index.js';

// Example 1: Check for ūñ before iti
const context1 = { nextWord: 'iti' };
console.log(isPragrhyaUnj('ūñ', context1)); // true
console.log(isPragrhyaUnj('ऊञ्', context1)); // true

// Example 2: Condition not met (not followed by iti)
const context2 = { nextWord: 'gacchati' };
console.log(isPragrhyaUnj('ūñ', context2)); // false

// Example 3: Combined pragṛhya check
console.log(isPragrhya('ūñ', context1)); // true
console.log(isPragrhya('rāmo', { nextWord: 'iti', grammaticalCase: 'vocative', isVedic: false })); // true (from 1.1.16)
console.log(isPragrhya('amī')); // true (from 1.1.12)

// Example 4: Check for pragṛhya behavior
console.log(hasPragrhyaBehavior('ūñ', context1)); // true
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **Positive Cases**: Verifies correct identification of `ūñ` as `pragṛhya` when followed by `iti` in both IAST and Devanagari.
- **Negative Cases**: Ensures that `ūñ` is not incorrectly identified when the `iti` condition is not met, or when other particles are provided.
- **Contextual Tests**: Confirms that the `nextWord` context is correctly utilized.
- **Integration**: Tests confirm that the `isPragrhya` function correctly combines the rules from Sutras 1.1.11 through 1.1.17.
- **Edge Cases**: Handles `null`, `undefined`, and empty string inputs gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.17

# Run with coverage
npm test sutras/1.1.17 -- --coverage
```

## Technical Details

### Algorithm
1.  The `isPragrhyaUnj` function first checks for the presence of the word and the `nextWord` context. It then verifies if `nextWord` is `iti` (or `इति`). Finally, it checks if the `word` itself is `ūñ` (or `uñ`, `ऊञ्`, `ऊञ`) in either script.
2.  The `isPragrhya` function in this module acts as an aggregator. It first checks if the word is `pragṛhya` based on previous sutras (1.1.11-1.1.16). If not, it then applies the logic of 1.1.17.

### Performance
- **Time Complexity**: O(1) - Operations involve string comparisons and boolean logic, resulting in constant time complexity.
- **Space Complexity**: O(1) - Memory usage is minimal and constant.

### Edge Cases
- **Missing Context**: If `nextWord` context is missing or not `iti`, the function will return `false`.
- **Invalid Inputs**: Functions handle `null`, `undefined`, or empty string inputs by returning `false`.

## Integration

### Related Sutras
- **Sutras 1.1.11 through 1.1.16**: This sutra builds upon the `pragṛhya` definitions established by these preceding rules, adding a specific condition for the particle `ūñ`.
- This rule is important for the accurate parsing of Sanskrit texts, especially those containing specific particles.

### Used By
- Any module performing Sandhi operations or grammatical analysis will need to consult the `isPragrhya` or `hasPragrhyaBehavior` functions to ensure that `ūñ` is not incorrectly subjected to Sandhi when followed by `iti`.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.17
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and integrates with the broader `pragṛhya` analysis framework.
- **Test References**: Test cases are designed to validate all conditions of this specific `pragṛhya` rule.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
