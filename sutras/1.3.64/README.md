# 1.3.64 — प्रोपाभ्यां युजेरयज्ञपात्रेषु

- Type: Ātmanepada designation (vidhi)
- Scope: युज् ‘to join’ with prefixes प्र/उप; excluded in sacrificial-vessel contexts.

## Implementation
- Function: `sutra1364(word, context)`
- Detects `युज्/yuj` + `प्र/pra` or `उप/upa`; blocks when `isSacrificialVesselContext`.
