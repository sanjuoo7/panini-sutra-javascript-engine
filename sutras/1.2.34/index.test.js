import sutra1_2_34 from './index.js';

describe('Sutra 1.2.34: यज्ञकर्मण्यजपन्यूङ्खसामसु', () => {
  test('should handle valid input', () => {
    const result = sutra1_2_34('test');
    expect(result).toHaveProperty('sutraApplied', '1.2.34');
    expect(result).toHaveProperty('rule', 'यज्ञकर्मण्यजपन्यूङ्खसामसु');
  });

  test('should throw error for invalid input', () => {
    expect(() => sutra1_2_34('')).toThrow('Invalid input');
    expect(() => sutra1_2_34(null)).toThrow('Invalid input');
    expect(() => sutra1_2_34(undefined)).toThrow('Invalid input');
  });

  test('should detect script correctly', () => {
    const resultIAST = sutra1_2_34('test');
    expect(resultIAST.script).toBe('IAST');
    
    const resultDeva = sutra1_2_34('टेस्ट');
    expect(resultDeva.script).toBe('Devanagari');
  });
});
