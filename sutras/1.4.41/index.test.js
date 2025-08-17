/**
 * Test suite for Sutra 1.4.41: अनुप्रतिगृणश्च
 * 
 * This sutra defines when the prior agent in contexts of "encouragement by repetition" 
 * with अनुप्रति + गृ should be designated as सम्प्रदान कारक.
 */

import { sutra1441 } from './index.js';

describe('Sutra 1.4.41: अनुप्रतिगृणश्च (anupratigrṛṇaśca)', () => {
  
  describe('Basic सम्प्रदान identification', () => {
    test('identifies सम्प्रदान with अनुप्रति+गृ in encouragement context', () => {
      const result = sutra1441('देवदत्त', {
        verb: 'अनुप्रतिगृणाति',
        meaning: 'encourage_by_repetition',
        priorAgent: 'यज्ञदत्त',
        priorAction: 'गान',
        context: 'यज्ञदत्तो गायति। देवदत्तं अनुप्रतिगृणाति।'
      });
      
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('सम्प्रदान');
      expect(result.rule).toBe('1.4.41');
      expect(result.priorAgent).toBe('यज्ञदत्त');
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('handles Devanagari input correctly', () => {
      const result = sutra1441('गुरु', {
        verb: 'अनुप्रतिगृणाति',
        meaning: 'encourage_by_repetition',
        priorAgent: 'शिष्य',
        context: 'शिष्यः पठति। गुरुं अनुप्रतिगृणाति।',
        script: 'Devanagari'
      });
      
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('सम्प्रदान');
      expect(result.script).toBe('Devanagari');
    });

    test('handles IAST input correctly', () => {
      const result = sutra1441('devadatta', {
        verb: 'anupratigrṛṇāti',
        meaning: 'encourage_by_repetition',
        priorAgent: 'yajñadatta',
        context: 'yajñadatto gāyati. devadattaṃ anupratigrṛṇāti.',
        script: 'IAST'
      });
      
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('सम्प्रदान');
      expect(result.script).toBe('IAST');
    });
  });

  describe('Prefix validation', () => {
    test('requires both अनु and प्रति prefixes', () => {
      const result1 = sutra1441('राम', {
        verb: 'अनुगृणाति', // only अनु prefix
        meaning: 'encourage'
      });
      
      expect(result1.applies).toBe(false);
      expect(result1.reason).toBe('missing_required_prefixes');
      
      const result2 = sutra1441('राम', {
        verb: 'प्रतिगृणाति', // only प्रति prefix
        meaning: 'encourage'
      });
      
      expect(result2.applies).toBe(false);
      expect(result2.reason).toBe('missing_required_prefixes');
    });

    test('rejects गृ without any prefixes', () => {
      const result = sutra1441('राम', {
        verb: 'गृणाति',
        meaning: 'speak'
      });
      
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('missing_required_prefixes');
    });

    test('rejects different verbal roots with अनुप्रति', () => {
      const result = sutra1441('राम', {
        verb: 'अनुप्रतिपठति',
        meaning: 'repeat_reading'
      });
      
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('incorrect_verbal_root');
    });
  });

  describe('Semantic validation', () => {
    test('requires "encouragement by repetition" meaning', () => {
      const result = sutra1441('राम', {
        verb: 'अनुप्रतिगृणाति',
        meaning: 'simple_speaking'
      });
      
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('incorrect_semantic_context');
    });

    test('validates prior action context', () => {
      const result = sutra1441('गुरु', {
        verb: 'अनुप्रतिगृणाति',
        meaning: 'encourage_by_repetition',
        priorAgent: 'शिष्य',
        // Missing context of prior action
      });
      
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('missing_prior_action_context');
    });

    test('identifies multiple semantic variations', () => {
      const meanings = [
        'encourage_by_repetition',
        'motivate_through_repetition',
        'inspire_by_repeating'
      ];
      
      meanings.forEach(meaning => {
        const result = sutra1441('देवदत्त', {
          verb: 'अनुप्रतिगृणाति',
          meaning: meaning,
          priorAgent: 'यज्ञदत्त',
          priorAction: 'स्तुति'
        });
        
        expect(result.applies).toBe(true);
        expect(result.meaning).toBe(meaning);
      });
    });
  });

  describe('Context analysis', () => {
    test('identifies prior agent from context', () => {
      const result = sutra1441('छात्र', {
        verb: 'अनुप्रतिगृणाति',
        meaning: 'encourage_by_repetition',
        context: 'आचार्यः उपदिशति। छात्रं अनुप्रतिगृणाति।'
      });
      
      expect(result.applies).toBe(true);
      expect(result.priorAgent).toBe('आचार्य');
      expect(result.analysis.contextParsing).toBeDefined();
    });

    test('handles complex sentence structures', () => {
      const result = sutra1441('प्रेरक', {
        verb: 'अनुप्रतिगृणाति',
        meaning: 'encourage_by_repetition',
        context: 'प्रथमे काले गायकः गायति स्म। अधुना प्रेरकं अनुप्रतिगृणाति।',
        priorAgent: 'गायक',
        priorAction: 'गान'
      });
      
      expect(result.applies).toBe(true);
      expect(result.temporalContext).toBeDefined();
    });

    test('disambiguates multiple potential agents', () => {
      const result = sutra1441('प्रेरक', {
        verb: 'अनुप्रतिगृणाति',
        meaning: 'encourage_by_repetition',
        context: 'रामः कृष्णश्च गायतः। प्रेरकं अनुप्रतिगृणाति।',
        priorAgent: 'राम', // explicitly specified
        ambiguousAgents: ['राम', 'कृष्ण']
      });
      
      expect(result.applies).toBe(true);
      expect(result.priorAgent).toBe('राम');
      expect(result.disambiguation).toBeDefined();
    });
  });

  describe('Error handling', () => {
    test('handles empty input gracefully', () => {
      const result = sutra1441('');
      expect(result.applies).toBe(false);
      expect(result.error).toBe('empty_input');
    });

    test('handles invalid Sanskrit input', () => {
      const result = sutra1441('xyz123', {
        verb: 'अनुप्रतिगृणाति'
      });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_sanskrit_input');
    });

    test('handles missing context object', () => {
      const result = sutra1441('राम');
      expect(result.applies).toBe(false);
      expect(result.error).toBe('insufficient_context');
    });

    test('validates required context fields', () => {
      const result = sutra1441('राम', {
        verb: 'अनुप्रतिगृणाति'
        // missing meaning and other required fields
      });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('missing_required_context_fields');
    });
  });

  describe('Integration with other कारक rules', () => {
    test('integrates with basic सम्प्रदान rules (1.4.32)', () => {
      const result = sutra1441('ब्राह्मण', {
        verb: 'अनुप्रतिगृणाति',
        meaning: 'encourage_by_repetition',
        priorAgent: 'शूद्र',
        priorAction: 'सेवा',
        otherKarakas: ['कर्ता', 'कर्म']
      });
      
      expect(result.applies).toBe(true);
      expect(result.priority).toBeDefined(); // Integration priority
      expect(result.conflictResolution).toBeDefined();
    });

    test('handles कर्ता-कर्म relationship (1.4.36)', () => {
      const result = sutra1441('श्रोता', {
        verb: 'अनुप्रतिगृणाति',
        meaning: 'encourage_by_repetition',
        priorAgent: 'वक्ता',
        priorAction: 'कथन',
        karta: 'प्रेरयिता',
        karma: 'वचन'
      });
      
      expect(result.applies).toBe(true);
      expect(result.karakaRelations).toBeDefined();
    });
  });

  describe('Multi-script consistency', () => {
    test('produces consistent results across scripts', () => {
      const devanagariResult = sutra1441('देवदत्त', {
        verb: 'अनुप्रतिगृणाति',
        meaning: 'encourage_by_repetition',
        priorAgent: 'यज्ञदत्त',
        script: 'Devanagari'
      });
      
      const iastResult = sutra1441('devadatta', {
        verb: 'anupratigrṛṇāti',
        meaning: 'encourage_by_repetition',
        priorAgent: 'yajñadatta',
        script: 'IAST'
      });
      
      expect(devanagariResult.applies).toBe(iastResult.applies);
      expect(devanagariResult.karaka).toBe(iastResult.karaka);
      expect(devanagariResult.rule).toBe(iastResult.rule);
    });
  });

  describe('Edge cases and boundary conditions', () => {
    test('handles archaic forms of गृ root', () => {
      const result = sutra1441('छात्र', {
        verb: 'अनुप्रतिगिरति', // archaic form
        meaning: 'encourage_by_repetition',
        priorAgent: 'गुरु',
        archaic: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.archaicForm).toBe(true);
    });

    test('handles compound verb formations', () => {
      const result = sutra1441('साधक', {
        verb: 'अनुप्रतिगृणयति', // causative form
        meaning: 'cause_encouragement_by_repetition',
        priorAgent: 'कर्ता',
        causative: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.causativeForm).toBe(true);
    });

    test('handles nested encouragement contexts', () => {
      const result = sutra1441('द्वितीयप्रेरक', {
        verb: 'अनुप्रतिगृणाति',
        meaning: 'encourage_by_repetition',
        priorAgent: 'प्रथमप्रेरक',
        nestedContext: true,
        originalAgent: 'मूलकर्ता'
      });
      
      expect(result.applies).toBe(true);
      expect(result.nestedAnalysis).toBeDefined();
    });
  });
});
