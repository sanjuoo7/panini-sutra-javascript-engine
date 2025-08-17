# Sutra 1.4.8: पतिः समास एव

## Overview

**Sanskrit Text**: `पतिः समास एव`
**Transliteration**: `patiḥ samāsa eva`
**Translation**: The word `pati` is termed `ghi` only when it is in a compound.

## Purpose

This sūtra is a `niyama` (restrictive rule) that limits the application of the `ghi` saṃjñā for the specific word `pati`. According to the general rule 1.4.7 (`śeṣo ghyasakhi`), `pati` would be termed `ghi` because it ends in a short `i`. However, this sūtra restricts that, stating the `ghi` designation applies to `pati` *only* when it is the final member of a compound (`samāsa`). When `pati` appears as a standalone word, it is not considered `ghi`.

## Implementation

### Function Signature
```javascript
function applySutra1_4_8(word, context) {
    // Implementation details
}
```

### Key Features
- Specifically targets the word `pati`.
- Restricts the `ghi` saṃjñā based on whether `pati` is in a compound.
- Acts as an exception to the general `ghi` rule (1.4.7).

### Dependencies
- **Shared Functions**: This rule's logic depends on knowing whether the word is part of a compound. The `context` object should provide this information (e.g., `context.inCompound`).

## Usage Examples

### Basic Usage
```javascript
import { applySutra1_4_8 } from './index.js';

// Example 1: 'pati' as a standalone word
// It should NOT be ghi. This sutra prevents it.
const result1 = applySutra1_4_8('pati', { inCompound: false });
console.log(result1); // Expected: { applies: true, sanjna_prohibition: 'ghi' }

// Example 2: 'pati' as part of a compound (e.g., bhūpati)
// The restriction does not apply, so it remains ghi by 1.4.7.
const result2 = applySutra1_4_8('bhūpati', { base: 'pati', inCompound: true });
console.log(result2); // Expected: { applies: false }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**:
- **Positive case (prohibition applies)**: The standalone word `pati`.
- **Negative cases (prohibition does not apply)**:
    - `pati` as the final member of a compound (e.g., `prajāpati`, `bhūpati`).
    - Other words like `hari` (which are `ghi` by 1.4.7).

### Running Tests
```bash
npm test sutras/1.4.8
```

## Technical Details

### Algorithm
The logic of this sūtra is to *prevent* `pati` from being `ghi` when it is not in a compound.
1. Check if the word being considered is `pati`.
2. Check if the `context.inCompound` flag is `false`.
3. If both are true, this sūtra applies to prohibit the `ghi` saṃjñā that would have been assigned by 1.4.7.

### Performance
- **Time Complexity**: O(1).
- **Space Complexity**: O(1).

## Integration

### Related Sutras
- **`śeṣo ghyasakhi` (1.4.7)**: This is the general rule that 1.4.8 restricts.
- **`ṣaṣṭhīyuktaśchandasi vā` (1.4.9)**: Provides a further, optional exception for `pati` in Vedic literature.

### Used By
- The `saṃjñā` processing engine, as a check immediately after 1.4.7 would apply to `pati`.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.8

---

*Generated from template: SUTRA_README_TEMPLATE.md*
