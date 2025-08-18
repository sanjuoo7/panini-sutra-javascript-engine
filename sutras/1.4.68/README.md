# Sutra 1.4.68: अस्तं च

## Overview

**Sanskrit Text**: `अस्तं च`
**Transliteration**: astaṃ ca
**Translation**: And the indeclinable word `astam` is termed `gati`.

## Purpose

This sutra, through the particle `ca` (and), continues the topic from the previous sutra (`1.4.67 puro'vyayam`) and designates the indeclinable word 'astam' (अस्तम्) as a 'gati' (preverb). This word typically means 'home' or signifies 'setting' (as in the sun setting, `sūryo'staṃ gacchati`). As a `gati`, it can form a compound with a verb.

## Implementation

### Function Signature
```javascript
function isGatiAstam(word, context) {
    // Implementation details
}
```

### Key Features
- Checks if the input word is `astam`.
- Verifies from the context that it is an indeclinable (`avyayam`).
- Confirms the presence of a verb in the context.
- Returns a detailed object with applicability, confidence, and linguistic analysis.

### Dependencies
- **Sanskrit Utils**: `transliterate`.
- **Shared Functions**: A way to check if a word is an indeclinable.

## Usage Examples

### Basic Usage
```javascript
import { isGatiAstam } from './index.js';

// Example 1: 'astam' as an indeclinable
const result1 = isGatiAstam('astam', { verb: 'gam', isAvyayam: true });
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
  reasons: ["Word is 'astam'", "Word is an indeclinable", "Verb is present in context"]
}
*/

// Example 2: Devanagari input
const result2 = isGatiAstam('अस्तम्', { verb: 'gam', isAvyayam: true });
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
  reasons: ["Word is 'अस्तम्'", "Word is an indeclinable", "Verb is present in context"]
}
*/
```

### Advanced Usage
```javascript
// Example where 'astam' is not an indeclinable
const result3 = isGatiAstam('astam', { verb: 'gam', isAvyayam: false });
console.log(result3);
/* Expected output:
{
  applies: false,
  confidence: 1,
  reasons: ["Word is not an indeclinable"]
}
*/

// Example without a verb
const result4 = isGatiAstam('astam', { isAvyayam: true });
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
- Positive cases for `astam` as an indeclinable with various verbs (IAST and Devanagari).
- Negative cases where `astam` is present but is not an indeclinable.
- Negative cases where the verb is missing.
- Negative cases for other words.
- Edge cases with invalid inputs.
- Validation of the full structured output object.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.68

# Run with coverage
npm test sutras/1.4.68 --coverage
```

## Technical Details

### Algorithm
1.  Check if the input `word` is `astam` (`अस्तम्`). If not, return a detailed object with `applies: false`.
2.  Verify from the context that `isAvyayam` is `true`.
3.  Verify that `context.verb` is present.
4.  If all conditions are met, return a rich object with `applies: true`. Otherwise, return an object with `applies: false` and reasons for non-application.

### Performance
- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

### Edge Cases
- The context must reliably indicate that `astam` is used as an indeclinable.
- The sandhi `astaṃ` is often written as `astam`. The implementation should handle both.

## Integration

### Related Sutras
- **1.4.67 (puro'vyayam)**: This sutra directly precedes and sets the context of an indeclinable being a 'gati'.
- **1.4.60 (gatiśca)**: The governing sutra for the 'gati' section.

### Used By
- Compounding (`samāsa`) rules.
- Sandhi rules.
- Accent rules.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.68
- **Implementation Notes**: The logic depends on accurate contextual information about the word's declinability.
- **Test References**: Examples like `astaṃgacchati` are used for tests.
---

*Generated from template: SUTRA_README_TEMPLATE.md*
