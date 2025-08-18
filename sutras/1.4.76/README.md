# Sutra 1.4.76: मध्येपदेनिवचने च

## Overview

**Sanskrit Text**: `मध्येपदेनिवचने च`
**Transliteration**: `madhye-pade-nivacane ca`
**Translation**: And (`ca`) the words `madhye` (in the middle), `pade` (at the foot/step), and `nivacane` (in speech/silence) [are also optionally `gati` with `kṛ`, not in the sense of placing].

## Purpose

This sutra extends the optional `gati` classification to three additional words: `madhye`, `pade`, and `nivacane`. The rule is a direct continuation of the previous sutra (1.4.75), applying under the same two conditions:
1. The verb must be `kṛ` ('to do/make').
2. The action must not signify `atyādhāna` ('placing upon').

When these conditions are met, the classification is optional (`vibhāṣā`), allowing for grammatical variation.

## Implementation

### Function Signature
```javascript
function sutra1476(word, context = {}) {
    // Implementation details
}
```

### Key Features
- **Keyword Identification**: Detects `madhye`, `pade`, or `nivacane`.
- **Verb Check**: Confirms the verb in the context is `kṛ`.
- **Negative Semantic Condition**: Inherits and applies the `anatyādhāna` (not 'placing') condition from 1.4.75.
- **Optional Classification**: Returns an optional `gati` status.
- **Script Agnostic**: Handles IAST and Devanagari.

### Dependencies
- **Sanskrit Utils**: `isVerb` to validate the verb.
- **Shared Functions**: None.

## Usage Examples

### Basic Usage
```javascript
import { sutra1476 } from './index.js';

// Example 1: 'madhye' with 'kṛ' (not placing)
const result1 = sutra1476('madhyekṛtya', { verb: 'kṛ', meaning: 'interrupting' });
console.log(result1);
// Expected output:
// {
//   applies: true,
//   optional: true,
//   classification: 'गति',
//   confidence: 0.9,
//   reason: "The word 'madhye' is used with 'kṛ' in a sense other than 'placing'."
// }

// Example 2: 'pade' with 'kṛ' (not placing)
const result2 = sutra1476('पदेकृत्य', { verb: 'कृ', meaning: 'stumbling' });
console.log(result2);
// Expected output:
// {
//   applies: true,
//   optional: true,
//   classification: 'गति',
//   confidence: 0.9,
//   reason: "The word 'pade' is used with 'kṛ' in a sense other than 'placing'."
// }
```

### Advanced Usage (Illustrating Failure Conditions)
```javascript
// Example where the meaning IS 'placing'
const result3 = sutra1476('madhyekṛtya dhanam', { verb: 'kṛ', meaning: 'placing' });
console.log(result3);
// Expected output:
// {
//   applies: false,
//   reason: "The meaning is 'placing' (anatyādhāna), so this rule does not apply."
// }

// Example where the verb is not 'kṛ'
const result4 = sutra1476('madhyebhavati', { verb: 'bhū', meaning: 'being in the middle' });
console.log(result4);
// Expected output:
// {
//   applies: false,
//   reason: "The verb is not 'kṛ'."
// }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 54 tests covering:
- **Positive Cases (24)**: `madhye`, `pade`, and `nivacane` with `kṛ` are correctly identified as optionally `gati` when the meaning is not 'placing'.
- **Negative Cases (20)**: The rule correctly fails when the `anatyādhāna` condition is met (meaning is 'placing'), the verb is not `kṛ`, or the keywords are absent.
- **Edge Cases (10)**: Robust handling of invalid inputs.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.76

# Run with coverage
npm test sutras/1.4.76 -- --coverage
```

## Technical Details

### Algorithm
1.  **Input Validation**: Check for valid `word` and `context`.
2.  **Keyword Check**: Identify one of the three keywords (`madhye`, `pade`, `nivacane`).
3.  **Contextual Verification**:
    -   Confirm `context.verb` is `kṛ`.
    -   Confirm `context.meaning` is not 'placing'.
4.  **Optional Classification**: If all checks pass, return an object with `applies: true` and `optional: true`.
5.  **Failure/Error**: If any check fails, return an object with `applies: false` and a clear `reason` or `error`.

### Performance
-   **Time Complexity**: O(1).
-   **Space Complexity**: O(1).
-   **Optimization Notes**: A simple and direct rule.

### Edge Cases
-   Ambiguous meanings that could be interpreted as 'placing'. The function relies on explicit context.
-   The keywords appearing in longer, unrelated words.

## Integration

### Related Sutras
-   **1.4.75 (anatyādhāna urasimanasī)**: This sutra directly precedes and establishes the `anatyādhāna` condition that this sutra continues.

### Used By
-   Semantic and grammatical parsers that handle fine-grained contextual rules in Sanskrit.

## References

-   **Ashtadhyayi of Panini**: Sutra 1.4.76
-   **Siddhanta Kaumudi**: Provides examples and clarifies the continuation of the `anatyādhāna` condition.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
