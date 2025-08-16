import { hasInitialPalatalLingualItMarker, removeInitialPalatalLingualItMarker, isPalatalLingualItMarker } from './index.js';

describe('Sutra 1.3.7: चुटू (cuṭū)', () => {
  
  describe('Positive cases - Initial palatal/lingual consonants in pratyaya context', () => {
    const positiveTests = [
      // Palatal consonants
      { form: 'cas', consonant: 'c', class: 'palatal', expected: 'as', description: 'c in IAST' },
      { form: 'jas', consonant: 'j', class: 'palatal', expected: 'as', description: 'j in IAST' },
      { form: 'चस्', consonant: 'च', class: 'palatal', expected: 'स्', description: 'च in Devanagari' },
      { form: 'च्त्वा', consonant: 'च', class: 'palatal', expected: 'त्वा', description: 'च् in Devanagari with halanta' },
      
      // Lingual/retroflex consonants
      { form: 'ṭas', consonant: 'ṭ', class: 'lingual', expected: 'as', description: 'ṭ in IAST' },
      { form: 'ḍas', consonant: 'ḍ', class: 'lingual', expected: 'as', description: 'ḍ in IAST' },
      { form: 'टस्', consonant: 'ट', class: 'lingual', expected: 'स्', description: 'ट in Devanagari' },
      { form: 'ट्यति', consonant: 'ट', class: 'lingual', expected: 'यति', description: 'ट् in Devanagari with halanta' }
    ];

    positiveTests.forEach(({ form, consonant, class: consonantClass, expected, description }) => {
      test(`"${form}" should have initial ${consonantClass} it-marker ${consonant} (${description})`, () => {
        const result = hasInitialPalatalLingualItMarker(form, { isPratyaya: true });
        expect(result.hasItMarker).toBe(true);
        expect(result.itConsonant).toBe(consonant);
        expect(result.consonantClass).toBe(consonantClass);
        expect(result.processedForm).toBe(expected);
        expect(result.reason).toBe('initial-palatal-lingual-it-marker');
      });
    });
  });

  describe('Negative cases - No palatal/lingual consonants or non-pratyaya context', () => {
    const negativeTests = [
      { form: 'kas', description: 'k (guttural) not palatal/lingual' },
      { form: 'pas', description: 'p (labial) not palatal/lingual' },
      { form: 'सस्', description: 'स (dental) not palatal/lingual' },
      { form: 'as', description: 'vowel initial' }
    ];

    negativeTests.forEach(({ form, description }) => {
      test(`"${form}" should not have palatal/lingual it-marker (${description})`, () => {
        const result = hasInitialPalatalLingualItMarker(form, { isPratyaya: true });
        expect(result.hasItMarker).toBe(false);
        expect(result.reason).toBe('no-initial-palatal-lingual');
      });
    });
  });

  describe('Context requirements', () => {
    test('should require pratyaya context for it-marker recognition', () => {
      const result = hasInitialPalatalLingualItMarker('cas', { isPratyaya: false });
      expect(result.hasItMarker).toBe(false);
      expect(result.reason).toBe('not-pratyaya-context');
      expect(result.itConsonant).toBe('c'); // consonant found but not applied
    });

    test('should recognize pratyaya through elementType', () => {
      const result = hasInitialPalatalLingualItMarker('ṭas', { elementType: 'affix' });
      expect(result.hasItMarker).toBe(true);
      expect(result.reason).toBe('initial-palatal-lingual-it-marker');
    });
  });

  describe('Consonant classification', () => {
    test('should correctly classify palatal consonants', () => {
      const palatals = ['c', 'ch', 'j', 'jh', 'ñ'];
      palatals.forEach(consonant => {
        const result = isPalatalLingualItMarker(consonant, 'IAST');
        expect(result.isItMarker).toBe(true);
        expect(result.class).toBe('palatal');
      });
    });

    test('should correctly classify lingual consonants', () => {
      const linguals = ['ṭ', 'ṭh', 'ḍ', 'ḍh', 'ṇ'];
      linguals.forEach(consonant => {
        const result = isPalatalLingualItMarker(consonant, 'IAST');
        expect(result.isItMarker).toBe(true);
        expect(result.class).toBe('lingual');
      });
    });

    test('should reject non-palatal/lingual consonants', () => {
      const others = ['k', 'g', 'p', 'b', 't', 'd', 's'];
      others.forEach(consonant => {
        const result = isPalatalLingualItMarker(consonant, 'IAST');
        expect(result.isItMarker).toBe(false);
        expect(result.class).toBe(null);
      });
    });
  });

  describe('Helper functions', () => {
    test('removeInitialPalatalLingualItMarker should work correctly', () => {
      expect(removeInitialPalatalLingualItMarker('cas', { isPratyaya: true })).toBe('as');
      expect(removeInitialPalatalLingualItMarker('ṭas', { isPratyaya: true })).toBe('as');
      expect(removeInitialPalatalLingualItMarker('kas', { isPratyaya: true })).toBe('kas');
    });
  });

  describe('Return structure validation', () => {
    test('should return proper structure for valid it-marker', () => {
      const result = hasInitialPalatalLingualItMarker('cas', { isPratyaya: true });
      
      expect(result).toHaveProperty('hasItMarker', true);
      expect(result).toHaveProperty('itConsonant', 'c');
      expect(result).toHaveProperty('consonantClass', 'palatal');
      expect(result).toHaveProperty('script', 'IAST');
      expect(result).toHaveProperty('reason', 'initial-palatal-lingual-it-marker');
      expect(result).toHaveProperty('processedForm', 'as');
    });

    test('should handle invalid input', () => {
      const result = hasInitialPalatalLingualItMarker('');
      
      expect(result).toHaveProperty('hasItMarker', false);
      expect(result).toHaveProperty('reason', 'empty-input');
    });
  });
});
