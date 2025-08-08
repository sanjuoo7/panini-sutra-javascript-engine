# Sutra 1.1.3: इको गुणवृद्धी (iko guṇavṛddhī)

## Definition
This is a **paribhāṣā** (interpretive rule) that establishes the default scope of guṇa and vṛddhi operations. It states: "In the absence of any special instruction, whenever गुण (guṇa) or वृद्धि (vṛddhi) is enjoined for any expression by using the terms गुण or वृद्धि, it is to be understood to come in place of the इक् (ik) vowels of that expression."

## Sanskrit Text
- **Devanagari**: इको गुणवृद्धी
- **IAST**: iko guṇavṛddhī

## Structure
- "ik" (इक्) refers to the vowels: i (इ), u (उ), ṛ (ऋ), ḷ (लृ) and their long counterparts ī (ई), ū (ऊ), ṝ (ॠ), ḹ (ॡ)
- This sutra establishes which vowels are subject to guṇa and vṛddhi transformations by default

## The 'ik' Vowels
**Short**: i, u, ṛ, ḷ  
**Long**: ī, ū, ṝ, ḹ

## Functions

### `isIkVowel(vowel)`
Checks if a given vowel belongs to the 'ik' class.
- **Parameters**: `vowel` (string) - The vowel to check
- **Returns**: `boolean` - True if the vowel is an 'ik' vowel, false otherwise

### `applyGunaToIk(vowel)`
Applies guṇa transformation to an 'ik' vowel according to sutra 1.1.3.
- **Parameters**: `vowel` (string) - The 'ik' vowel to transform
- **Returns**: `string|null` - The guṇa form if the vowel is 'ik', null otherwise

### `applyVrddhiToIk(vowel)`
Applies vṛddhi transformation to an 'ik' vowel according to sutra 1.1.3.
- **Parameters**: `vowel` (string) - The 'ik' vowel to transform
- **Returns**: `string|null` - The vṛddhi form if the vowel is 'ik', null otherwise

### `getGunaVrddhiScope(word)`
Determines the scope of guṇa/vṛddhi operations in a given word.
- **Parameters**: `word` (string) - The word to analyze
- **Returns**: `Array` - Array of objects with vowel positions and their transformability

### `isOperationApplicable(vowel, operation)`
Validates if a guṇa or vṛddhi operation is applicable according to sutra 1.1.3.
- **Parameters**: 
  - `vowel` (string) - The vowel to check
  - `operation` (string) - Either 'guna' or 'vrddhi'
- **Returns**: `boolean` - True if the operation is applicable, false otherwise

## Transformations

### Guṇa Transformations
- i, ī → e
- u, ū → o
- ṛ, ṝ → ar
- ḷ, ḹ → al

### Vṛddhi Transformations
- i, ī → ai
- u, ū → au
- ṛ, ṝ → ār
- ḷ, ḹ → āl

## Test Coverage
The implementation includes comprehensive tests with 50 Sanskrit words in both IAST and Devanagari scripts, covering:
- 25 words with 'ik' vowels (should return true)
- 25 words with non-'ik' vowels (should return false)
- Guṇa transformation functions for 'ik' vowels
- Vṛddhi transformation functions for 'ik' vowels
- Operation applicability validation
- Scope analysis functions

## Usage Example
```javascript
import { isIkVowel, applyGunaToIk, applyVrddhiToIk } from './index.js';

console.log(isIkVowel('i'));        // true
console.log(isIkVowel('u'));        // true
console.log(isIkVowel('a'));        // false

console.log(applyGunaToIk('i'));    // 'e'
console.log(applyGunaToIk('u'));    // 'o'
console.log(applyGunaToIk('a'));    // null

console.log(applyVrddhiToIk('i'));  // 'ai'
console.log(applyVrddhiToIk('u'));  // 'au'
console.log(applyVrddhiToIk('a'));  // null
```

## Linguistic Significance
This sutra is fundamental to Sanskrit grammar as it:
1. Establishes the default scope of vowel transformations
2. Provides the theoretical foundation for sandhi rules
3. Defines which vowels are subject to guṇa and vṛddhi operations
4. Serves as a reference point for other grammatical rules

## References
- Aṣṭādhyāyī 1.1.3
- Pāṇini's Sanskrit Grammar
- Traditional paribhāṣā literature
- Sanskrit linguistic theory
