import { identifyDebtDative } from './index.js';

describe('Sutra 1.4.35: ऋणे', () => {
  test('should identify dative case for debt recipient', () => {
    const result = identifyDebtDative('ब्राह्मणाय', { 
      verb: 'ऋणयति', 
      context: 'ब्राह्मणाय शतं ऋणयति',
      action_type: 'debt' 
    });
    expect(result.applies).toBe(true);
    expect(result.karaka).toBe('सम्प्रदान');
    expect(result.morphologicalAnalysis.expectedCase).toBe('dative');
  });

  test('should handle borrowing contexts', () => {
    const result = identifyDebtDative('गुरवे', { 
      verb: 'धारयति', 
      context: 'गुरवे ऋणं धारयति',
      debt_context: 'owing' 
    });
    expect(result.applies).toBe(true);
  });

  test('should handle IAST input', () => {
    const result = identifyDebtDative('brāhmaṇāya', { 
      verb: 'ṛṇayati', 
      script: 'IAST' 
    });
    expect(result.applies).toBe(true);
  });

  test('should validate debt-related verbs', () => {
    const debtVerbs = ['ऋणयति', 'धारयति', 'अधिकुर्वते'];
    debtVerbs.forEach(verb => {
      const result = identifyDebtDative('धनिने', { verb });
      expect(result.applies).toBe(true);
    });
  });

  test('should handle invalid input gracefully', () => {
    const result = identifyDebtDative('', {});
    expect(result.applies).toBe(false);
    expect(result.error).toBeDefined();
  });
});
