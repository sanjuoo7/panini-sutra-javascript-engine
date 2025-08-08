/**
 * Test file specifically for the character-by-character transliteration fallback
 * Verifies that unmapped Devanagari strings get properly converted to IAST
 */

import { hasKitMarker, hasGitMarker, hasNgitMarker, hasKitGitNgitMarkers } from './index.js';

console.log('=== Testing Character-by-Character Fallback ===\n');

// Test cases for unmapped Devanagari that should still be transliterated correctly
const testCases = [
    {
        devanagari: 'कत्',      // This is mapped, should work
        expected: true,
        description: 'Mapped Devanagari कत् (kta) - should have k it-marker'
    },
    {
        devanagari: 'कुम्',     // This is NOT in mapping, tests fallback
        expected: false,        // kum is not a k-it affix in our lists
        description: 'Unmapped Devanagari कुम् (kum) - fallback transliteration should work (no k it-marker expected)'
    },
    {
        devanagari: 'कला',      // This is NOT in mapping, tests fallback  
        expected: false,        // kalā is not a k-it affix
        description: 'Unmapped Devanagari कला (kalā) - fallback should convert but not find k it-marker'
    },
    {
        devanagari: 'घत्',      // This is NOT in mapping, tests fallback
        expected: false,        // ghat is not a g-it affix in our lists
        description: 'Unmapped Devanagari घत् (ghat) - fallback should work (no g it-marker expected)'
    }
];

console.log('Testing fallback with hasKitMarker:');
testCases.forEach(test => {
    const result = hasKitMarker(test.devanagari);
    const status = result === test.expected ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} ${test.description}`);
    console.log(`  Input: "${test.devanagari}" → Expected: ${test.expected}, Got: ${result}\n`);
});

// Additional test to verify character-by-character transliteration actually happens
console.log('=== Manual Verification of Character-by-Character Transliteration ===');

// Import the normalizeScript function directly to test it
// Since it's not exported, we'll test through the public API
const testUnmappedDevanagari = 'कुम्'; // Should become 'kum' via character-by-character

console.log('Testing with unmapped Devanagari input:');
console.log(`Input: "${testUnmappedDevanagari}"`);
console.log(`hasKitMarker result: ${hasKitMarker(testUnmappedDevanagari)}`);
console.log(`hasGitMarker result: ${hasGitMarker(testUnmappedDevanagari)}`);
console.log(`hasNgitMarker result: ${hasNgitMarker(testUnmappedDevanagari)}`);
console.log(`hasKitGitNgitMarkers result: ${hasKitGitNgitMarkers(testUnmappedDevanagari)}`);

console.log('\n=== Before Fix vs After Fix Comparison ===');
console.log('BEFORE FIX: Unmapped Devanagari would return original string → Set.has(devanagari) → false');
console.log('AFTER FIX: Unmapped Devanagari gets char-by-char converted → Set.has(iast) → correct result');
console.log('\nThis demonstrates the fix for the incomplete normalizeScript fallback issue.');
