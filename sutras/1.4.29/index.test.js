import { identifyTeachingAblative } from './index.js';

describe('Sutra 1.4.29: आख्यातोपयोगे', () => {
  // Basic functionality tests
  test('should identify ablative case for teaching source', () => {
    const result = identifyTeachingAblative('गुरोः', { 
      verb: 'अध्यापयति', 
      context: 'गुरोर् वेदम् अध्यापयति',
      action_type: 'teaching' 
    });
    expect(result.applies).toBe(true);
    expect(result.karaka).toBe('अपादान');
    expect(result.case_required).toBe('ablative');
  });

  test('should identify learning contexts with ablative source', () => {
    const result = identifyTeachingAblative('आचार्यात्', { 
      verb: 'अधीते', 
      context: 'आचार्यात् शास्त्रम् अधीते',
      action_type: 'learning' 
    });
    expect(result.applies).toBe(true);
    expect(result.karaka).toBe('अपादान');
  });

  test('should identify instruction contexts', () => {
    const result = identifyTeachingAblative('पितुः', { 
      verb: 'उपदिशति', 
      context: 'पितुर् धर्मम् उपदिशति',
      action_type: 'instruction' 
    });
    expect(result.applies).toBe(true);
    expect(result.karaka).toBe('अपादान');
  });

  // IAST support tests
  test('should handle IAST input for teaching', () => {
    const result = identifyTeachingAblative('guroḥ', { 
      verb: 'adhyāpayati', 
      context: 'guror vedam adhyāpayati',
      script: 'IAST' 
    });
    expect(result.applies).toBe(true);
    expect(result.case_required).toBe('ablative');
  });

  // Error handling tests
  test('should handle invalid input gracefully', () => {
    const result = identifyTeachingAblative('', {});
    expect(result.applies).toBe(false);
    expect(result.error).toBeDefined();
  });

  test('should handle non-teaching contexts', () => {
    const result = identifyTeachingAblative('गृहम्', { 
      verb: 'गच्छति', 
      context: 'गृहं गच्छति' 
    });
    expect(result.applies).toBe(false);
  });

  // Edge cases
  test('should validate teaching verb requirements', () => {
    const result = identifyTeachingAblative('गुरोः', { 
      verb: 'पश्यति', 
      context: 'गुरोः पश्यति' 
    });
    expect(result.applies).toBe(false);
  });

  test('should handle knowledge transmission contexts', () => {
    const result = identifyTeachingAblative('शास्त्रम्', { 
      verb: 'अध्यापयति', 
      context: 'गुरोः शास्त्रम् अध्यापयति',
      element_role: 'knowledge_object' 
    });
    expect(result.karaka).toBe('कर्म');
    expect(result.case_required).toBe('accusative');
  });

  // Integration tests
  test('should work with script conversion', () => {
    const result = identifyTeachingAblative('गुरोः', { 
      verb: 'अध्यापयति',
      output_script: 'IAST' 
    });
    expect(result.applies).toBe(true);
    expect(result.word_iast).toBe('guroḥ');
  });

  test('should validate case endings', () => {
    const result = identifyTeachingAblative('गुरु', { 
      verb: 'अध्यापयति',
      validate_case: true 
    });
    expect(result.case_valid).toBe(false);
  });

  test('should handle compound teacher contexts', () => {
    const result = identifyTeachingAblative('गुरुआचार्याभ्याम्', { 
      verb: 'अध्यापयति', 
      context: 'गुरुआचार्याभ्यां वेदम् अध्यापयति',
      number: 'dual' 
    });
    expect(result.applies).toBe(true);
  });

  test('should identify various teaching verbs', () => {
    const teachingVerbs = ['अध्यापयति', 'अधीते', 'उपदिशति', 'शिक्षयति', 'बोधयति'];
    teachingVerbs.forEach(verb => {
      const result = identifyTeachingAblative('गुरोः', { 
        verb, 
        context: `गुरोर् विद्यां ${verb}` 
      });
      expect(result.applies).toBe(true);
    });
  });
});
