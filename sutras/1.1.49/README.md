# Sutra 1.1.49: षष्ठी स्थानेयोगा

## Overview

**Sanskrit Text**: `षष्ठी स्थानेयोगा`
**Transliteration**: ṣaṣṭhī sthāneyogā
**Translation**: The force of the negative case in a sūtra is that of the phrase 'in the place of', when no special rules qualify the sense of Genitive 6th-Case.

## Purpose

This `paribhāṣā` (meta-rule) sutra clarifies the interpretation of the genitive case (sixth case, `ṣaṣṭhī`) when it appears in a rule. It states that unless otherwise specified, a word in the genitive case in a sutra indicates that the operation is to be performed "in the place of" (स्थानिन्, `sthānin`) what the genitive word refers to. This is a fundamental principle for understanding how substitutions (`ādeśa`) are applied in Panini's grammar.

## Implementation

### Function Signature
```javascript
function interpretGenitiveCase(sutraContext) {
    // Implementation details
}
```

### Key Features
- Interprets the genitive case in sutras as indicating a `sthānin` (original element).
- Identifies when this default interpretation applies (i.e., no special rules).
- Facilitates the correct application of substitution rules.

### Dependencies
- **Sanskrit Utils**: May require utilities for parsing sutra structure or identifying grammatical cases.
- **Shared Functions**: Potentially depends on functions that manage the application of `ādeśa` (substitutions).

## Usage Examples

### Basic Usage
```javascript
import { interpretGenitiveCase } from './index.js';

// Example 1: A sutra where genitive implies 'in place of'
const sutraContext1 = { rule: 'इकः', case: 'genitive', meaning: 'in place of ik' };
const result1 = interpretGenitiveCase(sutraContext1);
console.log(result1); // Expected output: { interpretation: 'sthānin', element: 'ik' }

// Example 2: A sutra with a special rule (not covered by this sutra directly, but for context)
const sutraContext2 = { rule: 'तस्मादित्युत्तरस्य', case: 'ablative', meaning: 'after that' };
const result2 = interpretGenitiveCase(sutraContext2);
console.log(result2); // Expected output: { interpretation: 'special_rule', element: 'not applicable' }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: Comprehensive tests covering:
- Various examples of genitive case usage in sutras where `sthāneyogā` applies.
- Cases where other rules override this interpretation (negative tests).
- Edge cases with ambiguous or complex sutra structures.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.49

# Run with coverage
npm test sutras/1.1.49 --coverage
```

## Technical Details

### Algorithm
The function will analyze the grammatical structure of a given sutra or rule. If a term is in the genitive case and no other specific `paribhāṣā` or `vidhi` (rule) dictates its interpretation, this sutra's logic will apply, marking the genitive term as the `sthānin` (the element to be replaced).

### Performance
- **Time Complexity**: O(1) - Expected to be constant time for simple rule interpretations.
- **Space Complexity**: O(1) - Minimal memory usage.
- **Optimization Notes**: Efficient parsing of sutra structure is key.

### Edge Cases
- Sutras with multiple genitive terms.
- Interaction with other `paribhāṣā` sutras that modify genitive interpretation.

## Integration

### Related Sutras
- **Sutra 1.1.50 (स्थानेऽन्तरतमः)**: This sutra works in conjunction with 1.1.49 by determining the most appropriate substitute (`ādeśa`) for the `sthānin` identified by 1.1.49.
- Many `vidhi` (operative) sutras that involve substitution will implicitly rely on this `paribhāṣā` for their correct interpretation.

### Used By
- The core engine responsible for applying Panini's rules, especially those involving `ādeśa` (substitutions), will use this sutra to correctly identify the target of the substitution.

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.49
- **Implementation Notes**: Adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md`.
- **Test References**: Test cases will be derived from traditional Sanskrit grammar commentaries illustrating the application of this meta-rule.

---

*Generated from template: SUTRA_README_TEMPLATE.md*