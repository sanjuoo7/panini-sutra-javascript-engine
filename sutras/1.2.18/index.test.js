/**
 * Tests for Sutra 1.2.18: न क्त्वा सेट् (na ktvā seṭ)
 */

import { sutra1218 } from './index.js';

describe('Sutra 1.2.18: न क्त्वा सेट् (na ktvā seṭ)', () => {

  describe('Positive test cases - Rule applies (prevents kit)', () => {
    
    test('should prevent kit designation for क्त्वा with सेट् augment (context)', () => {
      const result = sutra1218('कृ', 'क्त्वा', { hasSetAugment: true });
      
      expect(result.applies).toBe(true);
      expect(result.preventsKit).toBe(true);
      expect(result.kit).toBe(false);
      expect(result.sutra).toBe('1.2.18');
      expect(result.exceptionRule).toBe(true);
      expect(result.reason).toContain('Kit designation prevented');
    });

    test('should prevent kit designation for ktvā with iṭ augment (context)', () => {
      const result = sutra1218('kṛ', 'ktvā', { hasItAugment: true });
      
      expect(result.applies).toBe(true);
      expect(result.preventsKit).toBe(true);
      expect(result.kit).toBe(false);
    });

    test('should prevent kit designation with explicit सेट् marking', () => {
      const result = sutra1218('गम्', 'क्त्वा', { augment: 'सेट्' });
      
      expect(result.applies).toBe(true);
      expect(result.preventsKit).toBe(true);
      expect(result.kit).toBe(false);
    });

    test('should prevent kit designation with explicit seṭ marking', () => {
      const result = sutra1218('gam', 'ktvā', { augment: 'seṭ' });
      
      expect(result.applies).toBe(true);
      expect(result.preventsKit).toBe(true);
      expect(result.kit).toBe(false);
    });

    test('should prevent kit designation with explicit iṭ marking', () => {
      const result = sutra1218('gam', 'ktvā', { augment: 'iṭ' });
      
      expect(result.applies).toBe(true);
      expect(result.preventsKit).toBe(true);
      expect(result.kit).toBe(false);
    });

    test('should detect सेट् augment from affix form इक्त्वा', () => {
      const result = sutra1218('कृ', 'इक्त्वा');
      
      expect(result.applies).toBe(true);
      expect(result.preventsKit).toBe(true);
      expect(result.kit).toBe(false);
    });

    test('should detect iṭ augment from affix form iktvā', () => {
      const result = sutra1218('kṛ', 'iktvā');
      
      expect(result.applies).toBe(true);
      expect(result.preventsKit).toBe(true);
      expect(result.kit).toBe(false);
    });

    test('should detect सेट् augment from affix form इत्वा', () => {
      const result = sutra1218('स्था', 'इत्वा');
      
      expect(result.applies).toBe(true);
      expect(result.preventsKit).toBe(true);
      expect(result.kit).toBe(false);
    });

    test('should detect iṭ augment from affix form itvā', () => {
      const result = sutra1218('sthā', 'itvā');
      
      expect(result.applies).toBe(true);
      expect(result.preventsKit).toBe(true);
      expect(result.kit).toBe(false);
    });

    test('should work with mixed scripts', () => {
      const result = sutra1218('कृ', 'iktvā');
      
      expect(result.applies).toBe(true);
      expect(result.preventsKit).toBe(true);
      expect(result.kit).toBe(false);
    });
  });

  describe('Negative test cases - Rule does not apply', () => {
    
    test('should not apply to non-क्त्वा affixes', () => {
      const result = sutra1218('कृ', 'सिच्', { hasSetAugment: true });
      
      expect(result.applies).toBe(false);
      expect(result.preventsKit).toBe(false);
      expect(result.reason).toContain('applies only to क्त्वा (ktvā) affix');
    });

    test('should not apply to क्त्वा without सेट् augment', () => {
      const result = sutra1218('कृ', 'क्त्वा');
      
      expect(result.applies).toBe(false);
      expect(result.preventsKit).toBe(false);
      expect(result.reason).toContain('applies only when क्त्वा has सेट् (iṭ) augment');
    });

    test('should not apply to क्त्वा with hasSetAugment: false', () => {
      const result = sutra1218('कृ', 'क्त्वा', { hasSetAugment: false });
      
      expect(result.applies).toBe(false);
      expect(result.preventsKit).toBe(false);
    });

    test('should not apply to regular क्त्वा without augment context', () => {
      const result = sutra1218('गम्', 'क्त्वा', {});
      
      expect(result.applies).toBe(false);
      expect(result.preventsKit).toBe(false);
    });

    test('should not apply to लिङ् affix even with सेट्', () => {
      const result = sutra1218('कृ', 'लिङ्', { hasSetAugment: true });
      
      expect(result.applies).toBe(false);
      expect(result.preventsKit).toBe(false);
    });

    test('should not apply to त्वा variants without इ', () => {
      const result = sutra1218('कृ', 'त्वा');
      
      expect(result.applies).toBe(false);
      expect(result.preventsKit).toBe(false);
    });
  });

  describe('Edge cases and error handling', () => {
    
    test('should handle empty string inputs', () => {
      const result = sutra1218('', '');
      
      expect(result.applies).toBe(false);
      expect(result.preventsKit).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });

    test('should handle null inputs', () => {
      const result = sutra1218(null, null);
      
      expect(result.applies).toBe(false);
      expect(result.preventsKit).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });

    test('should handle undefined inputs', () => {
      const result = sutra1218(undefined, undefined);
      
      expect(result.applies).toBe(false);
      expect(result.preventsKit).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });

    test('should handle non-string inputs', () => {
      const result = sutra1218(123, {});
      
      expect(result.applies).toBe(false);
      expect(result.preventsKit).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });

    test('should handle whitespace-only inputs', () => {
      const result = sutra1218('   ', '   ');
      
      expect(result.applies).toBe(false);
      expect(result.preventsKit).toBe(false);
    });

    test('should return complete analysis object', () => {
      const result = sutra1218('कृ', 'इक्त्वा');
      
      expect(result).toHaveProperty('applies');
      expect(result).toHaveProperty('preventsKit');
      expect(result).toHaveProperty('kit');
      expect(result).toHaveProperty('reason');
      expect(result).toHaveProperty('sutra');
      expect(result).toHaveProperty('exceptionRule');
      expect(result).toHaveProperty('root');
      expect(result).toHaveProperty('affix');
      expect(result).toHaveProperty('augmentType');
    });
  });

  describe('Augment detection variations', () => {
    
    test('should detect various सेट् patterns in Devanagari', () => {
      const patterns = [
        ['कृ', 'इक्त्वा'],
        ['गम्', 'इत्वा'],
        ['स्था', 'इक्त्वा']
      ];
      
      patterns.forEach(([root, affix]) => {
        const result = sutra1218(root, affix);
        
        expect(result.applies).toBe(true);
        expect(result.preventsKit).toBe(true);
      });
    });

    test('should detect various iṭ patterns in IAST', () => {
      const patterns = [
        ['kṛ', 'iktvā'],
        ['gam', 'itvā'],
        ['sthā', 'iktvā']
      ];
      
      patterns.forEach(([root, affix]) => {
        const result = sutra1218(root, affix);
        
        expect(result.applies).toBe(true);
        expect(result.preventsKit).toBe(true);
      });
    });

    test('should handle context with various augment markings', () => {
      const augmentMarkings = ['सेट्', 'seṭ', 'iṭ'];
      
      augmentMarkings.forEach(augment => {
        const result = sutra1218('कृ', 'क्त्वा', { augment });
        
        expect(result.applies).toBe(true);
        expect(result.preventsKit).toBe(true);
      });
    });
  });

  describe('Exception rule behavior', () => {
    
    test('should always return kit: false when rule applies', () => {
      const testCases = [
        ['कृ', 'इक्त्वा'],
        ['गम्', 'क्त्वा', { hasSetAugment: true }],
        ['स्था', 'itvā']
      ];
      
      testCases.forEach(([root, affix, context]) => {
        const result = sutra1218(root, affix, context);
        
        if (result.applies) {
          expect(result.kit).toBe(false);
          expect(result.preventsKit).toBe(true);
          expect(result.exceptionRule).toBe(true);
        }
      });
    });

    test('should indicate prevention reason clearly', () => {
      const result = sutra1218('कृ', 'इक्त्वा');
      
      expect(result.reason).toContain('prevented');
      expect(result.reason).toContain('क्त्वा');
      expect(result.reason).toContain('सेट्');
    });
  });
});
