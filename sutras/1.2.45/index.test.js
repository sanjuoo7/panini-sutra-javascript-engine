import { applySutra1_2_45 } from './index.js';

describe('Sutra 1.2.45: base pratipadika', () => {
  test('meaningful non-root word', () => {
    const res = applySutra1_2_45('deva');
    expect(res.isPratipadikaBase).toBe(true);
  });
  test('invalid input handled', () => {
    const res = applySutra1_2_45(null);
    expect(res.isPratipadikaBase).toBe(false);
  });
});
