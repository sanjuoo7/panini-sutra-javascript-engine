/**
 * Tests for Sutra 1.3.9: तस्य लोपः (tasya lopaḥ)
 * Testing it-marker elision functionality
 */

import { applyItElision, checkItElision, integratedItElision } from './index.js';

describe('Sutra 1.3.9: तस्य लोपः (It-marker Elision)', () => {
  
  describe('applyItElision', () => {
    test('should handle invalid input', () => {
      expect(applyItElision('')).toEqual({
        success: false,
        error: 'Invalid input: form must be a non-empty string',
        originalForm: '',
        processedForm: ''
      });

      expect(applyItElision(null)).toEqual({
        success: false,
        error: 'Invalid input: form must be a non-empty string',
        originalForm: null,
        processedForm: null
      });
    });

    test('should remove specified it-markers', () => {
      const result = applyItElision('ñivas', { itMarkers: ['ñi'] });
      expect(result.success).toBe(true);
      expect(result.processedForm).toBe('vas');
      expect(result.removedItMarkers).toHaveLength(1);
      expect(result.removedItMarkers[0].marker).toBe('ñi');
    });

    test('should handle multiple specified it-markers', () => {
      const result = applyItElision('ñivasp', { itMarkers: ['ñi', 'p'] });
      expect(result.success).toBe(true);
      expect(result.processedForm).toBe('vas');
      expect(result.removedItMarkers).toHaveLength(2);
    });

    test('should preserve forms without specified it-markers', () => {
      const result = applyItElision('gam', { itMarkers: ['ñi'] });
      expect(result.success).toBe(true);
      expect(result.processedForm).toBe('gam');
      expect(result.removedItMarkers).toHaveLength(0);
    });

    test('should work with Devanagari script', () => {
      const result = applyItElision('ञिवस्', { itMarkers: ['ञि'] });
      expect(result.success).toBe(true);
      expect(result.processedForm).toBe('वस्');
      expect(result.script).toBe('Devanagari');
    });

    test('should include rule information', () => {
      const result = applyItElision('test', { itMarkers: ['t'] });
      expect(result.rule).toBe('1.3.9');
      expect(result.removedItMarkers[0].rule).toBe('1.3.9');
    });
  });

  describe('checkItElision', () => {
    test('should identify potential it-markers in IAST', () => {
      const result = checkItElision('ñivas');
      expect(result.success).toBe(true);
      expect(result.shouldElide).toBe(true);
      expect(result.potentialItMarkers).toHaveLength(2);
      
      const markerTypes = result.potentialItMarkers.map(m => m.type);
      expect(markerTypes).toContain('initial_sequence');
      expect(markerTypes).toContain('final_consonant');
    });

    test('should identify ṭu sequence markers', () => {
      const result = checkItElision('ṭukta');
      expect(result.success).toBe(true);
      expect(result.shouldElide).toBe(true);
      expect(result.potentialItMarkers.some(m => m.marker === 'ṭu')).toBe(true);
    });

    test('should identify ḍu sequence markers', () => {
      const result = checkItElision('ḍukṛñ');
      expect(result.success).toBe(true);
      expect(result.shouldElide).toBe(true);
      expect(result.potentialItMarkers.some(m => m.marker === 'ḍu')).toBe(true);
    });

    test('should handle forms without it-markers', () => {
      const result = checkItElision('bhūva');
      expect(result.success).toBe(true);
      expect(result.shouldElide).toBe(false);
      expect(result.potentialItMarkers).toHaveLength(0);
    });

    test('should handle invalid input', () => {
      const result = checkItElision('');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid input');
    });
  });

  describe('integratedItElision', () => {
    test('should integrate with potential it-marker detection', () => {
      const result = integratedItElision('ñivas');
      expect(result.success).toBe(true);
      expect(result.elisionApplied).toBe(true);
      expect(result.processedForm).toBe('va'); // ñi and s removed
    });

    test('should handle forms without it-markers', () => {
      const result = integratedItElision('bhūva');
      expect(result.success).toBe(true);
      expect(result.elisionApplied).toBe(false);
      expect(result.reason).toBe('No it-markers found or elision not applicable');
    });

    test('should respect context', () => {
      const result = integratedItElision('test', { type: 'affix' });
      expect(result.context.type).toBe('affix');
    });
  });

  describe('Integration with framework', () => {
    test('should provide framework for sutra integration', () => {
      // Test that the functions provide the necessary structure
      // for integration with sutras 1.3.2-1.3.8
      
      const form = 'ñivasp';
      const analysis = checkItElision(form);
      
      expect(analysis).toHaveProperty('potentialItMarkers');
      expect(analysis.potentialItMarkers[0]).toHaveProperty('sutra');
      
      const elision = applyItElision(form, { 
        itMarkers: analysis.potentialItMarkers.map(m => m.marker) 
      });
      
      expect(elision).toHaveProperty('removedItMarkers');
      expect(elision).toHaveProperty('rule', '1.3.9');
    });

    test('should handle script detection', () => {
      const iastResult = checkItElision('ñivas');
      expect(iastResult.script).toBe('IAST');
      
      const devResult = checkItElision('ञिवस्');
      expect(devResult.script).toBe('Devanagari');
    });

    test('should maintain context information', () => {
      const result = integratedItElision('test', { 
        type: 'affix',
        meaning: 'test'
      });
      
      expect(result).toHaveProperty('context');
      expect(result.context.type).toBe('affix');
    });
  });

  describe('Error handling and edge cases', () => {
    test('should handle unknown script gracefully', () => {
      const result = applyItElision('αβγ');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Unable to detect script');
    });

    test('should handle empty it-marker lists', () => {
      const result = applyItElision('test', { itMarkers: [] });
      expect(result.success).toBe(true);
      expect(result.removedItMarkers).toHaveLength(0);
    });

    test('should preserve original form in results', () => {
      const original = 'ñivas';
      const result = applyItElision(original, { itMarkers: ['ñi'] });
      expect(result.originalForm).toBe(original);
    });
  });
});
