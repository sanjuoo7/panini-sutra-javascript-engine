/**
 * Test suite for Sutra 1.2.23: नोपधात्थफान्ताद्वा
 * 
 * Tests the optional अतिदेश rule that सेट् क्त्वा affix optionally (वा)
 * is NOT कित् after roots with न् as उपधा ending in थ्/फ्
 */

import {
  sutra1223,
  isThaPhaEnding,
  hasNaUpadha,
  isNaUpadhaThaPhaRoot,
  isSetKtva,
  getNaUpadhaThaPhaRoots,
  getSutra1223Examples,
  optionallyPreventsKitBySutra1223
} from './index.js';

describe('Sutra 1.2.23: नोपधात्थफान्ताद्वा', () => {

  describe('isThaPhaEnding function', () => {
    
    describe('Devanagari roots', () => {
      test('should identify थ्-ending roots', () => {
        expect(isThaPhaEnding('मन्थ्')).toBe(true);
        expect(isThaPhaEnding('शन्थ्')).toBe(true);
        expect(isThaPhaEnding('कन्थ्')).toBe(true);
        expect(isThaPhaEnding('मन्थ')).toBe(true);
      });
      
      test('should identify फ्-ending roots', () => {
        expect(isThaPhaEnding('स्वप्')).toBe(true);
        expect(isThaPhaEnding('तप्')).toBe(true);
        expect(isThaPhaEnding('स्वप')).toBe(true);
        expect(isThaPhaEnding('तप')).toBe(true);
      });
      
      test('should reject other endings', () => {
        expect(isThaPhaEnding('गम्')).toBe(false);
        expect(isThaPhaEnding('कृ')).toBe(false);
        expect(isThaPhaEnding('पा')).toBe(false);
        expect(isThaPhaEnding('दृश्')).toBe(false);
      });
    });

    describe('IAST roots', () => {
      test('should identify th-ending roots', () => {
        expect(isThaPhaEnding('manth')).toBe(true);
        expect(isThaPhaEnding('śanth')).toBe(true);
        expect(isThaPhaEnding('kanth')).toBe(true);
      });
      
      test('should identify ph-ending roots', () => {
        expect(isThaPhaEnding('svap')).toBe(true);  // Note: 'p' not 'ph' for स्वप्
        expect(isThaPhaEnding('tap')).toBe(true);   // Note: 'p' not 'ph' for तप्
      });
      
      test('should reject other endings', () => {
        expect(isThaPhaEnding('gam')).toBe(false);
        expect(isThaPhaEnding('kṛ')).toBe(false);
        expect(isThaPhaEnding('pā')).toBe(false);
        expect(isThaPhaEnding('dṛś')).toBe(false);
      });
    });

    describe('Edge cases', () => {
      test('should handle invalid inputs', () => {
        expect(isThaPhaEnding('')).toBe(false);
        expect(isThaPhaEnding(null)).toBe(false);
        expect(isThaPhaEnding(undefined)).toBe(false);
      });
    });
  });

  describe('hasNaUpadha function', () => {
    
    describe('Devanagari roots', () => {
      test('should identify न्-उपधा roots', () => {
        expect(hasNaUpadha('मन्थ्')).toBe(true);
        expect(hasNaUpadha('शन्थ्')).toBe(true);
        expect(hasNaUpadha('कन्थ्')).toBe(true);
        expect(hasNaUpadha('बन्ध्')).toBe(true);
      });
      
      test('should reject non-न्-उपधा roots', () => {
        expect(hasNaUpadha('गम्')).toBe(false);
        expect(hasNaUpadha('कृ')).toBe(false);
        expect(hasNaUpadha('पा')).toBe(false);
        expect(hasNaUpadha('दृश्')).toBe(false);
      });
    });

    describe('IAST roots', () => {
      test('should identify n-upadha roots', () => {
        expect(hasNaUpadha('manth')).toBe(true);
        expect(hasNaUpadha('śanth')).toBe(true);
        expect(hasNaUpadha('kanth')).toBe(true);
        expect(hasNaUpadha('bandh')).toBe(true);
      });
      
      test('should reject non-n-upadha roots', () => {
        expect(hasNaUpadha('gam')).toBe(false);
        expect(hasNaUpadha('kṛ')).toBe(false);
        expect(hasNaUpadha('pā')).toBe(false);
        expect(hasNaUpadha('dṛś')).toBe(false);
      });
    });

    describe('Edge cases', () => {
      test('should handle short roots', () => {
        expect(hasNaUpadha('न्')).toBe(false);
        expect(hasNaUpadha('न')).toBe(false);
        expect(hasNaUpadha('n')).toBe(false);
      });

      test('should handle invalid inputs', () => {
        expect(hasNaUpadha('')).toBe(false);
        expect(hasNaUpadha(null)).toBe(false);
        expect(hasNaUpadha(undefined)).toBe(false);
      });
    });
  });

  describe('isNaUpadhaThaPhaRoot function', () => {
    
    describe('Positive cases', () => {
      test('should identify qualifying roots', () => {
        expect(isNaUpadhaThaPhaRoot('मन्थ्')).toBe(true);
        expect(isNaUpadhaThaPhaRoot('शन्थ्')).toBe(true);
        expect(isNaUpadhaThaPhaRoot('कन्थ्')).toBe(true);
        expect(isNaUpadhaThaPhaRoot('manth')).toBe(true);
        expect(isNaUpadhaThaPhaRoot('śanth')).toBe(true);
      });
    });

    describe('Negative cases', () => {
      test('should reject roots without न्-उपधा', () => {
        expect(isNaUpadhaThaPhaRoot('गथ्')).toBe(false);
        expect(isNaUpadhaThaPhaRoot('गप्')).toBe(false);
      });

      test('should reject roots not ending in थ्/फ्', () => {
        expect(isNaUpadhaThaPhaRoot('मन्द्')).toBe(false);
        expect(isNaUpadhaThaPhaRoot('तन्')).toBe(false);
      });

      test('should reject roots missing both conditions', () => {
        expect(isNaUpadhaThaPhaRoot('गम्')).toBe(false);
        expect(isNaUpadhaThaPhaRoot('कृ')).toBe(false);
      });
    });
  });

  describe('isSetKtva function', () => {
    
    describe('Positive cases', () => {
      test('should identify सेट् क्त्वा with context', () => {
        expect(isSetKtva('क्त्वा', { hasSetAugment: true })).toBe(true);
        expect(isSetKtva('त्वा', { hasItAugment: true })).toBe(true);
        expect(isSetKtva('ktvā', { augment: 'iṭ' })).toBe(true);
        expect(isSetKtva('tvā', { augment: 'seṭ' })).toBe(true);
      });
      
      test('should identify सेट् क्त्वा from form patterns', () => {
        expect(isSetKtva('इक्त्वा', {})).toBe(true);
        expect(isSetKtva('इत्वा', {})).toBe(true);
        expect(isSetKtva('iktvā', {})).toBe(true);
        expect(isSetKtva('itvā', {})).toBe(true);
      });
    });

    describe('Negative cases', () => {
      test('should reject non-क्त्वा affixes', () => {
        expect(isSetKtva('क्त', { hasSetAugment: true })).toBe(false);
        expect(isSetKtva('सिच्', { hasSetAugment: true })).toBe(false);
        expect(isSetKtva('kta', { augment: 'iṭ' })).toBe(false);
      });
      
      test('should reject क्त्वा without सेट्', () => {
        expect(isSetKtva('क्त्वा', {})).toBe(false);
        expect(isSetKtva('ktvā', {})).toBe(false);
      });
    });
  });

  describe('sutra1223 main function', () => {
    
    describe('Positive cases - optional rule application', () => {
      test('should optionally prevent कित् for qualifying roots + सेट् क्त्वा', () => {
        const result = sutra1223('मन्थित्वा', {
          root: 'मन्थ्',
          affix: 'क्त्वा',
          hasSetAugment: true
        });
        
        expect(result.applicable).toBe(true);
        expect(result.optionallyPreventsKit).toBe(true);
        expect(result.sutra).toBe('1.2.23');
        expect(result.rootType).toBe('न्-उपधा + थ्/फ्-अन्त');
        expect(result.affixType).toBe('सेट् क्त्वा');
        expect(result.optionality).toBe('vā (optional rule)');
      });

      test('should handle IAST forms', () => {
        const result = sutra1223('manthitvā', {
          root: 'manth',
          affix: 'ktvā',
          augment: 'iṭ'
        });
        
        expect(result.applicable).toBe(true);
        expect(result.optionallyPreventsKit).toBe(true);
      });

      test('should handle different qualifying roots', () => {
        const result1 = sutra1223('शन्थित्वा', {
          root: 'शन्थ्',
          affix: 'इत्वा',
          hasSetAugment: true
        });
        expect(result1.applicable).toBe(true);

        const result2 = sutra1223('कन्थित्वा', {
          root: 'कन्थ्',
          affix: 'इत्वा',
          hasSetAugment: true
        });
        expect(result2.applicable).toBe(true);
      });
    });

    describe('Example word recognition', () => {
      test('should recognize common example forms', () => {
        const result1 = sutra1223('मन्थित्वा', {
          root: 'मन्थ्',
          affix: 'इत्वा',
          hasSetAugment: true
        });
        expect(result1.applicable).toBe(true);

        const result2 = sutra1223('शन्थित्वा', {
          root: 'शन्थ्', 
          affix: 'इत्वा',
          hasSetAugment: true
        });
        expect(result2.applicable).toBe(true);
      });

      test('should recognize IAST example forms', () => {
        const result1 = sutra1223('manthitvā', {
          root: 'manth',
          affix: 'itvā',
          hasSetAugment: true
        });
        expect(result1.applicable).toBe(true);

        const result2 = sutra1223('śanthitvā', {
          root: 'śanth',
          affix: 'itvā', 
          hasSetAugment: true
        });
        expect(result2.applicable).toBe(true);
      });
    });

    describe('Negative cases - rule not applicable', () => {
      test('should not apply to non-qualifying roots', () => {
        const result = sutra1223('गत्वा', {
          root: 'गम्',
          affix: 'त्वा',
          hasSetAugment: true
        });
        
        expect(result.applicable).toBe(false);
        expect(result.optionallyPreventsKit).toBe(false);
        expect(result.explanation).toContain('applies only to roots with न् as उपधा ending in थ्/फ्');
      });

      test('should not apply to roots without न्-उपधा', () => {
        const result = sutra1223('गथित्वा', {
          root: 'गथ्',
          affix: 'क्त्वा',
          hasSetAugment: true
        });
        
        expect(result.applicable).toBe(false);
        expect(result.optionallyPreventsKit).toBe(false);
      });

      test('should not apply to roots not ending in थ्/फ्', () => {
        const result = sutra1223('मन्दित्वा', {
          root: 'मन्द्',
          affix: 'क्त्वा',
          hasSetAugment: true
        });
        
        expect(result.applicable).toBe(false);
        expect(result.optionallyPreventsKit).toBe(false);
      });

      test('should not apply to non-सेट् affixes', () => {
        const result = sutra1223('मन्थ्त्वा', {
          root: 'मन्थ्',
          affix: 'त्वा',
          hasSetAugment: false
        });
        
        expect(result.applicable).toBe(false);
        expect(result.optionallyPreventsKit).toBe(false);
        expect(result.explanation).toContain('requires सेट् क्त्वा affix');
      });

      test('should not apply to non-क्त्वा affixes', () => {
        const result = sutra1223('मन्थित', {
          root: 'मन्थ्',
          affix: 'क्त',
          hasSetAugment: true
        });
        
        expect(result.applicable).toBe(false);
        expect(result.optionallyPreventsKit).toBe(false);
      });
    });

    describe('Debug functionality', () => {
      test('should provide debug information when requested', () => {
        const result = sutra1223('मन्थित्वा', {
          root: 'मन्थ्',
          affix: 'क्त्वा',
          hasSetAugment: true,
          debug: true
        });
        
        expect(result.debug).toBeDefined();
        expect(result.debug.length).toBeGreaterThan(0);
        expect(result.debug.some(msg => msg.includes('[1.2.23]'))).toBe(true);
      });

      test('should not include debug information when not requested', () => {
        const result = sutra1223('मन्थित्वा', {
          root: 'मन्थ्',
          affix: 'क्त्वा',
          hasSetAugment: true
        });
        
        expect(result.debug).toBeUndefined();
      });
    });

    describe('Error handling', () => {
      test('should handle invalid inputs gracefully', () => {
        const result = sutra1223('', {});
        
        expect(result.applicable).toBe(false);
        expect(result.optionallyPreventsKit).toBe(false);
        expect(result.explanation).toContain('Invalid Sanskrit input');
      });

      test('should handle invalid Sanskrit words', () => {
        const result = sutra1223('xyz123', {});
        
        expect(result.applicable).toBe(false);
        expect(result.optionallyPreventsKit).toBe(false);
      });
    });

    describe('Result structure', () => {
      test('should return complete analysis object', () => {
        const result = sutra1223('मन्थित्वा', {
          root: 'मन्थ्',
          affix: 'क्त्वा',
          hasSetAugment: true
        });
        
        expect(result).toHaveProperty('applicable');
        expect(result).toHaveProperty('optionallyPreventsKit');
        expect(result).toHaveProperty('explanation');
        expect(result).toHaveProperty('sutra');
        expect(result).toHaveProperty('rule');
        expect(result).toHaveProperty('translation');
        expect(result).toHaveProperty('root');
        expect(result).toHaveProperty('affix');
        expect(result).toHaveProperty('rootType');
        expect(result).toHaveProperty('affixType');
        expect(result).toHaveProperty('optionality');
      });
    });
  });

  describe('Utility functions', () => {
    
    describe('getNaUpadhaThaPhaRoots', () => {
      test('should return Devanagari roots', () => {
        const roots = getNaUpadhaThaPhaRoots('devanagari');
        expect(roots).toContain('मन्थ्');
        expect(roots).toContain('शन्थ्');
        expect(roots).toContain('कन्थ्');
      });

      test('should return IAST roots by default', () => {
        const roots = getNaUpadhaThaPhaRoots();
        expect(roots).toContain('manth');
        expect(roots).toContain('śanth');
        expect(roots).toContain('kanth');
      });
    });

    describe('getSutra1223Examples', () => {
      test('should return example forms with analysis', () => {
        const examples = getSutra1223Examples();
        expect(examples.devanagari).toContain('मन्थित्वा');
        expect(examples.iast).toContain('manthitvā');
        expect(examples.analysis).toContain('Root has न् as उपधा and ends in थ्/फ्');
      });
    });

    describe('optionallyPreventsKitBySutra1223', () => {
      test('should correctly identify optional preventing conditions', () => {
        expect(optionallyPreventsKitBySutra1223('मन्थ्', 'क्त्वा', { hasSetAugment: true })).toBe(true);
        expect(optionallyPreventsKitBySutra1223('शन्थ्', 'इत्वा', { hasSetAugment: true })).toBe(true);
        expect(optionallyPreventsKitBySutra1223('गम्', 'क्त्वा', { hasSetAugment: true })).toBe(false);
        expect(optionallyPreventsKitBySutra1223('मन्थ्', 'क्त्वा', { hasSetAugment: false })).toBe(false);
        expect(optionallyPreventsKitBySutra1223('मन्थ्', 'क्त', { hasSetAugment: true })).toBe(false);
      });
    });
  });

  describe('Integration tests', () => {
    test('should work consistently across all functions', () => {
      const root = 'मन्थ्';
      const affix = 'क्त्वा';
      const context = { hasSetAugment: true };

      expect(hasNaUpadha(root)).toBe(true);
      expect(isThaPhaEnding(root)).toBe(true);
      expect(isNaUpadhaThaPhaRoot(root)).toBe(true);
      expect(isSetKtva(affix, context)).toBe(true);
      expect(optionallyPreventsKitBySutra1223(root, affix, context)).toBe(true);
      
      const result = sutra1223('मन्थित्वा', { root, affix, ...context });
      expect(result.applicable).toBe(true);
      expect(result.optionallyPreventsKit).toBe(true);
    });

    test('should handle cross-script consistency', () => {
      const result1 = sutra1223('मन्थित्वा', {
        root: 'मन्थ्',
        affix: 'क्त्वा',
        hasSetAugment: true
      });

      const result2 = sutra1223('manthitvā', {
        root: 'manth',
        affix: 'ktvā',
        augment: 'iṭ'
      });

      expect(result1.applicable).toBe(result2.applicable);
      expect(result1.optionallyPreventsKit).toBe(result2.optionallyPreventsKit);
    });

    test('should demonstrate optionality nature', () => {
      const result = sutra1223('मन्थित्वा', {
        root: 'मन्थ्',
        affix: 'क्त्वा',
        hasSetAugment: true
      });

      expect(result.optionality).toBe('vā (optional rule)');
      expect(result.explanation).toContain('optionally (वा)');
    });
  });
});
