/**
 * Tests for Sutra 1.2.17: स्था घ्वोरिच्च (sthā ghvoricca)
 */

import { sutra1217 } from './index.js';

describe('Sutra 1.2.17: स्था घ्वोरिच्च (sthā ghvoricca)', () => {

  describe('Positive test cases - Rule applies', () => {
    
    test('should apply kit designation to स्था + सिच्', () => {
      const result = sutra1217('स्था', 'सिच्');
      
      expect(result.applies).toBe(true);
      expect(result.kit).toBe(true);
      expect(result.sutra).toBe('1.2.17');
      expect(result.rootType).toBe('sthā');
      expect(result.reason).toContain('स्था (sthā) root');
    });

    test('should apply kit designation to स्थ + सिच्', () => {
      const result = sutra1217('स्थ', 'सिच्');
      
      expect(result.applies).toBe(true);
      expect(result.kit).toBe(true);
      expect(result.rootType).toBe('sthā');
    });

    test('should apply kit designation to तिष्ठ् + सिच्', () => {
      const result = sutra1217('तिष्ठ्', 'सिच्');
      
      expect(result.applies).toBe(true);
      expect(result.kit).toBe(true);
      expect(result.rootType).toBe('sthā');
    });

    test('should apply kit designation to घु class root हु + सिच्', () => {
      const result = sutra1217('हु', 'सिच्');
      
      expect(result.applies).toBe(true);
      expect(result.kit).toBe(true);
      expect(result.sutra).toBe('1.2.17');
      expect(result.rootType).toBe('ghu-class');
      expect(result.reason).toContain('घु class root');
    });

    test('should apply kit designation to घु class root दा + सिच्', () => {
      const result = sutra1217('दा', 'सिच्');
      
      expect(result.applies).toBe(true);
      expect(result.kit).toBe(true);
      expect(result.rootType).toBe('ghu-class');
    });

    test('should apply kit designation to घु class root धा + सिच्', () => {
      const result = sutra1217('धा', 'सिच्');
      
      expect(result.applies).toBe(true);
      expect(result.kit).toBe(true);
      expect(result.rootType).toBe('ghu-class');
    });

    test('should apply kit designation to घु class root पा + सिच्', () => {
      const result = sutra1217('पा', 'सिच्');
      
      expect(result.applies).toBe(true);
      expect(result.kit).toBe(true);
      expect(result.rootType).toBe('ghu-class');
    });

    test('should work with IAST input for sthā', () => {
      const result = sutra1217('sthā', 'sic');
      
      expect(result.applies).toBe(true);
      expect(result.kit).toBe(true);
      expect(result.rootType).toBe('sthā');
    });

    test('should work with IAST input for ghu class', () => {
      const result = sutra1217('dā', 'sic');
      
      expect(result.applies).toBe(true);
      expect(result.kit).toBe(true);
      expect(result.rootType).toBe('ghu-class');
    });

    test('should work with mixed scripts', () => {
      const result = sutra1217('स्था', 'sic');
      
      expect(result.applies).toBe(true);
      expect(result.kit).toBe(true);
      expect(result.rootType).toBe('sthā');
    });
  });

  describe('Negative test cases - Rule does not apply', () => {
    
    test('should not apply to non-स्था/घु roots', () => {
      const result = sutra1217('गम्', 'सिच्');
      
      expect(result.applies).toBe(false);
      expect(result.kit).toBe(false);
      expect(result.reason).toContain('applies only to स्था (sthā) or घु class roots');
    });

    test('should not apply to यम् root', () => {
      const result = sutra1217('यम्', 'सिच्');
      
      expect(result.applies).toBe(false);
      expect(result.kit).toBe(false);
      expect(result.reason).toContain('applies only to स्था (sthā) or घु class roots');
    });

    test('should not apply to non-सिच् affixes with स्था', () => {
      const result = sutra1217('स्था', 'क्त्वा');
      
      expect(result.applies).toBe(false);
      expect(result.kit).toBe(false);
      expect(result.reason).toContain('applies only to सिच् (sic) affix');
    });

    test('should not apply to non-सिच् affixes with घु class root', () => {
      const result = sutra1217('दा', 'लिङ्');
      
      expect(result.applies).toBe(false);
      expect(result.kit).toBe(false);
      expect(result.reason).toContain('applies only to सिच् (sic) affix');
    });

    test('should not apply to non-relevant root with सिच्', () => {
      const result = sutra1217('कृ', 'सिच्');
      
      expect(result.applies).toBe(false);
      expect(result.kit).toBe(false);
    });
  });

  describe('Edge cases and error handling', () => {
    
    test('should handle empty string inputs', () => {
      const result = sutra1217('', '');
      
      expect(result.applies).toBe(false);
      expect(result.kit).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });

    test('should handle null inputs', () => {
      const result = sutra1217(null, null);
      
      expect(result.applies).toBe(false);
      expect(result.kit).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });

    test('should handle undefined inputs', () => {
      const result = sutra1217(undefined, undefined);
      
      expect(result.applies).toBe(false);
      expect(result.kit).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });

    test('should handle non-string inputs', () => {
      const result = sutra1217(123, {});
      
      expect(result.applies).toBe(false);
      expect(result.kit).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });

    test('should handle whitespace-only inputs', () => {
      const result = sutra1217('   ', '   ');
      
      expect(result.applies).toBe(false);
      expect(result.kit).toBe(false);
    });

    test('should return complete analysis object', () => {
      const result = sutra1217('स्था', 'सिच्');
      
      expect(result).toHaveProperty('applies');
      expect(result).toHaveProperty('kit');
      expect(result).toHaveProperty('reason');
      expect(result).toHaveProperty('sutra');
      expect(result).toHaveProperty('rootType');
      expect(result).toHaveProperty('root');
      expect(result).toHaveProperty('affix');
    });
  });

  describe('All घु class roots', () => {
    
    test('should apply to all घु class roots in Devanagari', () => {
      const ghuRoots = ['हु', 'हू', 'दा', 'धा', 'दो', 'पा', 'मा', 'चि', 'जि', 'मी', 'नी', 'चे'];
      
      ghuRoots.forEach(root => {
        const result = sutra1217(root, 'सिच्');
        
        expect(result.applies).toBe(true);
        expect(result.kit).toBe(true);
        expect(result.rootType).toBe('ghu-class');
      });
    });

    test('should apply to all घु class roots in IAST', () => {
      const ghuRoots = ['hu', 'hū', 'dā', 'dhā', 'do', 'pā', 'mā', 'ci', 'ji', 'mī', 'nī', 'ce'];
      
      ghuRoots.forEach(root => {
        const result = sutra1217(root, 'sic');
        
        expect(result.applies).toBe(true);
        expect(result.kit).toBe(true);
        expect(result.rootType).toBe('ghu-class');
      });
    });
  });

  describe('All स्था root variants', () => {
    
    test('should apply to all स्था variants in Devanagari', () => {
      const sthaVariants = ['स्था', 'स्थ', 'तिष्ठ्', 'स्थि'];
      
      sthaVariants.forEach(root => {
        const result = sutra1217(root, 'सिच्');
        
        expect(result.applies).toBe(true);
        expect(result.kit).toBe(true);
        expect(result.rootType).toBe('sthā');
      });
    });

    test('should apply to all sthā variants in IAST', () => {
      const sthaVariants = ['sthā', 'stha', 'tiṣṭh', 'sthi'];
      
      sthaVariants.forEach(root => {
        const result = sutra1217(root, 'sic');
        
        expect(result.applies).toBe(true);
        expect(result.kit).toBe(true);
        expect(result.rootType).toBe('sthā');
      });
    });
  });
});
