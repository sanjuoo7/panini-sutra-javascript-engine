/**
 * Test suite for Sutra 1.4.47: अभिनिविशश्च
 * 
 * This sutra adds the verb अभिनिविश् (to enter) to the list of verbs whose 
 * location takes कर्म कारक designation instead of अधिकरण कारक.
 * This continues from Sutra 1.4.46 which covered अधि + शीङ्/स्था/आस्.
 */

import { sutra1447 } from './index.js';

describe('Sutra 1.4.47: अभिनिविशश्च (abhiniviśaśaca)', () => {
  
  describe('Basic अभिनिविश् verb combinations', () => {
    test('identifies अभि + नि + विश् (enter) combinations', () => {
      const result = sutra1447('गृह', {
        action: 'प्रवेश',
        verb: 'अभिनिविश्',
        context: 'गृहम् अभिनिविशति'
      });
      
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('कर्म');
      expect(result.verb).toBe('अभिनिविश्');
      expect(result.verbMeaning).toBe('enter');
    });

    test('recognizes compound prefix अभिनि + विश्', () => {
      const result = sutra1447('वन', {
        action: 'प्रवेश',
        verb: 'अभिनिविश्',
        prefixAnalysis: {
          abhiPrefix: true,
          niPrefix: true,
          root: 'विश्'
        },
        context: 'वनम् अभिनिविशति'
      });
      
      expect(result.applies).toBe(true);
      expect(result.prefixAnalysis.recognized).toBe(true);
      expect(result.prefixCombination).toBe('अभिनि');
    });

    test('handles various forms of विश् root', () => {
      const verbForms = [
        { form: 'विशति', tense: 'present' },
        { form: 'विवेश', tense: 'perfect' },
        { form: 'वेक्ष्यति', tense: 'future' },
        { form: 'अविशत्', tense: 'aorist' }
      ];
      
      verbForms.forEach(({ form, tense }) => {
        const result = sutra1447('नगर', {
          action: 'प्रवेश',
          verb: 'अभिनिविश्',
          verbForm: form,
          tense: tense
        });
        
        expect(result.applies).toBe(true);
        expect(result.verbAnalysis.formRecognized).toBe(true);
        expect(result.verbAnalysis.tense).toBe(tense);
      });
    });
  });

  describe('Entry location analysis', () => {
    test('identifies physical entry points', () => {
      const entryLocations = [
        { word: 'गृह', type: 'building', meaning: 'house' },
        { word: 'नगर', type: 'settlement', meaning: 'city' },
        { word: 'वन', type: 'natural', meaning: 'forest' },
        { word: 'मन्दिर', type: 'religious', meaning: 'temple' },
        { word: 'राजप्रासाद', type: 'royal', meaning: 'palace' }
      ];
      
      entryLocations.forEach(({ word, type, meaning }) => {
        const result = sutra1447(word, {
          action: 'प्रवेश',
          verb: 'अभिनिविश्',
          locationType: type,
          locationMeaning: meaning
        });
        
        expect(result.applies).toBe(true);
        expect(result.karaka).toBe('कर्म');
        expect(result.entryLocation.type).toBe(type);
      });
    });

    test('identifies abstract entry contexts', () => {
      const result = sutra1447('ध्यान', {
        action: 'प्रवेश',
        verb: 'अभिनिविश्',
        abstractEntry: true,
        locationType: 'mental_state',
        context: 'ध्यानम् अभिनिविशति'
      });
      
      expect(result.applies).toBe(true);
      expect(result.abstractEntry).toBe(true);
      expect(result.entryLocation.abstract).toBe(true);
    });
  });

  describe('Verb root विश् analysis', () => {
    test('recognizes विश् root forms with अभिनि prefix', () => {
      const result = sutra1447('आश्रम', {
        action: 'प्रवेश',
        verb: 'अभिनिविश्',
        verbForm: 'अभिनिविशति',
        rootAnalysis: {
          root: 'विश्',
          meaning: 'enter',
          class: 'षष्ठ'
        }
      });
      
      expect(result.applies).toBe(true);
      expect(result.verbRoot).toBe('विश्');
      expect(result.verbAnalysis.class).toBe('षष्ठ');
    });

    test('validates prefix combination अभि + नि', () => {
      const result = sutra1447('सभा', {
        action: 'प्रवेश',
        verb: 'अभिनिविश्',
        prefixValidation: {
          abhiMeaning: 'towards',
          niMeaning: 'into',
          combined: 'entering_into'
        }
      });
      
      expect(result.applies).toBe(true);
      expect(result.prefixValidation.correct).toBe(true);
      expect(result.combinedMeaning).toBe('entering_into');
    });

    test('requires specific prefix combination (not just विश्)', () => {
      const result = sutra1447('गृह', {
        action: 'प्रवेश',
        verb: 'विश्',
        context: 'गृहम् विशति'
      });
      
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('missing_required_prefix');
    });
  });

  describe('Multi-script support', () => {
    test('handles Devanagari input', () => {
      const result = sutra1447('गृह', {
        action: 'प्रवेश',
        verb: 'अभिनिविश्'
      });
      
      expect(result.script).toBe('devanagari');
      expect(result.applies).toBe(true);
    });

    test('handles IAST input', () => {
      const result = sutra1447('gṛha', {
        action: 'praveśa',
        verb: 'abhiniviś'
      });
      
      expect(result.script).toBe('iast');
      expect(result.applies).toBe(true);
    });
  });

  describe('Error handling', () => {
    test('handles empty input', () => {
      const result = sutra1447('', {});
      
      expect(result.applies).toBe(false);
      expect(result.error).toBe('empty_input');
    });

    test('handles missing verb', () => {
      const result = sutra1447('गृह', {
        action: 'प्रवेश'
      });
      
      expect(result.applies).toBe(false);
      expect(result.error).toBe('missing_verb');
    });

    test('handles invalid verb (not अभिनिविश्)', () => {
      const result = sutra1447('गृह', {
        action: 'प्रवेश',
        verb: 'गम्'
      });
      
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('invalid_verb');
    });

    test('handles invalid Sanskrit input', () => {
      const result = sutra1447('xyz123', {
        action: 'प्रवेश',
        verb: 'अभिनिविश्'
      });
      
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_sanskrit');
    });
  });

  describe('Integration with previous sutras', () => {
    test('extends Sutra 1.4.46 verb list', () => {
      const result = sutra1447('स्थान', {
        action: 'प्रवेश',
        verb: 'अभिनिविश्',
        extendsPrevious: true,
        previousSutraReference: '1.4.46'
      });
      
      expect(result.applies).toBe(true);
      expect(result.extendsPreviousSutra).toBe(true);
      expect(result.sutraChain).toContain('1.4.46');
    });

    test('maintains consistency with कर्म designation', () => {
      const result = sutra1447('नगर', {
        action: 'प्रवेश',
        verb: 'अभिनिविश्',
        consistencyCheck: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('कर्म');
      expect(result.consistentWithPrevious).toBe(true);
    });
  });
});
