/**
 * Test suite for Sutra 1.4.52: गतिर्यः कर्म शब्दयते
 * 
 * This sutra establishes that गति (motion/movement) which expresses कर्म functions as कर्म कारक.
 */

import { sutra1452 } from './index.js';

describe('Sutra 1.4.52: गतिर्यः कर्म शब्दयते (gatir yaḥ karma śabdayate)', () => {
  
  describe('Basic motion expression identification', () => {
    test('identifies directional movements', () => {
      const directionalMovements = [
        { word: 'उत्तरगति', direction: 'north', axis: 'horizontal' },
        { word: 'दक्षिणगमन', direction: 'south', axis: 'horizontal' },
        { word: 'पूर्वप्रयाण', direction: 'east', axis: 'horizontal' },
        { word: 'पश्चिमयान', direction: 'west', axis: 'horizontal' },
        { word: 'ऊर्ध्वगति', direction: 'upward', axis: 'vertical' },
        { word: 'अधोगमन', direction: 'downward', axis: 'vertical' }
      ];
      
      directionalMovements.forEach(({ word, direction, axis }) => {
        const result = sutra1452(word, {
          agent: 'गमनकर्ता',
          action: 'गमन',
          context: `गमनकर्ता ${word}ं गच्छति`,
          motionType: 'directional',
          direction: direction,
          spatialAxis: axis
        });
        
        expect(result.applies).toBe(true);
        expect(result.karaka).toBe('कर्म');
        expect(result.motionCategory).toBe('directional');
        expect(result.direction).toBe(direction);
        expect(result.spatialAxis).toBe(axis);
        expect(result.gatiExpression).toBe(true);
      });
    });

    test('identifies movement patterns', () => {
      const movementPatterns = [
        { word: 'वक्रगति', pattern: 'curved', geometry: 'non_linear' },
        { word: 'सरलगमन', pattern: 'straight', geometry: 'linear' },
        { word: 'चक्रप्रयाण', pattern: 'circular', geometry: 'rotational' },
        { word: 'कम्पनगति', pattern: 'oscillatory', geometry: 'vibrational' }
      ];
      
      movementPatterns.forEach(({ word, pattern, geometry }) => {
        const result = sutra1452(word, {
          agent: 'गतिकर्ता',
          action: 'प्रवर्तन',
          motionType: 'patterned',
          movementPattern: pattern,
          geometricType: geometry
        });
        
        expect(result.applies).toBe(true);
        expect(result.motionCategory).toBe('patterned');
        expect(result.movementPattern).toBe(pattern);
        expect(result.geometricType).toBe(geometry);
      });
    });

    test('identifies speed and velocity expressions', () => {
      const speedExpressions = [
        { word: 'द्रुतगति', speed: 'fast', velocity: 'high' },
        { word: 'मन्दगमन', speed: 'slow', velocity: 'low' },
        { word: 'तीव्रप्रयाण', speed: 'rapid', velocity: 'extreme' },
        { word: 'स्थिरगति', speed: 'steady', velocity: 'constant' }
      ];
      
      speedExpressions.forEach(({ word, speed, velocity }) => {
        const result = sutra1452(word, {
          agent: 'वेगवान्',
          action: 'गमन',
          motionType: 'velocity_based',
          speedLevel: speed,
          velocityType: velocity
        });
        
        expect(result.applies).toBe(true);
        expect(result.motionCategory).toBe('velocity_based');
        expect(result.speedLevel).toBe(speed);
        expect(result.velocityType).toBe(velocity);
      });
    });
  });

  describe('Spatial and dimensional analysis', () => {
    test('identifies single-dimensional movements', () => {
      const oneDimensionalMovements = [
        { word: 'अग्रगति', dimension: 'forward', axis: 'anterior_posterior' },
        { word: 'पश्चाद्गमन', dimension: 'backward', axis: 'anterior_posterior' },
        { word: 'ऊर्ध्वप्रयाण', dimension: 'upward', axis: 'vertical' },
        { word: 'अधोयान', dimension: 'downward', axis: 'vertical' }
      ];
      
      oneDimensionalMovements.forEach(({ word, dimension, axis }) => {
        const result = sutra1452(word, {
          agent: 'एकदिशागामी',
          action: 'गमन',
          spatialDimensions: 1,
          primaryDimension: dimension,
          movementAxis: axis
        });
        
        expect(result.applies).toBe(true);
        expect(result.spatialDimensions).toBe(1);
        expect(result.primaryDimension).toBe(dimension);
      });
    });

    test('identifies multi-dimensional movements', () => {
      const multiDimensionalMovements = [
        { word: 'त्रिआयामगति', dimensions: 3, complexity: 'complex' },
        { word: 'द्विदिशागमन', dimensions: 2, complexity: 'planar' },
        { word: 'सर्वदिशाप्रयाण', dimensions: 3, complexity: 'omnidirectional' }
      ];
      
      multiDimensionalMovements.forEach(({ word, dimensions, complexity }) => {
        const result = sutra1452(word, {
          agent: 'बहुदिशागामी',
          action: 'गमन',
          spatialDimensions: dimensions,
          movementComplexity: complexity
        });
        
        expect(result.applies).toBe(true);
        expect(result.spatialDimensions).toBe(dimensions);
        expect(result.movementComplexity).toBe(complexity);
      });
    });

    test('identifies path and trajectory types', () => {
      const pathTypes = [
        { word: 'सीधामार्ग', path: 'direct', efficiency: 'optimal' },
        { word: 'टेढ़ारास्ता', path: 'winding', efficiency: 'suboptimal' },
        { word: 'संक्षिप्तपथ', path: 'shortest', efficiency: 'maximum' },
        { word: 'व्यापकमार्ग', path: 'extensive', efficiency: 'comprehensive' }
      ];
      
      pathTypes.forEach(({ word, path, efficiency }) => {
        const result = sutra1452(word, {
          agent: 'पथगामी',
          action: 'अनुसरण',
          motionType: 'path_based',
          pathType: path,
          pathEfficiency: efficiency
        });
        
        expect(result.applies).toBe(true);
        expect(result.motionCategory).toBe('path_based');
        expect(result.pathType).toBe(path);
      });
    });
  });

  describe('Abstract motion expressions', () => {
    test('identifies mental movement concepts', () => {
      const mentalMovements = [
        { word: 'विचारगति', mental: 'thought', process: 'cognitive' },
        { word: 'भावनाप्रवाह', mental: 'emotion', process: 'affective' },
        { word: 'चेतनासंक्रमण', mental: 'consciousness', process: 'awareness' },
        { word: 'मनोयान', mental: 'mind', process: 'psychological' }
      ];
      
      mentalMovements.forEach(({ word, mental, process }) => {
        const result = sutra1452(word, {
          agent: 'मानसिकतत्त्व',
          action: 'प्रवर्तन',
          motionType: 'abstract',
          mentalProcess: mental,
          processType: process
        });
        
        expect(result.applies).toBe(true);
        expect(result.motionCategory).toBe('abstract');
        expect(result.mentalProcess).toBe(mental);
        expect(result.processType).toBe(process);
      });
    });

    test('identifies temporal movement concepts', () => {
      const temporalMovements = [
        { word: 'कालगति', temporal: 'time', flow: 'chronological' },
        { word: 'युगसंक्रमण', temporal: 'epoch', flow: 'historical' },
        { word: 'क्षणप्रवाह', temporal: 'moment', flow: 'instantaneous' },
        { word: 'अनन्तयान', temporal: 'eternity', flow: 'infinite' }
      ];
      
      temporalMovements.forEach(({ word, temporal, flow }) => {
        const result = sutra1452(word, {
          agent: 'कालतत्त्व',
          action: 'प्रवर्तन',
          motionType: 'temporal',
          temporalAspect: temporal,
          temporalFlow: flow
        });
        
        expect(result.applies).toBe(true);
        expect(result.motionCategory).toBe('temporal');
        expect(result.temporalAspect).toBe(temporal);
      });
    });

    test('identifies spiritual movement concepts', () => {
      const spiritualMovements = [
        { word: 'आत्मयात्रा', spiritual: 'soul_journey', level: 'transcendent' },
        { word: 'मोक्षगति', spiritual: 'liberation_path', level: 'ultimate' },
        { word: 'योगमार्ग', spiritual: 'yoga_path', level: 'disciplinary' },
        { word: 'भक्तिप्रयाण', spiritual: 'devotion_journey', level: 'emotional' }
      ];
      
      spiritualMovements.forEach(({ word, spiritual, level }) => {
        const result = sutra1452(word, {
          agent: 'साधक',
          action: 'अनुसरण',
          motionType: 'spiritual',
          spiritualJourney: spiritual,
          spiritualLevel: level
        });
        
        expect(result.applies).toBe(true);
        expect(result.motionCategory).toBe('spiritual');
        expect(result.spiritualJourney).toBe(spiritual);
      });
    });
  });

  describe('Motion verb integration', () => {
    test('integrates with गम् (go) family verbs', () => {
      const gamVerbs = [
        { verb: 'गच्छति', tense: 'present', aspect: 'ongoing' },
        { verb: 'अगमत्', tense: 'past', aspect: 'completed' },
        { verb: 'गमिष्यति', tense: 'future', aspect: 'intended' },
        { verb: 'गम्यते', voice: 'passive', aspect: 'receptive' }
      ];
      
      gamVerbs.forEach(({ verb, tense, voice, aspect }) => {
        const result = sutra1452('गतिविशेष', {
          agent: 'गमनकर्ता',
          action: 'गमन',
          verb: verb,
          tense: tense,
          voice: voice,
          aspectualType: aspect
        });
        
        expect(result.applies).toBe(true);
        expect(result.motionVerb).toBe(true);
        expect(result.verbForm).toBeDefined();
      });
    });

    test('integrates with यान् (travel) family verbs', () => {
      const yanVerbs = [
        { verb: 'याति', meaning: 'goes', direction: 'forward' },
        { verb: 'प्रयाति', meaning: 'proceeds', direction: 'progressive' },
        { verb: 'संयाति', meaning: 'comes_together', direction: 'convergent' }
      ];
      
      yanVerbs.forEach(({ verb, meaning, direction }) => {
        const result = sutra1452('यानगति', {
          agent: 'यात्री',
          action: 'यात्रा',
          verb: verb,
          verbMeaning: meaning,
          motionDirection: direction
        });
        
        expect(result.applies).toBe(true);
        expect(result.travelVerb).toBe(true);
        expect(result.motionDirection).toBe(direction);
      });
    });

    test('integrates with specialized motion verbs', () => {
      const specializedVerbs = [
        { verb: 'चलति', motion: 'moves', type: 'general' },
        { verb: 'धावति', motion: 'runs', type: 'fast' },
        { verb: 'प्लवते', motion: 'floats', type: 'buoyant' },
        { verb: 'पतति', motion: 'falls', type: 'gravitational' }
      ];
      
      specializedVerbs.forEach(({ verb, motion, type }) => {
        const result = sutra1452('विशेषगति', {
          agent: 'गतिशील',
          action: 'चलन',
          verb: verb,
          motionNature: motion,
          motionType: type
        });
        
        expect(result.applies).toBe(true);
        expect(result.specializedMotion).toBe(true);
        expect(result.motionType).toBe(type);
      });
    });
  });

  describe('Expression of कर्म through गति', () => {
    test('analyzes how गति expresses कर्म relationship', () => {
      const result = sutra1452('कर्मव्यञ्जकगति', {
        agent: 'अभिव्यक्ति',
        action: 'कर्मप्रकाशन',
        karmaExpression: true,
        expressionMethod: 'motion_metaphor',
        semanticRole: 'object_representation'
      });
      
      expect(result.applies).toBe(true);
      expect(result.karmaExpression).toBe(true);
      expect(result.expressionMethod).toBe('motion_metaphor');
      expect(result.semanticRole).toBe('object_representation');
    });

    test('handles motion as object of desire/intention', () => {
      const result = sutra1452('इच्छितगति', {
        agent: 'अभिलाषी',
        action: 'कामना',
        desiredMotion: true,
        intentionalObject: true,
        karmaAspect: 'desired_movement'
      });
      
      expect(result.applies).toBe(true);
      expect(result.desiredMotion).toBe(true);
      expect(result.intentionalObject).toBe(true);
      expect(result.karmaAspect).toBe('desired_movement');
    });

    test('analyzes motion as accomplished object', () => {
      const result = sutra1452('सिद्धगति', {
        agent: 'सिद्धकर्ता',
        action: 'सिद्धि',
        accomplishedMotion: true,
        resultativeObject: true,
        achievementLevel: 'completed'
      });
      
      expect(result.applies).toBe(true);
      expect(result.accomplishedMotion).toBe(true);
      expect(result.resultativeObject).toBe(true);
      expect(result.achievementLevel).toBe('completed');
    });
  });

  describe('Multi-script support', () => {
    test('handles Devanagari input', () => {
      const result = sutra1452('उत्तरगति', {
        agent: 'यात्री',
        action: 'गमन',
        script: 'Devanagari'
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('Devanagari');
    });

    test('handles IAST input', () => {
      const result = sutra1452('uttaragati', {
        agent: 'yātrī',
        action: 'gamana',
        script: 'IAST'
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('IAST');
    });
  });

  describe('Error handling', () => {
    test('handles empty input', () => {
      const result = sutra1452('');
      expect(result.applies).toBe(false);
      expect(result.error).toBe('empty_input');
    });

    test('handles non-motion expressions', () => {
      const result = sutra1452('स्थिरवस्तु', {
        agent: 'व्यक्ति',
        action: 'दर्शन',
        motionType: 'none',
        static: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('not_motion_expression');
    });

    test('handles motion not expressing कर्म', () => {
      const result = sutra1452('सहायकगति', {
        agent: 'कर्ता',
        action: 'मुख्यकर्म',
        motionRole: 'instrumental', // करण rather than कर्म
        karmaExpression: false
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('motion_not_expressing_karma');
    });

    test('handles invalid Sanskrit input', () => {
      const result = sutra1452('xyz123motion', {
        agent: 'person',
        action: 'move'
      });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_sanskrit_input');
    });
  });

  describe('Integration with कर्म system', () => {
    test('specializes कर्म for motion expressions', () => {
      const result = sutra1452('विशिष्टगति', {
        agent: 'गमनकर्ता',
        action: 'गमन',
        specializesKarma: true,
        karmaSubtype: 'motion_object',
        generalKarmaExtension: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.specializesKarma).toBe(true);
      expect(result.karmaSubtype).toBe('motion_object');
    });

    test('distinguishes from other कारक relations', () => {
      const result = sutra1452('शुद्धगति', {
        agent: 'गतिकर्ता',
        action: 'गतिक्रिया',
        context: 'गतिकर्ता शुद्धगतिं करोति',
        notKarana: true,
        notAdhikarana: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('कर्म');
      expect(result.notKarana).toBe(true);
      expect(result.notAdhikarana).toBe(true);
    });

    test('relates to destination sutras (1.4.47-48)', () => {
      const result = sutra1452('गम्यगति', {
        agent: 'यात्री',
        action: 'यात्रा',
        relatedToDestination: true,
        complementsGamyamana: true,
        extendsMotionConcepts: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.relatedToDestination).toBe(true);
      expect(result.complementsGamyamana).toBe(true);
    });
  });

  describe('Edge cases', () => {
    test('handles metaphorical motion expressions', () => {
      const result = sutra1452('रूपकगति', {
        agent: 'कवि',
        action: 'वर्णन',
        metaphoricalMotion: true,
        literaryDevice: true,
        figurativeExpression: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.metaphoricalMotion).toBe(true);
      expect(result.literaryDevice).toBe(true);
    });

    test('handles compound motion expressions', () => {
      const result = sutra1452('संयुक्तगतिप्रकार', {
        agent: 'बहुगतिकर्ता',
        action: 'मिश्रगमन',
        compoundMotion: true,
        multiplePatterns: ['सरल', 'वक्र', 'चक्रीय']
      });
      
      expect(result.applies).toBe(true);
      expect(result.compoundMotion).toBe(true);
      expect(result.multiplePatterns).toHaveLength(3);
    });

    test('handles impossible or hypothetical motions', () => {
      const result = sutra1452('काल्पनिकगति', {
        agent: 'कल्पनाकर्ता',
        action: 'कल्पना',
        hypotheticalMotion: true,
        impossiblePhysically: true,
        conceptualOnly: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.hypotheticalMotion).toBe(true);
      expect(result.conceptualOnly).toBe(true);
    });

    test('handles recursive motion descriptions', () => {
      const result = sutra1452('स्वगतिवर्णन', {
        agent: 'गतिवर्णनकर्ता',
        action: 'स्वगतिवर्णन',
        recursiveMotion: true,
        selfDescriptive: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.recursiveMotion).toBe(true);
      expect(result.selfDescriptive).toBe(true);
    });
  });
});
