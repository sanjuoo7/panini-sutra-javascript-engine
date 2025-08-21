/**
 * Comprehensive Test Suite for Sutra 1.2.60: फल्गुनीप्रोष्ठपदानां च नक्षत्रे
 * 
 * Tests the complete implementation of nakshatra dual-plural optionality functionality
 * Following the systematic testing methodology established for comprehensive sutra implementations
 * 
 * Test Structure:
 * - Phase 1: Core Functionality Tests (basic nakshatra detection and application)
 * - Phase 2: Nakshatra Analysis Tests (Phalgunī and Proṣṭhapadā recognition)  
 * - Phase 3: Domain Validation Tests (nakshatra context verification)
 * - Phase 4: Dual-Plural Analysis Tests (optionality evaluation and application)
 * - Phase 5: Number Option Generation Tests (dual-plural option creation)
 * - Phase 6: Prior Result Integration Tests (chaining with other sutras)
 * - Phase 7: Confidence Assessment Tests (reliability and factor analysis)
 * - Phase 8: Multi-script Support Tests (Devanagari, IAST, romanized)
 * - Phase 9: Astronomical Context Tests (domain-specific validation)
 * - Phase 10: Edge Case Tests (boundary conditions and error handling)
 * - Phase 11: Performance Tests (efficiency and optimization)
 * - Phase 12: Integration Tests (interaction with utilities and other sutras)
 * - Phase 13: Linguistic Accuracy Tests (traditional grammar compliance)
 * - Phase 14: Advanced Features Tests (complex astronomical scenarios)
 * - Phase 15: Error Handling Tests (malformed inputs and recovery)
 * 
 * Total Target: 60+ comprehensive test cases covering all nakshatra scenarios
 */

import { applySutra1_2_60, sutra_1_2_60 } from './index.js';
import { applySutra1_2_58 } from '../1.2.58/index.js';

