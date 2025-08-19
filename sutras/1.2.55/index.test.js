import { sutra1255, applySutra1_2_55, analyzeEtymologicalAuthority, assessMeaningPresence } from './index.js';

describe('Sutra 1.2.55: योगप्रमाणे च तदभावेऽदर्शनं स्यात्', () => {
  
  describe('Core Implementation: sutra1255', () => {
    
    test('applies to items with explicit etymological construction and meaning absence', () => {
      const etymologicalItem = {
        text: 'शून्यार्थक',
        etymologicalConstruction: true,
        meaningAbsent: true,
        etymologicalBasis: 'अष्टाध्यायी'
      };
      
      const result = sutra1255(etymologicalItem);
      
      expect(result.applies).toBe(true);
      expect(result.nonElidable).toBe(true);
      expect(result.logicalPresence).toBe(true);
      expect(result.phoneticPresence).toBe(false); // Suppressed due to meaning absence
      expect(result.analysis.etymologyAnalysis.hasEtymologicalConstruction).toBe(true);
      expect(result.analysis.etymologyAnalysis.constructionType).toBe('explicit_etymology_flag');
      expect(result.analysis.meaningAnalysis.meaningAbsent).toBe(true);
    });

    test('applies to items with yoga property and meaning absence', () => {
      const item = {
        text: 'व्युत्पन्न',
        yoga: 'धात्वर्थ',
        meaningAbsent: true,
        etymologicalBasis: 'व्याकरण'
      };
      
      const result = sutra1255(item);
      
      expect(result.applies).toBe(true);
      expect(result.nonElidable).toBe(true);
      expect(result.analysis.etymologyAnalysis.constructionType).toBe('explicit_yoga_property');
      expect(result.analysis.etymologyAnalysis.constructionCategory).toBe('derivational');
      expect(result.phoneticPresence).toBe(false);
    });

    test('applies to items with context etymology and meaning absence', () => {
      const item = { text: 'निरर्थक' };
      const context = { 
        etymology: 'समासार्थ', 
        meaningAbsent: true,
        authority: 'traditional_grammar' 
      };
      
      const result = sutra1255(item, context);
      
      expect(result.applies).toBe(true);
      expect(result.nonElidable).toBe(true);
      expect(result.analysis.etymologyAnalysis.constructionType).toBe('context_etymology');
      expect(result.phoneticPresence).toBe(false);
    });

    test('recognizes string-based etymological patterns with meaning absence', () => {
      const etymologicalString = 'व्युत्पत्तिशास्त्र';
      const context = { meaningAbsent: true };
      
      const result = sutra1255(etymologicalString, context);
      
      expect(result.applies).toBe(true);
      expect(result.nonElidable).toBe(true);
      expect(result.analysis.etymologyAnalysis.constructionType).toBe('string_pattern_recognition');
      expect(result.analysis.etymologyAnalysis.constructionCategory).toBe('semantic');
    });

    test('recognizes compositional etymological patterns', () => {
      const compositionalTerm = 'संधिविधान';
      const context = { meaningAbsent: true };
      
      const result = sutra1255(compositionalTerm, context);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.etymologyAnalysis.constructionCategory).toBe('compositional');
    });

    test('handles semantic property-based etymological constructions', () => {
      const item = {
        text: 'व्युत्पादित',
        hasDerivation: true,
        meaningAbsent: true,
        etymologyProvided: true
      };
      
      const result = sutra1255(item);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.etymologyAnalysis.constructionType).toBe('semantic_property_analysis');
      expect(result.phoneticPresence).toBe(false);
    });

    test('handles items with compositional structure', () => {
      const item = {
        text: 'संरचना',
        structure: { parts: ['सम्', 'रच्', 'ना'] },
        meaningAbsent: true
      };
      
      const result = sutra1255(item);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.etymologyAnalysis.constructionType).toBe('semantic_property_analysis');
      expect(result.analysis.etymologyAnalysis.constructionCategory).toBe('compositional');
    });

    test('does not apply to items without etymological construction', () => {
      const nonEtymological = { 
        text: 'सामान्य', 
        meaningAbsent: true // Even with meaning absence, no etymology = no application
      };
      
      const result = sutra1255(nonEtymological);
      
      expect(result.applies).toBe(false);
      expect(result.nonElidable).toBe(false);
      expect(result.analysis.etymologyAnalysis.hasEtymologicalConstruction).toBe(false);
    });

    test('does not apply when meaning is present despite etymological construction', () => {
      const meaningfulItem = {
        text: 'सार्थक',
        etymologicalConstruction: true,
        meaningAbsent: false, // Explicit meaning presence
        etymologicalBasis: 'अष्टाध्यायी'
      };
      
      const result = sutra1255(meaningfulItem);
      
      expect(result.applies).toBe(false);
      expect(result.phoneticPresence).toBe(true); // Should remain phonetically present
      expect(result.analysis.meaningAnalysis.meaningAbsent).toBe(false);
    });

    test('does not apply when no meaning absence is indicated', () => {
      const normalItem = {
        text: 'व्युत्पादन',
        etymologicalConstruction: true,
        etymologicalBasis: 'व्याकरण'
        // No meaningAbsent flag
      };
      
      const result = sutra1255(normalItem);
      
      expect(result.applies).toBe(false);
      expect(result.phoneticPresence).toBe(true);
    });
  });

  describe('Authority Validation', () => {
    
    test('validates Paninian etymological authority', () => {
      const item = {
        text: 'पाणिनीयम्',
        etymologicalConstruction: true,
        meaningAbsent: true,
        etymologicalBasis: 'अष्टाध्यायी'
      };
      
      const result = sutra1255(item);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.authorityAnalysis.hasAuthoritySource).toBe(true);
      expect(result.analysis.authorityAnalysis.authorityStrength).toBe(1.0);
      expect(result.analysis.authorityAnalysis.constructionValidity).toBe(true);
      expect(result.analysis.authorityAnalysis.authorityType).toBe('पाणिनीय_प्रमाण');
    });

    test('validates traditional etymological authority', () => {
      const item = {
        text: 'पारम्परिक',
        etymologicalConstruction: true,
        meaningAbsent: true,
        etymologicalBasis: 'व्याकरण'
      };
      
      const result = sutra1255(item);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.authorityAnalysis.authorityStrength).toBe(0.9);
      expect(result.analysis.authorityAnalysis.constructionValidity).toBe(true);
      expect(result.analysis.authorityAnalysis.authorityType).toBe('परम्परा_प्रमाण');
    });

    test('validates semantic authority source', () => {
      const item = {
        text: 'अर्थगत',
        etymologicalConstruction: true,
        meaningAbsent: true,
        etymologicalBasis: 'अर्थशास्त्र'
      };
      
      const result = sutra1255(item);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.authorityAnalysis.authorityStrength).toBe(0.75);
      expect(result.analysis.authorityAnalysis.authorityType).toBe('अर्थ_प्रमाण');
    });

    test('validates contextual authority', () => {
      const item = { 
        text: 'प्रासंगिक', 
        etymologicalConstruction: true,
        meaningAbsent: true
      };
      const context = { authority: 'contextual_etymology' };
      
      const result = sutra1255(item, context);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.authorityAnalysis.authorityStrength).toBe(0.7);
      expect(result.analysis.authorityAnalysis.authorityType).toBe('contextual_etymology');
    });

    test('provides categorical authority for categorized constructions', () => {
      const item = {
        text: 'कोटिगत',
        etymologicalConstruction: true,
        meaningAbsent: true,
        yoga: 'समासार्थ' // This will give categorical authority
      };
      
      const result = sutra1255(item);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.authorityAnalysis.hasAuthoritySource).toBe(true);
      expect(result.analysis.authorityAnalysis.authorityStrength).toBe(0.6);
      expect(result.analysis.authorityAnalysis.authorityType).toBe('categorical_construction');
    });

    test('handles insufficient authority gracefully', () => {
      const item = {
        text: 'अप्रामाणिक',
        etymologicalConstruction: true,
        meaningAbsent: true
        // No authority source
      };
      
      const result = sutra1255(item);
      
      expect(result.applies).toBe(true); // Still applies due to explicit flag
      expect(result.analysis.authorityAnalysis.authorityStrength).toBe(0.55);
      expect(result.analysis.authorityAnalysis.authorityType).toBe('explicit_construction');
    });
  });

  describe('Meaning Absence Assessment', () => {
    
    test('recognizes explicit meaning absence flag', () => {
      const item = {
        text: 'स्पष्टाभाव',
        etymologicalConstruction: true,
        meaningAbsent: true,
        etymologicalBasis: 'अष्टाध्यायी'
      };
      
      const result = sutra1255(item);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.meaningAnalysis.meaningAbsent).toBe(true);
      expect(result.analysis.meaningAnalysis.absenceType).toBe('explicit_absence_flag');
      expect(result.analysis.meaningAnalysis.absenceDegree).toBe(1.0);
      expect(result.phoneticPresence).toBe(false);
    });

    test('recognizes semantic void', () => {
      const item = {
        text: 'शून्यार्थ',
        etymologicalConstruction: true,
        semanticVoid: true,
        etymologicalBasis: 'व्याकरण'
      };
      
      const result = sutra1255(item);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.meaningAnalysis.absenceType).toBe('अर्थशून्यत्व');
      expect(result.analysis.meaningAnalysis.absenceDegree).toBe(1.0);
      expect(result.analysis.meaningAnalysis.semanticGap).toBe(true);
    });

    test('recognizes contextual gap', () => {
      const item = {
        text: 'प्रसंगहीन',
        etymologicalConstruction: true,
        contextualGap: true,
        etymologicalBasis: 'निरुक्त'
      };
      
      const result = sutra1255(item);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.meaningAnalysis.absenceType).toBe('प्रसंगाभाव');
      expect(result.analysis.meaningAnalysis.absenceDegree).toBe(0.8);
    });

    test('recognizes etymological break', () => {
      const item = {
        text: 'भग्नव्युत्पत्ति',
        etymologicalConstruction: true,
        etymologyBroken: true,
        etymologicalBasis: 'व्याकरण'
      };
      
      const result = sutra1255(item);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.meaningAnalysis.absenceType).toBe('व्युत्पत्तिभंग');
      expect(result.analysis.meaningAnalysis.absenceDegree).toBe(0.9);
    });

    test('recognizes functional loss', () => {
      const item = {
        text: 'व्यापारहीन',
        etymologicalConstruction: true,
        functionalLoss: true,
        etymologicalBasis: 'प्रयोग'
      };
      
      const result = sutra1255(item);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.meaningAnalysis.absenceType).toBe('व्यापारहानि');
      expect(result.analysis.meaningAnalysis.absenceDegree).toBe(0.75);
    });

    test('handles context-provided meaning absence', () => {
      const item = {
        text: 'प्रसंगाभाव',
        etymologicalConstruction: true,
        etymologicalBasis: 'व्याकरण'
      };
      const context = { meaningAbsent: true };
      
      const result = sutra1255(item, context);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.meaningAnalysis.meaningAbsent).toBe(true);
      expect(result.analysis.meaningAnalysis.absenceType).toBe('explicit_absence_flag');
    });
  });

  describe('Non-appearance Logic (adarśana)', () => {
    
    test('applies complete phonetic suppression for complete meaning absence', () => {
      const item = {
        text: 'पूर्णशून्य',
        etymologicalConstruction: true,
        semanticVoid: true, // Complete absence (degree 1.0)
        etymologicalBasis: 'अष्टाध्यायी'
      };
      
      const result = sutra1255(item);
      
      expect(result.phoneticPresence).toBe(false);
      expect(result.logicalPresence).toBe(true);
      expect(result.analysis.nonAppearanceAnalysis.phoneticSuppression).toBe(true);
      expect(result.analysis.nonAppearanceAnalysis.suppressionDegree).toBe('पूर्णनिग्रह');
      expect(result.reasons).toContain('complete-meaning-absence');
    });

    test('applies systematic suppression for high meaning absence', () => {
      const item = {
        text: 'उच्चाभाव',
        etymologicalConstruction: true,
        contextualGap: true, // High absence (degree 0.8)
        etymologicalBasis: 'व्याकरण'
      };
      
      const result = sutra1255(item);
      
      expect(result.phoneticPresence).toBe(false);
      expect(result.logicalPresence).toBe(true);
      expect(result.analysis.nonAppearanceAnalysis.suppressionDegree).toBe('पद्धतिगताभाव');
      expect(result.reasons).toContain('systematic-meaning-absence');
    });

    test('allows partial manifestation for moderate meaning absence', () => {
      const item = {
        text: 'मध्यमाभाव',
        etymologicalConstruction: true,
        functionalLoss: true, // Moderate absence (degree 0.75)
        etymologicalBasis: 'प्रयोग'
      };
      const context = { allowPartialManifestation: true };
      
      const result = sutra1255(item, context);
      
      expect(result.phoneticPresence).toBe(true); // Partial manifestation allowed
      expect(result.logicalPresence).toBe(true);
      expect(result.analysis.nonAppearanceAnalysis.suppressionDegree).toBe('आंशिकप्रकाश');
      expect(result.reasons).toContain('partial-meaning-absence');
    });

    test('respects context-forced suppression', () => {
      const item = {
        text: 'बलनिग्रह',
        etymologicalConstruction: true,
        functionalLoss: true,
        etymologicalBasis: 'व्याकरण'
      };
      const context = { forcePhoneticSuppression: true };
      
      const result = sutra1255(item, context);
      
      expect(result.phoneticPresence).toBe(false);
      expect(result.analysis.nonAppearanceAnalysis.suppressionDegree).toBe('पूर्णनिग्रह');
      expect(result.reasons).toContain('context-forced-suppression');
    });

    test('handles optional suppression', () => {
      const item = {
        text: 'वैकल्पिक',
        etymologicalConstruction: true,
        meaningAbsent: true,
        etymologicalBasis: 'व्याकरण'
      };
      const context = { optionalSuppression: true };
      
      const result = sutra1255(item, context);
      
      expect(result.analysis.nonAppearanceAnalysis.suppressionDegree).toBe('वैकल्पिकलुप्ति');
      expect(result.reasons).toContain('optional-non-appearance');
    });
  });

  describe('Confidence Assessment', () => {
    
    test('provides high confidence for explicit etymology and authority', () => {
      const item = {
        text: 'उच्चविश्वास',
        etymologicalConstruction: true,
        meaningAbsent: true,
        etymologicalBasis: 'अष्टाध्यायी'
      };
      
      const result = sutra1255(item);
      
      expect(result.confidence.overall).toBeGreaterThan(0.8);
      expect(result.confidence.etymologyDetection).toBe(0.95);
      expect(result.confidence.authorityValidation).toBe(1.0);
      expect(result.confidence.meaningAbsenceAssessment).toBe(1.0);
      expect(result.confidence.factors).toContain('explicit_etymology_flag_high_confidence');
      expect(result.confidence.factors).toContain('high_authority_validation');
    });

    test('provides moderate confidence for pattern recognition', () => {
      const item = 'व्युत्पत्तिविषयक';
      const context = { meaningAbsent: true };
      
      const result = sutra1255(item, context);
      
      expect(result.confidence.overall).toBeGreaterThan(0.6);
      expect(result.confidence.overall).toBeLessThan(0.8);
      expect(result.confidence.factors).toContain('string_pattern_moderate_confidence');
    });

    test('provides lower confidence for minimal authority', () => {
      const item = {
        text: 'न्यूनविश्वास',
        etymologicalConstruction: true,
        meaningAbsent: true
        // No explicit authority source
      };
      
      const result = sutra1255(item);
      
      expect(result.confidence.overall).toBeGreaterThan(0.5);
      expect(result.confidence.overall).toBeLessThan(0.7);
      expect(result.confidence.factors).toContain('low_authority_validation');
    });
  });

  describe('Error Handling', () => {
    
    test('handles null input gracefully', () => {
      const result = sutra1255(null);
      
      expect(result.applies).toBe(false);
      expect(result.error).toBe('null_or_undefined_item');
      expect(result.analysis.inputValidation.isValid).toBe(false);
    });

    test('handles undefined input gracefully', () => {
      const result = sutra1255(undefined);
      
      expect(result.applies).toBe(false);
      expect(result.error).toBe('null_or_undefined_item');
    });

    test('handles invalid context type', () => {
      const result = sutra1255('test', 'invalid_context');
      
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_context_type');
    });

    test('handles empty objects gracefully', () => {
      const result = sutra1255({});
      
      expect(result.applies).toBe(false);
      expect(result.nonElidable).toBe(false);
      expect(result.analysis.inputValidation.isValid).toBe(true);
    });
  });

  describe('Legacy Compatibility: applySutra1_2_55', () => {
    
    test('maintains legacy interface', () => {
      const item = {
        text: 'परम्परागत',
        etymologicalConstruction: true,
        meaningAbsent: true,
        etymologicalBasis: 'व्याकरण'
      };
      
      const result = applySutra1_2_55(item);
      
      expect(result.sutra).toBe('1.2.55');
      expect(result.applied).toBe(true);
      expect(result.nonElidable).toBe(true);
      expect(result.logicalPresence).toBe(true);
      expect(result.phoneticPresence).toBe(false);
      expect(result.analysis).toBeDefined();
      expect(result.confidence).toBeDefined();
    });

    test('integrates with utility classification', () => {
      const item = { 
        text: 'उपयोगिता', 
        etymologicalConstruction: true,
        meaningAbsent: true
      };
      
      const result = applySutra1_2_55(item);
      
      expect(result.sutrasApplied).toBeDefined();
      expect(result.explanation).toBeDefined();
      expect(result.reasons).toBeDefined();
    });

    test('handles legacy context merging', () => {
      const item = { 
        text: 'प्रसंगमिश्रण', 
        etymologicalConstruction: true,
        meaningAbsent: true
      };
      const context = { testMode: true };
      
      const result = applySutra1_2_55(item, context);
      
      expect(result.applied).toBe(true);
      expect(result.analysis.inputAnalysis.contextProvided).toBe(true);
    });

    test('original legacy test: meaning absence flips phoneticPresence', () => {
      const r = applySutra1_2_55({}, { meaningAbsent: true });
      expect(r.phoneticPresence).toBe(false);
      expect(r.logicalPresence).toBe(true);
    });
  });

  describe('Analysis Functions', () => {
    
    test('analyzeEtymologicalAuthority provides detailed analysis', () => {
      const item = {
        text: 'विश्लेषणीय',
        yoga: 'व्युत्पत्तिशास्त्र',
        meaningAbsent: true,
        etymologicalBasis: 'निरुक्त'
      };
      
      const analysis = analyzeEtymologicalAuthority(item);
      
      expect(analysis.has_etymological_construction).toBe(true);
      expect(analysis.construction_type).toBe('परम्परा_प्रमाण'); // निरुक्त is traditional, not Paninian
      expect(analysis.meaning_absence).toBe('explicit_absence_flag');
      expect(analysis.non_appearance_degree).toBe('पूर्णनिग्रह');
      expect(analysis.analysis).toBeDefined();
      expect(analysis.confidence).toBeDefined();
    });

    test('assessMeaningPresence works independently', () => {
      const item = {
        text: 'अर्थपरीक्षा',
        etymologicalConstruction: true,
        semanticVoid: true
      };
      
      const assessment = assessMeaningPresence(item);
      
      expect(assessment.meaning_present).toBe(false);
      expect(assessment.absence_type).toBe('अर्थशून्यत्व');
      expect(assessment.absence_degree).toBe(1.0);
      expect(assessment.semantic_analysis).toBeDefined();
    });
  });

  describe('Multi-script Support', () => {
    
    test('handles IAST etymological patterns', () => {
      const item = 'vyutpattishāstra';
      const context = { meaningAbsent: true };
      
      const result = sutra1255(item, context);
      
      expect(result.analysis.inputAnalysis.script).toBe('iast');
      expect(result.applies).toBe(false); // No pattern matches in IAST currently
    });

    test('handles Devanagari etymological patterns', () => {
      const item = 'निरुक्तशास्त्र';
      const context = { meaningAbsent: true };
      
      const result = sutra1255(item, context);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.etymologyAnalysis.constructionCategory).toBe('semantic');
    });

    test('processes mixed script contexts', () => {
      const item = { 
        text: 'व्युत्पत्ति', 
        romanization: 'vyutpatti',
        meaningAbsent: true
      };
      const context = { script: 'mixed' };
      
      const result = sutra1255(item, context);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.inputAnalysis.contextProvided).toBe(true);
    });
  });

  describe('Complex Scenarios', () => {
    
    test('handles multiple etymological indicators', () => {
      const item = {
        text: 'बहुव्युत्पत्ति',
        etymologicalConstruction: true,
        yoga: 'समासार्थ',
        hasDerivation: true,
        meaningAbsent: true,
        etymologicalBasis: 'अष्टाध्यायी'
      };
      
      const result = sutra1255(item);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.etymologyAnalysis.constructionType).toBe('explicit_yoga_property'); // Precedence
      expect(result.analysis.authorityAnalysis.authorityStrength).toBe(1.0);
    });

    test('handles etymological construction with meaning presence (edge case)', () => {
      const item = {
        text: 'सार्थकव्युत्पत्ति',
        etymologicalConstruction: true,
        meaningAbsent: false, // Explicit meaning presence
        etymologicalBasis: 'व्याकरण'
      };
      
      const result = sutra1255(item);
      
      expect(result.applies).toBe(false); // Should not apply when meaning is present
      expect(result.phoneticPresence).toBe(true);
      expect(result.analysis.meaningAnalysis.meaningAbsent).toBe(false);
    });

    test('handles partial meaning absence with context overrides', () => {
      const item = {
        text: 'आंशिकाभाव',
        etymologicalConstruction: true,
        functionalLoss: true, // Partial absence
        etymologicalBasis: 'प्रयोग'
      };
      const context = { 
        allowPartialManifestation: false, // Override to force suppression
        forcePhoneticSuppression: true
      };
      
      const result = sutra1255(item, context);
      
      expect(result.applies).toBe(true);
      expect(result.phoneticPresence).toBe(false); // Forced suppression despite partial absence
      expect(result.reasons).toContain('context-forced-suppression');
    });

    test('handles semantic property with meaning gap assessment', () => {
      const item = {
        text: 'संरचनागत',
        structure: { parts: ['सम्', 'रच्', 'ना'] },
        etymologyProvided: true,
        semanticVoid: true,
        etymologicalBasis: 'व्याकरण'
      };
      
      const result = sutra1255(item);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.etymologyAnalysis.constructionCategory).toBe('compositional');
      expect(result.analysis.meaningAnalysis.semanticGap).toBe(true);
      expect(result.phoneticPresence).toBe(false);
    });
  });

  describe('Teaching Economy Principle', () => {
    
    test('applies teaching economy for non-current etymological forms', () => {
      const item = {
        text: 'शिक्षणार्थव्यर्थता',
        etymologicalConstruction: true,
        meaningAbsent: true,
        etymologicalBasis: 'अष्टाध्यायी'
      };
      
      const result = sutra1255(item);
      
      expect(result.nonElidable).toBe(true); // Retained conceptually but not taught
      expect(result.phoneticPresence).toBe(false);
      expect(result.logicalPresence).toBe(true);
      expect(result.reasons).toContain('etymological-authority-confirmed');
      expect(result.reasons).toContain('adarshana-principle-applied');
    });

    test('includes comprehensive reasoning in results', () => {
      const item = {
        text: 'तर्कसंगत',
        etymologicalConstruction: true,
        semanticVoid: true,
        etymologicalBasis: 'अष्टाध्यायी'
      };
      
      const result = sutra1255(item);
      
      expect(result.reasons).toContain('etymological-authority-confirmed');
      expect(result.reasons).toContain('construction-validity-confirmed');
      expect(result.reasons).toContain('meaning-absence-अर्थशून्यत्व');
      expect(result.reasons).toContain('adarshana-principle-applied');
    });
  });
});
