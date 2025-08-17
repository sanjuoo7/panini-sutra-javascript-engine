/**
 * Sutra 1.4.7: śeṣo ghyasakhi
 * 
 * The remaining (words ending in short i or u that are not nadī or sakhi) 
 * get the 'ghi' saṃjñā.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra147(word, context = {}) {
  try {
    // Input validation
    if (!word || typeof word !== 'string') {
      return { applies: false, reason: 'Invalid input', sutra: '1.4.7', confidence: 0 };
    }
    
    const validation = validateSanskritWord(word);
    if (!validation.isValid) {
      return { applies: false, reason: 'Invalid Sanskrit word', sutra: '1.4.7', confidence: 0 };
    }
    
    const script = detectScript(word);
    
    // Check if word is 'sakhi' (exempt from ghi saṃjñā)
    const isSakhi = (script === 'Devanagari' && word === 'सखि') || 
                    (script === 'IAST' && word === 'sakhi');
    
    if (isSakhi) {
      return { 
        applies: false, 
        reason: 'sakhi is exempt from ghi saṃjñā', 
        sutra: '1.4.7', 
        confidence: 0.95,
        details: { detectedScript: script, isExempt: true, word: 'sakhi' }
      };
    }
    
    // Check if word already has nadī saṃjñā (exempt from ghi saṃjñā)
    const hasNadīSaṃjñā = context.hasNadīSaṃjñā === true || 
                          context.hasNadiSamjna === true ||
                          context.saṃjñā === 'nadī' ||
                          context.sanjna === 'nadī';
    
    if (hasNadīSaṃjñā) {
      return { 
        applies: false, 
        reason: 'Word already has nadī saṃjñā', 
        sutra: '1.4.7', 
        confidence: 0.9,
        details: { detectedScript: script, existingSaṃjñā: 'nadī' }
      };
    }
    
    // Check for short vowel endings
    let endsInShortI = false;
    let endsInShortU = false;
    
    if (script === 'Devanagari') {
      endsInShortI = word.endsWith('ि');
      endsInShortU = word.endsWith('ु');
    } else if (script === 'IAST') {
      endsInShortI = word.endsWith('i');
      endsInShortU = word.endsWith('u');
    }
    
    // Apply ghi saṃjñā to remaining words ending in short i or u
    if (endsInShortI || endsInShortU) {
      return { 
        applies: true, 
        sanjna: 'ghi', // For backward compatibility
        saṃjñā: 'ghi',
        reason: `Word ends in short ${endsInShortI ? 'i' : 'u'} and is eligible for ghi saṃjñā`, 
        sutra: '1.4.7', 
        confidence: 0.9,
        details: { 
          detectedScript: script, 
          ending: endsInShortI ? 'short_i' : 'short_u',
          saṃjñā: 'ghi'
        }
      };
    }
    
    return { 
      applies: false, 
      reason: 'Word does not end in short i or u', 
      sutra: '1.4.7', 
      confidence: 0.9,
      details: { detectedScript: script, ending: 'other' }
    };
    
  } catch (error) {
    return {
      applies: false,
      error: error.message,
      sutra: '1.4.7',
      confidence: 0
    };
  }
}

// For backward compatibility
export default function applySutra(word, context) {
  return sutra147(word, context);
}
