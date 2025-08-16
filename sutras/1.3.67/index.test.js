import { sutra1367 } from './index.js';

describe('Sutra 1.3.67 (ṇeraṇau yatra karma ...)', () => {
  test('applies for causative with object→agent and not regret sense', () => {
    const res = sutra1367('कारयते', { isCausative: true, objectBecomesAgent: true, semantic: 'to cause to do' });
    expect(res.applies).toBe(true);
    expect(res.isAtmanepada).toBe(true);
  });
  test('does not apply if not causative', () => {
    const res = sutra1367('करोति', { isCausative: false, objectBecomesAgent: true });
    expect(res.applies).toBe(false);
  });
  test('does not apply in regret-remembering sense', () => {
    const res = sutra1367('अनुस्मारयते', { isCausative: true, objectBecomesAgent: true, isRegretfulRemembering: true });
    expect(res.applies).toBe(false);
  });
});
