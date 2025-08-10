# Sutra 1.1.40: क्त्वातोसुन्कसुनः

## Overview

**Sanskrit Text**: `क्त्वातोसुन्कसुनः`
**Transliteration**: ktvātosuṅkasunḥ
**Translation**: The words ending in क्त्व, तोसुन्, and कसुन् are अव्यय or indeclinables.

## Purpose

This `saṃjñā` (definition) sutra further expands the class of `avyaya` (अव्यय), or indeclinable words, in Sanskrit. It specifically states that words formed with the `ktvā` (क्त्वा), `tosun` (तोसुन्), and `kasun` (कसुन्) affixes are classified as `avyaya`. These affixes primarily form verbal derivatives: `ktvā` forms absolutives (gerunds), while `tosun` and `kasun` form more specialized verbal nouns. This rule ensures that these common and specialized verbal derivatives maintain their invariant form in all grammatical contexts.

## Implementation

### Function Signature
```javascript
function applySutra1_1_40(word, context) {
    // Implementation details
}
```

### Key Features
- **Affix Identification**: The `analyzeQualifyingAffixes` function identifies words ending in `ktvā`, `tosun`, or `kasun` affixes through pattern matching and contextual information.
- **`Avyaya` Classification**: The `applySutra1_1_40` function classifies such words as `avyaya` (indeclinable).
- **`Ktvā` Form Detection**: The `isKtvaForm` helper specifically identifies common `ktvā` (absolutive) patterns.
- **Validation and Usage Notes**: The `validateSpecificAffix1_1_40` function confirms the `avyaya` status and provides specific usage notes and examples for each affix type.

### Dependencies
- **Sanskrit Utils**:
  - `SanskritWordLists` from `sanskrit-utils/constants.js` (for affix patterns and word lists)

### Usage Examples

### Basic Usage
```javascript
import { applySutra1_1_40, analyzeQualifyingAffixes, isKtvaForm, validateSpecificAffix1_1_40, getUsageNote, getExamples } from './index.js';

// Example 1: Apply Sutra 1.1.40 to a ktvā form
const result1 = applySutra1_1_40('gatvā');
console.log(result1.applies); // true
console.log(result1.avyaya_status); // true
console.log(result1.affix_type); // 'ktvā'

// Example 2: Analyze qualifying affixes
const affixAnalysis = analyzeQualifyingAffixes('kṛtvā');
console.log(affixAnalysis.has_qualifying_affix); // true
console.log(affixAnalysis.affix_type); // 'ktvā'

// Example 3: Detect ktvā form
console.log(isKtvaForm('bhuktvā')); // true
console.log(isKtvaForm('gacchati')); // false

// Example 4: Validate avyaya status and get usage notes
const validation = validateSpecificAffix1_1_40('kṛtvā');
console.log(validation.is_avyaya); // true
console.log(validation.usage_note); // 'Used as absolutive/gerund...'
console.log(getExamples('ktvā')); // [{ word: 'gatvā', ... }, ...]
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **`applySutra1_1_40`**: Verifies the core logic for classifying words with `ktvā`, `tosun`, or `kasun` affixes as `avyaya`.
- **`analyzeQualifyingAffixes`**: Tests the identification of these specific affixes through patterns and context.
- **`isKtvaForm`**: Tests the detection of common `ktvā` (absolutive) patterns.
- **`validateSpecificAffix1_1_40`**: Validates the assertion of invariance for `avyaya` words derived from these affixes, including usage notes.
- **Real Sanskrit Examples**: Includes tests with classical `ktvā` forms.
- **Edge Cases**: Handles `null`, `undefined`, empty strings, and words without qualifying affixes gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.40

# Run with coverage
npm test sutras/1.1.40 -- --coverage
```

## Technical Details

### Algorithm
1.  **`applySutra1_1_40`**: This function calls `analyzeQualifyingAffixes` to determine if the input `word` ends in `ktvā`, `tosun`, or `kasun`. If a qualifying affix is found, the word is classified as `avyaya`.
2.  **`analyzeQualifyingAffixes`**: This function checks for explicit affix information in the `context`. If not present, it attempts to match the `word` against predefined patterns for `ktvā`, `tosun`, and `kasun` (`SanskritWordLists.sutra140AffixPatterns`).
3.  **`isKtvaForm`**: This helper function specifically checks for common `ktvā` patterns (`SanskritWordLists.ktvaPatterns`) or explicit `absolutive`/`gerund` type in the `context`.

### Performance
- **Time Complexity**: O(1) - Operations involve string comparisons and array/regex lookups against fixed-size lists and patterns, resulting in constant time complexity.
- **Space Complexity**: O(1) - Memory usage is minimal and constant, as the lists and patterns are predefined constants.

### Edge Cases
- **Rare Affixes**: `tosun` and `kasun` are rare in classical Sanskrit. The implementation relies on pattern matching for these, which might require refinement if more examples become available.
- **Context Dependency**: The functions can leverage explicit `affixes` or `word_type` information in the `context` for more accurate classification.

## Integration

### Related Sutras
- **Sutra 1.1.37 (स्वरादिनिपातमव्ययम्)**, **Sutra 1.1.38 (तद्धितश्चासर्वविभक्तिः)**, and **Sutra 1.1.39 (कृन्मेजन्तः)**: This sutra adds another specific category of words to the `avyaya` class, focusing on particular verbal derivatives.
- This rule is crucial for understanding the invariant nature of absolutives and other specialized verbal forms in Sanskrit.

### Used By
- Any module in the Panini engine that performs morphological analysis, declension, or sentence parsing will need to consult this sutra to correctly identify `avyaya` words derived from `ktvā`, `tosun`, or `kasun` affixes and ensure they are not subjected to inflectional changes.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.40
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and leverages shared `sanskrit-utils` for robust word classification.
- **Test References**: Test cases are designed to validate the precise identification of words formed with `ktvā`, `tosun`, and `kasun` affixes as `avyaya`.

---

*Generated from template: SUTRA_README_TEMPLATE.md*