/**
 * Test suite for Sutra 1.2.6: ईन्धिभवतिभ्यां च
 * Testing kit designation for liṭ affixes after इन्धि and भू roots
 */

import {
  isIndhiRoot,
  isBhavatiRoot,
  isIndhiBhavatiRoot,
  isKitByIndhiBhavati,
  analyzeIndhiBhavatiKitStatus,
  checkIndhiBhavatiSpecificConditions,
  getIndhiBhavatiKitExamples,
  INDHI_BHAVATI_ROOTS,
  ROOT_VARIANTS
} from './index.js';

describe('Sutra 1.2.6: ईन्धिभवतिभ्यां च', () => {
  
  describe('isIndhiRoot function', () => {
    describe('Devanagari इन्धि root identification', () => {
      it('should identify primary इन्धि root', () => {
        expect(isIndhiRoot('इन्धि')).toBe(true);
      });

      it('should identify इन्धि variants', () => {
        expect(isIndhiRoot('इध्')).toBe(true);
        expect(isIndhiRoot('इन्ध्')).toBe(true);
        expect(isIndhiRoot('एध्')).toBe(true);
      });

      it('should reject non-इन्धि roots', () => {
        expect(isIndhiRoot('भू')).toBe(false);
        expect(isIndhiRoot('कृ')).toBe(false);
        expect(isIndhiRoot('गम्')).toBe(false);
        expect(isIndhiRoot('दा')).toBe(false);
      });
    });

    describe('IAST इन्धि root identification', () => {
      it('should identify primary indhi root', () => {
        expect(isIndhiRoot('indhi')).toBe(true);
      });

      it('should identify indhi variants', () => {
        expect(isIndhiRoot('idh')).toBe(true);
        expect(isIndhiRoot('indh')).toBe(true);
        expect(isIndhiRoot('edh')).toBe(true);
      });

      it('should reject non-indhi IAST roots', () => {
        expect(isIndhiRoot('bhū')).toBe(false);
        expect(isIndhiRoot('kṛ')).toBe(false);
        expect(isIndhiRoot('gam')).toBe(false);
        expect(isIndhiRoot('dā')).toBe(false);
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        expect(isIndhiRoot(null)).toBe(false);
        expect(isIndhiRoot(undefined)).toBe(false);
        expect(isIndhiRoot('')).toBe(false);
        expect(isIndhiRoot(123)).toBe(false);
      });

      it('should handle whitespace', () => {
        expect(isIndhiRoot('  इन्धि  ')).toBe(true);
        expect(isIndhiRoot('   ')).toBe(false);
      });
    });
  });

  describe('isBhavatiRoot function', () => {
    describe('Devanagari भू root identification', () => {
      it('should identify primary भू root', () => {
        expect(isBhavatiRoot('भू')).toBe(true);
      });

      it('should identify भू variants', () => {
        expect(isBhavatiRoot('भु')).toBe(true);
        expect(isBhavatiRoot('भव्')).toBe(true);
        expect(isBhavatiRoot('भुव्')).toBe(true);
      });

      it('should reject non-भू roots', () => {
        expect(isBhavatiRoot('इन्धि')).toBe(false);
        expect(isBhavatiRoot('कृ')).toBe(false);
        expect(isBhavatiRoot('गम्')).toBe(false);
        expect(isBhavatiRoot('दा')).toBe(false);
      });
    });

    describe('IAST भू root identification', () => {
      it('should identify primary bhū root', () => {
        expect(isBhavatiRoot('bhū')).toBe(true);
      });

      it('should identify bhū variants', () => {
        expect(isBhavatiRoot('bhu')).toBe(true);
        expect(isBhavatiRoot('bhav')).toBe(true);
        expect(isBhavatiRoot('bhuv')).toBe(true);
      });

      it('should reject non-bhū IAST roots', () => {
        expect(isBhavatiRoot('indhi')).toBe(false);
        expect(isBhavatiRoot('kṛ')).toBe(false);
        expect(isBhavatiRoot('gam')).toBe(false);
        expect(isBhavatiRoot('dā')).toBe(false);
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        expect(isBhavatiRoot(null)).toBe(false);
        expect(isBhavatiRoot(undefined)).toBe(false);
        expect(isBhavatiRoot('')).toBe(false);
        expect(isBhavatiRoot(123)).toBe(false);
      });

      it('should handle whitespace', () => {
        expect(isBhavatiRoot('  भू  ')).toBe(true);
        expect(isBhavatiRoot('   ')).toBe(false);
      });
    });
  });

  describe('isIndhiBhavatiRoot function', () => {
    describe('Combined root identification', () => {
      it('should identify इन्धि roots', () => {
        expect(isIndhiBhavatiRoot('इन्धि')).toBe(true);
        expect(isIndhiBhavatiRoot('इध्')).toBe(true);
        expect(isIndhiBhavatiRoot('indhi')).toBe(true);
        expect(isIndhiBhavatiRoot('idh')).toBe(true);
      });

      it('should identify भू roots', () => {
        expect(isIndhiBhavatiRoot('भू')).toBe(true);
        expect(isIndhiBhavatiRoot('भु')).toBe(true);
        expect(isIndhiBhavatiRoot('bhū')).toBe(true);
        expect(isIndhiBhavatiRoot('bhu')).toBe(true);
      });

      it('should reject other roots', () => {
        expect(isIndhiBhavatiRoot('कृ')).toBe(false);
        expect(isIndhiBhavatiRoot('गम्')).toBe(false);
        expect(isIndhiBhavatiRoot('दा')).toBe(false);
        expect(isIndhiBhavatiRoot('kṛ')).toBe(false);
        expect(isIndhiBhavatiRoot('gam')).toBe(false);
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        expect(isIndhiBhavatiRoot(null)).toBe(false);
        expect(isIndhiBhavatiRoot(undefined)).toBe(false);
        expect(isIndhiBhavatiRoot('')).toBe(false);
        expect(isIndhiBhavatiRoot(123)).toBe(false);
      });
    });
  });

  describe('isKitByIndhiBhavati function', () => {
    describe('Positive cases - should be kit', () => {
      it('should make liṭ affixes kit after इन्धि root', () => {
        expect(isKitByIndhiBhavati('इन्धि', 'आ')).toBe(true);
        expect(isKitByIndhiBhavati('इन्धि', 'उः')).toBe(true);
        expect(isKitByIndhiBhavati('इन्धि', 'ए')).toBe(true);
        expect(isKitByIndhiBhavati('इध्', 'औ')).toBe(true);
      });

      it('should make liṭ affixes kit after भू root', () => {
        expect(isKitByIndhiBhavati('भू', 'आ')).toBe(true);
        expect(isKitByIndhiBhavati('भू', 'उः')).toBe(true);
        expect(isKitByIndhiBhavati('भु', 'ए')).toBe(true);
        expect(isKitByIndhiBhavati('भव्', 'औ')).toBe(true);
      });

      it('should work with IAST script', () => {
        expect(isKitByIndhiBhavati('indhi', 'ā')).toBe(true);
        expect(isKitByIndhiBhavati('bhū', 'uḥ')).toBe(true);
        expect(isKitByIndhiBhavati('bhu', 'e')).toBe(true);
        expect(isKitByIndhiBhavati('idh', 'au')).toBe(true);
      });
    });

    describe('Negative cases - other roots', () => {
      it('should not apply to liṭ affixes after other roots', () => {
        expect(isKitByIndhiBhavati('कृ', 'आ')).toBe(false);
        expect(isKitByIndhiBhavati('गम्', 'उः')).toBe(false);
        expect(isKitByIndhiBhavati('दा', 'ए')).toBe(false);
        expect(isKitByIndhiBhavati('नी', 'औ')).toBe(false);
      });

      it('should not apply to IAST liṭ affixes after other roots', () => {
        expect(isKitByIndhiBhavati('kṛ', 'ā')).toBe(false);
        expect(isKitByIndhiBhavati('gam', 'uḥ')).toBe(false);
        expect(isKitByIndhiBhavati('dā', 'e')).toBe(false);
        expect(isKitByIndhiBhavati('nī', 'au')).toBe(false);
      });
    });

    describe('Negative cases - non-liṭ affixes', () => {
      it('should not apply to non-liṭ affixes after इन्धि/भू', () => {
        expect(isKitByIndhiBhavati('इन्धि', 'ति')).toBe(false);
        expect(isKitByIndhiBhavati('भू', 'न्ति')).toBe(false);
        expect(isKitByIndhiBhavati('इन्धि', 'त')).toBe(false);
        expect(isKitByIndhiBhavati('भू', 'तवत्')).toBe(false);
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        expect(isKitByIndhiBhavati(null, 'आ')).toBe(false);
        expect(isKitByIndhiBhavati('भू', null)).toBe(false);
        expect(isKitByIndhiBhavati('', 'आ')).toBe(false);
        expect(isKitByIndhiBhavati('भू', '')).toBe(false);
      });

      it('should validate Sanskrit input', () => {
        expect(isKitByIndhiBhavati('xyz123!@#', 'आ')).toBe(false);
        expect(isKitByIndhiBhavati('भू', 'abc123')).toBe(false);
      });
    });

    describe('Context parameter', () => {
      it('should accept optional context parameter', () => {
        const context = { sutra: '1.2.6', rootType: 'indhi' };
        expect(isKitByIndhiBhavati('इन्धि', 'आ', context)).toBe(true);
      });
    });
  });

  describe('analyzeIndhiBhavatiKitStatus function', () => {
    it('should analyze multiple combinations correctly', () => {
      const combinations = [
        { root: 'इन्धि', affix: 'आ' }, // kit by इन्धि
        { root: 'भू', affix: 'उः' }, // kit by भू  
        { root: 'भु', affix: 'ए' }, // kit by भू variant
        { root: 'कृ', affix: 'आ' }, // other root
        { root: 'गम्', affix: 'उः' }, // other root
        { root: 'इन्धि', affix: 'ति' }, // non-liṭ affix
        { root: 'भू', affix: 'न्ति' } // non-liṭ affix
      ];

      const result = analyzeIndhiBhavatiKitStatus(combinations);

      expect(result.total).toBe(7);
      expect(result.kitByIndhiBhavatiCount).toBe(3); // इन्धि+आ, भू+उः, भु+ए
      expect(result.nonSpecificRootCount).toBe(2); // कृ+आ, गम्+उः
      expect(result.nonLitCount).toBe(2); // इन्धि+ति, भू+न्ति
      expect(result.invalidCount).toBe(0);
    });

    it('should handle empty array', () => {
      const result = analyzeIndhiBhavatiKitStatus([]);
      
      expect(result.total).toBe(0);
      expect(result.kitByIndhiBhavatiCount).toBe(0);
      expect(result.nonSpecificRootCount).toBe(0);
      expect(result.nonLitCount).toBe(0);
      expect(result.invalidCount).toBe(0);
    });

    it('should handle invalid combinations', () => {
      const combinations = [
        null,
        { root: 'इन्धि' }, // missing affix
        { affix: 'आ' }, // missing root
        { root: 'भू', affix: 'आ' }, // valid
        'invalid string'
      ];
      
      const result = analyzeIndhiBhavatiKitStatus(combinations);
      
      expect(result.total).toBe(5);
      expect(result.invalidCount).toBe(4); // null, incomplete objects, string
      expect(result.kitByIndhiBhavatiCount).toBe(1); // भू+आ
    });

    it('should provide detailed categorization', () => {
      const combinations = [
        { root: 'इन्धि', affix: 'आ' },
        { root: 'कृ', affix: 'उः' },
        { root: 'भू', affix: 'ति' }
      ];
      
      const result = analyzeIndhiBhavatiKitStatus(combinations);

      expect(result.kitByIndhiBhavatiItems).toHaveLength(1);
      expect(result.kitByIndhiBhavatiItems[0].root).toBe('इन्धि');
      expect(result.kitByIndhiBhavatiItems[0].affix).toBe('आ');
      expect(result.kitByIndhiBhavatiItems[0].result).toBe('kit');

      expect(result.nonSpecificRootItems).toHaveLength(1);
      expect(result.nonSpecificRootItems[0].root).toBe('कृ');
      expect(result.nonSpecificRootItems[0].affix).toBe('उः');

      expect(result.nonLitItems).toHaveLength(1);
      expect(result.nonLitItems[0].root).toBe('भू');
      expect(result.nonLitItems[0].affix).toBe('ति');
    });

    it('should throw error for non-array input', () => {
      expect(() => analyzeIndhiBhavatiKitStatus('not array')).toThrow();
      expect(() => analyzeIndhiBhavatiKitStatus(null)).toThrow();
      expect(() => analyzeIndhiBhavatiKitStatus(123)).toThrow();
    });
  });

  describe('checkIndhiBhavatiSpecificConditions function', () => {
    it('should identify इन्धि root conditions', () => {
      const result = checkIndhiBhavatiSpecificConditions('इन्धि', 'आ');
      expect(result.hasSpecialCondition).toBe(true);
      expect(result.condition).toBe('इन्धि root - kit designation for liṭ affixes');
      expect(result.rootType).toBe('indhi');
      expect(result.applies).toBe(true);
    });

    it('should identify भू root conditions', () => {
      const result = checkIndhiBhavatiSpecificConditions('भू', 'उः');
      expect(result.hasSpecialCondition).toBe(true);
      expect(result.condition).toBe('भू root - kit designation for liṭ affixes');
      expect(result.rootType).toBe('bhavati');
      expect(result.applies).toBe(true);
    });

    it('should handle non-specific roots', () => {
      const result = checkIndhiBhavatiSpecificConditions('कृ', 'आ');
      expect(result.hasSpecialCondition).toBe(false);
      expect(result.condition).toBe('Not इन्धि or भू root');
      expect(result.rootType).toBe('other');
      expect(result.applies).toBe(false);
    });

    it('should handle invalid inputs', () => {
      const result = checkIndhiBhavatiSpecificConditions('', 'आ');
      expect(result.hasSpecialCondition).toBe(false);
      expect(result.condition).toBe('Invalid Sanskrit input');
      expect(result.rootType).toBe('unknown');
      expect(result.applies).toBe(false);
    });

    it('should validate Sanskrit inputs', () => {
      const result = checkIndhiBhavatiSpecificConditions('इन्धि', 'आ');
      expect(result.applies).toBe(true);
      
      const result2 = checkIndhiBhavatiSpecificConditions('xyz123!@#', 'आ');
      expect(result2.condition).toBe('Invalid Sanskrit input');
    });
  });

  describe('getIndhiBhavatiKitExamples function', () => {
    it('should provide comprehensive examples', () => {
      const examples = getIndhiBhavatiKitExamples();
      
      expect(examples.sutraText).toBeDefined();
      expect(examples.technicalDefinition).toBeDefined();
      expect(examples.specificRoots).toBeDefined();
      expect(examples.positiveExamples).toBeDefined();
      expect(examples.negativeExamples).toBeDefined();
      expect(examples.technicalNotes).toBeDefined();
    });

    it('should include correct technical definitions', () => {
      const examples = getIndhiBhavatiKitExamples();
      
      expect(examples.sutraText.devanagari).toBe('ईन्धिभवतिभ्यां च');
      expect(examples.sutraText.iast).toBe('īndhibhavatibhyāṃ ca');
      expect(examples.technicalDefinition.term).toBe('ईन्धिभवतिभ्यां च');
    });

    it('should provide valid specific roots', () => {
      const examples = getIndhiBhavatiKitExamples();
      
      expect(examples.specificRoots).toHaveLength(2);
      expect(examples.specificRoots[0].root).toBe('इन्धि');
      expect(examples.specificRoots[0].meaning).toBe('to kindle, to ignite');
      expect(examples.specificRoots[1].root).toBe('भू');
      expect(examples.specificRoots[1].meaning).toBe('to become, to be');
    });

    it('should provide valid positive examples', () => {
      const examples = getIndhiBhavatiKitExamples();
      
      expect(examples.positiveExamples).toHaveLength(3);
      expect(examples.positiveExamples[0].root).toBe('इन्धि');
      expect(examples.positiveExamples[0].affix).toBe('आ');
      expect(examples.positiveExamples[1].root).toBe('भू');
      expect(examples.positiveExamples[1].affix).toBe('उः');
    });
  });

  describe('Constants validation', () => {
    it('should have valid इन्धि and भू roots', () => {
      expect(INDHI_BHAVATI_ROOTS.devanagari).toBeInstanceOf(Array);
      expect(INDHI_BHAVATI_ROOTS.iast).toBeInstanceOf(Array);
      expect(INDHI_BHAVATI_ROOTS.devanagari).toContain('इन्धि');
      expect(INDHI_BHAVATI_ROOTS.devanagari).toContain('भू');
      expect(INDHI_BHAVATI_ROOTS.iast).toContain('indhi');
      expect(INDHI_BHAVATI_ROOTS.iast).toContain('bhū');
    });

    it('should have valid root variants', () => {
      expect(ROOT_VARIANTS.devanagari).toBeInstanceOf(Object);
      expect(ROOT_VARIANTS.iast).toBeInstanceOf(Object);
      expect(ROOT_VARIANTS.devanagari['इन्धि']).toContain('इन्धि');
      expect(ROOT_VARIANTS.devanagari['भू']).toContain('भू');
      expect(ROOT_VARIANTS.iast['indhi']).toContain('indhi');
      expect(ROOT_VARIANTS.iast['bhū']).toContain('bhū');
    });
  });

  describe('Integration tests', () => {
    it('should work consistently across all functions', () => {
      const root = 'इन्धि';
      const affix = 'आ';
      
      expect(isIndhiRoot(root)).toBe(true);
      expect(isIndhiBhavatiRoot(root)).toBe(true);
      expect(isKitByIndhiBhavati(root, affix)).toBe(true);
      
      const conditions = checkIndhiBhavatiSpecificConditions(root, affix);
      expect(conditions.applies).toBe(true);
      expect(conditions.rootType).toBe('indhi');
    });

    it('should handle cross-script consistency', () => {
      // Devanagari
      expect(isKitByIndhiBhavati('भू', 'आ')).toBe(true);
      // IAST equivalent
      expect(isKitByIndhiBhavati('bhū', 'ā')).toBe(true);
    });

    it('should maintain consistency with traditional grammar', () => {
      // Classical example: बभूव (perfect of भू)
      expect(isKitByIndhiBhavati('भू', 'आ')).toBe(true);
      
      // Classical example: इन्धयामास (perfect of इन्धि)
      expect(isKitByIndhiBhavati('इन्धि', 'आ')).toBe(true);
    });

    it('should correctly distinguish from other roots', () => {
      // This rule is specific to इन्धि and भू roots
      expect(isKitByIndhiBhavati('कृ', 'आ')).toBe(false); // कृ is not इन्धि/भू
      expect(isKitByIndhiBhavati('गम्', 'उः')).toBe(false); // गम् is not इन्धि/भू
      
      // But still requires liṭ affixes
      expect(isKitByIndhiBhavati('भू', 'ति')).toBe(false); // ति is not liṭ
    });
  });
});
