import sutra1358, { sutra1358 as fn } from './index.js';

describe('Sutra 1.3.58 (नानोर्ज्ञः)', () => {
  test('blocks Ātmanepada for अनु + desiderative of ज्ञा', () => {
    const res = fn('anujñāsisyati', { root: 'jñā', isDesiderative: true, prefix: 'anu' });
    expect(res.applies).toBe(true);
    expect(res.isAtmanepada).toBe(false);
  });

  test('does not apply without अनु', () => {
    const res = fn('jñāsisyati', { root: 'jñā', isDesiderative: true });
    expect(res.applies).toBe(false);
  });

  test('does not apply to non-jñā root', () => {
    const res = fn('anuśruṣyati', { root: 'śru', isDesiderative: true, prefix: 'anu' });
    expect(res.applies).toBe(false);
  });
});
