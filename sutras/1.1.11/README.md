# Sutra 1.1.11: ईदूदेद्द्विवचनं प्रगृह्यम्

## Overview

**Sanskrit Text**: `ईदूदेद्द्विवचनं प्रगृह्यम्`
**Transliteration**: īdūdedvidvacanaṃ pragṛhyam
**Translation**: A dual case affix ending in ī or ū or e is called pragṛhya, or excepted vowels which do not admit sandhi or conjugation.

## Purpose

This `saṃjñā` (definition) sutra defines a specific category of words as `pragṛhya`. `Pragṛhya` words are those that do not undergo Sandhi (phonetic combination) when followed by another vowel. This sutra specifically identifies words that are in the dual number and end in the vowels `ī` (ई), `ū` (ऊ), or `e` (ए) as `pragṛhya`. This rule is fundamental for correctly applying Sandhi rules in Sanskrit.

## Implementation

### Function Signature
```javascript
function isPragrhyaDualEnding(word, isDual) {
    // Implementation details
}
```

### Key Features
- **Dual Ending Identification**: The `isPragrhyaDualEnding` function accurately identifies if a word, given it is in the dual number, ends in `ī`, `ū`, or `e` (in both IAST and Devanagari).
- **Sandhi Prevention**: The `preventsSandhi` function leverages the `pragṛhya` status to determine if Sandhi should be applied between two words.
- **Comprehensive Analysis**: The `analyzePragrhyaStatus` function provides a detailed breakdown of why a word is or is not `pragṛhya` based on this sutra.
- **Shared Utilities Integration**: Utilizes shared functions from `sanskrit-utils/pragrhya-analysis.js` for consistent `pragṛhya` logic across the project.

### Dependencies
- **Sanskrit Utils**:
  - `detectScript`, `isVowel` from `sanskrit-utils/index.js`
  - `isPragrhya`, `isPragrhyaDualEnding`, `analyzePragrhya`, `preventsSandhi`, `getPragrhyaExamples` from `sanskrit-utils/pragrhya-analysis.js`

### Usage Examples

### Basic Usage
```javascript
import { isPragrhyaDualEnding, isPragrhya, preventsSandhi, analyzePragrhyaStatus } from './index.js';

// Example 1: Identifying a dual ending as pragṛhya
const word1 = 'rāmī'; // Dual form of Rāma
const isDual1 = true;
console.log(isPragrhyaDualEnding(word1, isDual1)); // true

const word2 = 'rāmaḥ'; // Singular form
const isDual2 = false;
console.log(isPragrhyaDualEnding(word2, isDual2)); // false

// Example 2: Checking overall pragṛhya status (using context)
console.log(isPragrhya('viṣṇū', { number: 'dual' })); // true
console.log(isPragrhya('agni', { number: 'singular' })); // false

// Example 3: Preventing Sandhi
const firstWord = 'rāme';
const secondWord = 'iti';
const context = { number: 'dual' };
console.log(preventsSandhi(firstWord, secondWord, context)); // true (Sandhi is prevented)

const nonPragrhyaWord = 'rāmaḥ';
console.log(preventsSandhi(nonPragrhyaWord, secondWord, {})); // false (Sandhi is not prevented by this rule)

// Example 4: Detailed analysis
const analysis = analyzePragrhyaStatus('देवी', { isDual: true, followingWord: 'इति' });
console.log(analysis);
// {
//   isPragrhya: true,
//   ending: 'ी',
//   reason: 'dual_ending_ii',
//   resistsSandhi: true,
//   sandhiBlocked: true,
//   script: 'Devanagari'
// }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides extensive coverage, including:
- **Positive Cases**: Verifies correct identification of `pragṛhya` words ending in `ī`, `ū`, and `e` in dual forms for both IAST and Devanagari.
- **Negative Cases**: Ensures that non-dual forms or words not ending in the specified vowels are not incorrectly identified as `pragṛhya`.
- **Sandhi Prevention**: Tests confirm that `preventsSandhi` correctly returns `true` for `pragṛhya` words and `false` otherwise.
- **Edge Cases**: Handles `null`, `undefined`, and empty string inputs gracefully.
- **Real-world Examples**: Includes common Sanskrit dual forms to validate the rule's application in practical scenarios.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.11

# Run with coverage
npm test sutras/1.1.11 -- --coverage
```

## Technical Details

### Algorithm
1.  The `isPragrhyaDualEnding` function first checks if the `isDual` context is `true`. If not, it immediately returns `false`. Then, it extracts the last character (or vowel in Devanagari) of the word and checks if it is `ī`, `ū`, or `e` (or their Devanagari equivalents). Script detection is used to handle both IAST and Devanagari inputs.
2.  The `isPragrhya` function acts as a wrapper, calling the shared `isPragrhyaShared` utility, which consolidates `pragṛhya` logic from various sutras, ensuring that only rules up to 1.1.11 are considered for this specific check.
3.  The `preventsSandhi` function uses the `isPragrhya` check on the first word to determine if Sandhi should be prevented.
4.  `analyzePragrhyaStatus` provides a detailed object explaining the `pragṛhya` status, including the reason for classification.

### Performance
- **Time Complexity**: O(1) - Operations involve string slicing and array lookups, which are constant time for typical word lengths.
- **Space Complexity**: O(1) - Memory usage is minimal and constant.

### Edge Cases
- **Missing Context**: If the `isDual` context is not provided or is `false`, the word will not be identified as `pragṛhya` by this sutra, as the dual number is a strict condition.
- **Invalid Inputs**: Functions handle `null`, `undefined`, or empty string inputs by returning `false` or an appropriate analysis object.

## Integration

### Related Sutras
- This sutra is a foundational `pragṛhya` definition. Other `pragṛhya` sutras (e.g., 1.1.12, 1.1.13, etc.) will add more conditions for words to be considered `pragṛhya`.
- It directly impacts Sandhi rules, as `pragṛhya` words are exceptions to many Sandhi transformations.

### Used By
- Any part of the Panini engine that performs Sandhi operations will need to consult this sutra (and other `pragṛhya` rules) to ensure that `pragṛhya` words are not incorrectly combined.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.11
- **Implementation Notes**: The implementation follows the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and integrates with the `sanskrit-utils/pragrhya-analysis.js` module.
- **Test References**: Test cases are derived from classical Sanskrit grammar examples illustrating dual forms and their `pragṛhya` status.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
