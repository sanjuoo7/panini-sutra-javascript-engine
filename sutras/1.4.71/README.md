# Sutra 1.4.71: तिरोऽन्तर्द्धौ

## Overview

**Sanskrit Text**: `तिरोऽन्तर्द्धौ`
**Transliteration**: tiro'nataradadhau
**Translation**: The word तिरस् when used in the sense of 'disappearance' is called गति when in composition with a verb.

## Purpose

This sutra defines that the word 'tiras' (तिरस्), when it signifies 'disappearance' or 'concealment', is classified as a 'gati' (गति) when it is used in conjunction with a verb. This classification is important for sandhi (euphonic combination) and other grammatical operations.

## Implementation

### Function Signature
```javascript
function isGatiTiras(word, context) {
    // Implementation details
}
```

### Key Features
-   Identifies the presence of the word 'tiras'.
-   Checks the semantic context for the meaning of 'disappearance'.
-   Verifies that 'tiras' is used with a verb.

### Dependencies
-   **Sanskrit Utils**: None expected for this sutra, but may be used for transliteration or other text processing in a larger context.
-   **Shared Functions**: None.

## Usage Examples

### Basic Usage
```javascript
import { isGatiTiras } from './index.js';

// Example 1: 'tiras' used with a verb in the sense of disappearance
const result1 = isGatiTiras('tirobhūya', { verb: 'bhū' });
console.log(result1); // Expected output: true

// Example 2: 'tiras' used with a verb but not in the sense of disappearance
const result2 = isGatiTiras('tiraskṛtya', { verb: 'kṛ' });
console.log(result2); // This would be handled by 1.4.72, so this sutra might return false or delegate. For now, let's assume false.
```

### Advanced Usage
```javascript
// Example with Devanagari script
const result3 = isGatiTiras('तिरोभूय', { verb: 'भू' });
console.log(result3); // Expected output: true
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 50+ tests covering:
-   Positive cases where 'tiras' means disappearance and is with a verb.
-   Negative cases where 'tiras' has a different meaning.
-   Negative cases where 'tiras' is not used with a verb.
-   Cases with different verb conjugations.
-   Tests with both IAST and Devanagari scripts.
-   Error handling for invalid input.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.71

# Run with coverage
npm test sutras/1.4.71 -- --coverage
```

## Technical Details

### Algorithm
1.  Check if the input string contains 'tiras' or its Devanagari equivalent.
2.  Analyze the provided context to determine if the meaning is 'disappearance'.
3.  Confirm from the context that a verb is present.
4.  If all conditions are met, return true; otherwise, return false.

### Performance
-   **Time Complexity**: O(1) as it involves simple string and context checks.
-   **Space Complexity**: O(1).
-   **Optimization Notes**: The function should be lightweight as it's a simple classification rule.

### Edge Cases
-   Input string does not contain 'tiras'.
-   The context object is missing or incomplete.
-   The meaning of 'disappearance' is ambiguous.

## Integration

### Related Sutras
-   **1.4.60 (gatiśca)**: This sutra is part of the 'gati' section, and this sutra provides a specific condition for 'tiras' to be a 'gati'.
-   **1.4.72 (vibhāṣā kṛñi)**: This sutra provides an optional rule for 'tiras' when used with the verb 'kṛ'.

### Used By
-   This sutra's output would be consumed by sandhi rules and other higher-level grammatical processors that depend on the 'gati' classification.

## References

-   **Panini's Ashtadhyayi**: Sutra 1.4.71
-   **Implementation Notes**: Based on the standard interpretation of the sutra.
-   **Test References**: Test cases are derived from standard examples of Sanskrit grammar.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
