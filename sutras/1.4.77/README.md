# Sutra 1.4.77: नित्यं हस्ते पाणावुपयमने

## Overview

**Sanskrit Text**: `नित्यं हस्ते पाणावुपयमने`
**Transliteration**: nityaṃ haste pāṇāvupayamane
**Translation**: The words 'haste' and 'pāṇau' (both meaning 'in the hand') are always (nityam) called 'gati' when used with the verb 'kṛ' in the sense of 'marriage' (upayamane).

## Purpose

This sutra specifies a mandatory ('nitya') 'gati' classification for the words 'haste' (हस्ते) and 'pāṇau' (पाणौ). When these words are used with the verb 'kṛ' (कृ) specifically to mean 'to marry' (literally 'to take by the hand'), they must be treated as 'gati'. Unlike the previous sutras, this is not an optional rule.

## Implementation

### Function Signature
```javascript
function isGatiHastePanau(word, context) {
    // Implementation details
}
```

### Key Features
-   Identifies 'haste' or 'pāṇau'.
-   Checks for the verb 'kṛ'.
-   Verifies the semantic context for the meaning of 'marriage'.
-   Returns a mandatory (non-optional) result.

### Dependencies
-   **Sanskrit Utils**: None.
-   **Shared Functions**: None.

## Usage Examples

### Basic Usage
```javascript
import { isGatiHastePanau } from './index.js';

// Example 1: 'haste' with 'kṛ' in the sense of marriage
const result1 = isGatiHastePanau('hastekṛtya kanyām', { verb: 'kṛ', meaning: 'marriage' });
console.log(result1); // Expected output: { applies: true, optional: false }

// Example 2: 'pāṇau' with 'kṛ' in the sense of marriage
const result2 = isGatiHastePanau('pāṇaukṛtya kanyām', { verb: 'kṛ', meaning: 'marriage' });
console.log(result2); // Expected output: { applies: true, optional: false }
```

### Advanced Usage
```javascript
// Example with a different meaning
const result3 = isGatiHastePanau('hastekṛtya dhanam', { verb: 'kṛ', meaning: 'taking money' });
console.log(result3); // Expected output: { applies: false }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 50+ tests covering:
-   Positive cases for 'haste' and 'pāṇau' with 'kṛ' and the meaning 'marriage'.
-   Negative cases where the meaning is not 'marriage'.
-   Negative cases with a different verb.
-   Tests for both IAST and Devanagari scripts.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.77

# Run with coverage
npm test sutras/1.4.77 -- --coverage
```

## Technical Details

### Algorithm
1.  Check if the input word contains 'haste' or 'pāṇau'.
2.  Verify from the context that the verb is 'kṛ'.
3.  Verify from the context that the meaning is 'marriage' (upayamane).
4.  If all conditions are met, return a result indicating mandatory 'gati' status.

### Performance
-   **Time Complexity**: O(1).
-   **Space Complexity**: O(1).

### Edge Cases
-   The verb is 'kṛ', but the meaning is not 'marriage'.
-   The word is 'haste' or 'pāṇau', but the verb is not 'kṛ'.
-   Missing context.

## Integration

### Related Sutras
-   This sutra provides a `nitya` (mandatory) rule, which contrasts with the `vibhāṣā` (optional) rules in the preceding sutras.

### Used By
-   Grammatical engines to enforce the correct 'gati' status in the context of marriage.

## References

-   **Panini's Ashtadhyayi**: Sutra 1.4.77
-   **Implementation Notes**: The key is to correctly identify the semantic context of 'marriage'.
-   **Test References**: Based on examples of marriage ceremonies in classical texts.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
