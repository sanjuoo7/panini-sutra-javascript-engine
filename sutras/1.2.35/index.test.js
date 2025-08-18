import { sutra1235 } from './index.js';

describe('1.2.35 वषट्कारे उदात्तः (Vaṣaṭ Exclamation Elevation) - Comprehensive Tests', () => {
  
  // ======= Basic Functionality Tests =======
  describe('Basic Functionality', () => {
    test('should handle vaṣaṭ with elevated prosody option', () => {
      const result = sutra1235('vaṣaṭ', {});
      expect(result.sutra).toBe('1.2.35');
      expect(result.isValid).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      
      const modes = result.options?.map(o => o.mode) || [];
      expect(modes).toContain('raised');
      expect(result.appliedSutras).toContain('1.2.35');
    });

    test('should reject invalid input types', () => {
      expect(() => sutra1235(123)).toThrow('text parameter must be a string');
      expect(() => sutra1235(null)).toThrow('text parameter must be a string');
      expect(() => sutra1235(undefined)).toThrow('text parameter must be a string');
    });

    test('should handle empty input gracefully', () => {
      const result = sutra1235('');
      expect(result.isValid).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.errors).toContain('Empty input text');
    });

    test('should handle non-vaṣaṭ words without raised option', () => {
      const result = sutra1235('agnim', {});
      expect(result.sutra).toBe('1.2.35');
      expect(result.isValid).toBe(true);
      
      const modes = result.options?.map(o => o.mode) || [];
      expect(modes).not.toContain('raised');
    });
  });

  // ======= Vaṣaṭ Pattern Detection Tests =======
  describe('Vaṣaṭ Pattern Detection', () => {
    test('should detect canonical vaṣaṭ form', () => {
      const result = sutra1235('vaṣaṭ', {});
      expect(result.analysis.phases.vasatDetection.isVasatForm).toBe(true);
      expect(result.analysis.phases.vasatDetection.vasatType).toBe('canonical-vasat');
      expect(result.analysis.vasatVariants).toContain('canonical-vasat');
    });

    test('should detect vaṣaṭ in Devanagari', () => {
      const result = sutra1235('वषट्', {});
      expect(result.analysis.phases.vasatDetection.isVasatForm).toBe(true);
      expect(result.analysis.phases.vasatDetection.vasatType).toBe('canonical-vasat');
      expect(result.analysis.vasatVariants).toContain('canonical-vasat');
    });

    test('should detect vaṣaṭkāra compound form', () => {
      const result = sutra1235('vaṣaṭkāra', {});
      expect(result.analysis.phases.vasatDetection.isVasatForm).toBe(true);
      expect(result.analysis.phases.vasatDetection.vasatType).toBe('vasat-compound');
      expect(result.analysis.vasatVariants).toContain('vasat-compound');
    });

    test('should detect vaṣaṭ verbal forms', () => {
      const result = sutra1235('vaṣaṭkṛ', {});
      expect(result.analysis.phases.vasatDetection.isVasatForm).toBe(true);
      expect(result.analysis.phases.vasatDetection.vasatType).toBe('vasat-verbal');
      expect(result.analysis.vasatVariants).toContain('vasat-verbal');
    });

    test('should detect contextual vaṣaṭ in ritual context', () => {
      const result = sutra1235('huṭ', { ritual: true });
      expect(result.analysis.phases.vasatDetection.vasatType).toBe('contextual-vasat');
      expect(result.analysis.vasatVariants).toContain('contextual-exclamation');
    });

    test('should not detect vaṣaṭ in unrelated words', () => {
      const result = sutra1235('agnim', {});
      expect(result.analysis.phases.vasatDetection.isVasatForm).toBe(false);
      expect(result.analysis.phases.vasatDetection.vasatType).toBe('none');
      expect(result.analysis.vasatVariants).toHaveLength(0);
    });
  });

  // ======= Morphological Analysis Tests =======
  describe('Morphological Analysis', () => {
    test('should correctly classify canonical vaṣaṭ', () => {
      const result = sutra1235('vaṣaṭ', {});
      expect(result.analysis.phases.morphological.exclamationType).toBe('vasat-primary');
      expect(result.analysis.phases.morphological.ritualSuitability).toBe('ritual-exclamation');
    });

    test('should correctly classify vaṣaṭ compound', () => {
      const result = sutra1235('vaṣaṭkāra', {});
      expect(result.analysis.phases.morphological.exclamationType).toBe('vasat-compound');
      expect(result.analysis.phases.morphological.ritualSuitability).toBe('ritual-technical');
    });

    test('should correctly classify exclamatory endings', () => {
      const result = sutra1235('huṭ', {});
      expect(result.analysis.phases.morphological.exclamationType).toBe('exclamatory-ending');
      expect(result.analysis.phases.morphological.ritualSuitability).toBe('potential-exclamation');
    });

    test('should correctly classify short exclamations', () => {
      const result = sutra1235('om', {});
      expect(result.analysis.phases.morphological.exclamationType).toBe('short-exclamation');
      expect(result.analysis.phases.morphological.ritualSuitability).toBe('simple-form');
    });

    test('should correctly classify regular words', () => {
      const result = sutra1235('agnim', {});
      expect(result.analysis.phases.morphological.exclamationType).toBe('regular-word');
      expect(result.analysis.phases.morphological.ritualSuitability).toBe('non-exclamatory');
    });

    test('should count syllables correctly', () => {
      const result = sutra1235('vaṣaṭ', {});
      expect(result.analysis.phases.morphological.syllableCount).toBe(2);
      
      const result2 = sutra1235('vaṣaṭkāra', {});
      expect(result2.analysis.phases.morphological.syllableCount).toBe(4);
    });
  });

  // ======= Ritual Context Analysis Tests =======
  describe('Ritual Context Analysis', () => {
    test('should detect explicit ritual context', () => {
      const result = sutra1235('vaṣaṭ', { ritual: true });
      expect(result.analysis.phases.ritualContext.isRitualExclamation).toBe(true);
      expect(result.analysis.phases.ritualContext.exclamationFunction).toBe('ritual-liturgical');
      expect(result.analysis.phases.ritualContext.contextFactors).toContain('explicit-ritual-context');
    });

    test('should detect Vedic yajna context', () => {
      const result = sutra1235('vaṣaṭ', { vedic: true, yajna: true });
      expect(result.analysis.phases.ritualContext.isRitualExclamation).toBe(true);
      expect(result.analysis.phases.ritualContext.exclamationFunction).toBe('vedic-yajna');
      expect(result.analysis.phases.ritualContext.ritualRole).toBe('sacrificial-exclamation');
      expect(result.analysis.phases.ritualContext.contextFactors).toContain('vedic-context');
    });

    test('should detect oblation context', () => {
      const result = sutra1235('vaṣaṭ', { oblation: true });
      expect(result.analysis.phases.ritualContext.isRitualExclamation).toBe(true);
      expect(result.analysis.phases.ritualContext.exclamationFunction).toBe('oblation-marker');
      expect(result.analysis.phases.ritualContext.ritualRole).toBe('offering-signal');
      expect(result.analysis.phases.ritualContext.contextFactors).toContain('oblation-context');
    });

    test('should handle non-ritual context', () => {
      const result = sutra1235('agnim', {});
      expect(result.analysis.phases.ritualContext.isRitualExclamation).toBe(false);
      expect(result.analysis.phases.ritualContext.exclamationFunction).toBe('none');
    });
  });

  // ======= Prosodic Analysis Tests =======
  describe('Prosodic Analysis', () => {
    test('should recommend elevated-final for canonical vaṣaṭ', () => {
      const result = sutra1235('vaṣaṭ', {});
      expect(result.analysis.phases.prosodic.recommendedPattern).toBe('elevated-final');
      expect(result.analysis.phases.prosodic.elevationFeatures).toContain('Terminal elevation on ṭ');
    });

    test('should recommend ritual-elevated for ritual context', () => {
      const result = sutra1235('huṭ', { ritual: true });
      expect(result.analysis.phases.prosodic.recommendedPattern).toBe('ritual-elevated');
      expect(result.analysis.phases.prosodic.elevationFeatures).toContain('Ritual context elevation');
    });

    test('should recommend natural for non-vaṣaṭ words', () => {
      const result = sutra1235('agnim', {});
      expect(result.analysis.phases.prosodic.recommendedPattern).toBe('natural');
      expect(result.analysis.phases.prosodic.elevationFeatures).toContain('No special elevation required');
    });

    test('should analyze syllable patterns correctly', () => {
      const result = sutra1235('vaṣaṭ', {});
      expect(result.analysis.phases.prosodic.syllableCount).toBe(2);
      expect(result.analysis.phases.prosodic.naturalPattern).toBe('disyllabic-exclamation');
      
      const result2 = sutra1235('oṃ', {});
      expect(result2.analysis.phases.prosodic.naturalPattern).toBe('monosyllabic-exclamation');
    });
  });

  // ======= Recommendation Tests =======
  describe('Recommendations', () => {
    test('should recommend vaṣaṭ elevation for canonical form', () => {
      const result = sutra1235('vaṣaṭ', {});
      const vasatRec = result.recommendations.find(r => r.type === 'vasat-elevation');
      expect(vasatRec).toBeDefined();
      expect(vasatRec.priority).toBe('high');
      expect(vasatRec.description).toContain('elevated prosody');
    });

    test('should recommend ritual exclamation for ritual context', () => {
      const result = sutra1235('vaṣaṭ', { ritual: true });
      const ritualRec = result.recommendations.find(r => r.type === 'ritual-exclamation');
      expect(ritualRec).toBeDefined();
      expect(ritualRec.priority).toBe('high');
    });

    test('should recommend terminal elevation for vaṣaṭ', () => {
      const result = sutra1235('vaṣaṭ', {});
      const terminalRec = result.recommendations.find(r => r.type === 'terminal-elevation');
      expect(terminalRec).toBeDefined();
      expect(terminalRec.priority).toBe('medium');
    });

    test('should recommend natural prosody for non-vaṣaṭ words', () => {
      const result = sutra1235('agnim', {});
      const naturalRec = result.recommendations.find(r => r.type === 'natural-prosody');
      expect(naturalRec).toBeDefined();
      expect(naturalRec.priority).toBe('medium');
    });
  });

  // ======= Confidence Scoring Tests =======
  describe('Confidence Scoring', () => {
    test('should have high confidence for canonical vaṣaṭ', () => {
      const result = sutra1235('vaṣaṭ', {});
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should have high confidence for vaṣaṭ with ritual context', () => {
      const result = sutra1235('vaṣaṭ', { ritual: true, vedic: true });
      expect(result.confidence).toBeGreaterThan(0.9);
    });

    test('should have moderate confidence for exclamatory endings', () => {
      const result = sutra1235('huṭ', {});
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.confidence).toBeLessThan(0.8);
    });

    test('should have lower confidence for regular words', () => {
      const result = sutra1235('agnim', {});
      expect(result.confidence).toBeGreaterThan(0.5);
      expect(result.confidence).toBeLessThan(0.7);
    });

    test('should have confidence bounded between 0 and 1', () => {
      const result = sutra1235('vaṣaṭkāra', { ritual: true, vedic: true, oblation: true });
      expect(result.confidence).toBeGreaterThanOrEqual(0);
      expect(result.confidence).toBeLessThanOrEqual(1);
    });
  });

  // ======= Traditional Commentary Tests =======
  describe('Traditional Commentary', () => {
    test('should provide correct sutra text and meaning', () => {
      const result = sutra1235('vaṣaṭ', {});
      expect(result.traditionalCommentary.sutraText).toBe('वषट्कारे उदात्तः');
      expect(result.traditionalCommentary.meaning).toContain('vaṣaṭ exclamation');
      expect(result.traditionalCommentary.meaning).toContain('udātta');
      expect(result.traditionalCommentary.context).toBe('Ritual exclamation prosody and Vedic accent patterns');
    });

    test('should provide interpretation for vaṣaṭ forms', () => {
      const result = sutra1235('vaṣaṭ', {});
      expect(result.traditionalCommentary.traditionalInterpretation).toContain('vaṣaṭ');
      expect(result.traditionalCommentary.traditionalInterpretation).toContain('elevated prosodic treatment');
      expect(result.traditionalCommentary.scholasticNotes).toContain('Vaṣaṭkāra-vidhi: The canonical vaṣaṭ receives terminal udātta for ritual efficacy');
    });

    test('should provide interpretation for non-vaṣaṭ forms', () => {
      const result = sutra1235('agnim', {});
      expect(result.traditionalCommentary.traditionalInterpretation).toContain('does not contain vaṣaṭ');
      expect(result.traditionalCommentary.traditionalInterpretation).toContain('prosodic elevation');
    });

    test('should provide context-specific commentary', () => {
      const result = sutra1235('vaṣaṭ', { yajna: true });
      expect(result.traditionalCommentary.scholasticNotes).toContain('Yajña-prayoga: Ritual context supports elevated prosodic treatment');
    });

    test('should provide practical application guidance', () => {
      const result = sutra1235('vaṣaṭ', { ritual: true });
      expect(result.traditionalCommentary.practicalApplication).toBeTruthy();
      expect(typeof result.traditionalCommentary.practicalApplication).toBe('string');
      expect(result.traditionalCommentary.practicalApplication).toContain('elevation');
    });
  });

  // ======= Script Support Tests =======
  describe('Script Support', () => {
    test('should handle IAST input correctly', () => {
      const result = sutra1235('vaṣaṭ', {});
      expect(result.script).toBe('IAST');
      expect(result.text).toBe('vaṣaṭ');
    });

    test('should handle Devanagari input correctly', () => {
      const result = sutra1235('वषट्', {});
      expect(result.script).toBe('Devanagari');
      expect(result.text).toBe('वषट्');
    });

    test('should detect vaṣaṭ in both scripts', () => {
      const result1 = sutra1235('vaṣaṭ', {});
      expect(result1.analysis.phases.vasatDetection.isVasatForm).toBe(true);
      
      const result2 = sutra1235('वषट्', {});
      expect(result2.analysis.phases.vasatDetection.isVasatForm).toBe(true);
    });
  });

  // ======= Technical Notes Tests =======
  describe('Technical Notes', () => {
    test('should include morphological analysis notes', () => {
      const result = sutra1235('vaṣaṭ', {});
      const morphNote = result.analysis.technicalNotes.find(note => 
        note.includes('Morphological analysis'));
      expect(morphNote).toBeDefined();
      expect(morphNote).toContain('vasat-primary');
    });

    test('should include vaṣaṭ form confirmation notes', () => {
      const result = sutra1235('vaṣaṭ', {});
      const vasatNote = result.analysis.technicalNotes.find(note => 
        note.includes('Vaṣaṭ form confirmed'));
      expect(vasatNote).toBeDefined();
    });

    test('should include ritual context notes when applicable', () => {
      const result = sutra1235('vaṣaṭ', { ritual: true });
      const ritualNote = result.analysis.technicalNotes.find(note => 
        note.includes('Ritual exclamation context'));
      expect(ritualNote).toBeDefined();
    });

    test('should include prosodic recommendation notes', () => {
      const result = sutra1235('vaṣaṭ', {});
      const prosodyNote = result.analysis.technicalNotes.find(note => 
        note.includes('Prosodic recommendation'));
      expect(prosodyNote).toBeDefined();
    });
  });

  // ======= Edge Cases =======
  describe('Edge Cases', () => {
    test('should handle vaṣaṭ variants with extra characters', () => {
      const result = sutra1235('vaṣaṭa', {});
      expect(result.isValid).toBe(true);
      // Should not be detected as canonical vaṣaṭ
      expect(result.analysis.phases.vasatDetection.vasatType).toBe('none');
    });

    test('should handle partial vaṣaṭ matches', () => {
      const result = sutra1235('vaṣa', {});
      expect(result.isValid).toBe(true);
      expect(result.analysis.phases.vasatDetection.isVasatForm).toBe(false);
    });

    test('should handle compound words containing vaṣaṭ', () => {
      const result = sutra1235('mahāvaṣaṭ', {});
      expect(result.isValid).toBe(true);
      // Should detect as vaṣaṭ compound due to vaṣaṭ ending
      expect(result.analysis.phases.morphological.exclamationType).toBe('vasat-compound');
    });

    test('should handle mixed context scenarios', () => {
      const result = sutra1235('vaṣaṭ', { 
        ritual: true, 
        vedic: false, 
        oblation: true 
      });
      expect(result.isValid).toBe(true);
      expect(result.analysis.phases.ritualContext.isRitualExclamation).toBe(true);
    });
  });
});
