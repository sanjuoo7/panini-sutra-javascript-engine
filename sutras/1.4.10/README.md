# Sutra 1.4.10: ह्रस्वं लघु

## Overview

**Sanskrit Text**: `ह्रस्वं लघु`
**Transliteration**: `hrasvaṃ laghu`
**Translation**: A short (`hrasva`) vowel is termed `laghu` (light).

## Purpose

This sūtra is a `saṃjñā` (technical term) rule that defines the term `laghu` (light syllable). It states that any short vowel (`a`, `i`, `u`, `ṛ`, `ḷ`) constitutes a `laghu` syllable. This is a foundational rule for phonology and metrics in Sanskrit grammar.

## Implementation

### Function Signature
```javascript
function applySutra1_4_10(syllable, context) {
    // Implementation details
}
```

### Key Features
- Assigns the `laghu` saṃjñā.
- Applies to syllables whose nucleus is a short vowel.

### Dependencies
- **Sanskrit Utils**: A utility to identify the vowel in a syllable and determine if it is short.

## Usage Examples

### Basic Usage
```javascript
import { applySutra1_4_10 } from './index.js';

// Example 1: Syllable with short 'a'
const result1 = applySutra1_4_10('ka', { vowel: 'a', vowelLength: 'short' });
console.log(result1); // Expected: { applies: true, sanjna: 'laghu' }

// Example 2: Syllable with short 'i'
const result2 = applySutra1_4_10('ti', { vowel: 'i', vowelLength: 'short' });
console.log(result2); // Expected: { applies: true, sanjna: 'laghu' }

// Example 3: Syllable with a long vowel
const result3 = applySutra1_4_10('tā', { vowel: 'ā', vowelLength: 'long' });
console.log(result3); // Expected: { applies: false }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**:
- **Positive cases**: Syllables containing each of the short vowels (`a`, `i`, `u`, `ṛ`, `ḷ`).
- **Negative cases**: Syllables containing long vowels.
- **Note**: This rule is often superseded by the following sūtras (`saṃyoge guru` and `dīrghaṃ ca`) which can make a short vowel "heavy" (`guru`). The tests should reflect this rule in isolation.

### Running Tests
```bash
npm test sutras/1.4.10
```

## Technical Details

### Algorithm
1. Identify the vowel of the input syllable.
2. Determine the length of the vowel.
3. If the vowel's length is `short`, this sūtra applies and assigns the `laghu` saṃjñā.

### Performance
- **Time Complexity**: O(1).
- **Space Complexity**: O(1).

## Integration

### Related Sutras
- **`saṃyoge guru` (1.4.11)**: This rule makes a `laghu` vowel `guru` if it is followed by a consonant cluster.
- **`dīrghaṃ ca` (1.4.12)**: This rule defines long vowels as `guru`.
- These three sūtras together define the concepts of `laghu` and `guru` syllables.

### Used By
- Any part of the grammar that deals with syllable weight, such as prosody or certain phonological rules.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.10

---

*Generated from template: SUTRA_README_TEMPLATE.md*
