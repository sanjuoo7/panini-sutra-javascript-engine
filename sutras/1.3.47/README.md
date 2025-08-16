# 1.3.47 — भासनोपसम्भाषाज्ञानयत्नविमत्युपमन्त्रणेषु वदः

- Type: Ātmanepada designation (vidhi)
- Scope: For root वद् (vad ‘to speak’), use Ātmanepada when the sense is one of:
  - भासन (showing brilliance/proficiency)
  - उपसंभाषा (pacifying/conciliatory speech)
  - ज्ञान (knowledge/knowing statement)
  - यत्न (effort/attempt)
  - विमति (difference of opinion/dissent)
  - उपमन्त्रण (flattering/solicitation)

## Implementation
- Function: `sutra1347(word, context)`
- Returns `{ applies, isAtmanepada, confidence, reason, sutraApplied, details }`.
- Detects root `वद्/vad` and matches semantic keys from `context.meaning`.

## Tests
- `index.test.js` covers positive senses (pacifying, flattering) and a negative case.
