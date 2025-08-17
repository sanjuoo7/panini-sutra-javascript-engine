# Sutra 1.4.82: व्यवहिताश्च

## Overview

**Sanskrit Text**: `व्यवहिताश्च`
**Transliteration**: `vyavahitāśca`
**Translation**: And (the particles, `gati` and `upasarga`, in Vedic literature) may also be separated (from the verb by intervening words).

## Purpose

This sutra is a direct continuation of `1.4.81 (chandasi pare'pi)`. It clarifies that the `gati` and `upasarga` particles, when used in Vedic texts, can not only be placed after the verb but can also be separated from it by one or more intervening words. The `ca` ("and") in the sutra links it to the preceding rule.

## Implementation

### Function Signature
```javascript
function sutra_1_4_82(sentence, context) {
    // Implementation details
}
```

### Key Features
- Works in conjunction with sutra 1.4.81.
- Detects separation between a verb and a `gati`/`upasarga`.
- Confirms the context is Vedic.

### Dependencies
- **Sanskrit Utils**: `isVedic`, `findVerb`, `findParticles`, `getWordDistance`

## Usage Examples

### Basic Usage
```javascript
import { sutra_1_4_82 } from './index.js';

// Example: 'ā' is separated from 'bharanti' by 'naḥ'
const sentence1 = "viśvā hi māyāḥ svadhāvan abhi māyinaḥ ā dadhuḥ";
const context1 = { isVedic: true, sentence: sentence1, verb: 'dadhuḥ', particles: ['ā'] };
const result1 = sutra_1_4_82(sentence1, context1);
// Expected: { applies: true, reason: "Particle 'ā' is separated from the verb 'dadhuḥ'." }
console.log(result1);

// Example: 'ni' is separated from 'mr̥jyante'
const sentence2 = "apaḥ ni mr̥jyante";
const context2 = { isVedic: true, sentence: sentence2, verb: 'mr̥jyante', particles: ['ni'] };
const result2 = sutra_1_4_82(sentence2, context2);
// Expected: { applies: true, reason: "Particle 'ni' is separated from the verb 'mr̥jyante'." }
console.log(result2);
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 52 tests covering:
- Positive cases with various degrees of separation.
- Cases where the particle is adjacent (this sutra might not apply, or apply vacuously).
- Negative cases in classical Sanskrit where separation is not allowed.
- Error handling for missing context.
- Both Devanagari and IAST script inputs.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.82

# Run with coverage
npm test sutras/1.4.82 --coverage
```

## Technical Details

### Algorithm
1. This rule is an extension of 1.4.81 and assumes its conditions are met (Vedic context, particle placed after the verb).
2. Identify the positions of the verb and the particle.
3. Calculate the distance (number of intervening words) between them.
4. If the distance is greater than 0, this sutra's condition is met.
5. The sutra essentially validates that `distance > 0` is permissible for post-posed particles in Vedic texts.

### Performance
- **Time Complexity**: O(n), for tokenizing and finding positions.
- **Space Complexity**: O(1), for storing positions and distance.

### Edge Cases
- Correctly identifying word boundaries to count intervening words.
- Handling sentences where the verb or particle is not found.
- Differentiating from compound verbs where the particle is not considered "separated".

## Integration

### Related Sutras
- **1.4.81 (chandasi pare'pi)**: This sutra is the primary rule that 1.4.82 modifies and extends. They must be evaluated together.
- **1.4.59 (upasargāḥ kriyāyōge)**: Defines `upasarga`.
- **1.4.60 (gatiśca)**: Defines `gati`.

### Used By
- A Vedic text parser. This rule is critical for correctly linking verbs to their prefixes when they are not adjacent.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.82
- **Implementation Notes**: This rule is almost always cited alongside 1.4.81.
- **Test References**: Examples from Vedic texts illustrating non-adjacent verb-prefix pairs.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
