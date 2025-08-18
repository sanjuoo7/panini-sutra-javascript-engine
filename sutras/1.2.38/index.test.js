/**
 * Test Suite for Sutra 1.2.38: देवब्रह्मणोरनुदात्तः
 * Deva and Brāhmaṇa: Anudātta
 * 
 * Tests lexical anudātta overrides for 'deva' and 'brāhmaṇa' words 
 * in Subrahmaṇyā hymn contexts.
 */

import { sutra1238, identifyTargetWords, convertWordToAnudatta, detectSubrahmanyaMarkers } from './index.js';

describe('1.2.38 देवब्रह्मणोरनुदात्तः (Lexical Anudātta Overrides) - Comprehensive Tests', () => {
  
  describe('Basic Functionality', () => {
    test('should handle Subrahmaṇyā context with deva word', () => {
      const result = sutra1238('deva', { subrahmanya: true });
      expect(result.sutra).toBe('1.2.38');
      expect(result.hasOverrides).toBe(true);
      expect(result.primaryDecision).toBe('lexical-overrides');
    });

    test('should reject invalid input types', () => {
      const result = sutra1238(null, { subrahmanya: true });
      expect(result.error).toContain('Invalid input');
      expect(result.hasOverrides).toBe(false);
    });

    test('should handle empty input gracefully', () => {
      const result = sutra1238('', { subrahmanya: true });
      expect(result.hasOverrides).toBe(false);
      expect(result.primaryDecision).toBe('invalid-input');
    });
  });

  describe('Domain Detection', () => {
    test('should detect explicit Subrahmaṇyā context', () => {
      const result = sutra1238('deva', { subrahmanya: true });
      expect(result.analysis.phases.domainDetection.isSubrahmanyaContext).toBe(true);
      expect(result.analysis.phases.domainDetection.contextStrength).toBe('explicit');
    });

    test('should detect alternative Subrahmaṇyā context spellings', () => {
      const contexts = [
        { subrahmaṇyā: true },
        { subrahmaṇya: true },
        { skanda: true },
        { karttikeya: true }
      ];
      
      contexts.forEach(context => {
        const result = sutra1238('deva', context);
        expect(result.analysis.phases.domainDetection.isSubrahmanyaContext).toBe(true);
      });
    });

    test('should detect textual Subrahmaṇyā markers', () => {
      const texts = [
        'skanda deva',
        'kārttikeya brāhmaṇa',
        'subrahmāṇya context'
      ];
      
      texts.forEach(text => {
        const result = sutra1238(text, {});
        const markers = result.analysis.phases.domainDetection.domainIndicators;
        expect(markers.length).toBeGreaterThan(0);
      });
    });

    test('should detect Devanagari Subrahmaṇyā markers', () => {
      const result = sutra1238('स्कन्द देव', {});
      const markers = result.analysis.phases.domainDetection.domainIndicators;
      expect(markers).toContain('sanskrit-deity-reference');
    });

    test('should handle non-Subrahmaṇyā context', () => {
      const result = sutra1238('deva', {});
      expect(result.analysis.phases.domainDetection.isSubrahmanyaContext).toBe(false);
      expect(result.analysis.phases.domainDetection.contextStrength).toBe('none');
    });
  });

  describe('Lexical Analysis', () => {
    test('should identify deva words', () => {
      const result = sutra1238('deva', { subrahmanya: true });
      expect(result.analysis.phases.lexicalAnalysis.hasTargetWords).toBe(true);
      expect(result.analysis.phases.lexicalAnalysis.targetWordCount).toBe(1);
      
      const targetWord = result.analysis.phases.lexicalAnalysis.targetWords[0];
      expect(targetWord.wordType).toBe('deva');
      expect(targetWord.baseForm).toBe('deva');
    });

    test('should identify brāhmaṇa words', () => {
      const result = sutra1238('brāhmaṇa', { subrahmanya: true });
      expect(result.analysis.phases.lexicalAnalysis.hasTargetWords).toBe(true);
      expect(result.analysis.phases.lexicalAnalysis.targetWordCount).toBe(1);
      
      const targetWord = result.analysis.phases.lexicalAnalysis.targetWords[0];
      expect(targetWord.wordType).toBe('brāhmaṇa');
      expect(targetWord.baseForm).toBe('brāhmaṇa');
    });

    test('should identify multiple target words', () => {
      const result = sutra1238('deva brāhmaṇa', { subrahmanya: true });
      expect(result.analysis.phases.lexicalAnalysis.hasTargetWords).toBe(true);
      expect(result.analysis.phases.lexicalAnalysis.targetWordCount).toBe(2);
    });

    test('should handle text without target words', () => {
      const result = sutra1238('agni soma', { subrahmanya: true });
      expect(result.analysis.phases.lexicalAnalysis.hasTargetWords).toBe(false);
      expect(result.analysis.phases.lexicalAnalysis.targetWordCount).toBe(0);
    });

    test('should provide word position information', () => {
      const result = sutra1238('agni deva soma', { subrahmanya: true });
      const positions = result.analysis.phases.lexicalAnalysis.wordPositions;
      expect(positions).toHaveLength(1);
      expect(positions[0].word).toBe('deva');
      expect(positions[0].startPos).toBe(5);
    });
  });

  describe('Anudātta Override Analysis', () => {
    test('should identify words requiring anudātta override', () => {
      const result = sutra1238('deva', { subrahmanya: true });
      expect(result.analysis.phases.anudattaOverride.overridesRequired).toBe(true);
      expect(result.analysis.phases.anudattaOverride.overrideCount).toBe(1);
    });

    test('should create override mapping', () => {
      const result = sutra1238('deva', { subrahmanya: true });
      const overrides = result.analysis.phases.anudattaOverride.overrides;
      expect(overrides).toHaveLength(1);
      
      const override = overrides[0];
      expect(override.wordType).toBe('deva');
      expect(override.baseForm).toBe('deva');
    });

    test('should handle text with no overrides needed', () => {
      const result = sutra1238('agni', { subrahmanya: true });
      expect(result.analysis.phases.anudattaOverride.overridesRequired).toBe(false);
      expect(result.analysis.phases.anudattaOverride.overrideCount).toBe(0);
    });

    test('should track affected words', () => {
      const result = sutra1238('deva brāhmaṇa', { subrahmanya: true });
      const affectedWords = result.analysis.phases.anudattaOverride.affectedWords;
      expect(affectedWords).toContain('deva');
      expect(affectedWords).toContain('brāhmaṇa');
    });
  });

  describe('Lexical Overrides Application', () => {
    test('should not apply overrides outside Subrahmaṇyā context', () => {
      const result = sutra1238('deva', {});
      expect(result.hasOverrides).toBe(false);
      expect(result.adjustedText).toBe('deva');
    });

    test('should apply anudātta to deva in Subrahmaṇyā context', () => {
      const result = sutra1238('deva', { subrahmanya: true });
      expect(result.hasOverrides).toBe(true);
      expect(result.adjustedText).toMatch(/[àèìòù]/); // Should contain anudātta marks
    });

    test('should apply anudātta to brāhmaṇa in Subrahmaṇyā context', () => {
      const result = sutra1238('brāhmaṇa', { subrahmanya: true });
      expect(result.hasOverrides).toBe(true);
      expect(result.adjustedText).toMatch(/[àèìòù]/); // Should contain anudātta marks
    });

    test('should handle multiple word overrides', () => {
      const result = sutra1238('deva brāhmaṇa', { subrahmanya: true });
      expect(result.hasOverrides).toBe(true);
      expect(result.overrides).toHaveLength(2);
    });

    test('should preserve non-target words during override', () => {
      const result = sutra1238('agni deva soma', { subrahmanya: true });
      expect(result.adjustedText).toContain('agni');
      expect(result.adjustedText).toContain('soma');
    });

    test('should track override details', () => {
      const result = sutra1238('deva', { subrahmanya: true });
      const override = result.overrides[0];
      expect(override.original).toBe('deva');
      expect(override.overrideType).toBe('lexical-anudatta');
      expect(override.rule).toBe('1.2.38');
    });
  });

  describe('Prosody Rules Generation', () => {
    test('should generate lexical override rule for Subrahmaṇyā context', () => {
      const result = sutra1238('deva', { subrahmanya: true });
      const rules = result.prosodyRules;
      
      const lexicalRule = rules.find(r => r.type === 'lexical-override');
      expect(lexicalRule).toBeDefined();
      expect(lexicalRule.rule).toBe('deva-brahmana-anudatta');
      expect(lexicalRule.mandatory).toBe(true);
    });

    test('should generate accent consistency rule', () => {
      const result = sutra1238('deva', { subrahmanya: true });
      const rules = result.prosodyRules;
      
      const consistencyRule = rules.find(r => r.type === 'accent-consistency');
      expect(consistencyRule).toBeDefined();
      expect(consistencyRule.rule).toBe('maintain-anudatta');
    });

    test('should not generate special rules for non-Subrahmaṇyā context', () => {
      const result = sutra1238('deva', {});
      expect(result.prosodyRules).toHaveLength(0);
    });
  });

  describe('Prosody Options', () => {
    test('should provide Subrahmaṇyā-appropriate options', () => {
      const result = sutra1238('deva', { subrahmanya: true });
      const options = result.options;
      
      const lexicalOption = options.find(o => o.mode === 'lexical-anudatta');
      expect(lexicalOption).toBeDefined();
      expect(lexicalOption.confidence).toBeGreaterThan(0.9);
    });

    test('should include Subrahmaṇyā prosody option', () => {
      const result = sutra1238('agni', { subrahmanya: true });
      const options = result.options;
      
      const prosodyOption = options.find(o => o.mode === 'subrahmaṇya-prosody');
      expect(prosodyOption).toBeDefined();
    });

    test('should provide standard options for non-Subrahmaṇyā context', () => {
      const result = sutra1238('deva', {});
      const options = result.options;
      
      const standardOption = options.find(o => o.mode === 'standard-prosody');
      expect(standardOption).toBeDefined();
    });
  });

  describe('Recommendations', () => {
    test('should recommend lexical anudātta in Subrahmaṇyā context', () => {
      const result = sutra1238('deva', { subrahmanya: true });
      expect(result.recommendations).toContain('Apply lexical anudātta to deva and brāhmaṇa words');
    });

    test('should recommend accent consistency', () => {
      const result = sutra1238('deva', { subrahmanya: true });
      expect(result.recommendations).toContain('Maintain consistent anudātta accent throughout target words');
    });

    test('should recommend specialized recitation', () => {
      const result = sutra1238('deva', { subrahmanya: true });
      expect(result.recommendations).toContain('Use specialized Subrahmaṇyā recitation prosody');
    });

    test('should recommend standard prosody for non-target words', () => {
      const result = sutra1238('agni', { subrahmanya: true });
      expect(result.recommendations).toContain('Standard prosody recitation');
    });

    test('should recommend standard accent for non-Subrahmaṇyā context', () => {
      const result = sutra1238('deva', {});
      expect(result.recommendations).toContain('Standard accent recitation for deva/brāhmaṇa outside Subrahmaṇyā context');
    });
  });

  describe('Confidence Scoring', () => {
    test('should have high confidence for explicit Subrahmaṇyā context with target words', () => {
      const result = sutra1238('deva', { subrahmanya: true });
      expect(result.confidence).toBeGreaterThan(0.9);
    });

    test('should increase confidence with multiple domain indicators', () => {
      const result = sutra1238('skanda deva kārttikeya', { subrahmanya: true });
      expect(result.confidence).toBeGreaterThan(0.95);
    });

    test('should have moderate confidence for non-explicit context', () => {
      const result = sutra1238('deva', {});
      expect(result.confidence).toBeLessThan(0.8);
    });

    test('should have confidence bounded between 0 and 1', () => {
      const result = sutra1238('deva brāhmaṇa skanda', { subrahmanya: true });
      expect(result.confidence).toBeGreaterThanOrEqual(0);
      expect(result.confidence).toBeLessThanOrEqual(1);
    });
  });

  describe('Traditional Commentary', () => {
    test('should provide correct sutra text and meaning', () => {
      const result = sutra1238('deva', { subrahmanya: true });
      expect(result.traditionalCommentary.sutraText).toBe('देवब्रह्मणोरनुदात्तः');
      expect(result.traditionalCommentary.meaning).toBe('Of deva and brāhmaṇa: anudātta');
    });

    test('should provide interpretation for Subrahmaṇyā context', () => {
      const result = sutra1238('deva', { subrahmanya: true });
      expect(result.traditionalCommentary.interpretation).toContain('Subrahmaṇyā hymn contexts');
      expect(result.traditionalCommentary.interpretation).toContain('lexical accent modification');
    });

    test('should provide interpretation for non-Subrahmaṇyā context', () => {
      const result = sutra1238('deva', {});
      expect(result.traditionalCommentary.interpretation).toContain('Outside Subrahmaṇyā contexts');
      expect(result.traditionalCommentary.interpretation).toContain('standard accentual patterns');
    });

    test('should provide scholastic notes for target words', () => {
      const result = sutra1238('deva brāhmaṇa', { subrahmanya: true });
      expect(result.traditionalCommentary.scholasticNotes).toContain('Target words identified: deva, brāhmaṇa');
      expect(result.traditionalCommentary.scholasticNotes).toContain('Lexical anudātta overrides applied');
    });

    test('should include practical application guidance', () => {
      const result = sutra1238('deva', { subrahmanya: true });
      expect(result.traditionalCommentary.practicalApplication).toContain('reverent recitation');
      expect(result.traditionalCommentary.practicalApplication).toContain('acoustic humility');
    });
  });

  describe('Script Support', () => {
    test('should handle IAST input correctly', () => {
      const result = sutra1238('deva brāhmaṇa', { subrahmanya: true });
      expect(result.script).toBe('IAST');
      expect(result.hasOverrides).toBe(true);
    });

    test('should handle Devanagari input correctly', () => {
      const result = sutra1238('देव ब्राह्मण', { subrahmanya: true });
      expect(result.script).toBe('Devanagari');
      expect(result.hasOverrides).toBe(true);
    });

    test('should maintain override accuracy across scripts', () => {
      const iastResult = sutra1238('deva', { subrahmanya: true });
      const devaResult = sutra1238('देव', { subrahmanya: true });
      
      expect(iastResult.hasOverrides).toBe(true);
      expect(devaResult.hasOverrides).toBe(true);
    });
  });

  describe('Technical Notes', () => {
    test('should include domain analysis notes', () => {
      const result = sutra1238('deva', { subrahmanya: true });
      const notes = result.analysis.technicalNotes;
      expect(notes.some(note => note.includes('Domain Analysis'))).toBe(true);
    });

    test('should include lexical analysis notes', () => {
      const result = sutra1238('deva', { subrahmanya: true });
      const notes = result.analysis.technicalNotes;
      expect(notes.some(note => note.includes('Lexical Targets'))).toBe(true);
    });

    test('should include override analysis notes', () => {
      const result = sutra1238('deva', { subrahmanya: true });
      const notes = result.analysis.technicalNotes;
      expect(notes.some(note => note.includes('Anudātta Overrides'))).toBe(true);
    });

    test('should include application notes when overrides applied', () => {
      const result = sutra1238('deva', { subrahmanya: true });
      const notes = result.analysis.technicalNotes;
      expect(notes.some(note => note.includes('Applied lexical anudātta overrides'))).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    test('should handle text with only non-target words', () => {
      const result = sutra1238('agni soma', { subrahmanya: true });
      expect(result.hasOverrides).toBe(false);
      expect(result.adjustedText).toBe('agni soma');
    });

    test('should handle mixed script input', () => {
      const result = sutra1238('deva देव', { subrahmanya: true });
      expect(result.hasOverrides).toBe(true);
      expect(result.analysis.phases.lexicalAnalysis.targetWordCount).toBeGreaterThan(0);
    });

    test('should handle deva/brāhmaṇa word variants', () => {
      const variants = ['devatā', 'devasya', 'brahmaṇa'];
      
      variants.forEach(variant => {
        const result = sutra1238(variant, { subrahmanya: true });
        expect(result.hasOverrides).toBe(true);
      });
    });

    test('should handle very long texts with multiple target words', () => {
      const longText = 'agni deva soma brāhmaṇa vayu devatā';
      const result = sutra1238(longText, { subrahmanya: true });
      expect(result.hasOverrides).toBe(true);
      expect(result.analysis.phases.lexicalAnalysis.targetWordCount).toBeGreaterThan(1);
    });

    test('should handle multiple context indicators', () => {
      const result = sutra1238('deva', { 
        subrahmanya: true, 
        skanda: true, 
        vedic_hymn: true 
      });
      expect(result.confidence).toBeGreaterThan(0.95);
    });
  });

  describe('Helper Functions', () => {
    test('identifyTargetWords should find deva words', () => {
      const words = identifyTargetWords('deva devatā', 'IAST');
      expect(words).toHaveLength(2);
      expect(words[0].wordType).toBe('deva');
    });

    test('convertWordToAnudatta should apply anudātta accents', () => {
      const converted = convertWordToAnudatta('deva', 'IAST');
      expect(converted).toMatch(/[àèìòù]/);
    });

    test('detectSubrahmanyaMarkers should identify textual markers', () => {
      const markers = detectSubrahmanyaMarkers('skanda deva kārttikeya');
      expect(markers.length).toBeGreaterThan(0);
      expect(markers).toContain('iast-deity-reference');
    });
  });
});
