import { applySutra1_3_1, isDhatu } from './index.js';
import { getDhatuCount, ensureDhatusLoaded } from '../sanskrit-utils/dhatu-classification.js';

const POSITIVE_IAST = ['bhū','gam','pac','kṛ','nī','dṛ','as','ji','vad','cur'];
const POSITIVE_DEV = ['भू','गम्','पच्','कृ','नी','दृ','अस्','जि','वद्','चुर्'];

const NEGATIVE_IAST = ['rāma','bhavati','bhūta','pācaka','gamanan','kartṛ','phala','śiva','gamana'];
const NEGATIVE_DEV = ['राम','भवति','भूत','पाचक','गमन','कर्तृ','फल','शिव','गमनम्'];

describe('Sutra 1.3.1: bhūvādayo dhātavaḥ', () => {
  beforeAll(async () => {
    await ensureDhatusLoaded();
  });
  test('positive roots (IAST)', () => {
    for(const root of POSITIVE_IAST){
      const res = applySutra1_3_1(root);
      expect(res.isDhatu).toBe(true);
      expect(isDhatu(root)).toBe(true);
    }
  });
  test('positive roots (Devanagari)', () => {
    for(const root of POSITIVE_DEV){
      const res = applySutra1_3_1(root);
      expect(res.isDhatu).toBe(true);
    }
  });
  test('negative forms (IAST)', () => {
    for(const w of NEGATIVE_IAST){
      const res = applySutra1_3_1(w);
      expect(res.isDhatu).toBe(false);
    }
  });
  test('negative forms (Devanagari)', () => {
    for(const w of NEGATIVE_DEV){
      const res = applySutra1_3_1(w);
      expect(res.isDhatu).toBe(false);
    }
  });
  test('analysis object structure', () => {
    const res = applySutra1_3_1('bhū');
    expect(res).toHaveProperty('sutra','1.3.1');
    expect(res).toHaveProperty('isDhatu', true);
    expect(res).toHaveProperty('root','bhū');
  });
  test('invalid input handling', () => {
    const res = applySutra1_3_1(null);
    expect(res.isDhatu).toBe(false);
    expect(res.reason).toBe('invalid-input');
  });
  test('expanded dhatu list loads (count > seed)', () => {
    const count = getDhatuCount();
    expect(count).toBeGreaterThan(POSITIVE_IAST.length);
  });
});
