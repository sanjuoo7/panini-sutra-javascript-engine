import { 
  sutra1153, 
  isNgitSubstitute, 
  applyNgitSubstitution,
  extractFinalLetter,
  removeItMarkers 
} from './index.js';

describe('Sutra 1.1.53: ङिच्च (ṅicca)', () => {
  
  describe('isNgitSubstitute', () => {
    test('should identify ङित् substitutes correctly (IAST)', () => {
      expect(isNgitSubstitute('karaṅ')).toBe(true);
      expect(isNgitSubstitute('gachaṅ')).toBe(true);
      expect(isNgitSubstitute('stavaṅ')).toBe(true);
    });

    test('should identify ङित् substitutes correctly (Devanagari)', () => {
      expect(isNgitSubstitute('करङ्')).toBe(true);
      expect(isNgitSubstitute('गछङ्')).toBe(true);
      expect(isNgitSubstitute('स्तवङ्')).toBe(true);
    });

    test('should reject non-ङित् forms', () => {
      expect(isNgitSubstitute('kara')).toBe(false);
      expect(isNgitSubstitute('gacha')).toBe(false);
      expect(isNgitSubstitute('stava')).toBe(false);
      expect(isNgitSubstitute('karañ')).toBe(false); // different nasal
    });

    test('should handle edge cases', () => {
      expect(isNgitSubstitute('')).toBe(false);
      expect(isNgitSubstitute('ṅ')).toBe(true); // single ङ्
      expect(isNgitSubstitute('aṅ')).toBe(true);
    });
  });

  describe('extractFinalLetter', () => {
    test('should extract final letters correctly (IAST)', () => {
      expect(extractFinalLetter('kṛ')).toBe('ṛ');
      expect(extractFinalLetter('gam')).toBe('m');
      expect(extractFinalLetter('stu')).toBe('u');
      expect(extractFinalLetter('bandh')).toBe('h');
    });

    test('should extract final letters correctly (Devanagari)', () => {
      expect(extractFinalLetter('कृ')).toBe('ृ');
      expect(extractFinalLetter('गम्')).toBe('म्');
      expect(extractFinalLetter('स्तु')).toBe('ु');
      expect(extractFinalLetter('बन्ध्')).toBe('ध्');
    });

    test('should handle single letters', () => {
      expect(extractFinalLetter('k')).toBe('k');
      expect(extractFinalLetter('क')).toBe('क');
    });
  });

  describe('removeItMarkers', () => {
    test('should remove ङित् markers (IAST)', () => {
      expect(removeItMarkers('karaṅ')).toBe('kara');
      expect(removeItMarkers('gachaṅ')).toBe('gacha');
      expect(removeItMarkers('stavaṅ')).toBe('stava');
    });

    test('should remove ङित् markers (Devanagari)', () => {
      expect(removeItMarkers('करङ्')).toBe('कर');
      expect(removeItMarkers('गछङ्')).toBe('गछ');
      expect(removeItMarkers('स्तवङ्')).toBe('स्तव');
    });

    test('should return unchanged if no ङित्', () => {
      expect(removeItMarkers('kara')).toBe('kara');
      expect(removeItMarkers('कर')).toBe('कर');
    });
  });

  describe('applyNgitSubstitution', () => {
    test('should apply ङित् substitution correctly (IAST)', () => {
      const result1 = applyNgitSubstitution('kṛ', 'karaṅ');
      expect(result1.output).toBe('kkara'); // k + kara (replacing ṛ)
      
      const result2 = applyNgitSubstitution('gam', 'gachaṅ');
      expect(result2.output).toBe('gagacha'); // ga + gacha (replacing m)
      
      const result3 = applyNgitSubstitution('stu', 'stavaṅ');
      expect(result3.output).toBe('ststava'); // st + stava (replacing u)
    });

    test('should apply ङित् substitution correctly (Devanagari)', () => {
      const result1 = applyNgitSubstitution('कृ', 'करङ्');
      expect(result1.output).toBe('ककर');
      
      const result2 = applyNgitSubstitution('गम्', 'गछङ्');
      expect(result2.output).toBe('गगछ'); // ग + गछ (replacing म्)
    });

    test('should handle single letter sthāni', () => {
      const result = applyNgitSubstitution('k', 'karaṅ');
      expect(result.output).toBe('kara'); // entire k replaced
    });

    test('should return analysis object', () => {
      const result = applyNgitSubstitution('kṛ', 'karaṅ');
      expect(result).toHaveProperty('sthani', 'kṛ');
      expect(result).toHaveProperty('adesha', 'karaṅ');
      expect(result).toHaveProperty('finalLetterReplaced', 'ṛ');
      expect(result).toHaveProperty('substituteWithoutNgit', 'kara');
      expect(result).toHaveProperty('ruleApplied', true);
    });
  });

  describe('sutra1153 (main function)', () => {
    test('should handle ङित् substitutions (IAST)', () => {
      const result1 = sutra1153('kṛ', 'karaṅ');
      expect(result1.isPragrhya).toBe(false); // not pragrhya rule
      expect(result1.sutraApplied).toBe('1.1.53');
      expect(result1.ruleApplied).toBe(true);
      expect(result1.output).toBe('kkara');

      const result2 = sutra1153('gam', 'gachaṅ');
      expect(result2.ruleApplied).toBe(true);
      expect(result2.output).toBe('gagacha');
    });

    test('should handle ङित् substitutions (Devanagari)', () => {
      const result = sutra1153('कृ', 'करङ्');
      expect(result.ruleApplied).toBe(true);
      expect(result.output).toBe('ककर');
      expect(result.script).toBe('Devanagari');
    });

    test('should not apply when substitute lacks ङित्', () => {
      const result1 = sutra1153('kṛ', 'kara');
      expect(result1.ruleApplied).toBe(false);
      expect(result1.output).toBe('kṛ'); // unchanged
      expect(result1.explanation).toContain('does not have ङित् marker');

      const result2 = sutra1153('gam', 'gacha');
      expect(result2.ruleApplied).toBe(false);
    });

    test('should handle edge cases', () => {
      // Empty inputs
      expect(() => sutra1153('', 'karaṅ')).toThrow('Invalid input');
      expect(() => sutra1153('kṛ', '')).toThrow('Invalid input');
      
      // Single letter inputs
      const result = sutra1153('k', 'aṅ');
      expect(result.ruleApplied).toBe(true);
      expect(result.output).toBe('a');
    });

    test('should provide comprehensive analysis', () => {
      const result = sutra1153('kṛ', 'karaṅ', { analysisLevel: 'detailed' });
      expect(result).toHaveProperty('analysis');
      expect(result.analysis).toHaveProperty('traditionalCommentary');
      expect(result.analysis).toHaveProperty('modernExplanation');
      expect(result.analysis).toHaveProperty('linguisticCategory');
      expect(result.analysis.linguisticCategory).toBe('ङित् substitution');
    });

    test('should work with grammatical context', () => {
      const result = sutra1153('kṛ', 'karaṅ', { 
        operation: 'verbal_substitution',
        tense: 'present'
      });
      expect(result.ruleApplied).toBe(true);
      expect(result.context).toHaveProperty('operation', 'verbal_substitution');
    });
  });

  describe('real-world examples', () => {
    test('should work with classical Sanskrit examples', () => {
      // Traditional interpretation: ङित् substitute replaces only final letter
      // So hṛ + haraṅ means: h + hara (replacing ṛ with hara) = hhara
      const result1 = sutra1153('hṛ', 'haraṅ');
      expect(result1.ruleApplied).toBe(true);
      expect(result1.output).toBe('hhara'); // h + hara (ṛ replaced by hara)

      const result2 = sutra1153('bhṛ', 'bharaṅ');
      expect(result2.ruleApplied).toBe(true);
      expect(result2.output).toBe('bhbhara'); // bh + bhara (ṛ replaced by bhara)
    });

    test('should handle complex morphological processes', () => {
      const result = sutra1153('bandh', 'badhnaṅ', {
        operation: 'root_substitution',
        morphologicalProcess: 'vowel_gradation'
      });
      expect(result.ruleApplied).toBe(true);
      expect(result.context.morphologicalProcess).toBe('vowel_gradation');
    });

    test('should distinguish from other marker types', () => {
      // यित्, रित् etc. are different from ङित्
      const result = sutra1153('kṛ', 'karay'); // यित् marker, not ङित्
      expect(result.ruleApplied).toBe(false);
      expect(result.explanation).toContain('does not have ङित् marker');
    });
  });

  describe('integration with other rules', () => {
    test('should work as part of substitution chains', () => {
      const result = sutra1153('gam', 'gachaṅ', {
        chainedSubstitution: true,
        previousSutra: '1.1.52'
      });
      expect(result.ruleApplied).toBe(true);
      expect(result.context.chainedSubstitution).toBe(true);
    });

    test('should provide data for subsequent rules', () => {
      const result = sutra1153('kṛ', 'karaṅ');
      expect(result).toHaveProperty('resultForChaining');
      expect(result.resultForChaining).toHaveProperty('finalOutput', 'kkara');
      expect(result.resultForChaining).toHaveProperty('substitutionType', 'ngit_final_only');
    });
  });
});
