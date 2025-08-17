# Sutra 1.4.2: विप्रतिषेधे परं कार्यम्

## Overview

**Sanskrit Text**: `विप्रतिषेधे परं कार्यम्`
**Transliteration**: `vipratiṣedhe paraṃ kāryam`
**Translation**: In case of a conflict between two rules of equal strength, the latter one in the order of the Aṣṭādhyāyī prevails.

## Purpose

This sūtra is a `paribhāṣā` (meta-rule/interpretation principle) that resolves conflicts between equally powerful sūtras. It is a fundamental principle for the entire Aṣṭādhyāyī, providing a deterministic way to handle rule conflicts.

## Implementation

### Function Signature
```javascript
function applySutra1_4_2(rule1, rule2) {
    // This is a meta-rule for the engine.
    // It would compare the sutra numbers to decide precedence.
}
```

### Key Features
- Resolves conflicts between rules of equal strength.
- Prioritizes the sūtra that appears later in the Aṣṭādhyāyī.
- Ensures deterministic and predictable outcomes.

### Dependencies
- None. This is a core principle of the engine itself.

## Usage Examples

### Conceptual Usage
If Sūtra A (e.g., 7.3.102) and Sūtra B (e.g., 7.3.103) are both applicable and of equal strength, this `paribhāṣā` dictates that Sūtra B (the later one) should be applied.

For instance, in the formation of `vṛkṣebhyaḥ`, both `bahuvacane jhalyet` (7.3.103) and `supi ca` (7.3.102) could apply. Sūtra 1.4.2 resolves this by giving precedence to 7.3.103.

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**:
- Tests would be part of the main engine's test suite.
- Scenarios would be created where two conflicting rules of equal strength are applicable.
- The test would verify that the engine correctly applies the later sūtra.

### Running Tests
```bash
# This principle would be tested as part of the overall engine's integration tests.
```

## Technical Details

### Algorithm
1. The sutra processing engine identifies two or more applicable rules of equal strength.
2. The engine compares the sūtra numbers of the conflicting rules.
3. The rule with the higher sūtra number (i.e., the one that comes later in the Aṣṭādhyāyī) is chosen for application.

### Performance
- **Time Complexity**: O(n log n) if sorting is needed for n conflicting rules, but typically O(n) for finding the max.
- **Space Complexity**: O(n) to hold the conflicting rules.

### Edge Cases
- Determining "equal strength" can be complex and is a key part of the engine's logic. This `paribhāṣā` only applies after that determination is made.

## Integration

### Related Sutras
- **`ā kaḍārādekā saṃjñā` (1.4.1)**: This rule creates situations where a conflict might arise (by limiting to one `saṃjñā`), which 1.4.2 then resolves.
- This rule is in principle applicable throughout the Aṣṭādhyāyī whenever a conflict of equally strong rules occurs.

### Used By
- This is a core component of the sutra processing engine's conflict resolution mechanism.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.2
- **Implementation Notes**: This is a widely cited and fundamental interpretation principle.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
