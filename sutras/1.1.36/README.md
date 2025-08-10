# Sutra 1.1.36: विदेह विकरणा अकर्मकाः

## Overview

**Sanskrit Text**: `विदेह विकरणा अकर्मकाः`
**Transliteration**: videha vikaraṇā akarmakāḥ
**Translation**: Verbs without vikaraṇa are intransitive.

## Purpose

This `saṃjñā` (definition) sutra establishes a fundamental property of verbs in Pāṇini's system based on the presence or absence of `vikaraṇa` (thematic suffixes). It states that verbs which lack a `vikaraṇa` (i.e., `avikaraṇa` verbs, primarily those from Class II - `adi-gaṇa` and Class III - `hu-gaṇa`) are generally `akarmaka` (अकर्मक), meaning they are intransitive and do not take a direct object. This classification is crucial for understanding the syntactic behavior of these verbs and their role in sentence construction.

## Implementation

### Function Signature
```javascript
function applySutra1_1_36(verb, context) {
    // Implementation details
}
```

### Key Features
- **`Avikaraṇa` Verb Identification**: The `analyzeVikaranaPresence` function identifies verbs that lack `vikaraṇa` by checking against predefined lists of `avikaraṇa` verbs (Class II and III) and by analyzing inflection patterns.
- **Intransitivity Assertion**: The `applySutra1_1_36` function asserts that identified `avikaraṇa` verbs are generally intransitive, meaning they cannot take a direct object.
- **Contextual Analysis**: The `analyzeIntransitivityContext` function helps confirm intransitivity based on grammatical context (e.g., absence of an object, motion verbs, state verbs).
- **Exception Handling**: The implementation explicitly accounts for known `avikaraṇa` verbs that are exceptions to this rule and can be transitive (e.g., `dvis`, `śās`, `dā`, `hu`).
- **Validation and Properties**: The `validateAvikaranaIntransitive` function provides a comprehensive validation result, including a confidence score and detailed grammatical properties.

### Dependencies
- **Sanskrit Utils**:
  - `SanskritWordLists` from `sanskrit-utils/constants.js` (for `avikaraṇa` verb data, `vikaraṇa` patterns, and transitivity contexts)

### Usage Examples

### Basic Usage
```javascript
import { applySutra1_1_36, analyzeVikaranaPresence, validateAvikaranaIntransitive, testSutra1_1_36 } from './index.js';

// Example 1: Apply Sutra 1.1.36 to an avikaraṇa verb
const result1 = applySutra1_1_36('i', { grammatical_context: 'motion_verb' });
console.log(result1.applies); // true
console.log(result1.has_vikarana); // false
console.log(result1.is_intransitive); // true

// Example 2: Analyze vikaraṇa presence
const vikaranaAnalysis = analyzeVikaranaPresence('as');
console.log(vikaranaAnalysis.has_vikarana); // false
console.log(vikaranaAnalysis.verb_class); // 'Class II (adi)'

const vikaranaAnalysis2 = analyzeVikaranaPresence('gacchati'); // Verb with vikaraṇa
console.log(vikaranaAnalysis2.has_vikarana); // true

// Example 3: Validate intransitivity with confidence
const validation = validateAvikaranaIntransitive('ās', { grammatical_context: 'state_verb' });
console.log(validation.is_valid_application); // true
console.log(validation.can_be_intransitive); // true
console.log(validation.confidence); // (a value indicating confidence)
console.log(validation.usage_note); // Detailed explanation

// Example 4: Handle transitive exception
const exceptionValidation = validateAvikaranaIntransitive('dvis');
console.log(exceptionValidation.is_valid_application); // true
console.log(exceptionValidation.grammatical_properties.exceptions_exist); // true
console.log(exceptionValidation.confidence); // Lower confidence due to exception
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **`applySutra1_1_36`**: Verifies the core logic for identifying `avikaraṇa` verbs and asserting their intransitivity under various valid and invalid conditions.
- **`analyzeVikaranaPresence`**: Tests the identification of `avikaraṇa` verbs, `vikaraṇa` verbs, and handling of inflected forms and contextual information.
- **`analyzeIntransitivityContext`**: Validates the recognition of contexts that support intransitivity.
- **`validateAvikaranaIntransitive`**: Confirms the accuracy of the validation results, confidence scores, and proper handling of transitive exceptions.
- **Real Sanskrit Examples**: Includes tests with classical `avikaraṇa` verbs and their usage.
- **Edge Cases**: Handles `null`, `undefined`, empty strings, and unknown verb inputs gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.36

# Run with coverage
npm test sutras/1.1.36 -- --coverage
```

## Technical Details

### Algorithm
1.  **`applySutra1_1_36`**: This function first calls `analyzeVikaranaPresence` to determine if the input `verb` lacks a `vikaraṇa`. If it does, it then calls `analyzeIntransitivityContext` to confirm the intransitivity context. If both are affirmative, the sutra is considered applicable, and the verb is classified as intransitive.
2.  **`analyzeVikaranaPresence`**: This function uses a multi-layered approach: it checks for explicit `vikaraṇa` information in the `context`, then looks up the `verb` in predefined lists of `avikaraṇa` verbs (`SanskritWordLists.avikaranaVerbs`) and `vikaraṇa` verbs (`SanskritWordLists.vikaranaIndicators`). It also attempts to recognize inflected forms by matching against predefined inflection patterns (`SanskritWordLists.avikaranaInflectionPatterns`) and `vikaraṇa` patterns (`SanskritWordLists.vikaranaPatterns`).
3.  **`analyzeIntransitivityContext`**: This function checks for explicit `transitivity: 'intransitive'` in the `context`. If not present, it checks if the `context.grammatical_context` is one of the predefined contexts that indicate intransitivity (`SanskritWordLists.intransitivityContexts`). If no explicit context is given, it defaults to `inherent_avikarana`, asserting the inherent intransitivity of `avikaraṇa` verbs.

### Performance
- **Time Complexity**: O(1) - Operations involve string comparisons and array/regex lookups against fixed-size lists and patterns, resulting in constant time complexity.
- **Space Complexity**: O(1) - Memory usage is minimal and constant, as the lists and patterns are predefined constants.

### Edge Cases
- **Inflection Recognition**: While common inflected forms are recognized, a comprehensive morphological parser would be needed for all possible inflections. The current implementation focuses on typical patterns.
- **Transitive Exceptions**: The sutra states a general rule, but there are well-known `avikaraṇa` verbs that are transitive. The implementation explicitly handles these exceptions, which is crucial for accuracy.

## Integration

### Related Sutras
- This `saṃjñā` (definition) sutra is crucial for understanding the valency and syntactic behavior of `avikaraṇa` verbs. It interacts with rules for verb conjugation, voice, and sentence construction, as intransitive verbs behave differently from transitive ones.
- It complements Sutra 1.1.35 (`kṛṇvādayaḥ karmakāḥ`), which defines a class of transitive verbs.

### Used By
- Any module in the Panini engine that deals with verb conjugation, sentence parsing, or semantic analysis of verb arguments will need to consult this sutra to correctly identify the transitivity of `avikaraṇa` verbs.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.36
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and leverages shared `sanskrit-utils` for robust verb analysis.
- **Test References**: Test cases are designed to validate the precise identification of `avikaraṇa` verbs and the assertion of their inherent intransitivity, including handling of transitive exceptions.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
