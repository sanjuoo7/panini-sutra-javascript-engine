# 1.2.67 पुमान् स्त्रिया (Masculine retained over feminine)

## Transliteration
 pumān striyā

## Translation
When masculine and feminine forms of the same base occur together, the masculine is retained (ekaśeṣa).

## Summary
Introduces a general gender precedence: masculine overrides feminine counterparts within a shared lexical base cluster.

## Type
Retention / Gender Priority (Ekaśeṣa specialization)

## Conditions
- Shared base grouping with at least one masculine (`gender:'m'`) and one feminine (`gender:'f'`).

## Effects
- Retains last masculine index per affected base.
- Drops all feminine (and earlier masculine duplicates) for that base.

## Function
`applySutra1_2_67(wordsInput, context = {})`

### Return Object
```
{
  sutra: '1.2.67',
  applied: boolean,
  retainedIndices: number[],
  droppedIndices: number[],
  reason: 'masculine-retained' | 'no-match'
}
```

## Examples
| Input | Result |
|-------|--------|
| `[ {base:'rāma',gender:'m'}, {base:'rāma',gender:'f'} ]` | retain masculine |

## Edge Cases
- Multiple masculines: last masculine wins.
- Only one gender present: not applied.
- Coexists with kinship and pronoun rules; orchestrator uses weights to resolve.

## Dependencies
Extends base grouping logic (1.2.64) and interacts with elder/feminine specializations (1.2.65–66).

## Tests
Positive pair, no pairing, multiple masculines, mixed independent base cluster.

## Status
Implemented.
