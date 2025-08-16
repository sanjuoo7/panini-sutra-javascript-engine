import sutra1385 from './index.js';

describe('Sutra 1.3.85 विभाषाऽकर्मकात्', () => {
  test('upa + ram intransitive → optional Parasmaipada', () => {
    const res = sutra1385('उपरमति', { root: 'रम्', prefix: 'उप', transitivity: 'intransitive' });
    expect(res.applies).toBe(true);
    expect(res.isParasmaipada).toBe(true);
    expect(res.isOptional).toBe(true);
  });
  test('upa + ram transitive → rule not applied', () => {
    const res = sutra1385('उपरमति', { root: 'ram', prefix: 'upa', transitivity: 'transitive' });
    expect(res.applies).toBe(false);
  });
});
