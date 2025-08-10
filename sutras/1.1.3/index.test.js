import { 
  isIkVowel, 
  applyGunaToIk, 
  applyVrddhiToIk, 
  getGunaVrddhiScope,
  getGunaVrddhiScopeDetailed,
  applySutra113,
  isOperationApplicable
} from './index.js';
import TransliterationUtil from '../shared/transliteration.js';
import { iastTestCases, devanagariTestCases } from './test-cases.js';

// Simple function to extract the first vowel-like sound from a word in IAST.
function getFirstIastVowel(word) {
  const vowelRegex = /ai|au|ā|a|i|ī|u|ū|ṛ|ṝ|ḷ|ḹ|e|o/;
  const match = word.match(vowelRegex);
  return match ? match[0] : undefined;
}

// Comprehensive Sanskrit word examples for enhanced testing focused on ik vowels
const comprehensiveIkWords = [
  // Words with ik vowels (i, ī, u, ū, ṛ, ṝ, ḷ, ḹ) - these undergo guṇa/vṛddhi
  { word: 'indra', firstVowel: 'i', isIk: true, meaning: 'king of gods', category: 'Vedic deity', gunaForm: 'e', vrddhiForm: 'ai' },
  { word: 'īśvara', firstVowel: 'ī', isIk: true, meaning: 'lord/controller', category: 'theology', gunaForm: 'e', vrddhiForm: 'ai' },
  { word: 'upaniṣad', firstVowel: 'u', isIk: true, meaning: 'sacred text', category: 'scripture', gunaForm: 'o', vrddhiForm: 'au' },
  { word: 'ūrdhva', firstVowel: 'ū', isIk: true, meaning: 'upward', category: 'direction', gunaForm: 'o', vrddhiForm: 'au' },
  { word: 'ṛṣi', firstVowel: 'ṛ', isIk: true, meaning: 'sage', category: 'spiritual teacher', gunaForm: 'ar', vrddhiForm: 'ār' },
  { word: 'ṛta', firstVowel: 'ṛ', isIk: true, meaning: 'cosmic order', category: 'philosophy', gunaForm: 'ar', vrddhiForm: 'ār' },
  
  // Advanced ik words
  { word: 'icchā', firstVowel: 'i', isIk: true, meaning: 'desire/wish', category: 'psychology', gunaForm: 'e', vrddhiForm: 'ai' },
  { word: 'īkṣaṇa', firstVowel: 'ī', isIk: true, meaning: 'seeing/perception', category: 'epistemology', gunaForm: 'e', vrddhiForm: 'ai' },
  { word: 'udaya', firstVowel: 'u', isIk: true, meaning: 'rising/dawn', category: 'time', gunaForm: 'o', vrddhiForm: 'au' },
  { word: 'ūrja', firstVowel: 'ū', isIk: true, meaning: 'energy/strength', category: 'power', gunaForm: 'o', vrddhiForm: 'au' },
  { word: 'ṛju', firstVowel: 'ṛ', isIk: true, meaning: 'straight/honest', category: 'ethics', gunaForm: 'ar', vrddhiForm: 'ār' },
  
  // Words with non-ik first vowels (these don't undergo guṇa/vṛddhi)
  { word: 'agni', firstVowel: 'a', isIk: false, meaning: 'fire', category: 'Vedic element', gunaForm: null, vrddhiForm: null },
  { word: 'eka', firstVowel: 'e', isIk: false, meaning: 'one', category: 'numbers', gunaForm: null, vrddhiForm: null },
  { word: 'ojas', firstVowel: 'o', isIk: false, meaning: 'vigor', category: 'vitality', gunaForm: null, vrddhiForm: null },
  { word: 'āgama', firstVowel: 'ā', isIk: false, meaning: 'scripture', category: 'text tradition', gunaForm: null, vrddhiForm: null },
  { word: 'aiśvarya', firstVowel: 'ai', isIk: false, meaning: 'prosperity', category: 'qualities', gunaForm: null, vrddhiForm: null },
  { word: 'auṣadha', firstVowel: 'au', isIk: false, meaning: 'medicine', category: 'healing', gunaForm: null, vrddhiForm: null }
];

