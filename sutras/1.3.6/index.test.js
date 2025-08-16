import { hasInitialShaItMarker, removeInitialShaItMarker, isShaItMarker } from './index.js';

describe('Sutra 1.3.6: षः प्रत्ययस्य (ṣaḥ pratyayasya)', () => {
  
  describe('Positive cases - Initial ष्/ṣ in pratyaya context (it-marker applies)', () => {
    const positiveTests = [
      { form: 'ṣas', expected: 'as', description: 'ṣ in IAST pratyaya' },
      { form: 'ṣtvā', expected: 'tvā', description: 'ṣ in IAST gerund affix' },
      { form: 'ṣyati', expected: 'yati', description: 'ṣ in IAST future affix' },
      { form: 'षस्', expected: 'स्', description: 'ष in Devanagari pratyaya' },
      { form: 'ष्त्वा', expected: 'त्वा', description: 'ष in Devanagari gerund affix' },
      { form: 'ष्यति', expected: 'यति', description: 'ष in Devanagari future affix' }
    ];

    positiveTests.forEach(({ form, expected, description }) => {
      test(`"${form}" should have initial ष्/ṣ it-marker (${description})`, () => {
        const result = hasInitialShaItMarker(form, { isPratyaya: true });
        expect(result.hasItMarker).toBe(true);
        expect(result.itConsonant).toBe(form.charAt(0));
        expect(result.processedForm).toBe(expected);
        expect(result.reason).toBe('initial-sha-it-marker');
      });
    });
  });

  describe('Negative cases - No initial ष्/ṣ or non-pratyaya context', () => {
    const negativeTests = [
      { form: 'as', description: 'IAST affix without initial ष्/ṣ' },
      { form: 'tvā', description: 'IAST gerund without initial ष्/ṣ' },
      { form: 'yati', description: 'IAST future without initial ष्/ṣ' },
      { form: 'स्', description: 'Devanagari affix without initial ष्/ṣ' },
      { form: 'त्वा', description: 'Devanagari gerund without initial ष्/ṣ' },
      { form: 'sas', description: 'regular स्/s, not retroflex ष्/ṣ' },
      { form: 'साध्', description: 'regular स/sa, not retroflex ष/ṣa' }
    ];

    negativeTests.forEach(({ form, description }) => {
      test(`"${form}" should not have initial ष्/ṣ it-marker (${description})`, () => {
        const result = hasInitialShaItMarker(form, { isPratyaya: true });
        expect(result.hasItMarker).toBe(false);
        expect(result.itConsonant).toBe(null);
        expect(result.reason).toBe('no-initial-sha');
      });
    });
  });

  describe('Pratyaya context requirements', () => {
    test('should require pratyaya context for it-marker recognition', () => {
      const result = hasInitialShaItMarker('ṣas', { isPratyaya: false });
      expect(result.hasItMarker).toBe(false);
      expect(result.reason).toBe('not-pratyaya-context');
      expect(result.itConsonant).toBe('ṣ'); // consonant found but not applied
    });

    test('should recognize pratyaya context through elementType', () => {
      const elementTypes = ['pratyaya', 'affix', 'suffix'];
      
      elementTypes.forEach(elementType => {
        const result = hasInitialShaItMarker('ṣtvā', { elementType });
        expect(result.hasItMarker).toBe(true);
        expect(result.reason).toBe('initial-sha-it-marker');
        expect(result.elementType).toBe(elementType);
      });
    });

    test('should recognize grammatical instruction context', () => {
      const result = hasInitialShaItMarker('ष्यति', { isGrammaticalInstruction: true });
      expect(result.hasItMarker).toBe(true);
      expect(result.reason).toBe('initial-sha-it-marker');
    });

    test('should not apply in non-pratyaya context', () => {
      const result = hasInitialShaItMarker('ṣas', { elementType: 'dhatu' });
      expect(result.hasItMarker).toBe(false);
      expect(result.reason).toBe('not-pratyaya-context');
    });
  });

  describe('Script-specific tests', () => {
    describe('IAST ṣ handling', () => {
      test('should identify ṣ in IAST', () => {
        const result = hasInitialShaItMarker('ṣṇa', { isPratyaya: true });
        expect(result.hasItMarker).toBe(true);
        expect(result.itConsonant).toBe('ṣ');
        expect(result.script).toBe('IAST');
        expect(result.processedForm).toBe('ṇa');
      });

      test('should distinguish ṣ from regular s', () => {
        const resultSha = hasInitialShaItMarker('ṣas', { isPratyaya: true });
        const resultSa = hasInitialShaItMarker('sas', { isPratyaya: true });
        
        expect(resultSha.hasItMarker).toBe(true);
        expect(resultSa.hasItMarker).toBe(false);
      });
    });

    describe('Devanagari ष् handling', () => {
      test('should identify ष् in Devanagari', () => {
        const result = hasInitialShaItMarker('षण', { isPratyaya: true });
        expect(result.hasItMarker).toBe(true);
        expect(result.itConsonant).toBe('ष');
        expect(result.script).toBe('Devanagari');
        expect(result.processedForm).toBe('ण');
      });

      test('should distinguish ष् from regular स्', () => {
        const resultSha = hasInitialShaItMarker('षस्', { isPratyaya: true });
        const resultSa = hasInitialShaItMarker('सस्', { isPratyaya: true });
        
        expect(resultSha.hasItMarker).toBe(true);
        expect(resultSa.hasItMarker).toBe(false);
      });
    });
  });

  describe('Helper function: removeInitialShaItMarker', () => {
    test('should remove ष्/ṣ it-marker in pratyaya context', () => {
      expect(removeInitialShaItMarker('ṣas', { isPratyaya: true })).toBe('as');
      expect(removeInitialShaItMarker('ष्त्वा', { elementType: 'affix' })).toBe('त्वा');
      expect(removeInitialShaItMarker('ṣyati', { isGrammaticalInstruction: true })).toBe('yati');
    });

    test('should not remove ष्/ṣ outside pratyaya context', () => {
      expect(removeInitialShaItMarker('ṣas', { isPratyaya: false })).toBe('ṣas');
      expect(removeInitialShaItMarker('ष्त्वा', { elementType: 'dhatu' })).toBe('ष्त्वा');
    });

    test('should handle forms without initial ष्/ṣ', () => {
      expect(removeInitialShaItMarker('as', { isPratyaya: true })).toBe('as');
      expect(removeInitialShaItMarker('त्वा', { isPratyaya: true })).toBe('त्वा');
    });
  });

  describe('Helper function: isShaItMarker', () => {
    test('should identify IAST ṣ', () => {
      expect(isShaItMarker('ṣ', 'IAST')).toBe(true);
      expect(isShaItMarker('s', 'IAST')).toBe(false);
      expect(isShaItMarker('ś', 'IAST')).toBe(false);
    });

    test('should identify Devanagari ष', () => {
      expect(isShaItMarker('ष', 'Devanagari')).toBe(true);
      expect(isShaItMarker('स', 'Devanagari')).toBe(false);
      expect(isShaItMarker('श', 'Devanagari')).toBe(false);
    });

    test('should default to IAST script', () => {
      expect(isShaItMarker('ṣ')).toBe(true);
      expect(isShaItMarker('s')).toBe(false);
    });
  });

  describe('Return structure validation', () => {
    test('should return proper structure for valid ष्/ṣ it-marker', () => {
      const result = hasInitialShaItMarker('ṣas', { isPratyaya: true });
      
      expect(result).toHaveProperty('hasItMarker', true);
      expect(result).toHaveProperty('itConsonant', 'ṣ');
      expect(result).toHaveProperty('script', 'IAST');
      expect(result).toHaveProperty('reason', 'initial-sha-it-marker');
      expect(result).toHaveProperty('processedForm', 'as');
      expect(result).toHaveProperty('elementType', null);
    });

    test('should return proper structure for non-it-marker case', () => {
      const result = hasInitialShaItMarker('as', { isPratyaya: true });
      
      expect(result).toHaveProperty('hasItMarker', false);
      expect(result).toHaveProperty('itConsonant', null);
      expect(result).toHaveProperty('script', 'IAST');
      expect(result).toHaveProperty('reason', 'no-initial-sha');
      expect(result).toHaveProperty('processedForm', null);
      expect(result).toHaveProperty('elementType', null);
    });

    test('should handle invalid input', () => {
      const result = hasInitialShaItMarker('');
      
      expect(result).toHaveProperty('hasItMarker', false);
      expect(result).toHaveProperty('itConsonant', null);
      expect(result).toHaveProperty('script', null);
      expect(result).toHaveProperty('reason', 'empty-input');
      expect(result).toHaveProperty('processedForm', null);
      expect(result).toHaveProperty('elementType', null);
    });
  });

  describe('Element type specification', () => {
    const pratyayaTypes = ['pratyaya', 'affix', 'suffix'];
    
    pratyayaTypes.forEach(elementType => {
      test(`should recognize ${elementType} as pratyaya context`, () => {
        const result = hasInitialShaItMarker('ष्यति', { elementType });
        expect(result.hasItMarker).toBe(true);
        expect(result.elementType).toBe(elementType);
      });
    });

    test('should not recognize non-pratyaya element types', () => {
      const nonPratyayaTypes = ['dhatu', 'pada', 'vibhakti'];
      
      nonPratyayaTypes.forEach(elementType => {
        const result = hasInitialShaItMarker('ष्यति', { elementType });
        expect(result.hasItMarker).toBe(false);
        expect(result.reason).toBe('not-pratyaya-context');
      });
    });
  });

  describe('Integration considerations', () => {
    test('should work with other it-marker sutra results', () => {
      // Testing that this sutra can be used in combination with others
      const pratyayas = ['ṣas', 'ष्त्वा', 'ṣyati'];
      
      pratyayas.forEach(form => {
        const result = hasInitialShaItMarker(form, { isPratyaya: true });
        expect(result.hasItMarker).toBe(true);
        expect(result.processedForm).toBeDefined();
        expect(result.processedForm).not.toBe(form);
      });
    });

    test('should not interfere with other consonants', () => {
      const nonShaConsonants = ['kas', 'gas', 'nas', 'tas', 'das'];
      
      nonShaConsonants.forEach(form => {
        const result = hasInitialShaItMarker(form, { isPratyaya: true });
        expect(result.hasItMarker).toBe(false);
        expect(result.reason).toBe('no-initial-sha');
      });
    });

    test('should handle mixed script scenarios', () => {
      // Test both scripts work independently
      const iastResult = hasInitialShaItMarker('ṣas', { isPratyaya: true });
      const devResult = hasInitialShaItMarker('षस्', { isPratyaya: true });
      
      expect(iastResult.hasItMarker).toBe(true);
      expect(devResult.hasItMarker).toBe(true);
      expect(iastResult.script).toBe('IAST');
      expect(devResult.script).toBe('Devanagari');
    });
  });
});
