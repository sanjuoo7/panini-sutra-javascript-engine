import { applySutra1_2_40 } from './index.js';
import { ACCENT_TYPES, applyAnudatta, applyUdatta, applySvarita } from '../sanskrit-utils/accent-analysis.js';

describe('Sutra 1.2.40: sannatara accent substitution', () => {
  test('applies to anudātta followed by udātta', () => {
    const seq = applyAnudatta('a') + applyUdatta('i');
    const res = applySutra1_2_40(seq);
    expect(res.applies).toBe(true);
    expect(res.metadata.length).toBe(1);
    expect(res.metadata[0].accentTo).toBe(ACCENT_TYPES.SANNATARA);
  });

  test('applies to anudātta followed by svarita', () => {
    const seq = applyAnudatta('a') + applySvarita('i');
    const res = applySutra1_2_40(seq);
    expect(res.applies).toBe(true);
    expect(res.metadata[0].accentTo).toBe(ACCENT_TYPES.SANNATARA);
  });

  test('does not apply when no following accented vowel', () => {
    const seq = applyAnudatta('a') + 'k';
    const res = applySutra1_2_40(seq);
    expect(res.applies).toBe(false);
  });

  test('multiple occurrences detected', () => {
    const seq = applyAnudatta('a') + applyUdatta('i') + applyAnudatta('a') + applySvarita('u');
    const res = applySutra1_2_40(seq);
    expect(res.count).toBe(2);
    expect(res.metadata.length).toBe(2);
  });

  test('render option currently yields identical surface form', () => {
    const seq = applyAnudatta('a') + applyUdatta('i');
    const res = applySutra1_2_40(seq, {}, { render: true });
    expect(res.transformed).toBe(seq); // placeholder rendering
  });

  test('gracefully handles invalid input', () => {
    const res = applySutra1_2_40(null);
    expect(res.applies).toBe(false);
  });
});