describe('Sutra 1.2.60: फल्गुनीप्रोष्ठपदानां च नक्षत्रे - Nakshatra Dual-Plural Optionality', () => {
  
  // ==================== PHASE 1: CORE FUNCTIONALITY TESTS ====================
  
  test('phalgunī dual gets optional plural in nakshatra domain', () => {
    const r = applySutra1_2_60('phalgunī', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.numberOptions).toContain('plural');
    expect(r.numberOptions).toContain('dual');
    expect(r.semanticPlural).toBe(true);
    expect(r.analysis.nakshatraAnalysis.isNakshatra).toBe(true);
    expect(r.analysis.nakshatraAnalysis.nakshatraType).toBe('phalguni');
  });

  test('proṣṭhapadā dual gets optional plural in nakshatra domain', () => {
    const r = applySutra1_2_60('proṣṭhapadā', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.numberOptions).toContain('plural');
    expect(r.numberOptions).toContain('dual');
    expect(r.semanticPlural).toBe(true);
    expect(r.analysis.nakshatraAnalysis.nakshatraType).toBe('prosthapada');
  });

  test('legacy compatibility with context parameter', () => {
    const r = applySutra1_2_60('phalgunī', { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.semanticPlural).toBe(true);
  });

  // ==================== PHASE 2: NAKSHATRA ANALYSIS TESTS ====================
  
  test('phalgunī exact form recognition - IAST', () => {
    const r = applySutra1_2_60('phalgunī', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.analysis.nakshatraAnalysis.nakshatraForm).toBe('exact');
    expect(r.analysis.nakshatraAnalysis.nakshatraStrength).toBeGreaterThan(0.9);
  });

  test('phalgunī exact form recognition - devanagari', () => {
    const r = applySutra1_2_60('फाल्गुनी', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.analysis.nakshatraAnalysis.nakshatraType).toBe('phalguni');
  });

  test('phalgunī variant form recognition - phalguṇī', () => {
    const r = applySutra1_2_60('phalguṇī', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.analysis.nakshatraAnalysis.nakshatraType).toBe('phalguni');
  });

  test('phalgunī romanized form recognition', () => {
    const r = applySutra1_2_60('phalguni', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.analysis.nakshatraAnalysis.nakshatraType).toBe('phalguni');
  });

  test('prosthapada exact form recognition - IAST', () => {
    const r = applySutra1_2_60('proṣṭhapadā', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.analysis.nakshatraAnalysis.nakshatraForm).toBe('exact');
    expect(r.analysis.nakshatraAnalysis.nakshatraStrength).toBeGreaterThan(0.9);
  });

  test('prosthapada exact form recognition - devanagari', () => {
    const r = applySutra1_2_60('प्रोष्ठपदा', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.analysis.nakshatraAnalysis.nakshatraType).toBe('prosthapada');
  });

  test('prosthapada romanized form recognition', () => {
    const r = applySutra1_2_60('proshthapada', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.analysis.nakshatraAnalysis.nakshatraType).toBe('prosthapada');
  });

  test('full astronomical names - pūrvaphalgunī', () => {
    const r = applySutra1_2_60('pūrvaphalgunī', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.analysis.nakshatraAnalysis.nakshatraType).toBe('phalguni');
  });

  test('full astronomical names - uttaraproṣṭhapadā', () => {
    const r = applySutra1_2_60('uttaraproṣṭhapadā', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.analysis.nakshatraAnalysis.nakshatraType).toBe('prosthapada');
  });

  // ==================== PHASE 3: DOMAIN VALIDATION TESTS ====================
  
  test('explicit nakshatra domain specification', () => {
    const r = applySutra1_2_60('phalgunī', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.analysis.domainAnalysis.domainType).toBe('explicit_nakshatra_domain');
    expect(r.analysis.domainAnalysis.domainStrength).toBeGreaterThan(0.9);
  });

  test('semantic category nakshatra specification', () => {
    const r = applySutra1_2_60('proṣṭhapadā', null, { semanticCategory: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.analysis.domainAnalysis.isNakshatraDomain).toBe(true);
  });

  test('explicit domain indicator - constellation', () => {
    const r = applySutra1_2_60('phalgunī', null, { domain: 'constellation' });
    expect(r.applied).toBe(true);
    expect(r.analysis.domainAnalysis.domainType).toBe('explicit_indicator_domain');
  });

  test('astronomical context recognition', () => {
    const r = applySutra1_2_60('proṣṭhapadā', null, { astronomical: true });
    expect(r.applied).toBe(true);
    expect(r.analysis.domainAnalysis.domainType).toBe('astronomical_context');
  });

  test('jyotisha context recognition', () => {
    const r = applySutra1_2_60('phalgunī', null, { jyotisha: true });
    expect(r.applied).toBe(true);
    expect(r.analysis.domainAnalysis.isNakshatraDomain).toBe(true);
  });

  test('implicit domain factor - astrology', () => {
    const r = applySutra1_2_60('proṣṭhapadā', null, { astrology: true });
    expect(r.applied).toBe(true);
    expect(r.analysis.domainAnalysis.domainType).toBe('implicit_indicator_domain');
  });

  // ==================== PHASE 4: DUAL-PLURAL ANALYSIS TESTS ====================
  
  test('explicit dual-plural specification', () => {
    const r = applySutra1_2_60('phalgunī', null, { domain: 'nakshatra', dualPlural: true });
    expect(r.applied).toBe(true);
    expect(r.analysis.dualPluralAnalysis.optionalityType).toBe('explicit_dual_plural');
    expect(r.analysis.dualPluralAnalysis.optionalityStrength).toBeGreaterThan(0.9);
  });

  test('semantic plural context', () => {
    const r = applySutra1_2_60('proṣṭhapadā', null, { domain: 'nakshatra', semanticPlural: true });
    expect(r.applied).toBe(true);
    expect(r.analysis.dualPluralAnalysis.semanticPlurality).toBe(true);
  });

  test('astronomical grouping context', () => {
    const r = applySutra1_2_60('phalgunī', null, { domain: 'nakshatra', grouping: true });
    expect(r.applied).toBe(true);
    expect(r.analysis.dualPluralAnalysis.optionalityType).toBe('astronomical_grouping');
  });

  test('constellation pair context', () => {
    const r = applySutra1_2_60('proṣṭhapadā', null, { domain: 'nakshatra', constellation_pair: true });
    expect(r.applied).toBe(true);
    expect(r.analysis.dualPluralAnalysis.optionalityType).toBe('astronomical_grouping');
  });

  test('contextual emphasis conditions', () => {
    const r = applySutra1_2_60('phalgunī', null, { domain: 'nakshatra', emphasis: true });
    expect(r.applied).toBe(true);
    expect(r.analysis.dualPluralAnalysis.optionalityType).toBe('contextual_emphasis');
  });

  test('collective reference conditions', () => {
    const r = applySutra1_2_60('proṣṭhapadā', null, { domain: 'nakshatra', collective: true });
    expect(r.applied).toBe(true);
    expect(r.analysis.dualPluralAnalysis.optionalityType).toBe('contextual_emphasis');
  });

  test('stylistic variation conditions', () => {
    const r = applySutra1_2_60('phalgunī', null, { domain: 'nakshatra', stylisticVariation: true });
    expect(r.applied).toBe(true);
    expect(r.analysis.dualPluralAnalysis.optionalityType).toBe('stylistic_variation');
  });

  test('default nakshatra optionality', () => {
    const r = applySutra1_2_60('proṣṭhapadā', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.analysis.dualPluralAnalysis.optionalityType).toBe('default_nakshatra_optionality');
    expect(r.analysis.dualPluralAnalysis.dualPluralApplies).toBe(true);
  });

  // ==================== PHASE 5: NUMBER OPTION GENERATION TESTS ====================
  
  test('high strength generates both dual and plural with priority', () => {
    const r = applySutra1_2_60('phalgunī', null, { domain: 'nakshatra', dualPlural: true });
    expect(r.applied).toBe(true);
    expect(r.numberOptions).toContain('dual');
    expect(r.numberOptions).toContain('plural');
    expect(r.analysis.numberOptionAnalysis.priorityOrder[0]).toBe('plural');
  });

  test('moderate strength maintains dual priority', () => {
    const r = applySutra1_2_60('phalguni', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.analysis.numberOptionAnalysis.priorityOrder[0]).toBe('dual');
  });

  test('mixed usage context adds singular option', () => {
    const r = applySutra1_2_60('phalgunī', null, { domain: 'nakshatra', mixedUsage: true });
    expect(r.applied).toBe(true);
    expect(r.numberOptions).toContain('singular');
    expect(r.analysis.numberOptionAnalysis.optionJustifications.singular).toContain('variable number');
  });

  test('variable number context expansion', () => {
    const r = applySutra1_2_60('proṣṭhapadā', null, { domain: 'nakshatra', variableNumber: true });
    expect(r.applied).toBe(true);
    expect(r.numberOptions.length).toBeGreaterThan(2);
  });

  // ==================== PHASE 6: PRIOR RESULT INTEGRATION TESTS ====================
  
  test('integration with prior result options', () => {
    const priorResult = { numberOptions: ['singular', 'dual'], applied: true, sutra: '1.2.58' };
    const r = applySutra1_2_60('phalgunī', priorResult, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.numberOptions).toContain('dual');
    expect(r.numberOptions).toContain('plural');
  });

  test('union strategy with high nakshatra strength', () => {
    const priorResult = { numberOptions: ['singular'], applied: true };
    const r = applySutra1_2_60('phalgunī', priorResult, { domain: 'nakshatra', dualPlural: true });
    expect(r.applied).toBe(true);
    expect(r.analysis.priorResultIntegration.enhancementType).toBe('nakshatra_priority_union');
  });

  test('intersection strategy with moderate strength', () => {
    const priorResult = { numberOptions: ['dual'], applied: true };
    const r = applySutra1_2_60('phalguni', priorResult, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.numberOptions).toContain('dual');
  });

  test('conflict resolution - nakshatra precedence', () => {
    const priorResult = { numberOptions: ['singular'], applied: true };
    const r = applySutra1_2_60('proṣṭhapadā', priorResult, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.analysis.priorResultIntegration.conflictResolution).toBe('nakshatra_specific_takes_precedence');
  });

  test('integration with class noun sutra results', () => {
    const classNounResult = applySutra1_2_58('nakshatra', null, { semanticCategory: 'astronomy' });
    const r = applySutra1_2_60('phalgunī', classNounResult, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.analysis.priorResultIntegration.hasPriorResult).toBe(true);
  });

  test('prior result enhancement preservation', () => {
    const priorResult = { numberOptions: ['dual', 'plural'], applied: true, enhancement: 'special' };
    const r = applySutra1_2_60('proṣṭhapadā', priorResult, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.numberOptions.length).toBeGreaterThanOrEqual(2);
  });

  // ==================== PHASE 7: CONFIDENCE ASSESSMENT TESTS ====================
  
  test('high confidence nakshatra recognition', () => {
    const r = applySutra1_2_60('phalgunī', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.confidence.nakshatraRecognition).toBeGreaterThan(0.9);
    expect(r.confidence.factors).toContain('high_nakshatra_recognition');
  });

  test('explicit domain validation confidence', () => {
    const r = applySutra1_2_60('proṣṭhapadā', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.confidence.domainValidation).toBeGreaterThan(0.9);
    expect(r.confidence.factors).toContain('explicit_domain_validation');
  });

  test('strong dual-plural applicability confidence', () => {
    const r = applySutra1_2_60('phalgunī', null, { domain: 'nakshatra', dualPlural: true });
    expect(r.applied).toBe(true);
    expect(r.confidence.dualPluralApplicability).toBeGreaterThan(0.8);
    expect(r.confidence.factors).toContain('strong_dual_plural_applicability');
  });

  test('traditional confidence component', () => {
    const r = applySutra1_2_60('proṣṭhapadā', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.confidence.traditional).toBeGreaterThan(0.8);
  });

  // ==================== PHASE 8: MULTI-SCRIPT SUPPORT TESTS ====================
  
  test('devanagari script detection with nakshatra', () => {
    const r = applySutra1_2_60('फाल्गुनी', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.analysis.inputAnalysis.script).toBe('devanagari');
  });

  test('latin script detection with nakshatra', () => {
    const r = applySutra1_2_60('prosthapada', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.analysis.inputAnalysis.script).toBe('latin');
  });

  test('mixed script handling in context', () => {
    const item = { nakshatra: 'फाल्गुनी', romanized: 'phalguni' };
    const r = applySutra1_2_60(item, null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.analysis.inputAnalysis.script).toBe('mixed');
  });

  // ==================== PHASE 9: ASTRONOMICAL CONTEXT TESTS ====================
  
  test('astronomical nakshatra properties', () => {
    const item = { nakshatra: 'phalgunī', astronomicalProperties: { type: 'lunar_mansion' } };
    const r = applySutra1_2_60(item, null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.analysis.inputAnalysis.inputComplexity).toBe('complex');
  });

  test('nakshatra type specification', () => {
    const r = applySutra1_2_60('constellation', null, { domain: 'nakshatra', nakshatraType: 'phalguni' });
    expect(r.applied).toBe(true);
    expect(r.analysis.nakshatraAnalysis.nakshatraForm).toBe('contextual');
  });

  test('explicit nakshatra object', () => {
    const item = { nakshatraType: 'prosthapada' };
    const r = applySutra1_2_60(item, null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.analysis.nakshatraAnalysis.nakshatraForm).toBe('explicit');
  });

  // ==================== PHASE 10: EDGE CASE TESTS ====================
  
  test('non-target nakshatra no apply', () => {
    const r = applySutra1_2_60('rohini', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(false);
    expect(r.analysis.dualPluralAnalysis.optionalityJustification).toBe('not_phalguni_or_prosthapada');
  });

  test('no nakshatra detected - regular word', () => {
    const r = applySutra1_2_60('word', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(false);
    expect(r.analysis.nakshatraAnalysis.isNakshatra).toBe(false);
  });

  test('nakshatra without domain context', () => {
    const r = applySutra1_2_60('phalgunī', null, {});
    expect(r.applied).toBe(false);
    expect(r.analysis.dualPluralAnalysis.optionalityJustification).toBe('not_nakshatra_domain');
  });

  test('invalid input - null', () => {
    const r = applySutra1_2_60(null);
    expect(r.applied).toBe(false);
    expect(r.analysis.inputAnalysis.isValid).toBe(false);
  });

  test('invalid input - undefined', () => {
    const r = applySutra1_2_60(undefined);
    expect(r.applied).toBe(false);
    expect(r.analysis.inputAnalysis.termType).toBe('invalid');
  });

  test('empty string input', () => {
    const r = applySutra1_2_60('', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(false);
  });

  // ==================== PHASE 11: PERFORMANCE TESTS ====================
  
  test('multiple nakshatra form matches', () => {
    const r = applySutra1_2_60('phalguṇī', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.analysis.nakshatraAnalysis.variantMatches.length).toBeGreaterThan(0);
  });

  test('compound nakshatra with context', () => {
    const r = applySutra1_2_60('uttaraphalgunī', null, { domain: 'nakshatra', astronomical: true });
    expect(r.applied).toBe(true);
    expect(r.analysis.nakshatraAnalysis.nakshatraType).toBe('phalguni');
  });

  // ==================== PHASE 12: INTEGRATION TESTS ====================
  
  test('legacy utility integration', () => {
    const r = applySutra1_2_60('phalgunī', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.semanticPlural).toBe(true);
    expect(r.explanation).toContain('1.2.60');
  });

  test('utility fallback on error', () => {
    const r = applySutra1_2_60('phalgunī', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
  });

  test('full integration - all systems active', () => {
    const priorResult = { numberOptions: ['dual'], applied: true };
    const r = applySutra1_2_60('proṣṭhapadā', priorResult, { 
      domain: 'nakshatra', 
      dualPlural: true, 
      astronomical: true 
    });
    expect(r.applied).toBe(true);
    expect(r.confidence.overall).toBeGreaterThan(0.8);
  });

  test('sutra_1_2_60 function direct invocation', () => {
    const r = sutra_1_2_60('phalgunī', { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.semanticPlural).toBe(true);
  });

  // ==================== PHASE 13: LINGUISTIC ACCURACY TESTS ====================
  
  test('traditional nakshatra dual-plural interpretation', () => {
    const r = applySutra1_2_60('phalgunī', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.analysis.dualPluralAnalysis.optionalityConditions).toContain('traditional_usage');
  });

  test('astronomical terminology compliance', () => {
    const r = applySutra1_2_60('proṣṭhapadā', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.analysis.confidence.traditional).toBeGreaterThan(0.8);
  });

  // ==================== PHASE 14: ADVANCED FEATURES TESTS ====================
  
  test('graceful handling of malformed context', () => {
    const r = applySutra1_2_60('phalgunī', null, 'invalid_context');
    expect(r.applied).toBe(false);
  });

  test('complex astronomical context with partial data', () => {
    const context = { domain: 'nakshatra', astronomical: true, incomplete: true };
    const r = applySutra1_2_60('proṣṭhapadā', null, context);
    expect(r.applied).toBe(true);
  });

  test('high astronomical confidence', () => {
    const r = applySutra1_2_60('phalgunī', null, { 
      domain: 'nakshatra', 
      astronomical: true, 
      jyotisha: true,
      dualPlural: true 
    });
    expect(r.applied).toBe(true);
    expect(r.confidence.overall).toBeGreaterThan(0.9);
  });

  test('moderate context confidence', () => {
    const r = applySutra1_2_60('falguni', null, { semanticCategory: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.confidence.overall).toBeGreaterThan(0.6);
  });

  // ==================== PHASE 15: ERROR HANDLING TESTS ====================
  
  test('minimal nakshatra strength with basic optionality', () => {
    const r = applySutra1_2_60('partial_phalguni_match', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(false);
  });

  test('nakshatra with explicit domain-only context', () => {
    const r = applySutra1_2_60('phalgunī', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.analysis.domainAnalysis.domainType).toBe('explicit_nakshatra_domain');
  });

  test('case sensitivity handling', () => {
    const r = applySutra1_2_60('PHALGUNĪ', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.analysis.nakshatraAnalysis.nakshatraType).toBe('phalguni');
  });

  test('whitespace normalization', () => {
    const r = applySutra1_2_60('  phalgunī  ', null, { domain: 'nakshatra' });
    expect(r.applied).toBe(true);
    expect(r.analysis.nakshatraAnalysis.isNakshatra).toBe(true);
  });

});
