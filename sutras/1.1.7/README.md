# Sutra 1.1.7: हलोऽनन्तराः संयोगः

## Overview

**Sanskrit Text**: `हलोऽनन्तराः संयोगः`
**Transliteration**: halo'nantarāḥ saṃyogaḥ
**Translation**: Consonants unseparated by a vowel are called conjunct consonants.

## Purpose

This `saṃjñā` (definition) sutra defines the term `saṃyoga` (संयोग), which refers to a cluster of two or more consonants that are not separated by a vowel. This definition is fundamental for various phonological rules in Sanskrit grammar that operate on consonant clusters.

## Implementation

### Function Signature
```javascript
function isSamyoga(phonemes) {
    // Implementation details
}
```

### Key Features
- Identifies sequences of consonants.
- Checks for the absence of intervening vowels.
- Returns true if a `saṃyoga` is found, false otherwise.

### Dependencies
- **Sanskrit Utils**: May require utilities for phoneme classification (vowel/consonant identification).
- **Shared Functions**: Potentially depends on functions that handle phoneme arrays or sequences.

## Usage Examples

### Basic Usage
```javascript
import { isSamyoga } from './index.js';

// Example 1: A simple conjunct
const result1 = isSamyoga(['k', 't']);
console.log(result1); // Expected output: true (kt)

// Example 2: A conjunct with three consonants
const result2 = isSamyoga(['s', 't', 'r']);
console.log(result2); // Expected output: true (str)

// Example 3: Not a conjunct (separated by a vowel)
const result3 = isSamyoga(['k', 'a', 't']);
console.log(result3); // Expected output: false (k-a-t)

// Example 4: Single consonant (not a conjunct)
const result4 = isSamyoga(['k']);
console.log(result4); // Expected output: false
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: Comprehensive tests covering:
- Various combinations of consonants forming `saṃyoga`.
- Sequences with intervening vowels (negative cases).
- Edge cases like empty input, single consonants, and non-Sanskrit characters.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.7

# Run with coverage
npm test sutras/1.1.7 --coverage
```

## Technical Details

### Algorithm
The function will iterate through a sequence of phonemes, checking if consecutive phonemes are consonants and if there are no vowels between them. A `saṃyoga` is identified when two or more such consecutive consonants are found.

### Performance
- **Time Complexity**: O(n) - Linear with respect to the number of phonemes in the input sequence.
- **Space Complexity**: O(1) - Minimal memory usage.
- **Optimization Notes**: Efficient iteration and phoneme classification are key.

### Edge Cases
- Empty input arrays.
- Arrays with only vowels or single consonants.
- Input containing non-Sanskrit characters (should be handled gracefully, perhaps by ignoring or throwing an error).

## Integration

### Related Sutras
- This is a foundational `saṃjñā` sutra. Many other phonological rules in Panini's grammar rely on the definition of `saṃyoga`.

### Used By
- Any module in the Panini engine that needs to identify or operate on consonant clusters will utilize this definition. This includes rules for `sandhi` (euphonic combination), `lopa` (elision), and other phonological processes.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.7
- **Implementation Notes**: Adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md`.
- **Test References**: Test cases will be based on standard examples of consonant clusters in Sanskrit.

---

*Generated from template: SUTRA_README_TEMPLATE.md*