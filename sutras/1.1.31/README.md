# Sutra 1.1.31: द्वन्द्वे च

## Overview

**Sanskrit Text**: `द्वन्द्वे च`
**Transliteration**: dvandve ca
**Translation**: And in Collective Compound -- दिङ्नामान्यन्तराले 2.2.26, the words सर्व etc. are not सर्वनाम.

## Purpose

This `saṃjñā` (definition) sutra introduces another context where `sarvanāma` (pronoun) words lose their `sarvanāma` status. It states that words like `sarva` (सर्व), `viśva` (विश्व), etc., are **not** classified as `sarvanāma` when they occur within a `dvandva` (copulative or collective) compound. This rule ensures that such words behave like regular nouns in these specific compound structures, affecting their declension and grammatical properties.

## Implementation

### Function Signature
```javascript
function loseSarvanameInDvandva(word, context) {
    // Implementation details
}
```

### Key Features
- **`Dvandva` Identification**: The `isDvandva` function identifies `dvandva` compounds based on explicit `compoundType` in the context, semantic relations (coordination, copulative, collective), or the presence of typical `dvandva` markers like `ca` (च) or `vā` (वा).
- **`Sarvanāma` Negation**: The `loseSarvanameInDvandva` function determines if a `sarvanāma` word loses its pronominal status within such a compound.
- **Integrated Classification**: The `isSarvanama` function (exported from this module) incorporates this rule, returning `false` for `sarvanāma` words in `dvandva` contexts.
- **Pattern Analysis**: The `analyzeDvandvaPatterns` function provides insights into the structure of `dvandva` compounds (e.g., simple, iterative, alternative) and their semantic groups.
- **Combined Exceptions Analysis**: The `analyzeCombinedSarvanameExceptions` function integrates this rule with the `tṛtīyāsamāsa` exception (from 1.1.30) for a comprehensive compound analysis.
- **Dual Script Support**: All functions handle both IAST and Devanagari representations.

### Dependencies
- **Sanskrit Utils**:
  - `detectScript` from `sanskrit-utils/index.js`
  - `SanskritWordLists` from `sanskrit-utils/constants.js` (for the list of `sarvādi` words)

### Usage Examples

### Basic Usage
```javascript
import { isDvandva, loseSarvanameInDvandva, isSarvanama, analyzeDvandvaSarvaname, analyzeDvandvaPatterns, getDvandvaExamples } from './index.js';

// Example 1: Check for dvandva compound
const context1 = { compoundType: 'dvandva' };
console.log(isDvandva('sarvānya', context1)); // true
console.log(isDvandva('विश्वच', {})); // true (contains 'च')

// Example 2: Check if sarvanāma status is lost
console.log(loseSarvanameInDvandva('sarva', context1)); // true
console.log(loseSarvanameInDvandva('rāma', context1)); // false (not a sarvanāma word)

// Example 3: Integrated isSarvanama check
console.log(isSarvanama('sarva', context1)); // false (status lost)
console.log(isSarvanama('sarva', { compoundType: 'tatpurusha' })); // true (status retained)

// Example 4: Analyze dvandva patterns
const patternAnalysis = analyzeDvandvaPatterns('mātāpitā', ['mātā', 'pitā']);
console.log(patternAnalysis.pattern); // 'simple'
console.log(patternAnalysis.semanticGroup); // 'kinship'

// Example 5: Get dvandva examples
console.log(getDvandvaExamples('Devanagari').simpleCoordinative); // ['सर्वान्य', 'विश्वउभ', ...]
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **`isDvandva`**: Verifies correct identification of `dvandva` compounds based on various contextual cues and markers.
- **`loseSarvanameInDvandva`**: Tests the negation of `sarvanāma` status for relevant words in `dvandva` compounds.
- **`isSarvanama`**: Confirms the integrated behavior, where `sarvanāma` words lose their status in `dvandva` compounds but retain it otherwise.
- **`analyzeDvandvaSarvaname`**: Validates the detailed analysis of compounds, showing which words are affected.
- **`analyzeDvandvaPatterns`**: Tests the identification of different `dvandva` patterns and semantic groups.
- **`analyzeCombinedSarvanameExceptions`**: Confirms the integration of this rule with 1.1.30 for comprehensive compound analysis.
- **Edge Cases**: Handles `null`, `undefined`, and empty string inputs gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.31

# Run with coverage
npm test sutras/1.1.31 -- --coverage
```

## Technical Details

### Algorithm
1.  **`isDvandva`**: This function checks the `context` for explicit `compoundType` (e.g., `dvandva`, `copulative`, `collective`), `semanticRelation` (e.g., `coordination`), or the presence of common conjunctions (`ca`, `vā`) within the `compound` string.
2.  **`loseSarvanameInDvandva`**: This function first verifies if the `word` is one of the `sarvādi` words (from `SanskritWordLists`). If it is, it then calls `isDvandva` with the provided `context` to determine if the compound is a `dvandva`. If both conditions are met, it returns `true`.
3.  **`isSarvanama`**: This function acts as an override. It first checks if the `word` is a `sarvādi` word. If it is, it then calls `loseSarvanameInDvandva`. If `loseSarvanameInDvandva` returns `true`, then `isSarvanama` returns `false`; otherwise, it returns `true`.
4.  **`analyzeDvandvaPatterns`**: This function analyzes the `constituents` and `compound` string to identify patterns like iterative (`samāhāra`) or alternative (`itaretara`) `dvandva`, and attempts to infer semantic groups based on constituent words.
5.  **`analyzeCombinedSarvanameExceptions`**: This function integrates the logic of 1.1.30 and 1.1.31 to provide a unified analysis of `sarvanāma` status within compounds, indicating which exceptions apply.

### Performance
- **Time Complexity**: O(1) for individual word checks (string comparisons, array lookups). For compound analysis, it's O(N) where N is the number of constituents.
- **Space Complexity**: O(1) for individual checks; O(N) for compound analysis to store results.

### Edge Cases
- **Context Dependency**: The rule's application is heavily dependent on accurate `compoundType` or `semanticRelation` information in the `context`. Without this, the function cannot correctly identify `dvandva`.
- **Ambiguity**: The semantic inference of `dvandva` might be ambiguous without a full parser. Explicit `compoundType` is more reliable.

## Integration

### Related Sutras
- **Sutra 1.1.27 (सर्वादीनि सर्वनामानि)**: This sutra provides a specific exception to the general `sarvanāma` definition from 1.1.27.
- **Sutra 1.1.29 (न बहुव्रीहौ)** and **Sutra 1.1.30 (तृतीयासमासे)**: These three sutras (1.1.29, 1.1.30, 1.1.31) collectively define contexts where `sarvanāma` status is negated in compounds.

### Used By
- Any module in the Panini engine that performs morphological analysis or declension of `sarvanāma` words, especially within compounds, will need to consult this sutra to determine their correct `sarvanāma` status.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.31
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and integrates with the broader `sarvanāma` analysis framework.
- **Test References**: Test cases are designed to validate the precise conditions under which `sarvanāma` words lose their status in `dvandva` compounds.

---

*Generated from template: SUTRA_README_TEMPLATE.md*