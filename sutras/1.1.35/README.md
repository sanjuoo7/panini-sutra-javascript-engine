# Sutra 1.1.35: कृण्वादयः कर्मकाः

## Overview

**Sanskrit Text**: `कृण्वादयः कर्मकाः`
**Transliteration**: kṛṇvādayaḥ karmakāḥ
**Translation**: Kṛṇvādi verbs are transitive.

## Purpose

This `saṃjñā` (definition) sutra establishes a fundamental property of verbs belonging to the `kṛṇvādi` gaṇa (Class V verbs in Pāṇini's system). It states that these verbs are inherently `karmaka` (कर्मक), meaning they are transitive and typically take a direct object. This classification is crucial for understanding the syntactic behavior of these verbs, particularly in sentence construction and the application of voice (active, middle, passive) rules.

## Implementation

### Function Signature
```javascript
function applySutra1_1_35(verb, context) {
    // Implementation details
}
```

### Key Features
- **`Kṛṇvādi` Verb Identification**: The `analyzeKrinvadiVerb` function identifies verbs belonging to Class V based on a predefined list of roots (e.g., `kṛ`, `śru`, `brū`) and common inflected forms (e.g., `karoti`, `śṛṇoti`).
- **Inherent Transitivity Assertion**: The `applySutra1_1_35` function asserts that identified `kṛṇvādi` verbs are transitive (`karmaka`), meaning they can take a direct object.
- **Contextual Analysis**: The `analyzeTransitivityContext` function helps confirm the transitivity based on grammatical context (e.g., presence of an object, causative constructions).
- **Validation and Properties**: The `validateKrinvadiTransitive` function provides a comprehensive validation result, including a confidence score, usage notes, and detailed grammatical properties (e.g., typical objects, voice options).

### Dependencies
- **Sanskrit Utils**:
  - `SanskritWordLists` from `sanskrit-utils/constants.js` (for `kṛṇvādi` verb data, inflection patterns, and root mappings)

### Usage Examples

### Basic Usage
```javascript
import { applySutra1_1_35, analyzeKrinvadiVerb, validateKrinvadiTransitive, testSutra1_1_35 } from './index.js';

// Example 1: Apply Sutra 1.1.35 to a kṛṇvādi verb
const result1 = applySutra1_1_35('kṛ', { grammatical_context: 'object_present' });
console.log(result1.applies); // true
console.log(result1.is_krinvadi); // true
console.log(result1.is_transitive); // true

// Example 2: Analyze a kṛṇvādi verb
const verbAnalysis = analyzeKrinvadiVerb('śru');
console.log(verbAnalysis.is_krinvadi); // true
console.log(verbAnalysis.root); // 'śru'
console.log(verbAnalysis.meaning); // 'to hear'

// Example 3: Validate transitivity with confidence
const validation = validateKrinvadiTransitive('brū', { grammatical_context: 'syntactic_analysis' });
console.log(validation.is_valid_application); // true
console.log(validation.can_be_transitive); // true
console.log(validation.confidence); // (a value indicating confidence)
console.log(validation.usage_note); // Detailed explanation

// Example 4: Comprehensive test function
const testResult = testSutra1_1_35('kṛ', { grammatical_context: 'object_present' });
console.log(testResult.analysis.is_transitive); // true
console.log(testResult.validation.can_be_transitive); // true
console.log(testResult.examples.krinvadi_roots); // ['kṛ', 'śru', ...]
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **`applySutra1_1_35`**: Verifies the core logic for identifying `kṛṇvādi` verbs and asserting their transitivity under various valid and invalid conditions.
- **`analyzeKrinvadiVerb`**: Tests the identification of `kṛṇvādi` verbs, including core roots, inflected forms, and handling of context-provided information.
- **`analyzeTransitivityContext`**: Validates the recognition of contexts that support transitivity.
- **`validateKrinvadiTransitive`**: Confirms the accuracy of the validation results, confidence scores, and grammatical properties.
- **Real Sanskrit Examples**: Includes tests with classical `kṛṇvādi` verbs and their usage in sentences.
- **Edge Cases**: Handles `null`, `undefined`, empty strings, and non-`kṛṇvādi` verb inputs gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.35

# Run with coverage
npm test sutras/1.1.35 -- --coverage
```

## Technical Details

### Algorithm
1.  **`applySutra1_1_35`**: This function first calls `analyzeKrinvadiVerb` to determine if the input `verb` belongs to the `kṛṇvādi` gaṇa. If it does, it then calls `analyzeTransitivityContext` to confirm the transitivity context. If both are affirmative, the sutra is considered applicable, and the verb is classified as transitive.
2.  **`analyzeKrinvadiVerb`**: This function uses a multi-layered approach: it checks for explicit `kṛṇvādi` information in the `context`, then looks up the `verb` in a predefined list of `kṛṇvādi` verbs (`SanskritWordLists.krinvadiVerbs`). It also attempts to recognize inflected forms by matching against predefined inflection patterns (`SanskritWordLists.krinvadiInflectionPatterns`) and mapping them to their roots.
3.  **`analyzeTransitivityContext`**: This function checks for explicit `transitivity: 'transitive'` in the `context`. If not present, it checks if the `context.grammatical_context` is one of the predefined contexts that indicate transitivity (`SanskritWordLists.krinvadiTransitivityContexts`). If no explicit context is given, it defaults to `inherent_krinvadi`, asserting the inherent transitivity of `kṛṇvādi` verbs.

### Performance
- **Time Complexity**: O(1) - Operations involve string comparisons and array/regex lookups against fixed-size lists and patterns, resulting in constant time complexity.
- **Space Complexity**: O(1) - Memory usage is minimal and constant, as the lists and patterns are predefined constants.

### Edge Cases
- **Inflection Recognition**: While common inflected forms are recognized, a comprehensive morphological parser would be needed for all possible inflections. The current implementation focuses on typical patterns.
- **Context Dependency**: The rule's application can be influenced by the provided `context`. Without appropriate context, the analysis relies on inherent classification.

## Integration

### Related Sutras
- This `saṃjñā` (definition) sutra is crucial for understanding the valency and syntactic behavior of `kṛṇvādi` verbs. It interacts with rules for verb conjugation, voice (active, middle, passive), and sentence construction, as transitive verbs behave differently from intransitive ones.

### Used By
- Any module in the Panini engine that deals with verb conjugation, sentence parsing, or semantic analysis of verb arguments will need to consult this sutra to correctly identify the transitivity of `kṛṇvādi` verbs.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.35
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and leverages shared `sanskrit-utils` for robust verb analysis.
- **Test References**: Test cases are designed to validate the precise identification of `kṛṇvādi` verbs and the assertion of their inherent transitivity, covering various forms and contexts.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
