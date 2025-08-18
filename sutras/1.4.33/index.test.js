import { identifyPleasureDative } from './index.js';

describe('Sutra 1.4.33: रुच्यर्थानां प्रीयमाणः', () => {
  test('should identify dative case for pleasure recipient', () => {
    const result = identifyPleasureDative('बालाय', { 
      verb: 'रोचते', 
      context: 'बालाय मोदकं रोचते',
      action_type: 'pleasure' 
    });
    expect(result.applies).toBe(true);
    expect(result.karaka).toBe('सम्प्रदान');
    expect(result.morphologicalAnalysis.expectedCase).toBe('dative');
  });

  test('should handle IAST input', () => {
    const result = identifyPleasureDative('bālāya', { 
      verb: 'rocate', 
      script: 'IAST' 
    });
    expect(result.applies).toBe(true);
  });

  test('should validate pleasure verbs', () => {
    const pleasureVerbs = ['रोचते', 'प्रीयते', 'हर्षयति', 'आह्लादयति'];
    pleasureVerbs.forEach(verb => {
      const result = identifyPleasureDative('जनाय', { verb });
      expect(result.applies).toBe(true);
    });
  });

  test('should handle invalid input gracefully', () => {
    const result = identifyPleasureDative('', {});
    expect(result.applies).toBe(false);
    expect(result.error).toBeDefined();
  });
});
