import { applySutra117 } from './index.js';

// Directly test analyzeConsonantSandhi function
console.log('=== Testing Enhanced Sandhi Analysis ===\n');

// Get the module to access the analyzeConsonantSandhi function
// We'll test it by analyzing a word with sandhi context
const result = applySutra117(['vāk', 'īśa']); // vāk + īśa
console.log('Analysis for "vāk" + "īśa":');
console.log(JSON.stringify(result, null, 2));
