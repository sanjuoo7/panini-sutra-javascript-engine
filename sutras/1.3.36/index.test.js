/**
 * Test suite for Sutra 1.3.36: सम्माननोत्सञ्जनाचार्यकरणज्ञानभृतिविगणनव्ययेषु नियः
 * 
 * Tests the rule that नी in specific semantic contexts takes आत्मनेपद
 */

import { sutra1336 } from './index.js';

describe('Sutra 1.3.36: सम्माननोत्सञ्जनाचार्यकरणज्ञानभृतिविगणनव्ययेषु नियः', () => {
  
  describe('Input Validation', () => {
    test('should reject null/undefined input', () => {
      const result = sutra1336(null);
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
      expect(result.confidence).toBe(0);
    });

    test('should reject empty string', () => {
      const result = sutra1336('');
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });

    test('should reject non-string input', () => {
      const result = sutra1336(123);
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });
  });

  describe('IAST Script - नी Root Recognition', () => {
    test('should recognize basic nī pattern', () => {
      const result = sutra1336('nīte', { semanticField: 'sammāna' });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should recognize naya pattern', () => {
      const result = sutra1336('nayati', { meaning: 'to guide and render worthy' });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should recognize prefixed nī patterns', () => {
      const result = sutra1336('ānīte', { semanticField: 'utsañjana' });
      expect(result.applies).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
    });

    test('should recognize netṛ pattern', () => {
      const result = sutra1336('netā', { meaning: 'spiritual guide' });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should reject pattern without nī root', () => {
      const result = sutra1336('karoti', { semanticField: 'sammāna' });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('does not contain नी root');
    });
  });

  describe('Devanagari Script - नी Root Recognition', () => {
    test('should recognize basic नी pattern', () => {
      const result = sutra1336('नीते', { semanticField: 'sammāna' });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should recognize नय pattern', () => {
      const result = sutra1336('नयति', { meaning: 'to guide and render worthy' });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should recognize prefixed नी patterns', () => {
      const result = sutra1336('आनीते', { semanticField: 'utsañjana' });
      expect(result.applies).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
    });

    test('should recognize नेतृ pattern', () => {
      const result = sutra1336('नेता', { meaning: 'spiritual guide' });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should reject pattern without नी root', () => {
      const result = sutra1336('करोति', { semanticField: 'sammāna' });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('does not contain नी root');
    });
  });

  describe('Semantic Context Analysis - sammāna (सम्मान)', () => {
    test('should apply for "guide" meaning', () => {
      const result = sutra1336('nayate', { meaning: 'to guide so as to render worthy' });
      expect(result.applies).toBe(true);
      expect(result.analysis.semanticField).toBe('sammāna');
    });

    test('should apply for "render worthy" meaning', () => {
      const result = sutra1336('nīte', { meaning: 'make worthy of honor' });
      expect(result.applies).toBe(true);
      expect(result.confidence).toBeGreaterThanOrEqual(0.85);
    });

    test('should apply for explicit sammāna semantic field', () => {
      const result = sutra1336('nayati', { semanticField: 'sammāna' });
      expect(result.applies).toBe(true);
      expect(result.confidence).toBeGreaterThanOrEqual(0.85);
    });
  });

  describe('Semantic Context Analysis - utsañjana (उत्सञ्जन)', () => {
    test('should apply for "lift up" meaning', () => {
      const result = sutra1336('unnayate', { meaning: 'to lift up' });
      expect(result.applies).toBe(true);
      expect(result.analysis.semanticField).toBe('utsañjana');
    });

    test('should apply for "elevate" meaning', () => {
      const result = sutra1336('nīte', { meaning: 'elevate and uplift' });
      expect(result.applies).toBe(true);
      expect(result.confidence).toBeGreaterThanOrEqual(0.85);
    });

    test('should apply for explicit utsañjana semantic field', () => {
      const result = sutra1336('nayati', { semanticField: 'utsañjana' });
      expect(result.applies).toBe(true);
      expect(result.confidence).toBeGreaterThanOrEqual(0.85);
    });
  });

  describe('Semantic Context Analysis - ācārya (आचार्य)', () => {
    test('should apply for "spiritual guide" meaning', () => {
      const result = sutra1336('nayate', { meaning: 'make one a spiritual guide' });
      expect(result.applies).toBe(true);
      expect(result.analysis.semanticField).toBe('ācārya');
    });

    test('should apply for "teacher" meaning', () => {
      const result = sutra1336('nīte', { meaning: 'guide as teacher' });
      expect(result.applies).toBe(true);
      expect(result.confidence).toBeGreaterThanOrEqual(0.85);
    });

    test('should apply for teacher object', () => {
      const result = sutra1336('nayati', { object: 'teacher' });
      expect(result.applies).toBe(true);
      expect(result.analysis.semanticField).toBe('ācārya');
    });
  });

  describe('Semantic Context Analysis - jñāna (ज्ञान)', () => {
    test('should apply for "true sense" meaning', () => {
      const result = sutra1336('nayate', { meaning: 'to determine the true sense' });
      expect(result.applies).toBe(true);
      expect(result.analysis.semanticField).toBe('jñāna');
    });

    test('should apply for "knowledge" meaning', () => {
      const result = sutra1336('nīte', { meaning: 'lead to knowledge' });
      expect(result.applies).toBe(true);
      expect(result.confidence).toBeGreaterThanOrEqual(0.85);
    });

    test('should apply for wisdom object', () => {
      const result = sutra1336('nayati', { object: 'wisdom' });
      expect(result.applies).toBe(true);
      expect(result.analysis.semanticField).toBe('jñāna');
    });
  });

  describe('Semantic Context Analysis - bhṛti (भृति)', () => {
    test('should apply for "employ on wages" meaning', () => {
      const result = sutra1336('nayate', { meaning: 'to employ on wages' });
      expect(result.applies).toBe(true);
      expect(result.analysis.semanticField).toBe('bhṛti');
    });

    test('should apply for "hire" meaning', () => {
      const result = sutra1336('nīte', { meaning: 'hire for employment' });
      expect(result.applies).toBe(true);
      expect(result.confidence).toBeGreaterThanOrEqual(0.85);
    });

    test('should apply for wages object', () => {
      const result = sutra1336('nayati', { object: 'wages' });
      expect(result.applies).toBe(true);
      expect(result.analysis.semanticField).toBe('bhṛti');
    });
  });

  describe('Semantic Context Analysis - vigaṇana (विगणन)', () => {
    test('should apply for "pay debt" meaning', () => {
      const result = sutra1336('nayate', { meaning: 'to pay debt' });
      expect(result.applies).toBe(true);
      expect(result.analysis.semanticField).toBe('vigaṇana');
    });

    test('should apply for "discharge debt" meaning', () => {
      const result = sutra1336('nīte', { meaning: 'discharge obligation' });
      expect(result.applies).toBe(true);
      expect(result.confidence).toBeGreaterThanOrEqual(0.85);
    });

    test('should apply for debt object', () => {
      const result = sutra1336('nayati', { object: 'debt' });
      expect(result.applies).toBe(true);
      expect(result.analysis.semanticField).toBe('vigaṇana');
    });
  });

  describe('Semantic Context Analysis - vyaya (व्यय)', () => {
    test('should apply for "charity" meaning', () => {
      const result = sutra1336('nayate', { meaning: 'give as in charity' });
      expect(result.applies).toBe(true);
      expect(result.analysis.semanticField).toBe('vyaya');
    });

    test('should apply for "donation" meaning', () => {
      const result = sutra1336('nīte', { meaning: 'lead to donation' });
      expect(result.applies).toBe(true);
      expect(result.confidence).toBeGreaterThanOrEqual(0.85);
    });

    test('should apply for charity object', () => {
      const result = sutra1336('nayati', { object: 'charity' });
      expect(result.applies).toBe(true);
      expect(result.analysis.semanticField).toBe('vyaya');
    });
  });

  describe('Combined Analysis - Positive Cases', () => {
    test('सम्मननाति (honors/guides with respect)', () => {
      const result = sutra1336('sammannayati', { 
        meaning: 'guides so as to render worthy',
        semanticField: 'sammāna'
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
    });

    test('उत्सञ्जयते (lifts up)', () => {
      const result = sutra1336('unnayate', { 
        meaning: 'lifts up and elevates',
        semanticField: 'utsañjana'
      });
      expect(result.applies).toBe(true);
      expect(result.analysis.semanticField).toBe('utsañjana');
    });

    test('आचार्यीकरोति through नी (makes into teacher)', () => {
      const result = sutra1336('ācāryīkṛtanīte', { 
        meaning: 'makes one a spiritual guide',
        object: 'guru'
      });
      expect(result.applies).toBe(true);
      expect(result.analysis.semanticField).toBe('ācārya');
    });

    test('ज्ञाननयनम् (leading to knowledge)', () => {
      const result = sutra1336('jñānanayanaṃ', { 
        meaning: 'determine the true sense',
        object: 'knowledge'
      });
      expect(result.applies).toBe(true);
      expect(result.analysis.semanticField).toBe('jñāna');
    });
  });

  describe('Combined Analysis - Negative Cases', () => {
    test('नयति in general sense (ordinary leading)', () => {
      const result = sutra1336('nayati', { 
        meaning: 'leads in general way'
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('not used in specific contexts');
    });

    test('गच्छति (wrong root)', () => {
      const result = sutra1336('gacchati', { 
        semanticField: 'sammāna'
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('does not contain नी root');
    });

    test('नयति without specific context', () => {
      const result = sutra1336('nayati');
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('not used in specific contexts');
    });

    test('नी in wrong semantic field', () => {
      const result = sutra1336('nayati', { 
        meaning: 'leads the army to battle'
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('not used in specific contexts');
    });
  });

  describe('Edge Cases', () => {
    test('should handle mixed script input gracefully', () => {
      const result = sutra1336('nīte नीते', { semanticField: 'sammāna' });
      expect(result.applies).toBe(true);
      expect(result.confidence).toBeGreaterThan(0);
    });

    test('should handle whitespace around input', () => {
      const result = sutra1336('  nayate  ', { semanticField: 'sammāna' });
      expect(result.applies).toBe(true);
    });

    test('should handle case variations in IAST', () => {
      const result = sutra1336('NAYATE', { semanticField: 'sammāna' });
      expect(result.applies).toBe(true);
    });

    test('should handle multiple semantic keywords', () => {
      const result = sutra1336('nayate', { 
        meaning: 'guide and lift up to render worthy as teacher'
      });
      expect(result.applies).toBe(true);
      // Should pick the first matching context
    });

    test('should maintain confidence levels appropriately', () => {
      const explicit = sutra1336('nayate', { semanticField: 'sammāna' });
      const meaning = sutra1336('nayate', { meaning: 'guide worthily' });
      const object = sutra1336('nayate', { object: 'teacher' });
      
      expect(explicit.confidence).toBeGreaterThanOrEqual(meaning.confidence);
      expect(meaning.confidence).toBeGreaterThan(object.confidence);
    });
  });

  describe('Agent Benefit Analysis', () => {
    test('should note when action does not benefit agent', () => {
      const result = sutra1336('nayate', { 
        semanticField: 'vyaya',
        benefitsAgent: false
      });
      expect(result.applies).toBe(true);
      expect(result.analysis.benefitsAgent).toBe(false);
    });

    test('should work even when agent benefits (not required)', () => {
      const result = sutra1336('nayate', { 
        semanticField: 'sammāna',
        benefitsAgent: true
      });
      expect(result.applies).toBe(true);
      expect(result.analysis.benefitsAgent).toBe(true);
    });
  });

  describe('Sutra Integration', () => {
    test('should provide complete analysis object', () => {
      const result = sutra1336('nayate', { semanticField: 'sammāna' });
      expect(result).toHaveProperty('applies');
      expect(result).toHaveProperty('reason');
      expect(result).toHaveProperty('isAtmanepada');
      expect(result).toHaveProperty('confidence');
      expect(result).toHaveProperty('analysis');
      expect(result.analysis).toHaveProperty('root');
      expect(result.analysis).toHaveProperty('semanticField');
      expect(result.analysis).toHaveProperty('script');
      expect(result.analysis).toHaveProperty('benefitsAgent');
    });

    test('should work with traditional grammatical examples', () => {
      const result = sutra1336('सम्मानयते', { 
        meaning: 'guides so as to render the person worthy of honor'
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
    });
  });

  describe('Performance and Reliability', () => {
    test('should handle large number of calls efficiently', () => {
      const start = Date.now();
      for (let i = 0; i < 1000; i++) {
        sutra1336('nayate', { semanticField: 'sammāna' });
      }
      const duration = Date.now() - start;
      expect(duration).toBeLessThan(1000); // Should complete within 1 second
    });

    test('should be consistent across multiple calls', () => {
      const word = 'nayate';
      const context = { semanticField: 'sammāna' };
      
      const results = [];
      for (let i = 0; i < 10; i++) {
        results.push(sutra1336(word, context));
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
