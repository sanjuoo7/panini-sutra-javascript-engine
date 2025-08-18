/**
 * Comprehensive test suite for Sutra 1.1.63: न लुमता'ङ्गस्य (na lumatā'ṅgasya)
 *
 * Tests cover:
 * 1. Basic prohibition functionality
 * 2. Comprehensive aṅga operation blocking analysis
 * 3. Interaction with pratyayalakṣaṇam (1.1.62)
 * 4. Traditional commentary integration
 * 5. Edge cases and error handling
 */

import { shouldBlockAngaOperation, analyzeAngaProhibition } from './index.js';

describe('Sutra 1.1.63: न लुमता\'ङ्गस्य (na lumatā\'ṅgasya)', () => {
  describe('shouldBlockAngaOperation() - Basic Functionality', () => {
    describe('Prohibition Cases (Positive)', () => {
      it("should return true for 'luk' to block aṅga operations", () => {
        expect(shouldBlockAngaOperation('luk')).toBe(true);
      });

      it("should return true for 'ślu' to block aṅga operations", () => {
        expect(shouldBlockAngaOperation('ślu')).toBe(true);
      });

      it("should return true for 'lup' to block aṅga operations", () => {
        expect(shouldBlockAngaOperation('lup')).toBe(true);
      });
    });

    describe('Non-Prohibition Cases (Negative)', () => {
      it("should return false for 'lopa', allowing aṅga operations", () => {
        expect(shouldBlockAngaOperation('lopa')).toBe(false);
      });

      it("should return false for other elision types", () => {
        expect(shouldBlockAngaOperation('ādeśa')).toBe(false);
        expect(shouldBlockAngaOperation('vikāra')).toBe(false);
      });

      it("should return false for empty string", () => {
        expect(shouldBlockAngaOperation('')).toBe(false);
      });
    });

    describe('Edge Cases', () => {
      it('should return false for null, undefined, or non-string inputs', () => {
        expect(shouldBlockAngaOperation(null)).toBe(false);
        expect(shouldBlockAngaOperation(undefined)).toBe(false);
        expect(shouldBlockAngaOperation(123)).toBe(false);
        expect(shouldBlockAngaOperation({})).toBe(false);
        expect(shouldBlockAngaOperation([])).toBe(false);
      });
    });
  });

  describe('analyzeAngaProhibition() - Core Functionality', () => {
    it('should analyze prohibition with luk elision', () => {
      const context = {
        base: { form: 'go' },
        elisionType: 'luk',
        elidedAffix: {
          properties: { pit: true }
        }
      };

      const result = analyzeAngaProhibition(context);
      
      expect(result.isValid).toBe(true);
      expect(result.sutra).toBe('1.1.63');
      expect(result.rule).toBe('न लुमता\'ङ्गस्य (na lumatā\'ṅgasya)');
      expect(result.prohibitionAnalysis.isProhibited).toBe(true);
      expect(result.prohibitionAnalysis.prohibitionType).toBe('luk');
    });

    it('should analyze prohibition with ślu elision', () => {
      const context = {
        base: { form: 'agni' },
        elisionType: 'ślu'
      };

      const result = analyzeAngaProhibition(context);
      
      expect(result.prohibitionAnalysis.isProhibited).toBe(true);
      expect(result.prohibitionAnalysis.prohibitionType).toBe('ślu');
      expect(result.prohibitionAnalysis.blockingScope).toBe('conditional_prohibition');
    });

    it('should analyze prohibition with lup elision', () => {
      const context = {
        base: { form: 'rāman' },
        elisionType: 'lup'
      };

      const result = analyzeAngaProhibition(context);
      
      expect(result.prohibitionAnalysis.isProhibited).toBe(true);
      expect(result.prohibitionAnalysis.prohibitionType).toBe('lup');
      expect(result.prohibitionAnalysis.blockingScope).toBe('contextual_prohibition');
    });

    it('should not prohibit with non-lu elision types', () => {
      const context = {
        base: { form: 'go' },
        elisionType: 'lopa'
      };

      const result = analyzeAngaProhibition(context);
      
      expect(result.prohibitionAnalysis.isProhibited).toBe(false);
      expect(result.prohibitionAnalysis.prohibitionType).toBe(null);
    });

    it('should provide sutra reference and rule', () => {
      const context = { base: { form: 'test' }, elisionType: 'luk' };
      const result = analyzeAngaProhibition(context);
      
      expect(result.sutra).toBe('1.1.63');
      expect(result.rule).toContain('न लुमता\'ङ्गस्य');
    });
  });

  describe('analyzeAngaProhibition() - Prohibition Scope Analysis', () => {
    it('should identify affected operations for luk elision', () => {
      const context = {
        base: { form: 'go' },
        elisionType: 'luk'
      };

      const result = analyzeAngaProhibition(context);
      
      expect(result.prohibitionAnalysis.affectedOperations).toContain('guna_operations');
      expect(result.prohibitionAnalysis.affectedOperations).toContain('vrddhi_operations');
      expect(result.prohibitionAnalysis.affectedOperations).toContain('anga_modifications');
      expect(result.prohibitionAnalysis.blockingScope).toBe('complete_prohibition');
    });

    it('should identify affected operations for ślu elision', () => {
      const context = {
        base: { form: 'agni' },
        elisionType: 'ślu'
      };

      const result = analyzeAngaProhibition(context);
      
      expect(result.prohibitionAnalysis.affectedOperations).toContain('specific_anga_operations');
      expect(result.prohibitionAnalysis.affectedOperations).toContain('morphophonemic_changes');
    });

    it('should identify affected operations for lup elision', () => {
      const context = {
        base: { form: 'rāman' },
        elisionType: 'lup'
      };

      const result = analyzeAngaProhibition(context);
      
      expect(result.prohibitionAnalysis.affectedOperations).toContain('pragmatic_anga_operations');
      expect(result.prohibitionAnalysis.affectedOperations).toContain('contextual_modifications');
    });
  });

  describe('analyzeAngaProhibition() - Morphological Analysis', () => {
    it('should analyze blocked modifications for luk elision', () => {
      const context = {
        base: { form: 'go' },
        elisionType: 'luk',
        elidedAffix: {
          properties: { pit: true, vrddhi_trigger: true }
        }
      };

      const result = analyzeAngaProhibition(context);
      
      expect(result.morphologicalAnalysis.baseForm).toBe('go');
      expect(result.morphologicalAnalysis.elisionType).toBe('luk');
      expect(result.morphologicalAnalysis.blockedModifications).toContain('anga_modifications');
      expect(result.morphologicalAnalysis.blockedModifications).toContain('guna_operations');
      expect(result.morphologicalAnalysis.blockedModifications).toContain('vrddhi_operations');
    });

    it('should analyze allowed operations for non-lu elision', () => {
      const context = {
        base: { form: 'go' },
        elisionType: 'lopa'
      };

      const result = analyzeAngaProhibition(context);
      
      expect(result.morphologicalAnalysis.allowedOperations).toContain('normal_anga_operations');
      expect(result.morphologicalAnalysis.allowedOperations).toContain('pratyayalakshana_application');
    });

    it('should analyze allowed operations for lu elision', () => {
      const context = {
        base: { form: 'go' },
        elisionType: 'luk'
      };

      const result = analyzeAngaProhibition(context);
      
      expect(result.morphologicalAnalysis.allowedOperations).toContain('basic_phonetic_operations');
      expect(result.morphologicalAnalysis.allowedOperations).toContain('non_affix_dependent_changes');
    });
  });

  describe('analyzeAngaProhibition() - Phonetic Analysis', () => {
    it('should analyze blocked sound changes for lu elision', () => {
      const context = {
        base: { form: 'go' },
        elisionType: 'luk'
      };

      const result = analyzeAngaProhibition(context);
      
      expect(result.phoneticAnalysis.blockedSoundChanges).toContain('affix_triggered_changes');
      expect(result.phoneticAnalysis.blockedSoundChanges).toContain('euphonic_modifications');
    });

    it('should analyze preserved phonetics for lu elision', () => {
      const context = {
        base: { form: 'agni' },
        elisionType: 'ślu'
      };

      const result = analyzeAngaProhibition(context);
      
      expect(result.phoneticAnalysis.preservedPhonetics).toContain('base_phonetic_form');
      expect(result.phoneticAnalysis.preservedPhonetics).toContain('original_anga_characteristics');
    });

    it('should analyze euphonic prohibitions', () => {
      const context = {
        base: { form: 'rāman' },
        elisionType: 'lup'
      };

      const result = analyzeAngaProhibition(context);
      
      expect(result.phoneticAnalysis.euphonicProhibitions).toContain('affix_dependent_euphonics');
      expect(result.phoneticAnalysis.euphonicProhibitions).toContain('characteristic_based_changes');
    });
  });

  describe('analyzeAngaProhibition() - Grammatical Analysis', () => {
    it('should analyze blocked grammatical operations', () => {
      const context = {
        base: { form: 'go' },
        elisionType: 'luk'
      };

      const result = analyzeAngaProhibition(context);
      
      expect(result.grammaticalAnalysis.blockedGrammaticalOperations).toContain('affix_dependent_grammar');
      expect(result.grammaticalAnalysis.blockedGrammaticalOperations).toContain('characteristic_based_syntax');
    });

    it('should analyze syntactic prohibitions', () => {
      const context = {
        base: { form: 'agni' },
        elisionType: 'ślu'
      };

      const result = analyzeAngaProhibition(context);
      
      expect(result.grammaticalAnalysis.syntacticProhibitions).toContain('affix_based_syntax');
    });

    it('should analyze semantic blocking', () => {
      const context = {
        base: { form: 'rāman' },
        elisionType: 'lup'
      };

      const result = analyzeAngaProhibition(context);
      
      expect(result.grammaticalAnalysis.semanticBlocking).toContain('affix_semantic_effects');
    });
  });

  describe('analyzeAngaProhibition() - Pratyayalakṣaṇam Interaction', () => {
    it('should block 1.1.62 for luk elision', () => {
      const context = {
        base: { form: 'go' },
        elisionType: 'luk',
        elidedAffix: {
          properties: { pit: true }
        }
      };

      const result = analyzeAngaProhibition(context);
      
      expect(result.pratyayalakshanamInteraction.blocks_1_1_62).toBe(true);
      expect(result.pratyayalakshanamInteraction.preservation_prevented).toContain('affix_property_preservation');
      expect(result.pratyayalakshanamInteraction.preservation_prevented).toContain('lakshana_application');
      expect(result.pratyayalakshanamInteraction.preservation_prevented).toContain('guna_trigger_blocking');
    });

    it('should block 1.1.62 for ślu elision', () => {
      const context = {
        base: { form: 'agni' },
        elisionType: 'ślu'
      };

      const result = analyzeAngaProhibition(context);
      
      expect(result.pratyayalakshanamInteraction.blocks_1_1_62).toBe(true);
      expect(result.pratyayalakshanamInteraction.preservation_prevented).toContain('characteristic_inheritance');
    });

    it('should not block 1.1.62 for non-lu elision', () => {
      const context = {
        base: { form: 'go' },
        elisionType: 'lopa'
      };

      const result = analyzeAngaProhibition(context);
      
      expect(result.pratyayalakshanamInteraction.blocks_1_1_62).toBe(false);
      expect(result.pratyayalakshanamInteraction.preservation_prevented).toEqual([]);
    });

    it('should analyze specific property blocking', () => {
      const context = {
        base: { form: 'go' },
        elisionType: 'luk',
        elidedAffix: {
          properties: { pit: true, kit: false }
        }
      };

      const result = analyzeAngaProhibition(context);
      
      expect(result.pratyayalakshanamInteraction.preservation_prevented).toContain('guna_trigger_blocking');
    });
  });

  describe('analyzeAngaProhibition() - Traditional Commentary', () => {
    it('should include Kashika commentary', () => {
      const context = { base: { form: 'test' }, elisionType: 'luk' };
      const result = analyzeAngaProhibition(context);
      
      expect(result.traditionalCommentary.kashika).toContain('न लुमता\'ङ्गस्य');
      expect(result.traditionalCommentary.kashika).toContain('लुक्श्लुलुपैः');
    });

    it('should include Mahabhashya commentary', () => {
      const context = { base: { form: 'test' }, elisionType: 'ślu' };
      const result = analyzeAngaProhibition(context);
      
      expect(result.traditionalCommentary.mahabhashya).toContain('लुमता इति');
      expect(result.traditionalCommentary.mahabhashya).toContain('लुक्श्लुलुप्प्रत्ययानां');
    });

    it('should include English explanation', () => {
      const context = { base: { form: 'test' }, elisionType: 'lup' };
      const result = analyzeAngaProhibition(context);
      
      expect(result.traditionalCommentary.english).toContain('affix');
      expect(result.traditionalCommentary.english).toContain('base');
      expect(result.traditionalCommentary.english).toContain('1.1.62');
    });
  });

  describe('analyzeAngaProhibition() - Confidence Scoring', () => {
    it('should assign high confidence to clear prohibition cases', () => {
      const context = {
        base: { form: 'go' },
        elisionType: 'luk',
        elidedAffix: { properties: { pit: true } }
      };

      const result = analyzeAngaProhibition(context);
      
      expect(result.confidence).toBeGreaterThan(90);
    });

    it('should assign medium confidence to partial prohibition cases', () => {
      const context = {
        base: { form: 'agni' },
        elisionType: 'ślu'
      };

      const result = analyzeAngaProhibition(context);
      
      expect(result.confidence).toBeGreaterThan(60);
      expect(result.confidence).toBeLessThan(95);
    });

    it('should assign low confidence to non-prohibition cases', () => {
      const context = {
        base: { form: 'go' },
        elisionType: 'lopa'
      };

      const result = analyzeAngaProhibition(context);
      
      expect(result.confidence).toBeLessThan(30);
    });

    it('should cap confidence at 100', () => {
      const context = {
        base: { form: 'comprehensive' },
        elisionType: 'luk',
        elidedAffix: { properties: { pit: true, vrddhi_trigger: true } }
      };

      const result = analyzeAngaProhibition(context);
      
      expect(result.confidence).toBeLessThanOrEqual(100);
    });
  });

  describe('analyzeAngaProhibition() - Input Validation', () => {
    it('should handle invalid input gracefully', () => {
      const result = analyzeAngaProhibition(null);
      
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Valid linguistic context is required');
      expect(result.sutra).toBe('1.1.63');
    });

    it('should handle undefined input', () => {
      const result = analyzeAngaProhibition(undefined);
      
      expect(result.isValid).toBe(false);
    });

    it('should handle empty object input', () => {
      const result = analyzeAngaProhibition({});
      
      expect(result.isValid).toBe(true);
      expect(result.prohibitionAnalysis.isProhibited).toBe(false);
    });

    it('should handle non-object input', () => {
      const result = analyzeAngaProhibition('string');
      
      expect(result.isValid).toBe(false);
    });

    it('should handle context without elision type', () => {
      const context = { base: { form: 'test' } };
      const result = analyzeAngaProhibition(context);
      
      expect(result.isValid).toBe(true);
      expect(result.prohibitionAnalysis.isProhibited).toBe(false);
    });
  });

  describe('Conceptual Integration with 1.1.62', () => {
    it('demonstrates the blocking of pratyayalakṣaṇam', () => {
      const getPristineBase = () => ({ form: 'go', context: {} });
      const elidedAffix = { properties: { marker: 'pit' } };

      // Scenario 1: Elision is 'lopa' - pratyayalakṣaṇam APPLIES
      let finalBaseLopa = getPristineBase();
      const lopaElision = 'lopa';
      if (!shouldBlockAngaOperation(lopaElision)) {
        finalBaseLopa.context.elidedAffixProperties = { ...elidedAffix.properties };
      }
      expect(finalBaseLopa.context.elidedAffixProperties.marker).toBe('pit');

      // Scenario 2: Elision is 'luk' - pratyayalakṣaṇam is BLOCKED
      let finalBaseLuk = getPristineBase();
      const lukElision = 'luk';
      if (!shouldBlockAngaOperation(lukElision)) {
        finalBaseLuk.context.elidedAffixProperties = { ...elidedAffix.properties };
      }
      expect(finalBaseLuk.context.elidedAffixProperties).toBeUndefined();
    });

    it('demonstrates interaction between 1.1.62 and 1.1.63', () => {
      const context1162 = {
        base: { form: 'go' },
        elidedAffix: { properties: { pit: true } }
      };

      const context1163Blocking = {
        base: { form: 'go' },
        elisionType: 'luk',
        elidedAffix: { properties: { pit: true } }
      };

      const context1163Allowing = {
        base: { form: 'go' },
        elisionType: 'lopa',
        elidedAffix: { properties: { pit: true } }
      };

      // 1.1.62 would normally apply property preservation
      const result1162 = analyzeAngaProhibition(context1162);
      expect(result1162.prohibitionAnalysis.isProhibited).toBe(false);

      // 1.1.63 blocks 1.1.62 for luk elision
      const resultBlocking = analyzeAngaProhibition(context1163Blocking);
      expect(resultBlocking.prohibitionAnalysis.isProhibited).toBe(true);
      expect(resultBlocking.pratyayalakshanamInteraction.blocks_1_1_62).toBe(true);

      // 1.1.63 allows 1.1.62 for non-lu elision
      const resultAllowing = analyzeAngaProhibition(context1163Allowing);
      expect(resultAllowing.prohibitionAnalysis.isProhibited).toBe(false);
      expect(resultAllowing.pratyayalakshanamInteraction.blocks_1_1_62).toBe(false);
    });
  });
});
