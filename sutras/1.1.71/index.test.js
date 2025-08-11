import { 
  sutra1_1_71,
  getPratyahara, 
  getShivaSutraPratyahara, 
  getCommonPratyaharaLegacy as getCommonPratyahara, 
  isValidPratyahara,
  getExamples,
  SHIVA_SUTRAS,
  SHIVA_SUTRAS_WITH_IT,
  COMMON_PRATYAHARAS 
} from './index.js';

describe('Sutra 1.1.71: आदिरन्त्येन सहेता', () => {
  describe('Basic pratyāhāra construction', () => {
    it('should construct a pratyāhāra from start to इत् marker', () => {
      const result = getShivaSutraPratyahara('a', 'c');
      expect(result).toContain('a');
      expect(result).toContain('i');
      expect(result).toContain('u');
      expect(result).toContain('ṛ');
      expect(result).toContain('ḷ');
      expect(result).toContain('e');
      expect(result).toContain('o');
      expect(result).toContain('ai');
      expect(result).toContain('au');
      expect(result).not.toContain('c'); // इत् marker excluded
    });

    it('should construct the हल् pratyāhāra (consonants)', () => {
      const result = getShivaSutraPratyahara('h', 'l');
      expect(result.length).toBeGreaterThan(0);
      expect(result).toContain('h');
      expect(result).toContain('y');
      expect(result).toContain('v');
      expect(result).toContain('r');
      expect(result).not.toContain('l'); // इत् marker excluded
    });

    it('should construct smaller pratyāhāras correctly', () => {
      const result = getShivaSutraPratyahara('i', 'k');
      expect(result).toContain('i');
      expect(result).toContain('u');
      expect(result).not.toContain('k'); // इत् marker excluded
    });

    it('should handle single-letter ranges', () => {
      // Test with a custom alphabet for predictable results
      const customAlphabet = ['x', 'y', 'z'];
      const result = getPratyahara('x', 'z', customAlphabet);
      expect(result).toEqual(['x', 'y']);
    });
  });

  describe('Edge cases and validation', () => {
    it('should return empty array for invalid start letter', () => {
      const result = getShivaSutraPratyahara('xyz', 'c');
      expect(result).toEqual([]);
    });

    it('should return empty array for invalid इत् marker', () => {
      const result = getShivaSutraPratyahara('a', 'xyz');
      expect(result).toEqual([]);
    });

    it('should return empty array when start comes after इत् marker', () => {
      const result = getShivaSutraPratyahara('c', 'a');
      expect(result).toEqual([]);
    });

    it('should return empty array for empty strings', () => {
      expect(getShivaSutraPratyahara('', 'c')).toEqual([]);
      expect(getShivaSutraPratyahara('a', '')).toEqual([]);
      expect(getShivaSutraPratyahara('', '')).toEqual([]);
    });

    it('should return empty array for non-string inputs', () => {
      expect(getShivaSutraPratyahara(null, 'c')).toEqual([]);
      expect(getShivaSutraPratyahara('a', null)).toEqual([]);
      expect(getShivaSutraPratyahara(123, 'c')).toEqual([]);
      expect(getShivaSutraPratyahara('a', 456)).toEqual([]);
    });
  });

  describe('Custom alphabet support', () => {
    it('should work with custom alphabet arrays', () => {
      const customAlphabet = ['x', 'y', 'z', 'a', 'b', 'c'];
      const result = getPratyahara('y', 'b', customAlphabet);
      expect(result).toEqual(['y', 'z', 'a']);
    });

    it('should handle single-letter pratyāhāras', () => {
      const customAlphabet = ['a', 'b', 'c', 'd'];
      const result = getPratyahara('b', 'c', customAlphabet);
      expect(result).toEqual(['b']);
    });

    it('should return empty for adjacent letters (no intervening)', () => {
      const customAlphabet = ['a', 'b', 'c', 'd'];
      const result = getPratyahara('b', 'b', customAlphabet);
      expect(result).toEqual([]);
    });
  });

  describe('Common pratyāhāras access', () => {
    it('should provide अच् (vowels) through getCommonPratyahara', () => {
      const result = getCommonPratyahara('ac');
      expect(result).toEqual(['a', 'i', 'u', 'ṛ', 'ḷ', 'e', 'o', 'ai', 'au']);
    });

    it('should provide हल् (consonants) through getCommonPratyahara', () => {
      const result = getCommonPratyahara('hal');
      expect(result.length).toBeGreaterThan(30);
      expect(result).toContain('k');
      expect(result).toContain('p');
      expect(result).toContain('m');
    });

    it('should provide इक् vowels through getCommonPratyahara', () => {
      const result = getCommonPratyahara('ik');
      expect(result).toEqual(['i', 'u', 'ṛ', 'ḷ']);
    });

    it('should provide अण् (vowels + semivowels) through getCommonPratyahara', () => {
      const result = getCommonPratyahara('aṇ');
      expect(result).toContain('a');
      expect(result).toContain('y');
      expect(result).toContain('v');
      expect(result).toContain('r');
    });

    it('should return empty array for unknown pratyāhāra names', () => {
      const result = getCommonPratyahara('xyz');
      expect(result).toEqual([]);
    });
  });

  describe('Validation functions', () => {
    it('should validate correct pratyāhāras', () => {
      expect(isValidPratyahara('a', 'c')).toBe(true); // अच्
      expect(isValidPratyahara('i', 'k')).toBe(true); // इक्
      expect(isValidPratyahara('h', 'l')).toBe(true); // हल्
    });

    it('should reject invalid pratyāhāras', () => {
      expect(isValidPratyahara('xyz', 'c')).toBe(false);
      expect(isValidPratyahara('a', 'xyz')).toBe(false);
      expect(isValidPratyahara('c', 'a')).toBe(false); // reverse order
    });

    it('should validate with custom alphabet', () => {
      const customAlphabet = ['x', 'y', 'z', 'a'];
      expect(isValidPratyahara('x', 'z', customAlphabet)).toBe(true);
      expect(isValidPratyahara('y', 'a', customAlphabet)).toBe(true);
      expect(isValidPratyahara('z', 'x', customAlphabet)).toBe(false); // reverse
    });
  });

  describe('Śivasūtra constants', () => {
    it('should have the correct structure for SHIVA_SUTRAS', () => {
      expect(Array.isArray(SHIVA_SUTRAS)).toBe(true);
      expect(SHIVA_SUTRAS.length).toBeGreaterThan(40);
      
      // Check some key elements
      expect(SHIVA_SUTRAS).toContain('a');
      expect(SHIVA_SUTRAS).toContain('i');
      expect(SHIVA_SUTRAS).toContain('u');
      expect(SHIVA_SUTRAS).toContain('ṛ');
      expect(SHIVA_SUTRAS).toContain('ḷ');
      expect(SHIVA_SUTRAS).toContain('k');
      expect(SHIVA_SUTRAS).toContain('ṇ');
      expect(SHIVA_SUTRAS).toContain('c');
      expect(SHIVA_SUTRAS).toContain('l');
    });

    it('should have correct COMMON_PRATYAHARAS structure', () => {
      expect(typeof COMMON_PRATYAHARAS).toBe('object');
      expect(Array.isArray(COMMON_PRATYAHARAS.ac)).toBe(true);
      expect(Array.isArray(COMMON_PRATYAHARAS.hal)).toBe(true);
      expect(Array.isArray(COMMON_PRATYAHARAS.ik)).toBe(true);
      expect(Array.isArray(COMMON_PRATYAHARAS.aṇ)).toBe(true);
    });
  });

  describe('Real-world Sanskrit examples', () => {
    it('should handle classical pratyāhāra construction', () => {
      // Test basic functionality rather than exact counts
      const vowels = getShivaSutraPratyahara('a', 'c');
      const shortResult = getShivaSutraPratyahara('i', 'k');
      
      expect(vowels.length).toBeGreaterThan(8); // At least 9 vowels
      expect(shortResult.length).toBeGreaterThan(1); // Multiple letters
      
      // Verify key vowels are included
      expect(vowels).toContain('a');
      expect(vowels).toContain('ai');
      expect(vowels).toContain('au');
      
      expect(shortResult).toContain('i');
      expect(shortResult).toContain('u');
    });

    it('should correctly exclude the इत् marker from results', () => {
      const result = getShivaSutraPratyahara('a', 'ṇ');
      
      // Should include 'a', 'i', 'u' at minimum
      expect(result).toContain('a');
      expect(result).toContain('i');
      expect(result).toContain('u');
      expect(result).not.toContain('ṇ'); // इत् marker should be excluded
    });
  });

  describe('Main sutra function - sutra1_1_71', () => {
    it('should return complete analysis using shared utilities', () => {
      const result = sutra1_1_71('a', 'c');
      
      expect(result).toHaveProperty('startLetter', 'a');
      expect(result).toHaveProperty('itMarker', 'c');
      expect(result).toHaveProperty('pratyahara');
      expect(result).toHaveProperty('valid');
      expect(result).toHaveProperty('sutraReference', '1.1.71');
      expect(result).toHaveProperty('principle');
      
      expect(result.valid).toBe(true);
      expect(result.pratyahara).toContain('a');
      expect(result.pratyahara).toContain('i');
      expect(result.pratyahara).toContain('u');
    });

    it('should handle invalid inputs gracefully', () => {
      expect(() => sutra1_1_71(null, 'c')).toThrow();
      expect(() => sutra1_1_71('a', null)).toThrow();
      expect(() => sutra1_1_71('', 'c')).toThrow();
    });

    it('should include type information for traditional pratyāhāras', () => {
      const result = sutra1_1_71('a', 'c');
      expect(result).toHaveProperty('type');
      expect(result).toHaveProperty('traditional');
    });
  });

  describe('Examples', () => {
    it('should provide traditional examples', () => {
      const examples = getExamples();
      expect(examples).toBeDefined();
      expect(typeof examples).toBe('object');
    });
  });
});
