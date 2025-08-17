/**
 * Test suite for Sutra 1.4.46: अधिशीङ्स्थाऽऽसां कर्म
 * 
 * This sutra establishes that when verbs शीङ् (lie down), स्था (stand), and आस् (sit) 
 * are preceded by the preposition अधि, the location takes कर्म कारक designation instead of अधिकरण.
 */

import { sutra1446 } from './index.js';

describe('Sutra 1.4.46: अधिशीङ्स्थाऽऽसां कर्म (adhiśīṅasathā\'\'sāṃ karama)', () => {
  
  describe('Basic preposition + verb combinations', () => {
    test('identifies अधि + शी (lie down) combinations', () => {
      const result = sutra1446('पर्यङ्क', {
        action: 'शयन',
        preposition: 'अधि',
        verb: 'शी',
        context: 'अधि पर्यङ्कं शेते'
      });
      
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('कर्म');
      expect(result.preposition).toBe('अधि');
      expect(result.verb).toBe('शी');
    });

    test('identifies अधि + स्था (stand) combinations', () => {
      const result = sutra1446('पर्वत', {
        action: 'स्थान',
        preposition: 'अधि',
        verb: 'स्था',
        context: 'अधि पर्वतं तिष्ठति'
      });
      
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('कर्म');
      expect(result.preposition).toBe('अधि');
      expect(result.verb).toBe('स्था');
    });

    test('identifies अधि + आस् (sit) combinations', () => {
      const result = sutra1446('आसन', {
        action: 'उपवेशन',
        preposition: 'अधि',
        verb: 'आस्',
        context: 'अधि आसनम् आस्ते'
      });
      
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('कर्म');
      expect(result.preposition).toBe('अधि');
      expect(result.verb).toBe('आस्');
    });
  });

  describe('Verb root analysis', () => {
    test('recognizes शीङ् root forms', () => {
      const result = sutra1446('शैया', {
        action: 'शयन',
        preposition: 'अधि',
        verb: 'शी',
        verbForm: 'शेते',
        person: 'प्रथम',
        number: 'एकवचन'
      });
      
      expect(result.applies).toBe(true);
      expect(result.verbRoot).toBe('शी');
      expect(result.verbAnalysis.recognized).toBe(true);
    });

    test('recognizes स्था root forms', () => {
      const result = sutra1446('भूमि', {
        action: 'स्थान',
        preposition: 'अधि',
        verb: 'स्था',
        verbForm: 'तिष्ठति',
        person: 'प्रथम',
        number: 'एकवचन'
      });
      
      expect(result.applies).toBe(true);
      expect(result.verbRoot).toBe('स्था');
      expect(result.verbAnalysis.recognized).toBe(true);
    });

    test('recognizes आस् root forms', () => {
      const result = sutra1446('सिंहासन', {
        action: 'उपवेशन',
        preposition: 'अधि',
        verb: 'आस्',
        verbForm: 'आस्ते',
        person: 'प्रथम',
        number: 'एकवचन'
      });
      
      expect(result.applies).toBe(true);
      expect(result.verbRoot).toBe('आस्');
      expect(result.verbAnalysis.recognized).toBe(true);
    });
  });

  describe('Preposition analysis', () => {
    test('validates अधि preposition presence', () => {
      const result = sutra1446('पर्यङ्क', {
        action: 'शयन',
        preposition: 'अधि',
        verb: 'शी',
        prepositionAnalysis: {
          type: 'upasarga',
          meaning: 'upon',
          validates: true
        }
      });
      
      expect(result.applies).toBe(true);
      expect(result.prepositionValid).toBe(true);
      expect(result.prepositionMeaning).toBe('upon');
    });

    test('requires अधि specifically (not other prepositions)', () => {
      const result = sutra1446('पर्यङ्क', {
        action: 'शयन',
        preposition: 'उप',
        verb: 'शी',
        context: 'उप पर्यङ्कं शेते'
      });
      
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_preposition');
    });
  });

  describe('Location identification', () => {
    test('identifies physical surfaces as कर्म', () => {
      const physicalSurfaces = [
        { word: 'पर्यङ्क', meaning: 'bed' },
        { word: 'आसन', meaning: 'seat' },
        { word: 'भूमि', meaning: 'ground' },
        { word: 'पर्वत', meaning: 'mountain' }
      ];
      
      physicalSurfaces.forEach(({ word, meaning }) => {
        const result = sutra1446(word, {
          action: 'स्थान',
          preposition: 'अधि',
          verb: 'स्था',
          locationMeaning: meaning
        });
        
        expect(result.applies).toBe(true);
        expect(result.karaka).toBe('कर्म');
        expect(result.locationType).toBe('physical_surface');
      });
    });

    test('identifies elevated locations', () => {
      const result = sutra1446('उच्चस्थान', {
        action: 'स्थान',
        preposition: 'अधि',
        verb: 'स्था',
        elevation: 'high',
        locationType: 'elevated'
      });
      
      expect(result.applies).toBe(true);
      expect(result.elevatedLocation).toBe(true);
    });
  });

  describe('Contrast with standard अधिकरण', () => {
    test('distinguishes from normal locative (without अधि)', () => {
      const result = sutra1446('गृह', {
        action: 'निवास',
        verb: 'वस्',
        context: 'गृहे वसति'
      });
      
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('no_adhi_preposition');
    });

    test('distinguishes from other अधि combinations', () => {
      const result = sutra1446('पुस्तक', {
        action: 'अध्ययन',
        preposition: 'अधि',
        verb: 'इ',
        context: 'अधि पुस्तकम् अधीते'
      });
      
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('invalid_verb_combination');
    });
  });

  describe('Syntactic analysis', () => {
    test('handles compound expressions', () => {
      const result = sutra1446('शिलापट्ट', {
        action: 'शयन',
        preposition: 'अधि',
        verb: 'शी',
        compound: true,
        compoundType: 'कर्मधारय',
        context: 'अधि शिलापट्टं शेते'
      });
      
      expect(result.applies).toBe(true);
      expect(result.compoundAnalysis).toBe(true);
    });

    test('handles verbal prefixes correctly', () => {
      const result = sutra1446('आसन', {
        action: 'उपवेशन',
        preposition: 'अधि',
        verb: 'आस्',
        verbalPrefix: 'अधि',
        prefixAttached: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.prefixAnalysis.correct).toBe(true);
    });
  });

  describe('Multi-script support', () => {
    test('handles Devanagari input', () => {
      const result = sutra1446('पर्यङ्क', {
        action: 'शयन',
        preposition: 'अधि',
        verb: 'शी'
      });
      
      expect(result.script).toBe('devanagari');
      expect(result.applies).toBe(true);
    });

    test('handles IAST input', () => {
      const result = sutra1446('paryaṅka', {
        action: 'śayana',
        preposition: 'adhi',
        verb: 'śī'
      });
      
      expect(result.script).toBe('iast');
      expect(result.applies).toBe(true);
    });
  });

  describe('Error handling', () => {
    test('handles empty input', () => {
      const result = sutra1446('', {});
      
      expect(result.applies).toBe(false);
      expect(result.error).toBe('empty_input');
    });

    test('handles missing verb', () => {
      const result = sutra1446('पर्यङ्क', {
        action: 'शयन',
        preposition: 'अधि'
      });
      
      expect(result.applies).toBe(false);
      expect(result.error).toBe('missing_verb');
    });

    test('handles missing preposition', () => {
      const result = sutra1446('पर्यङ्क', {
        action: 'शयन',
        verb: 'शी'
      });
      
      expect(result.applies).toBe(false);
      expect(result.error).toBe('missing_preposition');
    });

    test('handles invalid Sanskrit input', () => {
      const result = sutra1446('xyz123', {
        action: 'शयन',
        preposition: 'अधि',
        verb: 'शी'
      });
      
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_sanskrit');
    });
  });

  describe('Integration with previous sutras', () => {
    test('overrides normal अधिकरण designation', () => {
      const result = sutra1446('पर्यङ्क', {
        action: 'शयन',
        preposition: 'अधि',
        verb: 'शी',
        normallyAdhikarana: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('कर्म');
      expect(result.overridesAdhikarana).toBe(true);
    });

    test('maintains कर्म precedence', () => {
      const result = sutra1446('शैया', {
        action: 'शयन',
        preposition: 'अधि',
        verb: 'शी',
        karmaPrecedence: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.karmaPrecedence).toBe(true);
    });
  });

  describe('Edge cases', () => {
    test('handles contextual ambiguity', () => {
      const result = sutra1446('स्थान', {
        action: 'गमन_स्थान',
        preposition: 'अधि',
        verb: 'स्था',
        ambiguous: true,
        primaryMeaning: 'place_to_stand'
      });
      
      expect(result.applies).toBe(true);
      expect(result.ambiguityResolved).toBe(true);
    });

    test('handles temporal contexts', () => {
      const result = sutra1446('पर्वत', {
        action: 'स्थान',
        preposition: 'अधि',
        verb: 'स्था',
        temporalContext: 'प्रातःकाल',
        duration: 'extended'
      });
      
      expect(result.applies).toBe(true);
      expect(result.temporalSupport).toBe(true);
    });
  });
});
