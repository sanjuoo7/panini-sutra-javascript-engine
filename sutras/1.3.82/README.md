# Sutra 1.3.82: परेर्मृषः

## Overview

• Sanskrit: `परेर्मृषः`  
• IAST: parer mṛṣaḥ  
• Sense: After the preverb परि (pari), the root मृष् “to bear/endure” takes Parasmaipada when the kṛtya (result) accrues to the agent (benefitsAgent = true).

## Rule type and scope

- Type: Parasmaipada designation conditioned on agent-benefit.
- Scope: Root मृष् (mṛṣ) with upasarga परि (pari).
- Condition: The fruit goes to the agent; otherwise this rule does not apply.

## Function contract

- Name: sutra1382(word, context?)
- Inputs: word (string, IAST/Devanagari); context { root?, prefix?/upasarga?, benefitsAgent? }
- Output: { applies, isParasmaipada, sutra: '1.3.82', confidence, reason? }

## Examples

- `परिमृषति` with benefitsAgent: true → applies, Parasmaipada
- `परिमृषति` with benefitsAgent: false → does not apply
- `मृषति` (no pari): does not apply

## Edge cases

- If benefitsAgent is undefined, implementation defaults to allowing apply (configurable design choice documented in code).
- Mixed script or invalid input → rejected.

## Implementation note

```javascript
function sutra1382(word, context = {}) { /* implemented in index.js */ }
```

## Tests covered

- Positive: pari + mṛṣ with benefitsAgent true
- Negative: missing pari; benefitsAgent false; invalid input
