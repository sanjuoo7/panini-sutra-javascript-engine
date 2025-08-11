import {
  isGangkutadiRoot,
  hasExcludedIndicatory,
  isNgitByGangkutadi,
  analyzeNgitStatus,
  getGangkutadiExamples,
  GANGKUTADI_ROOTS,
  GANGKUTADI_ROOTS_IAST,
  EXCLUDED_AFFIX_PATTERNS
} from './index.js';

describe('Sutra 1.2.1: गाङ्कुटादिभ्योऽञ्णिन्ङ् इत्', () => {
  describe('isGangkutadiRoot function', () => {
    describe('Devanagari roots', () => {
      it('should identify primary गाङ्कुटादि roots', () => {
        expect(isGangkutadiRoot('गाङ्')).toBe(true);
        expect(isGangkutadiRoot('कुट्')).toBe(true);
      });

      it('should identify आदि (additional) roots', () => {
        expect(isGangkutadiRoot('पठ्')).toBe(true);
        expect(isGangkutadiRoot('वच्')).toBe(true);
        expect(isGangkutadiRoot('तप्')).toBe(true);
        expect(isGangkutadiRoot('यज्')).toBe(true);
        expect(isGangkutadiRoot('रक्ष्')).toBe(true);
      });

      it('should reject non-गाङ्कुटादि roots', () => {
        expect(isGangkutadiRoot('भू')).toBe(false);
        expect(isGangkutadiRoot('क्रीड्')).toBe(false);
        expect(isGangkutadiRoot('हस्')).toBe(false);
        expect(isGangkutadiRoot('नृत्')).toBe(false);
      });
    });

    describe('IAST roots', () => {
      it('should identify primary IAST roots', () => {
        expect(isGangkutadiRoot('gāṅ')).toBe(true);
        expect(isGangkutadiRoot('kuṭ')).toBe(true);
      });

      it('should identify IAST आदि roots', () => {
        expect(isGangkutadiRoot('paṭh')).toBe(true);
        expect(isGangkutadiRoot('vac')).toBe(true);
        expect(isGangkutadiRoot('tap')).toBe(true);
        expect(isGangkutadiRoot('yaj')).toBe(true);
        expect(isGangkutadiRoot('rakṣ')).toBe(true);
      });

      it('should reject non-गाङ्कुटादि IAST roots', () => {
        expect(isGangkutadiRoot('bhū')).toBe(false);
        expect(isGangkutadiRoot('krīḍ')).toBe(false);
        expect(isGangkutadiRoot('has')).toBe(false);
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        expect(isGangkutadiRoot('')).toBe(false);
        expect(isGangkutadiRoot(null)).toBe(false);
        expect(isGangkutadiRoot(undefined)).toBe(false);
        expect(isGangkutadiRoot(123)).toBe(false);
        expect(isGangkutadiRoot([])).toBe(false);
      });

      it('should handle whitespace', () => {
        expect(isGangkutadiRoot(' गाङ् ')).toBe(true);
        expect(isGangkutadiRoot('  कुट्  ')).toBe(true);
      });
    });
  });

  describe('hasExcludedIndicatory function', () => {
    describe('ञित् affixes', () => {
      it('should identify ञित् patterns', () => {
        expect(hasExcludedIndicatory('ञ्')).toBe(true);
        expect(hasExcludedIndicatory('ञि')).toBe(true);
        expect(hasExcludedIndicatory('ञु')).toBe(true);
        expect(hasExcludedIndicatory('तञ्')).toBe(true);
        expect(hasExcludedIndicatory('अञि')).toBe(true);
      });
    });

    describe('णित् affixes', () => {
      it('should identify णित् patterns', () => {
        expect(hasExcludedIndicatory('ण्')).toBe(true);
        expect(hasExcludedIndicatory('णि')).toBe(true);
        expect(hasExcludedIndicatory('णु')).toBe(true);
        expect(hasExcludedIndicatory('तण्')).toBe(true);
        expect(hasExcludedIndicatory('अणि')).toBe(true);
      });
    });

    describe('Regular affixes', () => {
      it('should not identify regular affixes as excluded', () => {
        expect(hasExcludedIndicatory('ति')).toBe(false);
        expect(hasExcludedIndicatory('त')).toBe(false);
        expect(hasExcludedIndicatory('अ')).toBe(false);
        expect(hasExcludedIndicatory('इ')).toBe(false);
        expect(hasExcludedIndicatory('उ')).toBe(false);
        expect(hasExcludedIndicatory('स्')).toBe(false);
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        expect(hasExcludedIndicatory('')).toBe(false);
        expect(hasExcludedIndicatory(null)).toBe(false);
        expect(hasExcludedIndicatory(undefined)).toBe(false);
        expect(hasExcludedIndicatory(123)).toBe(false);
      });
    });
  });

  describe('isNgitByGangkutadi function', () => {
    describe('Positive cases - should be ङित्', () => {
      it('should make affixes ङित् after गाङ्', () => {
        expect(isNgitByGangkutadi('गाङ्', 'ति')).toBe(true);
        expect(isNgitByGangkutadi('गाङ्', 'त')).toBe(true);
        expect(isNgitByGangkutadi('गाङ्', 'अ')).toBe(true);
        expect(isNgitByGangkutadi('गाङ्', 'स्')).toBe(true);
      });

      it('should make affixes ङित् after कुट्', () => {
        expect(isNgitByGangkutadi('कुट्', 'ति')).toBe(true);
        expect(isNgitByGangkutadi('कुट्', 'त')).toBe(true);
        expect(isNgitByGangkutadi('कुट्', 'अ')).toBe(true);
      });

      it('should work with आदि roots', () => {
        expect(isNgitByGangkutadi('पठ्', 'ति')).toBe(true);
        expect(isNgitByGangkutadi('वच्', 'त')).toBe(true);
        expect(isNgitByGangkutadi('तप्', 'अ')).toBe(true);
        expect(isNgitByGangkutadi('यज्', 'ति')).toBe(true);
      });

      it('should work with IAST script', () => {
        expect(isNgitByGangkutadi('gāṅ', 'ti')).toBe(true);
        expect(isNgitByGangkutadi('kuṭ', 't')).toBe(true);
        expect(isNgitByGangkutadi('paṭh', 'a')).toBe(true);
      });
    });

    describe('Negative cases - excluded affixes', () => {
      it('should exclude ञित् affixes', () => {
        expect(isNgitByGangkutadi('गाङ्', 'ञ्')).toBe(false);
        expect(isNgitByGangkutadi('गाङ्', 'ञि')).toBe(false);
        expect(isNgitByGangkutadi('कुट्', 'तञ्')).toBe(false);
      });

      it('should exclude णित् affixes', () => {
        expect(isNgitByGangkutadi('गाङ्', 'ण्')).toBe(false);
        expect(isNgitByGangkutadi('गाङ्', 'णि')).toBe(false);
        expect(isNgitByGangkutadi('कुट्', 'तण्')).toBe(false);
      });
    });

    describe('Negative cases - non-गाङ्कुटादि roots', () => {
      it('should not apply to other roots', () => {
        expect(isNgitByGangkutadi('भू', 'ति')).toBe(false);
        expect(isNgitByGangkutadi('क्रीड्', 'त')).toBe(false);
        expect(isNgitByGangkutadi('हस्', 'अ')).toBe(false);
        expect(isNgitByGangkutadi('नृत्', 'ति')).toBe(false);
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        expect(isNgitByGangkutadi('', 'ति')).toBe(false);
        expect(isNgitByGangkutadi('गाङ्', '')).toBe(false);
        expect(isNgitByGangkutadi(null, 'ति')).toBe(false);
        expect(isNgitByGangkutadi('गाङ्', null)).toBe(false);
        expect(isNgitByGangkutadi(undefined, undefined)).toBe(false);
      });

      it('should handle non-string inputs', () => {
        expect(isNgitByGangkutadi(123, 'ति')).toBe(false);
        expect(isNgitByGangkutadi('गाङ्', 456)).toBe(false);
        expect(isNgitByGangkutadi([], {})).toBe(false);
      });
    });
  });

  describe('analyzeNgitStatus function', () => {
    it('should analyze multiple combinations correctly', () => {
      const combinations = [
        { root: 'गाङ्', affix: 'ति' },
        { root: 'कुट्', affix: 'त' },
        { root: 'गाङ्', affix: 'ञ्' },
        { root: 'भू', affix: 'ति' },
        { root: 'पठ्', affix: 'अ' }
      ];

      const result = analyzeNgitStatus(combinations);

      expect(result.total).toBe(5);
      expect(result.ngitCount).toBe(3); // गाङ्+ति, कुट्+त, पठ्+अ
      expect(result.excludedCount).toBe(2); // गाङ्+ञ्, भू+ति
      expect(result.invalidCount).toBe(0);
      expect(result.ngitItems).toHaveLength(3);
      expect(result.excludedItems).toHaveLength(2);
    });

    it('should handle empty array', () => {
      const result = analyzeNgitStatus([]);
      expect(result.total).toBe(0);
      expect(result.ngitCount).toBe(0);
      expect(result.excludedCount).toBe(0);
      expect(result.invalidCount).toBe(0);
    });

    it('should throw error for non-array input', () => {
      expect(() => analyzeNgitStatus('not array')).toThrow();
      expect(() => analyzeNgitStatus(null)).toThrow();
      expect(() => analyzeNgitStatus(undefined)).toThrow();
    });
  });

  describe('getGangkutadiExamples function', () => {
    it('should provide comprehensive examples', () => {
      const examples = getGangkutadiExamples();

      expect(examples).toHaveProperty('sutraText');
      expect(examples.sutraText).toHaveProperty('devanagari');
      expect(examples.sutraText).toHaveProperty('iast');
      expect(examples.sutraText).toHaveProperty('translation');

      expect(examples).toHaveProperty('positiveExamples');
      expect(examples.positiveExamples).toBeInstanceOf(Array);
      expect(examples.positiveExamples.length).toBeGreaterThan(0);

      expect(examples).toHaveProperty('negativeExamples');
      expect(examples.negativeExamples).toBeInstanceOf(Array);
      expect(examples.negativeExamples.length).toBeGreaterThan(0);

      expect(examples).toHaveProperty('technicalNotes');
      expect(examples.technicalNotes).toBeInstanceOf(Array);
    });

    it('should include correct sutra text', () => {
      const examples = getGangkutadiExamples();
      expect(examples.sutraText.devanagari).toBe('गाङ्कुटादिभ्योऽञ्णिन्ङ् इत्');
      expect(examples.sutraText.iast).toBe('gāṅkuṭādibhyo\'ñaṇinṅa ita');
    });
  });

  describe('Constants validation', () => {
    it('should have matching Devanagari and IAST root lists', () => {
      expect(GANGKUTADI_ROOTS).toBeInstanceOf(Array);
      expect(GANGKUTADI_ROOTS_IAST).toBeInstanceOf(Array);
      expect(GANGKUTADI_ROOTS.length).toBe(GANGKUTADI_ROOTS_IAST.length);
    });

    it('should have valid excluded affix patterns', () => {
      expect(EXCLUDED_AFFIX_PATTERNS).toHaveProperty('ञित्');
      expect(EXCLUDED_AFFIX_PATTERNS).toHaveProperty('णित्');
      expect(EXCLUDED_AFFIX_PATTERNS.ञित्).toBeInstanceOf(Array);
      expect(EXCLUDED_AFFIX_PATTERNS.णित्).toBeInstanceOf(Array);
    });
  });

  describe('Integration tests', () => {
    it('should work consistently across all functions', () => {
      const root = 'गाङ्';
      const affix = 'ति';

      expect(isGangkutadiRoot(root)).toBe(true);
      expect(hasExcludedIndicatory(affix)).toBe(false);
      expect(isNgitByGangkutadi(root, affix)).toBe(true);
    });

    it('should handle mixed script scenarios', () => {
      // Different scripts for root and affix should still work
      expect(isNgitByGangkutadi('गाङ्', 'ti')).toBe(true); // Devanagari root, IAST affix
      expect(isNgitByGangkutadi('gāṅ', 'ति')).toBe(true); // IAST root, Devanagari affix
    });

    it('should maintain consistency with traditional grammar', () => {
      // Test cases based on traditional grammatical examples
      const traditionalCases = [
        { root: 'गाङ्', affix: 'ति', expected: true, note: 'Classic example from sutra' },
        { root: 'कुट्', affix: 'त', expected: true, note: 'Primary root from sutra' },
        { root: 'गाङ्', affix: 'ञ्', expected: false, note: 'Excluded ञित् affix' },
        { root: 'भू', affix: 'ति', expected: false, note: 'Non-गाङ्कुटादि root' }
      ];

      traditionalCases.forEach(({ root, affix, expected, note }) => {
        expect(isNgitByGangkutadi(root, affix)).toBe(expected);
      });
    });
  });
});
