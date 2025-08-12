import { sutra1238 } from './index.js';

describe('1.2.38 lexical anudatta override', () => {
  test('deva becomes lexical-anudatta inside subrahmanya', () => {
    const r = sutra1238('deva', {});
    const modes = r.options.map(o=>o.mode);
    expect(modes).toContain('lexical-anudatta');
    expect(r.appliedSutras).toContain('1.2.38');
  });
  test('non target word only gets udātta replacement for svarita vowels', () => {
    const r = sutra1238('â', {});
    const modes = r.options.map(o=>o.mode);
    expect(modes).toContain('udaatta-replaced');
    expect(modes).not.toContain('lexical-anudatta');
  });
});
