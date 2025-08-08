/**
 * State Pipeline Examples
 * 
 * Demonstrates usage of the integrated state pipeline across all sutras 1.1.1-1.1.7
 */

import { createInitialState, summarizeState } from './state-core.js';
import { 
  applyCompletePipeline, 
  applyMorphologicalPipeline,
  applyPhonologicalPipeline,
  apply114State,
  apply115State,
  apply116State
} from './wrappers-1.1.x.js';

// Example 1: Complete morphological analysis of gam + ya
function exampleGamYa() {
  console.log('=== Example 1: Complete Analysis of gam + ya ===');
  
  let state = createInitialState('gam');
  state = applyCompletePipeline(state, 'gam', 'ya', 'guna');
  
  console.log('Surface:', state.surface);
  console.log('Facts collected:', Object.keys(state.facts));
  console.log('Definitions established:', Object.keys(state.definitions));
  console.log('Should block guṇa/vṛddhi:', state.facts.shouldBlockGunaVrddhi);
  console.log('Has it-markers:', state.facts.hasItMarkers);
  console.log('Confidence score:', state.facts.confidence);
  
  const summary = summarizeState(state);
  console.log('Pipeline summary:', summary);
  console.log('');
}

// Example 2: Phonological classification only
function examplePhonologicalAnalysis() {
  console.log('=== Example 2: Phonological Analysis of "agni" ===');
  
  let state = createInitialState('agni');
  state = applyPhonologicalPipeline(state);
  
  console.log('Vṛddhi vowels defined:', state.definitions.vrddhiVowels);
  console.log('Guṇa vowels defined:', state.definitions.gunaVowels);
  console.log('Has vṛddhi initial:', state.facts.hasVrddhiInitial);
  console.log('Has guṇa initial:', state.facts.hasGunaInitial);
  console.log('Ik vowel count:', state.facts.ikVowelCount);
  console.log('Ends with consonant:', state.facts.endsWithConsonant);
  console.log('');
}

// Example 3: Morphological analysis focus
function exampleMorphologicalAnalysis() {
  console.log('=== Example 3: Morphological Analysis of vid + kta ===');
  
  let state = createInitialState('vid');
  state = applyMorphologicalPipeline(state, 'vid', 'kta', 'guna');
  
  console.log('Should block guṇa/vṛddhi:', state.facts.shouldBlockGunaVrddhi);
  console.log('Dhātu-lopa occurs:', state.facts.dhatuLopaOccurs);
  console.log('Is ārdhadhātuka affix:', state.facts.isArdhadhatikaAffix);
  console.log('Has it-markers:', state.facts.hasItMarkers);
  console.log('It-marker type:', state.facts.itMarkerType);
  console.log('');
}

// Example 4: Step-by-step analysis with individual wrappers
function exampleStepByStep() {
  console.log('=== Example 4: Step-by-step Analysis ===');
  
  let state = createInitialState('jan');
  console.log('Initial state:', summarizeState(state));
  
  // Apply 1.1.4 analysis
  state = apply114State(state, 'jan', 'ta', 'guna');
  console.log('After 1.1.4:', {
    shouldBlock: state.facts.shouldBlockGunaVrddhi,
    confidence: state.facts.confidence
  });
  
  // Apply 1.1.5 analysis
  state = apply115State(state, 'jan', 'ta', 'guna');
  console.log('After 1.1.5:', {
    hasItMarkers: state.facts.hasItMarkers,
    blocksGunaVrddhi: state.facts.blocksGunaVrddhi
  });
  
  // Apply 1.1.6 analysis for precedence
  state = apply116State(state, ['jan', 'ta'], 'morphology');
  console.log('After 1.1.6:', {
    precedenceContext: state.facts.precedenceContext,
    elementCount: state.facts.elementCount
  });
  
  console.log('Final summary:', summarizeState(state));
  console.log('');
}

// Example 5: Error handling and diagnostics
function exampleDiagnostics() {
  console.log('=== Example 5: Diagnostics and Error Handling ===');
  
  let state = createInitialState('unknown');
  state = applyCompletePipeline(state, 'unknown', 'xyz', 'guna');
  
  console.log('Diagnostics collected:');
  Object.keys(state.diagnostics).forEach(sutra => {
    console.log(`  ${sutra}:`, Object.keys(state.diagnostics[sutra]));
  });
  
  // Check for any errors or fallback usage in 1.1.4 diagnostics
  const sutra114Diag = state.diagnostics['1.1.4'];
  if (sutra114Diag?.internalDiagnostics?.length > 0) {
    console.log('1.1.4 internal diagnostics:', sutra114Diag.internalDiagnostics);
  }
  
  console.log('');
}

// Run all examples
if (import.meta.url === `file://${process.argv[1]}`) {
  exampleGamYa();
  examplePhonologicalAnalysis();
  exampleMorphologicalAnalysis();
  exampleStepByStep();
  exampleDiagnostics();
}

export {
  exampleGamYa,
  examplePhonologicalAnalysis,
  exampleMorphologicalAnalysis,
  exampleStepByStep,
  exampleDiagnostics
};
