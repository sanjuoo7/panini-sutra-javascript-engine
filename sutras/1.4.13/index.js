/**
 * Sutra 1.4.13: yasmāt pratyayavidhistadādi pratyaye'ṅgam
 * 
 * The base form from which a suffix is prescribed gets the technical term 'aṅga' (base/stem)
 * when that suffix is actually applied. This is a fundamental definitional sutra.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1413(word, context = {}) {
  try {
    // This is a definitional/meta-rule that establishes the concept of 'aṅga'
    // It doesn't apply to transform individual words but defines a core concept
    
    // Input validation for consistency
    if (word && typeof word === 'string') {
      const validation = validateSanskritWord(word);
      if (!validation.isValid) {
        return { applies: false, reason: 'Invalid Sanskrit word', sutra: '1.4.13', confidence: 0 };
      }
    }
    
    return {
      applies: false, // Definitional rules don't apply directly to words
      meta: true, // For backward compatibility
      isMeta: true,
      type: 'saṃjñā_definition',
      defines: 'aṅga',
      description: 'Defines the technical term aṅga (base/stem) for morphological analysis',
      principle: 'yasmāt_pratyayavidhiḥ_tadādi_pratyaye_aṅgam',
      scope: 'morphological_analysis',
      sutra: '1.4.13',
      confidence: 1.0,
      details: {
        conceptDefined: 'aṅga',
        application: 'When a suffix is prescribed from a base, that base becomes aṅga when the suffix is applied',
        importance: 'foundational_for_morphology'
      }
    };
    
  } catch (error) {
    return {
      applies: false,
      error: error.message,
      sutra: '1.4.13',
      confidence: 0
    };
  }
}

// For backward compatibility
export default function applySutra(word, context) {
  return sutra1413(word, context);
}
