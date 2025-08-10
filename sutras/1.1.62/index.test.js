import { applyPratyayalakshanam } from './index.js';

describe('Sutra 1.1.62: pratyayalope pratyayalakṣaṇam', () => {
  describe('Conceptual Application', () => {
    it('should augment the base with the properties of the elided affix', () => {
      const base = {
        form: 'agni',
        context: {}
      };

      const elidedAffix = {
        form: 's',
        properties: {
          marker: 'sUP',
          case: 'nominative',
          number: 'singular'
        }
      };

      const expected = {
        form: 'agni',
        context: {
          elidedAffixProperties: {
            marker: 'sUP',
            case: 'nominative',
            number: 'singular'
          }
        }
      };

      const result = applyPratyayalakshanam(base, elidedAffix);
      expect(result).toEqual(expected);
    });

    it('should demonstrate retaining a "pit" marker for guna', () => {
      // This is a conceptual test. In a real scenario, another rule would check
      // for the 'pit' property to trigger guṇa substitution.
      const base = {
        form: 'go',
        context: {}
      };

      const elidedAffix = {
        form: 'e', // An example of a 'pit' affix that might get elided
        properties: {
          marker: 'pit' // 'p' is the marker indicating it's 'pit'
        }
      };

      const expected = {
        form: 'go',
        context: {
          elidedAffixProperties: {
            marker: 'pit'
          }
        }
      };

      const result = applyPratyayalakshanam(base, elidedAffix);
      expect(result.context.elidedAffixProperties.marker).toBe('pit');
      // A subsequent rule would then see `result.context.elidedAffixProperties.marker === 'pit'`
      // and apply guṇa to 'go', resulting in 'gave'.
    });

    it('should merge properties without overwriting existing base context', () => {
      const base = {
        form: 'rājan',
        context: {
          isAnga: true
        }
      };

      const elidedAffix = {
        form: 's',
        properties: {
          case: 'nominative'
        }
      };

      const expected = {
        form: 'rājan',
        context: {
          isAnga: true,
          elidedAffixProperties: {
            case: 'nominative'
          }
        }
      };

      const result = applyPratyayalakshanam(base, elidedAffix);
      expect(result).toEqual(expected);
    });
  });

  describe('Edge Cases', () => {
    it('should return the base if elidedAffix is null or undefined', () => {
      const base = { form: 'test', context: {} };
      expect(applyPratyayalakshanam(base, null)).toBe(base);
      expect(applyPratyayalakshanam(base, undefined)).toBe(base);
    });

    it('should return the base if base is null or undefined', () => {
      const elidedAffix = { properties: { marker: 'test' } };
      expect(applyPratyayalakshanam(null, elidedAffix)).toBe(null);
      expect(applyPratyayalakshanam(undefined, elidedAffix)).toBe(undefined);
    });

    it('should handle empty objects', () => {
      const base = {};
      const elidedAffix = {};
      const expected = { context: { elidedAffixProperties: {} } };
      expect(applyPratyayalakshanam(base, elidedAffix)).toEqual(expected);
    });
  });
});
