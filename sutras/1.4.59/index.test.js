/**
 * Test suite for Sutra 1.4.59: उपसर्गाः क्रियायोगे
 * 
 * This sutra establishes that प्र etc. get the designation उपसर्ग 
 * when in composition with verbs.
 */

import { sutra1459 } from './index.js';

describe('Sutra 1.4.59: उपसर्गाः क्रियायोगे (upasargāḥ kriyāyoge)', () => {
  
  describe('Prefix-verb combination identification', () => {
    test('identifies basic prefix-verb compositions', () => {
      const basicCompositions = [
        { prefix: 'प्र', verb: 'गम्', composition: 'प्रगच्छति', meaning: 'goes_forth' },
        { prefix: 'सम्', verb: 'स्था', composition: 'संतिष्ठति', meaning: 'stands_together' },
        { prefix: 'वि', verb: 'कृ', composition: 'विकरोति', meaning: 'makes_specially' },
        { prefix: 'उप', verb: 'गम्', composition: 'उपगच्छति', meaning: 'approaches' },
        { prefix: 'अप', verb: 'नी', composition: 'अपनयति', meaning: 'leads_away' }
      ];
      
      basicCompositions.forEach(({ prefix, verb, composition, meaning }) => {
        const result = sutra1459(prefix, verb, {
          context: composition,
          kriyaYoga: true,
          compositeForm: composition,
          semanticMeaning: meaning,
          boundToVerb: true,
          designation: 'उपसर्ग'
        });
        
        expect(result.applies).toBe(true);
        expect(result.classification).toBe('उपसर्ग');
        expect(result.kriyaYoga).toBe(true);
        expect(result.compositeForm).toBe(composition);
        expect(result.semanticMeaning).toBe(meaning);
        expect(result.boundToVerb).toBe(true);
      });
    });

    test('identifies complex multi-prefix compositions', () => {
      const multiPrefixCompositions = [
        {
          prefixes: ['अनु', 'प्र'],
          verb: 'विश्',
          composition: 'अनुप्रविशति',
          meaning: 'enters_following_forth'
        },
        {
          prefixes: ['सम्', 'उप'],
          verb: 'गम्',
          composition: 'समुपगच्छति',
          meaning: 'approaches_together'
        },
        {
          prefixes: ['नि', 'सम्'],
          verb: 'धा',
          composition: 'निसंदधाति',
          meaning: 'places_down_together'
        }
      ];
      
      multiPrefixCompositions.forEach(({ prefixes, verb, composition, meaning }) => {
        const result = sutra1459(prefixes, verb, {
          context: composition,
          kriyaYoga: true,
          multiPrefix: true,
          prefixSequence: prefixes,
          compositeForm: composition,
          semanticMeaning: meaning
        });
        
        expect(result.applies).toBe(true);
        expect(result.classification).toBe('उपसर्ग');
        expect(result.multiPrefix).toBe(true);
        expect(result.prefixSequence).toEqual(prefixes);
      });
    });

    test('analyzes verbal root types', () => {
      const verbalRootTypes = [
        { prefix: 'प्र', verb: 'भू', type: 'bhvadi', composition: 'प्रभवति' },
        { prefix: 'सम्', verb: 'अद्', type: 'adadi', composition: 'समत्ति' },
        { prefix: 'वि', verb: 'हु', type: 'juhotyadi', composition: 'विजुहोति' },
        { prefix: 'उप', verb: 'दिव्', type: 'divadi', composition: 'उपदीव्यति' },
        { prefix: 'अधि', verb: 'कृ', type: 'tanadi', composition: 'अधिकरोति' }
      ];
      
      verbalRootTypes.forEach(({ prefix, verb, type, composition }) => {
        const result = sutra1459(prefix, verb, {
          context: composition,
          kriyaYoga: true,
          verbalClass: type,
          rootType: type,
          compositeForm: composition
        });
        
        expect(result.applies).toBe(true);
        expect(result.verbalClass).toBe(type);
        expect(result.rootType).toBe(type);
      });
    });
  });

  describe('उपसर्ग classification in bound contexts', () => {
    test('assigns उपसर्ग designation in verbal composition', () => {
      const upasargaAssignments = [
        {
          prefix: 'प्र',
          verb: 'कृ',
          designation: 'उपसर्ग',
          function: 'forward_action',
          semanticRole: 'directional'
        },
        {
          prefix: 'सम्',
          verb: 'धा',
          designation: 'उपसर्ग',
          function: 'complete_action',
          semanticRole: 'completive'
        },
        {
          prefix: 'वि',
          verb: 'भज्',
          designation: 'उपसर्ग',
          function: 'special_action',
          semanticRole: 'specifying'
        }
      ];
      
      upasargaAssignments.forEach(({ prefix, verb, designation, function: func, semanticRole }) => {
        const result = sutra1459(prefix, verb, {
          kriyaYoga: true,
          technicalDesignation: designation,
          prefixFunction: func,
          semanticRole: semanticRole,
          boundContext: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.classification).toBe(designation);
        expect(result.technicalDesignation).toBe(designation);
        expect(result.prefixFunction).toBe(func);
        expect(result.semanticRole).toBe(semanticRole);
      });
    });

    test('distinguishes from निपात usage when independent', () => {
      const comparisons = [
        {
          prefix: 'प्र',
          verb: 'गम्',
          boundContext: 'प्रगच्छति', // bound = उपसर्ग
          independentContext: 'प्र तत् गच्छतु', // independent = निपात
          boundDesignation: 'उपसर्ग',
          independentDesignation: 'निपात'
        },
        {
          prefix: 'सम्',
          verb: 'कृ',
          boundContext: 'संकरोति', // bound = उपसर्ग
          independentContext: 'सम् इति शुभम्', // independent = निपात
          boundDesignation: 'उपसर्ग',
          independentDesignation: 'निपात'
        }
      ];
      
      comparisons.forEach(({ prefix, verb, boundContext, independentContext, boundDesignation, independentDesignation }) => {
        // Test bound usage (should apply as उपसर्ग)
        const boundResult = sutra1459(prefix, verb, {
          context: boundContext,
          kriyaYoga: true,
          boundToVerb: true,
          independentUsage: false
        });
        
        expect(boundResult.applies).toBe(true);
        expect(boundResult.classification).toBe(boundDesignation);
        
        // Test independent usage (should not apply to this sutra)
        const independentResult = sutra1459(prefix, null, {
          context: independentContext,
          kriyaYoga: false,
          boundToVerb: false,
          independentUsage: true
        });
        
        expect(independentResult.applies).toBe(false);
        expect(independentResult.reason).toBe('no_kriya_yoga');
      });
    });

    test('analyzes modification of verbal meaning', () => {
      const meaningModifications = [
        {
          prefix: 'प्र',
          verb: 'कृ',
          original: 'make',
          modified: 'make_forth/produce',
          modification: 'directional_enhancement'
        },
        {
          prefix: 'वि',
          verb: 'भज्',
          original: 'share',
          modified: 'distribute/separate',
          modification: 'distributive_specialization'
        },
        {
          prefix: 'सम्',
          verb: 'धा',
          original: 'place',
          modified: 'place_together/arrange',
          modification: 'collective_completion'
        }
      ];
      
      meaningModifications.forEach(({ prefix, verb, original, modified, modification }) => {
        const result = sutra1459(prefix, verb, {
          kriyaYoga: true,
          originalMeaning: original,
          modifiedMeaning: modified,
          meaningModification: modification,
          semanticEnhancement: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.originalMeaning).toBe(original);
        expect(result.modifiedMeaning).toBe(modified);
        expect(result.meaningModification).toBe(modification);
      });
    });
  });

  describe('Morphophonetic integration', () => {
    test('handles sandhi in prefix-verb compositions', () => {
      const sandhiCases = [
        {
          prefix: 'सम्',
          verb: 'गम्',
          beforeSandhi: 'सम् + गम्',
          afterSandhi: 'संगम्',
          sandhiType: 'anusvara_substitution',
          rule: 'nasal_assimilation'
        },
        {
          prefix: 'उत्',
          verb: 'कृ',
          beforeSandhi: 'उत् + कृ',
          afterSandhi: 'उत्कृ',
          sandhiType: 'consonant_retention',
          rule: 'no_change_before_kappa'
        },
        {
          prefix: 'निर्',
          verb: 'गम्',
          beforeSandhi: 'निर् + गम्',
          afterSandhi: 'निर्गम्',
          sandhiType: 'visarga_retention',
          rule: 'visarga_before_ghosa'
        }
      ];
      
      sandhiCases.forEach(({ prefix, verb, beforeSandhi, afterSandhi, sandhiType, rule }) => {
        const result = sutra1459(prefix, verb, {
          kriyaYoga: true,
          beforeSandhi: beforeSandhi,
          afterSandhi: afterSandhi,
          sandhiApplied: true,
          sandhiType: sandhiType,
          sandhiRule: rule
        });
        
        expect(result.applies).toBe(true);
        expect(result.beforeSandhi).toBe(beforeSandhi);
        expect(result.afterSandhi).toBe(afterSandhi);
        expect(result.sandhiType).toBe(sandhiType);
      });
    });

    test('analyzes morphological integration', () => {
      const morphologicalIntegration = [
        {
          prefix: 'प्र',
          verb: 'भू',
          tense: 'present',
          person: 'third',
          number: 'singular',
          form: 'प्रभवति',
          morphology: 'prefix_root_ending'
        },
        {
          prefix: 'सम्',
          verb: 'आ_गम्',
          tense: 'aorist',
          person: 'third',
          number: 'plural',
          form: 'समागच्छन्',
          morphology: 'complex_composition'
        }
      ];
      
      morphologicalIntegration.forEach(({ prefix, verb, tense, person, number, form, morphology }) => {
        const result = sutra1459(prefix, verb, {
          kriyaYoga: true,
          verbalTense: tense,
          grammaticalPerson: person,
          grammaticalNumber: number,
          inflectedForm: form,
          morphologicalStructure: morphology
        });
        
        expect(result.applies).toBe(true);
        expect(result.verbalTense).toBe(tense);
        expect(result.inflectedForm).toBe(form);
        expect(result.morphologicalStructure).toBe(morphology);
      });
    });
  });

  describe('Semantic and functional analysis', () => {
    test('analyzes directional functions', () => {
      const directionalFunctions = [
        { prefix: 'प्र', direction: 'forward', semantics: 'progression' },
        { prefix: 'परा', direction: 'backward', semantics: 'regression' },
        { prefix: 'उत्', direction: 'upward', semantics: 'elevation' },
        { prefix: 'अव', direction: 'downward', semantics: 'descent' },
        { prefix: 'अप', direction: 'away', semantics: 'separation' }
      ];
      
      directionalFunctions.forEach(({ prefix, direction, semantics }) => {
        const result = sutra1459(prefix, 'गम्', {
          kriyaYoga: true,
          directionalFunction: direction,
          semanticNature: semantics,
          spatialModification: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.directionalFunction).toBe(direction);
        expect(result.semanticNature).toBe(semantics);
        expect(result.spatialModification).toBe(true);
      });
    });

    test('analyzes aspectual functions', () => {
      const aspectualFunctions = [
        { prefix: 'सम्', aspect: 'completive', semantics: 'perfection' },
        { prefix: 'वि', aspect: 'distributive', semantics: 'specification' },
        { prefix: 'अति', aspect: 'excessive', semantics: 'intensification' },
        { prefix: 'उप', aspect: 'approximative', semantics: 'nearness' }
      ];
      
      aspectualFunctions.forEach(({ prefix, aspect, semantics }) => {
        const result = sutra1459(prefix, 'कृ', {
          kriyaYoga: true,
          aspectualFunction: aspect,
          semanticNature: semantics,
          aspectualModification: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.aspectualFunction).toBe(aspect);
        expect(result.semanticNature).toBe(semantics);
        expect(result.aspectualModification).toBe(true);
      });
    });

    test('analyzes modal functions', () => {
      const modalFunctions = [
        { prefix: 'अप', modality: 'privative', semantics: 'negation' },
        { prefix: 'निर्', modality: 'ablative', semantics: 'removal' },
        { prefix: 'अभि', modality: 'intensive', semantics: 'emphasis' },
        { prefix: 'अध्', modality: 'superior', semantics: 'dominance' }
      ];
      
      modalFunctions.forEach(({ prefix, modality, semantics }) => {
        const result = sutra1459(prefix, 'गम्', {
          kriyaYoga: true,
          modalFunction: modality,
          semanticNature: semantics,
          modalModification: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.modalFunction).toBe(modality);
        expect(result.semanticNature).toBe(semantics);
        expect(result.modalModification).toBe(true);
      });
    });
  });

  describe('Verbal derivation and causation', () => {
    test('handles causative formations', () => {
      const causativeFormations = [
        {
          prefix: 'प्र',
          rootVerb: 'भू',
          causative: 'भावयति',
          composition: 'प्रभावयति',
          meaning: 'causes_to_come_forth'
        },
        {
          prefix: 'सम्',
          rootVerb: 'गम्',
          causative: 'गमयति',
          composition: 'संगमयति',
          meaning: 'causes_to_come_together'
        }
      ];
      
      causativeFormations.forEach(({ prefix, rootVerb, causative, composition, meaning }) => {
        const result = sutra1459(prefix, causative, {
          kriyaYoga: true,
          originalRoot: rootVerb,
          causativeForm: causative,
          prefixedCausative: composition,
          causativeSemantics: meaning,
          derivedVerb: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.originalRoot).toBe(rootVerb);
        expect(result.causativeForm).toBe(causative);
        expect(result.prefixedCausative).toBe(composition);
        expect(result.derivedVerb).toBe(true);
      });
    });

    test('handles denominative formations', () => {
      const denominativeFormations = [
        {
          prefix: 'अभि',
          nominal: 'राज्',
          denominative: 'राज्यति',
          composition: 'अभिराज्यति',
          meaning: 'rules_over'
        },
        {
          prefix: 'उप',
          nominal: 'देव',
          denominative: 'देवयति',
          composition: 'उपदेवयति',
          meaning: 'serves_as_deity'
        }
      ];
      
      denominativeFormations.forEach(({ prefix, nominal, denominative, composition, meaning }) => {
        const result = sutra1459(prefix, denominative, {
          kriyaYoga: true,
          originalNominal: nominal,
          denominativeForm: denominative,
          prefixedDenominative: composition,
          denominativeSemantics: meaning,
          nominalOrigin: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.originalNominal).toBe(nominal);
        expect(result.denominativeForm).toBe(denominative);
        expect(result.prefixedDenominative).toBe(composition);
        expect(result.nominalOrigin).toBe(true);
      });
    });

    test('handles desiderative formations', () => {
      const desiderativeFormations = [
        {
          prefix: 'प्र',
          rootVerb: 'गम्',
          desiderative: 'जिगमिषति',
          composition: 'प्रजिगमिषति',
          meaning: 'desires_to_go_forth'
        },
        {
          prefix: 'सम्',
          rootVerb: 'कृ',
          desiderative: 'चिकीर्षति',
          composition: 'संचिकीर्षति',
          meaning: 'desires_to_accomplish'
        }
      ];
      
      desiderativeFormations.forEach(({ prefix, rootVerb, desiderative, composition, meaning }) => {
        const result = sutra1459(prefix, desiderative, {
          kriyaYoga: true,
          originalRoot: rootVerb,
          desiderativeForm: desiderative,
          prefixedDesiderative: composition,
          desiderativeSemantics: meaning,
          intentionalAspect: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.originalRoot).toBe(rootVerb);
        expect(result.desiderativeForm).toBe(desiderative);
        expect(result.prefixedDesiderative).toBe(composition);
        expect(result.intentionalAspect).toBe(true);
      });
    });
  });

  describe('Multi-script support', () => {
    test('handles Devanagari prefix-verb compositions', () => {
      const result = sutra1459('प्र', 'गम्', {
        script: 'Devanagari',
        context: 'प्रगच्छति',
        kriyaYoga: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('Devanagari');
      expect(result.classification).toBe('उपसर्ग');
    });

    test('handles IAST prefix-verb compositions', () => {
      const result = sutra1459('pra', 'gam', {
        script: 'IAST',
        context: 'pragacchati',
        kriyaYoga: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('IAST');
      expect(result.classification).toBe('उपसर्ग');
    });
  });

  describe('Error handling', () => {
    test('handles missing verb parameter', () => {
      const result = sutra1459('प्र', null, {
        context: 'standalone usage'
      });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('missing_verb');
    });

    test('handles non-verbal second parameter', () => {
      const result = sutra1459('प्र', 'देव', {
        context: 'प्रदेव',
        kriyaYoga: false,
        nominalComposition: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('non_verbal_composition');
    });

    test('handles non-prefix first parameter', () => {
      const result = sutra1459('च', 'गम्', {
        context: 'invalid combination',
        kriyaYoga: false
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('not_upasarga_element');
    });

    test('handles independent prefix usage', () => {
      const result = sutra1459('प्र', null, {
        context: 'प्र तत् गच्छतु',
        independentUsage: true,
        kriyaYoga: false
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('no_kriya_yoga');
    });
  });

  describe('Integration with classification systems', () => {
    test('relates to निपात classification (1.4.58)', () => {
      const result = sutra1459('प्र', 'गम्', {
        kriyaYoga: true,
        relatedToSutra1458: true, // निपात when independent
        dualClassification: true,
        contextDependent: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.relatedToSutra1458).toBe(true);
      expect(result.dualClassification).toBe(true);
      expect(result.contextDependent).toBe(true);
    });

    test('integrates with गति classification (1.4.60)', () => {
      const result = sutra1459('प्र', 'गम्', {
        kriyaYoga: true,
        alsoGatiDesignation: true, // will get गति designation in 1.4.60
        tripleClassification: true,
        movementVerb: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.alsoGatiDesignation).toBe(true);
      expect(result.tripleClassification).toBe(true);
      expect(result.movementVerb).toBe(true);
    });

    test('distinguishes from अव्यय classification', () => {
      const result = sutra1459('प्र', 'कृ', {
        kriyaYoga: true,
        notAvyaya: true, // when bound, not indeclinable
        inflectionallyBound: true,
        compositionalElement: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.notAvyaya).toBe(true);
      expect(result.inflectionallyBound).toBe(true);
      expect(result.compositionalElement).toBe(true);
    });
  });

  describe('Edge cases', () => {
    test('handles Vedic and archaic compositions', () => {
      const result = sutra1459('प्र', 'इ', {
        kriyaYoga: true,
        vedicForm: true,
        archaicComposition: 'प्रैति',
        historicalContext: 'vedic_sanskrit'
      });
      
      expect(result.applies).toBe(true);
      expect(result.vedicForm).toBe(true);
      expect(result.archaicComposition).toBe('प्रैति');
      expect(result.historicalContext).toBe('vedic_sanskrit');
    });

    test('handles metaphorical and extended usage', () => {
      const result = sutra1459('प्र', 'काश्', {
        kriyaYoga: true,
        metaphoricalUsage: true,
        extendedMeaning: 'manifest',
        poeticContext: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.metaphoricalUsage).toBe(true);
      expect(result.extendedMeaning).toBe('manifest');
      expect(result.poeticContext).toBe(true);
    });

    test('handles technical and philosophical contexts', () => {
      const result = sutra1459('वि', 'कल्प्', {
        kriyaYoga: true,
        technicalContext: true,
        philosophicalUsage: true,
        conceptualMeaning: 'alternative_arrangement'
      });
      
      expect(result.applies).toBe(true);
      expect(result.technicalContext).toBe(true);
      expect(result.philosophicalUsage).toBe(true);
      expect(result.conceptualMeaning).toBe('alternative_arrangement');
    });

    test('handles compound verbal forms', () => {
      const result = sutra1459(['सम्', 'उप'], 'आ_गम्', {
        kriyaYoga: true,
        complexComposition: true,
        multiElementPrefix: true,
        compoundVerb: 'समुपागम्'
      });
      
      expect(result.applies).toBe(true);
      expect(result.complexComposition).toBe(true);
      expect(result.multiElementPrefix).toBe(true);
      expect(result.compoundVerb).toBe('समुपागम्');
    });
  });
});
