/**
 * Test Suite for Sutra 1.3.26: अकर्मकाच्च
 * Tests ātmanepada assignment for intransitive constructions
 */

import { determineIntransitiveAtmanepada, isIntransitiveConstruction, extendWithIntransitive } from './index.js';

describe('Sutra 1.3.26: अकर्मकाच्च (akarmakācca)', () => {

  describe('Explicit intransitive context', () => {
    test('should detect intransitive usage via context', () => {
      const result = determineIntransitiveAtmanepada('तिष्ठते', {
        transitivity: 'intransitive'
      });
      expect(result.isIntransitiveAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.transitivity).toBe('intransitive');
    });

    test('should detect isIntransitive flag', () => {
      const result = determineIntransitiveAtmanepada('गच्छते', {
        isIntransitive: true
      });
      expect(result.isIntransitiveAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.transitivity).toBe('intransitive');
    });

    test('should extend previous sutra rules (उद् + स्था)', () => {
      const result = determineIntransitiveAtmanepada('उत्तिष्ठते', {
        root: 'स्था',
        prefix: 'उद्',
        transitivity: 'intransitive'
      });
      expect(result.isIntransitiveAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
      expect(result.extendsPreviousRule).toBe(true);
    });

    test('should extend previous sutra rules (उप + स्था)', () => {
      const result = determineIntransitiveAtmanepada('उपतिष्ठते', {
        root: 'स्था',
        prefix: 'उप',
        transitivity: 'intransitive'
      });
      expect(result.isIntransitiveAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
      expect(result.extendsPreviousRule).toBe(true);
    });
  });

  describe('Ātmanepada ending patterns', () => {
    test('should detect ते ending (Devanagari)', () => {
      const result = determineIntransitiveAtmanepada('तिष्ठते');
      expect(result.isIntransitiveAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.transitivity).toBe('intransitive');
    });

    test('should detect te ending (IAST)', () => {
      const result = determineIntransitiveAtmanepada('tiṣṭhate');
      expect(result.isIntransitiveAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.transitivity).toBe('intransitive');
    });

    test('should detect से ending (Devanagari)', () => {
      const result = determineIntransitiveAtmanepada('तिष्ठसे');
      expect(result.isIntransitiveAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should detect ध्वे ending (Devanagari)', () => {
      const result = determineIntransitiveAtmanepada('तिष्ठध्वे');
      expect(result.isIntransitiveAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should detect न्ते ending (Devanagari)', () => {
      const result = determineIntransitiveAtmanepada('तिष्ठन्ते');
      expect(result.isIntransitiveAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should detect महे ending (Devanagari)', () => {
      const result = determineIntransitiveAtmanepada('तिष्ठामहे');
      expect(result.isIntransitiveAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });
  });

  describe('Intransitive root patterns', () => {
    test('should detect स्था root patterns', () => {
      const result = determineIntransitiveAtmanepada('स्थायते');
      expect(result.isIntransitiveAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('should detect गम् root patterns', () => {
      const result = determineIntransitiveAtmanepada('गमते');
      expect(result.isIntransitiveAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('should detect पत् root patterns', () => {
      const result = determineIntransitiveAtmanepada('पतते');
      expect(result.isIntransitiveAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('should detect श्री root patterns', () => {
      const result = determineIntransitiveAtmanepada('श्रीयते');
      expect(result.isIntransitiveAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.5);
    });
  });

  describe('Meaning-based intransitive detection', () => {
    test('should detect intransitive meanings via context', () => {
      const result = determineIntransitiveAtmanepada('करोते', {
        meaning: 'to become, to remain'
      });
      expect(result.isIntransitiveAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should detect "grow" as intransitive meaning', () => {
      const result = determineIntransitiveAtmanepada('वर्धते', {
        meaning: 'to grow, to flourish'
      });
      expect(result.isIntransitiveAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should detect "shine" as intransitive meaning', () => {
      const result = determineIntransitiveAtmanepada('शोभते', {
        meaning: 'to shine, to appear'
      });
      expect(result.isIntransitiveAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should detect Sanskrit intransitive meanings', () => {
      const result = determineIntransitiveAtmanepada('भवते', {
        meaning: 'भू - to be, to become'
      });
      expect(result.isIntransitiveAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });
  });

  describe('Negative cases - should not apply', () => {
    test('should not detect clearly transitive constructions', () => {
      const result = determineIntransitiveAtmanepada('करोति', {
        transitivity: 'transitive'
      });
      expect(result.isIntransitiveAtmanepada).toBe(false);
    });

    test('should not detect parasmaipada endings', () => {
      const result = determineIntransitiveAtmanepada('गच्छति');
      expect(result.isIntransitiveAtmanepada).toBe(false);
    });

    test('should not detect transitive root + object', () => {
      const result = determineIntransitiveAtmanepada('गृहं करोति');
      expect(result.isIntransitiveAtmanepada).toBe(false);
    });

    test('should not detect without clear indicators', () => {
      const result = determineIntransitiveAtmanepada('अश्व');
      expect(result.isIntransitiveAtmanepada).toBe(false);
    });
  });

  describe('Error handling', () => {
    test('should handle null input', () => {
      const result = determineIntransitiveAtmanepada(null);
      expect(result.isIntransitiveAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle undefined input', () => {
      const result = determineIntransitiveAtmanepada(undefined);
      expect(result.isIntransitiveAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle empty string', () => {
      const result = determineIntransitiveAtmanepada('');
      expect(result.isIntransitiveAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle whitespace-only string', () => {
      const result = determineIntransitiveAtmanepada('   ');
      expect(result.isIntransitiveAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle non-string input', () => {
      const result = determineIntransitiveAtmanepada(123);
      expect(result.isIntransitiveAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle invalid Sanskrit words', () => {
      const result = determineIntransitiveAtmanepada('xyz123');
      expect(result.isIntransitiveAtmanepada).toBe(false);
      expect(result.confidence).toBe(0.1);
      expect(result.analysis).toBe('No clear intransitive construction found');
    });
  });

  describe('Edge cases', () => {
    test('should handle mixed case input', () => {
      const result = determineIntransitiveAtmanepada('TiShThaTe');
      expect(result.isIntransitiveAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should handle extra whitespace', () => {
      const result = determineIntransitiveAtmanepada('  तिष्ठते  ');
      expect(result.isIntransitiveAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should handle compound forms', () => {
      const result = determineIntransitiveAtmanepada('गृहे तिष्ठते');
      expect(result.isIntransitiveAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('should handle ambiguous cases with context', () => {
      const result = determineIntransitiveAtmanepada('स्थिते', {
        transitivity: 'intransitive'
      });
      expect(result.isIntransitiveAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('Helper function tests', () => {
    test('isIntransitiveConstruction should work correctly', () => {
      expect(isIntransitiveConstruction('तिष्ठते')).toBe(true);
      expect(isIntransitiveConstruction('करोति')).toBe(false);
      expect(isIntransitiveConstruction('गच्छते', { isIntransitive: true })).toBe(true);
    });

    test('extendWithIntransitive should extend previous rules', () => {
      const result = extendWithIntransitive('उत्तिष्ठते', {
        root: 'स्था',
        prefix: 'उद्'
      });
      expect(result.isIntransitiveAtmanepada).toBe(true);
      expect(result.extendsRule).toBe(true);
      expect(result.originalContext.root).toBe('स्था');
    });
  });

  describe('IAST pattern support', () => {
    test('should detect IAST ātmanepada patterns', () => {
      const result = determineIntransitiveAtmanepada('gacchate');
      expect(result.isIntransitiveAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should detect IAST root patterns', () => {
      const result = determineIntransitiveAtmanepada('sthāyate');
      expect(result.isIntransitiveAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('should handle mixed script context', () => {
      const result = determineIntransitiveAtmanepada('tiṣṭhate', {
        meaning: 'तिष्ठ - to stand'
      });
      expect(result.isIntransitiveAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });
  });

  describe('Sutra metadata', () => {
    test('should include correct sutra reference', () => {
      const result = determineIntransitiveAtmanepada('तिष्ठते');
      expect(result.sutraApplied).toBe('1.3.26');
    });

    test('should include sutra reference even for negative cases', () => {
      const result = determineIntransitiveAtmanepada('करोति');
      expect(result.sutraApplied).toBe('1.3.26');
    });

    test('should indicate extension of previous rules', () => {
      const result = determineIntransitiveAtmanepada('उत्तिष्ठते', {
        root: 'स्था',
        prefix: 'उद्',
        transitivity: 'intransitive'
      });
      expect(result.extendsPreviousRule).toBe(true);
    });

    test('should include transitivity information', () => {
      const result = determineIntransitiveAtmanepada('तिष्ठते', {
        isIntransitive: true
      });
      expect(result.transitivity).toBe('intransitive');
    });
  });
});
