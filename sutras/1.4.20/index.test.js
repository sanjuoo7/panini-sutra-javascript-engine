/**
 * Tests for Sutra 1.4.20: अयस्मयादीनि च्छन्दसि (ayasmayādīni cchandasi)
 */

import { sutra1420, applySutra } from './index.js';

describe('Sutra 1.4.20: अयस्मयादीनि च्छन्दसि (ayasmayādīni cchandasi)', () => {
  
  describe('अयस्मयादि words in छन्दस्', () => {
    test('assigns भम् saṃjñā to अयस्मय in Vedic context', () => {
      const result = sutra1420('अयस्मय', { isChandas: true });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('भम्');
      expect(result.sanjna).toBe('bham');
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('assigns भम् saṃjñā to हिरण्मय in poetic context', () => {
      const result = sutra1420('हिरण्मय', { register: 'vedic' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('भम्');
    });

    test('assigns भम् saṃjñā to काष्ठमय in mantra context', () => {
      const result = sutra1420('काष्ठमय', { register: 'mantra' });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('भम्');
    });
  });

  describe('IAST script support', () => {
    test('works with IAST अयस्मयादि words', () => {
      const result = sutra1420('ayasmaya', { isChandas: true });
      expect(result.applies).toBe(true);
      expect(result.saṃjñā).toBe('भम्');
      expect(result.script).toBe('IAST');
    });
  });

  describe('Context requirements', () => {
    test('does not apply in classical context', () => {
      const result = sutra1420('अयस्मय', { isChandas: false });
      expect(result.applies).toBe(false);
      expect(result.saṃjñā).toBeNull();
    });

    test('applies with various Vedic register markers', () => {
      const registers = ['vedic', 'chandas', 'poetic', 'mantra', 'samhita'];
      
      registers.forEach(register => {
        const result = sutra1420('अयस्मय', { register });
        expect(result.applies).toBe(true);
        expect(result.saṃjñā).toBe('भम्');
      });
    });
  });

  describe('Negative cases', () => {
    test('does not apply to non-अयस्मयादि words', () => {
      const result = sutra1420('राम', { isChandas: true });
      expect(result.applies).toBe(false);
      expect(result.saṃjñā).toBeNull();
    });

    test('does not apply to regular मय words not in the list', () => {
      const result = sutra1420('जलमय', { isChandas: true });
      expect(result.applies).toBe(false);
      expect(result.saṃjñā).toBeNull();
    });
  });

  describe('Error handling', () => {
    test('rejects invalid word input', () => {
      const result = sutra1420('', { isChandas: true });
      expect(result.applies).toBe(false);
    });

    test('handles undefined context', () => {
      const result = sutra1420('अयस्मय', undefined);
      expect(result.applies).toBe(false);
    });
  });

  describe('Backward compatibility', () => {
    test('applySutra function works correctly', () => {
      const result = applySutra('अयस्मय', { isChandas: true });
      expect(result.applies).toBe(true);
      expect(result.sanjna).toBe('bham');
      expect(result.meta).toBe(true);
    });
  });
});
