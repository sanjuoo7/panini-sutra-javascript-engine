import sutra from './index.js';

describe("Sutra 1.4.69: accha gatyarthavadeṣu", () => {
  const motionVerbs = [
    'gam', 'i', 'car', 'sarpa', 'dhāv', 'kram', 'cal', 'yā', 'vraj', 'sṛ',
  ];
  const otherVerbs = [
    'pac', 'paṭh', 'likh', 'dṛś', 'smṛ', 'jñā', 'han', 'dā', 'dhā', 'nī',
  ];

  // 20 tests for motion verbs
  describe('Positive Cases: "accha" with motion verbs (IAST and Devanagari)', () => {
    motionVerbs.forEach(verb => {
      test(`should identify 'accha' as gati with motion verb '${verb}' (IAST)`, () => {
        const context = { verb, hasMotionSense: true };
        const result = sutra('accha', context);
        expect(result).toMatchObject({
          applies: true,
          confidence: expect.any(Number),
          morphological: { category: 'gati', features: expect.arrayContaining(['directional']) },
          semantic: { function: 'pre-verb', type: 'directional' },
          reasons: expect.arrayContaining(["Word is 'accha'"]),
        });
      });

      test(`should identify 'अच्छ' as gati with motion verb '${verb}' (Devanagari)`, () => {
        const context = { verb, hasMotionSense: true };
        const result = sutra('अच्छ', context);
        expect(result).toMatchObject({
          applies: true,
          confidence: expect.any(Number),
          morphological: { category: 'gati', features: expect.arrayContaining(['directional']) },
          semantic: { function: 'pre-verb', type: 'directional' },
          reasons: expect.arrayContaining(["Word is 'अच्छ'"]),
        });
      });
    });
  });

  // 2 tests for 'vad'
  describe('Positive Cases: "accha" with verb "vad" (IAST and Devanagari)', () => {
    test("should identify 'accha' as gati with verb 'vad' (IAST)", () => {
      const result = sutra('accha', { verb: 'vad', hasMotionSense: true });
      expect(result).toMatchObject({
        applies: true,
        confidence: expect.any(Number),
        morphological: { category: 'gati', features: expect.arrayContaining(['directional']) },
        semantic: { function: 'pre-verb', type: 'directional' },
        reasons: expect.arrayContaining(["Word is 'accha'"]),
      });
    });

    test("should identify 'अच्छ' as gati with verb 'वद्' (Devanagari)", () => {
      const result = sutra('अच्छ', { verb: 'वद्', hasMotionSense: true });
      expect(result).toMatchObject({
        applies: true,
        confidence: expect.any(Number),
        morphological: { category: 'gati', features: expect.arrayContaining(['directional']) },
        semantic: { function: 'pre-verb', type: 'directional' },
        reasons: expect.arrayContaining(["Word is 'अच्छ'"]),
      });
    });
  });

  // 22 tests for other verbs
  describe('Negative Cases', () => {
    otherVerbs.forEach(verb => {
        test(`should not apply to "accha" with a non-motion, non-vad verb '${verb}' (IAST)`, () => {
            const result = sutra('accha', { verb, hasMotionSense: false });
            expect(result.applies).toBe(false);
        });

        test(`should not apply to "अच्छ" with a non-motion, non-vad verb '${verb}' (Devanagari)`, () => {
            const result = sutra('अच्छ', { verb, hasMotionSense: false });
            expect(result.applies).toBe(false);
        });
    });

    test('should not apply to a different word', () => {
      const result = sutra('anyaword', { verb: 'gam', hasMotionSense: true });
      expect(result.applies).toBe(false);
    });

    test('should return a reason for non-application', () => {
        const result = sutra('accha', { verb: 'pac', hasMotionSense: false });
        expect(result.reasons).toBeDefined();
    });
  });

  // 6 tests
  describe('Edge Cases', () => {
    test('should handle null input', () => {
      const result = sutra(null, { verb: 'gam', verbMeaning: 'motion' });
      expect(result.applies).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should handle undefined input', () => {
      const result = sutra(undefined, { verb: 'gam', verbMeaning: 'motion' });
      expect(result.applies).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should handle null context', () => {
      const result = sutra('accha', null);
      expect(result.applies).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should handle empty context', () => {
      const result = sutra('accha', {});
      expect(result.applies).toBe(false);
    });

    test('should handle number as input', () => {
        const result = sutra(123, { verb: 'gam', verbMeaning: 'motion' });
        expect(result.applies).toBe(false);
        expect(result.error).toBeDefined();
    });

    test('should handle object as input', () => {
        const result = sutra({word: 'accha'}, { verb: 'gam', verbMeaning: 'motion' });
        expect(result.applies).toBe(false);
        expect(result.error).toBeDefined();
    });
  });
});
