/**
 * Test cases for Sutra 1.1.24: ष्णान्ता षट्
 * Testing the षट् classification for numerals ending in ष् or न्
 */

import { 
  isShat,
  getShatNumerals,
  checkShatEnding,
  identifyShatType,
  hasShatBehavior,
  getShatExamples,
  isShatWithEnding,
  getPrimaryShatExample,
  SHAT_NUMERALS
} from './index.js';

describe('Sutra 1.1.24: ष्णान्ता षट्', () => {
  describe('isShat', () => {
    it('should identify ष्-ending numerals', () => {
      expect(isShat('ṣaṣ')).toBe(true);        // six (primary example)
      expect(isShat('viṃśatiṣ')).toBe(true);   // twenty
      expect(isShat('triṃśaṣ')).toBe(true);    // thirty
      
      expect(isShat('षष्')).toBe(true);
      expect(isShat('विंशतिष्')).toBe(true);
      expect(isShat('त्रिंशष्')).toBe(true);
    });

    it('should identify न्-ending numerals', () => {
      expect(isShat('saptan')).toBe(true);     // seven
      expect(isShat('aṣṭan')).toBe(true);      // eight
      expect(isShat('navan')).toBe(true);      // nine
      expect(isShat('daśan')).toBe(true);      // ten
      
      expect(isShat('सप्तन्')).toBe(true);
      expect(isShat('अष्टन्')).toBe(true);
      expect(isShat('नवन्')).toBe(true);
      expect(isShat('दशन्')).toBe(true);
    });

    it('should reject numerals not ending in ष् or न्', () => {
      expect(isShat('eka')).toBe(false);       // one
      expect(isShat('dvi')).toBe(false);       // two
      expect(isShat('tri')).toBe(false);       // three
      expect(isShat('pañca')).toBe(false);     // five
      expect(isShat('daśa')).toBe(false);      // ten (regular form)
      
      expect(isShat('एक')).toBe(false);
      expect(isShat('द्वि')).toBe(false);
      expect(isShat('त्रि')).toBe(false);
    });

    it('should reject non-numeral words', () => {
      expect(isShat('guru')).toBe(false);
      expect(isShat('laghu')).toBe(false);
      expect(isShat('nara')).toBe(false);
      expect(isShat('गुरु')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isShat('')).toBe(false);
      expect(isShat(null)).toBe(false);
      expect(isShat(undefined)).toBe(false);
    });
  });

  describe('getShatNumerals', () => {
    it('should return IAST numerals by default', () => {
      const numerals = getShatNumerals();
      expect(numerals.sha_ending).toContain('ṣaṣ');
      expect(numerals.na_ending).toContain('saptan');
      expect(numerals.na_ending).toContain('aṣṭan');
    });

    it('should return IAST numerals when explicitly requested', () => {
      const numerals = getShatNumerals('IAST');
      expect(numerals.sha_ending).toContain('ṣaṣ');
      expect(numerals.na_ending).toContain('navan');
    });

    it('should return Devanagari numerals when requested', () => {
      const numerals = getShatNumerals('Devanagari');
      expect(numerals.sha_ending).toContain('षष्');
      expect(numerals.na_ending).toContain('सप्तन्');
      expect(numerals.na_ending).toContain('अष्टन्');
    });

    it('should have consistent structure across scripts', () => {
      const iastNumerals = getShatNumerals('IAST');
      const devanagariNumerals = getShatNumerals('Devanagari');
      
      expect(Object.keys(iastNumerals)).toEqual(Object.keys(devanagariNumerals));
      expect(iastNumerals.sha_ending.length).toEqual(devanagariNumerals.sha_ending.length);
      expect(iastNumerals.na_ending.length).toEqual(devanagariNumerals.na_ending.length);
    });
  });

  describe('checkShatEnding', () => {
    it('should identify ष्-endings in IAST', () => {
      const result = checkShatEnding('ṣaṣ');
      expect(result.isShat).toBe(true);
      expect(result.ending).toBe('ṣ');
      expect(result.script).toBe('IAST');
      expect(result.word).toBe('ṣaṣ');
    });

    it('should identify न्-endings in IAST', () => {
      const result = checkShatEnding('saptan');
      expect(result.isShat).toBe(true);
      expect(result.ending).toBe('n');
      expect(result.script).toBe('IAST');
    });

    it('should identify ष्-endings in Devanagari', () => {
      const result = checkShatEnding('षष्');
      expect(result.isShat).toBe(true);
      expect(result.ending).toBe('ष्');
      expect(result.script).toBe('Devanagari');
    });

    it('should identify न्-endings in Devanagari', () => {
      const result = checkShatEnding('सप्तन्');
      expect(result.isShat).toBe(true);
      expect(result.ending).toBe('न्');
      expect(result.script).toBe('Devanagari');
    });

    it('should return negative results for words without षट् endings', () => {
      const result1 = checkShatEnding('tri');
      expect(result1.isShat).toBe(false);
      expect(result1.ending).toBe(null);

      const result2 = checkShatEnding('एक');
      expect(result2.isShat).toBe(false);
      expect(result2.ending).toBe(null);
    });

    it('should handle edge cases', () => {
      const result1 = checkShatEnding('');
      expect(result1.isShat).toBe(false);

      const result2 = checkShatEnding(null);
      expect(result2.isShat).toBe(false);
    });
  });

  describe('identifyShatType', () => {
    it('should identify known ष्-ending numerals', () => {
      const result = identifyShatType('ṣaṣ');
      expect(result.isShat).toBe(true);
      expect(result.type).toBe('sha');
      expect(result.ending).toBe('ṣ');
      expect(result.script).toBe('IAST');
      expect(result.isKnownNumeral).toBe(true);
    });

    it('should identify known न्-ending numerals', () => {
      const result = identifyShatType('saptan');
      expect(result.isShat).toBe(true);
      expect(result.type).toBe('na');
      expect(result.ending).toBe('n');
      expect(result.script).toBe('IAST');
      expect(result.isKnownNumeral).toBe(true);
    });

    it('should work with Devanagari', () => {
      const result1 = identifyShatType('षष्');
      expect(result1.isShat).toBe(true);
      expect(result1.type).toBe('sha');
      expect(result1.ending).toBe('ष्');
      expect(result1.script).toBe('Devanagari');

      const result2 = identifyShatType('सप्तन्');
      expect(result2.isShat).toBe(true);
      expect(result2.type).toBe('na');
      expect(result2.ending).toBe('न्');
      expect(result2.script).toBe('Devanagari');
    });

    it('should return negative results for non-षट् words', () => {
      const result = identifyShatType('tri');
      expect(result.isShat).toBe(false);
      expect(result.type).toBe(null);
      expect(result.ending).toBe(null);
    });

    it('should handle edge cases', () => {
      const result1 = identifyShatType('');
      expect(result1.isShat).toBe(false);

      const result2 = identifyShatType(null);
      expect(result2.isShat).toBe(false);
    });
  });

  describe('hasShatBehavior', () => {
    it('should return true for direct षट् numerals', () => {
      expect(hasShatBehavior('ṣaṣ')).toBe(true);
      expect(hasShatBehavior('saptan')).toBe(true);
      expect(hasShatBehavior('षष्')).toBe(true);
      expect(hasShatBehavior('सप्तन्')).toBe(true);
    });

    it('should consider morphological context', () => {
      const context1 = { morphology: 'numeral', ending: 'ṣ' };
      expect(hasShatBehavior('anyṣ', context1)).toBe(true);
      
      const context2 = { morphology: 'numeral', ending: 'n' };
      expect(hasShatBehavior('anyn', context2)).toBe(true);
    });

    it('should work with Devanagari context', () => {
      const context1 = { morphology: 'numeral', ending: 'ष्' };
      expect(hasShatBehavior('कोष्', context1)).toBe(true);
      
      const context2 = { morphology: 'numeral', ending: 'न्' };
      expect(hasShatBehavior('कोन्', context2)).toBe(true);
    });

    it('should return false for non-षट् words without context', () => {
      expect(hasShatBehavior('tri')).toBe(false);
      expect(hasShatBehavior('guru')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(hasShatBehavior('')).toBe(false);
      expect(hasShatBehavior(null)).toBe(false);
    });
  });

  describe('getShatExamples', () => {
    it('should return IAST examples by default', () => {
      const examples = getShatExamples();
      expect(examples.sha_ending).toContain('ṣaṣ');
      expect(examples.na_ending).toContain('saptan');
      expect(examples.na_ending).toContain('aṣṭan');
    });

    it('should return Devanagari examples when requested', () => {
      const examples = getShatExamples('Devanagari');
      expect(examples.sha_ending).toContain('षष्');
      expect(examples.na_ending).toContain('सप्तन्');
      expect(examples.na_ending).toContain('अष्टन्');
    });

    it('should return limited examples for each category', () => {
      const examples = getShatExamples();
      expect(examples.sha_ending.length).toBe(3);
      expect(examples.na_ending.length).toBe(5);
    });
  });

  describe('isShatWithEnding', () => {
    it('should check for ष्-ending specifically', () => {
      expect(isShatWithEnding('ṣaṣ', 'sha')).toBe(true);
      expect(isShatWithEnding('saptan', 'sha')).toBe(false);
      expect(isShatWithEnding('षष्', 'sha')).toBe(true);
    });

    it('should check for न्-ending specifically', () => {
      expect(isShatWithEnding('saptan', 'na')).toBe(true);
      expect(isShatWithEnding('ṣaṣ', 'na')).toBe(false);
      expect(isShatWithEnding('सप्तन्', 'na')).toBe(true);
    });

    it('should return false for non-षट् words', () => {
      expect(isShatWithEnding('tri', 'sha')).toBe(false);
      expect(isShatWithEnding('tri', 'na')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isShatWithEnding('', 'sha')).toBe(false);
      expect(isShatWithEnding('ṣaṣ', '')).toBe(false);
      expect(isShatWithEnding(null, 'sha')).toBe(false);
    });
  });

  describe('getPrimaryShatExample', () => {
    it('should return ṣaṣ for IAST', () => {
      expect(getPrimaryShatExample('IAST')).toBe('ṣaṣ');
      expect(getPrimaryShatExample()).toBe('ṣaṣ'); // default
    });

    it('should return षष् for Devanagari', () => {
      expect(getPrimaryShatExample('Devanagari')).toBe('षष्');
    });
  });

  describe('real-world examples', () => {
    it('should work with the primary षट् example', () => {
      // ṣaṣ (six) is the primary example that gives षट् its name
      expect(isShat('ṣaṣ')).toBe(true);
      expect(isShat('षष्')).toBe(true);
      
      const analysis = identifyShatType('ṣaṣ');
      expect(analysis.type).toBe('sha');
      expect(analysis.ending).toBe('ṣ');
    });

    it('should support grammatical analysis', () => {
      // For rules that specifically target षट् numerals
      expect(isShat('ṣaṣ')).toBe(true);
      expect(identifyShatType('ṣaṣ').type).toBe('sha');
      
      // But not other numerals
      expect(isShat('pañca')).toBe(false); // five
      expect(isShat('daśa')).toBe(false);  // ten (regular form)
    });

    it('should work in morphological contexts', () => {
      // ष्-ending identification
      expect(isShatWithEnding('ṣaṣ', 'sha')).toBe(true);
      expect(checkShatEnding('ṣaṣ').ending).toBe('ṣ');
      
      // न्-ending identification  
      expect(isShatWithEnding('saptan', 'na')).toBe(true);
      expect(checkShatEnding('saptan').ending).toBe('n');
    });

    it('should distinguish from similar numerals', () => {
      // षट् vs. non-षट् forms of same numbers
      expect(isShat('ṣaṣ')).toBe(true);     // six (षट् form)
      expect(isShat('ṣaḍ')).toBe(false);    // six (non-षट् form)
      
      expect(isShat('saptan')).toBe(true);  // seven (षट् form)
      expect(isShat('sapta')).toBe(false);  // seven (non-षट् form)
      
      expect(isShat('daśan')).toBe(true);   // ten (षट् form)
      expect(isShat('daśa')).toBe(false);   // ten (non-षट् form)
    });

    it('should support complete षट् analysis', () => {
      // Comprehensive analysis
      const analysis = identifyShatType('aṣṭan');
      expect(analysis.isShat).toBe(true);
      expect(analysis.type).toBe('na');
      expect(analysis.ending).toBe('n');
      expect(analysis.script).toBe('IAST');
      expect(analysis.isKnownNumeral).toBe(true);
      
      // Primary example analysis
      expect(getPrimaryShatExample()).toBe('ṣaṣ');
      expect(isShat(getPrimaryShatExample())).toBe(true);
    });

    it('should work with compound numerals', () => {
      // Compound forms that maintain षट् endings
      expect(isShat('ekādaśan')).toBe(true);  // eleven
      expect(isShat('dvādaśan')).toBe(true);  // twelve
      expect(isShat('एकादशन्')).toBe(true);
      expect(isShat('द्वादशन्')).toBe(true);
    });
  });
});
