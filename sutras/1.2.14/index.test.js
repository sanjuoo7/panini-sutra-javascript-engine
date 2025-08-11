/**
 * Test Suite for Sutra 1.2.14: हनः सिच् (hanaḥ sic)
 * 
 * Tests the कित् designation for सिच् affix after हन् root
 * in आत्मनेपद contexts.
 */

import { 
  sutra_1_2_14, 
  isSicKitAfterHan, 
  analyzeHanSicKit,
  isHanSicCombination 
} from './index.js';

describe('Sutra 1.2.14: हनः सिच् (hanaḥ sic)', () => {
  
  describe('Core Functionality', () => {
    
    test('should make सिच् कित् after हन् root in आत्मनेपद', () => {
      const testCases = [
        {
          word: 'हन्',
          context: { 
            affix: 'सिच्', 
            followingAffix: 'ते',
            debug: true 
          },
          expected: true,
          description: 'हन् + सिच् + आत्मनेपद affix'
        },
        {
          word: 'हन',
          context: { 
            affix: 'सिच्', 
            followingAffix: 'त',
            debug: true 
          },
          expected: true,
          description: 'हन (variant) + सिच् + आत्मनेपद affix'
        },
        {
          word: 'वध्',
          context: { 
            affix: 'सिच्', 
            followingAffix: 'एते',
            debug: true 
          },
          expected: true,
          description: 'वध् (variant of हन्) + सिच् + आत्मनेपद affix'
        },
        {
          word: 'han',
          context: { 
            affix: 'sic', 
            followingAffix: 'te',
            debug: true 
          },
          expected: true,
          description: 'IAST: han + sic + ātmanepada affix'
        }
      ];

      testCases.forEach(({ word, context, expected, description }) => {
        const result = sutra_1_2_14(word, context);
        
        expect(result.applies).toBe(expected);
        expect(result.kit).toBe(expected);
        expect(result.analysis.isHanRoot).toBe(true);
        expect(result.analysis.isSicAffix).toBe(true);
        expect(result.analysis.isAtmanepada).toBe(true);
        
        if (expected) {
          expect(result.reasoning).toContain('हन् root with सिच् affix in आत्मनेपद');
          expect(result.reasoning).toContain('हनः सिच् - सिच् is कित् after हन् root');
        }
      });
    });

  });

  describe('Negative Test Cases', () => {
    
    test('should not apply for non-हन् roots', () => {
      const testCases = [
        {
          word: 'गम्',
          context: { affix: 'सिच्', followingAffix: 'ते' },
          description: 'गम् root (not हन्)'
        },
        {
          word: 'कृ',
          context: { affix: 'सिच्', followingAffix: 'त' },
          description: 'कृ root (not हन्)'
        },
        {
          word: 'भू',
          context: { affix: 'सिच्', followingAffix: 'एते' },
          description: 'भू root (not हन्)'
        },
        {
          word: 'दा',
          context: { affix: 'सिच्', followingAffix: 'न्ते' },
          description: 'दा root (not हन्)'
        },
        {
          word: 'kṛ',
          context: { affix: 'sic', followingAffix: 'te' },
          description: 'IAST: kṛ root (not han)'
        }
      ];

      testCases.forEach(({ word, context, description }) => {
        const result = sutra_1_2_14(word, context);
        
        expect(result.applies).toBe(false);
        expect(result.kit).toBe(false);
        expect(result.analysis.isHanRoot).toBe(false);
      });
    });

    test('should not apply for non-सिच् affixes', () => {
      const testCases = [
        {
          word: 'हन्',
          context: { affix: 'लिङ्', followingAffix: 'ते' },
          description: 'हन् + लिङ् (not सिच्)'
        },
        {
          word: 'हन्',
          context: { affix: 'तिप्', followingAffix: 'ते' },
          description: 'हन् + तिप् (not सिच्)'
        },
        {
          word: 'हन्',
          context: { affix: 'शप्', followingAffix: 'ते' },
          description: 'हन् + शप् (not सिच्)'
        },
        {
          word: 'वध्',
          context: { affix: 'क्त्वा', followingAffix: 'ते' },
          description: 'वध् + क्त्वा (not सिच्)'
        },
        {
          word: 'han',
          context: { affix: 'tip', followingAffix: 'te' },
          description: 'IAST: han + tip (not sic)'
        }
      ];

      testCases.forEach(({ word, context, description }) => {
        const result = sutra_1_2_14(word, context);
        
        expect(result.applies).toBe(false);
        expect(result.kit).toBe(false);
        expect(result.analysis.isHanRoot).toBe(true);
        expect(result.analysis.isSicAffix).toBe(false);
      });
    });

    test('should not apply in परस्मैपद (non-आत्मनेपद)', () => {
      const testCases = [
        {
          word: 'हन्',
          context: { 
            affix: 'सिच्', 
            followingAffix: 'ति', // परस्मैपद affix
            debug: true 
          },
          description: 'हन् + सिच् + परस्मैपद affix'
        },
        {
          word: 'हन्',
          context: { 
            affix: 'सिच्', 
            followingAffix: 'न्ति', // परस्मैपद affix
            debug: true 
          },
          description: 'हन् + सिच् + परस्मैपद affix'
        },
        {
          word: 'वध्',
          context: { 
            affix: 'सिच्', 
            followingAffix: 'सि', // परस्मैपद affix
            debug: true 
          },
          description: 'वध् + सिच् + परस्मैपद affix'
        }
      ];

      testCases.forEach(({ word, context, description }) => {
        const result = sutra_1_2_14(word, context);
        
        expect(result.applies).toBe(false);
        expect(result.kit).toBe(false);
        expect(result.analysis.isHanRoot).toBe(true);
        expect(result.analysis.isSicAffix).toBe(true);
        expect(result.analysis.isAtmanepada).toBe(false);
      });
    });

  });

  describe('Edge Cases', () => {
    
    test('should handle missing followingAffix gracefully', () => {
      const result = sutra_1_2_14('हन्', { 
        affix: 'सिच्',
        debug: true 
      });
      
      // Should assume आत्मनेपद context when followingAffix is missing
      expect(result.applies).toBe(true);
      expect(result.kit).toBe(true);
      expect(result.analysis.isAtmanepada).toBe(true);
      expect(result.debug).toContain('[1.2.14] Warning: followingAffix not provided, assuming आत्मनेपद context');
    });

    test('should handle invalid inputs gracefully', () => {
      const testCases = [
        {
          word: '',
          context: { affix: 'सिच्' },
          description: 'Empty word'
        },
        {
          word: 'हन्',
          context: {},
          description: 'Missing affix'
        },
        {
          word: 'invalid123',
          context: { affix: 'सिच्' },
          description: 'Invalid Sanskrit word'
        }
      ];

      testCases.forEach(({ word, context, description }) => {
        const result = sutra_1_2_14(word, context);
        
        expect(result.applies).toBe(false);
        expect(result.kit).toBe(false);
      });
    });

    test('should provide detailed debug information', () => {
      const result = sutra_1_2_14('हन्', { 
        affix: 'सिच्', 
        followingAffix: 'ते',
        debug: true 
      });
      
      expect(result.debug).toBeDefined();
      expect(result.debug.length).toBeGreaterThan(0);
      expect(result.debug.some(msg => msg.includes('Root is हन्:'))).toBe(true);
      expect(result.debug.some(msg => msg.includes('Affix is सिच्:'))).toBe(true);
      expect(result.debug.some(msg => msg.includes('आत्मनेपद:'))).toBe(true);
    });

    test('should handle various हन् root variants', () => {
      const variants = [
        { word: 'हन्', script: 'Devanagari' },
        { word: 'हन', script: 'Devanagari' },
        { word: 'वध्', script: 'Devanagari' },
        { word: 'घ्न', script: 'Devanagari' },
        { word: 'han', script: 'IAST' },
        { word: 'vadh', script: 'IAST' },
        { word: 'ghna', script: 'IAST' }
      ];

      variants.forEach(({ word, script }) => {
        const result = sutra_1_2_14(word, { 
          affix: script === 'Devanagari' ? 'सिच्' : 'sic', 
          followingAffix: script === 'Devanagari' ? 'ते' : 'te',
          debug: true 
        });
        
        expect(result.applies).toBe(true);
        expect(result.kit).toBe(true);
        expect(result.analysis.isHanRoot).toBe(true);
        expect(result.analysis.rootVariant).toBe(word);
      });
    });

  });

  describe('Helper Functions', () => {
    
    test('isSicKitAfterHan should work correctly', () => {
      expect(isSicKitAfterHan('हन्', { 
        affix: 'सिच्', 
        followingAffix: 'ते' 
      })).toBe(true);
      
      expect(isSicKitAfterHan('कृ', { 
        affix: 'सिच्', 
        followingAffix: 'ते' 
      })).toBe(false);
      
      expect(isSicKitAfterHan('हन्', { 
        affix: 'तिप्', 
        followingAffix: 'ते' 
      })).toBe(false);
    });

    test('analyzeHanSicKit should provide detailed analysis', () => {
      const result = analyzeHanSicKit('हन्', { 
        affix: 'सिच्', 
        followingAffix: 'ते' 
      });
      
      expect(result.debug).toBeDefined();
      expect(result.debug.length).toBeGreaterThan(0);
      expect(result.applies).toBe(true);
      expect(result.kit).toBe(true);
    });

    test('isHanSicCombination should correctly identify हन् + सिच् combinations', () => {
      // Positive cases
      expect(isHanSicCombination('हन्', 'सिच्')).toBe(true);
      expect(isHanSicCombination('हन', 'सिच्')).toBe(true);
      expect(isHanSicCombination('वध्', 'सिच्')).toBe(true);
      expect(isHanSicCombination('han', 'sic')).toBe(true);
      
      // Negative cases
      expect(isHanSicCombination('गम्', 'सिच्')).toBe(false);
      expect(isHanSicCombination('हन्', 'लिङ्')).toBe(false);
      expect(isHanSicCombination('कृ', 'तिप्')).toBe(false);
    });

  });

  describe('Multi-script Support', () => {
    
    test('should work with both Devanagari and IAST consistently', () => {
      const devanagariResult = sutra_1_2_14('हन्', { 
        affix: 'सिच्', 
        followingAffix: 'ते' 
      });
      
      const iastResult = sutra_1_2_14('han', { 
        affix: 'sic', 
        followingAffix: 'te' 
      });
      
      expect(devanagariResult.applies).toBe(iastResult.applies);
      expect(devanagariResult.kit).toBe(iastResult.kit);
      expect(devanagariResult.analysis.isHanRoot).toBe(iastResult.analysis.isHanRoot);
      expect(devanagariResult.analysis.isSicAffix).toBe(iastResult.analysis.isSicAffix);
    });

    test('should handle mixed scripts in context', () => {
      const result = sutra_1_2_14('हन्', { 
        affix: 'sic', // IAST affix
        followingAffix: 'ते', // Devanagari following affix
        debug: true 
      });
      
      expect(result.applies).toBe(true);
      expect(result.kit).toBe(true);
    });

  });

  describe('Integration with Related Rules', () => {
    
    test('should correctly identify when Sutra 1.2.14 conditions are met', () => {
      const result = sutra_1_2_14('हन्', { 
        affix: 'सिच्', 
        followingAffix: 'ते',
        debug: true 
      });
      
      expect(result.reasoning).toContain('हन् root with सिच् affix in आत्मनेपद');
      expect(result.reasoning).toContain('हनः सिच् - सिच् is कित् after हन् root');
    });

    test('should work with different आत्मनेपद affixes', () => {
      const atmanepadaAffixes = ['ते', 'एते', 'न्ते', 'से', 'एथे', 'ध्वे', 'ए', 'वहे', 'महे'];
      
      atmanepadaAffixes.forEach(affix => {
        const result = sutra_1_2_14('हन्', { 
          affix: 'सिच्', 
          followingAffix: affix 
        });
        
        expect(result.applies).toBe(true);
        expect(result.kit).toBe(true);
        expect(result.analysis.isAtmanepada).toBe(true);
      });
    });

    test('should not interfere with other kit designation rules', () => {
      // Test that the rule is specific to हन् + सिच्
      const nonHanRoots = ['गम्', 'कृ', 'भू', 'दा'];
      
      nonHanRoots.forEach(root => {
        const result = sutra_1_2_14(root, { 
          affix: 'सिच्', 
          followingAffix: 'ते' 
        });
        
        expect(result.applies).toBe(false);
        expect(result.kit).toBe(false);
        expect(result.analysis.isHanRoot).toBe(false);
      });
    });

  });

});
