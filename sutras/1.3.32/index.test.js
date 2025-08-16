/**
 * Test Suite for Sutra 1.3.32: गन्धनावक्षेपणसेवनसाहसिक्यप्रतियत्नप्रकथनोपयोगेषु कृञः
 * Tests the Ātmanepada designation for कृ root in specific semantic contexts
 */

import { determineSemanticKriAtmanepada } from './index.js';

describe('Sutra 1.3.32: गन्धनावक्षेपणसेवनसाहसिक्यप्रतियत्नप्रकथनोपयोगेषु कृञः', () => {
  
  describe('गन्धन (divulging/revealing) context', () => {
    test('should detect कृ with revealing meaning', () => {
      const result = determineSemanticKriAtmanepada('करोति', {
        meaning: 'to reveal secrets'
      });
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.semanticContexts).toContain('divulging/revealing');
    });

    test('should detect with गुप्त pattern', () => {
      const result = determineSemanticKriAtmanepada('गुप्तकार', {
        root: 'कृ'
      });
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.semanticContexts).toContain('divulging/revealing');
    });

    test('should detect divulge context flag', () => {
      const result = determineSemanticKriAtmanepada('कुर्वन्ति', {
        divulge: true
      });
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('अवक्षेपण (reviling/abusing) context', () => {
    test('should detect कृ with reviling meaning', () => {
      const result = determineSemanticKriAtmanepada('करोति', {
        meaning: 'to revile and abuse'
      });
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.semanticContexts).toContain('reviling/abusing');
    });

    test('should detect निन्दा pattern', () => {
      const result = determineSemanticKriAtmanepada('निन्दाकरण');
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.semanticContexts).toContain('reviling/abusing');
    });

    test('should detect abuse context flag', () => {
      const result = determineSemanticKriAtmanepada('कृत', {
        abuse: true
      });
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('सेवन (serving/attending) context', () => {
    test('should detect कृ with serving meaning', () => {
      const result = determineSemanticKriAtmanepada('करोति', {
        meaning: 'to serve the master'
      });
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.semanticContexts).toContain('serving/attending');
    });

    test('should detect सेवा pattern', () => {
      const result = determineSemanticKriAtmanepada('सेवाकार');
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.semanticContexts).toContain('serving/attending');
    });

    test('should detect serve context flag', () => {
      const result = determineSemanticKriAtmanepada('कुर्वते', {
        serve: true
      });
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('साहसिक्य (violence/force) context', () => {
    test('should detect कृ with violence meaning', () => {
      const result = determineSemanticKriAtmanepada('करोति', {
        meaning: 'to use violence'
      });
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.semanticContexts).toContain('using violence');
    });

    test('should detect बल pattern', () => {
      const result = determineSemanticKriAtmanepada('बलकार');
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.semanticContexts).toContain('using violence');
    });

    test('should detect violence context flag', () => {
      const result = determineSemanticKriAtmanepada('कृत', {
        violence: true
      });
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('प्रतियत्न (change/effort) context', () => {
    test('should detect कृ with change meaning', () => {
      const result = determineSemanticKriAtmanepada('करोति', {
        meaning: 'to cause change'
      });
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.semanticContexts).toContain('causing change/effort');
    });

    test('should detect प्रयत्न pattern', () => {
      const result = determineSemanticKriAtmanepada('प्रयत्नकार');
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.semanticContexts).toContain('causing change/effort');
    });

    test('should detect change context flag', () => {
      const result = determineSemanticKriAtmanepada('कुर्वन्ति', {
        change: true
      });
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('प्रकथन (reciting/telling) context', () => {
    test('should detect कृ with reciting meaning', () => {
      const result = determineSemanticKriAtmanepada('करोति', {
        meaning: 'to recite mantras'
      });
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.semanticContexts).toContain('reciting/telling');
    });

    test('should detect कथन pattern', () => {
      const result = determineSemanticKriAtmanepada('प्रकथनकार');
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.semanticContexts).toContain('reciting/telling');
    });

    test('should detect recite context flag', () => {
      const result = determineSemanticKriAtmanepada('कृत', {
        recite: true
      });
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('उपयोग (purposeful action) context', () => {
    test('should detect कृ with purposeful meaning', () => {
      const result = determineSemanticKriAtmanepada('करोति', {
        meaning: 'to use for purpose'
      });
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.semanticContexts).toContain('purposeful action');
    });

    test('should detect उपयोग pattern', () => {
      const result = determineSemanticKriAtmanepada('उपयोगकार');
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.semanticContexts).toContain('purposeful action');
    });

    test('should detect purpose context flag', () => {
      const result = determineSemanticKriAtmanepada('कुर्वते', {
        purpose: true
      });
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('IAST script support', () => {
    test('should detect kṛ root with revealing (IAST)', () => {
      const result = determineSemanticKriAtmanepada('karoti', {
        meaning: 'reveal'
      });
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should detect kṛt form with violence (IAST)', () => {
      const result = determineSemanticKriAtmanepada('kṛta', {
        violence: true
      });
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should detect kurvan with service (IAST)', () => {
      const result = determineSemanticKriAtmanepada('kurvan', {
        serve: true
      });
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('Explicit root context', () => {
    test('should handle explicit कृ root context', () => {
      const result = determineSemanticKriAtmanepada('someform', {
        root: 'कृ',
        meaning: 'to divulge secrets'
      });
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.root).toBe('कृ');
    });

    test('should handle IAST root context', () => {
      const result = determineSemanticKriAtmanepada('someform', {
        root: 'kṛ',
        meaning: 'serve'
      });
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should handle alternative root spellings', () => {
      const result = determineSemanticKriAtmanepada('someform', {
        root: 'kri',
        violence: true
      });
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('Multiple semantic contexts', () => {
    test('should handle multiple applicable contexts', () => {
      const result = determineSemanticKriAtmanepada('करोति', {
        meaning: 'to serve and recite'
      });
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.semanticContexts.length).toBeGreaterThanOrEqual(2);
    });

    test('should handle compound semantic meanings', () => {
      const result = determineSemanticKriAtmanepada('कार', {
        meaning: 'violence and force for purpose'
      });
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.semanticContexts).toContain('using violence');
      expect(result.semanticContexts).toContain('purposeful action');
    });
  });

  describe('Negative cases - should not apply', () => {
    test('should not apply without कृ root', () => {
      const result = determineSemanticKriAtmanepada('गच्छति', {
        meaning: 'to serve'
      });
      expect(result.isSutra132Atmanepada).toBe(false);
      expect(result.analysis).toContain('कृ root not detected');
    });

    test('should not apply without semantic context', () => {
      const result = determineSemanticKriAtmanepada('करोति');
      expect(result.isSutra132Atmanepada).toBe(false);
      expect(result.analysis).toContain('Required semantic context not found');
    });

    test('should not apply with irrelevant meanings', () => {
      const result = determineSemanticKriAtmanepada('करोति', {
        meaning: 'to make generally'
      });
      expect(result.isSutra132Atmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.5);
    });

    test('should not apply to other roots with relevant meanings', () => {
      const result = determineSemanticKriAtmanepada('गच्छति', {
        meaning: 'to serve'
      });
      expect(result.isSutra132Atmanepada).toBe(false);
    });

    test('should require both root and semantic context', () => {
      // Only root, no context
      const result1 = determineSemanticKriAtmanepada('करोति');
      expect(result1.isSutra132Atmanepada).toBe(false);
      
      // Only context, no kṛ root
      const result2 = determineSemanticKriAtmanepada('गच्छति', {
        serve: true
      });
      expect(result2.isSutra132Atmanepada).toBe(false);
    });
  });

  describe('Error handling', () => {
    test('should handle null input', () => {
      const result = determineSemanticKriAtmanepada(null);
      expect(result.isSutra132Atmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle undefined input', () => {
      const result = determineSemanticKriAtmanepada(undefined);
      expect(result.isSutra132Atmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle empty string', () => {
      const result = determineSemanticKriAtmanepada('');
      expect(result.isSutra132Atmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle whitespace-only input', () => {
      const result = determineSemanticKriAtmanepada('   ');
      expect(result.isSutra132Atmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle non-string input', () => {
      const result = determineSemanticKriAtmanepada(123);
      expect(result.isSutra132Atmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });
  });

  describe('Edge cases', () => {
    test('should handle mixed case input', () => {
      const result = determineSemanticKriAtmanepada('KaRoTi', {
        serve: true
      });
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should handle extra whitespace', () => {
      const result = determineSemanticKriAtmanepada('  करोति  ', {
        violence: true
      });
      expect(result.isSutra132Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should handle various कृ forms', () => {
      const kriforms = ['कुर्', 'कार', 'कृत', 'करण', 'कर्', 'कृन्'];
      
      kriforms.forEach(form => {
        const result = determineSemanticKriAtmanepada(form, {
          serve: true
        });
        expect(result.isSutra132Atmanepada).toBe(true);
      });
    });

    test('should prioritize explicit context over pattern matching', () => {
      const explicitResult = determineSemanticKriAtmanepada('करोति', {
        root: 'कृ',
        serve: true
      });
      const patternResult = determineSemanticKriAtmanepada('सेवाकार');
      
      expect(explicitResult.confidence).toBeGreaterThan(patternResult.confidence);
    });
  });

  describe('Confidence levels', () => {
    test('should have high confidence with explicit context', () => {
      const result = determineSemanticKriAtmanepada('करोति', {
        root: 'कृ',
        serve: true
      });
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should have medium confidence with pattern matching', () => {
      const result = determineSemanticKriAtmanepada('सेवाकार');
      expect(result.confidence).toBeGreaterThan(0.5);
      expect(result.confidence).toBeLessThan(0.8);
    });

    test('should have low confidence with unclear context', () => {
      const result = determineSemanticKriAtmanepada('करोति', {
        meaning: 'maybe serve'
      });
      expect(result.confidence).toBeLessThan(0.7);
    });
  });

  describe('Sutra metadata', () => {
    test('should include correct sutra reference', () => {
      const result = determineSemanticKriAtmanepada('करोति', {
        serve: true
      });
      expect(result.sutraApplied).toBe('1.3.32');
    });

    test('should include sutra reference for negative cases', () => {
      const result = determineSemanticKriAtmanepada('गच्छति');
      expect(result.sutraApplied).toBe('1.3.32');
    });

    test('should include detailed analysis for valid cases', () => {
      const result = determineSemanticKriAtmanepada('करोति', {
        serve: true
      });
      expect(result.root).toBe('कृ');
      expect(result.semanticContexts).toContain('serving/attending');
      expect(result.rootDetection).toBeDefined();
      expect(result.semanticAnalysis).toBeDefined();
    });
  });
});
