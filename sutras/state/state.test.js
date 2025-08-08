import { createInitialState, summarizeState } from './state-core.js';
import { 
  applyDefinitionalPipeline, 
  applyCompletePipeline, 
  applyMorphologicalPipeline,
  applyPhonologicalPipeline,
  apply114State,
  apply115State,
  apply116State
} from './wrappers-1.1.x.js';

describe('State pipeline pilot', () => {
  test('applies definitional sutras and collects facts', () => {
    let state = createInitialState('agni');
    state = applyDefinitionalPipeline(state);
    expect(state.facts.hasVrddhiInitial).toBe(false);
    expect(state.facts.hasGunaInitial).toBe(true);
    expect(state.facts.ikVowelCount).toBeGreaterThanOrEqual(1);
    expect(state.definitions.vrddhiVowels.length).toBeGreaterThan(0);
    const summary = summarizeState(state);
    expect(summary.applied).toContain('1.1.1');
    expect(summary.applied).toContain('1.1.2');
  });

  test('applies complete pipeline with morphological analysis', () => {
    let state = createInitialState('gam');
    state = applyCompletePipeline(state, 'gam', 'ya', 'guna');
    
    // Check that all sutras were applied
    const summary = summarizeState(state);
    expect(summary.applied).toContain('1.1.1');
    expect(summary.applied).toContain('1.1.2');
    expect(summary.applied).toContain('1.1.3');
    expect(summary.applied).toContain('1.1.4');
    expect(summary.applied).toContain('1.1.5');
    expect(summary.applied).toContain('1.1.6');
    expect(summary.applied).toContain('1.1.7');
    
    // Check 1.1.4 facts
    expect(state.facts.shouldBlockGunaVrddhi).toBeDefined();
    expect(state.facts.confidence).toBeDefined();
    
    // Check 1.1.5 facts
    expect(state.facts.hasItMarkers).toBeDefined();
    expect(state.facts.blocksGunaVrddhi).toBeDefined();
    
    // Check 1.1.6 facts
    expect(state.facts.precedenceContext).toBe('general');
    
    // Check diagnostics for all sutras
    expect(state.diagnostics['1.1.4']).toBeDefined();
    expect(state.diagnostics['1.1.5']).toBeDefined();
    expect(state.diagnostics['1.1.6']).toBeDefined();
  });

  test('applies morphological pipeline only', () => {
    let state = createInitialState('vid');
    state = applyMorphologicalPipeline(state, 'vid', 'kta');
    
    const summary = summarizeState(state);
    expect(summary.applied).toContain('1.1.4');
    expect(summary.applied).toContain('1.1.5');
    expect(summary.applied).not.toContain('1.1.1'); // Should not include definitional sutras
    
    expect(state.facts.shouldBlockGunaVrddhi).toBeDefined();
    expect(state.facts.hasItMarkers).toBeDefined();
  });

  test('applies phonological pipeline only', () => {
    let state = createInitialState('agni');
    state = applyPhonologicalPipeline(state);
    
    const summary = summarizeState(state);
    expect(summary.applied).toContain('1.1.1');
    expect(summary.applied).toContain('1.1.2');
    expect(summary.applied).toContain('1.1.3');
    expect(summary.applied).toContain('1.1.7');
    expect(summary.applied).not.toContain('1.1.4'); // Should not include morphological sutras
    
    expect(state.definitions.vrddhiVowels).toBeDefined();
    expect(state.definitions.gunaVowels).toBeDefined();
  });

  test('individual sutra state wrappers work correctly', () => {
    let state = createInitialState('jan');
    
    // Test 1.1.4 wrapper
    state = apply114State(state, 'jan', 'ya', 'guna');
    expect(state.facts.shouldBlockGunaVrddhi).toBeDefined();
    expect(state.diagnostics['1.1.4'].dhatu).toBe('jan');
    expect(state.diagnostics['1.1.4'].affix).toBe('ya');
    
    // Test 1.1.5 wrapper
    state = apply115State(state, 'jan', 'kta', 'guna');
    expect(state.facts.hasItMarkers).toBeDefined();
    expect(state.diagnostics['1.1.5'].dhatu).toBe('jan');
    
    // Test 1.1.6 wrapper
    state = apply116State(state, ['first', 'second'], 'compound');
    expect(state.facts.precedenceContext).toBe('compound');
    expect(state.facts.elementCount).toBe(2);
  });
});
