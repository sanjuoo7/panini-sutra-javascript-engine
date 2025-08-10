# Sutra 1.1.62: प्रत्ययलोपे प्रत्ययलक्षणम्

## Overview

**Sanskrit Text**: `प्रत्ययलोपे प्रत्ययलक्षणम्`
**Transliteration**: `pratyayalope pratyayalakṣaṇam`
**Translation**: "When elision of an affix has taken place (`lopa`), the affix still exerts its influence and the operations dependant upon it, take place as if it were present."

## Purpose

This sutra is a `paribhāṣā` (a meta-rule or governing principle) that is fundamental to the entire system of Panini's grammar. It establishes the principle of `pratyayalakṣaṇam` (the effect of an affix). This means that even if an affix (`pratyaya`) is deleted, any grammatical operations that were conditioned by that affix should still occur as if the affix were still there.

For example, if an affix with a `p` marker (a `pit` affix) is elided, any rule that requires a `pit` affix to cause `guṇa` vowel gradation will still apply to the base (`aṅga`).

## Implementation

### Function Signature
```javascript
/**
 * Conceptually applies the pratyayalakṣaṇam principle.
 *
 * @param {Object} base - The base form (aṅga).
 * @param {Object} elidedAffix - The elided affix, containing its properties.
 * @returns {Object} - The base, augmented with the properties of the elided affix.
 */
export function applyPratyayalakshanam(base, elidedAffix)
```

### Key Features
- Conceptually demonstrates the principle of `pratyayalakṣaṇam`.
- Merges the properties of an elided affix into the context of the base form.
- This allows other rules in a grammar engine to access the properties of the deleted affix.

### Dependencies
- None.

## Usage Examples

### Basic Usage
```javascript
import { applyPratyayalakshanam } from './index.js';

const base = {
  form: 'agni',
  context: {}
};

const elidedAffix = {
  form: 's', // The nominative singular affix, which is often elided.
  properties: {
    marker: 'sUP',
    case: 'nominative',
    number: 'singular'
  }
};

const augmentedBase = applyPratyayalakshanam(base, elidedAffix);

console.log(augmentedBase);
// {
//   form: 'agni',
//   context: {
//     elidedAffixProperties: {
//       marker: 'sUP',
//       case: 'nominative',
//       number: 'singular'
//     }
//   }
// }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 6 tests covering:
- Conceptual application of merging affix properties.
- A conceptual test for retaining a `pit` marker.
- Merging properties without overwriting existing context.
- Edge cases like null, undefined, and empty object inputs.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.62

# Run with coverage
npm test sutras/1.1.62 -- --coverage
```

## Technical Details

### Algorithm
The function is a conceptual representation. It takes a `base` object and an `elidedAffix` object. It then returns a new `base` object where the `context` property has been augmented with the `properties` of the `elidedAffix`. This is a simplified model of how a full grammar engine would handle this principle.

### Performance
- **Time Complexity**: O(1), as it involves a simple object spread operation.
- **Space Complexity**: O(1), creating a new object with a shallow copy.

## Integration

### Related Sutras
- **1.1.63 (`na lumatā'ṅgasya`)**: This is a direct exception to 1.1.62. It states that the principle of `pratyayalakṣaṇam` does *not* apply when the elision is caused by `luk`, `ślu`, or `lup`.
- This principle is fundamental and implicitly underlies the application of thousands of other sutras in the Ashtadhyayi.

### Used By
- This principle would be a core part of a Paninian grammar engine's derivation process, consulted by any rule that is conditioned by an affix that might have been elided.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.62

---

*Generated from template: SUTRA_README_TEMPLATE.md*
