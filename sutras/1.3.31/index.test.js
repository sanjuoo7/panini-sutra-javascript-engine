/**
 * Test Suite for Sutra 1.3.31: स्पर्द्धायामाङः
 * Tests the Ātmanepada designation for ह्वे root with आङ् prefix in challenging context
 */

import { determineSpardhayamAngaAtmanepada } from './index.js';

describe('Sutra 1.3.31: स्पर्द्धायामाङः (spardhāyām āṅgaḥ)', () => {
  
  describe('ह्वे root with आङ् prefix in challenging context', () => {
    test('should detect आह्वे with explicit challenge context', () => {
      const result = determineSpardhayamAngaAtmanepada('आह्वे', {
        challenge: true
      });
      expect(result.isSpardhayamAngaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.challengingContext).toBe('challenge');
    });

    test('should detect आह्वे with competition context', () => {
      const result = determineSpardhayamAngaAtmanepada('आह्वे', {
        competition: true
      });
      expect(result.isSpardhayamAngaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.challengingContext).toBe('competition');
    });

    test('should detect with challenging meaning', () => {
      const result = determineSpardhayamAngaAtmanepada('आह्वयति', {
        meaning: 'to challenge in competition'
      });
      expect(result.isSpardhayamAngaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.challengingContext).toBe('challenge');
    });

    test('should detect स्पर्धा meaning', () => {
      const result = determineSpardhayamAngaAtmanepada('आह्वे', {
        meaning: 'स्पर्धा'
      });
      expect(result.isSpardhayamAngaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.challengingContext).toBe('challenge');
    });
  });

  describe('IAST script support', () => {
    test('should detect āhve with challenge (IAST)', () => {
      const result = determineSpardhayamAngaAtmanepada('āhve', {
        challenge: true
      });
      expect(result.isSpardhayamAngaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('आङ्');
    });

    test('should detect āhvayati with competition (IAST)', () => {
      const result = determineSpardhayamAngaAtmanepada('āhvayati', {
        competition: true
      });
      expect(result.isSpardhayamAngaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.challengingContext).toBe('competition');
    });

    test('should detect with spardhā meaning (IAST)', () => {
      const result = determineSpardhayamAngaAtmanepada('āhve', {
        meaning: 'spardhā'
      });
      expect(result.isSpardhayamAngaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });
  });

  describe('Context-based analysis', () => {
    test('should handle explicit root and prefix context', () => {
      const result = determineSpardhayamAngaAtmanepada('someform', {
        root: 'ह्वे',
        prefix: 'आङ्',
        challenge: true
      });
      expect(result.isSpardhayamAngaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('आङ्');
    });

    test('should handle IAST root context', () => {
      const result = determineSpardhayamAngaAtmanepada('someform', {
        root: 'hve',
        prefix: 'āṅ',
        competition: true
      });
      expect(result.isSpardhayamAngaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.challengingContext).toBe('competition');
    });

    test('should handle cross-script contexts', () => {
      const result = determineSpardhayamAngaAtmanepada('āhve', {
        root: 'ह्वे',
        challenge: true
      });
      expect(result.isSpardhayamAngaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('Semantic context patterns', () => {
    test('should detect compound with स्पर्धा', () => {
      const result = determineSpardhayamAngaAtmanepada('स्पर्धाह्वे');
      expect(result.isSpardhayamAngaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.challengingContext).toBe('challenge');
    });

    test('should detect प्रतिस्पर्धा pattern', () => {
      const result = determineSpardhayamAngaAtmanepada('प्रतिस्पर्धाह्वयति');
      expect(result.isSpardhayamAngaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should detect rivalry meaning patterns', () => {
      const result = determineSpardhayamAngaAtmanepada('आह्वे', {
        meaning: 'rivalry and contest'
      });
      expect(result.isSpardhayamAngaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should detect युद्ध (battle) context', () => {
      const result = determineSpardhayamAngaAtmanepada('युद्धाह्वयति');
      expect(result.isSpardhayamAngaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });
  });

  describe('Negative cases - should not apply', () => {
    test('should not apply without challenging context', () => {
      const result = determineSpardhayamAngaAtmanepada('आह्वे');
      expect(result.isSpardhayamAngaAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.5);
    });

    test('should not apply without आङ् prefix', () => {
      const result = determineSpardhayamAngaAtmanepada('ह्वे', {
        challenge: true
      });
      expect(result.isSpardhayamAngaAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.5);
    });

    test('should not apply without ह्वे root', () => {
      const result = determineSpardhayamAngaAtmanepada('आगम्', {
        challenge: true
      });
      expect(result.isSpardhayamAngaAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.5);
    });

    test('should not apply to other roots with आङ् prefix', () => {
      const result = determineSpardhayamAngaAtmanepada('आकृ', {
        challenge: true
      });
      expect(result.isSpardhayamAngaAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.5);
    });

    test('should not apply with non-challenging meanings', () => {
      const result = determineSpardhayamAngaAtmanepada('आह्वे', {
        meaning: 'to call gently'
      });
      expect(result.isSpardhayamAngaAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.5);
    });

    test('should require all three conditions', () => {
      // Only root + prefix, no challenge
      const result1 = determineSpardhayamAngaAtmanepada('आह्वे');
      expect(result1.isSpardhayamAngaAtmanepada).toBe(false);
      
      // Only root + challenge, no आङ् prefix  
      const result2 = determineSpardhayamAngaAtmanepada('ह्वे', {
        challenge: true
      });
      expect(result2.isSpardhayamAngaAtmanepada).toBe(false);
      
      // Only prefix + challenge, no ह्वे root
      const result3 = determineSpardhayamAngaAtmanepada('आगम्', {
        challenge: true
      });
      expect(result3.isSpardhayamAngaAtmanepada).toBe(false);
    });
  });

  describe('Error handling', () => {
    test('should handle null input', () => {
      const result = determineSpardhayamAngaAtmanepada(null);
      expect(result.isSpardhayamAngaAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle undefined input', () => {
      const result = determineSpardhayamAngaAtmanepada(undefined);
      expect(result.isSpardhayamAngaAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle empty string', () => {
      const result = determineSpardhayamAngaAtmanepada('');
      expect(result.isSpardhayamAngaAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle whitespace-only string', () => {
      const result = determineSpardhayamAngaAtmanepada('   ');
      expect(result.isSpardhayamAngaAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle non-string input', () => {
      const result = determineSpardhayamAngaAtmanepada(123);
      expect(result.isSpardhayamAngaAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });
  });

  describe('Edge cases', () => {
    test('should handle mixed case input', () => {
      const result = determineSpardhayamAngaAtmanepada('ĀHve', {
        challenge: true
      });
      expect(result.isSpardhayamAngaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should handle extra whitespace', () => {
      const result = determineSpardhayamAngaAtmanepada('  आह्वे  ', {
        competition: true
      });
      expect(result.isSpardhayamAngaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should handle variant आङ् forms', () => {
      const result = determineSpardhayamAngaAtmanepada('आहूयति', {
        challenge: true
      });
      expect(result.isSpardhayamAngaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should prioritize explicit context over implicit patterns', () => {
      const resultExplicit = determineSpardhayamAngaAtmanepada('आह्वे', {
        root: 'ह्वे',
        prefix: 'आङ्',
        challenge: true
      });
      const resultImplicit = determineSpardhayamAngaAtmanepada('स्पर्धाह्वे');
      
      expect(resultExplicit.confidence).toBeGreaterThan(resultImplicit.confidence);
    });
  });

  describe('Semantic specificity', () => {
    test('should distinguish challenge from general calling', () => {
      const challengeResult = determineSpardhayamAngaAtmanepada('आह्वे', {
        meaning: 'to challenge'
      });
      const generalResult = determineSpardhayamAngaAtmanepada('आह्वे', {
        meaning: 'to call'
      });
      
      expect(challengeResult.isSpardhayamAngaAtmanepada).toBe(true);
      expect(generalResult.isSpardhayamAngaAtmanepada).toBe(false);
    });

    test('should handle various challenging terms', () => {
      const challengeTerms = ['challenge', 'compete', 'rivalry', 'contest', 'duel'];
      
      challengeTerms.forEach(term => {
        const result = determineSpardhayamAngaAtmanepada('आह्वे', {
          meaning: term
        });
        expect(result.isSpardhayamAngaAtmanepada).toBe(true);
      });
    });
  });

  describe('Sutra metadata', () => {
    test('should include correct sutra reference', () => {
      const result = determineSpardhayamAngaAtmanepada('आह्वे', {
        challenge: true
      });
      expect(result.sutraApplied).toBe('1.3.31');
    });

    test('should include sutra reference even for negative cases', () => {
      const result = determineSpardhayamAngaAtmanepada('गम्');
      expect(result.sutraApplied).toBe('1.3.31');
    });

    test('should include all relevant metadata for valid cases', () => {
      const result = determineSpardhayamAngaAtmanepada('आह्वे', {
        challenge: true
      });
      expect(result.root).toBe('ह्वे');
      expect(result.prefix).toBe('आङ्');
      expect(result.challengingContext).toBe('challenge');
    });

    test('should distinguish between challenge and competition contexts', () => {
      const challengeResult = determineSpardhayamAngaAtmanepada('आह्वे', {
        challenge: true
      });
      const competitionResult = determineSpardhayamAngaAtmanepada('आह्वे', {
        competition: true
      });
      
      expect(challengeResult.challengingContext).toBe('challenge');
      expect(competitionResult.challengingContext).toBe('competition');
    });
  });
});
