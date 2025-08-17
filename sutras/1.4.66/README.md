# Sutra 1.4.66: कणेमनसी श्रद्धाप्रतीघाते

## Overview

**Sanskrit Text**: `कणेमनसी श्रद्धाप्रतीघाते`
**Transliteration**: kaṇemanasī śaradadhāparatīghāte
**Translation**: The words कणे and मनस् are गति when in composition with a verb and used in the sense of 'reaction by satiation'.

## Purpose

This sutra assigns the term 'gati' (preverb) to the words 'kaṇe' and 'manas' under the specific semantic condition of 'śraddhāpratīghāta' (reaction by satiation, often implying disrespect to an offering of food). When a word is classified as a 'gati', it can form a compound with the following verb.

## Implementation

### Function Signature
```javascript
function applySutra1_4_66(word, context) {
    // Implementation details
}
```

### Key Features
- Identifies the presence of "kaṇe" or "manas" in a given input.
- Checks the context for the semantic condition of 'śraddhāpratīghāta'.
- Returns a boolean indicating if the sutra applies.

### Dependencies
- **Sanskrit Utils**: None identified yet.
- **Shared Functions**: None identified yet.

## Usage Examples

### Basic Usage
```javascript
import applySutra1_4_66 from './index.js';

// Example 1: 'kaṇe' with the required semantic context
const result1 = applySutra1_4_66('kaṇehanoti', { semanticContext: 'śraddhāpratīghāta' });
console.log(result1); // Expected output: { applies: true, word: 'kaṇehanoti' }

// Example 2: 'manas' with the required semantic context
const result2 = applySutra1_4_66('manaḥkaroti', { semanticContext: 'śraddhāpratīghāta' });
console.log(result2); // Expected output: { applies: true, word: 'manaḥkaroti' }
```

### Advanced Usage
```javascript
// Example without the required semantic context
const result3 = applySutra1_4_66('kaṇehanoti', { semanticContext: 'other' });
console.log(result3); // Expected output: { applies: false }

// Example with a different word
const result4 = applySutra1_4_66('anyaword', { semanticContext: 'śraddhāpratīghāta' });
console.log(result4); // Expected output: { applies: false }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 50+ tests covering:
- Positive cases for 'kaṇe' and 'manas' in both IAST and Devanagari.
- Negative cases where the words are present but the semantic condition is not met.
- Negative cases for other words.
- Edge cases like empty strings or invalid inputs.
- Integration checks to ensure no unintended side-effects.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.66

# Run with coverage
npm test sutras/1.4.66 --coverage
```

## Technical Details

### Algorithm
The function will check if the input string starts with 'kaṇe' or 'manas' (or their Devanagari equivalents). It will then check the provided `context` object for the `semanticContext` property being equal to 'śraddhāpratīghāta'. If both conditions are met, the sutra applies.

### Performance
- **Time Complexity**: O(1), as it involves simple string and object property checks.
- **Space Complexity**: O(1).
- **Optimization Notes**: The implementation should be a straightforward check.

### Edge Cases
- Input is not a string or is empty.
- The `context` object is missing or does not have the `semanticContext` property.
- The input contains the words but not at the beginning.

## Integration

### Related Sutras
- **1.4.60 (gatiśca)**: This sutra is part of the section defining what constitutes a 'gati'.

### Used By
- This sutra's output would be used by higher-level logic that handles compound formation (samāsa).

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.66
- **Implementation Notes**: Based on the standard interpretation of the sutra.
- **Test References**: Test cases are derived from the sutra's meaning and examples from commentaries.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
