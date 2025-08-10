# Sutra 1.1.45: इगुपधाच्च धातोः

## Overview

**Sanskrit Text**: `इगुपधाच्च धातोः`
**Transliteration**: igupadhāc-ca dhātoḥ
**Translation**: And from a root whose penultimate (upadha) is an ik sound.

## Purpose

This `vidhi` (rule) sutra is fundamental to understanding vowel gradation (`guṇa` and `vṛddhi`) in Sanskrit verbal roots. It states that `guṇa` (the first grade of vowel strengthening) is applied to a verbal root (`dhātu`) if its `upadhā` (उपधा, penultimate sound) is an `ik` vowel (इक्: `i`, `u`, `ṛ`, `ḷ`, and their long counterparts `ī`, `ū`, `ṝ`, `ḹ`). This rule is crucial for correctly deriving various verb forms and nominal derivatives, as it specifies a key condition for vowel strengthening.

## Implementation

### Function Signature
```javascript
function applySutra1_1_45(word, context) {
    // Implementation details
}
```

### Key Features
- **`Dhātu` Identification**: The `applySutra1_1_45` function identifies verbal roots and extracts their structure, including handling common verbal suffixes to get to the base root.
- **`Upadhā` Analysis**: The `analyzeUpadha` function accurately determines the penultimate sound of a root. It includes special handling for roots ending in an `ik` vowel, where that final `ik` vowel is considered the `upadhā` for gradation purposes.
- **`Ik` Vowel Check**: The `analyzeIkSound` function verifies if a given sound is an `ik` vowel, which is the core condition for this sutra.
- **`Guṇa` Applicability**: The sutra asserts that `guṇa` gradation is applicable to roots meeting these criteria.
- **Vowel Gradation Analysis**: Functions like `analyzeVowelGradation`, `getGunaForm`, and `getVriddhiForm` provide detailed information about the `guṇa` and `vṛddhi` forms of `ik` vowels.

### Dependencies
- **Sanskrit Utils**:
  - `SanskritWordLists` from `sanskrit-utils/constants.js` (for `ik` vowels, `guṇa`/`vṛddhi` maps, verbal suffixes, and known `dhātus`)

### Usage Examples

### Basic Usage
```javascript
import { applySutra1_1_45, analyzeRootStructure, analyzeUpadha, analyzeIkSound, analyzeVowelGradation, getGunaForm, getVriddhiForm, validateIkUpadha, testSutra1_1_45 } from './index.js';

// Example 1: Apply Sutra 1.1.45 to a root with ik upadhā
const result1 = applySutra1_1_45('kṛ', { is_dhatu: true });
console.log(result1.applies); // true
console.log(result1.has_ik_upadha); // true
console.log(result1.upadha); // 'ṛ'
console.log(result1.guna_applicable); // true

// Example 2: Analyze upadhā of a root
const upadhaAnalysis = analyzeUpadha('ci', { root: 'ci' });
console.log(upadhaAnalysis.upadha); // 'i'
console.log(upadhaAnalysis.position); // 'final_ik_as_upadha'

// Example 3: Check if a sound is an ik vowel
console.log(analyzeIkSound('u').is_ik); // true
console.log(analyzeIkSound('a').is_ik); // false

// Example 4: Get guṇa and vṛddhi forms
console.log(getGunaForm('i')); // 'e'
console.log(getVriddhiForm('ṛ')); // 'ār'

// Example 5: Analyze vowel gradation for a root
const gradationAnalysis = analyzeVowelGradation('yu', { root: 'yu' });
console.log(gradationAnalysis.has_gradation); // true
console.log(gradationAnalysis.guna_form); // 'o'
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **`applySutra1_1_45`**: Verifies the core logic for identifying `dhātus` with `ik` `upadhā` and asserting `guṇa` applicability.
- **`analyzeRootStructure`**: Tests the extraction of verbal roots from various forms.
- **`analyzeUpadha`**: Tests the accurate determination of the `upadhā` sound, including special cases for final `ik` vowels.
- **`analyzeIkSound`**: Tests the identification of all `ik` vowels and their `guṇa`/`vṛddhi` forms.
- **`analyzeVowelGradation`**: Validates the analysis of vowel gradation patterns for `ik`-`upadhā` roots.
- **`validateIkUpadha`**: Confirms the accuracy of the validation results, confidence scores, and grammatical properties.
- **Real Sanskrit Examples**: Includes tests with classical `dhātus` like `kṛ`, `ci`, `yu`, `śru`, `bhṛ`, `smṛ`.
- **Edge Cases**: Handles `null`, `undefined`, empty strings, non-`dhātu` words, and roots without `ik` `upadhā` gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.45

# Run with coverage
npm test sutras/1.1.45 -- --coverage
```

## Technical Details

### Algorithm
1.  **`applySutra1_1_45`**: This function first checks if the `word` is a `dhātu` (using `isLikelyDhatu`). If so, it calls `analyzeRootStructure` to get the base root. Then, it calls `analyzeUpadha` to find the `upadhā` sound. Finally, it calls `analyzeIkSound` to determine if the `upadhā` is an `ik` vowel. If all conditions are met, it asserts `guṇa` applicability.
2.  **`analyzeRootStructure`**: This function extracts the base root by removing common verbal suffixes. It can also use a `root` provided in the `context`.
3.  **`analyzeUpadha`**: This function extracts individual sounds from the root. It then determines the penultimate sound. Crucially, if the final sound of the root is an `ik` vowel, that `ik` vowel is considered the `upadhā` for the purpose of this sutra.
4.  **`analyzeIkSound`**: This function checks if a given `sound` is present in a predefined list of `ik` vowels (`SanskritWordLists.ikVowels`) and provides its `guṇa` and `vṛddhi` forms based on `gunaMap` and `vriddhiMap`.

### Performance
- **Time Complexity**: O(L) where L is the length of the word for sound extraction, but practically O(1) due to the short length of typical roots. Other operations are constant time.
- **Space Complexity**: O(L) for storing sounds, but practically O(1).

### Edge Cases
- **Monosyllabic Roots**: The `analyzeUpadha` function has special handling for monosyllabic roots ending in an `ik` vowel, treating that vowel as the `upadhā`.
- **Root Identification**: `isLikelyDhatu` uses a simplified approach. A full `dhātu` list and morphological parser would provide more robust identification.

## Integration

### Related Sutras
- **Sutra 1.1.1 (वृद्धिरादैच्)** and **Sutra 1.1.2 (अदेङ् गुणः)**: These sutras define `vṛddhi` and `guṇa`. Sutra 1.1.45 specifies a condition for `guṇa` application.
- **Sutra 1.1.3 (इको गुणवृद्धी)**: This sutra states that `guṇa`/`vṛddhi` apply to `ik` vowels. Sutra 1.1.45 specifies a condition for `guṇa` application to `ik` vowels in the `upadhā` of a `dhātu`.
- This rule is fundamental for the correct derivation of verb forms and nominal derivatives in Sanskrit, particularly those involving vowel gradation.

### Used By
- Any module in the Panini engine that performs `guṇa` or `vṛddhi` transformations on verbal roots, especially during verb conjugation or nominal derivation, will need to consult this sutra to determine if `guṇa` is applicable based on the `ik` `upadhā`.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.45
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and leverages shared `sanskrit-utils` for robust phonological and morphological analysis.
- **Test References**: Test cases are designed to validate the precise identification of `ik`-`upadhā` roots and the applicability of `guṇa`, covering various `ik` vowels and root structures.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
