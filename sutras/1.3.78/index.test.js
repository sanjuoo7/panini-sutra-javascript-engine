/**
 * Test Suite for Sutra 1.3.78: शेषात् कर्तरि परस्मैपदम् (śeṣāt kartari parasmaipada)
 * Tests the implementation of default Parasmaipada for remaining verbs
 */

import { sutra1378, checkDefaultParasmaipada } from './index.js';

describe('Sutra 1.3.78: शेषात् कर्तरि परस्मैपदम् (Default Parasmaipada)', () => {
  
  describe('Basic Functionality', () => {
    
    test('should apply for active voice verbs not covered by Ātmanepada rules', () => {
      const result = sutra1378('गच्छति', {
        isActiveVoice: true,
        hasAtmanepadaRule: false
      });
      
      expect(result.applies).toBe(true);
      expect(result.isParasmaipada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });
    
    test('should reject passive voice verbs', () => {
      const result = sutra1378('गम्यते', {
        isActiveVoice: false,
        hasAtmanepadaRule: false
      });
      
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('active voice');
    });
    
    test('should reject verbs covered by Ātmanepada rules', () => {
      const result = sutra1378('गच्छते', {
        isActiveVoice: true,
        hasAtmanepadaRule: true
      });
      
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Ātmanepada');
    });
    
  });
  
  describe('Voice Type Detection', () => {
    
    test('should handle explicit active voice', () => {
      const result = sutra1378('करोति', {
        voiceType: 'active'
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.isActiveVoice).toBe(true);
    });
    
    test('should handle explicit passive voice', () => {
      const result = sutra1378('क्रियते', {
        voiceType: 'passive'
      });
      
      expect(result.applies).toBe(false);
      expect(result.details.isActiveVoice).toBe(false);
    });
    
    test('should detect passive from meaning', () => {
      const result = sutra1378('गम्यते', {
        meaning: 'is gone to (passive construction)'
      });
      
      expect(result.applies).toBe(false);
      expect(result.details.isActiveVoice).toBe(false);
    });
    
  });
  
  describe('Parasmaipada Ending Recognition', () => {
    
    test('should recognize ति ending', () => {
      const result = sutra1378('गच्छति');
      
      expect(result.applies).toBe(true);
      expect(result.details.hasParasmaipadaEnding).toBe(true);
    });
    
    test('should recognize न्ति ending', () => {
      const result = sutra1378('गच्छन्ति');
      
      expect(result.applies).toBe(true);
      expect(result.details.hasParasmaipadaEnding).toBe(true);
    });
    
    test('should recognize मि ending', () => {
      const result = sutra1378('करोमि');
      
      expect(result.applies).toBe(true);
      expect(result.details.hasParasmaipadaEnding).toBe(true);
    });
    
  });
  
  describe('IAST Script Support', () => {
    
    test('should handle IAST Parasmaipada forms', () => {
      const result = sutra1378('gacchati', {
        isActiveVoice: true,
        hasAtmanepadaRule: false
      });
      
      expect(result.applies).toBe(true);
      expect(result.details.detectedScript).toBe('IAST');
    });
    
    test('should recognize IAST endings', () => {
      const result = sutra1378('karoti');
      
      expect(result.applies).toBe(true);
      expect(result.details.hasParasmaipadaEnding).toBe(true);
    });
    
    test('should recognize nti ending in IAST', () => {
      const result = sutra1378('gacchanti');
      
      expect(result.applies).toBe(true);
      expect(result.details.hasParasmaipadaEnding).toBe(true);
    });
    
  });
  
  describe('Ātmanepada Exclusion Detection', () => {
    
    test('should detect agent benefit patterns', () => {
      const result = sutra1378('करोति', {
        meaning: 'does for agent benefit'
      });
      
      expect(result.applies).toBe(false);
      expect(result.details.isRemainder).toBe(false);
    });
    
    test('should detect स्वार्थ pattern', () => {
      const result = sutra1378('गच्छति', {
        meaning: 'स्वार्थ में जाना'
      });
      
      expect(result.applies).toBe(false);
      expect(result.details.isRemainder).toBe(false);
    });
    
    test('should detect कर्त्रभिप्राय pattern', () => {
      const result = sutra1378('करोति', {
        meaning: 'कर्त्रभिप्राय से करना'
      });
      
      expect(result.applies).toBe(false);
      expect(result.details.isRemainder).toBe(false);
    });
    
    test('should detect reciprocal meaning', () => {
      const result = sutra1378('युध्यति', {
        meaning: 'fights reciprocally'
      });
      
      expect(result.applies).toBe(false);
      expect(result.details.isRemainder).toBe(false);
    });
    
  });
  
  describe('Default Behavior', () => {
    
    test('should apply by default for regular verbs', () => {
      const result = sutra1378('पठति');
      
      expect(result.applies).toBe(true);
      expect(result.details.isActiveVoice).toBe(true);
      expect(result.details.isRemainder).toBe(true);
    });
    
    test('should apply for simple verb forms', () => {
      const result = sutra1378('भवति');
      
      expect(result.applies).toBe(true);
      expect(result.isParasmaipada).toBe(true);
    });
    
    test('should apply for compound verbs without special rules', () => {
      const result = sutra1378('आगच्छति');
      
      expect(result.applies).toBe(true);
      expect(result.details.isRemainder).toBe(true);
    });
    
  });
  
  describe('Confidence Scoring', () => {
    
    test('should have high confidence for default rule', () => {
      const result = sutra1378('गच्छति');
      
      expect(result.confidence).toBeGreaterThan(0.8);
    });
    
    test('should have zero confidence for excluded cases', () => {
      const result = sutra1378('गम्यते', {
        voiceType: 'passive'
      });
      
      expect(result.confidence).toBe(0);
    });
    
  });
  
  describe('Edge Cases', () => {
    
    test('should handle missing context gracefully', () => {
      const result = sutra1378('करोति');
      
      expect(result.applies).toBe(true); // Default behavior
      expect(result.details.isActiveVoice).toBe(true);
    });
    
    test('should handle ambiguous voice context', () => {
      const result = sutra1378('क्रियते'); // Could be passive
      
      expect(result.applies).toBe(true); // Still defaults to active unless explicitly stated
    });
    
  });
  
  describe('Input Validation', () => {
    
    test('should reject null input', () => {
      const result = sutra1378(null);
      
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });
    
    test('should reject empty string', () => {
      const result = sutra1378('');
      
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Invalid input');
    });
    
  });
  
  describe('Function Aliases', () => {
    
    test('should work with alternate export name', () => {
      const result = checkDefaultParasmaipada('गच्छति', {
        isActiveVoice: true,
        hasAtmanepadaRule: false
      });
      
      expect(result.applies).toBe(true);
      expect(result.sutra).toBe('1.3.78');
    });
    
  });
  
});
