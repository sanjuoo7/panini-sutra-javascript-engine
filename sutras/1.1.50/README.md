# Sutra 1.1.50: स्थानेऽन्तरतमः

## Overview

**Sanskrit Text**: `स्थानेऽन्तरतमः`
**Transliteration**: sthāne'ntaratamaḥ
**Translation**: When a common term is obtained as a substitute, the likest of its significates to that in the place of which it comes, is the actual substitute.

## Purpose

This `paribhāṣā` (meta-rule) sutra is crucial for determining the most appropriate substitute (`ādeśa`) when multiple options are grammatically possible. It states that among the potential substitutes, the one that is "most similar" (`antaratama`) to the original element (`sthānin`) should be chosen. Similarity can be based on various factors such as place of articulation, effort, quantity (short/long), or other shared properties. This ensures the most phonetically and grammatically natural substitution.

## Implementation

### Function Signature
```javascript
function selectMostSimilarSubstitute(sthānin, potentialAdeshas) {
    // Implementation details
}
```

### Key Features
- Compares `sthānin` (original element) with `ādeśa` (potential substitutes) for similarity.
- Determines the "most similar" substitute based on defined criteria (e.g., phonetic properties).
- Selects the single best substitute from a list of possibilities.

### Dependencies
- **Sanskrit Utils**: Requires utilities for analyzing phonetic properties of sounds (e.g., place of articulation, effort).
- **Shared Functions**: Potentially depends on functions that manage phoneme data and comparison logic.

## Usage Examples

### Basic Usage
```javascript
import { selectMostSimilarSubstitute } from './index.js';

// Example 1: Selecting a substitute based on place of articulation
const sthanin1 = { sound: 'इ', properties: ['palatal', 'short'] };
const potentialAdeshas1 = [
    { sound: 'य्', properties: ['palatal', 'semivowel'] },
    { sound: 'व्', properties: ['labial', 'semivowel'] }
];
const result1 = selectMostSimilarSubstitute(sthanin1, potentialAdeshas1);
console.log(result1); // Expected output: { sound: 'य्', properties: ['palatal', 'semivowel'] } (because 'इ' and 'य्' are both palatal)

// Example 2: Selecting a substitute based on quantity
const sthanin2 = { sound: 'अ', properties: ['short'] };
const potentialAdeshas2 = [
    { sound: 'आ', properties: ['long'] },
    { sound: 'इ', properties: ['short'] }
];
const result2 = selectMostSimilarSubstitute(sthanin2, potentialAdeshas2);
console.log(result2); // Expected output: { sound: 'इ', properties: ['short'] } (assuming 'अ' and 'इ' are similar in some context, and 'इ' matches 'short')
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: Comprehensive tests covering:
- Various scenarios where multiple substitutes are possible, and the most similar one needs to be chosen.
- Different criteria for similarity (e.g., place, effort, quantity).
- Edge cases with no suitable substitute or equally similar substitutes.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.50

# Run with coverage
npm test sutras/1.1.50 --coverage
```

## Technical Details

### Algorithm
The function will implement a comparison algorithm that evaluates the similarity between the `sthānin` and each `ādeśa` in the `potentialAdeshas` list. This comparison will involve checking shared phonetic features (e.g., `tulya-āsya-prayatna` - same place and effort of articulation, as defined by other sutras). The `ādeśa` with the highest similarity score (or the first one if multiple are equally similar) will be selected.

### Performance
- **Time Complexity**: O(n) - Linear with respect to the number of `potentialAdeshas`.
- **Space Complexity**: O(1) - Minimal memory usage beyond input storage.
- **Optimization Notes**: Efficient comparison of phonetic properties is crucial.

### Edge Cases
- No `potentialAdeshas` provided.
- All `potentialAdeshas` are equally similar or dissimilar.
- Complex phonetic properties requiring detailed comparison.

## Integration

### Related Sutras
- **Sutra 1.1.49 (षष्ठी स्थानेयोगा)**: This sutra identifies the `sthānin` (the element to be replaced), and 1.1.50 then determines the best `ādeśa` (substitute) for that `sthānin`. These two sutras work hand-in-hand.
- Other `saṃjñā` (definition) sutras that define phonetic properties (e.g., `tulyāsya-prayatnaṃ savarṇam` - 1.1.9) will be used by this sutra to determine similarity.

### Used By
- Any part of the Panini engine that performs substitutions (`ādeśa`) will rely on this sutra to ensure the correct and most appropriate substitute is chosen.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.50
- **Implementation Notes**: Adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md`.
- **Test References**: Test cases will be based on classic examples from Sanskrit grammar where the principle of `antaratama` is applied.

---

*Generated from template: SUTRA_README_TEMPLATE.md*