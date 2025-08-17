import sutra from './index.js';

describe('Sutra 1.4.64: bhūṣaṇe\'lam', () => {
  const verbs = [
    'kṛ', 'bhū', 'as', 'gam', 'car', 'paṭh', 'likh', 'dṛś', 'smṛ', 'jñā',
    'han', 'dā', 'dhā', 'nī', 'hṛ', 'pac', 'yaj', 'vad', 'vas', 'śī',
  ];
  const ornamentContext = { meaning: 'ornament' };

  // Positive cases for 'alam'
  verbs.forEach(verb => {
    test(`should identify 'alam' as gati with verb '${verb}' and meaning 'ornament' (IAST)`, () => {
      const context = { ...ornamentContext, verb };
      const result = sutra('alam', context);
      expect(result).toEqual({ applies: true, word: 'alam', term: 'gati' });
    });

    test(`should identify 'अलम्' as gati with verb '${verb}' and meaning 'ornament' (Devanagari)`, () => {
      const context = { ...ornamentContext, verb };
      const result = sutra('अलम्', context);
      expect(result).toEqual({ applies: true, word: 'अलम्', term: 'gati' });
    });
  });

  // Negative cases
  test('should not apply to "alam" with meaning "enough"', () => {
    const result = sutra('alam', { verb: 'kṛ', meaning: 'enough' });
    expect(result).toEqual({ applies: false, reason: "Meaning is not 'ornament'" });
  });

  test('should not apply to "alam" with meaning "sufficient"', () => {
    const result = sutra('alam', { verb: 'kṛ', meaning: 'sufficient' });
    expect(result).toEqual({ applies: false, reason: "Meaning is not 'ornament'" });
  });

  test('should not apply to "alam" without a verb', () => {
    const result = sutra('alam', { meaning: 'ornament' });
    expect(result).toEqual({ applies: false, reason: 'Verb context missing' });
  });

  test('should not apply to a different word', () => {
    const result = sutra('kṛtam', { verb: 'kṛ', meaning: 'ornament' });
    expect(result).toEqual({ applies: false });
  });

  test('should not apply to "alam" with a similar but unaccepted meaning', () => {
    const result = sutra('alam', { verb: 'kṛ', meaning: 'decoration' });
    expect(result).toEqual({ applies: false, reason: "Meaning is not 'ornament'" });
  });

  // Edge cases
  test('should handle null input', () => {
    const result = sutra(null, { verb: 'kṛ', meaning: 'ornament' });
    expect(result).toEqual({ applies: false, reason: 'Invalid input' });
  });

  test('should handle undefined input', () => {
    const result = sutra(undefined, { verb: 'kṛ', meaning: 'ornament' });
    expect(result).toEqual({ applies: false, reason: 'Invalid input' });
  });

  test('should handle null context', () => {
    const result = sutra('alam', null);
    expect(result).toEqual({ applies: false, reason: 'Context missing' });
  });

  test('should handle empty context', () => {
    const result = sutra('alam', {});
    expect(result).toEqual({ applies: false, reason: 'Verb context missing' });
  });

  test('should handle misspelled meaning', () => {
    const result = sutra('alam', { verb: 'kṛ', meaning: 'ornamet' });
    expect(result).toEqual({ applies: false, reason: "Meaning is not 'ornament'" });
  });
});
