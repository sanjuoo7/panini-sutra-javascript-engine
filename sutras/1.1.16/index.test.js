/**
 * Test cases for Sutra 1.1.16: सम्बुद्धौ शाकल्यस्येतावनार्षे
 * Testing vocative singular 'o' endings before 'iti' as pragṛhya
 */

import { 
  isPragrhya, 
  isPragrhyaVocativeO, 
  getVocativeOExamples,
  hasPragrhyaBehavior 
} from './index.js';

describe('Sutra 1.1.16: सम्बुद्धौ शाकल्यस्येतावनार्षे', () => {
  describe('isPragrhyaVocativeO', () => {
    it('should identify vocative o before iti as pragṛhya', () => {
      const context = { 
        nextWord: 'iti', 
        grammaticalCase: 'vocative', 
        isVedic: false 
      };
      
      expect(isPragrhyaVocativeO('rāmo', context)).toBe(true);
      expect(isPragrhyaVocativeO('devo', context)).toBe(true);
      expect(isPragrhyaVocativeO('putro', context)).toBe(true);
      expect(isPragrhyaVocativeO('रामो', context)).toBe(true);
      expect(isPragrhyaVocativeO('देवो', context)).toBe(true);
    });

    it('should reject non-vocative cases', () => {
      const context = { 
        nextWord: 'iti', 
        grammaticalCase: 'nominative', 
        isVedic: false 
      };
      
      expect(isPragrhyaVocativeO('rāmo', context)).toBe(false);
      expect(isPragrhyaVocativeO('रामो', context)).toBe(false);
    });

    it('should reject when not followed by iti', () => {
      const context = { 
        nextWord: 'gacchati', 
        grammaticalCase: 'vocative', 
        isVedic: false 
      };
      
      expect(isPragrhyaVocativeO('rāmo', context)).toBe(false);
      expect(isPragrhyaVocativeO('रामो', context)).toBe(false);
    });

    it('should reject in Vedic literature', () => {
      const context = { 
        nextWord: 'iti', 
        grammaticalCase: 'vocative', 
        isVedic: true 
      };
      
      expect(isPragrhyaVocativeO('rāmo', context)).toBe(false);
      expect(isPragrhyaVocativeO('रामो', context)).toBe(false);
    });

    it('should reject words not ending in o', () => {
      const context = { 
        nextWord: 'iti', 
        grammaticalCase: 'vocative', 
        isVedic: false 
      };
      
      expect(isPragrhyaVocativeO('rama', context)).toBe(false);
      expect(isPragrhyaVocativeO('deva', context)).toBe(false);
      expect(isPragrhyaVocativeO('राम', context)).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isPragrhyaVocativeO('', {})).toBe(false);
      expect(isPragrhyaVocativeO(null, {})).toBe(false);
      expect(isPragrhyaVocativeO('o', {})).toBe(false); // missing context
    });
  });

  describe('isPragrhya', () => {
    it('should include base pragṛhya rules', () => {
      // Test that it includes previous sutra rules
      expect(isPragrhya('amī')).toBe(true); // from 1.1.12
      expect(isPragrhya('aho', { isParticle: true })).toBe(true); // from 1.1.15 (needs particle context)
    });

    it('should include this sutra\'s vocative rule', () => {
      const context = { 
        nextWord: 'iti', 
        grammaticalCase: 'vocative', 
        isVedic: false 
      };
      
      expect(isPragrhya('rāmo', context)).toBe(true);
      expect(isPragrhya('रामो', context)).toBe(true);
    });

    it('should work with different contexts', () => {
      const itiContext = { 
        nextWord: 'iti', 
        grammaticalCase: 'vocative', 
        isVedic: false 
      };
      const devanagariIti = { 
        nextWord: 'इति', 
        grammaticalCase: 'vocative', 
        isVedic: false 
      };
      
      expect(isPragrhya('guro', itiContext)).toBe(true);
      expect(isPragrhya('गुरो', devanagariIti)).toBe(true);
    });
  });

  describe('getVocativeOExamples', () => {
    it('should return IAST examples by default', () => {
      const examples = getVocativeOExamples();
      expect(examples).toContain('rāmo');
      expect(examples).toContain('devo');
      expect(examples).toContain('putro');
      expect(examples).toContain('guro');
    });

    it('should return IAST examples when explicitly requested', () => {
      const examples = getVocativeOExamples('IAST');
      expect(examples).toContain('rāmo');
      expect(examples).toContain('devo');
    });

    it('should return Devanagari examples when requested', () => {
      const examples = getVocativeOExamples('Devanagari');
      expect(examples).toContain('रामो');
      expect(examples).toContain('देवो');
      expect(examples).toContain('पुत्रो');
      expect(examples).toContain('गुरो');
    });

    it('should return arrays of appropriate length', () => {
      const iastExamples = getVocativeOExamples('IAST');
      const devanagariExamples = getVocativeOExamples('Devanagari');
      
      expect(iastExamples.length).toBeGreaterThan(0);
      expect(devanagariExamples.length).toEqual(iastExamples.length);
    });
  });

  describe('hasPragrhyaBehavior', () => {
    it('should return true for vocative o words before iti', () => {
      const context = { 
        nextWord: 'iti', 
        grammaticalCase: 'vocative', 
        isVedic: false 
      };
      
      expect(hasPragrhyaBehavior('rāmo', context)).toBe(true);
      expect(hasPragrhyaBehavior('रामो', context)).toBe(true);
    });

    it('should return false for words not meeting criteria', () => {
      const context = { 
        nextWord: 'gacchati', 
        grammaticalCase: 'vocative', 
        isVedic: false 
      };
      
      expect(hasPragrhyaBehavior('rāmo', context)).toBe(false);
      expect(hasPragrhyaBehavior('राम', context)).toBe(false);
    });

    it('should work with grammatical context', () => {
      const context = { 
        nextWord: 'iti', 
        grammaticalCase: 'vocative', 
        isVedic: false,
        isShakalaOpinion: true 
      };
      
      expect(hasPragrhyaBehavior('putro', context)).toBe(true);
    });
  });

  describe('real-world examples', () => {
    it('should work with common vocative expressions', () => {
      const context = { 
        nextWord: 'iti', 
        grammaticalCase: 'vocative', 
        isVedic: false 
      };
      
      // "O Rama!" iti - addressing someone
      expect(isPragrhya('rāmo', context)).toBe(true);
      
      // "O God!" iti - exclamation
      expect(isPragrhya('devo', context)).toBe(true);
      
      // "O son!" iti - address
      expect(isPragrhya('putro', context)).toBe(true);
    });

    it('should distinguish from non-vocative forms', () => {
      // Same words but different cases
      expect(isPragrhya('rāmaḥ')).toBe(false); // nominative
      expect(isPragrhya('rāmam')).toBe(false); // accusative
      expect(isPragrhya('rāmasya')).toBe(false); // genitive
    });

    it('should work in sentence contexts', () => {
      const context = { 
        nextWord: 'iti', 
        grammaticalCase: 'vocative', 
        isVedic: false 
      };
      
      // Classical literature contexts
      expect(isPragrhya('hero', context)).toBe(true);
      expect(isPragrhya('वीरो', context)).toBe(true);
    });
  });
});
