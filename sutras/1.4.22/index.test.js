/**
 * Tests for Sutra 1.4.22: द्व्येकयोर्द्विवचनैकवचने (dvyekayordvivacanaikavacane)
 * Tests the fundamental rule for dual and singular case affixes when expressing duality and unity
 */

import { sutra1422, applyDualSingularRule } from './index.js';

describe('Sutra 1.4.22: द्व्येकयोर्द्विवचनैकवचने (dvyekayordvivacanaikavacane)', () => {
  
  describe('Dual case applications', () => {
    test('applies dual nominative case for two entities', () => {
      const result = sutra1422('देव', { count: 'dual', case: 'nominative' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('देवौ');
      expect(result.case).toBe('nominative_dual');
      expect(result.rule).toBe('1.4.22');
      expect(result.confidence).toBeGreaterThan(0.9);
    });

    test('applies dual accusative case', () => {
      const result = sutra1422('देव', { count: 'dual', case: 'accusative' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('देवौ');
      expect(result.case).toBe('accusative_dual');
    });

    test('applies dual instrumental case', () => {
      const result = sutra1422('देव', { count: 'dual', case: 'instrumental' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('देवाभ्याम्');
      expect(result.case).toBe('instrumental_dual');
    });

    test('applies dual dative case', () => {
      const result = sutra1422('देव', { count: 'dual', case: 'dative' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('देवाभ्याम्');
      expect(result.case).toBe('dative_dual');
    });

    test('applies dual ablative case', () => {
      const result = sutra1422('देव', { count: 'dual', case: 'ablative' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('देवाभ्याम्');
      expect(result.case).toBe('ablative_dual');
    });

    test('applies dual genitive case', () => {
      const result = sutra1422('देव', { count: 'dual', case: 'genitive' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('देवयोः');
      expect(result.case).toBe('genitive_dual');
    });

    test('applies dual locative case', () => {
      const result = sutra1422('देव', { count: 'dual', case: 'locative' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('देवयोः');
      expect(result.case).toBe('locative_dual');
    });

    test('applies dual vocative case', () => {
      const result = sutra1422('देव', { count: 'dual', case: 'vocative' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('देवौ');
      expect(result.case).toBe('vocative_dual');
    });
  });

  describe('Singular case applications', () => {
    test('applies singular nominative case for one entity', () => {
      const result = sutra1422('देव', { count: 'singular', case: 'nominative' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('देवः');
      expect(result.case).toBe('nominative_singular');
      expect(result.rule).toBe('1.4.22');
    });

    test('applies singular accusative case', () => {
      const result = sutra1422('देव', { count: 'singular', case: 'accusative' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('देवम्');
      expect(result.case).toBe('accusative_singular');
    });

    test('applies singular instrumental case', () => {
      const result = sutra1422('देव', { count: 'singular', case: 'instrumental' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('देवेन');
      expect(result.case).toBe('instrumental_singular');
    });

    test('applies singular genitive case', () => {
      const result = sutra1422('देव', { count: 'singular', case: 'genitive' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('देवस्य');
      expect(result.case).toBe('genitive_singular');
    });

    test('applies singular locative case', () => {
      const result = sutra1422('देव', { count: 'singular', case: 'locative' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('देवे');
      expect(result.case).toBe('locative_singular');
    });
  });

  describe('IAST script support', () => {
    test('processes IAST dual input', () => {
      const result = sutra1422('deva', { count: 'dual', case: 'nominative', script: 'iast' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('devau');
      expect(result.script).toBe('IAST');
    });

    test('processes IAST singular input', () => {
      const result = sutra1422('deva', { count: 'singular', case: 'accusative', script: 'iast' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('devam');
      expect(result.script).toBe('IAST');
    });

    test('processes IAST dual instrumental', () => {
      const result = sutra1422('gṛha', { count: 'dual', case: 'instrumental', script: 'iast' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('gṛhābhyām');
    });
  });

  describe('Different noun classes', () => {
    test('applies to ā-ending feminine nouns in dual', () => {
      const result = sutra1422('लता', { count: 'dual', case: 'nominative' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('लते');
      expect(result.case).toBe('nominative_dual');
    });

    test('applies to ā-ending feminine nouns in singular', () => {
      const result = sutra1422('लता', { count: 'singular', case: 'nominative' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('लता');
      expect(result.case).toBe('nominative_singular');
    });

    test('applies to i-ending masculine nouns in dual', () => {
      const result = sutra1422('मुनि', { count: 'dual', case: 'nominative' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('मुनी');
      expect(result.case).toBe('nominative_dual');
    });

    test('applies to consonant-ending nouns in dual', () => {
      const result = sutra1422('राज्', { count: 'dual', case: 'nominative' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('राजौ');
      expect(result.case).toBe('nominative_dual');
    });

    test('applies to neuter nouns in dual', () => {
      const result = sutra1422('फल', { count: 'dual', case: 'nominative' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('फले');
      expect(result.case).toBe('nominative_dual');
    });

    test('applies to neuter nouns in singular', () => {
      const result = sutra1422('फल', { count: 'singular', case: 'nominative' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('फलम्');
      expect(result.case).toBe('nominative_singular');
    });
  });

  describe('Natural pairs and contextual duality', () => {
    test('recognizes natural pairs requiring dual', () => {
      const result = sutra1422('नेत्र', { 
        semantic_context: 'pair_of_eyes',
        natural_dual: true,
        case: 'instrumental'
      });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('नेत्राभ्याम्');
      expect(result.natural_pair).toBe(true);
    });

    test('handles hands as natural dual', () => {
      const result = sutra1422('हस्त', { 
        context: 'both_hands',
        count: 'dual',
        case: 'instrumental'
      });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('हस्ताभ्याम्');
    });

    test('processes feet as natural dual', () => {
      const result = sutra1422('पाद', { 
        natural_dual: true,
        case: 'locative'
      });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('पादयोः');
    });
  });

  describe('Numerical context validation', () => {
    test('detects explicit dual indicator द्वि', () => {
      const result = sutra1422('अश्व', { 
        numerical_indicator: 'द्वि',
        context: 'द्वौ अश्वौ',
        case: 'nominative'
      });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('अश्वौ');
      expect(result.count).toBe('dual');
    });

    test('detects explicit singular indicator एक', () => {
      const result = sutra1422('पुत्र', { 
        numerical_indicator: 'एक',
        context: 'एकः पुत्रः',
        case: 'nominative'
      });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('पुत्रः');
      expect(result.count).toBe('singular');
    });

    test('handles contextual duality without explicit markers', () => {
      const result = sutra1422('मित्र', { 
        semantic_context: 'two_friends_conversation',
        count: 'dual',
        case: 'genitive'
      });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('मित्रयोः');
    });
  });

  describe('Edge cases and special forms', () => {
    test('handles irregular dual formations', () => {
      const result = sutra1422('अक्षि', { count: 'dual', case: 'nominative' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('अक्षिणी');
      expect(result.irregular).toBe(true);
    });

    test('handles suppletive dual forms', () => {
      const result = sutra1422('युष्मद्', { count: 'dual', case: 'nominative' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('युवाम्');
      expect(result.suppletive).toBe(true);
    });

    test('handles suppletive singular forms', () => {
      const result = sutra1422('अस्मद्', { count: 'singular', case: 'nominative' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('अहम्');
      expect(result.suppletive).toBe(true);
    });

    test('validates number-case requirements', () => {
      const result = sutra1422('देव', { count: 'dual' }); // no case specified
      expect(result.applies).toBe(false);
      expect(result.error).toBe('case_required_for_number_application');
    });
  });

  describe('Integration with complete number system', () => {
    test('distinguishes dual from plural', () => {
      const dualResult = sutra1422('ब्राह्मण', { count: 'dual', case: 'nominative' });
      expect(dualResult.form).toBe('ब्राह्मणौ');
      expect(dualResult.count).toBe('dual');
      expect(dualResult.not_plural).toBe(true);
    });

    test('distinguishes singular from dual/plural', () => {
      const singularResult = sutra1422('गुरु', { count: 'singular', case: 'nominative' });
      expect(singularResult.form).toBe('गुरुः');
      expect(singularResult.count).toBe('singular');
      expect(singularResult.not_plural).toBe(true);
    });

    test('integrates with case system properly', () => {
      const result = sutra1422('शिष्य', { count: 'dual', case: 'dative' });
      expect(result.applies).toBe(true);
      expect(result.case_rule_applied).toBeDefined();
      expect(result.form).toBe('शिष्याभ्याम्');
    });
  });

  describe('Error handling', () => {
    test('handles empty word input', () => {
      const result = sutra1422('', { count: 'dual', case: 'nominative' });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('empty_word_input');
    });

    test('handles invalid count specification', () => {
      const result = sutra1422('देव', { count: 'triple', case: 'nominative' });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_count_specification');
    });

    test('handles invalid case specification', () => {
      const result = sutra1422('देव', { count: 'dual', case: 'invalid_case' });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_case_specification');
    });

    test('handles malformed Sanskrit input', () => {
      const result = sutra1422('xyz123', { count: 'dual', case: 'nominative' });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_sanskrit_word');
    });

    test('handles missing context object', () => {
      const result = sutra1422('देव');
      expect(result.applies).toBe(false);
      expect(result.error).toBe('context_required');
    });

    test('rejects plural context for this sutra', () => {
      const result = sutra1422('देव', { count: 'plural', case: 'nominative' });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('plural_not_handled_by_this_sutra');
    });
  });

  describe('Script conversion consistency', () => {
    test('maintains script consistency in dual output', () => {
      const devanagariResult = sutra1422('देव', { count: 'dual', case: 'nominative' });
      const iastResult = sutra1422('deva', { count: 'dual', case: 'nominative', script: 'iast' });
      
      expect(devanagariResult.script).toBe('Devanagari');
      expect(iastResult.script).toBe('IAST');
    });

    test('converts between scripts when requested', () => {
      const result = sutra1422('देव', { 
        count: 'singular', 
        case: 'accusative',
        output_script: 'iast'
      });
      expect(result.form).toBe('devam');
      expect(result.output_script).toBe('IAST');
    });
  });

  describe('Performance and validation', () => {
    test('returns confidence scores', () => {
      const result = sutra1422('देव', { count: 'dual', case: 'nominative' });
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(typeof result.confidence).toBe('number');
    });

    test('provides grammatical analysis', () => {
      const result = sutra1422('गृह', { count: 'dual', case: 'instrumental' });
      expect(result.analysis).toBeDefined();
      expect(result.analysis.stem).toBe('गृह');
      expect(result.analysis.ending).toBe('आभ्याम्');
      expect(result.analysis.number).toBe('dual');
    });

    test('handles complex morphological analysis', () => {
      const result = sutra1422('सर्व', { count: 'singular', case: 'genitive' });
      expect(result.applies).toBe(true);
      expect(result.morphology).toBeDefined();
      expect(result.morphology.type).toBe('pronoun');
    });
  });
});

// Additional tests for the applyDualSingularRule alias function
describe('applyDualSingularRule function alias', () => {
  test('applyDualSingularRule works as alias to sutra1422', () => {
    const sutraResult = sutra1422('देव', { count: 'dual', case: 'nominative' });
    const aliasResult = applyDualSingularRule('देव', { count: 'dual', case: 'nominative' });
    
    expect(aliasResult).toEqual(sutraResult);
  });

  test('maintains consistent API across both functions', () => {
    const word = 'गुरु';
    const context = { count: 'singular', case: 'instrumental' };
    
    const result1 = sutra1422(word, context);
    const result2 = applyDualSingularRule(word, context);
    
    expect(result1.applies).toBe(result2.applies);
    expect(result1.form).toBe(result2.form);
    expect(result1.case).toBe(result2.case);
  });

  test('handles both dual and singular through alias', () => {
    const dualResult = applyDualSingularRule('मित्र', { count: 'dual', case: 'vocative' });
    const singularResult = applyDualSingularRule('मित्र', { count: 'singular', case: 'vocative' });
    
    expect(dualResult.form).toBe('मित्रौ');
    expect(singularResult.form).toBe('मित्र');
    expect(dualResult.count).toBe('dual');
    expect(singularResult.count).toBe('singular');
  });
});
