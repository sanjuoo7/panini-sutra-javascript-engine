/**
 * Comprehensive test suite for Sutra 1.1.59: द्विर्वचनेऽचि (dvirvacane'ci)
 *
 * Tests cover:
 * 1. Positive cases where Sthānivadbhāva applies for Dvirvacana.
 * 2. Negative cases where Sthānivadbhāva does NOT apply due to unmet conditions.
 * 3. Edge cases and default behavior.
 */

import { appliesSthanivadbhavaForDvirvacana } from './index.js';

describe('Sutra 1.1.59: द्विर्वचनेऽचि (dvirvacane\'ci)', () => {
  // Positive Cases: All conditions met
  describe('Positive Cases', () => {
    it('should return true when sthani is a vowel, in dvirvacana context, and a vowel follows', () => {
      // Example: 'y' replaces 'i', in dvirvacana context, with 'a' following.
      expect(appliesSthanivadbhavaForDvirvacana('y', 'i', { isDvirvacanaContext: true, followingElement: 'a' })).toBe(true);
      expect(appliesSthanivadbhavaForDvirvacana('v', 'u', { isDvirvacanaContext: true, followingElement: 'ā' })).toBe(true);
      expect(appliesSthanivadbhavaForDvirvacana('r', 'ṛ', { isDvirvacanaContext: true, followingElement: 'e' })).toBe(true);
    });
  });

  // Negative Cases: One or more conditions not met
  describe('Negative Cases', () => {
    it('should return false if sthani is not a vowel', () => {
      // 'k' is a consonant.
      expect(appliesSthanivadbhavaForDvirvacana('t', 'k', { isDvirvacanaContext: true, followingElement: 'a' })).toBe(false);
    });

    it('should return false if not in dvirvacana context', () => {
      expect(appliesSthanivadbhavaForDvirvacana('y', 'i', { isDvirvacanaContext: false, followingElement: 'a' })).toBe(false);
      expect(appliesSthanivadbhavaForDvirvacana('y', 'i', { followingElement: 'a' })).toBe(false); // Default false
    });

    it('should return false if following element is not a vowel', () => {
      // 'k' is a consonant.
      expect(appliesSthanivadbhavaForDvirvacana('y', 'i', { isDvirvacanaContext: true, followingElement: 'k' })).toBe(false);
      expect(appliesSthanivadbhavaForDvirvacana('y', 'i', { isDvirvacanaContext: true })).toBe(false); // Default empty string, not a vowel
    });

    it('should return false if multiple conditions are not met', () => {
      expect(appliesSthanivadbhavaForDvirvacana('t', 'k', { isDvirvacanaContext: false, followingElement: 'k' })).toBe(false);
    });
  });

  // Edge Cases / Input Variations
  describe('Edge Cases / Input Variations', () => {
    it('should handle empty context object', () => {
      // All conditions default to false, so should return false
      expect(appliesSthanivadbhavaForDvirvacana('y', 'i', {})).toBe(false);
    });

    it('should handle non-string inputs for adesha and sthani (though isVowel handles it)', () => {
      // isVowel will return false for non-string inputs, leading to false
      expect(appliesSthanivadbhavaForDvirvacana(123, 456, { isDvirvacanaContext: true, followingElement: 'a' })).toBe(false);
    });

    it('should handle non-string inputs for followingElement (isVowel handles it)', () => {
      expect(appliesSthanivadbhavaForDvirvacana('y', 'i', { isDvirvacanaContext: true, followingElement: 123 })).toBe(false);
    });
  });
});
