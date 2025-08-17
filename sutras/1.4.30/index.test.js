import { identifyBirthSourceAblative } from './index.js';

describe('Sutra 1.4.30: जनिकर्तुः प्रकृतिः', () => {
  // Basic functionality tests
  test('should identify ablative case for birth source', () => {
    const result = identifyBirthSourceAblative('मातुः', { 
      verb: 'जायते', 
      context: 'मातुः पुत्रो जायते',
      action_type: 'birth' 
    });
    expect(result.applies).toBe(true);
    expect(result.karaka).toBe('अपादान');
    expect(result.case_required).toBe('ablative');
  });

  test('should identify generation source contexts', () => {
    const result = identifyBirthSourceAblative('बीजात्', { 
      verb: 'उत्पद्यते', 
      context: 'बीजात् वृक्षः उत्पद्यते',
      action_type: 'generation' 
    });
    expect(result.applies).toBe(true);
    expect(result.karaka).toBe('अपादान');
  });

  test('should identify origination contexts', () => {
    const result = identifyBirthSourceAblative('अग्नेः', { 
      verb: 'निर्गच्छति', 
      context: 'अग्नेर् धूमो निर्गच्छति',
      action_type: 'origination' 
    });
    expect(result.applies).toBe(true);
    expect(result.karaka).toBe('अपादान');
  });

  // IAST support tests
  test('should handle IAST input for birth source', () => {
    const result = identifyBirthSourceAblative('mātuḥ', { 
      verb: 'jāyate', 
      context: 'mātuḥ putro jāyate',
      script: 'IAST' 
    });
    expect(result.applies).toBe(true);
    expect(result.case_required).toBe('ablative');
  });

  // Error handling tests
  test('should handle invalid input gracefully', () => {
    const result = identifyBirthSourceAblative('', {});
    expect(result.applies).toBe(false);
    expect(result.error).toBeDefined();
  });

  test('should handle non-birth contexts', () => {
    const result = identifyBirthSourceAblative('गृहम्', { 
      verb: 'गच्छति', 
      context: 'गृहं गच्छति' 
    });
    expect(result.applies).toBe(false);
  });

  // Edge cases
  test('should validate birth/generation verb requirements', () => {
    const result = identifyBirthSourceAblative('मातुः', { 
      verb: 'पश्यति', 
      context: 'मातुः पश्यति' 
    });
    expect(result.applies).toBe(false);
  });

  test('should handle created entity as कर्म', () => {
    const result = identifyBirthSourceAblative('पुत्रम्', { 
      verb: 'जनयति', 
      context: 'मातुः पुत्रं जनयति',
      element_role: 'created_entity' 
    });
    expect(result.karaka).toBe('कर्म');
    expect(result.case_required).toBe('accusative');
  });

  // Integration tests
  test('should work with script conversion', () => {
    const result = identifyBirthSourceAblative('मातुः', { 
      verb: 'जायते',
      output_script: 'IAST' 
    });
    expect(result.applies).toBe(true);
    expect(result.word_iast).toBe('mātuḥ');
  });

  test('should validate case endings', () => {
    const result = identifyBirthSourceAblative('माता', { 
      verb: 'जायते',
      validate_case: true 
    });
    expect(result.case_valid).toBe(false);
  });

  test('should handle natural generation contexts', () => {
    const result = identifyBirthSourceAblative('वृक्षात्', { 
      verb: 'पतति', 
      context: 'वृक्षात् फलं पतति',
      generation_type: 'natural' 
    });
    expect(result.applies).toBe(true);
  });

  test('should identify various generation verbs', () => {
    const generationVerbs = ['जायते', 'उत्पद्यते', 'निर्गच्छति', 'जनयति', 'उत्पादयति'];
    generationVerbs.forEach(verb => {
      const result = identifyBirthSourceAblative('मूलात्', { 
        verb, 
        context: `मूलात् शाखा ${verb}` 
      });
      expect(result.applies).toBe(true);
    });
  });

  test('should handle compound source contexts', () => {
    const result = identifyBirthSourceAblative('मातापितृभ्याम्', { 
      verb: 'जायते', 
      context: 'मातापितृभ्यां सन्तानो जायते',
      number: 'dual' 
    });
    expect(result.applies).toBe(true);
  });
});
