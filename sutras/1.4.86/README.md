# Sutra 1.4.86: हीने

## Overview

**Sanskrit Text**: `हीने`
**Transliteration**: `hīne`
**Translation**: (The particle 'anu' is a karmapravacanīya) when it is used in the sense of 'inferior' or 'subordinate to' (hīna).

## Purpose

This sutra provides the third specific condition under which the particle `anu` is designated a `karmapravacanīya`. This rule applies when `anu` conveys the meaning of `hīna`, which translates to "less than," "inferior to," or "subordinate to." For instance, in "anu harim surāḥ" (the gods are inferior to Hari), `anu` has this meaning and is therefore a `karmapravacanīya`.

## Implementation

### Function Signature
```javascript
function sutra_1_4_86(particle, context) {
    // Implementation details
}
```

### Key Features
- Checks if the particle is `anu`.
- Checks if the semantic context is `hīna` (inferiority).
- Returns `true` if both conditions are met.

### Dependencies
- **Sanskrit Utils**: `getSemanticContext`

## Usage Examples

### Basic Usage
```javascript
import { sutra_1_4_86 } from './index.js';

// Example: "The gods are inferior to Hari."
const particle1 = "anu";
const context1 = { meaning: 'hīna', text: 'anu harim surāḥ' };
const result1 = sutra_1_4_86(particle1, context1);
// Expected: { applies: true, designation: 'karmapravacanīya' }
console.log(result1);

// Example where 'anu' has a different meaning
const particle2 = "anu";
const context2 = { meaning: 'lakṣaṇa', text: 'vṛkṣam anu vidyotate' };
const result2 = sutra_1_4_86(particle2, context2);
// Expected: { applies: false }
console.log(result2);
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 51 tests covering:
- Positive cases where `anu` signifies inferiority (IAST and Devanagari).
- Negative cases where the particle is not `anu`.
- Negative cases where `anu` is present but the meaning is different (e.g., `lakṣaṇa`, `tṛtīyā'rtha`).
- Error handling for invalid or incomplete context.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.86

# Run with coverage
npm test sutras/1.4.86 --coverage
```

## Technical Details

### Algorithm
1. Check if the input particle is `anu` (or `अनु`).
2. Analyze the `context` object to determine if the semantic role is `hīna`.
3. If both are true, the sutra applies.
4. Otherwise, the sutra does not apply.

### Performance
- **Time Complexity**: O(1).
- **Space Complexity**: O(1).

### Edge Cases
- Distinguishing this specific semantic sense from other uses of `anu`. The overall context of the sentence is crucial.

## Integration

### Related Sutras
- **1.4.83 (karmapravacanīyāḥ)**: The governing sutra.
- **1.4.84 (anuralakṣaṇe)**, **1.4.85 (tṛtīyā'rthe)**: Other rules for `anu`.
- **1.4.87 (upo'dhike ca)**: The next sutra, which deals with a similar concept of superiority/inferiority for the particle `upa`.
- **2.3.8 (karmapravacanīyayukte dvitīyā)**: The `karmapravacanīya` designation triggers the use of the accusative case.

### Used By
- A grammatical analysis engine to correctly parse sentences involving comparative relationships expressed with `anu`.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.86
- **Siddhānta Kaumudī**: Provides the example "anu harim surāḥ".

---

*Generated from template: SUTRA_README_TEMPLATE.md*
