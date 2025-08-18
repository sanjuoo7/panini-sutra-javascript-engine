# Sutra 1.4.77: नित्यं हस्ते पाणावुपयमने

## Overview

**Sanskrit Text**: `नित्यं हस्ते पाणावुपयमने`
**Transliteration**: `nityaṃ haste pāṇāvupayamane`
**Translation**: Always (`nityam`), the words `haste` (in the hand) and `pāṇau` (in the hand) [are `gati` with `kṛ`] in the sense of 'marriage' (`upayamane`).

## Purpose

This sutra marks a shift from the previous optional (`vibhāṣā`) rules. It mandates (`nityam`) that the words `haste` and `pāṇau` must be classified as `gati` when they are compounded with the verb `kṛ` ('to do/make') specifically in the context of `upayamana`—the act of marriage (literally, 'taking by the hand'). This mandatory classification ensures that `gati`-specific grammatical operations are always applied in this context, leaving no room for variation.

## Implementation

### Function Signature
```javascript
function sutra1477(word, context = {}) {
    // Implementation details
}
```

### Key Features
- **Keyword Identification**: Detects `haste` and `pāṇau`.
- **Verb Check**: Confirms the verb in the context is `kṛ`.
- **Semantic Constraint**: The meaning must be 'marriage' (`upayamane`).
- **Mandatory Classification**: The output must clearly indicate that the `gati` status is mandatory (not optional).
- **Script Agnostic**: Handles IAST and Devanagari.

### Dependencies
- **Sanskrit Utils**: `isVerb` to validate the verb.
- **Shared Functions**: None.

## Usage Examples

### Basic Usage
```javascript
import { sutra1477 } from './index.js';

// Example 1: 'haste' with 'kṛ' in the sense of marriage
const result1 = sutra1477('hastekṛtya kanyām', { verb: 'kṛ', meaning: 'marriage' });
console.log(result1);
// Expected output:
// {
//   applies: true,
//   optional: false,
//   classification: 'गति',
//   confidence: 1.0,
//   reason: "The word 'haste' is used with 'kṛ' in the sense of 'marriage', so its gati classification is mandatory."
// }

// Example 2: 'pāṇau' with 'kṛ' in Devanagari
const result2 = sutra1477('पाणौकरोति वधूम्', { verb: 'कृ', meaning: 'marriage' });
console.log(result2);
// Expected output:
// {
//   applies: true,
//   optional: false,
//   classification: 'गति',
//   confidence: 1.0,
//   reason: "The word 'pāṇau' is used with 'kṛ' in the sense of 'marriage', so its gati classification is mandatory."
// }
```

### Advanced Usage (Illustrating Failure Conditions)
```javascript
// Example where the meaning is not 'marriage'
const result3 = sutra1477('hastekṛtya dhanam', { verb: 'kṛ', meaning: 'taking money' });
console.log(result3);
// Expected output:
// {
//   applies: false,
//   reason: "The meaning is not 'marriage'."
// }

// Example where the verb is not 'kṛ'
const result4 = sutra1477('hastegacchati kanyām', { verb: 'gam', meaning: 'marriage' });
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
- **Positive Cases (20)**: `haste` and `pāṇau` with `kṛ` are correctly identified as mandatorily `gati` in the context of marriage.
- **Negative Cases (20)**: The rule correctly fails when the meaning is not 'marriage', the verb is not `kṛ`, or the keywords are absent.
- **Edge Cases (10)**: Robust handling of invalid inputs.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.77

# Run with coverage
npm test sutras/1.4.77 -- --coverage
```

## Technical Details

### Algorithm
1.  **Input Validation**: Check for valid `word` and `context`.
2.  **Keyword Check**: Identify `haste` (हस्ते) or `pāṇau` (पाणौ).
3.  **Contextual Verification**:
    -   Confirm `context.verb` is `kṛ` (कृ).
    -   Confirm `context.meaning` is 'marriage'.
4.  **Mandatory Classification**: If all checks pass, return an object with `applies: true` and `optional: false`.
5.  **Failure/Error**: If any check fails, return an object with `applies: false` and a clear `reason` or `error`.

### Performance
-   **Time Complexity**: O(1).
-   **Space Complexity**: O(1).
-   **Optimization Notes**: A highly specific and efficient rule.

### Edge Cases
-   The context implies marriage but uses a synonym. The function relies on the explicit 'marriage' meaning.
-   The words `haste` or `pāṇau` are used in a literal sense of 'in the hand' even with the verb `kṛ`. The `meaning` property is the deciding factor.

## Integration

### Related Sutras
-   This sutra is a `nitya` (mandatory) rule, contrasting with the `vibhāṣā` (optional) rules like **1.4.72**-**1.4.76**. This highlights the different levels of prescription in the grammar.

### Used By
-   Grammatical engines that must enforce a single correct form when compounding `haste`/`pāṇau` with `kṛ` in the context of marriage.

## References

-   **Ashtadhyayi of Panini**: Sutra 1.4.77
-   **Siddhanta Kaumudi**: Provides the classic example `hastekṛtya kanyām` ('having married the girl').

---

*Generated from template: SUTRA_README_TEMPLATE.md*
