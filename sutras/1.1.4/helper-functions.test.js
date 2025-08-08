/**
 * Unit Tests for Internal Helper Functions - Sutra 1.1.4
 * 
 * Comprehensive testing of internal helper functions used in dhātu-lopa analysis.
 * These tests provide granular validation of the complex rule-based logic.
 */

import {
  isMonosyllabic,
  hasCanonicalCVCStructure,
  analyzePhonologicalStructure,
  analyzeMorphologicalFunction,
  analyzeGrammaticalContext,
  getPhonologicalFeatures,
  hasFeature,
  shareFeature,
  analyzeAffixClassification,
  countSyllables,
  hasConsonantCluster,
  determineDistributionalClass,
  assessProductivity,
  analyzeHistoricalPattern,
  analyzeDhatuPhoneticStructure,
  extractNucleusVowel,
  extractConsonantPattern,
  analyzePhoneticEnvironment,
  evaluateLopaConduciveFeatures,
  calculateClusterDifficulty,
  isDhatuLopaEligible,
  analyzeDhatuLopa
} from './index.js';

describe('Sutra 1.1.4: Internal Helper Functions Unit Tests', () => {

  describe('Basic Phonological Analysis Functions', () => {
    
    describe('isMonosyllabic()', () => {
      test('should identify monosyllabic dhātus correctly', () => {
        expect(isMonosyllabic('gam')).toBe(true);
        expect(isMonosyllabic('kṛ')).toBe(true);
        expect(isMonosyllabic('bhū')).toBe(true);
        expect(isMonosyllabic('han')).toBe(true);
        expect(isMonosyllabic('pac')).toBe(true);
      });

      test('should identify multisyllabic dhātus correctly', () => {
        expect(isMonosyllabic('gaccha')).toBe(false);
        expect(isMonosyllabic('upagam')).toBe(false);
        expect(isMonosyllabic('adhyaya')).toBe(false);
      });

      test('should handle edge cases gracefully', () => {
        expect(isMonosyllabic('')).toBe(false);
        expect(isMonosyllabic('a')).toBe(true);
        expect(isMonosyllabic('i')).toBe(true);
      });
    });

    describe('hasCanonicalCVCStructure()', () => {
      test('should identify canonical CVC structure correctly', () => {
        expect(hasCanonicalCVCStructure('gam')).toBe(true);
        expect(hasCanonicalCVCStructure('pac')).toBe(true);
        expect(hasCanonicalCVCStructure('bhid')).toBe(true);
        expect(hasCanonicalCVCStructure('han')).toBe(true);
      });

      test('should reject non-canonical structures', () => {
        expect(hasCanonicalCVCStructure('kṛ')).toBe(false);   // CV
        expect(hasCanonicalCVCStructure('bhū')).toBe(false);  // CV
        expect(hasCanonicalCVCStructure('sthā')).toBe(false); // CCV
        expect(hasCanonicalCVCStructure('gaṅ')).toBe(false);  // Non-standard
      });

      test('should handle invalid input gracefully', () => {
        expect(hasCanonicalCVCStructure('')).toBe(false);
        expect(hasCanonicalCVCStructure('a')).toBe(false);
        expect(hasCanonicalCVCStructure('aa')).toBe(false);
      });
    });

    describe('countSyllables()', () => {
      test('should count syllables accurately', () => {
        expect(countSyllables('gam')).toBe(1);
        expect(countSyllables('kṛ')).toBe(1);
        expect(countSyllables('bhū')).toBe(1);
        expect(countSyllables('gaccha')).toBe(2);
        expect(countSyllables('adhyaya')).toBe(3);
      });

      test('should handle complex vowel combinations', () => {
        expect(countSyllables('gai')).toBe(1);
        expect(countSyllables('gaura')).toBe(2);
        expect(countSyllables('kaurava')).toBe(3);
      });

      test('should handle edge cases', () => {
        expect(countSyllables('')).toBe(0);
        expect(countSyllables('a')).toBe(1);
        expect(countSyllables('kṛṣṇa')).toBe(2);
      });
    });

    describe('hasConsonantCluster()', () => {
      test('should identify consonant clusters correctly', () => {
        expect(hasConsonantCluster('sthā')).toBe(true);
        expect(hasConsonantCluster('kṣip')).toBe(true);
        expect(hasConsonantCluster('spṛś')).toBe(true);
        expect(hasConsonantCluster('bhrajj')).toBe(true);
      });

      test('should reject words without clusters', () => {
        expect(hasConsonantCluster('gam')).toBe(false);
        expect(hasConsonantCluster('kṛ')).toBe(false);
        expect(hasConsonantCluster('bhū')).toBe(false);
        expect(hasConsonantCluster('pac')).toBe(false);
      });
    });
  });

  describe('Phonological Feature Analysis', () => {
    
    describe('getPhonologicalFeatures()', () => {
      test('should return correct features for stops', () => {
        const kFeatures = getPhonologicalFeatures('k');
        expect(kFeatures).toEqual({
          place: 'velar',
          manner: 'stop',
          voice: '-',
          aspiration: '-',
          nasal: '-'
        });

        const ghFeatures = getPhonologicalFeatures('gh');
        expect(ghFeatures).toEqual({
          place: 'velar',
          manner: 'stop',
          voice: '+',
          aspiration: '+',
          nasal: '-'
        });
      });

      test('should return correct features for nasals', () => {
        const nFeatures = getPhonologicalFeatures('n');
        expect(nFeatures.manner).toBe('nasal');
        expect(nFeatures.nasal).toBe('+');
        expect(nFeatures.voice).toBe('+');
      });

      test('should return correct features for semivowels', () => {
        const yFeatures = getPhonologicalFeatures('y');
        expect(yFeatures.manner).toBe('semivowel');
        expect(yFeatures.voice).toBe('+');
      });

      test('should handle unknown sounds gracefully', () => {
        expect(getPhonologicalFeatures('xyz')).toBeNull();
        expect(getPhonologicalFeatures('')).toBeNull();
      });
    });

    describe('hasFeature()', () => {
      test('should correctly identify features', () => {
        expect(hasFeature('k', 'place', 'velar')).toBe(true);
        expect(hasFeature('k', 'voice', '-')).toBe(true);
        expect(hasFeature('gh', 'aspiration', '+')).toBe(true);
        expect(hasFeature('n', 'nasal', '+')).toBe(true);
      });

      test('should reject incorrect features', () => {
        expect(hasFeature('k', 'place', 'dental')).toBe(false);
        expect(hasFeature('k', 'voice', '+')).toBe(false);
        expect(hasFeature('gh', 'aspiration', '-')).toBe(false);
      });

      test('should handle invalid input', () => {
        expect(hasFeature('xyz', 'place', 'velar')).toBe(false);
        expect(hasFeature('k', 'invalid', 'value')).toBe(false);
      });
    });

    describe('shareFeature()', () => {
      test('should identify shared features correctly', () => {
        expect(shareFeature('k', 'g', 'place')).toBe(true);  // both velar
        expect(shareFeature('k', 'kh', 'place')).toBe(true); // both velar
        expect(shareFeature('p', 'b', 'place')).toBe(true);  // both labial
      });

      test('should reject non-shared features', () => {
        expect(shareFeature('k', 't', 'place')).toBe(false); // velar vs dental
        expect(shareFeature('k', 'g', 'voice')).toBe(false); // - vs +
        expect(shareFeature('k', 'kh', 'aspiration')).toBe(false); // - vs +
      });
    });

    describe('calculateClusterDifficulty()', () => {
      test('should calculate higher difficulty for same place consonants', () => {
        const samePlace = calculateClusterDifficulty('k', 'g'); // both velar
        const diffPlace = calculateClusterDifficulty('k', 't'); // velar vs dental
        expect(samePlace).toBeGreaterThan(diffPlace);
      });

      test('should calculate reasonable difficulty scores', () => {
        const difficulty = calculateClusterDifficulty('s', 't');
        expect(difficulty).toBeGreaterThan(0);
        expect(difficulty).toBeLessThanOrEqual(1);
      });

      test('should handle invalid consonants', () => {
        const difficulty = calculateClusterDifficulty('xyz', 'abc');
        expect(difficulty).toBe(0.3); // fallback value
      });
    });
  });

  describe('Morphological Analysis Functions', () => {
    
    describe('analyzeAffixClassification()', () => {
      test('should classify ārdhadhātuka affixes correctly', () => {
        const tiAnalysis = analyzeAffixClassification('ti');
        expect(tiAnalysis.classification).toBe('ārdhadhātuka');
        expect(tiAnalysis.confidence).toBeGreaterThan(0.7);

        const thaAnalysis = analyzeAffixClassification('tha');
        expect(thaAnalysis.classification).toBe('ārdhadhātuka');
      });

      test('should classify kit affixes correctly', () => {
        const ktaAnalysis = analyzeAffixClassification('kta');
        expect(ktaAnalysis.classification).toBe('kit');
        expect(ktaAnalysis.confidence).toBeGreaterThan(0.8);
      });

      test('should classify tiṅ affixes correctly', () => {
        const miAnalysis = analyzeAffixClassification('mi');
        expect(miAnalysis.classification).toBe('tiṅ');
        expect(miAnalysis.confidence).toBeGreaterThan(0.7);
      });

      test('should handle unknown affixes', () => {
        const unknownAnalysis = analyzeAffixClassification('unknown');
        expect(unknownAnalysis.classification).toBe('unknown');
        expect(unknownAnalysis.confidence).toBeLessThan(0.5);
      });
    });

    describe('analyzeMorphologicalFunction()', () => {
      test('should analyze verbal endings correctly', () => {
        const tiFunction = analyzeMorphologicalFunction('ti');
        expect(tiFunction.category).toBe('verbal');
        expect(tiFunction.subcategory).toBe('present');
        expect(tiFunction.confidence).toBeGreaterThan(0.7);
      });

      test('should analyze participial affixes correctly', () => {
        const ktaFunction = analyzeMorphologicalFunction('kta');
        expect(ktaFunction.category).toBe('participial');
        expect(ktaFunction.subcategory).toBe('past');
        expect(ktaFunction.confidence).toBeGreaterThan(0.8);
      });

      test('should handle invalid affixes', () => {
        const invalidFunction = analyzeMorphologicalFunction('');
        expect(invalidFunction.category).toBe('unknown');
        expect(invalidFunction.confidence).toBe(0);
      });
    });

    describe('analyzeGrammaticalContext()', () => {
      test('should provide grammatical context for standard affixes', () => {
        const tiContext = analyzeGrammaticalContext('ti');
        expect(tiContext.context).toBe('present tense 3rd person singular');
        expect(tiContext.traditional).toContain('tiṅ');

        const ktaContext = analyzeGrammaticalContext('kta');
        expect(ktaContext.context).toBe('past participle (kṛdanta)');
        expect(ktaContext.traditional).toContain('kta');
      });

      test('should handle unknown affixes gracefully', () => {
        const unknownContext = analyzeGrammaticalContext('unknown');
        expect(unknownContext.context).toBe('unidentified affix');
        expect(unknownContext.traditional).toBe('unknown');
      });
    });

    describe('determineDistributionalClass()', () => {
      test('should classify productive affixes', () => {
        expect(determineDistributionalClass('ti')).toBe('highly_productive');
        expect(determineDistributionalClass('kta')).toBe('highly_productive');
        expect(determineDistributionalClass('ana')).toBe('productive');
      });

      test('should classify limited affixes', () => {
        expect(determineDistributionalClass('kvip')).toBe('limited');
        expect(determineDistributionalClass('kvi')).toBe('limited');
      });

      test('should handle unknown affixes', () => {
        expect(determineDistributionalClass('unknown')).toBe('unknown');
      });
    });

    describe('assessProductivity()', () => {
      test('should assess productivity with confidence scores', () => {
        const tiProductivity = assessProductivity('ti');
        expect(tiProductivity.level).toBe('high');
        expect(tiProductivity.score).toBeGreaterThan(0.8);

        const kvipProductivity = assessProductivity('kvip');
        expect(kvipProductivity.level).toBe('low');
        expect(kvipProductivity.score).toBeLessThan(0.4);
      });
    });
  });

  describe('Phonetic Structure Analysis Functions', () => {
    
    describe('analyzeDhatuPhoneticStructure()', () => {
      test('should analyze canonical CVC dhātus correctly', () => {
        const gamStructure = analyzeDhatuPhoneticStructure('gam');
        expect(gamStructure.pattern).toBe('CVC');
        expect(gamStructure.canonical).toBe(true);
        expect(gamStructure.syllables).toBe(1);
      });

      test('should analyze complex dhātus correctly', () => {
        const sthaStructure = analyzeDhatuPhoneticStructure('sthā');
        expect(sthaStructure.pattern).toBe('CCV');
        expect(sthaStructure.canonical).toBe(false);
        expect(sthaStructure.hasCluster).toBe(true);
      });

      test('should handle simple vowel-ending dhātus', () => {
        const bhuStructure = analyzeDhatuPhoneticStructure('bhū');
        expect(bhuStructure.pattern).toBe('CV');
        expect(bhuStructure.canonical).toBe(false);
        expect(bhuStructure.vowelEnding).toBe(true);
      });
    });

    describe('extractNucleusVowel()', () => {
      test('should extract nucleus vowels correctly', () => {
        expect(extractNucleusVowel('gam')).toBe('a');
        expect(extractNucleusVowel('kṛ')).toBe('ṛ');
        expect(extractNucleusVowel('bhū')).toBe('ū');
        expect(extractNucleusVowel('pac')).toBe('a');
      });

      test('should handle complex vowel patterns', () => {
        expect(extractNucleusVowel('gai')).toBe('ai');
        expect(extractNucleusVowel('gau')).toBe('au');
      });

      test('should handle edge cases', () => {
        expect(extractNucleusVowel('')).toBe('');
        expect(extractNucleusVowel('k')).toBe(''); // no vowel
      });
    });

    describe('extractConsonantPattern()', () => {
      test('should extract consonant patterns correctly', () => {
        expect(extractConsonantPattern('gam')).toBe('g_m');
        expect(extractConsonantPattern('pac')).toBe('p_c');
        expect(extractConsonantPattern('bhid')).toBe('bh_d');
      });

      test('should handle cluster patterns', () => {
        expect(extractConsonantPattern('sthā')).toBe('sth_');
        expect(extractConsonantPattern('kṣip')).toBe('kṣ_p');
      });

      test('should handle vowel-only or consonant-only inputs', () => {
        expect(extractConsonantPattern('ā')).toBe('');
        expect(extractConsonantPattern('k')).toBe('k');
      });
    });
  });

  describe('Advanced Analysis Functions', () => {
    
    describe('analyzePhoneticEnvironment()', () => {
      test('should analyze consonant-consonant juncture', () => {
        const environment = analyzePhoneticEnvironment('gam', 'ti');
        expect(environment.junctureType).toBe('consonant-consonant');
        expect(environment.features).toHaveProperty('difficulty');
        expect(environment.lopaConditions).toHaveProperty('applicable');
      });

      test('should analyze vowel-consonant juncture', () => {
        const environment = analyzePhoneticEnvironment('bhū', 'ti');
        expect(environment.junctureType).toBe('vowel-consonant');
        expect(environment.features.difficulty).toBeLessThan(0.5);
      });

      test('should provide comprehensive analysis', () => {
        const environment = analyzePhoneticEnvironment('han', 'kta');
        expect(environment).toHaveProperty('junctureType');
        expect(environment).toHaveProperty('features');
        expect(environment).toHaveProperty('lopaConditions');
        expect(environment).toHaveProperty('morphophonological');
      });
    });

    describe('evaluateLopaConduciveFeatures()', () => {
      test('should evaluate lopa conducive features correctly', () => {
        const mockFeatures1 = { difficulty: 0.8, similarity: 0.7 };
        const mockFeatures2 = { difficulty: 0.6, similarity: 0.5 };
        
        const evaluation = evaluateLopaConduciveFeatures(mockFeatures1, mockFeatures2);
        expect(evaluation).toHaveProperty('conduciveness');
        expect(evaluation.conduciveness).toBeGreaterThan(0);
        expect(evaluation.conduciveness).toBeLessThanOrEqual(1);
      });

      test('should provide detailed analysis', () => {
        const mockFeatures1 = { difficulty: 0.9, similarity: 0.8 };
        const mockFeatures2 = { difficulty: 0.3, similarity: 0.2 };
        
        const evaluation = evaluateLopaConduciveFeatures(mockFeatures1, mockFeatures2);
        expect(evaluation).toHaveProperty('factors');
        expect(evaluation).toHaveProperty('confidence');
        expect(evaluation).toHaveProperty('explanation');
      });
    });

    describe('isDhatuLopaEligible()', () => {
      test('should determine eligibility for standard cases', () => {
        const gamEligible = isDhatuLopaEligible('gam', 'ti', { canonical: true });
        expect(gamEligible).toHaveProperty('eligible');
        expect(gamEligible).toHaveProperty('confidence');
        expect(gamEligible).toHaveProperty('factors');

        const bhuEligible = isDhatuLopaEligible('bhū', 'ti', { canonical: false });
        expect(bhuEligible.eligible).toBe(false); // vowel-ending dhātus less likely
      });

      test('should provide confidence scores within valid range', () => {
        const eligibility = isDhatuLopaEligible('pac', 'kta', { canonical: true });
        expect(eligibility.confidence).toBeGreaterThan(0);
        expect(eligibility.confidence).toBeLessThanOrEqual(1);
      });
    });

    describe('analyzeDhatuLopa()', () => {
      test('should provide comprehensive dhātu-lopa analysis', () => {
        const analysis = analyzeDhatuLopa('gam', 'ti');
        expect(analysis).toHaveProperty('blocked');
        expect(analysis).toHaveProperty('confidence');
        expect(analysis).toHaveProperty('phonological');
        expect(analysis).toHaveProperty('morphological');
        expect(analysis).toHaveProperty('factors');
      });

      test('should analyze different dhātu-affix combinations', () => {
        const gamTi = analyzeDhatuLopa('gam', 'ti');
        const hanKta = analyzeDhatuLopa('han', 'kta');
        const bhuTi = analyzeDhatuLopa('bhū', 'ti');

        // All should provide valid analysis objects
        [gamTi, hanKta, bhuTi].forEach(analysis => {
          expect(typeof analysis.blocked).toBe('boolean');
          expect(typeof analysis.confidence).toBe('number');
          expect(analysis.confidence).toBeGreaterThan(0);
          expect(analysis.confidence).toBeLessThanOrEqual(1);
        });
      });
    });
  });

  describe('Historical and Distributional Analysis', () => {
    
    describe('analyzeHistoricalPattern()', () => {
      test('should provide historical analysis for standard affixes', () => {
        const tiHistory = analyzeHistoricalPattern('ti');
        expect(tiHistory).toHaveProperty('period');
        expect(tiHistory).toHaveProperty('stability');
        expect(tiHistory).toHaveProperty('changes');

        const ktaHistory = analyzeHistoricalPattern('kta');
        expect(ktaHistory.stability).toBe('stable');
      });

      test('should handle unknown affixes gracefully', () => {
        const unknownHistory = analyzeHistoricalPattern('unknown');
        expect(unknownHistory.period).toBe('unknown');
        expect(unknownHistory.stability).toBe('unknown');
      });
    });
  });

  describe('Confidence Score Validation', () => {
    
    test('should provide confidence scores in valid ranges', () => {
      const testCases = [
        { dhatu: 'gam', affix: 'ti' },
        { dhatu: 'pac', affix: 'kta' },
        { dhatu: 'bhū', affix: 'ana' },
        { dhatu: 'han', affix: 'kvip' }
      ];

      testCases.forEach(({ dhatu, affix }) => {
        const analysis = analyzeDhatuLopa(dhatu, affix);
        expect(analysis.confidence).toBeGreaterThan(0);
        expect(analysis.confidence).toBeLessThanOrEqual(1);
        
        // Confidence should be a finite number
        expect(Number.isFinite(analysis.confidence)).toBe(true);
      });
    });

    test('should provide higher confidence for clear cases', () => {
      const clearCase = analyzeDhatuLopa('gam', 'ti'); // standard case
      const ambiguousCase = analyzeDhatuLopa('unknown', 'unknown'); // unclear case
      
      if (clearCase.confidence && ambiguousCase.confidence) {
        expect(clearCase.confidence).toBeGreaterThanOrEqual(ambiguousCase.confidence);
      }
    });
  });

  describe('Error Handling and Edge Cases', () => {
    
    test('should handle empty string inputs gracefully', () => {
      expect(() => isMonosyllabic('')).not.toThrow();
      expect(() => hasCanonicalCVCStructure('')).not.toThrow();
      expect(() => analyzeDhatuLopa('', '')).not.toThrow();
    });

    test('should handle null and undefined inputs gracefully', () => {
      expect(() => getPhonologicalFeatures(null)).not.toThrow();
      expect(() => analyzeAffixClassification(undefined)).not.toThrow();
      expect(() => countSyllables(null)).not.toThrow();
    });

    test('should handle non-string inputs gracefully', () => {
      expect(() => isMonosyllabic(123)).not.toThrow();
      expect(() => hasCanonicalCVCStructure({})).not.toThrow();
      expect(() => analyzeDhatuLopa([], null)).not.toThrow();
    });
  });
});

describe('Integration Testing with Main Function', () => {
  
  test('should integrate helper functions correctly in main analysis', () => {
    const mainAnalysis = analyzeDhatuLopa('gam', 'ti');
    
    // Verify that helper function results are properly integrated
    expect(mainAnalysis).toHaveProperty('phonological');
    expect(mainAnalysis).toHaveProperty('morphological');
    expect(mainAnalysis.phonological).toHaveProperty('structure');
    expect(mainAnalysis.morphological).toHaveProperty('classification');
  });

  test('should maintain consistency between helper functions and main analysis', () => {
    const dhatu = 'pac';
    const affix = 'kta';
    
    const mainAnalysis = analyzeDhatuLopa(dhatu, affix);
    const separateStructure = analyzeDhatuPhoneticStructure(dhatu);
    const separateClassification = analyzeAffixClassification(affix);
    
    // Main analysis should be consistent with separate function calls
    expect(mainAnalysis.phonological.structure.pattern).toBe(separateStructure.pattern);
    expect(mainAnalysis.morphological.classification.classification).toBe(separateClassification.classification);
  });
});
