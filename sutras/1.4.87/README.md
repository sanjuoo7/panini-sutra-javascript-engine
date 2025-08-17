# Sutra 1.4.87: उपोऽधिके च

## Overview

**Sanskrit Text**: `उपोऽधिके च`
**Transliteration**: `upo'dhike ca`
**Translation**: The particle 'upa' is a karmapravacanīya when it means 'superior' (adhika) or 'inferior' (hīna).

## Purpose

This sutra defines the conditions under which the particle `upa` is designated a `karmapravacanīya`. This occurs when `upa` is used to mean either `adhika` (more, superior, above) or `hīna` (less, inferior, below). The `ca` in the sutra carries the `hīne` from the previous sutra (1.4.86), so `upa` covers both superiority and inferiority. For example, in "upa khāryāṁ droṇaḥ," `upa` means "more than," so a drona is more than a khari.

## Implementation

### Function Signature
```javascript
function sutra_1_4_87(particle, context) {
    // Implementation details
}
```

### Key Features
- Checks if the particle is `upa`.
- Checks if the semantic context is `adhika` or `hīna`.
- Returns `true` if both conditions are met.

### Dependencies
- **Sanskrit Utils**: `getSemanticContext`

## Usage Examples

### Basic Usage
```javascript
import { sutra_1_4_87 } from './index.js';

// Example: "A drona is more than a khari."
const particle1 = "upa";
const context1 = { meaning: 'adhika', text: 'upa khāryāṁ droṇaḥ' };
const result1 = sutra_1_4_87(particle1, context1);
// Expected: { applies: true, designation: 'karmapravacanīya' }
console.log(result1);

// Example: "The king is inferior to Hari."
const particle2 = "upa";
const context2 = { meaning: 'hīna', text: 'upa harim surāḥ' };
const result2 = sutra_1_4_87(particle2, context2);
// Expected: { applies: true, designation: 'karmapravacanīya' }
console.log(result2);
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 52 tests covering:
- Positive cases where `upa` signifies superiority (`adhika`).
- Positive cases where `upa` signifies inferiority (`hīna`).
- Both IAST and Devanagari scripts.
- Negative cases where the particle is not `upa`.
- Negative cases where `upa` has a different meaning.
- Error handling for missing context.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.87

# Run with coverage
npm test sutras/1.4.87 --coverage
```

## Technical Details

### Algorithm
1. Check if the input particle is `upa` (or `उप`).
2. Analyze the `context` object to determine if the semantic role is `adhika` or `hīna`.
3. If the particle is `upa` and the meaning is one of the two, the sutra applies.
4. Otherwise, it does not.

### Performance
- **Time Complexity**: O(1).
- **Space Complexity**: O(1).

### Edge Cases
- Distinguishing this usage from `upa` as a standard `upasarga` (e.g., in `upagacchati`). The semantic context is the only differentiator.

## Integration

### Related Sutras
- **1.4.83 (karmapravacanīyāḥ)**: The governing sutra.
- **1.4.86 (hīne)**: The `hīna` meaning is carried from this sutra.
- **2.3.8 (karmapravacanīyayukte dvitīyā)**: Triggers the accusative case.
- **2.3.9 (yasminnadhikaṁ yasmācca īśvaravacanaṁ tatra saptamī)**: In certain contexts of superiority, the seventh (locative) case is used.

### Used By
- A grammatical parser to handle comparative statements made with `upa`.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.87
- **Siddhānta Kaumudī**: Provides the example "upa khāryāṁ droṇaḥ".

---

*Generated from template: SUTRA_README_TEMPLATE.md*
