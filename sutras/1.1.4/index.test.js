/**
 * Test suite for Sutra 1.1.4: न धातुलोप आर्धधातुके (na dhātulopa ārdhadhātuke)
 * 
 * This sutra states that dhātu-lopa (elision of the dhātu) does not occur 
 * when ārdhadhātuka affixes are applied, which blocks guṇa/vṛddhi transformations.
 * 
 * Focus: Comprehensive testing with real Sanskrit words and morphological analysis
 */

import { 
  isArdhadhatuka,
  causesDhatuLopa,
  shouldBlockGunaVrddhi,
  analyzeDhatuAffixCombination,
  applySutra114,
  validateSutra114Conditions
} from './index.js';
import { dhatuAffixTestCases, ardhadhatikaAffixTestCases } from './test-cases.js';

// Comprehensive Sanskrit word examples for Sutra 1.1.4 testing
const comprehensiveDhatuExamples = [
  // Dhātu-lopa blocking examples with real Sanskrit words
  { dhatu: 'gam', meaning: 'to go', affix: 'ya', result: 'gaya', blocked: true, category: 'movement verbs', example: 'गम् + य → गय (gam + ya → gaya)', analysis: 'dhātu-lopa blocks guṇa with ārdhadhātuka ya' },
  { dhatu: 'han', meaning: 'to kill', affix: 'kta', result: 'hata', blocked: true, category: 'action verbs', example: 'हन् + क्त → हत (han + kta → hata)', analysis: 'dhātu-lopa blocks guṇa with ārdhadhātuka kta' },
  { dhatu: 'jan', meaning: 'to be born', affix: 'ya', result: 'janya', blocked: true, category: 'existence verbs', example: 'जन् + य → जन्य (jan + ya → janya)', analysis: 'dhātu-lopa blocks guṇa with ārdhadhātuka ya' },
  { dhatu: 'vid', meaning: 'to know', affix: 'kta', result: 'vitta', blocked: true, category: 'knowledge verbs', example: 'विद् + क्त → वित्त (vid + kta → vitta)', analysis: 'dhātu-lopa blocks guṇa with ārdhadhātuka kta' },
  { dhatu: 'khad', meaning: 'to eat', affix: 'ya', result: 'khadya', blocked: true, category: 'consumption verbs', example: 'खद् + य → खाद्य (khad + ya → khādya)', analysis: 'dhātu-lopa blocks guṇa with ārdhadhātuka ya' },
  { dhatu: 'gad', meaning: 'to speak', affix: 'tvā', result: 'gaditvā', blocked: true, category: 'communication verbs', example: 'गद् + त्वा → गदित्वा (gad + tvā → gaditvā)', analysis: 'dhātu-lopa blocks guṇa with ārdhadhātuka tvā' },
  { dhatu: 'chad', meaning: 'to cover', affix: 'kta', result: 'channa', blocked: true, category: 'concealment verbs', example: 'छद् + क्त → छन्न (chad + kta → channa)', analysis: 'dhātu-lopa blocks guṇa with ārdhadhātuka kta' },
  { dhatu: 'pad', meaning: 'to go/fall', affix: 'ya', result: 'padya', blocked: false, category: 'movement verbs', example: 'पद् + य → पद्य (pad + ya → padya)', analysis: 'pad does not cause dhātu-lopa with ya' },
  { dhatu: 'sad', meaning: 'to sit', affix: 'kta', result: 'sanna', blocked: false, category: 'posture verbs', example: 'सद् + क्त → सन्न (sad + kta → sanna)', analysis: 'sad does not cause dhātu-lopa with kta' },
  { dhatu: 'mad', meaning: 'to rejoice', affix: 'ya', result: 'madya', blocked: false, category: 'emotion verbs', example: 'मद् + य → मद्य (mad + ya → madya)', analysis: 'mad does not cause dhātu-lopa with ya' },
  
  // Non-blocking examples - sārvadhātuka affixes
  { dhatu: 'pac', meaning: 'to cook', affix: 'ti', result: 'pacati', blocked: false, category: 'cooking verbs', example: 'पच् + ति → पचति (pac + ti → pacati)', analysis: 'guṇa allowed with sārvadhātuka ti' },
  { dhatu: 'bhū', meaning: 'to be/become', affix: 'ti', result: 'bhavati', blocked: false, category: 'existence verbs', example: 'भू + ति → भवति (bhū + ti → bhavati)', analysis: 'guṇa allowed with sārvadhātuka ti' },
  { dhatu: 'kṛ', meaning: 'to do/make', affix: 'ti', result: 'karoti', blocked: false, category: 'action verbs', example: 'कृ + ति → करोति (kṛ + ti → karoti)', analysis: 'guṇa allowed with sārvadhātuka ti' },
  { dhatu: 'nī', meaning: 'to lead', affix: 'ti', result: 'nayati', blocked: false, category: 'movement verbs', example: 'नी + ति → नयति (nī + ti → nayati)', analysis: 'guṇa allowed with sārvadhātuka ti' },
  { dhatu: 'dṛś', meaning: 'to see', affix: 'ti', result: 'paśyati', blocked: false, category: 'perception verbs', example: 'दृश् + ति → पश्यति (dṛś + ti → paśyati)', analysis: 'guṇa allowed with sārvadhātuka ti' }
];

