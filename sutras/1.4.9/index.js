/**
 * Sutra 1.4.9: ṣaṣṭhīyuktaśchandasi vā
 * 
 * In Vedic usage (chandasi), 'pati' optionally gets 'ghi' saṃjñā 
 * when connected with genitive case, even outside compounds.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra149(word, context = {}) {
  try {
    // Input validation
    if (!word || typeof word !== 'string') {
      return { applies: false, reason: 'Invalid input', sutra: '1.4.9', confidence: 0 };
    }
    
    const validation = validateSanskritWord(word);
    if (!validation.isValid) {
      return { applies: false, reason: 'Invalid Sanskrit word', sutra: '1.4.9', confidence: 0 };
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
        sutra: '1.4.9', 
        confidence: 0.9,
        details: { detectedScript: script, word: base || word }
      };
    }
    
    // Check if pati is in a compound (this rule doesn't apply in compounds)
    const inCompound = context.inCompound === true || 
                       context.samāsa === true ||
                       context.compound === true;
    
    if (inCompound) {
      return { 
        applies: false, 
        reason: 'Rule does not apply when pati is in compound', 
        sutra: '1.4.9', 
        confidence: 0.9,
        details: { 
          detectedScript: script, 
          word: 'pati',
          context: 'compound'
        }
      };
    }
    
    // Check if context is Vedic (chandasi)
    const isChandasi = context.domain === 'chandasi' || 
                       context.chandasi === true ||
                       context.vedic === true;
    
    if (!isChandasi) {
      return { 
        applies: false, 
        reason: 'Rule only applies in Vedic context (chandasi)', 
        sutra: '1.4.9', 
        confidence: 0.9,
        details: { 
          detectedScript: script, 
          word: 'pati',
          domain: context.domain || 'classical'
        }
      };
    }
    
    // Check if related to genitive case (ṣaṣṭhī)
    const isRelatedToGenitive = context.relatedToGenitive === true || 
                                context.ṣaṣṭhīyukta === true ||
                                context.genitive === true ||
                                context.case === 'genitive' ||
                                context.case === 'ṣaṣṭhī';
    
    if (isRelatedToGenitive) {
      return { 
        applies: true, 
        optional_sanjna: 'ghi', // For backward compatibility
        saṃjñā: 'ghi',
        isOptional: true,
        reason: 'pati optionally gets ghi saṃjñā in Vedic when connected with genitive', 
        sutra: '1.4.9', 
        confidence: 0.8,
        details: { 
          detectedScript: script, 
          word: 'pati',
          domain: 'chandasi',
          case: 'genitive',
          optionality: 'vikalpena'
        }
      };
    }
    
    return { 
      applies: false, 
      reason: 'pati not connected with genitive case', 
      sutra: '1.4.9', 
      confidence: 0.9,
      details: { 
        detectedScript: script, 
        word: 'pati',
        domain: 'chandasi',
        case: context.case || 'unknown'
      }
    };
    
  } catch (error) {
    return {
      applies: false,
      error: error.message,
      sutra: '1.4.9',
      confidence: 0
    };
  }
}

// For backward compatibility
export default function applySutra(word, context) {
  return sutra149(word, context);
}
