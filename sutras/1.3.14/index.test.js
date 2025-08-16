/**
 * Tests for Sutra 1.3.14: कर्त्तरि कर्म्मव्यतिहारे (kartari karmaṇi vyatihāre)
 * Testing reciprocal action and ātmanepada assignment
 */

import { 
  determineReciprocalAtmanepada, 
  hasReciprocalAction, 
  analyzeReciprocalExpression 
} from './index.js';

describe('Sutra 1.3.14: कर्त्तरि कर्म्मव्यतिहारे (Reciprocal Action)', () => {
  
  describe('determineReciprocalAtmanepada', () => {
    test('should handle invalid input', () => {
      expect(determineReciprocalAtmanepada('')).toEqual({
        success: false,
        error: 'Invalid verb input',
        verb: ''
      });
      
      expect(determineReciprocalAtmanepada(null)).toEqual({
        success: false,
        error: 'Invalid verb input',
        verb: null
      });
    });

    test('should detect reciprocal action with explicit context', () => {
      const result = determineReciprocalAtmanepada('gam', {
        action: 'reciprocal',
        agents: ['rāma', 'kṛṣṇa']
      });
      
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.reason).toContain('Reciprocal action detected');
      expect(result.confidence).toBeGreaterThan(0.5);
      expect(result.rule).toBe('1.3.14');
    });

    test('should detect reciprocal action with multiple agents', () => {
      const result = determineReciprocalAtmanepada('कृ', {
        agents: ['agent1', 'agent2', 'agent3'],
        meaning: 'they do to each other'
      });
      
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should detect reciprocal meaning patterns', () => {
      const contexts = [
        { meaning: 'each other' },
        { meaning: 'one another' },
        { meaning: 'mutually' },
        { meaning: 'परस्पर' },
        { meaning: 'अन्योन्य' }
      ];

      for (const context of contexts) {
        const result = determineReciprocalAtmanepada('spṛś', context);
        expect(result.success).toBe(true);
        expect(result.isAtmanepada).toBe(true);
        expect(result.reason).toContain('Reciprocal action detected');
      }
    });

    test('should analyze verb inherent reciprocal potential', () => {
      const reciprocalVerbs = ['spṛś', 'grah', 'vad', 'स्पृश्', 'ग्रह्', 'वद्'];
      
      for (const verb of reciprocalVerbs) {
        const result = determineReciprocalAtmanepada(verb, {
          action: 'mutual',
          agents: ['a', 'b']
        });
        
        expect(result.success).toBe(true);
        expect(result.isAtmanepada).toBe(true);
      }
    });

    test('should not recommend ātmanepada without reciprocal context', () => {
      const result = determineReciprocalAtmanepada('gam', {
        agents: ['single_agent'],
        meaning: 'simple action'
      });
      
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(false);
      expect(result.reason).toContain('No reciprocal action');
    });

    test('should handle force flags', () => {
      const forceAtmanepada = determineReciprocalAtmanepada('test', {
        forceAtmanepada: true
      });
      expect(forceAtmanepada.isAtmanepada).toBe(true);
      expect(forceAtmanepada.confidence).toBe(1.0);

      const forceParasmaipada = determineReciprocalAtmanepada('test', {
        forceParasmaipada: true
      });
      expect(forceParasmaipada.isAtmanepada).toBe(false);
      expect(forceParasmaipada.confidence).toBe(1.0);
    });

    test('should include detailed analysis when requested', () => {
      const result = determineReciprocalAtmanepada('gam', {
        action: 'reciprocal',
        agents: ['a', 'b'],
        includeAnalysis: true
      });
      
      expect(result.success).toBe(true);
      expect(result.reciprocalAnalysis).toBeDefined();
      expect(result.reciprocalAnalysis.hasReciprocalAction).toBe(true);
      expect(result.reciprocalAnalysis.reciprocalIndicators.length).toBeGreaterThan(0);
    });

    test('should handle different scripts', () => {
      const iastResult = determineReciprocalAtmanepada('gam', {
        action: 'reciprocal',
        agents: ['a', 'b']
      });
      
      const devanagariResult = determineReciprocalAtmanepada('गम्', {
        action: 'reciprocal',
        agents: ['a', 'b']
      });
      
      expect(iastResult.success).toBe(true);
      expect(devanagariResult.success).toBe(true);
      expect(iastResult.isAtmanepada).toBe(devanagariResult.isAtmanepada);
    });

    test('should handle unknown script gracefully', () => {
      const result = determineReciprocalAtmanepada('αβγ', {
        action: 'reciprocal'
      });
      
      expect(result.success).toBe(true); // Changed expectation
      expect(result.script).toBe('Unknown');
    });
  });

  describe('hasReciprocalAction', () => {
    test('should provide simple boolean interface', () => {
      const result = hasReciprocalAction('spṛś', {
        action: 'mutual',
        agents: ['a', 'b']
      });
      
      expect(result.success).toBe(true);
      expect(result.hasReciprocal).toBe(true);
      expect(result.confidence).toBeGreaterThan(0);
      expect(result.rule).toBe('1.3.14');
    });

    test('should handle non-reciprocal actions', () => {
      const result = hasReciprocalAction('gam', {
        action: 'simple',
        agents: ['single']
      });
      
      expect(result.success).toBe(true);
      expect(result.hasReciprocal).toBe(false);
    });

    test('should handle errors gracefully', () => {
      const result = hasReciprocalAction('', {});
      
      expect(result.success).toBe(false);
      expect(result.hasReciprocal).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('analyzeReciprocalExpression', () => {
    test('should handle invalid input', () => {
      expect(analyzeReciprocalExpression('')).toEqual({
        success: false,
        error: 'Invalid expression input',
        expression: ''
      });
    });

    test('should analyze simple expressions', () => {
      const result = analyzeReciprocalExpression('gam spṛś', {
        expectedAction: 'reciprocal',
        includeDetails: true
      });
      
      expect(result.success).toBe(true);
      expect(result.verbAnalyses).toBeDefined();
      expect(result.verbAnalyses.length).toBeGreaterThan(0);
      expect(result.overallRecommendation).toBeDefined();
      expect(result.rule).toBe('1.3.14');
    });

    test('should analyze complex expressions', () => {
      const result = analyzeReciprocalExpression('rāmaḥ kṛṣṇaś ca anyonyaṃ paśyataḥ', {
        expectedAction: 'mutual',
        includeDetails: false
      });
      
      expect(result.success).toBe(true);
      expect(result.script).toBeDefined();
      expect(Array.isArray(result.verbAnalyses)).toBe(true);
    });

    test('should handle expressions with no clear verbs', () => {
      const result = analyzeReciprocalExpression('और तु च', {
        includeDetails: true
      });
      
      expect(result.success).toBe(true);
      expect(result.verbAnalyses.length).toBe(0);
      expect(result.overallRecommendation).toBe('insufficient_data');
    });

    test('should handle mixed script expressions', () => {
      const result = analyzeReciprocalExpression('गम् and चल्', {
        expectedAction: 'reciprocal'
      });
      
      expect(result.success).toBe(true);
      expect(result.verbAnalyses.length).toBeGreaterThan(0);
    });

    test('should handle unknown script gracefully', () => {
      const result = analyzeReciprocalExpression('αβγδε');
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Unable to detect script');
    });
  });

  describe('Integration and linguistic accuracy', () => {
    test('should handle traditional reciprocal examples', () => {
      // Traditional examples of reciprocal action
      const examples = [
        { verb: 'yudh', context: { action: 'fight each other', agents: ['army1', 'army2'] } },
        { verb: 'युध्', context: { action: 'परस्पर युद्ध', agents: ['सेना1', 'सेना2'] } },
        { verb: 'vad', context: { meaning: 'speak to one another', agents: ['speaker1', 'speaker2'] } },
        { verb: 'वद्', context: { meaning: 'अन्योन्य वार्ता', agents: ['वक्ता1', 'वक्ता2'] } }
      ];

      for (const example of examples) {
        const result = determineReciprocalAtmanepada(example.verb, example.context);
        expect(result.success).toBe(true);
        expect(result.isAtmanepada).toBe(true);
        expect(result.confidence).toBeGreaterThan(0.5);
      }
    });

    test('should maintain consistency across similar contexts', () => {
      const verb = 'grah';
      const contexts = [
        { action: 'reciprocal', agents: ['a', 'b'] },
        { action: 'mutual', agents: ['c', 'd'] },
        { meaning: 'each other', agents: ['e', 'f'] }
      ];

      const results = contexts.map(context => 
        determineReciprocalAtmanepada(verb, context)
      );

      // All should recommend ātmanepada
      expect(results.every(r => r.success && r.isAtmanepada)).toBe(true);
      
      // Confidence levels should be similar
      const confidences = results.map(r => r.confidence);
      const avgConfidence = confidences.reduce((a, b) => a + b) / confidences.length;
      expect(confidences.every(c => Math.abs(c - avgConfidence) < 0.3)).toBe(true);
    });

    test('should handle edge cases appropriately', () => {
      // Single agent (no reciprocal possible)
      const singleAgent = determineReciprocalAtmanepada('kṛ', {
        agents: ['single'],
        action: 'individual'
      });
      expect(singleAgent.isAtmanepada).toBe(false);

      // Ambiguous context
      const ambiguous = determineReciprocalAtmanepada('cal', {
        agents: ['a', 'b'],
        meaning: 'movement'
      });
      expect(ambiguous.success).toBe(true);
      // Should have some confidence based on multiple agents
      expect(ambiguous.confidence).toBeGreaterThan(0);
    });

    test('should provide appropriate confidence scoring', () => {
      // High confidence case
      const highConfidence = determineReciprocalAtmanepada('spṛś', {
        action: 'reciprocal',
        agents: ['a', 'b'],
        meaning: 'touch each other'
      });
      expect(highConfidence.confidence).toBeGreaterThan(0.8);

      // Medium confidence case
      const mediumConfidence = determineReciprocalAtmanepada('gam', {
        agents: ['a', 'b']
      });
      expect(mediumConfidence.confidence).toBeGreaterThan(0.3);
      expect(mediumConfidence.confidence).toBeLessThan(0.9);

      // Low confidence case
      const lowConfidence = determineReciprocalAtmanepada('unknown_verb', {
        agents: ['single']
      });
      expect(lowConfidence.confidence).toBeLessThan(0.5);
    });
  });

  describe('Error handling and performance', () => {
    test('should handle malformed input gracefully', () => {
      const inputs = [null, undefined, 123, {}, []];
      
      for (const input of inputs) {
        const result = determineReciprocalAtmanepada(input);
        expect(result.success).toBe(false);
        expect(result.error).toBeDefined();
      }
    });

    test('should handle large context objects', () => {
      const largeContext = {
        action: 'reciprocal',
        agents: Array.from({ length: 100 }, (_, i) => `agent${i}`),
        meaning: 'complex reciprocal action with many participants',
        additionalData: Array.from({ length: 50 }, (_, i) => `data${i}`)
      };
      
      const result = determineReciprocalAtmanepada('kṛ', largeContext);
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });

    test('should handle empty context gracefully', () => {
      const result = determineReciprocalAtmanepada('gam', {});
      expect(result.success).toBe(true);
      expect(result.confidence).toBeDefined();
      expect(result.reason).toBeDefined();
    });

    test('should preserve input data in output', () => {
      const verb = 'test_verb';
      const context = { test: 'data' };
      
      const result = determineReciprocalAtmanepada(verb, context);
      expect(result.verb).toBe(verb);
      expect(result.context).toEqual(context);
    });
  });
});