const morphologicalProcessExamples = [
  // Complex morphological processes involving dhātu-lopa
  { baseForm: 'gamiṣyati', dhatu: 'gam', affix: 'iṣya', process: 'future formation', blocked: false, analysis: 'Future tense allows normal transformations' },
  { baseForm: 'jagāma', dhatu: 'gam', affix: 'a', process: 'perfect formation', blocked: false, analysis: 'Perfect tense has special rules' },
  { baseForm: 'gantavya', dhatu: 'gam', affix: 'tavya', process: 'gerundive formation', blocked: true, analysis: 'Gerundive blocks with dhātu-lopa' },
  { baseForm: 'hatvā', dhatu: 'han', affix: 'tvā', process: 'absolutive formation', blocked: true, analysis: 'Absolutive formation with dhātu-lopa' },
  { baseForm: 'jāta', dhatu: 'jan', affix: 'ta', process: 'past participle', blocked: false, analysis: 'Past participle with jāta form allows transformations' },
  { baseForm: 'vidita', dhatu: 'vid', affix: 'ita', process: 'causative participle', blocked: false, analysis: 'Causative formation has different rules' },
  { baseForm: 'khadita', dhatu: 'khad', affix: 'ita', process: 'causative participle', blocked: false, analysis: 'Causative formation overrides dhātu-lopa' },
  { baseForm: 'gadita', dhatu: 'gad', affix: 'ita', process: 'causative participle', blocked: false, analysis: 'Causative formation overrides dhātu-lopa' },
  { baseForm: 'chadita', dhatu: 'chad', affix: 'ita', process: 'causative participle', blocked: false, analysis: 'Causative formation overrides dhātu-lopa' }
];

const advancedSanskritExamples = [
  // Real world Sanskrit word formations
  { word: 'gamya', dhatu: 'gam', analysis: 'passible/accessible', blocked: true, context: 'adjective formation with ya' },
  { word: 'hanya', dhatu: 'han', analysis: 'killable/destructible', blocked: true, context: 'passive adjective' },
  { word: 'vidya', dhatu: 'vid', analysis: 'knowledge/science', blocked: true, context: 'noun formation' },
  { word: 'khādya', dhatu: 'khad', analysis: 'edible/food', blocked: true, context: 'adjective with ya suffix' },
  { word: 'gādya', dhatu: 'gad', analysis: 'speakable/prose', blocked: true, context: 'adjective formation' },
  { word: 'chādya', dhatu: 'chad', analysis: 'coverable', blocked: true, context: 'potential adjective' },
  { word: 'padya', dhatu: 'pad', analysis: 'verse/poetry', blocked: false, context: 'literary term' },
  { word: 'sādya', dhatu: 'sad', analysis: 'achievable', blocked: false, context: 'accomplishable adjective' },
  { word: 'madya', dhatu: 'mad', analysis: 'intoxicating/wine', blocked: false, context: 'substance noun' }
];

