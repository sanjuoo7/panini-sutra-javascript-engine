import sutra from './index.js';

describe('Sutra 1.4.61: ūrayādicaviḍācaśaca', () => {
  const verbContext = { verb: 'kṛ' };

  // Test cases for the 'ūri' list
  const uriListWords = [
    { iast: 'ūrī', devanagari: 'ऊरी' },
    { iast: 'ūrari', devanagari: 'ऊररी' },
    { iast: 'āviḥ', devanagari: 'आविः' },
    { iast: 'sākṣāt', devanagari: 'साक्षात्' },
    { iast: 'prādus', devanagari: 'प्रादुस्' },
    { iast: 'śrad', devanagari: 'श्रद्' },
    { iast: 'alam', devanagari: 'अलम्' },
    { iast: 'vaṣaṭ', devanagari: 'वषट्' },
    { iast: 'śrauṣaṭ', devanagari: 'श्रौषट्' },
    { iast: 'svāhā', devanagari: 'स्वाहा' },
  ];

  uriListWords.forEach(word => {
    test(`should identify '${word.iast}' from ūri list as gati (IAST)`, () => {
      const result = sutra(word.iast, verbContext);
      expect(result).toEqual({ applies: true, word: word.iast, term: 'gati' });
    });

    test(`should identify '${word.devanagari}' from ūri list as gati (Devanagari)`, () => {
      const result = sutra(word.devanagari, verbContext);
      expect(result).toEqual({ applies: true, word: word.devanagari, term: 'gati' });
    });
  });

  // Test cases for the 'cvi' suffix
  const cviSuffixWords = [
    { iast: 'śuklī', devanagari: 'शुक्ली' },
    { iast: 'kṛṣṇī', devanagari: 'कृष्णी' },
    { iast: 'aruṇī', devanagari: 'अरुणी' },
    { iast: 'haritī', devanagari: 'हरिती' },
    { iast: 'nīlī', devanagari: 'नीली' },
  ];

  cviSuffixWords.forEach(word => {
    test(`should identify '${word.iast}' with cvi suffix as gati (IAST)`, () => {
      const result = sutra(word.iast, verbContext);
      expect(result).toEqual({ applies: true, word: word.iast, term: 'gati' });
    });

    test(`should identify '${word.devanagari}' with cvi suffix as gati (Devanagari)`, () => {
      const result = sutra(word.devanagari, verbContext);
      expect(result).toEqual({ applies: true, word: word.devanagari, term: 'gati' });
    });
  });

  // Test cases for the 'ḍāc' suffix
  const dacSuffixWords = [
    { iast: 'paṭapaṭā', devanagari: 'पटपटा' },
    { iast: 'ghaṭaghaṭā', devanagari: 'घटघटा' },
    { iast: 'calacalā', devanagari: 'चलचला' },
    { iast: 'dhagadhagā', devanagari: 'धगधगा' },
    { iast: 'phaṭaphaṭā', devanagari: 'फटफटा' },
  ];

  dacSuffixWords.forEach(word => {
    test(`should identify '${word.iast}' with ḍāc suffix as gati (IAST)`, () => {
      const result = sutra(word.iast, verbContext);
      expect(result).toEqual({ applies: true, word: word.iast, term: 'gati' });
    });

    test(`should identify '${word.devanagari}' with ḍāc suffix as gati (Devanagari)`, () => {
      const result = sutra(word.devanagari, verbContext);
      expect(result).toEqual({ applies: true, word: word.devanagari, term: 'gati' });
    });
  });

  // Negative test cases
  test('should not apply to a word not in any category', () => {
    const result = sutra('gaja', verbContext);
    expect(result).toEqual({ applies: false });
  });

  test('should not apply to a word from ūri list without verb context', () => {
    const result = sutra('ūrī');
    expect(result).toEqual({ applies: false, reason: 'Verb context missing' });
  });

  test('should not apply to a word with cvi suffix without verb context', () => {
    const result = sutra('śuklī');
    expect(result).toEqual({ applies: false, reason: 'Verb context missing' });
  });

  test('should not apply to a word with ḍāc suffix without verb context', () => {
    const result = sutra('paṭapaṭā');
    expect(result).toEqual({ applies: false, reason: 'Verb context missing' });
  });

  test('should not apply to a word that looks similar but is not in the lists', () => {
    const result = sutra('sākṣa', verbContext);
    expect(result).toEqual({ applies: false });
  });

  // Edge case test cases
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
    const result = sutra(123, verbContext);
    expect(result).toEqual({ applies: false, reason: 'Invalid input' });
  });

  test('should handle context with null verb', () => {
    const result = sutra('ūrī', { verb: null });
    expect(result).toEqual({ applies: false, reason: 'Verb context missing' });
  });
});
