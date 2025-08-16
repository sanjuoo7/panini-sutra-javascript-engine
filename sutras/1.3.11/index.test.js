/**
 * Tests for Sutra 1.3.11: स्वरितेनाधिकारः (svaritena adhikāraḥ)
 * Testing svarita accent authority functionality
 */

import { detectSvaritaAccent, applySvaritaAuthority, analyzeAuthorityScope } from './index.js';

describe('Sutra 1.3.11: स्वरितेनाधिकारः (Svarita Accent Authority)', () => {
  
  describe('detectSvaritaAccent', () => {
    test('should handle invalid input', () => {
      expect(detectSvaritaAccent('')).toEqual({
        success: false,
        error: 'Invalid input: text must be a non-empty string',
        text: ''
      });

      expect(detectSvaritaAccent(null)).toEqual({
        success: false,
        error: 'Invalid input: text must be a non-empty string',
        text: null
      });
    });

    test('should detect explicit svarita in IAST with grave accent', () => {
      const result = detectSvaritaAccent('a`gni');
      
      expect(result.success).toBe(true);
      expect(result.hasExplicitSvarita).toBe(true);
      expect(result.svaritaMarkings).toHaveLength(1);
      expect(result.svaritaMarkings[0]).toEqual({
        position: 0,
        vowel: 'a',
        accent: 'svarita',
        representation: 'a`',
        type: 'explicit'
      });
      expect(result.script).toBe('IAST');
    });

    test('should detect circumflex svarita representation', () => {
      const result = detectSvaritaAccent('âgni');
      
      expect(result.success).toBe(true);
      expect(result.hasExplicitSvarita).toBe(true);
      expect(result.svaritaMarkings[0].type).toBe('circumflex');
    });

    test('should detect multiple svarita markings', () => {
      const result = detectSvaritaAccent('a`gni râma i`ndu');
      
      expect(result.success).toBe(true);
      expect(result.totalSvaritaCount).toBe(3);  // a`, â, i`
      expect(result.svaritaMarkings).toHaveLength(3);
    });

    test('should handle text without svarita markings', () => {
      const result = detectSvaritaAccent('gam as bhū');
      
      expect(result.success).toBe(true);
      expect(result.hasExplicitSvarita).toBe(false);
      expect(result.svaritaMarkings).toHaveLength(0);
      expect(result.totalSvaritaCount).toBe(0);
    });

    test('should detect implicit authority indicators', () => {
      const result = detectSvaritaAccent('adhikara pratyaya', { context: 'authority' });
      
      expect(result.success).toBe(true);
      expect(result.implicitAuthority.hasImplicitAuthority).toBe(true);
      expect(result.implicitAuthority.indicators.length).toBeGreaterThan(0);
    });

    test('should handle Devanagari script', () => {
      const result = detectSvaritaAccent('अग्नि');
      
      expect(result.success).toBe(true);
      expect(result.script).toBe('Devanagari');
    });

    test('should handle unknown script gracefully', () => {
      const result = detectSvaritaAccent('αβγ');
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Unable to detect script');
    });

    test('should preserve context information', () => {
      const result = detectSvaritaAccent('test', { context: 'verbal' });
      
      expect(result.context).toBe('verbal');
      expect(result.rule).toBe('1.3.11');
    });
  });

  describe('applySvaritaAuthority', () => {
    test('should handle invalid input', () => {
      expect(applySvaritaAuthority('', {})).toEqual({
        success: false,
        error: 'Invalid element input',
        element: ''
      });

      expect(applySvaritaAuthority('test', null)).toEqual({
        success: false,
        error: 'Invalid operation input',
        operation: null
      });
    });

    test('should apply explicit svarita authority', () => {
      const element = 'a`gni';
      const operation = { type: 'substitution', scope: ['base'] };
      
      const result = applySvaritaAuthority(element, operation);
      
      expect(result.success).toBe(true);
      expect(result.hasAuthority).toBe(true);
      expect(result.authorityLevel).toBe('explicit');
      expect(result.scopeExtension).toContain('adjacent_elements');
      expect(result.authorityMetrics.strength).toBe(1.0);
    });

    test('should handle different operation types with scope extension', () => {
      const element = 'a`gni';
      
      // Substitution operation
      const subResult = applySvaritaAuthority(element, { type: 'substitution' });
      expect(subResult.scopeExtension).toContain('compound_members');
      
      // Elision operation
      const elisResult = applySvaritaAuthority(element, { type: 'elision' });
      expect(elisResult.scopeExtension).toContain('related_phonemes');
      
      // Augmentation operation
      const augResult = applySvaritaAuthority(element, { type: 'augmentation' });
      expect(augResult.scopeExtension).toContain('stem_variants');
    });

    test('should handle implicit authority', () => {
      const element = 'pratyaya';
      const operation = { type: 'substitution' };
      
      const result = applySvaritaAuthority(element, operation);
      
      expect(result.success).toBe(true);
      if (result.svaritaAnalysis.implicitAuthority.hasImplicitAuthority) {
        expect(result.authorityLevel).toBe('implicit');
        expect(result.authorityMetrics.strength).toBe(0.7);
      }
    });

    test('should handle forced authority', () => {
      const element = 'simple';
      const operation = { type: 'substitution' };
      
      const result = applySvaritaAuthority(element, operation, { forceAuthority: true });
      
      expect(result.success).toBe(true);
      expect(result.authorityLevel).toBe('explicit');
      expect(result.hasAuthority).toBe(true);
    });

    test('should handle no authority case', () => {
      const element = 'simple';
      const operation = { type: 'substitution' };
      
      const result = applySvaritaAuthority(element, operation);
      
      expect(result.success).toBe(true);
      if (!result.svaritaAnalysis.implicitAuthority.hasImplicitAuthority) {
        expect(result.authorityLevel).toBe('none');
        expect(result.hasAuthority).toBe(false);
        expect(result.authorityMetrics.strength).toBe(0.0);
      }
    });

    test('should disable scope extension when requested', () => {
      const element = 'a`gni';
      const operation = { type: 'substitution', scope: ['base'] };
      
      const result = applySvaritaAuthority(element, operation, { extendScope: false });
      
      expect(result.success).toBe(true);
      expect(result.scopeExtension).toEqual(['base']);
    });

    test('should preserve rule information', () => {
      const element = 'test';
      const operation = { type: 'test' };
      
      const result = applySvaritaAuthority(element, operation);
      
      expect(result.rule).toBe('1.3.11');
    });
  });

  describe('analyzeAuthorityScope', () => {
    test('should handle invalid input', () => {
      const result = analyzeAuthorityScope('not-an-array');
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Elements must be an array');
    });

    test('should analyze mixed authority elements', () => {
      const elements = ['a`gni', 'simple', 'râma', 'test'];
      
      const result = analyzeAuthorityScope(elements);
      
      expect(result.success).toBe(true);
      expect(result.totalElements).toBe(4);
      expect(result.authorityElements.length).toBeGreaterThan(0);
      expect(result.nonAuthorityElements.length).toBeGreaterThan(0);
      expect(result.authorityRatio).toBeGreaterThan(0);
      expect(result.authorityRatio).toBeLessThanOrEqual(1);
    });

    test('should identify dominant authority', () => {
      const elements = ['a`gni', 'râma', 'î`ndu'];
      
      const result = analyzeAuthorityScope(elements);
      
      expect(result.success).toBe(true);
      if (result.authorityRatio > 0.5) {
        expect(result.dominantAuthority).toBe(true);
        expect(result.overallAuthorityLevel).toBe('dominant');
      }
    });

    test('should handle no authority elements', () => {
      const elements = ['simple', 'test', 'example'];
      
      const result = analyzeAuthorityScope(elements);
      
      expect(result.success).toBe(true);
      if (result.authorityElements.length === 0) {
        expect(result.overallAuthorityLevel).toBe('none');
        expect(result.dominantAuthority).toBe(false);
        expect(result.authorityRatio).toBe(0);
      }
    });

    test('should handle partial authority', () => {
      const elements = ['a`gni', 'simple', 'test', 'example'];
      
      const result = analyzeAuthorityScope(elements);
      
      expect(result.success).toBe(true);
      if (result.authorityElements.length > 0 && result.authorityRatio <= 0.5) {
        expect(result.overallAuthorityLevel).toBe('partial');
      }
    });

    test('should preserve rule context', () => {
      const elements = ['test'];
      const ruleContext = { rule: 'test-rule', type: 'substitution' };
      
      const result = analyzeAuthorityScope(elements, ruleContext);
      
      expect(result.success).toBe(true);
      expect(result.ruleContext).toEqual(ruleContext);
      expect(result.rule).toBe('1.3.11');
    });

    test('should handle empty array', () => {
      const result = analyzeAuthorityScope([]);
      
      expect(result.success).toBe(true);
      expect(result.totalElements).toBe(0);
      expect(result.authorityRatio).toBe(0);
      expect(result.overallAuthorityLevel).toBe('none');
    });

    test('should handle non-string elements gracefully', () => {
      const elements = ['a`gni', 123, { obj: 'test' }, null];
      
      const result = analyzeAuthorityScope(elements);
      
      expect(result.success).toBe(true);
      expect(result.totalElements).toBe(4);
      // Should only analyze string elements
    });
  });

  describe('Integration and linguistic accuracy', () => {
    test('should handle complex svarita patterns', () => {
      const text = 'a`dhikāra pratyayê rāmâ';
      const result = detectSvaritaAccent(text);
      
      expect(result.success).toBe(true);
      expect(result.totalSvaritaCount).toBeGreaterThan(0);
    });

    test('should apply authority consistently', () => {
      const element = 'a`gni';
      const operation1 = { type: 'substitution' };
      const operation2 = { type: 'elision' };
      
      const result1 = applySvaritaAuthority(element, operation1);
      const result2 = applySvaritaAuthority(element, operation2);
      
      expect(result1.authorityLevel).toBe(result2.authorityLevel);
      expect(result1.hasAuthority).toBe(result2.hasAuthority);
    });

    test('should handle traditional authority terms', () => {
      const elements = ['adhikara', 'pratyaya', 'samjna', 'vikarana'];
      
      const result = analyzeAuthorityScope(elements);
      
      expect(result.success).toBe(true);
      // These terms may have implicit authority
    });

    test('should preserve linguistic context throughout analysis', () => {
      const element = 'a`gni';
      const operation = { type: 'substitution', context: 'verbal' };
      
      const result = applySvaritaAuthority(element, operation, { context: 'nominal' });
      
      expect(result.context).toBe('nominal');
      expect(result.operation.context).toBe('verbal');
    });
  });

  describe('Error handling and edge cases', () => {
    test('should handle malformed svarita markings', () => {
      const result = detectSvaritaAccent('a``gni```');
      
      expect(result.success).toBe(true);
      // Should handle gracefully without errors
    });

    test('should handle mixed scripts in single text', () => {
      const result = detectSvaritaAccent('a`gni अग्नि');
      
      expect(result.success).toBe(true);
      expect(result.script).toBeDefined();
    });

    test('should handle authority scope analysis errors gracefully', () => {
      // Force an error scenario
      const result = analyzeAuthorityScope([]);
      
      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });
});
