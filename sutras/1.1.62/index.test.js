/**
 * Comprehensive test suite for Sutra 1.1.62: प्रत्ययलोपे प्रत्ययलक्षणम् (pratyayalope pratyayalakṣaṇam)
 *
 * Tests cover:
 * 1. Basic pratyayalakshanam application
 * 2. Comprehensive affix property preservation analysis
 * 3. Morphological, phonetic, and grammatical preservation
 * 4. Traditional commentary integration
 * 5. Edge cases and error handling
 */

import { applyPratyayalakshanam, analyzeAffixPropertyPreservation } from './index.js';

describe('Sutra 1.1.62: प्रत्ययलोपे प्रत्ययलक्षणम् (pratyayalope pratyayalakṣaṇam)', () => {
  describe('applyPratyayalakshanam() - Basic Functionality', () => {
    it('should augment the base with the properties of the elided affix', () => {
      const base = {
        form: 'agni',
        context: {}
      };

      const elidedAffix = {
        form: 's',
        properties: {
          marker: 'sUP',
          case: 'nominative',
          number: 'singular'
        }
      };

      const result = applyPratyayalakshanam(base, elidedAffix);
      
      expect(result.form).toBe('agni');
      expect(result.context.elidedAffixProperties).toEqual({
        marker: 'sUP',
        case: 'nominative',
        number: 'singular'
      });
      expect(result.context.pratyayalakshanam).toBe(true);
    });

    it('should demonstrate retaining a "pit" marker for guna', () => {
      const base = {
        form: 'go',
        context: {}
      };

      const elidedAffix = {
        form: 'e',
        properties: {
          marker: 'pit'
        }
      };

      const result = applyPratyayalakshanam(base, elidedAffix);
      expect(result.context.elidedAffixProperties.marker).toBe('pit');
    });

    it('should merge properties without overwriting existing base context', () => {
      const base = {
        form: 'rājan',
        context: {
          isAnga: true
        }
      };

      const elidedAffix = {
        form: 's',
        properties: {
          case: 'nominative'
        }
      };

      const result = applyPratyayalakshanam(base, elidedAffix);
      
      expect(result.context.isAnga).toBe(true);
      expect(result.context.elidedAffixProperties.case).toBe('nominative');
      expect(result.context.pratyayalakshanam).toBe(true);
    });

    it('should handle empty objects', () => {
      const base = {};
      const elidedAffix = {};
      const result = applyPratyayalakshanam(base, elidedAffix);
      
      expect(result.context.elidedAffixProperties).toEqual({});
      expect(result.context.pratyayalakshanam).toBe(true);
    });
  });

  describe('applyPratyayalakshanam() - Edge Cases', () => {
    it('should return the base if elidedAffix is null or undefined', () => {
      const base = { form: 'test', context: {} };
      expect(applyPratyayalakshanam(base, null)).toBe(base);
      expect(applyPratyayalakshanam(base, undefined)).toBe(base);
    });

    it('should return the base if base is null or undefined', () => {
      const elidedAffix = { properties: { marker: 'test' } };
      expect(applyPratyayalakshanam(null, elidedAffix)).toBe(null);
      expect(applyPratyayalakshanam(undefined, elidedAffix)).toBe(undefined);
    });

    it('should handle non-object inputs gracefully', () => {
      expect(applyPratyayalakshanam('string', {})).toBe('string');
      expect(applyPratyayalakshanam({}, 'string')).toEqual({});
    });
  });

  describe('analyzeAffixPropertyPreservation() - Core Functionality', () => {
    it('should analyze preservation with elided affix context', () => {
      const context = {
        base: { form: 'go' },
        elidedAffix: {
          form: 'e',
          properties: {
            pit: true,
            guna_trigger: true
          }
        }
      };

      const result = analyzeAffixPropertyPreservation(context);
      
      expect(result.isValid).toBe(true);
      expect(result.sutra).toBe('1.1.62');
      expect(result.rule).toBe('प्रत्ययलोपे प्रत्ययलक्षणम् (pratyayalope pratyayalakṣaṇam)');
      expect(result.preservationAnalysis.hasElidedAffix).toBe(true);
    });

    it('should handle context without elided affix', () => {
      const context = {
        base: { form: 'go' }
      };

      const result = analyzeAffixPropertyPreservation(context);
      
      expect(result.isValid).toBe(true);
      expect(result.preservationAnalysis.hasElidedAffix).toBe(false);
      expect(result.preservationAnalysis.preservedProperties).toEqual([]);
    });

    it('should provide sutra reference and rule', () => {
      const context = { base: { form: 'test' } };
      const result = analyzeAffixPropertyPreservation(context);
      
      expect(result.sutra).toBe('1.1.62');
      expect(result.rule).toContain('प्रत्ययलोपे प्रत्ययलक्षणम्');
    });
  });

  describe('analyzeAffixPropertyPreservation() - Property Categories', () => {
    it('should identify phonetic property preservation', () => {
      const context = {
        base: { form: 'go' },
        elidedAffix: {
          properties: {
            pit: true,
            kit: false,
            influences: ['sound_effects', 'guna_triggering']
          }
        }
      };

      const result = analyzeAffixPropertyPreservation(context);
      
      expect(result.preservationAnalysis.propertyCategories).toContain('phonetic');
      expect(result.preservationAnalysis.preservedProperties.length).toBeGreaterThan(0);
    });

    it('should identify morphological property preservation', () => {
      const context = {
        base: { form: 'rāman' },
        elidedAffix: {
          properties: {
            case_markers: 'nominative',
            number_markers: 'singular',
            influences: ['grammatical_function']
          }
        }
      };

      const result = analyzeAffixPropertyPreservation(context);
      
      expect(result.preservationAnalysis.propertyCategories).toContain('morphological');
    });

    it('should identify semantic property preservation', () => {
      const context = {
        base: { form: 'kṛ' },
        elidedAffix: {
          properties: {
            meaning_modifiers: 'agent',
            derivational_markers: 'kṛt',
            influences: ['semantic_content']
          }
        }
      };

      const result = analyzeAffixPropertyPreservation(context);
      
      expect(result.preservationAnalysis.propertyCategories).toContain('semantic');
    });
  });

  describe('analyzeAffixPropertyPreservation() - Morphological Analysis', () => {
    it('should analyze base form correctly', () => {
      const context = {
        base: { form: 'agni' },
        elidedAffix: { properties: { case: 'nominative' } }
      };

      const result = analyzeAffixPropertyPreservation(context);
      
      expect(result.morphologicalAnalysis.baseForm).toBe('agni');
      expect(result.morphologicalAnalysis.affixProperties).toEqual({ case: 'nominative' });
    });

    it('should analyze derivational effects', () => {
      const context = {
        base: { form: 'kṛ' },
        elidedAffix: {
          properties: {
            derivational: true,
            krt: true
          }
        }
      };

      const result = analyzeAffixPropertyPreservation(context);
      
      expect(result.morphologicalAnalysis.derivationalEffects).toContain('derivational_meaning_preserved');
      expect(result.morphologicalAnalysis.derivationalEffects).toContain('krt_derivation_active');
    });

    it('should analyze inflectional effects', () => {
      const context = {
        base: { form: 'agni' },
        elidedAffix: {
          properties: {
            case: 'nominative',
            number: 'singular',
            person: 'third'
          }
        }
      };

      const result = analyzeAffixPropertyPreservation(context);
      
      expect(result.morphologicalAnalysis.inflectionalEffects).toContain('case_function_preserved');
      expect(result.morphologicalAnalysis.inflectionalEffects).toContain('number_agreement_maintained');
      expect(result.morphologicalAnalysis.inflectionalEffects).toContain('person_agreement_active');
    });
  });

  describe('analyzeAffixPropertyPreservation() - Phonetic Analysis', () => {
    it('should analyze sound effects', () => {
      const context = {
        base: { form: 'go' },
        elidedAffix: {
          properties: {
            pit: true,
            kit: false,
            ṅit: true
          }
        }
      };

      const result = analyzeAffixPropertyPreservation(context);
      
      expect(result.phoneticAnalysis.soundEffects).toContain('guna_trigger_preserved');
      expect(result.phoneticAnalysis.soundEffects).toContain('guna_blocker_active');
      expect(result.phoneticAnalysis.soundEffects).toContain('nasal_effects_maintained');
    });

    it('should analyze euphonic influences', () => {
      const context = {
        base: { form: 'agni' },
        elidedAffix: {
          properties: {
            euphonic: true,
            sandhi: true
          }
        }
      };

      const result = analyzeAffixPropertyPreservation(context);
      
      expect(result.phoneticAnalysis.euphonicInfluences).toContain('euphonic_changes_preserved');
      expect(result.phoneticAnalysis.euphonicInfluences).toContain('sandhi_effects_active');
    });

    it('should analyze guna/vrddhi triggers', () => {
      const context = {
        base: { form: 'go' },
        elidedAffix: {
          properties: {
            guna_trigger: true,
            vrddhi_trigger: true,
            guna_blocker: false
          }
        }
      };

      const result = analyzeAffixPropertyPreservation(context);
      
      expect(result.phoneticAnalysis.gunaVrddhi_triggers).toContain('guna_operation_preserved');
      expect(result.phoneticAnalysis.gunaVrddhi_triggers).toContain('vrddhi_operation_preserved');
      expect(result.phoneticAnalysis.gunaVrddhi_triggers).toContain('guna_blocking_preserved');
    });
  });

  describe('analyzeAffixPropertyPreservation() - Grammatical Analysis', () => {
    it('should analyze syntactic functions', () => {
      const context = {
        base: { form: 'agni' },
        elidedAffix: {
          properties: {
            syntactic_role: 'subject_marker',
            case: 'nominative'
          }
        }
      };

      const result = analyzeAffixPropertyPreservation(context);
      
      expect(result.grammaticalAnalysis.syntacticFunctions).toContain('subject_marker');
      expect(result.grammaticalAnalysis.syntacticFunctions).toContain('case_marking_function');
    });

    it('should analyze semantic preservation', () => {
      const context = {
        base: { form: 'kṛ' },
        elidedAffix: {
          properties: {
            semantic_content: 'agent',
            meaning: 'doer'
          }
        }
      };

      const result = analyzeAffixPropertyPreservation(context);
      
      expect(result.grammaticalAnalysis.semanticPreservation).toContain('semantic_content_preserved');
      expect(result.grammaticalAnalysis.semanticPreservation).toContain('lexical_meaning_maintained');
    });

    it('should analyze agreement features', () => {
      const context = {
        base: { form: 'agni' },
        elidedAffix: {
          properties: {
            gender: 'masculine',
            number: 'singular',
            person: 'third'
          }
        }
      };

      const result = analyzeAffixPropertyPreservation(context);
      
      expect(result.grammaticalAnalysis.agreementFeatures).toContain('gender_agreement');
      expect(result.grammaticalAnalysis.agreementFeatures).toContain('number_agreement');
      expect(result.grammaticalAnalysis.agreementFeatures).toContain('person_agreement');
    });
  });

  describe('analyzeAffixPropertyPreservation() - Traditional Commentary', () => {
    it('should include Kashika commentary', () => {
      const context = { base: { form: 'test' } };
      const result = analyzeAffixPropertyPreservation(context);
      
      expect(result.traditionalCommentary.kashika).toContain('प्रत्ययलोपे प्रत्ययलक्षणम्');
    });

    it('should include Mahabhashya commentary', () => {
      const context = { base: { form: 'test' } };
      const result = analyzeAffixPropertyPreservation(context);
      
      expect(result.traditionalCommentary.mahabhashya).toContain('लोपो व्यत्ययेन अलोपो वा');
    });

    it('should include English explanation', () => {
      const context = { base: { form: 'test' } };
      const result = analyzeAffixPropertyPreservation(context);
      
      expect(result.traditionalCommentary.english).toContain('affix');
      expect(result.traditionalCommentary.english).toContain('lakṣaṇa');
    });
  });

  describe('analyzeAffixPropertyPreservation() - Confidence Scoring', () => {
    it('should assign high confidence to comprehensive preservation', () => {
      const context = {
        base: { form: 'go' },
        elidedAffix: {
          properties: {
            pit: true,
            case: 'nominative',
            derivational: true,
            influences: ['guna_triggering', 'case_marking']
          }
        }
      };

      const result = analyzeAffixPropertyPreservation(context);
      
      expect(result.confidence).toBeGreaterThan(80);
    });

    it('should assign medium confidence to partial preservation', () => {
      const context = {
        base: { form: 'agni' },
        elidedAffix: {
          properties: {
            case: 'nominative'
          }
        }
      };

      const result = analyzeAffixPropertyPreservation(context);
      
      expect(result.confidence).toBeGreaterThan(30);
      expect(result.confidence).toBeLessThan(80);
    });

    it('should assign low confidence to no preservation context', () => {
      const context = {
        base: { form: 'test' }
      };

      const result = analyzeAffixPropertyPreservation(context);
      
      expect(result.confidence).toBeLessThan(30);
    });

    it('should cap confidence at 100', () => {
      const context = {
        base: { form: 'comprehensive' },
        elidedAffix: {
          properties: {
            pit: true,
            case: 'nominative',
            derivational: true,
            semantic_content: 'preserved',
            influences: ['multiple', 'effects']
          }
        }
      };

      const result = analyzeAffixPropertyPreservation(context);
      
      expect(result.confidence).toBeLessThanOrEqual(100);
    });
  });

  describe('analyzeAffixPropertyPreservation() - Input Validation', () => {
    it('should handle invalid input gracefully', () => {
      const result = analyzeAffixPropertyPreservation(null);
      
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Valid linguistic context is required');
      expect(result.sutra).toBe('1.1.62');
    });

    it('should handle undefined input', () => {
      const result = analyzeAffixPropertyPreservation(undefined);
      
      expect(result.isValid).toBe(false);
    });

    it('should handle empty object input', () => {
      const result = analyzeAffixPropertyPreservation({});
      
      expect(result.isValid).toBe(true);
      expect(result.preservationAnalysis.hasElidedAffix).toBe(false);
    });

    it('should handle non-object input', () => {
      const result = analyzeAffixPropertyPreservation('string');
      
      expect(result.isValid).toBe(false);
    });
  });
});
