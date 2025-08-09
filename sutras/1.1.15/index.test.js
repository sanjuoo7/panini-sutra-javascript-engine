/**
 * Test cases for Sutra 1.1.15: ओत्
 * "The final ओ of a particle is a प्रगृह्य।"
 */

import { isPragrhyaParticleEndingInO, isPragrhya, preventsSandhi } from './index.js';

describe('Sutra 1.1.15: ओत्', () => {
  describe('isPragrhyaParticleEndingInO', () => {
    it('should identify particles ending in ओ as प्रगृह्य', () => {
      expect(isPragrhyaParticleEndingInO('aho', true)).toBe(true);
      expect(isPragrhyaParticleEndingInO('bho', true)).toBe(true);
      expect(isPragrhyaParticleEndingInO('ho', true)).toBe(true);
    });

    it('should identify Devanagari particles ending in ओ as प्रगृह्य', () => {
      expect(isPragrhyaParticleEndingInO('अहो', true)).toBe(true);
      expect(isPragrhyaParticleEndingInO('भो', true)).toBe(true);
      expect(isPragrhyaParticleEndingInO('हो', true)).toBe(true);
    });

    it('should reject particles not ending in ओ', () => {
      expect(isPragrhyaParticleEndingInO('iti', true)).toBe(false);
      expect(isPragrhyaParticleEndingInO('eva', true)).toBe(false);
      expect(isPragrhyaParticleEndingInO('ca', true)).toBe(false);
      expect(isPragrhyaParticleEndingInO('hi', true)).toBe(false);
    });

    it('should reject words ending in ओ that are not particles', () => {
      expect(isPragrhyaParticleEndingInO('rāmo', false)).toBe(false);
      expect(isPragrhyaParticleEndingInO('devo', false)).toBe(false);
      expect(isPragrhyaParticleEndingInO('अग्निः', false)).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isPragrhyaParticleEndingInO('', true)).toBe(false);
      expect(isPragrhyaParticleEndingInO(null, true)).toBe(false);
      expect(isPragrhyaParticleEndingInO(undefined, true)).toBe(false);
      expect(isPragrhyaParticleEndingInO('aho', false)).toBe(false);
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
      
      // From 1.1.14 (single-vowel particles)
      expect(isPragrhya('a', { isParticle: true })).toBe(true);
    });

    it('should include particles ending in ओ from this sutra', () => {
      expect(isPragrhya('aho', { isParticle: true })).toBe(true);
      expect(isPragrhya('bho', { isParticle: true })).toBe(true);
      expect(isPragrhya('ho', { isParticle: true })).toBe(true);
      expect(isPragrhya('अहो', { isParticle: true })).toBe(true);
      expect(isPragrhya('भो', { isParticle: true })).toBe(true);
    });

    it('should reject words ending in ओ that are not particles', () => {
      expect(isPragrhya('rāmo', { isParticle: false })).toBe(false);
      expect(isPragrhya('devo')).toBe(false); // no context
      expect(isPragrhya('रामो', { isParticle: false })).toBe(false);
    });
  });

  describe('preventsSandhi (extended)', () => {
    it('should prevent sandhi for particles ending in ओ', () => {
      expect(preventsSandhi('aho', 'iti', { isParticle: true })).toBe(true);
      expect(preventsSandhi('bho', 'eva', { isParticle: true })).toBe(true);
      expect(preventsSandhi('अहो', 'इति', { isParticle: true })).toBe(true);
      expect(preventsSandhi('भो', 'एव', { isParticle: true })).toBe(true);
    });

    it('should not prevent sandhi for non-particles ending in ओ', () => {
      expect(preventsSandhi('rāmo', 'iti', { isParticle: false })).toBe(false);
      expect(preventsSandhi('devo', 'eva')).toBe(false); // no context
    });

    it('should not prevent sandhi for particles not ending in ओ', () => {
      expect(preventsSandhi('iti', 'eva', { isParticle: true })).toBe(false);
      expect(preventsSandhi('ca', 'api', { isParticle: true })).toBe(false);
    });
  });

  describe('real-world examples', () => {
    it('should work with common particles ending in ओ', () => {
      const particleContext = { isParticle: true };
      
      // Common exclamatory particles
      expect(isPragrhya('aho', particleContext)).toBe(true); // ah! alas!
      expect(isPragrhya('bho', particleContext)).toBe(true); // hey! ho!
      expect(isPragrhya('ho', particleContext)).toBe(true); // ho!
      
      // These should prevent sandhi
      expect(preventsSandhi('aho', 'kaṣṭam', particleContext)).toBe(true); // aho kaṣṭam (alas, trouble!)
      expect(preventsSandhi('bho', 'rāma', particleContext)).toBe(true); // bho rāma (hey Rama!)
    });

    it('should distinguish particles from regular words', () => {
      // Regular words ending in 'o' should not be प्रगृह्य
      expect(isPragrhya('rāmo', { isParticle: false })).toBe(false);
      expect(isPragrhya('devo', { isParticle: false })).toBe(false);
      
      // But the same forms as particles should be प्रगृह्य
      expect(isPragrhya('ho', { isParticle: true })).toBe(true);
      
      // Sandhi behavior should differ
      expect(preventsSandhi('rāmo', 'iti', { isParticle: false })).toBe(false);
      expect(preventsSandhi('ho', 'iti', { isParticle: true })).toBe(true);
    });
  });
});
