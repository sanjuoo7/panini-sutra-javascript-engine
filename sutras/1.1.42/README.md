# Sutra 1.1.42: शि सर्वनामस्थानम्

## Overview

**Sanskrit Text**: `शि सर्वनामस्थानम्`
**Transliteration**: śi sarvanāmasthānam
**Translation**: The affix शि is called सर्वनामस्थान.

## Purpose

This `saṃjñā` (definition) sutra introduces the technical term `sarvanāmasthāna` (सर्वनामस्थान). It explicitly states that the affix `śi` (शि) is called `sarvanāmasthāna`. This term is crucial because `sarvanāmasthāna` affixes trigger specific phonological and morphological changes in the nominal stem to which they are attached, particularly affecting the strengthening of vowels and the insertion of augments. While this sutra specifically mentions `śi`, other rules extend this classification to other nominative and accusative case endings (e.g., `su`, `au`, `jas`, `am`, `auṭ`, `śas`).

## Implementation

### Function Signature
```javascript
function applySutra1_1_42(affix, context) {
    // Implementation details
}
```

### Key Features
- **`Śi` Classification**: The `applySutra1_1_42` function directly classifies `śi` (शि) as `sarvanāmasthāna`.
- **Comprehensive `Sarvanāmasthāna` List**: The `getSarvanāmasthānaAffixes` function provides a complete list of all affixes that are considered `sarvanāmasthāna` (including those from other related sutras).
- **Affix Type Identification**: The `getAffixType` function categorizes various nominal affixes, including `sarvanāmasthāna` ones.
- **Rule Triggering**: The `triggersSarvanāmasthānaRules` function determines if a given affix will activate `sarvanāmasthāna`-specific grammatical rules.
- **Validation**: The `validateSarvanāmasthāna` function confirms the `sarvanāmasthāna` status of an affix in a given context.

### Dependencies
- **Sanskrit Utils**:
  - `SanskritWordLists` from `sanskrit-utils/constants.js` (for `sarvanāmasthāna` affixes and their categories)

### Usage Examples

### Basic Usage
```javascript
import { applySutra1_1_42, getSarvanāmasthānaAffixes, getAffixType, triggersSarvanāmasthānaRules, validateSarvanāmasthāna, testSutra1_1_42 } from './index.js';

// Example 1: Apply Sutra 1.1.42 to 'śi'
const result1 = applySutra1_1_42('śi');
console.log(result1.applies); // true
console.log(result1.sarvanāmasthāna_status); // true
console.log(result1.affix_type); // 'śi'

// Example 2: Check other sarvanāmasthāna affixes
console.log(triggersSarvanāmasthānaRules('su')); // true
console.log(triggersSarvanāmasthānaRules('jas')); // true
console.log(triggersSarvanāmasthānaRules('ti')); // false

// Example 3: Get all sarvanāmasthāna affixes
console.log(getSarvanāmasthānaAffixes().slice(0, 5)); // ['śi', 'su', 'au', 'jas', 'am']

// Example 4: Get affix type
console.log(getAffixType('am')); // 'accusative_singular'
console.log(getAffixType('śi')); // 'locative_singular_special'

// Example 5: Validate sarvanāmasthāna usage
const validation = validateSarvanāmasthāna('rāmaḥ', { affix: 'su' });
console.log(validation.valid); // true
console.log(validation.is_sarvanāmasthāna); // true
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **`applySutra1_1_42`**: Verifies the core logic for classifying `śi` and other relevant affixes as `sarvanāmasthāna`.
- **`getSarvanāmasthānaAffixes`**: Tests the retrieval of the complete list of `sarvanāmasthāna` affixes.
- **`getAffixType`**: Tests the correct categorization of various nominal affixes.
- **`triggersSarvanāmasthānaRules`**: Confirms that `sarvanāmasthāna` affixes correctly trigger rule application.
- **`validateSarvanāmasthāna`**: Validates the `sarvanāmasthāna` status of an affix in a given context.
- **Edge Cases**: Handles `null`, `undefined`, and non-affix inputs gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.42

# Run with coverage
npm test sutras/1.1.42 -- --coverage
```

## Technical Details

### Algorithm
1.  **`applySutra1_1_42`**: This function first checks if the `affix` is `śi` (or `शि`). If so, it directly classifies it as `sarvanāmasthāna`. Otherwise, it checks if the `affix` is present in the comprehensive list returned by `getSarvanāmasthānaAffixes`.
2.  **`getSarvanāmasthānaAffixes`**: This function retrieves a predefined list of all affixes that are considered `sarvanāmasthāna` (including `śi`, `su`, `au`, `jas`, `am`, `auṭ`, `śas`).
3.  **`getAffixType`**: This function looks up the `affix` in a predefined mapping (`SanskritWordLists.affixCategories`) to return its grammatical type (e.g., `nominative_singular`, `accusative_plural`).
4.  **`triggersSarvanāmasthānaRules`**: This function simply calls `applySutra1_1_42` and returns its `sarvanāmasthāna_status`.

### Performance
- **Time Complexity**: O(1) - Operations involve string comparisons and array lookups against fixed-size lists, resulting in constant time complexity.
- **Space Complexity**: O(1) - Memory usage is minimal and constant, as the lists are predefined constants.

### Edge Cases
- **Affix Variants**: The implementation handles both IAST and Devanagari forms of `śi`.
- **Context Dependency**: While the core classification is based on the affix itself, `validateSarvanāmasthāna` uses context to provide a more complete validation.

## Integration

### Related Sutras
- This `saṃjñā` (definition) sutra is foundational for nominal declension. Many other `vidhi` (rule) sutras will refer to `sarvanāmasthāna` affixes to apply specific phonological changes (e.g., vowel strengthening, augment insertion) to the nominal stem.
- It is closely related to the concept of `sarvanāma` (pronouns), as these affixes share characteristics with pronoun endings.

### Used By
- Any module in the Panini engine that performs nominal declension, especially for stems ending in consonants or requiring vowel strengthening, will need to consult this sutra to correctly identify `sarvanāmasthāna` affixes and apply the appropriate rules.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.42
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and leverages shared `sanskrit-utils` for robust affix classification.
- **Test References**: Test cases are designed to validate the precise identification of `śi` and other `sarvanāmasthāna` affixes and their role in triggering grammatical rules.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
