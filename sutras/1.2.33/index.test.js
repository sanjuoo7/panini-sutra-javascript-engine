import { sutra1233, analyzeEkashrutiVocative } from './index.js';
import { applyUdatta, applySvarita } from '../sanskrit-utils/accent-analysis.js';

describe('Sutra 1.2.33: एकश्रुति दूरात् सम्बुद्धौ', () => {
  describe('sutra1233() - Basic Functionality', () => {
    it('applies to distant vocative (distanceCategory)', () => {
      const word = applyUdatta('a');
      const res = sutra1233(word, { case: 'vocative', distanceCategory: 'far' });
      expect(res.applies).toBe(true);
      expect(res.transformed).not.toContain('\u0301'); // no acute
    });
    
    it('applies using distanceMeters threshold', () => {
      const word = applySvarita('a');
      const res = sutra1233(word, { case: 'vocative', distanceMeters: 25 }, { flatten: true });
      expect(res.applies).toBe(true);
      expect(res.transformed).toBe('a');
    });

    it('does not apply to near vocative', () => {
      const word = applyUdatta('a');
      const res = sutra1233(word, { case: 'vocative', distanceCategory: 'near' });
      expect(res.applies).toBe(false);
    });
    
    it('does not apply to distant nominative', () => {
      const word = applyUdatta('a');
      const res = sutra1233(word, { case: 'nominative', distanceCategory: 'far' });
      expect(res.applies).toBe(false);
    });

    it('honors flatten=false option', () => {
      const word = applyUdatta('a');
      const res = sutra1233(word, { case: 'vocative', distanceCategory: 'far' }, { flatten: false });
      expect(res.applies).toBe(true);
      expect(res.transformed).toBe(word); // unchanged
    });
    
    it('handles unaccented input gracefully', () => {
      const res = sutra1233('a', { case: 'vocative', distanceMeters: 15 });
      expect(res.applies).toBe(true);
      expect(res.transformed).toBe('a');
    });

    it('structure ready for future exceptions (1.2.34)', () => {
      const res = sutra1233('a', { case: 'vocative', distanceCategory: 'far', excludeEkashruti: true });
      // No logic yet for excludeEkashruti; ensure current behavior unaffected
      expect(typeof res.applies).toBe('boolean');
    });
  });

  describe('analyzeEkashrutiVocative() - Comprehensive Analysis', () => {
    describe('Core Functionality', () => {
      test('should analyze ekashruti for distant vocative', () => {
        const result = analyzeEkashrutiVocative('rāma', { case: 'vocative', distanceCategory: 'far' });
        
        expect(result.ekashrutiAnalysis.applies).toBe(true);
        expect(result.ekashrutiAnalysis.hasValidStructure).toBe(true);
        expect(result.ekashrutiAnalysis.isVocative).toBe(true);
        expect(result.ekashrutiAnalysis.isDistant).toBe(true);
        expect(result.sutraReference.number).toBe('1.2.33');
      });

      test('should provide sutra reference and rule', () => {
        const result = analyzeEkashrutiVocative('deva', { case: 'vocative', distanceMeters: 20 });
        
        expect(result.sutraReference.number).toBe('1.2.33');
        expect(result.sutraReference.sanskrit).toBe('एकश्रुति दूरात् सम्बुद्धौ');
        expect(result.sutraReference.iast).toBe('ekaśruti dūrāt sambuddhau');
        expect(result.sutraReference.type).toBe('vidhi');
      });

      test('should handle non-applicable cases', () => {
        const result = analyzeEkashrutiVocative('rāma', { case: 'nominative', distanceCategory: 'far' });
        
        expect(result.ekashrutiAnalysis.applies).toBe(false);
        expect(result.ekashrutiAnalysis.isVocative).toBe(false);
        expect(result.confidence).toBeGreaterThan(0);
      });
    });

    describe('Ekashruti Analysis', () => {
      test('should analyze distance context correctly', () => {
        const result = analyzeEkashrutiVocative('hari', { 
          case: 'vocative', 
          distanceCategory: 'far',
          distanceMeters: 15
        });
        
        expect(result.ekashrutiAnalysis.distanceContext.category).toBe('far');
        expect(result.ekashrutiAnalysis.distanceContext.meters).toBe(15);
        expect(result.ekashrutiAnalysis.distanceContext.communicativeNeed).toBe('clarity_required');
      });

      test('should provide reasoning for application', () => {
        const result = analyzeEkashrutiVocative('ganga', { case: 'vocative', distanceCategory: 'far' });
        
        expect(result.ekashrutiAnalysis.reasoning).toContain('Ekashruti applicable');
        expect(result.ekashrutiAnalysis.reasoning).toContain('1.2.33');
      });

      test('should provide reasoning for non-application', () => {
        const result = analyzeEkashrutiVocative('ganga', { case: 'vocative', distanceCategory: 'near' });
        
        expect(result.ekashrutiAnalysis.reasoning).toContain('Not applicable');
        expect(result.ekashrutiAnalysis.reasoning).toContain('sufficient distance');
      });

      test('should analyze monotonic structure', () => {
        const result = analyzeEkashrutiVocative('śiva', { case: 'vocative', distanceCategory: 'far' });
        
        expect(result.ekashrutiAnalysis.monotonicStructure.isMonotonic).toBe(true);
        expect(result.ekashrutiAnalysis.monotonicStructure.reason).toBe('distant_vocative_flattening');
        expect(result.ekashrutiAnalysis.monotonicStructure.acousticEffect).toBe('level_pitch_maintenance');
      });
    });

    describe('Morphological Analysis', () => {
      test('should analyze morphological properties', () => {
        const result = analyzeEkashrutiVocative('kṛṣṇa', { case: 'vocative', distanceCategory: 'far' });
        
        expect(result.morphologicalAnalysis.text).toBeDefined();
        expect(result.morphologicalAnalysis.vowelCount).toBeGreaterThan(0);
        expect(result.morphologicalAnalysis.morphologicalScope).toBe('vocative_prosody');
        expect(result.morphologicalAnalysis.grammaticalFunction).toBe('distance_communication');
      });

      test('should identify case function', () => {
        const result = analyzeEkashrutiVocative('indra', { case: 'vocative', distanceCategory: 'far' });
        
        expect(result.morphologicalAnalysis.caseFunction).toBe('sambuddhi');
        expect(result.morphologicalAnalysis.distanceMarking).toBe('marked');
        expect(result.morphologicalAnalysis.linguisticLevel).toBe('pragmatic_prosody');
      });

      test('should handle non-vocative cases', () => {
        const result = analyzeEkashrutiVocative('agni', { case: 'nominative', distanceCategory: 'far' });
        
        expect(result.morphologicalAnalysis.caseFunction).toBe('non_vocative');
        expect(result.morphologicalAnalysis.distanceMarking).toBe('unmarked');
      });
    });

    describe('Phonetic Analysis', () => {
      test('should analyze phonetic properties', () => {
        const result = analyzeEkashrutiVocative('vāyu', { case: 'vocative', distanceCategory: 'far' });
        
        expect(result.phoneticAnalysis.originalText).toBeDefined();
        expect(result.phoneticAnalysis.phoneticScope).toBe('vocal_projection');
        expect(result.phoneticAnalysis.vowelCount).toBeGreaterThan(0);
        expect(result.phoneticAnalysis.phoneticContext).toBe('distance_vocative');
      });

      test('should track temporal structure', () => {
        const result = analyzeEkashrutiVocative('soma', { case: 'vocative', distanceCategory: 'far' });
        
        expect(result.phoneticAnalysis.temporalStructure).toBe('monotonic_delivery');
        expect(result.phoneticAnalysis.articulatoryImplications).toBe('level_pitch');
      });

      test('should handle non-ekashruti cases', () => {
        const result = analyzeEkashrutiVocative('varuṇa', { case: 'vocative', distanceCategory: 'near' });
        
        expect(result.phoneticAnalysis.articulatoryImplications).toBe('varied_pitch');
      });
    });

    describe('Prosodic Analysis', () => {
      test('should analyze prosodic function', () => {
        const result = analyzeEkashrutiVocative('brahmā', { case: 'vocative', distanceCategory: 'far' });
        
        expect(result.prosodicAnalysis.prosodicFunction).toBe('distance_vocative');
        expect(result.prosodicAnalysis.pragmaticContext).toBe('spatial_communication');
        expect(result.prosodicAnalysis.prosodicScope).toBe('utterance_level');
        expect(result.prosodicAnalysis.acousticImplication).toBe('monotone_projection');
      });

      test('should track prosodic pattern', () => {
        const result = analyzeEkashrutiVocative('viṣṇu', { case: 'vocative', distanceCategory: 'far' });
        
        expect(result.prosodicAnalysis.prosodicPattern.patternType).toBe('ekashruti_monotone');
        expect(result.prosodicAnalysis.prosodicPattern.communicativeFunction).toBe('distance_clarity');
        expect(result.prosodicAnalysis.distanceAdaptation).toBe('applied');
      });

      test('should handle non-distant cases', () => {
        const result = analyzeEkashrutiVocative('rudra', { case: 'vocative', distanceCategory: 'near' });
        
        expect(result.prosodicAnalysis.prosodicPattern.patternType).toBe('normal_accent');
        expect(result.prosodicAnalysis.distanceAdaptation).toBe('not_required');
      });
    });

    describe('Traditional Commentary', () => {
      test('should include Kashika commentary', () => {
        const result = analyzeEkashrutiVocative('gaṇeśa', { case: 'vocative', distanceCategory: 'far' });
        
        expect(result.traditionalCommentary.kashika.sanskrit).toBeDefined();
        expect(result.traditionalCommentary.kashika.iast).toBeDefined();
        expect(result.traditionalCommentary.kashika.english).toBeDefined();
        expect(result.traditionalCommentary.kashika.english).toContain('uniform measure');
      });

      test('should include Mahabhashya commentary', () => {
        const result = analyzeEkashrutiVocative('sarasvatī', { case: 'vocative', distanceCategory: 'far' });
        
        expect(result.traditionalCommentary.mahabhashya.sanskrit).toBeDefined();
        expect(result.traditionalCommentary.mahabhashya.iast).toBeDefined();
        expect(result.traditionalCommentary.mahabhashya.english).toBeDefined();
        expect(result.traditionalCommentary.mahabhashya.english).toContain('clarity increases');
      });
    });

    describe('Confidence Scoring', () => {
      test('should assign high confidence to clear ekashruti cases', () => {
        const result = analyzeEkashrutiVocative('lakṣmī', { case: 'vocative', distanceCategory: 'far' });
        
        expect(result.confidence).toBeGreaterThan(80);
        expect(result.confidence).toBeLessThanOrEqual(100);
      });

      test('should assign moderate confidence to non-application', () => {
        const result = analyzeEkashrutiVocative('pārvatī', { case: 'nominative', distanceCategory: 'far' });
        
        expect(result.confidence).toBeGreaterThan(20);
        expect(result.confidence).toBeLessThan(60);
      });

      test('should assign low confidence to unclear cases', () => {
        const result = analyzeEkashrutiVocative('');
        
        expect(result.confidence).toBe(0);
      });
    });

    describe('Input Validation', () => {
      test('should handle invalid input gracefully', () => {
        const result = analyzeEkashrutiVocative('');
        
        expect(result.confidence).toBe(0);
        expect(result.ekashrutiAnalysis.applies).toBe(false);
        expect(result.ekashrutiAnalysis.hasValidStructure).toBe(false);
      });

      test('should handle undefined input', () => {
        const result = analyzeEkashrutiVocative(undefined);
        
        expect(result.error).toBeDefined();
        expect(result.confidence).toBe(0);
      });

      test('should handle object input with text property', () => {
        const result = analyzeEkashrutiVocative({ text: 'durgā' }, { case: 'vocative', distanceCategory: 'far' });
        
        expect(result.ekashrutiAnalysis.applies).toBe(true);
        expect(result.confidence).toBeGreaterThan(0);
      });
    });

    describe('Complex Cases', () => {
      test('should handle accented distant vocatives', () => {
        const accentedWord = 'rā́ma';
        const result = analyzeEkashrutiVocative(accentedWord, { case: 'vocative', distanceCategory: 'far' });
        
        expect(result.ekashrutiAnalysis.applies).toBe(true);
        expect(result.ekashrutiAnalysis.accentualChanges.length).toBeGreaterThan(0);
        expect(result.confidence).toBeGreaterThan(70);
      });

      test('should handle meter-based distance threshold', () => {
        const result = analyzeEkashrutiVocative('govinda', { 
          case: 'vocative', 
          distanceMeters: 15,
          distanceThreshold: 10
        });
        
        expect(result.ekashrutiAnalysis.applies).toBe(true);
        expect(result.ekashrutiAnalysis.distanceContext.meters).toBe(15);
        expect(result.ekashrutiAnalysis.distanceContext.threshold).toBe(10);
      });

      test('should demonstrate integration with sutra function', () => {
        const input = 'mādhava';
        const context = { case: 'vocative', distanceCategory: 'far' };
        const direct = sutra1233(input, context);
        const analyzed = analyzeEkashrutiVocative(input, context);
        
        expect(analyzed.ekashrutiAnalysis.applies).toBe(direct.applies);
        expect(analyzed.ekashrutiAnalysis.transformedText).toBe(direct.transformed);
      });
    });

    describe('Enhanced Test Structure with Devanagari', () => {
      test('should handle Devanagari distant vocatives', () => {
        const result = analyzeEkashrutiVocative('राम', { case: 'vocative', distanceCategory: 'far' });
        
        expect(result.ekashrutiAnalysis.applies).toBe(true);
        expect(result.ekashrutiAnalysis.script).toBe('Devanagari');
        expect(result.confidence).toBeGreaterThan(70);
      });

      test('should provide contextual distance analysis', () => {
        const result = analyzeEkashrutiVocative('हरे', { 
          case: 'vocative', 
          distanceCategory: 'far',
          distanceMeters: 50
        });
        
        expect(result.ekashrutiAnalysis.distanceContext.communicativeNeed).toBe('clarity_required');
        expect(result.prosodicAnalysis.distanceAdaptation).toBe('applied');
      });

      test('should handle edge cases with different scripts', () => {
        const iastaResult = analyzeEkashrutiVocative('kṛṣṇa', { case: 'vocative', distanceCategory: 'far' });
        const devResult = analyzeEkashrutiVocative('कृष्ण', { case: 'vocative', distanceCategory: 'far' });
        
        expect(iastaResult.ekashrutiAnalysis.applies).toBe(true);
        expect(devResult.ekashrutiAnalysis.applies).toBe(true);
        expect(iastaResult.confidence).toBeGreaterThan(0);
        expect(devResult.confidence).toBeGreaterThan(0);
      });
    });
  });
});
