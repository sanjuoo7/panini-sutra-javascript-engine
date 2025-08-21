/**
 * Test Suite for Sutra 1.2.42: तत्पुरुषः समानाधिकरणः कर्मधारयः
 * "A tatpurusha compound with sama-adhikarana (same case/reference) is called karmadharaya"
 */
import { applySutra1_2_42 } from './index.js';

describe('Sutra 1.2.42: तत्पुरुषः समानाधिकरणः कर्मधारयः', () => {
  
  describe('Positive Cases: Karmadharaya Classification', () => {
    test('should classify simple nominative karmadharaya', () => {
      const compound = { 
        type: 'tatpurusha', 
        members: [
          { form: 'mahā', case: 'nom', meaning: 'great' },
          { form: 'rāja', case: 'nom', meaning: 'king' }
        ]
      };
      const result = applySutra1_2_42(compound);
      expect(result.sutra).toBe('1.2.42');
      expect(result.subtype).toBe('karmadharaya');
      expect(result.reason).toContain('1.2.42');
    });

    test('should handle accusative case karmadharaya', () => {
      const compound = { 
        type: 'tatpurusha', 
        members: [
          { form: 'uttama', case: 'acc', meaning: 'best' },
          { form: 'puruṣa', case: 'acc', meaning: 'person' }
        ]
      };
      const result = applySutra1_2_42(compound);
      expect(result.subtype).toBe('karmadharaya');
      expect(result.reason).toContain('identical');
    });

    test('should classify instrumental case karmadharaya', () => {
      const compound = { 
        type: 'tatpurusha', 
        members: [
          { form: 'śubha', case: 'instr', meaning: 'auspicious' },
          { form: 'karma', case: 'instr', meaning: 'action' }
        ]
      };
      const result = applySutra1_2_42(compound);
      expect(result.subtype).toBe('karmadharaya');
      expect(result.reason).toContain('All member cases identical');
    });

    test('should handle Devanagari script compounds', () => {
      const compound = { 
        type: 'tatpurusha', 
        members: [
          { form: 'महा', case: 'nom', meaning: 'great' },
          { form: 'राज', case: 'nom', meaning: 'king' }
        ]
      };
      const result = applySutra1_2_42(compound);
      expect(result.subtype).toBe('karmadharaya');
      expect(result.reason).toContain('1.2.42');
    });

    test('should classify three-member karmadharaya', () => {
      const compound = { 
        type: 'tatpurusha', 
        members: [
          { form: 'śubha', case: 'nom', meaning: 'good' },
          { form: 'uttama', case: 'nom', meaning: 'best' },
          { form: 'karma', case: 'nom', meaning: 'action' }
        ]
      };
      const result = applySutra1_2_42(compound);
      expect(result.subtype).toBe('karmadharaya');
      expect(result.reason).toContain('identical');
    });

    test('should handle genitive case karmadharaya', () => {
      const compound = { 
        type: 'tatpurusha', 
        members: [
          { form: 'dharma', case: 'gen', meaning: 'duty' },
          { form: 'rāja', case: 'gen', meaning: 'king' }
        ]
      };
      const result = applySutra1_2_42(compound);
      expect(result.subtype).toBe('karmadharaya');
    });

    test('should classify dative case karmadharaya', () => {
      const compound = { 
        type: 'tatpurusha', 
        members: [
          { form: 'guru', case: 'dat', meaning: 'teacher' },
          { form: 'bhakti', case: 'dat', meaning: 'devotion' }
        ]
      };
      const result = applySutra1_2_42(compound);
      expect(result.subtype).toBe('karmadharaya');
    });

    test('should handle ablative case karmadharaya', () => {
      const compound = { 
        type: 'tatpurusha', 
        members: [
          { form: 'grāma', case: 'abl', meaning: 'village' },
          { form: 'mukha', case: 'abl', meaning: 'face/chief' }
        ]
      };
      const result = applySutra1_2_42(compound);
      expect(result.subtype).toBe('karmadharaya');
    });

    test('should classify locative case karmadharaya', () => {
      const compound = { 
        type: 'tatpurusha', 
        members: [
          { form: 'vana', case: 'loc', meaning: 'forest' },
          { form: 'vāsa', case: 'loc', meaning: 'dwelling' }
        ]
      };
      const result = applySutra1_2_42(compound);
      expect(result.subtype).toBe('karmadharaya');
    });
  });

  describe('Negative Cases: Non-Karmadharaya', () => {
    test('should not classify when cases differ', () => {
      const compound = { 
        type: 'tatpurusha', 
        members: [
          { form: 'go', case: 'nom', meaning: 'cow' },
          { form: 'rakṣaka', case: 'instr', meaning: 'protector' }
        ]
      };
      const result = applySutra1_2_42(compound);
      expect(result.subtype).toBeNull();
      expect(result.reason).toContain('differ');
    });

    test('should not apply to non-tatpurusha compounds', () => {
      const compound = { 
        type: 'dvandva', 
        members: [
          { form: 'rāma', case: 'nom', meaning: 'Rama' },
          { form: 'lakṣmaṇa', case: 'nom', meaning: 'Lakshmana' }
        ]
      };
      const result = applySutra1_2_42(compound);
      expect(result.subtype).toBeNull();
      expect(result.reason).toContain('Not tatpurusha');
    });

    test('should not apply when compound type is missing', () => {
      const compound = { 
        members: [
          { form: 'mahā', case: 'nom', meaning: 'great' },
          { form: 'rāja', case: 'nom', meaning: 'king' }
        ]
      };
      const result = applySutra1_2_42(compound);
      expect(result.subtype).toBeNull();
      expect(result.reason).toContain('Not tatpurusha');
    });

    test('should not apply to bahuvrihi compounds', () => {
      const compound = { 
        type: 'bahuvrihi', 
        members: [
          { form: 'su', case: 'nom', meaning: 'good' },
          { form: 'mukha', case: 'nom', meaning: 'face' }
        ]
      };
      const result = applySutra1_2_42(compound);
      expect(result.subtype).toBeNull();
      expect(result.reason).toContain('Not tatpurusha');
    });

    test('should not classify when no case information available', () => {
      const compound = { 
        type: 'tatpurusha', 
        members: [
          { form: 'mahā', meaning: 'great' },
          { form: 'rāja', meaning: 'king' }
        ]
      };
      const result = applySutra1_2_42(compound);
      expect(result.subtype).toBeNull();
      expect(result.reason).toContain('No case data');
    });

    test('should not classify mixed case scenarios', () => {
      const compound = { 
        type: 'tatpurusha', 
        members: [
          { form: 'rāja', case: 'nom', meaning: 'king' },
          { form: 'putra', case: 'gen', meaning: 'son' },
          { form: 'dharma', case: 'acc', meaning: 'duty' }
        ]
      };
      const result = applySutra1_2_42(compound);
      expect(result.subtype).toBeNull();
      expect(result.reason).toContain('differ');
    });

    test('should handle invalid compound structure', () => {
      const result = applySutra1_2_42(null);
      expect(result.subtype).toBeNull();
      expect(result.reason).toContain('Not tatpurusha');
    });

    test('should handle compound with no members', () => {
      const compound = { type: 'tatpurusha', members: [] };
      const result = applySutra1_2_42(compound);
      expect(result.subtype).toBeNull();
      expect(result.reason).toContain('No case data');
    });
  });

  describe('Edge Cases and Complex Scenarios', () => {
    test('should handle single-member compound (edge case)', () => {
      const compound = { 
        type: 'tatpurusha', 
        members: [
          { form: 'rāja', case: 'nom', meaning: 'king' }
        ]
      };
      const result = applySutra1_2_42(compound);
      expect(result.subtype).toBe('karmadharaya');
      expect(result.reason).toContain('identical');
    });

    test('should handle partial case information', () => {
      const compound = { 
        type: 'tatpurusha', 
        members: [
          { form: 'mahā', case: 'nom', meaning: 'great' },
          { form: 'rāja', meaning: 'king' }, // no case
          { form: 'dharma', case: 'nom', meaning: 'duty' }
        ]
      };
      const result = applySutra1_2_42(compound);
      expect(result.subtype).toBe('karmadharaya');
    });

    test('should handle compound with null/undefined case values', () => {
      const compound = { 
        type: 'tatpurusha', 
        members: [
          { form: 'mahā', case: null, meaning: 'great' },
          { form: 'rāja', case: undefined, meaning: 'king' }
        ]
      };
      const result = applySutra1_2_42(compound);
      expect(result.subtype).toBeNull();
      expect(result.reason).toContain('No case data');
    });

    test('should handle compounds with empty case strings', () => {
      const compound = { 
        type: 'tatpurusha', 
        members: [
          { form: 'mahā', case: '', meaning: 'great' },
          { form: 'rāja', case: '', meaning: 'king' }
        ]
      };
      const result = applySutra1_2_42(compound);
      expect(result.subtype).toBeNull();
      expect(result.reason).toContain('No case data');
    });
  });

  describe('Multi-script Support', () => {
    test('should handle IAST input correctly', () => {
      const compound = { 
        type: 'tatpurusha', 
        members: [
          { form: 'mahārāja', case: 'nom', meaning: 'great king' },
          { form: 'putra', case: 'nom', meaning: 'son' }
        ]
      };
      const result = applySutra1_2_42(compound);
      expect(result.subtype).toBe('karmadharaya');
      expect(result.sutra).toBe('1.2.42');
    });

    test('should handle Devanagari input correctly', () => {
      const compound = { 
        type: 'tatpurusha', 
        members: [
          { form: 'महाराज', case: 'nom', meaning: 'great king' },
          { form: 'पुत्र', case: 'nom', meaning: 'son' }
        ]
      };
      const result = applySutra1_2_42(compound);
      expect(result.subtype).toBe('karmadharaya');
      expect(result.sutra).toBe('1.2.42');
    });

    test('should handle mixed script in different members', () => {
      const compound = { 
        type: 'tatpurusha', 
        members: [
          { form: 'उत्तम', case: 'acc', meaning: 'excellent' },
          { form: 'puruṣa', case: 'acc', meaning: 'person' }
        ]
      };
      const result = applySutra1_2_42(compound);
      expect(result.subtype).toBe('karmadharaya');
    });
  });

  describe('Semantic Analysis', () => {
    test('should identify adjective-noun karmadharaya', () => {
      const compound = { 
        type: 'tatpurusha', 
        members: [
          { form: 'śubha', case: 'nom', meaning: 'auspicious', pos: 'adj' },
          { form: 'karma', case: 'nom', meaning: 'action', pos: 'noun' }
        ]
      };
      const result = applySutra1_2_42(compound);
      expect(result.subtype).toBe('karmadharaya');
    });

    test('should identify noun-noun karmadharaya', () => {
      const compound = { 
        type: 'tatpurusha', 
        members: [
          { form: 'rāja', case: 'nom', meaning: 'king', pos: 'noun' },
          { form: 'putra', case: 'nom', meaning: 'son', pos: 'noun' }
        ]
      };
      const result = applySutra1_2_42(compound);
      expect(result.subtype).toBe('karmadharaya');
    });

    test('should handle compounds with semantic relationship', () => {
      const compound = { 
        type: 'tatpurusha', 
        members: [
          { form: 'dharma', case: 'gen', meaning: 'righteousness', semantic: 'abstract' },
          { form: 'rāja', case: 'gen', meaning: 'king', semantic: 'agent' }
        ]
      };
      const result = applySutra1_2_42(compound);
      expect(result.subtype).toBe('karmadharaya');
    });
  });

  describe('Classical Examples', () => {
    test('should classify mahārāja (great-king)', () => {
      const compound = { 
        type: 'tatpurusha', 
        members: [
          { form: 'mahā', case: 'nom', meaning: 'great' },
          { form: 'rāja', case: 'nom', meaning: 'king' }
        ]
      };
      const result = applySutra1_2_42(compound);
      expect(result.subtype).toBe('karmadharaya');
      expect(result.sutra).toBe('1.2.42');
    });

    test('should classify nīlotpala (blue-lotus)', () => {
      const compound = { 
        type: 'tatpurusha', 
        members: [
          { form: 'nīla', case: 'nom', meaning: 'blue' },
          { form: 'utpala', case: 'nom', meaning: 'lotus' }
        ]
      };
      const result = applySutra1_2_42(compound);
      expect(result.subtype).toBe('karmadharaya');
    });

    test('should classify uttamapuruṣa (excellent-person)', () => {
      const compound = { 
        type: 'tatpurusha', 
        members: [
          { form: 'uttama', case: 'nom', meaning: 'excellent' },
          { form: 'puruṣa', case: 'nom', meaning: 'person' }
        ]
      };
      const result = applySutra1_2_42(compound);
      expect(result.subtype).toBe('karmadharaya');
    });
  });

  describe('Input Validation', () => {
    test('should handle undefined input gracefully', () => {
      const result = applySutra1_2_42(undefined);
      expect(result.subtype).toBeNull();
      expect(result.reason).toContain('Not tatpurusha');
    });

    test('should handle non-object input', () => {
      const result = applySutra1_2_42("invalid");
      expect(result.subtype).toBeNull();
      expect(result.reason).toContain('Not tatpurusha');
    });

    test('should handle compound with non-array members', () => {
      const compound = { type: 'tatpurusha', members: 'invalid' };
      const result = applySutra1_2_42(compound);
      expect(result.subtype).toBeNull();
      expect(result.reason).toContain('Not tatpurusha');
    });
  });
});
