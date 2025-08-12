# 1.2.69 नपुंसकमनपुंसकेनैकवच्चास्यान्यतरस्याम्

## Transliteration
napuṁsakamanapuṁsaken aikavac cāsyānyatarasyām

## Translation
A neuter form, when occurring with a non‑neuter of the same base, may optionally alone remain (ekaśeṣa) and is then treated as singular.

## Summary
Introduces optional neuter precedence: a neuter form can be retained over non‑neuter counterparts with number treated as singular (semantic consolidation). Application is optional (marked in metadata).

## Type
Retention / Optional Number Override (Ekaśeṣa specialization)

## Conditions
- Base cluster containing at least one neuter (`gender:'n'`) and one non‑neuter (m/f) sharing base.

## Effects
- Retains last neuter index.
- Drops other gender forms in that base cluster.
- Sets `numberOverride:'singular'` and `optional:true`.

## Function
`applySutra1_2_69(wordsInput, context = {})`

### Return Object
```
{
  sutra:'1.2.69',
  applied: boolean,
  retainedIndices: number[],
  droppedIndices: number[],
  numberOverride: 'singular',
  optional: true,
  reason: 'neuter-optional' | 'no-match'
}
```

## Examples
| Input | Result |
|-------|--------|
| `[ {base:'phala',gender:'n'}, {base:'phala',gender:'m'} ]` | retain neuter; singular sense |

## Edge Cases
- Multiple neuters: last kept.
- No non-neuter: not applied.
- Coexists with parental/in-law optionals; orchestrator selects by weight when overlaps arise.

## Dependencies
Extends base base-cluster grouping logic.

## Tests
Pair present, no pairing, multiple neuters, mixed base cluster.

## Status
Implemented.
