/**
 * Test Suite for Sutra 1.3.28: आङो यमहनः
 * Tests ātmanepada assignment for यम्/ह    test('    test('    test('    test('    test('    test('should handle explicit root and prefix context (हन्)', () => {
      const result = determineAangYamHanAtmanepada('word', {
        root: 'हन्',
        prefix: 'आ',
        transitivity: 'intransitive'
      });
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
      expect(result.prefix).toBe('आ');
      expect(result.root).toBe('हन्');
    });le explicit root and prefix context (यम्)', () => {
      const result = determineAangYamHanAtmanepada('word', {
        root: 'यम्',
        prefix: 'आ',
        transitivity: 'intransitive'
      });
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
      expect(result.prefix).toBe('आ');
      expect(result.root).toBe('यम्');
    });le explicit root and prefix context (हन्)', () => {
      const result = determineAangYamHanAtmanepada('word', {
        root: 'han',
        prefix: 'ā',
        transitivity: 'intransitive'
      });
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
      expect(result.prefix).toBe('ā');
      expect(result.root).toBe('han');
    });le explicit root and prefix context (यम्)', () => {
      const result = determineAangYamHanAtmanepada('word', {
        root: 'yam',
        prefix: 'ā',
        transitivity: 'intransitive'
      });
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
      expect(result.prefix).toBe('ā');
      expect(result.root).toBe('yam');
    });le explicit root and prefix context (हन्)', () => {
      const result = determineAangYamHanAtmanepada('word', {
        root: 'han',
        prefix: 'ā',
        transitivity: 'intransitive'
      });
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
      expect(result.prefix).toBe('ā');
      expect(result.root).toBe('han');
    });le explicit root and prefix context (यम्)', () => {
      const result = determineAangYamHanAtmanepada('word', {
        root: 'yam',
        prefix: 'ā',
        transitivity: 'intransitive'
      });
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
      expect(result.prefix).toBe('ā');
      expect(result.root).toBe('yam');
    });refix (intransitive)
 */

import { determineAangYamHanAtmanepada, checkAangYamHanCombination } from './index.js';

