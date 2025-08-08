/**
 * Comprehensive test suite for Sutra 1.1.6: पूर्वोऽवरः (pūrvo'varaḥ)
 * 
 * This sutra establishes the fundamental principle of precedence and ordering.
 * Enhanced with comprehensive Sanskrit examples and real-world applications.
 */

import { 
  determinePrecedence,
  analyzeCompoundPrecedence,
  determineRulePrecedence,
  analyzePhonemeSequence,
  applySutra116,
  hasPrecedence
} from './index.js';
import { iastTestCases, devanagariTestCases } from './test-cases.js';

// Comprehensive Sanskrit examples for precedence testing
const comprehensivePrecedenceExamples = [
  // Classical Sanskrit compound examples
  { 
    compound: ['rāma', 'lakṣmaṇa'], 
    primary: 'rāma', 
    meaning: 'Rama-Lakshmana', 
    context: 'Epic literature - elder brother precedence',
    category: 'kinship-compound'
  },
  { 
    compound: ['sītā', 'rāma'], 
    primary: 'sītā', 
    meaning: 'Sita-Rama', 
    context: 'Epic literature - when wife is mentioned first',
    category: 'courtesy-compound'
  },
  { 
    compound: ['agni', 'vāyu'], 
    primary: 'agni', 
    meaning: 'Fire-Wind', 
    context: 'Vedic elements - fire precedence',
    category: 'elemental-compound'
  },
  { 
    compound: ['pṛthvī', 'ākāśa'], 
    primary: 'pṛthvī', 
    meaning: 'Earth-Sky', 
    context: 'Cosmic elements - earth comes first',
    category: 'cosmic-compound'
  },
  { 
    compound: ['hotṛ', 'udgātṛ'], 
    primary: 'hotṛ', 
    meaning: 'Hotr-Udgatar priests', 
    context: 'Vedic ritual - priest hierarchy',
    category: 'ritual-compound'
  },

  // Grammatical rule precedence examples
  { 
    rules: [
      { name: 'वृद्धिरादैच्', order: 1, type: 'vowel-definition' },
      { name: 'अदेङ्गुणः', order: 2, type: 'vowel-definition' }
    ],
    primary: 'वृद्धिरादैच्',
    meaning: 'Vriddhi definition precedes guna definition',
    context: 'Sutrapatha ordering',
    category: 'definitional-precedence'
  },
  { 
    rules: [
      { name: 'परस्मैपदम्', order: 1, type: 'voice' },
      { name: 'आत्मनेपदम्', order: 2, type: 'voice' }
    ],
    primary: 'परस्मैपदम्',
    meaning: 'Parasmaipada mentioned before Atmanepada',
    context: 'Verbal system organization',
    category: 'voice-precedence'
  },

  // Phonological precedence examples
  { 
    sequence: 'राम', 
    primary: 'र', 
    meaning: 'In राम, र has primary influence', 
    context: 'Phonological structure',
    category: 'phoneme-precedence'
  },
  { 
    sequence: 'क्ष', 
    primary: 'क', 
    meaning: 'In क्ष, क influences ष', 
    context: 'Conjunct consonant formation',
    category: 'conjunct-precedence'
  },
  { 
    sequence: 'ज्ञ', 
    primary: 'ज', 
    meaning: 'In ज्ञ, ज influences ञ', 
    context: 'Special conjunct formation',
    category: 'special-conjunct'
  }
];

const morphologicalPrecedenceExamples = [
  // Root-suffix precedence
  { 
    formation: ['कृ', 'ति'], 
    result: 'करोति', 
    primary: 'कृ', 
    meaning: 'Root कृ precedes suffix ति in conjugation',
    process: 'present-tense-formation',
    category: 'dhatu-pratyaya'
  },
  { 
    formation: ['गम्', 'त'], 
    result: 'गत', 
    primary: 'गम्', 
    meaning: 'Root गम् precedes participial suffix त',
    process: 'past-participle-formation',
    category: 'dhatu-kridanta'
  },
  { 
    formation: ['राम', 'स्य'], 
    result: 'रामस्य', 
    primary: 'राम', 
    meaning: 'Stem राम precedes genitive suffix स्य',
    process: 'case-inflection',
    category: 'pratipadika-vibhakti'
  },

  // Prefix-root precedence
  { 
    formation: ['प्र', 'गम्'], 
    result: 'प्रगम्', 
    primary: 'प्र', 
    meaning: 'Prefix प्र precedes root गम्',
    process: 'prefixation',
    category: 'upasarga-dhatu'
  },
  { 
    formation: ['अव', 'तर्'], 
    result: 'अवतर्', 
    primary: 'अव', 
    meaning: 'Prefix अव precedes root तर्',
    process: 'verbal-prefixation',
    category: 'upasarga-dhatu'
  },

  // Compound precedence in complex formations
  { 
    formation: ['राज', 'पुत्र'], 
    result: 'राजपुत्र', 
    primary: 'राज', 
    meaning: 'राज determines compound meaning - prince/king\'s son',
    process: 'tatpurusha-compound',
    category: 'compound-formation'
  }
];

