# Sutra 1.1.27: सर्वादीनि सर्वनामानि

## Overview

**Sanskrit Text**: `सर्वादीनि सर्वनामानि`
**Transliteration**: sarvādīni sarvanāmāni
**Translation**: The words सर्व 'all' and the rest are called सर्वनाम or pronouns.

## Purpose

This `saṃjñā` (definition) sutra introduces the technical term `sarvanāma` (सर्वनाम), which refers to pronouns and pronominal adjectives. It states that words beginning with `sarva` (सर्व, 'all') and the subsequent words listed in the `sarvādi` (सर्वादि) gaṇa (group) are classified as `sarvanāma`. This classification is fundamental because `sarvanāma` words undergo specific declension patterns and trigger various grammatical operations throughout Pāṇini's system, distinguishing them from regular nouns and adjectives.

## Implementation

### Function Signature
```javascript
function isSarvanama(word, context) {
    // Implementation details
}
```

### Key Features
- **`Sarvādi` Word Identification**: The `isSarvanama` function accurately identifies words belonging to the `sarvādi` group, which includes common pronouns (e.g., `tad`, `etad`, `idam`, `kim`, `yuṣmad`, `asmad`) and other pronominal adjectives (e.g., `anya`, `pūrva`, `dakṣiṇa`).
- **Dual Script Support**: All functions handle both IAST and Devanagari representations of `sarvanāma` words.
- **Inflected Form Recognition**: The implementation includes logic to recognize some common inflected forms of `sarvanāma` words, ensuring broader applicability.
- **`Sarvādi` Word Listing**: The `getSarvadiWords` function provides a comprehensive list of all words classified as `sarvanāma` by this sutra.

### Dependencies
- **Sanskrit Utils**:
  - `detectScript` from `sanskrit-utils/script-detection.js`

### Usage Examples

### Basic Usage
```javascript
import { isSarvanama, getSarvadiWords, hasSarvanamaBehavior } from './index.js';

// Example 1: Check if a word is a sarvanāma
console.log(isSarvanama('sarva')); // true
console.log(isSarvanama('तद्')); // true
console.log(isSarvanama('rāma')); // false

// Example 2: Check inflected forms
console.log(isSarvanama('sarvasya')); // true (genitive of sarva)
console.log(isSarvanama('तस्य')); // true (genitive of tad)

// Example 3: Get all sarvādi words
console.log(getSarvadiWords('IAST').slice(0, 5)); // ['sarva', 'viśva', 'ubha', 'ubhaya', 'ḍatara']
console.log(getSarvadiWords('Devanagari').slice(0, 5)); // ['सर्व', 'विश्व', 'उभ', 'उभय', 'डतर']

// Example 4: Check for sarvanāma behavior
console.log(hasSarvanamaBehavior('kim')); // true
console.log(hasSarvanamaBehavior('deva')); // false
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **`isSarvanama`**: Verifies correct identification of base `sarvādi` words and common inflected forms in both IAST and Devanagari.
- **`getSarvadiWords`**: Tests the retrieval of the complete `sarvādi` list.
- **`hasSarvanamaBehavior`**: Confirms that `sarvanāma` words exhibit `sarvanāma` behavior.
- **Negative Cases**: Ensures that regular nouns and non-`sarvādi` words are correctly excluded.
- **Edge Cases**: Handles `null`, `undefined`, and empty string inputs gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.27

# Run with coverage
npm test sutras/1.1.27 -- --coverage
```

## Technical Details

### Algorithm
1.  **`isSarvanama`**: This function first checks if the input `word` is a direct match in the predefined `SARVADI_WORDS` list for the detected script. It then attempts to recognize common inflected forms by stripping typical case endings or by checking if the word starts with a `sarvādi` base and matches known inflection patterns. This allows for a more robust identification beyond just the base forms.
2.  **`getSarvadiWords`**: This function simply returns the appropriate `SARVADI_WORDS` list based on the requested script.
3.  **`hasSarvanamaBehavior`**: This function acts as a wrapper for `isSarvanama`. It indicates that if a word is classified as `sarvanāma` by this sutra, it will generally exhibit `sarvanāma`-specific grammatical behaviors, subject to exceptions defined in later sutras.

### Performance
- **Time Complexity**: O(N) where N is the number of `sarvādi` words, but practically O(1) due to the limited and fixed size of the list. Operations involve string comparisons and array lookups.
- **Space Complexity**: O(1) - Memory usage is minimal and constant, as the `sarvādi` list is a predefined constant.

### Edge Cases
- **Inflection Complexity**: While some inflected forms are recognized, a comprehensive morphological parser would be needed for all possible inflections. This implementation focuses on common patterns.
- **Contextual Exceptions**: This sutra defines the general `sarvanāma` class. Later sutras (1.1.28-1.1.32) introduce exceptions where certain `sarvādi` words do *not* behave as `sarvanāma` under specific conditions (e.g., in certain compounds). The `hasSarvanamaBehavior` function acknowledges this by stating that its return is subject to later rules.

## Integration

### Related Sutras
- This `saṃjñā` (definition) sutra is foundational for all rules related to pronouns and pronominal adjectives. Subsequent sutras (1.1.28-1.1.32) introduce exceptions and optional behaviors for `sarvanāma` words in specific contexts.
- `sarvanāma` words have unique declension patterns (e.g., `7.1.14` - `sarvanāmnaḥ smāi`).

### Used By
- Any module in the Panini engine that deals with the declension of pronouns, pronominal substitution, or grammatical operations that specifically target `sarvanāma` words will need to consult these functions.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.27
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and leverages `sanskrit-utils` for script detection.
- **Test References**: Test cases are designed to validate the identification of `sarvādi` words and their common inflected forms as `sarvanāma`.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
