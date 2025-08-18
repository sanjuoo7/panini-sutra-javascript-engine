import { identifyPraiseCurseDative } from './index.js';

describe('Sutra 1.4.34: शापानुग्रहयोश्च', () => {
  test('should identify dative case for praise recipient', () => {
    const result = identifyPraiseCurseDative('वीराय', { 
      verb: 'प्रशंसति', 
      context: 'वीराय प्रशंसति',
      action_type: 'praise' 
    });
    expect(result.applies).toBe(true);
    expect(result.karaka).toBe('सम्प्रदान');
    expect(result.morphologicalAnalysis.expectedCase).toBe('dative');
  });

  test('should identify dative case for curse recipient', () => {
    const result = identifyPraiseCurseDative('शत्रवे', { 
      verb: 'शपति', 
      context: 'शत्रवे शपति',
      action_type: 'curse' 
    });
    expect(result.applies).toBe(true);
    expect(result.karaka).toBe('सम्प्रदान');
  });

  test('should handle IAST input', () => {
    const result = identifyPraiseCurseDative('vīrāya', { 
      verb: 'praśaṃsati', 
      script: 'IAST' 
    });
    expect(result.applies).toBe(true);
  });

  test('should validate praise/curse verbs', () => {
    const verbs = ['प्रशंसति', 'शपति', 'अनुगृह्णाति', 'स्तौति'];
    verbs.forEach(verb => {
      const result = identifyPraiseCurseDative('जनाय', { verb });
      expect(result.applies).toBe(true);
    });
  });

  test('should handle invalid input gracefully', () => {
    const result = identifyPraiseCurseDative('', {});
    expect(result.applies).toBe(false);
    expect(result.error).toBeDefined();
  });
});
