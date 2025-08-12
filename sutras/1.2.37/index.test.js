import { sutra1237 } from './index.js';

describe('1.2.37 subrahmanya domain rule', () => {
  test('svarita vowel gets udātta replacement and no monotone', () => {
    const r = sutra1237('â', {}); // svarita a
    const modes = r.options.map(o=>o.mode);
    expect(modes).toContain('udaatta-replaced');
    expect(modes.some(m=>m.startsWith('monotone'))).toBe(false);
    expect(r.appliedSutras).toContain('1.2.37');
    expect(r.reasoning).toContain('1.2.37-svarita-to-udaatta');
  });
});
