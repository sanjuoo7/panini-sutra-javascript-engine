# Sutra 1.1.4: न धातुलोप आर्धधातुके

## Overview

**Sanskrit Text**: `न धातुलोप आर्धधातुके`
**Transliteration**: na dhātulopa ārdhadhātuke
**Translation**: There is no dhātu-lopa (root elision) before ārdhadhātuka affixes.

## Purpose

This `niyama` (restrictive rule) sutra is crucial for controlling the application of `guṇa` and `vṛddhi` transformations. It states that `guṇa` or `vṛddhi` (vowel strengthening) should **not** occur when an `ārdhadhātuka` (half-verbal) affix is applied to a verbal root (`dhātu`) and this application causes `dhātu-lopa` (elision or significant change in the root). Essentially, if the root undergoes a specific type of internal modification or loss due to the `ārdhadhātuka` affix, the expected `guṇa` or `vṛddhi` is blocked. This prevents over-application of vowel strengthening rules and ensures correct word formation.

## Implementation

### Function Signature
```javascript
function applySutra114(dhatu, affix, operation) {
    // Implementation details
}
```

### Key Features
- **`Ārdhadhātuka` Affix Identification**: The `isArdhadhatuka` function (and its underlying `analyzeAffixClassification`) accurately identifies `ārdhadhātuka` affixes, which are a prerequisite for this rule.
- **`Dhātu-lopa` Detection**: The `causesDhatuLopa` function (and its underlying `analyzeDhatuLopa`) uses a sophisticated feature-based phonological and morphological analysis to determine if a root undergoes `dhātu-lopa` when combined with an affix.
- **Blocking Logic**: The `shouldBlockGunaVrddhi` function (and its underlying `analyzeGunaVrddhinisedha`) combines the `ārdhadhātuka` and `dhātu-lopa` conditions to determine if `guṇa` or `vṛddhi` should be blocked.
- **Confidence Scoring**: The system provides a confidence score for its blocking decisions, reflecting the certainty of the analysis.
- **Rule-based System**: The implementation relies on a robust rule-based engine, minimizing hardcoded exceptions and allowing for more general applicability.

### Dependencies
- **Sanskrit Utils**:
  - `isConsonant`, `isVowel` from `classification.js`
  - `validateSanskritWord` from `validation.js`
  - `countSyllables`, `hasConsonantCluster`, `isMonosyllabic`, `hasCanonicalCVCStructure` from `syllable-analysis.js`
  - `logisticConfidence` from `confidence-scoring.js`
  - `calculateNasalElisionProbability`, `calculateLiquidModificationProbability`, `analyzePhoneticEnvironment`, `extractNucleusVowel`, `extractConsonantPattern` from `phonological-analysis.js`
  - `analyzeMorphologicalFunction` from `morphology.js`
  - `LOPA_PENALTY_RULES`, `PHONOLOGICAL_FEATURES`, `MORPHOLOGICAL_CONDITIONS`, `ENHANCED_LOPA_RULES` from `data-config.js`

### Usage Examples

