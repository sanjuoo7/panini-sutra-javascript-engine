/**
 * Test Suite for Sutra 1.1.30: तृतीयासमासे (tṛtīyāsamāse)
 * "In the Instrumental Determinative Compounds the words सर्व etc. are not सर्वनाम।"
 */

import { 
  isTritiyasamasa,
  loseSarvanameInTritiyasamasa,
  isSarvanama,
  analyzeCompoundSarvaname,
  getTritiyasamasaExamples,
  validateSarvanameInCompound
} from './index.js';

describe('Sutra 1.1.30: तृतीयासमासे - Tests', () => {
  
  describe('Tritiyasamasa Detection', () => {
    test('should detect explicit tritiyasamasa marking', () => {
      expect(isTritiyasamasa('sarvakāma', { compoundType: 'tritiyasamasa' })).toBe(true);
      expect(isTritiyasamasa('viśvakarmā', { compoundType: 'instrumental_determinative' })).toBe(true);
    });

    test('should detect semantic instrumental relations', () => {
      expect(isTritiyasamasa('compound', { semanticRelation: 'instrumental' })).toBe(true);
      expect(isTritiyasamasa('compound', { semanticRelation: 'karana' })).toBe(true);
    });

    test('should return false for non-tritiyasamasa compounds', () => {
      expect(isTritiyasamasa('compound', { compoundType: 'tatpurusha' })).toBe(false);
      expect(isTritiyasamasa('compound', { semanticRelation: 'genitive' })).toBe(false);
    });
  });

  describe('Sarvaname Loss in Tritiyasamasa', () => {
    test('should identify sarva words losing sarvaname status', () => {
      const context = { compound: 'sarvakāma', compoundType: 'tritiyasamasa' };
      
      expect(loseSarvanameInTritiyasamasa('sarva', context)).toBe(true);
      expect(loseSarvanameInTritiyasamasa('viśva', context)).toBe(true);
      expect(loseSarvanameInTritiyasamasa('ubha', context)).toBe(true);
      expect(loseSarvanameInTritiyasamasa('anya', context)).toBe(true);
    });

    test('should handle Devanagari sarva words', () => {
      const context = { compound: 'सर्वकाम', compoundType: 'tritiyasamasa' };
      
      expect(loseSarvanameInTritiyasamasa('सर्व', context)).toBe(true);
      expect(loseSarvanameInTritiyasamasa('विश्व', context)).toBe(true);
      expect(loseSarvanameInTritiyasamasa('उभ', context)).toBe(true);
      expect(loseSarvanameInTritiyasamasa('अन्य', context)).toBe(true);
    });

    test('should not affect non-sarva words', () => {
      const context = { compound: 'compound', compoundType: 'tritiyasamasa' };
      
      expect(loseSarvanameInTritiyasamasa('rāma', context)).toBe(false);
      expect(loseSarvanameInTritiyasamasa('deva', context)).toBe(false);
      expect(loseSarvanameInTritiyasamasa('नर', context)).toBe(false);
    });

    test('should not apply outside tritiyasamasa context', () => {
      const context = { compound: 'compound', compoundType: 'bahuvrihi' };
      
      expect(loseSarvanameInTritiyasamasa('sarva', context)).toBe(false);
      expect(loseSarvanameInTritiyasamasa('viśva', context)).toBe(false);
    });
  });

  describe('Sarvaname Classification with Sutra 1.1.30', () => {
    test('should classify sarva words as non-sarvaname in tritiyasamasa', () => {
      const context = { compound: 'sarvakāma', compoundType: 'tritiyasamasa' };
      
      expect(isSarvanama('sarva', context)).toBe(false);
      expect(isSarvanama('viśva', context)).toBe(false);
      expect(isSarvanama('ubha', context)).toBe(false);
    });

    test('should maintain sarvaname status outside tritiyasamasa', () => {
      const context = { compound: 'compound', compoundType: 'tatpurusha' };
      
      expect(isSarvanama('sarva', context)).toBe(true);
      expect(isSarvanama('viśva', context)).toBe(true);
      expect(isSarvanama('ubha', context)).toBe(true);
    });

    test('should return false for non-sarva words regardless of context', () => {
      const context1 = { compound: 'compound', compoundType: 'tritiyasamasa' };
      const context2 = { compound: 'compound', compoundType: 'tatpurusha' };
      
      expect(isSarvanama('rāma', context1)).toBe(false);
      expect(isSarvanama('rāma', context2)).toBe(false);
      expect(isSarvanama('deva', context1)).toBe(false);
      expect(isSarvanama('deva', context2)).toBe(false);
    });
  });

  describe('Compound Analysis', () => {
    test('should analyze tritiyasamasa compounds correctly', () => {
      const constituents = ['sarva', 'kāma'];
      const context = { compoundType: 'tritiyasamasa' };
      
      const result = analyzeCompoundSarvaname('sarvakāma', constituents, context);
      
      expect(result.isTritiyasamasa).toBe(true);
      expect(result.sutraApplied).toBe(true);
      expect(result.nonSarvanameWords).toContain('sarva');
      expect(result.sarvanameWords).not.toContain('sarva');
    });

    test('should analyze non-tritiyasamasa compounds correctly', () => {
      const constituents = ['sarva', 'loka'];
      const context = { compoundType: 'tatpurusha' };
      
      const result = analyzeCompoundSarvaname('sarvaloka', constituents, context);
      
      expect(result.isTritiyasamasa).toBe(false);
      expect(result.sutraApplied).toBe(false);
      expect(result.sarvanameWords).toContain('sarva');
      expect(result.nonSarvanameWords).not.toContain('sarva');
    });

    test('should handle empty or invalid inputs', () => {
      expect(analyzeCompoundSarvaname('', [], {})).toEqual({
        isTritiyasamasa: false,
        sarvanameWords: [],
        nonSarvanameWords: [],
        sutraApplied: false
      });
      
      expect(analyzeCompoundSarvaname('compound', null, {})).toEqual({
        isTritiyasamasa: false,
        sarvanameWords: [],
        nonSarvanameWords: [],
        sutraApplied: false
      });
    });
  });

  describe('Examples and Educational Content', () => {
    test('should provide IAST examples', () => {
      const examples = getTritiyasamasaExamples('IAST');
      
      expect(examples.instrumentalCompounds).toContain('sarvakāma');
      expect(examples.instrumentalCompounds).toContain('viśvakarmā');
      expect(examples.descriptions).toEqual(
        expect.arrayContaining([
          expect.stringContaining('sarva + kāma'),
          expect.stringContaining('viśva + karmā')
        ])
      );
    });

    test('should provide Devanagari examples', () => {
      const examples = getTritiyasamasaExamples('Devanagari');
      
      expect(examples.instrumentalCompounds).toContain('सर्वकाम');
      expect(examples.instrumentalCompounds).toContain('विश्वकर्मा');
      expect(examples.descriptions).toEqual(
        expect.arrayContaining([
          expect.stringContaining('सर्व + काम'),
          expect.stringContaining('विश्व + कर्मा')
        ])
      );
    });
  });

  describe('Validation and Recommendations', () => {
    test('should validate compounds with sutra application', () => {
      const analysis = { constituents: ['sarva', 'kāma'] };
      const context = { compoundType: 'tritiyasamasa' };
      
      const result = validateSarvanameInCompound('sarvakāma', analysis, context);
      
      expect(result.isValid).toBe(true);
      expect(result.tritiyasamasaDetected).toBe(true);
      expect(result.sutra1130Applied).toBe(true);
      expect(result.affectedWords).toContain('sarva');
      expect(result.recommendation).toContain('तृतीयासमास');
    });

    test('should validate compounds without sutra application', () => {
      const analysis = { constituents: ['sarva', 'loka'] };
      const context = { compoundType: 'tatpurusha' };
      
      const result = validateSarvanameInCompound('sarvaloka', analysis, context);
      
      expect(result.isValid).toBe(true);
      expect(result.tritiyasamasaDetected).toBe(false);
      expect(result.sutra1130Applied).toBe(false);
      expect(result.recommendation).toContain('Normal');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle null and undefined inputs', () => {
      expect(isTritiyasamasa(null)).toBe(false);
      expect(isTritiyasamasa(undefined)).toBe(false);
      expect(loseSarvanameInTritiyasamasa(null, {})).toBe(false);
      expect(isSarvanama(null, {})).toBe(false);
    });

    test('should handle empty strings', () => {
      expect(isTritiyasamasa('')).toBe(false);
      expect(loseSarvanameInTritiyasamasa('', {})).toBe(false);
      expect(isSarvanama('', {})).toBe(false);
    });

    test('should handle missing context', () => {
      expect(isTritiyasamasa('compound')).toBe(false);
      expect(loseSarvanameInTritiyasamasa('sarva')).toBe(false);
      expect(isSarvanama('sarva')).toBe(true); // Should default to normal classification
    });
  });

  describe('Integration with Other Sutras', () => {
    test('should work with compound type detection', () => {
      const contexts = [
        { compoundType: 'tritiyasamasa', semanticRelation: 'instrumental' },
        { compoundType: 'instrumental_determinative', semanticRelation: 'karana' }
      ];
      
      contexts.forEach(context => {
        expect(isTritiyasamasa('compound', context)).toBe(true);
        expect(isSarvanama('sarva', { ...context, compound: 'sarvakāma' })).toBe(false);
      });
    });

    test('should handle mixed script inputs', () => {
      const context = { compoundType: 'tritiyasamasa' };
      
      expect(isSarvanama('sarva', context)).toBe(false); // IAST
      expect(isSarvanama('सर्व', context)).toBe(false); // Devanagari
    });
  });
});