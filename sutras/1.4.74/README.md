# Sutra 1.4.74: साक्षात्प्रभृतीनि च

## Overview

**Sanskrit Text**: `साक्षात्प्रभृतीनि च`
**Transliteration**: `sākṣātprabhṛtīni ca`
**Translation**: And (`ca`) the words `sākṣāt`, etc. (`prabhṛtīni`) [are also optionally classified as `gati` when used with the verb `kṛ`].

## Purpose

This sutra extends the optional (`vibhāṣā`) `gati` classification to a specific list of words, known as the `sākṣātprabhṛtīni gaṇa` (the group of words starting with `sākṣāt`). When any word from this group is used with the verb `kṛ` ('to do/make'), it may optionally be treated as a `gati`. This allows for grammatical flexibility, resulting in alternative correct forms. This rule significantly broadens the scope of optional `gati` classification for indeclinables.

## The `sākṣātprabhṛtīni` Group

This rule applies to a specific list of words. Based on commentaries, this group includes (but is not limited to):
- `sākṣāt` (साक्षात्) - directly, in person
- `mithyā` (मिथ्या) - falsely
- `lavaṇam` (लवणम्) - salt
- `uṣṇam` (उष्णम्) - heat, warmth
- `śītam` (शीतम्) - cold
- `pṛthak` (पृथक्) - separately
- `mañju` (मञ्जु) - beautifully
- `śukla` (शुक्ल) - white (and other color words)

## Implementation

### Function Signature
```javascript
function sutra1474(word, context = {}) {
    // Implementation details
}
```

### Key Features
- **Group Identification**: Checks if the initial part of the word belongs to the `sākṣātprabhṛtīni` group.
- **Verb Specificity**: The rule is strictly for combinations with the verb `kṛ`.
- **Optional Classification**: The output must indicate that the `gati` status is optional.
- **Script Agnostic**: Handles both IAST and Devanagari scripts.

### Dependencies
- **Internal Data**: Requires a predefined list or set of the `sākṣātprabhṛtīni` words.
- **Sanskrit Utils**: `isVerb` to validate the verb in the context.

## Usage Examples

### Basic Usage
```javascript
import { sutra1474 } from './index.js';

// Example 1: 'sākṣāt' with 'kṛ'
const result1 = sutra1474('sākṣātkṛtya', { verb: 'kṛ' });
console.log(result1);
// Expected output:
// {
//   applies: true,
//   optional: true,
//   classification: 'गति',
//   keyword: 'sākṣāt',
//   confidence: 1.0,
//   reason: "The word 'sākṣāt' from the sākṣātprabhṛtīni group is used with 'kṛ', so its gati classification is optional."
// }

// Example 2: 'mithyā' (another word from the group) with 'kṛ'
const result2 = sutra1474('मिथ्याकरोति', { verb: 'कृ' });
console.log(result2);
// Expected output:
// {
//   applies: true,
//   optional: true,
//   classification: 'गति',
//   keyword: 'मिथ्या',
//   confidence: 1.0,
//   reason: "The word 'mithyā' from the sākṣātprabhṛtīni group is used with 'kṛ', so its gati classification is optional."
// }
```

### Advanced Usage
```javascript
// Example where the verb is not 'kṛ'
const result3 = sutra1474('sākṣātbhavati', { verb: 'bhū' });
console.log(result3);
// Expected output:
// {
//   applies: false,
//   reason: "The verb is not 'kṛ'."
// }

// Example where the word is not in the group
const result4 = sutra1474('anyathākṛtya', { verb: 'kṛ' });
console.log(result4);
// Expected output:
// {
//   applies: false,
//   reason: "The word 'anyathā' is not in the sākṣātprabhṛtīni group."
// }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 54 tests covering:
- **Positive Cases (32)**: Correct optional `gati` classification for words in the `sākṣātprabhṛtīni` group (`sākṣāt`, `mithyā`, `lavaṇam`, `uṣṇam`, `mañju`, `pṛthak`, `śukla`) when combined with `kṛ`.
- **Negative Cases (12)**: The rule correctly fails when the verb is not `kṛ` or the word is not in the specified group.
- **Edge Cases (10)**: Robust handling of invalid inputs, including `null`, empty strings, and incomplete context.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.74

# Run with coverage
npm test sutras/1.4.74 -- --coverage
```

## Technical Details

### Algorithm
1.  **Input Validation**: Check for a valid `word` and `context`.
2.  **Keyword Matching**: Check if the `word` starts with any of the keywords from the `sākṣātprabhṛtīni` list.
3.  **Contextual Verification**: Confirm that `context.verb` is `kṛ`.
4.  **Optional Classification**: If both a keyword and the verb `kṛ` are found, return an object with `applies: true` and `optional: true`.
5.  **Failure/Error**: If checks fail, return an object with `applies: false` and a clear `reason` or `error`.

### Performance
-   **Time Complexity**: O(N) where N is the number of words in the `sākṣātprabhṛtīni` group if using an array. O(1) on average if using a hash set for the keywords.
-   **Space Complexity**: O(M) where M is the number of characters needed to store the keyword list.

### Edge Cases
-   The input word is an exact match for a keyword but is not compounded with `kṛ`.
-   The implementation must handle the various forms of `kṛ` (e.g., `karoti`, `kṛtya`, `kṛtvā`).
-   The list of `sākṣātprabhṛtīni` words must be accurate and comprehensive for full correctness.

## Integration

### Related Sutras
-   This sutra is a continuation of the optional `gati` rules found in **1.4.72** and **1.4.73**, all of which apply when the verb is `kṛ`.

### Used By
-   Any part of the grammar engine that deals with compounding (`samāsa`) or sandhi involving indeclinables and the verb `kṛ`.

## References

-   **Ashtadhyayi of Panini**: Sutra 1.4.74
-   **Siddhanta Kaumudi**: Provides a list of words belonging to this `gaṇa` (group).

---

*Generated from template: SUTRA_README_TEMPLATE.md*
