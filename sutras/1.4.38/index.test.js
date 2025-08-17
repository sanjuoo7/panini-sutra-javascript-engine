import { identifyPrefixedAngerKarma } from './index.js';

describe('Sutra 1.4.38: क्रुधद्रुहोरुपसृष्टयोः कर्म', () => {
  test('should identify accusative case for prefixed anger verbs', () => {
    const result = identifyPrefixedAngerKarma('शत्रुम्', { 
      verb: 'अभिक्रुध्यति', 
      context: 'शत्रुम् अभिक्रुध्यति',
      prefix: 'अभि' 
    });
    expect(result.applies).toBe(true);
    expect(result.karaka).toBe('कर्म');
    expect(result.case_required).toBe('accusative');
  });

  test('should handle prefixed द्रुह् verbs', () => {
    const result = identifyPrefixedAngerKarma('मित्रम्', { 
      verb: 'अभिद्रुह्यति', 
      context: 'मित्रम् अभिद्रुह्यति',
      prefix: 'अभि' 
    });
    expect(result.applies).toBe(true);
  });

  test('should handle IAST input', () => {
    const result = identifyPrefixedAngerKarma('śatrum', { 
      verb: 'abhikrudhyati', 
      script: 'IAST' 
    });
    expect(result.applies).toBe(true);
  });

  test('should validate prefix presence', () => {
    const result = identifyPrefixedAngerKarma('शत्रुम्', { 
      verb: 'क्रुध्यति' // no prefix
    });
    expect(result.applies).toBe(false);
  });

  test('should handle invalid input gracefully', () => {
    const result = identifyPrefixedAngerKarma('', {});
    expect(result.applies).toBe(false);
    expect(result.error).toBeDefined();
  });
});
