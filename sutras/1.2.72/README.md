# 1.2.72 त्यदादीनि सर्वैर्नित्यम्

## Transliteration
tyadādīni sarvair nityam

## Translation
Tyad-class pronouns (e.g. tad, etad, tyad) are always retained over all other accompanying forms.

## Summary
Introduces mandatory pronominal precedence: any occurrence of a tyad-series pronoun causes it (them) to be retained and all non-series forms to be elided. This rule has the highest precedence in the ekaśeṣa suite.

## Type
Retention / Mandatory (Ekaśeṣa specialization)

## Conditions
- At least one pronoun in the defined tyad-series lexical set.

## Effects
- Retains all tyad-series indices.
- Drops all other indices.
- Marks `mandatory:true`.

## Function
`applySutra1_2_72(wordsInput, context = {})`

### Return Object
```
{
  sutra:'1.2.72',
  applied: boolean,
  retainedIndices: number[],
  droppedIndices: number[],
  mandatory:true,
  reason:'tyad-mandatory' | 'no-match'
}
```

## Examples
| Input | Result |
|-------|--------|
| `[ 'tat','bhrātṛ' ]` | retain tat; drop bhrātṛ |
| `[ 'tad','etad','putra' ]` | retain tad & etad; drop putra |

## Edge Cases
- Multiple series pronouns: all retained.
- No series pronoun: not applied.
- Overrides any other concurrent retention possibility (highest weight in orchestrator).

## Dependencies
Uses static lexical set matching; no base or gender logic required.

## Tests
Single pronoun, multiple pronouns, absence case, mixed scripts.

## Status
Implemented.
