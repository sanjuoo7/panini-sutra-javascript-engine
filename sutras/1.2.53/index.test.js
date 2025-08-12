import { applySutra1_2_53 } from './index.js';

describe('Sutra 1.2.53', () => {
  test('technical term triggers nonElidable', () => {
    const r = applySutra1_2_53({ technicalTerm:true });
    expect(r.nonElidable).toBe(true);
  });
});
