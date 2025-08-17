/**
 * Test suite for Sutra 1.4.53: हृक्रोरन्यतरस्याम्
 * 
 * This sutra establishes optional कर्ता to कर्म transformation for हृ and कृ verbs.
 */

import { sutra1453 } from './index.js';

describe('Sutra 1.4.53: हृक्रोरन्यतरस्याम् (hṛkror anyatarasya-am)', () => {
  
  describe('हृ (hṛ) verb analysis', () => {
    test('identifies हृ verb forms', () => {
      const hriVerbs = [
        { verb: 'हरति', form: 'present', meaning: 'takes_away' },
        { verb: 'जहार', form: 'perfect', meaning: 'has_taken' },
        { verb: 'हरिष्यति', form: 'future', meaning: 'will_take' },
        { verb: 'अहार्षीत्', form: 'aorist', meaning: 'took_away' },
        { verb: 'हृत', form: 'past_participle', meaning: 'taken_away' }
      ];
      
      hriVerbs.forEach(({ verb, form, meaning }) => {
        const result = sutra1453('हर्ता', {
          verb: verb,
          verbForm: form,
          verbMeaning: meaning,
          verbRoot: 'हृ',
          agentRole: 'कर्ता',
          optionalKarma: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.verbRoot).toBe('हृ');
        expect(result.verbForm).toBe(form);
        expect(result.optionalKarma).toBe(true);
        expect(result.originalRole).toBe('कर्ता');
        expect(result.alternateRole).toBe('कर्म');
      });
    });

    test('analyzes हृ semantic roles', () => {
      const semanticRoles = [
        { agent: 'चोर', semanticRole: 'thief', action: 'stealing' },
        { agent: 'हर्ता', semanticRole: 'taker', action: 'taking' },
        { agent: 'अपहारी', semanticRole: 'robber', action: 'robbing' },
        { agent: 'संग्राहक', semanticRole: 'collector', action: 'collecting' }
      ];
      
      semanticRoles.forEach(({ agent, semanticRole, action }) => {
        const result = sutra1453(agent, {
          verb: 'हरति',
          verbRoot: 'हृ',
          semanticRole: semanticRole,
          actionType: action,
          optionalTransformation: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.semanticRole).toBe(semanticRole);
        expect(result.actionType).toBe(action);
        expect(result.optionalTransformation).toBe(true);
      });
    });

    test('handles हृ causative forms', () => {
      const causativeForms = [
        { verb: 'हारयति', causative: 'simple', meaning: 'causes_to_take' },
        { verb: 'हारयामास', causative: 'periphrastic', meaning: 'made_take' },
        { verb: 'जिहीर्षति', causative: 'desiderative', meaning: 'desires_to_take' }
      ];
      
      causativeForms.forEach(({ verb, causative, meaning }) => {
        const result = sutra1453('प्रेरक', {
          verb: verb,
          verbRoot: 'हृ',
          causativeType: causative,
          verbMeaning: meaning,
          agentComplexity: 'causative',
          optionalKarma: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.causativeType).toBe(causative);
        expect(result.agentComplexity).toBe('causative');
      });
    });
  });

  describe('कृ (kṛ) verb analysis', () => {
    test('identifies कृ verb forms', () => {
      const kriVerbs = [
        { verb: 'करोति', form: 'present', meaning: 'does' },
        { verb: 'चकार', form: 'perfect', meaning: 'has_done' },
        { verb: 'करिष्यति', form: 'future', meaning: 'will_do' },
        { verb: 'अकार्षीत्', form: 'aorist', meaning: 'did' },
        { verb: 'कृत', form: 'past_participle', meaning: 'done' }
      ];
      
      kriVerbs.forEach(({ verb, form, meaning }) => {
        const result = sutra1453('कर्ता', {
          verb: verb,
          verbForm: form,
          verbMeaning: meaning,
          verbRoot: 'कृ',
          agentRole: 'कर्ता',
          optionalKarma: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.verbRoot).toBe('कृ');
        expect(result.verbForm).toBe(form);
        expect(result.optionalKarma).toBe(true);
      });
    });

    test('analyzes कृ semantic roles', () => {
      const semanticRoles = [
        { agent: 'निर्माता', semanticRole: 'creator', action: 'creating' },
        { agent: 'कारयिता', semanticRole: 'maker', action: 'making' },
        { agent: 'सम्पादक', semanticRole: 'accomplisher', action: 'accomplishing' },
        { agent: 'रचयिता', semanticRole: 'composer', action: 'composing' }
      ];
      
      semanticRoles.forEach(({ agent, semanticRole, action }) => {
        const result = sutra1453(agent, {
          verb: 'करोति',
          verbRoot: 'कृ',
          semanticRole: semanticRole,
          actionType: action,
          optionalTransformation: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.semanticRole).toBe(semanticRole);
        expect(result.actionType).toBe(action);
      });
    });

    test('handles कृ causative forms', () => {
      const causativeForms = [
        { verb: 'कारयति', causative: 'simple', meaning: 'causes_to_do' },
        { verb: 'कारयामास', causative: 'periphrastic', meaning: 'made_do' },
        { verb: 'चिकीर्षति', causative: 'desiderative', meaning: 'desires_to_do' }
      ];
      
      causativeForms.forEach(({ verb, causative, meaning }) => {
        const result = sutra1453('प्रेरयिता', {
          verb: verb,
          verbRoot: 'कृ',
          causativeType: causative,
          verbMeaning: meaning,
          agentComplexity: 'causative',
          optionalKarma: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.causativeType).toBe(causative);
        expect(result.agentComplexity).toBe('causative');
      });
    });
  });

  describe('Optional कर्ता to कर्म transformation', () => {
    test('applies optional transformation for हृ verbs', () => {
      const result = sutra1453('धनहारी', {
        verb: 'हरति',
        verbRoot: 'हृ',
        object: 'धन',
        context: 'धनहारी धनं हरति',
        optionalRule: true,
        transformationType: 'कर्ता_to_कर्म'
      });
      
      expect(result.applies).toBe(true);
      expect(result.optionalRule).toBe(true);
      expect(result.transformationType).toBe('कर्ता_to_कर्म');
      expect(result.originalRole).toBe('कर्ता');
      expect(result.alternateRole).toBe('कर्म');
    });

    test('applies optional transformation for कृ verbs', () => {
      const result = sutra1453('कार्यकर्ता', {
        verb: 'करोति',
        verbRoot: 'कृ',
        object: 'कार्य',
        context: 'कार्यकर्ता कार्यं करोति',
        optionalRule: true,
        transformationType: 'कर्ता_to_कर्म'
      });
      
      expect(result.applies).toBe(true);
      expect(result.optionalRule).toBe(true);
      expect(result.transformationType).toBe('कर्ता_to_कर्म');
    });

    test('maintains grammatical optionality', () => {
      const result = sutra1453('क्रियाकर्ता', {
        verb: 'करोति',
        verbRoot: 'कृ',
        optionalityLevel: 'full',
        alternateAnalysis: 'available',
        traditionalRole: 'कर्ता',
        optionalRole: 'कर्म'
      });
      
      expect(result.applies).toBe(true);
      expect(result.optionalityLevel).toBe('full');
      expect(result.alternateAnalysis).toBe('available');
      expect(result.traditionalRole).toBe('कर्ता');
      expect(result.optionalRole).toBe('कर्म');
    });
  });

  describe('Semantic role flexibility', () => {
    test('handles agent-object ambiguity in हृ contexts', () => {
      const ambiguousRoles = [
        { context: 'स्वामी चोरेण धनं हृतम्', ambiguity: 'passive_agent' },
        { context: 'धनं चोरो हरति', ambiguity: 'active_agent' },
        { context: 'हृतं धनं चोरेण', ambiguity: 'participial_agent' }
      ];
      
      ambiguousRoles.forEach(({ context, ambiguity }) => {
        const result = sutra1453('चोर', {
          verb: 'हृ_form',
          verbRoot: 'हृ',
          context: context,
          roleAmbiguity: ambiguity,
          semanticFlexibility: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.roleAmbiguity).toBe(ambiguity);
        expect(result.semanticFlexibility).toBe(true);
      });
    });

    test('handles agent-object ambiguity in कृ contexts', () => {
      const ambiguousRoles = [
        { context: 'शिल्पी कलाकारेण कृतम्', ambiguity: 'passive_agent' },
        { context: 'कलां शिल्पी करोति', ambiguity: 'active_agent' },
        { context: 'कृता कला शिल्पिना', ambiguity: 'participial_agent' }
      ];
      
      ambiguousRoles.forEach(({ context, ambiguity }) => {
        const result = sutra1453('शिल्पी', {
          verb: 'कृ_form',
          verbRoot: 'कृ',
          context: context,
          roleAmbiguity: ambiguity,
          semanticFlexibility: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.roleAmbiguity).toBe(ambiguity);
        expect(result.semanticFlexibility).toBe(true);
      });
    });

    test('analyzes intentional vs unintentional agency', () => {
      const intentionalityTypes = [
        { intention: 'deliberate', agency: 'full', control: 'complete' },
        { intention: 'accidental', agency: 'reduced', control: 'partial' },
        { intention: 'forced', agency: 'constrained', control: 'limited' },
        { intention: 'natural', agency: 'inherent', control: 'automatic' }
      ];
      
      intentionalityTypes.forEach(({ intention, agency, control }) => {
        const result = sutra1453('कार्यकर्ता', {
          verb: 'करोति',
          verbRoot: 'कृ',
          intentionality: intention,
          agencyLevel: agency,
          controlLevel: control,
          optionalKarma: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.intentionality).toBe(intention);
        expect(result.agencyLevel).toBe(agency);
        expect(result.controlLevel).toBe(control);
      });
    });
  });

  describe('Compound and derived forms', () => {
    test('handles compound verbs with हृ', () => {
      const compoundVerbs = [
        { compound: 'उपहरति', prefix: 'उप', meaning: 'brings_near' },
        { compound: 'अपहरति', prefix: 'अप', meaning: 'takes_away' },
        { compound: 'आहरति', prefix: 'आ', meaning: 'brings' },
        { compound: 'प्रहरति', prefix: 'प्र', meaning: 'strikes' }
      ];
      
      compoundVerbs.forEach(({ compound, prefix, meaning }) => {
        const result = sutra1453('संयुक्तकर्ता', {
          verb: compound,
          verbRoot: 'हृ',
          prefix: prefix,
          compoundMeaning: meaning,
          compoundVerb: true,
          optionalKarma: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.compoundVerb).toBe(true);
        expect(result.prefix).toBe(prefix);
        expect(result.compoundMeaning).toBe(meaning);
      });
    });

    test('handles compound verbs with कृ', () => {
      const compoundVerbs = [
        { compound: 'विकरोति', prefix: 'वि', meaning: 'modifies' },
        { compound: 'संकरोति', prefix: 'सम्', meaning: 'mixes' },
        { compound: 'प्रकरोति', prefix: 'प्र', meaning: 'manifests' },
        { compound: 'निष्करोति', prefix: 'निस्', meaning: 'removes' }
      ];
      
      compoundVerbs.forEach(({ compound, prefix, meaning }) => {
        const result = sutra1453('प्रेरक', {
          verb: compound,
          verbRoot: 'कृ',
          prefix: prefix,
          compoundMeaning: meaning,
          compoundVerb: true,
          optionalKarma: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.compoundVerb).toBe(true);
        expect(result.prefix).toBe(prefix);
      });
    });

    test('handles denominative forms', () => {
      const denominatives = [
        { word: 'नामकरोति', base: 'नामन्', meaning: 'names' },
        { word: 'रूपकरोति', base: 'रूप', meaning: 'forms' },
        { word: 'अर्थकरोति', base: 'अर्थ', meaning: 'means' }
      ];
      
      denominatives.forEach(({ word, base, meaning }) => {
        const result = sutra1453('नामकर्ता', {
          verb: word,
          verbRoot: 'कृ',
          denominativeBase: base,
          denominativeMeaning: meaning,
          denominativeForm: true,
          optionalKarma: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.denominativeForm).toBe(true);
        expect(result.denominativeBase).toBe(base);
      });
    });
  });

  describe('Passive and voice transformations', () => {
    test('analyzes passive constructions with हृ', () => {
      const result = sutra1453('चोर', {
        verb: 'ह्रियते',
        verbRoot: 'हृ',
        voice: 'passive',
        context: 'चोरेण धनं ह्रियते',
        passiveAgent: true,
        instrumentalCase: true,
        optionalKarma: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.voice).toBe('passive');
      expect(result.passiveAgent).toBe(true);
      expect(result.instrumentalCase).toBe(true);
    });

    test('analyzes passive constructions with कृ', () => {
      const result = sutra1453('कर्ता', {
        verb: 'क्रियते',
        verbRoot: 'कृ',
        voice: 'passive',
        context: 'कर्त्रा कार्यं क्रियते',
        passiveAgent: true,
        instrumentalCase: true,
        optionalKarma: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.voice).toBe('passive');
      expect(result.passiveAgent).toBe(true);
    });

    test('handles voice alternations', () => {
      const voiceAlternations = [
        { active: 'हरति', passive: 'ह्रियते', voice_change: 'active_to_passive' },
        { active: 'करोति', passive: 'क्रियते', voice_change: 'active_to_passive' },
        { middle: 'हरते', active: 'हरति', voice_change: 'middle_to_active' }
      ];
      
      voiceAlternations.forEach(({ active, passive, middle, voice_change }) => {
        const result = sutra1453('कर्ता', {
          activeForm: active,
          passiveForm: passive,
          middleForm: middle,
          voiceTransformation: voice_change,
          optionalKarma: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.voiceTransformation).toBe(voice_change);
      });
    });
  });

  describe('Multi-script support', () => {
    test('handles Devanagari input', () => {
      const result = sutra1453('हर्ता', {
        verb: 'हरति',
        verbRoot: 'हृ',
        script: 'Devanagari',
        optionalKarma: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('Devanagari');
    });

    test('handles IAST input', () => {
      const result = sutra1453('hartā', {
        verb: 'harati',
        verbRoot: 'hṛ',
        script: 'IAST',
        optionalKarma: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('IAST');
    });
  });

  describe('Error handling', () => {
    test('handles empty input', () => {
      const result = sutra1453('');
      expect(result.applies).toBe(false);
      expect(result.error).toBe('empty_input');
    });

    test('handles non-हृ/कृ verbs', () => {
      const result = sutra1453('गामी', {
        verb: 'गच्छति',
        verbRoot: 'गम्',
        optionalKarma: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('not_hri_or_kri_verb');
    });

    test('handles contexts where optionality does not apply', () => {
      const result = sutra1453('कर्ता', {
        verb: 'करोति',
        verbRoot: 'कृ',
        mandatoryRole: 'कर्ता',
        optionalityBlocked: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('optionality_not_applicable');
    });

    test('handles invalid Sanskrit input', () => {
      const result = sutra1453('xyz123agent', {
        verb: 'does',
        verbRoot: 'make'
      });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_sanskrit_input');
    });
  });

  describe('Integration with कर्म system', () => {
    test('integrates with general कर्म rules', () => {
      const result = sutra1453('विशेषकर्ता', {
        verb: 'करोति',
        verbRoot: 'कृ',
        integrationWithKarma: true,
        generalKarmaRules: 'applicable',
        specializedRule: true,
        optionalKarma: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.integrationWithKarma).toBe(true);
      expect(result.specializedRule).toBe(true);
    });

    test('relates to other कर्म sutras', () => {
      const result = sutra1453('संबंधित', {
        verb: 'हरति',
        verbRoot: 'हृ',
        relatedToSutra1449: true, // कर्तुरीप्सिततमं कर्म
        relatedToSutra1450: true, // तथायुक्तं चानीप्सितम्
        optionalKarma: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.relatedToSutra1449).toBe(true);
      expect(result.relatedToSutra1450).toBe(true);
    });

    test('distinguishes from other कारक relations', () => {
      const result = sutra1453('स्पष्टकर्ता', {
        verb: 'करोति',
        verbRoot: 'कृ',
        notKarana: true,
        notAdhikarana: true,
        notSampradan: true,
        optionalKarma: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.notKarana).toBe(true);
      expect(result.notAdhikarana).toBe(true);
      expect(result.notSampradan).toBe(true);
    });
  });

  describe('Edge cases', () => {
    test('handles archaic and Vedic forms', () => {
      const result = sutra1453('जहर्ता', {
        verb: 'जहार',
        verbRoot: 'हृ',
        vedicForm: true,
        archaicUsage: true,
        historicalContext: 'early_sanskrit',
        optionalKarma: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.vedicForm).toBe(true);
      expect(result.archaicUsage).toBe(true);
    });

    test('handles reduplicated forms', () => {
      const result = sutra1453('जिहीर्षु', {
        verb: 'जिहीर्षति',
        verbRoot: 'हृ',
        reduplication: true,
        desiderativeForm: true,
        intensiveDesire: true,
        optionalKarma: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.reduplication).toBe(true);
      expect(result.desiderativeForm).toBe(true);
    });

    test('handles multiple agent scenarios', () => {
      const result = sutra1453('सहकर्ता', {
        verb: 'करवत्',
        verbRoot: 'कृ',
        multipleAgents: true,
        collectiveAction: true,
        distributedAgency: true,
        optionalKarma: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.multipleAgents).toBe(true);
      expect(result.collectiveAction).toBe(true);
    });

    test('handles meta-linguistic usage', () => {
      const result = sutra1453('व्याकरणकर्ता', {
        verb: 'करोति',
        verbRoot: 'कृ',
        metaLinguistic: true,
        grammaticalExample: true,
        technicalUsage: true,
        optionalKarma: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.metaLinguistic).toBe(true);
      expect(result.grammaticalExample).toBe(true);
    });
  });
});
