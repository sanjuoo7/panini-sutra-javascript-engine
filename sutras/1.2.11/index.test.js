/**
 * Test Suite for Sutra 1.2.11: लिङ    test('should apply कित् designation for सिच् substitute beginning with झल् after consonant+इक् root with आत्मनेपद', () => {
      const context = {
        root: 'कृत्',         // root containing ऋ (इक् vowel) and ending in consonant त्
        affix: 'सिच्',        // सिच् affix
        substitute: 'ष्य',    // झल्-beginning substitute (ष्)
        followingAffix: 'ते'  // आत्मनेपद affix
      };
      
      const result = sutra1211('कर्तिष्यते', context);
      
      expect(result.isValid).toBe(true);
      expect(result.sutraApplies).toBe(true);
      expect(result.isKit).toBe(true);
    });ेषु
 * 
 * This test suite validates the कित् designation rule for लिङ् and सिच् substitutes
 * when they begin with झल् consonants and are followed by आत्मनेपद affixes.
 * 
 * Test Categories:
 * 1. Positive Cases - Rule applies (कित् designation)
 * 2. Negative Cases - Rule doesn't apply (no कित् designation) 
 * 3. Edge Cases - Boundary conditions and special scenarios
 * 4. Error Handling - Invalid inputs and error conditions
 * 5. Integration Tests - Interaction with related sutras
 */

import { sutra1211 } from './index.js';

