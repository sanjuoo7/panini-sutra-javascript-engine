/**
 * Kit Designation Utility Tests
 * 
 * Tests for the kit-designation utility module that handles कित् designation
 * of Sanskrit affixes according to Sutras 1.2.8-1.2.15.
 */

import {
  isSutra128Root,
  isHanRoot,
  isYamRoot,
  isGamRoot,
  isKtvaOrSanAffix,
  isSicAffix,
  isLingAffix,
  isKitBySutra128,
  isKitBySutra1214,
  isKitBySutra1215,
  analyzeKitDesignation,
  KIT_DESIGNATION_ROOTS,
  KIT_ROOT_VARIANTS,
  isSthaRoot,
  isGhuClassRoot,
  isKtvAffix,
  hasSetAugment
} from './kit-designation.js';

describe('Kit Designation Utility Tests', () => {

  describe('isSutra128Root function', () => {
    
    test('should identify Sutra 1.2.8 roots in Devanagari', () => {
      expect(isSutra128Root('रुद्')).toBe(true);
      expect(isSutra128Root('विद्')).toBe(true);
      expect(isSutra128Root('मुष्')).toBe(true);
      expect(isSutra128Root('गृह्')).toBe(true);
      expect(isSutra128Root('स्वप्')).toBe(true);
      expect(isSutra128Root('प्रच्छ्')).toBe(true);
    });

    test('should identify Sutra 1.2.8 roots in IAST', () => {
      expect(isSutra128Root('rud')).toBe(true);
      expect(isSutra128Root('vid')).toBe(true);
      expect(isSutra128Root('muṣ')).toBe(true);
      expect(isSutra128Root('gṛh')).toBe(true);
      expect(isSutra128Root('svap')).toBe(true);
      expect(isSutra128Root('pracch')).toBe(true);
    });

    test('should identify root variants', () => {
      // Devanagari variants
      expect(isSutra128Root('रुद')).toBe(true);
      expect(isSutra128Root('विद')).toBe(true);
      expect(isSutra128Root('गृह')).toBe(true);
      expect(isSutra128Root('ग्रह्')).toBe(true);
      expect(isSutra128Root('स्वप')).toBe(true);
      expect(isSutra128Root('पृच्छ्')).toBe(true);
      
      // IAST variants
      expect(isSutra128Root('ruda')).toBe(true);
      expect(isSutra128Root('vida')).toBe(true);
      expect(isSutra128Root('gṛha')).toBe(true);
      expect(isSutra128Root('grah')).toBe(true);
      expect(isSutra128Root('svapa')).toBe(true);
      expect(isSutra128Root('pṛcch')).toBe(true);
    });

    test('should reject non-Sutra 1.2.8 roots', () => {
      expect(isSutra128Root('कृ')).toBe(false);
      expect(isSutra128Root('गम्')).toBe(false);
      expect(isSutra128Root('दा')).toBe(false);
      expect(isSutra128Root('नी')).toBe(false);
      
      expect(isSutra128Root('kṛ')).toBe(false);
      expect(isSutra128Root('gam')).toBe(false);
      expect(isSutra128Root('dā')).toBe(false);
      expect(isSutra128Root('nī')).toBe(false);
    });

    test('should handle edge cases', () => {
      expect(isSutra128Root('')).toBe(false);
      expect(isSutra128Root(null)).toBe(false);
      expect(isSutra128Root(undefined)).toBe(false);
      expect(isSutra128Root('   ')).toBe(false);
    });
  });

  describe('isHanRoot function', () => {
    
    test('should identify हन् root and variants', () => {
      // Devanagari
      expect(isHanRoot('हन्')).toBe(true);
      expect(isHanRoot('हन')).toBe(true);
      expect(isHanRoot('वध्')).toBe(true);
      expect(isHanRoot('घ्न')).toBe(true);
      
      // IAST
      expect(isHanRoot('han')).toBe(true);
      expect(isHanRoot('hana')).toBe(true);
      expect(isHanRoot('vadh')).toBe(true);
      expect(isHanRoot('ghna')).toBe(true);
    });

    test('should reject non-हन् roots', () => {
      expect(isHanRoot('कृ')).toBe(false);
      expect(isHanRoot('गम्')).toBe(false);
      expect(isHanRoot('kṛ')).toBe(false);
      expect(isHanRoot('gam')).toBe(false);
    });
  });

  describe('isYamRoot function', () => {
    
    test('should identify यम् root and variants', () => {
      // Devanagari
      expect(isYamRoot('यम्')).toBe(true);
      expect(isYamRoot('यम')).toBe(true);
      expect(isYamRoot('यच्छ्')).toBe(true);
      
      // IAST
      expect(isYamRoot('yam')).toBe(true);
      expect(isYamRoot('yama')).toBe(true);
      expect(isYamRoot('yacch')).toBe(true);
    });

    test('should reject non-यम् roots', () => {
      expect(isYamRoot('कृ')).toBe(false);
      expect(isYamRoot('गम्')).toBe(false);
      expect(isYamRoot('kṛ')).toBe(false);
      expect(isYamRoot('gam')).toBe(false);
    });
  });

  describe('isGamRoot function', () => {
    
    test('should identify गम् root and variants', () => {
      // Devanagari
      expect(isGamRoot('गम्')).toBe(true);
      expect(isGamRoot('गम')).toBe(true);
      expect(isGamRoot('गच्छ्')).toBe(true);
      
      // IAST
      expect(isGamRoot('gam')).toBe(true);
      expect(isGamRoot('gama')).toBe(true);
      expect(isGamRoot('gacch')).toBe(true);
    });

    test('should reject non-गम् roots', () => {
      expect(isGamRoot('कृ')).toBe(false);
      expect(isGamRoot('हन्')).toBe(false);
      expect(isGamRoot('kṛ')).toBe(false);
      expect(isGamRoot('han')).toBe(false);
    });
  });

  describe('Affix identification functions', () => {
    
    describe('isKtvaOrSanAffix function', () => {
      
      test('should identify क्त्वा affixes', () => {
        // Devanagari
        expect(isKtvaOrSanAffix('क्त्वा')).toBe(true);
        expect(isKtvaOrSanAffix('क्त्व')).toBe(true);
        expect(isKtvaOrSanAffix('त्वा')).toBe(true);
        
        // IAST
        expect(isKtvaOrSanAffix('ktvā')).toBe(true);
        expect(isKtvaOrSanAffix('ktva')).toBe(true);
        expect(isKtvaOrSanAffix('tvā')).toBe(true);
      });

      test('should identify सन् affixes', () => {
        // Devanagari
        expect(isKtvaOrSanAffix('सन्')).toBe(true);
        expect(isKtvaOrSanAffix('स')).toBe(true);
        expect(isKtvaOrSanAffix('सि')).toBe(true);
        
        // IAST
        expect(isKtvaOrSanAffix('san')).toBe(true);
        expect(isKtvaOrSanAffix('sa')).toBe(true);
        expect(isKtvaOrSanAffix('si')).toBe(true);
      });

      test('should reject non-क्त्वा/सन् affixes', () => {
        expect(isKtvaOrSanAffix('ति')).toBe(false);
        expect(isKtvaOrSanAffix('त')).toBe(false);
        expect(isKtvaOrSanAffix('ti')).toBe(false);
        expect(isKtvaOrSanAffix('ta')).toBe(false);
      });
    });

    describe('isSicAffix function', () => {
      
      test('should identify सिच् affixes', () => {
        // Devanagari
        expect(isSicAffix('सिच्')).toBe(true);
        expect(isSicAffix('सि')).toBe(true);
        expect(isSicAffix('इष्य')).toBe(true);
        expect(isSicAffix('इस्य')).toBe(true);
        
        // IAST
        expect(isSicAffix('sic')).toBe(true);
        expect(isSicAffix('si')).toBe(true);
        expect(isSicAffix('iṣya')).toBe(true);
        expect(isSicAffix('isya')).toBe(true);
      });

      test('should reject non-सिच् affixes', () => {
        expect(isSicAffix('ति')).toBe(false);
        expect(isSicAffix('त')).toBe(false);
        expect(isSicAffix('ti')).toBe(false);
        expect(isSicAffix('ta')).toBe(false);
      });
    });
  });

  describe('Kit designation determination functions', () => {
    
    describe('isKitBySutra128 function', () => {
      
      test('should return true for Sutra 1.2.8 root + क्त्वा/सन् combinations', () => {
        // क्त्वा combinations
        expect(isKitBySutra128('रुद्', 'क्त्वा')).toBe(true);
        expect(isKitBySutra128('विद्', 'क्त्वा')).toBe(true);
        expect(isKitBySutra128('मुष्', 'क्त्वा')).toBe(true);
        expect(isKitBySutra128('गृह्', 'क्त्वा')).toBe(true);
        
        // सन् combinations
        expect(isKitBySutra128('स्वप्', 'सन्')).toBe(true);
        expect(isKitBySutra128('प्रच्छ्', 'सन्')).toBe(true);
        
        // IAST
        expect(isKitBySutra128('rud', 'ktvā')).toBe(true);
        expect(isKitBySutra128('vid', 'san')).toBe(true);
      });

      test('should return false for invalid combinations', () => {
        // Wrong root
        expect(isKitBySutra128('कृ', 'क्त्वा')).toBe(false);
        expect(isKitBySutra128('गम्', 'सन्')).toBe(false);
        
        // Wrong affix
        expect(isKitBySutra128('रुद्', 'ति')).toBe(false);
        expect(isKitBySutra128('विद्', 'त')).toBe(false);
        
        // Both wrong
        expect(isKitBySutra128('कृ', 'ति')).toBe(false);
      });
    });

    describe('isKitBySutra1214 function', () => {
      
      test('should return true for हन् + सिच् combinations', () => {
        expect(isKitBySutra1214('हन्', 'सिच्')).toBe(true);
        expect(isKitBySutra1214('हन', 'सि')).toBe(true);
        expect(isKitBySutra1214('वध्', 'इष्य')).toBe(true);
        
        // IAST
        expect(isKitBySutra1214('han', 'sic')).toBe(true);
        expect(isKitBySutra1214('vadh', 'si')).toBe(true);
      });

      test('should return false for invalid combinations', () => {
        expect(isKitBySutra1214('कृ', 'सिच्')).toBe(false);
        expect(isKitBySutra1214('हन्', 'ति')).toBe(false);
        expect(isKitBySutra1214('गम्', 'त')).toBe(false);
      });
    });

    describe('isKitBySutra1215 function', () => {
      
      test('should return true for यम् + सिच् combinations', () => {
        expect(isKitBySutra1215('यम्', 'सिच्')).toBe(true);
        expect(isKitBySutra1215('यम', 'सि')).toBe(true);
        expect(isKitBySutra1215('यच्छ्', 'इष्य')).toBe(true);
        
        // IAST
        expect(isKitBySutra1215('yam', 'sic')).toBe(true);
        expect(isKitBySutra1215('yama', 'si')).toBe(true);
      });

      test('should consider meaning context when provided', () => {
        expect(isKitBySutra1215('यम्', 'सिच्', 'to divulge')).toBe(true);
        expect(isKitBySutra1215('यम्', 'सिच्', 'to reveal secrets')).toBe(true);
        expect(isKitBySutra1215('यम्', 'सिच्', 'गन्धन')).toBe(true);
        expect(isKitBySutra1215('यम्', 'सिच्', 'to restrain')).toBe(false); // Different meaning - restraining is not गन्धन
      });

      test('should return false for invalid combinations', () => {
        expect(isKitBySutra1215('कृ', 'सिच्')).toBe(false);
        expect(isKitBySutra1215('यम्', 'ति')).toBe(false);
        expect(isKitBySutra1215('गम्', 'त')).toBe(false);
      });
    });
  });

  describe('analyzeKitDesignation function', () => {
    
    test('should analyze Sutra 1.2.8 combinations', () => {
      const result = analyzeKitDesignation('रुद्', 'क्त्वा');
      expect(result.isKit).toBe(true);
      expect(result.applicableSutras).toContain('1.2.8');
      expect(result.reasoning).toHaveLength(1);
      expect(result.reasoning[0]).toMatch(/रुदविदमुषग्रहिस्वपिप्रच्छः सँश्च/);
    });

    test('should analyze Sutra 1.2.14 combinations', () => {
      const result = analyzeKitDesignation('हन्', 'सिच्');
      expect(result.isKit).toBe(true);
      expect(result.applicableSutras).toContain('1.2.14');
      expect(result.reasoning).toHaveLength(1);
      expect(result.reasoning[0]).toMatch(/हनः सिच्/);
    });

    test('should analyze Sutra 1.2.15 combinations', () => {
      const result = analyzeKitDesignation('यम्', 'सिच्', { meaning: 'to divulge' });
      expect(result.isKit).toBe(true);
      expect(result.applicableSutras).toContain('1.2.15');
      expect(result.reasoning).toHaveLength(1);
      expect(result.reasoning[0]).toMatch(/यमो गन्धने/);
    });

    test('should handle non-kit combinations', () => {
      const result = analyzeKitDesignation('कृ', 'ति');
      expect(result.isKit).toBe(false);
      expect(result.applicableSutras).toHaveLength(0);
      expect(result.reasoning).toHaveLength(0);
    });

    test('should handle multiple applicable sutras', () => {
      // यम् could theoretically match multiple patterns if context allows
      const result = analyzeKitDesignation('यम्', 'सिच्');
      expect(result.isKit).toBe(true);
      expect(result.applicableSutras).toContain('1.2.15');
    });
  });

  describe('Data structure validation', () => {
    
    test('should have consistent root data', () => {
      // Check that all roots in sutra_1_2_8 have corresponding variants
      KIT_DESIGNATION_ROOTS.sutra_1_2_8.devanagari.forEach(root => {
        expect(KIT_ROOT_VARIANTS.devanagari[root]).toBeDefined();
        expect(Array.isArray(KIT_ROOT_VARIANTS.devanagari[root])).toBe(true);
        expect(KIT_ROOT_VARIANTS.devanagari[root].length).toBeGreaterThan(0);
      });

      KIT_DESIGNATION_ROOTS.sutra_1_2_8.iast.forEach(root => {
        expect(KIT_ROOT_VARIANTS.iast[root]).toBeDefined();
        expect(Array.isArray(KIT_ROOT_VARIANTS.iast[root])).toBe(true);
        expect(KIT_ROOT_VARIANTS.iast[root].length).toBeGreaterThan(0);
      });
    });

    test('should have consistent array lengths', () => {
      expect(KIT_DESIGNATION_ROOTS.sutra_1_2_8.devanagari.length)
        .toBe(KIT_DESIGNATION_ROOTS.sutra_1_2_8.iast.length);
    });
  });

  describe('Edge cases and error handling', () => {
    
    test('should handle empty and null inputs gracefully', () => {
      expect(isSutra128Root('')).toBe(false);
      expect(isSutra128Root(null)).toBe(false);
      expect(isSutra128Root(undefined)).toBe(false);
      
      expect(isKtvaOrSanAffix('')).toBe(false);
      expect(isKtvaOrSanAffix(null)).toBe(false);
      expect(isKtvaOrSanAffix(undefined)).toBe(false);
      
      expect(isKitBySutra128('', '')).toBe(false);
      expect(isKitBySutra128(null, null)).toBe(false);
    });

    test('should handle whitespace inputs', () => {
      expect(isSutra128Root('  रुद्  ')).toBe(true);
      expect(isKtvaOrSanAffix('  क्त्वा  ')).toBe(true);
      expect(isKitBySutra128('  रुद्  ', '  क्त्वा  ')).toBe(true);
    });

    test('should handle non-string inputs gracefully', () => {
      expect(isSutra128Root(123)).toBe(false);
      expect(isKtvaOrSanAffix({})).toBe(false);
      expect(isKitBySutra128([], null)).toBe(false);
    });
  });

  describe('isSthaRoot function', () => {
    test('should identify स्था root in Devanagari', () => {
      expect(isSthaRoot('स्था')).toBe(true);
      expect(isSthaRoot('स्थ')).toBe(true);
      expect(isSthaRoot('तिष्ठ्')).toBe(true);
      expect(isSthaRoot('स्थि')).toBe(true);
    });

    test('should identify sthā root in IAST', () => {
      expect(isSthaRoot('sthā')).toBe(true);
      expect(isSthaRoot('stha')).toBe(true);
      expect(isSthaRoot('tiṣṭh')).toBe(true);
      expect(isSthaRoot('sthi')).toBe(true);
    });

    test('should reject non-sthā roots', () => {
      expect(isSthaRoot('गम्')).toBe(false);
      expect(isSthaRoot('गा')).toBe(false);
      expect(isSthaRoot('gam')).toBe(false);
      expect(isSthaRoot('gā')).toBe(false);
    });

    test('should handle invalid inputs', () => {
      expect(isSthaRoot('')).toBe(false);
      expect(isSthaRoot(null)).toBe(false);
      expect(isSthaRoot(undefined)).toBe(false);
      expect(isSthaRoot(123)).toBe(false);
    });
  });

  describe('isGhuClassRoot function', () => {
    test('should identify घु class roots in Devanagari', () => {
      expect(isGhuClassRoot('हु')).toBe(true);
      expect(isGhuClassRoot('हू')).toBe(true);
      expect(isGhuClassRoot('दा')).toBe(true);
      expect(isGhuClassRoot('धा')).toBe(true);
      expect(isGhuClassRoot('पा')).toBe(true);
      expect(isGhuClassRoot('मा')).toBe(true);
    });

    test('should identify ghu class roots in IAST', () => {
      expect(isGhuClassRoot('hu')).toBe(true);
      expect(isGhuClassRoot('hū')).toBe(true);
      expect(isGhuClassRoot('dā')).toBe(true);
      expect(isGhuClassRoot('dhā')).toBe(true);
      expect(isGhuClassRoot('pā')).toBe(true);
      expect(isGhuClassRoot('mā')).toBe(true);
    });

    test('should reject non-ghu class roots', () => {
      expect(isGhuClassRoot('गम्')).toBe(false);
      expect(isGhuClassRoot('स्था')).toBe(false);
      expect(isGhuClassRoot('gam')).toBe(false);
      expect(isGhuClassRoot('sthā')).toBe(false);
    });

    test('should handle invalid inputs', () => {
      expect(isGhuClassRoot('')).toBe(false);
      expect(isGhuClassRoot(null)).toBe(false);
      expect(isGhuClassRoot(undefined)).toBe(false);
      expect(isGhuClassRoot(123)).toBe(false);
    });
  });

  describe('isKtvAffix function', () => {
    test('should identify क्त्वा affix in Devanagari', () => {
      expect(isKtvAffix('क्त्वा')).toBe(true);
      expect(isKtvAffix('क्त्व')).toBe(true);
      expect(isKtvAffix('त्वा')).toBe(true);
      expect(isKtvAffix('त्व')).toBe(true);
    });

    test('should identify augmented क्त्वा forms in Devanagari', () => {
      expect(isKtvAffix('इक्त्वा')).toBe(true);
      expect(isKtvAffix('इत्वा')).toBe(true);
    });

    test('should identify ktvā affix in IAST', () => {
      expect(isKtvAffix('ktvā')).toBe(true);
      expect(isKtvAffix('ktva')).toBe(true);
      expect(isKtvAffix('tvā')).toBe(true);
      expect(isKtvAffix('tva')).toBe(true);
    });

    test('should identify augmented ktvā forms in IAST', () => {
      expect(isKtvAffix('iktvā')).toBe(true);
      expect(isKtvAffix('itvā')).toBe(true);
    });

    test('should reject non-ktvā affixes', () => {
      expect(isKtvAffix('सिच्')).toBe(false);
      expect(isKtvAffix('लिङ्')).toBe(false);
      expect(isKtvAffix('sic')).toBe(false);
      expect(isKtvAffix('liṅ')).toBe(false);
    });

    test('should handle invalid inputs', () => {
      expect(isKtvAffix('')).toBe(false);
      expect(isKtvAffix(null)).toBe(false);
      expect(isKtvAffix(undefined)).toBe(false);
      expect(isKtvAffix(123)).toBe(false);
    });
  });

  describe('hasSetAugment function', () => {
    test('should detect सेट् augment from context', () => {
      expect(hasSetAugment('क्त्वा', { hasSetAugment: true })).toBe(true);
      expect(hasSetAugment('ktvā', { hasItAugment: true })).toBe(true);
      expect(hasSetAugment('क्त्वा', { augment: 'सेट्' })).toBe(true);
      expect(hasSetAugment('ktvā', { augment: 'seṭ' })).toBe(true);
      expect(hasSetAugment('ktvā', { augment: 'iṭ' })).toBe(true);
    });

    test('should detect सेट् augment from affix form in Devanagari', () => {
      expect(hasSetAugment('इक्त्वा')).toBe(true);
      expect(hasSetAugment('इत्वा')).toBe(true);
    });

    test('should detect iṭ augment from affix form in IAST', () => {
      expect(hasSetAugment('iktvā')).toBe(true);
      expect(hasSetAugment('itvā')).toBe(true);
    });

    test('should reject affixes without सेट् augment', () => {
      expect(hasSetAugment('क्त्वा')).toBe(false);
      expect(hasSetAugment('ktvā')).toBe(false);
      expect(hasSetAugment('त्वा')).toBe(false);
      expect(hasSetAugment('tvā')).toBe(false);
    });

    test('should handle invalid inputs', () => {
      expect(hasSetAugment('')).toBe(false);
      expect(hasSetAugment(null)).toBe(false);
      expect(hasSetAugment(undefined)).toBe(false);
      expect(hasSetAugment(123)).toBe(false);
    });
  });
});
