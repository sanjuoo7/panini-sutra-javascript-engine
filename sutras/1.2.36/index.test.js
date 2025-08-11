import { sutra1236 } from './index.js';

describe('1.2.36 chandas optional monotone', () => {
  test('chandas context yields options', () => {
    const r = sutra1236('agnim', {});
    const modes = r.options.map(o=>o.mode);
    expect(modes.some(m=>m.startsWith('monotone')) || modes.includes('monotone')).toBe(true);
    expect(r.appliedSutras).toContain('1.2.36');
    expect(r.primaryDecision).toBe('options');
  });
});
