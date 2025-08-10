/**
 * Comprehensive test suite for Sutra 1.1.56: स्थानिवदादेशोऽनल्विधौ (sthānivadādeśo'nalavidhau)
 *
 * Tests cover:
 * 1. Positive cases where Sthānivadbhāva applies (analvidhi).
 * 2. Negative cases where Sthānivadbhāva does NOT apply (alvidhi).
 * 3. Edge cases and default behavior.
 */

import { appliesSthanivadbhava } from './index.js';

describe('Sutra 1.1.56: स्थानिवदादेशोऽनल्विधौ (sthānivadādeśo\'nalavidhau)', () => {
  // Positive Cases: Sthānivadbhāva applies (analvidhi)
  describe('Positive Cases (analvidhi)', () => {
    it('should return true when ruleContext.isAlvidhi is false', () => {
      // Example: A rule that applies to "any vowel" (analvidhi)
      expect(appliesSthanivadbhava('i', 'y', { isAlvidhi: false })).toBe(true);
    });

    it('should return true when ruleContext.isAlvidhi is explicitly undefined', () => {
      // Example: A rule that applies to "any consonant" (analvidhi)
      expect(appliesSthanivadbhava('k', 'g', { isAlvidhi: undefined })).toBe(true);
    });

    it('should return true when ruleContext is an empty object (default isAlvidhi to false)', () => {
      // Example: A general rule not dependent on specific letters
      expect(appliesSthanivadbhava('a', 'i', {})).toBe(true);
    });

    it('should return true when ruleContext is not provided (default isAlvidhi to false)', () => {
      // Example: A general rule not dependent on specific letters
      expect(appliesSthanivadbhava('u', 'v')).toBe(true);
    });
  });

  // Negative Cases: Sthānivadbhāva does NOT apply (alvidhi)
  describe('Negative Cases (alvidhi)', () => {
    it('should return false when ruleContext.isAlvidhi is true', () => {
      // Example: A rule that specifically applies to the letter 'a' (alvidhi)
      expect(appliesSthanivadbhava('i', 'a', { isAlvidhi: true })).toBe(false);
    });

    it('should return false even if adesha and sthani are the same but isAlvidhi is true', () => {
      // This scenario is unlikely in practice but tests the core logic of the sutra
      expect(appliesSthanivadbhava('a', 'a', { isAlvidhi: true })).toBe(false);
    });
  });

  // Edge Cases / Invalid Inputs (Sutra 1.1.56 primarily defines a principle, not input validation)
  describe('Edge Cases / Input Variations', () => {
    it('should handle non-string inputs for adesha and sthani (though not typical for Panini)', () => {
      // The function's logic only depends on ruleContext.isAlvidhi
      expect(appliesSthanivadbhava(123, 456, { isAlvidhi: false })).toBe(true);
      expect(appliesSthanivadbhava(null, undefined, { isAlvidhi: true })).toBe(false);
    });

    it('should handle ruleContext with extra properties', () => {
      // Extra properties should not affect the outcome
      expect(appliesSthanivadbhava('a', 'b', { isAlvidhi: false, someOtherProp: true })).toBe(true);
      expect(appliesSthanivadbhava('a', 'b', { isAlvidhi: true, someOtherProp: false })).toBe(false);
    });
  });
});