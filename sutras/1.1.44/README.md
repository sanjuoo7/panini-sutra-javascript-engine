# Sutra 1.1.44: नञ्ञुपसर्गश्च

## Overview

**Sanskrit Text**: `नञ्ञुपसर्गश्च`
**Transliteration**: nañ-ñu-upasargaś-ca
**Translation**: And nañ, ñu, and upasarga (prefixes).

## Purpose

This `saṃjñā` (definition) sutra extends the scope of `sup` (सुप्, nominal case endings) to include three additional categories of elements: `nañ` (नञ्, the negative prefix, e.g., `a-`, `an-`), `ñu` (ञु, a specific class of suffixes, e.g., `-aka`, `-ika`), and `upasarga` (उपसर्ग, verbal prefixes, e.g., `pra-`, `vi-`). By classifying these elements as `sup`-like, Pāṇini indicates that they should be treated similarly to nominal case endings in certain grammatical operations, particularly those involving the stem to which they are attached. This rule is crucial for correctly analyzing the morphological and syntactic behavior of words containing these elements.

## Implementation

### Function Signature
```javascript
function applySutra1_1_44(word, context) {
    // Implementation details
}
```

### Key Features
- **Element Identification**: The `applySutra1_1_44` function identifies words containing `nañ` prefixes (`analyzeNañPrefix`), `ñu` suffixes (`analyzeÑuElement`), or `upasarga` prefixes (`analyzeUpasarga`).
- **`Sup`-like Behavior Assertion**: It asserts that words containing these elements exhibit `sup`-like behavior, meaning they influence the stem in ways similar to nominal case endings.
- **Grammatical Function Analysis**: The `analyzeGrammaticalFunction` function determines the specific grammatical role (e.g., negative modifier, verbal derivative, verbal modifier) of the word based on the identified element.
- **Validation and Properties**: The `validateNañÑuUpasarga` function provides a comprehensive validation result, including a confidence score and detailed grammatical properties.

### Dependencies
- **Sanskrit Utils**:
  - `SanskritWordLists` from `sanskrit-utils/constants.js` (for `nañ` prefixes, `ñu` patterns, and `upasarga` list)

### Usage Examples

### Basic Usage
```javascript
import { applySutra1_1_44, analyzeNañPrefix, analyzeÑuElement, analyzeUpasarga, analyzeGrammaticalFunction, validateNañÑuUpasarga, testSutra1_1_44 } from './index.js';

// Example 1: Apply Sutra 1.1.44 to a word with a nañ prefix
const result1 = applySutra1_1_44('adhama');
console.log(result1.applies); // true
console.log(result1.has_nañ); // true
console.log(result1.sup_like_behavior); // true

// Example 2: Analyze a ñu element
const ñuAnalysis = analyzeÑuElement('kāraka');
console.log(ñuAnalysis.has_ñu); // true
console.log(ñuAnalysis.suffix); // 'aka'

// Example 3: Analyze an upasarga
const upasargaAnalysis = analyzeUpasarga('pragam');
console.log(upasargaAnalysis.has_upasarga); // true
console.log(upasargaAnalysis.prefix); // 'pra'

// Example 4: Analyze grammatical function
const funcAnalysis = analyzeGrammaticalFunction('ananta');
console.log(funcAnalysis.function); // 'negative_modification'
console.log(funcAnalysis.role); // 'modifier'

// Example 5: Validate sup-like behavior
const validation = validateNañÑuUpasarga('vaidika');
console.log(validation.is_valid_application); // true
console.log(validation.confidence); // (a value indicating confidence)
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **`applySutra1_1_44`**: Verifies the core logic for identifying words with `nañ`, `ñu`, or `upasarga` and asserting their `sup`-like behavior.
- **`analyzeNañPrefix`**: Tests the identification of various `nañ` prefixes, including basic and complex forms.
- **`analyzeÑuElement`**: Tests the identification of `ñu` suffixes (both `kṛt` and `taddhita` types).
- **`analyzeUpasarga`**: Tests the identification of `upasarga` prefixes, including basic and complex forms.
- **`analyzeGrammaticalFunction`**: Validates the determination of grammatical function based on the identified elements.
- **`validateNañÑuUpasarga`**: Confirms the accuracy of the validation results, confidence scores, and grammatical properties.
- **Real Sanskrit Examples**: Includes tests with classical examples for `nañ`, `ñu`, and `upasarga`.
- **Edge Cases**: Handles `null`, `undefined`, empty strings, and words without these elements gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.44

# Run with coverage
npm test sutras/1.1.44 -- --coverage
```

## Technical Details

### Algorithm
1.  **`applySutra1_1_44`**: This function calls `analyzeNañPrefix`, `analyzeÑuElement`, and `analyzeUpasarga`. If any of these functions identify their respective elements in the `word`, the sutra is considered applicable, and the word is marked as exhibiting `sup`-like behavior.
2.  **`analyzeNañPrefix`**: This function checks for explicit `nañ` information in the `context`. If not present, it attempts to match the `word` against predefined `nañ` prefixes (`SanskritWordLists.nañPrefixes`). It includes special handling for the `a-` prefix to avoid false positives.
3.  **`analyzeÑuElement`**: This function checks for explicit `ñu` information in the `context`. If not present, it attempts to match the `word` against predefined `ñu` patterns (`SanskritWordLists.ñuPatterns`) to identify the suffix and its type (e.g., `kṛt`, `taddhita`).
4.  **`analyzeUpasarga`**: This function checks for explicit `upasarga` information in the `context`. If not present, it attempts to match the `word` against a sorted list of `upasarga` prefixes (`SanskritWordLists.upasargaList`), prioritizing longer matches.
5.  **`analyzeGrammaticalFunction`**: This function determines the grammatical function based on which of the `nañ`, `ñu`, or `upasarga` elements were identified.

### Performance
- **Time Complexity**: O(1) - Operations involve string comparisons and array/regex lookups against fixed-size lists and patterns, resulting in constant time complexity.
- **Space Complexity**: O(1) - Memory usage is minimal and constant, as the lists and patterns are predefined constants.

### Edge Cases
- **Ambiguity**: Some prefixes/suffixes might be ambiguous. The implementation prioritizes explicit context and longer pattern matches to reduce ambiguity.
- **Partial Matches**: The functions are designed to identify the elements even if they are part of a larger word, extracting the remainder for further analysis.

## Integration

### Related Sutras
- This `saṃjñā` (definition) sutra is crucial for understanding how `nañ`, `ñu`, and `upasarga` elements interact with nominal stems and verbal roots. It extends the scope of `sup`-related rules to these elements, influencing their morphological and syntactic behavior.
- It is fundamental for accurate parsing and generation of Sanskrit words, especially those involving negation, derivation, or verbal modification.

### Used By
- Any module in the Panini engine that performs morphological analysis, declension, or verbal conjugation will need to consult this sutra to correctly identify `nañ`, `ñu`, and `upasarga` elements and apply `sup`-like rules to them.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.44
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and leverages shared `sanskrit-utils` for robust word classification.
- **Test References**: Test cases are designed to validate the precise identification of `nañ`, `ñu`, and `upasarga` elements and their `sup`-like behavior, covering various forms and contexts.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
