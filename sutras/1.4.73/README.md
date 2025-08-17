# Sutra 1.4.73: उपाजेऽन्वाजे

## Overview

**Sanskrit Text**: `उपाजेऽन्वाजे`
**Transliteration**: upāje'navāje
**Translation**: The words 'upāje' and 'anavāje', both meaning 'supporting or assisting the weak', are optionally called 'gati' when used along with the verb 'kṛ'.

## Purpose

This sutra specifies that the words 'upāje' (उपाजे) and 'anavāje' (अन्वाजे) are optionally classified as 'gati' (गति) when they are used with the verb 'kṛ' (कृ) and carry the meaning of 'supporting or assisting the weak'. This optionality allows for grammatical variations.

## Implementation

### Function Signature
```javascript
function isGatiUpajeAnavaje(word, context) {
    // Implementation details
}
```

### Key Features
-   Identifies the presence of 'upāje' or 'anavāje'.
-   Checks if the verb is 'kṛ'.
-   Verifies the semantic context for the meaning of 'supporting the weak'.
-   Returns an optional result.

### Dependencies
-   **Sanskrit Utils**: None expected.
-   **Shared Functions**: None.

## Usage Examples

### Basic Usage
```javascript
import { isGatiUpajeAnavaje } from './index.js';

// Example 1: 'upāje' with verb 'kṛ' and correct meaning
const result1 = isGatiUpajeAnavaje('upājekṛtya', { verb: 'kṛ', meaning: 'supporting the weak' });
console.log(result1); // Expected output: { applies: true, optional: true }

// Example 2: 'anavāje' with verb 'kṛ' and correct meaning
const result2 = isGatiUpajeAnavaje('anavājekṛtya', { verb: 'kṛ', meaning: 'supporting the weak' });
console.log(result2); // Expected output: { applies: true, optional: true }
```

### Advanced Usage
```javascript
// Example with Devanagari script
const result3 = isGatiUpajeAnavaje('उपाजेकृत्य', { verb: 'कृ', meaning: 'supporting the weak' });
console.log(result3); // Expected output: { applies: true, optional: true }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 50+ tests covering:
-   Positive cases for both 'upāje' and 'anavāje' with 'kṛ' and the correct meaning.
-   Negative cases with a different verb.
-   Negative cases with a different meaning.
-   Tests for both IAST and Devanagari scripts.
-   Error handling.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.73

# Run with coverage
npm test sutras/1.4.73 -- --coverage
```

## Technical Details

### Algorithm
1.  Check if the input string contains 'upāje', 'anavāje', or their Devanagari equivalents.
2.  Verify from the context that the verb is 'kṛ'.
3.  Confirm from the context that the meaning is 'supporting or assisting the weak'.
4.  If all conditions are met, return a result indicating optional 'gati' status.

### Performance
-   **Time Complexity**: O(1).
-   **Space Complexity**: O(1).

### Edge Cases
-   The verb is 'kṛ', but the meaning is different.
-   The input word is not 'upāje' or 'anavāje'.
-   Missing context.

## Integration

### Related Sutras
-   **1.4.72 (vibhāṣā kṛñi)**: This sutra is part of a series of rules providing optional 'gati' status for certain words when used with the verb 'kṛ'.

### Used By
-   Grammatical engines for generating variant forms.

## References

-   **Panini's Ashtadhyayi**: Sutra 1.4.73
-   **Implementation Notes**: The function will need to handle two different keywords.
-   **Test References**: Standard grammatical examples.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
