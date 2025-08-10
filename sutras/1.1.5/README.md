# Sutra 1.1.5: क्क्ङिति च

## Overview

**Sanskrit Text**: `क्क्ङिति च`
**Transliteration**: kakaṅiti ca
**Translation**: And that, which otherwise would have caused guṇa or vṛddhi, does not do so, when it has an indicatory क्, ग्, ङ्.

## Purpose

This `niyama` (restrictive rule) sutra is fundamental for controlling vowel gradation in Sanskrit. It states that `guṇa` (गुण) or `vṛddhi` (वृद्धि) transformations are **blocked** when the affix being added to a verbal root (`dhātu`) or nominal stem is marked with an indicatory letter (`it-marker`) `k` (क्), `g` (ग्), or `ṅ` (ङ्). These it-markers signal that the affix is `kit` (क्-इत्), `git` (ग्-इत्), or `ṅit` (ङ्-इत्), and their presence prevents the vowel strengthening that would otherwise occur. This rule is crucial for correctly forming past participles, certain nominal derivatives, and feminine forms.

## Implementation

### Function Signature
```javascript
function shouldBlockDueToItMarkers(dhatu, affix, operation) {
    // Implementation details
}
```

### Key Features
- **It-marker Identification**: Functions `hasKitMarker`, `hasGitMarker`, `hasNgitMarker`, and `hasKitGitNgitMarkers` accurately identify affixes marked with `k`, `g`, or `ṅ` it-markers.
- **Blocking Logic**: The `shouldBlockDueToItMarkers` function determines if `guṇa` or `vṛddhi` transformations should be blocked based on the presence of these it-markers in the affix.
- **Detailed Analysis**: The `analyzeItMarkers` function provides a comprehensive breakdown of an affix's it-markers and their blocking effects.
- **Dual Script Support**: All functions support both IAST and Devanagari scripts for affixes, ensuring consistent behavior.
- **Optimized Performance**: Utilizes pre-computed sets for it-marked affixes, allowing for efficient O(1) lookups.

### Dependencies
- **Sanskrit Utils**:
  - `detectScript`, `isDevanagari` from `script-detection.js`
  - `validateSanskritWord` from `validation.js`
  - `ItMarkedAffixes` from `constants.js` (for predefined lists of it-marked affixes)
  - `normalizeScript` from `transliteration.js`

### Usage Examples

### Basic Usage
```javascript
import { hasKitGitNgitMarkers, hasKitMarker, hasGitMarker, hasNgitMarker, shouldBlockDueToItMarkers, analyzeItMarkers, applySutra115, getItMarkerExamples } from './index.js';

// Example 1: Check for combined it-markers
console.log(hasKitGitNgitMarkers('kta')); // true
console.log(hasKitGitNgitMarkers('ti')); // false
console.log(hasKitGitNgitMarkers('ङीप्')); // true

// Example 2: Check for specific it-markers
console.log(hasKitMarker('kta')); // true
console.log(hasGitMarker('घञ्')); // true
console.log(hasNgitMarker('ङीप्')); // true

// Example 3: Determine if guṇa/vṛddhi should be blocked
console.log(shouldBlockDueToItMarkers('कृ', 'कत्', 'guna')); // true (blocks guṇa)
console.log(shouldBlockDueToItMarkers('भू', 'ति', 'guna')); // false (does not block)

// Example 4: Analyze an affix for it-markers
const analysis = analyzeItMarkers('ङीप्');
console.log(analysis.hasItMarkers); // true
console.log(analysis.blocksGunaVrddhi); // true
console.log(analysis.markerTypes); // ['ङ् (ṅ)']

// Example 5: Apply Sutra 1.1.5 comprehensively
const sutraResult = applySutra115('कृ', 'कत्', 'guna');
console.log(sutraResult.blocks); // true
console.log(sutraResult.reason); // Detailed explanation
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **It-marker Identification**: Tests `hasKitMarker`, `hasGitMarker`, `hasNgitMarker`, and `hasKitGitNgitMarkers` with a wide range of real Sanskrit affixes in both IAST and Devanagari.
- **Blocking Logic**: Verifies `shouldBlockDueToItMarkers` with various `dhātu`-affix combinations, covering both blocking and non-blocking scenarios for `guṇa` and `vṛddhi`.
- **Detailed Analysis**: Tests `analyzeItMarkers` for accurate reporting of it-markers and their effects.
- **Comprehensive Application**: Tests `applySutra115` for its overall behavior and detailed output.
- **Real Sanskrit Examples**: Includes tests with authentic Sanskrit word formations (e.g., past participles, agent nouns, feminine forms) to validate the rule's application.
- **Edge Cases**: Handles `null`, `undefined`, empty strings, and invalid inputs gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.5

# Run with coverage
npm test sutras/1.1.5 -- --coverage
```

