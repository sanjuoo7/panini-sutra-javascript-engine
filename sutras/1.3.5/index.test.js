import { hasInitialItMarkers, removeInitialItMarkers, isInitialItSequence } from './index.js';

describe('Sutra 1.3.5: आदिर्ञिटुडवः (ādirañiṭuḍavaḥ)', () => {
  
  describe('Positive cases - Initial ञि, टु, डु sequences (it-markers apply)', () => {
    const positiveTests = [
      { form: 'ñikṛ', sequence: 'ñi', expected: 'kṛ', description: 'ञि in IAST root' },
      { form: 'ṭukāra', sequence: 'ṭu', expected: 'kāra', description: 'टु in IAST affix' },
      { form: 'ḍupāka', sequence: 'ḍu', expected: 'pāka', description: 'डु in IAST suffix' },
      { form: 'ञिकृ', sequence: 'ञि', expected: 'कृ', description: 'ञि in Devanagari root' },
      { form: 'टुकार', sequence: 'टु', expected: 'कार', description: 'टु in Devanagari affix' },
      { form: 'डुपाक', sequence: 'डु', expected: 'पाक', description: 'डु in Devanagari suffix' }
    ];

    positiveTests.forEach(({ form, sequence, expected, description }) => {
      test(`"${form}" should have initial it-marker ${sequence} (${description})`, () => {
        const result = hasInitialItMarkers(form, { isGrammaticalInstruction: true });
        expect(result.hasItMarkers).toBe(true);
        expect(result.itSequences).toContain(sequence);
        expect(result.processedForm).toBe(expected);
        expect(result.reason).toBe('initial-it-sequence-found');
      });
    });
  });

  describe('Negative cases - No initial it-sequences or non-grammatical context', () => {
    const negativeTests = [
      { form: 'kṛ', description: 'IAST root without initial it-marker' },
      { form: 'gam', description: 'IAST root without initial it-marker' },
      { form: 'कृ', description: 'Devanagari root without initial it-marker' },
      { form: 'गम्', description: 'Devanagari root without initial it-marker' },
      { form: 'nikṛ', description: 'ni- prefix, not ñi it-marker' },
      { form: 'tukāra', description: 'tu- sequence, not ṭu it-marker' },
      { form: 'दुपाक', description: 'दु- sequence, not डु it-marker' }
    ];

    negativeTests.forEach(({ form, description }) => {
      test(`"${form}" should not have initial it-markers (${description})`, () => {
        const result = hasInitialItMarkers(form, { isGrammaticalInstruction: true });
        expect(result.hasItMarkers).toBe(false);
        expect(result.itSequences).toEqual([]);
        expect(result.reason).toBe('no-initial-it-sequence');
      });
    });
  });

  describe('Grammatical context requirements', () => {
    test('should require grammatical context for it-marker recognition', () => {
      const result = hasInitialItMarkers('ñikṛ', { isGrammaticalInstruction: false });
      expect(result.hasItMarkers).toBe(false);
      expect(result.reason).toBe('not-grammatical-context');
      expect(result.itSequences).toEqual(['ñi']); // sequence found but not applied
    });

    test('should recognize grammatical context through elementType', () => {
      const result = hasInitialItMarkers('ṭukāra', { elementType: 'affix' });
      expect(result.hasItMarkers).toBe(true);
      expect(result.reason).toBe('initial-it-sequence-found');
      expect(result.elementType).toBe('affix');
    });

    test('should not apply in non-grammatical elementType', () => {
      const result = hasInitialItMarkers('ñikṛ', { elementType: 'word' });
      expect(result.hasItMarkers).toBe(false);
      expect(result.reason).toBe('not-grammatical-context');
    });
  });

  describe('Specific sequence analysis', () => {
    describe('ञि (ñi) sequence tests', () => {
      test('should identify ञि in IAST', () => {
        const result = hasInitialItMarkers('ñiviś', { isGrammaticalInstruction: true });
        expect(result.hasItMarkers).toBe(true);
        expect(result.itSequences).toContain('ñi');
        expect(result.processedForm).toBe('viś');
      });

      test('should identify ञि in Devanagari', () => {
        const result = hasInitialItMarkers('ञिविश्', { isGrammaticalInstruction: true });
        expect(result.hasItMarkers).toBe(true);
        expect(result.itSequences).toContain('ञि');
        expect(result.processedForm).toBe('विश्');
      });
    });

    describe('टु (ṭu) sequence tests', () => {
      test('should identify ṭu in IAST', () => {
        const result = hasInitialItMarkers('ṭubhū', { isGrammaticalInstruction: true });
        expect(result.hasItMarkers).toBe(true);
        expect(result.itSequences).toContain('ṭu');
        expect(result.processedForm).toBe('bhū');
      });

      test('should identify टु in Devanagari', () => {
        const result = hasInitialItMarkers('टुभू', { isGrammaticalInstruction: true });
        expect(result.hasItMarkers).toBe(true);
        expect(result.itSequences).toContain('टु');
        expect(result.processedForm).toBe('भू');
      });
    });

    describe('डु (ḍu) sequence tests', () => {
      test('should identify ḍu in IAST', () => {
        const result = hasInitialItMarkers('ḍukṛ', { isGrammaticalInstruction: true });
        expect(result.hasItMarkers).toBe(true);
        expect(result.itSequences).toContain('ḍu');
        expect(result.processedForm).toBe('kṛ');
      });

      test('should identify डु in Devanagari', () => {
        const result = hasInitialItMarkers('डुकृ', { isGrammaticalInstruction: true });
        expect(result.hasItMarkers).toBe(true);
        expect(result.itSequences).toContain('डु');
        expect(result.processedForm).toBe('कृ');
      });
    });
  });

  describe('Helper function: removeInitialItMarkers', () => {
    test('should remove it-markers in grammatical context', () => {
      expect(removeInitialItMarkers('ñikṛ', { isGrammaticalInstruction: true })).toBe('kṛ');
      expect(removeInitialItMarkers('ṭubhū', { elementType: 'dhatu' })).toBe('bhū');
      expect(removeInitialItMarkers('ḍupac', { elementType: 'affix' })).toBe('pac');
    });

    test('should not remove sequences outside grammatical context', () => {
      expect(removeInitialItMarkers('ñikṛ', { isGrammaticalInstruction: false })).toBe('ñikṛ');
      expect(removeInitialItMarkers('ṭubhū', { elementType: 'word' })).toBe('ṭubhū');
    });

    test('should handle forms without it-markers', () => {
      expect(removeInitialItMarkers('gam', { isGrammaticalInstruction: true })).toBe('gam');
      expect(removeInitialItMarkers('कृ', { isGrammaticalInstruction: true })).toBe('कृ');
    });
  });

  describe('Helper function: isInitialItSequence', () => {
    test('should identify IAST it-sequences', () => {
      expect(isInitialItSequence('ñi', 'IAST')).toBe(true);
      expect(isInitialItSequence('ṭu', 'IAST')).toBe(true);
      expect(isInitialItSequence('ḍu', 'IAST')).toBe(true);
      expect(isInitialItSequence('ni', 'IAST')).toBe(false);
      expect(isInitialItSequence('tu', 'IAST')).toBe(false);
    });

    test('should identify Devanagari it-sequences', () => {
      expect(isInitialItSequence('ञि', 'Devanagari')).toBe(true);
      expect(isInitialItSequence('टु', 'Devanagari')).toBe(true);
      expect(isInitialItSequence('डु', 'Devanagari')).toBe(true);
      expect(isInitialItSequence('नि', 'Devanagari')).toBe(false);
      expect(isInitialItSequence('तु', 'Devanagari')).toBe(false);
    });
  });

  describe('Return structure validation', () => {
    test('should return proper structure for valid initial it-marker', () => {
      const result = hasInitialItMarkers('ñikṛ', { isGrammaticalInstruction: true });
      
      expect(result).toHaveProperty('hasItMarkers', true);
      expect(result).toHaveProperty('itSequences', ['ñi']);
      expect(result).toHaveProperty('script', 'IAST');
      expect(result).toHaveProperty('reason', 'initial-it-sequence-found');
      expect(result).toHaveProperty('processedForm', 'kṛ');
      expect(result).toHaveProperty('elementType', null);
    });

    test('should return proper structure for non-it-marker case', () => {
      const result = hasInitialItMarkers('gam', { isGrammaticalInstruction: true });
      
      expect(result).toHaveProperty('hasItMarkers', false);
      expect(result).toHaveProperty('itSequences', []);
      expect(result).toHaveProperty('script', 'IAST');
      expect(result).toHaveProperty('reason', 'no-initial-it-sequence');
      expect(result).toHaveProperty('processedForm', null);
      expect(result).toHaveProperty('elementType', null);
    });

    test('should handle invalid input', () => {
      const result = hasInitialItMarkers('');
      
      expect(result).toHaveProperty('hasItMarkers', false);
      expect(result).toHaveProperty('itSequences', []);
      expect(result).toHaveProperty('script', null);
      expect(result).toHaveProperty('reason', 'empty-input');
      expect(result).toHaveProperty('processedForm', null);
      expect(result).toHaveProperty('elementType', null);
    });
  });

  describe('Element type specification', () => {
    const elementTypes = ['affix', 'pratyaya', 'dhatu', 'suffix'];
    
    elementTypes.forEach(elementType => {
      test(`should recognize ${elementType} as grammatical context`, () => {
        const result = hasInitialItMarkers('ṭubhū', { elementType });
        expect(result.hasItMarkers).toBe(true);
        expect(result.elementType).toBe(elementType);
      });
    });

    test('should not recognize non-grammatical element types', () => {
      const result = hasInitialItMarkers('ṭubhū', { elementType: 'pada' });
      expect(result.hasItMarkers).toBe(false);
      expect(result.reason).toBe('not-grammatical-context');
    });
  });

  describe('Integration considerations', () => {
    test('should work with other sutra results', () => {
      // Testing that this sutra can be used in combination with others
      const forms = ['ñikṛ', 'ṭubhū', 'ḍugam'];
      
      forms.forEach(form => {
        const result = hasInitialItMarkers(form, { isGrammaticalInstruction: true });
        expect(result.hasItMarkers).toBe(true);
        expect(result.processedForm).toBeDefined();
        expect(result.processedForm).not.toBe(form);
      });
    });

    test('should not interfere with non-initial sequences', () => {
      const result = hasInitialItMarkers('gaṭu', { isGrammaticalInstruction: true });
      expect(result.hasItMarkers).toBe(false);
      expect(result.reason).toBe('no-initial-it-sequence');
    });
  });
});
