/**
 * Tests for Sanskrit Sutra 1.3.17: नेर्विशः
 * 
 * Tests the ni+viś specific ātmanepada rule
 */

import { 
  determineNiVisAtmanepada, 
  hasNiVisCombination 
} from './index.js';

describe('Sutra 1.3.17: नेर्विशः (Ni+Viś Specific Rule)', () => {
  
  describe('determineNiVisAtmanepada', () => {
    
    test('should handle invalid input', () => {
      expect(determineNiVisAtmanepada()).toEqual({
        success: false,
        error: 'Invalid verb: must be a non-empty string',
        verb: undefined
      });
      
      expect(determineNiVisAtmanepada('')).toEqual({
        success: false,
        error: 'Invalid verb: must be a non-empty string',
        verb: ''
      });
      
      expect(determineNiVisAtmanepada(123)).toEqual({
        success: false,
        error: 'Invalid verb: must be a non-empty string',
        verb: 123
      });
    });

    test('should detect ni+viś combination from compound verb', () => {
      const niVisVerbs = ['niviś', 'निविश्'];
      
      for (const verb of niVisVerbs) {
        const result = determineNiVisAtmanepada(verb);
        expect(result.success).toBe(true);
        expect(result.isAtmanepada).toBe(true);
        expect(result.combinationType).toBe('ni_vis');
        expect(result.confidence).toBeGreaterThan(0.8);
        expect(result.reason).toContain('Ni+viś combination');
      }
    });

    test('should detect ni+viś from separate prefix context', () => {
      const result = determineNiVisAtmanepada('viś', {
        prefix: 'ni'
      });
      
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.combinationType).toBe('ni_vis');
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should detect ni+viś from prefixes array', () => {
      const result = determineNiVisAtmanepada('विश्', {
        prefixes: ['pra', 'ni', 'upa']
      });
      
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.combinationType).toBe('ni_vis');
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should detect ni+viś from compound field', () => {
      const result = determineNiVisAtmanepada('viś', {
        compound: 'ni-viś-combination'
      });
      
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.combinationType).toBe('ni_vis');
    });

    test('should detect ni+viś from expression', () => {
      const result = determineNiVisAtmanepada('viś', {
        expression: 'The verb viś preceded by ni prefix'
      });
      
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.combinationType).toBe('ni_vis');
    });

    test('should handle viś without ni prefix', () => {
      const result = determineNiVisAtmanepada('viś', {
        prefix: 'pra'
      });
      
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(false);
      expect(result.combinationType).toBe('vis_only');
      expect(result.reason).toContain('Viś root without ni prefix');
    });

    test('should handle ni prefix without viś root', () => {
      const result = determineNiVisAtmanepada('gam', {
        prefix: 'ni'
      });
      
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(false);
      expect(result.combinationType).toBe('ni_only');
      expect(result.reason).toContain('Ni prefix without viś root');
    });

    test('should handle verbs with no ni or viś', () => {
      const result = determineNiVisAtmanepada('gam', {
        prefix: 'pra'
      });
      
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(false);
      expect(result.combinationType).toBe('none');
      expect(result.reason).toContain('No ni+viś combination detected');
    });

    test('should handle force flag for testing', () => {
      const result = determineNiVisAtmanepada('test', { forceNiVis: true });
      expect(result.isAtmanepada).toBe(true);
      expect(result.combinationType).toBe('ni_vis');
      expect(result.confidence).toBe(1.0);
    });

    test('should include detailed analysis when requested', () => {
      const result = determineNiVisAtmanepada('niviś', { includeAnalysis: true });
      
      expect(result.niVisAnalysis).toBeDefined();
      expect(result.niVisAnalysis.visIndicators).toBeInstanceOf(Array);
      expect(result.niVisAnalysis.niIndicators).toBeInstanceOf(Array);
      expect(result.niVisAnalysis.hasVisRoot).toBe(true);
      expect(result.niVisAnalysis.hasNiPrefix).toBe(true);
    });

    test('should handle different scripts', () => {
      const iastResult = determineNiVisAtmanepada('niviś');
      expect(iastResult.script).toBe('IAST');
      expect(iastResult.isAtmanepada).toBe(true);

      const devanagariResult = determineNiVisAtmanepada('निविश्');
      expect(devanagariResult.script).toBe('Devanagari');
      expect(devanagariResult.isAtmanepada).toBe(true);
    });

    test('should handle unknown script gracefully', () => {
      const result = determineNiVisAtmanepada('xyz123!@#', { forceNiVis: true });
      expect(result.success).toBe(true);
      expect(result.script).toBe('Unknown');
    });

    test('should handle case-insensitive matching', () => {
      const result = determineNiVisAtmanepada('VIS', {
        prefix: 'NI'
      });
      
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.combinationType).toBe('ni_vis');
    });
  });

  describe('hasNiVisCombination', () => {
    
    test('should provide simple boolean interface for ni+viś detection', () => {
      expect(hasNiVisCombination('niviś')).toBe(true);
      expect(hasNiVisCombination('निविश्')).toBe(true);
      expect(hasNiVisCombination('viś', { prefix: 'ni' })).toBe(true);
      expect(hasNiVisCombination('viś', { prefix: 'pra' })).toBe(false);
      expect(hasNiVisCombination('gam', { prefix: 'ni' })).toBe(false);
      expect(hasNiVisCombination('gam')).toBe(false);
    });

    test('should handle errors gracefully', () => {
      expect(hasNiVisCombination(null)).toBe(false);
      expect(hasNiVisCombination('')).toBe(false);
      expect(hasNiVisCombination(123)).toBe(false);
    });
  });

  describe('Integration and linguistic accuracy', () => {
    
    test('should handle traditional ni+viś examples', () => {
      const niVisExamples = [
        { verb: 'niviś', context: {} },
        { verb: 'निविश्', context: {} },
        { verb: 'viś', context: { prefix: 'ni' } },
        { verb: 'विश्', context: { prefix: 'नि' } },
        { verb: 'viś', context: { prefixes: ['ni'] } },
        { verb: 'viś', context: { compound: 'ni-viś' } }
      ];

      for (const example of niVisExamples) {
        const result = determineNiVisAtmanepada(example.verb, example.context);
        expect(result.success).toBe(true);
        expect(result.isAtmanepada).toBe(true);
        expect(result.combinationType).toBe('ni_vis');
        expect(result.confidence).toBeGreaterThan(0.7);
      }
    });

    test('should maintain consistency across similar contexts', () => {
      const contexts = [
        { prefix: 'ni' },
        { prefixes: ['ni', 'pra'] },
        { compound: 'ni-viś-form' },
        { expression: 'verb viś with ni prefix' }
      ];

      for (const context of contexts) {
        const result = determineNiVisAtmanepada('viś', context);
        expect(result.isAtmanepada).toBe(true);
        expect(result.combinationType).toBe('ni_vis');
      }
    });

    test('should handle edge cases appropriately', () => {
      // Partial matches that shouldn't qualify
      const partialResult = determineNiVisAtmanepada('visible', {
        prefix: 'uni'
      });
      expect(partialResult.isAtmanepada).toBe(false);

      // Multiple prefixes with ni
      const multipleResult = determineNiVisAtmanepada('viś', {
        prefixes: ['pra', 'ni', 'upa', 'sam']
      });
      expect(multipleResult.isAtmanepada).toBe(true);
      expect(multipleResult.combinationType).toBe('ni_vis');
    });

    test('should provide appropriate confidence scoring', () => {
      const exactMatch = determineNiVisAtmanepada('niviś');
      expect(exactMatch.confidence).toBeGreaterThan(0.9);

      const contextMatch = determineNiVisAtmanepada('viś', { prefix: 'ni' });
      expect(contextMatch.confidence).toBeGreaterThan(0.8);
      expect(contextMatch.confidence).toBeLessThan(1.0);

      const expressionMatch = determineNiVisAtmanepada('viś', {
        expression: 'with ni prefix'
      });
      expect(expressionMatch.confidence).toBeGreaterThan(0.6);
      expect(expressionMatch.confidence).toBeLessThan(0.9);
    });
  });

  describe('Error handling and performance', () => {
    
    test('should handle malformed input gracefully', () => {
      const malformedInputs = [
        null,
        undefined,
        [],
        123,
        '',
        '   '
      ];

      for (const input of malformedInputs) {
        const result = determineNiVisAtmanepada(input);
        expect(result.success).toBe(false);
        expect(result.error).toBeDefined();
      }
    });

    test('should handle large context objects', () => {
      const largeContext = {
        prefix: 'ni '.repeat(1000),
        expression: 'viś with ni '.repeat(1000),
        prefixes: Array(100).fill('ni'),
        metadata: { info: 'data '.repeat(1000) }
      };

      const result = determineNiVisAtmanepada('viś', largeContext);
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should handle empty context gracefully', () => {
      const result = determineNiVisAtmanepada('viś', {});
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(false);
      expect(result.combinationType).toBe('vis_only');
    });

    test('should preserve input data in output', () => {
      const verb = 'viś';
      const context = { prefix: 'ni', custom: 'data' };
      const result = determineNiVisAtmanepada(verb, context);
      
      expect(result.verb).toBe(verb);
      expect(result.context).toEqual(context);
      expect(result.rule).toBe('1.3.17');
    });

    test('should handle non-string prefixes gracefully', () => {
      const result = determineNiVisAtmanepada('viś', {
        prefixes: ['ni', 123, null, 'pra']
      });
      
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(true); // Should still find the valid 'ni'
    });

    test('should handle null context fields gracefully', () => {
      const result = determineNiVisAtmanepada('viś', {
        prefix: null,
        compound: undefined,
        prefixes: ['ni']
      });
      
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });
  });
});
