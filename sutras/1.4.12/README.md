# Sutra 1.4.12: दीर्घं च

## Overview

**Sanskrit Text**: `दीर्घं च`
**Transliteration**: `dīrghaṃ ca`
**Translation**: And a long (`dīrgha`) vowel is also (`ca`) `guru` (heavy).

## Purpose

This sūtra is a `saṃjñā` (technical term) rule that provides the second primary condition for a syllable to be termed `guru` (heavy). The word `ca` (and) continues the `guru` designation from the previous sūtra (1.4.11). This rule simply states that any syllable containing a long vowel (`ā`, `ī`, `ū`, `ṝ`, `e`, `o`, `ai`, `au`) is `guru`.

This rule, along with 1.4.10 and 1.4.11, completes the fundamental definition of syllable weight in Pāṇini's grammar.

## Implementation

### Function Signature
```javascript
function applySutra1_4_12(syllable, context) {
    // Implementation details
}
```

### Key Features
- Assigns the `guru` saṃjñā.
- Applies to any syllable containing a long vowel.

### Dependencies
- **Sanskrit Utils**: A utility to identify the vowel in a syllable and determine if it is long.

## Usage Examples

### Basic Usage
```javascript
import { applySutra1_4_12 } from './index.js';

// Example 1: Syllable with long 'ā'
const result1 = applySutra1_4_12('tā', { vowel: 'ā', vowelLength: 'long' });
console.log(result1); // Expected: { applies: true, sanjna: 'guru' }

// Example 2: Syllable with long 'e'
const result2 = applySutra1_4_12('te', { vowel: 'e', vowelLength: 'long' });
console.log(result2); // Expected: { applies: true, sanjna: 'guru' }

// Example 3: Syllable with a short vowel
const result3 = applySutra1_4_12('ta', { vowel: 'a', vowelLength: 'short' });
console.log(result3); // Expected: { applies: false }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**:
- **Positive cases**: Syllables containing each of the long vowels (`ā`, `ī`, `ū`, `ṝ`, `e`, `o`, `ai`, `au`).
- **Negative cases**: Syllables containing short vowels (unless they are made `guru` by 1.4.11, which is a separate concern).

### Running Tests
```bash
npm test sutras/1.4.12
```

## Technical Details

### Algorithm
1. Identify the vowel of the input syllable.
2. Determine the length of the vowel.
3. If the vowel's length is `long`, this sūtra applies and assigns the `guru` saṃjñā.

### Performance
- **Time Complexity**: O(1).
- **Space Complexity**: O(1).

## Integration

### Related Sutras
- **`hrasvaṃ laghu` (1.4.10)**: Defines `laghu` syllables.
- **`saṃyoge guru` (1.4.11)**: Defines the first condition for a syllable to be `guru`.
- Together, these three sūtras form a complete system for determining basic syllable weight.

### Used By
- The phonological engine for determining syllable weight.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.12

---

*Generated from template: SUTRA_README_TEMPLATE.md*
