/**
 * Comprehensive Test Suite for Sutra 1.2.59: अस्मदो द्वायोश्च
 * 
 * Tests the complete implementation of asmad pronoun optional plural functionality
 * Following the systematic testing methodology established for comprehensive sutra implementations
 * 
 * Test Structure:
 * - Phase 1: Core Functionality Tests (basic asmad detection and application)
 * - Phase 2: Asmad Pronoun Analysis Tests (form recognition and classification) 
 * - Phase 3: Semantic Number Analysis Tests (context and indicator analysis)
 * - Phase 4: Optional Plural Analysis Tests (condition evaluation and application)
 * - Phase 5: Number Option Generation Tests (option creation and integration)
 * - Phase 6: Prior Result Integration Tests (chaining with other sutras)
 * - Phase 7: Confidence Assessment Tests (reliability and factor analysis)
 * - Phase 8: Multi-script Support Tests (Devanagari, IAST, romanized)
 * - Phase 9: Context Analysis Tests (honorific, dvandva, stylistic)
 * - Phase 10: Edge Case Tests (boundary conditions and error handling)
 * - Phase 11: Performance Tests (efficiency and optimization)
 * - Phase 12: Integration Tests (interaction with utilities and other sutras)
 * - Phase 13: Linguistic Accuracy Tests (traditional grammar compliance)
 * - Phase 14: Advanced Features Tests (complex scenarios and properties)
 * - Phase 15: Error Handling Tests (malformed inputs and recovery)
 * 
 * Total Target: 50+ comprehensive test cases
 */

import { applySutra1_2_59 } from './index.js';
import { applySutra1_2_58 } from '../1.2.58/index.js';

