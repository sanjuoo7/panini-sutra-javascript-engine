/**
 * Sutra 1.4.10: hrasvaṃ laghu
 * 
 * A short vowel gets the 'laghu' (light) saṃjñā.
 * This is a metrical/prosodic classification.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';
import { isVowel } from '../sanskrit-utils/classification.js';

export function sutra1410(syllable, context = {}) {
  try {
    // Input validation - can accept syllable object or string
    if (!syllable) {
      return { applies: false, reason: 'Invalid input', sutra: '1.4.10', confidence: 0 };
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
        return { applies: false, reason: 'Invalid Sanskrit input', sutra: '1.4.10', confidence: 0 };
      }
      
      const script = detectScript(syllable);
      
      // Determine vowel length from string
      if (script === 'Devanagari') {
        if (/[अइउऋऌ]/.test(syllable)) vowelLength = 'short';
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
        sutra: '1.4.10', 
        confidence: 0.5,
        details: { inputType: typeof syllable, input: syllable }
      };
    }
    
    // Apply laghu saṃjñā to short vowels
    if (vowelLength === 'short') {
      return { 
        applies: true, 
        sanjna: 'laghu', // For backward compatibility
        saṃjñā: 'laghu',
        reason: 'Short vowel gets laghu saṃjñā', 
        sutra: '1.4.10', 
        confidence: 0.95,
        details: { 
          vowelLength: 'short',
          inputType: inputType,
          metricalWeight: 'light'
        }
      };
    }
    
    return { 
      applies: false, 
      reason: 'Vowel is not short', 
      sutra: '1.4.10', 
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
      sutra: '1.4.10',
      confidence: 0
    };
  }
}

// For backward compatibility
export default function applySutra(syllable, context) {
  return sutra1410(syllable, context);
}