const vedaicPrecedenceExamples = [
  // Vedic literature precedence
  { 
    sequence: ['ऋग्वेद', 'यजुर्वेद', 'सामवेद', 'अथर्ववेद'],
    primary: 'ऋग्वेद',
    meaning: 'Rigveda has precedence in traditional ordering',
    context: 'Vedic literature hierarchy',
    category: 'scriptural-precedence'
  },
  // Ritual precedence
  { 
    sequence: ['आहवनीय', 'गार्हपत्य', 'दक्षिणाग्नि'],
    primary: 'आहवनीय',
    meaning: 'Ahavaniya fire has ritual precedence',
    context: 'Vedic fire ritual',
    category: 'ritual-precedence'
  },
  // Deity precedence
  { 
    sequence: ['इन्द्र', 'अग्नि', 'वरुण'],
    primary: 'इन्द्र',
    meaning: 'Indra mentioned first in traditional invocations',
    context: 'Vedic deity hierarchy',
    category: 'deity-precedence'
  }
];

const logicalPrecedenceExamples = [
  // Cause-effect relationships
  { 
    sequence: ['बीज', 'वृक्ष', 'फल'],
    primary: 'बीज',
    meaning: 'Seed precedes tree precedes fruit in causal chain',
    context: 'Natural causation',
    category: 'causal-precedence'
  },
  // Temporal precedence
  { 
    sequence: ['प्रातः', 'मध्याह्न', 'सायं'],
    primary: 'प्रातः',
    meaning: 'Morning precedes noon precedes evening',
    context: 'Daily time cycles',
    category: 'temporal-precedence'
  },
  // Philosophical precedence
  { 
    sequence: ['सत्', 'चित्', 'आनन्द'],
    primary: 'सत्',
    meaning: 'Existence (sat) precedes consciousness (cit) precedes bliss (ananda)',
    context: 'Vedantic philosophy',
    category: 'philosophical-precedence'
  }
];

