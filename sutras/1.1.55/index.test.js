import { applyAnekalShitSarvasya } from './index.js';

describe('Sutra 1.1.55: anekāla śit sarvasya (अनेकाल्शित्सर्वस्य)', () => {
  // Positive Cases
  describe('Positive Cases: Rule applies successfully', () => {
    it('should replace the whole word if substitute is multi-letter (IAST)', () => {
      expect(applyAnekalShitSarvasya('rāma', 'devau', false, 'IAST')).toBe('devau');
    });

    it('should replace the whole word if substitute is multi-letter (Devanagari)', () => {
      expect(applyAnekalShitSarvasya('राम', 'देवौ', false, 'Devanagari')).toBe('देवौ');
    });

    it('should replace the whole word if substitute is śit (IAST)', () => {
      // Assuming 'e' is a śit substitute in this context for testing purposes
      expect(applyAnekalShitSarvasya('rāma', 'e', true, 'IAST')).toBe('e');
    });

    it('should replace the whole word if substitute is śit (Devanagari)', () => {
      // Assuming 'ए' is a śit substitute in this context for testing purposes
      expect(applyAnekalShitSarvasya('राम', 'ए', true, 'Devanagari')).toBe('ए');
    });

    it('should replace the whole word if substitute is multi-letter AND śit (IAST)', () => {
      expect(applyAnekalShitSarvasya('rāma', 'devau', true, 'IAST')).toBe('devau');
    });
  });

  // Negative Cases
  describe('Negative Cases: Rule should not apply', () => {
    it('should not replace the whole word if substitute is single-letter and not śit (IAST)', () => {
      expect(applyAnekalShitSarvasya('rāma', 'a', false, 'IAST')).toBe('rāma');
    });

    it('should not replace the whole word if substitute is single-letter and not śit (Devanagari)', () => {
      expect(applyAnekalShitSarvasya('राम', 'अ', false, 'Devanagari')).toBe('राम');
    });
  });

  // Error Handling
  describe('Error Handling', () => {
    it('should throw an error for null originalWord', () => {
      expect(() => applyAnekalShitSarvasya(null, 'sub', false, 'IAST')).toThrow('Invalid input: originalWord, substitute, and script must be non-empty strings, and isShit must be a boolean.');
    });

    it('should throw an error for undefined substitute', () => {
      expect(() => applyAnekalShitSarvasya('orig', undefined, false, 'IAST')).toThrow('Invalid input: originalWord, substitute, and script must be non-empty strings, and isShit must be a boolean.');
    });

    it('should throw an error for non-boolean isShit', () => {
      expect(() => applyAnekalShitSarvasya('orig', 'sub', 'true', 'IAST')).toThrow('Invalid input: originalWord, substitute, and script must be non-empty strings, and isShit must be a boolean.');
    });

    it('should throw an error for empty script', () => {
      expect(() => applyAnekalShitSarvasya('orig', 'sub', false, '')).toThrow('Invalid input: originalWord, substitute, and script must be non-empty strings, and isShit must be a boolean.');
    });
  });
});