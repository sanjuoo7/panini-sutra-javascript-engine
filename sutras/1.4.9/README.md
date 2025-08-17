# Sutra 1.4.9: षष्ठीयुक्तश्छन्दसि वा

## Overview

**Sanskrit Text**: `षष्ठीयुक्तश्छन्दसि वा`
**Transliteration**: `ṣaṣṭhīyuktaśchandasi vā`
**Translation**: When connected with a word in the sixth (genitive) case, `pati` is optionally (`vā`) termed `ghi` in the Chhandas (Vedic texts).

## Purpose

This sūtra provides a special, optional case for the word `pati`, creating an exception to the restriction imposed by 1.4.8 (`patiḥ samāsa eva`). While 1.4.8 prevents standalone `pati` from being termed `ghi`, this sūtra reintroduces the option under specific circumstances:
1. The context must be Vedic literature (`chandasi`).
2. The word `pati` must be syntactically connected to a word in the genitive case (`ṣaṣṭhīyuktaḥ`).

If these conditions are met, the prohibition from 1.4.8 is lifted, and `pati` can optionally be `ghi`.

## Implementation

### Function Signature
```javascript
function applySutra1_4_9(word, context) {
    // Implementation details
}
```

### Key Features
- Applies only to the word `pati`.
- Applies only in a Vedic (`chandasi`) context.
- Requires a connection to a genitive word.
- Makes the `ghi` saṃjñā optional (`vā`).

### Dependencies
- **Shared Functions**: The `context` object must provide information about the domain (`chandasi`) and syntactic connections (`relatedToGenitive`).

## Usage Examples

### Basic Usage
```javascript
import { applySutra1_4_9 } from './index.js';

// Example 1: 'pati' in a Vedic text, related to a genitive
// This sutra overrides the prohibition from 1.4.8.
const result1 = applySutra1_4_9('pati', {
    inCompound: false,
    domain: 'chandasi',
    relatedToGenitive: true
});
// Expected: { applies: true, optional_sanjna: 'ghi' }

// Example 2: 'pati' in classical Sanskrit
const result2 = applySutra1_4_9('pati', {
    inCompound: false,
    domain: 'classical',
    relatedToGenitive: true
});
// Expected: { applies: false }

// Example 3: 'pati' in Vedic text, but not related to a genitive
const result3 = applySutra1_4_9('pati', {
    inCompound: false,
    domain: 'chandasi',
    relatedToGenitive: false
});
// Expected: { applies: false }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**:
- **Positive case**: `pati` in a Vedic context, not in a compound, but connected to a genitive.
- **Negative cases**:
    - `pati` in a classical context.
    - `pati` in a Vedic context but not connected to a genitive.
    - The word `pati` in a compound (handled by previous rules).
    - Other words like `hari`.

### Running Tests
```bash
npm test sutras/1.4.9
```

## Technical Details

### Algorithm
1. Check if the word is `pati` and if it's not in a compound (i.e., it's in a state where 1.4.8 would normally apply).
2. Check if the context's `domain` is `chandasi`.
3. Check if the context's `relatedToGenitive` flag is `true`.
4. If all these conditions are met, this sūtra applies to make the `ghi` saṃjñā optional, overriding the prohibition from 1.4.8.

### Performance
- **Time Complexity**: O(1).
- **Space Complexity**: O(1).

## Integration

### Related Sutras
- **`patiḥ samāsa eva` (1.4.8)**: This sūtra provides the prohibition that 1.4.9 creates an exception for.
- **`śeṣo ghyasakhi` (1.4.7)**: The base rule for `ghi`.

### Used By
- The `saṃjñā` processing engine to handle the complex exceptions for the word `pati`.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.9

---

*Generated from template: SUTRA_README_TEMPLATE.md*
