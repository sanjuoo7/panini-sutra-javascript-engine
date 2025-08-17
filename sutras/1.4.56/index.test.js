/**
 * Test suite for Sutra 1.4.56: प्राग्रीश्वरान्निपाताः
 * 
 * This sutra establishes अधिकार scope for निपात (particles) from 1.4.56 to 1.4.97.
 */

import { sutra1456 } from './index.js';

describe('Sutra 1.4.56: प्राग्रीश्वरान्निपाताः (prāg-rīśvarān nipātāḥ)', () => {
  
  describe('अधिकार scope establishment', () => {
    test('establishes scope from 1.4.56 to 1.4.97', () => {
      const result = sutra1456('अधिकारसूत्र', {
        sutraNumber: '1.4.56',
        adhikaraType: 'निपात',
        scopeStart: '1.4.56',
        scopeEnd: '1.4.97',
        rangeEstablishment: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.adhikaraType).toBe('निपात');
      expect(result.scopeStart).toBe('1.4.56');
      expect(result.scopeEnd).toBe('1.4.97');
      expect(result.rangeEstablishment).toBe(true);
      expect(result.adhikaraActive).toBe(true);
    });

    test('validates sutra numbers within scope', () => {
      const validSutras = [
        '1.4.56', '1.4.60', '1.4.65', '1.4.70', '1.4.75', 
        '1.4.80', '1.4.85', '1.4.90', '1.4.95', '1.4.97'
      ];
      
      validSutras.forEach(sutraNum => {
        const result = sutra1456('परीक्षाशब्द', {
          sutraNumber: sutraNum,
          scopeValidation: true,
          withinRange: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.withinAdhikaraScope).toBe(true);
        expect(result.sutraNumber).toBe(sutraNum);
      });
    });

    test('rejects sutra numbers outside scope', () => {
      const invalidSutras = [
        '1.4.55', '1.4.98', '1.4.100', '1.5.1', '2.1.1'
      ];
      
      invalidSutras.forEach(sutraNum => {
        const result = sutra1456('परीक्षाशब्द', {
          sutraNumber: sutraNum,
          scopeValidation: true,
          withinRange: false
        });
        
        expect(result.applies).toBe(false);
        expect(result.reason).toBe('outside_adhikara_scope');
        expect(result.sutraNumber).toBe(sutraNum);
      });
    });
  });

  describe('Basic particle identification', () => {
    test('identifies common conjunctive particles', () => {
      const conjunctiveParticles = [
        { particle: 'च', type: 'conjunction', meaning: 'and' },
        { particle: 'तु', type: 'conjunction', meaning: 'but' },
        { particle: 'किन्तु', type: 'conjunction', meaning: 'however' },
        { particle: 'परन्तु', type: 'conjunction', meaning: 'nevertheless' },
        { particle: 'अथ', type: 'conjunction', meaning: 'now/then' }
      ];
      
      conjunctiveParticles.forEach(({ particle, type, meaning }) => {
        const result = sutra1456(particle, {
          particleType: type,
          semanticMeaning: meaning,
          sutraNumber: '1.4.60',
          withinAdhikara: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.classification).toBe('निपात');
        expect(result.particleType).toBe(type);
        expect(result.semanticMeaning).toBe(meaning);
        expect(result.withinAdhikara).toBe(true);
      });
    });

    test('identifies disjunctive particles', () => {
      const disjunctiveParticles = [
        { particle: 'वा', type: 'disjunction', meaning: 'or' },
        { particle: 'अथवा', type: 'disjunction', meaning: 'or else' },
        { particle: 'किम्वा', type: 'disjunction', meaning: 'or what' },
        { particle: 'उत', type: 'disjunction', meaning: 'or' }
      ];
      
      disjunctiveParticles.forEach(({ particle, type, meaning }) => {
        const result = sutra1456(particle, {
          particleType: type,
          semanticMeaning: meaning,
          sutraNumber: '1.4.65',
          withinAdhikara: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.classification).toBe('निपात');
        expect(result.particleType).toBe(type);
        expect(result.semanticMeaning).toBe(meaning);
      });
    });

    test('identifies emphatic particles', () => {
      const emphaticParticles = [
        { particle: 'एव', type: 'emphatic', meaning: 'indeed/only' },
        { particle: 'हि', type: 'emphatic', meaning: 'indeed/for' },
        { particle: 'खलु', type: 'emphatic', meaning: 'indeed/certainly' },
        { particle: 'नूनम्', type: 'emphatic', meaning: 'surely/certainly' }
      ];
      
      emphaticParticles.forEach(({ particle, type, meaning }) => {
        const result = sutra1456(particle, {
          particleType: type,
          semanticMeaning: meaning,
          sutraNumber: '1.4.70',
          withinAdhikara: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.classification).toBe('निपात');
        expect(result.particleType).toBe(type);
        expect(result.semanticMeaning).toBe(meaning);
      });
    });
  });

  describe('Functional particle categories', () => {
    test('identifies quotative particles', () => {
      const quotativeParticles = [
        { particle: 'इति', function: 'quotation_marker', boundary: 'clause_end' },
        { particle: 'किति', function: 'interrogative_quote', boundary: 'question_end' },
        { particle: 'चेति', function: 'conditional_quote', boundary: 'condition_end' }
      ];
      
      quotativeParticles.forEach(({ particle, function: func, boundary }) => {
        const result = sutra1456(particle, {
          particleFunction: func,
          syntacticBoundary: boundary,
          sutraNumber: '1.4.75',
          withinAdhikara: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.particleFunction).toBe(func);
        expect(result.syntacticBoundary).toBe(boundary);
      });
    });

    test('identifies interrogative particles', () => {
      const interrogativeParticles = [
        { particle: 'किम्', function: 'question', type: 'direct' },
        { particle: 'कथम्', function: 'question', type: 'manner' },
        { particle: 'कदा', function: 'question', type: 'temporal' },
        { particle: 'कुत्र', function: 'question', type: 'locative' }
      ];
      
      interrogativeParticles.forEach(({ particle, function: func, type }) => {
        const result = sutra1456(particle, {
          particleFunction: func,
          questionType: type,
          sutraNumber: '1.4.80',
          withinAdhikara: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.particleFunction).toBe(func);
        expect(result.questionType).toBe(type);
      });
    });

    test('identifies conditional particles', () => {
      const conditionalParticles = [
        { particle: 'यदि', function: 'condition', type: 'hypothetical' },
        { particle: 'चेत्', function: 'condition', type: 'conditional' },
        { particle: 'यद्यपि', function: 'condition', type: 'concessive' },
        { particle: 'सचेत्', function: 'condition', type: 'affirmative' }
      ];
      
      conditionalParticles.forEach(({ particle, function: func, type }) => {
        const result = sutra1456(particle, {
          particleFunction: func,
          conditionalType: type,
          sutraNumber: '1.4.85',
          withinAdhikara: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.particleFunction).toBe(func);
        expect(result.conditionalType).toBe(type);
      });
    });
  });

  describe('Indeclinable properties', () => {
    test('verifies indeclinable nature of particles', () => {
      const indeclinableParticles = [
        { particle: 'च', declines: false, inflection: 'none' },
        { particle: 'वा', declines: false, inflection: 'none' },
        { particle: 'इति', declines: false, inflection: 'none' },
        { particle: 'हि', declines: false, inflection: 'none' }
      ];
      
      indeclinableParticles.forEach(({ particle, declines, inflection }) => {
        const result = sutra1456(particle, {
          indeclinable: true,
          declines: declines,
          inflectionType: inflection,
          sutraNumber: '1.4.60',
          withinAdhikara: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.indeclinable).toBe(true);
        expect(result.declines).toBe(declines);
        expect(result.inflectionType).toBe(inflection);
      });
    });

    test('analyzes unchanging particle forms', () => {
      const unchangingForms = [
        { particle: 'तु', forms: ['तु'], variation: 'none' },
        { particle: 'अपि', forms: ['अपि'], variation: 'none' },
        { particle: 'एव', forms: ['एव'], variation: 'none' }
      ];
      
      unchangingForms.forEach(({ particle, forms, variation }) => {
        const result = sutra1456(particle, {
          formVariation: variation,
          allForms: forms,
          morphologicalStability: true,
          sutraNumber: '1.4.65'
        });
        
        expect(result.applies).toBe(true);
        expect(result.formVariation).toBe(variation);
        expect(result.allForms).toEqual(forms);
        expect(result.morphologicalStability).toBe(true);
      });
    });

    test('handles compound particle forms', () => {
      const compoundParticles = [
        { particle: 'यथापि', components: ['यथा', 'अपि'], type: 'compound' },
        { particle: 'किन्तु', components: ['किम्', 'तु'], type: 'compound' },
        { particle: 'तथापि', components: ['तथा', 'अपि'], type: 'compound' }
      ];
      
      compoundParticles.forEach(({ particle, components, type }) => {
        const result = sutra1456(particle, {
          particleType: type,
          components: components,
          compoundNature: true,
          sutraNumber: '1.4.70'
        });
        
        expect(result.applies).toBe(true);
        expect(result.particleType).toBe(type);
        expect(result.components).toEqual(components);
        expect(result.compoundNature).toBe(true);
      });
    });
  });

  describe('Semantic and syntactic functions', () => {
    test('analyzes discourse markers', () => {
      const discourseMarkers = [
        { particle: 'अथ', function: 'topic_shift', position: 'initial' },
        { particle: 'तत्र', function: 'context_setting', position: 'initial' },
        { particle: 'इदानीम्', function: 'temporal_marker', position: 'initial' }
      ];
      
      discourseMarkers.forEach(({ particle, function: func, position }) => {
        const result = sutra1456(particle, {
          discourseFunction: func,
          positionalTendency: position,
          textualRole: 'organization',
          sutraNumber: '1.4.75'
        });
        
        expect(result.applies).toBe(true);
        expect(result.discourseFunction).toBe(func);
        expect(result.positionalTendency).toBe(position);
        expect(result.textualRole).toBe('organization');
      });
    });

    test('analyzes modal particles', () => {
      const modalParticles = [
        { particle: 'कदाचित्', modality: 'possibility', certainty: 'uncertain' },
        { particle: 'अवश्यम्', modality: 'necessity', certainty: 'definite' },
        { particle: 'सम्भवत्', modality: 'probability', certainty: 'likely' }
      ];
      
      modalParticles.forEach(({ particle, modality, certainty }) => {
        const result = sutra1456(particle, {
          modalType: modality,
          certaintyLevel: certainty,
          epistemicFunction: true,
          sutraNumber: '1.4.80'
        });
        
        expect(result.applies).toBe(true);
        expect(result.modalType).toBe(modality);
        expect(result.certaintyLevel).toBe(certainty);
        expect(result.epistemicFunction).toBe(true);
      });
    });

    test('analyzes focus particles', () => {
      const focusParticles = [
        { particle: 'केवल', focus: 'exclusive', scope: 'restrictive' },
        { particle: 'मात्र', focus: 'limitative', scope: 'restrictive' },
        { particle: 'सर्व', focus: 'inclusive', scope: 'expansive' }
      ];
      
      focusParticles.forEach(({ particle, focus, scope }) => {
        const result = sutra1456(particle, {
          focusType: focus,
          scopeType: scope,
          informationStructure: true,
          sutraNumber: '1.4.85'
        });
        
        expect(result.applies).toBe(true);
        expect(result.focusType).toBe(focus);
        expect(result.scopeType).toBe(scope);
        expect(result.informationStructure).toBe(true);
      });
    });
  });

  describe('Scope boundary validation', () => {
    test('validates start boundary (1.4.56)', () => {
      const result = sutra1456('प्रारम्भपरीक्षा', {
        sutraNumber: '1.4.56',
        boundaryType: 'start',
        validationRequired: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.boundaryValid).toBe(true);
      expect(result.boundaryType).toBe('start');
      expect(result.adhikaraInitiated).toBe(true);
    });

    test('validates end boundary (1.4.97)', () => {
      const result = sutra1456('अन्तपरीक्षा', {
        sutraNumber: '1.4.97',
        boundaryType: 'end',
        validationRequired: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.boundaryValid).toBe(true);
      expect(result.boundaryType).toBe('end');
      expect(result.adhikaraTerminated).toBe(true);
    });

    test('handles intermediate positions', () => {
      const intermediatePositions = [
        '1.4.60', '1.4.65', '1.4.70', '1.4.75', '1.4.80', '1.4.85', '1.4.90', '1.4.95'
      ];
      
      intermediatePositions.forEach(sutraNum => {
        const result = sutra1456('मध्यपरीक्षा', {
          sutraNumber: sutraNum,
          boundaryType: 'intermediate',
          positionType: 'within_scope'
        });
        
        expect(result.applies).toBe(true);
        expect(result.boundaryType).toBe('intermediate');
        expect(result.positionType).toBe('within_scope');
        expect(result.adhikaraActive).toBe(true);
      });
    });
  });

  describe('Multi-script support', () => {
    test('handles Devanagari particles', () => {
      const result = sutra1456('च', {
        script: 'Devanagari',
        sutraNumber: '1.4.60',
        withinAdhikara: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('Devanagari');
      expect(result.classification).toBe('निपात');
    });

    test('handles IAST particles', () => {
      const result = sutra1456('ca', {
        script: 'IAST',
        sutraNumber: '1.4.60',
        withinAdhikara: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('IAST');
      expect(result.classification).toBe('निपात');
    });
  });

  describe('Error handling', () => {
    test('handles empty input', () => {
      const result = sutra1456('');
      expect(result.applies).toBe(false);
      expect(result.error).toBe('empty_input');
    });

    test('handles invalid sutra numbers', () => {
      const result = sutra1456('परीक्षा', {
        sutraNumber: 'invalid',
        withinAdhikara: true
      });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_sutra_number');
    });

    test('handles non-particle words within scope', () => {
      const result = sutra1456('गच्छति', {
        wordType: 'verb',
        sutraNumber: '1.4.70',
        withinAdhikara: true,
        expectsParticle: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('not_particle_within_adhikara');
    });

    test('handles ambiguous particle classification', () => {
      const result = sutra1456('अम्बिगुअस्', {
        classification: 'uncertain',
        sutraNumber: '1.4.75',
        withinAdhikara: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('ambiguous_particle_classification');
    });
  });

  describe('Integration with अधिकार system', () => {
    test('integrates with overall अधिकार framework', () => {
      const result = sutra1456('अधिकारपरीक्षा', {
        adhikaraType: 'निपात',
        systemIntegration: true,
        frameworkCompliance: true,
        sutraNumber: '1.4.65'
      });
      
      expect(result.applies).toBe(true);
      expect(result.systemIntegration).toBe(true);
      expect(result.frameworkCompliance).toBe(true);
      expect(result.adhikaraType).toBe('निपात');
    });

    test('handles nested अधिकार scenarios', () => {
      const result = sutra1456('नेस्टेडपरीक्षा', {
        nestedAdhikara: true,
        parentAdhikara: 'wider_scope',
        currentAdhikara: 'निपात',
        scopeInteraction: 'nested'
      });
      
      expect(result.applies).toBe(true);
      expect(result.nestedAdhikara).toBe(true);
      expect(result.currentAdhikara).toBe('निपात');
      expect(result.scopeInteraction).toBe('nested');
    });

    test('manages अधिकार transitions', () => {
      const result = sutra1456('संक्रमणपरीक्षा', {
        transitionType: 'adhikara_change',
        previousScope: 'कारक',
        currentScope: 'निपात',
        transitionPoint: '1.4.56'
      });
      
      expect(result.applies).toBe(true);
      expect(result.transitionType).toBe('adhikara_change');
      expect(result.currentScope).toBe('निपात');
      expect(result.transitionPoint).toBe('1.4.56');
    });
  });

  describe('Edge cases', () => {
    test('handles archaic and Vedic particles', () => {
      const result = sutra1456('वैदिकनिपात', {
        archaicForm: true,
        vedicUsage: true,
        historicalContext: 'early_sanskrit',
        sutraNumber: '1.4.70'
      });
      
      expect(result.applies).toBe(true);
      expect(result.archaicForm).toBe(true);
      expect(result.vedicUsage).toBe(true);
      expect(result.historicalContext).toBe('early_sanskrit');
    });

    test('handles context-dependent particle meanings', () => {
      const result = sutra1456('सन्दर्भाधीन', {
        contextDependent: true,
        variableMeaning: true,
        semanticFlexibility: true,
        sutraNumber: '1.4.80'
      });
      
      expect(result.applies).toBe(true);
      expect(result.contextDependent).toBe(true);
      expect(result.variableMeaning).toBe(true);
      expect(result.semanticFlexibility).toBe(true);
    });

    test('handles boundary case particles', () => {
      const result = sutra1456('सीमावर्ती', {
        boundaryCase: true,
        sutraNumber: '1.4.97', // exactly at boundary
        edgePosition: true,
        specialHandling: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.boundaryCase).toBe(true);
      expect(result.edgePosition).toBe(true);
      expect(result.specialHandling).toBe(true);
    });

    test('handles metalinguistic particle usage', () => {
      const result = sutra1456('व्याकरणनिपात', {
        metalinguistic: true,
        grammaticalExample: true,
        technicalUsage: true,
        sutraNumber: '1.4.85'
      });
      
      expect(result.applies).toBe(true);
      expect(result.metalinguistic).toBe(true);
      expect(result.grammaticalExample).toBe(true);
      expect(result.technicalUsage).toBe(true);
    });
  });
});
