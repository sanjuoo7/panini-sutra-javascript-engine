import applySutra from './index';

describe('Sutra 1.3.93', () => {
  test('should apply to the verb "kḷp" with "luṭ" lakāra', () => {
    const result = applySutra('kalpitā', { lakara: 'luṭ', root: 'kḷp' });
    expect(result.applies).toBe(true);
    expect(result.optional).toBe(true);
  });

  test('should apply to the verb "kḷp" with "sya" affix', () => {
    const result = applySutra('kalpsyati', { root: 'kḷp', affixes: ['sya'] });
    expect(result.applies).toBe(true);
    expect(result.optional).toBe(true);
  });

  test('should apply to the verb "kḷp" with "san" affix', () => {
    const result = applySutra('ciklipsati', { root: 'kḷp', affixes: ['san'] });
    expect(result.applies).toBe(true);
    expect(result.optional).toBe(true);
  });

  test('should not apply to other verbs', () => {
    const result = applySutra('bhavitā', { lakara: 'luṭ', root: 'bhū' });
    expect(result.applies).toBe(false);
  });

  test('should not apply in other lakāras without sya or san', () => {
    const result = applySutra('kalpate', { lakara: 'laṭ', root: 'kḷp' });
    expect(result.applies).toBe(false);
  });
});
