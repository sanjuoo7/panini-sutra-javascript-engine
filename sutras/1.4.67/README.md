# Sutra 1.4.67: पुरोऽव्ययम्

## Overview

**Sanskrit Text**: `पुरोऽव्ययम्`
**Transliteration**: puro'vyayam
**Translation**: The indeclinable word `puras` ('in front of') is termed `gati`.

## Purpose

This sutra designates the indeclinable word 'puras' (meaning 'in front of') as a 'gati' (preverb). This allows it to be treated as a prefix and form a compound with a verb, such as in `puraskṛtya` (having placed in front). The term `avyayam` (indeclinable) is crucial, as it distinguishes this `puras` from the declinable noun `pur` (city).

## Implementation

### Function Signature
```javascript
function isGatiPuras(word, context) {
    // Implementation details
}
```

### Key Features
- Checks if the input word is `puras`.
- Verifies from the context that it is an indeclinable (`avyayam`).
- Confirms the presence of a verb in the context.
- Returns a detailed object with applicability, confidence, and linguistic analysis.

### Dependencies
- **Sanskrit Utils**: `transliterate`.
- **Shared Functions**: A way to check if a word is an indeclinable.

## Usage Examples

### Basic Usage
```javascript
import { isGatiPuras } from './index.js';

// Example 1: 'puras' as an indeclinable
const result1 = isGatiPuras('puras', { verb: 'kṛ', isAvyayam: true });
console.log(result1);
/* Expected output:
{
  applies: true,
  confidence: 1,
  morphological: {
    category: 'gati',
    features: ['indeclinable']
  },
  semantic: {
    function: 'pre-verb',
    type: 'locative'
  },
  reasons: ["Word is 'puras'", "Word is an indeclinable", "Verb is present in context"]
}
*/

// Example 2: Devanagari input
const result2 = isGatiPuras('पुरस्', { verb: 'kṛ', isAvyayam: true });
console.log(result2);
/* Expected output:
{
  applies: true,
  confidence: 1,
  morphological: {
    category: 'gati',
    features: ['indeclinable']
  },
  semantic: {
    function: 'pre-verb',
    type: 'locative'
  },
  reasons: ["Word is 'पुरस्'", "Word is an indeclinable", "Verb is present in context"]
}
*/
```

### Advanced Usage
```javascript
// Example where 'puras' is not an indeclinable (e.g., a noun)
const result3 = isGatiPuras('puras', { verb: 'kṛ', isAvyayam: false });
console.log(result3);
/* Expected output:
{
  applies: false,
  confidence: 1,
  reasons: ["Word is not an indeclinable"]
}
*/

// Example without a verb
const result4 = isGatiPuras('puras', { isAvyayam: true });
console.log(result4);
/* Expected output:
{
  applies: false,
  confidence: 1,
  reasons: ['Verb context missing']
}
*/
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 50+ tests covering:
- Positive cases for `puras` as an indeclinable with various verbs (IAST and Devanagari).
- Negative cases where `puras` is present but is not an indeclinable.
- Negative cases where the verb is missing.
- Negative cases for other words.
- Edge cases with invalid inputs.
- Validation of the full structured output object.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.67

# Run with coverage
npm test sutras/1.4.67 --coverage
```

## Technical Details

### Algorithm
1.  Check if the input `word` is `puras` (`पुरस्`). If not, return a detailed object with `applies: false`.
2.  Verify from the context that `isAvyayam` is `true`. If not, return `applies: false`.
3.  Verify that `context.verb` is present. If not, return `applies: false`.
4.  If all conditions are met, return a rich object with `applies: true`. Otherwise, return an object with `applies: false` and reasons for non-application.

### Performance
- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

### Edge Cases
- The context must reliably distinguish between the indeclinable `puras` and the noun `pur`.
- The sandhi `puraḥ` is a common realization of `puras`, which should be handled.

## Integration

### Related Sutras
- This sutra is part of the `gati` section.
- It specifies a particular indeclinable that gets `gati` status.

### Used By
- Compounding (`samāsa`) rules.
- Sandhi rules (e.g., visarga sandhi).
- Accent rules.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.67
- **Implementation Notes**: The logic depends on accurate contextual information about the word's declinability.
- **Test References**: Examples like `puraskṛtya` are used for tests.
---

*Generated from template: SUTRA_README_TEMPLATE.md*
