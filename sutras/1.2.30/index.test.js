import sutra1_2_30 from './index.js';

describe('Sutra 1.2.30: नीचैरनुदात्तः', () => {
  test('should handle valid input', () => {
    const result = sutra1_2_30('test');
    expect(result).toHaveProperty('sutraApplied', '1.2.30');
    expect(result).toHaveProperty('rule', 'नीचैरनुदात्तः');
  });

  test('should throw error for invalid input', () => {
    expect(() => sutra1_2_30('')).toThrow('Invalid input');
    expect(() => sutra1_2_30(null)).toThrow('Invalid input');
    expect(() => sutra1_2_30(undefined)).toThrow('Invalid input');
  });

  test('should detect script correctly', () => {
    const resultIAST = sutra1_2_30('test');
    expect(resultIAST.script).toBe('IAST');
    
    const resultDeva = sutra1_2_30('टेस्ट');
    expect(resultDeva.script).toBe('Devanagari');
  });
});
