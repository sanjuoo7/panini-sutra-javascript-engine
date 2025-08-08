# Sutra 1.1.2: अदेङ् गुणः (adeṅ guṇaḥ)

## Definition
This sutra defines the term "guṇa" in Pāṇini's grammatical system. It states that the vowels **a** (अ), **e** (ए), and **o** (ओ) are called guṇa.

## Sanskrit Text
- **Devanagari**: अदेङ् गुणः
- **IAST**: adeṅ guṇaḥ

## Structure
- "aT" (अत्) refers to "a" (अ)
- "eṅ" (एङ्) is a pratyāhāra (abbreviation) that includes the vowels "e" (ए) and "o" (ओ)

## Functions

### `isGuna(vowel)`
Checks if a given vowel is a guṇa vowel.
- **Parameters**: `vowel` (string) - The vowel to check
- **Returns**: `boolean` - True if the vowel is a guṇa vowel, false otherwise

### `getGunaForm(vowel)`
Gets the guṇa form of a vowel according to Pāṇini's system.
- **Parameters**: `vowel` (string) - The input vowel
- **Returns**: `string|null` - The guṇa form if applicable, null otherwise

### `applyGuna(vowel)`
Applies guṇa transformation to a vowel if it's in the ik category (i, u, ṛ, ḷ).
- **Parameters**: `vowel` (string) - The vowel to transform
- **Returns**: `string` - The transformed vowel or the original if no transformation applies

## Transformations
- i, ī → e
- u, ū → o
- ṛ, ṝ → ar
- ḷ, ḹ → al

## Test Coverage
The implementation includes comprehensive tests with 50 Sanskrit words in both IAST and Devanagari scripts, covering:
- 25 words with guṇa vowels (should return true)
- 25 words with non-guṇa vowels (should return false)
- Guṇa transformation functions
- Error handling and edge cases

## Usage Example
```javascript
import { isGuna, applyGuna } from './index.js';

console.log(isGuna('a'));      // true
console.log(isGuna('e'));      // true
console.log(isGuna('o'));      // true
console.log(isGuna('i'));      // false

console.log(applyGuna('i'));   // 'e'
console.log(applyGuna('u'));   // 'o'
console.log(applyGuna('ṛ'));   // 'ar'
```

## References
- Aṣṭādhyāyī 1.1.2
- Pāṇini's Sanskrit Grammar
- Traditional Sanskrit linguistic concepts
