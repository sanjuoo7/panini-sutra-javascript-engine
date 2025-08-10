# Sutra 1.1.1: वृद्धिरादैच्

## Overview

**Sanskrit Text**: `वृद्धिरादैच्`
**Transliteration**: vṛddhirādaic
**Translation**: The vowels ā (आ), ai (ऐ), and au (औ) are called vṛddhi.

## Purpose

This sutra defines the term "vṛddhi". It is a foundational rule in Pāṇini's grammar that establishes a specific set of vowels—ā, ai, and au—that have special significance in phonological and morphological operations. The term "vṛddhi" is used throughout the Aṣṭādhyāyī to trigger specific grammatical changes.

## Implementation

### Function Signature
```javascript
function isVrddhi(vowel) {
    // Implementation details
}
```

### Key Features
- **Vṛddhi Identification**: Accurately determines if a given vowel is one of the three vṛddhi vowels.
- **Dual Script Support**: Handles both IAST (e.g., `ā`, `ai`, `au`) and Devanagari (e.g., `आ`, `ऐ`, `औ`) scripts.
- **Detailed Analysis**: Provides a comprehensive analysis object, including the vowel's script, category, and traditional classification.
- **Shared Utilities**: Leverages centralized constants and functions from `sanskrit-utils` for consistency and maintainability.

### Dependencies
- **Sanskrit Utils**:
  - `detectScript` from `script-detection.js`
  - `validateSanskritWord` from `validation.js`
  - `SanskritVowels` from `constants.js`
- **Shared Functions**: None

## Usage Examples

### Basic Usage
```javascript
import { isVrddhi, analyzeVowel, applySutra111 } from './index.js';

// Example 1: Check if a vowel is vṛddhi
const result1 = isVrddhi('ā');
console.log(result1); // true

const result2 = isVrddhi('a');
console.log(result2); // false

// Example 2: Analyze a vowel
const analysis = analyzeVowel('ऐ');
console.log(analysis);
// {
//   vowel: 'ऐ',
//   isValid: true,
//   isVrddhi: true,
//   script: 'Devanagari',
//   category: 'diphthong-ai',
//   explanation: 'ऐ is a vṛddhi vowel (diphthong-ai)',
//   traditionalClassification: 'vṛddhi'
// }

// Example 3: Apply the sutra
const sutraResult = applySutra111('au');
console.log(sutraResult);
// {
//   input: 'au',
//   sutraApplied: '1.1.1',
//   sutraName: 'vṛddhirādaic',
//   classification: 'vṛddhi',
//   isVrddhi: true,
//   category: 'diphthong-au',
//   script: 'IAST',
//   explanation: 'au is a vṛddhi vowel (diphthong-au)',
//   traditionalDefinition: 'ā, ai, au are called vṛddhi vowels',
//   examples: [ 'gaura (गौर) - fair', 'mauna (मौन) - silence' ]
// }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite includes comprehensive coverage for:
- **Positive Cases**: Correctly identifies all vṛddhi vowels in both IAST and Devanagari scripts.
- **Negative Cases**: Correctly identifies non-vṛddhi vowels.
- **Edge Cases**: Handles empty strings, `null`, and `undefined` inputs gracefully.
- **Functionality**: Tests the `isVrddhi`, `analyzeVowel`, and `applySutra111` functions thoroughly.
- **Integration**: Ensures that the functions work with transliteration utilities and test case data.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.1

# Run with coverage
npm test sutras/1.1.1 -- --coverage
```

## Technical Details

### Algorithm
The core logic is straightforward:
1.  The `isVrddhi` function checks if the input vowel exists in a predefined list of vṛddhi vowels (both IAST and Devanagari) from the `sanskrit-utils/constants.js` file.
2.  The `analyzeVowel` function first validates the input, then uses `detectScript` to determine the script, and finally checks if the vowel is a vṛddhi vowel. It returns a detailed object with this information.
3.  The `applySutra111` function orchestrates the analysis and provides a structured output that aligns with the sutra's definition and provides relevant examples.

### Performance
- **Time Complexity**: O(1) - The function relies on direct lookups in a small, fixed-size array or Set.
- **Space Complexity**: O(1) - The memory usage is constant and does not depend on the input size.
- **Optimization Notes**: The use of centralized constants from `sanskrit-utils` ensures that the list of vṛddhi vowels is not duplicated, and any future optimizations can be made in one place.

### Edge Cases
- **Invalid Input**: The `analyzeVowel` function is designed to handle `null`, `undefined`, empty strings, and non-string inputs by returning a standardized error object.
- **Mixed Scripts**: While the primary functions expect single vowels, the script detection is robust enough to handle more complex inputs, though the core logic is vowel-specific.

## Integration

### Related Sutras
- This is a `saṃjñā` (definition) sutra, which means it provides a foundational definition used by many other sutras. For example, sutras that prescribe a "vṛddhi" replacement (e.g., in verb conjugation or noun declension) depend on this definition.

### Used By
- This sutra's logic is fundamental and is implicitly used by any part of the Panini engine that needs to identify vṛddhi vowels for grammatical operations.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.1
- **Implementation Notes**: The implementation follows the principles outlined in the project's `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md`.
- **Test References**: Test cases are derived from traditional examples of Sanskrit grammar and are designed to ensure robust coverage.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
