import {
  constructPratyahara,
  getCommonPratyahara,
  validatePratyahara,
  isPhonemeInPratyahara,
  findPratyaharasContaining,
  getPratyaharaExamples,
  SHIVA_SUTRAS,
  SHIVA_SUTRAS_WITH_IT,
  COMMON_PRATYAHARAS,
  IT_MARKERS
} from './pratyahara-construction.js';

describe('Pratyāhāra Construction Utilities', () => {
  describe('Constants', () => {
    it('SHIVA_SUTRAS should contain 43 phonemes', () => {
      expect(SHIVA_SUTRAS).toHaveLength(43);
      expect(SHIVA_SUTRAS[0]).toBe('a');
      expect(SHIVA_SUTRAS[1]).toBe('i');
      expect(SHIVA_SUTRAS[2]).toBe('u');
    });

    it('SHIVA_SUTRAS_WITH_IT should contain 57 phonemes including इत् markers', () => {
      expect(SHIVA_SUTRAS_WITH_IT).toHaveLength(57);
      expect(SHIVA_SUTRAS_WITH_IT[3]).toBe('ṇ'); // First इत् marker
      expect(SHIVA_SUTRAS_WITH_IT.includes('k')).toBe(true); // Second इत् marker
    });

    it('COMMON_PRATYAHARAS should contain traditional pratyāhāras', () => {
      expect(COMMON_PRATYAHARAS).toHaveProperty('ac');
      expect(COMMON_PRATYAHARAS).toHaveProperty('hal');
      expect(COMMON_PRATYAHARAS).toHaveProperty('ik');
      expect(COMMON_PRATYAHARAS).toHaveProperty('aṇ');
      expect(COMMON_PRATYAHARAS.ac).toHaveLength(9); // All vowels
    });

    it('IT_MARKERS should contain all इत् markers', () => {
      expect(IT_MARKERS).toContain('ṇ');
      expect(IT_MARKERS).toContain('k');
      expect(IT_MARKERS).toContain('ṅ');
      expect(IT_MARKERS).toContain('c');
      expect(IT_MARKERS).toContain('l');
    });
  });

  describe('constructPratyahara', () => {
    it('should construct अच् (ac) pratyāhāra correctly', () => {
      const result = constructPratyahara('a', 'c');
      
      expect(result.valid).toBe(true);
      expect(result.pratyahara).toEqual(['a', 'i', 'u', 'ṛ', 'ḷ', 'e', 'o', 'ai', 'au']);
      expect(result.startPhoneme).toBe('a');
      expect(result.itMarker).toBe('c');
      expect(result.length).toBe(9);
      expect(result.type).toBe('vowels');
      expect(result.traditional).toBe(true);
    });

    it('should construct हल् (hal) pratyāhāra correctly', () => {
      const result = constructPratyahara('h', 'l');
      
      expect(result.valid).toBe(true);
      expect(result.pratyahara).toContain('h');
      expect(result.pratyahara).toContain('y');
      expect(result.pratyahara).toContain('k');
      expect(result.pratyahara).toContain('s');
      expect(result.type).toBe('consonants');
      expect(result.traditional).toBe(true);
    });

    it('should construct इक् (ik) pratyāhāra correctly', () => {
      const result = constructPratyahara('i', 'k');
      
      expect(result.valid).toBe(true);
      expect(result.pratyahara).toEqual(['i', 'u', 'ṛ', 'ḷ']);
      expect(result.length).toBe(4);
      expect(result.type).toBe('vowels');
      expect(result.traditional).toBe(true);
    });

    it('should construct अण् (aṇ) pratyāhāra correctly', () => {
      const result = constructPratyahara('a', 'ṇ');
      
      expect(result.valid).toBe(true);
      expect(result.pratyahara).toContain('a');
      expect(result.pratyahara).toContain('i');
      expect(result.pratyahara).toContain('u');
      expect(result.pratyahara).toContain('h');
      expect(result.pratyahara).toContain('y');
      expect(result.pratyahara).toContain('v');
      expect(result.pratyahara).toContain('r');
      expect(result.type).toBe('mixed');
      expect(result.traditional).toBe(true);
    });

    it('should handle invalid inputs gracefully', () => {
      expect(constructPratyahara('', 'c').valid).toBe(false);
      expect(constructPratyahara('a', '').valid).toBe(false);
      expect(constructPratyahara(null, 'c').valid).toBe(false);
      expect(constructPratyahara('a', null).valid).toBe(false);
    });

    it('should handle nonexistent phonemes', () => {
      const result = constructPratyahara('z', 'c');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('not found in alphabet');
    });

    it('should handle invalid order (start after इत्)', () => {
      const result = constructPratyahara('u', 'a'); // u comes after a
      expect(result.valid).toBe(false);
      expect(result.error).toContain('must come before');
    });

    it('should work with custom alphabet', () => {
      const customAlphabet = ['x', 'y', 'z', 'marker'];
      const result = constructPratyahara('x', 'marker', customAlphabet);
      
      expect(result.valid).toBe(true);
      expect(result.pratyahara).toEqual(['x', 'y', 'z']);
    });
  });

  describe('getCommonPratyahara', () => {
    it('should return अच् (vowels) correctly', () => {
      const result = getCommonPratyahara('ac');
      
      expect(result.valid).toBe(true);
      expect(result.pratyahara).toEqual(['a', 'i', 'u', 'ṛ', 'ḷ', 'e', 'o', 'ai', 'au']);
      expect(result.name).toBe('ac');
      expect(result.length).toBe(9);
      expect(result.type).toBe('vowels');
      expect(result.traditional).toBe(true);
    });

    it('should return हल् (consonants) correctly', () => {
      const result = getCommonPratyahara('hal');
      
      expect(result.valid).toBe(true);
      expect(result.pratyahara).toContain('h');
      expect(result.pratyahara).toContain('k');
      expect(result.pratyahara).toContain('p');
      expect(result.type).toBe('consonants');
      expect(result.traditional).toBe(true);
    });

    it('should return इक् (close vowels) correctly', () => {
      const result = getCommonPratyahara('ik');
      
      expect(result.valid).toBe(true);
      expect(result.pratyahara).toEqual(['i', 'u', 'ṛ', 'ḷ']);
      expect(result.type).toBe('vowels');
    });

    it('should be case insensitive', () => {
      const result1 = getCommonPratyahara('AC');
      const result2 = getCommonPratyahara('Ac');
      const result3 = getCommonPratyahara('ac');
      
      expect(result1.valid).toBe(true);
      expect(result2.valid).toBe(true);
      expect(result3.valid).toBe(true);
      expect(result1.pratyahara).toEqual(result2.pratyahara);
      expect(result2.pratyahara).toEqual(result3.pratyahara);
    });

    it('should handle invalid pratyāhāra names', () => {
      const result = getCommonPratyahara('invalid');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Unknown pratyāhāra name');
    });

    it('should handle invalid inputs', () => {
      expect(getCommonPratyahara('').valid).toBe(false);
      expect(getCommonPratyahara(null).valid).toBe(false);
      expect(getCommonPratyahara(undefined).valid).toBe(false);
    });
  });

  describe('validatePratyahara', () => {
    it('should validate traditional pratyāhāras', () => {
      expect(validatePratyahara('a', 'c').valid).toBe(true);
      expect(validatePratyahara('h', 'l').valid).toBe(true);
      expect(validatePratyahara('i', 'k').valid).toBe(true);
      expect(validatePratyahara('a', 'ṇ').valid).toBe(true);
    });

    it('should validate custom pratyāhāras', () => {
      const result = validatePratyahara('i', 'c'); // i to c
      expect(result.valid).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should reject invalid combinations', () => {
      expect(validatePratyahara('z', 'c').valid).toBe(false);
      expect(validatePratyahara('u', 'a').valid).toBe(false);
      expect(validatePratyahara('', 'c').valid).toBe(false);
    });
  });

  describe('isPhonemeInPratyahara', () => {
    it('should correctly identify vowels in अच्', () => {
      expect(isPhonemeInPratyahara('a', 'ac').belongs).toBe(true);
      expect(isPhonemeInPratyahara('i', 'ac').belongs).toBe(true);
      expect(isPhonemeInPratyahara('e', 'ac').belongs).toBe(true);
      expect(isPhonemeInPratyahara('ai', 'ac').belongs).toBe(true);
    });

    it('should correctly identify consonants not in अच्', () => {
      expect(isPhonemeInPratyahara('k', 'ac').belongs).toBe(false);
      expect(isPhonemeInPratyahara('h', 'ac').belongs).toBe(false);
      expect(isPhonemeInPratyahara('m', 'ac').belongs).toBe(false);
    });

    it('should work with start+इत् notation', () => {
      expect(isPhonemeInPratyahara('i', 'ik').belongs).toBe(true);
      expect(isPhonemeInPratyahara('u', 'ik').belongs).toBe(true);
      expect(isPhonemeInPratyahara('a', 'ik').belongs).toBe(false);
    });

    it('should handle consonants in हल्', () => {
      expect(isPhonemeInPratyahara('k', 'hal').belongs).toBe(true);
      expect(isPhonemeInPratyahara('p', 'hal').belongs).toBe(true);
      expect(isPhonemeInPratyahara('h', 'hal').belongs).toBe(true);
      expect(isPhonemeInPratyahara('a', 'hal').belongs).toBe(false);
    });

    it('should handle invalid inputs', () => {
      expect(isPhonemeInPratyahara('', 'ac').belongs).toBe(false);
      expect(isPhonemeInPratyahara('a', '').belongs).toBe(false);
      expect(isPhonemeInPratyahara(null, 'ac').belongs).toBe(false);
    });
  });

  describe('findPratyaharasContaining', () => {
    it('should find all pratyāhāras containing vowel a', () => {
      const result = findPratyaharasContaining('a');
      
      expect(result.matches).toHaveLength(2);
      const names = result.matches.map(m => m.name);
      expect(names).toContain('ac');
      expect(names).toContain('aṇ');
      expect(result.phoneme).toBe('a');
      expect(result.count).toBe(2);
    });

    it('should find all pratyāhāras containing consonant k', () => {
      const result = findPratyaharasContaining('k');
      
      expect(result.matches).toHaveLength(2);
      const names = result.matches.map(m => m.name);
      expect(names).toContain('hal');
      expect(names).toContain('jhal');
    });

    it('should find pratyāhāras containing semivowel y', () => {
      const result = findPratyaharasContaining('y');
      
      expect(result.matches.length).toBeGreaterThan(0);
      const names = result.matches.map(m => m.name);
      expect(names).toContain('aṇ');
      expect(names).toContain('hal');
      expect(names).toContain('yañ');
    });

    it('should handle nonexistent phonemes', () => {
      const result = findPratyaharasContaining('z');
      expect(result.matches).toHaveLength(0);
      expect(result.count).toBe(0);
    });

    it('should handle invalid inputs', () => {
      expect(findPratyaharasContaining('').matches).toHaveLength(0);
      expect(findPratyaharasContaining(null).matches).toHaveLength(0);
    });
  });

  describe('getPratyaharaExamples', () => {
    it('should provide comprehensive examples', () => {
      const examples = getPratyaharaExamples();
      
      expect(examples).toHaveProperty('principle');
      expect(examples).toHaveProperty('common');
      expect(examples).toHaveProperty('construction');
      expect(examples).toHaveProperty('traditionalNote');
      
      expect(examples.principle).toContain('आदिरन्त्येन सहेता');
      expect(examples.common.examples).toHaveLength(3);
    });

    it('should include traditional अच्, हल्, इक् examples', () => {
      const examples = getPratyaharaExamples();
      const commonExamples = examples.common.examples;
      
      const names = commonExamples.map(ex => ex.name);
      expect(names).toContain('अच्');
      expect(names).toContain('हल्');
      expect(names).toContain('इक्');
      
      commonExamples.forEach(ex => {
        expect(ex).toHaveProperty('construction');
        expect(ex).toHaveProperty('phonemes');
        expect(ex).toHaveProperty('meaning');
        expect(ex).toHaveProperty('usage');
      });
    });

    it('should provide construction process explanation', () => {
      const examples = getPratyaharaExamples();
      
      expect(examples.construction.process).toHaveLength(4);
      expect(examples.construction.example).toHaveProperty('input');
      expect(examples.construction.example).toHaveProperty('śivasūtras');
      expect(examples.construction.example).toHaveProperty('result');
      expect(examples.construction.example).toHaveProperty('notation');
    });
  });

  describe('Integration Tests', () => {
    it('should work consistently across all functions for अच्', () => {
      const constructed = constructPratyahara('a', 'c');
      const common = getCommonPratyahara('ac');
      const validated = validatePratyahara('a', 'c');
      
      expect(constructed.valid).toBe(true);
      expect(common.valid).toBe(true);
      expect(validated.valid).toBe(true);
      
      expect(constructed.pratyahara).toEqual(common.pratyahara);
      expect(validated.pratyahara).toEqual(common.pratyahara);
    });

    it('should work consistently for membership testing', () => {
      const pratyahara = constructPratyahara('i', 'k');
      
      pratyahara.pratyahara.forEach(phoneme => {
        expect(isPhonemeInPratyahara(phoneme, 'ik').belongs).toBe(true);
      });
      
      // Test some phonemes not in इक्
      expect(isPhonemeInPratyahara('a', 'ik').belongs).toBe(false);
      expect(isPhonemeInPratyahara('e', 'ik').belongs).toBe(false);
    });

    it('should handle complex pratyāhāra relationships', () => {
      // All vowels should be in अच्
      const vowels = ['a', 'i', 'u', 'ṛ', 'ḷ', 'e', 'o', 'ai', 'au'];
      vowels.forEach(vowel => {
        expect(isPhonemeInPratyahara(vowel, 'ac').belongs).toBe(true);
      });
      
      // इक् vowels should be subset of अच्
      const ikVowels = getCommonPratyahara('ik').pratyahara;
      ikVowels.forEach(vowel => {
        expect(isPhonemeInPratyahara(vowel, 'ac').belongs).toBe(true);
      });
    });

    it('should maintain logical relationships between pratyāhāras', () => {
      const ac = getCommonPratyahara('ac').pratyahara;
      const hal = getCommonPratyahara('hal').pratyahara;
      
      // अच् and हल् should have no overlap (vowels vs consonants)
      const overlap = ac.filter(phoneme => hal.includes(phoneme));
      expect(overlap).toHaveLength(0);
      
      // यञ् should be subset of अण्
      const yañ = getCommonPratyahara('yañ').pratyahara;
      const aṇ = getCommonPratyahara('aṇ').pratyahara;
      yañ.forEach(phoneme => {
        expect(aṇ.includes(phoneme)).toBe(true);
      });
    });
  });
});
