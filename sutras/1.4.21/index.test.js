/**
 * Tests for Sutra 1.4.21: बहुषु बहुवचनम् (bahuṣu bahuvacanama)
 * Tests the fundamental rule for plural case affixes when expressing plurality
 */

import { sutra1421, applyPluralRule } from './index.js';

describe('Sutra 1.4.21: बहुषु बहुवचनम् (bahuṣu bahuvacanama)', () => {
  
  describe('Basic plural application', () => {
    test('applies plural case affix for multiple entities', () => {
      const result = sutra1421('देव', { count: 'multiple', case: 'nominative' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('देवाः');
      expect(result.case).toBe('nominative_plural');
      expect(result.rule).toBe('1.4.21');
      expect(result.confidence).toBeGreaterThan(0.9);
    });

    test('applies plural accusative case', () => {
      const result = sutra1421('देव', { count: 'multiple', case: 'accusative' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('देवान्');
      expect(result.case).toBe('accusative_plural');
    });

    test('applies plural instrumental case', () => {
      const result = sutra1421('देव', { count: 'multiple', case: 'instrumental' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('देवैः');
      expect(result.case).toBe('instrumental_plural');
    });

    test('applies plural genitive case', () => {
      const result = sutra1421('देव', { count: 'multiple', case: 'genitive' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('देवानाम्');
      expect(result.case).toBe('genitive_plural');
    });

    test('applies plural locative case', () => {
      const result = sutra1421('देव', { count: 'multiple', case: 'locative' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('देवेषु');
      expect(result.case).toBe('locative_plural');
    });
  });

  describe('IAST script support', () => {
    test('processes IAST input with plural nominative', () => {
      const result = sutra1421('deva', { count: 'multiple', case: 'nominative', script: 'iast' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('devāḥ');
      expect(result.script).toBe('IAST');
    });

    test('processes IAST input with plural accusative', () => {
      const result = sutra1421('deva', { count: 'multiple', case: 'accusative', script: 'iast' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('devān');
    });

    test('processes IAST input with plural locative', () => {
      const result = sutra1421('gṛha', { count: 'multiple', case: 'locative', script: 'iast' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('gṛheṣu');
    });
  });

  describe('Different noun classes', () => {
    test('applies to ā-ending feminine nouns', () => {
      const result = sutra1421('लता', { count: 'multiple', case: 'nominative' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('लताः');
      expect(result.case).toBe('nominative_plural');
    });

    test('applies to i-ending masculine nouns', () => {
      const result = sutra1421('मुनि', { count: 'multiple', case: 'nominative' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('मुनयः');
      expect(result.case).toBe('nominative_plural');
    });

    test('applies to consonant-ending nouns', () => {
      const result = sutra1421('राज्', { count: 'multiple', case: 'nominative' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('राजः');
      expect(result.case).toBe('nominative_plural');
    });

    test('applies to neuter nouns', () => {
      const result = sutra1421('फल', { count: 'multiple', case: 'nominative' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('फलानि');
      expect(result.case).toBe('nominative_plural');
    });
  });

  describe('Context validation', () => {
    test('does not apply for singular context', () => {
      const result = sutra1421('देव', { count: 'single', case: 'nominative' });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('singular_context_no_plural_required');
    });

    test('does not apply for dual context', () => {
      const result = sutra1421('देव', { count: 'dual', case: 'nominative' });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('dual_context_uses_dual_endings');
    });

    test('detects semantic plurality indicators', () => {
      const result = sutra1421('गृह', { 
        semantic_context: 'many_houses',
        plurality_indicators: ['बहवः', 'अनेके'],
        case: 'nominative'
      });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('गृहाणि');
    });

    test('handles contextual number determination', () => {
      const result = sutra1421('पुत्र', { 
        context: 'multiple_sons_mentioned',
        count: 'inferred_multiple',
        case: 'accusative'
      });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('पुत्रान्');
    });
  });

  describe('Edge cases and special forms', () => {
    test('handles irregular plural formations', () => {
      const result = sutra1421('पुंस्', { count: 'multiple', case: 'nominative' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('पुंसः');
      expect(result.irregular).toBe(true);
    });

    test('handles suppletive plural forms', () => {
      const result = sutra1421('अस्मद्', { count: 'multiple', case: 'nominative' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('वयम्');
      expect(result.suppletive).toBe(true);
    });

    test('validates case requirements', () => {
      const result = sutra1421('देव', { count: 'multiple' }); // no case specified
      expect(result.applies).toBe(false);
      expect(result.error).toBe('case_required_for_plural_application');
    });
  });

  describe('Integration with case system', () => {
    test('integrates with nominative case rules', () => {
      const result = sutra1421('ब्राह्मण', { count: 'multiple', case: 'nominative' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('ब्राह्मणाः');
      expect(result.case_rule_applied).toBeDefined();
    });

    test('integrates with oblique case formations', () => {
      const result = sutra1421('गुरु', { count: 'multiple', case: 'dative' });
      expect(result.applies).toBe(true);
      expect(result.form).toBe('गुरुभ्यः');
      expect(result.case).toBe('dative_plural');
    });
  });

  describe('Error handling', () => {
    test('handles empty word input', () => {
      const result = sutra1421('', { count: 'multiple', case: 'nominative' });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('empty_word_input');
    });

    test('handles invalid case specification', () => {
      const result = sutra1421('देव', { count: 'multiple', case: 'invalid_case' });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_case_specification');
    });

    test('handles malformed Sanskrit input', () => {
      const result = sutra1421('xyz123', { count: 'multiple', case: 'nominative' });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_sanskrit_word');
    });

    test('handles missing context object', () => {
      const result = sutra1421('देव');
      expect(result.applies).toBe(false);
      expect(result.error).toBe('context_required');
    });
  });

  describe('Script conversion consistency', () => {
    test('maintains script consistency in output', () => {
      const devanagariResult = sutra1421('देव', { count: 'multiple', case: 'nominative' });
      const iastResult = sutra1421('deva', { count: 'multiple', case: 'nominative', script: 'iast' });
      
      expect(devanagariResult.script).toBe('Devanagari');
      expect(iastResult.script).toBe('IAST');
    });

    test('converts between scripts when requested', () => {
      const result = sutra1421('देव', { 
        count: 'multiple', 
        case: 'nominative',
        output_script: 'iast'
      });
      expect(result.form).toBe('devāḥ');
      expect(result.output_script).toBe('IAST');
    });
  });

  describe('Performance and validation', () => {
    test('returns confidence scores', () => {
      const result = sutra1421('देव', { count: 'multiple', case: 'nominative' });
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(typeof result.confidence).toBe('number');
    });

    test('provides grammatical analysis', () => {
      const result = sutra1421('गृह', { count: 'multiple', case: 'locative' });
      expect(result.analysis).toBeDefined();
      expect(result.analysis.stem).toBe('गृह');
      expect(result.analysis.ending).toBe('एषु');
      expect(result.analysis.number).toBe('plural');
    });

    test('handles complex morphological analysis', () => {
      const result = sutra1421('सर्व', { count: 'multiple', case: 'instrumental' });
      expect(result.applies).toBe(true);
      expect(result.morphology).toBeDefined();
      expect(result.morphology.type).toBe('pronoun');
    });
  });
});

// Additional tests for the applyPluralRule alias function
describe('applyPluralRule function alias', () => {
  test('applyPluralRule works as alias to sutra1421', () => {
    const sutraResult = sutra1421('देव', { count: 'multiple', case: 'nominative' });
    const aliasResult = applyPluralRule('देव', { count: 'multiple', case: 'nominative' });
    
    expect(aliasResult).toEqual(sutraResult);
  });

  test('maintains consistent API across both functions', () => {
    const word = 'गुरु';
    const context = { count: 'multiple', case: 'dative' };
    
    const result1 = sutra1421(word, context);
    const result2 = applyPluralRule(word, context);
    
    expect(result1.applies).toBe(result2.applies);
    expect(result1.form).toBe(result2.form);
    expect(result1.case).toBe(result2.case);
  });
});
