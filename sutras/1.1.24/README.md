# Sutra 1.1.24: ष्णान्ता षट्

## Overview

**Sanskrit Text**: `ष्णान्ता षट्`
**Transliteration**: ṣṇāntā ṣaṭ
**Translation**: The संख्या-s having ष or न as their final are called षट्.

## Purpose

This `saṃjñā` (definition) sutra introduces the technical term `ṣaṭ` (षट्). It classifies numerals (`saṃkhyā`) that end in either `ṣ` (ष्) or `n` (न्) as `ṣaṭ`. This classification is crucial because `ṣaṭ` numerals undergo specific grammatical operations and exceptions in Pāṇini's system, particularly concerning their declension and the application of Sandhi rules. The most prominent example is `ṣaṣ` (षष्, 'six'), which gives the classification its name.

## Implementation

### Function Signature
```javascript
function isShat(word) {
    // Implementation details
}
```

### Key Features
- **`Ṣaṭ` Numeral Identification**: The `isShat` function accurately identifies numerals that end in `ṣ` (ष्) or `n` (न्) as `ṣaṭ`.
- **Dual Script Support**: All functions handle both IAST and Devanagari representations of numerals.
- **Ending Analysis**: The `checkShatEnding` function specifically identifies the `ṣ` or `n` ending, and `identifyShatType` provides a detailed analysis including the type of ending (`sha` or `na`).
- **`Ṣaṭ` Numeral Listing**: The `getShatNumerals` function provides a convenient way to retrieve all numerals classified as `ṣaṭ`.

### Dependencies
- **Sanskrit Utils**:
  - `detectScript` from `sanskrit-utils/script-detection.js`
  - `isSankhya` from `../1.1.23/index.js` (to ensure the word is a numeral before checking for `ṣaṭ` properties)

### Usage Examples

### Basic Usage
```javascript
import { isShat, checkShatEnding, identifyShatType, hasShatBehavior, getShatExamples, getPrimaryShatExample } from './index.js';

// Example 1: Check if a numeral is ṣaṭ
console.log(isShat('ṣaṣ')); // true
console.log(isShat('सप्तन्')); // true
console.log(isShat('eka')); // false

// Example 2: Check the ending type
const ending1 = checkShatEnding('ṣaṣ');
console.log(ending1.ending); // 'ṣ'

const ending2 = checkShatEnding('अष्टन्');
console.log(ending2.ending); // 'न्'

// Example 3: Identify the ṣaṭ type
const type1 = identifyShatType('viṃśatiṣ');
console.log(type1.type); // 'sha'

const type2 = identifyShatType('navan');
console.log(type2.type); // 'na'

// Example 4: Get primary example
console.log(getPrimaryShatExample('Devanagari')); // 'षष्'

// Example 5: Check for ṣaṭ behavior
console.log(hasShatBehavior('ṣaṣ')); // true
console.log(hasShatBehavior('tri')); // false
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **`isShat`**: Verifies correct identification of `ṣ`-ending and `n`-ending numerals in both IAST and Devanagari.
- **`getShatNumerals`**: Tests the retrieval of complete `ṣaṭ` numeral lists.
- **`checkShatEnding`**: Validates the accurate identification of the terminal `ṣ` or `n`.
- **`identifyShatType`**: Confirms the detailed analysis of `ṣaṭ` numerals, including their type and whether they are known numerals.
- **`hasShatBehavior`**: Checks both direct `ṣaṭ` identification and contextual `ṣaṭ` behavior.
- **`isShatWithEnding`**: Ensures precise type checking for `ṣaṭ` numerals.
- **Edge Cases**: Handles `null`, `undefined`, and empty string inputs gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.24

# Run with coverage
npm test sutras/1.1.24 -- --coverage
```

## Technical Details

### Algorithm
1.  **`isShat`**: This function uses `detectScript` and checks if the input `word` is present in the predefined `SHAT_NUMERALS` lists (for `ṣ`-ending or `n`-ending numerals).
2.  **`checkShatEnding`**: This function determines the script and then checks if the `word` ends with `ṣ` or `n` (or their Devanagari equivalents).
3.  **`identifyShatType`**: This function first attempts to find the `word` in the `SHAT_NUMERALS` lists. If found, it extracts the type and ending. If not found, it falls back to checking if the word is a `saṃkhyā` (using `isSankhya` from 1.1.23) and then uses `checkShatEnding` to determine if it has a `ṣaṭ` ending.
4.  **`hasShatBehavior`**: This function aggregates `isShat` and `identifyShatType` results, and also considers contextual information for `ṣaṭ` behavior.

### Performance
- **Time Complexity**: O(1) - Operations involve string comparisons and array lookups against small, fixed lists, resulting in constant time complexity.
- **Space Complexity**: O(1) - Memory usage is minimal and constant, as the numeral lists are predefined constants.

### Edge Cases
- **Non-`saṃkhyā` words**: The functions are designed to primarily classify numerals. Non-numeral words ending in `ṣ` or `n` will generally not be classified as `ṣaṭ` by these functions unless explicitly provided in a context that forces `ṣaṭ` behavior.
- **Alternative Forms**: The `SHAT_NUMERALS` lists include common alternative forms of numerals that qualify as `ṣaṭ`.

## Integration

### Related Sutras
- **Sutra 1.1.23 (संख्या)**: This sutra builds upon the definition of `saṃkhyā` (numerals) established by 1.1.23, creating a specific sub-category (`ṣaṭ`) for further rules.
- `ṣaṭ` numerals are subject to unique rules in Pāṇini's grammar, particularly in their declension (e.g., `7.1.22` - `ṣaḍbhyo luk`).

### Used By
- Any module in the Panini engine that processes numerals, especially for declension or Sandhi, will need to consult these functions to correctly identify and apply rules specific to `ṣaṭ` numerals.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.24
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and leverages `sanskrit-utils` for script detection.
- **Test References**: Test cases are designed to validate the precise identification of `ṣaṭ` numerals based on their endings and their distinction from other numerals.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
