/**
 * Unit Tests for Phoneme Tokenization Functions
 * 
 * This test suite thoroughly validates the tokenizeIastPhonemes and 
 * tokenizeDevanagariPhonemes functions from shared/phoneme-tokenization.js
 * 
 * Test Categories:
 * - Basic IAST phoneme tokenization
 * - Complex IAST patterns (aspirated, diacritics, clusters)
 * - Basic Devanagari phoneme tokenization  
 * - Complex Devanagari patterns (conjuncts, vowel marks)
 * - Edge cases and error handling
 * - Performance and boundary testing
 * 
 * Created: August 8, 2025
 */

import { 
  tokenizeIastPhonemes, 
  tokenizeDevanagariPhonemes,
  tokenizePhonemes,
  analyzePhonemeStructure 
} from './phoneme-tokenization.js';

describe('Phoneme Tokenization: IAST Functions', () => {
  
  describe('tokenizeIastPhonemes() - Basic Functionality', () => {
    
    test('should tokenize simple IAST vowels correctly', () => {
      expect(tokenizeIastPhonemes('a')).toEqual(['a']);
      expect(tokenizeIastPhonemes('i')).toEqual(['i']);
      expect(tokenizeIastPhonemes('u')).toEqual(['u']);
      expect(tokenizeIastPhonemes('e')).toEqual(['e']);
      expect(tokenizeIastPhonemes('o')).toEqual(['o']);
    });

    test('should tokenize IAST long vowels with diacritics', () => {
      expect(tokenizeIastPhonemes('ā')).toEqual(['ā']);
      expect(tokenizeIastPhonemes('ī')).toEqual(['ī']);
      expect(tokenizeIastPhonemes('ū')).toEqual(['ū']);
      expect(tokenizeIastPhonemes('ṛ')).toEqual(['ṛ']);
      expect(tokenizeIastPhonemes('ṝ')).toEqual(['ṝ']);
      expect(tokenizeIastPhonemes('ḷ')).toEqual(['ḷ']);
      expect(tokenizeIastPhonemes('ḹ')).toEqual(['ḹ']);
    });

    test('should tokenize IAST diphthongs correctly', () => {
      expect(tokenizeIastPhonemes('ai')).toEqual(['ai']);
      expect(tokenizeIastPhonemes('au')).toEqual(['au']);
    });

    test('should tokenize simple IAST consonants', () => {
      expect(tokenizeIastPhonemes('k')).toEqual(['k']);
      expect(tokenizeIastPhonemes('g')).toEqual(['g']);
      expect(tokenizeIastPhonemes('t')).toEqual(['t']);
      expect(tokenizeIastPhonemes('d')).toEqual(['d']);
      expect(tokenizeIastPhonemes('p')).toEqual(['p']);
      expect(tokenizeIastPhonemes('b')).toEqual(['b']);
    });

    test('should tokenize IAST aspirated consonants', () => {
      expect(tokenizeIastPhonemes('kh')).toEqual(['kh']);
      expect(tokenizeIastPhonemes('gh')).toEqual(['gh']);
      expect(tokenizeIastPhonemes('ch')).toEqual(['ch']);
      expect(tokenizeIastPhonemes('jh')).toEqual(['jh']);
      expect(tokenizeIastPhonemes('th')).toEqual(['th']);
      expect(tokenizeIastPhonemes('dh')).toEqual(['dh']);
      expect(tokenizeIastPhonemes('ph')).toEqual(['ph']);
      expect(tokenizeIastPhonemes('bh')).toEqual(['bh']);
    });

    test('should tokenize IAST special consonants with diacritics', () => {
      expect(tokenizeIastPhonemes('ṅ')).toEqual(['ṅ']);
      expect(tokenizeIastPhonemes('ñ')).toEqual(['ñ']);
      expect(tokenizeIastPhonemes('ṭ')).toEqual(['ṭ']);
      expect(tokenizeIastPhonemes('ḍ')).toEqual(['ḍ']);
      expect(tokenizeIastPhonemes('ṇ')).toEqual(['ṇ']);
      expect(tokenizeIastPhonemes('ś')).toEqual(['ś']);
      expect(tokenizeIastPhonemes('ṣ')).toEqual(['ṣ']);
      expect(tokenizeIastPhonemes('ḥ')).toEqual(['ḥ']);
      expect(tokenizeIastPhonemes('ṃ')).toEqual(['ṃ']);
    });
  });

  describe('tokenizeIastPhonemes() - Complex Patterns', () => {
    
    test('should tokenize IAST words with mixed phonemes', () => {
      expect(tokenizeIastPhonemes('gam')).toEqual(['g', 'a', 'm']);
      expect(tokenizeIastPhonemes('bhū')).toEqual(['bh', 'ū']);
      expect(tokenizeIastPhonemes('kṛṣṇa')).toEqual(['k', 'ṛ', 'ṣ', 'ṇ', 'a']);
      expect(tokenizeIastPhonemes('dharma')).toEqual(['dh', 'a', 'r', 'm', 'a']);
    });

    test('should handle IAST consonant clusters correctly', () => {
      expect(tokenizeIastPhonemes('sthā')).toEqual(['s', 'th', 'ā']);
      expect(tokenizeIastPhonemes('kṣetra')).toEqual(['k', 'ṣ', 'e', 't', 'r', 'a']);
      expect(tokenizeIastPhonemes('jñāna')).toEqual(['j', 'ñ', 'ā', 'n', 'a']);
    });

    test('should handle IAST words with diphthongs', () => {
      expect(tokenizeIastPhonemes('gai')).toEqual(['g', 'ai']);
      expect(tokenizeIastPhonemes('gau')).toEqual(['g', 'au']);
      expect(tokenizeIastPhonemes('kaurava')).toEqual(['k', 'au', 'r', 'a', 'v', 'a']);
    });

    test('should handle long IAST words correctly', () => {
      expect(tokenizeIastPhonemes('bhagavadgītā')).toEqual(['bh', 'a', 'g', 'a', 'v', 'a', 'd', 'g', 'ī', 't', 'ā']);
      expect(tokenizeIastPhonemes('rāmāyaṇa')).toEqual(['r', 'ā', 'm', 'ā', 'y', 'a', 'ṇ', 'a']);
    });

    test('should prioritize longer phonemes over shorter ones', () => {
      // 'th' should be tokenized as aspirated consonant, not 't' + 'h'
      expect(tokenizeIastPhonemes('tha')).toEqual(['th', 'a']);
      // 'ai' should be tokenized as diphthong, not 'a' + 'i'
      expect(tokenizeIastPhonemes('aindra')).toEqual(['ai', 'n', 'd', 'r', 'a']);
    });
  });

  describe('tokenizeIastPhonemes() - Edge Cases', () => {
    
    test('should handle empty and null inputs gracefully', () => {
      expect(tokenizeIastPhonemes('')).toEqual([]);
      expect(tokenizeIastPhonemes(null)).toEqual([]);
      expect(tokenizeIastPhonemes(undefined)).toEqual([]);
    });

    test('should handle non-string inputs gracefully', () => {
      expect(tokenizeIastPhonemes(123)).toEqual([]);
      expect(tokenizeIastPhonemes({})).toEqual([]);
      expect(tokenizeIastPhonemes([])).toEqual([]);
    });

    test('should handle unrecognized characters', () => {
      // Should treat unknown characters as individual phonemes
      expect(tokenizeIastPhonemes('a@b')).toEqual(['a', '@', 'b']);
      expect(tokenizeIastPhonemes('k#m')).toEqual(['k', '#', 'm']);
    });

    test('should handle mixed scripts (IAST with numbers/punctuation)', () => {
      expect(tokenizeIastPhonemes('gam1')).toEqual(['g', 'a', 'm', '1']);
      expect(tokenizeIastPhonemes('rāma.')).toEqual(['r', 'ā', 'm', 'a', '.']);
      expect(tokenizeIastPhonemes('kṛṣṇa!')).toEqual(['k', 'ṛ', 'ṣ', 'ṇ', 'a', '!']);
    });

    test('should handle whitespace correctly', () => {
      expect(tokenizeIastPhonemes('ga ma')).toEqual(['g', 'a', ' ', 'm', 'a']);
      expect(tokenizeIastPhonemes(' kṛṣṇa ')).toEqual([' ', 'k', 'ṛ', 'ṣ', 'ṇ', 'a', ' ']);
    });
  });
});

