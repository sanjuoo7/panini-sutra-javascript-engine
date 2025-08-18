import { identifySubstrateAdhikarana } from './index.js';

describe('Sutra 1.4.40: आधारोऽधिकरणम्', () => {
  test('should identify locative case for substrate', () => {
    const result = identifySubstrateAdhikarana('भूमौ', { 
      verb: 'तिष्ठति', 
      context: 'भूमौ तिष्ठति',
      spatial_relationship: 'substrate' 
    });
    expect(result.applies).toBe(true);
    expect(result.karaka).toBe('अधिकरण');
    expect(result.morphologicalAnalysis.expectedCase).toBe('locative');
  });

  test('should handle foundational support contexts', () => {
    const result = identifySubstrateAdhikarana('आकाशे', { 
      verb: 'पतति', 
      context: 'आकाशे पतति',
      foundation_type: 'spatial' 
    });
    expect(result.applies).toBe(true);
  });

  test('should handle temporal substrates', () => {
    const result = identifySubstrateAdhikarana('काले', { 
      verb: 'भवति', 
      context: 'शुभकाले भवति',
      temporal_aspect: true,
      spatial_relationship: 'substrate'
    });
    expect(result.applies).toBe(true);
  });

  test('should handle IAST input', () => {
    const result = identifySubstrateAdhikarana('bhūmau', { 
      verb: 'tiṣṭhati', 
      context: 'bhūmau tiṣṭhati',
      spatial_relationship: 'substrate',
      script: 'IAST' 
    });
    expect(result.applies).toBe(true);
  });

  test('should validate substrate role', () => {
    const result = identifySubstrateAdhikarana('गृहम्', { 
      verb: 'करोति', // object, not substrate
      element_role: 'object' 
    });
    expect(result.applies).toBe(false);
  });

  test('should handle invalid input gracefully', () => {
    const result = identifySubstrateAdhikarana('', {});
    expect(result.applies).toBe(false);
    expect(result.error).toBeDefined();
  });
});
