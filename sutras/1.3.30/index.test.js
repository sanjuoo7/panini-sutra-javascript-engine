/**
 * Test Suite for Sutra 1.3.30: निसमुपविभ्यो ह्वः
 * Tests the Ātmanepada designation for ह्वे root with specific prefixes
 */

import { determineNisamupavibhyaHvaAtmanepada } from './index.js';

describe('Sutra 1.3.30: निसमुपविभ्यो ह्वः (nisamupavibhyaḥ hvah)', () => {
  
  describe('ह्वे root with valid prefixes', () => {
    test('should detect नि + ह्वे combination', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('निह्वे');
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('नि');
    });

    test('should detect सम् + ह्वे combination', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('संह्वे');
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('सम्');
    });

    test('should detect उप + ह्वे combination', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('उपह्वे');
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('उप');
    });

    test('should detect वि + ह्वे combination', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('विह्वे');
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('वि');
    });

    test('should detect निर् + ह्वे combination', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('निर्ह्वे');
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('नि');
    });
  });

  describe('IAST script support', () => {
    test('should detect ni + hve (IAST)', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('nihve');
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('ni');
    });

    test('should detect sam + hve (IAST)', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('samhve');
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('sam');
    });

    test('should detect upa + hve (IAST)', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('upahve');
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('upa');
    });

    test('should detect vi + hve (IAST)', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('vihve');
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('vi');
    });
  });

  describe('Context-based analysis', () => {
    test('should handle explicit root context', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('someform', {
        root: 'ह्वे',
        prefix: 'नि'
      });
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('नि');
    });

    test('should handle IAST root context', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('someform', {
        root: 'hve',
        prefix: 'vi'
      });
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('vi');
    });

    test('should handle cross-script contexts', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('upahve', {
        root: 'ह्वे'
      });
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('upa');
    });
  });

  describe('Compound word analysis', () => {
    test('should detect निह्वायक (caller with ni prefix)', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('निह्वायक');
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('नि');
    });

    test('should detect समाह्वान (calling with sam prefix)', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('समाह्वान');
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('सम्');
    });

    test('should detect उपाह्वयति (inviting)', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('उपाह्वयति');
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('उप');
    });
  });

  describe('Negative cases - should not apply', () => {
    test('should not detect ह्वे without valid prefix', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('ह्वे');
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.5);
    });

    test('should not detect other prefixes with ह्वे', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('प्रह्वे');
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.5);
    });

    test('should not detect valid prefixes without ह्वे root', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('निगम्');
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.5);
    });

    test('should not apply to other roots with same prefixes', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('निकृ');
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.5);
    });

    test('should not apply without both prefix and root', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('अन्यशब्द');
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.5);
    });
  });

  describe('Error handling', () => {
    test('should handle null input', () => {
      const result = determineNisamupavibhyaHvaAtmanepada(null);
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle undefined input', () => {
      const result = determineNisamupavibhyaHvaAtmanepada(undefined);
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle empty string', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('');
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle whitespace-only string', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('   ');
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle non-string input', () => {
      const result = determineNisamupavibhyaHvaAtmanepada(123);
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle invalid Sanskrit words', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('xyz123');
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.5);
    });
  });

  describe('Edge cases', () => {
    test('should handle mixed case input', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('NiHve');
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should handle extra whitespace', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('  निह्वे  ');
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should handle variant prefix forms', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('निस्ह्वे');
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('नि');
    });

    test('should handle complex compound words', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('महानिह्वायकः');
      expect(result.isNisamupavibhyaHvaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should prioritize explicit context over word analysis', () => {
      const resultExplicit = determineNisamupavibhyaHvaAtmanepada('संह्वे', {
        root: 'ह्वे',
        prefix: 'सम्'
      });
      const resultImplicit = determineNisamupavibhyaHvaAtmanepada('संह्वे');
      
      expect(resultExplicit.confidence).toBeGreaterThan(resultImplicit.confidence);
    });
  });

  describe('Prefix validation', () => {
    test('should distinguish between valid and invalid prefixes', () => {
      const validPrefixes = ['नि', 'सम्', 'उप', 'वि'];
      const invalidPrefixes = ['प्र', 'अनु', 'परि', 'अभि'];
      
      validPrefixes.forEach(prefix => {
        const result = determineNisamupavibhyaHvaAtmanepada('word', {
          root: 'ह्वे',
          prefix: prefix
        });
        expect(result.isNisamupavibhyaHvaAtmanepada).toBe(true);
      });
      
      invalidPrefixes.forEach(prefix => {
        const result = determineNisamupavibhyaHvaAtmanepada('word', {
          root: 'ह्वे', 
          prefix: prefix
        });
        expect(result.isNisamupavibhyaHvaAtmanepada).toBe(false);
      });
    });
  });

  describe('Sutra metadata', () => {
    test('should include correct sutra reference', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('निह्वे');
      expect(result.sutraApplied).toBe('1.3.30');
    });

    test('should include sutra reference even for negative cases', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('गम्');
      expect(result.sutraApplied).toBe('1.3.30');
    });

    test('should include root information for valid cases', () => {
      const result = determineNisamupavibhyaHvaAtmanepada('विह्वे');
      expect(result.root).toBe('ह्वे');
      expect(result.prefix).toBe('वि');
    });

    test('should distinguish between the four required prefixes', () => {
      const prefixes = ['नि', 'सम्', 'उप', 'वि'];
      
      prefixes.forEach(expectedPrefix => {
        const result = determineNisamupavibhyaHvaAtmanepada('test', {
          root: 'ह्वे',
          prefix: expectedPrefix
        });
        expect(result.prefix).toBe(expectedPrefix);
      });
    });
  });
});
