# Sutra 1.4.11: संयोगे गुरु

## Overview

**Sanskrit Text**: `संयोगे गुरु`
**Transliteration**: `saṃyoge guru`
**Translation**: A short vowel is `guru` (heavy) when followed by a `saṃyoga` (consonant cluster).

## Purpose

This sūtra is a `saṃjñā` (technical term) rule that defines a condition for a syllable to be considered `guru` (heavy). The `anuvṛtti` (continuation) of `hrasvaṃ` (a short vowel) from the previous sūtra is key. This rule states that a syllable that would otherwise be `laghu` (light) because it contains a short vowel (per 1.4.10) is instead termed `guru` if that short vowel is immediately followed by a consonant cluster.

This is a critical rule for syllable weight, impacting phonology and poetic meter.

## Implementation

### Function Signature
```javascript
function applySutra1_4_11(syllable, context) {
    // Implementation details
}
```

### Key Features
- Assigns the `guru` saṃjñā.
- Applies to syllables with a short vowel followed by a consonant cluster.
- Overrides the `laghu` designation from 1.4.10 in this specific context.

### Dependencies
- **Sanskrit Utils**: A utility to check if a syllable is followed by a consonant cluster.

## Usage Examples

### Basic Usage
```javascript
import { applySutra1_4_11 } from './index.js';

// Example 1: Short 'a' before 'ndra'
// The syllable 'i' in 'indra' is guru because it's followed by 'ndr'.
const result1 = applySutra1_4_11('i', { vowel: 'i', vowelLength: 'short', followedByConjunct: true });
console.log(result1); // Expected: { applies: true, sanjna: 'guru' }

// Example 2: Short 'a' not before a conjunct
const result2 = applySutra1_4_11('ka', { vowel: 'a', vowelLength: 'short', followedByConjunct: false });
console.log(result2); // Expected: { applies: false }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**:
- **Positive cases**: Short vowels in syllables that precede a consonant cluster (e.g., the `a` in `vak-ra`, the `i` in `in-dra`).
- **Negative cases**:
    - Short vowels not followed by a consonant cluster.
    - Long vowels (which are handled by the next sūtra).

### Running Tests
```bash
npm test sutras/1.4.11
```

## Technical Details

### Algorithm
1. Check if the syllable's vowel is `short`.
2. Check if the syllable is followed by a `saṃyoga` (consonant cluster).
3. If both conditions are true, this sūtra applies and assigns the `guru` saṃjñā. This rule has precedence over 1.4.10.

### Performance
- **Time Complexity**: O(1).
- **Space Complexity**: O(1).

## Integration

### Related Sutras
- **`hrasvaṃ laghu` (1.4.10)**: This is the general rule that 1.4.11 provides a major exception to.
- **`dīrghaṃ ca` (1.4.12)**: This rule provides the other main condition for a syllable to be `guru`.

### Used By
- The phonological engine for determining syllable weight.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.11

---

*Generated from template: SUTRA_README_TEMPLATE.md*
