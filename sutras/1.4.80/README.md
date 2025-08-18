# Sutra 1.4.80: ते प्राग्धातोः

## Overview

**Sanskrit Text**: `ते प्राग्धातोः`
**Transliteration**: `te prāgdhātoḥ`
**Translation**: Those (`te`: the `gati`, `upasarga`, and `nipāta` class of words) are placed before (`prāk`) the verb root (`dhātoḥ`).

## Purpose

This sutra is a fundamental `paribhāṣā` (metarule) that governs word order in verbal constructions. It mandates that any term classified as `gati` (as well as the related categories of `upasarga` and `nipāta`) must be placed immediately before the verb root it modifies. This rule is essential for the correct formation of prefixed verbs (e.g., `pra` + `bhavati` -> `prabhavati`) and is the foundation for many sandhi (euphonic combination) rules that occur at the boundary between the prefix and the root.

## Implementation

### Function Signature
```javascript
function applyGati(gati, verb) {
    // Implementation details
}
```

### Key Features
- **Prefixing**: Correctly prepends a `gati` term to a verb root.
- **Sandhi Application**: Must correctly apply the appropriate sandhi rule at the junction of the `gati` and the verb. This is the core complexity.
- **Structured Output**: Returns an object detailing the operation, including the result, the components, and any sandhi rule applied.
- **Script Agnostic**: Handles both IAST and Devanagari inputs.

### Dependencies
- **Sandhi Engine**: A robust sandhi engine is a critical dependency for a correct implementation, capable of handling various rules like `guṇa`, `vṛddhi`, `yaṇ`, and `savarṇa-dīrgha`.

## Usage Examples

### Basic Usage
```javascript
import { applyGati } from './index.js';

// Example 1: Simple concatenation
const result1 = applyGati('pra', 'bhavati');
console.log(result1);
// Expected output:
// {
//   success: true,
//   result: 'prabhavati',
//   components: { gati: 'pra', verb: 'bhavati' },
//   sandhi_rule: null
// }

// Example 2: A case involving sandhi (vṛddhi)
const result2 = applyGati('pra', 'eti');
console.log(result2);
// Expected output:
// {
//   success: true,
//   result: 'praiti',
//   components: { gati: 'pra', verb: 'eti' },
//   sandhi_rule: 'vṛddhi'
// }
```

### Advanced Usage
```javascript
// Example with Devanagari input and yaṇ sandhi
const result3 = applyGati('प्रति', 'एकम्');
console.log(result3);
// Expected output:
// {
//   success: true,
//   result: 'प्रत्येकम्',
//   components: { gati: 'प्रति', verb: 'एकम्' },
//   sandhi_rule: 'yaṇ'
// }

// Example of a failed operation (e.g., invalid input)
const result4 = applyGati(null, 'bhavati');
console.log(result4);
// Expected output:
// {
//   success: false,
//   error: 'Invalid input: gati term cannot be null.'
// }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 56 tests covering:
- **Positive Cases (46)**: A wide range of `gati`-verb combinations in both IAST and Devanagari, including:
    - Simple concatenation.
    - `savarṇa-dīrgha` sandhi.
    - `guṇa` sandhi.
    - `vṛddhi` sandhi.
    - `yaṇ` sandhi.
    - Consonantal sandhi (`schutva`, `anusvāra`).
- **Edge Cases (10)**: Robust handling of invalid inputs like `null`, `undefined`, empty strings, and non-string inputs. Also includes a test for chaining operations.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.80

# Run with coverage
npm test sutras/1.4.80 -- --coverage
```

## Technical Details

### Algorithm
1.  **Input Validation**: Check that `gati` and `verb` are valid, non-null strings. If not, return a failure object.
2.  **Sandhi Analysis**: Analyze the final sound of the `gati` and the initial sound of the `verb` to determine which, if any, sandhi rule applies.
3.  **Concatenation & Transformation**: Combine the two strings, applying the phonetic transformation dictated by the identified sandhi rule.
4.  **Result Formatting**: Return a success object containing the final `result`, the original `components`, and the name of the `sandhi_rule` that was applied.

### Performance
-   **Time Complexity**: O(S) where S is the complexity of the sandhi engine. For a well-designed engine, this should be close to O(1) for most cases.
-   **Space Complexity**: O(1).

### Edge Cases
-   Complex sandhi rules that have their own exceptions.
-   Chaining multiple `gati` terms (e.g., `abhi-sam-ā-gacchati`), which requires iterative application of the rule.
-   Dialectal or historical variations in sandhi.

## Integration

### Related Sutras
-   This sutra is the operational counterpart to the definitional `gati` sutras (**1.4.60 - 1.4.79**). It takes the terms they define and puts them into action.
-   It is a prerequisite for virtually all **Sandhi Sutras** that operate at the boundary of a prefix and a verb root.

### Used By
-   This is a core rule used by any system that needs to generate or parse correct Sanskrit verbal forms. It is fundamental to the entire grammar.

## References

-   **Ashtadhyayi of Panini**: Sutra 1.4.80
-   **Siddhanta Kaumudi**: Provides extensive examples of prefixed verbs that are formed according to this rule.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
