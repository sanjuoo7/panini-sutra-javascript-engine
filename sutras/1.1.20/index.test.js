/**
 * Test cases for Sutra 1.1.20: दाधा घ्वदाप्
 * "The words having the form of दा 'to give' and धा 'to place' are called घु।"
 */

import { isGhu, getGhuRoots, hasGhuBehavior } from './index.js';

describe('Sutra 1.1.20: दाधा घ्वदाप्', () => {
  describe('isGhu', () => {
    it('should identify दा as घु', () => {
      expect(isGhu('dā')).toBe(true);
      expect(isGhu('दा')).toBe(true);
    });

    it('should identify धा as घु', () => {
      expect(isGhu('dhā')).toBe(true);
      expect(isGhu('धा')).toBe(true);
    });

    it('should reject other roots as not घु', () => {
      expect(isGhu('kar')).toBe(false);
      expect(isGhu('gam')).toBe(false);
      expect(isGhu('bhū')).toBe(false);
      expect(isGhu('कर्')).toBe(false);
      expect(isGhu('गम्')).toBe(false);
    });

    it('should handle similar but different roots', () => {
      expect(isGhu('da')).toBe(false); // short 'a', not दा
      expect(isGhu('dha')).toBe(false); // short 'a', not धा
      expect(isGhu('द')).toBe(false); // incomplete
      expect(isGhu('ध')).toBe(false); // incomplete
    });

    it('should handle edge cases', () => {
      expect(isGhu('')).toBe(false);
      expect(isGhu(null)).toBe(false);
      expect(isGhu(undefined)).toBe(false);
    });
  });

  describe('getGhuRoots', () => {
    it('should return IAST roots by default', () => {
      const roots = getGhuRoots();
      expect(roots).toEqual(['dā', 'dhā']);
    });

    it('should return IAST roots when explicitly requested', () => {
      const roots = getGhuRoots('IAST');
      expect(roots).toEqual(['dā', 'dhā']);
    });

    it('should return Devanagari roots when requested', () => {
      const roots = getGhuRoots('Devanagari');
      expect(roots).toEqual(['दा', 'धा']);
    });
  });

  describe('hasGhuBehavior', () => {
    it('should return true for घु roots', () => {
      expect(hasGhuBehavior('dā')).toBe(true);
      expect(hasGhuBehavior('dhā')).toBe(true);
      expect(hasGhuBehavior('दा')).toBe(true);
      expect(hasGhuBehavior('धा')).toBe(true);
    });

    it('should return false for non-घु roots', () => {
      expect(hasGhuBehavior('kar')).toBe(false);
      expect(hasGhuBehavior('gam')).toBe(false);
      expect(hasGhuBehavior('bhū')).toBe(false);
    });

    it('should work with grammatical context', () => {
      expect(hasGhuBehavior('dā', { tense: 'present' })).toBe(true);
      expect(hasGhuBehavior('dhā', { person: 'third' })).toBe(true);
      expect(hasGhuBehavior('kar', { tense: 'present' })).toBe(false);
    });
  });

  describe('real-world examples', () => {
    it('should work with common verb forms', () => {
      // दा (to give) is घु
      expect(isGhu('dā')).toBe(true);
      expect(isGhu('दा')).toBe(true);
      
      // धा (to place/put) is घु  
      expect(isGhu('dhā')).toBe(true);
      expect(isGhu('धा')).toBe(true);
    });

    it('should distinguish from similar roots', () => {
      // These are different roots, not घु
      expect(isGhu('dadā')).toBe(false); // reduplicated form
      expect(isGhu('dadhā')).toBe(false); // reduplicated form
      expect(isGhu('dāta')).toBe(false); // participial form
      expect(isGhu('dhāta')).toBe(false); // participial form
    });

    it('should work for grammatical rule application', () => {
      // घु roots behave specially in certain contexts
      const ghuRoots = getGhuRoots();
      
      ghuRoots.forEach(root => {
        expect(hasGhuBehavior(root)).toBe(true);
      });
      
      // Non-घु roots should not have घु behavior
      const nonGhuRoots = ['kar', 'gam', 'bhū', 'as', 'kṛ'];
      nonGhuRoots.forEach(root => {
        expect(hasGhuBehavior(root)).toBe(false);
      });
    });
  });
});