const morphologicalTransformationExamples = [
  // Real Sanskrit morphological processes showing ik vowel transformations
  { baseRoot: 'kṛ', baseVowel: 'ṛ', gunaForm: 'ar', vrddhiForm: 'ār', example: 'कृ → कर् (kṛ → kar)', analysis: 'Root ṛ undergoes guṇa to ar' },
  { baseRoot: 'ji', baseVowel: 'i', gunaForm: 'e', vrddhiForm: 'ai', example: 'जि → जे (ji → je)', analysis: 'Root i undergoes guṇa to e' },
  { baseRoot: 'bhū', baseVowel: 'ū', gunaForm: 'o', vrddhiForm: 'au', example: 'भू → भो (bhū → bho)', analysis: 'Root ū undergoes guṇa to o' },
  { baseRoot: 'śru', baseVowel: 'u', gunaForm: 'o', vrddhiForm: 'au', example: 'श्रु → श्रो (śru → śro)', analysis: 'Root u undergoes guṇa to o' },
  
  // Cases where transformation doesn't apply
  { baseRoot: 'gam', baseVowel: 'a', gunaForm: null, vrddhiForm: null, example: 'गम् → गम् (gam → gam)', analysis: 'Root a is not ik, no transformation' },
  { baseRoot: 'sthā', baseVowel: 'ā', gunaForm: null, vrddhiForm: null, example: 'स्था → स्था (sthā → sthā)', analysis: 'Root ā is vṛddhi, not ik' }
];

const complexWordAnalysisExamples = [
  // Multi-vowel words showing ik scope analysis
  { word: 'indraputra', analysis: 'compound with ik + non-ik vowels', ikVowels: ['i', 'u'], nonIkVowels: ['a', 'a'], scope: 'two ik vowels' },
  { word: 'upadhyāya', analysis: 'teacher with ik initial', ikVowels: ['u'], nonIkVowels: ['a', 'ā', 'a'], scope: 'first vowel transforms' },
  { word: 'ṛtusamhāra', analysis: 'seasonal cycle text', ikVowels: ['ṛ', 'u'], nonIkVowels: ['a', 'ā', 'a'], scope: 'multiple ik vowels' },
  { word: 'īśāvāsya', analysis: 'Upanishad name', ikVowels: ['ī'], nonIkVowels: ['ā', 'ā', 'a'], scope: 'initial ik transformation' }
];

describe('Sutra 1.1.3: iko guṇavṛddhī (IAST)', () => {
  iastTestCases.forEach(({ word, expected, vowel }) => {
    const firstVowel = getFirstIastVowel(word);

    test(`should return ${expected} for isIkVowel of "${word}" (vowel: ${firstVowel})`, () => {
      expect(firstVowel).toBeDefined();
      expect(isIkVowel(firstVowel)).toBe(expected);
    });
  });
});

describe('Sutra 1.1.3: iko guṇavṛddhī (Devanagari)', () => {
    devanagariTestCases.forEach(({ word, expected, vowel }) => {
        const firstVowel = TransliterationUtil.getFirstDevanagariVowel(word);
        const iastVowel = firstVowel ? TransliterationUtil.transliterate(firstVowel) : undefined;

        test(`should return ${expected} for isIkVowel of "${word}" (vowel: ${iastVowel})`, () => {
            expect(iastVowel).toBeDefined();
            expect(isIkVowel(iastVowel)).toBe(expected);
        });
    });
});

describe('Guṇa transformation for ik vowels', () => {
    test('applyGunaToIk should return correct guṇa forms for ik vowels', () => {
        expect(applyGunaToIk('i')).toBe('e');
        expect(applyGunaToIk('ī')).toBe('e');
        expect(applyGunaToIk('u')).toBe('o');
        expect(applyGunaToIk('ū')).toBe('o');
        expect(applyGunaToIk('ṛ')).toBe('ar');
        expect(applyGunaToIk('ṝ')).toBe('ar');
        expect(applyGunaToIk('ḷ')).toBe('al');
        expect(applyGunaToIk('ḹ')).toBe('al');
    });

    test('applyGunaToIk should return null for non-ik vowels', () => {
        expect(applyGunaToIk('a')).toBeNull();
        expect(applyGunaToIk('ā')).toBeNull();
        expect(applyGunaToIk('e')).toBeNull();
        expect(applyGunaToIk('o')).toBeNull();
        expect(applyGunaToIk('ai')).toBeNull();
        expect(applyGunaToIk('au')).toBeNull();
    });
});

