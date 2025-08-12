import { applySutra1_2_58 } from './index.js';

describe('Sutra 1.2.58', () => {
  test('class noun gets optional plural', () => {
    const r = applySutra1_2_58('गज', { isClassNoun:true });
    expect(r.applied).toBe(true);
    expect(r.numberOptions).toContain('plural');
  });
  test('non class no apply', () => {
    const r = applySutra1_2_58('गज', {});
    expect(r.applied).toBe(false);
  });
});
