/**
 * Test cases for Sutra 1.1.20: दाधा घ्वदाप्
 * "The words having the form of दा 'to give' and धा 'to place' are called घु।"
 */

import { isGhu, getGhuRoots, hasGhuBehavior, analyzeGhu } from './index.js';

describe('Sutra 1.1.20: दाधा घ्वदाप्', () => {
  describe('isGhu', () => {
    it('should identify दा as घु', () => {
      expect(isGhu('dā')).toBe(true);
      expect(isGhu('दा')).toBe(true);
    });

    it('should identify धा as घु', () => {
      expect(isGhu('dhā')).toBe(true);
      expect(isGhu('धा')).toBe(true);
    });

    it('should reject other roots as not घु', () => {
      expect(isGhu('kar')).toBe(false);
      expect(isGhu('gam')).toBe(false);
      expect(isGhu('bhū')).toBe(false);
      expect(isGhu('कर्')).toBe(false);
      expect(isGhu('गम्')).toBe(false);
    });

    it('should handle similar but different roots', () => {
      expect(isGhu('da')).toBe(false); // short 'a', not दा
      expect(isGhu('dha')).toBe(false); // short 'a', not धा
      expect(isGhu('द')).toBe(false); // incomplete
      expect(isGhu('ध')).toBe(false); // incomplete
    });

    it('should handle edge cases', () => {
      expect(isGhu('')).toBe(false);
      expect(isGhu(null)).toBe(false);
      expect(isGhu(undefined)).toBe(false);
    });
  });

  describe('getGhuRoots', () => {
    it('should return IAST roots by default', () => {
      const roots = getGhuRoots();
      expect(roots).toEqual(['dā', 'dhā']);
    });

    it('should return IAST roots when explicitly requested', () => {
      const roots = getGhuRoots('IAST');
      expect(roots).toEqual(['dā', 'dhā']);
    });

    it('should return Devanagari roots when requested', () => {
      const roots = getGhuRoots('Devanagari');
      expect(roots).toEqual(['दा', 'धा']);
    });
  });

  describe('hasGhuBehavior', () => {
    it('should return true for घु roots', () => {
      expect(hasGhuBehavior('dā')).toBe(true);
      expect(hasGhuBehavior('dhā')).toBe(true);
      expect(hasGhuBehavior('दा')).toBe(true);
      expect(hasGhuBehavior('धा')).toBe(true);
    });

    it('should return false for non-घु roots', () => {
      expect(hasGhuBehavior('kar')).toBe(false);
      expect(hasGhuBehavior('gam')).toBe(false);
      expect(hasGhuBehavior('bhū')).toBe(false);
    });

    it('should work with grammatical context', () => {
      expect(hasGhuBehavior('dā', { tense: 'present' })).toBe(true);
      expect(hasGhuBehavior('dhā', { person: 'third' })).toBe(true);
      expect(hasGhuBehavior('kar', { tense: 'present' })).toBe(false);
    });
  });

  describe('real-world examples', () => {
    it('should work with common verb forms', () => {
      // दा (to give) is घु
      expect(isGhu('dā')).toBe(true);
      expect(isGhu('दा')).toBe(true);
      
      // धा (to place/put) is घु  
      expect(isGhu('dhā')).toBe(true);
      expect(isGhu('धा')).toBe(true);
    });

    it('should distinguish from similar roots', () => {
      // These are different roots, not घु
      expect(isGhu('dadā')).toBe(false); // reduplicated form
      expect(isGhu('dadhā')).toBe(false); // reduplicated form
      expect(isGhu('dāta')).toBe(false); // participial form
      expect(isGhu('dhāta')).toBe(false); // participial form
    });

    it('should work for grammatical rule application', () => {
      // घु roots behave specially in certain contexts
      const ghuRoots = getGhuRoots();
      
      ghuRoots.forEach(root => {
        expect(hasGhuBehavior(root)).toBe(true);
      });
      
      // Non-घु roots should not have घु behavior
      const nonGhuRoots = ['kar', 'gam', 'bhū', 'as', 'kṛ'];
      nonGhuRoots.forEach(root => {
        expect(hasGhuBehavior(root)).toBe(false);
      });
    });
  });

  describe('analyzeGhu (Comprehensive Analysis)', () => {
    describe('Valid घु Roots', () => {
      it('should analyze दा (dā - to give) correctly', () => {
        const result = analyzeGhu('दा');
        
        expect(result.isValid).toBe(true);
        expect(result.input).toBe('दा');
        expect(result.normalizedInput).toBe('dā');
        expect(result.isGhu).toBe(true);
        expect(result.analysis).toBeDefined();
        expect(result.analysis.morphological.root).toBe('dā');
        expect(result.analysis.morphological.meaning).toBe('to give');
        expect(result.analysis.morphological.dhatu).toBe('दा');
        expect(result.analysis.morphological.rootClass).toBe('root');
        expect(result.analysis.morphological.vocalLength).toBe('long');
        
        expect(result.analysis.semantic.primaryMeaning).toBe('to give, bestow, grant');
        expect(result.analysis.semantic.category).toBe('transitive action');
        expect(result.analysis.semantic.domain).toBe('giving/donation');
        
        expect(result.analysis.syntactic.grammaticalRole).toBe('verbal root');
        expect(result.analysis.syntactic.classification).toBe('ghu');
        expect(result.analysis.syntactic.applicableRules).toContain('1.1.20');
        
        expect(result.confidence).toBeGreaterThan(0.9);
        expect(result.metadata.sutraNumber).toBe('1.1.20');
        expect(result.metadata.sutraText).toBe('दाधा घ्वदाप्');
        expect(result.metadata.commentaryReferences).toContain('Kāśikā');
      });

      it('should analyze धा (dhā - to place) correctly', () => {
        const result = analyzeGhu('धा');
        
        expect(result.isValid).toBe(true);
        expect(result.input).toBe('धा');
        expect(result.normalizedInput).toBe('dhā');
        expect(result.isGhu).toBe(true);
        expect(result.analysis.morphological.root).toBe('dhā');
        expect(result.analysis.morphological.meaning).toBe('to place');
        expect(result.analysis.morphological.dhatu).toBe('धा');
        
        expect(result.analysis.semantic.primaryMeaning).toBe('to place, put, hold');
        expect(result.analysis.semantic.category).toBe('transitive action');
        expect(result.analysis.semantic.domain).toBe('placement/positioning');
        
        expect(result.analysis.syntactic.classification).toBe('ghu');
        expect(result.confidence).toBeGreaterThan(0.9);
      });

      it('should handle IAST input correctly', () => {
        const result1 = analyzeGhu('dā');
        const result2 = analyzeGhu('dhā');
        
        expect(result1.isGhu).toBe(true);
        expect(result1.normalizedInput).toBe('dā');
        expect(result2.isGhu).toBe(true);
        expect(result2.normalizedInput).toBe('dhā');
      });

      it('should provide traditional commentary references', () => {
        const result = analyzeGhu('दा');
        
        expect(result.metadata.commentaryReferences).toContain('Kāśikā');
        expect(result.metadata.traditionalExplanation).toContain('दा धा इत्येतौ घु संज्ञौ भवतः');
        expect(result.metadata.modernExplanation).toContain('This sutra defines the technical term');
      });
    });

    describe('Invalid Inputs', () => {
      it('should handle non-घु roots correctly', () => {
        const result = analyzeGhu('कर्');
        
        expect(result.isValid).toBe(true);
        expect(result.isGhu).toBe(false);
        expect(result.analysis.syntactic.classification).toBe('non-ghu');
        expect(result.confidence).toBeLessThan(0.5);
      });

      it('should handle invalid Sanskrit words', () => {
        const result = analyzeGhu('xyz');
        
        expect(result.isValid).toBe(false);
        expect(result.isGhu).toBe(false);
        expect(result.errors).toContain('Invalid Sanskrit word');
        expect(result.confidence).toBe(0);
      });

      it('should handle empty or null input', () => {
        const result1 = analyzeGhu('');
        const result2 = analyzeGhu(null);
        const result3 = analyzeGhu(undefined);
        
        [result1, result2, result3].forEach(result => {
          expect(result.isValid).toBe(false);
          expect(result.isGhu).toBe(false);
          expect(result.errors).toContain('Input is required');
          expect(result.confidence).toBe(0);
        });
      });
    });

    describe('Context-Aware Analysis', () => {
      it('should provide enhanced analysis with grammatical context', () => {
        const result = analyzeGhu('दा', { 
          includeUsageExamples: true,
          includeRelatedRules: true 
        });
        
        expect(result.isGhu).toBe(true);
        expect(result.metadata.usageExamples).toBeDefined();
        expect(result.metadata.relatedRules).toBeDefined();
        expect(result.metadata.relatedRules.length).toBeGreaterThan(0);
      });

      it('should handle script variations consistently', () => {
        const resultDev = analyzeGhu('दा');
        const resultIAST = analyzeGhu('dā');
        
        expect(resultDev.isGhu).toBe(resultIAST.isGhu);
        expect(resultDev.analysis.morphological.root).toBe(resultIAST.analysis.morphological.root);
        expect(resultDev.confidence).toBe(resultIAST.confidence);
      });
    });

    describe('Morphological Analysis', () => {
      it('should identify root characteristics correctly', () => {
        const result = analyzeGhu('दा');
        
        expect(result.analysis.morphological.rootClass).toBe('root');
        expect(result.analysis.morphological.vocalLength).toBe('long');
        expect(result.analysis.morphological.structure).toBe('consonant + long vowel');
      });

      it('should distinguish from reduplicated forms', () => {
        const result = analyzeGhu('ददा'); // reduplicated दा
        
        expect(result.isGhu).toBe(false);
        expect(result.analysis.syntactic.classification).toBe('non-ghu');
      });
    });

    describe('Semantic Analysis', () => {
      it('should categorize semantic domains correctly', () => {
        const resultDa = analyzeGhu('दा');
        const resultDha = analyzeGhu('धा');
        
        expect(resultDa.analysis.semantic.domain).toBe('giving/donation');
        expect(resultDha.analysis.semantic.domain).toBe('placement/positioning');
        
        expect(resultDa.analysis.semantic.category).toBe('transitive action');
        expect(resultDha.analysis.semantic.category).toBe('transitive action');
      });
    });

    describe('Confidence Scoring', () => {
      it('should assign high confidence to valid घु roots', () => {
        const result1 = analyzeGhu('दा');
        const result2 = analyzeGhu('धा');
        
        expect(result1.confidence).toBeGreaterThan(0.9);
        expect(result2.confidence).toBeGreaterThan(0.9);
      });

      it('should assign low confidence to non-घु roots', () => {
        const result = analyzeGhu('कर्');
        expect(result.confidence).toBeLessThan(0.5);
      });

      it('should assign zero confidence to invalid inputs', () => {
        const result = analyzeGhu('invalid');
        expect(result.confidence).toBe(0);
      });
    });
  });
});
