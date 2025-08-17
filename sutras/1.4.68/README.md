# Sutra 1.4.68: अस्तं च

## Overview

**Sanskrit Text**: `अस्तं च`
**Transliteration**: asataṃ ca
**Translation**: And the indeclinable word अस्तम् 'at home' is called गति , when in composition with a verb.

## Purpose

This sutra, through the particle 'ca' (and), continues the designation of 'gati' (preverb) to the indeclinable word 'astam' (अस्तम्), which means 'at home' or signifies setting (like the sun). This allows it to form a compound with a verb.

## Implementation

### Function Signature
```javascript
function applySutra1_4_68(word, context) {
    // Implementation details
}
```

### Key Features
- Identifies the word "astam" (अस्तम्).
- Verifies from the context that it is an indeclinable (`avyayam`).
- Returns a boolean indicating if the sutra applies.

### Dependencies
- **Sanskrit Utils**: None identified yet.
- **Shared Functions**: None identified yet.

## Usage Examples

### Basic Usage
```javascript
import applySutra1_4_68 from './index.js';

// Example 1: 'astam' as an indeclinable
const result1 = applySutra1_4_68('astaṅgacchati', { isAvyayam: true });
console.log(result1); // Expected output: { applies: true, word: 'astaṅgacchati' }

// Example 2: Devanagari input
const result2 = applySutra1_4_68('अस्तंगच्छति', { isAvyayam: true });
console.log(result2); // Expected output: { applies: true, word: 'अस्तंगच्छति' }
```

### Advanced Usage
```javascript
// Example where 'astam' is not an indeclinable
const result3 = applySutra1_4_68('astam', { isAvyayam: false });
console.log(result3); // Expected output: { applies: false }

// Example with a different word
const result4 = applySutra1_4_68('anyaword', { isAvyayam: true });
console.log(result4); // Expected output: { applies: false }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 50+ tests covering:
- Positive cases for 'astam' in both IAST and Devanagari.
- Negative cases where 'astam' is present but is not an indeclinable.
- Negative cases for other words.
- Edge cases like empty strings or invalid context.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.68

# Run with coverage
npm test sutras/1.4.68 --coverage
```

## Technical Details

### Algorithm
The function will check if the input string starts with 'astam' (or 'अस्तम्'). It will then verify that the `context` object has a property `isAvyayam` set to `true`.

### Performance
- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

### Edge Cases
- Input is not a string or is empty.
- The `context` object is missing or `isAvyayam` is not specified.

## Integration

### Related Sutras
- **1.4.67 (puro'vayayama)**: This sutra directly precedes and sets the context of an indeclinable being a 'gati'.
- **1.4.60 (gatiśca)**: The governing sutra for the 'gati' section.

### Used By
- Verb compounding logic.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.68

---

*Generated from template: SUTRA_README_TEMPLATE.md*
