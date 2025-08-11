/**
 * Tests for Rule Scope Analysis Utilities
 * @fileoverview Comprehensive test suite for Sanskrit rule scope analysis functions
 */

import {
  VIDHI_TYPES,
  SCOPE_PATTERNS,
  TRADITIONAL_VIDHI_EXAMPLES,
  isSuffixSpecification,
  isPhonemeClassSpecification,
  isMorphologicalSpecification,
  isCategorySpecification,
  checkSuffixMatch,
  checkPhonemeClassMatch,
  checkMorphologicalMatch,
  checkCategoryMatch,
  checkSpecificationMatch,
  isWithinVidhiScope,
  analyzeVidhiScope,
  getTraditionalExamples,
  getVidhiScopeBoundary,
  getVidhiScopeExamples
} from './rule-scope-analysis.js';

describe('Rule Scope Analysis Utilities', () => {
  describe('Constants and Structure', () => {
    it('should have correct VIDHI_TYPES structure', () => {
      expect(VIDHI_TYPES).toHaveProperty('SUFFIX_RULE');
      expect(VIDHI_TYPES).toHaveProperty('PHONETIC_RULE');
      expect(VIDHI_TYPES).toHaveProperty('MORPHOLOGICAL_RULE');
      expect(VIDHI_TYPES).toHaveProperty('CATEGORY_RULE');
      expect(VIDHI_TYPES).toHaveProperty('ACCENT_RULE');
      expect(VIDHI_TYPES).toHaveProperty('SANDHI_RULE');
    });

    it('should have correct SCOPE_PATTERNS structure', () => {
      expect(SCOPE_PATTERNS).toHaveProperty('suffixBased');
      expect(SCOPE_PATTERNS).toHaveProperty('phonemeBased');
      expect(SCOPE_PATTERNS).toHaveProperty('morphemeBased');
      expect(SCOPE_PATTERNS).toHaveProperty('categoryBased');
      
      expect(SCOPE_PATTERNS.suffixBased).toHaveProperty('pattern');
      expect(SCOPE_PATTERNS.suffixBased).toHaveProperty('examples');
      expect(SCOPE_PATTERNS.suffixBased).toHaveProperty('description');
    });

    it('should have traditional examples structure', () => {
      expect(TRADITIONAL_VIDHI_EXAMPLES).toHaveProperty('suffixRules');
      expect(TRADITIONAL_VIDHI_EXAMPLES).toHaveProperty('phoneticRules');
      expect(Array.isArray(TRADITIONAL_VIDHI_EXAMPLES.suffixRules)).toBe(true);
      expect(Array.isArray(TRADITIONAL_VIDHI_EXAMPLES.phoneticRules)).toBe(true);
    });
  });

  describe('Specification Type Detection', () => {
    describe('isSuffixSpecification', () => {
      it('should identify suffix specifications correctly', () => {
        expect(isSuffixSpecification('कृत्')).toBe(true);
        expect(isSuffixSpecification('तद्धित')).toBe(true);
        expect(isSuffixSpecification('स्त्री')).toBe(true);
        expect(isSuffixSpecification('तिङ्')).toBe(true);
        expect(isSuffixSpecification('सुप्')).toBe(true);
      });

      it('should reject non-suffix specifications', () => {
        expect(isSuffixSpecification('अच्')).toBe(false);
        expect(isSuffixSpecification('हल्')).toBe(false);
        expect(isSuffixSpecification('धातु')).toBe(false);
        expect(isSuffixSpecification('')).toBe(false);
        expect(isSuffixSpecification(null)).toBe(false);
      });
    });

    describe('isPhonemeClassSpecification', () => {
      it('should identify phoneme class specifications correctly', () => {
        expect(isPhonemeClassSpecification('अच्')).toBe(true);
        expect(isPhonemeClassSpecification('हल्')).toBe(true);
        expect(isPhonemeClassSpecification('अम्')).toBe(true);
        expect(isPhonemeClassSpecification('अङ्')).toBe(true);
        expect(isPhonemeClassSpecification('इक्')).toBe(true);
        expect(isPhonemeClassSpecification('यण्')).toBe(true);
      });

      it('should reject non-phoneme specifications', () => {
        expect(isPhonemeClassSpecification('कृत्')).toBe(false);
        expect(isPhonemeClassSpecification('धातु')).toBe(false);
        expect(isPhonemeClassSpecification('संज्ञा')).toBe(false);
      });
    });

    describe('isMorphologicalSpecification', () => {
      it('should identify morphological specifications correctly', () => {
        expect(isMorphologicalSpecification('धातु')).toBe(true);
        expect(isMorphologicalSpecification('प्रातिपदिक')).toBe(true);
        expect(isMorphologicalSpecification('उपसर्ग')).toBe(true);
        expect(isMorphologicalSpecification('निपात')).toBe(true);
      });

      it('should reject non-morphological specifications', () => {
        expect(isMorphologicalSpecification('अच्')).toBe(false);
        expect(isMorphologicalSpecification('कृत्')).toBe(false);
        expect(isMorphologicalSpecification('संज्ञा')).toBe(false);
      });
    });

    describe('isCategorySpecification', () => {
      it('should identify category specifications correctly', () => {
        expect(isCategorySpecification('संज्ञा')).toBe(true);
        expect(isCategorySpecification('क्रिया')).toBe(true);
        expect(isCategorySpecification('विशेषण')).toBe(true);
        expect(isCategorySpecification('सर्वनाम')).toBe(true);
        expect(isCategorySpecification('अव्यय')).toBe(true);
      });

      it('should reject non-category specifications', () => {
        expect(isCategorySpecification('अच्')).toBe(false);
        expect(isCategorySpecification('कृत्')).toBe(false);
        expect(isCategorySpecification('धातु')).toBe(false);
      });
    });
  });

  describe('Specification Matching', () => {
    describe('checkSuffixMatch', () => {
      it('should match कृत् suffixes correctly', () => {
        expect(checkSuffixMatch('गत', 'कृत्')).toBe(true);
        expect(checkSuffixMatch('कृत', 'कृत्')).toBe(true);
        expect(checkSuffixMatch('तव्य', 'कृत्')).toBe(true);
        expect(checkSuffixMatch('अनीय', 'कृत्')).toBe(true);
      });

      it('should match तद्धित suffixes correctly', () => {
        expect(checkSuffixMatch('मतुप्', 'तद्धित')).toBe(true);
        expect(checkSuffixMatch('वतुप्', 'तद्धित')).toBe(true);
        expect(checkSuffixMatch('इक', 'तद्धित')).toBe(true);
      });

      it('should match feminine markers correctly', () => {
        expect(checkSuffixMatch('रामा', 'स्त्री')).toBe(true);
        expect(checkSuffixMatch('नदी', 'स्त्री')).toBe(true);
        expect(checkSuffixMatch('गुरू', 'स्त्री')).toBe(true);
      });

      it('should reject non-matching suffixes', () => {
        expect(checkSuffixMatch('राम', 'कृत्')).toBe(false);
        expect(checkSuffixMatch('गुरु', 'तद्धित')).toBe(false);
        expect(checkSuffixMatch('राम', 'स्त्री')).toBe(false);
      });
    });

    describe('checkPhonemeClassMatch', () => {
      it('should match vowel endings (अच्) correctly', () => {
        expect(checkPhonemeClassMatch('राम', 'अच्')).toBe(true); // inherent अ
        expect(checkPhonemeClassMatch('रामा', 'अच्')).toBe(true);
        expect(checkPhonemeClassMatch('गुरु', 'अच्')).toBe(true);
        expect(checkPhonemeClassMatch('नदी', 'अच्')).toBe(true);
        expect(checkPhonemeClassMatch('गुरो', 'अच्')).toBe(true);
      });

      it('should match consonant endings (हल्) correctly', () => {
        expect(checkPhonemeClassMatch('वाक्', 'हल्')).toBe(true);
        expect(checkPhonemeClassMatch('मरुत्', 'हल्')).toBe(true);
        expect(checkPhonemeClassMatch('राजन्', 'हल्')).toBe(true);
      });

      it('should handle IAST script correctly', () => {
        expect(checkPhonemeClassMatch('rāma', 'अच्')).toBe(true);
        expect(checkPhonemeClassMatch('guru', 'अच्')).toBe(true);
        expect(checkPhonemeClassMatch('nadī', 'अच्')).toBe(true);
        expect(checkPhonemeClassMatch('vāk', 'हल्')).toBe(true);
      });

      it('should reject non-matching phoneme classes', () => {
        expect(checkPhonemeClassMatch('वाक्', 'अच्')).toBe(false);
        expect(checkPhonemeClassMatch('राम', 'हल्')).toBe(false);
      });
    });

    describe('checkMorphologicalMatch', () => {
      it('should match verbal roots (धातु)', () => {
        const context = { isVerbalRoot: true };
        expect(checkMorphologicalMatch('कृ', 'धातु', context)).toBe(true);
        expect(checkMorphologicalMatch('√कृ', 'धातु')).toBe(true);
      });

      it('should match nominal stems (प्रातिपदिक)', () => {
        const context = { isNominalStem: true };
        expect(checkMorphologicalMatch('राम', 'प्रातिपदिक', context)).toBe(true);
      });

      it('should reject non-matching morphological types', () => {
        expect(checkMorphologicalMatch('राम', 'धातु')).toBe(false);
        expect(checkMorphologicalMatch('कृ', 'प्रातिपदिक')).toBe(false);
      });
    });

    describe('checkCategoryMatch', () => {
      it('should match grammatical categories correctly', () => {
        expect(checkCategoryMatch('राम', 'संज्ञा', { isNoun: true })).toBe(true);
        expect(checkCategoryMatch('कृ', 'क्रिया', { isVerb: true })).toBe(true);
        expect(checkCategoryMatch('उत्तम', 'विशेषण', { isAdjective: true })).toBe(true);
      });

      it('should reject non-matching categories', () => {
        expect(checkCategoryMatch('राम', 'क्रिया')).toBe(false);
        expect(checkCategoryMatch('कृ', 'संज्ञा')).toBe(false);
      });
    });
  });

  describe('Comprehensive Specification Matching', () => {
    describe('checkSpecificationMatch', () => {
      it('should route to appropriate checkers based on specification type', () => {
        // Suffix-based
        expect(checkSpecificationMatch('गत', 'कृत्')).toBe(true);
        
        // Phoneme class-based
        expect(checkSpecificationMatch('राम', 'अच्')).toBe(true);
        expect(checkSpecificationMatch('वाक्', 'हल्')).toBe(true);
        
        // Direct ending match
        expect(checkSpecificationMatch('रामायण', 'यण')).toBe(true);
      });

      it('should handle invalid inputs gracefully', () => {
        expect(checkSpecificationMatch('', 'अच्')).toBe(false);
        expect(checkSpecificationMatch('राम', '')).toBe(false);
        expect(checkSpecificationMatch(null, 'अच्')).toBe(false);
      });
    });

    describe('isWithinVidhiScope', () => {
      it('should determine scope membership correctly', () => {
        expect(isWithinVidhiScope('राम', 'अच्')).toBe(true);
        expect(isWithinVidhiScope('वाक्', 'हल्')).toBe(true);
        expect(isWithinVidhiScope('गत', 'कृत्')).toBe(true);
      });

      it('should respect context settings', () => {
        const context = { allowTechnicalTerms: true };
        // Test with a valid Sanskrit word
        expect(isWithinVidhiScope('राम', 'अच्', context)).toBe(true);
        expect(isWithinVidhiScope('वाक्', 'हल्', context)).toBe(true);
      });

      it('should handle invalid inputs', () => {
        expect(isWithinVidhiScope('', 'अच्')).toBe(false);
        expect(isWithinVidhiScope('राम', '')).toBe(false);
        expect(isWithinVidhiScope(null, 'अच्')).toBe(false);
      });
    });
  });

  describe('Comprehensive Analysis Functions', () => {
    describe('analyzeVidhiScope', () => {
      it('should provide complete scope analysis', () => {
        const words = ['राम', 'वाक्', 'गुरु', 'मरुत्'];
        const result = analyzeVidhiScope('अच्', words);

        expect(result).toHaveProperty('specification', 'अच्');
        expect(result).toHaveProperty('vidhiType');
        expect(result).toHaveProperty('scopePattern');
        expect(result).toHaveProperty('wordsInScope');
        expect(result).toHaveProperty('wordsOutOfScope');
        expect(result).toHaveProperty('reasoning');
        expect(result).toHaveProperty('sutraReference', '1.1.72');

        expect(result.wordsInScope).toContain('राम');
        expect(result.wordsInScope).toContain('गुरु');
        expect(result.wordsOutOfScope).toContain('वाक्');
        expect(result.wordsOutOfScope).toContain('मरुत्');
      });

      it('should handle different specification types', () => {
        // Phonetic rule
        const phoneticResult = analyzeVidhiScope('अच्', []);
        expect(phoneticResult.vidhiType).toBe('phonetic-rule');

        // Suffix rule
        const suffixResult = analyzeVidhiScope('कृत्', []);
        expect(suffixResult.vidhiType).toBe('suffix-rule');
      });

      it('should handle invalid specifications gracefully', () => {
        const result = analyzeVidhiScope('', []);
        expect(result.reasoning).toContain('Invalid विधि specification: must be a non-empty string');
      });
    });

    describe('getTraditionalExamples', () => {
      it('should return examples for known specifications', () => {
        const examples = getTraditionalExamples('अच्');
        expect(Array.isArray(examples)).toBe(true);
        expect(examples.length).toBeGreaterThan(0);
      });

      it('should return empty array for unknown specifications', () => {
        const examples = getTraditionalExamples('unknown');
        expect(Array.isArray(examples)).toBe(true);
        expect(examples.length).toBe(0);
      });
    });

    describe('getVidhiScopeBoundary', () => {
      it('should define scope boundaries for different types', () => {
        const boundary = getVidhiScopeBoundary('अच्');
        expect(boundary).toHaveProperty('specification', 'अच्');
        expect(boundary).toHaveProperty('includes');
        expect(boundary).toHaveProperty('excludes');
        expect(boundary).toHaveProperty('conditions');
        expect(Array.isArray(boundary.includes)).toBe(true);
      });
    });

    describe('getVidhiScopeExamples', () => {
      it('should provide comprehensive examples', () => {
        const examples = getVidhiScopeExamples();
        expect(examples).toHaveProperty('principle');
        expect(examples).toHaveProperty('suffixBasedRules');
        expect(examples).toHaveProperty('phoneticRules');
        expect(examples).toHaveProperty('scopePrinciple');
        expect(examples).toHaveProperty('traditionalNote');
      });
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle null and undefined inputs gracefully', () => {
      expect(isSuffixSpecification(null)).toBe(false);
      expect(isPhonemeClassSpecification(undefined)).toBe(false);
      expect(checkSpecificationMatch(null, 'अच्')).toBe(false);
      expect(isWithinVidhiScope(undefined, 'अच्')).toBe(false);
    });

    it('should handle empty strings appropriately', () => {
      expect(isSuffixSpecification('')).toBe(false);
      expect(checkSpecificationMatch('', 'अच्')).toBe(false);
      expect(isWithinVidhiScope('', 'अच्')).toBe(false);
    });

    it('should handle non-string inputs', () => {
      expect(isSuffixSpecification(123)).toBe(false);
      expect(checkSpecificationMatch(123, 'अच्')).toBe(false);
      expect(isWithinVidhiScope(123, 'अच्')).toBe(false);
    });
  });

  describe('Integration with Real Sanskrit Examples', () => {
    it('should correctly analyze traditional Sanskrit words', () => {
      const vowelEnding = ['राम', 'गुरु', 'नदी', 'बाला'];
      const consonantEnding = ['वाक्', 'मरुत्', 'भगवन्', 'राजन्'];
      
      vowelEnding.forEach(word => {
        expect(isWithinVidhiScope(word, 'अच्')).toBe(true);
        expect(isWithinVidhiScope(word, 'हल्')).toBe(false);
      });
      
      consonantEnding.forEach(word => {
        expect(isWithinVidhiScope(word, 'हल्')).toBe(true);
        expect(isWithinVidhiScope(word, 'अच्')).toBe(false);
      });
    });

    it('should handle complex Sanskrit words correctly', () => {
      expect(isWithinVidhiScope('रामायण', 'अच्')).toBe(true);
      expect(isWithinVidhiScope('महाभारत', 'अच्')).toBe(true);
      expect(isWithinVidhiScope('भगवद्गीता', 'अच्')).toBe(true);
    });
  });
});
