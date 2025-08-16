/**
 * Test Suite for Sutra 1.3.25: उपान्मन्त्रकरणे
 * Tests ātmanepada assignment for स्था with उप prefix in worship context
 */

import { determineUpSthaWorshipAtmanepada, checkUpSthaWorshipCombination } from './index.js';

describe('Sutra 1.3.25: उपान्मन्त्रकरणे (upānamantrakaraṇe)', () => {

  describe('Valid उप + स्था combinations', () => {
    test('should detect उपतिष्ठते (upatiṣṭhate) as ātmanepada', () => {
      const result = determineUpSthaWorshipAtmanepada('उपतिष्ठते');
      expect(result.isUpSthaWorshipAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('उप');
      expect(result.root).toBe('स्था');
    });

    test('should detect upatiṣṭhate (IAST) as ātmanepada', () => {
      const result = determineUpSthaWorshipAtmanepada('upatiṣṭhate');
      expect(result.isUpSthaWorshipAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('upa');
    });

    test('should detect उपस्थान (upasthāna) as ātmanepada context', () => {
      const result = determineUpSthaWorshipAtmanepada('उपस्थान');
      expect(result.isUpSthaWorshipAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.prefix).toBe('उप');
    });

    test('should detect उपस्थित (upasthita) as ātmanepada context', () => {
      const result = determineUpSthaWorshipAtmanepada('उपस्थित');
      expect(result.isUpSthaWorshipAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.prefix).toBe('उप');
    });
  });

  describe('Worship context (मन्त्रकरणे)', () => {
    test('should detect उपासते (upāsate) as worship-related ātmanepada', () => {
      const result = determineUpSthaWorshipAtmanepada('उपासते');
      expect(result.isUpSthaWorshipAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.worshipContext).toBe(true);
    });

    test('should detect upāsate (IAST) as worship-related ātmanepada', () => {
      const result = determineUpSthaWorshipAtmanepada('upāsate');
      expect(result.isUpSthaWorshipAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.worshipContext).toBe(true);
    });

    test('should detect उपास्थान (upāsthāna) as worship context', () => {
      const result = determineUpSthaWorshipAtmanepada('उपास्थान');
      expect(result.isUpSthaWorshipAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.worshipContext).toBe(true);
    });
  });

  describe('Context-based analysis', () => {
    test('should handle explicit root and prefix context', () => {
      const result = determineUpSthaWorshipAtmanepada('someform', {
        root: 'स्था',
        prefix: 'उप'
      });
      expect(result.isUpSthaWorshipAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('उप');
    });

    test('should handle IAST context', () => {
      const result = determineUpSthaWorshipAtmanepada('someform', {
        root: 'sthā',
        prefix: 'upa'
      });
      expect(result.isUpSthaWorshipAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should handle worship meaning context', () => {
      const result = determineUpSthaWorshipAtmanepada('उपतिष्ठते', {
        meaning: 'to worship, to adore'
      });
      expect(result.isUpSthaWorshipAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should boost confidence with explicit worship meaning', () => {
      const result = determineUpSthaWorshipAtmanepada('someform', {
        root: 'स्था',
        prefix: 'उप',
        meaning: 'worship and adoration'
      });
      expect(result.isUpSthaWorshipAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
      expect(result.worshipContext).toBe(true);
    });
  });

  describe('Negative cases - should not apply', () => {
    test('should not detect स्था without उप prefix', () => {
      const result = determineUpSthaWorshipAtmanepada('तिष्ठते');
      expect(result.isUpSthaWorshipAtmanepada).toBe(false);
    });

    test('should not detect उप with other roots', () => {
      const result = determineUpSthaWorshipAtmanepada('उपगच्छति');
      expect(result.isUpSthaWorshipAtmanepada).toBe(false);
    });

    test('should not detect other prefixes + स्था', () => {
      const result = determineUpSthaWorshipAtmanepada('प्रतिष्ठते');
      expect(result.isUpSthaWorshipAtmanepada).toBe(false);
    });

    test('should not detect उद् + स्था', () => {
      const result = determineUpSthaWorshipAtmanepada('उत्तिष्ठते');
      expect(result.isUpSthaWorshipAtmanepada).toBe(false);
    });

    test('should not detect simple स्था forms', () => {
      const result = determineUpSthaWorshipAtmanepada('स्थाने');
      expect(result.isUpSthaWorshipAtmanepada).toBe(false);
    });

    test('should not detect स्था with wrong context', () => {
      const result = determineUpSthaWorshipAtmanepada('तिष्ठति', {
        root: 'गम्',
        prefix: 'उप'
      });
      expect(result.isUpSthaWorshipAtmanepada).toBe(false);
    });
  });

  describe('Error handling', () => {
    test('should handle null input', () => {
      const result = determineUpSthaWorshipAtmanepada(null);
      expect(result.isUpSthaWorshipAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle undefined input', () => {
      const result = determineUpSthaWorshipAtmanepada(undefined);
      expect(result.isUpSthaWorshipAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle empty string', () => {
      const result = determineUpSthaWorshipAtmanepada('');
      expect(result.isUpSthaWorshipAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle whitespace-only string', () => {
      const result = determineUpSthaWorshipAtmanepada('   ');
      expect(result.isUpSthaWorshipAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle non-string input', () => {
      const result = determineUpSthaWorshipAtmanepada(123);
      expect(result.isUpSthaWorshipAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle invalid Sanskrit words', () => {
      const result = determineUpSthaWorshipAtmanepada('xyz123');
      expect(result.isUpSthaWorshipAtmanepada).toBe(false);
      expect(result.confidence).toBe(0.1);
      expect(result.analysis).toBe('No उप + स्था combination found');
    });
  });

  describe('Edge cases', () => {
    test('should handle mixed case input', () => {
      const result = determineUpSthaWorshipAtmanepada('UpAtIShThaTe');
      expect(result.isUpSthaWorshipAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.7);
    });

    test('should handle extra whitespace', () => {
      const result = determineUpSthaWorshipAtmanepada('  उपतिष्ठते  ');
      expect(result.isUpSthaWorshipAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should handle variant स्था forms', () => {
      const result = determineUpSthaWorshipAtmanepada('उपस्थाय');
      expect(result.isUpSthaWorshipAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should handle compound words containing उप + स्था', () => {
      const result = determineUpSthaWorshipAtmanepada('देवोपतिष्ठते');
      expect(result.isUpSthaWorshipAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.6);
    });

    test('should handle contextual ambiguity gracefully', () => {
      const result = determineUpSthaWorshipAtmanepada('उपतिष्ठते', {
        meaning: 'unclear context'
      });
      expect(result.isUpSthaWorshipAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });
  });

  describe('Worship semantic analysis', () => {
    test('should detect worship semantic context', () => {
      const result = determineUpSthaWorshipAtmanepada('उपतिष्ठते', {
        meaning: 'adoration and reverence'
      });
      expect(result.isUpSthaWorshipAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should handle मन्त्र context', () => {
      const result = determineUpSthaWorshipAtmanepada('उपमन्त्रस्था');
      expect(result.isUpSthaWorshipAtmanepada).toBe(true);
      expect(result.worshipContext).toBe(true);
    });

    test('should handle upāsanā context', () => {
      const result = determineUpSthaWorshipAtmanepada('उपासनास्था', {
        meaning: 'worship practice'
      });
      expect(result.isUpSthaWorshipAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should handle pūjā context', () => {
      const result = determineUpSthaWorshipAtmanepada('उपपूजास्था');
      expect(result.isUpSthaWorshipAtmanepada).toBe(true);
      expect(result.worshipContext).toBe(true);
    });
  });

  describe('Helper function tests', () => {
    test('checkUpSthaWorshipCombination should work correctly', () => {
      expect(checkUpSthaWorshipCombination('उपतिष्ठते')).toBe(true);
      expect(checkUpSthaWorshipCombination('तिष्ठते')).toBe(false);
      expect(checkUpSthaWorshipCombination('उपगम्')).toBe(false);
    });
  });

  describe('Sutra metadata', () => {
    test('should include correct sutra reference', () => {
      const result = determineUpSthaWorshipAtmanepada('उपतिष्ठते');
      expect(result.sutraApplied).toBe('1.3.25');
    });

    test('should include sutra reference even for negative cases', () => {
      const result = determineUpSthaWorshipAtmanepada('तिष्ठति');
      expect(result.sutraApplied).toBe('1.3.25');
    });

    test('should include worship context flag when applicable', () => {
      const result = determineUpSthaWorshipAtmanepada('उपासते');
      expect(result.worshipContext).toBe(true);
    });

    test('should handle non-worship उप + स्था combinations', () => {
      const result = determineUpSthaWorshipAtmanepada('उपतिष्ठते');
      expect(result.isUpSthaWorshipAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });
  });
});
