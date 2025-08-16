# Sutra 1.3.80: अभिप्रत्यतिभ्यः क्षिपः

## Overview

• Sanskrit: `अभिप्रत्यतिभ्यः क्षिपः`  
• IAST: abhipratyatibhyaḥ kṣipaḥ  
• Sense: After the root क्षिप् “to throw/cast” when preceded by the preverbs अभि (abhi), प्रति (prati), or अति (ati), Parasmaipada is used even when the fruit accrues to the agent.

## Rule type and scope

- Type: Parasmaipada designation overriding agent-benefit.
- Scope: Root क्षिप् (kṣip) with upasargas अभि/प्रति/अति.
- Condition: Any one of the three prefixes present.

## Function contract

- Name: sutra1380(word, context?)
- Inputs: word (string, IAST/Devanagari); context { root?, prefix?/upasarga? }
- Output: { applies, isParasmaipada, sutra: '1.3.80', confidence, reason? }

## Examples

- `अभिक्षिपति` → applies, Parasmaipada
- `प्रतिक्षिपति` → applies
- `अतिक्षिपति` → applies
- `क्षिपति` (no qualifying prefix) → does not apply

## Edge cases

- Surface detection: prefixes may come via context or be detected in the surface word.
- Mixed script: invalid; validator rejects.

## Implementation note

```javascript
function sutra1380(word, context = {}) { /* implemented in index.js */ }
```

## Tests covered

- Positive: abhi/prati/ati + kṣip (surface and context)
- Negative: missing prefix; invalid input

## Reference

- Aṣṭādhyāyī 1.3.80 अभिप्रत्यतिभ्यः क्षिपः
