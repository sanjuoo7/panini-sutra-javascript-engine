# 1.2.68 भ्रातृपुत्रौ स्वसृदुहितृभ्याम्

## Transliteration
bhrātṛputrau svasṛduhitṛbhyām

## Translation
(bhrātṛ and putra) are retained (ekaśeṣa) when paired respectively with (svasṛ and duhitṛ).

## Summary
Establishes kinship lexical precedence: masculine kinship terms bhrātṛ (brother) and putra (son) are retained over the corresponding feminine svasṛ (sister) and duhitṛ (daughter) when they co-occur.

## Type
Retention / Kinship Priority (Ekaśeṣa specialization)

## Conditions
- Presence of at least one pairing set:
  - bhrātṛ + svasṛ
  - putra + duhitṛ

## Effects
- Retains last occurrence of each masculine kinship lexeme present (bhrātṛ, putra).
- Drops the corresponding feminine counterparts in the pairing.
- Multiple pairings handled in a single pass.

## Function
`applySutra1_2_68(wordsInput, context = {})`

### Return Object
```
{
  sutra: '1.2.68',
  applied: boolean,
  retainedIndices: number[],
  droppedIndices: number[],
  reason: 'kinship-retention' | 'no-match'
}
```

## Examples
| Input | Result |
|-------|--------|
| `[ 'bhrātṛ','svasṛ' ]` | retain bhrātṛ |
| `[ 'putra','duhitṛ' ]` | retain putra |
| `[ 'bhrātṛ','svasṛ','putra','duhitṛ' ]` | retain bhrātṛ & putra; drop both feminine |

## Edge Cases
- Only one of a pair: not applied for that set.
- Mixed scripts (IAST/Devanagari) supported via normalization.

## Dependencies
Uses explicit lexical sets independent of base grouping logic.

## Tests
Cover single pair, dual pair, absence of pair, script variation.

## Status
Implemented.
