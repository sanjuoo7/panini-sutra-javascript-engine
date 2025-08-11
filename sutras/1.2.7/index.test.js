/**
 * Tests for Sutra 1.2.7: मृडमृदगुधकुषक्लिशवदवसः क्त्वा
 * Tests the designation of क्त्वा as कित् after specific verbal roots
 */

import {
  isKitKtvāRoot,
  isKtvāAffix,
  isKitByKtvāSpecialRoots,
  analyzeKitKtvāApplication,
  getKitKtvāRoots,
  getKitKtvāExamples,
  KIT_KTVĀ_ROOTS,
  KTVĀ_AFFIX_FORMS
} from './index.js';

describe('Sutra 1.2.7: मृडमृदगुधकुषक्लिशवदवसः क्त्वा', () => {
  
  describe('isKitKtvāRoot function', () => {
    describe('Special roots (should return true)', () => {
      test('should identify Devanagari special roots', () => {
        expect(isKitKtvāRoot('मृड्')).toBe(true);
        expect(isKitKtvāRoot('मृद्')).toBe(true);
        expect(isKitKtvāRoot('गुध्')).toBe(true);
        expect(isKitKtvāRoot('कुष्')).toBe(true);
        expect(isKitKtvāRoot('क्लिश्')).toBe(true);
        expect(isKitKtvāRoot('वद्')).toBe(true);
        expect(isKitKtvāRoot('वस्')).toBe(true);
      });

      test('should identify IAST special roots', () => {
        expect(isKitKtvāRoot('mṛḍ')).toBe(true);
        expect(isKitKtvāRoot('mṛd')).toBe(true);
        expect(isKitKtvāRoot('gudh')).toBe(true);
        expect(isKitKtvāRoot('kuṣ')).toBe(true);
        expect(isKitKtvāRoot('kliś')).toBe(true);
        expect(isKitKtvāRoot('vad')).toBe(true);
        expect(isKitKtvāRoot('vas')).toBe(true);
      });
    });

    describe('Non-special roots (should return false)', () => {
      test('should reject common roots not in the list', () => {
        expect(isKitKtvāRoot('गम्')).toBe(false);
        expect(isKitKtvāRoot('कृ')).toBe(false);
        expect(isKitKtvāRoot('भू')).toBe(false);
        expect(isKitKtvāRoot('दा')).toBe(false);
        expect(isKitKtvāRoot('स्था')).toBe(false);
        
        expect(isKitKtvāRoot('gam')).toBe(false);
        expect(isKitKtvāRoot('kṛ')).toBe(false);
        expect(isKitKtvāRoot('bhū')).toBe(false);
        expect(isKitKtvāRoot('dā')).toBe(false);
        expect(isKitKtvāRoot('sthā')).toBe(false);
      });

      test('should reject similar but different roots', () => {
        expect(isKitKtvāRoot('मृज्')).toBe(false); // Similar to मृड्/मृद्
        expect(isKitKtvāRoot('विद्')).toBe(false); // Similar to वद्
        expect(isKitKtvāRoot('वस्')).toBe(true);   // But वस् is included
        expect(isKitKtvāRoot('वंस्')).toBe(false); // Different from वस्
      });
    });

    describe('Input validation', () => {
      test('should handle invalid inputs', () => {
        expect(isKitKtvāRoot('')).toBe(false);
        expect(isKitKtvāRoot('   ')).toBe(false);
        expect(isKitKtvāRoot(null)).toBe(false);
        expect(isKitKtvāRoot(undefined)).toBe(false);
        expect(isKitKtvāRoot(123)).toBe(false);
      });

      test('should handle whitespace', () => {
        expect(isKitKtvāRoot(' मृड् ')).toBe(true);
        expect(isKitKtvāRoot(' vad ')).toBe(true);
      });
    });
  });

  describe('isKtvāAffix function', () => {
    describe('Valid क्त्वा affixes', () => {
      test('should identify Devanagari क्त्वा forms', () => {
        expect(isKtvāAffix('क्त्वा')).toBe(true);
        expect(isKtvāAffix('त्वा')).toBe(true);
      });

      test('should identify IAST ktvā forms', () => {
        expect(isKtvāAffix('ktvā')).toBe(true);
        expect(isKtvāAffix('tvā')).toBe(true);
      });
    });

    describe('Invalid affixes', () => {
      test('should reject other affixes', () => {
        expect(isKtvāAffix('क्त')).toBe(false);
        expect(isKtvāAffix('त')).toBe(false);
        expect(isKtvāAffix('अन्त')).toBe(false);
        expect(isKtvāAffix('ति')).toBe(false);
        
        expect(isKtvāAffix('kta')).toBe(false);
        expect(isKtvāAffix('ta')).toBe(false);
        expect(isKtvāAffix('anta')).toBe(false);
        expect(isKtvāAffix('ti')).toBe(false);
      });

      test('should handle invalid inputs', () => {
        expect(isKtvāAffix('')).toBe(false);
        expect(isKtvāAffix(null)).toBe(false);
        expect(isKtvāAffix(undefined)).toBe(false);
        expect(isKtvāAffix(123)).toBe(false);
      });
    });
  });

  describe('isKitByKtvāSpecialRoots function - Main Logic', () => {
    describe('Positive cases (should become कित्)', () => {
      test('should return true for special root + क्त्वा combinations (Devanagari)', () => {
        expect(isKitByKtvāSpecialRoots('मृड्', 'क्त्वा')).toBe(true);
        expect(isKitByKtvāSpecialRoots('मृद्', 'क्त्वा')).toBe(true);
        expect(isKitByKtvāSpecialRoots('गुध्', 'क्त्वा')).toBe(true);
        expect(isKitByKtvāSpecialRoots('कुष्', 'क्त्वा')).toBe(true);
        expect(isKitByKtvāSpecialRoots('क्लिश्', 'क्त्वा')).toBe(true);
        expect(isKitByKtvāSpecialRoots('वद्', 'क्त्वा')).toBe(true);
        expect(isKitByKtvāSpecialRoots('वस्', 'क्त्वा')).toBe(true);
      });

      test('should return true for special root + क्त्वा combinations (IAST)', () => {
        expect(isKitByKtvāSpecialRoots('mṛḍ', 'ktvā')).toBe(true);
        expect(isKitByKtvāSpecialRoots('mṛd', 'ktvā')).toBe(true);
        expect(isKitByKtvāSpecialRoots('gudh', 'ktvā')).toBe(true);
        expect(isKitByKtvāSpecialRoots('kuṣ', 'ktvā')).toBe(true);
        expect(isKitByKtvāSpecialRoots('kliś', 'ktvā')).toBe(true);
        expect(isKitByKtvāSpecialRoots('vad', 'ktvā')).toBe(true);
        expect(isKitByKtvāSpecialRoots('vas', 'ktvā')).toBe(true);
      });

      test('should work with त्वा variant', () => {
        expect(isKitByKtvāSpecialRoots('मृड्', 'त्वा')).toBe(true);
        expect(isKitByKtvāSpecialRoots('वद्', 'त्वा')).toBe(true);
        expect(isKitByKtvāSpecialRoots('mṛḍ', 'tvā')).toBe(true);
        expect(isKitByKtvāSpecialRoots('vad', 'tvā')).toBe(true);
      });

      test('should handle mixed scripts', () => {
        expect(isKitByKtvāSpecialRoots('वद्', 'ktvā')).toBe(true);
        expect(isKitByKtvāSpecialRoots('vad', 'क्त्वा')).toBe(true);
      });
    });

    describe('Negative cases (should not become कित्)', () => {
      test('should return false for non-special roots', () => {
        expect(isKitByKtvāSpecialRoots('गम्', 'क्त्वा')).toBe(false);
        expect(isKitByKtvāSpecialRoots('कृ', 'क्त्वा')).toBe(false);
        expect(isKitByKtvāSpecialRoots('भू', 'क्त्वा')).toBe(false);
        
        expect(isKitByKtvāSpecialRoots('gam', 'ktvā')).toBe(false);
        expect(isKitByKtvāSpecialRoots('kṛ', 'ktvā')).toBe(false);
        expect(isKitByKtvāSpecialRoots('bhū', 'ktvā')).toBe(false);
      });

      test('should return false for special roots with non-क्त्वा affixes', () => {
        expect(isKitByKtvāSpecialRoots('मृड्', 'क्त')).toBe(false);
        expect(isKitByKtvāSpecialRoots('वद्', 'ति')).toBe(false);
        expect(isKitByKtvāSpecialRoots('वस्', 'अन्त')).toBe(false);
        
        expect(isKitByKtvāSpecialRoots('mṛḍ', 'kta')).toBe(false);
        expect(isKitByKtvāSpecialRoots('vad', 'ti')).toBe(false);
        expect(isKitByKtvāSpecialRoots('vas', 'anta')).toBe(false);
      });

      test('should return false for non-special root + non-क्त्वा combinations', () => {
        expect(isKitByKtvāSpecialRoots('गम्', 'क्त')).toBe(false);
        expect(isKitByKtvāSpecialRoots('कृ', 'ति')).toBe(false);
        expect(isKitByKtvāSpecialRoots('gam', 'kta')).toBe(false);
        expect(isKitByKtvāSpecialRoots('kṛ', 'ti')).toBe(false);
      });
    });

    describe('Input validation', () => {
      test('should handle invalid inputs gracefully', () => {
        expect(isKitByKtvāSpecialRoots('', 'क्त्वा')).toBe(false);
        expect(isKitByKtvāSpecialRoots('मृड्', '')).toBe(false);
        expect(isKitByKtvāSpecialRoots(null, 'क्त्वा')).toBe(false);
        expect(isKitByKtvāSpecialRoots('मृड्', null)).toBe(false);
        expect(isKitByKtvāSpecialRoots(undefined, undefined)).toBe(false);
      });

      test('should handle whitespace', () => {
        expect(isKitByKtvāSpecialRoots(' मृड् ', ' क्त्वा ')).toBe(true);
        expect(isKitByKtvāSpecialRoots(' vad ', ' ktvā ')).toBe(true);
      });
    });
  });

  describe('analyzeKitKtvāApplication function', () => {
    describe('Valid applications', () => {
      test('should provide detailed analysis for special root combinations', () => {
        const result = analyzeKitKtvāApplication('मृड्', 'क्त्वा');
        
        expect(result.isValid).toBe(true);
        expect(result.error).toBeNull();
        expect(result.analysis).toBeDefined();
        expect(result.analysis.root).toBe('मृड्');
        expect(result.analysis.affix).toBe('क्त्वा');
        expect(result.analysis.isKtvāAffix).toBe(true);
        expect(result.analysis.isSpecialRoot).toBe(true);
        expect(result.analysis.becomesKit).toBe(true);
        expect(result.analysis.reason).toContain('क्त्वा becomes कित्');
        expect(result.analysis.morphologicalEffects).toContain('Blocks guṇa transformation of the root');
        expect(result.analysis.examples.length).toBeGreaterThan(0);
      });

      test('should provide analysis for IAST combinations', () => {
        const result = analyzeKitKtvāApplication('vad', 'ktvā');
        
        expect(result.isValid).toBe(true);
        expect(result.analysis.becomesKit).toBe(true);
        expect(result.analysis.rootScript).toBe('IAST');
        expect(result.analysis.affixScript).toBe('IAST');
        expect(result.analysis.examples.length).toBeGreaterThan(0);
      });
    });

    describe('Non-applications', () => {
      test('should explain why non-special roots do not apply', () => {
        const result = analyzeKitKtvāApplication('गम्', 'क्त्वा');
        
        expect(result.isValid).toBe(true);
        expect(result.analysis.becomesKit).toBe(false);
        expect(result.analysis.isKtvāAffix).toBe(true);
        expect(result.analysis.isSpecialRoot).toBe(false);
        expect(result.analysis.reason).toContain('not among the special roots');
      });

      test('should explain why non-क्त्वा affixes do not apply', () => {
        const result = analyzeKitKtvāApplication('मृड्', 'क्त');
        
        expect(result.isValid).toBe(true);
        expect(result.analysis.becomesKit).toBe(false);
        expect(result.analysis.isKtvāAffix).toBe(false);
        expect(result.analysis.isSpecialRoot).toBe(true);
        expect(result.analysis.reason).toContain('not क्त्वा');
      });
    });

    describe('Error handling', () => {
      test('should handle invalid inputs', () => {
        const result = analyzeKitKtvāApplication('', 'क्त्वा');
        
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('Invalid root or affix input');
        expect(result.analysis).toBeNull();
      });
    });
  });

  describe('getKitKtvāRoots function', () => {
    test('should return Devanagari roots when specified', () => {
      const roots = getKitKtvāRoots('Devanagari');
      expect(Array.isArray(roots)).toBe(true);
      expect(roots).toContain('मृड्');
      expect(roots).toContain('वद्');
      expect(roots).toContain('वस्');
      expect(roots.length).toBe(7);
    });

    test('should return IAST roots when specified', () => {
      const roots = getKitKtvāRoots('IAST');
      expect(Array.isArray(roots)).toBe(true);
      expect(roots).toContain('mṛḍ');
      expect(roots).toContain('vad');
      expect(roots).toContain('vas');
      expect(roots.length).toBe(7);
    });

    test('should return both scripts by default', () => {
      const roots = getKitKtvāRoots();
      expect(roots).toHaveProperty('devanagari');
      expect(roots).toHaveProperty('iast');
      expect(Array.isArray(roots.devanagari)).toBe(true);
      expect(Array.isArray(roots.iast)).toBe(true);
      expect(roots.devanagari.length).toBe(7);
      expect(roots.iast.length).toBe(7);
    });
  });

  describe('getKitKtvāExamples function', () => {
    test('should provide comprehensive examples', () => {
      const examples = getKitKtvāExamples();
      
      expect(examples).toHaveProperty('sutra');
      expect(examples).toHaveProperty('meaning');
      expect(examples).toHaveProperty('examples');
      expect(examples).toHaveProperty('contrast');
      
      expect(Array.isArray(examples.examples)).toBe(true);
      expect(Array.isArray(examples.contrast)).toBe(true);
      expect(examples.examples.length).toBeGreaterThan(0);
      expect(examples.contrast.length).toBeGreaterThan(0);
      
      // Check that examples show the kit effect
      const firstExample = examples.examples[0];
      expect(firstExample).toHaveProperty('root');
      expect(firstExample).toHaveProperty('normal');
      expect(firstExample).toHaveProperty('explanation');
      expect(firstExample.explanation).toContain('कित्');
    });
  });

  describe('Constants validation', () => {
    test('KIT_KTVĀ_ROOTS should have matching lengths', () => {
      expect(KIT_KTVĀ_ROOTS.devanagari.length).toBe(KIT_KTVĀ_ROOTS.iast.length);
      expect(KIT_KTVĀ_ROOTS.devanagari.length).toBe(7);
    });

    test('KTVĀ_AFFIX_FORMS should have matching lengths', () => {
      expect(KTVĀ_AFFIX_FORMS.devanagari.length).toBe(KTVĀ_AFFIX_FORMS.iast.length);
      expect(KTVĀ_AFFIX_FORMS.devanagari.length).toBe(2);
    });

    test('All root entries should be non-empty strings', () => {
      [...KIT_KTVĀ_ROOTS.devanagari, ...KIT_KTVĀ_ROOTS.iast].forEach(root => {
        expect(typeof root).toBe('string');
        expect(root.length).toBeGreaterThan(0);
        expect(root.trim()).toBe(root);
      });
    });
  });

  describe('Integration scenarios', () => {
    test('should handle all seven special roots correctly', () => {
      const specialRoots = {
        'मृड्': 'mṛḍ',
        'मृद्': 'mṛd', 
        'गुध्': 'gudh',
        'कुष्': 'kuṣ',
        'क्लिश्': 'kliś',
        'वद्': 'vad',
        'वस्': 'vas'
      };

      Object.entries(specialRoots).forEach(([devanagari, iast]) => {
        expect(isKitByKtvāSpecialRoots(devanagari, 'क्त्वा')).toBe(true);
        expect(isKitByKtvāSpecialRoots(iast, 'ktvā')).toBe(true);
        
        const devAnalysis = analyzeKitKtvāApplication(devanagari, 'क्त्वा');
        const iastAnalysis = analyzeKitKtvāApplication(iast, 'ktvā');
        
        expect(devAnalysis.analysis.becomesKit).toBe(true);
        expect(iastAnalysis.analysis.becomesKit).toBe(true);
      });
    });

    test('should demonstrate morphological blocking effect', () => {
      // This sutra's primary purpose is to block guṇa/vṛddhi
      const result = analyzeKitKtvāApplication('वद्', 'क्त्वा');
      expect(result.analysis.morphologicalEffects).toContain('Blocks guṇa transformation of the root');
      
      // The analysis should show this prevents वद् → वाद् transformation
      const examples = result.analysis.examples;
      expect(examples.length).toBeGreaterThan(0);
      expect(examples[0].explanation).toContain('no guṇa');
    });
  });

  describe('Edge cases and boundary conditions', () => {
    test('should handle roots that are similar but not identical', () => {
      // Test roots that might be confused with the special ones
      expect(isKitKtvāRoot('मृज्')).toBe(false); // Similar to मृड्/मृद्
      expect(isKitKtvāRoot('विद्')).toBe(false); // Similar to वद्
      expect(isKitKtvāRoot('वंस्')).toBe(false); // Similar to वस्
      expect(isKitKtvāRoot('गुह्')).toBe(false); // Similar to गुध्
    });

    test('should be case-sensitive for script detection', () => {
      // The function should properly detect scripts
      const devResult = analyzeKitKtvāApplication('मृड्', 'क्त्वा');
      const iastResult = analyzeKitKtvāApplication('mṛḍ', 'ktvā');
      
      expect(devResult.analysis.rootScript).toBe('Devanagari');
      expect(devResult.analysis.affixScript).toBe('Devanagari');
      expect(iastResult.analysis.rootScript).toBe('IAST');
      expect(iastResult.analysis.affixScript).toBe('IAST');
    });
  });
});
