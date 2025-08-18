# Sutra 1.4.75: अनत्याधान उरसिमनसी

## Overview

**Sanskrit Text**: `अनत्याधान उरसिमनसी`
**Transliteration**: `anatyādhāne urasimanasi`
**Translation**: The words `urasi` (in the breast/heart) and `manasi` (in the mind) [are optionally `gati` with `kṛ`], but not (`an`) in the sense of 'placing upon' (`atyādhāne`).

## Purpose

This sutra assigns an optional (`vibhāṣā`) `gati` classification to the words `urasi` and `manasi` when they are used with the verb `kṛ` ('to do/make'). However, it introduces a critical negative condition: this rule does not apply if the action signifies `atyādhāna`, which means 'placing upon' or 'committing to'. For example, `manasi kṛtvā` ('having considered') is covered, but `manasi kṛtvā` ('placing it in the mind') would be excluded. This semantic distinction is key to the sutra's application.

## Implementation

### Function Signature
```javascript
function sutra1475(word, context = {}) {
    // Implementation details
}
```

### Key Features
- **Keyword Identification**: Detects `urasi` and `manasi` in the input.
- **Verb Check**: Confirms the verb in the context is `kṛ`.
- **Negative Semantic Condition**: Explicitly checks that the meaning is *not* 'placing' (`anatyādhāna`). This is the core complexity.
- **Optional Classification**: Returns an optional `gati` status when all conditions are met.
- **Script Agnostic**: Handles both IAST and Devanagari.

### Dependencies
- **Sanskrit Utils**:
  - `detectScript`: To handle different input scripts.
  - `isVerb`: To validate the verb.
- **Shared Functions**: None.

## Usage Examples

### Basic Usage
```javascript
import { sutra1475 } from './index.js';

// Example 1: 'urasi' with 'kṛ' in the sense of 'accepting' (not placing)
const result1 = sutra1475('urasikṛtya', { verb: 'kṛ', meaning: 'accepting' });
console.log(result1);
// Expected output:
// {
//   applies: true,
//   optional: true,
//   classification: 'गति',
//   confidence: 0.9,
//   reason: "The word 'urasi' is used with 'kṛ' in a sense other than 'placing', so its gati classification is optional."
// }

// Example 2: 'manasi' with 'kṛ' in the sense of 'pondering' (not placing)
const result2 = sutra1475('मनसिकरोति', { verb: 'कृ', meaning: 'pondering' });
console.log(result2);
// Expected output:
// {
//   applies: true,
//   optional: true,
//   classification: 'गति',
//   confidence: 0.9,
//   reason: "The word 'manasi' is used with 'kṛ' in a sense other than 'placing', so its gati classification is optional."
// }
```

### Advanced Usage (Illustrating the Negative Condition)
```javascript
// Example where 'urasi' with 'kṛ' means 'placing'
const result3 = sutra1475('urasikṛtya pāṇim', { verb: 'kṛ', meaning: 'placing' });
console.log(result3);
// Expected output:
// {
//   applies: false,
//   reason: "The meaning is 'placing' (anatyādhāna), so this rule does not apply."
// }

// Example where the verb is not 'kṛ'
const result4 = sutra1475('manasigacchati', { verb: 'gam', meaning: 'goes to mind' });
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
- **Positive Cases (24)**: `urasi` and `manasi` with `kṛ` are correctly identified as optionally `gati` when the meaning is abstract (e.g., 'accepting', 'pondering').
- **Negative Cases (20)**: The rule correctly fails when the meaning is explicitly 'placing' (`anatyādhāna`), when the verb is not `kṛ`, or when the keywords are absent.
- **Edge Cases (10)**: Robust handling of invalid inputs, including `null`, empty strings, and various forms of incomplete context.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.75

# Run with coverage
npm test sutras/1.4.75 -- --coverage
```

## Technical Details

### Algorithm
1.  **Input Validation**: Check for a valid `word` string and `context` object.
2.  **Keyword Check**: Identify `urasi` (उरसि) or `manasi` (मनसि).
3.  **Contextual Verification**:
    -   Confirm `context.verb` is `kṛ` (कृ).
    -   Crucially, confirm `context.meaning` is present and is **not** 'placing'.
4.  **Optional Classification**: If all conditions pass, return an object with `applies: true` and `optional: true`.
5.  **Failure/Error**: If any check fails, return an object with `applies: false` and a clear `reason` or `error`.

### Performance
-   **Time Complexity**: O(1).
-   **Space Complexity**: O(1).
-   **Optimization Notes**: The logic is direct and efficient.

### Edge Cases
-   The meaning is ambiguous and could be interpreted as either placing or a more abstract action. The function relies on an unambiguous `meaning` in the context.
-   The input word is a longer compound that contains `urasi` or `manasi` but has a different primary structure.

## Integration

### Related Sutras
-   This sutra is part of the `vibhāṣā kṛñi` series (optional rules with `kṛ`), but adds a layer of semantic complexity with the `anatyādhāna` condition.

### Used By
-   Semantic parsers that need to distinguish between physical and abstract actions.
-   Grammatical generators that produce alternative valid forms based on fine-grained semantic context.

## References

-   **Ashtadhyayi of Panini**: Sutra 1.4.75
-   **Siddhanta Kaumudi**: Provides examples like `urasikṛtya` ('having accepted') vs. `urasi kṛtvā` ('having placed on the chest').

---

*Generated from template: SUTRA_README_TEMPLATE.md*
