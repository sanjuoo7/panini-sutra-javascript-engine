# Sutra 1.1.54: ādeḥ parasya (आदेः परस्य)

## Overview

**Sanskrit Text**: `आदेः परस्य`  
**Transliteration**: ādeḥ parasya  
**Translation**: That which is enjoined to come in the room of what follows is to be understood as coming in the room only of the first letter thereof.

## Purpose

This *paribhasha* (interpretive rule) is the counterpart to Sutra 1.1.52 (`alo'ntyasya`). It specifies that when a grammatical operation prescribes a substitute for a *subsequent* word or a sequence of phonemes, that substitute replaces *only the first phoneme* of that subsequent element. This rule is crucial for correctly applying sandhi and other phonological changes that affect the beginning of a word or a part of an expression.

## Implementation

### Function Signature
```javascript
export function applyAadehParasya(targetWord, substitute, script) {
    // Implementation details
}
```

### Key Features
- **Phoneme-level Replacement**: Replaces only the first phoneme of the input word.
- **Multi-script Support**: Designed to work with both IAST and Devanagari scripts.
- **Core Grammatical Principle**: Implements a foundational rule for substitution affecting the beginning of an expression.

### Dependencies
- **Sanskrit Utils**:
    - `phoneme-tokenization.js`: Used to break the input word into individual phonemes.
    - `script-detection.js`: Used to determine the input script (though not directly used in the current function logic, it's a common dependency for such functions).

## Usage Examples

### Basic Usage
```javascript
import { applyAadehParasya } from './index.js';

// IAST examples
const result1 = applyAadehParasya('iti', 'a', 'IAST');
console.log(result1); // Expected output: 'ati' (replacing 'i' with 'a')

const result2 = applyAadehParasya('gacchati', 'a', 'IAST');
console.log(result2); // Expected output: 'acchati' (replacing 'g' with 'a')

// Devanagari examples
const result3 = applyAadehParasya('इति', 'अ', 'Devanagari');
console.log(result3); // Expected output: 'अति' (replacing 'इ' with 'अ')

const result4 = applyAadehParasya('गच्छति', 'अ', 'Devanagari');
console.log(result4); // Expected output: 'अच्छति' (replacing 'ग' with 'अ')
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
npm test sutras/1.1.54

# Run with coverage
npm test sutras/1.1.54 --coverage
```

## Technical Details

### Algorithm
The function first tokenizes the `targetWord` into an array of phonemes. It then replaces the first element of this array with the `substitute` phoneme. Finally, it joins the phonemes back together to form the modified word.

### Performance
- **Time Complexity**: O(L), where L is the length of the `targetWord` (due to tokenization and joining). For typical Sanskrit words, L is small, so it's practically constant time.
- **Space Complexity**: O(L), where L is the length of the `targetWord` (for storing the phoneme array).

### Edge Cases
- **Empty Input**: If `targetWord` is empty, the function returns an empty string.
- **Single-Phoneme Word**: The function correctly replaces the single phoneme with the substitute.
- **Invalid Inputs**: The function includes checks for null, undefined, or non-string inputs and throws an error.

## Integration

### Related Sutras
- This sutra works in conjunction with *vidhi* (prescriptive) sutras that define specific substitutions affecting the beginning of an expression.
- It is often overridden by other *paribhasha* sutras like 1.1.55 (`anekāla śit sarvasya`) which specify that a substitute replaces the *whole* original expression under certain conditions.

### Used By
- Many *vidhi* (prescriptive) sutras that involve phoneme-level substitutions at the beginning of an expression will implicitly or explicitly rely on this rule to determine the scope of the replacement.

## References

- **Panini's Ashtadhyayi**: 1.1.54
- **Kāśikā-vṛtti**: Commentary on this sutra.
- **Siddhānta Kaumudī**: Further explanation and examples.

---

*Generated from template: SUTRA_README_TEMPLATE.md*