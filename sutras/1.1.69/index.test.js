import { getSavarna } from './index.js';
import { SanskritConsonants } from '../sanskrit-utils/index.js';

describe('Sutra 1.1.69: aṇudit savarṇasya cāpratyayaḥ', () => {
  describe('Vowel Savarṇa', () => {
    it("should return ['a', 'ā'] for 'a'", () => {
      expect(getSavarna('a')).toEqual(['a', 'ā']);
    });

    it("should return ['i', 'ī'] for 'i'", () => {
      expect(getSavarna('i')).toEqual(['i', 'ī']);
    });

    it("should return ['उ', 'ऊ'] for 'उ'", () => {
      expect(getSavarna('उ')).toEqual(['उ', 'ऊ']);
    });

    it("should not return savarṇa for 'e', 'o', 'ai', 'au' as they have no short/long pairs", () => {
      expect(getSavarna('e')).toEqual(['e']);
      expect(getSavarna('o')).toEqual(['o']);
    });
  });

  describe('Udit Savarṇa (Consonant Classes)', () => {
    it("should return the velar class for 'ku'", () => {
      const velars = SanskritConsonants.stops.velars.iast;
      expect(getSavarna('ku', { isUdit: true })).toEqual(velars);
    });

    it("should return the palatal class for 'cu'", () => {
      const palatals = SanskritConsonants.stops.palatals.iast;
      expect(getSavarna('cu', { isUdit: true })).toEqual(palatals);
    });

    it("should return the dental class for 'tu'", () => {
        const dentals = SanskritConsonants.stops.dentals.iast;
        expect(getSavarna('tu', { isUdit: true })).toEqual(dentals);
    });
  });

  describe('apratyayaḥ (Not an Affix) Condition', () => {
    it("should return only the phoneme itself if it is a pratyaya (affix)", () => {
      expect(getSavarna('a', { isPratyaya: true })).toEqual(['a']);
    });

    it("should still return only the phoneme if it's a pratyaya, even if it's also udit", () => {
      expect(getSavarna('ku', { isPratyaya: true, isUdit: true })).toEqual(['ku']);
    });
  });

  describe('Non-applicable cases', () => {
    it("should return the phoneme itself if it is not in 'aṇ' and not 'udit'", () => {
      // 'k' is not in 'aṇ' (vowels + semivowels + h)
      expect(getSavarna('k')).toEqual(['k']);
    });
  });

  describe('Edge Cases', () => {
    it('should return an empty array for invalid input', () => {
      expect(getSavarna(null)).toEqual([]);
      expect(getSavarna(undefined)).toEqual([]);
      expect(getSavarna(123)).toEqual([]);
    });
  });
});
