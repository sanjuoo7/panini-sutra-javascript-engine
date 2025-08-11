# Sutra 1.1.67: तस्मादित्युत्तरस्य

## Overview

**Sanskrit Text**: `तस्मादित्युत्तरस्य`
**Transliteration**: `tasmādityuttarasya`
**Translation**: "An operation caused by the exhibition of a term in the Ablative 5th case is to be understood to enjoin the substitution of something in the room of that which immediately follows the word denoted by the term."

## Purpose

This sutra is a `paribhāṣā` (a meta-rule or governing principle) and is the direct companion to Sutra 1.1.66. It provides the second fundamental rule for interpreting the context of other sutras. It defines how to determine the target of a grammatical operation when a condition is specified using the ablative case (pañcamī vibhakti).

The rule states: When a sutra gives a condition in the form "after [X]..." (where X is in the ablative case), the grammatical change should be applied to the element that comes **immediately after** [X].

A classic example is Sutra 8.4.66 `udāttāt anudāttasya svaritaḥ`.
- `udāttāt` ("after an udātta vowel") is in the ablative case.
- Therefore, the operation (`anudātta` becomes `svarita`) applies to the `anudātta` vowel that immediately follows the `udātta` vowel.

## Implementation

### Function Signature
```javascript
/**
 * Conceptually finds the target of an operation based on an ablative context.
 *
 * @param {Object} context - The current grammatical context.
 * @param {string} ablativeTerm - The element specified in the ablative case.
 * @returns {Object|null} The element immediately following the `ablativeTerm`.
 */
export function getFollowingElement(context, ablativeTerm)
```

### Key Features
- Conceptually demonstrates the ablative case context rule.
- Identifies the element immediately following a given contextual term.
- Handles edge cases where the term is not found or is the last element.

### Dependencies
- None.

## Usage Examples

### Basic Usage
```javascript
import { getFollowingElement } from './index.js';

// Simulating the context for "udāttāt anudāttasya svaritaḥ"
const context = {
  elements: ['u', 'a', 'b'] // u (udātta) is followed by a (anudātta)
};
const ablativeTerm = 'u'; // The 'udātta' vowel

// The operation should apply to the element after 'u'
const target = getFollowingElement(context, ablativeTerm);

console.log(target); // 'a'
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 6 tests covering:
- A conceptual application based on a real sutra (`udāttāt anudāttasya svaritaḥ`).
- Correct identification of the following element in a sequence.
- Handling of non-string elements.
- Edge cases such as the term being at the end of the sequence or not being found.
- Invalid inputs.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.67

# Run with coverage
npm test sutras/1.1.67 -- --coverage
```

## Technical Details

### Algorithm
The function is a conceptual representation. It takes a `context` object containing an array of `elements` and an `ablativeTerm`. It finds the index of the `ablativeTerm` and returns the element at the next index (`index + 1`).

### Performance
- **Time Complexity**: O(N) due to `indexOf` searching for the term in the array.
- **Space Complexity**: O(1).

## Integration

### Related Sutras
- **1.1.66 (`tasminniti nirdiṣṭe pūrvasya`)**: This is the companion rule for the locative case, which specifies that the operation applies to the element *preceding* the term.
- This principle is fundamental and governs the interpretation of hundreds of sutras.

### Used By
- This principle would be at the core of a Pāṇinian grammar engine's rule application logic, used to determine the `nimitta` (the cause or condition) for an operation.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.67

---

*Generated from template: SUTRA_README_TEMPLATE.md*
