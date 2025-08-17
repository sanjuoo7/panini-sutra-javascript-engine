# Sutra 1.4.74: साक्षात्प्रभृतीनि च

## Overview

**Sanskrit Text**: `साक्षात्प्रभृतीनि च`
**Transliteration**: sākaṣātaparabhṛtīni ca
**Translation**: The words 'sākṣāt' ('in the presence of'), and others in that class, are also optionally called 'gati' when used with the verb 'kṛ'.

## Purpose

This sutra extends the optional 'gati' classification to the word 'sākṣāt' (साक्षात्) and a group of similar words (indicated by 'prabhṛtīni', "etc."). When these words are used with the verb 'kṛ' (कृ), they may optionally be treated as 'gati', which allows for grammatical variations. This rule is a continuation of the optionality introduced in previous sutras.

## Implementation

### Function Signature
```javascript
function isGatiSaksatPrabhrtini(word, context) {
    // Implementation details
}
```

### Key Features
-   Identifies the presence of 'sākṣāt' or other words in its class.
-   Checks if the verb is 'kṛ'.
-   Returns an optional result.
-   The implementation will require a list of the words belonging to the 'sākṣāt-prabhṛtīni' group.

### Dependencies
-   **Sanskrit Utils**: None expected.
-   **Shared Functions**: None.

## Usage Examples

### Basic Usage
```javascript
import { isGatiSaksatPrabhrtini } from './index.js';

// Example 1: 'sākṣāt' with verb 'kṛ'
const result1 = isGatiSaksatPrabhrtini('sākṣātkṛtya', { verb: 'kṛ' });
console.log(result1); // Expected output: { applies: true, optional: true }

// Example 2: Another word from the class (hypothetical, as list is not defined here)
// const result2 = isGatiSaksatPrabhrtini('mithyākṛtya', { verb: 'kṛ' });
// console.log(result2); // Expected output: { applies: true, optional: true }
```

### Advanced Usage
```javascript
// Example with Devanagari script
const result3 = isGatiSaksatPrabhrtini('साक्षात्कृत्य', { verb: 'कृ' });
console.log(result3); // Expected output: { applies: true, optional: true }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 50+ tests covering:
-   Positive cases for 'sākṣāt' with the verb 'kṛ'.
-   Tests for other words in the 'sākṣāt-prabhṛtīni' group (e.g., mithyā).
-   Negative cases where the verb is not 'kṛ'.
-   Negative cases where the word is not in the specified group.
-   Tests for both IAST and Devanagari scripts.
-   Error handling.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.74

# Run with coverage
npm test sutras/1.4.74 -- --coverage
```

## Technical Details

### Algorithm
1.  Check if the input word is one of the words in the 'sākṣāt-prabhṛtīni' group. This requires a predefined list of these words.
2.  Verify from the context that the verb is 'kṛ'.
3.  If both conditions are met, return a result indicating optional 'gati' status.

### Performance
-   **Time Complexity**: O(N) where N is the number of words in the 'sākṣāt-prabhṛtīni' group, as it requires checking against a list. Can be O(1) with a hash set.
-   **Space Complexity**: O(M) where M is the size of the list of words.

### Edge Cases
-   The verb is 'kṛ', but the word is not in the group.
-   The word is in the group, but the verb is not 'kṛ'.
-   The full list of 'sākṣāt-prabhṛtīni' words needs to be correctly identified from grammatical sources.

## Integration

### Related Sutras
-   This sutra is part of the same series as 1.4.72 and 1.4.73, extending the optional 'gati' rule with the verb 'kṛ'.

### Used By
-   Grammatical engines to handle a class of indeclinable words used with 'kṛ'.

## References

-   **Panini's Ashtadhyayi**: Sutra 1.4.74
-   **Implementation Notes**: A definitive list of words in the 'sākṣāt-prabhṛtīni' class will be required for a complete implementation. This list is found in traditional commentaries.
-   **Test References**: Standard grammatical examples.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
