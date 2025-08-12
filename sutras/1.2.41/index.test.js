import { applySutra1_2_41 } from './index.js';
import { isAprktaAffix } from '../sanskrit-utils/affix-shape-analysis.js';

describe('Sutra 1.2.41: apṛkta ekāl pratyaya', () => {
  test('single letter affix -> apṛkta', () => {
    const res = applySutra1_2_41('t');
    expect(res.isAprkta).toBe(true);
  });
  test('multi letter affix -> not apṛkta', () => {
    const res = applySutra1_2_41('ta');
    expect(res.isAprkta).toBe(false);
  });
  test('IT marker stripping reduces length to 1', () => {
    const res = applySutra1_2_41('tṅ', { stripItMarkers:true });
    expect(res.isAprkta).toBe(true);
  });
  test('utility isAprktaAffix matches', () => {
    expect(isAprktaAffix('m')).toBe(true);
  });
  test('invalid input', () => {
    const res = applySutra1_2_41(null);
    expect(res.applies).toBe(false);
  });
});
