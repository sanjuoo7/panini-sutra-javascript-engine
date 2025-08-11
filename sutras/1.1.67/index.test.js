import { getFollowingElement } from './index.js';

describe('Sutra 1.1.67: tasmādityuttarasya', () => {
  describe('Conceptual Application', () => {
    it('should return the element immediately following the specified ablative term', () => {
      // Example: A rule says "udāttāt anudāttasya svaritaḥ" (Sutra 8.4.66).
      // "After (udāttāt) an udātta vowel, an anudātta vowel becomes svarita".
      // 'udāttāt' is in the ablative case. The operation applies to what follows it.
      const context = {
        elements: ['udātta_vowel', 'anudātta_vowel', 'another_element']
      };
      const ablativeTerm = 'udātta_vowel';

      const target = getFollowingElement(context, ablativeTerm);
      expect(target).toBe('anudātta_vowel');
    });

    it('should return the correct element from a longer sequence', () => {
      const context = {
        elements: ['a', 'b', 'c', 'd', 'e']
      };
      const ablativeTerm = 'b';

      const target = getFollowingElement(context, ablativeTerm);
      expect(target).toBe('c');
    });

    it('should handle numeric or object elements', () => {
      const context = {
        elements: [10, { id: 20 }, 30]
      };
      const ablativeTerm = 10;

      const target = getFollowingElement(context, ablativeTerm);
      expect(target).toEqual({ id: 20 });
    });
  });

  describe('Edge Cases', () => {
    it('should return null if the ablative term is the last element', () => {
      const context = {
        elements: ['a', 'b', 'c']
      };
      const ablativeTerm = 'c';
      expect(getFollowingElement(context, ablativeTerm)).toBeNull();
    });

    it('should return null if the ablative term is not found', () => {
      const context = {
        elements: ['a', 'b', 'c']
      };
      const ablativeTerm = 'x';
      expect(getFollowingElement(context, ablativeTerm)).toBeNull();
    });

    it('should return null for invalid context or term', () => {
      expect(getFollowingElement(null, 'a')).toBeNull();
      expect(getFollowingElement({ elements: ['a'] }, null)).toBeNull();
      expect(getFollowingElement({ elements: [] }, 'a')).toBeNull();
      expect(getFollowingElement({}, 'a')).toBeNull();
    });
  });
});
