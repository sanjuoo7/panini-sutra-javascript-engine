# Sutra 1.4.61: ऊर्यादिच्विडाचश्च

## Overview

**Sanskrit Text**: `ऊर्यादिच्विडाचश्च`
**Transliteration**: ūrayādicaviḍācaśaca
**Translation**: The words of the `ūri` list, words ending in the suffix `cvi`, and words ending in the suffix `ḍāc` are termed `gati` when they are used in conjunction with a verb.

## Purpose

This sutra is a `saṃjñā` (definitional) rule that assigns the term `gati` (literally "motion," but here a technical term for a type of pre-verb) to three classes of words under specific conditions. This classification is crucial as `gati` elements have special properties in Sanskrit grammar, such as forming a single phonetic unit with the following verb and influencing accent.

## Implementation

### Function Signature
```javascript
function isGatiUryadi(word, context) {
    // Implementation details
}
```

### Key Features
- Identifies if a word belongs to the `ūri` list.
- Detects if a word is formed with the `cvi` suffix.
- Detects if a word is formed with the `ḍāc` suffix.
- Checks if the word is used with a verb (e.g., `kṛ`, `bhū`, `as`).

### Dependencies
- **Sanskrit Utils**: Potentially `transliterate` for handling different scripts.
- **Shared Functions**: A function to check for the presence of a verb in the context.

## Usage Examples

### Basic Usage
```javascript
import { isGatiUryadi } from './index.js';

// Example 1: Word from ūri list
const result1 = isGatiUryadi('ūrī', { verb: 'kṛ' });
console.log(result1); // Expected output: { applies: true, word: 'ūrī', term: 'gati' }

// Example 2: Word with 'cvi' suffix
const result2 = isGatiUryadi('śuklī', { verb: 'bhū' });
console.log(result2); // Expected output: { applies: true, word: 'śuklī', term: 'gati' }

// Example 3: Word with 'ḍāc' suffix
const result3 = isGatiUryadi('paṭapaṭā', { verb: 'kṛ' });
console.log(result3); // Expected output: { applies: true, word: 'paṭapaṭā', term: 'gati' }
```

### Advanced Usage
```javascript
// Example without a verb context
const result4 = isGatiUryadi('ūrī');
console.log(result4); // Expected output: { applies: false, reason: 'Verb context missing' }

// Example of a word not in any category
const result5 = isGatiUryadi('gaja');
console.log(result5); // Expected output: { applies: false }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 50+ tests covering:
- Positive cases for `ūri` list words (IAST and Devanagari).
- Positive cases for `cvi` suffix words (IAST and Devanagari).
- Positive cases for `ḍāc` suffix words (IAST and Devanagari).
- Negative cases where words do not belong to any category.
- Negative cases where the verb context is missing.
- Edge cases like empty strings or invalid input.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.61

# Run with coverage
npm test sutras/1.4.61 --coverage
```

## Technical Details

### Algorithm
1.  Check if the input word is valid.
2.  Check if the verb context is provided. If not, the rule does not apply.
3.  Check if the word is in the predefined `ūri` list.
4.  If not, check if the word ends with the `cvi` suffix (`ī`).
5.  If not, check if the word ends with the `ḍāc` suffix (`ā`).
6.  If any of the above conditions are met, the word is classified as `gati`. Otherwise, it is not.

### Performance
- **Time Complexity**: O(L) where L is the length of the `ūri` list, assuming list lookup is the dominant operation. If using a Set for the list, it would be O(1) on average.
- **Space Complexity**: O(1)
- **Optimization Notes**: The `ūri` list should be stored in a hash set for efficient lookup.

### Edge Cases
- **Input is not a string**: The function should handle non-string inputs gracefully, returning an error or `applies: false`.
- **Empty string**: An empty string input should be handled and result in `applies: false`.
- **Missing context**: The function must check for the presence of a verb in the context and return `applies: false` if it's missing.

## Integration

### Related Sutras
- **1.4.50 (cvi-pratyaya)**: Defines the `cvi` suffix.
- **1.4.57 (ḍāc-pratyaya)**: Defines the `ḍāc` suffix.
- **1.4.60 (prādayaḥ upasargāḥ kriyāyoge)**: The preceding sutra in the `gati` section.

### Used By
- This `gati` designation is used by various other sutras that govern accent, sandhi, and compound formation.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.61
- **Implementation Notes**: The list of `ūri` words needs to be sourced from traditional commentaries or reliable grammatical texts.
- **Test References**: Test cases are derived from examples in commentaries like the Kasika Vritti.
---

*Generated from template: SUTRA_README_TEMPLATE.md*
