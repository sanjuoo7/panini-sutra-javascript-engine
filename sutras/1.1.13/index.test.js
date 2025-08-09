/**
 * Test cases for Sutra 1.1.13: शे
 * "The affix शे (the Vedic substitute of the case-affixes) is a प्रगृह्य।"
 */

import { isPragrhyaSheAffix, isPragrhya, preventsSandhi } from './index.js';

describe('Sutra 1.1.13: शे', () => {
  describe('isPragrhyaSheAffix', () => {
    it('should identify words ending in शे as प्रगृह्य', () => {
      expect(isPragrhyaSheAffix('devaśe')).toBe(true);
      expect(isPragrhyaSheAffix('rāmaśe')).toBe(true);
      expect(isPragrhyaSheAffix('agniśe')).toBe(true);
    });

    it('should identify Devanagari words ending in शे as प्रगृह्य', () => {
      expect(isPragrhyaSheAffix('देवशे')).toBe(true);
      expect(isPragrhyaSheAffix('रामशे')).toBe(true);
      expect(isPragrhyaSheAffix('अग्निशे')).toBe(true);
    });

    it('should reject words not ending in शे', () => {
      expect(isPragrhyaSheAffix('deva')).toBe(false);
      expect(isPragrhyaSheAffix('rāmaḥ')).toBe(false);
      expect(isPragrhyaSheAffix('agnaye')).toBe(false);
      expect(isPragrhyaSheAffix('देव')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isPragrhyaSheAffix('')).toBe(false);
      expect(isPragrhyaSheAffix(null)).toBe(false);
      expect(isPragrhyaSheAffix(undefined)).toBe(false);
    });
  });

  describe('isPragrhya (extended)', () => {
    it('should include previous प्रगृह्य definitions', () => {
      // From 1.1.11 (dual endings)
      expect(isPragrhya('rāmī', { number: 'dual' })).toBe(true);
      
      // From 1.1.12 (अदस् forms)
      expect(isPragrhya('amī')).toBe(true);
    });

    it('should include शे affix from this sutra', () => {
      expect(isPragrhya('devaśe')).toBe(true);
      expect(isPragrhya('rāmaśe')).toBe(true);
      expect(isPragrhya('देवशे')).toBe(true);
      expect(isPragrhya('रामशे')).toBe(true);
    });

    it('should reject words that are not प्रगृह्य by any sutra', () => {
      expect(isPragrhya('rāmaḥ')).toBe(false);
      expect(isPragrhya('devam')).toBe(false);
      expect(isPragrhya('अग्निः')).toBe(false);
    });
  });

  describe('preventsSandhi (extended)', () => {
    it('should prevent sandhi for शे affix', () => {
      expect(preventsSandhi('devaśe', 'iti')).toBe(true);
      expect(preventsSandhi('rāmaśe', 'eva')).toBe(true);
      expect(preventsSandhi('देवशे', 'इति')).toBe(true);
    });

    it('should not prevent sandhi for non-प्रगृह्य forms', () => {
      expect(preventsSandhi('rāmaḥ', 'iti')).toBe(false);
      expect(preventsSandhi('devam', 'atra')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(preventsSandhi('', 'iti')).toBe(false);
      expect(preventsSandhi('devaśe', '')).toBe(false);
      expect(preventsSandhi(null, 'iti')).toBe(false);
    });
  });

  describe('real-world examples', () => {
    it('should work with Vedic शे affix', () => {
      // Vedic forms with शे should be प्रगृह्य
      expect(isPragrhya('devaśe')).toBe(true); // to/for the god (Vedic)
      expect(isPragrhya('pitṛśe')).toBe(true); // to/for the father (Vedic)
      expect(isPragrhya('अग्निशे')).toBe(true); // to/for Agni (Vedic)
      
      // These should prevent sandhi
      expect(preventsSandhi('devaśe', 'namah')).toBe(true);
      expect(preventsSandhi('pitṛśe', 'svāhā')).toBe(true);
    });

    it('should distinguish from similar non-प्रगृह्य endings', () => {
      // Words not ending in शे should not be प्रगृह्य by this rule
      expect(isPragrhya('devāya')).toBe(false); // Classical dative
      expect(isPragrhya('devena')).toBe(false); // Instrumental
      expect(isPragrhya('devasya')).toBe(false); // Genitive
      
      // These should allow sandhi
      expect(preventsSandhi('devāya', 'namah')).toBe(false);
      expect(preventsSandhi('devena', 'saha')).toBe(false);
    });
  });
});
