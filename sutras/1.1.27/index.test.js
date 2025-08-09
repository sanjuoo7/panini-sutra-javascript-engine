/**
 * Test cases for Sutra 1.1.27: सर्वादीनि सर्वनामानि
 * "The words सर्व 'all' and the rest are called सर्वनाम or pronouns."
 */

import { isSarvanama, getSarvadiWords, hasSarvanamaBehavior } from './index.js';

describe('Sutra 1.1.27: सर्वादीनि सर्वनामानि', () => {
  describe('isSarvanama', () => {
    it('should identify सर्व as सर्वनाम', () => {
      expect(isSarvanama('sarva')).toBe(true);
      expect(isSarvanama('सर्व')).toBe(true);
      expect(isSarvanama('sarvaḥ')).toBe(true); // nominative
      expect(isSarvanama('सर्वः')).toBe(true);
    });

    it('should identify common pronouns as सर्वनाम', () => {
      expect(isSarvanama('tad')).toBe(true);
      expect(isSarvanama('etad')).toBe(true);
      expect(isSarvanama('idam')).toBe(true);
      expect(isSarvanama('kim')).toBe(true);
      expect(isSarvanama('yad')).toBe(true);
      
      // Devanagari
      expect(isSarvanama('तद्')).toBe(true);
      expect(isSarvanama('एतद्')).toBe(true);
      expect(isSarvanama('इदम्')).toBe(true);
    });

    it('should identify personal pronouns as सर्वनाम', () => {
      expect(isSarvanama('asmad')).toBe(true); // we/us
      expect(isSarvanama('yuṣmad')).toBe(true); // you
      expect(isSarvanama('अस्मद्')).toBe(true);
      expect(isSarvanama('युष्मद्')).toBe(true);
    });

    it('should identify other सर्वादि words as सर्वनाम', () => {
      expect(isSarvanama('anya')).toBe(true); // other
      expect(isSarvanama('viśva')).toBe(true); // all
      expect(isSarvanama('ubha')).toBe(true); // both
      expect(isSarvanama('pūrva')).toBe(true); // former
      expect(isSarvanama('para')).toBe(true); // latter
      
      // Devanagari
      expect(isSarvanama('अन्य')).toBe(true);
      expect(isSarvanama('विश्व')).toBe(true);
      expect(isSarvanama('पूर्व')).toBe(true);
    });

    it('should reject regular nouns', () => {
      expect(isSarvanama('rāma')).toBe(false);
      expect(isSarvanama('deva')).toBe(false);
      expect(isSarvanama('agni')).toBe(false);
      expect(isSarvanama('राम')).toBe(false);
      expect(isSarvanama('देव')).toBe(false);
    });

    it('should handle inflected forms', () => {
      expect(isSarvanama('sarvasya')).toBe(true); // genitive of sarva
      expect(isSarvanama('tasyāḥ')).toBe(true); // genitive fem. of tad
      expect(isSarvanama('kimcit')).toBe(true); // something
      expect(isSarvanama('सर्वस्य')).toBe(true);
    });

    it('should handle edge cases', () => {
      expect(isSarvanama('')).toBe(false);
      expect(isSarvanama(null)).toBe(false);
      expect(isSarvanama(undefined)).toBe(false);
    });
  });

  describe('getSarvadiWords', () => {
    it('should return IAST words by default', () => {
      const words = getSarvadiWords();
      expect(words).toContain('sarva');
      expect(words).toContain('tad');
      expect(words).toContain('kim');
      expect(words).toContain('yad');
    });

    it('should return IAST words when explicitly requested', () => {
      const words = getSarvadiWords('IAST');
      expect(words).toContain('sarva');
      expect(words).toContain('viśva');
      expect(words).toContain('anya');
    });

    it('should return Devanagari words when requested', () => {
      const words = getSarvadiWords('Devanagari');
      expect(words).toContain('सर्व');
      expect(words).toContain('तद्');
      expect(words).toContain('किम्');
    });

    it('should return arrays of appropriate length', () => {
      const iastWords = getSarvadiWords('IAST');
      const devanagariWords = getSarvadiWords('Devanagari');
      expect(iastWords.length).toBeGreaterThan(20);
      expect(devanagariWords.length).toBe(iastWords.length);
    });
  });

  describe('hasSarvanamaBehavior', () => {
    it('should return true for सर्वनाम words', () => {
      expect(hasSarvanamaBehavior('sarva')).toBe(true);
      expect(hasSarvanamaBehavior('tad')).toBe(true);
      expect(hasSarvanamaBehavior('kim')).toBe(true);
      expect(hasSarvanamaBehavior('सर्व')).toBe(true);
    });

    it('should return false for non-सर्वनाम words', () => {
      expect(hasSarvanamaBehavior('rāma')).toBe(false);
      expect(hasSarvanamaBehavior('deva')).toBe(false);
      expect(hasSarvanamaBehavior('agni')).toBe(false);
    });

    it('should work with grammatical context', () => {
      expect(hasSarvanamaBehavior('sarva', { case: 'nominative' })).toBe(true);
      expect(hasSarvanamaBehavior('tad', { number: 'singular' })).toBe(true);
      expect(hasSarvanamaBehavior('rāma', { case: 'nominative' })).toBe(false);
    });
  });

  describe('real-world examples', () => {
    it('should work with common sentences', () => {
      // Common pronouns in sentences
      expect(isSarvanama('sarva')).toBe(true); // all
      expect(isSarvanama('ayam')).toBe(false); // this (from idam, but inflected)
      expect(isSarvanama('idam')).toBe(true); // this (base form)
      expect(isSarvanama('tat')).toBe(true); // that
      expect(isSarvanama('yat')).toBe(true); // which/that
    });

    it('should distinguish pronouns from similar regular words', () => {
      // सर्वनाम words
      expect(isSarvanama('para')).toBe(true); // other/supreme (pronoun)
      expect(isSarvanama('pūrva')).toBe(true); // former (pronoun)
      expect(isSarvanama('uttara')).toBe(true); // latter (pronoun)
      
      // Regular words (should be false for basic classification)
      expect(isSarvanama('nara')).toBe(false); // man
      expect(isSarvanama('guru')).toBe(false); // teacher
      expect(isSarvanama('mata')).toBe(false); // mother
    });

    it('should work with interrogative and relative pronouns', () => {
      expect(isSarvanama('ka')).toBe(true); // who? (interrogative)
      expect(isSarvanama('kim')).toBe(true); // what? (interrogative)
      expect(isSarvanama('yad')).toBe(true); // which/that (relative)
      expect(isSarvanama('tad')).toBe(true); // that (demonstrative)
    });
  });
});
