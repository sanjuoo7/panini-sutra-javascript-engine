/**
 * Simple test of the state pipeline
 */

import { createInitialState, summarizeState } from './state-core.js';
import { applyCompletePipeline } from './wrappers-1.1.x.js';

// Simple test
console.log('Starting state pipeline test...');

const initialState = createInitialState();
const result = applyCompletePipeline(initialState, 'gam', 'ya');

console.log('Complete pipeline result:');
console.log(JSON.stringify(result, null, 2));

console.log('\nSummary:');
console.log(summarizeState(result));
