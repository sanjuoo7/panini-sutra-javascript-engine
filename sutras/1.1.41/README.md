# Sutra 1.1.41: अव्ययीभावश्च

## Overview

**Sanskrit Text**: `अव्ययीभावश्च`
**Transliteration**: avyayībhāvaśca
**Translation**: And अव्ययीभाव compounds are also अव्यय (indeclinables).

## Purpose

This `saṃjñā` (definition) sutra further expands the class of `avyaya` (अव्यय), or indeclinable words, in Sanskrit. It specifically states that `avyayībhāva` (अव्ययीभाव) compounds are classified as `avyaya`. An `avyayībhāva` compound is typically formed when an indeclinable (`avyaya`) word is the first member, and the entire compound then functions as an indeclinable, often with an adverbial meaning. This rule is crucial for recognizing and correctly handling these compounds, as they maintain a constant form regardless of case, number, or gender.

## Implementation

### Function Signature
```javascript
function applySutra1_1_41(word, context) {
    // Implementation details
}
```

### Key Features
- **`Avyayībhāva` Compound Identification**: The `analyzeAvyayībhāva` function identifies `avyayībhāva` compounds based on explicit contextual information, analysis of compound members (ensuring the first member is an `avyaya`), and pattern matching against known `avyayībhāva` structures.
- **`Avyaya` Classification**: The `applySutra1_1_41` function classifies the entire compound as `avyaya` (indeclinable).
- **Pattern Analysis**: The `analyzeAvyayībhāvaPatterns` function provides insights into the structure and common types of `avyayībhāva` compounds (e.g., spatial, temporal, manner).
- **First Member Extraction**: The `extractFirstMember` helper function attempts to identify the initial `avyaya` component of the compound.
- **Validation and Usage Notes**: The `validateAvyayībhāva1_1_41` function confirms the `avyaya` status and provides specific usage notes and examples.

### Dependencies
- **Sanskrit Utils**:
  - `SanskritWordLists` from `sanskrit-utils/constants.js` (for known `avyayībhāva` compounds, `avyaya` prefixes, and common `avyaya` elements)

### Usage Examples

### Basic Usage
```javascript
import { applySutra1_1_41, analyzeAvyayībhāva, analyzeAvyayībhāvaPatterns, isAvyayaElement, extractFirstMember, validateAvyayībhāva1_1_41, getCompoundExamples } from './index.js';

// Example 1: Apply Sutra 1.1.41 to an avyayībhāva compound
const result1 = applySutra1_1_41('pratidinam', { compound_type: 'avyayībhāva' });
console.log(result1.applies); // true
console.log(result1.avyaya_status); // true
console.log(result1.compound_type); // 'avyayībhāva'
console.log(result1.first_member); // 'prati'

// Example 2: Analyze avyayībhāva compound
const compoundAnalysis = analyzeAvyayībhāva('adhigaṅgam');
console.log(compoundAnalysis.is_avyayībhāva); // true
console.log(compoundAnalysis.first_member); // 'adhi'

// Example 3: Analyze avyayībhāva patterns
const patternAnalysis = analyzeAvyayībhāvaPatterns('upanagaraṃ');
console.log(patternAnalysis.is_likely_avyayībhāva); // true
console.log(patternAnalysis.first_member); // 'upa'

// Example 4: Check if an element is avyaya
console.log(isAvyayaElement('prati')); // true
console.log(isAvyayaElement('nagara')); // false

// Example 5: Validate avyayībhāva status
const validation = validateAvyayībhāva1_1_41('anukūlam');
console.log(validation.is_avyaya); // true
console.log(validation.usage_note); // 'Indicates following...'
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **`applySutra1_1_41`**: Verifies the core logic for classifying `avyayībhāva` compounds as `avyaya`.
- **`analyzeAvyayībhāva`**: Tests the identification of `avyayībhāva` compounds through explicit context, member analysis, and pattern matching.
- **`analyzeAvyayībhāvaPatterns`**: Tests the detection of various `avyayībhāva` patterns and known compounds.
- **`isAvyayaElement`**: Tests the identification of common `avyaya` elements that form the first member of these compounds.
- **`extractFirstMember`**: Tests the extraction of the first member from compound words.
- **`validateAvyayībhāva1_1_41`**: Validates the assertion of invariance for `avyayībhāva` compounds, including usage notes and structural information.
- **Real Sanskrit Examples**: Includes tests with classical spatial, temporal, and manner `avyayībhāva` compounds.
- **Edge Cases**: Handles `null`, `undefined`, empty strings, and non-compound inputs gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.41

# Run with coverage
npm test sutras/1.1.41 -- --coverage
```

## Technical Details

### Algorithm
1.  **`applySutra1_1_41`**: This function calls `analyzeAvyayībhāva` to determine if the input `word` is an `avyayībhāva` compound. If it is, the compound is classified as `avyaya`.
2.  **`analyzeAvyayībhāva`**: This function first checks for explicit `avyayībhāva` classification in the `context`. If not present, it checks if the `context` provides `members` and if the first member is an `avyaya` (using `isAvyayaElement`). Finally, it attempts to match the `word` against predefined `avyayībhāva` patterns (`analyzeAvyayībhāvaPatterns`).
3.  **`analyzeAvyayībhāvaPatterns`**: This function checks if the `word` is a known `avyayībhāva` compound. If not, it attempts to match the `word` against common `avyaya` prefixes (`SanskritWordLists.avyayaPrefixes`) followed by a nominal stem.
4.  **`isAvyayaElement`**: This helper function checks if an `element` is in a predefined list of common `avyaya` elements or if it's explicitly marked as `avyaya` in the `context`.
5.  **`extractFirstMember`**: This function attempts to extract the first member of a compound by checking for known compound prefixes or by a simple length-based heuristic.

### Performance
- **Time Complexity**: O(1) - Operations involve string comparisons and array/regex lookups against fixed-size lists and patterns, resulting in constant time complexity.
- **Space Complexity**: O(1) - Memory usage is minimal and constant, as the lists and patterns are predefined constants.

### Edge Cases
- **Compound Parsing**: Accurate identification of `avyayībhāva` compounds can be complex without a full Sanskrit parser. The current implementation relies on explicit context and pattern matching, which covers common cases.
- **Ambiguity**: Some compounds might be ambiguous without semantic context. The `confidence` score in `analyzeAvyayībhāvaPatterns` helps indicate the certainty of the pattern match.

## Integration

### Related Sutras
- **Sutra 1.1.37 (स्वरादिनिपातमव्ययम्)**, **Sutra 1.1.38 (तद्धितश्चासर्वविभक्तिः)**, **Sutra 1.1.39 (कृन्मेजन्तः)**, and **Sutra 1.1.40 (क्त्वातोसुन्कसुनः)**: This sutra adds `avyayībhāva` compounds as another significant category to the `avyaya` class.
- This rule is crucial for understanding the invariant nature of many adverbial compounds in Sanskrit.

### Used By
- Any module in the Panini engine that performs morphological analysis, declension, or sentence parsing will need to consult this sutra to correctly identify `avyayībhāva` compounds and ensure they are not subjected to inflectional changes.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.41
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and leverages shared `sanskrit-utils` for robust compound analysis.
- **Test References**: Test cases are designed to validate the precise identification of `avyayībhāva` compounds and their classification as `avyaya`, covering various structural and semantic types.

---

*Generated from template: SUTRA_README_TEMPLATE.md*