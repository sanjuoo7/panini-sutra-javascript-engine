# Sutra 1.4.90: लक्षणेत्थम्भूताख्यानभागवीप्सासु प्रतिपर्यनवः

## Overview

**Sanskrit Text**: `लक्षणेत्थम्भूताख्यानभागवीप्सासु प्रतिपर्यनवः`
**Transliteration**: `lakaṣaṇetathamabhūtākhayānabhāgavīpasāsu pratiparyanavah`
**Translation**: The particles 'prati', 'pari', and 'anu' are karmapravacanīya in the sense of 'sign' (lakṣaṇa), 'description of a state' (itthambhūtākhyāna), 'part' (bhāga), and 'pervasion' (vīpsā), respectively.

## Purpose

This sutra assigns the `karmapravacanīya` designation to three particles—`prati`, `pari`, and `anu`—under four distinct semantic conditions:
1.  **Lakṣaṇa** (sign, indication, 'towards'): All three particles (`prati`, `pari`, `anu`). Example: `vṛkṣaṁ prati vidyotate vidyut` (lightning flashes towards the tree).
2.  **Itthambhūtākhyāna** (describing a state or condition, 'as regards'): `prati`, `pari`, `anu`. Example: `bhaktaḥ harim prati` (a devotee with regard to Hari).
3.  **Bhāga** (a part or share, 'belonging to'): `prati`, `pari`, `anu`. Example: `lakṣmīḥ harim prati` (the portion of Lakshmi that belongs to Hari).
4.  **Vīpsā** (pervasion, repetition, 'each and every'): `prati`, `pari`, `anu`. Example: `vṛkṣaṁ vṛkṣaṁ prati siñcati` (he waters each and every tree).

## Implementation

### Function Signature
```javascript
function sutra_1_4_90(particle, context) {
    // Implementation details
}
```

### Key Features
- Checks if the particle is one of `prati`, `pari`, or `anu`.
- Checks if the semantic context is one of `lakṣaṇa`, `itthambhūtākhyāna`, `bhāga`, or `vīpsā`.
- Returns `true` if a valid particle-meaning combination is found.

### Dependencies
- **Sanskrit Utils**: `getSemanticContext`

## Usage Examples

### Basic Usage
```javascript
import { sutra_1_4_90 } from './index.js';

// Example for Lakṣaṇa
const result1 = sutra_1_4_90('prati', { meaning: 'lakṣaṇa' });
// Expected: { applies: true, designation: 'karmapravacanīya' }
console.log(result1);

// Example for Bhāga
const result2 = sutra_1_4_90('anu', { meaning: 'bhāga' });
// Expected: { applies: true, designation: 'karmapravacanīya' }
console.log(result2);

// Example for Vīpsā
const result3 = sutra_1_4_90('pari', { meaning: 'vīpsā' });
// Expected: { applies: true, designation: 'karmapravacanīya' }
console.log(result3);
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 60+ tests covering:
- All 12 valid combinations of particles (`prati`, `pari`, `anu`) and meanings.
- Both IAST and Devanagari scripts.
- Negative cases with invalid particles or meanings.
- Error handling for missing context.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.90

# Run with coverage
npm test sutras/1.4.90 --coverage
```

## Technical Details

### Algorithm
1. Define the set of valid particles: `['prati', 'pari', 'anu']`.
2. Define the set of valid meanings: `['lakṣaṇa', 'itthambhūtākhyāna', 'bhāga', 'vīpsā']`.
3. Check if the input particle is in the valid set.
4. Check if the input context's meaning is in the valid set.
5. If both are true, the sutra applies.
6. Otherwise, it does not.

### Performance
- **Time Complexity**: O(1).
- **Space Complexity**: O(1).

## Integration

### Related Sutras
- **1.4.83 (karmapravacanīyāḥ)**: The governing sutra.
- **2.3.8 (karmapravacanīyayukte dvitīyā)**: Triggers the accusative case.
- **1.4.84 (anuralakṣaṇe)**: This sutra expands the meaning of `lakṣaṇa` to `prati` and `pari` as well, while `1.4.84` was only for `anu`.

### Used By
- A grammatical parser for a wide range of adverbial and prepositional phrases.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.90
- **Siddhānta Kaumudī**: Provides numerous examples for each particle and meaning combination.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
