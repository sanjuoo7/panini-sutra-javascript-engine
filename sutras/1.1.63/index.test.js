import { shouldBlockAngaOperation } from './index.js';

describe('Sutra 1.1.63: na lumatā\'ṅgasya', () => {
  describe('Prohibition Cases (Positive)', () => {
    it("should return true for 'luk' to block aṅga operations", () => {
      expect(shouldBlockAngaOperation('luk')).toBe(true);
    });

    it("should return true for 'ślu' to block aṅga operations", () => {
      expect(shouldBlockAngaOperation('ślu')).toBe(true);
    });

    it("should return true for 'lup' to block aṅga operations", () => {
      expect(shouldBlockAngaOperation('lup')).toBe(true);
    });
  });

  describe('Non-Prohibition Cases (Negative)', () => {
    it("should return false for 'lopa', allowing aṅga operations", () => {
      // If the elision is 'lopa', pratyayalakṣaṇam (1.1.62) should apply.
      expect(shouldBlockAngaOperation('lopa')).toBe(false);
    });

    it("should return false for other elision types", () => {
      expect(shouldBlockAngaOperation('ādeśa')).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should return false for null, undefined, or non-string inputs', () => {
      expect(shouldBlockAngaOperation(null)).toBe(false);
      expect(shouldBlockAngaOperation(undefined)).toBe(false);
      expect(shouldBlockAngaOperation(123)).toBe(false);
      expect(shouldBlockAngaOperation({})).toBe(false);
    });
  });

  describe('Conceptual Integration with 1.1.62', () => {
    it('demonstrates the blocking of pratyayalakṣaṇam', () => {
      // This is a conceptual test showing the interaction.
      const getPristineBase = () => ({ form: 'go', context: {} });
      const elidedAffix = { properties: { marker: 'pit' } };

      // Scenario 1: Elision is 'lopa' - pratyayalakṣaṇam APPLIES
      let finalBaseLopa = getPristineBase();
      const lopaElision = 'lopa';
      if (!shouldBlockAngaOperation(lopaElision)) {
        // applyPratyayalakshanam would be called
        finalBaseLopa.context.elidedAffixProperties = { ...elidedAffix.properties };
      }
      expect(finalBaseLopa.context.elidedAffixProperties.marker).toBe('pit');

      // Scenario 2: Elision is 'luk' - pratyayalakṣaṇam is BLOCKED
      let finalBaseLuk = getPristineBase();
      const lukElision = 'luk';
      if (!shouldBlockAngaOperation(lukElision)) {
        // This block correctly should not be entered.
        finalBaseLuk.context.elidedAffixProperties = { ...elidedAffix.properties };
      }
      // The properties of the elided affix are NOT applied to the base.
      expect(finalBaseLuk.context.elidedAffixProperties).toBeUndefined();
    });
  });
});
