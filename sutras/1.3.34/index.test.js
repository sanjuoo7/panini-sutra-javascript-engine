/**
 * Test Suite for Sutra 1.3.34: वेः शब्दकर्म्मणः
 * Tests the Ātmanepada designation for कृ root with वि prefix in sound-making context
 */

import { determineViKriShabdakarmaAtmanepada } from './index.js';

describe('Sutra 1.3.34: वेः शब्दकर्म्मणः (veḥ śabadakarmaṇaḥ)', () => {
  
  describe('Complete वि + कृ + शब्दकर्मन् combinations', () => {
    test('should detect विकृ with explicit sound-making context', () => {
      const result = determineViKriShabdakarmaAtmanepada('विकृ', {
        sound: true
      });
      expect(result.isSutra134Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.shabdakarmaContext).toBe('soundMaking');
    });

    test('should detect विकरोति with sound meaning', () => {
      const result = determineViKriShabdakarmaAtmanepada('विकरोति', {
        meaning: 'to make sound'
      });
      expect(result.isSutra134Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.shabdakarmaContext).toBe('soundMaking');
    });

    test('should detect with शब्द meaning', () => {
      const result = determineViKriShabdakarmaAtmanepada('विकृत', {
        meaning: 'शब्द'
      });
      expect(result.isSutra134Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.shabdakarmaContext).toBe('soundMaking');
    });

    test('should detect explicit root, prefix, and context', () => {
      const result = determineViKriShabdakarmaAtmanepada('someform', {
        root: 'कृ',
        prefix: 'वि',
        music: true
      });
      expect(result.isSutra134Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.root).toBe('कृ');
      expect(result.prefix).toBe('वि');
    });
  });

  describe('IAST script support', () => {
    test('should detect vikṛ with sound-making (IAST)', () => {
      const result = determineViKriShabdakarmaAtmanepada('vikṛ', {
        sound: true
      });
      expect(result.isSutra134Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.prefix).toBe('वि');
    });

    test('should detect vikaroti with music (IAST)', () => {
      const result = determineViKriShabdakarmaAtmanepada('vikaroti', {
        music: true
      });
      expect(result.isSutra134Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.shabdakarmaContext).toBe('musical');
    });

    test('should detect with shabda meaning (IAST)', () => {
      const result = determineViKriShabdakarmaAtmanepada('vikṛt', {
        meaning: 'shabda'
      });
      expect(result.isSutra134Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should handle IAST root and prefix context', () => {
      const result = determineViKriShabdakarmaAtmanepada('someform', {
        root: 'kṛ',
        prefix: 'vi',
        voice: true
      });
      expect(result.isSutra134Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('शब्दकर्मन् semantic contexts', () => {
    test('should detect sound-making context', () => {
      const result = determineViKriShabdakarmaAtmanepada('विकरोति', {
        meaning: 'to make sound and noise'
      });
      expect(result.isSutra134Atmanepada).toBe(true);
      expect(result.shabdakarmaContext).toBe('soundMaking');
    });

    test('should detect musical context', () => {
      const result = determineViKriShabdakarmaAtmanepada('विकृ', {
        meaning: 'संगीत'
      });
      expect(result.isSutra134Atmanepada).toBe(true);
      expect(result.shabdakarmaContext).toBe('musical');
    });

    test('should detect natural sounds context', () => {
      const result = determineViKriShabdakarmaAtmanepada('विकार', {
        meaning: 'गर्जना'
      });
      expect(result.isSutra134Atmanepada).toBe(true);
      expect(result.shabdakarmaContext).toBe('natural');
    });

    test('should detect instrumental context', () => {
      const result = determineViKriShabdakarmaAtmanepada('विकृत', {
        meaning: 'वादन'
      });
      expect(result.isSutra134Atmanepada).toBe(true);
      expect(result.shabdakarmaContext).toBe('instrumental');
    });

    test('should detect vocal context', () => {
      const result = determineViKriShabdakarmaAtmanepada('विकार', {
        meaning: 'उच्चारण'
      });
      expect(result.isSutra134Atmanepada).toBe(true);
      expect(result.shabdakarmaContext).toBe('vocal');
    });

    test('should handle various sound terms', () => {
      const soundTerms = ['sound', 'voice', 'noise', 'echo', 'resonance'];
      
      soundTerms.forEach(term => {
        const result = determineViKriShabdakarmaAtmanepada('विकृ', {
          meaning: term
        });
        expect(result.isSutra134Atmanepada).toBe(true);
      });
    });
  });

  describe('Context flags', () => {
    test('should detect sound flag', () => {
      const result = determineViKriShabdakarmaAtmanepada('विकरोति', {
        sound: true
      });
      expect(result.isSutra134Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should detect music flag', () => {
      const result = determineViKriShabdakarmaAtmanepada('विकृत', {
        music: true
      });
      expect(result.isSutra134Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should detect voice flag', () => {
      const result = determineViKriShabdakarmaAtmanepada('विकृ', {
        voice: true
      });
      expect(result.isSutra134Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should detect chant flag', () => {
      const result = determineViKriShabdakarmaAtmanepada('विकार', {
        chant: true
      });
      expect(result.isSutra134Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should detect thunder flag', () => {
      const result = determineViKriShabdakarmaAtmanepada('विकृत', {
        thunder: true
      });
      expect(result.isSutra134Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should detect bell flag', () => {
      const result = determineViKriShabdakarmaAtmanepada('विकार', {
        bell: true
      });
      expect(result.isSutra134Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('Compound word analysis', () => {
    test('should detect शब्द in compound', () => {
      const result = determineViKriShabdakarmaAtmanepada('शब्दविकार');
      expect(result.isSutra134Atmanepada).toBe(true);
      expect(result.shabdakarmaContext).toBe('soundMaking');
    });

    test('should detect संगीत in compound', () => {
      const result = determineViKriShabdakarmaAtmanepada('संगीतविकृत');
      expect(result.isSutra134Atmanepada).toBe(true);
      expect(result.shabdakarmaContext).toBe('musical');
    });

    test('should detect ध्वनि in compound', () => {
      const result = determineViKriShabdakarmaAtmanepada('ध्वनिविकार');
      expect(result.isSutra134Atmanepada).toBe(true);
      expect(result.shabdakarmaContext).toBe('soundMaking');
    });

    test('should detect गर्जन in compound', () => {
      const result = determineViKriShabdakarmaAtmanepada('गर्जनविकृत');
      expect(result.isSutra134Atmanepada).toBe(true);
      expect(result.shabdakarmaContext).toBe('natural');
    });
  });

  describe('Negative cases - should not apply', () => {
    test('should not apply without कृ root', () => {
      const result = determineViKriShabdakarmaAtmanepada('विगम्', {
        sound: true
      });
      expect(result.isSutra134Atmanepada).toBe(false);
      expect(result.analysis).toContain('कृ root not detected');
    });

    test('should not apply without वि prefix', () => {
      const result = determineViKriShabdakarmaAtmanepada('करोति', {
        sound: true
      });
      expect(result.isSutra134Atmanepada).toBe(false);
      expect(result.analysis).toContain('वि prefix not detected');
    });

    test('should not apply without शब्दकर्मन् context', () => {
      const result = determineViKriShabdakarmaAtmanepada('विकरोति');
      expect(result.isSutra134Atmanepada).toBe(false);
      expect(result.analysis).toContain('शब्दकर्मन् context');
    });

    test('should not apply with irrelevant meanings', () => {
      const result = determineViKriShabdakarmaAtmanepada('विकरोति', {
        meaning: 'to make generally'
      });
      expect(result.isSutra134Atmanepada).toBe(false);
      expect(result.confidence).toBeLessThan(0.5);
    });

    test('should not apply to other prefixes', () => {
      const result = determineViKriShabdakarmaAtmanepada('अधिकरोति', {
        sound: true
      });
      expect(result.isSutra134Atmanepada).toBe(false);
    });

    test('should require all three conditions', () => {
      // Only root, no prefix or context
      const result1 = determineViKriShabdakarmaAtmanepada('करोति');
      expect(result1.isSutra134Atmanepada).toBe(false);
      
      // Only prefix, no root or context
      const result2 = determineViKriShabdakarmaAtmanepada('विगम्');
      expect(result2.isSutra134Atmanepada).toBe(false);
      
      // Only context, no root or prefix
      const result3 = determineViKriShabdakarmaAtmanepada('गच्छति', {
        sound: true
      });
      expect(result3.isSutra134Atmanepada).toBe(false);
    });
  });

  describe('Error handling', () => {
    test('should handle null input', () => {
      const result = determineViKriShabdakarmaAtmanepada(null);
      expect(result.isSutra134Atmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle undefined input', () => {
      const result = determineViKriShabdakarmaAtmanepada(undefined);
      expect(result.isSutra134Atmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle empty string', () => {
      const result = determineViKriShabdakarmaAtmanepada('');
      expect(result.isSutra134Atmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle whitespace-only string', () => {
      const result = determineViKriShabdakarmaAtmanepada('   ');
      expect(result.isSutra134Atmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });

    test('should handle non-string input', () => {
      const result = determineViKriShabdakarmaAtmanepada(123);
      expect(result.isSutra134Atmanepada).toBe(false);
      expect(result.confidence).toBe(0);
      expect(result.analysis).toBe('Invalid input');
    });
  });

  describe('Edge cases', () => {
    test('should handle mixed case input', () => {
      const result = determineViKriShabdakarmaAtmanepada('ViKaRoTi', {
        sound: true
      });
      expect(result.isSutra134Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should handle extra whitespace', () => {
      const result = determineViKriShabdakarmaAtmanepada('  विकरोति  ', {
        music: true
      });
      expect(result.isSutra134Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    test('should handle various कृ forms with वि', () => {
      const kriforms = ['विकुर्', 'विकार', 'विकृत', 'विकरण', 'विकर्'];
      
      kriforms.forEach(form => {
        const result = determineViKriShabdakarmaAtmanepada(form, {
          sound: true
        });
        expect(result.isSutra134Atmanepada).toBe(true);
      });
    });

    test('should prioritize explicit context over pattern matching', () => {
      const explicitResult = determineViKriShabdakarmaAtmanepada('विकरोति', {
        root: 'कृ',
        prefix: 'वि',
        sound: true
      });
      const patternResult = determineViKriShabdakarmaAtmanepada('शब्दविकार');
      
      expect(explicitResult.confidence).toBeGreaterThan(patternResult.confidence);
    });
  });

  describe('Cross-script consistency', () => {
    test('should handle mixed script contexts', () => {
      const result = determineViKriShabdakarmaAtmanepada('vikṛ', {
        root: 'कृ',
        prefix: 'वि',
        sound: true
      });
      expect(result.isSutra134Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should handle IAST word with Devanagari context', () => {
      const result = determineViKriShabdakarmaAtmanepada('विकरोति', {
        root: 'kṛ',
        meaning: 'sound'
      });
      expect(result.isSutra134Atmanepada).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });
  });

  describe('Semantic context varieties', () => {
    test('should distinguish sound types appropriately', () => {
      const musicResult = determineViKriShabdakarmaAtmanepada('विकृ', {
        meaning: 'music'
      });
      const voiceResult = determineViKriShabdakarmaAtmanepada('विकृ', {
        meaning: 'voice'
      });
      const thunderResult = determineViKriShabdakarmaAtmanepada('विकृ', {
        meaning: 'thunder'
      });
      
      expect(musicResult.shabdakarmaContext).toBe('musical');
      expect(voiceResult.shabdakarmaContext).toBe('vocal');
      expect(thunderResult.shabdakarmaContext).toBe('natural');
    });

    test('should handle compound sound meanings', () => {
      const result = determineViKriShabdakarmaAtmanepada('विकरोति', {
        meaning: 'music and song with voice'
      });
      expect(result.isSutra134Atmanepada).toBe(true);
      expect(['musical', 'vocal']).toContain(result.shabdakarmaContext);
    });
  });

  describe('Detailed analysis verification', () => {
    test('should provide complete analysis for valid cases', () => {
      const result = determineViKriShabdakarmaAtmanepada('विकरोति', {
        sound: true
      });
      expect(result.root).toBe('कृ');
      expect(result.prefix).toBe('वि');
      expect(result.shabdakarmaContext).toBe('soundMaking');
      expect(result.rootDetection).toBeDefined();
      expect(result.prefixDetection).toBeDefined();
      expect(result.shabdakarmaAnalysis).toBeDefined();
    });

    test('should explain failure clearly', () => {
      const result = determineViKriShabdakarmaAtmanepada('गच्छति', {
        sound: true
      });
      expect(result.analysis).toContain('Missing:');
      expect(result.analysis).toContain('कृ root');
      expect(result.analysis).toContain('वि prefix');
    });

    test('should distinguish different failure modes', () => {
      const noRoot = determineViKriShabdakarmaAtmanepada('विगम्', {
        sound: true
      });
      const noPrefix = determineViKriShabdakarmaAtmanepada('करोति', {
        sound: true
      });
      const noContext = determineViKriShabdakarmaAtmanepada('विकरोति');
      
      expect(noRoot.analysis).toContain('कृ root not detected');
      expect(noPrefix.analysis).toContain('वि prefix not detected');
      expect(noContext.analysis).toContain('शब्दकर्मन् context');
    });
  });

  describe('Sutra metadata', () => {
    test('should include correct sutra reference', () => {
      const result = determineViKriShabdakarmaAtmanepada('विकरोति', {
        sound: true
      });
      expect(result.sutraApplied).toBe('1.3.34');
    });

    test('should include sutra reference for negative cases', () => {
      const result = determineViKriShabdakarmaAtmanepada('गच्छति');
      expect(result.sutraApplied).toBe('1.3.34');
    });

    test('should maintain metadata consistency', () => {
      const result = determineViKriShabdakarmaAtmanepada('विकरोति', {
        music: true
      });
      expect(result.sutraApplied).toBe('1.3.34');
      expect(result.root).toBe('कृ');
      expect(result.prefix).toBe('वि');
    });
  });

  describe('Confidence calibration', () => {
    test('should have high confidence with explicit all elements', () => {
      const result = determineViKriShabdakarmaAtmanepada('विकरोति', {
        root: 'कृ',
        prefix: 'वि',
        sound: true
      });
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('should have medium confidence with pattern matching', () => {
      const result = determineViKriShabdakarmaAtmanepada('शब्दविकार');
      expect(result.confidence).toBeGreaterThan(0.5);
      expect(result.confidence).toBeLessThan(0.8);
    });

    test('should have appropriate confidence gradation', () => {
      const explicitResult = determineViKriShabdakarmaAtmanepada('विकरोति', {
        root: 'कृ',
        prefix: 'वि',
        sound: true
      });
      const implicitResult = determineViKriShabdakarmaAtmanepada('ध्वनिविकार');
      
      expect(explicitResult.confidence).toBeGreaterThan(implicitResult.confidence);
    });
  });

  describe('Special sound context patterns', () => {
    test('should handle Sanskrit sound terminology', () => {
      const sanskritTerms = ['शब्द', 'ध्वनि', 'नाद', 'स्वर', 'गर्जन'];
      
      sanskritTerms.forEach(term => {
        const result = determineViKriShabdakarmaAtmanepada('विकृ', {
          meaning: term
        });
        expect(result.isSutra134Atmanepada).toBe(true);
      });
    });

    test('should handle English sound terminology', () => {
      const englishTerms = ['sound', 'voice', 'noise', 'echo', 'resonance'];
      
      englishTerms.forEach(term => {
        const result = determineViKriShabdakarmaAtmanepada('विकृ', {
          meaning: term
        });
        expect(result.isSutra134Atmanepada).toBe(true);
      });
    });

    test('should prioritize शब्दकर्मन् over general कर्मन्', () => {
      const soundResult = determineViKriShabdakarmaAtmanepada('विकरोति', {
        meaning: 'to make sound'
      });
      const generalResult = determineViKriShabdakarmaAtmanepada('विकरोति', {
        meaning: 'to make things'
      });
      
      expect(soundResult.isSutra134Atmanepada).toBe(true);
      expect(generalResult.isSutra134Atmanepada).toBe(false);
    });
  });
});
