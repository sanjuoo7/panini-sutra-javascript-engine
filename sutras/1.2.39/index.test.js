import { sutra1239 } from './index.js';

describe('1.2.39 local monotone assimilation', () => {
  test('svarita followed by anudatta run adds local-monotone option', () => {
    // Construct synthetic: âàà (svarita a, then two anudatta a)
    const r = sutra1239('âàà', {});
    const modes = r.options.map(o=>o.mode);
    expect(modes).toContain('local-monotone');
    expect(r.appliedSutras).toContain('1.2.39');
  });
  test('no run when no following anudatta', () => {
    const r = sutra1239('âá', {}); // svarita + udātta
    const modes = r.options.map(o=>o.mode);
    expect(modes).not.toContain('local-monotone');
  });
  test('blocked inside subrahmanya domain', () => {
    const r = sutra1239('âà', { subrahmanya: true });
    const modes = r.options.map(o=>o.mode);
    expect(modes).not.toContain('local-monotone');
  });
});
