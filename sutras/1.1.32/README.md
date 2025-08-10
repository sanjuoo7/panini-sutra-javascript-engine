# Sutra 1.1.32: विभाषा जसि

## Overview

**Sanskrit Text**: `विभाषा जसि`
**Transliteration**: vibhāṣā jasi
**Translation**: Their द्वन्द्व compounds are optionally सर्वनाम when the nominative plural termination जस् follows.

## Purpose

This `saṃjñā` (definition) sutra introduces another nuance to the `sarvanāma` (pronoun) classification, specifically interacting with `dvandva` (copulative) compounds. While Sutra 1.1.31 generally states that `sarvanāma` words lose their status in `dvandva` compounds, this sutra provides an exception: if such a `dvandva` compound (containing `sarvādi` words) is followed by the nominative plural termination `jas` (जस्), then the `sarvanāma` status is **optionally** (`vibhāṣā`) retained. This optionality allows for flexibility in declension, where the compound can either behave like a regular noun or retain its pronominal characteristics.

## Implementation

### Function Signature
```javascript
function applySutra1_1_32(word, context) {
    // Implementation details
}
```

### Key Features
- **Conditional Optionality**: The `applySutra1_1_32` function precisely determines when the `sarvanāma` status becomes optional, based on three conditions: being a `dvandva` compound, containing `sarvādi` words, and being followed by the `jas` (nominative plural) termination.
- **Context-Dependent Application**: The rule relies heavily on the provided `context` to identify the compound type, its constituents, and the following case ending.
- **Integrated Checks**: Helper functions `isDvandvaCompound` and `isNominativePlural` streamline the condition checks.
- **Dual Script Support**: The underlying `sarvādi` word lists and validation utilities support both IAST and Devanagari.

### Dependencies
- **Sanskrit Utils**:
  - `detectScript` from `sanskrit-utils/script-detection.js`
  - `validateSanskritWord` from `sanskrit-utils/validation.js`
  - `SanskritWordLists` from `sanskrit-utils/constants.js` (for `sarvādi` words)

### Usage Examples

### Basic Usage
```javascript
import { applySutra1_1_32, isDvandvaCompound, isNominativePlural, testSutra1_1_32 } from './index.js';

// Example 1: Conditions met - sarvanāma status is optional
const context1 = {
  compound: { type: 'dvandva', parts: ['sarva', 'viśva'] },
  case: { vibhakti: 'prathama', vacana: 'bahuvacana' }
};
const result1 = applySutra1_1_32('sarvaviśvāḥ', context1);
console.log(result1.applies); // true
console.log(result1.sarvanama_status); // 'optional'

// Example 2: Not a dvandva compound
const context2 = {
  compound: { type: 'tatpurusha', parts: ['sarva', 'jana'] },
  case: { vibhakti: 'prathama', vacana: 'bahuvacana' }
};
const result2 = applySutra1_1_32('sarvajanaḥ', context2);
console.log(result2.applies); // false
console.log(result2.reason); // 'Not a dvandva compound'

// Example 3: Not followed by jas
const context3 = {
  compound: { type: 'dvandva', parts: ['sarva', 'viśva'] },
  case: { vibhakti: 'dvitiya', vacana: 'bahuvacana' }
};
const result3 = applySutra1_1_32('sarvaviśvān', context3);
console.log(result3.applies); // false
console.log(result3.reason); // 'Not followed by nominative plural (jas)'

// Example 4: Test the sutra with a comprehensive function
const testResult = testSutra1_1_32('sarvaviśvāḥ', context1);
console.log(testResult.analysis.applies); // true
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **`applySutra1_1_32`**: Verifies correct application of the optional `sarvanāma` status when all conditions are met, and correct non-application when conditions are not met (e.g., not `dvandva`, not `jas`, no `sarvādi` words).
- **`isDvandvaCompound`**: Tests the identification of `dvandva` compounds.
- **`isNominativePlural`**: Tests the identification of the `jas` (nominative plural) case.
- **Integration Tests**: Confirms the overall behavior of `testSutra1_1_32` with various inputs.
- **Edge Cases**: Handles `null`, `undefined`, and invalid word inputs gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.32

# Run with coverage
npm test sutras/1.1.32 -- --coverage
```

## Technical Details

### Algorithm
1.  **`applySutra1_1_32`**: This is the main function. It performs a series of checks:
    a.  Validates the input `word`.
    b.  Checks if the `context.compound` is a `dvandva` compound using `isDvandvaCompound`.
    c.  Checks if the `context.case` is nominative plural (`jas`) using `isNominativePlural`.
    d.  Checks if the `compound.parts` contain any `sarvādi` words (from `SanskritWordLists.sarvaadi.iast`).
    If all conditions are met, it sets `applies: true` and `sarvanama_status: 'optional'`.
2.  **`isDvandvaCompound`**: A simple helper that checks the `type` property of the `compound` object.
3.  **`isNominativePlural`**: A simple helper that checks the `vibhakti` and `vacana` properties of the `caseInfo` object.

### Performance
- **Time Complexity**: O(N) where N is the number of parts in the compound (for checking `sarvādi` words), but practically O(1) due to the limited number of `sarvādi` words and compound parts in typical usage.
- **Space Complexity**: O(1) - Memory usage is minimal and constant.

### Edge Cases
- **Missing Context**: The function relies heavily on a well-formed `context` object. If `compound` or `case` information is missing or malformed, the rule will not apply.
- **Implicit `sarvādi`**: The current implementation checks for explicit `sarvādi` words in `compound.parts`. It does not perform deep morphological analysis to identify `sarvādi` words that might be highly inflected or part of more complex structures.

## Integration

### Related Sutras
- **Sutra 1.1.27 (सर्वादीनि सर्वनामानि)**: This sutra defines the general class of `sarvanāma` words.
- **Sutra 1.1.31 (द्वन्द्वे च)**: This sutra generally negates `sarvanāma` status in `dvandva` compounds. Sutra 1.1.32 provides a specific optional exception to this negation.
- This rule is crucial for the correct declension of `sarvādi` words in `dvandva` compounds when they are in the nominative plural.

### Used By
- Any module in the Panini engine that performs morphological analysis or declension of `sarvanāma` words, especially within `dvandva` compounds in the nominative plural, will need to consult this sutra to determine their correct (optional) `sarvanāma` status.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.32
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and leverages shared `sanskrit-utils` for word lists and validation.
- **Test References**: Test cases are designed to validate the precise conditions under which `sarvanāma` words in `dvandva` compounds optionally retain their status before `jas`.

---

*Generated from template: SUTRA_README_TEMPLATE.md*