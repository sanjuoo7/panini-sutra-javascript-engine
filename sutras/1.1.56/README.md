# Sutra 1.1.56: स्थानिवदादेशोऽनल्विधौ (sthānivadādeśo'nalavidhau)

## Overview

**Sanskrit Text**: `स्थानिवदादेशोऽनल्विधौ`  
**Transliteration**: sthānivadādeśo'nalavidhau  
**Translation**: A substitute (आदेश) is like the former occupant (स्थानी) but not in the case of a rule the occasion for the operation of which is furnished by the letters of the original term.

## Purpose

This sutra establishes the general principle of `Sthānivadbhāva` (treating a substitute as its original). It states that when one element (the `sthānī`, or original) is replaced by another (the `ādeśa`, or substitute), the substitute behaves in all respects like the original, inheriting its properties and allowing rules that would apply to the original to apply to the substitute. However, there is a crucial exception: this principle does not apply (`na`) if the rule (`vidhi`) depends on the specific phonetic properties (the individual letters, `al`) of the original (`analvidhau`).

## Implementation

### Function Signature
```javascript
export function appliesSthanivadbhava(adesha, sthani, ruleContext) { /* ... */ }
```

### Key Features
- Implements the core logic of `Sthānivadbhāva`.
- Incorporates the `analvidhau` exception, where the principle does not apply if the rule is `alvidhi` (i.e., dependent on the specific letters of the original).

### Dependencies
- **Sanskrit Utils**: None directly used, as this is a foundational definitional sutra.

## Usage Examples

### Basic Usage
```javascript
import { appliesSthanivadbhava } from './index.js';

// Example 1: Sthānivadbhāva applies (analvidhi)
// A rule that applies to "any vowel" (e.g., a rule for vowel sandhi that doesn't care about the specific vowel)
// Here, the substitute 'i' replaces 'y', and the rule is not dependent on the specific letter 'y'.
const result1 = appliesSthanivadbhava('i', 'y', { isAlvidhi: false });
console.log(result1); // true

// Example 2: Sthānivadbhāva does NOT apply (alvidhi)
// A rule that specifically applies to the letter 'a' (e.g., a rule that only triggers for 'a')
// Here, the substitute 'i' replaces 'a', and the rule *is* dependent on the specific letter 'a'.
const result2 = appliesSthanivadbhava('i', 'a', { isAlvidhi: true });
console.log(result2); // false

// Example 3: Default behavior (isAlvidhi defaults to false)
const result3 = appliesSthanivadbhava('u', 'v');
console.log(result3); // true
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 9 tests covering:
- Positive cases where `Sthānivadbhāva` applies.
- Negative cases where `Sthānivadbhāva` does not apply due to `alvidhi`.
- Default behavior when `ruleContext` is not fully specified.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.56

# Run with coverage
npm test sutras/1.1.56 --coverage
```

## Technical Details

### Algorithm
- The `appliesSthanivadbhava` function checks the `isAlvidhi` property within the `ruleContext` object. If `isAlvidhi` is `true`, it returns `false` (Sthānivadbhāva does not apply); otherwise, it returns `true` (Sthānivadbhāva applies).

### Performance
- **Time Complexity**: O(1).
- **Space Complexity**: O(1).
- **Optimization Notes**: The function is highly efficient due to its direct conditional logic.

### Edge Cases
- The function correctly handles cases where `ruleContext` or `isAlvidhi` are not explicitly provided, defaulting `isAlvidhi` to `false`.

## Integration

### Related Sutras
- **1.1.57 (अचः परस्मिन् पूर्वविधौ)**: This sutra specifies a condition under which `Sthānivadbhāva` applies to a vowel substitute for a rule affecting a preceding element.
- **1.1.58 (न पदान्तद्विर्वचनवरेयलोपस्वरसवर्णानुस्वारदीर्घजश्चर्विधिषु)**: This sutra lists specific contexts where `Sthānivadbhāva` is explicitly prohibited, acting as an exception to 1.1.56.
- **1.1.59 (द्विर्वचनेऽचि)**: This sutra provides a specific context where `Sthānivadbhāva` applies for reduplication, potentially overriding or clarifying 1.1.58.

### Used By
- This foundational principle is implicitly or explicitly used by numerous other sutras that involve substitution and require the substitute to behave like the original.

## References

- **Panini's Ashtadhyayi**: 1.1.56
- **Implementation Notes**: This sutra is an `atidesha` (transfer of properties) sutra, laying down a general rule for how substitutes are treated.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
