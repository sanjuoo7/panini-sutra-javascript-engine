import { sutra1232, analyzeSvaritaDecomposition } from './index.js';
import { applySvarita } from '../sanskrit-utils/accent-analysis.js';
import { decomposeSvarita } from '../sanskrit-utils/accent-prosody-analysis.js';

describe('Sutra 1.2.32: तस्यादित उदात्तमर्धह्रस्वम्', () => {
  describe('sutra1232() - Basic Functionality', () => {
    it('decomposes hrasva svarita (â)', () => {
      const input = 'â';
      const result = sutra1232(input);
      expect(result.applies).toBe(true);
      expect(result.segments[0].role).toBe('udātta-initial');
      expect(result.segments[0].units).toBe(0.5);
    });

    it('decomposes dirgha svarita (ā̂)', () => {
      const input = 'ā̂';
      const result = sutra1232(input);
      expect(result.applies).toBe(true);
      expect(result.durationUnits).toBeGreaterThanOrEqual(2);
      const fall = result.segments.find(s => s.role === 'anudātta-fall');
      expect(fall.units).toBeGreaterThan(0.5);
    });

    it('rejects pure udātta', () => {
      const result = sutra1232('á');
      expect(result.applies).toBe(false);
    });

    it('rejects plain vowel strict mode', () => {
      const result = sutra1232('a', { strict: true });
      expect(result.applies).toBe(false);
    });

    it('handles decomposed combining form (a + ̂)', () => {
      const input = 'a' + '\u0302';
      const result = sutra1232(input);
      expect(result.applies).toBe(true);
    });

    it('handles non-string input gracefully', () => {
      const result = sutra1232(123);
      expect(result.applies).toBe(false);
    });

    it('matches direct utility decomposition', () => {
      const input = 'â';
      const direct = decomposeSvarita(input);
      const viaSutra = sutra1232(input);
      expect(viaSutra.segments).toEqual(direct.segments);
    });
  });

  describe('analyzeSvaritaDecomposition() - Comprehensive Analysis', () => {
    describe('Core Functionality', () => {
      test('should analyze svarita decomposition for simple case', () => {
        const result = analyzeSvaritaDecomposition('â');
        
        expect(result.decompositionAnalysis.applies).toBe(true);
        expect(result.decompositionAnalysis.count).toBe(1);
        expect(result.decompositionAnalysis.hasValidStructure).toBe(true);
        expect(result.sutraReference.number).toBe('1.2.32');
      });

      test('should analyze multiple svarita vowels', () => {
        const result = analyzeSvaritaDecomposition('âî');
        
        expect(result.decompositionAnalysis.applies).toBe(true);
        expect(result.decompositionAnalysis.count).toBeGreaterThanOrEqual(1);
        expect(result.decompositionAnalysis.totalVowels).toBe(2);
      });

      test('should provide sutra reference and rule', () => {
        const result = analyzeSvaritaDecomposition('â');
        
        expect(result.sutraReference.number).toBe('1.2.32');
        expect(result.sutraReference.sanskrit).toBe('तस्यादित उदात्तमर्धह्रस्वम्');
        expect(result.sutraReference.iast).toBe('tasyādita udāttam ardha-hrasvam');
        expect(result.sutraReference.type).toBe('vidhi');
      });
    });

    describe('Decomposition Structure Analysis', () => {
      test('should identify decomposable vowels correctly', () => {
        const result = analyzeSvaritaDecomposition('âá');
        
        expect(result.decompositionAnalysis.decompositions.length).toBe(2);
        expect(result.decompositionAnalysis.decompositions[0].applies).toBe(true); // svarita
        expect(result.decompositionAnalysis.decompositions[1].applies).toBe(false); // udātta
      });

      test('should provide reasoning for decomposition', () => {
        const result = analyzeSvaritaDecomposition('â');
        
        expect(result.decompositionAnalysis.reasoning).toContain('Svarita decomposition applicable');
        expect(result.decompositionAnalysis.decompositions[0].reasoning).toContain('1.2.32');
      });

      test('should handle no svarita cases', () => {
        const result = analyzeSvaritaDecomposition('áà');
        
        expect(result.decompositionAnalysis.applies).toBe(false);
        expect(result.decompositionAnalysis.hasValidStructure).toBe(false);
        expect(result.decompositionAnalysis.count).toBe(0);
      });

      test('should track decomposition segments', () => {
        const result = analyzeSvaritaDecomposition('â');
        
        expect(result.decompositionAnalysis.decompositions[0].segments).toBeDefined();
        expect(result.decompositionAnalysis.decompositions[0].segments.length).toBeGreaterThan(0);
      });
    });

    describe('Morphological Analysis', () => {
      test('should analyze morphological properties', () => {
        const result = analyzeSvaritaDecomposition('â');
        
        expect(result.morphologicalAnalysis.text).toBeDefined();
        expect(result.morphologicalAnalysis.vowelCount).toBe(1);
        expect(result.morphologicalAnalysis.morphologicalScope).toBe('prosodic_segmentation');
        expect(result.morphologicalAnalysis.grammaticalFunction).toBe('accent_decomposition');
      });

      test('should identify affected elements', () => {
        const result = analyzeSvaritaDecomposition('âî');
        
        expect(result.morphologicalAnalysis.affectedElements.length).toBeGreaterThanOrEqual(1);
        expect(result.morphologicalAnalysis.linguisticLevel).toBe('suprasegmental');
        expect(result.morphologicalAnalysis.morphologicalType).toBe('prosodic_structure');
      });
    });

    describe('Phonetic Analysis', () => {
      test('should analyze phonetic properties', () => {
        const result = analyzeSvaritaDecomposition('â');
        
        expect(result.phoneticAnalysis.originalText).toBeDefined();
        expect(result.phoneticAnalysis.phoneticScope).toBe('prosodic_timing');
        expect(result.phoneticAnalysis.vowelCount).toBe(1);
        expect(result.phoneticAnalysis.phoneticContext).toBe('accent_decomposition');
      });

      test('should track temporal structure', () => {
        const result = analyzeSvaritaDecomposition('â');
        
        expect(result.phoneticAnalysis.temporalStructure).toBe('segmented_prosody');
        expect(result.phoneticAnalysis.phoneticPattern).toBeDefined();
      });
    });

    describe('Prosodic Analysis', () => {
      test('should analyze prosodic function', () => {
        const result = analyzeSvaritaDecomposition('â');
        
        expect(result.prosodicAnalysis.prosodicFunction).toBe('accent_segmentation');
        expect(result.prosodicAnalysis.accentualContext).toBe('svarita_decomposition');
        expect(result.prosodicAnalysis.prosodicScope).toBe('temporal_segments');
        expect(result.prosodicAnalysis.metricalImplication).toBe('duration_division');
      });

      test('should track prosodic pattern', () => {
        const result = analyzeSvaritaDecomposition('â');
        
        expect(result.prosodicAnalysis.prosodicPattern.segmentationType).toBe('udatta_initial_half_matra');
        expect(result.prosodicAnalysis.prosodicPattern.remainingStructure).toBe('anudatta_fall');
        expect(result.prosodicAnalysis.decomposedVowels).toBe(1);
      });
    });

    describe('Traditional Commentary', () => {
      test('should include Kashika commentary', () => {
        const result = analyzeSvaritaDecomposition('â');
        
        expect(result.traditionalCommentary.kashika.sanskrit).toBeDefined();
        expect(result.traditionalCommentary.kashika.iast).toBeDefined();
        expect(result.traditionalCommentary.kashika.english).toBeDefined();
      });

      test('should include Mahabhashya commentary', () => {
        const result = analyzeSvaritaDecomposition('â');
        
        expect(result.traditionalCommentary.mahabhashya.sanskrit).toBeDefined();
        expect(result.traditionalCommentary.mahabhashya.iast).toBeDefined();
        expect(result.traditionalCommentary.mahabhashya.english).toBeDefined();
      });
    });

    describe('Confidence Scoring', () => {
      test('should assign high confidence to clear decomposition cases', () => {
        const result = analyzeSvaritaDecomposition('â');
        
        expect(result.confidence).toBeGreaterThan(70);
        expect(result.confidence).toBeLessThanOrEqual(100);
      });

      test('should assign lower confidence to unclear cases', () => {
        const result = analyzeSvaritaDecomposition('');
        
        expect(result.confidence).toBe(0);
      });

      test('should handle multiple svarita forms', () => {
        const result = analyzeSvaritaDecomposition('âîû');
        
        expect(result.confidence).toBeGreaterThan(80);
      });
    });

    describe('Input Validation', () => {
      test('should handle invalid input gracefully', () => {
        const result = analyzeSvaritaDecomposition('');
        
        expect(result.confidence).toBe(0);
        expect(result.decompositionAnalysis.applies).toBe(false);
      });

      test('should handle undefined input', () => {
        const result = analyzeSvaritaDecomposition(undefined);
        
        expect(result.error).toBeDefined();
        expect(result.confidence).toBe(0);
      });

      test('should handle object input with text property', () => {
        const result = analyzeSvaritaDecomposition({ text: 'â' });
        
        expect(result.decompositionAnalysis.applies).toBe(true);
        expect(result.confidence).toBeGreaterThan(0);
      });
    });

    describe('Complex Cases', () => {
      test('should handle mixed accent sequences', () => {
        const result = analyzeSvaritaDecomposition('áâà');
        
        expect(result.decompositionAnalysis.count).toBe(1); // Only svarita decomposable
        expect(result.confidence).toBeGreaterThan(0);
      });

      test('should handle no decomposition cases', () => {
        const result = analyzeSvaritaDecomposition('simple text');
        
        expect(result.decompositionAnalysis.applies).toBe(false);
        expect(result.decompositionAnalysis.hasValidStructure).toBe(false);
      });
    });

    describe('Enhanced Test Structure with Complex Analysis', () => {
      test('should handle Vedic accent combinations', () => {
        const result = analyzeSvaritaDecomposition('âágní');
        
        expect(result.decompositionAnalysis.applies).toBe(true);
        expect(result.prosodicAnalysis.prosodicFunction).toBe('accent_segmentation');
        expect(result.confidence).toBeGreaterThan(50);
      });

      test('should provide linguistic context analysis', () => {
        const result = analyzeSvaritaDecomposition('â');
        
        expect(result.morphologicalAnalysis.grammaticalFunction).toBeDefined();
        expect(result.phoneticAnalysis.phoneticContext).toBeDefined();
        expect(result.traditionalCommentary).toBeDefined();
      });

      test('should handle edge cases with empty or unusual input', () => {
        const emptyResult = analyzeSvaritaDecomposition('');
        const spacesResult = analyzeSvaritaDecomposition('   ');
        const numberResult = analyzeSvaritaDecomposition('123');
        
        expect(emptyResult.confidence).toBe(0);
        expect(spacesResult.decompositionAnalysis.applies).toBe(false);
        expect(numberResult.decompositionAnalysis.applies).toBe(false);
      });

      test('should demonstrate integration with sutra function', () => {
        const input = 'â';
        const direct = decomposeSvarita(input);
        const viaSutra = sutra1232(input);
        expect(viaSutra.segments.length).toBe(direct.segments.length);
      });
    });
  });
});
