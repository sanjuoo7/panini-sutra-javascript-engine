# Sutra 1.4.63: आदरानादरयोः सदसती

## Overview

**Sanskrit Text**: `आदरानादरयोः सदसती`
**Transliteration**: ādarānādarayoḥ sadasatī
**Translation**: The words `sat` (good, real) and `asat` (bad, unreal) are termed `gati` when they signify respect (`ādara`) and disrespect (`anādara`) respectively, and are used with a verb.

## Purpose

This sutra assigns the `gati` status to the particles `sat` and `asat` under specific semantic conditions. When `sat` is used to imply respect or veneration (e.g., `satkṛtya` - 'having treated with respect'), and `asat` is used for disrespect or disregard (e.g., `asatkṛtya` - 'having treated with disrespect'), they are considered pre-verbs. This affects compound formation and accent.

## Implementation

### Function Signature
```javascript
function isGatiSatAsat(word, context) {
    // Implementation details
}
```

### Key Features
- Checks if the input word is `sat` or `asat`.
- Verifies the semantic context implies `ādara` (respect) for `sat` or `anādara` (disrespect) for `asat`.
- Confirms the presence of a verb in the context.
- Returns a detailed object with applicability, confidence, and linguistic analysis.

### Dependencies
- **Sanskrit Utils**: `transliterate`.
- **Shared Functions**: A way to infer semantic meaning from the context.

## Usage Examples

### Basic Usage
```javascript
import { isGatiSatAsat } from './index.js';

// Example 1: 'sat' implying respect
const result1 = isGatiSatAsat('sat', { verb: 'kṛ', meaning: 'respect' });
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
  reasons: ["Word is 'sat'", "Context meaning is 'respect'", "Verb is present in context"]
}
*/

// Example 2: 'asat' implying disrespect
const result2 = isGatiSatAsat('asat', { verb: 'kṛ', meaning: 'disrespect' });
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
  reasons: ["Word is 'asat'", "Context meaning is 'disrespect'", "Verb is present in context"]
}
*/
```

### Advanced Usage
```javascript
// Example of 'sat' used in a different sense (e.g., existence)
const result3 = isGatiSatAsat('sat', { verb: 'bhū', meaning: 'existence' });
console.log(result3);
/* Expected output:
{
  applies: false,
  confidence: 0.9,
  reasons: ["Context meaning is not 'respect'"]
}
*/


// Example without a verb
const result4 = isGatiSatAsat('sat', { meaning: 'respect' });
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
- Positive cases for `sat` and `asat` with correct meaning and verb context (IAST and Devanagari).
- Negative cases where the meaning is different (e.g., `sat` as 'being', `asat` as 'non-existent').
- Negative cases where the verb is missing.
- Negative cases for other words.
- Edge cases with invalid inputs.
- Validation of the full structured output object.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.63

# Run with coverage
npm test sutras/1.4.63 --coverage
```

## Technical Details

### Algorithm
1.  Check if the input `word` is either `sat` (`सत्`) or `asat` (`असत्`). If not, return a detailed object with `applies: false`.
2.  Verify that `context.verb` is present. If not, return a detailed object with `applies: false`.
3.  Check the semantic `context.meaning`.
    - If `word` is `sat`, `context.meaning` must be `respect`.
    - If `word` is `asat`, `context.meaning` must be `disrespect`.
4.  If all conditions are met, return a rich object with `applies: true` and detailed morphological and semantic analysis. Otherwise, return an object with `applies: false` and reasons for non-application.

### Performance
- **Time Complexity**: O(1).
- **Space Complexity**: O(1).
- **Optimization Notes**: The logic is simple string and context comparison, so it is already efficient.

### Edge Cases
- **Ambiguous meaning**: The implementation will rely on a clear `meaning` property in the context. Real-world application would require sophisticated NLP to determine the sense of `sat`/`asat`.
- **Compound words**: The rule applies when `sat`/`asat` are used as separate particles before a verb, leading to a `gati` compound.

## Integration

### Related Sutras
- This sutra is part of the `gati` section, following `1.4.62`.
- The `gati` status is crucial for `samāsa` (compounding) rules.

### Used By
- Compounding rules that form `gati-samāsa`.
- Accent rules that are affected by `gati` pre-verbs.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.63
- **Implementation Notes**: The implementation's accuracy depends entirely on the quality of the semantic context provided.
- **Test References**: Classical examples like `satkṛtya` and `asatkṛtya` are the primary sources for tests.
---

*Generated from template: SUTRA_README_TEMPLATE.md*
