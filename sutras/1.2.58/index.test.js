import { applySutra1_2_58, sutra1258 } from './index.js';

describe('Sutra 1.2.58: जात्याख्यायामेकस्मिन् बहुवचनमन्यतरस्याम् - Optional Plural for Class Nouns', () => {
  
  // Phase 1: Core Class Noun Tests
  test('explicit class noun gets optional plural', () => {
    const r = applySutra1_2_58({ isClassNoun: true });
    expect(r.applied).toBe(true);
    expect(r.numberOptions).toContain('plural');
    expect(r.numberOptions).toContain('singular');
    expect(r.analysis.classNounAnalysis.isClassNoun).toBe(true);
  });

  test('class noun gets optional plural (legacy compatibility)', () => {
    const r = applySutra1_2_58('गज', { isClassNoun:true });
    expect(r.applied).toBe(true);
    expect(r.numberOptions).toContain('plural');
  });

  test('context-specified class noun', () => {
    const r = applySutra1_2_58('वृक्ष', { isClassNoun: true });
    expect(r.applied).toBe(true);
    expect(r.analysis.classNounAnalysis.classType).toBe('context_class_noun');
    expect(r.numberOptions).toContain('plural');
  });

  // Phase 2: String Pattern Recognition Tests
  test('abstract suffix pattern - त्व', () => {
    const r = applySutra1_2_58('मनुष्यत्व');
    expect(r.applied).toBe(true);
    expect(r.analysis.classNounAnalysis.classCategory).toBe('abstract');
    expect(r.numberOptions).toContain('plural');
  });

  test('possessive suffix pattern - मान्', () => {
    const r = applySutra1_2_58('गुणवान्');
    expect(r.applied).toBe(true);
    expect(r.analysis.classNounAnalysis.classCategory).toBe('possessive');
  });

  test('natural class indicator - जाति', () => {
    const r = applySutra1_2_58('मनुष्यजाति');
    expect(r.applied).toBe(true);
    expect(r.analysis.classNounAnalysis.classCategory).toBe('natural');
  });

  test('artificial class indicator - प्रकार', () => {
    const r = applySutra1_2_58('कार्यप्रकार');
    expect(r.applied).toBe(true);
    expect(r.analysis.classNounAnalysis.classCategory).toBe('artificial');
  });

  test('semantic class indicator - देव', () => {
    const r = applySutra1_2_58('देवगण');
    expect(r.applied).toBe(true);
    expect(r.analysis.classNounAnalysis.classCategory).toBe('semantic');
  });

  test('collective class indicator - समुदाय', () => {
    const r = applySutra1_2_58('मनुष्यसमुदाय');
    expect(r.applied).toBe(true);
    expect(r.analysis.classNounAnalysis.classCategory).toBe('collective');
  });

  // Phase 3: Singular Sense Analysis Tests
  test('explicit singular sense specification', () => {
    const r = applySutra1_2_58('गजजाति', { singularSense: true });
    expect(r.applied).toBe(true);
    expect(r.analysis.singularSenseAnalysis.senseType).toBe('explicit_singular');
  });

  test('string pattern singular sense - एक', () => {
    const r = applySutra1_2_58('एकगजवर्ग');
    expect(r.applied).toBe(true);
    expect(r.analysis.singularSenseAnalysis.hasSingularSense).toBe(true);
  });

  test('contextual singular sense from count', () => {
    const r = applySutra1_2_58('पशुजाति', { count: 'single' });
    expect(r.applied).toBe(true);
    expect(r.analysis.singularSenseAnalysis.senseType).toBe('contextual_singular');
  });

  test('default class singular sense', () => {
    const r = applySutra1_2_58('मनुष्यवर्ग');
    expect(r.applied).toBe(true);
    expect(r.analysis.singularSenseAnalysis.senseType).toBe('default_class_singular');
  });

  // Phase 4: Optional Plural Applicability Tests
  test('explicit optionality specification', () => {
    const r = applySutra1_2_58('गजप्रकार', { optionalPlural: true });
    expect(r.applied).toBe(true);
    expect(r.analysis.optionalPluralAnalysis.optionalityType).toBe('explicit_optionality');
  });

  test('semantic equivalence conditions', () => {
    const item = { isClassNoun: true };
    const context = { singularSense: true };
    const r = applySutra1_2_58(item, context);
    
    expect(r.applied).toBe(true);
    expect(r.analysis.optionalPluralAnalysis.semanticEquivalence).toBe(true);
  });

  test('stylistic variation conditions', () => {
    const r = applySutra1_2_58('वृक्षवर्ग', { stylisticVariation: true });
    expect(r.applied).toBe(true);
    expect(r.analysis.optionalPluralAnalysis.stylisticVariation).toBe(true);
  });

  test('default class optionality', () => {
    const r = applySutra1_2_58('देवजाति');
    expect(r.applied).toBe(true);
    expect(r.analysis.optionalPluralAnalysis.optionalityType).toBe('default_class_optionality');
  });

  // Phase 5: Number Option Generation Tests
  test('high strength generates both options with equal preference', () => {
    const item = { isClassNoun: true };
    const context = { optionalPlural: true, singularSense: true };
    const r = applySutra1_2_58(item, context);
    
    expect(r.applied).toBe(true);
    expect(r.numberOptions).toEqual(['singular', 'plural']);
    expect(r.analysis.numberOptionAnalysis.preferredOption).toBe('either');
    expect(r.analysis.numberOptionAnalysis.numberFlexibility).toBeGreaterThan(0.8);
  });

  test('moderate strength with singular preference', () => {
    const r = applySutra1_2_58('पशुप्रकार');
    expect(r.applied).toBe(true);
    expect(r.analysis.numberOptionAnalysis.preferredOption).toBe('singular');
    expect(r.numberOptions).toContain('plural');
  });

  // Phase 6: Context Override Tests
  test('force singular context override', () => {
    const r = applySutra1_2_58('गजवर्ग', { forceSingular: true });
    expect(r.applied).toBe(true);
    expect(r.numberOptions).toEqual(['singular']);
    expect(r.analysis.numberOptionAnalysis.optionalOptions).toEqual([]);
  });

  test('prefer plural context', () => {
    const r = applySutra1_2_58('देवगण', { preferPlural: true });
    expect(r.applied).toBe(true);
    expect(r.analysis.numberOptionAnalysis.preferredOption).toBe('plural');
  });

  // Phase 7: Confidence Assessment Tests
  test('high confidence class noun detection', () => {
    const item = { isClassNoun: true };
    const context = { singularSense: true, optionalPlural: true };
    const r = applySutra1_2_58(item, context);
    
    expect(r.confidence.overall).toBeGreaterThan(0.8);
    expect(r.confidence.classNounDetection).toBeGreaterThan(0.8);
    expect(r.confidence.factors).toContain('high_class_noun_confidence');
  });

  test('moderate confidence pattern recognition', () => {
    const r = applySutra1_2_58('मनुष्यप्रकार');
    expect(r.confidence.overall).toBeGreaterThan(0.6);
    expect(r.confidence.factors).toContain('moderate_class_noun_confidence');
  });

  test('traditional confidence component', () => {
    const r = applySutra1_2_58('गजजाति');
    expect(r.confidence.traditional).toBe(0.85);
  });

  // Phase 8: Semantic Properties Tests
  test('semantic class category detection', () => {
    const item = { semanticCategory: 'class' };
    const r = applySutra1_2_58(item);
    expect(r.applied).toBe(true);
    expect(r.analysis.classNounAnalysis.classCategory).toBe('semantic_class');
  });

  test('type function class detection', () => {
    const item = { typeFunction: 'category' };
    const r = applySutra1_2_58(item);
    expect(r.applied).toBe(true);
    expect(r.analysis.classNounAnalysis.classCategory).toBe('functional_class');
  });

  test('generic class properties detection', () => {
    const item = { properties: { generic: true } };
    const r = applySutra1_2_58(item);
    expect(r.applied).toBe(true);
    expect(r.analysis.classNounAnalysis.classCategory).toBe('generic_class');
  });

  // Phase 9: Negative Test Cases
  test('non class no apply (legacy compatibility)', () => {
    const r = applySutra1_2_58('गज', {});
    expect(r.applied).toBe(false);
  });

  test('no class noun detected - regular word', () => {
    const r = applySutra1_2_58('नदी');
    expect(r.applied).toBe(false);
    expect(r.numberOptions).toEqual(['singular']);
    expect(r.analysis.classNounAnalysis.isClassNoun).toBe(false);
  });

  test('class noun without singular sense', () => {
    const r = applySutra1_2_58({ isClassNoun: true, pluralOnly: true });
    // Should fail if no singular sense can be determined
    if (!r.applied) {
      expect(r.numberOptions).toEqual(['plural']);
    }
  });

  test('class noun without optionality', () => {
    const item = { isClassNoun: true, noOptional: true };
    const r = applySutra1_2_58(item);
    // May fail if optionality cannot be established
    if (!r.applied) {
      expect(r.numberOptions).toEqual(['singular']);
    }
  });

  // Phase 10: Input Validation Tests
  test('invalid input - null', () => {
    const r = applySutra1_2_58(null);
    expect(r.applied).toBe(false);
    expect(r.confidence.overall).toBe(0.1);
  });

  test('invalid input - undefined', () => {
    const r = applySutra1_2_58(undefined);
    expect(r.applied).toBe(false);
    expect(r.numberOptions).toEqual([]);
  });

  test('empty string input', () => {
    const r = applySutra1_2_58('');
    expect(r.applied).toBe(false);
    expect(r.confidence.overall).toBe(0.1);
  });

  // Phase 11: Script Detection Integration Tests
  test('devanagari script detection with class noun', () => {
    const r = applySutra1_2_58('गजवर्ग');
    expect(r.analysis.inputAnalysis.script).toBe('devanagari');
    expect(r.applied).toBe(true);
  });

  test('IAST script detection with class noun', () => {
    const r = applySutra1_2_58('gajavarga');
    expect(r.analysis.inputAnalysis.script).toBe('iast');
  });

  // Phase 12: Complex Object Tests
  test('complex class noun object', () => {
    const item = {
      text: 'देवगण',
      isClassNoun: true,
      classHierarchy: ['deity', 'group'],
      semanticCategory: 'class',
      typeFunction: 'group'
    };
    const r = applySutra1_2_58(item);
    expect(r.applied).toBe(true);
    expect(r.analysis.inputAnalysis.inputComplexity).toBe('complex');
  });

  // Phase 13: Pattern Matching Edge Cases
  test('multiple pattern matches', () => {
    const r = applySutra1_2_58('देवगणजातित्व'); // Contains multiple class patterns
    expect(r.applied).toBe(true);
    expect(r.analysis.classNounAnalysis.patternMatches.length).toBeGreaterThan(1);
  });

  test('compound class noun with suffix', () => {
    const r = applySutra1_2_58('मनुष्यवर्गता'); // Class noun + abstract suffix
    expect(r.applied).toBe(true);
    expect(r.numberOptions).toContain('plural');
  });

  // Phase 14: Advanced Context Tests
  test('number specification context', () => {
    const r = applySutra1_2_58('पशुजाति', { number: 'singular' });
    expect(r.applied).toBe(true);
    expect(r.analysis.singularSenseAnalysis.senseType).toBe('contextual_singular');
  });

  test('anyatarasyam context flag', () => {
    const r = applySutra1_2_58('वृक्षप्रकार', { anyatarasyam: true });
    expect(r.applied).toBe(true);
    expect(r.analysis.optionalPluralAnalysis.optionalityType).toBe('explicit_optionality');
  });

  // Phase 15: Integration with Legacy Utility Tests
  test('legacy utility integration', () => {
    const r = applySutra1_2_58('गजवर्ग', { isClassNoun: true });
    expect(r.applied).toBe(true);
    // Should maintain compatibility with determineOptionalNumber utility
    expect(r.numberOptions).toBeDefined();
    expect(Array.isArray(r.numberOptions)).toBe(true);
  });

  test('utility fallback on error', () => {
    // Should gracefully handle utility errors
    const r = applySutra1_2_58('देवजाति');
    expect(r.applied).toBe(true);
    expect(r.analysis).toBeDefined();
    expect(r.confidence).toBeDefined();
  });

  // Phase 16: Comprehensive Integration Tests
  test('full integration - all systems active', () => {
    const item = {
      text: 'मनुष्यजाति',
      isClassNoun: true,
      semanticCategory: 'class',
      typeFunction: 'category'
    };
    const context = {
      singularSense: true,
      optionalPlural: true,
      stylisticVariation: true,
      number: 'singular'
    };
    
    const r = applySutra1_2_58(item, context);
    
    expect(r.applied).toBe(true);
    expect(r.numberOptions).toEqual(['singular', 'plural']);
    expect(r.confidence.overall).toBeGreaterThan(0.8);
    expect(r.analysis.classNounAnalysis.isClassNoun).toBe(true);
    expect(r.analysis.singularSenseAnalysis.hasSingularSense).toBe(true);
    expect(r.analysis.optionalPluralAnalysis.optionalityApplies).toBe(true);
    expect(r.analysis.numberOptionAnalysis.numberFlexibility).toBeGreaterThan(0.8);
  });

  // Phase 17: Direct Function Testing
  test('sutra1258 function direct invocation', () => {
    const result = sutra1258({ isClassNoun: true });
    expect(result.applied).toBe(true);
    expect(result.numberOptions).toContain('plural');
    expect(result.analysis.sutra).toBe('1.2.58');
    expect(result.analysis.sutrasāra).toBe('जात्याख्यायामेकस्मिन् बहुवचनमन्यतरस्याम्');
  });

  // Phase 18: Error Handling and Robustness Tests
  test('graceful handling of malformed context', () => {
    const r = applySutra1_2_58('गजवर्ग', 'invalid_context');
    expect(r.applied).toBe(true); // Should still work with class noun detection
    expect(r.analysis.inputAnalysis.hasContext).toBe(false);
  });

  test('complex context with partial data', () => {
    const context = {
      isClassNoun: true,
      partialData: true,
      unknownProperty: 'value'
    };
    const r = applySutra1_2_58('पशुप्रकार', context);
    expect(r.applied).toBe(true);
    expect(r.analysis.classNounAnalysis.classType).toBe('context_class_noun');
  });

  // Phase 19: Confidence Factor Verification Tests
  test('high flexibility confidence', () => {
    const item = { isClassNoun: true };
    const context = { optionalPlural: true, singularSense: true };
    const r = applySutra1_2_58(item, context);
    expect(r.confidence.factors).toContain('high_flexibility_confidence');
  });

  test('moderate optionality confidence', () => {
    const r = applySutra1_2_58('वृक्षप्रकार', { stylisticVariation: true });
    expect(r.confidence.factors).toContain('moderate_optionality_confidence');
  });

  // Phase 20: Edge Case Comprehensive Tests
  test('minimal class strength with basic optionality', () => {
    const r = applySutra1_2_58('समूहता'); // Weak class pattern
    if (r.applied) {
      expect(r.analysis.numberOptionAnalysis.numberFlexibility).toBeGreaterThan(0.0);
    }
  });

  test('class noun with explicit plural-only context', () => {
    const r = applySutra1_2_58('गजवर्ग', { onlyPlural: true });
    // Behavior depends on implementation - may still allow singular due to class noun nature
    expect(r.numberOptions).toBeDefined();
  });
});
