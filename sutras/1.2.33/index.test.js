import sutra1_2_33 from './index.js';

describe('Sutra 1.2.33: एकश्रुति दूरात् सम्बुद्धौ', () => {
  test('should handle valid input', () => {
    const result = sutra1_2_33('test');
    expect(result).toHaveProperty('sutraApplied', '1.2.33');
    expect(result).toHaveProperty('rule', 'एकश्रुति दूरात् सम्बुद्धौ');
  });

  test('should throw error for invalid input', () => {
    expect(() => sutra1_2_33('')).toThrow('Invalid input');
    expect(() => sutra1_2_33(null)).toThrow('Invalid input');
    expect(() => sutra1_2_33(undefined)).toThrow('Invalid input');
  });

  test('should detect script correctly', () => {
    const resultIAST = sutra1_2_33('test');
    expect(resultIAST.script).toBe('IAST');
    
    const resultDeva = sutra1_2_33('टेस्ट');
    expect(resultDeva.script).toBe('Devanagari');
  });
});
