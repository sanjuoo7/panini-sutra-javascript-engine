import { applyTapara } from './index.js';

describe('Sutra 1.1.70: taparas tatkālasya', () => {
  describe('Tapara Application', () => {
    it("should restrict 'at' to only the short 'a'", () => {
      // The term 'at' (a + t) should only refer to the short 'a'.
      // Sutra 1.1.69 would have given ['a', 'ā'].
      // This sutra filters it to just ['a'].
      expect(applyTapara('at')).toEqual(['a']);
    });

    it("should restrict 'it' to only the short 'i'", () => {
      expect(applyTapara('it')).toEqual(['i']);
    });

    it("should restrict 'āt' to only the long 'ā'", () => {
      // The term 'āt' (ā + t) should only refer to the long 'ā'.
      expect(applyTapara('āt')).toEqual(['ā']);
    });

    it("should restrict 'īt' to only the long 'ī'", () => {
      expect(applyTapara('īt')).toEqual(['ī']);
    });

    it("should handle diphthongs, which are always long", () => {
      expect(applyTapara('et')).toEqual(['e']);
      expect(applyTapara('ait')).toEqual(['ai']);
    });
  });

  describe('Non-applicable Cases', () => {
    it("should return the original term if it doesn't end with 't'", () => {
      expect(applyTapara('a')).toEqual(['a']);
      expect(applyTapara('ik')).toEqual(['ik']);
    });

    it("should return the original term if the part before 't' is not a vowel", () => {
      expect(applyTapara('kt')).toEqual(['kt']);
    });
  });

  describe('Edge Cases', () => {
    it('should return the original term for invalid or short input', () => {
      expect(applyTapara(null)).toEqual([null]);
      expect(applyTapara(undefined)).toEqual([undefined]);
      expect(applyTapara('')).toEqual(['']);
      expect(applyTapara('t')).toEqual(['t']);
    });
  });
});
