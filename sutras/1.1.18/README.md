# Sutra 1.1.18: ऊँ

## Overview

**Sanskrit Text**: `ऊँ`
**Transliteration**: ūṃ
**Translation**: The particle ऊँ replaces उञ in non-Vedic literature and it is pragṛhya in the opinion of Śākalya.

## Purpose

This `saṃjñā` (definition) sutra declares the sacred syllable `ūṃ` (ऊँ) as `pragṛhya`. It notes that `ūṃ` replaces `ūñ` (उञ्) in non-Vedic literature, and its `pragṛhya` status is affirmed by Śākalya. This is a significant rule as `ūṃ` (Om) is a fundamental and frequently occurring particle in Sanskrit, and its `pragṛhya` status ensures it remains uncombined in Sandhi.

## Implementation

### Function Signature
```javascript
function isPragrhyaOm(word, context) {
    // Implementation details
}
```

### Key Features
- **`Ūṃ` Identification**: The `isPragrhyaOm` function accurately identifies the particle `ūṃ` (and its common variants like `oṃ`, `om`, `ओम्`, `ओं`) as `pragṛhya`.
- **Contextual Note**: While the sutra mentions its replacement of `ūñ` in non-Vedic contexts, the `pragṛhya` status of `ūṃ` itself is generally applicable.
- **Integrated `Pragṛhya` Check**: The `isPragrhya` function (exported from this module) now combines the rules from Sutras 1.1.11 through 1.1.18, providing an increasingly comprehensive check for `pragṛhya` status.

### Dependencies
- **Sanskrit Utils**:
  - `detectScript` from `sanskrit-utils/script-detection.js`
  - `isPragrhya` from `../1.1.17/index.js` (for base `pragṛhya` checks from previous sutra)

### Usage Examples

### Basic Usage
```javascript
import { isPragrhyaOm, isPragrhya, isOmParticle, hasPragrhyaBehavior } from './index.js';

// Example 1: Check for ūṃ as pragṛhya
console.log(isPragrhyaOm('ūṃ')); // true
console.log(isPragrhyaOm('ओम्')); // true
console.log(isPragrhyaOm('ओं')); // true

// Example 2: Combined pragṛhya check (including previous rules)
console.log(isPragrhya('om')); // true
console.log(isPragrhya('ūñ', { nextWord: 'iti' })); // true (from 1.1.17)
console.log(isPragrhya('rāmo', { nextWord: 'iti', grammaticalCase: 'vocative', isVedic: false })); // true (from 1.1.16)

// Example 3: Check if a word is an Om particle
console.log(isOmParticle('om')); // true
console.log(isOmParticle('ऊँ')); // true
console.log(isOmParticle('a')); // false

// Example 4: Check for pragṛhya behavior
console.log(hasPragrhyaBehavior('ऊँ')); // true
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **Positive Cases**: Verifies correct identification of `ūṃ` and its variants as `pragṛhya` in both IAST and Devanagari.
- **Contextual Tests**: Confirms that the rule applies generally, with notes on its non-Vedic replacement context.
- **Integration**: Tests confirm that the `isPragrhya` function correctly combines the rules from Sutras 1.1.11 through 1.1.18.
- **Edge Cases**: Handles `null`, `undefined`, and empty string inputs gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.18

# Run with coverage
npm test sutras/1.1.18 -- --coverage
```

## Technical Details

### Algorithm
1.  The `isPragrhyaOm` function checks if the input `word` matches any of the predefined forms of `ūṃ` (e.g., `ūṃ`, `oṃ`, `om`, `ऊँ`, `ओम्`, `ओं`) in either script.
2.  The `isPragrhya` function in this module acts as an aggregator. It first checks if the word is `pragṛhya` based on previous sutras (1.1.11-1.1.17). If not, it then applies the logic of 1.1.18.

### Performance
- **Time Complexity**: O(1) - Operations involve string comparisons against a small, fixed list, resulting in constant time complexity.
- **Space Complexity**: O(1) - Memory usage is minimal and constant.

### Edge Cases
- **Variants**: The implementation accounts for common transliteration and Devanagari variants of `ūṃ`.
- **Invalid Inputs**: Functions handle `null`, `undefined`, or empty string inputs by returning `false`.

## Integration

### Related Sutras
- **Sutras 1.1.11 through 1.1.17**: This sutra builds upon the `pragṛhya` definitions established by these preceding rules, adding the highly significant particle `ūṃ`.
- This rule is fundamental for the accurate parsing of Sanskrit texts, especially those containing mantras and prayers.

### Used By
- Any module performing Sandhi operations or grammatical analysis will need to consult the `isPragrhya` or `hasPragrhyaBehavior` functions to ensure that `ūṃ` is not incorrectly subjected to Sandhi.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.18
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and integrates with the broader `pragṛhya` analysis framework.
- **Test References**: Test cases are designed to validate the identification of `ūṃ` and its variants as `pragṛhya`.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
