/**
 * Test Suite for Sutra 1.2.12: उश्च
 * 
 * Tests the कित् designation for लिङ्/सिच् substitutes beginning with झल्
 * when they follow ऋ-ending verbs and are followed by आत्मनेपद affixes.
 */

import { sutra1212 } from './index.js';

describe('Sutra 1.2.12: उश्च', () => {
  
  describe('Positive Cases - कित् designation applies', () => {
    
    test('should apply कित् to ऋ-ending root + सिच् substitute + आत्मनेपद', () => {
      const result = sutra1212('कृष्यते', {
        root: 'कृ',
        affix: 'ष्य',
        followingAffix: 'ते',
        tense: 'lrt'
      });
      
      expect(result.isKit).toBe(true);
      expect(result.applicable).toBe(true);
      expect(result.conditions.rEndingRoot).toBe(true);
      expect(result.conditions.validAffix).toBe(true);
      expect(result.conditions.jhalBeginning).toBe(true);
      expect(result.conditions.atmanepadaFollowing).toBe(true);
      expect(result.sutraNumber).toBe('1.2.12');
    });

    test('should apply कित् to भृ root with झल्-beginning affix', () => {
      const result = sutra1212('भृष्यन्ते', {
        root: 'भृ',
        affix: 'ष्य',
        followingAffix: 'न्ते',
        tense: 'lrt'
      });
      
      expect(result.isKit).toBe(true);
      expect(result.applicable).toBe(true);
      expect(result.root).toBe('भृ');
      expect(result.affix).toBe('ष्य');
      expect(result.followingAffix).toBe('न्ते');
    });

    test('should apply कित् to तृ root with potential mood', () => {
      const result = sutra1212('तर्येत', {
        root: 'तृ',
        affix: 'य',
        followingAffix: 'एत',
        tense: 'ling'
      });
      
      expect(result.isKit).toBe(true);
      expect(result.applicable).toBe(true);
      expect(result.reason).toContain('All conditions for Sutra 1.2.12 satisfied');
    });

    test('should work with Devanagari ṛ vowel', () => {
      const result = sutra1212('धृष्यध्वम्', {
        root: 'धृ',
        affix: 'ष्य',
        followingAffix: 'ध्वम्',
        tense: 'lrt'
      });
      
      expect(result.isKit).toBe(true);
      expect(result.applicable).toBe(true);
    });

    test('should apply कित् with different झल् consonants', () => {
      const testCases = [
        { root: 'पृ', affix: 'ष्य', followingAffix: 'ते', tense: 'lrt' },
        { root: 'सृ', affix: 'ष्य', followingAffix: 'न्ते', tense: 'lrt' },
        { root: 'मृ', affix: 'य', followingAffix: 'एत', tense: 'ling' }
      ];

      testCases.forEach(({ root, affix, followingAffix, tense }) => {
        const result = sutra1212(`${root}${affix}${followingAffix}`, {
          root, affix, followingAffix, tense
        });
        
        expect(result.isKit).toBe(true);
        expect(result.applicable).toBe(true);
      });
    });
  });

  describe('Negative Cases - कित् designation does not apply', () => {
    
    test('should not apply to non-ṛ-ending roots', () => {
      const result = sutra1212('गम्यते', {
        root: 'गम्',
        affix: 'य',
        followingAffix: 'ते',
        tense: 'potential'
      });
      
      expect(result.isKit).toBe(false);
      expect(result.applicable).toBe(false);
      expect(result.reason).toContain('Root does not end in ऋ vowel');
    });

    test('should not apply to non-लिङ्/सिच् affixes', () => {
      const result = sutra1212('करोति', {
        root: 'कृ',
        affix: 'ो',
        followingAffix: 'ति',
        tense: 'lat'
      });
      
      expect(result.isKit).toBe(false);
      expect(result.applicable).toBe(false);
      expect(result.reason).toContain('Affix is not a substitute of लिङ् or सिच्');
    });

    test('should not apply when affix does not begin with झल्', () => {
      const result = sutra1212('कृअते', {
        root: 'कृ',
        affix: 'अ',
        followingAffix: 'ते',
        tense: 'lat'
      });
      
      expect(result.isKit).toBe(false);
      expect(result.applicable).toBe(false);
      expect(result.reason).toContain('Affix is not a substitute of लिङ् or सिच्');
    });

    test('should not apply with परस्मैपद endings', () => {
      const result = sutra1212('कृष्यति', {
        root: 'कृ',
        affix: 'ष्य',
        followingAffix: 'ति',
        tense: 'lrt'
      });
      
      expect(result.isKit).toBe(false);
      expect(result.applicable).toBe(false);
      expect(result.reason).toContain('Following affix is not आत्मनेपद');
    });

    test('should not apply to vowel-ending roots (other than ṛ)', () => {
      const testCases = [
        { root: 'गा', desc: 'ā-ending' },
        { root: 'जि', desc: 'i-ending' },
        { root: 'भू', desc: 'ū-ending' }
      ];

      testCases.forEach(({ root, desc }) => {
        const result = sutra1212(`${root}ष्यते`, {
          root: root,
          affix: 'ष्य',
          followingAffix: 'ते',
          tense: 'lrt'
        });
        
        expect(result.isKit).toBe(false);
        expect(result.applicable).toBe(false);
        expect(result.reason).toContain('Root does not end in ऋ vowel');
      });
    });
  });

  describe('Edge Cases', () => {
    
    test('should handle empty context gracefully', () => {
      const result = sutra1212('कृष्यते');
      
      // Should attempt to extract components
      expect(result.word).toBe('कृष्यते');
      expect(result.sutraNumber).toBe('1.2.12');
    });

    test('should handle partial context', () => {
      const result = sutra1212('भृष्यन्ते', {
        root: 'भृ'
        // missing affix and followingAffix - should extract them
      });
      
      expect(result.root).toBe('भृ');
      expect(result.word).toBe('भृष्यन्ते');
    });

    test('should handle mixed script input', () => {
      const result = sutra1212('कृष्यते', {
        root: 'kṛ', // IAST root
        affix: 'ष्य', // Devanagari affix
        followingAffix: 'te', // IAST ending
        tense: 'future'
      });
      
      expect(result.root).toBe('kṛ');
      expect(result.affix).toBe('ष्य');
    });

    test('should handle complex compounds', () => {
      const result = sutra1212('उत्तृष्यते', {
        root: 'तृ',
        affix: 'ष्य',
        followingAffix: 'ते',
        tense: 'lrt'
      });
      
      expect(result.isKit).toBe(true);
      expect(result.applicable).toBe(true);
    });
  });

  describe('Error Handling', () => {
    
    test('should handle invalid input', () => {
      const result = sutra1212(null);
      
      expect(result.isKit).toBe(false);
      expect(result.applicable).toBe(false);
      expect(result.error).toContain('Invalid word input');
    });

    test('should handle empty string', () => {
      const result = sutra1212('');
      
      expect(result.isKit).toBe(false);
      expect(result.applicable).toBe(false);
      expect(result.error).toContain('Invalid word input');
    });

    test('should handle non-string input', () => {
      const result = sutra1212(123);
      
      expect(result.isKit).toBe(false);
      expect(result.applicable).toBe(false);
      expect(result.error).toContain('Invalid word input');
    });

    test('should handle invalid Sanskrit input', () => {
      const result = sutra1212('xyz123');
      
      expect(result.isKit).toBe(false);
      expect(result.applicable).toBe(false);
      expect(result.error).toContain('Word validation failed');
    });
  });

  describe('Integration Tests', () => {
    
    test('should work with both IAST and Devanagari', () => {
      const iastResult = sutra1212('kṛṣyate', {
        root: 'kṛ',
        affix: 'ṣya',
        followingAffix: 'te',
        tense: 'lrt'
      });
      
      const devanagariResult = sutra1212('कृष्यते', {
        root: 'कृ',
        affix: 'ष्य',
        followingAffix: 'ते',
        tense: 'lrt'
      });
      
      expect(iastResult.isKit).toBe(true);
      expect(devanagariResult.isKit).toBe(true);
      expect(iastResult.applicable).toBe(true);
      expect(devanagariResult.applicable).toBe(true);
    });

    test('should correctly analyze tense from context', () => {
      const futureResult = sutra1212('कृष्यते', {
        root: 'कृ',
        affix: 'ष्य',
        followingAffix: 'ते'
        // tense should be determined as 'lrt'
      });
      
      expect(futureResult.tense).toBe('lrt');
      expect(futureResult.isKit).toBe(true);
    });

    test('should provide detailed analysis for debugging', () => {
      const result = sutra1212('मृष्यन्ते', {
        root: 'मृ',
        affix: 'ष्य',
        followingAffix: 'न्ते',
        tense: 'lrt'
      });
      
      expect(result).toHaveProperty('conditions');
      expect(result).toHaveProperty('root');
      expect(result).toHaveProperty('affix');
      expect(result).toHaveProperty('followingAffix');
      expect(result).toHaveProperty('tense');
      expect(result).toHaveProperty('script');
      expect(result).toHaveProperty('sutraNumber');
    });
  });

  describe('Multi-script Support', () => {
    
    test('should detect ṛ in both scripts', () => {
      const iastCases = ['kṛ', 'bhṛ', 'tṛ', 'mṛ'];
      const devanagariCases = ['कृ', 'भृ', 'तृ', 'मृ'];
      
      iastCases.forEach(root => {
        const result = sutra1212(`${root}ṣyate`, {
          root: root,
          affix: 'ṣya',
          followingAffix: 'te',
          tense: 'lrt'
        });
        
        expect(result.isKit).toBe(true);
        expect(result.conditions.rEndingRoot).toBe(true);
      });
      
      devanagariCases.forEach(root => {
        const result = sutra1212(`${root}ष्यते`, {
          root: root,
          affix: 'ष्य',
          followingAffix: 'ते',
          tense: 'lrt'
        });
        
        expect(result.isKit).toBe(true);
        expect(result.conditions.rEndingRoot).toBe(true);
      });
    });
  });
});
