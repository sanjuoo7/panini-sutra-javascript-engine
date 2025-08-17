# Sutra 1.4.64: भूषणेऽलम्

## Overview

**Sanskrit Text**: `भूषणेऽलम्`
**Transliteration**: bhūṣaṇe'lam
**Translation**: The word `alam` is termed `gati` when it signifies 'ornament' or 'decoration' and is used with a verb.

## Purpose

This sutra specifies a condition under which the indeclinable `alam` receives the `gati` status. While `alam` can have several meanings (e.g., 'enough', 'sufficient', 'capable'), this rule singles out its use in the sense of 'adorning' or 'decorating'. When `alam` as `gati` combines with a verb like `kṛ` (to do/make), it forms a cohesive unit like `alaṅkṛ`, meaning 'to decorate'.

## Implementation

### Function Signature
```javascript
function isGatiAlam(word, context) {
    // Implementation details
}
```

### Key Features
- Checks if the input word is `alam`.
- Verifies the semantic context implies `bhūṣaṇa` (ornament/decoration).
- Confirms the presence of a verb in the context.

### Dependencies
- **Sanskrit Utils**: `transliterate`.
- **Shared Functions**: A way to infer semantic meaning from the context.

## Usage Examples

### Basic Usage
```javascript
import { isGatiAlam } from './index.js';

// Example 1: 'alam' meaning 'ornament'
const result1 = isGatiAlam('alam', { verb: 'kṛ', meaning: 'ornament' });
console.log(result1); // Expected output: { applies: true, word: 'alam', term: 'gati' }

// Example 2: Devanagari
const result2 = isGatiAlam('अलम्', { verb: 'kṛ', meaning: 'ornament' });
console.log(result2); // Expected output: { applies: true, word: 'अलम्', term: 'gati' }
```

### Advanced Usage
```javascript
// Example of 'alam' used in the sense of 'enough'
const result3 = isGatiAlam('alam', { verb: 'kṛ', meaning: 'enough' });
console.log(result3); // Expected output: { applies: false, reason: "Meaning is not 'ornament'" }

// Example without a verb
const result4 = isGatiAlam('alam', { meaning: 'ornament' });
console.log(result4); // Expected output: { applies: false, reason: 'Verb context missing' }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 50+ tests covering:
- Positive cases for `alam` with 'ornament' meaning and various verbs (IAST and Devanagari).
- Negative cases where the meaning is different (e.g., 'enough', 'sufficient').
- Negative cases where the verb is missing.
- Negative cases for other words.
- Edge cases with invalid inputs.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.64

# Run with coverage
npm test sutras/1.4.64 --coverage
```

## Technical Details

### Algorithm
1.  Check if the input `word` is `alam` (`अलम्`). If not, return `applies: false`.
2.  Verify that `context.verb` is present. If not, return `applies: false`.
3.  Check the semantic `context.meaning`. It must be `ornament`.
4.  If all conditions are met, return `applies: true`. Otherwise, return `applies: false`.

### Performance
- **Time Complexity**: O(1).
- **Space Complexity**: O(1).
- **Optimization Notes**: The logic is straightforward and efficient.

### Edge Cases
- The distinction between `alam` (ornament) and `alam` (enough) is purely semantic and relies on the context provided to the function.
- The rule results in forms like `alaṅkaroti`. The sandhi (`m` to `ṅ`) is a consequence of this `gati` status but is handled by other rules.

## Integration

### Related Sutras
- This sutra is part of the `gati` section.
- **8.3.12 (vā śari)**: A sandhi rule that can be affected by the `gati` status.

### Used By
- Sandhi rules.
- Compounding (`samāsa`) rules.
- Accent rules.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.64
- **Implementation Notes**: The implementation is highly dependent on the accuracy of the semantic context.
- **Test References**: Examples like `alaṅkṛtya` are standard illustrations of this rule.
---

*Generated from template: SUTRA_README_TEMPLATE.md*
