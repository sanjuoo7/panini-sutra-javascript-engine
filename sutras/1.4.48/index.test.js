/**
 * Test suite for Sutra 1.4.48: उपान्वध्याङ्वसः
 * 
 * This sutra states that the location/site of the verb वस् (to dwell) when 
 * preceded by उप, अनु, and आङ् is called कर्म कारक instead of अधिकरण कारक.
 */

import { sutra1448 } from './index.js';

describe('Sutra 1.4.48: उपान्वध्याङ्वसः', () => {
  
  describe('Basic prefix and verb combinations', () => {
    test('identifies उप + अनु + आङ् + वस् combinations', () => {
      const result = sutra1448('गृह', {
        action: 'निवास',
        verb: 'वस्',
        prefixes: ['उप', 'अनु', 'आङ्'],
        context: 'गृहे उपानुआवसति'
      });
      
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('कर्म');
      expect(result.verb).toBe('वस्');
      expect(result.verbMeaning).toBe('dwell');
    });

    test('recognizes compound prefix उपानुआ + वस्', () => {
      const result = sutra1448('ग्राम', {
        action: 'निवास',
        verb: 'वस्',
        prefixAnalysis: {
          upaPrefix: true,
          anuPrefix: true,
          angPrefix: true,
          root: 'वस्'
        }
      });
      
      expect(result.applies).toBe(true);
      expect(result.prefixAnalysis.recognized).toBe(true);
      expect(result.prefixCombination).toBe('उपानुआ');
    });

    test('handles various forms of वस् root', () => {
      const verbForms = [
        { form: 'वसति', tense: 'present' },
        { form: 'उवास', tense: 'perfect' },
        { form: 'वत्स्यति', tense: 'future' },
        { form: 'अवसत्', tense: 'aorist' }
      ];
      
      verbForms.forEach(({ form, tense }) => {
        const result = sutra1448('नगर', {
          action: 'निवास',
          verb: 'वस्',
          verbForm: form,
          tense: tense,
          prefixes: ['उप', 'अनु', 'आङ्']
        });
        
        expect(result.applies).toBe(true);
        expect(result.verbAnalysis.formRecognized).toBe(true);
        expect(result.verbAnalysis.tense).toBe(tense);
      });
    });
  });

  describe('Dwelling location analysis', () => {
    test('identifies residential dwelling places', () => {
      const dwellingPlaces = [
        { word: 'गृह', type: 'residential', meaning: 'house' },
        { word: 'ग्राम', type: 'settlement', meaning: 'village' },
        { word: 'नगर', type: 'urban', meaning: 'city' },
        { word: 'आश्रम', type: 'religious', meaning: 'hermitage' }
      ];
      
      dwellingPlaces.forEach(({ word, type, meaning }) => {
        const result = sutra1448(word, {
          action: 'निवास',
          verb: 'वस्',
          prefixes: ['उप', 'अनु', 'आङ्'],
          locationType: type,
          dwellingType: 'permanent'
        });
        
        expect(result.applies).toBe(true);
        expect(result.karaka).toBe('कर्म');
        expect(result.dwellingLocation.type).toBe(type);
      });
    });

    test('identifies abstract dwelling contexts', () => {
      const result = sutra1448('ध्यान', {
        action: 'निवास',
        verb: 'वस्',
        prefixes: ['उप', 'अनु', 'आङ्'],
        abstractDwelling: true,
        locationType: 'mental_state'
      });
      
      expect(result.applies).toBe(true);
      expect(result.abstractDwelling).toBe(true);
      expect(result.dwellingLocation.abstract).toBe(true);
    });
  });

  describe('Prefix validation requirements', () => {
    test('fails with missing prefixes', () => {
      const result = sutra1448('गृह', {
        action: 'निवास',
        verb: 'वस्',
        prefixes: ['उप', 'अनु'],  // Missing आङ्
        context: 'गृहे उपानुवसति'
      });
      
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('missing_required_prefixes');
    });

    test('fails with just वस् (no prefixes)', () => {
      const result = sutra1448('गृह', {
        action: 'निवास',
        verb: 'वस्',
        context: 'गृहे वसति'
      });
      
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('missing_required_prefixes');
    });

    test('requires all three prefixes', () => {
      const result = sutra1448('गृह', {
        action: 'निवास',
        verb: 'वस्',
        prefixes: ['उप', 'अनु', 'आङ्']
      });
      
      expect(result.applies).toBe(true);
      expect(result.prefixAnalysis.valid).toBe(true);
      expect(result.combinedMeaning).toBe('dwelling_in_close_proximity');
    });
  });

  describe('Multi-script support', () => {
    test('handles Devanagari input', () => {
      const result = sutra1448('गृह', {
        action: 'निवास',
        verb: 'वस्',
        prefixes: ['उप', 'अनु', 'आङ्']
      });
      
      expect(result.script).toBe('devanagari');
      expect(result.applies).toBe(true);
    });

    test('handles IAST input', () => {
      const result = sutra1448('gṛha', {
        action: 'nivāsa',
        verb: 'vas',
        prefixes: ['upa', 'anu', 'āṅ']
      });
      
      expect(result.script).toBe('iast');
      expect(result.applies).toBe(true);
    });
  });

  describe('Error handling', () => {
    test('handles empty input', () => {
      const result = sutra1448('', {});
      
      expect(result.applies).toBe(false);
      expect(result.error).toBe('empty_input');
    });

    test('handles missing verb', () => {
      const result = sutra1448('गृह', {
        action: 'निवास'
      });
      
      expect(result.applies).toBe(false);
      expect(result.error).toBe('missing_verb');
    });

    test('handles invalid verb (not वस्)', () => {
      const result = sutra1448('गृह', {
        action: 'निवास',
        verb: 'गम्',
        prefixes: ['उप', 'अनु', 'आङ्']
      });
      
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('not_vasa_verb');
    });

    test('handles invalid Sanskrit input', () => {
      const result = sutra1448('xyz123', {
        action: 'निवास',
        verb: 'वस्',
        prefixes: ['उप', 'अनु', 'आङ्']
      });
      
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_sanskrit');
    });
  });

  describe('Integration with previous sutras', () => {
    test('extends previous कर्म pattern', () => {
      const result = sutra1448('स्थान', {
        action: 'निवास',
        verb: 'वस्',
        prefixes: ['उप', 'अनु', 'आङ्'],
        extendsPrevious: true,
        previousSutraReference: '1.4.47'
      });
      
      expect(result.applies).toBe(true);
      expect(result.extendsPreviousSutra).toBe(true);
      expect(result.sutraChain).toContain('1.4.47');
    });

    test('maintains consistency with कर्म designation', () => {
      const result = sutra1448('नगर', {
        action: 'निवास',
        verb: 'वस्',
        prefixes: ['उप', 'अनु', 'आङ्'],
        consistencyCheck: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('कर्म');
      expect(result.consistentWithPrevious).toBe(true);
    });
  });

  describe('Dwelling type contexts', () => {
    test('handles permanent dwelling', () => {
      const result = sutra1448('आश्रम', {
        action: 'निवास',
        verb: 'वस्',
        prefixes: ['उप', 'अनु', 'आङ्'],
        dwellingType: 'permanent'
      });
      
      expect(result.applies).toBe(true);
      expect(result.permanentResidence).toBe(true);
      expect(result.dwellingType).toBe('permanent');
    });

    test('handles temporary dwelling', () => {
      const result = sutra1448('वन', {
        action: 'निवास',
        verb: 'वस्',
        prefixes: ['उप', 'अनु', 'आङ्'],
        dwellingType: 'temporary'
      });
      
      expect(result.applies).toBe(true);
      expect(result.temporaryResidence).toBe(true);
      expect(result.dwellingType).toBe('temporary');
    });
  });
});
