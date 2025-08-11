import { sutra1232 } from './index.js';
import { applySvarita } from '../sanskrit-utils/accent-analysis.js';
import { decomposeSvarita } from '../sanskrit-utils/accent-prosody-analysis.js';

describe('Sutra 1.2.32: तस्यादित उदात्तमर्धह्रस्वम्', () => {
  describe('Positive Cases', () => {
    it('decomposes hrasva svarita (â)', () => {
      const input = 'â';
      const result = sutra1232(input);
      expect(result.applies).toBe(true);
      expect(result.segments[0].role).toBe('udātta-initial');
      expect(result.segments[0].units).toBe(0.5);
    });

    it('decomposes dirgha svarita (ā̂)', () => {
      const input = 'ā̂';
      const result = sutra1232(input);
      expect(result.applies).toBe(true);
      expect(result.durationUnits).toBeGreaterThanOrEqual(2);
      const fall = result.segments.find(s => s.role === 'anudātta-fall');
      expect(fall.units).toBeGreaterThan(0.5);
    });
  });

  describe('Negative Cases', () => {
    it('rejects pure udātta', () => {
      const result = sutra1232('á');
      expect(result.applies).toBe(false);
    });
    it('rejects plain vowel strict mode', () => {
      const result = sutra1232('a', { strict: true });
      expect(result.applies).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('handles decomposed combining form (a + \u0302)', () => {
      const input = 'a\u0302';
      const result = sutra1232(input);
      expect(result.applies).toBe(true);
    });
    it('handles non-string input gracefully', () => {
      const result = sutra1232(null);
      expect(result.applies).toBe(false);
    });
  });

  describe('Integration', () => {
    it('matches direct utility decomposition', () => {
      const input = 'â';
      const direct = decomposeSvarita(input);
      const viaSutra = sutra1232(input);
      expect(viaSutra.segments.length).toBe(direct.segments.length);
    });
  });
});
