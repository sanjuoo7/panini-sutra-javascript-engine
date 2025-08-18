import { identifyDesireDative } from './index.js';

describe('Sutra 1.4.36: वशे', () => {
  test('should identify dative case for desire target', () => {
    const result = identifyDesireDative('पुत्राय', { 
      verb: 'वशयति', 
      context: 'पुत्राय वशयति',
      action_type: 'desire' 
    });
    expect(result.applies).toBe(true);
    expect(result.karaka).toBe('सम्प्रदान');
    expect(result.morphologicalAnalysis.expectedCase).toBe('dative');
  });

  test('should handle longing contexts', () => {
    const result = identifyDesireDative('मित्राय', { 
      verb: 'इच्छति', 
      context: 'मित्राय मिलितुम् इच्छति',
      desire_type: 'longing' 
    });
    expect(result.applies).toBe(true);
  });

  test('should handle IAST input', () => {
    const result = identifyDesireDative('putrāya', { 
      verb: 'vaśayati', 
      script: 'IAST' 
    });
    expect(result.applies).toBe(true);
  });

  test('should validate desire-related verbs', () => {
    const desireVerbs = ['वशयति', 'इच्छति', 'कामयते', 'स्पृहयति'];
    desireVerbs.forEach(verb => {
      const result = identifyDesireDative('प्रियाय', { verb });
      expect(result.applies).toBe(true);
    });
  });

  test('should handle invalid input gracefully', () => {
    const result = identifyDesireDative('', {});
    expect(result.applies).toBe(false);
    expect(result.error).toBeDefined();
  });
});
