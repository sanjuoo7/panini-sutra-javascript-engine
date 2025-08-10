# Sutra 1.1.37: स्वरादिनिपातमव्ययम्

## Overview

**Sanskrit Text**: `स्वरादिनिपातमव्ययम्`
**Transliteration**: svarādinipātamavyayam
**Translation**: The words स्वर् 'heaven' etc. and the particles are called अव्यय or indeclinables.

## Purpose

This `saṃjñā` (definition) sutra defines the class of `avyaya` (अव्यय), or indeclinable words, in Sanskrit. It states that words belonging to the `svarādi` (स्वरादि) group (starting with `svar` - स्वर्, 'heaven', and others) and all `nipātas` (निपात, particles) are classified as `avyaya`. `Avyaya` words are crucial in Sanskrit grammar because they do not undergo inflection for case, number, or gender, maintaining a constant form regardless of their grammatical context.

## Implementation

### Function Signature
```javascript
function applySutra1_1_37(word, context) {
    // Implementation details
}
```

### Key Features
- **`Avyaya` Classification**: The `applySutra1_1_37` function determines if a word is `avyaya` by checking if it belongs to the `svarādi` class or is a `nipāta`.
- **`Nipāta` Identification**: The `isNipata` function identifies particles based on a predefined list of common `nipātas` and contextual clues.
- **`Svarādi` Identification**: The `isSvaradi` function identifies words from the `svarādi` group, including `svar` and other words that behave similarly.
- **Category Determination**: The `getAvyayaCategory` function specifies whether an `avyaya` word is a `nipāta` or a `svarādi`.
- **Validation of Invariance**: The `validateAvyaya` function confirms that `avyaya` words should remain invariant across inflections.

### Dependencies
- **Sanskrit Utils**:
  - `SanskritWordLists` from `sanskrit-utils/constants.js` (for `nipāta` and `svarādi` word lists and prefixes)

### Usage Examples

### Basic Usage
```javascript
import { applySutra1_1_37, isNipata, isSvaradi, getAvyayaCategory, validateAvyaya, testSutra1_1_37 } from './index.js';

// Example 1: Apply Sutra 1.1.37 to a nipāta
const result1 = applySutra1_1_37('ca', { type: 'nipata' });
console.log(result1.applies); // true
console.log(result1.avyaya_status); // true
console.log(result1.category); // 'nipata'

// Example 2: Apply Sutra 1.1.37 to a svarādi word
const result2 = applySutra1_1_37('svar', { type: 'svaradi' });
console.log(result2.applies); // true
console.log(result2.avyaya_status); // true
console.log(result2.category); // 'svaradi'

// Example 3: Check if a word is a nipāta
console.log(isNipata('eva', {})); // true
console.log(isNipata('rāma', {})); // false

// Example 4: Check if a word is svarādi
console.log(isSvaradi('punar', {})); // true
console.log(isSvaradi('gacchati', {})); // false

// Example 5: Validate avyaya status
const validation = validateAvyaya('api', { type: 'nipata' });
console.log(validation.is_avyaya); // true
console.log(validation.should_be_invariant); // true
console.log(validation.explanation); // 'Word should remain unchanged...'
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **`applySutra1_1_37`**: Verifies the core logic for classifying words as `avyaya` based on `nipāta` or `svarādi` status.
- **`isNipata`**: Tests the identification of various `nipātas`, including common particles and those identified by context.
- **`isSvaradi`**: Tests the identification of `svarādi` words, including base forms and those with `svarādi` prefixes.
- **`getAvyayaCategory`**: Confirms the correct categorization of `avyaya` words.
- **`validateAvyaya`**: Validates the assertion of invariance for `avyaya` words.
- **Edge Cases**: Handles `null`, `undefined`, empty strings, and non-`avyaya` inputs gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.37

# Run with coverage
npm test sutras/1.1.37 -- --coverage
```

## Technical Details

### Algorithm
1.  **`applySutra1_1_37`**: This function first calls `isNipata`. If `true`, it classifies the word as `avyaya` of category `nipata`. If not, it calls `isSvaradi`. If `true`, it classifies the word as `avyaya` of category `svaradi`. Otherwise, the word is not `avyaya` by this sutra.
2.  **`isNipata`**: This function checks for explicit `nipata` classification in the `context`. If not present, it checks if the `word` is in a predefined list of `nipāta` words (`SanskritWordLists.nipataWordsAvyaya`).
3.  **`isSvaradi`**: This function checks for explicit `svaradi` classification in the `context`. If not present, it checks if the `word` is in a predefined list of `svarādi` words (`SanskritWordLists.svaradiWords`) or if it starts with any of the predefined `svarādi` prefixes (`SanskritWordLists.svaradiPrefixes`).
4.  **`getAvyayaCategory`**: This function simply calls `isNipata` and `isSvaradi` to determine the specific category.
5.  **`validateAvyaya`**: This function uses the result of `applySutra1_1_37` to assert the `avyaya` status and provide an explanation of its invariant nature.

### Performance
- **Time Complexity**: O(1) - Operations involve string comparisons and array lookups against fixed-size lists and prefixes, resulting in constant time complexity.
- **Space Complexity**: O(1) - Memory usage is minimal and constant, as the lists are predefined constants.

### Edge Cases
- **Context Dependency**: The functions can leverage explicit `type` or `word_class` information in the `context` for more direct classification.
- **Ambiguity**: Some words might be `avyaya` in certain forms or contexts but not others. This implementation focuses on the general classification as defined by the sutra.

## Integration

### Related Sutras
- This `saṃjñā` (definition) sutra is foundational for understanding the behavior of indeclinable words in Sanskrit. It interacts with all rules related to inflection, as `avyaya` words are explicitly excluded from such processes.
- It builds upon the concept of `nipāta` (particles), which are a subset of `avyaya`.

### Used By
- Any module in the Panini engine that performs morphological analysis, declension, or sentence parsing will need to consult this sutra to correctly identify `avyaya` words and ensure they are not subjected to inflectional changes.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.37
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and leverages shared `sanskrit-utils` for robust word classification.
- **Test References**: Test cases are designed to validate the precise identification of `avyaya` words based on their `nipāta` or `svarādi` status.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
