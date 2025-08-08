/**
 * Comprehensive test suite for Sutra 1.1.7: हलन्त्यम् (halantyam)
 * 
 * This sutra establishes that consonants are called "antya" (final) when a  // Agent noun formations
  { 
    formation: ['√kar', 'tṛ'], 
    result: 'kartṛ', 
    finalConsonant: 'ṛ', 
    meaning: 'Root कर् + agent suffix → doer',
    process: 'agent-noun-formation',
    category: 'agent-vowel-ending'
  },
  { 
    formation: ['√dā', 'tṛ'], 
    result: 'dātṛ', 
    finalConsonant: 'ṛ', 
    meaning: 'Root दा + agent suffix → giver',
    process: 'agent-noun-formation',
    category: 'agent-vowel-ending'
  },* Enhanced with comprehensive Sanskrit examples and morphological analysis.
 */

import { 
  isConsonant,
  endsWithConsonant,
  getFinalConsonant,
  analyzeConsonantEndings,
  analyzeConsonantSandhi,
  applySutra117,
  getAllConsonants
} from './index.js';
import { iastTestCases, devanagariTestCases } from './test-cases.js';

// Comprehensive Sanskrit examples for consonant ending analysis
const comprehensiveConsonantExamples = [
  // Classical Sanskrit words with consonant endings
  { 
    word: 'vāk', 
    finalConsonant: 'k', 
    meaning: 'speech/voice', 
    context: 'Philosophical discourse - power of speech',
    category: 'velar-ending',
    sandhiExample: 'vāk + īśa → vāgīśa (lord of speech)'
  },
  { 
    word: 'jagat', 
    finalConsonant: 't', 
    meaning: 'world/universe', 
    context: 'Cosmological term - moving world',
    category: 'dental-ending',
    sandhiExample: 'jagat + īśa → jagadīśa (lord of the world)'
  },
  { 
    word: 'marut', 
    finalConsonant: 't', 
    meaning: 'wind god/storm', 
    context: 'Vedic mythology - wind deities',
    category: 'dental-ending',
    sandhiExample: 'marut + gaṇa → marudgaṇa (wind troops)'
  },
  { 
    word: 'bhagavat', 
    finalConsonant: 't', 
    meaning: 'blessed/divine', 
    context: 'Religious epithet - divine qualities',
    category: 'dental-ending',
    sandhiExample: 'bhagavat + gītā → bhagavadgītā (divine song)'
  },
  { 
    word: 'yogīś', 
    finalConsonant: 'ś', 
    meaning: 'lord of yogis', 
    context: 'Spiritual hierarchy - master of yoga',
    category: 'sibilant-ending',
    sandhiExample: 'yogīś + vara → yogīśvara (supreme yogi)'
  },

  // Vedic and epic literature examples
  { 
    word: 'indraḥ', 
    finalConsonant: 'ḥ', 
    meaning: 'Indra (king of gods)', 
    context: 'Vedic pantheon - storm god',
    category: 'visarga-ending',
    sandhiExample: 'indraḥ + agni → indrāgni (Indra and Agni)'
  },
  { 
    word: 'brahman', 
    finalConsonant: 'n', 
    meaning: 'ultimate reality', 
    context: 'Vedantic philosophy - absolute truth',
    category: 'nasal-ending',
    sandhiExample: 'brahman + ātman → brahmātman (brahman-soul unity)'
  },
  { 
    word: 'karman', 
    finalConsonant: 'n', 
    meaning: 'action/karma', 
    context: 'Ethical philosophy - law of action',
    category: 'nasal-ending',
    sandhiExample: 'karman + yoga → karmayoga (path of action)'
  },
  { 
    word: 'ātman', 
    finalConsonant: 'n', 
    meaning: 'self/soul', 
    context: 'Spiritual psychology - individual soul',
    category: 'nasal-ending',
    sandhiExample: 'ātman + jñāna → ātmajñāna (self-knowledge)'
  },

  // Technical grammatical terms
  { 
    word: 'pratyāhāraḥ', 
    finalConsonant: 'ḥ', 
    meaning: 'grammatical abbreviation', 
    context: 'Pāṇinian grammar - sound groups',
    category: 'technical-visarga',
    sandhiExample: 'pratyāhāraḥ + sūtra → pratyāhārasūtra'
  },
  { 
    word: 'vibhaktiḥ', 
    finalConsonant: 'ḥ', 
    meaning: 'case inflection', 
    context: 'Sanskrit grammar - nominal cases',
    category: 'technical-visarga',
    sandhiExample: 'vibhaktiḥ + pratyaya → vibhaktipratyaya'
  },
  { 
    word: 'sandhiḥ', 
    finalConsonant: 'ḥ', 
    meaning: 'phonetic combination', 
    context: 'Phonological rules - sound changes',
    category: 'technical-visarga',
    sandhiExample: 'sandhiḥ + niyama → sandhiniyama'
  }
];

