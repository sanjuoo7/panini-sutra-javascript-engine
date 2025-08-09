/**
 * Test cases for Sutra 1.1.12: अदसो मात्
 * "The same letters after the म् of the pronoun अदस् are प्रगृह्य।"
 */

import { isPragrhyaAdasForm, isPragrhya, preventsSandhi } from './index.js';

describe('Sutra 1.1.12: अदसो मात्', () => {
  describe('isPragrhyaAdasForm', () => {
    it('should identify अदस् forms ending in ī after म्', () => {
      expect(isPragrhyaAdasForm('amī')).toBe(true);
      expect(isPragrhyaAdasForm('अमी')).toBe(true);
    });

    it('should identify अदस् forms ending in ū after म्', () => {
      expect(isPragrhyaAdasForm('amū')).toBe(true);
      expect(isPragrhyaAdasForm('अमू')).toBe(true);
    });

    it('should identify अदस् forms ending in e after म्', () => {
      expect(isPragrhyaAdasForm('ame')).toBe(true);
      expect(isPragrhyaAdasForm('अमे')).toBe(true);
    });

    it('should reject non-अदस् forms', () => {
      expect(isPragrhyaAdasForm('rāmī')).toBe(false);
      expect(isPragrhyaAdasForm('viṣṇū')).toBe(false);
      expect(isPragrhyaAdasForm('deve')).toBe(false);
    });

    it('should reject अदस् forms not ending in the specified vowels', () => {
      expect(isPragrhyaAdasForm('amaḥ')).toBe(false);
      expect(isPragrhyaAdasForm('amam')).toBe(false);
      expect(isPragrhyaAdasForm('amasya')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isPragrhyaAdasForm('')).toBe(false);
      expect(isPragrhyaAdasForm(null)).toBe(false);
      expect(isPragrhyaAdasForm(undefined)).toBe(false);
    });
  });

  describe('isPragrhya (extended)', () => {
    it('should include dual endings from previous sutra', () => {
      expect(isPragrhya('rāmī', { number: 'dual' })).toBe(true);
      expect(isPragrhya('viṣṇū', { number: 'dual' })).toBe(true);
      expect(isPragrhya('रामे', { number: 'dual' })).toBe(true);
    });

    it('should include अदस् forms from this sutra', () => {
      expect(isPragrhya('amī')).toBe(true);
      expect(isPragrhya('amū')).toBe(true);
      expect(isPragrhya('ame')).toBe(true);
      expect(isPragrhya('अमी')).toBe(true);
      expect(isPragrhya('अमू')).toBe(true);
      expect(isPragrhya('अमे')).toBe(true);
    });

    it('should reject words that are not प्रगृह्य by either sutra', () => {
      expect(isPragrhya('rāmaḥ')).toBe(false);
      expect(isPragrhya('devam')).toBe(false);
      expect(isPragrhya('अग्निः')).toBe(false);
    });
  });

  describe('preventsSandhi (extended)', () => {
    it('should prevent sandhi for dual endings', () => {
      expect(preventsSandhi('rāmī', 'iti', { number: 'dual' })).toBe(true);
      expect(preventsSandhi('विष्णू', 'एव', { number: 'dual' })).toBe(true);
    });

    it('should prevent sandhi for अदस् प्रगृह्य forms', () => {
      expect(preventsSandhi('amī', 'iti')).toBe(true);
      expect(preventsSandhi('amū', 'eva')).toBe(true);
      expect(preventsSandhi('ame', 'āgatau')).toBe(true);
      expect(preventsSandhi('अमी', 'इति')).toBe(true);
    });

    it('should not prevent sandhi for non-प्रगृह्य forms', () => {
      expect(preventsSandhi('rāmaḥ', 'iti')).toBe(false);
      expect(preventsSandhi('devam', 'atra')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(preventsSandhi('', 'iti')).toBe(false);
      expect(preventsSandhi('amī', '')).toBe(false);
      expect(preventsSandhi(null, 'iti')).toBe(false);
    });
  });

  describe('real-world examples', () => {
    it('should work with pronoun अदस् in sentences', () => {
      // अदस् प्रगृह्य forms should prevent sandhi
      expect(preventsSandhi('amī', 'iti')).toBe(true); // amī + iti (no sandhi)
      expect(preventsSandhi('अमू', 'एव')).toBe(true); // amū + eva (no sandhi)
      expect(preventsSandhi('ame', 'āpnoti')).toBe(true); // ame + āpnoti (no sandhi)
    });

    it('should distinguish from similar non-प्रगृह्य forms', () => {
      // Similar looking but not अदस् forms
      expect(isPragrhyaAdasForm('kamī')).toBe(false); // not अदस्
      expect(isPragrhyaAdasForm('yamū')).toBe(false); // not अदस्
      expect(isPragrhyaAdasForm('tame')).toBe(false); // not अदस्
      
      // These should not prevent sandhi
      expect(preventsSandhi('kamī', 'iti')).toBe(false);
      expect(preventsSandhi('yamū', 'eva')).toBe(false);
    });
  });
});
