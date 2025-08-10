# Sutra 1.1.16: सम्बुद्धौ शाकल्यस्येतावनार्षे

## Overview

**Sanskrit Text**: `सम्बुद्धौ शाकल्यस्येतावनार्षे`
**Transliteration**: sambuddhau śākalyasyetāvanārṣe
**Translation**: The final ओ of a vocative singular before the word इति according to Śākalya, in a secular or non-Vedic literature is a pragṛhya.

## Purpose

This `saṃjñā` (definition) sutra adds another specific condition for a word to be considered `pragṛhya`. It states that the final `o` (ओ) of a word in the vocative singular case, when immediately followed by the word `iti` (इति), is `pragṛhya`. This rule applies specifically in non-Vedic (secular) literature and is attributed to the grammarian Śākalya. This is crucial for correctly handling common vocative expressions in Sanskrit where Sandhi is to be avoided.

## Implementation

### Function Signature
```javascript
function isPragrhyaVocativeO(word, context) {
    // Implementation details
}
```

### Key Features
- **Vocative `O` Identification**: The `isPragrhyaVocativeO` function accurately identifies words that meet all the conditions: ending in `o` (ओ), being in the vocative singular case, being followed by `iti` (इति), and being in a non-Vedic context.
- **Context-Dependent Application**: This rule heavily relies on grammatical context (`grammaticalCase`, `nextWord`, `isVedic`) to ensure precise application.
- **Integrated `Pragṛhya` Check**: The `isPragrhya` function (exported from this module) now combines the rules from Sutras 1.1.11 through 1.1.16, providing an increasingly comprehensive check for `pragṛhya` status.

### Dependencies
- **Sanskrit Utils**:
  - `detectScript` from `sanskrit-utils/script-detection.js`
  - `isPragrhya` from `../1.1.15/index.js` (for base `pragṛhya` checks from previous sutra)

### Usage Examples

### Basic Usage
```javascript
import { isPragrhyaVocativeO, isPragrhya, hasPragrhyaBehavior } from './index.js';

// Example 1: Check for vocative 'o' before 'iti'
const context1 = { nextWord: 'iti', grammaticalCase: 'vocative', isVedic: false };
console.log(isPragrhyaVocativeO('rāmo', context1)); // true
console.log(isPragrhyaVocativeO('देवो', context1)); // true

// Example 2: Conditions not met
const context2 = { nextWord: 'gacchati', grammaticalCase: 'vocative', isVedic: false };
console.log(isPragrhyaVocativeO('rāmo', context2)); // false (not followed by iti)

const context3 = { nextWord: 'iti', grammaticalCase: 'nominative', isVedic: false };
console.log(isPragrhyaVocativeO('rāmo', context3)); // false (not vocative)

const context4 = { nextWord: 'iti', grammaticalCase: 'vocative', isVedic: true };
console.log(isPragrhyaVocativeO('rāmo', context4)); // false (Vedic context)

// Example 3: Combined pragṛhya check
console.log(isPragrhya('rāmo', context1)); // true
console.log(isPragrhya('aho', { isParticle: true })); // true (from 1.1.15)
console.log(isPragrhya('amī')); // true (from 1.1.12)

// Example 4: Check for pragṛhya behavior (implies sandhi prevention)
console.log(hasPragrhyaBehavior('putro', context1)); // true
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: The test suite provides comprehensive coverage, including:
- **Positive Cases**: Verifies correct identification of vocative singular `o`-ending words as `pragṛhya` when all conditions (followed by `iti`, vocative case, non-Vedic) are met.
- **Negative Cases**: Ensures that words failing any of the conditions (e.g., not vocative, not followed by `iti`, Vedic context, not ending in `o`) are correctly excluded.
- **Contextual Tests**: Confirms that the `grammaticalCase`, `nextWord`, and `isVedic` contexts are correctly utilized.
- **Integration**: Tests confirm that the `isPragrhya` function correctly combines the rules from Sutras 1.1.11 through 1.1.16.
- **Edge Cases**: Handles `null`, `undefined`, and empty string inputs gracefully.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.16

# Run with coverage
npm test sutras/1.1.16 -- --coverage
```

## Technical Details

### Algorithm
1.  The `isPragrhyaVocativeO` function first checks for the presence of the word and then extracts relevant context variables (`nextWord`, `grammaticalCase`, `isVedic`).
2.  It then applies a series of conditional checks: `isVedic` must be `false`, `grammaticalCase` must be `vocative`, `nextWord` must be `iti` (or `इति`), and the `word` must end in `o` (or `ो` in Devanagari).
3.  The `isPragrhya` function in this module acts as an aggregator. It first checks if the word is `pragṛhya` based on previous sutras (1.1.11-1.1.15). If not, it then applies the logic of 1.1.16.

### Performance
- **Time Complexity**: O(1) - Operations involve string checks and boolean logic, resulting in constant time complexity.
- **Space Complexity**: O(1) - Memory usage is minimal and constant.

### Edge Cases
- **Missing Context**: If crucial context (like `grammaticalCase` or `nextWord`) is missing, the function will return `false` as the conditions for this specific rule cannot be met.
- **Invalid Inputs**: Functions handle `null`, `undefined`, or empty string inputs by returning `false`.

## Integration

### Related Sutras
- **Sutras 1.1.11 through 1.1.15**: This sutra builds upon the `pragṛhya` definitions established by these preceding rules, adding a specific condition for vocative singular `o`-ending words.
- This rule is particularly relevant for the accurate parsing and generation of Sanskrit sentences, especially in literary contexts.

### Used By
- Any module performing Sandhi operations or grammatical analysis will need to consult the `isPragrhya` or `hasPragrhyaBehavior` functions to ensure that these specific vocative forms are not incorrectly subjected to Sandhi.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.16
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and integrates with the broader `pragṛhya` analysis framework.
- **Test References**: Test cases are designed to validate all conditions and exceptions of this specific `pragṛhya` rule.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