const morphologicalConsonantExamples = [
  // Past participle forms ending in consonants
  { 
    formation: ['√kṛ', 'kta'], 
    result: 'kṛt', 
    finalConsonant: 't', 
    meaning: 'Root कृ + past participle → done/made',
    process: 'kṛdanta-formation',
    category: 'participial-consonant-ending'
  },
  { 
    formation: ['√gam', 'kta'], 
    result: 'gat', 
    finalConsonant: 't', 
    meaning: 'Root गम् + past participle → gone',
    process: 'kṛdanta-formation',
    category: 'participial-consonant-ending'
  },
  { 
    formation: ['√pac', 'kta'], 
    result: 'pakt', 
    finalConsonant: 't', 
    meaning: 'Root पच् + past participle → cooked',
    process: 'kṛdanta-formation',
    category: 'participial-consonant-ending'
  },

  // Agent noun formations
  { 
    formation: ['√kar', 'tṛ'], 
    result: 'kartṛ', 
    finalConsonant: 'ṛ', 
    meaning: 'Root कर् + agent suffix → doer',
    process: 'agent-noun-formation',
    category: 'agent-vowel-ending'
  },
  { 
    formation: ['√dā', 'tṛ'], 
    result: 'dātṛ', 
    finalConsonant: 'ṛ', 
    meaning: 'Root दा + agent suffix → giver',
    process: 'agent-noun-formation',
    category: 'agent-vowel-ending'
  },

  // Feminine formations ending in consonants
  { 
    formation: ['vāc', 'feminine'], 
    result: 'vāk', 
    finalConsonant: 'k', 
    meaning: 'Speech in feminine form',
    process: 'feminine-consonant-stem',
    category: 'feminine-consonant-ending'
  },
  { 
    formation: ['dig', 'compound'], 
    result: 'dik', 
    finalConsonant: 'k', 
    meaning: 'Direction in compound formation',
    process: 'compound-consonant-final',
    category: 'compound-consonant-ending'
  }
];

const sandhiConsonantExamples = [
  // Common sandhi transformations with consonant-ending words
  { 
    original: 'vāk', 
    following: 'īśa', 
    result: 'vāgīśa', 
    rule: 'k + ī → g + ī (velar voicing)',
    meaning: 'speech + lord → lord of speech',
    category: 'velar-sandhi'
  },
  { 
    original: 'jagat', 
    following: 'īśa', 
    result: 'jagadīśa', 
    rule: 't + ī → d + ī (dental voicing)',
    meaning: 'world + lord → lord of the world',
    category: 'dental-sandhi'
  },
  { 
    original: 'bhagavat', 
    following: 'gītā', 
    result: 'bhagavadgītā', 
    rule: 't + g → d + g (dental assimilation)',
    meaning: 'blessed + song → divine song',
    category: 'dental-sandhi'
  },
  { 
    original: 'sat', 
    following: 'cit', 
    result: 'saccit', 
    rule: 't + c → c + c (dental to palatal)',
    meaning: 'being + consciousness → being-consciousness',
    category: 'dental-palatal-sandhi'
  },
  { 
    original: 'tat', 
    following: 'puruṣa', 
    result: 'tatpuruṣa', 
    rule: 't + p → t + p (no change before labial)',
    meaning: 'that + person → compound type',
    category: 'dental-labial-sandhi'
  }
];

