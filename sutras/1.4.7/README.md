# Sutra 1.4.7: शेषो घ्यसखि

## Overview

**Sanskrit Text**: `शेषो घ्यसखि`
**Transliteration**: `śeṣo ghyasakhi`
**Translation**: The remainder (`śeṣaḥ`), except for the word `sakhi`, are termed `ghi`.

## Purpose

This sūtra is a `saṃjñā` (technical term) rule that assigns the name `ghi`. The term `śeṣaḥ` ("the remainder") is crucial; it refers to words that are not covered by the preceding `nadī` rules (1.4.3-1.4.6).

Specifically, this sūtra applies to nouns ending in short `i` (`इ`) and short `u` (`उ`) that have *not* been termed `nadī`. This includes:
1. Masculine and neuter nouns ending in short `i` and `u`.
2. Feminine nouns ending in short `i` and `u` in contexts where they are not optionally termed `nadī` (i.e., before non-`ṅit` affixes).

The sutra explicitly excludes (`asakhi`) the word `sakhi` from this designation.

## Implementation

### Function Signature
```javascript
function applySutra1_4_7(word, context) {
    // Implementation details
}
```

### Key Features
- Assigns the `ghi` saṃjñā.
- Applies to the "remainder" (`śeṣaḥ`) not covered by `nadī` rules.
- Targets words ending in short `i` and `u`.
- Explicitly excludes the word `sakhi`.

### Dependencies
- **Sanskrit Utils**: A utility to check the final vowel of a word.
- **Shared Functions**: Relies on the outcome of the `nadī` saṃjñā rules. The engine must first check for `nadī` before considering `ghi`.

## Usage Examples

### Basic Usage
```javascript
import { applySutra1_4_7 } from './index.js';

// Example 1: Masculine noun in short 'i'
const result1 = applySutra1_4_7('hari', { gender: 'masculine', hasNadīSaṃjñā: false });
console.log(result1); // Expected: { applies: true, sanjna: 'ghi' }

// Example 2: Neuter noun in short 'u'
const result2 = applySutra1_4_7('madhu', { gender: 'neuter', hasNadīSaṃjñā: false });
console.log(result2); // Expected: { applies: true, sanjna: 'ghi' }

// Example 3: The word 'sakhi' is excluded
const result3 = applySutra1_4_7('sakhi', { gender: 'masculine' });
console.log(result3); // Expected: { applies: false }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**:
- **Positive cases**: `hari` (masc), `kavi` (masc), `bhānu` (masc), `vāri` (neuter), `mati` (fem, when not `nadī`).
- **Negative cases**:
    - The word `sakhi`.
    - Words that are termed `nadī` (e.g., `kumārī`, or `mati` before a `ṅit` affix).
    - Words not ending in short `i` or `u`.

### Running Tests
```bash
npm test sutras/1.4.7
```

## Technical Details

### Algorithm
1. Check if the word is `sakhi`. If so, do not apply.
2. Check if the word already has the `nadī` saṃjñā from a previous rule. If so, do not apply.
3. Check if the word ends in a short `i` or `u`.
4. If conditions 1 and 2 are false and 3 is true, apply the `ghi` saṃjñā.

### Performance
- **Time Complexity**: O(1).
- **Space Complexity**: O(1).

## Integration

### Related Sutras
- **`nadī` saṃjñā rules (1.4.3-1.4.6)**: These rules take precedence. `ghi` applies to the remainder.
- **`patiḥ samāsa eva` (1.4.8)**: Modifies the application of `ghi` for the word `pati`.
- Numerous sūtras use the term `ghi` to define their scope, such as `āṅo nā'striyām` (7.3.120).

### Used By
- The `saṃjñā` processing engine.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.7

---

*Generated from template: SUTRA_README_TEMPLATE.md*
