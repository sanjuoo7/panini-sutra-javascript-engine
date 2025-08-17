# Sutra 1.4.83: कर्मप्रवचनीयाः

## Overview

**Sanskrit Text**: `कर्मप्रवचनीयाः`
**Transliteration**: `karmapravacanīyāḥ`
**Translation**: The term 'karmapravacanīya' is to be used.

## Purpose

This sutra is a governing rule (`adhikāra sūtra`). It establishes the term `karmapravacanīya` and states that the particles and conditions defined in the subsequent sutras, up to 1.4.98, will be given this designation. A `karmapravacanīya` is a particle that governs the case of a noun, similar to a preposition, but is not a verb prefix (`upasarga`).

## Implementation

### Function Signature
```javascript
function sutra_1_4_83(context) {
    // Implementation details
}
```

### Key Features
- This is a definitional sutra, so its function might be to check if a given particle is within the scope of `karmapravacanīya` rules.
- It governs the block of sutras from 1.4.83 to 1.4.98.

### Dependencies
- None. This is a high-level governing rule.

## Usage Examples

### Basic Usage
```javascript
import { sutra_1_4_83 } from './index.js';

// This sutra doesn't perform an operation, but rather introduces a concept.
// A potential use could be to check if a rule falls under its governance.
const isKarmapravacaniyaRule = sutra_1_4_83({ rule: '1.4.84' });
// Expected: { applies: true, reason: "Rule 1.4.84 is governed by 1.4.83." }
console.log(isKarmapravacaniyaRule);

const isNotKarmapravacaniyaRule = sutra_1_4_83({ rule: '1.4.1' });
// Expected: { applies: false, reason: "Rule 1.4.1 is outside the scope of 1.4.83." }
console.log(isNotKarmapravacaniyaRule);
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 50 tests covering:
- Positive cases for all sutra numbers within its scope (1.4.84 to 1.4.98).
- Negative cases for sutra numbers outside its scope.
- Edge cases like providing non-sutra inputs.
- Error handling for invalid context.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.83

# Run with coverage
npm test sutras/1.4.83 --coverage
```

## Technical Details

### Algorithm
1. The function would take a context object, likely containing a sutra number.
2. It would parse the sutra number.
3. It checks if the number is within the range [1.4.84, 1.4.98].
4. If it is, the sutra's condition applies. Otherwise, it does not.

### Performance
- **Time Complexity**: O(1).
- **Space Complexity**: O(1).

### Edge Cases
- Malformed sutra numbers in the input.
- Context missing a sutra number to check.

## Integration

### Related Sutras
- This sutra governs all sutras from **1.4.84** to **1.4.98**. Some examples include:
  - **1.4.84 (anuralakṣaṇe)**
  - **1.4.85 (tṛtīyā'rthe)**
  - **1.4.86 (hīne)**
- It distinguishes `karmapravacanīya` from `upasarga` (**1.4.59**) and `gati` (**1.4.60**).

### Used By
- The main sutra processing engine to know which set of rules to apply when identifying `karmapravacanīya` particles.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.83
- **Implementation Notes**: The primary function is to define the scope of the `karmapravacanīya` designation.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
