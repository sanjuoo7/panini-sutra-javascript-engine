/**
 * Test suite for Sutra 1.2.24: वञ्चिलुञ्च्यृतश्च
 * 
 * Tests the optional अतिदेश rule that सेट् क्त्वा affix optionally (वा)
 * is NOT कित् after specific roots वञ्च्, लुञ्च्, यृत्
 */

import {
  sutra1224,
  isVanciLunciYritRoot,
  isVanciRoot,
  isLunciRoot,
  isYritRoot,
  isSetKtva,
  getVanciLunciYritRoots,
  getSutra1224Examples,
  optionallyPreventsKitBySutra1224
} from './index.js';

describe('Sutra 1.2.24: वञ्चिलुञ्च्यृतश्च', () => {

  describe('isVanciRoot function', () => {
    
    describe('Devanagari roots', () => {
      test('should identify वञ्च् root and variants', () => {
        expect(isVanciRoot('वञ्च्')).toBe(true);
        expect(isVanciRoot('वञ्च')).toBe(true);
        expect(isVanciRoot('वच्')).toBe(true);
        expect(isVanciRoot('वञ्ज्')).toBe(true);
      });
      
      test('should reject other roots', () => {
        expect(isVanciRoot('गम्')).toBe(false);
        expect(isVanciRoot('लुञ्च्')).toBe(false);
        expect(isVanciRoot('यृत्')).toBe(false);
        expect(isVanciRoot('कृ')).toBe(false);
      });
    });

    describe('IAST roots', () => {
      test('should identify vañc root and variants', () => {
        expect(isVanciRoot('vañc')).toBe(true);
        expect(isVanciRoot('vac')).toBe(true);
        expect(isVanciRoot('vañj')).toBe(true);
      });
      
      test('should reject other roots', () => {
        expect(isVanciRoot('gam')).toBe(false);
        expect(isVanciRoot('luñc')).toBe(false);
        expect(isVanciRoot('yṛt')).toBe(false);
        expect(isVanciRoot('kṛ')).toBe(false);
      });
    });
  });

  describe('isLunciRoot function', () => {
    
    describe('Devanagari roots', () => {
      test('should identify लुञ्च् root and variants', () => {
        expect(isLunciRoot('लुञ्च्')).toBe(true);
        expect(isLunciRoot('लुञ्च')).toBe(true);
        expect(isLunciRoot('लुच्')).toBe(true);
        expect(isLunciRoot('लुञ्ज्')).toBe(true);
      });
      
      test('should reject other roots', () => {
        expect(isLunciRoot('गम्')).toBe(false);
        expect(isLunciRoot('वञ्च्')).toBe(false);
        expect(isLunciRoot('यृत्')).toBe(false);
        expect(isLunciRoot('कृ')).toBe(false);
      });
    });

    describe('IAST roots', () => {
      test('should identify luñc root and variants', () => {
        expect(isLunciRoot('luñc')).toBe(true);
        expect(isLunciRoot('luc')).toBe(true);
        expect(isLunciRoot('luñj')).toBe(true);
      });
      
      test('should reject other roots', () => {
        expect(isLunciRoot('gam')).toBe(false);
        expect(isLunciRoot('vañc')).toBe(false);
        expect(isLunciRoot('yṛt')).toBe(false);
        expect(isLunciRoot('kṛ')).toBe(false);
      });
    });
  });

  describe('isYritRoot function', () => {
    
    describe('Devanagari roots', () => {
      test('should identify यृत् root and variants', () => {
        expect(isYritRoot('यृत्')).toBe(true);
        expect(isYritRoot('यृत')).toBe(true);
        expect(isYritRoot('ऋत्')).toBe(true);
        expect(isYritRoot('ऋत')).toBe(true);
      });
      
      test('should reject other roots', () => {
        expect(isYritRoot('गम्')).toBe(false);
        expect(isYritRoot('वञ्च्')).toBe(false);
        expect(isYritRoot('लुञ्च्')).toBe(false);
        expect(isYritRoot('कृ')).toBe(false);
      });
    });

    describe('IAST roots', () => {
      test('should identify yṛt root and variants', () => {
        expect(isYritRoot('yṛt')).toBe(true);
        expect(isYritRoot('ṛt')).toBe(true);
      });
      
      test('should reject other roots', () => {
        expect(isYritRoot('gam')).toBe(false);
        expect(isYritRoot('vañc')).toBe(false);
        expect(isYritRoot('luñc')).toBe(false);
        expect(isYritRoot('kṛ')).toBe(false);
      });
    });
  });

  describe('isVanciLunciYritRoot function', () => {
    
    describe('Positive cases', () => {
      test('should identify all three root types in Devanagari', () => {
        expect(isVanciLunciYritRoot('वञ्च्')).toBe(true);
        expect(isVanciLunciYritRoot('लुञ्च्')).toBe(true);
        expect(isVanciLunciYritRoot('यृत्')).toBe(true);
        expect(isVanciLunciYritRoot('वञ्च')).toBe(true);
        expect(isVanciLunciYritRoot('लुञ्च')).toBe(true);
        expect(isVanciLunciYritRoot('यृत')).toBe(true);
      });

      test('should identify all three root types in IAST', () => {
        expect(isVanciLunciYritRoot('vañc')).toBe(true);
        expect(isVanciLunciYritRoot('luñc')).toBe(true);
        expect(isVanciLunciYritRoot('yṛt')).toBe(true);
      });
    });

    describe('Negative cases', () => {
      test('should reject other roots', () => {
        expect(isVanciLunciYritRoot('गम्')).toBe(false);
        expect(isVanciLunciYritRoot('कृ')).toBe(false);
        expect(isVanciLunciYritRoot('पा')).toBe(false);
        expect(isVanciLunciYritRoot('दृश्')).toBe(false);
        expect(isVanciLunciYritRoot('gam')).toBe(false);
        expect(isVanciLunciYritRoot('kṛ')).toBe(false);
      });

      test('should handle invalid inputs', () => {
        expect(isVanciLunciYritRoot('')).toBe(false);
        expect(isVanciLunciYritRoot(null)).toBe(false);
        expect(isVanciLunciYritRoot(undefined)).toBe(false);
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

  describe('sutra1224 main function', () => {
    
    describe('Positive cases - optional rule application', () => {
      test('should optionally prevent कित् for वञ्च् + सेट् क्त्वा', () => {
        const result = sutra1224('वञ्चित्वा', {
          root: 'वञ्च्',
          affix: 'क्त्वा',
          hasSetAugment: true
        });
        
        expect(result.applicable).toBe(true);
        expect(result.optionallyPreventsKit).toBe(true);
        expect(result.sutra).toBe('1.2.24');
        expect(result.rootType).toBe('वञ्च् (to deceive)');
        expect(result.affixType).toBe('सेट् क्त्वा');
        expect(result.optionality).toBe('vā (optional rule)');
        expect(result.continuation).toBe('च (continuation from 1.2.23)');
      });

      test('should optionally prevent कित् for लुञ्च् + सेट् क्त्वा', () => {
        const result = sutra1224('लुञ्चित्वा', {
          root: 'लुञ्च्',
          affix: 'क्त्वा',
          hasSetAugment: true
        });
        
        expect(result.applicable).toBe(true);
        expect(result.optionallyPreventsKit).toBe(true);
        expect(result.rootType).toBe('लुञ्च् (to pluck)');
      });

      test('should optionally prevent कित् for यृत् + सेट् क्त्वा', () => {
        const result = sutra1224('यृतित्वा', {
          root: 'यृत्',
          affix: 'क्त्वा',
          hasSetAugment: true
        });
        
        expect(result.applicable).toBe(true);
        expect(result.optionallyPreventsKit).toBe(true);
        expect(result.rootType).toBe('यृत् (to endeavor)');
      });

      test('should handle IAST forms', () => {
        const result = sutra1224('vañcitvā', {
          root: 'vañc',
          affix: 'ktvā',
          augment: 'iṭ'
        });
        
        expect(result.applicable).toBe(true);
        expect(result.optionallyPreventsKit).toBe(true);
      });
    });

    describe('Example word recognition', () => {
      test('should recognize common example forms', () => {
        const result1 = sutra1224('वञ्चित्वा', {
          root: 'वञ्च्',
          affix: 'इत्वा',
          hasSetAugment: true
        });
        expect(result1.applicable).toBe(true);

        const result2 = sutra1224('लुञ्चित्वा', {
          root: 'लुञ्च्', 
          affix: 'इत्वा',
          hasSetAugment: true
        });
        expect(result2.applicable).toBe(true);

        const result3 = sutra1224('यृतित्वा', {
          root: 'यृत्', 
          affix: 'इत्वा',
          hasSetAugment: true
        });
        expect(result3.applicable).toBe(true);
      });

      test('should recognize IAST example forms', () => {
        const result1 = sutra1224('vañcitvā', {
          root: 'vañc',
          affix: 'itvā',
          hasSetAugment: true
        });
        expect(result1.applicable).toBe(true);

        const result2 = sutra1224('luñcitvā', {
          root: 'luñc',
          affix: 'itvā', 
          hasSetAugment: true
        });
        expect(result2.applicable).toBe(true);

        const result3 = sutra1224('yṛtitvā', {
          root: 'yṛt',
          affix: 'itvā', 
          hasSetAugment: true
        });
        expect(result3.applicable).toBe(true);
      });
    });

    describe('Negative cases - rule not applicable', () => {
      test('should not apply to other roots', () => {
        const result = sutra1224('गत्वा', {
          root: 'गम्',
          affix: 'त्वा',
          hasSetAugment: true
        });
        
        expect(result.applicable).toBe(false);
        expect(result.optionallyPreventsKit).toBe(false);
        expect(result.explanation).toContain('applies only to roots वञ्च्, लुञ्च्, or यृत्');
      });

      test('should not apply to roots from previous sutras', () => {
        const result = sutra1224('पुनित्वा', {
          root: 'पुङ्',
          affix: 'क्त्वा',
          hasSetAugment: true
        });
        
        expect(result.applicable).toBe(false);
        expect(result.optionallyPreventsKit).toBe(false);
      });

      test('should not apply to non-सेट् affixes', () => {
        const result = sutra1224('वञ्च्त्वा', {
          root: 'वञ्च्',
          affix: 'त्वा',
          hasSetAugment: false
        });
        
        expect(result.applicable).toBe(false);
        expect(result.optionallyPreventsKit).toBe(false);
        expect(result.explanation).toContain('requires सेट् क्त्वा affix');
      });

      test('should not apply to non-क्त्वा affixes', () => {
        const result = sutra1224('वञ्चित', {
          root: 'वञ्च्',
          affix: 'क्त',
          hasSetAugment: true
        });
        
        expect(result.applicable).toBe(false);
        expect(result.optionallyPreventsKit).toBe(false);
      });
    });

    describe('Debug functionality', () => {
      test('should provide debug information when requested', () => {
        const result = sutra1224('वञ्चित्वा', {
          root: 'वञ्च्',
          affix: 'क्त्वा',
          hasSetAugment: true,
          debug: true
        });
        
        expect(result.debug).toBeDefined();
        expect(result.debug.length).toBeGreaterThan(0);
        expect(result.debug.some(msg => msg.includes('[1.2.24]'))).toBe(true);
      });

      test('should show specific root type detection in debug', () => {
        const result = sutra1224('वञ्चित्वा', {
          root: 'वञ्च्',
          affix: 'क्त्वा',
          hasSetAugment: true,
          debug: true
        });
        
        expect(result.debug.some(msg => msg.includes('वञ्च्: true'))).toBe(true);
      });
    });

    describe('Error handling', () => {
      test('should handle invalid inputs gracefully', () => {
        const result = sutra1224('', {});
        
        expect(result.applicable).toBe(false);
        expect(result.optionallyPreventsKit).toBe(false);
        expect(result.explanation).toContain('Invalid Sanskrit input');
      });

      test('should handle invalid Sanskrit words', () => {
        const result = sutra1224('xyz123', {});
        
        expect(result.applicable).toBe(false);
        expect(result.optionallyPreventsKit).toBe(false);
      });
    });

    describe('Result structure', () => {
      test('should return complete analysis object', () => {
        const result = sutra1224('वञ्चित्वा', {
          root: 'वञ्च्',
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
        expect(result).toHaveProperty('continuation');
      });
    });
  });

  describe('Utility functions', () => {
    
    describe('getVanciLunciYritRoots', () => {
      test('should return Devanagari roots', () => {
        const roots = getVanciLunciYritRoots('devanagari');
        expect(roots.vanci).toContain('वञ्च्');
        expect(roots.lunci).toContain('लुञ्च्');
        expect(roots.yrit).toContain('यृत्');
      });

      test('should return IAST roots by default', () => {
        const roots = getVanciLunciYritRoots();
        expect(roots.vanci).toContain('vañc');
        expect(roots.lunci).toContain('luñc');
        expect(roots.yrit).toContain('yṛt');
      });
    });

    describe('getSutra1224Examples', () => {
      test('should return example forms with analysis', () => {
        const examples = getSutra1224Examples();
        expect(examples.devanagari).toContain('वञ्चित्वा');
        expect(examples.devanagari).toContain('लुञ्चित्वा');
        expect(examples.devanagari).toContain('यृतित्वा');
        expect(examples.iast).toContain('vañcitvā');
        expect(examples.analysis).toContain('Specific roots: वञ्च्, लुञ्च्, यृत्');
        expect(examples.analysis).toContain('Continuation of 1.2.23 pattern with च (ca)');
      });
    });

    describe('optionallyPreventsKitBySutra1224', () => {
      test('should correctly identify optional preventing conditions', () => {
        expect(optionallyPreventsKitBySutra1224('वञ्च्', 'क्त्वा', { hasSetAugment: true })).toBe(true);
        expect(optionallyPreventsKitBySutra1224('लुञ्च्', 'इत्वा', { hasSetAugment: true })).toBe(true);
        expect(optionallyPreventsKitBySutra1224('यृत्', 'क्त्वा', { hasSetAugment: true })).toBe(true);
        expect(optionallyPreventsKitBySutra1224('गम्', 'क्त्वा', { hasSetAugment: true })).toBe(false);
        expect(optionallyPreventsKitBySutra1224('वञ्च्', 'क्त्वा', { hasSetAugment: false })).toBe(false);
        expect(optionallyPreventsKitBySutra1224('वञ्च्', 'क्त', { hasSetAugment: true })).toBe(false);
      });
    });
  });

  describe('Individual root detection', () => {
    test('should correctly categorize each root type', () => {
      // Test that the main function correctly identifies each specific root
      expect(isVanciRoot('वञ्च्')).toBe(true);
      expect(isLunciRoot('वञ्च्')).toBe(false);
      expect(isYritRoot('वञ्च्')).toBe(false);

      expect(isVanciRoot('लुञ्च्')).toBe(false);
      expect(isLunciRoot('लुञ्च्')).toBe(true);
      expect(isYritRoot('लुञ्च्')).toBe(false);

      expect(isVanciRoot('यृत्')).toBe(false);
      expect(isLunciRoot('यृत्')).toBe(false);
      expect(isYritRoot('यृत्')).toBe(true);
    });
  });

  describe('Integration tests', () => {
    test('should work consistently across all functions', () => {
      const root = 'वञ्च्';
      const affix = 'क्त्वा';
      const context = { hasSetAugment: true };

      expect(isVanciRoot(root)).toBe(true);
      expect(isVanciLunciYritRoot(root)).toBe(true);
      expect(isSetKtva(affix, context)).toBe(true);
      expect(optionallyPreventsKitBySutra1224(root, affix, context)).toBe(true);
      
      const result = sutra1224('वञ्चित्वा', { root, affix, ...context });
      expect(result.applicable).toBe(true);
      expect(result.optionallyPreventsKit).toBe(true);
    });

    test('should handle cross-script consistency', () => {
      const result1 = sutra1224('वञ्चित्वा', {
        root: 'वञ्च्',
        affix: 'क्त्वा',
        hasSetAugment: true
      });

      const result2 = sutra1224('vañcitvā', {
        root: 'vañc',
        affix: 'ktvā',
        augment: 'iṭ'
      });

      expect(result1.applicable).toBe(result2.applicable);
      expect(result1.optionallyPreventsKit).toBe(result2.optionallyPreventsKit);
    });

    test('should demonstrate continuation from 1.2.23', () => {
      const result = sutra1224('वञ्चित्वा', {
        root: 'वञ्च्',
        affix: 'क्त्वा',
        hasSetAugment: true
      });

      expect(result.continuation).toBe('च (continuation from 1.2.23)');
      expect(result.optionality).toBe('vā (optional rule)');
    });

    test('should test all three root types comprehensively', () => {
      const testCases = [
        { root: 'वञ्च्', word: 'वञ्चित्वा', meaning: 'to deceive' },
        { root: 'लुञ्च्', word: 'लुञ्चित्वा', meaning: 'to pluck' },
        { root: 'यृत्', word: 'यृतित्वा', meaning: 'to endeavor' }
      ];

      testCases.forEach(testCase => {
        const result = sutra1224(testCase.word, {
          root: testCase.root,
          affix: 'क्त्वा',
          hasSetAugment: true
        });

        expect(result.applicable).toBe(true);
        expect(result.optionallyPreventsKit).toBe(true);
        expect(result.rootType).toContain(testCase.meaning);
      });
    });
  });
});
