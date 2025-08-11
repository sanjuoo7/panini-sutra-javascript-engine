import { 
  VIDHI_TYPES,
  SCOPE_PATTERNS,
  isWithinVidhiScope,
  analyzeVidhiScope,
  getVidhiScopeBoundary,
  checkSpecificationMatch,
  isSuffixSpecification,
  isPhonemeClassSpecification,
  isMorphologicalSpecification,
  isCategorySpecification,
  getVidhiScopeExamples
} from './index.js';

describe('Sutra 1.1.72: येन विधिस्तदन्तस्य', () => {
  describe('isWithinVidhiScope function', () => {
    describe('Suffix-based विधि scope', () => {
      it('should identify words within कृत् suffix scope', () => {
        expect(isWithinVidhiScope('गत', 'कृत्')).toBe(true);
        expect(isWithinVidhiScope('कृत', 'कृत्')).toBe(true);
        expect(isWithinVidhiScope('पठितव्य', 'कृत्')).toBe(true);
        expect(isWithinVidhiScope('गमनीय', 'कृत्')).toBe(true);
      });

      it('should identify words within तद्धित suffix scope', () => {
        expect(isWithinVidhiScope('देवमत्', 'तद्धित')).toBe(true);
        expect(isWithinVidhiScope('श्रीवत्', 'तद्धित')).toBe(true);
        expect(isWithinVidhiScope('पाण्डवेय', 'तद्धित')).toBe(true);
      });

      it('should identify words within स्त्री suffix scope', () => {
        expect(isWithinVidhiScope('बाला', 'स्त्री')).toBe(true);
        expect(isWithinVidhiScope('नदी', 'स्त्री')).toBe(true);
        expect(isWithinVidhiScope('मती', 'स्त्री')).toBe(true);
        expect(isWithinVidhiScope('वधू', 'स्त्री')).toBe(true);
      });

      it('should exclude words outside suffix scope', () => {
        expect(isWithinVidhiScope('राम', 'कृत्')).toBe(false);
        expect(isWithinVidhiScope('देव', 'तद्धित')).toBe(false);
        expect(isWithinVidhiScope('रामः', 'स्त्री')).toBe(false);
      });
    });

    describe('Phoneme class विधि scope', () => {
      it('should identify words within अच् (vowel) scope', () => {
        expect(isWithinVidhiScope('राम', 'अच्')).toBe(true);
        expect(isWithinVidhiScope('गुरु', 'अच्')).toBe(true);
        expect(isWithinVidhiScope('नदी', 'अच्')).toBe(true);
        expect(isWithinVidhiScope('बाला', 'अच्')).toBe(true);
      });

      it('should identify words within हल् (consonant) scope', () => {
        expect(isWithinVidhiScope('वाक्', 'हल्')).toBe(true);
        expect(isWithinVidhiScope('मरुत्', 'हल्')).toBe(true);
        expect(isWithinVidhiScope('भगवन्', 'हल्')).toBe(true);
        expect(isWithinVidhiScope('राजन्', 'हल्')).toBe(true);
      });

      it('should work with IAST phoneme classes', () => {
        expect(isWithinVidhiScope('rama', 'अच्')).toBe(true);
        expect(isWithinVidhiScope('guru', 'अच्')).toBe(true);
        expect(isWithinVidhiScope('vāk', 'हल्')).toBe(true);
        expect(isWithinVidhiScope('marut', 'हल्')).toBe(true);
      });

      it('should exclude words outside phoneme class scope', () => {
        expect(isWithinVidhiScope('वाक्', 'अच्')).toBe(false);
        expect(isWithinVidhiScope('राम', 'हल्')).toBe(false);
      });
    });

    describe('Morphological विधि scope', () => {
      it('should identify words within धातु scope', () => {
        expect(isWithinVidhiScope('√गम्', 'धातु', { isVerbalRoot: true })).toBe(true);
        expect(isWithinVidhiScope('√कृ', 'धातु', { containsRoot: true })).toBe(true);
        expect(isWithinVidhiScope('√भू', 'धातु', { isVerbalRoot: true })).toBe(true);
      });

      it('should identify words within प्रातिपदिक scope', () => {
        expect(isWithinVidhiScope('राम', 'प्रातिपदिक', { isNominalStem: true })).toBe(true);
        expect(isWithinVidhiScope('देव', 'प्रातिपदिक', { isProlog: true })).toBe(true);
      });
    });

    describe('Category-based विधि scope', () => {
      it('should identify words within संज्ञा scope', () => {
        expect(isWithinVidhiScope('राम', 'संज्ञा', { isNoun: true })).toBe(true);
        expect(isWithinVidhiScope('देव', 'संज्ञा', { grammaticalCategory: 'noun' })).toBe(true);
      });

      it('should identify words within क्रिया scope', () => {
        expect(isWithinVidhiScope('गच्छति', 'क्रिया', { isVerb: true })).toBe(true);
        expect(isWithinVidhiScope('करोति', 'क्रिया', { grammaticalCategory: 'verb' })).toBe(true);
      });

      it('should identify words within विशेषण scope', () => {
        expect(isWithinVidhiScope('महान्', 'विशेषण', { isAdjective: true })).toBe(true);
        expect(isWithinVidhiScope('सुन्दर', 'विशेषण', { grammaticalCategory: 'adjective' })).toBe(true);
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        expect(isWithinVidhiScope('', 'अच्')).toBe(false);
        expect(isWithinVidhiScope('राम', '')).toBe(false);
        expect(isWithinVidhiScope(null, 'अच्')).toBe(false);
        expect(isWithinVidhiScope('राम', undefined)).toBe(false);
        expect(isWithinVidhiScope(123, 'अच्')).toBe(false);
        expect(isWithinVidhiScope('राम', 456)).toBe(false);
      });
    });
  });

  describe('Specification type detection functions', () => {
    describe('isSuffixSpecification function', () => {
      it('should identify suffix specifications', () => {
        expect(isSuffixSpecification('कृत्')).toBe(true);
        expect(isSuffixSpecification('तद्धित')).toBe(true);
        expect(isSuffixSpecification('स्त्री')).toBe(true);
      });

      it('should not identify non-suffix specifications', () => {
        expect(isSuffixSpecification('अच्')).toBe(false);
        expect(isSuffixSpecification('हल्')).toBe(false);
        expect(isSuffixSpecification('धातु')).toBe(false);
      });
    });

    describe('isPhonemeClassSpecification function', () => {
      it('should identify phoneme class specifications', () => {
        expect(isPhonemeClassSpecification('अच्')).toBe(true);
        expect(isPhonemeClassSpecification('हल्')).toBe(true);
        expect(isPhonemeClassSpecification('यण्')).toBe(true);
      });

      it('should not identify non-phoneme specifications', () => {
        expect(isPhonemeClassSpecification('कृत्')).toBe(false);
        expect(isPhonemeClassSpecification('तद्धित')).toBe(false);
        expect(isPhonemeClassSpecification('धातु')).toBe(false);
      });
    });

    describe('isMorphologicalSpecification function', () => {
      it('should identify morphological specifications', () => {
        expect(isMorphologicalSpecification('धातु')).toBe(true);
        expect(isMorphologicalSpecification('प्रातिपदिक')).toBe(true);
        expect(isMorphologicalSpecification('तिङ्')).toBe(true);
      });

      it('should not identify non-morphological specifications', () => {
        expect(isMorphologicalSpecification('अच्')).toBe(false);
        expect(isMorphologicalSpecification('हल्')).toBe(false);
        expect(isMorphologicalSpecification('कृत्')).toBe(false);
      });
    });

    describe('isCategorySpecification function', () => {
      it('should identify category specifications', () => {
        expect(isCategorySpecification('संज्ञा')).toBe(true);
        expect(isCategorySpecification('क्रिया')).toBe(true);
        expect(isCategorySpecification('विशेषण')).toBe(true);
      });

      it('should not identify non-category specifications', () => {
        expect(isCategorySpecification('अच्')).toBe(false);
        expect(isCategorySpecification('हल्')).toBe(false);
        expect(isCategorySpecification('कृत्')).toBe(false);
      });
    });
  });

  describe('checkSpecificationMatch function', () => {
    describe('Suffix matching', () => {
      it('should match कृत् suffix patterns', () => {
        expect(checkSpecificationMatch('गत', 'कृत्')).toBe(true);
        expect(checkSpecificationMatch('कृत', 'कृत्')).toBe(true);
        expect(checkSpecificationMatch('तव्य', 'कृत्')).toBe(true);
        expect(checkSpecificationMatch('राम', 'कृत्')).toBe(false);
      });

      it('should match तद्धित suffix patterns', () => {
        expect(checkSpecificationMatch('मत्', 'तद्धित')).toBe(true);
        expect(checkSpecificationMatch('वत्', 'तद्धित')).toBe(true);
        expect(checkSpecificationMatch('इन्', 'तद्धित')).toBe(true);
        expect(checkSpecificationMatch('राम', 'तद्धित')).toBe(false);
      });

      it('should match स्त्री suffix patterns', () => {
        expect(checkSpecificationMatch('बाला', 'स्त्री')).toBe(true);
        expect(checkSpecificationMatch('नदी', 'स्त्री')).toBe(true);
        expect(checkSpecificationMatch('वधू', 'स्त्री')).toBe(true);
        expect(checkSpecificationMatch('रामः', 'स्त्री')).toBe(false);
      });
    });

    describe('Phoneme class matching', () => {
      it('should match अच् (vowel) endings', () => {
        expect(checkSpecificationMatch('राम', 'अच्')).toBe(true);
        expect(checkSpecificationMatch('गुरु', 'अच्')).toBe(true);
        expect(checkSpecificationMatch('नदी', 'अच्')).toBe(true);
        expect(checkSpecificationMatch('वाक्', 'अच्')).toBe(false);
      });

      it('should match हल् (consonant) endings', () => {
        expect(checkSpecificationMatch('वाक्', 'हल्')).toBe(true);
        expect(checkSpecificationMatch('मरुत्', 'हल्')).toBe(true);
        expect(checkSpecificationMatch('राजन्', 'हल्')).toBe(true);
        expect(checkSpecificationMatch('राम', 'हल्')).toBe(false);
      });

      it('should work with IAST phoneme matching', () => {
        expect(checkSpecificationMatch('rama', 'अच्')).toBe(true);
        expect(checkSpecificationMatch('guru', 'अच्')).toBe(true);
        expect(checkSpecificationMatch('vāk', 'हल्')).toBe(true);
        expect(checkSpecificationMatch('marut', 'हल्')).toBe(true);
      });
    });

    describe('Direct ending match', () => {
      it('should match direct string endings', () => {
        expect(checkSpecificationMatch('देवता', 'ता')).toBe(true);
        expect(checkSpecificationMatch('गुरुः', 'ः')).toBe(true);
        expect(checkSpecificationMatch('राम', 'म')).toBe(true);
        expect(checkSpecificationMatch('गुरु', 'म')).toBe(false);
      });
    });
  });

  describe('analyzeVidhiScope function', () => {
    describe('Complete scope analysis', () => {
      it('should provide complete analysis for अच् विधि', () => {
        const words = ['राम', 'गुरु', 'वाक्', 'नदी', 'मरुत्'];
        const result = analyzeVidhiScope('अच्', words);
        
        expect(result.specification).toBe('अच्');
        expect(result.vidhiType).toBe(VIDHI_TYPES.PHONETIC_RULE);
        expect(result.scopePattern).toBe(SCOPE_PATTERNS.phonemeBased.pattern);
        expect(result.wordsInScope).toContain('राम');
        expect(result.wordsInScope).toContain('गुरु');
        expect(result.wordsInScope).toContain('नदी');
        expect(result.wordsOutOfScope).toContain('वाक्');
        expect(result.wordsOutOfScope).toContain('मरुत्');
        expect(result.reasoning).toContain('विधि specification');
      });

      it('should provide complete analysis for कृत् विधि', () => {
        const words = ['गत', 'कृत', 'राम', 'तव्य', 'देव'];
        const result = analyzeVidhiScope('कृत्', words);
        
        expect(result.vidhiType).toBe(VIDHI_TYPES.SUFFIX_RULE);
        expect(result.scopePattern).toBe(SCOPE_PATTERNS.suffixBased.pattern);
        expect(result.wordsInScope).toContain('गत');
        expect(result.wordsInScope).toContain('कृत');
        expect(result.wordsOutOfScope).toContain('राम');
        expect(result.wordsOutOfScope).toContain('देव');
      });

      it('should provide complete analysis for हल् विधि', () => {
        const words = ['वाक्', 'मरुत्', 'राम', 'भगवन्', 'गुरु'];
        const result = analyzeVidhiScope('हल्', words);
        
        expect(result.vidhiType).toBe(VIDHI_TYPES.PHONETIC_RULE);
        expect(result.wordsInScope).toContain('वाक्');
        expect(result.wordsInScope).toContain('मरुत्');
        expect(result.wordsInScope).toContain('भगवन्');
        expect(result.wordsOutOfScope).toContain('राम');
        expect(result.wordsOutOfScope).toContain('गुरु');
      });
    });

    describe('Script detection', () => {
      it('should detect script correctly', () => {
        const result1 = analyzeVidhiScope('अच्', ['राम']);
        expect(result1.script).toBe('Devanagari');
        
        const result2 = analyzeVidhiScope('ac', ['rama']);
        expect(result2.script).toBe('IAST');
      });
    });

    describe('Error handling', () => {
      it('should handle invalid विधि specification', () => {
        const result = analyzeVidhiScope('', ['राम']);
        expect(result.reasoning).toContain('Invalid विधि specification: must be a non-empty string');
      });

      it('should handle null/undefined विधि specification', () => {
        const result1 = analyzeVidhiScope(null, ['राम']);
        expect(result1.reasoning).toContain('Invalid विधि specification: must be a non-empty string');
        
        const result2 = analyzeVidhiScope(undefined, ['राम']);
        expect(result2.reasoning).toContain('Invalid विधि specification: must be a non-empty string');
      });
    });
  });

  describe('getVidhiScopeBoundary function', () => {
    describe('Boundary analysis for different specifications', () => {
      it('should provide boundary for suffix specifications', () => {
        const boundary = getVidhiScopeBoundary('कृत्');
        expect(boundary.specification).toBe('कृत्');
        expect(boundary.includes).toContain('Words ending with specified suffix type');
        expect(boundary.excludes).toContain('Words not having the suffix');
      });

      it('should provide boundary for phoneme class specifications', () => {
        const boundary = getVidhiScopeBoundary('अच्');
        expect(boundary.includes).toContain('Words ending with phonemes of specified class');
        expect(boundary.excludes).toContain('Words ending with other phoneme classes');
        expect(boundary.conditions).toContain('Final phoneme determines scope');
      });

      it('should provide boundary for morphological specifications', () => {
        const boundary = getVidhiScopeBoundary('धातु');
        expect(boundary.includes).toContain('Words of specified morphological type');
        expect(boundary.excludes).toContain('Words of different morphological types');
        expect(boundary.conditions).toContain('Morphological category determines scope');
      });
    });
  });

  describe('getVidhiScopeExamples function', () => {
    it('should provide comprehensive examples', () => {
      const examples = getVidhiScopeExamples();
      
      expect(examples.principle).toBeDefined();
      expect(examples.suffixBasedRules).toBeDefined();
      expect(examples.phoneticRules).toBeDefined();
      expect(examples.scopePrinciple).toBeDefined();
      expect(examples.traditionalNote).toBeDefined();
    });

    it('should include traditional suffix rule examples', () => {
      const examples = getVidhiScopeExamples();
      const suffixExamples = examples.suffixBasedRules.examples;
      
      const specifications = suffixExamples.map(ex => ex.specification);
      expect(specifications).toContain('कृत्');
      expect(specifications).toContain('तद्धित');
      
      suffixExamples.forEach(ex => {
        expect(ex.vidhi).toBeDefined();
        expect(ex.scope).toBeDefined();
        expect(ex.examples).toBeDefined();
        expect(Array.isArray(ex.examples)).toBe(true);
      });
    });

    it('should include traditional phonetic rule examples', () => {
      const examples = getVidhiScopeExamples();
      const phoneticExamples = examples.phoneticRules.examples;
      
      const specifications = phoneticExamples.map(ex => ex.specification);
      expect(specifications).toContain('अच्');
      expect(specifications).toContain('हल्');
      
      phoneticExamples.forEach(ex => {
        expect(ex.vidhi).toBeDefined();
        expect(ex.scope).toBeDefined();
        expect(ex.examples).toBeDefined();
        expect(Array.isArray(ex.examples)).toBe(true);
      });
    });

    it('should include scope principle examples', () => {
      const examples = getVidhiScopeExamples();
      const scopeCases = examples.scopePrinciple.cases;
      
      scopeCases.forEach(c => {
        expect(c.specification).toBeDefined();
        expect(c.meaning).toBeDefined();
        expect(c.scope).toBeDefined();
        expect(c.principle).toBeDefined();
      });
    });
  });

  describe('Integration tests', () => {
    it('should work consistently across all functions', () => {
      const testCases = [
        { word: 'राम', specification: 'अच्', expected: true },
        { word: 'वाक्', specification: 'हल्', expected: true },
        { word: 'गत', specification: 'कृत्', expected: true },
        { word: 'राम', specification: 'हल्', expected: false },
        { word: 'वाक्', specification: 'अच्', expected: false }
      ];

      testCases.forEach(testCase => {
        const { word, specification, expected } = testCase;
        
        const isInScope = isWithinVidhiScope(word, specification);
        const matches = checkSpecificationMatch(word, specification);
        const analysis = analyzeVidhiScope(specification, [word]);
        
        expect(isInScope).toBe(expected);
        expect(matches).toBe(expected);
        
        if (expected) {
          expect(analysis.wordsInScope).toContain(word);
        } else {
          expect(analysis.wordsOutOfScope).toContain(word);
        }
      });
    });

    it('should handle mixed script scenarios', () => {
      const devanagariWords = ['राम', 'वाक्', 'गुरु'];
      const iastWords = ['rama', 'vāk', 'guru'];
      
      const devResult = analyzeVidhiScope('अच्', devanagariWords);
      const iastResult = analyzeVidhiScope('अच्', iastWords);
      
      expect(devResult.script).toBe('Devanagari');
      expect(iastResult.script).toBe('Devanagari'); // विधि is always in Devanagari
      
      // Both should identify vowel-ending words correctly
      expect(devResult.wordsInScope).toContain('राम');
      expect(devResult.wordsInScope).toContain('गुरु');
      expect(iastResult.wordsInScope).toContain('rama');
      expect(iastResult.wordsInScope).toContain('guru');
    });

    it('should maintain consistency in विधि type detection', () => {
      const specifications = ['अच्', 'कृत्', 'धातु', 'संज्ञा'];
      const expectedTypes = [
        VIDHI_TYPES.PHONETIC_RULE,
        VIDHI_TYPES.SUFFIX_RULE,
        VIDHI_TYPES.MORPHOLOGICAL_RULE,
        VIDHI_TYPES.CATEGORY_RULE
      ];

      specifications.forEach((spec, i) => {
        const analysis = analyzeVidhiScope(spec, ['test']);
        expect(analysis.vidhiType).toBe(expectedTypes[i]);
      });
    });
  });
});
