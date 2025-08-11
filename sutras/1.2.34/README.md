# 1.2.34

Sanskrit: (ritual monotone with exceptions) — Ekashruti default in ritual contexts except japa, Oṃ variants, and Sāma contexts.

## Translation
In ritual recitation, a monotone (ekashruti) delivery is enforced, except when the utterance is (a) a japa/murmured repetition, (b) an invocation of Oṃ, or (c) occurs within Sāma chanting context.

## Function Purpose
Provides prosodic decision output listing accent vs forced monotone options given a ritual context, respecting defined exceptions.

## Dependencies
- accent-prosody-analysis.aggregateProsodyOptions
- Script detection utility

## Behavior Summary
- Ritual context forces monotone unless an exception.
- Exceptions preserve base accent only.
- Output supplies reasoning tags for downstream diagnostics.

## Examples
| Input | Context | Result |
|-------|---------|--------|
| agnim | {ritual:true} | forced monotone + base |
| oṃ | {ritual:true} | base only (exception) |
| agnim | {ritual:true,japa:true} | base only (exception) |

## Return Shape
```
{
  sutra: '1.2.34',
  script: 'IAST' | 'Devanagari',
  options: [{form, mode, sources}],
  primaryDecision: 'monotone' | 'accented' | 'options',
  appliedSutras: ['1.2.34', ...],
  reasoning: [...tags]
}
```

## Tests
See index.test.js for positive, exception, and negative coverage.
