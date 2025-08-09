/**
 * Comprehensive test cases for Sutra 1.1.11: ईदूदेद्द्विवचनं प्रगृह्यम्
 * Testing प्रगृह्य (pragṛhya) dual endings that resist sandhi
 */

import { 
  isPragrhyaDualEnding,
  analyzePragrhyaStatus,
  getPragrhyaExamples,
  checkSandhiResistance
} from './index.js';

describe('Sutra 1.1.11: ईदूदेद्द्विवचनं प्रगृह्यम् - Comprehensive Tests', () => {
  
  describe('Core Pragṛhya Identification', () => {
    it('should identify dual endings in ī as प्रगृह्य', () => {
      expect(isPragrhyaDualEnding('devī', true)).toBe(true);
      expect(isPragrhyaDualEnding('nadī', true)).toBe(true);
      expect(isPragrhyaDualEnding('strī', true)).toBe(true);
      expect(isPragrhyaDualEnding('lakṣmī', true)).toBe(true);
    });

    it('should identify dual endings in ū as प्रगृह्य', () => {
      expect(isPragrhyaDualEnding('vadhū', true)).toBe(true);
      expect(isPragrhyaDualEnding('camū', true)).toBe(true);
      expect(isPragrhyaDualEnding('tanū', true)).toBe(true);
      expect(isPragrhyaDualEnding('bhū', true)).toBe(true);
    });

    it('should identify dual endings in e as प्रगृह्य', () => {
      expect(isPragrhyaDualEnding('ajne', true)).toBe(true);
      expect(isPragrhyaDualEnding('agne', true)).toBe(true);
      expect(isPragrhyaDualEnding('dive', true)).toBe(true);
      expect(isPragrhyaDualEnding('bhe', true)).toBe(true);
    });

    it('should handle Devanagari dual endings', () => {
      expect(isPragrhyaDualEnding('देवी', true)).toBe(true);
      expect(isPragrhyaDualEnding('वधू', true)).toBe(true);
      expect(isPragrhyaDualEnding('अग्ने', true)).toBe(true);
    });
  });

  describe('Non-dual Context Handling', () => {
    it('should not identify प्रगृह्य in non-dual contexts', () => {
      expect(isPragrhyaDualEnding('devī', false)).toBe(false);
      expect(isPragrhyaDualEnding('vadhū', false)).toBe(false);
      expect(isPragrhyaDualEnding('agne', false)).toBe(false);
    });

    it('should require explicit dual marking', () => {
      // Without dual specification, should default to false
      expect(isPragrhyaDualEnding('devī')).toBe(false);
      expect(isPragrhyaDualEnding('vadhū')).toBe(false);
      expect(isPragrhyaDualEnding('agne')).toBe(false);
    });
  });

  describe('Non-pragṛhya Endings', () => {
    it('should reject non-pragṛhya dual endings', () => {
      expect(isPragrhyaDualEnding('rama', true)).toBe(false);
      expect(isPragrhyaDualEnding('kṛṣṇa', true)).toBe(false);
      expect(isPragrhyaDualEnding('guru', true)).toBe(false);
      expect(isPragrhyaDualEnding('vidvat', true)).toBe(false);
    });

    it('should reject endings in other vowels', () => {
      expect(isPragrhyaDualEnding('rāma', true)).toBe(false);
      expect(isPragrhyaDualEnding('kavi', true)).toBe(false);
      expect(isPragrhyaDualEnding('śakti', true)).toBe(false);
      expect(isPragrhyaDualEnding('go', true)).toBe(false);
    });
  });

  describe('Detailed Pragṛhya Analysis', () => {
    it('should provide comprehensive प्रगृह्य analysis', () => {
      const analysis1 = analyzePragrhyaStatus('devī', { isDual: true });
      expect(analysis1.isPragrhya).toBe(true);
      expect(analysis1.ending).toBe('ī');
      expect(analysis1.reason).toBe('dual_ending_ii');
      expect(analysis1.resistsSandhi).toBe(true);

      const analysis2 = analyzePragrhyaStatus('vadhū', { isDual: true });
      expect(analysis2.isPragrhya).toBe(true);
      expect(analysis2.ending).toBe('ū');
      expect(analysis2.reason).toBe('dual_ending_uu');

      const analysis3 = analyzePragrhyaStatus('agne', { isDual: true });
      expect(analysis3.isPragrhya).toBe(true);
      expect(analysis3.ending).toBe('e');
      expect(analysis3.reason).toBe('dual_ending_e');
    });

    it('should analyze non-प्रगृह्य forms', () => {
      const analysis = analyzePragrhyaStatus('rama', { isDual: true });
      expect(analysis.isPragrhya).toBe(false);
      expect(analysis.ending).toBe('a');
      expect(analysis.reason).toBe('not_pragrhya_ending');
      expect(analysis.resistsSandhi).toBe(false);
    });
  });

  describe('Sandhi Resistance Properties', () => {
    it('should confirm sandhi resistance for प्रगृह्य forms', () => {
      expect(checkSandhiResistance('devī', 'asti')).toBe(true);
      expect(checkSandhiResistance('vadhū', 'icchati')).toBe(true);
      expect(checkSandhiResistance('agne', 'upāsmahe')).toBe(true);
    });

    it('should not show sandhi resistance for non-प्रगृह्य forms', () => {
      expect(checkSandhiResistance('rama', 'asti')).toBe(false);
      expect(checkSandhiResistance('guru', 'icchati')).toBe(false);
      expect(checkSandhiResistance('śiṣya', 'adhīte')).toBe(false);
    });
  });

  describe('Classical Examples', () => {
    it('should work with traditional प्रगृह्य examples', () => {
      const examples = getPragrhyaExamples();
      
      expect(examples.iiEndings).toContain('devī');
      expect(examples.uuEndings).toContain('vadhū');
      expect(examples.eEndings).toContain('agne');
      
      // All examples should be recognized as प्रगृह्य in dual context
      examples.iiEndings.forEach(word => {
        expect(isPragrhyaDualEnding(word, true)).toBe(true);
      });
      
      examples.uuEndings.forEach(word => {
        expect(isPragrhyaDualEnding(word, true)).toBe(true);
      });
      
      examples.eEndings.forEach(word => {
        expect(isPragrhyaDualEnding(word, true)).toBe(true);
      });
    });

    it('should handle Vedic dual forms', () => {
      // Classical Vedic examples
      expect(isPragrhyaDualEnding('aśvine', true)).toBe(true); // Dual vocative
      expect(isPragrhyaDualEnding('mitre', true)).toBe(true);  // Dual vocative
      expect(isPragrhyaDualEnding('indragnie', true)).toBe(true); // Compound dual
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle invalid inputs gracefully', () => {
      expect(isPragrhyaDualEnding('', true)).toBe(false);
      expect(isPragrhyaDualEnding(null, true)).toBe(false);
      expect(isPragrhyaDualEnding(undefined, true)).toBe(false);
    });

    it('should handle mixed scripts correctly', () => {
      // Mixed IAST and Devanagari should still work
      expect(isPragrhyaDualEnding('देवī', true)).toBe(true);
      expect(isPragrhyaDualEnding('vaधू', true)).toBe(true);
    });

    it('should handle very short words', () => {
      expect(isPragrhyaDualEnding('ī', true)).toBe(true);
      expect(isPragrhyaDualEnding('ū', true)).toBe(true);
      expect(isPragrhyaDualEnding('e', true)).toBe(true);
      expect(isPragrhyaDualEnding('a', true)).toBe(false);
    });
  });

  describe('Linguistic Context Integration', () => {
    it('should work with complete sentence contexts', () => {
      // प्रगृह्य forms in actual usage
      const analysis1 = analyzePragrhyaStatus('devī', { 
        isDual: true, 
        context: 'sentence',
        followingWord: 'asti' 
      });
      expect(analysis1.isPragrhya).toBe(true);
      expect(analysis1.sandhiBlocked).toBe(true);

      const analysis2 = analyzePragrhyaStatus('rama', { 
        isDual: true, 
        context: 'sentence',
        followingWord: 'asti' 
      });
      expect(analysis2.isPragrhya).toBe(false);
      expect(analysis2.sandhiBlocked).toBe(false);
    });

    it('should distinguish dual from other numbers', () => {
      // Same word in different numbers
      expect(isPragrhyaDualEnding('devī', true)).toBe(true);   // Dual
      expect(isPragrhyaDualEnding('devī', false)).toBe(false); // Singular/Plural
      
      const dualAnalysis = analyzePragrhyaStatus('devī', { isDual: true });
      const singularAnalysis = analyzePragrhyaStatus('devī', { isDual: false });
      
      expect(dualAnalysis.isPragrhya).toBe(true);
      expect(singularAnalysis.isPragrhya).toBe(false);
    });
  });

  describe('Performance and Consistency', () => {
    it('should perform efficiently with large inputs', () => {
      const start = Date.now();
      
      for (let i = 0; i < 1000; i++) {
        isPragrhyaDualEnding('devī', true);
        isPragrhyaDualEnding('vadhū', true);
        isPragrhyaDualEnding('agne', true);
        isPragrhyaDualEnding('rama', true);
      }
      
      const end = Date.now();
      expect(end - start).toBeLessThan(100);
    });

    it('should be consistent across multiple calls', () => {
      const testCases = [
        ['devī', true, true],
        ['vadhū', true, true],
        ['agne', true, true],
        ['rama', true, false]
      ];

      testCases.forEach(([word, isDual, expected]) => {
        for (let i = 0; i < 10; i++) {
          expect(isPragrhyaDualEnding(word, isDual)).toBe(expected);
        }
      });
    });
  });

  describe('Integration with Sandhi Rules', () => {
    it('should demonstrate sandhi blocking behavior', () => {
      // प्रगृह्य forms should block normal sandhi operations
      
      // Normal sandhi would apply here
      expect(checkSandhiResistance('rama', 'asti')).toBe(false);
      expect(checkSandhiResistance('guru', 'āgacchati')).toBe(false);
      
      // But प्रगृह्य forms resist sandhi
      expect(checkSandhiResistance('devī', 'asti')).toBe(true);
      expect(checkSandhiResistance('vadhū', 'āgacchati')).toBe(true);
      expect(checkSandhiResistance('agne', 'upāsmahe')).toBe(true);
    });

    it('should work with real Sanskrit text examples', () => {
      // Examples from classical texts where प्रगृह्य is preserved
      const textExamples = [
        { word: 'aśvine', context: 'vocative_dual', isPragrhya: true },
        { word: 'mitre', context: 'vocative_dual', isPragrhya: true },
        { word: 'varuṇe', context: 'vocative_dual', isPragrhya: true },
        { word: 'indragnie', context: 'compound_dual', isPragrhya: true }
      ];

      textExamples.forEach(({ word, context, isPragrhya }) => {
        expect(isPragrhyaDualEnding(word, true)).toBe(isPragrhya);
      });
    });
  });
});
