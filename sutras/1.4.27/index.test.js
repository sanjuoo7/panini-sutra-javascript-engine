import sutra1427, { identifyPreventionAblative } from './index.js';

describe('Sutra 1.4.27: वारणार्थानामीप्सितः', () => {
  describe('Positive Cases: Prevention/Protection contexts requiring अपादान', () => {
    const positiveCases = [
      // IAST cases with prevention verbs
      {
        word: 'coreḥ',
        context: { verb: 'rakṣati', action_type: 'protection' },
        description: 'should identify ablative for threat source with rakṣati'
      },
      {
        word: 'śatruṇaḥ',
        context: { verb: 'vārayati', action_type: 'prevention' },
        description: 'should identify ablative for enemy with vārayati'
      },
      {
        word: 'agnibhyaḥ',
        context: { verb: 'trāyate', action_type: 'protection' },
        description: 'should identify ablative for fire with trāyate'
      },
      {
        word: 'vyādhātaḥ',
        context: { verb: 'nivārayati', action_type: 'prevention' },
        description: 'should identify ablative for disease with nivārayati'
      },
      {
        word: 'duṣṭasmāt',
        context: { verb: 'gopāyati', action_type: 'protection' },
        description: 'should identify ablative for wicked person with gopāyati'
      },

      // Devanagari cases with prevention verbs
      {
        word: 'चोरेः',
        context: { verb: 'रक्षति', action_type: 'protection' },
        description: 'should identify ablative for thief in Devanagari with रक्षति'
      },
      {
        word: 'शत्रुणः',
        context: { verb: 'वारयति', action_type: 'prevention' },
        description: 'should identify ablative for enemy in Devanagari with वारयति'
      },
      {
        word: 'अग्निभ्यः',
        context: { verb: 'त्रायते', action_type: 'protection' },
        description: 'should identify ablative for fire in Devanagari with त्रायते'
      },
      {
        word: 'व्याधातः',
        context: { verb: 'निवारयति', action_type: 'prevention' },
        description: 'should identify ablative for disease in Devanagari with निवारयति'
      },
      {
        word: 'दुष्टस्मात्',
        context: { verb: 'गोपायति', action_type: 'protection' },
        description: 'should identify ablative for wicked person in Devanagari with गोपायति'
      },

      // Action type based (without explicit verb)
      {
        word: 'bhayasmāt',
        context: { action_type: 'protection', element_role: 'threat_source' },
        description: 'should identify ablative for fear source in protection context'
      },
      {
        word: 'rogāt',
        context: { action_type: 'prevention', element_role: 'source' },
        description: 'should identify ablative for disease in prevention context'
      },
      {
        word: 'दुःखस्मात्',
        context: { action_type: 'warding_off', element_role: 'threat_source' },
        description: 'should identify ablative for sorrow in warding off context'
      }
    ];

    positiveCases.forEach(({ word, context, description }) => {
      test(description, () => {
        const result = sutra1427(word, context);
        expect(result).toMatchObject({
          applies: true,
          karaka: 'अपादान',
          case: 'ablative',
          sutra: '1.4.27'
        });
        expect(result.confidence).toBeGreaterThan(0.6);
      });
    });
  });

  describe('Negative Cases: Non-prevention contexts', () => {
    const negativeCases = [
      {
        word: 'devāya',
        context: { verb: 'dadāti', action_type: 'giving' },
        reason: 'Not a prevention verb',
        description: 'should not apply to dative with giving verb'
      },
      {
        word: 'grāmam',
        context: { verb: 'gacchati', action_type: 'movement' },
        reason: 'Not a prevention context',
        description: 'should not apply to accusative with movement verb'
      },
      {
        word: 'pustakaḥ',
        context: { verb: 'paṭhati', action_type: 'reading' },
        reason: 'Not a prevention action',
        description: 'should not apply to nominative with reading verb'
      },
      {
        word: 'मित्रेण',
        context: { verb: 'हसति', action_type: 'laughing' },
        reason: 'Not a prevention context',
        description: 'should not apply to instrumental with laughing verb'
      },
      {
        word: 'गुरुभ्यः',
        context: { verb: 'प्रणमति', action_type: 'salutation' },
        reason: 'Not a prevention context',
        description: 'should not apply to ablative in salutation context'
      },

      // Prevention verbs but wrong role
      {
        word: 'bālam',
        context: { verb: 'rakṣati', action_type: 'protection', element_role: 'protected_object' },
        reason: 'Word is protected object, not threat source',
        description: 'should not apply to protected object in protection context'
      },
      {
        word: 'rakṣakaḥ',
        context: { verb: 'vārayati', action_type: 'prevention', element_role: 'agent' },
        reason: 'Word is agent, not threat source',
        description: 'should not apply to agent in prevention context'
      }
    ];

    negativeCases.forEach(({ word, context, reason, description }) => {
      test(description, () => {
        const result = sutra1427(word, context);
        expect(result.applies).toBe(false);
        expect(result.sutra).toBe('1.4.27');
      });
    });
  });

  describe('Case validation functionality', () => {
    test('should validate correct ablative case endings', () => {
      const result = sutra1427('चोरस्मात्', {
        verb: 'रक्षति',
        action_type: 'protection',
        validate_case: true
      });
      expect(result.applies).toBe(true);
      expect(result.morphological.validation.isValid).toBe(true);
      expect(result.morphological.validation.message).toBe('correct_ablative_case');
    });

    test('should detect missing ablative case endings', () => {
      const result = sutra1427('चोर', {
        verb: 'रक्षति',
        action_type: 'protection',
        validate_case: true
      });
      expect(result.applies).toBe(true);
      expect(result.morphological.validation.isValid).toBe(false);
      expect(result.morphological.validation.message).toBe('missing_ablative_markers');
    });

    test('should work with various ablative markers', () => {
      const testCases = [
        { word: 'शत्रुभ्यः', marker: 'भ्यः' },
        { word: 'अग्न्यात्', marker: 'ात्' },
        { word: 'चोरोः', marker: 'ोः' },
        { word: 'दुष्टेभ्यः', marker: 'ेभ्यः' },
        { word: 'व्याधितः', marker: 'तः' }
      ];

      testCases.forEach(({ word, marker }) => {
        const result = sutra1427(word, {
          verb: 'निवारयति',
          action_type: 'prevention',
          validate_case: true
        });
        expect(result.applies).toBe(true);
        expect(result.morphological.validation.isValid).toBe(true);
        expect(result.morphological.caseMarkers).toContain(marker);
      });
    });
  });

  describe('Backward compatibility function', () => {
    test('identifyPreventionAblative should maintain compatibility', () => {
      const result = identifyPreventionAblative('चोरेः', {
        verb: 'रक्षति',
        action_type: 'protection'
      });
      expect(result).toMatchObject({
        applies: true,
        karaka: 'अपादान',
        case_required: 'ablative',
        sutra: '1.4.27'
      });
      expect(result.script).toBeDefined();
      expect(result.word_iast).toBeDefined();
    });

    test('identifyPreventionAblative should handle case validation', () => {
      const result = identifyPreventionAblative('चोर', {
        verb: 'रक्षति',
        action_type: 'protection',
        validate_case: true
      });
      expect(result.case_valid).toBe(false);
    });
  });

  describe('Multi-script support', () => {
    test('should handle IAST input correctly', () => {
      const result = sutra1427('corebhyaḥ', {
        verb: 'rakṣati',
        action_type: 'protection'
      });
      expect(result.applies).toBe(true);
      expect(result.script).toBe('IAST'); // IAST detection
      expect(result.normalizedWord).toBe('corebhyaḥ');
    });

    test('should handle Devanagari input correctly', () => {
      const result = sutra1427('चोरेभ्यः', {
        verb: 'रक्षति',
        action_type: 'protection'
      });
      expect(result.applies).toBe(true);
      expect(result.script).toBe('Devanagari');
      expect(result.normalizedWord).toBeDefined();
    });

    test('should work with mixed script contexts', () => {
      const result = sutra1427('चोरेभ्यः', {
        verb: 'rakṣati', // IAST verb
        action_type: 'protection'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
    });
  });

  describe('Edge cases and error handling', () => {
    const edgeCases = [
      { input: null, description: 'null input' },
      { input: undefined, description: 'undefined input' },
      { input: '', description: 'empty string input' },
      { input: '   ', description: 'whitespace only input' },
      { input: 123, description: 'non-string input' }
    ];

    edgeCases.forEach(({ input, description }) => {
      test(`should handle ${description} gracefully`, () => {
        const result = sutra1427(input, {
          verb: 'rakṣati',
          action_type: 'protection'
        });
        expect(result.applies).toBe(false);
        expect(result.error).toBeDefined();
        expect(result.sutra).toBe('1.4.27');
      });
    });

    test('should handle missing context gracefully', () => {
      const result = sutra1427('चोरेः', {});
      expect(result.applies).toBe(false);
      expect(result.sutra).toBe('1.4.27');
    });

    test('should handle partial context', () => {
      const result = sutra1427('चोरेः', {
        verb: 'रक्षति'
        // missing action_type
      });
      expect(result.applies).toBe(true); // should still work with just verb
      expect(result.karaka).toBe('अपादान');
    });

    test('should provide detailed analysis structure', () => {
      const result = sutra1427('शत्रुभ्यः', {
        verb: 'वारयति',
        action_type: 'prevention'
      });
      expect(result.applies).toBe(true);
      expect(result).toHaveProperty('morphological');
      expect(result).toHaveProperty('semantic');
      expect(result).toHaveProperty('syntactic');
      expect(result).toHaveProperty('contextValidation');
      expect(result.confidence).toBeGreaterThan(0);
    });
  });

  describe('Verb recognition', () => {
    const preventionVerbs = [
      'निवारयति', 'रक्षति', 'वारयति', 'अवरोधयति', 
      'पालयति', 'त्रायते', 'गोपायति'
    ];

    const preventionVerbsIAST = [
      'nivārayati', 'rakṣati', 'vārayati', 'avarodhayati',
      'pālayati', 'trāyate', 'gopāyati'
    ];

    preventionVerbs.forEach(verb => {
      test(`should recognize Devanagari prevention verb ${verb}`, () => {
        const result = sutra1427('चोरेः', {
          verb: verb,
          action_type: 'protection'
        });
        expect(result.applies).toBe(true);
        expect(result.contextValidation.hasPreventionVerb).toBe(true);
      });
    });

    preventionVerbsIAST.forEach(verb => {
      test(`should recognize IAST prevention verb ${verb}`, () => {
        const result = sutra1427('corebhyaḥ', {
          verb: verb,
          action_type: 'protection'
        });
        expect(result.applies).toBe(true);
        expect(result.contextValidation.hasPreventionVerb).toBe(true);
      });
    });
  });

  describe('Action type recognition', () => {
    const actionTypes = ['prevention', 'protection', 'blocking', 'defense', 'warding_off'];

    actionTypes.forEach(actionType => {
      test(`should recognize action type: ${actionType}`, () => {
        const result = sutra1427('व्याधिस्मात्', {
          action_type: actionType,
          element_role: 'threat_source'
        });
        expect(result.applies).toBe(true);
        expect(result.contextValidation.hasPreventionContext).toBe(true);
        expect(result.semantic.actionType).toBe(actionType);
      });
    });
  });
});
