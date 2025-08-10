# Sutra 1.1.14: निपात एकाजनाङ्

## Overview

**Sanskrit Text**: `निपात एकाजनाङ्`
**Transliteration**: nipāta ekājanāṅ
**Translation**: A particle consisting of a single vowel, with the exception of the particle आङ् is pragṛhya.

## Purpose

This `saṃjñā` (definition) sutra further defines `pragṛhya` words. It states that any particle (निपात) that consists of a single vowel is considered `pragṛhya`, meaning it will not undergo Sandhi. A crucial exception is made for the particle `āṅ` (आङ्), which, despite being a single-vowel particle, is explicitly excluded from this `pragṛhya` status. This rule is vital for correctly handling the phonetic behavior of various short particles in Sanskrit.

## Implementation

### Function Signature
```javascript
function isPragrhyaSingleVowelParticle(word, isParticle) {
    // Implementation details
}
```

### Key Features
- **Single-Vowel Particle Identification**: The `isPragrhyaSingleVowelParticle` function accurately identifies single-vowel particles (e.g., `a`, `i`, `u`, `e`, `o` and their Devanagari equivalents) as `pragṛhya`.
- **`āṅ` Exception Handling**: It correctly excludes `āṅ` (आङ्) from the `pragṛhya` category, adhering to the explicit exception in the sutra.
- **Integrated `Pragṛhya` Check**: The `isPragrhya` function (exported from this module) now combines the rules from Sutras 1.1.11, 1.1.12, 1.1.13, and 1.1.14, providing an increasingly comprehensive check for `pragṛhya` status.
- **Sandhi Prevention**: The `preventsSandhi` function leverages this expanded `pragṛhya` logic to determine if Sandhi should be applied.

### Dependencies
- **Sanskrit Utils**:
  - `detectScript` from `sanskrit-utils/index.js`
  - `isPragrhya`, `isPragrhyaSingleVowelParticle`, `preventsSandhi` from `sanskrit-utils/pragrhya-analysis.js` (for shared `pragṛhya` logic)
  - `isPragrhya` from `../1.1.13/index.js` (for base `pragṛhya` checks from previous sutra)

### Usage Examples

### Basic Usage
```javascript
import { isPragrhyaSingleVowelParticle, isPragrhya, preventsSandhi } from './index.js';

// Example 1: Check for single-vowel particles
console.log(isPragrhyaSingleVowelParticle('a', true)); // true
console.log(isPragrhyaSingleVowelParticle('इ', true)); // true
console.log(isPragrhyaSingleVowelParticle('āṅ', true)); // false (exception)
console.log(isPragrhyaSingleVowelParticle('iti', true)); // false (not single vowel)

// Example 2: Combined pragṛhya check (including previous rules)
console.log(isPragrhya('a', { isParticle: true })); // true
console.log(isPragrhya('devaśe')); // true (from 1.1.13)
console.log(isPragrhya('amī')); // true (from 1.1.12)
console.log(isPragrhya('rāmī', { number: 'dual' })); // true (from 1.1.11)
console.log(isPragrhya('āṅ', { isParticle: true })); // false

// Example 3: Preventing Sandhi with single-vowel particles
console.log(preventsSandhi('u', 'iti', { isParticle: true })); // true (Sandhi prevented)
console.log(preventsSandhi('ओ', 'एव', { isParticle: true })); // true (Sandhi prevented)
console.log(preventsSandhi('āṅ', 'iti', { isParticle: true })); // false
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **Positive Cases**: Verifies correct identification of single-vowel particles as `pragṛhya` in both IAST and Devanagari.
- **Negative Cases**: Ensures that `āṅ` and multi-vowel particles are correctly excluded.
- **Contextual Tests**: Confirms that the `isParticle` context is correctly utilized.
- **Integration**: Tests confirm that the `isPragrhya` and `preventsSandhi` functions correctly combine the rules from Sutras 1.1.11 through 1.1.14.
- **Edge Cases**: Handles `null`, `undefined`, and empty string inputs gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.14

# Run with coverage
npm test sutras/1.1.14 -- --coverage
```

## Technical Details

### Algorithm
1.  The `isPragrhyaSingleVowelParticle` function first checks if the `isParticle` context is `true`. Then, it verifies if the `word` is a single character and if that character is a vowel. Finally, it explicitly checks if the word is `āṅ` (or `आङ्`) and returns `false` if it is, otherwise `true`.
2.  The `isPragrhya` function in this module acts as an aggregator, calling the shared `isPragrhyaShared` utility and passing a list of sutras (`1.1.11`, `1.1.12`, `1.1.13`, `1.1.14`) to ensure that all relevant `pragṛhya` rules up to this point are considered.
3.  The `preventsSandhi` function similarly uses the shared `preventsSandhiShared` utility, which internally relies on the aggregated `isPragrhya` check.

### Performance
- **Time Complexity**: O(1) - Operations involve string length checks, character comparisons, and array lookups, resulting in constant time complexity.
- **Space Complexity**: O(1) - Memory usage is minimal and constant.

### Edge Cases
- **Non-particles**: The `isParticle` flag in the context is crucial; without it, a single vowel would not be considered `pragṛhya` by this rule.
- **Invalid Inputs**: Functions handle `null`, `undefined`, or empty string inputs by returning `false`.

## Integration

### Related Sutras
- **Sutras 1.1.11, 1.1.12, 1.1.13**: This sutra builds upon the `pragṛhya` definitions established by these preceding rules, adding another specific condition for single-vowel particles.
- This rule is fundamental for the accurate application of Sandhi, particularly for common short particles.

### Used By
- Any module performing Sandhi operations will need to consult the `isPragrhya` or `preventsSandhi` functions to ensure that single-vowel particles (excluding `āṅ`) are not incorrectly subjected to Sandhi.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.14
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and integrates with the `sanskrit-utils/pragrhya-analysis.js` module for centralized `pragṛhya` logic.
- **Test References**: Test cases are designed to validate the specific conditions for single-vowel particles and the explicit exclusion of `āṅ`.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