## Technical Details

### Algorithm
1.  **It-marker Checkers (`hasKitMarker`, `hasGitMarker`, `hasNgitMarker`)**: These functions normalize the input `affix` to a consistent script (IAST) and then perform an efficient O(1) lookup in predefined `Set`s (`KIT_MARKED_AFFIXES`, `GIT_MARKED_AFFIXES`, `NGIT_MARKED_AFFIXES`) to determine the presence of the respective it-marker.
2.  **`hasKitGitNgitMarkers`**: This function simply calls the individual it-marker checkers and returns `true` if any of them are `true`.
3.  **`shouldBlockDueToItMarkers`**: This function first validates the `dhātu` and `affix`. It then calls `hasKitGitNgitMarkers` on the `affix`. If `true`, it indicates that `guṇa` or `vṛddhi` should be blocked.
4.  **`analyzeItMarkers`**: This function calls the individual it-marker checkers and aggregates their results into a detailed analysis object, including a reason for blocking or not blocking.
5.  **`applySutra115`**: This function orchestrates the application of the sutra by calling `analyzeItMarkers` and `shouldBlockDueToItMarkers` to provide a comprehensive result.

### Performance
- **Time Complexity**: O(1) - All core operations involve string normalization (which is typically fast for short affixes) and `Set` lookups, resulting in constant time complexity.
- **Space Complexity**: O(1) - Memory usage is minimal and constant, as the predefined sets of it-marked affixes are loaded once.

### Edge Cases
- **Invalid Inputs**: Functions are robust against `null`, `undefined`, or empty string inputs, returning `false` or appropriate error messages.
- **Mixed Scripts**: The `normalizeScript` utility ensures that affixes provided in either IAST or Devanagari are correctly recognized.

## Integration

### Related Sutras
- **Sutra 1.1.1 (वृद्धिरादैच्)** and **Sutra 1.1.2 (अदेङ् गुणः)**: This sutra directly interacts with the `guṇa` and `vṛddhi` definitions by blocking their application under specific conditions.
- **Sutra 1.1.3 (इको गुणवृद्धी)**: This sutra states that `guṇa`/`vṛddhi` apply to `ik` vowels. Sutra 1.1.5 then provides an exception to this application.
- This rule is fundamental for the correct formation of various nominal and verbal derivatives in Sanskrit, particularly those involving `kṛt` (primary) and `taddhita` (secondary) affixes.

### Used By
- Any module in the Panini engine that performs `guṇa` or `vṛddhi` transformations on verbal roots or nominal stems will need to consult this sutra to ensure that transformations are correctly blocked when `kit`, `git`, or `ṅit` affixes are present.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.5
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and leverages shared `sanskrit-utils` for robust script detection and affix classification.
- **Test References**: Test cases are designed to validate the precise identification of it-marked affixes and their role in blocking `guṇa`/`vṛddhi` transformations, covering a wide range of authentic Sanskrit examples.

---

*Generated from template: SUTRA_README_TEMPLATE.md*