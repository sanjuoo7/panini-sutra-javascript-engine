/**
 * Test suite for Sutra 1.2.5: असंयोगाल्लिट् कित्
 * Testing liṭ affix kit designation based on conjunct presence
 */

import {
  isLitAffix,
  hasConjunct,
  isLitAffixAfterConjunct,
  isKitByAsamyogalLit,
  analyzeLitKitStatus,
  checkLitSpecificConditions,
  getLitKitExamples,
  LIT_AFFIXES,
  CONJUNCT_PATTERNS
} from './index.js';

describe('Sutra 1.2.5: असंयोगाल्लिट् कित्', () => {
  
  describe('isLitAffix function', () => {
    describe('Devanagari liṭ affixes', () => {
      it('should identify parasmaipada perfect endings', () => {
        expect(isLitAffix('आ')).toBe(true);
        expect(isLitAffix('अतुः')).toBe(true);
        expect(isLitAffix('उः')).toBe(true);
        expect(isLitAffix('थ')).toBe(true);
        expect(isLitAffix('अ')).toBe(true);
      });

      it('should identify ātmanepada perfect endings', () => {
        expect(isLitAffix('ए')).toBe(true);
        expect(isLitAffix('आते')).toBe(true);
        expect(isLitAffix('इरे')).toBe(true);
        expect(isLitAffix('से')).toBe(true);
        expect(isLitAffix('ध्वे')).toBe(true);
      });

      it('should reject non-liṭ affixes', () => {
        expect(isLitAffix('ति')).toBe(false);
        expect(isLitAffix('न्ति')).toBe(false);
        expect(isLitAffix('त')).toBe(false);
        expect(isLitAffix('तवत्')).toBe(false);
      });
    });

    describe('IAST liṭ affixes', () => {
      it('should identify parasmaipada perfect endings', () => {
        expect(isLitAffix('ā')).toBe(true);
        expect(isLitAffix('atuḥ')).toBe(true);
        expect(isLitAffix('uḥ')).toBe(true);
        expect(isLitAffix('tha')).toBe(true);
        expect(isLitAffix('a')).toBe(true);
      });

      it('should identify ātmanepada perfect endings', () => {
        expect(isLitAffix('e')).toBe(true);
        expect(isLitAffix('āte')).toBe(true);
        expect(isLitAffix('ire')).toBe(true);
        expect(isLitAffix('se')).toBe(true);
        expect(isLitAffix('dhve')).toBe(true);
      });

      it('should reject non-liṭ IAST affixes', () => {
        expect(isLitAffix('ti')).toBe(false);
        expect(isLitAffix('nti')).toBe(false);
        expect(isLitAffix('ta')).toBe(false);
        expect(isLitAffix('tavat')).toBe(false);
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        expect(isLitAffix(null)).toBe(false);
        expect(isLitAffix(undefined)).toBe(false);
        expect(isLitAffix('')).toBe(false);
        expect(isLitAffix(123)).toBe(false);
      });

      it('should handle whitespace', () => {
        expect(isLitAffix('  आ  ')).toBe(true);
        expect(isLitAffix('   ')).toBe(false);
      });
    });
  });

  describe('hasConjunct function', () => {
    describe('Devanagari conjunct detection', () => {
      it('should identify common conjuncts', () => {
        expect(hasConjunct('क्त')).toBe(true);
        expect(hasConjunct('ष्ट')).toBe(true);
        expect(hasConjunct('न्त')).toBe(true);
        expect(hasConjunct('म्प')).toBe(true);
        expect(hasConjunct('स्थ')).toBe(true);
      });

      it('should identify conjuncts in longer sequences', () => {
        expect(hasConjunct('यज्ञ')).toBe(true);
        expect(hasConjunct('अग्नि')).toBe(true);
        expect(hasConjunct('उत्पद्')).toBe(true);
        expect(hasConjunct('सम्स्कृत')).toBe(true);
      });

      it('should reject non-conjunct sequences', () => {
        expect(hasConjunct('क')).toBe(false);
        expect(hasConjunct('कम')).toBe(false);
        expect(hasConjunct('गम')).toBe(false);
        expect(hasConjunct('भु')).toBe(false);
      });
    });

    describe('IAST conjunct detection', () => {
      it('should identify common IAST conjuncts', () => {
        expect(hasConjunct('kt')).toBe(true);
        expect(hasConjunct('ṣṭ')).toBe(true);
        expect(hasConjunct('nt')).toBe(true);
        expect(hasConjunct('mp')).toBe(true);
        expect(hasConjunct('sth')).toBe(true);
      });

      it('should identify conjuncts in IAST sequences', () => {
        expect(hasConjunct('yajñ')).toBe(true);
        expect(hasConjunct('agni')).toBe(true);
        expect(hasConjunct('utpad')).toBe(true);
        expect(hasConjunct('saṃskṛt')).toBe(true);
      });

      it('should reject non-conjunct IAST sequences', () => {
        expect(hasConjunct('k')).toBe(false);
        expect(hasConjunct('kam')).toBe(false);
        expect(hasConjunct('gam')).toBe(false);
        expect(hasConjunct('bhu')).toBe(false);
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        expect(hasConjunct(null)).toBe(false);
        expect(hasConjunct(undefined)).toBe(false);
        expect(hasConjunct('')).toBe(false);
        expect(hasConjunct(123)).toBe(false);
      });
    });
  });

  describe('isLitAffixAfterConjunct function', () => {
    describe('Positive cases - after conjunct', () => {
      it('should detect liṭ affixes after Devanagari conjuncts', () => {
        expect(isLitAffixAfterConjunct('यज्ञ', 'आ')).toBe(true);
        expect(isLitAffixAfterConjunct('अग्नि', 'अतुः')).toBe(true);
        expect(isLitAffixAfterConjunct('उत्पद्', 'उः')).toBe(true);
        expect(isLitAffixAfterConjunct('सम्स्कृत', 'ए')).toBe(true);
      });

      it('should detect liṭ affixes after IAST conjuncts', () => {
        expect(isLitAffixAfterConjunct('yajñ', 'ā')).toBe(true);
        expect(isLitAffixAfterConjunct('agni', 'atuḥ')).toBe(true);
        expect(isLitAffixAfterConjunct('utpad', 'uḥ')).toBe(true);
        expect(isLitAffixAfterConjunct('saṃskṛt', 'e')).toBe(true);
      });
    });

    describe('Negative cases - not after conjunct', () => {
      it('should reject non-conjunct contexts', () => {
        expect(isLitAffixAfterConjunct('भु', 'आ')).toBe(false);
        expect(isLitAffixAfterConjunct('गम्', 'उः')).toBe(false);
        expect(isLitAffixAfterConjunct('कृ', 'ए')).toBe(false);
        expect(isLitAffixAfterConjunct('दा', 'औ')).toBe(false);
      });

      it('should reject non-liṭ affixes', () => {
        expect(isLitAffixAfterConjunct('यज्ञ', 'ति')).toBe(false);
        expect(isLitAffixAfterConjunct('अग्नि', 'न्ति')).toBe(false);
        expect(isLitAffixAfterConjunct('उत्पद्', 'त')).toBe(false);
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        expect(isLitAffixAfterConjunct(null, 'आ')).toBe(false);
        expect(isLitAffixAfterConjunct('भु', null)).toBe(false);
        expect(isLitAffixAfterConjunct('', 'आ')).toBe(false);
        expect(isLitAffixAfterConjunct('भु', '')).toBe(false);
      });
    });
  });

  describe('isKitByAsamyogalLit function', () => {
    describe('Positive cases - should be kit', () => {
      it('should make liṭ affixes kit when not after conjunct', () => {
        expect(isKitByAsamyogalLit('भु', 'आ')).toBe(true);
        expect(isKitByAsamyogalLit('कृ', 'औ')).toBe(true);
        expect(isKitByAsamyogalLit('गम्', 'उः')).toBe(true);
        expect(isKitByAsamyogalLit('दा', 'ए')).toBe(true);
      });

      it('should work with IAST script', () => {
        expect(isKitByAsamyogalLit('bhu', 'ā')).toBe(true);
        expect(isKitByAsamyogalLit('kṛ', 'au')).toBe(true);
        expect(isKitByAsamyogalLit('gam', 'uḥ')).toBe(true);
        expect(isKitByAsamyogalLit('dā', 'e')).toBe(true);
      });
    });

    describe('Negative cases - after conjunct', () => {
      it('should not apply to liṭ affixes after conjunct', () => {
        expect(isKitByAsamyogalLit('यज्ञ', 'आ')).toBe(false);
        expect(isKitByAsamyogalLit('अग्नि', 'उः')).toBe(false);
        expect(isKitByAsamyogalLit('उत्पद्', 'ए')).toBe(false);
        expect(isKitByAsamyogalLit('सम्स्कृत', 'औ')).toBe(false);
      });

      it('should not apply to IAST liṭ affixes after conjunct', () => {
        expect(isKitByAsamyogalLit('yajñ', 'ā')).toBe(false);
        expect(isKitByAsamyogalLit('agni', 'uḥ')).toBe(false);
        expect(isKitByAsamyogalLit('utpad', 'e')).toBe(false);
        expect(isKitByAsamyogalLit('saṃskṛt', 'au')).toBe(false);
      });
    });

    describe('Negative cases - non-liṭ affixes', () => {
      it('should not apply to non-liṭ affixes', () => {
        expect(isKitByAsamyogalLit('भु', 'ति')).toBe(false);
        expect(isKitByAsamyogalLit('कृ', 'न्ति')).toBe(false);
        expect(isKitByAsamyogalLit('गम्', 'त')).toBe(false);
        expect(isKitByAsamyogalLit('दा', 'तवत्')).toBe(false);
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        expect(isKitByAsamyogalLit(null, 'आ')).toBe(false);
        expect(isKitByAsamyogalLit('भु', null)).toBe(false);
        expect(isKitByAsamyogalLit('', 'आ')).toBe(false);
        expect(isKitByAsamyogalLit('भु', '')).toBe(false);
      });

      it('should validate Sanskrit input', () => {
        expect(isKitByAsamyogalLit('xyz123', 'आ')).toBe(false);
        expect(isKitByAsamyogalLit('भु', 'abc')).toBe(false);
      });
    });

    describe('Context parameter', () => {
      it('should accept optional context parameter', () => {
        const context = { tense: 'perfect', voice: 'parasmaipada' };
        expect(isKitByAsamyogalLit('भु', 'आ', context)).toBe(true);
      });
    });
  });

  describe('analyzeLitKitStatus function', () => {
    it('should analyze multiple contexts correctly', () => {
      const contexts = [
        { precedingContext: 'भु', affix: 'आ' }, // liṭ not after conjunct
        { precedingContext: 'कृ', affix: 'औ' }, // liṭ not after conjunct
        { precedingContext: 'गम्', affix: 'उः' }, // liṭ not after conjunct
        { precedingContext: 'यज्ञ', affix: 'आ' }, // liṭ after conjunct
        { precedingContext: 'अग्नि', affix: 'ए' }, // liṭ after conjunct
        { precedingContext: 'भु', affix: 'ति' }, // non-liṭ affix
        { precedingContext: 'कृ', affix: 'न्ति' } // non-liṭ affix
      ];

      const result = analyzeLitKitStatus(contexts);

      expect(result.total).toBe(7);
      expect(result.kitCount).toBe(3); // भु+आ, कृ+औ, गम्+उः
      expect(result.afterConjunctCount).toBe(2); // यज्ञ+आ, अग्नि+ए
      expect(result.nonLitCount).toBe(2); // भु+ति, कृ+न्ति
      expect(result.invalidCount).toBe(0);
    });

    it('should handle empty array', () => {
      const result = analyzeLitKitStatus([]);
      
      expect(result.total).toBe(0);
      expect(result.kitCount).toBe(0);
      expect(result.afterConjunctCount).toBe(0);
      expect(result.nonLitCount).toBe(0);
      expect(result.invalidCount).toBe(0);
    });

    it('should handle invalid contexts', () => {
      const contexts = [
        null,
        { precedingContext: 'भु' }, // missing affix
        { affix: 'आ' }, // missing precedingContext
        { precedingContext: 'कृ', affix: 'औ' }, // valid
        'invalid string'
      ];
      
      const result = analyzeLitKitStatus(contexts);
      
      expect(result.total).toBe(5);
      expect(result.invalidCount).toBe(4); // null, incomplete objects, string
      expect(result.kitCount).toBe(1); // कृ+औ
    });

    it('should provide detailed categorization', () => {
      const contexts = [
        { precedingContext: 'भु', affix: 'आ' },
        { precedingContext: 'यज्ञ', affix: 'ए' },
        { precedingContext: 'कृ', affix: 'ति' }
      ];
      
      const result = analyzeLitKitStatus(contexts);

      expect(result.kitItems).toHaveLength(1);
      expect(result.kitItems[0].precedingContext).toBe('भु');
      expect(result.kitItems[0].affix).toBe('आ');
      expect(result.kitItems[0].result).toBe('kit');

      expect(result.afterConjunctItems).toHaveLength(1);
      expect(result.afterConjunctItems[0].precedingContext).toBe('यज्ञ');
      expect(result.afterConjunctItems[0].affix).toBe('ए');

      expect(result.nonLitItems).toHaveLength(1);
      expect(result.nonLitItems[0].precedingContext).toBe('कृ');
      expect(result.nonLitItems[0].affix).toBe('ति');
    });

    it('should throw error for non-array input', () => {
      expect(() => analyzeLitKitStatus('not array')).toThrow();
      expect(() => analyzeLitKitStatus(null)).toThrow();
      expect(() => analyzeLitKitStatus(123)).toThrow();
    });
  });

  describe('checkLitSpecificConditions function', () => {
    it('should indicate general rule application', () => {
      const result = checkLitSpecificConditions('भू', 'भु', 'आ');
      expect(result.hasSpecialCondition).toBe(false);
      expect(result.condition).toBe('General rule applies based on conjunct presence');
      expect(result.applies).toBe(true);
    });

    it('should work with different root-context-affix combinations', () => {
      const result1 = checkLitSpecificConditions('कृ', 'कृ', 'औ');
      expect(result1.applies).toBe(true);

      const result2 = checkLitSpecificConditions('यज्', 'यज्ञ', 'आ');
      expect(result2.applies).toBe(false); // after conjunct
    });

    it('should handle invalid inputs', () => {
      const result = checkLitSpecificConditions('', 'भु', 'आ');
      expect(result.hasSpecialCondition).toBe(false);
      expect(result.condition).toBe('Invalid Sanskrit input');
      expect(result.applies).toBe(false);
    });

    it('should validate Sanskrit inputs', () => {
      const result = checkLitSpecificConditions('भू', 'भु', 'आ');
      expect(result.applies).toBe(true);
      
      const result2 = checkLitSpecificConditions('xyz123!@#', 'भु', 'आ');
      expect(result2.condition).toBe('Invalid Sanskrit input');
    });
  });

  describe('getLitKitExamples function', () => {
    it('should provide comprehensive examples', () => {
      const examples = getLitKitExamples();
      
      expect(examples.sutraText).toBeDefined();
      expect(examples.technicalDefinition).toBeDefined();
      expect(examples.positiveExamples).toBeDefined();
      expect(examples.negativeExamples).toBeDefined();
      expect(examples.technicalNotes).toBeDefined();
    });

    it('should include correct technical definitions', () => {
      const examples = getLitKitExamples();
      
      expect(examples.sutraText.devanagari).toBe('असंयोगाल्लिट् कित्');
      expect(examples.sutraText.iast).toBe('asaṃyogāl liṭ kit');
      expect(examples.technicalDefinition.term).toBe('असंयोगाल्लिट् कित्');
    });

    it('should provide valid positive examples', () => {
      const examples = getLitKitExamples();
      
      expect(examples.positiveExamples).toHaveLength(3);
      expect(examples.positiveExamples[0].precedingContext).toBe('भु');
      expect(examples.positiveExamples[0].affix).toBe('आ');
      expect(examples.positiveExamples[0].analysis).toContain('kit');
    });
  });

  describe('Constants validation', () => {
    it('should have valid liṭ affixes', () => {
      expect(LIT_AFFIXES.devanagari).toBeInstanceOf(Array);
      expect(LIT_AFFIXES.iast).toBeInstanceOf(Array);
      expect(LIT_AFFIXES.devanagari.length).toBeGreaterThan(0);
      expect(LIT_AFFIXES.iast.length).toBeGreaterThan(0);
    });

    it('should have valid conjunct patterns', () => {
      expect(CONJUNCT_PATTERNS.devanagari).toBeInstanceOf(Array);
      expect(CONJUNCT_PATTERNS.iast).toBeInstanceOf(Array);
      expect(CONJUNCT_PATTERNS.devanagari.length).toBeGreaterThan(0);
      expect(CONJUNCT_PATTERNS.iast.length).toBeGreaterThan(0);
    });

    it('should have corresponding IAST patterns for Devanagari', () => {
      // Basic check that we have both scripts represented
      expect(CONJUNCT_PATTERNS.devanagari.includes('क्त')).toBe(true);
      expect(CONJUNCT_PATTERNS.iast.includes('kt')).toBe(true);
    });
  });

  describe('Integration tests', () => {
    it('should work consistently across all functions', () => {
      const precedingContext = 'भु';
      const affix = 'आ';
      
      expect(isLitAffix(affix)).toBe(true);
      expect(hasConjunct(precedingContext)).toBe(false);
      expect(isLitAffixAfterConjunct(precedingContext, affix)).toBe(false);
      expect(isKitByAsamyogalLit(precedingContext, affix)).toBe(true);
    });

    it('should handle cross-script consistency', () => {
      // Devanagari
      expect(isKitByAsamyogalLit('भु', 'आ')).toBe(true);
      // IAST equivalent
      expect(isKitByAsamyogalLit('bhu', 'ā')).toBe(true);
    });

    it('should maintain consistency with traditional grammar', () => {
      // Classical example: बभूव (perfect of भू)
      expect(isKitByAsamyogalLit('भु', 'आ')).toBe(true);
      
      // Classical example: ययाज (perfect of यज्) - after conjunct
      expect(isKitByAsamyogalLit('यज्ञ', 'आ')).toBe(false);
    });

    it('should correctly distinguish from other kit rules', () => {
      // This rule is specific to liṭ affixes
      expect(isKitByAsamyogalLit('भु', 'ति')).toBe(false); // ति is not liṭ
      expect(isKitByAsamyogalLit('भु', 'त')).toBe(false); // त is not liṭ
    });
  });
});
