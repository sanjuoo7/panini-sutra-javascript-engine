/**
 * Comprehensive test suite for Sutra 1.1.60: अदर्शनं लोपः (adarśanaṃ lopaḥ)
 *
 * Tests cover:
 * 1. Basic functionality of the definition.
 * 2. Conceptual checks for `isLopa` function.
 */

import { getLopaDefinition, isLopa } from './index.js';

describe('Sutra 1.1.60: अदर्शनं लोपः (adarśanaṃ lopaḥ)', () => {
  describe('getLopaDefinition()', () => {
    it('should return the correct definition of lopa', () => {
      const definition = getLopaDefinition();
      expect(definition).toBe("Lopa (elision) signifies disappearance or non-perception.");
    });
  });

  describe('isLopa()', () => {
    // Positive cases: actions/states that conceptually represent lopa
    it('should return true for null (conceptual disappearance)', () => {
      expect(isLopa(null)).toBe(true);
    });

    it('should return true for undefined (conceptual disappearance)', () => {
      expect(isLopa(undefined)).toBe(true);
    });

    // Negative cases: actions/states that do not represent lopa
    it('should return false for an empty string', () => {
      expect(isLopa("")).toBe(false);
    });

    it('should return false for a non-empty string', () => {
      expect(isLopa("removed")).toBe(false);
    });

    it('should return false for a number', () => {
      expect(isLopa(0)).toBe(false);
    });

    it('should return false for a boolean', () => {
      expect(isLopa(true)).toBe(false);
    });

    it('should return false for an object', () => {
      expect(isLopa({})).toBe(false);
    });

    it('should return false for an array', () => {
      expect(isLopa([])).toBe(false);
    });
  });
});
