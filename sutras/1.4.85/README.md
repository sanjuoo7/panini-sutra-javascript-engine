# Sutra 1.4.85: तृतीयाऽर्थे

## Overview

**Sanskrit Text**: `तृतीयाऽर्थे`
**Transliteration**: `tṛtīyā'rthe`
**Translation**: (The particle 'anu' is a karmapravacanīya) when it has the sense of the third case (instrumental).

## Purpose

This sutra, continuing from the previous one, provides a second condition for the particle `anu` to be designated a `karmapravacanīya`. It applies when `anu` is used with the meaning of the third case (`tṛtīyā`), which typically denotes "with," "along," or "by means of." This is a semantic condition. For example, in "nadīm anu avasthitā senā" (the army is situated along the river), `anu` means "along with" and is thus a `karmapravacanīya`.

## Implementation

### Function Signature
```javascript
function sutra_1_4_85(particle, context) {
    // Implementation details
}
```

### Key Features
- Checks if the particle is `anu`.
- Checks if the semantic context is `tṛtīyā'rtha` (meaning of the third case).
- Returns `true` if both conditions are met.

### Dependencies
- **Sanskrit Utils**: `getSemanticContext`

## Usage Examples

### Basic Usage
```javascript
import { sutra_1_4_85 } from './index.js';

// Example: "The army is situated along the river."
// 'anu' here means 'along with', which has the force of the 3rd case.
const particle1 = "anu";
const context1 = { meaning: 'tṛtīyā'rtha', text: 'nadīm anu avasthitā senā' };
const result1 = sutra_1_4_85(particle1, context1);
// Expected: { applies: true, designation: 'karmapravacanīya' }
console.log(result1);

// Example where 'anu' has a different meaning
const particle2 = "anu";
const context2 = { meaning: 'lakṣaṇa', text: 'vṛkṣam anu vidyotate' };
const result2 = sutra_1_4_85(particle2, context2);
// Expected: { applies: false }
console.log(result2);
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 51 tests covering:
- Positive cases where `anu` has the sense of the third case (IAST and Devanagari).
- Negative cases where the particle is not `anu`.
- Negative cases where `anu` is present but the meaning is different (e.g., `lakṣaṇa`, `hīne`).
- Error handling for invalid or incomplete context.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.85

# Run with coverage
npm test sutras/1.4.85 --coverage
```

## Technical Details

### Algorithm
1. Check if the input particle is `anu` (or `अनु`).
2. Analyze the `context` object to determine if the semantic role is `tṛtīyā'rtha`.
3. If both are true, the sutra applies.
4. Otherwise, the sutra does not apply.

### Performance
- **Time Complexity**: O(1).
- **Space Complexity**: O(1).

### Edge Cases
- Differentiating this meaning from other meanings of `anu` like "after" or "in imitation of." The semantic context is key.
- Ambiguous sentences where the role of `anu` is not clear without a wider context.

## Integration

### Related Sutras
- **1.4.83 (karmapravacanīyāḥ)**: The governing sutra.
- **1.4.84 (anuralakṣaṇe)**: The preceding rule for `anu`. A given instance of `anu` would be checked against all its governing rules.
- **1.4.86 (hīne)**: The subsequent rule for `anu`.
- **2.3.8 (karmapravacanīyayukte dvitīyā)**: This designation also leads to the use of the accusative case.

### Used By
- A grammatical parser to correctly identify `anu` and apply appropriate grammatical rules.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.85
- **Siddhānta Kaumudī**: Provides the example "nadīm anu avasthitā senā".

---

*Generated from template: SUTRA_README_TEMPLATE.md*
