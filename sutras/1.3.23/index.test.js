/**
 * Test Suite for Sutra 1.3.23: प्रकाशनस्थेयाख्ययोश्च
 * Tests ātmanepada determination for स्था in प्रकाशन and स्थेयाख्याय semantic contexts
 */

import { determineSthaSemanticsAtmanepada } from './index.js';

describe('Sutra 1.3.23: प्रकाशनस्थेयाख्ययोश्च (prakāśanastheyākhyayośca)', () => {
  
  describe('प्रकाशन (intention indication) contexts', () => {
    test('should detect स्था with explicit intention context', () => {
      const result = determineSthaSemanticsAtmanepada('तिष्ठते', {
        intentionIndication: true
      });
      expect(result.isSthaSemanticsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.semanticContext).toBe('प्रकाशन');
    });

    test('should detect स्था with intention meaning', () => {
      const result = determineSthaSemanticsAtmanepada('तिष्ठते', {
        meaning: 'to indicate intention to another'
      });
      expect(result.isSthaSemanticsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.semanticContext).toBe('प्रकाशन');
    });

    test('should detect प्रकाश patterns in word', () => {
      const result = determineSthaSemanticsAtmanepada('प्रकाशस्था');
      expect(result.isSthaSemanticsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.semanticContext).toBe('प्रकाशन');
    });

    test('should detect प्रकाशन (prakāśana) IAST', () => {
      const result = determineSthaSemanticsAtmanepada('prakāśasthā');
      expect(result.isSthaSemanticsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.semanticContext).toBe('प्रकाशन');
    });

    test('should detect आख्या semantic pattern', () => {
      const result = determineSthaSemanticsAtmanepada('आख्यास्था');
      expect(result.isSthaSemanticsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.semanticContext).toBe('प्रकाशन');
    });
  });

  describe('स्थेयाख्याय (arbitration) contexts', () => {
    test('should detect स्था with explicit arbitration context', () => {
      const result = determineSthaSemanticsAtmanepada('तिष्ठते', {
        arbitration: true
      });
      expect(result.isSthaSemanticsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.semanticContext).toBe('स्थेयाख्याय');
    });

    test('should detect स्था with arbitration meaning', () => {
      const result = determineSthaSemanticsAtmanepada('तिष्ठते', {
        meaning: 'to make an award as arbitrator'
      });
      expect(result.isSthaSemanticsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.semanticContext).toBe('स्थेयाख्याय');
    });

    test('should detect न्याय patterns in word', () => {
      const result = determineSthaSemanticsAtmanepada('न्यायस्था');
      expect(result.isSthaSemanticsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.semanticContext).toBe('स्थेयाख्याय');
    });

    test('should detect nyāya (IAST) patterns', () => {
      const result = determineSthaSemanticsAtmanepada('nyāyasthā');
      expect(result.isSthaSemanticsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.semanticContext).toBe('स्थेयाख्याय');
    });

    test('should detect निर्णय semantic pattern', () => {
      const result = determineSthaSemanticsAtmanepada('निर्णयस्था');
      expect(result.isSthaSemanticsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.semanticContext).toBe('स्थेयाख्याय');
    });
  });

  describe('Context-based analysis', () => {
    test('should handle explicit root context with intention', () => {
      const result = determineSthaSemanticsAtmanepada('someform', {
        root: 'स्था',
        intentionIndication: true
      });
      expect(result.isSthaSemanticsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.semanticContext).toBe('प्रकाशन');
    });

    test('should handle IAST root context with arbitration', () => {
      const result = determineSthaSemanticsAtmanepada('someform', {
        root: 'sthā',
        arbitration: true
      });
      expect(result.isSthaSemanticsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.semanticContext).toBe('स्थेयाख्याय');
    });

    test('should handle complex meaning contexts', () => {
      const result = determineSthaSemanticsAtmanepada('तिष्ठते', {
        meaning: 'to reveal one\'s intentions and announce decisions'
      });
      expect(result.isSthaSemanticsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.semanticContext).toBe('प्रकाशन');
    });
  });

  describe('Compound word analysis', () => {
    test('should detect मनःस्था (intention standing)', () => {
      const result = determineSthaSemanticsAtmanepada('मनःस्था');
      expect(result.isSthaSemanticsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.5);
      expect(result.semanticContext).toBe('प्रकाशन');
    });

    test('should detect buddhisthā (wisdom standing)', () => {
      const result = determineSthaSemanticsAtmanepada('buddhisthā');
      expect(result.isSthaSemanticsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.5);
      expect(result.semanticContext).toBe('प्रकाशन');
    });

    test('should detect dharmasthā (dharma standing)', () => {
      const result = determineSthaSemanticsAtmanepada('dharmasthā');
      expect(result.isSthaSemanticsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.5);
      expect(result.semanticContext).toBe('स्थेयाख्याय');
    });

    test('should detect फलस्था (award standing)', () => {
      const result = determineSthaSemanticsAtmanepada('फलस्था');
      expect(result.isSthaSemanticsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.5);
      expect(result.semanticContext).toBe('स्थेयाख्याय');
    });
  });

  describe('Negative cases - should not apply', () => {
    test('should not detect स्था without valid semantic context', () => {
      const result = determineSthaSemanticsAtmanepada('तिष्ठति');
      expect(result.isSthaSemanticsAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.3);
    });

    test('should not detect स्था with general meaning', () => {
      const result = determineSthaSemanticsAtmanepada('तिष्ठते', {
        meaning: 'to stand, to remain'
      });
      expect(result.isSthaSemanticsAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.3);
    });

    test('should not detect non-स्था roots with valid semantics', () => {
      const result = determineSthaSemanticsAtmanepada('प्रकाशयति', {
        intentionIndication: true
      });
      expect(result.isSthaSemanticsAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.3);
    });

    test('should not detect स्था with irrelevant semantic context', () => {
      const result = determineSthaSemanticsAtmanepada('तिष्ठते', {
        meaning: 'physical standing position'
      });
      expect(result.isSthaSemanticsAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.3);
    });

    test('should not apply without both स्था and valid semantics', () => {
      const result = determineSthaSemanticsAtmanepada('गच्छति', {
        intentionIndication: true
      });
      expect(result.isSthaSemanticsAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.3);
    });
  });

  describe('Error handling', () => {
    test('should handle null input', () => {
      const result = determineSthaSemanticsAtmanepada(null);
      expect(result.isSthaSemanticsAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle undefined input', () => {
      const result = determineSthaSemanticsAtmanepada(undefined);
      expect(result.isSthaSemanticsAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle empty string', () => {
      const result = determineSthaSemanticsAtmanepada('');
      expect(result.isSthaSemanticsAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle whitespace-only string', () => {
      const result = determineSthaSemanticsAtmanepada('   ');
      expect(result.isSthaSemanticsAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle non-string input', () => {
      const result = determineSthaSemanticsAtmanepada(123);
      expect(result.isSthaSemanticsAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle invalid Sanskrit words', () => {
      const result = determineSthaSemanticsAtmanepada('xyz123');
      expect(result.isSthaSemanticsAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThanOrEqual(0.1);
      expect(result.analysis).toBe('Invalid Sanskrit word');
    });
  });

  describe('Edge cases', () => {
    test('should handle mixed case input', () => {
      const result = determineSthaSemanticsAtmanepada('PrakāśaSTHĀ');
      expect(result.isSthaSemanticsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('should handle extra whitespace', () => {
      const result = determineSthaSemanticsAtmanepada('  न्यायस्था  ', {
        arbitration: true
      });
      expect(result.isSthaSemanticsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should handle variant स्था forms with semantics', () => {
      const result = determineSthaSemanticsAtmanepada('प्रकाशस्थित');
      expect(result.isSthaSemanticsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should handle complex compound words', () => {
      const result = determineSthaSemanticsAtmanepada('महाप्रकाशस्था');
      expect(result.isSthaSemanticsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('should prioritize explicit context over word analysis', () => {
      const resultExplicit = determineSthaSemanticsAtmanepada('तिष्ठते', {
        arbitration: true
      });
      const resultImplicit = determineSthaSemanticsAtmanepada('न्यायस्था');
      
      expect(resultExplicit.confidence).toBeGreaterThan(resultImplicit.confidence);
    });
  });

  describe('Semantic precedence', () => {
    test('should prefer intention context when both are possible', () => {
      const result = determineSthaSemanticsAtmanepada('तिष्ठते', {
        intentionIndication: true,
        arbitration: false
      });
      expect(result.isSthaSemanticsAtmanepada).toBe(true);
      expect(result.semanticContext).toBe('प्रकाशन');
    });

    test('should handle mixed semantic indicators', () => {
      const result = determineSthaSemanticsAtmanepada('प्रकाशन्यायस्था');
      expect(result.isSthaSemanticsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.5);
      // Should detect first semantic pattern found
      expect(result.semanticContext).toBe('प्रकाशन');
    });

    test('should handle meaning with both semantic types', () => {
      const result = determineSthaSemanticsAtmanepada('तिष्ठते', {
        meaning: 'to indicate intention and arbitrate awards'
      });
      expect(result.isSthaSemanticsAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      // Should detect first matching semantic type
      expect(result.semanticContext).toBe('प्रकाशन');
    });
  });

  describe('Sutra metadata', () => {
    test('should include correct sutra reference', () => {
      const result = determineSthaSemanticsAtmanepada('प्रकाशस्था');
      expect(result.sutraApplied).toBe('1.3.23');
    });

    test('should include sutra reference even for negative cases', () => {
      const result = determineSthaSemanticsAtmanepada('गच्छति');
      expect(result.sutraApplied).toBe('1.3.23');
    });

    test('should include root information for valid cases', () => {
      const result = determineSthaSemanticsAtmanepada('न्यायस्था');
      expect(result.root).toBe('स्था');
      expect(result.semanticContext).toBeDefined();
    });

    test('should distinguish between the two semantic contexts', () => {
      const intentionResult = determineSthaSemanticsAtmanepada('प्रकाशस्था');
      const arbitrationResult = determineSthaSemanticsAtmanepada('न्यायस्था');
      
      expect(intentionResult.semanticContext).toBe('प्रकाशन');
      expect(arbitrationResult.semanticContext).toBe('स्थेयाख्याय');
    });
  });
});
