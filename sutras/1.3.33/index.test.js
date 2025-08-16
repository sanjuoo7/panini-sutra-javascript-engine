/**
 * Test Suite for Sutra 1.3.33: अधेः प्रसहने
 * Tests the Ātmanepada designation for कृ root with अधि prefix in overpowering context
 */

import { determineAdhiKriPrasahaneAtmanepada } from './index.js';

describe('Sutra 1.3.33: अधेः प्रसहने (adheḥ prasahane)', () => {
  
  describe('Complete अधि + कृ + प्रसहन combinations', () => {
    test('should detect अधिकृ with explicit overpowering context', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('अधिकृ', {
        overpower: true
      });
      expect(result.isSutra133Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prasahanaContext).toBe('overpowering');
    });

    test('should detect अधिकरोति with defeating meaning', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('अधिकरोति', {
        meaning: 'to defeat the enemy'
      });
      expect(result.isSutra133Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prasahanaContext).toBe('overpowering');
    });

    test('should detect with प्रसह meaning', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('अधिकृत', {
        meaning: 'प्रसह'
      });
      expect(result.isSutra133Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prasahanaContext).toBe('overpowering');
    });

    test('should detect explicit root, prefix, and context', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('someform', {
        root: 'कृ',
        prefix: 'अधि',
        defeat: true
      });
      expect(result.isSutra133Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.root).toBe('कृ');
      expect(result.prefix).toBe('अधि');
    });
  });

  describe('IAST script support', () => {
    test('should detect adhikṛ with overpowering (IAST)', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('adhikṛ', {
        overpower: true
      });
      expect(result.isSutra133Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('अधि');
    });

    test('should detect adhikaroti with conquering (IAST)', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('adhikaroti', {
        conquer: true
      });
      expect(result.isSutra133Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prasahanaContext).toBe('overpowering');
    });

    test('should detect with prasah meaning (IAST)', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('adhikṛt', {
        meaning: 'prasaha'
      });
      expect(result.isSutra133Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should handle IAST root and prefix context', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('someform', {
        root: 'kṛ',
        prefix: 'adhi',
        overcome: true
      });
      expect(result.isSutra133Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('प्रसहन semantic contexts', () => {
    test('should detect overpowering context', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('अधिकरोति', {
        meaning: 'to overpower enemies'
      });
      expect(result.isSutra133Atmanepada).toBe(true);
      expect(result.prasahanaContext).toBe('overpowering');
    });

    test('should detect forcing context', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('अधिकृ', {
        meaning: 'बलात् कार'
      });
      expect(result.isSutra133Atmanepada).toBe(true);
      expect(result.prasahanaContext).toBe('forcing');
    });

    test('should detect superiority context', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('अधिकार', {
        meaning: 'वर्चस्व'
      });
      expect(result.isSutra133Atmanepada).toBe(true);
      expect(result.prasahanaContext).toBe('superiority');
    });

    test('should detect subjugation context', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('अधिकृत', {
        meaning: 'दमन'
      });
      expect(result.isSutra133Atmanepada).toBe(true);
      expect(result.prasahanaContext).toBe('subjugation');
    });

    test('should handle various defeating terms', () => {
      const defeatTerms = ['defeat', 'conquer', 'vanquish', 'subdue', 'overcome'];
      
      defeatTerms.forEach(term => {
        const result = determineAdhiKriPrasahaneAtmanepada('अधिकृ', {
          meaning: term
        });
        expect(result.isSutra133Atmanepada).toBe(true);
      });
    });
  });

  describe('Context flags', () => {
    test('should detect overpower flag', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('अधिकरोति', {
        overpower: true
      });
      expect(result.isSutra133Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should detect defeat flag', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('अधिकृत', {
        defeat: true
      });
      expect(result.isSutra133Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should detect force flag', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('अधिकृ', {
        force: true
      });
      expect(result.isSutra133Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should detect control flag', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('अधिकार', {
        control: true
      });
      expect(result.isSutra133Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('Compound word analysis', () => {
    test('should detect प्रसह in compound', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('प्रसहाधिकार');
      expect(result.isSutra133Atmanepada).toBe(true);
      expect(result.prasahanaContext).toBe('overpowering');
    });

    test('should detect विजय in compound', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('विजयाधिकृत');
      expect(result.isSutra133Atmanepada).toBe(true);
      expect(result.prasahanaContext).toBe('overpowering');
    });

    test('should detect बल in compound', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('बलाधिकार');
      expect(result.isSutra133Atmanepada).toBe(true);
      expect(result.prasahanaContext).toBe('forcing');
    });
  });

  describe('Negative cases - should not apply', () => {
    test('should not apply without कृ root', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('अधिगम्', {
        overpower: true
      });
      expect(result.isSutra133Atmanepada).toBe(false);
      expect(result.analysis).toContain('कृ root not detected');
    });

    test('should not apply without अधि prefix', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('करोति', {
        defeat: true
      });
      expect(result.isSutra133Atmanepada).toBe(false);
      expect(result.analysis).toContain('अधि prefix not detected');
    });

    test('should not apply without प्रसहन context', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('अधिकरोति');
      expect(result.isSutra133Atmanepada).toBe(false);
      expect(result.analysis).toContain('प्रसहन context');
    });

    test('should not apply with irrelevant meanings', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('अधिकरोति', {
        meaning: 'to make generally'
      });
      expect(result.isSutra133Atmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.5);
    });

    test('should not apply to other prefixes', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('विकरोति', {
        defeat: true
      });
      expect(result.isSutra133Atmanepada).toBe(false);
    });

    test('should require all three conditions', () => {
      // Only root, no prefix or context
      const result1 = determineAdhiKriPrasahaneAtmanepada('करोति');
      expect(result1.isSutra133Atmanepada).toBe(false);
      
      // Only prefix, no root or context
      const result2 = determineAdhiKriPrasahaneAtmanepada('अधिगम्');
      expect(result2.isSutra133Atmanepada).toBe(false);
      
      // Only context, no root or prefix
      const result3 = determineAdhiKriPrasahaneAtmanepada('गच्छति', {
        defeat: true
      });
      expect(result3.isSutra133Atmanepada).toBe(false);
    });
  });

  describe('Error handling', () => {
    test('should handle null input', () => {
      const result = determineAdhiKriPrasahaneAtmanepada(null);
      expect(result.isSutra133Atmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle undefined input', () => {
      const result = determineAdhiKriPrasahaneAtmanepada(undefined);
      expect(result.isSutra133Atmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle empty string', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('');
      expect(result.isSutra133Atmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle whitespace-only string', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('   ');
      expect(result.isSutra133Atmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle non-string input', () => {
      const result = determineAdhiKriPrasahaneAtmanepada(123);
      expect(result.isSutra133Atmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });
  });

  describe('Edge cases', () => {
    test('should handle mixed case input', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('AdhiKaRoTi', {
        defeat: true
      });
      expect(result.isSutra133Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should handle extra whitespace', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('  अधिकरोति  ', {
        overpower: true
      });
      expect(result.isSutra133Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should handle various कृ forms with अधि', () => {
      const kriforms = ['अधिकुर्', 'अधिकार', 'अधिकृत', 'अधिकरण', 'अधिकर्'];
      
      kriforms.forEach(form => {
        const result = determineAdhiKriPrasahaneAtmanepada(form, {
          defeat: true
        });
        expect(result.isSutra133Atmanepada).toBe(true);
      });
    });

    test('should prioritize explicit context over pattern matching', () => {
      const explicitResult = determineAdhiKriPrasahaneAtmanepada('अधिकरोति', {
        root: 'कृ',
        prefix: 'अधि',
        defeat: true
      });
      const patternResult = determineAdhiKriPrasahaneAtmanepada('प्रसहाधिकार');
      
      expect(explicitResult.confidence).toBeGreaterThan(patternResult.confidence);
    });
  });

  describe('Cross-script consistency', () => {
    test('should handle mixed script contexts', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('adhikṛ', {
        root: 'कृ',
        prefix: 'अधि',
        defeat: true
      });
      expect(result.isSutra133Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should handle IAST word with Devanagari context', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('अधिकरोति', {
        root: 'kṛ',
        meaning: 'defeat'
      });
      expect(result.isSutra133Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });
  });

  describe('Detailed analysis verification', () => {
    test('should provide complete analysis for valid cases', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('अधिकरोति', {
        defeat: true
      });
      expect(result.root).toBe('कृ');
      expect(result.prefix).toBe('अधि');
      expect(result.prasahanaContext).toBe('overpowering');
      expect(result.rootDetection).toBeDefined();
      expect(result.prefixDetection).toBeDefined();
      expect(result.prasahanaAnalysis).toBeDefined();
    });

    test('should explain failure clearly', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('गच्छति', {
        defeat: true
      });
      expect(result.analysis).toContain('Missing:');
      expect(result.analysis).toContain('कृ root');
      expect(result.analysis).toContain('अधि prefix');
    });

    test('should distinguish different failure modes', () => {
      const noRoot = determineAdhiKriPrasahaneAtmanepada('अधिगम्', {
        defeat: true
      });
      const noPrefix = determineAdhiKriPrasahaneAtmanepada('करोति', {
        defeat: true
      });
      const noContext = determineAdhiKriPrasahaneAtmanepada('अधिकरोति');
      
      expect(noRoot.analysis).toContain('कृ root not detected');
      expect(noPrefix.analysis).toContain('अधि prefix not detected');
      expect(noContext.analysis).toContain('प्रसहन context');
    });
  });

  describe('Sutra metadata', () => {
    test('should include correct sutra reference', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('अधिकरोति', {
        defeat: true
      });
      expect(result.sutraApplied).toBe('1.3.33');
    });

    test('should include sutra reference for negative cases', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('गच्छति');
      expect(result.sutraApplied).toBe('1.3.33');
    });

    test('should maintain metadata consistency', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('अधिकरोति', {
        overpower: true
      });
      expect(result.sutraApplied).toBe('1.3.33');
      expect(result.root).toBe('कृ');
      expect(result.prefix).toBe('अधि');
    });
  });

  describe('Confidence calibration', () => {
    test('should have high confidence with explicit all elements', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('अधिकरोति', {
        root: 'कृ',
        prefix: 'अधि',
        defeat: true
      });
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should have medium confidence with pattern matching', () => {
      const result = determineAdhiKriPrasahaneAtmanepada('प्रसहाधिकार');
      expect(result.confidence).toBeGreaterThan(0.5);
      expect(result.confidence).toBeLessThan(0.8);
    });

    test('should have appropriate confidence gradation', () => {
      const explicitResult = determineAdhiKriPrasahaneAtmanepada('अधिकरोति', {
        root: 'कृ',
        prefix: 'अधि',
        defeat: true
      });
      const implicitResult = determineAdhiKriPrasahaneAtmanepada('विजयाधिकार');
      
      expect(explicitResult.confidence).toBeGreaterThan(implicitResult.confidence);
    });
  });
});
