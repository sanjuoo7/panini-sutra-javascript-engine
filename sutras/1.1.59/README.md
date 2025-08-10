# Sutra 1.1.59: द्विर्वचनेऽचि (dvirvacane'ci)

## Overview

**Sanskrit Text**: `द्विर्वचनेऽचि`  
**Transliteration**: dvirvacane'ci  
**Translation**: Before an affix having an initial vowel, which causes reduplication, the substitute which takes the place of a vowel is like the original vowel even in form, only for the purpose of reduplication and no further.

## Purpose

This sutra specifies a particular condition under which `Sthānivadbhāva` (treating a substitute as its original) applies, specifically for the purpose of `dvirvacana` (reduplication). It states that if a substitute (`ādeśa`) replaces a vowel (`ac`), and this occurs in a context where reduplication is taking place and a vowel (`ac`) follows, then the substitute is treated as the original vowel, even retaining its form, but *only* for the purpose of that reduplication. This sutra clarifies or acts as an exception to the `dvirvacana` exclusion mentioned in Sutra 1.1.58.

## Implementation

### Function Signature
```javascript
export function appliesSthanivadbhavaForDvirvacana(adesha, sthani, context) { /* ... */ }
```

### Key Features
- Checks if the `sthānī` (original) is a vowel using `isVowel` from `sanskrit-utils`.
- Verifies if the current context is for `dvirvacana` (`isDvirvacanaContext`).
- Confirms if the element immediately following the substitute/original position is a vowel (`followingElement`).
- Returns `true` only if all three conditions are met, indicating that `Sthānivadbhāva` applies for reduplication under this specific sutra.

### Dependencies
- **Sanskrit Utils**: `isVowel` from `sanskrit-utils/classification.js`.

## Usage Examples

### Basic Usage
```javascript
import { appliesSthanivadbhavaForDvirvacana } from './index.js';

// Example 1: All conditions met - Sthānivadbhāva applies for Dvirvacana
// 'y' replaces 'i', in a reduplication context, with 'a' following.
const result1 = appliesSthanivadbhavaForDvirvacana('y', 'i', {
  isDvirvacanaContext: true,
  followingElement: 'a'
});
console.log(result1); // true

// Example 2: Sthānī is not a vowel - Sthānivadbhāva does not apply
// 't' replaces 'k', but 'k' is not a vowel.
const result2 = appliesSthanivadbhavaForDvirvacana('t', 'k', {
  isDvirvacanaContext: true,
  followingElement: 'a'
});
console.log(result2); // false

// Example 3: Not in dvirvacana context - Sthānivadbhāva does not apply
const result3 = appliesSthanivadbhavaForDvirvacana('y', 'i', {
  isDvirvacanaContext: false,
  followingElement: 'a'
});
console.log(result3); // false

// Example 4: Following element is not a vowel - Sthānivadbhāva does not apply
const result4 = appliesSthanivadbhavaForDvirvacana('y', 'i', {
  isDvirvacanaContext: true,
  followingElement: 'k'
});
console.log(result4); // false
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 10 tests covering:
- Positive cases where all conditions are met.
- Negative cases where one or more conditions are not met (e.g., `sthānī` not a vowel, not `dvirvacana` context, following element not a vowel).
- Edge cases with default context values.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.59

# Run with coverage
npm test sutras/1.1.59 --coverage
```

## Technical Details

### Algorithm
- The `appliesSthanivadbhavaForDvirvacana` function first validates if the `sthānī` is a vowel using `isVowel`. Then, it checks the boolean flag `isDvirvacanaContext` and verifies if the `followingElement` is a vowel. All three conditions must be true for the function to return `true`.

### Performance
- **Time Complexity**: O(1).
- **Space Complexity**: O(1).
- **Optimization Notes**: The function is highly efficient due to its direct conditional logic and reliance on a simple `isVowel` check.

### Edge Cases
- Handles cases where `context` properties are missing by defaulting them to `false` or an empty string.
- `isVowel` handles non-string inputs gracefully, returning `false`.

## Integration

### Related Sutras
- **1.1.56 (स्थानिवदादेशोऽनल्विधौ)**: This sutra provides a general principle of `Sthānivadbhāva`.
- **1.1.58 (न पदान्तद्विर्वचनवरेयलोपस्वरसवर्णानुस्वारदीर्घजश्चर्विधिषु)**: This sutra lists `dvirvacana` as one of the contexts where `Sthānivadbhāva` is generally prohibited. Sutra 1.1.59 acts as a specific exception or clarification for `dvirvacana` when a vowel follows.

### Used By
- This sutra is crucial for correctly handling reduplication processes in Sanskrit grammar, especially when substitutions have occurred.

## References

- **Panini's Ashtadhyayi**: 1.1.59
- **Implementation Notes**: This `atidesha` sutra provides a specific application of `Sthānivadbhāva` that is vital for the correct formation of reduplicated forms.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
