# Sutra 1.4.88: अपपरी वर्जने

## Overview

**Sanskrit Text**: `अपपरी वर्जने`
**Transliteration**: `apaparī varajane`
**Translation**: The particles 'apa' and 'pari' are karmapravacanīya when they mean 'exclusion' (varjana).

## Purpose

This sutra specifies that the particles `apa` and `pari` are designated as `karmapravacanīya` when they are used in the sense of `varjana` (exclusion, leaving out, except for). For example, in "apa trigartebhyaḥ vṛṣṭo devaḥ" (it rained, except in Trigarta), `apa` means exclusion. Similarly for `pari`. This designation is important for case assignment and other grammatical operations.

## Implementation

### Function Signature
```javascript
function sutra_1_4_88(particle, context) {
    // Implementation details
}
```

### Key Features
- Checks if the particle is `apa` or `pari`.
- Checks if the semantic context is `varjana` (exclusion).
- Returns `true` if both conditions are met.

### Dependencies
- **Sanskrit Utils**: `getSemanticContext`

## Usage Examples

### Basic Usage
```javascript
import { sutra_1_4_88 } from './index.js';

// Example: "It rained, excluding Trigarta."
const particle1 = "apa";
const context1 = { meaning: 'varjana', text: 'apa trigartebhyaḥ vṛṣṭo devaḥ' };
const result1 = sutra_1_4_88(particle1, context1);
// Expected: { applies: true, designation: 'karmapravacanīya' }
console.log(result1);

// Example: "Everything has a form, excluding Brahman."
const particle2 = "pari";
const context2 = { meaning: 'varjana', text: 'pari brahmaṇo jagat' };
const result2 = sutra_1_4_88(particle2, context2);
// Expected: { applies: true, designation: 'karmapravacanīya' }
console.log(result2);
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 54 tests covering:
- Positive cases for `apa` with the meaning of exclusion.
- Positive cases for `pari` with the meaning of exclusion.
- Both IAST and Devanagari scripts.
- Negative cases where the particle is different.
- Negative cases where `apa` or `pari` have other meanings (e.g., as verb prefixes).
- Error handling.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.88

# Run with coverage
npm test sutras/1.4.88 --coverage
```

## Technical Details

### Algorithm
1. Check if the input particle is `apa`/`अप` or `pari`/`परि`.
2. Analyze the `context` to see if the semantic role is `varjana`.
3. If the particle is one of the two and the meaning is exclusion, the sutra applies.
4. Otherwise, it does not apply.

### Performance
- **Time Complexity**: O(1).
- **Space Complexity**: O(1).

### Edge Cases
- Differentiating this usage from `apa` and `pari` as standard `upasarga`s (e.g., `apakramati`, `pariṇamati`). The semantic context is the key.

## Integration

### Related Sutras
- **1.4.83 (karmapravacanīyāḥ)**: The governing sutra.
- **2.3.10 (pañcamyapāṅparibhiḥ)**: Specifies that when `apa`, `āṅ`, and `pari` are `karmapravacanīya`, the noun they govern is in the fifth (ablative) case.
- **1.4.89 (āṅ maryādāvacane)**: The next sutra, which also interacts with rule 2.3.10.

### Used By
- A grammatical parser to correctly handle sentences expressing exclusion.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.88
- **Siddhānta Kaumudī**: Provides examples for this rule.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
