# Sutra 1.4.69: अच्छ गत्यर्थवदेषु

## Overview

**Sanskrit Text**: `अच्छ गत्यर्थवदेषु`
**Transliteration**: acacha gatayarathavadeṣu
**Translation**: The indeclinable word अच्छ 'before in the presence of' is called गति , when used in the composition with verbs denoting 'motion' or with the verb वद् 'to speak'.

## Purpose

This sutra designates the indeclinable 'accha' (meaning 'to' or 'towards') as a 'gati' (preverb), but only under specific conditions: it must be used with a verb that implies motion ('gatyartha') or the specific verb 'vad' ('to speak').

## Implementation

### Function Signature
```javascript
function applySutra1_4_69(word, context) {
    // Implementation details
}
```

### Key Features
- Identifies the word "accha" (अच्छ).
- Checks the context for the verb's semantic category (e.g., `verbMeaning: 'motion'`) or if the verb is 'vad'.
- Returns a boolean indicating if the sutra applies.

### Dependencies
- **Sanskrit Utils**: May need a utility to identify verb meanings.
- **Shared Functions**: None identified yet.

## Usage Examples

### Basic Usage
```javascript
import applySutra1_4_69 from './index.js';

// Example 1: 'accha' with a verb of motion
const result1 = applySutra1_4_69('acchagacchati', { verbRoot: 'gam', verbMeaning: 'motion' });
console.log(result1); // Expected output: { applies: true, word: 'acchagacchati' }

// Example 2: 'accha' with the verb 'vad'
const result2 = applySutra1_4_69('acchavadati', { verbRoot: 'vad' });
console.log(result2); // Expected output: { applies: true, word: 'acchavadati' }
```

### Advanced Usage
```javascript
// Example where 'accha' is used with a verb not of motion or 'vad'
const result3 = applySutra1_4_69('acchapacati', { verbRoot: 'pac' });
console.log(result3); // Expected output: { applies: false }

// Example with a different word
const result4 = applySutra1_4_69('anyaword', { verbRoot: 'gam', verbMeaning: 'motion' });
console.log(result4); // Expected output: { applies: false }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 50+ tests covering:
- Positive cases for 'accha' with motion verbs (IAST and Devanagari).
- Positive cases for 'accha' with 'vad' (IAST and Devanagari).
- Negative cases with other verbs.
- Edge cases like missing context.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.69

# Run with coverage
npm test sutras/1.4.69 --coverage
```

## Technical Details

### Algorithm
The function will check for the prefix 'accha' (or 'अच्छ'). It will then inspect the `context` object to see if `context.verbMeaning` is 'motion' or if `context.verbRoot` is 'vad'.

### Performance
- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

### Edge Cases
- The `context` object or its properties (`verbMeaning`, `verbRoot`) are missing.

## Integration

### Related Sutras
- **1.4.60 (gatiśca)**: The governing sutra for the 'gati' section.

### Used By
- Verb compounding logic.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.69

---

*Generated from template: SUTRA_README_TEMPLATE.md*
