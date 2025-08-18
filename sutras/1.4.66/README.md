# Sutra 1.4.66: कणेमनसी श्रद्धाप्रतीघाते

## Overview

**Sanskrit Text**: `कणेमनसी श्रद्धाप्रतीघाते`
**Transliteration**: kaṇemanasī śraddhāpratīghāte
**Translation**: The words `kaṇe` and `manas` are termed `gati` when they signify 'reaction by satiation' (`śraddhāpratīghāta`), and are used with a verb.

## Purpose

This sutra assigns the `gati` status to the words `kaṇe` and `manas` under the specific semantic condition of `śraddhāpratīghāta`. This term refers to a reaction of refusal or disrespect towards an offering (usually food) due to being full or satiated. When these words are classified as `gati`, they form a compound with the following verb.

## Implementation

### Function Signature
```javascript
function isGatiKaneManas(word, context) {
    // Implementation details
}
```

### Key Features
- Checks if the input word is `kaṇe` or `manas`.
- Verifies the semantic context implies `śraddhāpratīghāta` (reaction by satiation).
- Confirms the presence of a verb in the context.
- Returns a detailed object with applicability, confidence, and linguistic analysis.

### Dependencies
- **Sanskrit Utils**: `transliterate`.
- **Shared Functions**: A way to infer semantic meaning from the context.

## Usage Examples

### Basic Usage
```javascript
import { isGatiKaneManas } from './index.js';

// Example 1: 'kaṇe' with the required semantic context
const result1 = isGatiKaneManas('kaṇe', { verb: 'han', meaning: 'śraddhāpratīghāta' });
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
    type: 'qualifier'
  },
  reasons: ["Word is 'kaṇe'", "Context meaning is 'śraddhāpratīghāta'", "Verb is present in context"]
}
*/

// Example 2: 'manas' with the required semantic context
const result2 = isGatiKaneManas('manas', { verb: 'kṛ', meaning: 'śraddhāpratīghāta' });
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
    type: 'qualifier'
  },
  reasons: ["Word is 'manas'", "Context meaning is 'śraddhāpratīghāta'", "Verb is present in context"]
}
*/
```

### Advanced Usage
```javascript
// Example without the required semantic context
const result3 = isGatiKaneManas('kaṇe', { verb: 'han', meaning: 'other' });
console.log(result3);
/* Expected output:
{
  applies: false,
  confidence: 0.9,
  reasons: ["Context meaning is not 'śraddhāpratīghāta'"]
}
*/

// Example without a verb
const result4 = isGatiKaneManas('manas', { meaning: 'śraddhāpratīghāta' });
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
- Positive cases for `kaṇe` and `manas` with correct meaning and various verbs (IAST and Devanagari).
- Negative cases where the words are present but the semantic condition is not met.
- Negative cases for other words.
- Edge cases with invalid inputs.
- Validation of the full structured output object.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.66

# Run with coverage
npm test sutras/1.4.66 --coverage
```

## Technical Details

### Algorithm
1.  Check if the input `word` is `kaṇe` (`कणे`) or `manas` (`मनस्`). If not, return a detailed object with `applies: false`.
2.  Verify that `context.verb` is present. If not, return a detailed object with `applies: false`.
3.  Check the semantic `context.meaning`. It must be `śraddhāpratīghāta`.
4.  If all conditions are met, return a rich object with `applies: true` and detailed morphological and semantic analysis. Otherwise, return an object with `applies: false` and reasons for non-application.

### Performance
- **Time Complexity**: O(1).
- **Space Complexity**: O(1).
- **Optimization Notes**: The logic is straightforward and efficient.

### Edge Cases
- The semantic condition `śraddhāpratīghāta` is very specific and its determination is external to this rule's logic.
- The word `manas` is a common word, so context is crucial to avoid false positives.

## Integration

### Related Sutras
- This sutra is part of the `gati` section.
- It is an exception to the general rules of when indeclinables are considered `gati`.

### Used By
- Compounding (`samāsa`) rules.
- Accent rules.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.66
- **Implementation Notes**: The implementation relies on a precise semantic context.
- **Test References**: Classical examples like `kaṇehatya` and `manaḥkṛtya` (in the specified sense) are used for tests.
---

*Generated from template: SUTRA_README_TEMPLATE.md*
