import applySutra from './index';

describe('Sutra 1.4.10', () => {
  test('should apply "laghu" to a short vowel', () => {
    const result = applySutra({ vowel: 'a', vowelLength: 'short' });
    expect(result.applies).toBe(true);
    expect(result.sanjna).toBe('laghu');
  });

  test('should apply "laghu" to another short vowel', () => {
    const result = applySutra({ vowel: 'i', vowelLength: 'short' });
    expect(result.applies).toBe(true);
    expect(result.sanjna).toBe('laghu');
  });

  test('should not apply to a long vowel', () => {
    const result = applySutra({ vowel: 'ā', vowelLength: 'long' });
    expect(result.applies).toBe(false);
  });

  test('should not apply if vowel length is not short', () => {
    const result = applySutra({ vowel: 'e', vowelLength: 'long' });
    expect(result.applies).toBe(false);
  });
});
