# Sutra 1.4.81: छन्दसि परेऽपि

## Overview

**Sanskrit Text**: `छन्दसि परेऽपि`
**Transliteration**: `chandasi pare'pi`
**Translation**: In Vedic literature, certain particles (gati, upasarga) may be placed after the verb, and also be separated from it by other words.

## Purpose

This sutra provides an exception to the general rule of prefix placement for `upasarga` (pre-verbs) and `gati` (a class of particles). In classical Sanskrit, these are typically placed directly before the verb. This rule states that in Vedic texts (`chandasi`), they may be placed after the verb (`pare`) and may also (`api`) be separated by other words.

## Implementation

### Function Signature
```javascript
function sutra_1_4_81(word, context) {
    // Implementation details
}
```

### Key Features
- Detects if the context is Vedic (`chandasi`).
- Identifies `upasarga` or `gati` particles.
- Verifies if these particles appear after the verb.
- Handles cases where particles are separated from the verb by other words.

### Dependencies
- **Sanskrit Utils**: `isVedic`, `isUpasarga`, `isGati`, `findVerb`, `findParticles`

## Usage Examples

### Basic Usage
```javascript
import { sutra_1_4_81 } from './index.js';

// Example 1: `a` is after the verb `bharanti`
const sentence1 = "agnim īḷate purohitam yajñasya devam r̥tvijam hōtāram ratnadhātamam ā";
const context1 = { sentence: sentence1, verb: 'īḷate', particles: ['ā'] };
const result1 = sutra_1_4_81(sentence1, context1);
// Expected: { applies: true, reason: "Gati 'ā' is placed after the verb 'īḷate' in a Vedic context." }
console.log(result1);

// Example 2: 'ni' is after 'dadhimahi'
const sentence2 = "asmākam astu kevalā tanūṣu dadhimahi ni";
const context2 = { sentence: sentence2, verb: 'dadhimahi', particles: ['ni'] };
const result2 = sutra_1_4_81(sentence2, context2);
// Expected: { applies: true, reason: "Upasarga 'ni' is placed after the verb 'dadhimahi' in a Vedic context." }
console.log(result2);
```

### Advanced Usage
```javascript
// Example with separation
const sentence = "viśvā mitrāsaḥ uta sakhāyāḥ ā bharantu naḥ";
const context = { sentence: sentence, verb: 'bharantu', particles: ['ā'] };
const result = sutra_1_4_81(sentence, context);
// Expected: { applies: true, reason: "Gati 'ā' is separated and placed after the verb 'bharantu'." }
console.log(result);
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 52 tests covering:
- Positive cases with various `upasarga` and `gati`.
- Cases with separation between verb and particle.
- Negative cases where the rule does not apply (classical Sanskrit).
- Negative cases where particles are in the standard pre-verb position.
- Error handling for invalid or incomplete context.
- Both Devanagari and IAST script inputs.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.81

# Run with coverage
npm test sutras/1.4.81 --coverage
```

## Technical Details

### Algorithm
1. Check if the context is marked as Vedic. If not, the rule does not apply.
2. Identify the main verb in the input.
3. Identify any `upasarga` or `gati` particles in the input.
4. Determine the position of the verb and the particles.
5. If a particle's position is after the verb's position, the sutra applies.
6. The distance or separation between them does not negate the rule, as per `vyavahitāśca` (1.4.82).

### Performance
- **Time Complexity**: O(n), where n is the number of tokens in the sentence.
- **Space Complexity**: O(k), where k is the number of identified particles and verbs.
- **Optimization Notes**: Assumes pre-tokenized input for efficient analysis.

### Edge Cases
- Sentences with multiple verbs or multiple relevant particles.
- Correctly distinguishing between `gati`/`upasarga` and other indeclinables.
- Sentences where the particle is adjacent vs. separated.

## Integration

### Related Sutras
- **1.4.82 (vyavahitāśca)**: This sutra works in conjunction, explicitly permitting separation between the verb and the particle.
- **1.4.59 (upasargāḥ kriyāyōge)**: Defines what constitutes an `upasarga`.
- **1.4.60 (gatiśca)**: Defines the `gati` category.

### Used By
- This sutra is a rule of interpretation for Vedic texts and would be used by a higher-level parsing engine to correctly associate verbs with their prefixes, even when they are not in the standard position.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.81
- **Implementation Notes**: Based on interpretations from standard commentaries on the Ashtadhyayi.
- **Test References**: Examples are derived from Vedic hymns and standard grammatical examples.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
