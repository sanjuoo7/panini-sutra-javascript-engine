/**
 * Tests for Sutra 1.4.16: सिति च (siti ca)
 * "When an affix having an indicatory स् follows then that which precedes it is called पद।"
 */

import { sutra1416, applySutra } from './index.js';

describe('Sutra 1.4.16: सिति च (siti ca)', () => {
  
  describe('Basic functionality', () => {
    test('assigns पद saṃjñā to stem before स् affix', () => {
      const result = sutra1416('गम्', { affix: 'स्' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('पद');
      expect(result.sanjna).toBe('pada');
      expect(result.confidence).toBeGreaterThan(0.9);
    });

    test('assigns पद saṃjñā to stem before सि affix', () => {
      const result = sutra1416('पठ्', { affix: 'सि' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('पद');
      expect(result.reason).toContain('has indicatory स्');
    });

    test('assigns पद saṃjñā to stem before स्य affix', () => {
      const result = sutra1416('कृ', { affix: 'स्य' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('पद');
    });

    test('assigns पद saṃjñā to stem before सन् affix', () => {
      const result = sutra1416('गम्', { affix: 'सन्' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('पद');
    });
  });

  describe('IAST script support', () => {
    test('works with IAST stems and affixes', () => {
      const result = sutra1416('gam', { affix: 's' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('पद');
      expect(result.script).toBe('IAST');
    });

    test('works with IAST स्य affixes', () => {
      const result = sutra1416('kṛ', { affix: 'sya' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('पद');
    });

    test('recognizes IAST सन् as san', () => {
      const result = sutra1416('gam', { affix: 'san' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('पद');
    });
  });

  describe('Negative cases', () => {
    test('does not apply with non-sIT affixes', () => {
      const result = sutra1416('गम्', { affix: 'ति' });
      expect(result.applies).toBe(false);
      expect(result.saṃjñā).toBeNull();
      expect(result.reason).toContain('does not have indicatory स्');
    });

    test('does not apply with vowel-only affixes', () => {
      const result = sutra1416('गम्', { affix: 'अ' });
      expect(result.applies).toBe(false);
      expect(result.saṃjñā).toBeNull();
    });

    test('does not apply with ś/ṣ affixes (not स)', () => {
      const result = sutra1416('गम्', { affix: 'ṣa' });
      expect(result.applies).toBe(false);
      expect(result.saṃjñā).toBeNull();
    });
  });

  describe('Complex affixes', () => {
    test('recognizes स् in compound affixes', () => {
      const result = sutra1416('कृ', { affix: 'स्यत्' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('पद');
    });

    test('works with स्नु suffix', () => {
      const result = sutra1416('धाव्', { affix: 'स्नु' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('पद');
    });

    test('works with स्था suffix', () => {
      const result = sutra1416('अव', { affix: 'स्था' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('पद');
    });
  });

  describe('Edge cases', () => {
    test('handles vowel-ending stems', () => {
      const result = sutra1416('गम', { affix: 'स्' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('पद');
    });

    test('handles long stems', () => {
      const result = sutra1416('प्रतिगम्', { affix: 'स्य' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('पद');
    });

    test('case insensitive matching', () => {
      const result = sutra1416('गम्', { affix: 'स्य'.toUpperCase() });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('पद');
    });
  });

  describe('Error handling', () => {
    test('rejects invalid stem input', () => {
      const result = sutra1416('', { affix: 'स्' });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });

    test('rejects missing affix', () => {
      const result = sutra1416('गम्', {});
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('context.affix must be specified');
    });

    test('rejects null inputs', () => {
      const result = sutra1416(null, { affix: 'स्' });
      expect(result.applies).toBe(false);
      expect(result.confidence).toBe(0);
    });
  });

  describe('Context and metadata', () => {
    test('includes correct metadata', () => {
      const result = sutra1416('गम्', { affix: 'स्' });
      expect(result.rule).toBe('1.4.16');
      expect(result.meta).toBe(true);
      expect(result.isMeta).toBe(true);
      expect(result.hasSitMarker).toBe(true);
    });

    test('handles script override', () => {
      const result = sutra1416('गम्', { 
        affix: 'स्', 
        script: 'Devanagari' 
      });
      expect(result.script).toBe('Devanagari');
    });
  });

  describe('Backward compatibility', () => {
    test('applySutra function works correctly', () => {
      const result = applySutra('गम्', { affix: 'स्' });
      expect(result.applies).toBe(true);
      expect(result.sanjna).toBe('pada');
      expect(result.meta).toBe(true);
    });

    test('maintains legacy property names', () => {
      const result = applySutra('गम्', { affix: 'स्य' });
      expect(result.sanjna).toBeDefined();
      expect(result.meta).toBeDefined();
    });
  });

  describe('Multi-script integration', () => {
    test('handles mixed script contexts', () => {
      const result1 = sutra1416('गम्', { affix: 's' });
      const result2 = sutra1416('gam', { affix: 'स्' });
      
      expect(result1.applies).toBe(true);
      expect(result2.applies).toBe(true);
    });

    test('distinguishes स from ś and ṣ', () => {
      const result1 = sutra1416('gam', { affix: 's' });  // स्
      const result2 = sutra1416('gam', { affix: 'ś' });  // श्
      const result3 = sutra1416('gam', { affix: 'ṣ' });  // ष्
      
      expect(result1.applies).toBe(true);
      expect(result2.applies).toBe(false);
      expect(result3.applies).toBe(false);
    });
  });
});
