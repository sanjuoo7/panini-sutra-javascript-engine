import { applyAadehParasya } from './index.js';

describe('Sutra 1.1.54: ādeḥ parasya (आदेः परस्य)', () => {
  // Positive Cases
  describe('Positive Cases: Rule applies successfully', () => {
    it('should replace the first phoneme of an IAST word', () => {
      expect(applyAadehParasya('iti', 'a', 'IAST')).toBe('ati');
    });

    it('should replace the first phoneme of another IAST word', () => {
      expect(applyAadehParasya('gacchati', 'a', 'IAST')).toBe('aacchati');
    });

    it('should replace the first phoneme of a Devanagari word', () => {
      expect(applyAadehParasya('इति', 'अ', 'Devanagari')).toBe('अति');
    });

    it('should replace the first phoneme of another Devanagari word', () => {
      expect(applyAadehParasya('गच्छति', 'अ', 'Devanagari')).toBe('अच्छति');
    });

    it('should handle single-phoneme words (IAST)', () => {
      expect(applyAadehParasya('a', 'i', 'IAST')).toBe('i');
    });

    it('should handle single-phoneme words (Devanagari)', () => {
      expect(applyAadehParasya('अ', 'इ', 'Devanagari')).toBe('इ');
    });
  });

  // Negative Cases
  describe('Negative Cases: Rule should not apply (invalid inputs)', () => {
    it('should throw an error for null targetWord', () => {
      expect(() => applyAadehParasya(null, 'a', 'IAST')).toThrow('Invalid input: targetWord, substitute, and script must be non-empty strings.');
    });

    it('should throw an error for undefined substitute', () => {
      expect(() => applyAadehParasya('iti', undefined, 'IAST')).toThrow('Invalid input: targetWord, substitute, and script must be non-empty strings.');
    });

    it('should throw an error for empty script', () => {
      expect(() => applyAadehParasya('iti', 'a', '')).toThrow('Invalid input: targetWord, substitute, and script must be non-empty strings.');
    });

    it('should throw an error for non-string targetWord', () => {
      expect(() => applyAadehParasya(123, 'a', 'IAST')).toThrow('Invalid input: targetWord, substitute, and script must be non-empty strings.');
    });

    it('should throw an error for empty targetWord', () => {
      expect(() => applyAadehParasya('', 'a', 'IAST')).toThrow('Invalid input: targetWord, substitute, and script must be non-empty strings.');
    });
  });
});