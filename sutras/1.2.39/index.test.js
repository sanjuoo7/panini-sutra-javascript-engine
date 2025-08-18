/**
 * Test Suite for Sutra 1.2.39: स्वरितात् संहितायामनुदात्तानाम्
 * From svarita: in saṃhitā, of anudātta vowels (monotone assimilation)
 */

import { describe, it, expect } from '@jest/globals';
import sutra1239, { 
  analyzeSandhiContext,
  analyzeAccentSequencing,
  analyzeAssimilationPatterns,
  detectSandhiMarkers,
  performMonotoneAssimilation
} from './index.js';

describe('Sutra 1.2.39: स्वरितात् संहितायामनुदात्तानाम्', () => {
  
  describe('Core sutra1239 function', () => {
    
    it('should handle basic svarita-anudātta sequence in sandhi context', () => {
      const text = 'vā̂ìti'; // svarita ā̂ followed by anudātta ì
      const context = { sandhi: true };
      const result = sutra1239(text, context);
      
      expect(result.sutra).toBe('1.2.39');
      expect(result.confidence).toBeGreaterThanOrEqual(0.8);
      expect(result.primaryDecision).toBe('monotone-assimilation');
      expect(result.hasAssimilation).toBe(true);
      expect(result.analysis.phases.sandhiDetection.hasSandhiContext).toBe(true);
      expect(result.analysis.phases.accentSequencing.hasSvaritaAnudattaPattern).toBe(true);
    });

    it('should not apply assimilation without sandhi context', () => {
      const text = 'vā̂ìti'; // svarita ā̂ followed by anudātta ì
      const context = {}; // no sandhi context
      const result = sutra1239(text, context);
      
      expect(result.primaryDecision).toBe('no-assimilation');
      expect(result.hasAssimilation).toBe(false);
      expect(result.analysis.phases.sandhiDetection.hasSandhiContext).toBe(false);
    });

    it('should handle multiple svarita-anudātta spans', () => {
      const text = 'sā̂dàkùm rā̂jàkùm'; // multiple svarita+anudātta sequences
      const context = { sandhi: true };
      const result = sutra1239(text, context);
      
      expect(result.hasAssimilation).toBe(true);
      expect(result.analysis.phases.accentSequencing.spanCount).toBeGreaterThan(1);
      expect(result.analysis.phases.assimilationAnalysis.patternType).toBe('multiple-spans');
    });

    it('should be blocked by Subrahmaṇyā domain restrictions', () => {
      const text = 'vā̂ìti'; 
      const context = { sandhi: true, subrahmanya: true };
      const result = sutra1239(text, context);
      
      expect(result.primaryDecision).toBe('no-assimilation');
      expect(result.hasAssimilation).toBe(false);
      expect(result.analysis.phases.domainRestriction.isBlocked).toBe(true);
      expect(result.analysis.phases.domainRestriction.blockingFactors).toContain('subrahmanya-domain');
    });

    it('should handle Devanagari script input', () => {
      const text = 'वाँति'; // Devanagari with svarita-anudātta pattern
      const context = { sandhi: true };
      const result = sutra1239(text, context);
      
      expect(result.script).toBe('Devanagari');
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    it('should handle empty or invalid input gracefully', () => {
      expect(() => sutra1239('')).not.toThrow();
      expect(() => sutra1239(null)).not.toThrow();
      expect(() => sutra1239(undefined)).not.toThrow();
      
      const emptyResult = sutra1239('');
      expect(emptyResult.confidence).toBe(0);
      expect(emptyResult.primaryDecision).toBe('invalid-input');
    });
  });

  describe('analyzeSandhiContext function', () => {
    
    it('should detect explicit sandhi context', () => {
      const text = 'agnihotraṁ';
      const context = { sandhi: true };
      const result = analyzeSandhiContext(text, context, 'IAST');
      
      expect(result.hasSandhiContext).toBe(true);
      expect(result.contextType).toBe('explicit');
      expect(result.applicabilityReason).toContain('Explicit sandhi context');
    });

    it('should detect implicit sandhi from markers', () => {
      const text = 'agnau hotāraṁ'; // vowel sequences suggesting sandhi
      const context = {};
      const result = analyzeSandhiContext(text, context, 'IAST');
      
      expect(result.hasSandhiContext).toBe(true);
      expect(result.contextType).toContain('implicit');
    });

    it('should detect phonetic continuity', () => {
      const text = 'kṛṣṇa īśāna'; // phonetic continuity patterns
      const context = {};
      const result = analyzeSandhiContext(text, context, 'IAST');
      
      expect(result.phoneticContinuity).toBeDefined();
      expect(result.phoneticContinuity.vowelDensity).toBeGreaterThan(0);
    });

    it('should not detect sandhi in discrete words', () => {
      const text = 'go cow'; // simple discrete words with low vowel density
      const context = {};
      const result = analyzeSandhiContext(text, context, 'IAST');
      
      expect(result.hasSandhiContext).toBe(false);
      expect(result.contextType).toBe('none');
    });
  });

  describe('analyzeAccentSequencing function', () => {
    
    it('should identify svarita-anudātta patterns', () => {
      const text = 'vā̂ìti'; // vā̂ (svarita) + ìti (anudātta)
      const result = analyzeAccentSequencing(text, 'IAST');
      
      expect(result.hasSvaritaAnudattaPattern).toBe(true);
      expect(result.svaritaAnudattaSpans).toHaveLength(1);
      expect(result.svaritaAnudattaSpans[0].anudattaSequence.length).toBeGreaterThan(0);
    });

    it('should handle multiple svarita-anudātta spans', () => {
      const text = 'sā̂dàkùm rā̂jàkùm'; 
      const result = analyzeAccentSequencing(text, 'IAST');
      
      expect(result.hasSvaritaAnudattaPattern).toBe(true);
      expect(result.spanCount).toBeGreaterThan(1);
      expect(result.totalAnudattaVowels).toBeGreaterThan(2);
    });

    it('should not find patterns in udātta-only sequences', () => {
      const text = 'rámā sítā'; // only udātta vowels
      const result = analyzeAccentSequencing(text, 'IAST');
      
      expect(result.hasSvaritaAnudattaPattern).toBe(false);
      expect(result.svaritaAnudattaSpans).toHaveLength(0);
    });

    it('should handle broken sequences correctly', () => {
      const text = 'vā̂rámi'; // svarita followed by udātta, breaking sequence
      const result = analyzeAccentSequencing(text, 'IAST');
      
      expect(result.hasSvaritaAnudattaPattern).toBe(false);
    });

    it('should work with Devanagari script', () => {
      const text = 'वाँति'; // Devanagari svarita-anudātta
      const result = analyzeAccentSequencing(text, 'Devanagari');
      
      expect(result.accentSequence).toBeDefined();
      expect(result.accentSequence.length).toBeGreaterThan(0);
    });
  });

  describe('analyzeAssimilationPatterns function', () => {
    
    it('should identify required assimilation patterns', () => {
      const text = 'vā̂ìti'; 
      const result = analyzeAssimilationPatterns(text, 'IAST');
      
      expect(result.assimilationRequired).toBe(true);
      expect(result.assimilationCount).toBeGreaterThan(0);
      expect(result.assimilationSpans[0].assimilationType).toBe('monotone-extension');
      expect(result.assimilationSpans[0].targetTone).toBe('low-monotone');
    });

    it('should determine correct pattern types', () => {
      const singleSpan = analyzeAssimilationPatterns('vā̂ìti', 'IAST');
      expect(singleSpan.patternType).toBe('single-span');
      
      const multipleSpans = analyzeAssimilationPatterns('sā̂dàkùm rā̂jàkùm', 'IAST');
      expect(multipleSpans.patternType).toBe('multiple-spans');
    });

    it('should not require assimilation without svarita-anudātta patterns', () => {
      const text = 'rámā sítā'; 
      const result = analyzeAssimilationPatterns(text, 'IAST');
      
      expect(result.assimilationRequired).toBe(false);
      expect(result.assimilationCount).toBe(0);
      expect(result.patternType).toBe('none');
    });

    it('should calculate correct span positions', () => {
      const text = 'àgni vā̂ti'; 
      const result = analyzeAssimilationPatterns(text, 'IAST');
      
      if (result.assimilationRequired) {
        expect(result.assimilationSpans[0].startPosition).toBeDefined();
        expect(result.assimilationSpans[0].endPosition).toBeDefined();
        expect(result.assimilationSpans[0].endPosition).toBeGreaterThan(result.assimilationSpans[0].startPosition);
      }
    });
  });

  describe('detectSandhiMarkers function', () => {
    
    it('should detect consonant cluster markers in IAST', () => {
      const text = 'agnihotraṁ'; // 'gn' consonant cluster
      const markers = detectSandhiMarkers(text, 'IAST');
      
      expect(markers).toContain('consonant-clusters');
    });

    it('should detect vowel sequence markers in IAST', () => {
      const text = 'agnau hotāraṁ'; // 'au' and other vowel sequences
      const markers = detectSandhiMarkers(text, 'IAST');
      
      expect(markers).toContain('vowel-sequences');
    });

    it('should detect markers in Devanagari', () => {
      const text = 'अग्निहोत्रं'; // Devanagari consonant clusters
      const markers = detectSandhiMarkers(text, 'Devanagari');
      
      expect(markers.length).toBeGreaterThan(0);
    });

    it('should return empty array for simple words', () => {
      const text = 'rama'; // simple word, no sandhi markers
      const markers = detectSandhiMarkers(text, 'IAST');
      
      expect(markers).toHaveLength(0);
    });
  });

  describe('performMonotoneAssimilation function', () => {
    
    it('should create assimilations for qualifying patterns', () => {
      const text = 'vā̂ìti';
      const assimilations = performMonotoneAssimilation(text, 'IAST');
      
      expect(assimilations.length).toBeGreaterThan(0);
      expect(assimilations[0].assimilationType).toBe('monotone-extension');
      expect(assimilations[0].targetTone).toBe('low-monotone');
      expect(assimilations[0].rule).toBe('1.2.39');
    });

    it('should handle multiple assimilation spans', () => {
      const text = 'sā̂dàkùm rā̂jàkùm';
      const assimilations = performMonotoneAssimilation(text, 'IAST');
      
      expect(assimilations.length).toBeGreaterThan(1);
      assimilations.forEach(assimilation => {
        expect(assimilation.assimilationType).toBe('monotone-extension');
        expect(assimilation.rule).toBe('1.2.39');
      });
    });

    it('should return empty array for non-qualifying texts', () => {
      const text = 'rámā sítā'; // no svarita-anudātta patterns
      const assimilations = performMonotoneAssimilation(text, 'IAST');
      
      expect(assimilations).toHaveLength(0);
    });

    it('should include correct vowel references', () => {
      const text = 'vā̂ìti';
      const assimilations = performMonotoneAssimilation(text, 'IAST');
      
      if (assimilations.length > 0) {
        expect(assimilations[0].sourceVowel).toBeDefined();
        expect(assimilations[0].affectedVowels).toBeDefined();
        expect(assimilations[0].affectedVowels.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Edge cases and error handling', () => {
    
    it('should handle text with no vowels', () => {
      const text = 'kṣtr'; // consonant-only
      const context = { sandhi: true };
      
      expect(() => sutra1239(text, context)).not.toThrow();
      const result = sutra1239(text, context);
      expect(result.hasAssimilation).toBe(false);
    });

    it('should handle mixed script inputs gracefully', () => {
      const text = 'vā̂ति'; // mixed IAST and Devanagari
      const context = { sandhi: true };
      
      expect(() => sutra1239(text, context)).not.toThrow();
    });

    it('should handle very long texts', () => {
      const text = 'vā̂ìti '.repeat(100); // repeated text
      const context = { sandhi: true };
      
      expect(() => sutra1239(text, context)).not.toThrow();
      const result = sutra1239(text, context);
      expect(result.confidence).toBeGreaterThan(0);
    });

    it('should handle texts with only unmarked vowels', () => {
      const text = 'agni soma'; // unmarked vowels
      const context = { sandhi: true };
      const result = sutra1239(text, context);
      
      expect(result.hasAssimilation).toBe(false);
      expect(result.analysis.phases.accentSequencing.hasSvaritaAnudattaPattern).toBe(false);
    });

    it('should handle single character inputs', () => {
      expect(() => sutra1239('a')).not.toThrow();
      expect(() => sutra1239('ā̂')).not.toThrow();
    });
  });

  describe('Integration with domain restrictions', () => {
    
    it('should respect Subrahmaṇyā domain blocking', () => {
      const text = 'vā̂ìti';
      const context = { sandhi: true, subrahmaṇyā: true };
      const result = sutra1239(text, context);
      
      expect(result.hasAssimilation).toBe(false);
      expect(result.analysis.phases.domainRestriction.isBlocked).toBe(true);
    });

    it('should handle various Subrahmaṇyā context markers', () => {
      const text = 'vā̂ìti';
      const contexts = [
        { sandhi: true, subrahmanya: true },
        { sandhi: true, subrahmaṇya: true },
        { sandhi: true, skanda: true },
        { sandhi: true, karttikeya: true }
      ];
      
      contexts.forEach(context => {
        const result = sutra1239(text, context);
        expect(result.analysis.phases.domainRestriction.isBlocked).toBe(true);
      });
    });

    it('should handle Vedic hymn context blocking', () => {
      const text = 'vā̂ìti';
      const context = { sandhi: true, vedic_hymn: true };
      const result = sutra1239(text, context);
      
      expect(result.analysis.phases.domainRestriction.isBlocked).toBe(true);
      expect(result.analysis.phases.domainRestriction.blockingFactors).toContain('vedic-hymn-context');
    });

    it('should handle ritual context blocking', () => {
      const text = 'vā̂ìti';
      const context = { sandhi: true, ritual: true };
      const result = sutra1239(text, context);
      
      expect(result.analysis.phases.domainRestriction.isBlocked).toBe(true);
      expect(result.analysis.phases.domainRestriction.blockingFactors).toContain('ritual-context');
    });
  });

  describe('Prosody and accent analysis', () => {
    
    it('should generate appropriate prosody rules', () => {
      const text = 'vā̂ìti';
      const context = { sandhi: true };
      const result = sutra1239(text, context);
      
      expect(result.prosodyRules).toBeDefined();
      expect(result.prosodyRules.length).toBeGreaterThan(0);
      expect(result.prosodyRules.some(rule => rule.type === 'monotone-assimilation')).toBe(true);
    });

    it('should provide prosody options', () => {
      const text = 'vā̂ìti';
      const context = { sandhi: true };
      const result = sutra1239(text, context);
      
      expect(result.options).toBeDefined();
      expect(result.options.length).toBeGreaterThan(0);
      expect(result.options.some(option => option.mode === 'local-monotone')).toBe(true);
    });

    it('should include technical notes', () => {
      const text = 'vā̂ìti';
      const context = { sandhi: true };
      const result = sutra1239(text, context);
      
      expect(result.analysis.technicalNotes).toBeDefined();
      expect(result.analysis.technicalNotes.length).toBeGreaterThan(0);
      expect(result.analysis.technicalNotes.some(note => note.includes('Sandhi Context'))).toBe(true);
    });

    it('should provide traditional commentary', () => {
      const text = 'vā̂ìti';
      const context = { sandhi: true };
      const result = sutra1239(text, context);
      
      expect(result.traditionalCommentary).toBeDefined();
      expect(result.traditionalCommentary.sutraText).toBe('स्वरितात् संहितायामनुदात्तानाम्');
      expect(result.traditionalCommentary.interpretation).toBeDefined();
      expect(result.traditionalCommentary.scholasticNotes).toBeDefined();
    });
  });

  describe('Script compatibility', () => {
    
    it('should handle IAST script correctly', () => {
      const text = 'vā̂ìti';
      const context = { sandhi: true };
      const result = sutra1239(text, context);
      
      expect(result.script).toBe('IAST');
      expect(result.confidence).toBeGreaterThanOrEqual(0.8);
    });

    it('should handle Devanagari script correctly', () => {
      const text = 'वाँति';
      const context = { sandhi: true };
      const result = sutra1239(text, context);
      
      expect(result.script).toBe('Devanagari');
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    it('should maintain script consistency in analysis', () => {
      const texts = ['vā̂ìti', 'वाँति'];
      const context = { sandhi: true };
      
      texts.forEach(text => {
        const result = sutra1239(text, context);
        expect(result.script).toBe(text.match(/[अ-ह]/) ? 'Devanagari' : 'IAST');
      });
    });
  });

  describe('Backwards compatibility', () => {
    
    it('should maintain legacy options field', () => {
      const text = 'vā̂ìti';
      const context = { sandhi: true };
      const result = sutra1239(text, context);
      
      expect(result.options).toBeDefined();
      expect(Array.isArray(result.options)).toBe(true);
    });

    it('should maintain hasAssimilation field', () => {
      const text = 'vā̂ìti';
      const context = { sandhi: true };
      const result = sutra1239(text, context);
      
      expect(typeof result.hasAssimilation).toBe('boolean');
    });

    it('should include appliedSutras field', () => {
      const text = 'vā̂ìti';
      const context = { sandhi: true };
      const result = sutra1239(text, context);
      
      expect(result.appliedSutras).toBeDefined();
      expect(result.appliedSutras).toContain('1.2.39');
    });
  });
});
