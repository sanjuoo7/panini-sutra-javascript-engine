# 1.2.65 वृद्धो युवान् तल्लक्षणश्च (Approx.)

## Transliteration
vṛddho yuvān tallakṣaṇaś ca

## Translation
When a vṛddha (or gotra-marked elder/ancestor form) and a yuvan (younger) form of the same base occur together, the elder (vṛddha/gotra) form alone is retained (ekaśeṣa).

## Summary
Specializes the base ekaśeṣa by introducing semantic precedence: for paired generational forms of the same lexical base, the elder (vṛddha or gotra) term is kept and junior (yuvan) is elided.

## Type
Retention / Priority (Ekaśeṣa specialization)

## Conditions
- At least two forms sharing a lexical base (same `base` property or normalized surface).
- Presence of both categories: one or more with `category: 'vrddha'` (or `gotra`) and one or more with `category: 'yuvan'`.

## Effects
- Retains the last vṛddha/gotra index for each base cluster.
- Drops all corresponding yuvan (and non-kept elder duplicates in that cluster).

## Function
`applySutra1_2_65(wordsInput, context = {})`

### Parameters
- `wordsInput`: array of word objects or strings. Objects may include `{ surface, base, category }`.
- `context`: (currently unused) reserved for future nuance.

### Return Object (Key Fields)
```
{
  sutra: '1.2.65',
  applied: boolean,
  retainedIndices: number[],
  droppedIndices: number[],
  reason: 'vrddha-vs-yuvan' | 'no-match'
}
```

## Examples
| Input (objects) | Result |
|-----------------|--------|
| `[ {base:'agni',category:'vrddha'}, {base:'agni',category:'yuvan'} ]` | keep elder (index 0 or last elder); drop yuvan |
| Multiple elder forms | last elder kept, earlier elders dropped along with yuvan counterparts |

## Edge Cases
- Only vrddha no yuvan: not applied.
- Only yuvan: not applied.
- Mixed bases: each base cluster evaluated independently.

## Dependencies
- Builds atop base identical-form retention concept (1.2.64) but uses semantic categories instead of strict identical surfaces.

## Follow-ups
Precedence integrates with later gender and kinship rules via orchestrator `resolveEkaShesha`.

## Tests
Covers: simple pair, multiple elders, absence of pairing, mixed bases.

## Status
Implemented.
