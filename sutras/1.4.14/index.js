/**
 * Sutra 1.4.14: suptiṅantaṃ padam
 * 
 * A word ending in sup (nominal endings) or tiṅ (verbal endings) gets the technical term 'pada' (inflected word).
 * This defines what constitutes a complete grammatical word in Sanskrit.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1414(word, context = {}) {
  try {
    // For meta-rule usage (no arguments)
    if (arguments.length === 0 || (!word && !context)) {
      return {
        applies: false, // Definitional rules don't apply directly to words
        meta: true, // For backward compatibility
        defines: 'pada',
        conditions: ['ends_in_sup', 'ends_in_tin'], // For backward compatibility
        type: 'saṃjñā_definition',
        description: 'Defines what constitutes a complete grammatical word in Sanskrit',
        principle: 'suptiṅantaṃ_padam',
        sutra: '1.4.14',
        confidence: 1.0
      };
    }
    
    // For actual word analysis
    // Input validation
    if (!word || typeof word !== 'string') {
      return { applies: false, reason: 'Invalid input', sutra: '1.4.14', confidence: 0 };
    }
    
    const validation = validateSanskritWord(word);
    if (!validation.isValid) {
      return { applies: false, reason: 'Invalid Sanskrit word', sutra: '1.4.14', confidence: 0 };
    }
    
    const script = detectScript(word);
    
    // Check if word ends in sup (nominal endings)
    const endsInSup = context.endsInSup === true || 
                      context.hasSupEnding === true ||
                      context.nominal === true ||
                      context.case !== undefined; // Has case marking
    
    // Check if word ends in tiṅ (verbal endings)
    const endsInTiṅ = context.endsInTiṅ === true || 
                      context.endsInTin === true ||
                      context.hasTinEnding === true ||
                      context.verbal === true ||
                      context.tense !== undefined || // Has tense marking
                      context.person !== undefined; // Has person marking
    
    // Additional heuristic checks for word endings (simplified)
    let hasInflectionalEnding = false;
    
    if (script === 'Devanagari') {
      // Common nominal endings
      const nominalEndings = /[सऽंःाािीुूेोौम्]$/;
      // Common verbal endings
      const verbalEndings = /[तिसिन्ति]$/;
      hasInflectionalEnding = nominalEndings.test(word) || verbalEndings.test(word);
    } else if (script === 'IAST') {
      // Common nominal endings
      const nominalEndings = /[sḥṃāiīuūeoauḥm]$/;
      // Common verbal endings  
      const verbalEndings = /[tisinmtanti]$/;
      hasInflectionalEnding = nominalEndings.test(word) || verbalEndings.test(word);
    }
    
    // Apply pada saṃjñā if word has appropriate endings
    if (endsInSup || endsInTiṅ || hasInflectionalEnding) {
      const endingType = endsInSup ? 'sup' : endsInTiṅ ? 'tiṅ' : 'inflectional';
      
      return { 
        applies: true, 
        saṃjñā: 'pada',
        reason: `Word with ${endingType} ending gets pada saṃjñā`, 
        sutra: '1.4.14', 
        confidence: endsInSup || endsInTiṅ ? 0.95 : 0.8,
        details: { 
          detectedScript: script, 
          endingType: endingType,
          isCompleteWord: true,
          grammaticalStatus: 'inflected'
        }
      };
    }
    
    return { 
      applies: false, 
      reason: 'Word does not end in sup or tiṅ', 
      sutra: '1.4.14', 
      confidence: 0.8,
      details: { 
        detectedScript: script, 
        endingType: 'none_detected',
        isCompleteWord: false
      }
    };
    
  } catch (error) {
    return {
      applies: false,
      error: error.message,
      sutra: '1.4.14',
      confidence: 0
    };
  }
}

// For backward compatibility
export default function applySutra(word, context) {
  // When called with no arguments (for meta-rule properties)
  if (arguments.length === 0) {
    return {
      applies: false,
      meta: true,
      defines: 'pada',
      conditions: ['ends_in_sup', 'ends_in_tin']
    };
  }
  
  return sutra1414(word, context);
}
