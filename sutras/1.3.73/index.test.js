/**
 * Test suite for Sutra 1.3.73: अपाद्वदः
 * Tests अप + वद् construction taking Ātmanepada when action benefits agent
 */

import { sutra1373 } from './index.js';

describe('Sutra 1.3.73: अपाद्वदः', () => {
  
  describe('Input Validation', () => {
    test('should handle null/undefined input', () => {
      const result = sutra1373(null);
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });
    
    test('should handle empty string', () => {
      const result = sutra1373('');
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });
    
    test('should handle non-string input', () => {
      const result = sutra1373(123);
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });
  });
  
  describe('Positive Cases - अप + वद् Construction', () => {
    test('should apply for अप + वद् with explicit agent benefit', () => {
      const result = sutra1373('अपवदति', {
        root: 'वद्',
        upasarga: 'अप',
        benefitsAgent: true
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.construction).toBe('अप + वद्');
    });
    
    test('should apply with IAST input', () => {
      const result = sutra1373('apavadati', {
        root: 'vad',
        upasarga: 'apa',
        meaning: 'speaks for own benefit'
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.detectedAgentBenefit).toBe(true);
    });
    
    test('should detect अप pattern in word', () => {
      const result = sutra1373('अपवादते', {
        root: 'वद्',
        benefitsAgent: true
      });
      expect(result.applies).toBe(true);
      expect(result.detectedApaUpasarga).toBe(true);
    });
    
    test('should detect वद् pattern in word', () => {
      const result = sutra1373('अपवदते', {
        upasarga: 'अप',
        benefitsAgent: true
      });
      expect(result.applies).toBe(true);
      expect(result.detectedRoot).toBe('detected');
    });
    
    test('should apply with censure meaning (अपवाद)', () => {
      const result = sutra1373('अपवदति', {
        root: 'वद्',
        upasarga: 'अप',
        meaning: 'censures and blames others'
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAgentBenefit).toBe(true);
    });
  });
  
  describe('Pattern Detection', () => {
    test('should detect both अप and वद् patterns without explicit context', () => {
      const result = sutra1373('अपवदते', {
        benefitsAgent: true
      });
      expect(result.applies).toBe(true);
      expect(result.detectedRoot).toBe('detected');
      expect(result.detectedApaUpasarga).toBe(true);
    });
    
    test('should handle वच् variation of वद्', () => {
      const result = sutra1373('अपवचन', {
        upasarga: 'अप',
        benefitsAgent: true
      });
      expect(result.applies).toBe(true);
      expect(result.detectedRoot).toBe('detected');
    });
    
    test('should handle वाद variation', () => {
      const result = sutra1373('अपवादः', {
        upasarga: 'अप',
        benefitsAgent: true
      });
      expect(result.applies).toBe(true);
      expect(result.detectedRoot).toBe('detected');
    });
    
    test('should detect apa pattern in IAST', () => {
      const result = sutra1373('apavadati', {
        root: 'vad',
        benefitsAgent: true
      });
      expect(result.applies).toBe(true);
      expect(result.detectedApaUpasarga).toBe(true);
    });
    
    test('should default to agent benefit with अप + वद्', () => {
      const result = sutra1373('अपवदति', {
        root: 'वद्',
        upasarga: 'अप'
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAgentBenefit).toBe(true);
    });
  });
  
  describe('Meaning Analysis', () => {
    test('should detect agent benefit keywords', () => {
      const result = sutra1373('अपवदति', {
        root: 'वद्',
        upasarga: 'अप',
        meaning: 'speaks for own benefit'
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAgentBenefit).toBe(true);
    });
    
    test('should detect Sanskrit agent benefit terms', () => {
      const result = sutra1373('अपवदति', {
        root: 'वद्',
        upasarga: 'अप',
        meaning: 'स्वार्थ में बोलता है'
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAgentBenefit).toBe(true);
    });
    
    test('should detect censure meaning (अपवाद)', () => {
      const result = sutra1373('अपवदति', {
        root: 'वद्',
        upasarga: 'अप',
        meaning: 'criticizes and condemns'
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAgentBenefit).toBe(true);
    });
    
    test('should detect blame context', () => {
      const result = sutra1373('अपवदति', {
        root: 'वद्',
        upasarga: 'अप',
        meaning: 'निन्दा और दूषण करता है'
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAgentBenefit).toBe(true);
    });
    
    test('should detect reproach meaning', () => {
      const result = sutra1373('अपवदति', {
        root: 'वद्',
        upasarga: 'अप',
        meaning: 'reproaches others for personal satisfaction'
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAgentBenefit).toBe(true);
    });
  });
  
  describe('Negative Cases - Wrong Root', () => {
    test('should not apply for different root', () => {
      const result = sutra1373('अपगच्छति', {
        root: 'गम्',
        upasarga: 'अप',
        benefitsAgent: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Root is not वद्');
    });
    
    test('should not apply for कृ root', () => {
      const result = sutra1373('अपकरोति', {
        root: 'कृ',
        upasarga: 'अप',
        benefitsAgent: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Root is not वद्');
    });
    
    test('should not apply for भू root', () => {
      const result = sutra1373('अपभवति', {
        root: 'भू',
        upasarga: 'अप',
        benefitsAgent: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Root is not वद्');
    });
  });
  
  describe('Negative Cases - Wrong Upasarga', () => {
    test('should not apply without अप upasarga', () => {
      const result = sutra1373('वदति', {
        root: 'वद्',
        benefitsAgent: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('अप upasarga');
    });
    
    test('should not apply with different upasarga', () => {
      const result = sutra1373('प्रवदति', {
        root: 'वद्',
        upasarga: 'प्र',
        benefitsAgent: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('अप upasarga');
    });
    
    test('should not apply with उप upasarga', () => {
      const result = sutra1373('उपवदति', {
        root: 'वद्',
        upasarga: 'उप',
        benefitsAgent: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('अप upasarga');
    });
    
    test('should not apply with सम् upasarga', () => {
      const result = sutra1373('संवदति', {
        root: 'वद्',
        upasarga: 'सम्',
        benefitsAgent: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('अप upasarga');
    });
  });
  
  describe('Negative Cases - No Agent Benefit', () => {
    test('should not apply without agent benefit', () => {
      const result = sutra1373('अपवदति', {
        root: 'वद्',
        upasarga: 'अप',
        benefitsAgent: false
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Agent benefit');
    });
    
    test('should not apply for neutral speaking', () => {
      const result = sutra1373('अपवदति', {
        root: 'वद्',
        upasarga: 'अप',
        meaning: 'simply speaks neutrally'
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Agent benefit');
    });
    
    test('should not apply for other-benefit meaning', () => {
      const result = sutra1373('अपवदति', {
        root: 'वद्',
        upasarga: 'अप',
        meaning: 'speaks for others benefit'
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Agent benefit');
    });
  });
  
  describe('Edge Cases', () => {
    test('should handle IAST script detection', () => {
      const result = sutra1373('apavadate', {
        root: 'vad',
        upasarga: 'apa',
        benefitsAgent: true
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });
    
    test('should handle mixed script input', () => {
      const result = sutra1373('अपवदति', {
        root: 'vad', // IAST root with Devanagari word
        upasarga: 'apa',
        benefitsAgent: true
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });
    
    test('should maintain high confidence for valid cases', () => {
      const result = sutra1373('अपवदते', {
        root: 'वद्',
        upasarga: 'अप',
        benefitsAgent: true
      });
      expect(result.confidence).toBeGreaterThan(0.9);
    });
    
    test('should handle complex compound words', () => {
      const result = sutra1373('अपवादकारी', {
        root: 'वद्',
        upasarga: 'अप',
        meaning: 'one who censures for self satisfaction'
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAgentBenefit).toBe(true);
    });
    
    test('should handle sandhi forms', () => {
      const result = sutra1373('अपावदति', { // with sandhi
        root: 'वद्',
        upasarga: 'अप',
        benefitsAgent: true
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });
  });
  
  describe('Return Value Structure', () => {
    test('should return complete analysis object', () => {
      const result = sutra1373('अपवदति', {
        root: 'वद्',
        upasarga: 'अप',
        benefitsAgent: true
      });
      
      expect(result).toHaveProperty('applies');
      expect(result).toHaveProperty('isAtmanepada');
      expect(result).toHaveProperty('reason');
      expect(result).toHaveProperty('sutra');
      expect(result).toHaveProperty('confidence');
      expect(result).toHaveProperty('construction');
      expect(result.sutra).toBe('1.3.73');
      expect(result.construction).toBe('अप + वद्');
    });
    
    test('should provide detection details', () => {
      const result = sutra1373('अपवदति', {
        root: 'वद्',
        upasarga: 'अप',
        meaning: 'censures others'
      });
      
      expect(result).toHaveProperty('detectedRoot');
      expect(result).toHaveProperty('detectedApaUpasarga');
      expect(result).toHaveProperty('detectedAgentBenefit');
      expect(result).toHaveProperty('construction');
    });
  });
  
  describe('Error Handling', () => {
    test('should handle analysis errors gracefully', () => {
      const result = sutra1373('invalid-sanskrit', {
        root: 'वद्',
        upasarga: 'अप',
        benefitsAgent: true
      });
      
      expect(result).toHaveProperty('applies');
      expect(result).toHaveProperty('reason');
      expect(result).toHaveProperty('confidence');
    });
  });
});
