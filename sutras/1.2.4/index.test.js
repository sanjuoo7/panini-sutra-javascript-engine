import {
  isSarvadhatukaAffix,
  hasPitDesignation,
  isApitAffix,
  isNgitBySarvadhatukaApit,
  analyzeSarvadhatukaApitStatus,
  checkRootSpecificConditions,
  getSarvadhatukaApitExamples,
  SARVADHATUKA_AFFIXES,
  PIT_AFFIXES
} from './index.js';

describe('Sutra 1.2.4: सार्वधातुकमपित्', () => {
  describe('isSarvadhatukaAffix function', () => {
    describe('Devanagari sārvādhātuka affixes', () => {
      it('should identify present tense endings', () => {
        expect(isSarvadhatukaAffix('ति')).toBe(true);
        expect(isSarvadhatukaAffix('सि')).toBe(true);
        expect(isSarvadhatukaAffix('मि')).toBe(true);
        expect(isSarvadhatukaAffix('न्ति')).toBe(true);
        expect(isSarvadhatukaAffix('तः')).toBe(true);
        expect(isSarvadhatukaAffix('थ')).toBe(true);
      });

      it('should identify imperative endings', () => {
        expect(isSarvadhatukaAffix('तु')).toBe(true);
        expect(isSarvadhatukaAffix('हि')).toBe(true);
        expect(isSarvadhatukaAffix('आनि')).toBe(true);
        expect(isSarvadhatukaAffix('न्तु')).toBe(true);
        expect(isSarvadhatukaAffix('तम्')).toBe(true);
      });

      it('should identify potential/conditional endings', () => {
        expect(isSarvadhatukaAffix('एत्')).toBe(true);
        expect(isSarvadhatukaAffix('एः')).toBe(true);
        expect(isSarvadhatukaAffix('एयम्')).toBe(true);
        expect(isSarvadhatukaAffix('एयुः')).toBe(true);
      });

      it('should identify middle voice endings', () => {
        expect(isSarvadhatukaAffix('ते')).toBe(true);
        expect(isSarvadhatukaAffix('से')).toBe(true);
        expect(isSarvadhatukaAffix('ए')).toBe(true);
        expect(isSarvadhatukaAffix('न्ते')).toBe(true);
        expect(isSarvadhatukaAffix('महे')).toBe(true);
      });

      it('should reject non-sārvādhātuka affixes', () => {
        expect(isSarvadhatukaAffix('त')).toBe(false);
        expect(isSarvadhatukaAffix('तवत्')).toBe(false);
        expect(isSarvadhatukaAffix('इत')).toBe(false);
        expect(isSarvadhatukaAffix('क्त')).toBe(false);
        expect(isSarvadhatukaAffix('त्वा')).toBe(false);
      });
    });

    describe('IAST sārvādhātuka affixes', () => {
      it('should identify present tense endings', () => {
        expect(isSarvadhatukaAffix('ti')).toBe(true);
        expect(isSarvadhatukaAffix('si')).toBe(true);
        expect(isSarvadhatukaAffix('mi')).toBe(true);
        expect(isSarvadhatukaAffix('nti')).toBe(true);
        expect(isSarvadhatukaAffix('taḥ')).toBe(true);
        expect(isSarvadhatukaAffix('tha')).toBe(true);
      });

      it('should identify imperative endings', () => {
        expect(isSarvadhatukaAffix('tu')).toBe(true);
        expect(isSarvadhatukaAffix('hi')).toBe(true);
        expect(isSarvadhatukaAffix('āni')).toBe(true);
        expect(isSarvadhatukaAffix('ntu')).toBe(true);
        expect(isSarvadhatukaAffix('tam')).toBe(true);
      });

      it('should identify potential endings', () => {
        expect(isSarvadhatukaAffix('et')).toBe(true);
        expect(isSarvadhatukaAffix('eḥ')).toBe(true);
        expect(isSarvadhatukaAffix('eyam')).toBe(true);
        expect(isSarvadhatukaAffix('eyuḥ')).toBe(true);
      });

      it('should reject non-sārvādhātuka IAST affixes', () => {
        expect(isSarvadhatukaAffix('ta')).toBe(false);
        expect(isSarvadhatukaAffix('tavat')).toBe(false);
        expect(isSarvadhatukaAffix('ita')).toBe(false);
        expect(isSarvadhatukaAffix('kta')).toBe(false);
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        expect(isSarvadhatukaAffix('')).toBe(false);
        expect(isSarvadhatukaAffix(null)).toBe(false);
        expect(isSarvadhatukaAffix(undefined)).toBe(false);
        expect(isSarvadhatukaAffix(123)).toBe(false);
        expect(isSarvadhatukaAffix([])).toBe(false);
      });

      it('should handle whitespace', () => {
        expect(isSarvadhatukaAffix(' ति ')).toBe(true);
        expect(isSarvadhatukaAffix('  mi  ')).toBe(true);
      });
    });
  });

  describe('hasPitDesignation function', () => {
    describe('Pit affixes identification', () => {
      it('should identify Devanagari pit affixes', () => {
        expect(hasPitDesignation('त')).toBe(true);
        expect(hasPitDesignation('तवत्')).toBe(true);
        expect(hasPitDesignation('न')).toBe(true);
        expect(hasPitDesignation('इन्')).toBe(true);
        expect(hasPitDesignation('वत्')).toBe(true);
        expect(hasPitDesignation('मतुप्')).toBe(true);
        expect(hasPitDesignation('शतृ')).toBe(true);
        expect(hasPitDesignation('शानच्')).toBe(true);
      });

      it('should identify IAST pit affixes', () => {
        expect(hasPitDesignation('ta')).toBe(true);
        expect(hasPitDesignation('tavat')).toBe(true);
        expect(hasPitDesignation('na')).toBe(true);
        expect(hasPitDesignation('in')).toBe(true);
        expect(hasPitDesignation('vat')).toBe(true);
        expect(hasPitDesignation('matup')).toBe(true);
        expect(hasPitDesignation('śatṛ')).toBe(true);
        expect(hasPitDesignation('śānac')).toBe(true);
      });

      it('should reject non-pit affixes', () => {
        expect(hasPitDesignation('ति')).toBe(false);
        expect(hasPitDesignation('सि')).toBe(false);
        expect(hasPitDesignation('मि')).toBe(false);
        expect(hasPitDesignation('तु')).toBe(false);
        expect(hasPitDesignation('हि')).toBe(false);
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        expect(hasPitDesignation('')).toBe(false);
        expect(hasPitDesignation(null)).toBe(false);
        expect(hasPitDesignation(undefined)).toBe(false);
        expect(hasPitDesignation(123)).toBe(false);
      });
    });
  });

  describe('isApitAffix function', () => {
    describe('Apit identification', () => {
      it('should identify apit affixes (not pit)', () => {
        expect(isApitAffix('ति')).toBe(true);
        expect(isApitAffix('सि')).toBe(true);
        expect(isApitAffix('मि')).toBe(true);
        expect(isApitAffix('तु')).toBe(true);
        expect(isApitAffix('हि')).toBe(true);
        expect(isApitAffix('न्ति')).toBe(true);
      });

      it('should reject pit affixes', () => {
        expect(isApitAffix('त')).toBe(false);
        expect(isApitAffix('तवत्')).toBe(false);
        expect(isApitAffix('न')).toBe(false);
        expect(isApitAffix('शतृ')).toBe(false);
      });

      it('should work with IAST script', () => {
        expect(isApitAffix('ti')).toBe(true);
        expect(isApitAffix('si')).toBe(true);
        expect(isApitAffix('mi')).toBe(true);
        expect(isApitAffix('ta')).toBe(false); // pit affix
        expect(isApitAffix('tavat')).toBe(false); // pit affix
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        expect(isApitAffix('')).toBe(false);
        expect(isApitAffix(null)).toBe(false);
        expect(isApitAffix(undefined)).toBe(false);
        expect(isApitAffix(123)).toBe(false);
      });

      it('should validate Sanskrit input', () => {
        expect(isApitAffix('xyz123')).toBe(false);
        expect(isApitAffix('abc')).toBe(false);
      });
    });
  });

  describe('isNgitBySarvadhatukaApit function', () => {
    describe('Positive cases - should be ṅit', () => {
      it('should make sārvādhātuka apit affixes ṅit', () => {
        expect(isNgitBySarvadhatukaApit('ति')).toBe(true);
        expect(isNgitBySarvadhatukaApit('सि')).toBe(true);
        expect(isNgitBySarvadhatukaApit('मि')).toBe(true);
        expect(isNgitBySarvadhatukaApit('न्ति')).toBe(true);
        expect(isNgitBySarvadhatukaApit('तु')).toBe(true);
        expect(isNgitBySarvadhatukaApit('हि')).toBe(true);
      });

      it('should work with IAST script', () => {
        expect(isNgitBySarvadhatukaApit('ti')).toBe(true);
        expect(isNgitBySarvadhatukaApit('si')).toBe(true);
        expect(isNgitBySarvadhatukaApit('mi')).toBe(true);
        expect(isNgitBySarvadhatukaApit('nti')).toBe(true);
        expect(isNgitBySarvadhatukaApit('tu')).toBe(true);
        expect(isNgitBySarvadhatukaApit('hi')).toBe(true);
      });

      it('should work with middle voice endings', () => {
        expect(isNgitBySarvadhatukaApit('ते')).toBe(true);
        expect(isNgitBySarvadhatukaApit('से')).toBe(true);
        expect(isNgitBySarvadhatukaApit('ए')).toBe(true);
        expect(isNgitBySarvadhatukaApit('te')).toBe(true);
        expect(isNgitBySarvadhatukaApit('se')).toBe(true);
        expect(isNgitBySarvadhatukaApit('e')).toBe(true);
      });

      it('should work with potential endings', () => {
        expect(isNgitBySarvadhatukaApit('एत्')).toBe(true);
        expect(isNgitBySarvadhatukaApit('एः')).toBe(true);
        expect(isNgitBySarvadhatukaApit('एयम्')).toBe(true);
        expect(isNgitBySarvadhatukaApit('et')).toBe(true);
        expect(isNgitBySarvadhatukaApit('eḥ')).toBe(true);
        expect(isNgitBySarvadhatukaApit('eyam')).toBe(true);
      });
    });

    describe('Negative cases - pit affixes', () => {
      it('should not apply to pit affixes', () => {
        expect(isNgitBySarvadhatukaApit('त')).toBe(false);
        expect(isNgitBySarvadhatukaApit('तवत्')).toBe(false);
        expect(isNgitBySarvadhatukaApit('न')).toBe(false);
        expect(isNgitBySarvadhatukaApit('शतृ')).toBe(false);
        expect(isNgitBySarvadhatukaApit('शानच्')).toBe(false);
      });

      it('should not apply to IAST pit affixes', () => {
        expect(isNgitBySarvadhatukaApit('ta')).toBe(false);
        expect(isNgitBySarvadhatukaApit('tavat')).toBe(false);
        expect(isNgitBySarvadhatukaApit('na')).toBe(false);
        expect(isNgitBySarvadhatukaApit('śatṛ')).toBe(false);
      });
    });

    describe('Negative cases - non-sārvādhātuka', () => {
      it('should not apply to non-sārvādhātuka affixes', () => {
        expect(isNgitBySarvadhatukaApit('इत')).toBe(false);
        expect(isNgitBySarvadhatukaApit('त्वा')).toBe(false);
        expect(isNgitBySarvadhatukaApit('य')).toBe(false);
        expect(isNgitBySarvadhatukaApit('अ')).toBe(false);
      });
    });

    describe('Error handling', () => {
      it('should handle invalid inputs', () => {
        expect(isNgitBySarvadhatukaApit('')).toBe(false);
        expect(isNgitBySarvadhatukaApit(null)).toBe(false);
        expect(isNgitBySarvadhatukaApit(undefined)).toBe(false);
        expect(isNgitBySarvadhatukaApit(123)).toBe(false);
      });

      it('should validate Sanskrit input', () => {
        expect(isNgitBySarvadhatukaApit('xyz123')).toBe(false);
        expect(isNgitBySarvadhatukaApit('invalid')).toBe(false);
      });
    });

    describe('Context parameter', () => {
      it('should accept optional context parameter', () => {
        const context = { mood: 'present', person: '3rd', number: 'singular' };
        expect(isNgitBySarvadhatukaApit('ति', context)).toBe(true);
        expect(isNgitBySarvadhatukaApit('त', context)).toBe(false);
      });
    });
  });

  describe('analyzeSarvadhatukaApitStatus function', () => {
    it('should analyze multiple affixes correctly', () => {
      const affixes = [
        'ति', 'सि', 'मि', // sārvādhātuka apit
        'त', 'तवत्', 'न', // pit affixes (not sārvādhātuka)
        'इत', 'त्वा', 'य' // non-sārvādhātuka
      ];

      const result = analyzeSarvadhatukaApitStatus(affixes);

      expect(result.total).toBe(9);
      expect(result.ngitCount).toBe(3); // ति, सि, मि
      expect(result.pitCount).toBe(0); // No sārvādhātuka pit affixes in this test
      expect(result.nonSarvadhatukaCount).toBe(6); // त, तवत्, न, इत, त्वा, य
      expect(result.invalidCount).toBe(0);
    });

    it('should handle empty array', () => {
      const result = analyzeSarvadhatukaApitStatus([]);
      expect(result.total).toBe(0);
      expect(result.ngitCount).toBe(0);
      expect(result.pitCount).toBe(0);
      expect(result.nonSarvadhatukaCount).toBe(0);
      expect(result.invalidCount).toBe(0);
    });

    it('should handle invalid affixes', () => {
      const affixes = [null, '', 123, 'ति', 'त'];
      const result = analyzeSarvadhatukaApitStatus(affixes);
      
      expect(result.total).toBe(5);
      expect(result.invalidCount).toBe(3); // null, '', 123
      expect(result.ngitCount).toBe(1); // ति
      expect(result.pitCount).toBe(0); // त is not sārvādhātuka
      expect(result.nonSarvadhatukaCount).toBe(1); // त
    });

    it('should provide detailed categorization', () => {
      const affixes = ['ति', 'त', 'इत'];
      const result = analyzeSarvadhatukaApitStatus(affixes);

      expect(result.ngitItems).toHaveLength(1);
      expect(result.ngitItems[0].affix).toBe('ति');
      expect(result.ngitItems[0].result).toBe('ṅit');

      expect(result.pitItems).toHaveLength(0); // त is not sārvādhātuka

      expect(result.nonSarvadhatukaItems).toHaveLength(2); // त and इत
      expect(result.nonSarvadhatukaItems[0].affix).toBe('त');
      expect(result.nonSarvadhatukaItems[1].affix).toBe('इत');
    });

    it('should throw error for non-array input', () => {
      expect(() => analyzeSarvadhatukaApitStatus('not array')).toThrow();
      expect(() => analyzeSarvadhatukaApitStatus(null)).toThrow();
      expect(() => analyzeSarvadhatukaApitStatus(123)).toThrow();
    });
  });

  describe('checkRootSpecificConditions function', () => {
    it('should indicate no special conditions for general roots', () => {
      const result = checkRootSpecificConditions('भू', 'ति');
      expect(result.hasSpecialCondition).toBe(false);
      expect(result.condition).toBe('General rule applies to all roots');
      expect(result.applies).toBe(true); // ति is sārvādhātuka apit
    });

    it('should work with different root-affix combinations', () => {
      const result1 = checkRootSpecificConditions('कृ', 'सि');
      expect(result1.applies).toBe(true); // सि is sārvādhātuka apit

      const result2 = checkRootSpecificConditions('गम्', 'त');
      expect(result2.applies).toBe(false); // त is pit
    });

    it('should handle invalid inputs', () => {
      const result = checkRootSpecificConditions('', 'ति');
      expect(result.hasSpecialCondition).toBe(false);
      expect(result.condition).toBe('Invalid Sanskrit input');
      expect(result.applies).toBe(false);
    });

    it('should validate Sanskrit inputs', () => {
      const result = checkRootSpecificConditions('xyz123', 'ति');
      expect(result.condition).toBe('Invalid Sanskrit input');
      expect(result.applies).toBe(false);
    });
  });

  describe('getSarvadhatukaApitExamples function', () => {
    it('should provide comprehensive examples', () => {
      const examples = getSarvadhatukaApitExamples();

      expect(examples).toHaveProperty('sutraText');
      expect(examples.sutraText.devanagari).toBe('सार्वधातुकमपित्');
      expect(examples.sutraText.iast).toBe('sārvādhātukam apit');

      expect(examples).toHaveProperty('technicalDefinitions');
      expect(examples.technicalDefinitions).toHaveProperty('sarvadhatuka');
      expect(examples.technicalDefinitions).toHaveProperty('apit');
      expect(examples.technicalDefinitions).toHaveProperty('ngit_result');

      expect(examples).toHaveProperty('positiveExamples');
      expect(examples.positiveExamples).toBeInstanceOf(Array);
      expect(examples.positiveExamples.length).toBeGreaterThan(0);

      expect(examples).toHaveProperty('negativeExamples');
      expect(examples.negativeExamples).toBeInstanceOf(Array);

      expect(examples).toHaveProperty('relatedSutras');
      expect(examples.relatedSutras).toBeInstanceOf(Array);
    });

    it('should include correct technical definitions', () => {
      const examples = getSarvadhatukaApitExamples();
      
      expect(examples.technicalDefinitions.sarvadhatuka.definition).toContain('Primary verbal affixes');
      expect(examples.technicalDefinitions.apit.definition).toContain('Not having प्');
      expect(examples.technicalDefinitions.ngit_result.designation).toContain('ङित्');
    });

    it('should provide valid positive examples', () => {
      const examples = getSarvadhatukaApitExamples();
      
      examples.positiveExamples.forEach(example => {
        expect(example).toHaveProperty('affix');
        expect(example).toHaveProperty('type');
        expect(example).toHaveProperty('classification');
        expect(example).toHaveProperty('result');
        expect(example.result).toBe('ṅit');
        expect(example.classification).toContain('apit');
      });
    });
  });

  describe('Constants validation', () => {
    it('should have valid sārvādhātuka affixes', () => {
      expect(SARVADHATUKA_AFFIXES).toHaveProperty('devanagari');
      expect(SARVADHATUKA_AFFIXES).toHaveProperty('iast');
      expect(SARVADHATUKA_AFFIXES.devanagari).toBeInstanceOf(Array);
      expect(SARVADHATUKA_AFFIXES.iast).toBeInstanceOf(Array);
      expect(SARVADHATUKA_AFFIXES.devanagari.length).toBe(SARVADHATUKA_AFFIXES.iast.length);
    });

    it('should have valid pit affixes', () => {
      expect(PIT_AFFIXES).toHaveProperty('devanagari');
      expect(PIT_AFFIXES).toHaveProperty('iast');
      expect(PIT_AFFIXES.devanagari).toBeInstanceOf(Array);
      expect(PIT_AFFIXES.iast).toBeInstanceOf(Array);
      expect(PIT_AFFIXES.devanagari.length).toBe(PIT_AFFIXES.iast.length);
    });

    it('should have no overlap between sārvādhātuka and pit lists', () => {
      const sarvadhatukaSet = new Set([
        ...SARVADHATUKA_AFFIXES.devanagari,
        ...SARVADHATUKA_AFFIXES.iast
      ]);
      const pitSet = new Set([
        ...PIT_AFFIXES.devanagari,
        ...PIT_AFFIXES.iast
      ]);

      const intersection = [...sarvadhatukaSet].filter(x => pitSet.has(x));
      expect(intersection).toHaveLength(0);
    });
  });

  describe('Integration tests', () => {
    it('should work consistently across all functions', () => {
      const affix = 'ति';

      expect(isSarvadhatukaAffix(affix)).toBe(true);
      expect(hasPitDesignation(affix)).toBe(false);
      expect(isApitAffix(affix)).toBe(true);
      expect(isNgitBySarvadhatukaApit(affix)).toBe(true);
    });

    it('should handle cross-script consistency', () => {
      const pairs = [
        ['ति', 'ti'],
        ['सि', 'si'],
        ['मि', 'mi'],
        ['तु', 'tu'],
        ['हि', 'hi']
      ];

      pairs.forEach(([dev, iast]) => {
        expect(isSarvadhatukaAffix(dev)).toBe(isSarvadhatukaAffix(iast));
        expect(isApitAffix(dev)).toBe(isApitAffix(iast));
        expect(isNgitBySarvadhatukaApit(dev)).toBe(isNgitBySarvadhatukaApit(iast));
      });
    });

    it('should maintain consistency with traditional grammar', () => {
      // Traditional examples of sārvādhātuka apit affixes
      const traditionalCases = [
        { affix: 'ति', expected: true, note: 'भवति - standard present 3rd singular' },
        { affix: 'सि', expected: true, note: 'भवसि - present 2nd singular' },
        { affix: 'मि', expected: true, note: 'भवामि - present 1st singular' },
        { affix: 'तु', expected: true, note: 'भवतु - imperative 3rd singular' },
        { affix: 'त', expected: false, note: 'भूत - past participle, pit affix' },
        { affix: 'इत', expected: false, note: 'गतित - not sārvādhātuka' }
      ];

      traditionalCases.forEach(({ affix, expected, note }) => {
        expect(isNgitBySarvadhatukaApit(affix)).toBe(expected);
      });
    });

    it('should correctly distinguish from specific ṅit rules', () => {
      // This is a general rule, unlike specific rules for certain roots
      expect(isNgitBySarvadhatukaApit('ति')).toBe(true);  // General rule
      expect(isNgitBySarvadhatukaApit('सि')).toBe(true);  // General rule
      expect(isNgitBySarvadhatukaApit('त')).toBe(false);  // pit affix, excluded
      expect(isNgitBySarvadhatukaApit('इत')).toBe(false); // Not sārvādhātuka
    });
  });
});
