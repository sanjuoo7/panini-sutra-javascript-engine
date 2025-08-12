# 1.2.66 स्त्री पुंवच्च (Feminine treated as masculine)

## Transliteration
strī puṁvacca

## Translation
When a feminine vṛddha form and a yuvan form (of the same base) occur together, the feminine vṛddha form is retained (ekaśeṣa) and treated grammatically like a masculine.

## Summary
Adds a gender override to vṛddha vs yuvan precedence: if the retained elder is feminine, it is construed with masculine agreement downstream.

## Type
Retention / Gender Override (Ekaśeṣa specialization)

## Conditions
- Cluster with at least one feminine vṛddha (`gender:'f', category:'vrddha'`).
- At least one yuvan (`category:'yuvan'`) sharing the same base.

## Effects
- Retains last feminine vṛddha index per base cluster.
- Drops corresponding yuvan (and earlier elder duplicates) for that base.
- Sets `genderOverride: 'masculine'`.

## Function
`applySutra1_2_66(wordsInput, context = {})`

### Return Object (Key Fields)
```
{
  sutra: '1.2.66',
  applied: boolean,
  retainedIndices: number[],
  droppedIndices: number[],
  genderOverride: 'masculine',
  reason: 'feminine-vrddha-retained' | 'no-match'
}
```

## Examples
| Input | Result |
|-------|--------|
| `[ {base:'kula',gender:'f',category:'vrddha'}, {base:'kula',category:'yuvan'} ]` | retain fem vrddha with masculine override |

## Edge Cases
- Feminine vṛddha without yuvan: not applied.
- Multiple feminine vṛddha: last one retained.
- Interaction: outranks base 1.2.64 and evaluated alongside 1.2.65 in orchestrator.

## Dependencies
Relies on same base grouping logic introduced in 1.2.65.

## Tests
Cover: positive pair, multiple feminine elders, absence of yuvan, mixed unrelated base.

## Status
Implemented.
