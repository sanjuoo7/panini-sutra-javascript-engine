/**
 * Test Suite for Sutra 1.3.18: परिव्यवेभ्यः क्रियः
 * Tests the determination of ātmanepada for क्री root with specific prefixes
 */

import { determineKriPrefixAtmanepada, hasKriPrefixCombination } from './index.js';

describe('Sutra 1.3.18: परिव्यवेभ्यः क्रियः (क्री + Prefix Specific Rule)', () => {
  
  describe('determineKriPrefixAtmanepada', () => {
    
    test('should handle invalid input', () => {
      expect(determineKriPrefixAtmanepada('')).toHaveProperty('success', false);
      expect(determineKriPrefixAtmanepada(null)).toHaveProperty('success', false);
      expect(determineKriPrefixAtmanepada(undefined)).toHaveProperty('success', false);
      expect(determineKriPrefixAtmanepada(123)).toHaveProperty('success', false);
    });

    test('should detect परि + क्री combination from compound verb', () => {
      const result = determineKriPrefixAtmanepada('parikrī');
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.combinationType).toBe('kri_prefix');
      expect(result.rule).toBe('1.3.18');
      expect(result.reason).toContain('परि/वि/अव prefix');
    });

    test('should detect वि + क्री combination from compound verb', () => {
      const result = determineKriPrefixAtmanepada('vikrī');
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.combinationType).toBe('kri_prefix');
      expect(result.rule).toBe('1.3.18');
    });

    test('should detect अव + क्री combination from compound verb', () => {
      const result = determineKriPrefixAtmanepada('avakrī');
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.combinationType).toBe('kri_prefix');
      expect(result.rule).toBe('1.3.18');
    });

    test('should detect क्री + prefix from separate context', () => {
      const result = determineKriPrefixAtmanepada('krī', { prefix: 'pari' });
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.combinationType).toBe('kri_prefix');
    });

    test('should detect क्री + prefix from prefixes array', () => {
      const result = determineKriPrefixAtmanepada('krī', { prefixes: ['pari', 'upa'] });
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.combinationType).toBe('kri_prefix');
    });

    test('should detect क्री + prefix from compound field', () => {
      const result = determineKriPrefixAtmanepada('krī', { compound: 'vi-krī compound' });
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.combinationType).toBe('kri_prefix');
    });

    test('should detect क्री + prefix from expression', () => {
      const result = determineKriPrefixAtmanepada('krī', { expression: 'with ava prefix' });
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.combinationType).toBe('kri_prefix');
    });

    test('should handle क्री without target prefix', () => {
      const result = determineKriPrefixAtmanepada('krī');
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(false);
      expect(result.combinationType).toBe('kri_only');
      expect(result.reason).toContain('without required prefix');
    });

    test('should handle target prefix without क्री root', () => {
      const result = determineKriPrefixAtmanepada('pari', { prefix: 'pari' });
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(false);
      expect(result.combinationType).toBe('prefix_only');
      expect(result.reason).toContain('without क्री root');
    });

    test('should handle verbs with no क्री or target prefix', () => {
      const result = determineKriPrefixAtmanepada('gam');
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(false);
      expect(result.combinationType).toBe('none');
      expect(result.reason).toContain('No क्री + prefix combination');
    });

    test('should handle force flag for testing', () => {
      const result = determineKriPrefixAtmanepada('test', { forceKriPrefix: true });
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.combinationType).toBe('kri_prefix');
      expect(result.confidence).toBe(1.0);
    });

    test('should include detailed analysis when requested', () => {
      const result = determineKriPrefixAtmanepada('parikrī', { includeAnalysis: true });
      expect(result.kriPrefixAnalysis).toBeDefined();
      expect(result.kriPrefixAnalysis.hasKriRoot).toBe(true);
      expect(result.kriPrefixAnalysis.hasTargetPrefix).toBe(true);
      expect(result.kriPrefixAnalysis.kriIndicators).toHaveLength(1);
      expect(result.kriPrefixAnalysis.prefixIndicators).toHaveLength(1);
    });

    test('should handle different scripts', () => {
      const result1 = determineKriPrefixAtmanepada('परिक्री');
      expect(result1.success).toBe(true);
      expect(result1.script).toBe('Devanagari');
      expect(result1.isAtmanepada).toBe(true);

      const result2 = determineKriPrefixAtmanepada('विक्री');
      expect(result2.success).toBe(true);
      expect(result2.script).toBe('Devanagari');
      expect(result2.isAtmanepada).toBe(true);
    });

    test('should handle unknown script gracefully', () => {
      const result = determineKriPrefixAtmanepada('parikri', { forceKriPrefix: true });
      expect(result.success).toBe(true);
      expect(result.script).toBe('IAST');
    });

    test('should handle case-insensitive matching', () => {
      const result1 = determineKriPrefixAtmanepada('ParIkRī');
      expect(result1.success).toBe(true);
      expect(result1.isAtmanepada).toBe(true);

      const result2 = determineKriPrefixAtmanepada('krī', { prefix: 'ParI' });
      expect(result2.success).toBe(true);
      expect(result2.isAtmanepada).toBe(true);
    });

    test('should reject non-target prefixes', () => {
      const result1 = determineKriPrefixAtmanepada('krī', { prefix: 'sam' });
      expect(result1.success).toBe(true);
      expect(result1.isAtmanepada).toBe(false);
      expect(result1.combinationType).toBe('kri_only');

      const result2 = determineKriPrefixAtmanepada('upakrī');
      expect(result2.success).toBe(true);
      expect(result2.isAtmanepada).toBe(false);
    });
  });

  describe('hasKriPrefixCombination', () => {
    test('should provide simple boolean interface for क्री + prefix detection', () => {
      expect(hasKriPrefixCombination('parikrī')).toBe(true);
      expect(hasKriPrefixCombination('vikrī')).toBe(true);
      expect(hasKriPrefixCombination('avakrī')).toBe(true);
      expect(hasKriPrefixCombination('krī', { prefix: 'pari' })).toBe(true);
      expect(hasKriPrefixCombination('krī')).toBe(false);
      expect(hasKriPrefixCombination('gam')).toBe(false);
    });

    test('should handle errors gracefully', () => {
      expect(hasKriPrefixCombination(null)).toBe(false);
      expect(hasKriPrefixCombination('')).toBe(false);
      expect(hasKriPrefixCombination(undefined)).toBe(false);
    });
  });

  describe('Integration and linguistic accuracy', () => {
    test('should handle traditional क्री + prefix examples', () => {
      // Traditional examples of परि + क्री
      const parikri = determineKriPrefixAtmanepada('parikrī');
      expect(parikri.isAtmanepada).toBe(true);
      expect(parikri.rule).toBe('1.3.18');

      // Traditional examples of वि + क्री  
      const vikri = determineKriPrefixAtmanepada('vikrī');
      expect(vikri.isAtmanepada).toBe(true);
      expect(vikri.rule).toBe('1.3.18');

      // Traditional examples of अव + क्री
      const avakri = determineKriPrefixAtmanepada('avakrī');
      expect(avakri.isAtmanepada).toBe(true);
      expect(avakri.rule).toBe('1.3.18');
    });

    test('should maintain consistency across similar contexts', () => {
      const contexts = [
        { prefix: 'pari' },
        { prefixes: ['pari'] },
        { compound: 'pari-krī' },
        { expression: 'with pari prefix' }
      ];

      contexts.forEach(context => {
        const result = determineKriPrefixAtmanepada('krī', context);
        expect(result.isAtmanepada).toBe(true);
        expect(result.combinationType).toBe('kri_prefix');
      });
    });

    test('should handle edge cases appropriately', () => {
      // क्री with inflectional endings
      const inflected = determineKriPrefixAtmanepada('parikrīṇāti');
      expect(inflected.success).toBe(true);
      expect(inflected.isAtmanepada).toBe(true);

      // Mixed script context
      const mixed = determineKriPrefixAtmanepada('क्री', { prefix: 'pari' });
      expect(mixed.success).toBe(true);
      expect(mixed.isAtmanepada).toBe(true);
    });

    test('should provide appropriate confidence scoring', () => {
      const exactMatch = determineKriPrefixAtmanepada('parikrī');
      expect(exactMatch.confidence).toBeGreaterThan(0.9);

      const contextMatch = determineKriPrefixAtmanepada('krī', { prefix: 'pari' });
      expect(contextMatch.confidence).toBeGreaterThan(0.8);
      expect(contextMatch.confidence).toBeLessThan(1.0);

      const expressionMatch = determineKriPrefixAtmanepada('krī', {
        expression: 'with pari prefix'
      });
      expect(expressionMatch.confidence).toBeGreaterThan(0.6);
      expect(expressionMatch.confidence).toBeLessThan(0.9);
    });
  });

  describe('Error handling and performance', () => {
    test('should handle malformed input gracefully', () => {
      const results = [
        determineKriPrefixAtmanepada('   '),
        determineKriPrefixAtmanepada(''),
        determineKriPrefixAtmanepada('abc123'),
      ];

      results.forEach(result => {
        expect(result).toHaveProperty('success');
        expect(result).toHaveProperty('verb');
      });
    });

    test('should handle large context objects', () => {
      const largeContext = {
        prefix: 'pari',
        prefixes: Array(100).fill('various'),
        compound: 'pari-krī with long description '.repeat(10),
        expression: 'A very long expression '.repeat(20),
        additionalData: Array(50).fill('data')
      };

      const result = determineKriPrefixAtmanepada('krī', largeContext);
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should handle empty context gracefully', () => {
      const result = determineKriPrefixAtmanepada('parikrī', {});
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should preserve input data in output', () => {
      const inputVerb = 'parikrī';
      const inputContext = { prefix: 'pari', test: 'data' };
      
      const result = determineKriPrefixAtmanepada(inputVerb, inputContext);
      expect(result.verb).toBe(inputVerb);
      expect(result.context).toEqual(inputContext);
    });

    test('should handle non-string prefixes gracefully', () => {
      const result1 = determineKriPrefixAtmanepada('krī', { prefix: 123 });
      expect(result1.success).toBe(true);

      const result2 = determineKriPrefixAtmanepada('krī', { prefixes: [123, 'pari'] });
      expect(result2.success).toBe(true);
      expect(result2.isAtmanepada).toBe(true); // Should still detect 'pari'
    });

    test('should handle null context fields gracefully', () => {
      const result = determineKriPrefixAtmanepada('parikrī', {
        prefix: null,
        prefixes: null,
        compound: null,
        expression: null
      });
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(true); // Should detect from verb itself
    });
  });
});
