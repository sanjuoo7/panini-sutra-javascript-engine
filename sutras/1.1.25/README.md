# Sutra 1.1.25: डति च

## Overview

**Sanskrit Text**: `डति च`
**Transliteration**: ḍati ca
**Translation**: And the संख्या-s ending with the affix डति are called षट्.

## Purpose

This `saṃjñā` (definition) sutra further expands the classification of `ṣaṭ` (षट्) numerals, building upon Sutra 1.1.24. It states that numerals (`saṃkhyā`) that end with the affix `ḍati` (डति) are also classified as `ṣaṭ`. This includes words like `kati` (कति, 'how many'), `yati` (यति, 'as many'), and `tati` (तति, 'so many'). This extension is vital for ensuring that all numerals subject to `ṣaṭ`-specific grammatical operations are correctly identified.

## Implementation

### Function Signature
```javascript
function isShatByDati(word) {
    // Implementation details
}
```

### Key Features
- **`Ḍati`-affixed Numeral Identification**: The `isShatByDati` function accurately identifies numerals formed with the `ḍati` affix as `ṣaṭ`.
- **Comprehensive `Ṣaṭ` Classification**: The `isShatExtended` function combines the rules from Sutra 1.1.24 (ending in `ṣ` or `n`) and this sutra (ending in `ḍati`), providing a complete `ṣaṭ` classification.
- **Dual Script Support**: All functions handle both IAST and Devanagari representations.
- **Detailed `Ḍati` Analysis**: Functions like `hasDateAffix`, `analyzeDatiUsage`, `isInterrogativeDati`, and `isDemonstrativeDati` provide granular analysis of `ḍati` affix usage and its semantic implications.

### Dependencies
- **Sanskrit Utils**:
  - `detectScript` from `sanskrit-utils/script-detection.js`
  - `SanskritWordLists` from `sanskrit-utils/constants.js`
  - `isShat` from `../1.1.24/index.js` (for previous `ṣaṭ` definition)
  - `isSankhya` from `../1.1.23/index.js` (for general numeral check)

### Usage Examples

### Basic Usage
```javascript
import { isShatByDati, isShatExtended, analyzeDatiUsage, identifyCompleteShatType, getDatiShatExamples } from './index.js';

// Example 1: Check if a numeral is ṣaṭ by dati affix
console.log(isShatByDati('kati')); // true
console.log(isShatByDati('कति')); // true
console.log(isShatByDati('ṣaṣ')); // false (ṣaṭ by 1.1.24, not 1.1.25)

// Example 2: Comprehensive ṣaṭ check (combining 1.1.24 and 1.1.25)
console.log(isShatExtended('kati')); // true
console.log(isShatExtended('ṣaṣ')); // true
console.log(isShatExtended('eka')); // false

// Example 3: Analyze dati usage
const datiAnalysis = analyzeDatiUsage('yati');
console.log(datiAnalysis.hasDati); // true
console.log(datiAnalysis.type); // 'known_form'

// Example 4: Get dati-based ṣaṭ examples
console.log(getDatiShatExamples('Devanagari')); // ['कति', 'यति', 'तति', 'इयति']

// Example 5: Identify complete ṣaṭ type and source
const completeType = identifyCompleteShatType('सप्तन्');
console.log(completeType.isShat); // true
console.log(completeType.source); // '1.1.24'

const completeType2 = identifyCompleteShatType('कियति');
console.log(completeType2.isShat); // true
console.log(completeType2.source); // '1.1.25'
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **`hasDateAffix`**: Verifies the presence of the `ḍati` affix pattern.
- **`isShatByDati`**: Tests the identification of known `ḍati`-affixed numerals as `ṣaṭ`.
- **`isShatExtended`**: Confirms the combined `ṣaṭ` classification from both 1.1.24 and 1.1.25.
- **`analyzeDatiUsage`**: Validates detailed analysis of `ḍati` usage.
- **`identifyCompleteShatType`**: Ensures correct identification of the `ṣaṭ` type and its originating sutra.
- **`hasCompleteShatBehavior`**: Checks for `ṣaṭ` behavior based on both direct classification and contextual cues.
- **Specific `Ḍati` Types**: Tests `isInterrogativeDati` and `isDemonstrativeDati` for semantic classification.
- **Edge Cases**: Handles `null`, `undefined`, and empty string inputs gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.25

# Run with coverage
npm test sutras/1.1.25 -- --coverage
```

## Technical Details

### Algorithm
1.  **`hasDateAffix`**: This function checks if the `word` ends with `ḍati` (or `ति`/`डति` in Devanagari), accounting for common simplified forms.
2.  **`isShatByDati`**: This function checks if the `word` is present in the predefined list of `ḍati`-affixed numerals (`DATI_AFFIX_FORMS`).
3.  **`isShatExtended`**: This is the main aggregator. It first calls `isShat` (from 1.1.24) and if that returns `false`, it then calls `isShatByDati` to check for `ḍati` forms.
4.  **`identifyCompleteShatType`**: This function first attempts to classify the word using `isShat` (1.1.24). If successful, it uses the detailed analysis from 1.1.24. Otherwise, it uses `analyzeDatiUsage` to check for `ḍati` forms and provides the 1.1.25 classification.

### Performance
- **Time Complexity**: O(1) - Operations involve string comparisons and array lookups against small, fixed lists, resulting in constant time complexity.
- **Space Complexity**: O(1) - Memory usage is minimal and constant, as the numeral lists are predefined constants.

### Edge Cases
- **Simplified `Ḍati` Forms**: The `hasDateAffix` function accounts for common simplified endings like `ti` (ति), which is a practical consideration for `ḍati` usage.
- **Contextual `Ṣaṭ`**: The `hasCompleteShatBehavior` function allows for `ṣaṭ` classification based on provided grammatical context, which is useful for words not explicitly listed but behaving as `ṣaṭ`.

## Integration

### Related Sutras
- **Sutra 1.1.24 (ष्णान्ता षट्)**: This sutra directly extends the definition of `ṣaṭ` established by 1.1.24, forming a combined and comprehensive classification for numerals that undergo `ṣaṭ`-specific rules.
- `ṣaṭ` numerals are subject to unique rules in Pāṇini's grammar, particularly in their declension and Sandhi behavior.

### Used By
- Any module in the Panini engine that processes numerals, especially for declension or Sandhi, will need to consult these functions to correctly identify and apply rules specific to the extended class of `ṣaṭ` numerals.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.25
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and leverages `sanskrit-utils` for script detection and word lists.
- **Test References**: Test cases are designed to validate the precise identification of `ḍati`-affixed numerals and their integration into the comprehensive `ṣaṭ` classification.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
