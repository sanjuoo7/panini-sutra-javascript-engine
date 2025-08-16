/**
 * Test Suite for Sutra 1.3.27: उद्विभ्यां तपः
 * Tests ātmanepada assignment for तप् with उद्/वि prefixes (intransitive)
 */

import { determineUdViTapAtmanepada, checkUdViTapCombination } from './index.js';

describe('Sutra 1.3.27: उद्विभ्यां तपः (udvibhyāṃ tapaḥ)', () => {

  describe('Valid उद् + तप् combinations (intransitive)', () => {
    test('should detect उत्तपते (uttapate) as ātmanepada', () => {
      const result = determineUdViTapAtmanepada('उत्तपते');
      expect(result.isUdViTapAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('उद्');
      expect(result.root).toBe('तप्');
    });

    test('should detect uttapate (IAST) as ātmanepada', () => {
      const result = determineUdViTapAtmanepada('uttapate');
      expect(result.isUdViTapAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('ud');
    });

    test('should detect उत्तापते (uttāpate) as ātmanepada', () => {
      const result = determineUdViTapAtmanepada('उत्तापते');
      expect(result.isUdViTapAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('उद्');
    });

    test('should detect उद्तप (udtap) context with explicit intransitive', () => {
      const result = determineUdViTapAtmanepada('उद्तपते', {
        transitivity: 'intransitive'
      });
      expect(result.isUdViTapAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('Valid वि + तप् combinations (intransitive)', () => {
    test('should detect वितपते (vitapate) as ātmanepada', () => {
      const result = determineUdViTapAtmanepada('वितपते');
      expect(result.isUdViTapAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('वि');
      expect(result.root).toBe('तप्');
    });

    test('should detect vitapate (IAST) as ātmanepada', () => {
      const result = determineUdViTapAtmanepada('vitapate');
      expect(result.isUdViTapAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('vi');
    });

    test('should detect वीतापते (vītāpate) as ātmanepada', () => {
      const result = determineUdViTapAtmanepada('वीतापते');
      expect(result.isUdViTapAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('वि');
    });

    test('should detect वीतप (vītap) context with intransitive', () => {
      const result = determineUdViTapAtmanepada('वीतपते', {
        isIntransitive: true
      });
      expect(result.isUdViTapAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('Context-based analysis', () => {
    test('should handle explicit root and prefix context (उद्)', () => {
      const result = determineUdViTapAtmanepada('someform', {
        root: 'तप्',
        prefix: 'उद्',
        transitivity: 'intransitive'
      });
      expect(result.isUdViTapAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
      expect(result.prefix).toBe('उद्');
    });

    test('should handle explicit root and prefix context (वि)', () => {
      const result = determineUdViTapAtmanepada('someform', {
        root: 'तप्',
        prefix: 'वि',
        isIntransitive: true
      });
      expect(result.isUdViTapAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
      expect(result.prefix).toBe('वि');
    });

    test('should handle IAST context', () => {
      const result = determineUdViTapAtmanepada('someform', {
        root: 'tap',
        prefix: 'ud',
        transitivity: 'intransitive'
      });
      expect(result.isUdViTapAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
    });

    test('should handle meaning context (intransitive)', () => {
      const result = determineUdViTapAtmanepada('उत्तपते', {
        meaning: 'to shine, to glow'
      });
      expect(result.isUdViTapAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('Intransitive requirement', () => {
    test('should require intransitive usage for उद् + तप्', () => {
      const result = determineUdViTapAtmanepada('someform', {
        root: 'तप्',
        prefix: 'उद्',
        transitivity: 'transitive'
      });
      expect(result.isUdViTapAtmanepada).toBe(false);
      expect(result.requiresIntransitive).toBe(true);
    });

    test('should require intransitive usage for वि + तप्', () => {
      const result = determineUdViTapAtmanepada('someform', {
        root: 'तप्',
        prefix: 'वि'
        // no transitivity specified - should fail
      });
      expect(result.isUdViTapAtmanepada).toBe(false);
      expect(result.requiresIntransitive).toBe(true);
    });

    test('should pass with explicit intransitive flag', () => {
      const result = determineUdViTapAtmanepada('वितपते', {
        root: 'तप्',
        prefix: 'वि',
        isIntransitive: true
      });
      expect(result.isUdViTapAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
    });

    test('should detect intransitive from ātmanepada endings', () => {
      const result = determineUdViTapAtmanepada('उत्तपन्ते');
      expect(result.isUdViTapAtmanepada).toBe(true);
      expect(result.transitivity).toBe('intransitive');
    });
  });

  describe('Meaning-based intransitive detection', () => {
    test('should detect shining meanings as intransitive', () => {
      const result = determineUdViTapAtmanepada('उत्तपते', {
        meaning: 'to shine brightly'
      });
      expect(result.isUdViTapAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should detect heating meanings as intransitive', () => {
      const result = determineUdViTapAtmanepada('वितपते', {
        meaning: 'to heat up, to become hot'
      });
      expect(result.isUdViTapAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should detect Sanskrit meanings', () => {
      const result = determineUdViTapAtmanepada('उत्तापते', {
        meaning: 'तप् - to be heated, ताप'
      });
      expect(result.isUdViTapAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('Negative cases - should not apply', () => {
    test('should not detect तप् without उद्/वि prefixes', () => {
      const result = determineUdViTapAtmanepada('तपते');
      expect(result.isUdViTapAtmanepada).toBe(false);
    });

    test('should not detect उद्/वि with other roots', () => {
      const result = determineUdViTapAtmanepada('उद्गच्छति');
      expect(result.isUdViTapAtmanepada).toBe(false);
    });

    test('should not detect other prefixes + तप्', () => {
      const result = determineUdViTapAtmanepada('प्रतपते');
      expect(result.isUdViTapAtmanepada).toBe(false);
    });

    test('should not detect सम् + तप्', () => {
      const result = determineUdViTapAtmanepada('संतपते');
      expect(result.isUdViTapAtmanepada).toBe(false);
    });

    test('should not detect simple तप् forms', () => {
      const result = determineUdViTapAtmanepada('तपः');
      expect(result.isUdViTapAtmanepada).toBe(false);
    });

    test('should not detect तप् with wrong context', () => {
      const result = determineUdViTapAtmanepada('तपति', {
        root: 'गम्',
        prefix: 'उद्'
      });
      expect(result.isUdViTapAtmanepada).toBe(false);
    });
  });

  describe('Error handling', () => {
    test('should handle null input', () => {
      const result = determineUdViTapAtmanepada(null);
      expect(result.isUdViTapAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle undefined input', () => {
      const result = determineUdViTapAtmanepada(undefined);
      expect(result.isUdViTapAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle empty string', () => {
      const result = determineUdViTapAtmanepada('');
      expect(result.isUdViTapAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle whitespace-only string', () => {
      const result = determineUdViTapAtmanepada('   ');
      expect(result.isUdViTapAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle non-string input', () => {
      const result = determineUdViTapAtmanepada(123);
      expect(result.isUdViTapAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle invalid Sanskrit words', () => {
      const result = determineUdViTapAtmanepada('xyz123');
      expect(result.isUdViTapAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid Sanskrit word');
    });
  });

  describe('Edge cases', () => {
    test('should handle mixed case input', () => {
      const result = determineUdViTapAtmanepada('UtTaPaTe');
      expect(result.isUdViTapAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should handle extra whitespace', () => {
      const result = determineUdViTapAtmanepada('  उत्तपते  ');
      expect(result.isUdViTapAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should handle variant तप् forms', () => {
      const result = determineUdViTapAtmanepada('उत्तप्य');
      expect(result.isUdViTapAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should handle compound words containing उद्/वि + तप्', () => {
      const result = determineUdViTapAtmanepada('सूर्योत्तपते');
      expect(result.isUdViTapAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should handle contextual ambiguity gracefully', () => {
      const result = determineUdViTapAtmanepada('वितपते', {
        meaning: 'unclear context'
      });
      expect(result.isUdViTapAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });
  });

  describe('Semantic analysis', () => {
    test('should detect heat/shine semantic context', () => {
      const result = determineUdViTapAtmanepada('उत्तपते');
      expect(result.isUdViTapAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should handle तप् root context', () => {
      const result = determineUdViTapAtmanepada('उत्तपनम्');
      expect(result.isUdViTapAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should handle heat-related context', () => {
      const result = determineUdViTapAtmanepada('वितपते', {
        meaning: 'blazing and heating'
      });
      expect(result.isUdViTapAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('Helper function tests', () => {
    test('checkUdViTapCombination should work correctly', () => {
      expect(checkUdViTapCombination('उत्तपते')).toBe(true);
      expect(checkUdViTapCombination('वितपते')).toBe(true);
      expect(checkUdViTapCombination('तपते')).toBe(false);
      expect(checkUdViTapCombination('उद्गम्')).toBe(false);
    });
  });

  describe('Sutra metadata', () => {
    test('should include correct sutra reference', () => {
      const result = determineUdViTapAtmanepada('उत्तपते');
      expect(result.sutraApplied).toBe('1.3.27');
    });

    test('should include sutra reference even for negative cases', () => {
      const result = determineUdViTapAtmanepada('तपति');
      expect(result.sutraApplied).toBe('1.3.27');
    });

    test('should include intransitive requirement flag', () => {
      const result = determineUdViTapAtmanepada('someform', {
        root: 'तप्',
        prefix: 'उद्'
      });
      expect(result.requiresIntransitive).toBe(true);
    });

    test('should include transitivity information', () => {
      const result = determineUdViTapAtmanepada('उत्तपते', {
        isIntransitive: true
      });
      expect(result.transitivity).toBe('intransitive');
    });

    test('should handle both उद् and वि prefixes', () => {
      const udResult = determineUdViTapAtmanepada('उत्तपते');
      const viResult = determineUdViTapAtmanepada('वितपते');
      
      expect(udResult.prefix).toBe('उद्');
      expect(viResult.prefix).toBe('वि');
      expect(udResult.isUdViTapAtmanepada).toBe(true);
      expect(viResult.isUdViTapAtmanepada).toBe(true);
    });
  });
});
