import { hasInitialLaShakuItMarker, removeInitialLaShakuItMarker, isLaShakuItMarker } from './index.js';

describe('Sutra 1.3.8: लशक्वतद्धिते (laśakvataddhite)', () => {
  
  describe('Positive cases - Initial ल्/श्/gutturals in non-taddhita pratyaya context', () => {
    const positiveTests = [
      // ल् consonant
      { form: 'las', consonant: 'l', class: 'la', expected: 'as', description: 'ल् in IAST' },
      { form: 'लस्', consonant: 'ल', class: 'la', expected: 'स्', description: 'ल in Devanagari' },
      
      // श् consonant
      { form: 'śas', consonant: 'ś', class: 'sha', expected: 'as', description: 'श् in IAST' },
      { form: 'शस्', consonant: 'श', class: 'sha', expected: 'स्', description: 'श in Devanagari' },
      
      // Guttural consonants
      { form: 'kas', consonant: 'k', class: 'guttural', expected: 'as', description: 'क् in IAST' },
      { form: 'gas', consonant: 'g', class: 'guttural', expected: 'as', description: 'ग् in IAST' },
      { form: 'कस्', consonant: 'क', class: 'guttural', expected: 'स्', description: 'क in Devanagari' },
      { form: 'क्यति', consonant: 'क', class: 'guttural', expected: 'यति', description: 'क् with halanta' }
    ];

    positiveTests.forEach(({ form, consonant, class: consonantClass, expected, description }) => {
      test(`"${form}" should have initial ${consonantClass} it-marker ${consonant} (${description})`, () => {
        const result = hasInitialLaShakuItMarker(form, { isPratyaya: true, isTaddhita: false });
        expect(result.hasItMarker).toBe(true);
        expect(result.itConsonant).toBe(consonant);
        expect(result.consonantClass).toBe(consonantClass);
        expect(result.processedForm).toBe(expected);
        expect(result.reason).toBe('initial-la-shaku-it-marker');
      });
    });
  });

  describe('Negative cases - Taddhita exception', () => {
    test('should not apply it-marker rules to taddhita affixes', () => {
      const taddhitaTests = ['las', 'śas', 'kas', 'गस्'];
      
      taddhitaTests.forEach(form => {
        const result = hasInitialLaShakuItMarker(form, { isPratyaya: true, isTaddhita: true });
        expect(result.hasItMarker).toBe(false);
        expect(result.reason).toBe('taddhita-exception');
        expect(result.isTaddhita).toBe(true);
      });
    });
  });

  describe('Negative cases - Non-applicable consonants', () => {
    const negativeTests = [
      { form: 'cas', description: 'च (palatal) not in ल/श/guttural set' },
      { form: 'ṭas', description: 'ट (lingual) not in ल/श/guttural set' },
      { form: 'pas', description: 'प (labial) not in ल/श/guttural set' },
      { form: 'सस्', description: 'स (dental) not in ल/श/guttural set' }
    ];

    negativeTests.forEach(({ form, description }) => {
      test(`"${form}" should not have ल/श/guttural it-marker (${description})`, () => {
        const result = hasInitialLaShakuItMarker(form, { isPratyaya: true, isTaddhita: false });
        expect(result.hasItMarker).toBe(false);
        expect(result.reason).toBe('no-initial-la-shaku');
      });
    });
  });

  describe('Context requirements', () => {
    test('should require pratyaya context for it-marker recognition', () => {
      const result = hasInitialLaShakuItMarker('las', { isPratyaya: false, isTaddhita: false });
      expect(result.hasItMarker).toBe(false);
      expect(result.reason).toBe('not-pratyaya-context');
      expect(result.itConsonant).toBe('l'); // consonant found but not applied
    });

    test('should recognize pratyaya through elementType', () => {
      const result = hasInitialLaShakuItMarker('śas', { elementType: 'affix', isTaddhita: false });
      expect(result.hasItMarker).toBe(true);
      expect(result.reason).toBe('initial-la-shaku-it-marker');
    });
  });

  describe('Consonant classification', () => {
    test('should correctly classify ल् consonant', () => {
      const result = isLaShakuItMarker('l', 'IAST');
      expect(result.isItMarker).toBe(true);
      expect(result.class).toBe('la');
    });

    test('should correctly classify श् consonant', () => {
      const result = isLaShakuItMarker('ś', 'IAST');
      expect(result.isItMarker).toBe(true);
      expect(result.class).toBe('sha');
    });

    test('should correctly classify guttural consonants', () => {
      const gutturals = ['k', 'kh', 'g', 'gh', 'ṅ'];
      gutturals.forEach(consonant => {
        const result = isLaShakuItMarker(consonant, 'IAST');
        expect(result.isItMarker).toBe(true);
        expect(result.class).toBe('guttural');
      });
    });

    test('should reject non-ल/श/guttural consonants', () => {
      const others = ['c', 'j', 'ṭ', 'ḍ', 'p', 'b', 't', 'd', 's'];
      others.forEach(consonant => {
        const result = isLaShakuItMarker(consonant, 'IAST');
        expect(result.isItMarker).toBe(false);
        expect(result.class).toBe(null);
      });
    });
  });

  describe('Helper functions', () => {
    test('removeInitialLaShakuItMarker should work correctly', () => {
      expect(removeInitialLaShakuItMarker('las', { isPratyaya: true, isTaddhita: false })).toBe('as');
      expect(removeInitialLaShakuItMarker('śas', { isPratyaya: true, isTaddhita: false })).toBe('as');
      expect(removeInitialLaShakuItMarker('kas', { isPratyaya: true, isTaddhita: false })).toBe('as');
      
      // Should not remove in taddhita context
      expect(removeInitialLaShakuItMarker('las', { isPratyaya: true, isTaddhita: true })).toBe('las');
    });
  });

  describe('Return structure validation', () => {
    test('should return proper structure for valid it-marker', () => {
      const result = hasInitialLaShakuItMarker('las', { isPratyaya: true, isTaddhita: false });
      
      expect(result).toHaveProperty('hasItMarker', true);
      expect(result).toHaveProperty('itConsonant', 'l');
      expect(result).toHaveProperty('consonantClass', 'la');
      expect(result).toHaveProperty('script', 'IAST');
      expect(result).toHaveProperty('reason', 'initial-la-shaku-it-marker');
      expect(result).toHaveProperty('processedForm', 'as');
      expect(result).toHaveProperty('isTaddhita', false);
    });

    test('should return proper structure for taddhita exception', () => {
      const result = hasInitialLaShakuItMarker('las', { isPratyaya: true, isTaddhita: true });
      
      expect(result).toHaveProperty('hasItMarker', false);
      expect(result).toHaveProperty('reason', 'taddhita-exception');
      expect(result).toHaveProperty('isTaddhita', true);
    });

    test('should handle invalid input', () => {
      const result = hasInitialLaShakuItMarker('');
      
      expect(result).toHaveProperty('hasItMarker', false);
      expect(result).toHaveProperty('reason', 'empty-input');
    });
  });

  describe('Integration with taddhita system', () => {
    test('should integrate properly with taddhita identification', () => {
      const affixes = ['las', 'kas', 'śas'];
      
      affixes.forEach(affix => {
        // Regular affix - should apply
        const regularResult = hasInitialLaShakuItMarker(affix, { isPratyaya: true, isTaddhita: false });
        expect(regularResult.hasItMarker).toBe(true);
        
        // Taddhita affix - should not apply
        const taddhitaResult = hasInitialLaShakuItMarker(affix, { isPratyaya: true, isTaddhita: true });
        expect(taddhitaResult.hasItMarker).toBe(false);
        expect(taddhitaResult.reason).toBe('taddhita-exception');
      });
    });
  });
});
