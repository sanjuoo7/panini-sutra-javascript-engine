# Sutra 1.1.63: न लुमताऽङ्गस्य

## Overview

**Sanskrit Text**: `न लुमताऽङ्गस्य`
**Transliteration**: `na lumatā'ṅgasya`
**Translation**: "Of the base (`aṅga`), whose affix has been elided by the use of the three words containing `lu` (i.e., `luk`, `ślu`, `lup`), the operations dependant on it do not take place, regarding such base."

## Purpose

This sutra is a `paribhāṣā` (meta-rule) that functions as a `pratiṣedha` (prohibition or exception) to the principle of `pratyayalakṣaṇam` established in Sutra 1.1.62. It states that when an affix is elided by a term containing `lu` (which are `luk`, `ślu`, and `lup` as defined in 1.1.61), the grammatical effects of that affix do *not* transfer to the base (`aṅga`).

In essence, this rule "turns off" the "memory" of the elided affix for operations that affect the base, but only for `luk`, `ślu`, and `lup` elisions.

## Implementation

### Function Signature
```javascript
/**
 * Determines if a grammatical operation on the base (aṅga) should be blocked.
 *
 * @param {string} elisionType - The type of elision that occurred.
 * @returns {boolean} - True if the aṅga operation should be blocked.
 */
export function shouldBlockAngaOperation(elisionType)
```

### Key Features
- Acts as a check to prevent `pratyayalakṣaṇam`.
- Leverages the `isLukSluLup` function from Sutra 1.1.61 to identify the specific elision types.
- Returns `true` if an operation on the base should be blocked.

### Dependencies
- **Sutra 1.1.61 (`pratyayasya lukślulupaḥ`)**: This implementation directly imports and uses the `isLukSluLup` function.

## Usage Examples

### Basic Usage
```javascript
import { shouldBlockAngaOperation } from './index.js';

// If elision is 'luk', block the operation.
console.log(shouldBlockAngaOperation('luk')); // true

// If elision is 'lopa', do not block the operation.
console.log(shouldBlockAngaOperation('lopa')); // false
```

### Conceptual Integration
```javascript
// A conceptual grammar engine's logic
function applyAffixOperation(base, elidedAffix, elisionType) {
  let augmentedBase = { ...base };

  // Check if pratyayalakṣaṇam is blocked by 1.1.63
  if (!shouldBlockAngaOperation(elisionType)) {
    // If not blocked, apply pratyayalakṣaṇam (1.1.62)
    augmentedBase = applyPratyayalakshanam(base, elidedAffix);
  }

  // ... proceed with other operations on augmentedBase
  return augmentedBase;
}
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 8 tests covering:
- Positive cases for `luk`, `ślu`, and `lup`, which should be blocked.
- Negative cases for `lopa`, which should not be blocked.
- Edge cases for invalid inputs.
- A conceptual integration test demonstrating the interaction with Sutra 1.1.62.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.63

# Run with coverage
npm test sutras/1.1.63 -- --coverage
```

## Technical Details

### Algorithm
The function directly calls `isLukSluLup` from Sutra 1.1.61 and returns its result. This makes the implementation simple, modular, and directly tied to the definition it depends on.

### Performance
- **Time Complexity**: O(1), as it relies on the O(1) complexity of the `isLukSluLup` function.
- **Space Complexity**: O(1).

## Integration

### Related Sutras
- **1.1.61 (`pratyayasya lukślulupaḥ`)**: Provides the definitions of `luk`, `ślu`, and `lup` that this sutra relies on.
- **1.1.62 (`pratyayalope pratyayalakṣaṇam`)**: This sutra is a direct exception to the principle established in 1.1.62.

### Used By
- A core grammar engine would use this function as a guard clause before applying `pratyayalakṣaṇam` during the derivational process.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.63

---

*Generated from template: SUTRA_README_TEMPLATE.md*
