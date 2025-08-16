/**
 * Test Suite for Sutra 1.3.20: आङो दोऽनास्यविहरणे
 * Tests ātmanepada determination for दा root with आङ् prefix (excluding mouth-opening)
 */

import { determineAangDoAtmanepada } from './index.js';

describe('Sutra 1.3.20: आङो दोऽनास्यविहरणे (āṅo do\'nāsyaviharaṇe)', () => {
  
  describe('Valid आङ् + दा combinations', () => {
    test('should detect आदत्ते (ādatte) as ātmanepada', () => {
      const result = determineAangDoAtmanepada('आदत्ते');
      expect(result.isAangDoAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('आङ्');
      expect(result.root).toBe('दा');
    });

    test('should detect ādatte (IAST) as ātmanepada', () => {
      const result = determineAangDoAtmanepada('ādatte');
      expect(result.isAangDoAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('आङ्');
    });

    test('should detect आदत्त (ādatta) as ātmanepada', () => {
      const result = determineAangDoAtmanepada('आदत्त');
      expect(result.isAangDoAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.prefix).toBe('आङ्');
    });

    test('should detect आददाते (ādadāte) as ātmanepada', () => {
      const result = determineAangDoAtmanepada('आददाते');
      expect(result.isAangDoAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('आङ्');
    });

    test('should detect आदेय (ādeya) as ātmanepada context', () => {
      const result = determineAangDoAtmanepada('आदेय');
      expect(result.isAangDoAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.prefix).toBe('आङ्');
    });
  });

  describe('Context-based analysis', () => {
    test('should handle explicit root and prefix context', () => {
      const result = determineAangDoAtmanepada('someform', {
        root: 'दा',
        prefix: 'आङ्'
      });
      expect(result.isAangDoAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('आङ्');
    });

    test('should handle IAST context', () => {
      const result = determineAangDoAtmanepada('someform', {
        root: 'dā',
        prefix: 'ā'
      });
      expect(result.isAangDoAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('आङ्');
    });

    test('should handle meaning context (non-mouth-opening)', () => {
      const result = determineAangDoAtmanepada('आदत्ते', {
        meaning: 'to take, to receive'
      });
      expect(result.isAangDoAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });
  });

  describe('Mouth-opening exclusion (अनास्यविहरणे)', () => {
    test('should exclude mouth-opening meaning via context', () => {
      const result = determineAangDoAtmanepada('आदत्ते', {
        mouthOpening: true
      });
      expect(result.isAangDoAtmanepada).toBe(false);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.semanticException).toBe(true);
      expect(result.analysis).toContain('mouth-opening');
    });

    test('should exclude when meaning indicates mouth-opening', () => {
      const result = determineAangDoAtmanepada('आदत्ते', {
        meaning: 'to open mouth'
      });
      expect(result.isAangDoAtmanepada).toBe(false);
      expect(result.semanticException).toBe(true);
      expect(result.analysis).toContain('mouth-opening');
    });

    test('should exclude when meaning indicates speaking', () => {
      const result = determineAangDoAtmanepada('आदत्ते', {
        meaning: 'to speak, to utter'
      });
      expect(result.isAangDoAtmanepada).toBe(false);
      expect(result.semanticException).toBe(true);
    });

    test('should exclude आस्यविहरण context', () => {
      const result = determineAangDoAtmanepada('आदत्ते', {
        meaning: 'āsyaviharaṇa'
      });
      expect(result.isAangDoAtmanepada).toBe(false);
      expect(result.semanticException).toBe(true);
    });

    test('should exclude when word contains mouth indicators', () => {
      const result = determineAangDoAtmanepada('आदत्तेऽस्य');
      expect(result.isAangDoAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });
  });

  describe('Negative cases - should not apply', () => {
    test('should not detect दा without आङ् prefix', () => {
      const result = determineAangDoAtmanepada('ददाति');
      expect(result.isAangDoAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.3);
    });

    test('should not detect आङ् with other roots', () => {
      const result = determineAangDoAtmanepada('आगच्छति');
      expect(result.isAangDoAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.3);
    });

    test('should not detect other prefixes + दा', () => {
      const result = determineAangDoAtmanepada('प्रददाति');
      expect(result.isAangDoAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.3);
    });

    test('should not detect उप + दा', () => {
      const result = determineAangDoAtmanepada('उपददाति');
      expect(result.isAangDoAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.3);
    });

    test('should not detect simple दा forms', () => {
      const result = determineAangDoAtmanepada('दाति');
      expect(result.isAangDoAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.3);
    });

    test('should not detect दा with wrong context', () => {
      const result = determineAangDoAtmanepada('someform', {
        root: 'दा',
        prefix: 'प्र'
      });
      expect(result.isAangDoAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.3);
    });
  });

  describe('Error handling', () => {
    test('should handle null input', () => {
      const result = determineAangDoAtmanepada(null);
      expect(result.isAangDoAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle undefined input', () => {
      const result = determineAangDoAtmanepada(undefined);
      expect(result.isAangDoAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle empty string', () => {
      const result = determineAangDoAtmanepada('');
      expect(result.isAangDoAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle whitespace-only string', () => {
      const result = determineAangDoAtmanepada('   ');
      expect(result.isAangDoAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle non-string input', () => {
      const result = determineAangDoAtmanepada(123);
      expect(result.isAangDoAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle invalid Sanskrit words', () => {
      const result = determineAangDoAtmanepada('xyz123');
      expect(result.isAangDoAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThanOrEqual(0.1);
      expect(result.analysis).toBe('Invalid Sanskrit word');
    });
  });

  describe('Edge cases', () => {
    test('should handle mixed case input', () => {
      const result = determineAangDoAtmanepada('ĀdaTTe');
      expect(result.isAangDoAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.7);
    });

    test('should handle extra whitespace', () => {
      const result = determineAangDoAtmanepada('  आदत्ते  ');
      expect(result.isAangDoAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should handle variant दा forms', () => {
      const result = determineAangDoAtmanepada('आददाति');
      expect(result.isAangDoAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should handle compound words containing आ + दा', () => {
      const result = determineAangDoAtmanepada('सुखादत्ते');
      expect(result.isAangDoAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.6);
    });

    test('should handle contextual ambiguity gracefully', () => {
      const result = determineAangDoAtmanepada('आदत्ते', {
        meaning: 'unclear context'
      });
      expect(result.isAangDoAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });
  });

  describe('Semantic analysis', () => {
    test('should detect giving semantic context', () => {
      const result = determineAangDoAtmanepada('आदत्त');
      expect(result.isAangDoAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should handle दाता (giver) context', () => {
      const result = determineAangDoAtmanepada('आदाता');
      expect(result.isAangDoAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should handle आदान (taking) context', () => {
      const result = determineAangDoAtmanepada('आदान');
      expect(result.isAangDoAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });
  });

  describe('Sutra metadata', () => {
    test('should include correct sutra reference', () => {
      const result = determineAangDoAtmanepada('आदत्ते');
      expect(result.sutraApplied).toBe('1.3.20');
    });

    test('should include sutra reference even for negative cases', () => {
      const result = determineAangDoAtmanepada('गच्छति');
      expect(result.sutraApplied).toBe('1.3.20');
    });

    test('should include nonMouthOpening flag for valid cases', () => {
      const result = determineAangDoAtmanepada('आदत्ते');
      expect(result.nonMouthOpening).toBe(true);
    });
  });
});
