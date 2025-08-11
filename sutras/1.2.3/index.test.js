import {
  isUrnaRoot,
  beginsWithItAugment,
  isItAugmentedAffix,
  canBeNgitByUrnaOption,
  analyzeUrnaOptionalStatus,
  getUrnaOptionalExamples,
  URNA_ROOT,
  URNA_VARIANTS,
  IT_AUGMENT_PATTERNS,
  IT_AUGMENTED_AFFIXES
} from './index.js';

describe('Sutra 1.2.3: विभाषोर्णोः', () => {
  describe('isUrnaRoot function', () => {
    describe('Devanagari root identification', () => {
      it('should identify main ऊर्ण root', () => {
        expect(isUrnaRoot('ऊर्ण')).toBe(true);
      });

      it('should identify ऊर्ण् variant', () => {
        expect(isUrnaRoot('ऊर्ण्')).toBe(true);
      });

      it('should reject other roots', () => {
        expect(isUrnaRoot('विज्')).toBe(false);
        expect(isUrnaRoot('गाङ्')).toBe(false);
        expect(isUrnaRoot('कुट्')).toBe(false);
        expect(isUrnaRoot('भू')).toBe(false);
        expect(isUrnaRoot('कृ')).toBe(false);
      });
    });

    describe('IAST root identification', () => {
      it('should identify main ūrṇa root', () => {
        expect(isUrnaRoot('ūrṇa')).toBe(true);
      });

      it('should identify ūrṇ variant', () => {
        expect(isUrnaRoot('ūrṇ')).toBe(true);
      });

      it('should identify urṇa variant', () => {
        expect(isUrnaRoot('urṇa')).toBe(true);
        expect(isUrnaRoot('urṇ')).toBe(true);
      });

      it('should reject other IAST roots', () => {
        expect(isUrnaRoot('vij')).toBe(false);
        expect(isUrnaRoot('gāṅ')).toBe(false);
        expect(isUrnaRoot('kuṭ')).toBe(false);
        expect(isUrnaRoot('bhū')).toBe(false);
        expect(isUrnaRoot('kṛ')).toBe(false);
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        expect(isUrnaRoot('')).toBe(false);
        expect(isUrnaRoot(null)).toBe(false);
        expect(isUrnaRoot(undefined)).toBe(false);
        expect(isUrnaRoot(123)).toBe(false);
        expect(isUrnaRoot([])).toBe(false);
        expect(isUrnaRoot({})).toBe(false);
      });

      it('should handle whitespace', () => {
        expect(isUrnaRoot(' ऊर्ण ')).toBe(true);
        expect(isUrnaRoot('  ūrṇa  ')).toBe(true);
      });
    });
  });

  describe('beginsWithItAugment function', () => {
    describe('Devanagari iṭ patterns', () => {
      it('should identify इत patterns', () => {
        expect(beginsWithItAugment('इत')).toBe(true);
        expect(beginsWithItAugment('इत्वा')).toBe(true);
        expect(beginsWithItAugment('इत्')).toBe(true);
      });

      it('should identify इट् patterns', () => {
        expect(beginsWithItAugment('इट्')).toBe(true);
      });

      it('should identify इष्य patterns', () => {
        expect(beginsWithItAugment('इष्यति')).toBe(true);
        expect(beginsWithItAugment('इष्य')).toBe(true);
      });

      it('should reject non-iṭ patterns', () => {
        expect(beginsWithItAugment('ति')).toBe(false);
        expect(beginsWithItAugment('त')).toBe(false);
        expect(beginsWithItAugment('अ')).toBe(false);
        expect(beginsWithItAugment('स्')).toBe(false);
      });
    });

    describe('IAST iṭ patterns', () => {
      it('should identify it patterns', () => {
        expect(beginsWithItAugment('ita')).toBe(true);
        expect(beginsWithItAugment('itvā')).toBe(true);
        expect(beginsWithItAugment('it')).toBe(true);
      });

      it('should identify iṭ patterns', () => {
        expect(beginsWithItAugment('iṭ')).toBe(true);
      });

      it('should identify iṣy patterns', () => {
        expect(beginsWithItAugment('iṣyati')).toBe(true);
        expect(beginsWithItAugment('iṣy')).toBe(true);
      });

      it('should reject non-iṭ patterns', () => {
        expect(beginsWithItAugment('ti')).toBe(false);
        expect(beginsWithItAugment('t')).toBe(false);
        expect(beginsWithItAugment('a')).toBe(false);
        expect(beginsWithItAugment('s')).toBe(false);
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
    describe('Known iṭ-augmented affixes', () => {
      it('should identify Devanagari iṭ-augmented affixes', () => {
        expect(isItAugmentedAffix('इत')).toBe(true);
        expect(isItAugmentedAffix('इत्वा')).toBe(true);
        expect(isItAugmentedAffix('इष्यति')).toBe(true);
        expect(isItAugmentedAffix('इत्')).toBe(true);
        expect(isItAugmentedAffix('इतुम्')).toBe(true);
        expect(isItAugmentedAffix('इष्य')).toBe(true);
      });

      it('should identify IAST iṭ-augmented affixes', () => {
        expect(isItAugmentedAffix('ita')).toBe(true);
        expect(isItAugmentedAffix('itvā')).toBe(true);
        expect(isItAugmentedAffix('iṣyati')).toBe(true);
        expect(isItAugmentedAffix('it')).toBe(true);
        expect(isItAugmentedAffix('itum')).toBe(true);
        expect(isItAugmentedAffix('iṣy')).toBe(true);
      });

      it('should reject non-iṭ affixes', () => {
        expect(isItAugmentedAffix('त')).toBe(false);
        expect(isItAugmentedAffix('त्वा')).toBe(false);
        expect(isItAugmentedAffix('ष्यति')).toBe(false);
        expect(isItAugmentedAffix('तुम्')).toBe(false);
        expect(isItAugmentedAffix('ति')).toBe(false);
      });
    });

    describe('Pattern-based recognition', () => {
      it('should recognize patterns not in explicit list', () => {
        expect(isItAugmentedAffix('इतव्य')).toBe(true);
        expect(isItAugmentedAffix('itavya')).toBe(true);
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

  describe('canBeNgitByUrnaOption function', () => {
    describe('Positive cases - optional ṅit', () => {
      it('should allow optional ṅit for iṭ-affixes after ऊर्ण', () => {
        expect(canBeNgitByUrnaOption('ऊर्ण', 'इत')).toBe(true);
        expect(canBeNgitByUrnaOption('ऊर्ण', 'इत्वा')).toBe(true);
        expect(canBeNgitByUrnaOption('ऊर्ण', 'इष्यति')).toBe(true);
        expect(canBeNgitByUrnaOption('ऊर्ण', 'इत्')).toBe(true);
        expect(canBeNgitByUrnaOption('ऊर्ण', 'इतुम्')).toBe(true);
      });

      it('should work with IAST script', () => {
        expect(canBeNgitByUrnaOption('ūrṇa', 'ita')).toBe(true);
        expect(canBeNgitByUrnaOption('ūrṇa', 'itvā')).toBe(true);
        expect(canBeNgitByUrnaOption('ūrṇa', 'iṣyati')).toBe(true);
        expect(canBeNgitByUrnaOption('ūrṇa', 'it')).toBe(true);
        expect(canBeNgitByUrnaOption('ūrṇa', 'itum')).toBe(true);
      });

      it('should work with root variants', () => {
        expect(canBeNgitByUrnaOption('ऊर्ण्', 'इत')).toBe(true);
        expect(canBeNgitByUrnaOption('ūrṇ', 'ita')).toBe(true);
        expect(canBeNgitByUrnaOption('urṇa', 'itvā')).toBe(true);
        expect(canBeNgitByUrnaOption('urṇ', 'it')).toBe(true);
      });

      it('should work with mixed scripts', () => {
        expect(canBeNgitByUrnaOption('ऊर्ण', 'ita')).toBe(true);
        expect(canBeNgitByUrnaOption('ūrṇa', 'इत')).toBe(true);
      });
    });

    describe('Negative cases - non-ऊर्ण roots', () => {
      it('should not apply to other roots', () => {
        expect(canBeNgitByUrnaOption('भू', 'इत')).toBe(false);
        expect(canBeNgitByUrnaOption('विज्', 'इत्वा')).toBe(false);
        expect(canBeNgitByUrnaOption('गाङ्', 'इष्यति')).toBe(false);
        expect(canBeNgitByUrnaOption('कुट्', 'इत्')).toBe(false);
      });
    });

    describe('Negative cases - non-iṭ affixes', () => {
      it('should not apply to non-iṭ affixes', () => {
        expect(canBeNgitByUrnaOption('ऊर्ण', 'ति')).toBe(false);
        expect(canBeNgitByUrnaOption('ऊर्ण', 'त')).toBe(false);
        expect(canBeNgitByUrnaOption('ऊर्ण', 'अ')).toBe(false);
        expect(canBeNgitByUrnaOption('ऊर्ण', 'स्')).toBe(false);
        expect(canBeNgitByUrnaOption('ऊर्ण', 'त्वा')).toBe(false);
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        expect(canBeNgitByUrnaOption('', 'इत')).toBe(false);
        expect(canBeNgitByUrnaOption('ऊर्ण', '')).toBe(false);
        expect(canBeNgitByUrnaOption(null, 'इत')).toBe(false);
        expect(canBeNgitByUrnaOption('ऊर्ण', null)).toBe(false);
        expect(canBeNgitByUrnaOption(undefined, undefined)).toBe(false);
      });

      it('should handle non-string inputs', () => {
        expect(canBeNgitByUrnaOption(123, 'इत')).toBe(false);
        expect(canBeNgitByUrnaOption('ऊर्ण', 456)).toBe(false);
        expect(canBeNgitByUrnaOption([], {})).toBe(false);
      });

      it('should validate Sanskrit inputs', () => {
        expect(canBeNgitByUrnaOption('xyz123', 'इत')).toBe(false);
        expect(canBeNgitByUrnaOption('ऊर्ण', 'abc123')).toBe(false);
      });
    });
  });

  describe('analyzeUrnaOptionalStatus function', () => {
    it('should analyze multiple combinations correctly', () => {
      const combinations = [
        { root: 'ऊर्ण', affix: 'इत' },
        { root: 'ऊर्ण', affix: 'इत्वा' },
        { root: 'ऊर्ण', affix: 'ति' },
        { root: 'भू', affix: 'इत' },
        { root: 'विज्', affix: 'इत' }
      ];

      const result = analyzeUrnaOptionalStatus(combinations);

      expect(result.total).toBe(5);
      expect(result.applicableCount).toBe(2); // ऊर्ण+इत, ऊर्ण+इत्वा
      expect(result.nonUrnaCount).toBe(2); // भू+इत, विज्+इत
      expect(result.nonItCount).toBe(1); // ऊर्ण+ति
      expect(result.invalidCount).toBe(0);
      expect(result.applicableItems).toHaveLength(2);
      expect(result.nonUrnaItems).toHaveLength(2);
      expect(result.nonItItems).toHaveLength(1);
    });

    it('should handle empty array', () => {
      const result = analyzeUrnaOptionalStatus([]);
      expect(result.total).toBe(0);
      expect(result.applicableCount).toBe(0);
      expect(result.nonUrnaCount).toBe(0);
      expect(result.nonItCount).toBe(0);
      expect(result.invalidCount).toBe(0);
    });

    it('should handle invalid combinations', () => {
      const combinations = [
        { root: null, affix: 'इत' },
        { root: 'ऊर्ण', affix: null },
        { root: '', affix: '' }
      ];

      const result = analyzeUrnaOptionalStatus(combinations);
      expect(result.invalidCount).toBe(3);
      expect(result.invalidItems).toHaveLength(3);
    });

    it('should throw error for non-array input', () => {
      expect(() => analyzeUrnaOptionalStatus('not array')).toThrow();
      expect(() => analyzeUrnaOptionalStatus(null)).toThrow();
      expect(() => analyzeUrnaOptionalStatus(undefined)).toThrow();
    });
  });

  describe('getUrnaOptionalExamples function', () => {
    it('should provide comprehensive examples', () => {
      const examples = getUrnaOptionalExamples();

      expect(examples).toHaveProperty('sutraText');
      expect(examples.sutraText).toHaveProperty('devanagari');
      expect(examples.sutraText).toHaveProperty('iast');
      expect(examples.sutraText).toHaveProperty('translation');

      expect(examples).toHaveProperty('rootInformation');
      expect(examples.rootInformation).toHaveProperty('root');
      expect(examples.rootInformation).toHaveProperty('variants');
      expect(examples.rootInformation).toHaveProperty('meanings');

      expect(examples).toHaveProperty('optionalRule');
      expect(examples.optionalRule).toHaveProperty('nature');
      expect(examples.optionalRule).toHaveProperty('explanation');

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
      const examples = getUrnaOptionalExamples();
      expect(examples.sutraText.devanagari).toBe('विभाषोर्णोः');
      expect(examples.sutraText.iast).toBe('vibhāṣorṇoḥ');
    });

    it('should emphasize optional nature', () => {
      const examples = getUrnaOptionalExamples();
      expect(examples.optionalRule.nature).toContain('विभाषा');
      expect(examples.optionalRule.nature).toContain('optional');
    });
  });

  describe('Constants validation', () => {
    it('should have valid ऊर्ण root constants', () => {
      expect(URNA_ROOT).toHaveProperty('devanagari');
      expect(URNA_ROOT).toHaveProperty('iast');
      expect(URNA_ROOT.devanagari).toBe('ऊर्ण');
      expect(URNA_ROOT.iast).toBe('ūrṇa');
    });

    it('should have valid root variants', () => {
      expect(URNA_VARIANTS).toHaveProperty('devanagari');
      expect(URNA_VARIANTS).toHaveProperty('iast');
      expect(URNA_VARIANTS.devanagari).toBeInstanceOf(Array);
      expect(URNA_VARIANTS.iast).toBeInstanceOf(Array);
      expect(URNA_VARIANTS.devanagari.length).toBeGreaterThan(0);
      expect(URNA_VARIANTS.iast.length).toBeGreaterThan(0);
    });

    it('should have valid iṭ augment patterns', () => {
      expect(IT_AUGMENT_PATTERNS).toHaveProperty('devanagari');
      expect(IT_AUGMENT_PATTERNS).toHaveProperty('iast');
      expect(IT_AUGMENT_PATTERNS.devanagari).toBeInstanceOf(Array);
      expect(IT_AUGMENT_PATTERNS.iast).toBeInstanceOf(Array);
    });

    it('should have valid iṭ-augmented affixes', () => {
      expect(IT_AUGMENTED_AFFIXES).toHaveProperty('devanagari');
      expect(IT_AUGMENTED_AFFIXES).toHaveProperty('iast');
      expect(IT_AUGMENTED_AFFIXES.devanagari).toBeInstanceOf(Array);
      expect(IT_AUGMENTED_AFFIXES.iast).toBeInstanceOf(Array);
      expect(IT_AUGMENTED_AFFIXES.devanagari.length).toBe(IT_AUGMENTED_AFFIXES.iast.length);
    });
  });

  describe('Integration tests', () => {
    it('should work consistently across all functions', () => {
      const root = 'ऊर्ण';
      const affix = 'इत';

      expect(isUrnaRoot(root)).toBe(true);
      expect(beginsWithItAugment(affix)).toBe(true);
      expect(isItAugmentedAffix(affix)).toBe(true);
      expect(canBeNgitByUrnaOption(root, affix)).toBe(true);
    });

    it('should handle cross-script scenarios correctly', () => {
      // Devanagari root with IAST affix
      expect(canBeNgitByUrnaOption('ऊर्ण', 'ita')).toBe(true);
      // IAST root with Devanagari affix  
      expect(canBeNgitByUrnaOption('ūrṇa', 'इत')).toBe(true);
    });

    it('should maintain consistency with traditional grammar', () => {
      // Traditional examples emphasizing optional nature
      const traditionalCases = [
        { root: 'ऊर्ण', affix: 'इत', expected: true, note: 'ऊर्णित - covered (optional ṅit)' },
        { root: 'ऊर्ण', affix: 'इत्वा', expected: true, note: 'ऊर्णित्वा - having covered (optional)' },
        { root: 'ऊर्ण', affix: 'ति', expected: false, note: 'ऊर्णोति - no iṭ augment' },
        { root: 'भू', affix: 'इत', expected: false, note: 'भूत - different root' }
      ];

      traditionalCases.forEach(({ root, affix, expected, note }) => {
        expect(canBeNgitByUrnaOption(root, affix)).toBe(expected);
      });
    });

    it('should correctly distinguish from mandatory ṅit rules', () => {
      // This rule is optional for ऊर्ण + iṭ, unlike mandatory rules
      expect(canBeNgitByUrnaOption('ऊर्ण', 'इत')).toBe(true);  // Optional
      expect(canBeNgitByUrnaOption('ऊर्ण', 'ति')).toBe(false); // No iṭ augment
      expect(canBeNgitByUrnaOption('विज्', 'इत')).toBe(false); // Different rule (1.2.2)
      expect(canBeNgitByUrnaOption('गाङ्', 'इत')).toBe(false); // Different rule (1.2.1)
    });

    it('should handle root variants consistently', () => {
      const affixes = ['इत', 'इत्वा', 'ita', 'itvā'];
      const rootVariants = ['ऊर्ण', 'ऊर्ण्', 'ūrṇa', 'ūrṇ', 'urṇa', 'urṇ'];

      rootVariants.forEach(root => {
        affixes.forEach(affix => {
          if (isItAugmentedAffix(affix)) {
            expect(canBeNgitByUrnaOption(root, affix)).toBe(true);
          }
        });
      });
    });
  });
});
