# Sutra 1.4.76: मध्येपदेनिवचने च

## Overview

**Sanskrit Text**: `मध्येपदेनिवचने च`
**Transliteration**: madhayepadenivacane ca
**Translation**: And the words 'madhye' (in the middle), 'pade' (in the foot), and 'nivacane' (speechless) are optionally called 'gati' when used with the verb 'kṛ', provided it is not in the sense of 'placing'.

## Purpose

This sutra extends the optional 'gati' classification to three more words: 'madhye' (मध्ये), 'pade' (पदे), and 'nivacane' (निवचने). When any of these words are used with the verb 'kṛ' (कृ), they can be optionally treated as 'gati', under the same condition of 'anatyādhāna' (not meaning 'placing') carried forward from the previous sutra.

## Implementation

### Function Signature
```javascript
function isGatiMadhyePadeNivacane(word, context) {
    // Implementation details
}
```

### Key Features
-   Identifies 'madhye', 'pade', or 'nivacane'.
-   Checks for the verb 'kṛ'.
-   Ensures the meaning is not 'placing'.
-   Returns an optional result.

### Dependencies
-   **Sanskrit Utils**: None.
-   **Shared Functions**: None.

## Usage Examples

### Basic Usage
```javascript
import { isGatiMadhyePadeNivacane } from './index.js';

// Example 1: 'madhye' with 'kṛ'
const result1 = isGatiMadhyePadeNivacane('madhyekṛtya', { verb: 'kṛ', meaning: 'interrupting' });
console.log(result1); // Expected output: { applies: true, optional: true }

// Example 2: 'pade' with 'kṛ'
const result2 = isGatiMadhyePadeNivacane('padekṛtya', { verb: 'kṛ', meaning: 'stumbling' });
console.log(result2); // Expected output: { applies: true, optional: true }

// Example 3: 'nivacane' with 'kṛ'
const result3 = isGatiMadhyePadeNivacane('nivacanekṛtya', { verb: 'kṛ', meaning: 'silencing' });
console.log(result3); // Expected output: { applies: true, optional: true }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 50+ tests covering:
-   Positive cases for all three words ('madhye', 'pade', 'nivacane') with 'kṛ' and a meaning other than 'placing'.
-   Negative cases where the meaning IS 'placing'.
-   Negative cases with a different verb.
-   Tests for both IAST and Devanagari scripts.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.76

# Run with coverage
npm test sutras/1.4.76 -- --coverage
```

## Technical Details

### Algorithm
1.  Check if the input word contains 'madhye', 'pade', or 'nivacane'.
2.  Verify from the context that the verb is 'kṛ'.
3.  Verify from the context that the meaning is NOT 'placing'.
4.  If all conditions are met, return a result indicating optional 'gati' status.

### Performance
-   **Time Complexity**: O(1).
-   **Space Complexity**: O(1).

### Edge Cases
-   The verb is 'kṛ', but the meaning is 'placing'.
-   The word is one of the three, but the verb is not 'kṛ'.
-   Missing context.

## Integration

### Related Sutras
-   **1.4.75 (anatayādhāna urasimanasī)**: This sutra establishes the 'anatyādhāna' condition that is carried forward to this sutra.

### Used By
-   Grammatical engines.

## References

-   **Panini's Ashtadhyayi**: Sutra 1.4.76
-   **Implementation Notes**: The function will need to handle three different keywords and the negative semantic condition.
-   **Test References**: Standard grammatical examples.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
