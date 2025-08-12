# 1.2.64 सरूपाणामेकशेष एकविभक्तौ

## Transliteration
sarūpāṇām ekaśeṣa ekavibhaktau

## Translation
Of words having the same form and (all) in the same single case-termination, only one (the last) is retained (ekaśeṣa), the rest being elided.

## Summary
Establishes the base ekaśeṣa principle: when two or more identical forms occur together (same surface shape and case), only the final occurrence remains; earlier duplicates are conceptually dropped.

## Type
Retention / Elision (Ekaśeṣa base rule)

## Conditions
- Two or more input forms.
- All surface forms identical (after normalization: trim + lowercase).
- (Optional strict mode) All share the same vibhakti/case when `forceCaseCheck` is enabled.

## Effects
- Marks rule as applied.
- Retains only the last form (index n-1).
- Provides arrays of dropped indices and forms.

## Function
`applySutra1_2_64(wordsInput, context = {})`

### Parameters
- `wordsInput`: string (space/plus separated), array of strings, or array of word objects `{ surface | form | lemma, case? }`.
- `context.forceCaseCheck` (boolean, optional): if true, verifies uniform case.

### Return Object
```
{
  sutra: '1.2.64',
  applied: boolean,
  retainedIndex: number|null,
  retainedForm: string|null,
  droppedIndices: number[],
  droppedForms: string[],
  explanation: string,
  forms: string[],
  reason: 'identical-forms' | 'form-mismatch' | 'case-mismatch' | null
}
```

## Examples
| Input | Result |
|-------|--------|
| `गजः गजः` | retain second; drop first |
| `['gajaḥ','gajaḥ','gajaḥ']` | retain last; drop earlier two |
| `['gajaḥ','gajau']` | not applied (form mismatch) |

## Edge Cases
- Single form: not applied.
- Mixed objects with missing case fields under `forceCaseCheck`: allowed if no conflicting explicit cases.
- Case mismatch with `forceCaseCheck`: rule blocked.

## Dependencies
None. This is foundational for specialized ekaśeṣa rules (1.2.65–1.2.73) which add semantic & gender precedence.

## Follow-ups
Subsequent sutras add prioritized retention (e.g., gendered, kinship, pronominal). A future orchestrator `resolveEkaShesha` will integrate precedence once all specializations are implemented.

## Implementation Notes
- Normalization deliberately minimal to avoid over-merging phonetic variants.
- Additional diacritic-insensitive comparison may be introduced later if needed by higher sutras.

## Tests
Covers: positive identical strings, multiple identical forms, object input with case, mismatch, case mismatch, insufficient count.

## Status
Implemented.
