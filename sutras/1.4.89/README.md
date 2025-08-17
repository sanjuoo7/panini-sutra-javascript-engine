# Sutra 1.4.89: आङ् मर्यादावचने

## Overview

**Sanskrit Text**: `आङ् मर्यादावचने`
**Transliteration**: `āṅ maryādāvacane`
**Translation**: The particle 'āṅ' (ā) is a karmapravacanīya when it expresses a limit (maryādā).

## Purpose

This sutra designates the particle `āṅ` (which appears as `ā`) as a `karmapravacanīya` when it is used to denote a limit. The term `maryādā` here is interpreted in two ways:
1.  **`maryādā` (limit-exclusive)**: "up to but not including."
2.  **`abhividhi` (limit-inclusive)**: "up to and including."

For example, in "ā pāṭaliputrād vṛṣṭo devaḥ" (it rained up to Pataliputra), `ā` sets the boundary. Whether Pataliputra itself received rain depends on the intended sense (`maryādā` or `abhividhi`). In either case, `ā` is a `karmapravacanīya`.

## Implementation

### Function Signature
```javascript
function sutra_1_4_89(particle, context) {
    // Implementation details
}
```

### Key Features
- Checks if the particle is `ā` (from `āṅ`).
- Checks if the semantic context is `maryādā` (limit).
- Returns `true` if both conditions are met.

### Dependencies
- **Sanskrit Utils**: `getSemanticContext`

## Usage Examples

### Basic Usage
```javascript
import { sutra_1_4_89 } from './index.js';

// Example: "It rained up to Pataliputra."
const particle1 = "ā";
const context1 = { meaning: 'maryādā', text: 'ā pāṭaliputrād vṛṣṭo devaḥ' };
const result1 = sutra_1_4_89(particle1, context1);
// Expected: { applies: true, designation: 'karmapravacanīya' }
console.log(result1);

// Example: "From the ocean, the story of Hari is known."
const particle2 = "ā";
const context2 = { meaning: 'maryādā', text: 'ā samudrād yaśaḥ harēḥ' };
const result2 = sutra_1_4_89(particle2, context2);
// Expected: { applies: true, designation: 'karmapravacanīya' }
console.log(result2);
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 52 tests covering:
- Positive cases for `ā` with the meaning of limit (both inclusive and exclusive).
- Both IAST and Devanagari scripts.
- Negative cases where the particle is not `ā`.
- Negative cases where `ā` has other meanings (e.g., as part of a verb).
- Error handling.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.89

# Run with coverage
npm test sutras/1.4.89 --coverage
```

## Technical Details

### Algorithm
1. Check if the input particle is `ā` (`आ`).
2. Analyze the `context` to see if the semantic role is `maryādā` or `abhividhi`.
3. If the particle is `ā` and the meaning is a limit, the sutra applies.
4. Otherwise, it does not apply.

### Performance
- **Time Complexity**: O(1).
- **Space Complexity**: O(1).

### Edge Cases
- Distinguishing the `karmapravacanīya` `ā` from the `upasarga` `ā` (e.g., in `āgacchati`). The `karmapravacanīya` governs a noun in the ablative case, which is a strong indicator.

## Integration

### Related Sutras
- **1.4.83 (karmapravacanīyāḥ)**: The governing sutra.
- **2.3.10 (pañcamyapāṅparibhiḥ)**: Specifies that a noun governed by `āṅ` as a `karmapravacanīya` takes the fifth (ablative) case.
- **1.4.90 (lakaṣaṇetatham...)**: The next sutra, which deals with other particles.

### Used By
- A grammatical parser to correctly identify boundaries and limits in sentences.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.89
- **Siddhānta Kaumudī**: Provides examples for this rule.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
