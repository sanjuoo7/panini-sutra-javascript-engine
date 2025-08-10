# Sutra 1.1.55: anekāla śit sarvasya (अनेकाल्शित्सर्वस्य)

## Overview

**Sanskrit Text**: `अनेकाल्शित्सर्वस्य`  
**Transliteration**: anekāla śit sarvasya  
**Translation**: A substitute consisting of more than one letter and a substitute having an indicatory श् take the place of the whole of the original expression exhibited in the Genitive 6th-Case.

## Purpose

This *paribhasha* (interpretive rule) is a crucial principle in Panini's grammar that determines the scope of substitution. It states that if a substitute is either:
1. **`anekāla` (multi-letter)**: It consists of more than one phoneme.
2. **`śit` (having an indicatory `ś`)**: It has the letter `ś` as an *it* (indicatory letter).

In either of these cases, the substitute replaces the *entire* original expression, overriding the default rules of 1.1.52 (`alo'ntyasya` - replace the last phoneme) and 1.1.54 (`ādeḥ parasya` - replace the first phoneme). This ensures that certain powerful substitutes completely supersede the original.

## Implementation

### Function Signature
```javascript
export function applyAnekalShitSarvasya(originalWord, substitute, isShit, script) {
    // Implementation details
}
```

### Key Features
- **Whole-Word Replacement**: Replaces the entire `originalWord` if conditions are met.
- **Conditional Logic**: Applies based on the length of the substitute or the presence of an indicatory `ś`.
- **Multi-script Support**: Designed to work with both IAST and Devanagari scripts.
- **Override Mechanism**: Acts as an override for partial substitution rules (1.1.52, 1.1.54).

### Dependencies
- **Sanskrit Utils**:
    - `phoneme-tokenization.js`: Used to determine if the substitute is `anekāla` (multi-letter).
    - `script-detection.js`: Used to determine the input script (though not directly used in the current function logic, it's a common dependency for such functions).

## Usage Examples

### Basic Usage
```javascript
import { applyAnekalShitSarvasya } from './index.js';

// Multi-letter substitute (anekāla)
const result1 = applyAnekalShitSarvasya('rāma', 'devau', false, 'IAST');
console.log(result1); // Expected output: 'devau' (replaces 'rāma' entirely)

const result2 = applyAnekalShitSarvasya('राम', 'देवौ', false, 'Devanagari');
console.log(result2); // Expected output: 'देवौ' (replaces 'राम' entirely)

// Śit substitute (assuming 'e' is a śit substitute in this context for demonstration)
const result3 = applyAnekalShitSarvasya('rāma', 'e', true, 'IAST');
console.log(result3); // Expected output: 'e' (replaces 'rāma' entirely)

// Rule does not apply (single-letter substitute, not śit)
const result4 = applyAnekalShitSarvasya('rāma', 'a', false, 'IAST');
console.log(result4); // Expected output: 'rāma' (original word remains)
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 9 tests covering:
- Basic functionality
- Edge cases
- Error handling
- Integration with other sutras

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.55

# Run with coverage
npm test sutras/1.1.55 --coverage
```

## Technical Details

### Algorithm
The function first tokenizes the `substitute` to determine its length. It then checks if the substitute has more than one phoneme (`anekāla`) or if the `isShit` flag is true. If either condition is met, the `substitute` is returned, indicating that it replaces the entire `originalWord`. Otherwise, the `originalWord` is returned, meaning this rule does not apply.

### Performance
- **Time Complexity**: O(L), where L is the length of the `substitute` (due to tokenization). For typical substitutes, L is small, so it's practically constant time.
- **Space Complexity**: O(L), where L is the length of the `substitute` (for storing the phoneme array).

### Edge Cases
- **Empty Inputs**: The function includes checks for null, undefined, or non-empty string inputs and throws an error.
- **Single-Phoneme `śit` Substitute**: The rule correctly applies even if a `śit` substitute is only one phoneme long.

## Integration

### Related Sutras
- This sutra acts as an override for Sutra 1.1.52 (`alo'ntyasya`) and Sutra 1.1.54 (`ādeḥ parasya`). When 1.1.55 applies, the partial substitution rules of 1.1.52 and 1.1.54 are superseded.
- It contrasts with Sutra 1.1.53 (`ṅic ca`), which ensures that `ṅit` substitutes, even if multi-phonemic, still only replace the last phoneme.

### Used By
- Any *vidhi* (prescriptive) sutras that involve `anekāla` or `śit` substitutes will rely on this rule to determine the scope of the replacement.

## References

- **Panini's Ashtadhyayi**: 1.1.55
- **Kāśikā-vṛtti**: Commentary on this sutra.
- **Siddhānta Kaumudī**: Further explanation and examples.

---

*Generated from template: SUTRA_README_TEMPLATE.md*