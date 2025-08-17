/**
 * Tests for Sutra 1.4.26: पराजेरसोढः (parājerasoḍhaḥ)
 * Tests ablative case assignment for sources of weariness and defeat with पराजि verb
 */

import { sutra1426, identifyParajiApadana } from './index.js';

describe('Sutra 1.4.26: पराजेरसोढः (parājerasoḍhaḥ)', () => {
  
  describe('Basic पराजि constructions', () => {
    test('identifies weariness from work', () => {
      const result = sutra1426('कार्य', { 
        verb: 'पराजयते', 
        context: 'कार्यात् पराजयते',
        exhaustion_source: true
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.case_required).toBe('ablative');
      expect(result.weariness_source).toBe(true);
      expect(result.rule).toBe('1.4.26');
      expect(result.confidence).toBeGreaterThan(0.9);
    });

    test('identifies defeat in battle', () => {
      const result = sutra1426('युद्ध', { 
        verb: 'पराजयते', 
        context: 'युद्धात् पराजयते',
        defeat_context: true
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.defeat_source).toBe(true);
      expect(result.conflict_context).toBe(true);
    });

    test('identifies exhaustion from travel', () => {
      const result = sutra1426('यात्रा', { 
        verb: 'पराजीयते', 
        context: 'यात्रात् पराजीयते',
        physical_exhaustion: true
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.travel_fatigue).toBe(true);
    });

    test('identifies weariness from study', () => {
      const result = sutra1426('अध्ययन', { 
        verb: 'पराजयते', 
        context: 'अध्ययनात् पराजयते',
        mental_exhaustion: true
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.cognitive_overload).toBe(true);
    });
  });

  describe('Different forms of पराजि', () => {
    test('analyzes active पराजयति form', () => {
      const result = sutra1426('परीक्षा', { 
        verb: 'पराजयति', 
        context: 'परीक्षात् पराजयति',
        active_form: true
      });
      expect(result.applies).toBe(true);
      expect(result.verb_form).toBe('active');
      expect(result.exam_stress).toBe(true);
    });

    test('analyzes passive पराजीयते form', () => {
      const result = sutra1426('भार', { 
        verb: 'पराजीयते', 
        context: 'भारात् पराजीयते',
        passive_form: true
      });
      expect(result.applies).toBe(true);
      expect(result.verb_form).toBe('passive');
      expect(result.burden_overwhelm).toBe(true);
    });

    test('analyzes आत्मनेपद पराजयते form', () => {
      const result = sutra1426('चिन्ता', { 
        verb: 'पराजयते', 
        context: 'चिन्तात् पराजयते',
        atmanepada: true
      });
      expect(result.applies).toBe(true);
      expect(result.verb_pada).toBe('atmanepada');
      expect(result.worry_exhaustion).toBe(true);
    });
  });

  describe('Types of exhaustion', () => {
    test('identifies physical exhaustion', () => {
      const result = sutra1426('श्रम', { 
        verb: 'पराजयते',
        context: 'श्रमात् पराजयते',
        exhaustion_type: 'physical'
      });
      expect(result.applies).toBe(true);
      expect(result.exhaustion_classification).toBe('physical');
      expect(result.labor_fatigue).toBe(true);
    });

    test('identifies mental exhaustion', () => {
      const result = sutra1426('मनन', { 
        verb: 'पराजयते',
        context: 'मननात् पराजयते',
        exhaustion_type: 'mental'
      });
      expect(result.applies).toBe(true);
      expect(result.exhaustion_classification).toBe('mental');
      expect(result.cognitive_fatigue).toBe(true);
    });

    test('identifies emotional exhaustion', () => {
      const result = sutra1426('शोक', { 
        verb: 'पराजीयते',
        context: 'शोकात् पराजीयते',
        exhaustion_type: 'emotional'
      });
      expect(result.applies).toBe(true);
      expect(result.exhaustion_classification).toBe('emotional');
      expect(result.grief_overwhelm).toBe(true);
    });

    test('identifies social exhaustion', () => {
      const result = sutra1426('सभा', { 
        verb: 'पराजयते',
        context: 'सभात् पराजयते',
        exhaustion_type: 'social'
      });
      expect(result.applies).toBe(true);
      expect(result.exhaustion_classification).toBe('social');
      expect(result.assembly_fatigue).toBe(true);
    });
  });

  describe('Defeat and inability contexts', () => {
    test('identifies defeat by opponent', () => {
      const result = sutra1426('शत्रु', { 
        verb: 'पराजयते',
        context: 'शत्रुणा पराजयते', // defeated by enemy
        defeat_agent: true
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.defeat_by_agent).toBe(true);
    });

    test('identifies inability to bear burden', () => {
      const result = sutra1426('भार', { 
        verb: 'पराजयते',
        context: 'भारात् पराजयते',
        inability_context: true
      });
      expect(result.applies).toBe(true);
      expect(result.unbearable_source).toBe(true);
      expect(result.capacity_exceeded).toBe(true);
    });

    test('identifies overwhelm by responsibility', () => {
      const result = sutra1426('दायित्व', { 
        verb: 'पराजीयते',
        context: 'दायित्वात् पराजीयते',
        responsibility_overwhelm: true
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.responsibility_burden).toBe(true);
    });
  });

  describe('IAST script support', () => {
    test('processes IAST weariness expression', () => {
      const result = sutra1426('kārya', { 
        verb: 'parājayate', 
        context: 'kāryāt parājayate',
        exhaustion_source: true,
        script: 'iast'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.script).toBe('IAST');
    });

    test('processes IAST defeat context', () => {
      const result = sutra1426('yuddha', { 
        verb: 'parājayate', 
        context: 'yuddhāt parājayate',
        defeat_context: true,
        script: 'iast'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.defeat_source).toBe(true);
    });

    test('processes IAST mental exhaustion', () => {
      const result = sutra1426('adhyayana', { 
        verb: 'parājīyate',
        context: 'adhyayanāt parājīyate',
        mental_exhaustion: true,
        script: 'iast'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.cognitive_overload).toBe(true);
    });
  });

  describe('Semantic analysis of sources', () => {
    test('analyzes task-related exhaustion', () => {
      const result = sutra1426('कृत्य', { 
        verb: 'पराजयते',
        context: 'कृत्यात् पराजयते',
        task_type: 'complex'
      });
      expect(result.applies).toBe(true);
      expect(result.task_complexity_factor).toBe(true);
      expect(result.source_analysis).toContain('task');
    });

    test('analyzes relationship exhaustion', () => {
      const result = sutra1426('कलह', { 
        verb: 'पराजयते',
        context: 'कलहात् पराजयते',
        interpersonal_stress: true
      });
      expect(result.applies).toBe(true);
      expect(result.conflict_fatigue).toBe(true);
      expect(result.interpersonal_exhaustion).toBe(true);
    });

    test('analyzes environmental stress', () => {
      const result = sutra1426('उष्णता', { 
        verb: 'पराजीयते',
        context: 'उष्णतात् पराजीयते',
        environmental_factor: true
      });
      expect(result.applies).toBe(true);
      expect(result.environmental_exhaustion).toBe(true);
      expect(result.heat_stress).toBe(true);
    });
  });

  describe('Intensity and duration analysis', () => {
    test('analyzes sudden exhaustion', () => {
      const result = sutra1426('आघात', { 
        verb: 'पराजयते',
        context: 'आघातात् पराजयते',
        suddenness: 'immediate'
      });
      expect(result.applies).toBe(true);
      expect(result.exhaustion_onset).toBe('sudden');
      expect(result.shock_factor).toBe(true);
    });

    test('analyzes gradual weariness', () => {
      const result = sutra1426('दीर्घकाल', { 
        verb: 'पराजयते',
        context: 'दीर्घकालात् पराजयते',
        duration: 'extended'
      });
      expect(result.applies).toBe(true);
      expect(result.exhaustion_onset).toBe('gradual');
      expect(result.chronic_fatigue).toBe(true);
    });

    test('analyzes complete defeat', () => {
      const result = sutra1426('सम्पूर्णयुद्ध', { 
        verb: 'पराजयते',
        context: 'सम्पूर्णयुद्धात् पराजयते',
        completeness: 'total'
      });
      expect(result.applies).toBe(true);
      expect(result.defeat_completeness).toBe('total');
      expect(result.overwhelming_defeat).toBe(true);
    });
  });

  describe('Multiple exhaustion sources', () => {
    test('analyzes compound exhaustion', () => {
      const result = sutra1426('all', {
        sentence: 'कार्यात् चिन्तात् च पराजयते',
        verb: 'पराजयते',
        analyze_all_sources: true
      });
      expect(result.applies).toBe(true);
      expect(result.multiple_exhaustion_sources).toBe(true);
      expect(result.exhaustion_sources).toHaveLength(2);
    });

    test('handles layered fatigue factors', () => {
      const result = sutra1426('all', {
        sentence: 'श्रमात् भारात् च पराजीयते',
        verb: 'पराजीयते',
        layered_exhaustion: true,
        analyze_all: true
      });
      expect(result.applies).toBe(true);
      expect(result.compound_fatigue).toBe(true);
    });
  });

  describe('Integration with ablative system', () => {
    test('integrates with ablative case assignment', () => {
      const result = sutra1426('परिश्रम', { 
        verb: 'पराजयते',
        context: 'परिश्रमात् पराजयते'
      });
      expect(result.applies).toBe(true);
      expect(result.case_assignment).toBeDefined();
      expect(result.ablative_form).toBe('परिश्रमात्');
    });

    test('provides exhaustion-specific case rationale', () => {
      const result = sutra1426('अध्वा', { 
        verb: 'पराजीयते',
        context: 'अध्वनः पराजीयते'
      });
      expect(result.applies).toBe(true);
      expect(result.case_rationale).toContain('exhaustion_source');
      expect(result.case_rationale).toContain('ablative');
    });
  });

  describe('Error handling and validation', () => {
    test('rejects non-परज contexts', () => {
      const result = sutra1426('राम', { 
        verb: 'गच्छति',
        context: 'रामो गच्छति',
        relationship: 'agent'
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('no_paraji_context_detected');
    });

    test('validates पराजि verb requirement', () => {
      const result = sutra1426('कार्य', { 
        verb: 'करोति', // doing, not being defeated by
        context: 'कार्यं करोति'
      });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('verb_not_paraji_related');
    });

    test('handles missing exhaustion context', () => {
      const result = sutra1426('कार्य');
      expect(result.applies).toBe(false);
      expect(result.error).toBe('context_required_for_paraji_analysis');
    });

    test('validates source-exhaustion relationship', () => {
      const result = sutra1426('फूल', { // flower - unlikely exhaustion source
        verb: 'पराजयते',
        context: 'फूलात् पराजयते',
        validate_plausibility: true
      });
      expect(result.applies).toBe(true); // grammatically valid
      expect(result.plausibility_warning).toBe(true);
    });
  });

  describe('Verb form variations', () => {
    test('handles causative forms', () => {
      const result = sutra1426('शत्रु', { 
        verb: 'पराजापयति',
        context: 'शत्रुं पराजापयति', // causes to be defeated
        causative: true
      });
      expect(result.applies).toBe(true);
      expect(result.causative_context).toBe(true);
      expect(result.defeat_causation).toBe(true);
    });

    test('handles intensified forms', () => {
      const result = sutra1426('महाभार', { 
        verb: 'सम्पराजयते',
        context: 'महाभारात् सम्पराजयते',
        intensified: true
      });
      expect(result.applies).toBe(true);
      expect(result.intensified_defeat).toBe(true);
      expect(result.overwhelming_burden).toBe(true);
    });
  });

  describe('Script conversion consistency', () => {
    test('maintains script consistency in analysis', () => {
      const devanagariResult = sutra1426('कार्य', { 
        verb: 'पराजयते', 
        context: 'कार्यात् पराजयते'
      });
      const iastResult = sutra1426('kārya', { 
        verb: 'parājayate', 
        context: 'kāryāt parājayate',
        script: 'iast'
      });
      
      expect(devanagariResult.script).toBe('Devanagari');
      expect(iastResult.script).toBe('IAST');
      expect(devanagariResult.karaka).toBe(iastResult.karaka);
    });

    test('converts between scripts when requested', () => {
      const result = sutra1426('कार्य', { 
        verb: 'पराजयते',
        context: 'कार्यात् पराजयते',
        output_script: 'iast'
      });
      expect(result.word_iast).toBe('kārya');
      expect(result.context_iast).toBe('kāryāt parājayate');
    });
  });

  describe('Performance and analysis depth', () => {
    test('returns confidence scores', () => {
      const result = sutra1426('कार्य', { 
        verb: 'पराजयते',
        context: 'कार्यात् पराजयते'
      });
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(typeof result.confidence).toBe('number');
    });

    test('provides exhaustion analysis', () => {
      const result = sutra1426('श्रम', { 
        verb: 'पराजयते',
        context: 'श्रमात् पराजयते'
      });
      expect(result.exhaustion_analysis).toBeDefined();
      expect(result.exhaustion_analysis.type).toBe('physical');
      expect(result.exhaustion_analysis.severity).toBeDefined();
    });
  });
});

// Additional tests for the identifyParajiApadana alias function
describe('identifyParajiApadana function alias', () => {
  test('identifyParajiApadana works as alias to sutra1426', () => {
    const context = { verb: 'पराजयते', context: 'कार्यात् पराजयते', exhaustion_source: true };
    const sutraResult = sutra1426('कार्य', context);
    const aliasResult = identifyParajiApadana('कार्य', context);
    
    expect(aliasResult).toEqual(sutraResult);
  });

  test('maintains consistent API across both functions', () => {
    const word = 'युद्ध';
    const context = { verb: 'पराजयते', context: 'युद्धात् पराजयते', defeat_context: true };
    
    const result1 = sutra1426(word, context);
    const result2 = identifyParajiApadana(word, context);
    
    expect(result1.applies).toBe(result2.applies);
    expect(result1.karaka).toBe(result2.karaka);
    expect(result1.case_required).toBe(result2.case_required);
  });
});
