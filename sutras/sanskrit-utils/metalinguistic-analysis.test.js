/**
 * Tests for Metalinguistic Analysis Utilities
 * 
 * Tests the utilities for analyzing when Sanskrit terms are used
 * metalinguistically (स्वरूप/sva-rūpa) versus semantically (शब्द/śabda).
 * Based on Sutra 1.1.68: स्वं रूपं शब्दस्याशब्दसंज्ञा
 */

import {
  METALINGUISTIC_CONTEXTS,
  SEMANTIC_USAGE_MARKERS,
  CONFIDENCE_LEVELS,
  isSvaRupaUsage,
  getInterpretationType,
  analyzeWordUsage,
  getWordInterpretation,
  requiresSvaRupaInterpretation,
  getMetalinguisticExamples,
  analyzeMetalinguisticFeatures
} from './metalinguistic-analysis.js';

describe('Metalinguistic Analysis Utilities', () => {
  describe('Constants', () => {
    test('METALINGUISTIC_CONTEXTS should have expected properties', () => {
      expect(METALINGUISTIC_CONTEXTS.grammaticalDiscussion).toBe('isGrammaticalDiscussion');
      expect(METALINGUISTIC_CONTEXTS.phonemeReference).toBe('isPhonemeReference');
      expect(METALINGUISTIC_CONTEXTS.quotedTerm).toBe('isQuoted');
      expect(METALINGUISTIC_CONTEXTS.inVyakaranaShastra).toBe('inVyakaranaShastra');
    });

    test('CONFIDENCE_LEVELS should have numeric values in range', () => {
      expect(CONFIDENCE_LEVELS.VERY_HIGH).toBe(1.0);
      expect(CONFIDENCE_LEVELS.HIGH).toBe(0.95);
      expect(CONFIDENCE_LEVELS.MEDIUM).toBe(0.8);
      expect(CONFIDENCE_LEVELS.LOW).toBe(0.5);
      expect(CONFIDENCE_LEVELS.VERY_LOW).toBe(0.2);
    });
  });

  describe('isSvaRupaUsage', () => {
    test('should return true for quoted terms', () => {
      expect(isSvaRupaUsage('अ', { isQuoted: true })).toBe(true);
      expect(isSvaRupaUsage('गो', { quotedTerm: true })).toBe(true);
    });

    test('should return true for grammatical discussion', () => {
      expect(isSvaRupaUsage('सुप्', { isGrammaticalDiscussion: true })).toBe(true);
      expect(isSvaRupaUsage('तिङ्', { isInGrammaticalRule: true })).toBe(true);
    });

    test('should return true for phoneme/morpheme references', () => {
      expect(isSvaRupaUsage('क', { isPhonemeReference: true })).toBe(true);
      expect(isSvaRupaUsage('कृत्', { isMorphemeReference: true })).toBe(true);
    });

    test('should return true for technical terms', () => {
      expect(isSvaRupaUsage('धातु', { isTechnicalTerm: true })).toBe(true);
      expect(isSvaRupaUsage('प्रातिपदिक', { metalinguistic: true })).toBe(true);
    });

    test('should return false for no context indicators', () => {
      expect(isSvaRupaUsage('गो', {})).toBe(false);
      expect(isSvaRupaUsage('राम', {})).toBe(false);
    });

    test('should handle invalid inputs', () => {
      expect(isSvaRupaUsage('', { isQuoted: true })).toBe(false);
      expect(isSvaRupaUsage(null, { isQuoted: true })).toBe(false);
      expect(isSvaRupaUsage(undefined, { isQuoted: true })).toBe(false);
    });
  });

  describe('getInterpretationType', () => {
    test('should return metalinguistic for sva-rūpa usage', () => {
      expect(getInterpretationType('अ', { isQuoted: true })).toBe('metalinguistic');
      expect(getInterpretationType('गो', { isGrammaticalDiscussion: true })).toBe('metalinguistic');
    });

    test('should return metalinguistic for grammatical treatise context', () => {
      expect(getInterpretationType('गो', { inVyakaranaShastra: true })).toBe('metalinguistic');
      expect(getInterpretationType('धातु', { inVyakaranaShastra: true })).toBe('metalinguistic');
    });

    test('should return semantic for normal usage', () => {
      expect(getInterpretationType('गो', {})).toBe('semantic');
      expect(getInterpretationType('राम', {})).toBe('semantic');
    });

    test('should respect semantic override in grammatical context', () => {
      const context = { 
        inVyakaranaShastra: true, 
        withMeaning: true 
      };
      expect(getInterpretationType('गो', context)).toBe('semantic');
    });

    test('should handle invalid inputs', () => {
      expect(getInterpretationType('', {})).toBe('semantic');
      expect(getInterpretationType(null, {})).toBe('semantic');
    });
  });

  describe('analyzeWordUsage', () => {
    test('should provide complete analysis for metalinguistic usage', () => {
      const result = analyzeWordUsage('अ', { isQuoted: true });
      
      expect(result.word).toBe('अ');
      expect(result.isSvaRupa).toBe(true);
      expect(result.interpretationType).toBe('metalinguistic');
      expect(result.confidence).toBe(CONFIDENCE_LEVELS.VERY_HIGH);
      expect(result.reasoning).toContain('Word used in metalinguistic context');
      expect(result.linguisticNotes).toContain('अशब्दसंज्ञा - used as mere designation');
      expect(result.sutraReference).toBe('1.1.68');
    });

    test('should provide complete analysis for semantic usage', () => {
      const result = analyzeWordUsage('गो', {});
      
      expect(result.word).toBe('गो');
      expect(result.isSvaRupa).toBe(false);
      expect(result.interpretationType).toBe('semantic');
      expect(result.confidence).toBe(CONFIDENCE_LEVELS.MEDIUM);
      expect(result.reasoning).toContain('Word used in normal semantic context');
      expect(result.linguisticNotes).toContain('शब्द - used with its regular meaning/function');
    });

    test('should handle grammatical treatise context', () => {
      const result = analyzeWordUsage('गो', { inVyakaranaShastra: true });
      
      expect(result.isSvaRupa).toBe(true);
      expect(result.interpretationType).toBe('metalinguistic');
      expect(result.confidence).toBe(CONFIDENCE_LEVELS.HIGH);
      expect(result.reasoning).toContain('Context: Grammatical treatise (व्याकरणशास्त्र)');
    });

    test('should detect script correctly', () => {
      const devResult = analyzeWordUsage('गो', {});
      const iastResult = analyzeWordUsage('go', {});
      
      expect(devResult.script).toBe('Devanagari');
      expect(iastResult.script).toBe('IAST');
    });

    test('should handle invalid inputs gracefully', () => {
      const result = analyzeWordUsage('', {});
      
      expect(result.word).toBe('');
      expect(result.confidence).toBe(CONFIDENCE_LEVELS.VERY_LOW);
      expect(result.reasoning).toContain('Invalid input: word must be a non-empty string');
    });

    test('should adjust confidence for specific contexts', () => {
      const quotedResult = analyzeWordUsage('अ', { quotedTerm: true });
      const grammarResult = analyzeWordUsage('गो', { inVyakaranaShastra: true });
      const basicResult = analyzeWordUsage('सुप्', { isGrammaticalDiscussion: true });
      
      expect(quotedResult.confidence).toBe(CONFIDENCE_LEVELS.VERY_HIGH);
      expect(grammarResult.confidence).toBe(CONFIDENCE_LEVELS.HIGH);
      expect(basicResult.confidence).toBe(CONFIDENCE_LEVELS.MEDIUM_HIGH);
    });
  });

  describe('getWordInterpretation', () => {
    test('should return correct interpretation strings', () => {
      expect(getWordInterpretation('अ', { isQuoted: true })).toBe('ashabda-samjna');
      expect(getWordInterpretation('गो', {})).toBe('shabda');
      expect(getWordInterpretation('धातु', { inVyakaranaShastra: true })).toBe('ashabda-samjna');
    });

    test('should handle edge cases', () => {
      expect(getWordInterpretation('', {})).toBe('shabda');
      expect(getWordInterpretation('invalid', { isQuoted: true })).toBe('ashabda-samjna');
    });
  });

  describe('requiresSvaRupaInterpretation', () => {
    test('should correctly identify when sva-rūpa interpretation is required', () => {
      expect(requiresSvaRupaInterpretation('अ', { isQuoted: true })).toBe(true);
      expect(requiresSvaRupaInterpretation('गो', { inVyakaranaShastra: true })).toBe(true);
      expect(requiresSvaRupaInterpretation('राम', {})).toBe(false);
    });

    test('should handle invalid inputs', () => {
      expect(requiresSvaRupaInterpretation('', {})).toBe(false);
      expect(requiresSvaRupaInterpretation(null, {})).toBe(false);
    });
  });

  describe('getMetalinguisticExamples', () => {
    test('should provide comprehensive examples', () => {
      const examples = getMetalinguisticExamples();
      
      expect(examples.metalinguistic).toBeDefined();
      expect(examples.semantic).toBeDefined();
      
      expect(examples.metalinguistic.description).toContain('अशब्दसंज्ञा');
      expect(examples.semantic.description).toContain('शब्द');
      
      expect(examples.metalinguistic.examples).toHaveLength(3);
      expect(examples.semantic.examples).toHaveLength(2);
    });

    test('should include traditional examples', () => {
      const examples = getMetalinguisticExamples();
      
      const metalinguisticTerms = examples.metalinguistic.examples.map(ex => ex.term);
      expect(metalinguisticTerms).toContain('अ');
      expect(metalinguisticTerms).toContain('गो');
      expect(metalinguisticTerms).toContain('सुप्');
      
      const semanticTerms = examples.semantic.examples.map(ex => ex.term);
      expect(semanticTerms).toContain('गो');
      expect(semanticTerms).toContain('राम');
    });

    test('should have proper usage classifications', () => {
      const examples = getMetalinguisticExamples();
      
      examples.metalinguistic.examples.forEach(example => {
        expect(example.usage).toBe('metalinguistic');
        expect(example.context).toBeDefined();
        expect(example.interpretation).toBeDefined();
      });
      
      examples.semantic.examples.forEach(example => {
        expect(example.usage).toBe('semantic');
        expect(example.context).toBeDefined();
        expect(example.interpretation).toBeDefined();
      });
    });
  });

  describe('analyzeMetalinguisticFeatures', () => {
    test('should provide comprehensive feature analysis', () => {
      const result = analyzeMetalinguisticFeatures('अ', { isQuoted: true });
      
      expect(result.isValid).toBe(true);
      expect(result.term).toBe('अ');
      expect(result.script).toBe('Devanagari');
      expect(result.isMetalinguistic).toBe(true);
      expect(result.interpretationType).toBe('metalinguistic');
      expect(result.confidence).toBe(CONFIDENCE_LEVELS.VERY_HIGH);
      expect(result.hasQuotationMarkers).toBe(true);
      expect(result.sutraReference).toBe('1.1.68');
    });

    test('should analyze context features correctly', () => {
      const grammarContext = { 
        inVyakaranaShastra: true, 
        isGrammaticalDiscussion: true 
      };
      const result = analyzeMetalinguisticFeatures('धातु', grammarContext);
      
      expect(result.hasGrammaticalContext).toBe(true);
      expect(result.contextType).toBe('grammatical-discussion');
    });

    test('should handle invalid inputs', () => {
      const result = analyzeMetalinguisticFeatures('', {});
      
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Invalid term input');
    });

    test('should include detailed reasoning', () => {
      const result = analyzeMetalinguisticFeatures('गो', { inVyakaranaShastra: true });
      
      expect(result.reasoning).toBeDefined();
      expect(result.linguisticNotes).toBeDefined();
      expect(result.reasoning.length).toBeGreaterThan(0);
      expect(result.linguisticNotes.length).toBeGreaterThan(0);
    });
  });

  describe('Integration Tests', () => {
    test('should work consistently across all functions', () => {
      const term = 'सुप्';
      const context = { isGrammaticalDiscussion: true };
      
      const svaRupa = isSvaRupaUsage(term, context);
      const interpretationType = getInterpretationType(term, context);
      const wordInterpretation = getWordInterpretation(term, context);
      const requiresInterpretation = requiresSvaRupaInterpretation(term, context);
      const analysis = analyzeWordUsage(term, context);
      const features = analyzeMetalinguisticFeatures(term, context);
      
      // All should agree on metalinguistic usage
      expect(svaRupa).toBe(true);
      expect(interpretationType).toBe('metalinguistic');
      expect(wordInterpretation).toBe('ashabda-samjna');
      expect(requiresInterpretation).toBe(true);
      expect(analysis.isSvaRupa).toBe(true);
      expect(features.isMetalinguistic).toBe(true);
    });

    test('should handle mixed script scenarios', () => {
      const devTerm = 'धातु';
      const iastTerm = 'dhātu';
      const context = { isTechnicalTerm: true };
      
      const devAnalysis = analyzeWordUsage(devTerm, context);
      const iastAnalysis = analyzeWordUsage(iastTerm, context);
      
      expect(devAnalysis.script).toBe('Devanagari');
      expect(iastAnalysis.script).toBe('IAST');
      expect(devAnalysis.isSvaRupa).toBe(iastAnalysis.isSvaRupa);
    });
  });
});
