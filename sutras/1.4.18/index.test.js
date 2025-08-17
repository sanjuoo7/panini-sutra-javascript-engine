/**
 * Tests for Sutra 1.4.18: यचि भम् (yaci bham)
 */

import { sutra1418, applySutra } from './index.js';

describe('Sutra 1.4.18: यचि भम् (yaci bham)', () => {
  
  describe('Basic functionality', () => {
    test('assigns भम् saṃjñā before य-initial affixes', () => {
      const result = sutra1418('राम', { affix: 'य' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('भम्');
      expect(result.sanjna).toBe('bham');
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('assigns भम् saṃjñā before यम् affix', () => {
      const result = sutra1418('देव', { affix: 'यम्' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('भम्');
    });

    test('assigns भम् saṃjñā before य-series affix युष्मद्', () => {
      const result = sutra1418('गुरु', { affix: 'यक्' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('भम्');
    });
  });

  describe('IAST script support', () => {
    test('works with IAST stems and affixes', () => {
      const result = sutra1418('rāma', { affix: 'ya' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('भम्');
      expect(result.script).toBe('IAST');
    });

    test('recognizes IAST य-initials correctly', () => {
      const result = sutra1418('guru', { affix: 'yam' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('भम्');
    });
  });

  describe('Vowel-initial affixes with सु-series condition', () => {
    test('assigns भम् before अ-initial सु-series affix', () => {
      const result = sutra1418('राम', { affix: 'अम्', isSuSeries: true });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('भम्');
    });

    test('does not apply to vowel-initial non-सु-series affixes', () => {
      const result = sutra1418('राम', { affix: 'अ', isSuSeries: false });
      expect(result.applies).toBe(false);
      expect(result.saṃjñā).toBeNull();
    });

    test('does not apply to vowel-initial when सु-series not specified', () => {
      const result = sutra1418('राम', { affix: 'इ' });
      expect(result.applies).toBe(false);
      expect(result.saṃjñā).toBeNull();
    });
  });

  describe('Negative cases', () => {
    test('does not apply to non-य-initial consonant affixes', () => {
      const result = sutra1418('राम', { affix: 'त' });
      expect(result.applies).toBe(false);
      expect(result.saṃjñā).toBeNull();
    });

    test('does not apply to क-initial affixes', () => {
      const result = sutra1418('राम', { affix: 'क' });
      expect(result.applies).toBe(false);
      expect(result.saṃjñā).toBeNull();
    });
  });

  describe('Error handling', () => {
    test('rejects invalid stem input', () => {
      const result = sutra1418('', { affix: 'य' });
      expect(result.applies).toBe(false);
    });

    test('rejects missing affix', () => {
      const result = sutra1418('राम', {});
      expect(result.applies).toBe(false);
    });

    test('handles undefined context', () => {
      const result = sutra1418('राम', undefined);
      expect(result.applies).toBe(false);
    });
  });

  describe('Context and metadata', () => {
    test('includes correct metadata', () => {
      const result = sutra1418('राम', { affix: 'य' });
      expect(result.rule).toBe('1.4.18');
      expect(result.meta).toBe(true);
      expect(result.isMeta).toBe(true);
    });
  });

  describe('Backward compatibility', () => {
    test('applySutra function works correctly', () => {
      const result = applySutra('राम', { affix: 'य' });
      expect(result.applies).toBe(true);
      expect(result.sanjna).toBe('bham');
      expect(result.meta).toBe(true);
    });
  });

  describe('Complex cases', () => {
    test('applies to य-initial regardless of सु-series context', () => {
      const result = sutra1418('राम', { affix: 'य', isSuSeries: false });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('भम्');
    });

    test('handles mixed script inputs', () => {
      const result = sutra1418('rāma', { affix: 'यम्' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('भम्');
    });
  });
});
