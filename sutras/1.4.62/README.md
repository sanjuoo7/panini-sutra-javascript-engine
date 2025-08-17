# Sutra 1.4.62: अनुकरणं चानितिपरम्

## Overview

**Sanskrit Text**: `अनुकरणं चानितिपरम्`
**Transliteration**: anukaraṇaṃ cānitiparama
**Translation**: An onomatopoeic word (anukaraṇa) is also termed `gati`, provided it is not followed by the word `iti`.

## Purpose

This sutra extends the `gati` designation to onomatopoeic words used in conjunction with a verb. This is significant for understanding how sounds are integrated into the Sanskrit language grammatically, affecting their sandhi and accentuation when combined with verbs. The key condition is the absence of the quotative particle `iti` immediately following the sound-word.

## Implementation

### Function Signature
```javascript
function isGatiAnukarana(word, context) {
    // Implementation details
}
```

### Key Features
- Identifies if a word is onomatopoeic (anukaraṇa). This might require a list or a heuristic.
- Checks if the word is followed by `iti`.
- Checks for the presence of a verb in the context.

### Dependencies
- **Sanskrit Utils**: `transliterate`.
- **Shared Functions**: A mechanism to check the following word in a sentence or phrase.

## Usage Examples

### Basic Usage
```javascript
import { isGatiAnukarana } from './index.js';

// Example 1: Onomatopoeic word without 'iti'
const result1 = isGatiAnukarana('khaṭat', { verb: 'kṛ', following_word: 'kṛtvā' });
console.log(result1); // Expected output: { applies: true, word: 'khaṭat', term: 'gati' }

// Example 2: Onomatopoeic word in Devanagari
const result2 = isGatiAnukarana('खटत्', { verb: 'kṛ', following_word: 'कृत्वा' });
console.log(result2); // Expected output: { applies: true, word: 'खटत्', term: 'gati' }
```

### Advanced Usage
```javascript
// Example with 'iti' following
const result3 = isGatiAnukarana('khaṭat', { verb: 'kṛ', following_word: 'iti' });
console.log(result3); // Expected output: { applies: false, reason: "Followed by 'iti'" }

// Example without a verb context
const result4 = isGatiAnukarana('khaṭat');
console.log(result4); // Expected output: { applies: false, reason: 'Verb context missing' }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 50+ tests covering:
- Positive cases for various onomatopoeic words (IAST and Devanagari).
- Negative cases where the word is followed by `iti`.
- Negative cases where the word is not onomatopoeic.
- Negative cases where verb context is missing.
- Edge cases with different forms of `iti` or sentence structures.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.62

# Run with coverage
npm test sutras/1.4.62 --coverage
```

## Technical Details

### Algorithm
1.  Check if the input `word` and `context` are valid.
2.  Verify that `context.verb` is present. If not, return `applies: false`.
3.  Verify that `context.following_word` is not `iti` (or `इति`). If it is, return `applies: false`.
4.  Check if the `word` is onomatopoeic. This is the main challenge. For a robust implementation, this might involve checking against a known list of onomatopoeic stems or identifying words with reduplication patterns typical of onomatopoeia (e.g., `paṭapaṭā`). For the purpose of this rule, we can assume a helper function `isAnukarana(word)` exists.
5.  If the word is onomatopoeic and not followed by `iti`, return `applies: true`.

### Performance
- **Time Complexity**: O(1), assuming `isAnukarana` is efficient.
- **Space Complexity**: O(1).
- **Optimization Notes**: The check for `isAnukarana` is critical. A pre-compiled set of known onomatopoeic words would be fastest.

### Edge Cases
- **Word followed by `iti` in a compound**: The rule should be smart enough to distinguish `...iti` as a separate following word versus part of a compound.
- **Various forms of verbs**: The rule should apply regardless of the specific verb (`kṛ`, `bhū`, `as`, etc.).
- **Punctuation**: The check for `iti` should handle surrounding punctuation.

## Integration

### Related Sutras
- **1.4.61 (ūrayādicaviḍācaśaca)**: This sutra is part of the same `gati` section.
- **Other `gati` sutras**: The `gati` designation connects to rules of sandhi and accent.

### Used By
- Rules that depend on the `gati` status of a pre-verb. For example, `gati` compounds (`gati-samāsa`).

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.62
- **Implementation Notes**: The definition of `anukaraṇa` (onomatopoeia) is broad and may require a curated list or advanced pattern matching to implement fully.
- **Test References**: Examples are often found in commentaries illustrating sounds made by objects, animals, or actions.
---

*Generated from template: SUTRA_README_TEMPLATE.md*
