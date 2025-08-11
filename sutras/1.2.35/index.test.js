import sutra1_2_35 from './index.js';

describe('Sutra 1.2.35: उच्चैस्तरां वा वषट्कारः', () => {
  test('should handle valid input', () => {
    const result = sutra1_2_35('test');
    expect(result).toHaveProperty('sutraApplied', '1.2.35');
    expect(result).toHaveProperty('rule', 'उच्चैस्तरां वा वषट्कारः');
  });

  test('should throw error for invalid input', () => {
    expect(() => sutra1_2_35('')).toThrow('Invalid input');
    expect(() => sutra1_2_35(null)).toThrow('Invalid input');
    expect(() => sutra1_2_35(undefined)).toThrow('Invalid input');
  });

  test('should detect script correctly', () => {
    const resultIAST = sutra1_2_35('test');
    expect(resultIAST.script).toBe('IAST');
    
    const resultDeva = sutra1_2_35('टेस्ट');
    expect(resultDeva.script).toBe('Devanagari');
  });
});
