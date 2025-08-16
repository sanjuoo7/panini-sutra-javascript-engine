/**
 * Test Suite for Sutra 1.3.24: उदोऽनूर्द्ध्वकर    test('should handle IAST context', () => {
      const result = determineUdSthaAtmanepada('word', {
        root: 'sthā',
        prefix: 'ud',
        meaning: 'non-rising'
      });
      expect(result.isUdSthaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });Tests ātmanepada assignment for स्था with उद् prefix (excluding rising meaning)
 */

import { determineUdSthaAtmanepada, checkUdSthaCombination } from './index.js';

describe('Sutra 1.3.24: उदोऽनूर्द्ध्वकर्मणि (udo\'nūrdhvakarmaṇi)', () => {

  describe('Valid उद् + स्था combinations', () => {
    test('should detect उत्तिष्ठते (uttiṣṭhate) as ātmanepada', () => {
      const result = determineUdSthaAtmanepada('उत्तिष्ठते');
      expect(result.isUdSthaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('उद्');
      expect(result.root).toBe('स्था');
    });

    test('should detect uttiṣṭhate (IAST) as ātmanepada', () => {
      const result = determineUdSthaAtmanepada('uttiṣṭhate');
      expect(result.isUdSthaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.prefix).toBe('ud');
    });

    test('should detect उत्स्थान (utsthāna) as ātmanepada context', () => {
      const result = determineUdSthaAtmanepada('उत्स्थान');
      expect(result.isUdSthaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.prefix).toBe('उद्');
    });

    test('should detect उत्स्थित (utsthita) as ātmanepada context', () => {
      const result = determineUdSthaAtmanepada('उत्स्थित');
      expect(result.isUdSthaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.prefix).toBe('उद्');
    });
  });

  describe('Context-based analysis', () => {
    test('should handle explicit root and prefix context', () => {
      const result = determineUdSthaAtmanepada('someform', {
        root: 'स्था',
        prefix: 'उद्'
      });
      expect(result.isUdSthaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('उद्');
    });

    test('should handle IAST context', () => {
      const result = determineUdSthaAtmanepada('someform', {
        root: 'sthā',
        prefix: 'ud'
      });
      expect(result.isUdSthaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should handle meaning context (non-rising)', () => {
      const result = determineUdSthaAtmanepada('उत्तिष्ठते', {
        meaning: 'to stand firm, to remain'
      });
      expect(result.isUdSthaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });
  });

  describe('Exclusion: अनूर्द्ध्वकर्मणि (non-rising meaning)', () => {
    test('should exclude rising meaning via context', () => {
      const result = determineUdSthaAtmanepada('उत्तिष्ठते', {
        root: 'स्था',
        prefix: 'उद्',
        meaning: 'to rise up, to get up'
      });
      expect(result.isUdSthaAtmanepada).toBe(false);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.exclusion).toBe('अनूर्द्ध्वकर्मणि');
    });

    test('should exclude when meaning indicates getting up', () => {
      const result = determineUdSthaAtmanepada('someform', {
        root: 'स्था',
        prefix: 'उद्',
        meaning: 'getting up from seat'
      });
      expect(result.isUdSthaAtmanepada).toBe(false);
      expect(result.exclusion).toBe('अनूर्द्ध्वकर्मणि');
    });

    test('should exclude when meaning indicates standing up', () => {
      const result = determineUdSthaAtmanepada('someform', {
        root: 'स्था',
        prefix: 'उद्',
        meaning: 'standing up, rising'
      });
      expect(result.isUdSthaAtmanepada).toBe(false);
      expect(result.exclusion).toBe('अनूर्द्ध्वकर्मणि');
    });

    test('should exclude उत्थान context', () => {
      const result = determineUdSthaAtmanepada('उत्थानार्थम्');
      expect(result.isUdSthaAtmanepada).toBe(false);
      expect(result.confidence).toBe(0.1);
    });
  });

  describe('Negative cases - should not apply', () => {
    test('should not detect स्था without उद् prefix', () => {
      const result = determineUdSthaAtmanepada('तिष्ठते');
      expect(result.isUdSthaAtmanepada).toBe(false);
    });

    test('should not detect उद् with other roots', () => {
      const result = determineUdSthaAtmanepada('उद्गच्छति');
      expect(result.isUdSthaAtmanepada).toBe(false);
    });

    test('should not detect other prefixes + स्था', () => {
      const result = determineUdSthaAtmanepada('प्रतिष्ठते');
      expect(result.isUdSthaAtmanepada).toBe(false);
    });

    test('should not detect अव + स्था', () => {
      const result = determineUdSthaAtmanepada('अवतिष्ठते');
      expect(result.isUdSthaAtmanepada).toBe(false);
    });

    test('should not detect simple स्था forms', () => {
      const result = determineUdSthaAtmanepada('स्थाने');
      expect(result.isUdSthaAtmanepada).toBe(false);
    });

    test('should not detect स्था with wrong context', () => {
      const result = determineUdSthaAtmanepada('तिष्ठति', {
        root: 'गम्',
        prefix: 'उद्'
      });
      expect(result.isUdSthaAtmanepada).toBe(false);
    });
  });

  describe('Error handling', () => {
    test('should handle null input', () => {
      const result = determineUdSthaAtmanepada(null);
      expect(result.isUdSthaAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle undefined input', () => {
      const result = determineUdSthaAtmanepada(undefined);
      expect(result.isUdSthaAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle empty string', () => {
      const result = determineUdSthaAtmanepada('');
      expect(result.isUdSthaAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle whitespace-only string', () => {
      const result = determineUdSthaAtmanepada('   ');
      expect(result.isUdSthaAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle non-string input', () => {
      const result = determineUdSthaAtmanepada(123);
      expect(result.isUdSthaAtmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle invalid Sanskrit words', () => {
      const result = determineUdSthaAtmanepada('xyz123');
      expect(result.isUdSthaAtmanepada).toBe(false);
      expect(result.confidence).toBe(0.1);
      expect(result.analysis).toBe('No उद् + स्था combination found');
    });
  });

  describe('Edge cases', () => {
    test('should handle mixed case input', () => {
      const result = determineUdSthaAtmanepada('UtTiShThaTe');
      expect(result.isUdSthaAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.7);
    });

    test('should handle extra whitespace', () => {
      const result = determineUdSthaAtmanepada('  उत्तिष्ठते  ');
      expect(result.isUdSthaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should handle variant स्था forms', () => {
      const result = determineUdSthaAtmanepada('उत्स्थाय');
      expect(result.isUdSthaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should handle compound words containing उद् + स्था', () => {
      const result = determineUdSthaAtmanepada('पुत्रोत्तिष्ठते');
      expect(result.isUdSthaAtmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.6);
    });

    test('should handle contextual ambiguity gracefully', () => {
      const result = determineUdSthaAtmanepada('उत्तिष्ठते', {
        meaning: 'unclear context'
      });
      expect(result.isUdSthaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });
  });

  describe('Semantic analysis', () => {
    test('should detect non-rising semantic context', () => {
      const result = determineUdSthaAtmanepada('उत्तिष्ठते');
      expect(result.isUdSthaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should handle स्थिति context', () => {
      const result = determineUdSthaAtmanepada('उत्स्थितिस्था');
      expect(result.isUdSthaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    test('should handle position context', () => {
      const result = determineUdSthaAtmanepada('उत्तिष्ठते', {
        meaning: 'position and place'
      });
      expect(result.isUdSthaAtmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });
  });

  describe('Helper function tests', () => {
    test('checkUdSthaCombination should work correctly', () => {
      expect(checkUdSthaCombination('उत्तिष्ठते')).toBe(true);
      expect(checkUdSthaCombination('तिष्ठते')).toBe(false);
      expect(checkUdSthaCombination('उद्गम्')).toBe(false);
    });
  });

  describe('Sutra metadata', () => {
    test('should include correct sutra reference', () => {
      const result = determineUdSthaAtmanepada('उत्तिष्ठते');
      expect(result.sutraApplied).toBe('1.3.24');
    });

    test('should include sutra reference even for negative cases', () => {
      const result = determineUdSthaAtmanepada('तिष्ठति');
      expect(result.sutraApplied).toBe('1.3.24');
    });

    test('should include exclusion flag for rising meaning', () => {
      const result = determineUdSthaAtmanepada('someform', {
        root: 'स्था',
        prefix: 'उद्',
        meaning: 'rising up'
      });
      expect(result.exclusion).toBe('अनूर्द्ध्वकर्मणि');
    });
  });
});
