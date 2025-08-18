# Sutra 1.4.72: विभाषा कृञि

## Overview

**Sanskrit Text**: `विभाषा कृञि`
**Transliteration**: `vibhāṣā kṛñi`
**Translation**: Optionally (`vibhāṣā`), when the verb `kṛ` (`kṛñi` - locative case) follows.

## Purpose

This sutra introduces an optionality (`vibhāṣā`) to the `gati` classification of `tiras`. Specifically, when `tiras` (meaning 'disappearance', carried forward from 1.4.71) is used with the verb `kṛ` ('to do/make'), its classification as `gati` is optional. This allows for two correct grammatical forms to exist: one where `gati` rules apply (e.g., specific compounding and sandhi), and one where they do not. This sutra creates a controlled variation in the grammar.

## Implementation

### Function Signature
```javascript
function sutra1472(word, context = {}) {
    // Implementation details
}
```

### Key Features
- **Specificity to `kṛ`**: The rule is strictly applied only when the verb is `kṛ`.
- **Optional Classification**: The primary feature is the introduction of optionality (`vibhāṣā`). The output must reflect this.
- **Context Inheritance**: Inherits the context of `tiras` meaning 'disappearance' from the previous sutra (1.4.71).
- **Script Agnostic**: Works with both IAST and Devanagari inputs.

### Dependencies
- **Sanskrit Utils**:
  - `detectScript`: To identify the script of the input.
  - `isVerb`: To confirm the verb in the context is `kṛ`.
- **Shared Functions**: This sutra's logic is a direct modification of the rule in 1.4.71.

## Usage Examples

### Basic Usage
```javascript
import { sutra1472 } from './index.js';

// Example 1: 'tiras' with 'kṛ' meaning 'disappearance'
const result1 = sutra1472('tiraskṛtya', { verb: 'kṛ', meaning: 'disappearance' });
console.log(result1);
// Expected output:
// {
//   applies: true,
//   optional: true,
//   classification: 'गति',
//   confidence: 1.0,
//   reason: "The word 'tiras' (meaning disappearance) is used with the verb 'kṛ', so its gati classification is optional."
// }

// Example 2: Devanagari input for the same case
const result2 = sutra1472('तिरस्कृत्य', { verb: 'कृ', meaning: 'disappearance' });
console.log(result2);
// Expected output:
// {
//   applies: true,
//   optional: true,
//   classification: 'गति',
//   confidence: 1.0,
//   reason: "The word 'tiras' (meaning disappearance) is used with the verb 'kṛ', so its gati classification is optional."
// }
```

### Advanced Usage
```javascript
// Example where the verb is not 'kṛ'
const result3 = sutra1472('tirobhūya', { verb: 'bhū', meaning: 'disappearance' });
console.log(result3);
// Expected output:
// {
//   applies: false,
//   reason: "The verb is not 'kṛ'."
// }

// Example where the meaning is not 'disappearance'
const result4 = sutra1472('tiraskṛtya', { verb: 'kṛ', meaning: 'reproach' });
console.log(result4);
// Expected output:
// {
//   applies: false,
//   reason: "The meaning is not 'disappearance'."
// }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 52 tests covering:
- **Positive Cases (20)**: `tiras` with `kṛ` (and its forms) and the meaning 'disappearance' is correctly identified as optionally `gati`. Tested in both IAST and Devanagari.
- **Negative Cases (22)**: The rule does not apply when the verb is not `kṛ`, the meaning is different, or the word `tiras` is absent.
- **Edge Cases (10)**: Graceful handling of invalid and incomplete inputs, such as `null` values or missing context.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.72

# Run with coverage
npm test sutras/1.4.72 -- --coverage
```

## Technical Details

### Algorithm
1.  **Input Validation**: Ensure `word` is a valid string and `context` is a valid object.
2.  **Word Check**: Confirm the presence of `tiras` (or `तिरस्`) in the `word`.
3.  **Context Analysis**:
    -   Strictly check if `context.verb` is `kṛ` (or `कृ`).
    -   Strictly check if `context.meaning` is 'disappearance'.
4.  **Optional Classification**: If all conditions are met, return an object with `applies: true`, `optional: true`, and `classification: 'गति'`.
5.  **Failure/Error**: If any condition is not met, return an object with `applies: false` and a clear `reason` or `error`.

### Performance
-   **Time Complexity**: O(1).
-   **Space Complexity**: O(1).
-   **Optimization Notes**: The logic is highly specific and requires no complex computation.

### Edge Cases
-   The verb is a derivative of `kṛ` (e.g., `kuru`, `karoti`). The implementation should handle these cases.
-   The context implies `kṛ` but it is not explicitly stated. (Current implementation requires explicit context).
-   Ambiguous cases where `tiras` + `kṛ` could mean both 'disappearance' and 'reproach'. The function relies on unambiguous context.

## Integration

### Related Sutras
-   **1.4.71 (tiro'ntarddhau)**: This sutra establishes the baseline rule that 1.4.72 modifies. This sutra only makes sense when read as an exception to 1.4.71.

### Used By
-   Grammatical generators that need to produce all valid forms of a word. The `optional: true` flag would signal that two paths can be taken.
-   Sandhi and samāsa engines that need to know whether to apply `gati`-specific rules.

## References

-   **Ashtadhyayi of Panini**: Sutra 1.4.72
-   **Siddhanta Kaumudi**: Elucidates this optionality with examples like `tiraskṛtya` / `tiraḥkṛtya`.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
