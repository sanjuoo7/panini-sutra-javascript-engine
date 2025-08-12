# 1.2.73 ग्राम्यपशुसंघेष्वतरुणेषु स्त्री

## Transliteration
grāmya-paśu-saṅgheṣv ataruṇeṣu strī

## Translation
In a collection (group) of domestic animals that are not young, the feminine form alone is retained (ekaśeṣa).

## Summary
Contextual collection rule: when the context denotes a non‑young collection of domestic animals, a feminine form is retained representing the group. This expresses a semantic collective via feminine gender.

## Type
Retention / Contextual (Ekaśeṣa specialization)

## Conditions
- `context.domain === 'domestic-animals'`
- `context.collection === true`
- `context.young !== true` (i.e., not explicitly young)
- At least one feminine form present.

## Effects
- Retains last feminine index.
- Drops all other indices.
- Metadata `domain: 'animal-collection'` set in result.

## Function
`applySutra1_2_73(wordsInput, context = {})`

### Return Object
```
{
  sutra:'1.2.73',
  applied: boolean,
  retainedIndices: number[],
  droppedIndices: number[],
  domain:'animal-collection',
  reason:'feminine-collection' | 'domain-mismatch' | 'no-match'
}
```

## Examples
| Input + Context | Result |
|-----------------|--------|
| words: `[ {gender:'m'}, {gender:'f'} ]`, ctx: `{domain:'domestic-animals',collection:true,young:false}` | retain feminine |
| same words, ctx young:true | not applied (fails condition) |

## Edge Cases
- No feminine form: not applied.
- Multiple feminine forms: last retained.
- Domain mismatch: explanation reflects non-application.

## Dependencies
Relies on context flags supplied by calling code; independent of lexical sets used by earlier specializations.

## Tests
Positive context, negative domain, young flag, multiple feminine forms.

## Status
Implemented.
