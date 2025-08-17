import { identifyAngerDative } from './index.js';

describe('Sutra 1.4.37: क्रुधहिंसयोः', () => {
  test('should identify dative case for anger target', () => {
    const result = identifyAngerDative('शत्रवे', { 
      verb: 'क्रुध्यति', 
      context: 'शत्रवे क्रुध्यति',
      action_type: 'anger' 
    });
    expect(result.applies).toBe(true);
    expect(result.karaka).toBe('सम्प्रदान');
    expect(result.case_required).toBe('dative');
  });

  test('should handle harm contexts', () => {
    const result = identifyAngerDative('प्राणिने', { 
      verb: 'हिनस्ति', 
      context: 'प्राणिने हिनस्ति',
      action_type: 'harm' 
    });
    expect(result.applies).toBe(true);
  });

  test('should handle IAST input', () => {
    const result = identifyAngerDative('śatrave', { 
      verb: 'krudhyati', 
      script: 'IAST' 
    });
    expect(result.applies).toBe(true);
  });

  test('should validate anger/harm verbs', () => {
    const angerVerbs = ['क्रुध्यति', 'हिनस्ति', 'द्रुह्यति', 'कुप्यति'];
    angerVerbs.forEach(verb => {
      const result = identifyAngerDative('अपराधिने', { verb });
      expect(result.applies).toBe(true);
    });
  });

  test('should handle invalid input gracefully', () => {
    const result = identifyAngerDative('', {});
    expect(result.applies).toBe(false);
    expect(result.error).toBeDefined();
  });
});
