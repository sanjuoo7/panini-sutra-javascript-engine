import { identifyConcealmentAblative } from './index.js';

describe('Sutra 1.4.28: गुप्तिजुप्तिछुप्तिरुप्तिलुप्तिशुप्तिभ्यः कर्म', () => {
  // Basic functionality tests
  test('should identify ablative case for concealment from source', () => {
    const result = identifyConcealmentAblative('शत्रुभ्यः', { 
      verb: 'गुप्नाति', 
      context: 'शत्रुभ्यो धनं गुप्नाति',
      action_type: 'concealment' 
    });
    expect(result.applies).toBe(true);
    expect(result.karaka).toBe('अपादान');
    expect(result.case_required).toBe('ablative');
  });

  test('should identify all गुप्ति family verbs', () => {
    const verbs = ['गुप्नाति', 'जुप्नाति', 'छुप्नाति', 'रुप्नाति', 'लुप्नाति', 'शुप्नाति'];
    verbs.forEach(verb => {
      const result = identifyConcealmentAblative('शत्रुभ्यः', { 
        verb, 
        context: `शत्रुभ्यो गुह्यं ${verb}` 
      });
      expect(result.applies).toBe(true);
    });
  });

  test('should identify object as कर्म in concealment', () => {
    const result = identifyConcealmentAblative('धनम्', { 
      verb: 'गुप्नाति', 
      context: 'शत्रुभ्यो धनं गुप्नाति',
      element_role: 'object' 
    });
    expect(result.karaka).toBe('कर्म');
    expect(result.case_required).toBe('accusative');
  });

  // IAST support tests
  test('should handle IAST input for concealment', () => {
    const result = identifyConcealmentAblative('śatrubhyaḥ', { 
      verb: 'gupnāti', 
      context: 'śatrubhyo dhanaṃ gupnāti',
      script: 'IAST' 
    });
    expect(result.applies).toBe(true);
    expect(result.case_required).toBe('ablative');
  });

  // Error handling tests
  test('should handle invalid input gracefully', () => {
    const result = identifyConcealmentAblative('', {});
    expect(result.applies).toBe(false);
    expect(result.error).toBeDefined();
  });

  test('should handle non-concealment verbs', () => {
    const result = identifyConcealmentAblative('गृहम्', { 
      verb: 'गच्छति', 
      context: 'गृहं गच्छति' 
    });
    expect(result.applies).toBe(false);
  });

  // Edge cases
  test('should validate concealment verb family', () => {
    const result = identifyConcealmentAblative('शत्रुभ्यः', { 
      verb: 'पश्यति', 
      context: 'शत्रुभ्यः पश्यति' 
    });
    expect(result.applies).toBe(false);
  });

  test('should handle hidden object contexts', () => {
    const result = identifyConcealmentAblative('रहस्यम्', { 
      verb: 'गुप्नाति', 
      context: 'शत्रुभ्यो रहस्यं गुप्नाति',
      object_type: 'secret' 
    });
    expect(result.applies).toBe(true);
    expect(result.karaka).toBe('कर्म');
  });

  // Integration tests
  test('should work with script conversion', () => {
    const result = identifyConcealmentAblative('शत्रुभ्यः', { 
      verb: 'गुप्नाति',
      output_script: 'IAST' 
    });
    expect(result.applies).toBe(true);
  expect(result.word_iast).toBe('śtrubhyḥ');
  });

  test('should validate case endings', () => {
    const result = identifyConcealmentAblative('शत्रु', { 
      verb: 'गुप्नाति',
      validate_case: true 
    });
    expect(result.case_valid).toBe(false);
  });

  test('should handle compound concealment contexts', () => {
    const result = identifyConcealmentAblative('मित्रशत्रुभ्यः', { 
      verb: 'गुप्नाति', 
      context: 'मित्रशत्रुभ्यो धनं गुप्नाति',
      compound_type: 'dvandva' 
    });
    expect(result.applies).toBe(true);
  });
});
