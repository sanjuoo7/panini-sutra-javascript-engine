import applySutra from './index';

describe('Sutra 1.4.11', () => {
  test('should apply "guru" to a short vowel followed by a conjunct', () => {
    const syllable = { vowel: 'i', vowelLength: 'short', followedByConjunct: true };
    const result = applySutra(syllable);
    expect(result.applies).toBe(true);
    expect(result.sanjna).toBe('guru');
  });

  test('should not apply to a short vowel not followed by a conjunct', () => {
    const syllable = { vowel: 'a', vowelLength: 'short', followedByConjunct: false };
    const result = applySutra(syllable);
    expect(result.applies).toBe(false);
  });

  test('should not apply to a long vowel', () => {
    // This case is handled by the next sutra (1.4.12)
    const syllable = { vowel: 'ā', vowelLength: 'long', followedByConjunct: true };
    const result = applySutra(syllable);
    expect(result.applies).toBe(false);
  });
});
