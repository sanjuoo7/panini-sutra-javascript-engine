/**
 * Sutra 1.2.40: उदात्तस्वरितपरस्य सन्नतरः (udāttasvaritaparasya sannataraḥ)
 * "The accent called sannatara is substituted for an anudātta vowel which has an udātta or svarita following it."
 *
 * Implementation strategy:
 *  - Use shared accent-sannatara-rules to detect eligible positions.
 *  - Provide metadata without altering the surface string unless render option is requested.
 */
import { applySannataraSubstitution } from '../sanskrit-utils/accent-sannatara-rules.js';

export function applySutra1_2_40(text, context = {}, options = {}) {
  const result = applySannataraSubstitution(text, { ...options, script: context.script });
  return {
    sutra: '1.2.40',
    input: text,
    ...result
  };
}

export default applySutra1_2_40;
