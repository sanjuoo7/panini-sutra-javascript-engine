import { sutra1345 } from './index.js';

describe('Sutra 1.3.45 (akarmakāc ca for jñā)', () => {
  test('applies for jñā intransitive with non-agent fruit', () => {
    const res = sutra1345('जानाते', { intransitive: true, phalaToAgent: false });
    expect(res.applies).toBe(true);
    expect(res.isAtmanepada).toBe(true);
  });

  test('does not apply if transitive', () => {
    const res = sutra1345('जानाति', { intransitive: false });
    expect(res.applies).toBe(false);
  });

  test('does not apply if fruit accrues to agent', () => {
    const res = sutra1345('jānāte', { intransitive: true, phalaToAgent: true });
    expect(res.applies).toBe(false);
  });
});
