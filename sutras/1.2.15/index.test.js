/**
 * Test Suite for Sutra 1.2.15: यमो गन्धने (yamaḥ gandhane)
 * 
 * Tests the कित् designation for सिच् affix after यम् root
 * specifically in the meaning of गन्धने (divulging/revealing) 
 * in आत्मनेपद contexts.
 */

import { 
  sutra_1_2_15, 
  isSicKitAfterYamDivulging, 
  analyzeYamSicKit,
  isYamDivulgingContext,
  isGandhanaMeaning
} from './index.js';

describe('Sutra 1.2.15: यमो गन्धने (yamaḥ gandhane)', () => {
  
  describe('Core Functionality', () => {
    
    test('should make सिच् कित् after यम् root with गन्धने meaning in आत्मनेपद', () => {
      const testCases = [
        {
          word: 'यम्',
          context: { 
            affix: 'सिच्', 
            followingAffix: 'ते',
            meaning: 'गन्धने',
            debug: true 
          },
          expected: true,
          description: 'यम् + सिच् + आत्मनेपद + गन्धने meaning'
        },
        {
          word: 'यम',
          context: { 
            affix: 'सिच्', 
            followingAffix: 'त',
            meaning: 'gandhane',
            debug: true 
          },
          expected: true,
          description: 'यम (variant) + सिच् + आत्मनेपद + gandhane meaning'
        },
        {
          word: 'यच्छ्',
          context: { 
            affix: 'सिच्', 
            followingAffix: 'एते',
            meaning: 'divulging',
            debug: true 
          },
          expected: true,
          description: 'यच्छ् (variant) + सिच् + आत्मनेपद + divulging meaning'
        },
        {
          word: 'yam',
          context: { 
            affix: 'sic', 
            followingAffix: 'te',
            meaning: 'revealing',
            debug: true 
          },
          expected: true,
          description: 'IAST: yam + sic + ātmanepada + revealing meaning'
        }
      ];

      testCases.forEach(({ word, context, expected, description }) => {
        const result = sutra_1_2_15(word, context);
        
        expect(result.applies).toBe(expected);
        expect(result.kit).toBe(expected);
        expect(result.analysis.isYamRoot).toBe(true);
        expect(result.analysis.isSicAffix).toBe(true);
        expect(result.analysis.isAtmanepada).toBe(true);
        expect(result.analysis.hasGandhanaMeaning).toBe(true);
        
        if (expected) {
          expect(result.reasoning).toContain('यम् root with गन्धने meaning + सिच् affix in आत्मनेपद');
          expect(result.reasoning).toContain('यमो गन्धने - सिच् is कित् after यम् root in divulging sense');
        }
      });
    });

  });

  describe('Semantic Constraint Tests', () => {
    
    test('should NOT apply for यम् without गन्धने meaning', () => {
      const testCases = [
        {
          word: 'यम्',
          context: { 
            affix: 'सिच्', 
            followingAffix: 'ते',
            meaning: 'restraining',
            debug: true 
          },
          description: 'यम् with restraining meaning (not गन्धने)'
        },
        {
          word: 'यम्',
          context: { 
            affix: 'सिच्', 
            followingAffix: 'ते',
            meaning: 'controlling',
            debug: true 
          },
          description: 'यम् with controlling meaning (not गन्धने)'
        },
        {
          word: 'यम्',
          context: { 
            affix: 'सिच्', 
            followingAffix: 'ते',
            // No meaning specified
            debug: true 
          },
          description: 'यम् without meaning constraint'
        },
        {
          word: 'yam',
          context: { 
            affix: 'sic', 
            followingAffix: 'te',
            meaning: 'binding',
            debug: true 
          },
          description: 'IAST: yam with binding meaning (not gandhane)'
        }
      ];

      testCases.forEach(({ word, context, description }) => {
        const result = sutra_1_2_15(word, context);
        
        expect(result.applies).toBe(false);
        expect(result.kit).toBe(false);
        expect(result.analysis.isYamRoot).toBe(true);
        expect(result.analysis.isSicAffix).toBe(true);
        expect(result.analysis.hasGandhanaMeaning).toBe(false);
        
        if (context.meaning) {
          expect(result.reasoning).toContain('यम् root requires गन्धने (divulging) meaning for this rule');
        }
      });
    });

    test('should recognize various forms of गन्धने meaning', () => {
      const meanings = [
        'गन्धने',     // Sanskrit
        'gandhane',   // IAST
        'divulging',  // English
        'revealing',  // English
        'disclosing', // English
        'exposing',   // English
        'divulge',    // English verb
        'reveal',     // English verb
        'to divulge', // English infinitive
        'to reveal'   // English infinitive
      ];

      meanings.forEach(meaning => {
        const result = sutra_1_2_15('यम्', { 
          affix: 'सिच्', 
          followingAffix: 'ते',
          meaning: meaning
        });
        
        expect(result.applies).toBe(true);
        expect(result.analysis.hasGandhanaMeaning).toBe(true);
      });
    });

  });

  describe('Negative Test Cases', () => {
    
    test('should not apply for non-यम् roots', () => {
      const testCases = [
        {
          word: 'गम्',
          context: { affix: 'सिच्', followingAffix: 'ते', meaning: 'गन्धने' },
          description: 'गम् root (not यम्)'
        },
        {
          word: 'हन्',
          context: { affix: 'सिच्', followingAffix: 'ते', meaning: 'गन्धने' },
          description: 'हन् root (not यम्)'
        },
        {
          word: 'कृ',
          context: { affix: 'सिच्', followingAffix: 'ते', meaning: 'गन्धने' },
          description: 'कृ root (not यम्)'
        },
        {
          word: 'kṛ',
          context: { affix: 'sic', followingAffix: 'te', meaning: 'gandhane' },
          description: 'IAST: kṛ root (not yam)'
        }
      ];

      testCases.forEach(({ word, context, description }) => {
        const result = sutra_1_2_15(word, context);
        
        expect(result.applies).toBe(false);
        expect(result.kit).toBe(false);
        expect(result.analysis.isYamRoot).toBe(false);
      });
    });

    test('should not apply for non-सिच् affixes', () => {
      const testCases = [
        {
          word: 'यम्',
          context: { affix: 'लिङ्', followingAffix: 'ते', meaning: 'गन्धने' },
          description: 'यम् + लिङ् (not सिच्)'
        },
        {
          word: 'यम्',
          context: { affix: 'तिप्', followingAffix: 'ते', meaning: 'गन्धने' },
          description: 'यम् + तिप् (not सिच्)'
        },
        {
          word: 'यम्',
          context: { affix: 'शप्', followingAffix: 'ते', meaning: 'गन्धने' },
          description: 'यम् + शप् (not सिच्)'
        },
        {
          word: 'yam',
          context: { affix: 'tip', followingAffix: 'te', meaning: 'gandhane' },
          description: 'IAST: yam + tip (not sic)'
        }
      ];

      testCases.forEach(({ word, context, description }) => {
        const result = sutra_1_2_15(word, context);
        
        expect(result.applies).toBe(false);
        expect(result.kit).toBe(false);
        expect(result.analysis.isYamRoot).toBe(true);
        expect(result.analysis.isSicAffix).toBe(false);
      });
    });

    test('should not apply in परस्मैपद (non-आत्मनेपद)', () => {
      const testCases = [
        {
          word: 'यम्',
          context: { 
            affix: 'सिच्', 
            followingAffix: 'ति', // परस्मैपद affix
            meaning: 'गन्धने',
            debug: true 
          },
          description: 'यम् + सिच् + परस्मैपद affix'
        },
        {
          word: 'यम्',
          context: { 
            affix: 'सिच्', 
            followingAffix: 'न्ति', // परस्मैपद affix
            meaning: 'गन्धने',
            debug: true 
          },
          description: 'यम् + सिच् + परस्मैपद affix'
        },
        {
          word: 'यच्छ्',
          context: { 
            affix: 'सिच्', 
            followingAffix: 'सि', // परस्मैपद affix
            meaning: 'divulging',
            debug: true 
          },
          description: 'यच्छ् + सिच् + परस्मैपद affix'
        }
      ];

      testCases.forEach(({ word, context, description }) => {
        const result = sutra_1_2_15(word, context);
        
        expect(result.applies).toBe(false);
        expect(result.kit).toBe(false);
        expect(result.analysis.isYamRoot).toBe(true);
        expect(result.analysis.isSicAffix).toBe(true);
        expect(result.analysis.hasGandhanaMeaning).toBe(true);
        expect(result.analysis.isAtmanepada).toBe(false);
      });
    });

  });

  describe('Edge Cases', () => {
    
    test('should handle missing followingAffix gracefully', () => {
      const result = sutra_1_2_15('यम्', { 
        affix: 'सिच्',
        meaning: 'गन्धने',
        debug: true 
      });
      
      // Should assume आत्मनेपद context when followingAffix is missing
      expect(result.applies).toBe(true);
      expect(result.kit).toBe(true);
      expect(result.analysis.isAtmanepada).toBe(true);
      expect(result.debug).toContain('[1.2.15] Warning: followingAffix not provided, assuming आत्मनेपद context');
    });

    test('should handle invalid inputs gracefully', () => {
      const testCases = [
        {
          word: '',
          context: { affix: 'सिच्', meaning: 'गन्धने' },
          description: 'Empty word'
        },
        {
          word: 'यम्',
          context: { meaning: 'गन्धने' },
          description: 'Missing affix'
        },
        {
          word: 'invalid123',
          context: { affix: 'सिच्', meaning: 'गन्धने' },
          description: 'Invalid Sanskrit word'
        }
      ];

      testCases.forEach(({ word, context, description }) => {
        const result = sutra_1_2_15(word, context);
        
        expect(result.applies).toBe(false);
        expect(result.kit).toBe(false);
      });
    });

    test('should provide detailed debug information', () => {
      const result = sutra_1_2_15('यम्', { 
        affix: 'सिच्', 
        followingAffix: 'ते',
        meaning: 'गन्धने',
        debug: true 
      });
      
      expect(result.debug).toBeDefined();
      expect(result.debug.length).toBeGreaterThan(0);
      expect(result.debug.some(msg => msg.includes('Root is यम्:'))).toBe(true);
      expect(result.debug.some(msg => msg.includes('Affix is सिच्:'))).toBe(true);
      expect(result.debug.some(msg => msg.includes('Semantic meaning constraint'))).toBe(true);
      expect(result.debug.some(msg => msg.includes('आत्मनेपद:'))).toBe(true);
    });

    test('should handle various यम् root variants', () => {
      const variants = [
        { word: 'यम्', script: 'Devanagari' },
        { word: 'यम', script: 'Devanagari' },
        { word: 'यच्छ्', script: 'Devanagari' },
        { word: 'yam', script: 'IAST' },
        { word: 'yama', script: 'IAST' },
        { word: 'yacch', script: 'IAST' }
      ];

      variants.forEach(({ word, script }) => {
        const result = sutra_1_2_15(word, { 
          affix: script === 'Devanagari' ? 'सिच्' : 'sic', 
          followingAffix: script === 'Devanagari' ? 'ते' : 'te',
          meaning: script === 'Devanagari' ? 'गन्धने' : 'gandhane',
          debug: true 
        });
        
        expect(result.applies).toBe(true);
        expect(result.kit).toBe(true);
        expect(result.analysis.isYamRoot).toBe(true);
        expect(result.analysis.rootVariant).toBe(word);
      });
    });

  });

  describe('Helper Functions', () => {
    
    test('isSicKitAfterYamDivulging should work correctly', () => {
      expect(isSicKitAfterYamDivulging('यम्', { 
        affix: 'सिच्', 
        followingAffix: 'ते',
        meaning: 'गन्धने' 
      })).toBe(true);
      
      expect(isSicKitAfterYamDivulging('कृ', { 
        affix: 'सिच्', 
        followingAffix: 'ते',
        meaning: 'गन्धने' 
      })).toBe(false);
      
      expect(isSicKitAfterYamDivulging('यम्', { 
        affix: 'तिप्', 
        followingAffix: 'ते',
        meaning: 'गन्धने' 
      })).toBe(false);
      
      expect(isSicKitAfterYamDivulging('यम्', { 
        affix: 'सिच्', 
        followingAffix: 'ते',
        meaning: 'restraining' 
      })).toBe(false);
    });

    test('analyzeYamSicKit should provide detailed analysis', () => {
      const result = analyzeYamSicKit('यम्', { 
        affix: 'सिच्', 
        followingAffix: 'ते',
        meaning: 'गन्धने' 
      });
      
      expect(result.debug).toBeDefined();
      expect(result.debug.length).toBeGreaterThan(0);
      expect(result.applies).toBe(true);
      expect(result.kit).toBe(true);
    });

    test('isYamDivulgingContext should correctly identify यम् + सिच् + गन्धने combinations', () => {
      // Positive cases
      expect(isYamDivulgingContext('यम्', 'सिच्', 'गन्धने')).toBe(true);
      expect(isYamDivulgingContext('यम', 'सिच्', 'gandhane')).toBe(true);
      expect(isYamDivulgingContext('यच्छ्', 'सिच्', 'divulging')).toBe(true);
      expect(isYamDivulgingContext('yam', 'sic', 'revealing')).toBe(true);
      
      // Negative cases
      expect(isYamDivulgingContext('गम्', 'सिच्', 'गन्धने')).toBe(false);
      expect(isYamDivulgingContext('यम्', 'लिङ्', 'गन्धने')).toBe(false);
      expect(isYamDivulgingContext('यम्', 'सिच्', 'restraining')).toBe(false);
    });

    test('isGandhanaMeaning should correctly identify divulging meanings', () => {
      // Positive cases - Sanskrit
      expect(isGandhanaMeaning('गन्धने')).toBe(true);
      expect(isGandhanaMeaning('gandhane')).toBe(true);
      
      // Positive cases - English
      expect(isGandhanaMeaning('divulging')).toBe(true);
      expect(isGandhanaMeaning('revealing')).toBe(true);
      expect(isGandhanaMeaning('disclosing')).toBe(true);
      expect(isGandhanaMeaning('exposing')).toBe(true);
      expect(isGandhanaMeaning('divulge')).toBe(true);
      expect(isGandhanaMeaning('reveal')).toBe(true);
      expect(isGandhanaMeaning('to divulge')).toBe(true);
      expect(isGandhanaMeaning('to reveal')).toBe(true);
      
      // Case insensitive
      expect(isGandhanaMeaning('DIVULGING')).toBe(true);
      expect(isGandhanaMeaning('Revealing')).toBe(true);
      
      // Negative cases
      expect(isGandhanaMeaning('restraining')).toBe(false);
      expect(isGandhanaMeaning('controlling')).toBe(false);
      expect(isGandhanaMeaning('binding')).toBe(false);
      expect(isGandhanaMeaning('')).toBe(false);
      expect(isGandhanaMeaning(null)).toBe(false);
      expect(isGandhanaMeaning(undefined)).toBe(false);
    });

  });

  describe('Multi-script Support', () => {
    
    test('should work with both Devanagari and IAST consistently', () => {
      const devanagariResult = sutra_1_2_15('यम्', { 
        affix: 'सिच्', 
        followingAffix: 'ते',
        meaning: 'गन्धने' 
      });
      
      const iastResult = sutra_1_2_15('yam', { 
        affix: 'sic', 
        followingAffix: 'te',
        meaning: 'gandhane' 
      });
      
      expect(devanagariResult.applies).toBe(iastResult.applies);
      expect(devanagariResult.kit).toBe(iastResult.kit);
      expect(devanagariResult.analysis.isYamRoot).toBe(iastResult.analysis.isYamRoot);
      expect(devanagariResult.analysis.isSicAffix).toBe(iastResult.analysis.isSicAffix);
      expect(devanagariResult.analysis.hasGandhanaMeaning).toBe(iastResult.analysis.hasGandhanaMeaning);
    });

    test('should handle mixed scripts in context', () => {
      const result = sutra_1_2_15('यम्', { 
        affix: 'sic', // IAST affix
        followingAffix: 'ते', // Devanagari following affix
        meaning: 'gandhane', // IAST meaning
        debug: true 
      });
      
      expect(result.applies).toBe(true);
      expect(result.kit).toBe(true);
    });

  });

  describe('Integration with Related Rules', () => {
    
    test('should correctly identify when Sutra 1.2.15 conditions are met', () => {
      const result = sutra_1_2_15('यम्', { 
        affix: 'सिच्', 
        followingAffix: 'ते',
        meaning: 'गन्धने',
        debug: true 
      });
      
      expect(result.reasoning).toContain('यम् root with गन्धने meaning + सिच् affix in आत्मनेपद');
      expect(result.reasoning).toContain('यमो गन्धने - सिच् is कित् after यम् root in divulging sense');
    });

    test('should work with different आत्मनेपद affixes', () => {
      const atmanepadaAffixes = ['ते', 'एते', 'न्ते', 'से', 'एथे', 'ध्वे', 'ए', 'वहे', 'महे'];
      
      atmanepadaAffixes.forEach(affix => {
        const result = sutra_1_2_15('यम्', { 
          affix: 'सिच्', 
          followingAffix: affix,
          meaning: 'गन्धने' 
        });
        
        expect(result.applies).toBe(true);
        expect(result.kit).toBe(true);
        expect(result.analysis.isAtmanepada).toBe(true);
      });
    });

    test('should not interfere with other kit designation rules', () => {
      // Test that the rule is specific to यम् + सिच् + गन्धने
      const nonYamRoots = ['गम्', 'हन्', 'कृ', 'भू'];
      
      nonYamRoots.forEach(root => {
        const result = sutra_1_2_15(root, { 
          affix: 'सिच्', 
          followingAffix: 'ते',
          meaning: 'गन्धने' 
        });
        
        expect(result.applies).toBe(false);
        expect(result.kit).toBe(false);
        expect(result.analysis.isYamRoot).toBe(false);
      });
    });

    test('should be distinct from general यम् usage (semantic constraint)', () => {
      // Test that the rule applies only with गन्धने meaning, not general यम्
      const generalMeanings = ['restraining', 'controlling', 'holding', 'binding'];
      
      generalMeanings.forEach(meaning => {
        const result = sutra_1_2_15('यम्', { 
          affix: 'सिच्', 
          followingAffix: 'ते',
          meaning: meaning 
        });
        
        expect(result.applies).toBe(false);
        expect(result.kit).toBe(false);
        expect(result.analysis.hasGandhanaMeaning).toBe(false);
      });
    });

  });

});
