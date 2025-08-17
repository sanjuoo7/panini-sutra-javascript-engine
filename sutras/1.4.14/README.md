# Sutra 1.4.14: सुप्तिङन्तं पदम्

## Overview

**Sanskrit Text**: `सुप्तिङन्तं पदम्`
**Transliteration**: `suptiṅantaṃ padam`
**Translation**: That which ends in a `sup` (nominal case) affix or a `tiṅ` (verbal tense) affix is termed `pada` (an inflected word).

## Purpose

This is a cornerstone `saṃjñā` (technical term) sūtra that defines what constitutes a `pada` (a finished, inflected word ready for use in a sentence). According to this rule, a word is only considered a `pada` if it is terminated by one of two types of affixes:
1. **`sup`**: The set of 21 nominal case endings (e.g., `-s`, `-au`, `-jas`, etc., from 4.1.2). Words ending in these are called `subanta`.
2. **`tiṅ`**: The set of 18 verbal endings for tense, mood, person, and number (e.g., `-tip`, `-tas`, `-jhi`, etc., from 3.4.78). Words ending in these are called `tiṅanta`.

Only a `pada` can be used in a sentence. This distinction is critical for applying sentence-level sandhi rules, which operate between `padas`.

## Implementation

### Function Signature
```javascript
function applySutra1_4_14(word, context) {
    // Definitional rule. The engine would use this concept to classify words.
}
```

### Key Features
- Defines the `pada` (inflected word) saṃjñā.
- Establishes the two paths to word-hood: ending in `sup` or `tiṅ`.
- Differentiates a complete word (`pada`) from a stem (`aṅga` or `prātipadika`).

### Dependencies
- This is a core concept for the syntactic and phonological engine.

## Usage Examples

### Conceptual Usage
The `pada` status determines where external sandhi applies.
- `rāmaḥ` (from `rāma` + `s` [sup]) is a `pada`.
- `gacchati` (from `gam` -> `gaccha` + `ti` [tiṅ]) is a `pada`.
- The stem `rāma` is not a `pada`.
- The root `gam` is not a `pada`.

If we have the sentence `rāmaḥ gacchati`, the sandhi rules that apply between `rāmaḥ` and `gacchati` are `pada`-level rules.

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**:
- Testing would involve the main engine.
- A test could verify that a word like `rāmeṇa` (ending in `sup`) is classified as a `pada`.
- Another test could verify that `bhavāmi` (ending in `tiṅ`) is classified as a `pada`.
- A test could assert that a stem like `nagara` is not a `pada`.

## Technical Details

### Algorithm
1. The derivation engine completes the formation of a word by adding a `sup` or `tiṅ` affix.
2. Once the affix is added and final modifications are made, the resulting form is flagged as a `pada`.
3. The sentence-level processor then operates on these `pada` units.

## Integration

### Related Sutras
- This rule is the primary definition of `pada`. Later sūtras (1.4.15-1.4.17) provide special conditions where a stem can be treated as a `pada` even before a `sup` affix is formally present, for the purpose of certain operations.
- `padāntasya` (8.4.37) and other similar rules operate specifically on the end of a `pada`.

### Used By
- The core engine for derivation, syntax, and sentence-level phonology.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.14

---

*Generated from template: SUTRA_README_TEMPLATE.md*
