/**
 * Test suite for Sutra 1.4.55: तत्प्रयोजको हेतुश्च
 * 
 * This sutra establishes motivating causes as हेतु and potential कर्ता.
 */

import { sutra1455 } from './index.js';

describe('Sutra 1.4.55: तत्प्रयोजको हेतुश्च (tat-prayojako hetuś ca)', () => {
  
  describe('Basic motivation analysis', () => {
    test('identifies direct motivating causes', () => {
      const directMotivators = [
        { motivator: 'प्रेरक', type: 'direct_inspiration', method: 'personal' },
        { motivator: 'उत्साहक', type: 'encouragement', method: 'emotional' },
        { motivator: 'निर्देशक', type: 'instruction', method: 'authoritative' },
        { motivator: 'प्रलोभक', type: 'temptation', method: 'desire_based' },
        { motivator: 'धमकानेवाला', type: 'threat', method: 'fear_based' }
      ];
      
      directMotivators.forEach(({ motivator, type, method }) => {
        const result = sutra1455(motivator, {
          motivatedAgent: 'कर्ता',
          verb: 'प्रेरयति',
          action: 'प्रेरणा',
          motivationType: type,
          motivationMethod: method,
          directMotivation: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.karaka).toBe('हेतु');
        expect(result.alsoKarta).toBe(true);
        expect(result.motivationType).toBe(type);
        expect(result.motivationMethod).toBe(method);
        expect(result.directMotivation).toBe(true);
      });
    });

    test('identifies indirect motivating causes', () => {
      const indirectMotivators = [
        { motivator: 'परिस्थिति', type: 'situational', influence: 'environmental' },
        { motivator: 'संस्कार', type: 'conditioning', influence: 'psychological' },
        { motivator: 'सामाजिकदबाव', type: 'social_pressure', influence: 'collective' },
        { motivator: 'आर्थिकआवश्यकता', type: 'economic_need', influence: 'survival' }
      ];
      
      indirectMotivators.forEach(({ motivator, type, influence }) => {
        const result = sutra1455(motivator, {
          motivatedAgent: 'व्यक्ति',
          verb: 'प्रभावितं करोति',
          action: 'प्रभाव',
          motivationType: type,
          influenceType: influence,
          indirectMotivation: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.karaka).toBe('हेतु');
        expect(result.motivationType).toBe(type);
        expect(result.influenceType).toBe(influence);
        expect(result.indirectMotivation).toBe(true);
      });
    });

    test('identifies positive vs negative motivation', () => {
      const motivationTypes = [
        { motivator: 'प्रशंसा', valence: 'positive', approach: 'reward_based' },
        { motivator: 'पुरस्कार', valence: 'positive', approach: 'incentive' },
        { motivator: 'निन्दा', valence: 'negative', approach: 'punishment_based' },
        { motivator: 'दण्ड', valence: 'negative', approach: 'penalty' }
      ];
      
      motivationTypes.forEach(({ motivator, valence, approach }) => {
        const result = sutra1455(motivator, {
          motivatedAgent: 'कर्मचारी',
          verb: 'प्रेरयति',
          action: 'प्रेरणा',
          motivationValence: valence,
          motivationApproach: approach,
          psychologicalImpact: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.motivationValence).toBe(valence);
        expect(result.motivationApproach).toBe(approach);
        expect(result.psychologicalImpact).toBe(true);
      });
    });
  });

  describe('Causal chain analysis', () => {
    test('identifies primary causes in causal chains', () => {
      const primaryCauses = [
        { cause: 'मूलकारण', level: 'fundamental', chain_position: 'origin' },
        { cause: 'प्रथमहेतु', level: 'initial', chain_position: 'starting' },
        { cause: 'आदिकारण', level: 'primordial', chain_position: 'absolute_beginning' }
      ];
      
      primaryCauses.forEach(({ cause, level, chain_position }) => {
        const result = sutra1455(cause, {
          motivatedAgent: 'परवर्तीकारण',
          verb: 'जनयति',
          action: 'कारणता',
          causalLevel: level,
          chainPosition: chain_position,
          causalChain: true,
          primaryCause: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.causalLevel).toBe(level);
        expect(result.chainPosition).toBe(chain_position);
        expect(result.primaryCause).toBe(true);
      });
    });

    test('identifies intermediate causes', () => {
      const intermediateCauses = [
        { cause: 'मध्यमकारण', position: 'middle', connects: ['पूर्व', 'पर'] },
        { cause: 'सेतुकारण', position: 'bridging', connects: ['मूल', 'फल'] },
        { cause: 'संक्रमणकारण', position: 'transitional', connects: ['प्रारम्भ', 'अन्त'] }
      ];
      
      intermediateCauses.forEach(({ cause, position, connects }) => {
        const result = sutra1455(cause, {
          motivatedAgent: 'अन्तिमकारण',
          verb: 'संयोजयति',
          action: 'संयोजन',
          causalPosition: position,
          connectsCauses: connects,
          intermediateCause: true,
          bridgingFunction: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.causalPosition).toBe(position);
        expect(result.connectsCauses).toEqual(connects);
        expect(result.intermediateCause).toBe(true);
      });
    });

    test('analyzes proximate causes', () => {
      const proximateCauses = [
        { cause: 'तत्कालकारण', proximity: 'immediate', temporal: 'simultaneous' },
        { cause: 'निकटकारण', proximity: 'near', temporal: 'recent' },
        { cause: 'प्रत्यक्षकारण', proximity: 'direct', temporal: 'current' }
      ];
      
      proximateCauses.forEach(({ cause, proximity, temporal }) => {
        const result = sutra1455(cause, {
          motivatedAgent: 'तत्कालकर्ता',
          verb: 'तुरन्तं प्रेरयति',
          action: 'तत्काल प्रेरणा',
          proximityLevel: proximity,
          temporalRelation: temporal,
          proximateCause: true,
          immediateEffect: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.proximityLevel).toBe(proximity);
        expect(result.temporalRelation).toBe(temporal);
        expect(result.proximateCause).toBe(true);
      });
    });
  });

  describe('Dual हेतु-कर्ता analysis', () => {
    test('identifies entities functioning as both हेतु and कर्ता', () => {
      const dualFunctionEntities = [
        { entity: 'गुरु', hetuRole: 'inspiring_teacher', kartaRole: 'direct_instructor' },
        { entity: 'नेता', hetuRole: 'motivating_leader', kartaRole: 'decision_maker' },
        { entity: 'माता', hetuRole: 'loving_motivator', kartaRole: 'caregiver' },
        { entity: 'मित्र', hetuRole: 'encouraging_friend', kartaRole: 'helper' }
      ];
      
      dualFunctionEntities.forEach(({ entity, hetuRole, kartaRole }) => {
        const result = sutra1455(entity, {
          motivatedAgent: 'शिष्य',
          verb: 'प्रेरयति च करोति च',
          action: 'द्विविध कार्य',
          hetuFunction: hetuRole,
          kartaFunction: kartaRole,
          dualRole: true,
          simultaneousFunctions: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.karaka).toBe('हेतु');
        expect(result.alsoKarta).toBe(true);
        expect(result.hetuFunction).toBe(hetuRole);
        expect(result.kartaFunction).toBe(kartaRole);
        expect(result.dualRole).toBe(true);
      });
    });

    test('analyzes role precedence in dual functions', () => {
      const rolePrecedence = [
        { entity: 'प्रधानकारण', primary: 'हेतु', secondary: 'कर्ता', precedence: 'हेतु_primary' },
        { entity: 'सक्रियकारण', primary: 'कर्ता', secondary: 'हेतु', precedence: 'कर्ता_primary' },
        { entity: 'समानकारण', primary: 'equal', secondary: 'equal', precedence: 'balanced' }
      ];
      
      rolePrecedence.forEach(({ entity, primary, secondary, precedence }) => {
        const result = sutra1455(entity, {
          motivatedAgent: 'लक्ष्यकर्ता',
          verb: 'संयुक्तं करोति',
          action: 'मिश्रित कार्य',
          primaryRole: primary,
          secondaryRole: secondary,
          rolePrecedence: precedence,
          roleBalance: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.primaryRole).toBe(primary);
        expect(result.secondaryRole).toBe(secondary);
        expect(result.rolePrecedence).toBe(precedence);
      });
    });

    test('handles role transitions and alternations', () => {
      const roleTransitions = [
        { entity: 'परिवर्तनशील', transition: 'हेतु_to_कर्ता', pattern: 'sequential' },
        { entity: 'चक्रीयकारण', transition: 'कर्ता_to_हेतु', pattern: 'cyclical' },
        { entity: 'द्विदिशाकारण', transition: 'bidirectional', pattern: 'alternating' }
      ];
      
      roleTransitions.forEach(({ entity, transition, pattern }) => {
        const result = sutra1455(entity, {
          motivatedAgent: 'गतिशीलकर्ता',
          verb: 'परिवर्तते',
          action: 'भूमिका परिवर्तन',
          roleTransition: transition,
          transitionPattern: pattern,
          dynamicRoles: true,
          temporalShifting: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.roleTransition).toBe(transition);
        expect(result.transitionPattern).toBe(pattern);
        expect(result.dynamicRoles).toBe(true);
      });
    });
  });

  describe('Motivation types and mechanisms', () => {
    test('analyzes emotional motivation', () => {
      const emotionalMotivators = [
        { motivator: 'प्रेम', emotion: 'love', mechanism: 'attachment' },
        { motivator: 'भय', emotion: 'fear', mechanism: 'avoidance' },
        { motivator: 'क्रोध', emotion: 'anger', mechanism: 'aggression' },
        { motivator: 'लालसा', emotion: 'greed', mechanism: 'acquisition' },
        { motivator: 'गर्व', emotion: 'pride', mechanism: 'achievement' }
      ];
      
      emotionalMotivators.forEach(({ motivator, emotion, mechanism }) => {
        const result = sutra1455(motivator, {
          motivatedAgent: 'भावुकव्यक्ति',
          verb: 'भावपूर्वकं प्रेरयति',
          action: 'भावनात्मक प्रेरणा',
          emotionType: emotion,
          motivationMechanism: mechanism,
          emotionalMotivation: true,
          psychologicalBasis: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.emotionType).toBe(emotion);
        expect(result.motivationMechanism).toBe(mechanism);
        expect(result.emotionalMotivation).toBe(true);
      });
    });

    test('analyzes rational motivation', () => {
      const rationalMotivators = [
        { motivator: 'तर्क', reasoning: 'logical', basis: 'evidence' },
        { motivator: 'प्रमाण', reasoning: 'proof_based', basis: 'validation' },
        { motivator: 'विवेक', reasoning: 'wisdom', basis: 'discrimination' },
        { motivator: 'बुद्धि', reasoning: 'intelligence', basis: 'analysis' }
      ];
      
      rationalMotivators.forEach(({ motivator, reasoning, basis }) => {
        const result = sutra1455(motivator, {
          motivatedAgent: 'विवेकीव्यक्ति',
          verb: 'तर्कपूर्वकं प्रेरयति',
          action: 'बौद्धिक प्रेरणा',
          reasoningType: reasoning,
          rationalBasis: basis,
          intellectualMotivation: true,
          logicalFoundation: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.reasoningType).toBe(reasoning);
        expect(result.rationalBasis).toBe(basis);
        expect(result.intellectualMotivation).toBe(true);
      });
    });

    test('analyzes spiritual motivation', () => {
      const spiritualMotivators = [
        { motivator: 'धर्म', spiritual: 'duty', transcendence: 'ethical' },
        { motivator: 'मोक्ष', spiritual: 'liberation', transcendence: 'ultimate' },
        { motivator: 'भक्ति', spiritual: 'devotion', transcendence: 'divine' },
        { motivator: 'ज्ञान', spiritual: 'knowledge', transcendence: 'wisdom' }
      ];
      
      spiritualMotivators.forEach(({ motivator, spiritual, transcendence }) => {
        const result = sutra1455(motivator, {
          motivatedAgent: 'साधक',
          verb: 'आध्यात्मिकं प्रेरयति',
          action: 'आध्यात्मिक प्रेरणा',
          spiritualType: spiritual,
          transcendenceLevel: transcendence,
          spiritualMotivation: true,
          divineInspiration: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.spiritualType).toBe(spiritual);
        expect(result.transcendenceLevel).toBe(transcendence);
        expect(result.spiritualMotivation).toBe(true);
      });
    });

    test('analyzes social motivation', () => {
      const socialMotivators = [
        { motivator: 'समाज', social: 'community', pressure: 'conformity' },
        { motivator: 'परम्परा', social: 'tradition', pressure: 'cultural' },
        { motivator: 'प्रतिष्ठा', social: 'reputation', pressure: 'status' },
        { motivator: 'सम्मान', social: 'respect', pressure: 'recognition' }
      ];
      
      socialMotivators.forEach(({ motivator, social, pressure }) => {
        const result = sutra1455(motivator, {
          motivatedAgent: 'सामाजिकव्यक्ति',
          verb: 'सामाजिकं प्रेरयति',
          action: 'सामाजिक प्रेरणा',
          socialType: social,
          socialPressure: pressure,
          collectiveMotivation: true,
          culturalInfluence: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.socialType).toBe(social);
        expect(result.socialPressure).toBe(pressure);
        expect(result.collectiveMotivation).toBe(true);
      });
    });
  });

  describe('Causative relationships', () => {
    test('analyzes efficient causation', () => {
      const efficientCauses = [
        { cause: 'कारक', efficiency: 'direct', result: 'immediate' },
        { cause: 'निमित्त', efficiency: 'instrumental', result: 'mediated' },
        { cause: 'उपादान', efficiency: 'material', result: 'substantial' }
      ];
      
      efficientCauses.forEach(({ cause, efficiency, result }) => {
        const result_obj = sutra1455(cause, {
          motivatedAgent: 'कार्य',
          verb: 'कारयति',
          action: 'कारण',
          efficiencyType: efficiency,
          causalResult: result,
          efficientCausation: true,
          directCausation: true
        });
        
        expect(result_obj.applies).toBe(true);
        expect(result_obj.efficiencyType).toBe(efficiency);
        expect(result_obj.causalResult).toBe(result);
        expect(result_obj.efficientCausation).toBe(true);
      });
    });

    test('analyzes final causation (teleological)', () => {
      const finalCauses = [
        { cause: 'उद्देश्य', purpose: 'goal', teleology: 'purposive' },
        { cause: 'लक्ष्य', purpose: 'target', teleology: 'directional' },
        { cause: 'प्रयोजन', purpose: 'aim', teleology: 'intentional' }
      ];
      
      finalCauses.forEach(({ cause, purpose, teleology }) => {
        const result = sutra1455(cause, {
          motivatedAgent: 'साधक',
          verb: 'लक्ष्यं करोति',
          action: 'लक्ष्य साधन',
          purposeType: purpose,
          teleologicalNature: teleology,
          finalCausation: true,
          goalOriented: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.purposeType).toBe(purpose);
        expect(result.teleologicalNature).toBe(teleology);
        expect(result.finalCausation).toBe(true);
      });
    });

    test('analyzes formal causation', () => {
      const formalCauses = [
        { cause: 'आकार', form: 'shape', structure: 'geometric' },
        { cause: 'व्यवस्था', form: 'organization', structure: 'systematic' },
        { cause: 'नियम', form: 'rule', structure: 'regulatory' }
      ];
      
      formalCauses.forEach(({ cause, form, structure }) => {
        const result = sutra1455(cause, {
          motivatedAgent: 'संरचना',
          verb: 'आकार देति',
          action: 'आकारण',
          formType: form,
          structuralNature: structure,
          formalCausation: true,
          structuralInfluence: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.formType).toBe(form);
        expect(result.structuralNature).toBe(structure);
        expect(result.formalCausation).toBe(true);
      });
    });
  });

  describe('Complex motivation scenarios', () => {
    test('handles multiple motivating causes', () => {
      const result = sutra1455('समूहकारण', {
        motivatedAgent: 'बहुप्रेरितकर्ता',
        verb: 'संयुक्तं प्रेरयति',
        action: 'बहुविध प्रेरणा',
        multipleCauses: ['प्रथम', 'द्वितीय', 'तृतीय'],
        collectiveMotivation: true,
        synergisticEffect: true,
        multifactorialCausation: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.multipleCauses).toHaveLength(3);
      expect(result.collectiveMotivation).toBe(true);
      expect(result.synergisticEffect).toBe(true);
    });

    test('handles conflicting motivations', () => {
      const result = sutra1455('विरोधीकारण', {
        motivatedAgent: 'दुविधाकर्ता',
        verb: 'विरोधितं प्रेरयति',
        action: 'संघर्षपूर्ण प्रेरणा',
        conflictingMotivations: ['सकारात्मक', 'नकारात्मक'],
        internalConflict: true,
        ambivalentMotivation: true,
        paradoxicalCausation: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.conflictingMotivations).toHaveLength(2);
      expect(result.internalConflict).toBe(true);
      expect(result.ambivalentMotivation).toBe(true);
    });

    test('handles hierarchical motivation systems', () => {
      const result = sutra1455('श्रेणीबद्धकारण', {
        motivatedAgent: 'व्यवस्थितकर्ता',
        verb: 'क्रमेण प्रेरयति',
        action: 'स्तरीकृत प्रेरणा',
        motivationHierarchy: ['उच्च', 'मध्यम', 'निम्न'],
        hierarchicalStructure: true,
        prioritizedMotivation: true,
        systematicCausation: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.motivationHierarchy).toHaveLength(3);
      expect(result.hierarchicalStructure).toBe(true);
      expect(result.prioritizedMotivation).toBe(true);
    });
  });

  describe('Multi-script support', () => {
    test('handles Devanagari input', () => {
      const result = sutra1455('प्रेरक', {
        motivatedAgent: 'कर्ता',
        verb: 'प्रेरयति',
        action: 'प्रेरणा',
        script: 'Devanagari'
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('Devanagari');
    });

    test('handles IAST input', () => {
      const result = sutra1455('prayojaka', {
        motivatedAgent: 'kartā',
        verb: 'prayojayati',
        action: 'prayojana',
        script: 'IAST'
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('IAST');
    });
  });

  describe('Error handling', () => {
    test('handles empty input', () => {
      const result = sutra1455('');
      expect(result.applies).toBe(false);
      expect(result.error).toBe('empty_input');
    });

    test('handles non-motivating entities', () => {
      const result = sutra1455('निष्क्रिय', {
        motivatedAgent: 'कर्ता',
        verb: 'न प्रेरयति',
        action: 'अप्रेरणा',
        motivates: false,
        causativeRole: false
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('not_motivating_cause');
    });

    test('handles self-referential motivation problems', () => {
      const result = sutra1455('स्वयंप्रेरक', {
        motivatedAgent: 'स्वयंप्रेरक', // same as motivator
        verb: 'स्वयं प्रेरयति',
        action: 'स्वप्रेरणा',
        selfMotivation: true,
        circularCausation: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('circular_self_motivation');
    });

    test('handles invalid Sanskrit input', () => {
      const result = sutra1455('xyz123motivator', {
        motivatedAgent: 'agent',
        verb: 'motivates'
      });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_sanskrit_input');
    });
  });

  describe('Integration with कारक system', () => {
    test('relates to स्वतन्त्रः कर्ता (1.4.54)', () => {
      const result = sutra1455('कर्ताप्रेरक', {
        motivatedAgent: 'स्वतन्त्रकर्ता',
        verb: 'स्वतन्त्रं प्रेरयति',
        action: 'स्वातन्त्र्य प्रेरणा',
        relatedToSutra1454: true,
        motivatesIndependentAgent: true,
        enhancesAutonomy: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.relatedToSutra1454).toBe(true);
      expect(result.motivatesIndependentAgent).toBe(true);
    });

    test('distinguishes from करण कारक', () => {
      const result = sutra1455('शुद्धहेतु', {
        motivatedAgent: 'कर्ता',
        verb: 'प्रेरयति',
        action: 'प्रेरणा',
        notKarana: true,
        notInstrumental: true,
        causalNotInstrumental: true,
        motivationalRole: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.notKarana).toBe(true);
      expect(result.notInstrumental).toBe(true);
      expect(result.motivationalRole).toBe(true);
    });

    test('relates to other हेतु mentions', () => {
      const result = sutra1455('संबद्धहेतु', {
        motivatedAgent: 'कर्ता',
        verb: 'प्रेरयति',
        action: 'प्रेरणा',
        relatedToSutra1444: true, // हेतुश्च
        specializedHetu: true,
        motivationalSpecialization: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.relatedToSutra1444).toBe(true);
      expect(result.specializedHetu).toBe(true);
    });
  });

  describe('Edge cases', () => {
    test('handles cosmic and universal motivators', () => {
      const result = sutra1455('ब्रह्म', {
        motivatedAgent: 'जगत्',
        verb: 'जगत्प्रेरयति',
        action: 'सार्वभौमिक प्रेरणा',
        cosmicMotivator: true,
        universalCausation: true,
        metaphysicalHetu: true,
        absoluteAgency: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.cosmicMotivator).toBe(true);
      expect(result.universalCausation).toBe(true);
      expect(result.metaphysicalHetu).toBe(true);
    });

    test('handles temporal motivation across time', () => {
      const result = sutra1455('भूतकालकारण', {
        motivatedAgent: 'वर्तमानकर्ता',
        verb: 'कालातीतं प्रेरयति',
        action: 'कालीन प्रेरणा',
        temporalMotivation: true,
        crossTemporalCausation: true,
        historicalInfluence: true,
        legacyMotivation: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.temporalMotivation).toBe(true);
      expect(result.crossTemporalCausation).toBe(true);
      expect(result.historicalInfluence).toBe(true);
    });

    test('handles quantum and probabilistic motivation', () => {
      const result = sutra1455('सम्भाव्यकारण', {
        motivatedAgent: 'अनिश्चितकर्ता',
        verb: 'सम्भावनां प्रेरयति',
        action: 'सम्भावना प्रेरणा',
        probabilisticMotivation: true,
        quantumCausation: true,
        uncertaintyBasedMotivation: true,
        potentialityRealization: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.probabilisticMotivation).toBe(true);
      expect(result.quantumCausation).toBe(true);
      expect(result.uncertaintyBasedMotivation).toBe(true);
    });

    test('handles paradoxical and contradictory motivators', () => {
      const result = sutra1455('विरोधाभासकारण', {
        motivatedAgent: 'विरोधाभासकर्ता',
        verb: 'विरोधाभासं प्रेरयति',
        action: 'विरोधाभास प्रेरणा',
        paradoxicalMotivation: true,
        contradictoryLogic: true,
        impossibleCausation: true,
        transcendentMotivation: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.paradoxicalMotivation).toBe(true);
      expect(result.contradictoryLogic).toBe(true);
      expect(result.impossibleCausation).toBe(true);
    });
  });
});
