# Sutra 1.4.13: यस्मात् प्रत्ययविधिस्तदादि प्रत्ययेऽङ्गम्

## Overview

**Sanskrit Text**: `यस्मात् प्रत्ययविधिस्तदादि प्रत्ययेऽङ्गम्`
**Transliteration**: `yasmāt pratyayavidhistadādi pratyaye'ṅgam`
**Translation**: Whatever (stem) an affix is prescribed after, that stem, beginning with the form it takes when the affix follows, is termed `aṅga` (base).

## Purpose

This is a foundational `saṃjñā` (technical term) sūtra that defines the term `aṅga` (inflective base). The `aṅga` is the operational form of a root or stem to which an affix is attached. It includes the original stem plus any modifications (like `guṇa` or `vṛddhi`) that occur before the final affix is added.

For example:
- **Root**: `kṛ` (to do)
- **Affix**: `-ti`
- The root `kṛ` undergoes `guṇa` to become `kar`. An infix `o` is added, resulting in `karo`. This form, `karo`, is the `aṅga`.
- **Final word**: `karo` + `ti` -> `karoti`.

The `aṅga` is the target of many grammatical operations that depend on the following affix.

## Implementation

### Function Signature
```javascript
function applySutra1_4_13(stem, affix) {
    // This is a definitional rule. The engine would use this concept.
}
```

### Key Features
- Defines the `aṅga` (inflective base).
- The `aṅga` is the stem *plus* any modifications that happen before the affix is joined.
- This concept is central to the entire derivational morphology.

### Dependencies
- This is a core concept for the derivation engine.

## Usage Examples

### Conceptual Usage
The concept of `aṅga` is used by the engine to know what part of a word to modify.
- When adding `-bhyām` to `rāja`, the `aṅga` is `rāja`.
- When adding `-bhis` to `rājan`, the `a` of `an` is dropped, and the `aṅga` is effectively `rāj`.
- When adding `-ti` to `bhū`, the `aṅga` becomes `bhava`.

This sūtra doesn't have a direct function to call, but rather establishes the `aṅga` as a target for other rules.

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**:
- Testing for this sūtra would involve testing the derivation engine's ability to correctly identify the `aṅga` in various situations.
- For example, a test could assert that when deriving `bhavati`, the `aṅga` is identified as `bhava` before the `ti` affix is processed.

## Technical Details

### Algorithm
1. The derivation engine takes a base form (dhātu or prātipadika) and an affix.
2. It applies any internal sandhi or modifications to the base form that are conditioned by the affix.
3. The resulting form of the base is the `aṅga`.
4. Operations specific to the `aṅga` are then performed before the affix is finally attached.

## Integration

### Related Sutras
- The entire sixth and seventh books of the Aṣṭādhyāyī are contained in the `aṅgasya` adhikāra, meaning most of the rules in those books apply to the `aṅga`.

### Used By
- The core morphological derivation engine.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.13

---

*Generated from template: SUTRA_README_TEMPLATE.md*
