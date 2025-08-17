/**
 * Test suite for Sutra 1.4.51: अकथितं च
 * 
 * This sutra establishes that unspecified (अकथित) objects function as कर्म कारक as a default rule.
 */

import { sutra1451 } from './index.js';

describe('Sutra 1.4.51: अकथितं च (akathitaṃ ca)', () => {
  
  describe('Basic unspecified object identification', () => {
    test('identifies simple transitive objects', () => {
      const simpleObjects = [
        { word: 'पुस्तक', agent: 'छात्र', action: 'पठन', object: 'book' },
        { word: 'भोजन', agent: 'व्यक्ति', action: 'भक्षण', object: 'food' },
        { word: 'गीत', agent: 'गायक', action: 'गायन', object: 'song' },
        { word: 'चित्र', agent: 'चित्रकार', action: 'निर्माण', object: 'picture' }
      ];
      
      simpleObjects.forEach(({ word, agent, action, object }) => {
        const result = sutra1451(word, {
          agent: agent,
          action: action,
          context: `${agent}ः ${word}ं ${action === 'पठन' ? 'पठति' : action === 'भक्षण' ? 'भुङ्क्ते' : action === 'गायन' ? 'गायति' : 'निर्मति'}`,
          unspecified: true,
          transitiveObject: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.karaka).toBe('कर्म');
        expect(result.objectType).toBe('unspecified');
        expect(result.defaultKarma).toBe(true);
        expect(result.akathita).toBe(true);
      });
    });

    test('identifies general activity objects', () => {
      const activityObjects = [
        { word: 'कार्य', agent: 'कर्मचारी', activity: 'work' },
        { word: 'खेल', agent: 'बालक', activity: 'game' },
        { word: 'व्यायाम', agent: 'व्यायामी', activity: 'exercise' },
        { word: 'अभ्यास', agent: 'साधक', activity: 'practice' }
      ];
      
      activityObjects.forEach(({ word, agent, activity }) => {
        const result = sutra1451(word, {
          agent: agent,
          action: 'सम्पादन',
          objectCategory: 'activity',
          generalObject: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.objectCategory).toBe('activity');
        expect(result.generalObject).toBe(true);
      });
    });

    test('identifies everyday objects', () => {
      const everydayObjects = [
        { word: 'वस्त्र', agent: 'व्यक्ति', action: 'धारण', everyday: 'clothing' },
        { word: 'जूता', agent: 'पादयात्री', action: 'पादन', everyday: 'footwear' },
        { word: 'छत्र', agent: 'यात्री', action: 'धारण', everyday: 'umbrella' }
      ];
      
      everydayObjects.forEach(({ word, agent, action, everyday }) => {
        const result = sutra1451(word, {
          agent: agent,
          action: action,
          objectCategory: 'everyday',
          practicalObject: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.objectCategory).toBe('everyday');
        expect(result.practicalObject).toBe(true);
      });
    });
  });

  describe('Fallback rule application', () => {
    test('applies when no specific rule covers the object', () => {
      const result = sutra1451('सामान्यवस्तु', {
        agent: 'कर्ता',
        action: 'व्यवहार',
        specificRuleCoverage: false,
        fallbackRequired: true,
        noAlternativeDesignation: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.fallbackRule).toBe(true);
      expect(result.noSpecificRule).toBe(true);
      expect(result.defaultDesignation).toBe(true);
    });

    test('checks against other कर्म rules first', () => {
      const result = sutra1451('अनिर्दिष्ट', {
        agent: 'कर्ता',
        action: 'कर्म',
        checkedAgainst: ['1.4.49', '1.4.50'],
        notCoveredBy: ['ipsita', 'aniipsita'],
        fallbackApplicable: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.rulePriorityCheck).toBe(true);
      expect(result.notCoveredByPrevious).toBe(true);
    });

    test('ensures transitive relationship exists', () => {
      const result = sutra1451('कर्मविषय', {
        agent: 'कर्ता',
        action: 'सकर्मकक्रिया',
        transitivity: true,
        directObject: true,
        actionTargetsObject: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.transitiveRelation).toBe(true);
      expect(result.directObject).toBe(true);
    });
  });

  describe('Unspecified vs specified distinction', () => {
    test('distinguishes from specifically desired objects (1.4.49)', () => {
      const result = sutra1451('तटस्थवस्तु', {
        agent: 'निष्पक्ष',
        action: 'व्यवहार',
        neutralObject: true,
        notSpecificallyDesired: true,
        notEmotionallyCharged: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.neutralObject).toBe(true);
      expect(result.notIpsita).toBe(true);
    });

    test('distinguishes from specifically undesired objects (1.4.50)', () => {
      const result = sutra1451('उदासीनवस्तु', {
        agent: 'व्यक्ति',
        action: 'सम्पर्क',
        indifferentObject: true,
        notSpecificallyUndesired: true,
        noAversion: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.indifferentObject).toBe(true);
      expect(result.notAniipsita).toBe(true);
    });

    test('handles emotionally neutral objects', () => {
      const neutralObjects = [
        { word: 'पत्थर', emotion: 'neutral', response: 'indifferent' },
        { word: 'लकड़ी', emotion: 'neutral', response: 'practical' },
        { word: 'धातु', emotion: 'neutral', response: 'utilitarian' }
      ];
      
      neutralObjects.forEach(({ word, emotion, response }) => {
        const result = sutra1451(word, {
          agent: 'व्यक्ति',
          action: 'उपयोग',
          emotionalValence: emotion,
          responseType: response
        });
        
        expect(result.applies).toBe(true);
        expect(result.emotionalValence).toBe(emotion);
        expect(result.responseType).toBe(response);
      });
    });
  });

  describe('Rule hierarchy and prioritization', () => {
    test('checks rule priority order', () => {
      const priorityOrder = [
        { priority: 1, rule: '1.4.49', type: 'ipsita' },
        { priority: 2, rule: '1.4.50', type: 'aniipsita' },
        { priority: 3, rule: '1.4.51', type: 'akathita' }
      ];
      
      const result = sutra1451('प्राथमिकताविषय', {
        agent: 'कर्ता',
        action: 'निर्णय',
        rulePriority: priorityOrder,
        fallbackPosition: 3
      });
      
      expect(result.applies).toBe(true);
      expect(result.rulePriority).toBeDefined();
      expect(result.fallbackPosition).toBe(3);
    });

    test('handles rule conflict resolution', () => {
      const result = sutra1451('द्विविधविषय', {
        agent: 'कर्ता',
        action: 'व्यवहार',
        potentialConflicts: ['करण', 'अधिकरण'],
        resolutionStrategy: 'context_based',
        defaultToKarma: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.conflictResolution).toBe('context_based');
      expect(result.defaultToKarma).toBe(true);
    });
  });

  describe('Contextual object analysis', () => {
    test('analyzes context-dependent objects', () => {
      const contextualObjects = [
        { word: 'सामग्री', context: 'cooking', interpretation: 'ingredients' },
        { word: 'उपकरण', context: 'work', interpretation: 'tools' },
        { word: 'सामान', context: 'travel', interpretation: 'luggage' }
      ];
      
      contextualObjects.forEach(({ word, context, interpretation }) => {
        const result = sutra1451(word, {
          agent: 'व्यक्ति',
          action: 'उपयोग',
          contextType: context,
          contextualInterpretation: interpretation
        });
        
        expect(result.applies).toBe(true);
        expect(result.contextType).toBe(context);
        expect(result.contextualInterpretation).toBe(interpretation);
      });
    });

    test('handles situation-specific objects', () => {
      const situationalObjects = [
        { word: 'आवश्यकता', situation: 'emergency', urgency: 'high' },
        { word: 'सुविधा', situation: 'comfort', urgency: 'low' },
        { word: 'विकल्प', situation: 'choice', urgency: 'medium' }
      ];
      
      situationalObjects.forEach(({ word, situation, urgency }) => {
        const result = sutra1451(word, {
          agent: 'व्यक्ति',
          action: 'व्यवस्था',
          situationalContext: situation,
          urgencyLevel: urgency
        });
        
        expect(result.applies).toBe(true);
        expect(result.situationalContext).toBe(situation);
        expect(result.urgencyLevel).toBe(urgency);
      });
    });
  });

  describe('General vs specific object types', () => {
    test('handles abstract objects', () => {
      const abstractObjects = [
        { word: 'संकल्प', abstraction: 'concept', category: 'mental' },
        { word: 'भावना', abstraction: 'emotion', category: 'psychological' },
        { word: 'विचार', abstraction: 'thought', category: 'cognitive' }
      ];
      
      abstractObjects.forEach(({ word, abstraction, category }) => {
        const result = sutra1451(word, {
          agent: 'मन',
          action: 'धारणा',
          abstractLevel: abstraction,
          objectCategory: category
        });
        
        expect(result.applies).toBe(true);
        expect(result.abstractLevel).toBe(abstraction);
        expect(result.objectCategory).toBe(category);
      });
    });

    test('handles concrete objects', () => {
      const concreteObjects = [
        { word: 'पदार्थ', concreteness: 'physical', tangibility: 'touchable' },
        { word: 'द्रव्य', concreteness: 'material', tangibility: 'substantial' },
        { word: 'वस्तु', concreteness: 'thing', tangibility: 'solid' }
      ];
      
      concreteObjects.forEach(({ word, concreteness, tangibility }) => {
        const result = sutra1451(word, {
          agent: 'व्यक्ति',
          action: 'स्पर्श',
          concreteLevel: concreteness,
          tangibilityLevel: tangibility
        });
        
        expect(result.applies).toBe(true);
        expect(result.concreteLevel).toBe(concreteness);
        expect(result.tangibilityLevel).toBe(tangibility);
      });
    });
  });

  describe('Multi-script support', () => {
    test('handles Devanagari input', () => {
      const result = sutra1451('पुस्तक', {
        agent: 'छात्र',
        action: 'पठन',
        script: 'Devanagari'
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('Devanagari');
    });

    test('handles IAST input', () => {
      const result = sutra1451('pustaka', {
        agent: 'chātra',
        action: 'paṭhana',
        script: 'IAST'
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('IAST');
    });
  });

  describe('Error handling', () => {
    test('handles empty input', () => {
      const result = sutra1451('');
      expect(result.applies).toBe(false);
      expect(result.error).toBe('empty_input');
    });

    test('handles intransitive contexts', () => {
      const result = sutra1451('स्थान', {
        agent: 'व्यक्ति',
        action: 'अवस्थान', // intransitive - staying/being
        intransitive: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('intransitive_context');
    });

    test('handles objects covered by specific rules', () => {
      const result = sutra1451('अतिप्रिय', {
        agent: 'प्रेमी',
        action: 'प्राप्ति',
        specificallyDesired: true,
        coveredBy: '1.4.49'
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('covered_by_specific_rule');
      expect(result.specificRule).toBe('1.4.49');
    });

    test('handles invalid Sanskrit input', () => {
      const result = sutra1451('xyz123', {
        agent: 'person',
        action: 'action'
      });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_sanskrit_input');
    });
  });

  describe('Integration with कर्म system', () => {
    test('serves as comprehensive fallback', () => {
      const result = sutra1451('व्यापकविषय', {
        agent: 'कर्ता',
        action: 'व्यापकक्रिया',
        comprehensiveFallback: true,
        catchAllRule: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.comprehensiveFallback).toBe(true);
      expect(result.catchAllRule).toBe(true);
    });

    test('completes कर्म definition series', () => {
      const result = sutra1451('पूर्णकर्म', {
        agent: 'कर्ता',
        action: 'सम्पूर्णक्रिया',
        completesDefinition: true,
        definitionSeries: ['1.4.49', '1.4.50', '1.4.51']
      });
      
      expect(result.applies).toBe(true);
      expect(result.completesDefinition).toBe(true);
      expect(result.definitionSeries).toContain('1.4.51');
    });

    test('ensures no object is left unassigned', () => {
      const result = sutra1451('अवशिष्टविषय', {
        agent: 'कर्ता',
        action: 'अवशिष्टक्रिया',
        ensuresCompleteness: true,
        noObjectUnassigned: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.ensuresCompleteness).toBe(true);
      expect(result.noObjectUnassigned).toBe(true);
    });
  });

  describe('Edge cases', () => {
    test('handles borderline objects between कारक types', () => {
      const result = sutra1451('सीमान्तविषय', {
        agent: 'कर्ता',
        action: 'सीमान्तक्रिया',
        borderlineCase: true,
        ambiguousKaraka: true,
        defaultResolution: 'karma'
      });
      
      expect(result.applies).toBe(true);
      expect(result.borderlineCase).toBe(true);
      expect(result.defaultResolution).toBe('karma');
    });

    test('handles objects with minimal semantic specification', () => {
      const result = sutra1451('न्यूनविशेष', {
        agent: 'कर्ता',
        action: 'सामान्यक्रिया',
        minimalSpecification: true,
        genericObject: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.minimalSpecification).toBe(true);
      expect(result.genericObject).toBe(true);
    });

    test('handles meta-linguistic objects', () => {
      const result = sutra1451('भाषाविषय', {
        agent: 'व्याकरणज्ञ',
        action: 'विश्लेषण',
        metaLinguistic: true,
        languageObject: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.metaLinguistic).toBe(true);
      expect(result.languageObject).toBe(true);
    });

    test('handles recursive object references', () => {
      const result = sutra1451('स्वयंसन्दर्भ', {
        agent: 'कर्ता',
        action: 'स्वक्रिया',
        selfReferential: true,
        recursiveObject: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.selfReferential).toBe(true);
      expect(result.recursiveObject).toBe(true);
    });
  });
});
