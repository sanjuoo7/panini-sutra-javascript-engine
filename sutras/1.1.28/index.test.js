/**
 * Test cases for Sutra 1.1.28: विभाषा दिक्समासे बहुव्रीहौ
 * Testing optional सर्वनाम status in directional बहुव्रीही compounds
 */

import { 
  isDirectionRelated,
  isDirectionalBahuvriihi,
  checkOptionalSarvanamaInDirectionalBahuvriihi,
  analyzeSarvanamaWithDirectionalException,
  getDirectionalBahuvriihiExamples,
  getDirectionTerms,
  hasVibhashaInDirectionalBahuvriihi,
  parseDirectionalCompound,
  DIRECTION_TERMS,
  BAHUVRIIHI_PATTERNS
} from './index.js';

describe('Sutra 1.1.28: विभाषा दिक्समासे बहुव्रीहौ', () => {
  describe('isDirectionRelated', () => {
    it('should identify primary direction terms', () => {
      expect(isDirectionRelated('pūrva')).toBe(true);    // east
      expect(isDirectionRelated('paścima')).toBe(true);  // west
      expect(isDirectionRelated('uttara')).toBe(true);   // north
      expect(isDirectionRelated('dakṣiṇa')).toBe(true);  // south
      
      expect(isDirectionRelated('पूर्व')).toBe(true);
      expect(isDirectionRelated('पश्चिम')).toBe(true);
      expect(isDirectionRelated('उत्तर')).toBe(true);
      expect(isDirectionRelated('दक्षिण')).toBe(true);
    });

    it('should identify intermediate directions', () => {
      expect(isDirectionRelated('īśāna')).toBe(true);    // northeast
      expect(isDirectionRelated('agneya')).toBe(true);   // southeast
      expect(isDirectionRelated('nairṛta')).toBe(true);  // southwest
      expect(isDirectionRelated('vāyavya')).toBe(true);  // northwest
      
      expect(isDirectionRelated('ईशान')).toBe(true);
      expect(isDirectionRelated('आग्नेय')).toBe(true);
    });

    it('should identify directional indicators', () => {
      expect(isDirectionRelated('diś')).toBe(true);      // direction
      expect(isDirectionRelated('deśa')).toBe(true);     // region
      expect(isDirectionRelated('kṣetra')).toBe(true);   // field
      
      expect(isDirectionRelated('दिश्')).toBe(true);
      expect(isDirectionRelated('देश')).toBe(true);
      expect(isDirectionRelated('क्षेत्र')).toBe(true);
    });

    it('should reject non-directional terms', () => {
      expect(isDirectionRelated('guru')).toBe(false);
      expect(isDirectionRelated('nara')).toBe(false);
      expect(isDirectionRelated('गुरु')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isDirectionRelated('')).toBe(false);
      expect(isDirectionRelated(null)).toBe(false);
    });
  });

  describe('isDirectionalBahuvriihi', () => {
    it('should identify known directional बहुव्रीही patterns', () => {
      expect(isDirectionalBahuvriihi('sarvapūrva')).toBe(true);     // all-eastern
      expect(isDirectionalBahuvriihi('sarvadakṣiṇa')).toBe(true);   // all-southern
      expect(isDirectionalBahuvriihi('sarvadiś')).toBe(true);       // all-directional
      expect(isDirectionalBahuvriihi('viśvapūrva')).toBe(true);     // universal-eastern
      
      expect(isDirectionalBahuvriihi('सर्वपूर्व')).toBe(true);
      expect(isDirectionalBahuvriihi('सर्वदक्षिण')).toBe(true);
      expect(isDirectionalBahuvriihi('सर्वदिश्')).toBe(true);
    });

    it('should identify compounds containing direction terms', () => {
      expect(isDirectionalBahuvriihi('somepūrva')).toBe(true);     // contains 'pūrva'
      expect(isDirectionalBahuvriihi('anyadeśa')).toBe(true);      // contains 'deśa'
      expect(isDirectionalBahuvriihi('कोईपूर्व')).toBe(true);       // contains 'पूर्व'
    });

    it('should reject non-directional compounds', () => {
      expect(isDirectionalBahuvriihi('sarvaguṇa')).toBe(false);    // not directional
      expect(isDirectionalBahuvriihi('anyarūpa')).toBe(false);     // not directional
      expect(isDirectionalBahuvriihi('सर्वगुण')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isDirectionalBahuvriihi('')).toBe(false);
      expect(isDirectionalBahuvriihi(null)).toBe(false);
    });
  });

  describe('checkOptionalSarvanamaInDirectionalBahuvriihi', () => {
    it('should apply to सर्वनाम in directional बहुव्रीही', () => {
      const context = { 
        compoundType: 'bahuvriihi', 
        compound: 'sarvapūrva' 
      };
      const result = checkOptionalSarvanamaInDirectionalBahuvriihi('sarva', context);
      
      expect(result.applies).toBe(true);
      expect(result.optional).toBe(true);
      expect(result.reason).toBe('directional_bahuvriihi');
      expect(result.sutra).toBe('1.1.28');
    });

    it('should not apply to non-सर्वनाम words', () => {
      const context = { 
        compoundType: 'bahuvriihi', 
        compound: 'gurupūrva' 
      };
      const result = checkOptionalSarvanamaInDirectionalBahuvriihi('guru', context);
      
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('not_sarvanama');
    });

    it('should not apply to non-बहुव्रीही compounds', () => {
      const context = { 
        compoundType: 'tatpurusha' 
      };
      const result = checkOptionalSarvanamaInDirectionalBahuvriihi('sarva', context);
      
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('not_bahuvriihi');
    });

    it('should not apply to non-directional बहुव्रीही', () => {
      const context = { 
        compoundType: 'bahuvriihi', 
        compound: 'sarvaguṇa' 
      };
      const result = checkOptionalSarvanamaInDirectionalBahuvriihi('sarva', context);
      
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('not_directional');
    });

    it('should handle edge cases', () => {
      const result1 = checkOptionalSarvanamaInDirectionalBahuvriihi('');
      expect(result1.applies).toBe(false);

      const result2 = checkOptionalSarvanamaInDirectionalBahuvriihi(null);
      expect(result2.applies).toBe(false);
    });
  });

  describe('analyzeSarvanamaWithDirectionalException', () => {
    it('should identify optional सर्वनाम in directional context', () => {
      const context = { 
        compoundType: 'bahuvriihi', 
        compound: 'sarvapūrva' 
      };
      const result = analyzeSarvanamaWithDirectionalException('sarva', context);
      
      expect(result.isSarvanama).toBe(true);
      expect(result.status).toBe('optional_sarvanama');
      expect(result.exception).toBe('1.1.28');
      expect(result.baseStatus).toBe('sarvanama_by_1.1.27');
    });

    it('should maintain definite सर्वनाम in non-directional context', () => {
      const context = { 
        compoundType: 'tatpurusha' 
      };
      const result = analyzeSarvanamaWithDirectionalException('sarva', context);
      
      expect(result.isSarvanama).toBe(true);
      expect(result.status).toBe('definite_sarvanama');
      expect(result.exception).toBe(null);
    });

    it('should handle non-सर्वनाम words', () => {
      const result = analyzeSarvanamaWithDirectionalException('guru');
      
      expect(result.isSarvanama).toBe(false);
      expect(result.status).toBe('not_sarvanama');
      expect(result.exception).toBe(null);
    });

    it('should handle edge cases', () => {
      const result1 = analyzeSarvanamaWithDirectionalException('');
      expect(result1.isSarvanama).toBe(false);

      const result2 = analyzeSarvanamaWithDirectionalException(null);
      expect(result2.isSarvanama).toBe(false);
    });
  });

  describe('getDirectionalBahuvriihiExamples', () => {
    it('should return IAST examples by default', () => {
      const examples = getDirectionalBahuvriihiExamples();
      expect(examples).toContain('sarvapūrva');
      expect(examples).toContain('sarvadakṣiṇa');
      expect(examples).toContain('sarvadiś');
      expect(examples).toContain('viśvapūrva');
    });

    it('should return Devanagari examples when requested', () => {
      const examples = getDirectionalBahuvriihiExamples('Devanagari');
      expect(examples).toContain('सर्वपूर्व');
      expect(examples).toContain('सर्वदक्षिण');
      expect(examples).toContain('सर्वदिश्');
      expect(examples).toContain('विश्वपूर्व');
    });
  });

  describe('getDirectionTerms', () => {
    it('should return IAST terms by default', () => {
      const terms = getDirectionTerms();
      expect(terms.primary_directions).toContain('pūrva');
      expect(terms.primary_directions).toContain('uttara');
      expect(terms.intermediate_directions).toContain('īśāna');
      expect(terms.directional_indicators).toContain('diś');
    });

    it('should return Devanagari terms when requested', () => {
      const terms = getDirectionTerms('Devanagari');
      expect(terms.primary_directions).toContain('पूर्व');
      expect(terms.primary_directions).toContain('उत्तर');
      expect(terms.intermediate_directions).toContain('ईशान');
      expect(terms.directional_indicators).toContain('दिश्');
    });
  });

  describe('hasVibhashaInDirectionalBahuvriihi', () => {
    it('should identify विभाषा (optional) behavior', () => {
      const context = { compoundType: 'bahuvriihi' };
      expect(hasVibhashaInDirectionalBahuvriihi('sarvapūrva', context)).toBe(true);
      expect(hasVibhashaInDirectionalBahuvriihi('विश्वपूर्व', context)).toBe(true);
    });

    it('should return false for non-directional compounds', () => {
      const context = { compoundType: 'bahuvriihi' };
      expect(hasVibhashaInDirectionalBahuvriihi('sarvaguṇa', context)).toBe(false);
      expect(hasVibhashaInDirectionalBahuvriihi('anyarūpa', context)).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(hasVibhashaInDirectionalBahuvriihi('')).toBe(false);
      expect(hasVibhashaInDirectionalBahuvriihi(null)).toBe(false);
    });
  });

  describe('parseDirectionalCompound', () => {
    it('should parse compounds with सर्वनाम and directional elements', () => {
      const result1 = parseDirectionalCompound('sarvapūrva');
      expect(result1.hasSarvanama).toBe(true);
      expect(result1.hasDirection).toBe(true);
      expect(result1.isDirectionalBahuvriihi).toBe(true);
      expect(result1.potentialFor1128).toBe(true);

      const result2 = parseDirectionalCompound('विश्वदिश्');
      expect(result2.hasSarvanama).toBe(true);
      expect(result2.hasDirection).toBe(true);
    });

    it('should parse compounds without सर्वनाम elements', () => {
      const result = parseDirectionalCompound('gurupūrva');
      expect(result.hasSarvanama).toBe(false);
      expect(result.hasDirection).toBe(true);
      expect(result.isDirectionalBahuvriihi).toBe(false);
    });

    it('should parse compounds without directional elements', () => {
      const result = parseDirectionalCompound('sarvaguṇa');
      expect(result.hasSarvanama).toBe(true);
      expect(result.hasDirection).toBe(false);
      expect(result.isDirectionalBahuvriihi).toBe(false);
    });

    it('should handle edge cases', () => {
      const result1 = parseDirectionalCompound('');
      expect(result1.hasSarvanama).toBe(false);
      expect(result1.hasDirection).toBe(false);

      const result2 = parseDirectionalCompound(null);
      expect(result2.hasSarvanama).toBe(false);
      expect(result2.hasDirection).toBe(false);
    });
  });

  describe('real-world examples', () => {
    it('should work with classical directional बहुव्रीही compounds', () => {
      // सर्वपूर्व - "having all to the east" (directional बहुव्रीही)
      const context = { compoundType: 'bahuvriihi' };
      
      expect(isDirectionalBahuvriihi('sarvapūrva')).toBe(true);
      expect(hasVibhashaInDirectionalBahuvriihi('sarvapūrva', context)).toBe(true);
      
      const analysis = analyzeSarvanamaWithDirectionalException('sarva', {
        compoundType: 'bahuvriihi',
        compound: 'sarvapūrva'
      });
      
      expect(analysis.status).toBe('optional_sarvanama');
      expect(analysis.exception).toBe('1.1.28');
    });

    it('should distinguish from non-directional बहुव्रीही', () => {
      // सर्वगुण - "having all qualities" (not directional)
      const context = { compoundType: 'bahuvriihi', compound: 'sarvaguṇa' };
      
      expect(isDirectionalBahuvriihi('sarvaguṇa')).toBe(false);
      expect(hasVibhashaInDirectionalBahuvriihi('sarvaguṇa', context)).toBe(false);
      
      const analysis = analyzeSarvanamaWithDirectionalException('sarva', context);
      expect(analysis.status).toBe('definite_sarvanama'); // No exception
      expect(analysis.exception).toBe(null);
    });

    it('should work with विभाषा (optional) semantics', () => {
      // The optionality (विभाषा) means सर्वनाम status can vary
      const context = { compoundType: 'bahuvriihi', compound: 'sarvapūrva' };
      
      const check = checkOptionalSarvanamaInDirectionalBahuvriihi('sarva', context);
      expect(check.optional).toBe(true); // विभाषा = optional
      expect(check.explanation).toContain('optionally');
    });

    it('should support compound analysis', () => {
      // Parse directional compounds
      const parsing = parseDirectionalCompound('anyapaścima');
      expect(parsing.hasSarvanama).toBe(true);   // 'anya' is सर्वनाम
      expect(parsing.hasDirection).toBe(true);   // 'paścima' is directional
      expect(parsing.potentialFor1128).toBe(true); // Both elements present
    });

    it('should work with different directional terms', () => {
      // Various direction types
      expect(isDirectionRelated('uttara')).toBe(true);   // primary direction
      expect(isDirectionRelated('īśāna')).toBe(true);    // intermediate direction
      expect(isDirectionRelated('kṣetra')).toBe(true);   // spatial indicator
      
      // Compound formation
      expect(isDirectionalBahuvriihi('sarvottara')).toBe(true);  // contains uttara
      expect(isDirectionalBahuvriihi('viśvakṣetra')).toBe(true); // contains kṣetra
    });

    it('should integrate with broader सर्वनाम system', () => {
      // Integration with base सर्वनाम classification
      const analysis = analyzeSarvanamaWithDirectionalException('viśva', {
        compoundType: 'bahuvriihi',
        compound: 'viśvapūrva'
      });
      
      expect(analysis.baseStatus).toBe('sarvanama_by_1.1.27');
      expect(analysis.exception).toBe('1.1.28');
      expect(analysis.details.optional).toBe(true);
    });
  });
});
