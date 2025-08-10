# Sutra 1.1.48: एच इग्घ्रस्वादेशे

## Overview

**Sanskrit Text**: `एच इग्घ्रस्वादेशे`
**Transliteration**: eca igagharasavaādeśe
**Translation**: Of ec (vowels), ik (is the substitute) when short substitute is to be made.

## Purpose

This `paribhāṣā` (interpretive rule) sutra is crucial for understanding vowel shortening in Pāṇini's grammar. It states that when a grammatical rule requires a short vowel substitute for an `ec` vowel (`e`, `o`, `ai`, `au`), the corresponding `ik` vowel (`i` or `u`) should be used as the substitute. Specifically, `e` and `ai` shorten to `i`, and `o` and `au` shorten to `u`. This rule ensures consistency in vowel gradation and is fundamental for deriving correct word forms where shortening is prescribed.

## Implementation

### Function Signature
```javascript
function applySutra1_1_48(originalVowel, context) {
    // Implementation details
}
```

### Key Features
- **`Ec` Vowel Identification**: The `analyzeEcVowel` function accurately identifies `ec` vowels (`e`, `o`, `ai`, `au`) and provides their phonetic classification (e.g., `guṇa` vowel, `vṛddhi` vowel).
- **`Ik` Substitute Determination**: The `getIkSubstitute` function determines the correct `ik` vowel (`i` or `u`) that serves as the short substitute for a given `ec` vowel, based on predefined mappings.
- **Vowel Quality Change Analysis**: The `analyzeVowelQualityChange` function analyzes the phonetic implications of the substitution, including length change and articulatory position preservation.
- **Substitution Application**: The `applyIkSubstitution` function performs the actual substitution of an `ec` vowel with its `ik` counterpart within a word.
- **Validation**: The `validateIkSubstitution` function confirms whether a proposed substitution complies with the rules of Sutra 1.1.48.

### Dependencies
- **Sanskrit Utils**:
  - `SanskritWordLists` from `sanskrit-utils/constants.js` (for `ec` vowels, `ec` to `ik` mapping, and articulatory positions)

### Usage Examples

### Basic Usage
```javascript
import { applySutra1_1_48, applyIkSubstitution, validateIkSubstitution, analyzeEcVowel, getIkSubstitute, analyzeVowelQualityChange } from './index.js';

// Example 1: Apply Sutra 1.1.48 to an 'e' vowel
const result1 = applySutra1_1_48('e');
console.log(result1.applies); // true
console.log(result1.ik_substitute.ik_substitute); // 'i'
console.log(result1.ik_substitute.substitution_type); // 'simple_shortening'

// Example 2: Apply Sutra 1.1.48 to an 'au' vowel
const result2 = applySutra1_1_48('au');
console.log(result2.applies); // true
console.log(result2.ik_substitute.ik_substitute); // 'u'
console.log(result2.ik_substitute.grammatical_process); // 'vriddhi_to_simple'

// Example 3: Apply ik substitution to a word
const wordSubstitution = applyIkSubstitution('देव', 'े');
console.log(wordSubstitution.success); // true
console.log(wordSubstitution.result_word); // 'दिव'

// Example 4: Validate a proposed substitution
const validation = validateIkSubstitution('ai', 'i');
console.log(validation.is_valid); // true
console.log(validation.sutra_compliance); // 'compliant'

// Example 5: Analyze vowel quality change
const qualityChange = analyzeVowelQualityChange('o', 'u');
console.log(qualityChange.length_change); // 'shortened'
console.log(qualityChange.articulatory_change); // 'back_series_preserved'
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **`applySutra1_1_48`**: Verifies the core logic for determining the `ik` substitute for `ec` vowels.
- **`analyzeEcVowel`**: Tests the accurate identification and classification of `ec` vowels.
- **`getIkSubstitute`**: Tests the correct mapping from `ec` to `ik` vowels and associated linguistic reasoning.
- **`analyzeVowelQualityChange`**: Validates the analysis of phonetic changes during substitution.
- **`applyIkSubstitution`**: Tests the practical application of the substitution within words, including handling multiple occurrences.
- **`validateIkSubstitution`**: Confirms the accuracy of the validation results for proposed substitutions.
- **Real Sanskrit Examples**: Includes tests with classical `ec` vowels and their `ik` substitutes in both IAST and Devanagari.
- **Edge Cases**: Handles `null`, `undefined`, empty strings, non-`ec` vowels, and consonants gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.48

# Run with coverage
npm test sutras/1.1.48 -- --coverage
```

## Technical Details

### Algorithm
1.  **`applySutra1_1_48`**: This function first calls `analyzeEcVowel` to confirm the `originalVowel` is an `ec` vowel. If it is, it then calls `getIkSubstitute` to find the corresponding `ik` substitute. It then returns a comprehensive analysis object.
2.  **`analyzeEcVowel`**: This function looks up the `vowel` in a predefined map (`SanskritWordLists.ecVowels`) to determine if it's an `ec` vowel and retrieves its type and base composition.
3.  **`getIkSubstitute`**: This function looks up the `ecVowel` in a predefined mapping (`SanskritWordLists.ecToIkMapping`) to find its `ik` substitute and associated linguistic details.
4.  **`analyzeVowelQualityChange`**: This function compares the articulatory positions of the original `ec` vowel and its `ik` substitute (using `SanskritWordLists.articulatoryPositions`) to determine if the front or back vowel series is preserved.
5.  **`applyIkSubstitution`**: This function takes a `word` and an `ecVowel` to be substituted. It uses `String.prototype.replace()` with a regular expression to replace all occurrences of the `ecVowel` with its `ik` substitute.

### Performance
- **Time Complexity**: O(L) where L is the length of the word for `applyIkSubstitution` (due to string replacement). Other operations are O(1) as they involve string comparisons and object lookups against fixed-size lists.
- **Space Complexity**: O(L) for `applyIkSubstitution` (due to new string creation). Other operations are O(1).

### Edge Cases
- **Multiple Occurrences**: `applyIkSubstitution` handles multiple occurrences of the `ec` vowel within a word.
- **Case Sensitivity**: The implementation normalizes input to lowercase for consistent matching.

## Integration

### Related Sutras
- **Sutra 1.1.1 (वृद्धिरादैच्)** and **Sutra 1.1.2 (अदेङ् गुणः)**: This sutra builds upon the concepts of `guṇa` and `vṛddhi` by specifying how `ec` vowels (which are `guṇa` or `vṛddhi` forms) are shortened to their `ik` counterparts.
- **Sutra 1.1.3 (इको गुणवृद्धी)**: This sutra states that `guṇa`/`vṛddhi` apply to `ik` vowels. Sutra 1.1.48 specifies the reverse process: how `ec` vowels (derived from `ik` vowels) revert to `ik` when shortening is required.
- This rule is fundamental for the correct derivation of various word forms in Sanskrit, particularly those involving vowel shortening or `samprasāraṇa` (vowel-to-semivowel conversion).

### Used By
- Any module in the Panini engine that performs vowel shortening, `samprasāraṇa`, or any operation requiring an `ec` vowel to be replaced by a short `ik` vowel will need to consult this sutra to ensure the correct substitution.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.48
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and leverages shared `sanskrit-utils` for robust phonetic analysis.
- **Test References**: Test cases are designed to validate the precise mapping of `ec` vowels to their `ik` substitutes and the correct application of this shortening rule in various contexts.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
