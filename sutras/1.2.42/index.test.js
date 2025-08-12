import { applySutra1_2_42 } from './index.js';

describe('Sutra 1.2.42: karmadhāraya subtype', () => {
  test('identical cases -> karmadhāraya', () => {
    const compound = { type: 'tatpurusha', members: [{form:'mahā',case:'nom'},{form:'rāja',case:'nom'}] };
    const res = applySutra1_2_42(compound);
    expect(res.subtype).toBe('karmadharaya');
  });
  test('different cases -> null subtype', () => {
    const compound = { type: 'tatpurusha', members: [{form:'go',case:'nom'},{form:'rakṣaka',case:'instr'}] };
    const res = applySutra1_2_42(compound);
    expect(res.subtype).toBeNull();
  });
});
