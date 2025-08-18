import sutra from './index.js';

describe('Sutra 1.4.65: antaraparigrahe', () => {
  const verbs = [
    'kṛ', 'bhū', 'as', 'gam', 'car', 'paṭh', 'likh', 'dṛś', 'smṛ', 'jñā',
    'han', 'dā', 'dhā', 'nī', 'hṛ', 'pac', 'yaj', 'vad', 'vas', 'śī',
  ];
  const nonAcceptanceContext = { meaning: 'non-acceptance' };

  // 40 tests
  describe('Positive Cases: "antar" (IAST and Devanagari)', () => {
    verbs.forEach(verb => {
      test(`should identify 'antar' as gati with verb '${verb}' and meaning 'non-acceptance' (IAST)`, () => {
        const context = { ...nonAcceptanceContext, verb };
        const result = sutra('antar', context);
        expect(result).toMatchObject({
          applies: true,
          confidence: expect.any(Number),
          morphological: {
            category: 'gati',
            features: expect.arrayContaining(['indeclinable']),
          },
          semantic: {
            function: 'pre-verb',
            type: 'qualifier',
          },
          reasons: expect.arrayContaining(["Word is 'antar'", "Context meaning is 'non-acceptance'"]),
        });
      });

      test(`should identify 'अन्तर्' as gati with verb '${verb}' and meaning 'non-acceptance' (Devanagari)`, () => {
        const context = { ...nonAcceptanceContext, verb };
        const result = sutra('अन्तर्', context);
        expect(result).toMatchObject({
          applies: true,
          confidence: expect.any(Number),
          morphological: {
            category: 'gati',
            features: expect.arrayContaining(['indeclinable']),
          },
          semantic: {
            function: 'pre-verb',
            type: 'qualifier',
          },
          reasons: expect.arrayContaining(["Word is 'अन्तर्'", "Context meaning is 'non-acceptance'"]),
        });
      });
    });
  });

  // 12 tests
  describe('Negative Cases', () => {
    test('should not apply to "antar" with meaning "inside"', () => {
      const result = sutra('antar', { verb: 'gam', meaning: 'inside' });
      expect(result.applies).toBe(false);
    });

    test('should not apply to "antar" with meaning "between"', () => {
      const result = sutra('antar', { verb: 'gam', meaning: 'between' });
      expect(result.applies).toBe(false);
    });

    test('should not apply to "antar" without a verb', () => {
      const result = sutra('antar', { meaning: 'non-acceptance' });
      expect(result.applies).toBe(false);
    });

    test('should not apply to a different word', () => {
      const result = sutra('bahis', { verb: 'gam', meaning: 'non-acceptance' });
      expect(result.applies).toBe(false);
    });

    test('should not apply to "antar" with meaning "internal"', () => {
      const result = sutra('antar', { verb: 'bhū', meaning: 'internal' });
      expect(result.applies).toBe(false);
    });

    test('should not apply to "antar" with misspelled meaning', () => {
      const result = sutra('antar', { verb: 'kṛ', meaning: 'non-acceptanc' });
      expect(result.applies).toBe(false);
    });

    test('should not apply with no meaning', () => {
      const result = sutra('antar', { verb: 'kṛ' });
      expect(result.applies).toBe(false);
    });

    test('should not apply to "antar" with wrong verb and meaning', () => {
      const result = sutra('antar', { verb: 'gam', meaning: 'inside' });
      expect(result.applies).toBe(false);
    });

    test('should return a reason for non-application', () => {
      const result = sutra('antar', { verb: 'gam', meaning: 'inside' });
      expect(result.reasons).toBeDefined();
      expect(result.reasons.length).toBeGreaterThan(0);
    });

    test('should not apply to Devanagari "अन्तर्" with wrong meaning', () => {
      const result = sutra('अन्तर्', { verb: 'gam', meaning: 'inside' });
      expect(result.applies).toBe(false);
    });

    test('should not apply to Devanagari "अन्तर्" without a verb', () => {
      const result = sutra('अन्तर्', { meaning: 'non-acceptance' });
      expect(result.applies).toBe(false);
    });

    test('should not apply to a different Devanagari word', () => {
      const result = sutra('बहिस्', { verb: 'gam', meaning: 'non-acceptance' });
      expect(result.applies).toBe(false);
    });
  });

  // 6 tests
  describe('Edge Cases', () => {
    test('should handle null input', () => {
      const result = sutra(null, { verb: 'kṛ', meaning: 'non-acceptance' });
      expect(result.applies).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should handle undefined input', () => {
      const result = sutra(undefined, { verb: 'kṛ', meaning: 'non-acceptance' });
      expect(result.applies).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should handle null context', () => {
      const result = sutra('antar', null);
      expect(result.applies).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should handle empty context', () => {
      const result = sutra('antar', {});
      expect(result.applies).toBe(false);
    });

    test('should handle number as input', () => {
      const result = sutra(123, { verb: 'kṛ', meaning: 'non-acceptance' });
      expect(result.applies).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should handle object as input', () => {
      const result = sutra({ word: 'antar' }, { verb: 'kṛ', meaning: 'non-acceptance' });
      expect(result.applies).toBe(false);
      expect(result.error).toBeDefined();
    });
  });
});
