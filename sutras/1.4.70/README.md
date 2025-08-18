# Sutra 1.4.70: अदोऽनुपदेशे

## Overview

**Sanskrit Text**: `अदोऽनुपदेशे`
**Transliteration**: ado'nupadeśe
**Translation**: The word `adas` ('that') is termed `gati` when not used in the sense of a direct instruction (`anupadeśe`).

## Purpose

This sutra designates the word 'adas' ('that') as a 'gati' (preverb) under the specific semantic condition that it is 'anupadeśe'. This means it is not being used to give a command or to point something out directly to a person (e.g., "Look at *that*!"). Instead, it is used in a more abstract or narrative sense, such as in `adaḥkṛtya` (having done that).

## Implementation

### Function Signature
```javascript
function isGatiAdas(word, context) {
    // Implementation details
}
```

### Key Features
- Checks if the input word is `adas`.
- Checks the context for the semantic condition `isUpadeśa: false`.
- Confirms the presence of a verb in the context.
- Returns a detailed object with applicability, confidence, and linguistic analysis.

### Dependencies
- **Sanskrit Utils**: `transliterate`.
- **Shared Functions**: A way to determine the semantic sense of the utterance.

## Usage Examples

### Basic Usage
```javascript
import { isGatiAdas } from './index.js';

// Example 1: 'adas' without instruction
const result1 = isGatiAdas('adas', { verb: 'kṛ', isUpadeśa: false });
console.log(result1);
/* Expected output:
{
  applies: true,
  confidence: 1,
  morphological: {
    category: 'gati',
    features: ['pronominal']
  },
  semantic: {
    function: 'pre-verb',
    type: 'anaphoric'
  },
  reasons: ["Word is 'adas'", "Context is not an instruction", "Verb is present in context"]
}
*/

// Example 2: Devanagari input
const result2 = isGatiAdas('अदस्', { verb: 'kṛ', isUpadeśa: false });
console.log(result2);
/* Expected output:
{
  applies: true,
  confidence: 1,
  morphological: {
    category: 'gati',
    features: ['pronominal']
  },
  semantic: {
    function: 'pre-verb',
    type: 'anaphoric'
  },
  reasons: ["Word is 'अदस्'", "Context is not an instruction", "Verb is present in context"]
}
*/
```

### Advanced Usage
```javascript
// Example where 'adas' is used as an instruction
const result3 = isGatiAdas('adas', { verb: 'paśya', isUpadeśa: true });
console.log(result3);
/* Expected output:
{
  applies: false,
  confidence: 1,
  reasons: ["Context is an instruction"]
}
*/

// Example without a verb
const result4 = isGatiAdas('adas', { isUpadeśa: false });
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
- Positive cases for `adas` in a non-instructional context (IAST and Devanagari).
- Negative cases where `adas` is used in an instructional context.
- Negative cases for other words.
- Negative cases where a verb is missing.
- Edge cases with invalid inputs.
- Validation of the full structured output object.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.70

# Run with coverage
npm test sutras/1.4.70 --coverage
```

## Technical Details

### Algorithm
1.  Check if the input `word` is `adas` (`अदस्`) or its sandhi form `ado` (`अदो`).
2.  Verify from the context that `isUpadeśa` is `false`.
3.  Verify that `context.verb` is present.
4.  If all conditions are met, return a rich object with `applies: true`. Otherwise, return an object with `applies: false`.

### Performance
- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

### Edge Cases
- The context must reliably determine if the usage is instructional (`upadeśa`).
- The sandhi form `ado` (from `adaḥ`) before a voiced consonant should be handled.

## Integration

### Related Sutras
- **1.4.60 (gatiśca)**: The governing sutra for the 'gati' section.

### Used By
- Compounding (`samāsa`) rules.
- Sandhi rules.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.70
- **Implementation Notes**: The logic relies heavily on accurate semantic context.
- **Test References**: Examples like `adaḥkṛtya` are used for tests.
---

*Generated from template: SUTRA_README_TEMPLATE.md*
