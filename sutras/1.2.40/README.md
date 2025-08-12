# Sutra 1.2.40 – उदात्तस्वरितपरस्य सन्नतरः

IAST: udāttasvaritaparasya sannataraḥ  
Type: Vidhi (accent substitution)

Definition: The accent called sannatara is substituted for an anudātta vowel which has an udātta or svarita following it.

Implementation Notes:
- Detected via `findSannataraTargets` scanning adjacent vowel accents.
- Represented internally as `ACCENT_TYPES.SANNATARA` (no surface mark by default).
- Integrated into prosody aggregation metadata (non-destructive).

Utilities Used: `analyzeVowelAccent`, `findSannataraTargets`.

Return Shape (applySutra1_2_40): `{ sutra, input, applies, indices, metadata[] }`.

Tests: Positive (anudātta+udātta / anudātta+svarita), multiple occurrences, negatives, render placeholder.
