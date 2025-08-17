import sutra from './index.js';

describe('Sutra 1.4.65: antaraparigrahe', () => {
  const verbs = [
    'kṛ', 'bhū', 'as', 'gam', 'car', 'paṭh', 'likh', 'dṛś', 'smṛ', 'jñā',
    'han', 'dā', 'dhā', 'nī', 'hṛ', 'pac', 'yaj', 'vad', 'vas', 'śī',
  ];
  const nonAcceptanceContext = { meaning: 'non-acceptance' };

  // Positive cases for 'antar'
  verbs.forEach(verb => {
    test(`should identify 'antar' as gati with verb '${verb}' and meaning 'non-acceptance' (IAST)`, () => {
      const context = { ...nonAcceptanceContext, verb };
      const result = sutra('antar', context);
      expect(result).toEqual({ applies: true, word: 'antar', term: 'gati' });
    });

    test(`should identify 'अन्तर्' as gati with verb '${verb}' and meaning 'non-acceptance' (Devanagari)`, () => {
      const context = { ...nonAcceptanceContext, verb };
      const result = sutra('अन्तर्', context);
      expect(result).toEqual({ applies: true, word: 'अन्तर्', term: 'gati' });
    });
  });

  // Negative cases
  test('should not apply to "antar" with meaning "inside"', () => {
    const result = sutra('antar', { verb: 'gam', meaning: 'inside' });
    expect(result).toEqual({ applies: false, reason: "Meaning is not 'non-acceptance'" });
  });

  test('should not apply to "antar" with meaning "between"', () => {
    const result = sutra('antar', { verb: 'gam', meaning: 'between' });
    expect(result).toEqual({ applies: false, reason: "Meaning is not 'non-acceptance'" });
  });

  test('should not apply to "antar" without a verb', () => {
    const result = sutra('antar', { meaning: 'non-acceptance' });
    expect(result).toEqual({ applies: false, reason: 'Verb context missing' });
  });

  test('should not apply to a different word', () => {
    const result = sutra('bahis', { verb: 'gam', meaning: 'non-acceptance' });
    expect(result).toEqual({ applies: false });
  });

  test('should not apply to "antar" with meaning "internal"', () => {
    const result = sutra('antar', { verb: 'bhū', meaning: 'internal' });
    expect(result).toEqual({ applies: false, reason: "Meaning is not 'non-acceptance'" });
  });

  // Edge cases
  test('should handle null input', () => {
    const result = sutra(null, { verb: 'kṛ', meaning: 'non-acceptance' });
    expect(result).toEqual({ applies: false, reason: 'Invalid input' });
  });

  test('should handle undefined input', () => {
    const result = sutra(undefined, { verb: 'kṛ', meaning: 'non-acceptance' });
    expect(result).toEqual({ applies: false, reason: 'Invalid input' });
  });

  test('should handle null context', () => {
    const result = sutra('antar', null);
    expect(result).toEqual({ applies: false, reason: 'Context missing' });
  });

  test('should handle empty context', () => {
    const result = sutra('antar', {});
    expect(result).toEqual({ applies: false, reason: 'Verb context missing' });
  });

  test('should handle misspelled meaning', () => {
    const result = sutra('antar', { verb: 'kṛ', meaning: 'non-acceptanc' });
    expect(result).toEqual({ applies: false, reason: "Meaning is not 'non-acceptance'" });
  });
});
