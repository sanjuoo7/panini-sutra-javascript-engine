/**
 * Sutra 1.4.2: vipratiṣedhe paraṃ kāryam
 * 
 * This is a fundamental paribhāṣā (meta-rule) for conflict resolution.
 * When there's a conflict between two rules, the later rule takes precedence.
 * 
 * This principle is crucial for the sutra processing engine's decision-making.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra142(word, context = {}) {
  try {
    // This is a meta-rule that governs conflict resolution
    // It doesn't apply to individual words but guides rule selection
    return {
      applies: false, // Meta-rules don't apply directly to words
      meta: true, // For backward compatibility
      isMeta: true,
      type: 'paribhāṣā',
      rule: 'vipratiṣedhe_param_kāryam', // For backward compatibility
      principle: 'vipratiṣedhe_param_kāryam',
      description: 'In case of conflict between rules, the later rule prevails',
      conflictResolution: {
        method: 'later_rule_wins',
        scope: 'global',
        application: 'automatic'
      },
      sutra: '1.4.2',
      confidence: 1.0
    };
  } catch (error) {
    return {
      applies: false,
      error: error.message,
      sutra: '1.4.2',
      confidence: 0
    };
  }
}

// For backward compatibility
export default function applySutra(word, context) {
  return sutra142(word, context);
}
