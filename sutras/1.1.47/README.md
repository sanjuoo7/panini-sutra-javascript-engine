# Sutra 1.1.47: मिदचो ऽन्त्यात् परः

## Overview

**Sanskrit Text**: `मिदचो ऽन्त्यात् परः`
**Transliteration**: midaco 'ntyāt paraḥ
**Translation**: Mid (substitute) comes after the final sound.

## Purpose

This `paribhāṣā` (meta-rule) sutra clarifies the placement of a `mid` (मिद्) substitute in Pāṇini's grammar. A `mid` is a technical term for a substitute element that is marked with the indicatory letter `m` (म्). This sutra dictates that such a `mid` substitute is always placed immediately **after** (`paraḥ`) the final (`antyāt`) sound of the original word or stem, rather than replacing the entire word or being placed elsewhere. This rule is crucial for correctly applying various morphological operations, ensuring the precise formation of words through substitution.

## Implementation

### Function Signature
```javascript
function applySutra1_1_47(originalWord, substitute, context) {
    // Implementation details
}
```

### Key Features
- **`Mid` Substitution Application**: The `applySutra1_1_47` function (and its wrapper `applyMidSubstitution`) performs the core operation of placing the `substitute` element directly after the `originalWord`'s final sound.
- **Substitution Type Analysis**: The `determineMidType` function categorizes the substitution based on common patterns (e.g., declension, conjugation, derivation, sandhi).
- **Potential Substitution Identification**: The `identifyMidSubstitutions` function suggests appropriate `mid` substitutes based on the morphological process (e.g., declension, conjugation) and the final sound of the word.
- **Comprehensive Validation**: The `validateMidSubstitution` function provides a detailed validation of a proposed `mid` substitution, checking for phonetic compatibility, morphological validity, and contextual appropriateness.

### Dependencies
- **Sanskrit Utils**:
  - `SanskritWordLists` from `sanskrit-utils/constants.js` (for substitution patterns and lists of substitutes for various processes)

### Usage Examples

### Basic Usage
```javascript
import { applySutra1_1_47, applyMidSubstitution, identifyMidSubstitutions, validateMidSubstitution, testSutra1_1_47 } from './index.js';

// Example 1: Apply Sutra 1.1.47 for a basic substitution
const result1 = applySutra1_1_47('राम', 'स्य');
console.log(result1.applies); // true
console.log(result1.mid_analysis.result_after_mid); // 'रामस्य'
console.log(result1.mid_analysis.original_final); // 'म'

// Example 2: Perform the substitution using applyMidSubstitution
const application = applyMidSubstitution('गुण', 'त्व');
console.log(application.applies); // true
console.log(application.substitution_result.result); // 'गुणत्व'

// Example 3: Identify potential mid substitutions for a word in declension
const potentialSubs = identifyMidSubstitutions('राजन्', 'declension');
console.log(potentialSubs.final_sound); // 'न्'
console.log(potentialSubs.potential_substitutes); // ['सु', 'औ', 'जस्', ...]

// Example 4: Validate a mid substitution
const validation = validateMidSubstitution('कवि', 'ता', { morphological_process: 'derivation' });
console.log(validation.is_valid); // true
console.log(validation.grammatical_properties.result); // 'कविता'
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **`applySutra1_1_47`**: Verifies the core logic for placing the `mid` substitute after the final sound.
- **`analyzeMidSubstitution`**: Tests the detailed analysis of `mid` substitution, including original final sound, word without final, and the resulting word.
- **`determineMidType`**: Tests the categorization of substitution types.
- **`applyMidSubstitution`**: Tests the practical application of the substitution.
- **`identifyMidSubstitutions`**: Tests the suggestion of relevant `mid` substitutes based on morphological process and final sound.
- **`validateMidSubstitution`**: Confirms the accuracy of the validation results, including phonetic, morphological, and contextual checks.
- **Real Sanskrit Examples**: Includes tests with classical words and various types of substitutions (nominal, verbal, adjectival).
- **Edge Cases**: Handles `null`, `undefined`, empty strings, and single-character words gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.47

# Run with coverage
npm test sutras/1.1.47 -- --coverage
```

## Technical Details

### Algorithm
1.  **`applySutra1_1_47`**: This function takes the `originalWord` and `substitute`. It extracts the final sound of the `originalWord` and then concatenates the `originalWord` with the `substitute` to form the `result_after_mid`. It then calls `analyzeMidSubstitution` for detailed analysis.
2.  **`analyzeMidSubstitution`**: This function performs the core logic of the sutra. It identifies the final sound of the `originalWord` and constructs the new word by appending the `substitute`. It also calls `determineMidType` to categorize the substitution.
3.  **`determineMidType`**: This function looks up the `substitute` in a predefined map (`SanskritWordLists.substitutionPatterns`) to identify its type (e.g., `declension_ending`, `verbal_suffix`).
4.  **`identifyMidSubstitutions`**: This function determines the `morphProcess` (e.g., `declension`, `conjugation`) and then retrieves a list of `potential_substitutes` from predefined lists (`SanskritWordLists.declensionSubstitutes`, etc.) based on the `final_sound` of the `word`.
5.  **`validateMidSubstitution`**: This function performs a series of checks (`checkPhoneticCompatibility`, `checkMorphologicalValidity`, `checkContextualAppropriateness`) to ensure the proposed substitution is grammatically valid and appropriate for the given context.

### Performance
- **Time Complexity**: O(1) - Operations involve string indexing, concatenation, and object lookups against fixed-size lists, resulting in constant time complexity.
- **Space Complexity**: O(1) - Memory usage is minimal and constant, as the lists are predefined constants.

### Edge Cases
- **Single-Character Words**: The implementation correctly handles words consisting of a single character, where the substitute is appended directly.
- **Context Dependency**: The validation functions rely on context for more nuanced checks (e.g., `morphological_process`, `grammar_context`).

## Integration

### Related Sutras
- This `paribhāṣā` (meta-rule) is crucial for understanding how various morphological rules that involve `mid` substitutes are applied. It provides the precise placement rule for these elements.
- It is implicitly used by numerous `vidhi` (rule) sutras that prescribe substitutions in declension, conjugation, derivation, and Sandhi processes.

### Used By
- Any module in the Panini engine that performs morphological analysis, word formation, or applies rules involving sound substitutions will need to consult this sutra to correctly place `mid` substitutes after the final sound of the original element.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.47
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and leverages shared `sanskrit-utils` for robust linguistic analysis.
- **Test References**: Test cases are designed to validate the precise placement of `mid` substitutes and the grammatical validity of such operations, covering various types of words and morphological processes.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
