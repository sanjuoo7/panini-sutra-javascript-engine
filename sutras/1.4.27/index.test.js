import { identifyPreventionAblative } from './index.js';

describe('Sutra 1.4.27: निवारणे', () => {
  // Basic functionality tests
  test('should identify ablative case for prevention contexts', () => {
    const result = identifyPreventionAblative('चौरेभ्यः', { 
      verb: 'निवारयति', 
      context: 'चौरेभ्यो गृहं निवारयति',
      action_type: 'prevention' 
    });
    expect(result.applies).toBe(true);
    expect(result.karaka).toBe('अपादान');
    expect(result.case_required).toBe('ablative');
  });

  test('should identify ablative for protection contexts', () => {
    const result = identifyPreventionAblative('शत्रुभ्यः', { 
      verb: 'रक्षति', 
      context: 'शत्रुभ्यः पुत्रं रक्षति',
      action_type: 'protection' 
    });
    expect(result.applies).toBe(true);
    expect(result.karaka).toBe('अपादान');
  });

  test('should identify ablative for blocking contexts', () => {
    const result = identifyPreventionAblative('मार्गात्', { 
      verb: 'निवारयति', 
      context: 'मार्गान् निवारयति',
      action_type: 'blocking' 
    });
    expect(result.applies).toBe(true);
    expect(result.karaka).toBe('अपादान');
  });

  // IAST support tests
  test('should handle IAST input for prevention', () => {
    const result = identifyPreventionAblative('caurebhyaḥ', { 
      verb: 'nivārayati', 
      context: 'caurebhyo gṛhaṃ nivārayati',
      script: 'IAST' 
    });
    expect(result.applies).toBe(true);
    expect(result.case_required).toBe('ablative');
  });

  // Error handling tests
  test('should handle invalid input gracefully', () => {
    const result = identifyPreventionAblative('', {});
    expect(result.applies).toBe(false);
    expect(result.error).toBeDefined();
  });

  test('should handle non-prevention contexts', () => {
    const result = identifyPreventionAblative('गृहम्', { 
      verb: 'गच्छति', 
      context: 'गृहं गच्छति' 
    });
    expect(result.applies).toBe(false);
  });

  // Edge cases
  test('should validate prevention verb requirements', () => {
    const result = identifyPreventionAblative('चौरेभ्यः', { 
      verb: 'पश्यति', 
      context: 'चौरेभ्यः पश्यति' 
    });
    expect(result.applies).toBe(false);
  });

  test('should handle compound prevention contexts', () => {
    const result = identifyPreventionAblative('अग्निचौरेभ्यः', { 
      verb: 'निवारयति', 
      context: 'अग्निचौरेभ्यो गृहं निवारयति',
      compound_type: 'dvandva' 
    });
    expect(result.applies).toBe(true);
  });

  // Integration tests
  test('should work with script conversion', () => {
    const result = identifyPreventionAblative('चौरेभ्यः', { 
      verb: 'निवारयति',
      output_script: 'IAST' 
    });
    expect(result.applies).toBe(true);
  expect(result.word_iast).toBe('caurebhyḥ');
  });

  test('should validate case endings', () => {
    const result = identifyPreventionAblative('चौर', { 
      verb: 'निवारयति',
      validate_case: true 
    });
    expect(result.case_valid).toBe(false);
  });
});
