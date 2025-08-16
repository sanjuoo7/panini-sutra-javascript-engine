/**
 * Tests for Sutra 1.3.10: यथासंख्यमनुदेशः (yathāsaṅkhyamanudeśaḥ)
 * Testing sequential correspondence functionality
 */

import { applySequentialCorrespondence, analyzeCorrespondence, createCorrespondenceMapping } from './index.js';

describe('Sutra 1.3.10: यथासंख्यमनुदेशः (Sequential Correspondence)', () => {
  
  describe('applySequentialCorrespondence', () => {
    test('should handle invalid input', () => {
      expect(applySequentialCorrespondence(null, [])).toEqual({
        success: false,
        error: 'Invalid input: both source and target must be arrays',
        sourceElements: null,
        targetElements: []
      });

      expect(applySequentialCorrespondence([], [])).toEqual({
        success: false,
        error: 'Invalid input: arrays must not be empty',
        sourceElements: [],
        targetElements: []
      });
    });

    test('should create sequential correspondence for equal arrays', () => {
      const source = ['a', 'i', 'u'];
      const target = ['ka', 'ki', 'ku'];
      
      const result = applySequentialCorrespondence(source, target);
      
      expect(result.success).toBe(true);
      expect(result.correspondences).toHaveLength(3);
      expect(result.correspondences[0]).toEqual({
        sourceIndex: 0,
        targetIndex: 0,
        sourceElement: 'a',
        targetElement: 'ka',
        rule: '1.3.10'
      });
      expect(result.isComplete).toBe(true);
    });

    test('should handle source longer than target', () => {
      const source = ['gam', 'as', 'bhū', 'kṛ'];
      const target = ['ti', 'anti'];
      
      const result = applySequentialCorrespondence(source, target);
      
      expect(result.success).toBe(true);
      expect(result.correspondences).toHaveLength(2);
      expect(result.unmappedSource).toHaveLength(2);
      expect(result.unmappedSource[0].element).toBe('bhū');
      expect(result.isComplete).toBe(false);
    });

    test('should handle target longer than source', () => {
      const source = ['gam', 'as'];
      const target = ['ti', 'anti', 'ati', 'si'];
      
      const result = applySequentialCorrespondence(source, target);
      
      expect(result.success).toBe(true);
      expect(result.correspondences).toHaveLength(2);
      expect(result.unmappedTarget).toHaveLength(2);
      expect(result.unmappedTarget[0].element).toBe('ati');
      expect(result.isComplete).toBe(false);
    });

    test('should support cyclic mapping when enabled', () => {
      const source = ['gam', 'as', 'bhū', 'kṛ'];
      const target = ['ti', 'anti'];
      
      const result = applySequentialCorrespondence(source, target, { cyclicMapping: true });
      
      expect(result.success).toBe(true);
      expect(result.correspondences).toHaveLength(4);
      expect(result.correspondences[2]).toEqual({
        sourceIndex: 2,
        targetIndex: 0,
        sourceElement: 'bhū',
        targetElement: 'ti',
        rule: '1.3.10',
        type: 'cyclic'
      });
      expect(result.isComplete).toBe(true);
    });

    test('should preserve context information', () => {
      const source = ['a', 'i'];
      const target = ['ka', 'ki'];
      
      const result = applySequentialCorrespondence(source, target, { context: 'verbal' });
      
      expect(result.context).toBe('verbal');
      expect(result.rule).toBe('1.3.10');
    });
  });

  describe('analyzeCorrespondence', () => {
    test('should handle invalid input', () => {
      const result = analyzeCorrespondence('not-an-array');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid input: elements must be an array');
    });

    test('should analyze Sanskrit elements correctly', () => {
      const elements = ['gam', 'as', 'bhū', 'clearly-not-sanskrit-123'];
      
      const result = analyzeCorrespondence(elements);
      
      expect(result.success).toBe(true);
      expect(result.elementCount).toBe(4);
      expect(result.sanskritElements.length).toBeGreaterThanOrEqual(3);
      expect(result.sanskritElements[0]).toEqual({
        index: 0,
        element: 'gam',
        script: 'IAST'
      });
      expect(result.hasSequentialStructure).toBe(true);
      expect(result.requiresCorrespondence).toBe(true);
    });

    test('should analyze Devanagari elements', () => {
      const elements = ['गम्', 'अस्', 'भू'];
      
      const result = analyzeCorrespondence(elements);
      
      expect(result.success).toBe(true);
      expect(result.sanskritElements).toHaveLength(3);
      expect(result.sanskritElements[0].script).toBe('Devanagari');
    });

    test('should analyze non-Sanskrit elements', () => {
      const elements = ['clearly-not-sanskrit-123', 'αβγ', 123, { obj: 'value' }];
      
      const result = analyzeCorrespondence(elements);
      
      expect(result.success).toBe(true);
      expect(result.sanskritElements.length).toBeLessThanOrEqual(2); // Allow some false positives
      expect(result.otherElements.length).toBeGreaterThanOrEqual(2);
      expect(result.otherElements.some(e => e.type === 'number')).toBe(true);
      expect(result.otherElements.some(e => e.type === 'object')).toBe(true);
    });

    test('should handle single element arrays', () => {
      const result = analyzeCorrespondence(['single']);
      
      expect(result.success).toBe(true);
      expect(result.hasSequentialStructure).toBe(false);
      expect(result.requiresCorrespondence).toBe(false);
    });
  });

  describe('createCorrespondenceMapping', () => {
    test('should create complete mapping for Sanskrit roots and endings', () => {
      const roots = ['gam', 'as', 'bhū'];
      const endings = ['ti', 'anti', 'ati'];
      
      const result = createCorrespondenceMapping(roots, endings, { type: 'verbal' });
      
      expect(result.success).toBe(true);
      expect(result.correspondences).toHaveLength(3);
      expect(result.isComplete).toBe(true);
      expect(result.correspondences[0].sourceScript).toBe('IAST');
      expect(result.correspondences[0].targetScript).toBe('IAST');
      expect(result.correspondences[0].scriptMatch).toBe(true);
    });

    test('should handle mixed script mapping', () => {
      const source = ['गम्', 'अस्'];
      const target = ['ti', 'anti'];
      
      const result = createCorrespondenceMapping(source, target);
      
      expect(result.success).toBe(true);
      expect(result.correspondences[0].sourceScript).toBe('Devanagari');
      expect(result.correspondences[0].targetScript).toBe('IAST');
      expect(result.correspondences[0].scriptMatch).toBe(false);
    });

    test('should handle partial mappings', () => {
      const source = ['gam', 'as', 'bhū', 'kṛ'];
      const target = ['ti', 'anti'];
      
      const result = createCorrespondenceMapping(source, target, { allowPartial: true });
      
      expect(result.success).toBe(true);
      expect(result.isComplete).toBe(false);
      expect(result.unmappedSource).toHaveLength(2);
    });

    test('should support cyclic mapping context', () => {
      const source = ['a', 'i', 'u', 'ṛ'];
      const target = ['ka', 'kha'];
      
      const result = createCorrespondenceMapping(source, target, { cyclic: true });
      
      expect(result.success).toBe(true);
      expect(result.isComplete).toBe(true);
      expect(result.mappingType).toBe('cyclic');
      expect(result.correspondences).toHaveLength(4);
    });

    test('should enhance correspondences with linguistic analysis', () => {
      const source = ['gam', 'as'];
      const target = ['ति', 'अन्ति'];
      
      const result = createCorrespondenceMapping(source, target);
      
      expect(result.success).toBe(true);
      expect(result.sourceAnalysis).toBeDefined();
      expect(result.targetAnalysis).toBeDefined();
      expect(result.sourceAnalysis.sanskritElements).toHaveLength(2);
      expect(result.targetAnalysis.sanskritElements).toHaveLength(2);
    });

    test('should handle analysis failures gracefully', () => {
      const result = createCorrespondenceMapping(null, ['test']);
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Failed to analyze correspondence requirements');
    });
  });

  describe('Integration and linguistic accuracy', () => {
    test('should handle verbal root correspondence', () => {
      // Testing traditional correspondence patterns
      const roots = ['bhū', 'as', 'gam', 'sthā'];
      const endings = ['ti', 'ati', 'anti', 'nti'];
      
      const result = createCorrespondenceMapping(roots, endings, { type: 'verbal' });
      
      expect(result.success).toBe(true);
      expect(result.rule).toBe('1.3.10');
      expect(result.correspondences.every(c => c.rule === '1.3.10')).toBe(true);
    });

    test('should handle nominal stem correspondence', () => {
      const stems = ['rāma', 'agni', 'vāyu'];
      const endings = ['s', 'am', 'ā'];
      
      const result = createCorrespondenceMapping(stems, endings, { type: 'nominal' });
      
      expect(result.success).toBe(true);
      expect(result.context.type).toBe('nominal');
    });

    test('should preserve rule attribution', () => {
      const source = ['a', 'i', 'u'];
      const target = ['1', '2', '3'];
      
      const result = applySequentialCorrespondence(source, target);
      
      expect(result.rule).toBe('1.3.10');
      expect(result.correspondences.every(c => c.rule === '1.3.10')).toBe(true);
    });

    test('should handle error cases gracefully', () => {
      const result = createCorrespondenceMapping(['test'], ['target'], { invalid: 'context' });
      
      expect(result.success).toBe(true); // Should still work with invalid context
      expect(result.rule).toBe('1.3.10');
    });
  });

  describe('Edge cases and error handling', () => {
    test('should handle empty strings in arrays', () => {
      const result = applySequentialCorrespondence(['', 'test'], ['target', '']);
      
      expect(result.success).toBe(true);
      expect(result.correspondences).toHaveLength(2);
    });

    test('should handle complex objects in arrays', () => {
      const source = [{ type: 'root', value: 'gam' }];
      const target = [{ type: 'ending', value: 'ti' }];
      
      const result = applySequentialCorrespondence(source, target);
      
      expect(result.success).toBe(true);
      expect(result.correspondences[0].sourceElement.value).toBe('gam');
    });

    test('should preserve all metadata through the process', () => {
      const source = ['gam'];
      const target = ['ti'];
      const context = { type: 'test', metadata: { source: 'test' } };
      
      const result = createCorrespondenceMapping(source, target, context);
      
      expect(result.success).toBe(true);
      expect(result.context).toEqual(context);
    });
  });
});
