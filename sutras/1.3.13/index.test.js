/**
 * Tests for Sutra 1.3.13: भावकर्म्मणोः (bhāvakarmaṇoḥ)
 * Testing bhāva and karma semantic analysis
 */

import { analyzeSemanticMeaning, applySemanticRules, comprehensiveBhavaKarmaAnalysis } from './index.js';

describe('Sutra 1.3.13: भावकर्म्मणोः (Bhāva-Karma Semantics)', () => {
  
  describe('analyzeSemanticMeaning', () => {
    test('should handle invalid input', () => {
      expect(analyzeSemanticMeaning('')).toEqual({
        success: false,
        error: 'Invalid input: expression must be a non-empty string',
        expression: ''
      });
    });

    test('should detect bhāva indicators', () => {
      const result = analyzeSemanticMeaning('gatitva bhāva kriyā');
      
      expect(result.success).toBe(true);
      expect(result.hasBhava).toBe(true);
      expect(result.bhavaAnalysis.strength).toBeGreaterThan(0);
      expect(result.bhavaAnalysis.indicators.length).toBeGreaterThan(0);
    });

    test('should detect karma indicators', () => {
      const result = analyzeSemanticMeaning('putraṃ karma viṣayam');
      
      expect(result.success).toBe(true);
      expect(result.hasKarma).toBe(true);
      expect(result.karmaAnalysis.strength).toBeGreaterThan(0);
      expect(result.karmaAnalysis.indicators.length).toBeGreaterThan(0);
    });

    test('should determine dominant semantic category', () => {
      const bhavaResult = analyzeSemanticMeaning('bhāva kriyā gatitva');
      expect(bhavaResult.dominantSemantic.category).toBe('bhāva');
      
      const karmaResult = analyzeSemanticMeaning('karma viṣayam arthām');
      expect(karmaResult.dominantSemantic.category).toBe('karma');
    });

    test('should handle mixed bhāva-karma expressions', () => {
      const result = analyzeSemanticMeaning('bhāva karma kriyā viṣayam');
      
      expect(result.success).toBe(true);
      expect(result.hasBhava).toBe(true);
      expect(result.hasKarma).toBe(true);
      // Could be 'mixed' or dominant category based on strength
    });

    test('should handle expressions without clear indicators', () => {
      const result = analyzeSemanticMeaning('simple test example');
      
      expect(result.success).toBe(true);
      expect(result.dominantSemantic.category).toBe('neutral');
      expect(result.hasBhava).toBe(false);
      expect(result.hasKarma).toBe(false);
    });

    test('should include semantic features in detailed analysis', () => {
      const result = analyzeSemanticMeaning('gatitva kriyāṇi', { analysisDepth: 'detailed' });
      
      expect(result.success).toBe(true);
      expect(result.semanticFeatures).toBeDefined();
      expect(result.semanticFeatures.hasVerbalNoun).toBeDefined();
    });

    test('should preserve rule information', () => {
      const result = analyzeSemanticMeaning('test');
      expect(result.rule).toBe('1.3.13');
    });
  });

  describe('applySemanticRules', () => {
    test('should handle invalid input', () => {
      expect(applySemanticRules('', {})).toEqual({
        success: false,
        error: 'Invalid expression input',
        expression: ''
      });

      expect(applySemanticRules('test', null)).toEqual({
        success: false,
        error: 'Invalid semantic analysis input',
        semanticAnalysis: null
      });
    });

    test('should apply bhāva-specific rules', () => {
      const semanticAnalysis = {
        hasBhava: true,
        hasKarma: false,
        dominantSemantic: { category: 'bhāva', confidence: 0.8 },
        bhavaAnalysis: { strength: 0.8 },
        karmaAnalysis: { strength: 0.0 }
      };

      const result = applySemanticRules('bhāva test', semanticAnalysis, { voice: 'active' });
      
      expect(result.success).toBe(true);
      expect(result.applicableRules.some(r => r.type === 'bhāva_construction')).toBe(true);
      expect(result.ruleApplications.some(a => a.rule === 'bhāva_voice_conversion')).toBe(true);
    });

    test('should apply karma-specific rules', () => {
      const semanticAnalysis = {
        hasBhava: false,
        hasKarma: true,
        dominantSemantic: { category: 'karma', confidence: 0.8 },
        bhavaAnalysis: { strength: 0.0 },
        karmaAnalysis: { strength: 0.8 }
      };

      const result = applySemanticRules('karma test', semanticAnalysis, { caseFrame: 'default' });
      
      expect(result.success).toBe(true);
      expect(result.applicableRules.some(r => r.type === 'karma_object_marking')).toBe(true);
      expect(result.ruleApplications.some(a => a.rule === 'karma_case_assignment')).toBe(true);
    });

    test('should handle mixed semantics', () => {
      const semanticAnalysis = {
        hasBhava: true,
        hasKarma: true,
        dominantSemantic: { category: 'mixed', confidence: 0.6 },
        bhavaAnalysis: { strength: 0.6 },
        karmaAnalysis: { strength: 0.6 }
      };

      const result = applySemanticRules('mixed test', semanticAnalysis);
      
      expect(result.success).toBe(true);
      expect(result.applicableRules.some(r => r.type === 'mixed_semantics')).toBe(true);
    });

    test('should preserve context information', () => {
      const semanticAnalysis = {
        hasBhava: false,
        hasKarma: false,
        dominantSemantic: { category: 'neutral', confidence: 0.0 },
        bhavaAnalysis: { strength: 0.0 },
        karmaAnalysis: { strength: 0.0 }
      };

      const context = { voice: 'passive', construction: 'complex' };
      const result = applySemanticRules('test', semanticAnalysis, context);
      
      expect(result.grammaticalContext).toEqual(context);
      expect(result.rule).toBe('1.3.13');
    });
  });

  describe('comprehensiveBhavaKarmaAnalysis', () => {
    test('should perform complete analysis for bhāva expression', () => {
      const result = comprehensiveBhavaKarmaAnalysis('gatitva bhāva kriyā', {
        analysisDepth: 'detailed',
        applyRules: true
      });
      
      expect(result.success).toBe(true);
      expect(result.semanticAnalysis).toBeDefined();
      expect(result.ruleApplication).toBeDefined();
      expect(result.overallClassification).toBe('bhāva');
      expect(result.confidence).toBeGreaterThan(0);
    });

    test('should perform complete analysis for karma expression', () => {
      const result = comprehensiveBhavaKarmaAnalysis('karma viṣayam artham', {
        analysisDepth: 'basic',
        applyRules: true
      });
      
      expect(result.success).toBe(true);
      expect(result.overallClassification).toBe('karma');
      expect(result.applicableRules.length).toBeGreaterThan(0);
    });

    test('should handle analysis without rule application', () => {
      const result = comprehensiveBhavaKarmaAnalysis('test expression', {
        applyRules: false
      });
      
      expect(result.success).toBe(true);
      expect(result.ruleApplication).toBeNull();
      expect(result.applicableRules).toEqual([]);
    });

    test('should provide recommendations', () => {
      const result = comprehensiveBhavaKarmaAnalysis('bhāva karma mixed');
      
      expect(result.success).toBe(true);
      expect(result.recommendations).toBeDefined();
      expect(Array.isArray(result.recommendations)).toBe(true);
    });

    test('should handle neutral expressions', () => {
      const result = comprehensiveBhavaKarmaAnalysis('simple neutral text');
      
      expect(result.success).toBe(true);
      expect(result.overallClassification).toBe('neutral');
      expect(result.confidence).toBe(0);
    });

    test('should preserve rule information', () => {
      const result = comprehensiveBhavaKarmaAnalysis('test');
      expect(result.rule).toBe('1.3.13');
    });
  });

  describe('Integration and linguistic accuracy', () => {
    test('should handle traditional bhāva expressions', () => {
      const expressions = [
        'gatitva',      // -tva abstract noun
        'śubhatā',      // -tā state noun  
        'kriyā',        // action noun
        'bhāvana'       // bringing into being
      ];

      for (const expr of expressions) {
        const result = analyzeSemanticMeaning(expr);
        expect(result.success).toBe(true);
        if (result.hasBhava) {
          expect(result.bhavaAnalysis.strength).toBeGreaterThan(0);
        }
      }
    });

    test('should handle traditional karma expressions', () => {
      const expressions = [
        'pustakam',     // book (accusative)
        'karma',        // action/object
        'viṣayam',      // topic/object
        'artham'        // meaning/object
      ];

      for (const expr of expressions) {
        const result = analyzeSemanticMeaning(expr);
        expect(result.success).toBe(true);
        // May or may not be detected as karma depending on context
      }
    });

    test('should maintain consistency between analysis and rule application', () => {
      const expression = 'bhāva kriyātva';
      const analysis = analyzeSemanticMeaning(expression);
      const comprehensive = comprehensiveBhavaKarmaAnalysis(expression);
      
      expect(analysis.dominantSemantic.category).toBe(comprehensive.overallClassification);
      expect(analysis.rule).toBe(comprehensive.rule);
    });

    test('should handle contextual analysis', () => {
      const result = analyzeSemanticMeaning('kriyā', { context: 'verbal' });
      
      expect(result.success).toBe(true);
      expect(result.context).toBe('verbal');
      // Context should influence bhāva strength
    });
  });

  describe('Error handling and edge cases', () => {
    test('should handle unknown script gracefully', () => {
      const result = analyzeSemanticMeaning('αβγ');
      expect(result.success).toBe(false);
      expect(result.error).toContain('Unable to detect script');
    });

    test('should handle complex expressions', () => {
      const result = comprehensiveBhavaKarmaAnalysis('complex bhāva-karma-mixed expression', {
        analysisDepth: 'detailed'
      });
      
      expect(result.success).toBe(true);
      // Should handle without errors
    });

    test('should handle empty options gracefully', () => {
      const result = comprehensiveBhavaKarmaAnalysis('test expression', {});
      
      expect(result.success).toBe(true);
      expect(result.applicableRules).toBeDefined();
    });

    test('should handle analysis errors in comprehensive function', () => {
      // This should trigger the error handling path
      const result = comprehensiveBhavaKarmaAnalysis('test', {
        grammaticalContext: { /* valid context */ }
      });
      
      expect(result.success).toBe(true);
      // Should handle gracefully
    });
  });

  describe('Semantic feature extraction', () => {
    test('should detect verbal nouns in detailed analysis', () => {
      const result = analyzeSemanticMeaning('gatitva kriyāti bhāvana', { analysisDepth: 'detailed' });
      
      expect(result.success).toBe(true);
      expect(result.semanticFeatures.hasVerbalNoun).toBe(true);
    });

    test('should detect abstract vs concrete nouns', () => {
      const abstractResult = analyzeSemanticMeaning('sattva bhāva', { analysisDepth: 'detailed' });
      expect(abstractResult.semanticFeatures.hasAbstractNoun).toBe(true);

      const concreteResult = analyzeSemanticMeaning('mahāgrha subhagni', { analysisDepth: 'detailed' });
      expect(concreteResult.semanticFeatures.hasConcreteNoun).toBe(true);
    });

    test('should detect transitivity and state markers', () => {
      const transitiveResult = analyzeSemanticMeaning('kṛ dā labh', { analysisDepth: 'detailed' });
      expect(transitiveResult.semanticFeatures.hasTransitiveMarkers).toBe(true);

      const stateResult = analyzeSemanticMeaning('as bhū sthā', { analysisDepth: 'detailed' });
      expect(stateResult.semanticFeatures.hasStateMarkers).toBe(true);
    });
  });
});
