import { applySutra1_2_57, sutra1257 } from './index.js';

describe('Sutra 1.2.57: कालोपसर्जने च तुल्यम् - Temporal Auxiliary Equivalence Treatment', () => {
  
  // Phase 1: Core Temporal Auxiliary Tests
  test('explicit temporal auxiliary is preserved', () => {
    const r = applySutra1_2_57({ isTemporalAuxiliary: true });
    expect(r.nonElidable).toBe(true);
    expect(r.logicalPresence).toBe(true);
    expect(r.phoneticPresence).toBe(true);
    expect(r.analysis.temporalAuxiliaryAnalysis.hasTemporalAuxiliary).toBe(true);
  });

  test('temporal subordinate flagged (legacy compatibility)', () => {
    const r = applySutra1_2_57({ isTemporalSubordinate:true });
    expect(r.nonElidable).toBe(true);
  });

  test('context-specified temporal auxiliary', () => {
    const r = applySutra1_2_57('काल', { temporalAuxiliary: 'modifier' });
    expect(r.nonElidable).toBe(true);
    expect(r.analysis.temporalAuxiliaryAnalysis.auxiliaryType).toBe('context_temporal_auxiliary');
  });

  // Phase 2: String Pattern Recognition Tests
  test('absolute temporal auxiliary pattern - कदा', () => {
    const r = applySutra1_2_57('कदा');
    expect(r.nonElidable).toBe(true);
    expect(r.analysis.temporalAuxiliaryAnalysis.auxiliaryCategory).toBe('absolute');
  });

  test('relative temporal auxiliary pattern - यस्मिन्', () => {
    const r = applySutra1_2_57('यस्मिन्');
    expect(r.nonElidable).toBe(true);
    expect(r.analysis.temporalAuxiliaryAnalysis.auxiliaryCategory).toBe('relative');
  });

  test('conditional temporal auxiliary pattern - यदि', () => {
    const r = applySutra1_2_57('यदि');
    expect(r.nonElidable).toBe(true);
    expect(r.analysis.temporalAuxiliaryAnalysis.auxiliaryCategory).toBe('conditional');
  });

  test('sequential temporal auxiliary pattern - ततः', () => {
    const r = applySutra1_2_57('ततः');
    expect(r.nonElidable).toBe(true);
    expect(r.analysis.temporalAuxiliaryAnalysis.auxiliaryCategory).toBe('sequential');
  });

  test('durational temporal auxiliary pattern - यावत्', () => {
    const r = applySutra1_2_57('यावत्');
    expect(r.nonElidable).toBe(true);
    expect(r.analysis.temporalAuxiliaryAnalysis.auxiliaryCategory).toBe('durational');
  });

  test('frequency temporal auxiliary pattern - सकृत्', () => {
    const r = applySutra1_2_57('सकृत्');
    expect(r.nonElidable).toBe(true);
    expect(r.analysis.temporalAuxiliaryAnalysis.auxiliaryCategory).toBe('frequency');
  });

  // Phase 3: Equivalence Treatment Tests
  test('explicit equivalence treatment', () => {
    const r = applySutra1_2_57('कदा', { treatmentEquivalence: true });
    expect(r.nonElidable).toBe(true);
    expect(r.analysis.equivalenceAnalysis.equivalenceDetected).toBe(true);
    expect(r.analysis.equivalenceAnalysis.equivalenceType).toBe('explicit_equivalence');
  });

  test('तुल्य equivalence pattern detection', () => {
    const r = applySutra1_2_57('कालतुल्यम्');
    expect(r.nonElidable).toBe(true);
    expect(r.analysis.equivalenceAnalysis.equivalenceType).toBe('tulya_equivalence');
  });

  test('semantic equivalence properties', () => {
    const item = { 
      isTemporalAuxiliary: true,
      equivalenceType: 'temporal',
      sameTreatment: true
    };
    const r = applySutra1_2_57(item);
    expect(r.nonElidable).toBe(true);
    expect(r.analysis.equivalenceAnalysis.equivalenceDetected).toBe(true);
  });

  test('contextual equivalence with primary element', () => {
    const r = applySutra1_2_57('यदा', { primaryElementEquivalent: 'कदा' });
    expect(r.nonElidable).toBe(true);
    expect(r.analysis.equivalenceAnalysis.equivalenceType).toBe('contextual_equivalence');
  });

  // Phase 4: Temporal Context Analysis Tests
  test('explicit temporal relationship context', () => {
    const r = applySutra1_2_57('कदा', { temporalRelationship: 'simultaneous' });
    expect(r.nonElidable).toBe(true);
    expect(r.analysis.temporalContextAnalysis.temporalFramework).toBe('simultaneous');
  });

  test('temporal context coherence assessment', () => {
    const r = applySutra1_2_57('यदा', { temporalContext: true, equivalentTreatment: true });
    expect(r.nonElidable).toBe(true);
    expect(r.analysis.temporalContextAnalysis.contextualTemporality).toBe(true);
  });

  test('comprehensive temporal scope with absolute auxiliary', () => {
    const r = applySutra1_2_57('सदा');
    expect(r.nonElidable).toBe(true);
    expect(r.analysis.temporalContextAnalysis.temporalScope).toBe('comprehensive');
  });

  // Phase 5: High Strength Preservation Tests
  test('high temporal auxiliary with strong equivalence', () => {
    const item = { isTemporalAuxiliary: true, तुल्य: true };
    const context = { treatmentEquivalence: true, temporalContext: true };
    const r = applySutra1_2_57(item, context);
    
    expect(r.nonElidable).toBe(true);
    expect(r.analysis.nonElisionAnalysis.nonElisionRequired).toBe(true);
    expect(r.analysis.nonElisionAnalysis.elisionPrevention).toBe(true);
    expect(r.analysis.nonElisionAnalysis.auxiliaryPreservation).toBe(true);
  });

  test('moderate temporal auxiliary preservation', () => {
    const r = applySutra1_2_57('यावत्', { temporalContext: true });
    expect(r.nonElidable).toBe(true);
    expect(r.analysis.nonElisionAnalysis.nonElisionRequired).toBe(true);
    expect(r.analysis.nonElisionAnalysis.auxiliaryPreservation).toBe(true);
  });

  // Phase 6: Context Override Tests
  test('force auxiliary elision context override', () => {
    const r = applySutra1_2_57('कदा', { forceAuxiliaryElision: true });
    expect(r.logicalPresence).toBe(true);
    expect(r.phoneticPresence).toBe(false);
    expect(r.analysis.nonElisionAnalysis.elisionPrevention).toBe(false);
  });

  test('emphasis preservation context', () => {
    const r = applySutra1_2_57('तदा', { emphasisPreservation: true });
    expect(r.nonElidable).toBe(true);
    expect(r.logicalPresence).toBe(true);
    expect(r.analysis.nonElisionAnalysis.auxiliaryPreservation).toBe(true);
  });

  // Phase 7: Confidence Assessment Tests
  test('high confidence temporal auxiliary detection', () => {
    const item = { isTemporalAuxiliary: true };
    const context = { treatmentEquivalence: true, temporalRelationship: 'sequential' };
    const r = applySutra1_2_57(item, context);
    
    expect(r.confidence.overall).toBeGreaterThan(0.8);
    expect(r.confidence.temporalAuxiliaryDetection).toBeGreaterThan(0.8);
    expect(r.confidence.factors).toContain('high_temporal_auxiliary_confidence');
  });

  test('moderate confidence pattern recognition', () => {
    const r = applySutra1_2_57('ततः', { temporalContext: true });
    expect(r.confidence.overall).toBeGreaterThan(0.6);
    expect(r.confidence.factors).toContain('moderate_temporal_auxiliary_confidence');
  });

  // Phase 8: Implicit Equivalence Tests
  test('implicit equivalence from auxiliary and coherence strength', () => {
    const r = applySutra1_2_57('सदा', { temporalContext: true, equivalentTreatment: true });
    expect(r.nonElidable).toBe(true);
    expect(r.analysis.equivalenceAnalysis.equivalenceType).toBe('implicit_equivalence');
  });

  test('compound temporal auxiliary with काल', () => {
    const r = applySutra1_2_57('कालविशेष');
    expect(r.nonElidable).toBe(true);
    expect(r.analysis.temporalAuxiliaryAnalysis.auxiliaryCategory).toBe('compound');
  });

  // Phase 9: Semantic Properties Tests
  test('temporal role auxiliary semantic detection', () => {
    const item = { temporalRole: 'auxiliary' };
    const r = applySutra1_2_57(item);
    expect(r.nonElidable).toBe(true);
    expect(r.analysis.temporalAuxiliaryAnalysis.auxiliaryType).toBe('semantic_temporal_auxiliary');
  });

  test('time function auxiliary detection', () => {
    const item = { timeFunction: 'auxiliary' };
    const r = applySutra1_2_57(item);
    expect(r.nonElidable).toBe(true);
    expect(r.analysis.temporalAuxiliaryAnalysis.auxiliaryCategory).toBe('functional_temporal');
  });

  test('contextual temporal auxiliary indicators', () => {
    const item = { context: { temporal: true } };
    const r = applySutra1_2_57(item);
    expect(r.nonElidable).toBe(true);
    expect(r.analysis.temporalAuxiliaryAnalysis.auxiliaryCategory).toBe('contextual_temporal');
  });

  // Phase 10: Negative Test Cases
  test('no temporal auxiliary detected - regular word', () => {
    const r = applySutra1_2_57('गृहम्');
    expect(r.applied).toBe(false);
    expect(r.nonElidable).toBe(false);
    expect(r.analysis.temporalAuxiliaryAnalysis.hasTemporalAuxiliary).toBe(false);
  });

  test('insufficient temporal coherence', () => {
    const r = applySutra1_2_57({ randomProperty: true });
    expect(r.applied).toBe(false);
    expect(r.nonElidable).toBe(false);
  });

  test('no equivalence treatment required', () => {
    const r = applySutra1_2_57('अन्य'); // Word without temporal auxiliary patterns
    expect(r.applied).toBe(false);
    expect(r.analysis.equivalenceAnalysis.equivalenceDetected).toBe(false);
  });

  // Phase 11: Input Validation Tests
  test('invalid input - null', () => {
    const r = applySutra1_2_57(null);
    expect(r.applied).toBe(false);
    expect(r.confidence.overall).toBe(0.1);
  });

  test('invalid input - undefined', () => {
    const r = applySutra1_2_57(undefined);
    expect(r.applied).toBe(false);
    expect(r.analysis.inputAnalysis.isValid).toBe(false);
  });

  test('empty string input', () => {
    const r = applySutra1_2_57('');
    expect(r.applied).toBe(false);
    expect(r.confidence.overall).toBe(0.1);
  });

  // Phase 12: Script Detection Integration Tests
  test('devanagari script detection with temporal auxiliary', () => {
    const r = applySutra1_2_57('कदा');
    expect(r.analysis.inputAnalysis.script).toBe('devanagari');
    expect(r.nonElidable).toBe(true);
  });

  test('IAST script detection with temporal auxiliary', () => {
    const r = applySutra1_2_57('kadā');
    expect(r.analysis.inputAnalysis.script).toBe('iast');
  });

  // Phase 13: Complex Object Tests
  test('complex temporal auxiliary object', () => {
    const item = {
      text: 'यदा',
      isTemporalAuxiliary: true,
      temporalLayers: ['conditional', 'temporal'],
      auxiliaryType: 'temporal',
      sameTreatment: true
    };
    const r = applySutra1_2_57(item);
    expect(r.nonElidable).toBe(true);
    expect(r.analysis.inputAnalysis.inputComplexity).toBe('complex');
  });

  // Phase 14: Multi-layer Confidence Tests
  test('traditional confidence component', () => {
    const r = applySutra1_2_57('कदा');
    expect(r.confidence.traditional).toBe(0.85);
  });

  test('non-elision logic confidence', () => {
    const item = { isTemporalAuxiliary: true };
    const context = { treatmentEquivalence: true };
    const r = applySutra1_2_57(item, context);
    expect(r.confidence.nonElisionLogic).toBe(0.85);
    expect(r.confidence.factors).toContain('non_elision_logic_applied');
  });

  // Phase 15: Edge Case Comprehensive Tests
  test('minimal auxiliary strength with basic preservation', () => {
    const r = applySutra1_2_57('किञ्चित्काल'); // Compound with temporal element
    if (r.applied) {
      expect(r.analysis.nonElisionAnalysis.formPreservation).toBe(true);
    }
  });

  test('temporal auxiliary with multiple pattern matches', () => {
    const r = applySutra1_2_57('यदाततः'); // Compound containing multiple patterns
    if (r.applied) {
      expect(r.nonElidable).toBe(true);
    }
  });

  // Phase 16: Comprehensive Integration Tests
  test('full integration - all systems active', () => {
    const item = {
      text: 'सदा',
      isTemporalAuxiliary: true,
      temporalRole: 'auxiliary',
      equivalenceType: 'temporal',
      तुल्य: true
    };
    const context = {
      temporalRelationship: 'simultaneous',
      treatmentEquivalence: true,
      temporalContext: true,
      equivalentTreatment: true
    };
    
    const r = applySutra1_2_57(item, context);
    
    expect(r.applied).toBe(true);
    expect(r.nonElidable).toBe(true);
    expect(r.logicalPresence).toBe(true);
    expect(r.phoneticPresence).toBe(true);
    expect(r.confidence.overall).toBeGreaterThan(0.8);
    expect(r.analysis.temporalAuxiliaryAnalysis.hasTemporalAuxiliary).toBe(true);
    expect(r.analysis.equivalenceAnalysis.equivalenceDetected).toBe(true);
    expect(r.analysis.temporalContextAnalysis.contextualTemporality).toBe(true);
    expect(r.analysis.nonElisionAnalysis.nonElisionRequired).toBe(true);
  });

  // Phase 17: Legacy Function Direct Testing
  test('sutra1257 function direct invocation', () => {
    const result = sutra1257({ isTemporalAuxiliary: true });
    expect(result.applies).toBe(true);
    expect(result.nonElidable).toBe(true);
    expect(result.analysis.sutra).toBe('1.2.57');
    expect(result.analysis.sutrasāra).toBe('कालोपसर्जने च तुल्यम्');
  });

  // Phase 18: Error Handling and Robustness Tests
  test('graceful handling of malformed context', () => {
    const r = applySutra1_2_57('कदा', 'invalid_context');
    expect(r.applied).toBe(true); // Should still work with temporal auxiliary
    expect(r.analysis.inputAnalysis.hasContext).toBe(false);
  });

  test('complex context with partial data', () => {
    const context = {
      temporalRelationship: 'unknown',
      partialData: true
    };
    const r = applySutra1_2_57('यदा', context);
    expect(r.applied).toBe(true);
    expect(r.analysis.temporalContextAnalysis.temporalFramework).toBe('unknown');
  });
});
