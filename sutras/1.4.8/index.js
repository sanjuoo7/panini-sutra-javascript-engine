/**
 * Sutra 1.4.8: patiḥ samāsa eva
 * 
 * The word 'pati' gets 'ghi' saṃjñā only in compounds (samāsa).
 * This restricts the application of 1.4.7 for 'pati'.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra148(word, context = {}) {
  try {
    // Input validation
    if (!word || typeof word !== 'string') {
      return { applies: false, reason: 'Invalid input', sutra: '1.4.8', confidence: 0 };
    }
    
    const validation = validateSanskritWord(word);
    if (!validation.isValid) {
      return { applies: false, reason: 'Invalid Sanskrit word', sutra: '1.4.8', confidence: 0 };
    }
    
    const script = detectScript(word);
    const base = context.base || word;
    
    // Check if the word is 'pati'
    const isPati = (script === 'Devanagari' && (base === 'पति' || word === 'पति')) || 
                   (script === 'IAST' && (base === 'pati' || word === 'pati'));
    
    if (!isPati) {
      return { 
        applies: false, 
        reason: 'Rule only applies to pati', 
        sutra: '1.4.8', 
        confidence: 0.9,
        details: { detectedScript: script, word: base || word }
      };
    }
    
    // Check if pati is in a compound
    const inCompound = context.inCompound === true || 
                       context.samāsa === true ||
                       context.compound === true;
    
    if (inCompound) {
      return { 
        applies: false, 
        reason: 'pati is in compound, ghi saṃjñā is allowed', 
        sutra: '1.4.8', 
        confidence: 0.9,
        details: { 
          detectedScript: script, 
          word: 'pati',
          context: 'compound',
          allows: 'ghi_saṃjñā'
        }
      };
    }
    
    // If pati is NOT in compound, prohibit ghi saṃjñā
    return { 
      applies: true, 
      sanjna_prohibition: 'ghi', // For backward compatibility
      prohibition: 'ghi',
      reason: 'pati outside compound cannot get ghi saṃjñā', 
      sutra: '1.4.8', 
      confidence: 0.9,
      details: { 
        detectedScript: script, 
        word: 'pati',
        context: 'not_in_compound',
        prohibits: 'ghi_saṃjñā'
      }
    };
    
  } catch (error) {
    return {
      applies: false,
      error: error.message,
      sutra: '1.4.8',
      confidence: 0
    };
  }
}

// For backward compatibility
export default function applySutra(word, context) {
  return sutra148(word, context);
}
