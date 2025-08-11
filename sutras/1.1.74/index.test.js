import { 
  isTyadAdi, 
  isVrddhamByTyadAdi, 
  analyzeTyadAdiVrddham, 
  getAllTyadAdiWords 
} from './index.js';

describe('Sutra 1.1.74: त्यदादीनि वृद्धम्', () => {
  describe('isTyadAdi function', () => {
    describe('IAST script - positive cases', () => {
      it('should return true for tyad (primary form)', () => {
        expect(isTyadAdi('tyad')).toBe(true);
      });

      it('should return true for tyat (variant)', () => {
        expect(isTyadAdi('tyat')).toBe(true);
      });

      it('should return true for inflected forms', () => {
        expect(isTyadAdi('tyena')).toBe(true); // instrumental
        expect(isTyadAdi('tysya')).toBe(true); // genitive
        expect(isTyadAdi('tye')).toBe(true);   // dual/locative
        expect(isTyadAdi('tyam')).toBe(true);  // accusative neuter
        expect(isTyadAdi('tyā')).toBe(true);   // instrumental feminine
        expect(isTyadAdi('tyāni')).toBe(true); // plural neuter nominative
      });

      it('should return true for archaic variants', () => {
        expect(isTyadAdi('tyed')).toBe(true);
      });
    });

    describe('Devanagari script - positive cases', () => {
      it('should return true for त्यद् (primary form)', () => {
        expect(isTyadAdi('त्यद्')).toBe(true);
      });

      it('should return true for त्यत् (variant)', () => {
        expect(isTyadAdi('त्यत्')).toBe(true);
      });

      it('should return true for inflected forms', () => {
        expect(isTyadAdi('त्येन')).toBe(true);   // instrumental
        expect(isTyadAdi('त्यस्य')).toBe(true);  // genitive
        expect(isTyadAdi('त्ये')).toBe(true);    // dual/locative
        expect(isTyadAdi('त्यम्')).toBe(true);   // accusative neuter
        expect(isTyadAdi('त्या')).toBe(true);    // instrumental feminine
        expect(isTyadAdi('त्यानि')).toBe(true);  // plural neuter nominative
      });

      it('should return true for archaic variants', () => {
        expect(isTyadAdi('त्येद्')).toBe(true);
      });
    });

    describe('Negative cases', () => {
      it('should return false for similar but different words', () => {
        expect(isTyadAdi('tad')).toBe(false);  // regular तद्, not त्यद्
        expect(isTyadAdi('tat')).toBe(false);  // regular तत्, not त्यत्
        expect(isTyadAdi('yad')).toBe(false);  // different pronoun
        expect(isTyadAdi('etad')).toBe(false); // different pronoun
        expect(isTyadAdi('idam')).toBe(false); // different pronoun
      });

      it('should return false for Devanagari similar words', () => {
        expect(isTyadAdi('तद्')).toBe(false);   // regular तद्
        expect(isTyadAdi('तत्')).toBe(false);   // regular तत्
        expect(isTyadAdi('यद्')).toBe(false);   // different pronoun
        expect(isTyadAdi('एतद्')).toBe(false);  // different pronoun
        expect(isTyadAdi('इदम्')).toBe(false);  // different pronoun
      });

      it('should return false for regular nouns', () => {
        expect(isTyadAdi('rāma')).toBe(false);
        expect(isTyadAdi('deva')).toBe(false);
        expect(isTyadAdi('ātman')).toBe(false);
        expect(isTyadAdi('राम')).toBe(false);
        expect(isTyadAdi('देव')).toBe(false);
      });

      it('should return false for empty or invalid inputs', () => {
        expect(isTyadAdi('')).toBe(false);
        expect(isTyadAdi(null)).toBe(false);
        expect(isTyadAdi(undefined)).toBe(false);
        expect(isTyadAdi(123)).toBe(false);
      });
    });
  });

  describe('isVrddhamByTyadAdi function', () => {
    describe('वृद्धम् classification by lexical rule', () => {
      it('should classify त्यदादि words as वृद्धम्', () => {
        expect(isVrddhamByTyadAdi('tyad')).toBe(true);
        expect(isVrddhamByTyadAdi('tyat')).toBe(true);
        expect(isVrddhamByTyadAdi('त्यद्')).toBe(true);
        expect(isVrddhamByTyadAdi('त्यत्')).toBe(true);
      });

      it('should classify inflected त्यदादि forms as वृद्धम्', () => {
        expect(isVrddhamByTyadAdi('tyena')).toBe(true);
        expect(isVrddhamByTyadAdi('tysya')).toBe(true);
        expect(isVrddhamByTyadAdi('त्येन')).toBe(true);
        expect(isVrddhamByTyadAdi('त्यस्य')).toBe(true);
      });

      it('should not classify non-त्यदादि words as वृद्धम्', () => {
        expect(isVrddhamByTyadAdi('tad')).toBe(false);  // regular तद्
        expect(isVrddhamByTyadAdi('deva')).toBe(false); // regular noun
        expect(isVrddhamByTyadAdi('तद्')).toBe(false);   // regular तद्
        expect(isVrddhamByTyadAdi('देव')).toBe(false);  // regular noun
      });
    });

    describe('Edge cases', () => {
      it('should handle invalid inputs gracefully', () => {
        expect(isVrddhamByTyadAdi('')).toBe(false);
        expect(isVrddhamByTyadAdi(null)).toBe(false);
        expect(isVrddhamByTyadAdi(undefined)).toBe(false);
      });
    });
  });

  describe('analyzeTyadAdiVrddham function', () => {
    describe('Analysis of त्यदादि words', () => {
      it('should provide detailed analysis for त्यद्', () => {
        const result = analyzeTyadAdiVrddham('tyad');
        expect(result.isVrddhamByTyadAdi).toBe(true);
        expect(result.category).toBe('tyad-adi-pronoun');
        expect(result.confidence).toBe(1.0);
        expect(result.reasoning).toContain('Word found in traditional त्यदादि list');
        expect(result.linguisticNotes).toContain('Classified as वृद्धम् lexically, not phonetically');
        expect(result.sutraReference).toBe('1.1.74');
      });

      it('should provide detailed analysis for त्यत्', () => {
        const result = analyzeTyadAdiVrddham('त्यत्');
        expect(result.isVrddhamByTyadAdi).toBe(true);
        expect(result.category).toBe('tyad-adi-pronoun');
        expect(result.script).toBe('Devanagari');
        expect(result.confidence).toBe(1.0);
      });

      it('should provide detailed analysis for inflected forms', () => {
        const result = analyzeTyadAdiVrddham('tyena');
        expect(result.isVrddhamByTyadAdi).toBe(true);
        expect(result.category).toBe('tyad-adi-pronoun');
        expect(result.linguisticNotes).toContain('Traditional pronominal form with वृद्धम् designation');
      });
    });

    describe('Analysis of non-त्यदादि words', () => {
      it('should provide detailed analysis for regular pronouns', () => {
        const result = analyzeTyadAdiVrddham('tad');
        expect(result.isVrddhamByTyadAdi).toBe(false);
        expect(result.category).toBe(null);
        expect(result.confidence).toBe(0);
        expect(result.reasoning).toContain('Word not found in त्यदादि list');
        expect(result.linguisticNotes).toContain('Does not qualify for वृद्धम् under Sutra 1.1.74');
      });

      it('should provide detailed analysis for regular nouns', () => {
        const result = analyzeTyadAdiVrddham('deva');
        expect(result.isVrddhamByTyadAdi).toBe(false);
        expect(result.category).toBe(null);
        expect(result.confidence).toBe(0);
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        const result = analyzeTyadAdiVrddham('');
        expect(result.isVrddhamByTyadAdi).toBe(false);
        expect(result.reasoning).toContain('Invalid input: word must be a non-empty string');
      });

      it('should handle null/undefined inputs', () => {
        const result1 = analyzeTyadAdiVrddham(null);
        expect(result1.isVrddhamByTyadAdi).toBe(false);
        
        const result2 = analyzeTyadAdiVrddham(undefined);
        expect(result2.isVrddhamByTyadAdi).toBe(false);
      });
    });
  });

  describe('getAllTyadAdiWords function', () => {
    it('should return all त्यदादि words in both scripts', () => {
      const allWords = getAllTyadAdiWords();
      
      expect(allWords.iast).toContain('tyad');
      expect(allWords.iast).toContain('tyat');
      expect(allWords.iast).toContain('tyena');
      expect(allWords.iast).toContain('tysya');
      
      expect(allWords.devanagari).toContain('त्यद्');
      expect(allWords.devanagari).toContain('त्यत्');
      expect(allWords.devanagari).toContain('त्येन');
      expect(allWords.devanagari).toContain('त्यस्य');
      
      expect(allWords.combined.length).toBe(allWords.iast.length + allWords.devanagari.length);
    });

    it('should maintain array immutability', () => {
      const words1 = getAllTyadAdiWords();
      const words2 = getAllTyadAdiWords();
      
      // Modify one result
      words1.iast.push('test');
      
      // Other result should remain unchanged
      expect(words2.iast).not.toContain('test');
    });
  });

  describe('Integration tests', () => {
    it('should work consistently across all functions', () => {
      const testWords = ['tyad', 'त्यद्', 'tyena', 'त्येन'];
      
      testWords.forEach(word => {
        expect(isTyadAdi(word)).toBe(true);
        expect(isVrddhamByTyadAdi(word)).toBe(true);
        
        const analysis = analyzeTyadAdiVrddham(word);
        expect(analysis.isVrddhamByTyadAdi).toBe(true);
        expect(analysis.category).toBe('tyad-adi-pronoun');
      });
    });

    it('should correctly distinguish त्यदादि from similar words', () => {
      // त्यदादि words
      expect(isTyadAdi('tyad')).toBe(true);
      expect(isTyadAdi('त्यद्')).toBe(true);
      
      // Similar but different words
      expect(isTyadAdi('tad')).toBe(false);  // regular तद्
      expect(isTyadAdi('तद्')).toBe(false);   // regular तद्
      expect(isTyadAdi('yad')).toBe(false);  // different pronoun
      expect(isTyadAdi('यद्')).toBe(false);   // different pronoun
    });
  });
});
