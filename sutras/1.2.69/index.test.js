import { sutra_1_2_69 } from './index.js';

describe('Sutra 1.2.69 neuter optionally retained', () => {
  test('neuter retained over masculine', () => {
    const r = sutra_1_2_69([
      { surface:'phalam', base:'phala', gender:'n' },
      { surface:'phalaḥ', base:'phala', gender:'m' }
    ]);
    expect(r.applied).toBe(true);
    expect(r.numberOverride).toBe('singular');
  });
  test('no pairing no apply', () => {
    const r = sutra_1_2_69([{ surface:'phalam', base:'phala', gender:'n' }]);
    expect(r.applied).toBe(false);
  });
});
