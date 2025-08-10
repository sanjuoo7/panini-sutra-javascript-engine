# Sutra 1.1.51: uraँṇa raparaḥ (उरँण् रपरः)

## Overview

**Sanskrit Text**: `उरँण् रपरः`  
**Transliteration**: uraँṇa raparaḥ  
**Translation**: When a letter of अण् प्रत्यहार comes as a substitute for ऋ, it is always followed by र्।

## Purpose

This sutra is a *paribhasha* (interpretive rule) that specifies a mandatory addition of the sound 'r' (र) when certain vowels ('a', 'i', 'u' from the 'aṇ' pratyahara) are substituted in place of the vocalic 'ṛ' (ऋ) or 'ṝ' (ॠ). This ensures the correct phonetic outcome in various sandhi and derivation processes.

## Implementation

### Function Signature
```javascript
export function applyRaparaha(substitute, originalPhoneme, script) {
    // Implementation details
}
```

### Key Features
- **Conditional Application**: Applies only when an 'aṇ' pratyahara vowel substitutes 'ṛ' or 'ṝ'.
- **Multi-script Support**: Handles both IAST and Devanagari scripts.
- **Phoneme-level Operation**: Works on individual phonemes.

### Dependencies
- **Sanskrit Utils**:
    - `script-detection.js`: Used to determine the input script.
    - `constants.js`: Used to define the 'aṇ' pratyahara vowels and 'ṛ'/'ṝ' phonemes.

## Usage Examples

### Basic Usage
```javascript
import { applyRaparaha } from './index.js';

// IAST examples
const result1 = applyRaparaha('a', 'ṛ', 'IAST');
console.log(result1); // Expected output: 'ar'

const result2 = applyRaparaha('i', 'ṛ', 'IAST');
console.log(result2); // Expected output: 'ir'

// Devanagari examples
const result3 = applyRaparaha('अ', 'ऋ', 'Devanagari');
console.log(result3); // Expected output: 'अर्'

const result4 = applyRaparaha('उ', 'ॠ', 'Devanagari');
console.log(result4); // Expected output: 'उर्'
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 12 tests covering:
- Basic functionality
- Edge cases
- Error handling
- Integration with other sutras

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.51

# Run with coverage
npm test sutras/1.1.51 --coverage
```

## Technical Details

### Algorithm
The function checks if the `originalPhoneme` is 'ṛ' or 'ṝ' and if the `substitute` is one of the 'aṇ' pratyahara vowels ('a', 'i', 'u'). If both conditions are met, it appends 'r' (or 'र्' for Devanagari) to the substitute. Otherwise, it returns the substitute unchanged.

### Performance
- **Time Complexity**: O(1) - The operations involve direct comparisons and array lookups of fixed small sizes.
- **Space Complexity**: O(1) - Constant space is used for storing the 'aṇ' pratyahara and 'ṛ' phonemes.

### Edge Cases
- **Invalid Inputs**: The function includes checks for null, undefined, or non-string inputs and throws an error.
- **Non-applicable Substitutes/Originals**: The function correctly returns the original substitute if the conditions for applying the rule are not met.

## Integration

### Related Sutras
- This sutra is a *paribhasha* (interpretive rule) that influences the application of other *vidhi* (prescriptive) sutras that involve substitution of 'ṛ'. For example, it would apply in contexts where 'ṛ' undergoes *guṇa* or *vṛddhi* transformations.

### Used By
- Other sutras that involve the substitution of 'ṛ' by 'aṇ' pratyahara vowels will implicitly or explicitly rely on the outcome of this rule.

## References

- **Panini's Ashtadhyayi**: 1.1.51
- **Kāśikā-vṛtti**: Commentary on this sutra.
- **Siddhānta Kaumudī**: Further explanation and examples.

---

*Generated from template: SUTRA_README_TEMPLATE.md*