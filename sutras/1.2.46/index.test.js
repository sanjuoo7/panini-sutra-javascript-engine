import { applySutra1_2_46 } from './index.js';

describe('Sutra 1.2.46: extended pratipadika', () => {
  test('kṛt derivative', () => {
    const res = applySutra1_2_46('kṛta');
    expect(res.isPratipadika).toBe(true);
  });
  test('compound flagged by context', () => {
    const res = applySutra1_2_46('mahārāja', { isCompound:true });
    expect(res.isPratipadika).toBe(true);
  });
});
