/**
 * Test suite for Sutra 1.4.60: गतिश्च
 * 
 * This sutra establishes that प्र etc. also get the designation गति 
 * when in composition with motion verbs.
 */

import { sutra1460 } from './index.js';

describe('Sutra 1.4.60: गतिश्च (gatiśca)', () => {
  
  describe('Motion verb identification', () => {
    test('identifies basic motion verbs', () => {
      const motionVerbs = [
        { verb: 'गम्', meaning: 'go', motionType: 'general_movement' },
        { verb: 'या', meaning: 'go/move', motionType: 'directed_movement' },
        { verb: 'पत्', meaning: 'fall/fly', motionType: 'aerial_movement' },
        { verb: 'प्लु', meaning: 'swim/float', motionType: 'aquatic_movement' },
        { verb: 'सृप्', meaning: 'creep/crawl', motionType: 'surface_movement' },
        { verb: 'धाव्', meaning: 'run', motionType: 'rapid_movement' },
        { verb: 'चल्', meaning: 'move/shake', motionType: 'oscillatory_movement' }
      ];
      
      motionVerbs.forEach(({ verb, meaning, motionType }) => {
        const result = sutra1460('प्र', verb, {
          kriyaYoga: true,
          verbMeaning: meaning,
          motionType: motionType,
          isMotionVerb: true,
          designation: 'गति'
        });
        
        expect(result.applies).toBe(true);
        expect(result.classification).toBe('गति');
        expect(result.verbMeaning).toBe(meaning);
        expect(result.motionType).toBe(motionType);
        expect(result.isMotionVerb).toBe(true);
      });
    });

    test('identifies complex motion expressions', () => {
      const complexMotion = [
        { verb: 'आ_गम्', meaning: 'come', complexity: 'compound_motion' },
        { verb: 'उप_या', meaning: 'approach', complexity: 'directional_motion' },
        { verb: 'वि_चर्', meaning: 'wander', complexity: 'distributed_motion' },
        { verb: 'सम्_गम्', meaning: 'come_together', complexity: 'convergent_motion' },
        { verb: 'प्र_या', meaning: 'go_forth', complexity: 'progressive_motion' }
      ];
      
      complexMotion.forEach(({ verb, meaning, complexity }) => {
        const result = sutra1460('सम्', verb, {
          kriyaYoga: true,
          verbMeaning: meaning,
          motionComplexity: complexity,
          complexMotionVerb: true,
          designation: 'गति'
        });
        
        expect(result.applies).toBe(true);
        expect(result.classification).toBe('गति');
        expect(result.motionComplexity).toBe(complexity);
        expect(result.complexMotionVerb).toBe(true);
      });
    });

    test('distinguishes motion from non-motion verbs', () => {
      const nonMotionVerbs = [
        { verb: 'कृ', meaning: 'make', motion: false, type: 'action_verb' },
        { verb: 'भू', meaning: 'be', motion: false, type: 'existence_verb' },
        { verb: 'दा', meaning: 'give', motion: false, type: 'transfer_verb' },
        { verb: 'वद्', meaning: 'speak', motion: false, type: 'communication_verb' },
        { verb: 'चिन्त्', meaning: 'think', motion: false, type: 'mental_verb' }
      ];
      
      nonMotionVerbs.forEach(({ verb, meaning, motion, type }) => {
        const result = sutra1460('प्र', verb, {
          kriyaYoga: true,
          verbMeaning: meaning,
          isMotionVerb: motion,
          verbType: type,
          designation: 'उपसर्ग' // should get उपसर्ग, not गति
        });
        
        expect(result.applies).toBe(false);
        expect(result.reason).toBe('non_motion_verb');
      });
    });
  });

  describe('गति classification for motion contexts', () => {
    test('assigns गति designation to motion-related prefixes', () => {
      const gatiAssignments = [
        {
          prefix: 'प्र',
          verb: 'गम्',
          designation: 'गति',
          motionDirection: 'forward',
          semanticRole: 'progressive_motion'
        },
        {
          prefix: 'उप',
          verb: 'गम्',
          designation: 'गति',
          motionDirection: 'towards',
          semanticRole: 'approach_motion'
        },
        {
          prefix: 'निर्',
          verb: 'गम्',
          designation: 'गति',
          motionDirection: 'outward',
          semanticRole: 'exit_motion'
        },
        {
          prefix: 'वि',
          verb: 'चर्',
          designation: 'गति',
          motionDirection: 'dispersed',
          semanticRole: 'distributed_motion'
        }
      ];
      
      gatiAssignments.forEach(({ prefix, verb, designation, motionDirection, semanticRole }) => {
        const result = sutra1460(prefix, verb, {
          kriyaYoga: true,
          motionVerb: true,
          technicalDesignation: designation,
          motionDirection: motionDirection,
          semanticRole: semanticRole,
          gatiFunction: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.classification).toBe(designation);
        expect(result.technicalDesignation).toBe(designation);
        expect(result.motionDirection).toBe(motionDirection);
        expect(result.semanticRole).toBe(semanticRole);
        expect(result.gatiFunction).toBe(true);
      });
    });

    test('analyzes spatial and directional semantics', () => {
      const spatialSemantics = [
        {
          prefix: 'अव',
          verb: 'पत्',
          spatial: 'downward',
          directional: 'descent',
          semantics: 'falling_motion'
        },
        {
          prefix: 'उत्',
          verb: 'पत्',
          spatial: 'upward',
          directional: 'ascent',
          semantics: 'rising_motion'
        },
        {
          prefix: 'परि',
          verb: 'गम्',
          spatial: 'around',
          directional: 'circumference',
          semantics: 'circular_motion'
        },
        {
          prefix: 'अनु',
          verb: 'गम्',
          spatial: 'following',
          directional: 'sequence',
          semantics: 'sequential_motion'
        }
      ];
      
      spatialSemantics.forEach(({ prefix, verb, spatial, directional, semantics }) => {
        const result = sutra1460(prefix, verb, {
          kriyaYoga: true,
          motionVerb: true,
          spatialOrientation: spatial,
          directionalSense: directional,
          motionSemantics: semantics,
          spatialAnalysis: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.spatialOrientation).toBe(spatial);
        expect(result.directionalSense).toBe(directional);
        expect(result.motionSemantics).toBe(semantics);
        expect(result.spatialAnalysis).toBe(true);
      });
    });

    test('analyzes manner and speed of motion', () => {
      const motionManner = [
        {
          prefix: 'द्रु',
          verb: 'गम्',
          manner: 'rapid',
          speed: 'fast',
          type: 'velocity_motion'
        },
        {
          prefix: 'शनैस्',
          verb: 'गम्',
          manner: 'slow',
          speed: 'gradual',
          type: 'leisurely_motion'
        },
        {
          prefix: 'सहसा',
          verb: 'गम्',
          manner: 'sudden',
          speed: 'immediate',
          type: 'abrupt_motion'
        }
      ];
      
      motionManner.forEach(({ prefix, verb, manner, speed, type }) => {
        const result = sutra1460(prefix, verb, {
          kriyaYoga: true,
          motionVerb: true,
          motionManner: manner,
          motionSpeed: speed,
          motionType: type,
          mannerAnalysis: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.motionManner).toBe(manner);
        expect(result.motionSpeed).toBe(speed);
        expect(result.motionType).toBe(type);
        expect(result.mannerAnalysis).toBe(true);
      });
    });
  });

  describe('Triple classification system', () => {
    test('manages निपात/उपसर्ग/गति classifications', () => {
      const tripleClassifications = [
        {
          prefix: 'प्र',
          verb: 'गम्',
          independentContext: 'प्र तत् गच्छतु', // निपात
          boundContext: 'प्रकरोति', // उपसर्ग  
          motionContext: 'प्रगच्छति', // गति
          classifications: ['निपात', 'उपसर्ग', 'गति']
        },
        {
          prefix: 'सम्',
          verb: 'या',
          independentContext: 'सम् इति शुभम्', // निपात
          boundContext: 'संकरोति', // उपसर्ग
          motionContext: 'संयाति', // गति
          classifications: ['निपात', 'उपसर्ग', 'गति']
        }
      ];
      
      tripleClassifications.forEach(({ prefix, verb, independentContext, boundContext, motionContext, classifications }) => {
        // Test गति classification (this sutra)
        const gatiResult = sutra1460(prefix, verb, {
          context: motionContext,
          kriyaYoga: true,
          motionVerb: true,
          tripleClassification: true,
          allClassifications: classifications,
          currentDesignation: 'गति'
        });
        
        expect(gatiResult.applies).toBe(true);
        expect(gatiResult.classification).toBe('गति');
        expect(gatiResult.tripleClassification).toBe(true);
        expect(gatiResult.allClassifications).toEqual(classifications);
      });
    });

    test('analyzes context-dependent designation priority', () => {
      const designationPriority = [
        {
          prefix: 'वि',
          verb: 'चर्',
          context: 'विचरति',
          primaryDesignation: 'गति',
          secondaryDesignation: 'उपसर्ग',
          motionPriority: true
        },
        {
          prefix: 'अप',
          verb: 'या',
          context: 'अपयाति',
          primaryDesignation: 'गति',
          secondaryDesignation: 'उपसर्ग',
          directionalPriority: true
        }
      ];
      
      designationPriority.forEach(({ prefix, verb, context, primaryDesignation, secondaryDesignation, motionPriority, directionalPriority }) => {
        const result = sutra1460(prefix, verb, {
          context: context,
          kriyaYoga: true,
          motionVerb: true,
          primaryDesignation: primaryDesignation,
          secondaryDesignation: secondaryDesignation,
          motionPriority: motionPriority,
          directionalPriority: directionalPriority
        });
        
        expect(result.applies).toBe(true);
        expect(result.primaryDesignation).toBe(primaryDesignation);
        expect(result.secondaryDesignation).toBe(secondaryDesignation);
      });
    });

    test('distinguishes from pure उपसर्ग usage', () => {
      const upasargaOnly = [
        {
          prefix: 'प्र',
          verb: 'कृ', // non-motion verb
          context: 'प्रकरोति',
          expectedDesignation: 'उपसर्ग',
          notGati: true
        },
        {
          prefix: 'सम्',
          verb: 'धा', // non-motion verb
          context: 'संदधाति',
          expectedDesignation: 'उपसर्ग',
          notGati: true
        }
      ];
      
      upasargaOnly.forEach(({ prefix, verb, context, expectedDesignation, notGati }) => {
        const result = sutra1460(prefix, verb, {
          context: context,
          kriyaYoga: true,
          motionVerb: false,
          nonMotionContext: true
        });
        
        expect(result.applies).toBe(false);
        expect(result.reason).toBe('non_motion_verb');
      });
    });
  });

  describe('Motion semantics and analysis', () => {
    test('analyzes physical motion patterns', () => {
      const physicalMotion = [
        {
          prefix: 'अभि',
          verb: 'गम्',
          pattern: 'approach',
          trajectory: 'convergent',
          endpoint: 'target_focused'
        },
        {
          prefix: 'प्रति',
          verb: 'गम्',
          pattern: 'return',
          trajectory: 'reciprocal',
          endpoint: 'origin_return'
        },
        {
          prefix: 'उद्',
          verb: 'गम्',
          pattern: 'emergence',
          trajectory: 'ascendent',
          endpoint: 'elevated_position'
        }
      ];
      
      physicalMotion.forEach(({ prefix, verb, pattern, trajectory, endpoint }) => {
        const result = sutra1460(prefix, verb, {
          kriyaYoga: true,
          motionVerb: true,
          motionPattern: pattern,
          trajectoryType: trajectory,
          motionEndpoint: endpoint,
          physicalMotion: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.motionPattern).toBe(pattern);
        expect(result.trajectoryType).toBe(trajectory);
        expect(result.motionEndpoint).toBe(endpoint);
        expect(result.physicalMotion).toBe(true);
      });
    });

    test('analyzes metaphorical motion', () => {
      const metaphoricalMotion = [
        {
          prefix: 'प्र',
          verb: 'वृत्',
          literal: 'move_forward',
          metaphorical: 'proceed_in_narrative',
          domain: 'textual_progression'
        },
        {
          prefix: 'अव',
          verb: 'तर्',
          literal: 'move_down',
          metaphorical: 'descend_in_hierarchy',
          domain: 'social_position'
        },
        {
          prefix: 'उत्',
          verb: 'पद्',
          literal: 'step_up',
          metaphorical: 'arise_in_consciousness',
          domain: 'mental_emergence'
        }
      ];
      
      metaphoricalMotion.forEach(({ prefix, verb, literal, metaphorical, domain }) => {
        const result = sutra1460(prefix, verb, {
          kriyaYoga: true,
          motionVerb: true,
          literalMotion: literal,
          metaphoricalMotion: metaphorical,
          semanticDomain: domain,
          extendedMotion: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.literalMotion).toBe(literal);
        expect(result.metaphoricalMotion).toBe(metaphorical);
        expect(result.semanticDomain).toBe(domain);
        expect(result.extendedMotion).toBe(true);
      });
    });

    test('analyzes abstract movement concepts', () => {
      const abstractMovement = [
        {
          prefix: 'सम्',
          verb: 'पद्',
          abstract: 'convergence_of_ideas',
          conceptual: 'intellectual_synthesis',
          cognitive: 'mental_integration'
        },
        {
          prefix: 'वि',
          verb: 'सृ',
          abstract: 'dispersal_of_attention',
          conceptual: 'cognitive_distribution',
          cognitive: 'mental_scattering'
        },
        {
          prefix: 'निस्',
          verb: 'सृ',
          abstract: 'emergence_from_confusion',
          conceptual: 'clarity_attainment',
          cognitive: 'understanding_breakthrough'
        }
      ];
      
      abstractMovement.forEach(({ prefix, verb, abstract, conceptual, cognitive }) => {
        const result = sutra1460(prefix, verb, {
          kriyaYoga: true,
          motionVerb: true,
          abstractMovement: abstract,
          conceptualMotion: conceptual,
          cognitiveMotion: cognitive,
          mentalDomain: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.abstractMovement).toBe(abstract);
        expect(result.conceptualMotion).toBe(conceptual);
        expect(result.cognitiveMotion).toBe(cognitive);
        expect(result.mentalDomain).toBe(true);
      });
    });
  });

  describe('Verbal morphology and composition', () => {
    test('handles tense and aspect in motion contexts', () => {
      const tenseAspectMotion = [
        {
          prefix: 'प्र',
          verb: 'गम्',
          tense: 'present',
          aspect: 'progressive',
          form: 'प्रगच्छति',
          meaning: 'is_going_forth'
        },
        {
          prefix: 'सम्',
          verb: 'आ_गम्',
          tense: 'perfect',
          aspect: 'completive',
          form: 'समागतः',
          meaning: 'has_come_together'
        },
        {
          prefix: 'वि',
          verb: 'चर्',
          tense: 'future',
          aspect: 'prospective',
          form: 'विचरिष्यति',
          meaning: 'will_wander'
        }
      ];
      
      tenseAspectMotion.forEach(({ prefix, verb, tense, aspect, form, meaning }) => {
        const result = sutra1460(prefix, verb, {
          kriyaYoga: true,
          motionVerb: true,
          verbalTense: tense,
          verbalAspect: aspect,
          inflectedForm: form,
          compositeMeaning: meaning,
          temporalMotion: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.verbalTense).toBe(tense);
        expect(result.verbalAspect).toBe(aspect);
        expect(result.inflectedForm).toBe(form);
        expect(result.compositeMeaning).toBe(meaning);
        expect(result.temporalMotion).toBe(true);
      });
    });

    test('handles voice and mood in motion contexts', () => {
      const voiceMoodMotion = [
        {
          prefix: 'उप',
          verb: 'नी',
          voice: 'active',
          mood: 'indicative',
          form: 'उपनयति',
          meaning: 'leads_near'
        },
        {
          prefix: 'अप',
          verb: 'नी',
          voice: 'passive',
          mood: 'indicative',
          form: 'अपनीयते',
          meaning: 'is_led_away'
        },
        {
          prefix: 'प्र',
          verb: 'या',
          voice: 'middle',
          mood: 'optative',
          form: 'प्रयेत',
          meaning: 'might_go_forth'
        }
      ];
      
      voiceMoodMotion.forEach(({ prefix, verb, voice, mood, form, meaning }) => {
        const result = sutra1460(prefix, verb, {
          kriyaYoga: true,
          motionVerb: true,
          verbalVoice: voice,
          verbalMood: mood,
          inflectedForm: form,
          compositeMeaning: meaning,
          voiceMotion: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.verbalVoice).toBe(voice);
        expect(result.verbalMood).toBe(mood);
        expect(result.inflectedForm).toBe(form);
        expect(result.compositeMeaning).toBe(meaning);
        expect(result.voiceMotion).toBe(true);
      });
    });

    test('handles derived verbal forms', () => {
      const derivedMotionForms = [
        {
          prefix: 'सम्',
          rootVerb: 'गम्',
          derivedForm: 'causative',
          composition: 'संगमयति',
          meaning: 'causes_to_come_together'
        },
        {
          prefix: 'वि',
          rootVerb: 'चर्',
          derivedForm: 'desiderative',
          composition: 'विचिचरिषति',
          meaning: 'desires_to_wander'
        },
        {
          prefix: 'प्र',
          rootVerb: 'या',
          derivedForm: 'intensive',
          composition: 'प्रयायाति',
          meaning: 'goes_forth_repeatedly'
        }
      ];
      
      derivedMotionForms.forEach(({ prefix, rootVerb, derivedForm, composition, meaning }) => {
        const result = sutra1460(prefix, rootVerb, {
          kriyaYoga: true,
          motionVerb: true,
          originalRoot: rootVerb,
          derivationType: derivedForm,
          derivedComposition: composition,
          derivedMeaning: meaning,
          derivedMotion: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.originalRoot).toBe(rootVerb);
        expect(result.derivationType).toBe(derivedForm);
        expect(result.derivedComposition).toBe(composition);
        expect(result.derivedMeaning).toBe(meaning);
        expect(result.derivedMotion).toBe(true);
      });
    });
  });

  describe('Multi-script support', () => {
    test('handles Devanagari गति formations', () => {
      const result = sutra1460('प्र', 'गम्', {
        script: 'Devanagari',
        context: 'प्रगच्छति',
        kriyaYoga: true,
        motionVerb: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('Devanagari');
      expect(result.classification).toBe('गति');
    });

    test('handles IAST गति formations', () => {
      const result = sutra1460('pra', 'gam', {
        script: 'IAST',
        context: 'pragacchati',
        kriyaYoga: true,
        motionVerb: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('IAST');
      expect(result.classification).toBe('गति');
    });
  });

  describe('Error handling', () => {
    test('handles non-motion verbs', () => {
      const result = sutra1460('प्र', 'कृ', {
        context: 'प्रकरोति',
        kriyaYoga: true,
        motionVerb: false
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('non_motion_verb');
    });

    test('handles missing verb parameter', () => {
      const result = sutra1460('प्र', null, {
        context: 'independent usage'
      });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('missing_verb');
    });

    test('handles non-prefix elements', () => {
      const result = sutra1460('च', 'गम्', {
        context: 'invalid combination',
        kriyaYoga: true,
        motionVerb: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('not_gati_eligible_prefix');
    });

    test('handles independent prefix usage', () => {
      const result = sutra1460('प्र', null, {
        context: 'प्र तत् गच्छतु',
        independentUsage: true,
        kriyaYoga: false
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('no_kriya_yoga');
    });
  });

  describe('Integration with classification systems', () => {
    test('integrates with उपसर्ग classification (1.4.59)', () => {
      const result = sutra1460('प्र', 'गम्', {
        kriyaYoga: true,
        motionVerb: true,
        alsoUpasarga: true, // also gets उपसर्ग from 1.4.59
        dualClassification: ['उपसर्ग', 'गति']
      });
      
      expect(result.applies).toBe(true);
      expect(result.alsoUpasarga).toBe(true);
      expect(result.dualClassification).toEqual(['उपसर्ग', 'गति']);
    });

    test('relates to निपात classification (1.4.58)', () => {
      const result = sutra1460('प्र', 'गम्', {
        kriyaYoga: true,
        motionVerb: true,
        potentialNipata: true, // can be निपात when independent
        contextualClassification: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.potentialNipata).toBe(true);
      expect(result.contextualClassification).toBe(true);
    });

    test('distinguishes from pure particle usage', () => {
      const result = sutra1460('प्र', 'गम्', {
        kriyaYoga: true,
        motionVerb: true,
        notPureParticle: true,
        boundMotionElement: true,
        compositionalGati: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.notPureParticle).toBe(true);
      expect(result.boundMotionElement).toBe(true);
      expect(result.compositionalGati).toBe(true);
    });
  });

  describe('Edge cases', () => {
    test('handles Vedic motion expressions', () => {
      const result = sutra1460('प्र', 'इ', {
        kriyaYoga: true,
        motionVerb: true,
        vedicForm: true,
        archaicMotion: 'प्रैति',
        historicalContext: 'vedic_sanskrit'
      });
      
      expect(result.applies).toBe(true);
      expect(result.vedicForm).toBe(true);
      expect(result.archaicMotion).toBe('प्रैति');
      expect(result.historicalContext).toBe('vedic_sanskrit');
    });

    test('handles ritualistic and ceremonial motion', () => {
      const result = sutra1460('प्र', 'क्रम्', {
        kriyaYoga: true,
        motionVerb: true,
        ritualMotion: true,
        ceremonialMovement: 'processional',
        sacredContext: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.ritualMotion).toBe(true);
      expect(result.ceremonialMovement).toBe('processional');
      expect(result.sacredContext).toBe(true);
    });

    test('handles cosmic and astronomical motion', () => {
      const result = sutra1460('परि', 'भ्रम्', {
        kriyaYoga: true,
        motionVerb: true,
        cosmicMotion: true,
        astronomicalMovement: 'orbital',
        celestialContext: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.cosmicMotion).toBe(true);
      expect(result.astronomicalMovement).toBe('orbital');
      expect(result.celestialContext).toBe(true);
    });

    test('handles psychological and spiritual motion', () => {
      const result = sutra1460('अन्तर्', 'गम्', {
        kriyaYoga: true,
        motionVerb: true,
        psychologicalMotion: true,
        spiritualMovement: 'inward_journey',
        meditativeContext: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.psychologicalMotion).toBe(true);
      expect(result.spiritualMovement).toBe('inward_journey');
      expect(result.meditativeContext).toBe(true);
    });

    test('handles compound and complex motion verbs', () => {
      const result = sutra1460(['सम्', 'प्र'], 'स्था_गम्', {
        kriyaYoga: true,
        motionVerb: true,
        complexComposition: true,
        multiPrefixGati: true,
        compoundMotionVerb: 'संप्रस्थगम्'
      });
      
      expect(result.applies).toBe(true);
      expect(result.complexComposition).toBe(true);
      expect(result.multiPrefixGati).toBe(true);
      expect(result.compoundMotionVerb).toBe('संप्रस्थगम्');
    });
  });
});
