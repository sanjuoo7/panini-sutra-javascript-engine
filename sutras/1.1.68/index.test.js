import { 
  isSvaRupaUsage, 
  analyzeWordUsage, 
  getWordInterpretation, 
  requiresSvaRupaInterpretation, 
  getSvaRupaExamples 
} from './index.js';

describe('Sutra 1.1.68: स्वं रूपं शब्दस्याशब्दसंज्ञा', () => {
  describe('isSvaRupaUsage function', () => {
    describe('Metalinguistic usage indicators', () => {
      it('should return true for grammatical discussion context', () => {
        expect(isSvaRupaUsage('अ', { isGrammaticalDiscussion: true })).toBe(true);
        expect(isSvaRupaUsage('गो', { isGrammaticalDiscussion: true })).toBe(true);
      });

      it('should return true for phoneme reference', () => {
        expect(isSvaRupaUsage('क', { isPhonemeReference: true })).toBe(true);
        expect(isSvaRupaUsage('अ', { isPhonemeReference: true })).toBe(true);
      });

      it('should return true for morpheme reference', () => {
        expect(isSvaRupaUsage('सुप्', { isMorphemeReference: true })).toBe(true);
        expect(isSvaRupaUsage('तिङ्', { isMorphemeReference: true })).toBe(true);
      });

      it('should return true for technical terms', () => {
        expect(isSvaRupaUsage('प्रत्याहार', { isTechnicalTerm: true })).toBe(true);
        expect(isSvaRupaUsage('विभक्ति', { isTechnicalTerm: true })).toBe(true);
      });

      it('should return true for quoted terms', () => {
        expect(isSvaRupaUsage('राम', { isQuoted: true })).toBe(true);
        expect(isSvaRupaUsage('अच्', { isQuoted: true })).toBe(true);
      });

      it('should return true for grammatical rules', () => {
        expect(isSvaRupaUsage('हल्', { isInGrammaticalRule: true })).toBe(true);
        expect(isSvaRupaUsage('अच्', { isInGrammaticalRule: true })).toBe(true);
      });

      it('should return true for explicit metalinguistic marking', () => {
        expect(isSvaRupaUsage('गो', { metalinguistic: true })).toBe(true);
        expect(isSvaRupaUsage('अ', { metalinguistic: true })).toBe(true);
      });
    });

    describe('Non-metalinguistic usage', () => {
      it('should return false for normal semantic context', () => {
        expect(isSvaRupaUsage('राम', {})).toBe(false);
        expect(isSvaRupaUsage('गो', {})).toBe(false);
        expect(isSvaRupaUsage('वृक्ष', {})).toBe(false);
      });

      it('should return false for semantic usage indicators', () => {
        expect(isSvaRupaUsage('गो', { isGrammaticalDiscussion: false })).toBe(false);
        expect(isSvaRupaUsage('राम', { metalinguistic: false })).toBe(false);
      });
    });

    describe('Edge cases', () => {
      it('should return false for invalid inputs', () => {
        expect(isSvaRupaUsage('', { isGrammaticalDiscussion: true })).toBe(false);
        expect(isSvaRupaUsage(null, { isGrammaticalDiscussion: true })).toBe(false);
        expect(isSvaRupaUsage(undefined, { isGrammaticalDiscussion: true })).toBe(false);
        expect(isSvaRupaUsage(123, { isGrammaticalDiscussion: true })).toBe(false);
      });
    });
  });

  describe('analyzeWordUsage function', () => {
    describe('Metalinguistic usage analysis', () => {
      it('should correctly analyze grammatical discussion context', () => {
        const result = analyzeWordUsage('अ', { isGrammaticalDiscussion: true });
        expect(result.isSvaRupa).toBe(true);
        expect(result.interpretationType).toBe('metalinguistic');
        expect(result.usageContext).toBe('grammatical-discussion');
        expect(result.confidence).toBe(0.9);
        expect(result.reasoning).toContain('Word used in metalinguistic context');
        expect(result.linguisticNotes).toContain('अशब्दसंज्ञा - used as mere designation');
        expect(result.sutraReference).toBe('1.1.68');
      });

      it('should analyze quoted terms as metalinguistic', () => {
        const result = analyzeWordUsage('गो', { quotedTerm: true });
        expect(result.isSvaRupa).toBe(true);
        expect(result.interpretationType).toBe('metalinguistic');
        expect(result.confidence).toBe(1.0);
        expect(result.reasoning).toContain('Term appears in quotes/citation');
      });

      it('should handle व्याकरणशास्त्र context', () => {
        const result = analyzeWordUsage('सुप्', { inVyakaranaShastra: true });
        expect(result.isSvaRupa).toBe(true);
        expect(result.interpretationType).toBe('metalinguistic');
        expect(result.confidence).toBe(0.95);
        expect(result.reasoning).toContain('Context: Grammatical treatise (व्याकरणशास्त्र)');
        expect(result.reasoning).toContain('In grammatical context, likely metalinguistic usage');
      });
    });

    describe('Semantic usage analysis', () => {
      it('should correctly analyze normal semantic usage', () => {
        const result = analyzeWordUsage('राम', {});
        expect(result.isSvaRupa).toBe(false);
        expect(result.interpretationType).toBe('semantic');
        expect(result.usageContext).toBe('normal');
        expect(result.confidence).toBe(0.8);
        expect(result.reasoning).toContain('Word used in normal semantic context');
        expect(result.linguisticNotes).toContain('शब्द - used with its regular meaning/function');
      });

      it('should handle regular nouns in sentences', () => {
        const result = analyzeWordUsage('गो', { inSentence: true });
        expect(result.isSvaRupa).toBe(false);
        expect(result.interpretationType).toBe('semantic');
        expect(result.reasoning).toContain('Word used in normal semantic context');
      });
    });

    describe('Script detection', () => {
      it('should detect IAST script', () => {
        const result = analyzeWordUsage('rama', { isGrammaticalDiscussion: true });
        expect(result.script).toBe('IAST');
      });

      it('should detect Devanagari script', () => {
        const result = analyzeWordUsage('राम', { isGrammaticalDiscussion: true });
        expect(result.script).toBe('Devanagari');
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        const result = analyzeWordUsage('', { isGrammaticalDiscussion: true });
        expect(result.isSvaRupa).toBe(false);
        expect(result.reasoning).toContain('Invalid input: word must be a non-empty string');
      });

      it('should handle null/undefined inputs', () => {
        const result1 = analyzeWordUsage(null, { isGrammaticalDiscussion: true });
        expect(result1.isSvaRupa).toBe(false);
        
        const result2 = analyzeWordUsage(undefined, { isGrammaticalDiscussion: true });
        expect(result2.isSvaRupa).toBe(false);
      });
    });
  });

  describe('getWordInterpretation function', () => {
    describe('Metalinguistic interpretation', () => {
      it('should return ashabda-samjna for metalinguistic usage', () => {
        expect(getWordInterpretation('अ', { isGrammaticalDiscussion: true })).toBe('ashabda-samjna');
        expect(getWordInterpretation('गो', { isPhonemeReference: true })).toBe('ashabda-samjna');
        expect(getWordInterpretation('सुप्', { isTechnicalTerm: true })).toBe('ashabda-samjna');
        expect(getWordInterpretation('राम', { quotedTerm: true })).toBe('ashabda-samjna');
      });

      it('should return ashabda-samjna for व्याकरणशास्त्र context', () => {
        expect(getWordInterpretation('तिङ्', { inVyakaranaShastra: true })).toBe('ashabda-samjna');
        expect(getWordInterpretation('प्रत्यय', { inVyakaranaShastra: true })).toBe('ashabda-samjna');
      });
    });

    describe('Semantic interpretation', () => {
      it('should return shabda for normal semantic usage', () => {
        expect(getWordInterpretation('राम', {})).toBe('shabda');
        expect(getWordInterpretation('गो', {})).toBe('shabda');
        expect(getWordInterpretation('वृक्ष', {})).toBe('shabda');
      });

      it('should return shabda for words in sentences', () => {
        expect(getWordInterpretation('देव', { inSentence: true })).toBe('shabda');
        expect(getWordInterpretation('जल', { inSentence: true })).toBe('shabda');
      });
    });
  });

  describe('requiresSvaRupaInterpretation function', () => {
    describe('Requiring sva-rūpa interpretation', () => {
      it('should require sva-rūpa for grammatical contexts', () => {
        expect(requiresSvaRupaInterpretation('अ', { isGrammaticalDiscussion: true })).toBe(true);
        expect(requiresSvaRupaInterpretation('गो', { isPhonemeReference: true })).toBe(true);
        expect(requiresSvaRupaInterpretation('सुप्', { isMorphemeReference: true })).toBe(true);
      });

      it('should require sva-rūpa for quoted terms', () => {
        expect(requiresSvaRupaInterpretation('राम', { quotedTerm: true })).toBe(true);
        expect(requiresSvaRupaInterpretation('अच्', { isQuoted: true })).toBe(true);
      });
    });

    describe('Not requiring sva-rūpa interpretation', () => {
      it('should not require sva-rūpa for normal usage', () => {
        expect(requiresSvaRupaInterpretation('राम', {})).toBe(false);
        expect(requiresSvaRupaInterpretation('गो', {})).toBe(false);
        expect(requiresSvaRupaInterpretation('देव', {})).toBe(false);
      });
    });
  });

  describe('getSvaRupaExamples function', () => {
    it('should provide comprehensive examples', () => {
      const examples = getSvaRupaExamples();
      
      expect(examples.metalinguistic).toBeDefined();
      expect(examples.semantic).toBeDefined();
      
      expect(examples.metalinguistic.examples).toHaveLength(3);
      expect(examples.semantic.examples).toHaveLength(2);
      
      // Check metalinguistic examples
      const metalinguisticExample = examples.metalinguistic.examples[0];
      expect(metalinguisticExample.term).toBe('अ');
      expect(metalinguisticExample.usage).toBe('metalinguistic');
      expect(metalinguisticExample.interpretation).toContain('letter अ itself');
      
      // Check semantic examples
      const semanticExample = examples.semantic.examples[0];
      expect(semanticExample.term).toBe('गो');
      expect(semanticExample.usage).toBe('semantic');
      expect(semanticExample.interpretation).toContain('cow');
    });

    it('should include traditional grammatical terms', () => {
      const examples = getSvaRupaExamples();
      const terms = examples.metalinguistic.examples.map(ex => ex.term);
      
      expect(terms).toContain('अ');
      expect(terms).toContain('गो');
      expect(terms).toContain('सुप्');
    });
  });

  describe('Integration tests', () => {
    it('should work consistently across all functions', () => {
      const testCases = [
        { word: 'अ', context: { isGrammaticalDiscussion: true }, expectedType: 'ashabda-samjna' },
        { word: 'गो', context: { quotedTerm: true }, expectedType: 'ashabda-samjna' },
        { word: 'राम', context: {}, expectedType: 'shabda' },
        { word: 'देव', context: { inSentence: true }, expectedType: 'shabda' }
      ];

      testCases.forEach(testCase => {
        const { word, context, expectedType } = testCase;
        
        const svaRupaUsage = isSvaRupaUsage(word, context);
        const analysis = analyzeWordUsage(word, context);
        const interpretation = getWordInterpretation(word, context);
        const requiresSvaRupa = requiresSvaRupaInterpretation(word, context);
        
        expect(analysis.isSvaRupa).toBe(svaRupaUsage);
        expect(interpretation).toBe(expectedType);
        expect(requiresSvaRupa).toBe(svaRupaUsage);
        
        if (expectedType === 'ashabda-samjna') {
          expect(analysis.interpretationType).toBe('metalinguistic');
        } else {
          expect(analysis.interpretationType).toBe('semantic');
        }
      });
    });

    it('should handle both scripts consistently', () => {
      const contexts = [
        { isGrammaticalDiscussion: true },
        { quotedTerm: true },
        {}
      ];

      const wordPairs = [
        ['राम', 'rama'],
        ['गो', 'go'],
        ['देव', 'deva']
      ];

      wordPairs.forEach(([devanagari, iast]) => {
        contexts.forEach(context => {
          const result1 = analyzeWordUsage(devanagari, context);
          const result2 = analyzeWordUsage(iast, context);
          
          expect(result1.isSvaRupa).toBe(result2.isSvaRupa);
          expect(result1.interpretationType).toBe(result2.interpretationType);
        });
      });
    });
  });
});
