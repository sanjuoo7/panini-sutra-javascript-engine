/**
 * Test Suite for Sutra 1.2.43: प्रथमानिर्दिष्टं समासे उपसर्जनम्
 * "What is specified through nominative case in compounds becomes upasarjana (subordinate member)"
 */
import { applySutra1_2_43 } from './index.js';

describe('Sutra 1.2.43: प्रथमानिर्दिष्टं समासे उपसर्जनम्', () => {
  
  describe('Positive Cases: Nominative-indicated upasarjana', () => {
    test('should identify simple nominative upasarjana', () => {
      const compound = { 
        members: [
          { form: 'rāja', case: 'nom-rule', meaning: 'king' },
          { form: 'puruṣa', case: 'acc', meaning: 'person' }
        ]
      };
      const result = applySutra1_2_43(compound);
      expect(result.sutra).toBe('1.2.43');
      expect(result.upasarjanaIndices).toContain(0);
      expect(result.applied).toBe(true);
    });

    test('should handle Devanagari nominative indication', () => {
      const compound = { 
        members: [
          { form: 'राज', case: 'nom-rule', meaning: 'king' },
          { form: 'पुरुष', case: 'acc', meaning: 'person' }
        ]
      };
      const result = applySutra1_2_43(compound);
      expect(result.upasarjanaIndices).toContain(0);
      expect(result.applied).toBe(true);
    });

    test('should identify multiple nominative upasarjanas', () => {
      const compound = { 
        members: [
          { form: 'rāja', case: 'nom-rule', meaning: 'king' },
          { form: 'brāhmaṇa', case: 'nom-rule', meaning: 'brahmin' },
          { form: 'puruṣa', case: 'acc', meaning: 'person' }
        ]
      };
      const result = applySutra1_2_43(compound);
      expect(result.upasarjanaIndices).toContain(0);
      expect(result.upasarjanaIndices).toContain(1);
      expect(result.upasarjanaIndices).toHaveLength(2);
    });

    test('should work with specified nominative indices', () => {
      const compound = { 
        members: [
          { form: 'go', case: 'nom-rule' },
          { form: 'aśva', case: 'nom-rule' },
          { form: 'rāja', case: 'acc' }
        ]
      };
      const result = applySutra1_2_43(compound, { nominativeIndices: [0, 1] });
      expect(result.upasarjanaIndices).toContain(0);
      expect(result.upasarjanaIndices).toContain(1);
    });

    test('should identify tatpurusha compound upasarjana', () => {
      const compound = { 
        type: 'tatpurusha',
        members: [
          { form: 'grāma', case: 'nom-rule', meaning: 'village' },
          { form: 'jana', case: 'acc', meaning: 'people' }
        ]
      };
      const result = applySutra1_2_43(compound);
      expect(result.upasarjanaIndices).toContain(0);
      expect(result.compoundType).toBe('tatpurusha');
    });

    test('should handle karmadharaya compounds', () => {
      const compound = { 
        type: 'karmadharaya',
        members: [
          { form: 'śukla', case: 'nom-rule', meaning: 'white' },
          { form: 'pakṣa', case: 'acc', meaning: 'fortnight' }
        ]
      };
      const result = applySutra1_2_43(compound);
      expect(result.upasarjanaIndices).toContain(0);
      expect(result.applied).toBe(true);
    });

    test('should work with dvigu compounds', () => {
      const compound = { 
        type: 'dvigu',
        members: [
          { form: 'tri', case: 'nom-rule', meaning: 'three' },
          { form: 'loka', case: 'acc', meaning: 'world' }
        ]
      };
      const result = applySutra1_2_43(compound);
      expect(result.upasarjanaIndices).toContain(0);
      expect(result.compoundType).toBe('dvigu');
    });
  });

  describe('Negative Cases: Non-nominative contexts', () => {
    test('should not apply when no nominative indication', () => {
      const compound = { 
        members: [
          { form: 'rāja', case: 'acc', meaning: 'king' },
          { form: 'puruṣa', case: 'acc', meaning: 'person' }
        ]
      };
      const result = applySutra1_2_43(compound);
      expect(result.upasarjanaIndices).toHaveLength(0);
      expect(result.applied).toBe(false);
    });

    test('should not apply to dvandva compounds', () => {
      const compound = { 
        type: 'dvandva',
        members: [
          { form: 'rāma', case: 'nom-rule' },
          { form: 'lakṣmaṇa', case: 'nom-rule' }
        ]
      };
      const result = applySutra1_2_43(compound);
      expect(result.applied).toBe(false);
      expect(result.reason).toMatch(/dvandva/i);
    });

    test('should not apply when all members are nominative', () => {
      const compound = { 
        members: [
          { form: 'rāja', case: 'nom-rule' },
          { form: 'puruṣa', case: 'nom-rule' }
        ]
      };
      const result = applySutra1_2_43(compound);
      expect(result.applied).toBe(false);
    });

    test('should not apply to bahuvrihi compounds with equal members', () => {
      const compound = { 
        type: 'bahuvrihi',
        members: [
          { form: 'mahā', case: 'nom-rule' },
          { form: 'ātman', case: 'nom-rule' }
        ]
      };
      const result = applySutra1_2_43(compound);
      expect(result.applied).toBe(false);
    });

    test('should not apply when no case information available', () => {
      const compound = { 
        members: [
          { form: 'rāja' },
          { form: 'puruṣa' }
        ]
      };
      const result = applySutra1_2_43(compound);
      expect(result.applied).toBe(false);
      expect(result.reason).toMatch(/case.*information/i);
    });
  });

  describe('Case validation functionality', () => {
    test('should validate nominative case markers', () => {
      const compound = { 
        members: [
          { form: 'rājaḥ', case: 'nom-rule', caseMarker: 'ḥ' },
          { form: 'puruṣam', case: 'acc', caseMarker: 'am' }
        ]
      };
      const result = applySutra1_2_43(compound);
      expect(result.caseValidation).toBeDefined();
      expect(result.caseValidation.validNominative).toBe(true);
    });

    test('should detect incorrect case markers', () => {
      const compound = { 
        members: [
          { form: 'rājam', case: 'nom-rule', caseMarker: 'am' },
          { form: 'puruṣaḥ', case: 'acc', caseMarker: 'ḥ' }
        ]
      };
      const result = applySutra1_2_43(compound);
      expect(result.caseValidation.inconsistentCasing).toBe(true);
    });
  });

  describe('Multi-script support', () => {
    test('should handle IAST input correctly', () => {
      const compound = { 
        members: [
          { form: 'rāja', case: 'nom-rule' },
          { form: 'puruṣa', case: 'acc' }
        ]
      };
      const result = applySutra1_2_43(compound);
      expect(result.script).toBe('IAST');
      expect(result.applied).toBe(true);
    });

    test('should handle Devanagari input correctly', () => {
      const compound = { 
        members: [
          { form: 'राज', case: 'nom-rule' },
          { form: 'पुरुष', case: 'acc' }
        ]
      };
      const result = applySutra1_2_43(compound);
      expect(result.script).toBe('Devanagari');
      expect(result.applied).toBe(true);
    });

    test('should handle mixed script contexts', () => {
      const compound = { 
        members: [
          { form: 'rāja', case: 'nom-rule' },
          { form: 'पुरुष', case: 'acc' }
        ]
      };
      const result = applySutra1_2_43(compound);
      expect(result.script).toBe('Mixed');
      expect(result.applied).toBe(true);
    });
  });

  describe('Edge cases and error handling', () => {
    test('should handle null input gracefully', () => {
      const result = applySutra1_2_43(null);
      expect(result.applied).toBe(false);
      expect(result.error).toMatch(/invalid.*input/i);
    });

    test('should handle undefined input gracefully', () => {
      const result = applySutra1_2_43(undefined);
      expect(result.applied).toBe(false);
      expect(result.error).toMatch(/invalid.*input/i);
    });

    test('should handle empty compound gracefully', () => {
      const result = applySutra1_2_43({});
      expect(result.applied).toBe(false);
      expect(result.error).toMatch(/missing.*members/i);
    });

    test('should handle compound with no members', () => {
      const result = applySutra1_2_43({ members: [] });
      expect(result.applied).toBe(false);
      expect(result.error).toMatch(/empty.*members/i);
    });

    test('should handle malformed member data', () => {
      const compound = { 
        members: [
          null,
          { form: 'puruṣa', case: 'acc' }
        ]
      };
      const result = applySutra1_2_43(compound);
      expect(result.applied).toBe(false);
      expect(result.error).toMatch(/malformed.*member/i);
    });

    test('should provide detailed analysis structure', () => {
      const compound = { 
        members: [
          { form: 'rāja', case: 'nom-rule' },
          { form: 'puruṣa', case: 'acc' }
        ]
      };
      const result = applySutra1_2_43(compound);
      expect(result).toHaveProperty('sutra');
      expect(result).toHaveProperty('applied');
      expect(result).toHaveProperty('upasarjanaIndices');
      expect(result).toHaveProperty('analysis');
      expect(result).toHaveProperty('confidence');
    });
  });

  describe('Compound type analysis', () => {
    test('should analyze tatpurusha compound structure', () => {
      const compound = { 
        type: 'tatpurusha',
        members: [
          { form: 'rāja', case: 'nom-rule', meaning: 'king' },
          { form: 'putra', case: 'acc', meaning: 'son' }
        ]
      };
      const result = applySutra1_2_43(compound);
      expect(result.compoundAnalysis.type).toBe('tatpurusha');
      expect(result.compoundAnalysis.structure).toBe('determinant_determined');
    });

    test('should analyze karmadharaya compound structure', () => {
      const compound = { 
        type: 'karmadharaya',
        members: [
          { form: 'mahā', case: 'nom-rule', meaning: 'great' },
          { form: 'rāja', case: 'acc', meaning: 'king' }
        ]
      };
      const result = applySutra1_2_43(compound);
      expect(result.compoundAnalysis.type).toBe('karmadharaya');
      expect(result.compoundAnalysis.structure).toBe('qualifier_qualified');
    });

    test('should analyze dvigu compound structure', () => {
      const compound = { 
        type: 'dvigu',
        members: [
          { form: 'pañca', case: 'nom-rule', meaning: 'five' },
          { form: 'jana', case: 'acc', meaning: 'person' }
        ]
      };
      const result = applySutra1_2_43(compound);
      expect(result.compoundAnalysis.type).toBe('dvigu');
      expect(result.compoundAnalysis.structure).toBe('numeral_qualified');
    });
  });

  describe('Semantic analysis', () => {
    test('should analyze semantic roles in compound', () => {
      const compound = { 
        members: [
          { form: 'grāma', case: 'nom-rule', meaning: 'village', semanticRole: 'location' },
          { form: 'jana', case: 'acc', meaning: 'people', semanticRole: 'entity' }
        ]
      };
      const result = applySutra1_2_43(compound);
      expect(result.semanticAnalysis.upasarjanaRole).toBe('location');
      expect(result.semanticAnalysis.pradhanaRole).toBe('entity');
    });

    test('should analyze relationship between compound members', () => {
      const compound = { 
        members: [
          { form: 'vidyā', case: 'nom-rule', meaning: 'knowledge' },
          { form: 'dhana', case: 'acc', meaning: 'wealth' }
        ]
      };
      const result = applySutra1_2_43(compound);
      expect(result.semanticAnalysis.relationship).toBeDefined();
      expect(result.semanticAnalysis.dependency).toBe('modifier_modified');
    });
  });

  describe('Contextual analysis', () => {
    test('should handle syntactic context', () => {
      const compound = { 
        members: [
          { form: 'dharma', case: 'nom-rule' },
          { form: 'rāja', case: 'acc' }
        ]
      };
      const context = { syntacticRole: 'subject', sentencePosition: 'initial' };
      const result = applySutra1_2_43(compound, context);
      expect(result.contextualAnalysis.syntacticRole).toBe('subject');
      expect(result.contextualAnalysis.position).toBe('initial');
    });

    test('should handle semantic context', () => {
      const compound = { 
        members: [
          { form: 'dharma', case: 'nom-rule' },
          { form: 'yuddha', case: 'acc' }
        ]
      };
      const context = { semanticField: 'ethics', domain: 'philosophy' };
      const result = applySutra1_2_43(compound, context);
      expect(result.contextualAnalysis.semanticField).toBe('ethics');
      expect(result.contextualAnalysis.domain).toBe('philosophy');
    });
  });

  describe('Advanced features', () => {
    test('should handle nested compound analysis', () => {
      const compound = { 
        members: [
          { 
            form: 'mahārāja', 
            case: 'nom-rule',
            isCompound: true,
            subCompound: {
              members: [
                { form: 'mahā', case: 'nom-rule' },
                { form: 'rāja', case: 'acc' }
              ]
            }
          },
          { form: 'putra', case: 'acc' }
        ]
      };
      const result = applySutra1_2_43(compound);
      expect(result.nestedAnalysis).toBeDefined();
      expect(result.nestedAnalysis.hasNestedCompounds).toBe(true);
    });

    test('should provide confidence scoring', () => {
      const compound = { 
        members: [
          { form: 'rāja', case: 'nom-rule', certainty: 0.9 },
          { form: 'puruṣa', case: 'acc', certainty: 0.8 }
        ]
      };
      const result = applySutra1_2_43(compound);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.confidence).toBeLessThanOrEqual(1.0);
    });

    test('should handle alternative analyses', () => {
      const compound = { 
        members: [
          { form: 'śukla', case: 'nom-rule' },
          { form: 'pakṣa', case: 'acc' }
        ],
        alternativeAnalyses: ['karmadharaya', 'tatpurusha']
      };
      const result = applySutra1_2_43(compound);
      expect(result.alternativeAnalyses).toBeDefined();
      expect(result.alternativeAnalyses.length).toBeGreaterThan(0);
    });
  });
});
