/**
 * Panini Engine State Core
 *
 * Provides a canonical immutable-ish state object interface that individual sutras
 * can consume and produce. Sutra application functions should be pure: (state, options?) => newState
 * with no in-place mutation (except permitted metrics counters inside specialized modules like 1.1.4).
 *
 * Initial Scope (MVP):
 * - surface: current surface string (word/root under transformation)
 * - history: array of { sutra: '1.1.1', name, description, input, output, notes, timestamp }
 * - facts: lexical & phonological facts derived so far (e.g., vowelClasses, finalConsonant, syllableCount)
 * - definitions: saṃjñā categories established (vrddhiSet, gunaSet, ikSet, consonantFinal, etc.)
 * - diagnostics: optional per-sutra debug payloads keyed by sutra number
 * - meta: global configuration (mode flags, counters)
 *
 * The state object is a plain JS object; helpers below create & update it immutably.
 */

const STATE_VERSION = 1;

export function createInitialState(input) {
  const surface = typeof input === 'string' ? input : '';
  return {
    version: STATE_VERSION,
    surface,
    original: surface,
    history: [],
    facts: {},
    definitions: {},
    diagnostics: {},
    meta: {
      createdAt: Date.now(),
      applied: []
    }
  };
}

export function cloneState(state) {
  return JSON.parse(JSON.stringify(state));
}

function pushHistory(state, entry) {
  const next = cloneState(state);
  next.history.push({ timestamp: Date.now(), ...entry });
  next.meta.applied.push(entry.sutra);
  return next;
}

export function withSurface(state, newSurface, context) {
  return pushHistory(state, {
    sutra: context?.sutra || 'unknown',
    name: context?.name,
    input: state.surface,
    output: newSurface,
    notes: context?.notes || ''
  });
}

export function addFacts(state, sutra, facts) {
  const next = cloneState(state);
  next.facts = { ...next.facts, ...facts };
  return pushHistory(next, { sutra, name: 'facts', input: null, output: null, notes: Object.keys(facts).join(', ') });
}

export function addDefinitions(state, sutra, defs) {
  const next = cloneState(state);
  next.definitions = { ...next.definitions, ...defs };
  return pushHistory(next, { sutra, name: 'definitions', input: null, output: null, notes: Object.keys(defs).join(', ') });
}

export function addDiagnostics(state, sutra, payload) {
  const next = cloneState(state);
  next.diagnostics[sutra] = payload;
  return next;
}

export function summarizeState(state) {
  return {
    surface: state.surface,
    applied: state.meta.applied,
    historyCount: state.history.length,
    facts: Object.keys(state.facts),
    definitions: Object.keys(state.definitions)
  };
}

export function applyPipeline(state, steps) {
  return steps.reduce((s, fn) => fn(s), state);
}

export const StateCore = {
  createInitialState,
  cloneState,
  withSurface,
  addFacts,
  addDefinitions,
  addDiagnostics,
  summarizeState,
  applyPipeline
};
