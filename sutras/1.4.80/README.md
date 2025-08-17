# Sutra 1.4.80: ते प्राग्धातोः

## Overview

**Sanskrit Text**: `ते प्राग्धातोः`
**Transliteration**: te prāgdhātoḥ
**Translation**: Those (upasargas, nipātas, and gatis) are placed before the verb root (dhātoḥ).

## Purpose

This sutra is a 'paribhāṣā' (metarule) or 'adhikāra' (governing rule) that specifies the position of terms classified as 'gati' (and also 'upasarga' and 'nipāta', which are related categories). It mandates that these terms must be placed *before* the verb root with which they are connected. This rule is fundamental for forming compound verbs and ensuring the correct word order in Sanskrit.

## Implementation

### Function Signature
```javascript
function applyGati(gati, verb) {
    // Implementation details
}
```

### Key Features
-   Takes a `gati` term and a verb.
-   Prepends the `gati` to the verb.
-   Should handle sandhi (euphonic combination) between the `gati` and the verb, although the exact sandhi rules are defined elsewhere.

### Dependencies
-   **Sanskrit Utils**: Would require sandhi rule functions for a full implementation.
-   **Shared Functions**: None.

## Usage Examples

### Basic Usage
```javascript
import { applyGati } from './index.js';

// Example 1: Prepending 'pra' to 'bhavati'
const result1 = applyGati('pra', 'bhavati');
console.log(result1); // Expected output: 'prabhavati'

// Example 2: Prepending 'upa' to 'karoti'
const result2 = applyGati('upa', 'karoti');
console.log(result2); // Expected output: 'upakaroti'
```

### Advanced Usage
```javascript
// Example involving sandhi
const result3 = applyGati('pra', 'eti');
console.log(result3); // Expected output: 'praiti' (vṛddhi sandhi)
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 50+ tests covering:
-   A variety of `gati` terms (pra, apa, sam, anu, etc.).
-   Different verbs.
-   Cases with simple concatenation.
-   Cases requiring sandhi rules.
-   Tests with both IAST and Devanagari scripts.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.80

# Run with coverage
npm test sutras/1.4.80 -- --coverage
```

## Technical Details

### Algorithm
1.  Take a `gati` term and a verb as input.
2.  Concatenate them in the order `gati` + `verb`.
3.  Apply the relevant sandhi rules to the junction between the two parts.
4.  Return the resulting combined word.

### Performance
-   **Time Complexity**: O(1) for concatenation, but depends on the complexity of the sandhi rules.
-   **Space Complexity**: O(1).

### Edge Cases
-   The `gati` term ends in a vowel and the verb starts with a vowel, requiring sandhi.
-   The input is not a valid `gati` or verb.
-   Missing input.

## Integration

### Related Sutras
-   This sutra governs the application of all the `gati` definitions from the preceding sutras (1.4.60 - 1.4.79).
-   It works in conjunction with various sandhi sutras to produce the final correct form.

### Used By
-   This is a fundamental rule used throughout the grammar for verb formation.

## References

-   **Panini's Ashtadhyayi**: Sutra 1.4.80
-   **Implementation Notes**: A full implementation would be complex, requiring a comprehensive sandhi engine. The tests will focus on the ordering principle and simple sandhi cases.
-   **Test References**: Standard verbal forms from Sanskrit literature.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
