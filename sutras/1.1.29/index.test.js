/**
 * Test cases for Sutras 1.1.29, 1.1.30, 1.1.31
 * Testing सर्वनाम negation in various compound contexts
 */

import { 
  checkSarvanamaNegationInBahuvriihi,
  checkSarvanamaNegationInInstrumental,
  isDvandvaCompound,
  checkSarvanamaNegationInDvandva,
  analyzeSarvanamaWithCompoundExceptions,
  getApplicableNegationSutras,
  getDvandvaExamples,
  losesSarvanamaInCompound,
  getSarvanamaNegationReason,
  DVANDVA_PATTERNS
} from './index.js';

describe('Sutras 1.1.29, 1.1.30, 1.1.31: Compound Negation Rules', () => {
  
  describe('Sutra 1.1.29: न बहुव्रीहौ', () => {
    describe('checkSarvanamaNegationInBahuvriihi', () => {
      it('should negate सर्वनाम in बहुव्रीही compounds', () => {
        const context = { compoundType: 'bahuvriihi' };
        const result = checkSarvanamaNegationInBahuvriihi('sarva', context);
        
        expect(result.negated).toBe(true);
        expect(result.reason).toBe('bahuvriihi_compound');
        expect(result.sutra).toBe('1.1.29');
        expect(result.explanation).toContain('not सर्वनाम in बहुव्रीही');
      });

      it('should work with Devanagari compound type', () => {
        const context = { compoundType: 'बहुव्रीही' };
        const result = checkSarvanamaNegationInBahuvriihi('सर्व', context);
        
        expect(result.negated).toBe(true);
        expect(result.reason).toBe('bahuvriihi_compound');
        expect(result.sutra).toBe('1.1.29');
      });

      it('should not negate non-सर्वनाम words', () => {
        const context = { compoundType: 'bahuvriihi' };
        const result = checkSarvanamaNegationInBahuvriihi('guru', context);
        
        expect(result.negated).toBe(false);
        expect(result.reason).toBe('not_sarvanama');
      });

      it('should not negate in non-बहुव्रीही compounds', () => {
        const context = { compoundType: 'tatpurusha' };
        const result = checkSarvanamaNegationInBahuvriihi('sarva', context);
        
        expect(result.negated).toBe(false);
        expect(result.reason).toBe('not_bahuvriihi');
      });

      it('should handle edge cases', () => {
        const result1 = checkSarvanamaNegationInBahuvriihi('');
        expect(result1.negated).toBe(false);

        const result2 = checkSarvanamaNegationInBahuvriihi(null);
        expect(result2.negated).toBe(false);
      });
    });
  });

  describe('Sutra 1.1.30: तृतीयासमासे', () => {
    describe('checkSarvanamaNegationInInstrumental', () => {
      it('should negate सर्वनाम in instrumental compounds', () => {
        const context = { compoundType: 'instrumental' };
        const result = checkSarvanamaNegationInInstrumental('sarva', context);
        
        expect(result.negated).toBe(true);
        expect(result.reason).toBe('instrumental_compound');
        expect(result.sutra).toBe('1.1.30');
        expect(result.explanation).toContain('instrumental determinative compounds');
      });

      it('should work with तृतीयासमास designation', () => {
        const context = { compoundType: 'तृतीयासमास' };
        const result = checkSarvanamaNegationInInstrumental('सर्व', context);
        
        expect(result.negated).toBe(true);
        expect(result.reason).toBe('instrumental_compound');
      });

      it('should work with case designation', () => {
        const context = { case: 'instrumental' };
        const result = checkSarvanamaNegationInInstrumental('sarva', context);
        
        expect(result.negated).toBe(true);
        expect(result.reason).toBe('instrumental_compound');
      });

      it('should work with vibhakti designation', () => {
        const context1 = { vibhakti: 'tṛtīyā' };
        const result1 = checkSarvanamaNegationInInstrumental('sarva', context1);
        expect(result1.negated).toBe(true);

        const context2 = { vibhakti: 'तृतीया' };
        const result2 = checkSarvanamaNegationInInstrumental('सर्व', context2);
        expect(result2.negated).toBe(true);
      });

      it('should not negate non-सर्वनाम words', () => {
        const context = { compoundType: 'instrumental' };
        const result = checkSarvanamaNegationInInstrumental('guru', context);
        
        expect(result.negated).toBe(false);
        expect(result.reason).toBe('not_sarvanama');
      });

      it('should not negate in non-instrumental contexts', () => {
        const context = { compoundType: 'tatpurusha' };
        const result = checkSarvanamaNegationInInstrumental('sarva', context);
        
        expect(result.negated).toBe(false);
        expect(result.reason).toBe('not_instrumental_compound');
      });

      it('should handle edge cases', () => {
        const result1 = checkSarvanamaNegationInInstrumental('');
        expect(result1.negated).toBe(false);

        const result2 = checkSarvanamaNegationInInstrumental(null);
        expect(result2.negated).toBe(false);
      });
    });
  });

  describe('Sutra 1.1.31: द्वन्द्वे च', () => {
    describe('isDvandvaCompound', () => {
      it('should identify known द्वन्द्व patterns', () => {
        expect(isDvandvaCompound('sarvānya')).toBe(true);     // all and other
        expect(isDvandvaCompound('sarvabahu')).toBe(true);    // all and many
        expect(isDvandvaCompound('anyabahu')).toBe(true);     // other and many
        expect(isDvandvaCompound('sarvaviśva')).toBe(true);   // all and universal
        
        expect(isDvandvaCompound('सर्वान्य')).toBe(true);
        expect(isDvandvaCompound('सर्वबहु')).toBe(true);
        expect(isDvandvaCompound('अन्यबहु')).toBe(true);
      });

      it('should reject non-द्वन्द्व compounds', () => {
        expect(isDvandvaCompound('sarvaguṇa')).toBe(false);   // not द्वन्द्व
        expect(isDvandvaCompound('anyarūpa')).toBe(false);    // not द्वन्द्व
        expect(isDvandvaCompound('सर्वगुण')).toBe(false);
      });

      it('should handle edge cases', () => {
        expect(isDvandvaCompound('')).toBe(false);
        expect(isDvandvaCompound(null)).toBe(false);
      });
    });

    describe('checkSarvanamaNegationInDvandva', () => {
      it('should negate सर्वनाम in द्वन्द्व compounds', () => {
        const context = { compoundType: 'dvandva' };
        const result = checkSarvanamaNegationInDvandva('sarva', context);
        
        expect(result.negated).toBe(true);
        expect(result.reason).toBe('dvandva_compound');
        expect(result.sutra).toBe('1.1.31');
        expect(result.explanation).toContain('not सर्वनाम in द्वन्द्व');
      });

      it('should work with Devanagari compound type', () => {
        const context = { compoundType: 'द्वन्द्व' };
        const result = checkSarvanamaNegationInDvandva('सर्व', context);
        
        expect(result.negated).toBe(true);
        expect(result.reason).toBe('dvandva_compound');
      });

      it('should work with known द्वन्द्व compounds', () => {
        const context = { compound: 'sarvānya' };
        const result = checkSarvanamaNegationInDvandva('sarva', context);
        
        expect(result.negated).toBe(true);
        expect(result.reason).toBe('dvandva_compound');
      });

      it('should not negate non-सर्वनाम words', () => {
        const context = { compoundType: 'dvandva' };
        const result = checkSarvanamaNegationInDvandva('guru', context);
        
        expect(result.negated).toBe(false);
        expect(result.reason).toBe('not_sarvanama');
      });

      it('should not negate in non-द्वन्द्व contexts', () => {
        const context = { compoundType: 'tatpurusha' };
        const result = checkSarvanamaNegationInDvandva('sarva', context);
        
        expect(result.negated).toBe(false);
        expect(result.reason).toBe('not_dvandva');
      });

      it('should handle edge cases', () => {
        const result1 = checkSarvanamaNegationInDvandva('');
        expect(result1.negated).toBe(false);

        const result2 = checkSarvanamaNegationInDvandva(null);
        expect(result2.negated).toBe(false);
      });
    });
  });

  describe('Comprehensive Analysis', () => {
    describe('analyzeSarvanamaWithCompoundExceptions', () => {
      it('should handle बहुव्रीही negation', () => {
        const context = { compoundType: 'bahuvriihi' };
        const result = analyzeSarvanamaWithCompoundExceptions('sarva', context);
        
        expect(result.isSarvanama).toBe(false); // Negated
        expect(result.status).toBe('sarvanama_negated_by_compound');
        expect(result.exceptions.length).toBe(1);
        expect(result.exceptions[0].sutra).toBe('1.1.29');
        expect(result.appliedSutras).toContain('1.1.29');
      });

      it('should handle instrumental negation', () => {
        const context = { compoundType: 'instrumental' };
        const result = analyzeSarvanamaWithCompoundExceptions('sarva', context);
        
        expect(result.isSarvanama).toBe(false);
        expect(result.status).toBe('sarvanama_negated_by_compound');
        expect(result.exceptions[0].sutra).toBe('1.1.30');
        expect(result.appliedSutras).toContain('1.1.30');
      });

      it('should handle द्वन्द्व negation', () => {
        const context = { compoundType: 'dvandva' };
        const result = analyzeSarvanamaWithCompoundExceptions('sarva', context);
        
        expect(result.isSarvanama).toBe(false);
        expect(result.status).toBe('sarvanama_negated_by_compound');
        expect(result.exceptions[0].sutra).toBe('1.1.31');
        expect(result.appliedSutras).toContain('1.1.31');
      });

      it('should handle multiple applicable negations', () => {
        const context = { 
          compoundType: 'bahuvriihi',
          case: 'instrumental' // Both 1.1.29 and 1.1.30 could apply
        };
        const result = analyzeSarvanamaWithCompoundExceptions('sarva', context);
        
        expect(result.isSarvanama).toBe(false);
        expect(result.status).toBe('sarvanama_negated_by_compound');
        expect(result.exceptions.length).toBeGreaterThanOrEqual(1);
      });

      it('should maintain सर्वनाम in non-negating contexts', () => {
        const context = { compoundType: 'tatpurusha' };
        const result = analyzeSarvanamaWithCompoundExceptions('sarva', context);
        
        expect(result.isSarvanama).toBe(true);
        expect(result.status).toBe('definite_sarvanama');
        expect(result.exceptions.length).toBe(0);
        expect(result.baseStatus).toBe('sarvanama_by_1.1.27');
      });

      it('should handle non-सर्वनाम words', () => {
        const result = analyzeSarvanamaWithCompoundExceptions('guru');
        
        expect(result.isSarvanama).toBe(false);
        expect(result.status).toBe('not_sarvanama');
        expect(result.baseStatus).toBe('not_sarvanama_by_1.1.27');
      });

      it('should handle edge cases', () => {
        const result1 = analyzeSarvanamaWithCompoundExceptions('');
        expect(result1.isSarvanama).toBe(false);

        const result2 = analyzeSarvanamaWithCompoundExceptions(null);
        expect(result2.isSarvanama).toBe(false);
      });
    });

    describe('getApplicableNegationSutras', () => {
      it('should identify applicable sutras for बहुव्रीही', () => {
        const context = { compoundType: 'bahuvriihi' };
        const sutras = getApplicableNegationSutras(context);
        expect(sutras).toContain('1.1.29');
      });

      it('should identify applicable sutras for instrumental', () => {
        const context = { compoundType: 'instrumental' };
        const sutras = getApplicableNegationSutras(context);
        expect(sutras).toContain('1.1.30');
      });

      it('should identify applicable sutras for द्वन्द्व', () => {
        const context = { compoundType: 'dvandva' };
        const sutras = getApplicableNegationSutras(context);
        expect(sutras).toContain('1.1.31');
      });

      it('should handle multiple applicable sutras', () => {
        const context = { 
          compoundType: 'bahuvriihi',
          case: 'instrumental'
        };
        const sutras = getApplicableNegationSutras(context);
        expect(sutras).toContain('1.1.29');
        expect(sutras).toContain('1.1.30');
      });

      it('should return empty for non-applicable contexts', () => {
        const context = { compoundType: 'tatpurusha' };
        const sutras = getApplicableNegationSutras(context);
        expect(sutras.length).toBe(0);
      });
    });
  });

  describe('Utility Functions', () => {
    describe('getDvandvaExamples', () => {
      it('should return IAST examples by default', () => {
        const examples = getDvandvaExamples();
        expect(examples).toContain('sarvānya');
        expect(examples).toContain('sarvabahu');
        expect(examples).toContain('anyabahu');
        expect(examples).toContain('sarvaviśva');
      });

      it('should return Devanagari examples when requested', () => {
        const examples = getDvandvaExamples('Devanagari');
        expect(examples).toContain('सर्वान्य');
        expect(examples).toContain('सर्वबहु');
        expect(examples).toContain('अन्यबहु');
        expect(examples).toContain('सर्वविश्व');
      });
    });

    describe('losesSarvanamaInCompound', () => {
      it('should return true when सर्वनाम status is lost', () => {
        const context = { compoundType: 'bahuvriihi' };
        expect(losesSarvanamaInCompound('sarva', context)).toBe(true);
        
        const context2 = { compoundType: 'dvandva' };
        expect(losesSarvanamaInCompound('anya', context2)).toBe(true);
      });

      it('should return false when सर्वनाम status is retained', () => {
        const context = { compoundType: 'tatpurusha' };
        expect(losesSarvanamaInCompound('sarva', context)).toBe(false);
      });

      it('should return false for non-सर्वनाम words', () => {
        const context = { compoundType: 'bahuvriihi' };
        expect(losesSarvanamaInCompound('guru', context)).toBe(false);
      });
    });

    describe('getSarvanamaNegationReason', () => {
      it('should return negation reason when applicable', () => {
        const context = { compoundType: 'bahuvriihi' };
        const reason = getSarvanamaNegationReason('sarva', context);
        expect(reason).toContain('not सर्वनाम in बहुव्रीही');
      });

      it('should return null when no negation applies', () => {
        const context = { compoundType: 'tatpurusha' };
        const reason = getSarvanamaNegationReason('sarva', context);
        expect(reason).toBe(null);
      });
    });
  });

  describe('Real-world Examples', () => {
    it('should work with classical compound examples', () => {
      // बहुव्रीही: सर्वगुण (having all qualities) - negates सर्वनाम
      const bahuvriihiContext = { compoundType: 'bahuvriihi' };
      expect(losesSarvanamaInCompound('sarva', bahuvriihiContext)).toBe(true);
      
      // द्वन्द्व: सर्वान्य (all and other) - negates सर्वनाम
      const dvandvaContext = { compound: 'sarvānya' };
      expect(losesSarvanamaInCompound('sarva', dvandvaContext)).toBe(true);
    });

    it('should distinguish negating vs. non-negating compounds', () => {
      // तत्पुरुष: सर्वराज (king of all) - retains सर्वनाम
      const tatpurushaContext = { compoundType: 'tatpurusha' };
      expect(losesSarvanamaInCompound('sarva', tatpurushaContext)).toBe(false);
      
      // अव्ययीभाव: सर्वत्र (everywhere) - retains सर्वनाम
      const avyayibhavaContext = { compoundType: 'avyayibhava' };
      expect(losesSarvanamaInCompound('sarva', avyayibhavaContext)).toBe(false);
    });

    it('should support comprehensive grammatical analysis', () => {
      // Complete analysis for compound contexts
      const analysis = analyzeSarvanamaWithCompoundExceptions('viśva', {
        compoundType: 'bahuvriihi',
        compound: 'viśvaguṇa'
      });
      
      expect(analysis.baseStatus).toBe('sarvanama_by_1.1.27');
      expect(analysis.isSarvanama).toBe(false); // Negated by 1.1.29
      expect(analysis.appliedSutras).toContain('1.1.29');
    });

    it('should work with different compound types', () => {
      // Multiple negation contexts
      const contexts = [
        { compoundType: 'bahuvriihi', expected: '1.1.29' },
        { compoundType: 'instrumental', expected: '1.1.30' },
        { compoundType: 'dvandva', expected: '1.1.31' }
      ];
      
      contexts.forEach(({ compoundType, expected }) => {
        const sutras = getApplicableNegationSutras({ compoundType });
        expect(sutras).toContain(expected);
      });
    });

    it('should integrate with exception hierarchy', () => {
      // 1.1.28 (optional) vs. 1.1.29 (definite negation) interaction
      // When both directional and बहुव्रीही contexts apply
      const complexContext = {
        compoundType: 'bahuvriihi',
        compound: 'sarvapūrva'  // Directional बहुव्रीही
      };
      
      // This would require integration between 1.1.28 and 1.1.29
      // The optionality of 1.1.28 vs. definiteness of 1.1.29
      const analysis = analyzeSarvanamaWithCompoundExceptions('sarva', complexContext);
      expect(analysis.appliedSutras).toContain('1.1.29');
    });
  });
});
