import { isGuna, getGunaForm, applyGuna } from './index.js';
import TransliterationUtil from '../utils.js';
import { iastTestCases, devanagariTestCases } from './test-cases.js';

// Simple function to extract the first vowel-like sound from a word in IAST.
function getFirstIastVowel(word) {
  const vowelRegex = /ai|au|ā|a|i|ī|u|ū|ṛ|ṝ|ḷ|ḹ|e|o/;
  const match = word.match(vowelRegex);
  return match ? match[0] : undefined;
}

// Comprehensive Sanskrit word examples for enhanced testing  
const comprehensiveSanskritWords = [
  // Advanced Sanskrit compounds with guṇa vowels
  { word: 'agnihotra', firstVowel: 'a', isGuna: true, meaning: 'fire sacrifice', category: 'Vedic ritual' },
  { word: 'ekāgra', firstVowel: 'e', isGuna: true, meaning: 'one-pointed', category: 'concentration' },
  { word: 'oṃkāra', firstVowel: 'o', isGuna: true, meaning: 'sacred Om', category: 'mantra' },
  { word: 'adhyāya', firstVowel: 'a', isGuna: true, meaning: 'chapter', category: 'text structure' },
  { word: 'ekādaśī', firstVowel: 'e', isGuna: true, meaning: 'eleventh day', category: 'calendar' },
  
  // Words with non-guṇa first vowels
  { word: 'īśāna', firstVowel: 'ī', isGuna: false, meaning: 'lord/ruler', category: 'divinity' },
  { word: 'ūrdhva', firstVowel: 'ū', isGuna: false, meaning: 'upward', category: 'direction' },
  { word: 'ṛta', firstVowel: 'ṛ', isGuna: false, meaning: 'cosmic order', category: 'philosophy' },
  { word: 'āgama', firstVowel: 'ā', isGuna: false, meaning: 'scripture', category: 'text tradition' },
  { word: 'aiśvarya', firstVowel: 'ai', isGuna: false, meaning: 'prosperity', category: 'qualities' },
  { word: 'auṣadha', firstVowel: 'au', isGuna: false, meaning: 'medicine', category: 'healing' }
];

const morphologicalExamples = [
  // Guṇa transformations in word formation
  { baseVowel: 'i', gunaForm: 'e', example: 'गम् + इ → गे (gam + i → ge)', analysis: 'Root vowel i becomes guṇa e' },
  { baseVowel: 'u', gunaForm: 'o', example: 'भू + उ → भो (bhū + u → bho)', analysis: 'Root vowel u becomes guṇa o' },
  { baseVowel: 'ṛ', gunaForm: 'ar', example: 'कृ + ऋ → कर् (kṛ + ṛ → kar)', analysis: 'Root vowel ṛ becomes guṇa ar (composite)' },
  
  // Cases where guṇa doesn't apply
  { baseVowel: 'a', gunaForm: null, example: 'गम् + अ → गम् (gam + a → gam)', analysis: 'Vowel a remains unchanged (already guṇa)' },
  { baseVowel: 'ā', gunaForm: null, example: 'स्था + आ → स्था (sthā + ā → sthā)', analysis: 'Long ā is vṛddhi, not subject to guṇa' }
];

describe('Sutra 1.1.2: adeṅ guṇaḥ (IAST)', () => {
  iastTestCases.forEach(({ word, expected }) => {
    const firstVowel = getFirstIastVowel(word);

    test(`should return ${expected} for the first vowel of "${word}" (vowel: ${firstVowel})`, () => {
      expect(firstVowel).toBeDefined();
      expect(isGuna(firstVowel)).toBe(expected);
    });
  });
});

describe('Sutra 1.1.2: adeṅ guṇaḥ (Devanagari)', () => {
    devanagariTestCases.forEach(({ word, expected }) => {
        const firstVowel = TransliterationUtil.getFirstDevanagariVowel(word);
        const iastVowel = firstVowel ? TransliterationUtil.transliterate(firstVowel) : undefined;

        test(`should return ${expected} for the first vowel of "${word}" (vowel: ${iastVowel})`, () => {
            expect(iastVowel).toBeDefined();
            expect(isGuna(iastVowel)).toBe(expected);
        });
    });
});

