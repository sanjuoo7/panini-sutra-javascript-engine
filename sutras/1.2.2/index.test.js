import {
  isVijRoot,
  beginsWithItAugment,
  isItAugmentedAffix,
  isNgitByVijIt,
  analyzeVijItStatus,
  getVijItExamples,
  VIJ_ROOT,
  IT_AUGMENT_PATTERNS,
  IT_AUGMENTED_AFFIXES
} from './index.js';

describe('Sutra 1.2.2: विज इट्', () => {
  describe('isVijRoot function', () => {
    describe('Devanagari root', () => {
      it('should identify विज् root', () => {
        expect(isVijRoot('विज्')).toBe(true);
      });

      it('should reject other roots', () => {
        expect(isVijRoot('गाङ्')).toBe(false);
        expect(isVijRoot('कुट्')).toBe(false);
        expect(isVijRoot('भू')).toBe(false);
        expect(isVijRoot('कृ')).toBe(false);
        expect(isVijRoot('गम्')).toBe(false);
      });
    });

    describe('IAST root', () => {
      it('should identify vij root', () => {
        expect(isVijRoot('vij')).toBe(true);
      });

      it('should reject other IAST roots', () => {
        expect(isVijRoot('gāṅ')).toBe(false);
        expect(isVijRoot('kuṭ')).toBe(false);
        expect(isVijRoot('bhū')).toBe(false);
        expect(isVijRoot('kṛ')).toBe(false);
        expect(isVijRoot('gam')).toBe(false);
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        expect(isVijRoot('')).toBe(false);
        expect(isVijRoot(null)).toBe(false);
        expect(isVijRoot(undefined)).toBe(false);
        expect(isVijRoot(123)).toBe(false);
        expect(isVijRoot([])).toBe(false);
      });

      it('should handle whitespace', () => {
        expect(isVijRoot(' विज् ')).toBe(true);
        expect(isVijRoot('  vij  ')).toBe(true);
      });
    });
  });

  describe('beginsWithItAugment function', () => {
    describe('Devanagari इट् patterns', () => {
      it('should identify इट् augment patterns', () => {
        expect(beginsWithItAugment('इत')).toBe(true);
        expect(beginsWithItAugment('इत्वा')).toBe(true);
        expect(beginsWithItAugment('इत्')).toBe(true);
        expect(beginsWithItAugment('इष्यति')).toBe(true);
        expect(beginsWithItAugment('इतुम्')).toBe(true);
      });

      it('should reject non-इट् patterns', () => {
        expect(beginsWithItAugment('ति')).toBe(false);
        expect(beginsWithItAugment('त')).toBe(false);
        expect(beginsWithItAugment('अ')).toBe(false);
        expect(beginsWithItAugment('स्')).toBe(false);
        expect(beginsWithItAugment('तुम्')).toBe(false);
      });
    });

    describe('IAST iṭ patterns', () => {
      it('should identify iṭ augment patterns', () => {
        expect(beginsWithItAugment('ita')).toBe(true);
        expect(beginsWithItAugment('itvā')).toBe(true);
        expect(beginsWithItAugment('it')).toBe(true);
        expect(beginsWithItAugment('iṣyati')).toBe(true);
        expect(beginsWithItAugment('itum')).toBe(true);
      });

      it('should reject non-iṭ patterns', () => {
        expect(beginsWithItAugment('ti')).toBe(false);
        expect(beginsWithItAugment('t')).toBe(false);
        expect(beginsWithItAugment('a')).toBe(false);
        expect(beginsWithItAugment('s')).toBe(false);
        expect(beginsWithItAugment('tum')).toBe(false);
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        expect(beginsWithItAugment('')).toBe(false);
        expect(beginsWithItAugment(null)).toBe(false);
        expect(beginsWithItAugment(undefined)).toBe(false);
        expect(beginsWithItAugment(123)).toBe(false);
      });
    });
  });

  describe('isItAugmentedAffix function', () => {
    describe('Known इट्-augmented affixes', () => {
      it('should identify Devanagari इट्-augmented affixes', () => {
        expect(isItAugmentedAffix('इत')).toBe(true);
        expect(isItAugmentedAffix('इत्वा')).toBe(true);
        expect(isItAugmentedAffix('इष्यति')).toBe(true);
        expect(isItAugmentedAffix('इत्')).toBe(true);
        expect(isItAugmentedAffix('इतुम्')).toBe(true);
      });

      it('should identify IAST iṭ-augmented affixes', () => {
        expect(isItAugmentedAffix('ita')).toBe(true);
        expect(isItAugmentedAffix('itvā')).toBe(true);
        expect(isItAugmentedAffix('iṣyati')).toBe(true);
        expect(isItAugmentedAffix('it')).toBe(true);
        expect(isItAugmentedAffix('itum')).toBe(true);
      });

      it('should reject non-इट् affixes', () => {
        expect(isItAugmentedAffix('त')).toBe(false);
        expect(isItAugmentedAffix('त्वा')).toBe(false);
        expect(isItAugmentedAffix('ष्यति')).toBe(false);
        expect(isItAugmentedAffix('तुम्')).toBe(false);
        expect(isItAugmentedAffix('ति')).toBe(false);
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        expect(isItAugmentedAffix('')).toBe(false);
        expect(isItAugmentedAffix(null)).toBe(false);
        expect(isItAugmentedAffix(undefined)).toBe(false);
        expect(isItAugmentedAffix(123)).toBe(false);
      });
    });
  });

  describe('isNgitByVijIt function', () => {
    describe('Positive cases - should be ङित्', () => {
      it('should make इट्-affixes ङित् after विज्', () => {
        expect(isNgitByVijIt('विज्', 'इत')).toBe(true);
        expect(isNgitByVijIt('विज्', 'इत्वा')).toBe(true);
        expect(isNgitByVijIt('विज्', 'इष्यति')).toBe(true);
        expect(isNgitByVijIt('विज्', 'इत्')).toBe(true);
        expect(isNgitByVijIt('विज्', 'इतुम्')).toBe(true);
      });

      it('should work with IAST script', () => {
        expect(isNgitByVijIt('vij', 'ita')).toBe(true);
        expect(isNgitByVijIt('vij', 'itvā')).toBe(true);
        expect(isNgitByVijIt('vij', 'iṣyati')).toBe(true);
        expect(isNgitByVijIt('vij', 'it')).toBe(true);
        expect(isNgitByVijIt('vij', 'itum')).toBe(true);
      });

      it('should work with mixed scripts', () => {
        expect(isNgitByVijIt('विज्', 'ita')).toBe(true);
        expect(isNgitByVijIt('vij', 'इत')).toBe(true);
      });
    });

    describe('Negative cases - non-विज् roots', () => {
      it('should not apply to other roots', () => {
        expect(isNgitByVijIt('भू', 'इत')).toBe(false);
        expect(isNgitByVijIt('गाङ्', 'इत्वा')).toBe(false);
        expect(isNgitByVijIt('कुट्', 'इष्यति')).toBe(false);
        expect(isNgitByVijIt('कृ', 'इत्')).toBe(false);
      });
    });

    describe('Negative cases - non-इट् affixes', () => {
      it('should not apply to non-इट् affixes', () => {
        expect(isNgitByVijIt('विज्', 'ति')).toBe(false);
        expect(isNgitByVijIt('विज्', 'त')).toBe(false);
        expect(isNgitByVijIt('विज्', 'अ')).toBe(false);
        expect(isNgitByVijIt('विज्', 'स्')).toBe(false);
        expect(isNgitByVijIt('विज्', 'त्वा')).toBe(false);
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        expect(isNgitByVijIt('', 'इत')).toBe(false);
        expect(isNgitByVijIt('विज्', '')).toBe(false);
        expect(isNgitByVijIt(null, 'इत')).toBe(false);
        expect(isNgitByVijIt('विज्', null)).toBe(false);
        expect(isNgitByVijIt(undefined, undefined)).toBe(false);
      });

      it('should handle non-string inputs', () => {
        expect(isNgitByVijIt(123, 'इत')).toBe(false);
        expect(isNgitByVijIt('विज्', 456)).toBe(false);
        expect(isNgitByVijIt([], {})).toBe(false);
      });
    });
  });

  describe('analyzeVijItStatus function', () => {
    it('should analyze multiple combinations correctly', () => {
      const combinations = [
        { root: 'विज्', affix: 'इत' },
        { root: 'विज्', affix: 'इत्वा' },
        { root: 'विज्', affix: 'ति' },
        { root: 'भू', affix: 'इत' },
        { root: 'गाङ्', affix: 'इत' }
      ];

      const result = analyzeVijItStatus(combinations);

      expect(result.total).toBe(5);
      expect(result.applicableCount).toBe(2); // विज्+इत, विज्+इत्वा
      expect(result.nonVijCount).toBe(2); // भू+इत, गाङ्+इत
      expect(result.nonItCount).toBe(1); // विज्+ति
      expect(result.invalidCount).toBe(0);
      expect(result.applicableItems).toHaveLength(2);
      expect(result.nonVijItems).toHaveLength(2);
      expect(result.nonItItems).toHaveLength(1);
    });

    it('should handle empty array', () => {
      const result = analyzeVijItStatus([]);
      expect(result.total).toBe(0);
      expect(result.applicableCount).toBe(0);
      expect(result.nonVijCount).toBe(0);
      expect(result.nonItCount).toBe(0);
      expect(result.invalidCount).toBe(0);
    });

    it('should throw error for non-array input', () => {
      expect(() => analyzeVijItStatus('not array')).toThrow();
      expect(() => analyzeVijItStatus(null)).toThrow();
      expect(() => analyzeVijItStatus(undefined)).toThrow();
    });
  });

  describe('getVijItExamples function', () => {
    it('should provide comprehensive examples', () => {
      const examples = getVijItExamples();

      expect(examples).toHaveProperty('sutraText');
      expect(examples.sutraText).toHaveProperty('devanagari');
      expect(examples.sutraText).toHaveProperty('iast');
      expect(examples.sutraText).toHaveProperty('translation');

      expect(examples).toHaveProperty('rootInformation');
      expect(examples.rootInformation).toHaveProperty('root');
      expect(examples.rootInformation).toHaveProperty('meanings');

      expect(examples).toHaveProperty('itAugmentExplanation');
      expect(examples.itAugmentExplanation).toHaveProperty('rule');

      expect(examples).toHaveProperty('positiveExamples');
      expect(examples.positiveExamples).toBeInstanceOf(Array);
      expect(examples.positiveExamples.length).toBeGreaterThan(0);

      expect(examples).toHaveProperty('negativeExamples');
      expect(examples.negativeExamples).toBeInstanceOf(Array);

      expect(examples).toHaveProperty('technicalNotes');
      expect(examples.technicalNotes).toBeInstanceOf(Array);

      expect(examples).toHaveProperty('relatedSutras');
      expect(examples.relatedSutras).toBeInstanceOf(Array);
    });

    it('should include correct sutra text', () => {
      const examples = getVijItExamples();
      expect(examples.sutraText.devanagari).toBe('विज इट्');
      expect(examples.sutraText.iast).toBe('vija iṭ');
    });
  });

  describe('Constants validation', () => {
    it('should have valid विज् root constants', () => {
      expect(VIJ_ROOT).toHaveProperty('devanagari');
      expect(VIJ_ROOT).toHaveProperty('iast');
      expect(VIJ_ROOT.devanagari).toBe('विज्');
      expect(VIJ_ROOT.iast).toBe('vij');
    });

    it('should have valid इट् augment patterns', () => {
      expect(IT_AUGMENT_PATTERNS).toHaveProperty('devanagari');
      expect(IT_AUGMENT_PATTERNS).toHaveProperty('iast');
      expect(IT_AUGMENT_PATTERNS.devanagari).toBeInstanceOf(Array);
      expect(IT_AUGMENT_PATTERNS.iast).toBeInstanceOf(Array);
    });

    it('should have valid इट्-augmented affixes', () => {
      expect(IT_AUGMENTED_AFFIXES).toHaveProperty('devanagari');
      expect(IT_AUGMENTED_AFFIXES).toHaveProperty('iast');
      expect(IT_AUGMENTED_AFFIXES.devanagari).toBeInstanceOf(Array);
      expect(IT_AUGMENTED_AFFIXES.iast).toBeInstanceOf(Array);
      expect(IT_AUGMENTED_AFFIXES.devanagari.length).toBe(IT_AUGMENTED_AFFIXES.iast.length);
    });
  });

  describe('Integration tests', () => {
    it('should work consistently across all functions', () => {
      const root = 'विज्';
      const affix = 'इत';

      expect(isVijRoot(root)).toBe(true);
      expect(beginsWithItAugment(affix)).toBe(true);
      expect(isItAugmentedAffix(affix)).toBe(true);
      expect(isNgitByVijIt(root, affix)).toBe(true);
    });

    it('should handle cross-script scenarios correctly', () => {
      // Devanagari root with IAST affix
      expect(isNgitByVijIt('विज्', 'ita')).toBe(true);
      // IAST root with Devanagari affix  
      expect(isNgitByVijIt('vij', 'इत')).toBe(true);
    });

    it('should maintain consistency with traditional grammar', () => {
      // Traditional examples from grammar texts
      const traditionalCases = [
        { root: 'विज्', affix: 'इत', expected: true, note: 'विजित - conquered' },
        { root: 'विज्', affix: 'इत्वा', expected: true, note: 'विजित्वा - having conquered' },
        { root: 'विज्', affix: 'ति', expected: false, note: 'विजति - no इट् augment' },
        { root: 'भू', affix: 'इत', expected: false, note: 'भूत - different root' }
      ];

      traditionalCases.forEach(({ root, affix, expected, note }) => {
        expect(isNgitByVijIt(root, affix)).toBe(expected);
      });
    });

    it('should correctly distinguish from general ङित् rules', () => {
      // This rule is specific to विज् + इट्, not general ङित्
      expect(isNgitByVijIt('विज्', 'इत')).toBe(true);  // This sutra applies
      expect(isNgitByVijIt('विज्', 'ति')).toBe(false); // This sutra doesn't apply
      expect(isNgitByVijIt('गाङ्', 'इत')).toBe(false); // Different rule would apply
    });
  });
});
