import { applySutra1_2_55 } from './index.js';

describe('Sutra 1.2.55', () => {
  test('meaning absence flips phoneticPresence', () => {
    const r = applySutra1_2_55({}, { meaningAbsent:true });
    expect(r.phoneticPresence).toBe(false);
    expect(r.logicalPresence).toBe(true);
  });
});
