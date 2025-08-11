import sutra1_1_53 from './index.js';

describe('Sutra 1.1.53: ङिच्च', () => {
  test('should handle valid input', () => {
    const result = sutra1_1_53('test');
    expect(result).toHaveProperty('sutraApplied', '1.1.53');
    expect(result).toHaveProperty('rule', 'ङिच्च');
  });

  test('should throw error for invalid input', () => {
    expect(() => sutra1_1_53('')).toThrow('Invalid input');
    expect(() => sutra1_1_53(null)).toThrow('Invalid input');
    expect(() => sutra1_1_53(undefined)).toThrow('Invalid input');
  });

  test('should detect script correctly', () => {
    const resultIAST = sutra1_1_53('test');
    expect(resultIAST.script).toBe('IAST');
    
    const resultDeva = sutra1_1_53('टेस्ट');
    expect(resultDeva.script).toBe('Devanagari');
  });
});
