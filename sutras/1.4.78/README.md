# Sutra 1.4.78: प्राध्वं बन्धने

## Overview

**Sanskrit Text**: `प्राध्वं बन्धने`
**Transliteration**: prādhvaṃ bandhane
**Translation**: The indeclinable word 'prādhvam' is always called 'gati' when used with the verb 'kṛ' in the sense of 'binding'.

## Purpose

This sutra specifies a mandatory ('nitya') 'gati' classification for the indeclinable word 'prādhvam' (प्राध्वं). When 'prādhvam' is used with the verb 'kṛ' (कृ) specifically to mean 'to bind' or 'to fasten', it must be treated as 'gati'.

## Implementation

### Function Signature
```javascript
function isGatiPradhvam(word, context) {
    // Implementation details
}
```

### Key Features
-   Identifies the word 'prādhvam'.
-   Checks for the verb 'kṛ'.
-   Verifies the semantic context for the meaning of 'binding'.
-   Returns a mandatory (non-optional) result.

### Dependencies
-   **Sanskrit Utils**: None.
-   **Shared Functions**: None.

## Usage Examples

### Basic Usage
```javascript
import { isGatiPradhvam } from './index.js';

// Example 1: 'prādhvam' with 'kṛ' in the sense of binding
const result1 = isGatiPradhvam('prādhvaṅkṛtya', { verb: 'kṛ', meaning: 'binding' });
console.log(result1); // Expected output: { applies: true, optional: false }
```

### Advanced Usage
```javascript
// Example with a different meaning
const result2 = isGatiPradhvam('prādhvaṅkṛtya', { verb: 'kṛ', meaning: 'sending' });
console.log(result2); // Expected output: { applies: false }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 50+ tests covering:
-   Positive cases for 'prādhvam' with 'kṛ' and the meaning 'binding'.
-   Negative cases where the meaning is not 'binding'.
-   Negative cases with a different verb.
-   Tests for both IAST and Devanagari scripts.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.78

# Run with coverage
npm test sutras/1.4.78 -- --coverage
```

## Technical Details

### Algorithm
1.  Check if the input word contains 'prādhvam'.
2.  Verify from the context that the verb is 'kṛ'.
3.  Verify from the context that the meaning is 'binding' (bandhane).
4.  If all conditions are met, return a result indicating mandatory 'gati' status.

### Performance
-   **Time Complexity**: O(1).
-   **Space Complexity**: O(1).

### Edge Cases
-   The verb is 'kṛ', but the meaning is not 'binding'.
-   The word is 'prādhvam', but the verb is not 'kṛ'.
-   Missing context.

## Integration

### Related Sutras
-   This sutra is another example of a `nitya` (mandatory) 'gati' rule with a specific semantic condition.

### Used By
-   Grammatical engines.

## References

-   **Panini's Ashtadhyayi**: Sutra 1.4.78
-   **Implementation Notes**: The context must be precise about the meaning of 'binding'.
-   **Test References**: Standard grammatical examples.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
