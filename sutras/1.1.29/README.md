# Sutra 1.1.29: न बहुव्रीहौ

## Overview

**Sanskrit Text**: `न बहुव्रीहौ`
**Transliteration**: na bahuvrīhau
**Translation**: The words सर्व etc. are not सर्वनाम when they occur in a बहुव्रीही compound.

## Purpose

This `saṃjñā` (definition) sutra introduces another crucial exception to the general `sarvanāma` (pronoun) classification established by Sutra 1.1.27. It states that `sarvanāma` words (like `sarva`, `anya`, `tad`, etc.) **lose** their `sarvanāma` status when they occur as a component within a `bahuvrīhi` (possessive) compound. This means they will not undergo pronominal declension and will behave like regular nouns. This rule is a general negation, overriding the optionality introduced by 1.1.28 for directional `bahuvrīhi` compounds.

## Implementation

### Function Signature
```javascript
function checkSarvanamaNegationInBahuvriihi(word, context) {
    // Implementation details
}
```

### Key Features
- **`Bahuvrīhi` Negation**: The `checkSarvanamaNegationInBahuvriihi` function specifically identifies when a `sarvanāma` word loses its status due to being part of a `bahuvrīhi` compound.
- **Comprehensive Exception Handling**: The `analyzeSarvanamaWithCompoundExceptions` function integrates this rule with other `sarvanāma` negation rules (1.1.30 for instrumental compounds and 1.1.31 for `dvandva` compounds), providing a unified analysis of `sarvanāma` status in compound contexts.
- **Dual Script Support**: All functions handle both IAST and Devanagari representations.

### Dependencies
- **Sanskrit Utils**:
  - `detectScript` from `sanskrit-utils/script-detection.js`
  - `isSarvanama` from `../1.1.27/index.js` (for base `sarvanāma` classification)

### Usage Examples

### Basic Usage
```javascript
import { checkSarvanamaNegationInBahuvriihi, analyzeSarvanamaWithCompoundExceptions, losesSarvanamaInCompound, getSarvanamaNegationReason } from './index.js';

// Example 1: Check for negation in bahuvrīhi
const context1 = { compoundType: 'bahuvriihi' };
const result1 = checkSarvanamaNegationInBahuvriihi('sarva', context1);
console.log(result1.negated); // true
console.log(result1.sutra); // '1.1.29'

// Example 2: Comprehensive analysis
const analysis = analyzeSarvanamaWithCompoundExceptions('sarva', context1);
console.log(analysis.isSarvanama); // false (negated)
console.log(analysis.status); // 'sarvanama_negated_by_compound'
console.log(analysis.appliedSutras); // ['1.1.29']

// Example 3: Check if sarvanāma status is lost
console.log(losesSarvanamaInCompound('sarva', context1)); // true

// Example 4: Get negation reason
console.log(getSarvanamaNegationReason('sarva', context1)); // 'सर्वनाम words are not सर्वनाम in बहुव्रीही compounds'

// Example 5: Non-negating context
const context2 = { compoundType: 'tatpurusha' };
const analysis2 = analyzeSarvanamaWithCompoundExceptions('sarva', context2);
console.log(analysis2.isSarvanama); // true (retained)
console.log(analysis2.status); // 'definite_sarvanama'
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **`checkSarvanamaNegationInBahuvriihi`**: Verifies correct negation of `sarvanāma` status in `bahuvrīhi` contexts, and ensures non-`sarvanāma` words or non-`bahuvrīhi` contexts are correctly handled.
- **`analyzeSarvanamaWithCompoundExceptions`**: Tests the integration of this rule with 1.1.30 and 1.1.31, ensuring correct overall `sarvanāma` status determination.
- **`losesSarvanamaInCompound`**: Confirms when `sarvanāma` status is lost.
- **`getSarvanamaNegationReason`**: Validates the retrieval of the specific reason for negation.
- **Edge Cases**: Handles `null`, `undefined`, and empty string inputs gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.29

# Run with coverage
npm test sutras/1.1.29 -- --coverage
```

## Technical Details

### Algorithm
1.  **`checkSarvanamaNegationInBahuvriihi`**: This function first checks if the `word` is a `sarvanāma` (using 1.1.27). If so, it then checks if the `context.compoundType` is `bahuvriihi` (or `बहुव्रीही`). If both conditions are met, it returns an object indicating that the `sarvanāma` status is negated by this sutra.
2.  **`analyzeSarvanamaWithCompoundExceptions`**: This is the central function that orchestrates the application of 1.1.29, 1.1.30, and 1.1.31. It first determines the base `sarvanāma` status (from 1.1.27). Then, it sequentially checks for negation by each of these three sutras. If any of them apply, the `sarvanāma` status is negated, and the relevant exceptions are recorded.

### Performance
- **Time Complexity**: O(1) - Operations involve string comparisons and boolean logic, resulting in constant time complexity.
- **Space Complexity**: O(1) - Memory usage is minimal and constant.

### Edge Cases
- **Context Dependency**: The rule is highly dependent on the provided `context` (specifically `compoundType`). Without accurate context, the function cannot correctly apply the rule.
- **Interaction with 1.1.28**: While 1.1.28 makes `sarvanāma` status optional in directional `bahuvrīhi` compounds, 1.1.29 provides a general negation for all `bahuvrīhi` compounds. In practice, 1.1.29 often overrides the optionality of 1.1.28, leading to a definite loss of `sarvanāma` status in such compounds.

## Integration

### Related Sutras
- **Sutra 1.1.27 (सर्वादीनि सर्वनामानि)**: This sutra provides a direct negation to the general `sarvanāma` definition from 1.1.27.
- **Sutra 1.1.28 (विभाषा दिक्समासे बहुव्रीहौ)**: This sutra interacts with 1.1.28, as 1.1.29 provides a more general negation for `bahuvrīhi` compounds, often overriding the optionality of 1.1.28.
- **Sutra 1.1.30 (तृतीयासमासे)** and **Sutra 1.1.31 (द्वन्द्वे च)**: These three sutras (1.1.29, 1.1.30, 1.1.31) collectively define contexts where `sarvanāma` status is negated in compounds.

### Used By
- Any module in the Panini engine that performs morphological analysis or declension of `sarvanāma` words, especially within `bahuvrīhi` compounds, will need to consult this sutra to determine their correct `sarvanāma` status.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.29
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and integrates with the broader `sarvanāma` analysis framework.
- **Test References**: Test cases are designed to validate the precise conditions under which `sarvanāma` words lose their status in `bahuvrīhi` compounds.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
