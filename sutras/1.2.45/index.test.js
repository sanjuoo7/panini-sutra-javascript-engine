import { applySutra1_2_45, analyzePratipadika } from './index.js';

describe('Sutra 1.2.45: prātipadika classification', () => {
  describe('applySutra1_2_45() - Basic Functionality', () => {
    test('meaningful non-root word', () => {
      const res = applySutra1_2_45('deva');
      expect(res.isPratipadikaBase).toBe(true);
    });
    
    test('invalid input handled', () => {
      const res = applySutra1_2_45(null);
      expect(res.isPratipadikaBase).toBe(false);
    });

    test('identifies prātipadika stem', () => {
      const res = applySutra1_2_45('rāma');
      expect(res.applies).toBe(true);
      expect(res.isPratipadikaBase).toBe(true);
    });

    test('handles compound words', () => {
      const res = applySutra1_2_45('devadatta');
      expect(res.isPratipadikaBase).toBe(true);
    });
  });

  describe('analyzePratipadika() - Comprehensive Analysis', () => {
    describe('Core Functionality', () => {
      test('should analyze prātipadika for simple stem', () => {
        const result = analyzePratipadika('deva');
        
        expect(result.pratipadikaAnalysis.applies).toBe(true);
        expect(result.pratipadikaAnalysis.count).toBe(1);
        expect(result.pratipadikaAnalysis.hasValidStructure).toBe(true);
        expect(result.sutraReference.number).toBe('1.2.45');
      });

      test('should analyze multiple words', () => {
        const result = analyzePratipadika('deva rāma');
        
        expect(result.pratipadikaAnalysis.applies).toBe(true);
        expect(result.pratipadikaAnalysis.count).toBe(2);
        expect(result.pratipadikaAnalysis.totalWords).toBe(2);
      });

      test('should provide sutra reference and rule', () => {
        const result = analyzePratipadika('deva');
        
        expect(result.sutraReference.number).toBe('1.2.45');
        expect(result.sutraReference.sanskrit).toBe('अर्थवदधातुरप्रत्ययः प्रातिपदिकम्');
        expect(result.sutraReference.iast).toBe('arthavadadhāturapratyayaḥ prātipadikam');
        expect(result.sutraReference.type).toBe('saṃjñā');
      });
    });

    describe('Prātipadika Classification Analysis', () => {
      test('should classify individual words correctly', () => {
        const result = analyzePratipadika('deva rāma');
        
        expect(result.pratipadikaAnalysis.classifications.length).toBe(2);
        expect(result.pratipadikaAnalysis.classifications[0].word).toBe('deva');
        expect(result.pratipadikaAnalysis.classifications[0].isPratipadika).toBe(true);
        expect(result.pratipadikaAnalysis.classifications[1].word).toBe('rāma');
        expect(result.pratipadikaAnalysis.classifications[1].isPratipadika).toBe(true);
      });

      test('should provide reasoning for classification', () => {
        const result = analyzePratipadika('deva');
        
        expect(result.pratipadikaAnalysis.reasoning).toContain('Valid prātipadika forms');
        expect(result.pratipadikaAnalysis.classifications[0].reasoning).toContain('criteria');
      });

      test('should handle non-prātipadika forms', () => {
        const result = analyzePratipadika(''); // empty input
        
        expect(result.pratipadikaAnalysis.applies).toBe(false);
        expect(result.pratipadikaAnalysis.hasValidStructure).toBe(false);
        expect(result.pratipadikaAnalysis.count).toBe(0);
      });
    });

    describe('Morphological Analysis', () => {
      test('should analyze morphological properties', () => {
        const result = analyzePratipadika('deva rāma');
        
        expect(result.morphologicalAnalysis.text).toBeDefined();
        expect(result.morphologicalAnalysis.wordCount).toBe(2);
        expect(result.morphologicalAnalysis.morphologicalScope).toBe('nominal_stem');
        expect(result.morphologicalAnalysis.grammaticalFunction).toBe('stem_formation');
      });

      test('should identify affected elements', () => {
        const result = analyzePratipadika('devadatta');
        
        expect(result.morphologicalAnalysis.affectedElements).toEqual(['devadatta']);
        expect(result.morphologicalAnalysis.linguisticLevel).toBe('morphological');
        expect(result.morphologicalAnalysis.morphologicalType).toBe('stem_classification');
      });
    });

    describe('Phonetic Analysis', () => {
      test('should analyze phonetic properties', () => {
        const result = analyzePratipadika('deva');
        
        expect(result.phoneticAnalysis.originalText).toBeDefined();
        expect(result.phoneticAnalysis.phoneticScope).toBe('stem_phonology');
        expect(result.phoneticAnalysis.wordCount).toBe(1);
        expect(result.phoneticAnalysis.phoneticContext).toBe('nominal_stem');
      });

      test('should track phonetic pattern', () => {
        const result = analyzePratipadika('deva rāma');
        
        expect(result.phoneticAnalysis.phoneticPattern).toEqual(['deva', 'rāma']);
        expect(result.phoneticAnalysis.phoneticChanges).toEqual([]);
      });
    });

    describe('Lexical Analysis', () => {
      test('should analyze lexical properties', () => {
        const result = analyzePratipadika('deva');
        
        expect(result.lexicalAnalysis.lexicalScope).toBe('nominal_vocabulary');
        expect(result.lexicalAnalysis.semanticFunction).toBe('meaning_bearing');
        expect(result.lexicalAnalysis.lexicalCategory).toBe('substantive');
        expect(result.lexicalAnalysis.meaningType).toBe('referential');
      });

      test('should classify lexical elements', () => {
        const result = analyzePratipadika('deva rāma');
        
        expect(result.lexicalAnalysis.lexicalElements).toEqual(['deva', 'rāma']);
        expect(result.lexicalAnalysis.semanticClassification).toBe('prātipadika_stems');
      });
    });

    describe('Traditional Commentary', () => {
      test('should include Kashika commentary', () => {
        const result = analyzePratipadika('deva');
        
        expect(result.traditionalCommentary.kashika.sanskrit).toBeDefined();
        expect(result.traditionalCommentary.kashika.iast).toBeDefined();
        expect(result.traditionalCommentary.kashika.english).toBeDefined();
      });

      test('should include Mahabhashya commentary', () => {
        const result = analyzePratipadika('deva');
        
        expect(result.traditionalCommentary.mahabhashya.sanskrit).toBeDefined();
        expect(result.traditionalCommentary.mahabhashya.iast).toBeDefined();
        expect(result.traditionalCommentary.mahabhashya.english).toBeDefined();
      });
    });

    describe('Confidence Scoring', () => {
      test('should assign high confidence to clear prātipadika cases', () => {
        const result = analyzePratipadika('deva');
        
        expect(result.confidence).toBeGreaterThan(70);
        expect(result.confidence).toBeLessThanOrEqual(100);
      });

      test('should assign lower confidence to unclear cases', () => {
        const result = analyzePratipadika('');
        
        expect(result.confidence).toBe(0);
      });

      test('should handle multiple prātipadika forms', () => {
        const result = analyzePratipadika('deva rāma sītā');
        
        expect(result.confidence).toBeGreaterThan(80); // High confidence for multiple valid forms
      });
    });

    describe('Input Validation', () => {
      test('should handle invalid input gracefully', () => {
        const result = analyzePratipadika('');
        
        // Empty string should trigger error handling
        expect(result.confidence).toBe(0);
        expect(result.pratipadikaAnalysis.applies).toBe(false);
      });

      test('should handle undefined input', () => {
        const result = analyzePratipadika(undefined);
        
        expect(result.error).toBeDefined();
        expect(result.confidence).toBe(0);
      });

      test('should handle object input with text property', () => {
        const result = analyzePratipadika({ text: 'deva' });
        
        expect(result.pratipadikaAnalysis.applies).toBe(true);
        expect(result.confidence).toBeGreaterThan(0);
      });
    });

    describe('Complex Cases', () => {
      test('should handle compound stems', () => {
        const result = analyzePratipadika('devadatta rāmacandra');
        
        expect(result.pratipadikaAnalysis.count).toBe(2);
        expect(result.confidence).toBeGreaterThan(80);
      });

      test('should distinguish stems from affixes', () => {
        const result = analyzePratipadika('deva'); // pure stem
        
        expect(result.pratipadikaAnalysis.applies).toBe(true);
        expect(result.pratipadikaAnalysis.classifications[0].isPratipadika).toBe(true);
      });
    });
  });
});
