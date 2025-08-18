import { sutra1236 } from './index.js';

describe('1.2.36 छन्दसि वा एकश्रुतिः (Optional Metrical Monotone) - Comprehensive Tests', () => {
  
  // ======= Basic Functionality Tests =======
  describe('Basic Functionality', () => {
    test('should handle metrical context with optional monotone', () => {
      const result = sutra1236('agnim', {});
      expect(result.sutra).toBe('1.2.36');
      expect(result.isValid).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      
      const modes = result.options?.map(o => o.mode) || [];
      expect(modes.some(m => m.startsWith('monotone')) || modes.includes('monotone')).toBe(true);
      expect(result.appliedSutras).toContain('1.2.36');
      expect(result.primaryDecision).toBe('options');
    });

    test('should reject invalid input types', () => {
      expect(() => sutra1236(123)).toThrow('text parameter must be a string');
      expect(() => sutra1236(null)).toThrow('text parameter must be a string');
      expect(() => sutra1236(undefined)).toThrow('text parameter must be a string');
    });

    test('should handle empty input gracefully', () => {
      const result = sutra1236('');
      expect(result.isValid).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.errors).toContain('Empty input text');
    });
  });

  // ======= Metrical Context Detection Tests =======
  describe('Metrical Context Detection', () => {
    test('should detect explicit chandas context', () => {
      const result = sutra1236('agnim', { chandas: true });
      expect(result.analysis.phases.metricalContext.isChandasContext).toBe(true);
      expect(result.analysis.phases.metricalContext.meterType).toBe('general-chandas');
      expect(result.analysis.phases.metricalContext.contextFactors).toContain('explicit-chandas-context');
    });

    test('should detect Gayatri meter context', () => {
      const result = sutra1236('agnim', { gayatri: true });
      expect(result.analysis.phases.metricalContext.isChandasContext).toBe(true);
      expect(result.analysis.phases.metricalContext.meterType).toBe('gayatri-meter');
      expect(result.analysis.phases.metricalContext.verseStructure).toBe('tri-pada-eight-syllable');
      expect(result.analysis.phases.metricalContext.contextFactors).toContain('gayatri-meter');
    });

    test('should detect Trishtubh meter context', () => {
      const result = sutra1236('agnim', { trishtubh: true });
      expect(result.analysis.phases.metricalContext.isChandasContext).toBe(true);
      expect(result.analysis.phases.metricalContext.meterType).toBe('trishtubh-meter');
      expect(result.analysis.phases.metricalContext.verseStructure).toBe('quad-pada-eleven-syllable');
      expect(result.analysis.phases.metricalContext.contextFactors).toContain('trishtubh-meter');
    });

    test('should detect Jagati meter context', () => {
      const result = sutra1236('agnim', { jagati: true });
      expect(result.analysis.phases.metricalContext.isChandasContext).toBe(true);
      expect(result.analysis.phases.metricalContext.meterType).toBe('jagati-meter');
      expect(result.analysis.phases.metricalContext.verseStructure).toBe('quad-pada-twelve-syllable');
      expect(result.analysis.phases.metricalContext.contextFactors).toContain('jagati-meter');
    });

    test('should detect Anushtubh meter context', () => {
      const result = sutra1236('agnim', { anushtubh: true });
      expect(result.analysis.phases.metricalContext.isChandasContext).toBe(true);
      expect(result.analysis.phases.metricalContext.meterType).toBe('anushtubh-meter');
      expect(result.analysis.phases.metricalContext.verseStructure).toBe('dual-pada-eight-syllable');
      expect(result.analysis.phases.metricalContext.contextFactors).toContain('anushtubh-meter');
    });

    test('should detect general verse context', () => {
      const result = sutra1236('agnim', { verse: true });
      expect(result.analysis.phases.metricalContext.isChandasContext).toBe(true);
      expect(result.analysis.phases.metricalContext.meterType).toBe('general-verse');
      expect(result.analysis.phases.metricalContext.contextFactors).toContain('verse-context');
    });

    test('should handle non-metrical context', () => {
      const result = sutra1236('agnim', {});
      expect(result.analysis.phases.metricalContext.isChandasContext).toBe(false);
      expect(result.analysis.phases.metricalContext.meterType).toBe('none');
    });
  });

  // ======= Morphological Analysis Tests =======
  describe('Morphological Analysis', () => {
    test('should classify complex metrical forms', () => {
      const result = sutra1236('paramahamsaparivrajaka', { chandas: true });
      expect(result.analysis.phases.morphological.metricalSuitability).toBe('complex-metrical');
      expect(result.analysis.phases.morphological.rhythmicPotential).toBe('high-flexibility');
    });

    test('should classify standard metrical forms', () => {
      const result = sutra1236('agnimīḷe', { chandas: true });
      expect(result.analysis.phases.morphological.metricalSuitability).toBe('standard-metrical');
      expect(result.analysis.phases.morphological.rhythmicPotential).toBe('moderate-flexibility');
    });

    test('should classify simple metrical forms', () => {
      const result = sutra1236('agnim', { chandas: true });
      expect(result.analysis.phases.morphological.metricalSuitability).toBe('simple-metrical');
      expect(result.analysis.phases.morphological.rhythmicPotential).toBe('limited-flexibility');
    });

    test('should classify minimal metrical forms', () => {
      const result = sutra1236('om', { chandas: true });
      expect(result.analysis.phases.morphological.metricalSuitability).toBe('minimal-metrical');
      expect(result.analysis.phases.morphological.rhythmicPotential).toBe('no-flexibility');
    });

    test('should count syllables correctly', () => {
      const result = sutra1236('agnimīḷe', { chandas: true });
      expect(result.analysis.phases.morphological.syllableCount).toBe(5); // a-gni-mī-ḷ-e
      
      const result2 = sutra1236('paramahansa', { chandas: true });
      expect(result2.analysis.phases.morphological.syllableCount).toBe(5); // pa-ra-ma-han-sa
    });
  });

  // ======= Prosody Options Analysis Tests =======
  describe('Prosody Options Analysis', () => {
    test('should provide high flexibility for long forms in chandas', () => {
      const result = sutra1236('paramahamsaparivrajaka', { chandas: true });
      expect(result.analysis.phases.prosodyOptions.flexibilityLevel).toBe('high-flexibility');
      expect(result.analysis.phases.prosodyOptions.availableOptions).toContain('natural-prosody');
      expect(result.analysis.phases.prosodyOptions.availableOptions).toContain('optional-monotone');
      expect(result.analysis.phases.prosodyOptions.availableOptions).toContain('mixed-prosody');
      expect(result.analysis.phases.prosodyOptions.availableOptions).toContain('rhythmic-variation');
    });

    test('should provide moderate flexibility for medium forms in chandas', () => {
      const result = sutra1236('agnimīḷe', { chandas: true });
      expect(result.analysis.phases.prosodyOptions.flexibilityLevel).toBe('moderate-flexibility');
      expect(result.analysis.phases.prosodyOptions.availableOptions).toContain('natural-prosody');
      expect(result.analysis.phases.prosodyOptions.availableOptions).toContain('optional-monotone');
      expect(result.analysis.phases.prosodyOptions.availableOptions).toContain('rhythmic-variation');
    });

    test('should provide limited flexibility for short forms in chandas', () => {
      const result = sutra1236('agnim', { chandas: true });
      expect(result.analysis.phases.prosodyOptions.flexibilityLevel).toBe('limited-flexibility');
      expect(result.analysis.phases.prosodyOptions.availableOptions).toContain('natural-prosody');
      expect(result.analysis.phases.prosodyOptions.availableOptions).toContain('optional-monotone');
    });

    test('should assess monotone compatibility correctly', () => {
      const result = sutra1236('agnim', { chandas: true });
      expect(result.analysis.phases.prosodyOptions.monotoneCompatibility).toBe('compatible');
      
      const result2 = sutra1236('a', { chandas: true });
      expect(result2.analysis.phases.prosodyOptions.monotoneCompatibility).toBe('limited');
    });

    test('should always assess natural prosody as compatible', () => {
      const result = sutra1236('agnim', { chandas: true });
      expect(result.analysis.phases.prosodyOptions.naturalProsodyCompatibility).toBe('always-compatible');
    });
  });

  // ======= Rhythmic Analysis Tests =======
  describe('Rhythmic Analysis', () => {
    test('should recommend flexible-mixed for complex metrical forms', () => {
      const result = sutra1236('paramahamsaparivrajaka', { chandas: true });
      expect(result.analysis.phases.rhythmic.rhythmicPattern).toBe('complex-metrical');
      expect(result.analysis.phases.rhythmic.recommendedApproach).toBe('flexible-mixed');
      expect(result.analysis.phases.rhythmic.flexibilityFactors).toContain('Long verse allows variation');
    });

    test('should recommend optional-monotone for standard metrical forms', () => {
      const result = sutra1236('agnimīḷe', { chandas: true });
      expect(result.analysis.phases.rhythmic.rhythmicPattern).toBe('standard-metrical');
      expect(result.analysis.phases.rhythmic.recommendedApproach).toBe('optional-monotone');
      expect(result.analysis.phases.rhythmic.flexibilityFactors).toContain('Medium length suitable for options');
    });

    test('should recommend natural-preferred for simple metrical forms', () => {
      const result = sutra1236('agnim', { chandas: true });
      expect(result.analysis.phases.rhythmic.rhythmicPattern).toBe('simple-metrical');
      expect(result.analysis.phases.rhythmic.recommendedApproach).toBe('natural-preferred');
      expect(result.analysis.phases.rhythmic.flexibilityFactors).toContain('Short form maintains natural rhythm');
    });

    test('should recommend natural for non-metrical context', () => {
      const result = sutra1236('agnim', {});
      expect(result.analysis.phases.rhythmic.rhythmicPattern).toBe('non-metrical');
      expect(result.analysis.phases.rhythmic.recommendedApproach).toBe('natural');
      expect(result.analysis.phases.rhythmic.flexibilityFactors).toContain('No metrical context detected');
    });

    test('should include meter-specific rhythmic considerations', () => {
      const result = sutra1236('agnim', { gayatri: true });
      expect(result.analysis.phases.rhythmic.rhythmicConsiderations).toContain('Gayatri meter prefers measured rhythm');
      
      const result2 = sutra1236('agnim', { trishtubh: true });
      expect(result2.analysis.phases.rhythmic.rhythmicConsiderations).toContain('Trishtubh allows greater rhythmic freedom');
    });
  });

  // ======= Recommendation Tests =======
  describe('Recommendations', () => {
    test('should recommend optional monotone for chandas context', () => {
      const result = sutra1236('agnim', { chandas: true });
      const monotoneRec = result.recommendations.find(r => r.type === 'optional-monotone');
      expect(monotoneRec).toBeDefined();
      expect(monotoneRec.priority).toBe('high');
      expect(monotoneRec.description).toContain('optional monotone');
    });

    test('should recommend prosodic flexibility for chandas context', () => {
      const result = sutra1236('agnim', { chandas: true });
      const flexibilityRec = result.recommendations.find(r => r.type === 'prosodic-flexibility');
      expect(flexibilityRec).toBeDefined();
      expect(flexibilityRec.priority).toBe('high');
      expect(flexibilityRec.justification).toContain('sutra 1.2.36');
    });

    test('should recommend natural prosody for non-metrical context', () => {
      const result = sutra1236('agnim', {});
      const naturalRec = result.recommendations.find(r => r.type === 'natural-prosody');
      expect(naturalRec).toBeDefined();
      expect(naturalRec.priority).toBe('medium');
    });

    test('should recommend Gayatri-specific prosody', () => {
      const result = sutra1236('agnim', { gayatri: true });
      const gayatriRec = result.recommendations.find(r => r.type === 'gayatri-prosody');
      expect(gayatriRec).toBeDefined();
      expect(gayatriRec.priority).toBe('medium');
    });

    test('should recommend Trishtubh flexibility', () => {
      const result = sutra1236('agnim', { trishtubh: true });
      const trishtubhRec = result.recommendations.find(r => r.type === 'trishtubh-flexibility');
      expect(trishtubhRec).toBeDefined();
      expect(trishtubhRec.description).toContain('prosodic flexibility');
    });

    test('should recommend mixed prosody for high flexibility cases', () => {
      const result = sutra1236('paramahamsaparivrajaka', { chandas: true });
      const mixedRec = result.recommendations.find(r => r.type === 'mixed-prosody');
      expect(mixedRec).toBeDefined();
      expect(mixedRec.justification).toContain('intra-verse prosodic variation');
    });
  });

  // ======= Confidence Scoring Tests =======
  describe('Confidence Scoring', () => {
    test('should have high confidence for explicit chandas context', () => {
      const result = sutra1236('agnimīḷe', { chandas: true });
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should have high confidence for specific meter types', () => {
      const result = sutra1236('agnim', { gayatri: true });
      expect(result.confidence).toBeGreaterThan(0.8);
      
      const result2 = sutra1236('agnim', { trishtubh: true });
      expect(result2.confidence).toBeGreaterThan(0.8);
    });

    test('should have moderate confidence for general verse context', () => {
      const result = sutra1236('agnim', { verse: true });
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.confidence).toBeLessThan(0.9);
    });

    test('should have lower confidence for non-metrical context', () => {
      const result = sutra1236('agnim', {});
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.confidence).toBeLessThan(0.8);
    });

    test('should have confidence bounded between 0 and 1', () => {
      const result = sutra1236('paramahamsaparivrajaka', { 
        chandas: true, 
        gayatri: true, 
        verse: true 
      });
      expect(result.confidence).toBeGreaterThanOrEqual(0);
      expect(result.confidence).toBeLessThanOrEqual(1);
    });
  });

  // ======= Traditional Commentary Tests =======
  describe('Traditional Commentary', () => {
    test('should provide correct sutra text and meaning', () => {
      const result = sutra1236('agnim', { chandas: true });
      expect(result.traditionalCommentary.sutraText).toBe('छन्दसि वा एकश्रुतिः');
      expect(result.traditionalCommentary.meaning).toContain('chandas');
      expect(result.traditionalCommentary.meaning).toContain('ekashruti');
      expect(result.traditionalCommentary.meaning).toContain('optional');
      expect(result.traditionalCommentary.context).toBe('Metrical prosody and optional recitation patterns');
    });

    test('should provide interpretation for metrical contexts', () => {
      const result = sutra1236('agnim', { chandas: true });
      expect(result.traditionalCommentary.traditionalInterpretation).toContain('metrical contexts');
      expect(result.traditionalCommentary.traditionalInterpretation).toContain('optionality');
      expect(result.traditionalCommentary.traditionalInterpretation).toContain('prosodic flexibility');
    });

    test('should provide interpretation for non-metrical contexts', () => {
      const result = sutra1236('agnim', {});
      expect(result.traditionalCommentary.traditionalInterpretation).toContain('does not occur in explicit metrical context');
      expect(result.traditionalCommentary.traditionalInterpretation).toContain('prosodic optionality');
    });

    test('should provide meter-specific commentary', () => {
      const result = sutra1236('agnim', { gayatri: true });
      expect(result.traditionalCommentary.scholasticNotes).toContain('Gayatri-chandas-vidhi: Gayatri meter allows measured monotone or natural rhythm');
      
      const result2 = sutra1236('agnim', { trishtubh: true });
      expect(result2.traditionalCommentary.scholasticNotes).toContain('Trishtubh-chandas-vidhi: Trishtubh meter offers maximum prosodic flexibility');
    });

    test('should provide length-specific commentary', () => {
      const result = sutra1236('paramahamsaparivrajaka', { chandas: true });
      expect(result.traditionalCommentary.scholasticNotes).toContain('Dīrgha-chandas-vidhi: Longer verses benefit from prosodic variation within optional framework');
    });

    test('should provide practical application guidance', () => {
      const result = sutra1236('agnim', { chandas: true });
      expect(result.traditionalCommentary.practicalApplication).toBeTruthy();
      expect(typeof result.traditionalCommentary.practicalApplication).toBe('string');
      expect(result.traditionalCommentary.practicalApplication).toContain('metrical context');
    });
  });

  // ======= Script Support Tests =======
  describe('Script Support', () => {
    test('should handle IAST input correctly', () => {
      const result = sutra1236('agnim', { chandas: true });
      expect(result.script).toBe('IAST');
      expect(result.text).toBe('agnim');
    });

    test('should handle Devanagari input correctly', () => {
      const result = sutra1236('अग्निम्', { chandas: true });
      expect(result.script).toBe('Devanagari');
      expect(result.text).toBe('अग्निम्');
    });

    test('should maintain metrical analysis across scripts', () => {
      const result1 = sutra1236('agnimīḷe', { chandas: true });
      const result2 = sutra1236('अग्निमीळे', { chandas: true });
      
      expect(result1.analysis.phases.morphological.metricalSuitability).toBe(result2.analysis.phases.morphological.metricalSuitability);
    });
  });

  // ======= Technical Notes Tests =======
  describe('Technical Notes', () => {
    test('should include morphological analysis notes', () => {
      const result = sutra1236('agnim', { chandas: true });
      const morphNote = result.analysis.technicalNotes.find(note => 
        note.includes('Morphological analysis'));
      expect(morphNote).toBeDefined();
      expect(morphNote).toContain('chandas context');
    });

    test('should include metrical context confirmation notes', () => {
      const result = sutra1236('agnim', { chandas: true });
      const metricalNote = result.analysis.technicalNotes.find(note => 
        note.includes('Metrical context confirmed'));
      expect(metricalNote).toBeDefined();
    });

    test('should include prosodic flexibility notes', () => {
      const result = sutra1236('agnimīḷe', { chandas: true });
      const flexibilityNote = result.analysis.technicalNotes.find(note => 
        note.includes('Prosodic flexibility'));
      expect(flexibilityNote).toBeDefined();
    });

    test('should include rhythmic pattern notes', () => {
      const result = sutra1236('agnim', { chandas: true });
      const rhythmicNote = result.analysis.technicalNotes.find(note => 
        note.includes('Rhythmic pattern'));
      expect(rhythmicNote).toBeDefined();
    });
  });

  // ======= Edge Cases =======
  describe('Edge Cases', () => {
    test('should handle very long metrical forms', () => {
      const longForm = 'paramahamsaparivrajakācharyadharmamahāmandaleshvara';
      const result = sutra1236(longForm, { chandas: true });
      expect(result.isValid).toBe(true);
      expect(result.analysis.phases.morphological.metricalSuitability).toBe('complex-metrical');
      expect(result.analysis.phases.prosodyOptions.flexibilityLevel).toBe('high-flexibility');
    });

    test('should handle multiple meter type contexts', () => {
      const result = sutra1236('agnim', { 
        chandas: true, 
        gayatri: true, 
        verse: true 
      });
      expect(result.isValid).toBe(true);
      expect(result.analysis.phases.metricalContext.isChandasContext).toBe(true);
      // Should prioritize gayatri over general contexts
      expect(result.analysis.phases.metricalContext.meterType).toBe('gayatri-meter');
    });

    test('should handle minimal forms in metrical context', () => {
      const result = sutra1236('a', { chandas: true });
      expect(result.isValid).toBe(true);
      expect(result.analysis.phases.morphological.metricalSuitability).toBe('minimal-metrical');
      expect(result.analysis.phases.prosodyOptions.monotoneCompatibility).toBe('limited');
    });

    test('should handle mixed script detection', () => {
      const result = sutra1236('agnim अग्निम्', { chandas: true });
      expect(result.isValid).toBe(true);
      // Should still provide metrical analysis
      expect(result.analysis.phases.metricalContext.isChandasContext).toBe(true);
    });
  });
});
