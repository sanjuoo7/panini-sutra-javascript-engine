# Sutra 1.1.60: अदर्शनं लोपः (adarśanaṃ lopaḥ)

## Overview

**Sanskrit Text**: `अदर्शनं लोपः`  
**Transliteration**: adarśanaṃ lopaḥ  
**Translation**: The substitution of a blank (लोप) signifies disappearance.

## Purpose

This sutra defines the grammatical term `lopa` (elision) as `adarśana` (non-perception or disappearance). It establishes the fundamental meaning of elision in Paninian grammar, which is not a physical removal but rather a non-manifestation or non-application of something that is grammatically present.

## Implementation

### Function Signature
```javascript
export function getLopaDefinition() { /* ... */ }
export function isLopa(action) { /* ... */ }
```

### Key Features
- Provides a direct definition of `lopa`.
- Offers a conceptual `isLopa` function to check if an action or state represents disappearance/non-perception.

### Dependencies
- **Sanskrit Utils**: None directly used, as this is a foundational definitional sutra.

## Usage Examples

### Basic Usage
```javascript
import { getLopaDefinition, isLopa } from './index.js';

// Get the definition of lopa
const definition = getLopaDefinition();
console.log(definition); // "Lopa (elision) signifies disappearance or non-perception."

// Check if a conceptual disappearance is lopa
const isNullLopa = isLopa(null);
console.log(isNullLopa); // true

const isUndefinedLopa = isLopa(undefined);
console.log(isUndefinedLopa); // true

const isStringLopa = isLopa("something");
console.log(isStringLopa); // false
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 9 tests covering:
- Correct definition return.
- Positive and negative conceptual checks for `isLopa`.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.60

# Run with coverage
npm test sutras/1.1.60 --coverage
```

## Technical Details

### Algorithm
- `getLopaDefinition`: Simply returns a predefined string.
- `isLopa`: Checks if the input is `null` or `undefined`, representing a conceptual disappearance.

### Performance
- **Time Complexity**: O(1) for both functions.
- **Space Complexity**: O(1) for both functions.
- **Optimization Notes**: No specific optimizations are required due to the simplicity of the functions.

### Edge Cases
- `isLopa` handles `null` and `undefined` as direct representations of `adarśana`.

## Integration

### Related Sutras
- This sutra provides the fundamental definition for any other sutra that refers to `lopa` (elision).

### Used By
- Many other sutras implicitly use the concept of `lopa`.

## References

- **Panini's Ashtadhyayi**: 1.1.60
- **Implementation Notes**: This sutra is a `saṃjñā` (definition) sutra, establishing a core concept rather than prescribing a transformation.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
