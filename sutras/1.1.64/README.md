# Sutra 1.1.64: अचोऽन्त्यादि टि

## Overview

**Sanskrit Text**: `अचोऽन्त्यादि टि`
**Transliteration**: `aco'ntyādi ṭi`
**Translation**: "The final portion of a word, beginning with the last among the vowels in the word, is called टि (ṭi)."

## Purpose

This sutra is a `saṃjñā` (definitional) rule that defines the technical term `ṭi`. The `ṭi` of a word is the segment that starts with the last vowel of the word and includes all subsequent consonants until the end of the word.

This technical term is used in many subsequent sutras, especially those related to sandhi (euphonic combination) and morphology, where operations are often performed on the `ṭi` portion of a word.

## Implementation

### Function Signature
```javascript
/**
 * Finds the 'ṭi' part of a Sanskrit word.
 *
 * @param {string} word - The Sanskrit word in IAST or Devanagari script.
 * @returns {string} The 'ṭi' part of the word.
 */
export function getTi(word)
```

### Key Features
- Correctly identifies the `ṭi` portion of a word.
- Supports both IAST and Devanagari scripts using phonetically accurate tokenization.
- Handles words with and without final consonants.
- Gracefully handles edge cases like words with no vowels or invalid inputs.
- **NEW**: Uses accurate phonetic analysis for Devanagari that properly handles inherent vowels.

### Dependencies
- **sanskrit-utils**:
  - `tokenizePhonemes`: To break the word into its constituent phonemes with accurate mode.
  - `isVowel`: To identify the vowels in the tokenized array.

## Usage Examples

### Basic Usage
```javascript
import { getTi } from './index.js';

// IAST examples
console.log(getTi('manas')); // "as"
console.log(getTi('śak'));  // "ak"
console.log(getTi('kavi'));  // "i"

// Devanagari examples (now phonetically accurate)
console.log(getTi('मनस्')); // "अस्" (phonetically correct)
console.log(getTi('शक्'));  // "अक्" (phonetically correct)
console.log(getTi('राजन्')); // "अन्" (phonetically correct)
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 17 tests covering:
- Various IAST words (`śak`, `manas`, `vidvas`, `kavi`, `nadī`, `rājan`).
- **Various Devanagari words with phonetically accurate results**.
- Edge cases such as words with no vowels, empty strings, and non-string inputs.
- Words with a single vowel and words ending in a vowel.

### Recent Improvements
- **Fixed Devanagari Tokenizer Issue**: The implementation now uses phonetically accurate tokenization for Devanagari that properly handles inherent vowels ('अ').
- **Backward Compatibility**: IAST functionality remains unchanged.
- **Accurate Results**: Devanagari words now return phonetically correct ṭi segments.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.64

# Run with coverage
npm test sutras/1.1.64 -- --coverage
```

## Technical Details

### Algorithm
1.  The input `word` is tokenized into an array of phonemes using `tokenizePhonemes`.
2.  The function iterates backward through the phoneme array.
3.  It uses `isVowel` to find the index of the last vowel.
4.  If a last vowel is found, the function slices the array from that index to the end and joins the result into a string.
5.  If no vowel is found or the input is invalid, it returns an empty string.

### Performance
- **Time Complexity**: O(N), where N is the number of phonemes in the word, due to the need to tokenize and iterate through the phonemes.
- **Space Complexity**: O(N), to store the array of phonemes.

## Integration

### Related Sutras
- The `ṭi` saṃjñā is used in numerous sutras, such as `ṭeḥ` (6.4.143), which prescribes the elision of the `ṭi` part of a `bha` stem.

### Used By
- Any grammatical engine component that needs to perform operations on the `ṭi` part of a word.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.64

---

*Generated from template: SUTRA_README_TEMPLATE.md*
