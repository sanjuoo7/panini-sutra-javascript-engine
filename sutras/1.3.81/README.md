# Sutra 1.3.81: प्राद्वहः

## Overview

• Sanskrit: `प्राद्वहः`  
• IAST: prādvahaḥ  
• Sense: When the root वह् “to bear/carry” is preceded by the preverb प्र (pra), the verb takes Parasmaipada, even if the fruit of the action accrues to the agent.

## Rule type and scope

- Type: Parasmaipada designation (vidhi), overriding agent-benefit ātmanepada tendency.
- Scope: Root वह् (vah) when compounded with the upasarga प्र (pra).
- Condition: Presence of pra + vah; agent-benefit does not block this rule.

## Function contract

- Name: sutra1381(word, context?)
- Inputs:
	- word: string (IAST or Devanagari)
	- context?: { root?, prefix?/upasarga?, benefitsAgent? }
- Output: { applies: boolean, isParasmaipada: boolean, sutra: '1.3.81', confidence: number, reason?: string }
- Error modes: invalid/mixed script or non-string input → applies=false

## Examples

- Devanagari: `प्रवहति` (pra + vah + ti) → Parasmaipada
- IAST: pravahati → Parasmaipada
- Non-matching: वहति (no pra) → rule does not apply

## Edge cases

- Mixed/unknown script: rejected by input validator.
- Context-free detection: surface “प्र/ pra” prefix on the word is accepted if context is absent.
- Agent-benefit: even if context.benefitsAgent = true, Parasmaipada still holds.

## Implementation note

```javascript
function sutra1381(word, context = {}) { /* implemented in index.js */ }
```

## Tests covered

- pra + vah (Devanagari) → applies true
- pra + vah (IAST) → applies true
- no pra → applies false
- invalid input → applies false