describe('Sutra 1.1.6: पूर्वोऽवरः (pūrvo\'varaḥ) - Comprehensive Sanskrit Testing', () => {
  
  describe('Core Function Tests', () => {
    test('determinePrecedence should correctly identify precedence relationships', () => {
      const result = determinePrecedence(['first', 'second'], 0, 1);
      expect(result.isValid).toBe(true);
      expect(result.precedent).toBe('first');
      expect(result.subsequent).toBe('second');
      expect(result.hasPrecedence).toBe(true);
    });

    test('analyzeCompoundPrecedence should analyze Sanskrit compounds', () => {
      const result = analyzeCompoundPrecedence(['rāma', 'sītā']);
      expect(result.isValid).toBe(true);
      expect(result.primary.part).toBe('rāma');
      expect(result.primary.isPrimary).toBe(true);
    });

    test('hasPrecedence should correctly determine positional precedence', () => {
      const sequence = ['first', 'second', 'third'];
      expect(hasPrecedence('first', 'second', sequence)).toBe(true);
      expect(hasPrecedence('second', 'first', sequence)).toBe(false);
    });
  });

  describe('Comprehensive Sanskrit Compound Precedence', () => {
    comprehensivePrecedenceExamples.forEach((example, index) => {
      if (example.compound) {
        test(`${example.compound.join('-')} (${example.meaning}) - ${example.context}`, () => {
          const result = analyzeCompoundPrecedence(example.compound);
          expect(result.isValid).toBe(true);
          expect(result.primary.part).toBe(example.primary);
          expect(result.primary.isPrimary).toBe(true);
          expect(['kinship-compound', 'courtesy-compound', 'elemental-compound', 'cosmic-compound', 'ritual-compound']).toContain(example.category);
        });
      }
    });
  });

  describe('Grammatical Rule Precedence', () => {
    comprehensivePrecedenceExamples.forEach((example, index) => {
      if (example.rules) {
        test(`${example.meaning} - ${example.context}`, () => {
          const result = determineRulePrecedence(example.rules);
          expect(result.isValid).toBe(true);
          expect(result.applicableRule.name).toBe(example.primary);
          expect(result.supersededRules.length).toBeGreaterThan(0);
        });
      }
    });
  });

  describe('Phonological Precedence Analysis', () => {
    comprehensivePrecedenceExamples.forEach((example, index) => {
      if (example.sequence && typeof example.sequence === 'string') {
        test(`${example.sequence} - ${example.meaning}`, () => {
          const result = analyzePhonemeSequence(example.sequence);
          expect(result.isValid).toBe(true);
          expect(result.primaryPhoneme.phoneme).toBe(example.primary);
          expect(result.primaryPhoneme.isPrimary).toBe(true);
        });
      }
    });
  });

  describe('Morphological Formation Precedence', () => {
    morphologicalPrecedenceExamples.forEach((example, index) => {
      test(`${example.formation.join(' + ')} → ${example.result} (${example.meaning})`, () => {
        const result = analyzeCompoundPrecedence(example.formation);
        expect(result.isValid).toBe(true);
        expect(result.primary.part).toBe(example.primary);
        expect(['dhatu-pratyaya', 'dhatu-kridanta', 'pratipadika-vibhakti', 'upasarga-dhatu', 'compound-formation']).toContain(example.category);
      });
    });
  });

  describe('Vedic Literature and Ritual Precedence', () => {
    vedaicPrecedenceExamples.forEach((example, index) => {
      test(`${example.sequence[0]} leads ${example.sequence.length} elements - ${example.meaning}`, () => {
        const result = analyzeCompoundPrecedence(example.sequence);
        expect(result.isValid).toBe(true);
        expect(result.primary.part).toBe(example.primary);
        expect(['scriptural-precedence', 'ritual-precedence', 'deity-precedence']).toContain(example.category);
      });
    });
  });

  describe('Logical and Philosophical Precedence', () => {
    logicalPrecedenceExamples.forEach((example, index) => {
      test(`${example.sequence.join(' → ')} - ${example.meaning}`, () => {
        const result = analyzeCompoundPrecedence(example.sequence);
        expect(result.isValid).toBe(true);
        expect(result.primary.part).toBe(example.primary);
        expect(['causal-precedence', 'temporal-precedence', 'philosophical-precedence']).toContain(example.category);
      });
    });
  });

  describe('Sutra Application with Different Contexts', () => {
    test('applySutra116 should handle compound context', () => {
      const result = applySutra116(['rāma', 'sītā'], 'compound');
      expect(result.sutra.number).toBe('1.1.6');
      expect(result.context).toBe('compound');
      expect(result.analysis.isValid).toBe(true);
    });

    test('applySutra116 should handle rule context', () => {
      const rules = [
        { name: 'earlier-rule', order: 1 },
        { name: 'later-rule', order: 2 }
      ];
      const result = applySutra116(rules, 'rules');
      expect(result.analysis.isValid).toBe(true);
      expect(result.analysis.applicableRule.name).toBe('earlier-rule');
    });

    test('applySutra116 should handle phoneme context', () => {
      const result = applySutra116('क्त', 'phonemes');
      expect(result.analysis.isValid).toBe(true);
      expect(result.analysis.primaryPhoneme.phoneme).toBe('क');
    });
  });

  describe('Original Test Suite Integration (IAST)', () => {
    iastTestCases.forEach(({ elements, expected, type, meaning }) => {
      test(`${type}: ${Array.isArray(elements) ? elements.join('-') : elements} (${meaning})`, () => {
        let result;
        if (type === 'compound' || type === 'morphology') {
          result = analyzeCompoundPrecedence(elements);
        } else if (type === 'rules') {
          const ruleArray = elements.map((el, index) => ({ name: el, order: index }));
          result = determineRulePrecedence(ruleArray);
        } else if (type === 'phonemes') {
          result = analyzePhonemeSequence(elements);
        } else {
          result = determinePrecedence(elements, 0, 1);
        }
        expect(result.isValid).toBe(expected);
      });
    });
  });

  describe('Original Test Suite Integration (Devanagari)', () => {
    devanagariTestCases.forEach(({ elements, expected, type, meaning }) => {
      test(`${type}: ${Array.isArray(elements) ? elements.join('-') : elements} (${meaning})`, () => {
        let result;
        if (type === 'compound' || type === 'morphology') {
          result = analyzeCompoundPrecedence(elements);
        } else if (type === 'rules') {
          const ruleArray = elements.map((el, index) => ({ name: el, order: index }));
          result = determineRulePrecedence(ruleArray);
        } else if (type === 'phonemes') {
          result = analyzePhonemeSequence(elements);
        } else {
          result = determinePrecedence(elements, 0, 1);
        }
        expect(result.isValid).toBe(expected);
      });
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle empty arrays gracefully', () => {
      const result = analyzeCompoundPrecedence([]);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid compound parts');
    });

    test('should handle null inputs', () => {
      const result = determinePrecedence(null, 0, 1);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid elements array');
    });

    test('should handle invalid indices', () => {
      const result = determinePrecedence(['a', 'b'], -1, 5);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid indices');
    });

    test('should handle single element compounds', () => {
      const result = analyzeCompoundPrecedence(['single']);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('need at least 2 elements');
    });
  });

  describe('Performance and Consistency', () => {
    test('function consistency across multiple calls', () => {
      const testElements = ['first', 'second', 'third'];
      const results = [];
      for (let i = 0; i < 10; i++) {
        results.push(determinePrecedence(testElements, 0, 1));
      }
      expect(results.every(r => r.precedent === 'first')).toBe(true);
    });

    test('performance with large compound sequences', () => {
      const largeSequence = Array.from({length: 100}, (_, i) => `element${i}`);
      const startTime = Date.now();
      const result = analyzeCompoundPrecedence(largeSequence);
      const endTime = Date.now();
      expect(result.isValid).toBe(true);
      expect(endTime - startTime).toBeLessThan(100); // Should be fast
    });
  });

  describe('Sanskrit Grammar Integration', () => {
    test('should integrate with dhātu-pratyaya formations', () => {
      const formation = ['√कृ', 'ति'];
      const result = analyzeCompoundPrecedence(formation);
      expect(result.isValid).toBe(true);
      expect(result.primary.part).toBe('√कृ');
      expect(result.analysis).toContain('Primary');
    });

    test('should handle upasarga-dhātu combinations', () => {
      const combination = ['प्र', '√गम्'];
      const result = analyzeCompoundPrecedence(combination);
      expect(result.isValid).toBe(true);
      expect(result.primary.part).toBe('प्र');
    });

    test('should analyze complex Vedic compounds', () => {
      const vedicCompound = ['अग्नि', 'सोम', 'पवमान'];
      const result = analyzeCompoundPrecedence(vedicCompound);
      expect(result.isValid).toBe(true);
      expect(result.primary.part).toBe('अग्नि');
      expect(result.compoundType).toBe('बहुव्रीहि (bahuvrīhi)');
    });
  });

  describe('Cross-Sutra Integration', () => {
    test('should work with vṛddhi vowel precedence (1.1.1)', () => {
      const vowelSequence = ['ā', 'ai', 'au'];
      const result = analyzeCompoundPrecedence(vowelSequence);
      expect(result.isValid).toBe(true);
      expect(result.primary.part).toBe('ā');
    });

    test('should work with guṇa vowel precedence (1.1.2)', () => {
      const gunaSequence = ['a', 'e', 'o'];
      const result = analyzeCompoundPrecedence(gunaSequence);
      expect(result.isValid).toBe(true);
      expect(result.primary.part).toBe('a');
    });

    test('should integrate with ik vowel transformations (1.1.3)', () => {
      const ikSequence = ['i', 'u', 'ṛ'];
      const result = analyzeCompoundPrecedence(ikSequence);
      expect(result.isValid).toBe(true);
      expect(result.primary.part).toBe('i');
    });
  });
});
