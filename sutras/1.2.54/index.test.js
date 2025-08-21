import { sutra1254, applySutra1_2_54, analyzeLubhElision, assessFormCurrency } from './index.js';

describe('Sutra 1.2.54: लुब्योगाप्रख्यानात्', () => {
  
  describe('Core Implementation: sutra1254', () => {
    
    test('applies to items with explicit lubh-elision flag', () => {
      const lubhItem = {
        text: 'प्राचीनरूप',
        lubhElision: true,
        isNonCurrent: true
      };
      
      const result = sutra1254(lubhItem);
      
      expect(result.applies).toBe(true);
      expect(result.nonElidable).toBe(true);
      expect(result.logicalPresence).toBe(true);
      expect(result.phoneticPresence).toBe(false); // Non-current forms lose phonetic presence
      expect(result.analysis.lubhElisionAnalysis.hasLubhOperation).toBe(true);
      expect(result.analysis.lubhElisionAnalysis.lubhOperationType).toBe('explicit_lubh_flag');
      expect(result.analysis.nonCurrencyAnalysis.isNonCurrent).toBe(true);
    });

    test('applies to items with context lubh operation', () => {
      const item = { text: 'वैदिकरूप' };
      const context = { 
        lubhOperation: 'lubh_complete',
        currency: 'archaic'
      };
      
      const result = sutra1254(item, context);
      
      expect(result.applies).toBe(true);
      expect(result.nonElidable).toBe(true);
      expect(result.analysis.lubhElisionAnalysis.lubhOperationType).toBe('context_lubh_operation');
      expect(result.analysis.nonCurrencyAnalysis.currencyDegree).toBe('archaic');
    });

    test('applies to items with lubh elision type', () => {
      const item = { text: 'लुप्तप्रत्यय' };
      const context = { 
        elisionType: 'lubh_contextual',
        temporalContext: 'vedic'
      };
      
      const result = sutra1254(item, context);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.lubhElisionAnalysis.lubhOperationType).toBe('elision_type_lubh');
      expect(result.analysis.nonCurrencyAnalysis.temporalContext).toBe('vedic');
    });

    test('recognizes string-based lubh patterns', () => {
      const lubhString = 'लुभ्_प्रक्रिया_अप्रचलित';
      
      const result = sutra1254(lubhString);
      
      expect(result.applies).toBe(true);
      expect(result.nonElidable).toBe(true);
      expect(result.analysis.lubhElisionAnalysis.lubhOperationType).toBe('string_pattern_lubh');
    });

    test('recognizes lubh semantic properties', () => {
      const item = {
        text: 'प्राचीनधातु',
        isLubhElision: true,
        isArchaicDerivation: true
      };
      
      const result = sutra1254(item);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.lubhElisionAnalysis.lubhOperationType).toBe('semantic_lubh_properties');
      expect(result.analysis.nonCurrencyAnalysis.isNonCurrent).toBe(true);
    });

    test('handles explicit non-currency flag', () => {
      const item = {
        text: 'अप्रचलितरूप',
        lubhElision: true,
        isNonCurrent: true
      };
      
      const result = sutra1254(item);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.nonCurrencyAnalysis.currencyDegree).toBe('explicit_non_current');
    });

    test('handles usage restrictions for non-currency', () => {
      const item = {
        text: 'शास्त्रीयपद',
        lubhElision: true,
        usageRestrictions: ['archaic', 'vedic-only']
      };
      
      const result = sutra1254(item);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.nonCurrencyAnalysis.currencyDegree).toBe('usage_restricted');
      expect(result.analysis.nonCurrencyAnalysis.usageRestrictions).toContain('archaic');
    });

    test('applies default lubh non-currency when lubh operation present', () => {
      const item = {
        text: 'रूपम्',
        lubhElision: true
        // No explicit non-currency flag
      };
      
      const result = sutra1254(item);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.nonCurrencyAnalysis.currencyDegree).toBe('lubh_operation_default');
      expect(result.analysis.nonCurrencyAnalysis.currencyEvidence).toContain('lubh_operations_typically_produce_non_current_forms');
    });

    test('does not apply to items without lubh operation', () => {
      const normalItem = { text: 'सामान्यपद', meaning: 'common word' };
      
      const result = sutra1254(normalItem);
      
      expect(result.applies).toBe(false);
      expect(result.nonElidable).toBe(false);
      expect(result.analysis.lubhElisionAnalysis.hasLubhOperation).toBe(false);
    });

    test('does not apply when forms remain current', () => {
      const item = {
        text: 'आधुनिकरूप',
        lubhElision: true,
        isNonCurrent: false
      };
      const context = { currency: 'current' };
      
      const result = sutra1254(item, context);
      
      expect(result.applies).toBe(false);
      expect(result.analysis.ashishyaAnalysis.nonElisionJustification).toBe('forms_remain_current');
    });
  });

  describe('Non-currency Assessment', () => {
    
    test('recognizes vedic-only forms as non-current', () => {
      const item = 'वेदिकरूप';
      const context = { temporalContext: 'vedic' };
      
      const result = sutra1254(item, context);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.nonCurrencyAnalysis.isNonCurrent).toBe(true);
      expect(result.analysis.nonCurrencyAnalysis.currencyDegree).toBe('temporal_restriction');
    });

    test('recognizes classical-obsolete forms', () => {
      const item = 'प्राचीनशब्द';
      const context = { temporalContext: 'classical-obsolete' };
      
      const result = sutra1254(item, context);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.nonCurrencyAnalysis.temporalContext).toBe('classical-obsolete');
    });

    test('analyzes currency patterns in strings', () => {
      const archaicPattern = 'वेदमन्त्र';
      
      const result = sutra1254(archaicPattern);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.nonCurrencyAnalysis.isNonCurrent).toBe(true);
    });

    test('handles literary-only restrictions', () => {
      const item = {
        text: 'काव्यपद',
        lubhElision: true,
        usageRestrictions: ['literary-only']
      };
      
      const result = sutra1254(item);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.nonCurrencyAnalysis.usageRestrictions).toContain('literary-only');
    });

    test('handles technical-only restrictions', () => {
      const item = {
        text: 'शास्त्रीयपरिभाषा',
        lubhElision: true,
        usageRestrictions: ['technical-only']
      };
      
      const result = sutra1254(item);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.nonCurrencyAnalysis.isNonCurrent).toBe(true);
    });
  });

  describe('Phonetic Presence Logic', () => {
    
    test('removes phonetic presence for completely non-current forms', () => {
      const item = {
        text: 'पूर्णलुप्त',
        lubhElision: true,
        isNonCurrent: true
      };
      const context = { currency: 'obsolete' };
      
      const result = sutra1254(item, context);
      
      expect(result.phoneticPresence).toBe(false);
      expect(result.logicalPresence).toBe(true);
    });

    test('allows archaic phonetics when context permits', () => {
      const item = {
        text: 'मध्यमअप्रचलित',
        lubhElision: true
      };
      const context = { 
        currency: 'moderate',
        allowArchaicPhonetics: true
      };
      
      const result = sutra1254(item, context);
      
      expect(result.phoneticPresence).toBe(true);
      expect(result.logicalPresence).toBe(true);
    });

    test('denies archaic phonetics by default for moderate non-currency', () => {
      const item = {
        text: 'मध्यमअप्रचलित',
        lubhElision: true
      };
      
      const result = sutra1254(item);
      
      // Should be moderate non-currency with default lubh operation
      expect(result.phoneticPresence).toBe(false);
      expect(result.logicalPresence).toBe(true);
    });
  });

  describe('Confidence Assessment', () => {
    
    test('provides high confidence for explicit flags', () => {
      const item = {
        text: 'स्पष्टलुभ्',
        lubhElision: true,
        isNonCurrent: true
      };
      
      const result = sutra1254(item);
      
      expect(result.confidence.overall).toBeGreaterThan(0.8);
      expect(result.confidence.lubhDetection).toBe(0.95);
      expect(result.confidence.currencyAssessment).toBe(0.95);
      expect(result.confidence.factors).toContain('explicit_lubh_flag_high_confidence');
      expect(result.confidence.factors).toContain('explicit_non_currency_high_confidence');
    });

    test('provides moderate confidence for pattern recognition', () => {
      const item = 'लुभ्_पुरातन_रूप';
      
      const result = sutra1254(item);
      
      expect(result.confidence.overall).toBeGreaterThan(0.5);
      expect(result.confidence.overall).toBeLessThan(0.8);
      expect(result.confidence.factors).toContain('string_pattern_lubh_moderate_confidence');
    });

    test('provides low confidence when no lubh operation detected', () => {
      const item = { text: 'सामान्यम्' };
      
      const result = sutra1254(item);
      
      expect(result.confidence.overall).toBeLessThan(0.4);
      expect(result.confidence.factors).toContain('no_lubh_operation_detected');
    });
  });

  describe('Error Handling', () => {
    
    test('handles null input gracefully', () => {
      const result = sutra1254(null);
      
      expect(result.applies).toBe(false);
      expect(result.error).toBe('null_or_undefined_item');
      expect(result.analysis.inputValidation.isValid).toBe(false);
    });

    test('handles undefined input gracefully', () => {
      const result = sutra1254(undefined);
      
      expect(result.applies).toBe(false);
      expect(result.error).toBe('null_or_undefined_item');
    });

    test('handles invalid context type', () => {
      const result = sutra1254('test', 'invalid_context');
      
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_context_type');
    });

    test('handles empty objects gracefully', () => {
      const result = sutra1254({});
      
      expect(result.applies).toBe(false);
      expect(result.nonElidable).toBe(false);
      expect(result.analysis.inputValidation.isValid).toBe(true);
    });
  });

  describe('Legacy Compatibility: applySutra1_2_54', () => {
    
    test('maintains legacy interface', () => {
      const item = {
        text: 'लुभ्रूप',
        lubhElision: true,
        isNonCurrent: true
      };
      
      const result = applySutra1_2_54(item);
      
      expect(result.sutra).toBe('1.2.54');
      expect(result.applied).toBe(true);
      expect(result.nonElidable).toBe(true);
      expect(result.logicalPresence).toBe(true);
      expect(result.phoneticPresence).toBe(false);
      expect(result.analysis).toBeDefined();
      expect(result.confidence).toBeDefined();
    });

    test('integrates with utility classification', () => {
      const item = { text: 'प्रत्यय', lubhElision: true };
      
      const result = applySutra1_2_54(item);
      
      expect(result.sutrasApplied).toBeDefined();
      expect(result.explanation).toBeDefined();
      expect(result.reasons).toBeDefined();
    });

    test('handles legacy context merging', () => {
      const item = { text: 'लुभ्पद', lubhElision: true };
      const context = { testMode: true };
      
      const result = applySutra1_2_54(item, context);
      
      expect(result.applied).toBe(true);
      expect(result.analysis.inputAnalysis.contextProvided).toBe(true);
    });

    test('original legacy test: adds lup noncurrency reason', () => {
      const r = applySutra1_2_54({});
      expect(r.reasons.some(x=>x.includes('lup-elision'))).toBe(true);
    });
  });

  describe('Analysis Functions', () => {
    
    test('analyzeLubhElision provides detailed analysis', () => {
      const item = {
        text: 'लुभ्विकार',
        lubhElision: true,
        isNonCurrent: true
      };
      
      const analysis = analyzeLubhElision(item);
      
      expect(analysis.has_lubh_operation).toBe(true);
      expect(analysis.lubh_operation_type).toBe('explicit_lubh_flag');
      expect(analysis.currency_status).toBe('explicit_non_current');
      expect(analysis.ashishya_status).toBe(true);
      expect(analysis.analysis).toBeDefined();
      expect(analysis.confidence).toBeDefined();
    });

    test('assessFormCurrency works independently', () => {
      const item = {
        text: 'प्राचीनम्',
        usageRestrictions: ['archaic', 'vedic-only']
      };
      
      const assessment = assessFormCurrency(item);
      
      expect(assessment.is_non_current).toBe(true);
      expect(assessment.currency_degree).toBe('usage_restricted');
      expect(assessment.usage_restrictions).toContain('archaic');
      expect(assessment.evidence).toBeDefined();
    });
  });

  describe('Multi-script Support', () => {
    
    test('handles IAST lubh patterns', () => {
      const item = 'lubh_operation_archaic';
      
      const result = sutra1254(item);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.inputAnalysis.script).toBe('iast');
    });

    test('handles Devanagari lubh patterns', () => {
      const item = 'लुभ्_प्रक्रिया';
      
      const result = sutra1254(item);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.lubhElisionAnalysis.hasLubhOperation).toBe(true);
    });

    test('processes mixed script contexts', () => {
      const item = { text: 'लुभ्', romanization: 'lubh' };
      const context = { script: 'mixed' };
      
      const result = sutra1254(item, context);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.inputAnalysis.contextProvided).toBe(true);
    });
  });

  describe('Complex Scenarios', () => {
    
    test('handles multiple non-currency indicators', () => {
      const item = {
        text: 'बहुविध_अप्रचलित',
        lubhElision: true,
        isNonCurrent: true,
        usageRestrictions: ['archaic', 'literary-only', 'technical-only'],
        temporalContext: 'vedic'
      };
      
      const result = sutra1254(item);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.nonCurrencyAnalysis.nonCurrencyIndicators.length).toBeGreaterThan(1);
    });

    test('handles lubh operation with current forms (edge case)', () => {
      const item = {
        text: 'आधुनिक_लुभ्',
        lubhElision: true,
        isNonCurrent: false
      };
      const context = { currency: 'current' };
      
      const result = sutra1254(item, context);
      
      expect(result.applies).toBe(false); // Should not apply when forms remain current
      expect(result.analysis.ashishyaAnalysis.nonElisionJustification).toBe('forms_remain_current');
    });

    test('handles elisionType with lubh patterns', () => {
      const item = { text: 'विशेषरूप' };
      const context = { 
        elisionType: 'लुभ्_सापेक्ष',
        currency: 'archaic'
      };
      
      const result = sutra1254(item, context);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.lubhElisionAnalysis.lubhOperationType).toBe('elision_type_lubh');
    });

    test('handles semantic properties with currency assessment', () => {
      const item = {
        text: 'गुण_विकार',
        isLubhElision: true,
        isTemporallyLimited: true,
        elisionType: 'lubh_temporal'
      };
      
      const result = sutra1254(item);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.lubhElisionAnalysis.lubhOperationType).toBe('semantic_lubh_properties');
      expect(result.analysis.nonCurrencyAnalysis.isNonCurrent).toBe(true);
    });
  });

  describe('Teaching Economy Principle', () => {
    
    test('applies teaching economy for non-current lubh forms', () => {
      const item = {
        text: 'शिक्षण_अर्थव्यवस्था',
        lubhElision: true,
        isNonCurrent: true
      };
      
      const result = sutra1254(item);
      
      expect(result.applies).toBe(true);
      expect(result.analysis.ashishyaAnalysis.teachingEconomy).toBe(true);
      expect(result.analysis.ashishyaAnalysis.currencyBasedReasoning).toBe('forms_from_lubh_elision_become_non_current_need_not_be_taught');
      expect(result.reasons).toContain('teaching-economy-principle');
    });

    test('includes comprehensive reasoning in results', () => {
      const item = {
        text: 'विस्तृत_तर्क',
        lubhElision: true,
        isNonCurrent: true
      };
      const context = { currency: 'archaic' };
      
      const result = sutra1254(item, context);
      
      expect(result.reasons).toContain('lubh-elision-non-currency');
      expect(result.reasons).toContain('teaching-economy-principle');
      expect(result.reasons).toContain('currency-degree-archaic');
      expect(result.reasons).toContain('lubh-operation-explicit_lubh_flag');
    });
  });
});
