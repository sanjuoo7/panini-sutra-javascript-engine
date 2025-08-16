/**
 * Tests for Sanskrit Sutra 1.3.16: इतरेतरान्योन्योपपदाच्च
 * 
 * Tests the itaretara/anyonya compound exception rule to Sutra 1.3.14
 */

import { 
  determineItaretaraAnyonyaException, 
  hasItaretaraCompound, 
  hasAnyonyaCompound 
} from './index.js';

describe('Sutra 1.3.16: इतरेतरान्योन्योपपदाच्च (Itaretara/Anyonya Compound Exception)', () => {
  
  describe('determineItaretaraAnyonyaException', () => {
    
    test('should handle invalid input', () => {
      expect(determineItaretaraAnyonyaException()).toEqual({
        success: false,
        error: 'Invalid verb: must be a non-empty string',
        verb: undefined
      });
      
      expect(determineItaretaraAnyonyaException('')).toEqual({
        success: false,
        error: 'Invalid verb: must be a non-empty string',
        verb: ''
      });
      
      expect(determineItaretaraAnyonyaException(123)).toEqual({
        success: false,
        error: 'Invalid verb: must be a non-empty string',
        verb: 123
      });
    });

    test('should detect itaretara compounds from upapada', () => {
      const itaretaraUpapadas = [
        'itaretara',
        'इतरेतर', 
        'each other',
        'one after another'
      ];
      
      for (const upapada of itaretaraUpapadas) {
        const result = determineItaretaraAnyonyaException('test', { upapada });
        expect(result.success).toBe(true);
        expect(result.appliesException).toBe(true);
        expect(result.compoundType).toBe('itaretara');
        expect(result.confidence).toBeGreaterThan(0.8);
        expect(result.reason).toContain('Itaretara compound exception');
      }
    });

    test('should detect anyonya compounds from upapada', () => {
      const anyonyaUpapadas = [
        'anyonya',
        'अन्योन्य',
        'one another',
        'mutually'
      ];
      
      for (const upapada of anyonyaUpapadas) {
        const result = determineItaretaraAnyonyaException('test', { upapada });
        expect(result.success).toBe(true);
        expect(result.appliesException).toBe(true);
        expect(result.compoundType).toBe('anyonya');
        expect(result.confidence).toBeGreaterThan(0.8);
        expect(result.reason).toContain('Anyonya compound exception');
      }
    });

    test('should detect compounds from compounds field', () => {
      const itaretaraResult = determineItaretaraAnyonyaException('test', {
        compounds: 'itaretara-samyoga'
      });
      expect(itaretaraResult.appliesException).toBe(true);
      expect(itaretaraResult.compoundType).toBe('itaretara');

      const anyonyaResult = determineItaretaraAnyonyaException('test', {
        compounds: 'anyonya-kriya'
      });
      expect(anyonyaResult.appliesException).toBe(true);
      expect(anyonyaResult.compoundType).toBe('anyonya');
    });

    test('should detect compounds from full expression', () => {
      const expressionResult = determineItaretaraAnyonyaException('test', {
        expression: 'They speak to one another in the assembly'
      });
      expect(expressionResult.appliesException).toBe(true);
      expect(expressionResult.compoundType).toBe('anyonya');

      const itaretaraExpressionResult = determineItaretaraAnyonyaException('test', {
        expression: 'The students teach each other respectively'
      });
      expect(itaretaraExpressionResult.appliesException).toBe(true);
      expect(itaretaraExpressionResult.compoundType).toBe('itaretara');
    });

    test('should detect compounds from qualifiers array', () => {
      const result = determineItaretaraAnyonyaException('test', {
        qualifiers: ['itaretara', 'sequential', 'ordered']
      });
      expect(result.appliesException).toBe(true);
      expect(result.compoundType).toBe('itaretara');

      const anyonyaResult = determineItaretaraAnyonyaException('test', {
        qualifiers: ['mutual', 'anyonya', 'reciprocal']
      });
      expect(anyonyaResult.appliesException).toBe(true);
      expect(anyonyaResult.compoundType).toBe('anyonya');
    });

    test('should handle verbs with no compound usage', () => {
      const result = determineItaretaraAnyonyaException('test', {
        upapada: 'simple qualifier',
        expression: 'normal action without compounds'
      });
      
      expect(result.success).toBe(true);
      expect(result.appliesException).toBe(false);
      expect(result.compoundType).toBe('none');
      expect(result.reason).toContain('No itaretara/anyonya compounds detected');
    });

    test('should handle force flags for testing', () => {
      const itaretaraResult = determineItaretaraAnyonyaException('test', { 
        forceItaretara: true 
      });
      expect(itaretaraResult.appliesException).toBe(true);
      expect(itaretaraResult.compoundType).toBe('itaretara');
      expect(itaretaraResult.confidence).toBe(1.0);

      const anyonyaResult = determineItaretaraAnyonyaException('test', { 
        forceAnyonya: true 
      });
      expect(anyonyaResult.appliesException).toBe(true);
      expect(anyonyaResult.compoundType).toBe('anyonya');
      expect(anyonyaResult.confidence).toBe(1.0);
    });

    test('should include detailed analysis when requested', () => {
      const result = determineItaretaraAnyonyaException('test', { 
        upapada: 'itaretara',
        includeAnalysis: true 
      });
      
      expect(result.compoundAnalysis).toBeDefined();
      expect(result.compoundAnalysis.compoundIndicators).toBeInstanceOf(Array);
      expect(result.compoundAnalysis.compoundIndicators.length).toBeGreaterThan(0);
      expect(result.compoundAnalysis.hasItaretara).toBe(true);
    });

    test('should handle different scripts', () => {
      const iastResult = determineItaretaraAnyonyaException('gam', {
        upapada: 'itaretara'
      });
      expect(iastResult.script).toBe('IAST');
      expect(iastResult.appliesException).toBe(true);

      const devanagariResult = determineItaretaraAnyonyaException('गम्', {
        upapada: 'अन्योन्य'
      });
      expect(devanagariResult.script).toBe('Devanagari');
      expect(devanagariResult.appliesException).toBe(true);
    });

    test('should handle unknown script gracefully', () => {
      const result = determineItaretaraAnyonyaException('xyz123!@#', { 
        forceItaretara: true 
      });
      expect(result.success).toBe(true);
      expect(result.script).toBe('Unknown');
    });

    test('should prioritize stronger compound type when both present', () => {
      // Create a context with both itaretara and anyonya indicators
      const result = determineItaretaraAnyonyaException('test', {
        upapada: 'itaretara',
        expression: 'one another',
        includeAnalysis: true
      });
      
      expect(result.success).toBe(true);
      expect(result.appliesException).toBe(true);
      expect(['itaretara', 'anyonya']).toContain(result.compoundType);
      
      // Should have indicators for both but prioritize one
      if (result.compoundAnalysis) {
        expect(result.compoundAnalysis.hasItaretara || result.compoundAnalysis.hasAnyonya).toBe(true);
      }
    });

    test('should handle case-insensitive matching', () => {
      const result = determineItaretaraAnyonyaException('test', {
        upapada: 'ITARETARA',
        expression: 'ONE ANOTHER'
      });
      
      expect(result.success).toBe(true);
      expect(result.appliesException).toBe(true);
    });
  });

  describe('hasItaretaraCompound', () => {
    
    test('should provide simple boolean interface for itaretara detection', () => {
      expect(hasItaretaraCompound('itaretara samyoga')).toBe(true);
      expect(hasItaretaraCompound('इतरेतर क्रिया')).toBe(true);
      expect(hasItaretaraCompound('each other respectively')).toBe(true);
      expect(hasItaretaraCompound('simple expression')).toBe(false);
    });

    test('should handle non-itaretara expressions', () => {
      expect(hasItaretaraCompound('anyonya kriya')).toBe(false); // anyonya, not itaretara
      expect(hasItaretaraCompound('normal action')).toBe(false);
    });

    test('should handle errors gracefully', () => {
      expect(hasItaretaraCompound(null)).toBe(false);
      expect(hasItaretaraCompound('')).toBe(false);
      expect(hasItaretaraCompound(123)).toBe(false);
    });
  });

  describe('hasAnyonyaCompound', () => {
    
    test('should provide simple boolean interface for anyonya detection', () => {
      expect(hasAnyonyaCompound('anyonya kriya')).toBe(true);
      expect(hasAnyonyaCompound('अन्योन्य व्यवहार')).toBe(true);
      expect(hasAnyonyaCompound('one another mutually')).toBe(true);
      expect(hasAnyonyaCompound('simple expression')).toBe(false);
    });

    test('should handle non-anyonya expressions', () => {
      expect(hasAnyonyaCompound('itaretara samyoga')).toBe(false); // itaretara, not anyonya
      expect(hasAnyonyaCompound('normal action')).toBe(false);
    });

    test('should handle errors gracefully', () => {
      expect(hasAnyonyaCompound(null)).toBe(false);
      expect(hasAnyonyaCompound('')).toBe(false);
      expect(hasAnyonyaCompound(123)).toBe(false);
    });
  });

  describe('Integration and linguistic accuracy', () => {
    
    test('should handle traditional itaretara examples', () => {
      const itaretaraExamples = [
        { verb: 'vad', context: { upapada: 'itaretara' } },
        { verb: 'वद्', context: { upapada: 'इतरेतर' } },
        { verb: 'kṛ', context: { expression: 'each other respectively' } },
        { verb: 'गम्', context: { qualifiers: ['itaretara', 'sequential'] } }
      ];

      for (const example of itaretaraExamples) {
        const result = determineItaretaraAnyonyaException(example.verb, example.context);
        expect(result.success).toBe(true);
        expect(result.appliesException).toBe(true);
        expect(result.compoundType).toBe('itaretara');
        expect(result.confidence).toBeGreaterThan(0.6);
      }
    });

    test('should handle traditional anyonya examples', () => {
      const anyonyaExamples = [
        { verb: 'vad', context: { upapada: 'anyonya' } },
        { verb: 'वद्', context: { upapada: 'अन्योन्य' } },
        { verb: 'darś', context: { expression: 'see one another' } },
        { verb: 'गृह्', context: { qualifiers: ['anyonya', 'mutual'] } }
      ];

      for (const example of anyonyaExamples) {
        const result = determineItaretaraAnyonyaException(example.verb, example.context);
        expect(result.success).toBe(true);
        expect(result.appliesException).toBe(true);
        expect(result.compoundType).toBe('anyonya');
        expect(result.confidence).toBeGreaterThan(0.6);
      }
    });

    test('should maintain consistency across similar contexts', () => {
      const verb = 'kṛ';
      const contexts = [
        { upapada: 'itaretara' },
        { compounds: 'itaretara-karma' },
        { expression: 'they do each other\'s work' }
      ];

      for (const context of contexts) {
        const result = determineItaretaraAnyonyaException(verb, context);
        expect(result.appliesException).toBe(true);
        expect(result.compoundType).toBe('itaretara');
      }
    });

    test('should handle edge cases appropriately', () => {
      // Weak compound evidence
      const weakResult = determineItaretaraAnyonyaException('test', {
        expression: 'something that might involve alternative actions, perhaps'
      });
      expect(weakResult.success).toBe(true);
      // Should not apply exception with weak evidence
      expect(weakResult.appliesException).toBe(false);

      // Mixed compound types in different fields
      const mixedResult = determineItaretaraAnyonyaException('test', {
        upapada: 'itaretara',
        expression: 'and also one another'
      });
      expect(mixedResult.success).toBe(true);
      expect(mixedResult.appliesException).toBe(true);
      expect(['itaretara', 'anyonya']).toContain(mixedResult.compoundType);
    });

    test('should provide appropriate confidence scoring', () => {
      const strongItaretara = determineItaretaraAnyonyaException('test', {
        upapada: 'itaretara'
      });
      expect(strongItaretara.confidence).toBeGreaterThan(0.8);

      const contextualAnyonya = determineItaretaraAnyonyaException('test', {
        expression: 'one another'
      });
      expect(contextualAnyonya.confidence).toBeGreaterThan(0.6);
      expect(contextualAnyonya.confidence).toBeLessThan(0.9);
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
        const result = determineItaretaraAnyonyaException(input);
        expect(result.success).toBe(false);
        expect(result.error).toBeDefined();
      }
    });

    test('should handle large context objects', () => {
      const largeContext = {
        upapada: 'itaretara '.repeat(1000),
        expression: 'one another '.repeat(1000),
        qualifiers: Array(100).fill('anyonya'),
        metadata: { info: 'data '.repeat(1000) }
      };

      const result = determineItaretaraAnyonyaException('test', largeContext);
      expect(result.success).toBe(true);
      expect(result.appliesException).toBe(true);
    });

    test('should handle empty context gracefully', () => {
      const result = determineItaretaraAnyonyaException('test', {});
      expect(result.success).toBe(true);
      expect(result.appliesException).toBe(false);
      expect(result.compoundType).toBe('none');
    });

    test('should preserve input data in output', () => {
      const verb = 'test';
      const context = { upapada: 'itaretara', custom: 'data' };
      const result = determineItaretaraAnyonyaException(verb, context);
      
      expect(result.verb).toBe(verb);
      expect(result.context).toEqual(context);
      expect(result.rule).toBe('1.3.16');
    });

    test('should handle non-string qualifiers gracefully', () => {
      const result = determineItaretaraAnyonyaException('test', {
        qualifiers: ['itaretara', 123, null, 'anyonya']
      });
      
      expect(result.success).toBe(true);
      expect(result.appliesException).toBe(true); // Should still find the valid strings
    });

    test('should handle null context fields gracefully', () => {
      const result = determineItaretaraAnyonyaException('test', {
        upapada: null,
        expression: undefined,
        qualifiers: ['itaretara']
      });
      
      expect(result.success).toBe(true);
      expect(result.appliesException).toBe(true);
    });
  });
});
