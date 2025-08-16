import { sutra1362 } from './index.js';

describe('Sutra 1.3.62 (pūrvavat san)', () => {
  test('applies when desiderative and base verb is Ātmanepada', () => {
    const res = sutra1362('चिक्रीडते', { isDesiderative: true, baseAtmanepada: true });
    expect(res.applies).toBe(true);
    expect(res.isAtmanepada).toBe(true);
  });
  test('does not apply when base is not Ātmanepada', () => {
    const res = sutra1362('चिक्रीडति', { isDesiderative: true, baseAtmanepada: false });
    expect(res.applies).toBe(false);
  });
});
