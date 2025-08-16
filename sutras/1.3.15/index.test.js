/**
 * Tests for Sanskrit Sutra 1.3.15: न गतिहिंसार्थेभ्यः
 * 
 * Tests the motion and injury exception rule to Sutra 1.3.14
 */

import { 
  determineMotionInjuryException, 
  hasMotionMeaning, 
  hasInjuryMeaning 
} from './index.js';

describe('Sutra 1.3.15: न गतिहिंसार्थेभ्यः (Motion and Injury Exception)', () => {
  
  describe('determineMotionInjuryException', () => {
    
    test('should handle invalid input', () => {
      expect(determineMotionInjuryException()).toEqual({
        success: false,
        error: 'Invalid verb: must be a non-empty string',
        verb: undefined
      });
      
      expect(determineMotionInjuryException('')).toEqual({
        success: false,
        error: 'Invalid verb: must be a non-empty string',
        verb: ''
      });
      
      expect(determineMotionInjuryException(123)).toEqual({
        success: false,
        error: 'Invalid verb: must be a non-empty string',
        verb: 123
      });
    });

    test('should detect motion verbs from root analysis', () => {
      const motionVerbs = ['gam', 'गम्', 'car', 'चर्', 'gacch', 'गच्छ्'];
      
      for (const verb of motionVerbs) {
        const result = determineMotionInjuryException(verb);
        expect(result.success).toBe(true);
        expect(result.appliesException).toBe(true);
        expect(result.semanticCategory).toBe('motion');
        expect(result.confidence).toBeGreaterThan(0.5);
        expect(result.reason).toContain('Motion verb exception');
      }
    });

    test('should detect injury verbs from root analysis', () => {
      const injuryVerbs = ['han', 'हन्', 'hiṃs', 'हिंस्', 'vadh', 'वध्'];
      
      for (const verb of injuryVerbs) {
        const result = determineMotionInjuryException(verb);
        expect(result.success).toBe(true);
        expect(result.appliesException).toBe(true);
        expect(result.semanticCategory).toBe('injury');
        expect(result.confidence).toBeGreaterThan(0.5);
        expect(result.reason).toContain('Injury verb exception');
      }
    });

    test('should detect motion meaning from context', () => {
      const result = determineMotionInjuryException('test', {
        meaning: 'to go from one place to another',
        forceMotion: false
      });
      
      expect(result.success).toBe(true);
      expect(result.appliesException).toBe(true);
      expect(result.semanticCategory).toBe('motion');
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('should detect injury meaning from context', () => {
      const result = determineMotionInjuryException('test', {
        action: 'to harm and injure the enemy',
        forceInjury: false
      });
      
      expect(result.success).toBe(true);
      expect(result.appliesException).toBe(true);
      expect(result.semanticCategory).toBe('injury');
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    test('should handle verbs with neither motion nor injury meaning', () => {
      const result = determineMotionInjuryException('test', {
        meaning: 'to think or contemplate'
      });
      
      expect(result.success).toBe(true);
      expect(result.appliesException).toBe(false);
      expect(result.semanticCategory).toBe('neither');
      expect(result.reason).toContain('No motion or injury meaning detected');
    });

    test('should handle force flags for testing', () => {
      const motionResult = determineMotionInjuryException('test', { forceMotion: true });
      expect(motionResult.appliesException).toBe(true);
      expect(motionResult.semanticCategory).toBe('motion');
      expect(motionResult.confidence).toBe(1.0);

      const injuryResult = determineMotionInjuryException('test', { forceInjury: true });
      expect(injuryResult.appliesException).toBe(true);
      expect(injuryResult.semanticCategory).toBe('injury');
      expect(injuryResult.confidence).toBe(1.0);
    });

    test('should include detailed analysis when requested', () => {
      const result = determineMotionInjuryException('gam', { includeAnalysis: true });
      
      expect(result.semanticAnalysis).toBeDefined();
      expect(result.semanticAnalysis.motionIndicators).toBeInstanceOf(Array);
      expect(result.semanticAnalysis.motionIndicators.length).toBeGreaterThan(0);
      expect(result.semanticAnalysis.hasMotionMeaning).toBe(true);
    });

    test('should handle different scripts', () => {
      const iastResult = determineMotionInjuryException('gam');
      expect(iastResult.script).toBe('IAST');
      expect(iastResult.appliesException).toBe(true);

      const devanagariResult = determineMotionInjuryException('गम्');
      expect(devanagariResult.script).toBe('Devanagari');
      expect(devanagariResult.appliesException).toBe(true);
    });

    test('should handle unknown script gracefully', () => {
      const result = determineMotionInjuryException('xyz123!@#', { forceMotion: true });
      expect(result.success).toBe(true);
      expect(result.script).toBe('Unknown');
    });

    test('should prioritize stronger semantic category when both present', () => {
      // Create a context with both motion and injury indicators
      const result = determineMotionInjuryException('test', {
        meaning: 'to go and harm',
        includeAnalysis: true
      });
      
      expect(result.success).toBe(true);
      expect(result.appliesException).toBe(true);
      expect(['motion', 'injury']).toContain(result.semanticCategory);
      
      // Should have indicators for both
      if (result.semanticAnalysis) {
        const hasMotionIndicators = result.semanticAnalysis.motionIndicators.length > 0;
        const hasInjuryIndicators = result.semanticAnalysis.injuryIndicators.length > 0;
        expect(hasMotionIndicators || hasInjuryIndicators).toBe(true);
      }
    });
  });

  describe('hasMotionMeaning', () => {
    
    test('should provide simple boolean interface for motion detection', () => {
      expect(hasMotionMeaning('gam')).toBe(true);
      expect(hasMotionMeaning('गम्')).toBe(true);
      expect(hasMotionMeaning('car')).toBe(true);
      expect(hasMotionMeaning('test', { meaning: 'to move' })).toBe(true);
      expect(hasMotionMeaning('test', { meaning: 'to think' })).toBe(false);
    });

    test('should handle non-motion verbs', () => {
      expect(hasMotionMeaning('han')).toBe(false); // injury verb
      expect(hasMotionMeaning('test')).toBe(false); // neutral verb
    });

    test('should handle errors gracefully', () => {
      expect(hasMotionMeaning(null)).toBe(false);
      expect(hasMotionMeaning('')).toBe(false);
      expect(hasMotionMeaning(123)).toBe(false);
    });
  });

  describe('hasInjuryMeaning', () => {
    
    test('should provide simple boolean interface for injury detection', () => {
      expect(hasInjuryMeaning('han')).toBe(true);
      expect(hasInjuryMeaning('हन्')).toBe(true);
      expect(hasInjuryMeaning('hiṃs')).toBe(true);
      expect(hasInjuryMeaning('test', { meaning: 'to harm' })).toBe(true);
      expect(hasInjuryMeaning('test', { meaning: 'to think' })).toBe(false);
    });

    test('should handle non-injury verbs', () => {
      expect(hasInjuryMeaning('gam')).toBe(false); // motion verb
      expect(hasInjuryMeaning('test')).toBe(false); // neutral verb
    });

    test('should handle errors gracefully', () => {
      expect(hasInjuryMeaning(null)).toBe(false);
      expect(hasInjuryMeaning('')).toBe(false);
      expect(hasInjuryMeaning(123)).toBe(false);
    });
  });

  describe('Integration and linguistic accuracy', () => {
    
    test('should handle traditional motion examples', () => {
      const motionExamples = [
        { verb: 'gam', context: { meaning: 'to go' } },
        { verb: 'गम्', context: { meaning: 'गमन करना' } },
        { verb: 'car', context: { action: 'move around' } },
        { verb: 'चर्', context: { action: 'चलना' } }
      ];

      for (const example of motionExamples) {
        const result = determineMotionInjuryException(example.verb, example.context);
        expect(result.success).toBe(true);
        expect(result.appliesException).toBe(true);
        expect(result.semanticCategory).toBe('motion');
        expect(result.confidence).toBeGreaterThan(0.5);
      }
    });

    test('should handle traditional injury examples', () => {
      const injuryExamples = [
        { verb: 'han', context: { meaning: 'to kill' } },
        { verb: 'हन्', context: { meaning: 'मारना' } },
        { verb: 'hiṃs', context: { action: 'cause harm' } },
        { verb: 'हिंस्', context: { action: 'हिंसा करना' } }
      ];

      for (const example of injuryExamples) {
        const result = determineMotionInjuryException(example.verb, example.context);
        expect(result.success).toBe(true);
        expect(result.appliesException).toBe(true);
        expect(result.semanticCategory).toBe('injury');
        expect(result.confidence).toBeGreaterThan(0.5);
      }
    });

    test('should maintain consistency across similar contexts', () => {
      const verb = 'gam';
      const contexts = [
        { meaning: 'to go' },
        { action: 'move from place to place' },
        { meaning: 'गमन' }
      ];

      for (const context of contexts) {
        const result = determineMotionInjuryException(verb, context);
        expect(result.appliesException).toBe(true);
        expect(result.semanticCategory).toBe('motion');
      }
    });

    test('should handle edge cases appropriately', () => {
      // Ambiguous cases
      const ambiguousResult = determineMotionInjuryException('test', {
        meaning: 'to strike while moving'
      });
      expect(ambiguousResult.success).toBe(true);
      expect(ambiguousResult.appliesException).toBe(true);
      expect(['motion', 'injury']).toContain(ambiguousResult.semanticCategory);

      // Very weak semantic evidence
      const weakResult = determineMotionInjuryException('test', {
        meaning: 'something related to movement, perhaps'
      });
      expect(weakResult.success).toBe(true);
      // May or may not apply exception depending on pattern matching
    });

    test('should provide appropriate confidence scoring', () => {
      const strongMotion = determineMotionInjuryException('gam');
      expect(strongMotion.confidence).toBeGreaterThan(0.7);

      const contextualMotion = determineMotionInjuryException('test', {
        meaning: 'to go'
      });
      expect(contextualMotion.confidence).toBeGreaterThan(0.5);
      expect(contextualMotion.confidence).toBeLessThan(0.9);
    });
  });

  describe('Error handling and performance', () => {
    
    test('should handle malformed input gracefully', () => {
      const malformedInputs = [
        null,
        undefined,
        [],
        123,
        '',
        '   '
      ];

      for (const input of malformedInputs) {
        const result = determineMotionInjuryException(input);
        expect(result.success).toBe(false);
        expect(result.error).toBeDefined();
      }
    });

    test('should handle large context objects', () => {
      const largeContext = {
        meaning: 'to move '.repeat(1000),
        action: 'walking '.repeat(1000),
        agents: Array(100).fill('agent'),
        metadata: { info: 'data '.repeat(1000) }
      };

      const result = determineMotionInjuryException('gam', largeContext);
      expect(result.success).toBe(true);
      expect(result.appliesException).toBe(true);
    });

    test('should handle empty context gracefully', () => {
      const result = determineMotionInjuryException('gam', {});
      expect(result.success).toBe(true);
      expect(result.appliesException).toBe(true);
    });

    test('should preserve input data in output', () => {
      const verb = 'test';
      const context = { meaning: 'to harm', custom: 'data' };
      const result = determineMotionInjuryException(verb, context);
      
      expect(result.verb).toBe(verb);
      expect(result.context).toEqual(context);
      expect(result.rule).toBe('1.3.15');
    });
  });
});
