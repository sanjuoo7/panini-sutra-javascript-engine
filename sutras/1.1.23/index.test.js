/**
 * Test cases for Sutra 1.1.23: संख्या
 * Testing the संख्या (numeral) classification
 */

import { 
  isSankhya,
  getSankhyaWords,
  identifySankhyaType,
  hasSankhyaBehavior,
  getSankhyaExamples,
  isSankhyaType,
  getSankhyaValue,
  SANKHYA_WORDS
} from './index.js';

describe('Sutra 1.1.23: संख्या', () => {
  describe('isSankhya', () => {
    it('should identify cardinal numbers', () => {
      expect(isSankhya('eka')).toBe(true);
      expect(isSankhya('dvi')).toBe(true);
      expect(isSankhya('tri')).toBe(true);
      expect(isSankhya('pañca')).toBe(true);
      expect(isSankhya('daśa')).toBe(true);
      
      expect(isSankhya('एक')).toBe(true);
      expect(isSankhya('द्वि')).toBe(true);
      expect(isSankhya('त्रि')).toBe(true);
      expect(isSankhya('पञ्च')).toBe(true);
      expect(isSankhya('दश')).toBe(true);
    });

    it('should identify ordinal numbers', () => {
      expect(isSankhya('prathama')).toBe(true);
      expect(isSankhya('dvitīya')).toBe(true);
      expect(isSankhya('tṛtīya')).toBe(true);
      
      expect(isSankhya('प्रथम')).toBe(true);
      expect(isSankhya('द्वितीय')).toBe(true);
      expect(isSankhya('तृतीय')).toBe(true);
    });

    it('should identify multiplicative numbers', () => {
      expect(isSankhya('dviguṇa')).toBe(true);
      expect(isSankhya('triguṇa')).toBe(true);
      expect(isSankhya('caturguṇa')).toBe(true);
      
      expect(isSankhya('द्विगुण')).toBe(true);
      expect(isSankhya('त्रिगुण')).toBe(true);
      expect(isSankhya('चतुर्गुण')).toBe(true);
    });

    it('should identify fractional numbers', () => {
      expect(isSankhya('ardha')).toBe(true);
      expect(isSankhya('pāda')).toBe(true);
      
      expect(isSankhya('अर्ध')).toBe(true);
      expect(isSankhya('पाद')).toBe(true);
    });

    it('should identify collective numbers', () => {
      expect(isSankhya('dvaya')).toBe(true);
      expect(isSankhya('traya')).toBe(true);
      expect(isSankhya('catuṣka')).toBe(true);
      
      expect(isSankhya('द्वय')).toBe(true);
      expect(isSankhya('त्रय')).toBe(true);
      expect(isSankhya('चतुष्क')).toBe(true);
    });

    it('should reject non-numerical words', () => {
      expect(isSankhya('guru')).toBe(false);
      expect(isSankhya('laghu')).toBe(false);
      expect(isSankhya('nara')).toBe(false);
      expect(isSankhya('गुरु')).toBe(false);
      expect(isSankhya('लघु')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isSankhya('')).toBe(false);
      expect(isSankhya(null)).toBe(false);
      expect(isSankhya(undefined)).toBe(false);
    });
  });

  describe('getSankhyaWords', () => {
    it('should return IAST words by default', () => {
      const words = getSankhyaWords();
      expect(words.cardinal).toContain('eka');
      expect(words.cardinal).toContain('dvi');
      expect(words.ordinal).toContain('prathama');
      expect(words.multiplicative).toContain('dviguṇa');
    });

    it('should return IAST words when explicitly requested', () => {
      const words = getSankhyaWords('IAST');
      expect(words.cardinal).toContain('tri');
      expect(words.fractional).toContain('ardha');
      expect(words.collective).toContain('dvaya');
    });

    it('should return Devanagari words when requested', () => {
      const words = getSankhyaWords('Devanagari');
      expect(words.cardinal).toContain('एक');
      expect(words.cardinal).toContain('द्वि');
      expect(words.ordinal).toContain('प्रथम');
      expect(words.multiplicative).toContain('द्विगुण');
    });

    it('should have consistent structure across scripts', () => {
      const iastWords = getSankhyaWords('IAST');
      const devanagariWords = getSankhyaWords('Devanagari');
      
      expect(Object.keys(iastWords)).toEqual(Object.keys(devanagariWords));
      expect(iastWords.cardinal.length).toEqual(devanagariWords.cardinal.length);
      expect(iastWords.ordinal.length).toEqual(devanagariWords.ordinal.length);
    });
  });

  describe('identifySankhyaType', () => {
    it('should identify cardinal numbers', () => {
      const result1 = identifySankhyaType('eka');
      expect(result1.isSankhya).toBe(true);
      expect(result1.type).toBe('cardinal');
      expect(result1.script).toBe('IAST');
      expect(result1.word).toBe('eka');

      const result2 = identifySankhyaType('एक');
      expect(result2.isSankhya).toBe(true);
      expect(result2.type).toBe('cardinal');
      expect(result2.script).toBe('Devanagari');
      expect(result2.word).toBe('एक');
    });

    it('should identify ordinal numbers', () => {
      const result = identifySankhyaType('prathama');
      expect(result.isSankhya).toBe(true);
      expect(result.type).toBe('ordinal');
      expect(result.script).toBe('IAST');
    });

    it('should identify multiplicative numbers', () => {
      const result = identifySankhyaType('द्विगुण');
      expect(result.isSankhya).toBe(true);
      expect(result.type).toBe('multiplicative');
      expect(result.script).toBe('Devanagari');
    });

    it('should identify fractional numbers', () => {
      const result = identifySankhyaType('ardha');
      expect(result.isSankhya).toBe(true);
      expect(result.type).toBe('fractional');
      expect(result.script).toBe('IAST');
    });

    it('should identify collective numbers', () => {
      const result = identifySankhyaType('त्रय');
      expect(result.isSankhya).toBe(true);
      expect(result.type).toBe('collective');
      expect(result.script).toBe('Devanagari');
    });

    it('should return negative results for non-संख्या words', () => {
      const result = identifySankhyaType('guru');
      expect(result.isSankhya).toBe(false);
      expect(result.type).toBe(null);
    });

    it('should handle edge cases', () => {
      const result1 = identifySankhyaType('');
      expect(result1.isSankhya).toBe(false);

      const result2 = identifySankhyaType(null);
      expect(result2.isSankhya).toBe(false);
    });
  });

  describe('hasSankhyaBehavior', () => {
    it('should return true for direct संख्या', () => {
      expect(hasSankhyaBehavior('eka')).toBe(true);
      expect(hasSankhyaBehavior('prathama')).toBe(true);
      expect(hasSankhyaBehavior('dviguṇa')).toBe(true);
      expect(hasSankhyaBehavior('एक')).toBe(true);
    });

    it('should consider semantic context', () => {
      const quantityContext = { semantics: 'quantity' };
      expect(hasSankhyaBehavior('कति', quantityContext)).toBe(true);
      
      const numeralContext = { role: 'numeral' };
      expect(hasSankhyaBehavior('बहु', numeralContext)).toBe(true);
    });

    it('should return false for non-संख्या without context', () => {
      expect(hasSankhyaBehavior('guru')).toBe(false);
      expect(hasSankhyaBehavior('nara')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(hasSankhyaBehavior('')).toBe(false);
      expect(hasSankhyaBehavior(null)).toBe(false);
    });
  });

  describe('getSankhyaExamples', () => {
    it('should return IAST examples by default', () => {
      const examples = getSankhyaExamples();
      expect(examples.cardinal).toContain('eka');
      expect(examples.cardinal).toContain('dvi');
      expect(examples.ordinal).toContain('prathama');
      expect(examples.multiplicative).toContain('dviguṇa');
      expect(examples.fractional).toContain('ardha');
      expect(examples.collective).toContain('dvaya');
    });

    it('should return Devanagari examples when requested', () => {
      const examples = getSankhyaExamples('Devanagari');
      expect(examples.cardinal).toContain('एक');
      expect(examples.cardinal).toContain('द्वि');
      expect(examples.ordinal).toContain('प्रथम');
      expect(examples.multiplicative).toContain('द्विगुण');
    });

    it('should return limited examples for each category', () => {
      const examples = getSankhyaExamples();
      expect(examples.cardinal.length).toBe(5);
      expect(examples.ordinal.length).toBe(5);
      expect(examples.multiplicative.length).toBe(3);
      expect(examples.fractional.length).toBe(3);
      expect(examples.collective.length).toBe(3);
    });
  });

  describe('isSankhyaType', () => {
    it('should check for specific types correctly', () => {
      expect(isSankhyaType('eka', 'cardinal')).toBe(true);
      expect(isSankhyaType('prathama', 'ordinal')).toBe(true);
      expect(isSankhyaType('dviguṇa', 'multiplicative')).toBe(true);
      expect(isSankhyaType('ardha', 'fractional')).toBe(true);
      expect(isSankhyaType('dvaya', 'collective')).toBe(true);
    });

    it('should return false for wrong types', () => {
      expect(isSankhyaType('eka', 'ordinal')).toBe(false);
      expect(isSankhyaType('prathama', 'cardinal')).toBe(false);
      expect(isSankhyaType('guru', 'cardinal')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isSankhyaType('', 'cardinal')).toBe(false);
      expect(isSankhyaType('eka', '')).toBe(false);
      expect(isSankhyaType(null, 'cardinal')).toBe(false);
    });
  });

  describe('getSankhyaValue', () => {
    it('should return correct values for cardinal numbers', () => {
      expect(getSankhyaValue('eka')).toBe(1);
      expect(getSankhyaValue('dvi')).toBe(2);
      expect(getSankhyaValue('tri')).toBe(3);
      expect(getSankhyaValue('pañca')).toBe(5);
      expect(getSankhyaValue('daśa')).toBe(10);
      expect(getSankhyaValue('śata')).toBe(100);
    });

    it('should work with Devanagari cardinal numbers', () => {
      expect(getSankhyaValue('एक')).toBe(1);
      expect(getSankhyaValue('द्वि')).toBe(2);
      expect(getSankhyaValue('त्रि')).toBe(3);
      expect(getSankhyaValue('पञ्च')).toBe(5);
      expect(getSankhyaValue('दश')).toBe(10);
    });

    it('should return null for non-cardinal numerals', () => {
      expect(getSankhyaValue('prathama')).toBe(null); // ordinal
      expect(getSankhyaValue('dviguṇa')).toBe(null);  // multiplicative
      expect(getSankhyaValue('ardha')).toBe(null);    // fractional
      expect(getSankhyaValue('dvaya')).toBe(null);    // collective
    });

    it('should return null for non-संख्या words', () => {
      expect(getSankhyaValue('guru')).toBe(null);
      expect(getSankhyaValue('nara')).toBe(null);
    });

    it('should handle edge cases', () => {
      expect(getSankhyaValue('')).toBe(null);
      expect(getSankhyaValue(null)).toBe(null);
    });
  });

  describe('real-world examples', () => {
    it('should work with compound numerals', () => {
      expect(isSankhya('ekādaśa')).toBe(true);  // eleven
      expect(isSankhya('dvādaśa')).toBe(true);  // twelve
      expect(isSankhya('viṃśati')).toBe(true);  // twenty
      expect(isSankhya('एकादश')).toBe(true);
      expect(isSankhya('द्वादश')).toBe(true);
    });

    it('should support grammatical analysis', () => {
      // For rules that specifically target संख्या
      expect(isSankhya('tri')).toBe(true);
      expect(identifySankhyaType('tri').type).toBe('cardinal');
      
      // But not other quantifiers
      expect(isSankhya('bahu')).toBe(false); // much/many
      expect(isSankhya('alpa')).toBe(false); // few
    });

    it('should work in morphological contexts', () => {
      // Cardinal with value extraction
      expect(getSankhyaValue('catur')).toBe(4);
      expect(isSankhyaType('catur', 'cardinal')).toBe(true);
      
      // Ordinal identification
      expect(isSankhyaType('caturtha', 'ordinal')).toBe(true);
      
      // Multiplicative identification
      expect(isSankhyaType('caturguṇa', 'multiplicative')).toBe(true);
    });

    it('should support syntactic analysis', () => {
      // In compound analysis
      const context = { 
        morphology: 'compound', 
        role: 'numeral',
        semantics: 'quantity'
      };
      
      expect(hasSankhyaBehavior('tri', context)).toBe(true);
      expect(hasSankhyaBehavior('त्रि', context)).toBe(true);
    });

    it('should distinguish from similar words', () => {
      // संख्या vs. non-संख्या
      expect(isSankhya('tri')).toBe(true);      // three
      expect(isSankhya('tridā')).toBe(false);   // giving thrice (not a basic numeral)
      
      expect(isSankhya('द्वि')).toBe(true);      // two
      expect(isSankhya('द्विज')).toBe(false);    // twice-born (not a numeral)
    });

    it('should support complete numeral analysis', () => {
      // Comprehensive analysis
      const analysis = identifySankhyaType('pañcama');
      expect(analysis.isSankhya).toBe(true);
      expect(analysis.type).toBe('ordinal');
      expect(analysis.script).toBe('IAST');
      expect(analysis.word).toBe('pañcama');
      
      // Value extraction for cardinals only
      expect(getSankhyaValue('pañca')).toBe(5);
      expect(getSankhyaValue('pañcama')).toBe(null); // ordinal, not cardinal
    });
  });
});