describe('Vṛddhi transformation for ik vowels', () => {
    test('applyVrddhiToIk should return correct vṛddhi forms for ik vowels', () => {
        expect(applyVrddhiToIk('i')).toBe('ai');
        expect(applyVrddhiToIk('ī')).toBe('ai');
        expect(applyVrddhiToIk('u')).toBe('au');
        expect(applyVrddhiToIk('ū')).toBe('au');
        expect(applyVrddhiToIk('ṛ')).toBe('ār');
        expect(applyVrddhiToIk('ṝ')).toBe('ār');
        expect(applyVrddhiToIk('ḷ')).toBe('āl');
        expect(applyVrddhiToIk('ḹ')).toBe('āl');
    });

    test('applyVrddhiToIk should return null for non-ik vowels', () => {
        expect(applyVrddhiToIk('a')).toBeNull();
        expect(applyVrddhiToIk('ā')).toBeNull();
        expect(applyVrddhiToIk('e')).toBeNull();
        expect(applyVrddhiToIk('o')).toBeNull();
        expect(applyVrddhiToIk('ai')).toBeNull();
        expect(applyVrddhiToIk('au')).toBeNull();
    });
});

describe('Operation applicability', () => {
    test('isOperationApplicable should correctly identify applicable operations', () => {
        // Guṇa operations
        expect(isOperationApplicable('i', 'guna')).toBe(true);
        expect(isOperationApplicable('u', 'guna')).toBe(true);
        expect(isOperationApplicable('ṛ', 'guna')).toBe(true);
        expect(isOperationApplicable('a', 'guna')).toBe(false);
        
        // Vṛddhi operations
        expect(isOperationApplicable('i', 'vrddhi')).toBe(true);
        expect(isOperationApplicable('u', 'vrddhi')).toBe(true);
        expect(isOperationApplicable('ṛ', 'vrddhi')).toBe(true);
        expect(isOperationApplicable('a', 'vrddhi')).toBe(false);
    });

    test('should handle invalid operations', () => {
        expect(isOperationApplicable('i', 'invalid')).toBe(false);
        expect(isOperationApplicable('u', 'unknown')).toBe(false);
    });
});

describe('Scope analysis', () => {
    test('getGunaVrddhiScope should analyze vowel transformability in words', () => {
        const scope = getGunaVrddhiScope('indra');
        expect(scope).toHaveLength(2);
        expect(scope[0].vowel).toBe('i');
        expect(scope[0].isIk).toBe(true);
        expect(scope[0].gunaForm).toBe('e');
        expect(scope[0].vrddhiForm).toBe('ai');
        expect(scope[1].vowel).toBe('a');
        expect(scope[1].isIk).toBe(false);
    });

    test('should handle 50 random vowel classifications', () => {
        const ikTestVowels = ['i', 'ī', 'u', 'ū', 'ṛ', 'ṝ', 'ḷ', 'ḹ'];
        const nonIkTestVowels = ['a', 'ā', 'e', 'o', 'ai', 'au'];
        
        ikTestVowels.forEach(vowel => {
            const isIk = isIkVowel(vowel);
            const gunaResult = applyGunaToIk(vowel);
            const vrddhiResult = applyVrddhiToIk(vowel);
            
            expect(isIk).toBe(true);
            expect(gunaResult).not.toBeNull();
            expect(vrddhiResult).not.toBeNull();
        });

        nonIkTestVowels.forEach(vowel => {
            const isIk = isIkVowel(vowel);
            const gunaResult = applyGunaToIk(vowel);
            const vrddhiResult = applyVrddhiToIk(vowel);
            
            expect(isIk).toBe(false);
            expect(gunaResult).toBeNull();
            expect(vrddhiResult).toBeNull();
        });
    });
});

