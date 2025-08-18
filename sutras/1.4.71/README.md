# Sutra 1.4.71: तिरोऽन्तर्द्धौ

## Overview

**Sanskrit Text**: `तिरोऽन्तर्द्धौ`
**Transliteration**: `tiro'ntarddhau`
**Translation**: The word `tiras` (तिरस्), when it signifies 'disappearance' or 'concealment' (`antardhau`), is classified as a `gati` (गति).

## Purpose

This sutra assigns the technical designation `gati` to the indeclinable `tiras` when it is used with a verb to mean 'disappearance', 'hiding', or 'concealment'. This classification is crucial as it triggers specific grammatical rules, such as the formation of compound words (`samāsa`) and particular sandhi changes that apply only to `gati`-prefixed verbs. It distinguishes this usage from other meanings of `tiras`, such as 'crooked' or 'across'.

## Implementation

### Function Signature
```javascript
function sutra1471(word, context = {}) {
    // Implementation details
}
```

### Key Features
- **Semantic Analysis**: Detects if the semantic context of `tiras` is 'disappearance' (`antardhau`).
- **Verbal Composition Check**: Verifies that `tiras` is used in conjunction with a verb (`kriyāyoge`).
- **Gati Classification**: Assigns the `gati` designation if both conditions are met.
- **Script Agnostic**: Handles both IAST (`tiras`) and Devanagari (`तिरस्`) inputs.

### Dependencies
- **Sanskrit Utils**:
  - `detectScript`: To identify the script of the input word.
  - `isVerb`: To confirm the presence of a verb in the context.
- **Shared Functions**: None.

## Usage Examples

### Basic Usage
```javascript
import { sutra1471 } from './index.js';

// Example 1: 'tiras' with 'bhū' (to be) to mean 'to disappear'
const result1 = sutra1471('tirobhūya', { verb: 'bhū', meaning: 'disappearance' });
console.log(result1);
// Expected output:
// {
//   applies: true,
//   classification: 'गति',
//   confidence: 0.95,
//   reason: "The word 'tiras' is used with a verb in the sense of disappearance."
// }

// Example 2: Devanagari input
const result2 = sutra1471('तिरोभवति', { verb: 'भू', meaning: 'disappearance' });
console.log(result2);
// Expected output:
// {
//   applies: true,
//   classification: 'गति',
//   confidence: 0.95,
//   reason: "The word 'tiras' is used with a verb in the sense of disappearance."
// }
```

### Advanced Usage
```javascript
// Example where 'tiras' does not mean disappearance
const result3 = sutra1471('tiraskṛtya', { verb: 'kṛ', meaning: 'reproach' });
console.log(result3);
// Expected output:
// {
//   applies: false,
//   reason: "The meaning is not 'disappearance'."
// }

// Example where 'tiras' is used without a verb
const result4 = sutra1471('tiraḥ', { meaning: 'disappearance' });
console.log(result4);
// Expected output:
// {
//   applies: false,
//   reason: "The word 'tiras' is not used with a verb."
// }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 56 tests covering:
- **Positive Cases (26)**: `tiras` correctly identified as `gati` with verbs like `bhū` and `dhā` in both IAST and Devanagari.
- **Negative Cases (20)**: `tiras` not classified as `gati` when the meaning is not 'disappearance', when no verb is present, or when the word is not `tiras`.
- **Edge Cases (10)**: Graceful handling of invalid inputs like `null`, `undefined`, empty strings, and incomplete context.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.71

# Run with coverage
npm test sutras/1.4.71 -- --coverage
```

## Technical Details

### Algorithm
1.  **Input Validation**: Check if the input `word` is a valid string and the `context` object is provided.
2.  **Word Identification**: Verify that the input `word` contains `tiras` (or `तिरस्`).
3.  **Contextual Analysis**:
    -   Check if `context.verb` is present and is a valid verb.
    -   Check if `context.meaning` is strictly 'disappearance'.
4.  **Classification**: If all conditions are met, return an object with `applies: true` and `classification: 'गति'`.
5.  **Failure/Error**: If any condition fails, return an object with `applies: false` and a descriptive `reason` or `error` message.

### Performance
-   **Time Complexity**: O(1), as the function performs a fixed number of checks.
-   **Space Complexity**: O(1).
-   **Optimization Notes**: The implementation is designed to be a fast, stateless check.

### Edge Cases
-   The `context` object is `null`, `undefined`, or empty.
-   The `meaning` or `verb` properties are missing from the `context`.
-   The input `word` contains `tiras` but is part of a larger, unrelated word.
-   The `word` is not a string.

## Integration

### Related Sutras
-   **1.4.60 (gatiśca)**: This sutra is part of the same `gati` section.
-   **1.4.72 (vibhāṣā kṛñi)**: This sutra provides an optional (`vibhāṣā`) `gati` classification for `tiras` when used with the verb `kṛ`, creating a specific exception to the conditions of 1.4.71.

### Used By
-   This sutra's output is critical for `samāsa` (compounding) and sandhi engines. For example, it determines whether `tiras` can be compounded with a following verb and affects the phonetic changes at their boundary.

## References

-   **Ashtadhyayi of Panini**: Sutra 1.4.71
-   **Siddhanta Kaumudi**: Provides examples and commentary on this sutra.
-   **Implementation Notes**: The logic is based on the standard interpretation of the sutra from major commentaries.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
