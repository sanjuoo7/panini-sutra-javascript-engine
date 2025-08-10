# Sutra 1.1.26: क्तक्तवतू निष्ठा

## Overview

**Sanskrit Text**: `क्तक्तवतू निष्ठा`
**Transliteration**: ktaktavatū niṣṭhā
**Translation**: The affixes क्त and क्तवतु are called निष्ठा.

## Purpose

This `saṃjñā` (definition) sutra introduces the technical term `niṣṭhā` (निष्ठा). It specifically designates the affixes `kta` (क्त) and `ktavatu` (क्तवतु) as `niṣṭhā`. These affixes are crucial for forming past participles in Sanskrit: `kta` forms past passive participles (e.g., `kṛta` - 'done'), and `ktavatu` forms past active participles (e.g., `kṛtavat` - 'having done'). The `niṣṭhā` classification is important because words formed with these affixes undergo specific grammatical operations and have particular syntactic behaviors in Pāṇini's system.

## Implementation

### Function Signature
```javascript
function hasNishtha(word) {
    // Implementation details
}
```

### Key Features
- **`Niṣṭhā` Affix Identification**: The `hasNishtha` function accurately identifies words formed with either the `kta` or `ktavatu` affixes.
- **Specific Participle Type Check**: Functions `isKta` and `isKtavatu` allow for precise identification of past passive and past active participles, respectively.
- **Dual Script Support**: All functions handle both IAST and Devanagari representations of `niṣṭhā` forms.
- **Detailed Analysis**: The `identifyNishthaType` function provides a detailed analysis, including the specific affix type (`kta` or `ktavatu`) and its grammatical meaning.
- **Root Extraction**: The `getNishthaRoot` function attempts to extract the verbal root from a `niṣṭhā` form, aiding in morphological analysis.

### Dependencies
- **Sanskrit Utils**:
  - `detectScript` from `sanskrit-utils/script-detection.js`

### Usage Examples

### Basic Usage
```javascript
import { hasNishtha, isKta, isKtavatu, identifyNishthaType, hasNishthaBehavior, getNishthaExamples, getNishthaRoot } from './index.js';

// Example 1: Check if a word has niṣṭhā affix
console.log(hasNishtha('kṛta')); // true
console.log(hasNishtha('कृतवत्')); // true
console.log(hasNishtha('gacchati')); // false

// Example 2: Check for specific niṣṭhā types
console.log(isKta('gata')); // true (past passive participle)
console.log(isKtavatu('gatavat')); // true (past active participle)

// Example 3: Identify niṣṭhā type
const type1 = identifyNishthaType('bhukta');
console.log(type1.type); // 'kta'
console.log(type1.meaning); // 'past_passive_participle'

const type2 = identifyNishthaType('bhuktavat');
console.log(type2.type); // 'ktavatu'
console.log(type2.meaning); // 'past_active_participle'

// Example 4: Get root verb
console.log(getNishthaRoot('kṛta')); // 'kṛ'
console.log(getNishthaRoot('गतवत्')); // 'गम्'

// Example 5: Check for niṣṭhā behavior (with context)
console.log(hasNishthaBehavior('unknown', { morphology: 'participle', tense: 'past' })); // true
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **`hasNishtha`**: Verifies correct identification of both `kta` and `ktavatu` forms.
- **`isKta` and `isKtavatu`**: Tests the specific identification of each affix type.
- **`getNishthaAffixes`**: Tests the retrieval of `niṣṭhā` affix lists and examples.
- **`identifyNishthaType`**: Validates the detailed analysis of `niṣṭhā` forms.
- **`hasNishthaBehavior`**: Checks both direct `niṣṭhā` identification and contextual `niṣṭhā` behavior.
- **`getNishthaRoot`**: Confirms the extraction of verbal roots from `niṣṭhā` forms.
- **`isPassiveParticiple` and `isActiveParticiple`**: Tests the semantic classification of participles.
- **Edge Cases**: Handles `null`, `undefined`, and empty string inputs gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.26

# Run with coverage
npm test sutras/1.1.26 -- --coverage
```

## Technical Details

### Algorithm
1.  **`hasNishtha`**: This function checks if the input `word` is present in the predefined lists of `kta` or `ktavatu` examples within the `NISHTHA_AFFIXES` constant, after detecting the script.
2.  **`isKta` and `isKtavatu`**: These functions specifically check against their respective example lists.
3.  **`identifyNishthaType`**: This function first checks if the word is a `kta` form. If not, it checks if it's a `ktavatu` form. Based on the match, it returns a detailed object including the affix type, its grammatical meaning (past passive/active participle), and script.
4.  **`hasNishthaBehavior`**: This function aggregates the results of `hasNishtha` and also considers contextual information (e.g., `morphology`, `tense`, `voice`, `affix`) to determine `niṣṭhā` behavior.
5.  **`getNishthaRoot`**: This function uses a simple mapping to return the verbal root for a limited set of common `niṣṭhā` forms.

### Performance
- **Time Complexity**: O(1) - Operations involve string comparisons and array lookups against small, fixed lists, resulting in constant time complexity.
- **Space Complexity**: O(1) - Memory usage is minimal and constant, as the affix lists and examples are predefined constants.

### Edge Cases
- **Inflected Forms**: The current implementation relies on a predefined list of example words. Inflected forms of `niṣṭhā` participles (e.g., `kṛtam`, `kṛtāḥ`) may not be recognized without further morphological analysis.
- **Root Extraction**: `getNishthaRoot` is a simplified mapping and will return `null` for `niṣṭhā` forms not explicitly listed.

## Integration

### Related Sutras
- This `saṃjñā` (definition) sutra is foundational for rules related to past participles. Many other `vidhi` (rule) sutras will refer to `niṣṭhā` forms to apply specific operations or exceptions (e.g., rules for their declension, or rules for compounds involving participles).

### Used By
- Any module in the Panini engine that deals with verb forms, participles, or the expression of completed actions will need to consult these functions to correctly identify and categorize `niṣṭhā` forms.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.26
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and leverages `sanskrit-utils` for script detection.
- **Test References**: Test cases are designed to validate the precise identification of `niṣṭhā` forms and their distinction into `kta` and `ktavatu` types.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
