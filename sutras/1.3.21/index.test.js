/**
 * Test Suite for Sutra 1.3.21: क्रीडोऽनुसम्परिभ्यश्च
 * Tests ātmanepada determination for क्रीड root with अनु/सम्/परि/आङ् prefixes
 */

import { determineKriDaPrefixAtmanepada } from './index.js';

describe('Sutra 1.3.21: क्रीडोऽनुसम्परिभ्यश्च (krīḍo\'nusamparibhyaśca)', () => {
  
  describe('Valid अनु + क्रीड combinations', () => {
    test('should detect अनुक्रीडते (anukrīḍate) as ātmanepada', () => {
      const result = determineKriDaPrefixAtmanepada('अनुक्रीडते');
      expect(result.isKriDaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('अनु');
      expect(result.root).toBe('क्रीड');
    });

    test('should detect anukrīḍate (IAST) as ātmanepada', () => {
      const result = determineKriDaPrefixAtmanepada('anukrīḍate');
      expect(result.isKriDaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('anu');
    });

    test('should detect अनुक्रीडित (anukrīḍita) as ātmanepada context', () => {
      const result = determineKriDaPrefixAtmanepada('अनुक्रीडित');
      expect(result.isKriDaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.prefix).toBe('अनु');
    });
  });

  describe('Valid सम् + क्रीड combinations', () => {
    test('should detect संक्रीडते (saṃkrīḍate) as ātmanepada', () => {
      const result = determineKriDaPrefixAtmanepada('संक्रीडते');
      expect(result.isKriDaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('सम्');
      expect(result.root).toBe('क्रीड');
    });

    test('should detect saṃkrīḍate (IAST) as ātmanepada', () => {
      const result = determineKriDaPrefixAtmanepada('saṃkrīḍate');
      expect(result.isKriDaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('sam');
    });

    test('should detect समक्रीडित (samakrīḍita) as ātmanepada context', () => {
      const result = determineKriDaPrefixAtmanepada('समक्रीडित');
      expect(result.isKriDaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.prefix).toBe('सम्');
    });
  });

  describe('Valid परि + क्रीड combinations', () => {
    test('should detect परिक्रीडते (parikrīḍate) as ātmanepada', () => {
      const result = determineKriDaPrefixAtmanepada('परिक्रीडते');
      expect(result.isKriDaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('परि');
      expect(result.root).toBe('क्रीड');
    });

    test('should detect parikrīḍate (IAST) as ātmanepada', () => {
      const result = determineKriDaPrefixAtmanepada('parikrīḍate');
      expect(result.isKriDaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('pari');
    });

    test('should detect परिक्रीडित (parikrīḍita) as ātmanepada context', () => {
      const result = determineKriDaPrefixAtmanepada('परिक्रीडित');
      expect(result.isKriDaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.prefix).toBe('परि');
    });
  });

  describe('Valid आङ् + क्रीड combinations', () => {
    test('should detect आक्रीडते (ākrīḍate) as ātmanepada', () => {
      const result = determineKriDaPrefixAtmanepada('आक्रीडते');
      expect(result.isKriDaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('आङ्');
      expect(result.root).toBe('क्रीड');
    });

    test('should detect ākrīḍate (IAST) as ātmanepada', () => {
      const result = determineKriDaPrefixAtmanepada('ākrīḍate');
      expect(result.isKriDaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('āṅ');
    });

    test('should detect आक्रीडित (ākrīḍita) as ātmanepada context', () => {
      const result = determineKriDaPrefixAtmanepada('आक्रीडित');
      expect(result.isKriDaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.prefix).toBe('आङ्');
    });
  });

  describe('Context-based analysis', () => {
    test('should handle explicit root and prefix context (अनु)', () => {
      const result = determineKriDaPrefixAtmanepada('someform', {
        root: 'क्रीड',
        prefix: 'अनु'
      });
      expect(result.isKriDaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('अनु');
    });

    test('should handle IAST context (सम्)', () => {
      const result = determineKriDaPrefixAtmanepada('someform', {
        root: 'krīḍ',
        prefix: 'sam'
      });
      expect(result.isKriDaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('sam');
    });

    test('should handle play meaning context', () => {
      const result = determineKriDaPrefixAtmanepada('परिक्रीडते', {
        meaning: 'to play around, to sport'
      });
      expect(result.isKriDaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should handle क्रीडा semantic context', () => {
      const result = determineKriDaPrefixAtmanepada('अनुक्रीडते', {
        meaning: 'krīḍā activity'
      });
      expect(result.isKriDaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('Negative cases - should not apply', () => {
    test('should not detect क्रीड without valid prefixes', () => {
      const result = determineKriDaPrefixAtmanepada('क्रीडति');
      expect(result.isKriDaPrefixAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.3);
    });

    test('should not detect valid prefixes with other roots', () => {
      const result = determineKriDaPrefixAtmanepada('अनुगच्छति');
      expect(result.isKriDaPrefixAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.3);
    });

    test('should not detect invalid prefixes + क्रीड', () => {
      const result = determineKriDaPrefixAtmanepada('अभिक्रीडति');
      expect(result.isKriDaPrefixAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.3);
    });

    test('should not detect उप + क्रीड', () => {
      const result = determineKriDaPrefixAtmanepada('उपक्रीडति');
      expect(result.isKriDaPrefixAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.3);
    });

    test('should not detect प्र + क्रीड', () => {
      const result = determineKriDaPrefixAtmanepada('प्रक्रीडति');
      expect(result.isKriDaPrefixAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.3);
    });

    test('should not detect क्रीड with wrong context', () => {
      const result = determineKriDaPrefixAtmanepada('someform', {
        root: 'क्रीड',
        prefix: 'वि'
      });
      expect(result.isKriDaPrefixAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.3);
    });
  });

  describe('Error handling', () => {
    test('should handle null input', () => {
      const result = determineKriDaPrefixAtmanepada(null);
      expect(result.isKriDaPrefixAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle undefined input', () => {
      const result = determineKriDaPrefixAtmanepada(undefined);
      expect(result.isKriDaPrefixAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle empty string', () => {
      const result = determineKriDaPrefixAtmanepada('');
      expect(result.isKriDaPrefixAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Empty input');
    });

    test('should handle whitespace-only string', () => {
      const result = determineKriDaPrefixAtmanepada('   ');
      expect(result.isKriDaPrefixAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Empty input');
    });

    test('should handle non-string input', () => {
      const result = determineKriDaPrefixAtmanepada(123);
      expect(result.isKriDaPrefixAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle invalid Sanskrit words', () => {
      const result = determineKriDaPrefixAtmanepada('xyz123');
      expect(result.isKriDaPrefixAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThanOrEqual(0.1);
      expect(result.analysis).toBe('Invalid Sanskrit word');
    });
  });

  describe('Edge cases', () => {
    test('should handle mixed case input', () => {
      const result = determineKriDaPrefixAtmanepada('AnuKrīḌaTe');
      expect(result.isKriDaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should handle extra whitespace', () => {
      const result = determineKriDaPrefixAtmanepada('  परिक्रीडते  ');
      expect(result.isKriDaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should handle variant क्रीड forms', () => {
      const result = determineKriDaPrefixAtmanepada('संक्रीळते');
      expect(result.isKriDaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should handle compound words containing valid combinations', () => {
      const result = determineKriDaPrefixAtmanepada('बालानुक्रीडते');
      expect(result.isKriDaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('should handle alternative prefix forms', () => {
      const result = determineKriDaPrefixAtmanepada('अनूक्रीडते');
      expect(result.isKriDaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });
  });

  describe('Semantic enhancement', () => {
    test('should boost confidence with play context', () => {
      const resultWithContext = determineKriDaPrefixAtmanepada('परिक्रीडते', {
        meaning: 'sport and play'
      });
      const resultWithoutContext = determineKriDaPrefixAtmanepada('परिक्रीडते');
      
      expect(resultWithContext.confidence).toBeGreaterThan(resultWithoutContext.confidence);
    });

    test('should handle क्रीडा context', () => {
      const result = determineKriDaPrefixAtmanepada('अनुक्रीडाक्रीडते');
      expect(result.isKriDaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should handle लीला context', () => {
      const result = determineKriDaPrefixAtmanepada('परिक्रीडते', {
        meaning: 'līlā and amusement'
      });
      expect(result.isKriDaPrefixAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('Sutra metadata', () => {
    test('should include correct sutra reference', () => {
      const result = determineKriDaPrefixAtmanepada('अनुक्रीडते');
      expect(result.sutraApplied).toBe('1.3.21');
    });

    test('should include sutra reference even for negative cases', () => {
      const result = determineKriDaPrefixAtmanepada('गच्छति');
      expect(result.sutraApplied).toBe('1.3.21');
    });

    test('should include all supported prefixes in valid cases', () => {
      const prefixes = ['अनु', 'सम्', 'परि', 'आङ्'];
      const words = ['अनुक्रीडते', 'संक्रीडते', 'परिक्रीडते', 'आक्रीडते'];
      
      words.forEach((word, index) => {
        const result = determineKriDaPrefixAtmanepada(word);
        expect(result.isKriDaPrefixAtmanepada).toBe(true);
        expect(result.prefix).toBe(prefixes[index]);
      });
    });
  });
});
