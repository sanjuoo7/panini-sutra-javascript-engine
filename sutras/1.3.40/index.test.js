import { sutra1340 } from './index.js';

describe('Sutra 1.3.40 (āṅ udgamane)', () => {
  test('applies for ā + kram in udgamana sense', () => {
    const res = sutra1340('आक्रमते', { semanticContext: 'rising of a luminary' });
    expect(res.applies).toBe(true);
  });

  test('does not apply without āṅ prefix', () => {
    const res = sutra1340('क्रमते', { semanticContext: 'rising' });
    expect(res.applies).toBe(false);
  });

  test('does not apply for attack sense', () => {
    const res = sutra1340('आक्रमते', { semanticContext: 'attack' });
    expect(res.applies).toBe(false);
  });
});