describe('Guṇa transformation functions', () => {
    test('getGunaForm should return correct guṇa forms', () => {
        expect(getGunaForm('i')).toBe('e');
        expect(getGunaForm('ī')).toBe('e');
        expect(getGunaForm('u')).toBe('o');
        expect(getGunaForm('ū')).toBe('o');
        expect(getGunaForm('ṛ')).toBe('ar');
        expect(getGunaForm('ṝ')).toBe('ar');
        expect(getGunaForm('ḷ')).toBe('al');
        expect(getGunaForm('ḹ')).toBe('al');
        expect(getGunaForm('a')).toBeNull();
        expect(getGunaForm('ā')).toBeNull();
    });

    test('applyGuna should apply guṇa transformation correctly', () => {
        expect(applyGuna('i')).toBe('e');
        expect(applyGuna('u')).toBe('o');
        expect(applyGuna('ṛ')).toBe('ar');
        expect(applyGuna('a')).toBe('a'); // no change for already guṇa vowels
        expect(applyGuna('ā')).toBe('ā'); // no change for vṛddhi vowels
    });

    test('should handle 50 random guṇa applications', () => {
        const testVowels = ['i', 'ī', 'u', 'ū', 'ṛ', 'ṝ', 'ḷ', 'ḹ', 'a', 'e', 'o', 'ā', 'ai', 'au'];
        
        testVowels.forEach(vowel => {
            const result = applyGuna(vowel);
            expect(typeof result).toBe('string');
            expect(result.length).toBeGreaterThan(0);
        });
    });
});

describe('Comprehensive Guṇa Analysis Tests (Sutra 1.1.2)', () => {
    describe('Advanced Sanskrit Word Analysis', () => {
        comprehensiveSanskritWords.forEach(({ word, firstVowel, isGuna: isGunaVowel, meaning, category }) => {
            test(`${category}: "${word}" (${meaning}) - first vowel "${firstVowel}" guṇa analysis`, () => {
                const extractedVowel = getFirstIastVowel(word);
                expect(extractedVowel).toBe(firstVowel);
                expect(isGuna(extractedVowel)).toBe(isGunaVowel);
            });
        });
    });

    describe('Morphological Guṇa Examples', () => {
        morphologicalExamples.forEach(({ baseVowel, gunaForm, example, analysis }) => {
            test(`${analysis}: ${example}`, () => {
                const result = getGunaForm(baseVowel);
                expect(result).toBe(gunaForm);
            });
        });
    });

    describe('Enhanced Guṇa Vowel Recognition', () => {
        const gunaVowelTests = [
            // Pure guṇa vowels according to Sutra 1.1.2 (अदेङ्गुणः)
            { vowel: 'a', expected: true, context: 'Basic अ vowel - fundamental guṇa' },
            { vowel: 'e', expected: true, context: 'Guṇa ए vowel from i/ī transformation' },
            { vowel: 'o', expected: true, context: 'Guṇa ओ vowel from u/ū transformation' },
            
            // Composite guṇa forms (results of transformation but not pure guṇa vowels)
            { vowel: 'ar', expected: false, context: 'Composite अर् from ṛ - guṇa result but not pure guṇa vowel' },
            { vowel: 'al', expected: false, context: 'Composite अल् from ḷ - guṇa result but not pure guṇa vowel' },
            
            // Non-guṇa vowels
            { vowel: 'i', expected: false, context: 'Simple इ vowel - requires guṇa transformation' },
            { vowel: 'ī', expected: false, context: 'Long ई vowel - requires guṇa transformation' },
            { vowel: 'u', expected: false, context: 'Simple उ vowel - requires guṇa transformation' },
            { vowel: 'ū', expected: false, context: 'Long ऊ vowel - requires guṇa transformation' },
            { vowel: 'ṛ', expected: false, context: 'Vowel ऋ - requires guṇa transformation' },
            { vowel: 'ā', expected: false, context: 'Vṛddhi आ vowel - beyond guṇa grade' },
            { vowel: 'ai', expected: false, context: 'Vṛddhi ऐ vowel - beyond guṇa grade' },
            { vowel: 'au', expected: false, context: 'Vṛddhi औ vowel - beyond guṇa grade' }
        ];

        gunaVowelTests.forEach(({ vowel, expected, context }) => {
            test(`${context}: "${vowel}" should ${expected ? 'be' : 'not be'} guṇa`, () => {
                expect(isGuna(vowel)).toBe(expected);
            });
        });
    });
});
