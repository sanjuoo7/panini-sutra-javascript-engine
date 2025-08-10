/**
 * Comprehensive test suite for Sutra 1.1.57: अचः परस्मिन् पूर्वविधौ (acaḥ parasmin pūrvavidhau)
 *
 * Tests cover:
 * 1. Positive cases where Sthānivadbhāva applies according to 1.1.57.
 * 2. Negative cases where Sthānivadbhāva does NOT apply due to unmet conditions.
 * 3. Edge cases and default behavior.
 */

import { appliesSthanivadbhavaForPurvavidhi } from './index.js';

describe('Sutra 1.1.57: अचः परस्मिन् पूर्वविधौ (acaḥ parasmin pūrvavidhau)', () => {
  // Positive Cases: All conditions met
  describe('Positive Cases', () => {
    it('should return true when sthani is a vowel, caused by following, and is purvavidhi', () => {
      // Example: 'y' replaces 'i', caused by following, for a rule affecting preceding.
      expect(appliesSthanivadbhavaForPurvavidhi('y', 'i', { isCausedByFollowing: true, isPurvavidhi: true })).toBe(true);
      expect(appliesSthanivadbhavaForPurvavidhi('v', 'u', { isCausedByFollowing: true, isPurvavidhi: true })).toBe(true);
      expect(appliesSthanivadbhavaForPurvavidhi('r', 'ṛ', { isCausedByFollowing: true, isPurvavidhi: true })).toBe(true);
    });
  });

  // Negative Cases: One or more conditions not met
  describe('Negative Cases', () => {
    it('should return false if sthani is not a vowel', () => {
      // 'k' is a consonant, so sthanivadbhava should not apply under this sutra.
      expect(appliesSthanivadbhavaForPurvavidhi('t', 'k', { isCausedByFollowing: true, isPurvavidhi: true })).toBe(false);
      expect(appliesSthanivadbhavaForPurvavidhi('a', 'b', { isCausedByFollowing: true, isPurvavidhi: true })).toBe(false);
    });

    it('should return false if substitution is not caused by following', () => {
      // isCausedByFollowing is false
      expect(appliesSthanivadbhavaForPurvavidhi('y', 'i', { isCausedByFollowing: false, isPurvavidhi: true })).toBe(false);
      expect(appliesSthanivadbhavaForPurvavidhi('y', 'i', { isPurvavidhi: true })).toBe(false); // Default false
    });

    it('should return false if rule is not a purvavidhi', () => {
      // isPurvavidhi is false
      expect(appliesSthanivadbhavaForPurvavidhi('y', 'i', { isCausedByFollowing: true, isPurvavidhi: false })).toBe(false);
      expect(appliesSthanivadbhavaForPurvavidhi('y', 'i', { isCausedByFollowing: true })).toBe(false); // Default false
    });

    it('should return false if multiple conditions are not met', () => {
      expect(appliesSthanivadbhavaForPurvavidhi('t', 'k', { isCausedByFollowing: false, isPurvavidhi: false })).toBe(false);
    });
  });

  // Edge Cases / Input Variations
  describe('Edge Cases / Input Variations', () => {
    it('should handle empty context object', () => {
      // All conditions default to false, so should return false
      expect(appliesSthanivadbhavaForPurvavidhi('y', 'i', {})).toBe(false);
    });

    it('should handle non-string inputs for adesha and sthani (though isVowel handles it)', () => {
      // isVowel will return false for non-string inputs, leading to false
      expect(appliesSthanivadbhavaForPurvavidhi(123, 456, { isCausedByFollowing: true, isPurvavidhi: true })).toBe(false);
      expect(appliesSthanivadbhavaForPurvavidhi(null, undefined, { isCausedByFollowing: true, isPurvavidhi: true })).toBe(false);
    });
  });
});
