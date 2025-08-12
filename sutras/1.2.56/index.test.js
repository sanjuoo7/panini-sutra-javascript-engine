import { applySutra1_2_56 } from './index.js';

describe('Sutra 1.2.56', () => {
  test('primary meaning carrier flagged', () => {
    const r = applySutra1_2_56({ isPrimaryMeaningCarrier:true });
    expect(r.nonElidable).toBe(true);
  });
});
