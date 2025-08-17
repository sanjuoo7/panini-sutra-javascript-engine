import { identifyHoldingLocationCase } from './index.js';

describe('Sutra 1.4.39: धारेर्द्वितीया वा स्थाने', () => {
  test('should identify optional accusative case for holding locations', () => {
    const result = identifyHoldingLocationCase('स्तम्भम्', { 
      verb: 'धारयति', 
      context: 'स्तम्भं धारयति',
      spatial_relationship: 'location' 
    });
    expect(result.applies).toBe(true);
    expect(result.case_options).toContain('accusative');
    expect(result.optional).toBe(true);
  });

  test('should also allow locative case', () => {
    const result = identifyHoldingLocationCase('स्तम्भे', { 
      verb: 'धारयति', 
      context: 'स्तम्भे धारयति' 
    });
    expect(result.applies).toBe(true);
    expect(result.case_options).toContain('locative');
  });

  test('should handle IAST input', () => {
    const result = identifyHoldingLocationCase('stambham', { 
      verb: 'dhārayati', 
      script: 'IAST' 
    });
    expect(result.applies).toBe(true);
  });

  test('should validate धृ root requirement', () => {
    const result = identifyHoldingLocationCase('स्तम्भम्', { 
      verb: 'गच्छति' // not धृ root
    });
    expect(result.applies).toBe(false);
  });

  test('should handle invalid input gracefully', () => {
    const result = identifyHoldingLocationCase('', {});
    expect(result.applies).toBe(false);
    expect(result.error).toBeDefined();
  });
});
