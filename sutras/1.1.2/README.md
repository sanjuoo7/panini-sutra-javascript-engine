# Sutra 1.1.2: अदेङ् गुणः

## Overview

**Sanskrit Text**: `अदेङ् गुणः`
**Transliteration**: adeṅ guṇaḥ
**Translation**: a, e and o are called guṇa.

## Purpose

This `saṃjñā` (definition) sutra establishes the term "guṇa" (गुण). It defines the vowels `a` (अ), `e` (ए), and `o` (ओ) as `guṇa` vowels. This is a foundational concept in Pāṇini's grammar, as `guṇa` is a specific grade of vowel modification that occurs frequently in word formation (e.g., verb conjugations, noun declensions) and Sandhi rules. Understanding `guṇa` is essential for correctly deriving Sanskrit word forms.

## Implementation

### Function Signature
```javascript
function isGuna(vowel) {
    // Implementation details
}
```

### Key Features
- **`Guṇa` Vowel Identification**: The `isGuna` function (re-exported from `sanskrit-utils/classification.js`) accurately determines if a given vowel is one of the three `guṇa` vowels (`a`, `e`, `o`).
- **Dual Script Support**: Functions handle both IAST (e.g., `a`, `e`, `o`) and Devanagari (e.g., `अ`, `ए`, `ओ`) scripts.
- **Detailed Vowel Analysis**: The `analyzeVowel` function provides a comprehensive breakdown of a vowel's properties, including its `guṇa` status, script, and specific category (e.g., `basic-a`, `front-mid`, `back-mid`).
- **Integration with `Guṇa` Transformations**: The module integrates with `guna-utilities.js` to demonstrate how `guṇa` transformations are applied to other vowels (e.g., `i` to `e`, `u` to `o`).

### Dependencies
- **Sanskrit Utils**:
  - `SanskritVowels` from `constants.js`
  - `detectScript` from `script-detection.js`
  - `isGuna`, `getVowelClassifications` from `classification.js`
  - `analyzeVowel` from `vowel-analysis.js`
  - `validateVowel` from `validation.js`
  - `getGunaForm`, `applyGuna` from `guna-utilities.js`
  - `TransliterationUtil` from `transliteration.js`

### Usage Examples

### Basic Usage
```javascript
import { isGuna, analyzeVowel, applySutra112 } from './index.js';
import { applyGuna } from '../sanskrit-utils/guna-utilities.js';

// Example 1: Check if a vowel is guṇa
console.log(isGuna('a')); // true
console.log(isGuna('i')); // false
console.log(isGuna('ए')); // true

// Example 2: Analyze a vowel
const analysis = analyzeVowel('o');
console.log(analysis);
// {
//   vowel: 'o',
//   isValid: true,
//   isGuna: true,
//   script: 'IAST',
//   category: 'back-mid',
//   classifications: { /* ... */ },
//   explanation: 'o is a guṇa vowel (back-mid)',
//   sharedAnalysis: { /* ... */ }
// }

// Example 3: Apply guṇa transformation (from guna-utilities)
console.log(applyGuna('i')); // 'e'
console.log(applyGuna('u')); // 'o'
console.log(applyGuna('ṛ')); // 'ar'

// Example 4: Apply Sutra 1.1.2 for classification
const sutraResult = applySutra112('e');
console.log(sutraResult);
// {
//   input: 'e',
//   sutraApplied: '1.1.2',
//   sutraName: 'adeṅ guṇaḥ',
//   classification: 'guṇa',
//   isGuna: true,
//   category: 'front-mid',
//   script: 'IAST',
//   explanation: 'e is a guṇa vowel (front-mid)',
//   traditionalDefinition: 'a, e, o are called guṇa vowels',
//   examples: [ /* ... */ ],
//   detailedAnalysis: { /* ... */ }
// }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **Positive Cases**: Verifies correct identification of all `guṇa` vowels in both IAST and Devanagari scripts.
- **Negative Cases**: Ensures that non-`guṇa` vowels (e.g., `i`, `u`, `ṛ`, `ā`, `ai`, `au`) are correctly identified as such.
- **Transformation Tests**: Validates the `getGunaForm` and `applyGuna` functions for accurate `guṇa` transformations.
- **Comprehensive Word Analysis**: Tests `isGuna` against a list of Sanskrit words to ensure real-world applicability.
- **Edge Cases**: Handles `null`, `undefined`, and empty string inputs gracefully for `analyzeVowel` and `applySutra112`.
- **Integration**: Confirms proper interaction with `sanskrit-utils` modules.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.2

# Run with coverage
npm test sutras/1.1.2 -- --coverage
```

## Technical Details

### Algorithm
1.  The `isGuna` function (from `sanskrit-utils/classification.js`) checks if the input vowel is present in the predefined list of `guṇa` vowels (`a`, `e`, `o`) for both IAST and Devanagari.
2.  The `analyzeVowel` function first validates the input using `validateVowel`. It then leverages `sharedAnalyzeVowel` (from `sanskrit-utils/vowel-analysis.js`) for general vowel analysis and `sharedIsGuna` for `guṇa` status, enriching the output with specific `guṇa` categories.
3.  The `applySutra112` function orchestrates the analysis, providing a structured output that includes sutra metadata, classification results, and relevant examples.

### Performance
- **Time Complexity**: O(1) - Operations involve direct lookups in small, fixed-size arrays, resulting in constant time complexity.
- **Space Complexity**: O(1) - Memory usage is minimal and constant.

### Edge Cases
- **Invalid Input**: Functions are robust against `null`, `undefined`, or non-string inputs, returning appropriate error messages or `false`.
- **Composite `Guṇa` Forms**: The `isGuna` function correctly identifies `a`, `e`, `o` as `guṇa` vowels, while composite forms like `ar` or `al` (which are results of `guṇa` transformation but not `guṇa` vowels themselves) are correctly identified as non-`guṇa`.

## Integration

### Related Sutras
- **Sutra 1.1.1 (वृद्धिरादैच्)**: This sutra defines `guṇa`, which is a related concept to `vṛddhi` (defined in 1.1.1). Both are vowel grades crucial for Sanskrit phonology and morphology.
- **Sutra 1.1.3 (इको गुणवृद्धी)**: This sutra specifies that `guṇa` and `vṛddhi` substitutions apply to `ik` vowels (`i`, `u`, `ṛ`, `ḷ`).

### Used By
- This `guṇa` definition is fundamental and is used extensively throughout the Panini engine wherever vowel gradation is required for word formation, Sandhi, or other grammatical operations.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.2
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and leverages shared `sanskrit-utils` for consistency.
- **Test References**: Test cases are derived from traditional Sanskrit grammar examples and include comprehensive scenarios for `guṇa` identification and transformation.

---

*Generated from template: SUTRA_README_TEMPLATE.md*