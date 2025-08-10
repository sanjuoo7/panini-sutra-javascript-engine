import { isLukSluLup } from './index.js';

describe('Sutra 1.1.61: pratyayasya lukślulupaḥ', () => {
  describe('Positive Cases', () => {
    it("should return true for 'luk'", () => {
      expect(isLukSluLup('luk')).toBe(true);
    });

    it("should return true for 'ślu'", () => {
      expect(isLukSluLup('ślu')).toBe(true);
    });

    it("should return true for 'lup'", () => {
      expect(isLukSluLup('lup')).toBe(true);
    });
  });

  describe('Negative Cases', () => {
    it("should return false for 'lopa'", () => {
      expect(isLukSluLup('lopa')).toBe(false);
    });

    it("should return false for an empty string", () => {
      expect(isLukSluLup('')).toBe(false);
    });

    it("should return false for a random string", () => {
      expect(isLukSluLup('random')).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should return false for null', () => {
      expect(isLukSluLup(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isLukSluLup(undefined)).toBe(false);
    });

    it('should return false for a number', () => {
      expect(isLukSluLup(123)).toBe(false);
    });

    it('should return false for an object', () => {
      expect(isLukSluLup({})).toBe(false);
    });

    it('should return false for an array', () => {
      expect(isLukSluLup([])).toBe(false);
    });

    it("should be case-sensitive and return false for 'LUK'", () => {
      expect(isLukSluLup('LUK')).toBe(false);
    });
  });
});
