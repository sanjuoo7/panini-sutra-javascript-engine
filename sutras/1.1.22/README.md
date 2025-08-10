# Sutra 1.1.22: तरप्तमपौ घः

## Overview

**Sanskrit Text**: `तरप्तमपौ घः`
**Transliteration**: taraptamapau ghaḥ
**Translation**: The affixes तरप् and तमप् are called घ.

## Purpose

This `saṃjñā` (definition) sutra introduces the technical term `gha` (घ). It specifically designates the comparative affix `tarap` (तरप्) and the superlative affix `tamap` (तमप्) as `gha`. This classification is important because words formed with these affixes often undergo specific grammatical operations or have particular behaviors in Pāṇini's system, especially concerning their declension and interaction with other grammatical elements.

## Implementation

### Function Signature
```javascript
function isGha(affix, context) {
    // Implementation details
}
```

### Key Features
- **`Gha` Affix Identification**: The `isGha` function accurately identifies whether a given affix is `tarap` (तरप्) or `tamap` (तमप्), thus classifying it as `gha`.
- **Dual Script Support**: The functions handle both IAST (`tarap`, `tamap`) and Devanagari (`तरप्`, `तमप्`) representations.
- **Word-level Detection**: The `hasGhaAffix` function checks if a word contains either of these `gha` affixes, and `identifyGhaType` provides details about the specific affix and its degree of comparison.
- **`Gha` Affix Listing**: The `getGhaAffixes` function provides a convenient way to retrieve all affixes classified as `gha`.

### Dependencies
- **Sanskrit Utils**:
  - `detectScript` from `sanskrit-utils/script-detection.js`

### Usage Examples

### Basic Usage
```javascript
import { isGha, getGhaAffixes, hasGhaAffix, identifyGhaType, hasGhaBehavior, getGhaExamples } from './index.js';

// Example 1: Check if an affix is gha
console.log(isGha('tarap')); // true
console.log(isGha('तमप्')); // true
console.log(isGha('kta')); // false

// Example 2: Get all gha affixes
console.log(getGhaAffixes('IAST')); // ['tarap', 'tamap']
console.log(getGhaAffixes('Devanagari')); // ['तरप्', 'तमप्']

// Example 3: Check if a word contains a gha affix
console.log(hasGhaAffix('gurutarap')); // true
console.log(hasGhaAffix('लघुतमप्')); // true
console.log(hasGhaAffix('guru')); // false

// Example 4: Identify gha type in a word
const type = identifyGhaType('śreṣṭhatamap');
console.log(type); 
// {
//   hasGha: true,
//   type: 'tamap',
//   degree: 'superlative',
//   script: 'IAST'
// }

// Example 5: Check for gha behavior
console.log(hasGhaBehavior('tarap')); // true
console.log(hasGhaBehavior('gurutarap')); // true
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **`isGha`**: Verifies correct identification of `tarap` and `tamap` as `gha`.
- **`getGhaAffixes`**: Tests the retrieval of `gha` affixes in both scripts.
- **`hasGhaAffix`**: Checks if words containing `gha` affixes are correctly identified.
- **`identifyGhaType`**: Validates the extraction of the specific `gha` affix and its degree of comparison from a word.
- **`hasGhaBehavior`**: Confirms that both the affixes themselves and words containing them exhibit `gha` behavior.
- **Edge Cases**: Handles `null`, `undefined`, and empty string inputs gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.22

# Run with coverage
npm test sutras/1.1.22 -- --coverage
```

## Technical Details

### Algorithm
1.  **`isGha`**: This function checks if the input `affix` string matches either `tarap` or `tamap` (or their Devanagari equivalents) from a predefined list, after detecting the script.
2.  **`getGhaAffixes`**: This function simply returns the predefined lists of `gha` affixes based on the requested script.
3.  **`hasGhaAffix`**: This function iterates through the `gha` affixes and checks if the input `word` contains any of them using `String.prototype.includes()`.
4.  **`identifyGhaType`**: This function also uses `String.prototype.includes()` to find which `gha` affix is present in the `word` and returns a detailed object with its type and degree.
5.  **`hasGhaBehavior`**: This function acts as an aggregator, returning `true` if the input is either a `gha` affix itself or a word containing a `gha` affix.

### Performance
- **Time Complexity**: O(1) - Operations involve string comparisons and array lookups against small, fixed lists, resulting in constant time complexity.
- **Space Complexity**: O(1) - Memory usage is minimal and constant.

### Edge Cases
- **Partial Matches**: The `hasGhaAffix` and `identifyGhaType` functions use `includes()`, which means they will match if the affix is part of a larger string. This is appropriate for identifying words formed with these affixes.
- **Invalid Inputs**: Functions handle `null`, `undefined`, or empty string inputs by returning `false` or an appropriate default object.

## Integration

### Related Sutras
- This `saṃjñā` (definition) sutra is foundational for rules related to degrees of comparison. Many other `vidhi` (rule) sutras will refer to `gha` affixes to apply specific operations or exceptions (e.g., rules for declension of words ending in `tarap` or `tamap`).

### Used By
- Any module in the Panini engine that deals with the formation or declension of comparative and superlative adjectives will need to consult these functions to apply the correct `gha`-specific rules.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.22
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and leverages `sanskrit-utils` for script detection.
- **Test References**: Test cases are designed to validate the precise identification of `gha` affixes and their presence within words.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
