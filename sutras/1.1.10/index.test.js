/**
 * Test cases for Sutra 1.1.10: नाज्झलौ (najahaslau)
 * "There is however no homogeneity between vowels and consonants"
 */

import { checkHomogeneityRestriction, isHomogeneityBlocked } from './index.js';

describe('Sutra 1.1.10: नाज्झलौ (najahaslau)', () => {
  describe('checkHomogeneityRestriction', () => {
    it('should return false when comparing vowel with consonant', () => {
      // Vowel vs Consonant - should never be savarṇa
      expect(checkHomogeneityRestriction('a', 'k')).toBe(false);
      expect(checkHomogeneityRestriction('i', 'c')).toBe(false);
      expect(checkHomogeneityRestriction('u', 'p')).toBe(false);
      expect(checkHomogeneityRestriction('e', 't')).toBe(false);
      expect(checkHomogeneityRestriction('o', 'm')).toBe(false);
    });

    it('should return false when comparing consonant with vowel', () => {
      // Consonant vs Vowel - should never be savarṇa
      expect(checkHomogeneityRestriction('k', 'a')).toBe(false);
      expect(checkHomogeneityRestriction('c', 'i')).toBe(false);
      expect(checkHomogeneityRestriction('p', 'u')).toBe(false);
      expect(checkHomogeneityRestriction('t', 'e')).toBe(false);
      expect(checkHomogeneityRestriction('m', 'o')).toBe(false);
    });

    it('should allow checking homogeneity between vowels', () => {
      // Vowel vs Vowel - this sutra doesn't restrict
      expect(checkHomogeneityRestriction('a', 'ā')).toBe(true);
      expect(checkHomogeneityRestriction('i', 'ī')).toBe(true);
      expect(checkHomogeneityRestriction('u', 'ū')).toBe(true);
    });

    it('should allow checking homogeneity between consonants', () => {
      // Consonant vs Consonant - this sutra doesn't restrict
      expect(checkHomogeneityRestriction('k', 'g')).toBe(true);
      expect(checkHomogeneityRestriction('c', 'j')).toBe(true);
      expect(checkHomogeneityRestriction('p', 'b')).toBe(true);
    });

    it('should handle Devanagari script', () => {
      // Vowel vs Consonant in Devanagari
      expect(checkHomogeneityRestriction('अ', 'क')).toBe(false);
      expect(checkHomogeneityRestriction('इ', 'च')).toBe(false);
      
      // Consonant vs Vowel in Devanagari
      expect(checkHomogeneityRestriction('क', 'अ')).toBe(false);
      expect(checkHomogeneityRestriction('च', 'इ')).toBe(false);
      
      // Same category comparisons
      expect(checkHomogeneityRestriction('अ', 'आ')).toBe(true);
      expect(checkHomogeneityRestriction('क', 'ग')).toBe(true);
    });

    it('should handle edge cases', () => {
      expect(checkHomogeneityRestriction('', 'a')).toBe(false);
      expect(checkHomogeneityRestriction('a', '')).toBe(false);
      expect(checkHomogeneityRestriction('', '')).toBe(false);
      expect(checkHomogeneityRestriction(null, 'a')).toBe(false);
      expect(checkHomogeneityRestriction('a', null)).toBe(false);
      expect(checkHomogeneityRestriction(undefined, 'a')).toBe(false);
    });
  });

  describe('isHomogeneityBlocked', () => {
    it('should return true when homogeneity is blocked by vowel-consonant restriction', () => {
      expect(isHomogeneityBlocked('a', 'k')).toBe(true);
      expect(isHomogeneityBlocked('k', 'a')).toBe(true);
      expect(isHomogeneityBlocked('i', 'c')).toBe(true);
      expect(isHomogeneityBlocked('c', 'i')).toBe(true);
    });

    it('should return false when this sutra does not block homogeneity', () => {
      expect(isHomogeneityBlocked('a', 'ā')).toBe(false);
      expect(isHomogeneityBlocked('k', 'g')).toBe(false);
      expect(isHomogeneityBlocked('i', 'ī')).toBe(false);
    });
  });

  describe('real-world examples', () => {
    it('should prevent homogeneity between vowels and consonants with same place of articulation', () => {
      // Even though 'a' (velar vowel) and 'k' (velar consonant) share place,
      // they cannot be savarṇa according to this sutra
      expect(checkHomogeneityRestriction('a', 'k')).toBe(false);
      expect(checkHomogeneityRestriction('k', 'a')).toBe(false);
      
      // Similarly for other places of articulation
      expect(checkHomogeneityRestriction('i', 'c')).toBe(false); // palatal
      expect(checkHomogeneityRestriction('u', 'p')).toBe(false); // labial
    });
  });
});
