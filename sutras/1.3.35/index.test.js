/**
 * Test suite for Sutra 1.3.35: अकर्मकाच्च (akarmakācca)
 * 
 * Tests the rule that वि + कृ in intransitive usage takes आत्मनेपद
 */

import { sutra1335 } from './index.js';

describe('Sutra 1.3.35: अकर्मकाच्च', () => {
  
  describe('Input Validation', () => {
    test('should reject null/undefined input', () => {
      const result = sutra1335(null);
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
      expect(result.confidence).toBe(0);
    });

    test('should reject empty string', () => {
      const result = sutra1335('');
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });

    test('should reject non-string input', () => {
      const result = sutra1335(123);
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });
  });

  describe('IAST Script - वि + कृ Pattern Recognition', () => {
    test('should recognize basic vikar pattern', () => {
      const result = sutra1335('vikaroti', { isIntransitive: true });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should recognize vikṛ pattern', () => {
      const result = sutra1335('vikṛti', { isIntransitive: true });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should recognize compound vikṛ pattern', () => {
      const result = sutra1335('pūrvavikṛti', { isIntransitive: true });
      expect(result.applies).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
    });

    test('should recognize vyākar pattern', () => {
      const result = sutra1335('vyākaraṇa', { isIntransitive: true });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should reject pattern without vi prefix', () => {
      const result = sutra1335('karoti', { isIntransitive: true });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('does not contain वि + कृ');
    });

    test('should reject pattern without kṛ root', () => {
      const result = sutra1335('vimati', { isIntransitive: true });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('does not contain वि + कृ');
    });
  });

  describe('Devanagari Script - वि + कृ Pattern Recognition', () => {
    test('should recognize basic विकर् pattern', () => {
      const result = sutra1335('विकरोति', { isIntransitive: true });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should recognize विकृ pattern', () => {
      const result = sutra1335('विकृति', { isIntransitive: true });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should recognize compound विकृ pattern', () => {
      const result = sutra1335('पूर्वविकृति', { isIntransitive: true });
      expect(result.applies).toBe(true);
      expect(result.confidence).toBeGreaterThanOrEqual(0.9);
    });

    test('should recognize व्याकर् pattern', () => {
      const result = sutra1335('व्याकरण', { isIntransitive: true });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should reject pattern without वि prefix', () => {
      const result = sutra1335('करोति', { isIntransitive: true });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('does not contain वि + कृ');
    });
  });

  describe('Intransitive Usage Analysis', () => {
    test('should apply when explicitly marked as intransitive', () => {
      const result = sutra1335('vikaroti', { isIntransitive: true });
      expect(result.applies).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.85);
    });

    test('should not apply when explicitly marked as transitive', () => {
      const result = sutra1335('vikaroti', { isIntransitive: false });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Explicitly marked as transitive');
    });

    test('should apply when no direct object present', () => {
      const result = sutra1335('vikaroti', { hasDirectObject: false });
      expect(result.applies).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should not apply when direct object present', () => {
      const result = sutra1335('vikaroti', { hasDirectObject: true });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Direct object present');
    });

    test('should apply for intransitive semantic meanings', () => {
      const result = sutra1335('vikṛti', { meaning: 'to become transformed' });
      expect(result.applies).toBe(true);
      expect(result.reason).toMatch(/Semantic meaning suggests intransitive|Sutra 1\.3\.35/);
    });

    test('should not apply for transitive semantic meanings', () => {
      const result = sutra1335('vikaroti', { meaning: 'to make something different' });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Semantic meaning suggests transitive');
    });

    test('should default to transitive when insufficient context', () => {
      const result = sutra1335('vikaroti');
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Insufficient context');
      expect(result.confidence).toBeLessThan(0.5);
    });
  });

  describe('Combined Analysis - Positive Cases', () => {
    test('विकुरुते (reflexive/intransitive)', () => {
      const result = sutra1335('vikurute', { 
        isIntransitive: true, 
        meaning: 'transforms oneself' 
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.analysis.prefix).toBe('वि');
      expect(result.analysis.root).toBe('कृ');
    });

    test('विकृतिः (nominal form from intransitive usage)', () => {
      const result = sutra1335('vikṛtiḥ', { 
        isIntransitive: true,
        meaning: 'transformation, change'
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('व्याकरणम् (self-directed grammatical analysis)', () => {
      const result = sutra1335('vyākaraṇam', { 
        hasDirectObject: false,
        meaning: 'grammatical analysis as self-directed activity'
      });
      expect(result.applies).toBe(true);
    });

    test('संविकारः (compound with वि + कृ)', () => {
      const result = sutra1335('saṃvikāraḥ', { isIntransitive: true });
      expect(result.applies).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
    });
  });

  describe('Combined Analysis - Negative Cases', () => {
    test('विकरोति घटम् (transitive with object)', () => {
      const result = sutra1335('vikaroti ghaṭam', { 
        hasDirectObject: true,
        meaning: 'makes a pot differently'
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Direct object present');
    });

    test('करोति (no वि prefix)', () => {
      const result = sutra1335('karoti', { isIntransitive: true });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('does not contain वि + कृ');
    });

    test('विगच्छति (वि + गम्, not कृ)', () => {
      const result = sutra1335('vigacchati', { isIntransitive: true });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('does not contain वि + कृ');
    });

    test('निकरोति (नि prefix, not वि)', () => {
      const result = sutra1335('nikaroti', { isIntransitive: true });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('does not contain वि + कृ');
    });
  });

  describe('Edge Cases', () => {
    test('should handle mixed script input gracefully', () => {
      const result = sutra1335('vikṛti विकृति', { isIntransitive: true });
      // Should detect as mixed and potentially handle first valid part
      expect(result.confidence).toBeGreaterThan(0);
    });

    test('should handle whitespace around input', () => {
      const result = sutra1335('  vikaroti  ', { isIntransitive: true });
      expect(result.applies).toBe(true);
    });

    test('should handle case variations in IAST', () => {
      const result = sutra1335('VIKAROTI', { isIntransitive: true });
      expect(result.applies).toBe(true);
    });

    test('should maintain confidence levels appropriately', () => {
      const explicit = sutra1335('vikaroti', { isIntransitive: true });
      const inferred = sutra1335('vikaroti', { hasDirectObject: false });
      const unclear = sutra1335('vikaroti', { meaning: 'some activity' });
      
      expect(explicit.confidence).toBeGreaterThan(inferred.confidence);
      expect(inferred.confidence).toBeGreaterThan(unclear.confidence);
    });
  });

  describe('Sutra Integration', () => {
    test('should provide complete analysis object', () => {
      const result = sutra1335('vikṛti', { isIntransitive: true });
      expect(result).toHaveProperty('applies');
      expect(result).toHaveProperty('reason');
      expect(result).toHaveProperty('isAtmanepada');
      expect(result).toHaveProperty('confidence');
      expect(result).toHaveProperty('analysis');
      expect(result.analysis).toHaveProperty('prefix');
      expect(result.analysis).toHaveProperty('root');
      expect(result.analysis).toHaveProperty('usage');
      expect(result.analysis).toHaveProperty('script');
    });

    test('should work with traditional grammatical examples', () => {
      // Classical example from grammar texts
      const result = sutra1335('विकुरुते', { 
        isIntransitive: true,
        meaning: 'undergoes transformation'
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThanOrEqual(0.9);
    });
  });

  describe('Performance and Reliability', () => {
    test('should handle large number of calls efficiently', () => {
      const start = Date.now();
      for (let i = 0; i < 1000; i++) {
        sutra1335('vikaroti', { isIntransitive: true });
      }
      const duration = Date.now() - start;
      expect(duration).toBeLessThan(1000); // Should complete within 1 second
    });

    test('should be consistent across multiple calls', () => {
      const word = 'vikṛti';
      const context = { isIntransitive: true };
      
      const results = [];
      for (let i = 0; i < 10; i++) {
        results.push(sutra1335(word, context));
      }
      
      // All results should be identical
      const first = results[0];
      results.forEach(result => {
        expect(result.applies).toBe(first.applies);
        expect(result.confidence).toBe(first.confidence);
        expect(result.isAtmanepada).toBe(first.isAtmanepada);
      });
    });
  });
});
