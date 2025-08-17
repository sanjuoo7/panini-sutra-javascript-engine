/**
 * Tests for Sutra 1.4.15: नः क्ये (naḥ kye)
 * "The word-form ending in न्, is called पद when क्य follows."
 */

import { sutra1415, applySutra } from './index.js';

describe('Sutra 1.4.15: नः क्ये (naḥ kye)', () => {
  
  describe('Basic functionality', () => {
    test('assigns पद saṃjñā to न्-ending word with क्यच् affix', () => {
      const result = sutra1415('गमन्', { affix: 'क्यच्' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('पद');
      expect(result.sanjna).toBe('pada');
      expect(result.confidence).toBeGreaterThan(0.9);
    });

    test('assigns पद saṃjñā to न्-ending word with क्यङ् affix', () => {
      const result = sutra1415('यान्', { affix: 'क्यङ्' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('पद');
      expect(result.reason).toContain('assigned पद saṃjñā');
    });

    test('assigns पद saṃjñā to न्-ending word with क्यष् affix', () => {
      const result = sutra1415('धन्', { affix: 'क्यष्' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('पद');
    });
  });

  describe('IAST script support', () => {
    test('works with IAST न्-ending words', () => {
      const result = sutra1415('gaman', { affix: 'kyac' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('पद');
      expect(result.script).toBe('IAST');
    });

    test('works with IAST क्य affixes', () => {
      const result = sutra1415('yān', { affix: 'kyaṅ' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('पद');
    });
  });

  describe('Negative cases', () => {
    test('does not apply to words not ending in न्', () => {
      const result = sutra1415('गम्', { affix: 'क्यच्' });
      expect(result.applies).toBe(false);
      expect(result.saṃjñā).toBeNull();
      expect(result.reason).toContain('does not end in न्');
    });

    test('does not apply with non-क्य affixes', () => {
      const result = sutra1415('गमन्', { affix: 'तु' });
      expect(result.applies).toBe(false);
      expect(result.saṃjñā).toBeNull();
      expect(result.reason).toContain('is not क्य-class');
    });

    test('does not apply to vowel-ending words', () => {
      const result = sutra1415('गम', { affix: 'क्यच्' });
      expect(result.applies).toBe(false);
      expect(result.saṃjñā).toBeNull();
    });
  });

  describe('Edge cases', () => {
    test('handles words ending in न with vowel', () => {
      const result = sutra1415('गमन', { affix: 'क्यच्' });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('does not end in न्');
    });

    test('handles compound न्-ending words', () => {
      const result = sutra1415('राजपुत्रगमन्', { affix: 'क्यच्' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('पद');
    });
  });

  describe('Error handling', () => {
    test('rejects invalid word input', () => {
      const result = sutra1415('', { affix: 'क्यच्' });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });

    test('rejects missing affix', () => {
      const result = sutra1415('गमन्', {});
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('context.affix must be specified');
    });

    test('rejects null inputs', () => {
      const result = sutra1415(null, { affix: 'क्यच्' });
      expect(result.applies).toBe(false);
      expect(result.confidence).toBe(0);
    });
  });

  describe('Context and metadata', () => {
    test('includes correct metadata', () => {
      const result = sutra1415('गमन्', { affix: 'क्यच्' });
      expect(result.rule).toBe('1.4.15');
      expect(result.meta).toBe(true);
      expect(result.isMeta).toBe(true);
      expect(result.endsInNa).toBe(true);
      expect(result.isKyaAffix).toBe(true);
    });

    test('handles script override', () => {
      const result = sutra1415('गमन्', { 
        affix: 'क्यच्', 
        script: 'Devanagari' 
      });
      expect(result.script).toBe('Devanagari');
    });
  });

  describe('Backward compatibility', () => {
    test('applySutra function works correctly', () => {
      const result = applySutra('गमन्', { affix: 'क्यच्' });
      expect(result.applies).toBe(true);
      expect(result.sanjna).toBe('pada');
      expect(result.meta).toBe(true);
    });

    test('maintains legacy property names', () => {
      const result = applySutra('गमन्', { affix: 'क्यच्' });
      expect(result.sanjna).toBeDefined();
      expect(result.meta).toBeDefined();
    });
  });

  describe('Multi-script integration', () => {
    test('handles mixed script contexts', () => {
      const result1 = sutra1415('गमन्', { affix: 'kyac' });
      const result2 = sutra1415('gaman', { affix: 'क्यच्' });
      
      expect(result1.applies).toBe(true);
      expect(result2.applies).toBe(true);
    });
  });
});
