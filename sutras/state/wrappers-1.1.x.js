/**
 * Sutra 1.1.x State Wrappers (Pilot)
 *
 * Provides stateful wrapper functions for early definitional sutras 1.1.1 – 1.1.3 & 1.1.7
 * demonstrating the state-in/state-out pattern without changing existing exports.
 */

import { applySutra111, getAllVrddhiVowels } from '../1.1.1/index.js';
import { applySutra112, getAllGunaVowels } from '../1.1.2/index.js';
import { applySutra113, getGunaVrddhiScopeDetailed } from '../1.1.3/index.js';
import { applySutra114, getSutra114Diagnostics, getSutra114Metrics } from '../1.1.4/index.js';
import { applySutra115 } from '../1.1.5/index.js';
import { applySutra116 } from '../1.1.6/index.js';
import { applySutra117, getAllConsonants } from '../1.1.7/index.js';
import { addDefinitions, addFacts, addDiagnostics } from './state-core.js';

// 1.1.1 wrapper: record vrddhi set & first-vowel classification if applicable
export function apply111State(state) {
  const result = applySutra111(state.surface.slice(0, 2)); // crude single vowel probe
  const defs = { vrddhiVowels: getAllVrddhiVowels().iast };
  let next = addDefinitions(state, '1.1.1', defs);
  next = addFacts(next, '1.1.1', { hasVrddhiInitial: result.isVrddhi });
  next = addDiagnostics(next, '1.1.1', result);
  return next;
}

// 1.1.2 wrapper
export function apply112State(state) {
  const result = applySutra112(state.surface.slice(0, 1));
  const defs = { gunaVowels: getAllGunaVowels().iast };
  let next = addDefinitions(state, '1.1.2', defs);
  next = addFacts(next, '1.1.2', { hasGunaInitial: result.isGuna });
  next = addDiagnostics(next, '1.1.2', result);
  return next;
}

// 1.1.3 wrapper - compute scope across the surface
export function apply113State(state) {
  const result = applySutra113(state.surface);
  const scope = getGunaVrddhiScopeDetailed(state.surface);
  let next = addFacts(state, '1.1.3', { ikVowelCount: scope.ikVowelCount, transformableCount: scope.transformableCount });
  next = addDiagnostics(next, '1.1.3', result);
  return next;
}

// 1.1.4 wrapper - dhātu-lopa analysis with rich diagnostic data
export function apply114State(state, dhatu, affix, operation = 'guna') {
  const result = applySutra114(dhatu, affix, operation);
  
  // Extract comprehensive facts from 1.1.4's rich analysis
  const facts = {
    shouldBlockGunaVrddhi: result.shouldBlock || false,
    dhatuLopaOccurs: result.causesDhatuLopa || false,
    isArdhadhatikaAffix: result.isArdhadhatuka || false,
    confidence: result.confidence || 0,
    lopaEligible: result.morphologicalAnalysis?.affixType === 'kṛt',
    syllableCount: result.phonologicalAnalysis?.syllableCount || 0
  };
  
  // Add penalty rule information if available
  if (result.reasoning && result.reasoning.includes('penalty')) {
    facts.penaltyApplied = true;
  }
  
  let next = addFacts(state, '1.1.4', facts);
  
  // Capture full diagnostic payload from 1.1.4's internal diagnostics
  const diagnostics = getSutra114Diagnostics();
  const metrics = getSutra114Metrics();
  
  next = addDiagnostics(next, '1.1.4', {
    primaryResult: result,
    internalDiagnostics: diagnostics,
    metrics: metrics,
    dhatu,
    affix,
    operation
  });
  
  return next;
}

// 1.1.5 wrapper - it-marker analysis
export function apply115State(state, dhatu, affix, operation = 'guna') {
  const result = applySutra115(dhatu, affix, operation);
  
  const facts = {
    hasItMarkers: result.hasItMarkers || false,
    blocksGunaVrddhi: result.blocksGunaVrddhi || false,
    itMarkerType: result.itMarkerType || null,
    affixClassification: result.affixClassification || 'unknown'
  };
  
  let next = addFacts(state, '1.1.5', facts);
  next = addDiagnostics(next, '1.1.5', { primaryResult: result, dhatu, affix, operation });
  return next;
}

// 1.1.6 wrapper - precedence analysis
export function apply116State(state, elements = null, context = 'general') {
  // If no elements provided, use current surface as single element
  const analysisElements = elements || [state.surface];
  const result = applySutra116(analysisElements, context);
  
  const facts = {
    precedenceContext: context,
    elementCount: analysisElements.length,
    hasPrecedence: result.analysis?.isValid || false,
    precedenceType: context
  };
  
  if (result.analysis?.precedent) {
    facts.precedentElement = result.analysis.precedent;
  }
  
  let next = addFacts(state, '1.1.6', facts);
  next = addDiagnostics(next, '1.1.6', { primaryResult: result, elements: analysisElements, context });
  return next;
}

// 1.1.7 wrapper - final consonant classification
export function apply117State(state) {
  const result = applySutra117(state.surface);
  const cons = getAllConsonants();
  let next = addDefinitions(state, '1.1.7', { consonantInventory: cons.iast });
  const analysis = result.analysis?.type === 'single-word' ? result.analysis : null;
  if (analysis) {
    next = addFacts(next, '1.1.7', { endsWithConsonant: analysis.isConsonant || false });
  }
  next = addDiagnostics(next, '1.1.7', result);
  return next;
}

// Convenience small pipeline for early definitional sutras
export function applyDefinitionalPipeline(state) {
  return [apply111State, apply112State, apply113State, apply117State].reduce((s, f) => f(s), state);
}

// Full pipeline including morphological analysis
export function applyCompletePipeline(state, dhatu, affix, operation = 'guna', elements = null, precedenceContext = 'general') {
  let next = applyDefinitionalPipeline(state);
  next = apply114State(next, dhatu, affix, operation);
  next = apply115State(next, dhatu, affix, operation);
  next = apply116State(next, elements, precedenceContext);
  return next;
}

// Specialized pipelines for different use cases
export function applyMorphologicalPipeline(state, dhatu, affix, operation = 'guna') {
  // Focus on morphological rules: 1.1.4 (dhātu-lopa) and 1.1.5 (it-markers)
  let next = apply114State(state, dhatu, affix, operation);
  next = apply115State(next, dhatu, affix, operation);
  return next;
}

export function applyPhonologicalPipeline(state) {
  // Focus on phonological classification: 1.1.1, 1.1.2, 1.1.3, 1.1.7
  return applyDefinitionalPipeline(state);
}
