/**
 * Test Suite for Sutra 1.3.77: विभाषोपपदेन प्रतीयमाने (vibhāṣopapadena pratīyamāne)
 * Tests the implementation of optional Ātmanepada with उपपद indication
 */

import { sutra1377, checkUpapadaAtmanepada } from './index.js';

describe('Sutra 1.3.77: विभाषोपपदेन प्रतीयमाने (Optional Ātmanepada with उपपद)', () => {
  
  describe('Basic Functionality', () => {
    
    test('should apply when उपपद indicates agent benefit', () => {
      const result = sutra1377('करोते', {
        upapada: 'स्वार्थ',
        hasUpapada: true,
        agentBenefitIndicated: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.details.isOptional).toBe(true);
    });
    
    test('should reject when no उपपद present', () => {
      const result = sutra1377('करोति', {
        hasUpapada: false
      });
      
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('उपपद');
    });
    
    test('should reject when उपपद does not indicate agent benefit', () => {
      const result = sutra1377('करोति', {
        upapada: 'परार्थ',
        hasUpapada: true,
        agentBenefitIndicated: false
      });
      
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('agent benefit');
    });
    
  });
  
  describe('Upapada Recognition', () => {
    
    test('should recognize स्व upapada', () => {
      const result = sutra1377('गच्छते', {
        upapada: 'स्व'
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.agentBenefitIndicated).toBe(true);
    });
    
    test('should recognize आत्मन् upapada', () => {
      const result = sutra1377('करोते', {
        upapada: 'आत्मन्'
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.hasUpapada).toBe(true);
    });
    
    test('should recognize निज upapada', () => {
      const result = sutra1377('भवते', {
        upapada: 'निज'
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.agentBenefitIndicated).toBe(true);
    });
    
  });
  
  describe('IAST Script Support', () => {
    
    test('should handle IAST upapada words', () => {
      const result = sutra1377('karoti', {
        upapada: 'sva'
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.detectedScript).toBe('IAST');
    });
    
    test('should recognize ātman in IAST', () => {
      const result = sutra1377('gacchate', {
        upapada: 'ātman'
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.agentBenefitIndicated).toBe(true);
    });
    
    test('should recognize svayaṃ in IAST', () => {
      const result = sutra1377('bhavate', {
        upapada: 'svayaṃ'
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.hasUpapada).toBe(true);
    });
    
  });
  
  describe('English Upapada Support', () => {
    
    test('should recognize "for oneself"', () => {
      const result = sutra1377('karoti', {
        upapada: 'for oneself'
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.agentBenefitIndicated).toBe(true);
    });
    
    test('should recognize "own" keyword', () => {
      const result = sutra1377('gacchati', {
        upapada: 'own benefit'
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.hasUpapada).toBe(true);
    });
    
    test('should recognize "personally"', () => {
      const result = sutra1377('bhavati', {
        upapada: 'personally'
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.agentBenefitIndicated).toBe(true);
    });
    
  });
  
  describe('Meaning-based Detection', () => {
    
    test('should detect agent benefit from meaning', () => {
      const result = sutra1377('करोति', {
        meaning: 'स्वार्थ के लिए करना'
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.hasUpapada).toBe(true);
      expect(result.details.agentBenefitIndicated).toBe(true);
    });
    
    test('should detect from English meaning', () => {
      const result = sutra1377('karoti', {
        meaning: 'does for own benefit'
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.hasUpapada).toBe(true);
    });
    
    test('should detect personal gain meaning', () => {
      const result = sutra1377('गच्छति', {
        meaning: 'goes for personal gain'
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.agentBenefitIndicated).toBe(true);
    });
    
  });
  
  describe('Complex Upapada Constructions', () => {
    
    test('should handle compound upapada', () => {
      const result = sutra1377('करोते', {
        upapada: 'स्वकीय लाभ'
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.agentBenefitIndicated).toBe(true);
    });
    
    test('should handle आत्मार्थ', () => {
      const result = sutra1377('गच्छते', {
        upapada: 'आत्मार्थ'
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.hasUpapada).toBe(true);
    });
    
    test('should handle स्वप्रयोजन', () => {
      const result = sutra1377('भवते', {
        upapada: 'स्वप्रयोजन'
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.agentBenefitIndicated).toBe(true);
    });
    
  });
  
  describe('Edge Cases', () => {
    
    test('should handle missing context gracefully', () => {
      const result = sutra1377('करोति');
      
      expect(result.applies).toBe(false);
      expect(result.confidence).toBe(0);
    });
    
    test('should handle empty upapada', () => {
      const result = sutra1377('करोति', {
        upapada: '',
        hasUpapada: false
      });
      
      expect(result.applies).toBe(false);
      expect(result.details.hasUpapada).toBe(false);
    });
    
  });
  
  describe('Confidence Scoring', () => {
    
    test('should have lower confidence due to optional nature', () => {
      const result = sutra1377('करोते', {
        upapada: 'स्वार्थ',
        agentBenefitIndicated: true
      });
      
      expect(result.confidence).toBeLessThan(0.9); // Less than mandatory rules
      expect(result.confidence).toBeGreaterThan(0.7); // But still confident when applicable
    });
    
  });
  
  describe('Input Validation', () => {
    
    test('should reject null input', () => {
      const result = sutra1377(null);
      
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });
    
    test('should reject empty string', () => {
      const result = sutra1377('');
      
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });
    
  });
  
  describe('Function Aliases', () => {
    
    test('should work with alternate export name', () => {
      const result = checkUpapadaAtmanepada('करोते', {
        upapada: 'स्वार्थ',
        agentBenefitIndicated: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.sutra).toBe('1.3.77');
    });
    
  });
  
});
