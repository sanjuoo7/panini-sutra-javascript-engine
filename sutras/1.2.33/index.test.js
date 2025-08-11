import { sutra1233 } from './index.js';
import { applyUdatta, applySvarita } from '../sanskrit-utils/accent-analysis.js';

describe('Sutra 1.2.33: एकश्रुति दूरात् सम्बुद्धौ', () => {
  describe('Positive Cases', () => {
    it('applies to distant vocative (distanceCategory)', () => {
      const word = applyUdatta('a');
      const res = sutra1233(word, { case: 'vocative', distanceCategory: 'far' });
      expect(res.applies).toBe(true);
      expect(res.transformed).not.toContain('\u0301'); // no acute
    });
    it('applies using distanceMeters threshold', () => {
      const word = applySvarita('a');
      const res = sutra1233(word, { case: 'vocative', distanceMeters: 25 }, { flatten: true });
      expect(res.applies).toBe(true);
      expect(res.transformed).toBe('a');
    });
  });

  describe('Negative Cases', () => {
    it('does not apply to near vocative', () => {
      const word = applyUdatta('a');
      const res = sutra1233(word, { case: 'vocative', distanceCategory: 'near' });
      expect(res.applies).toBe(false);
    });
    it('does not apply to distant nominative', () => {
      const word = applyUdatta('a');
      const res = sutra1233(word, { case: 'nominative', distanceCategory: 'far' });
      expect(res.applies).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('honors flatten=false option', () => {
      const word = applyUdatta('a');
      const res = sutra1233(word, { case: 'vocative', distanceCategory: 'far' }, { flatten: false });
      expect(res.applies).toBe(true);
      expect(res.transformed).toBe(word); // unchanged
    });
    it('handles unaccented input gracefully', () => {
      const res = sutra1233('a', { case: 'vocative', distanceMeters: 15 });
      expect(res.applies).toBe(true);
      expect(res.transformed).toBe('a');
    });
  });

  describe('Integration Prep', () => {
    it('structure ready for future exceptions (1.2.34)', () => {
      const res = sutra1233('a', { case: 'vocative', distanceCategory: 'far', excludeEkashruti: true });
      // No logic yet for excludeEkashruti; ensure current behavior unaffected
      expect(typeof res.applies).toBe('boolean');
    });
  });
});
