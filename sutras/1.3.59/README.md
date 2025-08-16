# 1.3.59 — प्रत्याङ्भ्यां श्रुवः

- Type: Restriction (pratiṣedha)
- Scope: Desiderative (सन्) of श्रु ‘to hear’ when preceded by प्रति or आङ् (either). Do not use Ātmanepada.

## Implementation
- Function: `sutra1359(word, context)`
- Detects desiderative + root `श्रु/śru` and prefix `प्रति/आ (आङ्)`; sets `isAtmanepada: false`.
