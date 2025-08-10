# Sutra 1.1.21: आद्यन्तवदेकस्मिन्

## Overview

**Sanskrit Text**: `आद्यन्तवदेकस्मिन्`
**Transliteration**: ādyantavadekasmin
**Translation**: An operation should be performed on a single letter, as upon an initial or upon a final.

## Purpose

This `paribhāṣā` (meta-rule) is fundamental to Pāṇini's grammatical system. It dictates how a grammatical operation, which is typically prescribed for the initial (`ādi`) or final (`anta`) part of a larger linguistic unit (like a word or a stem), should be understood when the unit itself consists of only a single letter or phoneme. In such cases, the single letter is treated as both the initial and the final element, allowing the rule to apply. This ensures consistency and logical extension of rules across different word structures.

## Implementation

### Function Signature
```javascript
function applyAdyantavat(letter, context) {
    // Implementation details
}
```

### Key Features
- **Single-Letter Interpretation**: The `applyAdyantavat` function formalizes the application of this meta-rule, indicating how a single letter should be treated (as initial, final, or both) based on the context of the operation.
- **Rule Applicability Check**: The `shouldApplyToSinglePhoneme` function helps determine if a given grammatical rule, typically positional, can be validly applied to a single phoneme according to this sutra.
- **Contextual Awareness**: The functions are designed to consider the `context` of the operation (e.g., `position`, `operationType`, `ruleScope`) to accurately apply the `ādyantavat` principle.

### Dependencies
- **Sanskrit Utils**:
  - This sutra's implementation includes its own logic for `isSingleLetterOperation`, `applyAdyantavat`, `shouldApplyToSinglePhoneme`, `getSingleLetterExamples`, and `isParibhashaApplicable`. While `sanskrit-utils/single-letter-operations.js` exists, the local implementation provides specific nuances for this sutra.

### Usage Examples

### Basic Usage
```javascript
import { applyAdyantavat, shouldApplyToSinglePhoneme, isParibhashaApplicable } from './index.js';

// Example 1: Applying ādyantavat to a single letter
const result1 = applyAdyantavat('a', { targetPosition: 'initial' });
console.log(result1); 
// {
//   applied: true,
//   result: 'a',
//   treatAs: 'initial',
//   reason: 'Applied ādyantavat rule for single letter',
//   operation: 'adyantavat'
// }

const result2 = applyAdyantavat('क्'); // Default: treated as both
console.log(result2.treatAs); // 'both_initial_and_final'

// Example 2: Checking if a rule applies to a single phoneme
const ruleContext = { ruleScope: 'final' };
console.log(shouldApplyToSinglePhoneme('त्', 'visarga-rule', ruleContext)); // true
console.log(shouldApplyToSinglePhoneme('a', 'some-other-rule', ruleContext)); // false

// Example 3: Checking applicability of the paribhāṣā
console.log(isParibhashaApplicable('i')); // true (single letter)
console.log(isParibhashaApplicable('word', { targetType: 'phoneme' })); // true (phoneme-level operation)
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **`applyAdyantavat`**: Verifies correct application of the initial/final treatment to single letters, including explicit positional contexts and default behavior.
- **`shouldApplyToSinglePhoneme`**: Tests various rules and contexts to ensure accurate determination of applicability to single phonemes.
- **`isSingleLetterOperation`**: Checks if different types of inputs and contexts are correctly identified as single-letter operations.
- **`isParibhashaApplicable`**: Validates the conditions under which this meta-rule is considered applicable.
- **Edge Cases**: Handles `null`, `undefined`, empty strings, and multi-character inputs gracefully.
- **Script Support**: Includes tests for both IAST and Devanagari characters.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.21

# Run with coverage
npm test sutras/1.1.21 -- --coverage
```

## Technical Details

### Algorithm
1.  **`applyAdyantavat`**: This function takes a `letter` and `context`. It first validates if the input is indeed a single letter (or a single consonant with a virama). Based on the `context.position` or `context.targetPosition`, it determines whether the letter should be treated as `initial`, `final`, or `both_initial_and_final` (default). It returns an object detailing the application of the rule.
2.  **`shouldApplyToSinglePhoneme`**: This function checks if the `phoneme` is a single character. It then evaluates the `rule` and its `ruleScope` (e.g., `initial`, `final`, `positional`) against a predefined list of rule types that are typically applicable to single phonemes (e.g., `vowel-lengthening`, `consonant-change`).
3.  **`isParibhashaApplicable`**: This function determines if the `ādyantavadekasmin` meta-rule is relevant for a given `input` and `context`. It checks if the input is a single phoneme, or if the operation targets phonemes or involves positional changes.

### Performance
- **Time Complexity**: O(1) - Operations involve string length checks, regular expression tests against single characters, and boolean logic, resulting in constant time complexity.
- **Space Complexity**: O(1) - Memory usage is minimal and constant.

### Edge Cases
- **Multi-character Inputs**: Functions are designed to explicitly reject or handle multi-character strings when a single letter is expected, ensuring the rule's precision.
- **Missing Context**: If crucial contextual information is missing, the functions provide sensible defaults or return `false` where applicability cannot be determined.

## Integration

### Related Sutras
- As a `paribhāṣā` (meta-rule), Sutra 1.1.21 does not directly prescribe a grammatical change but rather guides the interpretation and application of other `vidhi` (rule) sutras. It is implicitly relevant to countless rules that operate on the initial or final elements of words or stems.

### Used By
- This sutra's logic is crucial for any component of the Panini engine that applies grammatical operations to individual phonemes or when a rule's scope (initial/final) needs to be extended to single-letter units. This includes modules for Sandhi, word formation, and morphological analysis.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.21
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and provides a robust interpretation of this foundational meta-rule.
- **Test References**: Test cases are designed to cover various scenarios where this meta-rule would apply, ensuring its correct interpretation in the computational model.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
