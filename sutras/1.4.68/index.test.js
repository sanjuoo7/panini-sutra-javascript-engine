const sutra = require('./index');

describe("Sutra 1.4.68: asataṃ ca", () => {
  // Positive cases
  test("should apply to 'astam' when it is an avyayam (IAST)", () => {
    const result = sutra('astaṅgacchati', { isAvyayam: true });
    expect(result.applies).toBe(true);
  });

  test("should apply to 'अस्तम्' when it is an avyayam (Devanagari)", () => {
    const result = sutra('अस्तंगच्छति', { isAvyayam: true });
    expect(result.applies).toBe(true);
  });

  // Negative cases
  test("should not apply to 'astam' when it is not an avyayam", () => {
    const result = sutra('astam', { isAvyayam: false });
    expect(result.applies).toBe(false);
  });

  test("should not apply to 'astam' without context", () => {
    const result = sutra('astaṅgacchati');
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
    test(`Positive case variation ${i+1} for astam (IAST)`, () => {
      const result = sutra(`astamword${i}`, { isAvyayam: true });
      expect(result.applies).toBe(true);
    });
    test(`Positive case variation ${i+1} for अस्तम् (Devanagari)`, () => {
        const result = sutra(`अस्तंशब्द${i}`, { isAvyayam: true });
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
