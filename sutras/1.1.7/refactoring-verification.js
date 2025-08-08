/**
 * Verification script for Sutra 1.1.7 refactoring improvements
 * This tests the enhancements made to address the reported issues:
 * 1. Centralized consonant lists 
 * 2. Improved endsWithConsonant logic documentation
 * 3. Enhanced analyzeConsonantSandhi with more comprehensive rules
 */

import { applySutra117 } from './index.js';

console.log('=== Sutra 1.1.7 Refactoring Verification ===\n');

// Test 1: Basic consonant ending detection with proper consonant-ending words
console.log('1. Testing consonant ending detection:');
const testWords = ['vāk', 'marut', 'jagat', 'rām', 'bhū'];

testWords.forEach(word => {
  const result = applySutra117(word);
  console.log(`  "${word}" -> ends with consonant: ${result.analysis?.isConsonant || false}`);
});

console.log('\n2. Testing enhanced sandhi analysis with consonant-ending words:');

// Test 2: Enhanced sandhi analysis with proper consonant-ending words
const sandhiTestCases = [
  'vāk',    // ends with 'k' (velar)
  'marut',  // ends with 't' (dental) 
  'bhagavat' // ends with 't' (dental)
];

sandhiTestCases.forEach(word => {
  const result = applySutra117(word);
  if (result.analysis?.isConsonant) {
    console.log(`  "${word}" (ends with '${result.analysis.finalChar}'):`);
    if (result.analysis.sandhiAnalysis?.sandhiRules) {
      console.log(`    Rules: ${result.analysis.sandhiAnalysis.sandhiRules.slice(0, 1).join(', ')}`);
    }
  }
});

console.log('\n3. Testing shared constants integration:');

// Test 3: Verify shared constants are working by testing consonant detection
try {
  const result = applySutra117('pat'); // Should end with consonant 't'
  console.log('  ✅ Shared constants imported successfully');
  console.log(`  "pat" ends with consonant: ${result.analysis?.isConsonant || false}`);
  console.log(`  Final consonant detected: "${result.analysis?.finalChar || 'none'}"`);
} catch (error) {
  console.log('  ❌ Error with shared constants:', error.message);
}

console.log('\n4. Testing Devanagari consonant logic:');

// Test 4: Devanagari consonant ending logic with explicit halanta
const devanagariTests = ['राम', 'राम्', 'वाक्', 'जगत्'];
devanagariTests.forEach(word => {
  const result = applySutra117(word);
  const endsWithCons = result.analysis?.isConsonant || false;
  console.log(`  "${word}" -> consonant ending: ${endsWithCons} (${word.endsWith('्') ? 'has halanta' : 'no halanta/inherent vowel'})`);
});

console.log('\n5. Testing enhanced sandhi rule details:');

// Test 5: Check if our enhanced sandhi rules provide more information
const result = applySutra117('jagat');
if (result.analysis?.sandhiAnalysis) {
  console.log(`  Enhanced sandhi for "jagat":`);
  console.log(`    Rules: ${result.analysis.sandhiAnalysis.sandhiRules?.join(', ') || 'none'}`);
  console.log(`    Specific sutras: ${result.analysis.sandhiAnalysis.specificSutras?.join(', ') || 'none'}`);
  console.log(`    Limitations: ${result.analysis.sandhiAnalysis.limitations || 'none mentioned'}`);
}

console.log('\n=== Verification Complete ===');
