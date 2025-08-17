import applySutra from './index';

describe('Sutra 1.4.12', () => {
  test('should apply "guru" to a long vowel', () => {
    const syllable = { vowel: 'ā', vowelLength: 'long' };
    const result = applySutra(syllable);
    expect(result.applies).toBe(true);
    expect(result.sanjna).toBe('guru');
  });

  test('should apply "guru" to another long vowel', () => {
    const syllable = { vowel: 'e', vowelLength: 'long' };
    const result = applySutra(syllable);
    expect(result.applies).toBe(true);
    expect(result.sanjna).toBe('guru');
  });

  test('should not apply to a short vowel', () => {
    const syllable = { vowel: 'a', vowelLength: 'short' };
    const result = applySutra(syllable);
    expect(result.applies).toBe(false);
  });
});
