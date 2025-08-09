/**
 * Test cases for Sutra 1.1.19: ईदूतौ च सप्तम्यर्थे
 * Testing words ending in ī/ū with locative sense as pragṛhya
 */

import { 
  isPragrhya, 
  isPragrhyaIU, 
  hasLocativeMeaning,
  getLocativeIUExamples,
  hasPragrhyaBehavior 
} from './index.js';

describe('Sutra 1.1.19: ईदूतौ च सप्तम्यर्थे', () => {
  describe('isPragrhyaIU', () => {
    it('should identify ī endings with locative sense as pragṛhya', () => {
      const context = { hasLocativeSense: true };
      
      expect(isPragrhyaIU('addhī', context)).toBe(true);
      expect(isPragrhyaIU('parī', context)).toBe(true);
      expect(isPragrhyaIU('prabhṛtī', context)).toBe(true);
      expect(isPragrhyaIU('अद्धी', context)).toBe(true);
      expect(isPragrhyaIU('परी', context)).toBe(true);
    });

    it('should identify ū endings with locative sense as pragṛhya', () => {
      const context = { hasLocativeSense: true };
      
      expect(isPragrhyaIU('yāvatū', context)).toBe(true);
      expect(isPragrhyaIU('tāvatū', context)).toBe(true);
      expect(isPragrhyaIU('यावतू', context)).toBe(true);
    });

    it('should work with explicit locative meaning', () => {
      const context = { meaning: 'locative' };
      
      expect(isPragrhyaIU('kutrī', context)).toBe(true);
      expect(isPragrhyaIU('tatrī', context)).toBe(true);
      expect(isPragrhyaIU('कुत्री', context)).toBe(true);
    });

    it('should reject words without locative sense', () => {
      const context = { hasLocativeSense: false };
      
      expect(isPragrhyaIU('devī', context)).toBe(false);
      expect(isPragrhyaIU('guru', context)).toBe(false);
      expect(isPragrhyaIU('देवी', context)).toBe(false);
    });

    it('should reject words not ending in ī/ū', () => {
      const context = { hasLocativeSense: true };
      
      expect(isPragrhyaIU('tatra', context)).toBe(false);
      expect(isPragrhyaIU('kutra', context)).toBe(false);
      expect(isPragrhyaIU('तत्र', context)).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isPragrhyaIU('', {})).toBe(false);
      expect(isPragrhyaIU(null, {})).toBe(false);
      expect(isPragrhyaIU('ī', { hasLocativeSense: true })).toBe(true);
    });
  });

  describe('hasLocativeMeaning', () => {
    it('should identify common locative words', () => {
      expect(hasLocativeMeaning('addhī')).toBe(true);
      expect(hasLocativeMeaning('parī')).toBe(true);
      expect(hasLocativeMeaning('prabhṛtī')).toBe(true);
      expect(hasLocativeMeaning('अद्धी')).toBe(true);
      expect(hasLocativeMeaning('परी')).toBe(true);
    });

    it('should identify locative patterns', () => {
      // Words with 'tra' pattern
      expect(hasLocativeMeaning('kutrī')).toBe(true);
      expect(hasLocativeMeaning('tatrī')).toBe(true);
      expect(hasLocativeMeaning('कुत्री')).toBe(true);
      
      // Words with 'dā' pattern  
      expect(hasLocativeMeaning('kadāī')).toBe(true);
      expect(hasLocativeMeaning('कदाी')).toBe(true); // using vowel sign ी, not independent ई
    });

    it('should reject non-locative words', () => {
      expect(hasLocativeMeaning('devī')).toBe(false);
      expect(hasLocativeMeaning('guru')).toBe(false);
      expect(hasLocativeMeaning('ramā')).toBe(false);
      expect(hasLocativeMeaning('देवी')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(hasLocativeMeaning('')).toBe(false);
      expect(hasLocativeMeaning(null)).toBe(false);
    });
  });

  describe('isPragrhya', () => {
    it('should include base pragṛhya rules', () => {
      // Test that it includes previous sutra rules
      expect(isPragrhya('amī')).toBe(true); // from 1.1.12
      expect(isPragrhya('aho', { isParticle: true })).toBe(true); // from 1.1.15 (needs particle context)
      expect(isPragrhya('ऊँ')).toBe(true);  // from 1.1.18
    });

    it('should include this sutra\'s ī/ū locative rule', () => {
      const context = { hasLocativeSense: true };
      
      expect(isPragrhya('addhī', context)).toBe(true);
      expect(isPragrhya('परी', context)).toBe(true);
    });

    it('should auto-detect locative meaning', () => {
      // Should work without explicit context for known locative words
      expect(isPragrhya('addhī')).toBe(true);
      expect(isPragrhya('prabhṛtī')).toBe(true);
      expect(isPragrhya('अद्धी')).toBe(true);
    });

    it('should work with explicit contexts', () => {
      const locativeContext = { meaning: 'locative' };
      
      expect(isPragrhya('someī', locativeContext)).toBe(true);
      expect(isPragrhya('कुछू', locativeContext)).toBe(true);
    });
  });

  describe('getLocativeIUExamples', () => {
    it('should return IAST examples by default', () => {
      const examples = getLocativeIUExamples();
      expect(examples).toContain('addhī');
      expect(examples).toContain('parī');
      expect(examples).toContain('prabhṛtī');
    });

    it('should return IAST examples when explicitly requested', () => {
      const examples = getLocativeIUExamples('IAST');
      expect(examples).toContain('addhī');
      expect(examples).toContain('tatra');
    });

    it('should return Devanagari examples when requested', () => {
      const examples = getLocativeIUExamples('Devanagari');
      expect(examples).toContain('अद्धी');
      expect(examples).toContain('परी');
      expect(examples).toContain('प्रभृती');
    });

    it('should return arrays of appropriate length', () => {
      const iastExamples = getLocativeIUExamples('IAST');
      const devanagariExamples = getLocativeIUExamples('Devanagari');
      
      expect(iastExamples.length).toBeGreaterThan(0);
      expect(devanagariExamples.length).toEqual(iastExamples.length);
    });
  });

  describe('hasPragrhyaBehavior', () => {
    it('should return true for locative ī/ū words', () => {
      const context = { hasLocativeSense: true };
      
      expect(hasPragrhyaBehavior('addhī', context)).toBe(true);
      expect(hasPragrhyaBehavior('परी', context)).toBe(true);
    });

    it('should return false for non-locative words', () => {
      expect(hasPragrhyaBehavior('devī')).toBe(false);
      expect(hasPragrhyaBehavior('guru')).toBe(false);
    });

    it('should work with grammatical context', () => {
      const context = { 
        hasLocativeSense: true,
        meaning: 'locative'
      };
      
      expect(hasPragrhyaBehavior('kutrī', context)).toBe(true);
    });
  });

  describe('real-world examples', () => {
    it('should work with temporal locatives', () => {
      const context = { hasLocativeSense: true };
      
      // Time expressions with locative sense
      expect(isPragrhya('addhī', context)).toBe(true); // real locative word
      expect(isPragrhya('प्रभृती', context)).toBe(true); // real locative word
    });

    it('should work with spatial locatives', () => {
      const context = { hasLocativeSense: true };
      
      // Place expressions
      expect(isPragrhya('kutrī', context)).toBe(true); // "where"
      expect(isPragrhya('tatrī', context)).toBe(true); // "there"
      expect(isPragrhya('कुत्री', context)).toBe(true);
    });

    it('should distinguish from similar non-locative words', () => {
      // Similar endings but no locative sense
      expect(isPragrhya('devī')).toBe(false);  // goddess (not locative)
      expect(isPragrhya('nadī')).toBe(false);  // river (not locative)
      expect(isPragrhya('गुरू')).toBe(false);  // teacher (not locative)
    });

    it('should work with inferential recognition', () => {
      // Should recognize locative patterns automatically
      expect(isPragrhya('addhī')).toBe(true); // well-known locative
      expect(isPragrhya('prabhṛtī')).toBe(true); // "from, starting from"
      expect(isPragrhya('प्रभृती')).toBe(true);
    });

    it('should work in compound expressions', () => {
      const context = { hasLocativeSense: true };
      
      // Complex locative expressions
      expect(isPragrhya('sarvatra-sthitī', context)).toBe(true);
      expect(isPragrhya('सर्वत्र-स्थिती', context)).toBe(true);
    });
  });
});
