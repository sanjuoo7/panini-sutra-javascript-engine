# Sutra 1.1.19: ईदूतौ च सप्तम्यर्थे

## Overview

**Sanskrit Text**: `ईदूतौ च सप्तम्यर्थे`
**Transliteration**: īdūtau ca saptamyarthe
**Translation**: The final ई and ऊ of words giving the sense of the locative case are pragṛhya.

## Purpose

This `saṃjñā` (definition) sutra further expands the category of `pragṛhya` words. It states that words ending in the long vowels `ī` (ई) or `ū` (ऊ) are considered `pragṛhya` if they convey a locative sense (सप्तम्यर्थे). This rule is crucial for correctly handling certain adverbs and indeclinables that express location or time and end in these vowels, ensuring they do not undergo Sandhi.

## Implementation

### Function Signature
```javascript
function isPragrhyaIU(word, context) {
    // Implementation details
}
```

### Key Features
- **Locative `ī`/`ū` Identification**: The `isPragrhyaIU` function accurately identifies words ending in `ī` (ई) or `ū` (ऊ) as `pragṛhya` when they are explicitly marked with `hasLocativeSense: true` or `meaning: 'locative'` in the context.
- **Locative Meaning Inference**: The `hasLocativeMeaning` helper function attempts to infer a locative sense based on common patterns and known locative words, allowing for more flexible application.
- **Integrated `Pragṛhya` Check**: The `isPragrhya` function (exported from this module) now combines the rules from Sutras 1.1.11 through 1.1.19, providing an increasingly comprehensive check for `pragṛhya` status.

### Dependencies
- **Sanskrit Utils**:
  - `detectScript` from `sanskrit-utils/script-detection.js`
  - `isPragrhya` from `../1.1.18/index.js` (for base `pragṛhya` checks from previous sutra)

### Usage Examples

### Basic Usage
```javascript
import { isPragrhyaIU, isPragrhya, hasLocativeMeaning, hasPragrhyaBehavior } from './index.js';

// Example 1: Check for ī/ū with locative sense
const context1 = { hasLocativeSense: true };
console.log(isPragrhyaIU('addhī', context1)); // true
console.log(isPragrhyaIU('यावतू', context1)); // true

// Example 2: Inferring locative meaning
console.log(hasLocativeMeaning('prabhṛtī')); // true
console.log(hasLocativeMeaning('कुत्र')); // true (even if it doesn't end in ī/ū, it's a locative word)

// Example 3: Combined pragṛhya check (with auto-inference)
console.log(isPragrhya('addhī')); // true (locative sense inferred)
console.log(isPragrhya('ūṃ')); // true (from 1.1.18)
console.log(isPragrhya('aho', { isParticle: true })); // true (from 1.1.15)

// Example 4: Check for pragṛhya behavior
console.log(hasPragrhyaBehavior('परी', { hasLocativeSense: true })); // true
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **Positive Cases**: Verifies correct identification of `ī`/`ū` ending words as `pragṛhya` when locative sense is present (explicitly or inferred).
- **Negative Cases**: Ensures that words without locative sense or not ending in `ī`/`ū` are correctly excluded.
- **Contextual Tests**: Confirms that `hasLocativeSense` and `meaning` contexts are correctly utilized.
- **Inference Tests**: Validates the `hasLocativeMeaning` function's ability to identify common locative words and patterns.
- **Integration**: Tests confirm that the `isPragrhya` function correctly combines the rules from Sutras 1.1.11 through 1.1.19.
- **Edge Cases**: Handles `null`, `undefined`, and empty string inputs gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.19

# Run with coverage
npm test sutras/1.1.19 -- --coverage
```

## Technical Details

### Algorithm
1.  The `isPragrhyaIU` function first checks if the `word` ends in `ī` (ई) or `ū` (ऊ). Then, it verifies if the `context` explicitly indicates a locative sense (`hasLocativeSense: true` or `meaning: 'locative'`).
2.  The `hasLocativeMeaning` function uses a predefined list of common locative words and checks for specific patterns (like `tr` or `dā` endings) to infer locative sense.
3.  The `isPragrhya` function in this module acts as an aggregator. It first checks if the word is `pragṛhya` based on previous sutras (1.1.11-1.1.18). If not, it then attempts to infer locative meaning for the word and applies the logic of 1.1.19.

### Performance
- **Time Complexity**: O(1) - Operations involve string checks and array lookups against small, fixed lists, resulting in constant time complexity.
- **Space Complexity**: O(1) - Memory usage is minimal and constant.

### Edge Cases
- **Ambiguity**: The inference of locative meaning is based on common patterns and may not cover all possible cases. Explicit context is always preferred for certainty.
- **Invalid Inputs**: Functions handle `null`, `undefined`, or empty string inputs by returning `false`.

## Integration

### Related Sutras
- **Sutras 1.1.11 through 1.1.18**: This sutra builds upon the `pragṛhya` definitions established by these preceding rules, adding a condition for locative `ī`/`ū` ending words.
- This rule is important for the accurate parsing of Sanskrit texts, especially those containing adverbs and indeclinables with locative force.

### Used By
- Any module performing Sandhi operations or grammatical analysis will need to consult the `isPragrhya` or `hasPragrhyaBehavior` functions to ensure that locative `ī`/`ū` ending words are not incorrectly subjected to Sandhi.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.19
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and integrates with the broader `pragṛhya` analysis framework.
- **Test References**: Test cases are designed to validate the specific conditions for locative `ī`/`ū` ending words and the inference of locative meaning.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
