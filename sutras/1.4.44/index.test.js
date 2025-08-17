/**
 * Test suite for Sutra 1.4.44: हेतुश्च
 * 
 * This sutra establishes that हेतु (cause/reason/motive) functions as करण कारक.
 */

import { sutra1444 } from './index.js';

describe('Sutra 1.4.44: हेतुश्च (hetuśca)', () => {
  
  describe('Basic हेतु identification', () => {
    test('identifies emotional causes', () => {
      const emotionalCauses = [
        { word: 'भय', action: 'पलायन', emotion: 'fear' },
        { word: 'क्रोध', action: 'दण्डन', emotion: 'anger' },
        { word: 'प्रेम', action: 'सेवा', emotion: 'love' },
        { word: 'लोभ', action: 'चौर्य', emotion: 'greed' }
      ];
      
      emotionalCauses.forEach(({ word, action, emotion }) => {
        const result = sutra1444(word, {
          action: action,
          context: `${word}ात् ${action}ं करोति`,
          causalType: 'emotional',
          case: 'ablative'
        });
        
        expect(result.applies).toBe(true);
        expect(result.karaka).toBe('करण');
        expect(result.hetuCategory).toBe('emotional');
        expect(result.emotionType).toBe(emotion);
      });
    });

    test('identifies logical causes', () => {
      const logicalCauses = [
        { word: 'युक्ति', action: 'निर्णय', type: 'reasoning' },
        { word: 'प्रमाण', action: 'सिद्धान्त', type: 'evidence' },
        { word: 'तर्क', action: 'स्थापना', type: 'logic' }
      ];
      
      logicalCauses.forEach(({ word, action, type }) => {
        const result = sutra1444(word, {
          action: action,
          context: `${word}ात् ${action}ं करोति`,
          causalType: 'logical'
        });
        
        expect(result.applies).toBe(true);
        expect(result.karaka).toBe('करण');
        expect(result.hetuCategory).toBe('logical');
        expect(result.reasoningType).toBe(type);
      });
    });

    test('identifies physical causes', () => {
      const physicalCauses = [
        { word: 'वात', action: 'गमन', type: 'wind' },
        { word: 'अग्नि', action: 'दाह', type: 'fire' },
        { word: 'जल', action: 'प्लावन', type: 'water' }
      ];
      
      physicalCauses.forEach(({ word, action, type }) => {
        const result = sutra1444(word, {
          action: action,
          context: `${word}ेन ${action}ं भवति`,
          causalType: 'physical'
        });
        
        expect(result.applies).toBe(true);
        expect(result.karaka).toBe('करण');
        expect(result.hetuCategory).toBe('physical');
        expect(result.elementType).toBe(type);
      });
    });
  });

  describe('Motivational analysis', () => {
    test('identifies moral motivations', () => {
      const moralMotives = [
        { word: 'धर्म', action: 'दान', motivation: 'duty' },
        { word: 'अधर्म', action: 'निषेध', motivation: 'prevention' },
        { word: 'न्याय', action: 'न्यायाधीश', motivation: 'justice' }
      ];
      
      moralMotives.forEach(({ word, action, motivation }) => {
        const result = sutra1444(word, {
          action: action,
          context: `${word}ात् ${action}ं करोति`,
          motivationType: 'moral'
        });
        
        expect(result.applies).toBe(true);
        expect(result.karaka).toBe('करण');
        expect(result.motivationCategory).toBe('moral');
        expect(result.ethicalType).toBe(motivation);
      });
    });

    test('identifies practical motivations', () => {
      const practicalMotives = [
        { word: 'आवश्यकता', action: 'कर्म', type: 'necessity' },
        { word: 'लाभ', action: 'व्यापार', type: 'profit' },
        { word: 'सुख', action: 'भोग', type: 'pleasure' }
      ];
      
      practicalMotives.forEach(({ word, action, type }) => {
        const result = sutra1444(word, {
          action: action,
          context: `${word}ात् ${action}ं करोति`,
          motivationType: 'practical'
        });
        
        expect(result.applies).toBe(true);
        expect(result.motivationCategory).toBe('practical');
        expect(result.practicalType).toBe(type);
      });
    });

    test('identifies social motivations', () => {
      const socialMotives = [
        { word: 'मान', action: 'यत्न', type: 'honor' },
        { word: 'लज्जा', action: 'गुप्ति', type: 'shame' },
        { word: 'भक्ति', action: 'सेवा', type: 'devotion' }
      ];
      
      socialMotives.forEach(({ word, action, type }) => {
        const result = sutra1444(word, {
          action: action,
          motivationType: 'social'
        });
        
        expect(result.applies).toBe(true);
        expect(result.motivationCategory).toBe('social');
        expect(result.socialType).toBe(type);
      });
    });
  });

  describe('Abstract vs concrete causes', () => {
    test('handles abstract philosophical causes', () => {
      const abstractCauses = [
        { word: 'कर्म', context: 'past_action', philosophy: 'karma_theory' },
        { word: 'भाग्य', context: 'destiny', philosophy: 'fate' },
        { word: 'इच्छा', context: 'will', philosophy: 'volition' }
      ];
      
      abstractCauses.forEach(({ word, context, philosophy }) => {
        const result = sutra1444(word, {
          action: 'फल',
          causalType: 'abstract',
          philosophicalContext: philosophy,
          abstractLevel: 'high'
        });
        
        expect(result.applies).toBe(true);
        expect(result.abstractCause).toBe(true);
        expect(result.philosophicalDimension).toBe(philosophy);
      });
    });

    test('handles concrete immediate causes', () => {
      const concreteCauses = [
        { word: 'वर्षा', action: 'कर्दम', immediacy: 'direct' },
        { word: 'सूर्य', action: 'शुष्कता', immediacy: 'direct' },
        { word: 'शीत', action: 'कम्पन', immediacy: 'immediate' }
      ];
      
      concreteCauses.forEach(({ word, action, immediacy }) => {
        const result = sutra1444(word, {
          action: action,
          causalType: 'concrete',
          immediacy: immediacy
        });
        
        expect(result.applies).toBe(true);
        expect(result.concreteCause).toBe(true);
        expect(result.immediacy).toBe(immediacy);
      });
    });
  });

  describe('Causal relationship strength', () => {
    test('identifies primary vs secondary causes', () => {
      const result = sutra1444('अग्नि', {
        action: 'पाक',
        context: 'अग्निना पचति',
        primaryCause: true,
        secondaryCauses: ['तैल', 'पात्र']
      });
      
      expect(result.applies).toBe(true);
      expect(result.causalStrength).toBe('primary');
      expect(result.primaryCause).toBe(true);
    });

    test('handles necessary vs sufficient causes', () => {
      const result = sutra1444('ज्ञान', {
        action: 'मोक्ष',
        causalType: 'necessary',
        sufficiency: false
      });
      
      expect(result.applies).toBe(true);
      expect(result.causalNecessity).toBe('necessary');
      expect(result.causalSufficiency).toBe(false);
    });

    test('analyzes causal chains', () => {
      const result = sutra1444('अविद्या', {
        action: 'दुःख',
        causalChain: ['अविद्या', 'संस्कार', 'कर्म', 'फल', 'दुःख'],
        position: 'root_cause'
      });
      
      expect(result.applies).toBe(true);
      expect(result.causalChain).toBeDefined();
      expect(result.positionInChain).toBe('root_cause');
    });
  });

  describe('Case analysis', () => {
    test('handles ablative case for causes', () => {
      const result = sutra1444('भय', {
        action: 'पलायन',
        context: 'भयात् पलायते',
        case: 'ablative',
        caseMarker: 'आत्'
      });
      
      expect(result.applies).toBe(true);
      expect(result.grammaticalCase).toBe('ablative');
      expect(result.causalCase).toBe(true);
    });

    test('handles instrumental case for causes', () => {
      const result = sutra1444('क्रोध', {
        action: 'हिंसा',
        context: 'क्रोधेन हिनस्ति',
        case: 'instrumental'
      });
      
      expect(result.applies).toBe(true);
      expect(result.grammaticalCase).toBe('instrumental');
      expect(result.instrumentalCause).toBe(true);
    });
  });

  describe('Multi-script support', () => {
    test('handles Devanagari input', () => {
      const result = sutra1444('भय', {
        action: 'पलायन',
        script: 'Devanagari'
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('Devanagari');
    });

    test('handles IAST input', () => {
      const result = sutra1444('bhaya', {
        action: 'palāyana',
        script: 'IAST'
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('IAST');
    });
  });

  describe('Error handling', () => {
    test('handles empty input', () => {
      const result = sutra1444('');
      expect(result.applies).toBe(false);
      expect(result.error).toBe('empty_input');
    });

    test('handles non-causal words', () => {
      const result = sutra1444('पुस्तक', {
        action: 'पठन',
        causalType: 'none'
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('not_causal_relationship');
    });

    test('handles missing action context', () => {
      const result = sutra1444('भय', {
        // missing action
        causalType: 'emotional'
      });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('missing_action_context');
    });
  });

  describe('Integration with other कारक systems', () => {
    test('integrates with करण sutra 1.4.42', () => {
      const result = sutra1444('क्रोध', {
        action: 'दण्डन',
        karanaSutra: '1.4.42',
        instrumentality: 'causal'
      });
      
      expect(result.applies).toBe(true);
      expect(result.karanaSutraIntegration).toBe(true);
      expect(result.causalInstrumentality).toBe(true);
    });

    test('distinguishes from अपादान (source)', () => {
      const result = sutra1444('भय', {
        action: 'पलायन',
        context: 'भयात् पलायते',
        apadanaTest: false
      });
      
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('करण');
      expect(result.notApadana).toBe(true);
    });

    test('handles overlapping कारक assignments', () => {
      const result = sutra1444('अग्नि', {
        action: 'पाक',
        conflictingKarakas: ['करण', 'उपादान'],
        resolution: 'context_dependent'
      });
      
      expect(result.applies).toBe(true);
      expect(result.conflictResolution).toBeDefined();
    });
  });

  describe('Edge cases', () => {
    test('handles compound causes', () => {
      const result = sutra1444('भयक्रोध', {
        action: 'युद्ध',
        compound: true,
        causes: ['भय', 'क्रोध']
      });
      
      expect(result.applies).toBe(true);
      expect(result.compoundCause).toBe(true);
      expect(result.individualCauses).toContain('भय');
      expect(result.individualCauses).toContain('क्रोध');
    });

    test('handles temporal causes', () => {
      const result = sutra1444('काल', {
        action: 'विनाश',
        temporalCause: true,
        timeType: 'destructive'
      });
      
      expect(result.applies).toBe(true);
      expect(result.temporalCause).toBe(true);
    });

    test('handles metaphysical causes', () => {
      const result = sutra1444('माया', {
        action: 'भ्रम',
        metaphysical: true,
        realityLevel: 'apparent'
      });
      
      expect(result.applies).toBe(true);
      expect(result.metaphysicalCause).toBe(true);
    });

    test('handles cultural context causes', () => {
      const result = sutra1444('संस्कार', {
        action: 'आचरण',
        culturalContext: true,
        tradition: 'vedic'
      });
      
      expect(result.applies).toBe(true);
      expect(result.culturalCause).toBe(true);
    });
  });
});
