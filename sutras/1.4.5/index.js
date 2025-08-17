/**
 * Sutra 1.4.5: vā ām
 * 
 * Optionally, words in iyaṅ/uvaṅ sthāna can get 'nadī' saṃjñā 
 * when followed by the ām affix (genitive plural).
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra145(word, context = {}) {
  try {
    // Input validation
    if (!word || typeof word !== 'string') {
      return { applies: false, reason: 'Invalid input', sutra: '1.4.5', confidence: 0 };
    }
    
    const validation = validateSanskritWord(word);
    if (!validation.isValid) {
      return { applies: false, reason: 'Invalid Sanskrit word', sutra: '1.4.5', confidence: 0 };
    }
    
    const script = detectScript(word);
    
    // Special case: 'strī' is always exempt
    const isStri = (script === 'Devanagari' && word === 'स्त्री') || 
                   (script === 'IAST' && word === 'strī');
    
    if (isStri) {
      return { 
        applies: false, 
        reason: 'strī is exempt from this optional rule', 
        sutra: '1.4.5', 
        confidence: 0.95,
        details: { detectedScript: script, isExempt: true }
      };
    }
    
    // Check if word is in iyaṅ/uvaṅ sthāna
    const isIyanUvanSthana = context.isIyanUvanSthana === true || 
                             context.iyaṅuvaṅsthāna === true;
    
    if (!isIyanUvanSthana) {
      return { 
        applies: false, 
        reason: 'Word is not in iyaṅ/uvaṅ sthāna', 
        sutra: '1.4.5', 
        confidence: 0.9,
        details: { detectedScript: script, sthāna: 'other' }
      };
    }
    
    // Check for ām affix (genitive plural)
    const hasAmAffix = context.nextAffix === 'ām' || 
                       context.nextAffix === 'आम्' ||
                       context.affixes?.includes('ām') ||
                       context.affixes?.includes('आम्');
    
    if (hasAmAffix) {
      return { 
        applies: true, 
        optional_sanjna: 'nadī', // For backward compatibility
        saṃjñā: 'nadī',
        isOptional: true,
        reason: 'iyaṅ/uvaṅ sthāna word optionally gets nadī saṃjñā before ām', 
        sutra: '1.4.5', 
        confidence: 0.85,
        details: { 
          detectedScript: script, 
          sthāna: 'iyaṅuvaṅ',
          affix: 'ām',
          optionality: 'vikalpena'
        }
      };
    }
    
    return { 
      applies: false, 
      reason: 'ām affix not found', 
      sutra: '1.4.5', 
      confidence: 0.9,
      details: { 
        detectedScript: script, 
        sthāna: 'iyaṅuvaṅ',
        affix: context.nextAffix || 'none'
      }
    };
    
  } catch (error) {
    return {
      applies: false,
      error: error.message,
      sutra: '1.4.5',
      confidence: 0
    };
  }
}

// For backward compatibility
export default function applySutra(word, context) {
  return sutra145(word, context);
}
