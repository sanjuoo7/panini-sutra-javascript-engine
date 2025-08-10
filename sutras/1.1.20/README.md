# Sutra 1.1.20: दाधा घ्वदाप्

## Overview

**Sanskrit Text**: `दाधा घ्वदाप्`
**Transliteration**: dādhā ghvadāp
**Translation**: The words having the form of दा 'to give' and धा 'to place' are called घु.

## Purpose

This `saṃjñā` (definition) sutra introduces the technical term `ghu` (घु). It specifically designates the verbal roots `dā` (दा, meaning 'to give') and `dhā` (धा, meaning 'to place' or 'to hold') as `ghu`. This classification is crucial because these `ghu` roots undergo specific grammatical operations and exceptions in various contexts throughout Pāṇini's grammar, particularly in the formation of verb forms and nominal derivatives.

## Implementation

### Function Signature
```javascript
function isGhu(root) {
    // Implementation details
}
```

### Key Features
- **`Ghu` Root Identification**: The `isGhu` function accurately identifies whether a given verbal root is `dā` (दा) or `dhā` (धा), thus classifying it as `ghu`.
- **Dual Script Support**: The function supports both IAST (`dā`, `dhā`) and Devanagari (`दा`, `धा`) representations of the roots.
- **`Ghu` Root Listing**: The `getGhuRoots` function provides a convenient way to retrieve all roots classified as `ghu`.

### Dependencies
- **Sanskrit Utils**:
  - `detectScript` from `sanskrit-utils/index.js`

### Usage Examples

### Basic Usage
```javascript
import { isGhu, getGhuRoots, hasGhuBehavior } from './index.js';

// Example 1: Check if a root is ghu
console.log(isGhu('dā')); // true
console.log(isGhu('धा')); // true
console.log(isGhu('gam')); // false

// Example 2: Get all ghu roots
console.log(getGhuRoots('IAST')); // ['dā', 'dhā']
console.log(getGhuRoots('Devanagari')); // ['दा', 'धा']

// Example 3: Check for ghu behavior
console.log(hasGhuBehavior('dā')); // true
console.log(hasGhuBehavior('kar')); // false
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **Positive Cases**: Verifies correct identification of `dā` and `dhā` as `ghu` in both IAST and Devanagari.
- **Negative Cases**: Ensures that other verbal roots are correctly identified as non-`ghu`.
- **Edge Cases**: Handles `null`, `undefined`, and empty string inputs gracefully.
- **Listing Functionality**: Tests the `getGhuRoots` function for accurate retrieval of `ghu` roots.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.20

# Run with coverage
npm test sutras/1.1.20 -- --coverage
```

## Technical Details

### Algorithm
1.  The `isGhu` function uses `detectScript` to determine the input script. It then checks if the input `root` string matches either 'dā' or 'dhā' (or their Devanagari equivalents) from a predefined list.
2.  The `getGhuRoots` function simply returns the predefined list of `ghu` roots based on the requested script.
3.  The `hasGhuBehavior` function acts as a wrapper for `isGhu`, indicating that if a root is `ghu`, it will exhibit `ghu`-specific grammatical behaviors.

### Performance
- **Time Complexity**: O(1) - Operations involve string comparisons against a small, fixed list, resulting in constant time complexity.
- **Space Complexity**: O(1) - Memory usage is minimal and constant.

### Edge Cases
- **Similar Roots**: The function is precise and will not classify roots like `da` (short `a`) or `dha` as `ghu`, as they do not match the exact forms specified by the sutra.
- **Invalid Inputs**: Functions handle `null`, `undefined`, or empty string inputs by returning `false`.

## Integration

### Related Sutras
- This `saṃjñā` (definition) sutra is foundational. Many other `vidhi` (rule) sutras throughout Pāṇini's grammar will refer to `ghu` roots to apply specific operations or exceptions (e.g., `2.4.44` - `ghu-mā-sthā-gā-pā-jahāti-sām-hal-ādau`).

### Used By
- Any module in the Panini engine that deals with verb conjugation, nominal derivation, or other grammatical processes involving the roots `dā` and `dhā` will need to consult this `isGhu` function to apply the correct `ghu`-specific rules.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.20
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and leverages `sanskrit-utils` for script detection.
- **Test References**: Test cases are designed to validate the precise identification of `ghu` roots and their distinction from other similar-sounding roots.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
