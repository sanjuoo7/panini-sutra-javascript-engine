/**
 * Test Suite for Sutra 1.2.44: एकविभक्ति चापूर्वनिपाते
 * "A member with fixed case (ekavibhakti) also becomes upasarjana when not occurring in the first position"
 */
import { applySutra1_2_44 } from './index.js';

describe('Sutra 1.2.44: एकविभक्ति चापूर्वनिपाते', () => {
  
  describe('Positive Cases: Fixed case upasarjana', () => {
    test('should identify fixed case member as upasarjana', () => {
      const compound = { 
        members: [
          { form: 'go', fixedCase: true, meaning: 'cow' },
          { form: 'rāja', case: 'nom', meaning: 'king' }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.sutra).toBe('1.2.44');
      expect(result.upasarjanaIndices).toContain(0);
      expect(result.applied).toBe(true);
    });

    test('should handle Devanagari fixed case forms', () => {
      const compound = { 
        members: [
          { form: 'गो', fixedCase: true, meaning: 'cow' },
          { form: 'राज', case: 'nom', meaning: 'king' }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.upasarjanaIndices).toContain(0);
      expect(result.applied).toBe(true);
    });

    test('should identify multiple fixed case members', () => {
      const compound = { 
        members: [
          { form: 'go', fixedCase: true, meaning: 'cow' },
          { form: 'aśva', fixedCase: true, meaning: 'horse' },
          { form: 'rāja', case: 'nom', meaning: 'king' }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.upasarjanaIndices).toContain(0);
      expect(result.upasarjanaIndices).toContain(1);
      expect(result.upasarjanaIndices).toHaveLength(2);
    });

    test('should work with indeclinable words', () => {
      const compound = { 
        members: [
          { form: 'ati', fixedCase: true, type: 'avyaya', meaning: 'beyond' },
          { form: 'mānuṣa', case: 'acc', meaning: 'human' }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.upasarjanaIndices).toContain(0);
      expect(result.applied).toBe(true);
    });

    test('should handle particles with fixed case', () => {
      const compound = { 
        members: [
          { form: 'su', fixedCase: true, type: 'particle', meaning: 'well' },
          { form: 'karma', case: 'nom', meaning: 'action' }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.upasarjanaIndices).toContain(0);
      expect(result.memberTypes.fixedCase).toBe(1);
    });

    test('should work with tatpurusha compounds', () => {
      const compound = { 
        type: 'tatpurusha',
        members: [
          { form: 'pra', fixedCase: true, type: 'prefix' },
          { form: 'vāda', case: 'nom', meaning: 'speech' }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.upasarjanaIndices).toContain(0);
      expect(result.compoundType).toBe('tatpurusha');
    });

    test('should handle avyayibhava compounds', () => {
      const compound = { 
        type: 'avyayibhava',
        members: [
          { form: 'upa', fixedCase: true, type: 'upasarga' },
          { form: 'agni', case: 'acc', meaning: 'fire' }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.upasarjanaIndices).toContain(0);
      expect(result.compoundAnalysis.type).toBe('avyayibhava');
    });
  });

  describe('Negative Cases: Variable case contexts', () => {
    test('should not apply when no fixed case members', () => {
      const compound = { 
        members: [
          { form: 'rāja', case: 'nom', meaning: 'king' },
          { form: 'puruṣa', case: 'acc', meaning: 'person' }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.upasarjanaIndices).toHaveLength(0);
      expect(result.applied).toBe(false);
    });

    test('should not apply to dvandva compounds with variable cases', () => {
      const compound = { 
        type: 'dvandva',
        members: [
          { form: 'rāma', case: 'nom' },
          { form: 'lakṣmaṇa', case: 'nom' }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.applied).toBe(false);
      expect(result.reason).toMatch(/dvandva/i);
    });

    test('should not apply when all members are variable case', () => {
      const compound = { 
        members: [
          { form: 'rāja', case: 'gen' },
          { form: 'putra', case: 'nom' }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.applied).toBe(false);
    });

    test('should not apply when no case information available', () => {
      const compound = { 
        members: [
          { form: 'rāja' },
          { form: 'puruṣa' }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.applied).toBe(false);
      expect(result.reason).toMatch(/case.*information/i);
    });

    test('should not apply to single member compounds', () => {
      const compound = { 
        members: [
          { form: 'go', fixedCase: true }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.applied).toBe(false);
      expect(result.reason).toMatch(/insufficient.*members/i);
    });
  });

  describe('Position analysis', () => {
    test('should handle first position fixed case', () => {
      const compound = { 
        members: [
          { form: 'ati', fixedCase: true, position: 'first' },
          { form: 'mānuṣa', case: 'acc' }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.positionAnalysis.firstPositionFixed).toBe(true);
      expect(result.applied).toBe(true);
    });

    test('should handle non-first position fixed case', () => {
      const compound = { 
        members: [
          { form: 'rāja', case: 'nom' },
          { form: 'iva', fixedCase: true, position: 'second' }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.positionAnalysis.nonFirstPositionFixed).toBe(true);
      expect(result.upasarjanaIndices).toContain(1);
    });

    test('should analyze position significance', () => {
      const compound = { 
        members: [
          { form: 'su', fixedCase: true },
          { form: 'ati', fixedCase: true },
          { form: 'mānuṣa', case: 'acc' }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.positionAnalysis.multipleFixedPositions).toBe(true);
      expect(result.upasarjanaIndices).toHaveLength(2);
    });
  });

  describe('Case validation functionality', () => {
    test('should validate fixed case properties', () => {
      const compound = { 
        members: [
          { form: 'upa', fixedCase: true, caseType: 'invariant' },
          { form: 'agni', case: 'loc', caseMarker: 'e' }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.caseValidation).toBeDefined();
      expect(result.caseValidation.validFixed).toBe(true);
    });

    test('should detect inconsistent case marking', () => {
      const compound = { 
        members: [
          { form: 'go', fixedCase: false, case: 'nom' },
          { form: 'rāja', fixedCase: true }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.caseValidation.inconsistentMarking).toBe(true);
    });
  });

  describe('Multi-script support', () => {
    test('should handle IAST input correctly', () => {
      const compound = { 
        members: [
          { form: 'ati', fixedCase: true },
          { form: 'mānuṣa', case: 'acc' }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.script).toBe('IAST');
      expect(result.applied).toBe(true);
    });

    test('should handle Devanagari input correctly', () => {
      const compound = { 
        members: [
          { form: 'अति', fixedCase: true },
          { form: 'मानुष', case: 'acc' }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.script).toBe('Devanagari');
      expect(result.applied).toBe(true);
    });

    test('should handle mixed script contexts', () => {
      const compound = { 
        members: [
          { form: 'ati', fixedCase: true },
          { form: 'मानुष', case: 'acc' }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.script).toBe('Mixed');
      expect(result.applied).toBe(true);
    });
  });

  describe('Edge cases and error handling', () => {
    test('should handle null input gracefully', () => {
      const result = applySutra1_2_44(null);
      expect(result.applied).toBe(false);
      expect(result.error).toMatch(/invalid.*input/i);
    });

    test('should handle undefined input gracefully', () => {
      const result = applySutra1_2_44(undefined);
      expect(result.applied).toBe(false);
      expect(result.error).toMatch(/invalid.*input/i);
    });

    test('should handle empty compound gracefully', () => {
      const result = applySutra1_2_44({});
      expect(result.applied).toBe(false);
      expect(result.error).toMatch(/missing.*members/i);
    });

    test('should handle compound with no members', () => {
      const result = applySutra1_2_44({ members: [] });
      expect(result.applied).toBe(false);
      expect(result.error).toMatch(/empty.*members/i);
    });

    test('should handle malformed member data', () => {
      const compound = { 
        members: [
          null,
          { form: 'rāja', case: 'nom' }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.applied).toBe(false);
      expect(result.error).toMatch(/malformed.*member/i);
    });

    test('should provide detailed analysis structure', () => {
      const compound = { 
        members: [
          { form: 'ati', fixedCase: true },
          { form: 'mānuṣa', case: 'acc' }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result).toHaveProperty('sutra');
      expect(result).toHaveProperty('applied');
      expect(result).toHaveProperty('upasarjanaIndices');
      expect(result).toHaveProperty('analysis');
      expect(result).toHaveProperty('confidence');
    });
  });

  describe('Word type analysis', () => {
    test('should analyze avyaya (indeclinable) words', () => {
      const compound = { 
        members: [
          { form: 'ati', fixedCase: true, type: 'avyaya' },
          { form: 'mānuṣa', case: 'acc' }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.wordTypeAnalysis.avyayaCount).toBe(1);
      expect(result.wordTypeAnalysis.hasAvyaya).toBe(true);
    });

    test('should analyze upasarga (prefixes)', () => {
      const compound = { 
        members: [
          { form: 'pra', fixedCase: true, type: 'upasarga' },
          { form: 'vāda', case: 'nom' }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.wordTypeAnalysis.upasargaCount).toBe(1);
      expect(result.wordTypeAnalysis.hasUpasarga).toBe(true);
    });

    test('should analyze particles', () => {
      const compound = { 
        members: [
          { form: 'eva', fixedCase: true, type: 'particle' },
          { form: 'karma', case: 'nom' }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.wordTypeAnalysis.particleCount).toBe(1);
      expect(result.wordTypeAnalysis.hasParticle).toBe(true);
    });
  });

  describe('Semantic analysis', () => {
    test('should analyze semantic roles with fixed case', () => {
      const compound = { 
        members: [
          { form: 'su', fixedCase: true, semanticRole: 'intensifier' },
          { form: 'karma', case: 'nom', semanticRole: 'action' }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.semanticAnalysis.upasarjanaRole).toBe('intensifier');
      expect(result.semanticAnalysis.pradhanaRole).toBe('action');
    });

    test('should analyze modification relationship', () => {
      const compound = { 
        members: [
          { form: 'ati', fixedCase: true, meaning: 'beyond' },
          { form: 'mānuṣa', case: 'acc', meaning: 'human' }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.semanticAnalysis.relationship).toBe('modification');
      expect(result.semanticAnalysis.dependency).toBe('fixed_modifier');
    });
  });

  describe('Contextual analysis', () => {
    test('should handle morphological context', () => {
      const compound = { 
        members: [
          { form: 'upa', fixedCase: true },
          { form: 'agni', case: 'acc' }
        ]
      };
      const context = { morphologicalRule: 'prefix_attachment', processType: 'upasarga_yoga' };
      const result = applySutra1_2_44(compound, context);
      expect(result.contextualAnalysis.morphologicalRule).toBe('prefix_attachment');
      expect(result.contextualAnalysis.processType).toBe('upasarga_yoga');
    });

    test('should handle syntactic context', () => {
      const compound = { 
        members: [
          { form: 'su', fixedCase: true },
          { form: 'karma', case: 'nom' }
        ]
      };
      const context = { syntacticFunction: 'adverbial_modifier', scope: 'verbal' };
      const result = applySutra1_2_44(compound, context);
      expect(result.contextualAnalysis.syntacticFunction).toBe('adverbial_modifier');
      expect(result.contextualAnalysis.scope).toBe('verbal');
    });
  });

  describe('Advanced features', () => {
    test('should handle complex compound structures', () => {
      const compound = { 
        members: [
          { 
            form: 'sukarma', 
            fixedCase: true,
            isCompound: true,
            subCompound: {
              members: [
                { form: 'su', fixedCase: true },
                { form: 'karma', case: 'nom' }
              ]
            }
          },
          { form: 'kārī', case: 'nom' }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.nestedAnalysis).toBeDefined();
      expect(result.nestedAnalysis.hasNestedCompounds).toBe(true);
    });

    test('should provide confidence scoring', () => {
      const compound = { 
        members: [
          { form: 'ati', fixedCase: true, certainty: 0.95 },
          { form: 'mānuṣa', case: 'acc', certainty: 0.9 }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.confidence).toBeLessThanOrEqual(1.0);
    });

    test('should handle rule precedence analysis', () => {
      const compound = { 
        members: [
          { form: 'ati', fixedCase: true, case: 'nom-rule' }, // Both 1.2.43 and 1.2.44 applicable
          { form: 'mānuṣa', case: 'acc' }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.rulePrecedence).toBeDefined();
      expect(result.rulePrecedence.applicableRules).toContain('1.2.44');
    });

    test('should analyze morphological processes', () => {
      const compound = { 
        members: [
          { form: 'pra', fixedCase: true, morphProcess: 'prefixation' },
          { form: 'karma', case: 'nom', morphProcess: 'nominal_base' }
        ]
      };
      const result = applySutra1_2_44(compound);
      expect(result.morphologicalAnalysis.processes).toContain('prefixation');
      expect(result.morphologicalAnalysis.processes).toContain('nominal_base');
    });
  });
});
