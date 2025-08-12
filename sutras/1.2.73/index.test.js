import { sutra_1_2_73 } from './index.js';

describe('Sutra 1.2.73 feminine retained in domestic animal collection', () => {
  test('applies when context matches', () => {
    const r = sutra_1_2_73([
      { surface:'goṣṭhī', gender:'f' },
      { surface:'go', gender:'m' }
    ], { domain:'domestic-animals', collection:true, young:false });
    expect(r.applied).toBe(true);
  });
  test('no apply when young', () => {
    const r = sutra_1_2_73([{ surface:'goṣṭhī', gender:'f' }], { domain:'domestic-animals', collection:true, young:true });
    expect(r.applied).toBe(false);
  });
});
