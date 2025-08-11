import { 
  isEngVowel, 
  analyzeFirstVowel, 
  isVrddhamByEasternRule, 
  analyzeEasternVrddham, 
  getAllEngVowels 
} from './index.js';

describe('Sutra 1.1.75: एङ् प्राचां देशे', () => {
  describe('isEngVowel function', () => {
    describe('IAST script', () => {
      it('should return true for e', () => {
        expect(isEngVowel('e')).toBe(true);
      });

      it('should return true for o', () => {
        expect(isEngVowel('o')).toBe(true);
      });

      it('should return false for other vowels', () => {
        expect(isEngVowel('a')).toBe(false);
        expect(isEngVowel('i')).toBe(false);
        expect(isEngVowel('u')).toBe(false);
        expect(isEngVowel('ā')).toBe(false);
        expect(isEngVowel('ai')).toBe(false);
        expect(isEngVowel('au')).toBe(false);
      });
    });

    describe('Devanagari script', () => {
      it('should return true for ए', () => {
        expect(isEngVowel('ए')).toBe(true);
      });

      it('should return true for ओ', () => {
        expect(isEngVowel('ओ')).toBe(true);
      });

      it('should return true for diacritical forms', () => {
        expect(isEngVowel('े')).toBe(true); // e-matra
        expect(isEngVowel('ो')).toBe(true); // o-matra
      });

      it('should return false for other vowels', () => {
        expect(isEngVowel('अ')).toBe(false);
        expect(isEngVowel('इ')).toBe(false);
        expect(isEngVowel('उ')).toBe(false);
        expect(isEngVowel('आ')).toBe(false);
        expect(isEngVowel('ऐ')).toBe(false);
        expect(isEngVowel('औ')).toBe(false);
      });
    });

    describe('Edge cases', () => {
      it('should return false for invalid inputs', () => {
        expect(isEngVowel('')).toBe(false);
        expect(isEngVowel(null)).toBe(false);
        expect(isEngVowel(undefined)).toBe(false);
        expect(isEngVowel(123)).toBe(false);
      });
    });
  });

  describe('analyzeFirstVowel function', () => {
    describe('IAST words with e as first vowel', () => {
      it('should identify e as first vowel in eva', () => {
        const result = analyzeFirstVowel('eva');
        expect(result.firstVowel).toBe('e');
        expect(result.isEngVowel).toBe(true);
        expect(result.position).toBe(0);
      });

      it('should identify e as first vowel in deva', () => {
        const result = analyzeFirstVowel('deva');
        expect(result.firstVowel).toBe('e');
        expect(result.isEngVowel).toBe(true);
        expect(result.position).toBe(1);
      });

      it('should identify e as first vowel in prema', () => {
        const result = analyzeFirstVowel('prema');
        expect(result.firstVowel).toBe('e');
        expect(result.isEngVowel).toBe(true);
      });
    });

    describe('IAST words with o as first vowel', () => {
      it('should identify o as first vowel in ojas', () => {
        const result = analyzeFirstVowel('ojas');
        expect(result.firstVowel).toBe('o');
        expect(result.isEngVowel).toBe(true);
        expect(result.position).toBe(0);
      });

      it('should identify o as first vowel in yoga', () => {
        const result = analyzeFirstVowel('yoga');
        expect(result.firstVowel).toBe('o');
        expect(result.isEngVowel).toBe(true);
        expect(result.position).toBe(1);
      });

      it('should identify o as first vowel in bhojan', () => {
        const result = analyzeFirstVowel('bhojan');
        expect(result.firstVowel).toBe('o');
        expect(result.isEngVowel).toBe(true);
      });
    });

    describe('Devanagari words with ए as first vowel', () => {
      it('should identify ए as first vowel in एव', () => {
        const result = analyzeFirstVowel('एव');
        expect(result.firstVowel).toBe('ए');
        expect(result.isEngVowel).toBe(true);
      });

      it('should identify ए as first vowel in देव', () => {
        const result = analyzeFirstVowel('देव');
        expect(result.firstVowel).toBe('े'); // Diacritical form
        expect(result.isEngVowel).toBe(true);
      });

      it('should identify ए as first vowel in प्रेम', () => {
        const result = analyzeFirstVowel('प्रेम');
        expect(result.firstVowel).toBe('े'); // Diacritical form
        expect(result.isEngVowel).toBe(true);
      });
    });

    describe('Devanagari words with ओ as first vowel', () => {
      it('should identify ओ as first vowel in ओजस्', () => {
        const result = analyzeFirstVowel('ओजस्');
        expect(result.firstVowel).toBe('ओ');
        expect(result.isEngVowel).toBe(true);
      });

      it('should identify ओ as first vowel in योग', () => {
        const result = analyzeFirstVowel('योग');
        expect(result.firstVowel).toBe('ो'); // Diacritical form
        expect(result.isEngVowel).toBe(true);
      });

      it('should identify ओ as first vowel in भोजन', () => {
        const result = analyzeFirstVowel('भोजन');
        expect(result.firstVowel).toBe('ो'); // Diacritical form
        expect(result.isEngVowel).toBe(true);
      });
    });

    describe('Words with non-एङ् first vowels', () => {
      it('should identify non-एङ् vowels correctly', () => {
        expect(analyzeFirstVowel('ātman').isEngVowel).toBe(false);
        expect(analyzeFirstVowel('indra').isEngVowel).toBe(false);
        expect(analyzeFirstVowel('udaya').isEngVowel).toBe(false);
        expect(analyzeFirstVowel('आत्मन्').isEngVowel).toBe(false);
        expect(analyzeFirstVowel('इन्द्र').isEngVowel).toBe(false);
        expect(analyzeFirstVowel('उदय').isEngVowel).toBe(false);
      });
    });

    describe('Edge cases', () => {
      it('should handle words without vowels', () => {
        const result = analyzeFirstVowel('kr');
        expect(result.firstVowel).toBe(null);
        expect(result.isEngVowel).toBe(false);
        expect(result.position).toBe(-1);
      });

      it('should handle invalid inputs', () => {
        const result = analyzeFirstVowel('');
        expect(result.firstVowel).toBe(null);
        expect(result.isEngVowel).toBe(false);
      });
    });
  });

  describe('isVrddhamByEasternRule function', () => {
    describe('With Eastern tradition context', () => {
      const easternContext = { tradition: 'eastern' };
      const prācyaContext = { region: 'prācya' };
      const allowEasternContext = { allowEasternRules: true };
      const optionalContext = { includeOptionalRules: true };

      it('should classify words with e as first vowel as वृद्धम्', () => {
        expect(isVrddhamByEasternRule('eva', easternContext)).toBe(true);
        expect(isVrddhamByEasternRule('deva', prācyaContext)).toBe(true);
        expect(isVrddhamByEasternRule('prema', allowEasternContext)).toBe(true);
        expect(isVrddhamByEasternRule('एव', optionalContext)).toBe(true);
      });

      it('should classify words with o as first vowel as वृद्धम्', () => {
        expect(isVrddhamByEasternRule('ojas', easternContext)).toBe(true);
        expect(isVrddhamByEasternRule('yoga', prācyaContext)).toBe(true);
        expect(isVrddhamByEasternRule('bhojan', allowEasternContext)).toBe(true);
        expect(isVrddhamByEasternRule('ओजस्', optionalContext)).toBe(true);
      });

      it('should not classify words with non-एङ् first vowels as वृद्धम्', () => {
        expect(isVrddhamByEasternRule('ātman', easternContext)).toBe(false);
        expect(isVrddhamByEasternRule('indra', prācyaContext)).toBe(false);
        expect(isVrddhamByEasternRule('udaya', allowEasternContext)).toBe(false);
        expect(isVrddhamByEasternRule('आत्मन्', optionalContext)).toBe(false);
      });
    });

    describe('Without Eastern tradition context', () => {
      const standardContext = {};
      const westernContext = { tradition: 'western' };

      it('should not classify even एङ् words as वृद्धम् without Eastern context', () => {
        expect(isVrddhamByEasternRule('eva', standardContext)).toBe(false);
        expect(isVrddhamByEasternRule('deva', westernContext)).toBe(false);
        expect(isVrddhamByEasternRule('ojas', standardContext)).toBe(false);
        expect(isVrddhamByEasternRule('yoga', westernContext)).toBe(false);
      });
    });

    describe('Edge cases', () => {
      it('should handle invalid inputs gracefully', () => {
        expect(isVrddhamByEasternRule('', { tradition: 'eastern' })).toBe(false);
        expect(isVrddhamByEasternRule(null, { tradition: 'eastern' })).toBe(false);
        expect(isVrddhamByEasternRule(undefined, { tradition: 'eastern' })).toBe(false);
      });
    });
  });

  describe('analyzeEasternVrddham function', () => {
    describe('Analysis with Eastern tradition', () => {
      it('should provide detailed analysis for words with e first vowel', () => {
        const result = analyzeEasternVrddham('deva', { tradition: 'eastern' });
        expect(result.isVrddhamByEasternRule).toBe(true);
        expect(result.firstVowel).toBe('e');
        expect(result.isEngVowel).toBe(true);
        expect(result.tradition).toBe('eastern');
        expect(result.confidence).toBe(0.8);
        expect(result.reasoning).toContain("First vowel 'e' is एङ् (e/o)");
        expect(result.reasoning).toContain('Eastern grammatical tradition allows this classification');
        expect(result.linguisticNotes).toContain('According to Eastern grammarians (प्राच्याः)');
        expect(result.sutraReference).toBe('1.1.75');
      });

      it('should provide detailed analysis for words with o first vowel', () => {
        const result = analyzeEasternVrddham('योग', { region: 'prācya' });
        expect(result.isVrddhamByEasternRule).toBe(true);
        expect(result.firstVowel).toBe('ो'); // Diacritical form
        expect(result.isEngVowel).toBe(true);
        expect(result.script).toBe('Devanagari');
        expect(result.tradition).toBe('eastern');
        expect(result.linguisticNotes).toContain('This is a regional/dialectal extension to वृद्धम् definition');
      });
    });

    describe('Analysis without Eastern tradition', () => {
      it('should indicate alternative classification for एङ् words', () => {
        const result = analyzeEasternVrddham('deva', {});
        expect(result.isVrddhamByEasternRule).toBe(false);
        expect(result.firstVowel).toBe('e');
        expect(result.isEngVowel).toBe(true);
        expect(result.tradition).toBe('standard');
        expect(result.confidence).toBe(0);
        expect(result.reasoning).toContain("First vowel 'e' is एङ् (e/o)");
        expect(result.reasoning).toContain('But Eastern grammatical tradition not specified in context');
        expect(result.linguisticNotes).toContain('Would qualify as वृद्धम् under Eastern tradition');
        expect(result.alternativeClassification).toBe('vrddham-if-eastern-tradition');
      });
    });

    describe('Analysis of non-एङ् words', () => {
      it('should correctly analyze words without एङ् first vowels', () => {
        const result = analyzeEasternVrddham('ātman', { tradition: 'eastern' });
        expect(result.isVrddhamByEasternRule).toBe(false);
        expect(result.firstVowel).toBe('ā');
        expect(result.isEngVowel).toBe(false);
        expect(result.reasoning).toContain("First vowel 'ā' is not एङ् (e/o)");
        expect(result.linguisticNotes).toContain('Does not qualify for वृद्धम् under Sutra 1.1.75');
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        const result = analyzeEasternVrddham('', { tradition: 'eastern' });
        expect(result.isVrddhamByEasternRule).toBe(false);
        expect(result.reasoning).toContain('Invalid input: word must be a non-empty string');
      });

      it('should handle null/undefined inputs', () => {
        const result1 = analyzeEasternVrddham(null, { tradition: 'eastern' });
        expect(result1.isVrddhamByEasternRule).toBe(false);
        
        const result2 = analyzeEasternVrddham(undefined, { tradition: 'eastern' });
        expect(result2.isVrddhamByEasternRule).toBe(false);
      });
    });
  });

  describe('getAllEngVowels function', () => {
    it('should return all एङ् vowels in both scripts', () => {
      const allVowels = getAllEngVowels();
      
      expect(allVowels.iast).toEqual(['e', 'o']);
      expect(allVowels.devanagari).toEqual(['ए', 'ओ', 'े', 'ो']); // Including diacritical forms
      expect(allVowels.combined).toEqual(['e', 'o', 'ए', 'ओ', 'े', 'ो']);
    });

    it('should maintain array immutability', () => {
      const vowels1 = getAllEngVowels();
      const vowels2 = getAllEngVowels();
      
      // Modify one result
      vowels1.iast.push('test');
      
      // Other result should remain unchanged
      expect(vowels2.iast).toEqual(['e', 'o']);
    });
  });

  describe('Integration tests', () => {
    it('should work consistently across all functions for Eastern tradition', () => {
      const testWords = ['eva', 'deva', 'ojas', 'yoga', 'एव', 'देव', 'ओजस्', 'योग'];
      const easternContext = { tradition: 'eastern' };
      
      testWords.forEach(word => {
        const vowelAnalysis = analyzeFirstVowel(word);
        expect(vowelAnalysis.isEngVowel).toBe(true);
        expect(isEngVowel(vowelAnalysis.firstVowel)).toBe(true);
        expect(isVrddhamByEasternRule(word, easternContext)).toBe(true);
        
        const analysis = analyzeEasternVrddham(word, easternContext);
        expect(analysis.isVrddhamByEasternRule).toBe(true);
        expect(analysis.tradition).toBe('eastern');
      });
    });

    it('should correctly distinguish एङ् and non-एङ् words', () => {
      // एङ् words (e/o first vowel)
      expect(analyzeFirstVowel('deva').isEngVowel).toBe(true);
      expect(analyzeFirstVowel('yoga').isEngVowel).toBe(true);
      expect(analyzeFirstVowel('देव').isEngVowel).toBe(true);
      expect(analyzeFirstVowel('योग').isEngVowel).toBe(true);
      
      // Non-एङ् words
      expect(analyzeFirstVowel('ātman').isEngVowel).toBe(false);
      expect(analyzeFirstVowel('indra').isEngVowel).toBe(false);
      expect(analyzeFirstVowel('udaya').isEngVowel).toBe(false);
      expect(analyzeFirstVowel('आत्मन्').isEngVowel).toBe(false);
    });

    it('should respect regional/traditional context', () => {
      const word = 'deva';
      
      // With Eastern context
      expect(isVrddhamByEasternRule(word, { tradition: 'eastern' })).toBe(true);
      expect(isVrddhamByEasternRule(word, { region: 'prācya' })).toBe(true);
      expect(isVrddhamByEasternRule(word, { allowEasternRules: true })).toBe(true);
      
      // Without Eastern context
      expect(isVrddhamByEasternRule(word, {})).toBe(false);
      expect(isVrddhamByEasternRule(word, { tradition: 'western' })).toBe(false);
    });
  });
});