describe('Phoneme Tokenization: Devanagari Functions', () => {
  
  describe('tokenizeDevanagariPhonemes() - Basic Functionality', () => {
    
    test('should tokenize simple Devanagari vowels correctly', () => {
      expect(tokenizeDevanagariPhonemes('अ')).toEqual(['अ']);
      expect(tokenizeDevanagariPhonemes('इ')).toEqual(['इ']);
      expect(tokenizeDevanagariPhonemes('उ')).toEqual(['उ']);
      expect(tokenizeDevanagariPhonemes('ए')).toEqual(['ए']);
      expect(tokenizeDevanagariPhonemes('ओ')).toEqual(['ओ']);
    });

    test('should tokenize Devanagari long vowels', () => {
      expect(tokenizeDevanagariPhonemes('आ')).toEqual(['आ']);
      expect(tokenizeDevanagariPhonemes('ई')).toEqual(['ई']);
      expect(tokenizeDevanagariPhonemes('ऊ')).toEqual(['ऊ']);
      expect(tokenizeDevanagariPhonemes('ऋ')).toEqual(['ऋ']);
      expect(tokenizeDevanagariPhonemes('ॠ')).toEqual(['ॠ']);
    });

    test('should tokenize Devanagari diphthongs', () => {
      expect(tokenizeDevanagariPhonemes('ऐ')).toEqual(['ऐ']);
      expect(tokenizeDevanagariPhonemes('औ')).toEqual(['औ']);
    });

    test('should tokenize simple Devanagari consonants', () => {
      expect(tokenizeDevanagariPhonemes('क')).toEqual(['क']);
      expect(tokenizeDevanagariPhonemes('ग')).toEqual(['ग']);
      expect(tokenizeDevanagariPhonemes('त')).toEqual(['त']);
      expect(tokenizeDevanagariPhonemes('द')).toEqual(['द']);
      expect(tokenizeDevanagariPhonemes('प')).toEqual(['प']);
      expect(tokenizeDevanagariPhonemes('ब')).toEqual(['ब']);
    });

    test('should tokenize Devanagari aspirated consonants', () => {
      expect(tokenizeDevanagariPhonemes('ख')).toEqual(['ख']);
      expect(tokenizeDevanagariPhonemes('घ')).toEqual(['घ']);
      expect(tokenizeDevanagariPhonemes('छ')).toEqual(['छ']);
      expect(tokenizeDevanagariPhonemes('झ')).toEqual(['झ']);
      expect(tokenizeDevanagariPhonemes('थ')).toEqual(['थ']);
      expect(tokenizeDevanagariPhonemes('ध')).toEqual(['ध']);
      expect(tokenizeDevanagariPhonemes('फ')).toEqual(['फ']);
      expect(tokenizeDevanagariPhonemes('भ')).toEqual(['भ']);
    });

    test('should tokenize Devanagari vowel diacritics', () => {
      expect(tokenizeDevanagariPhonemes('ा')).toEqual(['ा']);
      expect(tokenizeDevanagariPhonemes('ि')).toEqual(['ि']);
      expect(tokenizeDevanagariPhonemes('ी')).toEqual(['ी']);
      expect(tokenizeDevanagariPhonemes('ु')).toEqual(['ु']);
      expect(tokenizeDevanagariPhonemes('ू')).toEqual(['ू']);
      expect(tokenizeDevanagariPhonemes('े')).toEqual(['े']);
      expect(tokenizeDevanagariPhonemes('ो')).toEqual(['ो']);
    });

    test('should tokenize Devanagari special characters', () => {
      expect(tokenizeDevanagariPhonemes('्')).toEqual(['्']); // halanta
      expect(tokenizeDevanagariPhonemes('ं')).toEqual(['ं']); // anusvara
      expect(tokenizeDevanagariPhonemes('ः')).toEqual(['ः']); // visarga
    });
  });

  describe('tokenizeDevanagariPhonemes() - Complex Patterns', () => {
    
    test('should tokenize simple Devanagari words', () => {
      expect(tokenizeDevanagariPhonemes('गम')).toEqual(['ग', 'म']);
      expect(tokenizeDevanagariPhonemes('भू')).toEqual(['भ', 'ू']);
      expect(tokenizeDevanagariPhonemes('राम')).toEqual(['र', 'ा', 'म']);
    });

    test('should handle Devanagari consonant clusters', () => {
      expect(tokenizeDevanagariPhonemes('स्था')).toEqual(['स', '्', 'थ', 'ा']);
      expect(tokenizeDevanagariPhonemes('क्ष')).toEqual(['क', '्', 'ष']);
      expect(tokenizeDevanagariPhonemes('ज्ञ')).toEqual(['ज', '्', 'ञ']);
    });

    test('should handle Devanagari words with vowel marks', () => {
      expect(tokenizeDevanagariPhonemes('कृष्ण')).toEqual(['क', 'ृ', 'ष', '्', 'ण']);
      expect(tokenizeDevanagariPhonemes('धर्म')).toEqual(['ध', 'र', '्', 'म']);
      expect(tokenizeDevanagariPhonemes('गीता')).toEqual(['ग', 'ी', 'त', 'ा']);
    });

    test('should handle complex Devanagari words', () => {
      expect(tokenizeDevanagariPhonemes('रामायण')).toEqual(['र', 'ा', 'म', 'ा', 'य', 'ण']);
      expect(tokenizeDevanagariPhonemes('भगवद्गीता')).toEqual(['भ', 'ग', 'व', 'द', '्', 'ग', 'ी', 'त', 'ा']);
    });

    test('should handle Devanagari words ending with halanta', () => {
      expect(tokenizeDevanagariPhonemes('राम्')).toEqual(['र', 'ा', 'म', '्']);
      expect(tokenizeDevanagariPhonemes('जगत्')).toEqual(['ज', 'ग', 'त', '्']);
    });

    test('should handle Devanagari with anusvara and visarga', () => {
      expect(tokenizeDevanagariPhonemes('रामं')).toEqual(['र', 'ा', 'म', 'ं']);
      expect(tokenizeDevanagariPhonemes('रामः')).toEqual(['र', 'ा', 'म', 'ः']);
      expect(tokenizeDevanagariPhonemes('नमः')).toEqual(['न', 'म', 'ः']);
    });
  });

  describe('tokenizeDevanagariPhonemes() - Edge Cases', () => {
    
    test('should handle empty and null inputs gracefully', () => {
      expect(tokenizeDevanagariPhonemes('')).toEqual([]);
      expect(tokenizeDevanagariPhonemes(null)).toEqual([]);
      expect(tokenizeDevanagariPhonemes(undefined)).toEqual([]);
    });

    test('should handle non-string inputs gracefully', () => {
      expect(tokenizeDevanagariPhonemes(123)).toEqual([]);
      expect(tokenizeDevanagariPhonemes({})).toEqual([]);
      expect(tokenizeDevanagariPhonemes([])).toEqual([]);
    });

    test('should handle unrecognized characters', () => {
      // Should treat unknown characters as individual phonemes
      expect(tokenizeDevanagariPhonemes('क@ग')).toEqual(['क', '@', 'ग']);
      expect(tokenizeDevanagariPhonemes('र#म')).toEqual(['र', '#', 'म']);
    });

    test('should handle mixed scripts (Devanagari with numbers/punctuation)', () => {
      expect(tokenizeDevanagariPhonemes('गम1')).toEqual(['ग', 'म', '1']);
      expect(tokenizeDevanagariPhonemes('राम.')).toEqual(['र', 'ा', 'म', '.']);
      expect(tokenizeDevanagariPhonemes('कृष्ण!')).toEqual(['क', 'ृ', 'ष', '्', 'ण', '!']);
    });

    test('should handle whitespace correctly', () => {
      expect(tokenizeDevanagariPhonemes('ग म')).toEqual(['ग', ' ', 'म']);
      expect(tokenizeDevanagariPhonemes(' राम ')).toEqual([' ', 'र', 'ा', 'म', ' ']);
    });
  });
});

