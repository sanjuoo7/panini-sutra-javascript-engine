# Sutra 1.4.72: विभाषा कृञि

## Overview

**Sanskrit Text**: `विभाषा कृञि`
**Transliteration**: vibhāṣā kṛñi
**Translation**: The word तिरस्, in the sense of 'disappearance', is optionally called गति when the verb कृ follows.

## Purpose

This sutra provides an optional rule (vibhāṣā) for the word 'tiras' (तिरस्). When 'tiras' is used with the verb 'kṛ' (कृ) and signifies 'disappearance', it can optionally be classified as a 'gati' (गति). This means that the grammatical operations that apply to 'gati' may or may not be applied in this specific context, allowing for variation in the final form.

## Implementation

### Function Signature
```javascript
function isGatiTirasOptionalWithKr(word, context) {
    // Implementation details
}
```

### Key Features
-   Identifies the presence of the word 'tiras'.
-   Checks if the verb is 'kṛ'.
-   Verifies the semantic context for the meaning of 'disappearance'.
-   Returns an optional or probabilistic result.

### Dependencies
-   **Sanskrit Utils**: None expected.
-   **Shared Functions**: This sutra's logic is dependent on the output of 1.4.71.

## Usage Examples

### Basic Usage
```javascript
import { isGatiTirasOptionalWithKr } from './index.js';

// Example 1: 'tiras' with verb 'kṛ' and meaning 'disappearance'
const result1 = isGatiTirasOptionalWithKr('tiraskṛtya', { verb: 'kṛ', meaning: 'disappearance' });
console.log(result1); // Expected output: { applies: true, optional: true }

// Example 2: 'tiras' with a different verb
const result2 = isGatiTirasOptionalWithKr('tirobhūya', { verb: 'bhū', meaning: 'disappearance' });
console.log(result2); // Expected output: { applies: false } - this sutra is specific to 'kṛ'
```

### Advanced Usage
```javascript
// Example with Devanagari script
const result3 = isGatiTirasOptionalWithKr('तिरस्कृत्य', { verb: 'कृ', meaning: 'disappearance' });
console.log(result3); // Expected output: { applies: true, optional: true }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 50+ tests covering:
-   Positive cases where 'tiras' is used with 'kṛ' and means 'disappearance'.
-   Negative cases where the verb is not 'kṛ'.
-   Negative cases where the meaning is not 'disappearance'.
-   Tests for both IAST and Devanagari scripts.
-   Error handling for invalid or incomplete context.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.72

# Run with coverage
npm test sutras/1.4.72 -- --coverage
```

## Technical Details

### Algorithm
1.  Check if the input string contains 'tiras'.
2.  Verify from the context that the associated verb is 'kṛ'.
3.  Confirm from the context that the meaning is 'disappearance'.
4.  If all conditions are met, return a result indicating that the 'gati' classification is optional.

### Performance
-   **Time Complexity**: O(1).
-   **Space Complexity**: O(1).
-   **Optimization Notes**: This is a simple rule and should be very performant.

### Edge Cases
-   The verb is 'kṛ', but the meaning is different (e.g., 'reproach').
-   The context is missing the verb or the meaning.
-   The input word doesn't contain 'tiras'.

## Integration

### Related Sutras
-   **1.4.71 (tiro'nataradadhau)**: This sutra provides the general rule for 'tiras' being a 'gati'. This sutra (1.4.72) is an exception/option to that rule.

### Used By
-   This sutra's output would be used by grammatical engines to generate alternative valid forms of words where 'tiras' and 'kṛ' are combined.

## References

-   **Panini's Ashtadhyayi**: Sutra 1.4.72
-   **Implementation Notes**: The optionality can be represented by a specific flag in the result object.
-   **Test References**: Based on standard grammatical examples illustrating the optionality.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
