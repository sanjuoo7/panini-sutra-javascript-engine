/**
 * Tests for Sutra 1.4.19: तसौ मत्वर्थे (tasau matvarthe)
 */

import { sutra1419, applySutra } from './index.js';

describe('Sutra 1.4.19: तसौ मत्वर्थे (tasau matvarthe)', () => {
  
  describe('Basic functionality', () => {
    test('assigns भम् saṃjñā to त्-ending word with मत्व meaning', () => {
      const result = sutra1419('जगत्', { meaning: 'मत्व', affix: 'औ' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('भम्');
      expect(result.sanjna).toBe('bham');
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('assigns भम् saṃjñā to स्-ending word with मत्व meaning', () => {
      const result = sutra1419('मनस्', { meaning: 'मत्व', affix: 'औ' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('भम्');
    });

    test('applies to त्-ending with तसि affix and मत्व meaning', () => {
      const result = sutra1419('भगवत्', { meaning: 'मत्व', affix: 'सि' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('भम्');
    });
  });

  describe('IAST script support', () => {
    test('works with IAST stems and affixes', () => {
      const result = sutra1419('jagat', { meaning: 'matva', affix: 'au' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('भम्');
      expect(result.script).toBe('IAST');
    });

    test('recognizes IAST स्-ending as s-ending', () => {
      const result = sutra1419('manas', { meaning: 'matva', affix: 'au' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('भम्');
    });
  });

  describe('मत्व meaning requirement', () => {
    test('does not apply without मत्व meaning', () => {
      const result = sutra1419('जगत्', { affix: 'औ' });
      expect(result.applies).toBe(false);
      expect(result.saṃjñā).toBeNull();
    });

    test('does not apply with different meaning', () => {
      const result = sutra1419('जगत्', { meaning: 'कर्तृ', affix: 'औ' });
      expect(result.applies).toBe(false);
      expect(result.saṃjñā).toBeNull();
    });
  });

  describe('Negative cases', () => {
    test('does not apply to non-त्/स्-ending words', () => {
      const result = sutra1419('राम', { meaning: 'मत्व', affix: 'औ' });
      expect(result.applies).toBe(false);
      expect(result.saṃjñā).toBeNull();
    });
  });

  describe('Error handling', () => {
    test('rejects invalid stem input', () => {
      const result = sutra1419('', { meaning: 'मत्व', affix: 'औ' });
      expect(result.applies).toBe(false);
    });

    test('handles undefined context', () => {
      const result = sutra1419('जगत्', undefined);
      expect(result.applies).toBe(false);
    });
  });

  describe('Context and metadata', () => {
    test('includes correct metadata', () => {
      const result = sutra1419('जगत्', { meaning: 'मत्व', affix: 'औ' });
      expect(result.rule).toBe('1.4.19');
      expect(result.meta).toBe(true);
      expect(result.isMeta).toBe(true);
    });
  });
});
