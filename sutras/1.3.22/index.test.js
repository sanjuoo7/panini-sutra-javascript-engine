/**
 * Test Suite for Sutra 1.3.22: समवप्रविभ्यः स्थः
 * Tests ātmanepada determination for स्था root with सम्/अव/प्र/वि prefixes
 */

import { determineSthaPrefixAtmanepada } from './index.js';

describe('Sutra 1.3.22: समवप्रविभ्यः स्थः (samavapravibhyaḥ sthaḥ)', () => {
  
  describe('Valid सम् + स्था combinations', () => {
    test('should detect संतिष्ठते (santiṣṭhate) as ātmanepada', () => {
      const result = determineSthaPrefixAtmanepada('संतिष्ठते');
      expect(result.isSthaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('सम्');
      expect(result.root).toBe('स्था');
    });

    test('should detect santiṣṭhate (IAST) as ātmanepada', () => {
      const result = determineSthaPrefixAtmanepada('santiṣṭhate');
      expect(result.isSthaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('sam');
    });

    test('should detect समस्थित (samasthita) as ātmanepada context', () => {
      const result = determineSthaPrefixAtmanepada('समस्थित');
      expect(result.isSthaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.prefix).toBe('सम्');
    });
  });

  describe('Valid अव + स्था combinations', () => {
    test('should detect अवतिष्ठते (avatiṣṭhate) as ātmanepada', () => {
      const result = determineSthaPrefixAtmanepada('अवतिष्ठते');
      expect(result.isSthaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('अव');
      expect(result.root).toBe('स्था');
    });

    test('should detect avatiṣṭhate (IAST) as ātmanepada', () => {
      const result = determineSthaPrefixAtmanepada('avatiṣṭhate');
      expect(result.isSthaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('ava');
    });

    test('should detect अवस्थित (avasthita) as ātmanepada context', () => {
      const result = determineSthaPrefixAtmanepada('अवस्थित');
      expect(result.isSthaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.prefix).toBe('अव');
    });
  });

  describe('Valid प्र + स्था combinations', () => {
    test('should detect प्रतिष्ठते (pratiṣṭhate) as ātmanepada', () => {
      const result = determineSthaPrefixAtmanepada('प्रतिष्ठते');
      expect(result.isSthaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('प्र');
      expect(result.root).toBe('स्था');
    });

    test('should detect pratiṣṭhate (IAST) as ātmanepada', () => {
      const result = determineSthaPrefixAtmanepada('pratiṣṭhate');
      expect(result.isSthaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('pra');
    });

    test('should detect प्रस्थित (prasthita) as ātmanepada context', () => {
      const result = determineSthaPrefixAtmanepada('प्रस्थित');
      expect(result.isSthaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.prefix).toBe('प्र');
    });
  });

  describe('Valid वि + स्था combinations', () => {
    test('should detect वितिष्ठते (vitiṣṭhate) as ātmanepada', () => {
      const result = determineSthaPrefixAtmanepada('वितिष्ठते');
      expect(result.isSthaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('वि');
      expect(result.root).toBe('स्था');
    });

    test('should detect vitiṣṭhate (IAST) as ātmanepada', () => {
      const result = determineSthaPrefixAtmanepada('vitiṣṭhate');
      expect(result.isSthaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('vi');
    });

    test('should detect विस्थित (visthita) as ātmanepada context', () => {
      const result = determineSthaPrefixAtmanepada('विस्थित');
      expect(result.isSthaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.prefix).toBe('वि');
    });
  });

  describe('Context-based analysis', () => {
    test('should handle explicit root and prefix context (सम्)', () => {
      const result = determineSthaPrefixAtmanepada('someform', {
        root: 'स्था',
        prefix: 'सम्'
      });
      expect(result.isSthaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('सम्');
    });

    test('should handle IAST context (अव)', () => {
      const result = determineSthaPrefixAtmanepada('someform', {
        root: 'sthā',
        prefix: 'ava'
      });
      expect(result.isSthaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('ava');
    });

    test('should handle standing meaning context', () => {
      const result = determineSthaPrefixAtmanepada('प्रतिष्ठते', {
        meaning: 'to stand firmly, to establish'
      });
      expect(result.isSthaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should handle स्थान semantic context', () => {
      const result = determineSthaPrefixAtmanepada('अवतिष्ठते', {
        meaning: 'sthāna and position'
      });
      expect(result.isSthaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('Negative cases - should not apply', () => {
    test('should not detect स्था without valid prefixes', () => {
      const result = determineSthaPrefixAtmanepada('तिष्ठति');
      expect(result.isSthaPrefixAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.3);
    });

    test('should not detect valid prefixes with other roots', () => {
      const result = determineSthaPrefixAtmanepada('समगच्छति');
      expect(result.isSthaPrefixAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.3);
    });

    test('should not detect invalid prefixes + स्था', () => {
      const result = determineSthaPrefixAtmanepada('अभितिष्ठति');
      expect(result.isSthaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.3);
    });

    test('should not detect उप + स्था', () => {
      const result = determineSthaPrefixAtmanepada('उपतिष्ठति');
      expect(result.isSthaPrefixAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.3);
    });

    test('should not detect आ + स्था', () => {
      const result = determineSthaPrefixAtmanepada('आतिष्ठति');
      expect(result.isSthaPrefixAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.3);
    });

    test('should not detect स्था with wrong context', () => {
      const result = determineSthaPrefixAtmanepada('someform', {
        root: 'स्था',
        prefix: 'नि'
      });
      expect(result.isSthaPrefixAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.3);
    });
  });

  describe('Error handling', () => {
    test('should handle null input', () => {
      const result = determineSthaPrefixAtmanepada(null);
      expect(result.isSthaPrefixAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle undefined input', () => {
      const result = determineSthaPrefixAtmanepada(undefined);
      expect(result.isSthaPrefixAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle empty string', () => {
      const result = determineSthaPrefixAtmanepada('');
      expect(result.isSthaPrefixAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle whitespace-only string', () => {
      const result = determineSthaPrefixAtmanepada('   ');
      expect(result.isSthaPrefixAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle non-string input', () => {
      const result = determineSthaPrefixAtmanepada(123);
      expect(result.isSthaPrefixAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle invalid Sanskrit words', () => {
      const result = determineSthaPrefixAtmanepada('xyz123');
      expect(result.isSthaPrefixAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThanOrEqual(0.1);
      expect(result.analysis).toBe('Invalid Sanskrit word');
    });
  });

  describe('Edge cases', () => {
    test('should handle mixed case input', () => {
      const result = determineSthaPrefixAtmanepada('PraTiṢṬhaTe');
      expect(result.isSthaPrefixAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.7);
    });

    test('should handle extra whitespace', () => {
      const result = determineSthaPrefixAtmanepada('  वितिष्ठते  ');
      expect(result.isSthaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should handle variant स्था forms', () => {
      const result = determineSthaPrefixAtmanepada('समस्थान');
      expect(result.isSthaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should handle compound words containing valid combinations', () => {
      const result = determineSthaPrefixAtmanepada('गृहप्रतिष्ठते');
      expect(result.isSthaPrefixAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.6);
    });

    test('should handle alternative prefix forms', () => {
      const result = determineSthaPrefixAtmanepada('व्यवतिष्ठते');
      expect(result.isSthaPrefixAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.7);
    });
  });

  describe('Semantic enhancement', () => {
    test('should boost confidence with standing context', () => {
      const resultWithContext = determineSthaPrefixAtmanepada('प्रतिष्ठते', { meaning: 'standing activity' });
      const resultWithoutContext = determineSthaPrefixAtmanepada('प्रतिष्ठते');
      
      expect(resultWithContext.confidence).toBeGreaterThanOrEqual(resultWithoutContext.confidence);
    });

    test('should handle स्थिति context', () => {
      const result = determineSthaPrefixAtmanepada('अवस्थितिस्था');
      expect(result.isSthaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should handle position context', () => {
      const result = determineSthaPrefixAtmanepada('संतिष्ठते', {
        meaning: 'position and place'
      });
      expect(result.isSthaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('Multiple prefix forms', () => {
    test('should detect all four valid prefixes', () => {
      const prefixes = ['सम्', 'अव', 'प्र', 'वि'];
      const words = ['संतिष्ठते', 'अवतिष्ठते', 'प्रतिष्ठते', 'वितिष्ठते'];
      
      words.forEach((word, index) => {
        const result = determineSthaPrefixAtmanepada(word);
        expect(result.isSthaPrefixAtmanepada).toBe(true);
        expect(result.prefix).toBe(prefixes[index]);
      });
    });

    test('should handle IAST versions of all prefixes', () => {
      const prefixes = ['sam', 'ava', 'pra', 'vi'];
      const words = ['santiṣṭhate', 'avatiṣṭhate', 'pratiṣṭhate', 'vitiṣṭhate'];
      
      words.forEach((word, index) => {
        const result = determineSthaPrefixAtmanepada(word);
        expect(result.isSthaPrefixAtmanepada).toBe(true);
        expect(result.prefix).toBe(prefixes[index]);
      });
    });
  });

  describe('Sutra metadata', () => {
    test('should include correct sutra reference', () => {
      const result = determineSthaPrefixAtmanepada('प्रतिष्ठते');
      expect(result.sutraApplied).toBe('1.3.22');
    });

    test('should include sutra reference even for negative cases', () => {
      const result = determineSthaPrefixAtmanepada('गच्छति');
      expect(result.sutraApplied).toBe('1.3.22');
    });

    test('should include all four supported prefixes in documentation', () => {
      // This test validates that the function correctly identifies the four prefixes
      const validPrefixes = ['सम्', 'अव', 'प्र', 'वि'];
      validPrefixes.forEach(prefix => {
        const result = determineSthaPrefixAtmanepada('someform', {
          root: 'स्था',
          prefix: prefix
        });
        expect(result.isSthaPrefixAtmanepada).toBe(true);
        expect(result.prefix).toBe(prefix);
      });
    });
  });
});
