import sutra1_2_29 from './index.js';

describe('Sutra 1.2.29: उच्चैरुदात्तः', () => {
  test('should handle valid input', () => {
    const result = sutra1_2_29('test');
    expect(result).toHaveProperty('sutraApplied', '1.2.29');
    expect(result).toHaveProperty('rule', 'उच्चैरुदात्तः');
  });

  test('should throw error for invalid input', () => {
    expect(() => sutra1_2_29('')).toThrow('Invalid input');
    expect(() => sutra1_2_29(null)).toThrow('Invalid input');
    expect(() => sutra1_2_29(undefined)).toThrow('Invalid input');
  });

  test('should detect script correctly', () => {
    const resultIAST = sutra1_2_29('test');
    expect(resultIAST.script).toBe('IAST');
    
    const resultDeva = sutra1_2_29('टेस्ट');
    expect(resultDeva.script).toBe('Devanagari');
  });
});
