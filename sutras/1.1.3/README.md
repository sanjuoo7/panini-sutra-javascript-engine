# Sutra 1.1.3: इको गुणवृद्धी

## Overview

**Sanskrit Text**: `इको गुणवृद्धी`
**Transliteration**: iko guṇavṛddhī
**Translation**: In the absence of any special role whenever गुण or वृद्धि is enjoined about any expression by using the terms गुण or वृद्धि, it is to be understood to come in the room of the इक् (इ, उ, ऋ, लृ) of that expression.

## Purpose

This `paribhāṣā` (interpretive rule) is a cornerstone of Pāṇini's grammatical system. It clarifies the scope of `guṇa` (गुण) and `vṛddhi` (वृद्धि) operations. Unless explicitly stated otherwise, whenever a rule prescribes `guṇa` or `vṛddhi` substitution, it is to be applied specifically to the `ik` vowels (`i`, `u`, `ṛ`, `ḷ`, and their long counterparts `ī`, `ū`, `ṝ`, `ḹ`). This ensures that these fundamental vowel changes are consistently applied to the correct set of vowels throughout the grammar.

## Implementation

### Function Signature
```javascript
function getGunaVrddhiScope(word) {
    // Implementation details
}
```

### Key Features
- **`Ik` Vowel Identification**: The `isIkVowel` function (re-exported from `sanskrit-utils/classification.js`) accurately identifies `ik` vowels.
- **`Guṇa` and `Vṛddhi` Application**: Functions `applyGunaToIk` and `applyVrddhiToIk` demonstrate the direct application of these transformations to `ik` vowels.
- **Scope Analysis**: The `getGunaVrddhiScope` and `getGunaVrddhiScopeDetailed` functions analyze a given word to identify all `ik` vowels and their potential `guṇa` and `vṛddhi` forms, providing a clear picture of where these operations can apply.
- **Dual Script Support**: All functions handle both IAST and Devanagari scripts.

### Dependencies
- **Sanskrit Utils**:
  - `SanskritVowels` from `constants.js`
  - `tokenizePhonemes` from `phoneme-tokenization.js`
  - `isIkVowel`, `isVowel` from `classification.js`
  - `applyGunaTransformation`, `applyVrddhiTransformation`, `getGunaVrddhiScope` from `vowel-analysis.js`
  - `validateSanskritWord` from `validation.js`
  - `getGunaForm`, `applyGuna`, `isValidGunaTransformation` from `guna-utilities.js`

### Usage Examples

### Basic Usage
```javascript
import { isIkVowel, applyGunaToIk, applyVrddhiToIk, getGunaVrddhiScopeDetailed, applySutra113, isOperationApplicable } from './index.js';

// Example 1: Check if a vowel is an ik vowel
console.log(isIkVowel('i')); // true
console.log(isIkVowel('a')); // false
console.log(isIkVowel('ऋ')); // true

// Example 2: Apply guṇa to an ik vowel
console.log(applyGunaToIk('u')); // 'o'
console.log(applyGunaToIk('ṛ')); // 'ar'
console.log(applyGunaToIk('a')); // null (not an ik vowel)

// Example 3: Apply vṛddhi to an ik vowel
console.log(applyVrddhiToIk('i')); // 'ai'
console.log(applyVrddhiToIk('ū')); // 'au'

// Example 4: Get guṇa/vṛddhi scope for a word
const scope = getGunaVrddhiScopeDetailed('kṛṣṇa');
console.log(scope.ikVowelCount); // 1 (for 'ṛ')
console.log(scope.results[0].gunaForm); // 'ar'
console.log(scope.results[0].vrddhiForm); // 'ār'

// Example 5: Apply Sutra 1.1.3 for comprehensive analysis
const sutraAnalysis = applySutra113('buddhi');
console.log(sutraAnalysis.ikVowelsFound); // 1 (for 'i')
console.log(sutraAnalysis.examples[0].guna); // 'e'
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **`isIkVowel`**: Verifies correct identification of all `ik` vowels and exclusion of non-`ik` vowels.
- **`applyGunaToIk` and `applyVrddhiToIk`**: Tests the accurate transformation of `ik` vowels to their `guṇa` and `vṛddhi` forms.
- **`isOperationApplicable`**: Confirms when `guṇa` or `vṛddhi` operations are applicable to a given vowel.
- **`getGunaVrddhiScope` and `getGunaVrddhiScopeDetailed`**: Validates the analysis of words to identify `ik` vowels and their transformability.
- **`applySutra113`**: Tests the comprehensive sutra application, including metadata and detailed analysis.
- **Edge Cases**: Handles `null`, `undefined`, and empty string inputs gracefully.
- **Complex Word Analysis**: Includes tests for words with multiple vowels and mixed `ik`/non-`ik` vowels.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.3

# Run with coverage
npm test sutras/1.1.3 -- --coverage
```

## Technical Details

### Algorithm
1.  **`isIkVowel`**: This function (from `sanskrit-utils/classification.js`) checks if a vowel belongs to the predefined set of `ik` vowels (`i`, `u`, `ṛ`, `ḷ`, and their long forms).
2.  **`applyGunaToIk` and `applyVrddhiToIk`**: These functions first verify if the input is an `ik` vowel. If so, they call the respective transformation functions (`applyGunaTransformation`, `applyVrddhiTransformation` from `sanskrit-utils/vowel-analysis.js`) to get the `guṇa` or `vṛddhi` form.
3.  **`getGunaVrddhiScopeDetailed`**: This function takes a word, tokenizes it into phonemes, and for each vowel, it determines if it's an `ik` vowel and calculates its potential `guṇa` and `vṛddhi` forms. It then adds sutra-specific notes and aggregates the results into a detailed object.
4.  **`applySutra113`**: This function orchestrates the analysis by calling `getGunaVrddhiScopeDetailed` and then formats the output with sutra metadata, an explanation, and examples of `ik` vowel transformations found in the input word.

### Performance
- **Time Complexity**: O(L) where L is the length of the word, due to phoneme tokenization. Vowel checks and transformations are O(1).
- **Space Complexity**: O(L) for storing phoneme tokens and analysis results.

### Edge Cases
- **Non-vowel Inputs**: Functions are robust against non-vowel inputs, returning `null` or indicating non-applicability.
- **Invalid Words**: The `validateSanskritWord` utility ensures that only valid Sanskrit words are processed, preventing errors from malformed inputs.

## Integration

### Related Sutras
- **Sutra 1.1.1 (वृद्धिरादैच्)** and **Sutra 1.1.2 (अदेङ् गुणः)**: These sutras define the terms `vṛddhi` and `guṇa`, respectively. Sutra 1.1.3 then specifies *where* these operations apply by default (i.e., to `ik` vowels).
- This `paribhāṣā` is fundamental to understanding countless `vidhi` (rule) sutras that prescribe `guṇa` or `vṛddhi` operations in various contexts (e.g., verb conjugation, noun declension, Sandhi).

### Used By
- Any module in the Panini engine that performs vowel gradation (guṇa or vṛddhi) will rely on the principles established by this sutra to ensure that transformations are applied only to the appropriate `ik` vowels.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.3
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and leverages shared `sanskrit-utils` for robust phonological analysis.
- **Test References**: Test cases are designed to validate the precise identification of `ik` vowels and their correct `guṇa` and `vṛddhi` transformations, including complex word scenarios.

---

*Generated from template: SUTRA_README_TEMPLATE.md*