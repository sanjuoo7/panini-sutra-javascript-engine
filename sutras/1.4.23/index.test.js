/**
 * Tests for Sutra 1.4.23: कारके (kārake)
 * Tests the fundamental scope of grammatical relationships (kāraka) in verbal actions
 */

import { sutra1423, identifyKaraka } from './index.js';

describe('Sutra 1.4.23: कारके (kārake)', () => {
  
  describe('Basic kāraka identification', () => {
    test('identifies agent relationship (कर्ता)', () => {
      const result = sutra1423('राम', { 
        verb: 'गच्छति', 
        relationship: 'agent',
        sentence: 'रामो गच्छति'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('कर्ता');
      expect(result.case_required).toBe('nominative');
      expect(result.rule).toBe('1.4.23');
      expect(result.confidence).toBeGreaterThan(0.9);
    });

    test('identifies object relationship (कर्म)', () => {
      const result = sutra1423('फल', { 
        verb: 'खादति', 
        relationship: 'object',
        sentence: 'रामः फलं खादति'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('कर्म');
      expect(result.case_required).toBe('accusative');
    });

    test('identifies instrument relationship (करण)', () => {
      const result = sutra1423('चाकु', { 
        verb: 'कृन्तति', 
        relationship: 'instrument',
        sentence: 'चाकुना कृन्तति'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('करण');
      expect(result.case_required).toBe('instrumental');
    });

    test('identifies recipient relationship (सम्प्रदान)', () => {
      const result = sutra1423('ब्राह्मण', { 
        verb: 'ददाति', 
        relationship: 'recipient',
        sentence: 'ब्राह्मणाय ददाति'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('सम्प्रदान');
      expect(result.case_required).toBe('dative');
    });

    test('identifies source relationship (अपादान)', () => {
      const result = sutra1423('वृक्ष', { 
        verb: 'पतति', 
        relationship: 'source',
        sentence: 'वृक्षात् पतति'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अपादान');
      expect(result.case_required).toBe('ablative');
    });

    test('identifies location relationship (अधिकरण)', () => {
      const result = sutra1423('गृह', { 
        verb: 'तिष्ठति', 
        relationship: 'location',
        sentence: 'गृहे तिष्ठति'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अधिकरण');
      expect(result.case_required).toBe('locative');
    });
  });

  describe('IAST script support', () => {
    test('processes IAST agent identification', () => {
      const result = sutra1423('rāma', { 
        verb: 'gacchati', 
        relationship: 'agent',
        sentence: 'rāmo gacchati',
        script: 'iast'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('कर्ता');
      expect(result.script).toBe('IAST');
    });

    test('processes IAST object identification', () => {
      const result = sutra1423('phala', { 
        verb: 'khādati', 
        relationship: 'object',
        sentence: 'rāmaḥ phalaṃ khādati',
        script: 'iast'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('कर्म');
    });

    test('processes IAST instrument identification', () => {
      const result = sutra1423('cāku', { 
        verb: 'kṛntati', 
        relationship: 'instrument',
        sentence: 'cākunā kṛntati',
        script: 'iast'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('करण');
    });
  });

  describe('Complex syntactic relationships', () => {
    test('analyzes transitive verb constructions', () => {
      const result = sutra1423('पुस्तक', { 
        verb: 'पठति', 
        relationship: 'object',
        sentence: 'छात्रः पुस्तकं पठति',
        verb_type: 'transitive'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('कर्म');
      expect(result.transitivity).toBe('transitive');
    });

    test('analyzes intransitive verb constructions', () => {
      const result = sutra1423('बालक', { 
        verb: 'क्रीडति', 
        relationship: 'agent',
        sentence: 'बालकः क्रीडति',
        verb_type: 'intransitive'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('कर्ता');
      expect(result.transitivity).toBe('intransitive');
    });

    test('handles causative constructions', () => {
      const result = sutra1423('अध्यापक', { 
        verb: 'पाठयति', 
        relationship: 'causer',
        sentence: 'अध्यापकः छात्रान् पाठयति',
        construction: 'causative'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('कर्ता');
      expect(result.causative).toBe(true);
    });

    test('analyzes passive constructions', () => {
      const result = sutra1423('राम', { 
        verb: 'गम्यते', 
        relationship: 'agent',
        sentence: 'रामेण गम्यते',
        construction: 'passive'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('कर्ता');
      expect(result.case_required).toBe('instrumental'); // agent in passive
      expect(result.passive).toBe(true);
    });
  });

  describe('Prepositional and adverbial relationships', () => {
    test('handles relationships with उप prefix', () => {
      const result = sutra1423('नदी', { 
        verb: 'उपगच्छति', 
        relationship: 'goal',
        sentence: 'नदीं उपगच्छति',
        prefix: 'उप'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('कर्म');
      expect(result.prefix_modified).toBe(true);
    });

    test('analyzes प्रति relationships', () => {
      const result = sutra1423('गुरु', { 
        verb: 'गच्छति', 
        relationship: 'goal',
        sentence: 'गुरुं प्रति गच्छति',
        preposition: 'प्रति'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अधिकरण');
      expect(result.preposition).toBe('प्रति');
    });

    test('handles अभि prefix constructions', () => {
      const result = sutra1423('राजा', { 
        verb: 'अभिगच्छति', 
        relationship: 'goal',
        sentence: 'राजानम् अभिगच्छति',
        prefix: 'अभि'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('कर्म');
    });
  });

  describe('Semantic role identification', () => {
    test('identifies beneficiary roles', () => {
      const result = sutra1423('पुत्र', { 
        verb: 'करोति', 
        relationship: 'beneficiary',
        sentence: 'पुत्राय करोति',
        semantic_role: 'beneficiary'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('सम्प्रदान');
      expect(result.semantic_role).toBe('beneficiary');
    });

    test('identifies experiencer roles', () => {
      const result = sutra1423('राम', { 
        verb: 'रोचते', 
        relationship: 'experiencer',
        sentence: 'रामाय रोचते',
        semantic_role: 'experiencer'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('सम्प्रदान');
      expect(result.experiencer).toBe(true);
    });

    test('identifies partitive relationships', () => {
      const result = sutra1423('छात्र', { 
        verb: 'पठति', 
        relationship: 'partitive',
        sentence: 'छात्राणां कः पठति',
        semantic_role: 'partitive'
      });
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अधिकरण');
      expect(result.partitive).toBe(true);
    });
  });

  describe('Multiple relationship analysis', () => {
    test('analyzes sentences with multiple kārakas', () => {
      const result = sutra1423('all', { 
        sentence: 'रामो ग्रामात् नगरं गच्छति',
        verb: 'गच्छति',
        analyze_all: true
      });
      expect(result.applies).toBe(true);
      expect(result.relationships).toBeDefined();
      expect(result.relationships).toHaveLength(3); // agent, source, goal
      expect(result.relationships[0].karaka).toBe('कर्ता');
      expect(result.relationships[1].karaka).toBe('अपादान');
      expect(result.relationships[2].karaka).toBe('कर्म');
    });

    test('handles complex predicate structures', () => {
      const result = sutra1423('all', { 
        sentence: 'गुरुणा शिष्याय पुस्तकं ददाति',
        verb: 'ददाति',
        analyze_all: true
      });
      expect(result.applies).toBe(true);
      expect(result.relationships).toHaveLength(3);
      expect(result.complex_predicate).toBe(true);
    });
  });

  describe('Contextual validation', () => {
    test('validates verbal action presence', () => {
      const result = sutra1423('राम', { 
        relationship: 'agent'
        // missing verb
      });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('verbal_action_required_for_karaka');
    });

    test('validates relationship coherence', () => {
      const result = sutra1423('राम', { 
        verb: 'गच्छति',
        relationship: 'instrument', // incoherent for this verb
        sentence: 'रामो गच्छति'
      });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('incoherent_relationship_for_verb');
    });

    test('handles ambiguous relationships', () => {
      const result = sutra1423('वन', { 
        verb: 'गच्छति',
        sentence: 'वने गच्छति', // could be goal or location
        ambiguous: true
      });
      expect(result.applies).toBe(true);
      expect(result.ambiguous).toBe(true);
      expect(result.possible_karakas).toContain('अधिकरण');
    });
  });

  describe('Integration with case system', () => {
    test('integrates with nominative case assignment', () => {
      const result = sutra1423('देव', { 
        verb: 'जयति',
        relationship: 'agent',
        sentence: 'देवो जयति'
      });
      expect(result.applies).toBe(true);
      expect(result.case_assignment).toBeDefined();
      expect(result.case_required).toBe('nominative');
    });

    test('integrates with accusative case assignment', () => {
      const result = sutra1423('शत्रु', { 
        verb: 'जयति',
        relationship: 'object',
        sentence: 'शत्रुं जयति'
      });
      expect(result.applies).toBe(true);
      expect(result.case_required).toBe('accusative');
    });

    test('provides case assignment rationale', () => {
      const result = sutra1423('अस्त्र', { 
        verb: 'युध्यति',
        relationship: 'instrument',
        sentence: 'अस्त्रेण युध्यति'
      });
      expect(result.applies).toBe(true);
      expect(result.case_rationale).toBeDefined();
      expect(result.case_rationale).toContain('instrument');
    });
  });

  describe('Error handling', () => {
    test('handles empty word input', () => {
      const result = sutra1423('', { verb: 'गच्छति', relationship: 'agent' });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('empty_word_input');
    });

    test('handles missing context', () => {
      const result = sutra1423('राम');
      expect(result.applies).toBe(false);
      expect(result.error).toBe('context_required_for_karaka_analysis');
    });

    test('handles invalid relationship type', () => {
      const result = sutra1423('राम', { 
        verb: 'गच्छति',
        relationship: 'invalid_relationship'
      });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_karaka_relationship');
    });

    test('handles malformed sentence input', () => {
      const result = sutra1423('राम', { 
        verb: 'गच्छति',
        relationship: 'agent',
        sentence: '123 xyz invalid'
      });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_sentence_structure');
    });
  });

  describe('Script conversion consistency', () => {
    test('maintains script consistency in analysis', () => {
      const devanagariResult = sutra1423('राम', { 
        verb: 'गच्छति', 
        relationship: 'agent',
        sentence: 'रामो गच्छति'
      });
      const iastResult = sutra1423('rāma', { 
        verb: 'gacchati', 
        relationship: 'agent',
        sentence: 'rāmo gacchati',
        script: 'iast'
      });
      
      expect(devanagariResult.script).toBe('Devanagari');
      expect(iastResult.script).toBe('IAST');
      expect(devanagariResult.karaka).toBe(iastResult.karaka);
    });

    test('converts analysis to requested script', () => {
      const result = sutra1423('राम', { 
        verb: 'गच्छति',
        relationship: 'agent',
        sentence: 'रामो गच्छति',
        output_script: 'iast'
      });
      expect(result.word_iast).toBe('rāma');
      expect(result.verb_iast).toBe('gacchati');
    });
  });

  describe('Performance and analysis depth', () => {
    test('returns confidence scores', () => {
      const result = sutra1423('राम', { 
        verb: 'गच्छति',
        relationship: 'agent',
        sentence: 'रामो गच्छति'
      });
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(typeof result.confidence).toBe('number');
    });

    test('provides syntactic analysis', () => {
      const result = sutra1423('पुस्तक', { 
        verb: 'पठति',
        relationship: 'object',
        sentence: 'छात्रः पुस्तकं पठति'
      });
      expect(result.syntactic_analysis).toBeDefined();
      expect(result.syntactic_analysis.word_order).toBeDefined();
      expect(result.syntactic_analysis.dependency).toBeDefined();
    });

    test('handles complex grammatical analysis', () => {
      const result = sutra1423('all', { 
        sentence: 'शिक्षकेण छात्रेभ्यः पुस्तकानि दत्तानि',
        verb: 'दत्तानि',
        analyze_all: true,
        construction: 'passive'
      });
      expect(result.applies).toBe(true);
      expect(result.grammatical_analysis).toBeDefined();
      expect(result.passive_analysis).toBe(true);
    });
  });
});

// Additional tests for the identifyKaraka alias function
describe('identifyKaraka function alias', () => {
  test('identifyKaraka works as alias to sutra1423', () => {
    const context = { verb: 'गच्छति', relationship: 'agent', sentence: 'रामो गच्छति' };
    const sutraResult = sutra1423('राम', context);
    const aliasResult = identifyKaraka('राम', context);
    
    expect(aliasResult).toEqual(sutraResult);
  });

  test('maintains consistent API across both functions', () => {
    const word = 'फल';
    const context = { verb: 'खादति', relationship: 'object', sentence: 'फलं खादति' };
    
    const result1 = sutra1423(word, context);
    const result2 = identifyKaraka(word, context);
    
    expect(result1.applies).toBe(result2.applies);
    expect(result1.karaka).toBe(result2.karaka);
    expect(result1.case_required).toBe(result2.case_required);
  });
});
