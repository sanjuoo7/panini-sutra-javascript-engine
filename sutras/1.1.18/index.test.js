/**
 * Test cases for Sutra 1.1.18: ऊँ
 * Testing the particle ऊँ as pragṛhya
 */

import { 
  isPragrhya, 
  isPragrhyaOm, 
  getOmForms,
  isOmParticle,
  hasPragrhyaBehavior 
} from './index.js';

describe('Sutra 1.1.18: ऊँ', () => {
  describe('isPragrhyaOm', () => {
    it('should identify ऊँ as pragṛhya', () => {
      expect(isPragrhyaOm('ऊँ')).toBe(true);
      expect(isPragrhyaOm('ओम्')).toBe(true);
      expect(isPragrhyaOm('ओं')).toBe(true);
      expect(isPragrhyaOm('ūṃ')).toBe(true);
      expect(isPragrhyaOm('oṃ')).toBe(true);
      expect(isPragrhyaOm('om')).toBe(true);
    });

    it('should work in non-Vedic context', () => {
      const context = { isVedic: false };
      
      expect(isPragrhyaOm('ऊँ', context)).toBe(true);
      expect(isPragrhyaOm('ओम्', context)).toBe(true);
      expect(isPragrhyaOm('om', context)).toBe(true);
    });

    it('should work in Vedic context as per Śākalya', () => {
      const context = { isVedic: true };
      
      expect(isPragrhyaOm('ऊँ', context)).toBe(true);
      expect(isPragrhyaOm('om', context)).toBe(true);
    });

    it('should reject other particles', () => {
      expect(isPragrhyaOm('aho')).toBe(false);
      expect(isPragrhyaOm('ūñ')).toBe(false);
      expect(isPragrhyaOm('हे')).toBe(false);
      expect(isPragrhyaOm('नमः')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isPragrhyaOm('')).toBe(false);
      expect(isPragrhyaOm(null)).toBe(false);
      expect(isPragrhyaOm('o')).toBe(false); // incomplete
      expect(isPragrhyaOm('m')).toBe(false); // incomplete
    });
  });

  describe('isPragrhya', () => {
    it('should include base pragṛhya rules', () => {
      // Test that it includes previous sutra rules
      expect(isPragrhya('amī')).toBe(true); // from 1.1.12
      expect(isPragrhya('aho', { isParticle: true })).toBe(true); // from 1.1.15 (needs particle context)
      
      const itiContext = { nextWord: 'iti' };
      expect(isPragrhya('ūñ', itiContext)).toBe(true); // from 1.1.17
    });

    it('should include this sutra\'s ऊँ rule', () => {
      expect(isPragrhya('ऊँ')).toBe(true);
      expect(isPragrhya('ओम्')).toBe(true);
      expect(isPragrhya('om')).toBe(true);
    });

    it('should work independently of context', () => {
      // Unlike previous sutras, ऊँ is pragṛhya regardless of following word
      expect(isPragrhya('ऊँ', {})).toBe(true);
      expect(isPragrhya('om', { nextWord: 'gacchati' })).toBe(true);
      expect(isPragrhya('ओं', { nextWord: 'namaḥ' })).toBe(true);
    });
  });

  describe('getOmForms', () => {
    it('should return IAST forms by default', () => {
      const forms = getOmForms();
      expect(forms).toContain('ūṃ');
      expect(forms).toContain('oṃ');
      expect(forms).toContain('om');
    });

    it('should return IAST forms when explicitly requested', () => {
      const forms = getOmForms('IAST');
      expect(forms).toContain('ūṃ');
      expect(forms).toContain('oṃ');
      expect(forms).toContain('om');
    });

    it('should return Devanagari forms when requested', () => {
      const forms = getOmForms('Devanagari');
      expect(forms).toContain('ऊँ');
      expect(forms).toContain('ओम्');
      expect(forms).toContain('ओं');
    });

    it('should return arrays of appropriate length', () => {
      const iastForms = getOmForms('IAST');
      const devanagariForms = getOmForms('Devanagari');
      
      expect(iastForms.length).toBeGreaterThan(0);
      expect(devanagariForms.length).toEqual(iastForms.length);
    });
  });

  describe('isOmParticle', () => {
    it('should identify Om forms correctly', () => {
      expect(isOmParticle('ऊँ')).toBe(true);
      expect(isOmParticle('ओम्')).toBe(true);
      expect(isOmParticle('ओं')).toBe(true);
      expect(isOmParticle('ūṃ')).toBe(true);
      expect(isOmParticle('oṃ')).toBe(true);
      expect(isOmParticle('om')).toBe(true);
    });

    it('should reject non-Om forms', () => {
      expect(isOmParticle('aho')).toBe(false);
      expect(isOmParticle('ūñ')).toBe(false);
      expect(isOmParticle('rama')).toBe(false);
      expect(isOmParticle('गुरु')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isOmParticle('')).toBe(false);
      expect(isOmParticle(null)).toBe(false);
    });
  });

  describe('hasPragrhyaBehavior', () => {
    it('should return true for Om particles', () => {
      expect(hasPragrhyaBehavior('ऊँ')).toBe(true);
      expect(hasPragrhyaBehavior('om')).toBe(true);
    });

    it('should return false for non-pragṛhya words', () => {
      expect(hasPragrhyaBehavior('rama')).toBe(false);
      expect(hasPragrhyaBehavior('गुरु')).toBe(false);
    });

    it('should work with grammatical context', () => {
      const context = { 
        isVedic: false,
        isShakalaOpinion: true 
      };
      
      expect(hasPragrhyaBehavior('ओं', context)).toBe(true);
    });
  });

  describe('real-world examples', () => {
    it('should work with mantra beginnings', () => {
      // Om at the beginning of mantras
      expect(isPragrhya('ऊँ')).toBe(true);
      expect(isPragrhya('om')).toBe(true);
    });

    it('should work with prayer contexts', () => {
      // Om in various religious contexts
      expect(isPragrhya('ओम्')).toBe(true); // formal form
      expect(isPragrhya('ओं')).toBe(true);   // anusvara form
    });

    it('should distinguish from similar-sounding words', () => {
      // Only the sacred Om is pragṛhya, not other words
      expect(isPragrhya('kam')).toBe(false);
      expect(isPragrhya('gam')).toBe(false);
      expect(isPragrhya('ham')).toBe(false);
    });

    it('should work in traditional texts', () => {
      // Classical Sanskrit literature contexts
      expect(isPragrhya('ūṃ')).toBe(true); // IAST transliteration
      expect(isPragrhya('oṃ')).toBe(true);  // alternative IAST
    });

    it('should respect replacement context', () => {
      // This sutra says ऊँ replaces उञ in non-Vedic literature
      const nonVedicContext = { isVedic: false };
      
      expect(isPragrhya('ऊँ', nonVedicContext)).toBe(true);
      expect(isPragrhya('om', nonVedicContext)).toBe(true);
    });
  });
});
