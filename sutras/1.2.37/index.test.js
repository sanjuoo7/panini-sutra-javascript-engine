import { sutra1237 } from './index.js';

describe('1.2.37 न सुब्रह्मण्यायां स्वरितस्य तूदात्तः (Subrahmaṇyā Domain Rules) - Comprehensive Tests', () => {
  
  // ======= Basic Functionality Tests =======
  describe('Basic Functionality', () => {
    test('should handle Subrahmaṇyā context with svarita conversion', () => {
      const result = sutra1237('â', { subrahmanya: true }); // svarita a
      expect(result.sutra).toBe('1.2.37');
      expect(result.isValid).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.hasConversions).toBe(true);
      expect(result.appliedSutras).toContain('1.2.37');
      expect(result.reasoning).toContain('1.2.37-svarita-to-udaatta');
      expect(result.reasoning).toContain('1.2.37-monotone-prohibition');
    });

    test('should reject invalid input types', () => {
      expect(() => sutra1237(123)).toThrow('text parameter must be a string');
      expect(() => sutra1237(null)).toThrow('text parameter must be a string');
      expect(() => sutra1237(undefined)).toThrow('text parameter must be a string');
    });

    test('should handle empty input gracefully', () => {
      const result = sutra1237('');
      expect(result.isValid).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.errors).toContain('Empty input text');
    });
  });

  // ======= Domain Detection Tests =======
  describe('Domain Detection', () => {
    test('should detect explicit Subrahmaṇyā context', () => {
      const result = sutra1237('agnim', { subrahmanya: true });
      expect(result.analysis.phases.domainDetection.isSubrahmanyaContext).toBe(true);
      expect(result.analysis.phases.domainDetection.contextStrength).toBe('explicit');
      expect(result.analysis.phases.domainDetection.domainIndicators).toContain('explicit-subrahmanya-context');
    });

    test('should detect alternative Subrahmaṇyā context spellings', () => {
      const contexts = [
        { subrahmaṇyā: true },
        { subrahmaṇya: true },
        { skanda: true },
        { karttikeya: true },
        { vedic_hymn: true }
      ];
      
      contexts.forEach(context => {
        const result = sutra1237('agnim', context);
        expect(result.analysis.phases.domainDetection.isSubrahmanyaContext).toBe(true);
      });
    });

    test('should detect textual Subrahmaṇyā markers', () => {
      const textWithMarkers = 'subrahmanya guha kumāra';
      const result = sutra1237(textWithMarkers, {});
      expect(result.analysis.phases.domainDetection.domainIndicators.length).toBeGreaterThan(0);
    });

    test('should detect Devanagari Subrahmaṇyā markers', () => {
      const result = sutra1237('सुब्रह्मण्य स्कन्द कुमार', {});
      expect(result.analysis.phases.domainDetection.domainIndicators.length).toBeGreaterThan(0);
    });

    test('should handle non-Subrahmaṇyā context', () => {
      const result = sutra1237('agnim', {});
      expect(result.analysis.phases.domainDetection.isSubrahmanyaContext).toBe(false);
      expect(result.analysis.phases.domainDetection.contextStrength).toBe('none');
    });
  });

  // ======= Accent Analysis Tests =======
  describe('Accent Analysis', () => {
    test('should detect svarita vowels', () => {
      const result = sutra1237('agnîm', { subrahmanya: true }); // svarita i
      expect(result.analysis.phases.accentAnalysis.hasSvarita).toBe(true);
      expect(result.analysis.phases.accentAnalysis.svaritaCount).toBe(1);
      expect(result.analysis.phases.accentAnalysis.accentDetails).toHaveLength(2); // a and î
      
      const svaritaDetail = result.analysis.phases.accentAnalysis.accentDetails.find(d => d.vowel === 'î');
      expect(svaritaDetail.requiresConversion).toBe(true);
    });

    test('should detect multiple svarita vowels', () => {
      const result = sutra1237('âgnîm', { subrahmanya: true }); // svarita a and i
      expect(result.analysis.phases.accentAnalysis.svaritaCount).toBe(2);
      expect(result.analysis.phases.accentAnalysis.udattaCount).toBe(0);
      expect(result.analysis.phases.accentAnalysis.anudattaCount).toBe(0);
    });

    test('should detect mixed accent patterns', () => {
      const result = sutra1237('ágnîm', { subrahmanya: true }); // udātta a, svarita i
      expect(result.analysis.phases.accentAnalysis.svaritaCount).toBe(1);
      expect(result.analysis.phases.accentAnalysis.udattaCount).toBe(1);
      expect(result.analysis.phases.accentAnalysis.hasUdatta).toBe(true);
    });

    test('should handle text without svarita vowels', () => {
      const result = sutra1237('agnim', { subrahmanya: true }); // no accent marks
      expect(result.analysis.phases.accentAnalysis.hasSvarita).toBe(false);
      expect(result.analysis.phases.accentAnalysis.svaritaCount).toBe(0);
    });

    test('should provide accent distribution summary', () => {
      const result = sutra1237('âgnîm', { subrahmanya: true });
      expect(result.analysis.phases.accentAnalysis.accentDistribution).toEqual({
        svarita: 2,
        udatta: 0,
        anudatta: 0,
        unmarked: 0
      });
    });
  });

  // ======= Conversion Analysis Tests =======
  describe('Conversion Analysis', () => {
    test('should identify svarita vowels requiring conversion', () => {
      const result = sutra1237('âgnîm', { subrahmanya: true });
      expect(result.analysis.phases.conversionAnalysis.conversionsRequired).toBe(true);
      expect(result.analysis.phases.conversionAnalysis.conversionCount).toBe(2);
      expect(result.analysis.phases.conversionAnalysis.conversions).toHaveLength(2);
    });

    test('should create conversion mapping', () => {
      const result = sutra1237('âgnim', { subrahmanya: true });
      const conversion = result.analysis.phases.conversionAnalysis.conversions[0];
      expect(conversion.original).toBe('â');
      expect(conversion.converted).toBe('á'); // udātta a
      expect(conversion.reason).toBe('svarita-to-udatta-subrahmaṇya-rule');
      expect(conversion.sutraApplication).toBe('1.2.37');
    });

    test('should handle text with no conversions needed', () => {
      const result = sutra1237('agnim', { subrahmanya: true });
      expect(result.analysis.phases.conversionAnalysis.conversionsRequired).toBe(false);
      expect(result.analysis.phases.conversionAnalysis.conversionCount).toBe(0);
    });

    test('should track affected positions', () => {
      const result = sutra1237('âgnim', { subrahmanya: true });
      expect(result.analysis.phases.conversionAnalysis.affectedPositions).toContain(0);
    });
  });

  // ======= Monotone Prohibition Tests =======
  describe('Monotone Prohibition', () => {
    test('should prohibit monotone in Subrahmaṇyā context', () => {
      const result = sutra1237('agnim', { subrahmanya: true });
      expect(result.analysis.phases.monotoneProhibition.monotoneProhibited).toBe(true);
      expect(result.analysis.phases.monotoneProhibition.prohibitionReason).toContain('Subrahmaṇyā hymns');
      expect(result.analysis.phases.monotoneProhibition.prohibitedModes).toContain('monotone');
      expect(result.analysis.phases.monotoneProhibition.prohibitedModes).toContain('ekashruti');
    });

    test('should allow monotone outside Subrahmaṇyā context', () => {
      const result = sutra1237('agnim', {});
      expect(result.analysis.phases.monotoneProhibition.monotoneProhibited).toBe(false);
      expect(result.analysis.phases.monotoneProhibition.allowedProsodyModes).toContain('monotone');
    });

    test('should specify allowed prosody modes in Subrahmaṇyā context', () => {
      const result = sutra1237('agnim', { subrahmanya: true });
      expect(result.analysis.phases.monotoneProhibition.allowedProsodyModes).toContain('udaatta-emphasis');
      expect(result.analysis.phases.monotoneProhibition.allowedProsodyModes).toContain('natural-accent');
      expect(result.analysis.phases.monotoneProhibition.accentualRequirement).toBe('distinct-tonal-execution');
    });
  });

  // ======= Prosody Adjustment Tests =======
  describe('Prosody Adjustment', () => {
    test('should apply Subrahmaṇyā-specific adjustments', () => {
      const result = sutra1237('agnimīḷe', { subrahmanya: true });
      expect(result.analysis.phases.prosodyAdjustment.adjustmentType).toBe('subrahmaṇya-specific');
      expect(result.analysis.phases.prosodyAdjustment.prosodicEmphasis).toBe('accent-distinction');
      expect(result.analysis.phases.prosodyAdjustment.rhythmicPattern).toBe('elevated-accentual');
      expect(result.analysis.phases.prosodyAdjustment.toneModification).toBe('svarita-elevation');
    });

    test('should apply standard adjustments for non-Subrahmaṇyā context', () => {
      const result = sutra1237('agnimīḷe', {});
      expect(result.analysis.phases.prosodyAdjustment.adjustmentType).toBe('standard');
      expect(result.analysis.phases.prosodyAdjustment.prosodicEmphasis).toBe('natural-flow');
      expect(result.analysis.phases.prosodyAdjustment.toneModification).toBe('accent-preservation');
    });

    test('should assess prosodic complexity based on syllable count', () => {
      const simpleResult = sutra1237('âg', { subrahmanya: true });
      expect(simpleResult.analysis.phases.prosodyAdjustment.prosodicComplexity).toBe('simple');
      
      const moderateResult = sutra1237('âgnim', { subrahmanya: true });
      expect(moderateResult.analysis.phases.prosodyAdjustment.prosodicComplexity).toBe('simple'); // 2 syllables = simple
      
      const complexResult = sutra1237('paramahansaparivrajaka', { subrahmanya: true });
      expect(complexResult.analysis.phases.prosodyAdjustment.prosodicComplexity).toBe('complex');
    });

    test('should provide recitation guidance', () => {
      const subrahmanyaResult = sutra1237('agnim', { subrahmanya: true });
      expect(subrahmanyaResult.analysis.phases.prosodyAdjustment.recitationGuidance).toContain('udātta conversions');
      expect(subrahmanyaResult.analysis.phases.prosodyAdjustment.recitationGuidance).toContain('avoid monotone');
      
      const standardResult = sutra1237('agnim', {});
      expect(standardResult.analysis.phases.prosodyAdjustment.recitationGuidance).toContain('Standard accentual');
    });
  });

  // ======= Text Conversion Tests =======
  describe('Text Conversion', () => {
    test('should convert svarita to udātta in adjusted text', () => {
      const result = sutra1237('âgnim', { subrahmanya: true });
      expect(result.adjustedText).toBe('ágnim'); // svarita â becomes udātta á
      expect(result.hasConversions).toBe(true);
    });

    test('should handle multiple svarita conversions', () => {
      const result = sutra1237('âgnîm', { subrahmanya: true });
      expect(result.adjustedText).toBe('ágním'); // both â and î become udātta
      expect(result.conversions).toHaveLength(2);
    });

    test('should preserve original text when no conversions needed', () => {
      const result = sutra1237('agnim', { subrahmanya: true });
      expect(result.adjustedText).toBe('agnim');
      expect(result.hasConversions).toBe(false);
    });

    test('should preserve non-svarita accents during conversion', () => {
      const result = sutra1237('ágnîm', { subrahmanya: true }); // udātta a, svarita i
      expect(result.adjustedText).toBe('ágním'); // preserve udātta á, convert î to í
    });

    test('should track conversion details', () => {
      const result = sutra1237('âgnim', { subrahmanya: true });
      const conversion = result.conversions[0];
      expect(conversion.original).toBe('â');
      expect(conversion.converted).toBe('á');
      expect(conversion.conversionType).toBe('svarita-to-udatta');
      expect(conversion.rule).toBe('1.2.37');
    });
  });

  // ======= Prosody Rules Generation Tests =======
  describe('Prosody Rules Generation', () => {
    test('should generate mandatory accent conversion rule', () => {
      const result = sutra1237('âgnim', { subrahmanya: true });
      const conversionRule = result.prosodyRules.find(r => r.type === 'accent-conversion');
      expect(conversionRule).toBeDefined();
      expect(conversionRule.rule).toBe('svarita-to-udatta');
      expect(conversionRule.mandatory).toBe(true);
      expect(conversionRule.sutra).toBe('1.2.37');
    });

    test('should generate monotone prohibition rule', () => {
      const result = sutra1237('agnim', { subrahmanya: true });
      const prohibitionRule = result.prosodyRules.find(r => r.type === 'recitation-prohibition');
      expect(prohibitionRule).toBeDefined();
      expect(prohibitionRule.rule).toBe('no-monotone');
      expect(prohibitionRule.mandatory).toBe(true);
    });

    test('should generate prosodic emphasis rule', () => {
      const result = sutra1237('agnim', { subrahmanya: true });
      const emphasisRule = result.prosodyRules.find(r => r.type === 'prosodic-emphasis');
      expect(emphasisRule).toBeDefined();
      expect(emphasisRule.rule).toBe('accent-distinction');
      expect(emphasisRule.recommended).toBe(true);
    });

    test('should not generate special rules for non-Subrahmaṇyā context', () => {
      const result = sutra1237('agnim', {});
      expect(result.prosodyRules).toHaveLength(0);
    });
  });

  // ======= Prosody Options Tests =======
  describe('Prosody Options', () => {
    test('should provide Subrahmaṇyā-appropriate options', () => {
      const result = sutra1237('agnim', { subrahmanya: true });
      const modes = result.options?.map(o => o.mode) || [];
      expect(modes).toContain('udaatta-emphasis');
      expect(modes).toContain('natural-accent');
      expect(modes).not.toContain('monotone');
    });

    test('should include anudātta contrast option when appropriate', () => {
      const result = sutra1237('àgnim', { subrahmanya: true }); // anudātta a
      const modes = result.options?.map(o => o.mode) || [];
      expect(modes).toContain('anudaatta-contrast');
    });

    test('should provide standard options for non-Subrahmaṇyā context', () => {
      const result = sutra1237('agnim', {});
      const modes = result.options?.map(o => o.mode) || [];
      expect(modes).toContain('natural-accent');
      expect(modes).toContain('monotone');
    });
  });

  // ======= Recommendations Tests =======
  describe('Recommendations', () => {
    test('should recommend accent conversion in Subrahmaṇyā context', () => {
      const result = sutra1237('âgnim', { subrahmanya: true });
      const conversionRec = result.recommendations.find(r => r.type === 'accent-conversion');
      expect(conversionRec).toBeDefined();
      expect(conversionRec.priority).toBe('high');
      expect(conversionRec.description).toContain('svarita-to-udātta conversions');
    });

    test('should recommend monotone avoidance', () => {
      const result = sutra1237('agnim', { subrahmanya: true });
      const avoidanceRec = result.recommendations.find(r => r.type === 'monotone-avoidance');
      expect(avoidanceRec).toBeDefined();
      expect(avoidanceRec.priority).toBe('high');
      expect(avoidanceRec.justification).toContain('Explicit prohibition');
    });

    test('should recommend accentual emphasis', () => {
      const result = sutra1237('àgnim', { subrahmanya: true });
      const emphasisRec = result.recommendations.find(r => r.type === 'accentual-emphasis');
      expect(emphasisRec).toBeDefined();
      expect(emphasisRec.priority).toBe('medium');
    });

    test('should recommend conversion practice when conversions are present', () => {
      const result = sutra1237('âgnîm', { subrahmanya: true });
      const practiceRec = result.recommendations.find(r => r.type === 'conversion-practice');
      expect(practiceRec).toBeDefined();
      expect(practiceRec.description).toContain('2 converted vowel(s)');
    });

    test('should recommend standard prosody for non-Subrahmaṇyā context', () => {
      const result = sutra1237('agnim', {});
      const standardRec = result.recommendations.find(r => r.type === 'standard-prosody');
      expect(standardRec).toBeDefined();
      expect(standardRec.priority).toBe('medium');
    });
  });

  // ======= Confidence Scoring Tests =======
  describe('Confidence Scoring', () => {
    test('should have high confidence for explicit Subrahmaṇyā context', () => {
      const result = sutra1237('âgnim', { subrahmanya: true });
      expect(result.confidence).toBeGreaterThan(0.9);
    });

    test('should increase confidence with textual markers', () => {
      const result = sutra1237('subrahmanya âgnim', {});
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should increase confidence with svarita vowels', () => {
      const result = sutra1237('âgnim', { subrahmanya: true });
      expect(result.confidence).toBeGreaterThan(0.9);
    });

    test('should have moderate confidence for non-explicit context', () => {
      const result = sutra1237('agnim', {});
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.confidence).toBeLessThan(0.8);
    });

    test('should have confidence bounded between 0 and 1', () => {
      const result = sutra1237('subrahmanya âgnîm guha kumāra', { 
        subrahmanya: true, 
        skanda: true 
      });
      expect(result.confidence).toBeGreaterThanOrEqual(0);
      expect(result.confidence).toBeLessThanOrEqual(1);
    });
  });

  // ======= Traditional Commentary Tests =======
  describe('Traditional Commentary', () => {
    test('should provide correct sutra text and meaning', () => {
      const result = sutra1237('âgnim', { subrahmanya: true });
      expect(result.traditionalCommentary.sutraText).toBe('न सुब्रह्मण्यायां स्वरितस्य तूदात्तः');
      expect(result.traditionalCommentary.meaning).toContain('Subrahmaṇyā hymns');
      expect(result.traditionalCommentary.meaning).toContain('svarita');
      expect(result.traditionalCommentary.meaning).toContain('udātta');
      expect(result.traditionalCommentary.context).toBe('Sacred hymn recitation with specialized prosodic requirements');
    });

    test('should provide interpretation for Subrahmaṇyā context', () => {
      const result = sutra1237('âgnim', { subrahmanya: true });
      expect(result.traditionalCommentary.traditionalInterpretation).toContain('niyama (restrictive rule)');
      expect(result.traditionalCommentary.traditionalInterpretation).toContain('ritual efficacy');
      expect(result.traditionalCommentary.traditionalInterpretation).toContain('Skanda/Karttikeya');
    });

    test('should provide interpretation for non-Subrahmaṇyā context', () => {
      const result = sutra1237('agnim', {});
      expect(result.traditionalCommentary.traditionalInterpretation).toContain('does not occur in the specific Subrahmaṇyā hymn context');
      expect(result.traditionalCommentary.traditionalInterpretation).toContain('Standard accentual recitation');
    });

    test('should provide scholastic notes for Subrahmaṇyā context', () => {
      const result = sutra1237('âgnim', { subrahmanya: true });
      expect(result.traditionalCommentary.scholasticNotes).toContain('Subrahmaṇyā-viśeṣa-vidhi: Special rule for Subrahmaṇyā hymn recitation');
      expect(result.traditionalCommentary.scholasticNotes).toContain('Svarita-udātta-parivṛtti: Mandatory svarita-to-udātta transformation');
      expect(result.traditionalCommentary.scholasticNotes).toContain('Ekashruti-niṣedha: Explicit prohibition of monotone recitation');
    });

    test('should include conversion details in scholastic notes', () => {
      const result = sutra1237('âgnîm', { subrahmanya: true });
      expect(result.traditionalCommentary.scholasticNotes).toContain('Vṛtti-viśeṣa: 2 svarita vowel(s) converted to udātta as per the rule');
    });

    test('should provide practical application guidance', () => {
      const subrahmanyaResult = sutra1237('âgnim', { subrahmanya: true });
      expect(subrahmanyaResult.traditionalCommentary.practicalApplication).toContain('convert each svarita vowel to udātta');
      expect(subrahmanyaResult.traditionalCommentary.practicalApplication).toContain('clear tonal distinctions');
      
      const standardResult = sutra1237('agnim', {});
      expect(standardResult.traditionalCommentary.practicalApplication).toContain('Standard recitation principles');
    });
  });

  // ======= Script Support Tests =======
  describe('Script Support', () => {
    test('should handle IAST input correctly', () => {
      const result = sutra1237('âgnim', { subrahmanya: true });
      expect(result.script).toBe('IAST');
      expect(result.text).toBe('âgnim');
    });

    test('should handle Devanagari input correctly', () => {
      const result = sutra1237('अग्निम्', { subrahmanya: true });
      expect(result.script).toBe('Devanagari');
      expect(result.text).toBe('अग्निम्');
    });

    test('should maintain conversion accuracy across scripts', () => {
      const iastResult = sutra1237('âgnim', { subrahmanya: true });
      const devaResult = sutra1237('अग्निम्', { subrahmanya: true });
      
      // Both should show appropriate conversions for their scripts
      expect(iastResult.hasConversions).toBe(true);
      expect(iastResult.adjustedText).toContain('á');
    });
  });

  // ======= Technical Notes Tests =======
  describe('Technical Notes', () => {
    test('should include domain analysis notes', () => {
      const result = sutra1237('âgnim', { subrahmanya: true });
      const domainNote = result.analysis.technicalNotes.find(note => 
        note.includes('Domain analysis'));
      expect(domainNote).toBeDefined();
      expect(domainNote).toContain('Subrahmaṇyā hymn context detected');
    });

    test('should include accent analysis notes', () => {
      const result = sutra1237('âgnim', { subrahmanya: true });
      const accentNote = result.analysis.technicalNotes.find(note => 
        note.includes('Accent analysis'));
      expect(accentNote).toBeDefined();
      expect(accentNote).toContain('svarita vowel(s) identified');
    });

    test('should include conversion analysis notes', () => {
      const result = sutra1237('âgnim', { subrahmanya: true });
      const conversionNote = result.analysis.technicalNotes.find(note => 
        note.includes('Conversion analysis'));
      expect(conversionNote).toBeDefined();
      expect(conversionNote).toContain('svarita-to-udātta conversion(s) required');
    });

    test('should include monotone prohibition notes', () => {
      const result = sutra1237('agnim', { subrahmanya: true });
      const prohibitionNote = result.analysis.technicalNotes.find(note => 
        note.includes('Monotone prohibition'));
      expect(prohibitionNote).toBeDefined();
      expect(prohibitionNote).toContain('Ekashruti recitation not permitted');
    });

    test('should include prosody adjustment notes', () => {
      const result = sutra1237('agnim', { subrahmanya: true });
      const prosodyNote = result.analysis.technicalNotes.find(note => 
        note.includes('Prosody adjustment'));
      expect(prosodyNote).toBeDefined();
      expect(prosodyNote).toContain('prosodic framework applied');
    });
  });

  // ======= Edge Cases =======
  describe('Edge Cases', () => {
    test('should handle text with only non-vowel characters', () => {
      const result = sutra1237('kṣṇ', { subrahmanya: true });
      expect(result.isValid).toBe(true);
      expect(result.analysis.phases.accentAnalysis.totalVowels).toBe(0);
      expect(result.hasConversions).toBe(false);
    });

    test('should handle mixed script input', () => {
      const result = sutra1237('agnim अग्निम्', { subrahmanya: true });
      expect(result.isValid).toBe(true);
      // Should still detect the context properly
      expect(result.analysis.phases.domainDetection.isSubrahmanyaContext).toBe(true);
    });

    test('should handle text with only udātta and anudātta vowels', () => {
      const result = sutra1237('ágnìm', { subrahmanya: true }); // udātta a, anudātta i
      expect(result.analysis.phases.accentAnalysis.hasSvarita).toBe(false);
      expect(result.hasConversions).toBe(false);
      expect(result.analysis.phases.monotoneProhibition.monotoneProhibited).toBe(true);
    });

    test('should handle very long texts with multiple Subrahmaṇyā markers', () => {
      const longText = 'subrahmanya paramahansaparivrajaka skanda kārttikeya guha kumāra âgnîm';
      const result = sutra1237(longText, { subrahmanya: true });
      expect(result.isValid).toBe(true);
      expect(result.analysis.phases.domainDetection.domainIndicators.length).toBeGreaterThan(3);
      expect(result.confidence).toBeGreaterThan(0.9);
    });

    test('should handle multiple context indicators', () => {
      const result = sutra1237('âgnim', { 
        subrahmanya: true, 
        skanda: true, 
        vedic_hymn: true 
      });
      expect(result.isValid).toBe(true);
      expect(result.analysis.phases.domainDetection.isSubrahmanyaContext).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
    });
  });
});
