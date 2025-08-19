import { 
  sutra1251, 
  applySutra1_2_51, 
  analyzeFeaturePreservation,
  validateElisionContext 
} from './index.js';

describe('Sutra 1.2.51: लुपि युक्तवद्व्यक्तिवचने', () => {
  
  describe('Core Functionality: Feature Preservation', () => {
    test('should preserve gender and number features under lup elision', () => {
      const result = sutra1251('गृह', { 
        gender: 'masculine', 
        number: 'singular', 
        person: 'third' 
      }, { 
        elisionType: 'lup',
        affixElided: 'क'
      });
      
      expect(result.applies).toBe(true);
      expect(result.retainedFeatures.gender).toBe('masculine');
      expect(result.retainedFeatures.number).toBe('singular');
      expect(result.retainedFeatures.person).toBe('third');
      expect(result.yukta_behavior).toBe(true);
    });

    test('should preserve features under taddhita elision context', () => {
      const result = sutra1251('देव', {
        gender: 'masculine',
        number: 'singular',
        case: 'nominative'
      }, {
        elisionType: 'taddhita_elision',
        derivationType: 'taddhita',
        affixElided: 'अ'
      });

      expect(result.applies).toBe(true);
      expect(result.retainedFeatures.gender).toBe('masculine');
      expect(result.retainedFeatures.number).toBe('singular');
      expect(result.analysis.preservationAnalysis.preservationMechanism).toBe('taddhita_feature_preservation');
    });

    test('should preserve feminine gender features correctly', () => {
      const result = sutra1251('गङ्गा', {
        gender: 'feminine',
        number: 'singular',
        person: 'third'
      }, {
        elisionType: 'lup',
        affixElided: 'आ'
      });

      expect(result.applies).toBe(true);
      expect(result.retainedFeatures.gender).toBe('feminine');
      expect(result.retainedFeatures._yukta_behavior).toBe(true);
    });
  });

  describe('Elision Context Validation', () => {
    test('should recognize explicit lup elision type', () => {
      const result = sutra1251('पुत्र', { gender: 'masculine' }, { elisionType: 'lup' });
      
      expect(result.analysis.elisionAnalysis.isValidElisionContext).toBe(true);
      expect(result.analysis.elisionAnalysis.elisionReasoning).toContain('Explicit elision type: lup');
    });

    test('should recognize elision-prone affixes', () => {
      const result = sutra1251('राम', { gender: 'masculine' }, { affixElided: 'क' });
      
      expect(result.analysis.elisionAnalysis.isValidElisionContext).toBe(true);
      expect(result.analysis.elisionAnalysis.elisionReasoning).toContain('Elision-prone affix detected');
    });

    test('should reject contexts without elision indicators', () => {
      const result = sutra1251('पुत्र', { gender: 'masculine' }, {});
      
      expect(result.applies).toBe(false);
      expect(result.analysis.elisionAnalysis.isValidElisionContext).toBe(false);
      expect(result.analysis.elisionAnalysis.elisionReasoning).toBe('No clear elision indicators');
    });

    test('validateElisionContext helper function', () => {
      expect(validateElisionContext('lup', null)).toBe(true);
      expect(validateElisionContext(null, 'क')).toBe(true);
      expect(validateElisionContext(null, null)).toBe(false);
    });
  });

  describe('Feature Classification and Validation', () => {
    test('should classify preservable vs non-preservable features', () => {
      const result = sutra1251('गृह', {
        gender: 'unknown',        // invalid value for valid feature
        number: 'singular',       // preservable
        customFeature: 'value'    // non-preservable feature
      }, { elisionType: 'lup' });

      expect(result.analysis.featureAnalysis.preservableFeatures).toEqual({
        number: 'singular'
      });
      expect(result.analysis.featureAnalysis.nonPreservableFeatures).toHaveProperty('customFeature');
      expect(result.analysis.featureAnalysis.featureValidation.gender).toBe('invalid_value');
      expect(result.analysis.featureAnalysis.featureValidation.customFeature).toBe('non_preservable_feature');
    });

    test('should identify critical features for agreement', () => {
      const result = sutra1251('देव', {
        gender: 'masculine',
        number: 'singular', 
        person: 'third',
        case: 'nominative'
      }, { elisionType: 'lup' });

      const criticalFeatures = result.analysis.featureAnalysis.criticalFeatures;
      expect(criticalFeatures).toContain('gender');
      expect(criticalFeatures).toContain('number');
      expect(criticalFeatures).toContain('person');
    });

    test('should handle empty original features', () => {
      const result = sutra1251('गृह', {}, { elisionType: 'lup' });
      
      expect(result.applies).toBe(false);
      expect(result.analysis.preservationAnalysis.preservationMechanism).toBe('no_preservable_features');
    });
  });

  describe('Agreement and Syntactic Context', () => {
    test('should preserve features when agreement targets are specified', () => {
      const result = sutra1251('कवि', {
        gender: 'masculine',
        number: 'singular'
      }, {
        elisionType: 'lup',
        agreementTargets: ['adjective', 'verb']
      });

      expect(result.applies).toBe(true);
      expect(result.analysis.preservationAnalysis.preservationMechanism).toBe('syntactic_agreement_preservation');
      expect(result.retainedFeatures.gender).toBe('masculine');
    });

    test('should handle explicit preservation requirement', () => {
      const result = sutra1251('नर', {
        gender: 'masculine',
        number: 'plural'
      }, {
        elisionType: 'lup',
        preservationRequired: true
      });

      expect(result.applies).toBe(true);
      expect(result.analysis.preservationAnalysis.preservationMechanism).toBe('explicit_requirement');
    });
  });

  describe('Script Support and Normalization', () => {
    test('should handle Devanagari input correctly', () => {
      const result = sutra1251('गृह', {
        gender: 'पुंलिङ्ग',
        number: 'एकवचन'
      }, { elisionType: 'lup' });

      expect(result.analysis.inputAnalysis.script).toBe('devanagari');
      expect(result.retainedFeatures.gender).toBe('पुंलिङ्ग');
      expect(result.retainedFeatures.number).toBe('एकवचन');
    });

    test('should handle IAST input correctly', () => {
      const result = sutra1251('gṛha', {
        gender: 'masculine',
        number: 'singular'
      }, { elisionType: 'lup' });

      expect(result.analysis.inputAnalysis.script).toBe('iast');
      expect(result.retainedFeatures.gender).toBe('masculine');
    });

    test('should normalize script input', () => {
      const result = sutra1251('गृह', { gender: 'masculine' }, { elisionType: 'lup' });
      
      expect(result.analysis.inputAnalysis.baseForm).toBeTruthy();
      expect(typeof result.analysis.inputAnalysis.baseForm).toBe('string');
    });
  });

  describe('Confidence Assessment', () => {
    test('should calculate high confidence for clear contexts', () => {
      const result = sutra1251('राम', {
        gender: 'masculine',
        number: 'singular',
        person: 'third'
      }, {
        elisionType: 'lup',
        affixElided: 'क',
        agreementTargets: ['adjective']
      });

      expect(result.confidence.overall).toBeGreaterThan(0.8);
      expect(result.confidence.contextual).toBeGreaterThan(0.7);
      expect(result.confidence.traditional).toBeGreaterThan(0.9);
    });

    test('should calculate lower confidence for ambiguous contexts', () => {
      const result = sutra1251('गृह', {
        gender: 'masculine'
      }, {
        elisionType: 'unknown_type'
      });

      expect(result.confidence.overall).toBeLessThan(0.6);
    });
  });

  describe('Error Handling and Edge Cases', () => {
    test('should handle null base form gracefully', () => {
      const result = sutra1251(null, { gender: 'masculine' }, { elisionType: 'lup' });
      
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_base_form');
      expect(result.analysis.inputValidation.error).toContain('Base form must be a non-empty string');
    });

    test('should handle undefined base form gracefully', () => {
      const result = sutra1251(undefined, { gender: 'masculine' }, { elisionType: 'lup' });
      
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_base_form');
    });

    test('should handle empty string base form', () => {
      const result = sutra1251('', { gender: 'masculine' }, { elisionType: 'lup' });
      
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_base_form');
    });

    test('should handle non-string base form', () => {
      const result = sutra1251(123, { gender: 'masculine' }, { elisionType: 'lup' });
      
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_base_form');
      expect(result.analysis.inputValidation.providedType).toBe('number');
    });
  });

  describe('Analysis Helper Functions', () => {
    test('analyzeFeaturePreservation should provide detailed analysis', () => {
      const result = analyzeFeaturePreservation('राम', {
        gender: 'masculine',
        number: 'singular'
      }, { elisionType: 'lup' });

      expect(result.preservation_required).toBe(true);
      expect(result.retained_features.gender).toBe('masculine');
      expect(result.yukta_behavior).toBe(true);
      expect(result.analysis).toBeTruthy();
      expect(result.confidence).toBeTruthy();
    });

    test('should provide traditional commentary context', () => {
      const result = sutra1251('देव', { gender: 'masculine' }, { elisionType: 'lup' });
      
      expect(result.analysis.inputValidation.traditionalNote).toContain('मूलशब्दस्य आवश्यकता');
    });
  });

  describe('Legacy Compatibility', () => {
    test('applySutra1_2_51 legacy function should work', () => {
      const result = applySutra1_2_51('गृह', { 
        gender: 'masculine', 
        number: 'singular' 
      }, { elisionType: 'lup' });
      
      expect(result.applied).toBe(true);
      expect(result.retainedFeatures.gender).toBe('masculine');
    });

    test('should maintain backward compatibility with old test structure', () => {
      const result = applySutra1_2_51('base', { 
        gender: 'feminine', 
        number: 'singular', 
        person: 3 
      }, { taddhitaElisionType: 'lup' });
      
      expect(result.applied).toBe(true);
      expect(result.retainedFeatures.gender).toBe('feminine');
    });
  });

  describe('Complex Real-world Scenarios', () => {
    test('should handle compound word with multiple feature preservation', () => {
      const result = sutra1251('राजपुत्र', {
        gender: 'masculine',
        number: 'singular',
        case: 'nominative',
        person: 'third'
      }, {
        elisionType: 'taddhita_elision',
        affixElided: 'क',
        agreementTargets: ['adjective', 'verb'],
        syntacticContext: 'compound'
      });

      expect(result.applies).toBe(true);
      expect(result.retainedFeatures.gender).toBe('masculine');
      expect(result.retainedFeatures.number).toBe('singular');
      expect(result.confidence.overall).toBeGreaterThan(0.8);
    });

    test('should handle Vedic context with special preservation needs', () => {
      const result = sutra1251('अग्नि', {
        gender: 'masculine',
        number: 'singular',
        case: 'vocative'
      }, {
        elisionType: 'lup',
        affixElided: 'ए',
        context: 'vedic',
        preservationRequired: true
      });

      expect(result.applies).toBe(true);
      expect(result.retainedFeatures.case).toBe('vocative');
      expect(result.analysis.preservationAnalysis.yukta_behavior).toBe(true);
    });
  });
});

describe('Integration Tests', () => {
  test('should integrate with other morphological analysis systems', () => {
    const result = sutra1251('कवि', {
      gender: 'masculine',
      number: 'singular',
      case: 'nominative'
    }, {
      elisionType: 'lup',
      morphologicalContext: 'noun_phrase',
      agreementTargets: ['adjective']
    });

    expect(result.applies).toBe(true);
    expect(result.retainedFeatures._preservation_method).toBe('sutra_1_2_51');
    expect(result.retainedFeatures._elision_compensated).toBe(true);
  });
});
