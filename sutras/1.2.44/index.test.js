import { applySutra1_2_44 } from './index.js';

describe('Sutra 1.2.44: ekavibhakti upasarjana', () => {
  test('fixed case member becomes upasarjana', () => {
    const compound = { members:[{form:'go',fixedCase:true},{form:'rāja',case:'nom'}] };
    const res = applySutra1_2_44(compound);
    expect(res.upasarjanaIndices).toContain(0);
  });
});
