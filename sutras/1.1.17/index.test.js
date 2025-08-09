/**
 * Test cases for Sutra 1.1.17: उञः
 * Testing the particle ऊञ् before 'iti' as pragṛhya
 */

import { 
  isPragrhya, 
  isPragrhyaUnj, 
  getUnjParticles,
  hasPragrhyaBehavior 
} from './index.js';

describe('Sutra 1.1.17: उञः', () => {
  describe('isPragrhyaUnj', () => {
    it('should identify ऊञ् before iti as pragṛhya', () => {
      const context = { nextWord: 'iti' };
      
      expect(isPragrhyaUnj('ūñ', context)).toBe(true);
      expect(isPragrhyaUnj('uñ', context)).toBe(true);
      expect(isPragrhyaUnj('ऊञ्', context)).toBe(true);
      expect(isPragrhyaUnj('ऊञ', context)).toBe(true);
    });

    it('should work with Devanagari iti', () => {
      const context = { nextWord: 'इति' };
      
      expect(isPragrhyaUnj('ūñ', context)).toBe(true);
      expect(isPragrhyaUnj('ऊञ्', context)).toBe(true);
    });

    it('should reject when not followed by iti', () => {
      const context = { nextWord: 'gacchati' };
      
      expect(isPragrhyaUnj('ūñ', context)).toBe(false);
      expect(isPragrhyaUnj('ऊञ्', context)).toBe(false);
    });

    it('should reject other particles', () => {
      const context = { nextWord: 'iti' };
      
      expect(isPragrhyaUnj('aho', context)).toBe(false);
      expect(isPragrhyaUnj('om', context)).toBe(false);
      expect(isPragrhyaUnj('हे', context)).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isPragrhyaUnj('', {})).toBe(false);
      expect(isPragrhyaUnj(null, {})).toBe(false);
      expect(isPragrhyaUnj('ūñ', {})).toBe(false); // missing iti context
    });
  });

  describe('isPragrhya', () => {
    it('should include base pragṛhya rules', () => {
      // Test that it includes previous sutra rules
      expect(isPragrhya('amī')).toBe(true); // from 1.1.12
      expect(isPragrhya('aho', { isParticle: true })).toBe(true); // from 1.1.15 (needs particle context)
      
      const vocativeContext = { 
        nextWord: 'iti', 
        grammaticalCase: 'vocative', 
        isVedic: false 
      };
      expect(isPragrhya('rāmo', vocativeContext)).toBe(true); // from 1.1.16
    });

    it('should include this sutra\'s ऊञ् rule', () => {
      const context = { nextWord: 'iti' };
      
      expect(isPragrhya('ūñ', context)).toBe(true);
      expect(isPragrhya('ऊञ्', context)).toBe(true);
    });

    it('should work with different contexts', () => {
      const itiContext = { nextWord: 'iti' };
      const devanagariIti = { nextWord: 'इति' };
      
      expect(isPragrhya('uñ', itiContext)).toBe(true);
      expect(isPragrhya('ऊञ', devanagariIti)).toBe(true);
    });
  });

  describe('getUnjParticles', () => {
    it('should return IAST particles by default', () => {
      const particles = getUnjParticles();
      expect(particles).toContain('ūñ');
      expect(particles).toContain('uñ');
    });

    it('should return IAST particles when explicitly requested', () => {
      const particles = getUnjParticles('IAST');
      expect(particles).toContain('ūñ');
      expect(particles).toContain('uñ');
    });

    it('should return Devanagari particles when requested', () => {
      const particles = getUnjParticles('Devanagari');
      expect(particles).toContain('ऊञ्');
      expect(particles).toContain('ऊञ');
    });

    it('should return arrays of appropriate length', () => {
      const iastParticles = getUnjParticles('IAST');
      const devanagariParticles = getUnjParticles('Devanagari');
      
      expect(iastParticles.length).toBeGreaterThan(0);
      expect(devanagariParticles.length).toEqual(iastParticles.length);
    });
  });

  describe('hasPragrhyaBehavior', () => {
    it('should return true for ऊञ् before iti', () => {
      const context = { nextWord: 'iti' };
      
      expect(hasPragrhyaBehavior('ūñ', context)).toBe(true);
      expect(hasPragrhyaBehavior('ऊञ्', context)).toBe(true);
    });

    it('should return false for particles not meeting criteria', () => {
      const context = { nextWord: 'gacchati' };
      
      expect(hasPragrhyaBehavior('ūñ', context)).toBe(false);
      expect(hasPragrhyaBehavior('ऊञ्', context)).toBe(false);
    });

    it('should work with grammatical context', () => {
      const context = { 
        nextWord: 'iti',
        isShakalaOpinion: true 
      };
      
      expect(hasPragrhyaBehavior('uñ', context)).toBe(true);
    });
  });

  describe('real-world examples', () => {
    it('should work with affirmative expressions', () => {
      const context = { nextWord: 'iti' };
      
      // "ūñ" iti - affirmation/agreement
      expect(isPragrhya('ūñ', context)).toBe(true);
      expect(isPragrhya('ऊञ्', context)).toBe(true);
    });

    it('should distinguish from similar particles', () => {
      const context = { nextWord: 'iti' };
      
      // Only ऊञ् is covered by this sutra, not other particles
      expect(isPragrhya('om', context)).toBe(false);
      expect(isPragrhya('ओम्', context)).toBe(false);
      expect(isPragrhya('hum', context)).toBe(false);
    });

    it('should work in dialogue contexts', () => {
      const context = { nextWord: 'iti' };
      
      // Classical literature - dialogue markers
      expect(isPragrhya('uñ', context)).toBe(true); // agreement/affirmation
      expect(isPragrhya('ऊञ', context)).toBe(true);
    });

    it('should respect Śākalya\'s opinion context', () => {
      const shakalaContext = { 
        nextWord: 'iti',
        isShakalaOpinion: true,
        isVedic: false
      };
      
      expect(isPragrhya('ūñ', shakalaContext)).toBe(true);
      expect(isPragrhya('ऊञ्', shakalaContext)).toBe(true);
    });
  });
});