describe('Sutra 1.2.11: लिङ्सिचावात्मनेपदेषु', () => {
  
  describe('Positive Cases - Rule Applies (कित् designation)', () => {
    
    test('should apply कित् designation for लिङ् substitute beginning with झल् after consonant+इक् root with आत्मनेपद', () => {
      const context = {
        root: 'गुप्',          // root ending in consonant and containing उ (इक्)
        affix: 'लिङ्',         // लिङ् affix
        substitute: 'ज',       // झल्-beginning substitute
        followingAffix: 'ते'   // आत्मनेपद affix
      };
      
      const result = sutra1211('गुप्जते', context);
      
      expect(result.isValid).toBe(true);
      expect(result.isKit).toBe(true);
      expect(result.sutraApplies).toBe(true);
      expect(result.conditions.hasConsonantIkaPattern).toBe(true);
      expect(result.conditions.isLingOrSic).toBe(true);
      expect(result.conditions.substituteBeginsWithJhal).toBe(true);
      expect(result.conditions.isAtmanepada).toBe(true);
    });

    test('should apply कित् designation for सिच् substitute beginning with झल् after consonant+इक् root with आत्मनेपद', () => {
      const context = {
        root: 'रुच्',          // root ending in consonant and containing उ (इक्)
        affix: 'सिच्',        // सिच् affix
        substitute: 'ष्य',    // झल्-beginning substitute (ष्)
        followingAffix: 'ते'  // आत्मनेपद affix
      };
      
      const result = sutra1211('रुचिष्यते', context);
      
      expect(result.isValid).toBe(true);
      expect(result.sutraApplies).toBe(true);
      expect(result.isKit).toBe(true);
    });

    test('should apply with Devanagari script inputs', () => {
      const context = {
        root: 'शुक्',
        affix: 'लिङ्',
        substitute: 'ज',
        followingAffix: 'ताम्'
      };
      
      const result = sutra1211('शुक्जताम्', context);
      
      expect(result.isValid).toBe(true);
      expect(result.isKit).toBe(true);
      expect(result.analysis.script).toBe('Devanagari');
    });

    test('should apply with IAST script inputs', () => {
      const context = {
        root: 'gup',
        affix: 'liṅ',
        substitute: 'ja',
        followingAffix: 'te'
      };
      
      const result = sutra1211('gupjate', context);
      
      expect(result.isValid).toBe(true);
      expect(result.isKit).toBe(true);
      expect(result.analysis.script).toBe('IAST');
    });
  });

  describe('Negative Cases - Rule Does Not Apply', () => {
    
    test('should not apply when root does not have consonant+इक् pattern', () => {
      const context = {
        root: 'पा',           // ends with vowel, no इक् and no final consonant
        affix: 'लिङ्',
        substitute: 'च',
        followingAffix: 'ते'
      };
      
      const result = sutra1211('पाचते', context);
      
      expect(result.isValid).toBe(true);
      expect(result.isKit).toBe(false);
      expect(result.sutraApplies).toBe(false);
      expect(result.conditions.hasConsonantIkaPattern).toBe(false);
    });

    test('should not apply when affix is not लिङ् or सिच्', () => {
      const context = {
        root: 'कृ',
        affix: 'लट्',         // neither लिङ् nor सिच्
        substitute: 'त',
        followingAffix: 'ते'
      };
      
      const result = sutra1211('करोते', context);
      
      expect(result.isValid).toBe(true);
      expect(result.isKit).toBe(false);
      expect(result.conditions.isLingOrSic).toBe(false);
    });

    test('should not apply when substitute does not begin with झल्', () => {
      const context = {
        root: 'कृत्',
        affix: 'लिङ्',
        substitute: 'अ',      // begins with vowel, not झल्
        followingAffix: 'ते'
      };
      
      const result = sutra1211('कुरते', context);
      
      expect(result.isValid).toBe(true);
      expect(result.isKit).toBe(false);
      expect(result.conditions.substituteBeginsWithJhal).toBe(false);
    });

    test('should not apply when following affix is not आत्मनेपद', () => {
      const context = {
        root: 'कृ',
        affix: 'लिङ्',
        substitute: 'ज',
        followingAffix: 'ति'  // परस्मैपद affix
      };
      
      const result = sutra1211('कुर्जति', context);
      
      expect(result.isValid).toBe(true);
      expect(result.isKit).toBe(false);
      expect(result.conditions.isAtmanepada).toBe(false);
    });

    test('should not apply when multiple conditions fail', () => {
      const context = {
        root: 'पाठ्',         // ends with consonant but no इक् vowel (आ is not इक्)
        affix: 'लट्',         // not लिङ्/सिच्
        substitute: 'इ',      // not झल्-beginning
        followingAffix: 'ति'  // not आत्मनेपद
      };
      
      const result = sutra1211('पाठिति', context);
      
      expect(result.isValid).toBe(true);
      expect(result.isKit).toBe(false);
      expect(result.sutraApplies).toBe(false);
      expect(result.conditions.hasConsonantIkaPattern).toBe(false);
      expect(result.conditions.isLingOrSic).toBe(false);
      expect(result.conditions.isAtmanepada).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    
    test('should handle roots with complex consonant+इक् patterns', () => {
      const context = {
        root: 'युज्',          // root with उ (इक्) and ending in consonant
        affix: 'सिच्',
        substitute: 'ध्य',
        followingAffix: 'न्ते'
      };
      
      const result = sutra1211('योक्ष्यन्ते', context);
      
      expect(result.isValid).toBe(true);
      // This tests the consonant+इक् pattern detection with complex forms
    });

    test('should handle substitute forms with conjunct consonants', () => {
      const context = {
        root: 'श्रु',
        affix: 'लिङ्',
        substitute: 'ज्ञ',     // conjunct consonant beginning with झ्
        followingAffix: 'महे'
      };
      
      const result = sutra1211('श्रुज्ञमहे', context);
      
      expect(result.isValid).toBe(true);
      expect(result.conditions.substituteBeginsWithJhal).toBe(true);
    });

    test('should handle short forms and variations of आत्मनेपद affixes', () => {
      const context = {
        root: 'धृ',
        affix: 'लिङ्',
        substitute: 'त',
        followingAffix: 'से'    // shorter आत्मनेपद form
      };
      
      const result = sutra1211('धरेतसे', context);
      
      expect(result.isValid).toBe(true);
      expect(result.conditions.isAtmanepada).toBe(true);
    });
  });

  describe('Error Handling', () => {
    
    test('should handle null input gracefully', () => {
      const result = sutra1211(null);
      
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Invalid input: word is required');
      expect(result.isKit).toBe(false);
    });

    test('should handle empty string input', () => {
      const result = sutra1211('');
      
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Invalid input: word is required');
    });

    test('should handle non-string input', () => {
      const result = sutra1211(123);
      
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Invalid input: word is required');
    });

    test('should handle missing context gracefully', () => {
      const result = sutra1211('someword');
      
      expect(result.isValid).toBe(true);
      expect(result.isKit).toBe(false);
      expect(result.sutraApplies).toBe(false);
      expect(result.analysis.note).toContain('Full morphological context required');
    });

    test('should handle partial context', () => {
      const partialContext = {
        root: 'कृ',
        affix: 'लिङ्'
        // missing substitute and followingAffix
      };
      
      const result = sutra1211('someword', partialContext);
      
      expect(result.isValid).toBe(true);
      expect(result.isKit).toBe(false);
      expect(result.analysis.providedContext).toEqual(partialContext);
    });

    test('should handle invalid Sanskrit input in context', () => {
      const context = {
        root: '',             // empty string
        affix: 'लिङ्',
        substitute: 'ज',
        followingAffix: 'ते'
      };
      
      const result = sutra1211('someword', context);
      
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Invalid Sanskrit input in context');
    });
  });

  describe('Integration Tests', () => {
    
    test('should work correctly with other kit designation utilities', () => {
      // This tests integration with the kit-designation utility functions
      const context = {
        root: 'भृ',
        affix: 'सिच्',
        substitute: 'ष्य',
        followingAffix: 'ध्वे'
      };
      
      const result = sutra1211('भरिष्यध्वे', context);
      
      expect(result.isValid).toBe(true);
      expect(result.sutra).toBe('1.2.11');
      expect(result.description).toContain('लिङ्सिचावात्मनेपदेषु');
    });

    test('should provide comprehensive analysis structure', () => {
      const context = {
        root: 'हृ',
        affix: 'लिङ्',
        substitute: 'ज',
        followingAffix: 'आवहै'
      };
      
      const result = sutra1211('हरेजावहै', context);
      
      expect(result).toHaveProperty('isValid');
      expect(result).toHaveProperty('isKit');
      expect(result).toHaveProperty('sutraApplies');
      expect(result).toHaveProperty('conditions');
      expect(result).toHaveProperty('analysis');
      expect(result).toHaveProperty('sutra');
      expect(result).toHaveProperty('description');
      
      expect(result.conditions).toHaveProperty('hasConsonantIkaPattern');
      expect(result.conditions).toHaveProperty('isLingOrSic');
      expect(result.conditions).toHaveProperty('substituteBeginsWithJhal');
      expect(result.conditions).toHaveProperty('isAtmanepada');
    });

    test('should handle complex morphological scenarios', () => {
      // Test with a realistic Sanskrit verbal form
      const context = {
        root: 'स्तुत्',         // स्तु + त् = to praise, contains उ (इक्) + consonant ending
        affix: 'लिङ्',         // potential mood
        substitute: 'जी',       // substitute form
        followingAffix: 'महे'   // 1st person plural आत्मनेपद
      };
      
      const result = sutra1211('स्तुत्जीमहे', context);
      
      expect(result.isValid).toBe(true);
      expect(result.analysis.root).toBe('स्तुत्');
      expect(result.analysis.affix).toBe('लिङ्');
      expect(result.analysis.substitute).toBe('जी');
      expect(result.analysis.followingAffix).toBe('महे');
    });
  });

  describe('Script Detection and Multi-script Support', () => {
    
    test('should correctly detect Devanagari script', () => {
      const context = {
        root: 'कृ',
        affix: 'लिङ्',
        substitute: 'ज',
        followingAffix: 'ते'
      };
      
      const result = sutra1211('कुर्जते', context);
      
      expect(result.analysis.script).toBe('Devanagari');
    });

    test('should correctly detect IAST script', () => {
      const context = {
        root: 'kṛ',
        affix: 'liṅ',
        substitute: 'ja',
        followingAffix: 'te'
      };
      
      const result = sutra1211('kurjate', context);
      
      expect(result.analysis.script).toBe('IAST');
    });

    test('should handle mixed script context (should use primary word script)', () => {
      const context = {
        root: 'कृ',            // Devanagari
        affix: 'liṅ',          // IAST
        substitute: 'ज',       // Devanagari
        followingAffix: 'te'   // IAST
      };
      
      const result = sutra1211('कुर्जते', context);
      
      expect(result.isValid).toBe(true);
      expect(result.analysis.script).toBe('Devanagari');
    });
  });
});
