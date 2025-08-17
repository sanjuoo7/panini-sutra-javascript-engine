/**
 * Test suite for Sutra 1.4.42: साधकतमं करणम्
 * 
 * This sutra defines करण कारक as the most instrumental element
 * in accomplishing an action.
 */

import { sutra1442 } from './index.js';

describe('Sutra 1.4.42: साधकतमं करणम् (sādhakatamaṃ karaṇam)', () => {
  
  describe('Basic करण identification', () => {
    test('identifies primary physical instrument', () => {
      const result = sutra1442('कुठार', {
        action: 'छेदन',
        verb: 'छिनत्ति',
        context: 'वृक्षं कुठारेण छिनत्ति',
        case: 'instrumental'
      });
      
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('करण');
      expect(result.rule).toBe('1.4.42');
      expect(result.instrumentType).toBe('tool');
      expect(result.instrumentality).toBe('primary');
    });

    test('identifies method as instrument', () => {
      const result = sutra1442('विद्या', {
        action: 'धनलाभ',
        verb: 'लभते',
        context: 'विद्यया धनं लभते',
        case: 'instrumental'
      });
      
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('करण');
      expect(result.instrumentType).toBe('method');
    });

    test('identifies abstract instrument', () => {
      const result = sutra1442('श्रद्धा', {
        action: 'सिद्धि',
        verb: 'सिध्यति',
        context: 'श्रद्धया सिध्यति',
        case: 'instrumental'
      });
      
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('करण');
      expect(result.instrumentType).toBe('abstract_means');
    });
  });

  describe('Instrumentality degree assessment', () => {
    test('identifies most instrumental among multiple options', () => {
      const result = sutra1442('अग्नि', {
        action: 'पाक',
        verb: 'पचति',
        context: 'काष्ठेन अग्निना च पचति',
        otherInstruments: ['काष्ठ'],
        instrumentality: 'comparative'
      });
      
      expect(result.applies).toBe(true);
      expect(result.instrumentality).toBe('most_instrumental');
      expect(result.comparison).toBeDefined();
      expect(result.comparison.primary).toBe('अग्नि');
      expect(result.comparison.secondary).toContain('काष्ठ');
    });

    test('handles equal instrumentality cases', () => {
      const result = sutra1442('हस्त', {
        action: 'स्पर्श',
        verb: 'स्पृशति',
        context: 'हस्तेन पादेन च स्पृशति',
        otherInstruments: ['पाद'],
        instrumentality: 'equal'
      });
      
      expect(result.applies).toBe(true);
      expect(result.instrumentality).toBe('equally_instrumental');
      expect(result.ambiguity).toBe(true);
    });

    test('rejects secondary instruments', () => {
      const result = sutra1442('प्रकाश', {
        action: 'पठन',
        verb: 'पठति',
        context: 'दीपप्रकाशे पुस्तकं पठति',
        primaryInstrument: 'नेत्र',
        instrumentality: 'secondary'
      });
      
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('not_most_instrumental');
      expect(result.instrumentality).toBe('secondary');
    });
  });

  describe('Instrument type classification', () => {
    test('classifies physical tools correctly', () => {
      const tools = [
        { word: 'कुठार', type: 'cutting_tool', action: 'छेदन' },
        { word: 'लेखनी', type: 'writing_tool', action: 'लेखन' },
        { word: 'धनुष्', type: 'weapon', action: 'बाणविक्षेप' }
      ];
      
      tools.forEach(({ word, type, action }) => {
        const result = sutra1442(word, {
          action: action,
          instrumentType: 'physical'
        });
        
        expect(result.applies).toBe(true);
        expect(result.toolCategory).toBe(type);
      });
    });

    test('classifies methods and processes', () => {
      const methods = [
        { word: 'यज्ञ', type: 'ritual_method', action: 'देवप्रीति' },
        { word: 'अभ्यास', type: 'practice_method', action: 'निपुणता' },
        { word: 'तपस्', type: 'spiritual_method', action: 'सिद्धि' }
      ];
      
      methods.forEach(({ word, type, action }) => {
        const result = sutra1442(word, {
          action: action,
          instrumentType: 'method'
        });
        
        expect(result.applies).toBe(true);
        expect(result.methodCategory).toBe(type);
      });
    });

    test('classifies abstract instruments', () => {
      const abstracts = [
        { word: 'बुद्धि', type: 'cognitive', action: 'निर्णय' },
        { word: 'धैर्य', type: 'emotional', action: 'कष्टसहन' },
        { word: 'भाग्य', type: 'circumstantial', action: 'लाभ' }
      ];
      
      abstracts.forEach(({ word, type, action }) => {
        const result = sutra1442(word, {
          action: action,
          instrumentType: 'abstract'
        });
        
        expect(result.applies).toBe(true);
        expect(result.abstractCategory).toBe(type);
      });
    });
  });

  describe('Contextual analysis', () => {
    test('analyzes action-instrument compatibility', () => {
      const result = sutra1442('पाद', {
        action: 'गमन',
        verb: 'गच्छति',
        context: 'पादाभ्यां गच्छति',
        compatibility: 'natural'
      });
      
      expect(result.applies).toBe(true);
      expect(result.compatibility).toBe('natural');
      expect(result.analysis.actionInstrumentFit).toBe('optimal');
    });

    test('detects inappropriate instrument usage', () => {
      const result = sutra1442('लेखनी', {
        action: 'खनन',
        verb: 'खनति',
        context: 'लेखन्या खनति', // inappropriate use
        compatibility: 'poor'
      });
      
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('inappropriate_instrument');
      expect(result.compatibility).toBe('poor');
    });

    test('handles metaphorical instrument usage', () => {
      const result = sutra1442('वाक्', {
        action: 'हृदयभेदन',
        verb: 'भिनत्ति',
        context: 'वाचा हृदयं भिनत्ति',
        usage: 'metaphorical'
      });
      
      expect(result.applies).toBe(true);
      expect(result.usage).toBe('metaphorical');
      expect(result.literalness).toBe(false);
    });
  });

  describe('Multi-script support', () => {
    test('handles Devanagari input', () => {
      const result = sutra1442('कुठार', {
        action: 'छेदन',
        verb: 'छिनत्ति',
        script: 'Devanagari'
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('Devanagari');
    });

    test('handles IAST input', () => {
      const result = sutra1442('kuṭhāra', {
        action: 'chedana',
        verb: 'chinatti',
        script: 'IAST'
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('IAST');
    });

    test('produces consistent results across scripts', () => {
      const devResult = sutra1442('अग्नि', {
        action: 'पाक',
        script: 'Devanagari'
      });
      
      const iastResult = sutra1442('agni', {
        action: 'pāka',
        script: 'IAST'
      });
      
      expect(devResult.applies).toBe(iastResult.applies);
      expect(devResult.karaka).toBe(iastResult.karaka);
    });
  });

  describe('Error handling', () => {
    test('handles empty input', () => {
      const result = sutra1442('');
      expect(result.applies).toBe(false);
      expect(result.error).toBe('empty_input');
    });

    test('handles invalid Sanskrit input', () => {
      const result = sutra1442('xyz123');
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_sanskrit_input');
    });

    test('handles missing action context', () => {
      const result = sutra1442('कुठार', {
        verb: 'छिनत्ति'
        // missing action field
      });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('missing_action_context');
    });

    test('handles non-instrumental case', () => {
      const result = sutra1442('कुठारः', { // nominative case
        action: 'छेदन',
        case: 'nominative'
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('non_instrumental_case');
    });
  });

  describe('Integration with other कारक rules', () => {
    test('distinguishes from कर्म when both possible', () => {
      const result = sutra1442('काष्ठ', {
        action: 'अग्निकरण',
        verb: 'करोति',
        context: 'काष्ठेन अग्निं करोति',
        ambiguousRoles: ['करण', 'कर्म']
      });
      
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('करण');
      expect(result.disambiguation).toBe('instrumentality_primary');
    });

    test('integrates with सम्प्रदान in beneficiary contexts', () => {
      const result = sutra1442('धन', {
        action: 'दान',
        verb: 'ददाति',
        context: 'ब्राह्मणाय धनेन यज्ञं करोति',
        sampradana: 'ब्राह्मण'
      });
      
      expect(result.applies).toBe(true);
      expect(result.integration).toBeDefined();
      expect(result.integration.sampradana).toBe('ब्राह्मण');
    });

    test('handles कर्ता-करण distinction in agency', () => {
      const result = sutra1442('बल', {
        action: 'उत्थान',
        verb: 'उत्तिष्ठति',
        context: 'बलेन उत्तिष्ठति',
        karta: 'व्यक्ति'
      });
      
      expect(result.applies).toBe(true);
      expect(result.agency).toBe('instrumental');
      expect(result.kartaRelation).toBe('enabler');
    });
  });

  describe('Edge cases', () => {
    test('handles body parts as instruments', () => {
      const result = sutra1442('हस्त', {
        action: 'ग्रहण',
        verb: 'गृह्णाति',
        context: 'हस्तेन गृह्णाति',
        instrumentCategory: 'body_part'
      });
      
      expect(result.applies).toBe(true);
      expect(result.bodyPartInstrument).toBe(true);
      expect(result.naturalness).toBe('high');
    });

    test('handles collective instruments', () => {
      const result = sutra1442('सेना', {
        action: 'युद्ध',
        verb: 'युध्यते',
        context: 'सेनया युध्यते',
        collective: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.collectiveInstrument).toBe(true);
    });

    test('handles temporal instruments', () => {
      const result = sutra1442('काल', {
        action: 'परिवर्तन',
        verb: 'परिवर्तते',
        context: 'कालेन सर्वं परिवर्तते',
        temporal: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.temporalInstrument).toBe(true);
    });

    test('handles complex compound instruments', () => {
      const result = sutra1442('गुरुउपदेश', {
        action: 'ज्ञानलाभ',
        verb: 'लभते',
        context: 'गुरूपदेशेन ज्ञानं लभते',
        compound: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.compoundInstrument).toBe(true);
      expect(result.compoundAnalysis).toBeDefined();
    });
  });
});
