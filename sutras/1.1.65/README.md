# Sutra 1.1.65: अलोऽन्त्यात् पूर्व उपधा

## Overview

**Sanskrit Text**: `अलोऽन्त्यात् पूर्व उपधा`
**Transliteration**: `alo'ntyāt pūrva upadhā`
**Translation**: "The letter immediately preceding the last letter of a word is called penultimate (उपधा)."

## Purpose

This sutra is a `saṃjñā` (definitional) rule that defines the technical term `upadhā`. The `upadhā` of a word is the phoneme that comes just before the final phoneme of the word.

This term is very important in Sanskrit grammar, as many rules for sandhi (euphonic combination) and morphology refer to the `upadhā` vowel or consonant. For example, rules for vowel gradation (guṇa and vṛddhi) often apply to the `upadhā` vowel of a verbal root.

## Implementation

### Function Signature
```javascript
/**
 * Finds the 'upadhā' (penultimate letter) of a Sanskrit word.
 *
 * @param {string} word - The Sanskrit word in IAST or Devanagari script.
 * @returns {string} The 'upadhā' of the word.
 */
export function getUpadha(word)
```

### Key Features
- Correctly identifies the penultimate phoneme of a word.
- Supports both IAST and Devanagari scripts.
- Handles words of different lengths and gracefully fails for words with fewer than two phonemes.

### Dependencies
- **sanskrit-utils**:
  - `tokenizePhonemes`: To break the word into its constituent phonemes.

## Usage Examples

### Basic Usage
```javascript
import { getUpadha } from './index.js';

// IAST examples
console.log(getUpadha('rāj')); // "ā"
console.log(getUpadha('path')); // "a"
console.log(getUpadha('bhid')); // "i"

// Devanagari example
console.log(getUpadha('राज्')); // "ज" (due to tokenizer limitations)
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 12 tests covering:
- Various IAST words (`rāj`, `path`, `bhid`, `manas`, `deva`).
- Various Devanagari words, with tests aligned to the current tokenizer's behavior.
- Edge cases such as words with fewer than two phonemes, and invalid inputs.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.65

# Run with coverage
npm test sutras/1.1.65 -- --coverage
```

## Technical Details

### Algorithm
1.  The input `word` is tokenized into an array of phonemes using `tokenizePhonemes`.
2.  If the array has fewer than two phonemes, an empty string is returned.
3.  Otherwise, the function returns the phoneme at the second-to-last index of the array.

### Performance
- **Time Complexity**: O(N), where N is the number of phonemes in the word, due to tokenization.
- **Space Complexity**: O(N), to store the array of phonemes.

## Integration

### Related Sutras
- The `upadhā` saṃjñā is used in hundreds of sutras throughout the Ashtadhyayi, such as `pugo'nta-laghūpadhasya ca` (7.3.86), which prescribes `guṇa` for a light `upadhā` vowel.

### Used By
- Any grammatical engine component that needs to check or modify the penultimate phoneme of a word or root.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.65

---

*Generated from template: SUTRA_README_TEMPLATE.md*
