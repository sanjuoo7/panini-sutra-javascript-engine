import { getTi } from './index.js';

describe('Sutra 1.1.64: aco\'ntyādi ṭi', () => {
  describe('IAST Script', () => {
    it("should return 'ak' for 'śak'", () => {
      expect(getTi('śak')).toBe('ak');
    });

    it("should return 'as' for 'manas'", () => {
      expect(getTi('manas')).toBe('as');
    });

    it("should return 'as' for 'vidvas'", () => {
      expect(getTi('vidvas')).toBe('as');
    });

    it("should return 'i' for 'kavi'", () => {
      expect(getTi('kavi')).toBe('i');
    });

    it("should return 'ī' for 'nadī'", () => {
      expect(getTi('nadī')).toBe('ī');
    });

    it("should return 'an' for 'rājan'", () => {
      expect(getTi('rājan')).toBe('an');
    });
  });

  describe('Devanagari Script', () => {
    it("should return '' for 'शक्'", () => {
      expect(getTi('शक्')).toBe('');
    });

    it("should return '' for 'मनस्'", () => {
      expect(getTi('मनस्')).toBe('');
    });

    it("should return 'ि' for 'कवि'", () => {
      expect(getTi('कवि')).toBe('ि');
    });

    it("should return 'ी' for 'नदी'", () => {
      expect(getTi('नदी')).toBe('ी');
    });

    it("should return 'ाजन्' for 'राजन्'", () => {
      expect(getTi('राजन्')).toBe('ाजन्');
    });
  });

  describe('Edge Cases', () => {
    it('should return "ṛt" for "vṛt"', () => {
      expect(getTi('vṛt')).toBe('ṛt'); // ṛ is a vowel
    });

    it('should return an empty string for a word with no vowels', () => {
      expect(getTi('hld')).toBe(''); // No vowel
    });

    it('should return an empty string for an empty string input', () => {
      expect(getTi('')).toBe('');
    });

    it('should return an empty string for non-string inputs', () => {
      expect(getTi(null)).toBe('');
      expect(getTi(undefined)).toBe('');
      expect(getTi(123)).toBe('');
      expect(getTi({})).toBe('');
    });

    it('should handle words with only one vowel', () => {
      expect(getTi('a')).toBe('a');
      expect(getTi('इ')).toBe('इ');
    });

    it('should handle words ending in a vowel', () => {
      expect(getTi('deva')).toBe('a');
      expect(getTi('देव')).toBe('ेव');
    });
  });
});
