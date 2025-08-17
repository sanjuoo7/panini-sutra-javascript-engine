/**
 * Sutra 1.4.4: neyaṅuvaṅsthānāvastrī
 * 
 * This sutra prevents the automatic application of 'nadī' saṃjñā 
 * to words in iyaṅ/uvaṅ sthāna, except for the word 'strī'.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra144(word, context = {}) {
  try {
    // Input validation
    if (!word || typeof word !== 'string') {
      return { applies: false, reason: 'Invalid input', sutra: '1.4.4', confidence: 0 };
    }
    
    const validation = validateSanskritWord(word);
    if (!validation.isValid) {
      return { applies: false, reason: 'Invalid Sanskrit word', sutra: '1.4.4', confidence: 0 };
    }
    
    const script = detectScript(word);
    
    // Special case: 'strī' is exempt from this prohibition
    const isStri = (script === 'Devanagari' && word === 'स्त्री') || 
                   (script === 'IAST' && word === 'strī');
    
    if (isStri) {
      return { 
        applies: false, 
        reason: 'strī is exempt from iyaṅ/uvaṅ prohibition', 
        sutra: '1.4.4', 
        confidence: 0.95,
        details: { detectedScript: script, isExempt: true }
      };
    }
    
    // Check if word is in iyaṅ/uvaṅ sthāna
    const isIyanUvanSthana = context.isIyanUvanSthana === true || 
                             context.iyaṅuvaṅsthāna === true;
    
    if (isIyanUvanSthana) {
      return { 
        applies: true, 
        sanjna_prohibition: 'nadī', // For backward compatibility
        prohibition: 'nadī',
        reason: 'Word is in iyaṅ/uvaṅ sthāna, nadī saṃjñā is prohibited', 
        sutra: '1.4.4', 
        confidence: 0.9,
        details: { 
          detectedScript: script, 
          sthāna: 'iyaṅuvaṅ',
          prohibits: 'nadī_saṃjñā'
        }
      };
    }
    
    return { 
      applies: false, 
      reason: 'Word is not in iyaṅ/uvaṅ sthāna', 
      sutra: '1.4.4', 
      confidence: 0.9,
      details: { detectedScript: script, sthāna: 'other' }
    };
    
  } catch (error) {
    return {
      applies: false,
      error: error.message,
      sutra: '1.4.4',
      confidence: 0
    };
  }
}

// For backward compatibility
export default function applySutra(word, context) {
  return sutra144(word, context);
}