describe('Sutra 1.1.4: na dhātulopa ārdhadhātuke - Comprehensive Sanskrit Testing', () => {
  describe('Core Function Tests', () => {
    test('isArdhadhatuka should correctly identify ārdhadhātuka affixes', () => {
      expect(isArdhadhatuka('ya')).toBe(true);
      expect(isArdhadhatuka('kta')).toBe(true);
      expect(isArdhadhatuka('tvā')).toBe(true);
      expect(isArdhadhatuka('tavya')).toBe(true);
      expect(isArdhadhatuka('ti')).toBe(false);
      expect(isArdhadhatuka('anti')).toBe(false);
    });

    test('causesDhatuLopa should identify dhātu-lopa causing combinations', () => {
      expect(causesDhatuLopa('gam', 'ya')).toBe(true);
      expect(causesDhatuLopa('han', 'kta')).toBe(true);
      expect(causesDhatuLopa('jan', 'ya')).toBe(true);
      expect(causesDhatuLopa('pad', 'ya')).toBe(false);
      expect(causesDhatuLopa('sad', 'kta')).toBe(false);
      expect(causesDhatuLopa('mad', 'ya')).toBe(false);
    });

    test('shouldBlockGunaVrddhi should correctly determine blocking', () => {
      expect(shouldBlockGunaVrddhi('gam', 'ya', 'guna')).toBe(true);
      expect(shouldBlockGunaVrddhi('han', 'kta', 'guna')).toBe(true);
      expect(shouldBlockGunaVrddhi('pac', 'ti', 'guna')).toBe(false);
      expect(shouldBlockGunaVrddhi('pad', 'ya', 'guna')).toBe(false);
    });
  });

  describe('Comprehensive Dhātu Examples', () => {
    comprehensiveDhatuExamples.forEach((example, index) => {
      test(`${example.dhatu} + ${example.affix} → ${example.result} (${example.category})`, () => {
        const result = shouldBlockGunaVrddhi(example.dhatu, example.affix, 'guna');
        expect(result).toBe(example.blocked);
        
        // Additional validation for context
        expect(example.meaning).toBeDefined();
        expect(example.analysis).toContain(example.affix);
        expect(example.example).toContain(example.dhatu);
      });
    });
  });

  describe('Morphological Process Validation', () => {
    morphologicalProcessExamples.forEach((example, index) => {
      test(`${example.baseForm} - ${example.process}`, () => {
        const result = shouldBlockGunaVrddhi(example.dhatu, example.affix, 'guna');
        expect(result).toBe(example.blocked);
        
        // Validate process categorization
        expect(['future formation', 'perfect formation', 'gerundive formation', 
                'absolutive formation', 'past participle', 'causative participle'])
          .toContain(example.process);
        expect(example.analysis).toBeDefined();
      });
    });
  });

  describe('Advanced Sanskrit Word Analysis', () => {
    advancedSanskritExamples.forEach((example, index) => {
      test(`Sanskrit word: ${example.word} (${example.analysis})`, () => {
        const hasYaSuffix = example.word.endsWith('ya');
        
        // Only test dhatu+ya combinations where both dhatu and ya suffix exist
        const expectedResult = hasYaSuffix && example.dhatu ? example.blocked : false;
        const actualResult = hasYaSuffix && example.dhatu ? 
          shouldBlockGunaVrddhi(example.dhatu, 'ya', 'guna') : false;
        
        expect(actualResult).toBe(expectedResult);
        
        // Validate context and analysis
        expect(example.context).toBeDefined();
        expect(example.analysis).toBeDefined();
        expect(['adjective formation', 'passive adjective', 'noun formation', 
                'literary term', 'substance noun', 'potential adjective',
                'accomplishable adjective', 'adjective formation with ya',
                'adjective with ya suffix']).toContain(example.context);
      });
    });
  });

  describe('Integration with Test Cases', () => {
    test('dhatuAffixTestCases integration', () => {
      dhatuAffixTestCases.forEach(testCase => {
        const result = analyzeDhatuAffixCombination(testCase.dhatu, testCase.affix);
        expect(result).toHaveProperty('isAffixArdhadhatuka');
        expect(result).toHaveProperty('causesDhatuLopa');
        expect(result).toHaveProperty('shouldBlockGuna');
      });
    });

    test('ardhadhatikaAffixTestCases validation', () => {
      ardhadhatikaAffixTestCases.forEach(testCase => {
        const isArdha = isArdhadhatuka(testCase.affix);
        expect(isArdha).toBe(testCase.expected);
      });
    });
  });

  describe('Sutra Application and Validation', () => {
    test('applySutra114 comprehensive application', () => {
      const testCombinations = [
        { dhatu: 'gam', affix: 'ya', expectedBlock: true },
        { dhatu: 'han', affix: 'kta', expectedBlock: true },
        { dhatu: 'pac', affix: 'ti', expectedBlock: false },
        { dhatu: 'pad', affix: 'ya', expectedBlock: false }
      ];

      testCombinations.forEach(combo => {
        const result = applySutra114(combo.dhatu, combo.affix, 'a', 'guna');
        expect(result.blocked).toBe(combo.expectedBlock);
        expect(result.dhatu).toBe(combo.dhatu);
        expect(result.affix).toBe(combo.affix);
      });
    });

    test('validateSutra114Conditions with comprehensive examples', () => {
      comprehensiveDhatuExamples.forEach(example => {
        const validation = validateSutra114Conditions(example.dhatu, example.affix);
        expect(validation).toHaveProperty('validDhatu');
        expect(validation).toHaveProperty('validAffix');
        expect(validation).toHaveProperty('conditions');
        expect(validation.conditions).toHaveProperty('hasArdhadhatikaAffix');
        expect(validation.conditions).toHaveProperty('hasDhatuLopa');
      });
    });
  });

  describe('Performance and Edge Cases', () => {
    test('Empty and invalid inputs', () => {
      expect(shouldBlockGunaVrddhi('', '', 'guna')).toBe(false);
      expect(shouldBlockGunaVrddhi(null, null, 'guna')).toBe(false);
      expect(shouldBlockGunaVrddhi(undefined, undefined, 'guna')).toBe(false);
    });

    test('Function consistency across multiple calls', () => {
      const testPairs = [
        ['gam', 'ya'],
        ['han', 'kta'],
        ['pac', 'ti']
      ];

      testPairs.forEach(([dhatu, affix]) => {
        const results = [];
        for (let i = 0; i < 10; i++) {
          results.push(shouldBlockGunaVrddhi(dhatu, affix, 'guna'));
        }
        
        // All results should be identical
        expect(results.every(r => r === results[0])).toBe(true);
      });
    });
  });
});
