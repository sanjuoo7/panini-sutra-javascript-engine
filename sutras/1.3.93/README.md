# Sutra 1.3.93: लुटि च कॢपः

## Overview

**Sanskrit Text**: `लुटि च कॢपः`
**Transliteration**: `luṭi ca kḷpaḥ`
**Translation**: After the verb क्लिप् 'to be fit', परस्मैपद is optionally used, when लुट् (1st Future) is affixed, as well as when स्य and सन् are affixed.

## Purpose

This sutra is a `vidhi` rule that specifies an optional application of `parasmaipadam` to the verb root `kḷp` under certain conditions.

## Implementation

### Function Signature
```javascript
function applySutra1_3_93(verb, context) {
    // Implementation details
}
```

### Key Features
- Detects the verb root `kḷp`.
- Checks for the presence of the `luṭ` lakāra (1st Future tense).
- Also handles conditions where `sya` or `san` affixes are present.
- Optionally applies `parasmaipadam`.

### Dependencies
- **Sanskrit Utils**: None identified yet.
- **Shared Functions**: None identified yet.

## Usage Examples

### Basic Usage
```javascript
import { applySutra1_3_93 } from './index.js';

// Example 1: Verb 'kḷp' with 'luṭ'
const result1 = applySutra1_3_93('kalpitā', { lakara: 'luṭ', root: 'kḷp' });
console.log(result1); // Expected: { applies: true, optional: true, operations: ['add parasmaipadam'] }

// Example 2: Verb 'kḷp' with 'sya'
const result2 = applySutra1_3_93('kalpsyati', { root: 'kḷp', affixes: ['sya'] });
console.log(result2); // Expected: { applies: true, optional: true, operations: ['add parasmaipadam'] }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: Tests will cover:
- Positive cases where `kḷp` is used with `luṭ`, `sya`, and `san`.
- Negative cases with other verbs or different lakāras.
- Edge cases, such as conjugated forms.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.93

# Run with coverage
npm test sutras/1.3.93 --coverage
```

## Technical Details

### Algorithm
1. Check if the input verb's root is `kḷp`.
2. Check if the context includes `luṭ` lakāra, or the affixes `sya` or `san`.
3. If both conditions are met, the sutra applies optionally.

### Performance
- **Time Complexity**: O(1)
- **Space Complexity**: O(1)
- **Optimization Notes**: The implementation should be a direct check of properties.

### Edge Cases
- The optionality (`vā`) means both `parasmaipadam` and `ātmanepadam` forms can be correct.

## Integration

### Related Sutras
- This sutra provides an option to the default `ātmanepadam` for `kḷp`.

### Used By
- Higher-level modules responsible for verb conjugation.

## References

- **Panini's Ashtadhyayi**: Sutra 1.3.93
- **Implementation Notes**: Based on the standard interpretation of the sutra.
- **Test References**: Test cases will be derived from standard grammatical examples.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