### Basic Usage
```javascript
import { applySutra114, isArdhadhatuka, causesDhatuLopa, shouldBlockGunaVrddhi, analyzeDhatuAffixCombination, validateSutra114Conditions } from './index.js';

// Example 1: Apply Sutra 1.1.4 to a common case (gam + ya)
const result1 = applySutra114('gam', 'ya', 'guna');
console.log(result1.blocked); // true (guṇa is blocked)
console.log(result1.confidence); // (high confidence)

// Example 2: Check if an affix is ārdhadhātuka
console.log(isArdhadhatuka('kta')); // true
console.log(isArdhadhatuka('ti')); // false

// Example 3: Check if a combination causes dhātu-lopa
console.log(causesDhatuLopa('han', 'kta')); // true
console.log(causesDhatuLopa('pac', 'ti')); // false

// Example 4: Determine if guṇa/vṛddhi should be blocked
console.log(shouldBlockGunaVrddhi('jan', 'ya', 'vrddhi')); // true
console.log(shouldBlockGunaVrddhi('bhū', 'ti', 'guna')); // false

// Example 5: Analyze a dhātu-affix combination comprehensively
const analysis = analyzeDhatuAffixCombination('vid', 'kta');
console.log(analysis.shouldBlockGuna); // true
console.log(analysis.affixClassification); // 'ārdhadhātuka'
console.log(analysis.lopaType); // 'systematic_dhatu_lopa'
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **Core Functionality**: Tests `isArdhadhatuka`, `causesDhatuLopa`, and `shouldBlockGunaVrddhi` with various `dhātu`-affix combinations.
- **Comprehensive Dhātu Examples**: Includes real Sanskrit `dhātu`-affix pairs that are expected to block or not block `guṇa`/`vṛddhi`.
- **Morphological Process Validation**: Tests complex morphological processes involving `dhātu-lopa`.
- **Advanced Sanskrit Word Analysis**: Validates the rule's application in more complex word formations.
- **Confidence Scoring**: Tests the accuracy and granularity of confidence scores for various scenarios.
- **Edge Cases**: Handles `null`, `undefined`, and empty string inputs gracefully.
- **Consistency**: Ensures consistent results across multiple function calls.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.4

# Run with coverage
npm test sutras/1.1.4 -- --coverage
```

## Technical Details

### Algorithm
1.  **`applySutra114`**: This is the main entry point. It orchestrates the analysis by calling `analyzeGunaVrddhinisedha` with the provided `dhātu`, `affix`, and `operation`.
2.  **`analyzeGunaVrddhinisedha`**: This function first classifies the `affix` (using `analyzeAffixClassification`) to determine if it's `ārdhadhātuka`. Then, it calls `analyzeDhatuLopa` to check for `dhātu-lopa`. If both conditions are met, it sets `shouldBlock` to `true` and calculates a confidence score based on the certainty of both conditions.
3.  **`analyzeDhatuLopa`**: This function determines `dhātu-lopa` based on a scoring system that evaluates various phonological and morphological factors (e.g., root structure, phonetic environment, cluster difficulty, presence of specific `kṛt` affixes). It also incorporates a penalty system for conditions that prevent `lopa`.
4.  **`analyzeAffixClassification`**: This function classifies affixes as `ārdhadhātuka`, `sārvadhātuka`, or `kit` based on explicit mappings, derivative patterns, and morphological function analysis.

### Performance
- **Time Complexity**: O(1) - Operations involve string comparisons, array/regex lookups, and feature analysis against fixed-size lists and patterns, resulting in constant time complexity.
- **Space Complexity**: O(1) - Memory usage is minimal and constant, as the lists and patterns are predefined constants.

### Edge Cases
- **Ambiguity**: The system is designed to handle complex and sometimes ambiguous cases by providing confidence scores, allowing downstream modules to make informed decisions.
- **Transitional Flags**: The implementation includes transitional flags (e.g., `useExplicitFallbackMappings`) to allow for gradual migration from hardcoded patterns to a fully rule-based system, ensuring backward compatibility during development.

## Integration

### Related Sutras
- **Sutra 1.1.1 (वृद्धिरादैच्)** and **Sutra 1.1.2 (अदेङ् गुणः)**: This sutra directly interacts with the `guṇa` and `vṛddhi` definitions by blocking their application under specific conditions.
- **Sutra 1.1.3 (इको गुणवृद्धी)**: This sutra specifies that `guṇa` and `vṛddhi` apply to `ik` vowels. Sutra 1.1.4 then provides an exception to this application.
- This rule is fundamental for the correct formation of verbal derivatives and participles in Sanskrit.

### Used By
- Any module in the Panini engine that performs `guṇa` or `vṛddhi` transformations on verbal roots, especially when `ārdhadhātuka` affixes are involved, will need to consult this sutra to ensure that transformations are correctly blocked when `dhātu-lopa` occurs.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.4
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and leverages shared `sanskrit-utils` for robust phonological and morphological analysis.
- **Test References**: Test cases are designed to validate the precise conditions under which `guṇa` and `vṛddhi` are blocked, covering a wide range of `dhātu`-affix combinations and morphological contexts.

---

*Generated from template: SUTRA_README_TEMPLATE.md*