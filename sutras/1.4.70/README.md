# Sutra 1.4.70: अदोऽनुपदेशे

## Overview

**Sanskrit Text**: `अदोऽनुपदेशे`
**Transliteration**: ado'nupadeśe
**Translation**: The word अदस् 'that' is called गति when in composition with a verb and not implying a direction to another.

## Purpose

This sutra designates the word 'adas' ('that') as a 'gati' (preverb) under the specific semantic condition that it is 'anupadeśe', meaning it is not being used to give an instruction or point something out directly to a person.

## Implementation

### Function Signature
```javascript
function applySutra1_4_70(word, context) {
    // Implementation details
}
```

### Key Features
- Identifies the word "adas" (अदस्).
- Checks the context for the semantic condition `isUpadeśa: false`.
- Returns a boolean indicating if the sutra applies.

### Dependencies
- **Sanskrit Utils**: None identified yet.
- **Shared Functions**: None identified yet.

## Usage Examples

### Basic Usage
```javascript
import applySutra1_4_70 from './index.js';

// Example 1: 'adas' without instruction
const result1 = applySutra1_4_70('adaḥkṛtvā', { isUpadeśa: false });
console.log(result1); // Expected output: { applies: true, word: 'adaḥkṛtvā' }

// Example 2: Devanagari input
const result2 = applySutra1_4_70('अदःकृत्वा', { isUpadeśa: false });
console.log(result2); // Expected output: { applies: true, word: 'अदःकृत्वा' }
```

### Advanced Usage
```javascript
// Example where 'adas' is used as an instruction
const result3 = applySutra1_4_70('adaḥ paśya', { isUpadeśa: true });
console.log(result3); // Expected output: { applies: false }

// Example with a different word
const result4 = applySutra1_4_70('anyaword', { isUpadeśa: false });
console.log(result4); // Expected output: { applies: false }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 50+ tests covering:
- Positive cases for 'adas' in a non-instructional context (IAST and Devanagari).
- Negative cases where 'adas' is used in an instructional context.
- Negative cases for other words.
- Edge cases like missing context.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.70

# Run with coverage
npm test sutras/1.4.70 --coverage
```

## Technical Details

### Algorithm
The function will check for the prefix 'adas' (or 'अदस्'). It will then check the `context` object to ensure `context.isUpadeśa` is `false`.

### Performance
- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

### Edge Cases
- The `context` object or the `isUpadeśa` property is missing.

## Integration

### Related Sutras
- **1.4.60 (gatiśca)**: The governing sutra for the 'gati' section.

### Used By
- Verb compounding logic.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.70

---

*Generated from template: SUTRA_README_TEMPLATE.md*
