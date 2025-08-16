/**
 * Test Suite for Sutra 1.3.19: विपराभ्यां जेः
 * Tests ātmanepada determination for जि root with वि/परा prefixes
 */

import { determineViParaJiAtmanepada } from './index.js';

describe('Sutra 1.3.19: विपराभ्यां जेः (viparābhyāṃ jeḥ)', () => {
  
  describe('Valid वि + जि combinations', () => {
    test('should detect विजयते (vijayate) as ātmanepada', () => {
      const result = determineViParaJiAtmanepada('विजयते');
      expect(result.isViParaJiAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('वि');
      expect(result.root).toBe('जि');
    });

    test('should detect vijayate (IAST) as ātmanepada', () => {
      const result = determineViParaJiAtmanepada('vijayate');
      expect(result.isViParaJiAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('vi');
    });

    test('should detect विजेत (vijeta) as ātmanepada', () => {
      const result = determineViParaJiAtmanepada('विजेत');
      expect(result.isViParaJiAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.prefix).toBe('वि');
    });

    test('should detect विजित (vijita) as ātmanepada context', () => {
      const result = determineViParaJiAtmanepada('विजित');
      expect(result.isViParaJiAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.prefix).toBe('वि');
    });

    test('should handle विजिगीषते (vijigīṣate) - desiderative', () => {
      const result = determineViParaJiAtmanepada('विजिगीषते');
      expect(result.isViParaJiAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.prefix).toBe('वि');
    });
  });

  describe('Valid परा + जि combinations', () => {
    test('should detect पराजयते (parājayate) as ātmanepada', () => {
      const result = determineViParaJiAtmanepada('पराजयते');
      expect(result.isViParaJiAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('परा');
      expect(result.root).toBe('जि');
    });

    test('should detect parājayate (IAST) as ātmanepada', () => {
      const result = determineViParaJiAtmanepada('parājayate');
      expect(result.isViParaJiAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('parā');
    });

    test('should detect पराजेत (parājeta) as ātmanepada', () => {
      const result = determineViParaJiAtmanepada('पराजेत');
      expect(result.isViParaJiAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.prefix).toBe('परा');
    });

    test('should detect पराजित (parājita) as ātmanepada context', () => {
      const result = determineViParaJiAtmanepada('पराजित');
      expect(result.isViParaJiAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.prefix).toBe('परा');
    });

    test('should handle पराजिगीषते (parājigīṣate) - desiderative', () => {
      const result = determineViParaJiAtmanepada('पराजिगीषते');
      expect(result.isViParaJiAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.prefix).toBe('परा');
    });
  });

  describe('Context-based analysis', () => {
    test('should handle explicit root and prefix context', () => {
      const result = determineViParaJiAtmanepada('someform', {
        root: 'जि',
        prefix: 'वि'
      });
      expect(result.isViParaJiAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('वि');
    });

    test('should handle IAST context', () => {
      const result = determineViParaJiAtmanepada('someform', {
        root: 'ji',
        prefix: 'parā'
      });
      expect(result.isViParaJiAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('parā');
    });

    test('should handle tense context information', () => {
      const result = determineViParaJiAtmanepada('विजयते', {
        tense: 'present'
      });
      expect(result.isViParaJiAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });
  });

  describe('Negative cases - should not apply', () => {
    test('should not detect जि without वि/परा prefixes', () => {
      const result = determineViParaJiAtmanepada('जयति');
      expect(result.isViParaJiAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.3);
    });

    test('should not detect वि/परा with other roots', () => {
      const result = determineViParaJiAtmanepada('विलिखति');
      expect(result.isViParaJiAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.3);
    });

    test('should not detect अभि + जि (different prefix)', () => {
      const result = determineViParaJiAtmanepada('अभिजयति');
      expect(result.isViParaJiAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.3);
    });

    test('should not detect उप + जि', () => {
      const result = determineViParaJiAtmanepada('उपजयति');
      expect(result.isViParaJiAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.3);
    });

    test('should not detect simple जि forms', () => {
      const result = determineViParaJiAtmanepada('जयति');
      expect(result.isViParaJiAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.3);
    });

    test('should not detect जि with wrong context', () => {
      const result = determineViParaJiAtmanepada('someform', {
        root: 'जि',
        prefix: 'अभि'
      });
      expect(result.isViParaJiAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.3);
    });
  });

  describe('Error handling', () => {
    test('should handle null input', () => {
      const result = determineViParaJiAtmanepada(null);
      expect(result.isViParaJiAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle undefined input', () => {
      const result = determineViParaJiAtmanepada(undefined);
      expect(result.isViParaJiAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle empty string', () => {
      const result = determineViParaJiAtmanepada('');
      expect(result.isViParaJiAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle whitespace-only string', () => {
      const result = determineViParaJiAtmanepada('   ');
      expect(result.isViParaJiAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle non-string input', () => {
      const result = determineViParaJiAtmanepada(123);
      expect(result.isViParaJiAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle invalid Sanskrit words', () => {
      const result = determineViParaJiAtmanepada('xyz123');
      expect(result.isViParaJiAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThanOrEqual(0.1);
      expect(result.analysis).toBe('Invalid Sanskrit word');
    });
  });

  describe('Edge cases', () => {
    test('should handle mixed case input', () => {
      const result = determineViParaJiAtmanepada('ViJaYaTe');
      expect(result.isViParaJiAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.7);
    });

    test('should handle extra whitespace', () => {
      const result = determineViParaJiAtmanepada('  विजयते  ');
      expect(result.isViParaJiAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should handle variant जि forms', () => {
      const result = determineViParaJiAtmanepada('विजिन्वते');
      expect(result.isViParaJiAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should handle compound words containing वि/परा + जि', () => {
      const result = determineViParaJiAtmanepada('महाविजयते');
      expect(result.isViParaJiAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.6);
    });
  });

  describe('Sutra metadata', () => {
    test('should include correct sutra reference', () => {
      const result = determineViParaJiAtmanepada('विजयते');
      expect(result.sutraApplied).toBe('1.3.19');
    });

    test('should include sutra reference even for negative cases', () => {
      const result = determineViParaJiAtmanepada('गच्छति');
      expect(result.sutraApplied).toBe('1.3.19');
    });
  });
});
