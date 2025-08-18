import sutra from './index.js';

describe('Sutra 1.4.66: kaṇemanasī śraddhāpratīghāte', () => {
  const verbs = [
    'kṛ', 'han', 'bhū', 'as', 'gam', 'car', 'paṭh', 'likh', 'dṛś', 'smṛ',
  ];
  const satiationContext = { meaning: 'śraddhāpratīghāta' };

  // 20 tests for kaṇe
  describe('Positive Cases: "kaṇe" (IAST and Devanagari)', () => {
    verbs.forEach(verb => {
      test(`should identify 'kaṇe' as gati with verb '${verb}' (IAST)`, () => {
        const context = { ...satiationContext, verb };
        const result = sutra('kaṇe', context);
        expect(result).toMatchObject({
          applies: true,
          confidence: expect.any(Number),
          morphological: { category: 'gati', features: expect.arrayContaining(['indeclinable']) },
          semantic: { function: 'pre-verb', type: 'qualifier' },
          reasons: expect.arrayContaining(["Word is 'kaṇe'", "Context meaning is 'śraddhāpratīghāta'"]),
        });
      });

      test(`should identify 'कणे' as gati with verb '${verb}' (Devanagari)`, () => {
        const context = { ...satiationContext, verb };
        const result = sutra('कणे', context);
        expect(result).toMatchObject({
          applies: true,
          confidence: expect.any(Number),
          morphological: { category: 'gati', features: expect.arrayContaining(['indeclinable']) },
          semantic: { function: 'pre-verb', type: 'qualifier' },
          reasons: expect.arrayContaining(["Word is 'कणे'", "Context meaning is 'śraddhāpratīghāta'"]),
        });
      });
    });
  });

  // 20 tests for manas
  describe('Positive Cases: "manas" (IAST and Devanagari)', () => {
    verbs.forEach(verb => {
      test(`should identify 'manas' as gati with verb '${verb}' (IAST)`, () => {
        const context = { ...satiationContext, verb };
        const result = sutra('manas', context);
        expect(result).toMatchObject({
          applies: true,
          confidence: expect.any(Number),
          morphological: { category: 'gati', features: expect.arrayContaining(['indeclinable']) },
          semantic: { function: 'pre-verb', type: 'qualifier' },
          reasons: expect.arrayContaining(["Word is 'manas'", "Context meaning is 'śraddhāpratīghāta'"]),
        });
      });

      test(`should identify 'मनस्' as gati with verb '${verb}' (Devanagari)`, () => {
        const context = { ...satiationContext, verb };
        const result = sutra('मनस्', context);
        expect(result).toMatchObject({
          applies: true,
          confidence: expect.any(Number),
          morphological: { category: 'gati', features: expect.arrayContaining(['indeclinable']) },
          semantic: { function: 'pre-verb', type: 'qualifier' },
          reasons: expect.arrayContaining(["Word is 'मनस्'", "Context meaning is 'śraddhāpratīghāta'"]),
        });
      });
    });
  });

  // 12 tests
  describe('Negative Cases', () => {
    test('should not apply to "kaṇe" with a different meaning', () => {
      const result = sutra('kaṇe', { verb: 'han', meaning: 'other' });
      expect(result.applies).toBe(false);
    });

    test('should not apply to "manas" with a different meaning', () => {
      const result = sutra('manas', { verb: 'kṛ', meaning: 'mind' });
      expect(result.applies).toBe(false);
    });

    test('should not apply to "kaṇe" without a verb', () => {
      const result = sutra('kaṇe', { meaning: 'śraddhāpratīghāta' });
      expect(result.applies).toBe(false);
    });

    test('should not apply to "manas" without a verb', () => {
      const result = sutra('manas', { meaning: 'śraddhāpratīghāta' });
      expect(result.applies).toBe(false);
    });

    test('should not apply to a different word', () => {
      const result = sutra('anyaword', { verb: 'kṛ', meaning: 'śraddhāpratīghāta' });
      expect(result.applies).toBe(false);
    });

    test('should not apply to "kaṇe" with misspelled meaning', () => {
      const result = sutra('kaṇe', { verb: 'han', meaning: 'śraddhāpratīghāte' });
      expect(result.applies).toBe(false);
    });

    test('should return a reason for non-application', () => {
      const result = sutra('manas', { verb: 'kṛ', meaning: 'mind' });
      expect(result.reasons).toBeDefined();
    });

    test('should not apply to Devanagari "कणे" with wrong meaning', () => {
      const result = sutra('कणे', { verb: 'han', meaning: 'other' });
      expect(result.applies).toBe(false);
    });

    test('should not apply to Devanagari "मनस्" with wrong meaning', () => {
      const result = sutra('मनस्', { verb: 'kṛ', meaning: 'mind' });
      expect(result.applies).toBe(false);
    });

    test('should not apply to Devanagari "कणे" without a verb', () => {
      const result = sutra('कणे', { meaning: 'śraddhāpratīghāta' });
      expect(result.applies).toBe(false);
    });

    test('should not apply to Devanagari "मनस्" without a verb', () => {
      const result = sutra('मनस्', { meaning: 'śraddhāpratīghāta' });
      expect(result.applies).toBe(false);
    });

    test('should not apply to a different Devanagari word', () => {
        const result = sutra('अन्य', { verb: 'kṛ', meaning: 'śraddhāpratīghāta' });
        expect(result.applies).toBe(false);
    });
  });

  // 6 tests
  describe('Edge Cases', () => {
    test('should handle null input', () => {
      const result = sutra(null, satiationContext);
      expect(result.applies).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should handle undefined input', () => {
      const result = sutra(undefined, satiationContext);
      expect(result.applies).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should handle null context', () => {
      const result = sutra('kaṇe', null);
      expect(result.applies).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should handle empty context', () => {
      const result = sutra('manas', {});
      expect(result.applies).toBe(false);
    });

    test('should handle number as input', () => {
        const result = sutra(123, satiationContext);
        expect(result.applies).toBe(false);
        expect(result.error).toBeDefined();
    });

    test('should handle object as input', () => {
        const result = sutra({word: 'kaṇe'}, satiationContext);
        expect(result.applies).toBe(false);
        expect(result.error).toBeDefined();
    });
  });
});
