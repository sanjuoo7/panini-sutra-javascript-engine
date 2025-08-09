/**
 * Test cases for Sutra 1.1.14: निपात एकाजनाङ्
 * "A particle consisting of a single vowel, with the exception of the particle आङ् is प्रगृह्य।"
 */

import { isPragrhyaSingleVowelParticle, isPragrhya, preventsSandhi } from './index.js';

describe('Sutra 1.1.14: निपात एकाजनाङ्', () => {
  describe('isPragrhyaSingleVowelParticle', () => {
    it('should identify single-vowel particles as प्रगृह्य', () => {
      expect(isPragrhyaSingleVowelParticle('a', true)).toBe(true);
      expect(isPragrhyaSingleVowelParticle('i', true)).toBe(true);
      expect(isPragrhyaSingleVowelParticle('u', true)).toBe(true);
      expect(isPragrhyaSingleVowelParticle('e', true)).toBe(true);
      expect(isPragrhyaSingleVowelParticle('o', true)).toBe(true);
    });

    it('should identify Devanagari single-vowel particles as प्रगृह्य', () => {
      expect(isPragrhyaSingleVowelParticle('अ', true)).toBe(true);
      expect(isPragrhyaSingleVowelParticle('इ', true)).toBe(true);
      expect(isPragrhyaSingleVowelParticle('उ', true)).toBe(true);
      expect(isPragrhyaSingleVowelParticle('ए', true)).toBe(true);
      expect(isPragrhyaSingleVowelParticle('ओ', true)).toBe(true);
    });

    it('should reject the exception आङ्', () => {
      expect(isPragrhyaSingleVowelParticle('āṅ', true)).toBe(false);
      expect(isPragrhyaSingleVowelParticle('आङ्', true)).toBe(false);
    });

    it('should reject multi-character particles', () => {
      expect(isPragrhyaSingleVowelParticle('iti', true)).toBe(false);
      expect(isPragrhyaSingleVowelParticle('eva', true)).toBe(false);
      expect(isPragrhyaSingleVowelParticle('ca', true)).toBe(false);
    });

    it('should reject single vowels that are not particles', () => {
      expect(isPragrhyaSingleVowelParticle('a', false)).toBe(false);
      expect(isPragrhyaSingleVowelParticle('i', false)).toBe(false);
      expect(isPragrhyaSingleVowelParticle('अ', false)).toBe(false);
    });

    it('should handle consonants correctly', () => {
      expect(isPragrhyaSingleVowelParticle('k', true)).toBe(false);
      expect(isPragrhyaSingleVowelParticle('m', true)).toBe(false);
      expect(isPragrhyaSingleVowelParticle('त्', true)).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isPragrhyaSingleVowelParticle('', true)).toBe(false);
      expect(isPragrhyaSingleVowelParticle(null, true)).toBe(false);
      expect(isPragrhyaSingleVowelParticle(undefined, true)).toBe(false);
    });
  });

  describe('isPragrhya (extended)', () => {
    it('should include previous प्रगृह्य definitions', () => {
      // From 1.1.11 (dual endings)
      expect(isPragrhya('rāmī', { number: 'dual' })).toBe(true);
      
      // From 1.1.12 (अदस् forms)
      expect(isPragrhya('amī')).toBe(true);
      
      // From 1.1.13 (शे affix)
      expect(isPragrhya('devaśe')).toBe(true);
    });

    it('should include single-vowel particles from this sutra', () => {
      expect(isPragrhya('a', { isParticle: true })).toBe(true);
      expect(isPragrhya('i', { isParticle: true })).toBe(true);
      expect(isPragrhya('u', { isParticle: true })).toBe(true);
      expect(isPragrhya('अ', { isParticle: true })).toBe(true);
      expect(isPragrhya('इ', { isParticle: true })).toBe(true);
    });

    it('should reject आङ् exception', () => {
      expect(isPragrhya('āṅ', { isParticle: true })).toBe(false);
      expect(isPragrhya('आङ्', { isParticle: true })).toBe(false);
    });

    it('should reject non-particles', () => {
      expect(isPragrhya('a', { isParticle: false })).toBe(false);
      expect(isPragrhya('i')).toBe(false); // no context
    });
  });

  describe('preventsSandhi (extended)', () => {
    it('should prevent sandhi for single-vowel particles', () => {
      expect(preventsSandhi('a', 'iti', { isParticle: true })).toBe(true);
      expect(preventsSandhi('i', 'eva', { isParticle: true })).toBe(true);
      expect(preventsSandhi('अ', 'इति', { isParticle: true })).toBe(true);
    });

    it('should not prevent sandhi for आङ्', () => {
      expect(preventsSandhi('āṅ', 'iti', { isParticle: true })).toBe(false);
      expect(preventsSandhi('आङ्', 'इति', { isParticle: true })).toBe(false);
    });

    it('should not prevent sandhi for non-particles', () => {
      expect(preventsSandhi('a', 'iti', { isParticle: false })).toBe(false);
      expect(preventsSandhi('i', 'eva')).toBe(false); // no context
    });
  });

  describe('real-world examples', () => {
    it('should work with common single-vowel particles', () => {
      const particleContext = { isParticle: true };
      
      // Common particles that should be प्रगृह्य
      expect(isPragrhya('a', particleContext)).toBe(true); // interjection
      expect(isPragrhya('i', particleContext)).toBe(true); // vocative particle
      expect(isPragrhya('u', particleContext)).toBe(true); // particle of address
      expect(isPragrhya('o', particleContext)).toBe(true); // vocative particle
      
      // These should prevent sandhi
      expect(preventsSandhi('a', 'rāma', particleContext)).toBe(true);
      expect(preventsSandhi('i', 'deva', particleContext)).toBe(true);
    });

    it('should handle mixed scripts correctly', () => {
      expect(isPragrhya('अ', { isParticle: true })).toBe(true);
      expect(preventsSandhi('अ', 'rama', { isParticle: true })).toBe(true);
      expect(preventsSandhi('a', 'राम', { isParticle: true })).toBe(true);
    });
  });
});
