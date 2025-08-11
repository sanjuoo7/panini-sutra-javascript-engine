import sutra1_2_36 from './index.js';

describe('Sutra 1.2.36: विभाषा छन्दसि', () => {
  test('should handle valid input', () => {
    const result = sutra1_2_36('test');
    expect(result).toHaveProperty('sutraApplied', '1.2.36');
    expect(result).toHaveProperty('rule', 'विभाषा छन्दसि');
  });

  test('should throw error for invalid input', () => {
    expect(() => sutra1_2_36('')).toThrow('Invalid input');
    expect(() => sutra1_2_36(null)).toThrow('Invalid input');
    expect(() => sutra1_2_36(undefined)).toThrow('Invalid input');
  });

  test('should detect script correctly', () => {
    const resultIAST = sutra1_2_36('test');
    expect(resultIAST.script).toBe('IAST');
    
    const resultDeva = sutra1_2_36('टेस्ट');
    expect(resultDeva.script).toBe('Devanagari');
  });
});
