/**
 * Panini Sutra 1.2.29: उच्चैरुदात्तः
 * ucacaैraुdaाtataḥ
 */

import { detectScript } from '../sanskrit-utils/script-detection.js';
import { validateSanskritWord } from '../sanskrit-utils/validation.js';

export function sutra1_2_29(word, context = {}) {
  // Input validation
  const validation = validateSanskritWord(word);
  if (!validation.isValid) {
    throw new Error(`Invalid input: ${validation.error}`);
  }

  const script = detectScript(word);
  
  // TODO: Implement the specific grammatical rule for sutra 1.2.29
  
  return {
    input: word,
    output: word, // Placeholder - implement actual transformation
    script: script,
    sutraApplied: '1.2.29',
    rule: 'उच्चैरुदात्तः',
    applied: false // Change to true when rule actually applies
  };
}

export default sutra1_2_29;
