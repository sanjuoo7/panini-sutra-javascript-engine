# Sutra 1.1.68: स्वं रूपं शब्दस्याशब्दसंज्ञा

## Overview

**Sanskrit Text**: `स्वं रूपं शब्दस्याशब्दसंज्ञा`
**Transliteration**: `svam rūpaṃ śabdasyāśabdasaṃjñā`
**Translation**: "The form of a word itself is to be taken, unless it is a technical term (`śabdasaṃjñā`)."

*(Note: The `sutra_text_iast` provided in the source data was `3862`, which is incorrect. The text above is based on the `vishaya1` category and standard Sanskrit grammar texts.)*

## Purpose

This sutra is a fundamental `paribhāṣā` (meta-rule) that governs how all other sutras are interpreted. It establishes a crucial principle: when a word is used in a grammatical rule, it refers to its own literal form, not the object it signifies.

For example, if a rule mentions the word `agni` (अग्नि), it refers to the sequence of phonemes `a-g-n-i`, not the concept of "fire".

The second part of the sutra, `aśabdasaṃjñā` ("unless it is a technical term"), provides the exception. If a word is a `saṃjñā` (a technical term defined elsewhere in the grammar, like `vṛddhi`, `guṇa`, `ṭi`, `upadhā`, etc.), then it does *not* refer to its own form but to the concept it defines.

## Implementation

This sutra is a guiding principle for the entire grammar and does not have a direct, standalone functional implementation. It is a rule about how to write the grammar engine itself.

-   Any operation that works with literal strings (e.g., checking if a word is "agni") is implicitly following the `svam rūpaṃ` part of this rule.
-   Any operation that uses a defined technical term (e.g., calling a function like `isVrddhi()` or `getTi()`) is following the `aśabdasaṃjñā` exception.

Because this is a foundational principle, no `index.js` or `index.test.js` files with code are provided. The existence of this README serves to document the importance and role of this sutra in the overall system.

## Integration

This sutra underlies the interpretation of every other rule in the Aṣṭādhyāyī. It is the reason why we can have rules that refer to literal sounds (like "a" or "ik") and also rules that refer to abstract grammatical categories (like "pratyaya" or "aṅga").

## References

- **Panini's Ashtadhyayi**: Sutra 1.1.68

---

*Generated from template: SUTRA_README_TEMPLATE.md*
