/**
 * Test cases for Sutra 1.1.25: डति च
 * Testing the डति affix extension to षट् classification
 */

import { 
  hasDateAffix,
  isShatByDati,
  isShatExtended,
  getDatiAffixForms,
  analyzeDatiUsage,
  identifyCompleteShatType,
  hasCompleteShatBehavior,
  getDatiShatExamples,
  isInterrogativeDati,
  isDemonstrativeDati,
  DATI_AFFIX_FORMS
} from './index.js';

describe('Sutra 1.1.25: डति च', () => {
  describe('hasDateAffix', () => {
    it('should identify डति affix in IAST', () => {
      expect(hasDateAffix('kati')).toBe(true);    // कति + डति
      expect(hasDateAffix('yati')).toBe(true);    // यति + डति
      expect(hasDateAffix('tati')).toBe(true);    // तति + डति
    });

    it('should identify डति affix in Devanagari', () => {
      expect(hasDateAffix('कति')).toBe(true);
      expect(hasDateAffix('यति')).toBe(true);
      expect(hasDateAffix('तति')).toBe(true);
      expect(hasDateAffix('इयति')).toBe(true);
    });

    it('should reject words without डति affix', () => {
      expect(hasDateAffix('eka')).toBe(false);
      expect(hasDateAffix('tri')).toBe(false);
      expect(hasDateAffix('guru')).toBe(false);
      expect(hasDateAffix('एक')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(hasDateAffix('')).toBe(false);
      expect(hasDateAffix(null)).toBe(false);
    });
  });

  describe('isShatByDati', () => {
    it('should identify known डति forms in IAST', () => {
      expect(isShatByDati('kati')).toBe(true);    // how many
      expect(isShatByDati('yati')).toBe(true);    // as many
      expect(isShatByDati('tati')).toBe(true);    // so many
      expect(isShatByDati('iyati')).toBe(true);   // this many
      expect(isShatByDati('kiyati')).toBe(true);  // how much
    });

    it('should identify known डति forms in Devanagari', () => {
      expect(isShatByDati('कति')).toBe(true);
      expect(isShatByDati('यति')).toBe(true);
      expect(isShatByDati('तति')).toBe(true);
      expect(isShatByDati('इयति')).toBe(true);
      expect(isShatByDati('कियति')).toBe(true);
    });

    it('should reject non-डति संख्या forms', () => {
      expect(isShatByDati('eka')).toBe(false);
      expect(isShatByDati('dvi')).toBe(false);
      expect(isShatByDati('ṣaṣ')).toBe(false);    // षट् by 1.1.24, not 1.1.25
      expect(isShatByDati('एक')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isShatByDati('')).toBe(false);
      expect(isShatByDati(null)).toBe(false);
    });
  });

  describe('isShatExtended', () => {
    it('should recognize षट् from 1.1.24 (ष्/न् endings)', () => {
      expect(isShatExtended('ṣaṣ')).toBe(true);     // ष्-ending
      expect(isShatExtended('saptan')).toBe(true);  // न्-ending
      expect(isShatExtended('षष्')).toBe(true);
      expect(isShatExtended('सप्तन्')).toBe(true);
    });

    it('should recognize षट् from 1.1.25 (डति affix)', () => {
      expect(isShatExtended('kati')).toBe(true);
      expect(isShatExtended('yati')).toBe(true);
      expect(isShatExtended('कति')).toBe(true);
      expect(isShatExtended('यति')).toBe(true);
    });

    it('should reject non-षट् numerals', () => {
      expect(isShatExtended('eka')).toBe(false);
      expect(isShatExtended('tri')).toBe(false);
      expect(isShatExtended('pañca')).toBe(false);
      expect(isShatExtended('एक')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isShatExtended('')).toBe(false);
      expect(isShatExtended(null)).toBe(false);
    });
  });

  describe('getDatiAffixForms', () => {
    it('should return IAST forms by default', () => {
      const forms = getDatiAffixForms();
      expect(forms.affix).toBe('ḍati');
      expect(forms.examples).toContain('kati');
      expect(forms.examples).toContain('yati');
      expect(forms.examples).toContain('tati');
    });

    it('should return IAST forms when explicitly requested', () => {
      const forms = getDatiAffixForms('IAST');
      expect(forms.affix).toBe('ḍati');
      expect(forms.examples).toContain('iyati');
      expect(forms.examples).toContain('kiyati');
    });

    it('should return Devanagari forms when requested', () => {
      const forms = getDatiAffixForms('Devanagari');
      expect(forms.affix).toBe('डति');
      expect(forms.examples).toContain('कति');
      expect(forms.examples).toContain('यति');
      expect(forms.examples).toContain('तति');
    });
  });

  describe('analyzeDatiUsage', () => {
    it('should analyze known डति forms', () => {
      const result1 = analyzeDatiUsage('kati');
      expect(result1.hasDati).toBe(true);
      expect(result1.type).toBe('known_form');
      expect(result1.script).toBe('IAST');
      expect(result1.affix).toBe('ḍati');

      const result2 = analyzeDatiUsage('कति');
      expect(result2.hasDati).toBe(true);
      expect(result2.type).toBe('known_form');
      expect(result2.script).toBe('Devanagari');
      expect(result2.affix).toBe('डति');
    });

    it('should return negative results for non-डति words', () => {
      const result = analyzeDatiUsage('eka');
      expect(result.hasDati).toBe(false);
      expect(result.type).toBe(null);
    });

    it('should handle edge cases', () => {
      const result1 = analyzeDatiUsage('');
      expect(result1.hasDati).toBe(false);

      const result2 = analyzeDatiUsage(null);
      expect(result2.hasDati).toBe(false);
    });
  });

  describe('identifyCompleteShatType', () => {
    it('should identify षट् from 1.1.25 (डति)', () => {
      const result = identifyCompleteShatType('kati');
      expect(result.isShat).toBe(true);
      expect(result.source).toBe('1.1.25');
      expect(result.type).toBe('dati_affix');
      expect(result.script).toBe('IAST');
    });

    it('should work with Devanagari', () => {
      const result = identifyCompleteShatType('कति');
      expect(result.isShat).toBe(true);
      expect(result.source).toBe('1.1.25');
      expect(result.type).toBe('dati_affix');
      expect(result.script).toBe('Devanagari');
    });

    it('should return negative results for non-षट् words', () => {
      const result = identifyCompleteShatType('guru');
      expect(result.isShat).toBe(false);
      expect(result.source).toBe(null);
      expect(result.type).toBe(null);
    });

    it('should handle edge cases', () => {
      const result1 = identifyCompleteShatType('');
      expect(result1.isShat).toBe(false);

      const result2 = identifyCompleteShatType(null);
      expect(result2.isShat).toBe(false);
    });
  });

  describe('hasCompleteShatBehavior', () => {
    it('should return true for डति forms', () => {
      expect(hasCompleteShatBehavior('kati')).toBe(true);
      expect(hasCompleteShatBehavior('yati')).toBe(true);
      expect(hasCompleteShatBehavior('कति')).toBe(true);
    });

    it('should consider morphological context', () => {
      const context1 = { morphology: 'numeral', affix: 'ḍati' };
      expect(hasCompleteShatBehavior('anyword', context1)).toBe(true);
      
      const context2 = { morphology: 'numeral', affix: 'डति' };
      expect(hasCompleteShatBehavior('कोइ', context2)).toBe(true);
    });

    it('should return false for non-षट् words without context', () => {
      expect(hasCompleteShatBehavior('guru')).toBe(false);
      expect(hasCompleteShatBehavior('eka')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(hasCompleteShatBehavior('')).toBe(false);
      expect(hasCompleteShatBehavior(null)).toBe(false);
    });
  });

  describe('getDatiShatExamples', () => {
    it('should return IAST examples by default', () => {
      const examples = getDatiShatExamples();
      expect(examples).toContain('kati');
      expect(examples).toContain('yati');
      expect(examples).toContain('tati');
      expect(examples.length).toBe(4);
    });

    it('should return Devanagari examples when requested', () => {
      const examples = getDatiShatExamples('Devanagari');
      expect(examples).toContain('कति');
      expect(examples).toContain('यति');
      expect(examples).toContain('तति');
      expect(examples.length).toBe(4);
    });
  });

  describe('isInterrogativeDati', () => {
    it('should identify interrogative डति forms in IAST', () => {
      expect(isInterrogativeDati('kati')).toBe(true);    // how many
      expect(isInterrogativeDati('kiyati')).toBe(true);  // how much
      expect(isInterrogativeDati('yati')).toBe(false);   // not interrogative
    });

    it('should identify interrogative डति forms in Devanagari', () => {
      expect(isInterrogativeDati('कति')).toBe(true);
      expect(isInterrogativeDati('कियति')).toBe(true);
      expect(isInterrogativeDati('यति')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isInterrogativeDati('')).toBe(false);
      expect(isInterrogativeDati(null)).toBe(false);
    });
  });

  describe('isDemonstrativeDati', () => {
    it('should identify demonstrative डति forms in IAST', () => {
      expect(isDemonstrativeDati('tati')).toBe(true);    // so many
      expect(isDemonstrativeDati('iyati')).toBe(true);   // this many
      expect(isDemonstrativeDati('etati')).toBe(true);   // this much
      expect(isDemonstrativeDati('kati')).toBe(false);   // not demonstrative
    });

    it('should identify demonstrative डति forms in Devanagari', () => {
      expect(isDemonstrativeDati('तति')).toBe(true);
      expect(isDemonstrativeDati('इयति')).toBe(true);
      expect(isDemonstrativeDati('एतति')).toBe(true);
      expect(isDemonstrativeDati('कति')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isDemonstrativeDati('')).toBe(false);
      expect(isDemonstrativeDati(null)).toBe(false);
    });
  });

  describe('real-world examples', () => {
    it('should work with interrogative numerals', () => {
      // कति (how many) - interrogative numeral with डति
      expect(isShatByDati('kati')).toBe(true);
      expect(isInterrogativeDati('kati')).toBe(true);
      expect(isDemonstrativeDati('kati')).toBe(false);
      
      const analysis = identifyCompleteShatType('कति');
      expect(analysis.source).toBe('1.1.25');
      expect(analysis.type).toBe('dati_affix');
    });

    it('should work with demonstrative numerals', () => {
      // तति (so many) - demonstrative numeral with डति
      expect(isShatByDati('tati')).toBe(true);
      expect(isDemonstrativeDati('tati')).toBe(true);
      expect(isInterrogativeDati('tati')).toBe(false);
      
      expect(isShatExtended('तति')).toBe(true);
    });

    it('should support complete षट् classification', () => {
      // षट् from 1.1.24 (ष्/न् endings)
      expect(isShatExtended('ṣaṣ')).toBe(true);    // from 1.1.24
      expect(isShatExtended('saptan')).toBe(true); // from 1.1.24
      
      // षट् from 1.1.25 (डति affix)  
      expect(isShatExtended('kati')).toBe(true);   // from 1.1.25
      expect(isShatExtended('yati')).toBe(true);   // from 1.1.25
      
      // Non-षट् numerals
      expect(isShatExtended('eka')).toBe(false);
      expect(isShatExtended('tri')).toBe(false);
    });

    it('should distinguish डति forms from similar words', () => {
      // डति forms vs. similar non-डति words
      expect(isShatByDati('kati')).toBe(true);     // कति (how many) - has डति
      expect(isShatByDati('kata')).toBe(false);    // कत (made) - no डति
      
      expect(isShatByDati('yati')).toBe(true);     // यति (as many) - has डति  
      expect(isShatByDati('yata')).toBe(false);    // यत (that which) - no डति
    });

    it('should work in grammatical analysis', () => {
      // For rules targeting षट् numerals (both 1.1.24 and 1.1.25)
      const context = { morphology: 'numeral', semantics: 'quantity' };
      
      expect(hasCompleteShatBehavior('kati', context)).toBe(true);
      expect(hasCompleteShatBehavior('ṣaṣ', context)).toBe(true);
      expect(hasCompleteShatBehavior('eka', context)).toBe(false);
    });

    it('should support morphological parsing', () => {
      // Complete morphological analysis of डति forms
      const analysis1 = analyzeDatiUsage('kiyati');
      expect(analysis1.hasDati).toBe(true);
      expect(analysis1.type).toBe('known_form');
      expect(analysis1.affix).toBe('ḍati');
      
      // Integration with complete षट् system
      const analysis2 = identifyCompleteShatType('कियति');
      expect(analysis2.isShat).toBe(true);
      expect(analysis2.source).toBe('1.1.25');
      expect(analysis2.type).toBe('dati_affix');
    });
  });
});
