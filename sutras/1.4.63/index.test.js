import sutra from './index.js';

describe('Sutra 1.4.63: ādarānādarayoḥ sadasatī', () => {
  const verbs = ['kṛ', 'bhū', 'gam', 'car', 'pūj', 'paṭh', 'likh', 'dṛś', 'smṛ', 'jñā'];

  // 20 tests
  describe('Positive Cases: "sat" (IAST and Devanagari)', () => {
    verbs.forEach(verb => {
      test(`should identify 'sat' as gati with verb '${verb}' and meaning 'respect' (IAST)`, () => {
        const result = sutra('sat', { verb, meaning: 'respect' });
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
          reasons: expect.arrayContaining(["Word is 'sat'", "Context meaning is 'respect'"]),
        });
      });

      test(`should identify 'सत्' as gati with verb '${verb}' and meaning 'respect' (Devanagari)`, () => {
        const result = sutra('सत्', { verb, meaning: 'respect' });
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
          reasons: expect.arrayContaining(["Word is 'सत्'", "Context meaning is 'respect'"]),
        });
      });
    });
  });

  // 20 tests
  describe('Positive Cases: "asat" (IAST and Devanagari)', () => {
    verbs.forEach(verb => {
      test(`should identify 'asat' as gati with verb '${verb}' and meaning 'disrespect' (IAST)`, () => {
        const result = sutra('asat', { verb, meaning: 'disrespect' });
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
          reasons: expect.arrayContaining(["Word is 'asat'", "Context meaning is 'disrespect'"]),
        });
      });

      test(`should identify 'असत्' as gati with verb '${verb}' and meaning 'disrespect' (Devanagari)`, () => {
        const result = sutra('असत्', { verb, meaning: 'disrespect' });
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
          reasons: expect.arrayContaining(["Word is 'असत्'", "Context meaning is 'disrespect'"]),
        });
      });
    });
  });

  // 12 tests
  describe('Negative Cases', () => {
    test('should not apply to "sat" with a different meaning', () => {
      const result = sutra('sat', { verb: 'bhū', meaning: 'existence' });
      expect(result.applies).toBe(false);
    });

    test('should not apply to "asat" with a different meaning', () => {
      const result = sutra('asat', { verb: 'bhū', meaning: 'non-existence' });
      expect(result.applies).toBe(false);
    });

    test('should not apply to "sat" without a verb', () => {
      const result = sutra('sat', { meaning: 'respect' });
      expect(result.applies).toBe(false);
    });

    test('should not apply to "asat" without a verb', () => {
      const result = sutra('asat', { meaning: 'disrespect' });
      expect(result.applies).toBe(false);
    });

    test('should not apply to a different word', () => {
      const result = sutra('manas', { verb: 'kṛ', meaning: 'respect' });
      expect(result.applies).toBe(false);
    });

    test('should not apply to "sat" with misspelled meaning', () => {
        const result = sutra('sat', { verb: 'kṛ', meaning: 'respec' });
        expect(result.applies).toBe(false);
    });

    test('should not apply to "asat" with misspelled meaning', () => {
        const result = sutra('asat', { verb: 'kṛ', meaning: 'disrespec' });
        expect(result.applies).toBe(false);
    });

    test('should not apply to "sat" with no meaning', () => {
        const result = sutra('sat', { verb: 'kṛ' });
        expect(result.applies).toBe(false);
    });

    test('should not apply to "asat" with no meaning', () => {
        const result = sutra('asat', { verb: 'kṛ' });
        expect(result.applies).toBe(false);
    });

    test('should not apply to "sat" with wrong verb and meaning', () => {
        const result = sutra('sat', { verb: 'bhū', meaning: 'disrespect' });
        expect(result.applies).toBe(false);
    });

    test('should not apply to "asat" with wrong verb and meaning', () => {
        const result = sutra('asat', { verb: 'bhū', meaning: 'respect' });
        expect(result.applies).toBe(false);
    });

    test('should return a reason for non-application', () => {
        const result = sutra('asat', { verb: 'bhū', meaning: 'respect' });
        expect(result.reasons).toBeDefined();
        expect(result.reasons.length).toBeGreaterThan(0);
    });
  });

  // 6 tests
  describe('Edge Cases', () => {
    test('should handle null input', () => {
      const result = sutra(null, { verb: 'kṛ', meaning: 'respect' });
      expect(result.applies).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should handle undefined input', () => {
      const result = sutra(undefined, { verb: 'kṛ', meaning: 'respect' });
      expect(result.applies).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should handle null context', () => {
      const result = sutra('sat', null);
      expect(result.applies).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should handle empty context', () => {
      const result = sutra('sat', {});
      expect(result.applies).toBe(false);
    });

    test('should handle number as input', () => {
        const result = sutra(123, { verb: 'kṛ', meaning: 'respect' });
        expect(result.applies).toBe(false);
        expect(result.error).toBeDefined();
    });

    test('should handle object as input', () => {
        const result = sutra({word: 'sat'}, { verb: 'kṛ', meaning: 'respect' });
        expect(result.applies).toBe(false);
        expect(result.error).toBeDefined();
    });
  });
});