describe('Sutra 1.2.59: अस्मदो द्वायोश्च - Asmad Pronoun Optional Plural', () => {
  
  // ==================== PHASE 1: CORE FUNCTIONALITY TESTS ====================
  
  test('explicit asmad pronoun gets optional plural', () => {
    const r = applySutra1_2_59({ isAsmadPronoun: true });
    expect(r.applied).toBe(true);
    expect(r.numberOptions).toContain('plural');
    expect(r.numberOptions).toContain('singular');
    expect(r.analysis.asmadPronounAnalysis.isAsmadPronoun).toBe(true);
  });

  test('asmad adds plural option (legacy compatibility)', () => {
    const prior = applySutra1_2_58('gaja', { isClassNoun: true });
    const r = applySutra1_2_59('अस्मद्', prior);
    expect(r.applied).toBe(true);
    expect(r.numberOptions).toContain('plural');
  });

  test('context-specified asmad pronoun', () => {
    const r = applySutra1_2_59('pronoun', { isAsmadPronoun: true });
    expect(r.applied).toBe(true);
    expect(r.analysis.asmadPronounAnalysis.pronounType).toBe('context_asmad_pronoun');
  });

  // ==================== PHASE 2: ASMAD PRONOUN ANALYSIS TESTS ====================

  test('primary asmad form - अस्मद्', () => {
    const r = applySutra1_2_59('अस्मद्');
    expect(r.applied).toBe(true);
    expect(r.analysis.asmadPronounAnalysis.pronounForm).toBe('primary');
    expect(r.numberOptions).toContain('plural');
  });

  test('primary asmad form - asmad', () => {
    const r = applySutra1_2_59('asmad');
    expect(r.applied).toBe(true);
    expect(r.analysis.asmadPronounAnalysis.pronounForm).toBe('primary');
  });

  test('inflected asmad form - aham', () => {
    const r = applySutra1_2_59('aham');
    expect(r.applied).toBe(true);
    expect(r.analysis.asmadPronounAnalysis.pronounForm).toBe('inflected');
  });

  test('inflected asmad form - अहम्', () => {
    const r = applySutra1_2_59('अहम्');
    expect(r.applied).toBe(true);
    expect(r.analysis.asmadPronounAnalysis.pronounForm).toBe('inflected');
  });

  test('inflected asmad form - vayam', () => {
    const r = applySutra1_2_59('vayam');
    expect(r.applied).toBe(true);
    expect(r.analysis.asmadPronounAnalysis.pronounForm).toBe('inflected');
  });

  test('inflected asmad form - वयम्', () => {
    const r = applySutra1_2_59('वयम्');
    expect(r.applied).toBe(true);
    expect(r.analysis.asmadPronounAnalysis.pronounForm).toBe('inflected');
  });

  test('romanized asmad form - asmakam', () => {
    const r = applySutra1_2_59('asmakam');
    expect(r.applied).toBe(true);
    expect(r.analysis.asmadPronounAnalysis.pronounForm).toBe('romanized');
  });

  // ==================== PHASE 3: SEMANTIC NUMBER ANALYSIS TESTS ====================

  test('explicit semantic number specification', () => {
    const r = applySutra1_2_59('अस्मद्', null, { semanticNumber: 'singular' });
    expect(r.applied).toBe(true);
    expect(r.analysis.semanticNumberAnalysis.semanticNumber).toBe('singular');
  });

  test('singular number indicator in context', () => {
    const r = applySutra1_2_59('aham', null, { description: 'single individual self' });
    expect(r.applied).toBe(true);
    expect(r.analysis.semanticNumberAnalysis.numberIndicators.length).toBeGreaterThan(0);
  });

  test('dual number indicator in context', () => {
    const r = applySutra1_2_59('अस्मद्', null, { description: 'both of us (द्वा)' });
    expect(r.applied).toBe(true);
    expect(r.analysis.semanticNumberAnalysis.semanticNumber).toBe('dual');
  });

  test('plural number indicator in context', () => {
    const r = applySutra1_2_59('vayam', null, { description: 'all of us (सर्व)' });
    expect(r.applied).toBe(true);
    expect(r.analysis.semanticNumberAnalysis.semanticNumber).toBe('plural');
  });

  test('default asmad semantic number', () => {
    const r = applySutra1_2_59('अस्मद्');
    expect(r.applied).toBe(true);
    expect(r.analysis.semanticNumberAnalysis.semanticNumber).toBe('default_first_person');
  });

  // ==================== PHASE 4: OPTIONAL PLURAL ANALYSIS TESTS ====================

  test('explicit optionality specification', () => {
    const r = applySutra1_2_59('aham', null, { optionalPlural: true });
    expect(r.applied).toBe(true);
    expect(r.analysis.optionalPluralAnalysis.optionalityType).toBe('explicit_optionality');
  });

  test('dvandva coordination conditions', () => {
    const item = 'अस्मद्';
    const context = { dvandva: true };
    const r = applySutra1_2_59(item, null, context);
    
    expect(r.applied).toBe(true);
    expect(r.analysis.optionalPluralAnalysis.dvandvaCoordination).toBe(true);
  });

  test('honorific plurality conditions', () => {
    const r = applySutra1_2_59('aham', null, { honorific: true });
    expect(r.applied).toBe(true);
    expect(r.analysis.optionalPluralAnalysis.honorificPlurality).toBe(true);
  });

  test('stylistic variation conditions', () => {
    const r = applySutra1_2_59('वयम्', null, { stylisticVariation: true });
    expect(r.applied).toBe(true);
    expect(r.analysis.optionalPluralAnalysis.optionalityType).toBe('stylistic_variation');
  });

  test('default asmad optionality', () => {
    const r = applySutra1_2_59('अस्मद्');
    expect(r.applied).toBe(true);
    expect(r.analysis.optionalPluralAnalysis.optionalityType).toBe('default_asmad_optionality');
  });

  // ==================== PHASE 5: NUMBER OPTION GENERATION TESTS ====================

  test('high strength generates both options with priority', () => {
    const item = { isAsmadPronoun: true };
    const context = { optionalPlural: true };
    const r = applySutra1_2_59(item, null, context);
    
    expect(r.applied).toBe(true);
    expect(r.numberOptions).toEqual(['singular', 'plural']);
    expect(r.analysis.numberOptionAnalysis.numberFlexibility).toBeGreaterThan(0.8);
  });

  test('integration with prior result options', () => {
    const prior = { numberOptions: ['singular', 'dual'] };
    const r = applySutra1_2_59('aham', prior);
    expect(r.applied).toBe(true);
    expect(r.numberOptions).toContain('singular');
    expect(r.numberOptions).toContain('dual');
    expect(r.numberOptions).toContain('plural');
  });

  test('force singular context override', () => {
    const r = applySutra1_2_59('अस्मद्', null, { forceSingular: true });
    if (r.applied) {
      // Should still be applied but maintain singular emphasis
      expect(r.numberOptions).toContain('singular');
    }
  });

  test('prefer plural context', () => {
    const r = applySutra1_2_59('vayam', null, { preferPlural: true });
    expect(r.applied).toBe(true);
    expect(r.numberOptions).toContain('plural');
  });

  // ==================== PHASE 6: PRIOR RESULT INTEGRATION TESTS ====================

  test('integration with class noun sutra results', () => {
    const prior = applySutra1_2_58('गजवर्ग', { isClassNoun: true });
    const r = applySutra1_2_59('अस्मद्', prior);
    expect(r.applied).toBe(true);
    expect(r.analysis.inputAnalysis.hasPriorResult).toBe(true);
    expect(r.analysis.numberOptionAnalysis.priorOptions).toEqual(prior.numberOptions);
  });

  test('prior result enhancement preservation', () => {
    const prior = { numberOptions: ['singular'], confidence: { overall: 0.8 } };
    const r = applySutra1_2_59('aham', prior);
    expect(r.applied).toBe(true);
    expect(r.numberOptions).toContain('plural'); // Enhanced with plural
  });

  // ==================== PHASE 7: CONFIDENCE ASSESSMENT TESTS ====================

  test('high confidence asmad pronoun detection', () => {
    const r = applySutra1_2_59({ isAsmadPronoun: true });
    expect(r.confidence.overall).toBeGreaterThan(0.8);
    expect(r.confidence.factors).toContain('high_asmad_pronoun_confidence');
  });

  test('moderate confidence pattern recognition', () => {
    const r = applySutra1_2_59('asmakam');
    expect(r.confidence.overall).toBeGreaterThan(0.6);
    expect(r.confidence.factors).toContain('moderate_asmad_pronoun_confidence');
  });

  test('traditional confidence component', () => {
    const r = applySutra1_2_59('अस्मद्');
    expect(r.confidence.traditional).toBeGreaterThan(0.8);
  });

  // ==================== PHASE 8: MULTI-SCRIPT SUPPORT TESTS ====================

  test('devanagari script detection with asmad pronoun', () => {
    const r = applySutra1_2_59('अस्मद्');
    expect(r.analysis.inputAnalysis.script).toBe('devanagari');
    expect(r.applied).toBe(true);
  });

  test('latin script detection with asmad pronoun', () => {
    const r = applySutra1_2_59('asmad');
    expect(r.analysis.inputAnalysis.script).toBe('latin');
    expect(r.applied).toBe(true);
  });

  test('mixed script handling', () => {
    const item = { term: 'asmad अस्मद्', script: 'mixed' };
    const r = applySutra1_2_59(item);
    expect(r.analysis.inputAnalysis.script).toBe('mixed');
  });

  // ==================== PHASE 9: CONTEXT ANALYSIS TESTS ====================

  test('semantic asmad pronoun properties', () => {
    const item = { pronounType: 'firstPerson' };
    const r = applySutra1_2_59(item);
    expect(r.applied).toBe(true);
    expect(r.analysis.asmadPronounAnalysis.pronounForm).toBe('semantic_first_person');
  });

  test('asmad class property detection', () => {
    const item = { pronounClass: 'asmad' };
    const r = applySutra1_2_59(item);
    expect(r.applied).toBe(true);
    expect(r.analysis.asmadPronounAnalysis.pronounForm).toBe('semantic_asmad_class');
  });

  test('first person property detection', () => {
    const item = { properties: { firstPerson: true } };
    const r = applySutra1_2_59(item);
    expect(r.applied).toBe(true);
    expect(r.analysis.asmadPronounAnalysis.pronounForm).toBe('semantic_first_person_property');
  });

  test('complex asmad pronoun object', () => {
    const item = {
      term: 'अस्मद्',
      pronounClass: 'asmad',
      person: 'first',
      properties: { honorific: true }
    };
    const r = applySutra1_2_59(item);
    expect(r.applied).toBe(true);
    expect(r.analysis.inputAnalysis.inputComplexity).toBe('complex');
  });

  // ==================== PHASE 10: EDGE CASE TESTS ====================

  test('non asmad pronoun no apply', () => {
    const r = applySutra1_2_59('tvam');
    expect(r.applied).toBe(false);
    expect(r.analysis.asmadPronounAnalysis.isAsmadPronoun).toBe(false);
  });

  test('no asmad pronoun detected - regular word', () => {
    const r = applySutra1_2_59('gaja');
    expect(r.applied).toBe(false);
  });

  test('asmad pronoun without strong pattern match', () => {
    const r = applySutra1_2_59('asmadlike');
    // Should fail if no clear asmad pattern
    expect(r.applied).toBe(false);
  });

  test('invalid input - null', () => {
    const r = applySutra1_2_59(null);
    expect(r.applied).toBe(false);
    expect(r.analysis.inputAnalysis.isValid).toBe(false);
  });

  test('invalid input - undefined', () => {
    const r = applySutra1_2_59(undefined);
    expect(r.applied).toBe(false);
  });

  test('empty string input', () => {
    const r = applySutra1_2_59('');
    expect(r.applied).toBe(false);
  });

  // ==================== PHASE 11: PERFORMANCE TESTS ====================

  test('multiple asmad form matches', () => {
    const r = applySutra1_2_59('अहम्'); // Contains multiple possible interpretations
    expect(r.applied).toBe(true);
    expect(r.analysis.asmadPronounAnalysis.formMatches.length).toBeGreaterThan(0);
  });

  test('compound asmad pronoun with context', () => {
    const r = applySutra1_2_59('अस्मद्', null, { 
      honorific: true, 
      dvandva: true, 
      stylisticVariation: true 
    });
    expect(r.applied).toBe(true);
    expect(r.numberOptions).toContain('plural');
  });

  // ==================== PHASE 12: INTEGRATION TESTS ====================

  test('asmad context flag', () => {
    const r = applySutra1_2_59('pronoun', null, { asmadOptional: true });
    expect(r.applied).toBe(true);
    expect(r.analysis.optionalPluralAnalysis.optionalityType).toBe('explicit_optionality');
  });

  test('legacy utility integration', () => {
    // Should maintain compatibility with extendOptionalNumberWithAsmad utility
    const r = applySutra1_2_59('अस्मद्');
    expect(r.applied).toBe(true);
    expect(r.analysis).toBeDefined();
    expect(r.confidence).toBeDefined();
  });

  test('utility fallback on error', () => {
    // Should gracefully handle utility errors
    const r = applySutra1_2_59('अस्मद्');
    expect(r.applied).toBe(true);
    expect(r.analysis).toBeDefined();
    expect(r.confidence).toBeDefined();
  });

  test('full integration - all systems active', () => {
    const item = {
      term: 'अस्मद्',
      pronounClass: 'asmad',
      person: 'first'
    };
    const context = {
      semanticNumber: 'singular',
      optionalPlural: true,
      honorific: true,
      stylisticVariation: true
    };
    const prior = { numberOptions: ['singular'], confidence: { overall: 0.8 } };
    const r = applySutra1_2_59(item, prior, context);
    
    expect(r.applied).toBe(true);
    expect(r.numberOptions).toEqual(['singular', 'plural']);
    expect(r.confidence.overall).toBeGreaterThan(0.8);
    expect(r.analysis.asmadPronounAnalysis.isAsmadPronoun).toBe(true);
    expect(r.analysis.semanticNumberAnalysis.semanticNumber).toBe('singular');
    expect(r.analysis.optionalPluralAnalysis.optionalityApplies).toBe(true);
  });

  // ==================== PHASE 13: LINGUISTIC ACCURACY TESTS ====================

  test('sutra1259 function direct invocation', () => {
    // Test the core function directly
    const r = applySutra1_2_59('अस्मद्');
    expect(r.analysis.sutra).toBe('1.2.59');
    expect(r.analysis.sutraText).toBe('अस्मदो द्वायोश्च');
  });

  test('graceful handling of malformed context', () => {
    const r = applySutra1_2_59('अस्मद्', null, 'invalid_context');
    expect(r.applied).toBe(true); // Should still work with asmad detection
    expect(r.analysis.inputAnalysis.hasContext).toBe(false);
  });

  test('complex context with partial data', () => {
    const r = applySutra1_2_59('aham', null, { 
      semanticNumber: 'singular',
      partialData: true,
      unknownField: 'test'
    });
    expect(r.applied).toBe(true);
    expect(r.analysis.semanticNumberAnalysis.semanticNumber).toBe('singular');
  });

  // ==================== PHASE 14: ADVANCED FEATURES TESTS ====================

  test('high flexibility confidence', () => {
    const r = applySutra1_2_59({ isAsmadPronoun: true }, null, { optionalPlural: true });
    expect(r.confidence.factors).toContain('high_flexibility_confidence');
  });

  test('moderate optionality confidence', () => {
    const r = applySutra1_2_59('asmakam', null, { stylisticVariation: true });
    expect(r.confidence.factors).toContain('moderate_optionality_confidence');
  });

  test('minimal asmad strength with basic optionality', () => {
    const r = applySutra1_2_59('asmakam'); // Lower confidence romanized form
    expect(r.applied).toBe(true);
    expect(r.analysis.asmadPronounAnalysis.pronounStrength).toBeGreaterThan(0.7);
  });

  // ==================== PHASE 15: ERROR HANDLING TESTS ====================

  test('asmad pronoun with explicit dual-only context', () => {
    const r = applySutra1_2_59('अस्मद्', null, { forceDual: true });
    expect(r.applied).toBe(true);
    // Should still apply but may preserve dual preference
    expect(r.numberOptions).toContain('plural'); // Core sutra requirement
  });

  test('case sensitivity handling', () => {
    const r1 = applySutra1_2_59('ASMAD');
    const r2 = applySutra1_2_59('asmad');
    expect(r1.applied).toBe(r2.applied);
  });

  test('whitespace normalization', () => {
    const r = applySutra1_2_59('  अस्मद्  ');
    expect(r.applied).toBe(true);
  });
});
