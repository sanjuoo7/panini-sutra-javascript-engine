import { applySutra1_2_43 } from './index.js';

describe('Sutra 1.2.43: nominative upasarjana', () => {
  test('marks nominative-indicated member', () => {
    const compound = { members:[{form:'go',case:'nom-rule'},{form:'rāja',case:'acc'}] };
    const res = applySutra1_2_43(compound);
    expect(res.upasarjanaIndices).toContain(0);
  });
});
