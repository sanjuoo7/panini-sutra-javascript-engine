# Sutra 1.4.79: जीविकोपनिषदावौपम्ये

## Overview

**Sanskrit Text**: `जीविकोपनिषदावौपम्ये`
**Transliteration**: jīvikopaniṣadāvaupamaye
**Translation**: The words 'jīvikā' (livelihood) and 'upaniṣad' (secret doctrine) are called 'gati' when used with the verb 'kṛ' in the sense of 'likeness' or 'resemblance' (aupamye).

## Purpose

This sutra assigns the 'gati' status to the words 'jīvikā' (जीविका) and 'upaniṣad' (उपनिषद्) when they are used with the verb 'kṛ' (कृ) to imply 'likeness' or 'resemblance'. For example, 'jīvikām kṛtvā' would mean 'making it like a livelihood'.

## Implementation

### Function Signature
```javascript
function isGatiJivikaUpanisad(word, context) {
    // Implementation details
}
```

### Key Features
-   Identifies 'jīvikā' or 'upaniṣad'.
-   Checks for the verb 'kṛ'.
-   Verifies the semantic context for the meaning of 'likeness' or 'resemblance'.
-   Returns a mandatory result.

### Dependencies
-   **Sanskrit Utils**: None.
-   **Shared Functions**: None.

## Usage Examples

### Basic Usage
```javascript
import { isGatiJivikaUpanisad } from './index.js';

// Example 1: 'jīvikā' with 'kṛ' in the sense of likeness
const result1 = isGatiJivikaUpanisad('jīvikākṛtya', { verb: 'kṛ', meaning: 'likeness' });
console.log(result1); // Expected output: { applies: true, optional: false }

// Example 2: 'upaniṣad' with 'kṛ' in the sense of likeness
const result2 = isGatiJivikaUpanisad('upaniṣatkṛtya', { verb: 'kṛ', meaning: 'likeness' });
console.log(result2); // Expected output: { applies: true, optional: false }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 50+ tests covering:
-   Positive cases for 'jīvikā' and 'upaniṣad' with 'kṛ' and the meaning 'likeness'.
-   Negative cases where the meaning is different.
-   Negative cases with a different verb.
-   Tests for both IAST and Devanagari scripts.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.79

# Run with coverage
npm test sutras/1.4.79 -- --coverage
```

## Technical Details

### Algorithm
1.  Check if the input word contains 'jīvikā' or 'upaniṣad'.
2.  Verify from the context that the verb is 'kṛ'.
3.  Verify from the context that the meaning is 'likeness' (aupamye).
4.  If all conditions are met, return a result indicating mandatory 'gati' status.

### Performance
-   **Time Complexity**: O(1).
-   **Space Complexity**: O(1).

### Edge Cases
-   The verb is 'kṛ', but the meaning is not 'likeness'.
-   The word is one of the two, but the verb is not 'kṛ'.
-   Missing context.

## Integration

### Related Sutras
-   This sutra is the last in a series of rules that assign 'gati' status to various words under specific semantic conditions when used with the verb 'kṛ'.

### Used By
-   Grammatical engines.

## References

-   **Panini's Ashtadhyayi**: Sutra 1.4.79
-   **Implementation Notes**: The context must be precise about the meaning of 'likeness'.
-   **Test References**: Standard grammatical examples.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
