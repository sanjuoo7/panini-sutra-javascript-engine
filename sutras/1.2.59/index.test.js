import { applySutra1_2_59 } from './index.js';
import { applySutra1_2_58 } from '../1.2.58/index.js';

describe('Sutra 1.2.59', () => {
  test('asmad adds plural option', () => {
    const prior = applySutra1_2_58('gaja', { isClassNoun:true });
    const r = applySutra1_2_59('अस्मद्', prior);
    expect(r.applied).toBe(true);
    expect(r.numberOptions).toContain('plural');
  });
  test('non asmad unaffected', () => {
    const r = applySutra1_2_59('tvam', null);
    expect(r.applied).toBe(false);
  });
});