describe('Phoneme Tokenization: Comprehensive Integration Tests', () => {
  
  describe('Cross-Function Consistency', () => {
    
    test('should maintain consistent behavior between IAST and Devanagari tokenizers', () => {
      // Both functions should handle null/undefined the same way
      expect(tokenizeIastPhonemes(null)).toEqual(tokenizeDevanagariPhonemes(null));
      expect(tokenizeIastPhonemes(undefined)).toEqual(tokenizeDevanagariPhonemes(undefined));
      expect(tokenizeIastPhonemes('')).toEqual(tokenizeDevanagariPhonemes(''));
    });

    test('should handle equivalent phonemes correctly', () => {
      // Test equivalent sounds in different scripts
      const iastGam = tokenizeIastPhonemes('gam');
      const devanagariGam = tokenizeDevanagariPhonemes('गम');
      
      expect(iastGam).toHaveLength(3); // g-a-m
      expect(devanagariGam).toHaveLength(2); // ग-म (inherent vowel)
    });
  });

  describe('Performance and Stress Testing', () => {
    
    test('should handle very long IAST texts efficiently', () => {
      const longText = 'rāmāyaṇa'.repeat(100); // 800 characters
      const start = performance.now();
      const result = tokenizeIastPhonemes(longText);
      const end = performance.now();
      
      expect(result).toHaveLength(800); // 8 phonemes × 100 repetitions
      expect(end - start).toBeLessThan(100); // Should complete in under 100ms
    });

    test('should handle very long Devanagari texts efficiently', () => {
      const longText = 'रामायण'.repeat(100); // 600 characters  
      const start = performance.now();
      const result = tokenizeDevanagariPhonemes(longText);
      const end = performance.now();
      
      expect(result).toHaveLength(600); // 6 phonemes × 100 repetitions
      expect(end - start).toBeLessThan(100); // Should complete in under 100ms
    });

    test('should handle texts with many diacritics correctly', () => {
      const complexIast = 'kṛṣṇārjunabhīṣmaśāntanuguru';
      const result = tokenizeIastPhonemes(complexIast);
      
      // Should correctly identify all diacritical marks present in the text
      expect(result).toContain('ṛ');
      expect(result).toContain('ṣ');
      expect(result).toContain('ṇ');
      expect(result).toContain('ā');
      expect(result).toContain('ī');
      expect(result).toContain('ś');
      // Note: ṅ is not in this particular test string
      expect(result.some(phoneme => /[ṛṝḷḹṅñṭḍṇśṣḥṃ]/.test(phoneme))).toBe(true);
    });
  });

  describe('Real-World Sanskrit Examples', () => {
    
    test('should correctly tokenize famous Sanskrit mantras', () => {
      // Om mantra in IAST
      expect(tokenizeIastPhonemes('oṃ')).toEqual(['o', 'ṃ']);
      
      // Gayatri mantra snippet in IAST
      const gayatri = 'oṃ bhūr bhuvaḥ svaḥ';
      const gayatriTokens = tokenizeIastPhonemes(gayatri);
      expect(gayatriTokens).toContain('bh');
      expect(gayatriTokens).toContain('ū');
      expect(gayatriTokens).toContain('bh');
      expect(gayatriTokens).toContain('u');
      expect(gayatriTokens).toContain('v');
      expect(gayatriTokens).toContain('a');
      expect(gayatriTokens).toContain('ḥ');
    });

    test('should correctly tokenize Sanskrit philosophical terms', () => {
      // Dharma in IAST
      expect(tokenizeIastPhonemes('dharma')).toEqual(['dh', 'a', 'r', 'm', 'a']);
      
      // Moksha in IAST  
      expect(tokenizeIastPhonemes('mokṣa')).toEqual(['m', 'o', 'k', 'ṣ', 'a']);
      
      // Nirvana in IAST
      expect(tokenizeIastPhonemes('nirvāṇa')).toEqual(['n', 'i', 'r', 'v', 'ā', 'ṇ', 'a']);
    });

    test('should correctly tokenize Sanskrit compound words', () => {
      // Dharmakshetre in IAST
      expect(tokenizeIastPhonemes('dharmakṣetre')).toEqual(['dh', 'a', 'r', 'm', 'a', 'k', 'ṣ', 'e', 't', 'r', 'e']);
      
      // Kurukshetre in IAST
      expect(tokenizeIastPhonemes('kurukṣetre')).toEqual(['k', 'u', 'r', 'u', 'k', 'ṣ', 'e', 't', 'r', 'e']);
    });
  });

  describe('Script Detection Integration', () => {
    
    test('should work correctly with tokenizePhonemes wrapper function', () => {
      const iastResult = tokenizePhonemes('gam');
      expect(iastResult.script).toBe('IAST');
      expect(iastResult.phonemes).toEqual(['g', 'a', 'm']);
      expect(iastResult.count).toBe(3);
      
      const devanagariResult = tokenizePhonemes('गम');
      expect(devanagariResult.script).toBe('Devanagari');
      expect(devanagariResult.phonemes).toEqual(['ग', 'म']);
      expect(devanagariResult.count).toBe(2);
    });

    test('should provide comprehensive analysis with analyzePhonemeStructure', () => {
      const analysis = analyzePhonemeStructure('kṛṣṇa');
      
      expect(analysis.script).toBe('IAST');
      expect(analysis.phonemes).toEqual(['k', 'ṛ', 'ṣ', 'ṇ', 'a']);
      expect(analysis.vowelCount).toBe(2); // ṛ and a
      expect(analysis.consonantCount).toBe(3); // k, ṣ, ṇ
      expect(analysis.structure).toBe('consonant-vowel-consonant-consonant-vowel');
    });
  });

  describe('Boundary and Security Testing', () => {
    
    test('should handle extremely large inputs gracefully', () => {
      const hugeText = 'a'.repeat(10000);
      expect(() => tokenizeIastPhonemes(hugeText)).not.toThrow();
      expect(tokenizeIastPhonemes(hugeText)).toHaveLength(10000);
    });

    test('should handle special Unicode characters safely', () => {
      const unicodeTest = 'gam\u0000test\uFFFF';
      expect(() => tokenizeIastPhonemes(unicodeTest)).not.toThrow();
      const result = tokenizeIastPhonemes(unicodeTest);
      expect(result).toContain('g');
      expect(result).toContain('a');
      expect(result).toContain('m');
    });

    test('should prevent infinite loops with malformed input', () => {
      const start = performance.now();
      const result = tokenizeIastPhonemes('a'.repeat(1000));
      const end = performance.now();
      
      expect(result).toHaveLength(1000);
      expect(end - start).toBeLessThan(1000); // Should not take more than 1 second
    });
  });
});
