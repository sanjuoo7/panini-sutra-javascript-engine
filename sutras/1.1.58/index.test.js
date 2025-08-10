/**
 * Comprehensive test suite for Sutra 1.1.58: न पदान्तद्विर्वचनवरेयलोपस्वरसवर्णानुस्वारदीर्घजश्चर्विधिषु
 *
 * Tests cover:
 * 1. Positive cases where Sthānivadbhāva is blocked for each of the nine rule types.
 * 2. Negative cases where Sthānivadbhāva is NOT blocked for other rule types.
 * 3. Edge cases and invalid inputs.
 */

import { isSthanivadbhavaBlocked, SthanivadbhavaBlockingRuleTypes } from './index.js';

describe('Sutra 1.1.58: न पदान्तद्विर्वचनवरेयलोपस्वरसवर्णानुस्वारदीर्घजश्चर्विधिषु', () => {
  // Positive Cases: Sthānivadbhāva is blocked for specific rule types
  describe('Positive Cases (Sthānivadbhāva blocked)', () => {
    it('should return true for PADANTA_VIDHI', () => {
      expect(isSthanivadbhavaBlocked(SthanivadbhavaBlockingRuleTypes.PADANTA_VIDHI)).toBe(true);
    });

    it('should return true for DVIRVACANA_VIDHI', () => {
      expect(isSthanivadbhavaBlocked(SthanivadbhavaBlockingRuleTypes.DVIRVACANA_VIDHI)).toBe(true);
    });

    it('should return true for VARAYA_VIDHI', () => {
      expect(isSthanivadbhavaBlocked(SthanivadbhavaBlockingRuleTypes.VARAYA_VIDHI)).toBe(true);
    });

    it('should return true for LOPA_VIDHI', () => {
      expect(isSthanivadbhavaBlocked(SthanivadbhavaBlockingRuleTypes.LOPA_VIDHI)).toBe(true);
    });

    it('should return true for SVARA_VIDHI', () => {
      expect(isSthanivadbhavaBlocked(SthanivadbhavaBlockingRuleTypes.SVARA_VIDHI)).toBe(true);
    });

    it('should return true for SAVARNA_VIDHI', () => {
      expect(isSthanivadbhavaBlocked(SthanivadbhavaBlockingRuleTypes.SAVARNA_VIDHI)).toBe(true);
    });

    it('should return true for ANUSVARA_VIDHI', () => {
      expect(isSthanivadbhavaBlocked(SthanivadbhavaBlockingRuleTypes.ANUSVARA_VIDHI)).toBe(true);
    });

    it('should return true for DIRGHA_VIDHI', () => {
      expect(isSthanivadbhavaBlocked(SthanivadbhavaBlockingRuleTypes.DIRGHA_VIDHI)).toBe(true);
    });

    it('should return true for JAS_CAR_VIDHI', () => {
      expect(isSthanivadbhavaBlocked(SthanivadbhavaBlockingRuleTypes.JAS_CAR_VIDHI)).toBe(true);
    });
  });

  // Negative Cases: Sthānivadbhāva is NOT blocked for other rule types
  describe('Negative Cases (Sthānivadbhāva not blocked)', () => {
    it('should return false for a rule type not in the blocking list', () => {
      expect(isSthanivadbhavaBlocked('some_other_rule')).toBe(false);
    });

    it('should return false for an empty string', () => {
      expect(isSthanivadbhavaBlocked('')).toBe(false);
    });

    it('should return false for null', () => {
      expect(isSthanivadbhavaBlocked(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isSthanivadbhavaBlocked(undefined)).toBe(false);
    });

    it('should return false for a number', () => {
      expect(isSthanivadbhavaBlocked(123)).toBe(false);
    });
  });
});
