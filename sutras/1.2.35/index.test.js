import { sutra1235 } from './index.js';

describe('1.2.35 vasat raised option', () => {
  test('vasat includes raised option', () => {
    const r = sutra1235('vaṣaṭ', {});
    const modes = r.options.map(o=>o.mode);
    expect(modes).toContain('raised');
    expect(r.appliedSutras).toContain('1.2.35');
  });
  test('non-vasat word no raised option', () => {
    const r = sutra1235('agnim', {});
    const modes = r.options.map(o=>o.mode);
    expect(modes).not.toContain('raised');
  });
});
