import { applyRaparaha } from './index.js';

describe('Sutra 1.1.51: uraँṇa raparaḥ (उरँण् रपरः)', () => {
  // Positive Cases
  describe('Positive Cases: Rule applies successfully', () => {
    it('should append "r" to "a" when substituting "ṛ" (IAST)', () => {
      expect(applyRaparaha('a', 'ṛ', 'IAST')).toBe('ar');
    });

    it('should append "r" to "i" when substituting "ṛ" (IAST)', () => {
      expect(applyRaparaha('i', 'ṛ', 'IAST')).toBe('ir');
    });

    it('should append "r" to "u" when substituting "ṛ" (IAST)', () => {
      expect(applyRaparaha('u', 'ṛ', 'IAST')).toBe('ur');
    });

    it('should append "r" to "a" when substituting "ṝ" (IAST)', () => {
      expect(applyRaparaha('a', 'ṝ', 'IAST')).toBe('ar');
    });

    it('should append "र्" to "अ" when substituting "ऋ" (Devanagari)', () => {
      expect(applyRaparaha('अ', 'ऋ', 'Devanagari')).toBe('अर्');
    });

    it('should append "र्" to "इ" when substituting "ऋ" (Devanagari)', () => {
      expect(applyRaparaha('इ', 'ऋ', 'Devanagari')).toBe('इर्');
    });

    it('should append "र्" to "उ" when substituting "ऋ" (Devanagari)', () => {
      expect(applyRaparaha('उ', 'ऋ', 'Devanagari')).toBe('उर्');
    });

    it('should append "र्" to "अ" when substituting "ॠ" (Devanagari)', () => {
      expect(applyRaparaha('अ', 'ॠ', 'Devanagari')).toBe('अर्');
    });
  });

  // Negative Cases
  describe('Negative Cases: Rule should not apply', () => {
    it('should not append "r" if substitute is not an "aṇ" pratyahara vowel (IAST)', () => {
      expect(applyRaparaha('e', 'ṛ', 'IAST')).toBe('e');
      expect(applyRaparaha('o', 'ṛ', 'IAST')).toBe('o');
      expect(applyRaparaha('k', 'ṛ', 'IAST')).toBe('k');
    });

    it('should not append "र्" if substitute is not an "aṇ" pratyahara vowel (Devanagari)', () => {
      expect(applyRaparaha('ए', 'ऋ', 'Devanagari')).toBe('ए');
      expect(applyRaparaha('ओ', 'ऋ', 'Devanagari')).toBe('ओ');
      expect(applyRaparaha('क', 'ऋ', 'Devanagari')).toBe('क');
    });

    it('should not append "r" if original phoneme is not "ṛ" or "ṝ" (IAST)', () => {
      expect(applyRaparaha('a', 'i', 'IAST')).toBe('a');
      expect(applyRaparaha('u', 'e', 'IAST')).toBe('u');
    });

    it('should not append "र्" if original phoneme is not "ऋ" or "ॠ" (Devanagari)', () => {
      expect(applyRaparaha('अ', 'इ', 'Devanagari')).toBe('अ');
      expect(applyRaparaha('उ', 'ए', 'Devanagari')).toBe('उ');
    });
  });

  // Error Handling
  describe('Error Handling', () => {
    it('should throw an error for null substitute', () => {
      expect(() => applyRaparaha(null, 'ṛ', 'IAST')).toThrow('Invalid input: substitute, originalPhoneme, and script must be non-empty strings.');
    });

    it('should throw an error for undefined originalPhoneme', () => {
      expect(() => applyRaparaha('a', undefined, 'IAST')).toThrow('Invalid input: substitute, originalPhoneme, and script must be non-empty strings.');
    });

    it('should throw an error for empty script', () => {
      expect(() => applyRaparaha('a', 'ṛ', '')).toThrow('Invalid input: substitute, originalPhoneme, and script must be non-empty strings.');
    });

    it('should throw an error for non-string substitute', () => {
      expect(() => applyRaparaha(123, 'ṛ', 'IAST')).toThrow('Invalid input: substitute, originalPhoneme, and script must be non-empty strings.');
    });

    it('should not apply rule for invalid script', () => {
      expect(applyRaparaha('a', 'ṛ', 'invalid')).toBe('a');
    });
  });
});