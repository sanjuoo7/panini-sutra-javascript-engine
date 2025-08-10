import { getPrecedingElement } from './index.js';

describe('Sutra 1.1.66: tasminniti nirdiṣṭe pūrvasya', () => {
  describe('Conceptual Application', () => {
    it('should return the element immediately preceding the specified locative term', () => {
      // Example: A rule says "iko yaṇ aci" (Sutra 6.1.77).
      // "ik (i,u,r,l) becomes yaṇ (y,v,r,l) when followed by ac (a vowel)".
      // 'aci' is in the locative case. The operation (ik -> yaṇ) applies to what precedes 'ac'.
      const context = {
        elements: ['ik_vowel', 'ac_vowel', 'another_element']
      };
      const locativeTerm = 'ac_vowel';

      const target = getPrecedingElement(context, locativeTerm);
      expect(target).toBe('ik_vowel');
    });

    it('should return the correct element from a longer sequence', () => {
      const context = {
        elements: ['a', 'b', 'c', 'd', 'e']
      };
      const locativeTerm = 'd';

      const target = getPrecedingElement(context, locativeTerm);
      expect(target).toBe('c');
    });

    it('should handle numeric or object elements', () => {
      const context = {
        elements: [10, { id: 20 }, 30]
      };
      const locativeTerm = 30;

      const target = getPrecedingElement(context, locativeTerm);
      expect(target).toEqual({ id: 20 });
    });
  });

  describe('Edge Cases', () => {
    it('should return null if the locative term is the first element', () => {
      const context = {
        elements: ['a', 'b', 'c']
      };
      const locativeTerm = 'a';
      expect(getPrecedingElement(context, locativeTerm)).toBeNull();
    });

    it('should return null if the locative term is not found', () => {
      const context = {
        elements: ['a', 'b', 'c']
      };
      const locativeTerm = 'x';
      expect(getPrecedingElement(context, locativeTerm)).toBeNull();
    });

    it('should return null for invalid context or term', () => {
      expect(getPrecedingElement(null, 'a')).toBeNull();
      expect(getPrecedingElement({ elements: ['a'] }, null)).toBeNull();
      expect(getPrecedingElement({ elements: [] }, 'a')).toBeNull();
      expect(getPrecedingElement({}, 'a')).toBeNull();
    });
  });
});
