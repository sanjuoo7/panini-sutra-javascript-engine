/**
 * Test cases for Sutra 1.1.27: सर्वादीनि सर्वनामानि
 * "The words सर्व 'all' and the rest are called सर्वनाम or pronouns."
 */

import { isSarvanama, getSarvadiWords, hasSarvanamaBehavior, analyzeSarvanama } from './index.js';

describe('Sutra 1.1.27: सर्वादीनि सर्वनामानि', () => {
  describe('isSarvanama', () => {
    it('should identify सर्व as सर्वनाम', () => {
      expect(isSarvanama('sarva')).toBe(true);
      expect(isSarvanama('सर्व')).toBe(true);
      expect(isSarvanama('sarvaḥ')).toBe(true); // nominative
      expect(isSarvanama('सर्वः')).toBe(true);
    });

    it('should identify common pronouns as सर्वनाम', () => {
      expect(isSarvanama('tad')).toBe(true);
      expect(isSarvanama('etad')).toBe(true);
      expect(isSarvanama('idam')).toBe(true);
      expect(isSarvanama('kim')).toBe(true);
      expect(isSarvanama('yad')).toBe(true);
      
      // Devanagari
      expect(isSarvanama('तद्')).toBe(true);
      expect(isSarvanama('एतद्')).toBe(true);
      expect(isSarvanama('इदम्')).toBe(true);
    });

    it('should identify personal pronouns as सर्वनाम', () => {
      expect(isSarvanama('asmad')).toBe(true); // we/us
      expect(isSarvanama('yuṣmad')).toBe(true); // you
      expect(isSarvanama('अस्मद्')).toBe(true);
      expect(isSarvanama('युष्मद्')).toBe(true);
    });

    it('should identify other सर्वादि words as सर्वनाम', () => {
      expect(isSarvanama('anya')).toBe(true); // other
      expect(isSarvanama('viśva')).toBe(true); // all
      expect(isSarvanama('ubha')).toBe(true); // both
      expect(isSarvanama('pūrva')).toBe(true); // former
      expect(isSarvanama('para')).toBe(true); // latter
      
      // Devanagari
      expect(isSarvanama('अन्य')).toBe(true);
      expect(isSarvanama('विश्व')).toBe(true);
      expect(isSarvanama('पूर्व')).toBe(true);
    });

    it('should reject regular nouns', () => {
      expect(isSarvanama('rāma')).toBe(false);
      expect(isSarvanama('deva')).toBe(false);
      expect(isSarvanama('agni')).toBe(false);
      expect(isSarvanama('राम')).toBe(false);
      expect(isSarvanama('देव')).toBe(false);
    });

    it('should handle inflected forms', () => {
      expect(isSarvanama('sarvasya')).toBe(true); // genitive of sarva
      expect(isSarvanama('tasyāḥ')).toBe(true); // genitive fem. of tad
      expect(isSarvanama('kimcit')).toBe(true); // something
      expect(isSarvanama('सर्वस्य')).toBe(true);
    });

    it('should handle edge cases', () => {
      expect(isSarvanama('')).toBe(false);
      expect(isSarvanama(null)).toBe(false);
      expect(isSarvanama(undefined)).toBe(false);
    });
  });

  describe('getSarvadiWords', () => {
    it('should return IAST words by default', () => {
      const words = getSarvadiWords();
      expect(words).toContain('sarva');
      expect(words).toContain('tad');
      expect(words).toContain('kim');
      expect(words).toContain('yad');
    });

    it('should return IAST words when explicitly requested', () => {
      const words = getSarvadiWords('IAST');
      expect(words).toContain('sarva');
      expect(words).toContain('viśva');
      expect(words).toContain('anya');
    });

    it('should return Devanagari words when requested', () => {
      const words = getSarvadiWords('Devanagari');
      expect(words).toContain('सर्व');
      expect(words).toContain('तद्');
      expect(words).toContain('किम्');
    });

    it('should return arrays of appropriate length', () => {
      const iastWords = getSarvadiWords('IAST');
      const devanagariWords = getSarvadiWords('Devanagari');
      expect(iastWords.length).toBeGreaterThan(20);
      expect(devanagariWords.length).toBe(iastWords.length);
    });
  });

  describe('hasSarvanamaBehavior', () => {
    it('should return true for सर्वनाम words', () => {
      expect(hasSarvanamaBehavior('sarva')).toBe(true);
      expect(hasSarvanamaBehavior('tad')).toBe(true);
      expect(hasSarvanamaBehavior('kim')).toBe(true);
      expect(hasSarvanamaBehavior('सर्व')).toBe(true);
    });

    it('should return false for non-सर्वनाम words', () => {
      expect(hasSarvanamaBehavior('rāma')).toBe(false);
      expect(hasSarvanamaBehavior('deva')).toBe(false);
      expect(hasSarvanamaBehavior('agni')).toBe(false);
    });

    it('should work with grammatical context', () => {
      expect(hasSarvanamaBehavior('sarva', { case: 'nominative' })).toBe(true);
      expect(hasSarvanamaBehavior('tad', { number: 'singular' })).toBe(true);
      expect(hasSarvanamaBehavior('rāma', { case: 'nominative' })).toBe(false);
    });
  });

  describe('real-world examples', () => {
    it('should work with common sentences', () => {
      // Common pronouns in sentences
      expect(isSarvanama('sarva')).toBe(true); // all
      expect(isSarvanama('ayam')).toBe(false); // this (from idam, but inflected)
      expect(isSarvanama('idam')).toBe(true); // this (base form)
      expect(isSarvanama('tat')).toBe(true); // that
      expect(isSarvanama('yat')).toBe(true); // which/that
    });

    it('should distinguish pronouns from similar regular words', () => {
      // सर्वनाम words
      expect(isSarvanama('para')).toBe(true); // other/supreme (pronoun)
      expect(isSarvanama('pūrva')).toBe(true); // former (pronoun)
      expect(isSarvanama('uttara')).toBe(true); // latter (pronoun)
      
      // Regular words (should be false for basic classification)
      expect(isSarvanama('nara')).toBe(false); // man
      expect(isSarvanama('guru')).toBe(false); // teacher
      expect(isSarvanama('mata')).toBe(false); // mother
    });

    it('should work with interrogative and relative pronouns', () => {
      expect(isSarvanama('ka')).toBe(true); // who? (interrogative)
      expect(isSarvanama('kim')).toBe(true); // what? (interrogative)
      expect(isSarvanama('yad')).toBe(true); // which/that (relative)
      expect(isSarvanama('tad')).toBe(true); // that (demonstrative)
    });
  });

  // Comprehensive Analysis Function Tests
  describe('analyzeSarvanama (comprehensive analysis)', () => {
    describe('valid sarvanāma analysis', () => {
      it('should analyze demonstrative pronouns comprehensively', () => {
        const result = analyzeSarvanama('tad');
        
        expect(result.isValid).toBe(true);
        expect(result.isSarvanama).toBe(true);
        expect(result.input).toBe('tad');
        expect(result.confidence).toBe(0.95);
        
        // Morphological analysis
        expect(result.analysis.morphological.category).toBe('pronoun');
        expect(result.analysis.morphological.subcategory).toBe('demonstrative');
        expect(result.analysis.morphological.script).toBe('IAST');
        expect(result.analysis.morphological.morphClass).toBe('sarvanāma');
        expect(result.analysis.morphological.baseForm).toBe('tad');
        
        // Semantic analysis
        expect(result.analysis.semantic.function).toBe('pronominal-reference');
        expect(result.analysis.semantic.meaning).toContain('demonstrative pronoun');
        expect(result.analysis.semantic.referenceType).toBe('deictic');
        
        // Syntactic analysis
        expect(result.analysis.syntactic.classification).toBe('sarvanāma');
        expect(result.analysis.syntactic.applicableRules).toContain('1.1.27');
        
        // Metadata
        expect(result.metadata.sutraNumber).toBe('1.1.27');
        expect(result.metadata.sutraText).toBe('सर्वादीनि सर्वनामानि');
      });

      it('should analyze interrogative pronouns comprehensively', () => {
        const result = analyzeSarvanama('किम्');
        
        expect(result.isValid).toBe(true);
        expect(result.isSarvanama).toBe(true);
        expect(result.confidence).toBe(0.95);
        
        expect(result.analysis.morphological.subcategory).toBe('interrogative');
        expect(result.analysis.morphological.script).toBe('Devanagari');
        expect(result.analysis.semantic.meaning).toContain('interrogative pronoun');
        expect(result.analysis.semantic.referenceType).toBe('question');
      });

      it('should analyze personal pronouns comprehensively', () => {
        const result = analyzeSarvanama('asmad');
        
        expect(result.isValid).toBe(true);
        expect(result.isSarvanama).toBe(true);
        expect(result.analysis.morphological.subcategory).toBe('personal');
        expect(result.analysis.semantic.meaning).toContain('personal pronoun');
        expect(result.analysis.semantic.referenceType).toBe('participant');
      });

      it('should analyze universal quantifiers comprehensively', () => {
        const result = analyzeSarvanama('सर्व');
        
        expect(result.isValid).toBe(true);
        expect(result.isSarvanama).toBe(true);
        expect(result.analysis.morphological.subcategory).toBe('universal');
        expect(result.analysis.semantic.meaning).toContain('universal quantifier');
        expect(result.analysis.semantic.referenceType).toBe('universal');
      });

      it('should analyze indefinite pronouns comprehensively', () => {
        const result = analyzeSarvanama('anya');
        
        expect(result.isValid).toBe(true);
        expect(result.isSarvanama).toBe(true);
        expect(result.analysis.morphological.subcategory).toBe('indefinite');
        expect(result.analysis.semantic.meaning).toContain('indefinite pronoun');
      });
    });

    describe('non-sarvanāma analysis', () => {
      it('should analyze non-pronouns correctly', () => {
        const result = analyzeSarvanama('गुरु');
        
        expect(result.isValid).toBe(true);
        expect(result.isSarvanama).toBe(false);
        expect(result.confidence).toBe(0.1);
        
        expect(result.analysis.morphological.category).toBe('non-pronoun');
        expect(result.analysis.semantic.function).toBe('non-pronominal');
        expect(result.analysis.syntactic.classification).toBe('non-sarvanāma');
      });
    });

    describe('enhanced context analysis', () => {
      it('should include usage examples when requested', () => {
        const result = analyzeSarvanama('yad', { includeUsageExamples: true });
        
        expect(result.metadata.usageExamples).toBeDefined();
        expect(result.metadata.usageExamples.length).toBeGreaterThan(0);
        expect(result.metadata.usageExamples[0]).toContain('yad');
      });

      it('should include related rules when requested', () => {
        const result = analyzeSarvanama('etad', { includeRelatedRules: true });
        
        expect(result.metadata.relatedRules).toBeDefined();
        expect(result.metadata.relatedRules.length).toBeGreaterThan(0);
        expect(result.metadata.relatedRules).toContain('1.1.27 - सर्वादीनि सर्वनामानि (defines sarvanāma for sarvādi words)');
      });

      it('should handle agreement context', () => {
        const result = analyzeSarvanama('idam', { agreement: 'neuter-singular-nominative' });
        
        expect(result.analysis.syntactic.agreementPattern).toBe('neuter-singular-nominative');
      });
    });

    describe('error handling and validation', () => {
      it('should handle empty input', () => {
        const result = analyzeSarvanama('');
        
        expect(result.isValid).toBe(false);
        expect(result.isSarvanama).toBe(false);
        expect(result.errors).toContain('Input is required');
        expect(result.confidence).toBe(0);
      });

      it('should handle null input', () => {
        const result = analyzeSarvanama(null);
        
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Input is required');
      });

      it('should handle invalid Sanskrit input', () => {
        const result = analyzeSarvanama('xyz123');
        
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Invalid Sanskrit input');
      });

      it('should handle English words', () => {
        const result = analyzeSarvanama('hello');
        
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Invalid Sanskrit input');
      });
    });

    describe('script detection and normalization', () => {
      it('should detect IAST script correctly', () => {
        const result = analyzeSarvanama('bhavat');
        
        expect(result.isValid).toBe(true);
        expect(result.analysis.morphological.script).toBe('IAST');
      });

      it('should detect Devanagari script correctly', () => {
        const result = analyzeSarvanama('युष्मद्');
        
        expect(result.isValid).toBe(true);
        expect(result.analysis.morphological.script).toBe('Devanagari');
      });

      it('should normalize input correctly', () => {
        const result = analyzeSarvanama('  ka  ');
        
        expect(result.normalizedInput).toBe('ka');
        expect(result.isValid).toBe(true);
      });
    });

    describe('traditional commentary integration', () => {
      it('should include traditional Sanskrit explanation', () => {
        const result = analyzeSarvanama('विश्व');
        
        expect(result.metadata.traditionalExplanation).toContain('सर्वप्रभृतयः');
        expect(result.metadata.traditionalExplanation).toContain('सर्वनामसंज्ञकाः');
      });

      it('should include modern English explanation', () => {
        const result = analyzeSarvanama('ubha');
        
        expect(result.metadata.modernExplanation).toContain('technical term');
        expect(result.metadata.modernExplanation).toContain('sarvanāma');
      });

      it('should include commentary references', () => {
        const result = analyzeSarvanama('अदस्');
        
        expect(result.metadata.commentaryReferences).toContain('Kāśikā');
        expect(result.metadata.commentaryReferences).toContain('Patañjali Mahābhāṣya');
      });
    });

    describe('morphological structure analysis', () => {
      it('should determine demonstrative structure', () => {
        const result = analyzeSarvanama('adas');
        
        expect(result.analysis.morphological.structure).toBe('demonstrative-pronoun');
      });

      it('should determine interrogative structure', () => {
        const result = analyzeSarvanama('ka');
        
        expect(result.analysis.morphological.structure).toBe('interrogative-pronoun');
      });

      it('should determine personal structure', () => {
        const result = analyzeSarvanama('युष्मद्');
        
        expect(result.analysis.morphological.structure).toBe('personal-pronoun');
      });

      it('should determine universal structure', () => {
        const result = analyzeSarvanama('विश्व');
        
        expect(result.analysis.morphological.structure).toBe('universal-quantifier');
      });
    });

    describe('semantic reference type analysis', () => {
      it('should identify deictic reference', () => {
        const result = analyzeSarvanama('etat');
        
        expect(result.analysis.semantic.referenceType).toBe('deictic');
      });

      it('should identify question reference', () => {
        const result = analyzeSarvanama('kim');
        
        expect(result.analysis.semantic.referenceType).toBe('question');
      });

      it('should identify participant reference', () => {
        const result = analyzeSarvanama('asmad');
        
        expect(result.analysis.semantic.referenceType).toBe('participant');
      });

      it('should identify universal reference', () => {
        const result = analyzeSarvanama('sarva');
        
        expect(result.analysis.semantic.referenceType).toBe('universal');
      });
    });
  });
});
