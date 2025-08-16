import sutra1388 from './index.js';

describe('Sutra 1.3.88 – Parasmaipada after causatives of base intransitives with sentient agent', () => {
  it('applies when base is intransitive and agent is sentient', () => {
    const res = sutra1388('bodhayati', { hasCausative: true, baseTransitivity: 'intransitive', agentType: 'sentient' });
    expect(res.applies).toBe(true);
    expect(res.isParasmaipada).toBe(true);
  });
  it('rejects if not causative', () => {
    const res = sutra1388('bodhati', { baseTransitivity: 'intransitive', agentType: 'sentient' });
    expect(res.applies).toBe(false);
  });
  it('rejects if base not intransitive', () => {
    const res = sutra1388('karayati', { hasCausative: true, baseTransitivity: 'transitive', agentType: 'sentient' });
    expect(res.applies).toBe(false);
  });
  it('rejects if agent not sentient', () => {
    const res = sutra1388('calāpayati', { hasCausative: true, baseTransitivity: 'intransitive', agentType: 'inanimate' });
    expect(res.applies).toBe(false);
  });
});
