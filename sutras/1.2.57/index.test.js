import { applySutra1_2_57 } from './index.js';

describe('Sutra 1.2.57', () => {
  test('temporal subordinate flagged', () => {
    const r = applySutra1_2_57({ isTemporalSubordinate:true });
    expect(r.nonElidable).toBe(true);
  });
});
