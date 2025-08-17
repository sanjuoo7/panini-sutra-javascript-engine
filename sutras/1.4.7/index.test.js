import applySutra from './index';

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
});
