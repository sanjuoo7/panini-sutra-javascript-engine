import { identifyBecomingSourceAblative } from './index.js';

describe('Sutra 1.4.31: भुवः प्रभवः', () => {
  // Basic functionality tests
  test('should identify ablative case for becoming source', () => {
    const result = identifyBecomingSourceAblative('बालात्', { 
      verb: 'भवति', 
      context: 'बालात् युवा भवति',
      action_type: 'becoming' 
    });
    expect(result.applies).toBe(true);
    expect(result.karaka).toBe('अपादान');
    expect(result.case_required).toBe('ablative');
  });

  test('should identify transformation source contexts', () => {
    const result = identifyBecomingSourceAblative('दुग्धात्', { 
      verb: 'भवति', 
      context: 'दुग्धात् दधि भवति',
      action_type: 'transformation' 
    });
    expect(result.applies).toBe(true);
    expect(result.karaka).toBe('अपादान');
  });

  test('should identify development contexts', () => {
    const result = identifyBecomingSourceAblative('अण्डात्', { 
      verb: 'निर्गच्छति', 
      context: 'अण्डात् पक्षी निर्गच्छति',
      action_type: 'development' 
    });
    expect(result.applies).toBe(true);
    expect(result.karaka).toBe('अपादान');
  });

  // IAST support tests
  test('should handle IAST input for becoming source', () => {
    const result = identifyBecomingSourceAblative('bālāt', { 
      verb: 'bhavati', 
      context: 'bālāt yuvā bhavati',
      script: 'IAST' 
    });
    expect(result.applies).toBe(true);
    expect(result.case_required).toBe('ablative');
  });

  // Error handling tests
  test('should handle invalid input gracefully', () => {
    const result = identifyBecomingSourceAblative('', {});
    expect(result.applies).toBe(false);
    expect(result.error).toBeDefined();
  });

  test('should handle non-becoming contexts', () => {
    const result = identifyBecomingSourceAblative('गृहम्', { 
      verb: 'गच्छति', 
      context: 'गृहं गच्छति' 
    });
    expect(result.applies).toBe(false);
  });

  // Edge cases
  test('should validate becoming/transformation verb requirements', () => {
    const result = identifyBecomingSourceAblative('बालात्', { 
      verb: 'पश्यति', 
      context: 'बालात् पश्यति' 
    });
    expect(result.applies).toBe(false);
  });

  test('should handle resulting entity as कर्तृ', () => {
    const result = identifyBecomingSourceAblative('युवा', { 
      verb: 'भवति', 
      context: 'बालात् युवा भवति',
      element_role: 'result_entity' 
    });
    expect(result.karaka).toBe('कर्तृ');
    expect(result.case_required).toBe('nominative');
  });

  // Integration tests
  test('should work with script conversion', () => {
    const result = identifyBecomingSourceAblative('बालात्', { 
      verb: 'भवति',
      output_script: 'IAST' 
    });
    expect(result.applies).toBe(true);
    expect(result.word_iast).toBe('bālāt');
  });

  test('should validate case endings', () => {
    const result = identifyBecomingSourceAblative('बाल', { 
      verb: 'भवति',
      validate_case: true 
    });
    expect(result.case_valid).toBe(false);
  });

  test('should handle natural transformation contexts', () => {
    const result = identifyBecomingSourceAblative('जलात्', { 
      verb: 'जायते', 
      context: 'जलात् वाष्पो जायते',
      transformation_type: 'natural' 
    });
    expect(result.applies).toBe(true);
  });

  test('should identify various becoming verbs', () => {
    const becomingVerbs = ['भवति', 'जायते', 'निर्गच्छति', 'परिणमति', 'विकसति'];
    becomingVerbs.forEach(verb => {
      const result = identifyBecomingSourceAblative('कारणात्', { 
        verb, 
        context: `कारणात् कार्यं ${verb}` 
      });
      expect(result.applies).toBe(true);
    });
  });

  test('should handle temporal transformation contexts', () => {
    const result = identifyBecomingSourceAblative('शिशोः', { 
      verb: 'भवति', 
      context: 'शिशोर् वयस्को भवति',
      temporal_aspect: true 
    });
    expect(result.applies).toBe(true);
  });

  test('should handle compound source contexts', () => {
    const result = identifyBecomingSourceAblative('मूलकारणात्', { 
      verb: 'भवति', 
      context: 'मूलकारणात् फलं भवति',
      compound_type: 'tatpuruṣa' 
    });
    expect(result.applies).toBe(true);
  });
});
