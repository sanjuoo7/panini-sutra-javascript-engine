# Sutra 1.4.1: आ कडारादेका संज्ञा

## Overview

**Sanskrit Text**: `आ कडारादेका संज्ञा`
**Transliteration**: `ā kaḍārādekā saṃjañā`
**Translation**: From this sūtra up to 2.2.38 (kaḍārāḥ karmadhāraye), only one technical term (saṃjñā) is to be applied.

## Purpose

This sūtra is an `adhikāra` (governing rule) that establishes a meta-rule for the application of subsequent `saṃjñā` (technical term) sūtras. It dictates that within its jurisdiction (from 1.4.1 to 2.2.38), if multiple technical terms could apply to a single entity, only one should be chosen.

## Implementation

### Function Signature
```javascript
function applySutra1_4_1(context) {
    // This is a meta-rule and might not have a direct implementation
    // but rather influences the sutra processing engine.
}
```

### Key Features
- Defines a scope for applying only one `saṃjñā`.
- Prevents conflicting technical terms from being applied simultaneously.
- Governs a large section of the Aṣṭādhyāyī.

### Dependencies
- **Sanskrit Utils**: None.
- **Shared Functions**: This rule would be a core part of the sutra processing logic.

## Usage Examples

### Conceptual Usage
This sutra is not called directly on a word but is a principle for the rule engine. For example, if a term could be both `ghu` and `ghi`, this rule, along with `vipratiṣedhe paraṃ kāryam` (1.4.2), would determine which single term applies.

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**:
- Tests would focus on the sutra processing engine's behavior.
- Ensure that in a conflict, only one `saṃjñā` is applied within this sutra's domain.
- Verify against sūtras that fall under this `adhikāra`.

### Running Tests
```bash
# It might not be possible to test this sutra in isolation.
# It would be tested as part of the overall engine's test suite.
```

## Technical Details

### Algorithm
1. The sutra processing engine must be aware of the `adhikāra` of 1.4.1.
2. When processing sūtras between 1.4.1 and 2.2.38, if a `saṃjñā` is to be applied, the engine must check if another `saṃjñā` from this domain has already been applied.
3. The conflict resolution is typically handled by 1.4.2, which states the later rule in the Aṣṭādhyāyī's order prevails.

### Performance
- **Time Complexity**: O(1) for the rule itself, but it affects the complexity of the overall engine.
- **Space Complexity**: O(1).

### Edge Cases
- The primary edge case is handling the interaction with `vipratiṣedhe paraṃ kāryam` (1.4.2).

## Integration

### Related Sutras
- **`vipratiṣedhe paraṃ kāryam` (1.4.2)**: This sūtra provides the mechanism for resolving conflicts that arise under the governance of 1.4.1.
- All `saṃjñā` sūtras between 1.4.1 and 2.2.38 are governed by this rule.

### Used By
- This rule is fundamental to the sutra processing engine.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.1
- **Implementation Notes**: The implementation is systemic rather than a standalone function.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
