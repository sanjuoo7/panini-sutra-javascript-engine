# Sutra 1.4.75: अनत्याधान उरसिमनसी

## Overview

**Sanskrit Text**: `अनत्याधान उरसिमनसी`
**Transliteration**: anatayādhāna urasimanasī
**Translation**: The words 'urasi' (in the breast) and 'manasi' (in the mind) are optionally called 'gati' when used with the verb 'kṛ', provided it is not in the sense of 'placing' (anatyādhāna).

## Purpose

This sutra defines an optional 'gati' classification for the words 'urasi' (उरसि) and 'manasi' (मनसि) when they are used with the verb 'kṛ' (कृ). A crucial condition is that the action must not imply 'placing' or 'setting down' (anatyādhāna). For example, 'urasikṛtya' meaning 'having accepted' would be covered, but not if it meant 'having placed on the chest'.

## Implementation

### Function Signature
```javascript
function isGatiUrasiManasi(word, context) {
    // Implementation details
}
```

### Key Features
-   Identifies 'urasi' or 'manasi'.
-   Checks for the verb 'kṛ'.
-   Checks for the negative condition: the meaning is NOT 'placing'.
-   Returns an optional result.

### Dependencies
-   **Sanskrit Utils**: None.
-   **Shared Functions**: None.

## Usage Examples

### Basic Usage
```javascript
import { isGatiUrasiManasi } from './index.js';

// Example 1: 'urasi' with 'kṛ', not meaning 'placing'
const result1 = isGatiUrasiManasi('urasikṛtya', { verb: 'kṛ', meaning: 'accepting' });
console.log(result1); // Expected output: { applies: true, optional: true }

// Example 2: 'manasi' with 'kṛ', not meaning 'placing'
const result2 = isGatiUrasiManasi('manasikṛtya', { verb: 'kṛ', meaning: 'pondering' });
console.log(result2); // Expected output: { applies: true, optional: true }
```

### Advanced Usage
```javascript
// Example of the negative condition (anatyādhāna)
const result3 = isGatiUrasiManasi('urasikṛtya pāṇim', { verb: 'kṛ', meaning: 'placing' });
console.log(result3); // Expected output: { applies: false }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 50+ tests covering:
-   Positive cases for 'urasi' and 'manasi' with 'kṛ' and a meaning other than 'placing'.
-   Negative cases where the meaning IS 'placing'.
-   Negative cases where the verb is not 'kṛ'.
-   Tests for both IAST and Devanagari scripts.
-   Error handling.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.75

# Run with coverage
npm test sutras/1.4.75 -- --coverage
```

## Technical Details

### Algorithm
1.  Check if the input word contains 'urasi' or 'manasi'.
2.  Verify from the context that the verb is 'kṛ'.
3.  Verify from the context that the meaning is NOT 'placing'.
4.  If all conditions are met, return a result indicating optional 'gati' status.

### Performance
-   **Time Complexity**: O(1).
-   **Space Complexity**: O(1).

### Edge Cases
-   The verb is 'kṛ', but the meaning is 'placing'.
-   Ambiguous meaning in the context.
-   Missing context.

## Integration

### Related Sutras
-   This sutra continues the theme of optional 'gati' classification with the verb 'kṛ', but adds a negative semantic condition.

### Used By
-   Grammatical engines to correctly parse and generate forms involving 'urasi' and 'manasi'.

## References

-   **Panini's Ashtadhyayi**: Sutra 1.4.75
-   **Implementation Notes**: The context object will be crucial for determining the meaning.
-   **Test References**: Examples from commentaries illustrating the 'anatyādhāna' condition.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
