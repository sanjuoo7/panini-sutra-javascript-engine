import sutra from './index.js';

describe("Sutra 1.4.70: ado'nupadeśe", () => {
  const verbs = [
    'kṛ', 'bhū', 'as', 'gam', 'car', 'paṭh', 'likh', 'dṛś', 'smṛ', 'jñā',
  ];
  const nonInstructionalContext = { isInstructional: false, isAnaphoric: true };

  // 20 tests for adas
  describe('Positive Cases: "adas" (IAST and Devanagari)', () => {
    verbs.forEach(verb => {
      test(`should identify 'adas' as gati with verb '${verb}' (IAST)`, () => {
        const context = { ...nonInstructionalContext, verb };
        const result = sutra('adas', context);
        expect(result).toMatchObject({
          applies: true,
          confidence: expect.any(Number),
          morphological: { category: 'gati', features: expect.arrayContaining(['anaphoric']) },
          semantic: { function: 'referential', type: 'anaphoric' },
          reasons: expect.arrayContaining(["Word is 'adas'"]),
        });
      });

      test(`should identify 'अदस्' as gati with verb '${verb}' (Devanagari)`, () => {
        const context = { ...nonInstructionalContext, verb };
        const result = sutra('अदस्', context);
        expect(result).toMatchObject({
          applies: true,
          confidence: expect.any(Number),
          morphological: { category: 'gati', features: expect.arrayContaining(['anaphoric']) },
          semantic: { function: 'referential', type: 'anaphoric' },
          reasons: expect.arrayContaining(["Word is 'अदस्'"]),
        });
      });
    });
  });

  // 20 tests for ado
  describe('Positive Cases: "ado" (IAST and Devanagari)', () => {
    verbs.forEach(verb => {
        test(`should identify 'ado' as gati with verb '${verb}' (IAST)`, () => {
            const context = { ...nonInstructionalContext, verb };
            const result = sutra('ado', context);
            expect(result).toMatchObject({
                applies: true,
                confidence: expect.any(Number),
                morphological: { category: 'gati', features: expect.arrayContaining(['anaphoric']) },
                semantic: { function: 'referential', type: 'anaphoric' },
                reasons: expect.arrayContaining(["Word is 'ado'"]),
            });
        });

        test(`should identify 'अदो' as gati with verb '${verb}' (Devanagari)`, () => {
            const context = { ...nonInstructionalContext, verb };
            const result = sutra('अदो', context);
            expect(result).toMatchObject({
                applies: true,
                confidence: expect.any(Number),
                morphological: { category: 'gati', features: expect.arrayContaining(['anaphoric']) },
                semantic: { function: 'referential', type: 'anaphoric' },
                reasons: expect.arrayContaining(["Word is 'अदो'"]),
            });
        });
    });
  });

  // 12 tests
  describe('Negative Cases', () => {
    test('should not apply to "adas" in instructional context', () => {
      const result = sutra('adas', { verb: 'paśya', isInstructional: true, isAnaphoric: false });
      expect(result.applies).toBe(false);
    });

    test('should not apply to "adas" without a verb', () => {
      const result = sutra('adas', { isInstructional: false, isAnaphoric: true });
      expect(result.applies).toBe(false);
    });

    test('should not apply to a different word', () => {
      const result = sutra('anyaword', { verb: 'kṛ', isInstructional: false, isAnaphoric: true });
      expect(result.applies).toBe(false);
    });

    test('should return a reason for non-application', () => {
        const result = sutra('adas', { verb: 'paśya', isInstructional: true, isAnaphoric: false });
        expect(result.reasons).toBeDefined();
    });

    test('should not apply to Devanagari "अदस्" in instructional context', () => {
        const result = sutra('अदस्', { verb: 'paśya', isInstructional: true, isAnaphoric: false });
        expect(result.applies).toBe(false);
    });

    test('should not apply to Devanagari "अदस्" without a verb', () => {
        const result = sutra('अदस्', { isInstructional: false, isAnaphoric: true });
        expect(result.applies).toBe(false);
    });

    test('should not apply to a different Devanagari word', () => {
        const result = sutra('अन्य', { verb: 'kṛ', isInstructional: false, isAnaphoric: true });
        expect(result.applies).toBe(false);
    });

    test('should not apply if context is missing isUpadeśa', () => {
        const result = sutra('adas', { verb: 'kṛ' });
        expect(result.applies).toBe(false);
    });

    test('should not apply to "ado" in instructional context', () => {
        const result = sutra('ado', { verb: 'paśya', isUpadeśa: true });
        expect(result.applies).toBe(false);
    });

    test('should not apply to "ado" without a verb', () => {
        const result = sutra('ado', { isUpadeśa: false });
        expect(result.applies).toBe(false);
    });

    test('should not apply to Devanagari "अदो" in instructional context', () => {
        const result = sutra('अदो', { verb: 'paśya', isUpadeśa: true });
        expect(result.applies).toBe(false);
    });

    test('should not apply to Devanagari "अदो" without a verb', () => {
        const result = sutra('अदो', { isUpadeśa: false });
        expect(result.applies).toBe(false);
    });
  });

  // 6 tests
  describe('Edge Cases', () => {
    test('should handle null input', () => {
      const result = sutra(null, nonInstructionalContext);
      expect(result.applies).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should handle undefined input', () => {
      const result = sutra(undefined, nonInstructionalContext);
      expect(result.applies).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should handle null context', () => {
      const result = sutra('adas', null);
      expect(result.applies).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should handle empty context', () => {
      const result = sutra('adas', {});
      expect(result.applies).toBe(false);
    });

    test('should handle number as input', () => {
        const result = sutra(123, nonInstructionalContext);
        expect(result.applies).toBe(false);
        expect(result.error).toBeDefined();
    });

    test('should handle object as input', () => {
        const result = sutra({word: 'adas'}, nonInstructionalContext);
        expect(result.applies).toBe(false);
        expect(result.error).toBeDefined();
    });

    test('should handle null context', () => {
        const result = sutra('adas', null);
        expect(result.applies).toBe(false);
        expect(result.error).toBeDefined();
    });

    test('should handle invalid context type', () => {
        const result = sutra('adas', 'invalid-context');
        expect(result.applies).toBe(false);
        expect(result.error).toBeDefined();
    });

    test('should handle missing isInstructional and isAnaphoric flags', () => {
        const result = sutra('adas', { verb: 'kṛ' });
        expect(result.applies).toBe(false);
    });

    test('should handle empty verb in context', () => {
        const result = sutra('adas', { verb: '', isInstructional: false, isAnaphoric: true });
        expect(result.applies).toBe(false);
    });

    test('should handle whitespace-only input', () => {
        const result = sutra('   ', { verb: 'kṛ', isInstructional: false, isAnaphoric: true });
        expect(result.applies).toBe(false);
        expect(result.error).toBeDefined();
    });
  });
});
