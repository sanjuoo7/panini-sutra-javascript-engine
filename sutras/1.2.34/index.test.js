import { sutra1234 } from './index.js';

describe('1.2.34 अल्पाच्च (Ritual Monotone with Exceptions) - Comprehensive Tests', () => {
  
  // ======= Basic Functionality Tests =======
  describe('Basic Functionality', () => {
    test('should handle simple ritual word with monotone forcing', () => {
      const result = sutra1234('agnim', { ritual: true });
      expect(result.sutra).toBe('1.2.34');
      expect(result.isValid).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.5);
      
      const modes = result.options?.map(o => o.mode) || [];
      expect(modes).toContain('monotone-forced');
      expect(result.primaryDecision).toBe('monotone');
      expect(result.appliedSutras).toContain('1.2.34');
    });

    test('should reject invalid input types', () => {
      expect(() => sutra1234(123)).toThrow('text parameter must be a string');
      expect(() => sutra1234(null)).toThrow('text parameter must be a string');
      expect(() => sutra1234(undefined)).toThrow('text parameter must be a string');
    });

    test('should handle empty input gracefully', () => {
      const result = sutra1234('');
      expect(result.isValid).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.errors).toContain('Empty input text');
    });
  });

  // ======= Exception Pattern Tests =======
  describe('Exception Patterns', () => {
    test('should detect Om variant exception', () => {
      const result = sutra1234('oṃ', { ritual: true });
      expect(result.analysis.exceptions).toContain('om-variant');
      expect(result.analysis.phases.exceptionDetection.hasExceptions).toBe(true);
      
      const modes = result.options?.map(o => o.mode) || [];
      expect(modes).not.toContain('monotone-forced');
    });

    test('should detect japa context exception', () => {
      const result = sutra1234('agnim', { ritual: true, japa: true });
      expect(result.analysis.exceptions).toContain('japa-context');
      expect(result.analysis.phases.exceptionDetection.hasExceptions).toBe(true);
      
      const modes = result.options?.map(o => o.mode) || [];
      expect(modes).not.toContain('monotone-forced');
    });

    test('should detect sāma context exception', () => {
      const result = sutra1234('agnim', { ritual: true, sāma: true });
      expect(result.analysis.exceptions).toContain('sama-context');
      expect(result.analysis.phases.exceptionDetection.hasExceptions).toBe(true);
    });

    test('should detect alpa (very short) word exception', () => {
      const result = sutra1234('a', { ritual: true });
      expect(result.analysis.exceptions).toContain('alpa-monosyllable');
      expect(result.analysis.phases.exceptionDetection.hasExceptions).toBe(true);
    });

    test('should detect compound-initial stress exception', () => {
      const result = sutra1234('deva', { 
        ritual: true, 
        compoundPosition: 'initial', 
        stressed: true 
      });
      expect(result.analysis.exceptions).toContain('compound-initial-stress');
    });
  });

  // ======= Morphological Analysis Tests =======
  describe('Morphological Analysis', () => {
    test('should correctly classify sacred syllable', () => {
      const result = sutra1234('oṃ', { ritual: true });
      expect(result.analysis.phases.morphological.wordType).toBe('sacred-syllable');
      expect(result.analysis.phases.morphological.ritualSuitability).toBe('special-treatment');
    });

    test('should correctly classify monosyllabic word', () => {
      const result = sutra1234('ka', { ritual: true });
      expect(result.analysis.phases.morphological.wordType).toBe('monosyllabic');
      expect(result.analysis.phases.morphological.ritualSuitability).toBe('monotone-suitable');
    });

    test('should correctly classify regular word', () => {
      const result = sutra1234('agnim', { ritual: true });
      expect(result.analysis.phases.morphological.wordType).toBe('regular-word');
      expect(result.analysis.phases.morphological.ritualSuitability).toBe('monotone-suitable');
    });

    test('should correctly classify polysyllabic compound', () => {
      const result = sutra1234('mahābhāratam', { ritual: true });
      expect(result.analysis.phases.morphological.wordType).toBe('polysyllabic-compound');
      expect(result.analysis.phases.morphological.ritualSuitability).toBe('complex-analysis-required');
    });

    test('should count syllables correctly', () => {
      const result = sutra1234('agnim', { ritual: true });
      expect(result.analysis.phases.morphological.syllableCount).toBe(2);
      
      const result2 = sutra1234('bhāratam', { ritual: true });
      expect(result2.analysis.phases.morphological.syllableCount).toBe(3);
    });
  });

  // ======= Ritual Context Analysis Tests =======
  describe('Ritual Context Analysis', () => {
    test('should detect explicit ritual context', () => {
      const result = sutra1234('agnim', { ritual: true });
      expect(result.analysis.phases.ritualContext.isRitualContext).toBe(true);
      expect(result.analysis.phases.ritualContext.ritualType).toBe('general-ritual');
      expect(result.analysis.phases.ritualContext.contextFactors).toContain('explicit-ritual-context');
    });

    test('should detect japa meditation context', () => {
      const result = sutra1234('agnim', { japa: true });
      expect(result.analysis.phases.ritualContext.ritualType).toBe('japa-meditation');
      expect(result.analysis.phases.ritualContext.recitationStyle).toBe('repetitive-meditation');
      expect(result.analysis.phases.ritualContext.contextFactors).toContain('japa-context');
    });

    test('should detect sāma chanting context', () => {
      const result = sutra1234('agnim', { sāma: true });
      expect(result.analysis.phases.ritualContext.ritualType).toBe('sama-chanting');
      expect(result.analysis.phases.ritualContext.recitationStyle).toBe('melodic-chanting');
      expect(result.analysis.phases.ritualContext.contextFactors).toContain('sama-context');
    });

    test('should handle non-ritual context', () => {
      const result = sutra1234('agnim', {});
      expect(result.analysis.phases.ritualContext.isRitualContext).toBe(false);
      expect(result.analysis.phases.ritualContext.ritualType).toBe('none');
    });
  });

  // ======= Prosodic Analysis Tests =======
  describe('Prosodic Analysis', () => {
    test('should recommend monotone for ritual context without exceptions', () => {
      const result = sutra1234('agnim', { ritual: true });
      expect(result.analysis.phases.prosodic.recommendedPattern).toBe('monotone');
    });

    test('should recommend natural rhythm for japa context', () => {
      const result = sutra1234('agnim', { japa: true });
      expect(result.analysis.phases.prosodic.recommendedPattern).toBe('natural-rhythm');
    });

    test('should recommend natural pattern for non-ritual context', () => {
      const result = sutra1234('agnim', {});
      expect(result.analysis.phases.prosodic.recommendedPattern).toBe('natural');
    });

    test('should analyze syllable count correctly', () => {
      const result = sutra1234('mahābhāratam', { ritual: true });
      expect(result.analysis.phases.prosodic.syllableCount).toBe(5);
      expect(result.analysis.phases.prosodic.naturalPattern).toBe('complex');
    });
  });

  // ======= Recommendation Tests =======
  describe('Recommendations', () => {
    test('should recommend monotone application for clear ritual context', () => {
      const result = sutra1234('agnim', { ritual: true });
      const monotoneRec = result.recommendations.find(r => r.type === 'monotone-application');
      expect(monotoneRec).toBeDefined();
      expect(monotoneRec.priority).toBe('high');
    });

    test('should recommend exception handling when exceptions detected', () => {
      const result = sutra1234('oṃ', { ritual: true });
      const exceptionRec = result.recommendations.find(r => r.type === 'exception-handling');
      expect(exceptionRec).toBeDefined();
      expect(exceptionRec.priority).toBe('high');
    });

    test('should recommend natural prosody for non-ritual context', () => {
      const result = sutra1234('agnim', {});
      const naturalRec = result.recommendations.find(r => r.type === 'natural-prosody');
      expect(naturalRec).toBeDefined();
    });

    test('should recommend japa rhythm for japa context', () => {
      const result = sutra1234('agnim', { japa: true });
      const japaRec = result.recommendations.find(r => r.type === 'japa-rhythm');
      expect(japaRec).toBeDefined();
      expect(japaRec.priority).toBe('high');
    });

    test('should recommend complex analysis for long words', () => {
      const result = sutra1234('mahābhāratam', { ritual: true });
      const complexRec = result.recommendations.find(r => r.type === 'complex-prosody');
      expect(complexRec).toBeDefined();
    });
  });

  // ======= Confidence Scoring Tests =======
  describe('Confidence Scoring', () => {
    test('should have higher confidence for clear ritual context', () => {
      const result = sutra1234('agnim', { ritual: true });
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should have high confidence for clear exceptions', () => {
      const result = sutra1234('oṃ', { ritual: true });
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should have moderate confidence for ambiguous context', () => {
      const result = sutra1234('agnim', {});
      expect(result.confidence).toBeGreaterThan(0.5);
      expect(result.confidence).toBeLessThan(0.8);
    });

    test('should have confidence bounded between 0 and 1', () => {
      const result = sutra1234('mahābhāratam', { ritual: true, japa: true });
      expect(result.confidence).toBeGreaterThanOrEqual(0);
      expect(result.confidence).toBeLessThanOrEqual(1);
    });
  });

  // ======= Traditional Commentary Tests =======
  describe('Traditional Commentary', () => {
    test('should provide correct sutra text and meaning', () => {
      const result = sutra1234('agnim', { ritual: true });
      expect(result.traditionalCommentary.sutraText).toBe('अल्पाच्च');
      expect(result.traditionalCommentary.meaning).toContain('short/diminutive');
      expect(result.traditionalCommentary.context).toBe('Ritual recitation and prosodic modification');
    });

    test('should provide interpretation for exception cases', () => {
      const result = sutra1234('oṃ', { ritual: true });
      expect(result.traditionalCommentary.traditionalInterpretation).toContain('exceptions');
      expect(result.traditionalCommentary.scholasticNotes).toContain('Pranavopaasana-vidhi: Om as the primordial sound maintains its inherent prosodic pattern');
    });

    test('should provide interpretation for standard ritual cases', () => {
      const result = sutra1234('agnim', { ritual: true });
      expect(result.traditionalCommentary.traditionalInterpretation).toContain('monotone');
      expect(result.traditionalCommentary.traditionalInterpretation).toContain('ritual contexts');
    });

    test('should provide japa-specific commentary', () => {
      const result = sutra1234('agnim', { japa: true });
      expect(result.traditionalCommentary.scholasticNotes).toContain('Japa-vidhi: Repetitive meditation requires natural rhythm for mental concentration');
    });

    test('should provide practical application guidance', () => {
      const result = sutra1234('agnim', { ritual: true });
      expect(result.traditionalCommentary.practicalApplication).toBeTruthy();
      expect(typeof result.traditionalCommentary.practicalApplication).toBe('string');
    });
  });

  // ======= Script Support Tests =======
  describe('Script Support', () => {
    test('should handle IAST input correctly', () => {
      const result = sutra1234('agnim', { ritual: true });
      expect(result.script).toBe('IAST');
      expect(result.text).toBe('agnim');
    });

    test('should handle Devanagari input correctly', () => {
      const result = sutra1234('अग्निम्', { ritual: true });
      expect(result.script).toBe('Devanagari');
      expect(result.text).toBe('अग्निम्');
    });

    test('should handle Om in different scripts', () => {
      const result1 = sutra1234('oṃ', { ritual: true });
      expect(result1.analysis.exceptions).toContain('om-variant');
      
      const result2 = sutra1234('ॐ', { ritual: true });
      expect(result2.analysis.exceptions).toContain('om-variant');
    });
  });

  // ======= Technical Notes Tests =======
  describe('Technical Notes', () => {
    test('should include morphological analysis notes', () => {
      const result = sutra1234('agnim', { ritual: true });
      const morphNote = result.analysis.technicalNotes.find(note => 
        note.includes('Morphological analysis'));
      expect(morphNote).toBeDefined();
    });

    test('should include ritual context notes when applicable', () => {
      const result = sutra1234('agnim', { ritual: true });
      const ritualNote = result.analysis.technicalNotes.find(note => 
        note.includes('Ritual context confirmed'));
      expect(ritualNote).toBeDefined();
    });

    test('should include exception notes when applicable', () => {
      const result = sutra1234('oṃ', { ritual: true });
      const exceptionNote = result.analysis.technicalNotes.find(note => 
        note.includes('Exceptions detected'));
      expect(exceptionNote).toBeDefined();
    });

    test('should include prosodic pattern notes', () => {
      const result = sutra1234('agnim', { ritual: true });
      const prosodyNote = result.analysis.technicalNotes.find(note => 
        note.includes('Prosodic pattern'));
      expect(prosodyNote).toBeDefined();
    });
  });

  // ======= Edge Cases =======
  describe('Edge Cases', () => {
    test('should handle very long compound words', () => {
      const longWord = 'paramahamsaparivrajakācharyadharmamahāmandaleshvara';
      const result = sutra1234(longWord, { ritual: true });
      expect(result.isValid).toBe(true);
      expect(result.analysis.phases.morphological.wordType).toBe('polysyllabic-compound');
    });

    test('should handle mixed context scenarios', () => {
      const result = sutra1234('agnim', { 
        ritual: true, 
        japa: false, 
        sāma: false 
      });
      expect(result.isValid).toBe(true);
      expect(result.analysis.phases.ritualContext.isRitualContext).toBe(true);
    });

    test('should handle partial context information', () => {
      const result = sutra1234('agnim', { ritual: true });
      expect(result.isValid).toBe(true);
      expect(result.confidence).toBeGreaterThan(0);
    });
  });
});
