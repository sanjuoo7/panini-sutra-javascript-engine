import sutra from './index.js';

describe('Sutra 1.4.61: ūrayādicaviḍācaśaca', () => {
  const verbContext = { verb: 'kṛ' };

  // Test cases for the 'ūri' list
  const uriListWords = [
    { iast: 'ūrī', devanagari: 'ऊरी' },
    { iast: 'ūrari', devanagari: 'ऊररी' },
    { iast: 'āviḥ', devanagari: 'आविः' },
    { iast: 'sākṣāt', devanagari: 'साक्षात्' },
    { iast: 'prādus', devanagari: 'प्रादुस्' },
    { iast: 'śrad', devanagari: 'श्रद्' },
    { iast: 'alam', devanagari: 'अलम्' },
    { iast: 'vaṣaṭ', devanagari: 'वषट्' },
    { iast: 'śrauṣaṭ', devanagari: 'श्रौषट्' },
    { iast: 'svāhā', devanagari: 'स्वाहा' },
  ];

  uriListWords.forEach(word => {
    test(`should identify '${word.iast}' from ūri list as gati (IAST)`, () => {
      const result = sutra(word.iast, verbContext);
      expect(result.applies).toBe(true);
      expect(result.word).toBe(word.iast);
      expect(result.term).toBe('gati');
      expect(result.sutra).toBe('1.4.61');
      expect(result.category).toBe('ūrī-list');
      expect(result.morphological.category).toBe('invariant_particle');
      expect(result.semantic.type).toBe('discourse_particle');
      expect(result.categoryAnalysis.uriList.applies).toBe(true);
    });

    test(`should identify '${word.devanagari}' from ūri list as gati (Devanagari)`, () => {
      const result = sutra(word.devanagari, verbContext);
      expect(result.applies).toBe(true);
      expect(result.word).toBe(word.devanagari);
      expect(result.term).toBe('gati');
      expect(result.sutra).toBe('1.4.61');
      expect(result.category).toBe('ūrī-list');
      expect(result.morphological.category).toBe('invariant_particle');
      expect(result.semantic.type).toBe('discourse_particle');
      expect(result.categoryAnalysis.uriList.applies).toBe(true);
    });
  });

  // Test cases for the 'cvi' suffix
  const cviSuffixWords = [
    { iast: 'śuklī', devanagari: 'शुक्ली' },
    { iast: 'kṛṣṇī', devanagari: 'कृष्णी' },
    { iast: 'aruṇī', devanagari: 'अरुणी' },
    { iast: 'haritī', devanagari: 'हरिती' },
    { iast: 'nīlī', devanagari: 'नीली' },
  ];

  cviSuffixWords.forEach(word => {
    test(`should identify '${word.iast}' with cvi suffix as gati (IAST)`, () => {
      const result = sutra(word.iast, verbContext);
      expect(result.applies).toBe(true);
      expect(result.word).toBe(word.iast);
      expect(result.term).toBe('gati');
      expect(result.sutra).toBe('1.4.61');
      expect(result.category).toBe('cvi-suffix');
      expect(result.morphological.category).toBe('derived_adjective');
      expect(result.semantic.type).toBe('quality_adjective');
      expect(result.categoryAnalysis.cviSuffix.applies).toBe(true);
      expect(result.morphological.derivation.suffixType).toBe('cvi');
    });

    test(`should identify '${word.devanagari}' with cvi suffix as gati (Devanagari)`, () => {
      const result = sutra(word.devanagari, verbContext);
      expect(result.applies).toBe(true);
      expect(result.word).toBe(word.devanagari);
      expect(result.term).toBe('gati');
      expect(result.sutra).toBe('1.4.61');
      expect(result.category).toBe('cvi-suffix');
      expect(result.morphological.category).toBe('derived_adjective');
      expect(result.semantic.type).toBe('quality_adjective');
      expect(result.categoryAnalysis.cviSuffix.applies).toBe(true);
      expect(result.morphological.derivation.suffixType).toBe('cvi');
    });
  });

  // Test cases for the 'ḍāc' suffix
  const dacSuffixWords = [
    { iast: 'paṭapaṭā', devanagari: 'पटपटा' },
    { iast: 'ghaṭaghaṭā', devanagari: 'घटघटा' },
    { iast: 'calacalā', devanagari: 'चलचला' },
    { iast: 'dhagadhagā', devanagari: 'धगधगा' },
    { iast: 'phaṭaphaṭā', devanagari: 'फटफटा' },
  ];

  dacSuffixWords.forEach(word => {
    test(`should identify '${word.iast}' with ḍāc suffix as gati (IAST)`, () => {
      const result = sutra(word.iast, verbContext);
      expect(result.applies).toBe(true);
      expect(result.word).toBe(word.iast);
      expect(result.term).toBe('gati');
      expect(result.sutra).toBe('1.4.61');
      expect(result.category).toBe('ḍāc-suffix');
      expect(result.morphological.category).toBe('derived_iterative');
      expect(result.semantic.type).toBe('manner_adverb');
      expect(result.categoryAnalysis.dacSuffix.applies).toBe(true);
      expect(result.morphological.derivation.suffixType).toBe('ḍāc');
    });

    test(`should identify '${word.devanagari}' with ḍāc suffix as gati (Devanagari)`, () => {
      const result = sutra(word.devanagari, verbContext);
      expect(result.applies).toBe(true);
      expect(result.word).toBe(word.devanagari);
      expect(result.term).toBe('gati');
      expect(result.sutra).toBe('1.4.61');
      expect(result.category).toBe('ḍāc-suffix');
      expect(result.morphological.category).toBe('derived_iterative');
      expect(result.semantic.type).toBe('manner_adverb');
      expect(result.categoryAnalysis.dacSuffix.applies).toBe(true);
      expect(result.morphological.derivation.suffixType).toBe('ḍāc');
    });
  });

  // Negative test cases
  test('should not apply to a word not in any category', () => {
    const result = sutra('gaja', verbContext);
    expect(result.applies).toBe(false);
    expect(result.sutra).toBe('1.4.61');
    expect(result.reason).toBe('not_gati_eligible');
    expect(result.categoryAnalysis.uriList.applies).toBe(false);
    expect(result.categoryAnalysis.cviSuffix.applies).toBe(false);
    expect(result.categoryAnalysis.dacSuffix.applies).toBe(false);
  });

  test('should not apply to a word from ūri list without verb context', () => {
    const result = sutra('ūrī');
    expect(result.applies).toBe(false);
    expect(result.sutra).toBe('1.4.61');
    expect(result.error.type).toBe('missing_verb');
    expect(result.contextValidation.verbRequired).toBe(true);
    expect(result.contextValidation.verbProvided).toBe(false);
  });

  test('should not apply to a word with cvi suffix without verb context', () => {
    const result = sutra('śuklī');
    expect(result.applies).toBe(false);
    expect(result.sutra).toBe('1.4.61');
    expect(result.error.type).toBe('missing_verb');
    expect(result.contextValidation.verbRequired).toBe(true);
    expect(result.contextValidation.verbProvided).toBe(false);
  });

  test('should not apply to a word with ḍāc suffix without verb context', () => {
    const result = sutra('paṭapaṭā');
    expect(result.applies).toBe(false);
    expect(result.sutra).toBe('1.4.61');
    expect(result.error.type).toBe('missing_verb');
    expect(result.contextValidation.verbRequired).toBe(true);
    expect(result.contextValidation.verbProvided).toBe(false);
  });

  test('should not apply to a word that looks similar but is not in the lists', () => {
    const result = sutra('sākṣa', verbContext);
    expect(result.applies).toBe(false);
    expect(result.sutra).toBe('1.4.61');
    expect(result.reason).toBe('not_gati_eligible');
    expect(result.categoryAnalysis.uriList.applies).toBe(false);
  });

  // Edge case test cases
  test('should handle empty string input', () => {
    const result = sutra('', verbContext);
    expect(result.applies).toBe(false);
    expect(result.sutra).toBe('1.4.61');
    expect(result.error.type).toBe('invalid_word');
    expect(result.contextValidation.inputValid).toBe(false);
  });

  test('should handle null input', () => {
    const result = sutra(null, verbContext);
    expect(result.applies).toBe(false);
    expect(result.sutra).toBe('1.4.61');
    expect(result.error.type).toBe('invalid_word');
    expect(result.contextValidation.inputValid).toBe(false);
  });

  test('should handle undefined input', () => {
    const result = sutra(undefined, verbContext);
    expect(result.applies).toBe(false);
    expect(result.sutra).toBe('1.4.61');
    expect(result.error.type).toBe('invalid_word');
    expect(result.contextValidation.inputValid).toBe(false);
  });

  test('should handle non-string input', () => {
    const result = sutra(123, verbContext);
    expect(result.applies).toBe(false);
    expect(result.sutra).toBe('1.4.61');
    expect(result.error.type).toBe('invalid_word');
    expect(result.contextValidation.inputValid).toBe(false);
  });

  test('should handle context with null verb', () => {
    const result = sutra('ūrī', { verb: null });
    expect(result.applies).toBe(false);
    expect(result.sutra).toBe('1.4.61');
    expect(result.error.type).toBe('missing_verb');
    expect(result.contextValidation.verbRequired).toBe(true);
    expect(result.contextValidation.verbProvided).toBe(false);
  });

  // Detailed Analysis Tests
  describe('Detailed Analysis Properties', () => {
    test('should provide comprehensive morphological analysis for ūrī words', () => {
      const result = sutra('ūrī', verbContext);
      expect(result.morphological).toHaveProperty('category', 'invariant_particle');
      expect(result.morphological).toHaveProperty('invariant', true);
      expect(result.morphological).toHaveProperty('features');
      expect(result.morphological.features).toContain('gati_designation');
      expect(result.morphological.features).toContain('invariant');
    });

    test('should provide comprehensive semantic analysis for color terms', () => {
      const result = sutra('śuklī', verbContext);
      expect(result.semantic).toHaveProperty('function', 'quality_expression');
      expect(result.semantic).toHaveProperty('type', 'quality_adjective');
      expect(result.semantic).toHaveProperty('pragmaticRole', 'descriptive_modifier');
      expect(result.categoryAnalysis.cviSuffix.isColorTerm).toBe(true);
    });

    test('should provide comprehensive analysis for onomatopoeic words', () => {
      const result = sutra('dhagadhagā', verbContext);
      expect(result.semantic).toHaveProperty('function', 'manner_expression');
      expect(result.semantic).toHaveProperty('subcategory', 'onomatopoeia');
      expect(result.categoryAnalysis.dacSuffix.isOnomatopoeic).toBe(true);
      expect(result.morphological.derivation.process).toBe('iterative_formation');
    });

    test('should provide integration properties for गति framework', () => {
      const result = sutra('alam', verbContext);
      expect(result.integration).toHaveProperty('extendsGati', true);
      expect(result.integration).toHaveProperty('gatiType', 'extended');
      expect(result.integration).toHaveProperty('compatibleVerbs');
      expect(result.integration.compatibleVerbs).toContain('भू');
      expect(result.integration.compatibleVerbs).toContain('कृ');
      expect(result.integration.compatibleVerbs).toContain('अस्');
    });

    test('should provide syntactic properties', () => {
      const result = sutra('prādus', verbContext);
      expect(result.syntactic).toHaveProperty('role', 'pre_verbal_modifier');
      expect(result.syntactic).toHaveProperty('accentuation', 'anudātta');
      expect(result.syntactic).toHaveProperty('dependencies');
      expect(result.syntactic.dependencies).toContain('verb_required');
    });

    test('should provide context validation details', () => {
      const result = sutra('svāhā', verbContext);
      expect(result.contextValidation).toHaveProperty('verbRequired', true);
      expect(result.contextValidation).toHaveProperty('verbCompatible', true);
      expect(result.contextValidation).toHaveProperty('sufficientContext', true);
    });

    test('should provide confidence scoring', () => {
      const result = sutra('āviḥ', verbContext);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.processingNotes.confidence_breakdown).toHaveProperty('category_match');
      expect(result.processingNotes.confidence_breakdown).toHaveProperty('context_validation');
    });
  });
});
