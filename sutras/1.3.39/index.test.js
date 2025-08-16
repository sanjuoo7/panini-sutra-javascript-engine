import { sutra1339 } from './index.js';

describe('Sutra 1.3.39 (upaparābhyām)', () => {
  test('applies for upa + kram with development sense', () => {
    const res = sutra1339('उपक्रमते', { semanticContext: 'development' });
    expect(res.applies).toBe(true);
  });

  test('applies for pari + kram with continuity sense', () => {
    const res = sutra1339('परिक्रमते', { semanticContext: 'continuity' });
    expect(res.isAtmanepada).toBe(true);
  });

  test('does not apply without required prefix', () => {
    const res = sutra1339('क्रमते', { semanticContext: 'development' });
    expect(res.applies).toBe(false);
  });
});
