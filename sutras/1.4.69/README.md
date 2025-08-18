# Sutra 1.4.69: अच्छ गत्यर्थवदेषु

## Overview

**Sanskrit Text**: `अच्छ गत्यर्थवदेषु`
**Transliteration**: accha gatyarthavadeṣu
**Translation**: The indeclinable word `accha` ('to', 'towards') is termed `gati` when used with verbs of motion or with the verb `vad` ('to speak').

## Purpose

This sutra designates the indeclinable 'accha' (meaning 'to' or 'towards') as a 'gati' (preverb), but only under specific conditions: it must be used with a verb that implies motion ('gatyartha') or the specific verb 'vad' ('to speak'). For example, `accha gacchati` (goes towards) or `acchavadati` (speaks to).

## Implementation

### Function Signature
```javascript
function isGatiAccha(word, context) {
    // Implementation details
}
```

### Key Features
- Checks if the input word is `accha`.
- Checks the context for the verb's semantic category (e.g., `verbMeaning: 'motion'`) or if the verb is 'vad'.
- Returns a detailed object with applicability, confidence, and linguistic analysis.

### Dependencies
- **Sanskrit Utils**: `transliterate`.
- **Shared Functions**: A way to get a verb's semantic meaning.

## Usage Examples

### Basic Usage
```javascript
import { isGatiAccha } from './index.js';

// Example 1: 'accha' with a verb of motion
const result1 = isGatiAccha('accha', { verb: 'gam', verbMeaning: 'motion' });
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
    type: 'directional'
  },
  reasons: ["Word is 'accha'", "Verb has a sense of motion"]
}
*/

// Example 2: 'accha' with the verb 'vad'
const result2 = isGatiAccha('accha', { verb: 'vad' });
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
    type: 'directional'
  },
  reasons: ["Word is 'accha'", "Verb is 'vad'"]
}
*/
```

### Advanced Usage
```javascript
// Example where 'accha' is used with a verb not of motion or 'vad'
const result3 = isGatiAccha('accha', { verb: 'pac' });
console.log(result3);
/* Expected output:
{
  applies: false,
  confidence: 0.9,
  reasons: ["Verb is not 'vad' and does not have a sense of motion"]
}
*/

// Example with a different word
const result4 = isGatiAccha('anyaword', { verb: 'gam', verbMeaning: 'motion' });
console.log(result4);
/* Expected output:
{
  applies: false,
  confidence: 1,
  reasons: ["Word is not 'accha'"]
}
*/
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 50+ tests covering:
- Positive cases for `accha` with motion verbs (IAST and Devanagari).
- Positive cases for `accha` with `vad` (IAST and Devanagari).
- Negative cases with other verbs.
- Edge cases like missing context.
- Validation of the full structured output object.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.69

# Run with coverage
npm test sutras/1.4.69 --coverage
```

## Technical Details

### Algorithm
1.  Check if the input `word` is `accha` (`अच्छ`). If not, return a detailed object with `applies: false`.
2.  Inspect the `context` object to see if `context.verbMeaning` is 'motion' or if `context.verb` is 'vad'.
3.  If one of these conditions is met, return a rich object with `applies: true`. Otherwise, return an object with `applies: false`.

### Performance
- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

### Edge Cases
- The determination of a verb's meaning as 'motion' is external to this rule's logic.
- The `context` object or its properties (`verbMeaning`, `verb`) are missing.

## Integration

### Related Sutras
- **1.4.60 (gatiśca)**: The governing sutra for the 'gati' section.

### Used By
- Compounding (`samāsa`) rules.
- Accent rules.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.69
- **Implementation Notes**: Relies on accurate semantic information about the verb.
- **Test References**: Examples like `acchagacchati` and `acchodya` are used for tests.
---

*Generated from template: SUTRA_README_TEMPLATE.md*
