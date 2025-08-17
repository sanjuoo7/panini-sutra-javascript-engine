/**
 * Sutra 1.4.11: saṃyoge guru
 * 
 * A short vowel followed by a consonant cluster (saṃyoga) gets the 'guru' (heavy) saṃjñā.
 * This overrides the 'laghu' saṃjñā from 1.4.10 in the context of consonant clusters.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';
import { isConsonant } from '../sanskrit-utils/classification.js';

export function sutra1411(syllable, context = {}) {
  try {
    // Input validation
    if (!syllable) {
      return { applies: false, reason: 'Invalid input', sutra: '1.4.11', confidence: 0 };
    }
    
    let vowelLength = null;
    let followedByConjunct = false;
    let inputType = 'syllable';
    
    // Handle syllable object (prosodic analysis)
    if (typeof syllable === 'object') {
      vowelLength = syllable.vowelLength;
      followedByConjunct = syllable.followedByConjunct || syllable.hasConjunct || syllable.saṃyoga;
    }
    // Handle string input (analyze for conjuncts)
    else if (typeof syllable === 'string') {
      inputType = 'string';
      const validation = validateSanskritWord(syllable);
      if (!validation.isValid) {
        return { applies: false, reason: 'Invalid Sanskrit input', sutra: '1.4.11', confidence: 0 };
      }
      
      const script = detectScript(syllable);
      
      // Determine vowel length
      if (script === 'Devanagari') {
        if (/[अइउऋऌ]/.test(syllable)) vowelLength = 'short';
        else if (/[आईऊॠॡएओ]/.test(syllable)) vowelLength = 'long';
        
        // Check for consonant clusters (simplified)
        followedByConjunct = /्[क-ह]/.test(syllable) || // halanta + consonant
                             /[क-ह][क-ह]/.test(syllable); // adjacent consonants
      } else if (script === 'IAST') {
        if (/[aiuṛḷ]/.test(syllable) && !/[āīūṝḹēō]/.test(syllable)) vowelLength = 'short';
        else if (/[āīūṝḹēō]/.test(syllable)) vowelLength = 'long';
        
        // Check for consonant clusters
        followedByConjunct = /[kgṅcjñṭḍṇtdnpbmyrlvśṣsh]{2,}/.test(syllable);
      }
    }
    // Handle context-based analysis
    else if (context.vowelLength && context.followedByConjunct !== undefined) {
      vowelLength = context.vowelLength;
      followedByConjunct = context.followedByConjunct || context.saṃyoga || context.hasConjunct;
    }
    
    if (vowelLength === null) {
      return { 
        applies: false, 
        reason: 'Unable to determine vowel length', 
        sutra: '1.4.11', 
        confidence: 0.5,
        details: { inputType: typeof syllable, input: syllable }
      };
    }
    
    // Rule applies only to short vowels (anuvṛtti from 1.4.10)
    if (vowelLength !== 'short') {
      return { 
        applies: false, 
        reason: 'Rule only applies to short vowels', 
        sutra: '1.4.11', 
        confidence: 0.9,
        details: { 
          vowelLength: vowelLength,
          inputType: inputType
        }
      };
    }
    
    // Apply guru saṃjñā when short vowel is followed by consonant cluster
    if (followedByConjunct) {
      return { 
        applies: true, 
        sanjna: 'guru', // For backward compatibility
        saṃjñā: 'guru',
        reason: 'Short vowel followed by consonant cluster gets guru saṃjñā', 
        sutra: '1.4.11', 
        confidence: 0.9,
        details: { 
          vowelLength: 'short',
          inputType: inputType,
          metricalWeight: 'heavy',
          context: 'saṃyoga'
        }
      };
    }
    
    return { 
      applies: false, 
      reason: 'Short vowel not followed by consonant cluster', 
      sutra: '1.4.11', 
      confidence: 0.9,
      details: { 
        vowelLength: 'short',
        inputType: inputType,
        followedByConjunct: false
      }
    };
    
  } catch (error) {
    return {
      applies: false,
      error: error.message,
      sutra: '1.4.11',
      confidence: 0
    };
  }
}

// For backward compatibility
export default function applySutra(syllable, context) {
  return sutra1411(syllable, context);
}
