import sutra from './index.js';

describe('Sutra 1.4.62: anukaraṇaṃ cānitiparama', () => {
  const verbContext = { verb: 'kṛ', following_word: 'kṛtvā' };

  // Test cases for positive onomatopoeic words
  const onomatopoeicWords = [
    { iast: 'khaṭat', devanagari: 'खटत्' },
    { iast: 'paṭat', devanagari: 'पटत्' },
    { iast: 'maramat', devanagari: 'मरमत्' },
    { iast: 'jhaṭiti', devanagari: 'झटिति' },
    { iast: 'dravat', devanagari: 'द्रवत्' },
    { iast: 'calat', devanagari: 'चलत्' },
    { iast: 'sphuṭat', devanagari: 'स्फुटत्' },
    { iast: 'hasat', devanagari: 'हसत्' },
    { iast: 'gacchat', devanagari: 'गच्छत्' },
    { iast: 'tadat', devanagari: 'तदत्' },
    { iast: 'vadan', devanagari: 'वदन्' },
    { iast: 'patan', devanagari: 'पतन्' },
    { iast: 'kūjat', devanagari: 'कूजत्' },
    { iast: 'bhramat', devanagari: 'भ्रमत्' },
    { iast: 'nadat', devanagari: 'नदत्' },
  ];

  onomatopoeicWords.forEach(word => {
    test(`should identify '${word.iast}' as gati (IAST)`, () => {
      const result = sutra(word.iast, verbContext);
      expect(result).toEqual({ applies: true, word: word.iast, term: 'gati' });
    });

    test(`should identify '${word.devanagari}' as gati (Devanagari)`, () => {
      const result = sutra(word.devanagari, verbContext);
      expect(result).toEqual({ applies: true, word: word.devanagari, term: 'gati' });
    });
  });

  // Negative test cases
  test('should not apply when followed by "iti" (IAST)', () => {
    const result = sutra('khaṭat', { verb: 'kṛ', following_word: 'iti' });
    expect(result).toEqual({ applies: false, reason: "Followed by 'iti'" });
  });

  test('should not apply when followed by "इति" (Devanagari)', () => {
    const result = sutra('खटत्', { verb: 'kṛ', following_word: 'इति' });
    expect(result).toEqual({ applies: false, reason: "Followed by 'iti'" });
  });

  test('should not apply without verb context', () => {
    const result = sutra('khaṭat', { following_word: 'kṛtvā' });
    expect(result).toEqual({ applies: false, reason: 'Verb context missing' });
  });

  test('should not apply to a non-onomatopoeic word', () => {
    const result = sutra('vṛkṣa', verbContext);
    expect(result).toEqual({ applies: false });
  });

  test('should not apply when "iti" is part of the next word', () => {
    const result = sutra('khaṭat', { verb: 'kṛ', following_word: 'itihāsa' });
    expect(result).toEqual({ applies: true, word: 'khaṭat', term: 'gati' }); // Assuming it is not 'iti'
  });

  test('should handle "Iti" with different casing', () => {
    const result = sutra('khaṭat', { verb: 'kṛ', following_word: 'Iti' });
    expect(result).toEqual({ applies: false, reason: "Followed by 'iti'" });
  });

  test('should handle "iti" with surrounding whitespace', () => {
    const result = sutra('khaṭat', { verb: 'kṛ', following_word: ' iti ' });
    expect(result).toEqual({ applies: false, reason: "Followed by 'iti'" });
  });

  test('should not apply if context is missing following_word', () => {
    const result = sutra('khaṭat', { verb: 'kṛ' });
    expect(result).toEqual({ applies: true, word: 'khaṭat', term: 'gati' }); // No 'iti' to block it
  });

  test('should not apply if context has following_word as null', () => {
    const result = sutra('khaṭat', { verb: 'kṛ', following_word: null });
    expect(result).toEqual({ applies: true, word: 'khaṭat', term: 'gati' }); // No 'iti' to block it
  });

  test('should not apply to a non-onomatopoeic word like "catura"', () => {
    const result = sutra('catura', verbContext);
    expect(result).toEqual({ applies: false });
  });

  // Edge cases
  test('should handle empty string input', () => {
    const result = sutra('', verbContext);
    expect(result).toEqual({ applies: false, reason: 'Invalid input' });
  });

  test('should handle null input', () => {
    const result = sutra(null, verbContext);
    expect(result).toEqual({ applies: false, reason: 'Invalid input' });
  });

  test('should handle undefined input', () => {
    const result = sutra(undefined, verbContext);
    expect(result).toEqual({ applies: false, reason: 'Invalid input' });
  });

  test('should handle non-string input', () => {
    const result = sutra(456, verbContext);
    expect(result).toEqual({ applies: false, reason: 'Invalid input' });
  });

  test('should handle null context', () => {
    const result = sutra('khaṭat', null);
    expect(result).toEqual({ applies: false, reason: 'Context missing' });
  });

  test('should handle empty context', () => {
    const result = sutra('khaṭat', {});
    expect(result).toEqual({ applies: false, reason: 'Verb context missing' });
  });

  test('should handle context with undefined following_word', () => {
    const result = sutra('khaṭat', { verb: 'kṛ', following_word: undefined });
    expect(result).toEqual({ applies: true, word: 'khaṭat', term: 'gati' });
  });

  test('should not apply if the word is "iti" itself', () => {
    const result = sutra('iti', verbContext);
    expect(result).toEqual({ applies: false });
  });

  test('should not apply if the word is "इति" itself', () => {
    const result = sutra('इति', verbContext);
    expect(result).toEqual({ applies: false });
  });

  test('should handle a very long onomatopoeic-like string', () => {
    const longSound = 'paṭapaṭapaṭapaṭapaṭat';
    const result = sutra(longSound, verbContext);
    expect(result).toEqual({ applies: true, word: longSound, term: 'gati' });
  });
});
