# Sutra 1.4.65: अन्तरपरिग्रहे

## Overview

**Sanskrit Text**: `अन्तरपरिग्रहे`
**Transliteration**: antaraparigrahe
**Translation**: The word `antar` is termed `gati` when it does not signify 'acceptance' (`parigraha`), and is used with a verb.

## Purpose

This sutra assigns the `gati` status to the indeclinable `antar` under a specific semantic condition. The word `antar` can mean 'in-between', 'among', 'inside', or it can be used to imply 'disappearance' or 'exclusion'. This rule states that `antar` is a `gati` when it signifies something other than acceptance or inclusion, effectively meaning 'exclusion' or 'disappearance'. For example, `antardhā` from `antar` + `dhā` means 'to disappear'.

## Implementation

### Function Signature
```javascript
function isGatiAntar(word, context) {
    // Implementation details
}
```

### Key Features
- Checks if the input word is `antar`.
- Verifies the semantic context implies `aparigraha` (non-acceptance/exclusion).
- Confirms the presence of a verb in the context.

### Dependencies
- **Sanskrit Utils**: `transliterate`.
- **Shared Functions**: A way to infer semantic meaning from the context.

## Usage Examples

### Basic Usage
```javascript
import { isGatiAntar } from './index.js';

// Example 1: 'antar' meaning 'non-acceptance'
const result1 = isGatiAntar('antar', { verb: 'dhā', meaning: 'non-acceptance' });
console.log(result1); // Expected output: { applies: true, word: 'antar', term: 'gati' }

// Example 2: Devanagari
const result2 = isGatiAntar('अन्तर्', { verb: 'dhā', meaning: 'non-acceptance' });
console.log(result2); // Expected output: { applies: true, word: 'अन्तर्', term: 'gati' }
```

### Advanced Usage
```javascript
// Example of 'antar' used in the sense of 'inside'
const result3 = isGatiAntar('antar', { verb: 'gam', meaning: 'inside' });
console.log(result3); // Expected output: { applies: false, reason: "Meaning is not 'non-acceptance'" }

// Example without a verb
const result4 = isGatiAntar('antar', { meaning: 'non-acceptance' });
console.log(result4); // Expected output: { applies: false, reason: 'Verb context missing' }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 50+ tests covering:
- Positive cases for `antar` with 'non-acceptance' meaning and various verbs (IAST and Devanagari).
- Negative cases where the meaning is different (e.g., 'inside', 'between').
- Negative cases where the verb is missing.
- Negative cases for other words.
- Edge cases with invalid inputs.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.65

# Run with coverage
npm test sutras/1.4.65 --coverage
```

## Technical Details

### Algorithm
1.  Check if the input `word` is `antar` (`अन्तर्`). If not, return `applies: false`.
2.  Verify that `context.verb` is present. If not, return `applies: false`.
3.  Check the semantic `context.meaning`. It must be `non-acceptance` (or `aparigraha`).
4.  If all conditions are met, return `applies: true`. Otherwise, return `applies: false`.

### Performance
- **Time Complexity**: O(1).
- **Space Complexity**: O(1).
- **Optimization Notes**: The logic is straightforward and efficient.

### Edge Cases
- The semantic distinction is key. The function must be provided with an accurate context. For example, `antar-gam` (to go between) would not be `gati` under this rule, but `antar-dhā` (to hide) would be.
- The sandhi `antar` + `dhā` -> `antardhā` is a result of this `gati` status.

## Integration

### Related Sutras
- This sutra is part of the `gati` section.
- It is related to other rules governing the meanings of indeclinables.

### Used By
- Sandhi rules (e.g., voicing of the final `r`).
- Compounding (`samāsa`) rules.
- Accent rules.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.65
- **Implementation Notes**: The implementation's correctness depends on the provided semantic context.
- **Test References**: Examples like `antardhā` (from `antar` + `dhā`) and `antarbhū` (from `antar` + `bhū`) are standard.
---

*Generated from template: SUTRA_README_TEMPLATE.md*
