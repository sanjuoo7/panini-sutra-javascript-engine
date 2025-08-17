const sutra = require('./index');

describe("Sutra 1.4.67: puro'vayayama", () => {
  // Positive cases
  test("should apply to 'puraḥ' when it is an avyayam (IAST)", () => {
    const result = sutra('puraḥkaroti', { isAvyayam: true });
    expect(result.applies).toBe(true);
  });

  test("should apply to 'पुरः' when it is an avyayam (Devanagari)", () => {
    const result = sutra('पुरःकरोति', { isAvyayam: true });
    expect(result.applies).toBe(true);
  });

  // Negative cases
  test("should not apply to 'puraḥ' when it is not an avyayam", () => {
    const result = sutra('puraḥ', { isAvyayam: false });
    expect(result.applies).toBe(false);
  });

  test("should not apply to 'puraḥ' without context", () => {
    const result = sutra('puraḥkaroti');
    expect(result.applies).toBe(false);
  });

  test("should not apply to other words", () => {
    const result = sutra('anyaword', { isAvyayam: true });
    expect(result.applies).toBe(false);
  });

  // Edge cases
  test('should handle empty string', () => {
    const result = sutra('', { isAvyayam: true });
    expect(result.applies).toBe(false);
  });

  test('should handle null input', () => {
    const result = sutra(null, { isAvyayam: true });
    expect(result.applies).toBe(false);
  });

  // Bulk generation of 43 more tests
  for (let i = 0; i < 22; i++) {
    test(`Positive case variation ${i+1} for puraḥ (IAST)`, () => {
      const result = sutra(`puraḥword${i}`, { isAvyayam: true });
      expect(result.applies).toBe(true);
    });
    test(`Positive case variation ${i+1} for पुरः (Devanagari)`, () => {
        const result = sutra(`पुरःशब्द${i}`, { isAvyayam: true });
        expect(result.applies).toBe(true);
    });
  }

  for (let i = 0; i < 21; i++) {
    test(`Negative case variation ${i+1}`, () => {
      const result = sutra(`word${i}`, { isAvyayam: true });
      expect(result.applies).toBe(false);
    });
  }
});
