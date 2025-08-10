# Sutra 1.1.66: तस्मिन्निति निर्दिष्टे पूर्वस्य

## Overview

**Sanskrit Text**: `तस्मिन्निति निर्दिष्टे पूर्वस्य`
**Transliteration**: `tasminniti nirdiṣṭe pūrvasya`
**Translation**: "When a term is exhibited in the seventh case (locative) in these sūtras, the operation directed is to be understood as affecting the state of what immediately precedes that which the term denotes."

## Purpose

This sutra is a `paribhāṣā` (a meta-rule or governing principle) that provides a fundamental rule for interpreting the context of all other sutras in the Aṣṭādhyāyī. It defines how to determine the target of a grammatical operation when a condition is specified using the locative case (saptamī vibhakti).

The rule states: When a sutra gives a condition in the form "when [Y] is present..." (where Y is in the locative case), the grammatical change should be applied to the element that comes **immediately before** [Y].

A classic example is Sutra 6.1.77 `iko yaṇ aci`.
- `aci` ("when a vowel follows") is in the locative case.
- Therefore, the operation (`ik` becomes `yaṇ`) applies to the `ik` vowel that immediately precedes the `ac` vowel.

## Implementation

### Function Signature
```javascript
/**
 * Conceptually finds the target of an operation based on a locative context.
 *
 * @param {Object} context - The current grammatical context.
 * @param {string} locativeTerm - The element specified in the locative case.
 * @returns {Object|null} The element immediately preceding the `locativeTerm`.
 */
export function getPrecedingElement(context, locativeTerm)
```

### Key Features
- Conceptually demonstrates the locative case context rule.
- Identifies the element immediately preceding a given contextual term.
- Handles edge cases where the term is not found or is the first element.

### Dependencies
- None.

## Usage Examples

### Basic Usage
```javascript
import { getPrecedingElement } from './index.js';

// Simulating the context for "iko yaṇ aci"
const context = {
  elements: ['i', 'a', 'b'] // i (ik) is followed by a (ac)
};
const locativeTerm = 'a'; // The 'ac' vowel

// The operation should apply to the element before 'a'
const target = getPrecedingElement(context, locativeTerm);

console.log(target); // 'i'
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 6 tests covering:
- A conceptual application based on a real sutra (`iko yaṇ aci`).
- Correct identification of the preceding element in a sequence.
- Handling of non-string elements.
- Edge cases such as the term being at the beginning of the sequence or not being found.
- Invalid inputs.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.66

# Run with coverage
npm test sutras/1.1.66 -- --coverage
```

## Technical Details

### Algorithm
The function is a conceptual representation. It takes a `context` object containing an array of `elements` and a `locativeTerm`. It finds the index of the `locativeTerm` and returns the element at the preceding index (`index - 1`).

### Performance
- **Time Complexity**: O(N) due to `indexOf` searching for the term in the array.
- **Space Complexity**: O(1).

## Integration

### Related Sutras
- **1.1.67 (`tasmādityuttarasya`)**: This is the companion rule for the ablative case, which specifies that the operation applies to the element *following* the term.
- This principle is fundamental and governs the interpretation of hundreds of sutras.

### Used By
- This principle would be at the core of a Pāṇinian grammar engine's rule application logic, used to determine the `sthānī` (the substituend) in a contextual operation.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.66

---

*Generated from template: SUTRA_README_TEMPLATE.md*