describe('Sutra 1.3.28: आङो यमहनः (āṅo yamahanaḥ)', () => {

  describe('Valid आ + यम् combinations (intransitive)', () => {
    test('should detect आयच्छते (āyacchate) as ātmanepada', () => {
      const result = determineAangYamHanAtmanepada('आयच्छते');
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('आ');
      expect(result.root).toBe('यम्');
    });

    test('should detect āyacchate (IAST) as ātmanepada', () => {
      const result = determineAangYamHanAtmanepada('āyacchate');
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('ā');
      expect(result.root).toBe('yam');
    });

    test('should detect आयम्यते (āyamyate) as ātmanepada', () => {
      const result = determineAangYamHanAtmanepada('आयम्यते');
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('आ');
    });

    test('should detect आयतते (āyatate) as ātmanepada', () => {
      const result = determineAangYamHanAtmanepada('आयतते');
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.root).toBe('यम्');
    });

    test('should detect āyamyante (IAST plural) as ātmanepada', () => {
      const result = determineAangYamHanAtmanepada('āyamyante');
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('Valid आ + हन् combinations (intransitive)', () => {
    test('should detect आहतते (āhatate) as ātmanepada', () => {
      const result = determineAangYamHanAtmanepada('आहतते');
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('आ');
      expect(result.root).toBe('हन्');
    });

    test('should detect āhanyate (IAST) as ātmanepada', () => {
      const result = determineAangYamHanAtmanepada('āhanyate');
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('ā');
      expect(result.root).toBe('han');
    });

    test('should detect आहन्यते (āhanyate Devanagari) as ātmanepada', () => {
      const result = determineAangYamHanAtmanepada('आहन्यते');
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.root).toBe('हन्');
    });

    test('should detect आघातते (āghātate) as ātmanepada', () => {
      const result = determineAangYamHanAtmanepada('आघातते');
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('आ');
    });

    test('should detect āhatante (IAST plural) as ātmanepada', () => {
      const result = determineAangYamHanAtmanepada('āhatante');
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('Context-based analysis', () => {
    test('should handle explicit root and prefix context (यम्)', () => {
      const result = determineAangYamHanAtmanepada('someform', {
        root: 'यम्',
        prefix: 'आ',
        transitivity: 'intransitive'
      });
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
      expect(result.prefix).toBe('आ');
      expect(result.root).toBe('यम्');
    });

    test('should handle explicit root and prefix context (हन्)', () => {
      const result = determineAangYamHanAtmanepada('someform', {
        root: 'हन्',
        prefix: 'आ',
        isIntransitive: true
      });
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
      expect(result.prefix).toBe('आ');
      expect(result.root).toBe('हन्');
    });

    test('should handle IAST context', () => {
      const result = determineAangYamHanAtmanepada('someform', {
        root: 'yam',
        prefix: 'ā',
        transitivity: 'intransitive'
      });
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
      expect(result.prefix).toBe('ā');
      expect(result.root).toBe('yam');
    });

    test('should handle āṅ prefix variant', () => {
      const result = determineAangYamHanAtmanepada('someform', {
        root: 'han',
        prefix: 'āṅ',
        isIntransitive: true
      });
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
    });
  });

  describe('Intransitive requirement', () => {
    test('should require intransitive usage for आ + यम्', () => {
      const result = determineAangYamHanAtmanepada('someform', {
        root: 'यम्',
        prefix: 'आ',
        transitivity: 'transitive'
      });
      expect(result.isAangYamHanAtmanepada).toBe(false);
      expect(result.requiresIntransitive).toBe(true);
    });

    test('should require intransitive usage for आ + हन्', () => {
      const result = determineAangYamHanAtmanepada('someform', {
        root: 'हन्',
        prefix: 'आ'
        // no transitivity specified - should fail
      });
      expect(result.isAangYamHanAtmanepada).toBe(false);
      expect(result.requiresIntransitive).toBe(true);
    });

    test('should pass with explicit intransitive flag', () => {
      const result = determineAangYamHanAtmanepada('आयच्छते', {
        root: 'यम्',
        prefix: 'आ',
        isIntransitive: true
      });
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
    });

    test('should detect intransitive from ātmanepada endings', () => {
      const result = determineAangYamHanAtmanepada('आयच्छन्ते');
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.transitivity).toBe('intransitive');
    });

    test('should detect intransitive from self-directed meaning', () => {
      const result = determineAangYamHanAtmanepada('आयच्छते', {
        meaning: 'restrains oneself, controls oneself'
      });
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.transitivity).toBe('intransitive');
    });
  });

  describe('Meaning-based intransitive detection', () => {
    test('should detect restraint meanings as intransitive (यम्)', () => {
      const result = determineAangYamHanAtmanepada('आयच्छते', {
        meaning: 'to be restrained, to stop'
      });
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should detect self-control meanings as intransitive', () => {
      const result = determineAangYamHanAtmanepada('आयम्यते', {
        meaning: 'becomes controlled, restrains self'
      });
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should detect injury meanings as intransitive (हन्)', () => {
      const result = determineAangYamHanAtmanepada('आहन्यते', {
        meaning: 'to be struck, gets injured'
      });
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should detect self-striking meanings', () => {
      const result = determineAangYamHanAtmanepada('आहतते', {
        meaning: 'strikes self, injures oneself'
      });
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should handle Sanskrit meanings', () => {
      const result = determineAangYamHanAtmanepada('आघातते', {
        meaning: 'हन् - to be injured, आघात'
      });
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });
  });

  describe('Negative cases - should not apply', () => {
    test('should not detect यम् without आ prefix', () => {
      const result = determineAangYamHanAtmanepada('यच्छते');
      expect(result.isAangYamHanAtmanepada).toBe(false);
    });

    test('should not detect हन् without आ prefix', () => {
      const result = determineAangYamHanAtmanepada('हन्यते');
      expect(result.isAangYamHanAtmanepada).toBe(false);
    });

    test('should not detect आ with other roots', () => {
      const result = determineAangYamHanAtmanepada('आगच्छति');
      expect(result.isAangYamHanAtmanepada).toBe(false);
    });

    test('should not detect other prefixes + यम्', () => {
      const result = determineAangYamHanAtmanepada('प्रयच्छति');
      expect(result.isAangYamHanAtmanepada).toBe(false);
    });

    test('should not detect other prefixes + हन्', () => {
      const result = determineAangYamHanAtmanepada('संहन्ति');
      expect(result.isAangYamHanAtmanepada).toBe(false);
    });

    test('should not detect उद् + यम्', () => {
      const result = determineAangYamHanAtmanepada('उद्यच्छति');
      expect(result.isAangYamHanAtmanepada).toBe(false);
    });

    test('should not detect वि + हन्', () => {
      const result = determineAangYamHanAtmanepada('विहन्ति');
      expect(result.isAangYamHanAtmanepada).toBe(false);
    });

    test('should not detect simple यम्/हन् forms', () => {
      const result = determineAangYamHanAtmanepada('यमः');
      expect(result.isAangYamHanAtmanepada).toBe(false);
    });
  });

  describe('Error handling', () => {
    test('should handle null input', () => {
      const result = determineAangYamHanAtmanepada(null);
      expect(result.isAangYamHanAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle undefined input', () => {
      const result = determineAangYamHanAtmanepada(undefined);
      expect(result.isAangYamHanAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle empty string', () => {
      const result = determineAangYamHanAtmanepada('');
      expect(result.isAangYamHanAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle whitespace-only string', () => {
      const result = determineAangYamHanAtmanepada('   ');
      expect(result.isAangYamHanAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle non-string input', () => {
      const result = determineAangYamHanAtmanepada(123);
      expect(result.isAangYamHanAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle invalid Sanskrit words', () => {
      const result = determineAangYamHanAtmanepada('xyz123');
      expect(result.isAangYamHanAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('No आङ् + यम्/हन् pattern found');
    });
  });

  describe('Edge cases', () => {
    test('should handle mixed case input', () => {
      const result = determineAangYamHanAtmanepada('ĀyacchaTe');
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should handle extra whitespace', () => {
      const result = determineAangYamHanAtmanepada('  आयच्छते  ');
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should handle variant यम् forms', () => {
      const result = determineAangYamHanAtmanepada('आयम्य');
      expect(result.isAangYamHanAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.7);
    });

    test('should handle variant हन् forms', () => {
      const result = determineAangYamHanAtmanepada('आहत');
      expect(result.isAangYamHanAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.7);
    });

    test('should handle compound words containing आ + यम्', () => {
      const result = determineAangYamHanAtmanepada('स्वआयच्छते');
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should handle contextual ambiguity gracefully', () => {
      const result = determineAangYamHanAtmanepada('आहन्यते', {
        meaning: 'unclear context'
      });
      expect(result.isAangYamHanAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });
  });

  describe('Both roots support', () => {
    test('should handle both यम् and हन् roots equally', () => {
      const yamResult = determineAangYamHanAtmanepada('आयच्छते');
      const hanResult = determineAangYamHanAtmanepada('आहन्यते');
      
      expect(yamResult.isAangYamHanAtmanepada).toBe(true);
      expect(hanResult.isAangYamHanAtmanepada).toBe(true);
      expect(yamResult.root).toBe('यम्');
      expect(hanResult.root).toBe('हन्');
    });

    test('should handle IAST forms for both roots', () => {
      const yamResult = determineAangYamHanAtmanepada('āyacchate');
      const hanResult = determineAangYamHanAtmanepada('āhanyate');
      
      expect(yamResult.isAangYamHanAtmanepada).toBe(true);
      expect(hanResult.isAangYamHanAtmanepada).toBe(true);
      expect(yamResult.root).toBe('yam');
      expect(hanResult.root).toBe('han');
    });

    test('should maintain prefix consistency across roots', () => {
      const yamResult = determineAangYamHanAtmanepada('आयच्छते');
      const hanResult = determineAangYamHanAtmanepada('आहन्यते');
      
      expect(yamResult.prefix).toBe('आ');
      expect(hanResult.prefix).toBe('आ');
    });
  });

  describe('Helper function tests', () => {
    test('checkAangYamHanCombination should work correctly', () => {
      expect(checkAangYamHanCombination('आयच्छते')).toBe(true);
      expect(checkAangYamHanCombination('आहन्यते')).toBe(true);
      expect(checkAangYamHanCombination('āyacchate')).toBe(true);
      expect(checkAangYamHanCombination('āhanyate')).toBe(true);
      expect(checkAangYamHanCombination('यच्छते')).toBe(false);
      expect(checkAangYamHanCombination('उद्गम्')).toBe(false);
    });
  });

  describe('Sutra metadata', () => {
    test('should include correct sutra reference', () => {
      const result = determineAangYamHanAtmanepada('आयच्छते');
      expect(result.sutraApplied).toBe('1.3.28');
    });

    test('should include sutra reference even for negative cases', () => {
      const result = determineAangYamHanAtmanepada('यच्छति');
      expect(result.sutraApplied).toBe('1.3.28');
    });

    test('should include intransitive requirement flag', () => {
      const result = determineAangYamHanAtmanepada('someform', {
        root: 'यम्',
        prefix: 'आ'
      });
      expect(result.requiresIntransitive).toBe(true);
    });

    test('should include transitivity information', () => {
      const result = determineAangYamHanAtmanepada('आयच्छते', {
        isIntransitive: true
      });
      expect(result.transitivity).toBe('intransitive');
    });

    test('should handle both यम् and हन् in same test', () => {
      const yamResult = determineAangYamHanAtmanepada('आयच्छते');
      const hanResult = determineAangYamHanAtmanepada('आहन्यते');
      
      expect(yamResult.sutraApplied).toBe('1.3.28');
      expect(hanResult.sutraApplied).toBe('1.3.28');
      expect(yamResult.isAangYamHanAtmanepada).toBe(true);
      expect(hanResult.isAangYamHanAtmanepada).toBe(true);
    });
  });
});
