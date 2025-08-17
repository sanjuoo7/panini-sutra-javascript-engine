/**
 * Test suite for Sutra 1.4.50: तथायुक्तं चानीप्सितम्
 * 
 * This sutra establishes that undesired (अनीप्सित) objects that are similarly connected also function as कर्म कारक.
 */

import { sutra1450 } from './index.js';

describe('Sutra 1.4.50: तथायुक्तं चानीप्सितम् (tathāyuktaṃ cānīpsitam)', () => {
  
  describe('Basic undesired object identification', () => {
    test('identifies objects of avoidance', () => {
      const avoidanceObjects = [
        { word: 'दुःख', agent: 'सुखकामी', action: 'परिहार', type: 'suffering' },
        { word: 'रोग', agent: 'रोगी', action: 'निवारण', type: 'disease' },
        { word: 'भय', agent: 'भीरु', action: 'त्याग', type: 'fear' },
        { word: 'शोक', agent: 'व्यक्ति', action: 'विसर्जन', type: 'grief' }
      ];
      
      avoidanceObjects.forEach(({ word, agent, action, type }) => {
        const result = sutra1450(word, {
          agent: agent,
          action: action,
          context: `${agent}ः ${word}ं ${action === 'परिहार' ? 'परिहरति' : action === 'निवारण' ? 'निवारयति' : action === 'त्याग' ? 'त्यजति' : 'विसृजति'}`,
          desirability: 'unwanted',
          avoidanceType: type
        });
        
        expect(result.applies).toBe(true);
        expect(result.karaka).toBe('कर्म');
        expect(result.objectCategory).toBe('undesired');
        expect(result.avoidanceType).toBe(type);
        expect(result.aniipsita).toBe(true);
      });
    });

    test('identifies objects of destruction', () => {
      const destructionObjects = [
        { word: 'शत्रु', agent: 'वीर', action: 'वध', target: 'enemy' },
        { word: 'पाप', agent: 'पुण्यात्मा', action: 'नाश', target: 'sin' },
        { word: 'अज्ञान', agent: 'ज्ञानी', action: 'विनाश', target: 'ignorance' },
        { word: 'कलह', agent: 'शान्तिप्रिय', action: 'समूलोच्छेद', target: 'conflict' }
      ];
      
      destructionObjects.forEach(({ word, agent, action, target }) => {
        const result = sutra1450(word, {
          agent: agent,
          action: action,
          context: `${agent}ः ${word}ं ${action === 'वध' ? 'हन्ति' : action === 'नाश' ? 'नाशयति' : action === 'विनाश' ? 'विनाशयति' : 'उच्छिनत्ति'}`,
          destructive: true,
          destructionTarget: target
        });
        
        expect(result.applies).toBe(true);
        expect(result.objectCategory).toBe('destruction_target');
        expect(result.destructive).toBe(true);
        expect(result.destructionTarget).toBe(target);
      });
    });

    test('identifies objects of removal', () => {
      const removalObjects = [
        { word: 'कण्टक', agent: 'माली', action: 'निष्कासन', removal: 'thorn' },
        { word: 'मल', agent: 'स्वच्छताप्रेमी', action: 'प्रक्षालन', removal: 'dirt' },
        { word: 'विष', agent: 'वैद्य', action: 'निष्कर्षण', removal: 'poison' }
      ];
      
      removalObjects.forEach(({ word, agent, action, removal }) => {
        const result = sutra1450(word, {
          agent: agent,
          action: action,
          removalType: removal,
          cleansingAction: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.objectCategory).toBe('removal_target');
        expect(result.removalType).toBe(removal);
        expect(result.cleansingAction).toBe(true);
      });
    });
  });

  describe('Negative intention and aversion analysis', () => {
    test('analyzes conscious aversion', () => {
      const aversionTypes = [
        { word: 'झूठ', aversion: 'moral', reason: 'ethical_principle' },
        { word: 'हिंसा', aversion: 'compassionate', reason: 'non_violence' },
        { word: 'अधर्म', aversion: 'dharmic', reason: 'righteousness' },
        { word: 'अन्याय', aversion: 'justice_based', reason: 'fairness' }
      ];
      
      aversionTypes.forEach(({ word, aversion, reason }) => {
        const result = sutra1450(word, {
          agent: 'सदाचारी',
          action: 'विरोध',
          aversionType: aversion,
          aversionReason: reason,
          consciousRejection: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.aversionType).toBe(aversion);
        expect(result.aversionReason).toBe(reason);
        expect(result.consciousRejection).toBe(true);
      });
    });

    test('analyzes instinctive avoidance', () => {
      const instinctiveAvoidances = [
        { word: 'अग्नि', instinct: 'self_preservation', response: 'flee' },
        { word: 'सर्प', instinct: 'danger_avoidance', response: 'retreat' },
        { word: 'गर्जन', instinct: 'fear_response', response: 'hide' }
      ];
      
      instinctiveAvoidances.forEach(({ word, instinct, response }) => {
        const result = sutra1450(word, {
          agent: 'प्राणी',
          action: 'पलायन',
          instinctiveAvoidance: true,
          survivalInstinct: instinct,
          avoidanceResponse: response
        });
        
        expect(result.applies).toBe(true);
        expect(result.instinctiveAvoidance).toBe(true);
        expect(result.survivalInstinct).toBe(instinct);
      });
    });

    test('analyzes learned aversion', () => {
      const learnedAversions = [
        { word: 'कटुभाषण', learning: 'social', source: 'experience' },
        { word: 'असफलता', learning: 'psychological', source: 'conditioning' },
        { word: 'तिरस्कार', learning: 'emotional', source: 'trauma' }
      ];
      
      learnedAversions.forEach(({ word, learning, source }) => {
        const result = sutra1450(word, {
          agent: 'अनुभवी',
          action: 'परिहार',
          learnedAversion: true,
          learningType: learning,
          aversionSource: source
        });
        
        expect(result.applies).toBe(true);
        expect(result.learnedAversion).toBe(true);
        expect(result.learningType).toBe(learning);
      });
    });
  });

  describe('Preventive and protective actions', () => {
    test('identifies prevention targets', () => {
      const preventionTargets = [
        { word: 'अपराध', agent: 'न्यायाधीश', prevention: 'crime' },
        { word: 'व्याधि', agent: 'वैद्य', prevention: 'disease' },
        { word: 'दुर्घटना', agent: 'सुरक्षाकर्मी', prevention: 'accident' },
        { word: 'युद्ध', agent: 'शान्तिदूत', prevention: 'war' }
      ];
      
      preventionTargets.forEach(({ word, agent, prevention }) => {
        const result = sutra1450(word, {
          agent: agent,
          action: 'निवारण',
          preventiveAction: true,
          preventionType: prevention
        });
        
        expect(result.applies).toBe(true);
        expect(result.preventiveAction).toBe(true);
        expect(result.preventionType).toBe(prevention);
      });
    });

    test('analyzes protective motivations', () => {
      const protectiveActions = [
        { word: 'कष्ट', protection: 'family', beneficiary: 'परिवार' },
        { word: 'हानि', protection: 'community', beneficiary: 'समुदाय' },
        { word: 'संकट', protection: 'nation', beneficiary: 'राष्ट्र' }
      ];
      
      protectiveActions.forEach(({ word, protection, beneficiary }) => {
        const result = sutra1450(word, {
          agent: 'रक्षक',
          action: 'निवारण',
          protectiveMotivation: true,
          protectionScope: protection,
          beneficiary: beneficiary
        });
        
        expect(result.applies).toBe(true);
        expect(result.protectiveMotivation).toBe(true);
        expect(result.protectionScope).toBe(protection);
      });
    });
  });

  describe('Tathāyukta (similar connection) analysis', () => {
    test('analyzes connection similarity to desired objects', () => {
      const result = sutra1450('बाधा', {
        agent: 'साधक',
        action: 'निराकरण',
        tathayuktaRelation: true,
        similarConnectionTo: 'ईप्सित_सिद्धि',
        connectionType: 'obstacle_to_goal'
      });
      
      expect(result.applies).toBe(true);
      expect(result.tathayuktaRelation).toBe(true);
      expect(result.connectionType).toBe('obstacle_to_goal');
      expect(result.relatedToDesired).toBe(true);
    });

    test('handles parallel structure with 1.4.49', () => {
      const result = sutra1450('विघ्न', {
        agent: 'कर्ता',
        action: 'दूरीकरण',
        parallelToIpsita: true,
        sutra149Relationship: true,
        structuralSimilarity: 'object_of_intention'
      });
      
      expect(result.applies).toBe(true);
      expect(result.parallelToIpsita).toBe(true);
      expect(result.sutra149Relationship).toBe(true);
    });

    test('validates connection strength and relevance', () => {
      const connectionStrengths = [
        { strength: 'direct', relevance: 'immediate' },
        { strength: 'indirect', relevance: 'mediated' },
        { strength: 'causal', relevance: 'consequential' }
      ];
      
      connectionStrengths.forEach(({ strength, relevance }) => {
        const result = sutra1450('प्रतिबन्ध', {
          agent: 'इच्छुक',
          action: 'निष्कासन',
          connectionStrength: strength,
          connectionRelevance: relevance
        });
        
        expect(result.applies).toBe(true);
        expect(result.connectionStrength).toBe(strength);
        expect(result.connectionRelevance).toBe(relevance);
      });
    });
  });

  describe('Degrees of undesirability', () => {
    test('measures aversion intensity levels', () => {
      const aversionLevels = [
        { word: 'असुविधा', level: 'mild', tolerance: 'acceptable' },
        { word: 'कष्ट', level: 'moderate', tolerance: 'difficult' },
        { word: 'पीड़ा', level: 'severe', tolerance: 'unbearable' },
        { word: 'यातना', level: 'extreme', tolerance: 'impossible' }
      ];
      
      aversionLevels.forEach(({ word, level, tolerance }) => {
        const result = sutra1450(word, {
          agent: 'भोक्ता',
          action: 'निवारण',
          aversionIntensity: level,
          toleranceLevel: tolerance
        });
        
        expect(result.applies).toBe(true);
        expect(result.aversionIntensity).toBe(level);
        expect(result.toleranceLevel).toBe(tolerance);
      });
    });

    test('handles contextual undesirability', () => {
      const result = sutra1450('वर्षा', {
        agent: 'यात्री',
        action: 'परिहार',
        contextuallyUndesired: true,
        context: 'journey_time',
        normallyNeutral: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.contextuallyUndesired).toBe(true);
      expect(result.situationalAversion).toBe(true);
    });
  });

  describe('Cultural and moral dimensions', () => {
    test('identifies morally undesirable objects', () => {
      const morallyUndesired = [
        { word: 'कपट', moral: 'dishonesty', principle: 'सत्य' },
        { word: 'क्रोध', moral: 'anger', principle: 'शान्ति' },
        { word: 'लोभ', moral: 'greed', principle: 'सन्तोष' },
        { word: 'अहङ्कार', moral: 'ego', principle: 'विनम्रता' }
      ];
      
      morallyUndesired.forEach(({ word, moral, principle }) => {
        const result = sutra1450(word, {
          agent: 'धर्मात्मा',
          action: 'त्याग',
          morallyUndesired: true,
          moralViolation: moral,
          opposedPrinciple: principle
        });
        
        expect(result.applies).toBe(true);
        expect(result.morallyUndesired).toBe(true);
        expect(result.moralViolation).toBe(moral);
      });
    });

    test('handles socially unacceptable objects', () => {
      const sociallyUndesired = [
        { word: 'निन्दा', social: 'criticism', norm: 'respect' },
        { word: 'अपमान', social: 'insult', norm: 'dignity' },
        { word: 'तिरस्कार', social: 'contempt', norm: 'courtesy' }
      ];
      
      sociallyUndesired.forEach(({ word, social, norm }) => {
        const result = sutra1450(word, {
          agent: 'सभ्य',
          action: 'निषेध',
          sociallyUndesired: true,
          socialViolation: social,
          socialNorm: norm
        });
        
        expect(result.applies).toBe(true);
        expect(result.sociallyUndesired).toBe(true);
        expect(result.socialViolation).toBe(social);
      });
    });
  });

  describe('Multi-script support', () => {
    test('handles Devanagari input', () => {
      const result = sutra1450('दुःख', {
        agent: 'व्यक्ति',
        action: 'परिहार',
        script: 'Devanagari'
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('Devanagari');
    });

    test('handles IAST input', () => {
      const result = sutra1450('duḥkha', {
        agent: 'vyakti',
        action: 'parihāra',
        script: 'IAST'
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('IAST');
    });
  });

  describe('Error handling', () => {
    test('handles empty input', () => {
      const result = sutra1450('');
      expect(result.applies).toBe(false);
      expect(result.error).toBe('empty_input');
    });

    test('handles desired objects (should not apply)', () => {
      const result = sutra1450('सुख', {
        agent: 'व्यक्ति',
        action: 'प्राप्ति',
        desirability: 'wanted'
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('not_undesired_object');
    });

    test('handles missing avoidance context', () => {
      const result = sutra1450('वस्तु', {
        agent: 'व्यक्ति',
        action: 'सेवन' // positive action, not avoidance
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('no_avoidance_or_negative_intention');
    });

    test('handles invalid Sanskrit input', () => {
      const result = sutra1450('xyz123', {
        agent: 'person',
        action: 'avoid'
      });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_sanskrit_input');
    });
  });

  describe('Integration with कर्म system', () => {
    test('extends कर्म definition from 1.4.49', () => {
      const result = sutra1450('विघ्नकारी', {
        agent: 'साधक',
        action: 'निष्कासन',
        extendsIpsitaSutra: true,
        complementaryDefinition: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.extendsIpsitaSutra).toBe(true);
      expect(result.complementaryDefinition).toBe(true);
    });

    test('maintains कर्म karaka assignment', () => {
      const result = sutra1450('अशुभ', {
        agent: 'शुभकामी',
        action: 'विनाश',
        context: 'शुभकामी अशुभं विनाशयति',
        karmaDesignation: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('कर्म');
      expect(result.karmaDesignation).toBe(true);
    });

    test('distinguishes from other कारक relations', () => {
      const result = sutra1450('शत्रुता', {
        agent: 'मित्र',
        action: 'समाप्ति',
        context: 'मित्रः शत्रुतां समाप्यति',
        notKarana: true,
        notApadana: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('कर्म');
      expect(result.notKarana).toBe(true);
    });
  });

  describe('Edge cases', () => {
    test('handles ambivalent objects (both desired and undesired)', () => {
      const result = sutra1450('द्विविधभाव', {
        agent: 'संशयग्रस्त',
        action: 'निर्णय',
        ambivalent: true,
        contextDetermines: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.ambivalentObject).toBe(true);
    });

    test('handles objects becoming undesired over time', () => {
      const result = sutra1450('पूर्वप्रिय', {
        agent: 'परिवर्तित',
        action: 'त्याग',
        temporalShift: true,
        previouslyDesired: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.temporalShift).toBe(true);
      expect(result.previouslyDesired).toBe(true);
    });

    test('handles collectively vs individually undesired', () => {
      const result = sutra1450('सामाजिकबुराई', {
        agents: ['व्यक्ति_अ', 'व्यक्ति_ब', 'समुदाय'],
        action: 'उन्मूलन',
        collectiveAversion: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.collectiveAversion).toBe(true);
    });

    test('handles necessary but undesired objects', () => {
      const result = sutra1450('कटुऔषध', {
        agent: 'रोगी',
        action: 'सेवन',
        necessary: true,
        reluctantAcceptance: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.necessaryEvil).toBe(true);
      expect(result.reluctantAcceptance).toBe(true);
    });
  });
});
