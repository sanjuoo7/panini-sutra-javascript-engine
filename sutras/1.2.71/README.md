# 1.2.71 श्वशुरः श्वश्र्वा

## Transliteration
śvaśuraḥ śvaśr̥vā (śvaśrū)

## Translation
The father‑in‑law (śvaśura) may optionally be retained (ekaśeṣa) over the mother‑in‑law (śvaśrū).

## Summary
Another optional lexical precedence: śvaśura may stand alone eliding śvaśrū. Parallel in form to parental optional retention.

## Type
Retention / Optional (Ekaśeṣa specialization)

## Conditions
- Input contains at least one śvaśura and one śvaśrū form.

## Effects
- Retains last śvaśura index.
- Drops śvaśrū indices.
- Marks `optional:true`.

## Function
`applySutra1_2_71(wordsInput, context = {})`

### Return Object
```
{
  sutra:'1.2.71',
  applied: boolean,
  retainedIndices: number[],
  droppedIndices: number[],
  optional:true,
  reason:'inlaw-optional' | 'no-match'
}
```

## Examples
| Input | Result |
|-------|--------|
| `[ 'śvaśura','śvaśrū' ]` | retain śvaśura |

## Edge Cases
- Only one in-law form: not applied.
- Multiple fathers-in-law: last retained.
- Precedence: sits with other optional retention rules beneath mandatory/pronoun and kinship weights.

## Dependencies
Explicit lexical sets; no base grouping required.

## Tests
Pair present, absence of pair, multiple forms, script variation.

## Status
Implemented.
