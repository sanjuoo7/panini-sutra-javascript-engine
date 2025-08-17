/**
 * Tests for Sutra 1.4.19: तसौ मत्वर्थे (tasau matvarthe)
 */

import { sutra1419, applySutra } from './index.js';

describe('Sutra 1.4.19: तसौ मत्वर्थे (tasau matvarthe)', () => {
  
  describe('त्-ending words', () => {
    test('assigns भम् saṃjñā to त्-ending word with मत् affix', () => {
      const result = sutra1419('धनवत्', { affix: 'मत्' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('भम्');
      expect(result.sanjna).toBe('bham');
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('assigns भम् saṃjñā to त्-ending word with वत् affix', () => {
      const result = sutra1419('बुद्धिमत्', { affix: 'वत्' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('भम्');
    });
  });

  describe('स्-ending words', () => {
    test('assigns भम् saṃjñā to स्-ending word with मत् affix', () => {
      const result = sutra1419('यशस्', { affix: 'मत्' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('भम्');
    });

    test('assigns भम् saṃjñā to स्-ending word with वान् affix', () => {
      const result = sutra1419('तेजस्', { affix: 'वान्' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('भम्');
    });
  });

  describe('IAST script support', () => {
    test('works with IAST त्-ending words', () => {
      const result = sutra1419('dhanavat', { affix: 'mat' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('भम्');
      expect(result.script).toBe('IAST');
    });

    test('works with IAST स्-ending words', () => {
      const result = sutra1419('yaśas', { affix: 'vat' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('भम्');
    });
  });

  describe('मत्व meaning context', () => {
    test('applies with explicit possessive meaning', () => {
      const result = sutra1419('धनवत्', { 
        affix: 'मत्',
        meaning: 'possessive'
      });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('भम्');
    });

    test('applies with मत्व meaning context', () => {
      const result = sutra1419('बुद्धिमत्', { 
        affix: 'वत्',
        meaning: 'मत्व'
      });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('भम्');
    });
  });

  describe('Negative cases', () => {
    test('does not apply to words not ending in त्/स्', () => {
      const result = sutra1419('राम', { affix: 'मत्' });
      expect(result.applies).toBe(false);
      expect(result.saṃjñā).toBeNull();
    });

    test('does not apply with non-मत्व affixes', () => {
      const result = sutra1419('धनवत्', { affix: 'सु' });
      expect(result.applies).toBe(false);
      expect(result.saṃjñā).toBeNull();
    });

    test('does not apply to vowel-ending words', () => {
      const result = sutra1419('धन', { affix: 'मत्' });
      expect(result.applies).toBe(false);
      expect(result.saṃjñā).toBeNull();
    });
  });

  describe('Error handling', () => {
    test('rejects invalid word input', () => {
      const result = sutra1419('', { affix: 'मत्' });
      expect(result.applies).toBe(false);
    });

    test('rejects missing affix', () => {
      const result = sutra1419('धनवत्', {});
      expect(result.applies).toBe(false);
    });

    test('handles undefined context', () => {
      const result = sutra1419('धनवत्', undefined);
      expect(result.applies).toBe(false);
    });
  });

  describe('Context and metadata', () => {
    test('includes correct metadata', () => {
      const result = sutra1419('धनवत्', { affix: 'मत्' });
      expect(result.rule).toBe('1.4.19');
      expect(result.meta).toBe(true);
      expect(result.isMeta).toBe(true);
    });
  });

  describe('Backward compatibility', () => {
    test('applySutra function works correctly', () => {
      const result = applySutra('धनवत्', { affix: 'मत्' });
      expect(result.applies).toBe(true);
      expect(result.sanjna).toBe('bham');
      expect(result.meta).toBe(true);
    });
  });
});