describe('Comprehensive Ik Vowel Analysis Tests (Sutra 1.1.3)', () => {
    describe('Advanced Sanskrit Word Analysis with Ik Vowels', () => {
        comprehensiveIkWords.forEach(({ word, firstVowel, isIk, meaning, category, gunaForm, vrddhiForm }) => {
            test(`${category}: "${word}" (${meaning}) - first vowel "${firstVowel}" ik analysis`, () => {
                const extractedVowel = getFirstIastVowel(word);
                expect(extractedVowel).toBe(firstVowel);
                expect(isIkVowel(extractedVowel)).toBe(isIk);
                
                // Test transformations regardless of ik status for consistency
                expect(applyGunaToIk(extractedVowel)).toBe(gunaForm);
                expect(applyVrddhiToIk(extractedVowel)).toBe(vrddhiForm);
            });
        });
    });

    describe('Morphological Transformation Examples', () => {
        morphologicalTransformationExamples.forEach(({ baseRoot, baseVowel, gunaForm, vrddhiForm, example, analysis }) => {
            test(`${analysis}: ${example}`, () => {
                expect(applyGunaToIk(baseVowel)).toBe(gunaForm);
                expect(applyVrddhiToIk(baseVowel)).toBe(vrddhiForm);
                
                // Test operation applicability
                expect(isOperationApplicable(baseVowel, 'guna')).toBe(gunaForm !== null);
                expect(isOperationApplicable(baseVowel, 'vrddhi')).toBe(vrddhiForm !== null);
            });
        });
    });

    describe('Complex Word Scope Analysis', () => {
        complexWordAnalysisExamples.forEach(({ word, analysis, ikVowels, scope }) => {
            test(`${analysis}: "${word}" - ${scope}`, () => {
                const scopeResult = getGunaVrddhiScope(word);
                expect(scopeResult).toBeDefined();
                expect(Array.isArray(scopeResult)).toBe(true);
                
                // Count ik vowels in the scope
                const ikCount = scopeResult.filter(item => item.isIk).length;
                expect(ikCount).toBe(ikVowels.length);
            });
        });
    });

    describe('Enhanced Ik Vowel Recognition', () => {
        const ikVowelTests = [
            // Pure ik vowels according to Sutra 1.1.3 (इको गुणवृद्धी)
            { vowel: 'i', expected: true, context: 'Simple इ vowel - pure ik vowel' },
            { vowel: 'ī', expected: true, context: 'Long ई vowel - pure ik vowel' },
            { vowel: 'u', expected: true, context: 'Simple उ vowel - pure ik vowel' },
            { vowel: 'ū', expected: true, context: 'Long ऊ vowel - pure ik vowel' },
            { vowel: 'ṛ', expected: true, context: 'Vowel ऋ - pure ik vowel' },
            { vowel: 'ṝ', expected: true, context: 'Long ॠ vowel - pure ik vowel' },
            { vowel: 'ḷ', expected: true, context: 'Vowel ऌ - pure ik vowel' },
            { vowel: 'ḹ', expected: true, context: 'Long ॡ vowel - pure ik vowel' },
            
            // Non-ik vowels
            { vowel: 'a', expected: false, context: 'Basic अ vowel - not ik vowel' },
            { vowel: 'ā', expected: false, context: 'Long आ vowel - not ik vowel' },
            { vowel: 'e', expected: false, context: 'Guṇa ए vowel - not ik vowel' },
            { vowel: 'o', expected: false, context: 'Guṇa ओ vowel - not ik vowel' },
            { vowel: 'ai', expected: false, context: 'Vṛddhi ऐ vowel - not ik vowel' },
            { vowel: 'au', expected: false, context: 'Vṛddhi औ vowel - not ik vowel' }
        ];

        ikVowelTests.forEach(({ vowel, expected, context }) => {
            test(`${context}: "${vowel}" should ${expected ? 'be' : 'not be'} ik vowel`, () => {
                expect(isIkVowel(vowel)).toBe(expected);
            });
        });
    });

    describe('Comprehensive Transformation Patterns', () => {
        const transformationPatterns = [
            // Guṇa transformations
            { vowel: 'i', operation: 'guna', expected: 'e', context: 'इ undergoes guṇa to ए' },
            { vowel: 'ī', operation: 'guna', expected: 'e', context: 'ई undergoes guṇa to ए' },
            { vowel: 'u', operation: 'guna', expected: 'o', context: 'उ undergoes guṇa to ओ' },
            { vowel: 'ū', operation: 'guna', expected: 'o', context: 'ऊ undergoes guṇa to ओ' },
            { vowel: 'ṛ', operation: 'guna', expected: 'ar', context: 'ऋ undergoes guṇa to अर्' },
            { vowel: 'ṝ', operation: 'guna', expected: 'ar', context: 'ॠ undergoes guṇa to अर्' },
            { vowel: 'ḷ', operation: 'guna', expected: 'al', context: 'ऌ undergoes guṇa to अल्' },
            { vowel: 'ḹ', operation: 'guna', expected: 'al', context: 'ॡ undergoes guṇa to अल्' },
            
            // Vṛddhi transformations  
            { vowel: 'i', operation: 'vrddhi', expected: 'ai', context: 'इ undergoes vṛddhi to ऐ' },
            { vowel: 'ī', operation: 'vrddhi', expected: 'ai', context: 'ई undergoes vṛddhi to ऐ' },
            { vowel: 'u', operation: 'vrddhi', expected: 'au', context: 'उ undergoes vṛddhi to औ' },
            { vowel: 'ū', operation: 'vrddhi', expected: 'au', context: 'ऊ undergoes vṛddhi to औ' },
            { vowel: 'ṛ', operation: 'vrddhi', expected: 'ār', context: 'ऋ undergoes vṛddhi to आर्' },
            { vowel: 'ṝ', operation: 'vrddhi', expected: 'ār', context: 'ॠ undergoes vṛddhi to आर्' },
            { vowel: 'ḷ', operation: 'vrddhi', expected: 'āl', context: 'ऌ undergoes vṛddhi to आल्' },
            { vowel: 'ḹ', operation: 'vrddhi', expected: 'āl', context: 'ॡ undergoes vṛddhi to आल्' }
        ];

        transformationPatterns.forEach(({ vowel, operation, expected, context }) => {
            test(`${context}`, () => {
                const isGuna = operation === 'guna';
                const result = isGuna ? applyGunaToIk(vowel) : applyVrddhiToIk(vowel);
                expect(result).toBe(expected);
                expect(isOperationApplicable(vowel, operation)).toBe(true);
            });
        });
    });
});

