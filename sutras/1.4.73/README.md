# Sutra 1.4.73: उपाजेऽन्वाजे

## Overview

**Sanskrit Text**: `उपाजेऽन्वाजे`
**Transliteration**: `upāje'nvāje`
**Translation**: The words `upāje` and `anavāje` [are also optionally classified as `gati` when used with the verb `kṛ`].

## Purpose

This sutra extends the optional (`vibhāṣā`) `gati` classification to two more words: `upāje` and `anavāje`. When either of these words is used with the verb `kṛ` ('to do/make') and carries the specific meaning of 'supporting the weak' or 'coming to the aid of the weak', it is optionally considered a `gati`. This continues the theme from the previous sutra, providing controlled grammatical variation for specific lexical and semantic conditions.

## Implementation

### Function Signature
```javascript
function sutra1473(word, context = {}) {
    // Implementation details
}
```

### Key Features
- **Keyword Identification**: The function must identify `upāje` and `anavāje` in the input.
- **Verb Specificity**: The rule is exclusively for combinations with the verb `kṛ`.
- **Semantic Constraint**: The meaning must be 'supporting the weak'.
- **Optional (`vibhāṣā`) Classification**: The output must clearly indicate that the `gati` status is optional.
- **Script Agnostic**: Handles both IAST and Devanagari scripts.

### Dependencies
- **Sanskrit Utils**:
  - `detectScript`: To handle different input scripts.
  - `isVerb`: To validate the verb in the context.
- **Shared Functions**: None.

## Usage Examples

### Basic Usage
```javascript
import { sutra1473 } from './index.js';

// Example 1: 'upāje' with 'kṛ' and correct meaning
const result1 = sutra1473('upājekṛtya', { verb: 'kṛ', meaning: 'supporting the weak' });
console.log(result1);
// Expected output:
// {
//   applies: true,
//   optional: true,
//   classification: 'गति',
//   confidence: 1.0,
//   reason: "The word 'upāje' (meaning supporting the weak) is used with the verb 'kṛ', so its gati classification is optional."
// }

// Example 2: 'anavāje' with 'kṛ' in Devanagari
const result2 = sutra1473('अन्वाजेकृत्य', { verb: 'कृ', meaning: 'supporting the weak' });
console.log(result2);
// Expected output:
// {
//   applies: true,
//   optional: true,
//   classification: 'गति',
//   confidence: 1.0,
//   reason: "The word 'anavāje' (meaning supporting the weak) is used with the verb 'kṛ', so its gati classification is optional."
// }
```

### Advanced Usage
```javascript
// Example where the verb is not 'kṛ'
const result3 = sutra1473('upājebhavati', { verb: 'bhū', meaning: 'supporting the weak' });
console.log(result3);
// Expected output:
// {
//   applies: false,
//   reason: "The verb is not 'kṛ'."
// }

// Example where the meaning is incorrect
const result4 = sutra1473('upājekṛtya', { verb: 'kṛ', meaning: 'a different action' });
console.log(result4);
// Expected output:
// {
//   applies: false,
//   reason: "The meaning is not 'supporting the weak'."
// }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 54 tests covering:
- **Positive Cases (24)**: Correct optional `gati` classification for `upāje` and `anavāje` with `kṛ` and the specified meaning, in both IAST and Devanagari.
- **Negative Cases (20)**: The rule correctly fails when the verb is not `kṛ`, the meaning is wrong, or the keywords are absent.
- **Edge Cases (10)**: Robust handling of invalid inputs like `null`, empty strings, and incomplete context objects.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.73

# Run with coverage
npm test sutras/1.4.73 -- --coverage
```

## Technical Details

### Algorithm
1.  **Input Validation**: Check for a valid `word` string and `context` object.
2.  **Keyword Check**: Determine if the `word` contains `upāje` (उपाजे) or `anavāje` (अन्वाजे).
3.  **Contextual Verification**:
    -   Confirm that `context.verb` is `kṛ` (कृ).
    -   Confirm that `context.meaning` is 'supporting the weak'.
4.  **Optional Classification**: If all checks pass, return an object with `applies: true` and `optional: true`.
5.  **Failure/Error**: If any check fails, return an object with `applies: false` and a specific `reason` or `error`.

### Performance
-   **Time Complexity**: O(1).
-   **Space Complexity**: O(1).
-   **Optimization Notes**: The function is a simple, direct check with no significant performance overhead.

### Edge Cases
-   The input contains both `upāje` and `anavāje`.
-   The words appear in a different form or are misspelled.
-   The context is ambiguous. The function relies on clear, explicit context.

## Integration

### Related Sutras
-   **1.4.72 (vibhāṣā kṛñi)**: This sutra follows the same pattern of providing optional `gati` status for specific words when used with `kṛ`. It is part of a sub-section of rules governing this optionality.

### Used By
-   Grammatical analysis and generation tools that need to account for optional, context-sensitive rules in Sanskrit.

## References

-   **Ashtadhyayi of Panini**: Sutra 1.4.73
-   **Siddhanta Kaumudi**: Provides examples such as `upājekṛtya` / `upāje kṛtya`.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
