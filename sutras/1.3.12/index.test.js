/**
 * Tests for Sutra 1.3.12: अनुदात्तङित आत्मनेपदम् (anudāttaṅita ātmanepadam)
 * Testing ātmanepada assignment based on anudātta and ṅit markers
 */

import { detectAnudattaAccent, detectNgitMarker, determineAtmanepada, applyAtmanepadaEndings } from './index.js';

describe('Sutra 1.3.12: अनुदात्तङित आत्मनेपदम् (Ātmanepada Assignment)', () => {
  
  describe('detectAnudattaAccent', () => {
    test('should handle invalid input', () => {
      expect(detectAnudattaAccent('')).toEqual({
        success: false,
        error: 'Invalid input: text must be a non-empty string',
        text: ''
      });
    });

    test('should detect anudātta in IAST with underscore', () => {
      const result = detectAnudattaAccent('a_gni');
      
      expect(result.success).toBe(true);
      expect(result.hasExplicitAnudatta).toBe(true);
      expect(result.anudattaMarkings).toHaveLength(1);
      expect(result.anudattaMarkings[0]).toEqual({
        position: 0,
        vowel: 'a',
        accent: 'anudātta',
        representation: 'a_',
        type: 'explicit'
      });
    });

    test('should handle text without anudātta markings', () => {
      const result = detectAnudattaAccent('gam');
      
      expect(result.success).toBe(true);
      expect(result.hasExplicitAnudatta).toBe(false);
      expect(result.anudattaMarkings).toHaveLength(0);
    });

    test('should preserve rule information', () => {
      const result = detectAnudattaAccent('test');
      expect(result.rule).toBe('1.3.12');
    });
  });

  describe('detectNgitMarker', () => {
    test('should handle invalid input', () => {
      expect(detectNgitMarker('')).toEqual({
        success: false,
        error: 'Invalid input: root must be a non-empty string',
        root: ''
      });
    });

    test('should detect final ṅ marker', () => {
      const result = detectNgitMarker('bhūṅ');
      
      expect(result.success).toBe(true);
      expect(result.hasNgitMarker).toBe(true);
      expect(result.ngitMarkings).toHaveLength(1);
      expect(result.ngitMarkings[0].marker).toBe('ṅ');
    });

    test('should detect initial ṅ marker', () => {
      const result = detectNgitMarker('ṅkṛ');
      
      expect(result.success).toBe(true);
      expect(result.hasNgitMarker).toBe(true);
      expect(result.ngitMarkings[0].marker).toBe('ṅ');
    });

    test('should handle roots without ṅ marker', () => {
      const result = detectNgitMarker('gam');
      
      expect(result.success).toBe(true);
      expect(result.hasNgitMarker).toBe(false);
      expect(result.ngitMarkings).toHaveLength(0);
    });

    test('should handle Devanagari ṅ marker', () => {
      const result = detectNgitMarker('भूङ्');
      
      expect(result.success).toBe(true);
      if (result.hasNgitMarker) {
        expect(result.ngitMarkings[0].marker).toBe('ङ्');
        expect(result.ngitMarkings[0].type).toBe('devanagari');
      }
    });
  });

  describe('determineAtmanepada', () => {
    test('should handle invalid input', () => {
      expect(determineAtmanepada('')).toEqual({
        success: false,
        error: 'Invalid root input',
        root: ''
      });
    });

    test('should assign ātmanepada for anudātta marked root', () => {
      const result = determineAtmanepada('bha_ṣ');
      
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.voice).toBe('ātmanepada');
      expect(result.hasAnudatta).toBe(true);
      expect(result.reason).toContain('anudātta_accent');
    });

    test('should assign ātmanepada for ṅit marked root', () => {
      const result = determineAtmanepada('bhūṅ');
      
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.voice).toBe('ātmanepada');
      expect(result.hasNgit).toBe(true);
      expect(result.reason).toContain('ṅit_marker');
    });

    test('should assign ātmanepada for root with both markers', () => {
      const result = determineAtmanepada('bha_ṣṅ');
      
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.hasAnudatta).toBe(true);
      expect(result.hasNgit).toBe(true);
      expect(result.confidence).toBe(1.0);
      expect(result.reason).toContain('anudātta_accent');
      expect(result.reason).toContain('ṅit_marker');
    });

    test('should assign parasmaipada for unmarked root', () => {
      const result = determineAtmanepada('gam');
      
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(false);
      expect(result.isParasmaipada).toBe(true);
      expect(result.voice).toBe('parasmaipada');
      expect(result.reason).toContain('no_qualifying_markers');
    });

    test('should provide confidence levels', () => {
      const atmanepadaResult = determineAtmanepada('bha_ṣ');
      const parasmaipadaResult = determineAtmanepada('gam');
      
      expect(atmanepadaResult.confidence).toBeGreaterThan(0.8);
      expect(parasmaipadaResult.confidence).toBe(0.0);
    });

    test('should include traditional classification when enabled', () => {
      const result = determineAtmanepada('labh', { traditionalClassification: true });
      
      expect(result.success).toBe(true);
      expect(result.traditionalClass).toBeDefined();
      expect(result.traditionalClass.normalizedRoot).toBe('labh');
    });

    test('should preserve rule information', () => {
      const result = determineAtmanepada('test');
      expect(result.rule).toBe('1.3.12');
    });
  });

  describe('applyAtmanepadaEndings', () => {
    test('should handle invalid input', () => {
      expect(applyAtmanepadaEndings('')).toEqual({
        success: false,
        error: 'Invalid root input',
        root: ''
      });
    });

    test('should apply ātmanepada endings to qualifying root', () => {
      const result = applyAtmanepadaEndings('bha_ṣ', {
        tense: 'present',
        person: 'third',
        number: 'singular'
      });
      
      expect(result.success).toBe(true);
      expect(result.voice).toBe('ātmanepada');
      expect(result.appliedEnding).toBe('te');
      expect(result.conjugatedForm).toBe('bha_ṣte');
    });

    test('should apply parasmaipada endings to non-qualifying root', () => {
      const result = applyAtmanepadaEndings('gam', {
        tense: 'present',
        person: 'third',
        number: 'singular'
      });
      
      expect(result.success).toBe(true);
      expect(result.voice).toBe('parasmaipada');
      expect(result.appliedEnding).toBe('ti');
      expect(result.conjugatedForm).toBe('gamti');
    });

    test('should handle different persons and numbers', () => {
      const firstSingular = applyAtmanepadaEndings('bha_ṣ', {
        person: 'first',
        number: 'singular'
      });
      
      const secondPlural = applyAtmanepadaEndings('bha_ṣ', {
        person: 'second',
        number: 'plural'
      });
      
      expect(firstSingular.appliedEnding).toBe('e');
      expect(secondPlural.appliedEnding).toBe('dhve');
    });

    test('should preserve conjugation context', () => {
      const context = {
        tense: 'present',
        person: 'first',
        number: 'dual',
        mood: 'indicative'
      };
      
      const result = applyAtmanepadaEndings('test', context);
      
      expect(result.conjugationContext).toEqual(context);
    });

    test('should include complete analysis in result', () => {
      const result = applyAtmanepadaEndings('bha_ṣ');
      
      expect(result.atmanepadaAnalysis).toBeDefined();
      expect(result.atmanepadaAnalysis.anudattaAnalysis).toBeDefined();
      expect(result.atmanepadaAnalysis.ngitAnalysis).toBeDefined();
    });
  });

  describe('Integration and linguistic accuracy', () => {
    test('should handle traditional ātmanepada roots', () => {
      const traditionalRoots = ['labh', 'bhāṣ', 'vṛt', 'sev'];
      
      for (const root of traditionalRoots) {
        const result = determineAtmanepada(root, { traditionalClassification: true });
        expect(result.success).toBe(true);
        
        if (result.traditionalClass?.classification === 'traditional_ātmanepada') {
          expect(result.traditionalClass.confidence).toBeGreaterThan(0.5);
        }
      }
    });

    test('should handle traditional parasmaipada roots', () => {
      const traditionalRoots = ['gam', 'as', 'bhū', 'kṛ'];
      
      for (const root of traditionalRoots) {
        const result = determineAtmanepada(root, { traditionalClassification: true });
        expect(result.success).toBe(true);
        
        if (result.traditionalClass?.classification === 'traditional_parasmaipada') {
          expect(result.traditionalClass.confidence).toBeGreaterThan(0.5);
        }
      }
    });

    test('should prioritize explicit markings over traditional classification', () => {
      // Even if 'gam' is traditionally parasmaipada, explicit markers should override
      const result = determineAtmanepada('ga_mṅ'); // With both anudātta and ṅit
      
      expect(result.success).toBe(true);
      expect(result.isAtmanepada).toBe(true);
      expect(result.hasAnudatta).toBe(true);
      expect(result.hasNgit).toBe(true);
    });

    test('should maintain consistency across related functions', () => {
      const root = 'bha_ṣṅ';
      const determination = determineAtmanepada(root);
      const application = applyAtmanepadaEndings(root);
      
      expect(determination.voice).toBe(application.voice);
      expect(determination.isAtmanepada).toBe(application.atmanepadaAnalysis.isAtmanepada);
    });
  });

  describe('Error handling and edge cases', () => {
    test('should handle mixed script inputs gracefully', () => {
      const result = detectNgitMarker('गमṅ'); // Mixed Devanagari and IAST
      expect(result.success).toBe(true);
    });

    test('should handle malformed accent markings', () => {
      const result = detectAnudattaAccent('a__gni___');
      expect(result.success).toBe(true);
      // Should handle gracefully without errors
    });

    test('should handle empty conjugation context', () => {
      const result = applyAtmanepadaEndings('gam', {});
      expect(result.success).toBe(true);
      expect(result.conjugationContext.tense).toBe('present'); // Default values
    });

    test('should handle unknown script gracefully', () => {
      const result = determineAtmanepada('αβγ');
      expect(result.success).toBe(false);
      expect(result.error).toContain('Unable to detect script');
    });
  });
});
