import { applySutra1_2_40, analyzeSannatara } from './index.js';
import { ACCENT_TYPES, applyAnudatta, applyUdatta, applySvarita } from '../sanskrit-utils/accent-analysis.js';

describe('Sutra 1.2.40: sannatara accent substitution', () => {
  describe('applySutra1_2_40() - Basic Functionality', () => {
    test('applies to anudātta followed by udātta', () => {
      const seq = applyAnudatta('a') + applyUdatta('i');
      const res = applySutra1_2_40(seq);
      expect(res.applies).toBe(true);
      expect(res.metadata.length).toBe(1);
      expect(res.metadata[0].accentTo).toBe(ACCENT_TYPES.SANNATARA);
    });

    test('applies to anudātta followed by svarita', () => {
      const seq = applyAnudatta('a') + applySvarita('i');
      const res = applySutra1_2_40(seq);
      expect(res.applies).toBe(true);
      expect(res.metadata[0].accentTo).toBe(ACCENT_TYPES.SANNATARA);
    });

    test('does not apply when no following accented vowel', () => {
      const seq = applyAnudatta('a') + 'k';
      const res = applySutra1_2_40(seq);
      expect(res.applies).toBe(false);
    });

    test('multiple occurrences detected', () => {
      const seq = applyAnudatta('a') + applyUdatta('i') + applyAnudatta('a') + applySvarita('u');
      const res = applySutra1_2_40(seq);
      expect(res.count).toBe(2);
      expect(res.metadata.length).toBe(2);
    });

    test('render option currently yields identical surface form', () => {
      const seq = applyAnudatta('a') + applyUdatta('i');
      const res = applySutra1_2_40(seq, {}, { render: true });
      expect(res.transformed).toBe(seq); // placeholder rendering
    });

    test('gracefully handles invalid input', () => {
      const res = applySutra1_2_40(null);
      expect(res.applies).toBe(false);
    });
  });

  describe('analyzeSannatara() - Comprehensive Analysis', () => {
    describe('Core Functionality', () => {
      test('should analyze sannatara for simple case', () => {
        const seq = applyAnudatta('a') + applyUdatta('i');
        const result = analyzeSannatara(seq);
        
        expect(result.sannataraAnalysis.applies).toBe(true);
        expect(result.sannataraAnalysis.count).toBe(1);
        expect(result.sannataraAnalysis.hasValidTargets).toBe(true);
        expect(result.sutraReference.number).toBe('1.2.40');
      });

      test('should analyze sannatara for multiple cases', () => {
        const seq = applyAnudatta('a') + applyUdatta('i') + applyAnudatta('a') + applySvarita('u');
        const result = analyzeSannatara(seq);
        
        expect(result.sannataraAnalysis.applies).toBe(true);
        expect(result.sannataraAnalysis.count).toBe(2);
        expect(result.sannataraAnalysis.targetIndices.length).toBe(2);
      });

      test('should provide sutra reference and rule', () => {
        const seq = applyAnudatta('a') + applyUdatta('i');
        const result = analyzeSannatara(seq);
        
        expect(result.sutraReference.number).toBe('1.2.40');
        expect(result.sutraReference.sanskrit).toBe('उदात्तस्वरितपरस्य सन्नतरः');
        expect(result.sutraReference.iast).toBe('udāttasvaritaparasya sannataraḥ');
        expect(result.sutraReference.type).toBe('vidhi');
      });
    });

    describe('Sannatara Application Analysis', () => {
      test('should identify target indices correctly', () => {
        const seq = applyAnudatta('a') + applyUdatta('i') + 'k' + applyAnudatta('u') + applySvarita('e');
        const result = analyzeSannatara(seq);
        
        expect(result.sannataraAnalysis.targetIndices).toEqual([0, 3]);
        expect(result.sannataraAnalysis.reasoning).toContain('1.2.40 conditions met');
      });

      test('should track accent changes', () => {
        const seq = applyAnudatta('a') + applyUdatta('i');
        const result = analyzeSannatara(seq);
        
        expect(result.sannataraAnalysis.accentChanges.length).toBe(1);
        expect(result.sannataraAnalysis.accentChanges[0].accentFrom).toBe(ACCENT_TYPES.ANUDATTA);
        expect(result.sannataraAnalysis.accentChanges[0].accentTo).toBe(ACCENT_TYPES.SANNATARA);
      });

      test('should handle no application cases', () => {
        const seq = applyAnudatta('a') + 'k';
        const result = analyzeSannatara(seq);
        
        expect(result.sannataraAnalysis.applies).toBe(false);
        expect(result.sannataraAnalysis.hasValidTargets).toBe(false);
        expect(result.sannataraAnalysis.count).toBe(0);
      });
    });

    describe('Morphological Analysis', () => {
      test('should analyze morphological properties', () => {
        const seq = applyAnudatta('a') + applyUdatta('i') + ' ' + applyAnudatta('u') + applySvarita('e');
        const result = analyzeSannatara(seq);
        
        expect(result.morphologicalAnalysis.text).toBeDefined();
        expect(result.morphologicalAnalysis.wordCount).toBe(2);
        expect(result.morphologicalAnalysis.morphologicalScope).toBe('prosodic_unit');
        expect(result.morphologicalAnalysis.accentualFunction).toBe('stress_modification');
      });

      test('should identify affected positions', () => {
        const seq = applyAnudatta('a') + applyUdatta('i') + applyAnudatta('u') + applySvarita('e');
        const result = analyzeSannatara(seq);
        
        expect(result.morphologicalAnalysis.affectedPositions).toEqual([0, 2]);
        expect(result.morphologicalAnalysis.linguisticLevel).toBe('suprasegmental');
      });
    });

    describe('Phonetic Analysis', () => {
      test('should analyze phonetic changes', () => {
        const seq = applyAnudatta('a') + applyUdatta('i');
        const result = analyzeSannatara(seq);
        
        expect(result.phoneticAnalysis.originalText).toBeDefined();
        expect(result.phoneticAnalysis.accentedVowels).toBe(1);
        expect(result.phoneticAnalysis.phoneticChanges.length).toBe(1);
        expect(result.phoneticAnalysis.phoneticScope).toBe('vowel_accent');
      });

      test('should track accent pattern', () => {
        const seq = applyAnudatta('a') + applyUdatta('i');
        const result = analyzeSannatara(seq);
        
        expect(result.phoneticAnalysis.accentPattern).toEqual([ACCENT_TYPES.ANUDATTA, ACCENT_TYPES.UDATTA]);
        expect(result.phoneticAnalysis.phoneticChanges[0].originalAccent).toBe(ACCENT_TYPES.ANUDATTA);
        expect(result.phoneticAnalysis.phoneticChanges[0].newAccent).toBe(ACCENT_TYPES.SANNATARA);
      });
    });

    describe('Prosodic Analysis', () => {
      test('should analyze prosodic function', () => {
        const seq = applyAnudatta('a') + applyUdatta('i');
        const result = analyzeSannatara(seq);
        
        expect(result.prosodicAnalysis.prosodicFunction).toBe('accent_harmony');
        expect(result.prosodicAnalysis.accentualContext).toBe('udātta_svarita_following');
        expect(result.prosodicAnalysis.prosodicScope).toBe('syllable_sequence');
        expect(result.prosodicAnalysis.metricalImplication).toBe('stress_redistribution');
      });

      test('should track application count', () => {
        const seq = applyAnudatta('a') + applyUdatta('i') + applyAnudatta('u') + applySvarita('e');
        const result = analyzeSannatara(seq);
        
        expect(result.prosodicAnalysis.applicationCount).toBe(2);
        expect(result.prosodicAnalysis.prosodicPattern.changedPositions).toEqual([0, 2]);
      });
    });

    describe('Traditional Commentary', () => {
      test('should include Kashika commentary', () => {
        const seq = applyAnudatta('a') + applyUdatta('i');
        const result = analyzeSannatara(seq);
        
        expect(result.traditionalCommentary.kashika.sanskrit).toBeDefined();
        expect(result.traditionalCommentary.kashika.iast).toBeDefined();
        expect(result.traditionalCommentary.kashika.english).toBeDefined();
      });

      test('should include Mahabhashya commentary', () => {
        const seq = applyAnudatta('a') + applyUdatta('i');
        const result = analyzeSannatara(seq);
        
        expect(result.traditionalCommentary.mahabhashya.sanskrit).toBeDefined();
        expect(result.traditionalCommentary.mahabhashya.iast).toBeDefined();
        expect(result.traditionalCommentary.mahabhashya.english).toBeDefined();
      });
    });

    describe('Confidence Scoring', () => {
      test('should assign high confidence to clear sannatara cases', () => {
        const seq = applyAnudatta('a') + applyUdatta('i');
        const result = analyzeSannatara(seq);
        
        expect(result.confidence).toBeGreaterThan(80);
        expect(result.confidence).toBeLessThanOrEqual(100);
      });

      test('should assign medium confidence to partial cases', () => {
        const seq = applyAnudatta('a') + 'k';
        const result = analyzeSannatara(seq);
        
        expect(result.confidence).toBeLessThan(50);
      });

      test('should cap confidence at 100', () => {
        const seq = applyAnudatta('a') + applyUdatta('i') + applyAnudatta('u') + applySvarita('e');
        const result = analyzeSannatara(seq);
        
        expect(result.confidence).toBeLessThanOrEqual(100);
      });
    });

    describe('Input Validation', () => {
      test('should handle invalid input gracefully', () => {
        const result = analyzeSannatara('');
        
        expect(result.error).toBeDefined();
        expect(result.confidence).toBe(0);
        expect(result.sannataraAnalysis.applies).toBe(false);
      });

      test('should handle undefined input', () => {
        const result = analyzeSannatara(undefined);
        
        expect(result.error).toBeDefined();
        expect(result.confidence).toBe(0);
      });

      test('should handle object input with text property', () => {
        const seq = applyAnudatta('a') + applyUdatta('i');
        const result = analyzeSannatara({ text: seq });
        
        expect(result.sannataraAnalysis.applies).toBe(true);
        expect(result.confidence).toBeGreaterThan(0);
      });
    });

    describe('Complex Cases', () => {
      test('should handle mixed accent sequences', () => {
        const seq = applyUdatta('a') + applyAnudatta('i') + applyUdatta('u') + applyAnudatta('e') + applySvarita('o');
        const result = analyzeSannatara(seq);
        
        expect(result.sannataraAnalysis.count).toBe(2); // 'i' before 'u' and 'e' before 'o' qualify
        expect(result.confidence).toBeGreaterThan(0);
      });

      test('should handle no accent application', () => {
        const seq = 'simple text';
        const result = analyzeSannatara(seq);
        
        expect(result.sannataraAnalysis.applies).toBe(false);
        expect(result.sannataraAnalysis.hasValidTargets).toBe(false);
        expect(result.confidence).toBeLessThan(30);
      });
    });
  });
});
