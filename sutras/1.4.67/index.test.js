import sutra from './index.js';

describe("Sutra 1.4.67: puro'vyayam", () => {
  const verbs = [
    'kṛ', 'bhū', 'as', 'gam', 'car', 'paṭh', 'likh', 'dṛś', 'smṛ', 'jñā',
  ];
  const avyayamContext = { isAvyayam: true };

  // 20 tests for puras
  describe('Positive Cases: "puras" (IAST and Devanagari)', () => {
    verbs.forEach(verb => {
      test(`should identify 'puras' as gati with verb '${verb}' (IAST)`, () => {
        const context = { ...avyayamContext, verb };
        const result = sutra('puras', context);
        expect(result).toMatchObject({
          applies: true,
          confidence: expect.any(Number),
          morphological: { category: 'gati', features: expect.arrayContaining(['indeclinable']) },
          semantic: { function: 'pre-verb', type: 'locative' },
          reasons: expect.arrayContaining(["Word is 'puras'", "Word is an indeclinable"]),
        });
      });

      test(`should identify 'पुरस्' as gati with verb '${verb}' (Devanagari)`, () => {
        const context = { ...avyayamContext, verb };
        const result = sutra('पुरस्', context);
        expect(result).toMatchObject({
          applies: true,
          confidence: expect.any(Number),
          morphological: { category: 'gati', features: expect.arrayContaining(['indeclinable']) },
          semantic: { function: 'pre-verb', type: 'locative' },
          reasons: expect.arrayContaining(["Word is 'पुरस्'", "Word is an indeclinable"]),
        });
      });
    });
  });

  // 20 tests for puraḥ
  describe('Positive Cases: "puraḥ" (IAST and Devanagari)', () => {
    verbs.forEach(verb => {
        test(`should identify 'puraḥ' as gati with verb '${verb}' (IAST)`, () => {
            const context = { ...avyayamContext, verb };
            const result = sutra('puraḥ', context);
            expect(result).toMatchObject({
                applies: true,
                confidence: expect.any(Number),
                morphological: { category: 'gati', features: expect.arrayContaining(['indeclinable']) },
                semantic: { function: 'pre-verb', type: 'locative' },
                reasons: expect.arrayContaining(["Word is 'puraḥ'", "Word is an indeclinable"]),
            });
        });

        test(`should identify 'पुरः' as gati with verb '${verb}' (Devanagari)`, () => {
            const context = { ...avyayamContext, verb };
            const result = sutra('पुरः', context);
            expect(result).toMatchObject({
                applies: true,
                confidence: expect.any(Number),
                morphological: { category: 'gati', features: expect.arrayContaining(['indeclinable']) },
                semantic: { function: 'pre-verb', type: 'locative' },
                reasons: expect.arrayContaining(["Word is 'पुरः'", "Word is an indeclinable"]),
            });
        });
    });
  });

  // 12 tests
  describe('Negative Cases', () => {
    test('should not apply to "puras" when it is not an avyayam', () => {
      const result = sutra('puras', { verb: 'kṛ', isAvyayam: false });
      expect(result.applies).toBe(false);
    });

    test('should not apply to "puras" without a verb', () => {
      const result = sutra('puras', { isAvyayam: true });
      expect(result.applies).toBe(false);
    });

    test('should not apply to a different word', () => {
      const result = sutra('anyaword', { verb: 'kṛ', isAvyayam: true });
      expect(result.applies).toBe(false);
    });

    test('should return a reason for non-application', () => {
        const result = sutra('puras', { verb: 'kṛ', isAvyayam: false });
        expect(result.reasons).toBeDefined();
    });

    test('should not apply to Devanagari "पुरस्" when not avyayam', () => {
        const result = sutra('पुरस्', { verb: 'kṛ', isAvyayam: false });
        expect(result.applies).toBe(false);
    });

    test('should not apply to Devanagari "पुरस्" without a verb', () => {
        const result = sutra('पुरस्', { isAvyayam: true });
        expect(result.applies).toBe(false);
    });

    test('should not apply to a different Devanagari word', () => {
        const result = sutra('अन्य', { verb: 'kṛ', isAvyayam: true });
        expect(result.applies).toBe(false);
    });

    test('should not apply to "puraḥ" when it is not an avyayam', () => {
        const result = sutra('puraḥ', { verb: 'kṛ', isAvyayam: false });
        expect(result.applies).toBe(false);
    });

    test('should not apply to "puraḥ" without a verb', () => {
        const result = sutra('puraḥ', { isAvyayam: true });
        expect(result.applies).toBe(false);
    });

    test('should not apply to Devanagari "पुरः" when not avyayam', () => {
        const result = sutra('पुरः', { verb: 'kṛ', isAvyayam: false });
        expect(result.applies).toBe(false);
    });

    test('should not apply to Devanagari "पुरः" without a verb', () => {
        const result = sutra('पुरः', { isAvyayam: true });
        expect(result.applies).toBe(false);
    });

    test('should not apply if context is missing isAvyayam', () => {
        const result = sutra('puras', { verb: 'kṛ' });
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
      const result = sutra('puras', null);
      expect(result.applies).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should handle empty context', () => {
      const result = sutra('puras', {});
      expect(result.applies).toBe(false);
    });

    test('should handle number as input', () => {
        const result = sutra(123, avyayamContext);
        expect(result.applies).toBe(false);
        expect(result.error).toBeDefined();
    });

    test('should handle object as input', () => {
        const result = sutra({word: 'puras'}, avyayamContext);
        expect(result.applies).toBe(false);
        expect(result.error).toBeDefined();
    });
  });
});
