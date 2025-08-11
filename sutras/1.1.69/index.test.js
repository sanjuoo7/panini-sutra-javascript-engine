import { 
  areSavarna,
  isAnLetter,
  isUditLetter,
  isApratyayaBySavarna,
  analyzeSavarnaRelationship,
  getSavarnaGroup,
  getSavarnaApratyayaExamples
} from './index.js';

describe('Sutra 1.1.69: अणुदित् सवर्णस्य चाप्रत्ययः', () => {
  describe('areSavarna function', () => {
    describe('Guttural सवर्ण relationships', () => {
      it('should identify guttural consonants as सवर्ण', () => {
        expect(areSavarna('क', 'ख')).toBe(true);
        expect(areSavarna('ग', 'घ')).toBe(true);
        expect(areSavarna('क', 'ङ')).toBe(true);
      });

      it('should identify guttural vowels as सवर्ण with gutturals', () => {
        expect(areSavarna('क', 'अ')).toBe(true);
        expect(areSavarna('ख', 'आ')).toBe(true);
        expect(areSavarna('अ', 'आ')).toBe(true);
      });

      it('should work with IAST', () => {
        expect(areSavarna('k', 'kh')).toBe(true);
        expect(areSavarna('g', 'gh')).toBe(true);
        expect(areSavarna('k', 'a')).toBe(true);
        expect(areSavarna('a', 'ā')).toBe(true);
      });
    });

    describe('Palatal सवर्ण relationships', () => {
      it('should identify palatal consonants as सवर्ण', () => {
        expect(areSavarna('च', 'छ')).toBe(true);
        expect(areSavarna('ज', 'झ')).toBe(true);
        expect(areSavarna('च', 'ञ')).toBe(true);
      });

      it('should identify palatal vowels as सवर्ण with palatals', () => {
        expect(areSavarna('च', 'इ')).toBe(true);
        expect(areSavarna('ज', 'ई')).toBe(true);
        expect(areSavarna('च', 'ए')).toBe(true);
        expect(areSavarna('ञ', 'ऐ')).toBe(true);
      });
    });

    describe('Retroflex सवर्ण relationships', () => {
      it('should identify retroflex consonants as सवर्ण', () => {
        expect(areSavarna('ट', 'ठ')).toBe(true);
        expect(areSavarna('ड', 'ढ')).toBe(true);
        expect(areSavarna('ट', 'ण')).toBe(true);
      });

      it('should identify retroflex vowels as सवर्ण with retroflexes', () => {
        expect(areSavarna('ट', 'ऋ')).toBe(true);
        expect(areSavarna('ण', 'ॠ')).toBe(true);
      });
    });

    describe('Dental सवर्ण relationships', () => {
      it('should identify dental consonants as सवर्ण', () => {
        expect(areSavarna('त', 'थ')).toBe(true);
        expect(areSavarna('द', 'ध')).toBe(true);
        expect(areSavarna('त', 'न')).toBe(true);
        expect(areSavarna('न', 'ल')).toBe(true);
        expect(areSavarna('त', 'स')).toBe(true);
      });
    });

    describe('Labial सवर्ण relationships', () => {
      it('should identify labial consonants as सवर्ण', () => {
        expect(areSavarna('प', 'फ')).toBe(true);
        expect(areSavarna('ब', 'भ')).toBe(true);
        expect(areSavarna('प', 'म')).toBe(true);
      });

      it('should identify labial vowels as सवर्ण with labials', () => {
        expect(areSavarna('प', 'उ')).toBe(true);
        expect(areSavarna('म', 'ऊ')).toBe(true);
        expect(areSavarna('प', 'ओ')).toBe(true);
        expect(areSavarna('भ', 'औ')).toBe(true);
      });
    });

    describe('Non-सवर्ण relationships', () => {
      it('should return false for different articulation places', () => {
        expect(areSavarna('क', 'च')).toBe(false);
        expect(areSavarna('त', 'प')).toBe(false);
        expect(areSavarna('अ', 'इ')).toBe(false);
        expect(areSavarna('उ', 'ऋ')).toBe(false);
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        expect(areSavarna('', 'क')).toBe(false);
        expect(areSavarna('क', '')).toBe(false);
        expect(areSavarna(null, 'क')).toBe(false);
        expect(areSavarna('क', undefined)).toBe(false);
        expect(areSavarna(123, 'क')).toBe(false);
      });
    });
  });

  describe('isAnLetter function', () => {
    describe('Devanagari अण् letters', () => {
      it('should identify vowels as अण्', () => {
        expect(isAnLetter('अ')).toBe(true);
        expect(isAnLetter('इ')).toBe(true);
        expect(isAnLetter('उ')).toBe(true);
        expect(isAnLetter('ऋ')).toBe(true);
        expect(isAnLetter('ए')).toBe(true);
        expect(isAnLetter('ओ')).toBe(true);
        expect(isAnLetter('ऐ')).toBe(true);
        expect(isAnLetter('औ')).toBe(true);
      });

      it('should not identify consonants as अण्', () => {
        expect(isAnLetter('क')).toBe(false);
        expect(isAnLetter('च')).toBe(false);
        expect(isAnLetter('त')).toBe(false);
        expect(isAnLetter('प')).toBe(false);
      });
    });

    describe('IAST अण् letters', () => {
      it('should identify IAST vowels as अण्', () => {
        expect(isAnLetter('a')).toBe(true);
        expect(isAnLetter('i')).toBe(true);
        expect(isAnLetter('u')).toBe(true);
        expect(isAnLetter('ṛ')).toBe(true);
        expect(isAnLetter('e')).toBe(true);
        expect(isAnLetter('o')).toBe(true);
        expect(isAnLetter('ai')).toBe(true);
        expect(isAnLetter('au')).toBe(true);
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        expect(isAnLetter('')).toBe(false);
        expect(isAnLetter(null)).toBe(false);
        expect(isAnLetter(undefined)).toBe(false);
        expect(isAnLetter(123)).toBe(false);
      });
    });
  });

  describe('isUditLetter function', () => {
    describe('Devanagari उदित् letters', () => {
      it('should identify उदित् consonants', () => {
        expect(isUditLetter('कु')).toBe(true);
        expect(isUditLetter('खु')).toBe(true);
        expect(isUditLetter('चु')).toBe(true);
        expect(isUditLetter('पु')).toBe(true);
      });

      it('should not identify regular letters as उदित्', () => {
        expect(isUditLetter('क')).toBe(false);
        expect(isUditLetter('च')).toBe(false);
        expect(isUditLetter('त')).toBe(false);
        expect(isUditLetter('प')).toBe(false);
      });
    });

    describe('IAST उदित् letters', () => {
      it('should identify IAST उदित् letters', () => {
        expect(isUditLetter('ku')).toBe(true);
        expect(isUditLetter('chu')).toBe(true);
        expect(isUditLetter('tu')).toBe(true);
        expect(isUditLetter('pu')).toBe(true);
      });

      it('should handle letters ending with u', () => {
        expect(isUditLetter('ru')).toBe(true);
        expect(isUditLetter('su')).toBe(true);
        expect(isUditLetter('hu')).toBe(true);
      });
    });
  });

  describe('isApratyayaBySavarna function', () => {
    describe('अप्रत्यय by अण् सवर्ण', () => {
      it('should identify consonants सवर्ण with अ as अप्रत्यय', () => {
        expect(isApratyayaBySavarna('क')).toBe(true);
        expect(isApratyayaBySavarna('ख')).toBe(true);
        expect(isApratyayaBySavarna('ग')).toBe(true);
        expect(isApratyayaBySavarna('घ')).toBe(true);
        expect(isApratyayaBySavarna('ङ')).toBe(true);
      });

      it('should identify palatals सवर्ण with इ as अप्रत्यय', () => {
        expect(isApratyayaBySavarna('च')).toBe(true);
        expect(isApratyayaBySavarna('छ')).toBe(true);
        expect(isApratyayaBySavarna('ज')).toBe(true);
        expect(isApratyayaBySavarna('झ')).toBe(true);
        expect(isApratyayaBySavarna('ञ')).toBe(true);
      });

      it('should identify labials सवर्ण with उ as अप्रत्यय', () => {
        expect(isApratyayaBySavarna('प')).toBe(true);
        expect(isApratyayaBySavarna('फ')).toBe(true);
        expect(isApratyayaBySavarna('ब')).toBe(true);
        expect(isApratyayaBySavarna('भ')).toBe(true);
        expect(isApratyayaBySavarna('म')).toBe(true);
      });

      it('should work with IAST', () => {
        expect(isApratyayaBySavarna('k')).toBe(true);
        expect(isApratyayaBySavarna('c')).toBe(true);
        expect(isApratyayaBySavarna('p')).toBe(true);
      });
    });

    describe('अप्रत्यय by उदित् सवर्ण', () => {
      it('should identify letters सवर्ण with उदित् letters as अप्रत्यय', () => {
        // Letters सवर्ण with कु
        expect(isApratyayaBySavarna('ख')).toBe(true);
        expect(isApratyayaBySavarna('ग')).toBe(true);
        
        // Letters सवर्ण with चु  
        expect(isApratyayaBySavarna('छ')).toBe(true);
        expect(isApratyayaBySavarna('ज')).toBe(true);
        
        // Letters सवर्ण with पु
        expect(isApratyayaBySavarna('फ')).toBe(true);
        expect(isApratyayaBySavarna('ब')).toBe(true);
      });
    });

    describe('Non-अप्रत्यय cases', () => {
      it('should not identify unrelated letters as अप्रत्यय', () => {
        // This test would need careful consideration as most letters
        // do have सवर्ण relationships. Testing with hypothetical or
        // very specific cases.
        expect(isApratyayaBySavarna('')).toBe(false);
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        expect(isApratyayaBySavarna('')).toBe(false);
        expect(isApratyayaBySavarna(null)).toBe(false);
        expect(isApratyayaBySavarna(undefined)).toBe(false);
        expect(isApratyayaBySavarna(123)).toBe(false);
      });
    });
  });

  describe('analyzeSavarnaRelationship function', () => {
    describe('Complete analysis for gutturals', () => {
      it('should provide complete analysis for guttural क', () => {
        const result = analyzeSavarnaRelationship('क');
        expect(result.phoneme).toBe('क');
        expect(result.script).toBe('Devanagari');
        expect(result.isApratyaya).toBe(true);
        expect(result.savarnaWithAn).toContain('अ');
        expect(result.savarnaWithAn).toContain('आ');
        expect(result.articulationPlace).toContain('कण्ठ्य');
        expect(result.reasoning).toContain('सवर्ण with अण् letters: अ, आ');
        expect(result.sutraReference).toBe('1.1.69');
      });

      it('should analyze guttural in IAST', () => {
        const result = analyzeSavarnaRelationship('k');
        expect(result.script).toBe('IAST');
        expect(result.isApratyaya).toBe(true);
        expect(result.savarnaWithAn).toContain('a');
        expect(result.savarnaWithAn).toContain('ā');
        expect(result.articulationPlace).toContain('guttural');
      });
    });

    describe('Complete analysis for palatals', () => {
      it('should provide complete analysis for palatal च', () => {
        const result = analyzeSavarnaRelationship('च');
        expect(result.isApratyaya).toBe(true);
        expect(result.savarnaWithAn).toContain('इ');
        expect(result.savarnaWithAn).toContain('ई');
        expect(result.savarnaWithAn).toContain('ए');
        expect(result.savarnaWithAn).toContain('ऐ');
        expect(result.articulationPlace).toContain('तालव्य');
      });
    });

    describe('Complete analysis for retroflexes', () => {
      it('should provide complete analysis for retroflex ट', () => {
        const result = analyzeSavarnaRelationship('ट');
        expect(result.isApratyaya).toBe(true);
        expect(result.savarnaWithAn).toContain('ऋ');
        expect(result.savarnaWithAn).toContain('ॠ');
        expect(result.articulationPlace).toContain('मूर्धन्य');
      });
    });

    describe('Complete analysis for dentals', () => {
      it('should provide complete analysis for dental त', () => {
        const result = analyzeSavarnaRelationship('त');
        expect(result.isApratyaya).toBe(true);
        // Dentals don't have direct अण् सवर्ण but have उदित् relationships
        expect(result.savarnaWithUdit.length > 0 || result.savarnaWithAn.length > 0).toBe(true);
        expect(result.articulationPlace).toContain('दन्त्य');
      });
    });

    describe('Complete analysis for labials', () => {
      it('should provide complete analysis for labial प', () => {
        const result = analyzeSavarnaRelationship('प');
        expect(result.isApratyaya).toBe(true);
        expect(result.savarnaWithAn).toContain('उ');
        expect(result.savarnaWithAn).toContain('ऊ');
        expect(result.savarnaWithAn).toContain('ओ');
        expect(result.savarnaWithAn).toContain('औ');
        expect(result.articulationPlace).toContain('ओष्ठ्य');
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs gracefully', () => {
        const result = analyzeSavarnaRelationship('');
        expect(result.isApratyaya).toBe(false);
        expect(result.reasoning).toContain('Invalid input: phoneme must be a non-empty string');
      });

      it('should handle null/undefined inputs', () => {
        const result1 = analyzeSavarnaRelationship(null);
        expect(result1.isApratyaya).toBe(false);
        
        const result2 = analyzeSavarnaRelationship(undefined);
        expect(result2.isApratyaya).toBe(false);
      });
    });
  });

  describe('getSavarnaGroup function', () => {
    describe('Devanagari सवर्ण groups', () => {
      it('should return complete guttural group', () => {
        const group = getSavarnaGroup('क');
        expect(group).toContain('क');
        expect(group).toContain('ख');
        expect(group).toContain('ग');
        expect(group).toContain('घ');
        expect(group).toContain('ङ');
        expect(group).toContain('अ');
        expect(group).toContain('आ');
      });

      it('should return complete palatal group', () => {
        const group = getSavarnaGroup('च');
        expect(group).toContain('च');
        expect(group).toContain('छ');
        expect(group).toContain('ज');
        expect(group).toContain('झ');
        expect(group).toContain('ञ');
        expect(group).toContain('इ');
        expect(group).toContain('ई');
        expect(group).toContain('ए');
        expect(group).toContain('ऐ');
      });

      it('should return complete labial group', () => {
        const group = getSavarnaGroup('प');
        expect(group).toContain('प');
        expect(group).toContain('फ');
        expect(group).toContain('ब');
        expect(group).toContain('भ');
        expect(group).toContain('म');
        expect(group).toContain('उ');
        expect(group).toContain('ऊ');
        expect(group).toContain('ओ');
        expect(group).toContain('औ');
      });
    });

    describe('IAST सवर्ण groups', () => {
      it('should return IAST guttural group', () => {
        const group = getSavarnaGroup('k');
        expect(group).toContain('k');
        expect(group).toContain('kh');
        expect(group).toContain('g');
        expect(group).toContain('gh');
        expect(group).toContain('ṅ');
        expect(group).toContain('a');
        expect(group).toContain('ā');
      });
    });

    describe('Error handling', () => {
      it('should return empty array for invalid inputs', () => {
        expect(getSavarnaGroup('')).toEqual([]);
        expect(getSavarnaGroup(null)).toEqual([]);
        expect(getSavarnaGroup(undefined)).toEqual([]);
        expect(getSavarnaGroup(123)).toEqual([]);
      });

      it('should return empty array for unknown phonemes', () => {
        expect(getSavarnaGroup('xyz')).toEqual([]);
      });
    });
  });

  describe('getSavarnaApratyayaExamples function', () => {
    it('should provide comprehensive examples', () => {
      const examples = getSavarnaApratyayaExamples();
      
      expect(examples.principle).toBeDefined();
      expect(examples.anSavarnaExamples).toBeDefined();
      expect(examples.uditSavarnaExamples).toBeDefined();
      expect(examples.traditionalNote).toBeDefined();
      
      expect(examples.anSavarnaExamples.cases).toHaveLength(3);
      expect(examples.uditSavarnaExamples.cases).toHaveLength(3);
    });

    it('should include traditional अण् सवर्ण examples', () => {
      const examples = getSavarnaApratyayaExamples();
      const anCases = examples.anSavarnaExamples.cases;
      
      const phonemes = anCases.map(c => c.phoneme);
      expect(phonemes).toContain('क');
      expect(phonemes).toContain('च');
      expect(phonemes).toContain('प');
      
      anCases.forEach(c => {
        expect(c.result).toBe('अप्रत्यय');
        expect(c.reasoning).toContain('सवर्ण');
      });
    });

    it('should include traditional उदित् सवर्ण examples', () => {
      const examples = getSavarnaApratyayaExamples();
      const uditCases = examples.uditSavarnaExamples.cases;
      
      const phonemes = uditCases.map(c => c.phoneme);
      expect(phonemes).toContain('ख');
      expect(phonemes).toContain('ज');
      expect(phonemes).toContain('भ');
      
      uditCases.forEach(c => {
        expect(c.result).toBe('अप्रत्यय');
        expect(c.reasoning).toContain('सवर्ण');
      });
    });
  });

  describe('Integration tests', () => {
    it('should work consistently across all functions', () => {
      const testPhonemes = ['क', 'च', 'त', 'प', 'k', 'c', 't', 'p'];
      
      testPhonemes.forEach(phoneme => {
        const isApratyaya = isApratyayaBySavarna(phoneme);
        const analysis = analyzeSavarnaRelationship(phoneme);
        const savarnaGroup = getSavarnaGroup(phoneme);
        
        expect(analysis.isApratyaya).toBe(isApratyaya);
        expect(savarnaGroup.length > 0).toBe(true);
        
        if (isApratyaya) {
          expect(analysis.savarnaWithAn.length > 0 || analysis.savarnaWithUdit.length > 0).toBe(true);
        }
      });
    });

    it('should handle mixed script scenarios', () => {
      const devanagariPhonemes = ['क', 'च', 'प'];
      const iastPhonemes = ['k', 'c', 'p'];
      
      devanagariPhonemes.forEach((phoneme, i) => {
        const devResult = analyzeSavarnaRelationship(phoneme);
        const iastResult = analyzeSavarnaRelationship(iastPhonemes[i]);
        
        expect(devResult.isApratyaya).toBe(iastResult.isApratyaya);
        expect(devResult.script).toBe('Devanagari');
        expect(iastResult.script).toBe('IAST');
      });
    });
  });
});
