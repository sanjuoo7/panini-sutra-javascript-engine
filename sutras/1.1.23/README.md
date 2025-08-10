# Sutra 1.1.23: बहुगणवतुडति संख्या

## Overview

**Sanskrit Text**: `बहुगणवतुडति संख्या`
**Transliteration**: bahugaṇavatuḍati saṃkhyā
**Translation**: The words बहु 'many' , गण 'class' and the words ending in the affix वतु -- यद्तदेतेभ्यः परिमाणे वतुप्‌ 5.2.39 and डति -- किमः संख्यापरिमाणे डति च 5.2.41 are called numerals (संख्या).

## Purpose

This `saṃjñā` (definition) sutra establishes the technical term `saṃkhyā` (संख्या), which refers to numerals. It defines a broad category of words that express quantity, including cardinal numbers (e.g., `eka`, `dvi`), ordinal numbers (e.g., `prathama`, `dvitīya`), multiplicative numbers (e.g., `dviguṇa`), fractional numbers (e.g., `ardha`), and collective numbers (e.g., `dvaya`). Additionally, it includes specific words like `bahu` (बहु, 'many'), `gaṇa` (गण, 'class'), and words ending in the affixes `vatup` (वतुप्) and `ḍati` (डति). This classification is crucial for applying various grammatical rules that specifically target numerical expressions.

## Implementation

### Function Signature
```javascript
function isSankhya(word) {
    // Implementation details
}
```

### Key Features
- **Comprehensive Numeral Identification**: The `isSankhya` function identifies a wide range of numerical words across different categories (cardinal, ordinal, multiplicative, fractional, collective).
- **Dual Script Support**: All functions handle both IAST and Devanagari representations of numerals.
- **Detailed Analysis**: The `identifySankhyaType` function provides the specific category of a numeral, and `getSankhyaValue` extracts the numerical value for cardinal numbers.
- **Contextual Behavior**: The `hasSankhyaBehavior` function allows for checking `saṃkhyā` status based on semantic or role-based context.

### Dependencies
- **Sanskrit Utils**:
  - `detectScript` from `sanskrit-utils/script-detection.js`

### Usage Examples

### Basic Usage
```javascript
import { isSankhya, identifySankhyaType, getSankhyaValue, hasSankhyaBehavior, getSankhyaExamples } from './index.js';

// Example 1: Check if a word is a numeral
console.log(isSankhya('eka')); // true
console.log(isSankhya('प्रथम')); // true
console.log(isSankhya('guru')); // false

// Example 2: Identify the type of numeral
const type1 = identifySankhyaType('dvi');
console.log(type1.type); // 'cardinal'

const type2 = identifySankhyaType('dvitīya');
console.log(type2.type); // 'ordinal'

// Example 3: Get the numerical value (for cardinals)
console.log(getSankhyaValue('tri')); // 3
console.log(getSankhyaValue('शत')); // 100
console.log(getSankhyaValue('prathama')); // null (not a cardinal)

// Example 4: Check for sankhya behavior (with context)
console.log(hasSankhyaBehavior('bahu', { semantics: 'quantity' })); // true
console.log(hasSankhyaBehavior('eka')); // true

// Example 5: Get examples
const examples = getSankhyaExamples('Devanagari');
console.log(examples.cardinal); // ['एक', 'द्वि', 'त्रि', 'चतुर्', 'पञ्च']
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **`isSankhya`**: Verifies correct identification of all categories of numerals in both IAST and Devanagari.
- **`getSankhyaWords`**: Tests the retrieval of complete numeral lists.
- **`identifySankhyaType`**: Validates the accurate classification of numeral types.
- **`hasSankhyaBehavior`**: Checks both direct `saṃkhyā` identification and contextual `saṃkhyā` behavior.
- **`getSankhyaValue`**: Confirms correct numerical value extraction for cardinal numbers.
- **`isSankhyaType`**: Ensures precise type checking.
- **Edge Cases**: Handles `null`, `undefined`, and empty string inputs gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.23

# Run with coverage
npm test sutras/1.1.23 -- --coverage
```

## Technical Details

### Algorithm
1.  **`isSankhya`**: This function uses `detectScript` to determine the input script. It then checks if the input `word` exists in any of the predefined categories (cardinal, ordinal, multiplicative, fractional, collective) within the `SANKHYA_WORDS` constant.
2.  **`getSankhyaWords`**: This function simply returns the appropriate `SANKHYA_WORDS` object based on the requested script.
3.  **`identifySankhyaType`**: This function iterates through the categories in `SANKHYA_WORDS` and returns the first matching type for the given `word`.
4.  **`getSankhyaValue`**: This function specifically targets cardinal numbers. It finds the index of the cardinal `word` in its respective list and maps it to a predefined array of numerical values.
5.  **`hasSankhyaBehavior`**: This function first checks if the word is directly a `saṃkhyā`. If not, it checks the provided `context` for semantic or role-based indicators of numerical behavior.

### Performance
- **Time Complexity**: O(N) where N is the number of numerals in the lists, but practically O(1) due to the limited and fixed size of the numeral lists. Operations involve array lookups and string comparisons.
- **Space Complexity**: O(1) - Memory usage is minimal and constant, as the numeral lists are predefined constants.

### Edge Cases
- **Non-standard Numerals**: The current implementation relies on predefined lists. Numerals not in these lists (e.g., very large numbers, or highly inflected forms not explicitly listed) may not be recognized without further morphological analysis.
- **Contextual `Saṃkhyā`**: The `hasSankhyaBehavior` function allows for flexibility, but its accuracy depends on the richness of the provided `context`.

## Integration

### Related Sutras
- This `saṃjñā` (definition) sutra is foundational for numerous rules in Pāṇini's grammar that deal with numbers, quantity, and enumeration. Other sutras will refer to `saṃkhyā` to apply specific operations or exceptions (e.g., rules for declension of numerals, or rules for compounds involving numbers).

### Used By
- Any module in the Panini engine that processes numerical expressions, performs morphological analysis of numbers, or applies rules based on quantity will need to consult these functions to correctly identify and categorize `saṃkhyā` words.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.23
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and leverages `sanskrit-utils` for script detection.
- **Test References**: Test cases are designed to validate the comprehensive identification and categorization of various types of Sanskrit numerals.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
