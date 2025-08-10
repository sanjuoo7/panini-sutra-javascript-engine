# Sutra 1.1.61: प्रत्ययस्य लुक्‌श्लुलुपः

## Overview

**Sanskrit Text**: `प्रत्ययस्य लुक्‌श्लुलुपः`
**Transliteration**: `pratyayasya lukślulupaḥ`
**Translation**: "The disappearance of an affix when it is caused by the words लुक् (luk), श्लु (ślu) or लुप् (lup) are designated by those terms respectively."

## Purpose

This sutra is a `saṃjñā` (definitional) rule that defines three specific terms used for the elision (disappearance) of affixes (`pratyaya`). It establishes that `luk`, `ślu`, and `lup` are technical terms for different types of affix elision. This distinction is crucial because other rules in the grammar, like 1.1.63 (`na lumatā'ṅgasya`), apply specifically to these types of elision.

## Implementation

### Function Signature
```javascript
/**
 * Checks if an elision type is one of 'luk', 'ślu', or 'lup'.
 *
 * @param {string} elisionType - The type of elision to check.
 * @returns {boolean} - True if the elision type is 'luk', 'ślu', or 'lup'.
 */
export function isLukSluLup(elisionType)
```

### Key Features
- Identifies the specific elision types `luk`, `ślu`, and `lup`.
- Distinguishes these from other elision types like `lopa`.
- Handles invalid input gracefully by returning `false`.

### Dependencies
- None.

## Usage Examples

### Basic Usage
```javascript
import { isLukSluLup } from './index.js';

// Positive cases
console.log(isLukSluLup('luk')); // true
console.log(isLukSluLup('ślu')); // true
console.log(isLukSluLup('lup')); // true

// Negative case
console.log(isLukSluLup('lopa')); // false
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 11 tests covering:
- Positive cases for `luk`, `ślu`, and `lup`.
- Negative cases for other strings like `lopa`.
- Edge cases including `null`, `undefined`, numbers, objects, and case-sensitivity.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.61

# Run with coverage
npm test sutras/1.1.61 -- --coverage
```

## Technical Details

### Algorithm
The function uses a `Set` for efficient lookup. It checks if the input `elisionType` is a string and if it exists in the pre-defined `Set` of `{'luk', 'ślu', 'lup'}`.

### Performance
- **Time Complexity**: O(1) for the `Set.has()` operation.
- **Space Complexity**: O(1) as the `Set` size is constant.

### Edge Cases
- The function is case-sensitive. `LUK` will return `false`.
- Non-string inputs will return `false`.

## Integration

### Related Sutras
- **1.1.63 (`na lumatā'ṅgasya`)**: This sutra directly depends on the terms defined here. It prohibits certain grammatical operations when an affix has been elided by `luk`, `ślu`, or `lup`.

### Used By
- Any part of the engine that needs to check for these specific types of elision before applying rules like 1.1.63.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.61
- **Implementation Notes**: This implementation provides a simple and efficient way to check for the elision types defined in the sutra.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
