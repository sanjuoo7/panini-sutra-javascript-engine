/**
 * Test suite for Sutra 1.4.57: चादयोऽसत्त्वे
 * 
 * This sutra defines च etc. as निपात when not signifying substances.
 */

import { sutra1457 } from './index.js';

describe('Sutra 1.4.57: चादयोऽसत्त्वे (cādayo \'sattve)', () => {
  
  describe('च-series particle identification', () => {
    test('identifies basic च-series particles', () => {
      const chaSeries = [
        { particle: 'च', meaning: 'and', type: 'conjunctive' },
        { particle: 'वा', meaning: 'or', type: 'disjunctive' },
        { particle: 'तु', meaning: 'but', type: 'adversative' },
        { particle: 'किन्तु', meaning: 'however', type: 'adversative' },
        { particle: 'परन्तु', meaning: 'nevertheless', type: 'adversative' }
      ];
      
      chaSeries.forEach(({ particle, meaning, type }) => {
        const result = sutra1457(particle, {
          context: `${particle} का प्रयोग`,
          particleMeaning: meaning,
          particleType: type,
          signifiesSubstance: false,
          asattva: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.classification).toBe('निपात');
        expect(result.particleMeaning).toBe(meaning);
        expect(result.particleType).toBe(type);
        expect(result.asattva).toBe(true);
        expect(result.signifiesSubstance).toBe(false);
      });
    });

    test('identifies extended च-series particles', () => {
      const extendedSeries = [
        { particle: 'अथच', meaning: 'and then', type: 'sequential' },
        { particle: 'तथच', meaning: 'and so', type: 'consequential' },
        { particle: 'यदच', meaning: 'and if', type: 'conditional' },
        { particle: 'किमच', meaning: 'and what', type: 'interrogative' }
      ];
      
      extendedSeries.forEach(({ particle, meaning, type }) => {
        const result = sutra1457(particle, {
          context: `विस्तृत प्रयोग में ${particle}`,
          particleMeaning: meaning,
          particleType: type,
          extendedSeries: true,
          asattva: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.classification).toBe('निपात');
        expect(result.extendedSeries).toBe(true);
        expect(result.asattva).toBe(true);
      });
    });

    test('identifies compound च-forms', () => {
      const compoundForms = [
        { particle: 'अपिच', components: ['अपि', 'च'], meaning: 'and also' },
        { particle: 'एवच', components: ['एव', 'च'], meaning: 'and indeed' },
        { particle: 'हिच', components: ['हि', 'च'], meaning: 'and verily' }
      ];
      
      compoundForms.forEach(({ particle, components, meaning }) => {
        const result = sutra1457(particle, {
          context: `संयुक्त रूप में ${particle}`,
          components: components,
          particleMeaning: meaning,
          compoundForm: true,
          asattva: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.classification).toBe('निपात');
        expect(result.components).toEqual(components);
        expect(result.compoundForm).toBe(true);
      });
    });
  });

  describe('असत्त्व (non-substance) analysis', () => {
    test('verifies non-substantive function', () => {
      const nonSubstantiveUsages = [
        { 
          particle: 'च', 
          context: 'रामः सीता च गच्छतः',
          function: 'coordination',
          substantive: false 
        },
        { 
          particle: 'वा', 
          context: 'चायं वा कॉफी वा',
          function: 'alternation',
          substantive: false 
        },
        { 
          particle: 'तु', 
          context: 'सः गच्छति तु न आगच्छति',
          function: 'contrast',
          substantive: false 
        }
      ];
      
      nonSubstantiveUsages.forEach(({ particle, context, function: func, substantive }) => {
        const result = sutra1457(particle, {
          context: context,
          semanticFunction: func,
          signifiesSubstance: substantive,
          asattva: !substantive,
          functionalRole: 'connective'
        });
        
        expect(result.applies).toBe(true);
        expect(result.semanticFunction).toBe(func);
        expect(result.signifiesSubstance).toBe(substantive);
        expect(result.asattva).toBe(!substantive);
      });
    });

    test('analyzes relational vs referential function', () => {
      const functionalAnalysis = [
        { 
          particle: 'च', 
          function: 'relational',
          refers: false,
          connects: true 
        },
        { 
          particle: 'वा', 
          function: 'relational',
          refers: false,
          connects: true 
        },
        { 
          particle: 'अपि', 
          function: 'relational',
          refers: false,
          modifies: true 
        }
      ];
      
      functionalAnalysis.forEach(({ particle, function: func, refers, connects, modifies }) => {
        const result = sutra1457(particle, {
          semanticFunction: func,
          referential: refers,
          connective: connects,
          modificational: modifies,
          asattva: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.semanticFunction).toBe(func);
        expect(result.referential).toBe(refers);
        if (connects !== undefined) expect(result.connective).toBe(connects);
        if (modifies !== undefined) expect(result.modificational).toBe(modifies);
      });
    });

    test('distinguishes from substantive homonyms', () => {
      const homonymDistinctions = [
        {
          word: 'च',
          substantiveContext: 'च इति अक्षरम्', // च as a letter/substance
          particleContext: 'रामः च सीता च', // च as conjunction
          distinctionClear: true
        },
        {
          word: 'तु',
          substantiveContext: 'तु इति शब्दः', // तु as a word/substance  
          particleContext: 'गच्छति तु न आगच्छति', // तु as adversative
          distinctionClear: true
        }
      ];
      
      homonymDistinctions.forEach(({ word, substantiveContext, particleContext, distinctionClear }) => {
        // Test substantive usage (should not apply)
        const substantiveResult = sutra1457(word, {
          context: substantiveContext,
          signifiesSubstance: true,
          asattva: false,
          referentialUsage: true
        });
        
        expect(substantiveResult.applies).toBe(false);
        expect(substantiveResult.reason).toBe('signifies_substance');
        
        // Test particle usage (should apply)
        const particleResult = sutra1457(word, {
          context: particleContext,
          signifiesSubstance: false,
          asattva: true,
          functionalUsage: true
        });
        
        expect(particleResult.applies).toBe(true);
        expect(particleResult.asattva).toBe(true);
      });
    });
  });

  describe('Semantic function analysis', () => {
    test('analyzes conjunctive functions', () => {
      const conjunctiveFunctions = [
        { particle: 'च', function: 'additive', semantics: 'addition' },
        { particle: 'अपिच', function: 'inclusive', semantics: 'inclusion' },
        { particle: 'तथाच', function: 'sequential', semantics: 'sequence' },
        { particle: 'एवच', function: 'emphatic', semantics: 'emphasis' }
      ];
      
      conjunctiveFunctions.forEach(({ particle, function: func, semantics }) => {
        const result = sutra1457(particle, {
          conjunctiveType: func,
          semanticNature: semantics,
          coordinationFunction: true,
          asattva: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.conjunctiveType).toBe(func);
        expect(result.semanticNature).toBe(semantics);
        expect(result.coordinationFunction).toBe(true);
      });
    });

    test('analyzes disjunctive functions', () => {
      const disjunctiveFunctions = [
        { particle: 'वा', function: 'alternative', semantics: 'choice' },
        { particle: 'अथवा', function: 'exclusive', semantics: 'exclusion' },
        { particle: 'किम्वा', function: 'interrogative', semantics: 'question' },
        { particle: 'उत', function: 'uncertainty', semantics: 'doubt' }
      ];
      
      disjunctiveFunctions.forEach(({ particle, function: func, semantics }) => {
        const result = sutra1457(particle, {
          disjunctiveType: func,
          semanticNature: semantics,
          alternationFunction: true,
          asattva: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.disjunctiveType).toBe(func);
        expect(result.semanticNature).toBe(semantics);
        expect(result.alternationFunction).toBe(true);
      });
    });

    test('analyzes adversative functions', () => {
      const adversativeFunctions = [
        { particle: 'तु', function: 'contrast', semantics: 'opposition' },
        { particle: 'किन्तु', function: 'restriction', semantics: 'limitation' },
        { particle: 'परन्तु', function: 'exception', semantics: 'exclusion' },
        { particle: 'अथतु', function: 'transition', semantics: 'shift' }
      ];
      
      adversativeFunctions.forEach(({ particle, function: func, semantics }) => {
        const result = sutra1457(particle, {
          adversativeType: func,
          semanticNature: semantics,
          contrastFunction: true,
          asattva: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.adversativeType).toBe(func);
        expect(result.semanticNature).toBe(semantics);
        expect(result.contrastFunction).toBe(true);
      });
    });
  });

  describe('Contextual usage patterns', () => {
    test('analyzes coordination contexts', () => {
      const coordinationContexts = [
        {
          particle: 'च',
          context: 'रामः सीता च लक्ष्मणः च',
          pattern: 'multiple_coordination',
          elements: ['रामः', 'सीता', 'लक्ष्मणः']
        },
        {
          particle: 'च',
          context: 'सुन्दरः च बुद्धिमान् च',
          pattern: 'attribute_coordination',
          elements: ['सुन्दरः', 'बुद्धिमान्']
        }
      ];
      
      coordinationContexts.forEach(({ particle, context, pattern, elements }) => {
        const result = sutra1457(particle, {
          context: context,
          usagePattern: pattern,
          coordinatedElements: elements,
          asattva: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.usagePattern).toBe(pattern);
        expect(result.coordinatedElements).toEqual(elements);
      });
    });

    test('analyzes alternative contexts', () => {
      const alternativeContexts = [
        {
          particle: 'वा',
          context: 'चायं वा कॉफी वा',
          pattern: 'exclusive_choice',
          alternatives: ['चायं', 'कॉफी']
        },
        {
          particle: 'वा',
          context: 'गृहे वा वने वा',
          pattern: 'location_choice',
          alternatives: ['गृहे', 'वने']
        }
      ];
      
      alternativeContexts.forEach(({ particle, context, pattern, alternatives }) => {
        const result = sutra1457(particle, {
          context: context,
          usagePattern: pattern,
          alternativeElements: alternatives,
          asattva: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.usagePattern).toBe(pattern);
        expect(result.alternativeElements).toEqual(alternatives);
      });
    });

    test('analyzes contrast contexts', () => {
      const contrastContexts = [
        {
          particle: 'तु',
          context: 'सः गच्छति तु सा तिष्ठति',
          pattern: 'action_contrast',
          contrasted: ['गच्छति', 'तिष्ठति']
        },
        {
          particle: 'किन्तु',
          context: 'धनी किन्तु दुःखी',
          pattern: 'quality_contrast',
          contrasted: ['धनी', 'दुःखी']
        }
      ];
      
      contrastContexts.forEach(({ particle, context, pattern, contrasted }) => {
        const result = sutra1457(particle, {
          context: context,
          usagePattern: pattern,
          contrastedElements: contrasted,
          asattva: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.usagePattern).toBe(pattern);
        expect(result.contrastedElements).toEqual(contrasted);
      });
    });
  });

  describe('Scope and positioning', () => {
    test('analyzes clause-level scope', () => {
      const clauseScopes = [
        {
          particle: 'च',
          scope: 'clause_coordination',
          level: 'clausal',
          position: 'medial'
        },
        {
          particle: 'वा',
          scope: 'clause_alternation',
          level: 'clausal',
          position: 'medial'
        }
      ];
      
      clauseScopes.forEach(({ particle, scope, level, position }) => {
        const result = sutra1457(particle, {
          scopeType: scope,
          scopeLevel: level,
          positionalTendency: position,
          asattva: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.scopeType).toBe(scope);
        expect(result.scopeLevel).toBe(level);
        expect(result.positionalTendency).toBe(position);
      });
    });

    test('analyzes phrase-level scope', () => {
      const phraseScopes = [
        {
          particle: 'च',
          scope: 'phrase_coordination',
          level: 'phrasal',
          attachment: 'right'
        },
        {
          particle: 'वा',
          scope: 'phrase_alternation',
          level: 'phrasal',
          attachment: 'right'
        }
      ];
      
      phraseScopes.forEach(({ particle, scope, level, attachment }) => {
        const result = sutra1457(particle, {
          scopeType: scope,
          scopeLevel: level,
          attachmentDirection: attachment,
          asattva: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.scopeType).toBe(scope);
        expect(result.scopeLevel).toBe(level);
        expect(result.attachmentDirection).toBe(attachment);
      });
    });

    test('analyzes word-level scope', () => {
      const wordScopes = [
        {
          particle: 'च',
          scope: 'word_coordination',
          level: 'lexical',
          attachment: 'enclitic'
        },
        {
          particle: 'अपि',
          scope: 'word_modification',
          level: 'lexical',
          attachment: 'enclitic'
        }
      ];
      
      wordScopes.forEach(({ particle, scope, level, attachment }) => {
        const result = sutra1457(particle, {
          scopeType: scope,
          scopeLevel: level,
          attachmentType: attachment,
          asattva: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.scopeType).toBe(scope);
        expect(result.scopeLevel).toBe(level);
        expect(result.attachmentType).toBe(attachment);
      });
    });
  });

  describe('Multi-script support', () => {
    test('handles Devanagari च-series', () => {
      const result = sutra1457('च', {
        script: 'Devanagari',
        context: 'रामः च सीता च',
        asattva: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('Devanagari');
      expect(result.classification).toBe('निपात');
    });

    test('handles IAST च-series', () => {
      const result = sutra1457('ca', {
        script: 'IAST',
        context: 'rāmaḥ ca sītā ca',
        asattva: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('IAST');
      expect(result.classification).toBe('निपात');
    });
  });

  describe('Error handling', () => {
    test('handles empty input', () => {
      const result = sutra1457('');
      expect(result.applies).toBe(false);
      expect(result.error).toBe('empty_input');
    });

    test('handles non-च-series particles', () => {
      const result = sutra1457('किम्', {
        context: 'interrogative particle',
        asattva: true,
        particleType: 'interrogative'
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('not_cha_series_particle');
    });

    test('handles substantive usage of च-series words', () => {
      const result = sutra1457('च', {
        context: 'च इति अक्षरम्',
        signifiesSubstance: true,
        asattva: false,
        referentialUsage: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('signifies_substance');
    });

    test('handles ambiguous semantic function', () => {
      const result = sutra1457('च', {
        context: 'अस्पष्ट सन्दर्भ',
        semanticFunction: 'unclear',
        asattva: 'uncertain'
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('unclear_semantic_function');
    });
  });

  describe('Integration with निपात system', () => {
    test('integrates with अधिकार scope (1.4.56)', () => {
      const result = sutra1457('च', {
        adhikaraScope: 'निपात',
        sutraRange: '1.4.56-1.4.97',
        withinAdhikara: true,
        asattva: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.adhikaraScope).toBe('निपात');
      expect(result.withinAdhikara).toBe(true);
    });

    test('relates to other particle sutras', () => {
      const result = sutra1457('च', {
        relatedToSutra1456: true, // अधिकार sutra
        relatedToSutra1458: true, // प्रादयः sutra
        particleClassification: 'systematic',
        asattva: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.relatedToSutra1456).toBe(true);
      expect(result.relatedToSutra1458).toBe(true);
      expect(result.particleClassification).toBe('systematic');
    });

    test('distinguishes from other word classes', () => {
      const result = sutra1457('च', {
        notNoun: true,
        notVerb: true,
        notAdjective: true,
        pureParticle: true,
        asattva: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.notNoun).toBe(true);
      expect(result.notVerb).toBe(true);
      expect(result.notAdjective).toBe(true);
      expect(result.pureParticle).toBe(true);
    });
  });

  describe('Edge cases', () => {
    test('handles archaic and Vedic च-forms', () => {
      const result = sutra1457('चाहम्', {
        archaicForm: true,
        vedicUsage: true,
        historicalContext: 'vedic_sanskrit',
        asattva: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.archaicForm).toBe(true);
      expect(result.vedicUsage).toBe(true);
      expect(result.historicalContext).toBe('vedic_sanskrit');
    });

    test('handles च in compound formations', () => {
      const result = sutra1457('च', {
        compoundMember: true,
        compoundPosition: 'final',
        compoundType: 'dvandva',
        asattva: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.compoundMember).toBe(true);
      expect(result.compoundPosition).toBe('final');
      expect(result.compoundType).toBe('dvandva');
    });

    test('handles च in metrical contexts', () => {
      const result = sutra1457('च', {
        metricalContext: true,
        prosodyRequirement: 'syllable_count',
        poeticUsage: true,
        asattva: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.metricalContext).toBe(true);
      expect(result.prosodyRequirement).toBe('syllable_count');
      expect(result.poeticUsage).toBe(true);
    });

    test('handles च in technical/grammatical discourse', () => {
      const result = sutra1457('च', {
        technicalContext: true,
        grammaticalExample: true,
        metaLinguisticUsage: true,
        asattva: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.technicalContext).toBe(true);
      expect(result.grammaticalExample).toBe(true);
      expect(result.metaLinguisticUsage).toBe(true);
    });
  });
});
