import sutra from './index.js';

describe("Sutra 1.4.68: astaṃ ca", () => {
  const verbs = [
    'gam', 'i', 'kṛ', 'bhū', 'as', 'car', 'paṭh', 'likh', 'dṛś', 'smṛ',
  ];
  const avyayamContext = { isAvyayam: true };

  // 20 tests for astam
  describe('Positive Cases: "astam" (IAST and Devanagari)', () => {
    verbs.forEach(verb => {
      test(`should identify 'astam' as gati with verb '${verb}' (IAST)`, () => {
        const context = { ...avyayamContext, verb };
        const result = sutra('astam', context);
        expect(result).toMatchObject({
          applies: true,
          confidence: expect.any(Number),
          morphological: { category: 'gati', features: expect.arrayContaining(['indeclinable']) },
          semantic: { function: 'pre-verb', type: 'locative' },
          reasons: expect.arrayContaining(["Word is 'astam'", "Word is an indeclinable"]),
        });
      });

      test(`should identify 'अस्तम्' as gati with verb '${verb}' (Devanagari)`, () => {
        const context = { ...avyayamContext, verb };
        const result = sutra('अस्तम्', context);
        expect(result).toMatchObject({
          applies: true,
          confidence: expect.any(Number),
          morphological: { category: 'gati', features: expect.arrayContaining(['indeclinable']) },
          semantic: { function: 'pre-verb', type: 'locative' },
          reasons: expect.arrayContaining(["Word is 'अस्तम्'", "Word is an indeclinable"]),
        });
      });
    });
  });

  // 20 tests for astaṃ
  describe('Positive Cases: "astaṃ" (IAST and Devanagari)', () => {
    verbs.forEach(verb => {
        test(`should identify 'astaṃ' as gati with verb '${verb}' (IAST)`, () => {
            const context = { ...avyayamContext, verb };
            const result = sutra('astaṃ', context);
            expect(result).toMatchObject({
                applies: true,
                confidence: expect.any(Number),
                morphological: { category: 'gati', features: expect.arrayContaining(['indeclinable']) },
                semantic: { function: 'pre-verb', type: 'locative' },
                reasons: expect.arrayContaining(["Word is 'astaṃ'", "Word is an indeclinable"]),
            });
        });

        test(`should identify 'अस्तं' as gati with verb '${verb}' (Devanagari)`, () => {
            const context = { ...avyayamContext, verb };
            const result = sutra('अस्तं', context);
            expect(result).toMatchObject({
                applies: true,
                confidence: expect.any(Number),
                morphological: { category: 'gati', features: expect.arrayContaining(['indeclinable']) },
                semantic: { function: 'pre-verb', type: 'locative' },
                reasons: expect.arrayContaining(["Word is 'अस्तं'", "Word is an indeclinable"]),
            });
        });
    });
  });

  // 12 tests
  describe('Negative Cases', () => {
    test('should not apply to "astam" when it is not an avyayam', () => {
      const result = sutra('astam', { verb: 'gam', isAvyayam: false });
      expect(result.applies).toBe(false);
    });

    test('should not apply to "astam" without a verb', () => {
      const result = sutra('astam', { isAvyayam: true });
      expect(result.applies).toBe(false);
    });

    test('should not apply to a different word', () => {
      const result = sutra('anyaword', { verb: 'gam', isAvyayam: true });
      expect(result.applies).toBe(false);
    });

    test('should return a reason for non-application', () => {
        const result = sutra('astam', { verb: 'gam', isAvyayam: false });
        expect(result.reasons).toBeDefined();
    });

    test('should not apply to Devanagari "अस्तम्" when not avyayam', () => {
        const result = sutra('अस्तम्', { verb: 'gam', isAvyayam: false });
        expect(result.applies).toBe(false);
    });

    test('should not apply to Devanagari "अस्तम्" without a verb', () => {
        const result = sutra('अस्तम्', { isAvyayam: true });
        expect(result.applies).toBe(false);
    });

    test('should not apply to a different Devanagari word', () => {
        const result = sutra('अन्य', { verb: 'gam', isAvyayam: true });
        expect(result.applies).toBe(false);
    });

    test('should not apply if context is missing isAvyayam', () => {
        const result = sutra('astam', { verb: 'gam' });
        expect(result.applies).toBe(false);
    });

     test('should not apply to "astaṃ" when it is not an avyayam', () => {
      const result = sutra('astaṃ', { verb: 'gam', isAvyayam: false });
      expect(result.applies).toBe(false);
    });

    test('should not apply to "astaṃ" without a verb', () => {
      const result = sutra('astaṃ', { isAvyayam: true });
      expect(result.applies).toBe(false);
    });

    test('should not apply to Devanagari "अस्तं" when not avyayam', () => {
        const result = sutra('अस्तं', { verb: 'gam', isAvyayam: false });
        expect(result.applies).toBe(false);
    });

    test('should not apply to Devanagari "अस्तं" without a verb', () => {
        const result = sutra('अस्तं', { isAvyayam: true });
        expect(result.applies).toBe(false);
    });
  });

  // 6 tests
  describe('Edge Cases', () => {
    test('should handle null input', () => {
      const result = sutra(null, avyayamContext);
      expect(result.applies).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should handle undefined input', () => {
      const result = sutra(undefined, avyayamContext);
      expect(result.applies).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should handle null context', () => {
      const result = sutra('astam', null);
      expect(result.applies).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should handle empty context', () => {
      const result = sutra('astam', {});
      expect(result.applies).toBe(false);
    });

    test('should handle number as input', () => {
        const result = sutra(123, avyayamContext);
        expect(result.applies).toBe(false);
        expect(result.error).toBeDefined();
    });

    test('should handle object as input', () => {
        const result = sutra({word: 'astam'}, avyayamContext);
        expect(result.applies).toBe(false);
        expect(result.error).toBeDefined();
    });
  });
});
