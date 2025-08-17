/**
 * Tests for Sutra 1.4.25: भीत्रार्थानां भयहेतुः (bhītrarāthānāṃ bhayahetuḥ)
 * Tests ablative case assignment for sources of fear and danger in protection contexts
 */

import { sutra1425, identifyFearApadana } from './index.js';

describe('Sutra 1.4.25: भीत्रार्थानां भयहेतुः (bhītrarāthānāṃ bhayahetuḥ)', () => {
  
  describe('Basic fear expressions', () => {
    test('identifies fear from predator', () => {
      const result = sutra1425('सिंह', { 
        verb: 'बिभेति', 
        context: 'सिंहात् बिभेति',
        emotion: 'fear'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.case_required).toBe('ablative');
      expect(result.fear_source).toBe(true);
      expect(result.rule).toBe('1.4.25');
      expect(result.confidence).toBeGreaterThan(0.9);
    });

    test('identifies fear from fire', () => {
      const result = sutra1425('अग्नि', { 
        verb: 'भयते', 
        context: 'अग्नेर् भयते',
        danger_source: true
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.danger_type).toBe('physical');
    });

    test('identifies fear from snake', () => {
      const result = sutra1425('सर्प', { 
        verb: 'विभेति', 
        context: 'सर्पात् विभेति',
        emotion: 'intense_fear'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.fear_intensity).toBe('high');
    });

    test('identifies fear from thunder', () => {
      const result = sutra1425('गर्जन', { 
        verb: 'त्रसति', 
        context: 'गर्जनात् त्रसति',
        natural_phenomenon: true
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.natural_fear).toBe(true);
    });
  });

  describe('Protection contexts', () => {
    test('identifies protection from enemy', () => {
      const result = sutra1425('शत्रु', { 
        verb: 'त्रायते', 
        context: 'शत्रुतो त्रायते',
        protection: true
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.protection_context).toBe(true);
      expect(result.threat_source).toBe('शत्रु');
    });

    test('identifies protection from disease', () => {
      const result = sutra1425('रोग', { 
        verb: 'रक्षति', 
        context: 'रोगात् रक्षति',
        protective_action: true
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.protection_type).toBe('health');
    });

    test('identifies shelter from rain', () => {
      const result = sutra1425('वृष्टि', { 
        verb: 'त्रायते', 
        context: 'वृष्टेः त्रायते',
        shelter: true
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.environmental_protection).toBe(true);
    });

    test('identifies protection from danger', () => {
      const result = sutra1425('भय', { 
        verb: 'पालयति', 
        context: 'भयात् पालयति',
        guardian_action: true
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.guardian_context).toBe(true);
    });
  });

  describe('Abstract fear sources', () => {
    test('identifies fear from sin', () => {
      const result = sutra1425('पाप', { 
        verb: 'विभेति',
        context: 'पापात् विभेति',
        abstract_fear: true,
        moral_context: true
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.fear_type).toBe('moral');
      expect(result.abstract_source).toBe(true);
    });

    test('identifies fear from death', () => {
      const result = sutra1425('मृत्यु', { 
        verb: 'बिभेति',
        context: 'मृत्योर् बिभेति',
        existential_fear: true
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.existential_context).toBe(true);
    });

    test('identifies fear from poverty', () => {
      const result = sutra1425('दारिद्र्य', { 
        verb: 'शङ्कते',
        context: 'दारिद्र्यात् शङ्कते',
        social_fear: true
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.social_anxiety).toBe(true);
    });
  });

  describe('Different fear verbs', () => {
    test('analyzes भी root (to fear)', () => {
      const result = sutra1425('व्याघ्र', { 
        verb: 'भयते',
        context: 'व्याघ्रात् भयते',
        root: 'भी'
      });
      expect(result.applies).toBe(true);
      expect(result.verb_root).toBe('भी');
      expect(result.fear_verb_confirmed).toBe(true);
    });

    test('analyzes त्रस् root (to tremble with fear)', () => {
      const result = sutra1425('भूत', { 
        verb: 'त्रसति',
        context: 'भूतात् त्रसति',
        root: 'त्रस्'
      });
      expect(result.applies).toBe(true);
      expect(result.verb_root).toBe('त्रस्');
      expect(result.trembling_fear).toBe(true);
    });

    test('analyzes शङ्क् root (to suspect/fear)', () => {
      const result = sutra1425('चोर', { 
        verb: 'शङ्कते',
        context: 'चोरात् शङ्कते',
        root: 'शङ्क्'
      });
      expect(result.applies).toBe(true);
      expect(result.verb_root).toBe('शङ्क्');
      expect(result.suspicious_fear).toBe(true);
    });
  });

  describe('Protection verbs', () => {
    test('analyzes त्रा root (to protect)', () => {
      const result = sutra1425('दस्यु', { 
        verb: 'त्रायते',
        context: 'दस्युभ्यः त्रायते',
        root: 'त्रा',
        protection: true
      });
      expect(result.applies).toBe(true);
      expect(result.protection_verb).toBe('त्रा');
      expect(result.active_protection).toBe(true);
    });

    test('analyzes रक्ष् root (to guard/protect)', () => {
      const result = sutra1425('राक्षस', { 
        verb: 'रक्षति',
        context: 'राक्षसात् रक्षति',
        root: 'रक्ष्'
      });
      expect(result.applies).toBe(true);
      expect(result.protection_verb).toBe('रक्ष्');
      expect(result.guardian_action).toBe(true);
    });

    test('analyzes पाल् root (to maintain/protect)', () => {
      const result = sutra1425('उपद्रव', { 
        verb: 'पालयति',
        context: 'उपद्रवात् पालयति',
        root: 'पाल्'
      });
      expect(result.applies).toBe(true);
      expect(result.protection_verb).toBe('पाल्');
      expect(result.maintenance_protection).toBe(true);
    });
  });

  describe('IAST script support', () => {
    test('processes IAST fear expression', () => {
      const result = sutra1425('siṃha', { 
        verb: 'bibheti', 
        context: 'siṃhāt bibheti',
        emotion: 'fear',
        script: 'iast'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.script).toBe('IAST');
    });

    test('processes IAST protection context', () => {
      const result = sutra1425('śatru', { 
        verb: 'trāyate', 
        context: 'śatruto trāyate',
        protection: true,
        script: 'iast'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.protection_context).toBe(true);
    });

    test('processes IAST abstract fear', () => {
      const result = sutra1425('pāpa', { 
        verb: 'vibheti',
        context: 'pāpāt vibheti',
        abstract_fear: true,
        script: 'iast'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.abstract_source).toBe(true);
    });
  });

  describe('Contextual fear analysis', () => {
    test('analyzes immediate vs distant threats', () => {
      const result = sutra1425('सर्प', { 
        verb: 'बिभेति',
        context: 'सर्पात् बिभेति',
        proximity: 'immediate'
      });
      expect(result.applies).toBe(true);
      expect(result.threat_proximity).toBe('immediate');
      expect(result.urgency_level).toBe('high');
    });

    test('handles potential vs actual threats', () => {
      const result = sutra1425('चोर', { 
        verb: 'शङ्कते',
        context: 'चोरात् शङ्कते',
        threat_type: 'potential'
      });
      expect(result.applies).toBe(true);
      expect(result.threat_actuality).toBe('potential');
      expect(result.anticipatory_fear).toBe(true);
    });

    test('distinguishes rational vs irrational fears', () => {
      const result = sutra1425('छाया', { 
        verb: 'त्रसति',
        context: 'छायात् त्रसति',
        fear_rationality: 'irrational'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.irrational_fear).toBe(true);
    });
  });

  describe('Multiple threat sources', () => {
    test('analyzes compound fear sources', () => {
      const result = sutra1425('all', {
        sentence: 'सिंहात् व्याघ्रात् च बिभेति',
        verb: 'बिभेति',
        analyze_all_sources: true
      });
      expect(result.applies).toBe(true);
      expect(result.multiple_threats).toBe(true);
      expect(result.threat_sources).toHaveLength(2);
    });

    test('handles layered protection needs', () => {
      const result = sutra1425('all', {
        sentence: 'शत्रुभ्यो रोगात् च रक्षति',
        verb: 'रक्षति',
        protection_layers: true,
        analyze_all: true
      });
      expect(result.applies).toBe(true);
      expect(result.multilayered_protection).toBe(true);
    });
  });

  describe('Integration with ablative system', () => {
    test('integrates with ablative case assignment', () => {
      const result = sutra1425('मृत्यु', { 
        verb: 'बिभेति',
        context: 'मृत्योर् बिभेति'
      });
      expect(result.applies).toBe(true);
      expect(result.case_assignment).toBeDefined();
      expect(result.ablative_form).toBe('मृत्योः');
    });

    test('provides fear-specific case rationale', () => {
      const result = sutra1425('भय', { 
        verb: 'त्रायते',
        context: 'भयात् त्रायते'
      });
      expect(result.applies).toBe(true);
      expect(result.case_rationale).toContain('fear_source');
      expect(result.case_rationale).toContain('ablative');
    });
  });

  describe('Error handling and validation', () => {
    test('rejects non-fear contexts', () => {
      const result = sutra1425('राम', { 
        verb: 'गच्छति',
        context: 'रामो गच्छति',
        relationship: 'agent'
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('no_fear_or_protection_context');
    });

    test('validates fear/protection verb requirement', () => {
      const result = sutra1425('सिंह', { 
        verb: 'खादति', // eating, not fearing
        context: 'सिंहः खादति'
      });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('verb_not_related_to_fear_or_protection');
    });

    test('handles missing emotional context', () => {
      const result = sutra1425('सिंह');
      expect(result.applies).toBe(false);
      expect(result.error).toBe('context_required_for_fear_analysis');
    });

    test('validates source-fear relationship', () => {
      const result = sutra1425('फूल', { // flower - unlikely fear source
        verb: 'बिभेति',
        context: 'फूलात् बिभेति',
        validate_plausibility: true
      });
      expect(result.applies).toBe(true); // grammatically valid
      expect(result.plausibility_warning).toBe(true);
    });
  });

  describe('Semantic fear classification', () => {
    test('classifies physical danger fears', () => {
      const result = sutra1425('अग्नि', { 
        verb: 'भयते',
        context: 'अग्नेर् भयते',
        classification: 'physical'
      });
      expect(result.applies).toBe(true);
      expect(result.fear_classification).toBe('physical_danger');
    });

    test('classifies social fears', () => {
      const result = sutra1425('अपमान', { 
        verb: 'शङ्कते',
        context: 'अपमानात् शङ्कते',
        classification: 'social'
      });
      expect(result.applies).toBe(true);
      expect(result.fear_classification).toBe('social_anxiety');
    });

    test('classifies existential fears', () => {
      const result = sutra1425('शून्यता', { 
        verb: 'विभेति',
        context: 'शून्यतात् विभेति',
        classification: 'existential'
      });
      expect(result.applies).toBe(true);
      expect(result.fear_classification).toBe('existential_dread');
    });
  });

  describe('Script conversion consistency', () => {
    test('maintains script consistency in analysis', () => {
      const devanagariResult = sutra1425('सिंह', { 
        verb: 'बिभेति', 
        context: 'सिंहात् बिभेति'
      });
      const iastResult = sutra1425('siṃha', { 
        verb: 'bibheti', 
        context: 'siṃhāt bibheti',
        script: 'iast'
      });
      
      expect(devanagariResult.script).toBe('Devanagari');
      expect(iastResult.script).toBe('IAST');
      expect(devanagariResult.karaka).toBe(iastResult.karaka);
    });

    test('converts between scripts when requested', () => {
      const result = sutra1425('सिंह', { 
        verb: 'बिभेति',
        context: 'सिंहात् बिभेति',
        output_script: 'iast'
      });
      expect(result.word_iast).toBe('siṃha');
      expect(result.context_iast).toBe('siṃhāt bibheti');
    });
  });

  describe('Performance and analysis depth', () => {
    test('returns confidence scores', () => {
      const result = sutra1425('सिंह', { 
        verb: 'बिभेति',
        context: 'सिंहात् बिभेति'
      });
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(typeof result.confidence).toBe('number');
    });

    test('provides emotional analysis', () => {
      const result = sutra1425('सर्प', { 
        verb: 'त्रसति',
        context: 'सर्पात् त्रसति'
      });
      expect(result.emotional_analysis).toBeDefined();
      expect(result.emotional_analysis.emotion_type).toBe('fear');
      expect(result.emotional_analysis.intensity).toBeDefined();
    });
  });
});

// Additional tests for the identifyFearApadana alias function
describe('identifyFearApadana function alias', () => {
  test('identifyFearApadana works as alias to sutra1425', () => {
    const context = { verb: 'बिभेति', context: 'सिंहात् बिभेति', emotion: 'fear' };
    const sutraResult = sutra1425('सिंह', context);
    const aliasResult = identifyFearApadana('सिंह', context);
    
    expect(aliasResult).toEqual(sutraResult);
  });

  test('maintains consistent API across both functions', () => {
    const word = 'शत्रु';
    const context = { verb: 'त्रायते', context: 'शत्रुतो त्रायते', protection: true };
    
    const result1 = sutra1425(word, context);
    const result2 = identifyFearApadana(word, context);
    
    expect(result1.applies).toBe(result2.applies);
    expect(result1.karaka).toBe(result2.karaka);
    expect(result1.case_required).toBe(result2.case_required);
  });
});
