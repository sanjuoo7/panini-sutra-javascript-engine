/**
 * Tests for Sutra 1.2.16: विभाषोपयमने (vibhāṣopayamane)
 */

import { sutra1216 } from './index.js';

describe('Sutra 1.2.16: विभाषोपयमने (vibhāṣopayamane)', () => {

  describe('Positive test cases - Rule applies', () => {
    
    test('should apply kit designation to यम् + क्त्वा in upayamane sense (optional = true)', () => {
      const result = sutra1216('यम्', 'क्त्वा', { 
        meaning: 'upayamane', 
        optional: true 
      });
      
      expect(result.applies).toBe(true);
      expect(result.kit).toBe(true);
      expect(result.sutra).toBe('1.2.16');
      expect(result.optional).toBe(true);
      expect(result.reason).toContain('Kit designation applied optionally');
    });

    test('should apply kit designation to यम् + सिच् in upayamane sense (optional = true)', () => {
      const result = sutra1216('यम्', 'सिच्', { 
        meaning: 'restraining', 
        optional: true 
      });
      
      expect(result.applies).toBe(true);
      expect(result.kit).toBe(true);
      expect(result.sutra).toBe('1.2.16');
      expect(result.optional).toBe(true);
    });

    test('should apply but not designate kit when optional = false', () => {
      const result = sutra1216('यम्', 'क्त्वा', { 
        meaning: 'curbing', 
        optional: false 
      });
      
      expect(result.applies).toBe(true);
      expect(result.kit).toBe(false);
      expect(result.sutra).toBe('1.2.16');
      expect(result.optional).toBe(true);
      expect(result.reason).toContain('not applied (optional rule not invoked)');
    });

    test('should work with Devanagari input', () => {
      const result = sutra1216('यम्', 'क्त्वा', { 
        meaning: 'उपयमने', 
        optional: true 
      });
      
      expect(result.applies).toBe(true);
      expect(result.kit).toBe(true);
      expect(result.sutra).toBe('1.2.16');
    });

    test('should work with IAST input', () => {
      const result = sutra1216('yam', 'ktvā', { 
        meaning: 'upayamane', 
        optional: true 
      });
      
      expect(result.applies).toBe(true);
      expect(result.kit).toBe(true);
      expect(result.sutra).toBe('1.2.16');
    });

    test('should default to optional = true when not specified', () => {
      const result = sutra1216('यम्', 'क्त्वा', { 
        meaning: 'restraining'
      });
      
      expect(result.applies).toBe(true);
      expect(result.kit).toBe(true);
      expect(result.sutra).toBe('1.2.16');
    });
  });

  describe('Negative test cases - Rule does not apply', () => {
    
    test('should not apply to non-यम् roots', () => {
      const result = sutra1216('गम्', 'क्त्वा', { 
        meaning: 'upayamane', 
        optional: true 
      });
      
      expect(result.applies).toBe(false);
      expect(result.kit).toBe(false);
      expect(result.reason).toContain('applies only to यम् (yam) root');
    });

    test('should not apply to non-क्त्वा/सिच् affixes', () => {
      const result = sutra1216('यम्', 'लिङ्', { 
        meaning: 'upayamane', 
        optional: true 
      });
      
      expect(result.applies).toBe(false);
      expect(result.kit).toBe(false);
      expect(result.reason).toContain('applies only to क्त्वा (ktvā) or सिच् (sic) affixes');
    });

    test('should not apply without upayamane meaning', () => {
      const result = sutra1216('यम्', 'क्त्वा', { 
        meaning: 'going', 
        optional: true 
      });
      
      expect(result.applies).toBe(false);
      expect(result.kit).toBe(false);
      expect(result.reason).toContain('applies only when यम् is used in the sense of upayamane');
    });

    test('should not apply when meaning is not provided', () => {
      const result = sutra1216('यम्', 'क्त्वा', { 
        optional: true 
      });
      
      expect(result.applies).toBe(false);
      expect(result.kit).toBe(false);
      expect(result.reason).toContain('applies only when यम् is used in the sense of upayamane');
    });

    test('should not apply with empty meaning', () => {
      const result = sutra1216('यम्', 'क्त्वा', { 
        meaning: '', 
        optional: true 
      });
      
      expect(result.applies).toBe(false);
      expect(result.kit).toBe(false);
    });
  });

  describe('Edge cases and error handling', () => {
    
    test('should handle empty string inputs', () => {
      const result = sutra1216('', '', { meaning: 'upayamane' });
      
      expect(result.applies).toBe(false);
      expect(result.kit).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });

    test('should handle null inputs', () => {
      const result = sutra1216(null, null);
      
      expect(result.applies).toBe(false);
      expect(result.kit).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });

    test('should handle undefined inputs', () => {
      const result = sutra1216(undefined, undefined);
      
      expect(result.applies).toBe(false);
      expect(result.kit).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });

    test('should handle non-string inputs', () => {
      const result = sutra1216(123, {});
      
      expect(result.applies).toBe(false);
      expect(result.kit).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });

    test('should handle whitespace-only inputs', () => {
      const result = sutra1216('   ', '   ');
      
      expect(result.applies).toBe(false);
      expect(result.kit).toBe(false);
    });

    test('should handle mixed scripts', () => {
      const result = sutra1216('यम्', 'ktvā', { 
        meaning: 'upayamane', 
        optional: true 
      });
      
      expect(result.applies).toBe(true);
      expect(result.kit).toBe(true);
    });

    test('should return complete analysis object', () => {
      const result = sutra1216('यम्', 'क्त्वा', { 
        meaning: 'upayamane', 
        optional: true 
      });
      
      expect(result).toHaveProperty('applies');
      expect(result).toHaveProperty('kit');
      expect(result).toHaveProperty('reason');
      expect(result).toHaveProperty('sutra');
      expect(result).toHaveProperty('optional');
      expect(result).toHaveProperty('meaning');
      expect(result).toHaveProperty('root');
      expect(result).toHaveProperty('affix');
    });
  });

  describe('Context variations', () => {
    
    test('should accept various upayamane meaning expressions', () => {
      const meanings = ['upayamane', 'restraining', 'curbing', 'उपयमने'];
      
      meanings.forEach(meaning => {
        const result = sutra1216('यम्', 'क्त्वा', { 
          meaning: meaning, 
          optional: true 
        });
        
        expect(result.applies).toBe(true);
        expect(result.kit).toBe(true);
      });
    });

    test('should handle partial meaning matches', () => {
      const result = sutra1216('यम्', 'क्त्वा', { 
        meaning: 'the act of restraining someone', 
        optional: true 
      });
      
      expect(result.applies).toBe(true);
      expect(result.kit).toBe(true);
    });
  });
});
