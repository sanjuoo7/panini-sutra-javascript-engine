import sutra1387 from './index.js';

describe('Sutra 1.3.87 – Parasmaipada for causatives in निगरण/चलन senses', () => {
  it('applies for swallowing sense (causative)', () => {
    const res = sutra1387('glāpayati', { hasCausative: true, meaning: 'to swallow/ingest' });
    expect(res.applies).toBe(true);
    expect(res.isParasmaipada).toBe(true);
  });
  it('applies for moving/shaking sense (causative)', () => {
    const res = sutra1387('calāpayati', { hasCausative: true, meaning: 'to shake/move' });
    expect(res.applies).toBe(true);
  });
  it('does not apply if not causative', () => {
    const res = sutra1387('calati', { meaning: 'to move' });
    expect(res.applies).toBe(false);
  });
  it('does not apply if sense not matched', () => {
    const res = sutra1387('dīpayati', { hasCausative: true, meaning: 'to light' });
    expect(res.applies).toBe(false);
  });
});
