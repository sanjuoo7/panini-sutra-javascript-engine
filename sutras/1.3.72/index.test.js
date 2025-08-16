/**
 * Test suite for Sutra 1.3.72: स्वरितञितः कर्त्रभिप्राये क्रियाफले
 * Tests स्वरित/ञित् marked verbs taking Ātmanepada when action benefits agent
 */

import { sutra1372 } from './index.js';

describe('Sutra 1.3.72: स्वरितञितः कर्त्रभिप्राये क्रियाफले', () => {
  
  describe('Input Validation', () => {
    test('should handle null/undefined input', () => {
      const result = sutra1372(null);
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });
    
    test('should handle empty string', () => {
      const result = sutra1372('');
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });
    
    test('should handle non-string input', () => {
      const result = sutra1372(123);
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });
  });
  
  describe('Positive Cases - स्वरित Accent', () => {
    test('should apply for स्वरित verb with agent benefit', () => {
      const result = sutra1372('कृष्णाति', {
        root: 'कृष्',
        hasSvarita: true,
        benefitsAgent: true
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.detectedAccentType).toBe('svarita');
    });
    
    test('should apply with known स्वरित root', () => {
      const result = sutra1372('वृधते', {
        root: 'वृध्',
        benefitsAgent: true
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAccentType).toBe('svarita');
    });
    
    test('should apply with agent benefit meaning', () => {
      const result = sutra1372('युनक्ति', {
        root: 'युज्',
        meaning: 'joins for own benefit'
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAgentBenefit).toBe(true);
    });
    
    test('should detect स्वरित in IAST', () => {
      const result = sutra1372('bhuñjé', {
        root: 'भुज्',
        benefitsAgent: true
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAccentType).toBe('svarita');
    });
  });
  
  describe('Positive Cases - ञित् Marking', () => {
    test('should apply for ञित् verb with agent benefit', () => {
      const result = sutra1372('हन्ति', {
        root: 'हन्',
        hasNjit: true,
        benefitsAgent: true
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.detectedAccentType).toBe('njit');
    });
    
    test('should detect ञित् pattern in word', () => {
      const result = sutra1372('तनोति', {
        root: 'तन्',
        benefitsAgent: true
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAccentType).toBe('njit');
    });
    
    test('should apply with known ञित् root', () => {
      const result = sutra1372('वनुते', {
        root: 'वन्',
        meaning: 'करत्रभिप्राय में'
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAccentType).toBe('njit');
    });
    
    test('should detect ञ् pattern in Devanagari', () => {
      const result = sutra1372('मन्यते', {
        benefitsAgent: true
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAccentType).toBe('njit');
    });
  });
  
  describe('Combined Accent Types', () => {
    test('should handle both स्वरित and ञित्', () => {
      const result = sutra1372('verb', {
        root: 'test',
        hasSvarita: true,
        hasNjit: true,
        benefitsAgent: true
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAccentType).toBe('svarita/njit');
    });
  });
  
  describe('Agent Benefit Analysis', () => {
    test('should detect agent benefit keywords', () => {
      const result = sutra1372('कृष्णाति', {
        root: 'कृष्',
        hasSvarita: true,
        meaning: 'works for oneself'
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAgentBenefit).toBe(true);
    });
    
    test('should detect Sanskrit agent benefit terms', () => {
      const result = sutra1372('वृधते', {
        root: 'वृध्',
        hasSvarita: true,
        meaning: 'स्वार्थ में वृद्धि करता है'
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAgentBenefit).toBe(true);
    });
    
    test('should detect self-benefit expressions', () => {
      const result = sutra1372('हन्ति', {
        root: 'हन्',
        hasNjit: true,
        meaning: 'kills to own benefit'
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAgentBenefit).toBe(true);
    });
    
    test('should default to agent benefit assumption', () => {
      const result = sutra1372('युनक्ति', {
        root: 'युज्',
        hasSvarita: true
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAgentBenefit).toBe(true);
    });
  });
  
  describe('Pattern Detection', () => {
    test('should detect accent marks in Devanagari', () => {
      const result = sutra1372('कृष्णा॒ति', { // with accent mark
        benefitsAgent: true
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAccentType).toBe('svarita');
    });
    
    test('should detect accent marks in IAST', () => {
      const result = sutra1372('kṛṣṇā́ti', {
        benefitsAgent: true
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAccentType).toBe('svarita');
    });
    
    test('should work without explicit root', () => {
      const result = sutra1372('तनोति', {
        benefitsAgent: true
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAccentType).toBe('njit');
    });
  });
  
  describe('Negative Cases - No Accent Marking', () => {
    test('should not apply without accent marking', () => {
      const result = sutra1372('गच्छति', {
        root: 'गम्',
        benefitsAgent: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('स्वरित or ञित्');
    });
    
    test('should not apply for unmarked verb', () => {
      const result = sutra1372('भवति', {
        root: 'भू',
        benefitsAgent: true
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('accent marking');
    });
  });
  
  describe('Negative Cases - No Agent Benefit', () => {
    test('should not apply without agent benefit', () => {
      const result = sutra1372('कृष्णाति', {
        root: 'कृष्',
        hasSvarita: true,
        benefitsAgent: false
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('कर्त्रभिप्राय');
    });
    
    test('should not apply for other-benefit meaning', () => {
      const result = sutra1372('हन्ति', {
        root: 'हन्',
        hasNjit: true,
        meaning: 'works for others benefit'
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('agent benefit');
    });
    
    test('should not apply for neutral meaning', () => {
      const result = sutra1372('युनक्ति', {
        root: 'युज्',
        hasSvarita: true,
        meaning: 'simply joins things together'
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('कर्त्रभिप्राय');
    });
  });
  
  describe('Edge Cases', () => {
    test('should handle IAST script detection', () => {
      const result = sutra1372('haňte', {
        root: 'हन्',
        hasNjit: true,
        benefitsAgent: true
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });
    
    test('should handle mixed script input', () => {
      const result = sutra1372('कृष्णाति', {
        root: 'kṛṣ', // IAST root with Devanagari word
        hasSvarita: true,
        benefitsAgent: true
      });
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
    });
    
    test('should maintain high confidence for valid cases', () => {
      const result = sutra1372('वृधते', {
        root: 'वृध्',
        hasSvarita: true,
        benefitsAgent: true
      });
      expect(result.confidence).toBeGreaterThan(0.9);
    });
    
    test('should handle complex agent benefit expressions', () => {
      const result = sutra1372('भुनक्ति', {
        root: 'भुज्',
        hasSvarita: true,
        meaning: 'enjoys food for self benefit and satisfaction'
      });
      expect(result.applies).toBe(true);
      expect(result.detectedAgentBenefit).toBe(true);
    });
  });
  
  describe('Known Root Recognition', () => {
    test('should recognize known स्वरित roots', () => {
      const roots = ['कृष्', 'वृध्', 'रुह्', 'युज्', 'भुज्'];
      
      roots.forEach(root => {
        const result = sutra1372('testword', {
          root: root,
          benefitsAgent: true
        });
        expect(result.applies).toBe(true);
        expect(result.detectedAccentType).toBe('svarita');
      });
    });
    
    test('should recognize known ञित् roots', () => {
      const roots = ['हन्', 'तन्', 'वन्', 'मन्', 'जन्'];
      
      roots.forEach(root => {
        const result = sutra1372('testword', {
          root: root,
          benefitsAgent: true
        });
        expect(result.applies).toBe(true);
        expect(result.detectedAccentType).toBe('njit');
      });
    });
  });
  
  describe('Return Value Structure', () => {
    test('should return complete analysis object', () => {
      const result = sutra1372('कृष्णाति', {
        root: 'कृष्',
        hasSvarita: true,
        benefitsAgent: true
      });
      
      expect(result).toHaveProperty('applies');
      expect(result).toHaveProperty('isAtmanepada');
      expect(result).toHaveProperty('reason');
      expect(result).toHaveProperty('sutra');
      expect(result).toHaveProperty('confidence');
      expect(result).toHaveProperty('detectedAccentType');
      expect(result).toHaveProperty('accentMarking');
      expect(result.sutra).toBe('1.3.72');
    });
    
    test('should provide detection details', () => {
      const result = sutra1372('हन्ति', {
        root: 'हन्',
        hasNjit: true,
        meaning: 'kills for own benefit'
      });
      
      expect(result).toHaveProperty('detectedRoot');
      expect(result).toHaveProperty('detectedAccentType');
      expect(result).toHaveProperty('detectedAgentBenefit');
      expect(result).toHaveProperty('accentMarking');
    });
  });
  
  describe('Error Handling', () => {
    test('should handle analysis errors gracefully', () => {
      const result = sutra1372('invalid-sanskrit', {
        root: 'कृष्',
        hasSvarita: true,
        benefitsAgent: true
      });
      
      expect(result).toHaveProperty('applies');
      expect(result).toHaveProperty('reason');
      expect(result).toHaveProperty('confidence');
    });
  });
});
