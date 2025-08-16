import { isVibhaktiException } from './index.js';

describe('Sutra 1.3.4: न विभक्तौ तुस्माः (na vibhaktau tusmāḥ)', () => {
  
  describe('Positive cases - TUSMĀḤ consonants in vibhakti context (exception applies)', () => {
    const tusmaaVibhaktiCases = [
      { word: 'devais', expected: true, reason: 'स् in instrumental plural' },
      { word: 'devāt', expected: true, reason: 'त् in ablative singular' },
      { word: 'grāmam', expected: true, reason: 'म् in accusative singular' },
      { word: 'देवैस्', expected: true, reason: 'स् in Devanagari instrumental' },
      { word: 'ग्रामम्', expected: true, reason: 'म् in Devanagari accusative' },
      { word: 'गुरुभिस्', expected: true, reason: 'स् in instrumental plural' }
    ];

    tusmaaVibhaktiCases.forEach(({ word, expected, reason }) => {
      test(`"${word}" should have exception apply (${reason})`, () => {
        const result = isVibhaktiException(word, { isVibhakti: true });
        expect(result.isException).toBe(expected);
        expect(result.exceptionApplies).toBe(true);
        expect(result.reason).toBe('vibhakti-tusmaa-exception');
        expect(result.finalConsonant).toBeTruthy();
      });
    });
  });

  describe('Negative cases - Non-TUSMĀḤ consonants or non-vibhakti context', () => {
    const negativeCases = [
      { word: 'devak', expected: false, reason: 'क् not in TUSMĀḤ' },
      { word: 'गज्', expected: false, reason: 'ज् not in TUSMĀḤ' },
      { word: 'labh', expected: false, reason: 'ह् not in TUSMĀḤ' },
      { word: 'dhātu', expected: false, reason: 'vowel ending' },
      { word: 'गम्', expected: false, reason: 'म् but not vibhakti context' },
      { word: 'रामस्', expected: false, reason: 'स् but not vibhakti context' }
    ];

    negativeCases.forEach(({ word, expected, reason }) => {
      test(`"${word}" should not have exception apply (${reason})`, () => {
        const result = isVibhaktiException(word);
        expect(result.isException).toBe(expected);
        expect(result.exceptionApplies).toBe(false);
      });
    });
  });

  describe('Affix type specification', () => {
    test('should recognize vibhakti affix type', () => {
      const result = isVibhaktiException('devais', { affixType: 'vibhakti' });
      expect(result.isException).toBe(true);
      expect(result.exceptionApplies).toBe(true);
      expect(result.reason).toBe('vibhakti-tusmaa-exception');
    });

    test('should not apply exception for non-vibhakti affix types', () => {
      const result = isVibhaktiException('devais', { affixType: 'pratyaya' });
      expect(result.isException).toBe(false);
      expect(result.exceptionApplies).toBe(false);
    });
  });

  describe('Dental consonant analysis', () => {
    const dentalCases = [
      { word: 'rāmat', consonant: 't', type: 'dental' },
      { word: 'devāt', consonant: 't', type: 'dental' },
      { word: 'गुरुन्', consonant: 'न', type: 'dental' },
      { word: 'कन्याद्', consonant: 'द', type: 'dental' }
    ];

    dentalCases.forEach(({ word, consonant, type }) => {
      test(`"${word}" should identify dental consonant "${consonant}"`, () => {
        const result = isVibhaktiException(word, { isVibhakti: true });
        expect(result.finalConsonant).toBe(consonant);
        expect(result.consonantType).toBe(type);
        expect(result.isException).toBe(true);
      });
    });
  });

  describe('स् and म् specific cases', () => {
    test('should handle स् in vibhakti context', () => {
      const result = isVibhaktiException('devais', { isVibhakti: true });
      expect(result.isException).toBe(true);
      expect(result.finalConsonant).toBe('s');
      expect(result.consonantType).toBe('sibilant');
    });

    test('should handle म् in vibhakti context', () => {
      const result = isVibhaktiException('grāmam', { isVibhakti: true });
      expect(result.isException).toBe(true);
      expect(result.finalConsonant).toBe('m');
      expect(result.consonantType).toBe('labial');
    });

    test('should handle Devanagari स्', () => {
      const result = isVibhaktiException('देवैस्', { isVibhakti: true });
      expect(result.isException).toBe(true);
      expect(result.finalConsonant).toBe('स');
      expect(result.consonantType).toBe('sibilant');
    });
  });

  describe('Common vibhakti pattern detection', () => {
    const vibhaktiEndings = [
      'guruṇā', 'devebhis', 'rāmāya', 'guroḥ', 'devīnām',
      'गुरुणा', 'देवेभिस्', 'रामाय', 'गुरोः', 'देवीनाम्'
    ];

    vibhaktiEndings.forEach(word => {
      test(`"${word}" should be detected as potential vibhakti ending`, () => {
        const result = isVibhaktiException(word);
        // Test the internal pattern detection even without explicit vibhakti flag
        expect(result).toHaveProperty('script');
        expect(result).toHaveProperty('finalConsonant');
      });
    });
  });

  describe('Return structure validation', () => {
    test('should return proper structure for valid TUSMĀḤ vibhakti', () => {
      const result = isVibhaktiException('devais', { isVibhakti: true });
      
      expect(result).toHaveProperty('isException', true);
      expect(result).toHaveProperty('finalConsonant', 's');
      expect(result).toHaveProperty('script', 'IAST');
      expect(result).toHaveProperty('reason', 'vibhakti-tusmaa-exception');
      expect(result).toHaveProperty('consonantType', 'sibilant');
      expect(result).toHaveProperty('exceptionApplies', true);
    });

    test('should return proper structure for non-exception case', () => {
      const result = isVibhaktiException('gam');
      
      expect(result).toHaveProperty('isException', false);
      expect(result).toHaveProperty('finalConsonant', 'm');
      expect(result).toHaveProperty('script', 'IAST');
      expect(result).toHaveProperty('reason', 'not-vibhakti-context');
      expect(result).toHaveProperty('consonantType', 'labial');
      expect(result).toHaveProperty('exceptionApplies', false);
    });

    test('should handle invalid input', () => {
      const result = isVibhaktiException('');
      
      expect(result).toHaveProperty('isException', false);
      expect(result).toHaveProperty('finalConsonant', null);
      expect(result).toHaveProperty('reason', 'empty-input');
      expect(result).toHaveProperty('exceptionApplies', false);
    });
  });

  describe('Integration with Sutra 1.3.3', () => {
    test('should complement final consonant it-marker rule', () => {
      // These would normally be it-markers by 1.3.3, but 1.3.4 creates exception
      const exceptions = ['devais', 'grāmam', 'devāt'];
      
      exceptions.forEach(word => {
        const result = isVibhaktiException(word, { isVibhakti: true });
        expect(result.isException).toBe(true);
        expect(result.reason).toBe('vibhakti-tusmaa-exception');
      });
    });

    test('should not interfere with non-TUSMĀḤ consonants', () => {
      // These are still subject to 1.3.3 even in vibhakti
      const nonTusmaa = ['devak', 'rāmaj', 'guruṇ'];
      
      nonTusmaa.forEach(word => {
        const result = isVibhaktiException(word, { isVibhakti: true });
        expect(result.isException).toBe(false);
        expect(result.reason).toBe('not-tusmaa-consonant');
      });
    });
  });
});
