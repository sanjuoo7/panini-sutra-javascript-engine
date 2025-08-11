/**
 * Test Suite for Sutra 1.2.13: वा गमः (vā gamaḥ)
 * 
 * Tests the optional कित् designation for गम् root when conditions
 * of sutras 1.2.11 or 1.2.12 are met.
 */

import { 
  sutra_1_2_13, 
  isKitOptionalForGam, 
  analyzeGamOptionalKit 
} from './index.js';

describe('Sutra 1.2.13: वा गमः (vā gamaḥ)', () => {
  
  describe('Core Functionality', () => {
    
    test('should make कित् optional for गम् with लिङ् in आत्मनेपद (Sutra 1.2.11 base)', () => {
      const testCases = [
        {
          word: 'गम्',
          context: { 
            affix: 'लिङ्', 
            followingAffix: 'त',
            debug: true 
          },
          expected: true,
          description: 'गम् + लिङ् + आत्मनेपद affix'
        },
        {
          word: 'गच्छ्',
          context: { 
            affix: 'लिङ्', 
            followingAffix: 'स्व',
            debug: true 
          },
          expected: true,
          description: 'गच्छ् form + लिङ् + आत्मनेपद affix'
        },
        {
          word: 'gam',
          context: { 
            affix: 'liṅ', 
            followingAffix: 'ta',
            debug: true 
          },
          expected: true,
          description: 'IAST: gam + liṅ + ātmanepada affix'
        }
      ];

      testCases.forEach(({ word, context, expected, description }) => {
        const result = sutra_1_2_13(word, context);
        
        expect(result.applies).toBe(expected);
        expect(result.optional).toBe(expected);
        expect(result.analysis.isGamRoot).toBe(true);
        expect(result.analysis.affixType).toBe('लिङ्');
        expect(result.analysis.conditions1211Met).toBe(true);
        
        if (expected) {
          expect(result.reasoning).toContain('गम् root with conditions of Sutra 1.2.11 met');
          expect(result.reasoning).toContain('Due to वा (optionally), कित् designation is optional');
        }
      });
    });

    test('should make कित् optional for गम् with सिच् beginning with झल् in आत्मनेपद (Sutra 1.2.12 base)', () => {
      const testCases = [
        {
          word: 'गम्',
          context: { 
            affix: 'सिच्', 
            followingAffix: 'त',
            debug: true 
          },
          expected: true,
          description: 'गम् + सिच् + आत्मनेपद affix'
        },
        {
          word: 'गच्छ्',
          context: { 
            affix: 'सिच्', 
            followingAffix: 'ते',
            debug: true 
          },
          expected: true,
          description: 'गच्छ् form + सिच् + आत्मनेपद affix'
        },
        {
          word: 'gacch',
          context: { 
            affix: 'sic', 
            followingAffix: 'te',
            debug: true 
          },
          expected: true,
          description: 'IAST: gacch + sic + ātmanepada affix'
        }
      ];

      testCases.forEach(({ word, context, expected, description }) => {
        const result = sutra_1_2_13(word, context);
        
        expect(result.applies).toBe(expected);
        expect(result.optional).toBe(expected);
        expect(result.analysis.isGamRoot).toBe(true);
        expect(result.analysis.affixType).toBe('सिच्');
        expect(result.analysis.beginsWithJhal).toBe(true);
        expect(result.analysis.conditions1212Met).toBe(true);
        
        if (expected) {
          expect(result.reasoning).toContain('गम् root with conditions of Sutra 1.2.12 met');
          expect(result.reasoning).toContain('Due to वा (optionally), कित् designation is optional');
        }
      });
    });

  });

  describe('Negative Test Cases', () => {
    
    test('should not apply for non-गम् roots', () => {
      const testCases = [
        {
          word: 'कृ',
          context: { affix: 'लिङ्', followingAffix: 'त' },
          description: 'कृ root (not गम्)'
        },
        {
          word: 'भू',
          context: { affix: 'सिच्', followingAffix: 'त' },
          description: 'भू root (not गम्)'
        },
        {
          word: 'दा',
          context: { affix: 'लिङ्', followingAffix: 'स्व' },
          description: 'दा root (not गम्)'
        },
        {
          word: 'kṛ',
          context: { affix: 'liṅ', followingAffix: 'ta' },
          description: 'IAST: kṛ root (not gam)'
        }
      ];

      testCases.forEach(({ word, context, description }) => {
        const result = sutra_1_2_13(word, context);
        
        expect(result.applies).toBe(false);
        expect(result.optional).toBe(false);
        expect(result.analysis.isGamRoot).toBe(false);
      });
    });

    test('should not apply for invalid affixes', () => {
      const testCases = [
        {
          word: 'गम्',
          context: { affix: 'तिप्', followingAffix: 'त' },
          description: 'गम् + तिप् (not लिङ् or सिच्)'
        },
        {
          word: 'गम्',
          context: { affix: 'शप्', followingAffix: 'त' },
          description: 'गम् + शप् (not लिङ् or सिच्)'
        },
        {
          word: 'गच्छ्',
          context: { affix: 'ण्वुल्', followingAffix: 'त' },
          description: 'गच्छ् + ण्वुल् (not लिङ् or सिच्)'
        },
        {
          word: 'gam',
          context: { affix: 'tip', followingAffix: 'ta' },
          description: 'IAST: gam + tip (not liṅ or sic)'
        }
      ];

      testCases.forEach(({ word, context, description }) => {
        const result = sutra_1_2_13(word, context);
        
        expect(result.applies).toBe(false);
        expect(result.optional).toBe(false);
        expect(result.analysis.isGamRoot).toBe(true);
        expect(result.analysis.isValidAffix).toBe(false);
      });
    });

    test('should not apply for सिच् not beginning with झल्', () => {
      // Note: This test assumes there could be सिच् variants that don't begin with झल्
      // In practice, सिच् typically begins with स् which is झल्, but this tests the logic
      const testCases = [
        {
          word: 'गम्',
          context: { affix: 'असिच्', followingAffix: 'त' }, // Hypothetical non-झल् beginning
          description: 'गम् + सिच् not beginning with झल्'
        }
      ];

      testCases.forEach(({ word, context, description }) => {
        const result = sutra_1_2_13(word, context);
        
        // If सिच् doesn't begin with झल्, rule shouldn't apply
        if (!result.analysis.beginsWithJhal) {
          expect(result.applies).toBe(false);
          expect(result.optional).toBe(false);
        }
      });
    });

    test('should not apply in परस्मैपद (non-आत्मनेपद)', () => {
      const testCases = [
        {
          word: 'गम्',
          context: { 
            affix: 'लिङ्', 
            followingAffix: 'तिप्', // परस्मैपद affix
            debug: true 
          },
          description: 'गम् + लिङ् + परस्मैपद affix'
        },
        {
          word: 'गम्',
          context: { 
            affix: 'सिच्', 
            followingAffix: 'अन्ति', // परस्मैपद affix
            debug: true 
          },
          description: 'गम् + सिच् + परस्मैपद affix'
        }
      ];

      testCases.forEach(({ word, context, description }) => {
        const result = sutra_1_2_13(word, context);
        
        expect(result.applies).toBe(false);
        expect(result.optional).toBe(false);
        expect(result.analysis.isGamRoot).toBe(true);
        expect(result.analysis.isValidAffix).toBe(true);
        expect(result.analysis.isAtmanepada).toBe(false);
      });
    });

  });

  describe('Edge Cases', () => {
    
    test('should handle missing followingAffix gracefully', () => {
      const result = sutra_1_2_13('गम्', { 
        affix: 'लिङ्',
        debug: true 
      });
      
      // Should assume आत्मनेपद context when followingAffix is missing
      expect(result.applies).toBe(true);
      expect(result.optional).toBe(true);
      expect(result.analysis.isAtmanepada).toBe(true);
      expect(result.debug).toContain('[1.2.13] Warning: followingAffix not provided, assuming आत्मनेपद context');
    });

    test('should handle invalid inputs gracefully', () => {
      const testCases = [
        {
          word: '',
          context: { affix: 'लिङ्' },
          description: 'Empty word'
        },
        {
          word: 'गम्',
          context: {},
          description: 'Missing affix'
        },
        {
          word: 'invalid123',
          context: { affix: 'लिङ्' },
          description: 'Invalid Sanskrit word'
        }
      ];

      testCases.forEach(({ word, context, description }) => {
        const result = sutra_1_2_13(word, context);
        
        expect(result.applies).toBe(false);
        expect(result.optional).toBe(false);
      });
    });

    test('should provide detailed debug information', () => {
      const result = sutra_1_2_13('गम्', { 
        affix: 'लिङ्', 
        followingAffix: 'त',
        debug: true 
      });
      
      expect(result.debug).toBeDefined();
      expect(result.debug.length).toBeGreaterThan(0);
      expect(result.debug.some(msg => msg.includes('Root is गम्:'))).toBe(true);
      expect(result.debug.some(msg => msg.includes('Affix is लिङ्:'))).toBe(true);
      expect(result.debug.some(msg => msg.includes('आत्मनेपद:'))).toBe(true);
    });

  });

  describe('Helper Functions', () => {
    
    test('isKitOptionalForGam should work correctly', () => {
      expect(isKitOptionalForGam('गम्', { 
        affix: 'लिङ्', 
        followingAffix: 'त' 
      })).toBe(true);
      
      expect(isKitOptionalForGam('कृ', { 
        affix: 'लिङ्', 
        followingAffix: 'त' 
      })).toBe(false);
      
      expect(isKitOptionalForGam('गम्', { 
        affix: 'तिप्', 
        followingAffix: 'त' 
      })).toBe(false);
    });

    test('analyzeGamOptionalKit should provide detailed analysis', () => {
      const result = analyzeGamOptionalKit('गम्', { 
        affix: 'सिच्', 
        followingAffix: 'त' 
      });
      
      expect(result.debug).toBeDefined();
      expect(result.debug.length).toBeGreaterThan(0);
      expect(result.applies).toBe(true);
      expect(result.optional).toBe(true);
      expect(result.analysis.conditions1212Met).toBe(true);
    });

  });

  describe('Multi-script Support', () => {
    
    test('should work with both Devanagari and IAST consistently', () => {
      const devanagariResult = sutra_1_2_13('गम्', { 
        affix: 'लिङ्', 
        followingAffix: 'त' 
      });
      
      const iastResult = sutra_1_2_13('gam', { 
        affix: 'liṅ', 
        followingAffix: 'ta' 
      });
      
      expect(devanagariResult.applies).toBe(iastResult.applies);
      expect(devanagariResult.optional).toBe(iastResult.optional);
      expect(devanagariResult.analysis.isGamRoot).toBe(iastResult.analysis.isGamRoot);
      expect(devanagariResult.analysis.conditions1211Met).toBe(iastResult.analysis.conditions1211Met);
    });

    test('should handle mixed scripts in context', () => {
      const result = sutra_1_2_13('गम्', { 
        affix: 'liṅ', // IAST affix
        followingAffix: 'त', // Devanagari following affix
        debug: true 
      });
      
      expect(result.applies).toBe(true);
      expect(result.optional).toBe(true);
    });

  });

  describe('Integration with Base Rules', () => {
    
    test('should correctly identify when Sutra 1.2.11 conditions are met', () => {
      const result = sutra_1_2_13('गम्', { 
        affix: 'लिङ्', 
        followingAffix: 'त',
        debug: true 
      });
      
      expect(result.analysis.conditions1211Met).toBe(true);
      expect(result.analysis.conditions1212Met).toBe(false);
      expect(result.reasoning).toContain('गम् root with conditions of Sutra 1.2.11 met');
    });

    test('should correctly identify when Sutra 1.2.12 conditions are met', () => {
      const result = sutra_1_2_13('गम्', { 
        affix: 'सिच्', 
        followingAffix: 'त',
        debug: true 
      });
      
      expect(result.analysis.conditions1211Met).toBe(false);
      expect(result.analysis.conditions1212Met).toBe(true);
      expect(result.reasoning).toContain('गम् root with conditions of Sutra 1.2.12 met');
    });

    test('should handle when both base rule conditions could theoretically apply', () => {
      // This is a theoretical test as in practice लिङ् and सिच् are different affixes
      // But it tests the logic robustness
      const result1 = sutra_1_2_13('गम्', { 
        affix: 'लिङ्', 
        followingAffix: 'त',
        debug: true 
      });
      
      const result2 = sutra_1_2_13('गम्', { 
        affix: 'सिच्', 
        followingAffix: 'त',
        debug: true 
      });
      
      expect(result1.applies).toBe(true);
      expect(result2.applies).toBe(true);
      expect(result1.optional).toBe(true);
      expect(result2.optional).toBe(true);
    });

  });

});
