import sutra from './index.js';

describe('Sutra 1.4.64: bhūṣaṇe\'lam', () => {
  const verbs = [
    'kṛ', 'bhū', 'as', 'gam', 'car', 'paṭh', 'likh', 'dṛś', 'smṛ', 'jñā',
    'han', 'dā', 'dhā', 'nī', 'hṛ', 'pac', 'yaj', 'vad', 'vas', 'śī',
  ];
  const ornamentContext = { meaning: 'ornament' };

  // 40 tests
  describe('Positive Cases: "alam" (IAST and Devanagari)', () => {
    verbs.forEach(verb => {
        test(`should identify 'alam' as gati with verb '${verb}' and meaning 'ornament' (IAST)`, () => {
            const context = { ...ornamentContext, verb };
            const result = sutra('alam', context);
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
                reasons: expect.arrayContaining(["Word is 'alam'", "Context meaning is 'ornament'"]),
            });
        });

        test(`should identify 'अलम्' as gati with verb '${verb}' and meaning 'ornament' (Devanagari)`, () => {
            const context = { ...ornamentContext, verb };
            const result = sutra('अलम्', context);
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
                reasons: expect.arrayContaining(["Word is 'अलम्'", "Context meaning is 'ornament'"]),
            });
        });
    });
  });

  // 12 tests
  describe('Negative Cases', () => {
    test('should not apply to "alam" with meaning "enough"', () => {
      const result = sutra('alam', { verb: 'kṛ', meaning: 'enough' });
      expect(result.applies).toBe(false);
    });

    test('should not apply to "alam" with meaning "sufficient"', () => {
      const result = sutra('alam', { verb: 'kṛ', meaning: 'sufficient' });
      expect(result.applies).toBe(false);
    });

    test('should not apply to "alam" without a verb', () => {
      const result = sutra('alam', { meaning: 'ornament' });
      expect(result.applies).toBe(false);
    });

    test('should not apply to a different word', () => {
      const result = sutra('kṛtam', { verb: 'kṛ', meaning: 'ornament' });
      expect(result.applies).toBe(false);
    });

    test('should not apply to "alam" with a similar but unaccepted meaning', () => {
      const result = sutra('alam', { verb: 'kṛ', meaning: 'decoration' });
      expect(result.applies).toBe(false);
    });

    test('should not apply to "alam" with misspelled meaning', () => {
        const result = sutra('alam', { verb: 'kṛ', meaning: 'ornamet' });
        expect(result.applies).toBe(false);
    });

    test('should not apply with no meaning', () => {
        const result = sutra('alam', { verb: 'kṛ' });
        expect(result.applies).toBe(false);
    });

    test('should not apply to "alam" with wrong verb and meaning', () => {
        const result = sutra('alam', { verb: 'gam', meaning: 'enough' });
        expect(result.applies).toBe(false);
    });

    test('should return a reason for non-application', () => {
        const result = sutra('alam', { verb: 'kṛ', meaning: 'enough' });
        expect(result.reasons).toBeDefined();
        expect(result.reasons.length).toBeGreaterThan(0);
    });

    test('should not apply to Devanagari "अलम्" with wrong meaning', () => {
      const result = sutra('अलम्', { verb: 'kṛ', meaning: 'enough' });
      expect(result.applies).toBe(false);
    });

     test('should not apply to Devanagari "अलम्" without a verb', () => {
      const result = sutra('अलम्', { meaning: 'ornament' });
      expect(result.applies).toBe(false);
    });

    test('should not apply to a different Devanagari word', () => {
      const result = sutra('कृतम्', { verb: 'kṛ', meaning: 'ornament' });
      expect(result.applies).toBe(false);
    });
  });

  // 6 tests
  describe('Edge Cases', () => {
    test('should handle null input', () => {
      const result = sutra(null, { verb: 'kṛ', meaning: 'ornament' });
      expect(result.applies).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should handle undefined input', () => {
      const result = sutra(undefined, { verb: 'kṛ', meaning: 'ornament' });
      expect(result.applies).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should handle null context', () => {
      const result = sutra('alam', null);
      expect(result.applies).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should handle empty context', () => {
      const result = sutra('alam', {});
      expect(result.applies).toBe(false);
    });

     test('should handle number as input', () => {
        const result = sutra(123, { verb: 'kṛ', meaning: 'ornament' });
        expect(result.applies).toBe(false);
        expect(result.error).toBeDefined();
    });

    test('should handle object as input', () => {
        const result = sutra({word: 'alam'}, { verb: 'kṛ', meaning: 'ornament' });
        expect(result.applies).toBe(false);
        expect(result.error).toBeDefined();
    });
  });
});
