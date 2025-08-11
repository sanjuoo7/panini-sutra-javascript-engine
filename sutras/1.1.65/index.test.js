import { getUpadha } from './index.js';

describe('Sutra 1.1.65: alo\'ntyāt pūrva upadhā', () => {
  describe('IAST Script', () => {
    it("should return 'ā' for 'rāj'", () => {
      expect(getUpadha('rāj')).toBe('ā');
    });

    it("should return 'a' for 'path'", () => {
      expect(getUpadha('path')).toBe('a');
    });

    it("should return 'i' for 'bhid'", () => {
      expect(getUpadha('bhid')).toBe('i');
    });

    it("should return 'a' for 'manas'", () => {
      expect(getUpadha('manas')).toBe('a');
    });

    it("should return 'v' for 'deva'", () => {
      expect(getUpadha('deva')).toBe('v');
    });
  });

  describe('Devanagari Script', () => {
    it("should return 'ज' for 'राज्'", () => {
      // r-ā-j -> tokenize -> र, ा, ज, ्
      expect(getUpadha('राज्')).toBe('ज');
    });

    it("should return 'थ' for 'पथ्'", () => {
      // p-a-th -> tokenize -> प, थ, ्
      expect(getUpadha('पथ्')).toBe('थ');
    });

    it("should return 'द' for 'भिद्'", () => {
      // bh-i-d -> tokenize -> भ, ि, द, ्
      expect(getUpadha('भिद्')).toBe('द');
    });

    it("should return 'स' for 'मनस्'", () => {
      // m-a-n-a-s -> tokenize -> म, न, स, ्
      expect(getUpadha('मनस्')).toBe('स');
    });

    it("should return 'े' for 'देव'", () => {
      // d-e-v-a -> tokenize -> द, े, व
      expect(getUpadha('देव')).toBe('े');
    });
  });

  describe('Edge Cases', () => {
    it('should return an empty string for words with less than two phonemes', () => {
      expect(getUpadha('a')).toBe('');
      expect(getUpadha('क')).toBe('');
    });

    it('should return an empty string for empty or invalid input', () => {
      expect(getUpadha('')).toBe('');
      expect(getUpadha(null)).toBe('');
      expect(getUpadha(undefined)).toBe('');
      expect(getUpadha(123)).toBe('');
    });
  });
});
