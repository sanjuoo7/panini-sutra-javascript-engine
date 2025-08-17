/**
 * Sutra 1.4.1: ā kaḍārādekā saṃjñā (ā kaḍārāt ekā saṃjñā)
 * 
 * This is an adhikāra (governing rule) that establishes the fundamental principle
 * that only one technical term (saṃjñā) should be applied at a time.
 * 
 * This sutra governs the application scope from 1.4.1 to 2.2.38 in Aṣṭādhyāyī.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra141(word, context = {}) {
  try {
    // This is a meta-rule that doesn't apply to individual words
    // but governs the behavior of other sutras
    return {
      applies: false, // Meta-rules don't apply directly to words
      meta: true, // For backward compatibility
      isMeta: true,
      type: 'adhikāra',
      scopeStart: '1.4.1', // For backward compatibility
      scopeEnd: '2.2.38', // For backward compatibility
      scope: {
        start: '1.4.1',
        end: '2.2.38'
      },
      rule: 'eka_samjna', // For backward compatibility
      principle: 'eka_samjna',
      description: 'Only one technical term should be applied at a time',
      sutra: '1.4.1',
      confidence: 1.0
    };
  } catch (error) {
    return {
      applies: false,
      error: error.message,
      sutra: '1.4.1',
      confidence: 0
    };
  }
}

// For backward compatibility
export default function applySutra(word, context) {
  return sutra141(word, context);
}
