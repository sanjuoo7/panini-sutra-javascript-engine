import sutra from './index.js';

describe('Sutra 1.4.62: anukaraṇaṃ cānitiparama', () => {
  const verbContext = { verb: 'kṛ', following_word: 'kṛtvā' };

  // Test cases for positive onomatopoeic words
  const onomatopoeicWords = [
    { iast: 'khaṭat', devanagari: 'खटत्' },
    { iast: 'paṭat', devanagari: 'पटत्' },
    { iast: 'maramat', devanagari: 'मरमत्' },
    { iast: 'jhaṭiti', devanagari: 'झटिति' },
    { iast: 'dravat', devanagari: 'द्रवत्' },
    { iast: 'calat', devanagari: 'चलत्' },
    { iast: 'sphuṭat', devanagari: 'स्फुटत्' },
    { iast: 'hasat', devanagari: 'हसत्' },
    { iast: 'gacchat', devanagari: 'गच्छत्' },
    { iast: 'tadat', devanagari: 'तदत्' },
    { iast: 'vadan', devanagari: 'वदन्' },
    { iast: 'patan', devanagari: 'पतन्' },
    { iast: 'kūjat', devanagari: 'कूजत्' },
    { iast: 'bhramat', devanagari: 'भ्रमत्' },
    { iast: 'nadat', devanagari: 'नदत्' },
  ];

  onomatopoeicWords.forEach(word => {
    test(`should identify '${word.iast}' as gati (IAST)`, () => {
      const result = sutra(word.iast, verbContext);
      expect(result.applies).toBe(true);
      expect(result.word).toBe(word.iast);
      expect(result.term).toBe('gati');
      expect(result.sutra).toBe('1.4.62');
      expect(result.category).toBe('onomatopoeic');
      expect(result.morphological.category).toBe('sound_symbolic');
      expect(result.semantic.type).toBe('onomatopoeic_adverb');
      expect(result.onomatopoeicAnalysis.isOnomatopoeic).toBe(true);
      expect(result.contextValidation.notFollowedByIti).toBe(true);
    });

    test(`should identify '${word.devanagari}' as gati (Devanagari)`, () => {
      const result = sutra(word.devanagari, verbContext);
      expect(result.applies).toBe(true);
      expect(result.word).toBe(word.devanagari);
      expect(result.term).toBe('gati');
      expect(result.sutra).toBe('1.4.62');
      expect(result.category).toBe('onomatopoeic');
      expect(result.morphological.category).toBe('sound_symbolic');
      expect(result.semantic.type).toBe('onomatopoeic_adverb');
      expect(result.onomatopoeicAnalysis.isOnomatopoeic).toBe(true);
      expect(result.contextValidation.notFollowedByIti).toBe(true);
    });
  });

  // Negative test cases
  test('should not apply when followed by "iti" (IAST)', () => {
    const result = sutra('khaṭat', { verb: 'kṛ', following_word: 'iti' });
    expect(result.applies).toBe(false);
    expect(result.sutra).toBe('1.4.62');
    expect(result.reason).toBe('blocked_by_iti');
    expect(result.restrictionAnalysis.itiRestriction.blocked).toBe(true);
    expect(result.onomatopoeicAnalysis.isOnomatopoeic).toBe(true);
  });

  test('should not apply when followed by "इति" (Devanagari)', () => {
    const result = sutra('खटत्', { verb: 'kṛ', following_word: 'इति' });
    expect(result.applies).toBe(false);
    expect(result.sutra).toBe('1.4.62');
    expect(result.reason).toBe('blocked_by_iti');
    expect(result.restrictionAnalysis.itiRestriction.blocked).toBe(true);
    expect(result.onomatopoeicAnalysis.isOnomatopoeic).toBe(true);
  });

  test('should not apply without verb context', () => {
    const result = sutra('khaṭat', { following_word: 'kṛtvā' });
    expect(result.applies).toBe(false);
    expect(result.sutra).toBe('1.4.62');
    expect(result.error.type).toBe('missing_verb');
    expect(result.contextValidation.verbRequired).toBe(true);
    expect(result.contextValidation.verbProvided).toBe(false);
  });

  test('should not apply to a non-onomatopoeic word', () => {
    const result = sutra('vṛkṣa', verbContext);
    expect(result.applies).toBe(false);
    expect(result.sutra).toBe('1.4.62');
    expect(result.reason).toBe('not_onomatopoeic');
    expect(result.onomatopoeicAnalysis.isOnomatopoeic).toBe(false);
  });

  test('should not apply when "iti" is part of the next word', () => {
    const result = sutra('khaṭat', { verb: 'kṛ', following_word: 'itihāsa' });
    expect(result.applies).toBe(true);
    expect(result.word).toBe('khaṭat');
    expect(result.term).toBe('gati');
    expect(result.contextValidation.notFollowedByIti).toBe(true);
  });

  test('should handle "Iti" with different casing', () => {
    const result = sutra('khaṭat', { verb: 'kṛ', following_word: 'Iti' });
    expect(result.applies).toBe(false);
    expect(result.sutra).toBe('1.4.62');
    expect(result.reason).toBe('blocked_by_iti');
    expect(result.restrictionAnalysis.itiRestriction.blocked).toBe(true);
  });

  test('should handle "iti" with surrounding whitespace', () => {
    const result = sutra('khaṭat', { verb: 'kṛ', following_word: ' iti ' });
    expect(result.applies).toBe(false);
    expect(result.sutra).toBe('1.4.62');
    expect(result.reason).toBe('blocked_by_iti');
    expect(result.restrictionAnalysis.itiRestriction.blocked).toBe(true);
  });

  test('should not apply if context is missing following_word', () => {
    const result = sutra('khaṭat', { verb: 'kṛ' });
    expect(result.applies).toBe(true);
    expect(result.word).toBe('khaṭat');
    expect(result.term).toBe('gati');
    expect(result.contextValidation.notFollowedByIti).toBe(true);
  });

  test('should not apply if context has following_word as null', () => {
    const result = sutra('khaṭat', { verb: 'kṛ', following_word: null });
    expect(result.applies).toBe(true);
    expect(result.word).toBe('khaṭat');
    expect(result.term).toBe('gati');
    expect(result.contextValidation.notFollowedByIti).toBe(true);
  });

  test('should not apply to a non-onomatopoeic word like "catura"', () => {
    const result = sutra('catura', verbContext);
    expect(result.applies).toBe(false);
    expect(result.sutra).toBe('1.4.62');
    expect(result.reason).toBe('not_onomatopoeic');
    expect(result.onomatopoeicAnalysis.isOnomatopoeic).toBe(false);
  });

  // Edge cases
  test('should handle empty string input', () => {
    const result = sutra('', verbContext);
    expect(result.applies).toBe(false);
    expect(result.sutra).toBe('1.4.62');
    expect(result.error.type).toBe('invalid_word');
    expect(result.contextValidation.inputValid).toBe(false);
  });

  test('should handle null input', () => {
    const result = sutra(null, verbContext);
    expect(result.applies).toBe(false);
    expect(result.sutra).toBe('1.4.62');
    expect(result.error.type).toBe('invalid_word');
    expect(result.contextValidation.inputValid).toBe(false);
  });

  test('should handle undefined input', () => {
    const result = sutra(undefined, verbContext);
    expect(result.applies).toBe(false);
    expect(result.sutra).toBe('1.4.62');
    expect(result.error.type).toBe('invalid_word');
    expect(result.contextValidation.inputValid).toBe(false);
  });

  test('should handle non-string input', () => {
    const result = sutra(456, verbContext);
    expect(result.applies).toBe(false);
    expect(result.sutra).toBe('1.4.62');
    expect(result.error.type).toBe('invalid_word');
    expect(result.contextValidation.inputValid).toBe(false);
  });

  test('should handle null context', () => {
    const result = sutra('khaṭat', null);
    expect(result.applies).toBe(false);
    expect(result.sutra).toBe('1.4.62');
    expect(result.error.type).toBe('missing_context');
    expect(result.contextValidation.contextRequired).toBe(true);
    expect(result.contextValidation.contextProvided).toBe(false);
  });

  test('should handle empty context', () => {
    const result = sutra('khaṭat', {});
    expect(result.applies).toBe(false);
    expect(result.sutra).toBe('1.4.62');
    expect(result.error.type).toBe('missing_verb');
    expect(result.contextValidation.verbRequired).toBe(true);
    expect(result.contextValidation.verbProvided).toBe(false);
  });

  test('should handle context with undefined following_word', () => {
    const result = sutra('khaṭat', { verb: 'kṛ', following_word: undefined });
    expect(result.applies).toBe(true);
    expect(result.word).toBe('khaṭat');
    expect(result.term).toBe('gati');
    expect(result.contextValidation.notFollowedByIti).toBe(true);
  });

  test('should not apply if the word is "iti" itself', () => {
    const result = sutra('iti', verbContext);
    expect(result.applies).toBe(false);
    expect(result.sutra).toBe('1.4.62');
    expect(result.reason).toBe('word_is_iti');
    expect(result.contextValidation.wordNotIti).toBe(false);
  });

  test('should not apply if the word is "इति" itself', () => {
    const result = sutra('इति', verbContext);
    expect(result.applies).toBe(false);
    expect(result.sutra).toBe('1.4.62');
    expect(result.reason).toBe('word_is_iti');
    expect(result.contextValidation.wordNotIti).toBe(false);
  });

  test('should handle a very long onomatopoeic-like string', () => {
    const longSound = 'paṭapaṭapaṭapaṭapaṭat';
    const result = sutra(longSound, verbContext);
    expect(result.applies).toBe(true);
    expect(result.word).toBe(longSound);
    expect(result.term).toBe('gati');
    expect(result.onomatopoeicAnalysis.isOnomatopoeic).toBe(true);
  });

  // Detailed Analysis Tests
  describe('Detailed Onomatopoeic Analysis', () => {
    test('should provide comprehensive onomatopoeic analysis for direct list words', () => {
      const result = sutra('khaṭat', verbContext);
      expect(result.onomatopoeicAnalysis).toHaveProperty('detectionMethod', 'lexical_list');
      expect(result.onomatopoeicAnalysis).toHaveProperty('soundType', 'impact');
      expect(result.onomatopoeicAnalysis).toHaveProperty('confidence');
      expect(result.onomatopoeicAnalysis.confidence).toBeGreaterThan(0.8);
      expect(result.semantic.soundMeaning).toBe('knocking_sound');
    });

    test('should provide morphological analysis for onomatopoeic words', () => {
      const result = sutra('paṭat', verbContext);
      expect(result.morphological).toHaveProperty('category', 'sound_symbolic');
      expect(result.morphological).toHaveProperty('invariant', true);
      expect(result.morphological.soundSymbolism).toHaveProperty('iconicity');
      expect(result.morphological.features).toContain('gati_designation');
      expect(result.morphological.features).toContain('onomatopoeic');
    });

    test('should analyze reduplication in onomatopoeic words', () => {
      const result = sutra('paṭapaṭapaṭapaṭapaṭat', verbContext);
      expect(result.onomatopoeicAnalysis.patterns).toContain('reduplication');
      expect(result.morphological.soundSymbolism.reduplication).toBe(true);
      expect(result.morphological.derivation.type).toBe('reduplicative');
    });

    test('should provide semantic classification for sound types', () => {
      const result = sutra('hasat', verbContext);
      expect(result.semantic).toHaveProperty('function', 'sound_imitation');
      expect(result.semantic).toHaveProperty('type', 'onomatopoeic_adverb');
      expect(result.semantic).toHaveProperty('pragmaticRole', 'experiential_marker');
      expect(result.onomatopoeicAnalysis.soundType).toBe('voice');
    });

    test('should provide restriction analysis for iti blocking', () => {
      const result = sutra('dravat', verbContext);
      expect(result.restrictionAnalysis.itiRestriction).toHaveProperty('applies', true);
      expect(result.restrictionAnalysis.itiRestriction).toHaveProperty('blocked', false);
      expect(result.restrictionAnalysis.itiRestriction.reason).toContain('गति designation allowed');
    });

    test('should provide integration properties for गति framework', () => {
      const result = sutra('calat', verbContext);
      expect(result.integration).toHaveProperty('extendsGati', true);
      expect(result.integration).toHaveProperty('gatiType', 'onomatopoeic');
      expect(result.integration).toHaveProperty('specialRestriction', 'iti_blocking');
      expect(result.integration.compatibleVerbs).toBe('any');
    });

    test('should provide phonetic analysis of onomatopoeic properties', () => {
      const result = sutra('khaṭat', verbContext);
      expect(result.onomatopoeicAnalysis.phoneticsProperties).toHaveProperty('hasRetroflexes', true);
      expect(result.onomatopoeicAnalysis.phoneticsProperties).toHaveProperty('hasPlosives', true);
      expect(result.onomatopoeicAnalysis.phoneticsProperties).toHaveProperty('vowelPattern');
      expect(result.onomatopoeicAnalysis.patterns).toContain('retroflex_ending');
    });

    test('should provide confidence scoring with breakdown', () => {
      const result = sutra('sphuṭat', verbContext);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.processingNotes.confidence_breakdown).toHaveProperty('onomatopoeic_detection');
      expect(result.processingNotes.confidence_breakdown).toHaveProperty('context_validation');
      expect(result.processingNotes.confidence_breakdown).toHaveProperty('iti_restriction_check');
    });

    test('should identify alternative detection methods', () => {
      const result = sutra('jhaṭiti', verbContext);
      if (result.processingNotes.alternativeAnalyses.length > 0) {
        expect(result.processingNotes.alternativeAnalyses[0]).toHaveProperty('type');
        expect(result.processingNotes.alternativeAnalyses[0]).toHaveProperty('note');
      }
    });
  });
});
