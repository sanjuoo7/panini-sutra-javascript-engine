import sutra from './index.js';

describe('Sutra 1.4.63: ādarānādarayoḥ sadasatī', () => {
  const verbs = ['kṛ', 'bhū', 'gam', 'car', 'pūj'];

  // Positive cases for 'sat'
  verbs.forEach(verb => {
    test(`should identify 'sat' as gati with verb '${verb}' and meaning 'respect' (IAST)`, () => {
      const result = sutra('sat', { verb, meaning: 'respect' });
      expect(result).toEqual({ applies: true, word: 'sat', term: 'gati' });
    });

    test(`should identify 'सत्' as gati with verb '${verb}' and meaning 'respect' (Devanagari)`, () => {
      const result = sutra('सत्', { verb, meaning: 'respect' });
      expect(result).toEqual({ applies: true, word: 'सत्', term: 'gati' });
    });
  });

  // Positive cases for 'asat'
  verbs.forEach(verb => {
    test(`should identify 'asat' as gati with verb '${verb}' and meaning 'disrespect' (IAST)`, () => {
      const result = sutra('asat', { verb, meaning: 'disrespect' });
      expect(result).toEqual({ applies: true, word: 'asat', term: 'gati' });
    });

    test(`should identify 'असत्' as gati with verb '${verb}' and meaning 'disrespect' (Devanagari)`, () => {
      const result = sutra('असत्', { verb, meaning: 'disrespect' });
      expect(result).toEqual({ applies: true, word: 'असत्', term: 'gati' });
    });
  });

  // Additional positive cases to reach 50 tests
  const extraVerbs = ['paṭh', 'likh', 'dṛś', 'smṛ', 'jñā'];
  extraVerbs.forEach(verb => {
    test(`should identify 'sat' as gati with extra verb '${verb}' (IAST)`, () => {
      const result = sutra('sat', { verb, meaning: 'respect' });
      expect(result).toEqual({ applies: true, word: 'sat', term: 'gati' });
    });
    test(`should identify 'सत्' as gati with extra verb '${verb}' (Devanagari)`, () => {
      const result = sutra('सत्', { verb, meaning: 'respect' });
      expect(result).toEqual({ applies: true, word: 'सत्', term: 'gati' });
    });
    test(`should identify 'asat' as gati with extra verb '${verb}' (IAST)`, () => {
      const result = sutra('asat', { verb, meaning: 'disrespect' });
      expect(result).toEqual({ applies: true, word: 'asat', term: 'gati' });
    });
    test(`should identify 'असत्' as gati with extra verb '${verb}' (Devanagari)`, () => {
      const result = sutra('असत्', { verb, meaning: 'disrespect' });
      expect(result).toEqual({ applies: true, word: 'असत्', term: 'gati' });
    });
  });


  // Negative cases
  test('should not apply to "sat" with a different meaning', () => {
    const result = sutra('sat', { verb: 'bhū', meaning: 'existence' });
    expect(result).toEqual({ applies: false, reason: "Meaning is not 'respect'" });
  });

  test('should not apply to "asat" with a different meaning', () => {
    const result = sutra('asat', { verb: 'bhū', meaning: 'non-existence' });
    expect(result).toEqual({ applies: false, reason: "Meaning is not 'disrespect'" });
  });

  test('should not apply to "sat" without a verb', () => {
    const result = sutra('sat', { meaning: 'respect' });
    expect(result).toEqual({ applies: false, reason: 'Verb context missing' });
  });

  test('should not apply to "asat" without a verb', () => {
    const result = sutra('asat', { meaning: 'disrespect' });
    expect(result).toEqual({ applies: false, reason: 'Verb context missing' });
  });

  test('should not apply to a different word', () => {
    const result = sutra('manas', { verb: 'kṛ', meaning: 'respect' });
    expect(result).toEqual({ applies: false });
  });

  // Edge cases
  test('should handle null input', () => {
    const result = sutra(null, { verb: 'kṛ', meaning: 'respect' });
    expect(result).toEqual({ applies: false, reason: 'Invalid input' });
  });

  test('should handle undefined input', () => {
    const result = sutra(undefined, { verb: 'kṛ', meaning: 'respect' });
    expect(result).toEqual({ applies: false, reason: 'Invalid input' });
  });

  test('should handle null context', () => {
    const result = sutra('sat', null);
    expect(result).toEqual({ applies: false, reason: 'Context missing' });
  });

  test('should handle empty context', () => {
    const result = sutra('sat', {});
    expect(result).toEqual({ applies: false, reason: 'Verb context missing' });
  });

  test('should handle misspelled meaning', () => {
    const result = sutra('sat', { verb: 'kṛ', meaning: 'respec' });
    expect(result).toEqual({ applies: false, reason: "Meaning is not 'respect'" });
  });
});
