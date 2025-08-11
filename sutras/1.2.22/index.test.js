/**
 * Test suite for Sutra 1.2.22: पूङः क्त्वा च
 * 
 * Tests the अतिदेश rule that सेट् निष्ठा affix and सेट् क्त्वा affix 
 * are NOT कित् after पुङ् 'to purify'
 */

import {
  sutra1222,
  isPungRoot,
  isSetNishtha,
  isSetKtva,
  getPungRoots,
  getSutra1222Examples,
  preventsKitBySutra1222
} from './index.js';

describe('Sutra 1.2.22: पूङः क्त्वा च', () => {

  describe('isPungRoot function', () => {
    
    describe('Devanagari roots', () => {
      test('should identify पुङ् root and variants', () => {
        expect(isPungRoot('पुङ्')).toBe(true);
        expect(isPungRoot('पु')).toBe(true);
        expect(isPungRoot('पुन्')).toBe(true);
        expect(isPungRoot('पूङ्')).toBe(true);
        expect(isPungRoot('पून्')).toBe(true);
      });
      
      test('should reject other roots', () => {
        expect(isPungRoot('गम्')).toBe(false);
        expect(isPungRoot('कृ')).toBe(false);
        expect(isPungRoot('पा')).toBe(false);
        expect(isPungRoot('पूर्')).toBe(false);
      });
    });

    describe('IAST roots', () => {
      test('should identify puṅ root and variants', () => {
        expect(isPungRoot('puṅ')).toBe(true);
        expect(isPungRoot('pu')).toBe(true);
        expect(isPungRoot('pun')).toBe(true);
        expect(isPungRoot('pūṅ')).toBe(true);
        expect(isPungRoot('pūn')).toBe(true);
      });
      
      test('should reject other roots', () => {
        expect(isPungRoot('gam')).toBe(false);
        expect(isPungRoot('kṛ')).toBe(false);
        expect(isPungRoot('pā')).toBe(false);
        expect(isPungRoot('pūr')).toBe(false);
      });
    });

    describe('Edge cases', () => {
      test('should handle invalid inputs', () => {
        expect(isPungRoot('')).toBe(false);
        expect(isPungRoot(null)).toBe(false);
        expect(isPungRoot(undefined)).toBe(false);
      });
    });
  });

  describe('isSetNishtha function', () => {
    
    describe('Positive cases', () => {
      test('should identify सेट् निष्ठा affixes with context', () => {
        expect(isSetNishtha('क्त', { hasSetAugment: true })).toBe(true);
        expect(isSetNishtha('क्तवत्', { hasItAugment: true })).toBe(true);
        expect(isSetNishtha('kta', { augment: 'iṭ' })).toBe(true);
        expect(isSetNishtha('ktavat', { augment: 'seṭ' })).toBe(true);
      });
      
      test('should identify सेट् निष्ठा from form patterns', () => {
        expect(isSetNishtha('इत', {})).toBe(true);
        expect(isSetNishtha('ित', {})).toBe(true);
        expect(isSetNishtha('ita', {})).toBe(true);
      });
    });

    describe('Negative cases', () => {
      test('should reject non-निष्ठा affixes', () => {
        expect(isSetNishtha('सिच्', { hasSetAugment: true })).toBe(false);
        expect(isSetNishtha('लिङ्', { hasSetAugment: true })).toBe(false);
        expect(isSetNishtha('sic', { augment: 'iṭ' })).toBe(false);
      });
      
      test('should reject निष्ठा without सेट्', () => {
        expect(isSetNishtha('क्त', {})).toBe(false);
        expect(isSetNishtha('kta', {})).toBe(false);
      });
    });
  });

  describe('isSetKtva function', () => {
    
    describe('Positive cases', () => {
      test('should identify सेट् क्त्वा affixes with context', () => {
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

  describe('sutra1222 main function', () => {
    
    describe('Positive cases - rule application', () => {
      test('should prevent कित् for पुङ् + सेट् निष्ठा', () => {
        const result = sutra1222('पुनीत', {
          root: 'पुङ्',
          affix: 'क्त',
          hasSetAugment: true
        });
        
        expect(result.applicable).toBe(true);
        expect(result.preventsKit).toBe(true);
        expect(result.sutra).toBe('1.2.22');
        expect(result.rootType).toBe('पुङ्');
        expect(result.affixType).toBe('सेट् निष्ठा');
      });

      test('should prevent कित् for पुङ् + सेट् क्त्वा', () => {
        const result = sutra1222('पुनित्वा', {
          root: 'पुङ्',
          affix: 'क्त्वा',
          hasSetAugment: true
        });
        
        expect(result.applicable).toBe(true);
        expect(result.preventsKit).toBe(true);
        expect(result.sutra).toBe('1.2.22');
        expect(result.rootType).toBe('पुङ्');
        expect(result.affixType).toBe('सेट् क्त्वा');
      });

      test('should handle IAST forms', () => {
        const result = sutra1222('punīta', {
          root: 'puṅ',
          affix: 'kta',
          augment: 'iṭ'
        });
        
        expect(result.applicable).toBe(true);
        expect(result.preventsKit).toBe(true);
      });
    });

    describe('Example word recognition', () => {
      test('should recognize common example forms', () => {
        const result1 = sutra1222('पुनीत', {
          root: 'पुङ्',
          affix: 'इत',
          hasSetAugment: true
        });
        expect(result1.applicable).toBe(true);

        const result2 = sutra1222('पुनित्वा', {
          root: 'पुङ्', 
          affix: 'इत्वा',
          hasSetAugment: true
        });
        expect(result2.applicable).toBe(true);
      });

      test('should recognize IAST example forms', () => {
        const result1 = sutra1222('punīta', {
          root: 'puṅ',
          affix: 'ita',
          hasSetAugment: true
        });
        expect(result1.applicable).toBe(true);

        const result2 = sutra1222('punitvā', {
          root: 'puṅ',
          affix: 'itvā', 
          hasSetAugment: true
        });
        expect(result2.applicable).toBe(true);
      });
    });

    describe('Negative cases - rule not applicable', () => {
      test('should not apply to other roots', () => {
        const result = sutra1222('गत', {
          root: 'गम्',
          affix: 'क्त',
          hasSetAugment: true
        });
        
        expect(result.applicable).toBe(false);
        expect(result.preventsKit).toBe(false);
        expect(result.explanation).toContain('applies only to पुङ् root');
      });

      test('should not apply to non-सेट् affixes', () => {
        const result = sutra1222('पुत', {
          root: 'पुङ्',
          affix: 'क्त',
          hasSetAugment: false
        });
        
        expect(result.applicable).toBe(false);
        expect(result.preventsKit).toBe(false);
        expect(result.explanation).toContain('requires सेट् निष्ठा or सेट् क्त्वा affix');
      });

      test('should not apply to inappropriate affix types', () => {
        const result = sutra1222('पुङ्यति', {
          root: 'पुङ्',
          affix: 'यत्',
          hasSetAugment: true
        });
        
        expect(result.applicable).toBe(false);
        expect(result.preventsKit).toBe(false);
      });
    });

    describe('Debug functionality', () => {
      test('should provide debug information when requested', () => {
        const result = sutra1222('पुनीत', {
          root: 'पुङ्',
          affix: 'क्त',
          hasSetAugment: true,
          debug: true
        });
        
        expect(result.debug).toBeDefined();
        expect(result.debug.length).toBeGreaterThan(0);
        expect(result.debug.some(msg => msg.includes('[1.2.22]'))).toBe(true);
      });

      test('should not include debug information when not requested', () => {
        const result = sutra1222('पुनीत', {
          root: 'पुङ्',
          affix: 'क्त',
          hasSetAugment: true
        });
        
        expect(result.debug).toBeUndefined();
      });
    });

    describe('Error handling', () => {
      test('should handle invalid inputs gracefully', () => {
        const result = sutra1222('', {});
        
        expect(result.applicable).toBe(false);
        expect(result.preventsKit).toBe(false);
        expect(result.explanation).toContain('Invalid Sanskrit input');
      });

      test('should handle invalid Sanskrit words', () => {
        const result = sutra1222('xyz123', {});
        
        expect(result.applicable).toBe(false);
        expect(result.preventsKit).toBe(false);
      });
    });

    describe('Result structure', () => {
      test('should return complete analysis object', () => {
        const result = sutra1222('पुनीत', {
          root: 'पुङ्',
          affix: 'क्त',
          hasSetAugment: true
        });
        
        expect(result).toHaveProperty('applicable');
        expect(result).toHaveProperty('preventsKit');
        expect(result).toHaveProperty('explanation');
        expect(result).toHaveProperty('sutra');
        expect(result).toHaveProperty('root');
        expect(result).toHaveProperty('affix');
        expect(result).toHaveProperty('rootType');
        expect(result).toHaveProperty('affixType');
      });
    });
  });

  describe('Utility functions', () => {
    
    describe('getPungRoots', () => {
      test('should return Devanagari roots', () => {
        const roots = getPungRoots('devanagari');
        expect(roots).toContain('पुङ्');
        expect(roots).toContain('पु');
        expect(roots).toContain('पुन्');
      });

      test('should return IAST roots by default', () => {
        const roots = getPungRoots();
        expect(roots).toContain('puṅ');
        expect(roots).toContain('pu');
        expect(roots).toContain('pun');
      });
    });

    describe('getSutra1222Examples', () => {
      test('should return example forms', () => {
        const examples = getSutra1222Examples();
        expect(examples.devanagari).toContain('पुनीत');
        expect(examples.iast).toContain('punīta');
      });
    });

    describe('preventsKitBySutra1222', () => {
      test('should correctly identify preventing conditions', () => {
        expect(preventsKitBySutra1222('पुङ्', 'क्त', { hasSetAugment: true })).toBe(true);
        expect(preventsKitBySutra1222('पुङ्', 'क्त्वा', { hasSetAugment: true })).toBe(true);
        expect(preventsKitBySutra1222('गम्', 'क्त', { hasSetAugment: true })).toBe(false);
        expect(preventsKitBySutra1222('पुङ्', 'क्त', { hasSetAugment: false })).toBe(false);
      });
    });
  });

  describe('Integration tests', () => {
    test('should work consistently across all functions', () => {
      const root = 'पुङ्';
      const affix = 'क्त';
      const context = { hasSetAugment: true };

      expect(isPungRoot(root)).toBe(true);
      expect(isSetNishtha(affix, context)).toBe(true);
      expect(preventsKitBySutra1222(root, affix, context)).toBe(true);
      
      const result = sutra1222('पुनीत', { root, affix, ...context });
      expect(result.applicable).toBe(true);
      expect(result.preventsKit).toBe(true);
    });

    test('should handle cross-script consistency', () => {
      const result1 = sutra1222('पुनीत', {
        root: 'पुङ्',
        affix: 'क्त',
        hasSetAugment: true
      });

      const result2 = sutra1222('punīta', {
        root: 'puṅ',
        affix: 'kta',
        augment: 'iṭ'
      });

      expect(result1.applicable).toBe(result2.applicable);
      expect(result1.preventsKit).toBe(result2.preventsKit);
    });
  });
});
