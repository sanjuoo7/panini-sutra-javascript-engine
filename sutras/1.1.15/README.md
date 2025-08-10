# Sutra 1.1.15: ओत्

## Overview

**Sanskrit Text**: `ओत्`
**Transliteration**: ot
**Translation**: The final ओ of a particle is a pragṛhya.

## Purpose

This `saṃjñā` (definition) sutra further expands the category of `pragṛhya` words. It specifically states that any particle (निपात) that ends in the vowel `o` (ओ) is considered `pragṛhya`, and thus will not undergo Sandhi. This rule is important for correctly handling vocative and other particles like `aho`, `bho`, `ho`.

## Implementation

### Function Signature
```javascript
function isPragrhyaParticleEndingInO(word, isParticle) {
    // Implementation details
}
```

### Key Features
- **`O`-ending Particle Identification**: The `isPragrhyaParticleEndingInO` function accurately identifies if a given word is a particle ending in `o` (ओ) in both IAST and Devanagari.
- **Contextual Application**: The rule applies only if the word is explicitly identified as a particle, preventing misclassification of regular words ending in `o`.
- **Integrated `Pragṛhya` Check**: The `isPragrhya` function (exported from this module) now combines the rules from Sutras 1.1.11, 1.1.12, 1.1.13, 1.1.14, and 1.1.15, providing an increasingly comprehensive check for `pragṛhya` status.
- **Sandhi Prevention**: The `preventsSandhi` function leverages this expanded `pragṛhya` logic to determine if Sandhi should be applied.

### Dependencies
- **Sanskrit Utils**:
  - `detectScript` from `sanskrit-utils/script-detection.js`
  - `isPragrhya`, `isPragrhyaParticleEndingInO`, `preventsSandhi` from `sanskrit-utils/pragrhya-analysis.js` (for shared `pragṛhya` logic)
  - `isPragrhya` from `../1.1.14/index.js` (for base `pragṛhya` checks from previous sutra)

### Usage Examples

### Basic Usage
```javascript
import { isPragrhyaParticleEndingInO, isPragrhya, preventsSandhi } from './index.js';

// Example 1: Check for particles ending in 'o'
console.log(isPragrhyaParticleEndingInO('aho', true)); // true
console.log(isPragrhyaParticleEndingInO('भो', true)); // true
console.log(isPragrhyaParticleEndingInO('rāmo', false)); // false (not a particle)

// Example 2: Combined pragṛhya check (including previous rules)
console.log(isPragrhya('aho', { isParticle: true })); // true
console.log(isPragrhya('a', { isParticle: true })); // true (from 1.1.14)
console.log(isPragrhya('devaśe')); // true (from 1.1.13)
console.log(isPragrhya('amī')); // true (from 1.1.12)
console.log(isPragrhya('rāmī', { number: 'dual' })); // true (from 1.1.11)

// Example 3: Preventing Sandhi with 'o'-ending particles
console.log(preventsSandhi('bho', 'rāma', { isParticle: true })); // true (Sandhi prevented)
console.log(preventsSandhi('हो', 'इति', { isParticle: true })); // true (Sandhi prevented)
console.log(preventsSandhi('rāmo', 'iti', { isParticle: false })); // false
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **Positive Cases**: Verifies correct identification of `o`-ending particles as `pragṛhya` in both IAST and Devanagari.
- **Negative Cases**: Ensures that non-particles or particles not ending in `o` are correctly excluded.
- **Contextual Tests**: Confirms that the `isParticle` context is correctly utilized.
- **Integration**: Tests confirm that the `isPragrhya` and `preventsSandhi` functions correctly combine the rules from Sutras 1.1.11 through 1.1.15.
- **Edge Cases**: Handles `null`, `undefined`, and empty string inputs gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.15

# Run with coverage
npm test sutras/1.1.15 -- --coverage
```

## Technical Details

### Algorithm
1.  The `isPragrhyaParticleEndingInO` function first checks if the `isParticle` context is `true`. Then, it verifies if the word ends with 'o' (or 'ो' in Devanagari) using `endsWith` and `detectScript`.
2.  The `isPragrhya` function in this module acts as an aggregator. It first checks if the word is `pragṛhya` based on previous sutras (1.1.11-1.1.14). If not, and if the word is a particle, it then applies the logic of 1.1.15.
3.  The `preventsSandhi` function directly calls the aggregated `isPragrhya` function to determine Sandhi prevention.

### Performance
- **Time Complexity**: O(1) - Operations involve string checks and boolean logic, resulting in constant time complexity.
- **Space Complexity**: O(1) - Memory usage is minimal and constant.

### Edge Cases
- **Non-particles**: The `isParticle` flag in the context is crucial; a word ending in `o` will not be considered `pragṛhya` by this rule if it's not a particle.
- **Invalid Inputs**: Functions handle `null`, `undefined`, or empty string inputs by returning `false`.

## Integration

### Related Sutras
- **Sutras 1.1.11, 1.1.12, 1.1.13, 1.1.14**: This sutra builds upon the `pragṛhya` definitions established by these preceding rules, adding another specific condition for `o`-ending particles.
- This rule is fundamental for the accurate application of Sandhi, particularly for common vocative and exclamatory particles.

### Used By
- Any module performing Sandhi operations will need to consult the `isPragrhya` or `preventsSandhi` functions to ensure that `o`-ending particles are not incorrectly subjected to Sandhi.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.15
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and integrates with the `sanskrit-utils/pragrhya-analysis.js` module for centralized `pragṛhya` logic.
- **Test References**: Test cases are designed to validate the specific conditions for `o`-ending particles and their contextual application.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
