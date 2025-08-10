# Sutra 1.1.39: कृन्मेजन्तः

## Overview

**Sanskrit Text**: `कृन्मेजन्तः`
**Transliteration**: kṛnmejantaḥ
**Translation**: The words formed by those कृत् or primary affixes which end with a म् or in a ए, ओ, ऐ and औ are also अव्यय or indeclinables.

## Purpose

This `saṃjñā` (definition) sutra further expands the class of `avyaya` (अव्यय), or indeclinable words, in Sanskrit. It states that words formed with `kṛt` (कृत्, primary) affixes are classified as `avyaya` if these affixes (or the words themselves) end in specific sounds: `m` (म्), `e` (ए), `o` (ओ), `ai` (ऐ), or `au` (औ). This rule accounts for a significant number of indeclinable participles and verbal derivatives, ensuring their invariant form is correctly recognized within the grammatical system.

## Implementation

### Function Signature
```javascript
function applySutra1_1_39(word, context) {
    // Implementation details
}
```

### Key Features
- **`Kṛt` Affix Identification**: The `analyzeKrit` function identifies words formed with `kṛt` (primary) affixes through pattern matching (e.g., for absolutives, infinitives, participles) and contextual information.
- **Qualifying Ending Check**: The `analyzeKritEnding` function determines if the `kṛt` affix or the word itself ends in `m` (म्), `e` (ए), `o` (ओ), `ai` (ऐ), or `au` (औ).
- **`Avyaya` Classification**: The `applySutra1_1_39` function combines these checks to classify such words as `avyaya`.
- **Validation of Invariance**: The `validateKritAvyaya` function confirms the `avyaya` status and explains its implication for invariance.

### Dependencies
- **Sanskrit Utils**:
  - `SanskritWordLists` from `sanskrit-utils/constants.js` (for `kṛt` patterns and qualifying endings/affixes)

### Usage Examples

### Basic Usage
```javascript
import { applySutra1_1_39, analyzeKrit, analyzeKritEnding, validateKritAvyaya, testSutra1_1_39 } from './index.js';

// Example 1: Apply Sutra 1.1.39 to a kṛt word with qualifying ending
const context1 = { affixes: ['krit'] };
const result1 = applySutra1_1_39('gatvam', context1); // Absolutive with -tvam
console.log(result1.applies); // true
console.log(result1.avyaya_status); // true
console.log(result1.ending_type); // 'म्'

// Example 2: Analyze krit affix presence
const kritAnalysis = analyzeKrit('gantum'); // Infinitive with -tum
console.log(kritAnalysis.is_krit); // true
console.log(kritAnalysis.affix_type); // 'tum'

// Example 3: Analyze krit ending
const endingAnalysis = analyzeKritEnding({}, 'game'); // Word ending in -e
console.log(endingAnalysis.has_qualifying_ending); // true
console.log(endingAnalysis.ending_type); // 'ए'

// Example 4: Validate avyaya status
const validation = validateKritAvyaya('kṛtvā'); // Absolutive with -tvā (not a qualifying ending)
console.log(validation.is_avyaya); // false
console.log(validation.explanation); // 'Word may inflect normally...'
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **`applySutra1_1_39`**: Verifies the core logic for classifying `kṛt` words as `avyaya` based on their specific endings.
- **`analyzeKrit`**: Tests the identification of various `kṛt` affixes through patterns and context.
- **`analyzeKritEnding`**: Tests the determination of qualifying endings (`m`, `e`, `o`, `ai`, `au`) for `kṛt` forms.
- **`validateKritAvyaya`**: Validates the assertion of invariance for `avyaya` words derived from `kṛt` affixes.
- **Real Sanskrit Examples**: Includes tests with classical `kṛt` forms like absolutives and infinitives.
- **Edge Cases**: Handles `null`, `undefined`, empty strings, and words without `kṛt` affixes or non-qualifying endings gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.39

# Run with coverage
npm test sutras/1.1.39 -- --coverage
```

## Technical Details

### Algorithm
1.  **`applySutra1_1_39`**: This function first calls `analyzeKrit` to confirm the input `word` has a `kṛt` affix. If it does, it then calls `analyzeKritEnding` to check if the word (or its affix) ends in one of the qualifying sounds (`m`, `e`, `o`, `ai`, `au`). If both conditions are met, the word is classified as `avyaya`.
2.  **`analyzeKrit`**: This function checks for explicit `kṛt` information in the `context`. If not present, it attempts to match the `word` against predefined `kṛt` patterns (`SanskritWordLists.kritPatterns`) to identify the affix type (e.g., `tvā`, `tum`, `kta`).
3.  **`analyzeKritEnding`**: This function checks for explicit ending information in `krit_analysis`. If not present, it directly examines the end of the `word` for the qualifying patterns (`m`, `e`, `o`, `ai`, `au`) using `endsWith` and a predefined list of these endings.

### Performance
- **Time Complexity**: O(1) - Operations involve string comparisons and array/regex lookups against fixed-size lists and patterns, resulting in constant time complexity.
- **Space Complexity**: O(1) - Memory usage is minimal and constant, as the lists and patterns are predefined constants.

### Edge Cases
- **Context Dependency**: The `analyzeKrit` function can benefit from explicit `krit` affix information in the `context` for more accurate classification.
- **Ambiguity**: Some word endings might be ambiguous. The implementation prioritizes explicit `krit` patterns and then checks for the specific qualifying endings.

## Integration

### Related Sutras
- **Sutra 1.1.37 (स्वरादिनिपातमव्ययम्)** and **Sutra 1.1.38 (तद्धितश्चासर्वविभक्तिः)**: This sutra complements 1.1.37 and 1.1.38 by adding another major category of words to the `avyaya` class, specifically `kṛt` forms with particular endings.
- This rule is crucial for understanding the invariant nature of many absolutives, infinitives, and other verbal derivatives in Sanskrit.

### Used By
- Any module in the Panini engine that performs morphological analysis, declension, or sentence parsing will need to consult this sutra to correctly identify `avyaya` words derived from `kṛt` affixes and ensure they are not subjected to inflectional changes.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.39
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and leverages shared `sanskrit-utils` for robust word classification.
- **Test References**: Test cases are designed to validate the precise conditions under which `kṛt` words are classified as `avyaya`, covering various affix types and ending patterns.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
