# Sutra 1.4.78: प्राध्वं बन्धने

## Overview

**Sanskrit Text**: `प्राध्वं बन्धने`
**Transliteration**: `prādhvaṃ bandhane`
**Translation**: The indeclinable `prādhvam` [is always `gati` with `kṛ`] in the sense of 'binding' (`bandhane`).

## Purpose

This sutra defines another mandatory (`nitya`) `gati` classification. It applies to the single indeclinable word `prādhvam` when it is used with the verb `kṛ` ('to do/make') and carries the specific semantic meaning of `bandhana`—'binding', 'tying', or 'fastening'. Like the previous sutra, its mandatory nature means that `gati`-specific rules must apply, without exception, when these conditions are met.

## Implementation

### Function Signature
```javascript
function sutra1478(word, context = {}) {
    // Implementation details
}
```

### Key Features
- **Keyword Identification**: Detects the specific word `prādhvam`.
- **Verb Check**: Confirms the verb in the context is `kṛ`.
- **Semantic Constraint**: The meaning must be 'binding' (`bandhane`).
- **Mandatory Classification**: The output must indicate that the `gati` status is mandatory (`optional: false`).
- **Script Agnostic**: Handles IAST and Devanagari.

### Dependencies
- **Sanskrit Utils**: `isVerb` to validate the verb.
- **Shared Functions**: None.

## Usage Examples

### Basic Usage
```javascript
import { sutra1478 } from './index.js';

// Example 1: 'prādhvam' with 'kṛ' in the sense of binding
const result1 = sutra1478('prādhvaṅkṛtya', { verb: 'kṛ', meaning: 'binding' });
console.log(result1);
// Expected output:
// {
//   applies: true,
//   optional: false,
//   classification: 'गति',
//   confidence: 1.0,
//   reason: "The word 'prādhvam' is used with 'kṛ' in the sense of 'binding', so its gati classification is mandatory."
// }

// Example 2: Devanagari input
const result2 = sutra1478('प्राध्वंकरोति', { verb: 'कृ', meaning: 'binding' });
console.log(result2);
// Expected output:
// {
//   applies: true,
//   optional: false,
//   classification: 'गति',
//   confidence: 1.0,
//   reason: "The word 'prādhvam' is used with 'kṛ' in the sense of 'binding', so its gati classification is mandatory."
// }
```

### Advanced Usage (Illustrating Failure Conditions)
```javascript
// Example where the meaning is not 'binding'
const result3 = sutra1478('prādhvaṅkṛtya', { verb: 'kṛ', meaning: 'sending' });
console.log(result3);
// Expected output:
// {
//   applies: false,
//   reason: "The meaning is not 'binding'."
// }

// Example where the verb is not 'kṛ'
const result4 = sutra1478('prādhvaṃgacchati', { verb: 'gam', meaning: 'binding' });
console.log(result4);
// Expected output:
// {
//   applies: false,
//   reason: "The verb is not 'kṛ'."
// }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 50 tests covering:
- **Positive Cases (20)**: `prādhvam` with `kṛ` is correctly identified as mandatorily `gati` in the context of 'binding'.
- **Negative Cases (20)**: The rule correctly fails when the meaning is not 'binding', the verb is not `kṛ`, or the keyword is absent.
- **Edge Cases (10)**: Robust handling of invalid inputs.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.78

# Run with coverage
npm test sutras/1.4.78 -- --coverage
```

## Technical Details

### Algorithm
1.  **Input Validation**: Check for valid `word` and `context`.
2.  **Keyword Check**: Identify the word `prādhvam` (प्राध्वं).
3.  **Contextual Verification**:
    -   Confirm `context.verb` is `kṛ` (कृ).
    -   Confirm `context.meaning` is 'binding'.
4.  **Mandatory Classification**: If all checks pass, return an object with `applies: true` and `optional: false`.
5.  **Failure/Error**: If any check fails, return an object with `applies: false` and a clear `reason` or `error`.

### Performance
-   **Time Complexity**: O(1).
-   **Space Complexity**: O(1).
-   **Optimization Notes**: This is a highly specific and efficient rule.

### Edge Cases
-   The context is ambiguous. The function relies on an explicit 'binding' meaning.
-   The word `prādhvam` appears with `kṛ` but with a different, non-binding meaning (if any exist).

## Integration

### Related Sutras
-   **1.4.77 (nityaṃ haste pāṇāvupayamane)**: This sutra immediately precedes 1.4.78 and also establishes a `nitya` (mandatory) `gati` rule with a specific semantic condition.

### Used By
-   Grammatical engines that must apply `gati`-specific sandhi and compounding rules without variation when these conditions are met.

## References

-   **Ashtadhyayi of Panini**: Sutra 1.4.78
-   **Siddhanta Kaumudi**: Provides examples clarifying the `bandhane` condition.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
