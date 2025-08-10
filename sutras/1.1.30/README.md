# Sutra 1.1.30: तृतीयासमासे

## Overview

**Sanskrit Text**: `तृतीयासमासे`
**Transliteration**: tṛtīyāsamāse
**Translation**: In the Instrumental Determinative Compounds the words सर्व etc. are not सर्वनाम.

## Purpose

This `saṃjñā` (definition) sutra introduces another specific context where `sarvanāma` (pronoun) words lose their `sarvanāma` status. It states that words like `sarva` (सर्व), `viśva` (विश्व), etc., are **not** classified as `sarvanāma` when they occur within an instrumental determinative compound (`tṛtīyāsamāsa`). This rule ensures that such words behave like regular nouns in these specific compound structures, affecting their declension and grammatical properties.

## Implementation

### Function Signature
```javascript
function loseSarvanameInTritiyasamasa(word, context) {
    // Implementation details
}
```

### Key Features
- **`Tṛtīyāsamāsa` Identification**: The `isTritiyasamasa` function identifies instrumental determinative compounds based on explicit `compoundType` in the context or inferred `semanticRelation`.
- **`Sarvanāma` Negation**: The `loseSarvanameInTritiyasamasa` function determines if a `sarvanāma` word loses its pronominal status within such a compound.
- **Integrated Classification**: The `isSarvanama` function (exported from this module) incorporates this rule, returning `false` for `sarvanāma` words in `tṛtīyāsamāsa` contexts.
- **Compound Analysis**: The `analyzeCompoundSarvaname` function provides a detailed breakdown of `sarvanāma` words within a compound, indicating if this sutra has been applied.
- **Dual Script Support**: All functions handle both IAST and Devanagari representations.

### Dependencies
- **Sanskrit Utils**:
  - `detectScript` from `sanskrit-utils/index.js`
  - `SanskritWordLists` from `sanskrit-utils/constants.js` (for the list of `sarvādi` words)

### Usage Examples

### Basic Usage
```javascript
import { isTritiyasamasa, loseSarvanameInTritiyasamasa, isSarvanama, analyzeCompoundSarvaname, getTritiyasamasaExamples } from './index.js';

// Example 1: Check for tritiyasamasa
const context1 = { compoundType: 'tritiyasamasa' };
console.log(isTritiyasamasa('sarvakāma', context1)); // true

// Example 2: Check if sarvanāma status is lost
console.log(loseSarvanameInTritiyasamasa('sarva', context1)); // true
console.log(loseSarvanameInTritiyasamasa('rāma', context1)); // false (not a sarvanāma word)

// Example 3: Integrated isSarvanama check
console.log(isSarvanama('sarva', context1)); // false (status lost)
console.log(isSarvanama('sarva', { compoundType: 'tatpurusha' })); // true (status retained)

// Example 4: Analyze a compound
const constituents = ['sarva', 'kāma'];
const analysis = analyzeCompoundSarvaname('sarvakāma', constituents, context1);
console.log(analysis.isTritiyasamasa); // true
console.log(analysis.nonSarvanameWords); // ['sarva']
console.log(analysis.sutraApplied); // true

// Example 5: Get examples
console.log(getTritiyasamasaExamples('IAST').instrumentalCompounds); // ['sarvakāma', 'viśvakarmā', ...]
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **`isTritiyasamasa`**: Verifies correct identification of instrumental compounds based on various contextual cues.
- **`loseSarvanameInTritiyasamasa`**: Tests the negation of `sarvanāma` status for relevant words in `tṛtīyāsamāsa`.
- **`isSarvanama`**: Confirms the integrated behavior, where `sarvanāma` words lose their status in the specified compounds but retain it otherwise.
- **`analyzeCompoundSarvaname`**: Validates the detailed analysis of compounds, showing which words are affected.
- **Edge Cases**: Handles `null`, `undefined`, and empty string inputs gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.30

# Run with coverage
npm test sutras/1.1.30 -- --coverage
```

## Technical Details

### Algorithm
1.  **`isTritiyasamasa`**: This function checks the `context` for explicit `compoundType` (e.g., `tritiyasamasa`, `instrumental_determinative`) or semantic indicators (`semanticRelation: 'instrumental'` or `'karana'`).
2.  **`loseSarvanameInTritiyasamasa`**: This function first verifies if the `word` is one of the `sarvādi` words (from `SanskritWordLists`). If it is, it then calls `isTritiyasamasa` with the provided `context` to determine if the compound is an instrumental determinative compound. If both conditions are met, it returns `true`.
3.  **`isSarvanama`**: This function acts as an override. It first checks if the `word` is a `sarvādi` word. If it is, it then calls `loseSarvanameInTritiyasamasa`. If `loseSarvanameInTritiyasamasa` returns `true`, then `isSarvanama` returns `false`; otherwise, it returns `true`.
4.  **`analyzeCompoundSarvaname`**: This function iterates through the `constituents` of a compound. For each constituent, it calls the `isSarvanama` function (which incorporates 1.1.30) to classify it.

### Performance
- **Time Complexity**: O(1) for individual word checks (string comparisons, array lookups). For compound analysis, it's O(N) where N is the number of constituents.
- **Space Complexity**: O(1) for individual checks; O(N) for compound analysis to store results.

### Edge Cases
- **Context Dependency**: The rule's application is heavily dependent on accurate `compoundType` or `semanticRelation` information in the `context`. Without this, the function cannot correctly identify `tṛtīyāsamāsa`.
- **Ambiguity**: The semantic inference of `tṛtīyāsamāsa` might be ambiguous without a full parser. Explicit `compoundType` is more reliable.

## Integration

### Related Sutras
- **Sutra 1.1.27 (सर्वादीनि सर्वनामानि)**: This sutra provides a specific exception to the general `sarvanāma` definition from 1.1.27.
- **Sutra 1.1.29 (न बहुव्रीहौ)** and **Sutra 1.1.31 (द्वन्द्वे च)**: These three sutras (1.1.29, 1.1.30, 1.1.31) collectively define contexts where `sarvanāma` status is negated in compounds.

### Used By
- Any module in the Panini engine that performs morphological analysis or declension of `sarvanāma` words, especially within compounds, will need to consult this sutra to determine their correct `sarvanāma` status.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.30
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and integrates with the broader `sarvanāma` analysis framework.
- **Test References**: Test cases are designed to validate the precise conditions under which `sarvanāma` words lose their status in instrumental determinative compounds.

---

*Generated from template: SUTRA_README_TEMPLATE.md*