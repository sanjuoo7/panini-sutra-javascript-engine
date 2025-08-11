import sutra1_2_31 from './index.js';

describe('Sutra 1.2.31: समाहारः स्वरितः', () => {
  test('should handle valid input', () => {
    const result = sutra1_2_31('test');
    expect(result).toHaveProperty('sutraApplied', '1.2.31');
    expect(result).toHaveProperty('rule', 'समाहारः स्वरितः');
  });

  test('should throw error for invalid input', () => {
    expect(() => sutra1_2_31('')).toThrow('Invalid input');
    expect(() => sutra1_2_31(null)).toThrow('Invalid input');
    expect(() => sutra1_2_31(undefined)).toThrow('Invalid input');
  });

  test('should detect script correctly', () => {
    const resultIAST = sutra1_2_31('test');
    expect(resultIAST.script).toBe('IAST');
    
    const resultDeva = sutra1_2_31('टेस्ट');
    expect(resultDeva.script).toBe('Devanagari');
  });
});
