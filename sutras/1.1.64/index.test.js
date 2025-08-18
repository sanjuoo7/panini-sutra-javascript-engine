import { getTi, analyzeTi } from './index.js';

describe('Sutra 1.1.64: aco\'ntyādi ṭi', () => {
  describe('getTi() - Basic Functionality', () => {
    describe('IAST Script', () => {
      it("should return 'ak' for 'śak'", () => {
        expect(getTi('śak')).toBe('ak');
      });

      it("should return 'as' for 'manas'", () => {
        expect(getTi('manas')).toBe('as');
      });

      it("should return 'as' for 'vidvas'", () => {
        expect(getTi('vidvas')).toBe('as');
      });

      it("should return 'i' for 'kavi'", () => {
        expect(getTi('kavi')).toBe('i');
      });

      it("should return 'ī' for 'nadī'", () => {
        expect(getTi('nadī')).toBe('ī');
      });

      it("should return 'an' for 'rājan'", () => {
        expect(getTi('rājan')).toBe('an');
      });
    });

    describe('Devanagari Script', () => {
      it("should return 'अक्' for 'शक्'", () => {
        expect(getTi('शक्')).toBe('अक्');
      });

      it("should return 'अस्' for 'मनस्'", () => {
        expect(getTi('मनस्')).toBe('अस्');
      });

      it("should return 'ि' for 'कवि'", () => {
        expect(getTi('कवि')).toBe('ि');
      });

      it("should return 'ी' for 'नदी'", () => {
        expect(getTi('नदी')).toBe('ी');
      });

      it("should return 'अन्' for 'राजन्'", () => {
        expect(getTi('राजन्')).toBe('अन्');
      });
    });

    describe('Edge Cases', () => {
      it('should return "ṛt" for "vṛt"', () => {
        expect(getTi('vṛt')).toBe('ṛt'); // ṛ is a vowel
      });

      it('should return an empty string for a word with no vowels', () => {
        expect(getTi('hld')).toBe(''); // No vowel
      });

      it('should return an empty string for an empty string input', () => {
        expect(getTi('')).toBe('');
      });

      it('should return an empty string for non-string inputs', () => {
        expect(getTi(null)).toBe('');
        expect(getTi(undefined)).toBe('');
        expect(getTi(123)).toBe('');
        expect(getTi({})).toBe('');
      });

      it('should handle words with only one vowel', () => {
        expect(getTi('a')).toBe('a');
        expect(getTi('इ')).toBe('इ');
      });

      it('should handle words ending in a vowel', () => {
        expect(getTi('deva')).toBe('a');
        expect(getTi('देव')).toBe('अ'); // Last vowel onwards - the inherent 'a' is the last vowel
      });
    });
  });

  describe('analyzeTi() - Comprehensive Analysis', () => {
    describe('Core Functionality', () => {
      it('should analyze ṭi for simple word', () => {
        const result = analyzeTi('śak');
        
        expect(result.tiAnalysis.tiSegment).toBe('ak');
        expect(result.tiAnalysis.lastVowel).toBe('a');
        expect(result.tiAnalysis.hasValidTi).toBe(true);
        expect(result.input.script).toBe('iast');
        expect(result.sutraReference.number).toBe('1.1.64');
      });

      it('should analyze ṭi for Devanagari word', () => {
        const result = analyzeTi('मनस्');
        
        expect(result.tiAnalysis.tiSegment).toBe('अस्');
        expect(result.tiAnalysis.hasValidTi).toBe(true);
        expect(result.input.script).toBe('devanagari');
      });

      it('should provide sutra reference and rule', () => {
        const result = analyzeTi('kavi');
        
        expect(result.sutraReference.number).toBe('1.1.64');
        expect(result.sutraReference.sanskrit).toBe('अचोऽन्त्यादि टि');
        expect(result.sutraReference.iast).toBe('aco\'ntyādi ṭi');
        expect(result.sutraReference.type).toBe('saṃjñā');
      });
    });

    describe('Ti Segment Analysis', () => {
      it('should identify ti segment correctly', () => {
        const result = analyzeTi('rājan');
        
        expect(result.tiAnalysis.tiSegment).toBe('an');
        expect(result.tiAnalysis.lastVowel).toBe('a');
        expect(result.tiAnalysis.lastVowelPosition).toBeGreaterThanOrEqual(0);
        expect(result.tiAnalysis.allVowels.length).toBeGreaterThan(0);
      });

      it('should handle word with multiple vowels', () => {
        const result = analyzeTi('vidvas');
        
        expect(result.tiAnalysis.tiSegment).toBe('as');
        expect(result.tiAnalysis.allVowels.length).toBe(2); // i and a
        expect(result.tiAnalysis.lastVowel).toBe('a');
      });

      it('should handle word ending in vowel', () => {
        const result = analyzeTi('deva');
        
        expect(result.tiAnalysis.tiSegment).toBe('a');
        expect(result.tiAnalysis.lastVowel).toBe('a');
        expect(result.tiAnalysis.hasValidTi).toBe(true);
      });
    });

    describe('Morphological Analysis', () => {
      it('should analyze morphological properties', () => {
        const result = analyzeTi('manas');
        
        expect(result.morphologicalAnalysis.word).toBe('manas');
        expect(result.morphologicalAnalysis.tiSegment).toBe('as');
        expect(result.morphologicalAnalysis.wordLength).toBeGreaterThan(0);
        expect(result.morphologicalAnalysis.tiLength).toBe(2);
        expect(result.morphologicalAnalysis.isWholeWord).toBe(false);
      });

      it('should calculate ti ratio', () => {
        const result = analyzeTi('ak');
        
        expect(result.morphologicalAnalysis.tiRatio).toBe(1); // Whole word is ti
        expect(result.morphologicalAnalysis.isWholeWord).toBe(true);
      });

      it('should determine morphological type', () => {
        const result = analyzeTi('śak');
        
        expect(result.morphologicalAnalysis.morphologicalType).toBeDefined();
        expect(result.morphologicalAnalysis.segmentPosition).toBe('final');
      });
    });

    describe('Phonetic Analysis', () => {
      it('should analyze phonetic structure', () => {
        const result = analyzeTi('śak');
        
        expect(result.phoneticAnalysis.tiSegment).toBe('ak');
        expect(result.phoneticAnalysis.phonemes.length).toBeGreaterThan(0);
        expect(result.phoneticAnalysis.vowelCount).toBeGreaterThan(0);
        expect(result.phoneticAnalysis.consonantCount).toBeGreaterThanOrEqual(0);
      });

      it('should identify phonetic patterns', () => {
        const result = analyzeTi('rājan');
        
        expect(result.phoneticAnalysis.phoneticStructure).toBeDefined();
        expect(result.phoneticAnalysis.phoneticPattern).toBeDefined();
        expect(result.phoneticAnalysis.endsInConsonant).toBe(true);
      });

      it('should handle vowel-ending words', () => {
        const result = analyzeTi('kavi');
        
        expect(result.phoneticAnalysis.endsInConsonant).toBe(false);
        expect(result.phoneticAnalysis.phoneticPattern).toBeDefined();
      });
    });

    describe('Structural Analysis', () => {
      it('should provide structural information', () => {
        const result = analyzeTi('manas');
        
        expect(result.structuralAnalysis.definition).toBeDefined();
        expect(result.structuralAnalysis.structuralType).toBe('word_segment');
        expect(result.structuralAnalysis.segmentScope).toBe('final_vowel_to_end');
        expect(result.structuralAnalysis.grammaticalFunction).toBe('morphophonemic_unit');
      });

      it('should include related concepts', () => {
        const result = analyzeTi('śak');
        
        expect(result.structuralAnalysis.relatedConcepts).toContain('अङ्ग');
        expect(result.structuralAnalysis.relatedConcepts).toContain('प्रत्यय');
        expect(result.structuralAnalysis.relatedConcepts).toContain('संधि');
      });
    });

    describe('Traditional Commentary', () => {
      it('should include Kashika commentary', () => {
        const result = analyzeTi('rājan');
        
        expect(result.traditionalCommentary.kashika.sanskrit).toBeDefined();
        expect(result.traditionalCommentary.kashika.iast).toBeDefined();
        expect(result.traditionalCommentary.kashika.english).toBeDefined();
      });

      it('should include Mahabhashya commentary', () => {
        const result = analyzeTi('śak');
        
        expect(result.traditionalCommentary.mahabhashya.sanskrit).toBeDefined();
        expect(result.traditionalCommentary.mahabhashya.iast).toBeDefined();
        expect(result.traditionalCommentary.mahabhashya.english).toBeDefined();
      });
    });

    describe('Confidence Scoring', () => {
      it('should assign high confidence to clear ti cases', () => {
        const result = analyzeTi('śak');
        
        expect(result.confidence).toBeGreaterThan(80);
        expect(result.confidence).toBeLessThanOrEqual(100);
      });

      it('should assign medium confidence to partial cases', () => {
        const result = analyzeTi('a');
        
        expect(result.confidence).toBeGreaterThan(50);
        expect(result.confidence).toBeLessThan(95);
      });

      it('should assign low confidence to invalid cases', () => {
        const result = analyzeTi('xyz');
        
        expect(result.confidence).toBeLessThan(50);
      });

      it('should cap confidence at 100', () => {
        const result = analyzeTi('manas');
        
        expect(result.confidence).toBeLessThanOrEqual(100);
      });
    });

    describe('Input Validation', () => {
      it('should handle invalid input gracefully', () => {
        const result = analyzeTi('');
        
        expect(result.error).toBeDefined();
        expect(result.confidence).toBe(0);
        expect(result.tiAnalysis.hasValidTi).toBe(false);
      });

      it('should handle undefined input', () => {
        const result = analyzeTi(undefined);
        
        expect(result.error).toBeDefined();
        expect(result.confidence).toBe(0);
      });

      it('should handle non-Sanskrit input', () => {
        const result = analyzeTi('hello');
        
        expect(result.error).toBeDefined();
        expect(result.confidence).toBe(0);
      });

      it('should handle object input with word property', () => {
        const result = analyzeTi({ word: 'śak' });
        
        expect(result.tiAnalysis.tiSegment).toBe('ak');
        expect(result.confidence).toBeGreaterThan(0);
      });
    });

    describe('Complex Cases', () => {
      it('should handle long words with multiple vowels', () => {
        const result = analyzeTi('bharatiya');
        
        expect(result.tiAnalysis.hasValidTi).toBe(true);
        expect(result.tiAnalysis.allVowels.length).toBeGreaterThan(2);
        expect(result.confidence).toBeGreaterThan(0);
      });

      it('should handle words with no valid ti', () => {
        const result = analyzeTi('str');
        
        expect(result.tiAnalysis.hasValidTi).toBe(false);
        expect(result.tiAnalysis.tiSegment).toBe('');
        expect(result.confidence).toBeLessThan(30);
      });
    });
  });
});
