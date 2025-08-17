/**
 * Test suite for Sutra 1.4.58: प्रादयः
 * 
 * This sutra defines प्र etc. as निपात when not signifying substances.
 */

import { sutra1458 } from './index.js';

describe('Sutra 1.4.58: प्रादयः (prādayaḥ)', () => {
  
  describe('प्र-series prefix-particle identification', () => {
    test('identifies basic प्र-series elements', () => {
      const praSeries = [
        { prefix: 'प्र', meaning: 'forth/forward', direction: 'forward' },
        { prefix: 'परा', meaning: 'away/back', direction: 'backward' },
        { prefix: 'अप', meaning: 'away/off', direction: 'removal' },
        { prefix: 'सम्', meaning: 'together/with', direction: 'convergence' },
        { prefix: 'वि', meaning: 'apart/separate', direction: 'divergence' }
      ];
      
      praSeries.forEach(({ prefix, meaning, direction }) => {
        const result = sutra1458(prefix, {
          context: `${prefix} का स्वतन्त्र प्रयोग`,
          prefixMeaning: meaning,
          directionalSense: direction,
          signifiesSubstance: false,
          independentUsage: true,
          asattva: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.classification).toBe('निपात');
        expect(result.prefixMeaning).toBe(meaning);
        expect(result.directionalSense).toBe(direction);
        expect(result.independentUsage).toBe(true);
        expect(result.asattva).toBe(true);
      });
    });

    test('identifies extended प्र-series elements', () => {
      const extendedSeries = [
        { prefix: 'अति', meaning: 'beyond/over', scope: 'excessive' },
        { prefix: 'अधि', meaning: 'over/above', scope: 'superior' },
        { prefix: 'अनु', meaning: 'after/along', scope: 'sequential' },
        { prefix: 'उप', meaning: 'near/under', scope: 'proximate' },
        { prefix: 'निर्', meaning: 'out/without', scope: 'privative' }
      ];
      
      extendedSeries.forEach(({ prefix, meaning, scope }) => {
        const result = sutra1458(prefix, {
          context: `विस्तृत श्रेणी में ${prefix}`,
          prefixMeaning: meaning,
          scopeType: scope,
          extendedSeries: true,
          independentUsage: true,
          asattva: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.classification).toBe('निपात');
        expect(result.extendedSeries).toBe(true);
        expect(result.scopeType).toBe(scope);
      });
    });

    test('identifies compound prefixal particles', () => {
      const compoundPrefixes = [
        { prefix: 'अधिप्र', components: ['अधि', 'प्र'], meaning: 'over_and_forth' },
        { prefix: 'उपसम्', components: ['उप', 'सम्'], meaning: 'near_together' },
        { prefix: 'निरप', components: ['निर्', 'अप'], meaning: 'out_away' }
      ];
      
      compoundPrefixes.forEach(({ prefix, components, meaning }) => {
        const result = sutra1458(prefix, {
          context: `संयुक्त उपसर्ग ${prefix}`,
          components: components,
          prefixMeaning: meaning,
          compoundPrefix: true,
          independentUsage: true,
          asattva: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.classification).toBe('निपात');
        expect(result.components).toEqual(components);
        expect(result.compoundPrefix).toBe(true);
      });
    });
  });

  describe('Independent vs bound usage analysis', () => {
    test('identifies independent particle usage', () => {
      const independentUsages = [
        {
          prefix: 'प्र',
          context: 'प्र तत् गच्छतु',
          usage: 'emphatic_particle',
          bound: false
        },
        {
          prefix: 'सम्',
          context: 'सम् इति शुभलक्षणम्',
          usage: 'auspicious_particle',
          bound: false
        },
        {
          prefix: 'वि',
          context: 'वि इति विशेषार्थकम्',
          usage: 'special_particle',
          bound: false
        }
      ];
      
      independentUsages.forEach(({ prefix, context, usage, bound }) => {
        const result = sutra1458(prefix, {
          context: context,
          usageType: usage,
          boundToRoot: bound,
          independentFunction: !bound,
          standaloneUsage: true,
          asattva: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.usageType).toBe(usage);
        expect(result.boundToRoot).toBe(bound);
        expect(result.independentFunction).toBe(!bound);
        expect(result.standaloneUsage).toBe(true);
      });
    });

    test('distinguishes from bound prefix usage', () => {
      const boundUsages = [
        {
          prefix: 'प्र',
          context: 'प्रगच्छति', // bound to गम्
          bound: true,
          independent: false
        },
        {
          prefix: 'सम्',
          context: 'संगच्छति', // bound to गम्
          bound: true,
          independent: false
        },
        {
          prefix: 'वि',
          context: 'विगच्छति', // bound to गम्
          bound: true,
          independent: false
        }
      ];
      
      boundUsages.forEach(({ prefix, context, bound, independent }) => {
        const result = sutra1458(prefix, {
          context: context,
          boundToRoot: bound,
          independentFunction: independent,
          prefixalUsage: true,
          asattva: false // when bound, may signify substance through the root
        });
        
        expect(result.applies).toBe(false);
        expect(result.reason).toBe('bound_prefix_usage');
      });
    });

    test('analyzes contextual independence', () => {
      const contextualIndependence = [
        {
          prefix: 'अप',
          context: 'अप इति निषेधशब्दः',
          independence: 'semantic',
          function: 'negation_marker'
        },
        {
          prefix: 'उप',
          context: 'उप इति समीपार्थकम्',
          independence: 'syntactic',
          function: 'proximity_marker'
        },
        {
          prefix: 'अति',
          context: 'अति इति अतिक्रमणम्',
          independence: 'pragmatic',
          function: 'excess_marker'
        }
      ];
      
      contextualIndependence.forEach(({ prefix, context, independence, function: func }) => {
        const result = sutra1458(prefix, {
          context: context,
          independenceType: independence,
          semanticFunction: func,
          contextuallyIndependent: true,
          asattva: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.independenceType).toBe(independence);
        expect(result.semanticFunction).toBe(func);
        expect(result.contextuallyIndependent).toBe(true);
      });
    });
  });

  describe('Semantic function analysis', () => {
    test('analyzes directional particle functions', () => {
      const directionalFunctions = [
        { prefix: 'प्र', direction: 'forward', semantics: 'progression' },
        { prefix: 'परा', direction: 'backward', semantics: 'regression' },
        { prefix: 'उत्', direction: 'upward', semantics: 'elevation' },
        { prefix: 'अव', direction: 'downward', semantics: 'descent' }
      ];
      
      directionalFunctions.forEach(({ prefix, direction, semantics }) => {
        const result = sutra1458(prefix, {
          directionalFunction: direction,
          semanticNature: semantics,
          spatialParticle: true,
          independentUsage: true,
          asattva: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.directionalFunction).toBe(direction);
        expect(result.semanticNature).toBe(semantics);
        expect(result.spatialParticle).toBe(true);
      });
    });

    test('analyzes intensifying particle functions', () => {
      const intensifyingFunctions = [
        { prefix: 'सु', intensity: 'positive', semantics: 'enhancement' },
        { prefix: 'अति', intensity: 'excessive', semantics: 'excess' },
        { prefix: 'सम्', intensity: 'completive', semantics: 'completion' },
        { prefix: 'वि', intensity: 'distinctive', semantics: 'specialization' }
      ];
      
      intensifyingFunctions.forEach(({ prefix, intensity, semantics }) => {
        const result = sutra1458(prefix, {
          intensityType: intensity,
          semanticNature: semantics,
          intensifyingParticle: true,
          independentUsage: true,
          asattva: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.intensityType).toBe(intensity);
        expect(result.semanticNature).toBe(semantics);
        expect(result.intensifyingParticle).toBe(true);
      });
    });

    test('analyzes modal particle functions', () => {
      const modalFunctions = [
        { prefix: 'अप', modality: 'negative', semantics: 'negation' },
        { prefix: 'निर्', modality: 'privative', semantics: 'absence' },
        { prefix: 'सह', modality: 'comitative', semantics: 'accompaniment' },
        { prefix: 'अन्तर्', modality: 'interior', semantics: 'interiority' }
      ];
      
      modalFunctions.forEach(({ prefix, modality, semantics }) => {
        const result = sutra1458(prefix, {
          modalType: modality,
          semanticNature: semantics,
          modalParticle: true,
          independentUsage: true,
          asattva: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.modalType).toBe(modality);
        expect(result.semanticNature).toBe(semantics);
        expect(result.modalParticle).toBe(true);
      });
    });
  });

  describe('असत्त्व (non-substance) verification', () => {
    test('verifies non-substantive function', () => {
      const nonSubstantiveUsages = [
        {
          prefix: 'प्र',
          context: 'प्र भवतु मङ्गलम्',
          substantive: false,
          function: 'blessing_particle'
        },
        {
          prefix: 'सम्',
          context: 'सम् गच्छन्तु सर्वे',
          substantive: false,
          function: 'unity_particle'
        },
        {
          prefix: 'वि',
          context: 'वि जयतां धर्मः',
          substantive: false,
          function: 'emphatic_particle'
        }
      ];
      
      nonSubstantiveUsages.forEach(({ prefix, context, substantive, function: func }) => {
        const result = sutra1458(prefix, {
          context: context,
          signifiesSubstance: substantive,
          semanticFunction: func,
          asattva: !substantive,
          functionalRole: 'particle'
        });
        
        expect(result.applies).toBe(true);
        expect(result.signifiesSubstance).toBe(substantive);
        expect(result.semanticFunction).toBe(func);
        expect(result.asattva).toBe(!substantive);
      });
    });

    test('distinguishes from substantive usage', () => {
      const substantiveUsages = [
        {
          prefix: 'प्र',
          context: 'प्र इति उपसर्गः', // प्र as a noun (the prefix प्र)
          substantive: true,
          referential: true
        },
        {
          prefix: 'सम्',
          context: 'सम् इति शब्दः', // सम् as a word/noun
          substantive: true,
          referential: true
        }
      ];
      
      substantiveUsages.forEach(({ prefix, context, substantive, referential }) => {
        const result = sutra1458(prefix, {
          context: context,
          signifiesSubstance: substantive,
          referentialUsage: referential,
          asattva: !substantive
        });
        
        expect(result.applies).toBe(false);
        expect(result.reason).toBe('signifies_substance');
      });
    });

    test('analyzes functional vs referential usage', () => {
      const functionalAnalysis = [
        {
          prefix: 'अप',
          functional: 'निषेधार्थक', // functional as negation
          referential: 'अपशब्दः', // referential as the word 'अप'
          context_functional: 'अप गच्छतु पापम्',
          context_referential: 'अप इति उपसर्गस्य नाम'
        }
      ];
      
      functionalAnalysis.forEach(({ prefix, functional, referential, context_functional, context_referential }) => {
        // Test functional usage (should apply)
        const functionalResult = sutra1458(prefix, {
          context: context_functional,
          usageType: 'functional',
          signifiesSubstance: false,
          asattva: true
        });
        
        expect(functionalResult.applies).toBe(true);
        expect(functionalResult.usageType).toBe('functional');
        
        // Test referential usage (should not apply)
        const referentialResult = sutra1458(prefix, {
          context: context_referential,
          usageType: 'referential',
          signifiesSubstance: true,
          asattva: false
        });
        
        expect(referentialResult.applies).toBe(false);
        expect(referentialResult.reason).toBe('signifies_substance');
      });
    });
  });

  describe('Contextual and pragmatic analysis', () => {
    test('analyzes discourse-level functions', () => {
      const discourseFunctions = [
        {
          prefix: 'प्र',
          discourse: 'initiation',
          pragmatic: 'beginning_marker',
          textual: 'opening'
        },
        {
          prefix: 'सम्',
          discourse: 'culmination',
          pragmatic: 'completion_marker',
          textual: 'conclusion'
        },
        {
          prefix: 'वि',
          discourse: 'specification',
          pragmatic: 'detail_marker',
          textual: 'elaboration'
        }
      ];
      
      discourseFunctions.forEach(({ prefix, discourse, pragmatic, textual }) => {
        const result = sutra1458(prefix, {
          discourseFunction: discourse,
          pragmaticRole: pragmatic,
          textualFunction: textual,
          discourseParticle: true,
          asattva: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.discourseFunction).toBe(discourse);
        expect(result.pragmaticRole).toBe(pragmatic);
        expect(result.textualFunction).toBe(textual);
      });
    });

    test('analyzes exclamatory functions', () => {
      const exclamatoryFunctions = [
        { prefix: 'प्र', exclamation: 'blessing', emotion: 'benediction' },
        { prefix: 'वि', exclamation: 'wonder', emotion: 'amazement' },
        { prefix: 'सु', exclamation: 'appreciation', emotion: 'approval' }
      ];
      
      exclamatoryFunctions.forEach(({ prefix, exclamation, emotion }) => {
        const result = sutra1458(prefix, {
          exclamatoryType: exclamation,
          emotionalTone: emotion,
          exclamatoryParticle: true,
          expressiveFunction: true,
          asattva: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.exclamatoryType).toBe(exclamation);
        expect(result.emotionalTone).toBe(emotion);
        expect(result.exclamatoryParticle).toBe(true);
      });
    });

    test('analyzes ritual and ceremonial functions', () => {
      const ritualFunctions = [
        { prefix: 'स्व', ritual: 'auspicious', ceremony: 'blessing' },
        { prefix: 'सम्', ritual: 'completion', ceremony: 'culmination' },
        { prefix: 'प्र', ritual: 'invocation', ceremony: 'beginning' }
      ];
      
      ritualFunctions.forEach(({ prefix, ritual, ceremony }) => {
        const result = sutra1458(prefix, {
          ritualFunction: ritual,
          ceremonialRole: ceremony,
          sacredContext: true,
          liturgicalParticle: true,
          asattva: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.ritualFunction).toBe(ritual);
        expect(result.ceremonialRole).toBe(ceremony);
        expect(result.sacredContext).toBe(true);
      });
    });
  });

  describe('Multi-script support', () => {
    test('handles Devanagari प्र-series', () => {
      const result = sutra1458('प्र', {
        script: 'Devanagari',
        context: 'प्र भवतु मङ्गलम्',
        independentUsage: true,
        asattva: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('Devanagari');
      expect(result.classification).toBe('निपात');
    });

    test('handles IAST प्र-series', () => {
      const result = sutra1458('pra', {
        script: 'IAST',
        context: 'pra bhavatu maṅgalam',
        independentUsage: true,
        asattva: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('IAST');
      expect(result.classification).toBe('निपात');
    });
  });

  describe('Error handling', () => {
    test('handles empty input', () => {
      const result = sutra1458('');
      expect(result.applies).toBe(false);
      expect(result.error).toBe('empty_input');
    });

    test('handles non-प्र-series elements', () => {
      const result = sutra1458('च', {
        context: 'conjunction particle',
        asattva: true,
        independentUsage: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('not_pra_series_element');
    });

    test('handles bound prefix usage', () => {
      const result = sutra1458('प्र', {
        context: 'प्रगच्छति',
        boundToRoot: true,
        independentUsage: false,
        prefixalUsage: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('bound_prefix_usage');
    });

    test('handles substantive usage', () => {
      const result = sutra1458('प्र', {
        context: 'प्र इति उपसर्गः',
        signifiesSubstance: true,
        asattva: false,
        referentialUsage: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('signifies_substance');
    });
  });

  describe('Integration with निपात system', () => {
    test('integrates with अधिकार scope (1.4.56)', () => {
      const result = sutra1458('प्र', {
        adhikaraScope: 'निपात',
        sutraRange: '1.4.56-1.4.97',
        withinAdhikara: true,
        independentUsage: true,
        asattva: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.adhikaraScope).toBe('निपात');
      expect(result.withinAdhikara).toBe(true);
    });

    test('relates to च-series particles (1.4.57)', () => {
      const result = sutra1458('प्र', {
        relatedToSutra1457: true, // च-series particles
        particleClassification: 'systematic',
        prefixalOrigin: true,
        independentUsage: true,
        asattva: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.relatedToSutra1457).toBe(true);
      expect(result.particleClassification).toBe('systematic');
      expect(result.prefixalOrigin).toBe(true);
    });

    test('distinguishes from verbal prefixes', () => {
      const result = sutra1458('प्र', {
        notVerbalPrefix: true,
        notBoundMorpheme: true,
        independentParticle: true,
        standaloneFunction: true,
        asattva: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.notVerbalPrefix).toBe(true);
      expect(result.notBoundMorpheme).toBe(true);
      expect(result.independentParticle).toBe(true);
    });
  });

  describe('Edge cases', () => {
    test('handles archaic and Vedic usage', () => {
      const result = sutra1458('प्र', {
        archaicForm: true,
        vedicUsage: true,
        historicalContext: 'vedic_sanskrit',
        independentUsage: true,
        asattva: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.archaicForm).toBe(true);
      expect(result.vedicUsage).toBe(true);
      expect(result.historicalContext).toBe('vedic_sanskrit');
    });

    test('handles mantra and hymnic contexts', () => {
      const result = sutra1458('प्र', {
        mantricContext: true,
        hymnicUsage: true,
        ritualParticle: true,
        sacredFunction: true,
        asattva: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.mantricContext).toBe(true);
      expect(result.hymnicUsage).toBe(true);
      expect(result.ritualParticle).toBe(true);
    });

    test('handles metrical and prosodic contexts', () => {
      const result = sutra1458('प्र', {
        metricalContext: true,
        prosodicFunction: true,
        rhythmicParticle: true,
        poeticUsage: true,
        asattva: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.metricalContext).toBe(true);
      expect(result.prosodicFunction).toBe(true);
      expect(result.rhythmicParticle).toBe(true);
    });

    test('handles philosophical and technical discourse', () => {
      const result = sutra1458('प्र', {
        philosophicalContext: true,
        technicalDiscourse: true,
        conceptualParticle: true,
        abstractFunction: true,
        asattva: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.philosophicalContext).toBe(true);
      expect(result.technicalDiscourse).toBe(true);
      expect(result.conceptualParticle).toBe(true);
    });
  });
});
