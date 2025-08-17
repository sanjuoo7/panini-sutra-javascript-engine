import { identifyCoreSampradana } from './index.js';

describe('Sutra 1.4.32: कर्मणा यमभिप्रैति स सम्प्रदानम्', () => {
  // Basic functionality tests
  test('should identify dative case for core recipient', () => {
    const result = identifyCoreSampradana('देवदत्ताय', { 
      verb: 'ददाति', 
      context: 'देवदत्ताय गां ददाति',
      action_type: 'giving' 
    });
    expect(result.applies).toBe(true);
    expect(result.karaka).toBe('सम्प्रदान');
    expect(result.case_required).toBe('dative');
  });

  test('should identify dative for intended recipient', () => {
    const result = identifyCoreSampradana('ब्राह्मणाय', { 
      verb: 'प्रयच्छति', 
      context: 'ब्राह्मणाय धनं प्रयच्छति',
      action_type: 'offering' 
    });
    expect(result.applies).toBe(true);
    expect(result.karaka).toBe('सम्प्रदान');
  });

  test('should identify beneficiary contexts', () => {
    const result = identifyCoreSampradana('पुत्राय', { 
      verb: 'करोति', 
      context: 'पुत्राय गृहं करोति',
      action_type: 'beneficiary' 
    });
    expect(result.applies).toBe(true);
    expect(result.karaka).toBe('सम्प्रदान');
  });

  // IAST support tests
  test('should handle IAST input for recipient', () => {
    const result = identifyCoreSampradana('devadattāya', { 
      verb: 'dadāti', 
      context: 'devadattāya gāṃ dadāti',
      script: 'IAST' 
    });
    expect(result.applies).toBe(true);
    expect(result.case_required).toBe('dative');
  });

  // Error handling tests
  test('should handle invalid input gracefully', () => {
    const result = identifyCoreSampradana('', {});
    expect(result.applies).toBe(false);
    expect(result.error).toBeDefined();
  });

  test('should handle non-recipient contexts', () => {
    const result = identifyCoreSampradana('गृहम्', { 
      verb: 'गच्छति', 
      context: 'गृहं गच्छति' 
    });
    expect(result.applies).toBe(false);
  });

  // Edge cases
  test('should validate giving/benefiting verb requirements', () => {
    const result = identifyCoreSampradana('देवदत्ताय', { 
      verb: 'पश्यति', 
      context: 'देवदत्ताय पश्यति' 
    });
    expect(result.applies).toBe(false);
  });

  test('should handle given object as कर्म', () => {
    const result = identifyCoreSampradana('गाम्', { 
      verb: 'ददाति', 
      context: 'देवदत्ताय गां ददाति',
      element_role: 'given_object' 
    });
    expect(result.karaka).toBe('कर्म');
    expect(result.case_required).toBe('accusative');
  });

  // Integration tests
  test('should work with script conversion', () => {
    const result = identifyCoreSampradana('देवदत्ताय', { 
      verb: 'ददाति',
      output_script: 'IAST' 
    });
    expect(result.applies).toBe(true);
  expect(result.word_iast).toBe('devdttāy');
  });

  test('should validate case endings', () => {
    const result = identifyCoreSampradana('देवदत्त', { 
      verb: 'ददाति',
      validate_case: true 
    });
    expect(result.case_valid).toBe(false);
  });

  test('should handle purpose-oriented contexts', () => {
    const result = identifyCoreSampradana('यज्ञाय', { 
      verb: 'आनयति', 
      context: 'यज्ञाय समिधम् आनयति',
      purpose_oriented: true 
    });
    expect(result.applies).toBe(true);
  });

  test('should identify various giving verbs', () => {
    const givingVerbs = ['ददाति', 'प्रयच्छति', 'अर्पयति', 'समर्पयति', 'निवेदयति'];
    givingVerbs.forEach(verb => {
      const result = identifyCoreSampradana('गुरवे', { 
        verb, 
        context: `गुरवे फलं ${verb}` 
      });
      expect(result.applies).toBe(true);
    });
  });

  test('should handle multiple recipients', () => {
    const result = identifyCoreSampradana('ब्राह्मणेभ्यः', { 
      verb: 'वितरति', 
      context: 'ब्राह्मणेभ्यो धनं वितरति',
      number: 'plural' 
    });
    expect(result.applies).toBe(true);
  });

  test('should handle compound recipient contexts', () => {
    const result = identifyCoreSampradana('गुरुशिष्याभ्याम्', { 
      verb: 'ददाति', 
      context: 'गुरुशिष्याभ्यां भोजनं ददाति',
      compound_type: 'dvandva' 
    });
    expect(result.applies).toBe(true);
  });
});
