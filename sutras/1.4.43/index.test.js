/**
 * Test suite for Sutra 1.4.43: दिवः कर्म च
 * 
 * This sutra establishes that for the verbal root दिव् (to play/gamble),
 * the instrumental element can also be designated as कर्म.
 */

import { sutra1443 } from './index.js';

describe('Sutra 1.4.43: दिवः कर्म च (divaḥ karma ca)', () => {
  
  describe('दिव् root verification', () => {
    test('identifies दिव् root correctly', () => {
      const result = sutra1443('अक्ष', {
        verb: 'दीव्यति',
        action: 'द्यूत',
        context: 'अक्षैः दीव्यति',
        case: 'instrumental'
      });
      
      expect(result.applies).toBe(true);
      expect(result.root).toBe('दिव्');
      expect(result.karakas).toContain('करण');
      expect(result.karakas).toContain('कर्म');
      expect(result.dualDesignation).toBe(true);
    });

    test('rejects non-दिव् roots', () => {
      const result = sutra1443('कुठार', {
        verb: 'छिनत्ति',
        action: 'छेदन',
        context: 'कुठारेण छिनत्ति'
      });
      
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('not_div_root');
    });

    test('handles different forms of दिव्', () => {
      const forms = [
        { verb: 'दीव्यति', tense: 'present' },
        { verb: 'दिदेव', tense: 'perfect' },
        { verb: 'देवयति', tense: 'causative' },
        { verb: 'दीव्यमान', tense: 'participle' }
      ];
      
      forms.forEach(({ verb, tense }) => {
        const result = sutra1443('पाशक', {
          verb: verb,
          action: 'क्रीडा',
          tense: tense
        });
        
        expect(result.applies).toBe(true);
        expect(result.verbForm).toBe(tense);
      });
    });
  });

  describe('Gaming and playing contexts', () => {
    test('identifies gambling instruments', () => {
      const gamblingTools = [
        { word: 'अक्ष', type: 'dice', context: 'अक्षैः द्यूतं दीव्यति' },
        { word: 'पाशक', type: 'dice_variant', context: 'पाशकैः दीव्यति' },
        { word: 'शर', type: 'arrow_lots', context: 'शरैः भाग्यं दीव्यति' }
      ];
      
      gamblingTools.forEach(({ word, type, context }) => {
        const result = sutra1443(word, {
          verb: 'दीव्यति',
          action: 'द्यूत',
          context: context,
          gameType: 'gambling'
        });
        
        expect(result.applies).toBe(true);
        expect(result.instrumentType).toBe(type);
        expect(result.context).toBe('gambling');
      });
    });

    test('identifies musical playing instruments', () => {
      const musicalInstruments = [
        { word: 'वीणा', type: 'string', context: 'वीणया मधुरं दीव्यति' },
        { word: 'मृदङ्ग', type: 'percussion', context: 'मृदङ्गेन दीव्यति' },
        { word: 'वेणु', type: 'wind', context: 'वेणुना दीव्यति' }
      ];
      
      musicalInstruments.forEach(({ word, type, context }) => {
        const result = sutra1443(word, {
          verb: 'दीव्यति',
          action: 'वादन',
          context: context,
          playType: 'musical'
        });
        
        expect(result.applies).toBe(true);
        expect(result.instrumentCategory).toBe(type);
        expect(result.context).toBe('musical');
      });
    });

    test('identifies sport and game contexts', () => {
      const sportTools = [
        { word: 'दण्ड', type: 'stick', context: 'दण्डेन गेन्दुकं दीव्यति' },
        { word: 'गेन्दुक', type: 'ball', context: 'गेन्दुकेन दीव्यति' }
      ];
      
      sportTools.forEach(({ word, type, context }) => {
        const result = sutra1443(word, {
          verb: 'दीव्यति',
          action: 'क्रीडा',
          context: context,
          playType: 'sport'
        });
        
        expect(result.applies).toBe(true);
        expect(result.sportTool).toBe(type);
      });
    });
  });

  describe('Dual कारक designation', () => {
    test('assigns both करण and कर्म designations', () => {
      const result = sutra1443('अक्ष', {
        verb: 'दीव्यति',
        action: 'द्यूत',
        context: 'अक्षैः दीव्यति'
      });
      
      expect(result.applies).toBe(true);
      expect(result.karakas).toEqual(expect.arrayContaining(['करण', 'कर्म']));
      expect(result.primaryKaraka).toBe('करण');
      expect(result.secondaryKaraka).toBe('कर्म');
      expect(result.dualDesignation).toBe(true);
    });

    test('explains dual designation rationale', () => {
      const result = sutra1443('वीणा', {
        verb: 'दीव्यति',
        action: 'वादन',
        context: 'वीणया दीव्यति'
      });
      
      expect(result.applies).toBe(true);
      expect(result.rationale).toBeDefined();
      expect(result.rationale.karana).toBe('instrumental_in_playing');
      expect(result.rationale.karma).toBe('object_of_playing_action');
    });

    test('prioritizes करण over कर्म by default', () => {
      const result = sutra1443('मृदङ्ग', {
        verb: 'दीव्यति',
        action: 'वादन',
        ambiguityResolution: 'default'
      });
      
      expect(result.applies).toBe(true);
      expect(result.primaryDesignation).toBe('करण');
      expect(result.defaultPriority).toBe('instrumental');
    });
  });

  describe('Context specificity', () => {
    test('distinguishes gaming from other दिव् contexts', () => {
      const contexts = [
        { action: 'द्यूत', valid: true, type: 'gambling' },
        { action: 'वादन', valid: true, type: 'musical' },
        { action: 'क्रीडा', valid: true, type: 'sporting' },
        { action: 'प्रकाश', valid: false, type: 'invalid' } // दिव् as "to shine" - different root
      ];
      
      contexts.forEach(({ action, valid, type }) => {
        const result = sutra1443('साधन', {
          verb: 'दीव्यति',
          action: action,
          contextType: type
        });
        
        expect(result.applies).toBe(valid);
        if (valid) {
          expect(result.contextCategory).toBe(type);
        }
      });
    });

    test('validates semantic compatibility', () => {
      const result = sutra1443('पुस्तक', { // book - inappropriate for gaming
        verb: 'दीव्यति',
        action: 'द्यूत',
        context: 'पुस्तकेन दीव्यति'
      });
      
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('semantic_incompatibility');
    });
  });

  describe('Multi-script support', () => {
    test('handles Devanagari input', () => {
      const result = sutra1443('अक्ष', {
        verb: 'दीव्यति',
        action: 'द्यूत',
        script: 'Devanagari'
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('Devanagari');
    });

    test('handles IAST input', () => {
      const result = sutra1443('akṣa', {
        verb: 'dīvyati',
        action: 'dyūta',
        script: 'IAST'
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('IAST');
    });
  });

  describe('Error handling', () => {
    test('handles empty input', () => {
      const result = sutra1443('');
      expect(result.applies).toBe(false);
      expect(result.error).toBe('empty_input');
    });

    test('handles missing verb context', () => {
      const result = sutra1443('अक्ष', {
        action: 'द्यूत'
        // missing verb
      });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('missing_verb_context');
    });

    test('handles invalid Sanskrit input', () => {
      const result = sutra1443('xyz123', {
        verb: 'दीव्यति'
      });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_sanskrit_input');
    });
  });

  describe('Integration with other सूत्र rules', () => {
    test('integrates with करण rules (1.4.42)', () => {
      const result = sutra1443('अक्ष', {
        verb: 'दीव्यति',
        action: 'द्यूत',
        karanaSutra: '1.4.42',
        instrumentality: 'primary'
      });
      
      expect(result.applies).toBe(true);
      expect(result.karanaSutraIntegration).toBe(true);
      expect(result.instrumentality).toBe('primary');
    });

    test('integrates with कर्म rules (1.4.49)', () => {
      const result = sutra1443('वीणा', {
        verb: 'दीव्यति',
        action: 'वादन',
        karmaSutra: '1.4.49',
        desirability: 'high'
      });
      
      expect(result.applies).toBe(true);
      expect(result.karmaSutraIntegration).toBe(true);
    });

    test('handles conflicts with other कारक assignments', () => {
      const result = sutra1443('साधन', {
        verb: 'दीव्यति',
        action: 'क्रीडा',
        conflictingKarakas: ['अधिकरण'],
        resolution: 'prioritize_dual'
      });
      
      expect(result.applies).toBe(true);
      expect(result.conflictResolution).toBeDefined();
      expect(result.preferredDesignation).toContain('करण');
    });
  });

  describe('Edge cases', () => {
    test('handles compound verbs with दिव्', () => {
      const result = sutra1443('अक्ष', {
        verb: 'सङ्गे दीव्यति',
        action: 'सामूहिकद्यूत',
        compound: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.compoundVerb).toBe(true);
    });

    test('handles metaphorical दिव् usage', () => {
      const result = sutra1443('बुद्धि', {
        verb: 'दीव्यति',
        action: 'चिन्तनक्रीडा',
        metaphorical: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.metaphoricalUsage).toBe(true);
    });

    test('handles collective gaming instruments', () => {
      const result = sutra1443('अक्षगण', {
        verb: 'दीव्यति',
        action: 'द्यूत',
        collective: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.collectiveInstrument).toBe(true);
    });
  });
});