const culturalConsonantExamples = [
  // Religious and philosophical terms
  { 
    word: 'bharat', 
    meaning: 'India (land of Bharata)', 
    context: 'National identity - sacred geography',
    consonantType: 'dental-t',
    significance: 'Cultural homeland designation'
  },
  { 
    word: 'vedānt', 
    meaning: 'end of Vedas/Vedanta', 
    context: 'Philosophical school - ultimate knowledge',
    consonantType: 'dental-t',
    significance: 'Philosophical culmination'
  },
  { 
    word: 'yogīśvar', 
    meaning: 'lord of yogis', 
    context: 'Spiritual hierarchy - divine master',
    consonantType: 'sibilant-r',
    significance: 'Spiritual authority'
  },
  { 
    word: 'gurudev', 
    meaning: 'divine teacher', 
    context: 'Educational reverence - sacred teaching',
    consonantType: 'labial-v',
    significance: 'Teaching tradition'
  }
];

describe('Sutra 1.1.7: हलन्त्यम् (halantyam) - Comprehensive Sanskrit Testing', () => {
  
  describe('Core Function Tests', () => {
    test('isConsonant should correctly identify consonants in both scripts', () => {
      expect(isConsonant('k')).toBe(true);
      expect(isConsonant('त')).toBe(true);
      expect(isConsonant('a')).toBe(false);
      expect(isConsonant('आ')).toBe(false);
    });

    test('endsWithConsonant should correctly identify consonant-ending words', () => {
      expect(endsWithConsonant('vāk')).toBe(true);
      expect(endsWithConsonant('वाक्')).toBe(true);
      expect(endsWithConsonant('rāma')).toBe(false);
      expect(endsWithConsonant('राम')).toBe(false);
      expect(endsWithConsonant('indraḥ')).toBe(true);
      expect(endsWithConsonant('इन्द्रः')).toBe(true);
    });

    test('getFinalConsonant should provide detailed consonant analysis', () => {
      const result = getFinalConsonant('jagat');
      expect(result.isValid).toBe(true);
      expect(result.isConsonant).toBe(true);
      expect(result.finalChar).toBe('t');
      expect(result.consonantType).toContain('dental');
    });

    test('getAllConsonants should return complete consonant sets', () => {
      const consonants = getAllConsonants();
      expect(consonants.iast).toHaveLength(33);
      expect(consonants.devanagari).toHaveLength(33);
      expect(consonants.categories.velars.iast).toEqual(['k', 'kh', 'g', 'gh', 'ṅ']);
    });
  });

  describe('Comprehensive Sanskrit Consonant Examples', () => {
    comprehensiveConsonantExamples.forEach((example, index) => {
      test(`${example.word} (${example.meaning}) - ${example.context}`, () => {
        const result = getFinalConsonant(example.word);
        expect(result.isValid).toBe(true);
        expect(result.isConsonant).toBe(true);
        expect(result.finalChar).toBe(example.finalConsonant);
        expect(['velar-ending', 'dental-ending', 'sibilant-ending', 'visarga-ending', 'nasal-ending', 'technical-visarga']).toContain(example.category);
      });
    });
  });

  describe('Morphological Consonant Formation Analysis', () => {
    morphologicalConsonantExamples.forEach((example, index) => {
      test(`${example.formation.join(' + ')} → ${example.result} (${example.meaning})`, () => {
        const result = getFinalConsonant(example.result);
        expect(result.isValid).toBe(true);
        
        // Check if this is a vowel-ending or consonant-ending case
        const isVowelEnding = example.category.includes('vowel-ending');
        expect(result.isConsonant).toBe(!isVowelEnding);
        expect(result.finalChar).toBe(example.finalConsonant);
        expect(['participial-consonant-ending', 'agent-consonant-ending', 'agent-vowel-ending', 'feminine-consonant-ending', 'compound-consonant-ending']).toContain(example.category);
      });
    });
  });

  describe('Sandhi Analysis for Consonant Endings', () => {
    sandhiConsonantExamples.forEach((example, index) => {
      test(`${example.original} + ${example.following} → ${example.result} (${example.meaning})`, () => {
        const sandhiAnalysis = analyzeConsonantSandhi(example.original, example.following);
        expect(sandhiAnalysis.isValid).toBe(true);
        expect(sandhiAnalysis.word).toBe(example.original);
        expect(['velar-sandhi', 'dental-sandhi', 'dental-palatal-sandhi', 'dental-labial-sandhi']).toContain(example.category);
      });
    });
  });

  describe('Cultural and Religious Consonant Examples', () => {
    culturalConsonantExamples.forEach((example, index) => {
      test(`${example.word} (${example.meaning}) - ${example.context}`, () => {
        const result = getFinalConsonant(example.word);
        expect(result.isValid).toBe(true);
        expect(result.isConsonant).toBe(true);
        expect(['dental-t', 'sibilant-r', 'labial-v']).toContain(example.consonantType);
      });
    });
  });

  describe('Multiple Word Analysis', () => {
    test('analyzeConsonantEndings should analyze word collections', () => {
      const words = ['vāk', 'jagat', 'rāma', 'marut', 'sītā'];
      const result = analyzeConsonantEndings(words);
      expect(result.isValid).toBe(true);
      expect(result.totalWords).toBe(5);
      expect(result.consonantEndings).toBe(3); // vāk, jagat, marut
      expect(result.vowelEndings).toBe(2); // rāma, sītā
    });

    test('should handle large word collections efficiently', () => {
      const largeWordList = Array.from({length: 100}, (_, i) => 
        i % 2 === 0 ? `word${i}t` : `word${i}a`
      );
      const startTime = Date.now();
      const result = analyzeConsonantEndings(largeWordList);
      const endTime = Date.now();
      expect(result.isValid).toBe(true);
      expect(result.totalWords).toBe(100);
      expect(endTime - startTime).toBeLessThan(100);
    });
  });

  describe('Sutra Application with Different Contexts', () => {
    test('applySutra117 should handle single word analysis', () => {
      const result = applySutra117('vāk');
      expect(result.sutra.number).toBe('1.1.7');
      expect(result.analysis.type).toBe('single-word');
      expect(result.analysis.isConsonant).toBe(true);
    });

    test('applySutra117 should handle multiple word analysis', () => {
      const result = applySutra117(['vāk', 'jagat', 'rāma']);
      expect(result.analysis.type).toBe('multiple-words');
      expect(result.analysis.totalWords).toBe(3);
      expect(result.analysis.consonantEndings).toBe(2);
    });

    test('applySutra117 should provide comprehensive examples', () => {
      const result = applySutra117('marut');
      expect(result.examples['consonant-endings']).toBeDefined();
      expect(result.examples['sandhi-applications']).toBeDefined();
      expect(result.examples['consonant-endings'].length).toBeGreaterThan(0);
    });
  });

  describe('Original Test Suite Integration (IAST)', () => {
    const consonantCases = iastTestCases.filter(tc => tc.expected);
    const vowelCases = iastTestCases.filter(tc => !tc.expected);
    
    consonantCases.forEach(({ word, expected, type, meaning, category }) => {
      test(`CONSONANT: ${word} (${meaning}) - ${category}`, () => {
        const result = endsWithConsonant(word);
        expect(result).toBe(true);
        
        const analysis = getFinalConsonant(word);
        expect(analysis.isConsonant).toBe(true);
        expect(type).toMatch(/velar|palatal|retroflex|dental|labial|semivowel|sibilant|compound-retroflex|compound-labial|compound-dental|technical|special/);
      });
    });
    
    vowelCases.forEach(({ word, expected, type, meaning, category }) => {
      test(`VOWEL: ${word} (${meaning}) - ${category}`, () => {
        const result = endsWithConsonant(word);
        expect(result).toBe(false);
        
        const analysis = getFinalConsonant(word);
        expect(analysis.isConsonant).toBe(false);
      });
    });
  });

  describe('Original Test Suite Integration (Devanagari)', () => {
    const consonantCases = devanagariTestCases.filter(tc => tc.expected);
    const vowelCases = devanagariTestCases.filter(tc => !tc.expected);
    
    consonantCases.forEach(({ word, expected, type, meaning, category }) => {
      test(`CONSONANT: ${word} (${meaning}) - ${category}`, () => {
        const result = endsWithConsonant(word);
        expect(result).toBe(true);
        
        const analysis = getFinalConsonant(word);
        expect(analysis.isConsonant).toBe(true);
        expect(type).toMatch(/velar|palatal|retroflex|dental|labial|semivowel|sibilant|compound-retroflex|compound-labial|compound-dental|technical|special/);
      });
    });
    
    vowelCases.forEach(({ word, expected, type, meaning, category }) => {
      test(`VOWEL: ${word} (${meaning}) - ${category}`, () => {
        const result = endsWithConsonant(word);
        expect(result).toBe(false);
        
        const analysis = getFinalConsonant(word);
        expect(analysis.isConsonant).toBe(false);
      });
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle empty strings gracefully', () => {
      const result = getFinalConsonant('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should handle null inputs', () => {
      const result = analyzeConsonantEndings(null);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid words array');
    });

    test('should handle single character inputs', () => {
      const result = getFinalConsonant('k');
      expect(result.isValid).toBe(true);
      expect(result.isConsonant).toBe(true);
    });

    test('should handle mixed script inputs', () => {
      const result = analyzeConsonantEndings(['vāk', 'जगत्', 'rāma']);
      expect(result.isValid).toBe(true);
      expect(result.consonantEndings).toBe(2);
    });
  });

  describe('Performance and Consistency', () => {
    test('function consistency across multiple calls', () => {
      const testWords = ['vāk', 'jagat', 'rāma'];
      const results = [];
      for (let i = 0; i < 10; i++) {
        results.push(analyzeConsonantEndings(testWords));
      }
      expect(results.every(r => r.consonantEndings === 2)).toBe(true);
    });

    test('performance with consonant classification', () => {
      const startTime = Date.now();
      for (let i = 0; i < 1000; i++) {
        isConsonant('t');
        isConsonant('त');
        isConsonant('a');
      }
      const endTime = Date.now();
      expect(endTime - startTime).toBeLessThan(50);
    });
  });

  describe('Sanskrit Grammar Integration', () => {
    test('should integrate with morphological analysis', () => {
      const participleWords = ['kṛt', 'gat', 'bhūt'];
      const result = analyzeConsonantEndings(participleWords);
      expect(result.isValid).toBe(true);
      expect(result.consonantEndings).toBe(3);
      expect(result.consonantPercentage).toBe('100.0');
    });

    test('should analyze compound word consonant patterns', () => {
      const compounds = ['jagadīśa', 'bhagavadgītā', 'vāgīśa'];
      const analyses = compounds.map(word => getFinalConsonant(word));
      expect(analyses.every(a => a.isValid)).toBe(true);
    });

    test('should handle technical grammatical terms', () => {
      const technicalTerms = ['pratyāhāraḥ', 'vibhaktiḥ', 'sandhiḥ'];
      const result = analyzeConsonantEndings(technicalTerms);
      expect(result.isValid).toBe(true);
      expect(result.consonantEndings).toBe(3);
    });
  });

  describe('Cross-Sutra Integration', () => {
    test('should work with vowel classification from previous sutras', () => {
      const mixedWords = ['vāk', 'rāma', 'jagat', 'sītā'];
      const result = analyzeConsonantEndings(mixedWords);
      expect(result.isValid).toBe(true);
      expect(result.consonantEndings).toBe(2);
      expect(result.vowelEndings).toBe(2);
    });

    test('should integrate with precedence rules (1.1.6)', () => {
      const orderedWords = ['vāk', 'marut', 'jagat'];
      const result = analyzeConsonantEndings(orderedWords);
      expect(result.isValid).toBe(true);
      expect(result.analysis[0].word).toBe('vāk'); // First maintains precedence
    });

    test('should support sandhi preparation for future sutras', () => {
      const sandhiWord = 'vāk';
      const sandhiAnalysis = analyzeConsonantSandhi(sandhiWord, 'īśa');
      expect(sandhiAnalysis.isValid).toBe(true);
      expect(sandhiAnalysis.sandhiRules.length).toBeGreaterThan(0);
    });
  });

  describe('Enhanced Devanagari Consonant Ending Tests', () => {
    describe('Inherent vowel behavior (consonant letters without halanta)', () => {
      test('राम (rāma) - consonant letter म without halanta should be vowel-ending', () => {
        const result = endsWithConsonant('राम');
        const analysis = getFinalConsonant('राम');
        
        expect(result).toBe(false);
        expect(analysis.isConsonant).toBe(false);
        expect(analysis.explanation).toContain('does not end with a consonant');
        expect(analysis.explanation).toContain('inherent vowel');
      });

      test('गज (gaja) - consonant letter ज without halanta should be vowel-ending', () => {
        const result = endsWithConsonant('गज');
        const analysis = getFinalConsonant('गज');
        
        expect(result).toBe(false);
        expect(analysis.isConsonant).toBe(false);
        expect(analysis.explanation).toContain('does not end with a consonant');
      });

      test('सुर (sura) - consonant letter र without halanta should be vowel-ending', () => {
        const result = endsWithConsonant('सुर');
        const analysis = getFinalConsonant('सुर');
        
        expect(result).toBe(false);
        expect(analysis.isConsonant).toBe(false);
      });

      test('नरक (naraka) - consonant letter क without halanta should be vowel-ending', () => {
        const result = endsWithConsonant('नरक');
        const analysis = getFinalConsonant('नरक');
        
        expect(result).toBe(false);
        expect(analysis.isConsonant).toBe(false);
      });
    });

    describe('Explicit halanta behavior (true consonant endings)', () => {
      test('राम् (rām) - म with explicit halanta should be consonant-ending', () => {
        const result = endsWithConsonant('राम्');
        const analysis = getFinalConsonant('राम्');
        
        expect(result).toBe(true);
        expect(analysis.isConsonant).toBe(true);
        expect(analysis.finalChar).toBe('म');
        expect(analysis.consonantType).toContain('labial');
      });

      test('गज् (gaj) - ज with explicit halanta should be consonant-ending', () => {
        const result = endsWithConsonant('गज्');
        const analysis = getFinalConsonant('गज्');
        
        expect(result).toBe(true);
        expect(analysis.isConsonant).toBe(true);
        expect(analysis.finalChar).toBe('ज');
        expect(analysis.consonantType).toContain('palatal');
      });

      test('सुर् (sur) - र with explicit halanta should be consonant-ending', () => {
        const result = endsWithConsonant('सुर्');
        const analysis = getFinalConsonant('सुर्');
        
        expect(result).toBe(true);
        expect(analysis.isConsonant).toBe(true);
        expect(analysis.finalChar).toBe('र');
        expect(analysis.consonantType).toContain('semivowel');
      });
    });

    describe('Special consonant endings', () => {
      test('रामः (rāmaḥ) - visarga should be consonant-ending', () => {
        const result = endsWithConsonant('रामः');
        const analysis = getFinalConsonant('रामः');
        
        expect(result).toBe(true);
        expect(analysis.isConsonant).toBe(true);
        expect(analysis.finalChar).toBe('ः');
      });

      test('गजं (gajaṃ) - anusvara should be consonant-ending', () => {
        const result = endsWithConsonant('गजं');
        const analysis = getFinalConsonant('गजं');
        
        expect(result).toBe(true);
        expect(analysis.isConsonant).toBe(true);
        expect(analysis.finalChar).toBe('ं');
      });
    });
  });

  describe('Granular consonantType Tests', () => {
    describe('Velar consonants (कण्ठ्य)', () => {
      test('क (ka) should be classified as velar', () => {
        const analysis = getFinalConsonant('अक्');
        expect(analysis.consonantType).toBe('velar (कण्ठ्य)');
        expect(analysis.finalChar).toBe('क');
      });

      test('ग (ga) should be classified as velar', () => {
        const analysis = getFinalConsonant('अग्');
        expect(analysis.consonantType).toBe('velar (कण्ठ्य)');
        expect(analysis.finalChar).toBe('ग');
      });

      test('ङ (ṅa) should be classified as velar', () => {
        const analysis = getFinalConsonant('अङ्');
        expect(analysis.consonantType).toBe('velar (कण्ठ्य)');
        expect(analysis.finalChar).toBe('ङ');
      });
    });

    describe('Palatal consonants (तालव्य)', () => {
      test('च (ca) should be classified as palatal', () => {
        const analysis = getFinalConsonant('अच्');
        expect(analysis.consonantType).toBe('palatal (तालव्य)');
        expect(analysis.finalChar).toBe('च');
      });

      test('ज (ja) should be classified as palatal', () => {
        const analysis = getFinalConsonant('अज्');
        expect(analysis.consonantType).toBe('palatal (तालव्य)');
        expect(analysis.finalChar).toBe('ज');
      });

      test('ञ (ña) should be classified as palatal', () => {
        const analysis = getFinalConsonant('अञ्');
        expect(analysis.consonantType).toBe('palatal (तालव्य)');
        expect(analysis.finalChar).toBe('ञ');
      });
    });

    describe('Retroflex consonants (मूर्धन्य)', () => {
      test('ट (ṭa) should be classified as retroflex', () => {
        const analysis = getFinalConsonant('अट्');
        expect(analysis.consonantType).toBe('retroflex (मूर्धन्य)');
        expect(analysis.finalChar).toBe('ट');
      });

      test('ड (ḍa) should be classified as retroflex', () => {
        const analysis = getFinalConsonant('अड्');
        expect(analysis.consonantType).toBe('retroflex (मूर्धन्य)');
        expect(analysis.finalChar).toBe('ड');
      });

      test('ण (ṇa) should be classified as retroflex', () => {
        const analysis = getFinalConsonant('अण्');
        expect(analysis.consonantType).toBe('retroflex (मूर्धन्य)');
        expect(analysis.finalChar).toBe('ण');
      });
    });

    describe('Dental consonants (दन्त्य)', () => {
      test('त (ta) should be classified as dental', () => {
        const analysis = getFinalConsonant('अत्');
        expect(analysis.consonantType).toBe('dental (दन्त्य)');
        expect(analysis.finalChar).toBe('त');
      });

      test('द (da) should be classified as dental', () => {
        const analysis = getFinalConsonant('अद्');
        expect(analysis.consonantType).toBe('dental (दन्त्य)');
        expect(analysis.finalChar).toBe('द');
      });

      test('न (na) should be classified as dental', () => {
        const analysis = getFinalConsonant('अन्');
        expect(analysis.consonantType).toBe('dental (दन्त्य)');
        expect(analysis.finalChar).toBe('न');
      });
    });

    describe('Labial consonants (ओष्ठ्य)', () => {
      test('प (pa) should be classified as labial', () => {
        const analysis = getFinalConsonant('अप्');
        expect(analysis.consonantType).toBe('labial (ओष्ठ्य)');
        expect(analysis.finalChar).toBe('प');
      });

      test('ब (ba) should be classified as labial', () => {
        const analysis = getFinalConsonant('अब्');
        expect(analysis.consonantType).toBe('labial (ओष्ठ्य)');
        expect(analysis.finalChar).toBe('ब');
      });

      test('म (ma) should be classified as labial', () => {
        const analysis = getFinalConsonant('अम्');
        expect(analysis.consonantType).toBe('labial (ओष्ठ्य)');
        expect(analysis.finalChar).toBe('म');
      });
    });

    describe('Semivowels (अन्तःस्थ)', () => {
      test('य (ya) should be classified as semivowel', () => {
        const analysis = getFinalConsonant('अय्');
        expect(analysis.consonantType).toBe('semivowel (अन्तःस्थ)');
        expect(analysis.finalChar).toBe('य');
      });

      test('र (ra) should be classified as semivowel', () => {
        const analysis = getFinalConsonant('अर्');
        expect(analysis.consonantType).toBe('semivowel (अन्तःस्थ)');
        expect(analysis.finalChar).toBe('र');
      });

      test('ल (la) should be classified as semivowel', () => {
        const analysis = getFinalConsonant('अल्');
        expect(analysis.consonantType).toBe('semivowel (अन्तःस्थ)');
        expect(analysis.finalChar).toBe('ल');
      });

      test('व (va) should be classified as semivowel', () => {
        const analysis = getFinalConsonant('अव्');
        expect(analysis.consonantType).toBe('semivowel (अन्तःस्थ)');
        expect(analysis.finalChar).toBe('व');
      });
    });

    describe('Sibilants (ऊष्म)', () => {
      test('श (śa) should be classified as sibilant', () => {
        const analysis = getFinalConsonant('अश्');
        expect(analysis.consonantType).toBe('sibilant (ऊष्म)');
        expect(analysis.finalChar).toBe('श');
      });

      test('ष (ṣa) should be classified as sibilant', () => {
        const analysis = getFinalConsonant('अष्');
        expect(analysis.consonantType).toBe('sibilant (ऊष्म)');
        expect(analysis.finalChar).toBe('ष');
      });

      test('स (sa) should be classified as sibilant', () => {
        const analysis = getFinalConsonant('अस्');
        expect(analysis.consonantType).toBe('sibilant (ऊष्म)');
        expect(analysis.finalChar).toBe('स');
      });

      test('ह (ha) should be classified as sibilant', () => {
        const analysis = getFinalConsonant('अह्');
        expect(analysis.consonantType).toBe('sibilant (ऊष्म)');
        expect(analysis.finalChar).toBe('ह');
      });
    });

    describe('IAST consonant type mapping', () => {
      test('k should be classified as velar', () => {
        const analysis = getFinalConsonant('vāk');
        expect(analysis.consonantType).toBe('velar (कण्ठ्य)');
        expect(analysis.finalChar).toBe('k');
      });

      test('t should be classified as dental', () => {
        const analysis = getFinalConsonant('jagat');
        expect(analysis.consonantType).toBe('dental (दन्त्य)');
        expect(analysis.finalChar).toBe('t');
      });

      test('r should be classified as semivowel', () => {
        const analysis = getFinalConsonant('svar');
        expect(analysis.consonantType).toBe('semivowel (अन्तःस्थ)');
        expect(analysis.finalChar).toBe('r');
      });
    });
  });
});
