import sutra1357, { sutra1357 as fn } from './index.js';

describe('Sutra 1.3.57 (ज्ञाश्रुस्मृदृशां सनः)', () => {
  test('applies for desiderative of ज्ञा', () => {
    const res = fn('jñāsisyati', { root: 'jñā', isDesiderative: true });
    expect(res.applies).toBe(true);
    expect(res.isAtmanepada).toBe(true);
  });

  test('applies for desiderative of श्रु', () => {
    const res = fn('śruṣyati', { root: 'śru', isDesiderative: true });
    expect(res.applies).toBe(true);
  });

  test('applies for desiderative of स्मृ', () => {
    const res = fn('smariṣyate', { root: 'smṛ', isDesiderative: true });
    expect(res.applies).toBe(true);
  });

  test('applies for desiderative of दृश्', () => {
    const res = fn('dṛkṣīṣate', { root: 'dṛś', isDesiderative: true });
    expect(res.applies).toBe(true);
  });

  test('negative: not desiderative', () => {
    const res = fn('jānāti', { root: 'jñā', isDesiderative: false });
    expect(res.applies).toBe(false);
  });

  test('negative: other root', () => {
    const res = fn('vadati', { root: 'vad', isDesiderative: true });
    expect(res.applies).toBe(false);
  });
});
