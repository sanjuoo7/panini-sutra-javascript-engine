/**
 * Tests for Sutra 1.4.17: स्वादिष्वसर्वनामस्थाने (svādiṣvasarvanāmasthāne)
 */

import { sutra1417, applySutra } from './index.js';

describe('Sutra 1.4.17: स्वादिष्वसर्वनामस्थाने (svādiṣvasarvanāmasthāne)', () => {
  
  describe('Basic functionality', () => {
    test('assigns पद saṃjñā to stem before सु-series affix (not सर्वनामस्थान)', () => {
      const result = sutra1417('राम', { affix: 'सु', isSarvanamasthaana: false });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('पद');
      expect(result.sanjna).toBe('pada');
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('assigns पद saṃjñā to stem before औ affix', () => {
      const result = sutra1417('देव', { affix: 'औ' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('पद');
    });

    test('assigns पद saṃjñā to stem before भिस् affix', () => {
      const result = sutra1417('गुरु', { affix: 'भिस्' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('पद');
    });
  });

  describe('IAST script support', () => {
    test('works with IAST stems and affixes', () => {
      const result = sutra1417('rāma', { affix: 'su', isSarvanamasthaana: false });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('पद');
      expect(result.script).toBe('IAST');
    });

    test('recognizes IAST भिस् as bhis', () => {
      const result = sutra1417('guru', { affix: 'bhis' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('पद');
    });
  });

  describe('सर्वनामस्थान exclusion', () => {
    test('does not apply when affix is सर्वनामस्थान', () => {
      const result = sutra1417('सर्व', { affix: 'स्य', isSarvanamasthaana: true });
      expect(result.applies).toBe(false);
      expect(result.saṃjñā).toBeNull();
    });

    test('correctly identifies non-सर्वनामस्थान affixes', () => {
      const result = sutra1417('राम', { affix: 'सु' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('पद');
    });
  });

  describe('Negative cases', () => {
    test('does not apply to non-सु-series affixes', () => {
      const result = sutra1417('राम', { affix: 'य' });
      expect(result.applies).toBe(false);
      expect(result.saṃjñā).toBeNull();
    });
  });

  describe('Error handling', () => {
    test('rejects invalid stem input', () => {
      const result = sutra1417('', { affix: 'सु' });
      expect(result.applies).toBe(false);
    });

    test('rejects missing affix', () => {
      const result = sutra1417('राम', {});
      expect(result.applies).toBe(false);
    });

    test('handles undefined context', () => {
      const result = sutra1417('राम', undefined);
      expect(result.applies).toBe(false);
    });
  });

  describe('Context and metadata', () => {
    test('includes correct metadata', () => {
      const result = sutra1417('राम', { affix: 'सु' });
      expect(result.rule).toBe('1.4.17');
      expect(result.meta).toBe(true);
      expect(result.isMeta).toBe(true);
    });
  });

  describe('Backward compatibility', () => {
    test('applySutra function works correctly', () => {
      const result = applySutra('राम', { affix: 'सु' });
      expect(result.applies).toBe(true);
      expect(result.sanjna).toBe('pada');
      expect(result.meta).toBe(true);
    });
  });
});
