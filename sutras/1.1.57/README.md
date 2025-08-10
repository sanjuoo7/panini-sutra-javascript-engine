# Sutra 1.1.57: अचः परस्मिन् पूर्वविधौ (acaḥ parasmin pūrvavidhau)

## Overview

**Sanskrit Text**: `अचः परस्मिन् पूर्वविधौ`  
**Transliteration**: acaḥ parasmin pūrvavidhau  
**Translation**: A substitute in the room of a vowel caused by something that follows, should be regarded as that whose place it takes when a rule would else take effect on what stands anterior to the original vowel.

## Purpose

This sutra specifies a particular condition under which the principle of `Sthānivadbhāva` (treating a substitute as its original, as introduced in 1.1.56) applies. It states that if a substitute (`ādeśa`) replaces a vowel (`ac`), and this substitution is triggered by an element that follows (`parasmin`), then this substitute is to be treated as the original vowel (`sthānī`) specifically for rules that apply to what precedes (`pūrvavidhi`) the original vowel.

This sutra is crucial for ensuring that operations on the preceding part of a word or phrase are correctly applied even after a vowel substitution has occurred, provided the substitution was caused by a following element.

## Implementation

### Function Signature
```javascript
export function appliesSthanivadbhavaForPurvavidhi(adesha, sthani, context) { /* ... */ }
```

### Key Features
- Checks if the `sthānī` (original) is a vowel using `isVowel` from `sanskrit-utils`.
- Verifies if the substitution was caused by a following element (`isCausedByFollowing`).
- Confirms if the rule being applied is a `pūrvavidhi` (`isPurvavidhi`).
- Returns `true` only if all three conditions are met, indicating that `Sthānivadbhāva` applies under this specific sutra.

### Dependencies
- **Sanskrit Utils**: `isVowel` from `sanskrit-utils/classification.js`.

## Usage Examples

### Basic Usage
```javascript
import { appliesSthanivadbhavaForPurvavidhi } from './index.js';

// Example 1: All conditions met - Sthānivadbhāva applies
// 'y' replaces 'i', caused by a following element, for a rule affecting the preceding part.
const result1 = appliesSthanivadbhavaForPurvavidhi('y', 'i', {
  isCausedByFollowing: true,
  isPurvavidhi: true
});
console.log(result1); // true

// Example 2: Sthānī is not a vowel - Sthānivadbhāva does not apply
// 't' replaces 'k', but 'k' is not a vowel.
const result2 = appliesSthanivadbhavaForPurvavidhi('t', 'k', {
  isCausedByFollowing: true,
  isPurvavidhi: true
});
console.log(result2); // false

// Example 3: Not caused by a following element - Sthānivadbhāva does not apply
const result3 = appliesSthanivadbhavaForPurvavidhi('y', 'i', {
  isCausedByFollowing: false,
  isPurvavidhi: true
});
console.log(result3); // false

// Example 4: Not a pūrvavidhi - Sthānivadbhāva does not apply
const result4 = appliesSthanivadbhavaForPurvavidhi('y', 'i', {
  isCausedByFollowing: true,
  isPurvavidhi: false
});
console.log(result4); // false
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 9 tests covering:
- Positive cases where all conditions are met.
- Negative cases where one or more conditions are not met (e.g., `sthānī` not a vowel, not caused by following, not `pūrvavidhi`).
- Edge cases with default context values.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.57

# Run with coverage
npm test sutras/1.1.57 --coverage
```

## Technical Details

### Algorithm
- The `appliesSthanivadbhavaForPurvavidhi` function first validates if the `sthānī` is a vowel using `isVowel`. Then, it checks the boolean flags `isCausedByFollowing` and `isPurvavidhi` from the `context` object. All three conditions must be true for the function to return `true`.

### Performance
- **Time Complexity**: O(1).
- **Space Complexity**: O(1).
- **Optimization Notes**: The function is highly efficient due to its direct conditional logic and reliance on a simple `isVowel` check.

### Edge Cases
- Handles cases where `context` properties are missing by defaulting them to `false`.
- `isVowel` handles non-string inputs gracefully, returning `false`.

## Integration

### Related Sutras
- **1.1.56 (स्थानिवदादेशोऽनल्विधौ)**: This sutra provides a general principle of `Sthānivadbhāva`, and 1.1.57 specifies a particular scenario where it applies.
- **1.1.58 (न पदान्तद्विर्वचनवरेयलोपस्वरसवर्णानुस्वारदीर्घजश्चर्विधिषु)**: This sutra lists exceptions to `Sthānivadbhāva`, which might interact with the conditions of 1.1.57.

### Used By
- This sutra is used in various contexts where a vowel substitute needs to retain the properties of its original for rules that apply to the preceding part, especially in sandhi operations.

## References

- **Panini's Ashtadhyayi**: 1.1.57
- **Implementation Notes**: This is an `atidesha` sutra that refines the application of `Sthānivadbhāva` for specific conditions related to vowel substitutes and preceding rules.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
