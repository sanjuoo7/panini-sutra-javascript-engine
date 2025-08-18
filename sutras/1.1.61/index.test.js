/**
 * Comprehensive test suite for Sutra 1.1.61: प्रत्ययस्य लुक्श्लुलुपः (pratyayasya lukślulupaḥ)
 *
 * Tests cover:
 * 1. Basic functionality and elision type checking
 * 2. Comprehensive affix elision analysis
 * 3. Script detection and validation
 * 4. Traditional commentary integration
 * 5. Edge cases and error handling
 */

import { isLukSluLup, analyzeAffixElision } from './index.js';

describe('Sutra 1.1.61: प्रत्ययस्य लुक्श्लुलुपः (pratyayasya lukślulupaḥ)', () => {
  describe('isLukSluLup() - Basic Functionality', () => {
    describe('Positive Cases', () => {
      it("should return true for 'luk'", () => {
        expect(isLukSluLup('luk')).toBe(true);
      });

      it("should return true for 'ślu'", () => {
        expect(isLukSluLup('ślu')).toBe(true);
      });

      it("should return true for 'lup'", () => {
        expect(isLukSluLup('lup')).toBe(true);
      });
    });

    describe('Negative Cases', () => {
      it("should return false for 'lopa'", () => {
        expect(isLukSluLup('lopa')).toBe(false);
      });

      it("should return false for an empty string", () => {
        expect(isLukSluLup('')).toBe(false);
      });

      it("should return false for a random string", () => {
        expect(isLukSluLup('random')).toBe(false);
      });
    });

    describe('Edge Cases', () => {
      it('should return false for null', () => {
        expect(isLukSluLup(null)).toBe(false);
      });

      it('should return false for undefined', () => {
        expect(isLukSluLup(undefined)).toBe(false);
      });

      it('should return false for a number', () => {
        expect(isLukSluLup(123)).toBe(false);
      });

      it('should return false for an object', () => {
        expect(isLukSluLup({})).toBe(false);
      });

      it('should return false for an array', () => {
        expect(isLukSluLup([])).toBe(false);
      });
    });
  });

  describe('analyzeAffixElision() - Core Functionality', () => {
    it('should analyze luk elision correctly', () => {
      const result = analyzeAffixElision('लुक्');
      expect(result.isValid).toBe(true);
      expect(result.elisionAnalysis.isAffixElision).toBe(true);
      expect(result.elisionAnalysis.designation).toBe('luk');
      expect(result.elisionAnalysis.elisionType).toBe('complete_elision');
    });

    it('should analyze ślu elision correctly', () => {
      const result = analyzeAffixElision('श्लु');
      expect(result.elisionAnalysis.isAffixElision).toBe(true);
      expect(result.elisionAnalysis.designation).toBe('ślu');
      expect(result.elisionAnalysis.elisionType).toBe('conditional_elision');
    });

    it('should analyze lup elision correctly', () => {
      const result = analyzeAffixElision('लुप्');
      expect(result.elisionAnalysis.isAffixElision).toBe(true);
      expect(result.elisionAnalysis.designation).toBe('lup');
      expect(result.elisionAnalysis.elisionType).toBe('contextual_elision');
    });

    it('should provide sutra reference', () => {
      const result = analyzeAffixElision('luk');
      expect(result.sutra).toBe('1.1.61');
      expect(result.rule).toBe('प्रत्ययस्य लुक्श्लुलुपः (pratyayasya lukślulupaḥ)');
    });

    it('should handle IAST input', () => {
      const result = analyzeAffixElision('luk');
      expect(result.elisionAnalysis.isAffixElision).toBe(true);
      expect(result.elisionAnalysis.designation).toBe('luk');
    });
  });

  describe('analyzeAffixElision() - Affix Context Detection', () => {
    it('should detect affix contexts for case endings', () => {
      const result = analyzeAffixElision('सु');
      expect(result.elisionAnalysis.isAffixElision).toBe(true);
      expect(result.elisionAnalysis.affixCharacteristics).toContain('affix_context_present');
    });

    it('should detect affix contexts for verb endings', () => {
      const result = analyzeAffixElision('ति');
      expect(result.elisionAnalysis.isAffixElision).toBe(true);
      expect(result.elisionAnalysis.affixCharacteristics).toContain('affix_context_present');
    });

    it('should not detect affix contexts in regular words', () => {
      const result = analyzeAffixElision('घट');
      expect(result.elisionAnalysis.isAffixElision).toBe(false);
    });
  });

  describe('analyzeAffixElision() - Morphological Analysis', () => {
    it('should classify case ending affixes', () => {
      const result = analyzeAffixElision('सु');
      expect(result.morphologicalAnalysis.affixType).toBe('case_ending');
    });

    it('should classify verb ending affixes', () => {
      const result = analyzeAffixElision('ति');
      expect(result.morphologicalAnalysis.affixType).toBe('verb_ending');
    });

    it('should analyze elision context for luk', () => {
      const result = analyzeAffixElision('लुक्');
      expect(result.morphologicalAnalysis.elisionContext).toBe('luk_context');
    });

    it('should analyze elision context for ślu', () => {
      const result = analyzeAffixElision('श्लु');
      expect(result.morphologicalAnalysis.elisionContext).toBe('slu_context');
    });

    it('should analyze elision context for lup', () => {
      const result = analyzeAffixElision('लुप्');
      expect(result.morphologicalAnalysis.elisionContext).toBe('lup_context');
    });
  });

  describe('analyzeAffixElision() - Phonetic Analysis', () => {
    it('should detect sibilant factors', () => {
      const result = analyzeAffixElision('स्');
      expect(result.phoneticAnalysis.euphonic_factors).toContain('sibilant_present');
    });

    it('should detect visarga factors', () => {
      const result = analyzeAffixElision('ः');
      expect(result.phoneticAnalysis.euphonic_factors).toContain('visarga_present');
    });

    it('should detect sandhi boundaries', () => {
      const result = analyzeAffixElision('राम + सु');
      expect(result.phoneticAnalysis.sandhi_requirements).toContain('sandhi_boundary');
    });

    it('should provide phonetic context', () => {
      const result = analyzeAffixElision('luk');
      expect(result.phoneticAnalysis.phonetic_context).toBeDefined();
    });
  });

  describe('analyzeAffixElision() - Grammatical Analysis', () => {
    it('should analyze syntactic role', () => {
      const result = analyzeAffixElision('सु');
      expect(result.grammaticalAnalysis.syntactic_role).toBeDefined();
    });

    it('should provide semantic factors array', () => {
      const result = analyzeAffixElision('luk');
      expect(Array.isArray(result.grammaticalAnalysis.semantic_factors)).toBe(true);
    });

    it('should provide pragmatic conditions array', () => {
      const result = analyzeAffixElision('ślu');
      expect(Array.isArray(result.grammaticalAnalysis.pragmatic_conditions)).toBe(true);
    });
  });

  describe('analyzeAffixElision() - Script Detection', () => {
    it('should detect Devanagari script', () => {
      const result = analyzeAffixElision('प्रत्यय');
      expect(result.script).toBe('devanagari');
    });

    it('should detect IAST script', () => {
      const result = analyzeAffixElision('pratyaya');
      expect(result.script).toBe('iast');
    });

    it('should handle mixed or unknown scripts', () => {
      const result = analyzeAffixElision('test123');
      expect(result.script).toBeDefined();
    });
  });

  describe('analyzeAffixElision() - Traditional Commentary', () => {
    it('should include Kashika commentary', () => {
      const result = analyzeAffixElision('luk');
      expect(result.traditionalCommentary.kashika).toContain('प्रत्ययस्य लुक्श्लुलुपः');
    });

    it('should include Mahabhashya commentary', () => {
      const result = analyzeAffixElision('ślu');
      expect(result.traditionalCommentary.mahabhashya).toContain('प्रत्ययस्य इति विशेषणम्');
    });

    it('should include English explanation', () => {
      const result = analyzeAffixElision('lup');
      expect(result.traditionalCommentary.english).toContain('affix');
      expect(result.traditionalCommentary.english).toContain('disappearance');
    });
  });

  describe('analyzeAffixElision() - Confidence Scoring', () => {
    it('should assign high confidence to clear elision cases', () => {
      const result = analyzeAffixElision('लुक्');
      expect(result.confidence).toBeGreaterThan(80);
    });

    it('should assign medium confidence to affix contexts', () => {
      const result = analyzeAffixElision('सु');
      expect(result.confidence).toBeGreaterThan(40);
      expect(result.confidence).toBeLessThan(80);
    });

    it('should assign low confidence to non-affix cases', () => {
      const result = analyzeAffixElision('घट');
      expect(result.confidence).toBeLessThan(20);
    });

    it('should cap confidence at 100', () => {
      const result = analyzeAffixElision('लुक् complete context');
      expect(result.confidence).toBeLessThanOrEqual(100);
    });
  });

  describe('analyzeAffixElision() - Input Validation', () => {
    it('should handle null input gracefully', () => {
      const result = analyzeAffixElision(null);
      expect(result.isValid).toBe(true);
      expect(result.elisionAnalysis.isAffixElision).toBe(false);
    });

    it('should handle undefined input gracefully', () => {
      const result = analyzeAffixElision(undefined);
      expect(result.isValid).toBe(true);
      expect(result.elisionAnalysis.isAffixElision).toBe(false);
    });

    it('should handle empty string input', () => {
      const result = analyzeAffixElision('');
      expect(result.isValid).toBe(true);
      expect(result.elisionAnalysis.isAffixElision).toBe(false);
    });

    it('should handle non-string input types', () => {
      expect(() => analyzeAffixElision(123)).not.toThrow();
      expect(() => analyzeAffixElision({})).not.toThrow();
      expect(() => analyzeAffixElision([])).not.toThrow();
    });

    it('should sanitize input properly', () => {
      const result = analyzeAffixElision('  लुक्  ');
      expect(typeof result.input).toBe('string');
      expect(result.input.trim()).toBe(result.input);
    });
  });

  describe('analyzeAffixElision() - Elision Type Characteristics', () => {
    it('should provide affix characteristics for elision types', () => {
      const result = analyzeAffixElision('लुक्');
      expect(result.elisionAnalysis.affixCharacteristics).toContain('affix_disappearance');
    });

    it('should distinguish between elision types', () => {
      const lukResult = analyzeAffixElision('लुक्');
      const sluResult = analyzeAffixElision('श्लु');
      const lupResult = analyzeAffixElision('लुप्');

      expect(lukResult.elisionAnalysis.elisionType).toBe('complete_elision');
      expect(sluResult.elisionAnalysis.elisionType).toBe('conditional_elision');
      expect(lupResult.elisionAnalysis.elisionType).toBe('contextual_elision');
    });
  });
});
