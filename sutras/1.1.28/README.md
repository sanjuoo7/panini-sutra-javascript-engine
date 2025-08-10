# Sutra 1.1.28: विभाषा दिक्समासे बहुव्रीहौ

## Overview

**Sanskrit Text**: `विभाषा दिक्समासे बहुव्रीहौ`
**Transliteration**: vibhāṣā diksamāse bahuvrīhau
**Translation**: The above words are optionally सर्वनाम when they occur in a बहुव्रीही compound signifying direction -- दिङ्नामान्यन्तराले 2.2.26.

## Purpose

This `saṃjñā` (definition) sutra introduces the first exception to the general `sarvanāma` (pronoun) classification established by Sutra 1.1.27. It states that `sarvanāma` words are **optionally** (`vibhāṣā`) classified as `sarvanāma` when they form part of a `bahuvrīhi` (possessive) compound that signifies direction (`diksamāsa`). This optionality means that such words can either retain their `sarvanāma` properties (and thus undergo pronominal declension) or lose them (and behave like regular nouns). This rule is crucial for handling the flexibility in Sanskrit compound formation.

## Implementation

### Function Signature
```javascript
function checkOptionalSarvanamaInDirectionalBahuvriihi(word, context) {
    // Implementation details
}
```

### Key Features
- **Directional `Bahuvrīhi` Identification**: Functions like `isDirectionalBahuvriihi` and `parseDirectionalCompound` help identify compounds that are `bahuvrīhi` and contain directional elements.
- **Optional `Sarvanāma` Status**: The `checkOptionalSarvanamaInDirectionalBahuvriihi` function determines if a `sarvanāma` word within such a compound is subject to this optional rule, returning `true` for `optional`.
- **Comprehensive Analysis**: The `analyzeSarvanamaWithDirectionalException` function provides a detailed breakdown of a word's `sarvanāma` status, indicating if it's definitely `sarvanāma`, not `sarvanāma`, or optionally `sarvanāma` due to this sutra.
- **Dual Script Support**: All functions handle both IAST and Devanagari representations of words and compounds.

### Dependencies
- **Sanskrit Utils**:
  - `detectScript` from `sanskrit-utils/script-detection.js`
  - `isSarvanama` from `../1.1.27/index.js` (for base `sarvanāma` classification)

### Usage Examples

### Basic Usage
```javascript
import { isDirectionalBahuvriihi, checkOptionalSarvanamaInDirectionalBahuvriihi, analyzeSarvanamaWithDirectionalException, getDirectionalBahuvriihiExamples } from './index.js';

// Example 1: Check for directional bahuvrīhi
console.log(isDirectionalBahuvriihi('sarvapūrva')); // true
console.log(isDirectionalBahuvriihi('सर्वदक्षिण')); // true
console.log(isDirectionalBahuvriihi('sarvaguṇa')); // false (not directional)

// Example 2: Check optional sarvanāma status
const context1 = { compoundType: 'bahuvriihi', compound: 'sarvapūrva' };
const result1 = checkOptionalSarvanamaInDirectionalBahuvriihi('sarva', context1);
console.log(result1.applies); // true
console.log(result1.optional); // true

const context2 = { compoundType: 'bahuvriihi', compound: 'sarvaguṇa' };
const result2 = checkOptionalSarvanamaInDirectionalBahuvriihi('sarva', context2);
console.log(result2.applies); // false (not directional)

// Example 3: Analyze sarvanāma with exception
const analysis = analyzeSarvanamaWithDirectionalException('sarva', context1);
console.log(analysis.isSarvanama); // true
console.log(analysis.status); // 'optional_sarvanama'
console.log(analysis.exception); // '1.1.28'
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **`isDirectionRelated`**: Verifies identification of various directional terms.
- **`isDirectionalBahuvriihi`**: Tests the recognition of directional `bahuvrīhi` compounds.
- **`checkOptionalSarvanamaInDirectionalBahuvriihi`**: Validates the core logic for optional `sarvanāma` status, including all conditions and negative cases.
- **`analyzeSarvanamaWithDirectionalException`**: Confirms the detailed analysis of `sarvanāma` status in the presence of this exception.
- **`hasVibhashaInDirectionalBahuvriihi`**: Checks for the `vibhāṣā` (optionality) behavior.
- **`parseDirectionalCompound`**: Tests the parsing of compounds to identify `sarvanāma` and directional elements.
- **Edge Cases**: Handles `null`, `undefined`, and empty string inputs gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.28

# Run with coverage
npm test sutras/1.1.28 -- --coverage
```

## Technical Details

### Algorithm
1.  **`isDirectionRelated`**: This function checks if a word is present in predefined lists of primary directions, intermediate directions, or directional indicators.
2.  **`isDirectionalBahuvriihi`**: This function checks if a compound matches predefined directional `bahuvrīhi` patterns or if it contains any of the `isDirectionRelated` terms.
3.  **`checkOptionalSarvanamaInDirectionalBahuvriihi`**: This is the core function for this sutra. It first verifies if the `word` is a `sarvanāma` (using 1.1.27). Then, it checks if the `context` indicates a `bahuvrīhi` compound and if that compound is directional (using `isDirectionalBahuvriihi`). If all conditions are met, it returns an object indicating that the `sarvanāma` status is optional.
4.  **`analyzeSarvanamaWithDirectionalException`**: This function integrates the `checkOptionalSarvanamaInDirectionalBahuvriihi` result with the base `sarvanāma` status from 1.1.27 to provide a comprehensive analysis.

### Performance
- **Time Complexity**: O(1) - Operations involve string comparisons and array lookups against small, fixed lists, resulting in constant time complexity.
- **Space Complexity**: O(1) - Memory usage is minimal and constant, as the lists are predefined constants.

### Edge Cases
- **Context Dependency**: The rule is highly dependent on the provided `context` (compound type, compound word). Without accurate context, the function cannot correctly apply the rule.
- **Compound Parsing**: The `parseDirectionalCompound` function provides a basic parsing mechanism, but a full-fledged Sanskrit parser would be needed for complex or ambiguous compounds.

## Integration

### Related Sutras
- **Sutra 1.1.27 (सर्वादीनि सर्वनामानि)**: This sutra introduces an exception to the general `sarvanāma` definition provided by 1.1.27.
- This rule is crucial for the correct declension and syntactic behavior of `sarvanāma` words when they appear in specific types of compounds.

### Used By
- Any module in the Panini engine that performs morphological analysis or declension of `sarvanāma` words, especially within compounds, will need to consult this sutra to determine their correct `sarvanāma` status.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.28
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and leverages `sanskrit-utils` for script detection.
- **Test References**: Test cases are designed to validate the precise conditions under which `sarvanāma` words become optionally `sarvanāma` in directional `bahuvrīhi` compounds.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
