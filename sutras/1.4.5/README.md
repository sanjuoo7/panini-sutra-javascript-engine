# Sutra 1.4.5: वाऽऽमि

## Overview

**Sanskrit Text**: `वाऽऽमि`
**Transliteration**: `vā''mi`
**Translation**: Optionally, before the affix `ām` (genitive plural).

## Purpose

This sūtra provides an option (`vā` - optionally) that affects the `nadī` saṃjñā. It states that feminine words ending in `ī` and `ū` that would normally be prohibited from being called `nadī` (because they are subject to `iyaṅ`/`uvaṅ` substitution, per 1.4.4) can *optionally* be termed `nadī` when the genitive plural case affix `ām` follows.

This rule is an exception to the prohibition in 1.4.4, but only in a specific context. The word `strī` remains exempt from this, as it is always `nadī`.

## Implementation

### Function Signature
```javascript
function applySutra1_4_5(word, context) {
    // Implementation details
}
```

### Key Features
- Applies only when the following affix is `ām`.
- Re-introduces the `nadī` saṃjñā as an *option* for words that were excluded by 1.4.4.
- Does not apply to the word `strī`.

### Dependencies
- **Sanskrit Utils**: A utility to check the following affix.
- **Shared Functions**: Depends on the context of `nadī` prohibition from 1.4.4.

## Usage Examples

### Basic Usage
```javascript
import { applySutra1_4_5 } from './index.js';

// Example 1: 'śrī' before 'ām'
// Normally not nadī, but optionally nadī here.
const result1 = applySutra1_4_5('śrī', { gender: 'feminine', isIyanUvanSthana: true, nextAffix: 'ām' });
console.log(result1); // Expected: { applies: true, optional_sanjna: 'nadī' }

// Example 2: 'bhrū' before 'ām'
const result2 = applySutra1_4_5('bhrū', { gender: 'feminine', isIyanUvanSthana: true, nextAffix: 'ām' });
console.log(result2); // Expected: { applies: true, optional_sanjna: 'nadī' }

// Example 3: 'śrī' before a different affix
const result3 = applySutra1_4_5('śrī', { gender: 'feminine', isIyanUvanSthana: true, nextAffix: 'bhyām' });
console.log(result3); // Expected: { applies: false }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**:
- **Positive cases**: Words like `śrī` and `bhrū` when the next affix is `ām`.
- **Negative cases**:
    - The same words when the next affix is not `ām`.
    - The word `strī`.
    - Regular `nadī` words like `kumārī`.

### Running Tests
```bash
npm test sutras/1.4.5
```

## Technical Details

### Algorithm
1. Check if the context indicates the next affix is `ām`.
2. Check if the word is one that is normally prohibited from being `nadī` by 1.4.4 (i.e., it is an `iyaṅ`/`uvaṅ` sthāna and not `strī`).
3. If both conditions are met, this sūtra applies and makes the `nadī` saṃjñā optional.

### Performance
- **Time Complexity**: O(1).
- **Space Complexity**: O(1).

## Integration

### Related Sutras
- **`neyaṅuvaṅsthānāvastrī` (1.4.4)**: This sūtra provides the prohibition that 1.4.5 makes optional under certain conditions.
- **`yū stryākhyau nadī` (1.4.3)**: The base rule for `nadī` saṃjñā.

### Used By
- The `saṃjñā` processing logic to correctly handle the optionality of the `nadī` term for certain nouns before `ām`.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.5

---

*Generated from template: SUTRA_README_TEMPLATE.md*
