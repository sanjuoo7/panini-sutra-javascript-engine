# Sutra 1.1.73: वृद्धिर्यस्याचामादिस्तद् वृद्धम्

## Overview

**Sanskrit Text**: `वृद्धिर्यस्याचामादिस्तद् वृद्धम्`  
**Transliteration**: `vṛddhir yasya acāmādistad vṛddham`  
**Translation**: "That word, among the vowels of which the first is a वृद्धि, is called वृद्धम्।"

## Purpose

This sutra is a `saṃjñā` (definitional) rule that defines the technical term `वृद्धम्` (vṛddham). A word is classified as वृद्धम् if its first vowel is one of the वृद्धि vowels (आ/ā, ऐ/ai, औ/au). This classification is important for various grammatical operations and compound formations in Sanskrit grammar.

## Implementation

### Function Signature
```javascript
/**
 * Determines if a Sanskrit word is वृद्धम् (vṛddham).
 *
 * @param {string} word - The Sanskrit word in IAST or Devanagari script.
 * @returns {boolean} True if the word is वृद्धम्, false otherwise.
 */
export function isVrddham(word)
```

### Key Features
- Correctly identifies वृद्धम् words based on first vowel analysis
- Supports both IAST and Devanagari scripts using phonetically accurate tokenization
- Handles complex words with multiple vowels (only considers the first vowel)
- Gracefully handles edge cases like words with no vowels or invalid inputs
- Uses the accurate phonetic tokenization for proper Devanagari analysis

### Dependencies
- **sanskrit-utils**:
  - `tokenizePhonemes`: To break the word into its constituent phonemes with accurate mode
  - `isVrddhi`: To identify वृद्धि vowels (आ, ऐ, औ)
  - `isVowel`: To identify vowels in general

## Usage Examples

### Basic Usage
```javascript
import { isVrddham } from './index.js';

// IAST examples
console.log(isVrddham('ātman')); // true (first vowel is ā)
console.log(isVrddham('aiśvarya')); // true (first vowel is ai)
console.log(isVrddham('auṣadha')); // true (first vowel is au)

// Devanagari examples
console.log(isVrddham('आत्मन्')); // true (first vowel is आ)
console.log(isVrddham('ऐश्वर्य')); // true (first vowel is ऐ)
console.log(isVrddham('औषध')); // true (first vowel is औ)

// Non-वृद्धम् examples
console.log(isVrddham('deva')); // false (first vowel is e, not वृद्धि)
console.log(isVrddham('indra')); // false (first vowel is i, not वृद्धि)
console.log(isVrddham('देव')); // false (first vowel is ए, not वृद्धि)
```

### Advanced Usage
```javascript
// Complex words with multiple vowels
console.log(isVrddham('ātmāiva')); // true (first vowel ā is वृद्धि)
console.log(isVrddham('devāura')); // false (first vowel e is not वृद्धि)

// Words starting with consonant clusters
console.log(isVrddham('krāma')); // true (first vowel is ā)
console.log(isVrddham('prāṇa')); // true (first vowel is ā)
console.log(isVrddham('क्राम')); // true (first vowel is ा/ā)

// Edge cases
console.log(isVrddham('ā')); // true (single वृद्धि vowel)
console.log(isVrddham('a')); // false (single non-वृद्धि vowel)
console.log(isVrddham('')); // false (empty string)
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 60+ tests covering:
- IAST words with वृद्धि as first vowel (ātman, aiśvarya, auṣadha, etc.)
- Devanagari words with वृद्धि as first vowel (आत्मन्, ऐश्वर्य, औषध, etc.)
- IAST words that are NOT वृद्धम् (deva, indra, agni, etc.)
- Devanagari words that are NOT वृद्धम् (देव, इन्द्र, अग्नि, etc.)
- Complex cases with multiple vowels
- Words starting with consonant clusters
- Edge cases (empty strings, invalid inputs, single vowels)

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.73

# Run with coverage
npm test sutras/1.1.73 -- --coverage
```

## Technical Details

### Algorithm
1. The input `word` is tokenized into an array of phonemes using `tokenizePhonemes` with accurate mode
2. The function iterates through the phonemes to find the first vowel
3. If the first vowel found is a वृद्धि vowel (checked using `isVrddhi`), return `true`
4. If the first vowel found is not a वृद्धि vowel, return `false`
5. If no vowel is found or input is invalid, return `false`

### Performance
- **Time Complexity**: O(N), where N is the number of phonemes until the first vowel
- **Space Complexity**: O(N), to store the array of phonemes

## Integration

### Related Sutras
- **Sutra 1.1.1**: Defines वृद्धि vowels (आ, ऐ, औ)
- **Sutras 1.1.74-75**: Extend the वृद्धम् classification to specific word lists

### Used By
- Any grammatical engine component that needs to classify words as वृद्धम्
- Compound formation rules that depend on वृद्धम् classification
- Morphological analysis systems

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.73
- **Traditional Commentary**: Establishes the definitional framework for वृद्धम् words

---

*Generated from template: SUTRA_README_TEMPLATE.md*
