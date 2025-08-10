/**
 * Test Suite for Sutra 1.1.31: द्वन्द्वे च (dvandve ca)
 * "And in Collective Compound (द्वन्द्व), the words सर्व etc. are not सर्वनाम।"
 */

import { 
  isDvandva,
  loseSarvanameInDvandva,
  isSarvanama,
  analyzeDvandvaSarvaname,
  analyzeDvandvaPatterns,
  getDvandvaExamples,
  validateSarvanameInDvandva,
  analyzeCombinedSarvanameExceptions
} from './index.js';

describe('Sutra 1.1.31: द्वन्द्वे च - Tests', () => {
  
  describe('Dvandva Detection', () => {
    test('should detect explicit dvandva marking', () => {
      expect(isDvandva('sarvānya', { compoundType: 'dvandva' })).toBe(true);
      expect(isDvandva('viśvubha', { compoundType: 'copulative' })).toBe(true);
      expect(isDvandva('ekadvi', { compoundType: 'collective' })).toBe(true);
    });

    test('should detect semantic coordination relations', () => {
      expect(isDvandva('compound', { semanticRelation: 'coordination' })).toBe(true);
      expect(isDvandva('compound', { semanticRelation: 'copulative' })).toBe(true);
      expect(isDvandva('compound', { semanticRelation: 'collective' })).toBe(true);
    });

    test('should detect dvandva markers', () => {
      expect(isDvandva('compound', { hasConjunction: true })).toBe(true);
      expect(isDvandva('sarvaca', {})).toBe(true); // contains 'ca'
      expect(isDvandva('विश्वच', {})).toBe(true); // contains 'च'
      expect(isDvandva('anyavā', {})).toBe(true); // contains 'vā'
      expect(isDvandva('उभवा', {})).toBe(true); // contains 'वा'
    });

    test('should return false for non-dvandva compounds', () => {
      expect(isDvandva('compound', { compoundType: 'tatpurusha' })).toBe(false);
      expect(isDvandva('compound', { semanticRelation: 'genitive' })).toBe(false);
      expect(isDvandva('simple', {})).toBe(false);
    });
  });

  describe('Sarvaname Loss in Dvandva', () => {
    test('should identify sarva words losing sarvaname status', () => {
      const context = { compound: 'sarvānya', compoundType: 'dvandva' };
      
      expect(loseSarvanameInDvandva('sarva', context)).toBe(true);
      expect(loseSarvanameInDvandva('viśva', context)).toBe(true);
      expect(loseSarvanameInDvandva('ubha', context)).toBe(true);
      expect(loseSarvanameInDvandva('anya', context)).toBe(true);
      expect(loseSarvanameInDvandva('eka', context)).toBe(true);
    });

    test('should handle Devanagari sarva words', () => {
      const context = { compound: 'सर्वान्य', compoundType: 'dvandva' };
      
      expect(loseSarvanameInDvandva('सर्व', context)).toBe(true);
      expect(loseSarvanameInDvandva('विश्व', context)).toBe(true);
      expect(loseSarvanameInDvandva('उभ', context)).toBe(true);
      expect(loseSarvanameInDvandva('अन्य', context)).toBe(true);
      expect(loseSarvanameInDvandva('एक', context)).toBe(true);
    });

    test('should not affect non-sarva words', () => {
      const context = { compound: 'compound', compoundType: 'dvandva' };
      
      expect(loseSarvanameInDvandva('rāma', context)).toBe(false);
      expect(loseSarvanameInDvandva('deva', context)).toBe(false);
      expect(loseSarvanameInDvandva('नर', context)).toBe(false);
      expect(loseSarvanameInDvandva('मन', context)).toBe(false);
    });

    test('should not apply outside dvandva context', () => {
      const context = { compound: 'compound', compoundType: 'bahuvrihi' };
      
      expect(loseSarvanameInDvandva('sarva', context)).toBe(false);
      expect(loseSarvanameInDvandva('viśva', context)).toBe(false);
      expect(loseSarvanameInDvandva('anya', context)).toBe(false);
    });
  });

  describe('Sarvaname Classification with Sutra 1.1.31', () => {
    test('should classify sarva words as non-sarvaname in dvandva', () => {
      const context = { compound: 'sarvānya', compoundType: 'dvandva' };
      
      expect(isSarvanama('sarva', context)).toBe(false);
      expect(isSarvanama('viśva', context)).toBe(false);
      expect(isSarvanama('ubha', context)).toBe(false);
      expect(isSarvanama('anya', context)).toBe(false);
    });

    test('should maintain sarvaname status outside dvandva', () => {
      const context = { compound: 'compound', compoundType: 'tatpurusha' };
      
      expect(isSarvanama('sarva', context)).toBe(true);
      expect(isSarvanama('viśva', context)).toBe(true);
      expect(isSarvanama('ubha', context)).toBe(true);
      expect(isSarvanama('anya', context)).toBe(true);
    });

    test('should return false for non-sarva words regardless of context', () => {
      const context1 = { compound: 'compound', compoundType: 'dvandva' };
      const context2 = { compound: 'compound', compoundType: 'tatpurusha' };
      
      expect(isSarvanama('rāma', context1)).toBe(false);
      expect(isSarvanama('rāma', context2)).toBe(false);
      expect(isSarvanama('deva', context1)).toBe(false);
      expect(isSarvanama('deva', context2)).toBe(false);
    });
  });

  describe('Dvandva Analysis', () => {
    test('should analyze dvandva compounds correctly', () => {
      const constituents = ['sarva', 'anya'];
      const context = { compoundType: 'dvandva' };
      
      const result = analyzeDvandvaSarvaname('sarvānya', constituents, context);
      
      expect(result.isDvandva).toBe(true);
      expect(result.sutraApplied).toBe(true);
      expect(result.nonSarvanameWords).toContain('sarva');
      expect(result.nonSarvanameWords).toContain('anya');
      expect(result.sarvanameWords).toHaveLength(0);
    });

    test('should analyze non-dvandva compounds correctly', () => {
      const constituents = ['sarva', 'loka'];
      const context = { compoundType: 'tatpurusha' };
      
      const result = analyzeDvandvaSarvaname('sarvaloka', constituents, context);
      
      expect(result.isDvandva).toBe(false);
      expect(result.sutraApplied).toBe(false);
      expect(result.sarvanameWords).toContain('sarva');
      expect(result.nonSarvanameWords).not.toContain('sarva');
    });

    test('should handle empty or invalid inputs', () => {
      expect(analyzeDvandvaSarvaname('', [], {})).toEqual({
        isDvandva: false,
        sarvanameWords: [],
        nonSarvanameWords: [],
        sutraApplied: false
      });
      
      expect(analyzeDvandvaSarvaname('compound', null, {})).toEqual({
        isDvandva: false,
        sarvanameWords: [],
        nonSarvanameWords: [],
        sutraApplied: false
      });
    });
  });

  describe('Dvandva Pattern Analysis', () => {
    test('should analyze simple coordinative patterns', () => {
      const result = analyzeDvandvaPatterns('sarvānya', ['sarva', 'anya']);
      
      expect(result.pattern).toBe('simple');
      expect(result.isIterative).toBe(false);
      expect(result.hasAlternation).toBe(false);
      expect(result.semanticGroup).toBe('pronouns');
    });

    test('should analyze iterative patterns', () => {
      const result = analyzeDvandvaPatterns('sarvaviśvaanya', ['sarva', 'viśva', 'anya']);
      
      expect(result.pattern).toBe('iterative');
      expect(result.isIterative).toBe(true);
      expect(result.semanticGroup).toBe('pronouns');
    });

    test('should analyze alternative patterns', () => {
      const result = analyzeDvandvaPatterns('sarva-vā-anya', ['sarva', 'anya']);
      
      expect(result.pattern).toBe('alternative');
      expect(result.hasAlternation).toBe(true);
    });

    test('should identify semantic groups', () => {
      const kinshipResult = analyzeDvandvaPatterns('mātāpitā', ['mātā', 'pitā']);
      expect(kinshipResult.semanticGroup).toBe('kinship');

      const directionResult = analyzeDvandvaPatterns('uttaradakṣiṇa', ['uttara', 'dakṣiṇa']);
      expect(directionResult.semanticGroup).toBe('directions');

      const numberResult = analyzeDvandvaPatterns('ekadvi', ['eka', 'dvi']);
      expect(numberResult.semanticGroup).toBe('numbers');
    });

    test('should handle invalid inputs', () => {
      expect(analyzeDvandvaPatterns('', [])).toEqual({
        pattern: 'unknown',
        isIterative: false,
        hasAlternation: false,
        semanticGroup: null
      });
      
      expect(analyzeDvandvaPatterns('compound', null)).toEqual({
        pattern: 'unknown',
        isIterative: false,
        hasAlternation: false,
        semanticGroup: null
      });
    });
  });

  describe('Examples and Educational Content', () => {
    test('should provide IAST examples', () => {
      const examples = getDvandvaExamples('IAST');
      
      expect(examples.simpleCoordinative).toContain('sarvānya');
      expect(examples.simpleCoordinative).toContain('viśvubha');
      expect(examples.iterativeCollective).toContain('sarvaviśvānya');
      expect(examples.descriptions).toEqual(
        expect.arrayContaining([
          expect.stringContaining('sarva + anya'),
          expect.stringContaining('viśva + ubha')
        ])
      );
    });

    test('should provide Devanagari examples', () => {
      const examples = getDvandvaExamples('Devanagari');
      
      expect(examples.simpleCoordinative).toContain('सर्वान्य');
      expect(examples.simpleCoordinative).toContain('विश्वउभ');
      expect(examples.iterativeCollective).toContain('सर्वविश्वान्य');
      expect(examples.descriptions).toEqual(
        expect.arrayContaining([
          expect.stringContaining('सर्व + अन्य'),
          expect.stringContaining('विश्व + उभ')
        ])
      );
    });
  });

  describe('Validation and Recommendations', () => {
    test('should validate dvandva compounds with sutra application', () => {
      const analysis = { constituents: ['sarva', 'anya'] };
      const context = { compoundType: 'dvandva' };
      
      const result = validateSarvanameInDvandva('sarvānya', analysis, context);
      
      expect(result.isValid).toBe(true);
      expect(result.dvandvaDetected).toBe(true);
      expect(result.sutra1131Applied).toBe(true);
      expect(result.pattern).toBe('simple');
      expect(result.semanticGroup).toBe('pronouns');
      expect(result.affectedWords).toContain('sarva');
      expect(result.affectedWords).toContain('anya');
      expect(result.recommendation).toContain('द्वन्द्व');
    });

    test('should validate non-dvandva compounds without sutra application', () => {
      const analysis = { constituents: ['sarva', 'loka'] };
      const context = { compoundType: 'tatpurusha' };
      
      const result = validateSarvanameInDvandva('sarvaloka', analysis, context);
      
      expect(result.isValid).toBe(true);
      expect(result.dvandvaDetected).toBe(false);
      expect(result.sutra1131Applied).toBe(false);
      expect(result.recommendation).toContain('Normal');
    });
  });

  describe('Combined Analysis (Sutras 1.1.30 and 1.1.31)', () => {
    test('should combine analysis from both sutras', () => {
      const constituents = ['sarva', 'anya'];
      const context = { compoundType: 'dvandva' };
      
      const result = analyzeCombinedSarvanameExceptions('sarvānya', constituents, context);
      
      expect(result.compound).toBe('sarvānya');
      expect(result.dvandva.isDvandva).toBe(true);
      expect(result.dvandva.sutraApplied).toBe(true);
      expect(result.exceptionsApplied.sutra1131).toBe(true);
      expect(result.recommendation).toContain('exceptions apply');
    });

    test('should handle tritiyasamasa context', () => {
      const constituents = ['sarva', 'kāma'];
      const context = { compoundType: 'tritiyasamasa' };
      
      const result = analyzeCombinedSarvanameExceptions('sarvakāma', constituents, context);
      
      expect(result.tritiyasamasa.isTritiyasamasa).toBe(true);
      expect(result.dvandva.isDvandva).toBe(false);
      expect(result.recommendation).toContain('exceptions apply');
    });

    test('should handle normal compounds', () => {
      const constituents = ['sarva', 'loka'];
      const context = { compoundType: 'tatpurusha' };
      
      const result = analyzeCombinedSarvanameExceptions('sarvaloka', constituents, context);
      
      expect(result.tritiyasamasa.isTritiyasamasa).toBe(false);
      expect(result.dvandva.isDvandva).toBe(false);
      expect(result.exceptionsApplied.sutra1130).toBe(false);
      expect(result.exceptionsApplied.sutra1131).toBe(false);
      expect(result.recommendation).toContain('Normal');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle null and undefined inputs', () => {
      expect(isDvandva(null)).toBe(false);
      expect(isDvandva(undefined)).toBe(false);
      expect(loseSarvanameInDvandva(null, {})).toBe(false);
      expect(isSarvanama(null, {})).toBe(false);
    });

    test('should handle empty strings', () => {
      expect(isDvandva('')).toBe(false);
      expect(loseSarvanameInDvandva('', {})).toBe(false);
      expect(isSarvanama('', {})).toBe(false);
    });

    test('should handle missing context', () => {
      expect(isDvandva('compound')).toBe(false);
      expect(loseSarvanameInDvandva('sarva')).toBe(false);
      expect(isSarvanama('sarva')).toBe(true); // Should default to normal classification
    });
  });

  describe('Integration with Compound Analysis', () => {
    test('should work with automatic dvandva detection', () => {
      const contexts = [
        { hasConjunction: true, semanticRelation: 'coordination' },
        { compoundType: 'copulative', semanticRelation: 'collective' }
      ];
      
      contexts.forEach(context => {
        expect(isDvandva('compound', context)).toBe(true);
        expect(isSarvanama('sarva', { ...context, compound: 'sarvānya' })).toBe(false);
      });
    });

    test('should handle mixed script inputs', () => {
      const context = { compoundType: 'dvandva' };
      
      expect(isSarvanama('sarva', context)).toBe(false); // IAST
      expect(isSarvanama('सर्व', context)).toBe(false); // Devanagari
      expect(isSarvanama('anya', context)).toBe(false); // IAST
      expect(isSarvanama('अन्य', context)).toBe(false); // Devanagari
    });

    test('should handle complex iterative compounds', () => {
      const constituents = ['sarva', 'viśva', 'anya', 'itara'];
      const context = { compoundType: 'dvandva' };
      
      const result = analyzeDvandvaSarvaname('sarvaviśvānyetara', constituents, context);
      
      expect(result.isDvandva).toBe(true);
      expect(result.sutraApplied).toBe(true);
      expect(result.sarvanameWords).toHaveLength(0);
      expect(result.nonSarvanameWords).toHaveLength(4);
    });
  });
});