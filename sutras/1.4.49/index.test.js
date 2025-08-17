/**
 * Test suite for Sutra 1.4.49: कर्तुरीप्सिततमं कर्म
 * 
 * This sutra establishes that the most desired object by the agent functions as कर्म कारक.
 */

import { sutra1449 } from './index.js';

describe('Sutra 1.4.49: कर्तुरीप्सिततमं कर्म (kartur īpsitatamaṃ karma)', () => {
  
  describe('Basic desire object identification', () => {
    test('identifies material desired objects', () => {
      const materialObjects = [
        { word: 'फल', agent: 'बालक', desire: 'food_craving' },
        { word: 'स्वर्ण', agent: 'व्यापारी', desire: 'wealth_accumulation' },
        { word: 'वस्त्र', agent: 'ग्राहक', desire: 'clothing_need' },
        { word: 'गृह', agent: 'परिवार', desire: 'shelter_requirement' }
      ];
      
      materialObjects.forEach(({ word, agent, desire }) => {
        const result = sutra1449(word, {
          agent: agent,
          action: 'इच्छा',
          context: `${agent}ः ${word}म् इच्छति`,
          desirabilityType: 'material',
          desireCategory: desire
        });
        
        expect(result.applies).toBe(true);
        expect(result.karaka).toBe('कर्म');
        expect(result.objectCategory).toBe('material');
        expect(result.desireType).toBe(desire);
        expect(result.agentDesire).toBe(true);
      });
    });

    test('identifies abstract desired objects', () => {
      const abstractObjects = [
        { word: 'ज्ञान', agent: 'छात्र', desire: 'knowledge_seeking' },
        { word: 'शान्ति', agent: 'योगी', desire: 'peace_attainment' },
        { word: 'यश', agent: 'राजा', desire: 'fame_pursuit' },
        { word: 'मुक्ति', agent: 'साधक', desire: 'liberation_quest' }
      ];
      
      abstractObjects.forEach(({ word, agent, desire }) => {
        const result = sutra1449(word, {
          agent: agent,
          action: 'कामना',
          context: `${agent}ः ${word}ं कामयते`,
          desirabilityType: 'abstract',
          abstractLevel: 'high'
        });
        
        expect(result.applies).toBe(true);
        expect(result.objectCategory).toBe('abstract');
        expect(result.abstractDesire).toBe(true);
        expect(result.desireIntensity).toBeDefined();
      });
    });

    test('identifies experiential desired objects', () => {
      const experientialObjects = [
        { word: 'आनन्द', agent: 'भोगी', experience: 'pleasure' },
        { word: 'सुख', agent: 'व्यक्ति', experience: 'happiness' },
        { word: 'स्वाद', agent: 'रसिक', experience: 'taste' },
        { word: 'दर्शन', agent: 'भक्त', experience: 'vision' }
      ];
      
      experientialObjects.forEach(({ word, agent, experience }) => {
        const result = sutra1449(word, {
          agent: agent,
          action: 'अनुभव',
          desirabilityType: 'experiential',
          experienceType: experience
        });
        
        expect(result.applies).toBe(true);
        expect(result.objectCategory).toBe('experiential');
        expect(result.experienceDesire).toBe(experience);
      });
    });
  });

  describe('Desirability level analysis', () => {
    test('identifies most desired objects (ईप्सिततम)', () => {
      const mostDesired = [
        { word: 'मोक्ष', agent: 'मुमुक्षु', priority: 'ultimate' },
        { word: 'पुत्र', agent: 'पितृ', priority: 'familial_highest' },
        { word: 'राज्य', agent: 'राजकुमार', priority: 'political_highest' }
      ];
      
      mostDesired.forEach(({ word, agent, priority }) => {
        const result = sutra1449(word, {
          agent: agent,
          action: 'परमेच्छा',
          desirabilityLevel: 'ipsitatatama',
          priorityLevel: priority
        });
        
        expect(result.applies).toBe(true);
        expect(result.desirabilityLevel).toBe('ipsitatatama');
        expect(result.mostDesired).toBe(true);
        expect(result.priorityLevel).toBe(priority);
      });
    });

    test('compares competing desires', () => {
      const result = sutra1449('धर्म', {
        agent: 'गृहस्थ',
        action: 'अनुसरण',
        competingDesires: ['अर्थ', 'काम', 'मोक्ष'],
        priorityOrder: ['धर्म', 'अर्थ', 'काम', 'मोक्ष'],
        primaryDesire: 'धर्म'
      });
      
      expect(result.applies).toBe(true);
      expect(result.competingDesires).toBeDefined();
      expect(result.primaryDesire).toBe('धर्म');
      expect(result.priorityRanking).toBeDefined();
    });

    test('analyzes temporal desirability changes', () => {
      const result = sutra1449('विद्या', {
        agent: 'युवा',
        action: 'अध्ययन',
        temporalAspect: true,
        desirabilityOverTime: {
          childhood: 'low',
          youth: 'high',
          adulthood: 'medium',
          old_age: 'high'
        }
      });
      
      expect(result.applies).toBe(true);
      expect(result.temporalDesirability).toBeDefined();
      expect(result.currentDesirability).toBe('high');
    });
  });

  describe('Agent consciousness and intention', () => {
    test('analyzes conscious vs unconscious desires', () => {
      const consciousnessLevels = [
        { level: 'fully_conscious', awareness: 'explicit' },
        { level: 'partially_conscious', awareness: 'implicit' },
        { level: 'subconscious', awareness: 'latent' },
        { level: 'unconscious', awareness: 'suppressed' }
      ];
      
      consciousnessLevels.forEach(({ level, awareness }) => {
        const result = sutra1449('काम्य', {
          agent: 'व्यक्ति',
          action: 'अभिलाष',
          consciousnessLevel: level,
          desireAwareness: awareness
        });
        
        expect(result.applies).toBe(true);
        expect(result.consciousnessLevel).toBe(level);
        expect(result.desireAwareness).toBe(awareness);
      });
    });

    test('analyzes intentional vs instinctive desires', () => {
      const intentionTypes = [
        { word: 'लक्ष्य', type: 'deliberate', planning: 'strategic' },
        { word: 'भोजन', type: 'instinctive', planning: 'immediate' },
        { word: 'निद्रा', type: 'biological', planning: 'none' }
      ];
      
      intentionTypes.forEach(({ word, type, planning }) => {
        const result = sutra1449(word, {
          agent: 'जीव',
          action: 'वाञ्छा',
          intentionType: type,
          planningLevel: planning
        });
        
        expect(result.applies).toBe(true);
        expect(result.intentionType).toBe(type);
        expect(result.planningLevel).toBe(planning);
      });
    });

    test('handles collective vs individual agent desires', () => {
      const agentTypes = [
        { agent: 'व्यक्ति', type: 'individual', scope: 'personal' },
        { agent: 'परिवार', type: 'collective', scope: 'familial' },
        { agent: 'समुदाय', type: 'group', scope: 'social' },
        { agent: 'राष्ट्र', type: 'institutional', scope: 'national' }
      ];
      
      agentTypes.forEach(({ agent, type, scope }) => {
        const result = sutra1449('कल्याण', {
          agent: agent,
          action: 'इच्छा',
          agentType: type,
          desireScope: scope
        });
        
        expect(result.applies).toBe(true);
        expect(result.agentType).toBe(type);
        expect(result.desireScope).toBe(scope);
      });
    });
  });

  describe('Goal-oriented vs immediate desires', () => {
    test('distinguishes long-term goals from immediate wants', () => {
      const timeHorizons = [
        { word: 'सिद्धि', horizon: 'long_term', planning: 'extensive' },
        { word: 'भोग', horizon: 'immediate', planning: 'minimal' },
        { word: 'संस्कार', horizon: 'generational', planning: 'traditional' }
      ];
      
      timeHorizons.forEach(({ word, horizon, planning }) => {
        const result = sutra1449(word, {
          agent: 'अभिलाषी',
          action: 'साधन',
          timeHorizon: horizon,
          planningDepth: planning
        });
        
        expect(result.applies).toBe(true);
        expect(result.timeHorizon).toBe(horizon);
        expect(result.planningDepth).toBe(planning);
      });
    });

    test('analyzes means-ends relationships', () => {
      const result = sutra1449('धन', {
        agent: 'गृहस्थ',
        action: 'अर्जन',
        instrumentalDesire: true,
        ultimateGoal: 'सुख',
        meansToEnd: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.instrumentalDesire).toBe(true);
      expect(result.ultimateGoal).toBe('सुख');
      expect(result.meansEndRelation).toBe(true);
    });
  });

  describe('Desire intensity and urgency', () => {
    test('measures desire strength levels', () => {
      const intensityLevels = [
        { level: 'mild', urgency: 'low', expression: 'इच्छा' },
        { level: 'moderate', urgency: 'medium', expression: 'कामना' },
        { level: 'strong', urgency: 'high', expression: 'अभिलाष' },
        { level: 'intense', urgency: 'extreme', expression: 'तृष्णा' }
      ];
      
      intensityLevels.forEach(({ level, urgency, expression }) => {
        const result = sutra1449('विषय', {
          agent: 'इच्छुक',
          action: expression,
          desireIntensity: level,
          urgencyLevel: urgency
        });
        
        expect(result.applies).toBe(true);
        expect(result.desireIntensity).toBe(level);
        expect(result.urgencyLevel).toBe(urgency);
      });
    });

    test('handles obsessive vs balanced desires', () => {
      const balanceTypes = [
        { type: 'balanced', health: 'healthy' },
        { type: 'obsessive', health: 'unhealthy' },
        { type: 'detached', health: 'yogic' }
      ];
      
      balanceTypes.forEach(({ type, health }) => {
        const result = sutra1449('वाञ्छित', {
          agent: 'व्यक्ति',
          action: 'अनुरक्ति',
          desireBalance: type,
          psychologicalHealth: health
        });
        
        expect(result.applies).toBe(true);
        expect(result.desireBalance).toBe(type);
        expect(result.psychologicalHealth).toBe(health);
      });
    });
  });

  describe('Cultural and contextual desires', () => {
    test('identifies culturally shaped desires', () => {
      const culturalDesires = [
        { word: 'पुत्र', culture: 'traditional', value: 'lineage_continuation' },
        { word: 'यज्ञ', culture: 'vedic', value: 'dharmic_duty' },
        { word: 'गुरुदक्षिणा', culture: 'educational', value: 'gratitude_expression' }
      ];
      
      culturalDesires.forEach(({ word, culture, value }) => {
        const result = sutra1449(word, {
          agent: 'सांस्कृतिक_व्यक्ति',
          action: 'अपेक्षा',
          culturalContext: culture,
          culturalValue: value
        });
        
        expect(result.applies).toBe(true);
        expect(result.culturalContext).toBe(culture);
        expect(result.culturalValue).toBe(value);
      });
    });

    test('handles age-appropriate desires', () => {
      const ageDesires = [
        { age: 'बाल्य', desire: 'क्रीडा', appropriate: true },
        { age: 'यौवन', desire: 'शिक्षा', appropriate: true },
        { age: 'प्रौढ़', desire: 'सेवा', appropriate: true },
        { age: 'वृद्ध', desire: 'मोक्ष', appropriate: true }
      ];
      
      ageDesires.forEach(({ age, desire, appropriate }) => {
        const result = sutra1449(desire, {
          agent: `${age}_व्यक्ति`,
          action: 'रुचि',
          ageStage: age,
          ageAppropriate: appropriate
        });
        
        expect(result.applies).toBe(true);
        expect(result.ageStage).toBe(age);
        expect(result.ageAppropriate).toBe(appropriate);
      });
    });
  });

  describe('Multi-script support', () => {
    test('handles Devanagari input', () => {
      const result = sutra1449('फल', {
        agent: 'बालक',
        action: 'इच्छा',
        script: 'Devanagari'
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('Devanagari');
    });

    test('handles IAST input', () => {
      const result = sutra1449('phala', {
        agent: 'bālaka',
        action: 'icchā',
        script: 'IAST'
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('IAST');
    });
  });

  describe('Error handling', () => {
    test('handles empty input', () => {
      const result = sutra1449('');
      expect(result.applies).toBe(false);
      expect(result.error).toBe('empty_input');
    });

    test('handles missing agent context', () => {
      const result = sutra1449('वस्तु', {
        action: 'इच्छा'
        // missing agent
      });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('missing_agent_context');
    });

    test('handles non-desired objects', () => {
      const result = sutra1449('अनिष्ट', {
        agent: 'व्यक्ति',
        action: 'परिहार',
        desirability: 'unwanted'
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('not_desired_object');
    });

    test('handles invalid Sanskrit input', () => {
      const result = sutra1449('xyz123', {
        agent: 'person',
        action: 'want'
      });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_sanskrit_input');
    });
  });

  describe('Integration with कर्म system', () => {
    test('establishes primary कर्म definition', () => {
      const result = sutra1449('प्रमुखकर्म', {
        agent: 'कर्ता',
        action: 'मुख्यइच्छा',
        primaryKarmaDefinition: true,
        foundationalSutra: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.primaryKarmaDefinition).toBe(true);
      expect(result.foundationalSutra).toBe(true);
    });

    test('distinguishes from other कारक relations', () => {
      const result = sutra1449('इष्टवस्तु', {
        agent: 'इच्छुक',
        action: 'प्राप्ति',
        context: 'इच्छुकः इष्टवस्तुं प्राप्तुम् इच्छति',
        notKarana: true,
        notSampradana: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('कर्म');
      expect(result.notKarana).toBe(true);
      expect(result.notSampradana).toBe(true);
    });

    test('prepares for extended कर्म rules', () => {
      const result = sutra1449('मूलकर्म', {
        agent: 'कर्ता',
        action: 'मूलइच्छा',
        extendedRules: ['1.4.50', '1.4.51'],
        baseForExtensions: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.baseForExtensions).toBe(true);
      expect(result.extendedRules).toContain('1.4.50');
    });
  });

  describe('Edge cases', () => {
    test('handles conflicting desires from multiple agents', () => {
      const result = sutra1449('संघर्षविषय', {
        agents: ['व्यक्ति_अ', 'व्यक्ति_ब'],
        action: 'स्पर्धा',
        conflictingDesires: true,
        resolution: 'context_dependent'
      });
      
      expect(result.applies).toBe(true);
      expect(result.conflictingDesires).toBe(true);
      expect(result.multipleAgents).toBe(true);
    });

    test('handles impossible or unrealistic desires', () => {
      const result = sutra1449('असम्भवकाम्य', {
        agent: 'मूर्ख',
        action: 'दुराशा',
        realistic: false,
        achievability: 'impossible'
      });
      
      expect(result.applies).toBe(true);
      expect(result.unrealisticDesire).toBe(true);
    });

    test('handles suppressed or denied desires', () => {
      const result = sutra1449('गुप्तकाम', {
        agent: 'संयमी',
        action: 'दमन',
        suppressed: true,
        expression: 'denied'
      });
      
      expect(result.applies).toBe(true);
      expect(result.suppressedDesire).toBe(true);
    });

    test('handles desires for abstract states', () => {
      const result = sutra1449('निर्वाण', {
        agent: 'साधक',
        action: 'अभिलाष',
        abstractState: true,
        desireForState: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.abstractState).toBe(true);
      expect(result.desireForState).toBe(true);
    });
  });
});
