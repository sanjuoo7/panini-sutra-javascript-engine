# Sutra 1.1.71: आदिरन्त्येन सहेता

## Overview

**Sanskrit Text**: `आदिरन्त्येन सहेता`  
**Transliteration**: `ādir antyena saheta`  
**Translation**: "An initial letter, with a final इत् letter, is the name of itself and of the intervening letters."

## Purpose

This is the fundamental **pratyāhāra** rule in Paninian grammar. A pratyāhāra is a technical term formed by combining an initial letter with a final इत् (indicator) letter to represent a group of phonemes. This sutra establishes how to construct these phoneme groups that are used extensively throughout Sanskrit grammar to refer to classes of sounds efficiently.

For example:
- **अच्** (a + c) refers to all vowels
- **हल्** (h + l) refers to all consonants  
- **इक्** (i + k) refers to the इक् vowels (i, u, ṛ, ḷ)

## Implementation

### Function Signature
```javascript
/**
 * Constructs a pratyāhāra (group of letters) based on start and end markers.
 *
 * @param {string} startLetter - The initial letter of the pratyāhāra
 * @param {string} itMarker - The इत् marker letter
 * @param {string[]} alphabet - Array of phonemes to search within
 * @returns {string[]} Array of letters included in the pratyāhāra
 */
export function getPratyahara(startLetter, itMarker, alphabet = null)
```

### Key Features
- Constructs pratyāhāras from the traditional Śivasūtras
- Supports custom alphabets for specialized pratyāhāra construction
- Provides access to common pratyāhāras used in Paninian grammar
- Validates pratyāhāra formation according to traditional rules
- Correctly excludes the इत् marker from the final result

### Dependencies
- **Internal**: Uses the traditional Śivasūtra sequence for phoneme ordering
- **No external dependencies**: Self-contained implementation

## Usage Examples

### Basic Usage
```javascript
import { getShivaSutraPratyahara, getCommonPratyahara } from './index.js';

// Classical pratyāhāras from Śivasūtras
console.log(getShivaSutraPratyahara('a', 'c')); 
// Returns vowels: ['a', 'i', 'u', 'ṛ', 'ḷ', 'e', 'o', 'ai', 'au']

console.log(getShivaSutraPratyahara('i', 'k')); 
// Returns इक् vowels: ['i', 'u', 'ṛ', 'ḷ']

console.log(getShivaSutraPratyahara('h', 'l')); 
// Returns consonants: ['h', 'y', 'v', 'r', ...]

// Access pre-defined common pratyāhāras
console.log(getCommonPratyahara('ac'));  // All vowels
console.log(getCommonPratyahara('hal')); // All consonants
console.log(getCommonPratyahara('ik'));  // इक् vowels
console.log(getCommonPratyahara('aṇ'));  // Vowels + semivowels
```

### Advanced Usage
```javascript
import { getPratyahara, isValidPratyahara } from './index.js';

// Custom alphabet pratyāhāra construction
const customAlphabet = ['x', 'y', 'z', 'a', 'b', 'c'];
console.log(getPratyahara('y', 'b', customAlphabet)); 
// Returns: ['y', 'z', 'a']

// Validate pratyāhāra formation
console.log(isValidPratyahara('a', 'c')); // true
console.log(isValidPratyahara('x', 'y')); // false (not in Śivasūtras)

// Empty results for invalid combinations
console.log(getPratyahara('c', 'a')); // [] (reverse order)
console.log(getPratyahara('xyz', 'c')); // [] (invalid start)
```

### Practical Applications
```javascript
// Use in grammatical analysis
const vowels = getCommonPratyahara('ac');
const isVowel = (phoneme) => vowels.includes(phoneme);

const consonants = getCommonPratyahara('hal');  
const isConsonant = (phoneme) => consonants.includes(phoneme);

// Use in morphological operations
const ikVowels = getCommonPratyahara('ik');
const canTakeGuna = (vowel) => ikVowels.includes(vowel);
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 24 tests covering:
- Basic pratyāhāra construction from Śivasūtras
- Edge cases and validation (invalid inputs, empty strings, non-strings)
- Custom alphabet support for specialized applications
- Common pratyāhāras access and validation
- Śivasūtra constants structure validation
- Real-world Sanskrit examples and classical usage

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.71

# Run with coverage
npm test sutras/1.1.71 -- --coverage
```

## Technical Details

### Algorithm
1. Take the starting letter and इत् marker as input
2. Find their positions in the Śivasūtra sequence (or custom alphabet)
3. Extract all letters between start and इत् marker (exclusive of इत्)
4. Return the resulting phoneme group

### Performance
- **Time Complexity**: O(N), where N is the size of the alphabet
- **Space Complexity**: O(M), where M is the size of the resulting pratyāhāra

### Constants Provided
- **SHIVA_SUTRAS**: The traditional 14 Śivasūtras without इत् markers
- **SHIVA_SUTRAS_WITH_IT**: Complete Śivasūtras including इत् markers for construction
- **COMMON_PRATYAHARAS**: Pre-calculated common pratyāhāras (अच्, हल्, इक्, अण्)

## Integration

### Related Sutras
- **Sutra 1.1.1**: Uses the vowels defined by अच् pratyāhāra
- **Sutra 1.1.3**: Uses the इक् pratyāhāra for guṇa/vṛddhi operations
- **Multiple sutras**: Throughout Paninian grammar, pratyāhāras are used to refer to phoneme classes

### Used By
- Any grammatical engine component that needs to classify phonemes into traditional groups
- Morphological analysis systems requiring vowel/consonant classification
- Sandhi rules that operate on specific phoneme classes
- Educational tools teaching Sanskrit phonetics and grammar

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.71
- **Śivasūtras**: The traditional 14 sūtras forming the phonetic alphabet
- **Traditional Commentary**: Establishes the foundational framework for all subsequent phoneme classification

---

*Generated from template: SUTRA_README_TEMPLATE.md*
