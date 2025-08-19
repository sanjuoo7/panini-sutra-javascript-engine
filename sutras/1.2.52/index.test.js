import { 
  sutra1252, 
  applySutra1_2_52, 
  analyzeAdjectiveAgreement,
  validateAdjectiveClassification 
} from './index.js';

import { applySutra1_2_51 } from '../1.2.51/index.js';

describe('Sutra 1.2.52: विशेषणानां चाजातेः', () => {
  
  describe('Core Functionality: Adjective Feature Inheritance', () => {
    test('should inherit gender and number features for valid adjectives', () => {
      const retentionResult = {
        applied: true,
        sutra: '1.2.51',
        retainedFeatures: {
          gender: 'feminine',
          number: 'singular',
          person: 'third'
        }
      };

      const result = sutra1252('सुन्दर', retentionResult, {
        pos: 'adj',
        features: {}
      });

      expect(result.applies).toBe(true);
      expect(result.qualifierAgreement.gender).toBe('feminine');
      expect(result.qualifierAgreement.number).toBe('singular');
      expect(result.qualifierAgreement._ajati_application).toBe(true);
    });

    test('should preserve explicit adjective features while inheriting missing ones', () => {
      const retentionResult = {
        applied: true,
        sutra: '1.2.51',
        retainedFeatures: {
          gender: 'masculine',
          number: 'plural',
          case: 'nominative'
        }
      };

      const result = sutra1252('महत्', retentionResult, {
        pos: 'adjective',
        features: {
          number: 'singular' // Explicit feature should be preserved
        }
      });

      expect(result.applies).toBe(true);
      expect(result.qualifierAgreement.gender).toBe('masculine'); // Inherited
      expect(result.qualifierAgreement.number).toBe('singular'); // Preserved explicit
      expect(result.qualifierAgreement.case).toBe('nominative'); // Inherited
    });

    test('should handle complex inheritance with multiple feature gaps', () => {
      const retentionResult = {
        applied: true,
        retainedFeatures: {
          gender: 'neuter',
          number: 'dual',
          person: 'third',
          case: 'accusative'
        }
      };

      const result = sutra1252('श्वेत', retentionResult, {
        isAdjective: true,
        features: {
          case: 'nominative' // Only case specified
        }
      });

      expect(result.applies).toBe(true);
      expect(result.qualifierAgreement.gender).toBe('neuter');
      expect(result.qualifierAgreement.number).toBe('dual');
      expect(result.qualifierAgreement.person).toBe('third');
      expect(result.qualifierAgreement.case).toBe('nominative'); // Explicit preserved
    });
  });

  describe('Adjective Classification', () => {
    test('should recognize explicit POS declarations', () => {
      const retentionResult = { applied: true, retainedFeatures: { gender: 'masculine' } };
      
      const testCases = [
        { pos: 'adj', expected: true },
        { pos: 'adjective', expected: true },
        { pos: 'विशेषण', expected: true },
        { pos: 'qualifier', expected: true },
        { pos: 'attributive', expected: true }
      ];

      testCases.forEach(({ pos, expected }) => {
        const result = sutra1252('गुरु', retentionResult, { pos: pos });
        expect(result.applies).toBe(expected);
        if (expected) {
          expect(result.analysis.adjectiveAnalysis.adjectiveCategory).toBe('explicit_pos_declaration');
        }
      });
    });

    test('should recognize isAdjective flag', () => {
      const retentionResult = { applied: true, retainedFeatures: { gender: 'feminine' } };
      
      const result = sutra1252('रक्त', retentionResult, {
        isAdjective: true,
        features: {}
      });

      expect(result.applies).toBe(true);
      expect(result.analysis.adjectiveAnalysis.adjectiveCategory).toBe('explicit_adjective_flag');
    });

    test('should use semantic category classification', () => {
      const retentionResult = { applied: true, retainedFeatures: { gender: 'masculine' } };
      
      const result = sutra1252('नील', retentionResult, {
        semanticCategory: 'adjective',
        features: {}
      });

      expect(result.applies).toBe(true);
      expect(result.analysis.adjectiveAnalysis.adjectiveCategory).toBe('semantic_category');
    });

    test('should reject non-adjectives', () => {
      const retentionResult = { applied: true, retainedFeatures: { gender: 'masculine' } };
      
      const result = sutra1252('राम', retentionResult, {
        pos: 'noun',
        features: {}
      });

      expect(result.applies).toBe(false);
      expect(result.analysis.agreementAnalysis.agreementMechanism).toBe('not_an_adjective');
    });
  });

  describe('Retention Result Validation', () => {
    test('should validate successful prior retention applications', () => {
      const validRetentionResults = [
        {
          applied: true,
          sutra: '1.2.51',
          retainedFeatures: { gender: 'feminine' }
        },
        {
          applies: true,
          sutraApplied: '1.2.51',
          retainedFeatures: { number: 'plural' }
        }
      ];

      validRetentionResults.forEach((retentionResult, index) => {
        const result = sutra1252('छोट', retentionResult, { pos: 'adj' });
        expect(result.applies).toBe(true);
        expect(result.analysis.retentionAnalysis.hasValidRetention).toBe(true);
      });
    });

    test('should reject invalid retention results', () => {
      const invalidRetentionResults = [
        null,
        undefined,
        {},
        { applied: false },
        { applies: false },
        "not an object"
      ];

      invalidRetentionResults.forEach((retentionResult) => {
        const result = sutra1252('लम्ब', retentionResult, { pos: 'adj' });
        expect(result.applies).toBe(false);
      });
    });

    test('should identify retention source sutras', () => {
      const retentionFrom1251 = {
        applied: true,
        sutra: '1.2.51',
        retainedFeatures: { gender: 'masculine' }
      };

      const result = sutra1252('उच्च', retentionFrom1251, { pos: 'adj' });
      expect(result.applies).toBe(true);
      expect(result.analysis.retentionAnalysis.priorSutraApplication).toBe('1.2.51');
      expect(result.analysis.retentionAnalysis.retentionSource).toBe('Sutra 1.2.51');
    });
  });

  describe('Feature Inheritance Logic', () => {
    test('should identify feature gaps correctly', () => {
      const retentionResult = {
        applied: true,
        retainedFeatures: {
          gender: 'feminine',
          number: 'singular',
          case: 'instrumental'
        }
      };

      const result = sutra1252('मधुर', retentionResult, {
        pos: 'adj',
        features: {
          gender: 'feminine' // Already specified
        }
      });

      expect(result.applies).toBe(true);
      expect(result.analysis.agreementAnalysis.featureGaps).toContain('number');
      expect(result.analysis.agreementAnalysis.featureGaps).toContain('case');
      expect(result.analysis.agreementAnalysis.featureGaps).not.toContain('gender');
    });

    test('should handle cases where no inheritance is required', () => {
      const retentionResult = {
        applied: true,
        retainedFeatures: {
          gender: 'masculine',
          number: 'singular'
        }
      };

      const result = sutra1252('स्थिर', retentionResult, {
        pos: 'adj',
        features: {
          gender: 'masculine',
          number: 'singular'
        }
      });

      expect(result.applies).toBe(true);
      expect(result.analysis.agreementAnalysis.inheritanceRequired).toBe(false);
      expect(result.analysis.agreementAnalysis.agreementMechanism).toBe('no_inheritance_required');
    });

    test('should mark inherited features appropriately', () => {
      const retentionResult = {
        applied: true,
        retainedFeatures: {
          gender: 'neuter',
          number: 'plural',
          person: 'third'
        }
      };

      const result = sutra1252('पूर्ण', retentionResult, {
        pos: 'adj',
        features: {}
      });

      expect(result.applies).toBe(true);
      expect(result.qualifierAgreement._inherited_features).toEqual({
        gender: 'neuter',
        number: 'plural',
        person: 'third'
      });
      expect(result.qualifierAgreement._ajati_application).toBe(true);
    });
  });

  describe('Script Support and Normalization', () => {
    test('should handle Devanagari adjectives correctly', () => {
      const retentionResult = {
        applied: true,
        retainedFeatures: {
          gender: 'स्त्रीलिङ्ग',
          number: 'एकवचन'
        }
      };

      const result = sutra1252('सुन्दर', retentionResult, {
        pos: 'विशेषण',
        features: {}
      });

      expect(result.applies).toBe(true);
      expect(result.analysis.inputAnalysis.script).toBe('devanagari');
      expect(result.qualifierAgreement.gender).toBe('स्त्रीलिङ्ग');
      expect(result.qualifierAgreement.number).toBe('एकवचन');
    });

    test('should handle IAST adjectives correctly', () => {
      const retentionResult = {
        applied: true,
        retainedFeatures: {
          gender: 'feminine',
          number: 'dual'
        }
      };

      const result = sutra1252('sundara', retentionResult, {
        pos: 'adj',
        features: {}
      });

      expect(result.applies).toBe(true);
      expect(result.analysis.inputAnalysis.script).toBe('iast');
      expect(result.qualifierAgreement.gender).toBe('feminine');
    });
  });

  describe('Confidence Assessment', () => {
    test('should calculate high confidence for clear contexts', () => {
      const retentionResult = {
        applied: true,
        sutra: '1.2.51',
        retainedFeatures: {
          gender: 'masculine',
          number: 'singular'
        }
      };

      const result = sutra1252('महान्', retentionResult, {
        pos: 'adj',
        features: {}
      });

      expect(result.confidence.overall).toBeGreaterThan(0.8);
      expect(result.confidence.adjectiveDetection).toBeGreaterThan(0.9);
      expect(result.confidence.retentionValidation).toBeGreaterThan(0.9);
      expect(result.confidence.traditional).toBeGreaterThan(0.85);
    });

    test('should calculate lower confidence for uncertain contexts', () => {
      const retentionResult = {
        applied: true,
        retainedFeatures: { gender: 'feminine' }
      };

      const result = sutra1252('अज्ञात', retentionResult, {
        semanticCategory: 'qualifier', // Less certain classification
        features: {}
      });

      expect(result.confidence.overall).toBeLessThan(0.9);
      expect(result.confidence.adjectiveDetection).toBeLessThan(0.9);
    });
  });

  describe('Error Handling and Edge Cases', () => {
    test('should handle null adjective gracefully', () => {
      const retentionResult = { applied: true, retainedFeatures: { gender: 'masculine' } };
      
      const result = sutra1252(null, retentionResult, { pos: 'adj' });
      
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_adjective_type');
    });

    test('should handle undefined adjective gracefully', () => {
      const retentionResult = { applied: true, retainedFeatures: { gender: 'masculine' } };
      
      const result = sutra1252(undefined, retentionResult, { pos: 'adj' });
      
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_adjective_type');
    });

    test('should handle empty string adjective', () => {
      const retentionResult = { applied: true, retainedFeatures: { gender: 'masculine' } };
      
      const result = sutra1252('', retentionResult, { pos: 'adj' });
      
      expect(result.applies).toBe(false);
      expect(result.error).toBe('empty_adjective');
    });

    test('should handle missing retention result', () => {
      const result = sutra1252('सुन्दर', null, { pos: 'adj' });
      
      expect(result.applies).toBe(false);
      expect(result.error).toBe('missing_retention_result');
    });

    test('should handle non-object retention result', () => {
      const result = sutra1252('सुन्दर', 'invalid', { pos: 'adj' });
      
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_retention_result_type');
    });
  });

  describe('Integration with Sutra 1.2.51', () => {
    test('should work seamlessly with 1.2.51 output', () => {
      // First apply 1.2.51 to get retention result
      const retentionResult = applySutra1_2_51('गृह', {
        gender: 'masculine',
        number: 'singular',
        person: 'third'
      }, {
        taddhitaElisionType: 'lup'
      });

      expect(retentionResult.applied).toBe(true);

      // Then apply 1.2.52 using that result
      const adjectiveResult = sutra1252('सुन्दर', retentionResult, {
        pos: 'adj',
        features: {}
      });

      expect(adjectiveResult.applies).toBe(true);
      expect(adjectiveResult.qualifierAgreement.gender).toBe('masculine');
      expect(adjectiveResult.qualifierAgreement.number).toBe('singular');
      expect(adjectiveResult.qualifierAgreement.person).toBe('third');
    });

    test('should handle chain of adjectives', () => {
      const baseRetention = {
        applied: true,
        sutra: '1.2.51',
        retainedFeatures: {
          gender: 'feminine',
          number: 'plural',
          case: 'accusative'
        }
      };

      // First adjective
      const adj1Result = sutra1252('महत्', baseRetention, {
        pos: 'adj',
        features: {}
      });

      expect(adj1Result.applies).toBe(true);

      // Second adjective using same retention
      const adj2Result = sutra1252('श्वेत', baseRetention, {
        pos: 'adj',
        features: { number: 'plural' } // Partial overlap
      });

      expect(adj2Result.applies).toBe(true);
      expect(adj2Result.qualifierAgreement.gender).toBe('feminine');
      expect(adj2Result.qualifierAgreement.case).toBe('accusative');
    });
  });

  describe('Analysis Helper Functions', () => {
    test('analyzeAdjectiveAgreement should provide detailed analysis', () => {
      const retentionResult = {
        applied: true,
        retainedFeatures: {
          gender: 'masculine',
          number: 'singular'
        }
      };

      const result = analyzeAdjectiveAgreement('तीव्र', retentionResult, {
        pos: 'adj',
        features: {}
      });

      expect(result.agreement_required).toBe(true);
      expect(result.inherited_features.gender).toBe('masculine');
      expect(result.inherited_features.number).toBe('singular');
      expect(result.ajati_behavior).toBe(true);
      expect(result.analysis).toBeTruthy();
      expect(result.confidence).toBeTruthy();
    });

    test('validateAdjectiveClassification should work standalone', () => {
      const result1 = validateAdjectiveClassification('सुन्दर', { pos: 'adj' });
      expect(result1.is_adjective).toBe(true);
      expect(result1.classification_method).toBe('explicit_pos_declaration');

      const result2 = validateAdjectiveClassification('राम', { pos: 'noun' });
      expect(result2.is_adjective).toBe(false);
    });
  });

  describe('Legacy Compatibility', () => {
    test('applySutra1_2_52 legacy function should work', () => {
      const retentionResult = {
        applied: true,
        retainedFeatures: {
          gender: 'feminine',
          number: 'singular'
        }
      };

      const result = applySutra1_2_52('सुन्दर', retentionResult, {
        pos: 'adj',
        features: {}
      });

      expect(result.applied).toBe(true);
      expect(result.qualifierAgreement.gender).toBe('feminine');
    });

    test('should maintain backward compatibility with old test structure', () => {
      const base = applySutra1_2_51('base', { 
        gender: 'feminine', 
        number: 'singular' 
      }, { taddhitaElisionType: 'lup' });
      
      const r = applySutra1_2_52('सुन्दर', base, { 
        pos: 'adj', 
        features: {} 
      });
      
      expect(r.applied).toBe(true);
      expect(r.qualifierAgreement.gender).toBe('feminine');
    });
  });

  describe('Complex Real-world Scenarios', () => {
    test('should handle multiple adjectives with different feature specifications', () => {
      const retentionResult = {
        applied: true,
        sutra: '1.2.51',
        retainedFeatures: {
          gender: 'neuter',
          number: 'dual',
          case: 'nominative',
          person: 'third'
        }
      };

      // Adjective with no features
      const adj1 = sutra1252('विशाल', retentionResult, {
        pos: 'adj',
        features: {}
      });

      // Adjective with partial features
      const adj2 = sutra1252('नूतन', retentionResult, {
        pos: 'adj',
        features: { case: 'accusative' }
      });

      expect(adj1.applies).toBe(true);
      expect(adj1.qualifierAgreement.gender).toBe('neuter');
      expect(adj1.qualifierAgreement.number).toBe('dual');

      expect(adj2.applies).toBe(true);
      expect(adj2.qualifierAgreement.gender).toBe('neuter'); // Inherited
      expect(adj2.qualifierAgreement.case).toBe('accusative'); // Explicit
    });

    test('should handle compound adjectives', () => {
      const retentionResult = {
        applied: true,
        retainedFeatures: {
          gender: 'masculine',
          number: 'plural',
          case: 'genitive'
        }
      };

      const result = sutra1252('महाकाव्यप्रसिद्ध', retentionResult, {
        pos: 'adjective',
        features: {},
        semanticContext: 'compound'
      });

      expect(result.applies).toBe(true);
      expect(result.qualifierAgreement.gender).toBe('masculine');
      expect(result.qualifierAgreement.number).toBe('plural');
      expect(result.confidence.overall).toBeGreaterThan(0.7);
    });
  });
});

describe('Integration Tests', () => {
  test('should integrate with morphological analysis systems', () => {
    const retentionResult = {
      applied: true,
      sutra: '1.2.51',
      retainedFeatures: {
        gender: 'feminine',
        number: 'singular',
        case: 'instrumental'
      }
    };

    const result = sutra1252('गुणवत्', retentionResult, {
      pos: 'adj',
      morphologicalContext: 'noun_phrase',
      features: {}
    });

    expect(result.applies).toBe(true);
    expect(result.qualifierAgreement._inheritance_source).toBe('1.2.51');
    expect(result.qualifierAgreement._ajati_application).toBe(true);
  });
});
