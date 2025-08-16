/**
 * Test Suite for Sutra 1.3.29: समो गम्यृच्छिप्रच्छिस्वरत्यर्तिश्रुविदिभ्यः
 * Tests ātmanepada assignment for specified roots with सम् prefix (intransitive)
 */

import { determineSamSpecificRootsAtmanepada, checkSamSpecificRootCombination } from './index.js';

describe('Sutra 1.3.29: समो गम्यृच्छिप्रच्छिस्वरत्यर्तिश्रुविदिभ्यः (samo gamayṛcachiparacachisavaratayaratiśaruvidibhayaḥ)', () => {

  describe('Valid सम् + गम् combinations (intransitive)', () => {
    test('should detect संगच्छते (saṃgacchate) as ātmanepada', () => {
      const result = determineSamSpecificRootsAtmanepada('संगच्छते');
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('सम्');
      expect(result.root).toBe('गम्');
    });

    test('should detect saṃgacchate (IAST) as ātmanepada', () => {
      const result = determineSamSpecificRootsAtmanepada('saṃgacchate');
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('sam');
      expect(result.root).toBe('gam');
    });

    test('should detect संगतते (saṃgatate) as ātmanepada', () => {
      const result = determineSamSpecificRootsAtmanepada('संगतते');
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should detect संगच्छन्ते (saṃgacchante) as ātmanepada', () => {
      const result = determineSamSpecificRootsAtmanepada('संगच्छन्ते');
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('Valid सम् + प्रच्छ् combinations (intransitive)', () => {
    test('should detect संप्रच्छते (saṃpracchate) as ātmanepada', () => {
      const result = determineSamSpecificRootsAtmanepada('संप्रच्छते');
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('सम्');
      expect(result.root).toBe('प्रच्छ्');
    });

    test('should detect संपृच्छते (saṃpṛcchate) as ātmanepada', () => {
      const result = determineSamSpecificRootsAtmanepada('संपृच्छते');
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.root).toBe('प्रच्छ्');
    });

    test('should detect saṃpracchate (IAST) as ātmanepada', () => {
      const result = determineSamSpecificRootsAtmanepada('saṃpracchate');
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('sam');
    });
  });

  describe('Valid सम् + श्रु combinations (intransitive)', () => {
    test('should detect संश्रुते (saṃśrute) as ātmanepada', () => {
      const result = determineSamSpecificRootsAtmanepada('संश्रुते');
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('सम्');
      expect(result.root).toBe('श्रु');
    });

    test('should detect संशृणोते (saṃśṛṇoti) as ātmanepada', () => {
      const result = determineSamSpecificRootsAtmanepada('संशृणोते');
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.root).toBe('श्रु');
    });

    test('should detect saṃśrute (IAST) as ātmanepada', () => {
      const result = determineSamSpecificRootsAtmanepada('saṃśrute');
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('sam');
    });
  });

  describe('Valid सम् + विद् combinations (intransitive)', () => {
    test('should detect संविद्यते (saṃvidyate) as ātmanepada', () => {
      const result = determineSamSpecificRootsAtmanepada('संविद्यते');
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('सम्');
      expect(result.root).toBe('विद्');
    });

    test('should detect संवेत्ते (saṃvette) as ātmanepada', () => {
      const result = determineSamSpecificRootsAtmanepada('संवेत्ते');
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.root).toBe('विद्');
    });

    test('should detect saṃvidyate (IAST) as ātmanepada', () => {
      const result = determineSamSpecificRootsAtmanepada('saṃvidyate');
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('sam');
    });
  });

  describe('Valid सम् + other specified roots', () => {
    test('should detect संऋच्छते (saṃṛcchate) as ātmanepada', () => {
      const result = determineSamSpecificRootsAtmanepada('संऋच्छते');
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('सम्');
      expect(result.root).toBe('ऋच्छ्');
    });

    test('should detect संस्वरते (saṃsvarate) as ātmanepada', () => {
      const result = determineSamSpecificRootsAtmanepada('संस्वरते');
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.root).toBe('स्वर्');
    });

    test('should detect संऋते (saṃṛte) as ātmanepada', () => {
      const result = determineSamSpecificRootsAtmanepada('संऋते');
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.root).toBe('ऋ');
    });
  });

  describe('Context-based analysis', () => {
    test('should handle explicit root and prefix context (गम्)', () => {
      const result = determineSamSpecificRootsAtmanepada('someform', {
        root: 'गम्',
        prefix: 'सम्',
        transitivity: 'intransitive'
      });
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
      expect(result.prefix).toBe('सम्');
      expect(result.root).toBe('गम्');
    });

    test('should handle explicit root and prefix context (श्रु)', () => {
      const result = determineSamSpecificRootsAtmanepada('someform', {
        root: 'श्रु',
        prefix: 'सम्',
        isIntransitive: true
      });
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
      expect(result.root).toBe('श्रु');
    });

    test('should handle IAST context', () => {
      const result = determineSamSpecificRootsAtmanepada('someform', {
        root: 'vid',
        prefix: 'sam',
        transitivity: 'intransitive'
      });
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
      expect(result.prefix).toBe('sam');
      expect(result.root).toBe('vid');
    });

    test('should handle multiple specified roots', () => {
      const gamResult = determineSamSpecificRootsAtmanepada('someform', {
        root: 'gam',
        prefix: 'sam',
        isIntransitive: true
      });
      const sruResult = determineSamSpecificRootsAtmanepada('someform', {
        root: 'śru',
        prefix: 'sam',
        isIntransitive: true
      });
      
      expect(gamResult.isSamSpecificRootsAtmanepada).toBe(true);
      expect(sruResult.isSamSpecificRootsAtmanepada).toBe(true);
    });
  });

  describe('Intransitive requirement', () => {
    test('should require intransitive usage for सम् + गम्', () => {
      const result = determineSamSpecificRootsAtmanepada('someform', {
        root: 'गम्',
        prefix: 'सम्',
        transitivity: 'transitive'
      });
      expect(result.isSamSpecificRootsAtmanepada).toBe(false);
      expect(result.requiresIntransitive).toBe(true);
    });

    test('should require intransitive usage for सम् + विद्', () => {
      const result = determineSamSpecificRootsAtmanepada('someform', {
        root: 'विद्',
        prefix: 'सम्'
        // no transitivity specified - should fail
      });
      expect(result.isSamSpecificRootsAtmanepada).toBe(false);
      expect(result.requiresIntransitive).toBe(true);
    });

    test('should pass with explicit intransitive flag', () => {
      const result = determineSamSpecificRootsAtmanepada('संगच्छते', {
        root: 'गम्',
        prefix: 'सम्',
        isIntransitive: true
      });
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
    });

    test('should detect intransitive from ātmanepada endings', () => {
      const result = determineSamSpecificRootsAtmanepada('संगच्छन्ते');
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.transitivity).toBe('intransitive');
    });
  });

  describe('Meaning-based intransitive detection', () => {
    test('should detect collective meanings as intransitive (गम्)', () => {
      const result = determineSamSpecificRootsAtmanepada('संगच्छते', {
        meaning: 'comes together, meets'
      });
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should detect joining meanings as intransitive', () => {
      const result = determineSamSpecificRootsAtmanepada('संगतते', {
        meaning: 'joins together, unites'
      });
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should detect hearing meanings as intransitive (श्रु)', () => {
      const result = determineSamSpecificRootsAtmanepada('संश्रुते', {
        meaning: 'hears together, listens'
      });
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should detect knowledge meanings as intransitive (विद्)', () => {
      const result = determineSamSpecificRootsAtmanepada('संवेत्ते', {
        meaning: 'comes to understand, gets to know'
      });
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should detect becoming meanings as intransitive', () => {
      const result = determineSamSpecificRootsAtmanepada('संऋच्छते', {
        meaning: 'becomes hard, gets firm'
      });
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('Negative cases - should not apply', () => {
    test('should not detect specified roots without सम् prefix', () => {
      const result = determineSamSpecificRootsAtmanepada('गच्छति');
      expect(result.isSamSpecificRootsAtmanepada).toBe(false);
    });

    test('should not detect विद् without सम् prefix', () => {
      const result = determineSamSpecificRootsAtmanepada('वेत्ति');
      expect(result.isSamSpecificRootsAtmanepada).toBe(false);
    });

    test('should not detect सम् with non-specified roots', () => {
      const result = determineSamSpecificRootsAtmanepada('संकृ');
      expect(result.isSamSpecificRootsAtmanepada).toBe(false);
    });

    test('should not detect other prefixes + specified roots', () => {
      const result = determineSamSpecificRootsAtmanepada('प्रगच्छति');
      expect(result.isSamSpecificRootsAtmanepada).toBe(false);
    });

    test('should not detect उद् + गम्', () => {
      const result = determineSamSpecificRootsAtmanepada('उद्गच्छति');
      expect(result.isSamSpecificRootsAtmanepada).toBe(false);
    });

    test('should not detect वि + श्रु', () => {
      const result = determineSamSpecificRootsAtmanepada('विश्रुते');
      expect(result.isSamSpecificRootsAtmanepada).toBe(false);
    });

    test('should not detect अभि + विद्', () => {
      const result = determineSamSpecificRootsAtmanepada('अभिवेत्ति');
      expect(result.isSamSpecificRootsAtmanepada).toBe(false);
    });

    test('should not detect simple specified root forms', () => {
      const result = determineSamSpecificRootsAtmanepada('गमः');
      expect(result.isSamSpecificRootsAtmanepada).toBe(false);
    });
  });

  describe('Error handling', () => {
    test('should handle null input', () => {
      const result = determineSamSpecificRootsAtmanepada(null);
      expect(result.isSamSpecificRootsAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle undefined input', () => {
      const result = determineSamSpecificRootsAtmanepada(undefined);
      expect(result.isSamSpecificRootsAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle empty string', () => {
      const result = determineSamSpecificRootsAtmanepada('');
      expect(result.isSamSpecificRootsAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle whitespace-only string', () => {
      const result = determineSamSpecificRootsAtmanepada('   ');
      expect(result.isSamSpecificRootsAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle non-string input', () => {
      const result = determineSamSpecificRootsAtmanepada(123);
      expect(result.isSamSpecificRootsAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle invalid Sanskrit words', () => {
      const result = determineSamSpecificRootsAtmanepada('xyz123');
      expect(result.isSamSpecificRootsAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid Sanskrit word');
    });
  });

  describe('Edge cases', () => {
    test('should handle mixed case input', () => {
      const result = determineSamSpecificRootsAtmanepada('SaṃGacchaTe');
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should handle extra whitespace', () => {
      const result = determineSamSpecificRootsAtmanepada('  संगच्छते  ');
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should handle variant गम् forms', () => {
      const result = determineSamSpecificRootsAtmanepada('संगम्य');
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should handle variant विद् forms', () => {
      const result = determineSamSpecificRootsAtmanepada('संविदत्');
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should handle compound words containing सम् + specified roots', () => {
      const result = determineSamSpecificRootsAtmanepada('महासंगच्छते');
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should handle contextual ambiguity gracefully', () => {
      const result = determineSamSpecificRootsAtmanepada('संश्रुते', {
        meaning: 'unclear context'
      });
      expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });
  });

  describe('Multiple roots support', () => {
    test('should handle all specified roots correctly', () => {
      const gamResult = determineSamSpecificRootsAtmanepada('संगच्छते');
      const pracchResult = determineSamSpecificRootsAtmanepada('संपृच्छते');
      const sruResult = determineSamSpecificRootsAtmanepada('संश्रुते');
      const vidResult = determineSamSpecificRootsAtmanepada('संविद्यते');
      
      expect(gamResult.isSamSpecificRootsAtmanepada).toBe(true);
      expect(pracchResult.isSamSpecificRootsAtmanepada).toBe(true);
      expect(sruResult.isSamSpecificRootsAtmanepada).toBe(true);
      expect(vidResult.isSamSpecificRootsAtmanepada).toBe(true);
    });

    test('should handle IAST forms for all roots', () => {
      const gamResult = determineSamSpecificRootsAtmanepada('saṃgacchate');
      const pracchResult = determineSamSpecificRootsAtmanepada('saṃpṛcchate');
      const sruResult = determineSamSpecificRootsAtmanepada('saṃśrute');
      const vidResult = determineSamSpecificRootsAtmanepada('saṃvidyate');
      
      expect(gamResult.isSamSpecificRootsAtmanepada).toBe(true);
      expect(pracchResult.isSamSpecificRootsAtmanepada).toBe(true);
      expect(sruResult.isSamSpecificRootsAtmanepada).toBe(true);
      expect(vidResult.isSamSpecificRootsAtmanepada).toBe(true);
    });

    test('should maintain prefix consistency across all roots', () => {
      const results = [
        determineSamSpecificRootsAtmanepada('संगच्छते'),
        determineSamSpecificRootsAtmanepada('संश्रुते'),
        determineSamSpecificRootsAtmanepada('संविद्यते')
      ];
      
      results.forEach(result => {
        expect(result.prefix).toBe('सम्');
        expect(result.isSamSpecificRootsAtmanepada).toBe(true);
      });
    });
  });

  describe('Helper function tests', () => {
    test('checkSamSpecificRootCombination should work correctly', () => {
      expect(checkSamSpecificRootCombination('संगच्छते')).toBe(true);
      expect(checkSamSpecificRootCombination('संश्रुते')).toBe(true);
      expect(checkSamSpecificRootCombination('संविद्यते')).toBe(true);
      expect(checkSamSpecificRootCombination('saṃgacchate')).toBe(true);
      expect(checkSamSpecificRootCombination('saṃśrute')).toBe(true);
      expect(checkSamSpecificRootCombination('गच्छति')).toBe(false);
      expect(checkSamSpecificRootCombination('उद्गम्')).toBe(false);
    });
  });

  describe('Sutra metadata', () => {
    test('should include correct sutra reference', () => {
      const result = determineSamSpecificRootsAtmanepada('संगच्छते');
      expect(result.sutraApplied).toBe('1.3.29');
    });

    test('should include sutra reference even for negative cases', () => {
      const result = determineSamSpecificRootsAtmanepada('गच्छति');
      expect(result.sutraApplied).toBe('1.3.29');
    });

    test('should include intransitive requirement flag', () => {
      const result = determineSamSpecificRootsAtmanepada('someform', {
        root: 'गम्',
        prefix: 'सम्'
      });
      expect(result.requiresIntransitive).toBe(true);
    });

    test('should include transitivity information', () => {
      const result = determineSamSpecificRootsAtmanepada('संगच्छते', {
        isIntransitive: true
      });
      expect(result.transitivity).toBe('intransitive');
    });

    test('should handle all specified roots in same test', () => {
      const roots = ['गम्', 'श्रु', 'विद्', 'प्रच्छ्'];
      const words = ['संगच्छते', 'संश्रुते', 'संविद्यते', 'संपृच्छते'];
      
      words.forEach((word, index) => {
        const result = determineSamSpecificRootsAtmanepada(word);
        expect(result.sutraApplied).toBe('1.3.29');
        expect(result.isSamSpecificRootsAtmanepada).toBe(true);
        expect(result.root).toBe(roots[index]);
      });
    });
  });
});
