import applySutra from './index.js';

describe('Sutra 1.4.7', () => {
  test('should apply to masculine words in short i/u', () => {
    const resultHari = applySutra('hari', { hasNadīSaṃjñā: false });
    expect(resultHari.applies).toBe(true);
    expect(resultHari.sanjna).toBe('ghi');

    const resultBhānu = applySutra('bhānu', { hasNadīSaṃjñā: false });
    expect(resultBhānu.applies).toBe(true);
    expect(resultBhānu.sanjna).toBe('ghi');
  });

  test('should apply to feminine words in short i/u if not nadī', () => {
    const result = applySutra('mati', { hasNadīSaṃjñā: false });
    expect(result.applies).toBe(true);
    expect(result.sanjna).toBe('ghi');
  });

  test('should not apply to the word "sakhi"', () => {
    const result = applySutra('sakhi', {});
    expect(result.applies).toBe(false);
  });

  test('should not apply if word is already nadī', () => {
    const result = applySutra('mati', { hasNadīSaṃjñā: true });
    expect(result.applies).toBe(false);
  });

  test('should not apply to words with other endings', () => {
    const result = applySutra('rāma', {});
    expect(result.applies).toBe(false);
  });

  // Additional edge cases for better coverage
  test('should handle null/undefined input', () => {
    const resultNull = applySutra(null, {});
    expect(resultNull.applies).toBe(false);
    expect(resultNull.reason).toBe('Invalid input');

    const resultUndefined = applySutra(undefined, {});
    expect(resultUndefined.applies).toBe(false);
    expect(resultUndefined.reason).toBe('Invalid input');
  });

  test('should handle empty string input', () => {
    const result = applySutra('', {});
    expect(result.applies).toBe(false);
    expect(result.reason).toBe('Invalid input');
  });

  test('should handle non-string input', () => {
    const result = applySutra(123, {});
    expect(result.applies).toBe(false);
    expect(result.reason).toBe('Invalid input');
  });

  test('should handle Devanagari sakhi', () => {
    const result = applySutra('सखि', {});
    expect(result.applies).toBe(false);
    expect(result.reason).toBe('sakhi is exempt from ghi saṃjñā');
  });

  test('should handle nadī saṃjñā with different context keys', () => {
    const result1 = applySutra('mati', { hasNadiSamjna: true });
    expect(result1.applies).toBe(false);

    const result2 = applySutra('mati', { saṃjñā: 'nadī' });
    expect(result2.applies).toBe(false);

    const result3 = applySutra('mati', { sanjna: 'nadī' });
    expect(result3.applies).toBe(false);
  });

  test('should handle Devanagari words', () => {
    const result = applySutra('हरि', { hasNadīSaṃjñā: false });
    expect(result.applies).toBe(true);
    expect(result.sanjna).toBe('ghi');
  });
});
