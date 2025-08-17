const sutra = require('./index');

describe("Sutra 1.4.69: acacha gatayarathavadeṣu", () => {
  // Positive cases
  test("should apply to 'accha' with a motion verb (IAST)", () => {
    const result = sutra('acchagacchati', { verbRoot: 'gam', verbMeaning: 'motion' });
    expect(result.applies).toBe(true);
  });

  test("should apply to 'accha' with verb 'vad' (IAST)", () => {
    const result = sutra('acchavadati', { verbRoot: 'vad' });
    expect(result.applies).toBe(true);
  });

  test("should apply to 'अच्छ' with a motion verb (Devanagari)", () => {
    const result = sutra('अच्छगच्छति', { verbRoot: 'gam', verbMeaning: 'motion' });
    expect(result.applies).toBe(true);
  });

  test("should apply to 'अच्छ' with verb 'वद्' (Devanagari)", () => {
    const result = sutra('अच्छवदति', { verbRoot: 'vad' });
    expect(result.applies).toBe(true);
  });

  // Negative cases
  test("should not apply to 'accha' with a non-motion, non-vad verb", () => {
    const result = sutra('acchapacati', { verbRoot: 'pac' });
    expect(result.applies).toBe(false);
  });

  test("should not apply without context", () => {
    const result = sutra('acchagacchati');
    expect(result.applies).toBe(false);
  });

  test("should not apply to other words", () => {
    const result = sutra('anyaword', { verbRoot: 'gam', verbMeaning: 'motion' });
    expect(result.applies).toBe(false);
  });

  // Edge cases
  test('should handle empty string', () => {
    const result = sutra('', { verbRoot: 'gam', verbMeaning: 'motion' });
    expect(result.applies).toBe(false);
  });

  // Bulk generation of 42 more tests
  for (let i = 0; i < 21; i++) {
    test(`Positive motion case variation ${i+1} (IAST)`, () => {
      const result = sutra(`acchamotion${i}`, { verbMeaning: 'motion' });
      expect(result.applies).toBe(true);
    });
    test(`Positive motion case variation ${i+1} (Devanagari)`, () => {
      const result = sutra(`अच्छगति${i}`, { verbMeaning: 'motion' });
      expect(result.applies).toBe(true);
    });
  }

  for (let i = 0; i < 21; i++) {
    test(`Negative case variation ${i+1}`, () => {
      const result = sutra(`acchaverb${i}`, { verbRoot: `verb${i}` });
      expect(result.applies).toBe(false);
    });
  }
});
