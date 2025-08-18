/**
 * Test cases for Sutra 1.1.22: तरप्तमपौ घः
 * Testing the घ classification for comparative and superlative affixes
 */

import { 
  isGha,
  getGhaAffixes,
  hasGhaAffix,
  identifyGhaType,
  hasGhaBehavior,
  getGhaExamples,
  analyzeGha
} from './index.js';

describe('Sutra 1.1.22: तरप्तमपौ घः', () => {
  describe('isGha', () => {
    it('should identify तरप् as घ', () => {
      expect(isGha('tarap')).toBe(true);
      expect(isGha('तरप्')).toBe(true);
    });

    it('should identify तमप् as घ', () => {
      expect(isGha('tamap')).toBe(true);
      expect(isGha('तमप्')).toBe(true);
    });

    it('should reject other affixes as not घ', () => {
      expect(isGha('kta')).toBe(false);
      expect(isGha('ktavatu')).toBe(false);
      expect(isGha('tya')).toBe(false);
      expect(isGha('क्त')).toBe(false);
      expect(isGha('त्य')).toBe(false);
    });

    it('should handle similar but different affixes', () => {
      expect(isGha('tara')).toBe(false);
      expect(isGha('tama')).toBe(false);
      expect(isGha('तर')).toBe(false);
      expect(isGha('तम')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isGha('')).toBe(false);
      expect(isGha(null)).toBe(false);
    });
  });

  describe('getGhaAffixes', () => {
    it('should return IAST affixes by default', () => {
      const affixes = getGhaAffixes();
      expect(affixes).toContain('tarap');
      expect(affixes).toContain('tamap');
      expect(affixes.length).toBe(2);
    });

    it('should return IAST affixes when explicitly requested', () => {
      const affixes = getGhaAffixes('IAST');
      expect(affixes).toContain('tarap');
      expect(affixes).toContain('tamap');
    });

    it('should return Devanagari affixes when requested', () => {
      const affixes = getGhaAffixes('Devanagari');
      expect(affixes).toContain('तरप्');
      expect(affixes).toContain('तमप्');
      expect(affixes.length).toBe(2);
    });
  });

  describe('hasGhaAffix', () => {
    it('should identify words containing तरप्', () => {
      expect(hasGhaAffix('gurutarap')).toBe(true);
      expect(hasGhaAffix('laghutarap')).toBe(true);
      expect(hasGhaAffix('गुरुतरप्')).toBe(true);
      expect(hasGhaAffix('लघुतरप्')).toBe(true);
    });

    it('should identify words containing तमप्', () => {
      expect(hasGhaAffix('gurutamap')).toBe(true);
      expect(hasGhaAffix('laghutamap')).toBe(true);
      expect(hasGhaAffix('गुरुतमप्')).toBe(true);
      expect(hasGhaAffix('लघुतमप्')).toBe(true);
    });

    it('should reject words without घ affixes', () => {
      expect(hasGhaAffix('guru')).toBe(false);
      expect(hasGhaAffix('laghu')).toBe(false);
      expect(hasGhaAffix('गुरु')).toBe(false);
      expect(hasGhaAffix('लघु')).toBe(false);
    });

    it('should reject words with similar but different affixes', () => {
      expect(hasGhaAffix('gurutara')).toBe(false);
      expect(hasGhaAffix('gurutama')).toBe(false);
      expect(hasGhaAffix('गुरुतर')).toBe(false);
      expect(hasGhaAffix('गुरुतम')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(hasGhaAffix('')).toBe(false);
      expect(hasGhaAffix(null)).toBe(false);
    });
  });

  describe('identifyGhaType', () => {
    it('should identify comparative forms', () => {
      const result1 = identifyGhaType('gurutarap');
      expect(result1.hasGha).toBe(true);
      expect(result1.type).toBe('tarap');
      expect(result1.degree).toBe('comparative');
      expect(result1.script).toBe('IAST');

      const result2 = identifyGhaType('गुरुतरप्');
      expect(result2.hasGha).toBe(true);
      expect(result2.type).toBe('तरप्');
      expect(result2.degree).toBe('comparative');
      expect(result2.script).toBe('Devanagari');
    });

    it('should identify superlative forms', () => {
      const result1 = identifyGhaType('gurutamap');
      expect(result1.hasGha).toBe(true);
      expect(result1.type).toBe('tamap');
      expect(result1.degree).toBe('superlative');
      expect(result1.script).toBe('IAST');

      const result2 = identifyGhaType('गुरुतमप्');
      expect(result2.hasGha).toBe(true);
      expect(result2.type).toBe('तमप्');
      expect(result2.degree).toBe('superlative');
      expect(result2.script).toBe('Devanagari');
    });

    it('should return negative results for non-घ words', () => {
      const result = identifyGhaType('guru');
      expect(result.hasGha).toBe(false);
      expect(result.type).toBe(null);
      expect(result.degree).toBe(null);
    });

    it('should handle edge cases', () => {
      const result1 = identifyGhaType('');
      expect(result1.hasGha).toBe(false);

      const result2 = identifyGhaType(null);
      expect(result2.hasGha).toBe(false);
    });
  });

  describe('hasGhaBehavior', () => {
    it('should return true for घ affixes', () => {
      expect(hasGhaBehavior('tarap')).toBe(true);
      expect(hasGhaBehavior('tamap')).toBe(true);
      expect(hasGhaBehavior('तरप्')).toBe(true);
      expect(hasGhaBehavior('तमप्')).toBe(true);
    });

    it('should return true for words with घ affixes', () => {
      expect(hasGhaBehavior('gurutarap')).toBe(true);
      expect(hasGhaBehavior('laghutamap')).toBe(true);
      expect(hasGhaBehavior('श्रेष्ठतरप्')).toBe(true);
    });

    it('should return false for non-घ words', () => {
      expect(hasGhaBehavior('guru')).toBe(false);
      expect(hasGhaBehavior('kta')).toBe(false);
      expect(hasGhaBehavior('गुरु')).toBe(false);
    });

    it('should work with grammatical context', () => {
      const context = { morphology: 'comparison' };
      expect(hasGhaBehavior('tarap', context)).toBe(true);
      expect(hasGhaBehavior('guru', context)).toBe(false);
    });
  });

  describe('getGhaExamples', () => {
    it('should return IAST examples by default', () => {
      const examples = getGhaExamples();
      expect(examples.tarap).toContain('gurutarap');
      expect(examples.tamap).toContain('gurutamap');
      expect(examples.tarap).toContain('laghutarap');
      expect(examples.tamap).toContain('laghutamap');
    });

    it('should return IAST examples when explicitly requested', () => {
      const examples = getGhaExamples('IAST');
      expect(examples.tarap).toContain('śreṣṭhatarap');
      expect(examples.tamap).toContain('śreṣṭhatamap');
    });

    it('should return Devanagari examples when requested', () => {
      const examples = getGhaExamples('Devanagari');
      expect(examples.tarap).toContain('गुरुतरप्');
      expect(examples.tamap).toContain('गुरुतमप्');
      expect(examples.tarap).toContain('लघुतरप्');
      expect(examples.tamap).toContain('लघुतमप्');
    });

    it('should return consistent structure', () => {
      const iastExamples = getGhaExamples('IAST');
      const devanagariExamples = getGhaExamples('Devanagari');
      
      expect(iastExamples.tarap.length).toEqual(devanagariExamples.tarap.length);
      expect(iastExamples.tamap.length).toEqual(devanagariExamples.tamap.length);
    });
  });

  describe('real-world examples', () => {
    it('should work with adjective comparison', () => {
      // Comparative forms
      expect(hasGhaAffix('gurutarap')).toBe(true); // heavier
      expect(hasGhaAffix('laghutarap')).toBe(true); // lighter
      expect(hasGhaAffix('गुरुतरप्')).toBe(true);
      
      // Superlative forms
      expect(hasGhaAffix('gurutamap')).toBe(true); // heaviest
      expect(hasGhaAffix('laghutamap')).toBe(true); // lightest
      expect(hasGhaAffix('गुरुतमप्')).toBe(true);
    });

    it('should identify degree of comparison', () => {
      const comp = identifyGhaType('श्रेष्ठतरप्');
      expect(comp.degree).toBe('comparative');
      
      const sup = identifyGhaType('श्रेष्ठतमप्');
      expect(sup.degree).toBe('superlative');
    });

    it('should distinguish from regular adjectives', () => {
      expect(hasGhaAffix('guru')).toBe(false); // heavy (positive)
      expect(hasGhaAffix('laghu')).toBe(false); // light (positive)
      expect(hasGhaAffix('śreṣṭha')).toBe(false); // excellent (positive)
      expect(hasGhaAffix('गुरु')).toBe(false);
    });

    it('should work in grammatical analysis', () => {
      // For grammatical rules that specifically target घ affixes
      expect(isGha('tarap')).toBe(true);
      expect(isGha('tamap')).toBe(true);
      
      // But not other comparative/superlative formations
      expect(isGha('tara')).toBe(false); // alternative comparative
      expect(isGha('tama')).toBe(false); // alternative superlative
    });

    it('should support morphological parsing', () => {
      // Complete morphological analysis
      const analysis = identifyGhaType('laghutarap');
      expect(analysis.hasGha).toBe(true);
      expect(analysis.type).toBe('tarap');
      expect(analysis.degree).toBe('comparative');
      
      // Base word would be 'laghu', affix is 'tarap' (which is घ)
    });
  });

  describe('analyzeGha (Comprehensive Analysis)', () => {
    describe('Valid Gha Affixes', () => {
      it('should analyze तरप् (tarap - comparative) correctly', () => {
        const result = analyzeGha('tarap');
        
        expect(result.isValid).toBe(true);
        expect(result.isGha).toBe(true);
        expect(result.input).toBe('tarap');
        expect(result.normalizedInput).toBe('tarap');
        expect(result.analysis).toBeDefined();
        expect(result.analysis.morphological.affixType).toBe('tarap');
        expect(result.analysis.morphological.degree).toBe('comparative');
        expect(result.analysis.morphological.category).toBe('comparative-superlative');
        expect(result.analysis.semantic.function).toBe('degree-formation');
        expect(result.analysis.semantic.meaning).toBe('more/greater degree');
        expect(result.analysis.syntactic.classification).toBe('gha');
        expect(result.confidence).toBeGreaterThan(0.9);
        expect(result.metadata.sutraNumber).toBe('1.1.22');
      });

      it('should analyze तमप् (tamap - superlative) correctly', () => {
        const result = analyzeGha('tamap');
        
        expect(result.isValid).toBe(true);
        expect(result.isGha).toBe(true);
        expect(result.analysis.morphological.affixType).toBe('tamap');
        expect(result.analysis.morphological.degree).toBe('superlative');
        expect(result.analysis.semantic.meaning).toBe('most/highest degree');
        expect(result.analysis.semantic.semanticRole).toBe('superlative');
        expect(result.confidence).toBeGreaterThan(0.9);
      });

      it('should analyze Devanagari gha affixes correctly', () => {
        const result1 = analyzeGha('तरप्');
        const result2 = analyzeGha('तमप्');
        
        expect(result1.isGha).toBe(true);
        expect(result1.analysis.morphological.script).toBe('Devanagari');
        expect(result2.isGha).toBe(true);
        expect(result2.analysis.morphological.script).toBe('Devanagari');
      });

      it('should provide traditional commentary references', () => {
        const result = analyzeGha('tarap');
        
        expect(result.metadata.commentaryReferences).toContain('Kāśikā');
        expect(result.metadata.traditionalExplanation).toContain('तरप्तमपौ इत्येतौ प्रत्ययौ');
        expect(result.metadata.modernExplanation).toContain('technical term "gha"');
      });
    });

    describe('Non-Gha Inputs', () => {
      it('should handle non-gha affixes correctly', () => {
        const result = analyzeGha('kta');
        
        expect(result.isValid).toBe(true);
        expect(result.isGha).toBe(false);
        expect(result.analysis.morphological.affixType).toBe('non-gha');
        expect(result.analysis.semantic.function).toBe('non-degree-formation');
        expect(result.analysis.syntactic.classification).toBe('non-gha');
        expect(result.confidence).toBeLessThan(0.5);
      });

      it('should handle invalid Sanskrit input', () => {
        const result = analyzeGha('xyz');
        
        expect(result.isValid).toBe(false);
        expect(result.isGha).toBe(false);
        expect(result.errors).toContain('Invalid Sanskrit input');
        expect(result.confidence).toBe(0);
      });

      it('should handle empty or null input', () => {
        const result1 = analyzeGha('');
        const result2 = analyzeGha(null);
        const result3 = analyzeGha(undefined);
        
        [result1, result2, result3].forEach(result => {
          expect(result.isValid).toBe(false);
          expect(result.isGha).toBe(false);
          expect(result.errors).toContain('Input is required');
          expect(result.confidence).toBe(0);
        });
      });
    });

    describe('Context-Aware Analysis', () => {
      it('should provide enhanced analysis with usage examples', () => {
        const result = analyzeGha('tarap', { 
          includeUsageExamples: true,
          includeRelatedRules: true 
        });
        
        expect(result.isGha).toBe(true);
        expect(result.metadata.usageExamples).toBeDefined();
        expect(result.metadata.relatedRules).toBeDefined();
        expect(result.metadata.relatedRules.length).toBeGreaterThan(0);
      });

      it('should handle attachment context', () => {
        const result = analyzeGha('tamap', { attachmentType: 'suffix' });
        
        expect(result.isGha).toBe(true);
        expect(result.analysis.syntactic.attachmentType).toBe('suffix');
      });

      it('should handle script variations consistently', () => {
        const resultIAST = analyzeGha('tarap');
        const resultDev = analyzeGha('तरप्');
        
        expect(resultIAST.isGha).toBe(resultDev.isGha);
        expect(resultIAST.analysis.semantic.domain).toBe(resultDev.analysis.semantic.domain);
        expect(resultIAST.confidence).toBe(resultDev.confidence);
      });
    });

    describe('Morphological Analysis', () => {
      it('should identify affix characteristics correctly', () => {
        const result = analyzeGha('tarap');
        
        expect(result.analysis.morphological.morphClass).toBe('taddhita-pratyaya');
        expect(result.analysis.morphological.formation).toBe('primary-affix');
        expect(result.analysis.morphological.category).toBe('comparative-superlative');
      });

      it('should distinguish between comparative and superlative', () => {
        const comparativeResult = analyzeGha('tarap');
        const superlativeResult = analyzeGha('tamap');
        
        expect(comparativeResult.analysis.morphological.degree).toBe('comparative');
        expect(superlativeResult.analysis.morphological.degree).toBe('superlative');
        
        expect(comparativeResult.analysis.semantic.meaning).toContain('more');
        expect(superlativeResult.analysis.semantic.meaning).toContain('most');
      });
    });

    describe('Semantic Analysis', () => {
      it('should categorize semantic functions correctly', () => {
        const result = analyzeGha('tamap');
        
        expect(result.analysis.semantic.function).toBe('degree-formation');
        expect(result.analysis.semantic.category).toBe('qualitative-gradation');
        expect(result.analysis.semantic.domain).toBe('degree-comparison');
      });
    });

    describe('Syntactic Analysis', () => {
      it('should identify grammatical function correctly', () => {
        const result = analyzeGha('tarap');
        
        expect(result.analysis.syntactic.ruleType).toBe('saṃjñā');
        expect(result.analysis.syntactic.grammaticalFunction).toBe('affix-designation');
        expect(result.analysis.syntactic.applicableRules).toContain('1.1.22');
        expect(result.analysis.syntactic.syntacticBehavior).toBe('special-gha-rules');
      });
    });

    describe('Confidence Scoring', () => {
      it('should assign high confidence to valid gha affixes', () => {
        const result1 = analyzeGha('tarap');
        const result2 = analyzeGha('tamap');
        
        expect(result1.confidence).toBeGreaterThan(0.9);
        expect(result2.confidence).toBeGreaterThan(0.9);
      });

      it('should assign low confidence to non-gha affixes', () => {
        const result = analyzeGha('kta');
        expect(result.confidence).toBeLessThan(0.5);
      });

      it('should assign zero confidence to invalid inputs', () => {
        const result = analyzeGha('invalid');
        expect(result.confidence).toBe(0);
      });
    });
  });
});
