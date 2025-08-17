# Sutra 1.4.84: अनुर्लक्षणे

## Overview

**Sanskrit Text**: `अनुर्लक्षणे`
**Transliteration**: `anuralakṣaṇe`
**Translation**: The particle 'anu' is a karmapravacanīya when it means 'a sign' or 'indication' (lakṣaṇa).

## Purpose

This sutra specifies the first condition under which the particle `anu` receives the `karmapravacanīya` designation. When `anu` is used to denote a `lakṣaṇa` (a sign, symptom, or cause), it is classified as a `karmapravacanīya`. This has consequences for the grammar of the sentence, notably preventing the conversion of `s` to `ṣ` by sutra 8.3.59, and governing the case of the associated noun.

## Implementation

### Function Signature
```javascript
function sutra_1_4_84(particle, context) {
    // Implementation details
}
```

### Key Features
- Checks if the particle is `anu`.
- Checks if the semantic context is `lakṣaṇa` (indication).
- Returns `true` if both conditions are met.

### Dependencies
- **Sanskrit Utils**: `getSemanticContext`

## Usage Examples

### Basic Usage
```javascript
import { sutra_1_4_84 } from './index.js';

// Example: "The lightning flashes after the cloud." (The cloud is a sign of lightning)
// Here, 'anu' means 'after' in the sense of being indicated by.
const particle1 = "anu";
const context1 = { meaning: 'lakṣaṇa', text: 'vṛkṣam anu vidyotate vidyut' };
const result1 = sutra_1_4_84(particle1, context1);
// Expected: { applies: true, designation: 'karmapravacanīya' }
console.log(result1);

// Example where 'anu' does not mean 'lakṣaṇa'
const particle2 = "anu";
const context2 = { meaning: 'sequence', text: 'rāmam anu gacchati' }; // Following Rama
const result2 = sutra_1_4_84(particle2, context2);
// Expected: { applies: false }
console.log(result2);
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 51 tests covering:
- Positive cases where `anu` indicates a sign, in both IAST and Devanagari.
- Negative cases where the particle is not `anu`.
- Negative cases where `anu` is present but the meaning is not `lakṣaṇa`.
- Cases where `anu` is an `upasarga` connected to a verb.
- Error handling for missing context.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.84

# Run with coverage
npm test sutras/1.4.84 --coverage
```

## Technical Details

### Algorithm
1. Check if the input particle is `anu` (or `अनु`).
2. Analyze the `context` object to determine if the semantic role is `lakṣaṇa`.
3. If both are true, the sutra applies, and `anu` is designated a `karmapravacanīya`.
4. Otherwise, the sutra does not apply.

### Performance
- **Time Complexity**: O(1), as it's a direct check of particle and context.
- **Space Complexity**: O(1).

### Edge Cases
- Distinguishing the `karmapravacanīya` `anu` from the `upasarga` `anu`. The key is that a `karmapravacanīya` does not directly connect with a verb's action but rather qualifies a noun.
- Ambiguous contexts where the meaning could be interpreted in multiple ways.

## Integration

### Related Sutras
- **1.4.83 (karmapravacanīyāḥ)**: The governing sutra that this rule falls under.
- **2.3.8 (karmapravacanīyayukte dvitīyā)**: Specifies that a noun connected with a `karmapravacanīya` takes the second (accusative) case.
- **8.3.59 (prāksitād...ṣatvam)**: The `karmapravacanīya` designation blocks sibilant sandhi that would otherwise apply.

### Used By
- A grammatical parser to correctly identify the status of `anu` and apply the correct case endings and sandhi rules.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.84
- **Siddhānta Kaumudī**: Provides examples like "vṛkṣam anu vidyotate vidyut".
- **Test References**: Classical examples from grammatical texts.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
