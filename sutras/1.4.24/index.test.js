/**
 * Tests for Sutra 1.4.24: ध्रुवमपायेऽपादानम् (dhruvamapoye'pādānama)
 * Tests the identification of अपादान (ablative) relationships for fixed departure points
 */

import { sutra1424, identifyApadana } from './index.js';

describe('Sutra 1.4.24: ध्रुवमपायेऽपादानम् (dhruvamapoye\'pādānama)', () => {
  
  describe('Basic spatial departure', () => {
    test('identifies departure from house', () => {
      const result = sutra1424('गृह', { 
        verb: 'गच्छति', 
        context: 'गृहात् गच्छति',
        action_type: 'departure'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.case_required).toBe('ablative');
      expect(result.departure_type).toBe('spatial');
      expect(result.rule).toBe('1.4.24');
      expect(result.confidence).toBeGreaterThan(0.9);
    });

    test('identifies departure from village', () => {
      const result = sutra1424('ग्राम', { 
        verb: 'निर्गच्छति', 
        context: 'ग्रामात् निर्गच्छति',
        prefix: 'निर्'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.fixed_point).toBe(true);
      expect(result.departure_verb).toBe(true);
    });

    test('identifies departure from tree', () => {
      const result = sutra1424('वृक्ष', { 
        verb: 'पतति', 
        context: 'वृक्षात् पतति',
        action_type: 'falling_from'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.case_required).toBe('ablative');
    });

    test('identifies departure from mountain', () => {
      const result = sutra1424('पर्वत', { 
        verb: 'अवतरति', 
        context: 'पर्वतात् अवतरति',
        prefix: 'अव'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.departure_type).toBe('spatial');
    });
  });

  describe('Temporal departure contexts', () => {
    test('identifies temporal starting point', () => {
      const result = sutra1424('प्रभात', { 
        verb: 'आरभते', 
        context: 'प्रभातात् आरभते',
        temporal: true
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.departure_type).toBe('temporal');
      expect(result.temporal_boundary).toBe(true);
    });

    test('identifies time-based separation', () => {
      const result = sutra1424('बाल्य', { 
        verb: 'व्यतीत', 
        context: 'बाल्यात् व्यतीत',
        temporal: true,
        semantic_type: 'transition'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.life_stage_transition).toBe(true);
    });

    test('identifies departure from season', () => {
      const result = sutra1424('शीत', { 
        verb: 'गच्छति', 
        context: 'शीतात् गच्छति',
        temporal: true,
        seasonal: true
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.seasonal_transition).toBe(true);
    });
  });

  describe('Abstract departure and liberation', () => {
    test('identifies liberation from sorrow', () => {
      const result = sutra1424('दुःख', { 
        verb: 'मुच्यते',
        context: 'दुःखात् मुच्यते',
        semantic_type: 'liberation',
        abstract: true
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.departure_type).toBe('abstract');
      expect(result.liberation).toBe(true);
    });

    test('identifies separation from bondage', () => {
      const result = sutra1424('बन्धन', { 
        verb: 'विमुच्यते',
        context: 'बन्धनात् विमुच्यते',
        prefix: 'वि',
        semantic_type: 'freedom'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.freedom_context).toBe(true);
    });

    test('identifies departure from ignorance', () => {
      const result = sutra1424('अज्ञान', { 
        verb: 'निर्गच्छति',
        context: 'अज्ञानात् निर्गच्छति',
        semantic_type: 'enlightenment',
        abstract: true
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.cognitive_departure).toBe(true);
    });
  });

  describe('Directional verbs with prefixes', () => {
    test('analyzes निर्गम् (exit) constructions', () => {
      const result = sutra1424('नगर', { 
        verb: 'निर्गच्छति',
        context: 'नगरात् निर्गच्छति',
        prefix: 'निर्'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.directional_prefix).toBe('निर्');
      expect(result.exit_motion).toBe(true);
    });

    test('analyzes अपगम् (departure) constructions', () => {
      const result = sutra1424('स्थान', { 
        verb: 'अपगच्छति',
        context: 'स्थानात् अपगच्छति',
        prefix: 'अप'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.directional_prefix).toBe('अप');
    });

    test('analyzes व्यतिक्रम् (transgression) constructions', () => {
      const result = sutra1424('सीमा', { 
        verb: 'व्यतिक्रामति',
        context: 'सीमात् व्यतिक्रामति',
        prefix: 'व्यति'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.boundary_crossing).toBe(true);
    });
  });

  describe('IAST script support', () => {
    test('processes IAST spatial departure', () => {
      const result = sutra1424('gṛha', { 
        verb: 'gacchati', 
        context: 'gṛhāt gacchati',
        action_type: 'departure',
        script: 'iast'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.script).toBe('IAST');
    });

    test('processes IAST temporal departure', () => {
      const result = sutra1424('prabhāta', { 
        verb: 'ārabhate', 
        context: 'prabhātāt ārabhate',
        temporal: true,
        script: 'iast'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.departure_type).toBe('temporal');
    });

    test('processes IAST abstract departure', () => {
      const result = sutra1424('duḥkha', { 
        verb: 'mucyate',
        context: 'duḥkhāt mucyate',
        semantic_type: 'liberation',
        script: 'iast'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.liberation).toBe(true);
    });
  });

  describe('Fixed point validation', () => {
    test('validates ध्रुव (fixed) nature of departure point', () => {
      const result = sutra1424('आश्रम', { 
        verb: 'प्रस्थाति',
        context: 'आश्रमात् प्रस्थाति',
        fixed_reference: true
      });
      expect(result.applies).toBe(true);
      expect(result.dhruva_validated).toBe(true);
      expect(result.fixed_point).toBe(true);
    });

    test('validates stable reference point', () => {
      const result = sutra1424('मठ', { 
        verb: 'निर्यति',
        context: 'मठात् निर्यति',
        stable_reference: true
      });
      expect(result.applies).toBe(true);
      expect(result.reference_stability).toBe(true);
    });

    test('handles mobile vs fixed point distinction', () => {
      const result = sutra1424('यान', { 
        verb: 'अवतरति',
        context: 'यानात् अवतरति', // getting down from vehicle
        mobile_reference: true
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.mobile_but_contextually_fixed).toBe(true);
    });
  });

  describe('Multiple departure points', () => {
    test('analyzes compound departure contexts', () => {
      const result = sutra1424('all', {
        sentence: 'ग्रामात् वनात् च निर्गच्छति',
        verb: 'निर्गच्छति',
        analyze_all_departures: true
      });
      expect(result.applies).toBe(true);
      expect(result.multiple_departures).toBe(true);
      expect(result.departure_points).toHaveLength(2);
      expect(result.departure_points[0].word).toBe('ग्राम');
      expect(result.departure_points[1].word).toBe('वन');
    });

    test('handles sequential departures', () => {
      const result = sutra1424('all', {
        sentence: 'प्रथमं गृहात् ततो ग्रामात् निर्गच्छति',
        verb: 'निर्गच्छति',
        sequential: true,
        analyze_all: true
      });
      expect(result.applies).toBe(true);
      expect(result.sequential_departures).toBe(true);
    });
  });

  describe('Integration with ablative case system', () => {
    test('integrates with ablative case assignment', () => {
      const result = sutra1424('विद्यालय', { 
        verb: 'निर्गच्छति',
        context: 'विद्यालयात् निर्गच्छति'
      });
      expect(result.applies).toBe(true);
      expect(result.case_assignment).toBeDefined();
      expect(result.ablative_form).toBe('विद्यालयात्');
    });

    test('provides case application rationale', () => {
      const result = sutra1424('पुर', { 
        verb: 'प्रयाति',
        context: 'पुरात् प्रयाति'
      });
      expect(result.applies).toBe(true);
      expect(result.case_rationale).toContain('departure');
      expect(result.case_rationale).toContain('ablative');
    });
  });

  describe('Error handling and validation', () => {
    test('rejects non-departure contexts', () => {
      const result = sutra1424('राम', { 
        verb: 'गच्छति',
        context: 'रामो गच्छति', // agent, not departure point
        relationship: 'agent'
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('no_departure_context_detected');
    });

    test('validates अपाय (departure) requirement', () => {
      const result = sutra1424('गृह', { 
        verb: 'तिष्ठति', // staying, not departing
        context: 'गृहे तिष्ठति'
      });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('no_departure_action_in_verb');
    });

    test('handles missing context', () => {
      const result = sutra1424('गृह');
      expect(result.applies).toBe(false);
      expect(result.error).toBe('context_required_for_apadana_analysis');
    });

    test('handles invalid departure verb', () => {
      const result = sutra1424('गृह', { 
        verb: 'invalid_verb',
        context: 'गृहात् invalid_verb'
      });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_verb_for_departure');
    });
  });

  describe('Semantic departure types', () => {
    test('classifies physical movement departure', () => {
      const result = sutra1424('भवन', { 
        verb: 'निर्गच्छति',
        context: 'भवनात् निर्गच्छति',
        movement_type: 'physical'
      });
      expect(result.applies).toBe(true);
      expect(result.departure_classification).toBe('physical_movement');
    });

    test('classifies state transition departure', () => {
      const result = sutra1424('यौवन', { 
        verb: 'गत', 
        context: 'यौवनात् गत',
        transition_type: 'life_stage'
      });
      expect(result.applies).toBe(true);
      expect(result.departure_classification).toBe('state_transition');
    });

    test('classifies conceptual departure', () => {
      const result = sutra1424('भ्रम', { 
        verb: 'निवृत्त',
        context: 'भ्रमात् निवृत्त',
        conceptual: true
      });
      expect(result.applies).toBe(true);
      expect(result.departure_classification).toBe('conceptual');
    });
  });

  describe('Script conversion consistency', () => {
    test('maintains script consistency in analysis', () => {
      const devanagariResult = sutra1424('गृह', { 
        verb: 'गच्छति', 
        context: 'गृहात् गच्छति'
      });
      const iastResult = sutra1424('gṛha', { 
        verb: 'gacchati', 
        context: 'gṛhāt gacchati',
        script: 'iast'
      });
      
      expect(devanagariResult.script).toBe('Devanagari');
      expect(iastResult.script).toBe('IAST');
      expect(devanagariResult.karaka).toBe(iastResult.karaka);
    });

    test('converts between scripts when requested', () => {
      const result = sutra1424('गृह', { 
        verb: 'गच्छति',
        context: 'गृहात् गच्छति',
        output_script: 'iast'
      });
      expect(result.word_iast).toBe('gṛha');
      expect(result.context_iast).toBe('gṛhāt gacchati');
    });
  });

  describe('Performance and analysis depth', () => {
    test('returns confidence scores', () => {
      const result = sutra1424('गृह', { 
        verb: 'गच्छति',
        context: 'गृहात् गच्छति'
      });
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(typeof result.confidence).toBe('number');
    });

    test('provides detailed grammatical analysis', () => {
      const result = sutra1424('विद्यालय', { 
        verb: 'निर्गच्छति',
        context: 'विद्यालयात् निर्गच्छति'
      });
      expect(result.grammatical_analysis).toBeDefined();
      expect(result.grammatical_analysis.departure_validated).toBe(true);
      expect(result.grammatical_analysis.fixed_point_confirmed).toBe(true);
    });
  });
});

// Additional tests for the identifyApadana alias function
describe('identifyApadana function alias', () => {
  test('identifyApadana works as alias to sutra1424', () => {
    const context = { verb: 'गच्छति', context: 'गृहात् गच्छति' };
    const sutraResult = sutra1424('गृह', context);
    const aliasResult = identifyApadana('गृह', context);
    
    expect(aliasResult).toEqual(sutraResult);
  });

  test('maintains consistent API across both functions', () => {
    const word = 'ग्राम';
    const context = { verb: 'निर्गच्छति', context: 'ग्रामात् निर्गच्छति' };
    
    const result1 = sutra1424(word, context);
    const result2 = identifyApadana(word, context);
    
    expect(result1.applies).toBe(result2.applies);
    expect(result1.karaka).toBe(result2.karaka);
    expect(result1.case_required).toBe(result2.case_required);
  });
});
