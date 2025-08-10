import { applyAlontyasya } from './index.js';

describe('Sutra 1.1.52: alo\'ntyasya (अलोऽन्त्यस्य)', () => {
  // Positive Cases
  describe('Positive Cases: Rule applies successfully', () => {
    it('should replace the last phoneme of an IAST word', () => {
      expect(applyAlontyasya('rāma', 'e', 'IAST')).toBe('rāme');
    });

    it('should replace the last phoneme of another IAST word', () => {
      expect(applyAlontyasya('devau', 'i', 'IAST')).toBe('devi');
    });

    it('should replace the last phoneme of a Devanagari word', () => {
      expect(applyAlontyasya('राम', 'ए', 'Devanagari')).toBe('राए');
    });

    it('should replace the last phoneme of another Devanagari word', () => {
      expect(applyAlontyasya('देवौ', 'इ', 'Devanagari')).toBe('देवइ');
    });

    it('should handle single-phoneme words (IAST)', () => {
      expect(applyAlontyasya('a', 'i', 'IAST')).toBe('i');
    });

    it('should handle single-phoneme words (Devanagari)', () => {
      expect(applyAlontyasya('अ', 'इ', 'Devanagari')).toBe('इ');
    });
  });

  // Negative Cases
  describe('Negative Cases: Rule should not apply (invalid inputs)', () => {
    it('should throw an error for null originalWord', () => {
      expect(() => applyAlontyasya(null, 'e', 'IAST')).toThrow('Invalid input: originalWord, substitute, and script must be non-empty strings.');
    });

    it('should throw an error for undefined substitute', () => {
      expect(() => applyAlontyasya('rāma', undefined, 'IAST')).toThrow('Invalid input: originalWord, substitute, and script must be non-empty strings.');
    });

    it('should throw an error for empty script', () => {
      expect(() => applyAlontyasya('rāma', 'e', '')).toThrow('Invalid input: originalWord, substitute, and script must be non-empty strings.');
    });

    it('should throw an error for non-string originalWord', () => {
      expect(() => applyAlontyasya(123, 'e', 'IAST')).toThrow('Invalid input: originalWord, substitute, and script must be non-empty strings.');
    });

    it('should throw an error for empty originalWord', () => {
      expect(() => applyAlontyasya('', 'e', 'IAST')).toThrow('Invalid input: originalWord, substitute, and script must be non-empty strings.');
    });
  });
});
