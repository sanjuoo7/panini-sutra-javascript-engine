# Sutra 1.1.6: दीधीवेवीटाम्

## Overview

**Sanskrit Text**: `दीधीवेवीटाम्`
**Transliteration**: dīdhīvevīṭām
**Translation**: The गुण and वृद्धि substitutions which otherwise would have presented themselves do not however come, in the place of the vowels of दिधि 'to shine' and वेवि 'to go', and of the augment called इट् ।

## Purpose

This sutra specifies exceptions to the application of `guṇa` (गुण) and `vṛddhi` (वृद्धि) transformations. It states that these vowel strengthening operations are blocked for the vowels of the roots `dīdhī` (दिधि - to shine) and `vevī` (वेवि - to go), and also for the augment `iṭ` (इट्). This rule is crucial for maintaining the correct phonetic forms of words derived from these specific roots and when the `iṭ` augment is present.

## Implementation

### Function Signature
```javascript
function sutra_1_1_6(state) {
    // Implementation details
}
```

### Key Features
- Identifies the roots `dīdhī` and `vevī`.
- Recognizes the `iṭ` augment.
- Blocks `guṇa` and `vṛddhi` application in specified contexts.

### Dependencies
- **Sanskrit Utils**: May require utilities for root identification and augment analysis.
- **Shared Functions**: Potentially depends on functions that manage the grammatical state and apply/block transformations.

## Usage Examples

### Basic Usage
```javascript
import { sutra_1_1_6 } from './index.js';

// Example 1: Blocking guṇa/vṛddhi for dīdhī
const state1 = { root: 'dīdhī', currentVowel: 'ī', operation: 'guṇa' };
const result1 = sutra_1_1_6(state1);
console.log(result1); // Expected output: state with guṇa/vṛddhi blocked

// Example 2: Blocking guṇa/vṛddhi for vevī
const state2 = { root: 'vevī', currentVowel: 'e', operation: 'vṛddhi' };
const result2 = sutra_1_1_6(state2);
console.log(result2); // Expected output: state with guṇa/vṛddhi blocked
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: Comprehensive tests covering:
- Positive cases where `guṇa`/`vṛddhi` should be blocked for `dīdhī`, `vevī`, and `iṭ`.
- Negative cases where `guṇa`/`vṛddhi` should apply (i.e., not `dīdhī`, `vevī`, or `iṭ`).
- Edge cases with various grammatical contexts.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.6

# Run with coverage
npm test sutras/1.1.6 --coverage
```

## Technical Details

### Algorithm
The function will likely check the current grammatical state, specifically the root and any augments present. If the root is `dīdhī` or `vevī`, or if the `iṭ` augment is involved, the function will signal that `guṇa` or `vṛddhi` transformations should not occur.

### Performance
- **Time Complexity**: O(1) - Expected to be constant time due to direct checks.
- **Space Complexity**: O(1) - Minimal memory usage.
- **Optimization Notes**: Direct comparisons for roots and augments ensure efficiency.

### Edge Cases
- Handling of different forms of `dīdhī` and `vevī`.
- Correct identification of the `iṭ` augment in various contexts.

## Integration

### Related Sutras
- **Sutra 1.1.1 (वृद्धिरादैच्)** and **Sutra 1.1.2 (अदेङ् गुणः)**: This sutra provides exceptions to the definitions of `guṇa` and `vṛddhi`.
- **Sutra 1.1.3 (इको गुणवृद्धी)**: This sutra defines where `guṇa`/`vṛddhi` apply, and 1.1.6 provides specific exceptions.

### Used By
- Any module in the Panini engine that applies `guṇa` or `vṛddhi` transformations will need to consult this sutra to ensure these transformations are correctly blocked for `dīdhī`, `vevī`, and `iṭ`.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.6
- **Implementation Notes**: Adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md`.
- **Test References**: Test cases will be derived from traditional Sanskrit grammar examples illustrating the application and non-application of this rule.

---

*Generated from template: SUTRA_README_TEMPLATE.md*