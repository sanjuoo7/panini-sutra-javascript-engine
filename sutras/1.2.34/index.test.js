import { sutra1234 } from './index.js';

describe('1.2.34 ritual monotone with exceptions', () => {
  test('ritual ordinary word gets forced monotone option', () => {
    const r = sutra1234('agnim', { ritual: true });
    const modes = r.options.map(o=>o.mode);
    expect(modes).toContain('monotone-forced');
    expect(r.primaryDecision).toBe('monotone');
    expect(r.appliedSutras).toContain('1.2.34');
  });
  test('ritual japa blocks forcing', () => {
    const r = sutra1234('agnim', { ritual: true, japa: true });
    const modes = r.options.map(o=>o.mode);
    expect(modes).not.toContain('monotone-forced');
  });
  test('Om variant excluded from ritual forcing', () => {
    const r = sutra1234('oṃ', { ritual: true });
    const modes = r.options.map(o=>o.mode);
    expect(modes).not.toContain('monotone-forced');
  });
});
