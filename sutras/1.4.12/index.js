/**
 * Sutra 1.4.12: dīrghaṃ ca
 * 
 * A long vowel also gets the 'guru' (heavy) saṃjñā.
 * This extends the guru designation beyond short vowels with consonant clusters.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';
import { isVowel } from '../sanskrit-utils/classification.js';

export function sutra1412(syllable, context = {}) {
  try {
    // Input validation
    if (!syllable) {
      return { applies: false, reason: 'Invalid input', sutra: '1.4.12', confidence: 0 };
    }
    
    let vowelLength = null;
    let inputType = 'syllable';
    
    // Handle syllable object (prosodic analysis)
    if (typeof syllable === 'object' && syllable.vowelLength) {
      vowelLength = syllable.vowelLength;
    }
    // Handle string input (simple vowel analysis)
    else if (typeof syllable === 'string') {
      inputType = 'string';
      const validation = validateSanskritWord(syllable);
      if (!validation.isValid) {
        return { applies: false, reason: 'Invalid Sanskrit input', sutra: '1.4.12', confidence: 0 };
      }
      
      const script = detectScript(syllable);
      
      // Determine vowel length from string
      if (script === 'Devanagari') {
        if (/[अइउऋऌ]/.test(syllable) && !/[आईऊॠॡएओ]/.test(syllable)) vowelLength = 'short';
        else if (/[आईऊॠॡएओ]/.test(syllable)) vowelLength = 'long';
      } else if (script === 'IAST') {
        if (/[aiuṛḷ]/.test(syllable) && !/[āīūṝḹēō]/.test(syllable)) vowelLength = 'short';
        else if (/[āīūṝḹēō]/.test(syllable)) vowelLength = 'long';
      }
    }
    // Handle context-based analysis
    else if (context.vowelLength) {
      vowelLength = context.vowelLength;
    }
    
    if (!vowelLength) {
      return { 
        applies: false, 
        reason: 'Unable to determine vowel length', 
        sutra: '1.4.12', 
        confidence: 0.5,
        details: { inputType: typeof syllable, input: syllable }
      };
    }
    
    // Apply guru saṃjñā to long vowels
    if (vowelLength === 'long') {
      return { 
        applies: true, 
        sanjna: 'guru', // For backward compatibility
        saṃjñā: 'guru',
        reason: 'Long vowel gets guru saṃjñā', 
        sutra: '1.4.12', 
        confidence: 0.95,
        details: { 
          vowelLength: 'long',
          inputType: inputType,
          metricalWeight: 'heavy'
        }
      };
    }
    
    return { 
      applies: false, 
      reason: 'Vowel is not long', 
      sutra: '1.4.12', 
      confidence: 0.9,
      details: { 
        vowelLength: vowelLength,
        inputType: inputType
      }
    };
    
  } catch (error) {
    return {
      applies: false,
      error: error.message,
      sutra: '1.4.12',
      confidence: 0
    };
  }
}

// For backward compatibility
export default function applySutra(syllable, context) {
  return sutra1412(syllable, context);
}
