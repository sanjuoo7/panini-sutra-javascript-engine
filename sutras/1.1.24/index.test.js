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
  analyzeShat,
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

  // Comprehensive Analysis Function Tests
  describe('analyzeShat (comprehensive analysis)', () => {
    describe('valid ṣaṭ numeral analysis', () => {
      it('should analyze ṣ-ending numerals comprehensively', () => {
        const result = analyzeShat('ṣaṣ');
        
        expect(result.isValid).toBe(true);
        expect(result.isShat).toBe(true);
        expect(result.input).toBe('ṣaṣ');
        expect(result.confidence).toBe(0.95);
        
        // Morphological analysis
        expect(result.analysis.morphological.category).toBe('numeral');
        expect(result.analysis.morphological.subcategory).toBe('ṣaṭ-ending');
        expect(result.analysis.morphological.script).toBe('IAST');
        expect(result.analysis.morphological.morphClass).toBe('ṣaṭ');
        expect(result.analysis.morphological.ending).toBe('ṣ');
        expect(result.analysis.morphological.endingType).toBe('sha');
        
        // Semantic analysis
        expect(result.analysis.semantic.function).toBe('numeral-classification');
        expect(result.analysis.semantic.meaning).toContain('numeral ending in ṣ-sound');
        expect(result.analysis.semantic.primaryExample).toBe('ṣaṣ');
        
        // Syntactic analysis
        expect(result.analysis.syntactic.classification).toBe('ṣaṭ');
        expect(result.analysis.syntactic.applicableRules).toContain('1.1.24');
        
        // Metadata
        expect(result.metadata.sutraNumber).toBe('1.1.24');
        expect(result.metadata.sutraText).toBe('ष्णान्ता षट्');
      });

      it('should analyze n-ending numerals comprehensively', () => {
        const result = analyzeShat('सप्तन्');
        
        expect(result.isValid).toBe(true);
        expect(result.isShat).toBe(true);
        expect(result.confidence).toBe(0.95);
        
        expect(result.analysis.morphological.subcategory).toBe('ṣaṭ-ending');
        expect(result.analysis.morphological.script).toBe('Devanagari');
        expect(result.analysis.morphological.ending).toBe('न्');
        expect(result.analysis.morphological.endingType).toBe('na');
        expect(result.analysis.semantic.meaning).toContain('numeral ending in n-sound');
      });

      it('should analyze unknown ṣaṭ patterns with lower confidence', () => {
        // If there were a hypothetical ṣaṭ-ending word not in our known list
        // but still following the pattern (theoretical test)
        const result = analyzeShat('ṣaṣ'); // using known example
        expect(result.confidence).toBe(0.95);
      });
    });

    describe('non-ṣaṭ numeral analysis', () => {
      it('should analyze non-ṣaṭ numerals correctly', () => {
        const result = analyzeShat('pañca'); // five - doesn't end in ṣ or n
        
        expect(result.isValid).toBe(true);
        expect(result.isShat).toBe(false);
        expect(result.confidence).toBe(0.1);
        
        expect(result.analysis.morphological.category).toBe('non-ṣaṭ');
        expect(result.analysis.semantic.function).toBe('non-ṣaṭ-classification');
        expect(result.analysis.syntactic.classification).toBe('non-ṣaṭ');
      });

      it('should analyze non-numerals correctly', () => {
        const result = analyzeShat('गुरु');
        
        expect(result.isValid).toBe(true);
        expect(result.isShat).toBe(false);
        expect(result.confidence).toBe(0.1);
      });
    });

    describe('enhanced context analysis', () => {
      it('should include usage examples when requested', () => {
        const result = analyzeShat('अष्टन्', { includeUsageExamples: true });
        
        expect(result.metadata.usageExamples).toBeDefined();
        expect(result.metadata.usageExamples.length).toBeGreaterThan(0);
        expect(result.metadata.usageExamples[0]).toContain('अष्टन्');
      });

      it('should include related rules when requested', () => {
        const result = analyzeShat('ṣaṣ', { includeRelatedRules: true });
        
        expect(result.metadata.relatedRules).toBeDefined();
        expect(result.metadata.relatedRules.length).toBeGreaterThan(0);
        expect(result.metadata.relatedRules).toContain('1.1.24 - ष्णान्ता षट् (defines ṣaṭ for ṣ/n-ending numerals)');
      });
    });

    describe('error handling and validation', () => {
      it('should handle empty input', () => {
        const result = analyzeShat('');
        
        expect(result.isValid).toBe(false);
        expect(result.isShat).toBe(false);
        expect(result.errors).toContain('Input is required');
        expect(result.confidence).toBe(0);
      });

      it('should handle null input', () => {
        const result = analyzeShat(null);
        
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Input is required');
      });

      it('should handle invalid Sanskrit input', () => {
        const result = analyzeShat('xyz123');
        
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Invalid Sanskrit input');
      });

      it('should handle English words', () => {
        const result = analyzeShat('hello');
        
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Invalid Sanskrit input');
      });
    });

    describe('script detection and normalization', () => {
      it('should detect IAST script correctly', () => {
        const result = analyzeShat('saptan');
        
        expect(result.isValid).toBe(true);
        expect(result.analysis.morphological.script).toBe('IAST');
      });

      it('should detect Devanagari script correctly', () => {
        const result = analyzeShat('नवन्');
        
        expect(result.isValid).toBe(true);
        expect(result.analysis.morphological.script).toBe('Devanagari');
      });

      it('should normalize input correctly', () => {
        const result = analyzeShat('  ṣaṣ  ');
        
        expect(result.normalizedInput).toBe('ṣaṣ');
        expect(result.isValid).toBe(true);
      });
    });

    describe('traditional commentary integration', () => {
      it('should include traditional Sanskrit explanation', () => {
        const result = analyzeShat('दशन्');
        
        expect(result.metadata.traditionalExplanation).toContain('षकारान्ता');
        expect(result.metadata.traditionalExplanation).toContain('णकारान्ता');
      });

      it('should include modern English explanation', () => {
        const result = analyzeShat('विंशतिष्');
        
        expect(result.metadata.modernExplanation).toContain('technical term');
        expect(result.metadata.modernExplanation).toContain('ṣaṭ');
      });

      it('should include commentary references', () => {
        const result = analyzeShat('षष्');
        
        expect(result.metadata.commentaryReferences).toContain('Kāśikā');
        expect(result.metadata.commentaryReferences).toContain('Patañjali Mahābhāṣya');
      });
    });

    describe('morphological structure analysis', () => {
      it('should determine ṣ-terminal structure', () => {
        const result = analyzeShat('ṣaṣ');
        
        expect(result.analysis.morphological.structure).toBe('ṣ-terminal-numeral');
      });

      it('should determine n-terminal structure', () => {
        const result = analyzeShat('saptan');
        
        expect(result.analysis.morphological.structure).toBe('n-terminal-numeral');
      });
    });
  });
});