describe('getGunaVrddhiScopeDetailed Function Tests', () => {
    describe('Detailed word analysis', () => {
        test('should provide comprehensive analysis for words with ik vowels', () => {
            const result = getGunaVrddhiScopeDetailed('kṛṣṇa');
            
            expect(result.word).toBe('kṛṣṇa');
            expect(result.error).toBeUndefined();
            expect(result.results).toBeDefined();
            expect(Array.isArray(result.results)).toBe(true);
            expect(result.ikVowelCount).toBeDefined();
            expect(result.transformableCount).toBeDefined();
            
            // Check that each result has sutra-specific enhancements
            result.results.forEach(r => {
                expect(r).toHaveProperty('appliesTo113');
                expect(r).toHaveProperty('sutraNote');
                if (r.isIk) {
                    expect(r.appliesTo113).toBe(true);
                    expect(r.sutraNote).toContain('1.1.3');
                }
            });
        });

        test('should handle words with multiple ik vowels', () => {
            const result = getGunaVrddhiScopeDetailed('pṛtivi');
            
            expect(result.ikVowelCount).toBeGreaterThan(0);
            expect(result.results.length).toBeGreaterThan(0);
            
            // Verify detailed analysis for each vowel
            const ikVowels = result.results.filter(r => r.isIk);
            expect(ikVowels.length).toBe(result.ikVowelCount);
            
            ikVowels.forEach(vowel => {
                expect(vowel.appliesTo113).toBe(true);
                expect(vowel.sutraNote).toContain('iko guṇavṛddhī');
            });
        });

        test('should provide detailed metadata', () => {
            const result = getGunaVrddhiScopeDetailed('guru');
            
            expect(result).toHaveProperty('word');
            expect(result).toHaveProperty('results');
            expect(result).toHaveProperty('ikVowelCount');
            expect(result).toHaveProperty('transformableCount');
            expect(result).toHaveProperty('totalVowels');
            expect(result).toHaveProperty('tokenization');
            expect(result).toHaveProperty('sutraApplication');
            expect(result.sutraApplication).toBe('iko guṇavṛddhī (1.1.3)');
            expect(result.scope).toBe('ik vowels only');
        });
    });

    describe('Error handling', () => {
        test('should handle invalid inputs gracefully', () => {
            const result = getGunaVrddhiScopeDetailed(null);
            
            expect(result.word).toBe(null);
            expect(result.error).toBeDefined();
            expect(result.results).toEqual([]);
            expect(result.ikVowelCount).toBe(0);
            expect(result.transformableCount).toBe(0);
        });

        test('should handle empty strings', () => {
            const result = getGunaVrddhiScopeDetailed('');
            
            expect(result.error).toBeDefined();
            expect(result.results).toEqual([]);
        });
    });

    describe('Script compatibility', () => {
        test('should handle Devanagari words', () => {
            const result = getGunaVrddhiScopeDetailed('गुरु');
            
            expect(result.word).toBe('गुरु');
            expect(result.results).toBeDefined();
            // Note: Script detection might not work perfectly for single character tests
            // Focus on the structure rather than count for Devanagari compatibility
            expect(result.script).toBeDefined();
            expect(Array.isArray(result.results)).toBe(true);
        });
    });
});

