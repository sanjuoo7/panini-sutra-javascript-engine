# Sutra 1.1.52: alo'ntyasya (अलोऽन्त्यस्य)

## Overview

**Sanskrit Text**: `अलोऽन्त्यस्य`  
**Transliteration**: alo'ntyasya  
**Translation**: The substitute takes the place of only the final letter (of that which is denoted by a term exhibited in the Genitive 6th-Case).

## Purpose

This *paribhasha* (interpretive rule) is fundamental to understanding how substitutions operate in Panini's grammar. It clarifies that when a grammatical operation prescribes a substitute for a word or a sequence of phonemes (indicated by the Genitive case), that substitute replaces *only the last phoneme* of the original. This prevents the entire word from being replaced unless explicitly stated by other rules.

## Implementation

### Function Signature
```javascript
export function applyAlontyasya(originalWord, substitute, script) {
    // Implementation details
}
```

### Key Features
- **Phoneme-level Replacement**: Replaces only the last phoneme of the input word.
- **Multi-script Support**: Designed to work with both IAST and Devanagari scripts.
- **Core Grammatical Principle**: Implements a foundational rule for substitution.

### Dependencies
- **Sanskrit Utils**:
    - `phoneme-tokenization.js`: Used to break the input word into individual phonemes.
    - `transliteration.js`: (Potentially) used for ensuring script consistency, though the current implementation assumes substitute is in target script.
    - `script-detection.js`: Used to determine the input script (though not directly used in the current function logic, it's a common dependency for such functions).

## Usage Examples

### Basic Usage
```javascript
import { applyAlontyasya } from './index.js';

// IAST examples
const result1 = applyAlontyasya('rāma', 'e', 'IAST');
console.log(result1); // Expected output: 'rāme' (replacing 'a' with 'e')

const result2 = applyAlontyasya('devau', 'i', 'IAST');
console.log(result2); // Expected output: 'devi' (replacing 'u' with 'i')

// Devanagari examples
const result3 = applyAlontyasya('राम', 'ए', 'Devanagari');
console.log(result3); // Expected output: 'रामे' (replacing 'म's implicit 'अ' with 'ए')

const result4 = applyAlontyasya('देवौ', 'इ', 'Devanagari');
console.log(result4); // Expected output: 'देवइ' (replacing 'औ' with 'इ')
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 10 tests covering:
- Basic functionality
- Edge cases
- Error handling
- Integration with other sutras

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.52

# Run with coverage
npm test sutras/1.1.52 --coverage
```

## Technical Details

### Algorithm
The function first tokenizes the `originalWord` into an array of phonemes. It then replaces the last element of this array with the `substitute` phoneme. Finally, it joins the phonemes back together to form the modified word.

### Performance
- **Time Complexity**: O(L), where L is the length of the `originalWord` (due to tokenization and joining). For typical Sanskrit words, L is small, so it's practically constant time.
- **Space Complexity**: O(L), where L is the length of the `originalWord` (for storing the phoneme array).

### Edge Cases
- **Empty Input**: If `originalWord` is empty, the function returns an empty string.
- **Single-Phoneme Word**: The function correctly replaces the single phoneme with the substitute.
- **Invalid Inputs**: The function includes checks for null, undefined, or non-string inputs and throws an error.

## Integration

### Related Sutras
- This sutra is often overridden by other *paribhasha* sutras like 1.1.55 (`anekāla śit sarvasya`) which specify that a substitute replaces the *whole* original expression under certain conditions.
- It works in conjunction with *vidhi* (prescriptive) sutras that define specific substitutions.

### Used By
- Many *vidhi* (prescriptive) sutras that involve phoneme-level substitutions will implicitly or explicitly rely on this rule to determine the scope of the replacement.

## References

- **Panini's Ashtadhyayi**: 1.1.52
- **Kāśikā-vṛtti**: Commentary on this sutra.
- **Siddhānta Kaumudī**: Further explanation and examples.

---

*Generated from template: SUTRA_README_TEMPLATE.md*