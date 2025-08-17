/**
 * Sutra 1.4.3: yū stryākhyau nadī
 * 
 * A feminine word ending in ī or ū gets the technical term 'nadī'.
 * This is a fundamental classification rule for feminine nouns.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra143(word, context = {}) {
  try {
    // Input validation
    if (!word || typeof word !== 'string') {
      return { applies: false, reason: 'Invalid input', sutra: '1.4.3', confidence: 0 };
    }
    
    const validation = validateSanskritWord(word);
    if (!validation.isValid) {
      return { applies: false, reason: 'Invalid Sanskrit word', sutra: '1.4.3', confidence: 0 };
    }
    
    const script = detectScript(word);
    
    // Check if the word is feminine
    const isFeminine = context.gender === 'feminine' || context.strī === true;
    if (!isFeminine) {
      return { 
        applies: false, 
        reason: 'Word is not feminine', 
        sutra: '1.4.3', 
        confidence: 0.9,
        details: { detectedScript: script, gender: context.gender }
      };
    }
    
    // Check ending patterns for both scripts
    let endsInLongI = false;
    let endsInLongU = false;
    
    if (script === 'Devanagari') {
      endsInLongI = word.endsWith('ी');
      endsInLongU = word.endsWith('ू');
    } else if (script === 'IAST') {
      endsInLongI = word.endsWith('ī');
      endsInLongU = word.endsWith('ū');
    }
    
    if (endsInLongI || endsInLongU) {
      return { 
        applies: true, 
        sanjna: 'nadī', // For backward compatibility with tests
        saṃjñā: 'nadī',
        reason: `Feminine word ending in ${endsInLongI ? (script === 'Devanagari' ? 'ी' : 'ī') : (script === 'Devanagari' ? 'ू' : 'ū')}`,
        sutra: '1.4.3', 
        confidence: 0.95,
        details: { 
          detectedScript: script, 
          ending: endsInLongI ? 'long_i' : 'long_u',
          gender: 'feminine'
        }
      };
    }
    
    return { 
      applies: false, 
      reason: 'Word does not end in long ī or ū', 
      sutra: '1.4.3', 
      confidence: 0.9,
      details: { detectedScript: script, ending: 'other' }
    };
    
  } catch (error) {
    return {
      applies: false,
      error: error.message,
      sutra: '1.4.3',
      confidence: 0
    };
  }
}

// For backward compatibility
export default function applySutra(word, context) {
  return sutra143(word, context);
}
