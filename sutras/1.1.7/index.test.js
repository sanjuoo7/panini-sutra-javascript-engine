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
      expect(consonants.iast).toHaveLength(36);
      expect(consonants.devanagari).toHaveLength(36);
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
});
