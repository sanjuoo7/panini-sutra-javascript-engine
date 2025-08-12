# 1.2.70 पिता मात्रा

## Transliteration
pitā mātrā

## Translation
The father (pitṛ form) may optionally be retained (ekaśeṣa) over the mother (mātṛ form).

## Summary
Adds optional lexical precedence for parental terms: pitṛ may stand alone eliding mātṛ when both occur.

## Type
Retention / Optional (Ekaśeṣa specialization)

## Conditions
- Presence of at least one pitṛ lexeme and one mātṛ lexeme in the input cluster.

## Effects
- Retains last pitṛ index.
- Drops all mātṛ indices.
- Marks result `optional:true`.

## Function
`applySutra1_2_70(wordsInput, context = {})`

### Return Object
```
{
  sutra:'1.2.70',
  applied: boolean,
  retainedIndices: number[],
  droppedIndices: number[],
  optional: true,
  reason: 'pitr-optional' | 'no-match'
}
```

## Examples
| Input | Result |
|-------|--------|
| `[ 'pitṛ','mātṛ' ]` | retain pitṛ |

## Edge Cases
- Multiple pitṛ forms: last retained.
- Absent mātṛ: rule not applied.
- Interacts with neuter optional (1.2.69) & in-law optional (1.2.71) in precedence resolution.

## Dependencies
Uses explicit lexical sets (see utility implementation).

## Tests
Positive pair, absence of mother, multiple fathers, script variation.

## Status
Implemented.
