import { getUpadha, analyzeUpadha } from './index.js';

describe('Sutra 1.1.65: alo\'ntyāt pūrva upadhā', () => {
  describe('getUpadha() - Basic Functionality', () => {
    describe('IAST Script', () => {
      it("should return 'ā' for 'rāj'", () => {
        expect(getUpadha('rāj')).toBe('ā');
      });

      it("should return 'a' for 'path'", () => {
        expect(getUpadha('path')).toBe('a');
      });

      it("should return 'i' for 'bhid'", () => {
        expect(getUpadha('bhid')).toBe('i');
      });

      it("should return 'a' for 'manas'", () => {
        expect(getUpadha('manas')).toBe('a');
      });

      it("should return 'v' for 'deva'", () => {
        expect(getUpadha('deva')).toBe('v');
      });
    });

    describe('Devanagari Script', () => {
      it("should return 'ज' for 'राज्'", () => {
        // r-ā-j-halant -> tokenize -> र, ा, ज, ्
        expect(getUpadha('राज्')).toBe('ज');
      });

      it("should return 'थ' for 'पथ्'", () => {
        // p-a-th-halant -> tokenize -> प, अ, थ, ्
        expect(getUpadha('पथ्')).toBe('थ');
      });

      it("should return 'द' for 'भिद्'", () => {
        // bh-i-d-halant -> tokenize -> भ, ि, द, ्
        expect(getUpadha('भिद्')).toBe('द');
      });

      it("should return 'स' for 'मनस्'", () => {
        // m-a-n-a-s-halant -> tokenize -> म, अ, न, अ, स, ्
        expect(getUpadha('मनस्')).toBe('स');
      });

      it("should return 'व' for 'देव'", () => {
        // d-e-v-a -> tokenize -> द, े, व, अ
        expect(getUpadha('देव')).toBe('व');
      });
    });

    describe('Edge Cases', () => {
      it('should return an empty string for words with less than two phonemes', () => {
        expect(getUpadha('a')).toBe(''); // Single IAST vowel
        expect(getUpadha('क')).toBe('क'); // Single Devanagari consonant becomes [क, अ], so penultimate is क
      });

      it('should return an empty string for empty or invalid input', () => {
        expect(getUpadha('')).toBe('');
        expect(getUpadha(null)).toBe('');
        expect(getUpadha(undefined)).toBe('');
        expect(getUpadha(123)).toBe('');
      });
    });
  });

  describe('analyzeUpadha() - Comprehensive Analysis', () => {
    describe('Core Functionality', () => {
      it('should analyze upadhā for simple word', () => {
        const result = analyzeUpadha('rāj');
        
        expect(result.upadhaAnalysis.upadhaPhoneme).toBe('ā');
        expect(result.upadhaAnalysis.finalPhoneme).toBe('j');
        expect(result.upadhaAnalysis.hasValidUpadha).toBe(true);
        expect(result.input.script).toBe('iast');
        expect(result.sutraReference.number).toBe('1.1.65');
      });

      it('should analyze upadhā for Devanagari word', () => {
        const result = analyzeUpadha('राज्');
        
        expect(result.upadhaAnalysis.upadhaPhoneme).toBe('ज');
        expect(result.upadhaAnalysis.hasValidUpadha).toBe(true);
        expect(result.input.script).toBe('devanagari');
      });

      it('should provide sutra reference and rule', () => {
        const result = analyzeUpadha('manas');
        
        expect(result.sutraReference.number).toBe('1.1.65');
        expect(result.sutraReference.sanskrit).toBe('अलोऽन्त्यात् पूर्व उपधा');
        expect(result.sutraReference.iast).toBe('alo\'ntyāt pūrva upadhā');
        expect(result.sutraReference.type).toBe('saṃjñā');
      });
    });

    describe('Upadhā Segment Analysis', () => {
      it('should identify upadhā position correctly', () => {
        const result = analyzeUpadha('bhid');
        
        expect(result.upadhaAnalysis.upadhaPhoneme).toBe('i');
        expect(result.upadhaAnalysis.finalPhoneme).toBe('d');
        expect(result.upadhaAnalysis.position).toBe(1); // Position 1 (0-indexed)
        expect(result.upadhaAnalysis.totalPhonemes).toBe(3);
      });

      it('should handle word with vowel upadhā', () => {
        const result = analyzeUpadha('rāj');
        
        expect(result.upadhaAnalysis.upadhaPhoneme).toBe('ā');
        expect(result.upadhaAnalysis.totalPhonemes).toBe(3);
        expect(result.upadhaAnalysis.hasValidUpadha).toBe(true);
      });

      it('should handle word with consonant upadhā', () => {
        const result = analyzeUpadha('deva');
        
        expect(result.upadhaAnalysis.upadhaPhoneme).toBe('v');
        expect(result.upadhaAnalysis.finalPhoneme).toBe('a');
        expect(result.upadhaAnalysis.hasValidUpadha).toBe(true);
      });
    });

    describe('Morphological Analysis', () => {
      it('should analyze morphological properties for vowel upadhā', () => {
        const result = analyzeUpadha('rāj');
        
        expect(result.morphologicalAnalysis.word).toBe('rāj');
        expect(result.morphologicalAnalysis.upadhaPhoneme).toBe('ā');
        expect(result.morphologicalAnalysis.isVowelUpadha).toBe(true);
        expect(result.morphologicalAnalysis.morphologicalType).toBe('long_vowel');
        expect(result.morphologicalAnalysis.position).toBe('penultimate');
      });

      it('should analyze morphological properties for consonant upadhā', () => {
        const result = analyzeUpadha('deva');
        
        expect(result.morphologicalAnalysis.upadhaPhoneme).toBe('v');
        expect(result.morphologicalAnalysis.isVowelUpadha).toBe(false);
        expect(result.morphologicalAnalysis.morphologicalType).toBe('consonant');
        expect(result.morphologicalAnalysis.grammaticalRole).toBe('consonant_reference');
      });

      it('should identify grammatical role for vowel upadhā', () => {
        const result = analyzeUpadha('bhid');
        
        expect(result.morphologicalAnalysis.isVowelUpadha).toBe(true);
        expect(result.morphologicalAnalysis.grammaticalRole).toBe('vowel_gradation_target');
        expect(result.morphologicalAnalysis.morphologicalType).toBe('short_vowel');
      });
    });

    describe('Phonetic Analysis', () => {
      it('should analyze phonetic properties of vowel upadhā', () => {
        const result = analyzeUpadha('rāj');
        
        expect(result.phoneticAnalysis.upadhaPhoneme).toBe('ā');
        expect(result.phoneticAnalysis.phoneticCategory).toBe('vowel');
        expect(result.phoneticAnalysis.articulationPoint).toBe('kaṇṭha');
        expect(result.phoneticAnalysis.phoneticProperties.isVowel).toBe(true);
      });

      it('should analyze phonetic properties of consonant upadhā', () => {
        const result = analyzeUpadha('deva');
        
        expect(result.phoneticAnalysis.upadhaPhoneme).toBe('v');
        expect(result.phoneticAnalysis.phoneticCategory).toBe('semivowel');
        expect(result.phoneticAnalysis.phoneticProperties.isVowel).toBe(false);
        expect(result.phoneticAnalysis.contextualPosition).toBe('penultimate');
      });

      it('should classify different vowel types', () => {
        const short = analyzeUpadha('bhid');
        const long = analyzeUpadha('rāj');
        
        expect(short.phoneticAnalysis.phoneticProperties.vowelType).toBe('short_vowel');
        expect(long.phoneticAnalysis.phoneticProperties.vowelType).toBe('long_vowel');
      });
    });

    describe('Structural Analysis', () => {
      it('should provide structural information', () => {
        const result = analyzeUpadha('manas');
        
        expect(result.structuralAnalysis.definition).toBeDefined();
        expect(result.structuralAnalysis.structuralType).toBe('phoneme_position');
        expect(result.structuralAnalysis.positionScope).toBe('penultimate');
        expect(result.structuralAnalysis.grammaticalFunction).toBe('morphophonemic_reference');
      });

      it('should include related concepts', () => {
        const result = analyzeUpadha('rāj');
        
        expect(result.structuralAnalysis.relatedConcepts).toContain('अन्त्य');
        expect(result.structuralAnalysis.relatedConcepts).toContain('आदि');
        expect(result.structuralAnalysis.relatedConcepts).toContain('गुण');
        expect(result.structuralAnalysis.relatedConcepts).toContain('वृद्धि');
      });
    });

    describe('Traditional Commentary', () => {
      it('should include Kashika commentary', () => {
        const result = analyzeUpadha('bhid');
        
        expect(result.traditionalCommentary.kashika.sanskrit).toBeDefined();
        expect(result.traditionalCommentary.kashika.iast).toBeDefined();
        expect(result.traditionalCommentary.kashika.english).toBeDefined();
      });

      it('should include Mahabhashya commentary', () => {
        const result = analyzeUpadha('rāj');
        
        expect(result.traditionalCommentary.mahabhashya.sanskrit).toBeDefined();
        expect(result.traditionalCommentary.mahabhashya.iast).toBeDefined();
        expect(result.traditionalCommentary.mahabhashya.english).toBeDefined();
      });
    });

    describe('Confidence Scoring', () => {
      it('should assign high confidence to vowel upadhā cases', () => {
        const result = analyzeUpadha('rāj');
        
        expect(result.confidence).toBeGreaterThan(80);
        expect(result.confidence).toBeLessThanOrEqual(100);
      });

      it('should assign medium-high confidence to consonant upadhā', () => {
        const result = analyzeUpadha('deva');
        
        expect(result.confidence).toBeGreaterThan(70);
        expect(result.confidence).toBeLessThan(95);
      });

      it('should assign low confidence to words without valid upadhā', () => {
        const result = analyzeUpadha('a');
        
        expect(result.confidence).toBeLessThan(30);
      });

      it('should assign higher confidence to longer words', () => {
        const short = analyzeUpadha('rāj');
        const long = analyzeUpadha('manas');
        
        expect(long.confidence).toBeGreaterThanOrEqual(short.confidence);
      });

      it('should cap confidence at 100', () => {
        const result = analyzeUpadha('manas');
        
        expect(result.confidence).toBeLessThanOrEqual(100);
      });
    });

    describe('Input Validation', () => {
      it('should handle invalid input gracefully', () => {
        const result = analyzeUpadha('');
        
        expect(result.error).toBeDefined();
        expect(result.confidence).toBe(0);
        expect(result.upadhaAnalysis.hasValidUpadha).toBe(false);
      });

      it('should handle undefined input', () => {
        const result = analyzeUpadha(undefined);
        
        expect(result.error).toBeDefined();
        expect(result.confidence).toBe(0);
      });

      it('should handle non-Sanskrit input', () => {
        const result = analyzeUpadha('hello');
        
        expect(result.error).toBeDefined();
        expect(result.confidence).toBe(0);
      });

      it('should handle object input with word property', () => {
        const result = analyzeUpadha({ word: 'rāj' });
        
        expect(result.upadhaAnalysis.upadhaPhoneme).toBe('ā');
        expect(result.confidence).toBeGreaterThan(0);
      });
    });

    describe('Complex Cases', () => {
      it('should handle words with multiple vowels', () => {
        const result = analyzeUpadha('manas');
        
        expect(result.upadhaAnalysis.hasValidUpadha).toBe(true);
        expect(result.upadhaAnalysis.upadhaPhoneme).toBe('a');
        expect(result.confidence).toBeGreaterThan(0);
      });

      it('should handle single phoneme words (no upadhā)', () => {
        const result = analyzeUpadha('a');
        
        expect(result.upadhaAnalysis.hasValidUpadha).toBe(false);
        expect(result.upadhaAnalysis.upadhaPhoneme).toBe(null);
        expect(result.confidence).toBeLessThan(30);
      });

      it('should handle complex Devanagari words', () => {
        const result = analyzeUpadha('मनस्');
        
        expect(result.upadhaAnalysis.hasValidUpadha).toBe(true);
        expect(result.input.script).toBe('devanagari');
        expect(result.confidence).toBeGreaterThan(0);
      });
    });
  });
});
