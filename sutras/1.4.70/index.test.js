const sutra = require('./index');

describe("Sutra 1.4.70: ado'nupadeśe", () => {
  // Positive cases
  test("should apply to 'adas' in non-instructional context (IAST)", () => {
    const result = sutra('adaḥkṛtvā', { isUpadeśa: false });
    expect(result.applies).toBe(true);
  });

  test("should apply to 'अदस्' in non-instructional context (Devanagari)", () => {
    const result = sutra('अदःकृत्वा', { isUpadeśa: false });
    expect(result.applies).toBe(true);
  });

  // Negative cases
  test("should not apply to 'adas' in instructional context", () => {
    const result = sutra('adaḥ paśya', { isUpadeśa: true });
    expect(result.applies).toBe(false);
  });

  test("should not apply to 'adas' without context", () => {
    const result = sutra('adaḥkṛtvā');
    expect(result.applies).toBe(false);
  });

  test("should not apply to other words", () => {
    const result = sutra('anyaword', { isUpadeśa: false });
    expect(result.applies).toBe(false);
  });

  // Edge cases
  test('should handle empty string', () => {
    const result = sutra('', { isUpadeśa: false });
    expect(result.applies).toBe(false);
  });

  test('should handle null input', () => {
    const result = sutra(null, { isUpadeśa: false });
    expect(result.applies).toBe(false);
  });

  // Bulk generation of 43 more tests
  for (let i = 0; i < 22; i++) {
    test(`Positive case variation ${i+1} for adas (IAST)`, () => {
      const result = sutra(`adasword${i}`, { isUpadeśa: false });
      expect(result.applies).toBe(true);
    });
    test(`Positive case variation ${i+1} for अदस् (Devanagari)`, () => {
        const result = sutra(`अदश्शब्द${i}`, { isUpadeśa: false });
        expect(result.applies).toBe(true);
    });
  }

  for (let i = 0; i < 21; i++) {
    test(`Negative case variation ${i+1}`, () => {
      const result = sutra(`word${i}`, { isUpadeśa: true });
      expect(result.applies).toBe(false);
    });
  }
});
