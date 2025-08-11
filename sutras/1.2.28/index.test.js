import sutra1_2_28 from './index.js';

describe('Sutra 1.2.28: अचश्च', () => {
  test('should handle valid input', () => {
    const result = sutra1_2_28('test');
    expect(result).toHaveProperty('sutraApplied', '1.2.28');
    expect(result).toHaveProperty('rule', 'अचश्च');
  });

  test('should throw error for invalid input', () => {
    expect(() => sutra1_2_28('')).toThrow('Invalid input');
    expect(() => sutra1_2_28(null)).toThrow('Invalid input');
    expect(() => sutra1_2_28(undefined)).toThrow('Invalid input');
  });

  test('should detect script correctly', () => {
    const resultIAST = sutra1_2_28('test');
    expect(resultIAST.script).toBe('IAST');
    
    const resultDeva = sutra1_2_28('टेस्ट');
    expect(resultDeva.script).toBe('Devanagari');
  });
});