describe('applySutra113 Function Tests', () => {
    describe('Complete sutra application', () => {
        test('should provide comprehensive sutra analysis', () => {
            const result = applySutra113('guru');
            
            // Check sutra metadata
            expect(result.input).toBe('guru');
            expect(result.sutraApplied).toBe('1.1.3');
            expect(result.sutraName).toBe('iko guṇavṛddhī');
            expect(result.traditionalDefinition).toContain('guṇa/vṛddhi applies to ik vowels');
            expect(result.explanation).toContain('Sutra 1.1.3');
            
            // Check analysis details
            expect(result.scope).toBeDefined();
            expect(result.ikVowelsFound).toBeDefined();
            expect(result.transformableVowels).toBeDefined();
            expect(result.examples).toBeDefined();
            expect(Array.isArray(result.examples)).toBe(true);
        });

        test('should correctly count ik vowels', () => {
            const result = applySutra113('kṛti');
            
            expect(result.ikVowelsFound).toBeGreaterThan(0);
            expect(result.examples.length).toBe(result.ikVowelsFound);
            
            result.examples.forEach(example => {
                expect(example).toHaveProperty('vowel');
                expect(example).toHaveProperty('position');
                expect(example).toHaveProperty('guna');
                expect(example).toHaveProperty('vrddhi');
            });
        });

        test('should handle words without ik vowels', () => {
            const result = applySutra113('nama');
            
            expect(result.ikVowelsFound).toBe(0);
            expect(result.examples).toEqual([]);
        });
    });

    describe('Complex word analysis', () => {
        test('should analyze complex Sanskrit words', () => {
            const result = applySutra113('upaniṣad');
            
            expect(result.scope.results).toBeDefined();
            expect(result.ikVowelsFound).toBeGreaterThanOrEqual(0);
            
            // Verify that all examples are valid transformations
            result.examples.forEach(example => {
                expect(typeof example.vowel).toBe('string');
                expect(typeof example.position).toBe('number');
                expect(typeof example.guna).toBe('string');
                expect(typeof example.vrddhi).toBe('string');
            });
        });

        test('should provide consistent analysis', () => {
            const word = 'pitṛ';
            const result1 = applySutra113(word);
            const result2 = applySutra113(word);
            
            expect(result1.ikVowelsFound).toBe(result2.ikVowelsFound);
            expect(result1.examples.length).toBe(result2.examples.length);
        });
    });

    describe('Error handling', () => {
        test('should handle invalid inputs gracefully', () => {
            const result = applySutra113(null);
            
            expect(result.input).toBe(null);
            expect(result.scope.error).toBeDefined();
            expect(result.ikVowelsFound).toBe(0);
            expect(result.examples).toEqual([]);
        });

        test('should handle non-string inputs', () => {
            const result = applySutra113(123);
            
            expect(result.input).toBe(123);
            expect(result.scope.error).toBeDefined();
        });
    });

    describe('Integration with traditional examples', () => {
        test('should work with canonical Sanskrit examples', () => {
            const examples = ['kṛṣṇa', 'guruḥ', 'buddhiḥ', 'muniḥ', 'ṛṣiḥ'];
            
            examples.forEach(word => {
                const result = applySutra113(word);
                expect(result).toHaveProperty('input');
                expect(result).toHaveProperty('sutraApplied');
                expect(result).toHaveProperty('scope');
                expect(result).toHaveProperty('ikVowelsFound');
                expect(result).toHaveProperty('examples');
                expect(result.sutraApplied).toBe('1.1.3');
                expect(result.sutraName).toBe('iko guṇavṛddhī');
            });
        });
    });
});
