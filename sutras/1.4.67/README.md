# Sutra 1.4.67: पुरोऽव्ययम्

## Overview

**Sanskrit Text**: `पुरोऽव्ययम्`
**Transliteration**: puro'vayayama
**Translation**: The word पुरः 'in front of', when indeclinable and in composition with a verb, is called गति।

## Purpose

This sutra designates the indeclinable word 'puras' (meaning 'in front of') as a 'gati' (preverb). This allows it to be treated as a prefix and form a compound with a verb.

## Implementation

### Function Signature
```javascript
function applySutra1_4_67(word, context) {
    // Implementation details
}
```

### Key Features
- Identifies the word "puras" (पुरः).
- Verifies from the context that it is an indeclinable (`avyayam`).
- Returns a boolean indicating if the sutra applies.

### Dependencies
- **Sanskrit Utils**: None identified yet.
- **Shared Functions**: None identified yet.

## Usage Examples

### Basic Usage
```javascript
import applySutra1_4_67 from './index.js';

// Example 1: 'puras' as an indeclinable
const result1 = applySutra1_4_67('puraḥkaroti', { isAvyayam: true });
console.log(result1); // Expected output: { applies: true, word: 'puraḥkaroti' }

// Example 2: Devanagari input
const result2 = applySutra1_4_67('पुरःकरोति', { isAvyayam: true });
console.log(result2); // Expected output: { applies: true, word: 'पुरःकरोति' }
```

### Advanced Usage
```javascript
// Example where 'puras' is not an indeclinable (e.g., a noun)
const result3 = applySutra1_4_67('puraḥ', { isAvyayam: false });
console.log(result3); // Expected output: { applies: false }

// Example with a different word
const result4 = applySutra1_4_67('anyaword', { isAvyayam: true });
console.log(result4); // Expected output: { applies: false }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 50+ tests covering:
- Positive cases for 'puras' in both IAST and Devanagari.
- Negative cases where 'puras' is present but is not an indeclinable.
- Negative cases for other words.
- Edge cases like empty strings or invalid context.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.67

# Run with coverage
npm test sutras/1.4.67 --coverage
```

## Technical Details

### Algorithm
The function will check if the input string starts with 'puras' (or 'पुरः'). It will then verify that the `context` object has a property `isAvyayam` set to `true`. If both conditions are met, the sutra applies.

### Performance
- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

### Edge Cases
- Input is not a string or is empty.
- The `context` object is missing or `isAvyayam` is not specified.

## Integration

### Related Sutras
- **1.4.60 (gatiśca)**: This sutra is part of the 'gati' section.
- **1.4.66 (kaṇemanasī...)**: The preceding sutra, also defining 'gati'.

### Used By
- Higher-level logic for verb compounding.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.67

---

*Generated from template: SUTRA_README_TEMPLATE.md*
