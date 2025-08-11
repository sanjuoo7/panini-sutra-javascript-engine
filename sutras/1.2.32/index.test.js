import sutra1_2_32 from './index.js';

describe('Sutra 1.2.32: तस्यादित उदात्तमर्धह्रस्वम्', () => {
  test('should handle valid input', () => {
    const result = sutra1_2_32('test');
    expect(result).toHaveProperty('sutraApplied', '1.2.32');
    expect(result).toHaveProperty('rule', 'तस्यादित उदात्तमर्धह्रस्वम्');
  });

  test('should throw error for invalid input', () => {
    expect(() => sutra1_2_32('')).toThrow('Invalid input');
    expect(() => sutra1_2_32(null)).toThrow('Invalid input');
    expect(() => sutra1_2_32(undefined)).toThrow('Invalid input');
  });

  test('should detect script correctly', () => {
    const resultIAST = sutra1_2_32('test');
    expect(resultIAST.script).toBe('IAST');
    
    const resultDeva = sutra1_2_32('टेस्ट');
    expect(resultDeva.script).toBe('Devanagari');
  });
});
