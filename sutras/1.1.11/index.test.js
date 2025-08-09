/**
 * Test cases for Sutra 1.1.11: ईदूदेद्द्विवचनं प्रगृह्यम्
 * "A dual case affix ending in ī or ū or e is called प्रगृह्य"
 */

import { isPragrhyaDualEnding, isPragrhya, preventsSandhi } from './index.js';

describe('Sutra 1.1.11: ईदूदेद्द्विवचनं प्रगृह्यम्', () => {
  describe('isPragrhyaDualEnding', () => {
    it('should identify dual endings in ī as प्रगृह्य', () => {
      expect(isPragrhyaDualEnding('rāmī', true)).toBe(true);
      expect(isPragrhyaDualEnding('agnī', true)).toBe(true);
      expect(isPragrhyaDualEnding('devī', true)).toBe(true);
    });

    it('should identify dual endings in ū as प्रगृह्य', () => {
      expect(isPragrhyaDualEnding('viṣṇū', true)).toBe(true);
      expect(isPragrhyaDualEnding('bhū', true)).toBe(true);
      expect(isPragrhyaDualEnding('śakrū', true)).toBe(true);
    });

    it('should identify dual endings in e as प्रगृह्य', () => {
      expect(isPragrhyaDualEnding('rāme', true)).toBe(true);
      expect(isPragrhyaDualEnding('agnie', true)).toBe(true);
      expect(isPragrhyaDualEnding('deve', true)).toBe(true);
    });

    it('should handle Devanagari dual endings', () => {
      expect(isPragrhyaDualEnding('रामी', true)).toBe(true);
      expect(isPragrhyaDualEnding('विष्णू', true)).toBe(true);
      expect(isPragrhyaDualEnding('रामे', true)).toBe(true);
    });

    it('should reject non-dual endings', () => {
      expect(isPragrhyaDualEnding('rāmaḥ', true)).toBe(false);
      expect(isPragrhyaDualEnding('rāmam', true)).toBe(false);
      expect(isPragrhyaDualEnding('rāmāya', true)).toBe(false);
      expect(isPragrhyaDualEnding('rāmena', true)).toBe(false);
    });

    it('should reject when not in dual', () => {
      expect(isPragrhyaDualEnding('rāmī', false)).toBe(false);
      expect(isPragrhyaDualEnding('viṣṇū', false)).toBe(false);
      expect(isPragrhyaDualEnding('rāme', false)).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isPragrhyaDualEnding('', true)).toBe(false);
      expect(isPragrhyaDualEnding(null, true)).toBe(false);
      expect(isPragrhyaDualEnding(undefined, true)).toBe(false);
    });
  });

  describe('isPragrhya', () => {
    it('should identify dual endings as प्रगृह्य', () => {
      expect(isPragrhya('rāmī', { number: 'dual' })).toBe(true);
      expect(isPragrhya('viṣṇū', { number: 'dual' })).toBe(true);
      expect(isPragrhya('rāme', { number: 'dual' })).toBe(true);
    });

    it('should not identify non-dual forms as प्रगृह्य by this sutra', () => {
      expect(isPragrhya('rāmaḥ', { number: 'singular' })).toBe(false);
      expect(isPragrhya('rāmāḥ', { number: 'plural' })).toBe(false);
    });

    it('should handle missing context', () => {
      expect(isPragrhya('rāmī')).toBe(false);
      expect(isPragrhya('rāmī', {})).toBe(false);
    });
  });

  describe('preventsSandhi', () => {
    it('should prevent sandhi when first word ends in प्रगृह्य', () => {
      expect(preventsSandhi('rāmī', 'iti', { number: 'dual' })).toBe(true);
      expect(preventsSandhi('viṣṇū', 'atra', { number: 'dual' })).toBe(true);
      expect(preventsSandhi('rāme', 'āgatau', { number: 'dual' })).toBe(true);
    });

    it('should not prevent sandhi for non-प्रगृह्य endings', () => {
      expect(preventsSandhi('rāmaḥ', 'iti', { number: 'singular' })).toBe(false);
      expect(preventsSandhi('rāmam', 'atra', { number: 'singular' })).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(preventsSandhi('', 'iti', { number: 'dual' })).toBe(false);
      expect(preventsSandhi('rāmī', '', { number: 'dual' })).toBe(false);
      expect(preventsSandhi(null, 'iti', { number: 'dual' })).toBe(false);
    });
  });

  describe('real-world examples', () => {
    it('should work with common dual forms', () => {
      // Common dual forms that should be प्रगृह्य
      const dualContext = { number: 'dual', case: 'nominative' };
      
      expect(isPragrhya('rāmī', dualContext)).toBe(true); // rāma dual nom
      expect(isPragrhya('agnie', dualContext)).toBe(true); // agni dual voc
      expect(isPragrhya('devī', dualContext)).toBe(true); // deva dual nom (feminine)
    });

    it('should prevent sandhi in sentences with dual प्रगृह्य', () => {
      const dualContext = { number: 'dual' };
      
      // These should prevent sandhi
      expect(preventsSandhi('rāmī', 'iti', dualContext)).toBe(true);
      expect(preventsSandhi('agnī', 'āgatau', dualContext)).toBe(true);
      expect(preventsSandhi('viṣṇū', 'eva', dualContext)).toBe(true);
    });
  });
});
